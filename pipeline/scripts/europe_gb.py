# United Kingdom wine PDOs -> site/data/geo/gb.geojson
#  English Wine, Welsh Wine: EU PDO dataset (registered under EU law 2011, UK GI scheme since 2021), commune=LAD-based
#  Sussex (UK PDO 2022): counties of East and West Sussex (incl. Brighton and Hove unitary), geoBoundaries GBR ADM2 (OGL v3)
#  Darnibole (PDO 2017): 5 ha single vineyard at Camel Valley, Nanstallon (Cornwall). No open boundary file:
#   approximate ~5 ha polygon on the south-facing slope above the Camel Trail (bq approx).
# Usage: python3 -I scripts/europe_gb.py
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import geopandas as gpd, pandas as pd
import europe_eupdo as eu

LOG = []


def log(*a):
    s = ' '.join(str(x) for x in a)
    print(s, flush=True)
    LOG.append(s)


def main():
    gdf_eu = gpd.read_file(eu.GPKG)
    eu_feats = eu.build_feats('GB', gdf_eu)
    feats = []
    taken = set()
    for f in eu_feats:
        if f['name'] == 'Darnibole':
            dar = f
            continue
        f['id'] = make_ids([f['name']], 'gb', taken)[0]
        f['bq'] = 'commune'
        f['reg'] = dict(f['reg'])
        f['reg']['basis'] = 'local authority districts (EU file)'
        feats.append(f)
    # Sussex
    adm2 = gpd.read_file(RAW + '/gb_geoboundaries/geoBoundaries-GBR-ADM2.geojson')
    sx = adm2[adm2.shapeName.isin(['East Sussex', 'West Sussex', 'Brighton and Hove'])]
    assert len(sx) == 3, sx.shapeName.tolist()
    g = shapely.union_all(shapely.make_valid(sx.geometry.values))
    g = reproj(clean_projected(reproj(g, T_4326_3035), 0.2, 0.05), T_3035_4326)
    feats.append({'id': make_ids(['Sussex'], 'gb', taken)[0], 'name': 'Sussex', 'alt': None, 'country': 'gb', 'cat': 'PDO',
                  'src': 'gb', 'bq': 'admin', 'area': round(area_km2_4326(g), 1),
                  'varieties': ['Chardonnay', 'Pinot Noir', 'Pinot Meunier', 'Pinot Blanc', 'Pinot Gris', 'Arbane', 'Petit Meslier'],
                  'styles': ['red', 'white', 'rose', 'sparkling'],
                  'reg': {'uk_reg': '2022-07-05', 'max_hl_ha': 80, 'products': ['Quality Sparkling Wine', 'Wine'],
                          'basis': 'counties of East and West Sussex (incl. Brighton and Hove)'},
                  '_g': g})
    # Darnibole: approximate 5 ha block. Camel Valley Vineyard, Nanstallon PL30 5LG (50.4764, -4.7756);
    # vineyard slope lies just north of the Camel Trail, south-facing, 20 to 45 m asl.
    cx, cy = T_4326_3035.transform(-4.7745, 50.4777)
    blk = shapely.box(cx - 125, cy - 100, cx + 125, cy + 100)   # 5.0 ha
    g = reproj(blk, T_3035_4326)
    reg = dict(dar['reg'])
    reg.update({'area_ha': 5, 'geom_note': 'approximate: 5 ha block at Camel Valley, Nanstallon (spec: slate slope north of the Camel Trail)'})
    feats.append({'id': make_ids(['Darnibole'], 'gb', taken)[0], 'name': 'Darnibole', 'alt': None, 'country': 'gb', 'cat': 'PDO',
                  'src': 'eupdo', 'bq': 'approx', 'area': 0.05, 'varieties': ['Bacchus'],
                  'styles': ['white'], 'reg': reg, '_g': g})
    out, iv, size = finalize(feats, 'gb', GEO + '/gb.geojson', 1_500_000, 4_000_000, [40, 60, 80, 100, 150], log=log)
    for f in out:
        log(f"  {f['id']} {f['area']} km2 parent={f['parent']} bq={f['bq']}")


if __name__ == '__main__':
    main()
