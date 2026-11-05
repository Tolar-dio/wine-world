"""Vector tiles for the appellation layers (performance): one PMTiles archive per country source.

The map used to fetch each country's whole GeoJSON (up to 5.6 MB), parse it on the main thread and hand it to
MapLibre, which re-tiled it in the browser and kept every vertex in memory twice. Phones stalled or crashed when
several countries plus their fine units were loaded. This script pre-tiles the same features:

  site/data/geo/{iso}.geojson       -> site/data/tiles/app-{iso}.pmtiles   (z4-11, layer "a")
  site/data/geo/{iso}_fine.geojson  -> site/data/tiles/fine-{iso}.pmtiles  (z9-13, layer "a")
  and the properties without geometry -> site/data/tiles/props/{app|fine}-{iso}.json (for profiles, labels, search)

Tile properties are exactly the slim set the map styles use (id, country, style, area, lvl, cat, gst, elev).
Geometry is simplified per zoom in Web Mercator to ~0.4 px and clipped with a 64/4096 buffer; features are
written largest first so small units draw on top (the layers also sort by area).

  python3 -I scripts/build_tiles.py [iso ...] [--jobs N]
"""
import gzip
import json
import math
import os
import sys
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

import mapbox_vector_tile
import numpy as np
import shapely
from pmtiles.tile import Compression, TileType, zxy_to_tileid
from pmtiles.writer import Writer
from shapely.geometry import box, shape
from shapely.strtree import STRtree

ROOT = Path(__file__).resolve().parent.parent
GEO = ROOT / "site" / "data" / "geo"
OUT = ROOT / "site" / "data" / "tiles"
R = 6378137.0
HALF = math.pi * R
EXT = 4096
BUF = 64
ZR = {"app": (4, 11), "fine": (9, 13)}


def merc(x, y):
    x = np.asarray(x) * (math.pi / 180) * R
    y = np.clip(np.asarray(y), -85.05112878, 85.05112878)
    y = np.log(np.tan(math.pi / 4 + y * (math.pi / 360))) * R
    return x, y


def to_merc(g):
    return shapely.transform(g, lambda c: np.column_stack(merc(c[:, 0], c[:, 1])))


def tile_bounds(z, x, y):
    s = 2 * HALF / (1 << z)
    return (-HALF + x * s, HALF - (y + 1) * s, -HALF + (x + 1) * s, HALF - y * s)


def tiles_for(b, z):
    s = 2 * HALF / (1 << z)
    n = (1 << z) - 1
    x0 = max(0, int((b[0] + HALF) // s)); x1 = min(n, int((b[2] + HALF) // s))
    y0 = max(0, int((HALF - b[3]) // s)); y1 = min(n, int((HALF - b[1]) // s))
    return x0, x1, y0, y1


def slim(p):
    st = p.get("style") or (p["styles"][0] if isinstance(p.get("styles"), list) and len(p["styles"]) == 1 else "mixed")
    s = {"id": p["id"], "country": p.get("country") or "", "style": st, "area": float(p.get("area") or 0),
         "lvl": int(p["lvl"]) if p.get("lvl") is not None else (1 if p.get("parent") else 0), "cat": p.get("cat") or ""}
    c = p.get("clim") or {}
    if c.get("gst") is not None:
        s["gst"] = float(c["gst"])
    if c.get("elev") is not None:
        s["elev"] = float(c["elev"])
    return s


def load(kind, iso):
    src = GEO / (f"{iso}.geojson" if kind == "app" else f"{iso}_fine.geojson")
    return json.loads(src.read_text(encoding="utf-8")).get("features", [])


def build(job):
    """job = (kind, iso) for one country, or (kind, [iso, ...]) for one merged archive of all of them"""
    kind, iso = job
    isos = iso if isinstance(iso, list) else [iso]
    feats, props, byiso = [], [], {}
    for one in isos:
        for f in load(kind, one):
            p = f.get("properties") or {}
            if not p.get("id") or not f.get("geometry"):
                continue
            props.append(p)
            byiso.setdefault(one, []).append(p)
            try:
                g = shape(f["geometry"])
                if not g.is_valid:
                    g = shapely.make_valid(g)
                g = to_merc(g)
            except Exception:  # noqa: BLE001
                continue
            if g.is_empty:
                continue
            feats.append((slim(p), g))
    feats.sort(key=lambda t: -t[0]["area"])
    z0, z1 = ZR[kind]
    tiles = {}
    for z in range(z0, z1 + 1):
        px = 2 * HALF / (1 << z) / EXT           # metres per tile pixel
        # zoomed out the outlines only need to read as shapes: coarser simplification, and nested units smaller than a
        # few pixels are left out (their parent is drawn; they appear a zoom or two later)
        tol = px * (1.0 if z <= 6 else 0.6 if z <= 8 else 0.4)
        minpx = 6 if z <= 6 else 3 if z <= 8 else 0.6
        geoms = [shapely.simplify(g, tol, preserve_topology=True) for _, g in feats]
        keep = [i for i, g in enumerate(geoms) if not g.is_empty and (z == z1 or feats[i][0]["lvl"] == 0 or g.area >= (px * minpx) ** 2)]
        if not keep:
            continue
        tree = STRtree([geoms[i] for i in keep])
        allb = shapely.total_bounds([geoms[i] for i in keep])
        x0, x1, y0, y1 = tiles_for(allb, z)
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                tb = tile_bounds(z, x, y)
                pad = (tb[2] - tb[0]) * BUF / EXT
                clip = box(tb[0] - pad, tb[1] - pad, tb[2] + pad, tb[3] + pad)
                hits = sorted(tree.query(clip, predicate="intersects"))
                if not len(hits):
                    continue
                out = []
                for h in hits:
                    i = keep[h]
                    g = shapely.intersection(geoms[i], clip)
                    if g.is_empty:
                        continue
                    g = shapely.get_parts(g)
                    g = [q for q in g if q.geom_type in ("Polygon", "MultiPolygon")]
                    if not g:
                        continue
                    g = shapely.multipolygons(g) if len(g) > 1 else g[0]
                    out.append({"geometry": g, "properties": feats[i][0]})
                if not out:
                    continue
                data = mapbox_vector_tile.encode([{"name": "a", "features": out}],
                                                 default_options={"quantize_bounds": tb, "extents": EXT, "on_invalid_geometry": mapbox_vector_tile.encoder.on_invalid_geometry_make_valid})
                tiles[zxy_to_tileid(z, x, y)] = gzip.compress(data, 6)
    OUT.mkdir(parents=True, exist_ok=True)
    name = kind if isinstance(iso, list) else f"{kind}-{iso}"
    path = OUT / f"{name}.pmtiles"
    tmp = path.with_suffix(".tmp")
    allb = shapely.total_bounds([g for _, g in feats]) if feats else (0, 0, 0, 0)
    lon0 = allb[0] / R * 180 / math.pi; lon1 = allb[2] / R * 180 / math.pi
    lat0 = math.degrees(2 * math.atan(math.exp(allb[1] / R)) - math.pi / 2); lat1 = math.degrees(2 * math.atan(math.exp(allb[3] / R)) - math.pi / 2)
    with open(tmp, "wb") as fh:
        w = Writer(fh)
        for tid in sorted(tiles):
            w.write_tile(tid, tiles[tid])
        w.finalize({
            "tile_type": TileType.MVT, "tile_compression": Compression.GZIP,
            "min_zoom": z0, "max_zoom": z1,
            "min_lon_e7": int(lon0 * 1e7), "min_lat_e7": int(lat0 * 1e7), "max_lon_e7": int(lon1 * 1e7), "max_lat_e7": int(lat1 * 1e7),
            "center_zoom": z0, "center_lon_e7": int((lon0 + lon1) / 2 * 1e7), "center_lat_e7": int((lat0 + lat1) / 2 * 1e7),
        }, {"vector_layers": [{"id": "a", "fields": {"id": "String", "style": "String", "area": "Number", "lvl": "Number", "cat": "String", "gst": "Number", "elev": "Number", "country": "String"}}],
            "attribution": "Vitis Mundi"})
    os.replace(tmp, path)
    psz = 0
    for one, pl in byiso.items():   # properties stay per country: the page loads them only for countries in view
        pp = OUT / "props" / f"{kind}-{one}.json"
        pp.parent.mkdir(parents=True, exist_ok=True)
        pp.write_text(json.dumps(pl, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        psz += pp.stat().st_size
    return name, len(feats), len(tiles), path.stat().st_size, psz


def main():
    argv = sys.argv[1:]
    for opt in ("--jobs", "--kind"):
        if opt in argv:
            i = argv.index(opt); argv = argv[:i] + argv[i + 2:]
    args = [a for a in argv if not a.startswith("--")]
    jobs = int(sys.argv[sys.argv.index("--jobs") + 1]) if "--jobs" in sys.argv else max(1, (os.cpu_count() or 2))
    todo = []
    for f in sorted(GEO.glob("*.geojson")):
        n = f.stem
        if n.startswith("_"):
            continue
        if n.endswith("_fine"):
            iso, kind = n[:-5], "fine"
        elif len(n) == 2:
            iso, kind = n, "app"
        else:
            continue
        if args and iso not in args:
            continue
        todo.append((kind, iso))
    if "--per-country" not in sys.argv:
        # default: two merged archives (every country in one source, so the map draws 3 layers, not 3 per country)
        kinds = [k for k in ("app", "fine") if "--kind" not in sys.argv or sys.argv[sys.argv.index("--kind") + 1] == k]
        todo = [(kk, sorted(i for k, i in todo if k == kk)) for kk in kinds]
        for old in OUT.glob("*-??.pmtiles"):  # per-country archives from an older build
            old.unlink()
    # biggest first so the pool stays busy
    if "--per-country" in sys.argv:
        todo.sort(key=lambda j: -(GEO / (f"{j[1]}.geojson" if j[0] == "app" else f"{j[1]}_fine.geojson")).stat().st_size)
    tot = [0, 0]
    with ProcessPoolExecutor(jobs) as ex:
        for name, nf, nt, sz, psz in ex.map(build, todo):
            tot[0] += sz; tot[1] += nt
            print(f"{name:10s} {nf:5d} features {nt:6d} tiles {sz / 1e6:6.2f} MB  props {psz / 1e6:5.2f} MB", flush=True)
    print(f"total {tot[1]} tiles, {tot[0] / 1e6:.1f} MB")


if __name__ == "__main__" and "--base" not in sys.argv:
    main()


# ---------- base layers (coastlines/borders, lakes, admin lines, rivers) ----------
BASE = ROOT / "site" / "data" / "base"
BZ = (3, 8)   # Natural Earth 10m: no more detail past z8, the map overzooms


def safe_label(s, font="atlas-italic"):
    """same rule as core.js safeLabel(): keep characters the packed glyph ranges can draw"""
    import unicodedata
    try:
        g = json.loads((ROOT / "site" / "fonts" / "glyphs.json").read_text(encoding="utf-8"))
        starts = {int(r.split("-")[0]) for r in g.get(font, [])}
    except Exception:  # noqa: BLE001
        return (s or "").strip()
    out = ""
    for ch in s or "":
        cp = ord(ch)
        if cp < 128 or (cp // 256) * 256 in starts or 0x4E00 <= cp <= 0x9FFF:
            out += ch
        else:
            out += "".join(c for c in unicodedata.normalize("NFKD", ch) if ord(c) < 128)
    return out.strip()


def base_layers():
    L = {}
    def rd(n):
        p = BASE / n
        return json.loads(p.read_text(encoding="utf-8"))["features"] if p.exists() else []
    L["land"] = [({"iso2": (f["properties"].get("iso2") or "").lower() or f["properties"].get("iso2") or "", "name": f["properties"].get("name") or ""}, f["geometry"]) for f in rd("countries.geojson")]
    L["lakes"] = [({"name": f["properties"].get("name") or ""}, f["geometry"]) for f in rd("lakes.geojson")]
    L["admin"] = [({"level": int(f["properties"].get("level") or 1), "country": f["properties"].get("country") or ""}, f["geometry"]) for f in rd("admin1_lines.geojson")]
    riv = []
    for f in rd("rivers.geojson"):
        p = f["properties"] or {}
        w = 1 if p.get("wine") in (True, 1, "1") else 0
        sr = float(p.get("sr", p.get("scalerank", p.get("rank", 8))) or 8)
        riv.append(({"lab": safe_label(p.get("name") or p.get("label") or ""), "w": w, "t": 0 if (w or sr <= 6) else 1 if sr <= 9 else 2}, f["geometry"]))
    L["rivers"] = riv
    return L


def build_base():
    raw = base_layers()
    layers = {}
    for name, items in raw.items():
        out = []
        for props, geom in items:
            try:
                g = shape(geom)
                if not g.is_valid:
                    g = shapely.make_valid(g)
                g = to_merc(g)
            except Exception:  # noqa: BLE001
                continue
            if not g.is_empty:
                out.append((props, g))
        layers[name] = out
    tiles = {}
    for z in range(BZ[0], BZ[1] + 1):
        px = 2 * HALF / (1 << z) / EXT
        per = {}
        for name, items in layers.items():
            geoms = [shapely.simplify(g, px * 0.5, preserve_topology=True) for _, g in items]
            per[name] = (items, geoms, STRtree(geoms))
        n = 1 << z
        # only tiles that touch something: walk each layer's tree per tile row band
        allb = shapely.total_bounds([g for _, g in layers["land"]] or [box(-HALF, -HALF, HALF, HALF)])
        x0, x1, y0, y1 = tiles_for(allb, z)
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                tb = tile_bounds(z, x, y)
                pad = (tb[2] - tb[0]) * BUF / EXT
                clip = box(tb[0] - pad, tb[1] - pad, tb[2] + pad, tb[3] + pad)
                enc = []
                for name, (items, geoms, tree) in per.items():
                    hits = tree.query(clip, predicate="intersects")
                    feats = []
                    for h in sorted(hits):
                        g = shapely.intersection(geoms[h], clip)
                        if g.is_empty:
                            continue
                        line = name in ("admin", "rivers")
                        parts = [q for q in shapely.get_parts(g) if (q.geom_type in ("LineString", "MultiLineString")) == line and q.geom_type != "Point"]
                        if not parts:
                            continue
                        g = (shapely.multilinestrings(parts) if line else shapely.multipolygons(parts)) if len(parts) > 1 else parts[0]
                        feats.append({"geometry": g, "properties": items[h][0]})
                    if feats:
                        enc.append({"name": name, "features": feats})
                if enc:
                    data = mapbox_vector_tile.encode(enc, default_options={"quantize_bounds": tb, "extents": EXT, "on_invalid_geometry": mapbox_vector_tile.encoder.on_invalid_geometry_make_valid})
                    tiles[zxy_to_tileid(z, x, y)] = gzip.compress(data, 6)
        print(f"  base z{z}: {len(tiles)} tiles so far", flush=True)
    path = OUT / "base.pmtiles"
    tmp = path.with_suffix(".tmp")
    with open(tmp, "wb") as fh:
        w = Writer(fh)
        for tid in sorted(tiles):
            w.write_tile(tid, tiles[tid])
        w.finalize({"tile_type": TileType.MVT, "tile_compression": Compression.GZIP, "min_zoom": BZ[0], "max_zoom": BZ[1],
                    "min_lon_e7": -1800000000, "min_lat_e7": -850000000, "max_lon_e7": 1800000000, "max_lat_e7": 850000000,
                    "center_zoom": BZ[0], "center_lon_e7": 0, "center_lat_e7": 0},
                   {"vector_layers": [{"id": k, "fields": {}} for k in layers], "attribution": "Natural Earth, OpenStreetMap contributors"})
    os.replace(tmp, path)
    print(f"base: {len(tiles)} tiles, {path.stat().st_size / 1e6:.1f} MB")


if __name__ == "__main__" and "--base" in sys.argv:
    build_base()
