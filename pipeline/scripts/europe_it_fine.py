# Italy fine units -> site/data/geo/it_fine.geojson
#  - Alto Adige / Südtirol: 86 UGAs (Unità geografiche aggiuntive / Zusätzliche geografische Einheiten) and the
#    DOC subzones (Santa Maddalena, Terlano, Valle Isarco, Val Venosta, Meranese, Colli di Bolzano, Lago di Caldaro
#    classico...) from Autonome Provinz Bozen-Südtirol / Provincia autonoma di Bolzano open data (geoservices6.civis.bz.it,
#    p_bz-Agriculture WFS; data.civis.bz.it datasets "unita-geografiche-aggiuntive", "zone-doc-e-igt"; CC0). bq official.
#  - (other fine units, e.g. Piedmont MGAs / Chianti Classico UGAs, are appended when their sources are available)
# Usage: python3 -I scripts/europe_it_fine.py
import sys, json, re
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import geopandas as gpd

BZ = RAW + '/bz_uga'


def title_de(s):
    s = s.strip()
    out = []
    for w in re.split(r'(\s+|-)', s.lower()):
        out.append(w[:1].upper() + w[1:] if w and w[0].isalpha() else w)
    t = ''.join(out)
    t = t.replace('St. ', 'St. ').replace('Oe', 'Ö').replace('Ue', 'Ü') if False else t
    return t


# Proper display names (register spelling) for UGAs whose upper-case data loses umlauts / ß
UGA_FIX = {'SOELL': 'Söll', 'TRAMIN-SOELL': 'Tramin-Söll', 'PRAZOELL': 'Prazöll', 'KUECHELBERG': 'Küchelberg',
           'GRIESFELD': 'Griesfeld', 'PAULSNER FELD': 'Paulsner Feld', 'EPPAN BERG': 'Eppan Berg',
           'EPPAN-BERG-SCHULTHAUS': 'Eppan Berg-Schulthaus', 'KASTELBELL-JUVALER': 'Kastelbell-Juvaler',
           'UNTERFENNBERG-HOFSTATT': 'Unterfennberg-Hofstatt', 'ALDEIN-AICH': 'Aldein-Aich', 'SALURN-PFATTEN': 'Salurn-Pfatten'}
ZONE_NAMES = {
    'ST.MAGDALENER': ('Santa Maddalena', ['St. Magdalener'], 'Subzone'),
    'ST.MAGDALENER KLASSISCH': ('Santa Maddalena classico', ['St. Magdalener klassisch'], 'Subzone'),
    'KALTERER ODER KALTERERSEE': None,   # = Lago di Caldaro DOC (already a main polygon)
    'KALTERERSEE KLASSISCH': ('Lago di Caldaro classico', ['Kalterersee klassisch'], 'Subzone'),
    'VINSCHGAU': ('Alto Adige Val Venosta', ['Südtiroler Vinschgau', 'Valle Venosta'], 'Subzone'),
    'EISACKTALER': ('Alto Adige Valle Isarco', ['Südtiroler Eisacktaler', 'Eisacktal'], 'Subzone'),
    'TERLANER': ('Alto Adige Terlano', ['Südtiroler Terlaner'], 'Subzone'),
    'TERLANER KLASSISCH': ('Alto Adige Terlano classico', ['Südtiroler Terlaner klassisch'], 'Subzone'),
    'MERANER ODER MERANER HÜGEL': ('Alto Adige Meranese', ['Meranese di collina', 'Südtiroler Meraner', 'Meraner Hügel'], 'Subzone'),
    'SÜDTIROLER KLAUSNER LEITACHER': ('Alto Adige Valle Isarco Klausner Leitacher', ['Südtiroler Eisacktaler Klausner Leitacher'], 'Subzone'),
    'BOZNER LEITEN': ('Alto Adige Colli di Bolzano', ['Südtiroler Bozner Leiten'], 'Subzone'),
}


def build_bz(main_by_id):
    feats, taken = [], set()
    alto = 'it-alto-adige'
    z = gpd.read_file(BZ + '/DOCAndIGTZones.geojson').to_crs(4326)
    for _, r in z.iterrows():
        key = r.NAME_DE.strip()
        if key not in ZONE_NAMES or ZONE_NAMES[key] is None:
            continue
        name, alt, sub = ZONE_NAMES[key]
        g = polys_only(shapely.make_valid(r.geometry))
        feats.append({'id': make_ids([name], 'it', taken)[0], 'name': name, 'alt': alt, 'country': 'it', 'cat': 'DOC',
                      'subcat': sub, 'src': 'bz', 'bq': 'official', 'area': round(area_km2_4326(g), 2),
                      'reg': {'mipaf': r.MIPAF, 'bz_fid': r.FID}, '_g': g})
    a = gpd.read_file(BZ + '/AdditionalGeographicalLocations.geojson').to_crs(4326)
    for _, r in a.iterrows():
        de = UGA_FIX.get(r.NAME_DE.strip(), title_de(r.NAME_DE))
        it = UGA_FIX.get(r.NAME_IT.strip(), title_de(r.NAME_IT))
        g = polys_only(shapely.make_valid(r.geometry))
        alt = [it] if it != de else None
        feats.append({'id': make_ids([f'alto-adige-{de}'], 'it', taken)[0], 'name': de, 'alt': alt, 'country': 'it',
                      'cat': 'DOC', 'subcat': 'UGA', 'src': 'bz', 'bq': 'official', 'area': round(area_km2_4326(g), 2),
                      'reg': {'doc': 'Alto Adige / Südtirol', 'bz_fid': r.FID}, '_g': g})
    return feats


def main():
    main_fc = json.load(open(GEO + '/it.geojson'))
    main_pool = []
    for f in main_fc['features']:
        p = f['properties']
        main_pool.append({'id': p['id'], '_g': shapely.geometry.shape(f['geometry']), 'area': p['area']})
    feats = build_bz({p['id']: p for p in main_pool})
    # ids must not collide with main-file ids
    main_ids = {p['id'] for p in main_pool}
    for f in feats:
        if f['id'] in main_ids:
            f['id'] = f['id'] + '-zone'
    for f in feats:
        f['_area_for_tier'] = f['area']
    out, iv, size = finalize(feats, 'it_fine', GEO + '/it_fine.geojson', 2_000_000, 5_000_000, [8, 10, 15, 20, 30],
                             extra_parent_pool=main_pool, log=print, tier_fn=tier_mult_fine)
    # Alto Adige units: parent is the Alto Adige DOC (UGAs) unless nested in a subzone of the same file
    bz_ids = {f['id'] for f in out if f['src'] == 'bz'}
    for f in out:
        if f['src'] != 'bz':
            continue
        if f['subcat'] == 'UGA' or f['parent'] not in bz_ids | {'it-alto-adige', 'it-lago-di-caldaro'}:
            if not (f['subcat'] == 'Subzone' and f['parent'] in bz_ids | {'it-lago-di-caldaro'}):
                f['parent'] = 'it-alto-adige'
    size = write_fc(GEO + '/it_fine.geojson', out)
    print('rewrote it_fine', len(out), size)
    for f in [x for x in out if x['subcat'] != 'UGA'] + out[:3]:
        print(f['id'], f['name'], f['area'], f['parent'])


if __name__ == '__main__':
    main()
