# Shared helpers for the Europe geodata scripts (Vitis Mundi).
# Run with: python3 -I scripts/europe_xxx.py  (reads untrusted data from raw/)
import json, os, re, subprocess, sys, unicodedata
import numpy as np
import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import polylabel, transform
from pyproj import Transformer
from unidecode import unidecode

ROOT = '/home/claude/winesite'
RAW = ROOT + '/raw'
WORK = ROOT + '/work/europe'
GEO = ROOT + '/site/data/geo'
MAPSHAPER = os.path.expanduser('~/.npm-global/bin/mapshaper')
if not os.path.exists(MAPSHAPER):
    MAPSHAPER = 'mapshaper'
os.makedirs(WORK, exist_ok=True)
os.makedirs(GEO, exist_ok=True)

T_4326_3035 = Transformer.from_crs(4326, 3035, always_xy=True)
T_3035_4326 = Transformer.from_crs(3035, 4326, always_xy=True)


def reproj(geom, tr):
    def f(a):
        x, y = tr.transform(a[:, 0], a[:, 1])
        return np.column_stack([x, y])
    return shapely.transform(geom, f)

PROP_ORDER = ['id', 'name', 'alt', 'country', 'cat', 'subcat', 'src', 'bq', 'area', 'parent',
              'lp', 'bbox', 'varieties', 'styles', 'reg']


def slug(s):
    s = unidecode(s).lower()
    s = re.sub(r"[^a-z0-9]+", '-', s).strip('-')
    return re.sub(r'-+', '-', s)


def is_latin(s):
    for ch in s:
        if ch.isalpha() and not unicodedata.name(ch, '').startswith('LATIN'):
            return False
    return True


def make_ids(names, iso2, taken=None):
    taken = set() if taken is None else taken
    out = []
    for n in names:
        base = f'{iso2}-{slug(n)}'
        i, cid = 1, base
        while cid in taken:
            i += 1
            cid = f'{base}-{i}'
        taken.add(cid)
        out.append(cid)
    return out


def clean_projected(geom, min_hole_km2=0.2, min_part_km2=0.02):
    """Drop small holes and specks (geometry in a metric CRS)."""
    if geom is None or geom.is_empty:
        return geom
    geom = shapely.make_valid(geom)
    polys = [p for p in getattr(geom, 'geoms', [geom]) if isinstance(p, Polygon)]
    if not polys:
        sub = []
        for g in getattr(geom, 'geoms', []):
            sub += [p for p in getattr(g, 'geoms', [g]) if isinstance(p, Polygon)]
        polys = sub
    if not polys:
        return None
    big = max(p.area for p in polys)
    keep = []
    for p in polys:
        if p.area < min_part_km2 * 1e6 and p.area < big:
            continue
        holes = [r for r in p.interiors if Polygon(r).area >= min_hole_km2 * 1e6]
        keep.append(Polygon(p.exterior, holes))
    return shapely.union_all(keep) if len(keep) > 1 else keep[0]


def polys_only(g):
    if g is None or g.is_empty:
        return None
    if isinstance(g, (Polygon, MultiPolygon)):
        return g
    ps = []
    for x in getattr(g, 'geoms', []):
        if isinstance(x, Polygon):
            ps.append(x)
        elif isinstance(x, MultiPolygon):
            ps.extend(x.geoms)
    if not ps:
        return None
    return MultiPolygon(ps) if len(ps) > 1 else ps[0]


def label_point(g):
    parts = list(getattr(g, 'geoms', [g]))
    p = max(parts, key=lambda q: q.area)
    lat0 = p.centroid.y
    k = np.cos(np.radians(lat0))
    ps = shapely.transform(p, lambda a: a * np.array([k, 1.0]))
    minx, miny, maxx, maxy = ps.bounds
    tol = max(maxx - minx, maxy - miny) / 100.0 or 1e-4
    try:
        c = polylabel(ps, tolerance=tol)
        pt = shapely.Point(c.x / k, c.y)
        if not p.contains(pt):
            pt = p.representative_point()
    except Exception:
        pt = p.representative_point()
    return [round(pt.x, 4), round(pt.y, 4)]


def rnd(coords):
    return [[round(x, 4), round(y, 4)] for x, y in coords]


def geom_json(g):
    if isinstance(g, Polygon):
        return {'type': 'Polygon', 'coordinates': [rnd(g.exterior.coords)] + [rnd(r.coords) for r in g.interiors]}
    return {'type': 'MultiPolygon', 'coordinates': [
        [rnd(p.exterior.coords)] + [rnd(r.coords) for r in p.interiors] for p in g.geoms]}


def area_km2_4326(g):
    return shapely.area(reproj(g, T_4326_3035)) / 1e6


def compute_parents(feats, threshold=0.85):
    """feats: list of dicts with 'id', '_g' (4326 simplified geometry), 'area'.
    Parent = smallest feature (larger area) containing >= threshold of this one."""
    proj = [shapely.make_valid(reproj(f['_g'], T_4326_3035)) for f in feats]
    areas = np.array([p.area for p in proj])
    tree = shapely.STRtree(proj)
    parents = [None] * len(feats)
    for i, g in enumerate(proj):
        if areas[i] <= 0:
            continue
        cand = tree.query(g, predicate='intersects')
        cand = [j for j in cand if j != i and areas[j] > areas[i] * 1.001]
        cand.sort(key=lambda j: areas[j])
        for j in cand:
            try:
                inter = shapely.intersection(g, proj[j]).area
            except Exception:
                inter = shapely.intersection(shapely.buffer(g, 0), shapely.buffer(proj[j], 0)).area
            if inter >= threshold * areas[i]:
                parents[i] = feats[j]['id']
                break
    return parents


def _ms_run(geoms, ids, tag, interval):
    src = f'{WORK}/{tag}_in.geojson'
    dst = f'{WORK}/{tag}_ms.geojson'
    with open(src, 'w') as f:
        f.write('{"type":"FeatureCollection","features":[')
        for k, (g, i) in enumerate(zip(geoms, ids)):
            if k:
                f.write(',')
            f.write('{"type":"Feature","properties":{"id":%s},"geometry":%s}' % (json.dumps(i), shapely.to_geojson(g)))
        f.write(']}')
    cmd = [MAPSHAPER, '-i', src, '-simplify', f'interval={interval}', 'keep-shapes',
           '-o', 'precision=0.0001', 'format=geojson', dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-2000:])
    out = {}
    with open(dst) as f:
        fc = json.load(f)
    for ft in fc['features']:
        if ft['geometry'] is None:
            continue
        g = shapely.make_valid(shape(ft['geometry']))
        g = shapely.set_precision(g, 1e-4)
        g = polys_only(g)
        if g is not None and not g.is_empty:
            out[ft['properties']['id']] = g
    os.remove(src)
    return out


def tier_mult(area_km2):
    """Coarser simplification for very large zones (seen mostly at low zoom)."""
    if area_km2 >= 10000:
        return 3.0
    if area_km2 >= 2000:
        return 2.0
    if area_km2 >= 500:
        return 1.4
    return 1.0


def tier_mult_fine(area_km2):
    """Like tier_mult but finer for small (parcel-based) units."""
    if area_km2 < 0.5:
        return 0.25
    if area_km2 < 5:
        return 0.5
    if area_km2 < 50:
        return 0.8
    return tier_mult(area_km2)


def simplify_with_mapshaper(geoms, ids, tag, interval, areas=None, tiered=False, tier_fn=None):
    """geoms: shapely geoms in EPSG:4326; returns dict id->simplified geom."""
    if not tiered or areas is None:
        return _ms_run(geoms, ids, tag, interval)
    tier_fn = tier_fn or tier_mult
    groups = {}
    for g, i, a in zip(geoms, ids, areas):
        groups.setdefault(tier_fn(a), []).append((g, i))
    out = {}
    for m, lst in groups.items():
        out.update(_ms_run([x[0] for x in lst], [x[1] for x in lst], f'{tag}_t{m}', round(interval * m)))
    return out


def write_fc(path, feats):
    """feats: list of dicts with properties (any order) and '_g'."""
    with open(path, 'w', encoding='utf-8') as f:
        f.write('{"type":"FeatureCollection","features":[\n')
        for k, ft in enumerate(feats):
            props = {}
            for key in PROP_ORDER:
                v = ft.get(key)
                if v is None and key not in ('parent',):
                    continue
                if isinstance(v, (list, dict)) and not v and key not in ('lp', 'bbox'):
                    continue
                props[key] = v
            s = json.dumps({'type': 'Feature', 'properties': props, 'geometry': geom_json(ft['_g'])},
                           ensure_ascii=False, separators=(',', ':'))
            f.write(s + (',\n' if k < len(feats) - 1 else '\n'))
        f.write(']}\n')
    return os.path.getsize(path)


def finalize(feats, tag, out_path, ideal_bytes, cap_bytes, intervals, extra_parent_pool=None,
             log=print, min_interval_for_cap=60, tiered=True, tier_fn=None, area_key='area'):
    """feats: list of dicts with props + '_g' (4326, cleaned). 'area' must be set.
    Simplifies with mapshaper over increasing intervals (metres). Stops at the first interval
    whose output is <= ideal_bytes, or (once interval >= min_interval_for_cap) <= cap_bytes.
    Then computes lp, bbox, parent (pool = these feats + extra_parent_pool) and writes."""
    ids = [f['id'] for f in feats]
    geoms = [f['_g'] for f in feats]
    areas = [f.get('_area_for_tier', f[area_key]) for f in feats]
    chosen = None
    for iv in intervals:
        simp = simplify_with_mapshaper(geoms, ids, tag, iv, areas=areas, tiered=tiered, tier_fn=tier_fn)
        out = []
        for f in feats:
            g = simp.get(f['id'])
            if g is None:
                log(f'  WARN {f["id"]}: empty after simplification, keeping rounded original')
                g = polys_only(shapely.set_precision(shapely.make_valid(f['_g']), 1e-4))
                if g is None or g.is_empty:
                    continue
            nf = dict(f)
            nf['_g'] = g
            nf['lp'] = [0.0, 0.0]
            nf['bbox'] = [0.0, 0.0, 0.0, 0.0]
            nf['parent'] = 'x' * 20
            out.append(nf)
        size = write_fc(out_path, out)
        log(f'  {tag}: interval={iv} m -> {len(out)} features, ~{size/1e6:.2f} MB')
        chosen = (out, iv)
        if size <= ideal_bytes or (iv >= min_interval_for_cap and size <= cap_bytes):
            break
    out, iv = chosen
    for nf in out:
        b = nf['_g'].bounds
        nf['bbox'] = [round(b[0], 4), round(b[1], 4), round(b[2], 4), round(b[3], 4)]
        nf['lp'] = label_point(nf['_g'])
    pool = out + (extra_parent_pool or [])
    par = compute_parents(pool)
    for nf, p in zip(out, par[:len(out)]):
        nf['parent'] = p
    size = write_fc(out_path, out)
    log(f'  {tag}: wrote {out_path} interval={iv} m, {len(out)} features, {size/1e6:.2f} MB')
    return out, iv, size
