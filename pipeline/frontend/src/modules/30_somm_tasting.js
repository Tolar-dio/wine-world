/* Vitis Mundi v2, sommelier tools: the deductive tasting trainer (#study-tasting) and Blind practice (#study-blind).
   A fast SAT-style grid (colour, structure on 5-point scales, aroma chips) ranks every grape and style in
   data/study/tasting.json by distance on the scales, aroma overlap (rarer aromas count more) and style, explains the
   leader in words, names the classic look-alike and lights the classic places on the map. A vintage can be chosen
   to read that year's weather in those places. Blind practice turns it round: a note from the data, you name the
   grape and the place. Rendered inside the Study view (30_somm_study.js). */
(() => {
  if (!window.VM || !VM.somm) return;
  const SM = VM.somm;
  const { esc, fold, arr, clamp, inl } = VM.util;

  /* ---------- the data ---------- */
  const FAMS = { white: ['lemon-green', 'lemon', 'gold', 'amber', 'brown'], orange: ['amber', 'orange'], rose: ['pink', 'salmon', 'orange'], red: ['purple', 'ruby', 'garnet', 'tawny', 'brown'] };
  const FAM_L = { white: 'White', orange: 'Orange', rose: 'Rosé', red: 'Red' };
  const SCALES = [
    ['acid', 'Acidity', ['low', 'medium(-)', 'medium', 'medium(+)', 'high'], 1.3],
    ['tannin', 'Tannin', ['low', 'medium(-)', 'medium', 'medium(+)', 'high'], 1.3],
    ['alcohol', 'Alcohol', ['low', 'medium(-)', 'medium', 'medium(+)', 'high'], 0.9],
    ['body', 'Body', ['light', 'medium(-)', 'medium', 'medium(+)', 'full'], 0.8],
    ['sweetness', 'Sweetness', ['dry', 'off-dry', 'medium', 'sweet', 'luscious'], 1.6],
    ['intensity', 'Aroma intensity', ['light', 'medium(-)', 'medium', 'medium(+)', 'pronounced'], 0.5]
  ];
  const SHORT = { acid: ['L', 'M−', 'M', 'M+', 'H'], tannin: ['L', 'M−', 'M', 'M+', 'H'], alcohol: ['L', 'M−', 'M', 'M+', 'H'], body: ['Lt', 'M−', 'M', 'M+', 'F'], sweetness: ['Dry', 'Off', 'Med', 'Swt', 'Lus'], intensity: ['Lt', 'M−', 'M', 'M+', 'Pr'] };
  const CLORDER = ['floral', 'green fruit', 'citrus fruit', 'stone fruit', 'tropical fruit', 'red fruit', 'black fruit', 'dried/cooked fruit', 'herbaceous', 'herbal', 'pungent spice', 'other', 'yeast', 'malolactic conversion', 'oak', 'carbonic maceration', 'noble rot', 'skin contact', 'fortification', 'deliberate oxidation', 'fruit development (white)', 'fruit development (red)', 'bottle age (white)', 'bottle age (red)'];
  let TD = null;
  async function load() {
    if (TD) return TD;
    const j = await VM.data.study('tasting');
    if (!j) return null;
    const meta = j._meta || {};
    const profs = [], df = new Map(), clOf = new Map(), freq = new Map();
    for (const [gid, g] of Object.entries(j)) {
      if (gid.startsWith('_') || !g || !g.styles) continue;
      for (const [sk, s] of Object.entries(g.styles)) {
        const base = s.base || sk;
        const hues = arr(s.colour).map(c => String(c).split(' '));
        const fams = new Set();
        for (const [, h] of hues) for (const [f, hs] of Object.entries(FAMS)) if (hs.includes(h)) fams.add(f);
        const aromas = new Set(arr(s.aromas));
        const cls = new Set();
        for (const [, d] of Object.entries(s.clusters || {})) for (const [cl, ws] of Object.entries(d)) { cls.add(cl); for (const w of ws) if (!clOf.has(w)) clOf.set(w, cl); }
        for (const a of aromas) { df.set(a, (df.get(a) || 0) + 1); }
        profs.push({ gid, g, sk, s, base, hues, fams, aromas, cls, name: g.name || gid });
      }
    }
    for (const p of profs) for (const a of p.aromas) freq.set(a, (freq.get(a) || 0) + 1);
    TD = { meta, profs, df, clOf, freq, N: profs.length, grapes: j };
    return TD;
  }
  const idf = a => Math.log((TD.N + 1) / ((TD.df.get(a) || 0) + 1)) + 0.2;

  /* ---------- the engine ---------- */
  /* T: {fam, int, hue, type: 'still'|'sparkling'|'fortified', acid..intensity: 1-5|null, aromas: Set} */
  function scoreProfile(p, T) {
    const b = p.base;
    if (T.type === 'still' && (b === 'sparkling' || b === 'fortified')) return null;
    if (T.type === 'sparkling' && b !== 'sparkling') return null;
    if (T.type === 'fortified' && b !== 'fortified') return null;
    if (T.fam && p.fams.size && !p.fams.has(T.fam)) return null;
    const why = [], miss = [];
    let colour = 0;
    if (T.hue || T.int) {
      const exact = p.hues.some(([i, h]) => (!T.int || i === T.int) && (!T.hue || h === T.hue));
      const hueOk = T.hue && p.hues.some(([, h]) => h === T.hue);
      const intOk = T.int && p.hues.some(([i, h]) => i === T.int && (!T.fam || FAMS[T.fam].includes(h)));
      if (exact) { colour = T.int && T.hue ? 1.2 : 0.5; why.push({ k: 'colour', w: T.int && T.hue ? 2.4 : 1, t: [T.int, T.hue].filter(Boolean).join(' ') }); }
      else if (hueOk) colour = 0.5;
      else if (intOk) colour = 0.15;
      else { colour = -0.7; miss.push({ k: 'colour', t: `usually ${p.hues.map(x => x.join(' ')).slice(0, 2).join(' or ')}`, w: 0.7 }); }
    }
    let pen = 0, bonus = 0;
    for (const [k, l, words, w] of SCALES) {
      const v = T[k];
      if (v == null) continue;
      const r = p.s[k];
      if (!Array.isArray(r)) continue;
      const d = v < r[0] ? r[0] - v : v > r[1] ? v - r[1] : 0;
      pen += w * d * d;
      if (!d) {
        const ext = Math.abs(v - 3);
        if (ext) { bonus += 0.18 * ext * w; why.push({ k, w: w * ext, t: `${words[v - 1]}${NOUN[k] ? ' ' + NOUN[k] : ''}` }); }
      } else miss.push({ k, w: w * d * d, t: `${l.toLowerCase()} is usually ${rangeWords(r, words)}` });
    }
    let ar = 0;
    const hit = [];
    if (T.aromas.size) {
      const norm = Math.sqrt(T.aromas.size);
      for (const a of T.aromas) {
        if (p.aromas.has(a)) { ar += idf(a); hit.push(a); }
        else if (p.cls.has(TD.clOf.get(a))) ar += 0.15 * idf(a);
      }
      ar /= norm;
    }
    const total = 2 - pen + colour + bonus + 0.55 * ar;
    return { p, total, why: why.sort((a, b) => b.w - a.w), miss: miss.sort((a, b) => b.w - a.w), hit: hit.sort((a, b) => idf(b) - idf(a)), pen };
  }
  const NOUN = { acid: 'acid', tannin: 'tannin', alcohol: 'alcohol', body: 'body', sweetness: '', intensity: 'nose' };
  const rangeWords = (r, words) => r[0] === r[1] ? words[r[0] - 1] : `${words[r[0] - 1]} to ${words[r[1] - 1]}`;
  function rank(T) {
    const all = [];
    for (const p of TD.profs) { const r = scoreProfile(p, T); if (r) all.push(r); }
    /* best style per grape, then a softmax over grapes for a share of plausibility */
    const best = new Map();
    for (const r of all) { const b = best.get(r.p.gid); if (!b || r.total > b.total) best.set(r.p.gid, r); }
    const list = [...best.values()].sort((a, b) => b.total - a.total);
    const mx = list[0]?.total ?? 0;
    const ex = list.map(r => Math.exp(r.total - mx));
    const sum = ex.reduce((s, x) => s + x, 0) || 1;
    list.forEach((r, i) => { r.share = ex[i] / sum; });
    return list;
  }
  SM.tastingRank = (T) => TD ? rank(T) : [];
  function inputCount(T) { return SCALES.filter(([k]) => T[k] != null).length + (T.fam ? 1 : 0) + (T.hue ? 1 : 0) + (T.int ? 1 : 0) + T.aromas.size; }
  /* "high acid + high tannin + pale garnet → Nebbiolo; tar and roses confirm" */
  function reasoning(r, runner) {
    const g = r.p.name;
    const lead = r.why.slice(0, 3).map(x => x.t);
    let s = lead.length ? `${lead.join(' + ')} → ${g}` : `${g} fits best`;
    if (r.hit.length) s += `; ${SM.list(r.hit.slice(0, 2))} ${r.hit.length > 1 ? 'confirm' : 'confirms'}`;
    s += '.';
    if (r.miss.length) s += ` But ${r.miss[0].t}.`;
    const out = [s];
    const tellOf = (a, b) => arr(TD.grapes[a]?.confused_with).find(x => x.id === b)?.tell;
    if (runner) {
      const t = tellOf(r.p.gid, runner.p.gid) || tellOf(runner.p.gid, r.p.gid);
      if (t) out.push(`Not ${runner.p.name}? ${t}`);
    }
    return out;
  }

  /* ---------- state and rendering ---------- */
  const T = { fam: '', int: '', hue: '', type: 'still', acid: null, tannin: null, alcohol: null, body: null, sweetness: null, intensity: null, aromas: new Set(), year: null };
  const saved = SM.local.get('tgrid', null);
  if (saved) Object.assign(T, saved, { aromas: new Set(arr(saved.aromas)) });
  const saveT = () => SM.local.set('tgrid', { ...T, aromas: [...T.aromas] });
  let EL = null, GEN = 0;
  const off = () => { EL = null; GEN++; };
  VM.on('view', v => { if (v.id !== 'study' || !['tasting', 'blind'].includes(v.arg)) off(); });
  VM.on('profile:open', off);
  VM.on('panel:close', off);
  SM.tasting = { render, setGrid: v => { Object.assign(T, v, { aromas: new Set(arr(v.aromas)) }); saveT(); } };

  async function render(el, mode) {
    EL = el;
    const g = ++GEN;
    el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">${mode === 'blind' ? 'Blind practice' : 'Deductive tasting'}</span></p><p class="note">Loading the tasting profiles…</p>`;
    const d = await load();
    if (g !== GEN || EL !== el) return;
    if (!d) { el.innerHTML = `<p class="crumbs"><a href="#study">Study</a></p>${VM.h.pending('tasting trainer')}`; return; }
    if (mode === 'blind') return blind.start(el);
    grid(el);
  }

  function grid(el) {
    const famHues = T.fam ? FAMS[T.fam] : [];
    el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">Deductive tasting</span></p>
      <div class="head"><h2 class="title">What is in the glass?</h2><p class="tagline">Describe the wine as you would on a tasting sheet. Every tap re-ranks ${VM.fmt.num(new Set(TD.profs.map(p => p.gid)).size)} grapes in ${VM.fmt.num(TD.N)} styles.</p></div>
      <div class="tg-lead" id="tg-lead" role="status" aria-live="polite"></div>
      <div class="tg">
        <div class="tg-r"><span class="lk">Wine</span><div class="tg-seg" role="group" aria-label="Kind of wine">${[['still', 'Still'], ['sparkling', 'Sparkling'], ['fortified', 'Fortified']].map(([v, l]) => `<button type="button" aria-pressed="${T.type === v}" data-t="type" data-v="${v}">${l}</button>`).join('')}</div></div>
        <div class="tg-r"><span class="lk">Colour</span><div class="tg-seg" role="group" aria-label="Colour">${Object.entries(FAM_L).map(([v, l]) => `<button type="button" aria-pressed="${T.fam === v}" data-t="fam" data-v="${v}"><i class="tg-sw f-${v}" aria-hidden="true"></i>${l}</button>`).join('')}</div></div>
        <div class="tg-r"><span class="lk">Intensity</span><div class="tg-seg" role="group" aria-label="Colour intensity">${['pale', 'medium', 'deep'].map(v => `<button type="button" aria-pressed="${T.int === v}" data-t="int" data-v="${v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}</div></div>
        ${T.fam ? `<div class="tg-r"><span class="lk">Hue</span><div class="tg-seg wrap" role="group" aria-label="Hue">${famHues.map(v => `<button type="button" aria-pressed="${T.hue === v}" data-t="hue" data-v="${v}"><i class="tg-sw h-${v}" aria-hidden="true"></i>${v.replace('-', ' ')}</button>`).join('')}</div></div>` : ''}
        ${SCALES.map(([k, l, words]) => (k === 'tannin' && T.fam && T.fam !== 'red' && T.fam !== 'orange') ? '' : `<div class="tg-r"><span class="lk">${esc(l)}</span><div class="tg-seg five" role="group" aria-label="${esc(l)}">${SHORT[k].map((s, i) => `<button type="button" aria-pressed="${T[k] === i + 1}" aria-label="${esc(words[i])}" title="${esc(words[i])}" data-t="${k}" data-v="${i + 1}">${esc(s)}</button>`).join('')}</div></div>`).join('')}
      </div>
      <div class="tg-ar">${VM.h.sec('Aromas and flavours')}
        <div class="chips tg-chosen">${[...T.aromas].map(a => `<button type="button" class="chip sm-on" data-rm="${esc(a)}" aria-label="Remove ${esc(a)}">${esc(a)} <span aria-hidden="true">×</span></button>`).join('')}</div>
        <input class="vm-input" id="tg-q" type="search" placeholder="Add an aroma (cherry, petrol, tar…)" aria-label="Add an aroma" autocomplete="off" spellcheck="false">
        <ul class="chips tg-sug" id="tg-sug" aria-label="Suggested aromas"></ul>
        <details class="tg-fam"><summary>Browse by family</summary><div id="tg-fams"></div></details>
      </div>
      <div class="btn-row" style="margin-top:14px"><button type="button" class="btn ghost small" data-reset="1">Start again</button><a class="btn ghost small" href="#study-blind">Blind practice</a></div>
      <div id="tg-res"></div>`;
    bindGrid(el);
    sug();
    results();
  }
  function bindGrid(el) {
    el.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.t, raw = b.dataset.v;
      const v = ['type', 'fam', 'int', 'hue'].includes(k) ? raw : +raw;
      if (k === 'type') T.type = v;
      else T[k] = T[k] === v ? (k === 'fam' || k === 'int' || k === 'hue' ? '' : null) : v;
      if (k === 'fam') { if (T.hue && !(FAMS[T.fam] || []).includes(T.hue)) T.hue = ''; if (T.fam && T.fam !== 'red' && T.fam !== 'orange') T.tannin = null; }
      saveT();
      if (k === 'fam') { const y = EL.scrollTop; grid(el); EL.scrollTop = y; return; }
      el.querySelectorAll(`[data-t="${k}"]`).forEach(x => x.setAttribute('aria-pressed', String((['type', 'fam', 'int', 'hue'].includes(k) ? x.dataset.v : +x.dataset.v) === T[k])));
      results();
    }));
    el.querySelector('#tg-q').addEventListener('input', sug);
    el.querySelector('#tg-q').addEventListener('keydown', e => { if (e.key === 'Enter') { const f = el.querySelector('#tg-sug [data-add]'); if (f) { e.preventDefault(); f.click(); } } });
    el.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { T.aromas.delete(b.dataset.rm); saveT(); refreshChosen(); }));
    el.querySelector('[data-reset]').addEventListener('click', () => { Object.assign(T, { fam: '', int: '', hue: '', type: 'still', acid: null, tannin: null, alcohol: null, body: null, sweetness: null, intensity: null, aromas: new Set() }); saveT(); grid(el); });
    el.querySelector('.tg-fam').addEventListener('toggle', e => { if (e.target.open) fams(); }, { once: true });
  }
  function refreshChosen() {
    const box = EL?.querySelector('.tg-chosen'); if (!box) return;
    box.innerHTML = [...T.aromas].map(a => `<button type="button" class="chip sm-on" data-rm="${esc(a)}" aria-label="Remove ${esc(a)}">${esc(a)} <span aria-hidden="true">×</span></button>`).join('');
    box.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { T.aromas.delete(b.dataset.rm); saveT(); refreshChosen(); }));
    sug(); results();
  }
  /* suggestions: matching words, else the commonest aromas of the wines still in the running */
  function sug() {
    const ul = EL?.querySelector('#tg-sug'); if (!ul) return;
    const q = fold(EL.querySelector('#tg-q').value);
    let words;
    if (q) words = [...TD.freq.keys()].filter(a => !T.aromas.has(a) && fold(a).includes(q)).sort((a, b) => (fold(a).startsWith(q) ? 0 : 1) - (fold(b).startsWith(q) ? 0 : 1) || TD.freq.get(b) - TD.freq.get(a)).slice(0, 14);
    else {
      const top = rank(T).slice(0, 12);
      const c = new Map();
      for (const r of top) for (const a of r.p.aromas) if (!T.aromas.has(a)) c.set(a, (c.get(a) || 0) + r.share + 0.02);
      words = [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(x => x[0]);
    }
    ul.innerHTML = words.map(a => `<li><button type="button" class="chip" data-add="${esc(a)}">${esc(a)}</button></li>`).join('') || (q ? '<li class="note">No aroma by that name in the profiles.</li>' : '');
    ul.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => { T.aromas.add(b.dataset.add); saveT(); EL.querySelector('#tg-q').value = ''; refreshChosen(); }));
  }
  function fams() {
    const box = EL?.querySelector('#tg-fams'); if (!box) return;
    const by = new Map();
    for (const [w, cl] of TD.clOf) { if (!by.has(cl)) by.set(cl, []); by.get(cl).push(w); }
    box.innerHTML = CLORDER.filter(c => by.has(c)).map(c => `<p class="lk tg-cl">${esc(c)}</p><ul class="chips">${by.get(c).sort((a, b) => TD.freq.get(b) - TD.freq.get(a)).slice(0, 24).map(a => `<li><button type="button" class="chip${T.aromas.has(a) ? ' sm-on' : ''}" data-tog="${esc(a)}" aria-pressed="${T.aromas.has(a)}">${esc(a)}</button></li>`).join('')}</ul>`).join('');
    box.querySelectorAll('[data-tog]').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.tog;
      if (T.aromas.has(a)) T.aromas.delete(a); else T.aromas.add(a);
      b.classList.toggle('sm-on', T.aromas.has(a)); b.setAttribute('aria-pressed', String(T.aromas.has(a)));
      saveT(); refreshChosen();
    }));
  }

  /* ---------- results ---------- */
  function results() {
    const box = EL?.querySelector('#tg-res'), lead = EL?.querySelector('#tg-lead');
    if (!box) return;
    const n = inputCount(T);
    if (n < 2) {
      box.innerHTML = `${VM.h.sec('Candidates')}<p class="vm-empty">Set at least two things (a colour and the acidity, say) and the candidates appear here.</p>`;
      if (lead) lead.innerHTML = '';
      return;
    }
    const list = rank(T);
    if (!list.length) { box.innerHTML = `${VM.h.sec('Candidates')}<p class="vm-empty">Nothing in the profiles fits that combination. Loosen the colour or the kind of wine.</p>`; if (lead) lead.innerHTML = ''; return; }
    const top = list.slice(0, 6);
    const r0 = top[0];
    if (lead) lead.innerHTML = `<button type="button" class="tg-lead-b" data-jump="1"><span class="lk">Leading</span><b>${esc(r0.p.name)}</b><span class="mono">${VM.fmt.pct(r0.share)}</span></button>`;
    lead?.querySelector('[data-jump]')?.addEventListener('click', () => EL.querySelector('#tg-res')?.scrollIntoView({ block: 'start', behavior: VM.reducedMotion() ? 'auto' : 'smooth' }));
    const sl = r => r.p.s.label || ({ red: 'red', white: 'white', rose: 'rosé', sparkling: 'sparkling', fortified: 'fortified', sweet: 'sweet', botrytis: 'botrytised sweet', orange: 'skin-contact', oxidative: 'oxidative', off_dry: 'off-dry' }[r.p.base] || r.p.base);
    const why = reasoning(r0, top[1]);
    const regs = arr(r0.p.s.classic_regions);
    box.innerHTML = `${VM.h.sec('Candidates')}
      <ol class="tg-list">${top.map((r, i) => `<li class="${i ? '' : 'top'}"><div class="tg-c"><span class="tg-cn"><a href="#grape-${esc(r.p.gid)}">${esc(r.p.name)}</a><small>${esc(sl(r))}</small></span><span class="tg-pct mono">${VM.fmt.pct(r.share)}</span></div><i class="tg-bar" aria-hidden="true"><i style="width:${(r.share * 100).toFixed(1)}%"></i></i>${i ? `<p class="tg-mini">${esc([r.why.slice(0, 2).map(x => x.t).join(', '), r.hit.slice(0, 2).join(', ')].filter(Boolean).join('; ') || 'a looser fit')}${r.miss[0] ? ` <span class="tg-miss">but ${esc(r.miss[0].t)}</span>` : ''}</p>` : ''}</li>`).join('')}</ol>
      <div class="tg-why"><p class="lk">Why ${esc(r0.p.name)}</p>${why.map(s => `<p>${esc(s)}</p>`).join('')}${r0.p.s.markers || r0.p.g.markers ? `<aside class="marg"><span class="lk">The markers</span>${inl(r0.p.s.markers || r0.p.g.markers)}</aside>` : ''}${r0.p.s.oak ? `<p class="note"><b>Oak:</b> ${inl(r0.p.s.oak)}</p>` : ''}</div>
      ${regs.length ? `${VM.h.sec(`Where ${r0.p.name} is classic`)}<ul class="tg-regs">${regs.slice(0, 8).map(x => `<li><a href="#${esc(x.id)}">${esc(x.name || SM.nameOf(x.id))}</a>${x.markers ? `<span>${inl(x.markers)}</span>` : ''}</li>`).join('')}</ul>
        <div class="btn-row">${VM.map ? `<button type="button" class="btn small" data-light="1">Light them on the map</button>` : ''}</div>
        <div class="tg-vin"><label class="vm-field sm-yr"><span>Vintage, if you know it</span><select class="vm-select" id="tg-year"><option value="">Any year</option>${Array.from({ length: 76 }, (_, i) => 2025 - i).map(y => `<option value="${y}"${y === T.year ? ' selected' : ''}>${y}</option>`).join('')}</select></label><div id="tg-vy"></div></div>` : ''}
      <p class="src">Ranks come from distance on the 5-point scales, colour, and the aromas you chose (a rarer aroma counts for more), against profiles built from the WSET Level 3 grid and the classic deductive markers. Scales: ${esc(TD.meta.scales?.alcohol ? 'alcohol bands are a project convention (' + TD.meta.scales.alcohol.replace(/^.*?for still wines roughly /, 'still wines roughly ').replace(/ \(project.*$/, '') + ')' : '1 low to 5 high')}.</p>`;
    box.querySelector('[data-light]')?.addEventListener('click', () => {
      const ids = regs.map(x => x.id).filter(id => VM.data.entity(id)?.lp || VM.data.indexById.has(id));
      SM.map.light(ids, { prefix: 'tg:', owner: 'tasting', label: `${r0.p.name}: classic places`, dimOthers: true });
      VM.frame(ids, { maxZoom: 8 });
      if (VM.isPhone()) VM.panel.snap('peek');
    });
    const sel = box.querySelector('#tg-year');
    sel?.addEventListener('change', () => { T.year = sel.value ? +sel.value : null; saveT(); vintage(r0); });
    if (T.year) vintage(r0);
  }
  /* the chosen year's weather in the leader's classic places, and what it would do to the profile */
  async function vintage(r) {
    const box = EL?.querySelector('#tg-vy'); if (!box) return;
    if (!T.year) { box.innerHTML = ''; return; }
    const y = T.year;
    const ids = arr(r.p.s.classic_regions).map(x => x.id).filter(id => ['appellation', 'region'].includes(VM.data.typeOf(id))).slice(0, 4);
    const rows = [];
    const seen = new Set();
    for (const id of ids) {
      const v = await VM.data.vintage(id).catch(() => null);
      if (!v || seen.has(v.id)) continue;
      seen.add(v.id);
      const k = y - v.data.y0, g = v.data.gst?.[k];
      if (g == null) continue;
      const base = v.data.n9120?.gst ?? SM.median(v.data.gst);
      const an = g - base, hr = v.data.hr?.[k], hrN = SM.median(arr(v.data.hr).slice(41, 71)), hd = v.data.hd?.[k];
      const ev = (await VM.data.events(id).catch(() => [])).filter(e => e.year === y);
      const hint = an >= 1 ? 'a hot year: expect riper fruit, more alcohol and softer acidity than the profile' : an <= -1 ? 'a cool year: expect leaner fruit, sharper acidity and less alcohol' : 'close to normal warmth';
      const wet = hr != null && hrN && hr > hrN * 1.5 ? '; a wet harvest, so dilution and rot were risks' : hr != null && hrN && hr < hrN * 0.5 ? '; a dry harvest' : '';
      rows.push(`<li><p><b>${esc(SM.nameOf(id))}</b> <span class="mono">${VM.fmt.temp(g)}</span> <span class="mono sm-an ${an > 0 ? 'w' : 'c'}">${VM.fmt.signed(an, 1, ' °C')}</span>${hd != null ? ` <span class="note mono">${VM.fmt.num(hd)} hot days</span>` : ''}</p><p class="note">${esc(hint + wet)}.</p>${ev.map(e => `<p class="sm-ev"><span class="vm-badge">${esc(e.kind)}</span> ${esc(e.text)}</p>`).join('')}</li>`);
    }
    box.innerHTML = rows.length ? `<ul class="tg-vy">${rows.join('')}</ul><p class="src">Growing-season temperature against the 1991–2020 mean, from TerraClimate.</p>` : `<p class="note">No weather record for these places in ${y}.</p>`;
  }

  /* ---------- Blind practice ---------- */
  const blind = {
    round: 0, total: 5, score: 0, start: 0, cur: null,
    async start(el) {
      this.round = 0; this.score = 0; this.start = Date.now();
      /* classic grapes first: those the grape-to-region deck teaches, else the most widely permitted */
      const decks = await VM.data.study('decks');
      const deckG = new Set(arr(arr(decks?.decks).find(d => d.id === 'grape-to-region')?.cards).map(c => c.target));
      await VM.data.loadGlobals();
      const reach = g => arr(VM.data.varieties?.[g]).length;
      this.pool = TD.profs.filter(p => arr(p.s.classic_regions).length && p.aromas.size >= 5 && (deckG.size ? deckG.has(p.gid) : reach(p.gid) >= 25));
      if (this.pool.length < 8) this.pool = TD.profs.filter(p => arr(p.s.classic_regions).length && p.aromas.size >= 4);
      this.next(el);
    },
    pick() {
      const w = this.pool.map(p => Math.sqrt(1 + arr(VM.data.varieties?.[p.gid]).length) * (p.base === 'red' || p.base === 'white' ? 1 : 0.6));
      let r = Math.random() * w.reduce((s, x) => s + x, 0);
      for (let i = 0; i < w.length; i++) { r -= w[i]; if (r <= 0) return this.pool[i]; }
      return this.pool[0];
    },
    note(p) {
      const s = p.s, mid = r => Array.isArray(r) ? (r[0] === r[1] ? r[0] : r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1))) : null;
      const col = arr(s.colour)[Math.floor(Math.random() * arr(s.colour).length)] || '';
      const v = {}; for (const [k] of SCALES) v[k] = mid(s[k]);
      const cl = s.clusters || {};
      const prim = SM.shuffle(Object.values(cl.primary || {}).flat()).slice(0, 4);
      const later = SM.shuffle([...Object.values(cl.secondary || {}).flat(), ...Object.values(cl.tertiary || {}).flat()]).slice(0, 2);
      const ar = [...prim, ...later].slice(0, 6);
      const [ci, ch] = col.split(' ');
      const W = Object.fromEntries(SCALES.map(([k, , words]) => [k, words]));
      const struct = [`${W.sweetness[v.sweetness - 1]}`, `${W.acid[v.acid - 1]} acidity`, p.base === 'red' || (s.tannin && s.tannin[0] > 1) ? `${W.tannin[v.tannin - 1]} tannin` : '', `${W.body[v.body - 1]} body`, `${W.alcohol[v.alcohol - 1]} alcohol`].filter(Boolean);
      const text = `${col ? col[0].toUpperCase() + col.slice(1) : ''}${p.base === 'sparkling' ? ', with a fine mousse' : ''}${p.base === 'fortified' ? ', fortified' : ''}. ${v.intensity ? `${W.intensity[v.intensity - 1][0].toUpperCase() + W.intensity[v.intensity - 1].slice(1)} nose` : 'On the nose'}: ${ar.join(', ')}. On the palate ${struct.join(', ')}.`;
      const fam = ch ? Object.keys(FAMS).find(f => FAMS[f].includes(ch) && (f !== 'white' || p.fams.has('white'))) || '' : '';
      return { text, grid: { fam: p.fams.has(fam) ? fam : [...p.fams][0] || '', int: ci || '', hue: ch || '', type: p.base === 'sparkling' ? 'sparkling' : p.base === 'fortified' ? 'fortified' : 'still', ...v, aromas: ar } };
    },
    next(el) {
      const p = this.pick();
      const n = this.note(p);
      /* grape choices: the answer, its classic look-alikes, and what the engine would confuse it with */
      const opts = [p.gid];
      for (const c of arr(p.g.confused_with)) if (TD.grapes[c.id] && !opts.includes(c.id) && opts.length < 3) opts.push(c.id);
      const ranked = rank({ ...n.grid, aromas: new Set(n.grid.aromas) });
      for (const r of ranked) { if (opts.length >= 4) break; if (!opts.includes(r.p.gid)) opts.push(r.p.gid); }
      this.cur = { p, n, opts: SM.shuffle(opts), step: 'grape', pickG: null, pickR: null };
      this.draw(el);
    },
    draw(el) {
      const c = this.cur, p = c.p;
      const gname = id => TD.grapes[id]?.name || VM.data.grapeById(id)?.name || id;
      let body = '';
      if (c.step === 'grape') {
        body = `<p class="st-q">Which grape?</p><div class="st-choices" role="group" aria-label="Grapes">${c.opts.map((g, i) => `<button type="button" class="st-ch" data-g="${esc(g)}"><span class="mono">${'ABCD'[i]}</span>${esc(gname(g))}</button>`).join('')}</div>`;
      } else if (c.step === 'region') {
        body = `<p class="st-verdict ${c.pickG === p.gid ? 'ok' : 'no'}"><b>${c.pickG === p.gid ? 'Right' : 'Missed'}</b> ${c.pickG === p.gid ? '' : `It is ${esc(p.name)}.`}</p><p class="st-q">Now the place. Where is this a classic?</p><div class="st-choices" role="group" aria-label="Places">${c.regOpts.map((r, i) => `<button type="button" class="st-ch" data-r="${i}"><span class="mono">${'ABCD'[i]}</span>${esc(r.name)}</button>`).join('')}</div>`;
      } else body = this.revealHTML();
      el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">Blind practice</span></p>
        <div class="st-top"><span class="st-pos mono">${this.round + 1} / ${this.total}</span><span class="st-ml">Blind practice · ${this.score} right</span><a class="btn small ghost" href="#study-tasting">Grid</a></div>
        <div class="vm-card tg-note"><p class="lk">The note</p><p>${esc(c.n.text)}</p></div>
        <div class="st-name">${body}</div><div class="btn-row st-act" id="st-act"></div>`;
      el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => this.grape(el, b.dataset.g)));
      el.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => this.region(el, +b.dataset.r)));
      if (c.step === 'done') this.bindReveal(el);
      el.scrollTop = 0;
    },
    grape(el, g) {
      const c = this.cur, p = c.p;
      c.pickG = g;
      const right = arr(p.s.classic_regions);
      const ok = r => ({ id: r.id, name: r.name || SM.nameOf(r.id) });
      const good = ok(right[0]);
      const wrong = [];
      const seen = new Set(right.map(r => r.id));
      for (const gid of c.opts.filter(x => x !== p.gid)) {
        const prof = TD.profs.find(q => q.gid === gid && arr(q.s.classic_regions).length);
        const r = prof && arr(prof.s.classic_regions).find(x => !seen.has(x.id));
        if (r) { seen.add(r.id); wrong.push(ok(r)); }
      }
      while (wrong.length < 3) {
        const q = this.pool[Math.floor(Math.random() * this.pool.length)];
        const r = arr(q.s.classic_regions).find(x => !seen.has(x.id));
        if (r) { seen.add(r.id); wrong.push(ok(r)); }
      }
      c.regOpts = SM.shuffle([good, ...wrong.slice(0, 3)]);
      c.step = 'region';
      this.draw(el);
    },
    async region(el, i) {
      const c = this.cur, p = c.p;
      c.pickR = c.regOpts[i];
      c.okR = arr(p.s.classic_regions).some(r => r.id === c.pickR.id);
      c.okG = c.pickG === p.gid;
      if (c.okG) this.score++;
      c.step = 'done';
      this.draw(el);
      const ids = arr(p.s.classic_regions).map(r => r.id).filter(id => VM.data.entity(id)?.lp || VM.data.indexById.has(id));
      if (VM.map && ids.length) {
        SM.map.light(ids, { prefix: 'tg:', owner: 'tasting', label: `${p.name}: classic places`, dimOthers: true });
        /* on a phone the answer comes first; the map is one tap away */
        if (!VM.isPhone()) VM.frame(ids, { maxZoom: 7 });
        c.ids = ids;
      }
    },
    revealHTML() {
      const c = this.cur, p = c.p, g = p.g;
      const tell = c.pickG !== p.gid ? (arr(g.confused_with).find(x => x.id === c.pickG)?.tell || arr(TD.grapes[c.pickG]?.confused_with).find(x => x.id === p.gid)?.tell) : null;
      return `<div class="st-verdict ${c.okG ? 'ok' : 'no'}"><b>${c.okG ? 'Grape right' : 'Grape missed'}</b> It is <a href="#grape-${esc(p.gid)}">${esc(p.name)}</a>${p.s.label ? ` (${esc(p.s.label)})` : ''}.</div>
        <div class="st-verdict ${c.okR ? 'ok' : 'no'}"><b>${c.okR ? 'Place right' : 'Place missed'}</b> ${c.okR ? `${esc(c.pickR.name)} is a classic home.` : `${esc(c.pickR.name)} is not one of its classic places.`}</div>
        ${tell ? `<aside class="marg"><span class="lk">Why not ${esc(TD.grapes[c.pickG]?.name || c.pickG)}</span>${inl(tell)}</aside>` : ''}
        ${p.s.markers || g.markers ? `<p class="st-a" style="margin-top:12px">${inl(p.s.markers || g.markers)}</p>` : ''}
        <p class="lk" style="margin-top:14px">Classic places</p><ul class="tg-regs">${arr(p.s.classic_regions).slice(0, 6).map(x => `<li><a href="#${esc(x.id)}">${esc(x.name || SM.nameOf(x.id))}</a>${x.markers ? `<span>${inl(x.markers)}</span>` : ''}</li>`).join('')}</ul>
        <div class="btn-row st-act"><button type="button" class="btn solid" data-nx="1">${this.round + 1 >= this.total ? 'See the score' : 'Next wine'}</button>${VM.map ? '<button type="button" class="btn ghost" data-see="1">See them on the map</button>' : ''}<button type="button" class="btn ghost" data-grid="1">Run it through the grid</button></div>`;
    },
    bindReveal(el) {
      el.querySelector('[data-grid]')?.addEventListener('click', () => { SM.tasting.setGrid(this.cur.n.grid); VM.go('study-tasting'); });
      el.querySelector('[data-see]')?.addEventListener('click', () => { const ids = this.cur.ids || []; if (ids.length) VM.frame(ids, { maxZoom: 7 }); });
      el.querySelector('[data-nx]')?.addEventListener('click', async () => {
        this.round++;
        if (this.round < this.total) return this.next(el);
        await SM.study?.saveSession({ deck: 'tasting', mode: 'blind', start: this.start, end: Date.now(), correct: this.score, total: this.total });
        const sk = SM.study?.streak() || { n: 0 };
        el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">Blind practice</span></p><div class="head"><p class="eyebrow">Blind practice</p><h2 class="title">${this.score} of ${this.total} grapes</h2><p class="tagline">${this.score >= 4 ? 'A good palate on paper. Try it with a real glass.' : this.score >= 2 ? 'The look-alikes are the hard part: read their tells.' : 'Start from structure: acidity and tannin narrow it fastest.'}</p></div>
          ${VM.h.ledger([{ k: 'Streak', v: `${sk.n} ${sk.n === 1 ? 'day' : 'days'}` }])}
          <div class="btn-row st-act"><button type="button" class="btn solid" data-again="1">Five more</button><a class="btn ghost" href="#study">All decks</a></div>`;
        el.querySelector('[data-again]').addEventListener('click', () => this.start(el));
      });
      SM.study?.markDay();
    }
  };
})();
