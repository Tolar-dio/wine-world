/* modules/40_ageing.js: "When to drink". How long a wine ages and when to open it, by appellation, tier and vintage.

   Data (sidecars; each is optional and the module hides itself when both are missing):
     data/ageing/profiles.json  {"_defaults": {"<country>|<style>|<category>": profile},
                                 "<appellation (or region) id>": profile}
                                profile = {tiers: {<tier>: {label, ready, peak: [a, b], limit}}, default_tier, why,
                                           producer_style, src}; years are counted from the vintage
     data/ageing/vintages.json  {"<region or appellation id>": {"<year>": {q 1-5, character, status, window: [from, to],
                                 note, src}}, "_covers": {"<region id>": [appellation ids]}}
     data/vintage/{iso2}.json   yearly weather (VM.data.vintage) and data/vintage/_events.json (VM.data.events)

   Lookups (profiles.json _meta.fine_units and lookup): an appellation uses its own profile, else _defaults by country,
   style and category; it never walks its index parent, which is spatial (Barbaresco DOCG sits inside Dolcetto
   d'Alba DOC). A fine unit uses the id before "-premier-cru-" / "-grand-cru-", else the first profiled id up its
   parent chain; a site uses its fine unit or appellation. Tier: _fine_override, then _fine_tier by "<profile>|<unit
   type>", then "<country>|<unit type>", then default_tier. Vintage charts: _by_app / _covers for the appellation
   (one per colour where there are two). Without a report, the tier's typical window is shifted by at
   most three years for the season's weather (hot years earlier, cool years slower to open, a soaked harvest shorter)
   and the report's quality score, and every shift is listed.

   UI: the profile section "When to drink" (appellations, fine units, sites, regions; slot mid, next to the
   vintage strip), the view #ageing "Check a bottle" (#ageing-<id>-<vintage>), window gauges in the cellar journal
   (bottle rows, bottle card, Cellar tab filter and sort, "Suggest window" in the form; only where VM.journal is
   available, never overwriting a window the user entered) and typical ageing by tier in Compare. */
(() => {
  'use strict';
  if (!window.VM) return;
  const { esc, inl, fold, arr, clamp } = VM.util;
  const NOW = new Date().getFullYear();
  const P_PROF = 'data/ageing/profiles.json', P_VINT = 'data/ageing/vintages.json';
  const NROWS = 30;
  const num = v => (v == null || v === '' || typeof v === 'boolean' || !isFinite(+v)) ? null : +v;
  const str = v => (v == null ? null : (String(v).trim() || null));
  const fmt = n => VM.fmt.num(n);
  const yrs = n => `${Math.abs(n)} year${Math.abs(n) === 1 ? '' : 's'}`;
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const JR = () => (VM.journal && VM.journal.available ? VM.journal : null);
  let UID = 0;
  const ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" aria-hidden="true"><path d="M4 1.8h8M4 14.2h8M5.2 1.8c0 3.1 2.8 3.9 2.8 6.2s-2.8 3.1-2.8 6.2M10.8 1.8c0 3.1-2.8 3.9-2.8 6.2s2.8 3.1 2.8 6.2"/><path d="M6.4 12.6h3.2"/></svg>';
  const SEARCH_IC = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>';

  /* ---------- vocabulary ---------- */
  const STATUS = {
    young: { label: 'Young', col: 'young' },
    approachable: { label: 'Approachable', col: 'open' },
    peak: { label: 'At its peak', col: 'peak' },
    mature: { label: 'Mature', col: 'late' },
    drink_up: { label: 'Drink up', col: 'late' },
    past: { label: 'Past its best', col: 'past' },
    window: { label: 'In its window', col: 'open' }
  };
  const BUCKET = { now: 'Drink now', soon: 'Drink soon', hold: 'Hold', past: 'Past peak' };
  const BUCKET_COL = { now: 'peak', soon: 'late', hold: 'young', past: 'past' };
  const BUCKET_ORDER = { past: 0, soon: 1, now: 2, hold: 3 };
  /* segmented choices: one row up to three options, then two columns */
  const segCols = n => (n <= 3 ? n : 2);
  const segCls = n => (n <= 3 ? 'seg seg-inline' : 'seg');
  const COLOUR = { red: 'Red', white: 'White', rose: 'Rosé', sparkling: 'Sparkling', sweet: 'Sweet', fortified: 'Fortified', orange: 'Orange' };
  const STYLE_W = { red: 'reds', white: 'whites', rose: 'rosés', sparkling: 'sparkling wines', sweet: 'sweet wines', fortified: 'fortified wines', orange: 'orange wines' };

  /* ---------- loading and normalising the sidecars ---------- */
  const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return String(u); } };
  function normSrc(s) {
    return arr(s).flatMap(x => {
      if (!x) return [];
      if (typeof x === 'string') return /^https?:\/\//.test(x) ? [{ title: host(x), url: x }] : [{ title: x, url: null }];
      if (typeof x === 'object') {
        const u = typeof x.url === 'string' && /^https?:\/\//.test(x.url) ? x.url : null;
        const t = str(x.title || x.name) || (u ? host(u) : null);
        return t ? [{ title: t, url: u }] : [];
      }
      return [];
    });
  }
  const prettyKey = k => cap(String(k).replace(/[_-]+/g, ' '));
  function normTier(key, t) {
    if (!t || typeof t !== 'object') return null;
    let pk = t.peak;
    if (pk && !Array.isArray(pk) && typeof pk === 'object') pk = [pk.from, pk.to];
    if (num(pk) != null) pk = [+pk, +pk];
    let a = Array.isArray(pk) ? num(pk[0]) : null, b = Array.isArray(pk) ? num(pk[1]) : null;
    let r = num(t.ready ?? t.approachable), L = num(t.limit ?? t.keeps);
    if (a == null && b != null) a = b;
    if (b == null && a != null) b = a;
    if (r == null && a == null && L == null) return null;
    if (a == null) { r = r ?? 0; L = L ?? r + 6; a = r + (L - r) * 0.3; b = r + (L - r) * 0.7; }
    if (r == null) r = Math.max(0, Math.round(a * 0.6));
    if (L == null) L = Math.round(b * 1.3 + 1);
    r = Math.max(0, r); a = Math.max(r, a); b = Math.max(a, b); L = Math.max(b, L);
    const label = str(t.label || t.name) || prettyKey(key);
    const lc = ' ' + fold(String(key).replace(/[_-]+/g, ' ') + ' ' + label).replace(/[^a-z]+/g, ' ') + ' ';
    const colour = / (white|blanc|bianco|weiss|blanco) /.test(lc) ? 'white' : / (red|rouge|rosso|rot|tinto) /.test(lc) ? 'red' : / (rose|rosato|rosado) /.test(lc) ? 'rose' : null;
    /* basis: years from the vintage, or from bottling / disgorgement for wines sold ready (tawny, sherry, NV fizz) */
    const basis = str(t.basis) && !/^vintage$/i.test(t.basis) ? String(t.basis).toLowerCase() : null;
    return { key: String(key), label, ready: r, peak: [a, b], limit: L, note: str(t.note), basis, colour };
  }
  const PS_TRAD = [2, 1, 2, 3], PS_MOD = [-2, -1, -1, -2];
  function normPS(ps) {
    if (!ps) return null;
    if (typeof ps === 'string') return { text: ps, trad: PS_TRAD, mod: PS_MOD, scaled: true };
    if (typeof ps !== 'object') return null;
    let explicit = false;
    const sh = (v, d) => {
      if (Array.isArray(v) && v.length === 4 && v.every(x => num(x) != null)) { explicit = true; return v.map(Number); }
      if (num(v) != null) { explicit = true; return [+v, +v, +v, +v]; }
      if (v && typeof v === 'object') return sh(v.shift ?? v.years, d);
      return d;
    };
    const tx = v => v && typeof v === 'object' ? str(v.text || v.note) : typeof v === 'string' ? str(v) : null;
    const out = { text: str(ps.text || ps.note || ps.why), tradText: tx(ps.traditional), modText: tx(ps.modern), trad: sh(ps.traditional, PS_TRAD), mod: sh(ps.modern, PS_MOD) };
    out.scaled = !explicit;
    if (!out.text && !out.tradText && !out.modText) return null;
    return out;
  }
  function normProfile(id, p) {
    if (!p || typeof p !== 'object') return null;
    let tiers = [];
    if (Array.isArray(p.tiers)) tiers = p.tiers.map((t, i) => normTier(t && (t.key || t.id || t.tier) || `tier${i + 1}`, t)).filter(Boolean);
    else if (p.tiers && typeof p.tiers === 'object') tiers = Object.entries(p.tiers).map(([k, t]) => normTier(k, t)).filter(Boolean);
    else { const t = normTier(p.tier || 'typical', p); if (t) tiers = [t]; }
    if (!tiers.length) return null;
    const tierMap = Object.fromEntries(tiers.map(t => [t.key, t]));
    return {
      id, tiers, tierMap, defaultTier: tierMap[p.default_tier] ? String(p.default_tier) : tiers[0].key,
      why: str(p.why), ps: normPS(p.producer_style), src: normSrc(p.src), label: str(p.label),
      tierFor: p.tier_for && typeof p.tier_for === 'object' ? p.tier_for : null
    };
  }
  function normEntry(y, e) {
    if (!e || typeof e !== 'object') return null;
    let w = e.window || e.drink || null;
    if (w && !Array.isArray(w) && typeof w === 'object') w = [w.from, w.to];
    let f = Array.isArray(w) ? num(w[0]) : null, t = Array.isArray(w) ? num(w[1]) : null;
    if (f != null && f < 200) f = y + f;   /* offsets from the vintage, if a source gives them that way */
    if (t != null && t < 200) t = y + t;
    if (f != null && t != null && t < f) [f, t] = [t, f];
    const q = num(e.q ?? e.quality);
    return {
      year: y, q: q != null ? clamp(Math.round(q), 1, 5) : null, character: str(e.character), note: str(e.note),
      status: STATUS[e.status] && e.status !== 'window' ? e.status : null,
      window: f != null || t != null ? [f, t] : null, src: normSrc(e.src), tier: str(e.tier)
    };
  }
  function normData(p, v) {
    const D = { profiles: new Map(), defaults: [], vint: new Map(), covers: new Map(), coveredBy: new Map(), meta: new Map(), vintBase: new Map(), fineTier: new Map(), fineOverride: new Map(), any: false };
    if (p && typeof p === 'object' && !Array.isArray(p)) {
      for (const [k, x] of Object.entries(p)) {
        if (k === '_defaults') {
          for (const [dk, dx] of Object.entries(x || {})) {
            const np = normProfile(dk, dx);
            if (!np) continue;
            for (const t of np.tiers) if (/^default\b/i.test(t.label)) t.label = 'Typical';
            D.defaults.push([dk.toLowerCase().split('|').map(s => s.trim() || '*'), np]);
          }
          continue;
        }
        if (k === '_fine_override') {
          for (const [fid, tk] of Object.entries(x || {})) if (typeof tk === 'string') D.fineOverride.set(fid, tk);
          continue;
        }
        if (k === '_fine_tier') {
          /* "<country>|<unit type>" -> preferred tier keys of the parent's profile */
          /* "<profile id>|<unit type>" (first) or "<country>|<unit type>" -> candidate tiers; empty = the default */
          for (const [fk, list] of Object.entries(x || {})) D.fineTier.set(fk.toLowerCase(), arr(list).map(String));
          continue;
        }
        if (k.startsWith('_')) continue;
        const np = normProfile(k, x);
        if (np) D.profiles.set(k, np);
      }
    }
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [k, x] of Object.entries(v)) {
        if (k === '_covers') {
          for (const [r, apps] of Object.entries(x || {})) {
            const s = new Set(arr(apps).map(String));
            D.covers.set(r, s);
            for (const a of s) { if (!D.coveredBy.has(a)) D.coveredBy.set(a, []); D.coveredBy.get(a).push(r); }
          }
          continue;
        }
        if (k === '_meta') {
          for (const [ek, em] of Object.entries((x && x.entries) || {})) if (em && typeof em === 'object') D.meta.set(ek, { label: str(em.label), style: str(em.style), refTier: str(em.ref_tier), refLabel: str(em.ref_label), profile: str(em.profile), note: str(em.note) });
          continue;
        }
        if (k === '_by_app') {
          /* the inverse of _covers; either may be given */
          for (const [a, keys] of Object.entries(x || {})) for (const key of arr(keys)) {
            if (!D.coveredBy.has(a)) D.coveredBy.set(a, []);
            if (!D.coveredBy.get(a).includes(key)) D.coveredBy.get(a).push(key);
          }
          continue;
        }
        if (k.startsWith('_') || !x || typeof x !== 'object') continue;
        const m = new Map();
        for (const [ys, e] of Object.entries(x)) {
          const y = parseInt(ys, 10);
          if (!(y > 1800 && y < 2200)) continue;
          const ne = normEntry(y, e);
          if (ne) m.set(y, { ...ne, from: k });
        }
        if (m.size) {
          D.vint.set(k, m);
          /* a key may carry a colour: "region-fr-burgundy:red" */
          const base = k.split(':')[0];
          if (!D.vintBase.has(base)) D.vintBase.set(base, []);
          D.vintBase.get(base).push(k);
        }
      }
    }
    for (const [a, keys] of D.coveredBy) D.coveredBy.set(a, [...new Set(keys)]);
    D.any = D.profiles.size > 0 || D.defaults.length > 0 || D.vint.size > 0;
    return D;
  }
  let _data = null;
  function load() {
    if (!_data) {
      _data = Promise.all([VM.data.json(P_PROF).catch(() => null), VM.data.json(P_VINT).catch(() => null)])
        .then(([p, v]) => normData(p, v))
        .catch(e => { console.warn('[ageing] data', e); return normData(null, null); });
    }
    return _data;
  }

  /* ---------- which profile applies ---------- */
  function defaultFor(D, country, style, cat, subcat) {
    if (!D.defaults.length) return null;
    const want = [country, style, cat, subcat].map(x => String(x || '').toLowerCase());
    let best = null, bs = -1;
    for (const [parts, prof] of D.defaults) {
      /* "<country>|<style>|<category>" with an optional "|<unit type>" for broad zones */
      const pp = parts.length >= 3 ? [...parts.slice(0, 4), '*', '*'].slice(0, 4) : parts.length === 2 ? [parts[0], parts[1], '*', '*'] : ['*', parts[0], '*', '*'];
      let s = 0, ok = true;
      for (let i = 0; i < 4; i++) {
        if (pp[i] === '*') continue;
        if (pp[i] === want[i]) s += [4, 8, 2, 1][i]; else { ok = false; break; }
      }
      if (ok && s > bs) { bs = s; best = { prof, parts: pp }; }
    }
    return best;
  }
  function defaultLabel(d, S) {
    const lab = d.prof.label || '';
    if (lab && !/^default\b/i.test(lab)) return lab;
    const [c, s, k] = d.parts;
    const w = s === 'mixed' ? 'wines of mixed style' : s !== '*' ? (STYLE_W[s] || 'wines') : 'wines';
    const paren = (lab.match(/\(([^)]+)\)/) || [])[1];
    return `${k !== '*' ? (S.cat || k.toUpperCase()) + ' ' : ''}${w}${c !== '*' ? ` of ${VM.data.countryName(S.country) || c.toUpperCase()}` : ''}${paren ? ` (${paren})` : ''}`;
  }
  /* ---------- tiers ---------- */
  const SITE_KINDS = new Set(['mga', 'cru', 'vineyard', 'lieu_dit', 'lieu-dit', 'einzellage', 'ried', 'uga', 'single_vineyard', 'clos', 'climat', 'fine']);
  const KIND_TIER = {
    grand_cru: [/grand cru|grand_cru|grosse lage|grosses gewachs|\bgg\b/],
    premier_cru: [/premier|1er|erste lage/],
    cru: [/\bcru\b|\bmga\b|single|vigna|vineyard|\blage\b|lieu|\bclos\b|\bried\b/]
  };
  function matchTier(T, text, exclude) {
    const txt = ' ' + fold(text).replace(/[^a-z0-9]+/g, ' ') + ' ';
    let best = null, bs = 0;
    for (const t of T) {
      const phrases = new Set([t.key.replace(/[_-]+/g, ' '), t.label, ...t.label.split(/[(),/·]+/)].map(x => fold(x).replace(/[^a-z0-9]+/g, ' ').trim()).filter(x => x.length >= 2 && !exclude.has(x)));
      for (const ph of phrases) if (txt.includes(' ' + ph + ' ') && ph.length > bs) { bs = ph.length; best = t.key; }
    }
    return best;
  }
  const KIND_SUBCAT = { mga: 'MGA', grand_cru: 'Grand Cru', premier_cru: 'Premier Cru', lieu_dit: 'Lieu-dit', einzellage: 'Einzellage', ried: 'Ried', uga: 'UGA' };
  /* the tiers that make sense here: counted from the vintage (unless all are wanted), and of the chosen colour when the
     place has a chart per colour (Corton: a red grand cru tier and a white one) */
  function tierList(S, o = {}) {
    const P = S && S.profile && S.profile.data;
    if (!P) return [];
    let T = o.all ? P.tiers.slice() : P.tiers.filter(t => !t.basis);
    const col = o.colour !== undefined ? o.colour : (S.styleOpts && S.styleOpts.length > 1 ? S.colour : null);
    if (col) { const m = T.filter(t => !t.colour || t.colour === col); if (m.length) T = m; }
    return T;
  }
  function tierFor(S, o = {}) {
    const P = S && S.profile && S.profile.data;
    if (!P) return null;
    const T = tierList(S, o);
    if (!T.length) return P.defaultTier;
    if (T.length === 1) return T[0].key;
    const has = k => T.some(t => t.key === k);
    const exclude = new Set(['typical', 'wine', 'wines', ...String(S.appName || '').split(/\s+/).map(w => fold(w)).filter(Boolean), fold(S.appName || '')]);
    if (o.hint) { const m = matchTier(T, o.hint, exclude); if (m) return m; }
    /* the research's _fine_tier: a unit type in a country -> preferred tiers of the parent's profile */
    const kind = fold(S.kindHint || '').replace(/[\s-]+/g, '_');
    const D = S.D;
    if (D && S.fineId && D.fineOverride.has(S.fineId)) { const k = D.fineOverride.get(S.fineId); return has(k) ? k : (has(P.defaultTier) ? P.defaultTier : T[0].key); }
    const sub = S.fineSubcat || KIND_SUBCAT[kind] || null;
    if (sub && D && D.fineTier.size) {
      const pk = S.profile.id ? `${S.profile.id}|${sub}`.toLowerCase() : null;
      const l = (pk && D.fineTier.get(pk)) || D.fineTier.get(`${S.country}|${sub}`.toLowerCase());
      if (l) { const k = l.find(has); return k || (has(P.defaultTier) ? P.defaultTier : T[0].key); }
    }
    if (kind && P.tierFor && has(P.tierFor[kind])) return P.tierFor[kind];
    if (kind) {
      const pats = KIND_TIER[kind] || (SITE_KINDS.has(kind) ? KIND_TIER.cru : null);
      if (pats) for (const re of pats) { const t = T.find(x => re.test(fold(x.key.replace(/_/g, ' ') + ' ' + x.label))); if (t) return t.key; }
    }
    if (S.classHint) { const m = matchTier(T, S.classHint, exclude); if (m) return m; }
    return has(P.defaultTier) ? P.defaultTier : T[0].key;
  }

  /* a fine unit's candidates for its appellation (profiles.json _meta.fine_units): the part of the id before
     "-premier-cru-" or "-grand-cru-" (its index parent can be spatial: fr-givry-premier-cru-crausot -> fr-givry),
     then its parent chain. Main appellations never walk their index parent, which is spatial (Barbaresco sits
     inside Dolcetto d'Alba DOC). */
  function fineCandidates(fid) {
    const out = [];
    const m = String(fid).match(/^(.+?)-(?:premier|grand)-cru-/);
    if (m && VM.data.indexById.has(m[1])) out.push(m[1]);
    let x = VM.data.indexById.get(fid);
    for (let i = 0; x && x.parent && i < 8; i++) { if (!out.includes(x.parent)) out.push(x.parent); x = VM.data.indexById.get(x.parent); }
    return out;
  }

  /* ---------- the subject: everything known about a place's ageing ---------- */
  const SUBS = new Map();
  function subject(id, h = {}) {
    const key = id + '|' + (h.style || '');
    if (!SUBS.has(key)) SUBS.set(key, resolve(id, h).catch(e => { console.warn('[ageing]', id, e); return null; }));
    return SUBS.get(key);
  }
  const race = (p, ms) => Promise.race([Promise.resolve(p).catch(() => null), VM.util.sleep(ms)]);
  async function resolve(id, h) {
    const D = await load();
    if (!D.any) return null;
    const type = VM.data.typeOf(id);
    if (!['appellation', 'site', 'region'].includes(type)) return null;
    await race(VM.data.loadIndex(), 4000);
    const S = {
      D, id, type, name: id, country: VM.data.isoOf(id), style: null, cat: null, appId: null, appName: null, fineId: null, siteId: null, regionId: null,
      kindHint: null, classHint: null, profile: null, vint: new Map(), vintFrom: [], weather: null, tierDefault: null, _events: null
    };
    if (type === 'site') {
      if (!VM.data.siteById.has(id)) await race(VM.data.loadSites(), 4000);
      const s = VM.data.siteById.get(id) || {};
      const c = await race(VM.data.content(S.country), 4000);
      const cs = arr(c && c.sites).find(x => x.id === id) || {};
      S.siteId = id; S.name = s.name || cs.name || id;
      S.kindHint = s.kind || cs.kind || null; S.classHint = s.class || cs.class || null;
      const app = s.app || cs.app || null;
      const ae = app && VM.data.indexById.get(app);
      if (ae && ae.fine) { S.fineId = app; S.fineSubcat = ae.subcat || null; } else S.appId = app || cs.app_main || null;
      if (!S.fineId && !S.appId) S.appId = cs.app_main || null;
    } else if (type === 'appellation') {
      const ae = VM.data.indexById.get(id);
      if (!ae) return null;
      S.name = ae.name;
      if (ae.fine) { S.fineId = id; S.kindHint = ae.subcat || 'fine'; S.fineSubcat = ae.subcat || null; } else S.appId = id;
    } else {
      if (!VM.data.regionById.has(id)) await race(VM.data.loadRegions(), 3000);
      S.regionId = id; S.name = (VM.data.regionById.get(id) || {}).name || VM.data.entity(id)?.name || id;
    }
    /* a fine unit takes the first candidate with a profile, else the first a vintage chart covers, else its parent */
    if (S.fineId) {
      const cand = fineCandidates(S.fineId);
      S.fineCand = cand;
      S.appId = cand.find(x => D.profiles.has(x)) || cand.find(x => D.coveredBy.has(x) || D.vintBase.has(x)) || cand[0] || null;
    }
    const main = S.appId && VM.data.indexById.get(S.appId);
    if (main) {
      S.cat = main.cat || null; S.subcat = main.subcat || null; S.appName = main.name; S.country = main.country || S.country; S.mainStyle = main.style || null;
      S.style = main.style && main.style !== 'mixed' ? main.style : null;
    }
    const fe = S.fineId && VM.data.indexById.get(S.fineId);
    if (fe && fe.style && fe.style !== 'mixed') S.style = fe.style;
    if (h.style) S.style = h.style;
    if (!S.style && S.appId) {
      const c = await race(VM.data.content(VM.data.isoOf(S.appId)), 3000);
      const pr = c && c.profiles && c.profiles[S.appId];
      if (pr && pr.dominant_style && pr.dominant_style !== 'mixed') S.style = pr.dominant_style;
    }
    /* the profile, most specific first */
    const own = [S.siteId, S.fineId, S.appId, S.regionId].filter(Boolean);
    const take = (x, how) => { if (!S.profile && D.profiles.has(x)) S.profile = { id: x, data: D.profiles.get(x), how }; };
    for (const x of own) take(x, 'own');
    /* a fine unit's further candidates (when the first profiled one is not its appellation's) */
    for (const x of S.fineCand || []) take(x, 'parent');
    /* vintage reports: charts keyed on the place itself (also "<id>:<colour>"), then the charts that cover it;
       a fine unit or site walks up to the first appellation a chart covers. Two colours: pick by style. */
    const keyStyle = k => (D.meta.get(k) || {}).style || k.split(':')[1] || null;
    let keys = [];
    const addKeys = list => { for (const k of list) if (D.vint.has(k) && !keys.includes(k)) keys.push(k); };
    for (const x of own) { addKeys(D.vintBase.get(x) || []); addKeys(D.coveredBy.get(x) || []); }
    if (!keys.length && S.fineCand) for (const x of S.fineCand) { addKeys(D.vintBase.get(x) || []); addKeys(D.coveredBy.get(x) || []); if (keys.length) break; }
    const styles = [...new Set(keys.map(keyStyle).filter(Boolean))];
    S.styleOpts = styles.length > 1 ? styles : [];
    if (styles.length > 1) {
      const want = S.style && styles.includes(S.style) ? S.style : styles.includes('red') ? 'red' : styles[0];
      S.colour = want;
      keys = keys.filter(k => !keyStyle(k) || keyStyle(k) === want);
    } else S.colour = S.style || styles[0] || null;
    if (!S.style && S.colour) S.style = S.colour;
    for (const k of keys) {
      S.vintFrom.push(k);
      for (const [y, e] of D.vint.get(k)) if (!S.vint.has(y)) S.vint.set(y, e);
    }
    /* a region without a profile of its own reads its charts' reference profile */
    if (!S.profile && S.regionId) for (const k of keys) { const pm = D.meta.get(k); if (pm && pm.profile && D.profiles.has(pm.profile)) { S.profile = { id: pm.profile, data: D.profiles.get(pm.profile), how: 'ref' }; break; } }
    if (!S.profile && S.appId) {
      const d = defaultFor(D, S.country, S.style || S.mainStyle || 'mixed', S.cat, S.subcat);
      if (d) S.profile = { id: null, data: d.prof, how: 'default', label: defaultLabel(d, S) };
    }
    S.refLabel = keys.map(k => (D.meta.get(k) || {}).refLabel).find(Boolean) || null;
    S.chartLabel = keys.map(k => (D.meta.get(k) || {}).label).find(Boolean) || null;
    /* weather */
    const v = await race(VM.data.vintage(S.siteId || S.fineId || S.appId || S.regionId), 6000);
    if (v && v.data && arr(v.data.gst).length) S.weather = prepWeather(v);
    S.tierDefault = tierFor(S);
    if (!S.profile && !S.vint.size) return S.regionId ? S : null;
    return S;
  }
  /* region pages: the appellations its vintage reports cover (or its members) that have their own profile */
  async function regionOptions(rid) {
    const D = await load();
    const cov = new Set();
    for (const [k, s] of D.covers) if (k.split(':')[0] === rid) for (const x of s) cov.add(x);
    let ids = [...cov].filter(x => D.profiles.has(x));
    if (!ids.length) {
      const c = await race(VM.data.content(VM.data.isoOf(rid)), 4000);
      const r = arr(c && c.regions).find(x => x.id === rid);
      ids = [...new Set(arr(r && r.app_ids))].filter(x => x && D.profiles.has(x));
    }
    return ids.slice(0, 12).map(x => ({ id: x, name: VM.data.indexById.get(x)?.name || x }));
  }
  function eventsOf(S) {
    if (!S._events) S._events = race(VM.data.events(S.siteId || S.fineId || S.appId || S.regionId), 6000).then(x => arr(x));
    return S._events;
  }
  const placeId = S => S.siteId || S.fineId || S.appId || S.regionId;

  /* ---------- weather of a vintage ---------- */
  function prepWeather(v) {
    const d = v.data, n = d.gst.length, y0 = d.y0;
    const span = k => { const a = []; for (let i = 0; i < n; i++) { const y = y0 + i; const x = d[k] && d[k][i]; if (y >= 1991 && y <= 2020 && x != null) a.push(x); } return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null; };
    return { id: v.id, inherited: v.inherited, d, y0, n, norm: { gst: (d.n9120 && d.n9120.gst) ?? span('gst'), hr: span('hr'), hd: span('hd') } };
  }
  function wx(S, y) {
    const W = S.weather;
    if (!W) return null;
    const i = y - W.y0, d = W.d;
    if (i < 0 || i >= W.n || d.gst[i] == null || W.norm.gst == null) return null;
    const g = k => (d[k] && d[k][i] != null ? d[k][i] : null);
    return { gst: d.gst[i], an: d.gst[i] - W.norm.gst, gdd: g('gdd'), hr: g('hr'), hrN: W.norm.hr, hd: g('hd'), hdN: W.norm.hd, fr: g('fr') };
  }

  /* ---------- the window of one vintage ---------- */
  const sgn = v => VM.fmt.signed(v, 1, ' °C');
  function adjustments(S, y, tier, e) {
    const out = [];
    const w = wx(S, y);
    if (w && w.an != null) {
      const an = w.an;
      const wet = w.hr != null && w.hrN && w.hr >= w.hrN * 1.75 && w.hr - w.hrN >= 60;
      if (an >= 1.8) out.push({ d: [-2, -2, -2, -3], text: `A very hot season (${sgn(an)} on 1991–2020): riper, softer and lower in acid, so it opens and peaks sooner.` });
      else if (an >= 1.0) out.push({ d: [-1, -1, -1, -2], text: `A warm season (${sgn(an)} on 1991–2020): riper fruit and softer acidity, so it comes round a little sooner.` });
      else if (an <= -1.0) out.push({ d: [1, 1, 0, 0], text: `A cool season (${sgn(an)} on 1991–2020): firmer acidity and tannin, slower to open.` });
      if (wet) out.push({ d: [0, 0, -1, -1], text: `A wet harvest (${fmt(w.hr)} mm of rain against a usual ${fmt(w.hrN)}): some wines are diluted and fade a little sooner.` });
    }
    if (e && e.q != null) {
      if (e.q >= 5) out.push({ d: [0, 0, 1, 2], text: 'Rated outstanding in vintage reports: the best wines outlast the typical window.' });
      else if (e.q <= 2) out.push({ d: [-1, -1, -2, -3], text: `Rated ${e.q === 1 ? 'poor' : 'weak'} in vintage reports: lighter wines to drink sooner.` });
    }
    /* scaled to the length of the window: three years matter to a Barolo, not to a rosé */
    const f = clamp(tier.limit / 20, 0.25, 1);
    for (const r of out) r.d = r.d.map(x => Math.sign(x) * Math.round(Math.abs(x) * f));
    return out.filter(r => r.d.some(Boolean));
  }
  function shiftText(d) {
    const p = [];
    const a = d[0] || d[1], b = d[3] || d[2];
    if (a) p.push(a < 0 ? `opens ${yrs(a)} sooner` : `opens ${yrs(a)} later`);
    if (b) p.push(b < 0 ? `fades ${yrs(b)} sooner` : `lasts ${yrs(b)} longer`);
    return p.join(', ');
  }
  /* the research's rule (vintages.json _meta.status_rule): before the window young; then approachable, peak, a
     mature plateau, and the last fifth of the window to drink up */
  function statusOf(R, Y = NOW) {
    if (Y < R.ready) return 'young';
    if (Y < R.p0) return 'approachable';
    if (Y <= R.p1) return 'peak';
    if (Y > R.limit) return 'past';
    return Y > R.du ? 'drink_up' : 'mature';
  }
  function compute(S, year, tierKey, o = {}) {
    if (!S || !year) return null;
    const P = S.profile ? S.profile.data : null;
    let tier = P ? (P.tierMap[tierKey] || P.tierMap[P.defaultTier] || P.tiers[0]) : null;
    if (tier && tier.basis) tier = tierList(S)[0] || null;
    const e = S.vint.get(year) || null;
    const R = { year, tier, entry: e, prov: null, reasons: [], ready: null, p0: null, p1: null, du: null, limit: null, peak: true, wx: wx(S, year), status: null, statusSrc: 'computed', refLabel: null, shifted: false };
    let pts;
    if (e && e.window) {
      /* a vintage report: its window is for the chart's reference tier; another tier shifts it additively
         (from += tier.ready - ref.ready, to += tier.limit - ref.limit, from never before the vintage) */
      R.prov = 'report';
      let [f, t] = e.window;
      const em = (S.D && S.D.meta.get(e.from)) || {};
      const rk = em.refTier || e.tier;
      const refProf = em.profile && S.D && S.D.profiles.get(em.profile);
      let ref = refProf && rk && refProf.tierMap[rk] ? refProf.tierMap[rk] : P && rk && P.tierMap[rk] ? P.tierMap[rk] : null;
      R.refLabel = em.refLabel || (ref ? ref.label : null);
      const spanRef = ref ? ref.limit - ref.ready : 15;
      if (f == null) f = t - spanRef;
      if (t == null) t = f + spanRef;
      let base = ref;
      if (tier && !ref && P && P.tierMap[P.defaultTier] !== tier) base = P.tierMap[P.defaultTier];
      if (tier && base && base !== tier) {
        const d0 = tier.ready - base.ready, d3 = tier.limit - base.limit;
        if (d0 || d3) {
          f += d0; t += d3; R.shifted = true;
          R.reasons.push({ kind: 'tier', d: [d0, d0, d3, d3], text: `The report's window, ${e.window[0]}–${e.window[1]}, is for ${ref ? (R.refLabel || ref.label) : `${base.label} (taken as the reference)`}; ${tier.label} ${shiftText([d0, d0, d3, d3]) || 'follows it'}.` });
        }
      }
      f = Math.max(f, year); t = Math.max(t, f);
      const sp = t - f;
      pts = [f, f + 0.15 * sp, f + 0.5 * sp, t];
      R.duAt = f + 0.8 * sp;
    } else if (tier) {
      R.prov = 'estimated';
      pts = [year + tier.ready, year + tier.peak[0], year + tier.peak[1], year + tier.limit];
      const adj = adjustments(S, year, tier, e);
      const sum = [0, 0, 0, 0];
      for (const a of adj) a.d.forEach((x, i) => { sum[i] += x; });
      pts = pts.map((x, i) => x + clamp(sum[i], -3, 3));
      R.reasons.push(...adj.map(a => ({ ...a, kind: 'weather' })));
    } else return null;
    let dStyle = null;
    if (P && P.ps && (o.style === 'traditional' || o.style === 'modern')) {
      const base = o.style === 'traditional' ? P.ps.trad : P.ps.mod;
      const f = P.ps.scaled ? clamp((tier ? tier.limit : 20) / 20, 0.25, 1) : 1;
      dStyle = base.map(x => Math.sign(x) * Math.round(Math.abs(x) * f));
      pts = pts.map((x, i) => x + dStyle[i]);
      R.reasons.push({ d: dStyle, kind: 'style', text: `${o.style === 'traditional' ? 'A traditional' : 'A modern'} producer: ${shiftText(dStyle) || 'little change'}.` });
      R.style = o.style;
    }
    pts = pts.map(x => Math.round(x));
    const r = Math.max(year, pts[0]), a = Math.max(r, pts[1]), b = Math.max(a, pts[2]), L = Math.max(b, pts[3]);
    const du = R.duAt != null ? Math.round(R.duAt + (dStyle ? dStyle[3] : 0)) : L - Math.max(1, Math.round(0.2 * (L - r)));
    Object.assign(R, { ready: r, p0: a, p1: b, limit: L, du: clamp(du, b, L) });
    R.status = statusOf(R);
    if (e && e.status && R.prov === 'report' && !R.shifted && !R.style) { R.status = e.status; R.statusSrc = 'report'; }
    return R;
  }
  /* the window a cellar keeps: from approachable to the limit, like a critic's drink window */
  const drinkWin = w => (w ? { from: w.ready, to: w.limit } : null);
  function bucketOf(win, Y = NOW) {
    if (!win || (win.from == null && win.to == null)) return null;
    if (win.from != null && Y < win.from) return 'hold';
    if (win.to != null && Y > win.to) return 'past';
    if (win.to != null && win.to - Y <= 1) return 'soon';
    return 'now';
  }

  /* ---------- words ---------- */
  function windowText(w) {
    return [w.ready <= w.year ? 'approachable on release' : `approachable from ${w.ready}`, w.p0 === w.p1 ? `peak around ${w.p0}` : `peak ${w.p0}–${w.p1}`, `keeps to ~${w.limit}`].join(', ');
  }
  function nowText(w, Y = NOW) {
    const n = k => (k <= 0 ? 'this year' : k === 1 ? 'over the next year or so' : `over the next ~${k} years`);
    switch (w.status) {
      case 'young': return `still young; hold until ${w.p0}${w.ready > Y ? ` (approachable from ${w.ready})` : ''}`;
      case 'approachable': return `approachable now, at its best from ${w.p0}`;
      /* a report's peak runs on into a mature plateau (to 80% of its window); a profile's peak is the plateau */
      case 'peak': { const end = w.prov === 'report' ? w.du : w.p1; return end > Y ? `at its peak, drink ${n(end - Y)}` : `at the end of its peak, drink ${n(w.limit - Y)}`; }
      case 'mature': return `mature, past its peak but holding; drink ${n(w.du - Y > 0 ? w.du - Y : w.limit - Y)}`;
      case 'drink_up': return `drink up: it keeps to about ${w.limit}`;
      case 'past': return `past its expected life of about ${w.limit}; a well-kept bottle can still surprise, so open it soon`;
      default: return `in its window, drink ${n(w.limit - Y)}`;
    }
  }
  const provText = w => (w.prov === 'report' ? 'from vintage reports' : w.reasons.some(r => r.kind === 'weather') ? 'estimated from typical ageing, adjusted for the vintage' : 'estimated from typical ageing');
  function profWhere(S) {
    const p = S.profile;
    if (!p) return '';
    if (p.how === 'default') return `typical ${p.label}`;
    return VM.data.entity(p.id)?.name || p.id;
  }
  const stBadge = (st, extra = '') => `<span class="ag-st ag-s-${STATUS[st].col}"><i aria-hidden="true"></i>${esc(STATUS[st].label)}${extra}</span>`;
  const qDots = q => (q ? `<span class="ag-q" role="img" aria-label="rated ${q} of 5">${'<i class="on"></i>'.repeat(q)}${'<i></i>'.repeat(5 - q)}</span>` : '');
  /* "hot, early" is a short descriptor: set it apart from the note */
  const charHTML = e => (e.character ? `<em class="ag-char">${inl(cap(e.character.replace(/[.\s]+$/, '')))}.</em>` : '');
  const srcLinks = list => list.filter(s => s.url).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join(', ');
  const tierLine = t => `${esc(t.label)}: approachable after about ${yrs(t.ready)}, at its best from ${fmt(t.peak[0])} to ${fmt(t.peak[1])}, keeps to about ${fmt(t.limit)}`;
  function wxHTML(w, S) {
    if (!w) return '';
    const p = [`<b class="vm-num">${w.gst.toFixed(1)} °C</b> season mean, <span class="vm-num ${w.an >= 0 ? 'ag-w' : 'ag-c'}">${sgn(w.an)}</span> on 1991–2020`];
    if (w.hr != null) p.push(`harvest rain <span class="vm-num">${fmt(w.hr)} mm</span>${w.hrN ? ` (usual ${fmt(w.hrN)})` : ''}`);
    if (w.hd != null) p.push(`<span class="vm-num">${fmt(w.hd)}</span> day${w.hd === 1 ? '' : 's'} over 35 °C`);
    if (w.fr) p.push(`<span class="vm-num">${fmt(w.fr)}</span> frost night${w.fr === 1 ? '' : 's'} after budburst`);
    const inh = S.weather && S.weather.inherited ? ` <span class="note">(record of ${esc(VM.data.entity(S.weather.id)?.name || S.weather.id)})</span>` : '';
    return p.join(' · ') + inh;
  }
  const EVK = { frost: 'Frost', hail: 'Hail', heat: 'Heat', drought: 'Drought', rain: 'Rain', fire: 'Fire', smoke: 'Smoke', flood: 'Flood', great: 'Great vintage', cool: 'Cool year', mildew: 'Mildew', other: 'Note' };
  const evHTML = list => list.map(x => `<p class="ag-ev"><span class="ag-evk"><i class="ek ek-${esc(EVK[x.kind] ? x.kind : 'other')}" aria-hidden="true"></i>${esc(EVK[x.kind] || 'Note')}</span> ${inl(x.text)}${x.src && /^https?:/.test(x.src) ? ` <a href="${esc(x.src)}" target="_blank" rel="noopener noreferrer" class="ag-srcl">source</a>` : ''}</p>`).join('');

  /* ---------- drawing a window: the chart row and the gauge share these segments ---------- */
  function segs(w, X, o = {}) {
    const seg = (cls, a, b) => (b > a ? `<i class="${cls}" style="left:${(X(a) * 100).toFixed(2)}%;width:${((X(b) - X(a)) * 100).toFixed(2)}%"></i>` : '');
    const du = w.du != null ? w.du : w.p1;
    return seg('ag-pre', w.year, w.ready) + seg('ag-op', w.ready, w.p0) + seg('ag-pk', w.p0, w.p1 + 1) + seg('ag-mt', w.p1 + 1, du + 1) + seg('ag-dc', du + 1, w.limit + 1) + (o.tick ? `<i class="ag-v" style="left:${(X(w.year) * 100).toFixed(2)}%"></i>` : '');
  }
  /* the big gauge: one bottle's life, with years under the bar and "now" above it */
  function gaugeHTML(w, o = {}) {
    const x0 = w.year, x1 = Math.max(w.limit + 1, NOW + 1, o.user && o.user.to ? o.user.to + 1 : 0) + 1;
    const X = y => clamp((y - x0) / (x1 - x0), 0, 1);
    const ticks = (w.peak ? [[w.year, ''], [w.ready, 'ready'], [w.p0, 'peak'], [w.p1 + 1, ''], [w.limit + 1, 'limit']] : [[w.year, ''], [w.ready, 'from'], [w.limit + 1, 'to']]);
    const lab = (w.peak ? [w.year, w.ready, w.p0, w.p1, w.limit] : [w.year, w.ready, w.limit]);
    /* tick labels, nudged apart (about 12% of the width each) */
    let xs = ticks.map((t, i) => ({ x: X(t[0]) * 100, y: lab[i], w: t[1] }));
    xs = xs.filter((t, i) => i === 0 || t.y !== xs[i - 1].y);
    for (let i = 1; i < xs.length; i++) if (xs[i].x - xs[i - 1].x < 12) xs[i].x = xs[i - 1].x + 12;
    const over = xs.length ? xs[xs.length - 1].x - 100 : 0;
    if (over > 0) { for (let i = xs.length - 1; i >= 0; i--) { xs[i].x -= over; if (i && xs[i].x - xs[i - 1].x >= 12) break; } }
    for (let i = xs.length - 2; i >= 0; i--) if (xs[i + 1].x - xs[i].x < 12) xs[i].x = xs[i + 1].x - 12;
    for (const t of xs) t.al = t.x < 5 ? ' l' : t.x > 95 ? ' r' : '';
    const nx = X(NOW + 0.5) * 100;
    const user = o.user && (o.user.from || o.user.to) ? `<div class="ag-g-u" aria-hidden="true"><i style="left:${(X(o.user.from || w.year) * 100).toFixed(2)}%;width:${((X((o.user.to || x1 - 1) + 1) - X(o.user.from || w.year)) * 100).toFixed(2)}%"></i><span>your window</span></div>` : '';
    return `<div class="ag-g ag-s-${STATUS[w.status].col}${w.prov === 'report' ? ' rep' : ' est'}" role="img" aria-label="${esc(`${w.year}: ${windowText(w)}. Now ${NOW}: ${nowText(w)}.`)}">
      <div class="ag-g-now${nx > 80 ? ' r' : nx < 20 ? ' l' : ''}" style="left:${nx.toFixed(2)}%" aria-hidden="true"><span>Now · ${NOW}</span></div>
      <div class="ag-g-tr" aria-hidden="true">${segs(w, X)}<i class="ag-g-nl" style="left:${nx.toFixed(2)}%"></i></div>${user}
      <div class="ag-g-ax vm-num" aria-hidden="true">${xs.map(t => `<span class="${t.al.trim()}" style="left:${clamp(t.x, 0, 100).toFixed(2)}%"><b>${t.y}</b>${t.w ? `<small>${t.w}</small>` : ''}</span>`).join('')}</div>
    </div>`;
  }

  /* ---------- the profile section ---------- */
  function cellarYears(S) {
    const J = JR();
    const m = new Map();
    if (!J) return m;
    try {
      const pid = placeId(S);
      for (const b of J.bottlesFor(pid)) if (b.status === 'cellar' && b.vintage) m.set(b.vintage, (m.get(b.vintage) || 0) + (b.quantity || 1));
    } catch (e) { /* journal not ready */ }
    return m;
  }
  function rowsFor(st) {
    const out = [];
    for (let y = NOW - 1; y >= NOW - NROWS; y--) out.push({ y, w: compute(st.sub, y, st.tier, { style: st.style }) });
    return out;
  }
  function chartHTML(st) {
    const rows = rowsFor(st);
    st.rows = rows;
    const lims = rows.map(r => r.w && r.w.limit).filter(x => x != null);
    const x0 = NOW - NROWS, x1 = clamp(Math.max(NOW + 6, ...lims) + 2, NOW + 6, NOW + 52);
    const X = y => clamp((y - x0) / (x1 - x0), 0, 1);
    st.X = X;
    const mine = cellarYears(st.sub);
    st.mine = mine;
    const dec = [];
    for (let y = Math.ceil(x0 / 10) * 10; y <= x1; y += 10) dec.push(y);
    const axis = cls => `<div class="ag-ax ${cls}" aria-hidden="true"><span class="ag-ax-l"></span><span class="ag-ax-t vm-num">${dec.map(y => `<span style="left:${(X(y) * 100).toFixed(2)}%">${y}</span>`).join('')}${cls === 'top' ? `<span class="ag-ax-now" style="left:${(X(NOW + 0.5) * 100).toFixed(2)}%">${NOW}</span>` : ''}</span></div>`;
    const li = rows.map(({ y, w }) => {
      const e = st.sub.vint.get(y);
      const has = mine.get(y);
      const lab = `<span class="ag-yl"><span class="ag-yr vm-num">${y}</span>${e && e.q ? `<span class="ag-q" aria-hidden="true">${'<i class="on"></i>'.repeat(e.q)}${'<i></i>'.repeat(5 - e.q)}</span>` : ''}${has ? `<i class="ag-mine" aria-hidden="true"></i>` : ''}</span>`;
      if (!w) return `<li><button type="button" class="ag-row ag-none" data-y="${y}" tabindex="-1" aria-pressed="false" aria-label="${y}: no report for this vintage">${lab}<span class="ag-tr"><i class="ag-v" style="left:${(X(y) * 100).toFixed(2)}%"></i></span></button></li>`;
      const aria = `${y}: ${windowText(w)}. Now ${STATUS[w.status].label.toLowerCase()}. ${provText(w)}${e && e.q ? `, rated ${e.q} of 5` : ''}${has ? `. ${has} in your cellar` : ''}`;
      return `<li><button type="button" class="ag-row ag-s-${STATUS[w.status].col} ${w.prov === 'report' ? 'rep' : 'est'}" data-y="${y}" tabindex="-1" aria-pressed="false" aria-label="${esc(aria)}">${lab}<span class="ag-tr">${segs(w, X)}</span></button></li>`;
    }).join('');
    return `<div class="ag-ch" style="--nx:${X(NOW + 0.5).toFixed(4)}">${axis('top')}<ul class="ag-rows" aria-label="Vintages ${NOW - NROWS} to ${NOW - 1}, newest first">${li}</ul>${axis('bot')}<div class="ag-tip" hidden></div></div>`;
  }
  function legendHTML(st) {
    const anyRep = st.rows.some(r => r.w && r.w.prov === 'report'), anyEst = st.rows.some(r => r.w && r.w.prov === 'estimated');
    const used = new Set(st.rows.filter(r => r.w).map(r => r.w.status));
    const order = ['young', 'approachable', 'peak', 'mature', 'drink_up', 'past', 'window'].filter(s => used.has(s));
    return `<div class="ag-leg">
      <div class="ag-anat" aria-hidden="true"><span class="ag-anat-b"><i class="ag-pre"></i><i class="ag-op"></i><i class="ag-pk"></i><i class="ag-mt"></i><i class="ag-dc"></i></span>
        <span class="ag-anat-l"><span>too young</span><span>approach&shy;able</span><span>peak</span><span>mature</span><span>drink up</span></span></div>
      <p class="ag-leg-s" aria-hidden="true">${order.map(s => stBadge(s)).join('')}${anyRep && anyEst ? `<span class="ag-k rep"><i></i>from reports</span><span class="ag-k est"><i></i>estimated</span>` : ''}${st.mine && st.mine.size ? `<span class="ag-k"><i class="ag-mine"></i>in your cellar</span>` : ''}<span class="ag-k now"><i></i>${NOW}</span></p>
    </div>`;
  }
  function provHTML(st) {
    const S = st.sub, P = S.profile && S.profile.data;
    const nRep = st.rows.filter(r => r.w && r.w.prov === 'report').length;
    const vsrc = [];
    for (const r of st.rows) if (r.w && r.w.entry) for (const s of r.w.entry.src) if (s.url && !vsrc.some(x => x.url === s.url)) vsrc.push(s);
    const fromNames = S.vintFrom.map(x => VM.data.entity(x)?.name || x);
    const parts = [];
    if (nRep) parts.push(`Windows for ${nRep} of ${NROWS} vintages come from vintage reports${fromNames.length ? ` (${esc(fromNames.join(', '))})` : ''}${vsrc.length ? `: ${srcLinks(vsrc.slice(0, 8))}` : ''}.`);
    if (P) parts.push(`${nRep ? 'The others are' : 'Every window is'} estimated from the typical ageing of ${esc(profWhere(S))}${P.src.length ? ` (${srcLinks(P.src) || esc(P.src.map(s => s.title).join(', '))})` : ''}, shifted by up to three years for each season's weather (TerraClimate) and its report score.`);
    parts.push('A guide for well-kept bottles: cool, steady storage and a good cork lengthen it, magnums age more slowly and half bottles faster.');
    return `<p class="src ag-src">${parts.join(' ')}</p>`;
  }
  /* a place whose wines are all sold ready: no vintage chart, the tiers in words */
  function readyHTML(el, S) {
    const P = S.profile.data;
    el.innerHTML = VM.h.sec('When to drink') + `<p class="ag-lead"><span class="lk">Sold ready to drink</span>These wines are aged before release, so their clock starts at ${P.tiers.every(t => t.basis === 'disgorgement') ? 'disgorgement' : 'bottling'}, not at the vintage.${S.profile.how !== 'own' ? ` <span class="note">Typical of ${esc(profWhere(S))}.</span>` : ''}</p>${P.why ? `<p class="ag-why">${inl(P.why)}</p>` : ''}<ul class="ag-tt">${P.tiers.map(t => `<li>${bottlingLine(t)}.</li>`).join('')}</ul>${P.src.length ? `<p class="src ag-src">${srcLinks(P.src) || esc(P.src.map(x => x.title).join(', '))}</p>` : ''}`;
    el.classList.add('ag-sec');
  }
  function leadHTML(st) {
    const S = st.sub, P = S.profile && S.profile.data;
    if (!P) return `<p class="ag-lead"><span class="lk">From vintage reports</span>Each bar is the drinking window a vintage chart gives${S.chartLabel ? ` for ${esc(S.chartLabel)}` : ''}${S.refLabel ? `, judged on ${esc(S.refLabel)}` : ''}, from a sound producer and good storage. <span class="note">There is no study of typical ageing here yet, so years without a report stay blank.</span></p>`;
    const t = P.tierMap[st.tier] || tierList(S)[0] || P.tierMap[P.defaultTier];
    const p = S.profile;
    let whose = '';
    if (p.how === 'default') whose = `No study of ${esc(S.appName || S.name)} yet, so this uses ${esc(profWhere(S))}.`;
    else if (p.id !== placeId(S)) whose = `Typical ageing of <a href="#${esc(p.id)}">${esc(profWhere(S))}</a>${S.siteId || S.fineId ? `, the appellation of ${esc(S.name)}` : ''}.`;
    const rep = S.vint.size && S.refLabel ? ` Vintage reports here are judged on ${esc(S.refLabel)}; other tiers are shifted by their typical difference.` : '';
    const ready = P.tiers.filter(x => x.basis);
    return `<p class="ag-lead"><span class="lk">Typical, counted from the vintage</span>${tierLine(t)}.${whose || rep ? ` <span class="note">${whose}${rep}</span>` : ''}</p>${P.why ? `<p class="ag-why">${inl(P.why)}</p>` : ''}${ready.length ? `<p class="note ag-readyn">Sold ready and counted from ${fromWhat(ready[0])} instead: ${ready.map(x => `${esc(x.label)} (best within ${yrs(x.peak[1])})`).join(', ')}. <a href="#ageing-${esc(placeId(st.sub))}">Check a bottle</a></p>` : ''}`;
  }
  /* up to four tiers as a segmented choice, more as a list */
  function tierPick(T, cur, name, label, S) {
    if (T.length < 2) return '';
    if (T.length > 4) return `<select class="vm-select ag-tiersel" name="${name}" data-agtier aria-label="${esc(label)}">${T.map(t => `<option value="${esc(t.key)}"${t.key === cur ? ' selected' : ''}>${esc(t.label)}</option>`).join('')}</select>`;
    return `<div class="${segCls(T.length)} ag-tiers" role="radiogroup" aria-label="${esc(label)}" style="--n:${segCols(T.length)}">${T.map(t => `<label title="${esc(t.label)}"><input type="radio" name="${name}" value="${esc(t.key)}" data-agtier${t.key === cur ? ' checked' : ''}>${esc(shortTier(t, S))}</label>`).join('')}</div>`;
  }
  const tiersHTML = (st, name) => tierPick(tierList(st.sub), st.tier, name, 'Tier', st.sub);
  /* "Barbaresco MGA cru" on the Barbaresco page reads "MGA cru"; "Barbaresco (classic blended bottling)" reads
     "Classic blended bottling" */
  function shortTier(t, S) {
    const app = S && S.appName;
    let l = t.label;
    if (app && fold(l).startsWith(fold(app) + ' ')) {
      const rest = l.slice(app.length).trim().replace(/^\((.*)\)$/, '$1').trim();
      if (rest) l = cap(rest);
    }
    return l;
  }
  /* wines sold ready (tawny, sherry, non-vintage fizz) count from bottling or disgorgement */
  const fromWhat = t => (t.basis === 'disgorgement' ? 'disgorgement' : 'bottling');
  const bottlingLine = t => `${esc(t.label)}: ${t.ready ? `ready ${yrs(t.ready)} after ${fromWhat(t)}` : 'ready on release'}, best ${t.peak[0] ? `from ${t.peak[0]} to ${t.peak[1]} years` : `within ${yrs(t.peak[1])}`} of ${fromWhat(t)}, keeps to about ${yrs(t.limit)}`;
  async function detailHTML(st, y) {
    const S = st.sub;
    const row = st.rows.find(r => r.y === y);
    const w = row && row.w;
    const e = S.vint.get(y);
    const evs = (await eventsOf(S)).filter(x => x.year === y);
    const wxr = wx(S, y);
    const has = st.mine && st.mine.get(y);
    let out = `<div class="ag-det-in"><p class="ag-dy"><span class="ag-year">${y}</span>${e && e.q ? qDots(e.q) : ''}${w ? stBadge(w.status) : ''}${w ? `<span class="vm-badge${w.prov === 'report' ? ' ok' : ''}">${esc(provText(w))}</span>` : ''}</p>`;
    if (w) {
      out += `<p class="ag-dw">${esc(cap(windowText(w)))}.</p><p class="ag-dn"><b>Now (${NOW}):</b> ${esc(nowText(w))}.${has ? ` <span class="ag-has">You have ${has} in your cellar.</span>` : ''}</p>`;
    } else out += `<p class="note">No vintage report and no typical ageing to estimate from.</p>`;
    if (e && (e.character || e.note)) out += `<p class="ag-dc-t"><span class="lk">The vintage</span>${charHTML(e)}${e.note ? ` ${inl(e.note)}` : ''}${srcLinks(e.src) ? ` <span class="ag-srcl">${srcLinks(e.src)}</span>` : ''}${e.from && e.from !== placeId(S) ? ` <span class="note">(report for ${esc(VM.data.entity(e.from)?.name || e.from)})</span>` : ''}</p>`;
    if (w && w.reasons.length) out += `<ul class="ag-why-l">${w.reasons.map(r => `<li>${esc(r.text)}${r.kind === 'weather' ? ` <span class="vm-num ag-sh">${esc(shiftText(r.d))}</span>` : ''}</li>`).join('')}</ul>`;
    if (wxr) out += `<p class="ag-wx"><span class="lk">Weather</span>${wxHTML(wxr, S)}</p>`;
    if (evs.length) out += evHTML(evs.slice(0, 4));
    const pid = placeId(S);
    out += `<div class="btn-row ag-det-act"><button type="button" class="btn small ghost" data-ag="prev" ${y <= NOW - NROWS ? 'disabled' : ''} aria-label="Older vintage">‹ ${y - 1}</button><button type="button" class="btn small ghost" data-ag="next" ${y >= NOW - 1 ? 'disabled' : ''} aria-label="Newer vintage">${y + 1} ›</button>${w && pid ? `<a class="btn small" href="#ageing-${esc(pid)}-${y}" data-ag="check">Check a bottle of ${y}</a>` : ''}</div></div>`;
    return out;
  }
  function drawSection(st) {
    const { el } = st;
    const name = 'ag-tier-' + (++UID);
    let out = VM.h.sec('When to drink');
    if (st.opts && st.opts.length) out += `<label class="vm-field ag-reg"><span>Wine</span><select class="vm-select" data-ag="wine">${st.opts.map(o => `<option value="${esc(o.id)}"${o.id === st.sub.id ? ' selected' : ''}>${esc(o.name)}</option>`).join('')}</select></label>`;
    if (st.sub.styleOpts && st.sub.styleOpts.length > 1) out += `<div class="${segCls(st.sub.styleOpts.length)} ag-colour" role="radiogroup" aria-label="Colour" style="--n:${segCols(st.sub.styleOpts.length)}">${st.sub.styleOpts.map(c => `<label><input type="radio" name="${name}-c" value="${esc(c)}"${c === st.sub.colour ? ' checked' : ''}>${esc(COLOUR[c] || prettyKey(c))}</label>`).join('')}</div>`;
    out += leadHTML(st) + tiersHTML(st, name);
    const ch = chartHTML(st);
    out += legendHTML(st) + `<p class="note ag-hint">Each bar is one vintage's life, from the harvest to the year it should be drunk by; the line is ${NOW}. Tap a vintage for its story.</p>` + ch + provHTML(st);
    el.innerHTML = out;
    el.classList.add('ag-sec');
    bindSection(st);
    if (st.sel) select(st, st.sel, false);
  }
  async function select(st, y, focus) {
    const { el } = st;
    const list = el.querySelector('.ag-rows');
    if (!list) return;
    const btn = list.querySelector(`.ag-row[data-y="${y}"]`);
    if (!btn) return;
    st.sel = y;
    for (const b of list.querySelectorAll('.ag-row')) { b.setAttribute('aria-pressed', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; }
    if (focus) btn.focus({ preventScroll: false });
    let d = list.querySelector('.ag-dli');
    if (!d) { d = document.createElement('li'); d.className = 'ag-dli'; d.setAttribute('aria-live', 'polite'); }
    btn.parentElement.after(d);
    const gen = (st.dgen = (st.dgen || 0) + 1);
    const html = await detailHTML(st, y);
    if (gen !== st.dgen || !d.isConnected) return;
    d.innerHTML = html;
  }
  function bindSection(st) {
    const { el } = st;
    const list = el.querySelector('.ag-rows');
    const first = list && (list.querySelector('.ag-row[aria-pressed="true"]') || list.querySelector('.ag-row'));
    if (first) first.tabIndex = 0;
    el.querySelectorAll('[data-agtier]').forEach(r => r.addEventListener('change', () => { if (r.tagName === 'SELECT' || r.checked) { st.tier = r.value; VM.store.set('ag-tier:' + placeId(st.sub), r.value); redraw(st); } }));
    el.querySelector('[data-ag="wine"]')?.addEventListener('change', async ev => {
      const sub = await subject(ev.target.value);
      if (!sub) return;
      st.sub = sub; st.subId = ev.target.value; st.tier = sub.tierDefault; st.sel = null;
      drawSection(st);
    });
    el.querySelectorAll('.ag-colour input').forEach(r => r.addEventListener('change', async () => {
      if (!r.checked) return;
      const sub = await subject(st.subId, { style: r.value });
      if (!sub || !el.isConnected) return;
      const P = sub.profile && sub.profile.data;
      st.sub = sub; if (!tierList(sub).some(t => t.key === st.tier)) st.tier = sub.tierDefault;
      drawSection(st);
    }));
    if (!list) return;
    list.addEventListener('click', ev => {
      const tp = el.querySelector('.ag-tip'); if (tp) tp.hidden = true;
      const b = ev.target.closest('.ag-row');
      if (b) { if (st.sel === +b.dataset.y && b.getAttribute('aria-pressed') === 'true') { closeDetail(st); return; } select(st, +b.dataset.y, false); return; }
      const a = ev.target.closest('[data-ag]');
      if (!a) return;
      if (a.dataset.ag === 'prev') select(st, st.sel - 1, true);
      else if (a.dataset.ag === 'next') select(st, st.sel + 1, true);
      else if (a.dataset.ag === 'check') NEXT_TIER = { id: placeId(st.sub), tier: st.tier };
    });
    list.addEventListener('keydown', ev => {
      const b = ev.target.closest('.ag-row');
      if (!b) return;
      const y = +b.dataset.y;
      const step = { ArrowDown: -1, ArrowUp: 1, PageDown: -5, PageUp: 5 }[ev.key];
      if (step) { ev.preventDefault(); const n = clamp(y + step, NOW - NROWS, NOW - 1); const nb = list.querySelector(`.ag-row[data-y="${n}"]`); if (nb) { list.querySelectorAll('.ag-row').forEach(x => { x.tabIndex = x === nb ? 0 : -1; }); nb.focus(); if (st.sel != null) select(st, n, true); } }
      if (ev.key === 'Escape' && st.sel != null) { ev.preventDefault(); closeDetail(st); b.focus(); }
    });
    /* desktop hover: a one-line read-out next to the pointer */
    const tip = el.querySelector('.ag-tip'), ch = el.querySelector('.ag-ch');
    list.addEventListener('pointermove', ev => {
      if (ev.pointerType !== 'mouse') return;
      const b = ev.target.closest('.ag-row');
      /* the open row already shows its story below */
      if (!b || b.getAttribute('aria-pressed') === 'true') { tip.hidden = true; return; }
      const r = st.rows.find(x => x.y === +b.dataset.y);
      tip.innerHTML = r && r.w ? `<b class="vm-num">${r.y}</b> ${stBadge(r.w.status)}<span>${esc(cap(windowText(r.w)))}</span><small>${esc(provText(r.w))}</small>` : `<b class="vm-num">${b.dataset.y}</b><span>no report</span>`;
      tip.hidden = false;
      const cr = ch.getBoundingClientRect(), br = b.getBoundingClientRect();
      const x = clamp(ev.clientX - cr.left + 14, 0, Math.max(0, cr.width - tip.offsetWidth));
      tip.style.left = x + 'px';
      tip.style.top = (br.bottom - cr.top + 4) + 'px';
    });
    list.addEventListener('pointerleave', () => { tip.hidden = true; });
  }
  function closeDetail(st) {
    const d = st.el.querySelector('.ag-dli');
    if (d) d.remove();
    st.el.querySelectorAll('.ag-row').forEach(b => b.setAttribute('aria-pressed', 'false'));
    st.sel = null;
  }
  const redraw = st => drawSection(st);
  let NEXT_TIER = null;
  VM.panel.addSection(['appellation', 'site', 'region'], async (el, e) => {
    const D = await load();
    if (!D.any) return false;
    const base = await subject(e.id);
    if (!base) return false;
    let sub = base, opts = null;
    if (e.type === 'region' && !base.profile) {
      opts = await regionOptions(e.id);
      if (opts.length) { const s2 = await subject(opts[0].id); if (s2) sub = s2; else opts = null; }
    }
    if (!sub || (!sub.profile && !sub.vint.size)) return false;
    if (!el.isConnected) return;
    const saved = VM.store.get('ag-tier:' + placeId(sub), null);
    const P = sub.profile && sub.profile.data;
    const TL = tierList(sub);
    if (P && !TL.length && !sub.vint.size) { readyHTML(el, sub); return; }
    const st = { el, e, sub, subId: sub === base ? e.id : opts[0].id, opts, tier: saved && TL.some(t => t.key === saved) ? saved : sub.tierDefault, style: null, sel: null };
    /* open the vintage of a bottle in the cellar from here, if there is one */
    const mine = [...cellarYears(sub).keys()].filter(y => y >= NOW - NROWS && y < NOW).sort((a, b) => b - a);
    if (mine.length) st.sel = mine[0];
    drawSection(st);
  }, { id: 'ageing', slot: 'mid', order: 25 });

  /* ---------- "Check a bottle" (#ageing, #ageing-<id>, #ageing-<id>-<vintage>) ---------- */
  const CK = { id: null, vintage: null, tier: null, style: 'either', producer: '' };
  try { const s = VM.store.get('ag-check', null); if (s && typeof s === 'object') { if (VM.data.typeOf(s.id)) CK.id = s.id; if (num(s.vintage)) CK.vintage = +s.vintage; if (s.style) CK.style = s.style; if (s.tier) CK.tier = s.tier; } } catch (e) { /* storage blocked */ }
  const saveCK = () => VM.store.set('ag-check', { id: CK.id, vintage: CK.vintage, tier: CK.tier, style: CK.style });
  let CKEL = null, CKGEN = 0;
  function quietHash(h) {
    try { history.replaceState(history.state, '', '#' + h); } catch (e) { /* sandboxed */ }
    try { if (typeof APP === 'object' && APP) APP.cur = h; } catch (e) { /* no core */ }
  }
  function checkShell() {
    const J = JR();
    return `<div class="head"><p class="eyebrow">Cellar tools</p><h2 class="title">Check a bottle</h2><p class="tagline">How long it ages, and when to open it.</p></div>
      <form class="ag-form" novalidate>
        <div class="vm-field"><span id="ag-pl">Appellation, cru or estate</span><div class="ag-pick" data-ag="pick"></div></div>
        <div class="ag-2"><label class="vm-field"><span>Vintage</span><input class="vm-input vm-num" name="vintage" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="${NOW - 10}" value="${CK.vintage || ''}"></label>
        ${J ? `<label class="vm-field"><span>Producer <i>optional</i></span><input class="vm-input" name="producer" autocomplete="off" autocapitalize="words" placeholder="For your cellar" value="${esc(CK.producer || '')}"></label>` : ''}</div>
        <div class="vm-field" data-ag="colour" hidden></div>
        <div class="vm-field" data-ag="tiers" hidden></div>
        <div class="vm-field" data-ag="style" hidden></div>
      </form>
      <div class="ag-res" aria-live="polite"></div>`;
  }
  async function renderCheck(el, ctx) {
    CKEL = el;
    const arg = (ctx && ctx.arg) || '';
    if (arg) {
      const m = arg.match(/^(.+?)-(\d{4})$/);
      let id = arg, y = null;
      if (m && VM.data.typeOf(m[1])) { id = m[1]; y = +m[2]; }
      if (VM.data.typeOf(id)) { if (id !== CK.id) { CK.tier = null; CK.colour = null; } CK.id = id; if (y) CK.vintage = y; }
    }
    if (NEXT_TIER && NEXT_TIER.id === CK.id) CK.tier = NEXT_TIER.tier;
    NEXT_TIER = null;
    el.innerHTML = checkShell();
    bindCheck(el);
    await drawCheck(el, true);
  }
  function pickHTML(S) {
    if (!CK.id) return `<button type="button" class="btn ag-pickbtn" data-ag="choose">${SEARCH_IC} Choose from the atlas</button>`;
    const ent = VM.data.entity(CK.id) || {};
    const name = S ? S.name : ent.name || CK.id;
    const meta = S ? [S.siteId ? (S.appName || '') : S.fineId ? `${ent.data?.subcat || 'zone'} in ${S.appName || ''}` : (S.cat || ''), VM.data.countryName(S.country)].filter(Boolean).join(' · ') : '';
    return `<span class="ag-picked"><a href="#${esc(CK.id)}" class="ag-pp">${esc(name)}</a><small>${esc(meta)}</small></span><button type="button" class="btn small ghost" data-ag="choose">Change</button>`;
  }
  function styleHTML(P) {
    if (!P || !P.ps) return '';
    const opts = [['traditional', 'Traditional'], ['either', 'Either'], ['modern', 'Modern']];
    return `<span id="ag-sl">Producer style</span><div class="seg seg-inline ag-style" role="radiogroup" aria-labelledby="ag-sl" style="--n:3">${opts.map(([k, l]) => `<label><input type="radio" name="ag-style" value="${k}"${CK.style === k ? ' checked' : ''}>${l}</label>`).join('')}</div>`;
  }
  async function drawCheck(el, full) {
    const gen = ++CKGEN;
    const res = el.querySelector('.ag-res');
    const S = CK.id ? await subject(CK.id, { style: CK.colour || null }) : null;
    if (gen !== CKGEN || CKEL !== el || !el.isConnected) return;
    const P = S && S.profile && S.profile.data;
    const TL = tierList(S, { all: true });
    if (P && !TL.some(t => t.key === CK.tier)) CK.tier = TL.some(t => t.key === S.tierDefault) ? S.tierDefault : (TL[0] || {}).key;
    if (full) {
      el.querySelector('[data-ag="pick"]').innerHTML = pickHTML(S);
      const cb = el.querySelector('[data-ag="colour"]');
      const co = S && S.styleOpts && S.styleOpts.length > 1 ? S.styleOpts : [];
      cb.hidden = !co.length;
      cb.innerHTML = co.length ? `<span id="ag-cl">Colour</span><div class="${segCls(co.length)} ag-colour" role="radiogroup" aria-labelledby="ag-cl" style="--n:${segCols(co.length)}">${co.map(c => `<label><input type="radio" name="ag-ck-colour" value="${esc(c)}"${c === S.colour ? ' checked' : ''}>${esc(COLOUR[c] || prettyKey(c))}</label>`).join('')}</div>` : '';
      const tb = el.querySelector('[data-ag="tiers"]');
      tb.hidden = TL.length < 2;
      tb.innerHTML = TL.length > 1 ? `<span id="ag-tl">Tier</span>${tierPick(TL, CK.tier, 'ag-ck-tier', 'Tier', S)}` : '';
      const sb = el.querySelector('[data-ag="style"]');
      sb.innerHTML = styleHTML(P);
      sb.hidden = !sb.innerHTML;
    }
    if (!CK.id) { res.innerHTML = `<p class="note ag-empty">Pick the appellation, or the cru or estate on the label, then type the vintage. ${(await load()).any ? '' : 'The ageing data is still being prepared.'}</p>`; return; }
    if (!S || (!S.profile && !S.vint.size)) { res.innerHTML = `<p class="vm-empty">No ageing data for ${esc(VM.data.entity(CK.id)?.name || CK.id)} yet.</p>`; return; }
    const y = CK.vintage;
    const tk = P && P.tierMap[CK.tier];
    if (tk && tk.basis) {
      res.innerHTML = `<div class="ag-r"><p class="ag-r-s"><b>${esc(S.name)}, ${esc(tk.label)}:</b> ${esc(bottlingLine(tk).replace(/^[^:]*: /, ''))}.</p><p class="note">Sold ready to drink: its clock starts at ${fromWhat(tk)}, so the vintage does not set its window. The back label or the cork often gives the ${fromWhat(tk)} date.</p>${P.why ? `<dl class="vm-kv ag-kv"><dt>Why</dt><dd>${inl(P.why)}</dd></dl>` : ''}${P.src.length ? `<p class="src">${srcLinks(P.src) || esc(P.src.map(x => x.title).join(', '))}</p>` : ''}</div>`;
      return;
    }
    if (!y || y < 1800 || y > NOW) {
      res.innerHTML = (y && y > NOW ? `<p class="jr-err ag-err" role="alert">The vintage should be ${NOW} or earlier.</p>` : '') + (P ? `${VM.h.sec('Typical ageing')}<ul class="ag-tt">${TL.map(t => `<li><b>${esc(t.label)}</b> ${(t.basis ? bottlingLine(t) : tierLine(t)).replace(/^[^:]*: /, '')}.</li>`).join('')}</ul><p class="note">Type the vintage to see its window.</p>` : '<p class="note">Type the vintage to see its window.</p>');
      return;
    }
    const w = compute(S, y, CK.tier, { style: CK.style });
    if (!w) { res.innerHTML = `<p class="vm-empty">No report for ${y} and no typical ageing to estimate from.</p>`; return; }
    const evs = (await eventsOf(S)).filter(x => x.year === y);
    if (gen !== CKGEN || !el.isConnected) return;
    const t = w.tier;
    const tierPart = t && TL.length > 1 && t.key !== P.defaultTier ? shortTier(t, S) : '';
    const place = S.siteId || S.fineId ? `${S.appName && !fold(S.name).startsWith(fold(S.appName)) ? S.appName + ' ' : ''}${S.name}` : S.name;
    const subj = `${y} ${place}${tierPart ? `, ${tierPart}` : ''}`;
    const e = w.entry;
    const J = JR();
    let out = `<div class="ag-r">
      <p class="ag-r-s"><b>${esc(subj)}:</b> ${esc(windowText(w))}.</p>
      ${gaugeHTML(w)}
      <p class="ag-r-now">${stBadge(w.status)} <span><b>Now (${NOW}):</b> ${esc(nowText(w))}.</span></p>
      <p class="ag-r-p"><span class="vm-badge${w.prov === 'report' ? ' ok' : ''}">${esc(provText(w))}</span>${e && e.q ? ` ${qDots(e.q)}` : ''}</p>
      <dl class="vm-kv ag-kv">`;
    if (P && P.why) out += `<dt>Why</dt><dd>${inl(P.why)}${S.profile.how !== 'own' ? ` <span class="note">(${esc(S.profile.how === 'default' ? profWhere(S) : 'typical of ' + profWhere(S))})</span>` : ''}</dd>`;
    if (e && (e.character || e.note)) out += `<dt>This vintage</dt><dd>${charHTML(e)}${e.note ? ` ${inl(e.note)}` : ''}${srcLinks(e.src) ? ` <span class="ag-srcl">${srcLinks(e.src)}</span>` : ''}</dd>`;
    if (w.reasons.length) out += `<dt>${w.prov === 'report' ? 'Adjusted' : 'Adjusted for'}</dt><dd><ul class="ag-why-l">${w.reasons.map(r => `<li>${esc(r.text)}${r.kind === 'weather' ? ` <span class="vm-num ag-sh">${esc(shiftText(r.d))}</span>` : ''}</li>`).join('')}</ul></dd>`;
    else if (w.prov === 'estimated') out += `<dt>Adjusted for</dt><dd>Nothing: ${w.wx ? 'an ordinary season for this place' : 'no weather record for this year'}, so the typical window stands.</dd>`;
    if (P && P.ps && (P.ps.text || P.ps.tradText || P.ps.modText)) out += `<dt>Producer style</dt><dd>${inl(CK.style === 'traditional' && P.ps.tradText ? P.ps.tradText : CK.style === 'modern' && P.ps.modText ? P.ps.modText : P.ps.text || [P.ps.tradText, P.ps.modText].filter(Boolean).join(' '))}</dd>`;
    if (w.wx) out += `<dt>Weather</dt><dd>${wxHTML(w.wx, S)}</dd>`;
    if (evs.length) out += `<dt>Notes</dt><dd>${evHTML(evs.slice(0, 3))}</dd>`;
    out += `</dl>`;
    if (P) out += `<p class="note ag-tiers-note">${P.tiers.length > 1 ? P.tiers.filter(x => !x.basis).map(x => `<span${x.key === (t && t.key) ? ' class="on"' : ''}>${esc(x.label)} ${x.ready}, ${x.peak[0]}–${x.peak[1]}, ${x.limit}</span>`).join(' · ') + ' (years after the vintage: ready, peak, limit).' : ''}</p>`;
    out += `<div class="btn-row ag-r-act">${J ? `<button type="button" class="btn solid" data-ag="add">Add to my cellar</button>` : ''}<a class="btn ghost" href="#${esc(placeId(S))}">Open ${esc(S.name)}</a></div>`;
    if (J) out += `<p class="note ag-added" aria-live="polite"></p>`;
    const psrc = P && P.src.length ? (srcLinks(P.src) || esc(P.src.map(s => s.title).join(', '))) : '';
    out += `<p class="src">${w.prov === 'report' ? `Window from the vintage report${e && srcLinks(e.src) ? ` (${srcLinks(e.src)})` : ''}${psrc ? `; typical ageing by tier from ${psrc}` : ''}` : `Estimated from the typical ageing of ${esc(profWhere(S))}${psrc ? ` (${psrc})` : ''}`}. Weather: TerraClimate. A guide for well-kept bottles; storage, the cork and the bottle size move it.</p></div>`;
    res.innerHTML = out;
    CK.last = { S, w };
    quietHash(`ageing-${placeId(S)}-${y}`);
  }
  function bindCheck(el) {
    const form = el.querySelector('.ag-form');
    form.addEventListener('submit', ev => ev.preventDefault());
    let t = 0;
    form.addEventListener('input', ev => {
      const x = ev.target;
      if (x.name === 'vintage') {
        x.value = x.value.replace(/\D/g, '').slice(0, 4);
        const v = x.value.length === 4 ? +x.value : null;
        if (v !== CK.vintage) { CK.vintage = v; saveCK(); clearTimeout(t); t = setTimeout(() => drawCheck(el, false), 120); }
      } else if (x.name === 'producer') CK.producer = x.value;
    });
    form.addEventListener('change', ev => {
      const x = ev.target;
      if (x.name === 'ag-ck-tier') { CK.tier = x.value; saveCK(); drawCheck(el, false); }
      if (x.name === 'ag-ck-colour') { CK.colour = x.value; drawCheck(el, true); }
      if (x.name === 'ag-style') { CK.style = x.value; saveCK(); drawCheck(el, false); }
    });
    el.addEventListener('click', async ev => {
      if (CKEL !== el) return;
      const a = ev.target.closest('[data-ag]');
      if (!a) return;
      if (a.dataset.ag === 'choose') {
        const r = await VM.search.pick({ types: ['appellation', 'site'], label: 'Pick the appellation, cru or estate', placeholder: 'Search appellations, crus and estates' });
        VM.panel.snap('full');
        if (!r || CKEL !== el || !el.isConnected) return;
        CK.id = r.id; CK.tier = null; CK.colour = null; saveCK();
        await drawCheck(el, true);
        const v = el.querySelector('[name="vintage"]');
        if (v && !v.value && !VM.isPhone()) v.focus();
      } else if (a.dataset.ag === 'add') addToCellar(el, a);
    });
  }
  async function addToCellar(el, btn) {
    const J = JR();
    const last = CK.last;
    if (!J || !last) return;
    const { S, w } = last;
    const P = S.profile && S.profile.data;
    const win = drinkWin(w);
    const tierLabel = w.tier && P && P.tiers.length > 1 && w.tier.key !== P.defaultTier ? w.tier.label : null;
    btn.disabled = true;
    try {
      const saved = await J.saveBottle({
        status: 'cellar', quantity: 1, vintage: w.year, producer: str(CK.producer),
        wine: S.siteId ? S.name : null,
        appellation_id: S.fineId || S.appId || null, appellation_name: S.appName || null, site_id: S.siteId || null, region_id: S.regionId || null,
        country: S.country || null, style: S.style || null, classification: tierLabel,
        drink_from: win.from, drink_to: win.to
      });
      const note = el.querySelector('.ag-added');
      if (note) note.innerHTML = `In your cellar, to drink ${win.from}–${win.to} (${esc(provText(w))}). <a href="#journal-bottle-${esc(saved.id)}">Open the bottle</a>`;
      btn.textContent = 'Added';
      VM.toast(`Added to your cellar: drink ${win.from}–${win.to}.`);
    } catch (e) {
      btn.disabled = false;
      VM.toast('Could not add it: ' + (e.message || e));
    }
  }
  VM.panel.register('ageing', { title: 'Check a bottle', crumb: 'Check a bottle', snap: 'full', render: renderCheck, onClose() { CKEL = null; } });
  VM.nav.add({ id: 'ageing', label: 'Ageing', icon: ICON, order: 11, title: 'Check a bottle: how long it ages and when to drink it' });

  /* ---------- the cellar journal: gauges, the Cellar tab filter, "Suggest window" ---------- */
  const BW = new Map();
  function bottleWindow(b) {
    const key = b.id + '|' + b.updated_at + '|' + b.drink_from + '|' + b.drink_to;
    if (BW.has(key)) return BW.get(key);
    const p = (async () => {
      const user = b.drink_from || b.drink_to ? { from: b.drink_from || null, to: b.drink_to || null } : null;
      let est = null, S = null;
      const pid = b.site_id || b.appellation_id || b.region_id;
      if (b.vintage && pid && VM.data.typeOf(pid)) {
        S = await subject(pid, { style: b.style || null });
        if (S && S.profile) {
          const tier = tierFor(S, { hint: b.classification, colour: b.style || null });
          est = compute(S, b.vintage, tier, {});
        } else if (S) est = compute(S, b.vintage, null, {});
      }
      const win = user || drinkWin(est);
      return { b, user, est, S, win, bucket: bucketOf(win) };
    })().catch(e => { console.warn('[ageing] bottle', e); return { b, user: null, est: null, win: null, bucket: null }; });
    BW.set(key, p);
    return p;
  }
  function miniHTML(r) {
    const w = r.est, u = r.user;
    const y0 = r.b.vintage || (u && u.from) || NOW;
    const end = Math.max(NOW + 1, w ? w.limit + 1 : 0, u && u.to ? u.to + 1 : 0) + 1;
    const X = y => clamp((y - y0) / Math.max(1, end - y0), 0, 1);
    let bar = '';
    if (u) {
      const a = u.from || y0, b = (u.to || end - 1) + 1;
      bar = `<i class="ag-mu" style="left:${(X(a) * 100).toFixed(2)}%;width:${((X(b) - X(a)) * 100).toFixed(2)}%"></i>`;
      if (w) bar = `<span class="ag-mg-e">${segs(w, X)}</span>` + bar;
    } else if (w) bar = segs(w, X);
    return `<span class="ag-mg${w && !u ? ` ag-s-${STATUS[w.status].col}` : ''}" aria-hidden="true">${bar}<i class="ag-mg-n" style="left:${(X(NOW + 0.5) * 100).toFixed(2)}%"></i></span>`;
  }
  function rowLine(r) {
    if (!r.win) return r.b.vintage ? `<span class="ag-rl ag-na">No ageing data for this wine yet</span>` : '';
    const k = r.bucket;
    const win = r.win;
    const yrs2 = win.from && win.to ? `${win.from}–${win.to}` : win.from ? `from ${win.from}` : `to ${win.to}`;
    const st = r.est && !r.user ? ` · ${STATUS[r.est.status].label.toLowerCase()}` : '';
    return `<span class="ag-rl"><b class="ag-bk ag-s-${BUCKET_COL[k]}"><i aria-hidden="true"></i>${BUCKET[k]}</b> <span class="vm-num">${yrs2}</span><span class="ag-rs">${st} · ${r.user ? 'your window' : 'estimated'}</span></span>`;
  }
  function decorateRow(a) {
    const J = JR();
    const m = (a.getAttribute('href') || '').match(/^#journal-bottle-([0-9a-f-]{36})$/);
    const b = J && m ? J.bottle(m[1]) : null;
    if (!b || b.status !== 'cellar') { a.dataset.ag = '0'; return null; }
    a.dataset.ag = '1';
    return bottleWindow(b).then(r => {
      if (!a.isConnected) return r;
      const nm = a.querySelector('.row-name');
      if (nm && !nm.querySelector('.ag-rw')) nm.insertAdjacentHTML('beforeend', `<span class="ag-rw">${rowLine(r)}${r.win ? miniHTML(r) : ''}</span>`);
      const li = a.closest('li');
      if (li) { li.dataset.agb = r.bucket || 'none'; li.dataset.agt = String((r.win && (r.win.to || r.win.from)) || 9999); li.dataset.agf = String((r.win && r.win.from) || 0); }
      return r;
    });
  }
  let CF = VM.store.get('ag-cellar-filter', 'all');
  async function decorateCellar(panel) {
    const ul = panel.querySelector('ul.jr-list');
    if (!ul || panel.querySelector('.ag-cf')) return;
    const bar = document.createElement('div');
    bar.className = 'ag-cf-w';
    bar.innerHTML = `<div class="ag-cf" role="group" aria-label="Show bottles by drinking window"></div>`;
    ul.before(bar);
    const lis = [...ul.children];
    const rs = await Promise.all(lis.map(li => { const a = li.querySelector('a.jr-row'); return a ? (a.dataset.ag === '1' && li.dataset.agb ? Promise.resolve(null) : decorateRow(a)) : null; }));
    void rs;
    if (!bar.isConnected) return;
    const count = { all: 0, now: 0, soon: 0, hold: 0, past: 0, none: 0 };
    for (const li of lis) { const k = li.dataset.agb || 'none'; count[k] = (count[k] || 0) + 1; count.all++; }
    /* sort: past its window and closing first, then ready, then waiting; unknown last */
    const rank = li => (li.dataset.agb && BUCKET_ORDER[li.dataset.agb] != null ? BUCKET_ORDER[li.dataset.agb] : 9);
    const sorted = lis.slice().sort((x, y) => rank(x) - rank(y) || (x.dataset.agb === 'hold' ? (+x.dataset.agf - +y.dataset.agf) : (+x.dataset.agt - +y.dataset.agt)));
    for (const li of sorted) ul.appendChild(li);
    if (!['all', 'now', 'soon', 'hold', 'past', 'none'].includes(CF) || (CF !== 'all' && !count[CF])) CF = 'all';
    const btn = (k, l) => `<button type="button" data-cf="${k}" aria-pressed="${CF === k}"${k !== 'all' && !count[k] ? ' disabled' : ''}>${k !== 'all' && k !== 'none' ? `<i class="ag-dot ag-s-${BUCKET_COL[k]}" aria-hidden="true"></i>` : ''}${l} <span class="vm-num">${count[k] || 0}</span></button>`;
    bar.querySelector('.ag-cf').innerHTML = btn('all', 'All') + ['now', 'soon', 'hold', 'past'].map(k => btn(k, BUCKET[k])).join('') + (count.none ? btn('none', 'No window') : '');
    bar.insertAdjacentHTML('beforeend', `<p class="note ag-cf-n">Sorted by when to drink: past peak and closing windows first. Your own drink window counts where you set one; otherwise the atlas estimates it from the appellation, tier and vintage.</p>`);
    const apply = () => {
      for (const li of lis) li.classList.toggle('ag-off', CF !== 'all' && (li.dataset.agb || 'none') !== CF);
      bar.querySelectorAll('[data-cf]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cf === CF)));
    };
    bar.addEventListener('click', ev => { const b = ev.target.closest('[data-cf]'); if (!b) return; CF = b.dataset.cf; VM.store.set('ag-cellar-filter', CF); apply(); });
    apply();
  }
  async function decorateCard(body) {
    const J = JR();
    const m = (location.hash || '').match(/^#journal-bottle-([0-9a-f-]{36})$/) || ((body.querySelector('.jr-cardacts a[href^="#journal-edit-"]') || {}).getAttribute?.('href') || '').match(/^#journal-edit-([0-9a-f-]{36})$/);
    const b = J && m ? J.bottle(m[1]) : null;
    const anchor = body.querySelector('dl.ledger');
    if (!b || !anchor || anchor.dataset.ag) return;
    anchor.dataset.ag = '1';
    const sec = document.createElement('section');
    sec.className = 'ag-card-sec';
    sec.hidden = true;
    anchor.after(sec);
    const r = await bottleWindow(b);
    if (!sec.isConnected) return;
    if (!r.est && !r.user) { sec.remove(); return; }
    const w = r.est;
    let out = VM.h.sec('When to drink');
    if (w) {
      out += gaugeHTML(w, { user: r.user });
      out += `<p class="ag-r-now">${stBadge(w.status)} <span><b>Now (${NOW}):</b> ${esc(nowText(w))}.</span></p>`;
      out += `<p class="ag-r-s">${esc(cap(windowText(w)))}${w.tier && r.S && r.S.profile && r.S.profile.data.tiers.length > 1 ? ` <span class="note">(${esc(w.tier.label)})</span>` : ''}. <span class="vm-badge${w.prov === 'report' ? ' ok' : ''}">${esc(provText(w))}</span></p>`;
    }
    if (r.user) {
      const u = r.user, k = bucketOf(u);
      out += `<p class="ag-yours"><b class="ag-bk ag-s-${BUCKET_COL[k]}"><i aria-hidden="true"></i>${BUCKET[k]}</b> by your window, <span class="vm-num">${u.from && u.to ? `${u.from}–${u.to}` : u.from ? `from ${u.from}` : `to ${u.to}`}</span>${w ? `; the atlas would say <span class="vm-num">${drinkWin(w).from}–${drinkWin(w).to}</span>` : ''}.</p>`;
    } else if (w) {
      const win = drinkWin(w);
      out += `<p class="ag-yours"><b class="ag-bk ag-s-${BUCKET_COL[bucketOf(win)]}"><i aria-hidden="true"></i>${BUCKET[bucketOf(win)]}</b> No drink window of your own yet; the estimate is <span class="vm-num">${win.from}–${win.to}</span>, from approachable to the limit.</p>`;
    }
    const pid = r.S ? placeId(r.S) : null;
    out += `<div class="btn-row">${pid ? `<a class="btn small ghost" href="#ageing-${esc(pid)}-${b.vintage}">Check in detail</a>` : ''}${w && !r.user ? `<button type="button" class="btn small" data-ag="use">Use this window</button>` : ''}</div>`;
    sec.innerHTML = out;
    sec.hidden = false;
    sec.querySelector('a[href^="#ageing-"]')?.addEventListener('click', () => { if (w && w.tier) NEXT_TIER = { id: pid, tier: w.tier.key }; });
    sec.querySelector('[data-ag="use"]')?.addEventListener('click', async ev => {
      const btn = ev.currentTarget;
      const cur = J.bottle(b.id);
      if (!cur || cur.drink_from || cur.drink_to) { VM.toast('This bottle already has a drink window.'); return; }
      btn.disabled = true;
      const win = drinkWin(w);
      try { await J.saveBottle({ ...cur, drink_from: win.from, drink_to: win.to }); VM.toast(`Drink window set: ${win.from}–${win.to}.`); } catch (e) { btn.disabled = false; VM.toast('Could not save: ' + (e.message || e)); }
    });
  }
  /* the add / edit form: read what it holds, suggest a window, never overwrite one without asking */
  function formState(form) {
    const val = n => { const i = form.querySelector(`[name="${n}"]`); return i ? i.value : ''; };
    const appA = form.querySelector('[data-slot="app"] a.jr-pp-name');
    const appId = appA && (appA.getAttribute('href') || '').replace(/^#/, '') || null;
    const siteName = (form.querySelector('[data-slot="site"] .jr-pp-name') || {}).textContent || '';
    let siteId = null;
    if (siteName) {
      const J = JR();
      const m = (location.hash || '').match(/^#journal-edit-([0-9a-f-]{36})$/);
      const b = J && m ? J.bottle(m[1]) : null;
      const s0 = b && b.site_id ? VM.data.siteById.get(b.site_id) : null;
      if (b && b.site_id && (!s0 || fold(s0.name) === fold(siteName))) siteId = b.site_id;
      if (!siteId) {
        const cands = (VM.data.sites || []).filter(s => fold(s.name) === fold(siteName));
        const best = cands.find(s => appId && (s.app === appId || s.app_main === appId)) || cands[0];
        siteId = best ? best.id : null;
      }
    }
    const st = form.querySelector('[data-pills="style"] [aria-checked="true"]');
    const nv = form.querySelector('[name="nv"]');
    return { appId: appId && VM.data.typeOf(appId) === 'appellation' ? appId : null, siteId, vintage: nv && nv.checked ? null : num(val('vintage')), style: st ? st.dataset.v : null, cls: val('classification') };
  }
  function decorateForm(form) {
    const to = form.querySelector('[name="drink_to"]');
    const row = to && to.closest('.jr-2col');
    if (!row || form.querySelector('.ag-sug')) return;
    row.insertAdjacentHTML('afterend', `<div class="ag-sug"><button type="button" class="btn small ghost" data-ag="suggest">${ICON} Suggest window</button><p class="note ag-sug-n" aria-live="polite"></p></div>`);
    const box = form.querySelector('.ag-sug');
    const note = box.querySelector('.ag-sug-n');
    const fill = win => {
      for (const [n, v] of [['drink_from', win.from], ['drink_to', win.to]]) {
        const i = form.querySelector(`[name="${n}"]`);
        if (i) { i.value = String(v); i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })); }
      }
    };
    box.addEventListener('click', async ev => {
      const a = ev.target.closest('[data-ag]');
      if (!a) return;
      if (a.dataset.ag === 'replace') { if (box._win) { fill(box._win); note.textContent = `Filled in: ${box._win.from}–${box._win.to}.`; } return; }
      const fs = formState(form);
      if (!fs.vintage) { note.textContent = 'Add the vintage first.'; return; }
      const pid = fs.siteId || fs.appId;
      if (!pid) { note.textContent = 'Choose the appellation from the atlas first.'; return; }
      note.textContent = 'Working it out…';
      const S = await subject(pid, { style: fs.style });
      if (!form.isConnected) return;
      const tier = S && S.profile ? tierFor(S, { hint: fs.cls, colour: fs.style || null }) : null;
      const w = S ? compute(S, fs.vintage, tier, {}) : null;
      if (!w) { note.textContent = `No ageing data for ${S ? S.name : 'this place'} yet.`; return; }
      const win = drinkWin(w);
      box._win = win;
      const why = `${S.name}${w.tier && S.profile.data.tiers.length > 1 ? ` (${w.tier.label})` : ''}, ${fs.vintage}: ${windowText(w)}; ${provText(w)}.`;
      const f0 = form.querySelector('[name="drink_from"]').value.trim(), t0 = form.querySelector('[name="drink_to"]').value.trim();
      if (f0 || t0) {
        if (+f0 === win.from && +t0 === win.to) { note.textContent = `Your window matches the estimate. ${why}`; return; }
        note.innerHTML = `Suggested <span class="vm-num">${win.from}–${win.to}</span>. ${esc(why)} <button type="button" class="linkish" data-ag="replace">Replace yours (${esc(f0 || '…')}–${esc(t0 || '…')})</button>`;
        return;
      }
      fill(win);
      note.textContent = `Filled in ${win.from}–${win.to}, from approachable to the limit. ${why}`;
    });
  }

  /* ---------- Compare: typical ageing by tier, on one scale of years after the vintage ---------- */
  async function decorateCompare(c) {
    if (c.dataset.ag) return;
    c.dataset.ag = '1';
    const box = document.createElement('div');
    box.className = 'ag-cmp';
    box.hidden = true;
    const tw = [...c.querySelectorAll(':scope > h3.sec')].find(h => /twins/i.test(h.textContent));
    if (tw) tw.before(box); else c.appendChild(box);
    const ids = [...document.querySelectorAll('#sheet-body .sm-picks .sm-pk-n a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).slice(0, 3);
    const subs = await Promise.all(ids.map(id => subject(id)));
    if (!box.isConnected) return;
    const rows = subs.map((S, i) => ({ S, i, id: ids[i] })).filter(r => r.S && r.S.profile);
    if (!rows.length) { box.remove(); return; }
    const max = Math.max(10, ...rows.flatMap(r => tierList(r.S, { colour: null }).map(t => t.limit))) + 1;
    const X = y => clamp(y / max, 0, 1);
    const ticks = []; for (let y = 0; y <= max; y += max > 30 ? 10 : 5) ticks.push(y);
    let out = VM.h.sec('Typical ageing');
    out += `<p class="note">Years after the vintage, by tier: thin until ready, light while approachable, solid at the peak, tapering to the limit.</p><div class="ag-cmp-l">`;
    for (const r of rows) {
      const P = r.S.profile.data;
      out += `<div class="ag-cmp-p" style="--c: var(--sm-s${ids.indexOf(r.id) + 1}, var(--ag-peak))"><p class="lk"><i class="sm-sw s${ids.indexOf(r.id) + 1}" aria-hidden="true"></i> ${esc(r.S.name)}${r.S.profile.how !== 'own' ? ` <span class="note">(${esc(r.S.profile.how === 'default' ? profWhere(r.S) : 'as ' + profWhere(r.S))})</span>` : ''}</p>`;
      for (const t of tierList(r.S, { colour: null })) {
        const w = { year: 0, ready: t.ready, p0: t.peak[0], p1: t.peak[1], limit: t.limit, peak: true };
        out += `<div class="ag-cmp-r" role="img" aria-label="${esc(`${r.S.name}, ${t.label}: ready after ${t.ready} years, peak ${t.peak[0]} to ${t.peak[1]}, limit ${t.limit}`)}"><span class="ag-cmp-t">${esc(t.label)}</span><span class="ag-tr" aria-hidden="true">${segs(w, X)}</span><span class="ag-cmp-v vm-num" aria-hidden="true">${t.ready} · ${t.peak[0]}–${t.peak[1]} · ${t.limit}</span></div>`;
      }
      out += `</div>`;
    }
    out += `<div class="ag-cmp-ax vm-num" aria-hidden="true"><span></span><span class="ag-ax-t">${ticks.map(y => `<span style="left:${(X(y) * 100).toFixed(2)}%">${y}</span>`).join('')}</span><span></span></div></div>`;
    out += `<p class="src">Typical windows for good producers and well-kept bottles; each vintage moves them. Open a profile for the vintage chart.</p>`;
    box.innerHTML = out;
    box.hidden = false;
  }

  /* ---------- keeping the journal and Compare decorated as they re-render ---------- */
  let MO = null, pend = 0;
  function decorate() {
    const body = document.getElementById('sheet-body');
    if (!body) return;
    if (JR()) {
      for (const a of body.querySelectorAll('a.jr-row:not([data-ag])')) decorateRow(a);
      if (body.dataset.view === 'journal') {
        if (body.querySelector('.jr-cardacts')) { const l = body.querySelector('dl.ledger'); if (l && !l.dataset.ag) decorateCard(body); }
        const form = body.querySelector('form.jr-form');
        if (form && !form.querySelector('.ag-sug')) decorateForm(form);
        const tab = body.querySelector('.jr-tabs [aria-selected="true"]');
        const panel = body.querySelector('#jr-panel');
        if (tab && tab.dataset.tab === 'cellar' && panel && panel.querySelector('ul.jr-list') && !panel.querySelector('.ag-cf-w')) decorateCellar(panel);
      }
    }
    if (body.dataset.view === 'compare') { const c = body.querySelector('.sm-cmp'); if (c && !c.dataset.ag) decorateCompare(c); }
  }
  function observe() {
    const body = document.getElementById('sheet-body');
    if (!body || MO) return;
    MO = new MutationObserver(() => { if (!pend) pend = requestAnimationFrame(() => { pend = 0; try { decorate(); } catch (e) { console.warn('[ageing]', e); } }); });
    MO.observe(body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observe, { once: true }); else observe();
  VM.on('view', () => { observe(); decorate(); });
  VM.on('profile:open', () => observe());

  /* for other modules and tests */
  VM.ageing = {
    load, subject, compute: (S, y, tier, o) => compute(S, y, tier, o), window: async (id, vintage, o = {}) => {
      const S = await subject(id, { style: o.style || null });
      if (!S) return null;
      const tier = o.tier || tierFor(S, { hint: o.classification });
      const w = compute(S, vintage, tier, { style: o.producerStyle });
      return w ? { ...w, tier: w.tier && w.tier.key, tierLabel: w.tier && w.tier.label, drink: drinkWin(w), bucket: bucketOf(drinkWin(w)), text: windowText(w), now: nowText(w), provenance: provText(w) } : null;
    },
    bottle: b => bottleWindow(b).then(r => ({ bucket: r.bucket, window: r.win, estimated: r.est ? drinkWin(r.est) : null, yours: r.user }))
  };
})();
