#!/usr/bin/env python3
"""Render the standalone Napa 3D scene (docs/3d/napa.html) in headless Chrome and report errors + a screenshot.
Serves docs/ directly (the three.js scene needs no byte-range support).

Usage: python3 -I test_napa3d.py --docs <docs-dir> [--shot qa/napa3d.png]
"""
import argparse
import json
import os
import subprocess
import sys
import time

from playwright.sync_api import sync_playwright


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--docs', required=True)
    ap.add_argument('--shot', default='napa3d.png')
    ap.add_argument('--port', type=int, default=8810)
    ap.add_argument('--wait', type=float, default=10.0)
    ap.add_argument('--limit', type=int, default=0)
    args = ap.parse_args()

    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(args.port), '--directory', args.docs],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    report = {'console_errors': [], 'page_errors': [], 'bad_responses': [], 'ready': False}
    try:
        time.sleep(1.0)
        with sync_playwright() as p:
            b = p.chromium.launch(channel='chrome', headless=True, args=['--disable-gpu', '--use-angle=swiftshader'])
            page = b.new_page(viewport={'width': 1280, 'height': 800})
            page.on('console', lambda m: report['console_errors'].append(m.text) if m.type in ('error',) else None)
            page.on('pageerror', lambda e: report['page_errors'].append(str(e)))
            page.on('response', lambda r: report['bad_responses'].append(f'{r.status} {r.url}') if r.status >= 400 else None)
            url = f'http://127.0.0.1:{args.port}/3d/napa.html' + (f'?limit={args.limit}' if args.limit else '')
            page.goto(url, wait_until='load', timeout=60000)
            page.wait_for_function("document.getElementById('load').classList.contains('gone')", timeout=60000)
            report['ready'] = True
            page.wait_for_timeout(int(args.wait * 1000))
            os.makedirs(os.path.dirname(os.path.abspath(args.shot)) or '.', exist_ok=True)
            page.screenshot(path=args.shot, timeout=60000)
            report['shot'] = args.shot
            b.close()
        print(json.dumps(report, indent=2))
        print(f"errors: {len(report['console_errors'])} console, {len(report['page_errors'])} page, {len(report['bad_responses'])} bad responses")
    finally:
        srv.terminate()
        srv.wait(timeout=5)


if __name__ == '__main__':
    main()
