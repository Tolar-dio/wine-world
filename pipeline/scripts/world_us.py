"""United States AVAs from the UC Davis Library AVA Digitizing Project (CC0).

Input : raw/ucdavis_ava/repo/avas_aggregated_files/avas.geojson  (git clone --depth 1 of
        https://github.com/UCDavisLibrary/ava)
Output: site/data/geo/us.geojson
Run   : python3 -I scripts/world_us.py
"""
import json
import re
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, write_raw_debug, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape  # noqa: E402

SRC = f"{RAW}/ucdavis_ava/repo/avas_aggregated_files/avas.geojson"
STATE_FIX = {"Tennessee": "TN", "Washington": "WA"}
# `within` tokens in the source that are mangled (split on the wrong separator or misnamed)
WITHIN_FIX = {
    "Northern Sonoma Valley": "Northern Sonoma",
}
WITHIN_JOIN = [("Upper Mississippi", "River Valley", "Upper Mississippi River Valley"),
               ("Solano County", "Green Valley", "Solano County Green Valley")]
AKA_FIX = {
    "Diablo Grande": ["Oak Flats Valley Ranch", "Oak Flats Valley"],
    "Kelsey Bench-Lake County": ["Kelsey Bench", "Kelseyville Bench"],
}


def short(s, n=100):
    if not s:
        return None
    s = re.sub(r"\s+", " ", s.replace("|", "; ")).strip()
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0].rstrip(",;")
    return cut + "..."


def parse_within(w):
    if not w:
        return []
    toks = [t.strip() for t in re.split(r"[|,]", w) if t.strip()]
    for a, b, joined in WITHIN_JOIN:
        if a in toks and b in toks:
            toks = [t for t in toks if t not in (a, b)] + [joined]
    return [WITHIN_FIX.get(t, t) for t in toks]


def main():
    log = []
    fc = json.load(open(SRC, encoding="utf-8"))
    feats = [f for f in fc["features"] if not f["properties"].get("valid_end") and not f["properties"].get("removed")]
    log.append(f"source features {len(fc['features'])}, current (no valid_end/removed) {len(feats)}")
    mk = IdMaker("us")
    items, name2id = [], {}
    feats.sort(key=lambda f: f["properties"]["name"].strip())
    for f in feats:
        p = f["properties"]
        name = p["name"].strip()
        fid = mk(name)
        name2id[name] = fid
        states = sorted({STATE_FIX.get(s.strip(), s.strip()) for s in (p.get("state") or "").split("|") if s.strip()})
        counties = sorted({c.strip() for c in (p.get("county") or "").split("|") if c.strip()})
        reg = {
            "created": p.get("created"),
            "cfr": f"27 CFR {p['cfr_index']}" if p.get("cfr_index") else None,
            "petitioner": short(p.get("petitioner")),
            "state": ", ".join(states) if states else None,
            "county": (", ".join(counties) if len(counties) <= 6 else f"{len(counties)} counties") if counties else None,
        }
        if p.get("valid_start") and p.get("valid_start") != p.get("created"):
            reg["boundary_since"] = p["valid_start"]
        reg = {k: v for k, v in reg.items() if v}
        if name in AKA_FIX:
            alt = AKA_FIX[name]
        elif p.get("aka"):
            alt = [a.strip() for a in p["aka"].split(",") if a.strip()]
        else:
            alt = None
        items.append({
            "id": fid, "name": name, "alt": alt, "cat": "AVA", "src": "ucdavis", "bq": "official",
            "reg": reg, "geom": fix(shape(f["geometry"])), "_within": parse_within(p.get("within")),
        })
    for it in items:
        hints = []
        for w in it.pop("_within"):
            if w in name2id:
                hints.append(name2id[w])
            else:
                log.append(f"unresolved within '{w}' for {it['name']}")
        it["parent_hints"] = hints
    # Interval scales with sqrt(area): ~25 m at 1000 km2, ~6 m at 50 km2, ~200 m for the
    # 77,000 km2 Upper Mississippi River Valley. finalize() tightens until <= 5 MB.
    interval = size_interval(base_m=25, ref_km2=1000, power=0.5, min_m=3, max_m=1500)
    path, nbytes, n = finalize("us", items, interval, max_bytes=4_900_000, log=log)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    # parents that differ from the official 'within' list (diagnostic)
    by = {it["id"]: it for it in items}
    for it in items:
        if it.get("parent_hints") and it["parent"] not in it["parent_hints"]:
            log.append(f"parent {it['id']} -> {it['parent']} (within lists {it['parent_hints']})")
        if not it.get("parent_hints") and it.get("parent"):
            log.append(f"geometric parent only: {it['id']} -> {it['parent']}")
    with open(f"{WORK}/us_log.txt", "w") as fh:
        fh.write("\n".join(log))
    print("\n".join(log[-60:]))


if __name__ == "__main__":
    main()
