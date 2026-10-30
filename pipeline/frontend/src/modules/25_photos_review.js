/* modules/25_photos_review.js: help check the atlas photos (Pages build only).

   1. Inline: under every profile photo, in its credit row, a quiet "Wrong photo?" control. One tap marks the photo shown
      in the hero as wrong for that place, hides it for this viewer at once and offers "not relevant", "poor quality"
      or Undo. Gallery photos are flagged by showing them in the hero first.
   2. #photo-review (linked from About, no top-bar entry): a grid of the photos, most visible first, 12 to 20 a page,
      tap to cycle Good / Wrong place / Not relevant / Poor quality, keyboard shortcuts, progress, resume, and
      "Show only unreviewed". Images load two at a time (Wikimedia's robot policy for upload.wikimedia.org).

   Storage: signed out, marks live in localStorage. Signed in (VM.auth from the journal module), they are rows in
   public.photo_flags (owner-only RLS; unique per user, target_id and file), cached per user on the device, with an
   outbox for offline writes. Marks made while signed out move into the account on sign-in.

   A mark hides the photo for that place only: 621 Commons files are used by more than one place.

   ---------------------------------------------------------------------------------------------------------------
   VM.photoFlags
     available                       false in the artifact build
     mode()                          'local' | 'cloud' | 'off'
     keyOf(entityId)                 the photo sidecar key used as target_id ('fr-sauternes', 'site-…', 'region-…',
                                     'fr', and for grapes, events and soils the bare key from _global.json)
     verdict(id, file)               'good' | 'wrong' | 'irrelevant' | 'poor' | null   (id: entity id or sidecar key)
     isHidden(id, file)              true for wrong, irrelevant and poor
     set(id, file, verdict, note?)   verdict null clears. Synchronous; the cloud write follows (batched)
     list()                          [{target_id, file, verdict, note, at}]
     onChange(fn)                    fn({what}) after any change; returns unsubscribe. Also VM.emit('photos:flags')
   VM.data.photos(id) is wrapped: hidden photos are filtered out for every caller (profiles, Compare, …).
   --------------------------------------------------------------------------------------------------------------- */
(() => {
  'use strict';
  if (!window.VM) return;
  const { esc, arr } = VM.util;
  const GH = VM.mode === 'gh';
  const KEY = 'vm:photoflags:v1:';
  const VERDICTS = ['good', 'wrong', 'irrelevant', 'poor'];
  const CYCLE = [null, 'good', 'wrong', 'irrelevant', 'poor'];
  const V_NAME = { good: 'Good', wrong: 'Wrong place', irrelevant: 'Not relevant', poor: 'Poor quality' };
  const BAD = new Set(['wrong', 'irrelevant', 'poor']);
  const WIKI = /^https:\/\/upload\.wikimedia\.org\//;
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(KEY + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(KEY + k); } catch (e) { /* blocked */ } }
  };
  const nowIso = () => new Date().toISOString();
  const num = n => VM.fmt.num(n);
  const sideKey = id => String(id || '').replace(/^(grape|event|soil|term)-/, '');
  const fk = (t, f) => t + '|' + f;
  const debounce = (fn, ms) => { let t = 0; const d = () => { clearTimeout(t); t = setTimeout(fn, ms); }; d.now = () => { clearTimeout(t); fn(); }; return d; };

  /* ---------- the store ---------- */
  const PF = { mode: GH ? 'local' : 'off', uid: null, flags: new Map(), outbox: new Map(), subs: new Set(), syncing: false, err: null, warned: false };
  const valid = f => f && typeof f.target_id === 'string' && f.target_id && typeof f.file === 'string' && f.file && VERDICTS.includes(f.verdict);
  const clean = f => ({ target_id: String(f.target_id), file: String(f.file), verdict: f.verdict, note: f.note ? String(f.note).slice(0, 500) : null, at: f.at || f.created_at || nowIso() });
  const toMap = obj => new Map(Object.values(obj || {}).filter(valid).map(clean).map(f => [fk(f.target_id, f.file), f]));
  function loadLocal() { PF.flags = toMap((LS.get('local', null) || {}).flags); }
  function persist() {
    const flags = Object.fromEntries(PF.flags);
    let ok = true;
    if (PF.mode === 'local') ok = LS.set('local', { flags });
    else if (PF.mode === 'cloud' && PF.uid) ok = LS.set('u:' + PF.uid, { flags, outbox: Object.fromEntries([...PF.outbox].map(([k, v]) => [k, v.op])) });
    if (!ok && !PF.warned) { PF.warned = true; VM.toast('This browser is not keeping your photo marks (private browsing?).'); }
  }
  function emit(what) {
    for (const f of [...PF.subs]) { try { f({ what }); } catch (e) { console.warn('[photos]', e); } }
    VM.emit('photos:flags', { what });
  }
  function setVerdict(id, file, verdict, note) {
    if (PF.mode === 'off' || !file) return;
    const t = sideKey(id), k = fk(t, file);
    if (!verdict) {
      if (!PF.flags.has(k)) return;
      PF.flags.delete(k);
      queue(k, 'del');
    } else {
      if (!VERDICTS.includes(verdict)) throw new Error('Unknown verdict ' + verdict);
      const prev = PF.flags.get(k);
      PF.flags.set(k, { target_id: t, file, verdict, note: note !== undefined ? (note ? String(note).slice(0, 500) : null) : (prev ? prev.note : null), at: nowIso() });
      queue(k, 'up');
    }
    persist();
    emit('flags');
  }
  const verdictOf = (id, file) => (PF.flags.get(fk(sideKey(id), file)) || {}).verdict || null;
  const isHidden = (id, file) => BAD.has(verdictOf(id, file));

  /* ---------- cloud ---------- */
  const isNet = r => navigator.onLine === false || !r || r.status === 0 || /fetch|network|load failed|timed? ?out/i.test(String((r.error && r.error.message) || r.message || ''));
  async function sbq(p) { try { const r = await p; return r || { error: { message: 'empty response' }, status: 0 }; } catch (e) { return { error: { message: String((e && e.message) || e) }, status: 0 }; } }
  const client = async () => VM.auth && (VM.auth.client || (VM.auth.getClient && await VM.auth.getClient().catch(() => null)));
  function queue(k, op) {
    if (PF.mode !== 'cloud') return;
    PF.outbox.set(k, { op });
    flushSoon();
  }
  let flushing = null;
  const flushSoon = debounce(() => flush(), 700);
  function flush() {
    if (flushing || PF.mode !== 'cloud' || !PF.outbox.size) return flushing || Promise.resolve();
    flushing = (async () => {
      const c = await client();
      if (!c) { PF.err = 'offline'; return; }
      const uid = PF.uid;
      const snap = [...PF.outbox];
      const ups = snap.filter(([, v]) => v.op === 'up'), dels = snap.filter(([, v]) => v.op === 'del');
      const done = [];
      const rows = ups.map(([k]) => PF.flags.get(k)).filter(Boolean).map(f => ({ user_id: uid, target_id: f.target_id, file: f.file, verdict: f.verdict, note: f.note }));
      for (let i = 0; i < rows.length; i += 500) {
        const r = await sbq(c.from('photo_flags').upsert(rows.slice(i, i + 500), { onConflict: 'user_id,target_id,file' }));
        if (r.error) { if (isNet(r)) { PF.err = 'offline'; return; } fail(r); break; }
      }
      done.push(...ups);
      for (const [k] of dels) {
        const f = k.indexOf('|');
        const r = await sbq(c.from('photo_flags').delete().eq('target_id', k.slice(0, f)).eq('file', k.slice(f + 1)));
        if (r.error && isNet(r)) { PF.err = 'offline'; break; }
        if (r.error) fail(r);
        done.push([k, snap.find(x => x[0] === k)[1]]);
      }
      if (PF.uid !== uid) return;
      for (const [k, v] of done) if (PF.outbox.get(k) === v) PF.outbox.delete(k);
      if (!PF.outbox.size) PF.err = null;
      persist();
    })().finally(() => { flushing = null; emit('sync'); if (PF.outbox.size && !PF.err) flushSoon(); });
    return flushing;
  }
  function fail(r) {
    const m = (r && r.error && r.error.message) || 'unknown error';
    console.warn('[photos] could not save a photo mark: ' + m);
    if (!fail.done) { fail.done = 1; VM.toast('Could not save a photo mark: ' + m); }
  }
  async function refreshCloud() {
    if (PF.mode !== 'cloud') return;
    const c = await client();
    if (!c) return;
    const uid = PF.uid;
    PF.syncing = true; emit('sync');
    const rows = [];
    try {
      for (let from = 0; from < 200000; from += 1000) {
        const r = await sbq(c.from('photo_flags').select('target_id,file,verdict,note,created_at').range(from, from + 999));
        if (r.error) throw r;
        rows.push(...arr(r.data));
        if (arr(r.data).length < 1000) break;
      }
      if (PF.uid !== uid) return;
      const m = toMap(rows.map(x => ({ ...x, at: x.created_at })));
      for (const [k, v] of PF.outbox) { if (v.op === 'up' && PF.flags.has(k)) m.set(k, PF.flags.get(k)); else if (v.op === 'del') m.delete(k); }
      PF.flags = m; PF.err = null;
      persist();
    } catch (e) { PF.err = isNet(e) ? 'offline' : 'error'; }
    PF.syncing = false;
    emit('sync');
    flush();
  }
  /* the account's marks, cached on this device, before the session is confirmed */
  function primeCloud(id) {
    PF.mode = 'cloud'; PF.uid = id;
    const m = LS.get('u:' + id, null) || {};
    PF.flags = toMap(m.flags);
    PF.outbox = new Map(Object.entries(m.outbox || {}).map(([k, op]) => [k, { op }]));
  }
  function onAuth(u) {
    if (!GH) return;
    const id = u && u.id ? u.id : null;
    if (!id) {
      if (PF.mode === 'local' && PF.uid === null && onAuth.seen) return;
      onAuth.seen = 1;
      PF.mode = 'local'; PF.uid = null; PF.provisional = false; PF.outbox.clear(); PF.err = null;
      loadLocal(); emit('auth');
      return;
    }
    if (PF.mode === 'cloud' && PF.uid === id && !PF.provisional) return;
    onAuth.seen = 1;
    if (!(PF.provisional && PF.uid === id)) primeCloud(id);
    PF.provisional = false;
    /* marks made while signed out join the account */
    const loc = (LS.get('local', null) || {}).flags;
    let moved = 0;
    for (const f of Object.values(loc || {})) if (valid(f)) { const c = clean(f); const k = fk(c.target_id, c.file); PF.flags.set(k, c); PF.outbox.set(k, { op: 'up' }); moved++; }
    persist();
    if (loc) LS.del('local');
    if (moved) VM.toast(`${num(moved)} photo ${moved === 1 ? 'mark' : 'marks'} from this browser added to your account.`);
    emit('auth');
    refreshCloud();
  }

  /* ---------- hide flagged photos everywhere they render ---------- */
  const origPhotos = VM.data && VM.data.photos;
  if (GH && typeof origPhotos === 'function') {
    VM.data.photos = async id => {
      const list = arr(await origPhotos(id));
      const t = sideKey(id);
      return list.filter(p => !(p && p.file && BAD.has((PF.flags.get(fk(t, p.file)) || {}).verdict)));
    };
  }

  /* ---------- public object ---------- */
  VM.photoFlags = {
    get available() { return PF.mode !== 'off'; },
    mode: () => PF.mode,
    keyOf: sideKey,
    verdict: verdictOf,
    isHidden,
    set: setVerdict,
    list: () => [...PF.flags.values()].map(f => ({ ...f })),
    onChange(fn) { PF.subs.add(fn); return () => PF.subs.delete(fn); }
  };

  /* ---------- inline control on profile photos ---------- */
  const RECENT = { t: null, file: null, at: 0 };
  function waitFor(root, sel, ms) {
    return new Promise(res => {
      const hit = root.querySelector(sel);
      if (hit) return res(hit);
      const mo = new MutationObserver(() => { const h = root.querySelector(sel); if (h) { mo.disconnect(); clearTimeout(t); res(h); } });
      mo.observe(root, { childList: true, subtree: true });
      const t = setTimeout(() => { mo.disconnect(); res(null); }, ms);
    });
  }
  async function decorate(el, e) {
    const slot = el.parentElement;
    const sec = slot && slot.querySelector('.vm-sec[data-sec="photos"]');
    if (!sec) return;
    const cap0 = await waitFor(sec, '.ph .ph-cap', 10000);
    if (!cap0 || !sec.isConnected) return;
    const list = arr(await VM.data.photos(e.id)).filter(p => p && p.thumb && WIKI.test(p.thumb) && p.page).slice(0, 4);
    if (!list.length) return;
    const cur = () => { const on = sec.querySelector('.ph-th.on'); return list[on ? +on.dataset.ph || 0 : 0]; };
    const add = () => {
      const cap = sec.querySelector('.ph-cap');
      if (!cap || cap.querySelector('.pr-flag')) return;
      const p = cur();
      cap.insertAdjacentHTML('beforeend', `<span class="pr-flagw"><button type="button" class="pr-flag" aria-label="Wrong photo? Hide this photo of ${esc(e.name)} and report it${p && p.caption ? ': ' + esc(p.caption) : ''}">Wrong photo?</button></span>`);
    };
    add();
    new MutationObserver(add).observe(cap0, { childList: true });
    sec.addEventListener('click', ev => {
      if (!ev.target.closest('.pr-flag')) return;
      const p = cur();
      if (!p) return;
      setVerdict(e.id, p.file, 'wrong');
      RECENT.t = sideKey(e.id); RECENT.file = p.file; RECENT.at = Date.now();
      VM.panel.refresh();
    });
  }
  function noticeHTML() {
    const v = verdictOf(RECENT.t, RECENT.file);
    const alt = ['wrong', 'irrelevant', 'poor'].filter(x => x !== v);
    const word = { wrong: 'wrong place', irrelevant: 'not relevant', poor: 'poor quality' };
    return `<p class="pr-note" role="status"><span>Photo hidden for you and marked <b>${esc(word[v] || 'wrong')}</b>.</span>
      <span class="pr-note-alt">Rather ${alt.map(x => `<button type="button" class="linkish" data-pv="${x}">${word[x]}</button>`).join(' or ')}?</span>
      <button type="button" class="linkish" data-pv="undo">Undo</button>${PF.mode === 'local' && VM.auth && VM.auth.available ? '<span class="pr-note-loc">Saved in this browser; sign in from the Cellar journal to send it.</span>' : ''}</p>`;
  }
  function photoSection(el, e) {
    if (PF.mode === 'off') return false;
    const t = sideKey(e.id);
    if (RECENT.t && RECENT.t !== t) RECENT.t = null;
    decorate(el, e).catch(err => console.warn('[photos]', err));
    if (RECENT.t === t && Date.now() - RECENT.at < 120000 && verdictOf(t, RECENT.file)) {
      el.classList.add('pr-sec');
      el.innerHTML = noticeHTML();
      el.addEventListener('click', ev => {
        const b = ev.target.closest('[data-pv]');
        if (!b) return;
        if (b.dataset.pv === 'undo') { setVerdict(t, RECENT.file, null); RECENT.t = null; VM.panel.refresh(); return; }
        setVerdict(t, RECENT.file, b.dataset.pv);
        el.innerHTML = noticeHTML();
      });
      return true;
    }
    return false;
  }

  /* ---------- About: a quiet way in ---------- */
  function hookAbout() {
    const body = document.getElementById('sheet-body');
    if (!body) return;
    const run = () => {
      if (location.hash !== '#about' || body.dataset.view || body.querySelector('.pr-about') || !body.querySelector('.head')) return;
      body.insertAdjacentHTML('beforeend', `<section class="pr-about">${VM.h.sec('Help check photos')}<p class="note">The photos come from Wikimedia Commons, chosen place by place, and some will be wrong. If you know the places, you can look through them and mark the ones that are not what they claim to be.</p><p><a class="btn small" href="#photo-review">Review the photos</a></p></section>`);
    };
    new MutationObserver(run).observe(body, { childList: true });
  }

  /* ---------- the review queue ---------- */
  const TYPE_NAME = { country: 'Country', region: 'Region', app: 'Appellation', site: 'Site', grape: 'Grape', soil: 'Soil', event: 'Timeline event', other: 'Other' };
  const GROUPS = [['all', 'Everything'], ['country', 'Countries'], ['region', 'Regions'], ['appp', 'Appellations with profiles'], ['site', 'Sites'], ['app', 'Other appellations'], ['grape', 'Grapes'], ['soil', 'Soils'], ['event', 'Timeline events'], ['other', 'Other']];
  const TIER_GROUP = ['country', 'region', 'appp', 'site', 'app', 'grape', 'soil', 'event', 'other'];
  const CW = { major: 0, notable: 1, emerging: 2, minor: 3 };
  let FULL = null, BUILD = null;
  async function pool(items, n, fn) {
    let i = 0;
    await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } }));
  }
  function buildQueue(onProgress) {
    if (FULL) return Promise.resolve(FULL);
    if (BUILD) return BUILD;
    BUILD = (async () => {
      const tmo = (p, ms) => Promise.race([Promise.resolve(p).catch(() => null), VM.util.sleep(ms)]);
      await tmo(Promise.all([VM.data.loadIndex(), VM.data.loadGlobals()]), 20000);
      const [, timeline, soils] = await Promise.all([
        tmo(VM.data.loadSites ? VM.data.loadSites() : null, 25000).then(() => tmo(VM.data.loadRegions ? VM.data.loadRegions() : null, 25000)),
        tmo(VM.data.timeline(), 15000), tmo(VM.data.soils(), 15000)
      ]);
      const evIds = new Map(arr(timeline).map(x => [String(x.id).replace(/^event-/, ''), x]));
      const soilIds = new Map(arr(soils).map(x => [String(x.id), x]));
      const man = (window.__VM_MANIFEST && window.__VM_MANIFEST.files) || [];
      let files = man.filter(f => /^data\/photos\/[^/]+\.json$/.test(f));
      if (!files.length) files = [...Object.keys(VM.data.countries || {}).map(i => `data/photos/${i}.json`), 'data/photos/_global.json'];
      const out = [];
      let done = 0;
      await pool(files, 4, async f => {
        const j = await VM.data.json(f);
        done++; if (onProgress) onProgress(done, files.length);
        if (!j || typeof j !== 'object') return;
        const iso = (f.match(/photos\/([a-z]{2})\.json$/) || [])[1] || null;
        for (const [key, list] of Object.entries(j)) {
          if (key.startsWith('_') || !Array.isArray(list)) continue;
          let type, tier, name, ent, country = iso;
          if (iso) {
            if (key === iso) { type = 'country'; tier = 0; name = VM.data.countryName(iso); ent = iso; }
            else if (key.startsWith('region-')) { type = 'region'; tier = 1; name = ((VM.data.regionById && VM.data.regionById.get(key)) || {}).name || key; ent = key; }
            else if (key.startsWith('site-')) { type = 'site'; tier = 3; name = ((VM.data.siteById && VM.data.siteById.get(key)) || {}).name || key; ent = key; }
            else {
              const a = VM.data.indexById.get(key) || (VM.data.extra || []).find(x => x.id === key) || null;
              type = 'app'; tier = a && a.prof ? 2 : 4; name = a ? a.name : key; ent = key;
            }
          } else {
            const g = VM.data.grapeById(key);
            if (g) { type = 'grape'; tier = 5; name = g.name; ent = 'grape-' + key; country = g.origin && g.origin.country ? g.origin.country : null; }
            else if (evIds.has(key)) { type = 'event'; tier = 7; name = evIds.get(key).title || key; ent = 'event-' + key; }
            else if (soilIds.has(key)) { type = 'soil'; tier = 6; name = soilIds.get(key).name || key; ent = 'soil-' + key; }
            else { type = 'other'; tier = 8; name = key; ent = null; }
          }
          list.forEach((p, i) => {
            if (!p || !p.file) return;
            const thumb = WIKI.test(p.thumb_small || '') ? p.thumb_small : WIKI.test(p.thumb || '') ? p.thumb : null;
            out.push({ k: fk(key, p.file), target: key, file: p.file, type, tier, rank: i + 1, name, ent, country,
              cw: country && VM.data.countries[country] ? (CW[VM.data.countries[country].tier] ?? 4) : 5,
              cname: country ? VM.data.countryName(country) : '', thumb, page: p.page, caption: p.caption || '',
              title: String(p.file).replace(/^File:/, '').replace(/\.(jpe?g|png|tiff?|webp|gif|svg)$/i, '') });
          });
        }
      });
      out.sort((a, b) => a.tier - b.tier || (a.rank > 1) - (b.rank > 1) || a.cw - b.cw || a.cname.localeCompare(b.cname) || a.name.localeCompare(b.name) || a.rank - b.rank);
      FULL = out;
      return out;
    })();
    BUILD.catch(() => { BUILD = null; });
    return BUILD;
  }

  /* ---------- image loading: at most two requests to Wikimedia at a time ---------- */
  const IMQ = { q: [], active: 0, fails: 0, paused: false, gen: 0 };
  function loadImg(img) { IMQ.q.push({ img, gen: IMQ.gen }); pump(); }
  function pump() {
    while (!IMQ.paused && IMQ.active < 2 && IMQ.q.length) {
      const job = IMQ.q.shift();
      const img = job.img;
      if (job.gen !== IMQ.gen || !img.isConnected || !img.dataset.src) continue;
      IMQ.active++;
      const tile = img.closest('.pr-tile');
      if (tile) tile.dataset.img = 'loading';
      const end = ok => {
        IMQ.active--;
        img.onload = img.onerror = null;
        if (tile) tile.dataset.img = ok ? 'ok' : 'failed';
        if (ok) { IMQ.fails = 0; pump(); return; }
        IMQ.fails++;
        if (IMQ.fails >= 6) { IMQ.paused = true; showPaused(); return; }
        setTimeout(pump, 1200);
      };
      img.onload = () => end(true);
      img.onerror = () => end(false);
      img.src = img.dataset.src;
    }
  }
  function showPaused() { const b = R.el && R.el.querySelector('[data-paused]'); if (b) b.hidden = false; }
  function retryImages() {
    if (!R.el) return;
    IMQ.paused = false; IMQ.fails = 0; IMQ.gen++; IMQ.q = [];
    const b = R.el.querySelector('[data-paused]'); if (b) b.hidden = true;
    for (const img of R.el.querySelectorAll('.pr-tile:not([data-img="ok"]) img[data-src]')) { img.removeAttribute('src'); loadImg(img); }
  }

  /* ---------- the review view ---------- */
  const R = { el: null, page: [], start: 0, unrev: !!VM.store.get('pr-unrev', false), group: VM.store.get('pr-group', 'all'), size: 16, keys: null };
  const pred = it => (R.group === 'all' || TIER_GROUP[it.tier] === R.group) && (!R.unrev || !PF.flags.has(it.k) || R.keep.has(it.k));
  R.keep = new Set();
  function pageSize() {
    const phone = VM.isPhone();
    const cw = ((R.el && R.el.clientWidth) || 400) - (phone ? 32 : 48);
    const cols = Math.max(2, Math.floor((cw + 10) / ((phone ? 140 : 160) + 10)));
    return Math.max(12, Math.min(20, cols * Math.ceil(16 / cols)));
  }
  function collect(from) {
    const page = [];
    for (let i = Math.max(0, from); i < FULL.length && page.length < R.size; i++) if (pred(FULL[i])) page.push(i);
    return page;
  }
  function stats() {
    let checked = 0, flagged = 0;
    for (const it of FULL) { const v = (PF.flags.get(it.k) || {}).verdict; if (v) { checked++; if (BAD.has(v)) flagged++; } }
    return { checked, flagged, total: FULL.length };
  }
  function acctHTML() {
    const u = VM.auth && VM.auth.user;
    if (PF.mode === 'cloud') {
      const st = PF.syncing ? 'Syncing…' : PF.outbox.size ? `${num(PF.outbox.size)} ${PF.outbox.size === 1 ? 'mark' : 'marks'} waiting for a connection` : PF.err ? 'Could not reach your account; marks are kept on this device' : 'Your marks go to the photo editors as you make them.';
      return `<p class="note pr-acct">Signed in as <b>${esc((u && u.email) || 'you')}</b>. ${esc(st)}</p>`;
    }
    return `<p class="note pr-acct">Your marks are saved in this browser${VM.auth && VM.auth.available ? '. To send them to the photo editors, <a href="#journal">sign in from the Cellar journal</a>; they move into your account' : ''}.</p>`;
  }
  function tileHTML(it) {
    const v = (PF.flags.get(it.k) || {}).verdict || '';
    const note = (PF.flags.get(it.k) || {}).note || '';
    return `<li class="pr-tile" data-k="${esc(it.k)}" data-v="${v}" data-n="${esc(note)}" data-img="${it.thumb ? 'wait' : 'none'}">
      <button type="button" class="pr-hit" aria-label="${esc(`${it.name}, ${TYPE_NAME[it.type]}${it.cname ? ', ' + it.cname : ''}. Photo: ${it.title}. ${v ? 'Marked ' + V_NAME[v] : 'Not checked'}. Activate to change.`)}">
        <span class="pr-img"><span class="pr-ph" aria-hidden="true"><span class="pr-ph-t">${esc(it.title)}</span><span class="pr-ph-s"></span></span>${it.thumb ? `<img data-src="${esc(it.thumb)}" alt="${esc(it.caption || it.title)}" decoding="async" crossorigin="anonymous" referrerpolicy="no-referrer">` : ''}
          ${it.rank === 1 ? '<span class="pr-hero" title="The first photo on the profile">Shown first</span>' : ''}<span class="pr-tag">${v ? esc(V_NAME[v]) : ''}</span></span>
        <span class="pr-name">${esc(it.name)}</span>
        <span class="pr-meta">${esc([TYPE_NAME[it.type], it.cname].filter(Boolean).join(' · '))}</span>
      </button>
      <div class="pr-foot">${it.ent ? `<a class="pr-id" href="#${esc(it.ent)}" title="Open the profile">${esc(it.target)}</a>` : `<span class="pr-id">${esc(it.target)}</span>`}
        <a class="pr-commons" href="${esc(it.page)}" target="_blank" rel="noopener noreferrer" title="Open on Wikimedia Commons">${esc(it.title)}</a>
        <span class="pr-notew">${BAD.has(v) ? (note ? `<button type="button" class="pr-notebtn has" data-note="1">Note: ${esc(note)}</button>` : '<button type="button" class="pr-notebtn" data-note="1">Add a note</button>') : ''}</span></div>
    </li>`;
  }
  function progressHTML() {
    const s = stats();
    const w = x => (s.total ? (x / s.total * 100).toFixed(2) : 0) + '%';
    return `<div class="pr-prog" role="group" aria-label="Progress"><p class="pr-prog-t"><span class="vm-num">${num(s.checked)}</span> of <span class="vm-num">${num(s.total)}</span> photos checked · <span class="vm-num">${num(s.flagged)}</span> marked wrong, not relevant or poor</p>
      <span class="pr-prog-b" aria-hidden="true"><i class="ok" style="width:${w(s.checked - s.flagged)}"></i><i class="bad" style="width:${w(s.flagged)}"></i></span></div>`;
  }
  function pagerHTML(bottom) {
    const total = FULL.reduce((n, it) => n + (pred(it) ? 1 : 0), 0);
    const before = FULL.slice(0, R.start).reduce((n, it) => n + (pred(it) ? 1 : 0), 0);
    const pages = Math.max(1, Math.ceil(total / R.size));
    const pno = Math.min(pages, Math.floor(before / R.size) + 1);
    const hasNext = R.page.length && collect(R.page[R.page.length - 1] + 1).length > 0;
    return `<div class="pr-pager${bottom ? ' bottom' : ''}">
      <button type="button" class="btn small ghost" data-nav="prev" ${before ? '' : 'disabled'} aria-label="Previous page">‹ Previous</button>
      <span class="pr-pno vm-num">Page ${num(pno)} of ${num(pages)}</span>
      <button type="button" class="btn small ghost" data-nav="next" ${hasNext ? '' : 'disabled'} aria-label="Next page">Next ›</button>
      ${bottom ? `<button type="button" class="btn small solid pr-rest" data-nav="rest" ${R.page.length ? '' : 'disabled'}>Mark the rest good, next page</button>` : ''}</div>`;
  }
  function viewHTML() {
    const counts = {};
    for (const it of FULL) { const g = TIER_GROUP[it.tier]; counts[g] = (counts[g] || 0) + 1; }
    const opts = GROUPS.filter(([g]) => g === 'all' || counts[g]).map(([g, l]) => `<option value="${g}" ${R.group === g ? 'selected' : ''}>${esc(l)}${g === 'all' ? '' : ` (${num(counts[g])})`}</option>`).join('');
    const hover = matchMedia('(hover: hover) and (pointer: fine)').matches;
    return `<div class="head"><p class="eyebrow">Help check photos</p><h2 class="title">Photo review</h2></div>
      <p class="pr-lead">Each tile is a photo shown on a profile, most visible first: countries, regions and the appellations with written profiles, then sites, grapes, soils and events. Tap a tile to cycle through <b>Good</b>, <b>Wrong place</b>, <b>Not relevant</b> and <b>Poor quality</b>. Anything not good is hidden for you at once.</p>
      ${acctHTML()}
      <div data-prog>${progressHTML()}</div>
      <div class="pr-ctl"><label class="vm-field pr-group"><span>Show</span><select class="vm-select" data-group>${opts}</select></label>
        <label class="tog pr-unrev" for="pr-unrev"><span>Only unreviewed</span><input type="checkbox" id="pr-unrev" ${R.unrev ? 'checked' : ''}></label></div>
      <p class="pr-paused" data-paused hidden role="alert">Wikimedia is refusing images from this connection right now. <button type="button" class="linkish" data-act="retry">Try again</button></p>
      <div data-pager-top>${pagerHTML(false)}</div>
      ${R.page.length ? `<ul class="pr-grid" aria-label="Photos on this page">${R.page.map(i => tileHTML(FULL[i])).join('')}</ul>` : `<p class="vm-empty">${R.unrev ? 'Nothing left to review here. Every photo in this group has a mark.' : 'No photos in this group.'}</p>`}
      <div data-pager-bottom>${pagerHTML(true)}</div>
      ${hover ? `<p class="src pr-keys">Keys: <kbd>G</kbd> good, <kbd>W</kbd> wrong place, <kbd>I</kbd> not relevant, <kbd>P</kbd> poor, <kbd>0</kbd> clear (the focused tile, then the next); arrows move; <kbd>Space</kbd> cycles; <kbd>M</kbd> note; <kbd>N</kbd> or <kbd>]</kbd> next page, <kbd>B</kbd> or <kbd>[</kbd> previous; <kbd>Shift</kbd>+<kbd>G</kbd> marks the rest good and turns the page.</p>` : ''}
      <p class="src">Marks go to the table <span class="mono">photo_flags</span> (private to you; the editors read them to replace photos). <button type="button" class="linkish" data-act="export">Download your marks</button></p>`;
  }
  function render(focusFirst) {
    const el = R.el;
    if (!el || !FULL) return;
    R.size = pageSize();
    R.keep = new Set();
    R.page = collect(R.start);
    if (!R.page.length && R.start > 0) { R.start = 0; R.page = collect(0); }
    if (R.page.length) VM.store.set('pr-cursor', FULL[R.page[0]].k);
    IMQ.gen++; IMQ.q = []; IMQ.fails = 0; IMQ.paused = false;
    el.innerHTML = viewHTML();
    for (const img of el.querySelectorAll('img[data-src]')) loadImg(img);
    if (focusFirst) {
      const t = el.querySelector('.pr-hit');
      if (t) t.focus({ preventScroll: true });
      const top = el.querySelector('[data-pager-top]');
      if (top) el.scrollTop += top.getBoundingClientRect().top - el.getBoundingClientRect().top - 8;
    }
  }
  function updateTile(k) {
    const li = R.el && R.el.querySelector(`.pr-tile[data-k="${CSS.escape(k)}"]`);
    if (li) {
      const it = FULL.find(x => x.k === k);
      const had = document.activeElement && li.contains(document.activeElement) ? document.activeElement.className : null;
      const st = li.dataset.img, src = li.querySelector('img') && li.querySelector('img').getAttribute('src');
      const tmp = document.createElement('ul'); tmp.innerHTML = tileHTML(it);
      const nl = tmp.firstElementChild;
      nl.dataset.img = st;
      const ni = nl.querySelector('img');
      if (ni && src) { ni.src = src; }
      li.replaceWith(nl);
      if (had) { const f = nl.querySelector('.' + had.split(' ')[0]); if (f) f.focus({ preventScroll: true }); }
    }
    const p = R.el && R.el.querySelector('[data-prog]'); if (p) p.innerHTML = progressHTML();
  }
  function mark(k, v) {
    const it = FULL.find(x => x.k === k);
    if (!it) return;
    R.keep.add(k);
    setVerdict(it.target, it.file, v);
  }
  function cycle(k) { const cur = (PF.flags.get(k) || {}).verdict || null; mark(k, CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length]); }
  function go(dir) {
    if (!R.page.length) return;
    if (dir > 0) { const nx = collect(R.page[R.page.length - 1] + 1); if (!nx.length) return; R.start = nx[0]; }
    else {
      let n = 0, i = R.page[0] - 1;
      for (; i >= 0; i--) if (pred(FULL[i]) && ++n >= R.size) break;
      R.start = Math.max(0, i);
    }
    render(true);
  }
  function restGood() {
    for (const i of R.page) { const it = FULL[i]; if (!PF.flags.has(it.k)) mark(it.k, 'good'); }
    const nx = collect(R.page[R.page.length - 1] + 1);
    if (nx.length) { R.start = nx[0]; render(true); } else render(true);
  }
  function editNote(li) {
    const k = li.dataset.k, it = FULL.find(x => x.k === k), f = PF.flags.get(k);
    if (!f || !BAD.has(f.verdict)) return;
    const w = li.querySelector('.pr-notew');
    w.innerHTML = `<input class="pr-noteinp" type="text" maxlength="300" aria-label="Note on this photo" placeholder="What is it really? e.g. this is Pomerol" value="${esc(f.note || '')}">`;
    const inp = w.querySelector('input');
    inp.focus();
    const save = () => { if (!inp.isConnected) return; const f2 = PF.flags.get(k); if (f2) setVerdict(it.target, it.file, f2.verdict, inp.value.trim() || null); else updateTile(k); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); inp.blur(); } if (e.key === 'Escape') { e.preventDefault(); inp.value = f.note || ''; inp.blur(); } e.stopPropagation(); });
    inp.addEventListener('blur', save, { once: true });
  }
  function exportMarks() {
    const data = { app: 'Vitis Mundi photo marks', exported_at: nowIso(), marks: VM.photoFlags.list() };
    try {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' }));
      a.download = `vitis-mundi-photo-marks-${nowIso().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    } catch (e) { VM.toast('This browser blocked the download.'); }
  }
  function tiles() { return R.el ? [...R.el.querySelectorAll('.pr-tile')] : []; }
  function moveFocus(li, dir) {
    const all = tiles(); const i = all.indexOf(li);
    if (i < 0) return;
    let j = i;
    if (dir === 'left') j = i - 1; else if (dir === 'right') j = i + 1;
    else {
      const top = all[0].offsetTop; let cols = all.findIndex(t => t.offsetTop !== top); if (cols < 1) cols = all.length;
      j = i + (dir === 'down' ? cols : -cols);
    }
    if (j >= 0 && j < all.length) all[j].querySelector('.pr-hit').focus();
  }
  const KEYMAP = { g: 'good', 1: 'good', w: 'wrong', 2: 'wrong', i: 'irrelevant', r: 'irrelevant', 3: 'irrelevant', p: 'poor', 4: 'poor', 0: null, x: null, backspace: null, delete: null };
  function onKey(e) {
    if (!R.el || !R.el.isConnected || R.el.dataset.view !== 'photo-review') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) return;
    const ae = document.activeElement;
    if (!(ae === document.body || ae === R.el || (ae && R.el.contains(ae)))) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    const li = (document.activeElement && document.activeElement.closest && document.activeElement.closest('.pr-tile')) || null;
    if (e.shiftKey && key === 'g') { e.preventDefault(); restGood(); return; }
    if (key === 'n' || key === ']' || key === 'pagedown') { e.preventDefault(); go(1); return; }
    if (key === 'b' || key === '[' || key === 'pageup') { e.preventDefault(); go(-1); return; }
    if (/^arrow/.test(key)) {
      const target = li || tiles()[0];
      if (!target) return;
      e.preventDefault();
      if (!li) { target.querySelector('.pr-hit').focus(); return; }
      moveFocus(li, key.slice(5));
      return;
    }
    if (key === 'm' && li) { e.preventDefault(); editNote(li); return; }
    if (key in KEYMAP) {
      const target = li || tiles()[0];
      if (!target) return;
      e.preventDefault();
      const k = target.dataset.k;
      mark(k, KEYMAP[key]);
      const all = tiles(); const nx = all[all.findIndex(x => x.dataset.k === k) + 1];
      if (nx) nx.querySelector('.pr-hit').focus(); else { const b = R.el.querySelector('[data-nav="rest"], [data-nav="next"]:not([disabled])'); if (b) b.focus(); }
    }
  }
  function bindReview(el) {
    if (el._prBound) return;
    el._prBound = 1;
    el.addEventListener('click', e => {
      if (R.el !== el || el.dataset.view !== 'photo-review') return;
      const hit = e.target.closest('.pr-hit');
      if (hit) { cycle(hit.closest('.pr-tile').dataset.k); return; }
      const nb = e.target.closest('[data-note]');
      if (nb) { editNote(nb.closest('.pr-tile')); return; }
      const nav = e.target.closest('[data-nav]');
      if (nav) { if (nav.dataset.nav === 'rest') restGood(); else go(nav.dataset.nav === 'next' ? 1 : -1); return; }
      const a = e.target.closest('[data-act]');
      if (a && a.dataset.act === 'retry') retryImages();
      if (a && a.dataset.act === 'export') exportMarks();
    });
    el.addEventListener('change', e => {
      if (R.el !== el || el.dataset.view !== 'photo-review') return;
      if (e.target.id === 'pr-unrev') { R.unrev = e.target.checked; VM.store.set('pr-unrev', R.unrev); R.start = R.page.length ? R.page[0] : 0; render(); }
      if (e.target.matches('[data-group]')) { R.group = e.target.value; VM.store.set('pr-group', R.group); R.start = 0; render(); }
    });
  }
  async function renderReview(el) {
    R.el = el;
    if (PF.mode === 'off') {
      el.innerHTML = `<div class="head"><p class="eyebrow">Help check photos</p><h2 class="title">Photo review</h2></div><p class="note">Photos, and the review of them, are on the full Vitis Mundi site.</p><div class="btn-row"><a class="btn solid" href="${esc((VM.config && VM.config.siteUrl) || 'https://vitismundi.app/')}#photo-review" target="_blank" rel="noopener noreferrer">Open the full site</a></div>`;
      return;
    }
    if (!FULL) {
      el.innerHTML = `<div class="head"><p class="eyebrow">Help check photos</p><h2 class="title">Photo review</h2></div><p class="note pr-loading" role="status">Reading the photo lists…</p>`;
      try {
        await buildQueue((n, t) => { const p = el.querySelector('.pr-loading'); if (p && R.el === el) p.textContent = `Reading the photo lists, ${n} of ${t}…`; });
      } catch (e) { console.warn('[photos]', e); el.innerHTML = '<p class="vm-empty">The photo lists could not be read.</p>'; return; }
      if (R.el !== el || el.dataset.view !== 'photo-review') return;
    }
    const cur = VM.store.get('pr-cursor', null);
    const at = cur ? FULL.findIndex(x => x.k === cur) : -1;
    R.start = at > 0 ? at : 0;
    bindReview(el);
    render(false);
  }

  /* ---------- keep the screen in step ---------- */
  PF.subs.add(({ what }) => {
    if (!R.el || !R.el.isConnected || R.el.dataset.view !== 'photo-review' || !FULL) return;
    if (what === 'flags') {
      const ae = document.activeElement;
      const li = ae && ae.closest && ae.closest('.pr-tile');
      /* re-render only the tiles whose mark or note changed, never one whose note is being typed */
      for (const t of tiles()) {
        if (li === t && ae.classList.contains('pr-noteinp')) continue;
        const f = PF.flags.get(t.dataset.k) || {};
        if (t.dataset.v !== (f.verdict || '') || t.dataset.n !== (f.note || '')) updateTile(t.dataset.k);
      }
      const p = R.el.querySelector('[data-prog]'); if (p) p.innerHTML = progressHTML();
    } else {
      const a = R.el.querySelector('.pr-acct'); if (a) a.outerHTML = acctHTML();
      if (what === 'auth' || what === 'sync') { for (const t of tiles()) { const v = (PF.flags.get(t.dataset.k) || {}).verdict || ''; if (t.dataset.v !== v) updateTile(t.dataset.k); } const p = R.el.querySelector('[data-prog]'); if (p) p.innerHTML = progressHTML(); }
    }
  });

  /* ---------- start ---------- */
  VM.panel.register('photo-review', { title: 'Photo review', crumb: 'Photo review', snap: 'full', render: renderReview, onClose() { R.el = null; IMQ.gen++; IMQ.q = []; } });
  if (GH) {
    const su = VM.auth && typeof VM.auth.storedUser === 'function' ? VM.auth.storedUser() : null;
    if (su) { primeCloud(su.id); PF.provisional = true; } else loadLocal();
    /* #photo-review needs no map: open it at once rather than when the globe has loaded */
    const early = () => setTimeout(() => { const sh = document.getElementById('sheet'); if (location.hash === '#photo-review' && sh && sh.hidden) VM.go('photo-review'); }, 0);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', early, { once: true }); else early();
    VM.panel.addSection(['appellation', 'site', 'region', 'country', 'grape', 'event'], photoSection, { id: 'photo-flag', slot: 'hero', order: 11 });
    document.addEventListener('keydown', onKey);
    if (VM.auth && typeof VM.auth.onChange === 'function') VM.auth.onChange(onAuth); else VM.on('auth', onAuth);
    addEventListener('online', () => { if (PF.mode === 'cloud') { flush(); refreshCloud(); } });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && PF.outbox.size) flushSoon.now(); });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hookAbout, { once: true }); else hookAbout();
  }
})();
