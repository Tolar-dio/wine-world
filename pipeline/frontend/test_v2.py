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
    print("  offline; reloading")
    await page.reload(wait_until="domcontentloaded", timeout=60000)
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


FINAL_VIEWS = ["fr-hermitage", "site-de-wehlener-sonnenuhr", "pt", "layers", "journal", "compare", "filter", "study", "journeys", "about", "grape-nebbiolo", "region-fr-burgundy"]


async def final_run(b, url, w, h, scheme, mobile, tag, views=FINAL_VIEWS, extra=None):
    ctx, page = await newpage(b, url, w, h, scheme, mobile=mobile, tag=tag)
    await page.wait_for_timeout(2500)
    await shot(page, f"final-{tag}-globe")
    for v in views:
        await page.evaluate(f"() => VM.go('{v}')")
        await page.wait_for_timeout(2600)
        if v in ("fr-hermitage", "study", "journal") :
            await shot(page, f"final-{tag}-{v}")
    sw = await page.evaluate("() => [document.documentElement.scrollWidth, innerWidth]")
    if sw[0] > sw[1]:
        problems.append(f"[{tag}] horizontal scroll {sw}")
    await ctx.close()
    if extra:
        # a fresh page: Playwright keeps every request object of a page alive, and tile views make thousands
        ctx, page = await newpage(b, url, w, h, scheme, mobile=mobile, tag=tag + "-x")
        await page.wait_for_timeout(1500)
        await extra(page, tag)
        await ctx.close()


async def final_extra_gh(page, tag):
    await page.evaluate("() => VM.panel.close()")
    await page.evaluate("() => setBase('satellite')")
    await jump(page, 4.958, 47.212, 14.6)
    await tiles_idle(page, timeout=30000, extra=1500)
    await shot(page, f"final-{tag}-sat-burgundy")
    await page.evaluate("() => setBase('standard')")


async def s_final_dd(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 1280, 800, "dark", False, "desk-dark", extra=final_extra_gh)


async def s_final_dl(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 1440, 900, "light", False, "desk-light")


async def s_final_pd(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 390, 844, "dark", True, "phone-dark", extra=final_extra_gh)


async def s_final_pl(b, base):
    await final_run(b, "http://127.0.0.1:8792/index.html", 390, 844, "light", True, "phone-light")


async def s_final_art(b, base):
    await final_run(b, "http://127.0.0.1:8791/index.html", 390, 844, "dark", True, "art-phone-dark", views=["fr-hermitage", "layers", "journal", "study", "compare", "about"])


async def scroll_case(page, start, pick_js, label, tag, browser_back=False):
    await page.evaluate(f"() => VM.go('{start}')")
    await page.wait_for_timeout(4500)
    if VM_PHONE.get(tag):
        await page.evaluate("() => setSnap('full')")
        await page.wait_for_timeout(500)
    target = await page.evaluate(pick_js)
    if not target:
        print(f"  [{tag}] {label}: no link found"); return
    href, top = target
    await page.evaluate(f"() => {{ const b = document.getElementById('sheet-body'); b.scrollTop = {top}; }}")
    await page.wait_for_timeout(600)
    before = await page.evaluate("() => [document.getElementById('sheet-body').scrollTop, SHEET.snap]")
    await page.evaluate(f"() => document.querySelector('#sheet-body a[href=\"{href}\"]').click()")
    await page.wait_for_timeout(3500)
    child = await page.evaluate("() => [location.hash, document.getElementById('sheet-body').scrollTop]")
    if browser_back:
        await page.go_back()
    else:
        await page.click("#back")
    await page.wait_for_timeout(4500)
    after = await page.evaluate("() => [location.hash, document.getElementById('sheet-body').scrollTop, SHEET.snap]")
    ok = abs(after[1] - before[0]) <= 3 and child[1] == 0 and after[2] == before[1]
    print(f"  [{tag}] {label}{' (browser back)' if browser_back else ''}: before {before}, child {child}, after {after} -> {'OK' if ok else 'FAIL'}")
    if not ok:
        problems.append(f"[{tag}] scroll restore failed for {label}")


VM_PHONE = {}
PICK_OAKVILLE = """() => { const a = document.querySelector('#sheet-body a[href="#us-oakville"]'); if (!a) return null; const b = document.getElementById('sheet-body'); return ['#us-oakville', Math.max(0, a.getBoundingClientRect().top - b.getBoundingClientRect().top + b.scrollTop - 120)]; }"""
PICK_FINE = """() => { const b = document.getElementById('sheet-body'); const a = [...b.querySelectorAll('a[href^="#fr-"]')].find(x => { const id = x.getAttribute('href').slice(1); const e = D.byId.get(id); return e && e.fine; }); if (!a) return null; return [a.getAttribute('href'), Math.max(0, a.getBoundingClientRect().top - b.getBoundingClientRect().top + b.scrollTop - 120)]; }"""


async def s_scroll(b, base):
    for (w, h, mobile, tag) in ((1280, 800, False, "scroll-desk"), (390, 844, True, "scroll-phone")):
        VM_PHONE[tag] = mobile
        ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", w, h, "dark", mobile=mobile, tag=tag)
        await page.wait_for_timeout(2000)
        await scroll_case(page, "us-napa-valley", PICK_OAKVILLE, "Napa Valley > Oakville", tag)
        await scroll_case(page, "fr-gevrey-chambertin", PICK_FINE, "Gevrey-Chambertin > premier cru", tag)
        await scroll_case(page, "us-napa-valley", PICK_OAKVILLE, "Napa Valley > Oakville", tag, browser_back=True)
        await ctx.close()


async def s_photos(b, base):
    """event and soil photos render (from _global.json), About runs its section slot, the review block is there"""
    ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", 390, 844, "dark", mobile=True, tag="photos")
    await page.wait_for_timeout(2500)
    ev = await page.evaluate("""async () => { await VM.data.timeline(); const j = await VM.data.json('data/photos/_global.json');
      const e = (await VM.data.timeline()).find(x => j[x.id.replace(/^event-/, '')]); return e ? e.id : null; }""")
    await page.evaluate(f"() => VM.go('{ev}')")
    await page.wait_for_timeout(4000)
    r1 = await page.evaluate("() => { const s = document.querySelector('.vm-sec[data-sec=photos]'); return {sec: !!s, hidden: s ? s.hidden : null, img: !!(s && s.querySelector('.ph-hero img')), flag: !!(s && /Wrong photo/i.test(s.textContent))}; }")
    print("  event", ev, r1)
    await shot(page, "photos-event")
    await page.evaluate("() => VM.go('lexicon')")
    await page.wait_for_timeout(2500)
    await page.evaluate("() => { const r = document.querySelector('input[name=lex][value=soils]'); if (r && !r.checked) { r.checked = true; r.dispatchEvent(new Event('change')); } }")
    await page.wait_for_timeout(3000)
    r2 = await page.evaluate("() => ({soils: document.querySelectorAll('article.soil').length, photos: document.querySelectorAll('article.soil .ph-soil').length})")
    print("  lexicon soils", r2)
    await shot(page, "photos-soils")
    fired = await page.evaluate("""async () => { let n = 0; VM.on('about:render', () => n++); VM.go('about'); await new Promise(r => setTimeout(r, 3500));
      return {fired: n, review: !!document.querySelector('.pr-about'), slot: !!document.querySelector('#sheet-body .vm-slot[data-slot=end]')}; }""")
    print("  about", fired)
    await ctx.close()
    for cond, msg in ((r1["img"] and not r1["hidden"], "event photo did not render"), (r2["photos"] >= 20, "soil photos missing"), (fired["fired"] == 1, "about:render did not fire once")):
        if not cond:
            problems.append("[photos] " + msg)


async def touch(cdp, kind, pts):
    await cdp.send("Input.dispatchTouchEvent", {"type": kind, "touchPoints": [{"x": x, "y": y, "id": i, "radiusX": 4, "radiusY": 4, "force": 1} for i, (x, y) in enumerate(pts)]})


async def twist(page, cdp, cx, cy, deg=40, r=70, steps=14):
    import math
    pts = lambda a: [(cx - r * math.cos(a), cy - r * math.sin(a)), (cx + r * math.cos(a), cy + r * math.sin(a))]
    await touch(cdp, "touchStart", pts(0))
    for i in range(1, steps + 1):
        await page.wait_for_timeout(16)
        await touch(cdp, "touchMove", pts(math.radians(deg) * i / steps))
    await touch(cdp, "touchEnd", [])
    await page.wait_for_timeout(700)


async def two_drag(page, cdp, cx, cy, dy=-90, steps=12):
    p0 = [(cx - 60, cy), (cx + 60, cy)]
    await touch(cdp, "touchStart", p0)
    for i in range(1, steps + 1):
        await page.wait_for_timeout(16)
        await touch(cdp, "touchMove", [(x, y + dy * i / steps) for x, y in p0])
    await touch(cdp, "touchEnd", [])
    await page.wait_for_timeout(700)


async def s_rotate(b, base):
    ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", 390, 844, "dark", mobile=True, tag="rotate")
    cdp = await ctx.new_cdp_session(page)
    cam = "() => [+VM.map.getBearing().toFixed(1), +VM.map.getPitch().toFixed(1), VM.map.getProjection().type || 'globe']"
    res = {}
    await jump(page, 4.9, 46.5, 3)                     # globe scale
    await twist(page, cdp, 195, 360)
    res["globe twist"] = await page.evaluate(cam)
    await page.click("#compass"); await page.wait_for_timeout(800)
    res["compass"] = await page.evaluate(cam)
    await jump(page, 4.95, 47.2, 12.5)                 # flat (Mercator above z12)
    await twist(page, cdp, 195, 360, deg=-35)
    res["flat twist"] = await page.evaluate(cam)
    res["compass gold"] = await page.evaluate("() => document.getElementById('compass').dataset.rot")
    await two_drag(page, cdp, 195, 400)
    res["flat 2-finger drag (no tilt)"] = await page.evaluate(cam)
    await page.click("#compass"); await page.wait_for_timeout(800)
    await page.evaluate("() => setTerrain3D(true, {instant: true})")
    await page.wait_for_timeout(1500)
    p0 = (await page.evaluate(cam))[1]
    await two_drag(page, cdp, 195, 420, dy=-80)
    res["3D 2-finger drag (tilts)"] = (p0, await page.evaluate(cam))
    await page.evaluate("() => setTerrain3D(false, {instant: true})")
    await page.wait_for_timeout(1000)
    await two_drag(page, cdp, 195, 400)
    res["after 3D off: drag"] = await page.evaluate(cam)
    # a twist on the open bottom sheet must not turn the map
    await page.evaluate("() => VM.go('fr-hermitage')")
    await page.wait_for_timeout(3500)
    await page.evaluate("() => setSnap('half')")
    await page.wait_for_timeout(600)
    b0 = (await page.evaluate(cam))[0]
    await twist(page, cdp, 195, 700)
    res["twist on sheet"] = (b0, await page.evaluate(cam))
    for k, v in res.items():
        print(f"  {k}: {v}")
    ok = (abs(res["globe twist"][0]) > 8 and res["compass"][0] == 0 and abs(res["flat twist"][0]) > 8 and res["compass gold"] == "1"
          and res["flat 2-finger drag (no tilt)"][1] == 0 and res["after 3D off: drag"][1] == 0 and res["twist on sheet"][0] == res["twist on sheet"][1][0])
    print("  rotate checks:", "OK" if ok else "FAIL")
    if not ok:
        problems.append("[rotate] gesture checks failed")
    await ctx.close()


async def cold(b, h, w=390, hh=844, mobile=True, tag="cold"):
    ctx = await b.new_context(viewport={"width": w, "height": hh}, device_scale_factor=2 if mobile else 1, is_mobile=mobile, has_touch=mobile, color_scheme="light", service_workers="block")
    page = await ctx.new_page()
    page.on("pageerror", lambda e: problems.append(f"[{tag}] pageerror: {str(e)[:300]}"))
    page.on("console", lambda m: problems.append(f"[{tag}] {m.type}: {m.text[:300]}") if m.type in ("error", "warning") and not any(i in m.text for i in IGNORE) else None)
    await page.route("https://upload.wikimedia.org/**", lambda route: route.fulfill(status=200, content_type="image/jpeg", body=PH.read_bytes(), headers={"Access-Control-Allow-Origin": "*"}))
    t0 = time.time()
    await page.goto(f"http://127.0.0.1:8792/index.html#{h}")
    try:
        await page.wait_for_function("() => document.querySelector('#sheet-body .title')", timeout=40000)
    except Exception:
        pass
    await page.wait_for_timeout(2500)
    print(f"  cold #{h}: panel after {time.time() - t0:.1f}s (SwiftShader)")
    return ctx, page


async def s_qa(b, base):
    R = {}
    ctx, page = await cold(b, "site-fr-chambertin", tag="cold-site")
    R["cold site crumbs"] = await page.evaluate("() => document.querySelector('#sheet-body .crumbs')?.textContent")
    R["cold site 'not on the map'"] = await page.evaluate("() => /not on the map/.test(document.getElementById('sheet-body').textContent)")
    await shot(page, "qa-cold-site-chambertin")
    await ctx.close()
    ctx, page = await cold(b, "it", tag="cold-it")
    R["cold it title/eyebrow"] = await page.evaluate("() => [document.querySelector('#sheet-body .title')?.textContent, document.getElementById('sheet-crumb').textContent]")
    R["it production"] = await page.evaluate("() => [...document.querySelectorAll('#sheet-body .ledger div')].map(d => d.textContent).find(t => /Production/.test(t))")
    await ctx.close()
    ctx, page = await cold(b, "xx-nothing-here", tag="cold-404")
    R["unknown hash"] = await page.evaluate("() => document.querySelector('#sheet-body .title')?.textContent")
    await shot(page, "qa-not-found")
    await ctx.close()
    ctx, page = await cold(b, "it-alto-adige-vetzaner", 1440, 900, False, tag="cold-src")
    R["source line"] = await page.evaluate("() => [...document.querySelectorAll('#sheet-body p.src')].map(p => p.textContent).find(t => /^Boundary/.test(t))")
    vb = await page.evaluate("""() => { const nav = document.querySelector('.views'), r = nav.getBoundingClientRect();
      return [...nav.querySelectorAll('button')].map(b => { const q = b.getBoundingClientRect(); return [b.textContent.trim(), q.right <= r.right + 1 && q.width > 20]; }); }""")
    R["views visible"] = vb
    await shot(page, "qa-desk-views-bar")
    q = await page.evaluate("""async () => { await VM.data.loadIndex(); await APP.loadReference(); await new Promise(r => setTimeout(r, 300));
      const m = q => VM.search.query(q, {limit: 8}).map(r => r.name + ' | ' + r.meta);
      return { kellerberg: m('kellerberg'), brunello: m('brunello'), kimmeridgian: m('kimmeridgian') }; }""")
    R.update(q)
    # memory: visit several regions, then check how many country sources stay loaded
    for (lon, lat, z) in ((4.9, 47.2, 10.5), (7.0, 49.9, 10.5), (15.5, 48.4, 10.5), (-2.5, 42.5, 9), (-122.4, 38.4, 9.5)):
        await page.evaluate(f"() => {{ S.seen.forEach((v, k) => S.seen.set(k, v - 70000)); VM.map.jumpTo({{center: [{lon}, {lat}], zoom: {z}}}); }}")
        await page.wait_for_timeout(5000)
    R["loaded sources after tour"] = await page.evaluate("() => S.sources.slice()")
    await ctx.close()
    # journeys over national imagery: no uncaught errors from the tile protocol
    ctx, page = await newpage(b, "http://127.0.0.1:8792/index.html", 1100, 720, "dark", tag="qa-journey")
    await page.evaluate("() => VM.go('journey-rhone')")
    await page.wait_for_timeout(20000)
    await page.evaluate("() => { jrPause(); stopJourney(); }")
    await page.wait_for_timeout(2500)
    R["after journey: pitch, 3D"] = await page.evaluate("() => [+VM.map.getPitch().toFixed(1), BM.terrain]")
    await ctx.close()
    for k, v in R.items():
        print(f"  {k}: {v}")


SCEN = {"api": s_api, "prof": s_prof, "scroll": s_scroll, "photos": s_photos, "rotate": s_rotate, "qa": s_qa, "art": s_art, "pwa": s_pwa, "fdd": s_final_dd, "fdl": s_final_dl, "fpd": s_final_pd, "fpl": s_final_pl, "fart": s_final_art, "sat": s_sat, "3dm": s_3dm, "3dd": s_3dd, "topo": s_topo, "sun": s_sun, "journey": s_journey, "phone": s_phone}

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
