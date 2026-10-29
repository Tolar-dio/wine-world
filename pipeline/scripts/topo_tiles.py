"""Enumerate Copernicus GLO-30 1x1 degree tiles needed by geo features and sites."""
import json, glob, os, math, sys
from shapely.geometry import shape, box
from shapely.prepared import prep
from shapely import STRtree
W = '/home/claude/winesite'
GEO = f'{W}/site/data/geo'
tiles_avail = set(l.strip() for l in open(f'{W}/raw/copdem30/tileList.txt') if l.strip())
def tname(lat0, lon0):
    ns = 'N' if lat0 >= 0 else 'S'; ew = 'E' if lon0 >= 0 else 'W'
    return f'Copernicus_DSM_COG_10_{ns}{abs(lat0):02d}_00_{ew}{abs(lon0):03d}_00_DEM'
need = {}   # tile -> list of (id, kind)
feat_info = {}
tot_area = 0
for f in sorted(glob.glob(f'{GEO}/*.geojson')):
    b = os.path.basename(f)
    if b.startswith('_'): continue
    iso = b.split('.')[0].split('_')[0]; fine = '_fine' in b
    for ft in json.load(open(f))['features']:
        p = ft['properties']; g = shape(ft['geometry'])
        w, s, e, n = g.bounds
        pg = prep(g); tl = []
        for la in range(math.floor(s), math.floor(n) + 1):
            for lo in range(math.floor(w), math.floor(e) + 1):
                if pg.intersects(box(lo, la, lo + 1, la + 1)):
                    tl.append(tname(la, lo))
        feat_info[p['id']] = dict(iso=iso, fine=fine, area=p.get('area'), ntiles=len(tl), miss=sum(t not in tiles_avail for t in tl))
        for t in tl: need.setdefault(t, []).append(p['id'])
for ft in json.load(open(f'{GEO}/_sites.geojson'))['features']:
    lon, lat = ft['geometry']['coordinates']
    d = 0.003
    for la in {math.floor(lat - d), math.floor(lat + d)}:
        for lo in {math.floor(lon - d*2), math.floor(lon + d*2)}:
            need.setdefault(tname(la, lo), []).append(ft['properties']['id'])
avail = [t for t in need if t in tiles_avail]
print('tiles needed', len(need), 'available', len(avail))
big = sorted(feat_info.items(), key=lambda kv: -kv[1]['ntiles'])[:25]
for k, v in big: print(k, v)
print('features with missing tiles', sum(1 for v in feat_info.values() if v['miss']))
print('features fully missing', [k for k, v in feat_info.items() if v['ntiles'] and v['miss'] == v['ntiles']])
# tiles needed only by big features
json.dump({'need': need, 'feat': feat_info}, open(f'{W}/work/topo/tiles_need.json', 'w'))
