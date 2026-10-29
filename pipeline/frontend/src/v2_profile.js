/* Vitis Mundi v2: profile sections built from the sidecars (photos, terrain, vintages, climate drift, rules).
   Each section hides itself when its data file is missing, so the profile degrades to v1. */

/* ---------- photos (Wikimedia Commons; Pages build only, the artifact cannot load external images) ---------- */
function photoHTML(list, name) {
  const p = list[0];
  const ratio = clamp((+p.w || 4) / (+p.h || 3), 4 / 3, 2.2);
  const credit = ph => `${ph.caption ? `${inl(ph.caption)} ` : ''}<span class="ph-by">${esc(ph.author || 'Unknown author')}, ${ph.license_url ? `<a href="${esc(ph.license_url)}" target="_blank" rel="noopener noreferrer">${esc(ph.license || 'licence')}</a>` : esc(ph.license || '')}, <a href="${esc(ph.page)}" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>`;
  let out = `<figure class="ph"><div class="ph-hero" style="aspect-ratio:${ratio.toFixed(3)}"><img src="${esc(p.thumb)}" width="${+p.w || 640}" height="${+p.h || 427}" alt="${esc(p.caption || name)}" loading="lazy" decoding="async" crossorigin="anonymous" referrerpolicy="no-referrer"></div><figcaption class="ph-cap">${credit(p)}</figcaption></figure>`;
  if (list.length > 1) out += `<ul class="ph-gal" aria-label="More photos">${list.map((x, i) => `<li><button type="button" class="ph-th${i ? '' : ' on'}" data-ph="${i}" aria-label="Show photo ${i + 1}: ${esc(x.caption || name)}"><img src="${esc(x.thumb)}" alt="" loading="lazy" decoding="async" crossorigin="anonymous" referrerpolicy="no-referrer"></button></li>`).join('')}</ul>`;
  return out;
}
function bindPhotos(el, list, name) {
  el.querySelectorAll('[data-ph]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.ph, p = list[i];
    const img = el.querySelector('.ph-hero img');
    el.querySelector('.ph-hero').style.aspectRatio = clamp((+p.w || 4) / (+p.h || 3), 4 / 3, 2.2).toFixed(3);
    img.src = p.thumb; img.alt = p.caption || name;
    el.querySelector('.ph-cap').innerHTML = photoHTML([p], name).match(/<figcaption class="ph-cap">([\s\S]*?)<\/figcaption>/)[1];
    el.querySelectorAll('.ph-th').forEach(t => t.classList.toggle('on', t === b));
  }));
  // a photo that fails to load (renamed or deleted on Commons) removes itself
  el.querySelectorAll('img').forEach(img => img.addEventListener('error', () => { const li = img.closest('li'); if (li) li.remove(); else el.hidden = true; }, { once: true }));
}

/* ---------- terrain (Copernicus DEM GLO-30 sidecar) ---------- */
const OCT = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const OCT_LONG = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
const pctDeg = s => Math.atan(s / 100) * 180 / Math.PI;
function roseSVG(ar, a) {
  const S0 = 132, c = S0 / 2, R = 50;
  const mx0 = Math.max(0.01, ...ar);
  let petals = '';
  ar.forEach((v, i) => {
    const r = 6 + (R - 6) * Math.sqrt(v / mx0);
    const a0 = (i * 45 - 20) * Math.PI / 180, a1 = (i * 45 + 20) * Math.PI / 180;
    const p = (ang, rr) => `${(c + rr * Math.sin(ang)).toFixed(1)},${(c - rr * Math.cos(ang)).toFixed(1)}`;
    petals += `<path class="rose-p" d="M${c},${c} L${p(a0, r)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${p(a1, r)} Z"><title>${OCT_LONG[i]}-facing: ${Math.round(v * 100)}% of the sloping ground</title></path>`;
  });
  const ring = [R * 0.5, R].map(r => `<circle cx="${c}" cy="${c}" r="${r}" class="rose-g"/>`).join('');
  const labs = [['N', c, 9], ['E', S0 - 6, c + 4], ['S', c, S0 - 2], ['W', 6, c + 4]].map(([t, x, y]) => `<text x="${x}" y="${y}" class="rose-l">${t}</text>`).join('');
  const arrow = a == null ? '' : (() => { const ang = a * Math.PI / 180, x = c + (R + 4) * Math.sin(ang), y = c - (R + 4) * Math.cos(ang); return `<line x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="rose-a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" class="rose-ad"/>`; })();
  return `<svg class="rose" viewBox="0 0 ${S0} ${S0}" width="${S0}" height="${S0}" role="img" aria-label="Aspect rose: ${ar.map((v, i) => `${OCT_LONG[i]} ${Math.round(v * 100)}%`).join(', ')}${a != null ? `. Mean aspect ${Math.round(a)} degrees` : '. No dominant aspect'}">${ring}<line x1="${c}" y1="${c - R}" x2="${c}" y2="${c + R}" class="rose-g"/><line x1="${c - R}" y1="${c}" x2="${c + R}" y2="${c}" class="rose-g"/>${petals}${arrow}${labs}</svg>`;
}
function slopeWord(s) { return s < 3 ? 'flat' : s < 8 ? 'gently rolling' : s < 15 ? 'moderately sloping' : s < 30 ? 'steep' : 'very steep'; }
function aspectMeaning(a, lat) {
  if (a == null) return '';
  const south = lat == null || lat >= 0;
  const o = Math.round(((a % 360) + 360) % 360 / 45) % 8;           // 0 N .. 4 S
  const sunward = south ? [4, 3, 5] : [0, 1, 7];                       // facing the midday sun
  const shady = south ? [0, 1, 7] : [4, 3, 5];
  const morning = [2, south ? 3 : 1].includes(o), evening = [6, south ? 5 : 7].includes(o);
  if (sunward.includes(o) && !morning && !evening) return `facing the midday sun, the warmest exposure, which buys ripeness where the season is short`;
  if (morning) return `turned to the morning sun, which dries the dew early and spares the grapes the hottest afternoon light`;
  if (evening) return `turned to the afternoon and evening sun, the warmest part of the day`;
  if (shady.includes(o)) return `turned away from the midday sun, so it ripens later and keeps freshness, an asset in hot places and a risk in cool ones`;
  return '';
}
function terrainReading(t, e) {
  if (t.w) return 'The marked point lies on open water, so only its height is shown.';
  const lat = e.lp ? e.lp[1] : null;
  const big = t.sub || (e.area || 0) > 1500 || (t.e95 - t.e5) > 900;
  const steep = t.s75 ?? t.s;
  if (big) {
    return `These figures cover the whole legal area, from ${fmt(t.e5)} to ${fmt(t.e95)} m, including valley floors, forest and ridges, so they describe the landscape rather than the vineyards in it. ${t.a == null ? 'Its slopes face every way.' : `On balance the ground faces ${OCT_LONG[Math.round(t.a / 45) % 8]}.`}`;
  }
  let s = `${slopeWord(steep).replace(/^./, c => c.toUpperCase())} ground`;
  const am = aspectMeaning(t.a, lat);
  if (t.a == null) s += t.fl > 0.6 ? ', mostly flat' : ' that faces every way, so each parcel has its own exposure';
  else s += `, ${am || `facing ${OCT_LONG[Math.round(t.a / 45) % 8]}`}`;
  s += '.';
  const span = (t.e95 ?? 0) - (t.e5 ?? 0);
  if (span >= 120) s += ` The top runs about ${(span * 0.0065).toFixed(1)} °C cooler than the foot (${fmt(t.e5)} to ${fmt(t.e95)} m).`;
  if (steep >= 30) s += ' Slopes like this are worked by hand or winch.';
  return s;
}
function topoHTML(t, e) {
  const caveats = [];
  if (t.n != null && t.n < 10) caveats.push(`only ${t.n} DEM cells, so read the numbers as indicative`);
  if (t.g90) caveats.push('from the 90 m Copernicus model, as the 30 m tiles are withheld here');
  if (t.r === 500) caveats.push('measured on a 500 m circle around the point, as the 150 m one was mostly water');
  if (t.sub) caveats.push('sampled on a regular lattice of 30 m windows across the zone');
  let out = H.sec('Terrain');
  out += `<div class="tr">`;
  if (!t.w && Array.isArray(t.ar) && t.ar.some(v => v > 0)) out += `<figure class="tr-rose">${roseSVG(t.ar, t.a)}<figcaption>${t.a != null ? `Mean aspect <span class="mono">${Math.round(t.a)}°</span>` : 'No dominant aspect'}</figcaption></figure>`;
  out += `<div class="tr-k">` + H.ledger([
    t.e != null && { k: 'Elevation', v: t.e5 != null && t.e95 != null && t.e95 - t.e5 > 4 ? `${fmt(t.e5)}–${fmt(t.e95)} m` : fmtM(t.e), s: `mean ${fmt(t.e)} m · ${fmt(t.e * 3.28084)} ft` },
    !t.w && t.s != null && { k: 'Slope', v: `${(+t.s).toFixed(0)}%`, s: `mean, ${pctDeg(t.s).toFixed(0)}°${t.s75 != null ? ` · steepest quarter ${(+t.s75).toFixed(0)}%+` : ''}` },
    !t.w && t.fl != null && { k: 'Flat ground', v: `${Math.round(t.fl * 100)}%`, s: 'under 2% slope' }
  ]).replace('class="ledger', 'class="ledger tr-led') + `</div></div>`;
  out += `<p class="note tr-read">${esc(terrainReading(t, e))}</p>`;
  out += `<p class="src">Terrain: Copernicus DEM GLO-30 (about 30 m surface heights), over ${e.type === 'site' ? 'a 150 m circle around the site' : 'the mapped zone'}; aspect counts only ground steeper than 2%${caveats.length ? `; ${esc(caveats.join('; '))}` : ''}.</p>`;
  return out;
}

/* ---------- vintages (TerraClimate yearly sidecar + researched events) ---------- */
const EV_KIND = {
  frost: 'Frost', hail: 'Hail', heat: 'Heat', drought: 'Drought', rain: 'Rain', fire: 'Fire', smoke: 'Smoke', flood: 'Flood',
  great: 'Great vintage', cool: 'Cool year', mildew: 'Mildew', other: 'Note'
};
const avg = a => { const v = a.filter(x => x != null && !isNaN(x)); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
function vintageSeries(d) {
  const n = d.gst.length, y0 = d.y0, years = Array.from({ length: n }, (_, i) => y0 + i);
  const span = (k, a, b) => avg(years.map((y, i) => (y >= a && y <= b ? d[k]?.[i] : null)));
  const norm = { gst: d.n9120?.gst ?? span('gst', 1991, 2020), hr: span('hr', 1991, 2020), fr: span('fr', 1991, 2020), hd: span('hd', 1991, 2020), gdd: d.n9120?.gdd ?? span('gdd', 1991, 2020), gsp: d.n9120?.gsp ?? span('gsp', 1991, 2020) };
  return { years, n, norm };
}
function vintageHTML(v, ev, e) {
  const d = v.data, { years, n, norm } = vintageSeries(d);
  const an = d.gst.map(g => g - norm.gst);
  const amax = Math.max(1.2, ...an.map(Math.abs));
  const W = n * 4;   // svg units: 4 per year (3 bar + 1 gap)
  const bars = an.map((x, i) => {
    const h = Math.abs(x) / amax * 46, y = x >= 0 ? 50 - h : 50;
    return `<rect x="${i * 4 + 0.5}" y="${y.toFixed(2)}" width="3" height="${Math.max(0.6, h).toFixed(2)}" class="${x >= 0 ? 'vt-w' : 'vt-c'}"/>`;
  }).join('');
  const row = (k, cls) => {
    const arr2 = d[k] || [], m = Math.max(1e-6, ...arr2);
    return arr2.map((x, i) => { const h = (x || 0) / m * 18; return h > 0.05 ? `<rect x="${i * 4 + 0.5}" y="${(20 - h).toFixed(2)}" width="3" height="${h.toFixed(2)}" class="${cls}"/>` : ''; }).join('');
  };
  const byYear = new Map();
  for (const x of ev) { if (!byYear.has(x.year)) byYear.set(x.year, []); byYear.get(x.year).push(x); }
  const marks = [...byYear.entries()].filter(([y]) => y >= years[0] && y <= years[n - 1]).map(([y, list]) =>
    `<span class="vt-m" style="left:${((y - years[0] + 0.5) / n * 100).toFixed(2)}%">${list.slice(0, 3).map(x => `<i class="ek ek-${esc(EV_KIND[x.kind] ? x.kind : 'other')}"></i>`).join('')}</span>`).join('');
  const dec = []; for (let y = Math.ceil(years[0] / 10) * 10; y <= years[n - 1]; y += 10) dec.push(y);
  const axis = dec.map(y => `<span style="left:${((y - years[0] + 0.5) / n * 100).toFixed(2)}%">${y === dec[0] || y % 20 === 0 ? y : `’${String(y).slice(2)}`}</span>`).join('');
  const label = (t, s) => `<p class="vt-lab"><span>${t}</span>${s ? `<span class="mono">${s}</span>` : ''}</p>`;
  const evYears = [...byYear.keys()].sort((a, b) => b - a);
  let out = H.sec('Vintages');
  if (v.inherited) {
    const src = entityOf(v.id);
    out += `<p class="note vt-inh">Weather of <a href="#${esc(v.id)}">${esc(src?.name || v.id)}</a>, which ${e.type === 'site' ? 'holds this site' : 'contains this place'}: the record is too coarse to tell them apart.</p>`;
  }
  out += `<div class="vt" tabindex="0" role="slider" aria-label="Vintage year" aria-valuemin="${years[0]}" aria-valuemax="${years[n - 1]}" aria-valuenow="${years[n - 1]}">
      <div class="vt-ev" aria-hidden="true">${marks}</div>
      ${label('Season warmth', `vs ${fmt(norm.gst, 1)} °C (1991–2020)`)}
      <svg class="vt-gst" viewBox="0 0 ${W} 100" preserveAspectRatio="none" aria-hidden="true"><line x1="0" x2="${W}" y1="50" y2="50" class="vt-0"/>${bars}</svg>
      ${label('Harvest rain', '')}<svg class="vt-row" viewBox="0 0 ${W} 20" preserveAspectRatio="none" aria-hidden="true">${row('hr', 'vt-r')}</svg>
      ${label('Spring frost nights', '')}<svg class="vt-row" viewBox="0 0 ${W} 20" preserveAspectRatio="none" aria-hidden="true">${row('fr', 'vt-f')}</svg>
      ${label('Days over 35 °C', '')}<svg class="vt-row" viewBox="0 0 ${W} 20" preserveAspectRatio="none" aria-hidden="true">${row('hd', 'vt-h')}</svg>
      <div class="vt-axis mono" aria-hidden="true">${axis}</div>
      <i class="vt-cur" aria-hidden="true"></i>
    </div>
    <div class="vt-detail" aria-live="polite"></div>`;
  if (evYears.length) out += `<p class="vt-evy"><span class="lk">Researched vintages</span>${evYears.map(y => `<button type="button" class="chip vt-y" data-y="${y}">${y}${byYear.get(y).map(x => `<i class="ek ek-${esc(EV_KIND[x.kind] ? x.kind : 'other')}" aria-hidden="true"></i>`).slice(0, 3).join('')}</button>`).join('')}</p>`;
  const sh = e.lp && e.lp[1] < 0;
  out += `<p class="src">Weather: TerraClimate monthly data ${years[0]}–${years[n - 1]} (CC0), averaged over the zone. Harvest years run April to October${sh ? ', or October to April in the south, labelled by the April year' : ''}. Harvest rain is September and October${sh ? ' (March and April here)' : ''}; frost nights after budburst and days over 35 °C are calibrated estimates from monthly data (48 weather stations), good for comparing years, not for counting nights.${sh ? ' Before 1979 the Southern Hemisphere record runs 0.3 to 1.5 °C warm, so warming here is understated.' : ''}${ev.length ? ' Notes: published vintage reports, linked on each.' : ''}</p>`;
  return out;
}
function bindVintage(el, v, ev, e) {
  const d = v.data, { years, n, norm } = vintageSeries(d);
  const box = el.querySelector('.vt'), det = el.querySelector('.vt-detail'), cur = el.querySelector('.vt-cur');
  const byYear = new Map();
  for (const x of ev) { if (!byYear.has(x.year)) byYear.set(x.year, []); byYear.get(x.year).push(x); }
  const sgn = x => VM.fmt.signed(x, 1, ' °C');
  const show = y => {
    const i = clamp(y - years[0], 0, n - 1); y = years[i];
    cur.style.left = ((i + 0.5) / n * 100).toFixed(2) + '%';
    box.setAttribute('aria-valuenow', y);
    const g = d.gst[i], an = g - norm.gst;
    const rk = [...d.gst].sort((a, b) => b - a).indexOf(g) + 1;
    const facts = [
      `<b class="mono">${g.toFixed(1)} °C</b> season mean, <span class="mono ${an >= 0 ? 'vt-tw' : 'vt-tc'}">${sgn(an)}</span> on 1991–2020${rk <= 5 ? ` (${rk === 1 ? 'warmest' : `${rk}${['', 'st', 'nd', 'rd'][rk] || 'th'} warmest`} since ${years[0]})` : rk > n - 5 ? ` (${n - rk === 0 ? 'coolest' : `${n - rk + 1}${['', 'st', 'nd', 'rd'][n - rk + 1] || 'th'} coolest`} since ${years[0]})` : ''}`,
      d.gdd ? `<span class="mono">${fmt(d.gdd[i])}</span> degree days` : '',
      d.hr ? `harvest rain <span class="mono">${fmt(d.hr[i])} mm</span> (usual ${fmt(norm.hr)})` : '',
      d.fr ? `<span class="mono">${fmt(d.fr[i])}</span> frost night${d.fr[i] === 1 ? '' : 's'} after budburst` : '',
      d.hd ? `<span class="mono">${fmt(d.hd[i])}</span> day${d.hd[i] === 1 ? '' : 's'} over 35 °C (usual ${fmt(norm.hd)})` : ''
    ].filter(Boolean);
    const evs = byYear.get(y) || [];
    det.innerHTML = `<p class="vt-yr"><span class="vt-year">${y}</span> ${facts.join(' · ')}</p>` + evs.map(x => {
      const from = x.from && x.from !== e.id && x.rel !== 'own' ? (entityOf(x.from)?.name || x.from) : '';
      return `<p class="vt-note"><span class="vt-kind"><i class="ek ek-${esc(EV_KIND[x.kind] ? x.kind : 'other')}" aria-hidden="true"></i>${esc(EV_KIND[x.kind] || 'Note')}${from ? ` · <span class="vt-from">${x.rel === 'regional' || x.rel === 'region' ? 'regional' : 'wider zone'}: ${esc(from)}</span>` : ''}</span> ${inl(x.text)}${x.src && /^https?:/.test(x.src) ? ` <a href="${esc(x.src)}" target="_blank" rel="noopener noreferrer" class="vt-src">source</a>` : ''}</p>`;
    }).join('');
    el.querySelectorAll('.vt-y').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.y === y)));
    show.y = y;
  };
  const yAt = ev2 => { const r = box.getBoundingClientRect(); return years[0] + Math.floor(clamp((ev2.clientX - r.left) / r.width, 0, 0.9999) * n); };
  box.addEventListener('pointerdown', ev2 => { show(yAt(ev2)); });
  box.addEventListener('pointermove', ev2 => { if (ev2.pointerType === 'mouse' || ev2.buttons) show(yAt(ev2)); });
  box.addEventListener('keydown', k => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowDown: -1, ArrowUp: 1, PageDown: -10, PageUp: 10 }[k.key];
    if (step) { k.preventDefault(); show(show.y + step); }
    if (k.key === 'Home') { k.preventDefault(); show(years[0]); }
    if (k.key === 'End') { k.preventDefault(); show(years[n - 1]); }
  });
  el.querySelectorAll('.vt-y').forEach(b => b.addEventListener('click', () => show(+b.dataset.y)));
  const evYears = [...byYear.keys()].filter(y => y >= years[0] && y <= years[n - 1]).sort((a, b) => b - a);
  show(evYears[0] ?? years[n - 1]);
}

/* ---------- climate drift and the time-travel twin ---------- */
function driftHTML(dr, e) {
  const d = dr.data;
  const g0 = d.gst6190, g1 = d.gst9120, g2 = d.gstRecent;
  if (g0 == null || g2 == null) return '';
  const rec = arr(d.recent).length === 2 ? `${d.recent[0]}–${String(d.recent[1]).slice(2)}` : 'recent';
  const lo = Math.min(g0, g1 ?? g0, g2) - 0.6, hi = Math.max(g0, g1 ?? g0, g2) + 0.6;
  const x = v => ((v - lo) / (hi - lo) * 100).toFixed(1);
  const dg = g2 - g0;
  let out = H.sec('Climate drift');
  if (dr.inherited) out += `<p class="note">Figures for <a href="#${esc(dr.id)}">${esc(entityOf(dr.id)?.name || dr.id)}</a>, which contains this place.</p>`;
  out += `<div class="dr" role="img" aria-label="Growing-season mean temperature ${g0.toFixed(1)} degrees in 1961 to 1990, ${g1 != null ? g1.toFixed(1) + ' in 1991 to 2020, ' : ''}${g2.toFixed(1)} in ${rec}">
      <div class="dr-bar" style="background:linear-gradient(90deg,var(--c1),var(--c3))"></div>
      <span class="dr-arrow${g2 < g0 ? ' neg' : ''}" style="left:${Math.min(x(g0), x(g2))}%;width:${Math.abs(x(g2) - x(g0)).toFixed(1)}%"></span>
      <span class="dr-pt p0" style="left:${x(g0)}%"><i></i><b class="mono">${g0.toFixed(1)}</b><small>1961–90</small></span>
      ${g1 != null ? `<span class="dr-pt p1" style="left:${x(g1)}%"><i></i><b class="mono">${g1.toFixed(1)}</b><small>1991–2020</small></span>` : ''}
      <span class="dr-pt p2" style="left:${x(g2)}%"><i></i><b class="mono">${g2.toFixed(1)} °C</b><small>${rec}</small></span>
    </div>`;
  out += H.ledger([
    { k: 'Warming', v: VM.fmt.signed(dg, 1, ' °C'), s: `season mean, 1961–90 to ${rec}` },
    d.gdd6190 != null && d.gddRecent != null && { k: 'Degree days', v: VM.fmt.signed(d.gddRecent - d.gdd6190, 0), s: `${fmt(d.gdd6190)} → ${fmt(d.gddRecent)}` },
    d.gsp6190 != null && d.gsp9120 != null && { k: 'Season rain', v: `${VM.fmt.signed((d.gsp9120 / d.gsp6190 - 1) * 100, 0)}%`, s: `${fmt(d.gsp6190)} → ${fmt(d.gsp9120)} mm (to 1991–2020)` }
  ]);
  const tw = d.twin && entityOf(d.twin.id), tr = d.twinRev && entityOf(d.twinRev.id);
  const nm = dr.inherited ? (entityOf(dr.id)?.name || e.name) : e.name;
  if (tw && tw.name !== tw.id) out += `<p class="dr-twin"><span class="lk">Time-travel twin</span>In ${esc(rec)}, ${esc(nm)} grew its grapes in the climate that <a href="#${esc(d.twin.id)}">${esc(tw.name)}</a>${tw.country && tw.country !== e.country ? ` (${esc(countryName(tw.country))})` : ''} had in 1961–1990.${d.twin.note ? `<small>${esc(d.twin.note)}</small>` : ''}</p>`;
  if (tr && tr.name !== tr.id) out += `<p class="dr-twin rev"><span class="lk">Where its old climate went</span>The ${esc(nm)} of 1961–1990 now has a match in <a href="#${esc(d.twinRev.id)}">${esc(tr.name)}</a>${tr.country && tr.country !== e.country ? ` (${esc(countryName(tr.country))})` : ''}.${d.twinRev.note ? `<small>${esc(d.twinRev.note)}</small>` : ''}</p>`;
  const sh = e.lp && e.lp[1] < 0;
  out += `<p class="src">TerraClimate yearly data, growing-season means. Twins match warmth, degree days and season rain only; soils, light and rainfall timing differ.${sh ? ' Southern Hemisphere warming is understated, because the record runs warm before 1979.' : ''}</p>`;
  return out;
}

/* ---------- rules (regulations sidecar) ---------- */
const REG_F = [['varieties', 'Grapes'], ['styles', 'Styles'], ['min_alcohol', 'Minimum alcohol'], ['max_yield', 'Maximum yield'], ['ageing', 'Ageing'], ['release', 'Release'], ['sweetness', 'Sweetness'], ['labelling', 'Labelling'], ['other', 'Also']];
function regsDL(r) {
  const rows = REG_F.filter(([k]) => r[k]).map(([k, l]) => `<dt>${esc(l)}</dt><dd class="txt">${inl(r[k])}</dd>`).join('');
  return rows ? `<dl class="dl rg-dl">${rows}</dl>` : '';
}
function regsHTML(r, e) {
  const own = r.data, nat = r.national;
  if (!own && !nat) return '';
  let out = H.sec('The rules');
  if (own) {
    if (r.inherited) out += `<p class="note">Rules of <a href="#${esc(r.id)}">${esc(entityOf(r.id)?.name || r.id)}</a>, which covers this place.</p>`;
    out += regsDL(own);
    const src = arr(own.src).filter(s => s && s.url && /^https?:/.test(s.url));
    out += `<p class="src">${src.length ? `From ${src.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a>`).join(', ')}` : 'From the official specification'}${own.verified ? `, checked ${esc(own.verified)}` : ''}. A summary, not legal advice: the specification is the reference.</p>`;
  }
  if (nat && typeof nat === 'object') {
    const body = regsDL(nat);
    if (body) out += `<details class="rg-nat"${own ? '' : ' open'}><summary>National rules · ${esc(countryName(e.country))}</summary>${body}${arr(nat.src).length ? `<p class="src">${arr(nat.src).filter(s => s && s.url).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a>`).join(', ')}</p>` : ''}</details>`;
  }
  return out;
}

/* ---------- registration ---------- */
(function registerSections() {
  VM.panel.addSection(['appellation', 'site', 'region', 'country', 'grape', 'event'], async (el, e) => {
    if (VM.mode !== 'gh') return false;
    const list = (await VM.data.photos(e.id)).filter(p => p && p.thumb && /^https:\/\/upload\.wikimedia\.org\//.test(p.thumb) && p.page);
    if (!list.length) return false;
    el.innerHTML = photoHTML(list.slice(0, 4), e.name);
    bindPhotos(el, list.slice(0, 4), e.name);
  }, { id: 'photos', slot: 'hero', order: 10 });

  VM.panel.addSection(['appellation', 'site'], async (el, e) => {
    const t = await VM.data.topo(e.id);
    if (!t || t.e == null) return false;
    el.innerHTML = topoHTML(t, e);
  }, { id: 'terrain', slot: 'mid', order: 10 });

  VM.panel.addSection(['appellation', 'site', 'region'], async (el, e) => {
    const [v, ev] = await Promise.all([VM.data.vintage(e.id), VM.data.events(e.id)]);
    if (!v || !arr(v.data.gst).length) return false;
    el.innerHTML = vintageHTML(v, ev, e);
    bindVintage(el, v, ev, e);
  }, { id: 'vintage', slot: 'mid', order: 20 });

  VM.panel.addSection(['appellation', 'site', 'region'], async (el, e) => {
    let dr = await VM.data.drift(e.id);
    if (!dr) {
      const v = await VM.data.vintage(e.id);
      const d = v?.data;
      if (d && d.n6190 && d.n9120) {
        const { years } = vintageSeries(d);
        const rec = years.slice(-15), recG = avg(rec.map(y => d.gst[y - years[0]]));
        dr = { id: v.id, inherited: v.inherited, data: { gst6190: d.n6190.gst, gst9120: d.n9120.gst, gstRecent: recG, recent: [rec[0], rec[rec.length - 1]], gdd6190: d.n6190.gdd, gddRecent: avg(rec.map(y => d.gdd[y - years[0]])), gsp6190: d.n6190.gsp, gsp9120: d.n9120.gsp } };
      }
    }
    if (!dr) return false;
    el.innerHTML = driftHTML(dr, e);
  }, { id: 'drift', slot: 'mid', order: 30 });

  VM.panel.addSection(['appellation', 'site'], async (el, e) => {
    if (e.type === 'site' && !e.app) return false;
    const r = await VM.data.regs(e.type === 'site' ? e.app : e.id);
    if (!r) return false;
    const html = regsHTML(r, e);
    if (!html) return false;
    el.innerHTML = html;
  }, { id: 'rules', slot: 'end', order: 10 });

  VM.panel.addSection(['country'], async (el, e) => {
    const j = await VM.data.json(`data/regs/${e.id}.json`);
    const nat = j?._national;
    if (!nat || typeof nat !== 'object') return false;
    const body = regsDL(nat);
    if (!body) return false;
    el.innerHTML = H.sec('National wine rules') + body + (arr(nat.src).length ? `<p class="src">${arr(nat.src).filter(s => s && s.url).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a>`).join(', ')}</p>` : '');
  }, { id: 'rules-national', slot: 'mid', order: 10 });
})();

/* ---------- About: v2 sources and licences ---------- */
function aboutV2HTML() {
  const li = (t, l, u) => `<li class="src" style="padding:8px 0">${u ? `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>` : esc(t)}${l ? `<br><span class="mono" style="font-size:12px">${esc(l)}</span>` : ''}</li>`;
  let out = H.sec('Terrain, vintages, rules and photos');
  out += `<ul class="list">
    ${li('Slope, aspect and elevation statistics produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved. Neither the European Union, ESA nor the data provider is liable for any use of these data.', 'Copernicus DEM GLO-30 and GLO-90 licence', 'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM')}
    ${li('TerraClimate yearly weather, 1950 to 2025 (Abatzoglou, Dobrowski, Parks and Hegewisch 2018, Scientific Data 5:170191), built on ERA5 and WorldClim', 'CC0', 'https://www.climatologylab.org/terraclimate.html')}
    ${li('GHCN-Daily weather stations (Menne et al. 2012, NOAA NCEI), used only to calibrate and check the frost and heat estimates', 'public domain', 'https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily')}
    ${li('Vintage notes: published vintage reports and charts, each linked from its note', '', '')}
    ${li('Rules: summarised from the official specifications (EU eAmbrosia register, national registers and laws), each linked from its card. Summaries, not legal advice.', '', 'https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/')}
    ${VM.mode === 'gh' ? li('Photos: Wikimedia Commons; each photo shows its author and licence', 'CC BY, CC BY-SA, CC0 or public domain, per photo', 'https://commons.wikimedia.org') : ''}
  </ul>`;
  out += H.prose('How to read the vintages. Each bar is a growing season (April to October in the north, October to April in the south, labelled by the April year), averaged over the zone from monthly data on a grid of about 4 km. Frost nights after budburst and days over 35 °C are estimates calibrated against 48 weather stations: good for comparing years at one place, blind to a single radiative frost night, hail or the timing of rain within a month. Before 1979 the Southern Hemisphere record runs 0.3 to 1.5 °C warm, so warming there is understated. A fine unit or a site shares the weather of the appellation around it.\n\nHow to read the terrain. Slope and aspect come from 30 m surface heights, so woods and buildings roughen them slightly. For large zones they describe the whole legal area, ridges and valley floors included, not just the vineyards.');
  if (VM.mode === 'gh') {
    out += H.sec('Base maps, imagery and terrain');
    out += `<p class="note" style="margin-top:6px">Sentinel-2 imagery covers the world. From zoom 12.5, national aerial photographs take over inside France, Switzerland, Austria, Spain, mainland Portugal, Luxembourg, the United States, the German states of Rhineland-Palatinate, Hesse, Baden-Württemberg and Bavaria, and New South Wales. The topographic map uses national maps in France, Switzerland, Austria, Spain and the United States, and OpenTopoMap elsewhere.</p>`;
    out += `<ul class="list">${Object.entries(CREDIT).filter(([k]) => k !== 'maptiler' || MT()).map(([, c]) => li(c.t, c.l, c.u)).join('')}
      ${li('Contour lines drawn in the browser by maplibre-contour (Michael Barry)', 'BSD-3-Clause', 'https://github.com/onthegomap/maplibre-contour')}
      ${li('River journeys follow Natural Earth river lines, smoothed', 'public domain', 'https://www.naturalearthdata.com')}
    </ul>`;
    out += H.sec('Install') + installHTML();
  }
  return out;
}
