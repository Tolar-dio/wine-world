/* Vitis Mundi: UI (router, sheet, profiles, views, search) */
const APP = {
  mapReady: false, pendingStack: null, hist: [], cur: '', view: null, _opts: null, _ev: {},
  on(n, f) { (this._ev[n] = this._ev[n] || []).push(f); },
  emit(n, x) { for (const f of this._ev[n] || []) try { f(x); } catch (e) { console.warn(e); } },
  nav(id, opts = {}) {
    this._opts = opts;
    if (!id) { closeSheet(); return; }
    if (location.hash.slice(1) === id) route();
    else location.hash = id;
  },
  toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(this._tt); this._tt = setTimeout(() => { t.hidden = true; }, 2800);
  },
  _idx: null,
  loadIndex() {
    if (this._idx) return this._idx;
    this._idx = (has('data/geo/_index.json') ? getJSON('data/geo/_index.json') : Promise.resolve(null)).then(list => {
      if (list) setIndex(list);
      else rebuildIndexFromFeatures();
      if (list && map && map.getSource('ov') && !(D.overview && D.overview.features.length)) {
        D.overview = flatOverview({ type: 'FeatureCollection', features: D.index.filter(a => !a.fine && Array.isArray(a.lp)).map(a => ({ type: 'Feature', properties: { id: a.id, name: a.name, country: a.country, area: a.area, style: a.style || 'mixed', cat: a.cat }, geometry: { type: 'Point', coordinates: a.lp } })) });
        map.getSource('ov').setData(D.overview);
      }
      rebuildSearch();
      this.emit('index');
      return D.index;
    });
    return this._idx;
  },
  _glob: null,
  loadGlobals() {
    if (this._glob) return this._glob;
    const g = p => has(p) ? getJSON(p) : Promise.resolve(null);
    this._glob = Promise.all([g('data/content/global/grapes.json'), g('data/content/global/glossary.json'), g('data/geo/_varieties.json'), g('data/geo/_climrefs.json'), g('data/meta.json')])
      .then(([gr, gl, va, cr, me]) => {
        setGrapes(gr); setGlossary(gl);
        D.varieties = va || {}; D.climrefs = listFrom(cr, 'refs'); D.meta = me;
        rebuildSearch();
        this.emit('globals');
      });
    return this._glob;
  },
  _more: null,
  loadReference() {
    if (this._more) return this._more;
    const g = p => has(p) ? getJSON(p) : Promise.resolve(null);
    this._more = Promise.all([g('data/content/global/timeline.json'), g('data/content/global/soils.json'), g('data/content/global/systems.json')])
      .then(([tl, so, sy]) => { setTimeline(tl); setSoils(so); setSystems(sy); rebuildSearch(); });
    return this._more;
  }
};
function rebuildIndexFromFeatures() {
  if (D.indexLoaded) return;
  D.index = [...D.feat.values()].map(p => ({ id: p.id, name: p.name, alt: p.alt, country: p.country, cat: p.cat, subcat: p.subcat, area: p.area, parent: p.parent, lp: p.lp, bbox: p.bbox, bq: p.bq, style: p.style, prof: p.prof }));
  const keep = D.index; setIndex(keep); D.indexLoaded = false;
  rebuildSearch();
}
APP.on('geo', () => { if (!D.indexLoaded) rebuildIndexFromFeatures(); });

/* ---------- small renderers ---------- */
const H = {
  sec: (t, id) => `<h3 class="sec"${id ? ` id="${id}"` : ''}>${esc(t)}</h3>`,
  ledger(items) {
    items = items.filter(x => x && x.v != null && x.v !== '');
    if (!items.length) return '';
    return `<dl class="ledger n${items.length}">${items.map(x => `<div><dt>${esc(x.k)}</dt><dd>${x.raw ? x.v : esc(x.v)}${x.s ? `<span class="sec2">${esc(x.s)}</span>` : ''}</dd></div>`).join('')}</dl>`;
  },
  styleChips(styles) {
    styles = arr(styles).filter(s => STYLES.includes(s));
    if (!styles.length) return '';
    return `<ul class="chips" aria-label="Wine styles">${styles.map(s => `<li><span class="chip static"><i class="sw" style="background:var(--w-${s})"></i>${esc(STYLE_LABEL[s])}</span></li>`).join('')}</ul>`;
  },
  link(id, label, cls = '') { return `<a href="#${esc(id)}" class="${cls}">${esc(label)}</a>`; },
  prose(t, lead) { return t ? `<div class="prose${lead ? ' lead' : ''}">${prose(t)}</div>` : ''; },
  src(list) {
    list = arr(list).filter(Boolean);
    if (!list.length) return '';
    return `<ul class="list src-list">${list.map(s => {
      const t = typeof s === 'string' ? s : (s.title || s.url || '');
      const u = typeof s === 'object' && s.url && /^https?:\/\//.test(s.url) ? s.url : null;
      return `<li class="src" style="padding:6px 0">${u ? `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>` : esc(t)}</li>`;
    }).join('')}</ul>`;
  },
  appRow(a) {
    const ar = fmtArea(a.area);
    return `<li><a class="row" href="#${esc(a.id)}"><span class="row-name">${esc(a.name)}<small>${esc([a.subcat || a.cat, a.prof ? 'profile' : ''].filter(Boolean).join(' · '))}</small></span><span class="row-meta">${ar ? esc(ar.v) : ''}</span></a></li>`;
  },
  siteRow(s) {
    const k = KIND[s.kind] || 'Site';
    const meta = s.class && fold(s.class) !== fold(k) ? (fold(s.class).includes(fold(k)) ? s.class : `${k} · ${s.class}`) : k;
    return `<li><a class="row" href="#${esc(s.id)}"><span class="row-name">${esc(s.name)}<small>${esc(meta)}</small></span><span class="row-meta">${s.lat != null ? esc(fmtLat(s.lat, 2)) : ''}</span></a></li>`;
  },
  latline(lon, lat, extra) {
    if (lon == null || lat == null) return '';
    const same = sameLatitude(lat, lon);
    return `<p class="latline"><span class="coords">${esc(fmtLat(lat, 3))} ${esc(fmtLon(lon, 3))}</span>${extra ? ` · ${esc(extra)}` : ''}${same ? ` · <em>${esc(same)}</em>` : ''}</p>`;
  },
  pending(what) { return `<p class="pending">The written ${esc(what)} is still being prepared. Everything below comes from the official registers and our map data.</p>`; }
};

/* ---------- sheet ---------- */
const SHEET = { snap: 'closed', drag: null };
const isPhone = () => MQ.phone.matches;
function snapHeights() {
  const app = $('#app');
  const Hh = app.clientHeight;
  const mast = $('.mast');
  const top = mast.offsetTop + mast.offsetHeight + 8;
  return { peek: Math.round(Math.min(Hh * 0.4, 208)), half: Math.round(Hh * 0.54), full: Math.max(240, Hh - top) };
}
function setSnap(name, px) {
  const app = $('#app');
  SHEET.snap = name;
  app.dataset.snap = name;
  if (!isPhone()) { app.style.removeProperty('--sheet-h'); return; }
  const h = px ?? snapHeights()[name];
  app.style.setProperty('--sheet-h', h + 'px');
  const b = $('#snap');
  b.hidden = false;
  b.setAttribute('aria-label', name === 'full' ? 'Collapse panel' : 'Expand panel');
  b.querySelector('svg').style.transform = name === 'full' ? 'rotate(180deg)' : '';
}
function openSheet(snap, force) {
  const sh = $('#sheet'), app = $('#app');
  const was = !sh.hidden && !force;
  sh.hidden = false;
  app.dataset.sheet = 'open';
  if (isPhone()) {
    const want = snap || (was ? SHEET.snap : 'half');
    const order = ['peek', 'half', 'full'];
    setSnap(was && order.indexOf(SHEET.snap) > order.indexOf(want) ? SHEET.snap : want);
  } else { $('#snap').hidden = true; setSnap('side'); sidePad(true); }
}
/* desktop: the open side sheet takes the right of the map, so the globe's centre moves into the space left of it */
function sidePad(on) {
  if (!map || isPhone()) return;
  const pad = map.getPadding(), right = on ? ($('#sheet').offsetWidth || 448) + 24 : 0;
  if (map.isMoving() || Math.abs((pad.right || 0) - right) < 2) return;   /* a flight sets its own padding */
  map.easeTo({ padding: { ...pad, right }, duration: MQ.rm.matches ? 0 : 350, essential: false });
}
function closeSheet(keepHash) {
  const sh = $('#sheet');
  sh.hidden = true;
  $('#app').dataset.sheet = 'closed';
  $('#app').dataset.snap = 'closed';
  SHEET.snap = 'closed';
  sidePad(false);
  APP.hist = []; APP.cur = '';
  const was = VMX.cur;
  if (was && was.type === 'view') { const d = VMX.views.get(was.id); if (d && d.onClose) try { d.onClose(); } catch (e) { console.warn(e); } }
  VMX.cur = null;
  setView(null);
  stopTour();
  vmEmit('panel:close', was);
  if (map) { setSel(null); selectCountry(null); }
  clearMarkers();
  if (!keepHash && location.hash) {
    try { history.replaceState(null, '', location.href.replace(/#.*$/, '')); } catch (e) { location.hash = ''; }
  }
  $('#q').focus({ preventScroll: true });
}
function renderSheet(html, crumb) {
  const body = $('#sheet-body');
  _secRun++;
  body.innerHTML = html;
  body.scrollTop = 0;
  $('#sheet-crumb').textContent = crumb || '';
  $('#back').hidden = APP.hist.length === 0;
  if (APP._restore && APP._restore.key === APP.cur) { const r = APP._restore; APP._restore = null; restoreScroll(r); }
}
/* data a profile names that may not have arrived when it is first drawn (cold deep links): the country list,
   the appellation index, sites, and the source titles in meta.json */
function lateNeeds(h) {
  const need = [];
  if (!D.countriesLoaded && map) need.push(COUNTRIES_READY);
  if (!D.indexLoaded) need.push(APP.loadIndex());
  if (/^site-|^region-/.test(h) && !D.sites.length) need.push(VM.data.loadSites());
  if (!D.meta) need.push(APP.loadGlobals());
  return need;
}
/* re-render the current route in place: same scroll and snap, no history entry, no camera move */
function refreshProfile() {
  if (!APP.cur) return;
  SCROLLS.set(APP.cur, { top: $('#sheet-body').scrollTop, snap: SHEET.snap });
  APP._opts = { back: true, stay: true, refresh: true };
  route();
}
function srcTitle(k) {
  if (!k) return 'atlas data';
  if (SRC[k]) return SRC[k];
  const m = arr(D.meta?.sources).find(s => s.key === k);
  return m ? String(m.title || k).replace(/^(.{0,140}?[.)])\s.*$/, '$1') : 'atlas data';
}
/* a link that matches nothing: say so in the panel and offer the search, pre-filled from the link */
function notFound(h) {
  setView(null);
  openSheet(isPhone() ? 'half' : null);
  const words = String(h).replace(/^(grape|event|term|soil|region|site)-/, '').replace(/^[a-z]{2}-/, '').replace(/-/g, ' ').trim();
  renderSheet(`<div class="head"><p class="eyebrow">Not found</p><h2 class="title">Nothing at this link</h2></div>
    <p class="note"><span class="mono">#${esc(h)}</span> does not match a place, grape or moment in the atlas. It may have been renamed, or the link may be cut short.</p>
    <div class="btn-row"><button type="button" class="btn solid" id="nf-search">Search${words ? ` for “${esc(words)}”` : ' the atlas'}</button></div>`, 'Not found');
  $('#nf-search').addEventListener('click', () => { const q = $('#q'); q.value = words; q.focus(); renderResults(); });
}
/* scroll positions per route; restored on back once the content (async sections, photos) is tall enough */
const SCROLLS = new Map();
let _restoreStop = null;
function restoreScroll(r) {
  if (_restoreStop) _restoreStop();
  const body = $('#sheet-body'), key = APP.cur, t0 = performance.now();
  if (isPhone() && r.snap && ['peek', 'half', 'full'].includes(r.snap)) setSnap(r.snap);
  let done = false, raf = 0;
  const stop = () => {
    if (done) return; done = true;
    cancelAnimationFrame(raf); mo.disconnect(); ro.disconnect();
    for (const ev of ['wheel', 'touchstart', 'pointerdown', 'keydown']) body.removeEventListener(ev, stop);
    if (_restoreStop === stop) _restoreStop = null;
  };
  const tryIt = () => {
    if (done) return;
    if (APP.cur !== key || performance.now() - t0 > 4000) { stop(); return; }
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (done) return;
      body.scrollTop = r.top || 0;
      // reached: wait a little longer in case a late section above the target still grows the page
      if (Math.abs(body.scrollTop - (r.top || 0)) < 2 && performance.now() - t0 > 1200) stop();
    });
  };
  const mo = new MutationObserver(tryIt), ro = new ResizeObserver(tryIt);
  mo.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
  ro.observe(body);
  for (const ev of ['wheel', 'touchstart', 'pointerdown', 'keydown']) body.addEventListener(ev, stop, { passive: true });
  _restoreStop = stop;
  tryIt();
  setTimeout(tryIt, 400); setTimeout(tryIt, 1300); setTimeout(tryIt, 2500);
}
function bindSheetDrag() {
  const sh = $('#sheet'), app = $('#app');
  const start = (y, src) => {
    if (!isPhone()) return false;
    SHEET.drag = { y0: y, h0: sh.getBoundingClientRect().height, t0: performance.now(), y, src };
    sh.classList.add('dragging');
    return true;
  };
  const moveTo = y => {
    const d = SHEET.drag; if (!d) return;
    d.vy = (y - d.y) / Math.max(1, performance.now() - (d.t || d.t0)); d.y = y; d.t = performance.now();
    const hs = snapHeights();
    const h = clamp(d.h0 - (y - d.y0), 60, hs.full);
    app.style.setProperty('--sheet-h', h + 'px');
  };
  const end = () => {
    const d = SHEET.drag; if (!d) return;
    SHEET.drag = null;
    sh.classList.remove('dragging');
    const h = sh.getBoundingClientRect().height, hs = snapHeights();
    const v = d.vy || 0;
    if (Math.abs(d.y - d.y0) < 6 && d.src === 'handle') { setSnap(SHEET.snap === 'peek' ? 'half' : SHEET.snap === 'half' ? 'full' : 'half'); return; }
    if (h < hs.peek * 0.7 || (v > 0.9 && SHEET.snap === 'peek')) { closeSheet(); return; }
    let target;
    if (v > 0.6) target = h > hs.half ? 'half' : 'peek';
    else if (v < -0.6) target = h < hs.half ? 'half' : 'full';
    else target = ['peek', 'half', 'full'].reduce((a, b) => Math.abs(hs[b] - h) < Math.abs(hs[a] - h) ? b : a);
    setSnap(target);
  };
  for (const el of [$('#handle'), $('#sheet-bar')]) {
    el.addEventListener('pointerdown', e => {
      if (e.target.closest('button')) return;
      if (start(e.clientY, el.id === 'handle' ? 'handle' : 'bar')) { el.setPointerCapture(e.pointerId); e.preventDefault(); }
    });
    el.addEventListener('pointermove', e => { if (SHEET.drag) moveTo(e.clientY); });
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }
  // pull the content down from its top to collapse
  const body = $('#sheet-body');
  let ty = null, armed = false;
  body.addEventListener('touchstart', e => { ty = e.touches[0].clientY; armed = body.scrollTop <= 0; }, { passive: true });
  body.addEventListener('touchmove', e => {
    if (!isPhone() || ty == null) return;
    const y = e.touches[0].clientY;
    if (!SHEET.drag && armed && y - ty > 8 && body.scrollTop <= 0) start(ty, 'body');
    if (!SHEET.drag && SHEET.snap !== 'full' && ty - y > 10 && body.scrollTop <= 0 && body.scrollHeight > body.clientHeight + 4) { /* let it scroll */ }
    if (SHEET.drag) { e.preventDefault(); moveTo(y); }
  }, { passive: false });
  body.addEventListener('touchend', () => { ty = null; if (SHEET.drag) end(); });
  $('#snap').addEventListener('click', () => setSnap(SHEET.snap === 'full' ? 'half' : 'full'));
  $('#close').addEventListener('click', () => closeSheet());
  $('#back').addEventListener('click', () => {
    const prev = APP.hist.pop();
    if (!prev) return;
    APP._opts = { back: true };
    APP.cur = '';
    if (location.hash.slice(1) === prev) route(); else location.hash = prev;
  });
  addEventListener('resize', () => { if (SHEET.snap !== 'closed') openSheet(isPhone() ? (SHEET.snap === 'side' ? 'half' : SHEET.snap) : null); });
  MQ.phone.addEventListener('change', () => { if (SHEET.snap !== 'closed') openSheet(isPhone() ? 'half' : null); });
}

/* ---------- markers ---------- */
let MK = { pulse: null, pin: null };
function pulseAt(lon, lat) {
  if (!map || lon == null || lat == null) return;
  if (!MK.pulse) { const el = document.createElement('div'); el.className = 'pulse'; el.innerHTML = '<i></i><i></i><i></i>'; el.setAttribute('aria-hidden', 'true'); MK.pulse = new maplibregl.Marker({ element: el }); }
  MK.pulse.setLngLat([lon, lat]).addTo(map);
}
function pinAt(lon, lat, title) {
  if (!map || lon == null || lat == null) return;
  if (!MK.pin) { const el = document.createElement('div'); el.className = 'pin-mark'; MK.pin = new maplibregl.Marker({ element: el }); }
  MK.pin.getElement().title = title || '';
  MK.pin.setLngLat([lon, lat]).addTo(map);
}
function clearMarkers() { if (MK.pulse) MK.pulse.remove(); if (MK.pin) MK.pin.remove(); }

/* ---------- router ---------- */
const VIEWS = ['grapes', 'timeline', 'lexicon', 'layers', 'about'];
let _routeN = 0;
/* profiles name countries; a link opened before the country list has arrived waits for it briefly */
const COUNTRIES_READY = new Promise(r => APP.on('countries', r));
async function route() {
  const h = decodeURIComponent(location.hash.slice(1)).trim();
  const opts = APP._opts || {}; APP._opts = null;
  const n = ++_routeN;
  if (!h) { if (!$('#sheet').hidden) closeSheet(true); return; }
  const open = !$('#sheet').hidden;
  // remember where the reader was in the profile being left, so going back returns there
  if (APP.cur && APP.cur !== h && open) SCROLLS.set(APP.cur, { top: $('#sheet-body').scrollTop, snap: SHEET.snap });
  // back: the panel's back button, or the browser's (the target is the entry on top of the panel history)
  const browserBack = !opts.back && !opts.tour && open && APP.hist.length && APP.hist[APP.hist.length - 1] === h && APP.cur !== h;
  if (browserBack) APP.hist.pop();
  const isBack = !!(opts.back || browserBack);
  if (APP.cur && APP.cur !== h && !isBack && open) { APP.hist.push(APP.cur); if (APP.hist.length > 30) APP.hist.shift(); }
  APP._restore = isBack && SCROLLS.has(h) ? { key: h, ...SCROLLS.get(h) } : null;
  if (isBack) opts.back = true;
  APP.cur = h;
  hideResults();
  if (!opts.tour) stopTour();
  if (!/^event-/.test(h) && !/^grape-/.test(h) && MK.pulse) MK.pulse.remove();
  if (!/^grape-/.test(h) && MK.pin) MK.pin.remove();
  try {
    const cv = typeof viewFor === 'function' ? viewFor(h) : null;
    if (cv) return await showCustomView(cv, h, opts);
    if (!D.countriesLoaded && map) { await Promise.race([COUNTRIES_READY, sleep(2500)]); if (n !== _routeN) return; }
    if (VIEWS.includes(h)) return await showView(h, opts);
    if (/^grape-/.test(h)) return await showGrape(h.slice(6), opts);
    if (/^event-/.test(h)) return await showEvent(h, opts);
    if (/^term-/.test(h)) return await showView('lexicon', { ...opts, term: h });
    if (/^soil-/.test(h)) return await showView('lexicon', { ...opts, tab: 'soils', term: h });
    const late = opts.refresh ? [] : lateNeeds(h);
    let r;
    if (/^region-/.test(h)) r = await showRegion(h, opts, n);
    else if (/^site-/.test(h)) r = await showSite(h, opts, n);
    else if (/^[a-z]{2}$/.test(h)) r = await showCountry(h, opts, n);
    else if (/^[a-z]{2}-/.test(h)) r = await showApp(h, opts, n);
    else { notFound(h); return; }
    if (late.length) Promise.all(late).then(() => { if (n === _routeN && APP.cur === h && !$('#sheet').hidden) refreshProfile(); });
    return r;
  } catch (e) { console.warn('[route]', e); }
}
function setView(v) {
  APP.view = v;
  for (const b of $$('.views button')) b.setAttribute('aria-pressed', String(b.dataset.view === v || (v === 'about' && false)));
  if (v !== 'timeline') { $('#strip').hidden = true; $('#app').dataset.strip = 'off'; }
  if (v !== 'grapes' && S.grapeSet && (!VMX.hlOwner || VMX.hlOwner === 'grape')) clearGrape();
  const body = $('#sheet-body'); if (body && !VMX.views.has(v)) delete body.dataset.view;
}

/* ---------- appellation ---------- */
function appData(id) {
  const ix = D.byId.get(id), ft = D.feat.get(id), ex = D.extraById.get(id);
  if (!ix && !ft && !ex) return null;
  return { ...(ex || {}), ...(ix || {}), ...(ft || {}) };
}
async function showApp(id, opts, n) {
  setView(null);
  APP.loadGlobals();
  await Promise.race([APP.loadIndex(), sleep(2500)]);
  if (n !== _routeN) return;
  const iso = id.slice(0, 2);
  let a = appData(id);
  if (!a && D.countries[iso]?.file) { await ensureCountryGeo(iso, true); a = appData(id); }
  if (!a) {
    const c = await getFineContent(iso);
    const p = c?.profiles?.[id];
    if (!p) { notFound(id); return; }
    a = { id, name: p.name, country: iso, cat: p.cat };
  }
  const stack = APP.pendingStack && APP.pendingStack.includes(id) ? APP.pendingStack : null;
  APP.pendingStack = null;
  // a polygon with no profile of its own opens the profile that covers it (Mâcon Villages -> Mâcon)
  if (!a.prof && a.pref && !opts.own && !opts.prefFrom && (D.byId.get(a.pref) || D.feat.get(a.pref))) {
    try { history.replaceState(null, '', '#' + a.pref); } catch (e) { /* sandboxed */ }
    APP.cur = a.pref;
    return showApp(a.pref, { ...opts, prefFrom: a.id, prefStack: stack }, n);
  }
  const from = opts.prefFrom ? (D.byId.get(opts.prefFrom) || D.feat.get(opts.prefFrom)) : null;
  const isFine = !!(a.fine || D.byId.get(id)?.fine || D.extraById.get(id)?.fine);
  const draw = async () => {
    const c = await (isFine ? getFineContent(iso) : getContent(iso));
    if (n !== _routeN) return;
    const full = appData(id) || a;
    let html = appHTML(full, c?.profiles?.[id], c, stack || opts.prefStack);
    if (from) html = `<p class="pref-note">You chose <b>${esc(from.name)}</b>${from.subcat ? ` (${esc(from.subcat)})` : ''}. It has no profile of its own, so here is the profile of ${esc(full.name)}, which covers it. <button type="button" class="linkish" data-own="${esc(from.id)}">Show ${esc(from.name)} on its own</button></p>` + html;
    // the bar names the place once its title has scrolled away: "Cannubi · Barolo", "Chambertin · Grand cru"
    const where = full.ctx || placeCtx(full) || countryName(iso);
    renderSheet(html, where && fold(where) !== fold(full.name) ? `${full.name} · ${where}` : full.name);
    bindProfile();
    runSections('appellation', id, from ? { chosen: from.id } : {});
  };
  openSheet(opts.fromMap ? 'peek' : 'half');
  await draw();
  /* a profile drawn before the grapes arrived is re-rendered once by route() (lateNeeds), with its scroll kept */
  if (map) {
    const focus = from || a;
    if (!opts.fromMap && !opts.back) {
      if (focus.pt || !focus.bbox || (focus.bbox[2] - focus.bbox[0] < 1e-4)) { if (focus.lp) { pulseAt(focus.lp[0], focus.lp[1]); flyPoint(focus.lp[0], focus.lp[1], 8.4); } }
      else flyBbox(focus.bbox, { maxZoom: focus.area < 2 ? 14 : focus.area < 30 ? 12.5 : 11, minZoom: focus.lp ? Z_APP + 0.3 : undefined });
    }
    selectCountry(null);
    const had = D.feat.has(id);
    const selId = focus.id;
    if (!a.pt) ensureCountryGeo(iso, !!(D.byId.get(selId)?.fine)).then(() => { if (n !== _routeN) return; setSel(selId); if (!had && D.feat.has(id)) draw(); refineAlso(appData(id) || a, n); });
    setSel(selId);
  }
}
function appHTML(a, p, c, stack) {
  const iso = a.country || a.id.slice(0, 2);
  const reg = a.reg || {};
  const anc = ancestry(a.id);
  const kids = (D.children.get(a.id) || []);
  const eyebrow = [countryName(iso), a.cat || p?.cat, a.subcat].filter(Boolean);
  const alt = arr(a.alt).filter(x => x && x !== a.name);
  const bq = a.pt ? ['Point only', 'No published boundary is available, so the map marks this appellation with a dot at its heart rather than a shape.'] : BQ[a.bq];
  const zone = a.pt ? null : fmtArea(a.area);
  const vines = fmtHa(num(p?.area_ha) ?? num(reg.vine_ha));
  const createdV = yearOf(p?.created) || yearOf(reg.created) || yearOf(reg.registered) || yearOf(reg.reg_year);
  const euV = !createdV && reg.eu_reg ? yearOf(reg.eu_reg) : null;
  const styles = arr(p?.styles).length ? p.styles : arr(a.styles).length ? a.styles : (a.style && a.style !== 'mixed' ? [a.style] : []);
  let out = `<div class="head"><p class="eyebrow">${eyebrow.map(esc).join('<span class="sep">·</span>')}</p><h2 class="title">${esc(a.name)}</h2>${alt.length ? `<p class="alt">${esc(alt.join(', '))}</p>` : ''}</div>` + slotHTML('hero');
  // where it sits: country, content region, then only the legally meaningful containers
  const W = whereLine(a, p, c, stack);
  out += `<p class="crumbs">${W.crumbs}</p>`;
  out += alsoHTML(W.also);
  out += H.ledger([
    zone && { k: a.bq === 'official' ? 'Delimited area' : 'Mapped zone', v: zone.v, s: zone.s },
    vines && { k: 'Under vine', v: vines.v, s: vines.s },
    createdV && { k: 'Created', v: createdV },
    euV && { k: 'EU protected', v: euV }
  ]);
  if (bq) out += `<p class="note"><b>${esc(bq[0])}.</b> ${esc(bq[1])}${a.src && SRC[a.src] ? ` Source: ${esc(SRC[a.src])}.` : ''}</p>`;
  out += H.styleChips(styles);
  if (a.lp) out += H.latline(a.lp[0], a.lp[1]);
  out += slotHTML('top');
  // the written profile
  if (p && (p.summary || p.terroir)) {
    out += H.prose(p.summary, true);
    if (p.terroir) out += H.sec('Terroir') + H.prose(p.terroir);
    if (p.grapes) out += H.sec('Grapes') + grapeProse(p.grapes);
    if (arr(p.producers).length) out += H.sec('Producers to know') + `<ul class="chips">${p.producers.map(x => `<li><span class="chip static">${esc(nameOf(x))}</span></li>`).join('')}</ul>`;
    if (p.nerd_note) out += `<aside class="marg" style="margin-top:22px"><span class="lk">Cellar note</span>${inl(p.nerd_note)}</aside>`;
  } else {
    out += H.pending('profile');
  }
  out += climHTML(a.clim, a.lp);
  out += slotHTML('mid');
  const vars = arr(a.varieties);
  if (vars.length) {
    out += H.sec(`Permitted varieties · ${vars.length}`) + `<ul class="chips">${vars.map(v => { const g = grapeFor(v); return `<li>${g ? `<a class="chip" href="#grape-${esc(g.id)}">${esc(v)}</a>` : `<span class="chip static">${esc(v)}</span>`}</li>`; }).join('')}</ul>`;
  }
  // sub-appellations: true legal nesting (listed by the profile, or official line inside official line);
  // other smaller zones that happen to sit inside are listed apart, because they overlap rather than nest
  const listed = new Set(arr(p?.contains_ids));
  const listedNames = new Set(arr(p?.contains).map(x => fold(nameOf(x))));
  const isSub = k => listed.has(k.id) || listedNames.has(fold(k.name)) || (a.bq === 'official' && k.bq === 'official' && (a.area || 0) >= 1.5 * (k.area || 0));
  const subs = kids.filter(isSub), inside = kids.filter(k => !isSub(k));
  for (const nm of arr(p?.contains)) {
    const id = arr(p.contains_ids)[arr(p.contains).indexOf(nm)] || D.index.find(y => y.country === iso && fold(y.name) === fold(nameOf(nm)))?.id;
    if (!subs.some(k => k.id === id || fold(k.name) === fold(nameOf(nm)))) subs.push(id && D.byId.get(id) ? D.byId.get(id) : { id: id || '', name: nameOf(nm) });
  }
  const rows = list => list.slice(0, 60).map(k => k.id && (D.byId.get(k.id) || D.feat.get(k.id)) ? H.appRow(D.byId.get(k.id) || k) : `<li><span class="row"><span class="row-name">${esc(k.name)}</span></span></li>`).join('');
  if (subs.length) out += H.sec(`Within ${a.name} · ${subs.length}`) + `<ul class="list">${rows(subs)}</ul>${subs.length > 60 ? `<p class="note">and ${subs.length - 60} more; zoom in to see them all.</p>` : ''}`;
  if (inside.length) out += H.sec(`Overlapping zones inside · ${inside.length}`) + `<p class="note" style="margin-top:6px">Smaller appellations drawn mostly inside this one. Their limits are set separately, so they overlap rather than nest.</p><ul class="list">${rows(inside)}</ul>`;
  const sites = [...(D.sitesByApp.get(a.id) || [])];
  for (const s of arr(c?.sites)) if (s.app === a.id && !sites.some(x => x.id === s.id)) sites.push({ ...s, lat: s.lat, lon: s.lon });
  if (sites.length) out += H.sec(`Sites · ${sites.length}`) + `<ul class="list">${sites.slice(0, 60).map(H.siteRow).join('')}</ul>`;
  const HIDE = new Set(['inao_app', 'inao_denom', 'inao_id', 'gid', 'fid', 'objectid', 'src_id', 'match']);
  const regKeys = Object.keys(reg).filter(k => !HIDE.has(k) && reg[k] != null && reg[k] !== '');
  if (regKeys.length) {
    out += H.sec('Register') + `<dl class="dl">${regKeys.map(k => {
      let v = reg[k];
      if (Array.isArray(v)) v = v.join(', ');
      else if (typeof v === 'object' && v) v = JSON.stringify(v);
      if (typeof v === 'number') v = fmt(v, v % 1 ? 1 : 0);
      const txt = typeof v === 'string' && v.length > 28 && /\s/.test(v);
      return `<dt>${esc(REG_LABEL[k] || k.replace(/_/g, ' '))}</dt><dd class="${txt ? 'txt' : ''}">${esc(v)}${esc(REG_UNIT[k] || '')}</dd>`;
    }).join('')}</dl>`;
  }
  out += slotHTML('end');
  out += `<p class="src" style="margin-top:22px">Boundary: ${esc(srcTitle(a.src))}.${p ? ' Profile: Vitis Mundi research notes.' : ''}</p>`;
  return out;
}
/* ---------- where an appellation sits ----------
   Geometric parents are "smallest zone holding 85% of this one". That is a true legal nesting only for
   delimited lines (INAO parcels, TTB, Wine Australia, WO...) or when the parent's profile lists the child.
   Commune-based zones (most of the EU dataset) overlap without nesting, so they go to "Also within". */
function profileOf(id, c) {
  if (!id) return null;
  const cc = c && c.profiles ? c : null;
  return cc?.profiles?.[id] || null;
}
function listsChild(x, child, c) {
  const px = profileOf(x.id, c);
  if (!px) return false;
  if (arr(px.contains_ids).includes(child.id)) return true;
  const f = fold(child.name);
  return arr(px.contains).some(n => fold(nameOf(n)) === f);
}
function legalChain(a, c) {
  const anc = ancestry(a.id).reverse(); // innermost first
  const chain = [], also = [];
  let prev = a, open = true;
  for (const x of anc) {
    const listed = listsChild(x, prev, c);
    const official = prev.bq === 'official' && x.bq === 'official';
    // near-identical footprints (Bourgogne, Bourgogne aligoté, Coteaux Bourguignons...) are parallel catch-alls, not tiers
    const step = (x.area || 0) >= 1.5 * (prev.area || 0);
    if (open && (listed || (official && step))) { chain.unshift(x); prev = x; }
    else { open = false; also.push(x); }
  }
  return { chain, also };
}
function whereLine(a, p, c, stack) {
  const iso = a.country || a.id.slice(0, 2);
  const { chain, also } = legalChain(a, c);
  // content region / subregion: from this profile, else from the nearest container that has one
  let rp = p;
  if (!rp?.region_id) for (const x of [...chain].reverse().concat(also)) { const q = profileOf(x.id, c); if (q?.region_id) { rp = q; break; } }
  const findR = id => id && (D.regionById.get(id) || arr(c?.regions).find(r => r.id === id));
  const reg = findR(rp?.region_id), sub = rp?.subregion_id !== rp?.region_id ? findR(rp?.subregion_id) : null;
  const names = new Set([a, ...chain].flatMap(x => [fold(x.name), ...arr(x.alt).map(fold)]));
  const regs = [reg, sub].filter(r => r && !names.has(fold(r.name)));
  const line = [{ id: iso, name: countryName(iso) }, ...regs.map(r => ({ id: r.id, name: r.name })), ...chain];
  const crumbs = line.map(x => H.link(x.id, x.name)).join('<span class="gt">›</span>') + `<span class="gt">›</span><span class="here">${esc(a.name)}</span>`;
  // everything else that covers it: geometric ancestors outside the chain plus whatever was under the finger
  const inChain = new Set([a.id, ...chain.map(x => x.id)]);
  // an overlapping appellation named like a region already in the breadcrumb (Langhe DOC under the Langhe region) stays listed,
  // but it is marked so the reader sees it is the appellation, not the region again
  const more = new Map(also.map(x => [x.id, x]));
  for (const id of arr(stack)) if (!inChain.has(id) && !more.has(id)) { const x = D.byId.get(id) || D.feat.get(id); if (x && (x.area || 0) >= (a.area || 0)) more.set(id, x); }
  const regNames = new Set(regs.map(r => fold(r.name)));
  for (const x of more.values()) x._asApp = regNames.has(fold(x.name));
  return { crumbs, chainIds: inChain, also: [...more.values()].sort((x, y) => (y.area || 0) - (x.area || 0)) };
}
function alsoHTML(list) {
  if (!list.length) return '<div id="also-within"></div>';
  return `<div id="also-within" class="stack"><span class="stack-label">Also within</span><p class="crumbs also-list" style="margin:0">${list.map(x => `${H.link(x.id, x.name)}${x._asApp || x.cat ? `<small>${esc(x.cat || '')}</small>` : ''}`).join('<span class="sep" aria-hidden="true">·</span>')}</p>
    <p class="also">These zones overlap this one. Wine grown here may also qualify for them if it follows their rules on grapes and style.</p></div>`;
}
/* after the camera settles, ask the map which loaded shapes contain the label point, so "Also within" is complete */
function refineAlso(a, n) {
  if (!map || !a.lp || a.pt) return;
  map.once('idle', () => {
    if (n !== _routeN) return;
    const pt = map.project(a.lp), cv = map.getCanvas();
    if (pt.x < 0 || pt.y < 0 || pt.x > cv.clientWidth || pt.y > cv.clientHeight) return;
    const ids = [...new Set(map.queryRenderedFeatures(pt, { layers: fillLayers() }).map(f => f.properties.id))];
    if (!ids.length) return;
    getContent(a.country).then(c => {
      if (n !== _routeN) return;
      const W = whereLine(a, profileOf(a.id, c), c, ids);
      const el = document.getElementById('also-within');
      if (el && W.also.length) el.outerHTML = alsoHTML(W.also);
    });
  });
}

/* link grape names inside a free-text grapes line */
function grapeProse(t) {
  const txt = Array.isArray(t) ? t.map(nameOf).join(', ') : String(t);
  if (!D.grapes.length) return H.prose(txt);
  const names = [...D.grapeByName.keys()].filter(k => k.length > 3).sort((a, b) => b.length - a.length);
  const html = prose(txt);
  // link the first mention of each grape (walk text nodes only)
  const box = document.createElement('div'); box.innerHTML = html;
  const seen = new Set();
  const walk = node => {
    for (const ch of [...node.childNodes]) {
      if (ch.nodeType === 3) {
        let str = ch.nodeValue, f = fold(str);
        let hit = null;
        for (const k of names) { const i = (' ' + f + ' ').indexOf(' ' + k + ' '); if (i >= 0) { const g = D.grapeByName.get(k); if (!seen.has(g.id)) { hit = [k, g]; break; } } }
        if (!hit) continue;
        // map folded index back to raw string by scanning words
        const words = str.split(/(\s+|[,;:()\/]+)/);
        let acc = [], found = -1;
        const kw = hit[0].split(' ');
        for (let i = 0; i < words.length && found < 0; i++) {
          const parts = []; let j = i;
          while (j < words.length && parts.length < kw.length) { const fw = fold(words[j]); if (fw) parts.push(fw); else if (!/^\s+$/.test(words[j])) break; j++; }
          if (parts.join(' ') === hit[0]) found = i, acc = [i, j];
        }
        if (found < 0) continue;
        seen.add(hit[1].id);
        const before = words.slice(0, acc[0]).join(''), mid = words.slice(acc[0], acc[1]).join(''), after = words.slice(acc[1]).join('');
        const a = document.createElement('a'); a.href = '#grape-' + hit[1].id; a.textContent = mid;
        const frag = document.createDocumentFragment();
        frag.append(before, a, after);
        const tail = frag.lastChild;
        ch.replaceWith(frag);
        if (tail && tail.nodeType === 3) walk({ childNodes: [tail] });
      } else if (ch.nodeType === 1 && ch.tagName !== 'A') walk(ch);
    }
  };
  walk(box);
  return `<div class="prose">${box.innerHTML}</div>`;
}
function climHTML(cl, lp) {
  if (!cl || (cl.gst == null && cl.gdd == null && cl.elev == null)) return '';
  const g = num(cl.gst);
  let out = H.sec('Climate');
  if (g != null) {
    const pos = v => clamp((v - 13) / 11 * 100, 0, 100);
    const refs = arr(D.climrefs).filter(r => num(r.gst) != null && r.gst >= 13 && r.gst <= 24).sort((x, y) => x.gst - y.gst);
    const W = 380, rowEnd = [-1e9, -1e9], picked = [];
    for (const r of refs) {
      const x = pos(r.gst) / 100 * W, w = String(r.name).length * 6.2 + 8;
      const row = [0, 1].find(k => x - w / 2 > rowEnd[k]);
      if (row == null) continue;
      rowEnd[row] = x + w / 2; picked.push({ ...r, row });
    }
    const refsH = picked.map(r => {
      const x = pos(r.gst), al = x < 9 ? ' al' : x > 91 ? ' ar' : '';
      return `<i class="gst-ref" style="left:${x}%"></i><span class="gst-ref-l r${r.row}${al}" style="left:${x}%" title="${esc(r.name)}: ${esc(r.gst)} °C">${esc(r.name)}</span>`;
    }).join('');
    const band = (GST_BANDS.find(b => g >= b[0] && g < b[1]) || [0, 0, g < 13 ? 'Too cool' : 'Very hot'])[2];
    out += `<div class="clim"><div><span class="lk">Growing-season mean temperature</span>
      <div class="gst-scale" role="img" aria-label="Growing-season mean ${g.toFixed(1)} degrees Celsius on a scale from 13 to 24, ${band}">
        <div class="gst-bar" style="background:linear-gradient(90deg,var(--c0),var(--c1) 20%,var(--c2) 40%,var(--c3) 60%,var(--c4) 80%,var(--c5))"></div>
        ${refsH}
        <div class="gst-mark" style="left:${clamp(pos(g), 4, 96)}%"><i></i><b>${g.toFixed(1)} °C · ${esc(band)}</b></div>
        <div class="gst-axis" aria-hidden="true"><span>13</span><span>15</span><span>17</span><span>19</span><span>21</span><span>24 °C</span></div>
      </div></div>
      <p class="note" style="margin:0">${esc(gstNote(g))}${cl.gst_class ? ` Jones class: <b>${esc(cl.gst_class)}</b>.` : ''}</p></div>`;
  }
  const wk = cl.winkler ? (/^[IV]+$/.test(cl.winkler) ? 'Region ' + cl.winkler : cl.winkler) : winkler(num(cl.gdd));
  const elev = cl.elev_min != null && cl.elev_max != null ? `${fmt(cl.elev_min)}–${fmt(cl.elev_max)} m` : cl.elev != null ? fmtM(cl.elev) : '';
  const elevS = cl.elev_min != null && cl.elev_max != null ? `${fmt(cl.elev_min * 3.28084)}–${fmt(cl.elev_max * 3.28084)} ft${cl.elev != null ? ` · mean ${fmt(cl.elev)} m` : ''}` : cl.elev != null ? fmtFt(cl.elev) : '';
  out += H.ledger([
    cl.gdd != null && { k: 'Degree days', v: fmt(cl.gdd), s: wk ? `Winkler ${wk.replace(/^Region /, '')}` : '' },
    cl.hi != null && { k: 'Huglin index', v: fmt(cl.hi), s: huglin(num(cl.hi)) },
    cl.prec != null && { k: 'Rain, year', v: `${fmt(cl.prec)} mm`, s: cl.gsp != null ? `${fmt(cl.gsp)} mm in season` : `${fmt(cl.prec / 25.4)} in` },
    elev && { k: 'Elevation', v: elev, s: elevS },
    cl.mjt != null && { k: 'Warmest month', v: `${(+cl.mjt).toFixed(1)} °C`, s: 'mean (MJT)' },
    cl.dtr != null && { k: 'Day–night swing', v: `${(+cl.dtr).toFixed(1)} °C`, s: 'mean diurnal range' }
  ]);
  const sources = arr(D.meta?.sources);
  const short = t => String(t || '').replace(/^(.{0,90}?\(\d{4}\)\.?).*$/, '$1');
  const tc = sources.find(s => /terraclimate/i.test((s.key || '') + (s.title || '')));
  const wc = sources.find(s => /worldclim/i.test((s.key || '') + (s.title || '')));
  out += `<p class="src">Climate: TerraClimate 1991–2020 monthly normals, a grid of about 4 km${tc ? ` (${esc(short(tc.title))})` : ''}. Elevation: WorldClim 2.1, about 1 km${wc ? ` (${esc(short(wc.title))})` : ''}. Both are averaged over the mapped zone, with a growing season of April to October in the north and October to April in the south. Read them as the climate of the zone, not of one slope.</p>`;
  return out;
}

/* ---------- country ---------- */
async function showCountry(iso, opts, n) {
  setView(null);
  const m = D.countries[iso];
  const c = await getContent(iso);
  if (n !== _routeN) return;
  if (!m && !c) { APP.toast(`${countryName(iso)} is not in the atlas yet.`); return; }
  await Promise.race([APP.loadIndex(), sleep(1500)]);
  openSheet(opts.fromMap ? 'half' : 'half');
  renderSheet(countryHTML(iso, m || {}, c), 'Country');
  bindProfile();
  runSections('country', iso);
  selectCountry(iso);
  setSel(null);
  const bb = m ? mainBbox(iso) : null;
  if (map && !opts.fromMap && !opts.back && bb) flyBbox(bb, { maxZoom: 5.6 });
}
function countryHTML(iso, m, c) {
  const k = c?.country || {};
  const name = k.name || m.name || countryName(iso);
  const st = k.stats || {};
  const apps = D.index.filter(a => a.country === iso && !a.fine);
  const count = (m.count || 0) + (m.points || 0) || apps.length || null;
  const tier = k.tier || m.tier;
  let out = `<div class="head"><p class="eyebrow">${esc([tier ? TIER[tier] : 'Wine country', count ? `${fmt(count)} appellations mapped` : ''].filter(Boolean).join(' · '))}</p>
    <h2 class="title" style="font-family:var(--f-sc);font-style:normal;letter-spacing:.02em">${esc(name)}</h2>${k.tagline ? `<p class="tagline">${inl(k.tagline)}</p>` : ''}</div>` + slotHTML('hero');
  out += `<div class="btn-row">${m.file || m.bbox ? `<button type="button" class="btn solid" data-fly="${esc(JSON.stringify(mainBbox(iso) || m.bbox || null))}" data-iso="${esc(iso)}">Explore the map</button>` : ''}</div>`;
  out += H.ledger([
    st.vineyard_ha && { k: 'Vineyards', v: `${fmt(st.vineyard_ha)} ha`, s: `${fmt(sig3(st.vineyard_ha * 2.47105))} acres` },
    st.production_mhl && { k: 'Production', v: `${fmt(st.production_mhl, st.production_mhl < 10 ? 2 : 1)} mhl`, s: `${fmt(st.production_mhl * 100 / 0.75, 0)} m bottles` },
    st.world_rank_production && { k: 'World rank', v: `No. ${st.world_rank_production}`, s: 'by volume' },
    count && { k: 'In the atlas', v: fmt(count), s: m.points && !m.count ? 'appellations, as points' : 'appellations' }
  ]);
  if (st.note || st.year) out += `<p class="src">${esc([st.year ? `Figures for ${st.year}` : '', st.note].filter(Boolean).join('. '))}.</p>`;
  out += slotHTML('top');
  if (k.overview) out += H.prose(k.overview, true);
  else out += H.pending('country profile');
  const hist = arr(k.history);
  if (hist.length) {
    out += H.sec('History') + `<ol class="hist">${hist.map((h, i) => `<li${h.abroad ? ' class="abroad"' : ''}><span class="when">${esc(h.when)}${h.abroad ? '<span class="away">abroad</span>' : ''}</span>${h.lat != null ? `<button type="button" class="h-title" data-hist="${i}">${esc(h.title)}<span class="pin">${esc(fmtLat(+h.lat, 1))}</span></button>` : `<span class="h-title">${esc(h.title)}</span>`}${h.text ? `<p>${inl(h.text)}</p>` : ''}</li>`).join('')}</ol>`;
  }
  if (k.classification) out += H.sec('How the labels work') + H.prose(k.classification);
  out += slotHTML('mid');
  if (k.climate_soils) out += H.sec('Climate and soils') + H.prose(k.climate_soils);
  const grapes = arr(k.grapes);
  if (grapes.length) out += H.sec('Grapes') + `<ul class="list">${grapes.map(g => { const gr = grapeFor(nameOf(g)); const nm = esc(nameOf(g)); return `<li>${gr ? `<a class="row" href="#grape-${esc(gr.id)}">` : '<div class="row">'}<span class="row-name">${nm}${g.note ? `<small style="font-family:var(--f-body);letter-spacing:0;font-size:14.5px;color:var(--muted)">${inl(g.note)}</small>` : ''}</span>${gr ? '</a>' : '</div>'}</li>`; }).join('')}</ul>`;
  const regs = arr(c?.regions).filter(r => !r.parent_region);
  const regsAll = arr(c?.regions);
  if (regsAll.length) {
    const kids = r => regsAll.filter(x => x.parent_region === r.name || (x.parent_id && x.parent_id === r.id));
    const tops = regsAll.filter(r => !r.parent_region && !r.parent_id);
    const row = (r, sub) => `<li${sub ? ' class="sub"' : ''}><a class="row" href="#${esc(r.id)}"><span class="row-name">${esc(r.name)}${r.tagline && !sub ? `<small class="tag">${inl(r.tagline)}</small>` : ''}</span><span class="row-meta">${arr(r.app_ids).length || ''}</span></a></li>`;
    out += H.sec(`Regions · ${regsAll.length}`) + `<p class="note" style="margin-top:6px">Figures count the appellations mapped in each region.</p><ul class="list regs">${(tops.length ? tops : regsAll).map(r => row(r, false) + kids(r).map(k => row(k, true)).join('')).join('')}</ul>`;
  } else if (arr(k.regions).length) {
    out += H.sec('Regions') + `<ul class="chips">${k.regions.map(r => { const reg = D.regions.find(x => x.country === iso && fold(x.name) === fold(r)); return `<li>${reg ? `<a class="chip" href="#${esc(reg.id)}">${esc(r)}</a>` : `<span class="chip static">${esc(r)}</span>`}</li>`; }).join('')}</ul>`;
  }
  if (apps.length) {
    const top = apps.filter(a => !a.parent).sort((a, b) => (b.prof || 0) - (a.prof || 0) || (b.area || 0) - (a.area || 0)).slice(0, 14);
    out += H.sec('Largest appellations') + `<ul class="list">${top.map(H.appRow).join('')}</ul>${apps.length > top.length ? `<p class="note">${fmt(apps.length - top.length)} more on the map. Zoom in to see them, or search by name.</p>` : ''}`;
  }
  if (arr(k.further_reading).length) out += H.sec('Further reading') + `<ul class="list">${k.further_reading.map(r => `<li class="src" style="padding:7px 0;font-size:15px;color:var(--text)">${inl(nameOf(r))}</li>`).join('')}</ul>`;
  out += slotHTML('end');
  if (arr(k.sources).length) out += H.sec('Sources') + H.src(k.sources);
  return out;
}

/* ---------- region ---------- */
async function showRegion(id, opts, n) {
  setView(null);
  const iso = id.slice(7, 9);
  const c = await getContent(iso);
  await Promise.race([APP.loadIndex(), sleep(1500)]);
  if (n !== _routeN) return;
  const geo = D.regionById.get(id) || {};
  const r = arr(c?.regions).find(x => x.id === id) || {};
  if (!geo.name && !r.name) { notFound(id); return; }
  openSheet(opts.fromMap ? 'peek' : 'half');
  renderSheet(regionHTML(id, iso, geo, r, c), `${r.name || geo.name} · ${countryName(iso)}`);
  bindProfile();
  runSections('region', id);
  selectCountry(null); setSel(null);
  if (map) {
    for (const s of S.sources) { /* clear prior hover */ }
    if (!opts.fromMap && !opts.back) {
      if (geo.bbox) flyBbox(geo.bbox, { maxZoom: r.zoom || 10 });
      else if (r.lon != null) flyPoint(+r.lon, +r.lat, +(r.zoom || 8));
    }
    try { map.removeFeatureState({ source: 'regions' }); if (map.getSource('regions')) map.setFeatureState({ source: 'regions', id }, { hover: true }); } catch (e) { /* not yet */ }
  }
}
function regionHTML(id, iso, geo, r, c) {
  const name = r.name || geo.name;
  const parent = r.parent_id ? arr(c?.regions).find(x => x.id === r.parent_id) : r.parent_region ? arr(c?.regions).find(x => x.name === r.parent_region) : null;
  let out = `<div class="head"><p class="eyebrow">Wine region<span class="sep">·</span>${esc(countryName(iso))}${parent ? `<span class="sep">·</span>${esc(parent.name)}` : ''}</p><h2 class="title">${esc(name)}</h2>${arr(r.alt).length ? `<p class="alt">${esc(r.alt.join(', '))}</p>` : ''}${r.tagline ? `<p class="tagline">${inl(r.tagline)}</p>` : ''}</div>` + slotHTML('hero');
  out += `<p class="crumbs">${H.link(iso, countryName(iso))}${parent ? `<span class="gt">›</span>${H.link(parent.id, parent.name)}` : ''}<span class="gt">›</span><span class="here">${esc(name)}</span></p>`;
  const lp = geo.lp || (r.lon != null ? [+r.lon, +r.lat] : null);
  if (lp) out += H.latline(lp[0], lp[1]);
  out += slotHTML('top');
  if (r.summary) out += H.prose(r.summary, true); else out += H.pending('region profile');
  for (const [k, t] of [['history', 'History'], ['terroir', 'Terroir'], ['grapes', 'Grapes'], ['styles', 'Styles'], ['classification', 'Classification']]) if (r[k]) out += H.sec(t) + H.prose(r[k]);
  out += slotHTML('mid');
  let ids = arr(r.app_ids);
  if (!ids.length && arr(r.appellations).length) ids = r.appellations.map(nm => D.index.find(a => a.country === iso && fold(a.name) === fold(nm))?.id).filter(Boolean);
  const apps = ids.map(i => D.byId.get(i)).filter(Boolean).sort((a, b) => (b.area || 0) - (a.area || 0));
  if (apps.length) out += H.sec(`Appellations · ${apps.length}`) + `<ul class="list">${apps.slice(0, 80).map(H.appRow).join('')}</ul>`;
  else if (arr(r.appellations).length) out += H.sec('Appellations') + `<ul class="chips">${r.appellations.map(x => `<li><span class="chip static">${esc(x)}</span></li>`).join('')}</ul>`;
  const subs = arr(c?.regions).filter(x => x.parent_id === id || (!x.parent_id && x.parent_region === name));
  if (subs.length) out += H.sec('Subregions') + `<ul class="list">${subs.map(s => `<li><a class="row" href="#${esc(s.id)}"><span class="row-name">${esc(s.name)}</span></a></li>`).join('')}</ul>`;
  const idset = new Set(ids);
  const sites = D.sites.filter(s => idset.has(s.app));
  if (sites.length) out += H.sec(`Sites · ${sites.length}`) + `<ul class="list">${sites.slice(0, 60).map(H.siteRow).join('')}</ul>`;
  out += slotHTML('end');
  if (arr(r.sources).length) out += H.sec('Sources') + H.src(r.sources);
  return out;
}

/* ---------- site ---------- */
async function showSite(id, opts, n) {
  setView(null);
  const iso = id.slice(5, 7);
  let c = await getContent(iso);
  await Promise.race([Promise.all([APP.loadIndex(), D.sites.length ? null : VM.data.loadSites()]), sleep(4000)]);
  if (n !== _routeN) return;
  const g = D.siteById.get(id) || {};
  if (g.app && D.byId.get(g.app)?.fine) { c = await getFineContent(iso); if (n !== _routeN) return; }
  const t = arr(c?.sites).find(s => s.id === id) || {};
  const s = { ...t, ...g, lat: g.lat ?? num(t.lat), lon: g.lon ?? num(t.lon), cq: g.cq || t.coord_quality };
  if (!s.name) { notFound(id); return; }
  openSheet(opts.fromMap ? 'peek' : 'half');
  const look = x => x ? (D.byId.get(x) || D.feat.get(x) || null) : null;
  const app = look(s.app);                 // finest unit holding the site (a climat, Einzellage, MGA...) or its appellation
  const main = look(t.app_main);           // the appellation it was named under, when the unit is finer
  const hint = t.region_hint ? (D.regionById.get(t.region_hint) || arr(c?.regions).find(r => r.id === t.region_hint)) : null;
  let out = `<div class="head"><p class="eyebrow">${esc([KIND[s.kind] || 'Site', countryName(iso)].join(' · '))}</p><h2 class="title">${esc(s.name)}</h2>${s.class ? `<p class="tagline" style="font-size:17px">${esc(s.class)}</p>` : ''}</div>` + slotHTML('hero');
  let crumbs;
  if (app) {
    const W = whereLine(app, profileOf(app.id, c), c, []);
    crumbs = W.crumbs.replace('<span class="here">', '<a href="#' + esc(app.id) + '">').replace(/<\/span>$/, '</a>');
    if (main && main.id !== app.id && !W.chainIds.has(main.id)) crumbs = crumbs.replace(/(<a href="#[^"]+">[^<]*<\/a>)$/, `${H.link(main.id, main.name)}<span class="gt">›</span>$1`);
  } else {
    crumbs = [{ id: iso, name: countryName(iso) }, ...(hint ? [{ id: hint.id, name: hint.name }] : [])].map(x => H.link(x.id, x.name)).join('<span class="gt">›</span>');
  }
  const sameName = app && fold(app.name) === fold(s.name);
  out += `<p class="crumbs">${sameName ? crumbs.replace(/<a href="#[^"]+">([^<]*)<\/a>$/, '<span class="here">$1</span>') : `${crumbs}<span class="gt">›</span><span class="here">${esc(s.name)}</span>`}</p>`;
  if (sameName) out += `<p class="note" style="margin-top:4px">The site is the ${esc(app.subcat || app.cat || 'appellation')} itself: ${H.link(app.id, 'open its appellation profile')}.</p>`;
  if (!app && (t.app_label || t.appellation)) out += `<p class="note" style="margin-top:4px">${t.app_label ? `Labelled as <b>${esc(t.app_label)}</b>, a place rather than an appellation.` : `Appellation given as <b>${esc(t.appellation)}</b>, which is not on the map.`}</p>`;
  out += H.latline(s.lon, s.lat, s.cq === 'approx' ? 'approximate position' : 'surveyed position');
  out += slotHTML('top');
  out += t.text ? H.prose(t.text, true) : H.pending('site note');
  out += slotHTML('mid');
  if (arr(t.producers).length) out += H.sec('Producers') + `<ul class="chips">${t.producers.map(x => `<li><span class="chip static">${esc(nameOf(x))}</span></li>`).join('')}</ul>`;
  const near = D.sites.filter(x => x.id !== id && x.app && (x.app === s.app || (main && x.app === main.id))).slice(0, 12);
  if (near.length) out += H.sec(`Nearby in ${(app || main).name}`) + `<ul class="list">${near.map(H.siteRow).join('')}</ul>`;
  out += slotHTML('end');
  renderSheet(out, `${s.name} · ${s.ctx || (app && app.name) || KIND[s.kind] || 'Site'}`);
  bindProfile();
  runSections('site', id, { app: s.app || t.app_main || null, lp: s.lon != null ? [s.lon, s.lat] : null, name: s.name, kind: s.kind });
  selectCountry(null);
  if (map) {
    if (app) { ensureCountryGeo(iso, !!app.fine || !!D.byId.get(app.id)?.fine).then(() => { if (n === _routeN) setSel(app.id); }); }
    if (!opts.fromMap && !opts.back) flyPoint(s.lon, s.lat, 12.2);
  }
}

/* ---------- grapes ---------- */
function clearGrape() {
  setGrapeHighlight(null);
  $('#pill').hidden = true;
  if (MK.pin) MK.pin.remove();
}
const COLOR = { red: ['red', 'Black-skinned'], noir: ['red', 'Black-skinned'], black: ['red', 'Black-skinned'], white: ['white', 'Pale-skinned'], blanc: ['white', 'Pale-skinned'], grey: ['rose', 'Grey-pink skin'], gris: ['rose', 'Grey-pink skin'], pink: ['rose', 'Pink-skinned'], rose: ['rose', 'Pink-skinned'] };
const gColor = g => COLOR[fold(g.color)] || (/noir|red|black|rouge|tint/i.test(g.color) ? COLOR.red : /gris|rose|pink|grey/i.test(g.color) ? COLOR.pink : COLOR.white);
async function showGrapes(opts) {
  await APP.loadGlobals();
  let out = `<div class="head"><p class="eyebrow">Ampelography</p><h2 class="title">Grapes</h2><p class="tagline">Pick a variety to light up every appellation that allows it.</p></div>`;
  if (!D.grapes.length) {
    const ids = Object.keys(D.varieties || {});
    out += H.pending('grape guide');
    if (ids.length) out += `<ul class="list">${ids.sort().map(id => `<li><a class="row" href="#grape-${esc(id)}"><span class="row-name">${esc(id.replace(/-/g, ' '))}</span><span class="row-meta">${D.varieties[id].length}</span></a></li>`).join('')}</ul>`;
    return out;
  }
  const sorts = [['name', 'A to Z'], ['reach', 'Most appellations']];
  const sortBy = store.get('gsort', 'name');
  out += `<div class="gtools"><label class="sr" for="gq">Filter grapes</label><input id="gq" class="filter" type="search" placeholder="Filter ${D.grapes.length} grapes or synonyms" autocomplete="off">
    <div class="seg seg-inline" role="radiogroup" aria-label="Sort grapes">${sorts.map(([k, l]) => `<label><input type="radio" name="gsort" value="${k}" ${sortBy === k ? 'checked' : ''}>${l}</label>`).join('')}</div>
    <div class="seg seg-inline" role="radiogroup" aria-label="Berry colour"><label><input type="radio" name="gcol" value="" checked>All</label><label><input type="radio" name="gcol" value="red">Black</label><label><input type="radio" name="gcol" value="white">Pale</label></div></div>`;
  const list = [...D.grapes];
  if (sortBy === 'reach') list.sort((a, b) => (D.varieties[b.id] || []).length - (D.varieties[a.id] || []).length);
  out += `<ul class="list" id="glist">${list.map(g => `<li data-f="${esc(fold([g.name, ...g.synonyms].join(' ')))}" data-c="${gColor(g)[0] === 'red' ? 'red' : 'white'}"><a class="row" href="#grape-${esc(g.id)}"><span class="row-name"><i class="sw" style="display:inline-block;margin-right:8px;vertical-align:1px;background:var(--w-${gColor(g)[0]})"></i>${esc(g.name)}${g.origin.place ? `<small>${esc(g.origin.place)}</small>` : ''}</span><span class="row-meta" title="appellations that allow it">${(D.varieties[g.id] || []).length || ''}</span></a></li>`).join('')}</ul>`;
  return out;
}
async function showGrape(gid, opts) {
  await APP.loadGlobals();
  await Promise.race([APP.loadIndex(), sleep(2000)]);
  setView('grapes');
  const g = D.grapeById.get(gid) || { id: gid, name: gid.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), synonyms: [], parents: [], offspring: [], origin: {} };
  const ids = arr(D.varieties[gid]);
  openSheet('half');
  const ref = nm => { const clean = String(nm).replace(/\?$/, ''); const x = grapeFor(clean); return x ? `<a class="chip" href="#grape-${esc(x.id)}">${esc(nm)}</a>` : `<span class="chip static">${esc(nm)}</span>`; };
  const col = gColor(g);
  let out = `<div class="head"><p class="eyebrow"><i class="sw" style="display:inline-block;margin-right:7px;vertical-align:1px;background:var(--w-${col[0]})"></i>${esc(['Grape variety', col[1], g.species && g.species !== 'vinifera' ? g.species : ''].filter(Boolean).join(' · '))}</p><h2 class="title">${esc(g.name)}</h2>${g.synonyms.length ? `<p class="alt">Also ${esc(g.synonyms.slice(0, 10).join(', '))}${g.synonyms.length > 10 ? ` and ${g.synonyms.length - 10} more` : ''}</p>` : ''}</div>`;
  if (g.origin.lat != null || g.origin.place) {
    const conf = g.origin.confidence ? ` (${g.origin.confidence})` : '';
    out += `<p class="latline">Birthplace: <span class="coords">${esc(g.origin.place || countryName(g.origin.country) || 'unknown')}</span>${esc(conf)}${g.origin.lat != null ? ` · ${esc(fmtLat(g.origin.lat, 2))} ${esc(fmtLon(g.origin.lon, 2))}` : ''}</p>`;
    out += `<div class="btn-row">${g.origin.lat != null ? `<button type="button" class="btn" data-pin="${g.origin.lon},${g.origin.lat}">Show birthplace</button>` : ''}${ids.length ? `<button type="button" class="btn" data-spread="1">Show where it grows</button>` : ''}</div>`;
  }
  if (g.parents.length || g.offspring.length) {
    out += H.sec('Family') + `<div class="tree">${g.parents.length ? `<span class="gen-l">Parents</span><div class="gen">${g.parents.map(ref).join('<span class="x" aria-hidden="true">×</span>')}</div><i class="stem"></i>` : ''}<span class="self">${esc(g.name)}</span>${g.offspring.length ? `<i class="stem"></i><div class="gen">${g.offspring.slice(0, 12).map(ref).join('')}</div><span class="gen-l">Notable offspring</span>` : ''}</div>`;
    if (g.parentage_note) out += `<p class="note">${inl(g.parentage_note)}</p>`;
  } else if (g.parentage_note) out += H.sec('Family') + `<p class="note">${inl(g.parentage_note)}</p>`;
  out += slotHTML('top');
  if (g.profile) out += H.sec('Profile') + H.prose(g.profile, true);
  else out += H.pending('grape profile');
  if (g.hectares) out += `<p class="note"><b>Planted:</b> ${inl(nameOf(g.hectares))}</p>`;
  const triv = arr(g.trivia);
  if (triv.length) out += `<aside class="marg" style="margin-top:22px"><span class="lk">From the cellar book</span>${triv.map(t => `<p style="margin:0 0 .5em">${inl(nameOf(t))}</p>`).join('')}</aside>`;
  const regions = arr(g.regions);
  if (regions.length) out += H.sec('Classic places') + `<ul class="chips">${regions.map(r => { const nm = nameOf(r); const a = findPlace(nm); return `<li>${a ? `<a class="chip" href="#${esc(a)}">${esc(nm)}</a>` : `<span class="chip static">${esc(nm)}</span>`}</li>`; }).join('')}</ul>`;
  if (ids.length) {
    const byC = {};
    for (const id of ids) { const a = D.byId.get(id); const iso = a?.country || id.slice(0, 2); (byC[iso] = byC[iso] || []).push(a || { id, name: id }); }
    const cs = Object.entries(byC).sort((a, b) => b[1].length - a[1].length);
    out += H.sec(`Where it is allowed · ${ids.length}`) + `<p class="note" style="margin-top:6px">Appellations whose rules or profile name ${esc(g.name)}, grouped by country.</p>` + cs.map(([iso, list], i) => `<details class="wg"${i === 0 && cs.length < 6 ? ' open' : ''}><summary class="row"><span class="row-name" style="font-family:var(--f-sc);letter-spacing:.03em">${esc(countryName(iso))}</span><span class="row-meta">${list.length}</span></summary><ul class="list">${list.sort((a, b) => (b.prof || 0) - (a.prof || 0) || (b.area || 0) - (a.area || 0)).slice(0, 120).map(H.appRow).join('')}</ul></details>`).join('');
  } else {
    out += `<p class="note">${Object.keys(D.varieties).length ? 'No mapped appellation names this grape among its permitted varieties.' : 'The grape-to-appellation index is still being built, so the map cannot highlight this grape yet.'}</p>`;
  }
  if (g.vivc?.url && /^https:\/\/(www\.)?vivc\.de\//.test(g.vivc.url)) out += `<p class="src" style="margin-top:20px">Passport: <a href="${esc(g.vivc.url)}" target="_blank" rel="noopener noreferrer">VIVC ${esc(g.vivc.prime_name || g.name)}${g.vivc.id ? ` no. ${esc(g.vivc.id)}` : ''}</a>, Vitis International Variety Catalogue.</p>`;
  out += slotHTML('end');
  renderSheet(out.replace('</div>', '</div>' + slotHTML('hero')), 'Grape');
  bindProfile();
  runSections('grape', 'grape-' + gid);
  if (map) {
    VMX.hlOwner = 'grape'; S.dim = true;
    setGrapeHighlight(ids.length ? ids : null);
    if (g.origin.lat != null) pinAt(g.origin.lon, g.origin.lat, `${g.name} birthplace`);
    const pill = $('#pill');
    if (ids.length) {
      pill.innerHTML = `<span><b>${esc(g.name)}</b> · <span class="mono">${ids.length}</span> appellations</span><button type="button" id="pill-x" aria-label="Clear the ${esc(g.name)} highlight">Clear</button>`;
      pill.hidden = false;
      $('#pill-x').onclick = () => { clearGrape(); closeSheet(); };
    } else pill.hidden = true;
    if (!opts.back && !opts.stay) {
      if (ids.length) spreadGrape(); else if (g.origin.lat != null) flyPoint(g.origin.lon, g.origin.lat, 4);
    }
  }
}
function findPlace(nm) {
  const f = fold(nm);
  const r = D.regions.find(x => fold(x.name) === f || arr(x.alt).some(a => fold(a) === f));
  if (r) return r.id;
  const a = D.index.find(x => !x.fine && (fold(x.name) === f || arr(x.alt).some(y => fold(y) === f)));
  return a ? a.id : null;
}
function spreadGrape() {
  const ids = [...(S.grapeSet || [])];
  const pts = ids.map(id => D.byId.get(id)).filter(a => a && Array.isArray(a.lp) && !a.fine).sort((a, b) => (b.area || 0) - (a.area || 0));
  if (!pts.length) return;
  // frame the densest 85% of points so a lone outpost does not zoom us out to the whole planet
  const lons = pts.map(a => a.lp[0]).sort((a, b) => a - b), lats = pts.map(a => a.lp[1]).sort((a, b) => a - b);
  const q = (arr2, t) => arr2[Math.min(arr2.length - 1, Math.max(0, Math.round(t * (arr2.length - 1))))];
  const lo = pts.length > 12 ? 0.07 : 0, hi = pts.length > 12 ? 0.93 : 1;
  const bb = [q(lons, lo) - 0.5, q(lats, lo) - 0.5, q(lons, hi) + 0.5, q(lats, hi) + 0.5];
  if (isPhone()) setSnap('peek');
  flyBbox(bb, { maxZoom: 7 });
}

/* ---------- timeline ---------- */
const TOUR = { on: false, t: 0, i: 0 };
function eraGroups() {
  const g = [];
  for (const e of D.timeline) { let last = g[g.length - 1]; if (!last || last.name !== e.era) g.push(last = { name: e.era, evs: [] }); last.evs.push(e); }
  return g;
}
function eraSpan(evs) { const a = evs[0].year, b = evs[evs.length - 1].year; return a == null ? '' : a === b ? whenLabel(a) : `${whenLabel(a)} – ${whenLabel(b)}`; }
function buildStrip() {
  const st = $('#strip');
  const groups = eraGroups();
  st.innerHTML = `<div class="strip-side"><h2>Nine thousand years of wine</h2><p>${D.timeline.length} moments, ${groups.length} eras. Tap one to travel there.</p>
    <div class="tl-controls"><button type="button" class="btn solid" id="tl-play" aria-pressed="false">Play the tour</button>
    <button type="button" class="icon-btn" id="tl-x" aria-label="Close timeline"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></div>
    <div class="ribbon" id="ribbon" aria-hidden="true"></div>
    <div class="strip-scroll" id="strip-scroll">${groups.map(gr => `<section class="s-era" aria-label="${esc(gr.name)}"><div class="s-era-h">${esc(gr.name)}<span class="mono">${esc(eraSpan(gr.evs))}</span></div><div class="s-evs">${gr.evs.map(e => `<button type="button" class="s-ev" data-ev="${esc(e.id)}"><span class="yr">${esc(e.when)}</span><span class="ttl">${esc(e.title)}</span><span class="plc">${esc(e.place)}</span><i class="prog"></i></button>`).join('')}</div></section>`).join('')}</div>`;
  // the ribbon: every event as a tick on a compressed log-like time axis
  const rb = $('#ribbon');
  const tmap = y => { const now = 2026; const age = Math.max(1, now - (y ?? now)); return 1 - Math.log(age) / Math.log(9500); };
  rb.innerHTML = D.timeline.map(e => `<i class="tick" data-tk="${esc(e.id)}" title="${esc(e.when)}: ${esc(e.title)}" style="left:${(tmap(e.year) * 100).toFixed(2)}%"></i>`).join('') +
    (() => { let last = -1; return [-6000, -3000, -1000, 0, 1000, 1500, 1800, 1900, 1976, 2026].map(y => { const x = tmap(y === 0 ? 1 : y); if (x - last < 0.075) return ''; last = x; return `<span class="lab" style="left:${(x * 100).toFixed(2)}%">${y < 0 ? fmt(-y) + ' BC' : y === 0 ? 'AD 1' : y}</span>`; }).join(''); })();
  st.querySelectorAll('.s-ev').forEach(b => b.addEventListener('click', () => { stopTour(); APP.nav(b.dataset.ev); }));
  // tap anywhere on the ribbon to jump to the nearest moment
  rb.setAttribute('aria-hidden', 'true');
  rb.addEventListener('click', ev => {
    const r = rb.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width;
    let best = null, bd = 9;
    for (const e of D.timeline) { const d = Math.abs(tmap(e.year) - x); if (d < bd) { bd = d; best = e; } }
    if (best) { stopTour(); APP.nav(best.id); }
  });
  $('#tl-play').addEventListener('click', () => (TOUR.on ? stopTour() : startTour()));
  $('#tl-x').addEventListener('click', () => { stopTour(); closeSheet(); });
  const sc = $('#strip-scroll');
  sc.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { sc.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
}
function timelineIntro() {
  const groups = eraGroups();
  let out = `<div class="head"><p class="eyebrow">Timeline</p><h2 class="title">Nine thousand years of wine</h2><p class="tagline">From jars of resinated wine in the Caucasus to this year's new appellations.</p></div>`;
  if (!D.timeline.length) return out + H.pending('timeline');
  out += `<div class="tl-controls"><button type="button" class="btn solid" data-tour="1">${TOUR.on ? 'Pause the tour' : 'Play the tour'}</button></div>`;
  out += `<ol class="tl-list">${groups.map(gr => `<li class="tl-era"><span>${esc(gr.name)}</span><span class="mono">${esc(eraSpan(gr.evs))}</span></li>${gr.evs.map(e => `<li class="tl-ev" data-tl="${esc(e.id)}"><button type="button" data-ev="${esc(e.id)}"><span class="yr">${esc(e.when)}</span><span class="ttl">${esc(e.title)}</span></button></li>`).join('')}`).join('')}</ol>`;
  return out;
}
async function showView(v, opts = {}) {
  if (v === 'timeline') return showTimeline(opts);
  setView(v);
  let html = '';
  if (v === 'grapes') html = await showGrapes(opts);
  else if (v === 'lexicon') { await APP.loadReference(); await APP.loadGlobals(); html = lexiconHTML(opts.tab || (opts.term && /^term-/.test(opts.term) ? 'glossary' : store.get('lextab', 'soils'))); }
  else if (v === 'layers') html = layersHTML();
  else if (v === 'about') { await APP.loadGlobals(); html = aboutHTML(); }
  openSheet(isPhone() ? (v === 'layers' ? 'half' : 'full') : null, v === 'layers');
  renderSheet(html, { grapes: 'Grapes', lexicon: 'Lexicon', layers: 'Layers and colour', about: 'About' }[v]);
  bindView(v);
  if (v === 'about') runSections('about', 'about');
  if (opts.term) {
    const el = document.getElementById(opts.term);
    if (el) { el.classList.add('flash'); el.scrollIntoView({ block: 'start' }); setTimeout(() => el.classList.remove('flash'), 2400); }
  }
}
async function showTimeline(opts) {
  await APP.loadReference();
  setView('timeline');
  if (!isPhone() && D.timeline.length) {
    if (!$('#strip').childElementCount) buildStrip();
    $('#strip').hidden = false; $('#app').dataset.strip = 'on';
    // the strip is the whole view on a desktop; the sheet only opens to tell a story
    hideSheetOnly();
    for (const b of $$('.s-ev')) b.setAttribute('aria-current', 'false');
    for (const t of $$('.ribbon .tick')) t.classList.remove('on');
  } else {
    openSheet(isPhone() ? 'half' : null);
    renderSheet(timelineIntro(), 'Timeline');
    bindView('timeline');
  }
  if (map && !opts.back && !opts.tour) {
    const c = map.getCenter();
    move({ center: [Math.max(-20, Math.min(60, c.lng)), 38], zoom: isPhone() ? 1.6 : 2.2 }, { speed: 0.9 });
  }
}
function hideSheetOnly() {
  $('#sheet').hidden = true;
  $('#app').dataset.sheet = 'closed';
  $('#app').dataset.snap = 'closed';
  SHEET.snap = 'closed';
  sidePad(false);
  APP.hist = [];
}
async function showEvent(id, opts) {
  await APP.loadReference();
  const e = D.eventById.get(id);
  if (!e) { APP.toast('That moment is not in the timeline yet.'); return showTimeline(opts); }
  setView('timeline');
  if (!isPhone()) {
    if (!$('#strip').childElementCount) buildStrip();
    $('#strip').hidden = false; $('#app').dataset.strip = 'on';
  }
  const prev = D.timeline[e.i - 1], next = D.timeline[e.i + 1];
  let out = `<div class="head ev-story"><p class="eyebrow">${esc(e.era)}</p><p class="when-big" style="margin:6px 0 0">${esc(e.when)}</p><h2 class="title">${esc(e.title)}</h2>${e.place ? `<p class="alt">${esc(e.place)}</p>` : ''}</div>`;
  out += `<div class="tl-controls"><button type="button" class="btn" data-ev="${esc(prev?.id || '')}" ${prev ? '' : 'disabled'} aria-label="Previous moment">‹ Earlier</button><button type="button" class="btn solid" data-tour="1">${TOUR.on ? 'Pause' : 'Play the tour'}</button><button type="button" class="btn" data-ev="${esc(next?.id || '')}" ${next ? '' : 'disabled'} aria-label="Next moment">Later ›</button></div>`;
  out += slotHTML('hero');
  out += e.text ? H.prose(e.text, true) : '';
  if (e.lat != null) out += H.latline(e.lon, e.lat);
  out += slotHTML('mid');
  const tagsH = e.tags.map(t => `<span class="chip static tag">${esc(t.replace(/-/g, ' '))}</span>`).join('');
  const cty = e.country && D.countries[e.country] ? `<a class="chip" href="#${esc(e.country)}">${esc(countryName(e.country))}</a>` : '';
  if (tagsH || cty) out += `<div class="chips">${cty}${tagsH}</div>`;
  const links = arr(e.links || e.ids || e.related).filter(x => typeof x === 'string');
  if (links.length) out += `<ul class="chips">${links.map(l => `<li><a class="chip" href="#${esc(l)}">${esc(D.byId.get(l)?.name || D.regionById.get(l)?.name || l)}</a></li>`).join('')}</ul>`;
  if (arr(e.sources).length) out += H.sec('Sources') + H.src(e.sources);
  out += `<p class="note" style="margin-top:28px"><a href="#timeline">All ${D.timeline.length} moments</a></p>`;
  out += slotHTML('end');
  openSheet(isPhone() ? (opts.tour ? 'peek' : 'half') : null);
  renderSheet(out, 'Timeline');
  bindView('timeline');
  runSections('event', id);
  // mark current in the strip
  for (const b of $$('.s-ev')) { const on = b.dataset.ev === id; b.setAttribute('aria-current', on ? 'true' : 'false'); if (on) { const sc = $('#strip-scroll'); const r = b.getBoundingClientRect(), rs = sc.getBoundingClientRect(); if (r.left < rs.left || r.right > rs.right) sc.scrollLeft += r.left - rs.left - rs.width / 2 + r.width / 2; } }
  for (const t of $$('.ribbon .tick')) t.classList.toggle('on', t.dataset.tk === id);
  if (map && e.lat != null) {
    pulseAt(e.lon, e.lat);
    // story zoom: close enough to see the place in its landscape, capped so the camera never ends in an empty field
    const z = clamp((e.zoom || 6) - 1.2, 3.2, 8.6);
    flyPoint(e.lon, e.lat, z, { speed: 0.7, curve: 1.7, maxDuration: 5600 });
  }
}
function startTour() {
  if (!D.timeline.length) return;
  TOUR.on = true;
  const cur = D.eventById.get(location.hash.slice(1));
  TOUR.i = cur ? cur.i : 0;
  syncTourButtons();
  const step = () => {
    if (!TOUR.on) return;
    const e = D.timeline[TOUR.i];
    if (!e) { stopTour(); return; }
    APP.nav(e.id, { tour: true });
    const dwell = MQ.rm.matches ? 6000 : 7400;
    const prog = $(`.s-ev[data-ev="${CSS.escape(e.id)}"] .prog`);
    if (prog && !MQ.rm.matches) { prog.style.transition = 'none'; prog.style.width = '0'; requestAnimationFrame(() => { prog.style.transition = `width ${dwell}ms linear`; prog.style.width = '100%'; }); }
    TOUR.t = setTimeout(() => { TOUR.i++; step(); }, dwell);
  };
  step();
}
function stopTour() {
  if (!TOUR.on) return;
  TOUR.on = false;
  clearTimeout(TOUR.t);
  for (const p of $$('.s-ev .prog')) { p.style.transition = 'none'; p.style.width = '0'; }
  syncTourButtons();
}
function syncTourButtons() {
  const b = $('#tl-play');
  if (b) { b.textContent = TOUR.on ? 'Pause' : 'Play the tour'; b.setAttribute('aria-pressed', String(TOUR.on)); }
  for (const x of $$('[data-tour]')) x.textContent = TOUR.on ? 'Pause' : 'Play the tour';
}

/* ---------- lexicon: soils, glossary, systems ---------- */
function lexiconHTML(tab) {
  const tabs = [['soils', 'Soils', D.soils.length], ['glossary', 'Glossary', D.glossary.length], ['systems', 'Systems', D.systems.length]];
  let out = `<div class="head"><p class="eyebrow">Reference</p><h2 class="title">Lexicon</h2></div>
    <div class="seg" role="tablist" aria-label="Lexicon sections" style="grid-template-columns:repeat(3,1fr)">${tabs.map(([k, l, nn]) => `<label role="tab" aria-selected="${k === tab}"><input type="radio" name="lex" value="${k}" ${k === tab ? 'checked' : ''}>${l}${nn ? ` <span class="mono" style="font-size:11px;opacity:.75">${nn}</span>` : ''}</label>`).join('')}</div><div id="lexbody">`;
  out += lexBody(tab) + '</div>';
  return out;
}
function lexBody(tab) {
  if (tab === 'soils') {
    if (!D.soils.length) return H.pending('soil guide');
    return `<p class="note" style="margin-top:14px">${D.soils.length} soils and rocks that shape famous wines. Tap a place to see it on the globe.</p>` + D.soils.map(s => `<article class="term soil" id="soil-${esc(slug(s.id || s.name))}"><h3>${esc(s.name)}</h3><div class="prose">${prose(s.text)}</div>${s.wine ? `<p><b style="font-weight:500">In the wine:</b> ${inl(s.wine)}</p>` : ''}${s.examples.length ? `<ul class="ex">${s.examples.map(x => {
      const lab = `${esc(x.name)}${x.country && x.country.length === 2 ? `<span class="ex-c">${esc(countryName(x.country))}</span>` : ''}`;
      const btn = x.app ? `<a class="ex-p" href="#${esc(x.app)}">${lab}</a>` : x.lat != null ? `<button type="button" class="ex-p" data-goto="${x.lon},${x.lat}">${lab}</button>` : `<span class="ex-p">${lab}</span>`;
      return `<li>${btn}${x.note ? `<span class="ex-n">${inl(x.note)}</span>` : ''}</li>`;
    }).join('')}</ul>` : ''}${s.sources.length ? `<p class="src">${s.sources.map(x => typeof x === 'string' ? esc(x) : x.url && /^https?:/.test(x.url) ? `<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title || x.url)}</a>` : esc(x.title || '')).join(' · ')}</p>` : ''}</article>`).join('');
  }
  if (tab === 'glossary') {
    if (!D.glossary.length) return H.pending('glossary');
    let last = '', out = `<label class="sr" for="lq">Filter terms</label><input id="lq" class="filter" type="search" placeholder="Filter ${D.glossary.length} terms" autocomplete="off" style="margin-top:12px">`;
    const known = new Set(D.glossary.map(x => fold(x.term)));
    for (const t of D.glossary) {
      const c0 = fold(t.term).charAt(0).toUpperCase();
      const L = /[0-9]/.test(c0) ? '#' : c0;
      if (L !== last) { out += `<p class="letter" data-l="${esc(L)}">${esc(L)}</p>`; last = L; }
      const exH = t.ex ? (t.ex.app ? `<a class="chip" href="#${esc(t.ex.app)}">${esc(t.ex.name)}</a>` : t.ex.lat != null ? `<button type="button" class="chip" data-goto="${t.ex.lon},${t.ex.lat}">${esc(t.ex.name)}</button>` : '') : '';
      out += `<article class="term" id="term-${esc(slug(t.term))}" data-f="${esc(fold(t.term + ' ' + t.def))}"><h3>${esc(t.term)}${t.lang ? `<small>${esc(t.lang)}</small>` : ''}</h3>${prose(t.def)}${t.see.length || exH ? `<p class="note see">${exH ? `${exH} ` : ''}${t.see.length ? `<span>See ${t.see.map(x => known.has(fold(x)) ? `<a href="#term-${esc(slug(x))}">${esc(x)}</a>` : esc(x)).join(', ')}</span>` : ''}</p>` : ''}</article>`;
    }
    return out;
  }
  if (!D.systems.length) return H.pending('comparison of quality systems');
  return `<p class="note" style="margin-top:14px">How ${D.systems.length} wine laws rank their wines, from the strictest tier down.</p>` + D.systems.map(s => {
    const cty = s.iso2 && D.countries[s.iso2] ? `<a href="#${esc(s.iso2)}">${esc(s.country || countryName(s.iso2))}</a>` : esc(s.country);
    const more = [['How labels work', s.rules], ['History', s.history], ['Quirks', s.quirks]].filter(x => x[1]);
    return `<article class="sys term"><p class="eyebrow" style="margin:0">${cty}</p><h3>${esc(s.name)}</h3>${s.text ? prose(s.text) : ''}${s.tiers.length ? `<ol class="ladder">${s.tiers.map(t => `<li><b>${esc(t.name)}</b>${t.note ? `<span>${inl(t.note)}</span>` : ''}</li>`).join('')}</ol>` : ''}${more.length ? `<details class="sys-more"><summary>${more.map(x => x[0]).join(', ')}</summary>${more.map(([k, v]) => `<h4>${esc(k)}</h4><div class="prose">${prose(v)}</div>`).join('')}${s.sources.length ? `<p class="src">${s.sources.map(x => typeof x === 'string' ? esc(x) : x.url && /^https?:/.test(x.url) ? `<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title || x.url)}</a>` : esc(x.title || '')).join(' · ')}</p>` : ''}</details>` : ''}</article>`;
  }).join('');
}

/* ---------- layers ---------- */
const LAYER_UI = [['apps', 'Appellations'], ['regions', 'Region outlines'], ['sites', 'Sites and estates'], ['rivers', 'Rivers'], ['lakes', 'Lakes'], ['towns', 'Towns'], ['labels', 'Labels'], ['belt', 'Wine belts, 30° to 50°'], ['grat', 'Graticule']];
const MODES = [['style', 'Wine style'], ['climate', 'Climate'], ['elevation', 'Elevation'], ['country', 'Country']];
function layersHTML() {
  return `<div class="head"><p class="eyebrow">The map</p><h2 class="title">Layers and colour</h2></div>
    ${typeof bmLayersSection === 'function' ? bmLayersSection() : ''}
    ${H.sec('Colour appellations by')}<div class="seg" role="radiogroup" aria-label="Colour appellations by">${MODES.map(([k, l]) => `<label><input type="radio" name="mode" value="${k}" ${S.mode === k ? 'checked' : ''}>${l}</label>`).join('')}</div>
    <p class="note" id="mode-note">${esc(modeNote())}</p>
    ${H.sec('Show')}<div class="toggles">${LAYER_UI.map(([k, l]) => `<label class="tog" for="ly-${k}"><span>${esc(l)}</span><input type="checkbox" id="ly-${k}" data-ly="${k}" ${S.layers[k] ? 'checked' : ''}></label>`).join('')}${VMX.layerToggles.map((t, i) => { let on = false; try { on = !!t.get(); } catch (e) { /* module */ } return `<label class="tog" for="vml-${esc(t.id)}"><span>${esc(t.label || t.id)}${t.note ? `<small>${esc(t.note)}</small>` : ''}</span><input type="checkbox" id="vml-${esc(t.id)}" data-vml="${i}" ${on ? 'checked' : ''}></label>`; }).join('')}</div>
    <p class="note" style="margin-top:18px">The belts mark the latitudes where most of the world's wine is made. Altitude, ocean currents and new cool-climate frontiers increasingly blur them.</p>
    <p class="note"><button type="button" class="btn" data-nav="about">About the data</button></p>`;
}
function modeNote() {
  return {
    style: 'Each appellation takes the colour of its dominant wine in the glass. Mixed means no single style dominates or the register does not say.',
    climate: 'Mean temperature over the growing season (April to October north, October to April south), from 13 °C blue to 24 °C red. Grey means no climate data yet.',
    elevation: 'Mean elevation of the mapped zone, from sea level to 2,000 m. Grey means no data yet.',
    country: 'One colour per country, useful where borders blur, such as the Rhine, the Danube or the Douro.'
  }[S.mode];
}
function renderLegend() {
  const body = $('#legend-body');
  const t = { style: 'Colour of the wine', climate: 'Growing-season warmth', elevation: 'Elevation', country: 'Country' }[S.mode];
  $('#legend-title').textContent = t;
  if (S.mode === 'style') body.innerHTML = `<ul class="swatches">${STYLES.map(s => `<li><i class="sw" style="background:var(--w-${s})"></i>${esc(STYLE_LABEL[s])}</li>`).join('')}</ul>`;
  else if (S.mode === 'climate') body.innerHTML = `<div class="ramp" style="background:linear-gradient(90deg,var(--c0),var(--c1) 20%,var(--c2) 40%,var(--c3) 60%,var(--c4) 80%,var(--c5))"></div><div class="ramp-scale"><span>13 °C cool</span><span>17</span><span>21</span><span>24 °C hot</span></div>`;
  else if (S.mode === 'elevation') body.innerHTML = `<div class="ramp" style="background:linear-gradient(90deg,var(--e0),var(--e1) 12.5%,var(--e2) 30%,var(--e3) 55%,var(--e4))"></div><div class="ramp-scale"><span>0 m</span><span>600</span><span>1,100</span><span>2,000 m</span></div>`;
  else {
    const pal = countryPalette();
    let list = Object.keys(pal);
    if (map) { const b = map.getBounds(); const v = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]; const inView = list.filter(i => bboxHit(D.countries[i]?.bbox, v)); if (inView.length) list = inView; }
    body.innerHTML = `<ul class="swatches">${list.slice(0, 10).map(i => `<li><i class="sw" style="background:${esc(pal[i])}"></i>${esc(countryName(i))}</li>`).join('')}${list.length > 10 ? `<li>+${list.length - 10}</li>` : ''}</ul>`;
  }
}

/* ---------- about ---------- */
function aboutHTML() {
  const m = D.meta || {};
  const counts = m.counts || {};
  const idxN = D.index.length, cN = Object.keys(D.countries).length;
  let out = `<div class="head"><p class="eyebrow">About</p><h2 class="title">Vitis Mundi</h2><p class="tagline">A cartographer's cellar book: every wine country on one globe, with the real lines that wine law draws on the land.</p></div>`;
  out += H.prose(`Zoom anywhere and the appellations of every country in view appear together, so you can follow the Rhône from Côte-Rôtie to Châteauneuf-du-Pape and keep going over the Alps to Barolo. Tap a shape for its profile: the rules, the climate of the zone, the grapes it allows and the story of the place.\n\nThe colours come from the glass. Garnet is red wine, straw is white, salmon is rosé, amber is sweet, tawny is fortified. Switch to climate or elevation in *Layers* to see why the map looks the way it does.`);
  out += H.ledger([
    { k: 'Countries', v: fmt(counts.countries ?? cN) },
    { k: 'Appellations', v: fmt(counts.appellations ?? idxN) || '' },
    { k: 'Sites', v: fmt(counts.sites ?? D.sites.length) || '' },
    m.built && { k: 'Built', v: (() => { const d = new Date(m.built); return isNaN(d) ? String(m.built).slice(0, 10) : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); })() }
  ]);
  out += H.sec('How to read the boundaries') + `<dl class="dl" style="grid-template-columns:minmax(120px,auto) 1fr">${Object.values(BQ).map(([k, v]) => `<dt>${esc(k)}</dt><dd class="txt">${esc(v)}</dd>`).join('')}</dl>`;
  out += H.sec('How to read the climate') + H.prose('Climate figures are 1991 to 2020 normals from a gridded dataset with cells roughly 4 km across, averaged over each mapped zone. A small grand cru may sit inside a single cell, and a commune-based zone includes woods and valley floors as well as vineyards, so read the numbers as the climate of the neighbourhood. Elevation comes from a 1 km model and is likewise an average.');
  const srcs = arr(m.sources);
  out += H.sec('Sources and licences') + (srcs.length ? `<ul class="list">${srcs.map(s => `<li class="src" style="padding:8px 0">${s.url && /^https?:/.test(s.url) ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.key)}</a>` : esc(s.title || s.key)}${s.licence ? `<br><span class="mono" style="font-size:12px">${esc(s.licence)}</span>` : ''}</li>`).join('')}</ul>` : `<ul class="list">${Object.values(SRC).map(s => `<li class="src" style="padding:8px 0">${esc(s)}</li>`).join('')}<li class="src" style="padding:8px 0">TerraClimate 1991–2020 normals; WorldClim 2.1 elevation; OpenStreetMap contributors (ODbL) for selected rivers and towns.</li></ul>`);
  if (typeof aboutV2HTML === 'function') out += aboutV2HTML();
  out += slotHTML('end');
  out += `<p class="src" style="margin-top:18px">Type: IM Fell English, digitised by Igino Marini from the Fell types; Literata; IBM Plex Mono. Map engine: MapLibre GL JS.</p>`;
  return out;
}

/* ---------- binding ---------- */
function bindProfile() {
  const body = $('#sheet-body');
  body.querySelectorAll('[data-fly]').forEach(b => b.addEventListener('click', () => {
    const iso = b.dataset.iso, bb = JSON.parse(b.dataset.fly || 'null');
    if (isPhone()) setSnap('peek');
    if (bb) flyBbox(exploreBbox(iso) || bb, { maxZoom: 8.5, minZoom: Z_APP + 0.2 });
    if (iso) ensureCountryGeo(iso);
  }));
  body.querySelectorAll('[data-hist]').forEach(b => b.addEventListener('click', async () => {
    const iso = APP.cur.length === 2 ? APP.cur : null;
    const c = iso ? await getContent(iso) : null;
    const h = c?.country?.history?.[+b.dataset.hist];
    if (!h) return;
    if (isPhone()) setSnap('peek');
    pulseAt(+h.lon, +h.lat);
    flyPoint(+h.lon, +h.lat, 7);
  }));
  body.querySelectorAll('[data-own]').forEach(b => b.addEventListener('click', () => { APP._opts = { own: true }; APP.cur = ''; if (location.hash.slice(1) === b.dataset.own) route(); else location.hash = b.dataset.own; }));
  body.querySelectorAll('[data-pin]').forEach(b => b.addEventListener('click', () => {
    const [lon, lat] = b.dataset.pin.split(',').map(Number);
    if (isPhone()) setSnap('peek');
    flyPoint(lon, lat, 6.5);
  }));
  body.querySelectorAll('[data-spread]').forEach(b => b.addEventListener('click', () => { if (isPhone()) setSnap('peek'); spreadGrape(); }));
  body.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => { APP._opts = {}; }));
}
function bindView(v) {
  const body = $('#sheet-body');
  bindProfile();
  if (v === 'grapes') {
    const inp = $('#gq');
    const apply = () => {
      const f = fold(inp?.value || ''), c = body.querySelector('input[name="gcol"]:checked')?.value || '';
      for (const li of $$('#glist > li')) li.hidden = (!!f && !li.dataset.f.includes(f)) || (!!c && li.dataset.c !== c);
    };
    if (inp) inp.addEventListener('input', apply);
    body.querySelectorAll('input[name="gcol"]').forEach(r => r.addEventListener('change', apply));
    body.querySelectorAll('input[name="gsort"]').forEach(r => r.addEventListener('change', async () => {
      store.set('gsort', r.value); const keep = inp?.value || '';
      renderSheet(await showGrapes({}), 'Grapes'); bindView('grapes');
      const i2 = $('#gq'); if (i2 && keep) { i2.value = keep; i2.dispatchEvent(new Event('input')); }
    }));
  }
  if (v === 'lexicon') {
    body.querySelectorAll('input[name="lex"]').forEach(r => r.addEventListener('change', () => {
      store.set('lextab', r.value);
      for (const l of body.querySelectorAll('.seg label')) l.setAttribute('aria-selected', String(l.querySelector('input').checked));
      $('#lexbody').innerHTML = lexBody(r.value); bindLex();
    }));
    bindLex();
  }
  if (v === 'layers') {
    body.querySelectorAll('input[name="mode"]').forEach(r => r.addEventListener('change', () => { setMode(r.value); $('#mode-note').textContent = modeNote(); }));
    body.querySelectorAll('[data-ly]').forEach(c => c.addEventListener('change', () => { S.layers[c.dataset.ly] = c.checked; applyLayerVis(); }));
    const bms = body.querySelector('.bm-section'); if (bms && typeof bindBmControls === 'function') bindBmControls(bms);
    body.querySelectorAll('[data-vml]').forEach(c => c.addEventListener('change', () => { const t = VMX.layerToggles[+c.dataset.vml]; if (t) try { t.set(c.checked); } catch (e) { console.warn('[VM layers]', e); } }));
    body.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => APP.nav(b.dataset.nav)));
  }
  if (v === 'about' && typeof bindInstall === 'function') bindInstall(body);
  if (v === 'timeline') {
    body.querySelectorAll('[data-ev]').forEach(b => b.addEventListener('click', () => { if (!b.dataset.ev) return; stopTour(); APP.nav(b.dataset.ev); }));
    body.querySelectorAll('[data-tour]').forEach(b => b.addEventListener('click', () => (TOUR.on ? stopTour() : startTour())));
    const cur = location.hash.slice(1);
    const li = body.querySelector(`.tl-ev[data-tl="${CSS.escape(cur)}"]`);
    if (li) li.setAttribute('aria-current', 'true');
  }
}
function bindLex() {
  const body = $('#sheet-body');
  if (typeof soilPhotos === 'function') soilPhotos($('#lexbody'));
  body.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => {
    const [lon, lat] = b.dataset.goto.split(',').map(Number);
    if (isPhone()) setSnap('peek');
    pulseAt(lon, lat); flyPoint(lon, lat, 9);
  }));
  const lq = $('#lq');
  if (lq) lq.addEventListener('input', () => {
    const f = fold(lq.value);
    for (const t of $$('#lexbody .term')) t.hidden = !!f && !t.dataset.f.includes(f);
    for (const l of $$('#lexbody .letter')) { let n = l.nextElementSibling, any = false; while (n && !n.classList.contains('letter')) { if (!n.hidden) any = true; n = n.nextElementSibling; } l.hidden = !any; }
  });
}

/* ---------- search UI ---------- */
let SR = { list: [], sel: -1 };
const TYPE_LABEL = { country: 'Country', app: 'Appellation', region: 'Region', site: 'Site', grape: 'Grape', term: 'Glossary', soil: 'Soil' };
function hideResults() { $('#results').hidden = true; $('#q').setAttribute('aria-expanded', 'false'); SR.sel = -1; }
function hl(name, q) {
  const f = fold(q); if (!f) return esc(name);
  // map folded index back to original characters
  const chars = [...name]; let acc = '', map2 = [];
  chars.forEach((ch, i) => { const fc = fold(ch) || (ch === ' ' ? ' ' : ''); for (const _ of fc) map2.push(i); acc += fc; });
  const at = acc.indexOf(f);
  if (at < 0) return esc(name);
  const a = map2[at], b = map2[Math.min(map2.length - 1, at + f.length - 1)];
  return esc(chars.slice(0, a).join('')) + '<mark>' + esc(chars.slice(a, b + 1).join('')) + '</mark>' + esc(chars.slice(b + 1).join(''));
}
function renderResults() {
  const q = $('#q').value;
  const ul = $('#results');
  $('#q-clear').hidden = !q;
  if (!fold(q)) { hideResults(); return; }
  SR.list = SR.pick && SR.pick.types ? search(q, 300).filter(r => SR.pick.types.has(r.t)).slice(0, 24) : search(q, 24);
  SR.sel = SR.list.length ? 0 : -1;
  ul.innerHTML = SR.list.length ? SR.list.map((r, i) => `<li role="option" id="opt-${i}" aria-selected="${i === SR.sel}" data-i="${i}"><span class="r-name">${hl(r.name, q)}</span><span class="r-meta">${esc(TYPE_LABEL[r.t])}${r.meta ? ' · ' + esc(r.meta.replace(/^(Grape|Glossary|Country) ?·? ?/, '')) : ''}</span></li>`).join('')
    : `<li class="r-empty" aria-disabled="true">${D.indexLoaded || SEARCH.items.length ? 'Nothing found. Try a shorter spelling.' : 'The index is still loading.'}</li>`;
  ul.hidden = false;
  $('#q').setAttribute('aria-expanded', 'true');
  $('#q').setAttribute('aria-activedescendant', SR.sel >= 0 ? 'opt-0' : '');
}
function pickResult(i) {
  const r = SR.list[i];
  if (!r) return;
  hideResults();
  $('#q').blur();
  if (SR.pick) { $('#q').value = ''; $('#q-clear').hidden = true; endPick({ id: r.id, name: r.name, type: TYPE_ALIAS[r.t] || r.t, meta: r.meta || '' }); return; }
  APP._opts = {};
  APP.nav(r.id);
}
function bindSearch() {
  const q = $('#q');
  let t = 0;
  q.addEventListener('focus', () => { wave2(); APP.loadIndex(); APP.loadGlobals(); APP.loadReference(); if (q.value) renderResults(); });
  q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(renderResults, 50); });
  q.addEventListener('keydown', e => {
    const ul = $('#results');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (ul.hidden) { renderResults(); return; }
      e.preventDefault();
      const n = SR.list.length; if (!n) return;
      SR.sel = (SR.sel + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
      ul.querySelectorAll('li').forEach((li, i) => li.setAttribute('aria-selected', String(i === SR.sel)));
      const li = ul.querySelector(`#opt-${SR.sel}`); if (li) li.scrollIntoView({ block: 'nearest' });
      q.setAttribute('aria-activedescendant', 'opt-' + SR.sel);
    } else if (e.key === 'Enter') { e.preventDefault(); if (SR.sel >= 0) pickResult(SR.sel); }
    else if (e.key === 'Escape') { if (!ul.hidden) hideResults(); else if (SR.pick) endPick(null); else { q.value = ''; $('#q-clear').hidden = true; } }
  });
  $('#results').addEventListener('pointerdown', e => { const li = e.target.closest('li[data-i]'); if (li) { e.preventDefault(); pickResult(+li.dataset.i); } });
  $('#q-clear').addEventListener('click', () => { q.value = ''; hideResults(); $('#q-clear').hidden = true; q.focus(); });
  $('#pick-x').addEventListener('click', () => endPick(null));
  document.addEventListener('pointerdown', e => { if (!e.target.closest('.search')) hideResults(); });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== q && !/input|textarea/i.test(document.activeElement?.tagName)) { e.preventDefault(); q.focus(); }
    if (e.key === 'Escape' && document.activeElement !== q && !$('#sheet').hidden) closeSheet();
  });
}

/* ---------- boot ---------- */
function bindChrome() {
  $$('.views button:not([data-vm])').forEach(b => b.addEventListener('click', () => {
    if (APP.view === b.dataset.view && !$('#sheet').hidden && location.hash.slice(1) === b.dataset.view) { closeSheet(); return; }
    APP._opts = {}; APP.nav(b.dataset.view);
  }));
  $('#brand').addEventListener('click', () => APP.nav('about'));
  $('#zin').addEventListener('click', () => { stopSpin(); map?.zoomIn({ duration: MQ.rm.matches ? 0 : 300 }); });
  $('#zout').addEventListener('click', () => { stopSpin(); map?.zoomOut({ duration: MQ.rm.matches ? 0 : 300 }); });
  // face north; in 3D terrain keep the tilt (the tilt button levels it)
  $('#compass').addEventListener('click', () => map?.easeTo({ bearing: 0, ...(S.keepCam ? {} : { pitch: 0 }), duration: MQ.rm.matches ? 0 : 400 }));
  $('#home').addEventListener('click', () => { if (!map) return; stopSpin(); move({ center: [map.getCenter().lng, 30], zoom: isPhone() ? 1.2 : 2.05 }); });
  const lt = $('#legend-toggle');
  const setLeg = c => { $('#legend').dataset.collapsed = String(c); lt.textContent = c ? 'Show key' : 'Hide key'; lt.setAttribute('aria-expanded', String(!c)); store.set('legend', c); };
  setLeg(store.get('legend', isPhone()));
  lt.addEventListener('click', () => setLeg($('#legend').dataset.collapsed !== 'true'));
  APP.on('mode', renderLegend);
  APP.on('countries', renderLegend);
  addEventListener('hashchange', route);
  bindSheetDrag();
  bindSearch();
  // theme: host attribute or OS preference
  const onTheme = () => { requestAnimationFrame(() => { repaintAll(); renderLegend(); vmEmit('theme', { dark: TOK.dark, tokens: { ...TOK } }); }); };
  MQ.dark.addEventListener('change', onTheme);
  new MutationObserver(onTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
  // contextual hint
  let lastBand = '';
  const hint = () => {
    if (!map) return;
    const z = map.getZoom();
    const band = z < Z_APP - 0.3 ? 'globe' : z < 7.8 ? 'mid' : 'deep';
    if (band === lastBand) return; lastBand = band;
    $('#hint').textContent = band === 'globe' ? 'Tap a country to read its story. Zoom in and every appellation appears, across borders.'
      : band === 'mid' ? 'Tap a shape for its profile. Smaller appellations sit on top of the larger ones that contain them.'
      : 'Tap the smallest shape under your finger. Diamonds mark grands crus; squares are named vineyards.';
    if (S.mode === 'country') renderLegend();
  };
  APP.on('mapmove', hint);
  return hint;
}
function boot() {
  try { history.scrollRestoration = 'manual'; } catch (e) { /* older browsers */ }
  readTokens();
  const hint = bindChrome();
  renderLegend();
  try {
    initMap();
    map.on('moveend', () => APP.emit('mapmove'));
    map.on('zoom', hint);
  } catch (e) {
    console.warn('[boot] map unavailable:', e.message);
    $('#nomap').hidden = false;
    $('#ctl').hidden = true;
    APP.loadIndex(); APP.loadGlobals();
    getJSON('data/geo/_countries.json').then(j => { if (j) { for (const [k, v] of Object.entries(j)) D.countries[k] = v; D.countriesLoaded = true; rebuildSearch(); } });
  }
  if (location.hash.length > 1) {
    const go = () => { APP._opts = {}; route(); };
    const h0 = decodeURIComponent(location.hash.slice(1));
    // module views (journal, photo review...) route at once; places wait for the country list, so a deep link
    // can fly to the right place
    if (typeof viewFor === 'function' && viewFor(h0)) go();
    else if (map) { let done = false; const once = () => { if (!done) { done = true; setTimeout(go, 30); } }; APP.on('countries', once); setTimeout(once, 8000); } else go();
  }
  // second wave of reference data once the globe is up
  // grapes and the glossary are fetched when first needed (search, a profile, the grape view), or when idle
  setTimeout(() => (window.requestIdleCallback || (f => f()))(() => APP.loadGlobals(), { timeout: 4000 }), 9000);
}
/* boot() is called from boot.js, after vm.js and the modules have registered */
