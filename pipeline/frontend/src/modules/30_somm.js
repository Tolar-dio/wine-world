/* Vitis Mundi v2, sommelier tools: shared layer for 30_somm_*.js (filters, compare, study, tasting).
   - the attribute table: topo/_attrs.json when present, else the climate of the countries drawn so far
   - place summaries for any id (appellation, fine unit, site, region, country)
   - climate twins in standardised climate space
   - persistence (Supabase via VM.auth.client when signed in, else VM.store)
   - map shims until the lead's API has them (see frontend/API_REQUESTS.md)
   Exposed as VM.somm. */
(() => {
  if (!window.VM) return;
  const { esc, fold, arr, num, clamp } = VM.util;
  const SM = VM.somm = VM.somm || {};

  /* ---------- reference values ---------- */
  const COLS = ['country', 'gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt', 'elev', 'slope', 'aspect', 'area', 'fine'];
  const NUMS = ['gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt', 'elev', 'slope', 'aspect', 'area'];
  const ALIAS = { elev_mean: 'elev', e: 'elev', slope_mean: 'slope', s: 'slope', aspect_mean: 'aspect', a: 'aspect', area_km2: 'area', iso2: 'country', cc: 'country' };
  SM.META = {
    gst: { label: 'Growing-season temperature', short: 'Season warmth', unit: ' °C', d: 1 },
    gdd: { label: 'Growing degree days', short: 'Degree days', unit: '', d: 0 },
    hi: { label: 'Huglin index', short: 'Huglin', unit: '', d: 0 },
    prec: { label: 'Rain over the year', short: 'Rain, year', unit: ' mm', d: 0 },
    gsp: { label: 'Rain in the growing season', short: 'Rain, season', unit: ' mm', d: 0 },
    dtr: { label: 'Day–night swing', short: 'Diurnal range', unit: ' °C', d: 1 },
    mjt: { label: 'Warmest month', short: 'Warmest month', unit: ' °C', d: 1 },
    elev: { label: 'Elevation', short: 'Elevation', unit: ' m', d: 0 },
    slope: { label: 'Mean slope', short: 'Slope', unit: '%', d: 1 },
    aspect: { label: 'Aspect', short: 'Aspect', unit: '°', d: 0 },
    area: { label: 'Area', short: 'Area', unit: ' km²', d: 1 }
  };
  SM.fmtv = (k, v) => {
    if (v == null || Number.isNaN(v)) return '';
    const m = SM.META[k] || { d: 0, unit: '' };
    if (k === 'area') return VM.fmt.area(v)?.v || '';
    if (k === 'aspect') return SM.octName(v);
    return VM.fmt.num(v, m.d) + m.unit;
  };
  SM.OCT = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  SM.OCT_LONG = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
  SM.oct = deg => deg == null || Number.isNaN(deg) ? -1 : Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  SM.octName = deg => { const o = SM.oct(deg); return o < 0 ? '' : SM.OCT[o]; };
  /* Winkler regions as the core draws them (degree days, °C) */
  SM.WK = ['below I', 'I', 'II', 'III', 'IV', 'V'];
  SM.wkIdx = g => g == null || Number.isNaN(g) ? -1 : g < 850 ? 0 : g < 1389 ? 1 : g < 1668 ? 2 : g < 1945 ? 3 : g < 2223 ? 4 : 5;
  SM.hiName = h => h == null || Number.isNaN(h) ? '' : h < 1500 ? 'very cool' : h < 1800 ? 'cool' : h < 2100 ? 'temperate' : h < 2400 ? 'warm temperate' : h < 2700 ? 'warm' : 'very warm';
  /* the Old World, for grouping: Europe, the Caucasus, the eastern Mediterranean and North Africa */
  SM.OLD = new Set('fr it es pt de at ch gr hu ro bg hr si sk cz rs ba me mk al md ua ru ge am az tr cy mt lu be nl gb dk se no pl lt lv ee by ie lb il ps jo sy iq ir eg ly tn dz ma xk li ad mc sm va'.split(' '));
  SM.world = iso => SM.OLD.has(iso) ? 'old' : 'new';
  SM.cmpTok = ['--sm-s1', '--sm-s2', '--sm-s3'];

  /* ---------- small helpers ---------- */
  SM.kmBetween = (a, b) => {
    if (!a || !b) return Infinity;
    const R = 6371, r = Math.PI / 180;
    const dLat = (b[1] - a[1]) * r, dLon = (b[0] - a[0]) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  };
  SM.kmPerPx = (lat, z) => 40075.016686 * Math.cos(lat * Math.PI / 180) / (512 * Math.pow(2, z));
  function ringHas(r, x, y) {
    let c = false;
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const xi = r[i][0], yi = r[i][1], xj = r[j][0], yj = r[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  const polysOf = g => !g ? [] : g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  SM.inGeom = (g, lon, lat) => polysOf(g).some(p => p.length && ringHas(p[0], lon, lat) && !p.slice(1).some(h => ringHas(h, lon, lat)));
  SM.kmToGeom = (g, lon, lat) => {
    const kx = Math.cos(lat * Math.PI / 180) * 111.32, ky = 110.57;
    let best = Infinity;
    for (const p of polysOf(g)) for (const r of p) for (let i = 1; i < r.length; i++) {
      const ax = (r[i - 1][0] - lon) * kx, ay = (r[i - 1][1] - lat) * ky, bx = (r[i][0] - lon) * kx, by = (r[i][1] - lat) * ky;
      const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
      const t = L ? clamp(-(ax * dx + ay * dy) / L, 0, 1) : 0;
      const d = Math.hypot(ax + t * dx, ay + t * dy);
      if (d < best) best = d;
    }
    return best;
  };
  SM.median = a => { const v = a.filter(x => x != null && !Number.isNaN(x)).sort((x, y) => x - y); if (!v.length) return null; const m = v.length >> 1; return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; };
  SM.shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  SM.plural = (n, one, many) => `${VM.fmt.num(n)} ${n === 1 ? one : (many || one + 's')}`;
  SM.nameOf = id => { const e = VM.data.entity(id); return e && e.name && e.name !== id ? e.name : id; };
  SM.list = items => items.length < 2 ? (items[0] || '') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
  /* a crumb-sized description of any place: "AOC · France" */
  SM.metaOf = id => {
    const e = VM.data.entity(id);
    if (!e) return '';
    const cn = e.country ? VM.data.countryName(e.country) : '';
    if (e.type === 'appellation') return [e.subcat || e.cat, cn].filter(Boolean).join(' · ');
    if (e.type === 'site') return ['Site', cn].filter(Boolean).join(' · ');
    if (e.type === 'region') return ['Region', cn].filter(Boolean).join(' · ');
    if (e.type === 'country') return 'Country';
    return '';
  };

  /* ---------- the attribute table ---------- */
  let TAB = null, dirty = false, building = null;
  function emptyTable(n, src) {
    const t = { src, n, ids: new Array(n), at: new Map(), country: new Array(n), fine: new Uint8Array(n), num: {}, has: {} };
    for (const k of NUMS) t.num[k] = new Float32Array(n).fill(NaN);
    return t;
  }
  function finish(t) {
    for (const k of NUMS) { const a = t.num[k]; let c = 0; for (let i = 0; i < t.n; i++) if (!Number.isNaN(a[i])) c++; t.has[k] = c; }
    t.anc = new Map();
    t.ancOf = i => {
      if (t.anc.has(i)) return t.anc.get(i);
      const ids = VM.data.ancestry(t.ids[i]).map(a => a.id);
      t.anc.set(i, ids);
      return ids;
    };
    t.row = id => { const i = t.at.get(id); return i == null ? null : rowObj(t, i); };
    return t;
  }
  function rowObj(t, i) {
    const o = { id: t.ids[i], country: t.country[i], fine: t.fine[i] };
    for (const k of NUMS) { const v = t.num[k][i]; o[k] = Number.isNaN(v) ? null : v; }
    return o;
  }
  function fromAttrs(j) {
    const cols = arr(j._cols).length ? j._cols.map(c => ALIAS[c] || c) : COLS;
    const keys = Object.keys(j).filter(k => k !== '_cols' && Array.isArray(j[k]));
    const t = emptyTable(keys.length, 'attrs');
    const ci = {}; cols.forEach((c, i) => { ci[c] = i; });
    keys.forEach((id, i) => {
      const r = j[id];
      t.ids[i] = id; t.at.set(id, i);
      const ix = VM.data.indexById.get(id);
      t.country[i] = String(r[ci.country] ?? ix?.country ?? VM.data.isoOf(id) ?? '').toLowerCase();
      t.fine[i] = (ci.fine != null ? +r[ci.fine] : 0) || (ix?.fine ? 1 : 0);
      for (const k of NUMS) { const v = ci[k] != null ? num(r[ci[k]]) : null; if (v != null) t.num[k][i] = v; }
      if (Number.isNaN(t.num.area[i]) && ix?.area != null) t.num.area[i] = ix.area;
    });
    return finish(t);
  }
  /* without _attrs.json: the index plus the clim block of every feature already drawn */
  function fromIndex() {
    const idx = VM.data.index;
    const t = emptyTable(idx.length, 'clim');
    idx.forEach((a, i) => {
      t.ids[i] = a.id; t.at.set(a.id, i);
      t.country[i] = a.country; t.fine[i] = a.fine ? 1 : 0;
      if (a.area != null) t.num.area[i] = a.area;
      const c = VM.data.feature(a.id)?.clim;
      if (c) for (const k of ['gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt']) { const v = num(c[k]); if (v != null) t.num[k][i] = v; }
      if (c && c.elev != null) t.num.elev[i] = +c.elev;
    });
    return finish(t);
  }
  SM.table = async function table() {
    if (TAB && !(TAB.src === 'clim' && dirty)) return TAB;
    if (building) return building;
    building = (async () => {
      await Promise.race([VM.data.loadIndex(), VM.util.sleep(15000)]);
      const j = await VM.data.json('data/topo/_attrs.json');
      TAB = j ? fromAttrs(j) : fromIndex();
      dirty = false;
      return TAB;
    })();
    try { return await building; } finally { building = null; }
  };
  SM.tableNow = () => TAB;
  VM.on('data:geo', iso => { if (!TAB || TAB.src === 'clim') { dirty = true; VM.emit('somm:geo', iso); } });

  /* population statistics per column (non-fine rows unless asked), cached */
  const _stats = new Map();
  SM.stats = (t, k, fine) => {
    const key = t.src + t.n + k + (fine ? 'f' : '');
    if (_stats.has(key)) return _stats.get(key);
    const v = [];
    const a = t.num[k];
    for (let i = 0; i < t.n; i++) if (!Number.isNaN(a[i]) && (fine || !t.fine[i])) v.push(a[i]);
    v.sort((x, y) => x - y);
    const q = p => v.length ? v[Math.min(v.length - 1, Math.max(0, Math.round(p * (v.length - 1))))] : null;
    const mean = v.reduce((s, x) => s + x, 0) / (v.length || 1);
    const sd = Math.sqrt(v.reduce((s, x) => s + (x - mean) ** 2, 0) / (v.length || 1)) || 1;
    const s = { n: v.length, mean, sd, q, min: v[0], max: v[v.length - 1] };
    _stats.set(key, s);
    return s;
  };

  /* ---------- grapes per appellation (reverse of _varieties.json, inherited down the nesting) ---------- */
  let REV = null;
  SM.grapeIndex = async () => {
    if (REV) return REV;
    await VM.data.loadGlobals();
    const va = VM.data.varieties || {};
    const rev = new Map();
    for (const [g, ids] of Object.entries(va)) for (const id of arr(ids)) { if (!rev.has(id)) rev.set(id, new Set()); rev.get(id).add(g); }
    if (Object.keys(va).length) REV = rev;
    return rev;
  };
  /* own permitted grapes, else those of the nearest container that lists any */
  SM.grapesOf = (rev, id) => {
    if (rev.has(id)) return { set: rev.get(id), from: id };
    for (const a of VM.data.ancestry(id).reverse()) if (rev.has(a.id)) return { set: rev.get(a.id), from: a.id };
    return { set: new Set(), from: null };
  };

  /* ---------- place summaries ---------- */
  const VKEYS = ['gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt', 'elev', 'slope', 'aspect'];
  function climVals(c) {
    const o = {};
    if (!c) return o;
    for (const k of ['gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt']) if (num(c[k]) != null) o[k] = +c[k];
    if (num(c.elev) != null) o.elev = +c.elev;
    return o;
  }
  async function membersOf(e) {
    const t = await SM.table();
    const ok = id => { const i = t.at.get(id); return i != null && !t.fine[i]; };
    if (e.type === 'country') {
      return VM.data.index.filter(a => a.country === e.id && !a.fine && (a.area || 0) < 30000 && ok(a.id)).map(a => a.id);
    }
    if (e.type === 'region') {
      const iso = e.country;
      const c = iso ? await VM.data.content(iso) : null;
      const r = arr(c?.regions).find(x => x.id === e.id);
      let ids = arr(r?.app_ids).filter(ok);
      if (!ids.length && Array.isArray(e.bbox)) {
        const [w, s, ea, n] = e.bbox;
        ids = VM.data.index.filter(a => a.country === iso && !a.fine && Array.isArray(a.lp) && a.lp[0] >= w && a.lp[0] <= ea && a.lp[1] >= s && a.lp[1] <= n && (a.area || 0) < 5000 && ok(a.id)).map(a => a.id);
      }
      return ids;
    }
    return [];
  }
  /* {id, type, name, country, lp, lat, vals, basis, n, members, area, appId} for any id */
  SM.place = async function place(id) {
    const t = await SM.table();
    const e = VM.data.entity(id);
    if (!e) return null;
    const out = { id, type: e.type, name: e.name, country: e.country, lp: e.lp, vals: {}, basis: 'own', n: 1, members: [], area: e.area ?? null, appId: null, entity: e };
    if (e.type === 'appellation') {
      const r = t.row(id);
      if (r) for (const k of VKEYS) if (r[k] != null) out.vals[k] = r[k];
      for (const [k, v] of Object.entries(climVals(e.clim || VM.data.feature(id)?.clim))) if (out.vals[k] == null) out.vals[k] = v;
      if (out.area == null && r) out.area = r.area;
      out.appId = id;
    } else if (e.type === 'site') {
      const app = e.app;
      out.appId = app || null;
      if (app) {
        const r = t.row(app);
        if (r) for (const k of VKEYS) if (r[k] != null) out.vals[k] = r[k];
        const ae = VM.data.entity(app);
        for (const [k, v] of Object.entries(climVals(ae?.clim || VM.data.feature(app)?.clim))) if (out.vals[k] == null) out.vals[k] = v;
        out.basis = 'app';
      }
      /* terrain of the site itself (150 m around it) replaces the appellation's */
      const tp = await VM.data.topo(id);
      if (tp) { if (tp.e != null) out.vals.elev = tp.e; if (tp.s != null) out.vals.slope = tp.s; if (tp.a != null) out.vals.aspect = tp.a; }
    } else if (e.type === 'region' || e.type === 'country') {
      const ids = await membersOf(e);
      out.members = ids; out.n = ids.length; out.basis = 'median';
      for (const k of VKEYS) {
        if (k === 'aspect') continue;
        const m = SM.median(ids.map(x => t.num[k][t.at.get(x)]));
        if (m != null) out.vals[k] = m;
      }
      if (e.type === 'country') out.area = null;
    }
    out.lat = out.lp ? out.lp[1] : null;
    return out;
  };

  /* ---------- climate twins ----------
     Distance in standardised climate space. Temperature is measured four ways (GST, degree days, Huglin, warmest
     month), so those are down-weighted to count about as much as rain and the day-night swing together. */
  const TW = { gst: 1, gdd: 0.55, hi: 0.55, mjt: 0.45, prec: 0.55, gsp: 0.8, dtr: 0.8 };
  SM.TWIN_KEYS = Object.keys(TW);
  SM.twins = async function twins(id, opts = {}) {
    const k = opts.k || 6;
    const t = await SM.table();
    const p = opts.place || await SM.place(id);
    if (!p) return { list: [], place: null };
    const have = SM.TWIN_KEYS.filter(c => p.vals[c] != null && t.has[c]);
    if (have.length < 4) return { list: [], place: p, reason: 'noclim' };
    const st = {}; for (const c of have) st[c] = SM.stats(t, c, false);
    const zs = {}; for (const c of have) zs[c] = (p.vals[c] - st[c].mean) / st[c].sd;
    /* who is "family": the place itself, its containers and everything inside it */
    const fam = new Set([id]);
    const own = p.appId || (p.type === 'appellation' ? id : null);
    if (own) { fam.add(own); for (const a of VM.data.ancestry(own)) fam.add(a.id); }
    for (const m of p.members) fam.add(m);
    const iso = p.country;
    const sameCountry = opts.sameCountry ?? false;
    const fine = !!opts.fine;
    const maxArea = Math.max(30000, (p.area || 0) * 2);
    const cand = [];
    for (let i = 0; i < t.n; i++) {
      const cid = t.ids[i];
      if (fam.has(cid)) continue;
      if (!fine && t.fine[i]) continue;
      if (!sameCountry && t.country[i] === iso) continue;
      if (p.type === 'country' && t.country[i] === iso) continue;
      const ar = t.num.area[i];
      if (!Number.isNaN(ar) && ar > maxArea) continue;
      let d = 0, w = 0, n = 0;
      for (const c of have) {
        const v = t.num[c][i];
        if (Number.isNaN(v)) continue;
        const z = (v - st[c].mean) / st[c].sd;
        d += TW[c] * (z - zs[c]) ** 2; w += TW[c]; n++;
      }
      if (n < have.length - 1 || !w) continue;
      cand.push([Math.sqrt(d / w), i]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    /* keep the list varied: skip a candidate nested with, or within 20 km of, one already chosen */
    const out = [];
    for (const [d, i] of cand) {
      if (out.length >= k) break;
      const cid = t.ids[i];
      if (own && VM.data.ancestry(cid).some(a => a.id === own)) continue;
      const ix = VM.data.indexById.get(cid);
      const lp = ix?.lp;
      const anc = new Set(t.ancOf(i));
      if (out.some(o => anc.has(o.id) || o.anc.has(cid) || (lp && o.lp && SM.kmBetween(lp, o.lp) < 20))) continue;
      /* worldwide, not one neighbourhood: at most two per country */
      if (!opts.sameCountry && out.filter(o => o.country === t.country[i]).length >= (opts.perCountry ?? 2)) continue;
      out.push({ id: cid, d, i, lp, anc, row: rowObj(t, i), name: ix?.name || SM.nameOf(cid), country: t.country[i] });
    }
    /* if every twin is in the place's own world, name the closest from the other one: a lesson in itself */
    let other = null;
    const myW = SM.world(iso);
    if (out.length && out.every(o => SM.world(o.country) === myW)) {
      for (const [d, i] of cand) {
        if (SM.world(t.country[i]) === myW) continue;
        const cid = t.ids[i];
        if (own && VM.data.ancestry(cid).some(a => a.id === own)) continue;
        const ix = VM.data.indexById.get(cid);
        other = { id: cid, d, i, lp: ix?.lp, row: rowObj(t, i), name: ix?.name || SM.nameOf(cid), country: t.country[i] };
        break;
      }
    }
    return { list: out, other, place: p, keys: have };
  };
  /* "1.2 °C warmer, 80 mm wetter in season": the two largest differences, in words */
  SM.twinDiff = (p, r) => {
    const parts = [];
    const dg = r.gst != null && p.vals.gst != null ? r.gst - p.vals.gst : null;
    if (dg != null) parts.push([Math.abs(dg) / 0.6, Math.abs(dg) < 0.15 ? 'same warmth' : `${VM.fmt.num(Math.abs(dg), 1)} °C ${dg > 0 ? 'warmer' : 'cooler'}`]);
    const dr = r.gsp != null && p.vals.gsp != null ? r.gsp - p.vals.gsp : null;
    if (dr != null) parts.push([Math.abs(dr) / 80, Math.abs(dr) < 15 ? 'similar season rain' : `${VM.fmt.num(Math.abs(dr))} mm ${dr > 0 ? 'wetter' : 'drier'} in season`]);
    const dd = r.dtr != null && p.vals.dtr != null ? r.dtr - p.vals.dtr : null;
    if (dd != null && Math.abs(dd) >= 0.8) parts.push([Math.abs(dd) / 1.2, `${VM.fmt.num(Math.abs(dd), 1)} °C ${dd > 0 ? 'wider' : 'narrower'} day–night swing`]);
    return parts.sort((a, b) => b[0] - a[0]).slice(0, 2).map(x => x[1]).join(', ');
  };

  /* ---------- persistence ---------- */
  SM.cloud = () => (VM.auth && VM.auth.user && VM.auth.client) ? VM.auth.client : null;
  SM.local = {
    get: (k, d) => VM.store.get('somm:' + k, d),
    set: (k, v) => VM.store.set('somm:' + k, v)
  };

  /* ---------- map helpers: the lead's API (VM.map.captureTap / labels, VM.data.ensureGeo), with a fallback
     for builds that predate it ---------- */
  const M = SM.map = {};
  M.ensure = (iso, fine) => {
    if (!iso) return Promise.resolve(false);
    if (VM.data.ensureGeo) return VM.data.ensureGeo(iso, { fine });
    if (typeof ensureCountryGeo === 'function') return ensureCountryGeo(iso, !!fine);
    return Promise.resolve(false);
  };
  /* exclusive taps: while active, a tap on the map goes to fn and does not open a profile */
  M.capture = fn => {
    if (VM.map && typeof VM.map.captureTap === 'function') return VM.map.captureTap(fn);
    const el = document.getElementById('map'), app = document.getElementById('app');
    if (!el) return () => {};
    let down = null;
    const pd = e => { down = { x: e.clientX, y: e.clientY }; };
    const ck = e => {
      const m = VM.map;
      if (!m || !e.target.closest('.maplibregl-canvas-container, canvas')) return;
      e.stopPropagation(); e.preventDefault();
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
      const r = m.getCanvas().getBoundingClientRect();
      const point = { x: e.clientX - r.left, y: e.clientY - r.top };
      const ll = m.unproject([point.x, point.y]);
      try { fn({ point, lngLat: { lng: ll.lng, lat: ll.lat } }); } catch (err) { console.warn('[somm tap]', err); }
    };
    el.addEventListener('pointerdown', pd, true);
    el.addEventListener('click', ck, true);
    if (app) app.dataset.smQuiz = '1';
    return () => { el.removeEventListener('pointerdown', pd, true); el.removeEventListener('click', ck, true); if (app) delete app.dataset.smQuiz; };
  };
  /* hide every place name the map prints, and put back exactly what was there */
  const LABS = ['lab-1', 'lab-2', 'lab-3', 'fine-lab', 'extra-lab', 'reg-lab', 'towns-0', 'towns-1', 'towns-2'];
  let saved = null;
  const hideNow = () => {
    const m = VM.map;
    if (!m || !saved) return;
    for (const id of LABS) if (m.getLayer(id)) {
      if (!(id in saved)) saved[id] = m.getLayoutProperty(id, 'visibility') || 'visible';
      if (m.getLayoutProperty(id, 'visibility') !== 'none') m.setLayoutProperty(id, 'visibility', 'none');
    }
    if (m.getLayer('site-icon')) {
      if (!('site-icon:text' in saved)) saved['site-icon:text'] = m.getLayoutProperty('site-icon', 'text-field');
      const tf = m.getLayoutProperty('site-icon', 'text-field');
      if (tf !== '') m.setLayoutProperty('site-icon', 'text-field', '');
    }
  };
  M.labels = on => {
    if (VM.map && typeof VM.map.labels === 'function') return VM.map.labels(on);
    const m = VM.map;
    if (!m) return;
    if (!on) {
      if (saved) return;
      saved = {};
      hideNow();
      /* layers that arrive later (towns, regions) are caught when the map next settles */
      m.on('idle', hideNow);
    } else if (saved) {
      m.off('idle', hideNow);
      for (const [k, v] of Object.entries(saved)) {
        if (k === 'site-icon:text') { if (m.getLayer('site-icon')) m.setLayoutProperty('site-icon', 'text-field', v); }
        else if (m.getLayer(k)) m.setLayoutProperty(k, 'visibility', v);
      }
      saved = null;
    }
  };
  /* ring markers for things VM.highlight cannot light (sites, region label points, a tap) */
  const rings = new Map();
  M.ring = (key, lon, lat, cls = '') => {
    if (!VM.map || !window.maplibregl || lon == null || lat == null) return;
    let mk = rings.get(key);
    if (!mk) {
      const el = document.createElement('div');
      el.setAttribute('aria-hidden', 'true');
      mk = new maplibregl.Marker({ element: el });
      rings.set(key, mk);
    }
    mk.getElement().className = 'sm-ring ' + cls;
    mk.setLngLat([lon, lat]).addTo(VM.map);
  };
  M.clearRings = prefix => { for (const [k, mk] of [...rings]) if (!prefix || k.startsWith(prefix)) { mk.remove(); rings.delete(k); } };
  /* light a mixed list of ids: appellations and sites through VM.highlight, regions as rings */
  M.light = (ids, opts = {}) => {
    const prefix = opts.prefix || 'l:';
    M.clearRings(prefix);
    const apps = [];
    ids.forEach((id, i) => {
      const t = VM.data.typeOf(id);
      if ((t === 'appellation' && (VM.data.indexById.has(id) || VM.data.feature(id) || VM.data.extra.some(x => x.id === id))) || t === 'site') apps.push(id);
      else {
        const e = VM.data.entity(id);
        if (e?.lp) M.ring(prefix + id, e.lp[0], e.lp[1], (opts.cls || '') + (opts.series ? ' s' + ((opts.series[i] ?? i) + 1) : ''));
      }
    });
    if (apps.length) VM.highlight(apps, { owner: opts.owner || 'somm', dimOthers: opts.dimOthers !== false, label: opts.label, onClear: () => { M.clearRings(prefix); if (opts.onClear) opts.onClear(); } });
    else if (opts.clearOthers !== false) VM.clearHighlight();
    if (opts.fit) VM.frame(ids, typeof opts.fit === 'object' ? opts.fit : { maxZoom: 9 });
    return apps.length;
  };
  /* bbox of a set of ids from what is known without geometry */
  SM.bboxOf = (ids, pad = 0.15) => {
    let w = 180, s = 90, e = -180, n = -90, k = 0;
    for (const id of ids) {
      const x = VM.data.entity(id);
      if (!x) continue;
      const b = Array.isArray(x.bbox) && x.type !== 'country' ? x.bbox : x.lp ? [x.lp[0], x.lp[1], x.lp[0], x.lp[1]] : null;
      if (!b) continue;
      w = Math.min(w, b[0]); s = Math.min(s, b[1]); e = Math.max(e, b[2]); n = Math.max(n, b[3]); k++;
    }
    if (!k) return null;
    const dx = Math.max(0.05, e - w) * pad, dy = Math.max(0.05, n - s) * pad;
    return [w - dx, s - dy, e + dx, n + dy];
  };

  /* ---------- small shared UI ---------- */
  SM.ICON = {
    filter: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    compare: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 4v16M12 8v12M19 12v8"/></svg>',
    study: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 5.5h6.5A2.5 2.5 0 0 1 13 8v11a2 2 0 0 0-2-2H4zM20 5.5h-4.5A2.5 2.5 0 0 0 13 8v11a2 2 0 0 1 2-2h5z"/></svg>'
  };
  /* compact row for a place in a list; meta on the right */
  SM.rowHTML = (id, name, small, meta, attrs = '') => `<li><a class="row" href="#${esc(id)}"${attrs}><span class="row-name">${esc(name)}${small ? `<small>${esc(small)}</small>` : ''}</span>${meta ? `<span class="row-meta">${esc(meta)}</span>` : ''}</a></li>`;
  SM.today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  SM.dayOf = ms => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
})();
