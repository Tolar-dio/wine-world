#!/usr/bin/env python3
"""Assemble site/index.html from frontend/src/*.

Run: python3 -I /home/claude/winesite/frontend/build.py
Re-run after the data changes: it bakes a manifest of the files under site/ (so the page never
requests a file that does not exist, which would log 404s) and the glyph ranges per font stack.
"""
import base64
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path("/home/claude/winesite")
SRC = ROOT / "frontend" / "src"
SITE = ROOT / "site"
OUT = SITE / "index.html"
MAPLIBRE = "5.24.0"


PBF_SRC = ROOT / "work" / "fonts_pbf"      # glyph PBFs built by scripts/fonts_build.js (kept out of site/)
GLYPHS_OUT = SITE / "fonts" / "glyphs.json"  # what ships: {fontstack: {"0-255": "<base64 pbf>", ...}}
# Only ranges that label text can use: Latin, Latin Extended A/B, Latin Extended Additional, general punctuation.
# safeLabel() in the page strips anything outside the ranges listed in the manifest.
GLYPH_RANGES = (0, 256, 512, 7680, 8192)


def pack_glyphs():
    """Pack the glyph PBFs into one JSON (the artifact host does not serve .pbf)."""
    out = {}
    if not PBF_SRC.exists():
        return json.loads(GLYPHS_OUT.read_text()) if GLYPHS_OUT.exists() else {}
    for d in sorted(PBF_SRC.iterdir()):
        if not d.is_dir():
            continue
        stack = {}
        for start in GLYPH_RANGES:
            f = d / f"{start}-{start + 255}.pbf"
            if f.exists():
                stack[f"{start}-{start + 255}"] = base64.b64encode(f.read_bytes()).decode("ascii")
        if stack:
            out[d.name] = stack
    GLYPHS_OUT.parent.mkdir(parents=True, exist_ok=True)
    GLYPHS_OUT.write_text(json.dumps(out, separators=(",", ":")), encoding="utf-8")
    return out


def manifest(site: Path, glyphs_packed):
    files = []
    for p in sorted(site.rglob("*")):
        if p.is_file():
            r = p.relative_to(site).as_posix()
            if r == "index.html" or r.startswith("fonts/"):
                continue
            if p.stat().st_size == 0:
                continue
            files.append(r)
    glyphs = {stack: sorted(int(k.split("-")[0]) for k in ranges) for stack, ranges in glyphs_packed.items()}
    return {"files": files, "glyphs": glyphs}


# The artifact host wraps the page in this skeleton; the GitHub Pages build adds it itself.
RESET = (":root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
         "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}")
SKELETON = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            '<style>' + RESET + '</style>\n')
DIST_GH = ROOT / "dist-gh"


def build(out=OUT, extra_files=(), wrap=False):
    css_ml = (ROOT / "frontend" / "maplibre-gl.css").read_text(encoding="utf-8")
    css = (SRC / "styles.css").read_text(encoding="utf-8")
    head = (SRC / "head.html").read_text(encoding="utf-8")
    body = (SRC / "body.html").read_text(encoding="utf-8")
    js = "\n".join((SRC / n).read_text(encoding="utf-8") for n in ("core.js", "map.js", "ui.js"))
    # keep the script pure ASCII so it survives any charset mix-up (\uXXXX is valid in strings and regexes)
    def esc_u(c):
        if ord(c) < 128:
            return c
        b = c.encode("utf-16-be")
        return "".join(f"\\u{int.from_bytes(b[i:i + 2], 'big'):04x}" for i in range(0, len(b), 2))
    js = "".join(esc_u(c) for c in js)
    m = manifest(SITE, GLYPHS)
    if extra_files:
        m["files"] = sorted(set(m["files"]) | set(extra_files))
    man = json.dumps(m, separators=(",", ":"))
    html = (
        head
        + "<style>\n/* maplibre-gl@" + MAPLIBRE + " */\n" + css_ml.strip() + "\n/* Vitis Mundi */\n" + css + "</style>\n"
        + body
        + f'<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@{MAPLIBRE}/dist/maplibre-gl.js"></script>\n'
        + "<script>window.__VM_MANIFEST=" + man + ";</script>\n"
        + "<script>\n" + js + "\n</script>\n"
    )
    if wrap:
        # the title, metas and font links belong in <head>; everything from the first <style> on goes in it too,
        # the markup and scripts in <body>
        cut = html.index('<div id="app"')
        html = SKELETON + html[:cut] + "</head>\n<body>\n" + html[cut:] + "</body>\n</html>\n"
    out.write_text(html, encoding="utf-8")
    return out, len(html.encode("utf-8")), len(m["files"])


GLYPHS = {}

if __name__ == "__main__":
    GLYPHS.update(pack_glyphs())
    print(f"wrote {GLYPHS_OUT} ({GLYPHS_OUT.stat().st_size / 1024:.0f} KB, " + ", ".join(f"{k}: {len(v)} ranges" for k, v in GLYPHS.items()) + ")")
    o, n, k = build()
    print(f"wrote {o} ({n/1024:.0f} KB, manifest {k} files)")
    DIST_GH.mkdir(exist_ok=True)
    o, n, k = build(DIST_GH / "index.html", wrap=True)
    print(f"wrote {o} ({n/1024:.0f} KB; standalone page for GitHub Pages, same relative data paths as site/)")
    if "--test" in sys.argv:
        fix = ROOT / "work" / "fe_fixtures"
        extra = [q.relative_to(fix).as_posix() for q in fix.rglob("*") if q.is_file() and q.name != "index.html"]
        o, n, k = build(fix / "index.html", extra, wrap=True)
        print(f"wrote test page {o} (manifest {k} files incl. {len(extra)} fixtures)")
