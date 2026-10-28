"""QA for the non-European geo files written by world_*.py. Run: python3 -I scripts/world_qa.py"""
import json
import os
import re
import sys

from shapely.geometry import shape

GEO = "/home/claude/winesite/site/data/geo"
FILES = ["us", "au", "cl", "ar", "za", "nz", "ca", "br", "jp", "uy"]
MUST = ["us-napa-valley", "us-oakville", "us-willamette-valley", "au-barossa-valley", "cl-valle-del-maipo"]
EM = "—"
ok = True
allids = set()
for c in FILES:
    p = f"{GEO}/{c}.geojson"
    raw = open(p, encoding="utf-8").read()
    fc = json.loads(raw)
    ids = set()
    bad = []
    for f in fc["features"]:
        pr = f["properties"]
        i = pr["id"]
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", i) or i in ids:
            bad.append(("id", i))
        ids.add(i)
        g = shape(f["geometry"])
        if g.is_empty or f["geometry"]["type"] not in ("Polygon", "MultiPolygon"):
            bad.append(("geom", i))
        if not g.is_valid:
            bad.append(("invalid", i))
        lp = pr["lp"]
        if not g.buffer(1e-4).contains(shape({"type": "Point", "coordinates": lp})):
            bad.append(("lp", i))
        for k in ("name", "cat", "src", "bq", "area", "lp", "bbox", "country"):
            if k not in pr:
                bad.append(("missing " + k, i))
        if pr["bq"] not in ("official", "commune", "admin", "approx"):
            bad.append(("bq", i))
        # 4-decimal coordinates
        cs = f["geometry"]["coordinates"]
        flat = cs[0][0] if f["geometry"]["type"] == "Polygon" else cs[0][0][0]
        if any(len(str(v).split(".")[-1]) > 4 for v in flat if isinstance(v, float)):
            bad.append(("precision", i))
    for f in fc["features"]:
        par = f["properties"].get("parent")
        if par is not None and par not in ids:
            bad.append(("parent", f["properties"]["id"]))
    if EM in raw:
        bad.append(("em dash", c))
    allids |= ids
    size = os.path.getsize(p)
    print(f"{c}: {len(fc['features'])} features, {size/1e6:.2f} MB, problems: {bad[:6]}")
    ok &= not bad
miss = [m for m in MUST if m not in allids]
print("must-have missing:", miss)
sys.exit(0 if ok and not miss else 1)
