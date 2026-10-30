#!/usr/bin/env python3
"""Assemble the GitHub Pages site into /home/claude/wine-world/docs (repo Tolar-dio/wine-world, served from docs/).

  docs/index.html, manifest.webmanifest, sw.js, icons/, .nojekyll   from dist-gh/ (run frontend/build.py first)
  docs/data/**, docs/fonts/**                                         from site/data and site/fonts

Files that changed are copied; files in docs/ that are no longer part of the site are removed (docs/CNAME is kept).
Nothing is committed or pushed.

Run: python3 -I /home/claude/winesite/frontend/deploy_gh.py [--dry-run] [--build] [--skip-data]
  --build        run frontend/build.py first
  --include P    with --skip-data, also copy site/P (e.g. --include data/map for the front end's own map files:
                 coverage polygons and river journeys); repeatable
  --skip-data    front-end only (alias --only-frontend): copy index.html, sw.js, manifest, icons, .nojekyll and
                 fonts/; leave docs/data/ untouched and remove nothing. Use it whenever site/data may hold data that
                 integrate.py has not processed yet. The page embeds a manifest of the data files it may request, so
                 any file listed there but missing from docs/data is reported (it would 404 until a data deploy).
"""
import json
import re
import filecmp
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path("/home/claude/winesite")
DIST = ROOT / "dist-gh"
SITE = ROOT / "site"
DOCS = Path("/home/claude/wine-world/docs")
KEEP = {"CNAME"}
GH_LIMIT = 100 * 1024 * 1024      # GitHub rejects files over 100 MB
GH_WARN = 50 * 1024 * 1024


def plan(skip_data=False, include=()):
    files = {}
    for name in ("index.html", "manifest.webmanifest", "sw.js", ".nojekyll"):
        p = DIST / name
        if not p.exists():
            raise SystemExit(f"missing {p}: run python3 -I frontend/build.py first")
        files[name] = p
    for p in sorted((DIST / "icons").glob("*.png")):
        files[f"icons/{p.name}"] = p
    if skip_data:
        for pre in include:
            for p in sorted((SITE / pre).rglob("*")) if (SITE / pre).is_dir() else [SITE / pre]:
                if p.is_file() and p.stat().st_size > 0:
                    files[p.relative_to(SITE).as_posix()] = p
    for top in (("fonts",) if skip_data else ("data", "fonts")):
        for p in sorted((SITE / top).rglob("*")):
            if p.is_file() and not p.name.startswith(".") and "__pycache__" not in p.parts and p.stat().st_size > 0:
                files[p.relative_to(SITE).as_posix()] = p
    return files


def main():
    dry = "--dry-run" in sys.argv
    if "--build" in sys.argv:
        subprocess.run([sys.executable, "-I", str(ROOT / "frontend/build.py")], check=True)
    skip = "--skip-data" in sys.argv or "--only-frontend" in sys.argv
    inc = [sys.argv[i + 1].strip("/") for i, a in enumerate(sys.argv[:-1]) if a == "--include"]
    files = plan(skip, inc)
    page = (DIST / "index.html").read_text(encoding="utf-8")
    if "mode:'gh'" not in page.replace(" ", ""):
        raise SystemExit("dist-gh/index.html is not a Pages build (mode is not 'gh')")
    if skip:
        # data files the new page may request (its embedded manifest) that docs/ does not have yet
        m = re.search(r"window\.__VM_MANIFEST=(\{.*?\});window\.__VM_BUILD", page)
        listed = json.loads(m.group(1)).get("files", []) if m else []
        missing = [f for f in listed if not (DOCS / f).is_file()]
        if missing:
            print(f"warning: the page lists {len(missing)} data file(s) that docs/ lacks; they 404 until a data deploy:")
            for f in missing[:15]:
                print("  ", f)
    copied = same = 0
    total = 0
    for rel, src in files.items():
        size = src.stat().st_size
        total += size
        if size > GH_LIMIT:
            raise SystemExit(f"{rel} is {size / 1e6:.0f} MB, over GitHub's 100 MB limit")
        if size > GH_WARN:
            print(f"warning: {rel} is {size / 1e6:.0f} MB")
        dst = DOCS / rel
        if dst.exists() and dst.stat().st_size == size and filecmp.cmp(src, dst, shallow=False):
            same += 1
            continue
        copied += 1
        if not dry:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
    removed = []
    if DOCS.exists() and not skip:
        for p in sorted(DOCS.rglob("*"), reverse=True):
            rel = p.relative_to(DOCS).as_posix()
            if p.is_file() and rel not in files and rel not in KEEP:
                removed.append(rel)
                if not dry:
                    p.unlink()
            elif p.is_dir() and not dry and not any(p.iterdir()):
                p.rmdir()
    print(f"{'front end only (docs/data untouched): ' if skip else ''}{'would copy' if dry else 'copied'} {copied}, unchanged {same}, "
          f"{'would remove' if dry else 'removed'} {len(removed)}; {len(files)} files, {total / 1e6:.1f} MB in {DOCS}")
    for r in removed[:20]:
        print("  removed", r)
    if not dry:
        print("Next: cd /home/claude/wine-world && git add -A docs && git commit -m 'Update site' && git push")


if __name__ == "__main__":
    main()
