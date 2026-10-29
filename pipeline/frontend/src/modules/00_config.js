/* Vitis Mundi v2: runtime configuration. build.py replaces the mode marker below:
   'artifact' for site/index.html (sandboxed, no external network), 'gh' for the GitHub Pages build.
   Fill supabaseUrl / supabaseAnonKey once the project exists (the anon key is public by design; RLS protects data).
   maptilerKey: optional; when set, the Pages build adds MapTiler satellite and terrain (see frontend-notes-v2.md). */
window.VM_CONFIG = Object.assign({
  mode: /*@mode*/'artifact',
  supabaseUrl: 'https://mhnlohxzunwsmlutzrmz.supabase.co',
  supabaseAnonKey: 'sb_publishable_TbL2H1jE_WMtdicZutYWpw_dl2veQt6',
  siteUrl: 'https://tolar-dio.github.io/wine-world/',
  maptilerKey: ''
}, window.VM_CONFIG_OVERRIDE || {});
