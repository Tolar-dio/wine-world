#!/usr/bin/env python3
"""Drive the page with Playwright + headless Chromium (SwiftShader WebGL) and take screenshots.

Run: python3 /home/claude/winesite/frontend/test_shots.py [scenario ...]
Assumes serve.py runs on :8765. Writes PNGs to work/fe_shots/ and prints console problems.
"""
import asyncio
import json
import sys
import time
from pathlib import Path

from playwright.async_api import async_playwright

URL = "http://127.0.0.1:8765/index.html"
OUT = Path("/home/claude/winesite/work/fe_shots")
OUT.mkdir(parents=True, exist_ok=True)
ARGS = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl", "--use-gl=angle"]
problems = []


async def wait_idle(page, ms=1500, timeout=30000):
    await page.wait_for_function("() => typeof APP === 'object' && APP.mapReady && !map.isMoving()", timeout=timeout)
    await page.wait_for_timeout(ms)
    try:
        await page.wait_for_function("() => map.loaded() && !map.isMoving() && document.getElementById('loading').hidden", timeout=timeout)
    except Exception:
        pass
    await page.wait_for_timeout(400)


async def newpage(browser, w, h, scheme="dark", theme=None, mobile=False, reduced=False):
    ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2 if mobile else 1,
                                    is_mobile=mobile, has_touch=mobile, color_scheme=scheme,
                                    reduced_motion="reduce" if reduced else "no-preference")
    page = await ctx.new_page()
    tag = f"{w}x{h}-{scheme}{'-' + theme if theme else ''}"

    def on_console(m):
        if m.type in ("error", "warning"):
            problems.append(f"[{tag}] {m.type}: {m.text[:300]}")
    page.on("console", on_console)
    page.on("pageerror", lambda e: problems.append(f"[{tag}] pageerror: {str(e)[:300]}"))
    page.on("requestfailed", lambda r: problems.append(f"[{tag}] requestfailed: {r.url[:160]} {r.failure}"))
    page.on("response", lambda r: problems.append(f"[{tag}] HTTP {r.status}: {r.url[:160]}") if r.status >= 400 else None)
    if theme:
        await page.add_init_script("(() => { const set = () => document.documentElement && document.documentElement.setAttribute('data-theme', '%s'); if (document.documentElement) set(); else new MutationObserver((m, o) => { if (document.documentElement) { set(); o.disconnect(); } }).observe(document, { childList: true }); })()" % theme)
    await page.add_init_script("try{localStorage.clear()}catch(e){}")
    return ctx, page


async def expose_map(page):
    await page.add_init_script("""
      (() => { const t = setInterval(() => { try { if (typeof map !== 'undefined' && map) { window.map = map; clearInterval(t); } } catch (e) {} }, 50); })();
    """)


async def shot(page, name):
    p = OUT / f"{name}.png"
    await page.screenshot(path=str(p), timeout=120000)
    print("shot", p)


async def jump(page, lon, lat, z):
    await page.evaluate(f"() => {{ stopSpin(); map.jumpTo({{center:[{lon},{lat}], zoom:{z}}}); }}")
    await wait_idle(page, 1800)


async def scenario_globe(browser, w, h, scheme, theme=None, mobile=False, name=None):
    ctx, page = await newpage(browser, w, h, scheme, theme, mobile)
    t0 = time.time()
    await page.goto(URL)
    await page.wait_for_function("() => typeof APP === 'object' && APP.mapReady", timeout=40000)
    print(f"globe loaded in {time.time() - t0:.1f}s")
    await page.evaluate("() => stopSpin()")
    await wait_idle(page, 2500)
    await shot(page, name or f"globe-{w}x{h}-{scheme}{'-' + theme if theme else ''}")
    return ctx, page


async def run(which):
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=ARGS)
        if "globe" in which:
            for (w, h, sc, th, mob) in [(1440, 900, "dark", None, False), (390, 844, "light", None, True)]:
                ctx, page = await scenario_globe(browser, w, h, sc, th, mob)
                await ctx.close()
        if "themes" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "dark", "light", False, "globe-desk-dark-os-light-attr")
            await page.evaluate("() => document.documentElement.setAttribute('data-theme','dark')")
            await page.wait_for_timeout(800)
            await shot(page, "globe-desk-attr-flip-dark")
            await ctx.close()
        if "zoom" in which:
            for sc in ("dark", "light"):
                ctx, page = await scenario_globe(browser, 1440, 900, sc, None, False, f"tmp-{sc}")
                await jump(page, 6.3, 44.6, 6.6)
                await page.wait_for_timeout(2500)
                await wait_idle(page, 1500)
                await shot(page, f"zoom-sfr-nwit-{sc}")
                info = await page.evaluate("() => ({sources: S.sources, rendered: [...new Set(map.queryRenderedFeatures({layers: S.sources.map(k=>k+'-fill').filter(l=>map.getLayer(l))}).map(f=>f.properties.country))]})")
                print("zoom info", json.dumps(info))
                await ctx.close()
        if "click" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "dark", None, False, "tmp-click")
            await page.evaluate("() => { const f = map.queryRenderedFeatures({layers:['land-fill']}).find(f=>f.properties.iso2==='fr'); window._fr = f && true; }")
            pt = await page.evaluate("() => { const p = map.project([2.5, 46.6]); return [p.x, p.y]; }")
            await page.mouse.click(pt[0], pt[1])
            await page.wait_for_timeout(3500)
            await wait_idle(page, 1000)
            await shot(page, "click-country-fr-desk")
            await page.click("text=Explore the map")
            await wait_idle(page, 2500)
            await shot(page, "explore-fr-desk")
            # appellation click at higher zoom
            await jump(page, 4.87, 44.06, 9.5)
            pt = await page.evaluate("() => { const p = map.project([4.87, 44.06]); return [p.x, p.y]; }")
            await page.mouse.click(pt[0], pt[1])
            await page.wait_for_timeout(2500)
            await shot(page, "click-app-cdp-desk")
            print("hash", await page.evaluate("location.hash"))
            await page.evaluate("() => { document.getElementById('sheet-body').scrollTop = 900 }")
            await page.wait_for_timeout(300)
            await shot(page, "click-app-cdp-desk-scrolled")
            await ctx.close()
        if "search" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "light", None, False, "tmp-search")
            await page.fill("#q", "chateauneuf")
            await page.wait_for_timeout(400)
            await shot(page, "search-chateauneuf-light")
            res = await page.evaluate("() => SR.list.slice(0,5).map(r=>r.id)")
            print("search results", res)
            await page.keyboard.press("Enter")
            await page.wait_for_timeout(4500)
            await wait_idle(page, 1500)
            await shot(page, "search-picked-light")
            await ctx.close()
        if "grape" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "dark", None, False, "tmp-grape")
            await page.goto(URL + "#grape-nebbiolo")
            await page.wait_for_function("() => typeof APP === 'object' && APP.mapReady", timeout=40000)
            await page.wait_for_timeout(3000)
            await wait_idle(page, 1500)
            await shot(page, "grape-nebbiolo-desk")
            await jump(page, 8.0, 45.2, 6.8)
            await shot(page, "grape-nebbiolo-zoom")
            await ctx.close()
        if "timeline" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "dark", None, False, "tmp-tl")
            await page.click(".views button[data-view=timeline]")
            await page.wait_for_timeout(2500)
            await shot(page, "timeline-desk")
            await page.click(".s-ev >> nth=20")
            await page.wait_for_timeout(6000)
            await shot(page, "timeline-event-desk")
            await page.click("#tl-play")
            await page.wait_for_timeout(9000)
            await shot(page, "timeline-tour-desk")
            await page.click("#tl-play")
            await ctx.close()
        if "phone" in which:
            ctx, page = await scenario_globe(browser, 390, 844, "dark", None, True, "phone-globe-dark")
            # tap a country
            pt = await page.evaluate("() => { map.jumpTo({center:[10,45], zoom:2.2}); const p = map.project([12.5, 42.8]); return [p.x, p.y]; }")
            await wait_idle(page, 1200)
            await page.touchscreen.tap(pt[0], pt[1])
            await page.wait_for_timeout(3000)
            await shot(page, "phone-country-it")
            await page.evaluate("() => setSnap('full')")
            await page.wait_for_timeout(700)
            await shot(page, "phone-country-it-full")
            await page.evaluate("() => APP.nav('it-barolo')")
            await page.wait_for_timeout(5000)
            await wait_idle(page, 1500)
            await shot(page, "phone-barolo")
            await page.evaluate("() => APP.nav('grape-nebbiolo')")
            await page.wait_for_timeout(6000)
            await wait_idle(page, 1500)
            await shot(page, "phone-grape")
            await page.evaluate("() => APP.nav('timeline')")
            await page.wait_for_timeout(2500)
            await shot(page, "phone-timeline")
            await page.evaluate("() => APP.nav('layers')")
            await page.wait_for_timeout(1200)
            await shot(page, "phone-layers")
            await ctx.close()
        if "phonelight" in which:
            ctx, page = await scenario_globe(browser, 390, 844, "light", None, True, "phone-globe-light")
            await jump(page, 4.9, 47.1, 9.2)
            await shot(page, "phone-burgundy-light")
            await page.fill("#q", "gevrey")
            await page.wait_for_timeout(400)
            await shot(page, "phone-search-light")
            await ctx.close()
        if "real" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "dark", None, False, "tmp-real")
            # Burgundy at fine-unit zoom: grand crus + premiers crus + sites
            await jump(page, 4.955, 47.2, 12.2)
            await page.wait_for_timeout(4000)
            await wait_idle(page, 2000)
            await shot(page, "real-gevrey-z12-dark")
            pt = await page.evaluate("() => { const p = map.project([4.9645, 47.2135]); return [p.x, p.y]; }")
            await page.mouse.click(pt[0], pt[1])
            await page.wait_for_timeout(3000)
            await shot(page, "real-gevrey-click")
            print("hash", await page.evaluate("location.hash"))
            # points-only Georgian appellation
            await page.evaluate("() => APP.nav('ge-tsinandali')")
            await page.wait_for_timeout(6000)
            await wait_idle(page, 1500)
            await shot(page, "real-georgia-point")
            # a real region profile
            await page.evaluate("() => APP.nav('region-fr-champagne')")
            await page.wait_for_timeout(6000)
            await wait_idle(page, 1500)
            await shot(page, "real-region-champagne")
            await page.evaluate("() => APP.nav('it')")
            await page.wait_for_timeout(5000)
            await page.evaluate("() => { const h = [...document.querySelectorAll('.sec')].find(x => /Regions/.test(x.textContent)); if (h) h.scrollIntoView(); }")
            await page.wait_for_timeout(500)
            await shot(page, "real-country-it-regions")
            await ctx.close()
        if "misc" in which:
            ctx, page = await scenario_globe(browser, 1440, 900, "light", None, False, "tmp-misc")
            await page.evaluate("() => APP.nav('lexicon')")
            await page.wait_for_timeout(2500)
            await page.click("text=Glossary")
            await page.wait_for_timeout(800)
            await shot(page, "lexicon-desk-light")
            await page.evaluate("() => APP.nav('about')")
            await page.wait_for_timeout(2500)
            await shot(page, "about-desk-light")
            await page.evaluate("() => { APP.nav('layers'); }")
            await page.wait_for_timeout(1500)
            await page.click("text=Climate")
            await page.evaluate("() => { map.jumpTo({center:[2,46], zoom:5.2}); }")
            await wait_idle(page, 2500)
            await shot(page, "mode-climate-desk-light")
            await ctx.close()
            # reduced motion on a phone, opened on a deep link
            ctx = await browser.new_context(viewport={"width": 360, "height": 740}, device_scale_factor=2, is_mobile=True, has_touch=True, color_scheme="dark", reduced_motion="reduce")
            page = await ctx.new_page()
            page.on("pageerror", lambda e: problems.append(f"[rm] pageerror: {str(e)[:300]}"))
            page.on("console", lambda m: problems.append(f"[rm] {m.type}: {m.text[:200]}") if m.type == "error" else None)
            await page.goto(URL + "#site-it-cannubi")
            await page.wait_for_function("() => typeof APP === 'object' && APP.mapReady", timeout=60000)
            await page.wait_for_timeout(6000)
            await wait_idle(page, 1500)
            await shot(page, "phone360-site-cannubi-rm")
            sw = await page.evaluate("() => [document.documentElement.scrollWidth, document.documentElement.clientWidth, document.body.scrollWidth]")
            print("scrollWidth", sw)
            await ctx.close()
            # no WebGL: the reference views must still work
            b2 = await p.chromium.launch(args=["--disable-gpu", "--disable-software-rasterizer", "--disable-webgl", "--disable-3d-apis"])
            ctx = await b2.new_context(viewport={"width": 390, "height": 844}, color_scheme="light")
            page = await ctx.new_page()
            page.on("pageerror", lambda e: problems.append(f"[nogl] pageerror: {str(e)[:300]}"))
            await page.goto(URL + "#it")
            await page.wait_for_timeout(5000)
            await shot(page, "nogl-phone-country")
            await ctx.close(); await b2.close()
        if "final" in which:
            for sc, w, h, mob in (("dark", 1440, 900, False), ("light", 390, 844, True)):
                tag = "desk" if not mob else "phone"
                ctx, page = await scenario_globe(browser, w, h, sc, None, mob, f"final-globe-{tag}-{sc}")
                async def go(hash_, name, wait=6000, scroll=None):
                    await page.evaluate(f"() => {{ APP._opts = {{}}; location.hash = '{hash_}'; }}")
                    await page.wait_for_timeout(wait)
                    try:
                        await wait_idle(page, 1200, 20000)
                    except Exception:
                        pass
                    if scroll:
                        await page.evaluate(scroll)
                        await page.wait_for_timeout(400)
                    await shot(page, f"final-{name}-{tag}-{sc}")
                await go("it-barolo", "barolo")
                print(tag, "barolo crumbs:", await page.evaluate("() => document.querySelector('#sheet-body .crumbs').textContent"))
                print(tag, "barolo also:", await page.evaluate("() => (document.getElementById('also-within')||{}).textContent || ''"))
                await go("fr-chambertin", "chambertin")
                print(tag, "chambertin crumbs:", await page.evaluate("() => document.querySelector('#sheet-body .crumbs').textContent"))
                await go("fr-macon-villages", "pref-macon")
                print(tag, "pref:", await page.evaluate("() => [location.hash, (document.querySelector('.pref-note')||{}).textContent]"))
                await go("fr", "france", 6000, "() => { const h = [...document.querySelectorAll('.sec')].find(x => /History/.test(x.textContent)); if (h) h.scrollIntoView(); }")
                print(tag, "france overview chars:", await page.evaluate("() => (document.querySelector('#sheet-body .prose.lead')||{textContent:''}).textContent.length"))
                await go("gb", "gb-abroad", 5000, "() => { const h = document.querySelector('.hist .away'); if (h) h.scrollIntoView({block:'center'}); }")
                await page.evaluate("() => { APP._opts = {}; location.hash = 'lexicon'; }")
                await page.wait_for_timeout(2500)
                await page.click("text=Soils")
                await page.wait_for_timeout(800)
                await shot(page, f"final-soils-{tag}-{sc}")
                await page.click("text=Systems")
                await page.wait_for_timeout(800)
                await shot(page, f"final-systems-{tag}-{sc}")
                await go("site-fr-chambertin", "site", 5000)
                print(tag, "site crumbs:", await page.evaluate("() => document.querySelector('#sheet-body .crumbs').textContent"))
                await ctx.close()
        await browser.close()
    print("\n".join(problems) if problems else "no console problems")


if __name__ == "__main__":
    asyncio.run(run(set(sys.argv[1:]) or {"globe"}))
