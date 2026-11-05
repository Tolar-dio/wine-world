# T03: Verdicchio dei Castelli di Jesi Classico = the DOC zone (art. 3) without the land on the left of the Misa and
# without the comuni of Ostra and Senigallia. The DOC zone here is the atlas polygon of it-verdicchio-dei-castelli-di-jesi
# (EU commune union, bq commune); the Misa is the OSM waterway (ODbL).
import json, sys, math
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import shapely
from shapely.geometry import shape, LineString

fc = json.load(open(C.GEO + '/it.geojson'))
par = next(C.to3035(shapely.make_valid(shape(f['geometry']))) for f in fc['features']
           if f['properties']['id'] == 'it-verdicchio-dei-castelli-di-jesi')
js = C.overpass('[out:json][timeout:180];way[waterway][name~"^(Fiume )?Misa$",i](43.40,12.80,43.75,13.25);out geom tags;')
ls = [C.to3035(LineString([(p['lon'], p['lat']) for p in e['geometry']])) for e in js['elements'] if 'geometry' in e]
print('misa ways', len(ls), [e['tags'].get('name') for e in js['elements']][:5])
misa = shapely.ops.linemerge(shapely.union_all(ls))
if misa.geom_type == 'MultiLineString':
    misa = max(misa.geoms, key=lambda g: g.length)
cs = list(misa.coords)
# orient source -> mouth (mouth is the north-eastern end, at Senigallia)
if cs[0][1] > cs[-1][1]:
    cs = cs[::-1]
def ext(p, q, d=8000):
    dx, dy = p[0] - q[0], p[1] - q[1]; n = math.hypot(dx, dy) or 1
    return (p[0] + dx / n * d, p[1] + dy / n * d)
line = LineString([ext(cs[0], cs[min(30, len(cs) - 1)])] + cs + [ext(cs[-1], cs[-31])])
faces = list(shapely.polygonize([shapely.union_all([par.boundary, line])]).geoms)
faces = [f for f in faces if f.representative_point().within(par)]
# right bank (hydrographic) = to the right when looking downstream: sign of cross product
def side(pt):
    d = line.project(pt)
    a = line.interpolate(max(0, d - 50)); b = line.interpolate(min(line.length, d + 50))
    return (b.x - a.x) * (pt.y - a.y) - (b.y - a.y) * (pt.x - a.x)
right = [f for f in faces if side(f.representative_point()) < 0]
left = [f for f in faces if side(f.representative_point()) >= 0]
g = shapely.union_all(right)
g = g.difference(C.comuni_union(['Ostra', 'Senigallia']).buffer(1))
g = C.clean(g)
jesi = C.P(13.24, 43.52)
print('classico', round(g.area / 1e6, 1), 'km2 of', round(par.area / 1e6, 1), '; contains Jesi:', g.contains(jesi),
      '; left-bank area', round(shapely.union_all(left).area / 1e6, 1))
json.dump({'classico': shapely.geometry.mapping(C.to4326(g))}, open(C.WORKB + '/t03_verdicchio.json', 'w'))
