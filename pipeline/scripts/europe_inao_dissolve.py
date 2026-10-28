# Step 2a: dissolve INAO "Délimitation parcellaire des AOC viticoles" per dénomination.
# Output: work/europe/inao_denoms.gpkg (EPSG:3035, one row per id_denom, full detail)
# Usage: python3 -I scripts/europe_inao_dissolve.py
import sys, os, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pyogrio, geopandas as gpd, pandas as pd

SHP = glob.glob(RAW + '/inao_parcel/shp/*delim-parcellaire-aoc-shp.shp')[0]
OUT = WORK + '/inao_denoms.gpkg'
PART = WORK + '/inao_partials.gpkg'

cols = ['dt', 'type_prod', 'categorie', 'type_denom', 'id_app', 'app', 'id_denom', 'denom', 'insee']
meta = pyogrio.read_dataframe(SHP, read_geometry=False, columns=['dt', 'type_prod'])
dts = sorted(meta[meta.type_prod == 'Vins'].dt.dropna().unique())
print('dts', dts, flush=True)
if os.path.exists(PART):
    os.remove(PART)
for dt in dts:
    g = pyogrio.read_dataframe(SHP, columns=cols, where=f"dt = '{dt}' AND type_prod = 'Vins'")
    g = g.set_crs(2154, allow_override=True).to_crs(3035)
    rows = []
    for idd, sub in g.groupby('id_denom'):
        geom = shapely.union_all(shapely.make_valid(sub.geometry.values))
        cats = sorted({c.strip() for v in sub.categorie.dropna() for c in v.split(',')})
        r = sub.iloc[0]
        rows.append({'dt': dt, 'id_denom': int(idd), 'denom': r.denom, 'id_app': int(r.id_app), 'app': r.app,
                     'type_denom': r.type_denom, 'categorie': ', '.join(cats), 'n_communes': int(sub.insee.nunique()),
                     'insee': ','.join(sorted(sub.insee.dropna().unique())), 'geometry': geom})
    part = gpd.GeoDataFrame(rows, crs=3035)
    part.to_file(PART, layer='p', driver='GPKG', mode='a' if os.path.exists(PART) else 'w')
    print(dt, len(g), 'features ->', len(part), 'denoms', flush=True)
    del g, part, rows

p = gpd.read_file(PART)
rows = []
for idd, sub in p.groupby('id_denom'):
    geom = shapely.union_all(shapely.make_valid(sub.geometry.values)) if len(sub) > 1 else sub.geometry.iloc[0]
    geom = polys_only(shapely.make_valid(geom))
    r = sub.iloc[0]
    cats = sorted({c.strip() for v in sub.categorie for c in v.split(',') if c.strip()})
    rows.append({'id_denom': int(idd), 'denom': r.denom, 'id_app': int(r.id_app), 'app': r.app,
                 'type_denom': r.type_denom, 'categorie': ', '.join(cats), 'dts': ','.join(sorted(sub.dt)),
                 'insee': ','.join(sorted(set(','.join(sub.insee).split(',')))),
                 'area_km2': geom.area / 1e6, 'nverts': int(shapely.get_num_coordinates(geom)),
                 'nparts': int(shapely.get_num_geometries(geom)), 'geometry': geom})
out = gpd.GeoDataFrame(rows, crs=3035)
if os.path.exists(OUT):
    os.remove(OUT)
out.to_file(OUT, layer='denoms', driver='GPKG')
print('wrote', OUT, len(out), 'denoms; total verts', out.nverts.sum())
