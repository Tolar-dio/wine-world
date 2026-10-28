"""Merge work/c12/parts/*.json into data/content/c12_oceania_africa_asia.json and validate.
Run: python3 -I /home/claude/winesite/scripts/c12/merge_c12.py
"""
import json
import os
import re
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c12")
from c12_common import PARTS, ROOT, check_text, geo_index

ORDER = ["au", "nz", "za", "cn", "jp", "misc"]
OUT = os.path.join(ROOT, "data", "content", "c12_oceania_africa_asia.json")

merged = {"countries": [], "regions": [], "appellations": [], "sites": []}
for k in ORDER:
    d = json.load(open(os.path.join(PARTS, k + ".json"), encoding="utf-8"))
    for key in merged:
        merged[key] += d.get(key, [])

import enrich
for c in merged["countries"]:
    if c["iso2"] in enrich.COUNTRY_OVERVIEW:
        c["overview"] = c["overview"].rstrip() + "\n\n" + enrich.COUNTRY_OVERVIEW[c["iso2"]]
    c["history"] = c["history"] + enrich.COUNTRY_HISTORY.get(c["iso2"], [])
used = set()
for a in merged["appellations"]:
    k = (a["country"], a["name"])
    if k in enrich.APP:
        a["summary"] = a["summary"].rstrip() + enrich.APP[k]
        used.add(k)
unused = set(enrich.APP) - used
if unused:
    print("UNUSED ENRICH KEYS", unused)

errors, warns = [], []

# --- text rules
for p in check_text(merged):
    errors.append("text: %s %s %s" % p)

# --- countries
isos = [c["iso2"] for c in merged["countries"]]
if len(isos) != len(set(isos)):
    errors.append("duplicate country iso2")
for c in merged["countries"]:
    for f in ["iso2", "name", "tier", "tagline", "overview", "history", "classification", "climate_soils", "grapes", "regions", "sources"]:
        if f not in c:
            errors.append("country %s missing %s" % (c["iso2"], f))
    w = len(c["overview"].split())
    lo, hi = {"major": (500, 1000), "notable": (300, 900), "emerging": (200, 700), "minor": (60, 400)}[c["tier"]]
    if not lo <= w <= hi:
        warns.append("country %s overview %d words (tier %s)" % (c["iso2"], w, c["tier"]))
    for h in c["history"]:
        if not all(k in h for k in ("when", "title", "text")):
            errors.append("history entry incomplete in %s" % c["iso2"])

# --- regions
for r in merged["regions"]:
    for f in ["country", "name", "lat", "lon", "zoom", "summary"]:
        if f not in r:
            errors.append("region %s missing %s" % (r.get("name"), f))

# --- appellations: join to polygons or have a point
geo = {iso: geo_index(iso) for iso in set(a["country"] for a in merged["appellations"])}
seen = set()
nopoly = []
for a in merged["appellations"]:
    key = (a["country"], a["name"])
    if key in seen:
        errors.append("duplicate appellation %s" % (key,))
    seen.add(key)
    g = geo[a["country"]]
    if not any(m in g for m in a["match"]):
        if "lat" in a and "lon" in a:
            nopoly.append("%s:%s" % key)
        else:
            errors.append("appellation %s has neither polygon match nor lat/lon" % (key,))
    if a["name"] not in a["match"]:
        errors.append("match lacks own name %s" % (key,))
    for f in ["cat", "styles", "summary"]:
        if f not in a:
            errors.append("appellation %s missing %s" % (key, f))
# polygons without content
for iso, g in geo.items():
    names = set(m for a in merged["appellations"] if a["country"] == iso for m in a["match"])
    miss = sorted(set(p["name"] for p in g.values()) - names)
    if miss:
        warns.append("%s polygons without content: %s" % (iso, miss))

# --- sites
ids = [s["id"] for s in merged["sites"]]
dups = set(i for i in ids if ids.count(i) > 1)
if dups:
    errors.append("duplicate site ids %s" % dups)
app_names = set((a["country"], a["name"]) for a in merged["appellations"])
try:
    import shapely
    from shapely.geometry import shape, Point
    import fiona  # noqa
    have_fiona = True
except Exception:
    have_fiona = False
ne = {}
try:
    import shapefile  # pyshp
    sf = shapefile.Reader(os.path.join(ROOT, "raw/ne_10m/ne_10m_admin_0_countries/ne_10m_admin_0_countries.shp"))
    flds = [f[0] for f in sf.fields[1:]]
    for sr in sf.iterShapeRecords():
        rec = dict(zip(flds, sr.record))
        iso = (rec.get("ISO_A2_EH") or rec.get("ISO_A2") or "").lower()
        if iso and iso != "-9":
            geom = shape(sr.shape.__geo_interface__)
            ne[iso] = geom if iso not in ne else ne[iso].union(geom)
except Exception as e:
    warns.append("NE country check skipped: %s" % e)
for s in merged["sites"]:
    if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]):
        errors.append("bad site id %s" % s["id"])
    if not (-90 <= s["lat"] <= 90 and -180 <= s["lon"] <= 180):
        errors.append("bad coords %s" % s["id"])
    if s.get("appellation") and (s["country"], s["appellation"]) not in app_names:
        warns.append("site %s appellation '%s' not an appellation entry" % (s["id"], s["appellation"]))
    if ne.get(s["country"]) is not None:
        if not ne[s["country"]].buffer(0.05).contains(Point(s["lon"], s["lat"])):
            errors.append("site outside country: %s (%s, %s)" % (s["id"], s["lat"], s["lon"]))
    n = len(s["text"].split())
    if not 25 <= n <= 170:
        warns.append("site text length %s %d" % (s["id"], n))
for a in merged["appellations"]:
    if "lat" in a and ne.get(a["country"]) is not None:
        if not ne[a["country"]].buffer(0.05).contains(Point(a["lon"], a["lat"])):
            errors.append("appellation point outside country: %s" % a["name"])
for c in merged["countries"]:
    for h in c["history"]:
        if "lat" in h and ne.get(c["iso2"]) is not None and not ne[c["iso2"]].buffer(0.3).contains(Point(h["lon"], h["lat"])):
            warns.append("history point outside country: %s %s" % (c["iso2"], h["title"]))

tmp = OUT + ".tmp"
with open(tmp, "w", encoding="utf-8") as f:
    json.dump(merged, f, ensure_ascii=False, indent=1)
json.load(open(tmp, encoding="utf-8"))
os.replace(tmp, OUT)

print("written", OUT, os.path.getsize(OUT), "bytes")
print({k: len(v) for k, v in merged.items()})
from collections import Counter
print("appellations per country", Counter(a["country"] for a in merged["appellations"]))
print("sites per country", Counter(s["country"] for s in merged["sites"]))
print("appellations shown as points (no polygon):", len(nopoly), nopoly)
print("WARNINGS (%d):" % len(warns))
for w in warns:
    print("  ", w)
print("ERRORS (%d):" % len(errors))
for e in errors:
    print("  ", e)
