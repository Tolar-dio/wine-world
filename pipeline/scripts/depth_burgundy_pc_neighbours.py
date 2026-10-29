"""Neighbour list per Burgundy premier cru polygon (touching within ~20 m): other premier crus and grand crus,
with compass bearing and median-elevation difference, to check 'above/below/beside' statements."""
import json, math
from shapely.geometry import shape
from shapely.strtree import STRtree
W = '/home/claude/winesite'
fine = json.load(open(f'{W}/site/data/geo/fr_fine.geojson'))['features']
main = json.load(open(f'{W}/site/data/geo/fr.geojson'))['features']
terr = json.load(open(f'{W}/work/depth_burgundy_pc/_terrain.json'))
units = []
for f in fine:
    p = f['properties']
    if p.get('subcat') in ('Premier Cru', 'Grand Cru'):
        units.append((p['id'], p['name'], p['parent'], shape(f['geometry']), 'PC' if p['subcat']=='Premier Cru' else 'GCc'))
gcs = []
for f in main:
    p = f['properties']
    if p.get('subcat') == 'Grand Cru' and not p['name'].startswith('Alsace'):
        gcs.append((p['id'], p['name'], None, shape(f['geometry']), 'GC'))
allu = units + gcs
geoms = [u[3] for u in allu]
tree = STRtree(geoms)
def bearing(a, b):
    dx = (b.x - a.x) * math.cos(math.radians(a.y)); dy = b.y - a.y
    ang = (math.degrees(math.atan2(dx, dy)) + 360) % 360
    return ['N','NE','E','SE','S','SW','W','NW'][int((ang + 22.5)//45) % 8]
out = {}
buf = 0.00025
for uid, nm, par, g, kind in units:
    gb = g.buffer(buf)
    res = []
    c0 = g.representative_point()
    for j in tree.query(gb):
        oid, onm, opar, og, ok = allu[j]
        if oid == uid: continue
        if og.contains(g.buffer(-0.00005)) or g.contains(og.buffer(-0.00005)):  # umbrella / child overlaps
            continue
        inter = og.intersection(gb)
        if inter.is_empty or inter.area < 1e-9: continue
        # direction from this unit to the shared border
        b = bearing(c0, inter.representative_point())
        dz = None
        if oid in terr and uid in terr: dz = terr[oid]['zmed'] - terr[uid]['zmed']
        short = onm.split(' premier cru ')[-1] if ' premier cru ' in onm else onm
        res.append(dict(id=oid, name=short, app=onm.split(' premier cru ')[0] if ' premier cru ' in onm else '', kind=ok, dir=b, dz=dz, shared=round(inter.area*1e8)))
    res.sort(key=lambda r: -r['shared'])
    out[uid] = res[:10]
json.dump(out, open(f'{W}/work/depth_burgundy_pc/_neighbours.json', 'w'), ensure_ascii=False, indent=0)
print(len(out))
