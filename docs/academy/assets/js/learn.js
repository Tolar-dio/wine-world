// ===== Campus, Curriculum, Lessons, Planner, Library =====
// The two-track choice sits in the hero, where a first-time visitor sees it before pressing Begin.
const TRACK_FOR = { floor: "Blind tasting out loud against the clock, tableside service exams, plus spirits, beer and sake. For the dining room.", analyst: "Written tasting notes, short answers and essays on why a wine tastes the way it does. For buying, writing and teaching." };
function trackPicker() {
  return `<div class="trackpick" role="group" aria-label="Choose your track">${Object.entries(TRACKS).map(([k, tr]) => `<button type="button" data-act="track" data-arg="${k}" aria-pressed="${S.track === k}"><span class="tp-k">${k === "floor" ? "Court of Master Sommeliers" : "WSET · Master of Wine"}</span><b>${tr.name} track</b><span class="tp-d">${TRACK_FOR[k]}</span></button>`).join("")}</div><p class="small muted tp-note">Different exams, different skills; the regions you study overlap. Switch anytime and passed lessons carry over.</p>`;
}
function viewCampus() {
  const t = TRACKS[S.track], c = currentCred(S.track), st = credStatus(c);
  const lp = Math.round(100 * st.done / st.total), nl = nextLesson(S.track), due = dueCards().length;
  const wk = Math.max(0, Math.floor((Date.now() - new Date(S.start).getTime()) / (7 * 864e5)));
  const pr = PAIRS[wk % PAIRS.length];
  const seals = Object.values(TRACKS).flatMap(tr => tr.creds).map(cr => `<div class="seal ${S.pins[cr.id] ? "earned" : ""}" title="${esc(cr.name)}${S.pins[cr.id] ? " · earned " + S.pins[cr.id] : ""}">${cr.pin}</div>`).join("");
  const recent = S.hist.slice(-5).reverse().map(h => `<div class="row between small" style="padding:7px 0;border-bottom:1px solid var(--line)"><span>${esc(h.name)}</span><span class="pill ${h.pass ? "good" : "bad"}">${h.score}%</span></div>`).join("") || `<p class="muted small">No exams sat yet. Every mock runs on the real clock with the real pass mark.</p>`;
  return `<div class="wrap">
  <section class="hero">${STAIN}
    <div>
      <div class="eyebrow">Vitis Mundi Academy · ${t.name} track</div>
      <div class="display">${S.xp ? "Pick up where you <em>left off.</em>" : "Train like a <em>sommelier.</em>"}</div>
      <p class="lede" style="margin-top:18px">A complete sommelier program modeled on the Court of Master Sommeliers and WSET: ${L.length} lessons, ${QS.length} exam questions, ${WINES.length} classic wine profiles, timed mock exams at the real pass marks, and a tasting-night planner for your study group.</p>
      ${trackPicker()}
      <div class="row">${nl ? `<a class="btn pri" href="#lesson-${nl}">${S.done[ORDER[0]] ? "Continue" : "Begin"}: ${esc(LBY[nl].title)}</a>` : `<a class="btn pri" href="#exams">Sit the exam</a>`}<a class="btn" href="#night">Plan a tasting night</a></div>
    </div>
  </section>
  <div class="stats"><div><div class="stat">${streak()}<small>Day streak</small></div></div><div><div class="stat">${S.xp.toLocaleString()}<small>Experience</small></div></div><div><div class="stat">${Object.keys(S.done).length}<small>Lessons passed</small></div></div><div><div class="stat">${due}<small>Cards due</small></div></div></div>

  <h2>Your standing</h2>
  <div class="grid g2">
    <div class="card"><div class="row" style="gap:22px">${ring(lp, "LESSONS")}<div style="flex:1;min-width:200px"><div class="eyebrow">Working toward</div><h3 style="font-family:var(--f-display);font-size:28px;margin:0 0 6px">${c.name}</h3>
      <p class="muted small" style="margin:0 0 12px">${st.done} of ${st.total} lessons · ${st.passed} of ${c.comps.length} exam components passed${!st.open ? ` · <span style="color:var(--bad)">exam locked until ${esc(prereq(c).name)}</span>` : ""}</p>
      <div class="row"><a class="btn sm" href="#curriculum">See the path</a><a class="btn sm" href="#exams">Exam Hall</a></div></div></div></div>
    <div class="card"><div class="eyebrow">This week's flight · week ${wk + 1} of ${PAIRS.length}</div><h3 style="font-family:var(--f-display);font-size:26px;margin:0 0 8px">${esc(pr[0])}</h3>
      <p class="small muted">Taste these side by side, blind. Send a friend the shopping list and host card in one tap.</p>
      <div class="row small" style="margin-bottom:14px">${[pr[1], pr[2]].map(id => `<span class="pill">${esc(WBY[id].grape)} · ${esc(WBY[id].region)}</span>`).join("")}</div>
      <button class="btn sm gold" data-act="nightpair" data-arg="${PAIRS.indexOf(pr)}">Text a friend this flight</button></div>
  </div>
  ${viewPlannerCard()}
  <h2>Seals</h2>
  <div class="card"><div class="row" style="gap:12px">${seals}</div><p class="small muted" style="margin:14px 0 0">Floor: I · C · A · MS. Analyst: L2 · L3 · D · MW. Pass every component of a credential's exam to earn its seal. Each exam unlocks only after the seal before it, just like the real prerequisites.</p></div>
  <div class="card" style="margin-top:16px"><div class="eyebrow">Recent exams</div>${recent}</div>
  </div>`;
}

// ---------- the hero mark: the academy's globe-and-grapes crest, drawn in hairline as a watermark ----------
const STAIN = `<svg class="stain" viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="20" cy="20" r="18.5" stroke-width=".25"/><ellipse cx="20" cy="20" rx="8" ry="18.5" stroke-width=".2"/><path d="M1.5 20h37" stroke-width=".2"/><g stroke-width=".22"><circle cx="16.5" cy="15" r="3"/><circle cx="23.5" cy="15" r="3"/><circle cx="20" cy="20.5" r="3"/><circle cx="13.5" cy="20.5" r="2.6"/><circle cx="26.5" cy="20.5" r="2.6"/><circle cx="17" cy="26" r="2.6"/><circle cx="23" cy="26" r="2.6"/><circle cx="20" cy="31" r="2.3"/></g><path d="M20 12c0-3 1.5-5 4-6" stroke-width=".3"/></svg>`;

// ---------- study planner ----------
function viewPlannerCard() {
  const P = S.plan;
  if (!P) return `<h2>Study plan</h2><div class="card"><div class="grid g3" style="align-items:end">
    <label class="f">Target credential<select id="plcred">${Object.values(TRACKS).flatMap(t => t.creds).map(c => `<option value="${c.id}" ${c.id === currentCred(S.track).id ? "selected" : ""}>${c.name} (${TRACKS[c.track].name})</option>`).join("")}</select></label>
    <label class="f">Exam date<input type="date" id="pldate" value="${new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10)}"></label>
    <label class="f">Study sessions per week<select id="plses">${[2, 3, 4, 5, 6].map(n => `<option ${n === 4 ? "selected" : ""}>${n}</option>`).join("")}</select></label></div>
    <button class="btn pri" data-act="plan" style="margin-top:16px">Build my schedule</button><p class="small muted" style="margin:10px 0 0">The planner spreads your remaining lessons across the weeks, assigns a tasting pair each week, and books mock exams before the date.</p></div>`;
  const c = CREDS[P.cred], left = cumLessons(c).filter(id => !S.done[id]);
  const end = new Date(P.date + "T12:00:00"), now = new Date(); const weeks = Math.max(1, Math.ceil((end - now) / (7 * 864e5)));
  const studyWeeks = Math.max(1, weeks - 1), per = Math.ceil(left.length / studyWeeks);
  const rows = [];
  for (let w = 0; w < weeks; w++) {
    const d = new Date(now.getTime() + w * 7 * 864e5); const ls = w < studyWeeks ? left.slice(w * per, (w + 1) * per) : [];
    const pr = PAIRS[(w + Math.floor((now - new Date(S.start)) / (7 * 864e5))) % PAIRS.length];
    const mock = w === Math.floor(weeks / 2) ? "Full mock exam (diagnostic)" : w >= weeks - 1 ? "Final mocks: every component, twice" : w === weeks - 2 ? "Full mock exam" : "";
    rows.push(`<tr><td class="mono">${w + 1}<div class="small muted">${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div></td><td>${ls.map(id => `<a href="#lesson-${id}">${esc(LBY[id].title)}</a>`).join("<br>") || '<span class="muted">Review flashcards and weak units</span>'}</td><td class="small">${esc(pr[0])}</td><td class="small">${mock ? `<span class="pill gold">${mock}</span>` : ""}</td></tr>`);
  }
  const pace = left.length / studyWeeks / P.ses;
  return `<h2>Study plan</h2><div class="card"><div class="row between"><div><b style="font-family:var(--f-display);font-size:22px">${esc(c.name)}</b> <span class="muted small">· exam ${end.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} · ${weeks} weeks · ${left.length} lessons left</span></div><button class="btn sm" data-act="planreset">Change plan</button></div>
  ${pace > 1.6 ? `<p class="small" style="color:var(--bad)">That's ${pace.toFixed(1)} lessons per session. It's aggressive; push the date or add sessions.</p>` : ""}
  <div class="tw"><table class="t"><tr><th>Week</th><th>Lessons</th><th>Tasting pair</th><th>Exams</th></tr>${rows.join("")}</table></div></div>`;
}

// ---------- curriculum ----------
function viewCurriculum() {
  const t = TRACKS[S.track];
  return `<div class="wrap"><div class="eyebrow">Curriculum · ${t.name} track</div><h1>The <em>path.</em></h1>
  <p class="lede">Modeled on ${t.model}. Each credential adds lessons and ends in an exam built to the real format. Pass a lesson quiz at ${PASS_LESSON}% to complete it.</p>
  <div class="tabs">${Object.entries(TRACKS).map(([k, tr]) => `<button class="${S.track === k ? "on" : ""}" data-act="track" data-arg="${k}">${tr.name} track</button>`).join("")}</div>
  ${t.creds.map(c => { const st = credStatus(c); return `<section style="margin-bottom:46px">
    <div class="row" style="gap:18px;margin-bottom:16px"><div class="seal ${st.earned ? "earned" : ""} ${st.open ? "" : "locked"}">${c.pin}</div><div style="flex:1;min-width:220px"><h2 style="margin:0">${c.name}</h2>
    <div class="small muted">${st.done}/${st.total} lessons · ${st.passed}/${c.comps.length} components${st.earned ? " · sealed " + S.pins[c.id] : st.open ? "" : " · exam opens after " + esc(prereq(c).name)}</div>
    <div class="bar" style="margin-top:10px;max-width:380px"><i style="width:${Math.round(100 * st.done / st.total)}%"></i></div></div>
    <a class="btn sm" href="#exams">Exam: ${c.comps.map(x => x.name).join(" + ")}</a></div>
    ${groupByUnit(c.lessons).map(([u, ids]) => `<div class="eyebrow" style="margin:20px 0 8px">${esc(UBY[u].name)}</div><div class="unitlist">${ids.map(lessonRow).join("")}</div>`).join("")}
  </section>`; }).join("")}</div>`;
}
function groupByUnit(ids) { const m = new Map(); ids.slice().sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).forEach(id => { const u = LBY[id].unit; if (!m.has(u)) m.set(u, []); m.get(u).push(id); }); return [...m.entries()].sort((a, b) => UNITS.findIndex(x => x.id === a[0]) - UNITS.findIndex(x => x.id === b[0])); }
function lessonRow(id) { const l = LBY[id], d = S.done[id], q = S.quiz[id]; return `<a class="lrow" href="#lesson-${id}"><span class="st ${d ? "done" : ""}">${d ? "✓" : ""}</span><span style="min-width:0"><b>${esc(l.title)}</b><span class="s">${esc(l.summary)}</span></span><span class="small muted mono">${q != null ? q + "%" : l.mins + " min"}</span></a>`; }

// ---------- lesson ----------
let LQ = null;
function viewLesson(id) {
  const l = LBY[id]; if (!l) return `<div class="wrap"><h1>Lesson not found</h1><a class="btn" href="#curriculum">Back to the path</a></div>`;
  const i = ORDER.indexOf(id), prev = ORDER[i - 1], next = ORDER[i + 1];
  LQ = { id, items: l.quiz.map(q => ({ q, opts: shuffle([q[2], ...q[3]]), pick: null })), checked: false };
  const lenses = S.track === "floor" ? [["Floor lens · The Court", l.floor, ""], ["Analyst lens · WSET", l.analyst, "an"]] : [["Analyst lens · WSET", l.analyst, "an"], ["Floor lens · The Court", l.floor, ""]];
  const region = !!atlasScope(l);
  if (region) postHooks.push(() => annotateLesson(id));
  postHooks.push(() => { const pb = $("#pb"); if (pb) { const f = () => { const h = document.documentElement; pb.style.width = Math.min(100, 100 * h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) + "%"; }; window.onscroll = f; f(); } });
  return `<div class="progressbar" id="pb"></div><div class="wrap read">
  <div class="eyebrow"><a href="#curriculum">${esc(UBY[l.unit].name)}</a> · Lesson ${i + 1} of ${ORDER.length} · ${l.mins} min${S.done[id] ? ' · <span style="color:var(--good)">passed</span>' : ""}</div>
  <h1>${esc(l.title)}</h1><p class="lede">${esc(l.summary)}</p><div class="rule" style="margin:8px 0 30px"></div>
  ${region ? `<div class="atlas-strip" id="atlasstrip" hidden></div>` : ""}
  <div class="prose">${l.body.replace(/<table class="t">/g, '<div class="tw"><table class="t">').replace(/<\/table>/g, "</table></div>")}</div>
  ${lenses.map(([n, h, c]) => h ? `<div class="lens ${c}"><div class="eyebrow">${n}</div>${h}</div>` : "").join("")}
  ${l.terms && l.terms.length ? `<h2>Key terms</h2><div class="tw"><table class="t">${l.terms.map(t => `<tr><td style="width:34%"><b>${esc(t[0])}</b></td><td>${esc(t[1])}</td></tr>`).join("")}</table></div>` : ""}
  <h2>Examination</h2><p class="muted small">${l.quiz.length} questions. Score ${PASS_LESSON}% or better to pass the lesson; its terms join your flashcard deck.</p>
  <div id="lq">${renderLQ()}</div>
  <div class="row between" style="margin-top:46px">${prev ? `<a class="btn" href="#lesson-${prev}">← ${esc(LBY[prev].title)}</a>` : "<span></span>"}${next ? `<a class="btn" href="#lesson-${next}">${esc(LBY[next].title)} →</a>` : ""}</div>
  </div>`;
}
function renderLQ() {
  const html = LQ.items.map((it, qi) => `<div class="q"><div class="qt">${qi + 1}. ${esc(it.q[1])} ${it.q[0] > 1 ? `<span class="pill">${it.q[0] === 2 ? "Certified · L3" : "Advanced · Diploma"}</span>` : ""}</div><div class="opts">${it.opts.map((o, oi) => {
    let cls = "opt"; if (LQ.checked) { if (o === it.q[2]) cls += " right"; else if (it.pick === oi) cls += " wrong"; } else if (it.pick === oi) cls += " sel";
    return `<button class="${cls}" data-act="lqpick" data-arg="${qi}:${oi}" ${LQ.checked ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div>${LQ.checked ? `<div class="expl">${esc(it.q[4])}</div>` : ""}</div>`).join("");
  const n = LQ.items.filter(x => x.pick !== null).length;
  let foot;
  if (!LQ.checked) foot = `<button class="btn pri" data-act="lqcheck" ${n < LQ.items.length ? "disabled" : ""}>Submit answers (${n}/${LQ.items.length})</button>`;
  else { const sc = Math.round(100 * LQ.items.filter(x => x.opts[x.pick] === x.q[2]).length / LQ.items.length); foot = `<div class="card row between"><div class="row"><b style="font-family:var(--f-display);font-size:32px">${sc}%</b> <span class="pill ${sc >= PASS_LESSON ? "good" : "bad"}">${sc >= PASS_LESSON ? "Passed" : `Below ${PASS_LESSON}%. Reread and retake.`}</span></div><button class="btn" data-act="lqretry">Retake</button></div>`; }
  return html + foot;
}

// ---------- library ----------
function viewLibrary() {
  return `<div class="wrap"><div class="eyebrow">Library</div><h1>The reading <em>room.</em></h1><p class="lede">How the real programs compare, what they cost, what to read, and every key term in the academy.</p>
  <h2>The real programs</h2><div class="tw"><table class="t"><tr><th>Credential</th><th>Exam</th><th>Pass</th><th>Typical US cost</th></tr>
  <tr><td>CMS Introductory</td><td>70 MCQ in 45 min</td><td>60%</td><td>$649 online course + exam</td></tr>
  <tr><td>CMS Certified</td><td>45 Q in 38 min · 4 wines in 45 min · ~16 min service</td><td>60% each</td><td>See current CMS calendar</td></tr>
  <tr><td>CMS Advanced</td><td>Theory · 6 wines in 25 min, verbal · service & business</td><td>60% each, same year</td><td>Course and exam separate; $100 application</td></tr>
  <tr><td>Master Sommelier</td><td>Oral theory · 6 wines in 25 min · service</td><td>75% each</td><td>About $1,000 per section (reported)</td></tr>
  <tr><td>WSET Level 2</td><td>50 MCQ in 60 min</td><td>55%</td><td>$599-950</td></tr>
  <tr><td>WSET Level 3</td><td>50 MCQ + 4 × 25-mark answers · 2 wines in 30 min</td><td>55% each part</td><td>$1,135-1,780</td></tr>
  <tr><td>WSET Diploma</td><td>D1-D6, about 500 hours</td><td>55%</td><td>About $7,800</td></tr>
  <tr><td>CSW (SWE)</td><td>100 MCQ in 60 min</td><td>75%</td><td>About $475-850</td></tr>
  <tr><td>Wine Scholar Guild</td><td>100 MCQ in 60 min</td><td>75%</td><td>From $795-945</td></tr>
  <tr><td>Master of Wine</td><td>Stage 1 · Stage 2 (3 × 12 wines, 5 theory papers) · research paper</td><td>Set by examiners</td><td>Multi-year</td></tr></table></div>
  <p class="small muted">Figures from program sites and one large US WSET provider, 2026. They change; check before you book.</p>
  <h2>A credential strategy</h2><div class="card read prose"><p>Study everything here first. If an employer wants paper, buy one exam: CMS Certified for restaurant floors, WSET Level 3 for retail, import, distribution or writing. You'll sit it already prepared, which is the cheapest route to the credential. And taste weekly with a group; that's the one part no course does for you.</p></div>
  <h2>Reading list</h2><div class="grid g3">${RESOURCES.map(r => `<div class="card"><b>${esc(r[0])}</b><div class="small muted">${esc(r[1])}</div><p class="small" style="margin:8px 0 0;color:var(--ink2)">${esc(r[2])}</p></div>`).join("")}
  <div class="card"><b>Vitis Mundi</b><div class="small muted">vitismundi.app</div><p class="small" style="margin:8px 0 0;color:var(--ink2)">The interactive wine-region globe and appellation maps that pair with every region lesson here. <a href="https://vitismundi.app" target="_blank" rel="noopener">Open it</a>.</p></div></div>
  <h2>Glossary</h2><input type="text" data-gloss="1" placeholder="Search ${TERMS.length} terms" style="max-width:380px"><div id="gloss" class="tw">${glossTable("")}</div></div>`;
}
function glossTable(q) { q = q.toLowerCase(); const rows = TERMS.filter(t => !q || t.t.toLowerCase().includes(q) || t.d.toLowerCase().includes(q)).sort((a, b) => a.t.localeCompare(b.t)); return `<table class="t">${rows.map(t => `<tr><td style="width:30%"><b>${esc(t.t)}</b></td><td class="small">${esc(t.d)} <a href="#lesson-${t.lesson}" class="muted">${esc(LBY[t.lesson].title)}</a></td></tr>`).join("")}</table>`; }
