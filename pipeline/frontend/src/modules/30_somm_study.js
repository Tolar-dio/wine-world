/* Vitis Mundi v2, sommelier tools: Study ("Study" in the nav, #study, #study-deck-<id>, #study-due, #study-order,
   #study-tasting, #study-blind).
   Decks from data/study/decks.json, plus rules cards generated from data/regs/{iso2}.json. Three modes: Find it on the
   map (tap where it is; the map hides its names), Name it (the map lights it; pick from four), Flashcards. A
   timeline-ordering game. SM-2 spaced repetition with due counts and a daily streak; progress lives in Supabase
   (study_cards, study_sessions) when signed in, else on this device. The deductive tasting trainer is in
   30_somm_tasting.js and renders inside this view. */
(() => {
  if (!window.VM || !VM.somm) return;
  const SM = VM.somm;
  const { esc, fold, arr, num, clamp, inl } = VM.util;
  const MAPK = new Set(['appellation', 'site', 'region']);
  const SESSION_N = 10;
  /* view and quiz state first: VM.on('auth') below is sticky and may call back during this script */
  let EL = null, GEN = 0;
  const VIEW = { kind: 'home', deck: null };
  const Q = { d: null, mode: '', list: [], i: 0, res: [], start: 0, again: new Set(), practice: false, release: null, lit: false, busy: false };

  /* ---------- decks ---------- */
  let DECKS = null, RULES = false;
  const DECKBY = new Map();
  /* the country list arrives after the map style; a deep link can get here first */
  const countriesReady = () => Object.keys(VM.data.countries || {}).length ? Promise.resolve(true)
    : new Promise(res => { const t = setTimeout(() => res(false), 10000); VM.on('data:countries', () => { clearTimeout(t); res(true); }); });
  async function loadDecks() {
    if (!DECKS) {
      const j = await VM.data.study('decks');
      DECKS = arr(j?.decks).map(d => ({ ...d, cards: arr(d.cards), mode: arr(d.mode) }));
      for (const d of DECKS) DECKBY.set(d.id, d);
    }
    if (!RULES && await countriesReady()) {
      RULES = true;
      for (const d of await rulesDecks()) if (!DECKBY.has(d.id)) { DECKS.push(d); DECKBY.set(d.id, d); }
    }
    return DECKS;
  }
  /* rules decks: one per country with a regs file; cards are built when the deck opens */
  const RULEQ = [
    ['ageing', n => `Minimum ageing for ${n}?`],
    ['release', n => `When may ${n} be released?`],
    ['max_yield', n => `Maximum yield for ${n}?`],
    ['min_alcohol', n => `Minimum alcohol for ${n}?`],
    ['varieties', n => `Which grapes may ${n} use?`],
    ['labelling', n => `What does the label of ${n} say, and what may it add?`]
  ];
  async function rulesDecks() {
    await Promise.race([VM.data.loadIndex(), VM.util.sleep(6000)]);
    const out = [];
    for (const iso of Object.keys(VM.data.countries).sort((a, b) => VM.data.countryName(a).localeCompare(VM.data.countryName(b)))) {
      if (!VM.data.has(`data/regs/${iso}.json`)) continue;
      out.push({ id: 'rules-' + iso, iso, title: `The rules of ${VM.data.countryName(iso)}`, group: 'Wine law: the rules', generated: true,
        description: `Flashcards built from the product specifications of ${VM.data.countryName(iso)}: ageing, release dates, yields, alcohol, grapes and labels. The best-known appellations come first.`,
        mode: ['flash'], cards: null });
    }
    return out;
  }
  async function cardsOf(d) {
    if (d.cards) return d.cards;
    const j = await VM.data.json(`data/regs/${d.iso}.json`);
    const idx = VM.data.indexById;
    const ids = Object.keys(j || {}).filter(k => k !== '_national' && j[k] && typeof j[k] === 'object');
    ids.sort((a, b) => (idx.get(b)?.prof || 0) - (idx.get(a)?.prof || 0) || (idx.get(b)?.area || 0) - (idx.get(a)?.area || 0));
    const cards = [];
    for (const id of ids) {
      const r = j[id], name = SM.nameOf(id);
      for (const [k, q] of RULEQ) {
        const v = r[k];
        if (!v || typeof v !== 'string' || v.length < 4) continue;
        /* "100% Chardonnay" is a good card; a list of forty varieties is not */
        if (k === 'varieties' && v.split(',').length > 8) continue;
        cards.push({ id: `rules-${id}-${k}`, target: id, kind: 'appellation', q: q(name), a: v, src: arr(r.src)[0] || null });
      }
    }
    d.cards = cards;
    return cards;
  }
  const deckOf = id => DECKBY.get(id) || null;
  const cardTitle = c => c.q;

  /* ---------- spaced repetition (SM-2) ---------- */
  const SRS = { m: new Map(), cloud: false, loaded: false, user: null };
  const pack = s => [+s.ease.toFixed(2), +s.ivl.toFixed(2), s.reps, s.lapses, s.due, s.last ?? null, s.deck, s.upd];
  const unpack = a => ({ ease: a[0], ivl: a[1], reps: a[2], lapses: a[3], due: a[4], last: a[5], deck: a[6], upd: a[7] || 0 });
  function localLoad() {
    const o = SM.local.get('srs', {});
    SRS.m = new Map(Object.entries(o).map(([k, v]) => [k, unpack(v)]));
  }
  let _lt = 0;
  function localSave() {
    clearTimeout(_lt);
    _lt = setTimeout(() => { const o = {}; for (const [k, v] of SRS.m) o[k] = pack(v); SM.local.set('srs', o); }, 300);
  }
  async function srsLoad() {
    const uid = VM.auth?.user?.id || null;
    if (SRS.loaded && SRS.user === uid) return;
    localLoad();
    SRS.loaded = true; SRS.user = uid; SRS.cloud = false;
    const cl = SM.cloud();
    if (!cl) return;
    try {
      const rows = [];
      for (let from = 0; from < 20000; from += 1000) {
        const { data, error } = await cl.from('study_cards').select('card_id,deck,ease,interval_days,reps,lapses,due_at,last_result,updated_at').range(from, from + 999);
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) break;
      }
      const cloud = new Map(rows.map(r => [r.card_id, { ease: r.ease, ivl: r.interval_days, reps: r.reps, lapses: r.lapses, due: Date.parse(r.due_at), last: r.last_result, deck: r.deck, upd: Date.parse(r.updated_at) || 0 }]));
      /* this device's newer reviews go up; everything else comes down */
      const up = [];
      for (const [k, v] of SRS.m) { const c = cloud.get(k); if (!c || (v.upd || 0) > (c.upd || 0)) { up.push(rowOf(k, v)); cloud.set(k, v); } }
      SRS.m = cloud; SRS.cloud = true;
      localSave();
      for (let i = 0; i < up.length; i += 500) await cl.from('study_cards').upsert(up.slice(i, i + 500), { onConflict: 'user_id,card_id' });
      await syncSessions(cl);
    } catch (e) { console.warn('[study] cloud progress unavailable', e?.message || e); }
  }
  const rowOf = (k, v) => ({ user_id: VM.auth.user.id, card_id: k, deck: v.deck || '', ease: v.ease, interval_days: v.ivl, reps: v.reps, lapses: v.lapses, due_at: new Date(v.due).toISOString(), last_result: v.last ?? null });
  VM.on('auth', () => {
    SRS.loaded = false;
    /* replayed at once when the journal has already signed in: only reload if the Study view is open */
    if (!EL) return;
    srsLoad().then(() => { if (EL && VIEW.kind === 'home') home(); }).catch(e => console.warn('[study] auth reload', e));
  });
  function sm2(st, q) {
    st = st ? { ...st } : { ease: 2.5, ivl: 0, reps: 0, lapses: 0 };
    const now = Date.now();
    if (q < 3) {
      if (st.reps > 0) st.lapses += 1;
      st.reps = 0; st.ivl = 0; st.due = now + 10 * 60e3;
    } else {
      st.reps += 1;
      if (st.reps === 1) st.ivl = q === 5 ? 3 : 1;
      else if (st.reps === 2) st.ivl = q === 3 ? 3 : q === 5 ? 8 : 6;
      else st.ivl = st.ivl * (q === 3 ? 1.2 : st.ease * (q === 5 ? 1.3 : 1));
      st.ivl = Math.min(Math.max(1, st.ivl), 365);
      st.due = now + st.ivl * 864e5;
    }
    st.ease = Math.max(1.3, Math.min(3, st.ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    st.last = q; st.upd = now;
    return st;
  }
  function grade(card, deckId, q) {
    const st = sm2(SRS.m.get(card.id), q);
    st.deck = deckId;
    SRS.m.set(card.id, st);
    localSave();
    markDay();
    const cl = SM.cloud();
    if (cl && SRS.cloud) cl.from('study_cards').upsert(rowOf(card.id, st), { onConflict: 'user_id,card_id' }).then(r => { if (r.error) console.warn('[study] save', r.error.message); });
    return st;
  }
  const endOfToday = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime(); };
  const isDue = st => st && st.due <= endOfToday();
  const ivlText = st => { if (!st) return ''; if (st.ivl === 0) return '10 min'; const d = st.ivl; return d < 1.5 ? '1 day' : d < 30 ? `${Math.round(d)} days` : d < 365 ? `${Math.round(d / 30)} mo` : '1 year'; };
  function deckStats(d) {
    const cards = d.cards || [];
    let due = 0, fresh = 0, seen = 0, mastered = 0;
    for (const c of cards) {
      const st = SRS.m.get(c.id);
      if (!st) { fresh++; continue; }
      seen++;
      if (isDue(st)) due++;
      if (st.ivl >= 21) mastered++;
    }
    return { n: cards.length, due, fresh, seen, mastered };
  }

  /* ---------- streak and sessions ---------- */
  function markDay() {
    const days = SM.local.get('days', []);
    const t = SM.today();
    if (days[days.length - 1] !== t) { days.push(t); SM.local.set('days', days.slice(-400)); }
  }
  async function syncSessions(cl) {
    try {
      const { data } = await cl.from('study_sessions').select('started_at').order('started_at', { ascending: false }).limit(500);
      const days = new Set(SM.local.get('days', []));
      for (const r of arr(data)) days.add(SM.dayOf(Date.parse(r.started_at)));
      SM.local.set('days', [...days].sort().slice(-400));
    } catch (e) { /* keep local days */ }
  }
  function streak() {
    const days = new Set(SM.local.get('days', []));
    let n = 0;
    const d = new Date();
    if (!days.has(SM.today())) d.setDate(d.getDate() - 1);
    for (;;) { const k = SM.dayOf(d.getTime()); if (!days.has(k)) break; n++; d.setDate(d.getDate() - 1); }
    return { n, today: days.has(SM.today()) };
  }
  async function saveSession(s) {
    const list = SM.local.get('sessions', []);
    list.unshift(s);
    SM.local.set('sessions', list.slice(0, 60));
    const cl = SM.cloud();
    if (cl) {
      try { await cl.from('study_sessions').insert({ deck: s.deck, mode: s.mode, started_at: new Date(s.start).toISOString(), finished_at: new Date(s.end).toISOString(), correct: s.correct, total: s.total }); }
      catch (e) { console.warn('[study] session', e); }
    }
  }
  SM.study = { grade: (card, deck, q) => grade(card, deck, q), saveSession, markDay, streak };

  /* ---------- the view ---------- */
  VM.panel.register('study', {
    title: 'Study', crumb: 'Study', snap: 'full',
    async render(el, ctx) {
      leaveMap();
      EL = el;
      const g = ++GEN;
      el.innerHTML = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Study</h2></div><p class="note">Opening the decks…</p>`;
      if (typeof wave2 === 'function') wave2();   /* sites and regions, so every target resolves */
      await Promise.all([loadDecks(), srsLoad(), Promise.race([VM.data.loadIndex(), VM.util.sleep(8000)])]);
      if (g !== GEN) return;
      const a = ctx.arg || '';
      if (a.startsWith('deck-') && deckOf(a.slice(5))) return deckPage(deckOf(a.slice(5)));
      if (a === 'due') return startDue();
      if (a === 'order') return startOrder(deckOf('timeline'));
      if ((a === 'tasting' || a === 'blind') && SM.tasting) { VIEW.kind = a; return SM.tasting.render(el, a); }
      home();
    },
    onClose() { off(); }
  });
  VM.nav.add({ id: 'study', label: 'Study', icon: SM.ICON.study, order: 64, title: 'Map quizzes, flashcards and the tasting trainer' });
  /* leaving the view mid-quiz must give the map back */
  const off = () => { leaveMap(); EL = null; GEN++; };
  VM.on('view', v => { if (v.id !== 'study') off(); });
  VM.on('profile:open', off);
  VM.on('panel:close', off);

  /* ---------- home ---------- */
  function home() {
    VIEW.kind = 'home';
    const el = EL; if (!el) return;
    let due = 0, learned = 0, mastered = 0;
    for (const st of SRS.m.values()) { learned++; if (isDue(st)) due++; if (st.ivl >= 21) mastered++; }
    const sk = streak();
    const groups = new Map();
    for (const d of DECKS) { if (!groups.has(d.group)) groups.set(d.group, []); groups.get(d.group).push(d); }
    const sess = SM.local.get('sessions', []).slice(0, 5);
    el.innerHTML = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Study</h2><p class="tagline">Learn the map the way you will need it: where the places are, what their rules say, and what is in the glass.</p></div>
      ${VM.h.ledger([{ k: 'Due today', v: VM.fmt.num(due) }, { k: 'Streak', v: `${sk.n} ${sk.n === 1 ? 'day' : 'days'}`, s: sk.n && !sk.today ? 'study today to keep it' : sk.today ? 'today done' : '' }, { k: 'Learned', v: VM.fmt.num(learned), s: `${VM.fmt.num(mastered)} mastered` }])}
      <div class="st-quick">
        ${due ? `<button type="button" class="st-qk main" data-go="study-due"><b>Review ${VM.fmt.num(due)} due</b><span>Flashcards from every deck, oldest first</span></button>` : ''}
        <button type="button" class="st-qk" data-go="study-tasting"><b>Deductive tasting</b><span>Describe a wine; see which grapes and places fit</span></button>
        <button type="button" class="st-qk" data-go="study-blind"><b>Blind practice</b><span>Read a tasting note, name the grape and the place</span></button>
        <button type="button" class="st-qk" data-go="study-order"><b>Put it in order</b><span>Five moments from 9,000 years of wine</span></button>
      </div>
      <p class="note st-save">${SRS.cloud ? 'Progress is saved to your account.' : VM.auth?.available ? 'Progress is saved on this device. Sign in (Journal) to keep it in your account.' : 'Progress is saved on this device.'}</p>
      ${[...groups.entries()].map(([g, ds]) => `${VM.h.sec(g)}<ul class="list st-decks">${ds.map(d => deckRow(d)).join('')}</ul>`).join('')}
      ${sess.length ? `${VM.h.sec('Recent sessions')}<ul class="list st-sess">${sess.map(s => `<li><div class="row"><span class="row-name">${esc(deckOf(s.deck)?.title || (s.deck === 'due' ? 'Due reviews' : s.deck === 'tasting' ? 'Blind practice' : s.deck))}<small>${esc(MODE_L[s.mode] || s.mode)} · ${esc(new Date(s.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }))}</small></span><span class="row-meta">${s.correct}/${s.total}</span></div></li>`).join('')}</ul>` : ''}
      <p class="src" style="margin-top:22px">Spaced repetition after SM-2 (Wozniak 1990): every answer sets when a card comes back, from ten minutes to a year.</p>`;
    bindCommon(el);
  }
  const MODE_L = { find: 'Find it on the map', name: 'Name it', flash: 'Flashcards', order: 'Put it in order', blind: 'Blind practice' };
  function deckRow(d) {
    const s = d.cards ? deckStats(d) : null;
    const pct = s && s.n ? s.mastered / s.n : 0;
    const meta = s ? [`${s.n} cards`, s.due ? `${s.due} due` : '', s.seen ? `${s.n - s.fresh} seen` : ''].filter(Boolean).join(' · ') : 'built from the specifications';
    return `<li><a class="row st-deck" href="#study-deck-${esc(d.id)}"><span class="row-name">${esc(d.title)}<small>${esc(meta)}</small>${s && s.seen ? `<i class="st-prog" aria-hidden="true"><i style="width:${(pct * 100).toFixed(1)}%"></i><i class="seen" style="width:${((s.seen - s.mastered) / s.n * 100).toFixed(1)}%"></i></i>` : ''}</span>${s && s.due ? `<span class="vm-badge warn">${s.due}</span>` : ''}</a></li>`;
  }
  function bindCommon(el) {
    el.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => VM.go(b.dataset.go)));
  }

  /* ---------- deck page ---------- */
  async function deckPage(d) {
    VIEW.kind = 'deck'; VIEW.deck = d;
    const el = EL; if (!el) return;
    const g = GEN;
    leaveMap();
    await cardsOf(d);
    if (g !== GEN || EL !== el) return;
    const s = deckStats(d);
    const hasMap = !!VM.map;
    const modes = d.mode.filter(m => (m === 'find' || m === 'name') ? hasMap && eligible(d, m).length >= (m === 'name' ? 4 : 1) : true);
    const MODE_T = {
      find: 'Tap where it is. The map hides its names; a tap inside the line, or close to it when you are zoomed out, counts.',
      name: 'The map lights a place. Pick its name from four neighbours.',
      flash: 'Question, then answer. Say how well you knew it and the card comes back when you are about to forget.',
      order: 'Drag five moments into the order they happened.'
    };
    el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">${esc(d.group)}</span></p>
      <div class="head"><h2 class="title">${esc(d.title)}</h2><p class="tagline">${inl(d.description || '')}</p></div>
      ${VM.h.ledger([{ k: 'Cards', v: VM.fmt.num(s.n) }, { k: 'Due', v: VM.fmt.num(s.due) }, { k: 'New', v: VM.fmt.num(s.fresh) }, { k: 'Mastered', v: VM.fmt.num(s.mastered), s: 'interval 3 weeks +' }])}
      ${!s.n ? '<p class="vm-empty">No cards could be built for this deck yet.</p>' : ''}
      <div class="st-modes">${s.n ? modes.map(m => `<button type="button" class="st-mode" data-mode="${m}"><b>${esc(MODE_L[m])}</b><span>${esc(MODE_T[m])}</span><small class="mono">${m === 'order' ? '3 rounds' : `${Math.min(SESSION_N, eligible(d, m).length)} cards`}</small></button>`).join('') : ''}</div>
      ${!hasMap && d.mode.some(m => m === 'find' || m === 'name') ? '<p class="note">The map modes need the globe, which could not start here. Flashcards still work.</p>' : ''}
      ${s.n ? `<details class="st-all"><summary>All ${s.n} cards</summary><ol class="st-cards">${d.cards.slice(0, 400).map(c => { const st = SRS.m.get(c.id); return `<li><span>${esc(cardTitle(c))}</span><span class="vm-badge${st ? isDue(st) ? ' warn' : st.ivl >= 21 ? ' ok' : '' : ''}">${st ? isDue(st) ? 'due' : st.ivl >= 21 ? 'mastered' : `in ${ivlText(st)}` : 'new'}</span></li>`; }).join('')}</ol>${s.n > 400 ? `<p class="note">and ${s.n - 400} more.</p>` : ''}</details>` : ''}
      ${d.generated ? '<p class="src">Built from data/regs: the product specifications as summarised by the atlas, each with its source in the appellation profile.</p>' : arr(d.src).length ? `${VM.h.sec('Sources')}${VM.h.src(d.src)}` : ''}`;
    el.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => b.dataset.mode === 'order' ? startOrder(d) : startSession(d, b.dataset.mode)));
    el.scrollTop = 0;
  }
  function eligible(d, mode) {
    const cards = d.cards || [];
    if (mode === 'find') return cards.filter(c => c.target && MAPK.has(c.kind) && VM.data.entity(c.target)?.lp);
    if (mode === 'name') return cards.filter(c => c.target && (MAPK.has(c.kind) ? !!VM.data.entity(c.target)?.lp : ['grape', 'soil'].includes(c.kind)));
    return cards;
  }

  /* ---------- sessions ---------- */
  function buildQueue(d, mode) {
    const el = eligible(d, mode);
    const due = el.filter(c => isDue(SRS.m.get(c.id))).sort((a, b) => SRS.m.get(a.id).due - SRS.m.get(b.id).due);
    const fresh = el.filter(c => !SRS.m.has(c.id));
    let list = due.slice(0, SESSION_N);
    if (list.length < SESSION_N) list = list.concat(fresh.slice(0, SESSION_N - list.length));
    let practice = false;
    if (!list.length) { list = SM.shuffle(el.slice()).slice(0, SESSION_N); practice = true; }
    return { list, practice, nDue: Math.min(due.length, SESSION_N) };
  }
  function startSession(d, mode, preset) {
    const b = preset || buildQueue(d, mode);
    Object.assign(Q, { d, mode, list: b.list, i: 0, res: [], start: Date.now(), again: new Set(), practice: b.practice, nDue: b.nDue });
    VIEW.kind = 'play';
    if (mode === 'find' || mode === 'name') {
      /* a quiz starts from a clean map: no filter or grape highlight left over */
      VM.clearHighlight(); SM.filterDots?.(false);
      SM.map.labels(false);
      Q.release = SM.map.capture(mode === 'find' ? onTap : () => { if (!Q.answered) VM.toast('Pick one of the four names below.'); });
    }
    step();
  }
  async function startDue() {
    VIEW.kind = 'play';
    const all = [];
    for (const d of DECKS) { if (!d.cards) { const has = [...SRS.m.values()].some(v => v.deck === d.id); if (!has) continue; await cardsOf(d); } for (const c of d.cards) { const st = SRS.m.get(c.id); if (isDue(st)) all.push([st.due, c, d]); } }
    all.sort((a, b) => a[0] - b[0]);
    if (!all.length) { home(); VM.toast('Nothing is due. Pick a deck to learn something new.'); return; }
    const list = all.slice(0, 20).map(x => ({ ...x[1], _deck: x[2].id }));
    startSession({ id: 'due', title: 'Due reviews', group: 'Review', cards: list, mode: ['flash'] }, 'flash', { list, practice: false, nDue: list.length });
  }
  function leaveMap() {
    if (Q.release) { Q.release(); Q.release = null; }
    SM.map.labels(true);
    if (Q.lit) { VM.clearHighlight(); Q.lit = false; }
    SM.map.clearRings('st:');
  }
  const cur = () => Q.list[Q.i];
  function deckIdOf(c) { return c._deck || Q.d.id; }
  /* the session bar carries the current action too, so it stays in view when the phone sheet is at peek */
  function topHTML(action = '') {
    return `<div class="st-top"><span class="st-pos mono">${Math.min(Q.i + 1, Q.list.length)} / ${Q.list.length}</span><span class="st-ml">${esc(MODE_L[Q.mode])}${Q.practice ? ' · practice' : ''}</span><span class="st-tact">${action}</span><button type="button" class="btn small ghost" data-end="1">End</button></div>
      <div class="st-bar" aria-hidden="true"><i style="width:${(Q.i / Math.max(1, Q.list.length) * 100).toFixed(1)}%"></i></div>`;
  }
  function bindTop(el) { el.querySelector('[data-end]')?.addEventListener('click', () => finish(true)); }
  async function step() {
    const el = EL; if (!el) return;
    const c = cur();
    if (!c) return finish();
    Q.busy = false; Q.answered = false; Q.hint = false; Q.moving = false;
    SM.map.clearRings('st:');
    if (Q.lit) { VM.clearHighlight(); Q.lit = false; }
    if (Q.mode === 'flash') return flashCard(c);
    if (Q.mode === 'find') return findCard(c);
    if (Q.mode === 'name') return nameCard(c);
  }
  function next() { Q.i++; step(); }
  function record(c, ok, q, extra = {}) {
    const st = grade(c, deckIdOf(c), q);
    Q.res.push({ c, ok, q, ivl: st.ivl, ...extra });
    /* a missed card comes back once at the end of the session */
    if (!ok && !Q.again.has(c.id) && Q.list.length < SESSION_N * 2) { Q.again.add(c.id); Q.list.push(c); }
  }

  /* ---------- flashcards ---------- */
  function flashCard(c) {
    const el = EL;
    const tgt = c.target && c.kind ? targetLink(c) : '';
    el.innerHTML = `${topHTML()}<div class="vm-card st-card"><p class="st-q">${inl(c.q)}</p>${c.hint ? `<button type="button" class="linkish st-hintb" data-hint="1">Show a hint</button><p class="st-hint" hidden>${inl(c.hint)}</p>` : ''}
      <div class="st-ans" hidden><p class="st-a">${inl(c.a)}</p>${tgt}</div></div>
      <div class="btn-row st-act" id="st-act"><button type="button" class="btn solid st-show" data-show="1">Show the answer</button></div>`;
    bindTop(el);
    el.querySelector('[data-hint]')?.addEventListener('click', e => { e.target.hidden = true; el.querySelector('.st-hint').hidden = false; Q.hint = true; });
    el.querySelector('[data-show]').addEventListener('click', () => {
      el.querySelector('.st-ans').hidden = false;
      const st = SRS.m.get(c.id);
      const opts = [[1, 'Again'], [3, 'Hard'], [4, 'Good'], [5, 'Easy']];
      el.querySelector('#st-act').innerHTML = `<p class="lk st-howw">How well did you know it?</p><div class="st-grades">${opts.map(([q, l]) => `<button type="button" class="btn${q === 4 ? ' solid' : q === 1 ? '' : ' ghost'}" data-g="${q}"><b>${l}</b><small class="mono">${ivlText(sm2(st, q))}</small></button>`).join('')}</div>`;
      el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => { const q = +b.dataset.g; record(c, q >= 3, q); next(); }));
      el.querySelector('[data-g="4"]')?.focus({ preventScroll: true });
      bindTarget(el, c);
    });
    el.querySelector('[data-show]').focus({ preventScroll: true });
    el.scrollTop = 0;
  }
  function targetLink(c) {
    if (c.kind === 'grape') return `<p class="st-links"><a href="#grape-${esc(c.target)}">Open the grape</a></p>`;
    if (c.kind === 'soil') return `<p class="st-links"><a href="#soil-${esc(c.target)}">Read about the soil</a></p>`;
    if (c.kind === 'event') return `<p class="st-links"><a href="#event-${esc(c.target)}">Open the story</a></p>`;
    if (!VM.data.entity(c.target)?.lp) return '';
    return `<p class="st-links">${VM.map ? `<button type="button" class="linkish" data-showmap="1">Show on the map</button> · ` : ''}<a href="#${esc(c.target)}">Open ${esc(SM.nameOf(c.target))}</a></p>`;
  }
  function bindTarget(el, c) {
    el.querySelector('[data-showmap]')?.addEventListener('click', () => { reveal(c, true); });
  }

  /* ---------- map helpers for the quiz ---------- */
  function ensureFor(id) {
    const iso = VM.data.isoOf(id);
    const fine = !!VM.data.indexById.get(id)?.fine;
    return SM.map.ensure(iso, fine);
  }
  /* frame the area of the deck around this card, without centring on the answer */
  function frameFor(c) {
    const iso = VM.data.isoOf(c.target);
    const same = Q.d.cards.filter(x => x.target && MAPK.has(x.kind) && VM.data.isoOf(x.target) === iso).map(x => x.target);
    let bb = same.length >= 4 ? SM.bboxOf(same, 0.25) : null;
    const tb = SM.bboxOf([c.target], 0);
    /* a cluster barely larger than the target would give the answer away */
    if (bb && tb && (bb[2] - bb[0]) < (tb[2] - tb[0]) * 2.5 && (bb[3] - bb[1]) < (tb[3] - tb[1]) * 2.5) bb = null;
    if (!bb) bb = (typeof mainBbox === 'function' && mainBbox(iso)) || VM.data.entity(iso)?.bbox || SM.bboxOf([c.target], 3);
    if (VM.isPhone()) VM.panel.snap('peek');
    VM.flyTo({ bbox: bb }, { maxZoom: 12 });
  }
  /* light the answer and fly to it */
  function reveal(c, fly = true, keepLabels = false) {
    const id = c.target;
    if (!keepLabels) SM.map.labels(true);
    const t = VM.data.typeOf(id);
    if (t === 'region') { const e = VM.data.entity(id); if (e?.lp) SM.map.ring('st:ans', e.lp[0], e.lp[1], 'ans'); }
    else { VM.highlight([id], { owner: 'study', dimOthers: false }); Q.lit = true; }
    if (fly) {
      if (VM.isPhone()) VM.panel.snap('half');
      const e = VM.data.entity(id);
      if (t === 'appellation' && e?.bbox && !e.pt) VM.flyTo({ bbox: SM.bboxOf([id], 0.6) }, { maxZoom: 15, speed: 1.6 });
      else if (e?.lp) VM.flyTo({ lon: e.lp[0], lat: e.lp[1], zoom: t === 'site' ? 12 : t === 'region' ? 7.5 : 10 }, { speed: 1.6 });
    }
  }

  /* ---------- find it on the map ---------- */
  function promptOf(c) {
    /* "Find Château Lafite Rothschild. Appellation and 1855 rank?" -> the place to find, and the follow-up question */
    const m = String(c.q).match(/^(Find (?:the )?[^.?]*?)[.?]\s*(.*)$/);
    if (m) return { find: m[1], more: m[2] };
    return { find: `Find ${SM.nameOf(c.target)}`, more: c.q };
  }
  async function findCard(c) {
    const el = EL;
    const p = promptOf(c);
    el.innerHTML = `${topHTML('<button type="button" class="btn small ghost" data-skip="1">Show me</button>')}<div class="st-find"><p class="st-q">${esc(p.find)}</p>${p.more ? `<p class="note st-more">${inl(p.more)}</p>` : ''}
      <p class="st-tapnote" id="st-status"><span class="st-dot" aria-hidden="true"></span>Tap the map where it is.</p>
      ${c.hint ? `<button type="button" class="linkish st-hintb" data-hint="1">Show a hint</button><p class="st-hint" hidden>${inl(c.hint)}</p>` : ''}</div>
      <div id="st-res"></div><div class="btn-row st-act" id="st-act"></div>`;
    bindTop(el);
    el.querySelector('[data-hint]')?.addEventListener('click', e => { e.target.hidden = true; el.querySelector('.st-hint').hidden = false; Q.hint = true; });
    el.querySelector('[data-skip]').addEventListener('click', () => { if (!Q.busy) answerFind(c, null); });
    SM.map.labels(false);
    await ensureFor(c.target);
    if (cur() !== c) return;
    frameFor(c);
  }
  async function onTap(ev) {
    const c = cur();
    if (!c || Q.mode !== 'find' || Q.answered || Q.busy) return;
    Q.busy = true;
    const st = EL?.querySelector('#st-status'); if (st) st.lastChild.textContent = 'Checking…';
    try { await answerFind(c, ev); } finally { Q.busy = false; }
  }
  async function answerFind(c, ev) {
    if (Q.answered) return;
    Q.answered = true;
    let res = { ok: false, km: null };
    if (ev) {
      SM.map.ring('st:tap', ev.lngLat.lng, ev.lngLat.lat, 'tap');
      res = await hitTest(c, ev);
      SM.map.ring('st:tap', ev.lngLat.lng, ev.lngLat.lat, 'tap ' + (res.ok ? 'ok' : 'no'));
    }
    const q = res.ok ? (Q.hint ? 3 : 4) : 1;
    record(c, res.ok, q, { km: res.km });
    const el = EL; if (!el) return;
    const name = SM.nameOf(c.target);
    const pt = res.pt;
    const verdict = !ev ? `It is here.` : res.ok ? (pt ? `${fmtKm(res.km)} from the spot.` : res.km ? `Close enough: ${fmtKm(res.km)} outside the line, within what a tap can hit at this zoom.` : `Inside ${name}.`) : `${res.km != null ? `${fmtKm(res.km)} away` : 'That is outside it'}${pt ? '' : ' from the line'}.`;
    el.querySelector('#st-status')?.remove();
    el.querySelector('.st-find').classList.add(res.ok ? 'ok' : 'no');
    el.querySelector('#st-res').innerHTML = `<div class="st-verdict ${res.ok ? 'ok' : 'no'}" role="status"><b>${res.ok ? 'Right' : ev ? 'Missed' : 'Shown'}</b> ${esc(verdict)}</div>
      <div class="st-ansb"><p class="st-aname">${esc(name)}<small>${esc(SM.metaOf(c.target))}</small></p><p class="st-a">${inl(c.a)}</p><p class="st-links"><a href="#${esc(c.target)}">Open ${esc(name)}</a></p></div>`;
    showNext(el);
    reveal(c, true);
  }
  function showNext(el) {
    const label = Q.i + 1 >= Q.list.length ? 'See the summary' : 'Next';
    const bar = el.querySelector('.st-tact');
    if (bar) bar.innerHTML = `<button type="button" class="btn small solid" data-next="1">${label}</button>`;
    el.querySelector('#st-act').innerHTML = `<button type="button" class="btn solid" data-next="1">${label}</button>`;
    el.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => { if (!Q.moving) { Q.moving = true; next(); } }));
    (bar?.querySelector('[data-next]') || el.querySelector('#st-act [data-next]'))?.focus({ preventScroll: true });
  }
  const fmtKm = km => km < 1 ? `${VM.fmt.num(km * 1000, 0)} m` : km < 10 ? `${VM.fmt.num(km, 1)} km` : `${VM.fmt.num(km, 0)} km`;
  async function hitTest(c, ev) {
    const id = c.target, m = VM.map, kind = VM.data.typeOf(id);
    const ll = ev.lngLat, z = m.getZoom();
    const kpp = SM.kmPerPx(ll.lat, z);
    const e = VM.data.entity(id);
    if (kind === 'appellation' && e && !e.pt && VM.data.indexById.has(id)) {
      const hits = arr(ev.features).map(f => f.properties?.id);
      if (hits.includes(id)) return { ok: true, km: 0 };
      let qs = [];
      try { const layers = (m.getStyle().layers || []).filter(l => l.type === 'fill' && /^(app|fine)-/.test(String(l.source))).map(l => l.id); qs = m.queryRenderedFeatures([ev.point.x, ev.point.y], { layers }).map(f => f.properties.id); } catch (err) { /* style busy */ }
      if (qs.includes(id)) return { ok: true, km: 0 };
      const f = await VM.data.geometry(id).catch(() => null);
      if (f && f.geometry) {
        if (SM.inGeom(f.geometry, ll.lng, ll.lat)) return { ok: true, km: 0 };
        const km = SM.kmToGeom(f.geometry, ll.lng, ll.lat);
        return { ok: km <= Math.min(10, 18 * kpp), km };
      }
    }
    if (kind === 'region') {
      const fc = await VM.data.json('data/geo/_regions.geojson');
      const f = arr(fc?.features).find(x => x.properties?.id === id);
      if (f && f.geometry) {
        if (SM.inGeom(f.geometry, ll.lng, ll.lat)) return { ok: true, km: 0 };
        const km = SM.kmToGeom(f.geometry, ll.lng, ll.lat);
        return { ok: km <= Math.min(15, 18 * kpp), km };
      }
    }
    if (!e?.lp) return { ok: false, km: null };
    const km = SM.kmBetween([ll.lng, ll.lat], e.lp);
    return { ok: km <= clamp(26 * kpp, kind === 'site' ? 1.2 : 4, kind === 'site' ? 12 : 20), km, pt: true };
  }

  /* ---------- name it ---------- */
  function choicesFor(c) {
    const name = c => c.kind === 'grape' ? (VM.data.grapeById(c.target)?.name || c.target) : c.kind === 'soil' ? soilName(c.target) : SM.nameOf(c.target);
    const pool = Q.d.cards.filter(x => x.target && x.target !== c.target && x.kind === c.kind && name(x) && fold(name(x)) !== fold(name(c)));
    const seen = new Set([fold(name(c))]);
    let cand = pool;
    const lp = VM.data.entity(c.target)?.lp;
    if (MAPK.has(c.kind) && lp) cand = pool.map(x => [SM.kmBetween(lp, VM.data.entity(x.target)?.lp), x]).sort((a, b) => a[0] - b[0]).slice(0, 8).map(x => x[1]);
    const out = [];
    for (const x of SM.shuffle(cand.slice())) { const n = name(x); if (seen.has(fold(n))) continue; seen.add(fold(n)); out.push(n); if (out.length === 3) break; }
    if (out.length < 3) for (const x of SM.shuffle(pool.slice())) { const n = name(x); if (seen.has(fold(n))) continue; seen.add(fold(n)); out.push(n); if (out.length === 3) break; }
    return { right: name(c), all: SM.shuffle([name(c), ...out]) };
  }
  let SOILS = null;
  const soilName = id => SOILS?.find(s => s.id === id)?.name || id.replace(/-/g, ' ');
  /* the answer text with the name blanked, for grape and soil cards */
  function masked(text, names) {
    let t = String(text);
    for (const n of names.filter(Boolean).sort((a, b) => b.length - a.length)) t = t.replace(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '…');
    return t;
  }
  async function nameCard(c) {
    const el = EL;
    if (c.kind === 'soil' && !SOILS) SOILS = await VM.data.soils();
    const ch = choicesFor(c);
    const onMap = MAPK.has(c.kind);
    let prompt;
    if (onMap) prompt = `<p class="st-q">Which place is lit on the map?</p>`;
    else if (c.kind === 'grape') { const g = VM.data.grapeById(c.target); prompt = `<p class="st-q">Which grape?</p><p class="st-clue">${inl(masked(c.hint || c.a, [g?.name, ...arr(g?.synonyms)]))}</p>`; }
    else prompt = `<p class="st-q">Which soil or rock?</p><p class="st-clue">${inl(masked(c.a, [ch.right]))}</p>`;
    el.innerHTML = `${topHTML()}<div class="st-name">${prompt}<div class="st-choices" role="group" aria-label="Choices">${ch.all.map((n, i) => `<button type="button" class="st-ch" data-ch="${i}"><span class="mono">${'ABCD'[i]}</span>${esc(n)}</button>`).join('')}</div></div><div id="st-res"></div><div class="btn-row st-act" id="st-act"></div>`;
    bindTop(el);
    el.querySelectorAll('[data-ch]').forEach(b => b.addEventListener('click', () => {
      if (Q.answered) return;
      Q.answered = true;
      const pick = ch.all[+b.dataset.ch], ok = pick === ch.right;
      el.querySelectorAll('[data-ch]').forEach(x => { const n = ch.all[+x.dataset.ch]; x.disabled = true; x.classList.toggle('right', n === ch.right); x.classList.toggle('wrong', x === b && !ok); });
      record(c, ok, ok ? 4 : 1);
      el.querySelector('#st-res').innerHTML = `<div class="st-verdict ${ok ? 'ok' : 'no'}" role="status"><b>${ok ? 'Right' : 'Missed'}</b> ${ok ? '' : `It is ${esc(ch.right)}.`}</div><div class="st-ansb"><p class="st-a">${inl(c.a)}</p>${targetLink(c).replace('<button type="button" class="linkish" data-showmap="1">Show on the map</button> · ', '')}</div>`;
      showNext(el);
      if (onMap) SM.map.labels(true);
    }));
    if (onMap) {
      SM.map.labels(false);
      await ensureFor(c.target);
      if (cur() !== c) return;
      const id = c.target, t = VM.data.typeOf(id), e = VM.data.entity(id);
      if (t === 'region') { if (e?.lp) SM.map.ring('st:ans', e.lp[0], e.lp[1], 'ans'); }
      else { VM.highlight([id], { owner: 'study', dimOthers: true }); Q.lit = true; }
      if (VM.isPhone()) VM.panel.snap('half');
      if (t === 'appellation' && e?.bbox && !e.pt) VM.flyTo({ bbox: SM.bboxOf([id], VM.isPhone() ? 0.35 : 0.6) }, { maxZoom: 15 });
      else if (e?.lp) VM.flyTo({ lon: e.lp[0], lat: e.lp[1], zoom: t === 'site' ? 10.5 : t === 'region' ? 6.5 : 8.5 });
    }
  }

  /* ---------- the end of a session ---------- */
  async function finish(early) {
    const el = EL; if (!el) return;
    leaveMap();
    const res = Q.res;
    /* first attempts only, so a card that came back does not count twice */
    const first = new Map(); for (const r of res) if (!first.has(r.c.id)) first.set(r.c.id, r);
    const firsts = [...first.values()];
    const correct = firsts.filter(r => r.ok).length;
    if (firsts.length) await saveSession({ deck: Q.d.id, mode: Q.mode, start: Q.start, end: Date.now(), correct, total: firsts.length });
    const sk = streak();
    const nextDue = [...SRS.m.values()].filter(v => !isDue(v) && v.due < endOfToday() + 864e5).length;
    VIEW.kind = 'summary';
    el.innerHTML = `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span>${Q.d.id !== 'due' ? `<a href="#study-deck-${esc(Q.d.id)}">${esc(Q.d.title)}</a>` : '<span class="here">Due reviews</span>'}</p>
      <div class="head"><p class="eyebrow">${esc(MODE_L[Q.mode])}${early ? ' · ended early' : ''}</p><h2 class="title">${firsts.length ? `${correct} of ${firsts.length}` : 'No answers'}</h2>${firsts.length ? `<p class="tagline">${esc(praise(correct / firsts.length))}</p>` : ''}</div>
      ${VM.h.ledger([{ k: 'Streak', v: `${sk.n} ${sk.n === 1 ? 'day' : 'days'}` }, { k: 'Due tomorrow', v: VM.fmt.num(nextDue) }, { k: 'Time', v: `${Math.max(1, Math.round((Date.now() - Q.start) / 60000))} min` }])}
      ${firsts.length ? `<ol class="st-sum">${firsts.map(r => `<li class="${r.ok ? 'ok' : 'no'}"><span class="st-mk" aria-label="${r.ok ? 'right' : 'missed'}">${r.ok ? MK_OK : MK_NO}</span><span class="st-sq">${r.c.target && MAPK.has(r.c.kind) ? `<a href="#${esc(r.c.target)}">${esc(SM.nameOf(r.c.target))}</a>` : inl(r.c.q)}${r.km ? `<small class="mono">${fmtKm(r.km)} off</small>` : ''}</span><span class="row-meta">back in ${esc(ivlText(SRS.m.get(r.c.id)))}</span></li>`).join('')}</ol>` : ''}
      <div class="btn-row st-act">${Q.d.id !== 'due' ? `<button type="button" class="btn solid" data-again="1">Another round</button>` : ''}<button type="button" class="btn ghost" data-go="study">All decks</button></div>`;
    bindCommon(el);
    el.querySelector('[data-again]')?.addEventListener('click', () => startSession(Q.d, Q.mode));
    el.scrollTop = 0;
    if (VM.isPhone()) VM.panel.snap('full');
  }
  const MK_OK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  const MK_NO = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  const praise = r => r >= 0.95 ? 'Flawless. These cards will stay away for a while.' : r >= 0.8 ? 'Strong. The misses come back first next time.' : r >= 0.5 ? 'Getting there. Missed cards return in ten minutes, then tomorrow.' : 'Early days. Every miss is scheduled to come back soon.';

  /* ---------- put it in order (timeline) ---------- */
  const O = { rounds: 3, r: 0, items: [], score: [], start: 0, d: null };
  async function startOrder(d) {
    VIEW.kind = 'order';
    leaveMap();
    const tl = await VM.data.timeline();
    const cards = d ? arr(d.cards) : [];
    const byTarget = new Map(cards.map(c => [c.target, c]));
    O.pool = tl.filter(e => e.year != null).map(e => ({ id: e.id, title: e.title, when: e.when, year: e.year, place: e.place, card: byTarget.get(e.id.replace(/^event-/, '')) || null }));
    O.r = 0; O.score = []; O.start = Date.now(); O.d = d;
    if (O.pool.length < 5) { EL.innerHTML = H_HEAD('Put it in order') + '<p class="vm-empty">The timeline is not in this build.</p>'; return; }
    orderRound();
  }
  const H_HEAD = t => `<p class="crumbs"><a href="#study">Study</a><span class="gt">›</span><span class="here">${esc(t)}</span></p>`;
  function orderRound() {
    const el = EL; if (!el) return;
    /* five moments with distinct years, at least one from each half of the pool so rounds span eras */
    let pick;
    for (let t = 0; t < 40; t++) {
      pick = SM.shuffle(O.pool.slice()).slice(0, 5);
      const ys = pick.map(x => x.year);
      if (new Set(ys).size === 5) break;
    }
    O.items = pick;
    let order = SM.shuffle(pick.slice());
    while (order.every((x, i, a) => !i || a[i - 1].year <= x.year)) order = SM.shuffle(pick.slice());
    el.innerHTML = `${H_HEAD('Put it in order')}<div class="head"><p class="eyebrow">Round ${O.r + 1} of ${O.rounds}</p><h2 class="title">Oldest at the top</h2><p class="tagline">Drag the moments, or use the arrows, then check.</p></div>
      <ol class="st-ord" id="st-ord">${order.map(x => `<li data-id="${esc(x.id)}"><button type="button" class="st-grip" aria-label="Drag ${esc(x.title)}"><svg viewBox="0 0 12 18" width="12" height="18" aria-hidden="true"><g fill="currentColor"><circle cx="3" cy="3" r="1.4"/><circle cx="9" cy="3" r="1.4"/><circle cx="3" cy="9" r="1.4"/><circle cx="9" cy="9" r="1.4"/><circle cx="3" cy="15" r="1.4"/><circle cx="9" cy="15" r="1.4"/></g></svg></button><span class="st-ot"><b>${esc(x.title)}</b>${x.place ? `<small>${esc(x.place)}</small>` : ''}<span class="st-oy mono" hidden>${esc(x.when)}</span></span><span class="st-ob"><button type="button" class="icon-btn" data-mv="-1" aria-label="Move ${esc(x.title)} up"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg></button><button type="button" class="icon-btn" data-mv="1" aria-label="Move ${esc(x.title)} down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></span></li>`).join('')}</ol>
      <div id="st-res"></div><div class="btn-row st-act" id="st-act"><button type="button" class="btn solid" data-check="1">Check the order</button></div>`;
    const ol = el.querySelector('#st-ord');
    bindDrag(ol);
    ol.addEventListener('click', e => {
      const b = e.target.closest('[data-mv]'); if (!b || O.done) return;
      const li = b.closest('li'), dir = +b.dataset.mv;
      if (dir < 0 && li.previousElementSibling) li.parentNode.insertBefore(li, li.previousElementSibling);
      else if (dir > 0 && li.nextElementSibling) li.parentNode.insertBefore(li.nextElementSibling, li);
      b.focus();
    });
    O.done = false;
    el.querySelector('[data-check]').addEventListener('click', () => checkOrder(el, ol));
    el.scrollTop = 0;
  }
  function bindDrag(ol) {
    ol.querySelectorAll('.st-grip').forEach(h => h.addEventListener('pointerdown', e => {
      if (O.done) return;
      const li = h.closest('li');
      const items = [...ol.children];
      const rects = items.map(x => x.getBoundingClientRect());
      const from = items.indexOf(li);
      const step = rects.length > 1 ? rects[1].top - rects[0].top : rects[0].height;
      let to = from;
      const y0 = e.clientY;
      h.setPointerCapture(e.pointerId);
      li.classList.add('drag');
      e.preventDefault();
      const mv = ev => {
        const dy = ev.clientY - y0;
        li.style.transform = `translateY(${dy}px)`;
        to = clamp(Math.round(from + dy / step), 0, items.length - 1);
        items.forEach((x, j) => {
          if (x === li) return;
          let sh = 0;
          if (from < to && j > from && j <= to) sh = -step;
          if (from > to && j < from && j >= to) sh = step;
          x.style.transform = sh ? `translateY(${sh}px)` : '';
        });
      };
      const up = () => {
        h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up);
        items.forEach(x => { x.style.transform = ''; });
        li.classList.remove('drag');
        if (to !== from) { const ref = items[to]; if (to > from) ref.after(li); else ref.before(li); }
      };
      h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    }));
  }
  function checkOrder(el, ol) {
    O.done = true;
    const ids = [...ol.children].map(li => li.dataset.id);
    const right = O.items.slice().sort((a, b) => a.year - b.year);
    let n = 0;
    [...ol.children].forEach((li, i) => {
      const ok = right[i].id === li.dataset.id || right[i].year === O.items.find(x => x.id === li.dataset.id).year;
      if (ok) n++;
      li.classList.add(ok ? 'ok' : 'no');
      li.querySelector('.st-oy').hidden = false;
      li.querySelectorAll('button').forEach(b => { b.disabled = true; });
    });
    O.score.push(n);
    /* each moment's card (if the timeline deck has it) counts as a review */
    for (const [i, id] of ids.entries()) { const it = O.items.find(x => x.id === id); if (it?.card && O.d) grade(it.card, O.d.id, right[i].id === id ? 4 : 2); }
    markDay();
    el.querySelector('#st-res').innerHTML = `<div class="st-verdict ${n === 5 ? 'ok' : 'no'}" role="status"><b>${n} of 5</b> in the right place.</div>
      ${n < 5 ? `<p class="lk" style="margin-top:12px">The right order</p><ol class="st-right">${right.map(x => `<li><span class="mono">${esc(x.when)}</span> <a href="#${esc(x.id)}">${esc(x.title)}</a></li>`).join('')}</ol>` : ''}`;
    const last = O.r + 1 >= O.rounds;
    el.querySelector('#st-act').innerHTML = `<button type="button" class="btn solid" data-nx="1">${last ? 'See the summary' : 'Next round'}</button>`;
    el.querySelector('[data-nx]').addEventListener('click', async () => {
      O.r++;
      if (!last) return orderRound();
      const tot = O.score.reduce((s, x) => s + x, 0);
      await saveSession({ deck: O.d?.id || 'timeline', mode: 'order', start: O.start, end: Date.now(), correct: tot, total: O.rounds * 5 });
      const sk = streak();
      el.innerHTML = `${H_HEAD('Put it in order')}<div class="head"><p class="eyebrow">Put it in order</p><h2 class="title">${tot} of ${O.rounds * 5}</h2><p class="tagline">${esc(praise(tot / (O.rounds * 5)))}</p></div>
        ${VM.h.ledger(O.score.map((s, i) => ({ k: `Round ${i + 1}`, v: `${s} / 5` })).concat([{ k: 'Streak', v: `${sk.n} ${sk.n === 1 ? 'day' : 'days'}` }]))}
        <div class="btn-row st-act"><button type="button" class="btn solid" data-again="1">Play again</button><button type="button" class="btn ghost" data-go="study">All decks</button><button type="button" class="btn ghost" data-go="timeline">Open the timeline</button></div>`;
      bindCommon(el);
      el.querySelector('[data-again]').addEventListener('click', () => startOrder(O.d));
    });
  }
})();
