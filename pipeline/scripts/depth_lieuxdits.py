# French lieux-dits for great hillsides without premier cru polygons -> appended to site/data/geo/fr_fine.geojson
#  - Lieux-dits: Etalab "Cadastre" (cadastre.data.gouv.fr, layer lieux_dits, DGFiP PCI vecteur, Licence Ouverte 2.0)
#  - Clipped to the AOC's delimited parcel area: INAO "Délimitation parcellaire des AOC viticoles" (data.gouv.fr,
#    Licence Ouverte 2.0, file 2026-10-19). A feature = the delimited vineyard land inside one cadastral lieu-dit.
#  - Chablis premier cru: the 30 climats of the cahier des charges (INAO, CDC Chablis, version 23 June 2025)
#    that INAO's parcel file does not split out are built the same way, from the lieu-dit of the same name clipped
#    to the "Chablis premier cru" parcel area.
# src "cadastre", subcat "Lieu-dit" (or "Premier Cru" for Chablis climats), bq "official" (cadastral line x INAO
# parcel area). A lieu-dit is a cadastral name, not an appellation, unless it is a named climat in the cahier.
# Usage: python3 -I scripts/depth_lieuxdits.py
import sys, gzip, collections
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd, pandas as pd
from unidecode import unidecode

SRC = 'cadastre'
LD = RAW + '/cadastre_lieuxdits'

AOCS = [  # key, INAO app, parent id, display, min ha, insee filter
    ('cote-rotie', 'Côte Rôtie', 'fr-cote-rotie', 'Côte-Rôtie', 0.3, None),
    ('hermitage', "Hermitage ou Ermitage ou l'Hermitage ou l'Ermitage", 'fr-hermitage', 'Hermitage', 0.2, None),
    ('cornas', 'Cornas', 'fr-cornas', 'Cornas', 0.3, None),
    ('condrieu', 'Condrieu', 'fr-condrieu', 'Condrieu', 0.3, None),
    ('chateau-grillet', 'Château-Grillet', 'fr-chateau-grillet', 'Château-Grillet', 0.1, None),
    ('saint-joseph', 'Saint-Joseph', 'fr-saint-joseph', 'Saint-Joseph', 0.5,
     {'07097', '07152', '07324', '07245', '07140', '07345'}),   # historic core: Glun, Mauves, Tournon, St-Jean-de-Muzols, Lemps, Vion
    ('chateauneuf-du-pape', 'Châteauneuf-du-Pape', 'fr-chateauneuf-du-pape', 'Châteauneuf-du-Pape', 1.0, None),
    ('morgon', 'Morgon', 'fr-morgon', 'Morgon', 0.5, None),
    ('moulin-a-vent', 'Moulin-à-Vent', 'fr-moulin-a-vent', 'Moulin-à-Vent', 0.5, None),
    ('fleurie', 'Fleurie', 'fr-fleurie', 'Fleurie', 0.5, None),
    ('savennieres', 'Savennières', 'fr-savennieres', 'Savennières', 0.3, None),
    ('sancerre', 'Sancerre', 'fr-sancerre', 'Sancerre', 1.0, None),
    ('vouvray', 'Vouvray', 'fr-vouvray', 'Vouvray', 1.0, None),
]

CHABLIS_GROUPS = [
    ['Beauroy', 'Côte de Savant', 'Troesmes'], ['Berdiot'], ['Chaume de Talvat'], ['Côte de Jouan'], ['Côte de Léchet'],
    ['Côte de Vaubarousse'], ['Fourchaume', 'Côte de Fontenay', "L'Homme Mort", 'Vaulorent', 'Vaupulent'],
    ['Les Beauregards', 'Côte de Cuisy'], ['Les Fourneaux', 'Côte des Prés-Girots', 'Morein'], ['Mont de Milieu'],
    ['Montée de Tonnerre', 'Chapelot', 'Côte de Bréchain', "Pied d'Aloup"], ['Montmains', 'Butteaux', 'Forêts'],
    ['Vaillons', 'Beugnons', 'Chatains', 'les Épinottes', 'Les Lys', 'Mélinots'], ['Roncières', 'Sécher'],
    ['Vau de Vey', 'Vaux Ragons'], ['Vau Ligneau'], ['Vaucoupin'], ['Vosgros', 'Vaugiraut']]
CHABLIS_EXISTING = {'Chaume de Talvat', 'Côte de Jouan', 'Fourchaume', 'Les Beauregards', 'Les Fourneaux',
                    'Mont de Milieu', 'Vaucoupin', 'Vaugiraut', 'Vaupulent', 'Vosgros'}

SMALL = {'de', 'du', 'des', 'la', 'le', 'les', 'aux', 'au', 'et', 'en', 'sur', 'sous', 'a', 'l', 'd'}
ACC = {'cote': 'côte', 'cotes': 'côtes', 'pre': 'pré', 'pres': 'prés', 'chene': 'chêne', 'chenes': 'chênes',
       'chateau': 'château', 'chateaux': 'châteaux', 'foret': 'forêt', 'forets': 'forêts', 'ile': 'île',
       'iles': 'îles', 'etang': 'étang', 'etangs': 'étangs', 'eglise': 'église', 'gres': 'grès', 'cret': 'crêt',
       'crets': 'crêts', 'meal': 'méal', 'peleat': 'péléat', 'verenay': 'vérenay', 'montee': 'montée',
       'brechain': 'bréchain', 'melinots': 'mélinots', 'lechet': 'léchet', 'secher': 'sécher',
       'epinottes': 'épinottes', 'damnes': 'damnés', 'poncie': 'poncié', 'rochegres': 'rochegrès', 'chery': 'chéry',
       'epine': 'épine', 'epines': 'épines', 'ecole': 'école', 'pere': 'père', 'peres': 'pères', 'mere': 'mère',
       'frere': 'frère', 'freres': 'frères', 'pature': 'pâture', 'patures': 'pâtures', 'platre': 'plâtre',
       'platrieres': 'plâtrières', 'ecluse': 'écluse', 'eperon': 'éperon', 'echelle': 'échelle', 'rotie': 'rôtie',
       'chatillon': 'châtillon', 'cotes-rotie': 'côtes-rôtie', 'prieure': 'prieuré', 'vallee': 'vallée',
       'eveque': 'évêque', 'elus': 'élus', 'etoile': 'étoile', 'ecu': 'écu', 'chataigniers': 'châtaigniers',
       'chataigneraie': 'châtaigneraie', 'chatains': 'châtains', 'theze': 'thèze', 'creche': 'crèche', 'grele': 'grêle',
       'cure': 'cure', 'abime': 'abîme', 'tete': 'tête', 'fenetre': 'fenêtre', 'hotel': 'hôtel', 'ble': 'blé',
       'sainte-epine': 'sainte-épine', 'bechet': 'béchet', 'genet': 'genêt', 'genets': 'genêts', 'prele': 'prêle',
       'mazieres': 'mazières', 'emeraude': 'émeraude', 'celestins': 'célestins', 'esperance': 'espérance',
       'reserve': 'réserve', 'mule': 'mule', 'charite': 'charité'}


def fr_title(s):
    s = re.sub(r'\s+', ' ', s.strip())
    toks = re.split(r"([ \-'])", s)
    out, first = [], True
    for t in toks:
        if t in (' ', '-', "'") or t == '':
            out.append(t)
            continue
        w = t.lower()
        w0 = unidecode(w)
        if w0 in ACC:
            w = ACC[w0]
        elif re.search(r'ieres?$', w0) and len(w0) > 4:
            w = re.sub(r'iere(s?)$', r'ière\1', w0)
        elif re.search(r'[^e]ees?$', w0) and len(w0) > 4:
            w = re.sub(r'ee(s?)$', r'ée\1', w0)
        if w0 == 'a' and not first:
            w = 'à'
        if first or w0 not in SMALL:
            w = w[:1].upper() + w[1:]
        out.append(w)
        first = False
    r = ''.join(out)
    r = re.sub(r"\b(L|D)'(\w)", lambda m: m.group(1) + "'" + m.group(2).upper(), r)
    r = re.sub(r"(?<=\s)L'", "l'", r)
    r = re.sub(r"(?<=\s)D'", "d'", r)
    r = r[:1].upper() + r[1:]
    return r


def key(s):
    s = unidecode(s).upper().replace('-', ' ').replace("'", ' ')
    s = re.sub(r'^(LES|LE|LA|L) ', '', s.strip())
    return re.sub(r'\s+', ' ', s).strip()


def load_ld(code):
    p = f'{LD}/{code}.json.gz'
    if not os.path.exists(p):
        print('  missing lieux-dits for', code)
        return None
    d = json.load(gzip.open(p))
    if not d['features']:
        return None
    g = gpd.GeoDataFrame.from_features(d['features'], crs=4326).to_crs(2154)
    g['geometry'] = g.geometry.make_valid()
    return g


def commune_names():
    m = {}
    for fn in os.listdir(RAW + '/geoapi_communes'):
        if fn.startswith('names_'):
            for x in json.load(open(RAW + '/geoapi_communes/' + fn)):
                m[x['code']] = x['nom']
    return m


def tidy(g):
    """Light closing of the parcel-level clip (roads, houses) and removal of tiny holes/specks (EPSG:2154)."""
    g = shapely.make_valid(g).buffer(6, join_style=2).buffer(-6, join_style=2)
    g = clean_projected(g, min_hole_km2=0.002, min_part_km2=0.0005)
    return g


def main():
    par = gpd.read_file(DWORK + '/ld_inao_parcels.gpkg').to_crs(2154)
    cname = commune_names()
    taken = all_ids()
    feats = []
    stats = []
    for k, app, parent, disp, min_ha, filt in AOCS:
        sub = par[par.app == app]
        if filt:
            sub = sub[sub.insee.isin(filt)]
        aoc_by_insee = sub.groupby('insee').geometry.apply(lambda s: shapely.make_valid(shapely.union_all(list(s))))
        pieces = []
        aoc_ha = 0
        for code, ag in aoc_by_insee.items():
            aoc_ha += ag.area / 1e4
            ld = load_ld(code)
            if ld is None:
                continue
            for r in ld.itertuples():
                if not r.geometry.intersects(ag):
                    continue
                ig = polys_only(shapely.make_valid(r.geometry.intersection(ag)))
                if ig is None or ig.area < min_ha * 1e4:
                    continue
                pieces.append({'nom': r.nom.strip(), 'code': code, 'g': ig, 'ld_ha': r.geometry.area / 1e4})
        # merge same-name pieces that touch (across commune lines); keep distant homonyms apart
        groups = collections.defaultdict(list)
        for p in pieces:
            groups[key(p['nom'])].append(p)
        units = []
        for kk, lst in groups.items():
            n = len(lst)
            parent_idx = list(range(n))
            def find(i):
                while parent_idx[i] != i:
                    parent_idx[i] = parent_idx[parent_idx[i]]
                    i = parent_idx[i]
                return i
            for i in range(n):
                for j in range(i + 1, n):
                    if lst[i]['g'].distance(lst[j]['g']) < 150:
                        parent_idx[find(i)] = find(j)
            cl = collections.defaultdict(list)
            for i in range(n):
                cl[find(i)].append(lst[i])
            for c in cl.values():
                units.append(c)
        namecount = collections.Counter(key(u[0]['nom']) for u in units)
        n_units = 0
        for u in units:
            nom = max((p['nom'] for p in u), key=len)
            name = fr_title(nom)
            codes = sorted({p['code'] for p in u})
            comms = [cname.get(c, c) for c in codes]
            g = tidy(shapely.union_all([p['g'] for p in u]))
            if g is None or g.is_empty:
                continue
            ha = sum(p['g'].area for p in u) / 1e4
            alt = [f'{disp} {name}']
            if namecount[key(nom)] > 1:
                alt.append(name)
                name = f'{name} ({", ".join(comms)})'
            fid = f'fr-{k}-{slug(name)}'
            while fid in taken:
                fid = f'fr-{k}-{slug(name)}-{codes[0]}'
                if fid in taken:
                    fid += '-2'
            taken.add(fid)
            g4326 = polys_only(shapely.make_valid(reproj_2154(g)))
            feats.append({'id': fid, 'name': name, 'alt': alt, 'country': 'fr', 'cat': 'AOC', 'subcat': 'Lieu-dit',
                          'src': SRC, 'bq': 'official', 'area': round(ha / 100, 2), 'parent': parent,
                          'reg': {'lieu_dit': nom, 'communes': comms, 'insee': codes, 'aoc': disp,
                                  'vine_ha': round(ha, 1),
                                  'note': 'Cadastral lieu-dit clipped to the AOC delimited parcel area; a place name, not an appellation.'},
                          '_g': g4326})
            n_units += 1
        cover = sum(f['reg']['vine_ha'] for f in feats if f['parent'] == parent)
        stats.append((disp, n_units, round(aoc_ha), round(cover)))
        print(f'  {disp}: {n_units} lieux-dits, AOC parcels {aoc_ha:.0f} ha, covered {cover:.0f} ha')
    # ---- Chablis premier cru climats ----
    pc = par[(par.app == 'Chablis') & (par.denom == 'Chablis premier cru')]
    pc_by = pc.groupby('insee').geometry.apply(lambda s: shapely.make_valid(shapely.union_all(list(s))))
    fine = json.load(open(GEO + '/fr_fine.geojson'))['features']
    exist = {}
    for f in fine:
        p = f['properties']
        if p['name'].startswith('Chablis premier cru '):
            exist[p['id']] = reproj(shapely.make_valid(shape(f['geometry'])), T_4326_2154)
    principal = {}
    for grp in CHABLIS_GROUPS:
        for c in grp:
            principal[c] = grp[0]
    want = {key(c): c for grp in CHABLIS_GROUPS for c in grp if c not in CHABLIS_EXISTING}
    found = collections.defaultdict(list)
    for code, ag in pc_by.items():
        ld = load_ld(code)
        if ld is None:
            continue
        for r in ld.itertuples():
            kk = key(r.nom)
            if kk not in want or not r.geometry.intersects(ag):
                continue
            ig = polys_only(shapely.make_valid(r.geometry.intersection(ag)))
            if ig is None or ig.area < 0.1e4:
                continue
            found[want[kk]].append((code, ig, r.nom))
    print('  Chablis climats found', len(found), 'of', len(want), 'missing:', sorted(set(want.values()) - set(found)))
    for clim, lst in sorted(found.items()):
        g = tidy(shapely.union_all([x[1] for x in lst]))
        ha = sum(x[1].area for x in lst) / 1e4
        codes = sorted({x[0] for x in lst})
        name = f'Chablis premier cru {clim[0].upper() + clim[1:]}'
        fid = f'fr-{slug(name)}'
        if fid in taken:
            fid += '-climat'
        taken.add(fid)
        par_id = 'fr-chablis'
        for eid, eg in exist.items():
            if g.intersection(eg).area >= 0.85 * g.area:
                par_id = eid
        g4326 = polys_only(shapely.make_valid(reproj_2154(g)))
        reg = {'climat': clim, 'principal_climat': principal[clim], 'communes': [cname.get(c, c) for c in codes],
               'insee': codes, 'vine_ha': round(ha, 1), 'lieu_dit': sorted({x[2] for x in lst})[0],
               'note': 'Premier cru climat of the cahier des charges; drawn as the cadastral lieu-dit of the same name clipped to the INAO Chablis premier cru parcel area.'}
        if principal[clim] != clim:
            reg['label_rule'] = f'May be labelled under the principal climat name {principal[clim]}.'
        feats.append({'id': fid, 'name': name, 'alt': [clim], 'country': 'fr', 'cat': 'AOC', 'subcat': 'Premier Cru',
                      'src': SRC, 'bq': 'official', 'area': round(ha / 100, 2), 'parent': par_id, 'reg': reg,
                      '_g': g4326})
    out = finish_feats(feats, 'ld', 4)
    print('features', len(out))
    append_fine('fr', out, replace_src=SRC)
    json.dump({'stats': stats, 'chablis_found': sorted(found), 'chablis_missing': sorted(set(want.values()) - set(found))},
              open(DWORK + '/lieuxdits_stats.json', 'w'), ensure_ascii=False, indent=1)


T_4326_2154 = Transformer.from_crs(4326, 2154, always_xy=True)
T_2154_4326 = Transformer.from_crs(2154, 4326, always_xy=True)


def reproj_2154(g):
    return reproj(g, T_2154_4326)


if __name__ == '__main__':
    main()
