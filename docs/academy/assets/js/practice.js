// ===== Drills: Label Lab & Matching; Exam Hall view =====
let DR = { tab: "labels", lab: null, match: null };
function newLabel() { const L0 = pick(LABELS); return { L0, items: L0.qs.map(q => ({ q, opts: shuffle([q[1], ...q[2]]), pick: null })), checked: false }; }
function newMatch(kind) {
  const set = []; const used = new Set();
  for (const m of shuffle(MATCH)) { const key = kind === "grape" ? m[1] : m[2]; if (used.has(key)) continue; used.add(key); set.push(m); if (set.length === 6) break; }
  return { kind, left: set.map(m => m[0]), right: shuffle(set.map(m => kind === "grape" ? m[1] : m[2])), key: Object.fromEntries(set.map(m => [m[0], kind === "grape" ? m[1] : m[2]])), pairs: {}, sel: null, checked: false };
}
function viewDrills() {
  const tabs = [["labels", "Label Lab"], ["match", "Matching"]];
  return `<div class="wrap"><div class="eyebrow">Drills</div><h1>Read the bottle. <em>Match the place.</em></h1>
  <p class="lede">Certified theory includes label, map and matching items. These drills rebuild them: decode labels written to real legal conventions (the producers are invented), and pair appellations with their grapes and countries.</p>
  <div class="tabs">${tabs.map(([k, n]) => `<button class="${DR.tab === k ? "on" : ""}" data-act="drtab" data-arg="${k}">${n}</button>`).join("")}</div>
  ${DR.tab === "labels" ? drillLabel() : drillMatch()}</div>`;
}
function drillLabel() {
  if (!DR.lab) DR.lab = newLabel();
  const D = DR.lab, L0 = D.L0, sc = D.checked ? Math.round(100 * D.items.filter(x => x.opts[x.pick] === x.q[1]).length / D.items.length) : null;
  return `<div class="grid split" style="grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:28px;align-items:start">
  <div><div class="label ${L0.style}"><div class="lt">${esc(L0.top)}</div><div class="ln">${esc(L0.name)}</div><div class="ls">${esc(L0.sub)}</div><div class="la">${esc(L0.ap)}</div><div class="ly">${esc(L0.yr)}</div><div class="lf">${esc(L0.foot)}</div></div>
  <p class="small muted" style="text-align:center;margin-top:14px">Labels decoded so far: ${S.drills.labels}</p></div>
  <div>${D.items.map((it, qi) => `<div class="q"><div class="qt">${qi + 1}. ${esc(it.q[0])}</div><div class="opts">${it.opts.map((o, oi) => { let c = "opt"; if (D.checked) { if (o === it.q[1]) c += " right"; else if (it.pick === oi) c += " wrong"; } else if (it.pick === oi) c += " sel"; return `<button class="${c}" data-act="lbpick" data-arg="${qi}:${oi}" ${D.checked ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>${D.checked ? `<div class="expl">${esc(it.q[3])}</div>` : ""}</div>`).join("")}
  <div class="row">${D.checked ? `<span class="pill ${sc >= 70 ? "good" : "bad"}">${sc}%</span><button class="btn pri" data-act="lbnew">Next label</button>` : `<button class="btn pri" data-act="lbcheck" ${D.items.some(x => x.pick === null) ? "disabled" : ""}>Check</button>`}</div></div></div>`;
}
function drillMatch() {
  if (!DR.match) DR.match = newMatch("grape");
  const M = DR.match, done = Object.keys(M.pairs).length === M.left.length;
  const ok = M.checked ? M.left.filter(l => M.pairs[l] === M.key[l]).length : 0;
  return `<div class="row" style="margin-bottom:16px"><div class="seg"><button class="${M.kind === "grape" ? "on" : ""}" data-act="mtnew" data-arg="grape">Appellation → grape</button><button class="${M.kind === "country" ? "on" : ""}" data-act="mtnew" data-arg="country">Appellation → country</button></div><span class="small muted">Tap an appellation, then its match. Tap a paired appellation to undo.</span></div>
  <div class="match" style="max-width:760px">
    <div class="grid" style="gap:8px">${M.left.map(l => { let c = ""; if (M.checked) c = M.pairs[l] === M.key[l] ? "right" : "wrong"; else if (M.sel === l) c = "sel"; else if (M.pairs[l]) c = "paired"; return `<button class="${c}" data-act="mtl" data-arg="${esc(l)}" ${M.checked ? "disabled" : ""}><b>${esc(l)}</b>${M.pairs[l] ? `<div class="small muted">→ ${esc(M.pairs[l])}${M.checked && M.pairs[l] !== M.key[l] ? ` · answer: ${esc(M.key[l])}` : ""}</div>` : ""}</button>`; }).join("")}</div>
    <div class="grid" style="gap:8px">${M.right.map(r => { const used = Object.values(M.pairs).includes(r); return `<button class="${used ? "paired" : ""}" data-act="mtr" data-arg="${esc(r)}" ${M.checked || used || !M.sel ? "disabled" : ""}>${esc(r)}</button>`; }).join("")}</div>
  </div>
  <div class="row" style="margin-top:16px">${M.checked ? `<span class="pill ${ok >= 5 ? "good" : "bad"}">${ok}/${M.left.length}</span><button class="btn pri" data-act="mtnew" data-arg="${M.kind}">New set</button>` : `<button class="btn pri" data-act="mtcheck" ${done ? "" : "disabled"}>Check</button>`}</div>`;
}

function viewExams() {
  const t = TRACKS[S.track];
  return `<div class="wrap"><div class="eyebrow">Exam Hall · ${t.name} track</div><h1>Sit the <em>exam.</em></h1><p class="lede">Every mock follows the real question counts, time limits and pass marks as closely as software can. The clock submits for you. Pass every component to earn the seal, and each seal opens the next level's exam.</p>
  <div class="rules small" style="margin-bottom:26px"><b style="color:var(--gold2);letter-spacing:1.6px;font-size:11px;text-transform:uppercase">Examiner's standards</b><ul style="margin:8px 0 0;padding-left:18px"><li>Closed book: no notes, no lookups, no second tab.</li><li>The timer cannot be paused. Leaving the page abandons the attempt.</li><li>Prerequisites apply: a level's exam opens only after the seal before it.</li><li>Self-marked papers count only if you mark honestly. Tick a point only if you wrote it.</li></ul></div>
  <div class="tabs">${Object.entries(TRACKS).map(([k, tr]) => `<button class="${S.track === k ? "on" : ""}" data-act="track" data-arg="${k}">${tr.name} track</button>`).join("")}</div>
  ${t.creds.map(c => { const st = credStatus(c); return `<div class="card" style="margin-bottom:16px"><div class="row" style="gap:16px"><div class="seal ${st.earned ? "earned" : ""} ${st.open ? "" : "locked"}">${c.pin}</div><div style="flex:1;min-width:200px"><h3 style="margin:0;font-family:var(--f-display);font-size:26px">${c.name}</h3><div class="small muted">${st.done}/${st.total} lessons passed${st.open ? "" : ` · <span style="color:var(--bad)">Locked: earn the ${esc(prereq(c).name)} seal first</span>`}</div></div></div>
  <div class="grid g3" style="margin-top:16px">${st.comps.map(({ cp, best }) => `<div style="border:1px solid var(--line);border-radius:var(--r);padding:16px;background:var(--bg2)"><div class="row between"><b>${cp.name}</b>${best !== null ? `<span class="pill ${best >= cp.pass ? "good" : "bad"}">best ${best}%</span>` : `<span class="pill">${cp.pass}% to pass</span>`}</div><p class="small muted" style="margin:8px 0 14px">${cp.note}</p><button class="btn sm ${st.open ? "pri" : ""}" data-act="exstart" data-arg="${c.id}:${cp.id}" ${st.open ? "" : "disabled"}>${st.open ? `Begin · ${cp.mins} min` : "Locked"}</button></div>`).join("")}</div></div>`; }).join("")}
  <h2>Practice & electives</h2><p class="muted small">Always open. Electives copy the Wine Scholar Guild and SWE format: 75% to pass.</p>
  <div class="grid g3">
    <div class="card"><h3>Unit quiz</h3><p class="small muted">10 random questions from one unit, untimed.</p><select data-in="unitq">${UNITS.map(u => `<option value="${u.id}">${esc(u.name)}</option>`).join("")}</select><button class="btn sm" style="margin-top:10px" data-act="unitquiz">Start</button></div>
    <div class="card"><h3>Short-answer practice</h3><p class="small muted">One 25-mark WSET-style question, self-marked.</p><button class="btn sm" data-act="exstart" data-arg="practice:sa">Start · 20 min</button></div>
    <div class="card"><h3>Essay practice</h3><p class="small muted">One Diploma/MW prompt in 45 minutes, rubric-scored.</p><button class="btn sm" data-act="exstart" data-arg="practice:essay">Start · 45 min</button></div>
    ${ELECTIVES.map(e => { const pool = QS.filter(q => !e.units || e.units.includes(q.unit)); const n = Math.min(e.n || 100, pool.length); const best = (S.comps[e.id] || {}).best; return `<div class="card"><h3>${e.name}</h3><p class="small muted">${n} questions · ${e.mins || Math.round(n * .6)} min · ${e.pass}% to pass</p>${best != null ? `<span class="pill ${best >= e.pass ? "good" : "bad"}">best ${best}%</span> ` : ""}<button class="btn sm" data-act="exstart" data-arg="elective:${e.id}">Start</button></div>`; }).join("")}
  </div></div>`;
}
