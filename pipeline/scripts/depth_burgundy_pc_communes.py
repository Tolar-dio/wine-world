"""Commune(s) covered by each Burgundy premier cru / Corton climat polygon (GISCO LAU 2021), share of area."""
import json
import geopandas as gpd
from shapely.geometry import shape
W = '/home/claude/winesite'
lau = gpd.read_file(f'{W}/raw/gisco_lau/LAU_RG_01M_2021_3035.gpkg', bbox=(3800000, 2550000, 4050000, 2800000))
lau = lau[lau['CNTR_CODE'] == 'FR'].to_crs(4326)
fine = json.load(open(f'{W}/site/data/geo/fr_fine.geojson'))['features']
recs = []
for f in fine:
    p = f['properties']
    if p.get('subcat') in ('Premier Cru', 'Grand Cru'):
        recs.append((p['id'], shape(f['geometry'])))
g = gpd.GeoDataFrame({'id': [r[0] for r in recs]}, geometry=[r[1] for r in recs], crs=4326)
out = {}
inter = gpd.overlay(g.to_crs(2154), lau.to_crs(2154)[['LAU_NAME', 'geometry']], how='intersection')
inter['a'] = inter.area
for uid, grp in inter.groupby('id'):
    tot = grp['a'].sum()
    lst = sorted(((r.LAU_NAME, round(r.a / tot, 2)) for r in grp.itertuples()), key=lambda x: -x[1])
    out[uid] = [x for x in lst if x[1] >= 0.03]
json.dump(out, open(f'{W}/work/depth_burgundy_pc/_communes.json', 'w'), ensure_ascii=False, indent=0)
print(len(out))
for k in ['fr-vosne-romanee-premier-cru-les-beaux-monts', 'fr-vosne-romanee-premier-cru-en-orveaux', 'fr-vosne-romanee-premier-cru-les-rouges', 'fr-aloxe-corton-premier-cru-la-coutiere', 'fr-volnay-premier-cru-santenots', 'fr-nuits-saint-georges-premier-cru-les-saints-georges', 'fr-fixin-premier-cru-clos-de-la-perriere']:
    print(k, out.get(k))
