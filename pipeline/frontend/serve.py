#!/usr/bin/env python3
"""Static test server: serves work/fe_fixtures/ first, then site/ (fixtures never go into site/).

Run: python3 -I /home/claude/winesite/frontend/serve.py [port] [--no-fixtures] [--root DIR] [--gh]
--root DIR serves DIR first (a private build from build.py --out DIR: index.html, gh.html), then site/.
--gh serves dist-gh/ first (the GitHub Pages page, manifest, icons and service worker), then site/.
"""
import http.server
import os
import sys
from functools import partial
from pathlib import Path

ROOT = Path("/home/claude/winesite")
SITE = ROOT / "site"
FIX = ROOT / "work" / "fe_fixtures"
USE_FIX = "--no-fixtures" not in sys.argv and "--root" not in sys.argv and "--gh" not in sys.argv
FIRST = None
if "--root" in sys.argv:
    FIRST = Path(sys.argv[sys.argv.index("--root") + 1]).resolve()
elif "--gh" in sys.argv:
    FIRST = ROOT / "dist-gh"


class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".geojson": "application/geo+json", ".pbf": "application/x-protobuf", ".json": "application/json",
                      ".webmanifest": "application/manifest+json", ".js": "text/javascript"}

    def translate_path(self, path):
        rel = path.split("?", 1)[0].split("#", 1)[0].lstrip("/")
        rel = os.path.normpath(rel).lstrip("./") if rel else "index.html"
        if rel in ("", "."):
            rel = "index.html"
        if FIRST is not None:
            f = FIRST / rel
            if f.is_file():
                return str(f)
        if USE_FIX:
            f = FIX / rel
            if f.is_file():
                return str(f)
        return str(SITE / rel)

    def guess_type(self, path):
        t = super().guess_type(path)
        return t + "; charset=utf-8" if t in ("text/html", "application/json", "application/geo+json", "text/css", "text/javascript", "application/javascript") else t

    def log_message(self, fmt, *args):
        if args and str(args[1]) not in ("200", "304"):
            sys.stderr.write("[serve] " + fmt % args + "\n")


if __name__ == "__main__":
    port = int(next((a for a in sys.argv[1:] if a.isdigit()), "8765"))
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    http.server.ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
