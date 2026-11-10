// ===== Exam engine =====
// ---------- EXAM HALL ----------
// One paper never asks the same thing twice: a later question with the same wording, or the same answer to a near-identical stem, is dropped.
const qKey = q => q.q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function uniqQ(list) { const seen = new Set(); return list.filter(q => { const k = qKey(q); if (seen.has(k)) return false; seen.add(k); return true; }); }
function drawMCQ(lessons, n, mix) {
  const pool = uniqQ(shuffle(QS.filter(q => lessons.includes(q.lesson))));
  const by = { 1: shuffle(pool.filter(q => q.d === 1)), 2: shuffle(pool.filter(q => q.d === 2)), 3: shuffle(pool.filter(q => q.d === 3)) };
  let out = [];
  Object.entries(mix).forEach(([d, f]) => { out.push(...by[d].splice(0, Math.round(n * f))); });
  const rest = shuffle([...by[1], ...by[2], ...by[3]]);
  while (out.length < n && rest.length) out.push(rest.pop());
  return shuffle(out.slice(0, n)).map(q => ({ q, opts: shuffle([q.a, ...q.dist]), pick: null, flag: false }));
}
function startExam(arg) {
  const [cid, kid] = arg.split(":");
  let cp, name, key, cred = null;
  if (cid === "practice") { cp = kid === "sa" ? { id: "sa", type: "sa", n: 1, mins: 20, pass: 55 } : { id: "essay", type: "essay", mins: 45, pass: 55 }; name = kid === "sa" ? "Short-answer practice" : "Essay practice"; key = "practice:" + kid; }
  else if (cid === "review") { const pool = missedQS(); cp = { id: "review", type: "mcq", n: Math.min(20, pool.length), mins: 0, pass: 80, pool }; name = "Review your misses"; key = null; }
  else if (cid === "elective") { const e = ELECTIVES.find(x => x.id === kid); const pool = uniqQ(QS.filter(q => !e.units || e.units.includes(q.unit))); const n = Math.min(e.n || 100, pool.length); cp = { id: e.id, type: "mcq", n, mins: e.mins || Math.round(n * .6), pass: e.pass, pool }; name = e.name; key = e.id; }
  else if (cid === "unit") { const pool = uniqQ(QS.filter(q => q.unit === kid)); cp = { id: "unit", type: "mcq", n: Math.min(10, pool.length), mins: 0, pass: 70, pool }; name = UBY[kid].name + " quiz"; key = null; }
  else { cred = CREDS[cid]; cp = cred.comps.find(x => x.id === kid); name = cred.name + ": " + cp.name; key = cid + ":" + kid; }
  EX = { cp, cred, name, key, idx: 0, endAt: cp.mins ? Date.now() + cp.mins * 6e4 : null, done: false, result: null };
  if (cp.type === "mcq") EX.items = cp.pool ? shuffle(cp.pool).slice(0, cp.n).map(q => ({ q, opts: shuffle([q.a, ...q.dist]), pick: null, flag: false })) : drawMCQ(cumLessons(cred), cp.n, cp.mix);
  else if (cp.type === "blind") EX.flight = newFlight({ n: cp.n, mix: cp.mix, pool: cp.pool, region: cp.region, noise: cp.noise, mins: 0 });
  else if (cp.type === "sat") EX.drill = newDrill(2, "all");
  else if (cp.type === "sa") EX.sa = shuffle(SHORT).slice(0, cp.n).map(s => ({ s, text: s.parts.map(() => ""), marks: s.parts.map(p => p[1].map(() => false)), revealed: false }));
  else if (cp.type === "essay") { const fresh = ESSAYS.filter(e => e !== S.lastEssay); EX.essay = { prompt: pick(fresh.length ? fresh : ESSAYS), text: "", scores: RUBRIC.map(() => null), revealed: false }; S.lastEssay = EX.essay.prompt; }
  else if (cp.type === "practical") {
    const lvl = cp.level;
    EX.prac = { seqs: (lvl === 3 ? shuffle(Object.keys(SEQUENCES)).slice(0, 2) : [pick(Object.keys(SEQUENCES))]).map(newSeq), temps: newTemps(4), math: Array.from({ length: lvl === 3 ? 5 : 3 }, genMath), list: newList(), pair: drawMCQ(["s4"], lvl === 3 ? 4 : 3, { 1: .5, 2: .5 }), checked: false };
  }
  go("exam"); startTimer();
}
let TIMER = null;
function startTimer() { stopTimer(); if (!EX || !EX.endAt) return; tick(); TIMER = setInterval(tick, 1000); }
function stopTimer() { if (TIMER) clearInterval(TIMER); TIMER = null; }
function tick() { if (!EX || EX.done) return stopTimer(); const left = Math.max(0, EX.endAt - Date.now()); const el = $("#timer"); if (el) { const m = Math.floor(left / 6e4), s = Math.floor(left % 6e4 / 1000); el.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; el.classList.toggle("low", left < 6e4 * 3); } if (left <= 0) { toast("Time. Paper submitted."); finishExam(true); } }
function viewExam() {
  const E = EX, cp = E.cp;
  if (E.done) return examResult();
  const head = `<div class="eyebrow">Exam Hall</div><h1>${esc(E.name)}</h1>`;
  if (cp.type === "mcq") {
    const it = E.items[E.idx], answered = E.items.filter(x => x.pick !== null).length, open = E.items.length - answered, flagged = E.items.filter(x => x.flag).length;
    return `<div class="wrap read">${head}<div class="examtop"><span class="small muted">${answered}/${E.items.length} answered · ${cp.pass}% to pass</span>${E.endAt ? `<div class="timer" id="timer">--:--</div>` : ""}</div>
    <div class="q"><div class="eyebrow">Question ${E.idx + 1} of ${E.items.length} · ${esc(UBY[it.q.unit].name)}</div><div class="qt" style="font-size:19px">${esc(it.q.q)}</div><div class="opts">${it.opts.map((o, oi) => `<button class="opt ${it.pick === oi ? "sel" : ""}" data-act="expick" data-arg="${oi}"><span class="key">${"ABCD"[oi]}</span>${esc(o)}</button>`).join("")}</div></div>
    ${E.confirm ? `<div class="card confirm"><b>${open} question${open === 1 ? "" : "s"} unanswered${flagged ? ` · ${flagged} flagged` : ""}.</b><p class="small muted" style="margin:4px 0 12px">A blank scores the same as a wrong answer, so guess before you hand it in.</p><div class="row"><button class="btn" data-act="exkeep">Go to the first blank</button><button class="btn pri" data-act="exfinish">Submit anyway</button></div></div>` : ""}
    <div class="row"><button class="btn" data-act="exnav" data-arg="${E.idx - 1}" ${E.idx === 0 ? "disabled" : ""}>← Back</button><button class="btn" data-act="exflag">${it.flag ? "Unflag" : "Flag for review"}</button>${E.idx < E.items.length - 1 ? `<button class="btn pri" data-act="exnav" data-arg="${E.idx + 1}">Next →</button>` : `<button class="btn pri" data-act="exfinish">Submit paper</button>`}</div>
    <div class="qnav">${E.items.map((x, i) => `<button class="${x.pick !== null ? "a" : ""} ${i === E.idx ? "cur" : ""} ${x.flag ? "f" : ""}" data-act="exnav" data-arg="${i}">${i + 1}</button>`).join("")}</div>
    <div class="row between"><button class="btn ghost sm" data-act="exfinish">Submit now</button><span class="small muted kbdhint">Keys: A-D or 1-4 answer · ← → move · F flag</span></div></div>`;
  }
  if (cp.type === "blind") return `<div class="wrap">${head}${renderFlight(E.flight, true)}</div>`;
  if (cp.type === "sat") return `<div class="wrap">${head}${renderDrill(E.drill, true)}</div>`;
  if (cp.type === "sa") return `<div class="wrap read">${head}<div class="examtop"><span class="small muted">Write first. Marking points appear after you submit.</span>${E.endAt ? `<div class="timer" id="timer">--:--</div>` : ""}</div>${E.sa.map((x, qi) => `<div class="card" style="margin-bottom:14px"><div class="eyebrow">Question ${qi + 1} · 25 marks</div><h3 style="margin-top:4px">${esc(x.s.q)}</h3>${x.s.parts.map((p, pi) => `<p style="font-weight:600;margin:14px 0 6px">${esc(p[0])}</p><textarea data-sa="${qi}:${pi}">${esc(x.text[pi])}</textarea>`).join("")}</div>`).join("")}<button class="btn pri" data-act="exfinish">Submit and mark</button></div>`;
  if (cp.type === "essay") return `<div class="wrap read">${head}<div class="examtop"><span class="small muted">Plan for 5 minutes, write for 35, review for 5.</span>${E.endAt ? `<div class="timer" id="timer">--:--</div>` : ""}</div><div class="card"><div class="eyebrow">Prompt</div><h3 style="font-family:var(--f-display);font-size:24px;margin-top:4px">${esc(E.essay.prompt)}</h3><textarea data-essay="1" style="min-height:360px">${esc(E.essay.text)}</textarea><div class="small muted" id="wc">${E.essay.text.trim().split(/\s+/).filter(Boolean).length} words</div></div><button class="btn pri" data-act="exfinish" style="margin-top:12px">Submit and assess</button></div>`;
  if (cp.type === "practical") { const P = E.prac; return `<div class="wrap read">${head}<div class="examtop"><span class="small muted">Work through every station, then submit.</span>${E.endAt ? `<div class="timer" id="timer">--:--</div>` : ""}</div>
    <h2>Station 1: Service</h2>${P.seqs.map((q, i) => `<div data-seqi="${i}">${renderSeq(q, true)}</div>`).join("")}
    <h2>Station 2: Temperatures</h2>${renderTemps(P.temps, true, false)}
    <h2>Station 3: Pairing & salesmanship</h2>${P.pair.map((it, qi) => `<div class="q"><div class="qt">${esc(it.q.q)}</div><div class="opts">${it.opts.map((o, oi) => `<button class="opt ${it.pick === oi ? "sel" : ""}" data-act="ppick" data-arg="${qi}:${oi}">${esc(o)}</button>`).join("")}</div></div>`).join("")}
    <h2>Station 4: Wine list</h2>${renderList(P.list, true)}
    <h2>Station 5: Business math</h2>${renderMath(P.math, true)}
    <button class="btn pri" data-act="exfinish" style="margin-top:18px">Submit practical</button></div>`; }
  return "";
}
function finishExam(timeout) {
  const E = EX; if (!E || E.done) return; const cp = E.cp; let score = 0, detail = "";
  if (cp.type === "mcq") {
    const ok = E.items.filter(x => x.pick !== null && x.opts[x.pick] === x.q.a).length; score = Math.round(100 * ok / E.items.length);
    E.items.forEach(x => markQ(x.q.id, x.pick !== null && x.opts[x.pick] === x.q.a));
    const byU = {}; E.items.forEach(x => { const u = x.q.unit; byU[u] = byU[u] || [0, 0]; byU[u][1]++; if (x.pick !== null && x.opts[x.pick] === x.q.a) byU[u][0]++; });
    E.byU = byU;
  } else if (cp.type === "blind") { E.flight.wines.forEach(w => { if (!w.scored) scoreWine(w); }); score = Math.round(E.flight.wines.reduce((s, w) => s + w.scored.pct, 0) / E.flight.wines.length); }
  else if (cp.type === "sat") { E.drill.items.forEach(it => { if (!it.scored) scoreDrill(it); }); score = Math.round(E.drill.items.reduce((s, it) => s + it.scored.pct, 0) / E.drill.items.length); }
  else if (cp.type === "sa") { E.sa.forEach(x => x.revealed = true); E.needsMark = true; }
  else if (cp.type === "essay") { E.essay.revealed = true; E.needsMark = true; }
  else if (cp.type === "practical") {
    const P = E.prac; P.seqs.forEach(q => q.done = true); P.math.forEach(m => { m.ok = mathOK(m, m.v); m.checked = true; }); P.list.checked = true; P.checked = true;
    const parts = [P.seqs.reduce((s, q) => s + seqScore(q), 0) / P.seqs.length, 100 * P.temps.filter(t => t.pick === t.i).length / P.temps.length, 100 * P.pair.filter(x => x.pick !== null && x.opts[x.pick] === x.q.a).length / P.pair.length, listScore(P.list), 100 * P.math.filter(m => m.ok).length / P.math.length];
    E.parts = parts; score = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
  }
  E.done = true; stopTimer();
  if (!E.needsMark) record(score);
  // The clock can run out while the student is on another page: bring them back to the result.
  go("exam");
}
function record(score) {
  const E = EX; E.result = score; const pass = score >= E.cp.pass;
  if (E.key) { const k = S.comps[E.key] || { best: null, tries: 0 }; k.tries++; k.best = Math.max(k.best ?? 0, score); k.last = score; S.comps[E.key] = k; }
  S.hist.push({ name: E.name, score, pass, date: today() }); addXP(pass ? 120 : 40);
  if (E.cred) checkPin(E.cred);
  save();
}
function examResult() {
  const E = EX, cp = E.cp;
  if (E.needsMark && E.result === null) {
    if (cp.type === "sa") return `<div class="wrap read"><div class="eyebrow">Mark your paper</div><h1>${esc(E.name)}</h1><p class="lede">Tick each marking point your answer genuinely made. Be strict: examiners only credit points that are stated, not implied.</p>${E.sa.map((x, qi) => `<div class="card" style="margin-bottom:14px"><h3 style="margin-top:0">${esc(x.s.q)}</h3>${x.s.parts.map((p, pi) => `<p style="font-weight:600;margin:14px 0 4px">${esc(p[0])}</p><div class="small" style="background:var(--sunk);padding:10px;border-radius:var(--r);white-space:pre-wrap">${esc(x.text[pi] || "(no answer)")}</div><div class="grid" style="gap:4px;margin-top:8px">${p[1].map((m, mi) => `<label class="small row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start"><input type="checkbox" data-mark="${qi}:${pi}:${mi}" ${x.marks[pi][mi] ? "checked" : ""}> <span>${esc(m)}</span></label>`).join("")}</div>`).join("")}</div>`).join("")}<button class="btn pri" data-act="samark">Record my marks</button></div>`;
    return `<div class="wrap read"><div class="eyebrow">Assess your essay</div><h1>${esc(E.name)}</h1><div class="card"><h3 style="margin-top:0">${esc(E.essay.prompt)}</h3><div class="small" style="white-space:pre-wrap;background:var(--sunk);padding:12px;border-radius:var(--r);max-height:320px;overflow:auto">${esc(E.essay.text || "(empty)")}</div></div>${RUBRIC.map((r, i) => `<div class="gl"><label>${esc(r)}</label><div class="seg">${[0, 1, 2, 3, 4].map(n => `<button class="${E.essay.scores[i] === n ? "on" : ""}" data-act="erub" data-arg="${i}:${n}">${n}</button>`).join("")}</div></div>`).join("")}<p class="small muted">0 absent · 1 weak · 2 adequate · 3 strong · 4 exemplary</p><button class="btn pri" data-act="esmark" ${E.essay.scores.includes(null) ? "disabled" : ""}>Record assessment</button></div>`;
  }
  const pass = E.result >= cp.pass;
  let extra = "";
  if (cp.type === "mcq") {
    extra = `<h2>By unit</h2><div class="grid" style="gap:6px">${Object.entries(E.byU).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).map(([u, [ok, n]]) => `<div><div class="row small" style="justify-content:space-between"><span>${esc(UBY[u].name)}</span><span class="mono">${ok}/${n}</span></div><div class="bar"><i style="width:${Math.round(100 * ok / n)}%"></i></div></div>`).join("")}</div>
    <h2>Review</h2>${E.items.map((it, qi) => { const ok = it.pick !== null && it.opts[it.pick] === it.q.a; return `<div class="q"><div class="qt">${qi + 1}. ${esc(it.q.q)} ${ok ? '<span class="pill good">✓</span>' : '<span class="pill bad">✗</span>'}</div>${ok ? "" : `<div class="small">Your answer: ${esc(it.pick !== null ? it.opts[it.pick] : "none")} · Correct: <b>${esc(it.q.a)}</b></div>`}<div class="expl">${esc(it.q.x)} <a href="#lesson-${it.q.lesson}">Lesson: ${esc(LBY[it.q.lesson].title)}</a></div></div>`; }).join("")}`;
  } else if (cp.type === "blind") extra = `<h2>The wines</h2><div class="grid" style="gap:10px">${E.flight.wines.map((it, i) => `<div class="card">${flightFeedback(it).replace('style="margin-top:16px;border-top:1px solid var(--line);padding-top:14px"', "")}</div>`).join("")}</div>`;
  else if (cp.type === "sat") extra = E.drill.items.map(it => `<div class="card" style="margin-top:10px"><b>${esc(it.w.grape)} · ${esc(it.w.region)}</b> <span class="pill">${it.scored.pct}%</span><div class="tw"><table class="t">${it.scored.rows.map(r => `<tr><td>${r[0]}</td><td>${esc(r[1] || "—")}</td><td style="color:${r[3] ? "var(--good)" : "var(--bad)"}">${esc(r[2])}</td></tr>`).join("")}</table></div></div>`).join("");
  else if (cp.type === "practical") extra = `<div class="tw"><table class="t">${["Service sequence", "Temperatures", "Pairing", "Wine list", "Business math"].map((n, i) => `<tr><td>${n}</td><td class="mono">${Math.round(E.parts[i])}%</td></tr>`).join("")}</table></div><h2>Review</h2>${E.prac.seqs.map(q => renderSeq(q, true)).join("")}<h3>Temperatures</h3>${renderTemps(E.prac.temps, true, true)}<h3>Pairing</h3>${E.prac.pair.map(it => { const ok = it.pick !== null && it.opts[it.pick] === it.q.a; return `<div class="q"><div class="qt">${esc(it.q.q)} ${ok ? '<span class="pill good">✓</span>' : '<span class="pill bad">✗</span>'}</div>${ok ? "" : `<div class="small">Your answer: ${esc(it.pick !== null ? it.opts[it.pick] : "none")} · Correct: <b>${esc(it.q.a)}</b></div>`}<div class="expl">${esc(it.q.x)}</div></div>`; }).join("")}<h3>Wine list</h3>${renderList(E.prac.list, true)}<h3>Business math</h3>${renderMath(E.prac.math, true)}`;
  return `<div class="wrap read"><div class="eyebrow">Result</div><h1>${esc(E.name)}</h1>
  <div class="card row" style="gap:20px">${ring(E.result, pass ? "PASS" : "NOT YET")}<div><div class="stat">${E.result}%<small>Pass mark ${cp.pass}%</small></div>${E.cred && S.pins[E.cred.id] ? `<p style="margin:10px 0 0"><span class="pill gold">${esc(E.cred.name)} seal earned</span></p>` : ""}</div></div>
  <div class="row" style="margin:16px 0"><a class="btn pri" href="#exams">Back to the Exam Hall</a></div>${extra}</div>`;
}

