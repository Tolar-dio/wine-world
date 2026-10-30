# Veneto official wine-zone lines: Regione del Veneto, Direzione Agroalimentare, "Disciplinari dei vini DOCG, DOC e
# IGT" page, delimitations of the schedario vitivinicolo veneto reprojected to WGS84 and published as KML in ZIP
# (raw/veneto_do/, one folder per zip). Reuse allowed with citation of the source (regione.veneto.it legal notes).
#  A. Fine units -> it_fine.geojson (src "veneto", bq official):
#     Soave UGAs (33), Soave Classico, Soave Colli Scaligeri, the 43 Rive and Superiore di Cartizze of Conegliano
#     Valdobbiadene, Valpolicella Classico and Valpantena (shared by Amarone, Recioto, Ripasso), Bardolino Classico,
#     Bagnoli Classico, Gambellara Classico and its 6 sottozone, Lison Classico, Venegazzù (Asolo Montello),
#     Refrontolo and Torchiato di Fregona (Colli di Conegliano), Prosecco Treviso.
#  B. Main zones in it.geojson -> official lines where the KML covers the whole zone (Veneto-only DOs); ids and
#     other properties kept; old geometry in work/fine_backup/it.geojson.
# Usage: python3 -I scripts/depth_it_veneto.py [--write] [--plot]
import sys, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_it_common import *
import geopandas as gpd
from shapely.geometry import shape

SRC = 'veneto'
VD = RAW + '/veneto_do'
T_3035 = Transformer.from_crs(4326, 3035, always_xy=True)

SOAVE_NAMES = {'Frosca': 'Froscà', 'Fittà': 'Fittà'}
RULE_RIVE = ('DOCG Conegliano Valdobbiadene - Prosecco disciplinare art. 7 and Allegato A (43 Rive): grapes from a single '
             'comune or frazione, hand-picked, max 13 t/ha, min 9.5% vol natural, vintage on the label')


def load_kmls():
    D = {}
    for k in glob.glob(VD + '/x_*/**/*.kml', recursive=True):
        for a, g in kml_placemarks(k):
            key = a.get('denominazi') or a.get('Nome_CRU') or a.get('RIVA') or a.get('_name')
            D.setdefault(os.path.basename(k), []).append((a, g))
    return D


def one(D, fname):
    lst = D[fname]
    g = shapely.union_all([x[1] for x in lst])
    return polys_only(shapely.make_valid(g))


def km2(g):
    return area_km2_4326(g)


def comuni_of(g, lau, lau3035):
    g3 = shapely.make_valid(reproj(g, T_3035))
    out = []
    for i in lau3035.sindex.query(g3, predicate='intersects'):
        r = lau3035.iloc[i]
        a = r.geometry.intersection(g3).area
        if a >= 0.25 * g3.area or a >= 0.5e6 or a >= 0.5 * r.geometry.area:
            out.append((r.LAU_NAME, a))
    out.sort(key=lambda x: -x[1])
    return [n for n, a in out]


def main():
    write = '--write' in sys.argv
    D = load_kmls()
    lau = gpd.read_file(RAW + '/gisco_lau/LAU_RG_01M_2021_3035.gpkg', where="CNTR_CODE='IT'")
    lau = lau[lau.LAU_ID.str[:3].isin(['023', '024', '025', '026', '027', '028', '029'])].reset_index(drop=True)
    lau['geometry'] = lau.geometry.make_valid()
    feats = []

    def add(fid, name, alt, cat, subcat, parent, g, reg, styles=None, varieties=None):
        g = polys_only(shapely.make_valid(g))
        reg = dict(reg)
        reg.setdefault('comuni', comuni_of(g, lau, lau))
        feats.append({'id': fid, 'name': name, 'alt': alt, 'country': 'it', 'cat': cat, 'subcat': subcat, 'src': SRC,
                      'bq': 'official', 'area': round(km2(g), 2 if km2(g) < 1 else 1), 'parent': parent,
                      'styles': styles, 'varieties': varieties, 'reg': reg, '_g': g})

    # ---- Soave UGAs
    for a, g in D['Soave_UGA.kml']:
        nm = a['Nome_CRU'].strip()
        nm = SOAVE_NAMES.get(nm, nm)
        add(f'it-soave-{slug(nm)}', nm, [f'Soave {nm}', f'UGA {nm}'], 'DOC', 'UGA', 'it-soave', g,
            {'doc': 'Soave', 'year': 2019, 'use': 'Soave, Soave Classico, Soave Colli Scaligeri, Soave Superiore and Recioto di Soave',
             'rule': 'DOC Soave disciplinare art. 7 and Allegato A (33 UGA, DM 2019); lines from the schedario viticolo veneto'},
            styles=['white'], varieties=['Garganega', 'Trebbiano di Soave'])
    # ---- Soave Classico / Colli Scaligeri
    add('it-soave-classico', 'Soave Classico', ['Soave Classico zone'], 'DOC', 'Classico', 'it-soave',
        one(D, 'SOAVE CLASSICO.kml'),
        {'doc': 'Soave', 'note': 'The original 1927 zone on the hills of Soave and Monteforte d\'Alpone; the same line '
                                 'defines Soave Superiore Classico and Recioto di Soave Classico.',
         'rule': 'DOC Soave disciplinare art. 3 B'}, styles=['white'])
    add('it-soave-colli-scaligeri', 'Soave Colli Scaligeri', ['Colli Scaligeri'], 'DOC', 'Sottozona', 'it-soave',
        one(D, 'SOAVE COLLI SCALIGERI.kml'),
        {'doc': 'Soave', 'note': 'Hill sottozona of the Soave DOC outside the Classico zone.',
         'rule': 'DOC Soave disciplinare art. 3 C'}, styles=['white'])
    # ---- Conegliano Valdobbiadene: Rive and Cartizze
    cvp = 'it-conegliano-valdobbiadene-prosecco'
    rive = {}
    for a, g in D['Rive.kml']:
        r = a['RIVA'].strip()
        rive.setdefault(r, {'g': [], 'com': a['NOMCOM'], 'cod': int(float(a['COD'])), 'istat': a['CODISTAT']})['g'].append(g)
    for r, d in sorted(rive.items(), key=lambda x: x[1]['cod']):
        nm = 'Rive di ' + ('Pieve di Soligo' if r == 'Pieve' else r)
        g = shapely.union_all(d['g'])
        alt = [f'Rive {r}', f'Conegliano Valdobbiadene Prosecco Superiore Rive di {r}']
        add(f'{cvp}-{slug(nm)}', nm, alt, 'DOCG', 'Rive', cvp, g,
            {'docg': 'Conegliano Valdobbiadene - Prosecco', 'rive_no': d['cod'], 'comuni': [d['com']],
             'kind': 'comune' if r == d['com'] or (r == 'Pieve' and d['com'] == 'Pieve di Soligo') else 'frazione',
             'year': 2009, 'rule': RULE_RIVE}, styles=['sparkling', 'white'], varieties=['Glera'])
    add(f'{cvp}-cartizze', 'Superiore di Cartizze', ['Cartizze', 'Valdobbiadene Superiore di Cartizze',
                                                     'Conegliano Valdobbiadene Prosecco Superiore di Cartizze'],
        'DOCG', 'Sottozona', cvp, one(D, 'CONEGLIANO VALDOBBIADENE PROSECCO SUPERIORE DI CARTIZZE.kml'),
        {'docg': 'Conegliano Valdobbiadene - Prosecco', 'comuni': ['Valdobbiadene'],
         'frazioni': ['San Pietro di Barbozza', 'Santo Stefano', 'Saccol'], 'ha_published': 106,
         'max_t_ha': 12.0, 'min_alc_nat': 9.5, 'year': 1969,
         'rule': 'DOCG Conegliano Valdobbiadene - Prosecco disciplinare art. 3 B: the hill amphitheatre between the '
                 'Teva, the Fosso delle Zente and the Fosso Piagar above San Pietro di Barbozza'},
        styles=['sparkling', 'white'], varieties=['Glera'])
    # ---- Valpolicella Classico and Valpantena
    vp_note = 'The same line applies to Amarone della Valpolicella, Recioto della Valpolicella and Valpolicella Ripasso.'
    add('it-valpolicella-classico', 'Valpolicella Classico', ['Valpolicella Classica', 'Classico'], 'DOC', 'Classico',
        'it-valpolicella', one(D, 'VALPOLICELLA CLASSICO.kml'),
        {'doc': 'Valpolicella', 'comuni': ['Negrar di Valpolicella', 'Marano di Valpolicella', 'Fumane',
                                           "Sant'Ambrogio di Valpolicella", 'San Pietro in Cariano'],
         'note': 'The historic zone of the five western valleys. ' + vp_note,
         'rule': 'DOC Valpolicella disciplinare art. 3 (3)'}, styles=['red'],
        varieties=['Corvina', 'Corvinone', 'Rondinella'])
    add('it-valpolicella-valpantena', 'Valpantena', ['Valpolicella Valpantena', 'Valpantena Valley'], 'DOC',
        'Sottozona', 'it-valpolicella', one(D, 'VALPOLICELLA VALPANTENA.kml'),
        {'doc': 'Valpolicella', 'note': 'Geographic specification for the Valpantena valley north-east of Verona. ' + vp_note,
         'rule': 'DOC Valpolicella disciplinare art. 3 (2)'}, styles=['red'],
        varieties=['Corvina', 'Corvinone', 'Rondinella'])
    # ---- other Veneto classico zones and sottozone
    add('it-bardolino-classico', 'Bardolino Classico', ['Classico'], 'DOC', 'Classico', 'it-bardolino',
        one(D, 'BARDOLINO CLASSICO.kml'),
        {'doc': 'Bardolino', 'note': 'Historic lakeside zone (Bardolino, Garda, Lazise, Affi, Costermano, Cavaion '
                                     'Veronese); the same line defines Bardolino Superiore Classico.',
         'rule': 'DOC Bardolino disciplinare art. 3'}, styles=['red', 'rose'],
        varieties=['Corvina', 'Rondinella', 'Molinara'])
    add('it-bagnoli-di-sopra-classico', 'Bagnoli Classico', ['Bagnoli di Sopra Classico'], 'DOC', 'Classico',
        'it-bagnoli-di-sopra', one(D, 'BAGNOLI CLASSICO.kml'),
        {'doc': 'Bagnoli di Sopra', 'rule': 'DOC Bagnoli di Sopra disciplinare art. 3'})
    add('it-gambellara-classico', 'Gambellara Classico', ['Classico'], 'DOC', 'Classico', 'it-gambellara',
        one(D, 'GAMBELLARA CLASSICO.kml'),
        {'doc': 'Gambellara', 'rule': 'DOC Gambellara disciplinare art. 3'}, styles=['white'], varieties=['Garganega'])
    for z in ['SAN MARCO', 'MONTI DI MEZZO', 'FALDEO', 'TAIBANE', 'SELVA', 'CREARI']:
        nm = z.title()
        add(f'it-gambellara-{slug(nm)}', nm, [f'Gambellara {nm}', f'Zona {nm}'], 'DOC', 'Sottozona', 'it-gambellara',
            one(D, f'GAMBELLARA ZONA {z}.kml'),
            {'doc': 'Gambellara', 'use': 'Gambellara Classico, Superiore and Classico Vin Santo',
             'rule': 'DOC Gambellara disciplinare Allegato A (delimitazione sottozone)'},
            styles=['white'], varieties=['Garganega'])
    add('it-lison-classico', 'Lison Classico', ['Classico'], 'DOCG', 'Classico', 'it-lison',
        one(D, 'LISON CLASSICO.kml'),
        {'docg': 'Lison', 'note': 'Historic zone of Tai (Tocai Friulano) on the Veneto - Friuli border.',
         'rule': 'DOCG Lison disciplinare art. 3'}, styles=['white'], varieties=['Tai'])
    add('it-asolo-montello-venegazzu', 'Venegazzù', ['Montello e Colli Asolani Venegazzù', 'Montello Venegazzù'],
        'DOC', 'Sottozona', 'it-asolo-montello', one(D, "MONTELLO COLLI ASOLANI VENEGAZZU'.kml"),
        {'doc': 'Asolo Montello / Montello e Colli Asolani', 'rule': 'DOC Asolo Montello disciplinare art. 3'})
    add('it-colli-di-conegliano-refrontolo', 'Refrontolo', ['Colli di Conegliano Refrontolo', 'Refrontolo Passito'],
        'DOCG', 'Sottozona', 'it-colli-di-conegliano', one(D, 'COLLI DI CONEGLIANO REFRONTOLO PASSITO.kml'),
        {'docg': 'Colli di Conegliano', 'note': 'Sweet passito from Marzemino.',
         'rule': 'DOCG Colli di Conegliano disciplinare art. 3'}, styles=['red', 'sweet'], varieties=['Marzemino'])
    add('it-colli-di-conegliano-torchiato-di-fregona', 'Torchiato di Fregona',
        ['Colli di Conegliano Torchiato di Fregona'], 'DOCG', 'Sottozona', 'it-colli-di-conegliano',
        one(D, 'COLLI DI CONEGLIANO TORCHIATO DI FREGONA.kml'),
        {'docg': 'Colli di Conegliano', 'note': 'Sweet white from dried Glera, Verdiso and Boschera grapes.',
         'rule': 'DOCG Colli di Conegliano disciplinare art. 3'}, styles=['white', 'sweet'],
        varieties=['Glera', 'Verdiso', 'Boschera'])
    add('it-prosecco-treviso', 'Prosecco Treviso', ['Treviso', 'Prosecco DOC Treviso'], 'DOC', 'Menzione',
        'it-prosecco', one(D, 'PROSECCO TREVISO.kml'),
        {'doc': 'Prosecco', 'comuni': ['all comuni of the province of Treviso in the zone'],
         'rule': 'DOC Prosecco disciplinare art. 3 and 7: the geographic mention "Treviso"'},
        styles=['sparkling', 'white'], varieties=['Glera'])

    # check ids
    taken = all_ids(SRC)
    for f in feats:
        if f['id'] in taken:
            raise SystemExit('id clash ' + f['id'])
    ids = [f['id'] for f in feats]
    assert len(ids) == len(set(ids))
    out = finish_feats(feats, 'it_veneto', 10, tier_fn=tier_mult_fine)
    print('fine units:', len(out))
    from collections import Counter
    print(Counter(f['subcat'] for f in out))

    # ---- B. main zone replacements
    fc = json.load(open(GEO + '/it.geojson'))
    main = {f['properties']['id']: f for f in fc['features']}
    MAP = {'AMARONE VALPOLICELLA.kml': ['it-amarone-della-valpolicella'],
           'RECIOTO VALPOLICELLA.kml': ['it-recioto-della-valpolicella'],
           'VALPOLICELLA.kml': ['it-valpolicella'], 'VALPOLICELLA RIPASSO.kml': ['it-valpolicella-ripasso'],
           'BAGNOLI.kml': ['it-bagnoli-di-sopra', 'it-bagnoli-friularo'],
           'BARDOLINO.kml': ['it-bardolino'], 'BARDOLINO SUPERIORE.kml': ['it-bardolino-superiore'],
           'BIANCO DI CUSTOZA.kml': ['it-bianco-di-custoza'], 'BREGANZE.kml': ['it-breganze'],
           'COLLI ASOLANI PROSECCO.kml': ['it-colli-asolani-prosecco'], 'COLLI BERICI.kml': ['it-colli-berici'],
           'COLLI DI CONEGLIANO.kml': ['it-colli-di-conegliano'],
           'COLLI EUGANEI FIOR D ARANCIO.kml': ['it-colli-euganei-fior-d-arancio'],
           'CONEGLIANO VALDOBBIADENE PROSECCO.kml': ['it-conegliano-valdobbiadene-prosecco'],
           'GAMBELLARA.kml': ['it-gambellara'], 'RECIOTO DI GAMBELLARA.kml': ['it-recioto-di-gambellara'],
           'LISON.kml': ['it-lison'], 'LISON PRAMAGGIORE.kml': ['it-lison-pramaggiore'],
           'LUGANA.kml': ['it-lugana'], 'MERLARA.kml': ['it-merlara'],
           'MONTELLO E COLLI ASOLANI.kml': ['it-asolo-montello', 'it-montello-rosso'],
           'PIAVE.kml': ['it-piave'], 'PIAVE MALANOTTE.kml': ['it-piave-malanotte'], 'PROSECCO.kml': ['it-prosecco'],
           'RECIOTO SOAVE.kml': ['it-recioto-di-soave'], 'SOAVE.kml': ['it-soave'],
           'SOAVE SUPERIORE.kml': ['it-soave-superiore'], 'VALDADIGE.kml': ['it-valdadige'],
           'VENEZIA.kml': ['it-venezia'], 'VIGNETI DELLA SERENISSIMA.kml': ['it-vigneti-della-serenissima']}
    veneto_reg = shapely.make_valid(shapely.union_all(list(lau.geometry))).buffer(200)
    repl = {}
    for fn, fids in MAP.items():
        g = one(D, fn)
        for fid in fids:
            if fid not in main:
                print('  (no main feature)', fid)
                continue
            old = shape(main[fid]['geometry'])
            old3 = shapely.make_valid(reproj(old, T_3035))
            outside = old3.difference(veneto_reg).area / old3.area
            p = main[fid]['properties']
            if outside > 0.03:
                # cross-regional zone: Veneto part official, rest stays the EU commune union
                rest = polys_only(shapely.make_valid(reproj(old3.difference(veneto_reg.buffer(-200)), T_3035_4326)))
                gg = polys_only(shapely.make_valid(shapely.union_all([g, rest])))
                bq = 'commune'
                note = (f'Veneto part: Regione del Veneto official zone line; outside Veneto ({outside*100:.0f}% of the EU '
                        f'commune union): EU commune union.')
            else:
                gg, bq = g, 'official'
                note = f'Regione del Veneto official zone line (schedario vitivinicolo); replaces the EU commune union ({p["area"]} km2).'
            a = km2(gg)
            reg = dict(p.get('reg') or {})
            reg['geom_note'] = note
            repl[fid] = {'id': fid, 'name': p['name'], 'area': round(a, 1), 'bq': bq, 'reg': reg, '_g': gg, '_old': p['area']}
            print(f'  {fid}: {p["area"]} -> {a:.1f} km2 ({bq})')
    done = {f['id']: f for f in finish_feats(list(repl.values()), 'it_ven_main', 35, tier_fn=tier_mult)}
    pool = []
    for fid, f in main.items():
        g = done[fid]['_g'] if fid in done else shape(f['geometry'])
        pool.append({'id': fid, '_g': g, 'area': done[fid]['area'] if fid in done else f['properties']['area']})
    pars = dict(zip([x['id'] for x in pool], compute_parents(pool)))
    pch = {}
    for fid, f in main.items():
        par = f['properties'].get('parent')
        if (fid in repl or par in repl) and pars[fid] != par:
            pch[fid] = pars[fid]
            print('  parent change', fid, par, '->', pars[fid])
    replace = {}
    for fid in repl:
        d = done[fid]
        upd = {'src': SRC if repl[fid]['bq'] == 'official' else main[fid]['properties']['src'] + '+' + SRC,
               'bq': repl[fid]['bq'], 'area': repl[fid]['area'], 'lp': d['lp'], 'bbox': d['bbox'], 'reg': repl[fid]['reg']}
        if repl[fid]['bq'] != 'official':
            upd['src'] = SRC
        if fid in pch:
            upd['parent'] = pch[fid]
        replace[fid] = (upd, d['_g'])
    for fid, newp in pch.items():
        if fid not in replace:
            replace[fid] = ({'parent': newp}, shape(main[fid]['geometry']))
    with open(DWORK + '/it_veneto_areas.tsv', 'w') as fh:
        for fid, r in sorted(repl.items(), key=lambda x: -x[1]['_old']):
            fh.write(f'{fid}\t{r["_old"]}\t{r["area"]}\t{r["bq"]}\n')
    if write:
        write_main('it', replace=replace)
        append_fine('it', out, replace_src=SRC)
        rows = [dict(f, _file='it_fine.geojson') for f in out]
        for fid in replace:
            p = main[fid]['properties']
            rows.append({'id': fid, 'name': p['name'], 'parent': pch.get(fid, p.get('parent')), 'subcat': p.get('subcat'),
                         'cat': p['cat'], '_file': 'it.geojson',
                         '_action': 'geometry replaced (official line)' if fid in repl else 'parent changed'})
        record_ids('veneto', rows)
    if '--plot' in sys.argv:
        import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
        fig, axs = plt.subplots(1, 2, figsize=(18, 9))
        for ax, sel in zip(axs, [lambda f: f['parent'] == 'it-soave', lambda f: f['parent'] == cvp]):
            for f in out:
                if sel(f):
                    for p in getattr(f['_g'], 'geoms', [f['_g']]):
                        ax.fill(*p.exterior.xy, alpha=0.5)
                    ax.text(*f['lp'], f['name'].replace('Rive di ', ''), fontsize=6)
            ax.set_aspect(1.4)
        fig.savefig(DWORK + '/it_veneto_fine.png', dpi=90, bbox_inches='tight')


if __name__ == '__main__':
    main()
