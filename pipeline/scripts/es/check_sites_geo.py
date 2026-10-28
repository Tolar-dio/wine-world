# Check each site's distance (km) to the EU PDO polygon of its appellation.
import json, csv, geopandas as gpd
from shapely.geometry import Point
d = json.load(open('/home/claude/winesite/data/content/es.json', encoding='utf-8'))
ids = {r['PDOnam']: r['PDOid'] for r in csv.DictReader(open('/home/claude/winesite/raw/eupdo/PDO_EU_id.csv', encoding='utf-8-sig')) if r['Country'] == 'ES'}
g = gpd.read_file('/home/claude/winesite/raw/eupdo/EU_PDO.gpkg')
g = g[g.PDOid.str.startswith('PDO-ES')].set_index('PDOid')
name2id = {}
for a in d['appellations']:
    for m in a['match']:
        if m in ids: name2id[a['name']] = ids[m]
pts = gpd.GeoSeries([Point(s['lon'], s['lat']) for s in d['sites']], crs=4326).to_crs(3035)
bad = 0
for s, p in zip(d['sites'], pts):
    pid = name2id.get(s['appellation'])
    if not pid: continue
    dist = g.loc[pid].geometry.distance(p) / 1000
    if dist > 0.5:
        bad += 1; print(f"{s['id']}: {dist:.1f} km outside {s['appellation']} ({s['coord_quality']})")
print('checked', len(d['sites']), 'outside', bad)
