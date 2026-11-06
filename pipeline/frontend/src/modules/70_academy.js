/* modules/70_academy.js: link to Vitis Mundi Academy, the somm school served at docs/academy/ on the Pages build.
   The academy is a separate static app (source: Tolar-dio/somm-school), copied into docs/academy/ and kept on
   deploy by deploy_gh.py (KEEP_PREFIX). Artifact builds have no academy, so the entry appears only in 'gh' mode. */
(() => {
  'use strict';
  if (!window.VM || !VM.nav || (window.VM_CONFIG || {}).mode !== 'gh') return;
  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/><path d="M22 9v6"/></svg>';
  VM.nav.add({ id: 'academy', label: 'Academy', icon: ICON, order: 900, title: 'Vitis Mundi Academy: the somm school',
    onClick: () => { location.href = 'academy/'; } });
})();
