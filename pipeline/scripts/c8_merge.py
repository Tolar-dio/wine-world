"""Merge per-country part files for the Carpathian/Balkans content agent (c8)
into data/content/c8_carpathian_balkans.json, validating shape and text rules.
Run: python3 -I /home/claude/winesite/scripts/c8_merge.py"""
import json, os, re, sys, glob
ROOT = "/home/claude/winesite"
PARTS = os.path.join(ROOT, "work", "c8_parts")
OUT = os.path.join(ROOT, "data", "content", "c8_carpathian_balkans.json")
ORDER = ["hu", "si", "hr", "rs", "ba", "me", "mk", "al", "xk", "ro", "bg"]
BANNED = ["—", "delve", "robust", "seamless", "game-changer", "unlock", "leverage",
          "comprehensive", "cutting-edge", "transformative", "innovative", "it's worth noting",
          "nestled", "boasts", "tapestry", "testament"]
merged = {"countries": [], "regions": [], "appellations": [], "sites": []}
problems = []
files = sorted(glob.glob(os.path.join(PARTS, "*.json")),
               key=lambda p: (ORDER.index(os.path.basename(p)[:2]) if os.path.basename(p)[:2] in ORDER else 99, p))
for f in files:
    try:
        d = json.load(open(f, encoding="utf-8"))
    except Exception as e:
        problems.append(f"INVALID JSON {f}: {e}"); continue
    for k in merged:
        merged[k].extend(d.get(k, []))
site_ids = set()
for s in merged["sites"]:
    if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]): problems.append("bad site id " + s["id"])
    if s["id"] in site_ids: problems.append("dup site id " + s["id"])
    site_ids.add(s["id"])
    if not (-90 < s["lat"] < 90 and -180 < s["lon"] < 180): problems.append("bad coord " + s["id"])
    if round(s["lat"], 4) != s["lat"] or round(s["lon"], 4) != s["lon"]: problems.append("coord >4dp " + s["id"])
    n = len(s.get("text", "").split())
    if n < 25 or n > 160: problems.append(f"site text length {n} words: {s['id']}")
names = {}
for a in merged["appellations"]:
    key = (a["country"], a["name"])
    if key in names: problems.append(f"dup appellation {key}")
    names[key] = a
    if a["name"] not in a.get("match", []): problems.append("match lacks name: " + a["name"])
blob = json.dumps(merged, ensure_ascii=False)
for w in BANNED:
    for m in re.finditer(re.escape(w), blob, flags=re.I):
        problems.append(f"banned '{w}' near: {blob[max(0,m.start()-60):m.end()+40]}")
os.makedirs(os.path.dirname(OUT), exist_ok=True)
tmp = OUT + ".tmp"
json.dump(merged, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.load(open(tmp, encoding="utf-8"))
os.replace(tmp, OUT)
print("parts:", [os.path.basename(f) for f in files])
print({k: len(v) for k, v in merged.items()})
from collections import Counter
print("appellations by country:", dict(Counter(a["country"] for a in merged["appellations"])))
print("sites by country:", dict(Counter(s["country"] for s in merged["sites"])))
print("regions by country:", dict(Counter(r["country"] for r in merged["regions"])))
for c in merged["countries"]:
    print(c["iso2"], c["tier"], "overview words:", len(c["overview"].split()), "history:", len(c["history"]))
print("PROBLEMS:", len(problems))
for p in problems[:80]: print(" -", p)
