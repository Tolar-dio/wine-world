/* Vitis Mundi: map (style, layers, lazy country sources, interaction) */
const Z_APP = 4.5;          /* appellation polygons fade in from here */
const Z_FINE = 9.8;         /* finer units (Einzellagen, MGAs...) */
const F_IT = ['atlas-italic'], F_RG = ['atlas-regular'], F_SC = ['atlas-sc'];
const has = p => (MANIFEST.files && MANIFEST.files.length) ? MANIFEST.files.includes(p) : true;
let map = null;
const S = {
  mode: store.get('mode', 'style'),
  layers: Object.assign({ apps: true, sites: true, rivers: true, lakes: true, regions: true, belt: true, grat: true, labels: true, towns: true }, store.get('layers', {})),
  grape: null, grapeSet: null, dim: true,
  fillK: 1, lineK: 1,      /* fill and outline strength factors (lower fills, stronger lines over imagery) */
  flying: false,           /* a scripted camera (river journey) is running: skip moveend bookkeeping */
  keepCam: false,          /* 3D terrain: profile flights keep the current pitch and bearing */
  sel: null,               /* {src, id} */
  hover: null,             /* {src, id} */
  selCountry: null,
  geo: new Map(),          /* source key -> 'loading' | 'loaded' | 'failed' */
  queue: [], active: 0,
  sources: [],             /* per-country source keys that are on the map */
  srcOf: new Map(),        /* appellation id -> source key */
  fineLabs: [],
  seen: new Map(),         /* source key -> last time its country was in (or near) the view */
  interacted: false,
  wineIso: []
};

/* ---------- generated geometry: graticule and wine belts ---------- */
function graticule() {
  const f = [];
  for (let lon = -180; lon < 180; lon += 15) {
    const c = []; for (let lat = -80; lat <= 80; lat += 2) c.push([lon, lat]);
    f.push({ type: 'Feature', properties: { k: 'm' }, geometry: { type: 'LineString', coordinates: c } });
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    const c = []; for (let lon = -180; lon <= 180; lon += 2) c.push([lon, lat]);
    f.push({ type: 'Feature', properties: { k: lat === 0 ? 'eq' : 'p' }, geometry: { type: 'LineString', coordinates: c } });
  }
  return { type: 'FeatureCollection', features: f };
}
function belts() {
  const f = [];
  for (const [a, b] of [[30, 50], [-50, -30]]) {
    for (let lon = -180; lon < 180; lon += 30) {
      const ring = [];
      for (let x = lon; x <= lon + 30; x += 3) ring.push([x, a]);
      for (let x = lon + 30; x >= lon; x -= 3) ring.push([x, b]);
      ring.push([lon, a]);
      f.push({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } });
    }
    for (const lat of [a, b]) {
      const c = []; for (let x = -180; x <= 180; x += 2) c.push([x, lat]);
      f.push({ type: 'Feature', properties: { edge: 1 }, geometry: { type: 'LineString', coordinates: c } });
    }
  }
  return { type: 'FeatureCollection', features: f };
}
const EMPTY = () => ({ type: 'FeatureCollection', features: [] });

/* ---------- paint expressions from tokens ---------- */
function colorExpr(prefix = '') {
  const g = k => ['get', k];
  if (S.mode === 'climate') {
    return ['case', ['has', 'gst'], ['interpolate', ['linear'], g('gst'), 13, TOK.c0, 15.2, TOK.c1, 17.4, TOK.c2, 19.6, TOK.c3, 21.8, TOK.c4, 24, TOK.c5], TOK.faint];
  }
  if (S.mode === 'elevation') {
    return ['case', ['has', 'elev'], ['interpolate', ['linear'], g('elev'), 0, TOK.e0, 250, TOK.e1, 600, TOK.e2, 1100, TOK.e3, 2000, TOK.e4], TOK.faint];
  }
  if (S.mode === 'country') {
    const pal = countryPalette();
    const m = ['match', g('country')];
    for (const [iso, c] of Object.entries(pal)) m.push(iso, c);
    m.push(TOK['w-mixed']);
    return Object.keys(pal).length ? m : TOK['w-mixed'];
  }
  const m = ['match', g('style')];
  for (const s of STYLES.slice(0, -1)) m.push(s, TOK['w-' + s]);
  m.push(TOK['w-mixed']);
  return m;
}
let _pal = null, _palKey = '';
function countryPalette() {
  const isos = Object.keys(D.countries).sort();
  const key = isos.join() + TOK.ocean;
  if (_pal && _palKey === key) return _pal;
  const base = ['w-red', 'c1', 'w-sweet', 'e0', 'w-rose', 'c0', 'w-white', 'e3', 'w-orange', 'w-mixed', 'c4', 'e1', 'w-fortified', 'c2', 'e4'];
  _pal = {};
  isos.forEach((iso, i) => { _pal[iso] = TOK[base[i % base.length]]; });
  _palKey = key;
  return _pal;
}
const fs = k => ['boolean', ['feature-state', k], false];
/* Fill strength falls with an appellation's size relative to the zoom, so that at Côte d'Or scale the six
   regional Bourgogne AOCs stacked underneath stay a faint wash and the crus read clearly. */
function sizeTier(z, big, bigV, mid, midV, smallV) { return ['case', ['>', ['get', 'area'], big], bigV, ['>', ['get', 'area'], mid], midV, smallV]; }
const FILL_STOPS = [[Z_APP + 0.65, 5000, 0.06, 500, 0.13, 0.2], [7.5, 2000, 0.05, 200, 0.11, 0.22], [10, 300, 0.035, 40, 0.1, 0.24], [12.5, 60, 0.025, 8, 0.08, 0.26]];
const LINE_STOPS = [[Z_APP + 0.65, 5000, 0.45, 500, 0.6, 0.7], [7.5, 2000, 0.35, 200, 0.6, 0.75], [10, 300, 0.22, 40, 0.5, 0.8], [12.5, 60, 0.16, 8, 0.4, 0.85]];
function withState(ex, kind) {
  if (S.grape && S.dim === false) {
    return kind === 'fill'
      ? ['case', fs('sel'), ['+', ex, 0.25], fs('g'), ['min', 0.6, ['*', 2.6, ex]], fs('hover'), ['+', ex, 0.16], ex]
      : ['case', fs('g'), 0.95, fs('hover'), 1, ex];
  }
  if (S.grape) {
    return kind === 'fill'
      ? ['case', fs('sel'), ['+', ex, 0.25], fs('g'), ['min', 0.6, ['*', 2.6, ex]], fs('hover'), ['+', ex, 0.06], ['*', 0.25, ex]]
      : ['case', fs('g'), 0.95, fs('hover'), 0.8, 0.1];
  }
  return kind === 'fill' ? ['case', fs('sel'), ['+', ex, 0.2], fs('hover'), ['+', ex, 0.16], ex] : ['case', fs('hover'), 1, ex];
}
const kf = v => +(v * S.fillK).toFixed(3), kl = v => +Math.min(1, v * S.lineK).toFixed(3);
function fillOpacity(fine) {
  if (fine) { const z0 = Z_FINE - 0.3; return ['interpolate', ['linear'], ['zoom'], z0, 0, z0 + 0.9, withState(kf(0.2), 'fill')]; }
  const out = ['interpolate', ['linear'], ['zoom'], Z_APP - 0.25, 0];
  for (const st of FILL_STOPS) out.push(st[0], withState(sizeTier(st[0], st[1], kf(st[2]), st[3], kf(st[4]), kf(st[5])), 'fill'));
  return out;
}
function lineOpacity(fine) {
  if (fine) { const z0 = Z_FINE - 0.3; return ['interpolate', ['linear'], ['zoom'], z0, 0, z0 + 0.9, withState(kl(0.75), 'line')]; }
  const out = ['interpolate', ['linear'], ['zoom'], Z_APP - 0.25, 0];
  for (const st of LINE_STOPS) out.push(st[0], withState(sizeTier(st[0], st[1], kl(st[2]), st[3], kl(st[4]), kl(st[5])), 'line'));
  return out;
}
function appLayers(src, fine) {
  const minzoom = fine ? Z_FINE - 0.3 : Z_APP - 0.3;
  const vis = S.layers.apps ? 'visible' : 'none';
  return [
    ['anchor-fill', { id: src + '-fill', type: 'fill', source: src, minzoom, layout: { visibility: vis, 'fill-sort-key': ['-', 0, ['get', 'area']] }, paint: { 'fill-color': colorExpr(), 'fill-opacity': fillOpacity(fine), 'fill-antialias': false } }],
    ['anchor-line', { id: src + '-line', type: 'line', source: src, minzoom, layout: { visibility: vis, 'line-join': 'round' }, paint: { 'line-color': colorExpr(), 'line-opacity': lineOpacity(fine), 'line-width': ['interpolate', ['linear'], ['zoom'], 5, ['case', ['>', ['get', 'lvl'], 0], 0.5, 0.8], 9, ['case', ['>', ['get', 'lvl'], 0], 0.9, 1.3], 13, 1.8] } }],
    ['anchor-sel', { id: src + '-sel', type: 'line', source: src, minzoom, layout: { visibility: vis, 'line-join': 'round' }, paint: { 'line-color': TOK.highlight, 'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1.6, 10, 2.6, 14, 3.4], 'line-opacity': ['case', fs('sel'), 1, fs('hover'), 0.5, 0] } }]
  ];
}

function baseStyle() {
  const t = TOK;
  return {
    version: 8,
    projection: { type: 'globe' },
    glyphs: 'vmglyphs://{fontstack}/{range}',
    sky: skySpec(),
    sources: {
      land: { type: 'geojson', data: BASE + 'data/base/countries_low.geojson', promoteId: 'iso2', tolerance: 0.6 },
      grat: { type: 'geojson', data: graticule() },
      belt: { type: 'geojson', data: belts() }
    },
    layers: [
      { id: 'ocean', type: 'background', paint: { 'background-color': t.ocean } },
      { id: 'belt-fill', type: 'fill', source: 'belt', filter: ['!', ['has', 'edge']], maxzoom: 6, layout: { visibility: S.layers.belt ? 'visible' : 'none' }, paint: { 'fill-color': t.highlight, 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 1, t.dark ? 0.05 : 0.045, 4, 0.03, 5.5, 0] } },
      { id: 'land-fill', type: 'fill', source: 'land', paint: { 'fill-color': t.land } },
      { id: 'grat-line', type: 'line', source: 'grat', maxzoom: 6, layout: { visibility: S.layers.grat ? 'visible' : 'none' }, paint: { 'line-color': t.muted, 'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, ['case', ['==', ['get', 'k'], 'eq'], 0.3, 0.14], 4, 0.08, 5.5, 0], 'line-width': 0.6 } },
      { id: 'belt-edge', type: 'line', source: 'belt', filter: ['has', 'edge'], maxzoom: 6, layout: { visibility: S.layers.belt ? 'visible' : 'none' }, paint: { 'line-color': t.highlight, 'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.38, 4, 0.18, 5.5, 0], 'line-width': 0.8, 'line-dasharray': [3, 3] } },
      { id: 'anchor-lakes', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-admin', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-rivers', type: 'background', layout: { visibility: 'none' } },
      { id: 'land-line', type: 'line', source: 'land', paint: { 'line-color': t.border, 'line-width': 0.7, 'line-opacity': 0.9 } },
      { id: 'anchor-border', type: 'background', layout: { visibility: 'none' } },
      { id: 'land-hover', type: 'fill', source: 'land', maxzoom: Z_APP + 0.5, paint: { 'fill-color': t.text, 'fill-opacity': ['case', fs('hover'), t.dark ? 0.07 : 0.05, 0] } },
      { id: 'anchor-fill', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-reg', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-line', type: 'background', layout: { visibility: 'none' } },
      { id: 'country-sel', type: 'line', source: 'land', filter: ['==', ['get', 'iso2'], '__none'], paint: { 'line-color': t.highlight, 'line-width': 1.6 } },
      { id: 'anchor-sel', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-points', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-labels', type: 'background', layout: { visibility: 'none' } },
      { id: 'anchor-top', type: 'background', layout: { visibility: 'none' } }
    ]
  };
}
function skySpec() {
  return {
    'sky-color': TOK.space, 'horizon-color': TOK.dark ? '#2a3350' : '#f4f6f8', 'fog-color': TOK.space,
    'sky-horizon-blend': 0.6, 'horizon-fog-blend': 0.5, 'fog-ground-blend': 0.5,
    'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, TOK.dark ? 0.6 : 0.5, 4, 0.3, 7, 0]
  };
}

/* ---------- canvas icons for site kinds ---------- */
const KIND_SHAPE = {
  grand_cru: 'diamond', premier_cru: 'diamondo', cru: 'sq', vineyard: 'sq', mga: 'sq', lieu_dit: 'sqo', village: 'dot',
  estate: 'house', chateau: 'tower', quinta: 'house', house: 'house', cellar: 'arch', historic: 'column', museum: 'column', landscape: 'mount'
};
function drawIcon(shape, fill, ink, ring) {
  const r = 2, W = 22 * r, c = document.createElement('canvas');
  c.width = c.height = W;
  const x = c.getContext('2d');
  x.scale(r, r);
  x.lineWidth = 1.6; x.strokeStyle = ink; x.fillStyle = fill; x.lineJoin = 'round';
  const halo = () => { x.save(); x.strokeStyle = ring; x.lineWidth = 4.2; x.stroke(); x.restore(); };
  x.beginPath();
  switch (shape) {
    case 'diamond': case 'diamondo': x.moveTo(11, 3); x.lineTo(18.5, 11); x.lineTo(11, 19); x.lineTo(3.5, 11); x.closePath(); break;
    case 'sq': case 'sqo': x.rect(5.5, 5.5, 11, 11); break;
    case 'dot': x.arc(11, 11, 4.2, 0, Math.PI * 2); break;
    case 'house': x.moveTo(4.5, 10); x.lineTo(11, 4); x.lineTo(17.5, 10); x.lineTo(17.5, 18); x.lineTo(4.5, 18); x.closePath(); break;
    case 'tower': x.moveTo(5, 18); x.lineTo(5, 8); x.lineTo(7.5, 8); x.lineTo(7.5, 5); x.lineTo(10, 5); x.lineTo(10, 8); x.lineTo(12, 8); x.lineTo(12, 5); x.lineTo(14.5, 5); x.lineTo(14.5, 8); x.lineTo(17, 8); x.lineTo(17, 18); x.closePath(); break;
    case 'arch': x.moveTo(4.5, 18); x.lineTo(4.5, 11); x.arc(11, 11, 6.5, Math.PI, 0); x.lineTo(17.5, 18); x.closePath(); break;
    case 'column': x.rect(5, 6, 12, 12); break;
    case 'mount': x.moveTo(3, 18); x.lineTo(9, 6); x.lineTo(12.5, 12); x.lineTo(14.5, 9); x.lineTo(19, 18); x.closePath(); break;
    case 'town': x.arc(11, 11, 3.2, 0, Math.PI * 2); break;
    case 'extra': x.moveTo(11, 4.5); x.lineTo(17.5, 11); x.lineTo(11, 17.5); x.lineTo(4.5, 11); x.closePath(); break;
  }
  halo();
  const open = shape.endsWith('o');
  x.fillStyle = open ? ring : fill; x.fill(); x.stroke();
  if (shape === 'column') { x.beginPath(); for (const cx of [8, 11, 14]) { x.moveTo(cx, 7.5); x.lineTo(cx, 16.5); } x.strokeStyle = ring; x.lineWidth = 1.1; x.stroke(); }
  if (shape === 'arch') { x.beginPath(); x.arc(11, 13.5, 2.6, Math.PI, 0); x.lineTo(13.6, 18); x.lineTo(8.4, 18); x.closePath(); x.fillStyle = ring; x.fill(); }
  return { width: W, height: W, data: x.getImageData(0, 0, W, W).data };
}
function addIcons() {
  const t = TOK;
  // update in place: removing and re-adding images forces a tile reload that can capture stale paint
  const set = (name, img) => { if (map.hasImage(name)) map.updateImage(name, img); else map.addImage(name, img, { pixelRatio: 2 }); };
  for (const [kind, shape] of Object.entries(KIND_SHAPE)) {
    const fill = /cru|mga|vineyard|lieu/.test(kind) ? (kind === 'grand_cru' ? t.highlight : t['w-red']) : /historic|museum|landscape/.test(kind) ? t.muted : t.text;
    set('k-' + kind, drawIcon(shape, fill, t.space === t.ocean ? t.text : t.text, t.panel));
  }
  set('k-extra', drawIcon('extra', t['w-mixed'], t.text, t.panel));
  set('k-town', drawIcon('town', t.panel, t['map-label'], t.panel));
}

/* ---------- map creation ---------- */
/* Glyphs ship as one JSON of base64 PBFs (the host does not serve .pbf). A custom protocol hands MapLibre
   each range; a range we do not have gets an empty glyph set, which is a valid PBF (zero bytes), so no error. */
let _glyphs = null;
function glyphJSON() {
  if (!_glyphs) _glyphs = fetch(BASE + 'fonts/glyphs.json').then(r => (r.ok ? r.json() : {})).catch(() => ({}));
  return _glyphs;
}
const _glyphBuf = new Map();
function registerGlyphProtocol() {
  if (registerGlyphProtocol.done) return;
  registerGlyphProtocol.done = true;
  maplibregl.addProtocol('vmglyphs', async (params) => {
    const m = params.url.match(/^vmglyphs:\/\/([^/]+)\/(\d+-\d+)/);
    if (!m) return { data: new ArrayBuffer(0) };
    const stack = decodeURIComponent(m[1]).split(',')[0].trim(), range = m[2], key = stack + '/' + range;
    if (_glyphBuf.has(key)) return { data: _glyphBuf.get(key).slice(0) };
    const all = await glyphJSON();
    const b64 = all?.[stack]?.[range];
    if (!b64) return { data: new ArrayBuffer(0) };
    const bin = atob(b64), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    _glyphBuf.set(key, u8.buffer);
    return { data: u8.buffer.slice(0) };
  });
}
function initMap() {
  if (!window.maplibregl) throw new Error('MapLibre GL did not load');
  registerGlyphProtocol();
  readTokens();
  const phone = MQ.phone.matches;
  const start = store.get('view', null);
  map = new maplibregl.Map({
    container: 'map',
    style: baseStyle(),
    center: start?.c || [12, 34],
    zoom: start?.z ?? (phone ? 1.2 : 2.05),
    minZoom: 0.4, maxZoom: 15.5, maxPitch: 55,
    attributionControl: false,
    renderWorldCopies: false,
    fadeDuration: 180,
    dragRotate: true, pitchWithRotate: false,
    localIdeographFontFamily: '"Noto Serif", serif',
    cancelPendingTileRequestsWhileZooming: true,
    // tile caches per source: enough to pan back without refetching, small enough for phones with imagery and terrain
    maxTileCacheSize: phone ? 48 : 120
  });
  // two-finger twist rotates in every mode (globe and flat); two-finger tilt only in 3D terrain (v2_map.js),
  // so a twist cannot tip the map by accident. Desktop: right-drag or ctrl-drag rotates.
  map.touchZoomRotate.enableRotation();
  map.touchPitch.disable();
  map.keyboard.enable();
  map.on('error', e => {
    const msg = e?.error?.message || String(e?.error || e);
    // external tiles (satellite, topo, terrain) fail quietly when offline or outside a service's coverage
    if (e?.sourceId && /^(bm-|ni-|nt-|dem-|contours)/.test(e.sourceId)) { if (typeof bmTileError === 'function') bmTileError(e.sourceId, msg); return; }
    console.warn('[map]', msg);
  });
  map.on('styleimagemissing', e => {
    if (!/^k-/.test(e.id)) return;
    addIcons();
  });
  map.once('load', onMapLoad);
  return map;
}
function addSourceSafe(id, spec) { if (!map.getSource(id)) map.addSource(id, spec); return map.getSource(id); }
function addLayerSafe(layer, before) { if (!map.getLayer(layer.id)) map.addLayer(layer, before && map.getLayer(before) ? before : undefined); }

async function onMapLoad() {
  addIcons();
  APP.mapReady = true;
  vmEmit('map:ready', map);
  startSpin();
  bindMapEvents();
  updateReadout();
  // data that shapes the globe at rest
  const [countries, overview] = await Promise.all([
    has('data/geo/_countries.json') ? getJSON('data/geo/_countries.json') : null,
    has('data/geo/_overview.geojson') ? getJSON('data/geo/_overview.geojson') : null
  ]);
  setCountries(countries);
  addOverview(overview);
  addCountryLabels();
  APP.emit('countries');
  // second wave once the globe is up
  // second wave (detailed coastlines, rivers, towns, regions, sites, index): on first zoom-in, on search, or after a pause
  const z0 = map.getZoom();
  if (z0 >= 2.4 || location.hash.length > 1) wave2(); else {
    const onZ = () => { if (map.getZoom() >= 2.4) { map.off('zoom', onZ); wave2(); } };
    map.on('zoom', onZ);
    setTimeout(() => requestIdle(wave2, 500), 6000);
  }
  checkViewport();
}
let _wave2 = false;
function wave2() { if (_wave2 || !map) return; _wave2 = true; addBasemapExtras(); loadSecondary(); }
function requestIdle(fn, t) { (window.requestIdleCallback || (f => setTimeout(f, t)))(fn, { timeout: 1500 }); }

function setCountries(j) {
  D.countries = {};
  if (j && typeof j === 'object') {
    for (const [iso, m] of Object.entries(j)) D.countries[iso.toLowerCase()] = m || {};
  } else {
    // fallback: infer from the geo files that exist
    for (const p of MANIFEST.files || []) {
      const m = p.match(/^data\/geo\/([a-z]{2})\.geojson$/);
      if (m) D.countries[m[1]] = { file: m[1] + '.geojson', fine: has(`data/geo/${m[1]}_fine.geojson`) ? `${m[1]}_fine.geojson` : null, has_content: has(`data/content/${m[1]}.json`) };
    }
  }
  for (const [iso, m] of Object.entries(D.countries)) {
    if (m.file && !has('data/geo/' + m.file)) m.file = null;
    if (m.fine && !has('data/geo/' + m.fine)) m.fine = null;
    if (m.has_content == null) m.has_content = has(`data/content/${iso}.json`);
  }
  D.countriesLoaded = true;
  S.wineIso = Object.keys(D.countries);
  paintLand();
}
function paintLand() {
  if (!map || !map.getLayer('land-fill')) return;
  const wine = S.wineIso.length ? ['match', ['get', 'iso2'], S.wineIso, TOK['land-wine'], TOK.land] : TOK.land;
  map.setPaintProperty('land-fill', 'fill-color', wine);
  if (map.getLayer('land-hi-fill')) map.setPaintProperty('land-hi-fill', 'fill-color', wine);
}
function flatOverview(fc) {
  for (const f of fc.features) {
    const p = f.properties || (f.properties = {});
    p.lab = safeLabel(p.name, 'atlas-italic');
    if (!p.style) p.style = 'mixed';
    p.area = +p.area || 0;
  }
  return fc;
}
function addOverview(fc) {
  D.overview = fc && Array.isArray(fc.features) ? flatOverview(fc) : EMPTY();
  addSourceSafe('ov', { type: 'geojson', data: D.overview, promoteId: 'id' });
  // size by sqrt(area), capped so country-sized zones do not swamp the globe; mixed style glows less
  const core = ['min', 4.2, ['+', 1.1, ['*', 0.045, ['sqrt', ['max', 0, ['get', 'area']]]]]];
  const op = (a, b) => ['interpolate', ['linear'], ['zoom'], 3.6, a, 5.6, b];
  addLayerSafe({ id: 'ov-glow', type: 'circle', source: 'ov', maxzoom: 6, layout: { visibility: S.layers.apps ? 'visible' : 'none', 'circle-sort-key': ['-', 0, ['get', 'area']] }, paint: {
    'circle-color': colorExpr(), 'circle-blur': 1,
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, ['*', 2.6, core], 5, ['*', 3.6, core]],
    'circle-opacity': op(ovGlowOp(), 0)
  } }, 'anchor-points');
  addLayerSafe({ id: 'ov-core', type: 'circle', source: 'ov', maxzoom: 6, layout: { visibility: S.layers.apps ? 'visible' : 'none', 'circle-sort-key': ['-', 0, ['get', 'area']] }, paint: {
    'circle-color': colorExpr(), 'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, ['*', 0.62, core], 5, ['*', 1.1, core]],
    'circle-opacity': op(ovCoreOp(), 0), 'circle-stroke-width': 0
  } }, 'anchor-points');
  // appellation labels, sorted by area so big names win the collisions
  const labLayer = (id, minzoom, lo, hi, size) => ({
    id, type: 'symbol', source: 'ov', minzoom, filter: ['all', ['>=', ['get', 'area'], lo], ['<', ['get', 'area'], hi]],
    layout: { visibility: S.layers.labels && S.layers.apps ? 'visible' : 'none', 'text-field': ['get', 'lab'], 'text-font': F_IT, 'symbol-sort-key': ['-', 0, ['get', 'area']],
      'text-size': ['interpolate', ['linear'], ['zoom'], minzoom, size, minzoom + 4, size + 3], 'text-max-width': 8, 'text-padding': 3, 'text-letter-spacing': 0.01 },
    paint: { 'text-color': TOK['map-label-wine'], 'text-halo-color': TOK.halo, 'text-halo-width': 1.4, 'text-halo-blur': 0.4,
      'text-opacity': labOpacity(minzoom) }
  });
  // placement priority goes to layers higher in the stack, so the largest areas sit on top
  addLayerSafe(labLayer('lab-3', 8.4, 0, 20, 11.5), 'anchor-top');
  addLayerSafe(labLayer('lab-2', 6.4, 20, 300, 12), 'anchor-top');
  addLayerSafe(labLayer('lab-1', 4.9, 300, 30000, 12.5), 'anchor-top');
  addSourceSafe('fine-lab', { type: 'geojson', data: EMPTY() });
  addLayerSafe({ id: 'fine-lab', type: 'symbol', source: 'fine-lab', minzoom: Z_FINE + 0.8, layout: { visibility: S.layers.labels && S.layers.apps ? 'visible' : 'none',
    'text-field': ['format', ['get', 'lab'], {}, ['case', ['has', 'lab2'], ['concat', '\n', ['get', 'lab2']], ''], { 'font-scale': 0.78, 'text-font': ['literal', F_RG] }], 'text-font': F_IT, 'text-size': ['interpolate', ['linear'], ['zoom'], 10.5, 10.5, 14, 13], 'symbol-sort-key': ['-', 0, ['get', 'area']], 'text-max-width': 6, 'text-padding': 2 }, paint: { 'text-color': TOK['map-label-wine'], 'text-halo-color': TOK.halo, 'text-halo-width': 1.3, 'text-opacity': ['interpolate', ['linear'], ['zoom'], Z_FINE + 0.8, 0, Z_FINE + 1.2, 0.9] } }, 'anchor-top');
  applyGrapeOverview();
}
function labOpacity(mz) { return ['interpolate', ['linear'], ['zoom'], mz, 0, mz + 0.5, S.grape && S.dim !== false ? ['case', fs('g'), 1, 0.35] : 1]; }
function ovGlowOp() {
  if (S.grape && S.dim === false) return ['case', fs('g'), 0.7, TOK.dark ? 0.3 : 0.26];
  if (S.grape) return ['case', fs('g'), 0.6, 0.02];
  const a = TOK.dark ? 0.3 : 0.26;
  return S.mode === 'style' ? ['case', ['==', ['get', 'style'], 'mixed'], a * 0.45, a] : a;
}
function ovCoreOp() { return S.grape && S.dim !== false ? ['case', fs('g'), 1, 0.1] : ['case', ['>', ['get', 'area'], 30000], 0.45, 0.92]; }

async function addCountryLabels() {
  if (!has('data/base/country_labels.geojson')) return;
  const fc = await getJSON('data/base/country_labels.geojson');
  if (!fc) return;
  for (const f of fc.features) { const p = f.properties; p.lab = safeLabel(p.name, 'atlas-sc'); D.baseNames[p.iso2] = D.baseNames[p.iso2] || p.name; }
  addSourceSafe('clab', { type: 'geojson', data: fc });
  addLayerSafe({ id: 'clab', type: 'symbol', source: 'clab', maxzoom: 6.5, filter: ['all', ['<=', ['get', 'minz'], 5.2], ['>=', ['zoom'], ['-', ['get', 'minz'], ['match', ['get', 'iso2'], S.wineIso.length ? S.wineIso : ['__'], 2.2, 1.2]]]], layout: {
    'text-field': ['get', 'lab'], 'text-font': F_SC, 'symbol-sort-key': ['-', ['get', 'rank'], ['match', ['get', 'iso2'], S.wineIso.length ? S.wineIso : ['__'], 4, 0]], 'text-padding': 2,
    'text-size': ['interpolate', ['linear'], ['zoom'], 1, ['case', ['<=', ['get', 'rank'], 2], 12.5, ['<=', ['get', 'rank'], 4], 11, 10], 5, ['case', ['<=', ['get', 'rank'], 3], 17, 14]],
    'text-letter-spacing': 0.08, 'text-max-width': 7, visibility: S.layers.labels ? 'visible' : 'none'
  }, paint: clabPaint() }, 'anchor-top');
  APP.emit('basenames');
}
function clabPaint() {
  const wine = S.wineIso.length ? ['match', ['get', 'iso2'], S.wineIso, TOK.text, TOK.faint] : TOK.muted;
  return { 'text-color': wine, 'text-halo-color': TOK.halo, 'text-halo-width': 1.2, 'text-opacity': ['interpolate', ['linear'], ['zoom'], 1, ['match', ['get', 'iso2'], S.wineIso.length ? S.wineIso : ['__'], 0.95, 0.6], 5.4, 0.8, 6.4, 0] };
}

/* ---------- basemap extras, loaded after the globe is visible ---------- */
function findBase(...names) { for (const n of names) if (has('data/base/' + n)) return 'data/base/' + n; return null; }
async function addBasemapExtras() {
  // detailed coastlines and borders replace the low-res ones from z 3.6
  if (has('data/base/countries.geojson')) {
    addSourceSafe('land-hi', { type: 'geojson', data: BASE + 'data/base/countries.geojson', promoteId: 'iso2', tolerance: 0.45 });
    addLayerSafe({ id: 'land-hi-fill', type: 'fill', source: 'land-hi', minzoom: 3.5, paint: { 'fill-color': TOK.land } }, 'grat-line');
    addLayerSafe({ id: 'land-hi-line', type: 'line', source: 'land-hi', minzoom: 3.5, paint: { 'line-color': TOK.border, 'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.8, 10, 1.6], 'line-opacity': 0.95 } }, 'anchor-border');
    addLayerSafe({ id: 'country-sel-hi', type: 'line', source: 'land-hi', minzoom: 3.5, filter: ['==', ['get', 'iso2'], '__none'], paint: { 'line-color': TOK.highlight, 'line-width': 1.8 } }, 'anchor-sel');
    addLayerSafe({ id: 'land-hi-hover', type: 'fill', source: 'land-hi', minzoom: 3.5, maxzoom: Z_APP + 0.5, paint: { 'fill-color': TOK.text, 'fill-opacity': ['case', fs('hover'), TOK.dark ? 0.07 : 0.05, 0] } }, 'anchor-fill');
    paintLand();
    if (S.selCountry) selectCountry(S.selCountry);
    // hand over to the detailed layers once their data has arrived
    const handover = e => {
      if (e.sourceId !== 'land-hi' || !e.isSourceLoaded) return;
      map.off('sourcedata', handover);
      for (const id of ['land-line', 'country-sel']) map.setLayerZoomRange(id, 0, 3.6);
    };
    map.on('sourcedata', handover);
  }
  const lakes = findBase('lakes.geojson', 'lakes_10m.geojson');
  if (lakes) {
    addSourceSafe('lakes', { type: 'geojson', data: BASE + lakes, tolerance: 0.5 });
    addLayerSafe({ id: 'lakes-fill', type: 'fill', source: 'lakes', minzoom: 3, layout: { visibility: S.layers.lakes ? 'visible' : 'none' }, paint: { 'fill-color': TOK.lake, 'fill-outline-color': TOK.river } }, 'anchor-lakes');
  }
  if (has('data/base/admin1_lines.geojson')) {
    addSourceSafe('admin1', { type: 'geojson', data: BASE + 'data/base/admin1_lines.geojson', tolerance: 0.6 });
    for (const [lv, mz, wd] of [[1, 4.5, 0.8], [2, 6.5, 0.5]]) {
      addLayerSafe({ id: 'admin1-line-' + lv, type: 'line', source: 'admin1', minzoom: mz, filter: ['==', ['get', 'level'], lv], paint: {
        'line-color': TOK.border, 'line-width': wd, 'line-opacity': ['interpolate', ['linear'], ['zoom'], mz, 0, mz + 1, 0.55, 9, 0.75], 'line-dasharray': [4, 3] } }, 'anchor-admin');
    }
  }
  const rivers = findBase('rivers.geojson', 'rivers_10m.geojson', 'wine_rivers.geojson');
  if (rivers) {
    const fc = await getJSON(rivers);
    if (fc) {
      for (const f of fc.features) {
        const p = f.properties || (f.properties = {});
        p.lab = safeLabel(p.name || p.label || '', 'atlas-italic');
        p.w = (p.wine === true || p.wine === 1 || p.wine === '1') ? 1 : 0;
        const sr = +(p.sr ?? p.scalerank ?? p.rank ?? 8);
        p.t = p.w || sr <= 6 ? 0 : sr <= 9 ? 1 : 2;
      }
      addSourceSafe('rivers', { type: 'geojson', data: fc, tolerance: 0.5 });
      const vis = S.layers.rivers ? 'visible' : 'none';
      for (const [t, mz] of [[0, 2.5], [1, 5.5], [2, 7.5]]) {
        addLayerSafe({ id: 'rivers-line-' + t, type: 'line', source: 'rivers', minzoom: mz, filter: ['==', ['get', 't'], t], layout: { visibility: vis, 'line-cap': 'round', 'line-join': 'round' }, paint: {
          'line-color': ['case', ['==', ['get', 'w'], 1], TOK['river-wine'], TOK.river],
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, ['case', ['==', ['get', 'w'], 1], 0.9, 0.5], 7, ['case', ['==', ['get', 'w'], 1], 1.8, 0.9], 12, ['case', ['==', ['get', 'w'], 1], 3.2, 1.6]],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], mz, 0, mz + 1, 0.9] } }, 'anchor-rivers');
      }
      addLayerSafe({ id: 'rivers-lab', type: 'symbol', source: 'rivers', minzoom: 6, filter: ['==', ['get', 'w'], 1], layout: {
        visibility: S.layers.rivers && S.layers.labels ? 'visible' : 'none', 'symbol-placement': 'line', 'text-field': ['get', 'lab'], 'text-font': F_IT,
        'text-size': ['interpolate', ['linear'], ['zoom'], 6, 11.5, 12, 14.5], 'text-letter-spacing': 0.1, 'symbol-spacing': 280, 'text-max-angle': 40, 'text-padding': 1 }, paint: { 'text-color': TOK['river-wine'], 'text-halo-color': TOK.halo, 'text-halo-width': 1.3 } }, 'anchor-top');
      addLayerSafe({ id: 'rivers-lab-2', type: 'symbol', source: 'rivers', minzoom: 8.5, filter: ['==', ['get', 'w'], 0], layout: {
        visibility: S.layers.rivers && S.layers.labels ? 'visible' : 'none', 'symbol-placement': 'line', 'text-field': ['get', 'lab'], 'text-font': F_IT,
        'text-size': 11, 'text-letter-spacing': 0.1, 'symbol-spacing': 420, 'text-max-angle': 30 }, paint: { 'text-color': TOK.muted, 'text-halo-color': TOK.halo, 'text-halo-width': 1.2 } }, 'anchor-labels');
    }
  }
  const towns = findBase('places.geojson', 'towns.geojson', 'wine_towns.geojson', 'cities.geojson');
  if (towns) {
    const fc = await getJSON(towns);
    if (fc) {
      for (const f of fc.features) {
        const p = f.properties || (f.properties = {});
        p.lab = safeLabel(p.name || '', 'atlas-regular');
        const rk = +(p.rank ?? p.scalerank ?? 7), w = p.wine === true || p.wine === 1;
        p.rk = rk; p.w = w ? 1 : 0;
        p.t = (rk <= 1 || (w && rk <= 4)) ? 0 : (rk <= 3 || (w && rk <= 7)) ? 1 : 2;
      }
      addSourceSafe('towns', { type: 'geojson', data: fc });
      for (const [t, mz] of [[0, 4.4], [1, 6.0], [2, 7.6]]) {
        addLayerSafe({ id: 'towns-' + t, type: 'symbol', source: 'towns', minzoom: mz, filter: ['==', ['get', 't'], t], layout: {
          visibility: S.layers.towns && S.layers.labels ? 'visible' : 'none', 'text-field': ['get', 'lab'], 'text-font': F_RG,
          'text-size': ['interpolate', ['linear'], ['zoom'], 5, ['case', ['==', ['get', 'w'], 1], 12, 11], 12, ['case', ['==', ['get', 'w'], 1], 14.5, 13]],
          'text-variable-anchor': ['left', 'right', 'top', 'bottom'], 'text-radial-offset': 0.6, 'text-justify': 'auto',
          'symbol-sort-key': ['+', ['get', 'rk'], ['*', -3, ['get', 'w']]], 'icon-image': 'k-town', 'icon-size': 0.5, 'text-padding': 3 },
          paint: { 'text-color': ['case', ['==', ['get', 'w'], 1], TOK['map-label-wine'], TOK['map-label']], 'text-halo-color': TOK.halo, 'text-halo-width': 1.3, 'icon-opacity': 0.85,
            'text-opacity': ['interpolate', ['linear'], ['zoom'], mz, 0, mz + 0.4, 1] } }, 'anchor-labels');
      }
    }
  }
}

async function loadSecondary() {
  const want = p => has(p) ? getJSON(p) : Promise.resolve(null);
  want('data/geo/_regions.geojson').then(addRegions);
  want('data/geo/_sites.geojson').then(addSites);
  want('data/geo/_extra_points.geojson').then(addExtra);
  APP.loadIndex();
}
function addRegions(fc) {
  setRegions(fc);
  vmEmit('data:regions', D.regions);
  rebuildSearch();
  if (!fc || !map) return;
  addSourceSafe('regions', { type: 'geojson', data: fc, promoteId: 'id', tolerance: 0.6 });
  const pts = { type: 'FeatureCollection', features: D.regions.filter(r => Array.isArray(r.lp)).map(r => ({ type: 'Feature', properties: { id: r.id, lab: safeLabel(r.name, 'atlas-sc'), country: r.country }, geometry: { type: 'Point', coordinates: r.lp } })) };
  addSourceSafe('reg-pts', { type: 'geojson', data: pts, promoteId: 'id' });
  const vis = S.layers.regions ? 'visible' : 'none';
  addLayerSafe({ id: 'reg-line', type: 'line', source: 'regions', minzoom: 3.6, maxzoom: 10, layout: { visibility: vis, 'line-join': 'round' }, paint: {
    'line-color': ['case', fs('hover'), TOK.highlight, TOK.text], 'line-width': ['interpolate', ['linear'], ['zoom'], 4, ['case', fs('hover'), 1.8, 0.8], 8, ['case', fs('hover'), 2.2, 1.3]],
    'line-opacity': ['interpolate', ['linear'], ['zoom'], 3.6, 0, 4.4, 0.5, 8, 0.4, 9.6, 0], 'line-dasharray': [2, 1.5] } }, 'anchor-reg');
  addLayerSafe({ id: 'reg-lab', type: 'symbol', source: 'reg-pts', minzoom: 3.8, maxzoom: 8.8, layout: {
    visibility: S.layers.regions && S.layers.labels ? 'visible' : 'none', 'text-field': ['get', 'lab'], 'text-font': F_SC,
    'text-size': ['interpolate', ['linear'], ['zoom'], 4, 12.5, 8, 16], 'text-letter-spacing': 0.14, 'text-max-width': 9, 'text-padding': 6, 'text-allow-overlap': false },
    paint: { 'text-color': ['case', fs('hover'), TOK.highlight, TOK.text], 'text-halo-color': TOK.halo, 'text-halo-width': 1.6, 'text-opacity': ['interpolate', ['linear'], ['zoom'], 3.8, 0, 4.4, 0.92, 8.2, 0.85, 8.8, 0] } }, 'anchor-top');
}
function addSites(fc) {
  setSites(fc);
  vmEmit('data:sites', D.sites);
  rebuildSearch();
  if (!fc || !map) return;
  for (const f of fc.features) { const p = f.properties; p.lab = safeLabel(p.name, 'atlas-regular'); if (!KIND_SHAPE[p.kind]) p.kind = 'vineyard'; }
  addSourceSafe('sites', { type: 'geojson', data: fc, promoteId: 'id' });
  addLayerSafe({ id: 'site-icon', type: 'symbol', source: 'sites', minzoom: 8, layout: {
    visibility: S.layers.sites ? 'visible' : 'none', 'icon-image': ['concat', 'k-', ['get', 'kind']], 'icon-size': ['interpolate', ['linear'], ['zoom'], 8, 0.62, 12, 0.95],
    'icon-allow-overlap': ['step', ['zoom'], false, 11, true], 'icon-padding': 1,
    'text-field': ['step', ['zoom'], '', 10, ['get', 'lab']], 'text-font': F_RG, 'text-size': 11.5, 'text-optional': true,
    'text-variable-anchor': ['left', 'right', 'top', 'bottom'], 'text-radial-offset': 0.8, 'text-justify': 'auto', 'text-max-width': 9,
    'symbol-sort-key': ['match', ['get', 'kind'], 'grand_cru', 0, 'premier_cru', 1, 'chateau', 2, 'estate', 2, 'quinta', 2, 'house', 3, 5] },
    paint: { 'text-color': TOK.text, 'text-halo-color': TOK.halo, 'text-halo-width': 1.4, 'icon-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 8.5, 1] } }, 'anchor-top');
}
function addExtra(fc) {
  setExtra(fc);
  rebuildSearch();
  if (!fc || !map) return;
  for (const f of fc.features) {
    const p = f.properties;
    p.lab = safeLabel(p.name, 'atlas-italic');
    if (!STYLES.includes(p.style)) p.style = 'mixed';
    p.fine = (p.fine === 1 || p.fine === true) ? 1 : 0;
    S.srcOf.set(p.id, 'extra');
  }
  addSourceSafe('extra', { type: 'geojson', data: fc, promoteId: 'id' });
  const vis = S.layers.apps ? 'visible' : 'none';
  // points-only appellations (no published boundary): a faint glow on the globe, a ringed dot when closer
  addLayerSafe({ id: 'extra-glow', type: 'circle', source: 'extra', maxzoom: 6, filter: ['!=', ['get', 'fine'], 1], layout: { visibility: vis }, paint: {
    'circle-color': colorExpr(), 'circle-blur': 1, 'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4, 5, 10],
    'circle-opacity': ['interpolate', ['linear'], ['zoom'], 2.6, ovGlowOp(), 4.4, 0] } }, 'anchor-points');
  addLayerSafe({ id: 'extra-pt', type: 'circle', source: 'extra', filter: ['!=', ['get', 'fine'], 1], layout: { visibility: vis }, paint: extraPaint() }, 'anchor-points');
  // fine units known only as a point (a cru or Einzellage with a profile but no polygon yet): only at fine zoom
  addLayerSafe({ id: 'extra-fpt', type: 'circle', source: 'extra', minzoom: Z_FINE - 0.3, filter: ['==', ['get', 'fine'], 1], layout: { visibility: vis }, paint: extraPaint() }, 'anchor-points');
  addLayerSafe({ id: 'extra-flab', type: 'symbol', source: 'extra', minzoom: Z_FINE + 0.4, filter: ['==', ['get', 'fine'], 1], layout: {
    visibility: S.layers.labels && S.layers.apps ? 'visible' : 'none', 'text-field': ['get', 'lab'], 'text-font': F_IT, 'text-size': 12,
    'text-variable-anchor': ['top', 'bottom', 'left', 'right'], 'text-radial-offset': 0.9, 'text-justify': 'auto', 'text-max-width': 7, 'text-padding': 2 },
    paint: { 'text-color': TOK['map-label-wine'], 'text-halo-color': TOK.halo, 'text-halo-width': 1.3 } }, 'anchor-top');
  addLayerSafe({ id: 'extra-lab', type: 'symbol', source: 'extra', minzoom: 5.6, filter: ['!=', ['get', 'fine'], 1], layout: {
    visibility: S.layers.labels && S.layers.apps ? 'visible' : 'none', 'text-field': ['get', 'lab'], 'text-font': F_IT,
    'text-size': ['interpolate', ['linear'], ['zoom'], 6, 12, 10, 14], 'text-variable-anchor': ['top', 'bottom', 'left', 'right'], 'text-radial-offset': 0.9,
    'text-justify': 'auto', 'text-max-width': 8, 'text-padding': 2 },
    paint: { 'text-color': TOK['map-label-wine'], 'text-halo-color': TOK.halo, 'text-halo-width': 1.4, 'text-opacity': labOpacity(5.6) } }, 'anchor-top');
  if (S.grapeSet) setGrapeHighlight([...S.grapeSet]);
}
function extraPaint() {
  const g = S.grape && S.dim !== false;
  return {
    'circle-color': colorExpr(),
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.6, 4, 3.2, 8, 5.5, 12, 7],
    'circle-opacity': ['interpolate', ['linear'], ['zoom'], 1, g ? ['case', fs('g'), 0.95, 0.12] : 0.75, 4, g ? ['case', fs('g'), 1, 0.2] : 0.95],
    'circle-stroke-color': ['case', fs('sel'), TOK.highlight, fs('hover'), TOK.highlight, TOK.panel],
    'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 2, ['case', fs('sel'), 1.5, 0], 4, ['case', fs('sel'), 2.5, fs('hover'), 2, 1.2], 10, ['case', fs('sel'), 3, 1.6]],
    'circle-stroke-opacity': ['interpolate', ['linear'], ['zoom'], 2, 0.9, 4, 1]
  };
}

/* ---------- lazy per-country polygons ---------- */
function bboxHit(b, v) {
  if (!b) return false;
  for (const dx of [0, 360, -360]) if (b[0] + dx <= v[2] && b[2] + dx >= v[0] && b[1] <= v[3] && b[3] >= v[1]) return true;
  return false;
}
let _cvT = 0;
function checkViewport() {
  clearTimeout(_cvT);
  _cvT = setTimeout(() => {
    if (!map || !D.countriesLoaded) return;
    const z = map.getZoom();
    if (z < Z_APP - 0.6) return;
    const b = map.getBounds();
    const v = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
    const c = map.getCenter();
    const cand = [];
    for (const [iso, m] of Object.entries(D.countries)) {
      if (m.file && bboxHit(m.bbox, v) && !S.geo.has('app-' + iso)) cand.push(['app-' + iso, m.file, iso, m.bbox]);
      if (z >= Z_FINE - 0.8 && m.fine && bboxHit(m.bbox, v) && !S.geo.has('fine-' + iso)) cand.push(['fine-' + iso, m.fine, iso, m.bbox]);
      if (!m.bbox && m.file && !S.geo.has('app-' + iso)) cand.push(['app-' + iso, m.file, iso, null]);
    }
    const d = bb => bb ? Math.hypot((bb[0] + bb[2]) / 2 - c.lng, (bb[1] + bb[3]) / 2 - c.lat) : 999;
    cand.sort((a, b) => d(a[3]) - d(b[3]));
    for (const x of cand) loadGeo(x[0], x[1], x[2]);
    markSeen(v);
    unloadFar();
  }, 120);
}
/* ---------- unloading: country and fine-unit sources far from the view for a while are dropped (they reload
   when needed); profile data (D.feat) is kept, only the map's GPU and worker copies go ---------- */
const KEEP_APP = () => (MQ.phone.matches ? 6 : 12), KEEP_FINE = () => (MQ.phone.matches ? 2 : 3);
function markSeen(v) {
  const w = v[2] - v[0], h = v[3] - v[1];
  const wide = [v[0] - w * 0.5, v[1] - h * 0.5, v[2] + w * 0.5, v[3] + h * 0.5];
  const now = performance.now();
  for (const key of S.sources) {
    const iso = key.replace(/^(app|fine)-/, '');
    if (bboxHit(D.countries[iso]?.bbox, wide)) S.seen.set(key, now);
    else if (!S.seen.has(key)) S.seen.set(key, now);
  }
}
function unloadFar() {
  if (!map || S.flying) return;
  const now = performance.now(), cur = (APP.cur || '').match(/^(?:region-|site-)?([a-z]{2})(?:-|$)/)?.[1];
  const keepIso = new Set([cur, S.sel && S.sel.id && S.sel.id.slice(0, 2), S.selCountry].filter(Boolean));
  for (const [kind, max, age] of [['fine-', KEEP_FINE(), 20000], ['app-', KEEP_APP(), 60000]]) {
    const loaded = S.sources.filter(k => k.startsWith(kind));
    if (loaded.length <= max) continue;
    const old = loaded.filter(k => !keepIso.has(k.slice(kind.length)) && now - (S.seen.get(k) || now) > age)
      .sort((a, b) => (S.seen.get(a) || 0) - (S.seen.get(b) || 0));
    for (const k of old.slice(0, loaded.length - max)) removeCountrySource(k);
  }
}
function removeCountrySource(key) {
  const users = map.getStyle().layers.filter(l => l.source === key).map(l => l.id);
  if (users.some(id => ![key + '-fill', key + '-line', key + '-sel'].includes(id))) return;   /* a module draws on it: keep */
  for (const id of users) map.removeLayer(id);
  if (map.getSource(key)) map.removeSource(key);
  S.sources = S.sources.filter(k => k !== key);
  S.geo.delete(key); S.geo.delete('p:' + key); S.seen.delete(key);
  if (key.startsWith('fine-')) {
    const iso = key.slice(5);
    S.fineLabs = S.fineLabs.filter(l => !String(l.properties.id).startsWith(iso + '-'));
    const src = map.getSource('fine-lab');
    if (src) src.setData({ type: 'FeatureCollection', features: S.fineLabs });
  }
}
function loadGeo(key, file, iso) {
  if (S.geo.has(key)) return S.geo.get(key) === 'loaded' ? Promise.resolve(true) : (S.geo.get('p:' + key) || Promise.resolve(false));
  S.geo.set(key, 'loading');
  const p = new Promise(res => { S.queue.push({ key, file, iso, res }); });
  S.geo.set('p:' + key, p);
  pump();
  return p;
}
function ensureCountryGeo(iso, fine) {
  const m = D.countries[iso];
  if (!m || !m.file) return Promise.resolve(false);
  const p = loadGeo('app-' + iso, m.file, iso);
  return fine && m.fine ? Promise.all([p, loadGeo('fine-' + iso, m.fine, iso)]).then(x => x[0]) : p;
}
function pump() {
  showLoading();
  while (S.active < 2 && S.queue.length) {
    const job = S.queue.shift();
    S.active++;
    fetch(BASE + 'data/geo/' + job.file).then(r => r.ok ? r.json() : null).catch(() => null).then(fc => {
      let ok = false;
      if (fc && Array.isArray(fc.features) && map) {
        try { addCountrySource(job.key, fc, job.key.startsWith('fine-')); ok = true; } catch (e) { console.warn('[geo]', job.key, e.message); }
      }
      S.geo.set(job.key, ok ? 'loaded' : 'failed');
      S.active--;
      job.res(ok);
      pump();
      if (ok) APP.emit('geo', job.iso);
    });
  }
  showLoading();
}
function showLoading() {
  const el = $('#loading');
  const names = [...new Set(S.queue.map(j => j.iso).concat([...S.geo.entries()].filter(([k, v]) => v === 'loading' && !k.startsWith('p:')).map(([k]) => k.replace(/^(app|fine)-/, ''))))];
  el.hidden = !names.length;
  if (names.length) $('#loading-t').textContent = 'Drawing ' + names.slice(0, 2).map(countryName).join(', ') + (names.length > 2 ? ` +${names.length - 2}` : '');
}
function addCountrySource(key, fc, fine) {
  const slim = { type: 'FeatureCollection', features: [] };
  const labs = [];
  for (const f of fc.features) {
    const p = f.properties || {};
    if (!p.id || !f.geometry) continue;
    D.feat.set(p.id, fine ? { ...p, fine: 1 } : p);
    S.srcOf.set(p.id, key);
    const s = { id: p.id, country: p.country, style: p.style || (arr(p.styles).length === 1 ? p.styles[0] : 'mixed'), area: +p.area || 0, lvl: p.lvl ?? (p.parent ? 1 : 0), cat: p.cat || '' };
    if (p.clim && p.clim.gst != null) s.gst = +p.clim.gst;
    if (p.clim && p.clim.elev != null) s.elev = +p.clim.elev;
    slim.features.push({ type: 'Feature', properties: s, geometry: f.geometry });
    if (fine && Array.isArray(p.lp)) labs.push({ type: 'Feature', properties: { id: p.id, lab: safeLabel(shortName(p), 'atlas-italic'), area: s.area, gc: /grand/i.test(p.subcat || '') ? 1 : 0, _p: p }, geometry: { type: 'Point', coordinates: p.lp } });
  }
  // same-named units in one country (25 Rieden called Goldberg): a second, smaller line names the village
  if (labs.length) {
    const cnt = new Map();
    for (const l of labs) { const k = fold(l.properties.lab); cnt.set(k, (cnt.get(k) || 0) + 1); }
    for (const l of labs) {
      const p = l.properties._p; delete l.properties._p;
      if (cnt.get(fold(l.properties.lab)) > 1) { const c = placeCtx(p); if (c) l.properties.lab2 = safeLabel(c, 'atlas-regular'); }
    }
  }
  slim.features.sort((a, b) => b.properties.area - a.properties.area);
  map.addSource(key, { type: 'geojson', data: slim, promoteId: 'id', tolerance: fine ? 0.3 : 0.4, buffer: 32 });
  for (const [before, layer] of appLayers(key, fine)) map.addLayer(layer, before);
  S.sources.push(key);
  if (fine && labs.length) {
    S.fineLabs = S.fineLabs.concat(labs);
    const src = map.getSource('fine-lab');
    if (src) src.setData({ type: 'FeatureCollection', features: S.fineLabs });
  }
  // restore states on the new source
  if (S.sel && S.sel.id && srcFor(S.sel.id) === key) setSel(S.sel.id);
  if (S.grapeSet) for (const f of slim.features) if (S.grapeSet.has(f.properties.id)) map.setFeatureState({ source: key, id: f.properties.id }, { g: true });
}
/* "Gevrey-Chambertin premier cru Champeaux" -> "Champeaux": the parent is already labelled underneath */
function shortName(p) {
  let n = String(p.name || '');
  const par = p.parent && (D.feat.get(p.parent) || D.byId.get(p.parent));
  if (par && par.name && fold(n).startsWith(fold(par.name) + ' ')) n = n.slice(par.name.length).trim();
  n = n.replace(/^(premier|1er) cru\s+/i, '').replace(/^grand cru\s+/i, '');
  return n || p.name;
}
function srcFor(id) {
  if (!id) return null;
  if (S.srcOf.has(id)) return S.srcOf.get(id);
  const iso = id.slice(0, 2);
  return (D.byId.get(id)?.fine ? 'fine-' : 'app-') + iso;
}

/* ---------- feature-state helpers ---------- */
function stateSet(ref, st) { try { if (ref && map.getSource(ref.src)) map.setFeatureState({ source: ref.src, id: ref.id }, st); } catch (e) { /* source not ready */ } }
function setHover(ref) {
  if (S.hover && ref && S.hover.src === ref.src && S.hover.id === ref.id) return;
  if (S.hover) stateSet(S.hover, { hover: false });
  S.hover = ref;
  if (ref) stateSet(ref, { hover: true });
}
function setSel(id) {
  if (S.sel) stateSet(S.sel, { sel: false });
  S.sel = id ? { src: srcFor(id), id } : null;
  if (S.sel) stateSet(S.sel, { sel: true });
}
function selectCountry(iso) {
  S.selCountry = iso;
  const f = ['==', ['get', 'iso2'], iso || '__none'];
  if (map?.getLayer('country-sel')) map.setFilter('country-sel', f);
  if (map?.getLayer('country-sel-hi')) map.setFilter('country-sel-hi', f);
}
function applyGrapeOverview() {
  if (!map || !map.getSource('ov')) return;
  map.removeFeatureState({ source: 'ov' });
  if (S.grapeSet) for (const id of S.grapeSet) map.setFeatureState({ source: 'ov', id }, { g: true });
  for (const [id, mz] of [['lab-1', 4.9], ['lab-2', 6.4], ['lab-3', 8.4]]) if (map.getLayer(id)) map.setPaintProperty(id, 'text-opacity', labOpacity(mz));
  if (map.getLayer('ov-glow')) {
    const op = (a) => ['interpolate', ['linear'], ['zoom'], 3.6, a, 5.6, 0];
    map.setPaintProperty('ov-glow', 'circle-opacity', op(ovGlowOp()));
    map.setPaintProperty('ov-core', 'circle-opacity', op(ovCoreOp()));
  }
}
function setGrapeHighlight(ids) {
  if (!map) return;
  for (const key of S.sources) map.removeFeatureState({ source: key });
  if (map.getSource('extra')) map.removeFeatureState({ source: 'extra' });
  S.grapeSet = ids ? new Set(ids) : null;
  S.grape = ids ? true : null;
  if (S.grapeSet) for (const id of S.grapeSet) { const k = srcFor(id); if (map.getSource(k)) map.setFeatureState({ source: k, id }, { g: true }); }
  if (S.sel) stateSet(S.sel, { sel: true });
  applyGrapeOverview();
  repaintApps();
}

/* ---------- repaint on theme or mode change ---------- */
function repaintApps() {
  if (!map) return;
  const col = colorExpr();
  for (const key of S.sources) {
    const fine = key.startsWith('fine-');
    if (!map.getLayer(key + '-fill')) continue;
    map.setPaintProperty(key + '-fill', 'fill-color', col);
    map.setPaintProperty(key + '-fill', 'fill-opacity', fillOpacity(fine));
    map.setPaintProperty(key + '-line', 'line-color', col);
    map.setPaintProperty(key + '-line', 'line-opacity', lineOpacity(fine));
    map.setPaintProperty(key + '-sel', 'line-color', TOK.highlight);
  }
  if (map.getLayer('ov-glow')) { map.setPaintProperty('ov-glow', 'circle-color', col); map.setPaintProperty('ov-core', 'circle-color', col); }
  if (map.getLayer('extra-pt')) {
    for (const [k, v] of Object.entries(extraPaint())) { map.setPaintProperty('extra-pt', k, v); if (map.getLayer('extra-fpt')) map.setPaintProperty('extra-fpt', k, v); }
    map.setPaintProperty('extra-glow', 'circle-color', col);
    map.setPaintProperty('extra-glow', 'circle-opacity', ['interpolate', ['linear'], ['zoom'], 2.6, ovGlowOp(), 4.4, 0]);
    map.setPaintProperty('extra-lab', 'text-opacity', labOpacity(5.6));
  }
}
function repaintAll() {
  if (!map || !map.getLayer('ocean')) return;
  readTokens();
  // icons are re-drawn only after the new paint has been applied to every tile (updating images
  // mid-layout makes MapLibre keep tiles painted with the old colours)
  map.once('idle', () => addIcons());
  const t = TOK, P = (id, k, v) => { if (map.getLayer(id)) map.setPaintProperty(id, k, v); };
  P('ocean', 'background-color', t.ocean);
  paintLand();
  P('land-line', 'line-color', t.border); P('land-hi-line', 'line-color', t.border);
  P('land-hover', 'fill-color', t.text); P('land-hi-hover', 'fill-color', t.text);
  P('country-sel', 'line-color', t.highlight); P('country-sel-hi', 'line-color', t.highlight);
  P('grat-line', 'line-color', t.muted);
  P('belt-fill', 'fill-color', t.highlight); P('belt-edge', 'line-color', t.highlight);
  P('belt-fill', 'fill-opacity', ['interpolate', ['linear'], ['zoom'], 1, t.dark ? 0.05 : 0.045, 4, 0.03, 5.5, 0]);
  P('lakes-fill', 'fill-color', t.lake); P('lakes-fill', 'fill-outline-color', t.river);
  P('admin1-line-1', 'line-color', t.border); P('admin1-line-2', 'line-color', t.border);
  for (const k of [0, 1, 2]) P('rivers-line-' + k, 'line-color', ['case', ['==', ['get', 'w'], 1], t['river-wine'], t.river]);
  P('rivers-lab-2', 'text-color', t.muted); P('rivers-lab-2', 'text-halo-color', t.halo);
  for (const id of ['lab-1', 'lab-2', 'lab-3', 'fine-lab', 'extra-lab', 'extra-flab']) { P(id, 'text-color', t['map-label-wine']); P(id, 'text-halo-color', t.halo); }
  P('rivers-lab', 'text-color', t['river-wine']); P('rivers-lab', 'text-halo-color', t.halo);
  for (const k of [0, 1, 2]) { P('towns-' + k, 'text-color', ['case', ['==', ['get', 'w'], 1], t['map-label-wine'], t['map-label']]); P('towns-' + k, 'text-halo-color', t.halo); }
  P('site-icon', 'text-color', t.text); P('site-icon', 'text-halo-color', t.halo);
  P('reg-lab', 'text-color', ['case', fs('hover'), t.highlight, t.text]); P('reg-lab', 'text-halo-color', t.halo);
  P('reg-line', 'line-color', ['case', fs('hover'), t.highlight, t.text]);
  if (map.getLayer('clab')) for (const [k, v] of Object.entries(clabPaint())) P('clab', k, v);
  try { map.setSky(skySpec()); } catch (e) { /* older engine */ }
  _pal = null;
  repaintApps();
  applyGrapeOverview();
  if (typeof bmAfterRepaint === 'function') bmAfterRepaint();
}
function setMode(m) { S.mode = m; store.set('mode', m); repaintApps(); APP.emit('mode'); }
const LAYER_GROUPS = {
  apps: () => [...S.sources.flatMap(k => [k + '-fill', k + '-line', k + '-sel']), 'ov-glow', 'ov-core', 'extra-pt', 'extra-fpt', 'extra-glow'],
  labels: () => ['lab-1', 'lab-2', 'lab-3', 'fine-lab', 'extra-lab', 'extra-flab', 'clab', 'reg-lab', 'rivers-lab', 'rivers-lab-2', 'towns-0', 'towns-1', 'towns-2'],
  sites: () => ['site-icon'], rivers: () => ['rivers-line-0', 'rivers-line-1', 'rivers-line-2', 'rivers-lab', 'rivers-lab-2'], lakes: () => ['lakes-fill'],
  regions: () => ['reg-line', 'reg-lab'], belt: () => ['belt-fill', 'belt-edge'], grat: () => ['grat-line'], towns: () => ['towns-0', 'towns-1', 'towns-2']
};
function applyLayerVis() {
  if (!map) return;
  const L = S.layers;
  const on = id => {
    if (/^lab-|^fine-lab|^extra-lab|^extra-flab/.test(id)) return L.labels && L.apps;
    if (id === 'clab') return L.labels;
    if (id === 'reg-lab') return L.labels && L.regions;
    if (/^rivers-lab/.test(id)) return L.labels && L.rivers;
    if (/^towns-/.test(id)) return L.labels && L.towns;
    for (const [g, f] of Object.entries(LAYER_GROUPS)) if (g !== 'labels' && f().includes(id)) return L[g];
    return true;
  };
  const all = new Set(Object.values(LAYER_GROUPS).flatMap(f => f()));
  for (const id of all) if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', on(id) ? 'visible' : 'none');
  store.set('layers', S.layers);
  if (typeof bmAfterLayerVis === 'function') bmAfterLayerVis();
  enforceLabelsHidden();
}

/* ---------- camera ---------- */
function camPad() {
  const app = $('#app').getBoundingClientRect();
  const mast = $('.mast').getBoundingClientRect();
  const sheetOpen = $('#app').dataset.sheet === 'open';
  const p = { top: Math.max(40, mast.bottom - app.top + 16), bottom: 40, left: 40, right: 40 };
  if (MQ.phone.matches) {
    p.left = p.right = 24;
    if (sheetOpen) p.bottom = (parseFloat(getComputedStyle($('#app')).getPropertyValue('--sheet-h')) || 0) + 20;
    else p.bottom = ($('#cartouche').offsetHeight || 0) + 24;
  } else {
    p.left = Math.max(40, mast.right - app.left > app.width * 0.5 ? 40 : 40);
    if (sheetOpen) p.right = ($('#sheet').offsetWidth || 440) + 40;
    if (!$('#strip').hidden) p.bottom = $('#strip').offsetHeight + 30;
    p.top = 40;
    p.left = mast.right - app.left + 20 < app.width * 0.4 ? Math.max(40, Math.min(mast.right - app.left + 10, 300)) : 40;
  }
  // guard against degenerate padding on short screens
  const h = app.height, w = app.width;
  if (p.top + p.bottom > h - 80) { const k = (h - 80) / (p.top + p.bottom); p.top *= k; p.bottom *= k; }
  if (p.left + p.right > w - 80) { const k = (w - 80) / (p.left + p.right); p.left *= k; p.right *= k; }
  return p;
}
const mercY = lat => (1 - Math.log(Math.tan(Math.PI / 4 + clamp(lat, -85, 85) * Math.PI / 360)) / Math.PI) / 2;
const unMercY = y => (360 / Math.PI) * Math.atan(Math.exp((1 - 2 * y) * Math.PI)) - 90;
function cameraFor(bb, pad, maxZoom) {
  const el = map.getContainer();
  const W = Math.max(60, el.clientWidth - pad.left - pad.right), Hh = Math.max(60, el.clientHeight - pad.top - pad.bottom);
  let [w, s, e, n] = bb;
  if (e < w) e += 360;
  const dx = Math.max((e - w) / 360, 1e-6), y0 = mercY(n), y1 = mercY(s), dy = Math.max(y1 - y0, 1e-6);
  const z = Math.min(Math.log2(W / (512 * dx)), Math.log2(Hh / (512 * dy)));
  return { center: [(((w + e) / 2 + 540) % 360) - 180, unMercY((y0 + y1) / 2)], zoom: clamp(z, 0.8, maxZoom ?? 12.5) };
}
/* the main body of a country's appellations, leaving out far islands (Canaries, Azores, Hawaii) */
const _mainBox = new Map();
function mainBbox(iso) {
  if (_mainBox.has(iso)) return _mainBox.get(iso);
  const pts = D.index.filter(a => a.country === iso && !a.fine && Array.isArray(a.lp) && Array.isArray(a.bbox));
  if (pts.length < 3) return D.countries[iso]?.bbox || null;
  const lab = new Array(pts.length).fill(-1);
  let k = 0;
  for (let i = 0; i < pts.length; i++) {
    if (lab[i] >= 0) continue;
    const q = [i]; lab[i] = k;
    while (q.length) {
      const a = pts[q.pop()].lp;
      for (let j = 0; j < pts.length; j++) if (lab[j] < 0) { const b = pts[j].lp; if (Math.abs(a[0] - b[0]) < 8 && Math.abs(a[1] - b[1]) < 8) { lab[j] = k; q.push(j); } }
    }
    k++;
  }
  const size = new Array(k).fill(0);
  lab.forEach(c => size[c]++);
  const keep = new Set(size.map((n, c) => [n, c]).filter(([n]) => n >= pts.length * 0.12).map(([, c]) => c));
  let bb = [180, 90, -180, -90];
  pts.forEach((a, i) => {
    if (!keep.has(lab[i])) return;
    // ignore the extent of huge umbrella zones, keep their label point
    const b = a.area > 50000 ? [a.lp[0], a.lp[1], a.lp[0], a.lp[1]] : a.bbox;
    bb = [Math.min(bb[0], b[0]), Math.min(bb[1], b[1]), Math.max(bb[2], b[2]), Math.max(bb[3], b[3])];
  });
  if (bb[0] > bb[2]) bb = D.countries[iso]?.bbox || null;
  _mainBox.set(iso, bb);
  return bb;
}
/* where to start exploring a country: its main body if that fits at appellation zoom, otherwise
   the densest knot of appellations (Napa and Sonoma, Mendoza, the Barossa) */
function exploreBbox(iso) {
  const bb = mainBbox(iso);
  if (!bb || !map) return bb;
  if (cameraFor(bb, camPad(), 12).zoom >= Z_APP) return bb;
  const pts = D.index.filter(a => a.country === iso && !a.fine && Array.isArray(a.lp) && (a.area || 0) < 20000);
  if (!pts.length) return bb;
  const cell = 2.5, grid = new Map();
  for (const a of pts) { const k = Math.floor(a.lp[0] / cell) + ':' + Math.floor(a.lp[1] / cell); grid.set(k, (grid.get(k) || 0) + 1 + (a.prof ? 1 : 0)); }
  let best = null, bestN = -1;
  for (const [k] of grid) {
    const [x, y] = k.split(':').map(Number);
    let n = 0; for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) n += grid.get((x + dx) + ':' + (y + dy)) || 0;
    if (n > bestN) { bestN = n; best = [x, y]; }
  }
  const cx = (best[0] + 0.5) * cell, cy = (best[1] + 0.5) * cell;
  const near = pts.filter(a => Math.abs(a.lp[0] - cx) <= cell * 1.5 && Math.abs(a.lp[1] - cy) <= cell * 1.5);
  const out = [180, 90, -180, -90];
  for (const a of near) { out[0] = Math.min(out[0], a.lp[0]); out[1] = Math.min(out[1], a.lp[1]); out[2] = Math.max(out[2], a.lp[0]); out[3] = Math.max(out[3], a.lp[1]); }
  return [out[0] - 0.3, out[1] - 0.3, out[2] + 0.3, out[3] + 0.3];
}
function flyBbox(bb, opts = {}) {
  if (!map || !bb) return;
  stopSpin();
  const pad = camPad();
  const cam = cameraFor(bb, pad, opts.maxZoom);
  if (opts.minZoom) cam.zoom = Math.max(cam.zoom, opts.minZoom);
  cam.padding = pad;
  move(cam, opts);
}
function flyPoint(lon, lat, zoom, opts = {}) {
  if (!map || lon == null || lat == null) return;
  stopSpin();
  const p = camPad();
  move({ center: [lon, lat], zoom: zoom ?? Math.max(map.getZoom(), 7), padding: p }, opts);
}
function move(cam, opts = {}) {
  const o = { center: cam.center, zoom: cam.zoom, bearing: S.keepCam ? map.getBearing() : 0, pitch: S.keepCam ? map.getPitch() : 0, padding: cam.padding || camPad() };
  if (MQ.rm.matches || opts.instant) { map.jumpTo(o); return; }
  const fly = { ...o, curve: opts.curve ?? 1.42, speed: opts.speed ?? 1.1, maxDuration: opts.maxDuration ?? 4200, essential: false };
  if (opts.duration != null) fly.duration = opts.duration;
  map.stop();
  map.flyTo(fly);
}
/* ---------- auto-rotation ---------- */
let _spin = 0, _spinLast = 0;
function startSpin() {
  if (MQ.rm.matches || S.interacted || store.get('view', null)) return;
  const step = t => {
    if (S.interacted) return;
    if (_spinLast && !map.isMoving()) {
      const dt = Math.min(64, t - _spinLast);
      const c = map.getCenter();
      if (map.getZoom() < 3) map.jumpTo({ center: [c.lng - dt * 0.0035, c.lat] });
    }
    _spinLast = t;
    _spin = requestAnimationFrame(step);
  };
  _spin = requestAnimationFrame(step);
}
function stopSpin() { S.interacted = true; cancelAnimationFrame(_spin); $('#app').dataset.active = 'true'; }

/* ---------- readouts ---------- */
let _ro = 0;
function updateReadout() {
  if (_ro) return;
  _ro = requestAnimationFrame(() => {
    _ro = 0;
    const c = map.getCenter(), z = map.getZoom();
    $('#coords').textContent = `${fmtLat(c.lat)} ${fmtLon(((c.lng + 540) % 360) - 180)}`;
    $('#zl').textContent = `z ${z.toFixed(1)}`;
    const br = map.getBearing(), cp = $('#compass');
    cp.querySelector('svg').style.transform = `rotate(${-br}deg)`;
    const turned = Math.abs(br) > 0.5;
    if (cp.dataset.rot !== String(+turned)) { cp.dataset.rot = String(+turned); }
    cp.setAttribute('aria-label', turned ? `Face north (the map is turned ${Math.round(((br % 360) + 360) % 360)}°)` : 'Face north');
    // scale bar: nice round distance for ~72px
    const mpp = 40075016.686 * Math.cos(c.lat * Math.PI / 180) / (512 * Math.pow(2, z));
    const target = mpp * 72;
    const pow = Math.pow(10, Math.floor(Math.log10(target)));
    const nice = [1, 2, 5, 10].map(k => k * pow).filter(v => v <= target).pop() || pow;
    const px = nice / mpp;
    const lab = nice >= 1000 ? `${fmt(nice / 1000)} km` : `${fmt(nice)} m`;
    $('#scale').innerHTML = `<span class="bar" style="width:${Math.round(px)}px"></span><span>${lab}</span>`;
  });
}

/* ---------- interaction ---------- */
function fillLayers() { return S.sources.map(k => k + '-fill').filter(id => map.getLayer(id) && map.getLayoutProperty(id, 'visibility') !== 'none'); }
function present(ids) { return ids.filter(id => map.getLayer(id) && map.getLayoutProperty(id, 'visibility') !== 'none'); }
function hitTest(point, touch) {
  const z = map.getZoom();
  const r = touch ? 12 : 6;
  const box = [[point.x - r, point.y - r], [point.x + r, point.y + r]];
  const q = (layers, geom = box) => { const l = present(layers); return l.length ? map.queryRenderedFeatures(geom, { layers: l }) : []; };
  if (z >= 7.8) { const s = q(['site-icon']); if (s.length) return { type: 'site', id: s[0].properties.id, ref: { src: 'sites', id: s[0].properties.id } }; }
  const ex = z >= 3.2 ? q(['extra-pt', 'extra-fpt']) : [];
  if (ex.length) return { type: 'app', id: ex[0].properties.id, ref: { src: 'extra', id: ex[0].properties.id }, stack: [] };
  const rl = q(['reg-lab']);
  if (rl.length) return { type: 'region', id: rl[0].properties.id, ref: { src: 'reg-pts', id: rl[0].properties.id } };
  if (z >= Z_APP) {
    const apps = q(fillLayers(), point);
    if (apps.length) {
      const seen = new Map();
      for (const f of apps) if (!seen.has(f.properties.id)) seen.set(f.properties.id, f);
      const stack = [...seen.values()].sort((a, b) => (b.properties.area || 0) - (a.properties.area || 0)).map(f => f.properties.id);
      const top = stack[stack.length - 1];
      return { type: 'app', id: top, ref: { src: seen.get(top).source, id: top }, stack };
    }
    const reg = q(['reg-line'], [[point.x - 5, point.y - 5], [point.x + 5, point.y + 5]]);
    if (reg.length) return { type: 'region', id: reg[0].properties.id, ref: { src: 'regions', id: reg[0].properties.id } };
  }
  let land = z >= 3.5 && map.getLayer('land-hi-fill') ? q(['land-hi-fill'], point) : [];
  if (!land.length) land = q(['land-fill'], point);
  if (land.length && land[0].properties.iso2) return { type: 'country', id: land[0].properties.iso2, ref: { src: land[0].source, id: land[0].properties.iso2 }, name: land[0].properties.name };
  return null;
}
function bindMapEvents() {
  const stop = () => { if (!S.interacted) stopSpin(); };
  for (const ev of ['mousedown', 'touchstart', 'wheel', 'dragstart']) map.on(ev, stop);
  map.getCanvas().addEventListener('keydown', stop);
  map.on('move', updateReadout);
  map.on('movestart', e => { if (!e.originalEvent) { $('#tip').hidden = true; setHover(null); } });
  map.on('moveend', () => { if (S.flying) return; checkViewport(); const c = map.getCenter(); if (S.interacted) store.set('view', { c: [+c.lng.toFixed(3), +c.lat.toFixed(3)], z: +map.getZoom().toFixed(2) }); });
  map.on('zoomend', checkViewport);
  let raf = 0, lastPt = null;
  map.on('mousemove', e => {
    if (!MQ.hover.matches || VMX.tap) return;
    lastPt = e.point;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const lt = layerTapHit(lastPt, false, true);
      if (lt) {
        let info = null;
        try { info = lt.reg.hover(lt.feature); } catch (er) { /* module hover failed */ }
        if (info && info.name) {
          setHover(null);
          map.getCanvas().style.cursor = 'pointer';
          const tip = $('#tip');
          tip.innerHTML = `<div class="t-name">${esc(info.name)}</div>${info.meta ? `<div class="t-meta">${esc(info.meta)}</div>` : ''}`;
          tip.hidden = false;
          const W = $('#app').clientWidth;
          tip.style.left = Math.min(lastPt.x, W - tip.offsetWidth - 24) + 'px'; tip.style.top = lastPt.y + 'px';
          return;
        }
      }
      const h = hitTest(lastPt, false);
      const z = map.getZoom();
      const ok = h && !(h.type === 'country' && z >= Z_APP + 0.5);
      setHover(ok ? h.ref : null);
      map.getCanvas().style.cursor = ok ? 'pointer' : '';
      const tip = $('#tip');
      if (!ok) { tip.hidden = true; return; }
      let name = '', meta = '';
      if (h.type === 'app') { const a = D.byId.get(h.id) || D.feat.get(h.id) || D.extraById.get(h.id) || {}; name = a.name || h.id; meta = [a.subcat || a.cat, countryName(a.country)].filter(Boolean).join(' · '); }
      else if (h.type === 'site') { const s = D.siteById.get(h.id) || {}; name = s.name; meta = [KIND[s.kind], s.class].filter(Boolean).join(' · '); }
      else if (h.type === 'region') { const r = D.regionById.get(h.id) || {}; name = r.name; meta = 'Wine region · ' + countryName(r.country); }
      else { name = D.countries[h.id]?.name || h.name || countryName(h.id); const m = D.countries[h.id]; meta = m ? [m.tier ? TIER[m.tier] : 'Wine country', m.count ? `${fmt(m.count)} appellations mapped` : ''].filter(Boolean).join(' · ') : 'Not in the atlas yet'; }
      tip.innerHTML = `<div class="t-name">${esc(name)}</div>${meta ? `<div class="t-meta">${esc(meta)}</div>` : ''}`;
      tip.hidden = false;
      const W = $('#app').clientWidth;
      const x = Math.min(lastPt.x, W - tip.offsetWidth - 24);
      tip.style.left = x + 'px'; tip.style.top = lastPt.y + 'px';
    });
  });
  map.getCanvas().addEventListener('mouseleave', () => { setHover(null); $('#tip').hidden = true; });
  map.on('click', e => {
    if (!VMX.tap) {
      const lt = layerTapHit(e.point, !MQ.hover.matches, false);
      if (lt) { $('#tip').hidden = true; try { lt.reg.fn({ feature: lt.feature, features: lt.features, lngLat: e.lngLat, point: e.point }); } catch (er) { console.warn('[VM layer tap]', er); } return; }
    }
    if (VMX.tap) { $('#tip').hidden = true; try { VMX.tap({ lngLat: e.lngLat, point: e.point, features: map.queryRenderedFeatures(e.point) }); } catch (er) { console.warn('[VM tap]', er); } return; }
    const touch = !MQ.hover.matches;
    const h = hitTest(e.point, touch);
    $('#tip').hidden = true;
    if (!h) return;
    if (h.type === 'country') {
      if (D.countries[h.id]) APP.nav(h.id);
      else APP.toast(`${h.name || countryName(h.id)} is not in the atlas yet.`);
      return;
    }
    if (h.type === 'app') { APP.pendingStack = h.stack && h.stack.length > 1 ? h.stack : null; APP.nav(h.id, { fromMap: true }); return; }
    APP.nav(h.id, { fromMap: true });
  });
}
