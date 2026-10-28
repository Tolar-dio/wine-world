"""Shared helpers for the c12 (Oceania, Africa, Asia) content build.

Each part_{x}.py builds a dict {countries, regions, appellations, sites} and calls save(),
which validates text rules and writes work/c12/parts/{x}.json.
Run with: python3 -I scripts/c12/part_au.py
"""
import json
import os
import re
import unicodedata

ROOT = "/home/claude/winesite"
PARTS = os.path.join(ROOT, "work", "c12", "parts")
SRC = os.path.join(ROOT, "work", "c12", "src")
GEO = os.path.join(ROOT, "site", "data", "geo")
os.makedirs(PARTS, exist_ok=True)

BANNED = ["delve", "robust", "seamless", "game-changer", "game changer", "unlock", "leverage",
          "comprehensive", "cutting-edge", "transformative", "innovative", "it's worth noting",
          "nestled", "boasts", "tapestry", "testament"]


def slugify(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("&", " and ").replace("'", "").replace("’", "")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-+", "-", s)


def geo_index(iso2):
    """name -> properties for one country's geojson (for lp / ids)."""
    fn = os.path.join(GEO, iso2 + ".geojson")
    out = {}
    if not os.path.exists(fn):
        return out
    d = json.load(open(fn))
    for f in d["features"]:
        p = f["properties"]
        out[p["name"]] = p
        for a in p.get("alt") or []:
            out.setdefault(a, p)
    return out


def walk_strings(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from walk_strings(v, path + "." + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, path + "[%d]" % i)


def check_text(data):
    problems = []
    for path, s in walk_strings(data):
        if "—" in s:
            problems.append(("em dash", path, s[:80]))
        if "–" in s:
            problems.append(("en dash", path, s[:80]))
        low = s.lower()
        for w in BANNED:
            if re.search(r"\b" + re.escape(w) + r"\b", low):
                problems.append(("banned:" + w, path, s[:80]))
    return problems


def site(iso2, name, kind, lat, lon, text, appellation=None, cls=None, producers=None,
         q="precise", sid=None):
    d = {"id": sid or ("site-%s-%s" % (iso2, slugify(name))), "country": iso2, "name": name,
         "kind": kind, "lat": round(lat, 4), "lon": round(lon, 4), "coord_quality": q, "text": text}
    if cls:
        d["class"] = cls
    if appellation:
        d["appellation"] = appellation
    if producers:
        d["producers"] = producers
    return d


def save(key, data):
    probs = check_text(data)
    for p in probs:
        print("TEXT PROBLEM", p)
    ids = [s["id"] for s in data.get("sites", [])]
    dup = set(i for i in ids if ids.count(i) > 1)
    if dup:
        print("DUPLICATE SITE IDS", dup)
    for s in data.get("sites", []):
        assert re.fullmatch(r"[a-z0-9-]+", s["id"]), s["id"]
        n = len(s["text"].split())
        if n < 25 or n > 170:
            print("SITE TEXT LENGTH", s["id"], n)
    fn = os.path.join(PARTS, key + ".json")
    tmp = fn + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    json.load(open(tmp, encoding="utf-8"))
    os.replace(tmp, fn)
    words = sum(len(s.split()) for _, s in walk_strings(data))
    print("saved", fn, {k: len(v) for k, v in data.items()}, "words", words,
          "problems", len(probs))
    return probs
