#!/usr/bin/env python3
"""Match atlas entities to Wikidata items and collect their image properties.

  grapes       VIVC id (P3904)
  appellations eAmbrosia id (P9854) for EU PDO/PGIs, then exact label/alias match on name variants
               ("X", "X AOC", "X DOC", "X AVA", "X wine" ...) in English + local languages,
               validated by country (P17/P495) or distance from our label point
  regions      same label approach (with "X wine region", "Vignoble de X" ...)
  countries    "Wine in <country>" style items are not needed (photos come from Commons categories)
  sites        wikibase:around search (1.2 km precise / 4 km approx) + name similarity
  events       sitelinks of the Wikipedia articles cited as sources
Output: work/photos/wd_match.json  {entity_id: [ {qid, label, kind: wine|place|site|grape|event, score,
        dist_km, p18:[...], p8592:[...], p3451:[...], p948:[...], cat: commons category or null}, ...]}
"""
import json, os, re, sys, collections, urllib.parse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import sparql, sq, norm, haversine, STATS

W = '/home/claude/winesite/work/photos'
T = json.load(open(f'{W}/targets.json'))
CQ = json.load(open(f'{W}/wd_countries.json'))
CLS = json.load(open(f'{W}/wd_classes.json'))
WINECLS = set()
for k in ('Q2140699', 'Q282', 'Q13439060', 'Q3104453', 'Q1565828', 'Q22715', 'Q166247'):
    WINECLS |= set(CLS[k])
WINERY = set(CLS['Q156362'])
WINECLS |= {'Q80114014', 'Q3558198', 'Q10750129', 'Q630531', 'Q451752', 'Q1350227', 'Q15731356'} - {'Q15731356'}
BAD_CLS = {'Q5', 'Q4167410', 'Q13406463', 'Q4167836', 'Q11266439', 'Q11446', 'Q101352', 'Q202444', 'Q726', 'Q11424',
           'Q482994', 'Q7366', 'Q5398426', 'Q476028', 'Q55488', 'Q13442814', 'Q571', 'Q7725634', 'Q47461344',
           'Q3305213', 'Q2085381', 'Q1980247', 'Q15632617', 'Q24862', 'Q17537576', 'Q12136', 'Q1002954', 'Q16521'}

LANGS = {'fr': ['fr'], 'it': ['it'], 'es': ['es', 'ca', 'gl', 'eu'], 'pt': ['pt'], 'de': ['de'], 'at': ['de'],
         'ch': ['de', 'fr', 'it'], 'hu': ['hu'], 'gr': ['el'], 'ro': ['ro'], 'bg': ['bg'], 'hr': ['hr'], 'si': ['sl'],
         'rs': ['sr', 'sh'], 'cz': ['cs'], 'sk': ['sk'], 'ge': ['ka'], 'am': ['hy'], 'md': ['ro'], 'cy': ['el', 'tr'],
         'al': ['sq'], 'me': ['sr', 'sh'], 'mk': ['mk'], 'ba': ['bs', 'sh', 'hr', 'sr'], 'xk': ['sq', 'sr'],
         'tr': ['tr'], 'lb': ['ar', 'fr'], 'il': ['he'], 'ma': ['fr', 'ar'], 'dz': ['fr', 'ar'], 'tn': ['fr', 'ar'],
         'cn': ['zh'], 'jp': ['ja'], 'kr': ['ko'], 'tw': ['zh'], 'ru': ['ru'], 'ua': ['uk'], 'ar': ['es'],
         'cl': ['es'], 'uy': ['es'], 'mx': ['es'], 'pe': ['es'], 'bo': ['es'], 'br': ['pt'], 'be': ['nl', 'fr'],
         'nl': ['nl'], 'lu': ['lb', 'fr', 'de'], 'dk': ['da'], 'se': ['sv'], 'no': ['nb'], 'pl': ['pl'],
         'az': ['az'], 'uz': ['uz'], 'kz': ['kk', 'ru'], 'kg': ['ky', 'ru'], 'tj': ['tg', 'ru'], 'tm': ['tk'],
         'ir': ['fa'], 'iq': ['ar'], 'sy': ['ar'], 'jo': ['ar'], 'ps': ['ar'], 'eg': ['ar'], 'ly': ['ar'],
         'th': ['th'], 'vn': ['vi'], 'kh': ['km'], 'mm': ['my'], 'in': ['hi'], 'id': ['id'], 'cv': ['pt'],
         'co': ['es'], 've': ['es'], 'ec': ['es'], 'py': ['es'], 'et': ['am'], 'mg': ['fr', 'mg']}

SUFFIX = {'AOC': [' AOC', ' (AOC)', ' AOP', ' (AOP)'], 'AOP': [' AOC', ' AOP'], 'IGP': [' IGP'],
          'DOC': [' DOC', ' (DOC)'], 'DOCG': [' DOCG', ' (DOCG)'], 'IGT': [' IGT'], 'DO': [' DO', ' (DO)'],
          'DOCa': [' DOCa', ' DOQ'], 'VP': [' VP', ' (Vino de Pago)'], 'AVA': [' AVA', ' (AVA)'],
          'DAC': [' DAC'], 'VQA': [' VQA'], 'WO': [' WO'], 'PDO': [' PDO', ' (PDO)'], 'PGI': [' PGI'],
          'GI': [' GI'], 'IG': [' IG'], 'AOG': [' AOG']}
GENERIC = [' wine', ' (wine)', ' wine region', ' (wine region)', ' wine-producing region']
LOCAL_PREFIX = {'fr': ['Vignoble de ', 'Vignoble du ', 'Vignoble des ', 'Vignoble d\''],
                'es': ['DO ', 'Denominación de Origen ', 'D.O. '], 'it': ['Vino '], 'pt': ['DOC '],
                'de': ['Weinbaugebiet ', 'Weinanbaugebiet '], 'at': ['Weinbaugebiet '], 'hu': [],
                'cl': ['Valle de '], 'ar': []}

QID = lambda u: u.rsplit('/', 1)[1] if u else None


def filename_from_fp(u):
    # http://commons.wikimedia.org/wiki/Special:FilePath/Name.jpg -> File:Name.jpg
    return 'File:' + urllib.parse.unquote(u.rsplit('/', 1)[1]).replace('_', ' ')


def props(qids):
    """Fetch classes, coords, countries, image properties, commons category, labels for items."""
    out = {}
    qids = sorted(set(qids))
    for i in range(0, len(qids), 150):
        chunk = qids[i:i + 150]
        vals = ' '.join('wd:' + q for q in chunk)
        q = f'''SELECT ?item (SAMPLE(?lab) AS ?label) (SAMPLE(?d) AS ?desc) (SAMPLE(?c) AS ?coord)
 (GROUP_CONCAT(DISTINCT ?p31;separator="|") AS ?cls) (GROUP_CONCAT(DISTINCT ?p17;separator="|") AS ?ctry)
 (GROUP_CONCAT(DISTINCT ?i18;separator="|") AS ?p18) (GROUP_CONCAT(DISTINCT ?i8592;separator="|") AS ?p8592)
 (GROUP_CONCAT(DISTINCT ?i3451;separator="|") AS ?p3451) (GROUP_CONCAT(DISTINCT ?i948;separator="|") AS ?p948)
 (SAMPLE(?cat) AS ?commonscat) (SAMPLE(?ea) AS ?eambrosia) (SAMPLE(?sl) AS ?sitelinks) WHERE {{
 VALUES ?item {{ {vals} }}
 OPTIONAL {{ ?item rdfs:label ?lab FILTER(LANG(?lab) IN ("en","mul")) }}
 OPTIONAL {{ ?item schema:description ?d FILTER(LANG(?d)="en") }}
 OPTIONAL {{ ?item wdt:P625 ?c }} OPTIONAL {{ ?item wdt:P31 ?p31 }}
 OPTIONAL {{ ?item wdt:P17|wdt:P495 ?p17 }}
 OPTIONAL {{ ?item wdt:P18 ?i18 }} OPTIONAL {{ ?item wdt:P8592 ?i8592 }} OPTIONAL {{ ?item wdt:P3451 ?i3451 }}
 OPTIONAL {{ ?item wdt:P948 ?i948 }} OPTIONAL {{ ?item wdt:P373 ?cat }} OPTIONAL {{ ?item wdt:P9854 ?ea }}
 OPTIONAL {{ ?item wikibase:sitelinks ?sl }}
}} GROUP BY ?item'''
        for r in sparql(q):
            qid = QID(r['item'])
            co = None
            m = re.match(r'Point\(([-\d.eE]+) ([-\d.eE]+)\)', r.get('coord', ''))
            if m:
                co = (float(m.group(2)), float(m.group(1)))
            sp = lambda k: [x for x in (r.get(k) or '').split('|') if x]
            out[qid] = {'qid': qid, 'label': r.get('label') or '', 'desc': r.get('desc') or '', 'coord': co,
                        'cls': [QID(x) for x in sp('cls')], 'ctry': [QID(x) for x in sp('ctry')],
                        'p18': [filename_from_fp(x) for x in sp('p18')],
                        'p8592': [filename_from_fp(x) for x in sp('p8592')],
                        'p3451': [filename_from_fp(x) for x in sp('p3451')],
                        'p948': [filename_from_fp(x) for x in sp('p948')],
                        'cat': r.get('commonscat'), 'ea': r.get('eambrosia'),
                        'sl': int(r.get('sitelinks') or 0)}
    return out


def label_lookup(lits):
    """lits: list of (text, lang). Return {(text,lang): [qid,...]} via exact rdfs:label/skos:altLabel."""
    res = collections.defaultdict(list)
    lits = sorted(set(lits))
    for i in range(0, len(lits), 1200):
        chunk = lits[i:i + 1200]
        vals = ' '.join('"%s"@%s' % (sq(t), l) for t, l in chunk)
        q = f'SELECT ?lit ?item WHERE {{ VALUES ?lit {{ {vals} }} ?item rdfs:label|skos:altLabel ?lit . }}'
        rows = sparql(q, timeout=120)
        idx = {}
        for t, l in chunk:
            idx.setdefault(t, []).append(l)
        for r in rows:
            for l in idx.get(r['lit'], []):
                res[(r['lit'], l)].append(QID(r['item']))
        print(f'  labels {i + len(chunk)}/{len(lits)} -> {sum(len(v) for v in res.values())} hits', flush=True)
    return res


def is_wine(p):
    if set(p['cls']) & WINECLS or p.get('ea'):
        return True
    d = p['desc'].lower()
    return bool(re.search(r'\b(wine|wines|appellation|viticultural|vineyard|wine-producing|vin|vino|weinbau|denomina)', d))


def is_bad(p):
    return bool(set(p['cls']) & BAD_CLS) or 'disambiguation' in p['desc'].lower()


def name_variants(t):
    base = [t['name']] + [a for a in (t.get('alt') or []) if a and len(a) > 2][:4]
    v = set()
    for n in base:
        v.add(n)
        for s in SUFFIX.get(t.get('cat') or '', []):
            v.add(n + s)
        for s in GENERIC:
            v.add(n + s)
        for p in LOCAL_PREFIX.get(t['country'], []):
            v.add(p + n)
    return v


def match_by_labels(targets, kind):
    lits = []
    tl = {}
    for t in targets:
        langs = ['en', 'mul'] + LANGS.get(t['country'], [])
        vs = name_variants(t)
        tl[t['id']] = [(x, l) for x in vs for l in langs]
        lits += tl[t['id']]
    hits = label_lookup(lits)
    cand = {tid: sorted({q for lit in lits_ for q in hits.get(lit, [])}) for tid, lits_ in tl.items()}
    allq = {q for v in cand.values() for q in v}
    print(kind, 'candidate items', len(allq), flush=True)
    P = props(allq)
    out = {}
    for t in targets:
        cq = CQ.get(t['country'])
        res = []
        for q in cand[t['id']]:
            p = P.get(q)
            if not p or is_bad(p):
                continue
            dist = None
            if p['coord'] and t.get('lat') is not None:
                dist = haversine(t['lat'], t['lon'], p['coord'][0], p['coord'][1])
            # allowed distance: generous for big regions
            span = 30.0
            if t.get('bbox'):
                b = t['bbox']
                span = max(30.0, 0.6 * haversine(b[1], b[0], b[3], b[2]))
            in_country = cq in p['ctry']
            if dist is not None and dist > span:
                continue
            if dist is None and not in_country:
                continue
            if p['ctry'] and not in_country and dist is None:
                continue
            wine = is_wine(p)
            if not wine and dist is None:
                continue  # an unlocated non-wine item is too risky
            score = (3 if wine else 1) + (1 if in_country else 0) + (1 if dist is not None and dist < span / 3 else 0)
            res.append(dict(p, kind='wine' if wine else 'place', score=score, dist_km=None if dist is None else round(dist, 1)))
        res.sort(key=lambda x: (-x['score'], -(x['sl'])))
        if res:
            out[t['id']] = res[:6]
    return out


def match_grapes(targets):
    vivc = {str(t['vivc']): t for t in targets if t.get('vivc')}
    vals = ' '.join('"%s"' % v for v in vivc)
    rows = sparql(f'SELECT ?v ?item WHERE {{ VALUES ?v {{ {vals} }} ?item wdt:P3904 ?v . }}')
    m = collections.defaultdict(list)
    for r in rows:
        m[r['v']].append(QID(r['item']))
    # fallback by label for grapes lacking a VIVC hit
    rest = [t for t in targets if str(t.get('vivc')) not in m]
    lits = [(t['name'], l) for t in rest for l in ('en', 'mul', 'fr', 'it', 'es', 'de', 'pt')]
    lits += [(t['name'] + ' (grape)', 'en') for t in rest]
    hits = label_lookup(lits)
    allq = {q for v in m.values() for q in v} | {q for v in hits.values() for q in v}
    P = props(allq)
    grapecls = None
    out = {}
    for t in targets:
        res = []
        for q in m.get(str(t.get('vivc')), []):
            if q in P:
                res.append(dict(P[q], kind='grape', score=5, dist_km=None))
        if not res:
            for l in ('en', 'mul', 'fr', 'it', 'es', 'de', 'pt'):
                for q in hits.get((t['name'], l), []) + hits.get((t['name'] + ' (grape)', 'en'), []):
                    p = P.get(q)
                    if p and re.search(r'grape|variety|cultivar|vitis|cépage|vitigno|rebsorte|uva', p['desc'], re.I):
                        res.append(dict(p, kind='grape', score=3, dist_km=None))
        seen = set()
        res = [r for r in res if not (r['qid'] in seen or seen.add(r['qid']))]
        if res:
            out[t['id']] = res[:3]
    return out


GENERIC_SITE = set(norm('chateau château domaine domaines weingut bodega bodegas quinta tenuta cantina cantine azienda agricola '
                        'fattoria castello castle schloss villa winery wines wine vineyards vineyard estate estates cellars cellar '
                        'cave caves maison house the de du des la le les di del della dei degli do da dos das y e et and of '
                        'clos vinicola vinos vins vini wijngoed wijnhuis kellerei hof herdade adega casa mas cascina podere '
                        'family familia vigneti vignoble winzer winzergenossenschaft cooperative cooperativa sa srl ltd inc co').split())


def core_tokens(s):
    return [w for w in norm(s).split() if w not in GENERIC_SITE and len(w) > 1]


def name_sim(a, b):
    ta, tb = set(core_tokens(a)), set(core_tokens(b))
    if not ta or not tb:
        return 1.0 if norm(a) == norm(b) else 0.0
    inter = len(ta & tb)
    if inter == 0:
        return 0.0
    return inter / min(len(ta), len(tb)) * (0.5 + 0.5 * inter / max(len(ta), len(tb)))


def match_sites(targets):
    out = {}
    for i in range(0, len(targets), 40):
        chunk = targets[i:i + 40]
        vals = ' '.join('("%s" "Point(%s %s)"^^geo:wktLiteral "%s")' % (t['id'], t['lon'], t['lat'],
                         '1.2' if t.get('cq') == 'precise' else '4') for t in chunk)
        q = f'''SELECT ?key ?item ?dist (GROUP_CONCAT(DISTINCT ?lab;separator="|") AS ?labels) WHERE {{
  VALUES (?key ?pt ?rad) {{ {vals} }}
  SERVICE wikibase:around {{ ?item wdt:P625 ?loc . bd:serviceParam wikibase:center ?pt; wikibase:radius ?rad; wikibase:distance ?dist. }}
  FILTER EXISTS {{ ?item wdt:P18|wdt:P373|wdt:P8592 [] }}
  ?item rdfs:label ?lab .
}} GROUP BY ?key ?item ?dist'''
        rows = sparql(q, timeout=120)
        by = collections.defaultdict(list)
        for r in rows:
            by[r['key']].append(r)
        cands = {}
        for t in chunk:
            best = []
            for r in by.get(t['id'], []):
                labs = (r.get('labels') or '').split('|')
                s = max((name_sim(t['name'], l) for l in labs), default=0)
                if s >= 0.6:
                    best.append((s, float(r['dist']), QID(r['item'])))
            best.sort(key=lambda x: (-x[0], x[1]))
            if best:
                cands[t['id']] = best[:3]
        P = props({q for v in cands.values() for _, _, q in v})
        for tid, lst in cands.items():
            res = []
            for s, d, q in lst:
                p = P.get(q)
                if not p or is_bad(p):
                    continue
                res.append(dict(p, kind='site', score=round(s * 3, 2), dist_km=round(d, 2)))
            if res:
                out[tid] = res
        print(f'  sites {i + len(chunk)}/{len(targets)} matched {len(out)}', flush=True)
    return out


def match_events(targets):
    urls = {}
    for t in targets:
        for u in t.get('wp') or []:
            u = u.split('#')[0]
            m = re.match(r'https?://([a-z\-]+)\.wikipedia\.org/wiki/(.+)', u)
            if not m:
                continue
            title = urllib.parse.unquote(m.group(2)).replace(' ', '_')
            canon = f'https://{m.group(1)}.wikipedia.org/wiki/' + urllib.parse.quote(title, safe="()_,'!*:;@&=+$-.~")
            urls.setdefault(canon, []).append(t['id'])
    res = collections.defaultdict(list)
    ul = sorted(urls)
    for i in range(0, len(ul), 150):
        vals = ' '.join('<%s>' % u for u in ul[i:i + 150])
        for r in sparql(f'SELECT ?u ?item WHERE {{ VALUES ?u {{ {vals} }} ?u schema:about ?item . }}'):
            for tid in urls.get(r['u'], []):
                res[tid].append(QID(r['item']))
    P = props({q for v in res.values() for q in v})
    out = {}
    for t in targets:
        lst = []
        for k, q in enumerate(res.get(t['id'], [])):
            p = P.get(q)
            if p and not is_bad(p):
                dist = None
                if p['coord'] and t.get('lat') is not None:
                    dist = haversine(t['lat'], t['lon'], p['coord'][0], p['coord'][1])
                lst.append(dict(p, kind='event', score=3 - 0.3 * k, dist_km=None if dist is None else round(dist, 1)))
        if lst:
            out[t['id']] = lst
    return out


def main():
    which = sys.argv[1:] or ['grape', 'appellation', 'region', 'site', 'event', 'country']
    path = f'{W}/wd_match.json'
    M = json.load(open(path)) if os.path.exists(path) else {}
    by = collections.defaultdict(list)
    for t in T:
        by[t['type']].append(t)

    def save():
        json.dump(M, open(path + '.tmp', 'w'), ensure_ascii=False)
        os.replace(path + '.tmp', path)
    if 'grape' in which:
        M.update(match_grapes(by['grape']))
        print('grapes matched', sum(1 for t in by['grape'] if t['id'] in M), flush=True)
        save()
    if 'appellation' in which:
        apps = by['appellation']
        # eAmbrosia first
        ea = {str(t['ea']): t for t in apps if t.get('ea') and str(t['ea']).startswith('EUGI')}
        vals = ' '.join('"%s"' % e for e in ea)
        rows = sparql(f'SELECT ?e ?item WHERE {{ VALUES ?e {{ {vals} }} ?item wdt:P9854 ?e . }}')
        eam = collections.defaultdict(list)
        for r in rows:
            eam[r['e']].append(QID(r['item']))
        P = props({q for v in eam.values() for q in v})
        lab = match_by_labels(apps, 'appellation')
        for t in apps:
            res = [dict(P[q], kind='wine', score=6, dist_km=None) for q in eam.get(str(t.get('ea')), []) if q in P]
            for r in lab.get(t['id'], []):
                if r['qid'] not in {x['qid'] for x in res}:
                    res.append(r)
            if res:
                M[t['id']] = res[:6]
        print('appellations matched', sum(1 for t in apps if t['id'] in M), 'of', len(apps), flush=True)
        save()
    if 'region' in which:
        M.update(match_by_labels(by['region'], 'region'))
        print('regions matched', sum(1 for t in by['region'] if t['id'] in M), flush=True)
        save()
    if 'site' in which:
        M.update(match_sites(by['site']))
        print('sites matched', sum(1 for t in by['site'] if t['id'] in M), flush=True)
        save()
    if 'event' in which:
        M.update(match_events(by['event']))
        print('events matched', sum(1 for t in by['event'] if t['id'] in M), flush=True)
        save()
    json.dump(M, open(path + '.tmp', 'w'), ensure_ascii=False)
    os.replace(path + '.tmp', path)
    print(STATS)


if __name__ == '__main__':
    main()
