# Shared zone-building helpers for T03 (same as in itb_t03_romagna.py, on a Data object chosen by init()).
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_trace as T
from itb_areas import AREAS
import shapely
from shapely.geometry import LineString, Point

D = None
Z = {}


def init(keys):
    global D
    D = T.Data(keys, AREAS)
    return D




def S(regex, kind='highway', **kw):
    return D.sel(regex, kind, **kw)


def J(ra, rb, near=None, ka='highway', kb='highway'):
    if isinstance(near, str):
        near = PL(near)
    return C.junction(S(ra, ka), S(rb, kb), near)


def PL(regex, near=None):
    if isinstance(near, str):
        near = D.place(near)
    return D.place(regex, near, kinds=('place',)) if not regex.startswith('*') else D.place(regex[1:], near)


def F(regex, a, b, kind='highway', fb=6.0):
    pref = S(regex, kind) if regex else shapely.geometry.LineString([(a.x, a.y), (b.x, b.y)])
    return T.follow(pref, a, b, D, fallback_w=fb if regex else 1.0)


def W(regex, a, b):
    return T.follow(S(regex, 'waterway'), a, b, D, fallback_w=10.0, kinds=('waterway',))


def L(a, b):
    return LineString([(a.x, a.y), (b.x, b.y)])


def BD(names, a, b, via=None):
    """Follow comune border(s)."""
    gs = [C.comune(n) for n in names]
    if len(gs) == 2:
        line = gs[0].boundary.intersection(gs[1].buffer(30))
        line = shapely.union_all([line])
        if line.length < 10:
            line = gs[0].boundary
    else:
        line = shapely.union_all([g.boundary for g in gs])
    if via is None:
        return C.path_along(line, a, b)
    return shapely.union_all([C.path_along(line, a, via), C.path_along(line, via, b)])


def below(poly, line_regex, keep_near, ext=3000, ends=None):
    """Cut poly with an (extended) OSM line and keep the side containing keep_near. ends=(a, b): make the line
    continuous from a to b (bridging gaps through the road network) and extend it 3 km past both ends."""
    ln = S(line_regex)
    if ends is not None:
        a, b = ends
        cl = T.follow(ln, a, b, D, fallback_w=4.0, pad=1500)
        cs = list(cl.coords)
        def ext_pt(p, q):
            import math
            dx, dy = p[0] - q[0], p[1] - q[1]; d = math.hypot(dx, dy) or 1
            return (p[0] + dx / d * ext, p[1] + dy / d * ext)
        far = [cs[min(len(cs) - 1, 20)], cs[max(0, len(cs) - 21)]]
        cs = [ext_pt(cs[0], far[0])] + cs + [ext_pt(cs[-1], far[1])]
        ln = LineString(cs)
    ln = shapely.ops.linemerge(ln) if ln.geom_type == 'MultiLineString' else ln
    # polygonize poly boundary + line
    faces = shapely.polygonize([shapely.union_all([poly.boundary, ln])]).geoms
    keep = [f for f in faces if f.representative_point().within(poly)]
    # flood from keep_near: faces connected without crossing the line
    lnb = ln.buffer(2)
    start = min(keep, key=lambda f: f.distance(keep_near))
    out = [start]
    rest = [f for f in keep if f is not start]
    changed = True
    while changed:
        changed = False
        u = shapely.union_all(out)
        for f in list(rest):
            sh = f.boundary.intersection(u.boundary)
            if sh.length > 5 and sh.difference(lnb).length > 5:
                out.append(f); rest.remove(f); changed = True
    return shapely.union_all(out)


_PROV = None


def prov(name):
    global _PROV
    if _PROV is None:
        import geopandas as gpd
        _PROV = gpd.read_file(C.RAWB + '/istat2026/ProvCM01012026/ProvCM01012026_WGS84.shp', encoding='utf-8').to_crs(3035)
    return shapely.make_valid(_PROV[_PROV.DEN_UTS == name].geometry.iloc[0])


def shared(ga, gb):
    line = ga.boundary.intersection(gb.buffer(40))
    return shapely.union_all([line])


def LL(lon, lat):
    return C.P(lon, lat)


def loop(spec):
    """spec: [(point, leg), ...]; leg joins point i to point i+1 (last joins back to first).
    leg: ('r', regex|None) road, ('w', regex) stream, ('b', geomA, geomB) shared border, ('l',) straight."""
    legs = []
    n = len(spec)
    for i, (p, leg) in enumerate(spec):
        q = spec[(i + 1) % n][0]
        k = leg[0]
        if k == 'r':
            legs.append(F(leg[1], p, q) if leg[1] else T.follow(L(p, q), p, q, D, fallback_w=1.0))
        elif k == 'w':
            legs.append(W(leg[1], p, q))
        elif k == 'b':
            legs.append(C.path_along(shared(leg[1], leg[2]), p, q))
        elif k == 'bb':      # boundary of one polygon
            legs.append(C.path_along(leg[1].boundary, p, q))
        else:
            legs.append(L(p, q))
    return T.chain(legs)


def JB(regex, ga, gb, near=None):
    return C.junction(S(regex), shared(ga, gb), near)


