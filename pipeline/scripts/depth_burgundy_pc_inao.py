"""Exact INAO delimited area and communes per Burgundy premier cru / Corton climat denomination,
from the INAO parcel delimitation shapefile (2026-10-19 extract), keyed by fine-unit id via reg.inao_denom."""
import json
import geopandas as gpd
W = '/home/claude/winesite'
fine = json.load(open(f'{W}/site/data/geo/fr_fine.geojson'))['features']
want = {}
for f in fine:
    p = f['properties']
    if p.get('subcat') in ('Premier Cru', 'Grand Cru') and p.get('reg', {}).get('inao_denom'):
        want.setdefault(int(p['reg']['inao_denom']), []).append(p['id'])
ids = ','.join(str(i) for i in sorted(want))
g = gpd.read_file(f'{W}/raw/inao_parcel/shp/2026-10-19_delim-parcellaire-aoc-shp.shp', engine='pyogrio',
                  where=f'id_denom IN ({ids})', columns=['id_app', 'app', 'id_denom', 'denom', 'nomcom', 'insee'])
print(len(g), g.crs)
g['a'] = g.geometry.area / 10000
out = {}
for (den), grp in g.groupby('id_denom'):
    by = grp.groupby('nomcom')['a'].sum().sort_values(ascending=False)
    tot = float(by.sum())
    rec = {'ha_inao': round(tot, 2), 'communes': [(c, round(float(a), 2)) for c, a in by.items()], 'denom': grp['denom'].iloc[0]}
    for uid in want.get(int(den), []):
        out[uid] = rec
json.dump(out, open(f'{W}/work/depth_burgundy_pc/_inao.json', 'w'), ensure_ascii=False, indent=0)
print(len(out), 'of', sum(len(v) for v in want.values()))
for k in ['fr-vosne-romanee-premier-cru-les-beaux-monts', 'fr-chambolle-musigny-premier-cru-les-amoureuses', 'fr-gevrey-chambertin-premier-cru-clos-saint-jacques', 'fr-volnay-premier-cru-santenots', 'fr-nuits-saint-georges-premier-cru-les-saints-georges', 'fr-fixin-premier-cru-clos-de-la-perriere', 'fr-chassagne-montrachet-premier-cru-morgeot']:
    print(k, out.get(k))
