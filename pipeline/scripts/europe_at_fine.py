# Austria fine units -> site/data/geo/at_fine.geojson  (cat "Ried", bq official)
#  Niederösterreich: "Weinbau Rieden (aktueller Projektstand)", Amt der NÖ Landesregierung, CC BY 4.0
#     (sdi.noe.gv.at OGD:RLF_WEINBAU_RIEDEN; status "Verordnung"). One feature per Weinbauflur x Ried; Subrieden kept
#     as their own feature when present.
#  Burgenland: "Weinbauriede Burgenland", Amt der Bgld. Landesregierung, CC BY 4.0 (INSPIRE ELU WFS haleconnect.com).
#  Parent: smallest same-country PDO (DAC) in at.geojson containing >= 85% (computed).
# Usage: python3 -I scripts/europe_at_fine.py
import sys, json, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pyogrio, geopandas as gpd, pandas as pd


def main():
    feats, taken = [], set()
    # --- Niederösterreich
    noe = pyogrio.read_dataframe(RAW + '/at_noe_rieden/rieden.gpkg')
    noe = noe[~noe.WEINBAURIEDE1.str.contains('ohne Riednamen', na=False)]
    noe['key'] = noe.WEINBAUFLUR + '|' + noe.WEINBAURIEDE1 + '|' + noe.WEINBAURIEDE2.fillna('keine Subriede')
    for key, sub in noe.groupby('key'):
        flur, ried, subried = key.split('|')
        g = polys_only(shapely.make_valid(shapely.union_all(shapely.make_valid(sub.geometry.values))))
        if g is None or g.is_empty:
            continue
        name = f'Ried {ried}' + (f' {subried}' if subried != 'keine Subriede' else '')
        r = sub.iloc[0]
        feats.append({'id': make_ids([f'{flur} {ried}' + (f' {subried}' if subried != 'keine Subriede' else '')], 'at', taken)[0],
                      'name': name, 'alt': [f'{flur} {ried}'], 'country': 'at', 'cat': 'Ried', 'subcat': 'Ried',
                      'src': 'noe', 'bq': 'official', 'area': round(area_km2_4326(g), 3),
                      'reg': {'weinbauflur': flur, 'gemeinde': r.PGNAME, 'bezirk': r.PBNAME, 'kg': r.KGNAME}, '_g': g})
    n_noe = len(feats)
    # --- Burgenland
    F = []
    for f in sorted(glob.glob(RAW + '/at_bgld_rieden/elu_*.geojson')):
        F += json.load(open(f))['features']
    lau = pyogrio.read_dataframe(RAW + '/gisco_lau/LAU_RG_01M_2021_3035.gpkg', where="CNTR_CODE = 'AT'").to_crs(4326)
    ltree = shapely.STRtree(lau.geometry.values)
    by = {}
    for f in F:
        name = (f['properties'].get('name') or '').strip()
        if not name:
            continue
        g = polys_only(shapely.make_valid(shapely.geometry.shape(f['geometry'])))
        if g is None or g.is_empty:
            continue
        pt = g.representative_point()
        idx = ltree.query(pt, predicate='within')
        gem = lau.LAU_NAME.iat[int(idx[0])] if len(idx) else ''
        by.setdefault((gem, name), []).append(g)
    for (gem, name), gs in by.items():
        g = polys_only(shapely.make_valid(shapely.union_all(gs)))
        feats.append({'id': make_ids([f'{gem} {name}'], 'at', taken)[0], 'name': f'Ried {name}', 'alt': [f'{gem} {name}'] if gem else None,
                      'country': 'at', 'cat': 'Ried', 'subcat': 'Ried', 'src': 'bgld', 'bq': 'official',
                      'area': round(area_km2_4326(g), 3), 'reg': {'gemeinde': gem}, '_g': g})
    print('NÖ', n_noe, 'Bgld', len(feats) - n_noe, flush=True)
    # parents from at.geojson
    main_fc = json.load(open(GEO + '/at.geojson'))
    pool = [{'id': f['properties']['id'], '_g': shapely.geometry.shape(f['geometry']), 'area': f['properties']['area']}
            for f in main_fc['features']]
    for f in feats:
        f['_area_for_tier'] = max(f['area'], 0.6)
        f['area'] = round(f['area'], 2) if f['area'] >= 0.01 else 0.01
    out, iv, size = finalize(feats, 'at_fine', GEO + '/at_fine.geojson', 4_500_000, 4_800_000, [15, 20, 25, 30, 40],
                             extra_parent_pool=pool, log=print, tier_fn=tier_mult_fine, min_interval_for_cap=10)
    # Rieden never contain each other: keep only parents from at.geojson (DAC / region)
    main_ids = {p['id'] for p in pool}
    for f in out:
        if f['parent'] not in main_ids:
            f['parent'] = None
    # fallback parent: the DAC/region polygon containing the label point
    from shapely import Point
    small_first = sorted(pool, key=lambda p: p['area'])
    for f in out:
        if f['parent'] is None:
            pt = Point(f['lp'])
            for p in small_first:
                if p['_g'].contains(pt):
                    f['parent'] = p['id']
                    break
    size = write_fc(GEO + '/at_fine.geojson', out)
    print('wrote at_fine', len(out), size)


if __name__ == '__main__':
    main()
