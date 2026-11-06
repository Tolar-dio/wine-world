// ===== Tasting Lab =====
// ---------- TASTING LAB ----------
let LAB = { tab: "blind", flight: null, grid: null, drill: null, ref: "all" };
function viewLab() {
  const tabs = [["blind", "Virtual blind"], ["grid", "Grid a real wine"], ["drill", "Profile drill"], ["ref", "Classic wines"], ["journal", "Journal"]];
  let body = "";
  if (LAB.tab === "blind") body = labBlind();
  else if (LAB.tab === "grid") body = labGrid();
  else if (LAB.tab === "drill") body = labDrill();
  else if (LAB.tab === "ref") body = labRef();
  else body = labJournal();
  return `<div class="wrap"><div class="eyebrow">Tasting Lab</div><h1>Sight, nose, palate, <em>conclusion.</em></h1>
  <p class="lede">Software can't taste for you. It can make you collect evidence in order, score your calls against textbook profiles, and show you which grapes keep fooling you.</p>
  <div class="tabs">${tabs.map(([k, n]) => `<button class="${LAB.tab === k ? "on" : ""}" data-act="labtab" data-arg="${k}">${n}</button>`).join("")}</div>${body}</div>`;
}
// --- virtual blind
function blindSet(n, mix, pool) {
  if (pool === "sfs") return shuffle(WINES.filter(w => w.style)).slice(0, n);
  const pl = WINES.filter(w => pool === "all" || w.lvl === "cert");
  let ws = [], wr = [];
  const [nw, nr] = mix === "mixed" ? (Math.random() < .5 ? [1, 0] : [0, 1]) : mix === "2w2r" ? [2, 2] : mix === "3w3r" ? [3, 3] : mix === "6w6r" ? [6, 6] : [Math.ceil(n / 2), Math.floor(n / 2)];
  ws = shuffle(pl.filter(w => w.c === "w")).slice(0, nw); wr = shuffle(pl.filter(w => w.c === "r")).slice(0, nr);
  return [...ws, ...wr];
}
function variant(w, noise) {
  const v = Object.assign({}, w);
  if (noise) ["acid", "alc", "body"].forEach(k => { if (Math.random() < .3) v[k] = Math.max(1, Math.min(5, v[k] + (Math.random() < .5 ? -1 : 1))); });
  v.fr = shuffle(w.fruit).slice(0, 3); v.nf = shuffle(w.nonfruit).slice(0, Math.min(3, w.nonfruit.length));
  return v;
}
function describe(v) {
  const aromatic = ["gewz", "nzsb", "torr", "cond", "rkab"].includes(v.id);
  const ageStage = { "1-3": "youthful", "3-5": "youthful to developing", "5-10": "developing", "10+": "vinous, showing age" }[v.age];
  const nint = aromatic ? "powerful" : v.age === "5-10" || v.age === "10+" ? "medium-plus" : pick(["medium", "medium-plus"]);
  const red = v.c === "r";
  const rim = red ? (v.age === "5-10" || v.age === "10+" ? ", noticeable rim variation" : ", little rim variation") + (v.tannin >= 4 && v.inten !== "Pale" ? ", moderate to heavy staining" : ", light staining") : "";
  const gas = !red && v.climate === "Cool" && v.oak === "none" && Math.random() < .5 ? ", a few bubbles of gas" : ", no gas";
  const earthW = red ? pick(["forest floor", "potting soil", "dried leaves", "mushroom", "dusty earth"]) : pick(["a faint mushroom note", "dried hay and earth", "a dusty, earthy undertone"]);
  const oak = v.oak.startsWith("none") ? "No new oak" + (v.oak.includes("old") ? "; possibly older wood" : "") : v.oak.includes("old") || v.oak.includes("large") ? "No new oak; old or large neutral wood" : "New oak: " + v.oak + (v.oak.includes("American") ? " (dill, coconut, vanilla)" : " (toast, vanilla, baking spice)");
  const sfsGas = v.sightx ? ", " + v.sightx : null;
  const tears = v.alc >= 4 ? "medium-plus to heavy tearing" : v.alc <= 2 ? "light tearing" : "medium tearing";
  return { sight: `Clear, ${v.inten.toLowerCase()} intensity, ${v.hue.toLowerCase()} with ${v.sec} hues${rim}, ${tears}${sfsGas || gas}.`,
    nose: `Clean, ${nint} intensity, ${ageStage}. Fruit: ${v.fr.join(", ")} (${v.cond}). Non-fruit: ${v.nf.join(", ")}. Earth: ${v.earth ? earthW : "none"}. Mineral: ${v.mineral === "none" ? "none" : v.mineral}. ${oak}.`,
    palate: `${SWEET7[v.sweet]}. Acid ${SCALE5[v.acid - 1].toLowerCase()}, alcohol ${SCALE5[v.alc - 1].toLowerCase()}, body ${BODY5[v.body - 1].toLowerCase()}${red ? `, tannin ${SCALE5[v.tannin - 1].toLowerCase()} and ${v.ttex}` : `, phenolic bitterness: ${v.bitter ? "yes" : "no"}`}, ${v.texture || (red ? "" : "")} texture. Fruit confirms the nose. ${v.age === "1-3" ? "Medium-plus" : "Long"} finish, ${v.lvl === "adv" || v.age !== "1-3" ? "medium-plus to high" : "medium"} complexity.${v.palx ? " " + v.palx : ""}`.replace(", , texture", "").replace(",  texture", "").replace(", undefined texture", "") };
}
function grapeOptions(w) {
  const same = [...new Set(WINES.filter(x => w.style ? !!x.style : x.c === w.c).map(x => x.grape))];
  const partners = PAIRS.filter(p => p[1] === w.id || p[2] === w.id).map(p => WBY[p[1] === w.id ? p[2] : p[1]].grape).filter(g => g !== w.grape && same.includes(g));
  const rest = shuffle(same.filter(g => g !== w.grape && !partners.includes(g)));
  return shuffle([w.grape, ...[...new Set(partners)].slice(0, 3), ...rest].slice(0, 6));
}
const COUNTRIES = [...new Set(WINES.map(w => w.country))].sort();
function newFlight(opts) {
  const set = blindSet(opts.n, opts.mix, opts.pool);
  return { opts, wines: set.map(w => { const v = variant(w, opts.noise); return { w, v, d: describe(v), gopts: grapeOptions(w), ropts: opts.region ? shuffle([w.region, ...shuffle(WINES.filter(x => (w.style ? !!x.style : x.c === w.c) && x.region !== w.region).map(x => x.region)).slice(0, 5)]) : null, ans: {}, scored: null }; }), idx: 0, endAt: opts.mins ? Date.now() + opts.mins * 6e4 : null };
}
function labBlind() {
  if (!LAB.flight) {
    const tough = Object.entries(S.vb).filter(([g, r]) => r.seen >= 2).map(([g, r]) => [g, r.ok / r.seen, r.seen]).sort((a, b) => a[1] - b[1]).slice(0, 5);
    return `<div class="grid g2"><div class="card"><h3>Start a flight</h3><p class="small muted">Each wine arrives as a sommelier's tasting note in grid order. Deduce grape, country, climate, Old or New World, and age. Realistic mode nudges structure the way real bottles vary.</p>
    <div class="grid" style="gap:8px">
      <button class="btn" data-act="flight" data-arg="1:mixed:cert:0">One wine, untimed (Certified list)</button>
      <button class="btn" data-act="flight" data-arg="4:2w2r:cert:45">Certified flight: 4 wines, 45 min</button>
      <button class="btn" data-act="flight" data-arg="6:3w3r:all:25:region">Verbal six: 6 wines, 25 min, region scored</button>
      <button class="btn" data-act="flight" data-arg="6:3w3r:all:0:region:noise">Realistic six, untimed (wider pool, bottle variation)</button>
      <button class="btn" data-act="flight" data-arg="4:sfs:sfs:0:region">Sparkling, sweet & fortified: 4 wines, region scored</button>
    </div></div>
    <div class="card"><h3>Your toughest grapes</h3>${tough.length ? tough.map(([g, r, n]) => `<div style="margin:8px 0"><div class="row small" style="justify-content:space-between"><b>${esc(g)}</b><span class="muted">${Math.round(r * 100)}% correct · ${n} seen</span></div><div class="bar v"><i style="width:${Math.round(r * 100)}%"></i></div></div>`).join("") : `<p class="small muted">Taste a few flights and the grapes you misidentify most will show up here.</p>`}</div></div>`;
  }
  return renderFlight(LAB.flight, false);
}
function renderFlight(F, examMode) {
  const it = F.wines[F.idx], v = it.v, a = it.ans, done = it.scored;
  const sel = (key, opts) => `<div class="seg">${opts.map(o => `<button class="${a[key] === o ? "on" : ""}" data-act="fans" data-arg="${key}|${esc(o)}" ${done ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`;
  const allScored = F.wines.every(x => x.scored);
  return `<div class="examtop"><div class="row">${F.wines.map((x, i) => `<button class="btn sm ${i === F.idx ? "pri" : ""}" data-act="fgo" data-arg="${i}">${x.w.c === "w" ? "White" : "Red"} ${i + 1}${x.scored ? " ✓" : ""}</button>`).join("")}</div>${(examMode ? EX && EX.endAt : F.endAt) ? `<div class="timer" id="timer">--:--</div>` : ""}</div>
  <div class="grid g2" style="align-items:start">
  <div class="wine-desc"><div class="row" style="margin-bottom:12px">${glass(v.c)}<div><div class="eyebrow" style="margin:0">Wine ${F.idx + 1} of ${F.wines.length}</div><b style="font-family:var(--f-display);font-size:22px">${v.c === "w" ? "White" : "Red"} wine</b></div></div>
  <dl><dt>Sight</dt><dd>${esc(it.d.sight)}</dd><dt>Nose</dt><dd>${esc(it.d.nose)}</dd><dt>Palate</dt><dd>${esc(it.d.palate)}</dd></dl></div>
  <div class="card"><h3>Conclusions</h3>
  <div class="gl"><label>Grape</label>${sel("grape", it.gopts)}</div>
  <div class="gl"><label>Country</label><select data-in="country" ${done ? "disabled" : ""}><option value="">Choose…</option>${COUNTRIES.map(c => `<option ${a.country === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
  ${it.ropts ? `<div class="gl"><label>Region</label><select data-in="region" ${done ? "disabled" : ""}><option value="">Choose…</option>${it.ropts.map(c => `<option ${a.region === c ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></div>` : ""}
  <div class="gl"><label>Climate</label>${sel("climate", ["Cool", "Moderate", "Warm"])}</div>
  <div class="gl"><label>World</label>${sel("world", ["Old", "New"])}</div>
  <div class="gl"><label>Age range</label>${sel("age", ["1-3", "3-5", "5-10", "10+"])}</div>
  <div class="row" style="margin-top:14px">${done ? "" : `<button class="btn pri" data-act="fscore">${examMode ? "Lock in this wine" : "Reveal"}</button>`}${F.idx < F.wines.length - 1 ? `<button class="btn" data-act="fgo" data-arg="${F.idx + 1}">Next wine →</button>` : ""}${!examMode && allScored ? `<button class="btn" data-act="fend">Finish flight</button>` : ""}${examMode && !allScored ? `<button class="btn ghost" data-act="exfinish">Submit paper</button>` : ""}${examMode && allScored ? `<button class="btn pri" data-act="exfinish">Submit paper</button>` : ""}</div>
  ${done && !examMode ? flightFeedback(it) : ""}
  </div></div>`;
}
function scoreWine(it) {
  const w = it.w, a = it.ans; const parts = [["Grape", a.grape, w.grape, 3], ["Country", a.country, w.country, 2], ["Climate", a.climate, w.climate, 1], ["World", a.world, w.world, 1], ["Age", a.age, w.age, 1]];
  if (it.ropts) parts.push(["Region", a.region, w.region, 2]);
  const got = parts.reduce((s, p) => s + (p[1] === p[2] ? p[3] : 0), 0), max = parts.reduce((s, p) => s + p[3], 0);
  it.scored = { parts, pct: Math.round(100 * got / max) };
  const r = S.vb[w.grape] || { seen: 0, ok: 0 }; r.seen++; if (a.grape === w.grape) r.ok++; S.vb[w.grape] = r; touchDay(); save();
}
function flightFeedback(it) {
  const w = it.w, s = it.scored;
  return `<div style="margin-top:16px;border-top:1px solid var(--line);padding-top:14px"><div class="row" style="justify-content:space-between"><b style="font-family:var(--f-display);font-size:22px">${esc(w.grape)}, ${esc(w.region)}</b><span class="pill ${s.pct >= 60 ? "good" : "bad"}">${s.pct}%</span></div>
  <div class="tw"><table class="t">${s.parts.map(p => `<tr><td>${p[0]}</td><td>${esc(p[1] || "—")}</td><td>${p[1] === p[2] ? '<span style="color:var(--good)">✓</span>' : esc(p[2])}</td></tr>`).join("")}</table></div>
  <p class="small"><b>Markers:</b> ${esc(w.markers)}</p><p class="small muted"><b>Deduction:</b> ${esc(w.cond)} fruit with ${SCALE5[w.alc - 1].toLowerCase()} alcohol points to a ${w.climate.toLowerCase()} climate; ${w.earth || w.mineral !== "none" ? "earth and mineral alongside the fruit lean Old World" : "fruit-forward with little earth leans New World"}${w.oak.includes("American") ? "; dill and coconut flag American oak" : ""}.</p>
  <p class="small"><b>Sell it in one line:</b> "${esc(w.pitch)}"</p></div>`;
}
// --- real wine grid
const CMSF = {
  w: { hue: ["Water white", "Straw", "Yellow", "Gold"], fruit: ["Tart citrus", "Sweet citrus", "Apple/pear", "Stone fruit", "Tropical", "Melon"] },
  r: { hue: ["Purple", "Ruby", "Garnet"], fruit: ["Red", "Blue", "Black"] }
};
function labGrid() {
  const G = LAB.grid || (LAB.grid = { mode: S.track === "analyst" ? "sat" : "cms", c: "r", f: {}, reveal: "", result: null });
  const f = G.f; const seg = (k, opts, multi) => `<div class="seg">${opts.map(o => { const on = multi ? (f[k] || []).includes(o) : f[k] === o; return `<button class="${on ? "on" : ""}" data-act="gset" data-arg="${k}|${esc(o)}|${multi ? 1 : 0}">${esc(o)}</button>`; }).join("")}</div>`;
  const line = (lab, html) => `<div class="gl"><label>${lab}</label><div>${html}</div></div>`;
  let form;
  if (G.mode === "cms") form = `<div class="gsec">Sight</div>
    ${line("Clarity", seg("clarity", ["Clear", "Hazy", "Cloudy"]))}${line("Intensity", seg("inten", ["Pale", "Medium", "Deep"]))}${line("Color", seg("hue", CMSF[G.c].hue))}
    ${G.c === "r" ? line("Rim variation", seg("rim", ["Yes", "No"])) : line("Gas", seg("gas", ["Yes", "No"]))}
    <div class="gsec">Nose</div>
    ${line("Intensity", seg("nint", ["Delicate", "Medium-", "Medium", "Medium+", "Powerful"]))}${line("Age", seg("nage", ["Youthful", "Developing", "Vinous"]))}
    ${line("Fruit", seg("fruit", CMSF[G.c].fruit, 1))}${line("Fruit condition", seg("cond", ["Tart", "Ripe", "Fresh", "Baked", "Stewed", "Dried", "Jammy", "Candied"], 1))}
    ${line("Non-fruit", seg("nf", ["Flowers", "Green/pyrazine", "Herbs", "Pepper/spice", "Petrol", "Honey", "Yeast/bread", "Butter/cream", "Stems", "Tobacco"], 1))}
    ${line("Earth", seg("earth", ["Yes", "No"]))}${line("Mineral", seg("mineral", ["Yes", "No"]))}${line("New oak", seg("oak", ["Yes", "No"]))}${f.oak === "Yes" ? line("Oak type", seg("oakt", ["French", "American", "Eastern European"])) : ""}
    <div class="gsec">Palate</div>
    ${line("Sweetness", seg("sweet", SWEET7))}${line("Acid", seg("acid", SCALE5))}${line("Alcohol", seg("alc", SCALE5))}${line("Body", seg("body", BODY5))}
    ${G.c === "r" ? line("Tannin", seg("tannin", SCALE5)) + line("Tannin texture", seg("ttex", ["Silky", "Soft", "Fine", "Gritty", "Coarse", "Firm"])) : line("Phenolic bitterness", seg("bitter", ["Yes", "No"]))}
    ${line("Finish", seg("finish", ["Short", "Medium-", "Medium", "Medium+", "Long"]))}${line("Complexity", seg("cx", ["Simple", "Medium", "High"]))}
    <div class="gsec">Initial conclusion</div>
    ${line("Climate", seg("climate", ["Cool", "Moderate", "Warm"]))}${line("World", seg("world", ["Old", "New"]))}${line("Age range", seg("age", ["1-3", "3-5", "5-10", "10+"]))}
    <div class="gsec">Final conclusion</div>
    ${line("Grape", `<input type="text" data-gin="grape" value="${esc(f.grape || "")}" placeholder="e.g., Nebbiolo">`)}${line("Country", `<input type="text" data-gin="country" value="${esc(f.country || "")}" placeholder="e.g., Italy">`)}
    ${line("Region / appellation", `<input type="text" data-gin="region" value="${esc(f.region || "")}" placeholder="e.g., Barolo DOCG">`)}${line("Vintage", `<input type="text" data-gin="vintage" value="${esc(f.vintage || "")}" placeholder="e.g., 2018">`)}`;
  else form = `<div class="gsec">Appearance</div>
    ${line("Clarity", seg("clarity", ["Clear", "Hazy"]))}${line("Intensity", seg("inten", ["Pale", "Medium", "Deep"]))}${line("Color", seg("hue", G.c === "w" ? ["Lemon-green", "Lemon", "Gold", "Amber", "Brown"] : ["Purple", "Ruby", "Garnet", "Tawny", "Brown"]))}
    <div class="gsec">Nose</div>
    ${line("Condition", seg("cnd", ["Clean", "Unclean"]))}${line("Intensity", seg("nint", SAT_INT))}
    ${line("Primary", `<input type="text" data-gin="prim" value="${esc(f.prim || "")}" placeholder="fruit, floral, herbaceous…">`)}${line("Secondary", `<input type="text" data-gin="sec" value="${esc(f.sec || "")}" placeholder="yeast, MLC, oak…">`)}${line("Tertiary", `<input type="text" data-gin="ter" value="${esc(f.ter || "")}" placeholder="bottle age, oxidation…">`)}
    ${line("Development", seg("dev", ["Youthful", "Developing", "Fully developed", "Tired/past its best"]))}
    <div class="gsec">Palate</div>
    ${line("Sweetness", seg("ssweet", SAT_SWEET))}${line("Acidity", seg("acid", ["Low", "Medium(-)", "Medium", "Medium(+)", "High"]))}${G.c === "r" ? line("Tannin", seg("tannin", ["Low", "Medium(-)", "Medium", "Medium(+)", "High"])) : ""}
    ${line("Alcohol", seg("salc", SAT_ALC))}${line("Body", seg("body", ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"]))}${line("Flavor intensity", seg("fint", SAT_INT))}${line("Finish", seg("finish", ["Short", "Medium(-)", "Medium", "Medium(+)", "Long"]))}
    <div class="gsec">Conclusions</div>
    ${line("BLIC check", seg("blic", ["Balanced", "Long", "Intense", "Complex"], 1))}
    ${line("Quality", seg("qual", ["Faulty", "Poor", "Acceptable", "Good", "Very good", "Outstanding"]))}${line("Readiness", seg("ready", ["Too young", "Can drink now, but has potential for ageing", "Drink now: not suitable for ageing", "Too old"]))}
    ${line("Your guess (optional)", `<input type="text" data-gin="grape" value="${esc(f.grape || "")}" placeholder="grape and region">`)}`;
  const blicN = (f.blic || []).length, suggested = ["Acceptable", "Good", "Good", "Very good", "Outstanding"][blicN];
  return `<div class="row" style="margin-bottom:12px"><div class="seg"><button class="${G.mode === "cms" ? "on" : ""}" data-act="gmode" data-arg="cms">CMS deductive grid</button><button class="${G.mode === "sat" ? "on" : ""}" data-act="gmode" data-arg="sat">WSET SAT</button></div><div class="seg"><button class="${G.c === "w" ? "on" : ""}" data-act="gcolor" data-arg="w">White</button><button class="${G.c === "r" ? "on" : ""}" data-act="gcolor" data-arg="r">Red</button></div><button class="btn sm ghost" data-act="greset">Clear form</button></div>
  <div class="grid split" style="grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;align-items:start">
  <div class="card gform">${form}${G.mode === "sat" ? `<p class="small muted">BLIC suggests: <b>${suggested}</b> (${blicN} of 4 factors). Justify it in your notes.</p>` : ""}</div>
  <div class="card" style="position:sticky;top:20px"><h3>Reveal and compare</h3><p class="small muted">When the bag comes off, pick the matching classic profile. The academy compares your structure and conclusions to the textbook benchmark and saves the grid to your journal.</p>
  <select data-in="greveal"><option value="">Which wine was it?</option>${WINES.filter(w => w.c === G.c).map(w => `<option value="${w.id}" ${G.reveal === w.id ? "selected" : ""}>${esc(w.grape)} · ${esc(w.region)}</option>`).join("")}<option value="other" ${G.reveal === "other" ? "selected" : ""}>Something else (log only)</option></select>
  <input type="text" data-gin="label" value="${esc(f.label || "")}" placeholder="Producer & vintage (e.g., 2019 Fontodi Chianti Classico)" style="margin-top:8px">
  <textarea data-gin="notes" placeholder="Notes: what fooled you, what you'd say to a guest" style="margin-top:8px">${esc(f.notes || "")}</textarea>
  <button class="btn pri" data-act="gcompare" style="margin-top:10px">Compare & save</button>
  ${G.result ? gridResult(G.result) : ""}</div></div>`;
}
function satSweet(i) { return [0, 0, 1, 2, 3, 4, 5][i]; }
function satAlc(i) { return [0, 0, 1, 1, 2, 2][i]; }
function compareGrid(G) {
  const w = WBY[G.reveal], f = G.f, rows = [];
  if (!w) return null;
  const idx = (arr, v) => arr.indexOf(v);
  const near = (a, b) => a < 0 ? null : Math.abs(a - b) <= 1;
  if (G.mode === "cms") {
    rows.push(["Intensity", f.inten, w.inten, f.inten ? f.inten === w.inten : null]);
    rows.push(["Sweetness", f.sweet, SWEET7[w.sweet], near(idx(SWEET7, f.sweet), w.sweet)]);
    rows.push(["Acid", f.acid, SCALE5[w.acid - 1], near(idx(SCALE5, f.acid), w.acid - 1)]);
    rows.push(["Alcohol", f.alc, SCALE5[w.alc - 1], near(idx(SCALE5, f.alc), w.alc - 1)]);
    rows.push(["Body", f.body, BODY5[w.body - 1], near(idx(BODY5, f.body), w.body - 1)]);
    if (w.c === "r") rows.push(["Tannin", f.tannin, SCALE5[w.tannin - 1], near(idx(SCALE5, f.tannin), w.tannin - 1)]);
    else rows.push(["Bitterness", f.bitter, w.bitter ? "Yes" : "No", f.bitter ? (f.bitter === "Yes") === w.bitter : null]);
    const newOak = !w.oak.startsWith("none") && !w.oak.includes("old") && !w.oak.includes("large");
    rows.push(["New oak", f.oak, newOak ? "Yes" : "No", f.oak ? (f.oak === "Yes") === newOak : null]);
    rows.push(["Earth", f.earth, w.earth ? "Yes" : "No", f.earth ? (f.earth === "Yes") === w.earth : null]);
    rows.push(["Climate", f.climate, w.climate, f.climate ? f.climate === w.climate : null]);
    rows.push(["World", f.world, w.world, f.world ? f.world === w.world : null]);
    rows.push(["Age", f.age, w.age, f.age ? f.age === w.age : null]);
    rows.push(["Grape", f.grape, w.grape, f.grape ? w.grape.toLowerCase().includes(f.grape.trim().toLowerCase()) && f.grape.trim().length > 2 : null]);
    rows.push(["Country", f.country, w.country, f.country ? w.country.toLowerCase() === f.country.trim().toLowerCase() : null]);
  } else {
    const S5 = ["Low", "Medium(-)", "Medium", "Medium(+)", "High"], B5 = ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"];
    rows.push(["Intensity", f.inten, w.inten, f.inten ? f.inten === w.inten : null]);
    rows.push(["Sweetness", f.ssweet, SAT_SWEET[satSweet(w.sweet)], near(idx(SAT_SWEET, f.ssweet), satSweet(w.sweet))]);
    rows.push(["Acidity", f.acid, S5[w.acid - 1], near(idx(S5, f.acid), w.acid - 1)]);
    if (w.c === "r") rows.push(["Tannin", f.tannin, S5[w.tannin - 1], near(idx(S5, f.tannin), w.tannin - 1)]);
    rows.push(["Alcohol", f.salc, SAT_ALC[satAlc(w.alc)], f.salc ? f.salc === SAT_ALC[satAlc(w.alc)] : null]);
    rows.push(["Body", f.body, B5[w.body - 1], near(idx(B5, f.body), w.body - 1)]);
  }
  const answered = rows.filter(r => r[3] !== null), ok = answered.filter(r => r[3]).length;
  return { rows, pct: answered.length ? Math.round(100 * ok / answered.length) : 0, wine: w.id };
}
function gridResult(r) {
  const w = WBY[r.wine];
  return `<div style="margin-top:14px"><div class="row" style="justify-content:space-between"><b>${esc(w.grape)} · ${esc(w.region)}</b><span class="pill ${r.pct >= 60 ? "good" : "bad"}">${r.pct}% match</span></div>
  <div class="tw"><table class="t"><tr><th>Line</th><th>You</th><th>Benchmark</th></tr>${r.rows.map(x => `<tr><td>${x[0]}</td><td>${esc(x[1] || "—")}</td><td style="color:${x[3] === null ? "var(--muted)" : x[3] ? "var(--good)" : "var(--bad)"}">${esc(x[2])}</td></tr>`).join("")}</table></div>
  <p class="small muted">Structure within one step of the benchmark counts as a match. Real bottles vary; the benchmark is the textbook classic.</p></div>`;
}
// --- profile drill (WSET calibration)
function newDrill(n, pool) {
  const ws = n === 2 ? [pick(WINES.filter(w => w.c === "w")), pick(WINES.filter(w => w.c === "r"))] : [pick(WINES.filter(w => pool === "all" || w.lvl === "cert"))];
  return { items: ws.map(w => { const right = shuffle([...w.fruit.slice(0, 2), ...w.nonfruit.slice(0, 2)]); const others = shuffle(WINES.filter(x => x.c === w.c && x.grape !== w.grape).flatMap(x => [...x.fruit, ...x.nonfruit])).filter(x => !w.fruit.includes(x) && !w.nonfruit.includes(x)); return { w, chips: shuffle([...right, ...[...new Set(others)].slice(0, 4)]), right, a: { aromas: [] }, scored: null }; }), idx: 0 };
}
function labDrill() {
  if (!LAB.drill) return `<div class="card read"><h3>Profile drill</h3><p class="small muted">The WSET skill in reverse: you're told the wine, and you predict its SAT structure and aromas. It calibrates your scales against the classics, so when you taste real wine you know what "high acid" or "medium(+) tannin" should feel like for that style.</p><div class="row"><button class="btn pri" data-act="drill" data-arg="1">One wine</button><button class="btn" data-act="drill" data-arg="2">Exam pair: one white, one red</button></div></div>`;
  return renderDrill(LAB.drill, false);
}
function renderDrill(D, examMode) {
  const it = D.items[D.idx], w = it.w, a = it.a, done = it.scored;
  const S5 = ["Low", "Medium(-)", "Medium", "Medium(+)", "High"], B5 = ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"];
  const seg = (k, opts) => `<div class="seg">${opts.map(o => `<button class="${a[k] === o ? "on" : ""}" data-act="dans" data-arg="${k}|${esc(o)}" ${done ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`;
  const line = (l, h) => `<div class="gl"><label>${l}</label><div>${h}</div></div>`;
  return `${D.items.length > 1 ? `<div class="examtop"><div class="row">${D.items.map((x, i) => `<button class="btn sm ${i === D.idx ? "pri" : ""}" data-act="dgo" data-arg="${i}">Wine ${i + 1}${x.scored ? " ✓" : ""}</button>`).join("")}</div>${examMode && EX && EX.endAt ? `<div class="timer" id="timer">--:--</div>` : ""}</div>` : ""}
  <div class="card read"><div class="row">${glass(w.c)}<div><div class="eyebrow" style="margin:0">Predict the SAT note</div><b style="font-family:var(--f-display);font-size:22px">${esc(w.grape)} · ${esc(w.region)}, ${esc(w.country)}</b><div class="small muted">Typical bottle age ${w.age} years</div></div></div>
  ${line("Sweetness", seg("sweet", SAT_SWEET))}${line("Acidity", seg("acid", S5))}${w.c === "r" ? line("Tannin", seg("tannin", S5)) : ""}${line("Alcohol", seg("alc", SAT_ALC))}${line("Body", seg("body", B5))}
  ${line("Pick 4 typical aromas", `<div class="row" style="gap:6px">${it.chips.map(c => `<button class="chip ${a.aromas.includes(c) ? "on" : ""} ${done && it.right.includes(c) ? "right" : ""}" data-act="dchip" data-arg="${esc(c)}" ${done ? "disabled" : ""}>${esc(c)}</button>`).join("")}</div>`)}
  <div class="row" style="margin-top:12px">${done ? "" : `<button class="btn pri" data-act="dscore">${examMode ? "Lock in" : "Check"}</button>`}${D.idx < D.items.length - 1 ? `<button class="btn" data-act="dgo" data-arg="${D.idx + 1}">Next wine →</button>` : ""}${!examMode && done ? `<button class="btn" data-act="drill" data-arg="${D.items.length}">New drill</button>` : ""}${examMode ? `<button class="btn ${D.items.every(x => x.scored) ? "pri" : "ghost"}" data-act="exfinish">Submit</button>` : ""}</div>
  ${done && !examMode ? `<div style="margin-top:14px;border-top:1px solid var(--line);padding-top:12px"><span class="pill ${done.pct >= 55 ? "good" : "bad"}">${done.pct}%</span><div class="tw"><table class="t">${done.rows.map(r => `<tr><td>${r[0]}</td><td>${esc(r[1] || "—")}</td><td style="color:${r[3] ? "var(--good)" : "var(--bad)"}">${esc(r[2])}</td></tr>`).join("")}</table></div><p class="small"><b>Why:</b> ${esc(w.markers)}</p></div>` : ""}
  </div>`;
}
function scoreDrill(it) {
  const w = it.w, a = it.a, S5 = ["Low", "Medium(-)", "Medium", "Medium(+)", "High"], B5 = ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"];
  const rows = [], sc = (name, arr, val, exp) => { const i = arr.indexOf(val); const pts = i < 0 ? 0 : i === exp ? 1 : Math.abs(i - exp) === 1 ? .5 : 0; rows.push([name, val, arr[exp], pts >= .5, pts]); };
  sc("Sweetness", SAT_SWEET, a.sweet, satSweet(w.sweet)); sc("Acidity", S5, a.acid, w.acid - 1); if (w.c === "r") sc("Tannin", S5, a.tannin, w.tannin - 1);
  sc("Alcohol", SAT_ALC, a.alc, satAlc(w.alc)); sc("Body", B5, a.body, w.body - 1);
  const ar = a.aromas.filter(x => it.right.includes(x)).length - a.aromas.filter(x => !it.right.includes(x)).length * .5;
  rows.push(["Aromas", a.aromas.join(", "), it.right.join(", "), ar >= 2, Math.max(0, ar) / 4 * 2]);
  const got = rows.reduce((s, r) => s + r[4], 0), max = rows.length - 1 + 2;
  it.scored = { rows, pct: Math.round(100 * got / max) }; touchDay(); save();
}
// --- reference & journal
function labRef() {
  const f = LAB.ref, list = WINES.filter(w => f === "all" || (f === "adv" ? w.lvl === "adv" : w.c === f && w.lvl === "cert"));
  return `<div class="row" style="margin-bottom:14px"><div class="seg">${[["all", "All"], ["w", "Certified whites"], ["r", "Certified reds"], ["adv", "Advanced pool"]].map(([k, n]) => `<button class="${f === k ? "on" : ""}" data-act="reff" data-arg="${k}">${n}</button>`).join("")}</div></div>
  <div class="grid g3">${list.map(w => `<div class="card"><div class="row">${glass(w.c)}<div style="min-width:0"><b style="font-family:var(--f-display);font-size:19px">${esc(w.grape)}</b><div class="small muted">${esc(w.region)}, ${esc(w.country)}</div></div></div>
  <p class="small" style="margin:10px 0">${esc(w.markers)}</p>
  <div class="small mono" style="display:grid;grid-template-columns:72px 1fr;gap:4px 8px;align-items:center"><span>Acid</span>${dots(w.acid)}<span>Alcohol</span>${dots(w.alc)}<span>Body</span>${dots(w.body)}${w.c === "r" ? `<span>Tannin</span>${dots(w.tannin)}` : `<span>Sweet</span>${dots(Math.min(5, w.sweet), 6)}`}</div>
  <p class="small muted" style="margin:10px 0 0">${w.climate} climate · ${w.world} World · oak: ${esc(w.oak)}</p></div>`).join("")}</div>
  <h2>Confusion pairs: a 20-week rotation</h2><p class="muted small">Taste one pair a week, side by side and blind. These are the comparisons the Court itself recommends drilling.</p>
  <div class="tw"><table class="t"><tr><th>Week</th><th>Pair</th><th>What separates them</th></tr>${PAIRS.map((p, i) => `<tr><td class="mono">${i + 1}</td><td>${esc(p[0])}</td><td class="small">${esc(WBY[p[1]].markers)} <i>vs</i> ${esc(WBY[p[2]].markers)}</td></tr>`).join("")}</table></div>`;
}
function labJournal() {
  const J = S.journal.slice().reverse();
  const miss = {}; S.journal.forEach(j => (j.rows || []).forEach(r => { if (r[3] === false) miss[r[0]] = (miss[r[0]] || 0) + 1; }));
  const top = Object.entries(miss).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return `<div class="grid g2"><div class="card"><div class="stat">${S.journal.length}<small>wines logged</small></div></div><div class="card"><h3>Most-missed grid lines</h3>${top.length ? top.map(([k, n]) => `<div class="row small" style="justify-content:space-between"><span>${esc(k)}</span><span class="pill bad">${n} misses</span></div>`).join("") : `<p class="small muted">Grid real wines and compare them to see where your calibration drifts.</p>`}</div></div>
  <h2>Entries</h2>${J.length ? `<div class="grid" style="gap:8px">${J.map(j => `<div class="card"><div class="row" style="justify-content:space-between"><b>${esc(j.label || (j.wine && WBY[j.wine] ? WBY[j.wine].grape + " · " + WBY[j.wine].region : "Untitled wine"))}</b><span class="small muted mono">${esc(j.date)} · ${j.mode.toUpperCase()}${j.pct != null ? " · " + j.pct + "%" : ""}</span></div>${j.notes ? `<p class="small" style="margin:6px 0 0">${esc(j.notes)}</p>` : ""}</div>`).join("")}</div>` : `<p class="muted">No entries yet. Use "Grid a real wine" every time you taste.</p>`}`;
}

