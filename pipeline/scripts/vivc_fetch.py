#!/usr/bin/env python3
"""Fetch VIVC passport data (pedigree, colour, origin, species, breeder, area) for the
grape list used by data/content/global/grapes.json. Polite: ~1 request per second.
Output: work/global/vivc_raw.json  {key: {...fields}}
Usage: python3 -I scripts/vivc_fetch.py [outdir] [names_override.json]
"""
import json, re, html, sys, time, os, urllib.request, urllib.parse, unicodedata

OUT = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/winesite/work/global'
os.makedirs(OUT, exist_ok=True)
CACHE = os.path.join(OUT, 'vivc_cache')
os.makedirs(CACHE, exist_ok=True)
UA = 'VitisMundiAtlasResearch/1.0 (non-commercial wine atlas; polite crawler)'

# key -> VIVC prime-name search string (% wildcard allowed)
NAMES = {
 'cabernet-sauvignon': 'CABERNET SAUVIGNON', 'merlot': 'MERLOT NOIR', 'cabernet-franc': 'CABERNET FRANC',
 'petit-verdot': 'PETIT VERDOT', 'malbec': 'COT', 'carmenere': 'CARMENERE', 'pinot-noir': 'PINOT NOIR',
 'pinot-gris': 'PINOT GRIS', 'pinot-blanc': 'PINOT BLANC', 'meunier': '%MEUNIER', 'chardonnay': 'CHARDONNAY BLANC',
 'sauvignon-blanc': 'SAUVIGNON BLANC', 'semillon': 'SEMILLON', 'muscadelle': 'MUSCADELLE', 'syrah': 'SYRAH',
 'grenache': 'GARNACHA TINTA', 'grenache-blanc': 'GARNACHA BLANCA', 'mourvedre': 'MONASTRELL',
 'carignan': '%MAZUEL%', 'cinsault': 'CINSAUT', 'viognier': 'VIOGNIER', 'marsanne': 'MARSANNE',
 'roussanne': 'ROUSSANNE', 'gamay': 'GAMAY NOIR', 'aligote': 'ALIGOTE', 'melon': 'MELON', 'auxerrois': 'AUXERROIS',
 'chenin-blanc': 'CHENIN BLANC', 'savagnin': 'SAVAGNIN BLANC', 'gewurztraminer': '%GEWUERZTRAMINER%',
 'riesling': 'RIESLING WEISS', 'muscat-blanc': 'MUSCAT A PETITS GRAINS BLANCS', 'muscat-of-alexandria': 'MUSCAT OF ALEXANDRIA',
 'tannat': 'TANNAT', 'petit-manseng': 'PETIT MANSENG', 'gros-manseng': 'GROS MANSENG', 'mauzac': 'MAUZAC BLANC',
 'negrette': 'NEGRETTE', 'fer': 'FER', 'poulsard': 'POULSARD', 'trousseau': 'TROUSSEAU', 'mondeuse-noire': 'MONDEUSE NOIRE',
 'mondeuse-blanche': 'MONDEUSE BLANCHE', 'dureza': 'DUREZA', 'jacquere': 'JACQUERE', 'altesse': 'ALTESSE',
 'chasselas': 'CHASSELAS BLANC', 'folle-blanche': 'FOLLE BLANCHE', 'ugni-blanc': 'TREBBIANO TOSCANO',
 'colombard': 'COLOMBARD', 'piquepoul': 'PIQUEPOUL BLANC', 'clairette': 'CLAIRETTE', 'vermentino': 'VERMENTINO',
 'sylvaner': 'SILVANER GRUEN', 'gouais-blanc': 'HEUNISCH WEISS', 'prunelard': 'PRUNELARD',
 'magdeleine-noire': 'MAGDELEINE NOIRE DES CHARENTES', 'romorantin': 'ROMORANTIN', 'peloursin': 'PELOURSIN',
 'petite-sirah': 'DURIF', 'gros-cabernet': 'GROS CABERNET', 'sciaccarellu': 'MAMMOLO',
 'sangiovese': 'SANGIOVESE', 'ciliegiolo': 'CILIEGIOLO', 'calabrese-di-montenuovo': 'CALABRESE DI MONTENUOVO',
 'nebbiolo': 'NEBBIOLO', 'freisa': 'FREISA', 'barbera': 'BARBERA', 'dolcetto': 'DOLCETTO', 'montepulciano': 'MONTEPULCIANO',
 'aglianico': 'AGLIANICO', 'nero-d-avola': '%AVOLA', 'nerello-mascalese': 'NERELLO MASCALESE', 'zinfandel': 'TRIBIDRAG',
 'negroamaro': 'NEGRO AMARO', 'corvina': 'CORVINA VERONESE', 'rondinella': 'RONDINELLA', 'lagrein': 'LAGREIN',
 'teroldego': 'TEROLDEGO', 'schiava': 'TROLLINGER', 'refosco': 'REFOSCO DAL PEDUNCOLO ROSSO', 'sagrantino': 'SAGRANTINO',
 'lambrusco-salamino': 'LAMBRUSCO SALAMINO', 'frappato': 'FRAPPATO', 'gaglioppo': 'GAGLIOPPO', 'garganega': 'GARGANEGA',
 'verdicchio': 'VERDICCHIO BIANCO', 'fiano': 'FIANO', 'greco': 'GRECO', 'falanghina': 'FALANGHINA FLEGREA',
 'arneis': 'ARNEIS', 'cortese': 'CORTESE', 'glera': 'GLERA', 'friulano': 'SAUVIGNONASSE', 'ribolla-gialla': 'RIBOLLA GIALLA',
 'carricante': 'CARRICANTE', 'grillo': 'GRILLO', 'catarratto': 'CATARRATTO BIANCO', 'pecorino': 'PECORINO',
 'vernaccia-di-san-gimignano': 'VERNACCIA DI SAN GIMIGNANO', 'timorasso': 'TIMORASSO', 'malvasia-di-lipari': 'MALVASIA DI LIPARI',
 'malvasia-istriana': 'MALVASIA ISTRIANA', 'nero-di-troia': 'UVA DI TROIA', 'prie': 'PRIE',
 'tempranillo': 'TEMPRANILLO', 'albillo-mayor': 'ALBILLO MAYOR', 'benedicto': 'BENEDICTO', 'mencia': 'MENCIA',
 'graciano': 'GRACIANO', 'bobal': 'BOBAL', 'albarino': 'ALVARINHO', 'verdejo': 'VERDEJO', 'godello': '%GODELLO%',
 'macabeo': 'MACABEO', 'xarello': 'XARELLO', 'parellada': 'PARELLADA', 'airen': 'AIREN', 'palomino': 'PALOMINO FINO',
 'pedro-ximenez': 'PEDRO XIMENEZ', 'listan-prieto': 'LISTAN PRIETO', 'alicante-bouschet': 'ALICANTE HENRI BOUSCHET',
 'cayetana-blanca': 'CAYETANA BLANCA', 'touriga-nacional': 'TOURIGA NACIONAL', 'touriga-franca': 'TOURIGA FRANCA',
 'mourisco-tinto': '%MOURISCO%', 'tinta-barroca': 'TINTA BARROCA', 'tinto-cao': 'TINTO CAO', 'baga': 'BAGA',
 'castelao': 'CASTELAO', 'trincadeira': '%TRINCADEIRA%', 'alfrocheiro': 'ALFROCHEIRO', 'arinto': 'ARINTO DE BUCELAS',
 'encruzado': 'ENCRUZADO', 'loureiro': 'LOUREIRO', 'fernao-pires': 'FERNAO PIRES', 'sercial': '%ESGANA%',
 'verdelho': 'VERDELHO', 'bual': 'MALVASIA FINA', 'tinta-negra': 'TINTA NEGRA MOLE', 'ramisco': 'RAMISCO',
 'muller-thurgau': 'MUELLER THURGAU WEISS', 'madeleine-royale': 'MADELEINE ROYALE', 'dornfelder': 'DORNFELDER',
 'scheurebe': 'SCHEUREBE', 'kerner': 'KERNER', 'bacchus': 'BACCHUS WEISS', 'portugieser': 'BLAUER PORTUGIESER',
 'elbling': 'ELBLING WEISS', 'regent': 'REGENT', 'solaris': 'SOLARIS', 'gruner-veltliner': 'GRUENER VELTLINER',
 'st-georgener-rebe': '%GEORGENER%', 'zweigelt': 'ZWEIGELTREBE', 'st-laurent': 'SANKT LAURENT',
 'blaufrankisch': 'BLAUFRAENKISCH', 'blaue-zimmettraube': '%ZIMMETTRAUBE%', 'welschriesling': 'WELSCHRIESLING',
 'rotgipfler': 'ROTGIPFLER', 'zierfandler': 'ZIERFANDLER', 'neuburger': 'NEUBURGER', 'furmint': 'FURMINT',
 'harslevelu': 'HARSLEVELUE', 'kadarka': 'KADARKA', 'zametovka': 'ZAMETOVKA', 'petite-arvine': 'ARVINE',
 'cornalin': '%CORNALIN%', 'assyrtiko': 'ASSYRTIKO', 'xinomavro': 'XINOMAVRO', 'agiorgitiko': 'AGIORGITIKO',
 'moschofilero': 'MOSCHOFILERO', 'malagousia': 'MALAGOUSIA', 'mavrodaphne': 'MAVRODAPHNI', 'savatiano': 'SAVVATIANO',
 'xynisteri': 'XYNISTERI', 'saperavi': 'SAPERAVI', 'rkatsiteli': 'RKATSITELI', 'mtsvane-kakhuri': 'MTSVANE KAKHURI',
 'kisi': 'KISI', 'areni': 'ARENI', 'voskehat': '%VOSKE%', 'feteasca-neagra': 'FETEASCA NEAGRA',
 'feteasca-alba': 'FETEASCA ALBA', 'rara-neagra': '%RARA NEAGRA%', 'mavrud': 'MAVRUD', 'melnik': '%MELNISHKA%',
 'plavac-mali': '%PLAVAC MALI%', 'vranac': 'VRANAC', 'prokupac': 'PROKUPAC', 'okuzgozu': '%OKUZGOZU%',
 'bogazkere': '%BOGAZKERE%', 'kalecik-karasi': '%KALECIK%', 'krasnostop': '%KRASNOSTOP ZOLOTOVSK%', 'marselan': 'MARSELAN',
 'koshu': 'KOSHU', 'muscat-bailey-a': 'MUSCAT BAILEY A', 'kyoho': 'KYOHO', 'sultana': 'SULTANINA', 'pinotage': 'PINOTAGE',
 'torrontes': 'TORRONTES RIOJANO', 'bonarda': 'DOUCE NOIRE', 'crouchen': 'CROUCHEN', 'norton': 'NORTON', 'concord': 'CONCORD',
 'catawba': 'CATAWBA', 'scuppernong': 'SCUPPERNONG', 'vidal': 'VIDAL BLANC', 'chambourcin': 'CHAMBOURCIN',
 'seyval-blanc': 'SEYVAL', 'baco-noir': 'BACO NOIR', 'marquette': 'MARQUETTE', 'frontenac': 'FRONTENAC',
 'lacadie-blanc': '%ACADIE%', 'isabella': 'ISABELLA', 'niagara': 'NIAGARA', 'delaware': 'DELAWARE',
 'marechal-foch': 'MARECHAL FOCH', 'traminette': 'TRAMINETTE', 'vignoles': 'VIGNOLES', 'lenoir': '%JACQUEZ%',
 'muscat-ottonel': 'MUSCAT OTTONEL', 'tinta-roriz-check': 'TINTA RORIZ', 'carignan-alt': 'CARIGNAN NOIR',
 'tibouren': 'TIBOUREN', 'grolleau': 'GROLLEAU', 'pineau-d-aunis': "PINEAU D'AUNIS", 'nerello-cappuccio': 'NERELLO CAPPUCCIO',
 'dobricic': 'DOBRICIC', 'hebén': 'HEBEN', 'mourisco-alt': 'MARUFO', 'fruhroter-veltliner': '%VELTLINER ROTWEISS%',
 'savagnin-rose': 'SAVAGNIN ROSE', 'traminer': 'TRAMINER', 'pinot-family-check': 'PINOT NOIR PRECOCE',
}

def get(url, fn):
    path = os.path.join(CACHE, fn)
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return open(path, encoding='utf-8', errors='ignore').read()
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                t = r.read().decode('utf-8', errors='ignore')
            open(path, 'w', encoding='utf-8').write(t)
            time.sleep(1.0)
            return t
        except Exception as e:
            time.sleep(3 + attempt * 3)
    return ''

def clean(x):
    return html.unescape(' '.join(re.sub(r'<[^>]+>', ' ', x).split()))

def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().upper()
    return re.sub(r'[^A-Z0-9]', '', s)

def parse_passport(t):
    d = {}
    for r in re.findall(r'<tr[^>]*>(.*?)</tr>', t, re.S):
        th = re.findall(r'<th[^>]*>(.*?)</th>', r, re.S)
        td = re.findall(r'<td[^>]*>(.*?)</td>', r, re.S)
        if th and td:
            k = clean(th[0])
            if k and k not in d:
                d[k] = clean(td[0])
    keep = {}
    for k, nk in [('Prime name', 'prime'), ('Color of berry skin', 'color'), ('Country or region of origin of the variety', 'origin'),
                  ('Species', 'species'), ('Pedigree as given by breeder/bibliography', 'ped_biblio'),
                  ('Pedigree confirmed by markers', 'ped_markers'), ('Prime name of parent 1', 'p1'),
                  ('Prime name of parent 2', 'p2'), ('Parent - offspring relationship', 'parent_offspring'),
                  ('Breeder', 'breeder'), ('Breeder contact address', 'breeder_addr'), ('Year of crossing', 'year_cross'),
                  ('Year of selection', 'year_sel'), ('Sex of flowers', 'sex')]:
        keep[nk] = d.get(k, '')
    m = re.search(r'Synonyms:\s*(\d+)', clean(t))
    keep['n_synonyms'] = int(m.group(1)) if m else None
    # synonyms list: links to cultivarname search
    syns = re.findall(r'CultivarnameSearch\[cultivarnamen\]=([^"&]+)', t)
    keep['synonyms_sample'] = sorted(set(urllib.parse.unquote_plus(html.unescape(s)) for s in syns))[:60]
    return keep

def parse_area(t):
    rows = re.findall(r'<tr[^>]*data-key[^>]*>(.*?)</tr>', t, re.S)
    out = []
    for r in rows:
        c = [clean(x) for x in re.findall(r'<td[^>]*>(.*?)</td>', r, re.S)]
        if len(c) >= 3:
            try:
                out.append({'country': c[0], 'ha': float(c[1].replace(',', '')), 'year': int(c[2]), 'region': c[3] if len(c) > 3 else ''})
            except ValueError:
                pass
    return out

def main():
    if len(sys.argv) > 2:
        NAMES.clear(); NAMES.update(json.load(open(sys.argv[2])))
    res_path = os.path.join(OUT, 'vivc_raw.json')
    res = json.load(open(res_path)) if os.path.exists(res_path) else {}
    for key, q in NAMES.items():
        if key in res and res[key].get('id') and res[key].get('query') == q:
            continue
        if q.startswith('id:'):
            vid = q[3:]
            hits = [(vid, '')]
            t = ''
        else:
            url = 'https://www.vivc.de/index.php?' + urllib.parse.urlencode({'r': 'passport/result', 'PassportSearch[leitname]': q})
            t = get(url, 'search_' + norm(q) + '.html')
            hits = []
        for i, n in re.findall(r'passport%2Fview&amp;id=(\d+)"[^>]*>(.*?)</a>', t):
            n = clean(n)
            if n and not n.isdigit() and (i, n) not in hits:
                hits.append((i, n))
        if not hits:
            res[key] = {'query': q, 'id': None, 'hits': []}
            print('NO HIT', key, q, flush=True)
            continue
        qn = norm(q.replace('%', ''))
        pick = hits[0] if q.startswith('id:') else next((h for h in hits if norm(h[1]) == qn), hits[0])
        vid = pick[0]
        pt = get(f'https://www.vivc.de/index.php?r=passport%2Fview&id={vid}', f'passport_{vid}.html')
        rec = parse_passport(pt)
        rec.update({'query': q, 'id': vid, 'hits': hits[:8]})
        at = get('https://www.vivc.de/index.php?' + urllib.parse.urlencode({'FlaechenSearch[leitname2]': rec.get('prime', ''),
                 'FlaechenSearch[kenn_nr2]': vid, 'r': 'flaechen/arealisting', 'sort': 'landescode'}), f'area_{vid}.html')
        rows = parse_area(at)
        latest = {}
        for r in rows:
            if r['region']:
                continue
            if r['country'] not in latest or r['year'] > latest[r['country']]['year']:
                latest[r['country']] = r
        rec['area_latest'] = sorted(({'country': c, 'ha': v['ha'], 'year': v['year']} for c, v in latest.items()), key=lambda x: -x['ha'])
        rec['area_total_latest'] = round(sum(v['ha'] for v in latest.values()))
        rec['area_years'] = sorted(set(v['year'] for v in latest.values()))
        res[key] = rec
        print(key, vid, rec['prime'], '|', rec['ped_markers'] or rec['ped_biblio'], '|', rec['origin'], '|', rec['area_total_latest'], flush=True)
        json.dump(res, open(res_path, 'w'), ensure_ascii=False, indent=1)
    json.dump(res, open(res_path, 'w'), ensure_ascii=False, indent=1)
    print('DONE', len(res))

if __name__ == '__main__':
    main()
