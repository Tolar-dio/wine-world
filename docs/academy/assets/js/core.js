// ===== Core: utilities, curriculum order, tracks, state =====
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
// Local calendar date, not UTC: a study day should roll over at the student's midnight.
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => iso(new Date());
const PASS_LESSON = 80;

// Teaching order: the sequence a student walks through
const ORDER = ["o1","o2","o3","o4","h1","f1","f2","f11","f3","f4","f5","f6","f13","v1","f7","f8","f9","sp1","f10","fo2","f12","f14","v2","v3","g1","g2","g3","g4","h2",
  "r1","r1b","r1c","r2","r2b","r2c","r3","r3b","r4","r4b","r4c","r4d","r5","r5b","r5c","r5d","r6","r6b","r7","r7b","r7c","r7d","r7e","r8","r8b","r8c","r9","fo1","r10","r10b","r11","r11b","r12","r12b","r12c","r12d","r12e",
  "r13","r13b","r14","r14b","r15","r15b","r15c","r16","r16b","r17","r17b","r18","h3","h4","v4","s3","s1","s2","s4","s9","s6","s5","s7","s8","biz1","biz2","b1","b2","b3","b9","b4","b5","b6","b7","b8","a1","a2","c1","c3","c4","c2"];
L.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
// Honest time: read at about 180 words a minute, then roughly 40 seconds a question.
L.forEach(l => { const words = (l.body + (l.floor || "") + (l.analyst || "")).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length; l.words = words; l.mins = Math.max(4, Math.round(words / 180 + l.quiz.length * .65)); });
const LBY = Object.fromEntries(L.map(l => [l.id, l]));
const UBY = Object.fromEntries(UNITS.map(u => [u.id, u]));
const WBY = Object.fromEntries(WINES.map(w => [w.id, w]));

const QS = [];
L.forEach(l => (l.quiz || []).forEach((q, i) => QS.push({ id: l.id + "-" + i, lesson: l.id, unit: l.unit, d: q[0], q: q[1], a: q[2], dist: q[3], x: q[4] })));
L.forEach(l => (l.bank || []).forEach((q, i) => QS.push({ id: l.id + "-b" + i, lesson: l.id, unit: l.unit, d: q[0], q: q[1], a: q[2], dist: q[3], x: q[4] })));
const TERMS = [];
// A term taught twice keeps its first definition in the glossary and the flashcard deck.
{ const seen = new Set(); L.forEach(l => (l.terms || []).forEach((t, i) => { const k = t[0].toLowerCase(); if (seen.has(k)) return; seen.add(k); TERMS.push({ id: l.id + "~" + i, lesson: l.id, t: t[0], d: t[1] }); })); }

// ---------- tracks ----------
const REGIONS = ["r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15","r16","r17"];
const BASE = ["o1","o2","o3","o4","h1","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","g1","g2","g3","h2",...REGIONS,"s3"];
const TRACKS = {
  floor: { name: "Floor", model: "The Court of Master Sommeliers", tag: "Deductive tasting against the clock, tableside service, salesmanship and wine-list math", creds: [
    { id: "cms1", name: "Introductory Sommelier", pin: "I", lessons: [...BASE, "b1", "b2"],
      comps: [{ id: "theory", name: "Theory exam", type: "mcq", n: 70, mins: 45, pass: 60, mix: { 1: .7, 2: .3 }, note: "70 multiple-choice questions, 45 minutes, closed book. Mirrors the CMS Americas Introductory exam." }] },
    { id: "cms2", name: "Certified Sommelier", pin: "C", lessons: ["f11", "f13", "f14", "g4", "h3", "r1b", "r2b", "s1", "s2", "s4", "s9", "s6", "s5", "b3", "b9"],
      comps: [
        { id: "theory", name: "Theory", type: "mcq", n: 45, mins: 38, pass: 60, mix: { 1: .3, 2: .55, 3: .15 }, note: "45 questions in 38 minutes, as in the CMS Americas Certified theory section." },
        { id: "tasting", name: "Blind tasting", type: "blind", n: 4, mix: "2w2r", mins: 45, pass: 60, pool: "cert", note: "4 wines (2 white, 2 red) in 45 minutes from the Certified examinable list." },
        { id: "service", name: "Service practical", type: "practical", mins: 16, pass: 60, level: 2, note: "About 16 minutes: a service sequence, temperatures, pairing, a wine list and business math." }] },
    { id: "cms3", name: "Advanced Sommelier", pin: "A", lessons: ["r1c", "r2c", "r4d", "r5d", "r7e", "r8c", "r12d", "r12e", "r14b", "b7", "b8", "s8", "v1", "v2", "sp1", "fo1", "fo2", "b6", "r4b", "r4c", "r5c", "r6b", "r7c", "r7d", "r10b", "r11b", "r12c", "r13b", "r15b", "r15c", "r16b", "r17b", "r3b", "r5b", "r7b", "r8b", "r12b", "r18", "f12", "h4", "s7", "b4", "b5", "c1", "c4"],
      comps: [
        { id: "theory", name: "Theory", type: "mcq", n: 115, mins: 60, pass: 60, mix: { 1: .1, 2: .6, 3: .3 }, note: "About 115 questions in 60 minutes, as on the Pearson VUE Advanced theory exam: recall, ordering, producers, vintages. No essays, no business math." },
        { id: "tasting", name: "Verbal six", type: "blind", n: 6, mix: "3w3r", mins: 25, pass: 60, pool: "all", region: true, note: "6 wines in 25 minutes from the wider Advanced pool; region is scored." },
        { id: "service", name: "Service & business practical", type: "practical", mins: 30, pass: 60, level: 3, note: "Two service sequences, more math, wine list, pairing and temperatures." }] },
    { id: "cms4", name: "Master Sommelier", pin: "MS", lessons: ["biz2", "v3", "v4", "biz1", "c3", "a2", "c2"],
      comps: [
        { id: "theory", name: "Theory", type: "mcq", n: 75, mins: 60, pass: 75, mix: { 2: .45, 3: .55 }, note: "The real Master theory is oral. Here: 75 hard questions in an hour at the 75% Master standard; answer each aloud before you click." },
        { id: "tasting", name: "Verbal six", type: "blind", n: 6, mix: "3w3r", mins: 25, pass: 75, pool: "all", region: true, noise: true, note: "3 white, 3 red in 25 minutes with realistic bottle variation; 75% to pass." },
        { id: "service", name: "Service practical", type: "practical", mins: 30, pass: 75, level: 3, note: "The full practical at 75%." }] }
  ]},
  analyst: { name: "Analyst", model: "WSET, then the Master of Wine", tag: "The Systematic Approach to Tasting, explaining why, and written answers that earn marks", creds: [
    { id: "w2", name: "Level 2 Award", pin: "L2", lessons: [...BASE, "s4"],
      comps: [{ id: "theory", name: "Theory exam", type: "mcq", n: 50, mins: 60, pass: 55, mix: { 1: .8, 2: .2 }, note: "50 multiple-choice questions in 60 minutes. 55% pass, 70% merit, 85% distinction." }] },
    { id: "w3", name: "Level 3 Award", pin: "L3", lessons: ["f11", "f13", "f14", "g4", "h3", "r1b", "r2b", "f12", "s1", "s2", "s9", "a1", "a2"],
      comps: [
        { id: "theory", name: "Multiple choice", type: "mcq", n: 50, mins: 45, pass: 55, mix: { 1: .35, 2: .6, 3: .05 }, note: "50 multiple-choice questions, part of the theory paper." },
        { id: "sa", name: "Short written answers", type: "sa", n: 4, mins: 75, pass: 55, note: "Four 25-mark questions, then mark yourself against the marking points." },
        { id: "sat", name: "SAT tasting", type: "sat", n: 2, mins: 30, pass: 55, note: "Two wines: predict the SAT structure and aromas. Grid real wine in the Lab too." }] },
    { id: "w4", name: "Level 4 Diploma", pin: "D", lessons: ["r1c", "r2c", "r4d", "r5d", "r7e", "r8c", "r12d", "r12e", "r14b", "biz2", "v1", "v2", "v3", "sp1", "fo1", "fo2", "biz1", "r4b", "r4c", "r5c", "r6b", "r7c", "r7d", "r10b", "r11b", "r12c", "r13b", "r15b", "r15c", "r16b", "r17b", "r3b", "r5b", "r7b", "r8b", "r12b", "r18", "h4", "s6", "s5", "s7", "b1", "c4", "c2"],
      comps: [
        { id: "theory", name: "Theory", type: "mcq", n: 60, mins: 60, pass: 55, mix: { 1: .1, 2: .55, 3: .35 }, note: "60 questions at Diploma difficulty. The real D3 papers are all open-response, so pair this with the essay below." },
        { id: "essay", name: "Essay", type: "essay", mins: 45, pass: 55, note: "One essay in 45 minutes, self-assessed on a five-criterion rubric." },
        { id: "tasting", name: "12-wine paper", type: "blind", n: 12, mix: "6w6r", mins: 90, pass: 55, pool: "all", region: true, note: "12 wines in 90 minutes, as in a D3 tasting paper." }] },
    { id: "mw", name: "Master of Wine (capstone)", pin: "MW", lessons: ["c1", "v4", "b6"],
      comps: [
        { id: "tasting", name: "12-wine practical", type: "blind", n: 12, mix: "6w6r", mins: 135, pass: 65, pool: "all", region: true, noise: true, note: "12 wines in 2h15m with realistic variation. The real MW standard is set by examiners; the academy uses 65%." },
        { id: "essay", name: "Theory essay", type: "essay", mins: 60, pass: 65, note: "One essay in an hour, MW-style." }] }
  ]}
};
const CREDS = {}; Object.entries(TRACKS).forEach(([tk, t]) => t.creds.forEach((c, i) => { c.track = tk; c.idx = i; CREDS[c.id] = c; }));
const cumLessons = c => TRACKS[c.track].creds.slice(0, c.idx + 1).flatMap(x => x.lessons).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
const prereq = c => c.idx > 0 ? TRACKS[c.track].creds[c.idx - 1] : null;
const unlocked = c => { const p = prereq(c); return !p || !!S.pins[p.id]; };
const ELECTIVES = [
  { id: "el-fr", name: "French Wine Scholar-style", units: ["R1"], pass: 75 },
  { id: "el-it", name: "Italian Wine Scholar-style", units: ["R2"], pass: 75 },
  { id: "el-ib", name: "Iberia Specialist", units: ["R3"], pass: 75 },
  { id: "el-nw", name: "New World Specialist", units: ["R5", "R4"], pass: 75 },
  { id: "el-csw", name: "CSW-style (100 questions)", units: null, pass: 75, n: 100, mins: 60 },
  { id: "el-css", name: "Spirits, Beer & Sake Specialist", units: ["S2"], pass: 75 }
];

// ---------- state ----------
const KEY = "vitis-mundi-academy-v1";
const FRESH = () => ({ v: 2, start: today(), track: "floor", done: {}, quiz: {}, xp: 0, days: {}, cards: {}, journal: [], comps: {}, pins: {}, hist: [], vb: {}, nights: [], plan: null, drills: { labels: 0, match: 0 }, qs: {} });
let S = FRESH();
function load() { try { const v = localStorage.getItem(KEY) || localStorage.getItem("tastevin-academy-v2") || localStorage.getItem("tastevin"); if (v) S = Object.assign(FRESH(), JSON.parse(v)); } catch (e) {} }
function save() { try { if (S.journal.length > 300) S.journal = S.journal.slice(-300); if (S.hist.length > 200) S.hist = S.hist.slice(-200); localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function touchDay() { S.days[today()] = 1; }
function streak() { let n = 0; const d = new Date(); if (!S.days[iso(d)]) d.setDate(d.getDate() - 1); for (;;) { if (S.days[iso(d)]) { n++; d.setDate(d.getDate() - 1); } else break; } return n; }
// Per-question record: [times seen, times wrong, 1 if the last answer was wrong]. Feeds "Review your misses".
function markQ(id, ok) { const r = S.qs[id] || [0, 0, 0]; r[0]++; if (!ok) r[1]++; r[2] = ok ? 0 : 1; S.qs[id] = r; }
const missedQS = () => QS.filter(q => S.qs[q.id] && S.qs[q.id][2]);
function addXP(n) { S.xp += n; touchDay(); save(); }
function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

function credStatus(c) {
  const ls = cumLessons(c), done = ls.filter(id => S.done[id]).length;
  const comps = c.comps.map(cp => ({ cp, best: (S.comps[c.id + ":" + cp.id] || {}).best ?? null }));
  const passed = comps.filter(x => x.best !== null && x.best >= x.cp.pass).length;
  return { ls, done, total: ls.length, comps, passed, earned: !!S.pins[c.id], open: unlocked(c) };
}
function checkPin(c) { const st = credStatus(c); if (!S.pins[c.id] && st.passed === c.comps.length) { S.pins[c.id] = today(); addXP(500); toast("Seal earned: " + c.name); } }
function nextLesson(track) { for (const c of TRACKS[track].creds) { const id = cumLessons(c).find(x => !S.done[x]); if (id) return id; } return null; }
function currentCred(track) { return TRACKS[track].creds.find(c => !S.pins[c.id]) || TRACKS[track].creds[TRACKS[track].creds.length - 1]; }

// ---------- small visuals ----------
const MARK = `<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--gold)" stroke-width="1"/><ellipse cx="20" cy="20" rx="8" ry="18.5" fill="none" stroke="var(--gold)" stroke-width=".8" opacity=".7"/><path d="M1.5 20h37" stroke="var(--gold)" stroke-width=".8" opacity=".7"/><g fill="var(--garnet)" stroke="var(--gold)" stroke-width=".9"><circle cx="16.5" cy="15" r="3"/><circle cx="23.5" cy="15" r="3"/><circle cx="20" cy="20.5" r="3"/><circle cx="13.5" cy="20.5" r="2.6"/><circle cx="26.5" cy="20.5" r="2.6"/><circle cx="17" cy="26" r="2.6"/><circle cx="23" cy="26" r="2.6"/><circle cx="20" cy="31" r="2.3"/></g><path d="M20 12c0-3 1.5-5 4-6" fill="none" stroke="var(--gold)" stroke-width="1.2"/></svg>`;
function glass(color) { const fill = color === "w" ? "#E3CB78" : "#7E1B33"; return `<svg class="glass" viewBox="0 0 40 40" aria-hidden="true"><path d="M11 5h18c0 9-2 16-9 17-7-1-9-8-9-17z" fill="none" stroke="var(--muted)" stroke-width="1.2"/><path d="M11.6 11h16.8c-.6 6-3 10-8.4 10.6C14.6 21 12.2 17 11.6 11z" fill="${fill}"/><path d="M20 22v11M14 35h12" stroke="var(--muted)" stroke-width="1.2"/></svg>`; }
function ring(pct, label) { const r = 46, c = 2 * Math.PI * r; return `<svg class="ring" width="118" height="118" viewBox="0 0 110 110" role="img" aria-label="${pct}%"><circle cx="55" cy="55" r="${r}" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="55" cy="55" r="${r}" fill="none" stroke="var(--gold)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c * Math.min(100, pct) / 100} ${c}" transform="rotate(-90 55 55)"/><text x="55" y="56" text-anchor="middle" style="font-family:var(--f-display)" font-weight="500" font-size="29" fill="var(--ink)">${pct}%</text><text x="55" y="74" text-anchor="middle" style="font-family:var(--f-body)" font-size="8" font-weight="600" fill="var(--muted)" letter-spacing="1.6">${label}</text></svg>`; }
const dots = (n, max = 5) => `<span class="scale-dots" aria-label="${n} of ${max}">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? "f" : ""}"></i>`).join("")}</span>`;
