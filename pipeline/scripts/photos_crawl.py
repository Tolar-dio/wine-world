#!/usr/bin/env python3
"""Crawl Commons category trees ("Vineyards in <country>", "Wineries in <country>", "Wine regions of
<country>") through the WDQS MWAPI bridge and record every file with size, mime and coordinates,
plus the categories it was found in. Output: work/photos/pool.json (resumable state in crawl_state.json).
Usage: python3 scripts/photos_crawl.py [max_categories]
"""
import json, os, re, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import mwapi_rows, sq, STATS

W = '/home/claude/winesite/work/photos'
STATE = f'{W}/crawl_state.json'
POOL = f'{W}/pool.json'

COMMONS_COUNTRY = {
    'al': 'Albania', 'am': 'Armenia', 'ar': 'Argentina', 'at': 'Austria', 'au': 'Australia', 'az': 'Azerbaijan',
    'ba': 'Bosnia and Herzegovina', 'be': 'Belgium', 'bg': 'Bulgaria', 'bo': 'Bolivia', 'br': 'Brazil', 'ca': 'Canada',
    'ch': 'Switzerland', 'cl': 'Chile', 'cn': 'China', 'co': 'Colombia', 'cv': 'Cape Verde', 'cy': 'Cyprus',
    'cz': 'the Czech Republic', 'de': 'Germany', 'dk': 'Denmark', 'dz': 'Algeria', 'ec': 'Ecuador', 'eg': 'Egypt',
    'es': 'Spain', 'et': 'Ethiopia', 'fr': 'France', 'gb': 'the United Kingdom', 'ge': 'Georgia (country)', 'gr': 'Greece',
    'hr': 'Croatia', 'hu': 'Hungary', 'id': 'Indonesia', 'il': 'Israel', 'in': 'India', 'iq': 'Iraq', 'ir': 'Iran',
    'it': 'Italy', 'jo': 'Jordan', 'jp': 'Japan', 'ke': 'Kenya', 'kg': 'Kyrgyzstan', 'kh': 'Cambodia', 'kr': 'South Korea',
    'kz': 'Kazakhstan', 'lb': 'Lebanon', 'lu': 'Luxembourg', 'ly': 'Libya', 'ma': 'Morocco', 'md': 'Moldova',
    'me': 'Montenegro', 'mg': 'Madagascar', 'mk': 'North Macedonia', 'mm': 'Myanmar', 'mt': 'Malta', 'mx': 'Mexico',
    'na': 'Namibia', 'nl': 'the Netherlands', 'no': 'Norway', 'nz': 'New Zealand', 'pe': 'Peru', 'pl': 'Poland',
    'ps': 'Palestine', 'pt': 'Portugal', 'py': 'Paraguay', 'ro': 'Romania', 'rs': 'Serbia', 'ru': 'Russia', 'se': 'Sweden',
    'si': 'Slovenia', 'sk': 'Slovakia', 'sy': 'Syria', 'th': 'Thailand', 'tj': 'Tajikistan', 'tm': 'Turkmenistan',
    'tn': 'Tunisia', 'tr': 'Turkey', 'tw': 'Taiwan', 'tz': 'Tanzania', 'ua': 'Ukraine', 'us': 'the United States',
    'uy': 'Uruguay', 'uz': 'Uzbekistan', 've': 'Venezuela', 'vn': 'Vietnam', 'xk': 'Kosovo', 'za': 'South Africa',
    'zw': 'Zimbabwe'}
EXTRA_ROOTS = {'gb': ['Category:Vineyards in England', 'Category:Vineyards in Wales'],
               'fr': ['Category:Wines of France by region'], 'ps': ['Category:Wineries in Occupied Palestine']}

SKIP = re.compile(r'\b(maps?|logos?|labels?|bottles?|people|portraits?|men|women|children|events?|festivals?|'
                  r'tractors?|vehicles?|machinery|machines|signs?|signage|sculptures?|statues?|paintings?|drawings?|'
                  r'interiors?|stained glass|furniture|restaurants?|hotels?|shops?|stores?|advertis\w*|posters?|'
                  r'videos?|audio|documents?|books?|wine glasses|glasses|food|dishes|cuisine|coats? of arms|flags?|'
                  r'stamps?|coins?|banknotes?|weddings?|concerts?|sports?|marathons?|races?|cycling|animals|birds|insects|'
                  r'plants? diseases|pests?|diseases|botanical illustrations|herbarium|microscop\w+|'
                  r'grape varieties|cultivars?|wine tasting|tastings|sommeliers?|winemakers|vintners|'
                  r'buildings? by|architecture of|churches|chapels|cemeter\w+|war memorials|military|railway|stations?|'
                  r'roads?|streets?|bridges?|rivers?)\b', re.I)
# category names we still want even if SKIP matches part of them
WINEY = re.compile(r'(vine|vign|wein|weing|reb|ried|lage|vino|vini|wine|viñ|vinh|grape|uva|traube|cellar|chai|cave|cantin|ch[aâ]teau|domaine|clos|quinta|bodega|tenuta|fattoria|azienda|estate|winery|cru|terroir|harvest|vendang|vendemmia|lese|appellation|aoc|doc|igt|ava|\bdo\b|pdo|kellerei|keller|pince|bor|vin)', re.I)
KEEP = re.compile(r'\b(vineyards?|vignobles?|weinberg\w*|weinbau|vigneti?|viñedos?|vinhas?|vinhedos?|terraces?)\b', re.I)


def members(cat, expect=True):
    q = f'''SELECT ?title ?ns ?w ?h ?mime ?lat ?lon ?csize WHERE {{ SERVICE wikibase:mwapi {{
    bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
    mwapi:generator "categorymembers"; mwapi:gcmtitle "{sq(cat)}"; mwapi:gcmtype "subcat|file"; mwapi:gcmlimit "500";
    mwapi:prop "coordinates|imageinfo|categoryinfo"; mwapi:colimit "max"; mwapi:iiprop "size|mime".
    ?csize wikibase:apiOutput "categoryinfo/@size".
    ?title wikibase:apiOutput mwapi:title. ?ns wikibase:apiOutput "@ns".
    ?w wikibase:apiOutput "imageinfo/ii/@width". ?h wikibase:apiOutput "imageinfo/ii/@height". ?mime wikibase:apiOutput "imageinfo/ii/@mime".
    ?lat wikibase:apiOutput "coordinates/co/@lat". ?lon wikibase:apiOutput "coordinates/co/@lon". }} }}'''
    return mwapi_rows(q, expect_nonempty=expect, tries=4)


def existing_roots(cats):
    """Return {category: size} for categories that exist (batched via allcategories)."""
    out = {}
    for i in range(0, len(cats), 40):
        chunk = cats[i:i + 40]
        vals = ' '.join('"%s"' % sq(c[9:]) for c in chunk)
        q = f'''SELECT ?title ?csize WHERE {{ VALUES ?t {{ {vals} }} SERVICE wikibase:mwapi {{
        bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
        mwapi:generator "allcategories"; mwapi:gacfrom ?t; mwapi:gacto ?t; mwapi:gaclimit "1"; mwapi:prop "categoryinfo".
        ?title wikibase:apiOutput mwapi:title. ?csize wikibase:apiOutput "categoryinfo/@size". }} }}'''
        for r in mwapi_rows(q, expect_nonempty=True, tries=4):
            out[r['title']] = int(r.get('csize') or 0)
    return out


def save(obj, path):
    tmp = path + '.tmp'
    json.dump(obj, open(tmp, 'w'), ensure_ascii=False)
    os.replace(tmp, path)


def ok_deep(nm, kind, depth):
    """Deep in the 'Wine regions' and 'Wineries' trees, only follow wine-related category names."""
    lim = {'v': 5, 'r': 3, 'w': 3}[kind]
    return depth < lim or bool(WINEY.search(nm))


def main():
    maxcats = int(sys.argv[1]) if len(sys.argv) > 1 else 12000
    if os.path.exists(STATE):
        st = json.load(open(STATE))
    else:
        queue = []
        for iso, name in COMMONS_COUNTRY.items():
            queue.append([f'Category:Vineyards in {name}', iso, 0, 'v'])
        for iso, name in COMMONS_COUNTRY.items():
            queue.append([f'Category:Wine regions of {name}', iso, 0, 'r'])
            for c in EXTRA_ROOTS.get(iso, []):
                queue.append([c, iso, 0, 'r'])
        for iso, name in COMMONS_COUNTRY.items():
            queue.append([f'Category:Wineries in {name}', iso, 0, 'w'])
        ex = existing_roots([q[0] for q in queue])
        print('roots existing:', len(ex), 'of', len(queue), flush=True)
        queue = [q for q in queue if ex.get(q[0], 0) > 0]
        st = {'queue': queue, 'seen': {}, 'files': {}}
    queue, seen, files = st['queue'], st['seen'], st['files']
    before = len(queue)
    queue[:] = [q for q in queue if ok_deep(q[0][9:], q[3], q[2])]
    print('queue pruned', before, '->', len(queue), flush=True)
    n = 0
    t0 = time.time()
    while queue and len(seen) < maxcats:
        cat, iso, depth, kind = queue.pop(0)
        if cat in seen:
            continue
        rows = members(cat, expect=True)
        seen[cat] = [iso, depth, kind, len(rows)]
        maxd = {'v': 7, 'r': 6, 'w': 4}[kind]
        for r in rows:
            t = r['title']
            if t.startswith('Category:'):
                if r.get('csize') is not None and int(r['csize']) == 0:
                    continue
                if depth + 1 <= maxd and t not in seen:
                    nm = t[9:]
                    if SKIP.search(nm) and not KEEP.search(nm):
                        continue
                    if re.search(r'\bby (year|month|season|decade)\b', nm):
                        continue
                    if not ok_deep(nm, kind, depth + 1):
                        continue
                    queue.append([t, iso, depth + 1, kind])
            elif t.startswith('File:'):
                f = files.get(t)
                if not f:
                    f = files[t] = {'w': int(r['w']) if r.get('w') else 0, 'h': int(r['h']) if r.get('h') else 0,
                                    'mime': r.get('mime', ''), 'cats': [], 'iso': iso, 'kind': kind}
                    if r.get('lat'):
                        f['lat'] = round(float(r['lat']), 6)
                        f['lon'] = round(float(r['lon']), 6)
                if cat not in f['cats']:
                    f['cats'].append(cat)
        n += 1
        if n % 25 == 0:
            save(st, STATE)
            print(f'{n} cats in {time.time() - t0:.0f}s; queue {len(queue)}; files {len(files)}; {STATS}', flush=True)
    save(st, STATE)
    save(files, POOL)
    print('done', len(seen), 'categories', len(files), 'files', 'queue left', len(queue))


if __name__ == '__main__':
    main()
