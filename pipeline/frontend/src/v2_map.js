/* Vitis Mundi v2: base maps (standard, satellite, topographic), national aerial and topographic maps, 3D terrain,
   relief shading, contour lines, the sunlight explorer and river journeys. Everything here needs the network, so it
   is switched on only in the Pages build (VM.mode === 'gh'); the artifact build keeps v1 exactly. */
const GH = () => VM.mode === 'gh';
const BM = {
  base: 'standard',                 /* 'standard' | 'satellite' | 'topo' */
  terrain: false,                   /* 3D terrain on */
  exag: clamp(+store.get('exag', 1.4) || 1.4, 1, 3),
  shade: store.get('shade', true),  /* relief shading on the standard map */
  contours: store.get('contours', false),
  sun: null,                        /* sunlight explorer: {doy, t} or null */
  cover: null,                      /* coverage polygons in Web Mercator units */
  coverP: null,
  contourP: null,
  errs: 0
};
const TERRARIUM = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
const EOX_YEAR = 2025;
const EOX = `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-${EOX_YEAR}_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg`;
const CONTOUR_LIB = 'https://cdn.jsdelivr.net/npm/maplibre-contour@0.1.1/dist/index.min.js';
/* optional: a MapTiler key in VM_CONFIG.maptilerKey switches satellite and terrain to MapTiler's global
   high-resolution imagery and terrain-RGB (their terms apply; the national services stay on top) */
const MT = () => String((window.VM_CONFIG && VM_CONFIG.maptilerKey) || '').trim();
const mtURL = set => `https://api.maptiler.com/tiles/${set}/tiles.json?key=${encodeURIComponent(MT())}`;

/* ---------- credits (also listed in the About view) ---------- */
const CREDIT = {
  eox: { t: `Sentinel-2 cloudless ${EOX_YEAR} by EOX`, u: 'https://cloudless.eox.at', l: 'CC BY-NC-SA 4.0, contains modified Copernicus Sentinel data' },
  otm: { t: 'OpenTopoMap', u: 'https://opentopomap.org', l: 'CC BY-SA; map data © OpenStreetMap contributors, SRTM' },
  maptiler: { t: '© MapTiler © OpenStreetMap contributors', u: 'https://www.maptiler.com/copyright/', l: 'MapTiler imagery and terrain, used with a key' },
  aws: { t: 'Terrain Tiles (Mapzen, AWS Open Data)', u: 'https://registry.opendata.aws/terrain-tiles/', l: 'USGS 3DEP and SRTM, Copernicus EU-DEM, and others' },
  ign: { t: 'IGN France', u: 'https://geoservices.ign.fr', l: 'Géoplateforme, Licence Ouverte 2.0' },
  swiss: { t: '© swisstopo', u: 'https://www.swisstopo.admin.ch', l: 'free geodata (OGD)' },
  bmap: { t: 'basemap.at', u: 'https://basemap.at', l: 'CC BY 4.0' },
  ignes: { t: 'PNOA and MTN © Instituto Geográfico Nacional', u: 'https://www.ign.es', l: 'CC BY 4.0 scne.es' },
  dgt: { t: 'Ortofotos 2021 © Direção-Geral do Território', u: 'https://www.dgterritorio.gov.pt', l: 'open data' },
  usgs: { t: 'USGS The National Map', u: 'https://www.usgs.gov/programs/national-geospatial-program/national-map', l: 'public domain' },
  rlp: { t: '© GeoBasis-DE / LVermGeoRP (2026)', u: 'https://lvermgeo.rlp.de', l: 'dl-de/by-2-0' },
  he: { t: '© GeoBasis-DE / HVBG (2026)', u: 'https://hvbg.hessen.de', l: 'free use under § 18 HVGG' },
  bw: { t: 'LGL-BW (2026)', u: 'https://www.lgl-bw.de', l: 'dl-de/by-2-0' },
  by: { t: 'Bayerische Vermessungsverwaltung', u: 'https://geodaten.bayern.de', l: 'CC BY 4.0' },
  lu: { t: 'Administration du cadastre et de la topographie', u: 'https://geoportail.lu', l: 'open data' },
  nsw: { t: '© Spatial Services NSW', u: 'https://www.spatial.nsw.gov.au', l: 'CC BY 4.0' }
};

/* ---------- national services, clipped to their country (or state) ---------- */
const wmts = (base, layer, fmt, tms = 'PM') => (z, x, y) => `${base}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layer}&STYLE=normal&TILEMATRIXSET=${tms}&TILEMATRIX=${z}&TILEROW=${y}&TILECOL=${x}&FORMAT=${fmt}`;
const wms = (base, layer, fmt, ver = '1.3.0') => (z, x, y) => `${base}${base.includes('?') ? '&' : '?'}SERVICE=WMS&VERSION=${ver}&REQUEST=GetMap&LAYERS=${layer}&STYLES=&${ver === '1.3.0' ? 'CRS' : 'SRS'}=EPSG:3857&BBOX=${tileBBox(z, x, y)}&WIDTH=256&HEIGHT=256&FORMAT=${fmt}`;
const NAT = {
  'ni-fr': { cover: 'fr', max: 19, c: 'ign', url: wmts('https://data.geopf.fr/wmts', 'ORTHOIMAGERY.ORTHOPHOTOS', 'image/jpeg') },
  'ni-ch': { cover: 'ch', max: 19, c: 'swiss', url: (z, x, y) => `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/${z}/${x}/${y}.jpeg` },
  'ni-at': { cover: 'at', max: 19, c: 'bmap', url: (z, x, y) => `https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/${z}/${y}/${x}.jpeg` },
  'ni-es': { cover: 'es', max: 19, c: 'ignes', url: (z, x, y) => `https://www.ign.es/wmts/pnoa-ma?service=WMTS&request=GetTile&version=1.0.0&Format=image/jpeg&layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix=${z}&TileRow=${y}&TileCol=${x}` },
  'ni-pt': { cover: 'pt', max: 18, c: 'dgt', url: wms('https://cartografia.dgterritorio.gov.pt/ortos2021/service', 'Ortos2021-RGB', 'image/png', '1.1.1') },
  'ni-us': { cover: 'us', max: 16, c: 'usgs', url: (z, x, y) => `https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/${z}/${y}/${x}` },
  'ni-de-rp': { cover: 'de-rp', max: 19, c: 'rlp', url: wms('https://geo4.service24.rlp.de/wms/rp_dop20.fcgi', 'rp_dop20', 'image/jpeg') },
  'ni-de-he': { cover: 'de-he', max: 19, c: 'he', url: wms('https://www.gds-srv.hessen.de/cgi-bin/lika-services/ogc-free-images.ows', 'he_dop20_rgb', 'image/jpeg') },
  'ni-de-bw': { cover: 'de-bw', max: 19, c: 'bw', url: wms('https://owsproxy.lgl-bw.de/owsproxy/ows/WMS_LGL-BW_ATKIS_DOP_20_C', 'IMAGES_DOP_20_RGB', 'image/jpeg') },
  'ni-de-by': { cover: 'de-by', max: 18, c: 'by', url: wms('https://geoservices.bayern.de/od/wms/dop/v1/dop40', 'by_dop40c', 'image/jpeg') },
  'ni-lu': { cover: 'lu', max: 19, c: 'lu', url: (z, x, y) => `https://wmts.geoportail.lu/opendata/wmts/ortho_latest/GLOBAL_WEBMERCATOR_4_V3/${z}/${x}/${y}.jpeg` },
  'ni-au-nsw': { cover: 'au-nsw', max: 19, c: 'nsw', url: (z, x, y) => `https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer/tile/${z}/${y}/${x}` },
  'nt-fr': { cover: 'fr', min: 8, max: 18, c: 'ign', topo: 1, url: wmts('https://data.geopf.fr/wmts', 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2', 'image/png') },
  'nt-ch': { cover: 'ch', min: 8, max: 18, c: 'swiss', topo: 1, url: (z, x, y) => `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/${z}/${x}/${y}.jpeg` },
  'nt-at': { cover: 'at', min: 8, max: 18, c: 'bmap', topo: 1, url: (z, x, y) => `https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/${z}/${y}/${x}.png` },
  'nt-es': { cover: 'es', min: 8, max: 17, c: 'ignes', topo: 1, url: (z, x, y) => `https://www.ign.es/wmts/mapa-raster?service=WMTS&request=GetTile&version=1.0.0&Format=image/jpeg&layer=MTN&style=default&tilematrixset=GoogleMapsCompatible&TileMatrix=${z}&TileRow=${y}&TileCol=${x}` },
  'nt-us': { cover: 'us', min: 8, max: 16, c: 'usgs', topo: 1, url: (z, x, y) => `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/${z}/${y}/${x}` }
};
const NAT_MIN = 12.5;               /* national aerial photos replace Sentinel-2 from here (z13 tiles: below that
                                       several services serve their own satellite mosaics, which would patchwork) */

/* ---------- Web Mercator helpers ---------- */
const R_EARTH = 6378137, HALF = Math.PI * R_EARTH;
function tileBBox(z, x, y) {
  const n = 2 ** z, s = 2 * HALF / n;
  return [-HALF + x * s, HALF - (y + 1) * s, -HALF + (x + 1) * s, HALF - y * s].map(v => v.toFixed(2)).join(',');
}
const mx = lon => (lon + 180) / 360;
const my = lat => (1 - Math.log(Math.tan(Math.PI / 4 + clamp(lat, -85.05, 85.05) * Math.PI / 360)) / Math.PI) / 2;

function loadCover() {
  if (!BM.coverP) {
    BM.coverP = (has('data/map/cover.json') ? getJSON('data/map/cover.json') : Promise.resolve(null)).then(j => {
      const out = {};
      for (const [k, v] of Object.entries(j || {})) {
        const rings = [];
        for (const poly of v.poly) for (const ring of poly) {
          const pts = ring.map(c => [mx(c[0]), my(c[1])]);
          let b = [9, 9, -9, -9];
          for (const p of pts) { b = [Math.min(b[0], p[0]), Math.min(b[1], p[1]), Math.max(b[2], p[0]), Math.max(b[3], p[1])]; }
          rings.push({ pts, b });
        }
        const bb = v.bbox;
        out[k] = { rings, mb: [mx(bb[0]), my(bb[3]), mx(bb[2]), my(bb[1])], bbox: bb };
      }
      BM.cover = out;
      return out;
    });
  }
  return BM.coverP;
}
/* does a segment touch an axis-aligned rectangle (Liang-Barsky) */
function segHits(x0, y0, x1, y1, r) {
  let t0 = 0, t1 = 1;
  const dx = x1 - x0, dy = y1 - y0;
  for (const [p, q] of [[-dx, x0 - r[0]], [dx, r[2] - x0], [-dy, y0 - r[1]], [dy, r[3] - y0]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}
function inCover(cov, x, y) {
  let inside = false;
  for (const r of cov.rings) {
    if (x < r.b[0] || x > r.b[2] || y < r.b[1] || y > r.b[3]) continue;
    const p = r.pts;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      if ((p[i][1] > y) !== (p[j][1] > y) && x < (p[j][0] - p[i][0]) * (y - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) inside = !inside;
    }
  }
  return inside;
}
/* 0 = tile outside the coverage, 1 = on its edge (clip), 2 = fully inside */
function tileRel(cov, z, x, y) {
  const n = 2 ** z;
  return rectRel(cov, [x / n, y / n, (x + 1) / n, (y + 1) / n]);
}
function rectRel(cov, r) {
  if (cov.mb[0] > r[2] || cov.mb[2] < r[0] || cov.mb[1] > r[3] || cov.mb[3] < r[1]) return 0;
  for (const ring of cov.rings) {
    if (ring.b[0] > r[2] || ring.b[2] < r[0] || ring.b[1] > r[3] || ring.b[3] < r[1]) continue;
    const p = ring.pts;
    for (let i = 1; i < p.length; i++) if (segHits(p[i - 1][0], p[i - 1][1], p[i][0], p[i][1], r)) return 1;
  }
  return inCover(cov, (r[0] + r[2]) / 2, (r[1] + r[3]) / 2) ? 2 : 0;
}
const emptyTile = () => createImageBitmap(new ImageData(1, 1));
function canvas(w, h) {
  if (typeof OffscreenCanvas === 'function') return new OffscreenCanvas(w, h);
  const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
}
/* vmimg://<service>/<z>/<x>/<y>: fetch a national tile only where it touches its country, and clip it to the border */
function registerImgProtocol() {
  if (registerImgProtocol.done) return;
  registerImgProtocol.done = true;
  maplibregl.addProtocol('vmimg', async (params, abort) => {
    const m = params.url.match(/^vmimg:\/\/([a-z-]+)\/(\d+)\/(\d+)\/(\d+)/);
    const svc = m && NAT[m[1]];
    if (!svc) return { data: await emptyTile() };
    const z = +m[2], x = +m[3], y = +m[4];
    const covs = await loadCover();
    const cov = covs[svc.cover];
    const rel = cov ? tileRel(cov, z, x, y) : 2;
    if (!rel) return { data: await emptyTile() };
    let res;
    try { res = await fetch(svc.url(z, x, y), { signal: abort?.signal, mode: 'cors', credentials: 'omit' }); } catch (e) {
      if (e.name === 'AbortError') throw e;
      return { data: await emptyTile() };
    }
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !/^image\//.test(ct)) return { data: await emptyTile() };
    const blob = await res.blob();
    if (rel === 2) return { data: await blob.arrayBuffer() };
    const bmp = await createImageBitmap(blob);
    const W = bmp.width, Hh = bmp.height, n = 2 ** z, x0 = x / n, y0 = y / n;
    const cv = canvas(W, Hh), ctx = cv.getContext('2d');
    ctx.beginPath();
    const tb = [x0, y0, (x + 1) / n, (y + 1) / n];
    for (const ring of cov.rings) {
      if (ring.b[0] > tb[2] || ring.b[2] < tb[0] || ring.b[1] > tb[3] || ring.b[3] < tb[1]) continue;
      ring.pts.forEach((p, i) => { const px = (p[0] - x0) * n * W, py = (p[1] - y0) * n * Hh; if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
      ctx.closePath();
    }
    ctx.clip('evenodd');
    ctx.drawImage(bmp, 0, 0);
    bmp.close && bmp.close();
    const out = cv.transferToImageBitmap ? cv.transferToImageBitmap() : await createImageBitmap(cv);
    return { data: out };
  });
}
function bmTileError(src, msg) {
  BM.errs++;
  if (BM.errs === 6 && navigator.onLine === false) APP.toast('Offline: map tiles you have not viewed before cannot load.');
}

/* ---------- label ink over imagery and paper maps ---------- */
function baseInk(t) {
  if (!GH() || BM.base === 'standard') return {};
  if (BM.base === 'satellite') return {
    text: '#f6f1e4', muted: '#d9d3c6', faint: '#b9b3a8', 'map-label': '#efe9dc', 'map-label-wine': '#fff8ea',
    halo: 'rgba(14,16,22,.86)', 'river-wine': '#a9d3f5', river: '#7fb2dc', border: '#f1ece2'
  };
  return { /* topographic: a light paper map in both themes */
    text: '#1c2030', muted: '#4b5263', faint: '#7a8190', 'map-label': '#2f3546', 'map-label-wine': '#1c2030',
    halo: 'rgba(250,249,244,.92)', 'river-wine': '#24578a', river: '#4f7fa8', border: '#5c6474',
    'w-white': '#8e7a1a', 'w-sparkling': '#7b7a12', 'w-mixed': '#6a5f86'
  };
}
const MODE_K = { standard: [1, 1], satellite: [0.3, 1.45], topo: [0.5, 1.3] };

/* ---------- sources and layers ---------- */
function addRaster(id, tiles, o = {}) {
  if (map.getSource(id)) return;
  map.addSource(id, { type: 'raster', ...(typeof tiles === 'string' ? { url: tiles } : { tiles }), tileSize: o.size || 256, minzoom: o.min ?? 0, maxzoom: o.max ?? 18, ...(o.bounds ? { bounds: o.bounds } : {}) });
  map.addLayer({ id, type: 'raster', source: id, minzoom: o.layerMin ?? 0, layout: { visibility: 'none' }, paint: { 'raster-fade-duration': 220, ...(o.paint || {}) } }, 'belt-fill');
}
async function ensureBase(mode) {
  if (mode === 'satellite') {
    if (MT()) addRaster('bm-mt', mtURL('satellite-v2'), { max: 20, size: 512 });
    else addRaster('bm-eox', [EOX], { max: 14 });
    const cov = await loadCover();
    for (const [id, s] of Object.entries(NAT)) {
      if (s.topo || !cov[s.cover]) continue;
      addRaster(id, [`vmimg://${id}/{z}/{x}/{y}`], { min: Math.ceil(NAT_MIN), max: s.max, bounds: cov[s.cover].bbox, layerMin: NAT_MIN, paint: { 'raster-opacity': ['interpolate', ['linear'], ['zoom'], NAT_MIN, 0, NAT_MIN + 0.6, 1] } });
    }
  } else if (mode === 'topo') {
    addRaster('bm-otm', ['a', 'b', 'c'].map(s => `https://${s}.tile.opentopomap.org/{z}/{x}/{y}.png`), { max: 17 });
    const cov = await loadCover();
    for (const [id, s] of Object.entries(NAT)) {
      if (!s.topo || !cov[s.cover]) continue;
      addRaster(id, [`vmimg://${id}/{z}/{x}/{y}`], { min: s.min, max: s.max, bounds: cov[s.cover].bbox, layerMin: s.min, paint: { 'raster-opacity': ['interpolate', ['linear'], ['zoom'], s.min, 0, s.min + 0.8, 1] } });
    }
  }
}
function rasterIds(mode) {
  if (mode === 'satellite') return ['bm-eox', 'bm-mt', ...Object.keys(NAT).filter(k => !NAT[k].topo)];
  if (mode === 'topo') return ['bm-otm', ...Object.keys(NAT).filter(k => NAT[k].topo)];
  return [];
}
function setVis(id, on) {
  if (!map.getLayer(id)) return;
  const v = on ? 'visible' : 'none';
  if (map.getLayoutProperty(id, 'visibility') !== v) map.setLayoutProperty(id, 'visibility', v);
}
/* layers of the vector style that a raster base map replaces */
function applyBaseVis() {
  if (!map || !GH()) return;
  const std = BM.base === 'standard', sat = BM.base === 'satellite', L = S.layers;
  for (const m of ['satellite', 'topo']) for (const id of rasterIds(m)) setVis(id, BM.base === m);
  for (const id of ['land-fill', 'land-hi-fill']) setVis(id, std);
  setVis('lakes-fill', std && L.lakes);
  for (const k of [0, 1, 2]) setVis('rivers-line-' + k, std && L.rivers);
  for (const k of [1, 2]) setVis('admin1-line-' + k, std);
  for (const k of [0, 1, 2]) setVis('towns-' + k, (std || sat) && L.towns && L.labels);
  setVis('hillshade', !!(BM.sun || (std && BM.shade)));
  setVis('contour-line', BM.contours);
  setVis('contour-lab', BM.contours && L.labels);
  enforceLabelsHidden();
}
function bmAfterLayerVis() { applyBaseVis(); }
function bmAfterRepaint() {
  if (!map || !GH()) return;
  applyBaseVis();
  paintShade();
  paintContours();
  const dark = TOKRAW.dark;
  // keep imagery natural; dim the paper topo map a touch in the dark theme
  for (const id of rasterIds('topo')) if (map.getLayer(id)) {
    map.setPaintProperty(id, 'raster-brightness-max', dark ? 0.86 : 1);
    map.setPaintProperty(id, 'raster-saturation', dark ? -0.15 : 0);
  }
  if (map.getLayer('vmhl-sites')) map.setPaintProperty('vmhl-sites', 'circle-stroke-color', TOK.highlight);
  if (map.getLayer('rj-route')) map.setPaintProperty('rj-route', 'line-color', TOK.highlight);
}
async function setBase(mode, opts = {}) {
  if (!map || !GH()) return;
  if (!['standard', 'satellite', 'topo'].includes(mode)) mode = 'standard';
  BM.base = mode;
  if (!opts.temp) store.set('base', mode);
  if (mode !== 'standard') await ensureBase(mode);
  [S.fillK, S.lineK] = BM.sun ? [0.42, 1.3] : MODE_K[mode];
  repaintAll();
  updateAttrib();
  syncBmUI();
  vmEmit('basemap', mode);
}

/* relief shading: a raster-dem source of its own (3D terrain uses another, as MapLibre recommends) */
function ensureDem() {
  if (map.getSource('dem-shade')) return;
  const dem = MT() ? { url: mtURL('terrain-rgb-v2'), encoding: 'mapbox' } : { tiles: [TERRARIUM], encoding: 'terrarium', tileSize: 256 };
  map.addSource('dem-shade', { type: 'raster-dem', ...dem, maxzoom: MT() ? 14 : 15 });
  // the 3D mesh does not need the shading's detail: 512 px tiles from 256 px images quarter the requests and memory
  map.addSource('dem-terrain', { type: 'raster-dem', ...dem, ...(MT() ? {} : { tileSize: 512 }), maxzoom: 14 });
  map.addLayer({ id: 'hillshade', type: 'hillshade', source: 'dem-shade', minzoom: 5, layout: { visibility: 'none' }, paint: {} }, 'grat-line');
  paintShade();
}
function paintShade() {
  if (!map.getLayer('hillshade')) return;
  const dark = TOKRAW.dark, P = (k, v) => map.setPaintProperty('hillshade', k, v);
  if (BM.sun) {
    const s = sunNow();
    const alt = Math.max(0, s.alt);
    P('hillshade-method', 'basic');
    P('hillshade-illumination-anchor', 'map');
    P('hillshade-illumination-direction', +s.az.toFixed(1));
    P('hillshade-illumination-altitude', +clamp(alt, 0, 90).toFixed(1));
    P('hillshade-exaggeration', 1);
    P('hillshade-shadow-color', s.alt <= 0 ? 'rgba(4,6,18,.86)' : 'rgba(6,8,24,.8)');
    P('hillshade-highlight-color', dark ? 'rgba(255,214,140,.62)' : 'rgba(255,236,190,.7)');
    P('hillshade-accent-color', 'rgba(0,0,0,0)');
  } else {
    P('hillshade-method', 'standard');
    P('hillshade-illumination-anchor', 'viewport');
    P('hillshade-illumination-direction', 335);
    P('hillshade-exaggeration', ['interpolate', ['linear'], ['zoom'], 5, 0, 7, dark ? 0.32 : 0.26, 12, dark ? 0.42 : 0.34]);
    P('hillshade-shadow-color', dark ? 'rgba(0,0,0,.85)' : 'rgba(40,46,64,.62)');
    P('hillshade-highlight-color', dark ? 'rgba(235,230,220,.14)' : 'rgba(255,255,255,.55)');
    P('hillshade-accent-color', dark ? 'rgba(0,0,0,.25)' : 'rgba(40,46,64,.18)');
  }
  paintNight();
}
function setShade(on) { BM.shade = on; store.set('shade', on); if (on) ensureDem(); applyBaseVis(); updateAttrib(); syncBmUI(); }

/* 3D terrain; the globe projection does not support terrain, so 3D switches to Web Mercator and back */
const Z_3D = 5;
function setTerrain3D(on, opts = {}) {
  if (!map || !GH()) return;
  if (on && map.getZoom() < Z_3D && !opts.force) { APP.toast('Zoom in to a wine region first: 3D terrain works from zoom 5.'); syncBmUI(); return; }
  BM.terrain = on;
  ensureDem();
  if (on) {
    map.setProjection({ type: 'mercator' });
    map.setMaxPitch(80);
    map.setTerrain({ source: 'dem-terrain', exaggeration: BM.exag });
    S.keepCam = true;
    map.touchPitch.enable();
    try { map.dragRotate._pitchWithRotate = true; map.dragRotate.enable(); } catch (e) { /* private API changed */ }
    if (!opts.instant && map.getPitch() < 30) map.easeTo({ pitch: 58, duration: MQ.rm.matches ? 0 : 900 });
  } else {
    map.setTerrain(null);
    S.keepCam = false;
    // keep twist-to-rotate; tilting is a 3D gesture only
    map.touchPitch.disable();
    try { map.dragRotate._pitchWithRotate = false; map.dragRotate.disable(); map.dragRotate.enable(); } catch (e) { /* private API changed */ }
    // back to the globe only if 3D is still off by then (a journey or the sunlight explorer may have turned it on)
    let done = false;
    const back = () => {
      if (done || BM.terrain) return;
      done = true;
      // level the camera even when the easing was interrupted or is still crawling on a slow device
      if (map.getPitch() > 0.5 || Math.abs(map.getBearing()) > 0.5) { map.stop(); map.jumpTo({ pitch: 0, bearing: 0 }); }
      map.setMaxPitch(55); map.setProjection({ type: 'globe' });
    };
    if (opts.instant || MQ.rm.matches) { map.jumpTo({ pitch: 0, bearing: 0 }); back(); }
    else { map.easeTo({ pitch: 0, bearing: 0, duration: 700 }); map.once('moveend', back); setTimeout(back, 1100); }
  }
  $('#ctl3d').hidden = !on;
  updateAttrib();
  syncBmUI();
  vmEmit('terrain', { on, exaggeration: BM.exag });
}
function setExag(v) {
  BM.exag = clamp(+v || 1, 1, 3);
  store.set('exag', BM.exag);
  if (BM.terrain) map.setTerrain({ source: 'dem-terrain', exaggeration: BM.exag });
  const o = $('#bm-exag-v'); if (o) o.textContent = `${BM.exag.toFixed(1)}×`;
}

/* contour lines from the same terrain tiles (maplibre-contour builds them in a web worker) */
function loadContourLib() {
  if (!BM.contourP) BM.contourP = new Promise((res, rej) => {
    if (window.mlcontour) return res(window.mlcontour);
    const s = document.createElement('script');
    s.src = CONTOUR_LIB; s.async = true; s.crossOrigin = 'anonymous';
    s.onload = () => res(window.mlcontour); s.onerror = () => rej(new Error('contour library did not load'));
    document.head.appendChild(s);
  });
  return BM.contourP;
}
async function ensureContours() {
  if (map.getSource('contours')) return true;
  let lib;
  try { lib = await loadContourLib(); } catch (e) { APP.toast('Contour lines could not load.'); return false; }
  if (map.getSource('contours')) return true;
  const dem = new lib.DemSource({ url: TERRARIUM, encoding: 'terrarium', maxzoom: 13, worker: true, cacheSize: 120 });
  dem.setupMaplibre(maplibregl);
  map.addSource('contours', { type: 'vector', maxzoom: 15, tiles: [dem.contourProtocolUrl({
    multiplier: 1, overzoom: 1, elevationKey: 'ele', levelKey: 'level', contourLayer: 'contours',
    thresholds: { 9: [200, 1000], 10: [100, 500], 11: [50, 250], 12: [50, 250], 13: [20, 100], 14: [10, 50], 15: [10, 50] }
  })] });
  map.addLayer({ id: 'contour-line', type: 'line', source: 'contours', 'source-layer': 'contours', minzoom: 9, layout: { visibility: 'none', 'line-join': 'round' }, paint: {} }, 'anchor-lakes');
  map.addLayer({ id: 'contour-lab', type: 'symbol', source: 'contours', 'source-layer': 'contours', minzoom: 10, filter: ['>', ['get', 'level'], 0], layout: {
    visibility: 'none', 'symbol-placement': 'line', 'text-field': ['concat', ['number-format', ['get', 'ele'], {}], ' m'], 'text-font': F_RG,
    'text-size': 10.5, 'symbol-spacing': 360, 'text-max-angle': 25, 'text-padding': 4, 'text-letter-spacing': 0.04 }, paint: {} }, 'anchor-labels');
  paintContours();
  return true;
}
function paintContours() {
  if (!map.getLayer('contour-line')) return;
  const ink = BM.base === 'satellite' ? 'rgba(255,248,232,' : BM.base === 'topo' ? 'rgba(120,72,40,' : TOKRAW.dark ? 'rgba(214,206,190,' : 'rgba(92,70,52,';
  map.setPaintProperty('contour-line', 'line-color', ink + (BM.base === 'satellite' ? '0.55)' : '0.5)'));
  map.setPaintProperty('contour-line', 'line-width', ['match', ['get', 'level'], 1, 1.1, 0.55]);
  map.setPaintProperty('contour-line', 'line-opacity', ['interpolate', ['linear'], ['zoom'], 9, 0, 10, 0.9]);
  map.setPaintProperty('contour-lab', 'text-color', ink + '0.95)');
  map.setPaintProperty('contour-lab', 'text-halo-color', TOK.halo);
  map.setPaintProperty('contour-lab', 'text-halo-width', 1.2);
}
async function setContours(on) {
  BM.contours = on; store.set('contours', on);
  if (on && !(await ensureContours())) { BM.contours = false; }
  applyBaseVis(); updateAttrib(); syncBmUI();
  if (on && map.getZoom() < 10) APP.toast('Contour lines appear from zoom 10, labelled in metres.');
}

/* ---------- attribution (required in the map view for imagery and OpenTopoMap) ---------- */
let _attrT = 0;
function updateAttrib() {
  clearTimeout(_attrT);
  _attrT = setTimeout(() => {
    const el = $('#attrib');
    if (!el || !map) return;
    const keys = [], z = map.getZoom(), b = map.getBounds();
    const vr = [mx(b.getWest()), my(b.getNorth()), mx(b.getEast()), my(b.getSouth())];
    if (BM.base === 'satellite') keys.push(MT() ? 'maptiler' : 'eox');
    if (BM.base === 'topo') keys.push('otm');
    if (BM.cover && BM.base !== 'standard') {
      for (const s of Object.values(NAT)) {
        const want = BM.base === 'topo' ? s.topo : !s.topo;
        if (want && z >= (s.min ?? NAT_MIN) && BM.cover[s.cover] && !keys.includes(s.c) && rectRel(BM.cover[s.cover], vr)) keys.push(s.c);
      }
    }
    const dem = BM.terrain || BM.contours || BM.sun || (BM.base === 'standard' && BM.shade && z >= 5);
    if (dem && !keys.includes('maptiler')) keys.push(MT() ? 'maptiler' : 'aws');
    el.hidden = !keys.length;
    el.innerHTML = keys.map(k => `<a href="${esc(CREDIT[k].u)}" target="_blank" rel="noopener noreferrer" title="${esc(CREDIT[k].l)}">${esc(CREDIT[k].t)}</a>`).join('<span aria-hidden="true"> · </span>') +
      (keys.length ? ` <button type="button" class="attr-more" data-nav="about" aria-label="All sources and licences">ⓘ</button>` : '');
    placeFloaters();
  }, 120);
}

/* ---------- floating pieces: keep the attribution clear of the cartouche, sheet and dock ---------- */
function placeFloaters() {
  const app = $('#app'), at = $('#attrib');
  if (!app || !at) return;
  const ctl = $('#ctl');
  app.style.setProperty('--ctl-h', (ctl ? ctl.offsetHeight : 0) + 'px');
  if (!isPhone()) { at.style.bottom = ''; return; }
  const H0 = app.clientHeight;
  let top = H0;
  for (const sel of ['#cartouche', '#dock', '#sheet']) {
    const el = $(sel);
    if (!el || el.hidden || getComputedStyle(el).display === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.height) top = Math.min(top, r.top - app.getBoundingClientRect().top);
  }
  at.style.bottom = Math.max(8, H0 - top + 6) + 'px';
}

/* ---------- base map popover and controls ---------- */
const ICON = {
  layers: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 4 3 9l9 5 9-5z"/><path d="m3 13.5 9 5 9-5"/></svg>',
  tilt: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 18h16L16 8H8z"/><path d="M8 8 12 4l4 4"/></svg>',
  rot: '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18.5 12a6.5 6.5 0 1 1-2.2-4.9"/><path d="M17 3.5v4h-4"/></svg>',
  sun: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
  river: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3 7.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 5 -.6"/><path d="M3 12c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 5-.6"/><path d="M3 16.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 5-.6"/></svg>'
};
const BASES = [['standard', 'Standard'], ['satellite', 'Satellite'], ['topo', 'Topographic']];
function bmControlsHTML(px) {
  return `<div class="bm-bases" role="radiogroup" aria-label="Base map">${BASES.map(([k, l]) => `<label class="bm-base"><input type="radio" name="${px}-base" value="${k}" ${BM.base === k ? 'checked' : ''}><span class="bm-sw bm-sw-${k}" aria-hidden="true"></span><span class="bm-l">${l}</span></label>`).join('')}</div>
    <div class="toggles bm-togs">
      <label class="tog" for="${px}-3d"><span>3D terrain</span><input type="checkbox" id="${px}-3d" data-bm="terrain" ${BM.terrain ? 'checked' : ''}></label>
      <div class="bm-exag" ${BM.terrain ? '' : 'hidden'}><label for="${px}-exag">Relief exaggeration</label><input type="range" class="vm-range" id="${px}-exag" data-bm="exag" min="1" max="3" step="0.1" value="${BM.exag}"><span class="mono" id="bm-exag-v">${BM.exag.toFixed(1)}×</span></div>
      <label class="tog" for="${px}-shade"><span>Relief shading<small>on the standard map</small></span><input type="checkbox" id="${px}-shade" data-bm="shade" ${BM.shade ? 'checked' : ''}></label>
      <label class="tog" for="${px}-cont"><span>Contour lines<small>in metres, from zoom 10</small></span><input type="checkbox" id="${px}-cont" data-bm="contours" ${BM.contours ? 'checked' : ''}></label>
    </div>
    <div class="bm-go"><button type="button" class="btn small ghost" data-bmgo="sunlight">${ICON.sun}Sunlight</button><button type="button" class="btn small ghost" data-bmgo="journeys">${ICON.river}River journeys</button></div>`;
}
function bindBmControls(root) {
  root.querySelectorAll('input[type=radio][value]').forEach(r => r.addEventListener('change', () => { if (r.checked) setBase(r.value); }));
  root.querySelectorAll('[data-bm]').forEach(c => {
    const k = c.dataset.bm;
    if (k === 'exag') c.addEventListener('input', () => setExag(c.value));
    else c.addEventListener('change', () => { if (k === 'terrain') setTerrain3D(c.checked); if (k === 'shade') setShade(c.checked); if (k === 'contours') setContours(c.checked); });
  });
  root.querySelectorAll('[data-bmgo]').forEach(b => b.addEventListener('click', () => { closeBmPop(); APP._opts = {}; APP.nav(b.dataset.bmgo); }));
}
function syncBmUI() {
  for (const root of $$('#bmpop, .bm-section')) {
    root.querySelectorAll('input[type=radio][value]').forEach(r => { r.checked = r.value === BM.base; });
    root.querySelectorAll('[data-bm="terrain"]').forEach(c => { c.checked = BM.terrain; });
    root.querySelectorAll('[data-bm="shade"]').forEach(c => { c.checked = BM.shade; });
    root.querySelectorAll('[data-bm="contours"]').forEach(c => { c.checked = BM.contours; });
    root.querySelectorAll('.bm-exag').forEach(e => { e.hidden = !BM.terrain; });
  }
  const b = $('#bm-btn');
  if (b) b.dataset.base = BM.base;
}
function openBmPop() {
  const pop = $('#bmpop');
  pop.innerHTML = `<p class="bm-h">Base map</p>` + bmControlsHTML('pop');
  bindBmControls(pop);
  pop.hidden = false;
  $('#bm-btn').setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => pop.querySelector('input:checked')?.focus({ preventScroll: true }));
}
function closeBmPop() { const p = $('#bmpop'); if (p && !p.hidden) { p.hidden = true; $('#bm-btn').setAttribute('aria-expanded', 'false'); } }
function buildMapChrome() {
  const ctl = $('#ctl');
  const g = document.createElement('div');
  g.className = 'ctl-group';
  g.innerHTML = `<button type="button" id="bm-btn" aria-label="Base map and terrain" aria-haspopup="dialog" aria-expanded="false" aria-controls="bmpop">${ICON.layers}</button>`;
  ctl.prepend(g);
  const g3 = document.createElement('div');
  g3.className = 'ctl-group'; g3.id = 'ctl3d'; g3.hidden = true;
  g3.innerHTML = `<button type="button" id="tilt" aria-label="Tilt the view">${ICON.tilt}</button><button type="button" id="rot" aria-label="Turn the view">${ICON.rot}</button>`;
  ctl.appendChild(g3);
  const pop = document.createElement('div');
  pop.id = 'bmpop'; pop.className = 'bmpop'; pop.hidden = true;
  pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Base map and terrain');
  $('#app').appendChild(pop);
  const at = document.createElement('div');
  at.id = 'attrib'; at.className = 'attrib'; at.hidden = true;
  $('#app').appendChild(at);
  const dock = document.createElement('section');
  dock.id = 'dock'; dock.className = 'dock'; dock.hidden = true;
  $('#app').appendChild(dock);
  $('#bm-btn').addEventListener('click', e => { e.stopPropagation(); if ($('#bmpop').hidden) openBmPop(); else closeBmPop(); });
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#bmpop, #bm-btn')) closeBmPop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#bmpop').hidden) { closeBmPop(); $('#bm-btn').focus(); } });
  $('#tilt').addEventListener('click', () => { const p = map.getPitch(); map.easeTo({ pitch: p < 20 ? 50 : p < 62 ? 72 : 0, duration: MQ.rm.matches ? 0 : 600 }); });
  $('#rot').addEventListener('click', () => map.easeTo({ bearing: map.getBearing() - 45, duration: MQ.rm.matches ? 0 : 600 }));
  at.addEventListener('click', e => {
    if (e.target.closest('[data-nav]')) { APP._opts = {}; APP.nav('about'); return; }
    if (isPhone() && !e.target.closest('a')) at.classList.toggle('open');
  });
  new ResizeObserver(() => placeFloaters()).observe(ctl);
  addEventListener('resize', () => placeFloaters());
  for (const sel of ['#sheet', '#cartouche', '#dock']) new MutationObserver(() => placeFloaters()).observe($(sel), { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
}

/* ---------- the sun ---------- */
/* solar declination (NOAA fractional-year series) and the sun's position for a latitude, day of year and local
   solar time (12:00 = the sun due south or north, at its highest) */
function solarDecl(doy) {
  const g = 2 * Math.PI / 365 * (doy - 1);
  return 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
}
function sunPos(lat, doy, t) {
  const d = solarDecl(doy), f = lat * Math.PI / 180, H = (t - 12) * 15 * Math.PI / 180;
  const sinAlt = Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(H);
  const alt = Math.asin(clamp(sinAlt, -1, 1));
  let az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(f) - Math.tan(d) * Math.cos(f)) * 180 / Math.PI + 180;
  az = (az + 360) % 360;
  // sunrise / sunset hour angle (with refraction and the solar disc, -0.833 degrees)
  const c = (Math.sin(-0.833 * Math.PI / 180) - Math.sin(f) * Math.sin(d)) / (Math.cos(f) * Math.cos(d));
  const h0 = c <= -1 ? 12 : c >= 1 ? 0 : Math.acos(c) * 180 / Math.PI / 15;
  return { alt: alt * 180 / Math.PI, az, rise: 12 - h0, set: 12 + h0, day: 2 * h0 };
}
function sunNow() { const c = map.getCenter(); return sunPos(c.lat, BM.sun.doy, BM.sun.t); }
const DIRS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
const dirName = az => DIRS[Math.round(((az % 360) + 360) % 360 / 45) % 8];
const hhmm = h => { h = ((h % 24) + 24) % 24; const m = Math.round(h * 60); return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const doyDate = doy => { const d = new Date(Date.UTC(2026, 0, doy)); return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`; };
const dateDoy = (m, d) => Math.round((Date.UTC(2026, m - 1, d) - Date.UTC(2026, 0, 0)) / 864e5);
function paintNight() {
  if (!map) return;
  if (!BM.sun) { setVis('sun-tint', false); return; }
  if (!map.getLayer('sun-tint')) map.addLayer({ id: 'sun-tint', type: 'background', layout: { visibility: 'none' }, paint: { 'background-color': 'rgba(0,0,0,0)' } }, 'anchor-labels');
  const s = sunNow();
  let col = 'rgba(0,0,0,0)';
  if (s.alt < 0) col = `rgba(6,10,34,${clamp(0.28 + -s.alt / 14 * 0.3, 0.28, 0.58).toFixed(2)})`;
  else if (s.alt < 9) col = `rgba(255,150,60,${(0.12 * (1 - s.alt / 9)).toFixed(3)})`;
  map.setPaintProperty('sun-tint', 'background-color', col);
  setVis('sun-tint', true);
}
const SUN_PRESETS = [
  { k: 'cote-rotie', l: 'Côte-Rôtie, autumn morning', c: [4.792, 45.493], z: 13.6, p: 58, b: 300, m: 10, d: 5, t: 8.5, note: 'The Côte Brune and Côte Blonde face south-east above Ampuis and take the morning sun first.' },
  { k: 'wehlen', l: 'The Mosel at Wehlen, summer evening', c: [7.035, 49.94], z: 13.4, p: 60, b: 25, m: 6, d: 21, t: 18.5, note: 'The Wehlener Sonnenuhr faces south-south-west across the river and keeps the light into the evening; the far bank is already in shade.' },
  { k: 'hermitage', l: 'Hermitage, winter afternoon', c: [4.842, 45.073], z: 14, p: 55, b: 0, m: 1, d: 15, t: 14.5, note: 'A south-facing granite hill above Tain: even with the sun low in January, Les Bessards and Le Méal stay lit.' },
  { k: 'pinhao', l: 'The Douro at Pinhão, harvest noon', c: [-7.545, 41.19], z: 13, p: 58, b: 20, m: 9, d: 20, t: 12.5, note: 'Terraces face every way in the side valleys of the Pinhão and the Douro, which is why quintas blend parcels of different aspect.' }
];
function startSun(opts = {}) {
  if (!GH() || !map) return;
  stopJourney(true);
  if (!BM.sun) {
    const now = new Date();
    BM.sunPrev = { base: BM.base };
    BM.sun = { doy: dateDoy(now.getMonth() + 1, now.getDate()), t: 10 };
  }
  ensureDem();
  if (BM.base !== 'standard') setBase('standard', { temp: true });
  // the light must read through the appellations: shading above the fills (below outlines and labels), thinner fills
  if (map.getLayer('hillshade') && map.getLayer('anchor-line')) map.moveLayer('hillshade', 'anchor-line');
  S.fillK = 0.42; S.lineK = 1.3;
  repaintApps();
  applyBaseVis();
  paintShade();
  renderSunDock();
  updateAttrib();
  if (opts.preset) applySunPreset(opts.preset);
  else if (map.getZoom() < 8) APP.toast('Zoom in to a valley, or pick one of the places below.');
  map.on('moveend', onSunMove);
}
function onSunMove() { if (BM.sun) { paintShade(); updateSunRead(); } }
function stopSun() {
  if (!BM.sun) return;
  BM.sun = null;
  map.off('moveend', onSunMove);
  clearInterval(BM.sunPlay); BM.sunPlay = 0;
  if (map.getLayer('hillshade')) map.moveLayer('hillshade', 'grat-line');
  paintShade(); applyBaseVis();
  const prev = BM.sunPrev; BM.sunPrev = null;
  if (prev && prev.base !== BM.base) setBase(prev.base, { temp: true }); else if (prev) setBase(store.get('base', 'standard'));
  closeDock();
  updateAttrib();
}
function applySunPreset(k) {
  const p = SUN_PRESETS.find(x => x.k === k);
  if (!p) return;
  BM.sun.doy = dateDoy(p.m, p.d); BM.sun.t = p.t;
  const go = () => {
    if (!BM.terrain) setTerrain3D(true, { force: true, instant: true });
    const cam = { center: p.c, zoom: isPhone() ? p.z - 0.6 : p.z, pitch: p.p, bearing: p.b };
    if (MQ.rm.matches) map.jumpTo(cam); else map.flyTo({ ...cam, duration: 4200, essential: false });
  };
  stopSpin();
  go();
  renderSunDock(p.note);
  paintShade();
}
function renderSunDock(note) {
  const dock = $('#dock');
  const s = BM.sun;
  dock.dataset.kind = 'sun';
  dock.setAttribute('aria-label', 'Sunlight explorer');
  dock.innerHTML = `<div class="dk-head"><span class="dk-eyebrow">${ICON.sun} Sunlight</span><span class="dk-place mono" id="sun-place"></span>
      <button type="button" class="icon-btn dk-x" id="dk-x" aria-label="Close the sunlight explorer"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <p class="dk-read" id="sun-read" aria-live="polite"></p>
    <div class="dk-sliders">
      <label class="dk-sl"><span>Date</span><input type="range" class="vm-range" id="sun-doy" min="1" max="365" step="1" value="${s.doy}" aria-describedby="sun-doy-v"><b class="mono" id="sun-doy-v"></b></label>
      <label class="dk-sl"><span>Solar time</span><input type="range" class="vm-range sun-t" id="sun-t" min="0" max="24" step="0.0833" value="${s.t}" aria-describedby="sun-t-v"><b class="mono" id="sun-t-v"></b></label>
    </div>
    <div class="dk-row"><button type="button" class="btn small" id="sun-play">${MQ.rm.matches ? 'One hour later' : 'Play the day'}</button>
      <label class="sr" for="sun-preset">Places</label><select class="vm-select dk-sel" id="sun-preset"><option value="">Try a place…</option>${SUN_PRESETS.map(p => `<option value="${p.k}">${esc(p.l)}</option>`).join('')}</select></div>
    ${note ? `<p class="dk-note">${esc(note)}</p>` : `<p class="dk-note">Light and shade follow the real sun over the centre of the map. Solar time puts noon where the sun is highest; clocks run ahead of it by up to two hours in summer.</p>`}`;
  openDock();
  $('#dk-x').onclick = () => { stopSun(); if (/^#sunlight/.test(location.hash)) { try { history.replaceState(null, '', location.href.replace(/#.*$/, '')); } catch (e) { /* sandbox */ } } };
  $('#sun-doy').oninput = e => { BM.sun.doy = +e.target.value; paintShade(); updateSunRead(); };
  $('#sun-t').oninput = e => { BM.sun.t = +e.target.value; paintShade(); updateSunRead(); };
  $('#sun-preset').onchange = e => { if (e.target.value) applySunPreset(e.target.value); };
  $('#sun-play').onclick = () => {
    if (MQ.rm.matches) { BM.sun.t = (BM.sun.t + 1) % 24; $('#sun-t').value = BM.sun.t; paintShade(); updateSunRead(); return; }
    if (BM.sunPlay) { clearInterval(BM.sunPlay); BM.sunPlay = 0; $('#sun-play').textContent = 'Play the day'; return; }
    const sp = sunNow();
    if (BM.sun.t >= sp.set || BM.sun.t < sp.rise) BM.sun.t = Math.max(0, sp.rise - 0.25);
    $('#sun-play').textContent = 'Pause';
    BM.sunPlay = setInterval(() => {
      const p2 = sunNow();
      BM.sun.t += 0.05;
      if (BM.sun.t > p2.set + 0.3) { clearInterval(BM.sunPlay); BM.sunPlay = 0; $('#sun-play').textContent = 'Play the day'; }
      $('#sun-t').value = BM.sun.t; paintShade(); updateSunRead();
    }, 70);
  };
  updateSunRead();
}
function updateSunRead() {
  if (!BM.sun || !$('#sun-read')) return;
  const c = map.getCenter(), s = sunNow();
  $('#sun-place').textContent = `${fmtLat(c.lat, 2)} ${fmtLon(((c.lng + 540) % 360) - 180, 2)}`;
  $('#sun-doy-v').textContent = doyDate(BM.sun.doy);
  $('#sun-t-v').textContent = hhmm(BM.sun.t);
  const dayH = Math.floor(s.day), dayM = Math.round((s.day - dayH) * 60);
  $('#sun-read').innerHTML = s.alt > 0
    ? `Sun <b class="mono">${s.alt.toFixed(0)}°</b> above the horizon in the ${dirName(s.az)} <span class="mono">(${s.az.toFixed(0)}°)</span>. Slopes facing ${dirName(s.az)} are in full light.`
    : `The sun is below the horizon. ${s.day > 0.1 ? `It rises at <b class="mono">${hhmm(s.rise)}</b> and sets at <b class="mono">${hhmm(s.set)}</b> solar time.` : 'Polar night.'}`;
  const sub = s.day > 0.1 && s.day < 23.9 ? `Sunrise ${hhmm(s.rise)}, sunset ${hhmm(s.set)}, ${dayH} h ${dayM} min of daylight` : '';
  $('#sun-read').title = sub;
  // daylight band on the time slider
  const inp = $('#sun-t');
  const a = clamp(s.rise / 24 * 100, 0, 100), b = clamp(s.set / 24 * 100, 0, 100);
  inp.style.setProperty('--day-a', a + '%'); inp.style.setProperty('--day-b', b + '%');
  inp.setAttribute('aria-valuetext', `${hhmm(BM.sun.t)} solar time${sub ? '. ' + sub : ''}`);
  $('#sun-doy').setAttribute('aria-valuetext', doyDate(BM.sun.doy));
}

/* ---------- the dock (sunlight, journeys) ---------- */
function openDock() {
  const dock = $('#dock');
  dock.hidden = false;
  $('#app').dataset.dock = dock.dataset.kind || 'on';
  if (isPhone() && !$('#sheet').hidden) hideSheetOnly();
  closeBmPop();
  requestAnimationFrame(placeFloaters);
}
function closeDock() {
  const dock = $('#dock');
  if (!dock || dock.hidden) return;
  dock.hidden = true; dock.innerHTML = '';
  delete $('#app').dataset.dock;
  requestAnimationFrame(placeFloaters);
}

/* ---------- river journeys ---------- */
const JR = { list: null, p: null, cur: null, km: 0, playing: false, speed: 1, raf: 0, last: 0, br: null, lit: [], capKey: '', prev: null };
function loadJourneys() {
  if (!JR.p) JR.p = (has('data/map/journeys.json') ? getJSON('data/map/journeys.json') : Promise.resolve(null)).then(j => { JR.list = arr(j?.journeys); return JR.list; });
  return JR.p;
}
const kmFmt = v => `${fmt(v, v < 10 ? 1 : 0)} km`;
function journeysHTML(list) {
  let out = `<div class="head"><p class="eyebrow">Fly-throughs</p><h2 class="title">River journeys</h2><p class="tagline">Wine follows water. Ride the great wine rivers in 3D and watch the appellations go by.</p></div>`;
  if (!list.length) return out + H.pending('set of journeys');
  out += `<ul class="list jr-list">${list.map(j => `<li><a class="row" href="#journey-${esc(j.id)}"><span class="row-name">${esc(j.title)}<small class="jr-t">${esc(j.text)}</small></span><span class="row-meta">${esc(kmFmt(j.km))}</span></a></li>`).join('')}</ul>`;
  out += `<p class="note">Routes follow Natural Earth river lines, smoothed for the camera, so the view floats over the valley rather than tracing every bend. Names come from the atlas polygons the route passes within about a kilometre of, and from the sites and towns on the banks.</p>`;
  return out;
}
function jrPoint(km) {
  const j = JR.cur, n = j.line.length, f = clamp(km / j.step, 0, n - 1), i = Math.floor(f), t = f - i;
  const a = j.line[i], b = j.line[Math.min(n - 1, i + 1)];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
function bearingOf(a, b) {
  const f1 = a[1] * Math.PI / 180, f2 = b[1] * Math.PI / 180, dl = (b[0] - a[0]) * Math.PI / 180;
  return (Math.atan2(Math.sin(dl) * Math.cos(f2), Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl)) * 180 / Math.PI + 360) % 360;
}
function jrCamera(snap) {
  const j = JR.cur, km = JR.km;
  const tb = bearingOf(jrPoint(km - 2), jrPoint(km + 4));
  if (JR.br == null || snap) JR.br = tb;
  else { let d = ((tb - JR.br + 540) % 360) - 180; JR.br = (JR.br + d * 0.04 + 360) % 360; }
  const cam = { center: jrPoint(km + 0.8), zoom: isPhone() ? j.zoom - 0.7 : j.zoom, pitch: 63, bearing: JR.br };
  map.jumpTo(cam);
}
function jrActive(km) {
  const j = JR.cur;
  const apps = j.stops.filter(s => km >= s.a - 0.4 && km <= s.b + 0.4);
  const umb = apps.filter(s => !s.fine && s.area > 600).sort((a, b) => a.area - b.area);
  // closest first (each stop keeps its nearest distance to the route), named crus and profiled units ahead of ties
  const near = apps.filter(s => s.fine || s.area <= 600).sort((a, b) => ((a.d ?? 1) - (b.d ?? 1)) * 2 + (b.prof - a.prof) * 0.3 + (b.fine - a.fine) * 0.2).slice(0, 4);
  const site = j.sites.filter(s => Math.abs(s.km - km) <= 1.1).sort((a, b) => Math.abs(a.km - km) - Math.abs(b.km - km))[0];
  const town = j.towns.filter(t => Math.abs(t.km - km) <= 1.8).sort((a, b) => Math.abs(a.km - km) - Math.abs(b.km - km))[0];
  return { umb: umb[0] || null, near, site, town };
}
function jrCaption(force) {
  const j = JR.cur, a = jrActive(JR.km);
  const key = [a.umb?.id, ...a.near.map(x => x.id), a.site?.id, a.town?.name].join('|');
  $('#jr-km').textContent = `${kmFmt(JR.km)} of ${kmFmt(j.km)}`;
  const sc = $('#jr-scrub'); if (sc && document.activeElement !== sc) sc.value = JR.km.toFixed(2);
  if (key === JR.capKey && !force) return;
  JR.capKey = key;
  const title = a.site?.name || a.town?.name || a.near[0]?.name || j.river;
  const ctx = [a.umb?.name, a.site && a.town ? a.town.name : '', a.site ? (KIND[a.site.kind] || '') : ''].filter(Boolean);
  const chips = a.near.filter(x => x.name !== title).map(x => `<li><a class="chip" href="#${esc(x.id)}" data-jr-open><i class="sw" style="background:var(--w-${STYLES.includes(x.style) ? x.style : 'mixed'})"></i>${esc(x.name)}</a></li>`).join('');
  $('#jr-cap').innerHTML = `<p class="dk-ctx">${esc(ctx.join(' · ') || j.title)}</p><h3 class="dk-title">${a.site ? `<a href="#${esc(a.site.id)}" data-jr-open>${esc(title)}</a>` : esc(title)}</h3>${chips ? `<ul class="chips dk-chips">${chips}</ul>` : ''}`;
  $('#jr-cap').querySelectorAll('[data-jr-open]').forEach(el => el.addEventListener('click', () => jrPause()));
  // light up the appellations on the banks
  for (const r of JR.lit) stateSet(r, { hover: false });
  JR.lit = a.near.map(x => ({ src: srcFor(x.id), id: x.id }));
  for (const r of JR.lit) stateSet(r, { hover: true });
}
function jrFrame(t) {
  if (!JR.playing) return;
  const dt = JR.last ? Math.min(0.1, (t - JR.last) / 1000) : 0;
  JR.last = t;
  const v = clamp(JR.cur.km / 120, 0.6, 3) * JR.speed;   /* km per second: about two minutes per journey */
  JR.km = Math.min(JR.cur.km, JR.km + dt * v);
  jrCamera(false);
  jrCaption();
  if (JR.km >= JR.cur.km - 0.01) { jrPause(); $('#jr-play').textContent = 'Again'; return; }
  JR.raf = requestAnimationFrame(jrFrame);
}
function jrPlay() {
  if (!JR.cur) return;
  if (MQ.rm.matches) { jrNextStop(); return; }
  if (JR.km >= JR.cur.km - 0.01) { JR.km = 0; JR.br = null; }
  JR.playing = true; S.flying = true; JR.last = 0;
  $('#jr-play').textContent = 'Pause';
  $('#jr-play').setAttribute('aria-pressed', 'true');
  cancelAnimationFrame(JR.raf);
  JR.raf = requestAnimationFrame(jrFrame);
}
function jrPause() {
  if (!JR.playing) return;
  JR.playing = false; S.flying = false;
  cancelAnimationFrame(JR.raf);
  const b = $('#jr-play'); if (b) { b.textContent = 'Play'; b.setAttribute('aria-pressed', 'false'); }
  checkViewport();
}
/* reduced motion: hop from stop to stop instead of flying */
function jrNextStop() {
  const j = JR.cur;
  const marks = [...j.sites.map(s => s.km), ...j.towns.map(t => t.km), ...j.stops.filter(s => s.fine || s.area <= 600).map(s => s.a)].filter(k => k > JR.km + 1).sort((a, b) => a - b);
  JR.km = marks.length ? marks[0] : (JR.km >= j.km - 0.1 ? 0 : j.km);
  JR.br = null;
  jrCamera(true); jrCaption(); checkViewport();
}
async function startJourney(id) {
  const list = await loadJourneys();
  const j = list.find(x => x.id === id);
  if (!j || !map || !GH()) { APP.toast('That journey is not in the atlas.'); return null; }
  stopSun();
  stopJourney(true);
  stopSpin();
  JR.prev = { base: BM.base, terrain: BM.terrain };
  JR.cur = j; JR.km = 0; JR.br = null; JR.capKey = ''; JR.speed = 1;
  for (const iso of j.iso) ensureCountryGeo(iso, true);
  if (BM.base === 'standard') await setBase('satellite', { temp: true });
  JR.km = 0;
  jrCamera(true);
  if (!BM.terrain) setTerrain3D(true, { force: true, instant: true });
  jrCamera(true);
  // the route as a faint gold thread
  const line = { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: j.line } };
  if (map.getSource('rj-route')) map.getSource('rj-route').setData(line);
  else { map.addSource('rj-route', { type: 'geojson', data: line }); map.addLayer({ id: 'rj-route', type: 'line', source: 'rj-route', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': TOK.highlight, 'line-width': 2, 'line-opacity': 0.55, 'line-dasharray': [1, 2.4] } }, 'anchor-points'); }
  setVis('rj-route', true);
  renderJourneyDock();
  if (!MQ.rm.matches) setTimeout(() => { if (JR.cur === j && !JR.playing && JR.km === 0) jrPlay(); }, 1200);
  return j;
}
function renderJourneyDock() {
  const j = JR.cur, dock = $('#dock');
  dock.dataset.kind = 'journey';
  dock.setAttribute('aria-label', `River journey: ${j.title}`);
  dock.innerHTML = `<div class="dk-head"><span class="dk-eyebrow">${ICON.river} ${esc(j.title)}</span><span class="dk-place mono" id="jr-km"></span>
      <button type="button" class="icon-btn dk-x" id="dk-x" aria-label="End the journey"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <div class="dk-cap" id="jr-cap" aria-live="polite"></div>
    <div class="dk-row jr-ctl"><button type="button" class="btn small solid" id="jr-play" aria-pressed="false">${MQ.rm.matches ? 'Next stop' : 'Play'}</button>
      <label class="sr" for="jr-scrub">Position along the river</label><input type="range" class="vm-range dk-grow" id="jr-scrub" min="0" max="${j.km}" step="0.25" value="0">
      ${MQ.rm.matches ? '' : `<button type="button" class="btn small ghost" id="jr-speed" aria-label="Playback speed">1×</button>`}</div>`;
  openDock();
  $('#dk-x').onclick = () => stopJourney();
  $('#jr-play').onclick = () => (JR.playing ? jrPause() : jrPlay());
  const sc = $('#jr-scrub');
  sc.oninput = () => { jrPause(); JR.km = +sc.value; JR.br = null; jrCamera(true); jrCaption(); };
  sc.onchange = () => checkViewport();
  const sp = $('#jr-speed');
  if (sp) sp.onclick = () => { JR.speed = JR.speed === 1 ? 2 : JR.speed === 2 ? 4 : 1; sp.textContent = JR.speed + '×'; };
  jrCaption(true);
}
function stopJourney(quiet) {
  if (!JR.cur) return;
  jrPause();
  for (const r of JR.lit) stateSet(r, { hover: false });
  JR.lit = [];
  setVis('rj-route', false);
  const prev = JR.prev; JR.cur = null; JR.prev = null;
  if (!quiet) closeDock();
  if (prev) {
    if (!prev.terrain && BM.terrain) setTerrain3D(false);
    if (prev.base !== BM.base) setBase(prev.base, { temp: true });
  }
  if (/^#journey-/.test(location.hash) && !quiet) { try { history.replaceState(null, '', location.href.replace(/#.*$/, '')); } catch (e) { /* sandbox */ } }
}

/* ---------- Layers view: the same controls in the sheet ---------- */
function bmLayersSection() {
  if (!GH()) return '';
  return `<div class="bm-section">${H.sec('Base map and terrain')}${bmControlsHTML('lay')}</div>`;
}

/* ---------- boot ---------- */
function initV2Map() {
  if (!GH()) return;
  buildMapChrome();
  VM.panel.register('journeys', { title: 'River journeys', crumb: 'Map', snap: 'half', async render(el) { el.innerHTML = journeysHTML(await loadJourneys()); } });
  VM.panel.register('journey', {
    title: 'River journey', crumb: 'River journey', snap: 'peek',
    async render(el, { arg }) {
      const list = await loadJourneys();
      const j = list.find(x => x.id === arg);
      if (!j) { el.innerHTML = journeysHTML(list); return; }
      const chap = [...j.sites.map(s => ({ km: s.km, name: s.name, id: s.id, meta: KIND[s.kind] || 'Site' })),
        ...j.stops.filter(s => !s.fine && s.area <= 600).map(s => ({ km: s.a, name: s.name, id: s.id, meta: s.cat }))].sort((a, b) => a.km - b.km);
      el.innerHTML = `<div class="head"><p class="eyebrow">River journey · ${esc(kmFmt(j.km))}</p><h2 class="title">${esc(j.title)}</h2></div>${H.prose(j.text, true)}
        ${chap.length ? H.sec(`On the banks · ${chap.length}`) + `<ul class="list">${chap.map(c => `<li><a class="row" href="#${esc(c.id)}"><span class="row-name">${esc(c.name)}<small>${esc(c.meta || '')}</small></span><span class="row-meta">${esc(kmFmt(c.km))}</span></a></li>`).join('')}</ul>` : ''}
        <p class="note"><a href="#journeys">All river journeys</a></p>`;
      el.querySelectorAll('a.row').forEach(a => a.addEventListener('click', () => jrPause()));
      await startJourney(arg);
      if (isPhone()) hideSheetOnly();
    },
    onClose() { /* the journey keeps running in its dock */ }
  });
  VM.panel.register('sunlight', {
    title: 'Sunlight', crumb: 'Map', snap: 'peek',
    render(el, { arg }) {
      el.innerHTML = `<div class="head"><p class="eyebrow">The map</p><h2 class="title">Sunlight explorer</h2></div>${H.prose('Move the date and time sliders and the relief takes the light of the real sun over the centre of the map: which slopes catch the morning, which keep the evening, how low the winter sun runs. Try Côte-Rôtie on an October morning, or the Mosel bends at Wehlen in a June evening.')}`;
      startSun({ preset: arg || null });
      hideSheetOnly();
    }
  });
  map.on('moveend', () => { updateAttrib(); if (!S.flying) placeFloaters(); });
  map.on('zoomend', () => { if (BM.terrain && !JR.cur && map.getZoom() < 3.6) { setTerrain3D(false, { instant: true }); APP.toast('3D terrain is off at globe scale.'); } });
  for (const ev of ['mousedown', 'touchstart', 'wheel']) map.on(ev, e => { if (JR.playing && e.originalEvent) jrPause(); });
  // styles: layers added later (rivers, towns, admin lines) get the base map's visibility
  let t = 0;
  map.on('styledata', () => { clearTimeout(t); t = setTimeout(applyBaseVis, 60); });
  registerImgProtocol();
  loadCover();
  if (BM.shade) ensureDem();
  if (BM.contours) setContours(true);
  setBase(store.get('base', 'standard'));
  placeFloaters();
}
vmOn('map:ready', () => { try { initV2Map(); } catch (e) { console.warn('[v2 map]', e); } });
