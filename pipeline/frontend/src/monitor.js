/* monitor.js: crash and error reporting through Sentry (project tolat/vitis-mundi), Pages build on
   vitismundi.app only. Privacy: no personal data (sendDefaultPii off, no user, no cookies), no session replay,
   no performance tracing; URL query strings and anything that looks like an email address are stripped from
   events and breadcrumbs. At most 25 events per page load, so one broken loop cannot spend the monthly quota.

   Besides uncaught errors and promise rejections, two map channels report: MapLibre 'error' events for the
   site's own data (vector tiles, GeoJSON; external imagery failing offline is left out), which is how a broken
   tile cache shows itself, and WebGL context loss, which on phones usually comes just before a crash. Tab
   crashes are counted at the next visit, and 5% of visits send a performance sample.
   window.vmReport(err, extra) is the hook map.js calls. */
(() => {
  'use strict';
  const S = window.Sentry;
  const host = location.hostname;
  window.vmReport = () => {};
  if (!S || !(host === 'vitismundi.app' || host === 'www.vitismundi.app')) return;
  const EMAIL = /[^\s@"'<>()]+@[^\s@"'<>()]+\.[a-z]{2,}/gi;
  const scrub = s => (typeof s === 'string' ? s.replace(EMAIL, '[email]') : s);
  const strip = u => {
    try { const x = new URL(u, location.href); return x.origin + x.pathname + (x.origin === location.origin ? x.hash : ''); }
    catch (e) { return String(u).split('?')[0]; }
  };
  let sent = 0;
  const ctx = () => {
    const t = {};
    try {
      const m = window.VM && VM.map;
      if (m) { t.zoom = String(Math.round(m.getZoom() * 2) / 2); t.pitch = String(Math.round(m.getPitch() / 10) * 10); t.terrain = String(!!m.getTerrain()); }
      if (typeof BM !== 'undefined' && BM.base) t.base = BM.base;
      t.view = (location.hash.replace(/^#/, '').split(/[-/]/)[0] || 'map').slice(0, 30);
    } catch (e) { /* the map may be mid-teardown */ }
    return t;
  };
  S.init({
    dsn: 'https://bc8806445287b9e25e9c176964bdbe11@o4512381194207232.ingest.us.sentry.io/4512415316705280',
    release: 'vitis-mundi@' + ((window.__VM_BUILD && window.__VM_BUILD.rel) || 'dev'),
    environment: 'production',
    sendDefaultPii: false,
    /* SDK 11 collects user info (so the server stores the visitor's IP), cookies, headers and query strings by
       default whatever sendDefaultPii says: every one off */
    dataCollection: { userInfo: false, cookies: false, httpHeaders: false, httpBodies: [], urlQueryParams: false,
      graphQL: { document: false, variables: false }, stackFrameVariables: false },
    defaultIntegrations: false,
    integrations: [S.browserApiErrorsIntegration(), S.globalHandlersIntegration(), S.linkedErrorsIntegration(),
      S.dedupeIntegration(), S.httpContextIntegration(),
      S.breadcrumbsIntegration({ console: true, dom: true, fetch: true, xhr: true, history: true })],
    tracesSampleRate: 0,
    maxBreadcrumbs: 40,
    ignoreErrors: ['ResizeObserver loop', 'AbortError', 'The operation was aborted', 'The user aborted a request',
      'Load failed', 'Failed to fetch', 'NetworkError when attempting to fetch resource', 'Network request failed'],
    denyUrls: [/^chrome-extension:/, /^moz-extension:/, /^safari-(web-)?extension:/, /^webkit-masked-url:/],
    beforeBreadcrumb(b) {
      if (b.category === 'console' && b.level !== 'error' && b.level !== 'warning') return null;
      if (b.data) for (const k of ['url', 'from', 'to']) if (typeof b.data[k] === 'string') b.data[k] = strip(b.data[k]);
      if (b.message) b.message = scrub(b.message);
      return b;
    },
    beforeSend(e) {
      if (++sent > 25) return null;
      delete e.user;
      e.request = e.request || {};
      if (e.request.url) e.request.url = strip(e.request.url);
      delete e.request.cookies; delete e.request.query_string;
      e.request.headers = { 'User-Agent': navigator.userAgent };   /* browser and OS only: which phones break */
      if (e.message) e.message = scrub(e.message);
      for (const x of (e.exception && e.exception.values) || []) x.value = scrub(x.value);
      e.tags = Object.assign(ctx(), e.tags || {});
      return e;
    }
  });

  const once = new Set();
  window.vmReport = (err, extra) => {
    try {
      const msg = String((err && err.message) || err || 'unknown');
      if (/abort/i.test(msg) || (err && (err.name === 'AbortError' || err.status === 0 || err.status === 404))) return;
      const key = msg.slice(0, 120) + '|' + ((extra && extra.source) || '');
      if (once.has(key)) return;
      once.add(key);
      S.withScope(sc => {
        sc.setTag('channel', 'map');
        if (extra && extra.source) sc.setTag('source', extra.source);
        S.captureException(err instanceof Error ? err : new Error(msg));
      });
    } catch (e) { /* reporting must never break the map */ }
  };
  /* Crashes Safari cannot report: when iOS kills a tab for memory, no script runs. A marker is kept in storage
     while the page is open and visible and removed when it is hidden or closed; finding it at the next start means
     the last visit ended while the page was open, the signature of a tab crash. It carries the last map view. */
  const LIVE = 'vm:live';
  const live = { get() { try { return JSON.parse(localStorage.getItem(LIVE) || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(LIVE, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    clear() { try { localStorage.removeItem(LIVE); } catch (e) { /* storage blocked */ } } };
  const prev = live.get();
  if (prev && prev.t && Date.now() - prev.t < 6 * 3600e3) {
    S.withScope(sc => {
      sc.setLevel('warning');
      sc.setFingerprint(['previous-visit-crashed']);
      for (const [k, v] of Object.entries(prev.ctx || {})) sc.setTag('last_' + k, String(v));
      if (prev.rel) sc.setTag('last_release', prev.rel);
      S.captureMessage('Previous visit ended while the page was open (likely a tab crash)');
    });
  }
  let lastWrite = 0;
  const mark = force => {
    if (document.visibilityState !== 'visible') return;
    const now = Date.now();
    if (!force && now - lastWrite < 5000) return;
    lastWrite = now;
    live.set({ t: now, ctx: ctx(), rel: (window.__VM_BUILD && window.__VM_BUILD.rel) || '' });
  };
  mark(true);
  document.addEventListener('visibilitychange', () => (document.visibilityState === 'visible' ? mark(true) : live.clear()));
  window.addEventListener('pagehide', () => live.clear());

  /* a 5% sample of visits reports how the map performed: time to the first settled map, and the share of slow
     frames (over 50 ms) while the map was moving during the first minute. Grouped as one Sentry issue. */
  const SAMPLE = Math.random() < 0.05;
  const t0 = performance.now();
  const perf = { idle: null, frames: 0, slow: 0, worst: 0 };
  let perfSent = false;
  const sendPerf = () => {
    if (perfSent || !SAMPLE || perf.idle == null) return;
    perfSent = true;
    S.withScope(sc => {
      sc.setLevel('info');
      sc.setFingerprint(['perf-sample']);
      sc.setTag('dpr', String(window.devicePixelRatio || 1));
      sc.setTag('first_idle_s', String(Math.round(perf.idle / 500) / 2));
      sc.setTag('slow_frames_pct', perf.frames ? String(Math.round(100 * perf.slow / perf.frames)) : 'n/a');
      sc.setExtras({ first_idle_ms: Math.round(perf.idle), frames_moving: perf.frames, slow_frames: perf.slow, worst_frame_ms: Math.round(perf.worst) });
      S.captureMessage('perf sample');
    });
  };

  const hookMap = () => {
    const m = VM.map;
    if (!m) return;
    let lost = false;
    m.on('webglcontextlost', () => { if (!lost) { lost = true; S.captureMessage('WebGL context lost', 'warning'); } mark(true); });
    m.on('webglcontextrestored', () => S.addBreadcrumb({ category: 'map', message: 'WebGL context restored', level: 'info' }));
    m.on('idle', () => { if (perf.idle == null) perf.idle = performance.now() - t0; mark(false); });
    m.on('moveend', () => mark(false));
    if (!SAMPLE) return;
    let moving = false, last = 0;
    const tick = ts => {
      if (!moving) return;
      if (last) { const d = ts - last; perf.frames++; if (d > 50) perf.slow++; if (d > perf.worst && d < 2000) perf.worst = d; }
      last = ts;
      requestAnimationFrame(tick);
    };
    m.on('movestart', () => { if (performance.now() - t0 > 60000) return; moving = true; last = 0; requestAnimationFrame(tick); });
    m.on('moveend', () => { moving = false; });
    setTimeout(sendPerf, 60000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendPerf(); });
  };
  if (window.VM && VM.on) VM.on('map:ready', hookMap);
})();
