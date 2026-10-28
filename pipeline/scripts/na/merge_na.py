"""Merge North America part files into data/content/c10_north_america.json and validate.
Run: python3 -I scripts/na/merge_na.py"""
import json, glob, re, sys, collections
sys.path.insert(0, "/home/claude/winesite/scripts/na")
import na_lib as L
ROOT = "/home/claude/winesite"
out = {"countries": [], "regions": [], "appellations": [], "sites": []}
for f in sorted(glob.glob(f"{L.PARTS}/*.json")):
    d = json.load(open(f, encoding="utf-8"))
    for k in out:
        out[k] += d.get(k, [])
sys.path.insert(0, "/home/claude/winesite/scripts/na/parts")
from zz_enrich import EXTRA, US_OVERVIEW_EXTRA
for a in out["appellations"]:
    if a["name"] in EXTRA and EXTRA[a["name"]] not in a["summary"]:
        a["summary"] = a["summary"].rstrip() + "\n\n" + EXTRA[a["name"]]
for c in out["countries"]:
    if c["iso2"] == "us" and US_OVERVIEW_EXTRA not in c["overview"]:
        parts = c["overview"].split("\n\n")
        parts.insert(len(parts) - 1, US_OVERVIEW_EXTRA)
        c["overview"] = "\n\n".join(parts)
probs = []
# duplicates
for k, key in (("countries", "iso2"), ("regions", "name"), ("appellations", "name"), ("sites", "id")):
    c = collections.Counter((x.get("country", x.get("iso2")), x[key]) for x in out[k])
    probs += [f"dup {k} {n}" for n, v in c.items() if v > 1]
# AVA coverage
us_names = {a["name"] for a in out["appellations"] if a["country"] == "us"}
miss = L.ALL_US - us_names
if miss: probs.append(f"missing AVAs {sorted(miss)}")
extra = us_names - L.ALL_US
if extra: probs.append(f"US appellations not in TTB list {sorted(extra)}")
# ids
for s in out["sites"]:
    if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]): probs.append(f"bad id {s['id']}")
    if not (-180 <= s["lon"] <= 180 and -90 <= s["lat"] <= 90): probs.append(f"bad coords {s['id']}")
    n = len(s["text"].split())
    if n < 25 or n > 160: probs.append(f"site text length {s['id']} {n}")
# site appellation references must exist (appellation or region names)
names = {a["name"] for a in out["appellations"]} | {r["name"] for r in out["regions"]}
for s in out["sites"]:
    if s["appellation"] not in names and "(no AVA)" not in s["appellation"] and s["appellation"] not in ("Canada", "Ontario"):
        probs.append(f"site {s['id']} appellation '{s['appellation']}' not found")
# region parent and appellation contains
for a in out["appellations"]:
    for c in a.get("contains", []):
        if c not in names: probs.append(f"{a['name']} contains unknown {c}")
for r in out["regions"]:
    if r.get("parent_region") and r["parent_region"] not in {x["name"] for x in out["regions"]}:
        probs.append(f"region {r['name']} parent {r['parent_region']} missing")
    for a in r["appellations"]:
        if a not in names: probs.append(f"region {r['name']} lists unknown {a}")
bad = L.check_text(out)
probs += [f"style {p}" for p in bad]
# word counts for famous AVAs
short = [a["name"] for a in out["appellations"] if len(a["summary"].split()) < 25]
if short: probs.append(f"very short summaries: {short}")
json.dump(out, open(f"{ROOT}/data/content/c10_north_america.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print({k: len(v) for k, v in out.items()}, "| by country:", collections.Counter(a["country"] for a in out["appellations"]), collections.Counter(s["country"] for s in out["sites"]))
print("PROBLEMS:", len(probs)); [print(" -", p) for p in probs[:60]]
