/* modules/50_guides.js: Paths. Guided tours that play out on the map.

   Data: data/guides/_index.json {guides: [{id, kind, title, subtitle, tagline, minutes, deeper_minutes, cover, countries,
         chapters: [{id, title, part}]}], refs: {"<atlas id>": [[guide id, chapter id, chapter index]]}}
         data/guides/<id>.json   the guide (GUIDES_BRIEF.md): chapters of steps; each step has text and a map move
         {fly, highlight, label, pitch, bearing, terrain, base}; chapters end with taste, deeper and check.

   Views: #paths (the list), #guide-<id> (overview), #guide-<id>--<chapter id> (the reader). While the reader is open,
   the step nearest the top of the sheet drives the map (debounced, so a fast scroll does not fly the camera around);
   every step also has a "Show" button. Base map and 3D are put back as they were when the panel closes or another
   view opens. Progress (chapters read, quiz scores, bottles tasted) lives in this browser and, when signed in, in
   public.guide_progress (one row per guide, owner-only RLS), merged on sign-in.
   Also: a one-time "New to wine?" card on a first visit, and the profile section "In the guides". */
(() => {
  'use strict';
  if (!window.VM) return;
  const { esc, inl, arr, clamp } = VM.util;
  const GHm = () => VM.mode === 'gh';
  const P_INDEX = 'data/guides/_index.json';
  const KIND = { start: 'Start here', region: 'Regions', grape: 'Grape paths', history: 'History' };
  const KIND_ORDER = ['start', 'region', 'grape', 'history'];
  const ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 13.5c2-1 2.5-3.5 5-3.5s3-2.5 5.5-3.5"/><circle cx="2.8" cy="13.3" r="1.1"/><circle cx="13.2" cy="6.3" r="1.1"/><path d="M11 2.5l2.2 1.8"/></svg>';
  const CHECK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  const PIN = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 14.5s4.5-4.3 4.5-7.8a4.5 4.5 0 0 0-9 0c0 3.5 4.5 7.8 4.5 7.8z"/><circle cx="8" cy="6.7" r="1.6"/></svg>';

  /* ---------- data ---------- */
  let IDX = null, IDXP = null;
  const GUIDE = new Map();
  const loadIndex = () => IDXP || (IDXP = Promise.resolve(VM.data.has(P_INDEX) ? VM.data.json(P_INDEX) : null).then(j => (IDX = j && Array.isArray(j.guides) ? j : { guides: [], refs: {} })));
  const loadGuide = id => {
    if (GUIDE.has(id)) return GUIDE.get(id);
    const p = 'data/guides/' + id + '.json';
    const pr = Promise.resolve(VM.data.has(p) ? VM.data.json(p) : null).catch(() => null);
    GUIDE.set(id, pr);
    return pr;
  };
  const metaOf = id => (IDX ? IDX.guides.find(g => g.id === id) : null);

  /* ---------- progress ---------- */
  /* {guideId: {ch: {chapterId: {done: ms, q: [answered option per question], t: [tasted taste indexes]}}, last, at}} */
  const PKEY = 'guides:progress';
  let PROG = (() => { const v = VM.store.get(PKEY, {}); return v && typeof v === 'object' ? v : {}; })();
  const dirty = new Set();
  let syncT = 0;
  const gp = id => (PROG[id] || (PROG[id] = { ch: {}, last: null, at: 0 }));
  const cp = (id, ch) => { const g = gp(id); return g.ch[ch] || (g.ch[ch] = { done: 0, q: [], t: [] }); };
  function saveProg(id) {
    gp(id).at = Date.now();
    VM.store.set(PKEY, PROG);
    dirty.add(id);
    clearTimeout(syncT);
    syncT = setTimeout(pushCloud, 1500);
    VM.emit('guides:progress', { id });
  }
  const doneCount = (id, meta) => {
    const g = PROG[id];
    if (!g || !meta) return 0;
    return meta.chapters.filter(c => g.ch[c.id] && g.ch[c.id].done).length;
  };
  /* merge two progress records for one guide: union of everything done, the later "last" */
  function mergeG(a, b) {
    if (!a) return b; if (!b) return a;
    const out = { ch: {}, last: (b.at || 0) > (a.at || 0) ? b.last : a.last, at: Math.max(a.at || 0, b.at || 0) };
    for (const k of new Set([...Object.keys(a.ch || {}), ...Object.keys(b.ch || {})])) {
      const x = (a.ch || {})[k] || {}, y = (b.ch || {})[k] || {};
      const q = []; const n = Math.max(arr(x.q).length, arr(y.q).length);
      for (let i = 0; i < n; i++) q[i] = arr(x.q)[i] ?? arr(y.q)[i] ?? null;
      out.ch[k] = { done: Math.max(x.done || 0, y.done || 0), q, t: [...new Set([...arr(x.t), ...arr(y.t)])] };
    }
    return out;
  }
  const cloudOK = () => GHm() && VM.auth && VM.auth.user && VM.auth.getClient;
  async function pushCloud() {
    if (!cloudOK() || !dirty.size) return;
    const ids = [...dirty]; dirty.clear();
    try {
      const c = await VM.auth.getClient();
      const rows = ids.filter(id => PROG[id]).map(id => ({ guide_id: id, data: PROG[id], updated_at: new Date().toISOString() }));
      if (!rows.length) return;
      const { error } = await c.from('guide_progress').upsert(rows, { onConflict: 'user_id,guide_id' });
      if (error) { ids.forEach(i => dirty.add(i)); console.warn('[guides] sync', error.message); }
    } catch (e) { ids.forEach(i => dirty.add(i)); }
  }
  async function pullCloud() {
    if (!cloudOK()) return;
    try {
      const c = await VM.auth.getClient();
      const { data, error } = await c.from('guide_progress').select('guide_id,data');
      if (error) return;
      for (const r of arr(data)) {
        const merged = mergeG(PROG[r.guide_id], r.data);
        if (JSON.stringify(merged) !== JSON.stringify(r.data)) dirty.add(r.guide_id);
        PROG[r.guide_id] = merged;
      }
      for (const id of Object.keys(PROG)) if (!arr(data).some(r => r.guide_id === id)) dirty.add(id);
      VM.store.set(PKEY, PROG);
      pushCloud();
      VM.emit('guides:progress', { id: null });
      if (VM.panel.current && VM.panel.current.type === 'view' && /^(paths|guide)$/.test(VM.panel.current.id)) VM.panel.refresh();
    } catch (e) { /* offline */ }
  }
  VM.on('auth', u => { if (u) pullCloud(); });
  addEventListener('online', () => pushCloud());

  /* ---------- text ---------- */
  const LINK = /\[([^\]]+)\]\(([a-z0-9][a-z0-9-]*)\)/g;
  function rich(text) {
    return String(text || '').split(/\n\s*\n/).filter(s => s.trim()).map(par =>
      `<p>${inl(par.trim()).replace(LINK, (m, lab, id) => VM.data.typeOf(id) ? `<a href="#${esc(id)}" class="gd-link">${lab}</a>` : lab)}</p>`).join('');
  }
  const minutes = n => n ? `${n} min` : '';
  const nameOf = id => { const e = VM.data.entity(id); if (e && e.name && e.name !== id) return e.name; return String(id).replace(/^(grape|term|soil|event|region|site)-/, '').replace(/^[a-z]{2}-/, '').replace(/-/g, ' ').replace(/^./, c => c.toUpperCase()); };
  const TYPE_NAME = { appellation: 'Appellation', country: 'Country', region: 'Region', site: 'Site', grape: 'Grape', event: 'Timeline', term: 'Lexicon', soil: 'Soil' };
  function rowMeta(id) {
    const e = VM.data.entity(id) || {};
    const t = VM.data.typeOf(id);
    if (t === 'appellation') return [e.subcat || e.cat, VM.data.countryName(e.country)].filter(Boolean).join(' · ');
    if (t === 'site' || t === 'region') return VM.data.countryName(e.country || VM.data.isoOf(id)) || '';
    return TYPE_NAME[t] || '';
  }
  const PH = new Map();   /* cover id -> first photo record (or null) */
  function coverHTML(id, cls) {
    if (!GHm() || !id) return '';
    const p = PH.get(id);
    if (!p || !p.thumb) return '';
    return `<img class="${cls}" src="${esc(p.thumb)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
  }
  async function preloadPhotos(ids) {
    if (!GHm()) return;
    const want = [...new Set(ids.filter(id => id && !PH.has(id)))];
    if (!want.length) return;
    const all = Promise.all(want.map(id => Promise.resolve(VM.data.photos(id)).then(r => PH.set(id, arr(r)[0] || null)).catch(() => PH.set(id, null))));
    await Promise.race([all, VM.util.sleep(1500)]);
  }

  /* ---------- map state ---------- */
  const MS = { prev: null, step: null, key: '' };
  const hasV2 = () => GHm() && typeof setTerrain3D === 'function' && typeof setBase === 'function' && typeof BM === 'object';
  function rememberMap() {
    if (MS.prev || !hasV2()) return;
    MS.prev = { base: BM.base, terrain: BM.terrain };
  }
  function restoreMap() {
    MS.step = null; MS.key = '';
    if (VM.data && VM.map) { try { if (MS.lit) VM.clearHighlight(); } catch (e) { /* none */ } }
    MS.lit = false;
    const p = MS.prev; MS.prev = null;
    if (!p || !hasV2()) return;
    if (!p.terrain && BM.terrain) setTerrain3D(false);
    if (p.base !== BM.base) setBase(p.base, { temp: true });
  }
  async function applyStep(st) {
    const m = st && st.map;
    if (!m || !VM.map) return;
    const key = JSON.stringify(m);
    if (key === MS.key) return;
    MS.key = key;
    rememberMap();
    try { if (typeof stopSpin === 'function') stopSpin(); } catch (e) { /* none */ }
    if (hasV2()) {
      try { if (typeof JR === 'object' && JR.cur && typeof stopJourney === 'function') stopJourney(true); } catch (e) { /* none */ }
      const want = m.base || 'standard';
      if (want !== BM.base) await setBase(want, { temp: true });
      if (m.terrain && !BM.terrain) setTerrain3D(true, { force: true, instant: true });
      else if (!m.terrain && BM.terrain) setTerrain3D(false, { instant: true });
    }
    const hl = arr(m.highlight);
    if (hl.length) { VM.highlight(hl, { label: m.label || 'In this step', owner: 'guides', dimOthers: true, onClear: () => { MS.lit = false; } }); MS.lit = true; }
    else if (MS.lit) { VM.clearHighlight(); MS.lit = false; }
    const f = m.fly;
    const rm = VM.reducedMotion();
    if (f && typeof f === 'object' && f.lon != null) {
      const cam = { center: [+f.lon, +f.lat], zoom: f.zoom != null ? +f.zoom : Math.max(VM.map.getZoom(), 8), pitch: clamp(+(m.pitch || 0), 0, 70), bearing: +(m.bearing || 0) };
      try { cam.padding = typeof camPad === 'function' ? camPad() : undefined; } catch (e) { /* none */ }
      if (m.pitch && hasV2() && !BM.terrain) VM.map.setMaxPitch(Math.max(60, cam.pitch));
      VM.map.stop();
      if (rm) VM.map.jumpTo(cam); else VM.map.flyTo({ ...cam, curve: 1.42, speed: 1.1, maxDuration: 4200, essential: false });
    } else if (typeof f === 'string') {
      VM.flyTo(f, {});
      if (m.pitch || m.bearing) VM.map.once('moveend', () => { if (MS.key === key) VM.map.easeTo({ pitch: clamp(+(m.pitch || 0), 0, 70), bearing: +(m.bearing || 0), duration: rm ? 0 : 900 }); });
    } else if (hl.length) VM.frame(hl);
  }

  /* ---------- reader: which step is active ---------- */
  let RD = null;   /* {el, guide, ch, steps: [{node, st}], t, onScroll} */
  function activeIndex() {
    const body = RD.el.closest('.sheet-body') || VM.panel.el;
    const top = body.getBoundingClientRect().top;
    const line = top + Math.min(160, body.clientHeight * 0.35);
    let best = 0;
    RD.steps.forEach((s, i) => { if (s.node.getBoundingClientRect().top <= line) best = i; });
    return best;
  }
  function markActive(i, fly) {
    RD.steps.forEach((s, k) => s.node.classList.toggle('on', k === i));
    RD.cur = i;
    if (fly) applyStep(RD.steps[i].st);
  }
  function bindReader(el, guide, ch) {
    unbindReader();
    const nodes = [...el.querySelectorAll('.gd-step')];
    RD = { el, guide, ch, steps: nodes.map((node, i) => ({ node, st: ch.steps[i] })), cur: -1, t: 0 };
    const body = el.closest('.sheet-body') || VM.panel.el;
    RD.body = body;
    RD.onScroll = () => {
      if (!RD || !document.body.contains(RD.el)) { unbindReader(); return; }
      const i = activeIndex();
      if (i !== RD.cur) markActive(i, false);
      clearTimeout(RD.t);
      RD.t = setTimeout(() => { if (RD && document.body.contains(RD.el)) applyStep(RD.steps[activeIndex()].st); }, 420);
    };
    body.addEventListener('scroll', RD.onScroll, { passive: true });
    nodes.forEach((n, i) => n.querySelector('.gd-show')?.addEventListener('click', () => { markActive(i, true); MS.key = ''; applyStep(RD.steps[i].st); }));
    // first step now (after the scroll position settles, in case it was restored)
    setTimeout(() => { if (RD && RD.el === el) markActive(activeIndex(), true); }, 60);
  }
  function unbindReader() {
    if (!RD) return;
    clearTimeout(RD.t);
    try { RD.body.removeEventListener('scroll', RD.onScroll); } catch (e) { /* gone */ }
    RD = null;
  }

  /* ---------- views ---------- */
  function guideCard(g, big) {
    const n = g.chapters.length, d = doneCount(g.id, g);
    const prog = d ? `<span class="gd-prog mono">${d}/${n}</span>` : '';
    const mins = [minutes(g.minutes), g.deeper_minutes ? `+${g.deeper_minutes} going deeper` : ''].filter(Boolean).join(' ');
    return `<li><a class="gd-card${big ? ' big' : ''}" href="#guide-${esc(g.id)}">${coverHTML(g.cover, 'gd-cover')}
      <span class="gd-card-t"><span class="gd-card-title">${esc(g.title)}</span>${g.subtitle ? `<span class="gd-card-sub">${esc(g.subtitle)}</span>` : ''}
      <span class="gd-card-tag">${esc(g.tagline)}</span><span class="gd-card-meta"><span class="mono">${esc(mins)}</span>${prog}</span></span></a></li>`;
  }
  function continueTarget() {
    let best = null;
    for (const [id, p] of Object.entries(PROG)) {
      const m = metaOf(id);
      if (!m || !p.last || !p.at) continue;
      if (doneCount(id, m) >= m.chapters.length) continue;
      if (!best || p.at > best.at) best = { id, at: p.at, m, p };
    }
    return best;
  }
  async function renderPaths(el) {
    await loadIndex();
    const G = IDX.guides;
    await preloadPhotos(G.map(g => g.cover));
    let out = `<div class="head"><p class="eyebrow">Guided tours</p><h2 class="title">Paths</h2>
      <p class="tagline">New to wine, or new to a region? Pick a path and the map will take you through it, stop by stop, with something to drink at each one.</p></div>`;
    if (!G.length) { el.innerHTML = out + VM.h.pending('set of guided paths'); return; }
    const c = continueTarget();
    if (c) {
      const ch = c.m.chapters.find(x => x.id === c.p.last);
      out += `<div class="gd-continue"><p class="eyebrow">Pick up where you left off</p><a class="row" href="#guide-${esc(c.id)}--${esc(c.p.last)}"><span class="row-name">${esc(c.m.title)}<small>${esc(ch ? ch.title : '')}</small></span><span class="row-meta mono">${doneCount(c.id, c.m)}/${c.m.chapters.length}</span></a></div>`;
    }
    for (const k of KIND_ORDER) {
      const list = G.filter(g => g.kind === k);
      if (!list.length) continue;
      out += (k === 'start' ? '' : VM.h.sec(KIND[k])) + `<ul class="gd-cards${k === 'start' ? ' gd-start' : ''}">${list.map(g => guideCard(g, k === 'start')).join('')}</ul>`;
    }
    out += `<p class="note">Each path has an introduction you can read in one sitting and, for the regions, a "Going deeper" half for when you come back. Your progress is saved${GHm() ? ' in this browser, and to your account when you sign in from the Cellar' : ' in this browser'}.</p>`;
    el.innerHTML = out;
  }

  function chapterListHTML(g, meta) {
    const prog = PROG[g.id] || { ch: {} };
    let out = '', part = '';
    g.chapters.forEach((c, i) => {
      const p = c.part || 'intro';
      if (p !== part) {
        part = p;
        out += (out ? '</ol>' : '') + (p === 'deeper' ? `<h3 class="gd-part">Going deeper${g.deeper_minutes ? ` <span class="mono">${g.deeper_minutes} min</span>` : ''}</h3>` : '') + `<ol class="list gd-chlist" start="${i + 1}">`;
      }
      const done = prog.ch[c.id] && prog.ch[c.id].done;
      out += `<li><a class="row${done ? ' done' : ''}" href="#guide-${esc(g.id)}--${esc(c.id)}"><span class="gd-n mono">${done ? CHECK : i + 1}</span><span class="row-name">${esc(c.title)}</span><span class="row-meta mono">${c.steps.length} stop${c.steps.length === 1 ? '' : 's'}</span></a></li>`;
    });
    return out + '</ol>';
  }
  async function renderGuide(el, gid) {
    await loadIndex();
    const g = await loadGuide(gid);
    if (!g) { el.innerHTML = `<div class="head"><p class="eyebrow">Paths</p><h2 class="title">Not found</h2></div><p class="note">That path is not in the atlas yet. <a href="#paths">All paths</a></p>`; return; }
    const meta = metaOf(gid);
    const prog = PROG[gid] || { ch: {} };
    const first = g.chapters[0];
    const next = g.chapters.find(c => !(prog.ch[c.id] && prog.ch[c.id].done)) || first;
    const started = g.chapters.some(c => prog.ch[c.id] && prog.ch[c.id].done);
    const mins = [minutes(g.minutes), g.deeper_minutes ? `${g.deeper_minutes} min going deeper` : ''].filter(Boolean).join(' · ');
    await preloadPhotos([g.cover]);
    el.innerHTML = `${coverHTML(g.cover, 'gd-hero')}<div class="head"><p class="eyebrow"><a href="#paths">Paths</a> · ${esc(KIND[g.kind] || '')}</p><h2 class="title">${esc(g.title)}</h2>${g.subtitle ? `<p class="alt">${esc(g.subtitle)}</p>` : ''}<p class="tagline">${esc(g.tagline || '')}</p></div>
      <p class="gd-mins mono">${esc(mins)} · ${g.chapters.length} chapters</p>
      ${rich(g.intro)}
      <div class="btn-row"><a class="btn solid" href="#guide-${esc(gid)}--${esc(next.id)}">${started ? 'Continue' : 'Start'}${started ? `: ${esc(next.title)}` : ''}</a></div>
      ${VM.h.sec('Chapters')}${chapterListHTML(g, meta)}
      ${g.sources && g.sources.length ? VM.h.sec('Sources') + `<ul class="list gd-src">${g.sources.map(s => `<li class="src">${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a>` : esc(s.title)}</li>`).join('')}</ul>` : ''}`;
    // show where the guide is
    if (g.chapters[0] && g.chapters[0].steps[0]) applyStep(g.chapters[0].steps[0]);
  }

  function tasteHTML(gid, ch) {
    const t = arr(ch.taste);
    if (!t.length) return '';
    const tasted = new Set(arr(((PROG[gid] || {}).ch || {})[ch.id]?.t));
    const J = VM.journal && VM.journal.available;
    return VM.h.sec('Taste this') + t.map((x, i) => `<div class="vm-card gd-taste">
        <div class="gd-taste-h"><b>${inl(x.wine)}</b><span class="mono gd-price">${esc(x.price || '')}</span></div>
        <p>${inl(x.why || '')}</p>${arr(x.try).length ? `<p class="gd-try"><span class="gd-k">Try</span> ${arr(x.try).map(esc).join(', ')}</p>` : ''}
        <div class="btn-row"><button type="button" class="btn small ${tasted.has(i) ? 'solid' : 'ghost'}" data-gdtaste="${i}" aria-pressed="${tasted.has(i)}">${tasted.has(i) ? CHECK + ' Tasted' : 'I tasted this'}</button>${J && x.place ? `<button type="button" class="btn small ghost" data-gdlog="${esc(x.place)}">Log a bottle</button>` : ''}${x.place ? `<a class="btn small ghost" href="#${esc(x.place)}">${esc(nameOf(x.place))}</a>` : ''}</div></div>`).join('');
  }
  function deeperHTML(ch) {
    const d = arr(ch.deeper).filter(id => VM.data.typeOf(id));
    if (!d.length) return '';
    return VM.h.sec('Go deeper') + `<ul class="list">${d.map(id => `<li><a class="row" href="#${esc(id)}"><span class="row-name">${esc(nameOf(id))}</span><span class="row-meta">${esc(rowMeta(id))}</span></a></li>`).join('')}</ul>`;
  }
  function checkHTML(gid, ch) {
    const qs = arr(ch.check);
    if (!qs.length) return '';
    const ans = arr(((PROG[gid] || {}).ch || {})[ch.id]?.q);
    return VM.h.sec('Check yourself') + qs.map((q, qi) => {
      const a = ans[qi];
      const done = a != null;
      return `<fieldset class="gd-q${done ? ' answered' : ''}" data-q="${qi}"><legend>${inl(q.q)}</legend>
        <div class="gd-opts">${q.options.map((o, oi) => `<button type="button" class="gd-opt${done && oi === q.answer ? ' right' : ''}${done && oi === a && a !== q.answer ? ' wrong' : ''}" data-o="${oi}"${done ? ' disabled' : ''}>${inl(o)}</button>`).join('')}</div>
        <p class="gd-why"${done ? '' : ' hidden'}>${done ? `<b>${a === q.answer ? 'Right.' : 'Not quite.'}</b> ` : ''}${inl(q.why || '')}</p></fieldset>`;
    }).join('');
  }
  async function renderChapter(el, gid, cid) {
    await loadIndex();
    const g = await loadGuide(gid);
    const ci = g ? g.chapters.findIndex(c => c.id === cid) : -1;
    if (ci < 0) return renderGuide(el, gid);
    const ch = g.chapters[ci];
    const prev = g.chapters[ci - 1], next = g.chapters[ci + 1];
    gp(gid).last = cid; saveProg(gid);
    const partLabel = ch.part === 'deeper' ? 'Going deeper · ' : '';
    el.innerHTML = `<div class="head"><p class="eyebrow"><a href="#guide-${esc(gid)}">${esc(g.title)}</a> · ${partLabel}Chapter ${ci + 1} of ${g.chapters.length}</p><h2 class="title">${esc(ch.title)}</h2></div>
      <ol class="gd-steps">${ch.steps.map((st, i) => `<li class="gd-step" data-i="${i}">${rich(st.text)}${st.map ? `<button type="button" class="gd-show" aria-label="Show stop ${i + 1} on the map">${PIN}<span>${esc(st.map.label || 'Show on the map')}</span></button>` : ''}</li>`).join('')}</ol>
      ${tasteHTML(gid, ch)}${deeperHTML(ch)}${checkHTML(gid, ch)}
      <div class="gd-nav">${prev ? `<a class="btn ghost" href="#guide-${esc(gid)}--${esc(prev.id)}">Previous</a>` : `<a class="btn ghost" href="#guide-${esc(gid)}">Contents</a>`}
        <button type="button" class="btn ${next ? 'solid' : 'solid'}" data-gdnext>${next ? (next.part === 'deeper' && ch.part !== 'deeper' ? 'Going deeper' : 'Next chapter') : 'Finish'}</button></div>
      ${!next ? nextGuidesHTML(g) : ''}`;
    await VM.data.loadGlobals?.();
    bindChapter(el, g, ch, next);
    bindReader(el, g, ch);
  }
  function nextGuidesHTML(g) {
    const n = arr(g.next).map(metaOf).filter(Boolean);
    if (!n.length) return '';
    preloadPhotos(n.map(m => m.cover));
    return VM.h.sec('Where next') + `<ul class="gd-cards">${n.map(m => guideCard(m)).join('')}</ul>`;
  }
  function bindChapter(el, g, ch, next) {
    const gid = g.id;
    el.querySelectorAll('[data-gdtaste]').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.gdtaste, c = cp(gid, ch.id);
      const on = !c.t.includes(i);
      c.t = on ? [...c.t, i] : c.t.filter(x => x !== i);
      saveProg(gid);
      b.className = `btn small ${on ? 'solid' : 'ghost'}`; b.setAttribute('aria-pressed', String(on)); b.innerHTML = on ? CHECK + ' Tasted' : 'I tasted this';
    }));
    el.querySelectorAll('[data-gdlog]').forEach(b => b.addEventListener('click', () => VM.journal.add(b.dataset.gdlog)));
    el.querySelectorAll('.gd-q').forEach(fs => {
      const qi = +fs.dataset.q, q = ch.check[qi];
      fs.querySelectorAll('.gd-opt').forEach(o => o.addEventListener('click', () => {
        const a = +o.dataset.o, c = cp(gid, ch.id);
        c.q[qi] = a;
        if (c.q.filter(x => x != null).length >= ch.check.length && !c.done) c.done = Date.now();
        saveProg(gid);
        fs.classList.add('answered');
        fs.querySelectorAll('.gd-opt').forEach(x => { x.disabled = true; const k = +x.dataset.o; if (k === q.answer) x.classList.add('right'); else if (k === a) x.classList.add('wrong'); });
        const w = fs.querySelector('.gd-why'); w.hidden = false; w.innerHTML = `<b>${a === q.answer ? 'Right.' : 'Not quite.'}</b> ${inl(q.why || '')}`;
      }));
    });
    el.querySelector('[data-gdnext]')?.addEventListener('click', () => {
      const c = cp(gid, ch.id);
      if (!c.done) c.done = Date.now();
      saveProg(gid);
      if (next) VM.go(`guide-${gid}--${next.id}`);
      else {
        VM.toast(`You finished ${g.title}.`);
        VM.go(`guide-${gid}`);
      }
    });
  }

  /* ---------- registration ---------- */
  VM.panel.register('paths', { title: 'Paths', crumb: 'Paths', snap: 'full', render: el => renderPaths(el) });
  VM.panel.register('guide', {
    title: 'Path', crumb: 'Path', snap: 'half',
    async render(el, { arg }) {
      const [gid, cid] = String(arg || '').split('--');
      if (!gid) return renderPaths(el);
      if (cid) return renderChapter(el, gid, cid);
      return renderGuide(el, gid);
    }
  });
  VM.nav.add({ id: 'paths', label: 'Paths', icon: ICON, order: -10, title: 'Guided tours of regions, grapes and history' });
  /* the views bar scroll-snaps; inserting Paths at the start leaves it snapped to Grapes, so put it back at the start
     until the reader scrolls it themselves */
  const navHome = () => { const n = document.querySelector('.views'); if (n && !n._gdUser) n.scrollLeft = 0; };
  const navWatch = () => { const n = document.querySelector('.views'); if (n && !n._gdW) { n._gdW = 1; ['pointerdown', 'wheel', 'touchstart'].forEach(ev => n.addEventListener(ev, () => { n._gdUser = 1; }, { passive: true })); } };
  document.addEventListener('DOMContentLoaded', () => { navWatch(); navHome(); requestAnimationFrame(navHome); });
  VM.on('map:ready', () => { navHome(); setTimeout(navHome, 600); });
  VM.on('view', v => { if (v.id !== 'guide') { unbindReader(); if (v.id !== 'paths') restoreMap(); } });
  VM.on('panel:close', () => { unbindReader(); restoreMap(); });
  VM.on('profile:open', () => unbindReader());

  /* profiles: "In the guides" */
  VM.panel.addSection(['appellation', 'site', 'region', 'grape'], async (el, e) => {
    await loadIndex();
    const id = e.type === 'grape' ? (String(e.id).startsWith('grape-') ? e.id : 'grape-' + e.id) : e.id;
    const refs = arr(IDX.refs[id]);
    if (!refs.length) return false;
    el.innerHTML = VM.h.sec('In the guides') + `<ul class="list">${refs.slice(0, 4).map(([g, c, ci]) => {
      const m = metaOf(g); if (!m) return '';
      const ch = m.chapters.find(x => x.id === c);
      return `<li><a class="row" href="#guide-${esc(g)}--${esc(c)}"><span class="row-name">${esc(m.title)}<small>Chapter ${ci + 1}: ${esc(ch ? ch.title : '')}</small></span><span class="row-meta">${ICON}</span></a></li>`;
    }).join('')}</ul>`;
  }, { id: 'guides-refs', slot: 'end', order: 70 });

  /* first visit: a quiet way in for newcomers */
  const WKEY = 'guides:welcome';
  function welcome() {
    if (VM.store.get(WKEY, 0)) return;
    if (location.hash && location.hash.length > 1) return;
    loadIndex().then(() => {
      const s = metaOf('start-here');
      if (!s || document.getElementById('gd-welcome')) return;
      const app = document.getElementById('app');
      if (!app) return;
      const d = document.createElement('div');
      d.id = 'gd-welcome'; d.className = 'gd-welcome'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'New to wine?');
      d.innerHTML = `<p class="eyebrow">New to wine?</p><p class="gd-w-t">${esc(s.tagline)}</p>
        <div class="btn-row"><a class="btn small solid" href="#guide-start-here" data-gdw="go">Start here · ${esc(minutes(s.minutes))}</a><a class="btn small ghost" href="#paths" data-gdw="all">All paths</a>
        <button type="button" class="icon-btn gd-w-x" aria-label="Dismiss" data-gdw="x"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`;
      const close = () => { VM.store.set(WKEY, Date.now()); d.remove(); };
      d.querySelectorAll('[data-gdw]').forEach(b => b.addEventListener('click', close));
      addEventListener('hashchange', close, { once: true });
      app.appendChild(d);
    });
  }
  VM.on('map:ready', () => setTimeout(welcome, 1800));

  VM.guides = { index: () => loadIndex(), guide: loadGuide, progress: () => PROG };
})();
