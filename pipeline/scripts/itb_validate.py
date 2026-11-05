# Validate the site geo/content files after the T03/T04/T05 writes.
import json, os, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import shapely
from shapely.geometry import shape

GEO = '/home/claude/winesite/site/data/geo'
SRCS = ('osmtrace', 'istatcom', 'aecad', 'sitrtopo')
prob = []
ids = {}
for fn in sorted(os.listdir(GEO)):
    if fn.endswith('.geojson'):
        fc = json.load(open(f'{GEO}/{fn}'))
        if fn.startswith('_') and fn != '_extra_points.geojson':
            continue
        for f in fc['features']:
            i = f['properties']['id']
            ids.setdefault(i, []).append(fn)
dups = {i: v for i, v in ids.items() if len(v) > 1}
print('ids across geo files:', len(ids), 'duplicates:', dups)
idx = json.load(open(f'{GEO}/_index.json'))
bi = {e['id']: e for e in idx}
print('index entries', len(idx), 'unique', len(bi))
json.load(open('/home/claude/winesite/site/data/content/it_fine.json'))
fine = json.load(open(f'{GEO}/it_fine.geojson'))
n = 0
for f in fine['features']:
    p = f['properties']
    if p.get('src') not in SRCS:
        continue
    n += 1
    g = shape(f['geometry'])
    if not g.is_valid:
        prob.append((p['id'], 'invalid'))
    e = bi.get(p['id'])
    if not e or e.get('pt') or e['area'] != p['area'] or e['bbox'] != p['bbox'] or e['lp'] != p['lp'] or e['parent'] != p['parent']:
        prob.append((p['id'], 'index mismatch'))
    if not g.contains(shapely.Point(p['lp'])):
        prob.append((p['id'], 'lp outside'))
    pb = bi[p['parent']]['bbox']
    b = g.bounds
    if not (b[0] >= pb[0] - 1e-3 and b[1] >= pb[1] - 1e-3 and b[2] <= pb[2] + 1e-3 and b[3] <= pb[3] + 1e-3):
        prob.append((p['id'], f'outside parent bbox {p["parent"]}'))
    if not (0.0005 < p['area'] < 1000):
        prob.append((p['id'], f'area {p["area"]}'))
ex = json.load(open(f'{GEO}/_extra_points.geojson'))
for f in ex['features']:
    if f['properties'].get('src') == 'sitrtopo':
        n += 1
        e = bi[f['properties']['id']]
        lon, lat = f['geometry']['coordinates']
        pb = bi[e['parent']]['bbox']
        if not (pb[0] <= lon <= pb[2] and pb[1] <= lat <= pb[3]):
            prob.append((e['id'], 'point outside parent bbox'))
print('checked', n, 'new/updated features; problems:', prob)
