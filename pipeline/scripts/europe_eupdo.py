# Step 1: EU wine PDOs (Candiago et al. 2022, Sci Data 9:394) -> site/data/geo/{iso2}.geojson
# Usage: python3 -I scripts/europe_eupdo.py [CC ...]   (default: all countries in the dataset)
import sys, os, re, json
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pandas as pd
import geopandas as gpd
import pyogrio

GPKG = RAW + '/eupdo/EU_PDO.gpkg'
CSV = RAW + '/eupdo/PDO_EU_id.csv'
LOG = []


def log(*a):
    s = ' '.join(str(x) for x in a)
    print(s, flush=True)
    LOG.append(s)


# ---------- national labels ----------
IT_DOCG = {
    'Alta Langa', 'Asti', 'Barbaresco', "Barbera d'Asti", 'Barbera del Monferrato Superiore', 'Barolo',
    "Brachetto d'Acqui", 'Dogliani', "Dolcetto di Diano d'Alba", 'Dolcetto di Ovada Superiore',
    'Erbaluce di Caluso', 'Gattinara', 'Gavi', 'Ghemme', 'Nizza', 'Roero', 'Ruchè di Castagnole Monferrato',
    'Terre Alfieri', 'Franciacorta', 'Oltrepò Pavese metodo classico', 'Scanzo', 'Sforzato di Valtellina',
    'Valtellina Superiore', 'Amarone della Valpolicella', 'Recioto della Valpolicella', 'Bardolino Superiore',
    'Colli Asolani - Prosecco', 'Conegliano Valdobbiadene - Prosecco', 'Colli di Conegliano',
    "Colli Euganei Fior d'Arancio", 'Lison', 'Montello Rosso', 'Piave Malanotte', 'Recioto di Gambellara',
    'Recioto di Soave', 'Soave Superiore', 'Bagnoli Friularo', 'Colli Orientali del Friuli Picolit',
    'Ramandolo', 'Rosazzo', 'Romagna Albana', 'Colli Bolognesi Classico Pignoletto',
    'Brunello di Montalcino', 'Carmignano', 'Chianti', 'Chianti Classico', 'Elba Aleatico Passito',
    'Montecucco Sangiovese', 'Morellino di Scansano', 'Suvereto', 'Val di Cornia Rosso',
    'Vernaccia di San Gimignano', 'Vino Nobile di Montepulciano', 'Castelli di Jesi Verdicchio Riserva',
    'Cònero', 'Offida', 'Verdicchio di Matelica Riserva', 'Vernaccia di Serrapetrona',
    'Montefalco Sagrantino', 'Torgiano Rosso Riserva', 'Cannellino di Frascati', 'Cesanese del Piglio',
    'Frascati Superiore', "Montepulciano d'Abruzzo Colline Teramane", 'Terre Tollesi',
    'Aglianico del Taburno', 'Fiano di Avellino', 'Greco di Tufo', 'Taurasi',
    'Castel del Monte Bombino Nero', 'Castel del Monte Nero di Troia Riserva', 'Castel del Monte Rosso Riserva',
    'Primitivo di Manduria Dolce Naturale', 'Aglianico del Vulture Superiore', 'Cerasuolo di Vittoria',
    'Vermentino di Gallura',
}
ES_DOCA = {'Rioja', 'Priorat'}
ES_VP = {'La Jaraba', 'Vallegarcía', 'Los Cerrillos', 'Urueña', 'Dehesa Peñalba', 'Dominio de Valdepusa',
         'Finca Élez', 'Dehesa del Carrizal', 'Campo de La Guardia', 'Calzadilla', 'Pago Florentino', 'Guijoso',
         'Casa del Blanco', 'Prado de Irache', 'Pago de Arínzano', 'Pago de Otazu', 'El Terrerazo',
         'Los Balagueses', 'Aylés', 'El Vicario', 'Chozas Carrascal', 'Vera de Estenas'}
ES_VC = {'Valtiendas', 'Lebrija'}
DE_ANBAU = {'Ahr', 'Baden', 'Franken', 'Hessische Bergstraße', 'Mittelrhein', 'Mosel', 'Nahe', 'Pfalz',
            'Rheingau', 'Rheinhessen', 'Saale-Unstrut', 'Sachsen', 'Württemberg'}
AT_DAC = {'Wachau', 'Weinviertel', 'Kremstal', 'Kamptal', 'Traisental', 'Mittelburgenland', 'Eisenberg',
          'Leithaberg', 'Carnuntum', 'Neusiedlersee', 'Süd-Oststeiermark', 'Südsteiermark', 'Thermenregion',
          'Wagram', 'Weststeiermark'}
AT_REGION = {'Burgenland', 'Niederösterreich', 'Steiermark', 'Wien'}
AT_EXTRA_ALT = {'Süd-Oststeiermark': ['Vulkanland Steiermark'], 'Wien': ['Wiener Gemischter Satz']}
FR_GC = {'Chambertin', 'Chambertin-Clos de Bèze', 'Chapelle-Chambertin', 'Charmes-Chambertin',
         'Griotte-Chambertin', 'Latricières-Chambertin', 'Mazis-Chambertin', 'Mazoyères-Chambertin',
         'Ruchottes-Chambertin', 'Clos de la Roche', 'Clos Saint-Denis', 'Clos de Tart', 'Clos des Lambrays',
         'Bonnes-Mares', 'Musigny', 'Clos de Vougeot', 'Echezeaux', 'Grands-Echezeaux', 'Richebourg',
         'Romanée-Conti', 'Romanée-Saint-Vivant', 'La Romanée', 'La Tâche', 'La Grande Rue', 'Corton',
         'Corton-Charlemagne', 'Charlemagne', 'Montrachet', 'Chevalier-Montrachet', 'Bâtard-Montrachet',
         'Bienvenues-Bâtard-Montrachet', 'Criots-Bâtard-Montrachet', 'Chablis grand cru', 'Chablis Grand Cru'}

GREEK = {
    'Ραψάνη': 'Rapsani', 'Μαυροδάφνη Πατρών': 'Mavrodafni Patron', 'Μαυροδάφνη Κεφαλληνίας': 'Mavrodafni Kefallinias',
    'Σαντορίνη': 'Santorini', 'Μοσχάτο Πατρών': 'Moschato Patron', 'Πλαγιές Μελίτωνα': 'Plagies Melitona',
    'Πάτρα': 'Patra', 'Ρομπόλα Κεφαλληνίας': 'Robola Kefallinias', 'Γουμένισσα': 'Goumenissa',
    'Μεσενικόλα': 'Mesenikola', 'Μοσχάτος Ρίου Πάτρας': 'Moschatos Riou Patras', 'Αρχάνες': 'Archanes',
    'Δαφνές': 'Dafnes', 'Αμύνταιο': 'Amyntaio', 'Πεζά': 'Peza', 'Μοσχάτος Λήμνου': 'Moschatos Limnou',
    'Αγχίαλος': 'Anchialos', 'Ζίτσα': 'Zitsa', 'Μονεμβασία- Malvasia': 'Monemvasia-Malvasia',
    'Μαντινεία': 'Mantinia', 'Σάμος': 'Samos', 'Μοσχάτος Κεφαλληνίας': 'Moschatos Kefallinias',
    'Μοσχάτος Ρόδου': 'Moschatos Rodou', 'Πάρος': 'Paros', 'Νεμέα': 'Nemea', 'Malvasia Πάρος': 'Malvasia Paros',
    'Malvasia Σητείας': 'Malvasia Sitias', 'Νάουσα': 'Naoussa', 'Ρόδος': 'Rodos', 'Σητεία': 'Sitia',
    'Λήμνος': 'Limnos', 'Χάνδακας - Candia': 'Chandakas-Candia', 'Malvasia Χάνδακας-Candia': 'Malvasia Chandakas-Candia',
    'Κουμανδαρία': 'Commandaria', 'Κρασοχώρια Λεμεσού - Αφάμης': 'Krasochoria Lemesou-Afames',
    'Κρασοχώρια Λεμεσού - Λαόνα': 'Krasochoria Lemesou-Laona', 'Βουνί Παναγιάς – Αμπελίτης': 'Vouni Panagias-Ampelitis',
    'Λαόνα Ακάμα': 'Laona Akama', 'Πιτσιλιά': 'Pitsilia', 'Κρασοχώρια Λεμεσού': 'Krasochoria Lemesou',
}
GREEK_EXTRA_ALT = {'Rodos': ['Rhodes'], 'Mavrodafni Patron': ['Mavrodaphne of Patras'],
                   'Mavrodafni Kefallinias': ['Mavrodaphne of Cephalonia'], 'Moschato Patron': ['Muscat of Patras'],
                   'Moschatos Riou Patras': ['Muscat of Rio Patras'], 'Moschatos Limnou': ['Muscat of Lemnos'],
                   'Moschatos Kefallinias': ['Muscat of Cephalonia'], 'Moschatos Rodou': ['Muscat of Rhodes'],
                   'Robola Kefallinias': ['Robola of Cephalonia'], 'Plagies Melitona': ['Slopes of Meliton'],
                   'Limnos': ['Lemnos'], 'Mantinia': ['Mantineia'], 'Naoussa': ['Naousa'], 'Amyntaio': ['Amyndeon'],
                   'Commandaria': ['Koumandaria'], 'Chandakas-Candia': ['Handakas-Candia'],
                   'Malvasia Chandakas-Candia': ['Malvasia Handakas-Candia'], 'Monemvasia-Malvasia': ['Monemvasia Malvasia']}
BG_MAP = dict(zip('абвгдежзийклмнопрстуфхцчшщъьюя',
                  ['a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u',
                   'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'y', 'yu', 'ya']))
BG_EXTRA = {'Южно Черноморие': 'Yuzhno Chernomorie', 'Черноморски район': 'Chernomorski rayon',
            'Долината на Струма': 'Dolinata na Struma'}


def bg_translit(s):
    if s in BG_EXTRA:
        return BG_EXTRA[s]
    out = []
    for ch in s:
        lo = ch.lower()
        if lo in BG_MAP:
            t = BG_MAP[lo]
            out.append(t.capitalize() if ch != lo else t)
        else:
            out.append(ch)
    return ''.join(out)


def split_name(cc, raw):
    raw = raw.strip()
    parts = [p.strip() for p in raw.split(' / ')]
    name, alt = parts[0], parts[1:]
    if cc in ('GR', 'CY'):
        lat = GREEK.get(raw) or GREEK.get(name) or unidecode(name)
        alt = [raw] + GREEK_EXTRA_ALT.get(lat, [])
        name = lat
    elif cc == 'BG':
        lat = bg_translit(name)
        alt = [name] + alt
        name = lat
    if cc == 'GB':
        name = {'English': 'English Wine', 'Welsh': 'Welsh Wine'}.get(name, name)
        if name.endswith('Wine'):
            alt = [raw]
    if cc == 'HU' and name == 'Tokaj':
        alt = ['Tokaji']
    if cc == 'AT':
        alt += AT_EXTRA_ALT.get(name, [])
    # de-duplicate alt
    seen, a2 = {name}, []
    for a in alt:
        if a and a not in seen:
            seen.add(a)
            a2.append(a)
    return name, a2


def national_cat(cc, name):
    subcat = None
    if cc == 'FR':
        cat = 'AOC'
        if name in FR_GC or name.startswith('Alsace grand cru'):
            subcat = 'Grand Cru'
    elif cc == 'IT':
        cat = 'DOCG' if name in IT_DOCG else 'DOC'
    elif cc == 'ES':
        cat = 'DOCa' if name in ES_DOCA else 'VP' if name in ES_VP else 'DO'
    elif cc == 'PT':
        cat = 'DOC'
    elif cc == 'DE':
        cat = 'Anbaugebiet' if name in DE_ANBAU else 'PDO'
        if cat == 'PDO':
            subcat = 'Einzellage'
    elif cc == 'AT':
        cat = 'DAC' if name in AT_DAC else 'PDO'
        if name in AT_REGION:
            subcat = 'Region'
    elif cc == 'RO':
        cat = 'DOC'
    elif cc == 'LU':
        cat = 'AOP'
    else:
        cat = 'PDO'
    return cat, subcat


COLOR_CODES = {'N', 'B', 'G', 'Rs', 'Rg', 'Gr', 'R'}


def parse_varieties(*cols):
    out, colours = [], set()
    for c in cols:
        if not isinstance(c, str) or c.strip().lower() in ('na', ''):
            continue
        for t in c.split('/'):
            t = t.strip()
            if not t or t.lower() == 'na':
                continue
            toks = t.split(' ')
            if len(toks) > 1 and toks[-1] in COLOR_CODES:
                colours.add(toks[-1])
                t = ' '.join(toks[:-1])
            if t not in out:
                out.append(t)
    return out, colours


SWEET_RE = re.compile(r'Recioto|Passito|Vin Santo|Tokaj|Sciacchetr|Ramandolo|Picolit|Dolce|Moscato di|Malvasia delle Lipari|'
                      r'Sauternes|Barsac|Loupiac|Cadillac|Cérons|Sainte-Croix|Monbazillac|Saussignac|Bonnezeaux|Quarts de Chaume|'
                      r'Coteaux du Layon|Commandaria|Moschat|Mavrodafni|Samos|Málaga|Rivesaltes|Muscat|Maury|Banyuls|Grand Roussillon|'
                      r'Pineau|Floc|Macvin|Rasteau|Cotnari|Moscatel|Setúbal|Carcavelos|Montilla|Condado de Huelva|Marsala|Pantelleria|'
                      r'Aleatico|Caluso|Loazzolo|Monica di|Girò|Nasco|Fior d.Arancio|Primitivo di Manduria Dolce|Torcolato|Mantonico|Greco di Bianco|Ruster|Vinohradnícka oblasť Tokaj|Karpatská perla|Slámové',
                      re.I)
ROSE_RE = re.compile(r'Rosé|Rosato|Rosado|Cerasuolo|Riceys|Tavel|Schilcher|Weststeiermark|Bardolino|Chiaretto|Valtènesi|Cabernet d.Anjou', re.I)
FORT_NAME_RE = re.compile(r'Porto|Madeira|Jerez|Manzanilla|Marsala|Montilla|Málaga|Rivesaltes|Banyuls|Maury|Muscat de |Rasteau|'
                          r'Pineau|Floc|Macvin|Grand Roussillon|Commandaria|Setúbal|Carcavelos|Condado de Huelva|Mavrodafni|Moscatel de Setúbal', re.I)


def styles_from(cats, colours, name):
    st = []
    has_wine = any(c in ('Wine', 'Liqueur Wine', 'Wine From Raisined Grapes', 'Wine Of Overripe Grapes',
                         'Wine From Overripe Grapes') for c in cats) or not cats
    if has_wine:
        if 'N' in colours or 'Rg' in colours:
            st.append('red')
        if colours & {'B', 'G', 'Gr', 'Rs'}:
            st.append('white')
    if ROSE_RE.search(name) and 'rose' not in st:
        st.append('rose')
    if any('Sparkling' in c for c in cats):
        st.append('sparkling')
    if any(c.lower().startswith(('liqueur', 'liquer')) for c in cats) or FORT_NAME_RE.search(name):
        st.append('fortified')
    if any(('Raisined' in c or 'Overripe' in c) for c in cats) or SWEET_RE.search(name):
        st.append('sweet')
    order = ['red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange']
    return [s for s in order if s in st]


def num(v):
    try:
        f = float(v)
        return int(f) if f == int(f) else f
    except Exception:
        return None


def build_rows(cc):
    d = pd.read_csv(CSV, encoding='utf-8-sig', dtype=str)
    d = d[d.Country == cc].copy()
    return d


def row_attrs(r):
    cats = [c.strip() for c in str(r.Category_of_wine_product).split('/') if c.strip() and c.strip().lower() != 'na']
    cats = ['Liqueur Wine' if c == 'Liquer Wine' else c for c in cats]
    vars_, colours = parse_varieties(r.Varieties_OIV, r.Varieties_Other)
    m = re.search(r'details/([A-Z0-9]+)$', str(r.PDOinfo))
    reg = {'eu_file': r.PDOid}
    if m:
        reg['eambrosia'] = m.group(1)
    if isinstance(r.Registration, str) and r.Registration[:4].isdigit():
        reg['eu_reg'] = r.Registration
    yh, yk, dens = num(r.Maximum_yield_hl), num(r.Maximum_yield_kg), num(r.Minimum_planting_density)
    if yh:
        reg['max_hl_ha'] = yh
    if yk:
        reg['max_kg_ha'] = yk
    if dens:
        reg['min_vines_ha'] = dens
    if isinstance(r.Irrigation, str) and r.Irrigation != 'na':
        reg['irrigation'] = r.Irrigation.lower()
    if cats:
        reg['products'] = cats
    return cats, vars_, colours, reg


GEOM_NOTE = {}


def build_feats(cc, gdf_all):
    """Return list of feature dicts (props + '_g' in EPSG:4326, unsimplified) for one country."""
    iso = cc.lower()
    d = build_rows(cc)
    g = gdf_all[gdf_all.PDOid.isin(d.PDOid)].merge(d, on='PDOid')
    if cc == 'ES':
        # Data fix: Valdeorras (PDO-ES-A1132) carries Alicante's municipality list/polygon in the dataset.
        # Rebuild from its 8 concellos (DOP single document, Xunta/AGACAL Oct 2024) using IGN-derived
        # municipalities from geoBoundaries ESP ADM3 (CC BY 4.0).
        mun = gpd.read_file(RAW + '/es_geoboundaries/geoBoundaries-ESP-ADM3.geojson')
        names = ['O Barco de Valdeorras', 'A Rúa', 'Vilamartín de Valdeorras', 'O Bolo', 'Carballeda de Valdeorras',
                 'Larouco', 'Petín', 'Rubiá']
        sel = mun[mun.shapeName.isin(names)].to_crs(3035)
        assert len(sel) == 8, sel.shapeName.tolist()
        g.loc[g.PDOnam == 'Valdeorras', 'geometry'] = shapely.union_all(shapely.make_valid(sel.geometry.values))
        g.loc[g.PDOnam == 'Valdeorras', 'Municip_nam'] = '/'.join(names)
        GEOM_NOTE['Valdeorras'] = 'geometry rebuilt from its 8 concellos (dataset had Alicante)'
        log('  fix: Valdeorras rebuilt from 8 Ourense concellos (dataset carried Alicante)')
    if cc == 'BG':
        # Data fix: Novi Pazar (PDO-BG-A1031) lists only Veliki Preslav; use Novi Pazar obshtina (Shumen).
        lau = pyogrio.read_dataframe(RAW + '/gisco_lau/LAU_RG_01M_2021_3035.gpkg', where="CNTR_CODE = 'BG'")
        sel = lau[lau.LAU_NAME == 'Нови пазар']
        assert len(sel) == 1
        g.loc[g.PDOid == 'PDO-BG-A1031', 'geometry'] = sel.geometry.iloc[0]
        GEOM_NOTE['Нови Пазар'] = 'geometry = Novi Pazar municipality (dataset listed Veliki Preslav only)'
        log('  fix: Novi Pazar geometry = Novi Pazar obshtina (GISCO LAU 2021)')
    if cc == 'IT':
        # Data fix: the dataset's Chianti Classico polygon carries the (much wider) Chianti commune list
        # (7,333 km2). The real zone covers the 8 communes of Vin Santo del Chianti Classico, so reuse that.
        vs = g.loc[g.PDOnam == 'Vin Santo del Chianti Classico', 'geometry'].values[0]
        g.loc[g.PDOnam == 'Chianti Classico', 'geometry'] = vs
        GEOM_NOTE['Chianti Classico'] = 'geometry = the 8 Chianti Classico communes (dataset carried the wider Chianti list)'
        log('  fix: Chianti Classico geometry replaced by the Vin Santo del Chianti Classico commune union')
    # merge same-name PDOs (Romania registers one PDO per product category)
    groups = {}
    for _, r in g.iterrows():
        name, alt = split_name(cc, r.PDOnam)
        groups.setdefault(name, []).append((r, alt))
    feats = []
    names = list(groups.keys())
    ids = make_ids(names, iso)
    for fid, name in zip(ids, names):
        rows = groups[name]
        cats_all, vars_all, col_all, regs = [], [], set(), []
        geoms = []
        alt = []
        for r, a in rows:
            cats, vars_, colours, reg = row_attrs(r)
            for c in cats:
                if c not in cats_all:
                    cats_all.append(c)
            for v in vars_:
                if v not in vars_all:
                    vars_all.append(v)
            col_all |= colours
            regs.append(reg)
            geoms.append(r.geometry)
            for x in a:
                if x not in alt:
                    alt.append(x)
        geom = shapely.union_all([shapely.make_valid(x) for x in geoms]) if len(geoms) > 1 else shapely.make_valid(geoms[0])
        geom = clean_projected(geom, min_hole_km2=0.2, min_part_km2=0.02)
        if geom is None or geom.is_empty:
            log(f'  SKIP {fid}: empty geometry')
            continue
        area = geom.area / 1e6
        if len(regs) == 1:
            reg = regs[0]
        else:
            # prefer the still-wine record for yields; list all EU files
            base = next((x for x in regs if x.get('products') == ['Wine']), regs[0])
            reg = dict(base)
            reg['eu_file'] = [x['eu_file'] for x in regs]
            reg['eambrosia'] = [x.get('eambrosia') for x in regs if x.get('eambrosia')]
            reg['products'] = cats_all
        cat, subcat = national_cat(cc, name)
        for raw_name, note in GEOM_NOTE.items():
            if raw_name in (name, rows[0][0].PDOnam) or raw_name in (alt or []):
                reg = dict(reg)
                reg['geom_note'] = note
        g4326 = reproj(geom, T_3035_4326)
        feats.append({
            'id': fid, 'name': name, 'alt': alt or None, 'country': iso, 'cat': cat, 'subcat': subcat,
            'src': 'eupdo', 'bq': 'commune', 'area': round(area, 1),
            'varieties': vars_all, 'styles': styles_from(cats_all, col_all, name), 'reg': reg,
            '_g': g4326,
        })
    return feats


def process_country(cc, gdf_all, ideal, cap):
    iso = cc.lower()
    feats = build_feats(cc, gdf_all)
    out_path = f'{GEO}/{iso}.geojson'
    intervals = [30, 40, 50, 60, 75, 90, 110, 130, 160, 200, 250, 320, 400]
    out, iv, size = finalize(feats, f'eupdo_{iso}', out_path, ideal, cap, intervals, log=log)
    return out, iv, size



if __name__ == '__main__':
    gdf_all = gpd.read_file(GPKG)
    ccs = sys.argv[1:] or [c for c in sorted(pd.read_csv(CSV, encoding='utf-8-sig', dtype=str).Country.unique())
                           if c not in ('GB', 'FR')]  # GB: europe_gb.py, FR: europe_fr.py
    summary = {}
    for cc in ccs:
        log(f'== {cc}')
        big = cc in ('FR', 'IT')
        ideal, cap = (3_500_000, 5_000_000) if big else (2_000_000, 4_000_000)
        out, iv, size = process_country(cc, gdf_all, ideal, cap)
        summary[cc] = {'features': len(out), 'interval_m': iv, 'bytes': size}
    os.makedirs(WORK, exist_ok=True)
    prev = {}
    sp = f'{WORK}/eupdo_summary.json'
    if os.path.exists(sp):
        prev = json.load(open(sp))
    prev.update(summary)
    json.dump(prev, open(sp, 'w'), indent=1)
    with open(f'{WORK}/eupdo_run.log', 'a') as f:
        f.write('\n'.join(LOG) + '\n')
