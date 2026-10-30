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
    ['Vaillons', 'Beugnons', 'Chatains', 'les Épinottes', 'Les Lys', 'Mélinots', 'Roncières', 'Sécher'],
    ['Vau de Vey', 'Vaux Ragons'], ['Vau Ligneau'], ['Vaucoupin'], ['Vosgros', 'Vaugiraut']]
CHABLIS_EXISTING = {'Chaume de Talvat', 'Côte de Jouan', 'Fourchaume', 'Les Beauregards', 'Les Fourneaux',
                    'Mont de Milieu', 'Vaucoupin', 'Vaugiraut', 'Vaupulent', 'Vosgros'}

CHABLIS_ALIAS = {
    'Beauroy': ['SOUS BOROY'], 'Butteaux': ['LE BOUT DES BUTTAUX', 'LE MILIEU DES BUTTAUX'],
    'Chapelot': ['LES CHAPELOTS'], 'Côte de Cuisy': ['COTE DE CUISSY', 'VALLEE DE CUISSY'],
    'Côte des Prés-Girots': ['COTE DES PRES GIROT'], 'Montmains': ['LES MONTS-MAINS'],
    "Pied d'Aloup": ["PIED D'ALOUE", "SOUS PIED D'ALOUE"], 'Troesmes': ['COTE DE TROUEMES'],
    'Vaux Ragons': ['VIGNES DES VAUX RAGONS'], 'Vaillons': ['LES VAILLONS', 'SUR LES VAILLONS'],
    'Chatains': ['CHATAIN', 'LES CHATAINS'], 'Côte de Savant': ['COTE  DE SAVANT'],
}
# Côte de Fontenay = the lieu-dit "La Côte" of Fontenay-près-Chablis (89175) only
CHABLIS_ALIAS_COMMUNE = {('89175', 'COTE'): 'Côte de Fontenay'}
# Vaulorent has no cadastral lieu-dit of that name; the only unassigned premier cru land on the slope directly north
# of Les Preuses (where every source places Vaulorent, between the grand crus and Fourchaume/Vaupulent) is the
# lieu-dit "Les Quatre Chemins" of Chablis (former Poinchy). Identified by position: bq approx.
CHABLIS_POSITIONAL = {('89068', 'QUATRE CHEMINS'): 'Vaulorent', ('89068', 'MINOS'): 'Mélinots'}
POSITIONAL_NOTE = {
    'Vaulorent': 'No cadastral lieu-dit carries this name; drawn as the premier cru land of the lieu-dit "Les Quatre Chemins" directly north of Les Preuses, where Vaulorent lies. Identified by position.',
    'Mélinots': 'No cadastral lieu-dit carries this name; drawn as the premier cru land of the lieu-dit "Les Minos" between Roncières and Beugnons on the Vaillons slope, where Mélinots lies. Identified by position and name.'}
# premier cru land in Chablis commune whose cadastral lieu-dit carries the name of a climat that INAO's DGC polygon
# draws only in the neighbouring commune (Mont de Milieu in Fleys, Vaupulent in La Chapelle-Vaupelteigne)
CHABLIS_EXTRA = {('89068', 'MONTS DE MILIEU'): 'Mont de Milieu', ('89068', 'VAUPULANS'): 'Vaupulent'}

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
       'reserve': 'réserve', 'mule': 'mule', 'charite': 'charité', 'marechaux': 'maréchaux',
       'marechal': 'maréchal', 'deves': 'devès', 'chevre': 'chèvre', 'chevres': 'chèvres', 'perou': 'pérou',
       'romaneche': 'romanèche', 'arrets': 'arrêts', 'planeze': 'planèze', 'vezerance': 'vézerance'}


# names whose cadastral spelling differs from the form every wine reference uses (cadastral form kept in alt/reg)
DISPLAY = {('hermitage', 'BESSAR'): 'Les Bessards', ('hermitage', 'ROUCOULE'): 'Les Rocoules'}
EXTRA_ALT = {('morgon', 'COTES DU PY'): ['Côte du Py']}


def clean_raw(s):
    s = re.sub(r'\s+', ' ', s.strip())
    m = re.match(r"^(.*\S) (LE|LA|LES|L')$", s, re.I)          # "AGNETTES LES" -> "LES AGNETTES"
    if m:
        art = m.group(2)
        s = (art + s[:0] + m.group(1)) if art.endswith("'") else f'{art} {m.group(1)}'
    if ' ' not in s and (s.count('-') >= 2 or re.match(r"^(LE|LA|LES)-", s, re.I)):
        s = s.replace('-', ' ')                                  # "LES-COMBES" -> "LES COMBES"
    return s


def fr_title(s):
    s = clean_raw(s)
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
        elif re.search(r'[^er]eres?$', w0) and len(w0) > 4:
            w = re.sub(r'ere(s?)$', r'ère\1', w0)
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
    # some communes carry overlapping lieux-dits (a wide name plus smaller named spots inside it):
    # partition them, giving each overlap to the smaller (more specific) lieu-dit
    g['a'] = g.geometry.area
    g = g.sort_values('a').reset_index(drop=True)
    gl = list(g.geometry)
    tree = shapely.STRtree(gl)
    geoms = []
    for i, geom in enumerate(gl):
        cand = [j for j in tree.query(geom, predicate='intersects') if j < i]
        sm = [gl[j] for j in cand if shapely.intersection(geom, gl[j]).area > 1.0]
        geoms.append(polys_only(shapely.make_valid(geom.difference(shapely.union_all(sm)))) if sm else geom)
    g['geometry'] = geoms
    g = g[g.geometry.notna() & ~g.geometry.is_empty]
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
    taken = all_ids(SRC)
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
                if not isinstance(r.nom, str) or not r.nom.strip() or not r.geometry.intersects(ag):
                    continue        # unnamed cadastral polygons carry no lieu-dit
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
            name = DISPLAY.get((k, clean_raw(nom).upper())) or fr_title(nom)
            codes = sorted({p['code'] for p in u})
            comms = [cname.get(c, c) for c in codes]
            g = tidy(shapely.union_all([p['g'] for p in u]))
            if g is None or g.is_empty:
                continue
            ha = sum(p['g'].area for p in u) / 1e4
            alt = [f'{disp} {name}'] + EXTRA_ALT.get((k, clean_raw(nom).upper()), [])
            if (k, clean_raw(nom).upper()) in DISPLAY:
                alt.append(fr_title(nom))
            if namecount[key(nom)] > 1:
                alt.append(name)
                name = f'{name} ({", ".join(comms)})'
            fid = unique_id(f'fr-{k}-{slug(name)}', taken, codes[0])
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
    # the "Chablis premier cru" parcel area also holds the grand cru parcels: take the grand crus out first
    gc = [reproj(shapely.make_valid(shape(f['geometry'])), T_4326_2154)
          for f in json.load(open(GEO + '/fr.geojson'))['features']
          if f['properties']['name'].startswith('Chablis Grand Cru')]
    gcu = shapely.make_valid(shapely.union_all(gc))
    pc_by = pc_by.apply(lambda g: polys_only(shapely.make_valid(g.difference(gcu))))
    fine = json.load(open(GEO + '/fr_fine.geojson'))['features']
    exist = {}
    for f in fine:
        p = f['properties']
        if p['name'].startswith('Chablis premier cru ') and p.get('src') == 'inao':
            exist[p['id']] = reproj(shapely.make_valid(shape(f['geometry'])), T_4326_2154)
    principal = {}
    for grp in CHABLIS_GROUPS:
        for c in grp:
            principal[c] = grp[0]
    want = {key(c): c for grp in CHABLIS_GROUPS for c in grp if c not in CHABLIS_EXISTING}
    # cadastral spellings of climat names (checked against the lieux-dits inside the premier cru parcel area)
    for clim, cads in CHABLIS_ALIAS.items():
        for cad in cads:
            want[key(cad)] = clim
    found = collections.defaultdict(list)
    extra = collections.defaultdict(list)
    for code, ag in pc_by.items():
        ld = load_ld(code)
        if ld is None:
            continue
        for r in ld.itertuples():
            kk = key(r.nom)
            if (code, kk) in CHABLIS_EXTRA and r.geometry.intersects(ag):
                ig = polys_only(shapely.make_valid(r.geometry.intersection(ag)))
                if ig is not None and ig.area >= 0.1e4:
                    extra[CHABLIS_EXTRA[(code, kk)]].append((code, ig, r.nom))
                continue
            clim_name = CHABLIS_ALIAS_COMMUNE.get((code, kk)) or CHABLIS_POSITIONAL.get((code, kk)) or want.get(kk)
            if clim_name is None or not r.geometry.intersects(ag):
                continue
            ig = polys_only(shapely.make_valid(r.geometry.intersection(ag)))
            if ig is None or ig.area < 0.1e4:
                continue
            found[clim_name].append((code, ig, r.nom))
    allwant = {c for grp in CHABLIS_GROUPS for c in grp if c not in CHABLIS_EXISTING}
    print('  Chablis climats found', len(found), 'of', len(allwant), 'missing:', sorted(allwant - set(found)))
    for clim, lst in sorted(found.items()):
        g = tidy(shapely.union_all([x[1] for x in lst]))
        ha = sum(x[1].area for x in lst) / 1e4
        codes = sorted({x[0] for x in lst})
        name = f'Chablis premier cru {clim[0].upper() + clim[1:]}'
        fid = unique_id(f'fr-{slug(name)}', taken, 'climat')
        par_id = 'fr-chablis'
        for eid, eg in exist.items():
            if g.intersection(eg).area >= 0.85 * g.area:
                par_id = eid
        g4326 = polys_only(shapely.make_valid(reproj_2154(g)))
        reg = {'climat': clim, 'principal': principal[clim], 'role': 'principal' if principal[clim] == clim else 'satellite',
               'communes': [cname.get(c, c) for c in codes],
               'insee': codes, 'vine_ha': round(ha, 1), 'lieu_dit': sorted({x[2] for x in lst}),
               'note': 'Premier cru climat of the cahier des charges; drawn as the cadastral lieu-dit of the same name clipped to the INAO Chablis premier cru parcel area.'}
        bq = 'official'
        if principal[clim] != clim:
            reg['label_rule'] = f'May be labelled under the principal climat name {principal[clim]}.'
        if clim in POSITIONAL_NOTE:
            bq = 'approx'
            reg['note'] = POSITIONAL_NOTE[clim]
        feats.append({'id': fid, 'name': name, 'alt': [clim], 'country': 'fr', 'cat': 'AOC', 'subcat': 'Premier Cru',
                      'src': SRC, 'bq': bq, 'area': round(ha / 100, 2), 'parent': par_id, 'reg': reg,
                      '_g': g4326})
    inao_id = {'Mont de Milieu': 'fr-chablis-premier-cru-mont-de-milieu', 'Vaupulent': 'fr-chablis-premier-cru-vaupulent'}
    for clim, lst in sorted(extra.items()):
        g = tidy(shapely.union_all([x[1] for x in lst]))
        ha = sum(x[1].area for x in lst) / 1e4
        name = f'Chablis premier cru {clim} (Chablis commune)'
        fid = unique_id(f'fr-{slug("Chablis premier cru " + clim)}-chablis-commune', taken)
        reg = {'climat': clim, 'principal': principal[clim], 'role': 'principal' if principal[clim] == clim else 'satellite',
               'communes': ['Chablis'], 'insee': ['89068'], 'vine_ha': round(ha, 1), 'lieu_dit': sorted({x[2] for x in lst}),
               'part_of': inao_id[clim],
               'note': f'Premier cru land of the cadastral lieu-dit "{lst[0][2]}" in Chablis commune; INAO\'s {clim} DGC polygon covers only the neighbouring commune, so this part is drawn separately.'}
        feats.append({'id': fid, 'name': name, 'alt': [clim], 'country': 'fr', 'cat': 'AOC', 'subcat': 'Premier Cru',
                      'src': SRC, 'bq': 'official', 'area': round(ha / 100, 2), 'parent': 'fr-chablis', 'reg': reg,
                      '_g': polys_only(shapely.make_valid(reproj_2154(g)))})
    out = finish_feats(feats, 'ld', 4)
    print('features', len(out))
    append_fine('fr', out, replace_src=SRC)
    # record principal / satellite on INAO's own Chablis premier cru DGC polygons too (reg only; geometry untouched)
    path = GEO + '/fr_fine.geojson'
    fc = json.load(open(path))
    n = 0
    for f in fc['features']:
        p = f['properties']
        if p.get('src') == 'inao' and p['name'].startswith('Chablis premier cru '):
            clim = p['name'][len('Chablis premier cru '):]
            if clim in principal:
                p['reg']['principal'] = principal[clim]
                p['reg']['role'] = 'principal' if principal[clim] == clim else 'satellite'
                n += 1
    with open(path + '.tmp', 'w', encoding='utf-8') as fo:
        fo.write('{"type":"FeatureCollection","features":[\n')
        fo.write(',\n'.join(json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in fc['features']))
        fo.write('\n]}\n')
    os.replace(path + '.tmp', path)
    print('  principal/satellite set on', n, 'INAO Chablis climats')
    json.dump({'stats': stats, 'chablis_found': sorted(found), 'chablis_missing': sorted(allwant - set(found))},
              open(DWORK + '/lieuxdits_stats.json', 'w'), ensure_ascii=False, indent=1)


T_4326_2154 = Transformer.from_crs(4326, 2154, always_xy=True)
T_2154_4326 = Transformer.from_crs(2154, 4326, always_xy=True)


def reproj_2154(g):
    return reproj(g, T_2154_4326)


if __name__ == '__main__':
    main()
