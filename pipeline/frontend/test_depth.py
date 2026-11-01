#!/usr/bin/env python3
"""Depth-pack QA (Vitis Mundi): headless-Chrome render of the gh build with 3D terrain + satellite,
screenshot, and a console/request-error report. Run after build.py --out and after a region's pack is built.

Usage:
  python3 -I test_depth.py --name napa --center -122.42,38.45 --zoom 13 --shot qa/napa.png [--pitch 55]
Serves the build dir + the site data via serve.py, so it needs VITIS_ROOT in the environment.
"""
import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

import requests

try:
    from playwright.sync_api import sync_playwright
except Exception:
    print("pip install playwright", file=sys.stderr)
    sys.exit(2)

VITIS_ROOT = os.environ.get('VITIS_ROOT')
HERE = Path(__file__).resolve().parent
WS = Path(VITIS_ROOT) if VITIS_ROOT else HERE.parent.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--name', default='region')
    ap.add_argument('--center', default='-122.42,38.45')
    ap.add_argument('--zoom', type=float, default=13)
    ap.add_argument('--pitch', type=float, default=55)
    ap.add_argument('--bearing', type=float, default=0)
    ap.add_argument('--shot', default='qa.png')
    ap.add_argument('--port', type=int, default=8770)
    ap.add_argument('--build-dir', default=None)
    ap.add_argument('--wait', type=float, default=11.0)
    args = ap.parse_args()

    build_dir = args.build_dir or os.environ.get('DEPTH_BUILD')
    if not build_dir:
        print('need --build-dir or DEPTH_BUILD (the dir holding gh.html)', file=sys.stderr)
        sys.exit(2)

    py = sys.executable
    serve = subprocess.Popen(
        [py, '-I', str(HERE / 'serve.py'), str(args.port), '--root', build_dir],
        cwd=str(HERE), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        for _ in range(60):
            try:
                requests.get(f'http://127.0.0.1:{args.port}/', timeout=1)
                break
            except Exception:
                time.sleep(0.3)

        lon, lat = (float(v) for v in args.center.split(','))
        os.makedirs(os.path.dirname(os.path.abspath(args.shot)) or '.', exist_ok=True)

        report = {'name': args.name, 'console_errors': [], 'page_errors': [], 'failed_requests': [], 'bad_responses': [], 'depth_events': []}
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='chrome', headless=True, args=['--disable-gpu'])
            page = browser.new_page(viewport={'width': 1200, 'height': 800})
            page.on('console', lambda m: report['console_errors'].append(m.text) if m.type in ('error', 'warning') else None)
            page.on('pageerror', lambda e: report['page_errors'].append(str(e)))
            page.on('requestfailed', lambda r: report['failed_requests'].append(f'{r.url} :: {r.failure}') if (r.failure or '').find('ERR_ABORTED') < 0 else None)
            page.on('response', lambda r: report['bad_responses'].append(f'{r.status} {r.url}') if r.status >= 400 else None)

            url = f'http://127.0.0.1:{args.port}/gh.html#{args.name}'
            page.goto(url, wait_until='load', timeout=60000)
            page.wait_for_function('window.VM && window.VM.map && window.VM.map.loaded()', timeout=60000)
            page.evaluate('''() => {
                window.__depthEvents = [];
                if (window.VM && window.VM.on) window.VM.on('depth', e => window.__depthEvents.push(e));
            }''')
            page.evaluate(f'''() => {{
                try {{ if (typeof setBase === 'function') setBase('satellite'); }} catch (e) {{}}
                try {{ if (typeof setTerrain3D === 'function') setTerrain3D(true, {{force:true, instant:true}}); }} catch (e) {{}}
                window.VM.map.jumpTo({{center:[{lon},{lat}], zoom:{args.zoom}, pitch:{args.pitch}, bearing:{args.bearing}}});
            }}''')
            page.wait_for_timeout(int(args.wait * 1000))
            report['depth_events'] = page.evaluate('() => window.__depthEvents || []')
            report['state'] = page.evaluate('''() => {
                const m = window.VM.map;
                const ids = (m.getStyle().layers || []).map(l => l.id).filter(id => id.startsWith('dp-'));
                const q = l => { if (!l.length) return 0; try { return (m.queryRenderedFeatures({ layers: l }) || []).length; } catch (e) { return -1; } };
                return {
                    terrain: !!(m.getTerrain && m.getTerrain()),
                    demSource: !!m.getSource('dem-terrain'),
                    demLoaded: m.getSource('dem-terrain') ? m.isSourceLoaded('dem-terrain') : false,
                    vineyards: q(ids.filter(id => id.endsWith('-vineyard'))),
                    buildings: q(ids.filter(id => id.endsWith('-building'))),
                    zoom: +m.getZoom().toFixed(2), pitch: +m.getPitch().toFixed(1),
                    activeLayers: ids
                };
            }''')
            page.screenshot(path=args.shot)
            browser.close()

        report['shot'] = args.shot
        print(json.dumps(report, indent=2))
        errs = report['console_errors'] + report['page_errors']
        print(f"TOTAL ERRORS: {len(errs)}, failed requests: {len(report['failed_requests'])}, bad responses: {len(report['bad_responses'])}")
    finally:
        serve.terminate()
        serve.wait(timeout=5)


if __name__ == '__main__':
    main()
