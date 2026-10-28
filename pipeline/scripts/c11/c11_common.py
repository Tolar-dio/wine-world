"""Shared helpers for the c11 (South America) content build.

Each country script builds a dict {countries, regions, appellations, sites} and calls save_part(iso, data).
Parts live in work/c11/parts/ (NOT in data/content/, so the integrator never double-loads them);
merge.py concatenates them into data/content/c11_south_america.json.
Run scripts with: python3 -I scripts/c11/<iso>.py
"""
import json
import os
import re
import sys
import unicodedata

ROOT = "/home/claude/winesite"
PARTS = os.path.join(ROOT, "work", "c11", "parts")
os.makedirs(PARTS, exist_ok=True)

BANNED = ["delve", "robust", "seamless", "game-changer", "game changer", "unlock", "leverage", "comprehensive",
          "cutting-edge", "transformative", "innovative", "it's worth noting", "nestled", "boasts", "tapestry",
          "testament"]


def slug(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    s = s.replace("&", " and ").replace("'", "").replace("’", "")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return re.sub(r"-+", "-", s)


def app(country, name, cat, summary, **kw):
    d = {"country": country, "name": name, "cat": cat}
    if "match" not in kw:
        kw["match"] = [name]
    d.update(kw)
    d["summary"] = summary
    for k in ("lat", "lon"):
        if k in d and d[k] is not None:
            d[k] = round(float(d[k]), 4)
    return d


def site(country, name, kind, lat, lon, text, cq="precise", **kw):
    d = {"id": kw.pop("id", f"site-{country}-{slug(name)}"), "country": country, "name": name, "kind": kind,
         "lat": round(float(lat), 4), "lon": round(float(lon), 4), "coord_quality": cq, "text": text}
    d.update(kw)
    return d


def region(country, name, lat, lon, zoom, tagline, summary, history, terroir, grapes, styles, classification,
           appellations, sources, alt=None, parent=None):
    return {"country": country, "name": name, "alt": alt or [], "parent_region": parent,
            "lat": round(lat, 4), "lon": round(lon, 4), "zoom": zoom, "tagline": tagline, "summary": summary,
            "history": history, "terroir": terroir, "grapes": grapes, "styles": styles,
            "classification": classification, "appellations": appellations, "sources": sources}


def walk_strings(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("url",):
                continue
            yield from walk_strings(v, f"{path}.{k}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from walk_strings(v, f"{path}[{i}]")


def check(data):
    probs = []
    for p, s in walk_strings(data):
        if "—" in s:
            probs.append(f"em dash at {p}")
        if "–" in s:
            probs.append(f"en dash at {p}")
        low = s.lower()
        for b in BANNED:
            if re.search(r"(?<![a-z])" + re.escape(b) + r"(?![a-z])", low):
                probs.append(f"banned '{b}' at {p}: ...{s[max(0, low.find(b) - 40):low.find(b) + 40]}...")
    ids = [s["id"] for s in data.get("sites", [])]
    dup = {i for i in ids if ids.count(i) > 1}
    if dup:
        probs.append(f"duplicate site ids {dup}")
    for s in data.get("sites", []):
        if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]):
            probs.append(f"bad site id {s['id']}")
        n = len(s["text"].split())
        if n < 25 or n > 160:
            probs.append(f"site text {n} words: {s['name']}")
    names = [(a["country"], a["name"]) for a in data.get("appellations", [])]
    dupn = {n for n in names if names.count(n) > 1}
    if dupn:
        probs.append(f"duplicate appellation names {dupn}")
    return probs


def save_part(iso, data):
    probs = check(data)
    for p in probs:
        print("PROBLEM:", p, file=sys.stderr)
    path = os.path.join(PARTS, f"{iso}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    json.load(open(path, encoding="utf-8"))
    words = sum(len(s.split()) for _, s in walk_strings(data))
    print(f"saved {path}: " + ", ".join(f"{k} {len(v)}" for k, v in data.items()) + f"; ~{words} words; "
          f"{len(probs)} problems")
    return probs
