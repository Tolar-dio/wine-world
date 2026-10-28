# Switzerland wine AOCs -> site/data/geo/ch.geojson
# AOC list: OFAG/BLW "Répertoire suisse des AOC", situation au 1er janvier 2026.
# Geometry: the vineyard footprint inside each AOC's territory, so polygons show where vines grow:
#   vineyards = swissTLM3D 2026 TLM_NUTZUNGSAREAL "Reben" (swisstopo, open data, free use with source)
#               ∪ cantonal Rebbaukataster (geodienste.ch MGDM 151.1, free cantons) where available,
#   generalised by morphological closing (raster), clipped to the AOC territory:
#   - cantonal AOCs: canton (swissBOUNDARIES3D 2026-01)
#   - Vaud regions: districts/communes per RAOVV (RSV 916.125.2) art. 2-3
#   - Vully (VD+FR), Zürichsee (ZH+SZ), Bielersee/Thunersee (BE), Cheyres (FR), Genève premiers crus are skipped
#     (22 tiny local AOCs; they stay as points).
#   - Dézaley, Calamin: OSM vineyard polygons tagged AOC grand cru (ODbL), bq official-ish -> 'approx'.
# bq: 'admin' (vineyards within admin unit) for all canton/region AOCs.
# Usage: python3 -I scripts/europe_ch.py
import sys, json, math, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pyogrio, geopandas as gpd, pandas as pd
from europe_inao_generalize import gen_geom

B = RAW + '/ch_boundaries/x/swissBOUNDARIES3D_1_5_LV95_LN02.gpkg'
T_2056_3035 = Transformer.from_crs(2056, 3035, always_xy=True)
KT = {1: 'ZH', 2: 'BE', 3: 'LU', 4: 'UR', 5: 'SZ', 6: 'OW', 7: 'NW', 8: 'GL', 9: 'ZG', 10: 'FR', 11: 'SO', 12: 'BS',
      13: 'BL', 14: 'SH', 15: 'AR', 16: 'AI', 17: 'SG', 18: 'GR', 19: 'AG', 20: 'TG', 21: 'TI', 22: 'VD', 23: 'VS',
      24: 'NE', 25: 'GE', 26: 'JU'}
# Cantonal AOC names (register)
CANTONAL = {'AG': 'Aargau', 'AI': 'Appenzell Innerrhoden', 'AR': 'Appenzell Ausserrhoden', 'BE': 'Bern',
            'BL': 'Basel-Landschaft', 'BS': 'Basel-Stadt', 'GE': 'Genève', 'GL': 'Glarus', 'GR': 'Graubünden',
            'JU': 'Jura', 'LU': 'Luzern', 'NE': 'Neuchâtel', 'NW': 'Nidwalden', 'OW': 'Obwalden', 'SG': 'St. Gallen',
            'SH': 'Schaffhausen', 'SO': 'Solothurn', 'SZ': 'Schwyz', 'TG': 'Thurgau', 'TI': 'Ticino', 'UR': 'Uri',
            'VD': 'Vaud', 'VS': 'Valais', 'ZG': 'Zug', 'ZH': 'Zürich'}
ALT = {'Bern': ['Berne'], 'Graubünden': ['Grigioni', 'Grisons'], 'Valais': ['Wallis'], 'Genève': ['Geneva', 'Genf'],
       'Neuchâtel': ['Neuenburg'], 'Ticino': ['Tessin'], 'Vaud': ['Waadt'], 'Basel-Stadt': [], 'Zürich': ['Zurich']}
STYLES = {'Valais': ['red', 'white', 'rose', 'sparkling', 'sweet'], 'Vaud': ['red', 'white', 'rose', 'sparkling'],
          'Genève': ['red', 'white', 'rose', 'sparkling'], 'Ticino': ['red', 'white', 'rose'],
          'Neuchâtel': ['red', 'white', 'rose', 'sparkling']}


def main():
    com = pyogrio.read_dataframe(B, layer='tlm_hoheitsgebiet', columns=['name', 'bfs_nummer', 'kantonsnummer', 'bezirksnummer', 'objektart'])
    com = com[com.objektart == 'Gemeindegebiet'].set_crs(2056, allow_override=True)
    com['geometry'] = com.geometry.force_2d()
    com['kt'] = com.kantonsnummer.map(lambda x: KT.get(int(x)) if pd.notna(x) else None)
    com = com.to_crs(3035)
    # vineyards: TLM3D Reben + Rebbaukataster
    tlm = pyogrio.read_dataframe(RAW + '/ch_tlm3d/swissTLM3D_TLM_NUTZUNGSAREAL.shp', where="OBJEKTART='Reben'", columns=['OBJEKTART'])
    tlm = tlm.set_crs(2056, allow_override=True)
    tlm['geometry'] = tlm.geometry.force_2d()
    parts = [tlm.to_crs(3035).geometry]
    for f in sorted(glob.glob(RAW + '/ch_rebbau/*.geojson')):
        try:
            rk = gpd.read_file(f)
        except Exception:
            continue
        if len(rk):
            parts.append(rk.set_crs(2056, allow_override=True).to_crs(3035).geometry)
    vines = gpd.GeoSeries(pd.concat(parts, ignore_index=True), crs=3035)
    vines = vines[vines.is_valid | True].map(shapely.make_valid)
    tree = shapely.STRtree(vines.values)
    print('vineyard polygons', len(vines), 'area km2', round(vines.area.sum() / 1e6, 1), flush=True)

    def vine_geom(territory, name):
        idx = tree.query(territory, predicate='intersects')
        if not len(idx):
            return None
        v = shapely.union_all(vines.values[idx])
        v = shapely.intersection(v, territory)
        v = polys_only(shapely.make_valid(v))
        if v is None or v.is_empty:
            return None
        a = v.area / 1e6
        g, close, res = gen_geom(v, max(a * 6, 0.5))   # closing scaled to a "zone" a few times the vine area
        g = shapely.intersection(g, territory.buffer(50))
        return polys_only(shapely.make_valid(g)), a

    def terr(mask):
        return shapely.union_all(com[mask].geometry.values)

    feats, taken = [], set()

    def add(name, territory, subcat, reg=None, alt=None, styles=None, cat='AOC'):
        r = vine_geom(territory, name)
        if r is None or r[0] is None:
            print('  no vineyards for', name)
            return
        g, vine_km2 = r
        g4326 = reproj(g, T_3035_4326)
        rr = {'vine_ha': int(round(vine_km2 * 100)), 'basis': 'vineyards (swissTLM3D, Rebbaukataster) within the AOC territory'}
        rr.update(reg or {})
        feats.append({'id': make_ids([name], 'ch', taken)[0], 'name': name, 'alt': alt or ALT.get(name) or None,
                      'country': 'ch', 'cat': cat, 'subcat': subcat, 'src': 'swisstopo', 'bq': 'admin',
                      'area': round(g.area / 1e6, 1) if g.area >= 1e6 else round(g.area / 1e6, 2) or 0.01, 'styles': styles or STYLES.get(name, ['red', 'white']),
                      'reg': rr, '_g': g4326})
        print(f'  {name}: vines {vine_km2*100:.0f} ha, polygon {g.area/1e6:.1f} km2', flush=True)

    # cantonal AOCs
    for kt, name in CANTONAL.items():
        add(name, terr(com.kt == kt), 'Canton')
    # Vaud regional AOCs (RAOVV art. 2-3)
    vd = com[com.kt == 'VD']
    lau_east = ['Lutry', 'Paudex', 'Pully', 'Belmont-sur-Lausanne']
    add('Chablais', terr((com.kt == 'VD') & (com.bezirksnummer == 2221)), 'Region',
        styles=['red', 'white', 'rose'])
    lav = (com.kt == 'VD') & (com.bezirksnummer.isin([2226]) | com.name.isin(lau_east + ['Vevey', 'Montreux', 'La Tour-de-Peilz',
                                                                                       'Corsier-sur-Vevey', 'Corseaux', 'Chardonne', 'Jongny',
                                                                                       'Saint-Légier-La Chiésaz', 'Blonay - Saint-Légier', 'Blonay', 'Veytaux']))
    add('Lavaux', terr(lav), 'Region', styles=['red', 'white'])
    cote = (com.kt == 'VD') & (com.bezirksnummer.isin([2227, 2228, 2229]) | com.name.isin(['Lausanne', 'Le Mont-sur-Lausanne', 'Romanel-sur-Lausanne', 'Cheseaux-sur-Lausanne', 'Jouxtens-Mézery', 'Epalinges']))
    cote &= ~com.name.isin(['La Sarraz', 'Pompaples', 'Orny', 'Eclépens'])
    add('La Côte', terr(cote), 'Region', styles=['red', 'white', 'rose'])
    orbe = (com.kt == 'VD') & ((com.bezirksnummer == 2224) | com.name.isin(['La Sarraz', 'Eclépens', 'Orny', 'Pompaples']))
    bonv_names = ['Bonvillars', 'Champagne', 'Concise', 'Corcelles-près-Concise', 'Fiez', 'Fontaines-sur-Grandson', 'Grandson',
                  'Giez', 'Mutrux', 'Novalles', 'Onnens (VD)', 'Provence', 'Tévenon', 'Bullet', 'Mauborget', 'Montagny-près-Yverdon',
                  'Valeyres-sous-Montagny', 'Vaugondry', 'Villars-Burquin', 'La Praz']
    orbe &= ~com.name.isin(bonv_names)
    add("Côtes de l'Orbe", terr(orbe), 'Region', alt=["Côtes-de-l'Orbe"], styles=['red', 'white', 'rose'])
    add('Bonvillars', terr((com.kt == 'VD') & com.name.isin(bonv_names)), 'Region', styles=['red', 'white', 'rose'])
    # Vully: Vaud Avenches communes + Fribourg Lake Murten shore
    vully_names = ['Vully-les-Lacs', 'Mont-Vully', 'Murten', 'Avenches', 'Faoug', 'Cudrefin']
    add('Vully', terr(com.name.isin(vully_names) & com.kt.isin(['VD', 'FR'])), 'Region', reg={'cantons': 'VD, FR'},
        styles=['red', 'white', 'rose'])
    add('Cheyres', terr((com.kt == 'FR') & com.name.isin(['Cheyres-Châbles'])), 'Local', styles=['red', 'white'])
    add('Bielersee', terr((com.kt == 'BE') & com.name.isin(['La Neuveville', 'Ligerz', 'Twann-Tüscherz', 'Biel/Bienne',
                                                            'Nidau', 'Erlach', 'Gals', 'Gampelen', 'Ins', 'Tschugg', 'Vinelz',
                                                            'Lüscherz', 'Sutz-Lattrigen', 'Ipsach', 'Mörigen', 'Täuffelen',
                                                            'Gerolfingen', 'Hagneck', 'Twann'])), 'Region',
        alt=['Lac de Bienne'], styles=['red', 'white', 'rose'])
    add('Thunersee', terr((com.kt == 'BE') & com.name.isin(['Spiez', 'Oberhofen am Thunersee', 'Hilterfingen', 'Sigriswil',
                                                            'Thun', 'Steffisburg', 'Krattigen', 'Leissigen', 'Gunten'])), 'Region',
        styles=['red', 'white'])
    add('Zürichsee', terr(((com.kt == 'ZH') & com.bezirksnummer.isin([106, 107]) ) |
                          ((com.kt == 'SZ') & com.name.isin(['Freienbach', 'Wollerau', 'Feusisberg', 'Altendorf', 'Lachen']))),
        'Region', reg={'cantons': 'ZH, SZ'}, styles=['red', 'white'])

    # Dézaley, Calamin (grand cru AOCs) from OSM polygons
    def osm(files):
        gs = []
        for f in files:
            d = json.load(open(f'{RAW}/osm_nominatim/{f}.json'))[0]
            gs.append(shapely.geometry.shape(d['geojson']))
        return shapely.union_all(gs)
    for name, files, sty in [('Dézaley', ['R17247881'], ['white', 'red']), ('Calamin', ['R12923829', 'W961270337'], ['white'])]:
        g = osm(files)
        feats.append({'id': make_ids([name], 'ch', taken)[0], 'name': name, 'alt': [f'{name} Grand Cru'], 'country': 'ch',
                      'cat': 'AOC', 'subcat': 'Grand Cru', 'src': 'osm', 'bq': 'approx', 'area': round(area_km2_4326(g), 2),
                      'styles': sty, 'reg': {'basis': 'OpenStreetMap vineyard polygon tagged as the AOC (ODbL)'}, '_g': g})
    for f in feats:
        f['_area_for_tier'] = f['area']
    out, iv, size = finalize(feats, 'ch', GEO + '/ch.geojson', 1_500_000, 4_000_000, [20, 30, 40, 60, 80], log=print,
                             tier_fn=tier_mult_fine)
    for f in out:
        print(f['id'], f['area'], f['parent'], f['reg'].get('vine_ha'))


if __name__ == '__main__':
    main()
