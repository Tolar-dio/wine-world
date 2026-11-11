/* monitor.js: crash and error reporting through Sentry (project tolat/vitis-mundi), Pages build on
   vitismundi.app only. Privacy: no personal data (sendDefaultPii off, no user, no cookies), no session replay,
   no performance tracing; URL query strings and anything that looks like an email address are stripped from
   events and breadcrumbs. At most 25 events per page load, so one broken loop cannot spend the monthly quota.

   Besides uncaught errors and promise rejections, two map channels report: MapLibre 'error' events for the
   site's own data (vector tiles, GeoJSON; external imagery failing offline is left out), which is how a broken
   tile cache shows itself, and WebGL context loss, which on phones usually comes just before a crash.
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
  const hookGL = () => {
    try {
      const c = VM.map.getCanvas();
      c.addEventListener('webglcontextlost', () => S.captureMessage('WebGL context lost', 'warning'), { once: true });
    } catch (e) { /* no map */ }
  };
  if (window.VM && VM.on) VM.on('map:ready', hookGL);
})();
