# Line tracer for delimitations described by roads, streams and comune borders (T03).
# A zone is a list of waypoints joined by legs; each leg follows OSM ways (preferred names/refs, with the rest of
# the network as a costly fallback to bridge gaps), a comune border, a stream, or a straight line.
import re, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import numpy as np
import shapely
import networkx as nx
from shapely.geometry import LineString, Point
from shapely.strtree import STRtree


class Data:
    def __init__(self, area_keys, areas):
        seen = set()
        self.ways = []   # (tags, line3035, kind)
        self.places = []
        for k in area_keys:
            js = C.area_data(areas[k])
            for e in js['elements']:
                key = (e['type'], e['id'])
                if key in seen:
                    continue
                seen.add(key)
                t = e.get('tags', {})
                if e['type'] == 'way' and 'geometry' in e:
                    kind = next((x for x in ('highway', 'waterway', 'railway', 'power') if x in t), None)
                    if kind:
                        ls = C.to3035(LineString([(p['lon'], p['lat']) for p in e['geometry']]))
                        self.ways.append((t, ls, kind))
                        continue
                if 'name' in t:
                    if e['type'] == 'node':
                        lon, lat = e['lon'], e['lat']
                    elif e.get('center'):
                        lon, lat = e['center']['lon'], e['center']['lat']
                    else:
                        continue
                    self.places.append((t['name'], t, C.P(lon, lat)))
        self.tree = STRtree([w[1] for w in self.ways])

    def sel(self, regex, kind='highway', keys=('name', 'ref', 'old_ref', 'alt_name', 'official_name'), near=None, dist=None):
        r = re.compile(regex, re.I)
        out = []
        for t, g, k in self.ways:
            if kind and k != kind:
                continue
            if any(r.search(t.get(x, '')) for x in keys):
                if near is not None and dist and g.distance(near) > dist:
                    continue
                out.append(g)
        if not out:
            raise KeyError(f'no {kind} {regex}')
        return shapely.union_all(out)

    def place(self, regex, near=None, kinds=None):
        r = re.compile(regex, re.I)
        hits = [x for x in self.places if r.search(x[0]) and (kinds is None or any(k in x[1] for k in kinds))]
        if not hits:
            raise KeyError('place ' + regex)
        if near is not None:
            hits.sort(key=lambda x: x[2].distance(near))
        elif len(hits) > 1:
            pl = [h for h in hits if 'place' in h[1]]
            hits = pl or hits
        return hits[0][2]

    def network(self, a, b, pad=2500, kinds=('highway',)):
        env = shapely.box(min(a.x, b.x) - pad, min(a.y, b.y) - pad, max(a.x, b.x) + pad, max(a.y, b.y) + pad)
        idx = self.tree.query(env)
        return [self.ways[i] for i in idx if self.ways[i][2] in kinds]


def _graph(lines_w, step=20):
    G = nx.Graph()
    def key(c):
        return (round(c[0], 0), round(c[1], 0))
    geoms = [g for g, _ in lines_w]
    ws = np.array([w for _, w in lines_w])
    tree = STRtree(geoms)
    noded = shapely.union_all([shapely.segmentize(g, step) for g in geoms])
    for s in getattr(noded, 'geoms', [noded]):
        if s.geom_type != 'LineString':
            continue
        cs = list(s.coords)
        for i in range(len(cs) - 1):
            mid = Point((cs[i][0] + cs[i + 1][0]) / 2, (cs[i][1] + cs[i + 1][1]) / 2)
            hit = tree.query(mid, predicate='dwithin', distance=0.5)
            w = float(ws[hit].min()) if len(hit) else 8.0
            d = Point(cs[i]).distance(Point(cs[i + 1]))
            G.add_edge(key(cs[i]), key(cs[i + 1]), w=d * w)
    return G


def follow(pref_lines, a, b, data=None, fallback_w=6.0, kinds=('highway',), pad=1500):
    """Path from a to b preferring pref_lines (weight 1), other network ways (weight fallback_w) and, as a last
    resort, straight hops (weight 20) between near nodes."""
    lw = [(pref_lines, 1.0)]
    if data is not None:
        for t, g, k in data.network(a, b, pad=pad, kinds=kinds):
            lw.append((g, fallback_w))
    G = _graph(lw)
    nodes = np.array(list(G.nodes))
    def near(p):
        d = (nodes[:, 0] - p.x) ** 2 + (nodes[:, 1] - p.y) ** 2
        n = nodes[int(np.argmin(d))]
        return (float(n[0]), float(n[1]))
    ka, kb = near(a), near(b)
    # straight hops between components
    comps = list(nx.connected_components(G))
    if len(comps) > 1:
        ca = next(c for c in comps if ka in c)
        if kb not in ca:
            # connect components greedily with straight hops
            arr = {i: np.array(list(c)) for i, c in enumerate(comps)}
            for i in arr:
                for j in arr:
                    if j <= i:
                        continue
                    A, B = arr[i][::5], arr[j][::5]
                    if len(A) * len(B) > 4e6:
                        continue
                    d = ((A[:, None, :] - B[None, :, :]) ** 2).sum(-1)
                    ii, jj = np.unravel_index(np.argmin(d), d.shape)
                    if d[ii, jj] < 400 ** 2:
                        G.add_edge(tuple(A[ii]), tuple(B[jj]), w=np.sqrt(d[ii, jj]) * 20)
    try:
        path = nx.shortest_path(G, ka, kb, weight='w')
    except nx.NetworkXNoPath:
        path = [ka, kb]
    path = [(a.x, a.y)] + list(path) + [(b.x, b.y)]
    return LineString(path)


def border_path(geoms, a, b, via=None):
    """Follow the boundary of a polygon (or the shared boundary of polygons) from a to b; via picks the side."""
    if isinstance(geoms, (list, tuple)):
        line = shapely.union_all([g.boundary for g in geoms])
    else:
        line = geoms.boundary if geoms.geom_type in ('Polygon', 'MultiPolygon') else geoms
    if via is None:
        return C.path_along(line, a, b)
    return shapely.union_all([C.path_along(line, a, via), C.path_along(line, via, b)])


def chain(legs):
    """Concatenate legs (each a LineString, oriented a->b) and polygonize."""
    cs = []
    for l in legs:
        if l.geom_type == 'MultiLineString':
            l = shapely.ops.linemerge(l)
            if l.geom_type == 'MultiLineString':
                l = LineString([c for g in l.geoms for c in g.coords])
        cs += list(l.coords)
    cs.append(cs[0])
    ring = LineString(cs)
    noded = shapely.union_all([ring])
    faces = list(shapely.polygonize([noded]).geoms)
    if not faces:
        raise ValueError('no faces')
    return shapely.union_all(faces)
