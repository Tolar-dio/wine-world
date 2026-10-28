"""Shared helpers for the non-European geodata pipeline (world_*.py scripts).

Every world_{country}.py script builds a list of "raw features" (shapely geometry +
properties), then calls finalize() which:
  * simplifies geometry with mapshaper (topology-aware, per-feature tolerance),
  * rounds to 4 decimals, repairs/orients polygons,
  * computes area (km2, geodesic, from the UNSIMPLIFIED geometry), label point, bbox,
  * resolves parent ids (explicit hierarchy hints first, geometric >=85% containment as fallback),
  * validates and writes site/data/geo/{iso2}.geojson.

Run every script with `python3 -I`; this module is imported via an explicit sys.path entry.
"""
import json
import math
import os
import re
import shutil
import subprocess
import tempfile
import unicodedata

import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, GeometryCollection
from shapely.geometry.polygon import orient
from shapely.ops import polylabel, unary_union
from shapely.strtree import STRtree
from pyproj import Geod

ROOT = "/home/claude/winesite"
GEO_OUT = os.path.join(ROOT, "site", "data", "geo")
WORK = os.path.join(ROOT, "work", "world")
RAW = os.path.join(ROOT, "raw")
MAPSHAPER = shutil.which("mapshaper") or "/home/claude/.npm-global/bin/mapshaper"
GEOD = Geod(ellps="WGS84")
os.makedirs(WORK, exist_ok=True)
os.makedirs(GEO_OUT, exist_ok=True)


# ---------------------------------------------------------------- ids / names
def slugify(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("&", " and ").replace("'", "").replace("’", "")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-+", "-", s)


class IdMaker:
    def __init__(self, iso2):
        self.iso2 = iso2
        self.used = set()

    def __call__(self, name):
        base = f"{self.iso2}-{slugify(name)}"
        i, cand = 1, base
        while cand in self.used:
            i += 1
            cand = f"{base}-{i}"
        self.used.add(cand)
        return cand


# ---------------------------------------------------------------- geometry
def polygonal(g):
    """Return only the polygonal part of g as Polygon/MultiPolygon (or None)."""
    if g is None or g.is_empty:
        return None
    if isinstance(g, (Polygon, MultiPolygon)):
        return g
    if isinstance(g, GeometryCollection) or hasattr(g, "geoms"):
        polys = []
        for p in g.geoms:
            p = polygonal(p)
            if p is None:
                continue
            polys.extend(p.geoms if isinstance(p, MultiPolygon) else [p])
        if not polys:
            return None
        return polys[0] if len(polys) == 1 else MultiPolygon(polys)
    return None


def fix(g):
    if g is None:
        return None
    if not g.is_valid:
        g = shapely.make_valid(g)
    return polygonal(g)


def area_km2(g):
    a, _ = GEOD.geometry_area_perimeter(orient_geom(g))
    return abs(a) / 1e6


def orient_geom(g):
    if isinstance(g, Polygon):
        return orient(g, 1.0)
    if isinstance(g, MultiPolygon):
        return MultiPolygon([orient(p, 1.0) for p in g.geoms])
    return g


def round_geom(g, nd=4):
    return shapely.set_precision(g, 10 ** -nd, mode="valid_output") if g is not None else None


def drop_tiny_parts(g, min_frac=0.0, min_abs_deg2=0.0):
    if isinstance(g, MultiPolygon):
        total = g.area
        parts = [p for p in g.geoms if p.area >= max(min_abs_deg2, min_frac * total)]
        if not parts:
            parts = [max(g.geoms, key=lambda p: p.area)]
        return parts[0] if len(parts) == 1 else MultiPolygon(parts)
    return g


def label_point(g):
    if isinstance(g, MultiPolygon):
        poly = max(g.geoms, key=lambda p: p.area)
    else:
        poly = g
    try:
        tol = max(math.sqrt(poly.area) / 200.0, 1e-5)
        pt = polylabel(poly, tolerance=tol)
        if not poly.contains(pt):
            pt = poly.representative_point()
    except Exception:
        pt = poly.representative_point()
    return [round(pt.x, 4), round(pt.y, 4)]


def bbox(g):
    w, s, e, n = g.bounds
    return [round(w, 4), round(s, 4), round(e, 4), round(n, 4)]


# ---------------------------------------------------------------- mapshaper
def mapshaper_simplify(geoms_by_id, interval_fn, label, keep_shapes=True, extra_cmds=None):
    """Topology-aware simplification of many features at once.

    geoms_by_id: {id: shapely geometry}. interval_fn(id, area_km2) -> metres (Douglas-Peucker-ish
    Visvalingam interval) or 0 for no simplification. Returns {id: shapely geometry} rounded to
    4 decimals (via mapshaper precision) but not yet repaired.
    """
    tmp = tempfile.mkdtemp(prefix=f"ms_{label}_", dir=WORK)
    src = os.path.join(tmp, "in.geojson")
    dst = os.path.join(tmp, "out.geojson")
    feats = []
    for fid, g in geoms_by_id.items():
        a = area_km2(g)
        feats.append({"type": "Feature", "properties": {"fid": fid, "iv": float(interval_fn(fid, a))},
                      "geometry": mapping(g)})
    with open(src, "w") as f:
        json.dump({"type": "FeatureCollection", "features": feats}, f)
    cmd = [MAPSHAPER, "-i", src, "-simplify", "variable", "interval=iv"]
    if keep_shapes:
        cmd.append("keep-shapes")
    if extra_cmds:
        cmd += extra_cmds
    cmd += ["-o", dst, "format=geojson", "precision=0.0001"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr)
    out = {}
    with open(dst) as f:
        for ft in json.load(f)["features"]:
            if ft["geometry"] is None:
                continue
            out[ft["properties"]["fid"]] = shape(ft["geometry"])
    shutil.rmtree(tmp, ignore_errors=True)
    return out


def size_interval(base_m, ref_km2=1000.0, power=0.5, min_m=0.0, max_m=5000.0):
    """Interval grows with sqrt(area): small AVAs stay detailed, giant ones get coarser."""
    def fn(fid, a):
        v = base_m * (max(a, 0.01) / ref_km2) ** power
        return max(min_m, min(max_m, v))
    return fn


# ---------------------------------------------------------------- parents
def compute_parents(items, hint_key="parent_hints", thresh=0.85, hint_thresh=0.65, log=None):
    """items: list of dicts with 'id', 'geom' (unsimplified), 'area', optional hint list of ids.

    Parent = smallest-area candidate among (hinted ids that resolve) U (features containing
    >= thresh of this one's area). Hints are accepted if geometric overlap >= hint_thresh (0.65)
    because official hierarchies trump digitising slop (e.g. boundary revisions not mirrored in
    the parent polygon).
    """
    by_id = {it["id"]: it for it in items}
    geoms = [it["geom"] for it in items]
    tree = STRtree(geoms)
    for i, it in enumerate(items):
        g = it["geom"]
        ga = g.area
        cands = {}
        for j in tree.query(g):
            o = items[j]
            if o["id"] == it["id"]:
                continue
            if "rank" in o and "rank" in it:
                if o["rank"] >= it["rank"]:
                    continue
            elif o["area"] <= it["area"] * 1.0001:
                continue
            try:
                inter = g.intersection(o["geom"]).area
            except Exception:
                inter = g.buffer(0).intersection(o["geom"].buffer(0)).area
            frac = inter / ga if ga > 0 else 0
            if frac >= thresh:
                cands[o["id"]] = ("geom", frac)
        for h in it.get(hint_key) or []:
            if h in by_id and h != it["id"]:
                o = by_id[h]
                if "rank" in o and "rank" in it and o["rank"] >= it["rank"]:
                    continue
                try:
                    frac = g.intersection(o["geom"]).area / ga
                except Exception:
                    frac = 0
                if frac >= hint_thresh:
                    cands.setdefault(h, ("hint", frac))
                elif log is not None:
                    log.append(f"hint parent {h} of {it['id']} rejected (overlap {frac:.2f})")
        # legally-defined parents whose polygons only abut (e.g. islands of a DVA): honour if forced
        for h in it.get("force_parent") or []:
            if h in by_id:
                cands.setdefault(h, ("forced", 0))
        if cands:
            # most specific hierarchy level first (when ranks are given), then smallest area
            best = min(cands, key=lambda c: (-by_id[c].get("rank", 0), by_id[c]["area"]))
            it["parent"] = best
            if log is not None and it.get(hint_key) and best not in it[hint_key]:
                log.append(f"{it['id']}: geometric parent {best} not in official hints {it[hint_key]}")
        else:
            it["parent"] = None


# ---------------------------------------------------------------- final writer
PROP_ORDER = ["id", "name", "alt", "country", "cat", "subcat", "src", "bq", "area", "parent", "lp",
              "bbox", "varieties", "styles", "reg"]


def finalize(iso2, items, interval_fn, max_bytes, label=None, tighten=1.35, max_iter=8,
             compute_parent=True, log=None, min_area_keep=0.0, hint_thresh=0.65):
    """items: dicts with id, name, cat, ... and 'geom' (unsimplified shapely, WGS84).

    Writes site/data/geo/{iso2}.geojson. Returns (path, bytes, n).
    """
    label = label or iso2
    for it in items:
        it["geom"] = fix(it["geom"])
        assert it["geom"] is not None and not it["geom"].is_empty, it["id"]
        it["area"] = round(area_km2(it["geom"]), 1)
    if compute_parent:
        compute_parents(items, log=log, hint_thresh=hint_thresh)
    ids = [it["id"] for it in items]
    assert len(set(ids)) == len(ids), "duplicate ids"
    for i in ids:
        assert re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", i), i
    scale = 1.0
    for attempt in range(max_iter):
        fn = (lambda s: (lambda fid, a: interval_fn(fid, a) * s))(scale)
        simp = mapshaper_simplify({it["id"]: it["geom"] for it in items}, fn, label)
        feats = []
        for it in items:
            g = simp.get(it["id"])
            g = fix(g) if g is not None else None
            if g is None or g.is_empty or g.area == 0:
                # fall back to a lightly simplified original
                g = fix(it["geom"].simplify(0.0005, preserve_topology=True))
            g = round_geom(g)
            g = fix(g)
            if g is None or g.is_empty:
                g = round_geom(it["geom"].buffer(0.0005))
            g = orient_geom(g)
            props = {
                "id": it["id"], "name": it["name"], "alt": it.get("alt") or None,
                "country": iso2, "cat": it["cat"], "subcat": it.get("subcat"),
                "src": it["src"], "bq": it["bq"], "area": it["area"],
                "parent": it.get("parent"), "lp": label_point(g), "bbox": bbox(g),
                "varieties": it.get("varieties") or None, "styles": it.get("styles") or None,
                "reg": it.get("reg") or None,
            }
            props = {k: props[k] for k in PROP_ORDER if props.get(k) is not None or k == "parent"}
            feats.append({"type": "Feature", "properties": props, "geometry": geom_json(g)})
        fc = {"type": "FeatureCollection", "features": feats}
        txt = json.dumps(fc, ensure_ascii=False, separators=(",", ":"))
        nbytes = len(txt.encode("utf-8"))
        if log is not None:
            log.append(f"{iso2}: simplification scale {scale:.2f} -> {nbytes/1e6:.2f} MB")
        if nbytes <= max_bytes:
            break
        scale *= tighten * max(1.0, (nbytes / max_bytes) ** 0.7)
    path = os.path.join(GEO_OUT, f"{iso2}.geojson")
    with open(path, "w", encoding="utf-8") as f:
        f.write(txt)
    validate(path, iso2)
    return path, nbytes, len(feats)


def _r(c):
    return [round(c[0], 4), round(c[1], 4)]


def geom_json(g):
    def ring(r):
        cs = [_r(c) for c in r.coords]
        out = [cs[0]]
        for c in cs[1:]:
            if c != out[-1]:
                out.append(c)
        if out[0] != out[-1]:
            out.append(out[0])
        return out

    def poly(p):
        return [ring(p.exterior)] + [ring(i) for i in p.interiors]

    if isinstance(g, Polygon):
        return {"type": "Polygon", "coordinates": poly(g)}
    return {"type": "MultiPolygon", "coordinates": [poly(p) for p in g.geoms]}


def validate(path, iso2):
    with open(path, encoding="utf-8") as f:
        fc = json.load(f)
    ids = set()
    problems = []
    for ft in fc["features"]:
        p = ft["properties"]
        assert p["country"] == iso2
        assert p["id"].startswith(iso2 + "-")
        assert p["id"] not in ids, p["id"]
        ids.add(p["id"])
        g = ft["geometry"]
        assert g["type"] in ("Polygon", "MultiPolygon"), (p["id"], g["type"])
        sg = shape(g)
        assert not sg.is_empty, p["id"]
        for ring_set in (g["coordinates"] if g["type"] == "Polygon" else [r for pp in g["coordinates"] for r in pp]):
            pass
        if not sg.is_valid:
            problems.append(p["id"])
        for k in ("name", "cat", "src", "bq", "area", "lp", "bbox"):
            assert k in p, (p["id"], k)
    for ft in fc["features"]:
        par = ft["properties"].get("parent")
        assert par is None or par in ids, (ft["properties"]["id"], par)
    return problems


def write_raw_debug(iso2, items):
    """Write the unsimplified dissolved polygons to work/world/{iso2}_full.geojson (for reuse)."""
    feats = [{"type": "Feature", "properties": {k: v for k, v in it.items() if k != "geom"},
              "geometry": mapping(it["geom"])} for it in items]
    with open(os.path.join(WORK, f"{iso2}_full.geojson"), "w") as f:
        json.dump({"type": "FeatureCollection", "features": feats}, f, ensure_ascii=False, default=str)


def load_fc(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)
