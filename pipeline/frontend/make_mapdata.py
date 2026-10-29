#!/usr/bin/env python3
"""Precompute front-end map data for the Pages build (v2):

  site/data/map/cover.json     simplified coverage polygons of the national imagery and topo services, used by the
                               page to request a national tile only where it intersects its country (or state) and to
                               clip it to the border (outside, the services return white, blank or 404 tiles).
  site/data/map/journeys.json  river fly-throughs: a smoothed route along site/data/base/rivers.geojson, with the
                               appellations (main polygons and fine units) and towns passed on the way, by distance.

Inputs: site/data/base/{countries,rivers,places}.geojson, site/data/geo/*.geojson, Natural Earth 10m admin-1 states
(raw/ne_10m, public domain) for the German states and New South Wales.
Run: python3 -I /home/claude/winesite/frontend/make_mapdata.py
"""
import heapq
import json
import math
from pathlib import Path

import shapefile  # pyshp
from shapely.geometry import LineString, MultiPolygon, Point, Polygon, box, mapping, shape
import shapely
from shapely.ops import unary_union
from shapely.strtree import STRtree

ROOT = Path("/home/claude/winesite")
SITE = ROOT / "site"
OUT = SITE / "data" / "map"
NE_A1 = ROOT / "raw/ne_10m/ne_10m_admin_1_states_provinces/ne_10m_admin_1_states_provinces.shp"


def rnd(geom, nd=4):
    def r(c):
        return [round(c[0], nd), round(c[1], nd)]
    polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
    out = []
    for p in polys:
        if p.is_empty or p.area < 2e-4:
            continue
        rings = [[r(c) for c in p.exterior.coords]] + [[r(c) for c in i.coords] for i in p.interiors if Polygon(i).area > 1e-5]
        out.append(rings)
    return out


# ---------------------------------------------------------------- coverage
COUNTRY_COVER = {
    # key: (iso2 list, optional clip bbox [w, s, e, n])
    "fr": (["fr"], [-5.5, 41.2, 9.8, 51.2]),          # metropolitan France + Corsica (IGN ortho and Plan IGN)
    "ch": (["ch", "li"], None),                        # swisstopo covers Liechtenstein too
    "at": (["at"], None),
    "es": (["es"], None),                              # PNOA / MTN incl. Balearics and Canaries
    "pt": (["pt"], [-10.2, 36.7, -5.9, 42.3]),          # DGT Ortos 2021: mainland only
    "us": (["us"], None),
    "lu": (["lu"], None),
}
STATE_COVER = {
    "de-rp": ("DEU", "Rheinland-Pfalz"),
    "de-he": ("DEU", "Hessen"),
    "de-bw": ("DEU", "Baden-Württemberg"),
    "de-by": ("DEU", "Bayern"),
    "au-nsw": ("AUS", "New South Wales"),
}


def build_cover():
    fc = json.loads((SITE / "data/base/countries.geojson").read_text())
    by = {}
    for f in fc["features"]:
        iso = (f["properties"].get("iso2") or "").lower()
        if iso:
            by.setdefault(iso, []).append(shape(f["geometry"]))
    out = {}
    for key, (isos, clip) in COUNTRY_COVER.items():
        g = unary_union([x for i in isos for x in by.get(i, [])])
        if clip:
            g = g.intersection(box(*clip))
        if key == "us":   # USGS imagery: the conterminous states, Alaska and Hawaii; drop the small islands
            g = MultiPolygon([q for q in g.geoms if q.area > 0.3])
        g = g.buffer(0.005).simplify(0.03 if key == "us" else 0.008, preserve_topology=True)
        out[key] = {"bbox": [round(v, 3) for v in g.bounds], "poly": rnd(g, 3)}
    r = shapefile.Reader(str(NE_A1), encoding="utf-8")
    fields = [f[0] for f in r.fields[1:]]
    for rec, shp in zip(r.records(), r.shapes()):
        d = dict(zip(fields, rec))
        for key, (adm, name) in STATE_COVER.items():
            if d.get("adm0_a3") == adm and d.get("name") == name:
                g = shape(shp.__geo_interface__)
                g = (g if g.geom_type == "Polygon" else MultiPolygon([q for q in g.geoms if q.area > 0.01])).buffer(0.005).simplify(0.008, preserve_topology=True)
                out[key] = {"bbox": [round(v, 3) for v in g.bounds], "poly": rnd(g, 3)}
    missing = [k for k in list(COUNTRY_COVER) + list(STATE_COVER) if k not in out]
    if missing:
        raise SystemExit(f"cover: missing {missing}")
    return out


# ---------------------------------------------------------------- journeys
JOURNEYS = [
    {"id": "mosel", "title": "The Mosel, Trier to Koblenz", "river": "Mosel", "rivers": ["Mosel"],
     "from": [6.64, 49.76], "to": [7.60, 50.36], "iso": ["de"], "zoom": 12.4,
     "text": "Some 200 km of meanders cut into Devonian slate, where Europe's steepest vineyards lean south over the water: the amphitheatre of Piesport, the Doctor above Bernkastel, Wehlen's sundial, Erden's red-slate Prälat and the walled terraces of the Terrassenmosel before Koblenz."},
    {"id": "douro", "title": "The Douro, Barca d'Alva to Porto", "river": "Douro", "rivers": ["Douro/Duero"],
     "from": [-6.97, 41.03], "to": [-8.62, 41.14], "iso": ["pt"], "zoom": 12.2,
     "text": "Downstream from the dry schist of the Douro Superior, through the Pinhão terraces of the Cima Corgo and the greener Baixo Corgo, to the lodges of Vila Nova de Gaia, where Port rests in casks across the river from Porto."},
    {"id": "rhone", "title": "The Rhône, Vienne to Avignon", "river": "Rhône", "rivers": ["Rhône"],
     "from": [4.87, 45.52], "to": [4.81, 43.95], "iso": ["fr"], "zoom": 12.0,
     "text": "Granite first: Côte-Rôtie and Condrieu on the right bank, then the Hermitage hill above Tain. South of Valence the valley opens, the mistral takes over, and the river runs past Lirac and Tavel to the galets of Châteauneuf-du-Pape."},
    {"id": "loire", "title": "The Loire, Sancerre to Nantes", "river": "Loire", "rivers": ["Loire"],
     "from": [2.87, 47.33], "to": [-1.55, 47.21], "iso": ["fr"], "zoom": 11.8,
     "text": "Flint and chalk around Sancerre and Pouilly, the tuffeau caves of Vouvray and Montlouis, Chinon and Bourgueil on the Vienne's edge, the schist of Savennières and the Layon, then the Muscadet country on the last stretch to the Atlantic."},
    {"id": "rheingau", "title": "The Rhine through the Rheingau", "river": "Rhine", "rivers": ["Rhine"],
     "from": [8.27, 50.00], "to": [7.79, 50.06], "iso": ["de"], "zoom": 12.6,
     "text": "For 30 km the Rhine flows west, so the Rheingau's slopes face south over a broad river that reflects the sun and softens frost: Eltville, Erbach, Johannisberg and Rüdesheim, until the river turns north into the gorge at Lorch."},
    {"id": "wachau", "title": "The Danube through the Wachau", "river": "Danube", "rivers": ["Danube"],
     "from": [15.33, 48.23], "to": [15.60, 48.40], "iso": ["at"], "zoom": 13.0,
     "text": "Melk to Krems through a narrow cut in the Bohemian Massif: dry-stone terraces of gneiss and loess at Spitz, Weissenkirchen, Dürnstein and Loiben, home of Smaragd Grüner Veltliner and Riesling, with the Kremstal waiting at the valley mouth."},
    {"id": "gironde", "title": "Garonne and Gironde, Langon to Saint-Estèphe", "river": "Garonne", "rivers": ["Garonne", "Gironde"],
     "from": [-0.25, 44.55], "to": [-0.77, 45.27], "iso": ["fr"], "zoom": 12.0, "join": 18,
     "text": "Past the cold Ciron that brings autumn mists to Barsac and Sauternes, down through Bordeaux, then along the Gironde estuary where the gravel croupes of Margaux, Saint-Julien, Pauillac and Saint-Estèphe look out over the water."},
    {"id": "dordogne", "title": "The Dordogne, Castillon to Bourg", "river": "Dordogne", "rivers": ["Dordogne", "Gironde"],
     "from": [-0.04, 44.85], "to": [-0.56, 45.04], "iso": ["fr"], "zoom": 12.2, "join": 13,
     "text": "The right bank: Castillon's slopes, the limestone plateau and clay of Saint-Émilion, Pomerol's iron-rich gravel behind Libourne, the hills of Fronsac, and the Côtes de Bourg where the Dordogne meets the Garonne."},
    {"id": "napa", "title": "The Napa Valley floor, Calistoga to Napa", "river": "Napa River", "rivers": ["Napa River"],
     "from": [-122.58, 38.58], "to": [-122.28, 38.29], "iso": ["us"], "zoom": 12.4,
     "text": "Down the valley from volcanic Calistoga to the fog-cooled south: St. Helena, the Rutherford bench, Oakville and Yountville, then Oak Knoll and the town of Napa, with the Mayacamas to the west and the Vaca range to the east."},
]


class Local:
    """local equirectangular projection in km around a reference latitude"""

    def __init__(self, lat0):
        self.kx = 111.32 * math.cos(math.radians(lat0))
        self.ky = 110.57

    def fwd(self, x, y, z=None):
        return (x * self.kx, y * self.ky)

    def inv(self, x, y, z=None):
        return (x / self.kx, y / self.ky)


def river_graph(feats, P, join=1.5):
    """undirected graph of river vertices (km coordinates), joining line ends that lie within 1.5 km"""
    nodes, adj = [], {}
    index = {}

    def node(pt):
        k = (round(pt[0], 3), round(pt[1], 3))
        if k not in index:
            index[k] = len(nodes)
            nodes.append(k)
            adj[index[k]] = []
        return index[k]

    ends = []
    for g in feats:
        lines = [g] if g.geom_type == "LineString" else list(g.geoms)
        for ln in lines:
            cs = [P.fwd(*c[:2]) for c in ln.coords]
            prev = None
            for c in cs:
                n = node(c)
                if prev is not None and prev != n:
                    d = math.dist(nodes[prev], nodes[n])
                    adj[prev].append((n, d))
                    adj[n].append((prev, d))
                prev = n
            ends += [node(cs[0]), node(cs[-1])]
    # join nearly touching pieces (NE splits rivers at confluences and lakes)
    for i, a in enumerate(ends):
        for b in ends[i + 1:]:
            if a != b:
                d = math.dist(nodes[a], nodes[b])
                if d < join:
                    adj[a].append((b, d))
                    adj[b].append((a, d))
    # also link every end to the nearest vertex of another line within 1.5 km (confluences mid-line)
    for a in set(ends):
        best = None
        for j, p in enumerate(nodes):
            if j == a:
                continue
            d = math.dist(nodes[a], p)
            if d < 4.0 and (best is None or d < best[1]) and not any(x[0] == j for x in adj[a]):
                best = (j, d)
        if best:
            adj[a].append(best)
            adj[best[0]].append((a, best[1]))
    return nodes, adj


def shortest(nodes, adj, s, t):
    dist = {s: 0.0}
    prev = {}
    h = [(0.0, s)]
    while h:
        d, u = heapq.heappop(h)
        if u == t:
            break
        if d > dist.get(u, 1e18):
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist.get(v, 1e18):
                dist[v] = nd
                prev[v] = u
                heapq.heappush(h, (nd, v))
    if t not in dist:
        return None
    path = [t]
    while path[-1] != s:
        path.append(prev[path[-1]])
    return [nodes[i] for i in reversed(path)]


def chaikin(pts, it=3):
    for _ in range(it):
        out = [pts[0]]
        for a, b in zip(pts, pts[1:]):
            out.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
            out.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
        out.append(pts[-1])
        pts = out
    return pts


def resample(pts, step):
    ln = LineString(pts)
    n = max(2, int(ln.length / step) + 1)
    return [ln.interpolate(i * ln.length / (n - 1)).coords[0] for i in range(n)], ln.length


def load_geo(isos):
    feats = []
    for iso in isos:
        for name, fine in ((f"{iso}.geojson", 0), (f"{iso}_fine.geojson", 1)):
            p = SITE / "data/geo" / name
            if not p.exists():
                continue
            for f in json.loads(p.read_text())["features"]:
                pr = f.get("properties") or {}
                if not pr.get("id") or not f.get("geometry"):
                    continue
                try:
                    g = shape(f["geometry"])
                except Exception:
                    continue
                if not g.is_valid:
                    g = g.buffer(0)
                feats.append((pr, g, fine))
    return feats


def build_journeys():
    rivers = json.loads((SITE / "data/base/rivers.geojson").read_text())["features"]
    places = json.loads((SITE / "data/base/places.geojson").read_text())["features"]
    sites_fc = json.loads((SITE / "data/geo/_sites.geojson").read_text())["features"]
    out = []
    geo_cache = {}
    for J in JOURNEYS:
        lat0 = (J["from"][1] + J["to"][1]) / 2
        P = Local(lat0)
        fs = [shape(f["geometry"]) for f in rivers if f["properties"].get("name") in J["rivers"]]
        nodes, adj = river_graph(fs, P, J.get("join", 1.5))
        a, b = P.fwd(*J["from"]), P.fwd(*J["to"])
        s = min(range(len(nodes)), key=lambda i: math.dist(nodes[i], a))
        t = min(range(len(nodes)), key=lambda i: math.dist(nodes[i], b))
        path = shortest(nodes, adj, s, t)
        if not path:
            raise SystemExit(f"journey {J['id']}: no path")
        smooth, length = resample(chaikin(path, 3), 0.25)
        line_km = LineString(smooth)
        # appellations passed: main polygons within 1.2 km of the route, fine units within 0.5 km
        key = tuple(J["iso"])
        if key not in geo_cache:
            geo_cache[key] = load_geo(J["iso"])
        feats = geo_cache[key]
        corridor = line_km.buffer(1.3)
        cand = []
        for pr, g, fine in feats:
            gk = shapely.transform(g, lambda a: a * [P.kx, P.ky])
            if not gk.intersects(corridor):
                continue
            cand.append((pr, gk, fine))
        tree = STRtree([c[1] for c in cand])
        hits = {}
        step = 0.25
        for i, pt in enumerate(smooth):
            p = Point(pt)
            for j in tree.query(p.buffer(1.2)):
                pr, gk, fine = cand[j]
                lim = 0.5 if fine else 1.2
                d = gk.distance(p)
                if d <= lim:
                    h = hits.setdefault(pr["id"], {"pr": pr, "fine": fine, "a": i * step, "b": i * step, "d": d})
                    h["b"] = i * step
                    h["d"] = min(h["d"], d)
        stops = []
        for id_, h in hits.items():
            pr = h["pr"]
            area = float(pr.get("area") or 0)
            stops.append({"id": id_, "name": pr.get("name"), "a": round(h["a"], 2), "b": round(h["b"], 2),
                          "area": round(area, 2), "fine": h["fine"], "prof": int(pr.get("prof") or 0),
                          "cat": pr.get("subcat") or pr.get("cat") or "", "style": pr.get("style") or "mixed"})
        stops.sort(key=lambda x: (x["a"], -x["area"]))
        # sites (quintas, châteaux, named vineyards) within 1 km
        sites = []
        for f in sites_fc:
            pr = f["properties"]
            if pr.get("country") not in J["iso"]:
                continue
            pk = Point(P.fwd(*f["geometry"]["coordinates"]))
            d = line_km.distance(pk)
            if d <= 1.0:
                sites.append({"id": pr["id"], "name": pr.get("name"), "km": round(line_km.project(pk), 2), "kind": pr.get("kind") or "",
                              "cls": pr.get("class") or ""})
        sites.sort(key=lambda x: x["km"])
        # towns within 2.5 km
        towns = []
        for f in places:
            c = f["geometry"]["coordinates"]
            pk = P.fwd(*c)
            if abs(pk[0] - smooth[0][0]) > length + 50 and abs(pk[0] - smooth[-1][0]) > length + 50:
                continue
            p = Point(pk)
            if line_km.distance(p) <= 2.5:
                towns.append({"name": f["properties"].get("name"), "km": round(line_km.project(p), 2),
                              "w": 1 if f["properties"].get("wine") in (1, True, "1") else 0,
                              "rk": f["properties"].get("rank", f["properties"].get("scalerank", 7))})
        towns.sort(key=lambda x: x["km"])
        coords = [[round(x, 5) for x in P.inv(*pt)] for pt in smooth]
        lons = [c[0] for c in coords]
        lats = [c[1] for c in coords]
        out.append({"id": J["id"], "title": J["title"], "river": J["river"], "text": J["text"], "iso": J["iso"],
                    "zoom": J["zoom"], "km": round(length, 1), "step": step,
                    "bbox": [min(lons), min(lats), max(lons), max(lats)],
                    "line": coords, "stops": stops, "sites": sites, "towns": towns})
        print(f"journey {J['id']}: {length:.0f} km, {len(coords)} points, {len(stops)} appellations "
              f"({sum(1 for x in stops if x['fine'])} fine), {len(sites)} sites, {len(towns)} towns")
    return out


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    cover = build_cover()
    (OUT / "cover.json").write_text(json.dumps(cover, separators=(",", ":")), encoding="utf-8")
    print(f"cover.json: {len(cover)} areas, {(OUT / 'cover.json').stat().st_size / 1024:.0f} KB")
    jr = build_journeys()
    (OUT / "journeys.json").write_text(json.dumps({"journeys": jr}, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")
    print(f"journeys.json: {(OUT / 'journeys.json').stat().st_size / 1024:.0f} KB")
