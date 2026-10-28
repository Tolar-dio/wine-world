"""Basemap: rivers, lakes and places for the Vitis Mundi globe.

Run: python3 -I /home/claude/winesite/scripts/base_layers.py
(after base_osm_fetch.py, whose cached Nominatim responses in raw/osm_nominatim/ are read here)

Inputs: work/ne/*.geojson (Natural Earth 10m v5.1 layers converted by mapshaper from raw/ne_10m),
        raw/osm_nominatim/*.json (OSM geometries/coordinates), site/data/base/countries.geojson
Outputs (site/data/base/):
  rivers.geojson  {name, scalerank, wine}  4 dp
  lakes.geojson   {name, scalerank, wine}  4 dp
  places.geojson  {name, rank, wine, country}  Points, 4 dp
"""
import json
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

from shapely.geometry import mapping, shape, box, Point
from shapely.ops import linemerge, unary_union
from shapely import STRtree

sys.path.insert(0, str(Path(__file__).resolve().parent))
from base_curated import (OSM_RIVERS, NE_WINE_RIVERS, NE_DROP, WINE_TOWNS, TOWN_COORDS,  # noqa: E402
                          OSM_LAKES, NE_LAKE_FIX)

ROOT = Path("/home/claude/winesite")
NE = ROOT / "work/ne"
OSM = ROOT / "raw/osm_nominatim"
OUT = ROOT / "site/data/base"
TMP = ROOT / "work/base_tmp"
MS = str(ROOT / "work/node/node_modules/.bin/mapshaper")

WINE_ISO = {"fr", "it", "es", "pt", "de", "at", "ch", "hu", "gr", "us", "ca", "au", "nz", "za", "ar",
            "cl", "br", "uy", "ro", "bg", "md", "ge", "hr", "si", "rs", "cn", "jp", "sk", "cz", "lu",
            "be", "nl", "gb", "cy", "mt", "mx", "il", "lb", "am", "ua", "tr", "mk", "me", "ba", "al",
            "xk", "dk", "pe", "bo", "tn", "ma", "dz", "in", "th", "pl"}


def load(name):
    return json.loads((NE / f"{name}.geojson").read_text(encoding="utf-8"))["features"]


def rnd(geom, nd):
    def r(c):
        if isinstance(c[0], (int, float)):
            return [round(c[0], nd), round(c[1], nd)]
        return [r(x) for x in c]
    g = dict(geom)
    g["coordinates"] = r(geom["coordinates"])
    return g


def dedupe_coords(geom):
    """Remove consecutive duplicate vertices created by rounding; drop degenerate parts."""
    t = geom["type"]
    def clean(line):
        out = [line[0]]
        for p in line[1:]:
            if p != out[-1]:
                out.append(p)
        return out
    if t == "LineString":
        c = clean(geom["coordinates"])
        return {"type": t, "coordinates": c} if len(c) >= 2 else None
    if t == "MultiLineString":
        parts = [clean(l) for l in geom["coordinates"]]
        parts = [p for p in parts if len(p) >= 2]
        if not parts:
            return None
        return {"type": "LineString", "coordinates": parts[0]} if len(parts) == 1 else {"type": t, "coordinates": parts}
    if t in ("Polygon", "MultiPolygon"):
        polys = [geom["coordinates"]] if t == "Polygon" else geom["coordinates"]
        out = []
        for poly in polys:
            rings = [clean(r) for r in poly]
            rings = [r for r in rings if len(r) >= 4]
            if rings and len(poly[0]) and len(clean(poly[0])) >= 4:
                out.append(rings)
        if not out:
            return None
        return {"type": "Polygon", "coordinates": out[0]} if len(out) == 1 else {"type": "MultiPolygon", "coordinates": out}
    return geom


def ms_simplify(fc, out, pct, extra=()):
    TMP.mkdir(parents=True, exist_ok=True)
    src = TMP / (out + "_in.geojson")
    dst = TMP / (out + "_out.geojson")
    src.write_text(json.dumps(fc, ensure_ascii=False), encoding="utf-8")
    r = subprocess.run([MS, "-i", str(src), "-simplify", f"{pct}%", "weighted", "keep-shapes", *extra,
                        "-o", str(dst), "format=geojson", "precision=0.0001"], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stderr)
    return json.loads(dst.read_text(encoding="utf-8"))


def appellation_area():
    """Union of appellation bboxes from site/data/geo/_index.json (written by integration);
    None when the index is not there yet."""
    idx = ROOT / "site/data/geo/_index.json"
    if not idx.exists():
        return None
    try:
        rows = json.loads(idx.read_text(encoding="utf-8"))
    except ValueError:
        return None
    if isinstance(rows, dict):
        rows = rows.get("appellations") or rows.get("items") or list(rows.values())
    boxes = [box(*r["bbox"]) for r in rows if isinstance(r, dict) and isinstance(r.get("bbox"), list) and len(r["bbox"]) == 4]
    return unary_union(boxes).buffer(0.05) if boxes else None


def wine_country_union():
    fc = json.loads((OUT / "countries.geojson").read_text(encoding="utf-8"))
    geoms = [shape(f["geometry"]).buffer(0) for f in fc["features"] if f["properties"]["iso2"] in WINE_ISO]
    return unary_union(geoms).buffer(0.05)


def country_lookup():
    fc = json.loads((OUT / "countries.geojson").read_text(encoding="utf-8"))
    geoms = [shape(f["geometry"]).buffer(0) for f in fc["features"]]
    isos = [f["properties"]["iso2"] for f in fc["features"]]
    tree = STRtree(geoms)

    def look(lon, lat):
        p = Point(lon, lat)
        for i in tree.query(p):
            if geoms[i].contains(p):
                return isos[i]
        i = tree.nearest(p)
        return isos[i]
    return look


def osm_geom(cache_file, want_types=("river",), bbox=None):
    """Pick the waterway relation (or merge waterway ways) from a cached Nominatim response."""
    d = json.loads(cache_file.read_text(encoding="utf-8"))
    rel = [x for x in d if x.get("category") in ("waterway", "natural") and x.get("type") in want_types
           and x["osm_type"] == "relation" and x["geojson"]["type"] in ("LineString", "MultiLineString", "Polygon", "MultiPolygon")]
    ways = [x for x in d if x.get("category") == "waterway" and x.get("type") in want_types and x["osm_type"] == "way"]
    if rel:
        # largest relation by bbox span
        rel.sort(key=lambda x: -(float(x["boundingbox"][1]) - float(x["boundingbox"][0]) +
                                 float(x["boundingbox"][3]) - float(x["boundingbox"][2])))
        return [shape(rel[0]["geojson"])], f"r{rel[0]['osm_id']}"
    if ways:
        return [shape(x["geojson"]) for x in ways], "w" + ",".join(str(x["osm_id"]) for x in ways[:3])
    return [], None


# ------------------------------------------------------------------ rivers
def build_rivers(wine_area, log):
    feats = []
    src_names = {"ne_10m_rivers_lake_centerlines": 0, "ne_10m_rivers_europe": 1, "ne_10m_rivers_north_america": 2}
    replace = defaultdict(list)
    for r in OSM_RIVERS:
        for n in r.get("replace_ne", []):
            replace[n].append(box(*r["bbox"]))
    drop = [(n, box(*b)) for n, b in NE_DROP]
    ne_wine = defaultdict(list)
    for n, b, disp in NE_WINE_RIVERS:
        ne_wine[n].append((box(*b), disp))
    found_wine = set()
    for fn, tier in src_names.items():
        for f in load(fn):
            p = f["properties"]
            if not f["geometry"] or p.get("featurecla") == "Canal":
                continue
            g = shape(f["geometry"])
            name = (p.get("name") or "").strip()
            sr = int(p.get("scalerank") or 12)
            if any(name == n and g.intersects(bx) for n, bx in drop):
                continue
            # match on primary name only: NE name_alt wrongly carries the main river's name on
            # real tributaries (Glan "Nahe", Auvezere "Isle", Latorica "Bodrog")
            if any(g.intersects(bx) for bx in replace.get(name, [])):
                continue
            wine = False
            disp = name
            for bx, dn in ne_wine.get(name, []):
                if g.intersects(bx):
                    wine, disp = True, dn
                    found_wine.add(dn)
                    break
            inside = g.intersects(wine_area)
            if sr >= 11:  # minor supplement rivers: only where they run through appellations
                inside = inside and (APP_AREA is None or g.intersects(APP_AREA))
            keep = wine or sr <= 5 or (inside and (name or sr <= 7)) or (tier == 0 and sr <= 6)
            if not keep:
                continue
            feats.append({"type": "Feature", "geometry": f["geometry"],
                          "properties": {"name": disp, "scalerank": sr, "wine": wine}})
    log.append(f"rivers: {len(feats)} NE features kept; curated NE rivers matched: {len(found_wine)}")
    missing = sorted({d for _, _, d in NE_WINE_RIVERS} - found_wine)
    if missing:
        log.append(f"rivers: curated NE names not matched: {missing}")
    # OSM additions
    added = []
    for r in OSM_RIVERS:
        geoms, oid = [], None
        types = tuple(r.get("types", ["river"]))
        for q in r["q"]:
            cf = OSM / f"river_{slug(r['name'])}_{slug(q)}.json"
            if cf.exists():
                geoms, oid = osm_geom(cf, types)
                if geoms:
                    break
        if not geoms:
            log.append(f"rivers: OSM {r['name']}: NOT FOUND")
            continue
        bx = box(*r["bbox"]).buffer(0.3)
        lines, polys = [], []
        for g in geoms:
            if g.geom_type in ("Polygon", "MultiPolygon"):
                polys.append(g)
            else:
                lines.append(g)
        if r["name"] == "Gironde" and polys:
            g = unary_union(polys).simplify(0.002)
            gtype = "poly"
        else:
            g = unary_union(lines) if lines else None
            if g is not None and g.geom_type == "MultiLineString":
                g = linemerge(g)
            if g is None:
                log.append(f"rivers: OSM {r['name']}: no line geometry")
                continue
            g = g.intersection(bx) if not bx.contains(g) else g
            g = g.simplify(0.0015, preserve_topology=False)
            gtype = "line"
        added.append((r, g, oid, gtype))
    gironde_poly = None
    for r, g, oid, gtype in added:
        if gtype == "poly":
            gironde_poly = (r, g, oid)
            continue
        feats.append({"type": "Feature", "geometry": mapping(g),
                      "properties": {"name": r["name"], "scalerank": r["sr"], "wine": True}})
        log.append(f"rivers: + OSM {r['name']} ({oid}, {g.length:.2f} deg)")
    return feats, gironde_poly


def slug(s):
    return "".join(c if c.isalnum() else "_" for c in s)[:60]


# ------------------------------------------------------------------ lakes
WINE_LAKES = {"Seneca Lake", "Cayuga Lake", "Keuka Lake", "Canandaigua Lake", "Lake Geneva", "Neusiedlersee",
              "Bodensee", "Lago di Garda", "Lake Balaton", "Okanagan Lake", "Lake Superior", "Lake Michigan",
              "Lake Huron", "Lake Erie", "Lake Ontario", "Lago di Como", "Lago d' Iseo", "Zürichsee", "Neuchâtel",
              "Lake Dunstan", "Lake Wakatipu", "Lake Wanaka", "Lago di Bolsena", "Trasimeno", "Lago Maggiore",
              "Lac du Bourget", "Lac d'Annecy", "Bielersee", "Lake Skaha", "Osoyoos Lake", "Skaha Lake",
              "Lake Chelan", "Clear Lake", "Lake Ohrid", "Lake Prespa", "Lake Constance", "Lake Garda",
              "Lago di Bracciano", "Lago di Vico", "Lake Sevan", "Lago Maggiore", "Lago di Lugano - Ceresio"}
LAKE_RENAME = {"Neusiedlersee": "Neusiedler See", "Lago d' Iseo": "Lago d'Iseo", "Neuchâtel": "Lac de Neuchâtel",
               "Lake Geneva": "Lake Geneva (Léman)", "Bodensee": "Bodensee (Lake Constance)"}


def build_lakes(wine_area, log):
    feats = []
    seen = []
    for fn in ("ne_10m_lakes", "ne_10m_lakes_north_america", "ne_10m_lakes_europe"):
        for f in load(fn):
            p = f["properties"]
            if not f["geometry"]:
                continue
            name = (p.get("name") or "").strip()
            sr = int(p.get("scalerank") or 12)
            g = shape(f["geometry"])
            for wrong, pt, right in NE_LAKE_FIX:
                if name == wrong and g.buffer(0.02).contains(Point(pt)):
                    name = right
            wine = name in WINE_LAKES
            inside = g.intersects(wine_area)
            keep = wine or sr <= 3 or (inside and sr <= 9) or (inside and name and sr <= 10 and g.area > 0.002)
            if not keep:
                continue
            # supplements overlap the main layer in a few places: skip near-duplicates
            c = g.representative_point()
            if fn != "ne_10m_lakes" and any(sg.contains(c) for sg in seen):
                continue
            if fn == "ne_10m_lakes":
                seen.append(g)
            feats.append({"type": "Feature", "geometry": f["geometry"],
                          "properties": {"name": LAKE_RENAME.get(name, name), "scalerank": sr, "wine": wine}})
    for r in OSM_LAKES:
        cf = OSM / f"lake_{slug(r['name'])}.json"
        hit = None
        if cf.exists():
            for x in json.loads(cf.read_text(encoding="utf-8")):
                if x["geojson"]["type"] in ("Polygon", "MultiPolygon"):
                    hit = x
                    break
        if not hit:
            log.append(f"lakes: OSM {r['name']}: NOT FOUND")
            continue
        g = shape(hit["geojson"]).buffer(0).simplify(0.0005)
        feats.append({"type": "Feature", "geometry": mapping(g),
                      "properties": {"name": r["name"], "scalerank": r["sr"], "wine": True}})
        log.append(f"lakes: + OSM {r['name']} ({hit['osm_type'][0]}{hit['osm_id']})")
    got = {f["properties"]["name"] for f in feats if f["properties"]["wine"]}
    log.append(f"lakes: {len(feats)} kept; wine lakes: {sorted(got)}")
    return feats


# ------------------------------------------------------------------ places
SETTLE = ("city", "town", "village", "hamlet", "suburb", "municipality", "city_district", "quarter",
          "neighbourhood", "locality", "isolated_dwelling")


def pick_settlement(results):
    """First Nominatim hit at settlement level (skip county/state boundaries of the same name)."""
    for e in results:
        if e.get("addresstype") in SETTLE or e.get("type") in SETTLE:
            return e
    return None


def build_places(log):
    look = country_lookup()
    feats = []
    have = {}
    for f in load("ne_10m_populated_places"):
        p = f["properties"]
        sr = int(p["SCALERANK"])
        if sr > 6:
            continue
        lon, lat = f["geometry"]["coordinates"]
        iso = str(p.get("ISO_A2") or "").lower()
        # NE codes follow its default worldview; the site uses recognised borders, so places that
        # NE gives to Russia but that lie in the site's Ukraine polygon (Crimea) become "ua"
        if iso in ("-99", "") or (iso == "ru" and look(lon, lat) == "ua"):
            iso = look(lon, lat)
        lon, lat = f["geometry"]["coordinates"]
        feats.append({"type": "Feature", "geometry": {"type": "Point", "coordinates": [round(lon, 4), round(lat, 4)]},
                      "properties": {"name": p["NAME"], "rank": sr, "wine": False, "country": iso,
                                     "cap": 1 if p.get("ADM0CAP") else 0, "pop": int(p.get("POP_MAX") or 0)}})
        have[(p["NAME"], iso)] = feats[-1]
    allne = {}
    for f in load("ne_10m_populated_places"):
        p = f["properties"]
        iso = str(p.get("ISO_A2") or "").lower()
        for k in ("NAME", "NAMEASCII"):
            allne.setdefault((p[k], iso), f)
    added = missing = 0
    for t in WINE_TOWNS:
        name, cc, q, rank = t[0], t[1], t[2], t[3]
        if (name, cc) in have:
            have[(name, cc)]["properties"]["wine"] = True
            have[(name, cc)]["properties"]["rank"] = min(rank, have[(name, cc)]["properties"]["rank"])
            continue
        coords = None
        nef = allne.get((name, cc))
        if (name, cc) in TOWN_COORDS:
            coords = list(TOWN_COORDS[(name, cc)])
        elif nef:
            coords = nef["geometry"]["coordinates"]
            src = "ne"
        else:
            cf = OSM / f"town_{cc}_{slug(q or name)}.json"
            if cf.exists():
                d = json.loads(cf.read_text(encoding="utf-8"))
                e = pick_settlement(d)
                if e:
                    coords = [float(e["lon"]), float(e["lat"])]
                    src = "osm"
        if not coords:
            missing += 1
            log.append(f"places: no coordinates for {name} ({cc})")
            continue
        feats.append({"type": "Feature",
                      "geometry": {"type": "Point", "coordinates": [round(coords[0], 4), round(coords[1], 4)]},
                      "properties": {"name": name, "rank": rank, "wine": True, "country": cc, "cap": 0, "pop": 0}})
        have[(name, cc)] = feats[-1]
        added += 1
    for f in feats:  # drop helper fields not needed by the client except cap
        f["properties"].pop("pop", None)
    feats.sort(key=lambda f: (f["properties"]["rank"], not f["properties"]["wine"], f["properties"]["name"]))
    log.append(f"places: {len(feats)} total, {sum(f['properties']['wine'] for f in feats)} wine towns "
               f"({added} added beyond NE scalerank<=6), {missing} without coordinates")
    return feats


def write(name, feats, nd=4):
    out = []
    for f in feats:
        if not f.get("geometry"):
            continue
        g = dedupe_coords(rnd(f["geometry"], nd)) if f["geometry"]["type"] != "Point" else f["geometry"]
        if g:
            out.append({"type": "Feature", "geometry": g, "properties": f["properties"]})
    path = OUT / name
    path.write_text(json.dumps({"type": "FeatureCollection", "features": out}, ensure_ascii=False,
                               separators=(",", ":")), encoding="utf-8")
    return path.stat().st_size, len(out)


if __name__ == "__main__":
    log = []
    APP_AREA = appellation_area()
    log.append(f"rivers: appellation-area filter for scalerank>=11: {'on' if APP_AREA is not None else 'off (no _index.json)'}")
    wine_area = wine_country_union()
    rivers, gironde = build_rivers(wine_area, log)
    rv = ms_simplify({"type": "FeatureCollection", "features": rivers}, "rivers", 40)
    rv_feats = rv["features"]
    print("rivers", write("rivers.geojson", rv_feats))
    lakes = build_lakes(wine_area, log)
    if not gironde:  # estuary water polygon (natural=bay relation) from the cached Nominatim reply
        for cf in sorted(OSM.glob("river_Gironde_*.json")):
            for x in json.loads(cf.read_text(encoding="utf-8")):
                if x.get("type") == "bay" and x["geojson"]["type"] in ("Polygon", "MultiPolygon"):
                    r0 = next(r for r in OSM_RIVERS if r["name"] == "Gironde")
                    gironde = (r0, shape(x["geojson"]).buffer(0).simplify(0.001), f"r{x['osm_id']}")
                    break
            if gironde:
                break
    if gironde:
        r, g, oid = gironde
        lakes.append({"type": "Feature", "geometry": mapping(g),
                      "properties": {"name": "Gironde", "scalerank": r["sr"], "wine": True, "estuary": True}})
        log.append(f"lakes: + OSM Gironde estuary water polygon ({oid}) as a lake-style water area")
    lk = ms_simplify({"type": "FeatureCollection", "features": lakes}, "lakes", 35)
    print("lakes", write("lakes.geojson", lk["features"]))
    print("places", write("places.geojson", build_places(log)))
    (TMP / "base_layers_log.txt").write_text("\n".join(log), encoding="utf-8")
    print("\n".join(l for l in log if "NOT FOUND" in l or "not matched" in l or "no coordinates" in l or "kept" in l or "total" in l))
