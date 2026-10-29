#!/usr/bin/env python3
"""v2 Playwright checks. Run: python3 /home/claude/winesite/frontend/test_v2.py [scenario ...] [--port N] [--gh]
Artifact build on :8791 (serve.py 8791 --no-fixtures), Pages build on :8792 (serve.py 8792 --gh).
External tiles load through the agent proxy (HTTPS_PROXY) with its CA trusted via an NSS db or ignore list.
Screenshots: work/fe_v2_shots/."""
import asyncio
import json
import os
import sys
import time
from pathlib import Path

from playwright.async_api import async_playwright

OUT = Path("/home/claude/winesite/work/fe_v2_shots")
OUT.mkdir(parents=True, exist_ok=True)
GL = ["--disable-dev-shm-usage", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl", "--use-gl=angle"]
problems = []
IGNORE = ("favicon", "performance warning: READ-usage buffer", "GPU stall due to ReadPixels", "Service Worker registration blocked by Playwright")
# Wikimedia's robot policy refuses headless browsers (429), so the tests serve Commons thumbnails from a local
# placeholder instead of contacting Wikimedia; real browsers load the real photos
PH = Path("/home/claude/winesite/work/fe_v2_shots/_placeholder.jpg")


def proxy():
    p = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    return {"server": p, "bypass": "127.0.0.1,localhost"} if p else None


async def launch(pw):
    args = GL[:]
    # the proxy re-terminates TLS with its own CA; Chromium reads it from the NSS db the environment set up.
    return await pw.chromium.launch(args=args, proxy=proxy())


async def newpage(browser, url, w=1440, h=900, scheme="dark", theme=None, mobile=False, reduced=False, tag=None, sw=False):
    ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2 if mobile else 1,
                                    is_mobile=mobile, has_touch=mobile, color_scheme=scheme,
                                    reduced_motion="reduce" if reduced else "no-preference",
                                    service_workers="allow" if sw else "block", ignore_https_errors=False)
    page = await ctx.new_page()
    if not PH.exists():
        from PIL import Image
        Image.new("RGB", (960, 640), (120, 110, 90)).save(PH, quality=60)
    await page.route("https://upload.wikimedia.org/**", lambda route: route.fulfill(status=200, content_type="image/jpeg", body=PH.read_bytes(), headers={"Access-Control-Allow-Origin": "*"}))
    tag = tag or f"{w}x{h}-{scheme}"

    def on_console(m):
        if m.type in ("error", "warning") and not any(i in m.text for i in IGNORE):
            problems.append(f"[{tag}] {m.type}: {m.text[:400]}")
    page.on("console", on_console)
    page.on("pageerror", lambda e: problems.append(f"[{tag}] pageerror: {str(e)[:400]}"))
    # no "response" listener: Playwright keeps every Response object while one is attached (thousands of tiles);
    # Chrome already logs 4xx/5xx responses to the console, which is captured above
    if theme:
        await page.add_init_script("(() => { const set = () => document.documentElement && document.documentElement.setAttribute('data-theme', '%s'); if (document.documentElement) set(); else new MutationObserver((m, o) => { if (document.documentElement) { set(); o.disconnect(); } }).observe(document, { childList: true }); })()" % theme)
    await page.add_init_script("try{localStorage.clear()}catch(e){}")
    await page.goto(url)
    await page.wait_for_function("() => window.VM && typeof APP === 'object' && APP.mapReady", timeout=60000)
    await page.evaluate("() => { window.map = VM.map; stopSpin(); }")
    return ctx, page


async def idle(page, ms=1500, timeout=60000):
    try:
        await page.wait_for_function("() => VM.map.loaded() && !VM.map.isMoving() && document.getElementById('loading').hidden", timeout=timeout)
    except Exception:
        pass
    await page.wait_for_timeout(ms)


async def shot(page, name):
    p = OUT / f"{name}.png"
    await page.screenshot(path=str(p), timeout=180000)
    print("shot", p)
    return p


async def jump(page, lon, lat, z, pitch=0, bearing=0, ms=2500):
    await page.evaluate(f"() => VM.map.jumpTo({{center:[{lon},{lat}], zoom:{z}, pitch:{pitch}, bearing:{bearing}}})")
    await idle(page, ms)


# ---------------- scenarios ----------------
async def s_api(b, base):
    ctx, page = await newpage(b, base + "index.html", tag="api")
    r = await page.evaluate("""async () => {
      const out = {};
      out.keys = Object.keys(VM).sort();
      out.mode = VM.mode;
      out.cfg = VM_CONFIG;
      VM.panel.addSection('appellation', (el, e) => { el.innerHTML = '<p class="note" id="t-sec">Section for ' + e.name + '</p>'; }, {id: 'test', slot: 'top'});
      VM.panel.register('testview', { title: 'Test', render(el, a) { el.innerHTML = '<div class="head"><h2 class="title">Test view ' + (a.arg || '') + '</h2></div>'; } });
      VM.nav.add({ id: 'testview', label: 'Test' });
      let opened = null; VM.on('profile:open', x => { opened = x.id; });
      VM.open('appellation', 'fr-sauternes');
      await new Promise(r => setTimeout(r, 4000));
      out.opened = opened;
      out.sec = document.getElementById('t-sec')?.textContent;
      VM.go('testview-abc');
      await new Promise(r => setTimeout(r, 800));
      out.view = document.querySelector('#sheet-body .title')?.textContent;
      out.ent = VM.data.entity('fr-sauternes');
      out.q = VM.search.query('barolo', {types: ['appellation']}).slice(0, 2);
      VM.highlight(['fr-sauternes', 'fr-barsac'], {dimOthers: false, label: 'Test'});
      out.hl = [...S.grapeSet];
      VM.clearHighlight();
      return out;
    }""")
    r.pop("ent", None); r.pop("keys", None); print(json.dumps(r, indent=1)[:2500])
    await ctx.close()


async def tiles_idle(page, timeout=90000, extra=1500):
    try:
        await page.wait_for_function("() => VM.map.loaded() && VM.map.areTilesLoaded() && !VM.map.isMoving()", timeout=timeout, polling=500)
    except Exception as e:
        print("  (tiles not idle:", str(e)[:80], ")")
    await page.wait_for_timeout(extra)


async def gh(b, base, w=1440, h=900, scheme="dark", mobile=False, reduced=False, tag=None):
    return await newpage(b, base + "index.html", w, h, scheme, mobile=mobile, reduced=reduced, tag=tag or f"gh-{w}-{scheme}")


async def s_sat(b, base):
    ctx, page = await gh(b, base, tag="sat")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, 4.958, 47.212, 15)          # Vosne-Romanee / Romanee-Conti
    await tiles_idle(page)
    await shot(page, "sat-burgundy-z15")
    await jump(page, 4.95, 47.2, 11.5)
    await tiles_idle(page)
    await shot(page, "sat-burgundy-z11")
    await jump(page, 4.8, 45.5, 8)
    await tiles_idle(page)
    await shot(page, "sat-rhone-z8")
    await ctx.close()


async def s_3dm(b, base):
    ctx, page = await gh(b, base, 1100, 720, tag="3d-mosel", scheme="light")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, 7.03, 49.93, 12.6)
    await page.evaluate("() => { setTerrain3D(true, {instant: true}); VM.map.jumpTo({pitch: 64, bearing: 20}); }")
    await tiles_idle(page, timeout=35000, extra=3000)
    await shot(page, "3d-mosel-wehlen")
    await ctx.close()


async def s_3dd(b, base):
    ctx, page = await gh(b, base, 1100, 720, tag="3d-douro", scheme="dark")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, -7.56, 41.17, 12.4)
    await page.evaluate("() => setTerrain3D(true, {instant: true})")
    await jump(page, -7.56, 41.17, 12.4, pitch=60, bearing=60)
    await tiles_idle(page, timeout=35000, extra=3000)
    await shot(page, "3d-douro-pinhao")
    await ctx.close()


async def s_topo(b, base):
    ctx, page = await gh(b, base, tag="topo")
    await page.evaluate("() => setBase('topo')")
    await jump(page, 15.48, 48.37, 13)
    await tiles_idle(page)
    await shot(page, "topo-wachau-z13")
    await page.evaluate("() => setContours(true)")
    await jump(page, 7.95, 44.6, 13.2)          # Barolo, OpenTopoMap + our contours
    await tiles_idle(page)
    await shot(page, "topo-barolo-contours")
    await page.evaluate("() => setBase('standard')")
    await jump(page, 4.79, 45.49, 13.5)
    await tiles_idle(page)
    await shot(page, "standard-cote-rotie-shade-contours")
    await page.evaluate("() => setContours(false)")
    await ctx.close()


async def s_sun(b, base):
    ctx, page = await gh(b, base, tag="sun")
    await page.evaluate("() => VM.go('sunlight-cote-rotie')")
    await page.wait_for_timeout(6000)
    await tiles_idle(page, extra=2000)
    await shot(page, "sun-cote-rotie-morning")
    await page.evaluate("() => { BM.sun.t = 17.5; document.getElementById('sun-t').value = 17.5; paintShade(); updateSunRead(); }")
    await tiles_idle(page, extra=1500)
    await shot(page, "sun-cote-rotie-evening")
    await ctx.close()


async def s_journey(b, base):
    ctx, page = await gh(b, base, tag="journey")
    await page.evaluate("() => VM.go('journey-mosel')")
    await page.wait_for_timeout(4000)
    await page.evaluate("() => { jrPause(); JR.km = 44; JR.br = null; jrCamera(true); jrCaption(true); }")
    await tiles_idle(page, extra=2500)
    await shot(page, "journey-mosel-km44")
    await page.evaluate("() => VM.go('journey-douro')")
    await page.wait_for_timeout(4000)
    await page.evaluate("() => { jrPause(); JR.km = 56; JR.br = null; jrCamera(true); jrCaption(true); }")
    await tiles_idle(page, extra=2500)
    await shot(page, "journey-douro-pinhao")
    await ctx.close()


async def s_phone(b, base):
    ctx, page = await gh(b, base, 360, 740, "dark", mobile=True, tag="phone360")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, 4.958, 47.212, 14.5)
    await tiles_idle(page)
    await shot(page, "phone-sat-burgundy")
    await page.click("#bm-btn")
    await page.wait_for_timeout(600)
    await shot(page, "phone-bm-popover")
    await page.keyboard.press("Escape")
    await page.evaluate("() => VM.go('journey-wachau')")
    await page.wait_for_timeout(4000)
    await page.evaluate("() => { jrPause(); JR.km = 15; JR.br = null; jrCamera(true); jrCaption(true); }")
    await tiles_idle(page, extra=2000)
    await shot(page, "phone-journey-wachau")
    await page.evaluate("() => stopJourney()")
    await page.evaluate("() => VM.go('sunlight-wehlen')")
    await page.wait_for_timeout(6000)
    await tiles_idle(page, extra=1500)
    await shot(page, "phone-sun-wehlen")
    sw = await page.evaluate("() => document.documentElement.scrollWidth")
    print("  scrollWidth", sw)
    await ctx.close()


async def open_prof(page, h, name, scroll_to=None, ms=3500):
    await page.evaluate(f"() => VM.go('{h}')")
    await page.wait_for_timeout(ms)
    await idle(page, 800)
    if scroll_to:
        await page.evaluate(f"() => {{ const el = document.querySelector('{scroll_to}'); if (el) el.scrollIntoView({{block: 'start'}}); }}")
        await page.wait_for_timeout(500)
    await shot(page, name)


async def s_prof(b, base):
    # artifact build (no network features), desktop dark
    ctx, page = await newpage(b, "http://127.0.0.1:8791/index.html", tag="prof-art")
    await open_prof(page, "de-wehlen-sonnenuhr", "prof-wehlen-terrain", ".vm-sec[data-sec=terrain]")
    await open_prof(page, "de-wehlen-sonnenuhr", "prof-wehlen-vintage", ".vm-sec[data-sec=vintage]")
    await open_prof(page, "it-barbaresco", "prof-barbaresco-vintage", ".vm-sec[data-sec=vintage]")
    await open_prof(page, "fr-hermitage", "prof-hermitage-drift", ".vm-sec[data-sec=drift]")
    await open_prof(page, "us-napa-valley", "prof-napa-terrain", ".vm-sec[data-sec=terrain]")
    await open_prof(page, "at-wachau", "prof-wachau-rules", ".vm-sec[data-sec=rules]")
    r = await page.evaluate("() => [...document.querySelectorAll('.vm-sec')].map(s => s.dataset.sec + (s.hidden ? ':hidden' : ''))")
    print("  sections", r)
    await ctx.close()
    # phone light, Pages build
    ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", 360, 740, "light", mobile=True, tag="prof-phone")
    await page.evaluate("() => VM.go('site-pt-quinta-do-vesuvio')")
    await page.wait_for_timeout(3500)
    await page.evaluate("() => setSnap('full')")
    await page.wait_for_timeout(600)
    await page.evaluate("() => { const el = document.querySelector('.vm-sec[data-sec=terrain]'); if (el) el.scrollIntoView({block: 'start'}); }")
    await page.wait_for_timeout(500)
    await shot(page, "phone-prof-vesuvio-terrain")
    await page.evaluate("() => { const el = document.querySelector('.vm-sec[data-sec=vintage]'); if (el) el.scrollIntoView({block: 'start'}); }")
    await page.wait_for_timeout(400)
    box = await page.evaluate("() => { const r = document.querySelector('.vt').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }")
    await page.mouse.click(box[0] + box[2] * 0.7, box[1] + 40)
    await page.wait_for_timeout(400)
    await shot(page, "phone-prof-vesuvio-vintage")
    await page.evaluate("() => { const el = document.querySelector('.vm-sec[data-sec=drift]'); if (el) el.scrollIntoView({block: 'start'}); }")
    await page.wait_for_timeout(400)
    await shot(page, "phone-prof-vesuvio-drift")
    sw = await page.evaluate("() => [document.documentElement.scrollWidth, document.getElementById('sheet-body').scrollWidth, document.getElementById('sheet-body').clientWidth]")
    print("  widths", sw)
    await page.evaluate("() => VM.go('about')")
    await page.wait_for_timeout(1500)
    await page.evaluate("() => { const h = [...document.querySelectorAll('#sheet-body .sec')].find(x => /Base maps/.test(x.textContent)); if (h) h.scrollIntoView({block: 'start'}); }")
    await page.wait_for_timeout(400)
    await shot(page, "phone-about-credits")
    await ctx.close()


async def s_art(b, base):
    """artifact build: no external requests besides the CDN script and Google Fonts; no v2 map chrome"""
    ctx, page = await newpage(b, "http://127.0.0.1:8791/index.html", 390, 844, "dark", mobile=True, tag="art")
    hosts = set()
    page.on("request", lambda r: hosts.add(r.url.split("/")[2]))
    await page.wait_for_timeout(3000)
    await page.evaluate("() => VM.go('fr-cote-rotie')")
    await page.wait_for_timeout(5000)
    await idle(page, 1000)
    await shot(page, "art-phone-cote-rotie")
    await page.evaluate("() => VM.go('layers')")
    await page.wait_for_timeout(1500)
    await shot(page, "art-phone-layers")
    r = await page.evaluate("() => ({mode: VM.mode, bm: !!document.getElementById('bm-btn'), attrib: !!document.getElementById('attrib'), sw: navigator.serviceWorker ? !!navigator.serviceWorker.controller : null})")
    print("  artifact:", r, "hosts:", sorted(hosts))
    await ctx.close()


async def s_pwa(b, base):
    ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", 390, 844, "light", mobile=True, tag="pwa", sw=True)
    await page.evaluate("() => navigator.serviceWorker.ready")
    await page.reload()
    await page.wait_for_function("() => window.VM && typeof APP === 'object' && APP.mapReady", timeout=60000)
    ctrl = await page.evaluate("() => !!navigator.serviceWorker.controller")
    man = await page.evaluate("() => fetch('manifest.webmanifest').then(r => r.json()).then(j => j.short_name)")
    await page.evaluate("() => VM.go('pt-douro')")
    await page.wait_for_timeout(6000)
    keys = await page.evaluate("() => caches.keys().then(ks => Promise.all(ks.map(k => caches.open(k).then(c => c.keys()).then(r => [k, r.length]))))")
    print("  sw controller:", ctrl, "manifest:", man, "caches:", keys)
    await ctx.set_offline(True)
    await page.reload()
    await page.wait_for_function("() => window.VM && typeof APP === 'object'", timeout=60000)
    await page.wait_for_timeout(4000)
    await page.evaluate("() => VM.go('pt-douro')")
    await page.wait_for_timeout(4000)
    title = await page.evaluate("() => document.querySelector('#sheet-body .title')?.textContent")
    secs = await page.evaluate("() => [...document.querySelectorAll('.vm-sec')].filter(s => !s.hidden).map(s => s.dataset.sec)")
    print("  offline reload: profile title =", title, "sections:", secs)
    await shot(page, "pwa-offline-douro")
    await ctx.set_offline(False)
    await ctx.close()


FINAL_VIEWS = ["fr-hermitage", "site-de-wehlener-sonnenuhr", "it", "layers", "journal", "compare", "filter", "study", "journeys", "about", "grape-nebbiolo", "region-fr-burgundy"]


async def final_run(b, url, w, h, scheme, mobile, tag, views=FINAL_VIEWS, extra=None):
    ctx, page = await newpage(b, url, w, h, scheme, mobile=mobile, tag=tag)
    await page.wait_for_timeout(2500)
    await shot(page, f"final-{tag}-globe")
    for v in views:
        await page.evaluate(f"() => VM.go('{v}')")
        await page.wait_for_timeout(2600)
        if v in ("fr-hermitage", "study", "journal") :
            await shot(page, f"final-{tag}-{v}")
    if extra:
        await extra(page, tag)
    sw = await page.evaluate("() => [document.documentElement.scrollWidth, innerWidth]")
    if sw[0] > sw[1]:
        problems.append(f"[{tag}] horizontal scroll {sw}")
    await ctx.close()


async def final_extra_gh(page, tag):
    await page.evaluate("() => VM.panel.close()")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, 4.958, 47.212, 14.6)
    await tiles_idle(page, timeout=30000, extra=1500)
    await shot(page, f"final-{tag}-sat-burgundy")
    await page.evaluate("() => setBase('standard')")


async def s_final_dd(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 1440, 900, "dark", False, "desk-dark", extra=final_extra_gh)


async def s_final_dl(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 1440, 900, "light", False, "desk-light")


async def s_final_pd(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 390, 844, "dark", True, "phone-dark", extra=final_extra_gh)


async def s_final_pl(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 390, 844, "light", True, "phone-light")


async def s_final_art(b, base):
    await final_run(b, "http://127.0.0.1:8791/index.html", 390, 844, "dark", True, "art-phone-dark", views=["fr-hermitage", "layers", "journal", "study", "compare", "about"])


SCEN = {"api": s_api, "prof": s_prof, "art": s_art, "pwa": s_pwa, "fdd": s_final_dd, "fdl": s_final_dl, "fpd": s_final_pd, "fpl": s_final_pl, "fart": s_final_art, "sat": s_sat, "3dm": s_3dm, "3dd": s_3dd, "topo": s_topo, "sun": s_sun, "journey": s_journey, "phone": s_phone}

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    port = 8792 if "--gh" in sys.argv else 8791
    base = f"http://127.0.0.1:{port}/"
    if any(a in ("sat", "3dm", "3dd", "topo", "sun", "journey", "phone") for a in args) and "--gh" not in sys.argv:
        base = "http://127.0.0.1:8792/"

    async def main():
        async with async_playwright() as pw:
            b = await launch(pw)
            for a in args or list(SCEN):
                t = time.time()
                await SCEN[a](b, base)
                print(f"-- {a} {time.time() - t:.0f}s")
            await b.close()
        print("\n".join(problems) if problems else "no console problems")
    asyncio.run(main())
