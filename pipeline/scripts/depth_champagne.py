# Champagne cru villages -> appended to site/data/geo/fr_fine.geojson (src "champ")
# Every commune of the Champagne AOC as a polygon with its échelle des crus status (17 grand cru, 42 premier cru,
# the rest "autre cru") and a descriptive sub-region.
#  - Commune list: EU single document of PDO-FR-A1359 via the eupdo inventory (312 communes, 2021 names), selected
#    spatially (commune >50% inside the eupdo Champagne polygon) so homonyms (Allemant, Bligny...) resolve.
#  - Commune boundaries: geo.api.gouv.fr (Etalab, ADMIN EXPRESS COG, Licence Ouverte 2.0), including communes
#    déléguées / associées so communes nouvelles are split back into the historical crus (Aÿ-Champagne = Aÿ +
#    Mareuil-sur-Aÿ + Bisseuil, Val de Livre = Louvois + Tauxières-Mutry, Blancs-Coteaux = Vertus + Oger + Voipreux +
#    Gionges, Cœur-de-la-Vallée, Vallées en Champagne, Val-des-Marais).
#  - Status: INAO cahier des charges AOC Champagne, chap. I, II b (grand cru, 17 communes) and II c (premier cru,
#    42 communes); text checked against the version approved by the INAO national committee on 18 June 2026.
# Usage: python3 -I scripts/depth_champagne.py
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd, pandas as pd, csv
from unidecode import unidecode

SRC = 'champ'

GRAND = ['Ambonnay', 'Avize', 'Aÿ', 'Beaumont-sur-Vesle', 'Bouzy', 'Chouilly', 'Cramant', 'Louvois',
         'Mailly-Champagne', 'Le Mesnil-sur-Oger', 'Oger', 'Oiry', 'Puisieulx', 'Sillery', 'Tours-sur-Marne',
         'Verzenay', 'Verzy']
PREMIER = ["Avenay-Val-d'Or", 'Bergères-lès-Vertus', 'Bezannes', 'Billy-le-Grand', 'Bisseuil', 'Chamery',
           'Champillon', 'Chigny-les-Roses', 'Coligny', 'Cormontreuil', 'Coulommes-la-Montagne', 'Cuis', 'Cumières',
           'Dizy', 'Écueil', 'Étréchy', 'Grauves', 'Hautvillers', 'Jouy-lès-Reims', 'Ludes', 'Mareuil-sur-Aÿ',
           'Les Mesneux', 'Montbré', 'Mutigny', 'Pargny-lès-Reims', 'Pierry', 'Rilly-la-Montagne', 'Sacy', 'Sermiers',
           'Taissy', 'Tauxières-Mutry', 'Trépail', 'Trois-Puits', 'Vaudemange', 'Vertus', 'Ville-Dommange',
           'Villeneuve-Renneville-Chevigny', 'Villers-Allerand', 'Villers-aux-Nœuds', 'Villers-Marmery', 'Voipreux',
           'Vrigny']
# Partial historical nuances worth keeping (pre-2010 échelle): Chouilly was 100% for white grapes and 95% for black;
# Tours-sur-Marne 100% for black and 90% for white. The cahier now gives both communes grand cru for all grapes.
NOTES = {
    'Chouilly': 'Before 2010 the échelle rated Chouilly 100% for white grapes but 95% for black; today the whole commune is grand cru.',
    'Tours-sur-Marne': 'Before 2010 the échelle rated Tours-sur-Marne 100% for black grapes but 90% for white; today the whole commune is grand cru.',
    'Coligny': 'Premier cru covers the former commune of Coligny within Val-des-Marais (historically for Chardonnay only). Polygon = Val-des-Marais minus its associated communes.',
    'Étréchy': 'Historically premier cru for Chardonnay only; the cahier now lists the commune without restriction.',
    'Gionges': 'Former commune merged into Blancs-Coteaux (2018); the AOC commune list names Blancs-Coteaux as a whole.',
    'Aulnay-aux-Planches': 'Associated commune of Val-des-Marais; inside the AOC commune list as part of Val-des-Marais.',
    'Aulnizeux': 'Associated commune of Val-des-Marais; inside the AOC commune list as part of Val-des-Marais.',
    'Morains': 'Associated commune of Val-des-Marais; inside the AOC commune list as part of Val-des-Marais.',
    'Colombey-les-Deux-Églises': 'Polygon = the delegated communes Colombey-les-Deux-Églises and Argentolles of the commune nouvelle (2017), where the vineyard lies.',
    'Cormicy': 'Polygon = delegated commune of Cormicy only (Gernicourt, merged in 2019, is outside the historical cru).',
}

# commune nouvelle (code) -> delegated/associated parts to emit (name in geo.api -> display name)
SPLIT = {
    '51030': {'Ay': 'Aÿ', 'Bisseuil': 'Bisseuil', 'Mareuil-sur-Ay': 'Mareuil-sur-Aÿ'},
    '51612': {'Vertus': 'Vertus', 'Oger': 'Oger', 'Voipreux': 'Voipreux', 'Gionges': 'Gionges'},
    '51457': {'Reuil': 'Reuil', 'Binson-et-Orquigny': 'Binson-et-Orquigny', 'Villers-sous-Châtillon': 'Villers-sous-Châtillon'},
    '51564': {'Louvois': 'Louvois', 'Tauxières-Mutry': 'Tauxières-Mutry'},
    '02053': {'Baulne-en-Brie': 'Baulne-en-Brie', 'La Chapelle-Monthodon': 'La Chapelle-Monthodon', 'Saint-Agnan': 'Saint-Agnan'},
    '51171': {'Cormicy': 'Cormicy'},
    '51158': {'Aulnay-aux-Planches': 'Aulnay-aux-Planches', 'Aulnizeux': 'Aulnizeux', 'Morains': 'Morains',
              '__rest__': 'Coligny'},
    '52140': {'Colombey-les-Deux-Églises+Argentolles': 'Colombey-les-Deux-Églises'},
}
NEW_COMMUNE_NAME = {'51030': 'Aÿ-Champagne', '51612': 'Blancs-Coteaux', '51457': 'Cœur-de-la-Vallée',
                    '51564': 'Val de Livre', '02053': 'Vallées en Champagne', '51158': 'Val-des-Marais',
                    '52140': 'Colombey les Deux Églises'}

# ---- descriptive sub-regions (Comité Champagne style grouping; not legal units) ----
T = {}
def put(sub, ter, names):
    for n in names:
        T[n] = (sub, ter)
put('Montagne de Reims', 'Grande Montagne de Reims', ['Rilly-la-Montagne', 'Chigny-les-Roses', 'Ludes', 'Mailly-Champagne',
    'Verzenay', 'Verzy', 'Villers-Marmery', 'Trépail', 'Vaudemange', 'Billy-le-Grand', 'Ambonnay', 'Bouzy', 'Louvois',
    'Tauxières-Mutry', 'Tours-sur-Marne', 'Villers-Allerand', 'Germaine'])
put('Montagne de Reims', 'Val de Vesle and Reims', ['Sillery', 'Puisieulx', 'Beaumont-sur-Vesle', 'Taissy', 'Cormontreuil',
    'Trois-Puits', 'Montbré', 'Villers-aux-Nœuds', 'Reims', 'Bezannes'])
put('Montagne de Reims', 'Petite Montagne de Reims', ['Sacy', 'Ville-Dommange', 'Jouy-lès-Reims', 'Pargny-lès-Reims',
    'Les Mesneux', 'Coulommes-la-Montagne', 'Vrigny', 'Écueil', 'Chamery', 'Sermiers', 'Courmas', 'Ormes', 'Gueux',
    'Courtagnon', 'Nanteuil-la-Forêt', 'Saint-Euphraise-et-Clairizet', 'Janvry'])
put('Montagne de Reims', "Vallée de l'Ardre", ['Pourcy'])
put('Montagne de Reims', 'Monts de Berru', ['Berru', 'Cernay-lès-Reims', 'Nogent-l\'Abbesse', 'Selles', 'Pontfaverger-Moronvilliers'])
put('Vallée de la Marne', 'Grande Vallée de la Marne', ['Aÿ', 'Mareuil-sur-Aÿ', 'Bisseuil', 'Dizy', 'Hautvillers', 'Cumières',
    'Champillon', 'Mutigny', "Avenay-Val-d'Or", 'Fontaine-sur-Ay'])
put('Vallée de la Marne', "Coteaux Sud d'Épernay", ['Épernay', 'Pierry', 'Moussy', 'Vinay', 'Chavot-Courcourt', 'Monthelon',
    'Mancy', 'Morangis', 'Moslins', 'Brugny-Vaudancourt', "Saint-Martin-d'Ablois"])
put('Vallée de la Marne', 'Vallée de la Marne rive gauche', ['Mardeuil', 'Vauciennes', 'Boursault', 'Œuilly', 'Leuvrigny',
    'Mareuil-le-Port', 'Troissy', 'Festigny', 'Nesle-le-Repons', 'Courthiézy', 'Dormans', 'Igny-Comblizy', 'Le Breuil',
    "Orbais-l'Abbaye"])
put('Côte des Blancs', 'Côte des Blancs', ['Chouilly', 'Oiry', 'Cramant', 'Avize', 'Oger', 'Le Mesnil-sur-Oger', 'Vertus',
    'Gionges', 'Voipreux', 'Villeneuve-Renneville-Chevigny', 'Cuis', 'Grauves'])
put('Côte des Blancs', 'Southern Côte des Blancs (Mont Aimé, Val-des-Marais)', ['Bergères-lès-Vertus', 'Étréchy', 'Soulières',
    'Givry-lès-Loisy', 'Loisy-en-Brie', 'Vert-Toulon', 'Coligny', 'Aulnay-aux-Planches', 'Aulnizeux', 'Morains'])
put('Côte de Sézanne', 'Val du Petit Morin', ['Étoges', 'Congy', 'Villevenard', 'Talus-Saint-Prix', 'Baye', 'Oyes',
    'Coizard-Joches', 'Courjeonnet', 'Fèrebrianges', 'Beaunay', 'Bergères-sous-Montmirail', 'Broussy-le-Grand'])
put('Côte de Sézanne', 'Côte de Sézanne', ['Allemant', 'Broyes', 'Mondement-Montgivroux', 'Sézanne', 'Vindey', 'Saudoy',
    'Barbonne-Fayel', 'Fontaine-Denis-Nuisy', 'Chantemerle', 'Bethon', 'La Celle-sous-Chantemerle', 'Montgenost',
    'Villenauxe-la-Grande'])
put('Montgueux', 'Montgueux', ['Montgueux'])


def subregion(name, dep, lon, lat):
    if name in T:
        return T[name]
    if dep in ('02', '77'):
        return ('Vallée de la Marne', 'Château-Thierry and the western Marne valley')
    if dep in ('10', '52'):
        if (lat >= 48.12 and lon >= 4.55) or lat >= 48.16:
            return ('Côte des Bar', 'Bar-sur-Aubois')
        return ('Côte des Bar', 'Barséquanais')
    # Marne
    if lon > 4.4 and lat < 48.95:
        return ('Vitryat', 'Vitryat')
    if lat >= 49.265:
        return ('Montagne de Reims', 'Massif de Saint-Thierry and the Vesle')
    if lon < 3.9 and 49.15 <= lat < 49.265:
        return ('Montagne de Reims', "Vallée de l'Ardre")
    if 49.0 < lat < 49.16 and lon < 3.95:
        return ('Vallée de la Marne', 'Vallée de la Marne rive droite')
    return (None, None)


def norm(s):
    return re.sub(r'[^a-z0-9]', '', unidecode(s).lower())


def main():
    log = []
    e = gpd.read_file(RAW + '/eupdo/EU_PDO.gpkg', where="PDOid='PDO-FR-A1359'")
    poly = e.geometry.iloc[0]
    eu_names = [x for x in csv.DictReader(open(RAW + '/eupdo/PDO_EU_id.csv', encoding='utf-8-sig'))
                if x['PDOid'] == 'PDO-FR-A1359'][0]['Municip_nam'].split('/')
    coms, cads = [], []
    for d in ['02', '10', '51', '52', '77']:
        g = gpd.read_file(f'{RAW}/geoapi_communes/com_{d}.geojson'); g['dep'] = d; coms.append(g)
        h = gpd.read_file(f'{RAW}/geoapi_communes/cad_{d}.geojson'); h['dep'] = d; cads.append(h)
    c = gpd.GeoDataFrame(pd.concat(coms, ignore_index=True), crs=4326).to_crs(3035)
    cad = gpd.GeoDataFrame(pd.concat(cads, ignore_index=True), crs=4326).to_crs(3035)
    c['ov'] = c.geometry.intersection(poly).area / c.geometry.area
    sel = c[c.ov > 0.5].copy()
    selnorm = {norm(n) for n in sel.nom}
    eunorm = {norm(n) for n in eu_names}
    print('selected', len(sel), '| EU names not selected:', [n for n in eu_names if norm(n) not in selnorm],
          '| selected not in EU names:', [n for n in sel.nom if norm(n) not in eunorm])
    units = []   # (display name, dep, insee, geometry 3035, alt list, note)
    for r in sel.itertuples():
        if r.code in SPLIT:
            parts = cad[cad.chefLieu == r.code]
            for k, disp in SPLIT[r.code].items():
                if k == '__rest__':
                    g = r.geometry.difference(shapely.union_all(list(parts.geometry)))
                    code = r.code
                elif '+' in k:
                    a, b = k.split('+')
                    pp = parts[parts.nom.isin([a, b])]
                    g = shapely.union_all(list(pp.geometry)); code = r.code
                else:
                    pp = parts[parts.nom == k]
                    if len(pp) != 1:
                        raise SystemExit(f'missing part {k} of {r.code}')
                    g = pp.geometry.iloc[0]; code = pp.code.iloc[0]
                g = shapely.make_valid(g).intersection(r.geometry)
                units.append((disp, r.dep, code, g, [NEW_COMMUNE_NAME.get(r.code, r.nom)], NOTES.get(disp)))
        else:
            units.append((r.nom, r.dep, r.code, r.geometry, [], NOTES.get(r.nom)))
    print('units', len(units))
    taken = all_ids()
    feats = []
    pc_set, gc_set = set(PREMIER), set(GRAND)
    found = set()
    for disp, dep, code, g3035, alt, note in units:
        g = polys_only(shapely.make_valid(reproj(g3035, T_3035_4326)))
        g = clean_projected(g3035, min_hole_km2=0.01, min_part_km2=0.005)
        g = polys_only(shapely.make_valid(reproj(g, T_3035_4326)))
        lon, lat = g.representative_point().x, g.representative_point().y
        status = 'Grand Cru' if disp in gc_set else 'Premier Cru' if disp in pc_set else 'Autre cru'
        if status != 'Autre cru':
            found.add(disp)
        sub, ter = subregion(disp, dep, lon, lat)
        if sub is None:
            print('  NO SUBREGION', disp, dep, lon, lat)
        a = list(alt)
        if disp == 'Aÿ':
            a = ['Ay'] + a
        if disp == 'Mareuil-sur-Aÿ':
            a = ['Mareuil-sur-Ay'] + a
        if disp == 'Coligny':
            a = ['Coligny (Val-des-Marais)'] + a
        if disp == 'Tauxières-Mutry':
            a = ['Tauxières'] + a
        if disp == 'Ville-Dommange':
            a = ['Villedommange'] + a
        if disp == 'Villeneuve-Renneville-Chevigny':
            a = ['Villeneuve-Renneville'] + a
        if disp == 'Vaudemange':
            a = ['Vaudemanges'] + a
        fid = f'fr-champagne-{slug(disp)}'
        if fid in taken:
            fid = f'fr-champagne-{slug(disp)}-{code}'
        taken.add(fid)
        pct = '100%' if status == 'Grand Cru' else '90-99%' if status == 'Premier Cru' else '80-89%'
        reg = {'echelle': status, 'echelle_pct': pct, 'subregion': sub, 'terroir': ter, 'insee': code}
        if note:
            reg['note'] = note
        feats.append({'id': fid, 'name': disp, 'alt': a or None, 'country': 'fr', 'cat': 'AOC',
                      'subcat': 'Cru village', 'src': SRC, 'bq': 'commune',
                      'area': round(area_km2_4326(g), 1), 'parent': 'fr-champagne',
                      'varieties': ['Chardonnay', 'Pinot Noir', 'Meunier', 'Arbane', 'Petit Meslier', 'Pinot Blanc', 'Pinot Gris'],
                      'styles': ['sparkling', 'white', 'rose'], 'reg': reg, '_g': g})
    miss = (gc_set | pc_set) - found
    print('classified found', len(found), 'missing', miss)
    if miss:
        raise SystemExit('missing classified communes')
    out = finish_feats(feats, 'champ', 25)
    import collections
    print(collections.Counter(f['reg']['echelle'] for f in out))
    print(collections.Counter(f['reg']['subregion'] for f in out))
    print(collections.Counter((f['reg']['subregion'], f['reg']['terroir']) for f in out))
    append_fine('fr', out, replace_src=SRC)
    json.dump([{k: v for k, v in f.items() if k != '_g'} for f in out], open(DWORK + '/champagne_units.json', 'w'),
              ensure_ascii=False, indent=0)


if __name__ == '__main__':
    main()
