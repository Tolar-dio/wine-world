#!/usr/bin/env python3
"""Static test server: serves work/fe_fixtures/ first, then site/ (fixtures never go into site/).

Run: python3 -I /home/claude/winesite/frontend/serve.py [port] [--no-fixtures]
"""
import http.server
import os
import sys
from functools import partial
from pathlib import Path

ROOT = Path("/home/claude/winesite")
SITE = ROOT / "site"
FIX = ROOT / "work" / "fe_fixtures"
USE_FIX = "--no-fixtures" not in sys.argv


class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".geojson": "application/geo+json", ".pbf": "application/x-protobuf", ".json": "application/json"}

    def translate_path(self, path):
        rel = path.split("?", 1)[0].split("#", 1)[0].lstrip("/")
        rel = os.path.normpath(rel).lstrip("./") if rel else "index.html"
        if rel in ("", "."):
            rel = "index.html"
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
    http.server.ThreadingHTTPServer(("127.0.0.1", port), H).serve_forever()
