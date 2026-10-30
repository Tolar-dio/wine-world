/* Vitis Mundi v2, sommelier tools: multi-criteria filters ("Filter" in the nav, #filter, #filter-<spec>).
   Grapes permitted, main style, country, category, boundary quality, Old or New World, climate ranges (GST, degree days,
   Huglin, rain, warmest month, day-night swing), Winkler class, elevation, slope, aspect on a compass, area.
   The map lights the matches and dims the rest; results are sortable; filters are shareable as a plain hash and can be
   saved (Supabase saved_filters when signed in, else this device). */
(() => {
  if (!window.VM || !VM.somm) return;
  const SM = VM.somm;
  const { esc, fold, arr, num, clamp } = VM.util;

  /* ---------- criteria ---------- */
  const R = {
    gst: { min: 10, max: 25, step: 0.1, group: 'clim', label: 'Growing-season temperature', unit: '°C', d: 1 },
    gdd: { min: 300, max: 3200, step: 10, group: 'clim', label: 'Degree days (Winkler)', unit: '', d: 0 },
    hi: { min: 600, max: 3600, step: 10, group: 'clim', label: 'Huglin index', unit: '', d: 0 },
    mjt: { min: 14, max: 29, step: 0.1, group: 'clim', label: 'Warmest month, mean', unit: '°C', d: 1 },
    dtr: { min: 5, max: 21, step: 0.1, group: 'clim', label: 'Day–night swing', unit: '°C', d: 1 },
    prec: { min: 0, max: 2000, step: 10, group: 'rain', label: 'Rain over the year', unit: 'mm', d: 0 },
    gsp: { min: 0, max: 1200, step: 10, group: 'rain', label: 'Rain in the growing season', unit: 'mm', d: 0 },
    elev: { min: 0, max: 3000, step: 10, group: 'terrain', label: 'Mean elevation', unit: 'm', d: 0 },
    slope: { min: 0, max: 40, step: 0.5, group: 'terrain', label: 'Mean slope', unit: '%', d: 1 },
    area: { min: -2, max: 6, step: 0.05, group: 'place', label: 'Area', unit: '', d: 0, log: true }
  };
  const STY = ['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange', 'mixed'];
  const STY_L = { red: 'Red', white: 'White', rose: 'Rosé', sparkling: 'Sparkling', sweet: 'Sweet', fortified: 'Fortified', orange: 'Orange', mixed: 'Mixed' };
  const BQS = [['official', 'Official line'], ['commune', 'Commune-based'], ['admin', 'Administrative'], ['approx', 'Approximate']];
  const CLIMK = new Set(['gst', 'gdd', 'hi', 'mjt', 'dtr', 'prec', 'gsp', 'elev']);
  const blank = () => ({ g: [], gm: 'any', st: [], c: [], cat: [], bq: [], wk: [], asp: [], sun: 0, ow: '', fine: 0, r: {}, ids: null, split: '', p: '' });
  const clone = s => JSON.parse(JSON.stringify(s));
  const active = s => !!(s.g.length || s.st.length || s.c.length || s.cat.length || s.bq.length || s.wk.length || s.asp.length || s.ow || Object.keys(s.r).length || (s.ids && s.ids.length));

  /* ---------- presets that teach ---------- */
  const VOLCANIC = ['it-etna', 'gr-santorini', 'it-soave', 'it-gambellara', 'it-lessini-durello', 'it-colli-euganei', 'hu-somloi', 'hu-nagy-somlo', 'hu-badacsony', 'hu-tokaj', 'hu-eger', 'hu-matra', 'de-kaiserstuhl', 'es-lanzarote', 'es-tacoronte-acentejo', 'es-ycoden-daute-isora', 'es-valle-de-la-orotava', 'es-valle-de-guimar', 'es-abona', 'es-la-palma', 'es-el-hierro', 'es-gran-canaria', 'es-la-gomera', 'pt-pico', 'pt-biscoitos', 'pt-graciosa', 'it-greco-di-tufo', 'it-taurasi', 'it-campi-flegrei', 'it-vesuvio', 'it-ischia', 'it-aglianico-del-vulture', 'it-malvasia-delle-lipari', 'it-pantelleria', 'it-frascati', 'it-orvieto', 'it-est-est-est-di-montefiascone', 'it-bianco-di-pitigliano', 'fr-cotes-d-auvergne', 'us-red-hills-lake-county', 'us-eola-amity-hills', 'us-dundee-hills'];
  const PRESETS = [
    { id: 'steep-riesling', title: 'Steep south-facing Riesling sites', lead: 'Where Riesling is allowed, on slopes that face the sun.',
      spec: { g: ['riesling'], asp: [3, 4, 5], sun: 1, fine: 1, r: { slope: [15, null] } },
      text: 'In a cool climate the angle of the ground matters as much as the latitude. A 30% slope facing south catches the sun almost square-on in September, warms the slate and drains the cold air away at night, so Riesling ripens where the valley floor would leave it green. The Mosel, Saar and Wachau built their names on such slopes. Fine units are included, because the difference is made one Einzellage or Ried at a time. "Sun-facing" means south in the north and north in the south.' },
    { id: 'cool-syrah', title: 'Cool-climate Syrah', lead: 'Syrah allowed, with a growing season of 14 to 17.5 °C.',
      spec: { g: ['syrah'], r: { gst: [14, 17.5] } },
      text: 'Syrah changes character with warmth more than most grapes. In a cool season it gives black pepper (rotundone), violets and fresh acidity, the Côte-Rôtie register; in heat it turns to blackberry jam, chocolate and high alcohol, the Barossa register. This band runs from about 14 °C to the 17.4 °C of Côte-Rôtie, so it finds the pepper-and-violets places across both hemispheres. Compare any two of them to see how close the climates are.' },
    { id: 'high-reds', title: 'High-altitude reds above 1,000 m', lead: 'Red wine zones with a mean elevation over 1,000 m.',
      spec: { st: ['red'], r: { elev: [1000, null] } },
      text: 'Air cools by roughly 0.6 °C for every 100 m of height, so altitude does in the tropics and subtropics what latitude does in Europe. High vineyards also get stronger ultraviolet light, which thickens skins and deepens colour and tannin, and a wide day–night swing that keeps acidity. Salta, Mendoza\'s Uco Valley and the high deserts of the American Southwest are the classic cases. Sort by elevation to see who sits highest.' },
    { id: 'volcanic', title: 'Volcanic soils', lead: 'Appellations on lava, ash, pumice, tuff or basalt.',
      spec: { ids: VOLCANIC },
      text: 'Volcanic soils are young, porous and often poor in organic matter. They drain fast, store heat, and in their loosest forms, such as the pumice of Santorini, the black sands of Etna and the lapilli of Lanzarote, phylloxera cannot spread, so ungrafted vines survive. Many tasters find a smoky, saline edge in the wines, though that is hard to separate from the warm, windy places volcanoes tend to be. This list is drawn from the soil guide in the Lexicon and is not exhaustive.' },
    { id: 'botrytis', title: 'Botrytis country: warm days, misty autumns', lead: 'An approximation of the noble-rot climate.',
      spec: { st: ['sweet', 'white'], r: { gst: [15.8, 18], gsp: [360, 520], mjt: [null, 22.5] } },
      text: 'Noble rot needs two things at once: damp, misty mornings (a river or lake nearby) and warm, dry afternoons that stop it turning into grey rot. Sauternes (17.4 °C, 442 mm of rain in the season, mists off the Ciron), Tokaj (16.5 °C, where the Bodrog meets the Tisza) and the Coteaux du Layon (16.2 °C) all sit in this window. The climate grid cannot see river fog, so read the matches as candidates: places with the right warmth and rain, not proof of botrytis.' },
    { id: 'pinot-same-gst', title: 'Old World vs New World Pinot at the same warmth', lead: 'Pinot Noir allowed, growing season 15 to 16 °C, split by world.',
      spec: { g: ['pinot-noir'], r: { gst: [15, 16] }, split: 'world' },
      text: 'Gevrey-Chambertin averages 15.9 °C over the growing season and the Willamette Valley 15.4 °C. Same warmth, yet the Oregon season is drier (about 410 mm against 440) with a much wider day–night swing (16.6 °C against 11.3), which tends to give riper fruit with fresher nights. The list is split into the two worlds so you can pair them up. Open Compare on any two to see the numbers side by side.' },
    { id: 'desert', title: 'Desert vineyards: big swings, little rain', lead: 'Day–night swing over 15 °C and under 250 mm of rain in the season.',
      spec: { r: { dtr: [15, null], gsp: [null, 250] } },
      text: 'Dry air lets the day\'s heat escape at night, so deserts have the widest day–night swings on earth. Cool nights hold acidity and colour while hot days ripen sugar, and almost no rain means little disease and full control through irrigation. Mendoza, the Columbia Valley and Chile\'s northern valleys are the classic cases.' },
    { id: 'winkler-1', title: 'Winkler Region I: the cool frontier', lead: 'Degree days below 1,389, the coolest class where wine is made.',
      spec: { wk: [1], r: {} },
      text: 'Amerine and Winkler sorted California into five regions by heat summation in 1944. Region I suits early ripeners for still and sparkling wine: Champagne, Chablis, the Mosel and Marlborough. Climate change is moving places out of it, which you can see in any profile\'s vintage chart.' }
  ];

  /* ---------- shareable hash: plain #filter-<tokens>, letters, digits and hyphens only ----------
     fields are separated by "--": g-riesling-pinot-noir--st-red--c-fr-de--gst-14p5-17--elev-1000-x--asp-s-se-sw--sun--fine */
  const nf = v => v == null ? 'x' : String(+(+v).toFixed(2)).replace('-', 'm').replace('.', 'p');
  const pf = s => s === 'x' || s == null ? null : num(String(s).replace(/^m/, '-').replace('p', '.'));
  const OCTK = SM.OCT.map(o => o.toLowerCase());
  function encode(s) {
    if (s.p && PRESETS.some(p => p.id === s.p) && JSON.stringify(normal(s)) === JSON.stringify(normal(presetSpec(s.p)))) return 'p-' + s.p;
    const f = [];
    if (s.g.length) f.push(['g', ...s.g].join('-'));
    if (s.gm === 'all' && s.g.length > 1) f.push('gall');
    if (s.st.length) f.push(['st', ...s.st].join('-'));
    if (s.c.length) f.push(['c', ...s.c].join('-'));
    if (s.cat.length) f.push(['cat', ...s.cat.map(slug)].join('-'));
    if (s.bq.length) f.push(['bq', ...s.bq].join('-'));
    if (s.wk.length) f.push(['wk', ...s.wk].join('-'));
    if (s.ow) f.push('w-' + s.ow);
    for (const [k, v] of Object.entries(s.r)) f.push([k, nf(v[0]), nf(v[1])].join('-'));
    if (s.asp.length) f.push(['asp', ...s.asp.map(i => OCTK[i])].join('-'));
    if (s.sun) f.push('sun');
    if (s.fine) f.push('fine');
    if (s.split) f.push('split-' + s.split);
    if (s.ids && s.p) f.push('p-' + s.p);
    return f.join('--');
  }
  const slug = x => VM.util.slug(x);
  /* split hyphenated tokens into known ids, longest match first ("pinot-noir-riesling" -> pinot-noir, riesling) */
  function greedy(tokens, known) {
    const out = [];
    for (let i = 0; i < tokens.length;) {
      let hit = 0;
      for (let j = tokens.length; j > i; j--) if (known.has(tokens.slice(i, j).join('-'))) { hit = j; break; }
      if (hit) { out.push(tokens.slice(i, hit).join('-')); i = hit; } else i++;
    }
    return out;
  }
  function decode(arg, cats) {
    const s = blank();
    if (!arg) return s;
    const grapeIds = new Set(GRAPES.map(g => g.id));
    for (const g of Object.keys(VM.data.varieties || {})) grapeIds.add(g);
    for (const field of arg.split('--')) {
      const t = field.split('-');
      const k = t[0], v = t.slice(1);
      if (k === 'p') { const id = v.join('-'); const p = presetSpec(id); if (p) Object.assign(s, p, { p: id }); }
      else if (k === 'g') s.g = greedy(v, grapeIds);
      else if (k === 'gall') s.gm = 'all';
      else if (k === 'st') s.st = v.filter(x => STY.includes(x));
      else if (k === 'c') s.c = v.filter(x => /^[a-z]{2}$/.test(x));
      else if (k === 'cat') { const bySlug = new Map(cats.map(c => [slug(c), c])); s.cat = greedy(v, new Set(bySlug.keys())).map(x => bySlug.get(x)); }
      else if (k === 'bq') s.bq = v.filter(x => BQS.some(b => b[0] === x));
      else if (k === 'wk') s.wk = v.map(Number).filter(x => x >= 0 && x <= 5);
      else if (k === 'w') s.ow = v[0] === 'old' || v[0] === 'new' ? v[0] : '';
      else if (k === 'asp') s.asp = v.map(x => OCTK.indexOf(x)).filter(x => x >= 0);
      else if (k === 'sun') s.sun = 1;
      else if (k === 'fine') s.fine = 1;
      else if (k === 'split') s.split = v[0] === 'world' ? 'world' : '';
      else if (R[k] && v.length === 2) { const lo = pf(v[0]), hi = pf(v[1]); if (lo != null || hi != null) s.r[k] = [lo, hi]; }
    }
    return s;
  }
  function presetSpec(id) { const p = PRESETS.find(x => x.id === id); return p ? { ...blank(), ...clone(p.spec), r: clone(p.spec.r || {}), p: id } : null; }
  function normal(s) { const o = clone(s); delete o.p; return o; }

  /* ---------- matching ---------- */
  let ST = { spec: blank(), sort: SM.local.get('fsort', 'name'), dir: 1, tab: 'criteria', more: 0, saved: [], hl: '' };
  let T = null, REV = null, GR = null, META = null, GRAPES = [];
  async function prepare() {
    GRAPES = await VM.data.grapes();
    T = await SM.table();
    REV = await SM.grapeIndex();
    GR = null;
    if (!META) {
      const cats = new Map(), subs = new Map();
      for (const a of VM.data.index) {
        if (a.cat) cats.set(a.cat, (cats.get(a.cat) || 0) + 1);
        if (a.subcat && a.subcat !== a.cat) subs.set(a.subcat, (subs.get(a.subcat) || 0) + 1);
      }
      const all = new Map(cats);
      for (const [k, v] of subs) all.set(k, (all.get(k) || 0) + v);
      META = { cats: [...all.entries()].sort((a, b) => b[1] - a[1]), catSet: new Set(all.keys()) };
    }
  }
  /* each row's permitted grapes (own or inherited from the nearest container that lists any) */
  function grapesRow(i) {
    if (!GR) GR = new Array(T.n);
    if (GR[i] === undefined) GR[i] = SM.grapesOf(REV, T.ids[i]).set;
    return GR[i];
  }
  /* criteria whose data column is empty are ignored, and the view says so */
  function ignored(s) {
    const out = [];
    /* without the attribute table, climate still applies to the countries drawn so far; only terrain is missing */
    for (const k of Object.keys(s.r)) if (!T.has[k] && !(T.src === 'clim' && CLIMK.has(k))) out.push(R[k].label);
    if (s.wk.length && !T.has.gdd && T.src !== 'clim') out.push('Winkler class');
    if (s.asp.length && !T.has.aspect) out.push('Aspect');
    if (s.g.length && !REV.size) out.push('Grapes');
    return out;
  }
  function run(s) {
    const t = T, out = [];
    const idx = VM.data.indexById;
    const ids = s.ids ? new Set(s.ids) : null;
    const st = s.st.length ? new Set(s.st) : null, cs = s.c.length ? new Set(s.c) : null, cat = s.cat.length ? new Set(s.cat) : null, bq = s.bq.length ? new Set(s.bq) : null;
    const rk = Object.entries(s.r).filter(([k]) => t.has[k] || (t.src === 'clim' && CLIMK.has(k))).map(([k, v]) => [t.num[k], v[0] == null ? -Infinity : (R[k].log ? Math.pow(10, v[0]) : v[0]), v[1] == null ? Infinity : (R[k].log ? Math.pow(10, v[1]) : v[1])]);
    const wk = s.wk.length && (t.has.gdd || t.src === 'clim') ? new Set(s.wk) : null;
    const asp = s.asp.length && t.has.aspect ? new Set(s.asp) : null;
    const gr = s.g.length && REV.size ? s.g : null;
    const terr = (s.r.slope && t.has.slope) || (asp != null);
    for (let i = 0; i < t.n; i++) {
      if (!s.fine && t.fine[i]) continue;
      const id = t.ids[i];
      if (ids && !ids.has(id)) continue;
      if (cs && !cs.has(t.country[i])) continue;
      if (s.ow && SM.world(t.country[i]) !== s.ow) continue;
      const a = idx.get(id);
      if (st && !st.has(a?.style || 'mixed')) continue;
      if (cat && !(cat.has(a?.cat) || cat.has(a?.subcat))) continue;
      if (bq && !bq.has(a?.bq)) continue;
      if (terr && t.num.area[i] >= 10000) continue;
      let ok = true;
      for (const [col, lo, hi] of rk) { const v = col[i]; if (Number.isNaN(v) || v < lo || v > hi) { ok = false; break; } }
      if (!ok) continue;
      if (wk && !wk.has(SM.wkIdx(t.num.gdd[i]))) continue;
      if (asp) {
        const av = t.num.aspect[i];
        if (Number.isNaN(av)) continue;
        let o = SM.oct(av);
        /* sun-facing: mirror north and south below the equator */
        const lat = a?.lp?.[1];
        if (s.sun && lat != null && lat < 0) o = (12 - o) % 8;
        if (!asp.has(o)) continue;
      }
      if (gr) {
        const set = grapesRow(i);
        if (s.gm === 'all' ? !gr.every(g => set.has(g)) : !gr.some(g => set.has(g))) continue;
      }
      out.push(i);
    }
    return out;
  }

  /* ---------- the view ---------- */
  let EL = null, GEN = 0, lastRes = [], timer = 0;
  /* the sheet belongs to someone else once another view or profile opens */
  const off = () => { EL = null; GEN++; clearTimeout(timer); };
  VM.on('view', v => { if (v.id !== 'filter') off(); });
  VM.on('profile:open', off);
  VM.on('panel:close', off);
  VM.panel.register('filter', {
    title: 'Filter', crumb: 'Filter the atlas', snap: 'full',
    async render(el, ctx) {
      EL = el;
      const g = ++GEN;
      ST.hl = '';   /* another view may have replaced the highlight: light it again */
      el.innerHTML = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Filter the atlas</h2><p class="tagline">Ask the map a question: which places allow this grape, this warm, this high, facing this way.</p></div><p class="note sm-wait">Loading the atlas index…</p>`;
      await prepare();
      if (g !== GEN) return;
      if (ctx.arg) { ST.spec = decode(ctx.arg, META.cats.map(c => c[0])); ST.more = 0; }
      draw();
    },
    onClose() { off(); }
  });
  VM.nav.add({ id: 'filter', label: 'Filter', icon: SM.ICON.filter, order: 60, title: 'Filter appellations by grape, climate and terrain' });

  function draw() {
    const el = EL; if (!el) return;
    const s = ST.spec;
    const tabs = [['criteria', 'Criteria'], ['results', 'Results'], ['lessons', 'Lessons'], ['saved', 'Saved']];
    el.innerHTML = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Filter the atlas</h2></div>
      <div class="sm-bar" id="sm-fbar" role="status" aria-live="polite"></div>
      <div class="vm-tabs sm-ftabs" role="tablist" aria-label="Filter sections">${tabs.map(([k, l]) => `<button type="button" role="tab" data-tab="${k}" aria-selected="${ST.tab === k}">${l}${k === 'results' ? ' <span class="mono sm-rc"></span>' : ''}</button>`).join('')}</div>
      <div id="sm-fbody"></div>`;
    el.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { ST.tab = b.dataset.tab; el.querySelectorAll('[data-tab]').forEach(x => x.setAttribute('aria-selected', String(x === b))); body(); }));
    body();
    update(true);
  }
  function body() {
    const b = EL?.querySelector('#sm-fbody'); if (!b) return;
    if (ST.tab === 'criteria') { b.innerHTML = criteriaHTML(); bindCriteria(b); }
    else if (ST.tab === 'results') { b.innerHTML = '<div id="sm-res"></div>'; results(); }
    else if (ST.tab === 'lessons') { b.innerHTML = lessonsHTML(); bindLessons(b); }
    else { b.innerHTML = '<div id="sm-saved"></div>'; saved(); }
  }

  /* ---------- criteria UI ---------- */
  function pickHTML(kind, label, chosen, ph) {
    return `<div class="sm-pick" data-pick="${kind}"><div class="vm-field"><span>${esc(label)}</span>
      <div class="sm-chosen chips">${chosen}</div>
      <input class="vm-input sm-pq" type="search" placeholder="${esc(ph)}" aria-label="${esc(ph)}" autocomplete="off" spellcheck="false"></div>
      <ul class="chips sm-opts" aria-label="Suggestions"></ul></div>`;
  }
  const chipX = (kind, v, label) => `<li><button type="button" class="chip sm-on" data-rm="${esc(kind)}" data-v="${esc(v)}" aria-label="Remove ${esc(label)}">${esc(label)} <span aria-hidden="true">×</span></button></li>`;
  function chosenHTML(kind) {
    const s = ST.spec;
    if (kind === 'g') return s.g.map(g => chipX('g', g, VM.data.grapeById(g)?.name || g)).join('');
    if (kind === 'c') return s.c.map(c => chipX('c', c, VM.data.countryName(c))).join('');
    if (kind === 'cat') return s.cat.map(c => chipX('cat', c, c)).join('');
    return '';
  }
  function toggleChips(kind, opts, sel, label) {
    return `<div class="vm-field"><span>${esc(label)}</span><ul class="chips" role="group" aria-label="${esc(label)}">${opts.map(([v, l, sw]) => `<li><button type="button" class="chip sm-tg" data-tg="${kind}" data-v="${esc(v)}" aria-pressed="${sel.includes(v)}">${sw ? `<i class="sw" style="background:var(--w-${sw})"></i>` : ''}${esc(l)}</button></li>`).join('')}</ul></div>`;
  }
  function rangeHTML(k) {
    const d = R[k], v = ST.spec.r[k] || [null, null];
    const lo = v[0] ?? d.min, hi = v[1] ?? d.max;
    const off = !T.has[k] && !(T.src === 'clim' && CLIMK.has(k));
    return `<div class="sm-rng${v[0] != null || v[1] != null ? ' on' : ''}${off ? ' off' : ''}" data-k="${k}">
      <div class="sm-rng-h"><span class="lk">${esc(d.label)}</span><output class="mono" id="sm-o-${k}">${esc(rangeText(k))}</output></div>
      <div class="sm-rng-t">${histSVG(k)}
        <input type="range" class="lo" min="${d.min}" max="${d.max}" step="${d.step}" value="${lo}" aria-label="Lowest ${esc(d.label.toLowerCase())}"${off ? ' disabled' : ''}>
        <input type="range" class="hi" min="${d.min}" max="${d.max}" step="${d.step}" value="${hi}" aria-label="Highest ${esc(d.label.toLowerCase())}"${off ? ' disabled' : ''}></div>
      <div class="sm-rng-a mono" aria-hidden="true"><span>${esc(axisText(k, d.min))}</span><span>${esc(axisText(k, d.max))}</span></div></div>`;
  }
  const axisText = (k, v) => R[k].log ? VM.fmt.area(Math.pow(10, v))?.v || '' : `${VM.fmt.num(v, R[k].d && v % 1 ? 1 : 0)}${R[k].unit ? ' ' + R[k].unit : ''}`;
  function rangeText(k) {
    const d = R[k], v = ST.spec.r[k];
    if (!T.has[k] && !(T.src === 'clim' && CLIMK.has(k))) return 'no data yet';
    if (!v || (v[0] == null && v[1] == null)) return 'any';
    const f = x => d.log ? (VM.fmt.area(Math.pow(10, x))?.v || '') : VM.fmt.num(x, d.d);
    const u = d.unit ? ' ' + d.unit : '';
    if (v[0] != null && v[1] != null) return `${f(v[0])}–${f(v[1])}${u}`;
    return v[0] != null ? `≥ ${f(v[0])}${u}` : `≤ ${f(v[1])}${u}`;
  }
  /* distribution of the column behind the slider: where the atlas's places actually sit */
  function histSVG(k) {
    const d = R[k];
    if (!T.has[k]) return '<svg class="sm-hist" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"></svg>';
    const N = 40, bins = new Array(N).fill(0), col = T.num[k];
    for (let i = 0; i < T.n; i++) {
      if (!ST.spec.fine && T.fine[i]) continue;
      let v = col[i]; if (Number.isNaN(v)) continue;
      if (d.log) v = Math.log10(Math.max(1e-3, v));
      const b = Math.floor((v - d.min) / (d.max - d.min) * N);
      bins[clamp(b, 0, N - 1)]++;
    }
    const mx = Math.max(1, ...bins.map(x => Math.sqrt(x)));
    const v = ST.spec.r[k] || [null, null];
    const lo = v[0] ?? d.min, hi = v[1] ?? d.max;
    const w = 100 / N;
    return `<svg class="sm-hist" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">${bins.map((c, i) => {
      if (!c) return '';
      const h = Math.max(1, Math.sqrt(c) / mx * 22);
      const x0 = d.min + (i + 0.5) / N * (d.max - d.min);
      return `<rect x="${(i * w + 0.25).toFixed(2)}" y="${(24 - h).toFixed(2)}" width="${(w - 0.5).toFixed(2)}" height="${h.toFixed(2)}" class="${x0 >= lo && x0 <= hi ? 'in' : ''}"/>`;
    }).join('')}</svg>`;
  }
  function compassHTML() {
    const s = ST.spec, off = !T.has.aspect;
    const wedge = i => {
      const a0 = (i * 45 - 22.5 - 90) * Math.PI / 180, a1 = (i * 45 + 22.5 - 90) * Math.PI / 180, r = 46, ri = 15;
      const p = (a, rr) => `${(50 + rr * Math.cos(a)).toFixed(2)} ${(50 + rr * Math.sin(a)).toFixed(2)}`;
      return `M${p(a0, ri)} L${p(a0, r)} A${r} ${r} 0 0 1 ${p(a1, r)} L${p(a1, ri)} A${ri} ${ri} 0 0 0 ${p(a0, ri)}Z`;
    };
    const lab = i => { const a = (i * 45 - 90) * Math.PI / 180; return [50 + 33 * Math.cos(a), 50 + 33 * Math.sin(a)]; };
    return `<div class="sm-asp${off ? ' off' : ''}"><div class="vm-field"><span>Aspect: the way the slopes face</span></div>
      <div class="sm-asp-row"><svg class="sm-compass" viewBox="0 0 100 100" role="group" aria-label="Aspect: tap the directions the slopes should face">
        ${SM.OCT.map((o, i) => `<g class="sm-w" role="checkbox" tabindex="${off ? -1 : 0}" aria-checked="${s.asp.includes(i)}" aria-label="${esc(SM.OCT_LONG[i])}-facing" data-o="${i}"><path d="${wedge(i)}"/><text x="${lab(i)[0].toFixed(1)}" y="${(lab(i)[1] + 3.6).toFixed(1)}" text-anchor="middle">${o}</text></g>`).join('')}
        <circle cx="50" cy="50" r="13" class="sm-hub"/></svg>
      <div class="sm-asp-side"><label class="tog" for="sm-sun"><span>Sun-facing in both hemispheres</span><input type="checkbox" id="sm-sun" ${s.sun ? 'checked' : ''}${off ? ' disabled' : ''}></label>
      <p class="note">${off ? 'Aspect arrives with the terrain data (Copernicus 30 m elevation model); it is not in this build yet.' : 'The main direction the slopes face (Copernicus 30 m elevation model). Zones whose slopes face every way have no aspect and never match. With sun-facing on, S means toward the equator: north-facing slopes below it. Slope and aspect skip zones of 10,000 km² or more, where the figures describe a whole region.'}</p></div></div></div>`;
  }
  function criteriaHTML() {
    const s = ST.spec, t = T;
    const ign = ignored(s);
    const clim = t.src === 'clim';
    const nCl = clim ? (() => { const set = new Set(); for (let i = 0; i < t.n; i++) if (!Number.isNaN(t.num.gst[i])) set.add(t.country[i]); return set.size; })() : 0;
    const cnts = new Map();
    for (const a of VM.data.index) if (!a.fine) cnts.set(a.country, (cnts.get(a.country) || 0) + 1);
    let out = '';
    if (clim) out += `<p class="note sm-src"><b>Climate covers ${nCl} of ${cnts.size} countries so far:</b> the ones drawn on the map. Pick countries below, or zoom around the map, to bring in more. Places in other countries cannot match a climate or elevation range yet.</p>`;
    if (ign.length) out += `<p class="note sm-ign"><b>Ignored for now:</b> ${esc(SM.list(ign))}, because that data is not in this build yet.</p>`;
    out += `<details class="sm-grp" open><summary>Grapes and style</summary>
      ${pickHTML('g', 'Grapes permitted', chosenHTML('g'), 'Add a grape')}
      ${s.g.length > 1 ? `<div class="seg seg-inline sm-gm" role="radiogroup" aria-label="Grape match"><label><input type="radio" name="sm-gm" value="any" ${s.gm !== 'all' ? 'checked' : ''}>Any of them</label><label><input type="radio" name="sm-gm" value="all" ${s.gm === 'all' ? 'checked' : ''}>All of them</label></div>` : ''}
      ${toggleChips('st', STY.map(x => [x, STY_L[x], x]), s.st, 'Main wine style')}</details>`;
    out += `<details class="sm-grp"${s.c.length || s.cat.length || s.bq.length || s.ow ? ' open' : ''}><summary>Place and law</summary>
      ${pickHTML('c', 'Countries', chosenHTML('c'), 'Add a country')}
      ${toggleChips('ow', [['old', 'Old World'], ['new', 'New World']], [s.ow], 'Old or New World')}
      ${pickHTML('cat', 'Category or rank', chosenHTML('cat'), 'Add a category or rank')}
      ${toggleChips('bq', BQS, s.bq, 'Boundary quality')}
      ${rangeHTML('area')}
      <label class="tog" for="sm-fine"><span>Include fine units: Einzellagen, Rieden, climats, MGAs</span><input type="checkbox" id="sm-fine" ${s.fine ? 'checked' : ''}></label></details>`;
    out += `<details class="sm-grp"${['gst', 'gdd', 'hi', 'mjt', 'dtr', 'prec', 'gsp'].some(k => s.r[k]) || s.wk.length ? ' open' : ''}><summary>Climate</summary>
      ${rangeHTML('gst')}
      ${toggleChips('wk', SM.WK.map((w, i) => [String(i), i ? `Region ${w}` : 'Below I']), s.wk.map(String), 'Winkler class')}
      ${rangeHTML('gdd')}${rangeHTML('hi')}${rangeHTML('mjt')}${rangeHTML('dtr')}${rangeHTML('gsp')}${rangeHTML('prec')}
      <p class="src">TerraClimate 1991–2020 normals averaged over each mapped zone; growing season April to October in the north, October to April in the south.</p></details>`;
    out += `<details class="sm-grp"${s.r.elev || s.r.slope || s.asp.length ? ' open' : ''}><summary>Terrain</summary>
      ${rangeHTML('elev')}${rangeHTML('slope')}${compassHTML()}</details>`;
    out += `<div class="btn-row sm-act"><button type="button" class="btn solid" data-act="results">See ${'results'}</button><button type="button" class="btn ghost" data-act="clear">Clear all</button></div>`;
    return out;
  }
  function bindCriteria(b) {
    /* pickers: grapes, countries, categories */
    b.querySelectorAll('.sm-pick').forEach(p => {
      const kind = p.dataset.pick, inp = p.querySelector('.sm-pq'), ul = p.querySelector('.sm-opts');
      const opts = () => {
        const q = fold(inp.value);
        let list = [];
        if (kind === 'g') {
          const va = VM.data.varieties || {};
          list = GRAPES.filter(g => !ST.spec.g.includes(g.id) && (!q || fold(g.name).includes(q) || g.synonyms.some(x => fold(x).includes(q))))
            .map(g => [g.id, g.name, arr(va[g.id]).length]).sort((a, b2) => q ? (fold(a[1]).startsWith(q) ? -1 : 0) - (fold(b2[1]).startsWith(q) ? -1 : 0) || b2[2] - a[2] : b2[2] - a[2]);
        } else if (kind === 'c') {
          const cnt = new Map(); for (const a of VM.data.index) if (!a.fine) cnt.set(a.country, (cnt.get(a.country) || 0) + 1);
          list = [...cnt.entries()].filter(([c]) => !ST.spec.c.includes(c) && (!q || fold(VM.data.countryName(c)).includes(q) || c === q)).map(([c, n]) => [c, VM.data.countryName(c), n]).sort((a, b2) => b2[2] - a[2]);
        } else {
          list = META.cats.filter(([c]) => !ST.spec.cat.includes(c) && (!q || fold(c).includes(q))).map(([c, n]) => [c, c, n]);
        }
        const lim = q ? 12 : 8;
        ul.innerHTML = list.slice(0, lim).map(([v, l, n]) => `<li><button type="button" class="chip sm-add" data-v="${esc(v)}">${esc(l)}<span class="mono sm-n">${VM.fmt.num(n)}</span></button></li>`).join('') + (list.length > lim ? `<li class="note sm-more">${VM.fmt.num(list.length - lim)} more: type to narrow</li>` : '');
        ul.querySelectorAll('.sm-add').forEach(x => x.addEventListener('click', () => { const sp = ST.spec; const key = kind; if (!sp[key].includes(x.dataset.v)) sp[key].push(x.dataset.v); inp.value = ''; changed(); refreshCriteria(); if (key === 'c') loadCountries(); }));
      };
      inp.addEventListener('input', opts);
      inp.addEventListener('focus', opts);
      opts();
    });
    b.querySelectorAll('[data-rm]').forEach(x => x.addEventListener('click', () => { const k = x.dataset.rm; ST.spec[k] = ST.spec[k].filter(v => v !== x.dataset.v); changed(); refreshCriteria(); }));
    b.querySelectorAll('.sm-tg').forEach(x => x.addEventListener('click', () => {
      const k = x.dataset.tg, v = x.dataset.v, sp = ST.spec;
      if (k === 'ow') sp.ow = sp.ow === v ? '' : v;
      else if (k === 'wk') { const n = +v; sp.wk = sp.wk.includes(n) ? sp.wk.filter(y => y !== n) : [...sp.wk, n].sort(); }
      else sp[k] = sp[k].includes(v) ? sp[k].filter(y => y !== v) : [...sp[k], v];
      if (k === 'ow') b.querySelectorAll('[data-tg="ow"]').forEach(y => y.setAttribute('aria-pressed', String(sp.ow === y.dataset.v)));
      else x.setAttribute('aria-pressed', String(k === 'wk' ? sp.wk.includes(+v) : sp[k].includes(v)));
      changed();
    }));
    b.querySelectorAll('input[name="sm-gm"]').forEach(r => r.addEventListener('change', () => { ST.spec.gm = r.value; changed(); }));
    b.querySelector('#sm-fine')?.addEventListener('change', e => { ST.spec.fine = e.target.checked ? 1 : 0; ST.fineTouched = true; changed(); b.querySelectorAll('.sm-rng').forEach(r => { r.querySelector('.sm-hist').outerHTML = histSVG(r.dataset.k); }); });
    b.querySelector('#sm-sun')?.addEventListener('change', e => { ST.spec.sun = e.target.checked ? 1 : 0; changed(); });
    /* dual sliders */
    b.querySelectorAll('.sm-rng').forEach(r => {
      const k = r.dataset.k, d = R[k], lo = r.querySelector('.lo'), hi = r.querySelector('.hi');
      const on = which => {
        let a = +lo.value, z = +hi.value;
        if (a > z) { if (which === 'lo') lo.value = a = z; else hi.value = z = a; }
        const v = [a <= d.min + 1e-9 ? null : a, z >= d.max - 1e-9 ? null : z];
        if (v[0] == null && v[1] == null) delete ST.spec.r[k]; else ST.spec.r[k] = v;
        if (k === 'slope' && ST.spec.r.slope) autoFine();
        r.classList.toggle('on', !!ST.spec.r[k]);
        r.querySelector('output').textContent = rangeText(k);
        r.querySelector('.sm-hist').outerHTML = histSVG(k);
        changed();
      };
      lo.addEventListener('input', () => on('lo'));
      hi.addEventListener('input', () => on('hi'));
      /* the upper thumb sits on top; give the lower one the pointer when it is closer */
      r.querySelector('.sm-rng-t').addEventListener('pointerdown', e => {
        const rc = lo.getBoundingClientRect();
        const x = (e.clientX - rc.left) / rc.width * (d.max - d.min) + d.min;
        const near = Math.abs(x - +lo.value) <= Math.abs(x - +hi.value) ? 'lo' : 'hi';
        lo.style.zIndex = near === 'lo' ? 3 : 2; hi.style.zIndex = near === 'hi' ? 3 : 2;
      }, true);
    });
    /* compass */
    b.querySelectorAll('.sm-w').forEach(w => {
      const tg = () => {
        if (!T.has.aspect) return;
        const o = +w.dataset.o, sp = ST.spec;
        sp.asp = sp.asp.includes(o) ? sp.asp.filter(x => x !== o) : [...sp.asp, o].sort();
        if (sp.asp.length) autoFine();
        w.setAttribute('aria-checked', String(sp.asp.includes(o)));
        changed();
      };
      w.addEventListener('click', tg);
      w.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tg(); } });
    });
    b.querySelectorAll('[data-act]').forEach(x => x.addEventListener('click', () => {
      if (x.dataset.act === 'clear') { ST.spec = blank(); changed(); refreshCriteria(); }
      else switchTab('results');
    }));
  }
  /* slope and aspect say most about single vineyards: switch fine units on the first time, once */
  function autoFine() {
    if (ST.spec.fine || ST.fineTouched) return;
    ST.spec.fine = 1; ST.fineTouched = true;
    const cb = EL?.querySelector('#sm-fine'); if (cb) cb.checked = true;
    VM.toast('Fine units included: slope and aspect mean most on single vineyards.');
  }
  function refreshCriteria() {
    const b = EL?.querySelector('#sm-fbody');
    if (!b || ST.tab !== 'criteria') return;
    const open = [...b.querySelectorAll('details.sm-grp')].map(d => d.open);
    const y = EL.scrollTop;
    b.innerHTML = criteriaHTML(); bindCriteria(b);
    b.querySelectorAll('details.sm-grp').forEach((d, i) => { if (open[i] != null) d.open = open[i]; });
    EL.scrollTop = y;
  }
  function switchTab(k) {
    ST.tab = k;
    EL?.querySelectorAll('[data-tab]').forEach(x => x.setAttribute('aria-selected', String(x.dataset.tab === k)));
    body();
    EL?.querySelector('.sm-ftabs')?.scrollIntoView({ block: 'nearest' });
  }
  /* pick countries before their climate is known: draw their polygons so the climate arrives */
  function loadCountries() {
    if (T.src !== 'clim') return;
    const want = ST.spec.c.slice(0, 6);
    Promise.all(want.map(c => SM.map.ensure(c))).then(() => { if (EL) refreshTable(); });
  }
  async function refreshTable() {
    const before = T;
    await prepare();
    if (T !== before && EL) { if (ST.tab === 'criteria') refreshCriteria(); update(); }
  }
  VM.on('somm:geo', () => { if (EL && T?.src === 'clim') { clearTimeout(refreshTable._t); refreshTable._t = setTimeout(refreshTable, 900); } });

  /* ---------- live count, hash, map ---------- */
  function changed() {
    ST.spec.p = ST.spec.p && JSON.stringify(normal(ST.spec)) === JSON.stringify(normal(presetSpec(ST.spec.p) || blank())) ? ST.spec.p : '';
    ST.more = 0;
    clearTimeout(timer);
    timer = setTimeout(() => update(), 160);
  }
  function update(first) {
    if (!EL || !T) return;
    const s = ST.spec;
    lastRes = active(s) ? run(s) : [];
    const n = lastRes.length;
    const bar = EL.querySelector('#sm-fbar');
    const pre = s.p ? PRESETS.find(p => p.id === s.p) : null;
    const partial = T.src === 'clim' && (Object.keys(s.r).some(k => CLIMK.has(k)) || s.wk.length);
    const nc = partial ? new Set(Array.from({ length: T.n }, (_, i) => Number.isNaN(T.num.gst[i]) ? null : T.country[i]).filter(Boolean)).size : 0;
    if (bar) bar.innerHTML = active(s)
      ? `<span class="sm-count"><b class="mono">${VM.fmt.num(n)}</b> ${n === 1 ? 'place matches' : 'places match'}${pre ? `<small>${esc(pre.title)}</small>` : ''}${partial ? `<small class="sm-part">climate known in ${nc} ${nc === 1 ? 'country' : 'countries'} so far</small>` : ''}</span><span class="sm-bar-b"><button type="button" class="btn small" data-bar="map"${n ? '' : ' disabled'}>Show on map</button><button type="button" class="btn small ghost" data-bar="save">Save</button></span>`
      : `<span class="sm-count"><span class="note">Set a criterion, or start from a lesson.</span></span>`;
    bar?.querySelectorAll('[data-bar]').forEach(x => x.addEventListener('click', () => {
      if (x.dataset.bar === 'map') showOnMap();
      else { switchTab('saved'); setTimeout(() => EL?.querySelector('#sm-sname')?.focus(), 30); }
    }));
    const rc = EL.querySelector('.sm-rc'); if (rc) rc.textContent = active(s) ? VM.fmt.num(n) : '';
    if (ST.tab === 'results') results();
    /* hash: replace without a new history entry, so the back button still leaves the view */
    const h = active(s) ? 'filter-' + encode(s) : 'filter';
    const mine = VM.panel.current?.type === 'view' && VM.panel.current.id === 'filter';
    if (mine && /^[a-z0-9-]+$/.test(h) && h.length < 1800 && location.hash.slice(1) !== h) {
      try { history.replaceState(null, '', '#' + h); if (typeof APP === 'object' && APP.cur && APP.cur.startsWith('filter')) APP.cur = h; } catch (e) { /* sandboxed: keep the old hash */ }
    }
    light(first);
  }
  function light() {
    const ids = lastRes.map(i => T.ids[i]);
    const key = ids.length + ':' + ids.slice(0, 50).join(',');
    if (key === ST.hl) return;
    ST.hl = key;
    dots(ids);
    if (!ids.length) { if (ST.lit) { VM.clearHighlight(); ST.lit = false; } return; }
    VM.highlight(ids, { owner: 'filter', dimOthers: true, label: 'Filter', labelHTML: '<b>Filter</b>', onClear: () => { ST.lit = false; ST.hl = ''; dots([]); }, load: ids.length < 400 });
    ST.lit = true;
  }
  /* fine units (Einzellagen, Rieden, climats) only draw from zoom 9.5 and have no overview point: mark the matching
     ones with a dot until their shapes appear */
  function dots(ids) {
    const m = VM.map;
    if (!m || !m.isStyleLoaded?.()) return;
    const idx = VM.data.indexById;
    const fc = { type: 'FeatureCollection', features: ids.map(id => idx.get(id)).filter(a => a && a.fine && Array.isArray(a.lp)).map(a => ({ type: 'Feature', properties: { id: a.id }, geometry: { type: 'Point', coordinates: a.lp } })) };
    const src = m.getSource('somm-dots');
    if (src) { src.setData(fc); paintDots(); return; }
    if (!fc.features.length) return;
    m.addSource('somm-dots', { type: 'geojson', data: fc });
    m.addLayer({ id: 'somm-dots', type: 'circle', source: 'somm-dots', maxzoom: 11, paint: {} }, m.getLayer('anchor-points') ? 'anchor-points' : undefined);
    paintDots();
  }
  function paintDots() {
    const m = VM.map; if (!m || !m.getLayer('somm-dots')) return;
    const t = VM.tokens();
    m.setPaintProperty('somm-dots', 'circle-color', t.highlight);
    m.setPaintProperty('somm-dots', 'circle-radius', ['interpolate', ['linear'], ['zoom'], 4, 2.2, 8, 3.6, 10, 4.5]);
    m.setPaintProperty('somm-dots', 'circle-stroke-color', t.panel);
    m.setPaintProperty('somm-dots', 'circle-stroke-width', 1);
    m.setPaintProperty('somm-dots', 'circle-opacity', ['interpolate', ['linear'], ['zoom'], 9.4, 0.95, 10.6, 0]);
    m.setPaintProperty('somm-dots', 'circle-stroke-opacity', ['interpolate', ['linear'], ['zoom'], 9.4, 0.9, 10.6, 0]);
  }
  VM.on('theme', paintDots);
  function showOnMap() {
    const ids = lastRes.map(i => T.ids[i]);
    if (!ids.length) return;
    ST.hl = ''; light();
    VM.frame(ids, { maxZoom: ids.length < 4 ? 10 : 8 });
    if (VM.isPhone()) VM.panel.snap('peek');
  }

  /* ---------- results ---------- */
  const SORTS = [['name', 'Name'], ['gst', 'Warmth'], ['gsp', 'Rain'], ['elev', 'Elevation'], ['slope', 'Slope'], ['area', 'Area'], ['country', 'Country']];
  function results() {
    const box = EL?.querySelector('#sm-res'); if (!box) return;
    const s = ST.spec;
    if (!active(s)) { box.innerHTML = `<p class="vm-empty">Nothing selected yet. Set a criterion or open a lesson.</p>`; return; }
    const t = T, idx = VM.data.indexById;
    const sk = ST.sort === 'slope' && !t.has.slope ? 'name' : ST.sort;
    const val = i => sk === 'name' ? fold(idx.get(t.ids[i])?.name || t.ids[i]) : sk === 'country' ? VM.data.countryName(t.country[i]) + ' ' + (idx.get(t.ids[i])?.name || '') : t.num[sk][i];
    const arr2 = lastRes.slice();
    arr2.sort((a, b) => {
      const x = val(a), y = val(b);
      if (typeof x === 'string') return ST.dir * x.localeCompare(y);
      const xn = Number.isNaN(x), yn = Number.isNaN(y);
      if (xn || yn) return xn - yn;
      return ST.dir * (x - y);
    });
    const show = 120 + ST.more;
    const metaK = ['name', 'country'].includes(sk) ? (t.has.gst ? 'gst' : 'area') : sk;
    const row = i => {
      const a = idx.get(t.ids[i]) || {};
      const v = t.num[metaK][i];
      return SM.rowHTML(t.ids[i], a.name || t.ids[i], [a.subcat || a.cat, VM.data.countryName(t.country[i])].filter(Boolean).join(' · '), Number.isNaN(v) ? '' : SM.fmtv(metaK, v));
    };
    let list;
    if (s.split === 'world') {
      const old = arr2.filter(i => SM.world(t.country[i]) === 'old'), nw = arr2.filter(i => SM.world(t.country[i]) === 'new');
      list = `<div class="sm-split"><section><h4 class="sm-sub">Old World · <span class="mono">${old.length}</span></h4><ul class="list">${old.slice(0, show).map(row).join('')}</ul></section><section><h4 class="sm-sub">New World · <span class="mono">${nw.length}</span></h4><ul class="list">${nw.slice(0, show).map(row).join('')}</ul></section></div>`;
    } else list = `<ul class="list">${arr2.slice(0, show).map(row).join('')}</ul>`;
    box.innerHTML = `<div class="sm-sort"><span class="lk">Sort</span><div class="chips" role="group" aria-label="Sort results">${SORTS.filter(([k]) => k === 'name' || k === 'country' || t.has[k]).map(([k, l]) => `<button type="button" class="chip" data-sort="${k}" aria-pressed="${ST.sort === k}">${l}${ST.sort === k ? ` <span aria-hidden="true">${ST.dir > 0 ? '↑' : '↓'}</span><span class="sr">${ST.dir > 0 ? 'ascending' : 'descending'}</span>` : ''}</button>`).join('')}</div></div>
      ${lastRes.length ? list : '<p class="vm-empty">No place matches all of these. Widen a range or remove a criterion.</p>'}
      ${arr2.length > show && s.split !== 'world' ? `<div class="btn-row" style="margin-top:12px"><button type="button" class="btn ghost" data-more="1">Show ${VM.fmt.num(Math.min(240, arr2.length - show))} more of ${VM.fmt.num(arr2.length - show)}</button></div>` : ''}
      ${lastRes.length ? `<p class="note">Tap a place for its profile; the map keeps the filter lit until you clear it.</p>` : ''}`;
    box.querySelectorAll('[data-sort]').forEach(x => x.addEventListener('click', () => {
      if (ST.sort === x.dataset.sort) ST.dir = -ST.dir; else { ST.sort = x.dataset.sort; ST.dir = ['gst', 'elev', 'slope', 'area', 'gsp'].includes(ST.sort) ? -1 : 1; }
      SM.local.set('fsort', ST.sort); results();
    }));
    box.querySelector('[data-more]')?.addEventListener('click', () => { ST.more += 240; results(); });
  }

  /* ---------- lessons (built-in presets) ---------- */
  function lessonsHTML() {
    return `<p class="note" style="margin-top:14px">Each lesson sets a filter that shows one idea about place and wine. Apply it, then read the map.</p>
      <ul class="sm-lessons">${PRESETS.map(p => `<li class="${ST.spec.p === p.id ? 'on' : ''}"><button type="button" class="sm-lesson" data-pre="${p.id}" aria-expanded="${ST.spec.p === p.id}"><b>${esc(p.title)}</b><span>${esc(p.lead)}</span></button>${ST.spec.p === p.id ? `<div class="sm-lesson-t prose"><p>${VM.util.inl(p.text)}</p></div>` : ''}</li>`).join('')}</ul>`;
  }
  function bindLessons(b) {
    b.querySelectorAll('[data-pre]').forEach(x => x.addEventListener('click', () => applyPreset(x.dataset.pre)));
  }
  function applyPreset(id) {
    const sp = presetSpec(id);
    if (!sp) return;
    ST.spec = sp; ST.more = 0;
    if (sp.c.length) loadCountries();
    update();
    if (ST.tab === 'lessons') body();
    const ids = lastRes.map(i => T.ids[i]);
    if (ids.length) VM.frame(ids, { maxZoom: 8 });
  }

  /* ---------- saved filters ---------- */
  async function loadSaved() {
    const cl = SM.cloud();
    let list = SM.local.get('filters', []);
    if (cl) {
      try {
        if (list.length) {
          /* move this device's filters into the account once */
          const { error } = await cl.from('saved_filters').insert(list.map(x => ({ name: x.name, spec: x.spec })));
          if (!error) { SM.local.set('filters', []); list = []; }
        }
        const { data, error } = await cl.from('saved_filters').select('id,name,spec,created_at').order('created_at', { ascending: false });
        if (!error && data) return { cloud: true, list: data };
      } catch (e) { console.warn('[somm filters]', e); }
    }
    return { cloud: false, list };
  }
  async function saved() {
    const box = EL?.querySelector('#sm-saved'); if (!box) return;
    box.innerHTML = '<p class="note">Loading…</p>';
    const S2 = await loadSaved();
    ST.saved = S2.list;
    const can = active(ST.spec);
    box.innerHTML = `${can ? `<form class="sm-save" autocomplete="off"><label class="vm-field"><span>Save the current filter as</span><input class="vm-input" id="sm-sname" maxlength="80" placeholder="e.g. Cool Syrah to taste" value="${esc(ST.spec.p ? PRESETS.find(p => p.id === ST.spec.p)?.title || '' : '')}"></label><button type="submit" class="btn solid">Save</button></form>` : '<p class="note">Set a filter first, then save it here.</p>'}
      <p class="note">${S2.cloud ? 'Saved to your account, so they follow you to other devices.' : VM.auth?.available ? 'Saved on this device. Sign in from Cellar to keep them in your account.' : 'Saved on this device only.'}</p>
      ${S2.list.length ? `<ul class="list">${S2.list.map((x, i) => `<li class="sm-sv"><button type="button" class="row" data-load="${i}"><span class="row-name">${esc(x.name)}<small>${esc(describe(x.spec))}</small></span></button><button type="button" class="icon-btn" data-del="${i}" aria-label="Delete ${esc(x.name)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></li>`).join('')}</ul>` : '<p class="vm-empty">No saved filters yet.</p>'}`;
    box.querySelector('.sm-save')?.addEventListener('submit', async e => {
      e.preventDefault();
      const name = box.querySelector('#sm-sname').value.trim() || describe(ST.spec);
      const spec = clone(ST.spec);
      const cl = SM.cloud();
      if (cl) {
        const { error } = await cl.from('saved_filters').insert({ name, spec });
        if (error) { VM.toast('Could not save to your account. Saved on this device instead.'); localSave(name, spec); }
      } else localSave(name, spec);
      VM.toast(`Saved "${name}"`);
      saved();
    });
    box.querySelectorAll('[data-load]').forEach(x => x.addEventListener('click', () => {
      const it = ST.saved[+x.dataset.load];
      if (!it) return;
      ST.spec = { ...blank(), ...it.spec, r: it.spec.r || {} };
      if (ST.spec.c.length) loadCountries();
      switchTab('results'); update();
      const ids = lastRes.map(i => T.ids[i]); if (ids.length) VM.frame(ids, { maxZoom: 8 });
    }));
    box.querySelectorAll('[data-del]').forEach(x => x.addEventListener('click', async () => {
      const it = ST.saved[+x.dataset.del];
      if (!it) return;
      const cl = SM.cloud();
      if (cl && it.id && !String(it.id).startsWith('l')) await cl.from('saved_filters').delete().eq('id', it.id);
      else SM.local.set('filters', SM.local.get('filters', []).filter(y => y.id !== it.id));
      saved();
    }));
  }
  function localSave(name, spec) {
    const l = SM.local.get('filters', []);
    l.unshift({ id: 'l' + Date.now().toString(36), name, spec, created_at: new Date().toISOString() });
    SM.local.set('filters', l.slice(0, 50));
  }
  /* "Riesling · S, SE, SW · slope ≥ 15%" */
  function describe(s) {
    const p = [];
    if (s.ids && s.p) return PRESETS.find(x => x.id === s.p)?.title || 'Custom list';
    if (arr(s.g).length) p.push(s.g.map(g => VM.data.grapeById(g)?.name || g).join(s.gm === 'all' ? ' + ' : ' or '));
    if (arr(s.st).length) p.push(s.st.map(x => STY_L[x]).join(', '));
    if (arr(s.c).length) p.push(s.c.map(c => VM.data.countryName(c)).join(', '));
    if (s.ow) p.push(s.ow === 'old' ? 'Old World' : 'New World');
    if (arr(s.cat).length) p.push(s.cat.join(', '));
    if (arr(s.wk).length) p.push('Winkler ' + s.wk.map(i => SM.WK[i]).join(', '));
    const save = ST.spec; ST.spec = { ...blank(), ...s };
    for (const k of Object.keys(s.r || {})) if (T?.has[k]) p.push(`${R[k].label.split(' ')[0].toLowerCase() === 'growing-season' ? 'GST' : R[k].label} ${rangeText(k)}`);
    ST.spec = save;
    if (arr(s.asp).length) p.push(s.asp.map(i => SM.OCT[i]).join(', ') + (s.sun ? ' (sun-facing)' : ''));
    return p.join(' · ') || 'Everything';
  }

  SM.filterDots = on => { if (!on) { dots([]); ST.hl = ''; ST.lit = false; } };
  /* other modules can open a filter: VM.somm.filter({g: ['syrah'], r: {gst: [14, 17]}}) */
  SM.filter = spec => { ST.spec = { ...blank(), ...clone(spec), r: clone(spec.r || {}) }; ST.tab = 'results'; VM.go('filter-' + encode(ST.spec)); };
  SM.filterPresets = PRESETS;
})();
