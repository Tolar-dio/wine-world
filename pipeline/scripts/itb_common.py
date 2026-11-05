# Helpers for the Italy boundary jobs T03/T04/T05 (Vitis Mundi, Nov 2026).
# Run scripts with python3 -I; downloads live under raw/italy-bounds/<source>/ (untrusted data, parsed, never executed).
import gzip, hashlib, json, os, re, subprocess, sys, time, urllib.parse
sys.path.insert(0, '/home/claude/winesite/scripts')
import numpy as np
import shapely
from shapely.geometry import LineString, MultiLineString, Point, Polygon, MultiPolygon, box, shape, mapping
from shapely.ops import linemerge, substring, nearest_points
from pyproj import Transformer

ROOT = '/home/claude/winesite'
RAWB = ROOT + '/raw/italy-bounds'
GEO = ROOT + '/site/data/geo'
WORKB = ROOT + '/work/italy-bounds'
os.makedirs(WORKB, exist_ok=True)
UA = 'VitisMundiResearch/1.0 (+https://vitismundi.app/)'
T43 = Transformer.from_crs(4326, 3035, always_xy=True)
T34 = Transformer.from_crs(3035, 4326, always_xy=True)
_TI = Transformer.from_crs(32632, 3035, always_xy=True)


def to3035(g):
    return shapely.transform(g, lambda a: np.column_stack(T43.transform(a[:, 0], a[:, 1])))


def to4326(g):
    return shapely.transform(g, lambda a: np.column_stack(T34.transform(a[:, 0], a[:, 1])))


def P(lon, lat):
    """Point in EPSG:3035 from lon/lat."""
    x, y = T43.transform(lon, lat)
    return Point(x, y)


# ---------------------------------------------------------------- ISTAT comuni (CC BY 3.0 IT), 1 Jan 2026
_COM = None


def comuni():
    global _COM
    if _COM is None:
        import geopandas as gpd
        g = gpd.read_file(RAWB + '/istat2026/Com01012026/Com01012026_WGS84.shp', encoding='utf-8')
        g = g.to_crs(3035)
        g['key'] = g['COMUNE'].map(norm)
        _COM = g
    return _COM


def norm(s):
    import unicodedata
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]', '', s)


def comune(name, prov=None):
    g = comuni()
    m = g[g['key'] == norm(name)]
    if prov is not None and len(m) > 1:
        m = m[m['COD_PROV'] == prov]
    if len(m) != 1:
        raise KeyError(f'comune {name!r}: {len(m)} matches')
    return shapely.make_valid(m.geometry.iloc[0])


def comuni_union(names):
    return shapely.union_all([comune(n) for n in names])


# ---------------------------------------------------------------- OSM Overpass (ODbL), cached
OVP = RAWB + '/overpass'
ENDPOINTS = ['https://maps.mail.ru/osm/tools/overpass/api/interpreter', 'https://overpass-api.de/api/interpreter']


def overpass(q, timeout=240):
    os.makedirs(OVP, exist_ok=True)
    fn = os.path.join(OVP, hashlib.md5(q.encode()).hexdigest()[:16] + '.json')
    if os.path.exists(fn) and os.path.getsize(fn) > 30:
        return json.load(open(fn))
    data = urllib.parse.urlencode({'data': q})
    last = ''
    for i in range(8):
        ep = ENDPOINTS[0] if i < 7 else ENDPOINTS[1]
        r = subprocess.run(['curl', '-sS', '-m', str(timeout), '-A', UA, '--data-binary', data, '-o', fn + '.part',
                            '-w', '%{http_code}', ep], capture_output=True, text=True)
        if r.returncode == 0 and r.stdout.strip() == '200':
            try:
                js = json.load(open(fn + '.part'))
                os.replace(fn + '.part', fn)
                return js
            except Exception as e:
                last = str(e)
        else:
            last = r.stdout + r.stderr[:200]
        time.sleep(4 + 4 * i)
    raise RuntimeError('overpass failed ' + last)


def bbox_str(b):
    """b = (w,s,e,n) lon/lat -> overpass (s,w,n,e)"""
    return f'{b[1]},{b[0]},{b[3]},{b[2]}'


_AREA = {}


def area_data(b):
    """One Overpass query per bbox: named/ref'd highways, waterways, railways, power lines (with geometry) and named
    places (centres)."""
    k = tuple(round(x, 4) for x in b)
    if k not in _AREA:
        bs = bbox_str(b)
        q = (f'[out:json][timeout:600];(way[highway]({bs});way[waterway]({bs});way[railway]({bs});'
             f'way[power=line]({bs}););out geom tags;'
             f'(node[name]({bs});way[name][!highway][!waterway]({bs}););out center tags;')
        _AREA[k] = overpass(q, timeout=700)
    return _AREA[k]


def ways(b, sel, regex=None, key='name'):
    """Lines (3035) of OSM ways in bbox b. sel: 'highway'|'waterway'|'railway'|'power'; regex on tag `key`."""
    js = area_data(b)
    r = re.compile(regex, re.I) if regex else None
    out = []
    for e in js['elements']:
        if e['type'] != 'way' or 'geometry' not in e:
            continue
        t = e.get('tags', {})
        if sel not in t:
            continue
        if r and not r.search(t.get(key, '')):
            continue
        ls = LineString([(p['lon'], p['lat']) for p in e['geometry']])
        out.append((t, to3035(ls)))
    return out


def lines(b, sel, regex=None, key='name'):
    w = ways(b, sel, regex, key)
    if not w:
        raise KeyError(f'no {sel} {regex}')
    return shapely.union_all([g for _, g in w])


def places(b):
    """All named nodes and non-road way centres in bbox: [(name, tags, Point3035)]."""
    js = area_data(b)
    out = []
    for e in js['elements']:
        t = e.get('tags', {})
        if 'name' not in t or 'highway' in t and e['type'] == 'way' or 'geometry' in e:
            continue
        if e['type'] == 'node':
            lon, lat = e['lon'], e['lat']
        else:
            c = e.get('center')
            if not c:
                continue
            lon, lat = c['lon'], c['lat']
        out.append((t['name'], t, P(lon, lat)))
    return out


def find_place(pl, regex, near=None):
    r = re.compile(regex, re.I)
    hits = [x for x in pl if r.search(x[0])]
    if not hits:
        raise KeyError('place ' + regex)
    if near is not None:
        hits.sort(key=lambda x: x[2].distance(near))
    return hits[0][2]


def junction(la, lb, near=None):
    """Intersection point of two line sets (3035); nearest to `near` if several."""
    x = la.intersection(lb)
    pts = []
    for g in getattr(x, 'geoms', [x]):
        if g.is_empty:
            continue
        pts.append(g if g.geom_type == 'Point' else g.representative_point())
    if not pts:
        # closest approach
        a, bb = nearest_points(la, lb)
        return Point((a.x + bb.x) / 2, (a.y + bb.y) / 2)
    if near is not None:
        pts.sort(key=lambda p: p.distance(near))
    return pts[0]


# ---------------------------------------------------------------- path along a line network
def path_along(net, a, b, step=15):
    """Shortest path along the line network `net` (3035 lines/polygons) between the vertices nearest to a and b."""
    import networkx as nx
    segs = []
    def add(g):
        if g.is_empty:
            return
        if g.geom_type == 'LineString':
            segs.append(g)
        elif g.geom_type in ('Polygon',):
            segs.extend(LineString(r.coords) for r in [g.exterior, *g.interiors])
        elif hasattr(g, 'geoms'):
            for x in g.geoms:
                add(x)
    add(net)
    allg = shapely.segmentize(shapely.union_all(segs), step)
    G = nx.Graph()
    def key(c):
        return (round(c[0], 1), round(c[1], 1))
    for s in getattr(allg, 'geoms', [allg]):
        cs = list(s.coords)
        for i in range(len(cs) - 1):
            G.add_edge(key(cs[i]), key(cs[i + 1]), w=Point(cs[i]).distance(Point(cs[i + 1])))
    nodes = np.array(list(G.nodes))
    def near(p):
        d = (nodes[:, 0] - p.x) ** 2 + (nodes[:, 1] - p.y) ** 2
        n = nodes[int(np.argmin(d))]
        return (float(n[0]), float(n[1]))
    ka, kb = near(a), near(b)
    try:
        path = nx.shortest_path(G, ka, kb, weight='w')
    except nx.NetworkXNoPath:
        return LineString([ka, kb])
    if len(path) < 2:
        return LineString([ka, (kb[0] + 0.1, kb[1])])
    return LineString(path)


# ---------------------------------------------------------------- OSRM routing (OSM data, ODbL), cached
OSRM = RAWB + '/osrm'


def route(pts):
    """Road route (3035 LineString) through 3035 points pts, from the public OSRM demo server (driving)."""
    os.makedirs(OSRM, exist_ok=True)
    ll = [T34.transform(p.x, p.y) for p in pts]
    coords = ';'.join(f'{x:.6f},{y:.6f}' for x, y in ll)
    url = f'https://router.project-osrm.org/route/v1/driving/{coords}?overview=full&geometries=geojson'
    fn = os.path.join(OSRM, hashlib.md5(url.encode()).hexdigest()[:16] + '.json')
    if not (os.path.exists(fn) and os.path.getsize(fn) > 30):
        for i in range(5):
            r = subprocess.run(['curl', '-sS', '-m', '60', '-A', UA, '-o', fn, '-w', '%{http_code}', url],
                               capture_output=True, text=True)
            if r.stdout.strip() == '200':
                break
            time.sleep(2 + 3 * i)
        time.sleep(1.0)
    js = json.load(open(fn))
    if js.get('code') != 'Ok':
        raise RuntimeError('osrm ' + str(js)[:200])
    return to3035(LineString(js['routes'][0]['geometry']['coordinates']))


def ring_polygon(legs):
    """Polygon from a list of 3035 lines forming a (roughly) closed loop: node, polygonize, union all faces."""
    cs = []
    for l in legs:
        c = list(l.coords)
        if cs and Point(cs[-1]).distance(Point(c[0])) > Point(cs[-1]).distance(Point(c[-1])) and len(c) > 1 \
                and Point(cs[-1]).distance(Point(c[-1])) < Point(cs[-1]).distance(Point(c[0])):
            c = c[::-1]
        cs += c
    cs.append(cs[0])
    ls = LineString(cs)
    noded = shapely.union_all([ls])
    faces = list(shapely.polygonize([noded]).geoms)
    if not faces:
        return None
    return shapely.union_all(faces)


def split_side(poly, line, keep_pt):
    """Split poly with line (extended) and keep the part(s) on the side of keep_pt."""
    from shapely.ops import split
    parts = split(poly, line)
    keep = [p for p in parts.geoms if p.distance(keep_pt) < 1]
    if not keep:
        keep = [min(parts.geoms, key=lambda p: p.distance(keep_pt))]
    return shapely.union_all(keep)


def largest(g):
    ps = list(getattr(g, 'geoms', [g]))
    ps = [p for p in ps if p.geom_type == 'Polygon']
    return max(ps, key=lambda p: p.area)


def clean(g, min_part=20000, min_hole=20000):
    g = shapely.make_valid(g)
    ps = []
    for p in getattr(g, 'geoms', [g]):
        if p.geom_type == 'Polygon':
            ps.append(p)
        elif p.geom_type == 'MultiPolygon':
            ps += list(p.geoms)
    big = max(p.area for p in ps)
    out = []
    for p in ps:
        if p.area < min_part and p.area < big:
            continue
        out.append(Polygon(p.exterior, [r for r in p.interiors if Polygon(r).area >= min_hole]))
    return shapely.union_all(out)
