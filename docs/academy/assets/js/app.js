// ===== Router, actions, boot =====
const NAV = [["progress", "Progress"], ["curriculum", "Curriculum"], ["lab", "Tasting Lab"], ["night", "Tasting Night"], ["floor", "Service Floor"], ["drills", "Drills"], ["cards", "Flashcards"], ["exams", "Exam Hall"], ["apps", "Appellations"], ["library", "Library"]];
let EX = null, postHooks = [];
function postRender() { const hs = postHooks; postHooks = []; hs.forEach(f => f()); }
function route() {
  const h = decodeURIComponent((location.hash || "#progress").slice(1));
  const base = h.startsWith("host/") ? "host" : h.startsWith("apps") ? "apps" : h.split("-")[0];
  const cur = base === "lesson" ? "curriculum" : base === "exam" ? "exams" : NAV.some(n => n[0] === base) ? base : "progress";
  document.querySelectorAll(".nav a").forEach(a => { const on = a.dataset.v === cur; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const nav = $(".nav"), act = $(".nav a.on"); if (nav && act && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = act.offsetLeft - nav.offsetLeft - (nav.clientWidth - act.offsetWidth) / 2;
  // A finished paper is cleared when you walk away; an unfinished one keeps its clock running and follows you as a bar.
  if (EX && EX.done && base !== "exam") { stopTimer(); EX = null; }
  window.onscroll = null;
  const m = $("#main");
  const views = { lesson: () => viewLesson(h.slice(7)), curriculum: viewCurriculum, lab: viewLab, night: viewNight, floor: viewFloor, drills: viewDrills, cards: viewCards, exams: viewExams, library: viewLibrary, apps: viewApps, host: () => viewHost((location.hash || "").slice(6)) };
  const running = EX && !EX.done && base !== "exam" && base !== "host";
  m.innerHTML = (running ? `<div class="exbar"><span><b>Paper in progress:</b> ${esc(EX.name)}</span>${EX.endAt ? `<span class="timer" id="timer">--:--</span>` : ""}<span class="row" style="gap:6px"><a class="btn sm pri" href="#exam">Return to the paper</a><button class="btn sm" data-act="exabandon">Abandon</button></span></div>` : "")
    + (base === "exam" && EX ? viewExam() : (views[base] || viewProgress)()) + (base === "host" ? "" : colophon());
  document.body.classList.toggle("hosting", base === "host");
  const lt = base === "lesson" && LBY[h.slice(7)] ? LBY[h.slice(7)].title : base === "exam" && EX ? EX.name : (NAV.find(n => n[0] === cur) || [])[1];
  document.title = (lt ? lt + " · " : "") + "Vitis Mundi Academy";
  if (EX && !EX.done && EX.endAt) { if (!TIMER) startTimer(); else tick(); }
  postRender();
}
function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }
function rerender() { const y = window.scrollY; route(); window.scrollTo(0, y); }
window.addEventListener("hashchange", () => { route(); if (!(location.hash || "").startsWith("#exam")) window.scrollTo(0, 0); });

// True only while the student is looking at the paper: Lab and Floor drills must never write into a paper left running.
const onExam = () => !!EX && (location.hash || "").startsWith("#exam");
function colophon() { const dark = document.documentElement.dataset.theme === "dark"; return `<footer class="colophon"><div class="row" style="gap:8px"><button class="btn sm" data-act="theme">${dark ? "Switch to paper" : "Switch to night study"}</button><button class="btn sm" data-act="backup">Back up progress</button><button class="btn sm" data-act="restore">Restore</button><button class="btn sm ghost" data-act="reset">Erase progress</button></div><p>Progress lives in this browser. Back it up to move devices. The Floor track models the Court of Master Sommeliers; the Analyst track models WSET and the Master of Wine. Independent and unaffiliated.</p></footer>`; }
function seqTarget(el) { if (onExam() && EX.prac) { const box = el.closest("[data-seqi]"); return EX.prac.seqs[+box.dataset.seqi]; } return FL.seq; }
let LABT = null;
function fmt(ms) { return `${String(Math.floor(ms / 6e4)).padStart(2, "0")}:${String(Math.floor(ms % 6e4 / 1000)).padStart(2, "0")}`; }
function labTimer() { clearInterval(LABT); LABT = setInterval(() => { const F = LAB.flight; const el = $("#timer"); if (!F || !F.endAt || onExam()) { clearInterval(LABT); return; } const left = Math.max(0, F.endAt - Date.now()); if (el) { el.textContent = fmt(left); el.classList.toggle("low", left < 18e4); } if (left <= 0) { clearInterval(LABT); F.wines.forEach(w => { if (!w.scored) scoreWine(w); }); toast("Time. Flight scored."); if ((location.hash || "").startsWith("#lab")) rerender(); } }, 1000); }
function smsLink() {
  const ids = nightWines(); if (ids.length < 2) return null;
  const order = NT.built && NT.built.key === ids.join() ? NT.built.order : shuffle(ids); NT.built = { key: ids.join(), order };
  const msg = buildMessage(ids, hostURL(order)); const ios = /iP(hone|ad|od)|Macintosh/.test(navigator.userAgent);
  return { order, msg, href: `sms:${(NT.phone || "").replace(/[^\d+]/g, "")}${ios ? "&" : "?"}body=${encodeURIComponent(msg)}` };
}

const ACT = {
  track(el) { S.track = el.dataset.arg; save(); rerender(); },
  lqpick(el) { const [q, o] = el.dataset.arg.split(":").map(Number); LQ.items[q].pick = o; $("#lq").innerHTML = renderLQ(); },
  lqcheck() { LQ.checked = true; LQ.items.forEach((x, i) => markQ(LQ.id + "-" + i, x.opts[x.pick] === x.q[2])); const sc = Math.round(100 * LQ.items.filter(x => x.opts[x.pick] === x.q[2]).length / LQ.items.length); S.quiz[LQ.id] = Math.max(S.quiz[LQ.id] ?? 0, sc); if (sc >= PASS_LESSON && !S.done[LQ.id]) { S.done[LQ.id] = today(); addXP(50); toast("Lesson passed · +50 XP"); } else { touchDay(); save(); } $("#lq").innerHTML = renderLQ(); },
  lqretry() { LQ.items.forEach(x => { x.pick = null; x.opts = shuffle(x.opts); }); LQ.checked = false; $("#lq").innerHTML = renderLQ(); },
  plan() { const date = $("#pldate").value; if (!date || date < today()) { toast("Pick an exam date in the future"); return; } S.plan = { cred: $("#plcred").value, date, ses: +$("#plses").value }; save(); rerender(); },
  planreset() { S.plan = null; save(); rerender(); },
  labtab(el) { LAB.tab = el.dataset.arg; route(); },
  flight(el) { const [n, mix, pool, mins, ...fl] = el.dataset.arg.split(":"); LAB.flight = newFlight({ n: +n, mix, pool, mins: +mins, region: fl.includes("region"), noise: fl.includes("noise") }); route(); if (LAB.flight.endAt) labTimer(); },
  fans(el) { const [k, v] = el.dataset.arg.split("|"); const F = onExam() && EX.flight ? EX.flight : LAB.flight; F.wines[F.idx].ans[k] = v; rerender(); },
  fgo(el) { const F = onExam() && EX.flight ? EX.flight : LAB.flight; F.idx = +el.dataset.arg; rerender(); },
  fscore() { const F = onExam() && EX.flight ? EX.flight : LAB.flight; scoreWine(F.wines[F.idx]); rerender(); },
  fend() { LAB.flight = null; route(); },
  gmode(el) { LAB.grid.mode = el.dataset.arg; LAB.grid.result = null; rerender(); },
  gcolor(el) { LAB.grid.c = el.dataset.arg; LAB.grid.f = Object.fromEntries(Object.entries(LAB.grid.f).filter(([k]) => ["label", "notes"].includes(k))); LAB.grid.reveal = ""; LAB.grid.result = null; rerender(); },
  greset() { LAB.grid = null; route(); },
  gset(el) { const [k, v, m] = el.dataset.arg.split("|"); const f = LAB.grid.f; if (m === "1") { f[k] = f[k] || []; f[k] = f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]; } else f[k] = f[k] === v ? undefined : v; rerender(); },
  gcompare() { const G = LAB.grid; if (!G.reveal) { toast("Choose which wine it was first"); return; } G.result = G.reveal === "other" ? null : compareGrid(G); S.journal.push({ date: today(), mode: G.mode, wine: G.reveal === "other" ? null : G.reveal, label: G.f.label || "", notes: G.f.notes || "", pct: G.result ? G.result.pct : null, rows: G.result ? G.result.rows.map(r => [r[0], null, null, r[3]]) : [] }); addXP(30); toast("Saved to your journal"); rerender(); },
  drill(el) { LAB.drill = newDrill(+el.dataset.arg, "all"); route(); },
  dans(el) { const [k, v] = el.dataset.arg.split("|"); const D = onExam() && EX.drill ? EX.drill : LAB.drill; D.items[D.idx].a[k] = v; rerender(); },
  dchip(el) { const D = onExam() && EX.drill ? EX.drill : LAB.drill, a = D.items[D.idx].a, v = el.dataset.arg; a.aromas = a.aromas.includes(v) ? a.aromas.filter(x => x !== v) : a.aromas.length < 4 ? [...a.aromas, v] : a.aromas; rerender(); },
  dscore() { const D = onExam() && EX.drill ? EX.drill : LAB.drill; scoreDrill(D.items[D.idx]); rerender(); },
  dgo(el) { const D = onExam() && EX.drill ? EX.drill : LAB.drill; D.idx = +el.dataset.arg; rerender(); },
  reff(el) { LAB.ref = el.dataset.arg; rerender(); },
  // tasting night
  ntype(el) { NT.type = el.dataset.arg; if (NT.type === "cert") NT.cert = null; rerender(); },
  nreroll() { NT.cert = null; rerender(); },
  ncust(el) { const id = el.dataset.arg; NT.custom = NT.custom.includes(id) ? NT.custom.filter(x => x !== id) : NT.custom.length < 8 ? [...NT.custom, id] : NT.custom; rerender(); },
  nightpair(el) { NT.type = "pair"; NT.pair = +el.dataset.arg; go("night"); },
  nsend() { const L0 = smsLink(); if (!L0) return; if (!NT.phone) toast("No number entered: pick the contact in Messages"); saveNight(L0.order); location.href = L0.href; setTimeout(rerender, 800); },
  async nshare() { const L0 = smsLink(); if (!L0) return; saveNight(L0.order); try { if (navigator.share) await navigator.share({ title: "Blind tasting night", text: L0.msg }); else { await navigator.clipboard.writeText(L0.msg); toast("Copied: paste it into any chat"); } } catch (e) {} rerender(); },
  async ncopy() { const L0 = smsLink(); if (!L0) return; saveNight(L0.order); try { await navigator.clipboard.writeText(L0.msg); toast("Message copied"); } catch (e) { toast("Copy failed: select the text and copy it"); } rerender(); },
  nreveal(el) { const nt = S.nights.find(x => x.id === +el.dataset.arg); if (!nt) return; nt.revealed = true; const score = nt.order.filter((id, i) => nt.calls[i] === WBY[id].grape).length; nt.order.forEach((id, i) => { const r = S.vb[WBY[id].grape] || { seen: 0, ok: 0 }; r.seen++; if (nt.calls[i] === WBY[id].grape) r.ok++; S.vb[WBY[id].grape] = r; }); addXP(40 + score * 20); rerender(); },
  ndel(el) { S.nights = S.nights.filter(x => x.id !== +el.dataset.arg); save(); rerender(); },
  unblur(el) { el.classList.add("open"); },
  // floor
  fltab(el) { FL.tab = el.dataset.arg; route(); },
  seqnew(el) { FL.seq = newSeq(el.dataset.arg); rerender(); },
  seqtap(el) { const Q = seqTarget(el); Q.order.push(+el.dataset.arg); rerender(); },
  sequndo(el) { const Q = seqTarget(el); Q.order.splice(+el.dataset.arg); rerender(); },
  seqcheck() { FL.seq.done = true; addXP(15); rerender(); },
  tpick(el) { const [q, o] = el.dataset.arg.split(":").map(Number); const T = onExam() && EX.prac ? EX.prac.temps : FL.temp.items; T[q].pick = o; rerender(); },
  tcheck() { FL.temp.checked = true; addXP(10); rerender(); },
  tnew() { FL.temp = null; rerender(); },
  mcheck() { FL.math.forEach(m => { m.ok = mathOK(m, m.v); m.checked = true; }); addXP(15); rerender(); },
  mnew() { FL.math = null; rerender(); },
  lflag(el) { const W = onExam() && EX.prac ? EX.prac.list : FL.list, i = +el.dataset.arg; W.flags = W.flags.includes(i) ? W.flags.filter(x => x !== i) : [...W.flags, i]; rerender(); },
  lcheck() { FL.list.checked = true; addXP(15); rerender(); },
  lnew() { FL.list = newList(); rerender(); },
  // drills
  drtab(el) { DR.tab = el.dataset.arg; route(); },
  lbpick(el) { const [q, o] = el.dataset.arg.split(":").map(Number); DR.lab.items[q].pick = o; rerender(); },
  lbcheck() { DR.lab.checked = true; S.drills.labels++; addXP(10); rerender(); },
  lbnew() { let n; do { n = newLabel(); } while (LABELS.length > 1 && n.L0 === DR.lab.L0); DR.lab = n; rerender(); },
  mtnew(el) { DR.match = newMatch(el.dataset.arg); rerender(); },
  mtl(el) { const M = DR.match, l = el.dataset.arg; if (M.pairs[l]) { delete M.pairs[l]; M.sel = null; } else M.sel = M.sel === l ? null : l; rerender(); },
  mtr(el) { const M = DR.match; if (!M.sel) return; M.pairs[M.sel] = el.dataset.arg; M.sel = null; rerender(); },
  mtcheck() { DR.match.checked = true; S.drills.match++; addXP(10); rerender(); },
  // cards
  fcflip() { if (!FC.flip) { FC.flip = true; rerender(); } },
  fcans(el) { const id = FC.q[FC.i], c = S.cards[id] || { b: 0 }; c.b = el.dataset.arg === "1" ? Math.min(5, c.b + 1) : 1; c.due = Date.now() + INTERVALS[c.b] * 864e5; S.cards[id] = c; FC.i++; FC.flip = false; addXP(2); rerender(); },
  fcall() { FC = { q: shuffle(deckIds()).slice(0, 20), i: 0, flip: false }; rerender(); },
  // exams
  exstart(el) { if (EX && !EX.done) { toast("A paper is already running. Finish or abandon it first."); go("exam"); return; } const [cid] = el.dataset.arg.split(":"); if (el.dataset.arg === "review:misses" && !missedQS().length) { toast("No missed questions on record yet"); return; } if (CREDS[cid] && !unlocked(CREDS[cid])) { toast("Locked: earn the previous seal first"); return; } startExam(el.dataset.arg); window.scrollTo(0, 0); },
  unitquiz() { if (EX && !EX.done) { toast("A paper is already running. Finish or abandon it first."); go("exam"); return; } startExam("unit:" + $('[data-in="unitq"]').value); },
  expick(el) { EX.items[EX.idx].pick = +el.dataset.arg; EX.confirm = false; rerender(); },
  exnav(el) { const i = +el.dataset.arg; if (i >= 0 && i < EX.items.length) { EX.idx = i; rerender(); } },
  exflag() { const it = EX.items[EX.idx]; it.flag = !it.flag; rerender(); },
  exfinish() { const open = EX.cp.type === "mcq" ? EX.items.filter(x => x.pick === null).length : 0; if (open && !EX.confirm) { EX.confirm = true; rerender(); return; } finishExam(false); window.scrollTo(0, 0); },
  exkeep() { EX.confirm = false; const i = EX.items.findIndex(x => x.pick === null); if (i >= 0) EX.idx = i; rerender(); },
  exabandon() { stopTimer(); EX = null; toast("Paper abandoned. Nothing was recorded."); rerender(); },
  lsclear() { const i = $("[data-lsearch]"); if (i) { i.value = ""; $("#lsr").innerHTML = ""; i.focus(); } },
  reset() { if (!ACT.reset.armed) { ACT.reset.armed = true; toast("Tap again within 4 seconds to erase all progress"); setTimeout(() => ACT.reset.armed = false, 4000); return; } ACT.reset.armed = false; S = FRESH(); save(); toast("Progress erased"); go("progress"); },
  ppick(el) { const [q, o] = el.dataset.arg.split(":").map(Number); EX.prac.pair[q].pick = o; rerender(); },
  samark() { let got = 0, max = 0; EX.sa.forEach(x => x.marks.forEach(p => p.forEach(m => { max++; if (m) got++; }))); record(Math.round(100 * got / max)); route(); window.scrollTo(0, 0); },
  erub(el) { const [i, n] = el.dataset.arg.split(":").map(Number); EX.essay.scores[i] = n; rerender(); },
  esmark() { record(Math.round(100 * EX.essay.scores.reduce((a, b) => a + b, 0) / (RUBRIC.length * 4))); route(); window.scrollTo(0, 0); },
  // settings
  theme() { const cur = document.documentElement.dataset.theme === "dark" ? "dark" : "light"; const nx = cur === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = nx; try { localStorage.setItem("tv-theme", nx); } catch (e) {} const mc = document.querySelector('meta[name="theme-color"]'); if (mc) mc.content = nx === "dark" ? "#12151D" : "#F7F6F2"; const y = window.scrollY; rail(); window.scrollTo(0, y); },
  backup() { const blob = new Blob([JSON.stringify(S, null, 1)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `vitis-mundi-academy-progress-${today()}.json`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); toast("Progress file downloaded"); },
  restore() { $("#restorefile").click(); }
};

document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el || el.disabled || el.getAttribute("aria-disabled") === "true") { if (el && el.tagName === "A") e.preventDefault(); return; }
  const f = ACT[el.dataset.act]; if (f) { e.preventDefault(); f(el); }
});
document.addEventListener("input", e => {
  const t = e.target;
  if (t.dataset.gin && LAB.grid) LAB.grid.f[t.dataset.gin] = t.value;
  if (t.dataset.min !== undefined) { const M = onExam() && EX.prac ? EX.prac.math : FL.math; M[+t.dataset.min].v = t.value; }
  if (t.dataset.sa) { const [q, p] = t.dataset.sa.split(":").map(Number); EX.sa[q].text[p] = t.value; }
  if (t.dataset.essay) { EX.essay.text = t.value; const w = $("#wc"); if (w) w.textContent = t.value.trim().split(/\s+/).filter(Boolean).length + " words"; }
  if (t.dataset.gloss) $("#gloss").innerHTML = glossTable(t.value);
  if (t.dataset.lsearch) $("#lsr").innerHTML = lessonSearch(t.value);
  if (t.dataset.appq) $("#appq").innerHTML = appSearch(t.dataset.appq, t.value);
  if (t.dataset.nin) { NT[t.dataset.nin] = t.value; const box = $("#nmsg"), ids = nightWines(); if (box && ids.length >= 2 && NT.built) box.textContent = buildMessage(ids, hostURL(NT.built.order)); }
});
document.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.in === "country" || t.dataset.in === "region") { const F = onExam() && EX.flight ? EX.flight : LAB.flight; F.wines[F.idx].ans[t.dataset.in] = t.value; }
  if (t.dataset.in === "greveal") LAB.grid.reveal = t.value;
  if (t.dataset.in === "npair") { NT.pair = +t.value; rerender(); }
  if (t.dataset.in === "nhide") { NT.hide = t.checked; rerender(); }
  if (t.dataset.call) { const [id, i] = t.dataset.call.split(":").map(Number); const nt = S.nights.find(x => x.id === id); if (nt) { nt.calls[i] = t.value; save(); } }
  if (t.dataset.mark) { const [q, p, m] = t.dataset.mark.split(":").map(Number); EX.sa[q].marks[p][m] = t.checked; }
  if (t.id === "restorefile" && t.files[0]) { const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d || typeof d !== "object" || !("done" in d)) throw 0; S = Object.assign(FRESH(), d); save(); toast("Progress restored"); route(); } catch (err) { toast("That file isn't a Vitis Mundi Academy progress file"); } }; r.readAsText(t.files[0]); t.value = ""; }
});

// Keyboard for multiple-choice papers: 1-4 or A-D to answer, arrows to move, F to flag.
document.addEventListener("keydown", e => {
  if (!onExam() || EX.done || EX.cp.type !== "mcq" || e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const k = e.key.toLowerCase(), n = "1234".indexOf(k) >= 0 ? +k - 1 : "abcd".indexOf(k);
  if (k.length === 1 && n >= 0 && n < EX.items[EX.idx].opts.length) { EX.items[EX.idx].pick = n; EX.confirm = false; rerender(); }
  else if (k === "arrowright" && EX.idx < EX.items.length - 1) { EX.idx++; rerender(); }
  else if (k === "arrowleft" && EX.idx > 0) { EX.idx--; rerender(); }
  else if (k === "f") { EX.items[EX.idx].flag = !EX.items[EX.idx].flag; rerender(); }
});

function rail() {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  $("#rail").innerHTML = `<a class="brand" href="#progress">${MARK}<span><b>Vitis Mundi<br>Academy</b><i>a school for sommeliers</i></span></a>
  <input type="file" id="restorefile" accept="application/json" hidden><nav class="nav" aria-label="Academy sections">${NAV.map(([k, n], i) => `<a href="#${k}" data-v="${k}"><span class="k">${String(i + 1).padStart(2, "0")}</span>${n}</a>`).join("")}<a class="atlas" href="https://vitismundi.app/" title="The Vitis Mundi atlas: every wine region on a 3D globe"><span class="k">&#8599;</span>The Atlas</a></nav>
  <div class="railfoot"><button data-act="theme">${theme === "dark" ? "Switch to paper" : "Switch to night study"}</button><div class="row" style="gap:6px"><button data-act="backup">Back up progress</button><button data-act="restore">Restore</button><button data-act="reset" title="Erase all progress in this browser">Erase</button></div>
  <div>Progress lives in this browser. Back it up to move devices.</div><div>Floor track models the Court of Master Sommeliers; Analyst track models WSET and the MW. Independent and unaffiliated.</div></div>`;
  route();
}
try { const th = localStorage.getItem("tv-theme"); if (th) { document.documentElement.dataset.theme = th; const mc = document.querySelector('meta[name="theme-color"]'); if (mc && th === "dark") mc.content = "#12151D"; } } catch (e) {}
load(); rail();
