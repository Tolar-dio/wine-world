# Moldova wine PGIs -> site/data/geo/md.geojson  (bq admin: unions of raions, geoBoundaries MDA ADM1, CC BY 3.0 IGO)
#  Codru: Hîncești, Ialoveni, Anenii Noi, Criuleni, Strășeni, Orhei, Călărași, Nisporeni, Telenești, Ungheni,
#         Dubăsari (AGEPI press release 21.08.2013 on the first Codru PGI certificates). Chișinău municipality is
#         surrounded by the zone and has vineyards (Cricova); it is included (noted in reg).
#  Ștefan Vodă: Ștefan Vodă, Căușeni, Cimișlia, Basarabeasca (ONVV, wineofmoldova.com).
#  Valul lui Traian: Leova, Cantemir, Cahul, UTA Găgăuzia (Comrat, Ceadîr-Lunga, Vulcănești), Taraclia (ONVV).
# Usage: python3 -I scripts/europe_md.py
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import geopandas as gpd

ZONES = [
    ('Codru', ['Codrii'], ['Hincesti', 'Ialoveni', 'Anenii Noi', 'Criuleni', 'Straseni', 'Orhei', 'Calarasi', 'Nisporeni',
                           'Telenesti', 'Ungheni', 'Dubasari', 'Chisinau'],
     {'reg_year': 2013, 'raions': 'Hîncești, Ialoveni, Anenii Noi, Criuleni, Strășeni, Orhei, Călărași, Nisporeni, Telenești, Ungheni, Dubăsari (+ Chișinău municipality)'},
     ['red', 'white', 'sparkling']),
    ('Ștefan Vodă', ['Stefan Voda'], ['Stefan Voda', 'Causeni', 'Cimislia', 'Basarabeasca'],
     {'reg_year': 2013, 'raions': 'Ștefan Vodă, Căușeni, Cimișlia, Basarabeasca', 'vineyard_ha': 10000},
     ['red', 'white', 'rose']),
    ('Valul lui Traian', ["Trajan's Wall"], ['Leova', 'Cantemir', 'Cahul', 'Gagauzia', 'Taraclia'],
     {'reg_year': 2013, 'raions': 'Leova, Cantemir, Cahul, Taraclia, UTA Găgăuzia (Comrat, Ceadîr-Lunga, Vulcănești)', 'vineyard_ha': 43203},
     ['red', 'white', 'rose']),
]


def main():
    adm = gpd.read_file(RAW + '/gb_geoboundaries/geoBoundaries-MDA-ADM1.geojson')
    feats, taken = [], set()
    for name, alt, raions, reg, styles in ZONES:
        sel = adm[adm.shapeName.isin(raions)]
        assert len(sel) == len(raions), (name, set(raions) - set(sel.shapeName))
        g = shapely.union_all(shapely.make_valid(sel.geometry.values))
        g = reproj(clean_projected(reproj(g, T_4326_3035), 0.5, 0.05), T_3035_4326)
        feats.append({'id': make_ids([name], 'md', taken)[0], 'name': name, 'alt': alt, 'country': 'md', 'cat': 'IGP',
                      'subcat': 'Region', 'src': 'gb', 'bq': 'admin', 'area': round(area_km2_4326(g), 1),
                      'styles': styles, 'reg': reg, '_g': g})
    out, iv, size = finalize(feats, 'md', GEO + '/md.geojson', 1_000_000, 4_000_000, [60, 80, 100, 150], log=print)
    for f in out:
        print(f['id'], f['area'], f['lp'])


if __name__ == '__main__':
    main()
