/* Vitis Mundi v2: installable app on the Pages build (service worker, install prompt, offline note) */
const PWA = { prompt: null };
function initPWA() {
  if (VM.mode !== 'gh' || !('serviceWorker' in navigator)) return;
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (location.protocol !== 'https:' && !local) return;
  addEventListener('load', () => { navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => { /* blocked or unsupported: the site works without it */ }); });
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); PWA.prompt = e; vmEmit('pwa:installable', true); });
  addEventListener('appinstalled', () => { PWA.prompt = null; APP.toast('Vitis Mundi is on your home screen.'); });
  addEventListener('offline', () => APP.toast('Offline: places you have opened before still work.'));
}
function installHTML() {
  if (VM.mode !== 'gh') return '';
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) return `<p class="note">Running as an installed app. Places, data and map tiles you open are kept for offline use.</p>`;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return `<div class="pwa-box">${PWA.prompt ? `<button type="button" class="btn solid" id="pwa-install">Install the atlas</button>` : ''}
    <p class="note">${ios ? 'On an iPhone or iPad: tap Share, then Add to Home Screen.' : PWA.prompt ? 'Adds Vitis Mundi to your home screen and app list.' : 'Your browser can add this page to the home screen from its menu (Install app, or Add to Home Screen).'} Once installed it opens without the browser bar, and the places, data and map tiles you have viewed stay available offline.</p></div>`;
}
function bindInstall(root) {
  const b = root.querySelector('#pwa-install');
  if (b) b.addEventListener('click', async () => { const p = PWA.prompt; if (!p) return; p.prompt(); try { await p.userChoice; } catch (e) { /* dismissed */ } PWA.prompt = null; b.remove(); });
}
initPWA();
