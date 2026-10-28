"""Helpers for the c9 (East Med / Caucasus / Black Sea / N Africa / Central Asia) content build.
Each country script builds lists and calls save(iso, data); merge_c9.py merges parts."""
import json, os, re, unicodedata
ROOT = "/home/claude/winesite"
PARTS = os.path.join(ROOT, "work", "c9", "parts")
os.makedirs(PARTS, exist_ok=True)
BANNED = ["delve", "robust", "seamless", "game-changer", "unlock", "leverage", "comprehensive",
          "cutting-edge", "transformative", "innovative", "it's worth noting", "nestled", "boasts",
          "tapestry", "testament"]

def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s

def site(iso, name, kind, lat, lon, text, cq="approx", cls=None, app=None, producers=None, sid=None):
    d = {"id": sid or f"site-{iso}-{slug(name)}", "country": iso, "name": name, "kind": kind,
         "lat": round(lat, 4), "lon": round(lon, 4), "coord_quality": cq, "text": text}
    if cls: d["class"] = cls
    if app: d["appellation"] = app
    if producers: d["producers"] = producers
    return d

def check_text(obj, path="root", problems=None):
    if problems is None: problems = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "match":
                continue  # official register names are kept verbatim
            check_text(v, f"{path}.{k}", problems)
    elif isinstance(obj, list):
        for i, v in enumerate(obj): check_text(v, f"{path}[{i}]", problems)
    elif isinstance(obj, str):
        if "—" in obj or "–" in obj: problems.append(f"dash in {path}: {obj[:60]}")
        low = obj.lower()
        for b in BANNED:
            if re.search(r"\b" + re.escape(b) + r"\b", low): problems.append(f"banned '{b}' in {path}")
    return problems

def save(iso, data):
    for k in ("countries", "regions", "appellations", "sites"):
        data.setdefault(k, [])
    probs = check_text(data)
    ids = [s["id"] for s in data["sites"]]
    dup = {i for i in ids if ids.count(i) > 1}
    if dup: probs.append(f"duplicate site ids {dup}")
    for s in data["sites"]:
        if not re.fullmatch(r"[a-z0-9-]+", s["id"]): probs.append(f"bad id {s['id']}")
    p = os.path.join(PARTS, f"{iso}.json")
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    json.load(open(p, encoding="utf-8"))
    print(f"{iso}: countries={len(data['countries'])} regions={len(data['regions'])} "
          f"appellations={len(data['appellations'])} sites={len(data['sites'])} -> {p}")
    for x in probs: print("  PROBLEM:", x)
    return probs
