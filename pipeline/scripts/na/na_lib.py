"""Shared helpers for the North America content build (c10_north_america.json).
Each part script imports this, builds lists, and calls save_part(name, dict)."""
import json, re, os
ROOT = "/home/claude/winesite"
PARTS = f"{ROOT}/work/na/parts"
_fc = json.load(open(f"{ROOT}/raw/ucdavis_ava/repo/avas_aggregated_files/avas.geojson", encoding="utf-8"))
UCD = {}
for f in _fc["features"]:
    p = f["properties"]
    UCD[p["name"].strip()] = p

# TTB official names where the UC Davis string differs (27 CFR part 9 spelling)
OFFICIAL = {
    "Beverly Washington": "Beverly, Washington",
    "Virginia’s Eastern Shore": "Virginia's Eastern Shore",
}
NEW = {  # established after the UC Davis snapshot (Federal Register)
    "Tryon Foothills": ("2025", "27 CFR 9 (T.D. TTB, 90 FR, Sept. 29, 2025)"),
    "Nashoba Valley": ("2026", "FR Doc 2026-05730, Mar. 24, 2026"),
    "Nine Lakes of East Tennessee": ("2026", "FR Doc 2026-05731, Mar. 24, 2026"),
    "Columbia Hills": ("2026", "FR Doc 2026-16701, Aug. 17, 2026"),
}

def ucd_key(name):
    if name in UCD:
        return name
    for k, v in OFFICIAL.items():
        if v == name:
            return k
    return None

def est_year(name):
    if name in NEW:
        return NEW[name][0]
    k = ucd_key(name)
    if not k:
        return None
    h = UCD[k].get("cfr_revision_history") or ""
    m = re.search(r"(\d{4})\]?", h)
    yrs = re.findall(r"\b(19[78]\d|199\d|20[0-2]\d)\b", h)
    if yrs:
        return yrs[0]
    return (UCD[k].get("created") or "")[:4] or None

ALL_US = set(OFFICIAL.get(k, k) for k in UCD) | set(NEW)

def ava(name, region, summary, sub=None, styles=None, dom=None, grapes="", terroir="",
        producers=None, nerd="", contains=None, match=None, area_ha=None, created=None, lat=None, lon=None):
    k = ucd_key(name)
    assert k or name in NEW, f"unknown AVA {name}"
    m = [name]
    if k and k != name:
        m.append(k)
    if k and UCD[k].get("aka"):
        m += [a.strip() for a in UCD[k]["aka"].split(",") if a.strip()]
    if match:
        m += match
    seen = []
    for x in m:
        if x not in seen:
            seen.append(x)
    d = {"country": "us", "name": name, "match": seen, "cat": "AVA", "region": region}
    if sub:
        d["subregion"] = sub
    d["created"] = created or est_year(name)
    if area_ha:
        d["area_ha"] = area_ha
    if styles:
        d["styles"] = styles
    if dom:
        d["dominant_style"] = dom
    if grapes:
        d["grapes"] = grapes
    d["summary"] = summary
    if terroir:
        d["terroir"] = terroir
    if producers:
        d["producers"] = producers
    if nerd:
        d["nerd_note"] = nerd
    if contains:
        d["contains"] = contains
    if lat is not None:
        d["lat"] = round(lat, 4)
        d["lon"] = round(lon, 4)
        d["point_only"] = True
    return d

def app(country, name, cat, region, summary, **kw):
    d = {"country": country, "name": name, "match": kw.pop("match", [name]), "cat": cat, "region": region}
    for key in ("subregion", "created", "area_ha", "styles", "dominant_style", "grapes"):
        if key in kw:
            d[key] = kw.pop(key)
    d["summary"] = summary
    for key in ("terroir", "producers", "nerd_note", "contains"):
        if key in kw:
            d[key] = kw.pop(key)
    assert not kw, kw
    return d

def site(sid, country, name, kind, appellation, lat, lon, text, cls=None, q="precise", producers=None):
    d = {"id": f"site-{country}-{sid}", "country": country, "name": name, "kind": kind}
    if cls:
        d["class"] = cls
    d.update({"appellation": appellation, "lat": round(lat, 4), "lon": round(lon, 4), "coord_quality": q, "text": text})
    if producers:
        d["producers"] = producers
    return d

def region(country, name, lat, lon, zoom, tagline, summary, history, terroir, grapes, styles,
           classification, appellations, sources, parent=None, alt=None):
    d = {"country": country, "name": name}
    if alt:
        d["alt"] = alt
    d.update({"parent_region": parent, "lat": lat, "lon": lon, "zoom": zoom, "tagline": tagline,
              "summary": summary, "history": history, "terroir": terroir, "grapes": grapes,
              "styles": styles, "classification": classification, "appellations": appellations,
              "sources": [{"title": t, "url": u} for t, u in sources]})
    return d

BANNED = ["—", "– ", " delve", "robust", "seamless", "game-changer", "unlock", "leverage",
          "comprehensive", "cutting-edge", "transformative", "innovative", "it's worth noting",
          "nestled", "boasts", "tapestry", "testament"]

def check_text(obj, path=""):
    bad = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            bad += check_text(v, f"{path}.{k}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            bad += check_text(v, f"{path}[{i}]")
    elif isinstance(obj, str):
        low = obj.lower()
        for b in BANNED:
            if b.lower() in low:
                bad.append((path, b))
    return bad

def save_part(name, countries=(), regions=(), appellations=(), sites=()):
    d = {"countries": list(countries), "regions": list(regions), "appellations": list(appellations), "sites": list(sites)}
    bad = check_text(d)
    if bad:
        print("STYLE PROBLEMS:", bad[:20])
    os.makedirs(PARTS, exist_ok=True)
    json.dump(d, open(f"{PARTS}/{name}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{name}: {len(d['countries'])} countries, {len(d['regions'])} regions, {len(d['appellations'])} appellations, {len(d['sites'])} sites")
