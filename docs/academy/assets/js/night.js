// ===== Tasting Night: planner, text-a-friend, host card, scoring =====
let NT = { type: "pair", pair: 0, custom: [], hide: false, friend: "", phone: "", date: "", me: "", built: null };
const LETTERS = "ABCDEFGHIJKL";
function nightWines() {
  if (NT.type === "pair") return [PAIRS[NT.pair][1], PAIRS[NT.pair][2]];
  if (NT.type === "cert") return NT.cert || (NT.cert = [...shuffle(WINES.filter(w => w.lvl === "cert" && w.c === "w")).slice(0, 2), ...shuffle(WINES.filter(w => w.lvl === "cert" && w.c === "r")).slice(0, 2)].map(w => w.id));
  if (NT.type === "italy") return ["barolo", "sang", "amar", "pgrig"];
  if (NT.type === "riesling") return ["rkab", "clare", "vouv", "alb"];
  if (NT.type === "bordeaux") return ["hmed", "pom", "napcab", "chin"];
  if (NT.type === "sfs") return ["champ", "prosec", "saut", "lbv"];
  return NT.custom;
}
function encodeNight(order, host, date) { return encodeURIComponent([order.join("."), host, date].join("|")); }
function decodeNight(code) { try { const [o, host, date] = decodeURIComponent(code).split("|"); const order = o.split(".").filter(id => WBY[id]); return order.length ? { order, host: host || "your friend", date: date || "" } : null; } catch (e) { return null; } }
function hostURL(order) { const base = location.href.split("#")[0]; return `${base}#host/${encodeNight(order, NT.me || "your friend", NT.date)}`; }
function niceDate(d) { if (!d) return "soon"; const x = new Date(d + "T12:00:00"); return x.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }); }
function buildMessage(ids, url) {
  const list = ids.slice().sort((a, b) => WBY[a].c.localeCompare(WBY[b].c) || WBY[a].region.localeCompare(WBY[b].region)).map((id, i) => `${i + 1}. ${BUY[id][0]} (${BUY[id][2]})`).join("\n");
  return `Hey ${NT.friend || "there"}! I'm studying for my sommelier exams and need a blind-tasting host${NT.date ? " on " + niceDate(NT.date) : ""}. Could you grab these ${ids.length} bottles and pour them for me blind?\n\n${list}\n\nYour host card with bottle suggestions, setup steps and the answer key (don't show me!):\n${url}\n\nThank you 🍷`;
}
function viewNight() {
  const ids = nightWines(), n = ids.length;
  const types = [["pair", "Confusion pair"], ["cert", "Certified flight (2 white, 2 red)"], ["italy", "Italy night"], ["bordeaux", "Cabernet family"], ["riesling", "High-acid whites"], ["sfs", "Bubbles & stickies"], ["custom", "Build your own"]];
  const ready = n >= 2 && n <= 8;
  let msg = "", order = null;
  if (ready) { order = NT.built && NT.built.key === ids.join() ? NT.built.order : shuffle(ids); NT.built = { key: ids.join(), order }; msg = buildMessage(ids, hostURL(order)); }
  const smsHref = ready ? `sms:${encodeURIComponent((NT.phone || "").replace(/[^\d+]/g, ""))}${/iP(hone|ad|od)|Mac/.test(navigator.userAgent) ? "&" : "?"}body=${encodeURIComponent(msg)}` : "#";
  const past = S.nights.slice().reverse();
  return `<div class="wrap"><div class="eyebrow">Tasting Night</div><h1>Bring a friend. <em>Pour blind.</em></h1>
  <p class="lede">Choose a flight and enter a friend's number. Your Messages app opens with the text already written: what to buy, plus a private host card with setup steps and the answer key. Nothing is sent or stored by this site; the number stays on your phone.</p>
  <div class="grid split" style="grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:start">
  <div class="card">
    <div class="gsec" style="margin-top:0">1 · The flight</div>
    <div class="seg" style="margin:8px 0 14px">${types.map(([k, t]) => `<button class="${NT.type === k ? "on" : ""}" data-act="ntype" data-arg="${k}">${t}</button>`).join("")}</div>
    ${NT.type === "pair" ? `<select data-in="npair">${PAIRS.map((p, i) => `<option value="${i}" ${i === NT.pair ? "selected" : ""}>${esc(p[0])}</option>`).join("")}</select>` : ""}
    ${NT.type === "custom" ? `<p class="small muted">Pick 2 to 8 wines.</p><div class="row" style="gap:6px">${WINES.map(w => `<button class="chip ${NT.custom.includes(w.id) ? "on" : ""}" data-act="ncust" data-arg="${w.id}">${esc(w.grape)} · ${esc(w.region.split("(")[0].split("/")[0].trim())}</button>`).join("")}</div>` : ""}
    ${NT.type === "cert" ? `<button class="btn sm" data-act="nreroll" style="margin-top:4px">Draw a different four</button>` : ""}
    <label class="row small" style="margin-top:16px;gap:8px"><input type="checkbox" data-in="nhide" ${NT.hide ? "checked" : ""}> Keep the wines secret from me (blur the list and message)</label>
    <div class="gsec">2 · The host</div>
    <div class="grid g2" style="gap:12px">
      <label class="f">Friend's name<input type="text" data-nin="friend" value="${esc(NT.friend)}" placeholder="e.g., Austin"></label>
      <label class="f">Friend's phone<input type="tel" data-nin="phone" value="${esc(NT.phone)}" placeholder="(303) 555-0123" autocomplete="tel"></label>
      <label class="f">Tasting date<input type="date" data-nin="date" value="${esc(NT.date)}"></label>
      <label class="f">Your name<input type="text" data-nin="me" value="${esc(NT.me)}" placeholder="Shown on the host card"></label>
    </div>
    <div class="gsec">3 · Send</div>
    <div class="row"><a class="btn pri ${ready ? "" : "disabled"}" href="${smsHref}" data-act="nsend" ${ready ? "" : 'aria-disabled="true"'}>Open in Messages</a><button class="btn" data-act="nshare" ${ready ? "" : "disabled"}>Share…</button><button class="btn" data-act="ncopy" ${ready ? "" : "disabled"}>Copy text</button><a class="btn ghost" href="${ready ? "#host/" + encodeNight(order, NT.me || "your friend", NT.date) : "#night"}">Preview host card</a></div>
    <p class="small muted" style="margin:12px 0 0">Opening Messages saves this night to your list below, so you can enter your calls on the night and reveal the results afterward.</p>
  </div>
  <div class="card"><div class="eyebrow">The message</div>
    <div id="nmsg" style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:14.5px;line-height:1.55;background:var(--sunk);border:1px solid var(--line);border-radius:var(--r);padding:16px" class="${NT.hide ? "reveal" : ""}">${ready ? esc(msg) : "Choose 2 to 8 wines to compose the message."}</div>
    ${ready && !NT.hide ? `<div class="eyebrow" style="margin-top:18px">In the flight</div>${ids.map(id => `<div class="row small" style="padding:6px 0;border-bottom:1px solid var(--line)">${glass(WBY[id].c).replace('class="glass"', 'class="glass" style="width:22px;height:22px"')}<b>${esc(WBY[id].grape)}</b><span class="muted">${esc(WBY[id].region)}</span></div>`).join("")}` : ""}
  </div></div>
  <h2>Your tasting nights</h2>${past.length ? past.map(nightCard).join("") : `<p class="muted">No nights yet. Send your first one above.</p>`}</div>`;
}
function saveNight(order) { if (S.nights.some(x => x.order.join() === order.join() && x.date === NT.date && !x.revealed)) return; S.nights.push({ id: Date.now(), date: NT.date || today(), friend: NT.friend || "", order, calls: {}, revealed: false }); save(); }
function nightCard(nt) {
  const grapes = [...new Set(WINES.map(w => w.grape))].sort();
  const score = nt.revealed ? nt.order.filter((id, i) => (nt.calls[i] || "") === WBY[id].grape).length : 0;
  return `<div class="card" style="margin-bottom:14px"><div class="row between"><div><b style="font-family:var(--f-display);font-size:22px">${niceDate(nt.date)}</b> <span class="small muted">${nt.friend ? "· hosted by " + esc(nt.friend) : ""} · ${nt.order.length} wines</span></div>${nt.revealed ? `<span class="pill ${score / nt.order.length >= .6 ? "good" : "bad"}">${score}/${nt.order.length} grapes</span>` : ""}</div>
  <div class="grid g3" style="margin-top:14px">${nt.order.map((id, i) => { const w = WBY[id], ok = nt.revealed && nt.calls[i] === w.grape; return `<div style="border:1px solid var(--line);border-radius:var(--r);padding:12px"><div class="row" style="gap:10px"><div class="bag" style="width:40px;height:40px;font-size:20px">${LETTERS[i]}</div><div class="small muted">Glass ${LETTERS[i]}</div></div>
    <select data-call="${nt.id}:${i}" style="margin-top:10px" ${nt.revealed ? "disabled" : ""}><option value="">Your grape call…</option>${grapes.map(g => `<option ${nt.calls[i] === g ? "selected" : ""}>${esc(g)}</option>`).join("")}</select>
    ${nt.revealed ? `<p class="small" style="margin:8px 0 0"><span style="color:${ok ? "var(--good)" : "var(--bad)"}">${ok ? "✓" : "✗"}</span> <b>${esc(w.grape)}</b> · ${esc(w.region)}</p><p class="small muted" style="margin:4px 0 0">${esc(w.markers)}</p>` : ""}</div>`; }).join("")}</div>
  <div class="row" style="margin-top:14px">${nt.revealed ? `<a class="btn sm" href="#lab">Grid these in the Lab</a>` : `<button class="btn sm pri" data-act="nreveal" data-arg="${nt.id}">Reveal the answers</button>`}<button class="btn sm ghost" data-act="ndel" data-arg="${nt.id}">Remove</button></div></div>`;
}
function viewHost(code) {
  const N = decodeNight(code); if (!N) return `<div class="wrap read"><h1>That host link is broken.</h1><p class="lede">Ask your friend to send it again.</p></div>`;
  const ws = N.order.map(id => WBY[id]); const hasW = ws.some(w => w.c === "w"), hasR = ws.some(w => w.c === "r");
  return `<div class="wrap read"><div class="eyebrow">Host card · Vitis Mundi Academy</div><h1>You're hosting a <em>blind tasting.</em></h1>
  <p class="lede">${esc(N.host.charAt(0).toUpperCase() + N.host.slice(1))} is training for sommelier exams and asked you to pour ${ws.length} wines blind${N.date ? " on " + niceDate(N.date) : ""}. It takes about 20 minutes of prep. Here's everything.</p>
  <h2>1 · Buy the bottles</h2><p class="small muted">Any shop with a decent wine section can help; show them this list. The examples are suggestions, not requirements.</p>
  ${ws.slice().sort((a, b) => a.c.localeCompare(b.c)).map(w => `<div class="card" style="margin-bottom:10px"><div class="row between"><b>${esc(BUY[w.id][0])}</b><span class="pill gold">${esc(BUY[w.id][2])}</span></div><div class="small muted" style="margin-top:4px">Look for: ${esc(BUY[w.id][1])}</div></div>`).join("")}
  <h2>2 · Set up</h2><div class="card prose" style="font-size:16px"><ol>
  ${hasW ? "<li><b>Whites:</b> refrigerate for 2 hours, then take out 15 minutes before pouring (about 45-50°F).</li>" : ""}
  ${hasR ? "<li><b>Reds:</b> serve slightly cool, about 60-65°F. If your room is warm, 15 minutes in the fridge.</li>" : ""}
  <li>Open everything out of sight. Cover each bottle completely: a paper bag, foil, or a clean sock over the bottle, taped at the neck.</li>
  <li>Label the covered bottles with the letters below. <b>Use exactly this order</b>; the answer key matches it.</li>
  <li>Label glasses A${ws.length > 1 ? "-" + LETTERS[ws.length - 1] : ""} with tape or a marker. Pour about 1.5-2 oz in each.</li>
  <li>Say nothing about the wines. No hints, no faces. Let ${esc(N.host)} taste and talk.</li>
  <li>Optional: time it. Exam pace is about 11 minutes per wine (Certified) or 4 minutes per wine (Advanced).</li></ol></div>
  <div class="row" style="gap:14px;margin:18px 0">${ws.map((w, i) => `<div class="row" style="gap:10px"><div class="bag">${LETTERS[i]}</div><div class="small reveal" data-act="unblur">${esc(w.grape)}<br><span class="muted">${esc(w.region)}</span></div></div>`).join("")}</div>
  <p class="small muted">Tap a blurred name to check which bottle gets which letter while you're bagging.</p>
  <h2>3 · The answer key</h2><p class="small muted">Keep this hidden until ${esc(N.host)} has committed to every call. Then reveal one by one; it's more fun.</p>
  ${ws.map((w, i) => `<div class="card" style="margin-bottom:10px"><div class="row" style="gap:14px"><div class="bag">${LETTERS[i]}</div><div class="reveal" data-act="unblur" style="flex:1;min-width:0"><b style="font-family:var(--f-display);font-size:22px">${esc(w.grape)} · ${esc(w.region)}, ${esc(w.country)}</b>
  <p class="small" style="margin:6px 0 0"><b>What a good taster should notice:</b> ${esc(w.markers)}</p>
  <p class="small muted" style="margin:4px 0 0">Structure: acid ${SCALE5[w.acid - 1].toLowerCase()}, alcohol ${SCALE5[w.alc - 1].toLowerCase()}, body ${BODY5[w.body - 1].toLowerCase()}${w.c === "r" ? ", tannin " + SCALE5[w.tannin - 1].toLowerCase() : ""}. Climate: ${w.climate.toLowerCase()}. ${w.world} World.</p></div></div></div>`).join("")}
  <h2>4 · Score them</h2><div class="card small" style="color:var(--ink2)">For each wine, give a point for: the right grape (3), the right country (2), the right climate (1), Old vs New World (1), age range within reason (1). 60% is a Certified pass. Then drink what's left together; that's the real reward.</div>
  <p class="small muted" style="margin-top:28px">Made with <a href="#progress">Vitis Mundi Academy</a>, a free online somm school.</p></div>`;
}
