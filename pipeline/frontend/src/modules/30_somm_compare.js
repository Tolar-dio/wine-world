/* Vitis Mundi v2, sommelier tools: Compare (#compare, #compare-<id>--<id>--<id>) and climate twins.
   Up to three places side by side on shared scales: photo, climate, terrain, area, styles, category, grapes
   (shared and unique), rules from data/regs, a vintage overlay of growing-season anomalies, and a plain-language
   paragraph on how they differ. Climate twins: the nearest appellations worldwide in standardised climate space,
   shown on every profile and here, with "show on map". */
(() => {
  if (!window.VM || !VM.somm) return;
  const SM = VM.somm;
  const { esc, fold, arr, num, clamp } = VM.util;
  const MAX = 3;
  const TYPES = ['appellation', 'site', 'region', 'country'];
  let picks = SM.local.get('compare', []).filter(x => typeof x === 'string').slice(0, MAX);
  const savePicks = () => SM.local.set('compare', picks);
  const hashFor = ids => ids.length ? 'compare-' + ids.join('--') : 'compare';
  SM.compareAdd = id => {
    if (!picks.includes(id)) { picks.push(id); if (picks.length > MAX) picks.shift(); }
    savePicks();
    VM.go(hashFor(picks));
  };

  /* ---------- profile section: Compare button + climate twins ---------- */
  VM.panel.addSection(TYPES, async (el, e) => {
    const inList = picks.includes(e.id);
    const others = picks.filter(x => x !== e.id);
    const label = others.length ? `Compare with ${others.length === 1 ? SM.nameOf(others[0]) : `${others.length} places`}` : 'Compare';
    el.innerHTML = `<div class="sm-cmpbar"><button type="button" class="btn small" data-cmp="go">${SM.ICON.compare} ${esc(label)}</button>${!inList && others.length && others.length < MAX ? `<button type="button" class="btn small ghost" data-cmp="add">Add to the list</button>` : ''}</div>`;
    el.querySelector('[data-cmp="go"]').addEventListener('click', () => SM.compareAdd(e.id));
    el.querySelector('[data-cmp="add"]')?.addEventListener('click', () => { picks.push(e.id); savePicks(); VM.toast(`${e.name} added to Compare (${picks.length} of ${MAX})`); el.querySelector('[data-cmp="add"]').remove(); });
  }, { id: 'somm-compare', slot: 'hero', order: 55 });

  VM.panel.addSection(['appellation', 'site', 'region', 'country'], async (el, e) => {
    const res = await SM.twins(e.id, { k: 5 });
    if (!res.list.length) return false;
    el.innerHTML = twinsHTML(res, { compact: true });
    bindTwins(el, res);
  }, { id: 'somm-twins', slot: 'mid', order: 60 });

  function twinsHTML(res, o = {}) {
    const p = res.place;
    const basis = p.type === 'site' ? ` (the climate of ${esc(SM.nameOf(p.appId))})` : p.basis === 'median' ? ` (the median of its ${p.n} appellations)` : '';
    return `${VM.h.sec('Climate twins')}
      <p class="note sm-tw-lead">The appellations elsewhere in the world whose growing season is most like ${esc(p.name)}${basis}: warmth, heat summation, rain and the day–night swing, each measured against the spread of the whole atlas.</p>
      <ol class="sm-twins">${res.list.map((t, i) => `<li><a class="row" href="#${esc(t.id)}"><span class="sm-tw-n mono" aria-hidden="true">${i + 1}</span><span class="row-name">${esc(t.name)}<small>${esc([VM.data.indexById.get(t.id)?.cat, VM.data.countryName(t.country)].filter(Boolean).join(' · '))}</small><span class="sm-tw-d">${esc(SM.twinDiff(p, t.row) || 'nearly identical')}</span></span><span class="row-meta" title="distance in standard deviations">${esc(VM.fmt.num(t.d, 2))}</span></a></li>`).join('')}</ol>
      ${res.other ? `<p class="note sm-tw-other">Closest in the ${SM.world(res.other.country) === 'new' ? 'New' : 'Old'} World: <a href="#${esc(res.other.id)}">${esc(res.other.name)}</a> (${esc([VM.data.indexById.get(res.other.id)?.cat, VM.data.countryName(res.other.country)].filter(Boolean).join(', '))}), at <span class="mono">${esc(VM.fmt.num(res.other.d, 2))}</span>: ${esc(SM.twinDiff(p, res.other.row) || 'nearly identical')}.</p>` : ''}
      <div class="btn-row sm-tw-act"><button type="button" class="btn small" data-tw="map">Show on map</button>${o.compact ? `<button type="button" class="btn small ghost" data-tw="cmp">Compare with the closest</button>` : ''}</div>
      <p class="src">Distance: the root mean square of differences in standard deviations (GST, degree days, Huglin, warmest month, annual and season rain, day–night swing), with temperature down-weighted because four of the seven measure it. Its own country and nested appellations are left out. Twins share climate, not soil or light.</p>`;
  }
  function bindTwins(el, res) {
    el.querySelector('[data-tw="map"]')?.addEventListener('click', () => {
      const ids = res.list.map(t => t.id).concat(res.other ? [res.other.id] : []);
      const own = res.place.appId || res.place.id;
      SM.map.light([...ids, ...(VM.data.typeOf(own) === 'appellation' ? [own] : [])], { prefix: 'tw:', owner: 'twins', label: `Twins of ${res.place.name}`, dimOthers: true });
      if (res.place.lp) SM.map.ring('tw:self', res.place.lp[0], res.place.lp[1], 's1');
      VM.frame([...ids, res.place.id], { maxZoom: 6 });
      if (VM.isPhone()) VM.panel.snap('peek');
    });
    el.querySelector('[data-tw="cmp"]')?.addEventListener('click', () => { picks = [res.place.id, res.list[0].id]; savePicks(); VM.go(hashFor(picks)); });
  }

  /* ---------- the Compare view ---------- */
  let EL = null, GEN = 0, YEAR = SM.local.get('cmpyear', null);
  const off = () => { EL = null; GEN++; };
  VM.on('view', v => { if (v.id !== 'compare') off(); });
  VM.on('profile:open', off);
  VM.on('panel:close', off);
  VM.panel.register('compare', {
    title: 'Compare', crumb: 'Compare places', snap: 'full',
    async render(el, ctx) {
      EL = el;
      if (ctx.arg) {
        const ids = ctx.arg.split('--').filter(id => VM.data.typeOf(id) && TYPES.includes(VM.data.typeOf(id))).slice(0, MAX);
        if (ids.length) { picks = ids; savePicks(); }
      }
      el.innerHTML = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Compare</h2></div><p class="note">Gathering the numbers…</p>`;
      await draw();
    },
    onClose() { off(); SM.map.clearRings('cmp:'); }
  });
  VM.nav.add({ id: 'compare', label: 'Compare', icon: SM.ICON.compare, order: 62, title: 'Compare up to three places' });

  async function draw() {
    const el = EL; if (!el) return;
    const g = ++GEN;
    await Promise.race([VM.data.loadIndex(), VM.util.sleep(8000)]);
    /* polygons give the clim block when the attribute table is missing; load the countries involved */
    const isos = [...new Set(picks.map(id => VM.data.isoOf(id)).filter(Boolean))];
    await Promise.race([Promise.all(isos.map(i => SM.map.ensure(i))), VM.util.sleep(6000)]);
    const places = (await Promise.all(picks.map(id => SM.place(id)))).filter(Boolean);
    if (g !== GEN || EL !== el) return;
    const head = `<div class="head"><p class="eyebrow">Sommelier tools</p><h2 class="title">Compare</h2>${places.length < 2 ? `<p class="tagline">Two or three places side by side, on the same scales.</p>` : ''}</div>`;
    let out = head + pickerHTML(places);
    if (!places.length) {
      out += `<p class="note">Pick a place above, or use the Compare button on any profile. Some pairs worth trying:</p>
        <ul class="list">${[['fr-gevrey-chambertin', 'us-dundee-hills', 'Burgundy and Oregon Pinot'], ['fr-cote-rotie', 'au-barossa-valley', 'Syrah, cool and warm'], ['it-barolo', 'it-barbaresco', 'Nebbiolo neighbours'], ['fr-sauternes', 'hu-tokaj', 'Two botrytis climates'], ['de-mosel', 'au-clare-valley', 'Riesling, north and south']]
          .map(([a, b, l]) => `<li><button type="button" class="row" data-pair="${a}--${b}"><span class="row-name">${esc(l)}<small>${esc(SM.nameOf(a))} and ${esc(SM.nameOf(b))}</small></span></button></li>`).join('')}</ul>`;
      el.innerHTML = out; bindView(el, places); return;
    }
    out += `<div class="sm-cmp" style="--n:${places.length}">`;
    out += photosHTML(places);
    out += await prosePara(places);
    out += climateHTML(places);
    out += await terrainHTML(places);
    out += placeHTML(places);
    out += await grapesHTML(places);
    out += await rulesHTML(places);
    out += await vintageHTML(places);
    if (places.length === 1) {
      const res = await SM.twins(places[0].id, { k: 6, place: places[0] });
      if (res.list.length) out += `<div class="sm-cmp-tw">${twinsHTML(res)}</div>`;
    } else {
      const all = await Promise.all(places.map(p => SM.twins(p.id, { k: 3, place: p })));
      if (all.some(r => r.list.length)) {
        out += `${VM.h.sec('Climate twins')}<p class="note sm-tw-lead">For each place, the three appellations elsewhere whose growing season is closest. Tap a twin to compare it with its place.</p>`;
        out += all.map((r, i) => r.list.length ? `<p class="lk sm-g-h"><i class="sm-sw s${i + 1}" aria-hidden="true"></i> ${esc(places[i].name)}</p><ol class="sm-twins">${r.list.map((t, j) => `<li><button type="button" class="row" data-pair="${esc(places[i].id)}--${esc(t.id)}"><span class="sm-tw-n mono" aria-hidden="true">${j + 1}</span><span class="row-name">${esc(t.name)}<small>${esc([VM.data.indexById.get(t.id)?.cat, VM.data.countryName(t.country)].filter(Boolean).join(' · '))}</small><span class="sm-tw-d">${esc(SM.twinDiff(r.place, t.row) || 'nearly identical')}</span></span><span class="row-meta">${esc(VM.fmt.num(t.d, 2))}</span></button></li>`).join('')}</ol>` : '').join('');
      }
    }
    out += `</div>`;
    if (g !== GEN || EL !== el) return;
    el.innerHTML = out;
    bindView(el, places);
    fillPhotos(el, places);
  }

  function key(places) {
    return `<ul class="sm-key" aria-label="Places compared">${places.map((p, i) => `<li><i class="sm-sw s${i + 1}" aria-hidden="true"></i><a href="#${esc(p.id)}">${esc(p.name)}</a></li>`).join('')}</ul>`;
  }
  function pickerHTML(places) {
    return `<div class="sm-picks">${places.map((p, i) => `<div class="sm-pk s${i + 1}"><i class="sm-sw s${i + 1}" aria-hidden="true"></i><span class="sm-pk-n"><a href="#${esc(p.id)}">${esc(p.name)}</a><small>${esc(SM.metaOf(p.id))}</small></span><button type="button" class="icon-btn" data-rm="${esc(p.id)}" aria-label="Remove ${esc(p.name)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>`).join('')}
      ${places.length < MAX ? `<button type="button" class="btn ghost sm-pk-add" data-add="1">+ Add a place</button>` : ''}
      ${places.length ? `<div class="btn-row sm-pk-act"><button type="button" class="btn small" data-act="map">Show on map</button>${places.length > 1 ? `<button type="button" class="btn small ghost" data-act="clear">Clear</button>` : ''}</div>` : ''}</div>`;
  }

  /* ---------- photos (Wikimedia Commons sidecars, Pages build only) ---------- */
  function photosHTML(places) {
    return `<div class="sm-ph" aria-hidden="false">${places.map((p, i) => `<figure class="sm-ph-f s${i + 1}" data-ph="${esc(p.id)}"><div class="sm-ph-i"></div><figcaption><i class="sm-sw s${i + 1}" aria-hidden="true"></i>${esc(p.name)}</figcaption></figure>`).join('')}</div>`;
  }
  async function fillPhotos(el, places) {
    for (const p of places) {
      const fig = el.querySelector(`[data-ph="${CSS.escape(p.id)}"]`);
      if (!fig) continue;
      let ph = [];
      if (VM.online) {
        for (const id of await VM.data.chain(p.id).catch(() => [p.id])) { ph = await VM.data.photos(id); if (ph.length) break; }
      }
      const x = ph[0];
      const box = fig.querySelector('.sm-ph-i');
      if (x && x.thumb && /^https:\/\/upload\.wikimedia\.org\//.test(x.thumb)) {
        box.innerHTML = `<img src="${esc(x.thumb)}" alt="${esc(x.caption || p.name)}" loading="lazy" decoding="async">`;
        /* a thumbnail that fails (moved file, blocked host) falls back to the latitude plate, without a credit */
        box.querySelector('img').addEventListener('error', () => { box.classList.add('none'); box.innerHTML = latPlate(p); fig.querySelector('.sm-ph-c')?.remove(); }, { once: true });
        fig.insertAdjacentHTML('beforeend', `<p class="sm-ph-c">${x.page ? `<a href="${esc(x.page)}" target="_blank" rel="noopener noreferrer">${esc(x.author || 'Wikimedia Commons')}</a>` : esc(x.author || '')}${x.license ? `, ${x.license_url ? `<a href="${esc(x.license_url)}" target="_blank" rel="noopener noreferrer">${esc(x.license)}</a>` : esc(x.license)}` : ''}</p>`);
      } else {
        box.classList.add('none');
        box.innerHTML = latPlate(p);
      }
    }
  }
  /* no photo: a small latitude plate instead (where on the globe, in the atlas's own voice) */
  function latPlate(p) {
    if (p.lat == null) return '';
    const y = 50 - p.lat / 90 * 46;
    return `<svg viewBox="0 0 100 100" class="sm-plate" role="img" aria-label="${esc(VM.fmt.lat(p.lat, 1))}"><circle cx="50" cy="50" r="46"/><path d="M4 50h92" class="eq"/><path d="M8 ${50 - 30 / 90 * 46}h84M8 ${50 + 30 / 90 * 46}h84" class="tr"/><path d="M6 ${y}h88" class="me"/><text x="50" y="${y < 30 ? y + 12 : y - 5}" text-anchor="middle">${esc(VM.fmt.lat(p.lat, 1))}</text></svg>`;
  }

  /* ---------- shared scales ---------- */
  const SCALES = [
    { k: 'gst', lo: 12, hi: 23, ticks: [13, 15, 17, 19, 21], ramp: true, note: 'Mean temperature, April to October (October to April in the south)' },
    { k: 'gdd', lo: 500, hi: 3000, ticks: [850, 1389, 1668, 1945, 2223], tickL: ['I', 'II', 'III', 'IV', 'V'], note: 'Winkler degree days above 10 °C; ticks mark the region boundaries' },
    { k: 'hi', lo: 1000, hi: 3200, ticks: [1500, 1800, 2100, 2400, 2700], note: 'Huglin heliothermal index' },
    { k: 'gsp', lo: 0, hi: 900, ticks: [200, 400, 600, 800], note: 'Rain during the growing season' },
    { k: 'prec', lo: 0, hi: 1800, ticks: [400, 800, 1200, 1600], note: 'Rain over the whole year' },
    { k: 'dtr', lo: 6, hi: 20, ticks: [8, 12, 16], note: 'Mean daily range between maximum and minimum' },
    { k: 'mjt', lo: 15, hi: 28, ticks: [17, 20, 23, 26], note: 'Mean temperature of the warmest month' }
  ];
  function dotRow(s, places) {
    const vals = places.map(p => p.vals[s.k]);
    if (vals.every(v => v == null)) return '';
    const m = SM.META[s.k];
    const pos = v => clamp((v - s.lo) / (s.hi - s.lo) * 100, 0, 100);
    /* labels under the dots, nudged apart when they collide */
    const order = places.map((p, i) => [i, vals[i]]).filter(x => x[1] != null).sort((a, b) => a[1] - b[1]);
    const xs = order.map(([i, v]) => [i, pos(v)]);
    for (let j = 1; j < xs.length; j++) if (xs[j][1] - xs[j - 1][1] < 17) xs[j][1] = xs[j - 1][1] + 17;
    const over = xs.length ? xs[xs.length - 1][1] - 98 : 0;
    if (over > 0) for (const x of xs) x[1] -= over;
    const labX = new Map(xs.map(([i, x]) => [i, Math.max(2, x)]));
    return `<div class="sm-sc" role="img" aria-label="${esc(m.label)}: ${esc(places.map((p, i) => `${p.name} ${vals[i] == null ? 'no data' : SM.fmtv(s.k, vals[i])}`).join(', '))}">
      <div class="sm-sc-h"><span class="lk">${esc(m.label)}</span></div>
      <div class="sm-sc-t${s.ramp ? ' ramp' : ''}">${s.ticks.map((t, j) => `<i class="tk" style="left:${pos(t)}%"></i><span class="tl mono" style="left:${pos(t)}%">${esc(s.tickL ? s.tickL[j] : VM.fmt.num(t))}</span>`).join('')}
        ${places.map((p, i) => vals[i] == null ? '' : `<b class="dot s${i + 1}" style="left:${pos(vals[i])}%" title="${esc(p.name)}: ${esc(SM.fmtv(s.k, vals[i]))}"></b>`).join('')}</div>
      <div class="sm-sc-v">${places.map((p, i) => vals[i] == null ? '' : `<span class="mono" style="left:${labX.get(i)}%"><i class="sm-sw s${i + 1}" aria-hidden="true"></i>${esc(SM.fmtv(s.k, vals[i]))}</span>`).join('')}</div>
    </div>`;
  }
  function climateHTML(places) {
    const any = places.some(p => p.vals.gst != null);
    if (!any) return `${VM.h.sec('Climate')}<p class="note">No climate figures for these places yet.</p>`;
    const notes = places.filter(p => p.basis !== 'own').map(p => p.basis === 'app' ? `${p.name} uses the climate of ${SM.nameOf(p.appId)}` : `${p.name} is the median of ${SM.plural(p.n, 'appellation')}`);
    return `${VM.h.sec('Climate on shared scales')}${key(places)}
      ${SCALES.map(s => dotRow(s, places)).join('')}
      ${winklerLine(places)}
      <p class="src">TerraClimate 1991–2020 normals averaged over each mapped zone.${notes.length ? ' ' + esc(notes.join('; ')) + '.' : ''}</p>`;
  }
  function winklerLine(places) {
    const r = places.map(p => p.vals.gdd != null ? `${p.name}: Winkler ${SM.WK[SM.wkIdx(p.vals.gdd)]}, Huglin ${SM.hiName(p.vals.hi)}` : null).filter(Boolean);
    return r.length ? `<p class="note sm-wk">${esc(r.join(' · '))}</p>` : '';
  }

  /* ---------- terrain: elevation bands, slope, aspect roses ---------- */
  async function terrainHTML(places) {
    const topo = await Promise.all(places.map(p => VM.data.topo(p.id).catch(() => null)));
    const elev = places.map((p, i) => topo[i] ? { lo: topo[i].e5, mid: topo[i].e, hi: topo[i].e95 } : p.entity?.clim?.elev_min != null ? { lo: p.entity.clim.elev_min, mid: p.vals.elev, hi: p.entity.clim.elev_max } : p.vals.elev != null ? { lo: null, mid: p.vals.elev, hi: null } : null);
    if (!elev.some(Boolean) && !topo.some(Boolean)) return '';
    const top = Math.max(500, ...elev.filter(Boolean).map(e => e.hi ?? e.mid ?? 0));
    const H = Math.ceil(top / 250) * 250;
    const y = v => 100 - clamp(v / H * 100, 0, 100);
    const bands = `<div class="sm-el" role="img" aria-label="Elevation: ${esc(places.map((p, i) => elev[i] ? `${p.name} ${elev[i].lo != null ? `${VM.fmt.num(elev[i].lo)} to ${VM.fmt.num(elev[i].hi)} m` : `${VM.fmt.num(elev[i].mid)} m mean`}` : `${p.name} no data`).join(', '))}">
      <div class="sm-el-ax mono"><span>${VM.fmt.num(H)} m</span><span>${VM.fmt.num(H / 2)}</span><span>0</span></div>
      <div class="sm-el-plot">${[0.5].map(f => `<i class="g" style="top:${(1 - f) * 100}%"></i>`).join('')}${places.map((p, i) => {
        const e = elev[i]; if (!e) return `<div class="sm-el-c"><span class="na">no data</span></div>`;
        const t = y(e.hi ?? e.mid), b = y(e.lo ?? e.mid);
        return `<div class="sm-el-c"><b class="bar s${i + 1}" style="top:${t}%;height:${Math.max(1.5, b - t)}%"></b>${e.mid != null ? `<i class="mid" style="top:${y(e.mid)}%"></i>` : ''}<span class="v mono" style="top:${Math.max(0, t - 9)}%">${VM.fmt.num(e.mid ?? e.hi)} m</span></div>`;
      }).join('')}</div></div>
      <p class="note">${topo.some(Boolean) ? 'Bars run from the 5th to the 95th percentile of elevation over the zone (Copernicus DEM, 30 m); the tick is the mean.' : 'Bars show the lowest to highest point of the zone on a 1 km model; the tick is the mean.'}</p>`;
    const roses = topo.some(t => t && Array.isArray(t.ar)) ? `<div class="sm-roses">${places.map((p, i) => `<figure>${roseSVG(topo[i], i)}<figcaption><i class="sm-sw s${i + 1}" aria-hidden="true"></i>${esc(p.name)}${topo[i] ? `<small class="mono">${topo[i].s != null ? `slope ${VM.fmt.num(topo[i].s, 1)}%` : ''}${topo[i].a != null ? ` · faces ${SM.octName(topo[i].a)}` : ''}${topo[i].fl != null ? ` · ${VM.fmt.pct(topo[i].fl)} flat` : ''}</small>` : '<small>no terrain data</small>'}</figcaption></figure>`).join('')}</div>
      <p class="note">Each rose shows the share of sloping ground (2% or steeper) facing each way.</p>` : '';
    const slopes = !roses && places.some(p => p.vals.slope != null) ? `<dl class="ledger n${places.length}">${places.map((p, i) => `<div><dt><i class="sm-sw s${i + 1}" aria-hidden="true"></i> Slope</dt><dd>${p.vals.slope != null ? VM.fmt.num(p.vals.slope, 1) + '%' : 'n/a'}<span class="sec2">${p.vals.aspect != null ? 'faces ' + SM.octName(p.vals.aspect) : ''}</span></dd></div>`).join('')}</dl>` : '';
    return `${VM.h.sec('Terrain')}${bands}${roses}${slopes}`;
  }
  function roseSVG(t, i) {
    if (!t || !Array.isArray(t.ar)) return `<svg viewBox="0 0 100 100" class="sm-rose" aria-hidden="true"><circle cx="50" cy="50" r="40" class="ring"/></svg>`;
    const mx = Math.max(0.2, ...t.ar);
    const pts = t.ar.map((v, j) => { const a = (j * 45 - 90) * Math.PI / 180, r = 6 + (v / mx) * 34; return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
    return `<svg viewBox="0 0 100 100" class="sm-rose" role="img" aria-label="${esc(SM.OCT.map((o, j) => `${o} ${Math.round((t.ar[j] || 0) * 100)}%`).join(', '))}">
      <circle cx="50" cy="50" r="40" class="ring"/><circle cx="50" cy="50" r="23" class="ring"/>
      ${SM.OCT.map((o, j) => { const a = (j * 45 - 90) * Math.PI / 180; return `<path d="M50 50L${(50 + 40 * Math.cos(a)).toFixed(1)} ${(50 + 40 * Math.sin(a)).toFixed(1)}" class="sp"/>${j % 2 ? '' : `<text x="${(50 + 47 * Math.cos(a)).toFixed(1)}" y="${(50 + 47 * Math.sin(a) + 3).toFixed(1)}" text-anchor="middle">${o}</text>`}`; }).join('')}
      <polygon points="${pts}" class="sh s${i + 1}"/></svg>`;
  }

  /* ---------- area, styles, category ---------- */
  function placeHTML(places) {
    const row = (k, f) => `<div class="sm-tr"><span class="lk">${esc(k)}</span>${places.map((p, i) => `<div class="sm-tc"><i class="sm-sw s${i + 1}" aria-hidden="true"></i><span>${f(p) || '<span class="na">n/a</span>'}</span></div>`).join('')}</div>`;
    const styles = p => {
      const d = p.entity?.data || {};
      const st = arr(d.styles).length ? d.styles : d.style && d.style !== 'mixed' ? [d.style] : [];
      return st.map(s => `<span class="sm-st"><i class="sw" style="background:var(--w-${esc(s)})"></i>${esc({ red: 'Red', white: 'White', rose: 'Rosé', sparkling: 'Sparkling', sweet: 'Sweet', fortified: 'Fortified', orange: 'Orange' }[s] || s)}</span>`).join(' ');
    };
    return `${VM.h.sec('The place')}<div class="sm-tab" style="--n:${places.length}">
      ${row('Category', p => esc(SM.metaOf(p.id)))}
      ${row('Area', p => p.area != null ? esc(VM.fmt.area(p.area)?.v || '') : p.type === 'country' ? esc(SM.plural(VM.data.index.filter(a => a.country === p.id && !a.fine).length, 'appellation')) : '')}
      ${row('Styles', styles)}
      ${row('Latitude', p => p.lat != null ? `<span class="mono">${esc(VM.fmt.lat(p.lat, 1))}</span>` : '')}
      ${row('Boundary', p => { const b = p.entity?.bq; return b ? esc({ official: 'Official line', commune: 'Commune-based', admin: 'Administrative', approx: 'Approximate' }[b] || b) : ''; })}
    </div>`;
  }

  /* ---------- grapes: shared and unique ---------- */
  async function grapesHTML(places) {
    const rev = await SM.grapeIndex();
    if (!rev.size) return '';
    const sets = places.map(p => {
      if (p.type === 'country' || p.type === 'region') {
        const s = new Set(); for (const m of p.members.slice(0, 400)) for (const g of SM.grapesOf(rev, m).set) s.add(g);
        return { set: s, from: null };
      }
      return SM.grapesOf(rev, p.appId || p.id);
    });
    if (sets.every(s => !s.set.size)) return '';
    const name = g => VM.data.grapeById(g)?.name || g;
    const reach = g => arr(VM.data.varieties[g]).length;
    const chip = g => `<li><a class="chip" href="#grape-${esc(g)}">${esc(name(g))}</a></li>`;
    const all = new Set(sets.flatMap(s => [...s.set]));
    const inAll = [...all].filter(g => sets.every(s => s.set.has(g))).sort((a, b) => reach(b) - reach(a));
    let out = `${VM.h.sec('Grapes permitted')}`;
    if (places.length > 1) out += `<p class="lk sm-g-h">Shared by ${places.length === 2 ? 'both' : 'all three'} · ${inAll.length}</p>${inAll.length ? `<ul class="chips">${inAll.slice(0, 30).map(chip).join('')}</ul>` : '<p class="note">None in common.</p>'}`;
    places.forEach((p, i) => {
      const own = [...sets[i].set].filter(g => !inAll.includes(g) && (places.length === 1 || !sets.some((s, j) => j !== i && s.set.has(g)))).sort((a, b) => reach(b) - reach(a));
      const from = sets[i].from && sets[i].from !== (p.appId || p.id) ? ` <small class="note">(rules of ${esc(SM.nameOf(sets[i].from))})</small>` : '';
      out += `<p class="lk sm-g-h"><i class="sm-sw s${i + 1}" aria-hidden="true"></i> ${places.length > 1 ? 'Only' : ''} ${esc(p.name)} · ${own.length}${from}</p>${own.length ? `<ul class="chips">${own.slice(0, 24).map(chip).join('')}${own.length > 24 ? `<li class="note sm-more">and ${own.length - 24} more</li>` : ''}</ul>` : '<p class="note">Nothing of its own.</p>'}`;
    });
    if (places.length === 3) {
      const pairs = [...all].filter(g => !inAll.includes(g) && sets.filter(s => s.set.has(g)).length === 2);
      if (pairs.length) out += `<p class="lk sm-g-h">In two of the three · ${pairs.length}</p><ul class="chips">${pairs.sort((a, b) => reach(b) - reach(a)).slice(0, 24).map(chip).join('')}</ul>`;
    }
    out += `<p class="src">From the permitted varieties in each register (or the written profile), inherited from the containing appellation where a unit lists none.</p>`;
    return out;
  }

  /* ---------- rules (data/regs) ---------- */
  const REG = [['varieties', 'Varieties'], ['min_alcohol', 'Minimum alcohol'], ['max_yield', 'Maximum yield'], ['ageing', 'Ageing'], ['release', 'Release'], ['styles', 'Styles'], ['sweetness', 'Sweetness'], ['labelling', 'Labelling'], ['other', 'Other']];
  async function rulesHTML(places) {
    const regs = await Promise.all(places.map(p => VM.data.regs(p.appId || p.id).catch(() => null)));
    if (!regs.some(r => r && r.data)) return '';
    const keys = REG.filter(([k]) => regs.some(r => r?.data?.[k]));
    let out = `${VM.h.sec('Rules')}<div class="sm-rules">`;
    for (const [k, l] of keys) {
      out += `<div class="sm-rule"><p class="lk">${esc(l)}</p>${places.map((p, i) => { const v = regs[i]?.data?.[k]; return `<div class="sm-rv"><i class="sm-sw s${i + 1}" aria-hidden="true"></i><p>${v ? esc(clip(v, 260)) : '<span class="na">not set</span>'}</p></div>`; }).join('')}</div>`;
    }
    out += `</div>`;
    const inh = places.map((p, i) => regs[i]?.inherited ? `${p.name}: the rules of ${SM.nameOf(regs[i].id)}` : null).filter(Boolean);
    const ver = regs.map(r => r?.data?.verified).filter(Boolean);
    out += `<p class="src">From the product specifications${ver.length ? `, checked ${esc(ver[0])}` : ''}.${inh.length ? ' ' + esc(inh.join('; ')) + '.' : ''} Open a profile for the full text and sources.</p>`;
    return out;
  }
  const clip = (s, n) => { s = String(s); return s.length > n ? s.slice(0, s.lastIndexOf(' ', n) > n * 0.6 ? s.lastIndexOf(' ', n) : n) + '…' : s; };

  /* ---------- vintage overlay: growing-season anomaly against 1991–2020 ---------- */
  async function vintageHTML(places) {
    const vs = await Promise.all(places.map(p => VM.data.vintage(p.appId || p.id).catch(() => null)));
    if (!vs.some(Boolean)) return '';
    const series = places.map((p, i) => {
      const v = vs[i]?.data; if (!v) return null;
      const base = v.n9120?.gst ?? SM.median(v.gst);
      return { p, i, y0: v.y0, gst: v.gst, an: v.gst.map(x => x == null ? null : x - base), base, v, inh: vs[i].inherited ? vs[i].id : null };
    }).filter(Boolean);
    const y0 = Math.min(...series.map(s => s.y0)), y1 = Math.max(...series.map(s => s.y0 + s.gst.length - 1));
    const years = []; for (let y = y0; y <= y1; y++) years.push(y);
    if (YEAR == null || YEAR < y0 || YEAR > y1) YEAR = null;
    const W = 340, Hh = 150, padL = 30, padR = 8, padT = 10, padB = 20;
    const amax = Math.max(1.5, ...series.flatMap(s => s.an.filter(x => x != null).map(Math.abs)));
    const lim = Math.ceil(amax * 2) / 2;
    const X = y => padL + (y - y0) / Math.max(1, y1 - y0) * (W - padL - padR);
    const Y = a => padT + (lim - a) / (2 * lim) * (Hh - padT - padB);
    const smooth = a => a.map((_, j) => { const w = a.slice(Math.max(0, j - 2), j + 3).filter(x => x != null); return w.length ? w.reduce((s, x) => s + x, 0) / w.length : null; });
    const path = (s, arr2) => arr2.map((a, j) => a == null ? '' : `${j && arr2[j - 1] != null ? 'L' : 'M'}${X(s.y0 + j).toFixed(1)} ${Y(a).toFixed(1)}`).join('');
    const ticksY = []; for (let a = -lim; a <= lim + 1e-9; a += lim > 2 ? 1 : 0.5) ticksY.push(a);
    const ticksX = years.filter(y => y % 10 === 0);
    const svg = `<svg class="sm-vt" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Growing-season temperature anomaly against each place's 1991 to 2020 mean, ${y0} to ${y1}; thin lines are single years, thick lines a five-year mean">
      ${ticksY.map(a => `<path d="M${padL} ${Y(a).toFixed(1)}H${W - padR}" class="${a === 0 ? 'zero' : 'grid'}"/><text x="${padL - 4}" y="${(Y(a) + 3).toFixed(1)}" text-anchor="end">${a > 0 ? '+' : a < 0 ? '−' : ''}${Math.abs(a)}</text>`).join('')}
      ${ticksX.map(y => `<text x="${X(y).toFixed(1)}" y="${Hh - 5}" text-anchor="middle">${y}</text>`).join('')}
      ${series.map(s => `<path d="${path(s, s.an)}" class="yr s${s.i + 1}"/>`).join('')}
      ${series.map(s => `<path d="${path(s, smooth(s.an))}" class="ma s${s.i + 1}"/>`).join('')}
      ${YEAR != null ? `<path d="M${X(YEAR).toFixed(1)} ${padT}V${Hh - padB}" class="cur"/>${series.map(s => { const a = s.an[YEAR - s.y0]; return a == null ? '' : `<circle cx="${X(YEAR).toFixed(1)}" cy="${Y(a).toFixed(1)}" r="4" class="pt s${s.i + 1}"/>`; }).join('')}` : ''}
      <rect x="${padL}" y="${padT}" width="${W - padL - padR}" height="${Hh - padT - padB}" class="hit" data-vt="1"/></svg>`;
    let out = `${VM.h.sec('Vintages')}${key(places)}
      <p class="note">Each year's growing-season temperature against the place's own 1991–2020 mean. The thin line is the single year, the thick line a five-year mean. Tap the chart or pick a year.</p>
      <div class="sm-vt-w">${svg}<div class="sm-vt-tip" role="presentation" hidden></div></div>
      <div class="sm-vt-ctl"><label class="vm-field sm-yr"><span>Vintage</span><select class="vm-select" id="sm-year"><option value="">Pick a year</option>${years.slice().reverse().map(y => `<option value="${y}"${y === YEAR ? ' selected' : ''}>${y}</option>`).join('')}</select></label></div>
      <div id="sm-vy">${YEAR != null ? await yearHTML(series, YEAR) : ''}</div>`;
    const inh = series.filter(s => s.inh).map(s => `${s.p.name} uses the record of ${SM.nameOf(s.inh)}`);
    out += `<p class="src">TerraClimate monthly data, 1950–2025, averaged over the zone; harvest years (southern seasons labelled by the April of the vintage).${inh.length ? ' ' + esc(inh.join('; ')) + '.' : ''}</p>`;
    SM._vt = { series, y0, y1, W, Hh, padL, padR, padT, padB, lim };
    return out;
  }
  /* one vintage, read across the places */
  async function yearHTML(series, y) {
    const evs = await Promise.all(series.map(s => VM.data.events(s.p.appId || s.p.id).catch(() => [])));
    const rows = series.map((s, j) => {
      const k = y - s.y0, v = s.v;
      if (k < 0 || k >= s.gst.length) return null;
      const g = v.gst[k], an = s.an[k], hr = v.hr?.[k], fr = v.fr?.[k], hd = v.hd?.[k];
      const hrN = SM.median(arr(v.hr).slice(41, 71));
      const rank = [...v.gst].filter(x => x != null).sort((a, b) => b - a).indexOf(g) + 1;
      const tags = [];
      if (an >= 1) tags.push('a hot year'); else if (an <= -1) tags.push('a cool year');
      if (hr != null && hrN && hr > hrN * 1.5) tags.push('wet harvest'); else if (hr != null && hrN && hr < hrN * 0.5) tags.push('dry harvest');
      if (fr != null && fr >= 3) tags.push('frosty spring');
      if (hd != null && hd >= 15) tags.push('many heat days');
      const ev = evs[j].filter(e => e.year === y);
      return `<li><p class="sm-vy-h"><i class="sm-sw s${s.i + 1}" aria-hidden="true"></i><b>${esc(s.p.name)}</b> <span class="mono">${VM.fmt.temp(g)}</span> <span class="mono sm-an ${an > 0 ? 'w' : 'c'}">${VM.fmt.signed(an, 1, ' °C')}</span>${tags.length ? ` <span class="note">${esc(tags.join(', '))}</span>` : ''}</p>
        <dl class="sm-vy-d"><div><dt>Harvest rain</dt><dd class="mono">${hr != null ? `${VM.fmt.num(hr)} mm` : 'n/a'}${hrN ? `<small>normal ${VM.fmt.num(hrN)}</small>` : ''}</dd></div><div><dt>Frost nights</dt><dd class="mono">${fr != null ? VM.fmt.num(fr) : 'n/a'}<small>after budburst</small></dd></div><div><dt>Days ≥ 35 °C</dt><dd class="mono">${hd != null ? VM.fmt.num(hd) : 'n/a'}</dd></div><div><dt>Warmth rank</dt><dd class="mono">${rank ? `${rank} of ${s.gst.length}` : ''}<small>1 = warmest</small></dd></div></dl>
        ${ev.map(e => `<p class="sm-ev"><span class="vm-badge">${esc(e.kind)}</span> ${esc(e.text)}${e.src && /^https?:/.test(e.src) ? ` <a href="${esc(e.src)}" target="_blank" rel="noopener noreferrer" class="src">source</a>` : ''}</p>`).join('')}</li>`;
    }).filter(Boolean);
    return `<ul class="sm-vy">${rows.join('')}</ul><p class="src">Frost nights and heat days are modelled from monthly data: good for comparing years at one place, not for counting days.</p>`;
  }
  SM.yearHTML = yearHTML;

  /* ---------- how they differ, in words ---------- */
  async function prosePara(places) {
    if (places.length < 2) return '';
    const v = k => places.map(p => p.vals[k]);
    const nm = places.map(p => p.name);
    const s = [];
    const g = v('gst');
    if (g.every(x => x != null)) {
      const order = places.map((p, i) => i).sort((a, b) => g[b] - g[a]);
      const spread = g[order[0]] - g[order[order.length - 1]];
      const band = x => x < 13 ? 'too cool for most grapes' : x < 15 ? 'cool' : x < 17 ? 'intermediate' : x < 19 ? 'warm' : x < 21 ? 'hot' : 'very hot';
      if (spread < 0.4) s.push(`${SM.list(nm)} share almost the same growing-season warmth (${g.map(x => VM.fmt.num(x, 1)).join(', ')} °C), so the differences lie elsewhere.`);
      else if (places.length === 2) {
        const [a, b] = order;
        const gd = v('gdd');
        s.push(`${nm[a]} is the warmer by ${VM.fmt.num(spread, 1)} °C over the growing season (${VM.fmt.num(g[a], 1)} against ${VM.fmt.num(g[b], 1)} °C)${gd[a] != null && gd[b] != null && Math.abs(gd[a] - gd[b]) >= 20 ? `, about ${VM.fmt.num(Math.round(Math.abs(gd[a] - gd[b]) / 10) * 10)} more degree days` : ''}: ${band(g[a]) === band(g[b]) ? `both sit in the ${band(g[a])} band, but that is enough to move ripeness dates by ${spread >= 1.5 ? 'a couple of weeks' : 'several days'}` : `${band(g[a])} against ${band(g[b])}`}.`);
      } else {
        s.push(`From warm to cool: ${order.map(i => `${nm[i]} (${VM.fmt.num(g[i], 1)} °C)`).join(', ')}, a spread of ${VM.fmt.num(spread, 1)} °C over the growing season.`);
      }
      const wk = places.map(p => SM.wkIdx(p.vals.gdd));
      if (wk.every(x => x >= 0) && new Set(wk).size > 1) s.push(`On Winkler's scale that puts ${SM.list(places.map((p, i) => `${nm[i]} ${wk[i] ? `in Region ${SM.WK[wk[i]]}` : 'below Region I'}`))}.`);
    }
    const r = v('gsp');
    if (r.every(x => x != null)) {
      const mx = Math.max(...r), mn = Math.min(...r);
      if (mx - mn >= 80 && mx >= 1.35 * mn) {
        const wi = r.indexOf(mx), di = r.indexOf(mn);
        s.push(`${nm[wi]} gets ${VM.fmt.num(mx)} mm of rain in the season against ${VM.fmt.num(mn)} mm in ${nm[di]}${mn < 200 ? `, which is close to desert dryness and usually means irrigation` : ''}${mx > 550 ? `; at that level rot and mildew are a real worry` : ''}.`);
      } else s.push(`Season rain is similar (${r.map(x => VM.fmt.num(x)).join(', ')} mm).`);
    }
    const d = v('dtr');
    if (d.every(x => x != null)) {
      const mx = Math.max(...d), mn = Math.min(...d);
      if (mx - mn >= 2) s.push(`The day–night swing is wider in ${nm[d.indexOf(mx)]} (${VM.fmt.num(mx, 1)} °C against ${VM.fmt.num(mn, 1)}): cooler nights keep acidity and colour as sugar builds.`);
    }
    const e = v('elev');
    if (e.every(x => x != null)) {
      const mx = Math.max(...e), mn = Math.min(...e);
      if (mx - mn >= 250) s.push(`${nm[e.indexOf(mx)]} sits about ${VM.fmt.num(Math.round((mx - mn) / 50) * 50)} m higher, worth roughly ${VM.fmt.num((mx - mn) * 0.006, 1)} °C of cooling on its own.`);
    }
    const sl = v('slope');
    if (sl.every(x => x != null)) {
      const mx = Math.max(...sl), mn = Math.min(...sl);
      if (mx - mn >= 5) s.push(`${nm[sl.indexOf(mx)]} is much steeper (${VM.fmt.num(mx, 1)}% mean slope against ${VM.fmt.num(mn, 1)}%), so drainage and exposure to the sun count for more.`);
    }
    const lats = places.map(p => p.lat);
    if (lats.every(x => x != null) && lats.some(x => x < 0) && lats.some(x => x > 0)) s.push('They lie in opposite hemispheres, so their harvests are six months apart: the south picks in March and April, the north in September and October, and a southern vintage reaches the market half a year earlier.');
    if (!s.length) return '';
    return `<div class="sm-diff">${VM.h.sec('How they differ')}<div class="prose"><p>${esc(s.join(' '))}</p></div></div>`;
  }

  /* ---------- binding ---------- */
  function bindView(el, places) {
    el.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => { picks = picks.filter(x => x !== b.dataset.rm); savePicks(); VM.go(hashFor(picks)); }));
    el.querySelector('[data-add]')?.addEventListener('click', async () => {
      const r = await VM.search.pick({ types: TYPES, label: 'Pick a place to compare', placeholder: 'Search a place to compare' });
      if (r && r.id && !picks.includes(r.id)) { picks.push(r.id); if (picks.length > MAX) picks.shift(); savePicks(); VM.go(hashFor(picks)); }
    });
    el.querySelectorAll('[data-pair]').forEach(b => b.addEventListener('click', () => { picks = b.dataset.pair.split('--'); savePicks(); VM.go(hashFor(picks)); }));
    el.querySelector('[data-act="clear"]')?.addEventListener('click', () => { picks = []; savePicks(); SM.map.clearRings('cmp:'); VM.clearHighlight(); VM.go('compare'); });
    el.querySelector('[data-act="map"]')?.addEventListener('click', () => {
      SM.map.light(picks, { prefix: 'cmp:', owner: 'compare', dimOthers: false, label: 'Compare', series: picks.map((_, i) => i) });
      for (const [i, id] of picks.entries()) { const e = VM.data.entity(id); if (e?.lp) SM.map.ring('cmp:' + id, e.lp[0], e.lp[1], 's' + (i + 1)); }
      VM.frame(picks, { maxZoom: 9 });
      if (VM.isPhone()) VM.panel.snap('peek');
    });
    const tw = el.querySelector('.sm-cmp-tw');
    if (tw && places.length === 1) SM.twins(places[0].id, { k: 6, place: places[0] }).then(res => bindTwins(tw, res));
    /* vintage chart: tap to pick a year; the select is the keyboard path */
    const sel = el.querySelector('#sm-year');
    const setYear = async y => {
      YEAR = y; SM.local.set('cmpyear', y);
      const vt = SM._vt; if (!vt) return;
      const box = el.querySelector('#sm-vy');
      if (box) box.innerHTML = y != null ? await yearHTML(vt.series, y) : '';
      if (sel) sel.value = y ?? '';
      const svg = el.querySelector('.sm-vt');
      if (svg) {
        svg.querySelectorAll('.cur, .pt').forEach(n => n.remove());
        if (y != null) {
          const Xf = yy => vt.padL + (yy - vt.y0) / Math.max(1, vt.y1 - vt.y0) * (vt.W - vt.padL - vt.padR);
          const Yf = a => vt.padT + (vt.lim - a) / (2 * vt.lim) * (vt.Hh - vt.padT - vt.padB);
          const hit = svg.querySelector('.hit');
          const ns = 'http://www.w3.org/2000/svg';
          const ln = document.createElementNS(ns, 'path');
          ln.setAttribute('d', `M${Xf(y).toFixed(1)} ${vt.padT}V${vt.Hh - vt.padB}`); ln.setAttribute('class', 'cur');
          svg.insertBefore(ln, hit);
          for (const s of vt.series) {
            const a = s.an[y - s.y0]; if (a == null) continue;
            const c = document.createElementNS(ns, 'circle');
            c.setAttribute('cx', Xf(y).toFixed(1)); c.setAttribute('cy', Yf(a).toFixed(1)); c.setAttribute('r', '4'); c.setAttribute('class', `pt s${s.i + 1}`);
            svg.insertBefore(c, hit);
          }
        }
      }
    };
    sel?.addEventListener('change', () => setYear(sel.value ? +sel.value : null));
    /* hover: a crosshair snaps to the nearest year and a readout lists every place (the year read-out below is the
       keyboard and table view) */
    const hit = el.querySelector('.sm-vt .hit');
    if (hit) {
      const svg = hit.ownerSVGElement, tip = el.querySelector('.sm-vt-tip');
      const ns = 'http://www.w3.org/2000/svg';
      const hov = document.createElementNS(ns, 'path'); hov.setAttribute('class', 'hov'); hov.style.display = 'none'; svg.insertBefore(hov, hit);
      const yearAt = ev => { const vt = SM._vt, r = svg.getBoundingClientRect(); const x = (ev.clientX - r.left) / r.width * vt.W; return clamp(Math.round(vt.y0 + (x - vt.padL) / (vt.W - vt.padL - vt.padR) * (vt.y1 - vt.y0)), vt.y0, vt.y1); };
      hit.addEventListener('pointermove', ev => {
        const vt = SM._vt; if (!vt) return;
        const y = yearAt(ev);
        const X = vt.padL + (y - vt.y0) / Math.max(1, vt.y1 - vt.y0) * (vt.W - vt.padL - vt.padR);
        hov.setAttribute('d', `M${X.toFixed(1)} ${vt.padT}V${vt.Hh - vt.padB}`); hov.style.display = '';
        tip.innerHTML = `<b class="mono">${y}</b>` + vt.series.map(sr => { const k = y - sr.y0, g = sr.gst[k], an = sr.an[k]; return g == null ? '' : `<span><i class="sm-ln s${sr.i + 1}" aria-hidden="true"></i><b class="mono">${VM.fmt.signed(an, 1, ' °C')}</b> <span class="mono">${VM.fmt.num(g, 1)} °C</span> ${esc(sr.p.name)}</span>`; }).join('');
        tip.hidden = false;
        const w = svg.getBoundingClientRect().width, px = X / vt.W * w;
        tip.style.left = Math.min(Math.max(0, px + 10), w - tip.offsetWidth) + 'px';
        if (px + 10 + tip.offsetWidth > w) tip.style.left = Math.max(0, px - 10 - tip.offsetWidth) + 'px';
      });
      hit.addEventListener('pointerleave', () => { hov.style.display = 'none'; tip.hidden = true; });
    }
    el.querySelector('.sm-vt .hit')?.addEventListener('click', ev => {
      const vt = SM._vt, svg = ev.currentTarget.ownerSVGElement, r = svg.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width * vt.W;
      const y = Math.round(vt.y0 + (x - vt.padL) / (vt.W - vt.padL - vt.padR) * (vt.y1 - vt.y0));
      setYear(clamp(y, vt.y0, vt.y1));
    });
  }
})();
