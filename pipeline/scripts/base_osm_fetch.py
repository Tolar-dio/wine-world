"""Fetch OSM geometries for curated wine rivers and coordinates for wine towns via Nominatim.

Overpass (overpass-api.de and mirrors) was unreachable from the build sandbox (connection
resets / 504), so this uses the Nominatim search API (nominatim.openstreetmap.org), which
returns the same OSM waterway relations/ways with full geometry (polygon_geojson=1,
polygon_threshold=0.0005 deg server-side simplification). Rate-limited to 1 request/second
per the Nominatim usage policy. Raw responses are cached as JSON in raw/osm_nominatim/ and
re-used on reruns.

Run: python3 -I /home/claude/winesite/scripts/base_osm_fetch.py [rivers|lakes|towns|all]
"""
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from base_curated import OSM_RIVERS, OSM_LAKES, WINE_TOWNS  # noqa: E402

RAW = Path("/home/claude/winesite/raw/osm_nominatim")
RAW.mkdir(parents=True, exist_ok=True)
UA = "VitisMundiAtlas/0.1 (static wine atlas basemap build; one-off batch, cached)"
_last = [0.0]


def nominatim(params, cache_name):
    f = RAW / cache_name
    if f.exists():
        return json.loads(f.read_text(encoding="utf-8"))
    wait = 1.1 - (time.time() - _last[0])
    if wait > 0:
        time.sleep(wait)
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                data = json.loads(r.read().decode("utf-8"))
            break
        except Exception as e:  # noqa: BLE001
            print("   retry", attempt, e)
            time.sleep(3 + 3 * attempt)
    else:
        raise RuntimeError(f"failed {url}")
    _last[0] = time.time()
    f.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    return data


def slug(s):
    return "".join(c if c.isalnum() else "_" for c in s)[:60]


def fetch_rivers():
    for r in OSM_RIVERS:
        w, s, e, n = r["bbox"]
        for q in r["q"]:
            params = {"q": q, "viewbox": f"{w},{n},{e},{s}", "bounded": 1, "format": "jsonv2",
                      "polygon_geojson": 1, "polygon_threshold": 0.0005, "limit": 20, "dedupe": 0}
            d = nominatim(params, f"river_{slug(r['name'])}_{slug(q)}.json")
            hits = [x for x in d if x.get("category") == "waterway" or
                    (x.get("category") == "natural" and x.get("type") in ("bay", "water", "strait"))]
            print(f"{r['name']:<16} q={q!r:<28} results={len(d):<3} waterway={len(hits)}",
                  [(x['osm_type'][0] + str(x['osm_id']), x['type'], x['name']) for x in hits][:4])


def fetch_lakes():
    for r in OSM_LAKES:
        w, s, e, n = r["bbox"]
        params = {"q": r["q"], "viewbox": f"{w},{n},{e},{s}", "bounded": 1, "format": "jsonv2",
                  "polygon_geojson": 1, "polygon_threshold": 0.0005, "limit": 5}
        d = nominatim(params, f"lake_{slug(r['name'])}.json")
        print(f"{r['name']:<16}", [(x['osm_type'][0] + str(x['osm_id']), x['type'], x['geojson']['type']) for x in d][:3])


def fetch_towns():
    for t in WINE_TOWNS:
        name, cc = t[0], t[1]
        q = t[2] if len(t) > 2 and t[2] else name
        params = {"q": q, "countrycodes": cc, "format": "jsonv2", "limit": 5,
                  "featureType": "settlement"}
        d = nominatim(params, f"town_{cc}_{slug(q)}.json")
        best = d[0] if d else None
        print(f"{name:<26} {cc} ->", (best["name"], best["lat"], best["lon"], best["type"]) if best else "NONE")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("rivers", "all"):
        fetch_rivers()
    if what in ("lakes", "all"):
        fetch_lakes()
    if what in ("towns", "all"):
        fetch_towns()
