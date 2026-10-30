/* Vitis Mundi v2: the public front-end API (window.VM) that modules in frontend/src/modules/ build on.
   Documented in frontend/API.md. Keep this surface stable: add, do not rename. */
const VMX = {
  layerTaps: [],           /* VM.map.onLayerTap registrations */
  layerToggles: [],        /* VM.layers.add toggles shown in the Layers view */
  tap: null,               /* VM.map.captureTap handler */
  labelsSaved: null,       /* VM.map.labels(false) saved state */
  views: new Map(),        /* custom panel views: id -> {id, title, crumb, render, snap, onClose} */
  sections: [],            /* profile sections: {id, types:Set, fn, slot, order} */
  navItems: [],            /* extra nav entries */
  sticky: new Map(),       /* sticky events that replay to late subscribers */
  ev: {},
  hlOwner: null,           /* who owns the current map highlight: 'grape' or a module id */
  cur: null                /* current profile entity, or {type:'view', id} */
};
const STICKY = new Set(['map:ready', 'data:index', 'data:globals', 'data:countries', 'data:sites', 'data:regions', 'auth', 'basemap', 'terrain']);
function vmOn(name, fn) {
  (VMX.ev[name] = VMX.ev[name] || []).push(fn);
  if (STICKY.has(name) && VMX.sticky.has(name)) { try { fn(VMX.sticky.get(name)); } catch (e) { console.warn('[VM]', name, e); } }
  return () => vmOff(name, fn);
}
function vmOff(name, fn) { const l = VMX.ev[name]; if (l) { const i = l.indexOf(fn); if (i >= 0) l.splice(i, 1); } }
function vmEmit(name, x) {
  if (STICKY.has(name)) VMX.sticky.set(name, x);
  for (const f of [...(VMX.ev[name] || [])]) { try { f(x); } catch (e) { console.warn('[VM]', name, e); } }
}
/* bridge the v1 internal events */
APP.on('countries', () => vmEmit('data:countries', D.countries));
APP.on('index', () => vmEmit('data:index', D.index));
APP.on('globals', () => vmEmit('data:globals', D.grapes));
APP.on('geo', iso => vmEmit('data:geo', iso));

/* ---------- helpers attached to the map instance (VM.map.captureTap, labels, pulse, clearPulse) ---------- */
const LABEL_LAYERS = () => ['lab-1', 'lab-2', 'lab-3', 'fine-lab', 'extra-lab', 'extra-flab', 'reg-lab', 'towns-0', 'towns-1', 'towns-2', 'clab', 'rivers-lab', 'rivers-lab-2', 'site-icon', 'contour-lab'];
/* while VM.map.labels(false) is in force, every label layer stays hidden, including layers added later
   (second data wave, fine units) and layers that the base map or the Layers view would switch back on */
function hideLabelLayer(id) {
  if (!map.getLayer(id)) return;
  const saved = VMX.labelsSaved;
  if (!(id in saved)) saved[id] = { vis: map.getLayoutProperty(id, 'visibility') || 'visible', tf: id === 'site-icon' ? map.getLayoutProperty(id, 'text-field') : undefined };
  if (id === 'site-icon') { const tf = map.getLayoutProperty(id, 'text-field'); if (tf !== '') map.setLayoutProperty(id, 'text-field', ''); }
  else if (map.getLayoutProperty(id, 'visibility') !== 'none') map.setLayoutProperty(id, 'visibility', 'none');
}
function enforceLabelsHidden() { if (VMX.labelsSaved && map) for (const id of LABEL_LAYERS()) hideLabelLayer(id); }
function mapCaptureTap(fn) {
  VMX.tap = fn;
  $('#app').dataset.capture = '1';
  return () => { if (VMX.tap === fn) { VMX.tap = null; delete $('#app').dataset.capture; } };
}
function mapLabels(on) {
  if (!map) return;
  if (!on) {
    if (VMX.labelsSaved) return;
    VMX.labelsSaved = {};
    enforceLabelsHidden();
  } else {
    const saved = VMX.labelsSaved; VMX.labelsSaved = null;
    if (!saved) return;
    for (const [id, st] of Object.entries(saved)) {
      if (!map.getLayer(id)) continue;
      if (id === 'site-icon') map.setLayoutProperty(id, 'text-field', st.tf);
      else map.setLayoutProperty(id, 'visibility', st.vis);
    }
  }
}
/* non-exclusive taps and hovers on a module's own layers (pins that stay on the map) */
function mapOnLayerTap(layerIds, fn, o = {}) {
  const reg = { layers: arr(layerIds), fn, hover: o.hover || null };
  VMX.layerTaps.push(reg);
  return () => { VMX.layerTaps = VMX.layerTaps.filter(x => x !== reg); };
}
function layerTapHit(point, touch, needHover) {
  if (!VMX.layerTaps.length || !map) return null;
  const r = touch ? 12 : 6, box = [[point.x - r, point.y - r], [point.x + r, point.y + r]];
  for (const reg of VMX.layerTaps) {
    if (needHover && !reg.hover) continue;
    const layers = reg.layers.filter(id => map.getLayer(id) && map.getLayoutProperty(id, 'visibility') !== 'none');
    if (!layers.length) continue;
    const fs = map.queryRenderedFeatures(box, { layers });
    if (fs.length) return { reg, feature: fs[0], features: fs };
  }
  return null;
}
vmOn('map:ready', m => {
  m.on('styledata', enforceLabelsHidden);
  Object.assign(m, {
    onLayerTap: mapOnLayerTap,
    captureTap: mapCaptureTap,
    labels: mapLabels,
    pulse(lon, lat) { pulseAt(lon, lat); },
    clearPulse() { if (MK.pulse) MK.pulse.remove(); }
  });
});

/* ---------- ids ---------- */
const TYPE_ALIAS = { app: 'appellation', appellation: 'appellation', country: 'country', region: 'region', site: 'site', grape: 'grape', event: 'event', soil: 'soil', term: 'term', fine: 'appellation' };
function typeOfId(id) {
  id = String(id || '');
  if (/^grape-/.test(id)) return 'grape';
  if (/^event-/.test(id)) return 'event';
  if (/^term-/.test(id)) return 'term';
  if (/^soil-/.test(id)) return 'soil';
  if (/^region-/.test(id)) return 'region';
  if (/^site-/.test(id)) return 'site';
  if (/^[a-z]{2}$/.test(id)) return 'country';
  if (/^[a-z]{2}-/.test(id)) return 'appellation';
  return null;
}
function isoOfId(id) {
  id = String(id || '');
  let m = id.match(/^(?:region|site)-([a-z]{2})-/);
  if (m) return m[1];
  m = id.match(/^([a-z]{2})(?:-|$)/);
  return m ? m[1] : null;
}
function hashFor(type, id) {
  if (id == null) { id = type; type = typeOfId(id); }
  type = TYPE_ALIAS[type] || type;
  id = String(id);
  if (type === 'grape') return id.startsWith('grape-') ? id : 'grape-' + id;
  if (type === 'event') return id.startsWith('event-') ? id : 'event-' + id;
  if (type === 'term') return id.startsWith('term-') ? id : 'term-' + slug(id);
  if (type === 'soil') return id.startsWith('soil-') ? id : 'soil-' + slug(id);
  return id;
}
/* resolve any id to a small plain object (what is known without loading geometry) */
function entityOf(id) {
  const type = typeOfId(id);
  if (!type) return null;
  const iso = isoOfId(id);
  if (type === 'country') {
    const m = D.countries[id] || {};
    return { type, id, name: countryName(id), country: id, bbox: m.bbox || null, lp: m.bbox ? [(m.bbox[0] + m.bbox[2]) / 2, (m.bbox[1] + m.bbox[3]) / 2] : null, meta: m };
  }
  if (type === 'appellation') {
    const a = appData(id);
    if (!a) return { type, id, name: id, country: iso, known: false };
    return { type, id, name: a.name, country: a.country || iso, lp: a.lp || null, bbox: a.bbox || null, area: a.area, cat: a.cat, subcat: a.subcat, style: a.style, parent: a.parent || null, fine: !!a.fine, pt: !!a.pt || (!a.bbox && D.extraById.has(id)), clim: a.clim || null, bq: a.bq, prof: a.prof, data: a };
  }
  if (type === 'region') {
    const r = D.regionById.get(id) || {};
    return { type, id, name: r.name || id, country: r.country || iso, lp: r.lp || null, bbox: r.bbox || null, data: r };
  }
  if (type === 'site') {
    const s = D.siteById.get(id) || {};
    return { type, id, name: s.name || id, country: s.country || iso, lp: s.lon != null ? [s.lon, s.lat] : null, bbox: null, kind: s.kind, app: s.app || null, data: s };
  }
  if (type === 'grape') {
    const gid = id.slice(6), g = D.grapeById.get(gid) || {};
    return { type, id, gid, name: g.name || gid, country: g.origin?.country || null, lp: g.origin?.lon != null ? [g.origin.lon, g.origin.lat] : null, apps: arr(D.varieties[gid]), data: g };
  }
  if (type === 'event') {
    const e = D.eventById.get(id) || {};
    return { type, id, name: e.title || id, country: e.country || null, lp: e.lon != null ? [e.lon, e.lat] : null, year: e.year, data: e };
  }
  return { type, id, name: id };
}

/* ---------- profile sections ---------- */
const SLOT_ORDER = ['hero', 'top', 'mid', 'end'];
const slotHTML = name => `<div class="vm-slot" data-slot="${name}"></div>`;
let _secRun = 0;
async function runSections(type, id, extra = {}) {
  const body = $('#sheet-body');
  const run = ++_secRun;
  const ent = { ...(entityOf(id) || { type, id }), type };
  for (const [k, v] of Object.entries(extra)) if (v != null) ent[k] = v;
  VMX.cur = ent;
  const list = VMX.sections.filter(s => s.types.has(type) || (s.types.has('*') && type !== 'about')).sort((a, b) => a.order - b.order);
  for (const s of list) {
    let slot = body.querySelector(`.vm-slot[data-slot="${s.slot}"]`) || body.querySelector('.vm-slot[data-slot="end"]');
    if (!slot) { slot = document.createElement('div'); slot.className = 'vm-slot'; slot.dataset.slot = 'end'; body.appendChild(slot); }
    const el = document.createElement('section');
    el.className = 'vm-sec';
    el.dataset.sec = s.id;
    slot.appendChild(el);
    Promise.resolve().then(() => s.fn(el, ent)).then(r => {
      if (run !== _secRun) return;
      if (r === false || (!el.childElementCount && !el.textContent.trim())) el.hidden = true;
    }).catch(e => { console.warn('[VM section]', s.id, e); el.hidden = true; });
  }
  if (type === 'about') vmEmit('about:render', { el: body });
  else vmEmit('profile:open', { type, id, entity: ent, el: body });
}

/* ---------- custom views ---------- */
function viewFor(h) {
  if (VMX.views.has(h)) return { def: VMX.views.get(h), arg: '' };
  for (const [k, def] of VMX.views) if (def.prefix && h.startsWith(k + '-')) return { def, arg: h.slice(k.length + 1) };
  return null;
}
async function showCustomView(cv, hash, opts) {
  const { def, arg } = cv;
  setView(def.id);
  openSheet(isPhone() ? (def.snap || 'full') : null, true);
  renderSheet('', def.crumb || def.title || '');
  const body = $('#sheet-body');
  body.dataset.view = def.id;
  VMX.cur = { type: 'view', id: def.id, arg };
  try { await def.render(body, { hash, arg, opts }); } catch (e) { console.warn('[VM view]', def.id, e); }
  bindProfile();
  vmEmit('view', { id: def.id, arg });
}

/* ---------- nav entries ---------- */
function addNav(item) {
  const it = { order: 100, ...item };
  if (!it.id || !/^[a-z][a-z0-9-]{2,}$/.test(it.id)) { console.warn('[VM] nav id must be 3+ chars, lower-case: ' + it.id); return () => {}; }
  VMX.navItems = VMX.navItems.filter(x => x.id !== it.id).concat(it).sort((a, b) => a.order - b.order);
  renderNav();
  return () => { VMX.navItems = VMX.navItems.filter(x => x !== it); renderNav(); };
}
function renderNav() {
  const nav = $('.views');
  if (!nav) return;
  for (const b of $$('button[data-vm]', nav)) b.remove();
  for (const it of VMX.navItems) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.vm = it.id;
    b.dataset.view = it.id;
    b.setAttribute('aria-pressed', String(APP.view === it.id));
    b.innerHTML = (it.icon ? `<span class="nav-ic" aria-hidden="true">${it.icon}</span>` : '') + `<span>${esc(it.label)}</span>`;
    if (it.title) b.title = it.title;
    b.addEventListener('click', e => {
      e.stopPropagation();
      if (it.onClick) { it.onClick(e); return; }
      if (APP.view === it.id && !$('#sheet').hidden) { closeSheet(); return; }
      APP._opts = {}; APP.nav(it.id);
    });
    nav.appendChild(b);
  }
  layoutNav();
}
/* the nav row scrolls sideways when it overflows; a soft fade marks the hidden side */
function layoutNav() {
  const nav = $('.views');
  if (!nav) return;
  const upd = () => { nav.dataset.ovl = nav.scrollLeft > 2 ? '1' : '0'; nav.dataset.ovr = nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 2 ? '1' : '0'; };
  if (!nav._vmb) { nav._vmb = 1; nav.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); }
  requestAnimationFrame(upd);
}

/* ---------- highlight ---------- */
function siteRings(ids) {
  if (!map) return;
  const fc = { type: 'FeatureCollection', features: ids.map(id => D.siteById.get(id)).filter(s => s && s.lon != null).map(s => ({ type: 'Feature', properties: { id: s.id }, geometry: { type: 'Point', coordinates: [s.lon, s.lat] } })) };
  if (!map.getSource('vmhl-sites')) {
    if (!fc.features.length) return;
    map.addSource('vmhl-sites', { type: 'geojson', data: fc });
    map.addLayer({ id: 'vmhl-sites', type: 'circle', source: 'vmhl-sites', paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 5, 12, 11], 'circle-color': 'rgba(0,0,0,0)', 'circle-stroke-color': TOK.highlight, 'circle-stroke-width': 2.2 } }, 'anchor-top');
  } else map.getSource('vmhl-sites').setData(fc);
}
function vmHighlight(ids, opts = {}) {
  ids = arr(ids).filter(Boolean);
  if (!map) return;
  const sites = ids.filter(id => typeOfId(id) === 'site');
  siteRings(sites);
  ids = ids.filter(id => typeOfId(id) !== 'site');
  VMX.hlOwner = opts.owner || 'module';
  S.dim = opts.dimOthers !== false;
  setGrapeHighlight(ids.length ? ids : null);
  if (map.getLayer('vmhl-sites')) map.setPaintProperty('vmhl-sites', 'circle-stroke-color', TOK.highlight);
  // make sure the polygons of every country involved are drawn
  const isos = [...new Set(ids.map(isoOfId).filter(Boolean))];
  if (opts.load !== false && isos.length <= 6) for (const iso of isos) ensureCountryGeo(iso);
  const pill = $('#pill');
  if (opts.label && ids.length + sites.length) {
    pill.innerHTML = `<span>${opts.labelHTML || `<b>${esc(opts.label)}</b>`} · <span class="mono">${ids.length + sites.length}</span></span><button type="button" id="pill-x" aria-label="Clear the highlight">Clear</button>`;
    pill.hidden = false;
    $('#pill-x').onclick = () => { vmClearHighlight(); if (opts.onClear) opts.onClear(); };
  }
  if (opts.fit) frameIds(ids.concat(sites), opts.fit === true ? {} : opts.fit);
}
function vmClearHighlight() {
  VMX.hlOwner = null;
  S.dim = true;
  setGrapeHighlight(null);
  siteRings([]);
  $('#pill').hidden = true;
}
function frameIds(ids, o = {}) {
  const pts = arr(ids).map(id => entityOf(id)).filter(e => e && (e.bbox || e.lp));
  if (!pts.length) return;
  if (pts.length === 1) { vmFlyTo(pts[0].id, o); return; }
  const lons = pts.map(e => e.lp ? e.lp[0] : (e.bbox[0] + e.bbox[2]) / 2).sort((a, b) => a - b);
  const lats = pts.map(e => e.lp ? e.lp[1] : (e.bbox[1] + e.bbox[3]) / 2).sort((a, b) => a - b);
  const q = (a, t) => a[Math.min(a.length - 1, Math.max(0, Math.round(t * (a.length - 1))))];
  const lo = pts.length > 12 ? 0.07 : 0, hi = pts.length > 12 ? 0.93 : 1;
  if (isPhone() && !$('#sheet').hidden) setSnap('peek');
  flyBbox([q(lons, lo) - 0.3, q(lats, lo) - 0.3, q(lons, hi) + 0.3, q(lats, hi) + 0.3], { maxZoom: o.maxZoom ?? 9 });
}
function vmFlyTo(target, o = {}) {
  if (!map || target == null) return;
  if (typeof target === 'object') {
    if (Array.isArray(target.bbox)) return flyBbox(target.bbox, o);
    const lon = target.lon ?? target.lng ?? target.center?.[0], lat = target.lat ?? target.center?.[1];
    return flyPoint(lon, lat, target.zoom, o);
  }
  const id = String(target);
  const t = typeOfId(id);
  if (t === 'country') { const bb = mainBbox(id) || D.countries[id]?.bbox; if (bb) flyBbox(bb, { maxZoom: 5.6, ...o }); return; }
  const e = entityOf(id);
  if (!e) return;
  if (e.bbox && e.bbox[2] - e.bbox[0] > 1e-4) return flyBbox(e.bbox, { maxZoom: e.area < 2 ? 14 : e.area < 30 ? 12.5 : 11, ...o });
  if (e.lp) return flyPoint(e.lp[0], e.lp[1], o.zoom ?? (t === 'site' ? 12.2 : t === 'grape' ? 5 : 8.4), o);
}

/* ---------- search picking ---------- */
const SEARCH_TYPES = { appellation: 'app', app: 'app', country: 'country', region: 'region', site: 'site', grape: 'grape', term: 'term', soil: 'soil' };
function vmQuery(q, opts = {}) {
  const types = opts.types ? new Set(arr(opts.types).map(t => SEARCH_TYPES[t] || t)) : null;
  const res = search(q, types ? 200 : (opts.limit || 24));
  return res.filter(r => !types || types.has(r.t)).slice(0, opts.limit || 24).map(r => ({ id: r.id, name: r.name, type: TYPE_ALIAS[r.t] || r.t, meta: r.meta || '' }));
}
function vmPick(opts = {}) {
  return new Promise(resolve => {
    const q = $('#q');
    SR.pick = { types: opts.types ? new Set(arr(opts.types).map(t => SEARCH_TYPES[t] || t)) : null, onPick: opts.onPick, resolve, label: opts.label || opts.placeholder || 'Pick a place' };
    $('.search').dataset.pick = '1';
    const bar = $('#pickbar');
    bar.querySelector('span').textContent = SR.pick.label;
    bar.hidden = false;
    q.placeholder = opts.placeholder || 'Search for a place to pick';
    q.value = '';
    APP.loadIndex(); APP.loadGlobals(); wave2();
    if (isPhone() && !$('#sheet').hidden) setSnap('peek');
    q.focus();
  });
}
function endPick(result) {
  const p = SR.pick;
  if (!p) return;
  SR.pick = null;
  delete $('.search').dataset.pick;
  $('#pickbar').hidden = true;
  $('#q').placeholder = 'Search appellations, grapes, places';
  if (result && p.onPick) { try { p.onPick(result); } catch (e) { console.warn('[VM pick]', e); } }
  p.resolve(result || null);
}

/* ---------- sidecar data (site/data/{topo,vintage,photos,regs,study}) ---------- */
const SIDE = {
  json(p) { return has(p) ? getJSON(p) : Promise.resolve(null); },
  /* parent chain used for fallbacks: fine unit -> parent appellations -> content region */
  async chain(id) {
    const out = [id];
    const t = typeOfId(id);
    if (t === 'site') {
      // sites arrive with the second data wave: wait briefly for them, else use the content file's record
      if (!D.siteById.has(id)) await Promise.race([VM.data.loadSites(), sleep(4000)]);
      let s = D.siteById.get(id);
      const c = await getContent(isoOfId(id));
      const cs = arr(c?.sites).find(x => x.id === id);
      const app = s?.app || cs?.app || cs?.app_main || null;
      if (app) out.push(...(await SIDE.chain(app)));
      if (cs?.app_main && cs.app_main !== app) out.push(...(await SIDE.chain(cs.app_main)));
      if (cs?.region_hint) out.push(cs.region_hint);
      return [...new Set(out)];
    }
    if (t !== 'appellation') return out;
    await Promise.race([APP.loadIndex(), sleep(3000)]);
    for (const a of ancestry(id).reverse()) out.push(a.id);
    const iso = isoOfId(id);
    const c = await (D.byId.get(id)?.fine ? getFineContent(iso) : getContent(iso));
    const chainIds = out.slice();
    for (const x of chainIds) {
      const p = c?.profiles?.[x];
      if (p?.subregion_id) out.push(p.subregion_id);
      if (p?.region_id) out.push(p.region_id);
    }
    for (const r of arr(c?.regions)) if (arr(r.app_ids).some(x => chainIds.includes(x))) out.push(r.id);
    return [...new Set(out)];
  },
  async topo(id) {
    const t = typeOfId(id), iso = isoOfId(id);
    if (t === 'site') { const j = await SIDE.json('data/topo/_sites.json'); return j?.[id] || null; }
    if (!iso) return null;
    const j = await SIDE.json(`data/topo/${iso}.json`);
    return j?.[id] || null;
  },
  async attrs() {
    const j = await SIDE.json('data/topo/_attrs.json');
    if (!j) return null;
    const cols = j._cols || ['country', 'gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt', 'elev', 'slope', 'aspect', 'area', 'fine'];
    return { cols, rows: j, get(id) { const r = j[id]; if (!r || id === '_cols') return null; const o = { id }; cols.forEach((c, i) => { o[c] = r[i]; }); return o; } };
  },
  /* first id in the parent chain that has data in {kind}/{iso}.json; returns {id, data, inherited} */
  async inherit(kind, id, pick) {
    const ids = await SIDE.chain(id);
    for (const x of ids) {
      const iso = isoOfId(x);
      if (!iso) continue;
      const j = await SIDE.json(`data/${kind}/${iso}.json`);
      const v = j?.[x];
      if (v && (!pick || pick(v))) return { id: x, data: v, inherited: x !== id };
    }
    return null;
  },
  vintage(id) { return SIDE.inherit('vintage', id, v => Array.isArray(v.gst) && v.gst.length); },
  /* vintage events for a place: its own, its ancestors' and its content regions', plus those of the region's
     flagship appellation (the member with the most researched events; the runner-up when the place is the flagship),
     because sources describe a whole zone (Barolo for Barbaresco, Porto for the Douro). Each event gets
     {from: id it was recorded on, rel: 'own' | 'parent' | 'region' | 'regional'}. */
  async events(id) {
    const all = await SIDE.json('data/vintage/_events.json');
    const list = Array.isArray(all) ? all : arr(all?.events);
    if (!list.length) return [];
    const by = new Map();
    for (const e of list) { if (!by.has(e.id)) by.set(e.id, []); by.get(e.id).push(e); }
    const chain = await SIDE.chain(id);
    const out = [], seen = new Set();
    const add = (x, rel) => {
      for (const e of by.get(x) || []) {
        const k = e.year + '|' + e.kind + '|' + String(e.text).slice(0, 60);
        if (seen.has(k)) continue;
        seen.add(k); out.push({ ...e, from: x, rel });
      }
    };
    for (const x of chain) add(x, x === id ? 'own' : /^region-/.test(x) ? 'region' : 'parent');
    const regions = chain.filter(x => /^region-/.test(x));
    if (typeOfId(id) === 'region' && !regions.includes(id)) regions.unshift(id);
    for (const r of regions) {
      const c = await getContent(isoOfId(r));
      const reg = arr(c?.regions).find(x => x.id === r);
      const members = [...new Set(arr(reg?.app_ids))].filter(m => by.has(m)).sort((a, b) => by.get(b).length - by.get(a).length);
      const flag = members.find(m => !chain.includes(m));
      if (flag) add(flag, 'regional');
    }
    return out.sort((a, b) => a.year - b.year);
  },
  async drift(id) {
    const j = await SIDE.json('data/vintage/_drift.json');
    if (!j) return null;
    const ids = await SIDE.chain(id);
    for (const x of ids) { const v = j[x] || j.items?.[x]; if (v) return { id: x, data: v, inherited: x !== id }; }
    return null;
  },
  async regs(id) {
    const r = await SIDE.inherit('regs', id);
    const iso = isoOfId(id);
    const j = iso ? await SIDE.json(`data/regs/${iso}.json`) : null;
    return r || j?._national ? { ...(r || {}), national: j?._national || null } : null;
  },
  async photos(id) {
    const t = typeOfId(id);
    if (t === 'grape' || t === 'event' || t === 'soil' || t === 'term') {
      // _global.json keys grapes, timeline events and soils without their route prefix ('albariza', not 'soil-albariza')
      const j = await SIDE.json('data/photos/_global.json');
      return arr(j?.[id] || j?.[id.replace(/^(grape|event|soil|term)-/, '')]);
    }
    const iso = isoOfId(id);
    if (!iso) return [];
    const j = await SIDE.json(`data/photos/${iso}.json`);
    return arr(j?.[id]);
  },
  study(name) { return SIDE.json(`data/study/${name.replace(/\.json$/, '')}.json`); }
};

/* ---------- the API ---------- */
const VM = {
  version: '2.0.0',
  get config() { return window.VM_CONFIG || {}; },
  get mode() { return (window.VM_CONFIG && window.VM_CONFIG.mode) || (window.__VM_BUILD && window.__VM_BUILD.mode) || 'artifact'; },
  get online() { return VM.mode === 'gh' && navigator.onLine !== false; },
  get map() { return map; },
  ready: null,
  data: {
    get index() { return D.index; },
    get indexById() { return D.byId; },
    get countries() { return D.countries; },
    get sites() { return D.sites; },
    get siteById() { return D.siteById; },
    get regions() { return D.regions; },
    get regionById() { return D.regionById; },
    get extra() { return D.extra; },
    get varieties() { return D.varieties; },
    get climrefs() { return D.climrefs; },
    get meta() { return D.meta; },
    grapes() { return APP.loadGlobals().then(() => D.grapes); },
    grapeById(id) { return D.grapeById.get(String(id).replace(/^grape-/, '')) || null; },
    grapeFor,
    timeline() { return APP.loadReference().then(() => D.timeline); },
    glossary() { return APP.loadGlobals().then(() => D.glossary); },
    soils() { return APP.loadReference().then(() => D.soils); },
    systems() { return APP.loadReference().then(() => D.systems); },
    loadIndex() { return APP.loadIndex(); },
    loadGlobals() { return APP.loadGlobals(); },
    content: getContent,
    json(path) { return has(path) ? getJSON(path) : Promise.resolve(null); },
    has,
    entity: entityOf,
    typeOf: typeOfId,
    isoOf: isoOfId,
    feature(id) { return D.feat.get(id) || null; },
    ensureGeo(iso, o = {}) { return ensureCountryGeo(iso, !!o.fine); },
    loadSites() { wave2(); return new Promise(res => vmOn('data:sites', res)); },
    loadRegions() { wave2(); return new Promise(res => vmOn('data:regions', res)); },
    fineContent: getFineContent,
    async geometry(id) {
      const iso = isoOfId(id);
      if (!iso || typeOfId(id) !== 'appellation') return null;
      const fine = !!D.byId.get(id)?.fine;
      const m = D.countries[iso];
      const file = fine ? m?.fine : m?.file;
      if (!file) return null;
      const fc = await getJSON('data/geo/' + file);
      return fc?.features?.find(f => f.properties?.id === id) || null;
    },
    ancestry(id) { return ancestry(id); },
    children(id) { return D.children.get(id) || []; },
    countryName,
    topo: SIDE.topo, attrs: SIDE.attrs, vintage: SIDE.vintage, events: SIDE.events, drift: SIDE.drift,
    regs: SIDE.regs, photos: SIDE.photos, study: SIDE.study, chain: SIDE.chain
  },
  open(type, id) { APP._opts = {}; APP.nav(hashFor(type, id)); },
  go(hash) { APP._opts = {}; APP.nav(hash); },
  back() { $('#back').click(); },
  flyTo: vmFlyTo,
  frame: frameIds,
  highlight: vmHighlight,
  clearHighlight: vmClearHighlight,
  panel: {
    get el() { return $('#sheet-body'); },
    get current() { return VMX.cur; },
    get isOpen() { return !$('#sheet').hidden; },
    register(viewId, opts) {
      if (!/^[a-z][a-z0-9]{2,}(-[a-z0-9]+)*$/.test(viewId) || /^[a-z]{2}-/.test(viewId) || /^(settings|sidebar|customize|upgrade|downloads|comment)/.test(viewId) || VIEWS.includes(viewId)) {
        console.warn('[VM] view id not allowed: ' + viewId); return;
      }
      VMX.views.set(viewId, { id: viewId, title: opts.title || viewId, crumb: opts.crumb || opts.title || '', render: opts.render, snap: opts.snap, prefix: opts.prefix !== false, onClose: opts.onClose });
    },
    show(viewId, opts) {
      if (opts && opts.render) VM.panel.register(viewId, opts);
      APP._opts = {}; APP.nav(viewId);
    },
    close() { closeSheet(); },
    refresh() { APP._opts = { back: true }; route(); },
    snap(name) { if (isPhone()) setSnap(name); },
    setCrumb(t) { $('#sheet-crumb').textContent = t || ''; },
    addSection(type, fn, opts = {}) {
      const s = { id: opts.id || ('sec' + VMX.sections.length), types: new Set(arr(type).map(t => TYPE_ALIAS[t] || t)), fn, slot: SLOT_ORDER.includes(opts.slot) ? opts.slot : 'end', order: opts.order ?? 100 };
      VMX.sections.push(s);
      return () => { VMX.sections = VMX.sections.filter(x => x !== s); };
    }
  },
  nav: { add: addNav },
  /* toggles for a module's own map layers, listed in the Layers view under "Show" */
  layers: {
    add(def) {
      if (!def || !def.id || typeof def.get !== 'function' || typeof def.set !== 'function') { console.warn('[VM] layers.add needs {id, label, get, set}'); return () => {}; }
      VMX.layerToggles = VMX.layerToggles.filter(x => x.id !== def.id).concat({ order: 100, ...def }).sort((a, b) => a.order - b.order);
      return () => { VMX.layerToggles = VMX.layerToggles.filter(x => x.id !== def.id); };
    },
    list() { return VMX.layerToggles.slice(); }
  },
  search: { pick: vmPick, query: vmQuery, cancel() { endPick(null); } },
  on: vmOn, off: vmOff, emit: vmEmit,
  toast(msg) { APP.toast(msg); },
  fmt: {
    num: fmt, area: fmtArea, ha: fmtHa, m: fmtM, ft: fmtFt, lat: fmtLat, lon: fmtLon,
    coords(lon, lat, d = 2) { return `${fmtLat(lat, d)} ${fmtLon(lon, d)}`; },
    temp(c, d = 1) { return c == null ? '' : `${(+c).toFixed(d)} °C`; },
    signed(v, d = 1, unit = '') { return v == null ? '' : `${v > 0 ? '+' : v < 0 ? '−' : '±'}${Math.abs(v).toFixed(d)}${unit}`; },
    pct(v, d = 0) { return v == null ? '' : `${fmt(v * 100, d)}%`; }
  },
  tokens() { readTokens(); return { ...TOKRAW }; },
  util: { esc, inl, prose, fold, slug, arr, num, clamp, sleep, $, $$ },
  h: H,
  store: {
    get(k, d) { return store.get('m:' + k, d); },
    set(k, v) { store.set('m:' + k, v); }
  },
  isPhone: () => MQ.phone.matches,
  reducedMotion: () => MQ.rm.matches,
  /* filled by the journal module: {user, signIn(email), signOut(), client, ready} */
  auth: { user: null, ready: false, available: false, signIn() { APP.toast('Sign-in is not set up on this copy of the atlas.'); return Promise.resolve(null); }, signOut() { return Promise.resolve(); } }
};
VM.ready = new Promise(res => vmOn('map:ready', res));
window.VM = VM;
