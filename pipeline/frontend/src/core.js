/* Vitis Mundi: core (utilities, tokens, data store, search) */
'use strict';
const BASE = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
const MANIFEST = window.__VM_MANIFEST || { base: [], glyphs: {} };
const MQ = {
  rm: matchMedia('(prefers-reduced-motion: reduce)'),
  phone: matchMedia('(max-width: 720px)'),
  hover: matchMedia('(hover: hover) and (pointer: fine)'),
  dark: matchMedia('(prefers-color-scheme: dark)')
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ESC[c]);
const inl = s => esc(s).replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
function prose(s) {
  if (!s) return '';
  if (Array.isArray(s)) s = s.join('\n\n');
  return String(s).split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    .map(p => `<p>${inl(p).replace(/\n/g, '<br>')}</p>`).join('');
}
const nwords = s => String(s || '').split(/\s+/).filter(Boolean).length;
function fold(s) {
  return String(s ?? '').toLowerCase()
    .replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o')
    .replace(/ł/g, 'l').replace(/đ/g, 'd').replace(/ı/g, 'i')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/['’‘`]/g, '').replace(/[^a-z0-9Ͱ-ϿЀ-ӿႠ-ჿ]+/g, ' ').trim();
}
const slug = s => fold(s).replace(/ /g, '-');
const arr = v => v == null ? [] : Array.isArray(v) ? v : [v];
const num = v => (v == null || v === '' || isNaN(+v)) ? null : +v;
const fmt = (n, d = 0) => n == null || isNaN(n) ? '' : Number(n).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const store = {
  get(k, d) { try { const v = localStorage.getItem('vm:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('vm:' + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
};
function fmtLat(lat, d = 2) { return lat == null ? '' : `${Math.abs(lat).toFixed(d)}°${lat >= 0 ? 'N' : 'S'}`; }
function fmtLon(lon, d = 2) { return lon == null ? '' : `${Math.abs(lon).toFixed(d)}°${lon >= 0 ? 'E' : 'W'}`; }
function fmtArea(km2) {
  if (km2 == null) return null;
  if (km2 >= 1000) return { v: `${fmt(km2)} km²`, s: `${fmt(sig3(km2 * 0.386102))} sq mi` };
  const ha = km2 * 100;
  return { v: `${fmt(ha, ha < 10 ? 1 : 0)} ha`, s: `${fmt(sig3(ha * 2.47105), ha < 10 ? 1 : 0)} acres` };
}
/* converted figures are no more precise than their source: 3 significant figures above 10,000 */
const sig3 = v => (v == null || Math.abs(v) < 10000) ? v : Number(v.toPrecision(3));
function fmtHa(ha) { return ha == null ? null : { v: `${fmt(ha)} ha`, s: `${fmt(sig3(ha * 2.47105))} acres` }; }
function fmtM(m) { return m == null ? '' : `${fmt(m)} m`; }
function fmtFt(m) { return m == null ? '' : `${fmt(m * 3.28084)} ft`; }
function yearOf(v) { const m = String(v ?? '').match(/(1[0-9]{3}|20[0-9]{2})/); return m ? m[1] : null; }

/* ---------- glyph-safe labels: strip characters our glyph PBFs do not cover ---------- */
const GLYPHS = {};
for (const [f, starts] of Object.entries(MANIFEST.glyphs || {})) GLYPHS[f] = new Set(starts);
function safeLabel(s, font) {
  s = String(s ?? '');
  const set = GLYPHS[font];
  if (!set || !set.size) return s;
  let out = '';
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (cp < 128 || set.has(Math.floor(cp / 256) * 256)) out += ch;
    else if (cp >= 0x4E00 && cp <= 0x9FFF) out += ch; /* CJK drawn locally by MapLibre */
    else out += ch.normalize('NFKD').replace(/[^\x00-\x7f]/g, '');
  }
  return out.trim();
}

/* ---------- theme tokens ---------- */
const TOKN = ['space', 'ocean', 'land', 'land-wine', 'border', 'rule-strong', 'text', 'muted', 'faint', 'panel', 'panel-2', 'accent',
  'highlight', 'river', 'river-wine', 'lake', 'grat', 'belt', 'belt-edge', 'halo', 'map-label', 'map-label-wine',
  'w-red', 'w-white', 'w-rose', 'w-sparkling', 'w-sweet', 'w-fortified', 'w-orange', 'w-mixed',
  'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'e0', 'e1', 'e2', 'e3', 'e4'];
let TOK = {}, TOKRAW = {};
/* TOK is what the map paints with: the theme tokens, plus overrides for the label ink and halos when the base map
   is satellite imagery or a paper topographic map (see v2_map.js baseInk). TOKRAW is the plain theme. */
function readTokens() {
  const cs = getComputedStyle(document.documentElement);
  const t = {};
  for (const k of TOKN) t[k] = cs.getPropertyValue('--' + k).trim() || '#888';
  t.dark = isDarkColor(t.ocean);
  TOKRAW = { ...t };
  if (typeof baseInk === 'function') Object.assign(t, baseInk(t));
  TOK = t;
  return t;
}
function isDarkColor(c) {
  const m = c.match(/^#([0-9a-f]{6})$/i);
  if (!m) return true;
  const n = parseInt(m[1], 16);
  const l = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return l < 0.45;
}
const STYLES = ['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange', 'mixed'];
const STYLE_LABEL = { red: 'Red', white: 'White', rose: 'Rosé', sparkling: 'Sparkling', sweet: 'Sweet', fortified: 'Fortified', orange: 'Orange', mixed: 'Mixed' };
const styleColor = s => TOK['w-' + (STYLES.includes(s) ? s : 'mixed')];

/* ---------- reference facts ---------- */
const BQ = {
  official: ['Official line', 'The legally delimited boundary, digitised from the register.'],
  commune: ['Commune-based', 'Drawn as the communes the appellation covers, so it is larger than the vineyard zone itself.'],
  admin: ['Administrative proxy', 'An administrative unit stands in for an appellation that has no published line.'],
  approx: ['Approximate', 'Sketched or buffered from known places. Read it as a location, not a boundary.']
};
const KIND = {
  grand_cru: 'Grand cru', premier_cru: 'Premier cru', cru: 'Cru', vineyard: 'Vineyard', mga: 'MGA', lieu_dit: 'Lieu-dit',
  village: 'Village', estate: 'Estate', chateau: 'Château', quinta: 'Quinta', house: 'House', cellar: 'Cellar',
  historic: 'Historic site', museum: 'Museum', landscape: 'Wine landscape'
};
const TIER = { major: 'Major wine nation', notable: 'Notable wine country', emerging: 'Emerging wine country', minor: 'Small wine country' };
const SRC = {
  eupdo: 'Candiago et al. (2022), geospatial inventory of EU wine PDOs, Scientific Data 9:394',
  inao: 'INAO, Délimitation parcellaire des AOC viticoles (Licence Ouverte)',
  ucdavis: 'UC Davis Library AVA Digitizing Project (CC0), from TTB boundary descriptions',
  wineaus: 'Wine Australia Geographical Indications boundaries (CC BY)',
  ne: 'Natural Earth (public domain)',
  gb: 'geoBoundaries administrative units (CC BY)'
};
const REG_LABEL = {
  eu_file: 'EU file', eambrosia: 'eAmbrosia', eu_reg: 'EU registration', max_hl_ha: 'Max yield', max_t_ha: 'Max yield',
  min_vines_ha: 'Min planting', min_alc: 'Min alcohol', irrigation: 'Irrigation', products: 'Products', cfr: 'CFR section',
  petitioner: 'Petitioner', created: 'Established', boundary_since: 'Boundary since', state: 'State', county: 'County',
  gi_no: 'GI number', registered: 'Registered', vine_ha: 'Under vine', gdd: 'GDD (source)', gs_rain_mm: 'Season rain',
  jan_c: 'Mean Jan temp', jul_c: 'Mean Jul temp', crush_t: 'Crush', crush_yrs: 'Crush years', reg_year: 'Registered', year: 'Year'
};
const REG_UNIT = { max_hl_ha: ' hl/ha', max_t_ha: ' t/ha', min_vines_ha: ' vines/ha', min_alc: '% vol', vine_ha: ' ha', gs_rain_mm: ' mm', jan_c: ' °C', jul_c: ' °C', crush_t: ' t' };
const LATREF = [
  ['Reims', 49.26, 4.03], ['Trier', 49.75, 6.64], ['Vancouver', 49.28, -123.12], ['Paris', 48.86, 2.35], ['Seattle', 47.61, -122.33],
  ['Dijon', 47.32, 5.04], ['Budapest', 47.5, 19.04], ['Harbin', 45.8, 126.53], ['Montreal', 45.5, -73.57], ['Portland, Oregon', 45.52, -122.68],
  ['Lyon', 45.76, 4.84], ['Venice', 45.44, 12.33], ['Minneapolis', 44.98, -93.27], ['Bordeaux', 44.84, -0.58], ['Sapporo', 43.06, 141.35],
  ['Toronto', 43.65, -79.38], ['Vladivostok', 43.12, 131.89], ['Florence', 43.77, 11.25], ['Boston', 42.36, -71.06], ['Rioja (Logroño)', 42.47, -2.45],
  ['Rome', 41.9, 12.5], ['Chicago', 41.88, -87.63], ['Tbilisi', 41.72, 44.79], ['Porto', 41.15, -8.61], ['New York', 40.71, -74.0],
  ['Beijing', 39.9, 116.4], ['Denver', 39.74, -104.99], ['Madrid', 40.42, -3.7], ['Washington, D.C.', 38.9, -77.04], ['Lisbon', 38.72, -9.14],
  ['Napa', 38.3, -122.29], ['Athens', 37.98, 23.73], ['Seoul', 37.57, 126.98], ['San Francisco', 37.77, -122.42], ['Jerez', 36.68, -6.14],
  ['Tokyo', 35.68, 139.69], ['Tehran', 35.69, 51.39], ['Los Angeles', 34.05, -118.24], ['Shiraz', 29.59, 52.58],
  ['Mendoza', -32.89, -68.84], ['Santiago', -33.45, -70.67], ['Cape Town', -33.92, 18.42], ['Sydney', -33.87, 151.21], ['Buenos Aires', -34.6, -58.38],
  ['Adelaide', -34.93, 138.6], ['Montevideo', -34.9, -56.16], ['Auckland', -36.85, 174.76], ['Melbourne', -37.81, 144.96], ['Wellington', -41.29, 174.78],
  ['Hobart', -42.88, 147.33], ['Christchurch', -43.53, 172.64], ['Bariloche', -41.13, -71.31], ['Queenstown', -45.03, 168.66]
];
function sameLatitude(lat, lon) {
  if (lat == null) return '';
  const c = LATREF.filter(r => Math.abs(r[1] - lat) <= 0.9 && Math.abs(((r[2] - lon + 540) % 360) - 180) > 18)
    .sort((a, b) => Math.abs(a[1] - lat) - Math.abs(b[1] - lat)).slice(0, 2).map(r => r[0]);
  return c.length ? `same latitude as ${c.join(' and ')}` : '';
}

/* ---------- climate helpers ---------- */
const GST_BANDS = [[13, 15, 'Cool'], [15, 17, 'Intermediate'], [17, 19, 'Warm'], [19, 21, 'Hot'], [21, 24, 'Very hot']];
function gstNote(g) {
  if (g == null) return '';
  if (g < 13) return 'Too cool for most wine grapes in an average year. Ripening is marginal and only the earliest varieties, often for sparkling wine, make it.';
  if (g < 15) return 'Cool. Early ripeners such as Pinot Noir, Riesling and Chardonnay keep bright acidity and modest alcohol, and vintages differ a lot.';
  if (g < 17) return 'Intermediate. Pinot Noir and Chardonnay ripen fully, Cabernet Franc and Tempranillo manage in good sites, and acidity stays fresh.';
  if (g < 19) return 'Warm. Cabernet Sauvignon, Merlot, Syrah, Nebbiolo and Sangiovese ripen reliably, giving fuller body and riper tannin.';
  if (g < 21) return 'Hot. Grenache, Mourvèdre, Zinfandel and the fortified grapes thrive. Ripeness is easy; keeping acidity is the skill.';
  return 'Very hot. Quality table wine depends on altitude, sea breezes or irrigation; fortified and sweet styles have the edge.';
}
function winkler(gdd) {
  if (gdd == null) return null;
  return gdd < 850 ? 'below I' : gdd < 1389 ? 'Region I' : gdd < 1668 ? 'Region II' : gdd < 1945 ? 'Region III' : gdd < 2223 ? 'Region IV' : 'Region V';
}
function huglin(hi) {
  if (hi == null) return null;
  return hi < 1500 ? 'very cool' : hi < 1800 ? 'cool' : hi < 2100 ? 'temperate' : hi < 2400 ? 'warm temperate' : hi < 2700 ? 'warm' : 'very warm';
}

/* ---------- data store ---------- */
const D = {
  countries: {}, countriesLoaded: false,
  index: [], byId: new Map(), children: new Map(), indexLoaded: false,
  overview: null,
  regions: [], regionById: new Map(),
  sites: [], siteById: new Map(), sitesByApp: new Map(),
  extra: [], extraById: new Map(),
  content: new Map(),
  grapes: [], grapeById: new Map(), grapeByName: new Map(),
  timeline: [], eventById: new Map(),
  glossary: [], soils: [], systems: [], varieties: {}, climrefs: [], meta: null,
  feat: new Map(),
  baseNames: {}
};
const _cache = new Map();
function getJSON(path) {
  if (!_cache.has(path)) {
    _cache.set(path, fetch(BASE + path).then(r => (r.ok ? r.json() : null)).catch(() => null));
  }
  return _cache.get(path);
}
function countryName(iso) {
  return D.countries[iso]?.name || D.baseNames[iso] || (iso || '').toUpperCase();
}
function getContent(iso) {
  if (!iso) return Promise.resolve(null);
  const m = D.countries[iso];
  if (D.countriesLoaded && m && m.has_content === false) return Promise.resolve(null);
  if (D.countriesLoaded && !m) return Promise.resolve(null);
  if (!D.content.has(iso)) {
    D.content.set(iso, getJSON(`data/content/${iso}.json`).then(c => {
      if (!c) return null;
      c.regions = arr(c.regions);
      c.sites = arr(c.sites);
      c.profiles = c.profiles || {};
      // fine-unit profiles written inline (integrate.py --inline-fine-profiles) join the main map
      if (c.fine_profiles && typeof c.fine_profiles === 'object') for (const [k, v] of Object.entries(c.fine_profiles)) if (!c.profiles[k]) c.profiles[k] = v;
      for (const r of c.regions) { if (!r.id) r.id = `region-${iso}-${slug(r.name)}`; }
      return c;
    }));
  }
  return D.content.get(iso);
}
/* fine-unit profiles (Burgundy climats, Einzellagen, Rieden, MGAs...) live in data/content/{iso2}_fine.json, loaded
   the first time a fine unit (or a site inside one) is opened, and merged into the country's profiles */
const _fineContent = new Map();
function getFineContent(iso) {
  if (!iso) return Promise.resolve(null);
  if (!_fineContent.has(iso)) {
    _fineContent.set(iso, getContent(iso).then(async c => {
      if (!c) return null;
      const file = c.fine_content || D.countries[iso]?.fine_content;
      if (!file || !has('data/content/' + file)) return c;
      const j = await getJSON('data/content/' + file);
      const fp = j && (j.fine_profiles || j.profiles);
      if (fp && typeof fp === 'object') for (const [k, v] of Object.entries(fp)) if (!c.profiles[k]) c.profiles[k] = v;
      return c;
    }));
  }
  return _fineContent.get(iso);
}
function setIndex(list) {
  D.index = arr(list);
  D.byId.clear(); D.children.clear();
  for (const a of D.index) {
    D.byId.set(a.id, a);
    if (a.parent) {
      if (!D.children.has(a.parent)) D.children.set(a.parent, []);
      D.children.get(a.parent).push(a);
    }
  }
  for (const l of D.children.values()) l.sort((a, b) => (b.area || 0) - (a.area || 0));
  D.indexLoaded = true;
}
function ancestry(id) {
  const out = [];
  let cur = D.byId.get(id), guard = 0;
  while (cur && cur.parent && guard++ < 12) {
    const p = D.byId.get(cur.parent);
    if (!p) break;
    out.unshift(p);
    cur = p;
  }
  return out;
}
function lvlOf(id) { return ancestry(id).length; }
function setSites(fc) {
  D.sites = arr(fc?.features).map(f => ({ ...f.properties, lon: f.geometry?.coordinates?.[0], lat: f.geometry?.coordinates?.[1] }));
  D.siteById.clear(); D.sitesByApp.clear();
  for (const s of D.sites) {
    D.siteById.set(s.id, s);
    if (s.app) { if (!D.sitesByApp.has(s.app)) D.sitesByApp.set(s.app, []); D.sitesByApp.get(s.app).push(s); }
  }
}
function setRegions(fc) {
  D.regions = arr(fc?.features).map(f => ({ ...f.properties }));
  D.regionById.clear();
  for (const r of D.regions) D.regionById.set(r.id, r);
}
function setExtra(fc) {
  D.extra = arr(fc?.features).map(f => ({ ...f.properties, lp: f.geometry?.coordinates }));
  D.extraById.clear();
  for (const e of D.extra) D.extraById.set(e.id, e);
}

/* normalisers for the global research files (schemas written by another agent; read defensively) */
function listFrom(j, ...keys) {
  if (!j) return [];
  if (Array.isArray(j)) return j;
  for (const k of keys) if (Array.isArray(j[k])) return j[k];
  const vals = Object.values(j);
  if (vals.length && vals.every(v => v && typeof v === 'object' && !Array.isArray(v))) return vals.map((v, i) => ({ id: Object.keys(j)[i], ...v }));
  return [];
}
const nameOf = x => typeof x === 'string' ? x : (x?.name || x?.title || x?.term || x?.id || '');
function setGrapes(j) {
  D.grapes = listFrom(j, 'grapes', 'varieties').map(g => {
    const name = g.name || g.prime || g.id;
    const id = String(g.id || slug(name)).replace(/^grape-/, '');
    const o = g.origin || {};
    return {
      ...g, id, name,
      color: g.color || g.colour || g.berry || '',
      synonyms: arr(g.synonyms || g.aka).map(nameOf).filter(Boolean),
      origin: { lat: num(o.lat ?? g.origin_lat), lon: num(o.lon ?? o.lng ?? g.origin_lon), place: o.place || o.name || (typeof g.origin === 'string' ? g.origin : ''), country: o.country || '', confidence: o.confidence || '' },
      parents: arr(g.parents).map(nameOf).filter(Boolean),
      offspring: arr(g.offspring || g.children).map(nameOf).filter(Boolean),
      trivia: g.trivia,
      profile: g.profile || g.text || g.summary || ''
    };
  }).filter(g => g.name).sort((a, b) => a.name.localeCompare(b.name));
  D.grapeById.clear(); D.grapeByName.clear();
  for (const g of D.grapes) {
    D.grapeById.set(g.id, g);
    D.grapeByName.set(fold(g.name), g);
    for (const s of g.synonyms) if (!D.grapeByName.has(fold(s))) D.grapeByName.set(fold(s), g);
  }
}
function grapeFor(name) {
  if (!name) return null;
  const f = fold(name);
  return D.grapeById.get(slug(name)) || D.grapeByName.get(f) || D.grapeByName.get(f.replace(/ (noir|blanc|bianco|nero|tinto|blanca|n|b|rs|g)$/, '')) || null;
}
const ERAS = [
  [-1e9, -3000, 'The First Vines'], [-3000, -500, 'Bronze Age Kingdoms'], [-500, 500, 'Greece and Rome'], [500, 1500, 'The Monastic Age'],
  [1500, 1800, 'Ships and Merchants'], [1800, 1900, 'The Century of Classification'], [1900, 1960, 'Phylloxera and the Law'],
  [1960, 2000, 'The New World'], [2000, 1e9, 'The Present Vintage']
];
const LANG = { en: 'English', fr: 'French', de: 'German', es: 'Spanish', it: 'Italian', pt: 'Portuguese', ca: 'Catalan', hu: 'Hungarian', el: 'Greek', ka: 'Georgian', la: 'Latin' };
function yearFromWhen(w) {
  const s = String(w ?? '');
  const m = s.match(/(-?\d{1,5})(?:\s*(?:–|-|to)\s*\d+)?\s*(BCE|BC|B\.C\.)?/i);
  if (!m) return null;
  let y = parseInt(m[1], 10);
  if (/BCE|BC|B\.C\./i.test(s) && y > 0) y = -y;
  return y;
}
function whenLabel(y) { return y == null ? '' : y < 0 ? `${fmt(-y)} BC` : y < 1000 ? `AD ${y}` : String(y); }
function setTimeline(j) {
  let evs = [];
  if (j && !Array.isArray(j) && Array.isArray(j.eras) && j.eras.some(e => Array.isArray(e.events))) {
    for (const e of j.eras) for (const ev of arr(e.events)) evs.push({ era: e.name || e.title, ...ev });
  } else evs = listFrom(j, 'events', 'timeline');
  const eraNames = (j && Array.isArray(j.eras)) ? j.eras : null;
  D.timeline = evs.map((ev, i) => {
    const title = ev.title || ev.name || 'Untitled';
    const y = num(ev.year ?? ev.y ?? ev.start) ?? yearFromWhen(ev.when || ev.date);
    let id = String(ev.id || slug(title));
    if (!id.startsWith('event-')) id = 'event-' + id;
    const lat = num(ev.lat ?? ev.latitude ?? ev.coords?.[1] ?? ev.location?.lat);
    const lon = num(ev.lon ?? ev.lng ?? ev.longitude ?? ev.coords?.[0] ?? ev.location?.lon);
    let era = ev.era;
    if (!era && eraNames) { const e = eraNames.find(e => y != null && y >= (num(e.from ?? e.start) ?? -1e9) && y < (num(e.to ?? e.end) ?? 1e9)); era = e?.name || e?.title; }
    if (!era) era = (ERAS.find(e => y != null && y >= e[0] && y < e[1]) || ERAS[0])[2];
    return { ...ev, id, title, year: y, when: ev.date_label || ev.when || ev.date || whenLabel(y), era, lat, lon, tags: arr(ev.tags), place: ev.place || ev.location?.name || (typeof ev.location === 'string' ? ev.location : '') || '', text: ev.text || ev.story || ev.summary || ev.description || '', zoom: num(ev.zoom), i };
  }).sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.i - b.i);
  D.eventById.clear();
  D.timeline.forEach((e, i) => { e.i = i; D.eventById.set(e.id, e); });
}
function setGlossary(j) {
  D.glossary = listFrom(j, 'terms', 'glossary', 'entries').map(t => {
    const lang = t.lang || t.language || t.origin || '';
    const ex = t.example_place || t.example || null;
    return {
      term: t.term || t.name || t.title || t.id, def: t.def || t.definition || t.text || t.description || '',
      lang: LANG[lang] || lang, see: arr(t.see || t.related).map(nameOf), cat: t.category || t.cat || '',
      ex: ex && typeof ex === 'object' ? { name: ex.name || '', lat: num(ex.lat), lon: num(ex.lon ?? ex.lng), app: ex.app || ex.id || null } : null
    };
  }).filter(t => t.term).sort((a, b) => fold(a.term).localeCompare(fold(b.term)));
}
function setSoils(j) {
  D.soils = listFrom(j, 'soils', 'entries').map(s => ({
    id: s.id || slug(s.name || s.title || ''), name: s.name || s.title || s.id, text: s.description || s.text || s.summary || '', wine: s.wine || s.effect || s.why || s.effect_on_wine || '',
    sources: arr(s.sources),
    examples: arr(s.examples || s.places || s.where).map(e => typeof e === 'string' ? { name: e } :
      { name: e.place || e.name || e.title || e.app || '', country: e.country || '', lat: num(e.lat), lon: num(e.lon ?? e.lng), app: e.app || e.appellation_id || null, note: e.note || '' })
  })).filter(s => s.name);
}
function setSystems(j) {
  D.systems = listFrom(j, 'systems', 'entries').map(s => ({
    name: s.name || s.title || s.system || s.id, country: s.country || '', iso2: (s.iso2 || '').toLowerCase(),
    text: s.text || s.summary || s.description || s.how || '',
    tiers: arr(s.tiers || s.levels || s.hierarchy || s.ladder).map(t => typeof t === 'string' ? { name: t, note: '' } : { name: t.label || t.name || t.level || '', note: t.meaning || t.note || t.text || '' }),
    rules: s.labelling_rules || s.labelling || '', history: s.history || '', quirks: s.quirks || s.compare || s.nerd_note || '', sources: arr(s.sources)
  })).filter(s => s.name);
}

/* ---------- search ---------- */
const SEARCH = { items: [], by: new Map() };
function searchAdd(type, list) {
  SEARCH.items = SEARCH.items.filter(x => x.t !== type);
  for (const x of list) {
    if (!x || !x.name) continue;
    const alt = arr(x.alt).filter(Boolean);
    SEARCH.items.push({ ...x, t: type, f: fold(x.name), fa: alt.map(fold), w: fold(x.name).split(' ') });
  }
}
function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
const TYPE_BOOST = { country: 14, grape: 10, region: 9, app: 4, site: 2, term: 3, soil: 3 };
function search(q, limit = 24) {
  const f = fold(q);
  if (!f) return [];
  const toks = f.split(' ');
  const out = [];
  for (const it of SEARCH.items) {
    let s = 0;
    if (it.f === f) s = 100;
    else if (it.f.startsWith(f)) s = 80;
    else if (it.fa.some(a => a === f)) s = 78;
    else if (it.w.some(w => w.startsWith(f))) s = 62;
    else if (it.fa.some(a => a.startsWith(f))) s = 58;
    else if (toks.length > 1 && toks.every(t => it.w.some(w => w.startsWith(t)))) s = 55;
    else if (f.length >= 3 && it.f.includes(f)) s = 45;
    else if (f.length >= 4) {
      // typo tolerance: a misspelt whole name ranks above a misspelt word start
      const max = f.length >= 8 ? 2 : 1;
      const whole = Math.min(lev(f, it.f, max), ...it.fa.map(a => lev(f, a, max)));
      if (whole <= max) s = 40 - whole * 6;
      else {
        let pre = 9;
        // a misspelt word start must at least begin with the same letter ("brunello" is not "jeunellotte")
        for (const c of [it.f, ...it.w, ...it.fa]) if (c.length >= f.length - max && c[0] === f[0]) pre = Math.min(pre, lev(f, c.slice(0, f.length), max));
        if (pre <= max) s = 30 - pre * 6;
      }
    }
    if (!s) continue;
    const base = s;
    s += TYPE_BOOST[it.t] || 0;
    if (it.t === 'app') s += Math.min(8, Math.log10((it.area || 0) + 1) * 2.4) + (it.prof ? 3 : 0) - (it.fine ? 3 : 0);
    out.push([s, it, base]);
  }
  // when the query matches names properly, drop the typo-tolerant guesses
  const strong = out.some(x => x[2] >= 45);
  if (strong) for (let i = out.length - 1; i >= 0; i--) if (out[i][2] <= 40) out.splice(i, 1);
  out.sort((a, b) => b[0] - a[0] || a[1].name.length - b[1].name.length);
  return out.slice(0, limit).map(x => x[1]);
}
/* where a same-named unit lies, to tell "Ried Kellerberg" (Dürnstein) from "Ried Kellerberg" (Augenthal):
   the integrator's ctx when present, else the village in an alias ("Augenthal Kellerberg"), else the parent */
function placeCtx(a) {
  if (!a) return '';
  if (a.ctx) return String(a.ctx);
  const base = fold(String(a.name || '').replace(/^(ried|lage|lieu-dit|climat|vigna|mga)\s+/i, ''));
  for (const al of arr(a.alt)) {
    const f = fold(al);
    if (base && f.endsWith(' ' + base) && f !== base) {
      const words = String(al).trim().split(/\s+/);
      const n = base.split(' ').length;
      const pre = words.slice(0, Math.max(1, words.length - n)).join(' ');
      if (pre && fold(pre) !== fold(a.name)) return pre;
    }
  }
  const par = a.parent && (D.byId.get(a.parent) || D.feat.get(a.parent));
  return par ? par.name : '';
}
function rebuildSearch() {
  searchAdd('country', Object.entries(D.countries).map(([iso, m]) => ({ id: iso, name: m.name || countryName(iso), meta: m.tier ? TIER[m.tier] || 'Country' : 'Country' })));
  const same = new Map();
  for (const a of D.index) { const k = a.country + '|' + fold(a.name); same.set(k, (same.get(k) || 0) + 1); }
  searchAdd('app', D.index.map(a => {
    // ctx (from integration) names the village, commune or zone; without it, a same-named unit borrows its
    // village from an alias or its parent's name
    let where = a.ctx || '';
    if (!where) {
      const dup = same.get(a.country + '|' + fold(a.name)) > 1, par = a.parent && D.byId.get(a.parent);
      where = dup ? [placeCtx(a), par && par.name !== placeCtx(a) ? par.name : ''].filter(Boolean).join(', ') : a.fine && par ? par.name : '';
    }
    // "goldberg langenlois" finds the right Ried: the name with its qualifier is searchable too
    return { id: a.id, name: a.name, alt: arr(a.alt).concat(a.ctx ? [a.name + ' ' + a.ctx] : []), area: a.area, prof: a.prof, fine: a.fine, meta: [a.subcat || a.cat, where, countryName(a.country)].filter(Boolean).join(' · ') };
  })
    .concat(D.extra.filter(e => !D.byId.has(e.id)).map(e => ({ id: e.id, name: e.name, alt: e.ctx ? [e.name + ' ' + e.ctx] : [], prof: 1, area: 1, fine: e.fine ? 1 : 0, meta: [e.cat, e.ctx, countryName(e.country)].filter(Boolean).join(' · ') }))));
  searchAdd('region', D.regions.map(r => ({ id: r.id, name: r.name, alt: r.alt, meta: `Wine region · ${countryName(r.country)}` })));
  searchAdd('site', D.sites.map(s => ({ id: s.id, name: s.name, alt: s.ctx ? [s.name + ' ' + s.ctx] : [], meta: [KIND[s.kind] || 'Site', s.ctx, countryName(s.country)].filter(Boolean).join(' · ') })));
  searchAdd('grape', D.grapes.map(g => ({ id: 'grape-' + g.id, name: g.name, alt: g.synonyms, meta: `Grape${g.color ? ' · ' + g.color : ''}` })));
  searchAdd('term', D.glossary.map(t => ({ id: 'term-' + slug(t.term), name: t.term, meta: `Glossary${t.lang ? ' · ' + t.lang : ''}` })));
  searchAdd('soil', D.soils.map(s => ({ id: 'soil-' + slug(s.id || s.name), name: s.name, meta: 'Soil' })));
}
