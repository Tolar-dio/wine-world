/* modules/80_clean.js: a "hide the interface" mode for looking at the map alone.
   A button at the end of the map controls hides the search, views, controls, key and panels; a small button in
   the top-right corner (or Escape) brings them back. The imagery credits stay, faint, because the CC BY and
   other imagery licences require them in the map view. Not remembered across visits. */
(() => {
  'use strict';
  if (!window.VM) return;
  const HIDE = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  const SHOW = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
  let built = false;
  function set(on) {
    const app = document.getElementById('app');
    if (!app) return;
    app.classList.toggle('clean', on);
    const r = document.getElementById('clean-x');
    r.hidden = !on;
    if (on) { const a = document.activeElement; if (a && a.blur) a.blur(); r.focus({ preventScroll: true }); }
    else document.getElementById('clean-btn')?.focus({ preventScroll: true });
    try { VM.map && VM.map.resize(); } catch (e) { /* ignore */ }
  }
  function build() {
    const ctl = document.getElementById('ctl');
    if (built || !ctl) return;
    built = true;
    const g = document.createElement('div');
    g.className = 'ctl-group';
    g.innerHTML = `<button type="button" id="clean-btn" aria-label="Hide the interface" title="Hide the interface">${HIDE}</button>`;
    ctl.appendChild(g);
    const x = document.createElement('button');
    x.type = 'button'; x.id = 'clean-x'; x.className = 'clean-x'; x.hidden = true;
    x.setAttribute('aria-label', 'Show the interface'); x.title = 'Show the interface';
    x.innerHTML = SHOW;
    document.getElementById('app').appendChild(x);
    g.querySelector('button').addEventListener('click', () => set(true));
    x.addEventListener('click', () => set(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.getElementById('app').classList.contains('clean')) { e.stopPropagation(); set(false); }
    }, true);
  }
  if (VM.map) build();
  VM.on && VM.on('map:ready', build);
})();
