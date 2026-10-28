# Step 2c: build site/data/geo/fr.geojson (+ fr_fine.geojson) from
#  - INAO parcel delimitation, generalised (work/europe/inao_gen.gpkg, from europe_inao_generalize.py)
#  - INAO "aires géographiques" (commune-level) for AOCs absent from the parcel set (Champagne...)
#  - EU PDO dataset (Candiago et al. 2022) for regulatory attributes, and geometry fallback
# Main file: every AOC appellation + grand crus (each its own AOC) + key geographic sub-denominations
#   (DGC: Côtes du Rhône Villages named villages, Côtes de Bordeaux Blaye/Cadillac..., Alsace communal,
#    Chablis Grand Cru climats, Corton climats, Beaujolais villages...)  bq official
# Fine file: Burgundy/Mâconnais/Chalonnais/Chablis premier cru climats (subcat "Premier Cru").
# Usage: python3 -I scripts/europe_fr.py
import sys, os, re, json
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pyogrio, geopandas as gpd, pandas as pd
import europe_eupdo as eu

LOG = []


def log(*a):
    s = ' '.join(str(x) for x in a)
    print(s, flush=True)
    LOG.append(s)


def norm(s):
    s = unidecode(str(s)).lower().replace('’', "'")
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


SHP = RAW + '/inao_parcel/shp/2026-10-19_delim-parcellaire-aoc-shp.shp'
AIRE = RAW + '/inao_airegeo/shp/2026-10-26_delim-aire-geographique-shp.shp'
REF = RAW + '/inao_ref/2025-12-31-inao-ref-produit-siqo.csv'

# Official display names: INAO uses "X ou Y" for alternative names
NAME_FIX = {
    "Alsace ou Vin d'Alsace": ('Alsace', ["Vin d'Alsace"]),
    'Vin de Corse ou Corse': ('Vin de Corse', ['Corse']),
    'Vin de Savoie ou Savoie': ('Vin de Savoie', ['Savoie']),
    'Clos de Vougeot ou Clos Vougeot': ('Clos de Vougeot', ['Clos Vougeot']),
    'Côtes de Bourg, Bourg et Bourgeais': ('Côtes de Bourg', ['Bourg', 'Bourgeais']),
    'Crozes-Hermitage ou Crozes-Ermitage': ('Crozes-Hermitage', ['Crozes-Ermitage']),
    "Hermitage ou Ermitage ou l'Hermitage ou l'Ermitage": ('Hermitage', ['Ermitage', "L'Hermitage", "L'Ermitage"]),
    'Moulis ou Moulis-en-Médoc': ('Moulis', ['Moulis-en-Médoc']),
    'Pouilly-Fumé ou Blanc Fumé de Pouilly': ('Pouilly-Fumé', ['Blanc Fumé de Pouilly']),
    'Muscat de Frontignan ou Frontignan ou Vin de Frontignan': ('Muscat de Frontignan', ['Frontignan', 'Vin de Frontignan']),
    'Côte de Nuits-Villages ou Vins fins de la Côte de Nuits': ('Côte de Nuits-Villages', ['Vins fins de la Côte de Nuits']),
    'Coteaux Bourguignons ou Bourgogne grand ordinaire ou Bourgogne ordinaire': ('Coteaux Bourguignons', ['Bourgogne grand ordinaire', 'Bourgogne ordinaire']),
    'Bellet ou Vin de Bellet': ('Bellet', ['Vin de Bellet']),
    'Côte Rôtie': ('Côte Rôtie', ['Côte-Rôtie']),
    'Vin de Corse ou Corse Figari': ('Vin de Corse Figari', ['Corse Figari']),
    'Crémant d’Alsace': ("Crémant d'Alsace", []),
    'Rasteau Vin Doux Naturel': ('Rasteau', []),
    'Marsannay (rouge et blanc)': ('Marsannay', []),
}
GC_BURGUNDY = {'Chambertin', 'Chambertin-Clos de Bèze', 'Chapelle-Chambertin', 'Charmes-Chambertin',
               'Griotte-Chambertin', 'Latricières-Chambertin', 'Mazis-Chambertin', 'Mazoyères-Chambertin',
               'Ruchottes-Chambertin', 'Clos de la Roche', 'Clos Saint-Denis', 'Clos de Tart', 'Clos des Lambrays',
               'Bonnes-Mares', 'Musigny', 'Clos de Vougeot', 'Echezeaux', 'Grands-Echezeaux', 'Richebourg',
               'Romanée-Conti', 'Romanée-Saint-Vivant', 'La Romanée', 'La Tâche', 'La Grande Rue', 'Corton',
               'Corton-Charlemagne', 'Charlemagne', 'Montrachet', 'Chevalier-Montrachet', 'Bâtard-Montrachet',
               'Bienvenues-Bâtard-Montrachet', 'Criots-Bâtard-Montrachet', 'Chablis Grand Cru'}
def cvi_styles(cvi_list, cats):
    st = set()
    for c in cvi_list:
        for t in str(c).split(','):
            t = t.strip()
            if len(t) >= 2 and t[0] == '1':
                st.add({'B': 'white', 'R': 'red', 'S': 'rose'}.get(t[1], ''))
    st.discard('')
    cats = cats.lower()
    if 'mousseux' in cats or 'pétillant' in cats:
        st.add('sparkling')
    if 'doux naturel' in cats or 'liqueur' in cats:
        st.add('fortified')
    if any(k in cats for k in ('grains nobles', 'vendanges tardives', 'triees', 'paille', 'doux naturel')):
        st.add('sweet')
    order = ['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange']
    return [s for s in order if s in st]


def main():
    gen = gpd.read_file(WORK + '/inao_gen.gpkg')
    gen = gen[gen.categorie.notna()]
    attrs = pyogrio.read_dataframe(SHP, read_geometry=False, columns=['id_denom', 'cvi', 'type_prod'])
    attrs = attrs[attrs.type_prod == 'Vins']
    cvi = attrs.groupby('id_denom').cvi.apply(lambda s: sorted({x for v in s.dropna() for x in v.split(',')})).to_dict()

    # ---- EU attributes by normalised name
    gdf_eu = gpd.read_file(eu.GPKG)
    eu_feats = eu.build_feats('FR', gdf_eu)
    eu_by = {}
    for f in eu_feats:
        for n in [f['name']] + (f.get('alt') or []):
            eu_by[norm(n)] = f
    EU_ALIAS = {norm('Chablis Grand Cru'): norm('Chablis grand cru'),
                norm("Crémant d'Alsace"): norm("Crémant d'Alsace"), norm('Alsace grand cru Zinnkoepfle'): norm('Alsace grand cru Zinnkoepflé'),
                norm('Coulée de Serrant'): norm('Savennières Coulée de Serrant'), norm('Anjou Brissac'): norm('Anjou Villages Brissac'),
                norm('La Livinière'): norm('Minervois-la-Livinière'), norm('Boutenac'): norm('Corbières-Boutenac')}

    feats, used_eu = [], set()
    taken = set()

    def add(name, alt, cat, subcat, src, bq, geom4326, styles, reg_extra, eu_f=None, varieties=None, fine=False, area_override=None):
        a = area_override if area_override is not None else area_km2_4326(geom4326)
        reg = {}
        if eu_f is not None:
            reg.update(eu_f.get('reg') or {})
            used_eu.add(eu_f['id'])
        reg.update(reg_extra)
        fid = make_ids([name], 'fr', taken)[0]
        feats.append({'id': fid, 'name': name, 'alt': alt or None, 'country': 'fr', 'cat': cat, 'subcat': subcat,
                      'src': src, 'bq': bq, 'area': round(a, 1) if a >= 0.1 else round(a, 2),
                      'varieties': varieties if varieties is not None else (eu_f.get('varieties') if eu_f else None),
                      'styles': styles, 'reg': reg or None, '_g': geom4326, '_fine': fine})
        return fid

    # ---- 1. INAO appellations (type_denom == appellation)
    app_rows = gen[gen.type_denom == 'appellation']
    for _, r in app_rows.iterrows():
        raw = r.denom
        name, alt = NAME_FIX.get(raw, (None, None)) if raw in NAME_FIX else (None, None)
        if name is None:
            parts = [p.strip() for p in raw.split(' ou ')]
            name, alt = parts[0], parts[1:]
        if raw == 'Rasteau Vin Tranquille':
            name, alt = 'Rasteau', []
        if name == 'Rasteau' and any(f['name'] == 'Rasteau' for f in feats):
            # merge the two Rasteau delimitations (VDN + still) into one AOC polygon
            f = next(f for f in feats if f['name'] == 'Rasteau')
            f['_g'] = shapely.union_all([f['_g'], r.geometry])
            f['styles'] = sorted(set(f['styles']) | set(cvi_styles(cvi.get(int(r.id_denom), []), r.categorie)),
                                 key=['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified'].index)
            f['area'] = round(f['area'] + r.parcel_km2, 1)
            continue
        e = eu_by.get(EU_ALIAS.get(norm(name), norm(name)))
        if e is None:
            for a2 in alt:
                e = eu_by.get(norm(a2))
                if e:
                    break
        subcat = 'Grand Cru' if (name in GC_BURGUNDY or name.startswith('Alsace grand cru') or name == 'Banyuls grand cru') else None
        if name == 'Banyuls grand cru':
            subcat = None
        st = cvi_styles(cvi.get(int(r.id_denom), []), r.categorie)
        reg = {'inao_app': int(r.id_app), 'inao_denom': int(r.id_denom)}
        add(name, alt, 'AOC', subcat, 'inao', 'official', r.geometry, st, reg, eu_f=e, area_override=r.parcel_km2)

    # ---- 2. Sub-denominations (DGC) for the main file and premier crus for the fine file
    dgc = gen[gen.type_denom != 'appellation']
    named_pc_apps = {r.app for _, r in dgc.iterrows() if re.search(r'premier cru .+', r.denom, re.I)}
    n_main = n_fine = n_skip = 0
    for _, r in dgc.iterrows():
        raw = r.denom
        st = cvi_styles(cvi.get(int(r.id_denom), []), r.categorie)
        reg = {'inao_app': int(r.id_app), 'inao_denom': int(r.id_denom), 'dgc_of': r.app}
        pe = eu_by.get(EU_ALIAS.get(norm(r.app), norm(r.app)))
        if pe is None:
            pe = eu_by.get(norm(NAME_FIX.get(r.app, (r.app, []))[0]))
        vars_ = pe.get('varieties') if pe else None
        name, alt = NAME_FIX.get(raw, (raw, []))
        name = re.sub(r' - (rouge|blanc) exclusif$', '', name)
        if ' ou ' in name:
            parts = [p.strip() for p in name.split(' ou ')]
            name, alt = parts[0], parts[1:]
        low = raw.lower()
        if raw == 'Marsannay (rouge et blanc)':
            continue  # handled below as the Marsannay AOC itself
        if re.search(r'Côte de Beaune$', raw) or 'complété par' in raw:
            n_skip += 1
            continue
        if re.fullmatch(r'.* premier cru', raw, re.I) and r.app in named_pc_apps:
            n_skip += 1   # aggregate "X premier cru" = union of the named climats in the fine file
            continue
        a_km2 = r.parcel_km2
        if 'premier cru' in low:
            fine = raw != 'Coteaux du Layon premier cru Chaume'
            add(name, alt, 'AOC', 'Premier Cru', 'inao', 'official', r.geometry, st, reg, varieties=vars_,
                fine=fine, area_override=a_km2)
        elif raw.startswith('Chablis Grand Cru '):
            add(name, alt, 'AOC', 'Grand Cru', 'inao', 'official', r.geometry, st, reg, varieties=vars_, area_override=a_km2)
            fine = False
        elif raw.startswith('Corton '):
            add(name, alt, 'AOC', 'Grand Cru', 'inao', 'official', r.geometry, st, reg, varieties=vars_, fine=True, area_override=a_km2)
            fine = True
        elif re.match(r'^(Beaujolais (?!Villages)|Mâcon (?!Villages)|Clairette du Languedoc )', raw):
            add(name, alt, 'AOC', 'DGC', 'inao', 'official', r.geometry, st, reg, varieties=vars_, fine=True, area_override=a_km2)
            fine = True
        else:
            add(name, alt, 'AOC', 'DGC', 'inao', 'official', r.geometry, st, reg, varieties=vars_, area_override=a_km2)
            fine = False
        if fine:
            n_fine += 1
        else:
            n_main += 1
    # Marsannay: INAO only delimits it through its DGC "Marsannay (rouge et blanc)"
    m = dgc[dgc.denom == 'Marsannay (rouge et blanc)']
    if len(m):
        r = m.iloc[0]
        add('Marsannay', [], 'AOC', None, 'inao', 'official', r.geometry,
            cvi_styles(cvi.get(int(r.id_denom), []), r.categorie) or ['red', 'white', 'rose'],
            {'inao_app': int(r.id_app), 'inao_denom': int(r.id_denom)}, eu_f=eu_by.get(norm('Marsannay')),
            area_override=r.parcel_km2)
    # Fiefs Vendéens: five delimited dénominations, no umbrella delimitation -> union for the AOC
    fv = [f for f in feats if f['name'].startswith('Fiefs Vendéens ')]
    for f in fv:
        f['subcat'] = 'DGC'
    if fv:
        add('Fiefs Vendéens', [], 'AOC', None, 'inao', 'official', shapely.union_all([f['_g'] for f in fv]),
            sorted({s for f in fv for s in f['styles']}, key=['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified'].index),
            {'note': 'union of the five dénominations (Brem, Chantonnay, Mareuil, Pissotte, Vix)'},
            eu_f=eu_by.get(norm('Fiefs Vendéens')), area_override=sum(f['area'] for f in fv))
    log(f'INAO: {len(app_rows)} appellation delimitations, DGC main {n_main}, fine {n_fine}, skipped {n_skip}')

    # ---- 3. AOCs absent from the parcel set: INAO aires géographiques (commune level)
    have = {norm(f['name']) for f in feats} | {norm(a) for f in feats for a in (f['alt'] or [])}
    aire = pyogrio.read_dataframe(AIRE)
    aire = aire.set_crs(2154, allow_override=True).to_crs(3035)
    ref = pd.read_csv(REF, encoding='utf-8-sig', dtype=str)
    ref = ref[(ref.secteur.str.strip() == 'VITICOLE') & (ref.signe_ue.str.strip() == 'AOP')]
    ref = ref[~ref.categorie.str.contains('Cidre|Poir|Pommeau|Eau|Calvados', na=False)]
    for app, sub in ref.groupby('appellation'):
        name, alt = NAME_FIX.get(app, (None, None)) if app in NAME_FIX else (None, None)
        if name is None:
            parts = [p.strip() for p in app.split(' ou ')]
            name, alt = parts[0], parts[1:]
        if norm(name) in have or norm(app) in have:
            continue
        m = aire[aire.denom.map(norm) == norm(app)]
        if not len(m):
            log(f'  no geometry for {app}')
            continue
        g3035 = clean_projected(shapely.make_valid(m.geometry.iloc[0]), 0.2, 0.02)
        g4326 = reproj(g3035, T_3035_4326)
        e = eu_by.get(norm(name))
        src_key, note = 'inao', 'aire geographique'
        if e is not None and e['area'] < 0.9 * g3035.area / 1e6:
            # INAO's aire géographique also covers communes allowed only for vinification/elaboration
            # (Champagne: 635 communes); the EU file's commune list is the grape-growing zone, so it is tighter.
            g4326, src_key, note = e['_g'], 'eupdo', 'grape-growing communes (EU file); INAO aire geographique is wider'
        prods = ' '.join(sub.produit.tolist()).lower()
        st = [s for s, k in (('red', 'rouge'), ('white', 'blanc'), ('rose', 'rosé'), ('sparkling', 'mousseux')) if k in prods]
        cats = ' '.join(sub.categorie.dropna()).lower()
        if 'mousseux' in cats and 'sparkling' not in st:
            st.append('sparkling')
        if 'liqueur' in cats:
            st.append('fortified')
        if 'paille' in prods or 'passerill' in prods:
            st.append('sweet')
        if not st and e:
            st = e['styles']
        if name == 'Champagne':
            st = ['white', 'rose', 'sparkling']
        add(name, alt, 'AOC', None, src_key, 'commune', g4326, st, {'inao_app': int(sub.id_appellation.iloc[0]), 'area_basis': note}, eu_f=e)
        have.add(norm(name))
        log(f'  commune-level geometry for {name}: {src_key}')

    # ---- 4. EU PDOs still unmatched (renamed / absorbed names): keep with eupdo commune geometry
    for e in eu_feats:
        if e['id'] in used_eu:
            continue
        if norm(e['name']) in have:
            continue
        log(f'  EU-only PDO kept from eupdo: {e["name"]}')
        g = e['_g']
        add(e['name'], e.get('alt'), 'AOC', e.get('subcat'), 'eupdo', 'commune', g, e['styles'],
            {'note': 'not in current INAO delimitation (merged or renamed)'} if e['name'] in ('Blaye', 'Côtes de Blaye', 'Sainte-Foy-Bordeaux', 'Cabernet de Saumur') else {}, eu_f=e)

    main = [f for f in feats if not f['_fine']]
    fine = [f for f in feats if f['_fine']]
    log(f'features: main {len(main)}, fine {len(fine)}')
    for f in main + fine:
        f['_area_for_tier'] = f['area']
    # ---- simplify + write
    main_out, iv, size = finalize(main, 'fr_main', GEO + '/fr.geojson', 3_500_000, 5_000_000,
                                  [20, 25, 30, 40, 50, 60, 75, 90, 110], log=log, tier_fn=tier_mult_fine)
    fine_out, iv2, size2 = finalize(fine, 'fr_fine', GEO + '/fr_fine.geojson', 3_000_000, 5_000_000,
                                    [8, 10, 12, 15, 20, 25, 30], extra_parent_pool=main_out, log=log,
                                    tier_fn=tier_mult_fine)
    json.dump({'main': {'features': len(main_out), 'interval': iv, 'bytes': size},
               'fine': {'features': len(fine_out), 'interval': iv2, 'bytes': size2}},
              open(WORK + '/fr_summary.json', 'w'), indent=1)
    with open(WORK + '/fr_run.log', 'w') as f:
        f.write('\n'.join(LOG) + '\n')


if __name__ == '__main__':
    main()
