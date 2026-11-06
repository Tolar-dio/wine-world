// ===== Service Floor & Flashcards =====
// ---------- SERVICE FLOOR ----------
let FL = { tab: "seq", seq: null, temp: null, math: null, list: null };
function viewFloor() {
  const tabs = [["seq", "Service sequences"], ["temp", "Temperatures"], ["math", "Business math"], ["list", "Wine list correction"]];
  let b = FL.tab === "seq" ? floorSeq() : FL.tab === "temp" ? floorTemp() : FL.tab === "math" ? floorMath() : floorList();
  return `<div class="wrap"><div class="eyebrow">Service Floor</div><h1>Work the <em>room.</em></h1><p class="lede">The Court examines service from Certified up. These drills rehearse the standards, the numbers and the wine-list checks; practice the physical moves with a real bottle and a serviette.</p>
  <div class="tabs">${tabs.map(([k, n]) => `<button class="${FL.tab === k ? "on" : ""}" data-act="fltab" data-arg="${k}">${n}</button>`).join("")}</div>${b}</div>`;
}
function newSeq(k) { const s = SEQUENCES[k]; return { k, order: [], pool: shuffle(s.steps.map((t, i) => i)), done: false }; }
function seqScore(Q) { const o = Q.order; let ok = 0; for (let i = 0; i < o.length - 1; i++) if (o[i] < o[i + 1]) ok++; return Math.round(100 * ok / Math.max(1, o.length - 1)); }
function renderSeq(Q, examMode) {
  const s = SEQUENCES[Q.k];
  return `<div class="card read"><h3>${s.name}</h3><p class="small muted">Tap the steps in the order you'd perform them for the examiner.</p>
  <div class="grid g2" style="align-items:start"><div><div class="eyebrow">Steps</div><div class="seqlist">${Q.pool.map(i => `<button class="${Q.order.includes(i) ? "done" : ""}" data-act="seqtap" data-arg="${i}" ${Q.order.includes(i) || Q.done ? "disabled" : ""}><span class="n"></span>${esc(s.steps[i])}</button>`).join("")}</div></div>
  <div><div class="eyebrow">Your order</div><div class="seqlist">${Q.order.map((i, n) => `<button data-act="sequndo" data-arg="${n}" ${Q.done ? "disabled" : ""} style="${Q.done ? (i === n ? "border-color:var(--good)" : "border-color:var(--bad)") : ""}"><span class="n">${n + 1}</span>${esc(s.steps[i])}</button>`).join("") || '<p class="small muted">Nothing yet.</p>'}</div></div></div>
  ${Q.done ? `<p><span class="pill ${seqScore(Q) >= 80 ? "good" : "bad"}">${seqScore(Q)}% in sequence</span></p><ol class="small">${s.steps.map(t => `<li>${esc(t)}</li>`).join("")}</ol>` : ""}
  ${!examMode ? `<div class="row">${!Q.done && Q.order.length === s.steps.length ? `<button class="btn pri" data-act="seqcheck">Check</button>` : ""}<button class="btn ghost" data-act="seqnew" data-arg="${Q.k}">Restart</button></div>` : ""}</div>`;
}
function floorSeq() {
  return `<div class="row" style="margin-bottom:14px">${Object.entries(SEQUENCES).map(([k, s]) => `<button class="btn ${FL.seq && FL.seq.k === k ? "pri" : ""}" data-act="seqnew" data-arg="${k}">${s.name}</button>`).join("")}</div>${FL.seq ? renderSeq(FL.seq, false) : `<p class="muted">Choose a sequence to drill.</p>`}`;
}
function newTemps(n) { return shuffle(TEMPS).slice(0, n).map(([s, i]) => ({ s, i, opts: shuffle([i, ...shuffle(TEMP_BANDS.map((_, k) => k).filter(k => k !== i && TEMP_BANDS[k] !== TEMP_BANDS[i])).slice(0, 3)]), pick: null })); }
function renderTemps(T, examMode, checked) {
  return `<div class="grid" style="gap:10px">${T.map((t, qi) => `<div class="q card" style="margin:0"><div class="qt">${esc(t.s)}</div><div class="row" style="gap:6px">${t.opts.map(o => { let c = "chip"; if (checked) { if (o === t.i) c += " right"; } if (t.pick === o) c += " on"; return `<button class="${c}" data-act="tpick" data-arg="${qi}:${o}" ${checked ? "disabled" : ""}>${TEMP_BANDS[o]}</button>`; }).join("")}</div></div>`).join("")}</div>`;
}
function floorTemp() {
  if (!FL.temp) FL.temp = { items: newTemps(8), checked: false };
  const T = FL.temp, sc = T.checked ? Math.round(100 * T.items.filter(x => x.pick === x.i).length / T.items.length) : null;
  return `<p class="small muted">Serving temperatures from the CMS exam chart.</p>${renderTemps(T.items, false, T.checked)}<div class="row" style="margin-top:14px">${T.checked ? `<span class="pill ${sc >= 70 ? "good" : "bad"}">${sc}%</span><button class="btn" data-act="tnew">New set</button>` : `<button class="btn pri" data-act="tcheck">Check</button>`}</div>`;
}
function money(x) { return "$" + x.toFixed(2); }
function genMath() {
  const t = pick(["glass", "bottle", "cogs", "pct", "pours", "keg"]);
  if (t === "glass") { const c = pick([18, 24, 30, 36, 42, 48]), p = pick([4, 5]), pc = pick([20, 25, 30, 33]); return { q: `A bottle costs ${money(c)}. You pour ${p} glasses per bottle and target a ${pc}% pour cost. What is the price per glass?`, a: c / p / (pc / 100), unit: "$", x: `Cost per pour = ${money(c)} ÷ ${p} = ${money(c / p)}. Price = ${money(c / p)} ÷ ${pc / 100} = ${money(c / p / (pc / 100))}.` }; }
  if (t === "bottle") { const c = pick([12, 15, 20, 28, 35, 60]), pc = pick([25, 30, 33, 40]); return { q: `A wine costs ${money(c)} wholesale. Your target bottle cost is ${pc}%. What's the list price?`, a: c / (pc / 100), unit: "$", x: `${money(c)} ÷ ${pc / 100} = ${money(c / (pc / 100))}.` }; }
  if (t === "cogs") { const b = pick([18000, 22500, 30000]), pu = pick([6000, 8400, 12000]), e = pick([17000, 21000, 26000]); return { q: `Beginning inventory ${money(b)}, purchases ${money(pu)}, ending inventory ${money(e)}. What is COGS?`, a: b + pu - e, unit: "$", x: `COGS = ${money(b)} + ${money(pu)} − ${money(e)} = ${money(b + pu - e)}.` }; }
  if (t === "pct") { const cg = pick([7200, 9000, 12600]), s = pick([24000, 30000, 36000]); return { q: `This month's wine COGS was ${money(cg)} on wine sales of ${money(s)}. What is the cost percentage? (answer as a percent)`, a: 100 * cg / s, unit: "%", x: `${money(cg)} ÷ ${money(s)} = ${(100 * cg / s).toFixed(1)}%.` }; }
  if (t === "pours") { const p = pick([5, 6]), size = pick([["750 ml", 25.4], ["1.5 L magnum", 50.7]]); return { q: `How many full ${p} oz pours are in a ${size[0]} bottle? (${size[1]} oz)`, a: Math.floor(size[1] / p), unit: "", x: `${size[1]} ÷ ${p} = ${(size[1] / p).toFixed(2)}, so ${Math.floor(size[1] / p)} full pours.` }; }
  const n = pick([300, 500, 800]), r = pick([20, 30, 40]), b = pick([1, 1.5, 2]); const need = Math.ceil(n * r / 100 * b / 165);
  return { q: `You expect ${n} covers. ${r}% of guests order beer, averaging ${b} beers each (12 oz). A half-barrel keg yields about 165 twelve-ounce pours. How many kegs do you need?`, a: need, unit: "", x: `${n} × ${r / 100} × ${b} = ${n * r / 100 * b} beers ÷ 165 = ${(n * r / 100 * b / 165).toFixed(2)}, round up to ${need}.` };
}
function mathOK(m, v) { const x = parseFloat(String(v).replace(/[^0-9.\-]/g, "")); if (isNaN(x)) return false; return Math.abs(x - m.a) <= Math.max(.5, Math.abs(m.a) * .02); }
function renderMath(M, examMode) {
  return `<div class="grid" style="gap:10px">${M.map((m, i) => `<div class="card"><div class="qt" style="font-weight:600">${esc(m.q)}</div><div class="row" style="margin-top:8px"><input type="text" data-min="${i}" value="${esc(m.v || "")}" placeholder="${m.unit === "$" ? "$0.00" : m.unit === "%" ? "e.g., 28.5" : "number"}" style="max-width:180px" ${m.checked ? "disabled" : ""}>${m.checked ? `<span class="pill ${m.ok ? "good" : "bad"}">${m.ok ? "Correct" : "Answer: " + (m.unit === "$" ? money(m.a) : m.unit === "%" ? m.a.toFixed(1) + "%" : m.a)}</span>` : ""}</div>${m.checked ? `<p class="small muted" style="margin:8px 0 0">${esc(m.x)}</p>` : ""}</div>`).join("")}</div>`;
}
function floorMath() {
  if (!FL.math) FL.math = Array.from({ length: 4 }, genMath);
  const all = FL.math.every(m => m.checked);
  return `<p class="small muted">Problems in the style of the CMS Certified business section. Answers within 2% (or 50 cents) count.</p>${renderMath(FL.math, false)}<div class="row" style="margin-top:14px">${all ? `<button class="btn" data-act="mnew">New problems</button>` : `<button class="btn pri" data-act="mcheck">Check all</button>`}</div>`;
}
function newList() { const L0 = pick(WINELISTS); return { L0, flags: [], checked: false }; }
function renderList(W, examMode) {
  return `<div class="card read"><h3>${esc(W.L0.title)}</h3><p class="small muted">Tap every line that contains an error (region, grape, appellation, classification or label term).</p>
  <div class="grid" style="gap:6px">${W.L0.lines.map((ln, i) => { const f = W.flags.includes(i); let st = ""; if (W.checked) st = ln[1] ? (f ? "border-color:var(--good)" : "border-color:var(--bad)") : (f ? "border-color:var(--bad)" : ""); return `<button class="opt ${f ? "sel" : ""}" style="${st}" data-act="lflag" data-arg="${i}" ${W.checked ? "disabled" : ""}><span class="mono" style="font-size:14px">${esc(ln[0])}</span>${W.checked && ln[1] ? `<div class="small" style="color:var(--muted);margin-top:4px">${esc(ln[1])}</div>` : ""}</button>`; }).join("")}</div>
  ${W.checked ? `<p><span class="pill ${listScore(W) >= 70 ? "good" : "bad"}">${listScore(W)}%</span></p>` : ""}
  ${!examMode ? `<div class="row">${W.checked ? `<button class="btn" data-act="lnew">Another list</button>` : `<button class="btn pri" data-act="lcheck">Check</button>`}</div>` : ""}</div>`;
}
function listScore(W) { const n = W.L0.lines.length; let ok = 0; W.L0.lines.forEach((ln, i) => { if (!!ln[1] === W.flags.includes(i)) ok++; }); return Math.round(100 * ok / n); }
function floorList() { if (!FL.list) FL.list = newList(); return renderList(FL.list, false); }

// ---------- FLASHCARDS ----------
const INTERVALS = [0, 1, 3, 7, 16, 35];
let FC = { q: [], i: 0, flip: false };
function deckIds() { const done = Object.keys(S.done); return TERMS.filter(t => done.includes(t.lesson)).map(t => t.id); }
function dueCards() { const now = Date.now(); return deckIds().filter(id => { const c = S.cards[id]; return !c || c.due <= now; }); }
function viewCards() {
  const deck = deckIds(), due = dueCards();
  if (!FC.q.length || FC.i >= FC.q.length) FC = { q: shuffle(due).slice(0, 20), i: 0, flip: false };
  const boxes = [1, 2, 3, 4, 5].map(b => deck.filter(id => (S.cards[id] || { b: 0 }).b === b).length);
  const cur = FC.q[FC.i] ? TERMS.find(t => t.id === FC.q[FC.i]) : null;
  return `<div class="wrap read"><div class="eyebrow">Flashcards</div><h1>Spaced <em>repetition.</em></h1><p class="lede">Key terms from every lesson you've completed. Cards you know move up a box and come back later; cards you miss go back to box 1.</p>
  <div class="row small muted" style="margin-bottom:14px">${deck.length} cards in deck · ${due.length} due ${boxes.map((n, i) => `<span class="pill">Box ${i + 1}: ${n}</span>`).join("")}</div>
  ${!deck.length ? `<div class="card"><p>Your deck fills as you complete lessons. Start with <a href="#lesson-o1">Welcome to Vitis Mundi Academy</a>.</p></div>` : !cur ? `<div class="card"><h3>All caught up.</h3><p class="muted">No cards due right now. Come back tomorrow, or complete another lesson to add cards.</p><button class="btn" data-act="fcall">Review everything anyway</button></div>` :
  `<div class="card flash" data-act="fcflip"><div><div class="eyebrow">${esc(LBY[cur.lesson].title)} · ${FC.i + 1} of ${FC.q.length}</div><div class="front">${esc(cur.t)}</div>${FC.flip ? `<p style="max-width:52ch;margin:14px auto 0">${esc(cur.d)}</p>` : `<p class="muted small" style="margin-top:14px">Say the definition aloud, then tap to flip.</p>`}</div></div>
  ${FC.flip ? `<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" data-act="fcans" data-arg="0">Missed it</button><button class="btn pri" data-act="fcans" data-arg="1">Knew it</button></div>` : ""}`}
  </div>`;
}

