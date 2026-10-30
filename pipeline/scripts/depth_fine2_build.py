"""Vitis Mundi depth phase, fine-unit profiles part 2: Barolo/Barbaresco MGAs, Champagne cru villages, Rhone/Beaujolais/
Loire lieux-dits, Chianti Classico UGAs, new Chablis premier cru climats, Rioja zonas and municipios, Priorat vi de vila,
Cava zonas.

Hand-written texts live in work/depth_fine2/parts/*.py (each defines a dict P: fine-unit id -> fields). This script joins
them to the fine-unit features (site/data/geo/{it,fr,es}_fine.geojson) and adds data-driven lines:
  - MGAs: area of the digitised outline, elevation band and aspect from scripts/depth_fine2_mga_terrain.py
    (work/depth_fine2/mga_terrain.json, Copernicus DEM GLO-30);
  - lieux-dits, UGAs, Priorat villages: elevation band, slope and aspect from site/data/topo/{iso2}.json (same DEM);
    AOC-delimited hectares of each lieu-dit from the fr_fine reg (vine_ha).
Outputs (SPEC content shape, explicit ids): data/content/depth_piemonte_mga.json, depth_champagne_crus.json,
depth_lieux_dits.json, depth_misc_fine.json; per-part JSON in work/depth_fine2/.
Usage: python3 -I scripts/depth_fine2_build.py
"""
import json, os, re, glob, runpy, sys, collections

R = '/home/claude/winesite'
W = R + '/work/depth_fine2'
OUT = R + '/data/content'
BANNED = ['delve', 'robust', 'seamless', 'game-changer', 'unlock', 'leverage', 'comprehensive', 'cutting-edge',
          'transformative', 'innovative', "it's worth noting", 'nestled', 'boasts', 'tapestry', 'testament']
OCT = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west']
DIR16 = {'N': 'north', 'NNE': 'north-north-east', 'NE': 'north-east', 'ENE': 'east-north-east', 'E': 'east',
         'ESE': 'east-south-east', 'SE': 'south-east', 'SSE': 'south-south-east', 'S': 'south', 'SSW': 'south-south-west',
         'SW': 'south-west', 'WSW': 'west-south-west', 'W': 'west', 'WNW': 'west-north-west', 'NW': 'north-west',
         'NNW': 'north-north-west'}


def load_geo(c):
    return {f['properties']['id']: f['properties'] for f in json.load(open(f'{R}/site/data/geo/{c}_fine.geojson'))['features']}


def load_parts():
    P, E = {}, []
    for fn in sorted(glob.glob(W + '/parts/*.py')):
        mod = runpy.run_path(fn)
        for k, v in mod.get('P', {}).items():
            if k in P:
                raise SystemExit(f'duplicate id {k} in {fn}')
            v['_part'] = os.path.basename(fn)
            P[k] = v
        E.append(mod.get('E', {}))
    # extensions: update fields of profiles defined elsewhere (None removes a field)
    for ext in E:
        for k, v in ext.items():
            if k not in P:
                raise SystemExit(f'extension for unknown id {k}')
            if v == 'DROP':
                del P[k]
                continue
            for f, x in v.items():
                if x is None:
                    P[k].pop(f, None)
                else:
                    P[k][f] = x
    return P


def aspect_words(a, ar):
    """Plain-language exposure from slope-weighted mean aspect and octant shares."""
    if not ar or sum(ar) == 0:
        return None
    order = sorted(range(8), key=lambda i: -ar[i])
    i1, i2 = order[0], order[1]
    if ar[i1] >= 0.5:
        return f'mostly {OCT[i1]}-facing'
    if ar[i1] + ar[i2] >= 0.6 and (abs(i1 - i2) in (1, 7)):
        return f'facing {OCT[i1]} to {OCT[i2]}'
    if a is None:
        return 'facing several ways'
    return f'facing broadly {DIR16[["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][int((a + 11.25) // 22.5) % 16]]}'


def rnd(x, step=5):
    return int(step * round(x / step))


def mga_line(t, opts):
    area = t['ha'] >= 2 and not opts.get('noarea')
    elev = not opts.get('noelev')
    asp = None if opts.get('noasp') else aspect_words(t['a'], t['ar'])
    if not (area or elev or asp):
        return ''
    ha = t['ha']
    s = 'On the official MGA map the digitised outline '
    if area:
        s += f"covers about {ha:.0f} ha" if ha >= 10 else f"covers about {ha:.1f} ha"
        if elev:
            s += f" at roughly {rnd(t['e5'])} to {rnd(t['e95'])} m"
    elif elev:
        s += f"lies at roughly {rnd(t['e5'])} to {rnd(t['e95'])} m"
    if asp:
        s += (', ' if (area or elev) else 'is ') + asp
    return s + '. (Approximate outline; total area, not vines; elevations from the Copernicus DEM.)'


def topo_line(t, opts, what='The delimited vineyard land'):
    if not t:
        return ''
    parts = [f"lies at about {rnd(t['e5'])} to {rnd(t['e95'])} m"]
    s = t.get('s')
    if s is not None and s < 4:
        parts.append('on almost flat land')
    elif not opts.get('noslope') and s is not None:
        parts.append(f"with a mean slope of about {s:.0f}%")
        if not opts.get('noasp'):
            w = aspect_words(t.get('a'), t.get('ar'))
            if w:
                parts.append(w)
    return f"{what} " + ', '.join(parts) + ' (Copernicus DEM).'


def wc(*xs):
    return sum(len(re.findall(r"[\w'’-]+", x or '')) for x in xs)


def check_text(rec, problems):
    blob = ' '.join(str(rec.get(k) or '') for k in ('summary', 'terroir', 'nerd_note', 'classification', 'grapes'))
    blob += ' '.join(rec.get('producers') or [])
    if '—' in blob or '–' in blob:
        problems.append((rec['id'], 'dash'))
    low = blob.lower()
    for b in BANNED:
        if b in low:
            problems.append((rec['id'], 'banned:' + b))


def base_rec(p, country, extra_match=()):
    m = [p['name']] + [a for a in (p.get('alt') or []) if a and a != p['name']] + list(extra_match)
    seen, match = set(), []
    for x in m:
        if x not in seen:
            seen.add(x); match.append(x)
    return {'id': p['id'], 'country': country, 'name': p['name'], 'match': match, 'cat': p['cat'], 'subcat': p['subcat']}


def finish(rec, v, keys=('region', 'subregion', 'village', 'created', 'area_ha', 'styles', 'dominant_style', 'grapes')):
    for k in keys:
        if v.get(k) is not None:
            rec[k] = v[k]
    return rec


# ---------------------------------------------------------------- MGAs
def build_mga(geo_it, P, problems, stats):
    T = json.load(open(W + '/mga_terrain.json'))
    out = []
    for fid, g in geo_it.items():
        if g.get('subcat') != 'MGA':
            continue
        v = P.get(fid)
        if not v:
            problems.append((fid, 'missing profile')); continue
        t = T.get(fid)
        doc = g['reg']['doc']
        rec = base_rec(g, 'it')
        comm = v.get('comm') or ', '.join(g['reg']['communes'])
        rec.update(region='Piedmont', subregion='Langhe', village=comm, styles=['red'], dominant_style='red', grapes='Nebbiolo')
        rec['summary'] = v['s'].strip()
        terr = (v.get('t') or '').strip()
        dl = mga_line(t, v) if t else ''
        rec['terroir'] = (terr + (' ' if terr and dl else '') + dl).strip()
        if v.get('p'):
            rec['producers'] = v['p']
        if v.get('n'):
            rec['nerd_note'] = v['n']
        if doc == 'Barolo':
            rec['classification'] = ('MGA (menzione geografica aggiuntiva) of Barolo DOCG: one of the 170 named vineyard areas '
                                     'listed in the disciplinare from the 2010 vintage (plus 11 village names). The name may '
                                     'follow "Barolo" on the label only if all the grapes come from inside it; it is a place '
                                     'name, not a quality rank.')
        else:
            rec['classification'] = ('MGA (menzione geografica aggiuntiva) of Barbaresco DOCG: one of the 66 named vineyard '
                                     'areas written into the disciplinare in 2007. The name may follow "Barbaresco" on the '
                                     'label only if all the grapes come from inside it; it is a place name, not a quality rank.')
        check_text(rec, problems)
        n = wc(rec['summary'], rec['terroir'], rec.get('nerd_note'))
        stats['mga'].append((fid, n, v.get('tier', 'minor')))
        out.append(rec)
    return out


# ---------------------------------------------------------------- Champagne
PCT = {'mareuil-sur-ay': '99%', 'tauxieres-mutry': '99%', 'billy-le-grand': '95%', 'bisseuil': '95%', 'dizy': '95%',
       'trepail': '95%', 'vaudemange': '95%', 'vertus': '95%', 'villeneuve-renneville-chevigny': '95%',
       'villers-marmery': '95%', 'voipreux': '95%', 'chigny-les-roses': '94%', 'cormontreuil': '94%', 'ludes': '94%',
       'montbre': '94%', 'rilly-la-montagne': '94%', 'taissy': '94%', 'trois-puits': '94%', 'avenay-val-d-or': '93%',
       'champillon': '93%', 'cumieres': '93%', 'hautvillers': '93%', 'mutigny': '93%', 'bezannes': '90%', 'chamery': '90%',
       'ecueil': '90%', 'jouy-les-reims': '90%', 'les-mesneux': '90%', 'pargny-les-reims': '90%', 'pierry': '90%',
       'sacy': '90%', 'ville-dommange': '90%', 'villers-allerand': '90%', 'villers-aux-noeuds': '90%',
       'bergeres-les-vertus': '95% for white grapes, 90% for black', 'cuis': '95% for white grapes, 90% for black',
       'grauves': '95% for white grapes, 90% for black', 'coligny': '90% (white grapes only)',
       'etrechy': '90% (white grapes only)'}


def build_champ(geo_fr, P, problems, stats):
    out = []
    for fid, g in geo_fr.items():
        if g.get('subcat') != 'Cru village':
            continue
        v = P.get(fid)
        if not v:
            problems.append((fid, 'missing profile')); continue
        r = g['reg']
        key = fid[len('fr-champagne-'):]
        rec = base_rec(g, 'fr', extra_match=[f'Champagne {g["name"]}'])
        rec.update(region='Champagne', subregion=r['subregion'], village=g['name'],
                   styles=['sparkling', 'rose', 'white'], dominant_style='sparkling')
        if v.get('grapes'):
            rec['grapes'] = v['grapes']
        rec['summary'] = v['s'].strip()
        if v.get('t'):
            rec['terroir'] = v['t'].strip()
        if v.get('p'):
            rec['producers'] = v['p']
        if v.get('n'):
            rec['nerd_note'] = v['n']
        st = r['echelle']
        if st == 'Grand Cru':
            cl = 'Grand cru village: rated 100% on the échelle des crus. One of 17 communes whose vineyards may be labelled Champagne Grand Cru.'
            if key == 'tours-sur-marne':
                cl += ' Before 2010 the échelle rated its black grapes 100% and its white grapes 90%.'
            if key == 'chouilly':
                cl += ' Before 2010 the échelle rated its white grapes 100% and its black grapes 95%.'
            tier = 'grand'
        elif st == 'Premier Cru':
            pct = PCT.get(key)
            cl = ('Premier cru village: rated ' + (pct if pct else 'between 90% and 99%') +
                  ' on the échelle des crus (dropped in 2010). One of 42 communes whose vineyards may be labelled Champagne Premier Cru.')
            tier = 'premier'
        else:
            cl = ('Autre cru: a Champagne village outside the grand and premier crus. In its final form the échelle des crus, '
                  'which set grape prices for much of the twentieth century and was dropped in 2010, rated such villages '
                  'between 80% and 89%.')
            tier = 'other'
        if r.get('note') and 'Polygon' not in r['note']:
            cl += ' ' + r['note']
        rec['classification'] = cl
        check_text(rec, problems)
        stats['champ'].append((fid, wc(rec['summary'], rec.get('terroir'), rec.get('nerd_note')), tier))
        out.append(rec)
    return out


# ---------------------------------------------------------------- lieux-dits
APP = {'fr-cote-rotie': ('Côte-Rôtie', 'Rhône Valley', 'Northern Rhône', ['red'], 'Syrah (with up to 20% Viognier co-fermented)'),
       'fr-hermitage': ('Hermitage', 'Rhône Valley', 'Northern Rhône', ['red', 'white'], 'Syrah; Marsanne and Roussanne for white'),
       'fr-cornas': ('Cornas', 'Rhône Valley', 'Northern Rhône', ['red'], 'Syrah'),
       'fr-condrieu': ('Condrieu', 'Rhône Valley', 'Northern Rhône', ['white'], 'Viognier'),
       'fr-saint-joseph': ('Saint-Joseph', 'Rhône Valley', 'Northern Rhône', ['red', 'white'], 'Syrah; Marsanne and Roussanne for white'),
       'fr-chateauneuf-du-pape': ('Châteauneuf-du-Pape', 'Rhône Valley', 'Southern Rhône', ['red', 'white'],
                                  'Grenache with Syrah, Mourvèdre and the other permitted varieties (13 named in the decree)'),
       'fr-morgon': ('Morgon', 'Beaujolais', 'Beaujolais crus', ['red'], 'Gamay'),
       'fr-moulin-a-vent': ('Moulin-à-Vent', 'Beaujolais', 'Beaujolais crus', ['red'], 'Gamay'),
       'fr-fleurie': ('Fleurie', 'Beaujolais', 'Beaujolais crus', ['red'], 'Gamay'),
       'fr-sancerre': ('Sancerre', 'Loire Valley', 'Centre-Loire', ['white', 'red', 'rose'], 'Sauvignon Blanc; Pinot Noir for red and rosé'),
       'fr-vouvray': ('Vouvray', 'Loire Valley', 'Touraine', ['white', 'sparkling', 'sweet'], 'Chenin Blanc'),
       'fr-savennieres': ('Savennières', 'Loire Valley', 'Anjou', ['white'], 'Chenin Blanc')}


def build_ld(geo_fr, P, problems, stats):
    topo = json.load(open(R + '/site/data/topo/fr.json'))
    out = []
    for fid, g in geo_fr.items():
        if g.get('subcat') != 'Lieu-dit' or fid not in P:
            continue
        v = P[fid]
        r = g['reg']
        app, reg_, sub, styles, grapes = APP[g['parent']]
        rec = base_rec(g, 'fr', extra_match=[f'{app} {g["name"]}'])
        comm = ', '.join(r['communes'])
        rec.update(region=reg_, subregion=sub, village=comm, styles=v.get('styles', styles),
                   dominant_style=v.get('styles', styles)[0], grapes=v.get('grapes', grapes))
        if r.get('vine_ha'):
            rec['area_ha'] = r['vine_ha']
        rec['summary'] = v['s'].strip()
        terr = (v.get('t') or '').strip()
        dl = topo_line(topo.get(fid), v, what=f"The lieu-dit's {r['vine_ha']:.1f} ha of AOC-delimited land" if r.get('vine_ha') else 'The lieu-dit')
        rec['terroir'] = (terr + (' ' if terr and dl else '') + dl).strip()
        if v.get('p'):
            rec['producers'] = v['p']
        if v.get('n'):
            rec['nerd_note'] = v['n']
        rec['classification'] = (f'Lieu-dit (named place in the land register) within the {app} AOC. It is not a separate '
                                 f'appellation, but the name may appear on the label after {app} when all the grapes come from it.')
        check_text(rec, problems)
        stats['ld'].append((fid, wc(rec['summary'], rec['terroir'], rec.get('nerd_note')), 'ld'))
        out.append(rec)
    return out


# ---------------------------------------------------------------- misc (UGA, Chablis, Spain)
def build_misc(geo_it, geo_fr, geo_es, P, problems, stats):
    tit = json.load(open(R + '/site/data/topo/it.json'))
    tes = json.load(open(R + '/site/data/topo/es.json'))
    tfr = json.load(open(R + '/site/data/topo/fr.json'))
    pc = json.load(open(OUT + '/depth_burgundy_pc.json'))
    have_pc = {a.get('id') for a in pc['appellations']}
    out = []
    # Chianti Classico UGAs
    for fid, g in geo_it.items():
        if g.get('parent') != 'it-chianti-classico':
            continue
        v = P.get(fid)
        if not v:
            problems.append((fid, 'missing profile')); continue
        rec = base_rec(g, 'it', extra_match=[f'Chianti Classico {g["name"]}'])
        rec.update(region='Tuscany', subregion='Chianti Classico', village=', '.join(g['reg']['comuni']), styles=['red'],
                   dominant_style='red', grapes=v.get('grapes', 'Sangiovese (at least 90% for Gran Selezione)'))
        rec['summary'] = v['s'].strip()
        dl = topo_line(tit.get(fid), {'noasp': True, 'noslope': True}, what='The UGA as a whole')
        rec['terroir'] = (v.get('t', '').strip() + ' ' + dl).strip()
        for k in ('p', 'n'):
            if v.get(k):
                rec['producers' if k == 'p' else 'nerd_note'] = v[k]
        rec['classification'] = ('UGA (unità geografica aggiuntiva) of Chianti Classico DOCG, one of 11 voted by producers in '
                                 'June 2021 and approved by the Ministry in 2023 (DM 22 June 2023). The UGA name may appear '
                                 'on Gran Selezione labels; the Consorzio intends to extend it to Annata and Riserva.')
        check_text(rec, problems)
        stats['uga'].append((fid, wc(rec['summary'], rec['terroir'], rec.get('nerd_note')), 'uga'))
        out.append(rec)
    # Chablis climats without a profile
    for fid, g in geo_fr.items():
        if not fid.startswith('fr-chablis-premier-cru') or fid in have_pc:
            continue
        v = P.get(fid)
        if not v:
            problems.append((fid, 'missing profile')); continue
        r = g.get('reg', {})
        rec = base_rec(g, 'fr', extra_match=[g['name'].replace('premier cru', '1er Cru'), g['name'].replace('premier cru', 'Premier Cru')])
        rec.update(region='Chablis and the Grand Auxerrois', subregion='Chablis', styles=['white'], dominant_style='white',
                   grapes='Chardonnay')
        if r.get('vine_ha'):
            rec['area_ha'] = r['vine_ha']
        rec['summary'] = v['s'].strip()
        dl = topo_line(tfr.get(fid), v, what='The mapped climat')
        rec['terroir'] = (v.get('t', '').strip() + ' ' + dl).strip()
        for k in ('p', 'n'):
            if v.get(k):
                rec['producers' if k == 'p' else 'nerd_note'] = v[k]
        prin = r.get('principal')
        if r.get('role') == 'satellite':
            rec['classification'] = (f'Chablis premier cru climat. It may be labelled under its own name or under the principal '
                                     f'climat {prin}, to which the cahier des charges attaches it.')
        else:
            rec['classification'] = 'Chablis premier cru: one of the 17 principal climats of the cahier des charges, which can also cover satellite climats.'
        check_text(rec, problems)
        stats['chablis'].append((fid, wc(rec['summary'], rec['terroir'], rec.get('nerd_note')), 'chablis'))
        out.append(rec)
    # Spain
    for fid, g in geo_es.items():
        v = P.get(fid)
        if not v:
            problems.append((fid, 'missing profile')); continue
        rec = base_rec(g, 'es')
        sc = g['subcat']
        if fid.startswith('es-rioja'):
            rec.update(region='Rioja', subregion=(g['name'] if sc == 'Zona' else g['reg'].get('zona')), styles=['red', 'white', 'rose'],
                       dominant_style='red', grapes=v.get('grapes', 'Tempranillo, Garnacha, Graciano, Mazuelo, Viura and others'))
            if sc == 'Municipio':
                rec['match'] = rec['match'] + [f'Rioja {g["name"]}']
                rec['village'] = g['name']
                rec['classification'] = ('Vino de municipio of DOCa Rioja: since 2017 a wine may name its municipality if all the '
                                         'grapes come from it and it is made there.')
            else:
                rec['classification'] = ('Zona of DOCa Rioja: one of three zones that may appear on labels (rules of 2017, labels '
                                         'from 2018), for wines made entirely from grapes of that zone.')
        elif fid.startswith('es-priorat'):
            rec.update(region='Catalonia', subregion='Priorat', village=g['name'], styles=['red', 'white'], dominant_style='red',
                       grapes=v.get('grapes', 'Garnacha and Cariñena (at least 60% together), with Garnacha Blanca for white'))
            rec['classification'] = ('Vi de vila of DOQ Priorat: one of 12 village zones (2009 rules). Grapes from that zone only, '
                                     'yield at most 5,000 kg/ha for red, at least 60% Garnacha and/or Cariñena.')
            dl = topo_line(tes.get(fid), {'noasp': True}, what='The mapped village area')
            v = dict(v); v['t'] = (v.get('t', '').strip() + ' ' + dl).strip()
        elif fid.startswith('es-cava'):
            rec.update(region='Catalonia' if 'barcelona' in fid else None, subregion='Cava', styles=['sparkling', 'rose'],
                       dominant_style='sparkling', grapes=v.get('grapes'))
            if rec['region'] is None:
                rec.pop('region')
            rec['classification'] = ('Zona of DO Cava (zoning approved 2020, on labels from 2022): one of four zones, which can '
                                     'appear on labels of Cava de Guarda Superior and above.')
        rec['summary'] = v['s'].strip()
        if v.get('t'):
            rec['terroir'] = v['t'].strip()
        for k in ('p', 'n'):
            if v.get(k):
                rec['producers' if k == 'p' else 'nerd_note'] = v[k]
        for k in ('created', 'area_ha'):
            if v.get(k) is not None:
                rec[k] = v[k]
        check_text(rec, problems)
        stats['es'].append((fid, wc(rec['summary'], rec.get('terroir'), rec.get('nerd_note')), sc))
        out.append(rec)
    # extra profiles with no polygon (e.g. Solanes del Molar)
    for fid, v in P.items():
        if v.get('nopoly'):
            rec = {'id': fid, 'country': v['country'], 'name': v['name'], 'match': v.get('match', [v['name']]), 'cat': v['cat'],
                   'subcat': v['subcat'], 'region': v.get('region'), 'subregion': v.get('subregion'), 'village': v.get('village'),
                   'styles': v.get('styles'), 'dominant_style': v.get('dominant_style'), 'grapes': v.get('grapes'),
                   'summary': v['s'], 'terroir': v.get('t'), 'classification': v.get('classification')}
            rec = {k: x for k, x in rec.items() if x is not None}
            check_text(rec, problems)
            out.append(rec)
    return out


def write(name, apps):
    d = {'countries': [], 'regions': [], 'appellations': apps, 'sites': []}
    tmp = f'{W}/{name}.json'
    json.dump(d, open(tmp, 'w'), ensure_ascii=False, indent=1)
    json.load(open(tmp))
    os.replace(tmp, f'{OUT}/{name}.json')
    print('wrote', name, len(apps))


def main():
    geo_it, geo_fr, geo_es = load_geo('it'), load_geo('fr'), load_geo('es')
    P = load_parts()
    problems, stats = [], collections.defaultdict(list)
    mga = build_mga(geo_it, P, problems, stats)
    ch = build_champ(geo_fr, P, problems, stats)
    ld = build_ld(geo_fr, P, problems, stats)
    misc = build_misc(geo_it, geo_fr, geo_es, P, problems, stats)
    known = set(geo_it) | set(geo_fr) | set(geo_es)
    for k, v in P.items():
        if k not in known and not v.get('nopoly'):
            problems.append((k, 'profile id not in any fine file'))
    for k, xs in stats.items():
        tiers = collections.defaultdict(list)
        for fid, n, t in xs:
            tiers[t].append(n)
        print(k, {t: (len(v), min(v), round(sum(v) / len(v)), max(v)) for t, v in tiers.items()})
    for p in problems:
        print('PROBLEM', p)
    if '--write' in sys.argv:
        write('depth_piemonte_mga', mga)
        write('depth_champagne_crus', ch)
        write('depth_lieux_dits', ld)
        write('depth_misc_fine', misc)


if __name__ == '__main__':
    main()
