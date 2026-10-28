"""Helpers for the c8 (Carpathian Basin + Balkans) content builders.
Each scripts/c8/build_{iso}.py builds one country and writes work/c8_parts/{iso}.json.
Run each with: python3 -I /home/claude/winesite/scripts/c8/build_xx.py"""
import json, os, re

PARTS = "/home/claude/winesite/work/c8_parts"
os.makedirs(PARTS, exist_ok=True)
BANNED = ["—", "delve", "robust", "seamless", "game-changer", "unlock", "leverage",
          "comprehensive", "cutting-edge", "transformative", "innovative", "it's worth noting",
          "nestled", "boasts", "tapestry", "testament"]


def site(iso, slug, name, kind, lat, lon, text, cq="precise", cls=None, app=None, producers=None):
    d = {"id": f"site-{iso}-{slug}", "country": iso, "name": name, "kind": kind}
    if cls:
        d["class"] = cls
    if app:
        d["appellation"] = app
    d.update({"lat": round(float(lat), 4), "lon": round(float(lon), 4), "coord_quality": cq, "text": text.strip()})
    if producers:
        d["producers"] = producers
    return d


def app(iso, name, match, cat, region, summary, subregion=None, created=None, area_ha=None,
        styles=None, dominant=None, grapes=None, terroir=None, producers=None, nerd=None, contains=None):
    m = list(dict.fromkeys([name] + list(match or [])))
    return {"country": iso, "name": name, "match": m, "cat": cat, "region": region, "subregion": subregion,
            "created": created, "area_ha": area_ha, "styles": styles or [], "dominant_style": dominant,
            "grapes": grapes, "summary": summary.strip(), "terroir": (terroir or "").strip() or None,
            "producers": producers or [], "nerd_note": nerd, "contains": contains or []}


def region(iso, name, lat, lon, zoom, tagline, summary, history, terroir, grapes, styles, classification,
           appellations, sources, alt=None, parent=None):
    return {"country": iso, "name": name, "alt": alt or [], "parent_region": parent, "lat": lat, "lon": lon,
            "zoom": zoom, "tagline": tagline, "summary": summary.strip(), "history": history.strip(),
            "terroir": terroir.strip(), "grapes": grapes.strip(), "styles": styles.strip(),
            "classification": classification.strip(), "appellations": appellations, "sources": sources}


def H(when, title, text, lat=None, lon=None):
    d = {"when": when, "title": title, "text": text.strip()}
    if lat is not None:
        d["lat"] = round(lat, 4)
        d["lon"] = round(lon, 4)
    return d


def S(title, url):
    return {"title": title, "url": url}


def write(iso, data):
    for k in ("countries", "regions", "appellations", "sites"):
        data.setdefault(k, [])
    blob = json.dumps(data, ensure_ascii=False)
    bad = []
    for w in BANNED:
        for mm in re.finditer(re.escape(w), blob, flags=re.I):
            bad.append(f"{w!r}: ...{blob[max(0, mm.start()-50):mm.end()+30]}...")
    ids = [s["id"] for s in data["sites"]]
    dups = {i for i in ids if ids.count(i) > 1}
    short = [(s["id"], len(s["text"].split())) for s in data["sites"] if not 25 <= len(s["text"].split()) <= 160]
    path = os.path.join(PARTS, f"{iso}.json")
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    json.load(open(tmp, encoding="utf-8"))
    os.replace(tmp, path)
    print(f"wrote {path}: " + ", ".join(f"{k}={len(v)}" for k, v in data.items()))
    for c in data["countries"]:
        print(f"  overview words={len(c['overview'].split())} history={len(c['history'])}")
    for a in data["appellations"]:
        n = len(a["summary"].split())
        if n < 30:
            print("  short appellation summary:", a["name"], n)
    if bad:
        print("  BANNED:", *bad, sep="\n   ")
    if dups:
        print("  DUP IDS:", dups)
    if short:
        print("  SITE TEXT LENGTH:", short)
