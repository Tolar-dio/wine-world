#!/usr/bin/env python3
"""Build data/content/global/{grapes,timeline,glossary,soils,systems}.json from the part
files in work/global/*_parts/*.py (each part defines a list named DATA).

Coordinates: an item may give 'k' (a key into work/global/wiki_*.json coordinate caches or a
Wikipedia title in wd_coords.json) instead of, or as well as, explicit lat/lon; cached
coordinates come from Wikipedia/Wikidata pages fetched by scripts/wiki_fetch.py.

Usage: python3 -I scripts/build_global.py grapes|timeline|glossary|soils|systems|all
"""
import json, os, re, sys, glob, unicodedata

ROOT = '/home/claude/winesite'
WORK = f'{ROOT}/work/global'
OUT = f'{ROOT}/data/content/global'
os.makedirs(OUT, exist_ok=True)

BANNED = ['delve', 'robust', 'seamless', 'game-changer', 'game changer', 'unlock', 'leverage', 'comprehensive',
          'cutting-edge', 'transformative', 'innovative', "it's worth noting", 'nestled', 'boasts', 'tapestry',
          'testament']
DASHES = ['—', '–', '‒', '―']

def load_coords():
    c = {}
    for fn in ['wiki_raw.json', 'wiki_tl.json', 'wiki_soils.json', 'wiki_origins.json', 'wiki_grapes.json', 'wiki_systems.json', 'wiki_extra.json']:
        p = f'{WORK}/{fn}'
        if os.path.exists(p):
            for k, v in json.load(open(p)).items():
                if v.get('coord'):
                    c[k] = v['coord']
                    c[v['title']] = v['coord']
    p = f'{WORK}/wd_coords.json'
    if os.path.exists(p):
        for k, v in json.load(open(p)).items():
            c.setdefault(k, v)
    return c

COORDS = load_coords()

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

def place_coord(d, where):
    k = d.pop('k', None)
    if k and k in COORDS:
        lat, lon = COORDS[k]
        # explicit values override cache only when 'force' set
        if not d.get('force'):
            d['lat'], d['lon'] = lat, lon
    d.pop('force', None)
    if d.get('lat') is None or d.get('lon') is None:
        raise SystemExit(f'missing coordinates for {where}: {d} (key {k})')
    d['lat'] = round(float(d['lat']), 4)
    d['lon'] = round(float(d['lon']), 4)
    return d

PROBLEMS = []

def check_text(where, s):
    if not isinstance(s, str):
        return
    for ch in DASHES:
        if ch in s:
            PROBLEMS.append(f'dash in {where}: ...{s[max(0, s.find(ch) - 30):s.find(ch) + 30]}...')
    low = s.lower()
    for b in BANNED:
        if re.search(r'\b' + re.escape(b) + r'\b', low):
            PROBLEMS.append(f'banned word "{b}" in {where}')

def walk_text(where, obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ('url',):
                continue
            walk_text(f'{where}.{k}', v)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_text(f'{where}[{i}]', v)
    else:
        check_text(where, obj)

def words(s):
    return len(re.findall(r"[A-Za-z0-9À-ɏ'’]+", s or ''))

def load_parts(kind):
    items = []
    for fn in sorted(glob.glob(f'{WORK}/{kind}_parts/[!z]*.py')):
        ns = {}
        exec(compile(open(fn, encoding='utf-8').read(), fn, 'exec'), ns)
        for it in ns['DATA']:
            it['_src'] = os.path.basename(fn)
            items.append(it)
    return items

def wcheck(where, s, lo, hi):
    n = words(s)
    if n < lo or n > hi:
        PROBLEMS.append(f'length {n} words (want {lo}-{hi}) in {where}')

# ---------------------------------------------------------------- grapes
VIVC = json.load(open(f'{WORK}/vivc_raw.json')) if os.path.exists(f'{WORK}/vivc_raw.json') else {}
VK_ALIAS = {'melon-de-bourgogne': 'melon', 'magdeleine-noire-des-charentes': 'magdeleine-noire', 'gamay': 'gamay',
            'carignan': 'carignan-alt', 'vernaccia-di-san-gimignano': 'vernaccia-di-san-gimignano',
            'muscat-blanc-a-petits-grains': 'muscat-blanc', 'nero-di-troia': 'nero-di-troia',
            'kalecik-karasi': 'kalecik-karasi', 'listan-prieto': 'listan-prieto', 'feteasca-neagra': 'feteasca-neagra',
            'babeasca-neagra': 'rara-neagra', 'trousseau': 'trousseau-noir', 'poulsard': 'poulsard-noir',
            'lambrusco': 'lambrusco-salamino', 'bual': 'bual', 'grasa-de-cotnari': 'grasa', 'saint-laurent': 'st-laurent-alt',
            'macabeo': 'macabeo', 'mourvedre': 'monastrell2', 'cynthiana': 'norton', 'zinfandel': 'zinfandel',
            'mtsvane-kakhuri': 'mtsvane-kakhuri', 'koshu': 'koshu', 'hondarrabi-zuri': 'hondarrabi-zuri',
            'blauer-portugieser': 'portugieser', 'heben': 'hebén', 'mourisco-tinto': 'mourisco-alt', 'schiava': 'schiava-grossa',
            'cornalin': 'cornalin-valais', 'mantonico-bianco': 'mantonico', 'grenache': 'grenache', 'bonarda': '',
            'cereza': 'cereza', 'criolla-grande': 'criolla-grande', 'torrontes': 'torrontes', 'quebranta': 'quebranta',
            'norton': 'norton', 'seyval-blanc': 'seyval-blanc', 'muscat-of-alexandria': 'muscat-of-alexandria'}
VIVC_BLACKLIST = {'zametovka', 'st-georgener-rebe', 'okuzgozu', 'petite-arvine', 'bonarda', 'greco', 'tinta-negra',
                  'lambrusco', 'sciaccarellu', 'peloursin', 'fruhburgunder', 'shiroka-melnishka', 'carmenere-x'}
COLORS = {'red', 'white', 'pink', 'grey'}
CONF = {'documented', 'likely', 'debated'}

def build_grapes():
    raw = load_parts('grapes')
    ext = {}
    for fn in sorted(glob.glob(f'{WORK}/grapes_parts/zz_*.json')):
        ext.update(json.load(open(fn, encoding='utf-8')))
    for g in raw:
        gid = g.get('id') or slug(g['name'])
        if gid in ext:
            g['profile'] = g['profile'].rstrip() + ' ' + ext[gid].strip()
    out, ids, names = [], set(), {}
    for g in raw:
        gid = g.get('id') or slug(g['name'])
        if gid in ids:
            raise SystemExit(f'duplicate grape id {gid}')
        ids.add(gid)
        names[g['name'].lower()] = gid
        for s in g.get('synonyms', []):
            names.setdefault(s.lower(), gid)
    # offspring index
    kids = {}
    for g in raw:
        for p in g.get('parents', []):
            pid = names.get(p.lower())
            key = pid or p.lower()
            kids.setdefault(key, []).append(g['name'])
    MUTANTS = {g['name'] for g in raw if g.get('mutation_of')}
    mut_kids = {}
    for g in raw:
        if g.get('mutation_of'):
            mut_kids.setdefault(g['mutation_of'], []).append(g['name'])
    for g in raw:
        gid = g.get('id') or slug(g['name'])
        o = dict(g['origin'])
        o = place_coord(o, f'grape {gid} origin')
        if o.get('confidence') not in CONF:
            PROBLEMS.append(f'bad confidence {gid}')
        if g['color'] not in COLORS:
            PROBLEMS.append(f'bad color {gid}')
        off = []
        for n in kids.get(gid, []) + g.get('offspring', []):
            if n in MUTANTS:
                continue
            if n not in off and n != g['name']:
                off.append(n)
        rec = {
            'name': g['name'], 'id': gid, 'color': g['color'], 'synonyms': g.get('synonyms', []),
            'origin': {'place': o['place'], 'country': o['country'], 'lat': o['lat'], 'lon': o['lon'],
                       'confidence': o['confidence']},
            'parents': g.get('parents', []), 'parentage_note': g.get('parentage_note', ''),
            'offspring': off, 'species': g['species'], 'countries': g.get('countries', []),
            'regions': g.get('regions', []), 'hectares': g.get('hectares', ''),
            'profile': g['profile'].strip(), 'trivia': g['trivia'].strip(),
        }
        if g.get('mutation_of'):
            rec['mutation_of'] = g['mutation_of']
        if mut_kids.get(g['name']):
            rec['mutations'] = mut_kids[g['name']]
        vk = g.get('vk') or VK_ALIAS.get(gid) or gid
        v = {} if gid in VIVC_BLACKLIST else VIVC.get(vk, {})
        if v and v.get('id'):
            rec['vivc'] = {'id': int(v['id']), 'prime_name': v['prime'],
                           'url': f"https://www.vivc.de/index.php?r=passport%2Fview&id={v['id']}"}
        wcheck(f'grape {gid} profile', rec['profile'], 80, 200)
        for c in rec['countries'] + [o['country']]:
            if not re.fullmatch(r'[a-z]{2}', c):
                PROBLEMS.append(f'bad country {c} in {gid}')
        walk_text(f'grape {gid}', rec)
        out.append(rec)
    for rec in out:
        rec['parent_ids'] = [names.get(p.lower()) for p in rec['parents']]
        rec['offspring_ids'] = [names.get(o.lower()) for o in rec['offspring']]
    missing = sorted({p for g in out for p in g['parents'] if p.lower() not in names})
    data = {'grapes': out, 'meta': {
        'generated': '2026-10-28', 'count': len(out),
        'notes': 'parent_ids and offspring_ids give the matching grape id or null when the relative has no entry. mutation_of / mutations mark colour or clonal mutations (same genotype), which are not parent-offspring links. Parentage follows VIVC (Vitis International Variety Catalogue, vivc.de, pedigrees confirmed by markers, queried Oct 2026) cross-checked with the papers cited in each parentage_note. Hectares carry their own year and source. Parents not present as their own entry: ' + ', '.join(missing),
        'sources': [
            {'title': 'Vitis International Variety Catalogue (VIVC), JKI Geilweilerhof', 'url': 'https://www.vivc.de/'},
            {'title': 'OIV Focus 2017: Distribution of the world\'s grapevine varieties', 'url': 'https://www.oiv.int/public/medias/5888/en-distribution-of-the-worlds-grapevine-varieties.pdf'},
            {'title': 'Robinson, Harding and Vouillamoz, Wine Grapes (2012)', 'url': 'https://www.winegrapesbook.com/'},
            {'title': 'Anderson and Nelgen, Which Winegrape Varieties are Grown Where? (University of Adelaide Press)', 'url': 'https://www.adelaide.edu.au/press/titles/winegrapes'},
        ]}}
    return data, len(out)

# ---------------------------------------------------------------- timeline
TAGS = {'origins', 'religion', 'trade', 'law', 'science', 'disaster', 'classification', 'new-world', 'technology', 'culture'}

def build_timeline():
    raw = load_parts('timeline')
    out, ids = [], set()
    for e in raw:
        eid = e.get('id') or slug(f"{e['year']}-{e['title']}")[:60].strip('-')
        if eid in ids:
            raise SystemExit(f'duplicate event id {eid}')
        ids.add(eid)
        loc = {'place': e['place'], 'country': e['country'], 'lat': e.get('lat'), 'lon': e.get('lon'), 'k': e.get('k'),
               'force': e.get('force')}
        loc = place_coord(loc, f'event {eid}')
        for t in e['tags']:
            if t not in TAGS:
                PROBLEMS.append(f'bad tag {t} in {eid}')
        rec = {'id': eid, 'year': e['year'], 'date_label': e['date_label'], 'title': e['title'], 'text': e['text'].strip(),
               'place': loc['place'], 'country': loc['country'], 'lat': loc['lat'], 'lon': loc['lon'], 'zoom': e['zoom'],
               'tags': e['tags'], 'sources': e['sources']}
        wcheck(f'event {eid}', rec['text'], 60, 160)
        if not (3 <= rec['zoom'] <= 12):
            PROBLEMS.append(f'zoom out of range {eid}')
        walk_text(f'event {eid}', rec)
        out.append(rec)
    out.sort(key=lambda r: (r['year'], r['id']))
    return {'events': out}, len(out)

# ---------------------------------------------------------------- glossary
def build_glossary():
    raw = load_parts('glossary')
    out, seen = [], set()
    for t in raw:
        key = t['term'].lower()
        if key in seen:
            raise SystemExit(f'duplicate term {key}')
        seen.add(key)
        rec = {'term': t['term'], 'lang': t['lang'], 'definition': t['definition'].strip(), 'related': t.get('related', [])}
        if t.get('example_place'):
            ep = dict(t['example_place'])
            ep = place_coord(ep, f'term {key}')
            rec['example_place'] = {'name': ep['name'], 'lat': ep['lat'], 'lon': ep['lon']}
        wcheck(f'term {key}', rec['definition'], 40, 120)
        walk_text(f'term {key}', rec)
        out.append(rec)
    out.sort(key=lambda r: unicodedata.normalize('NFKD', r['term']).encode('ascii', 'ignore').decode().lower())
    return {'terms': out}, len(out)

# ---------------------------------------------------------------- soils
def build_soils():
    raw = load_parts('soils')
    out, ids = [], set()
    for s in raw:
        sid = s.get('id') or slug(s['name'])
        if sid in ids:
            raise SystemExit(f'duplicate soil {sid}')
        ids.add(sid)
        ex = []
        for e in s['examples']:
            e = place_coord(dict(e), f'soil {sid} example {e.get("place")}')
            ex.append({'place': e['place'], 'country': e['country'], 'lat': e['lat'], 'lon': e['lon'], 'note': e['note']})
        rec = {'id': sid, 'name': s['name'], 'description': s['description'].strip(), 'examples': ex}
        if s.get('sources'):
            rec['sources'] = s['sources']
        wcheck(f'soil {sid}', rec['description'], 60, 150)
        walk_text(f'soil {sid}', rec)
        out.append(rec)
    return {'soils': out}, len(out)

# ---------------------------------------------------------------- systems
def build_systems():
    raw = load_parts('systems')
    out = []
    for s in raw:
        rec = {k: s[k] for k in ['country', 'iso2', 'name', 'tiers', 'labelling_rules', 'history', 'quirks']}
        if s.get('sources'):
            rec['sources'] = s['sources']
        walk_text(f'system {s["iso2"]}', rec)
        out.append(rec)
    return {'systems': out}, len(out)

BUILDERS = {'grapes': build_grapes, 'timeline': build_timeline, 'glossary': build_glossary, 'soils': build_soils,
            'systems': build_systems}

def main():
    which = sys.argv[1:] or ['all']
    if 'all' in which:
        which = list(BUILDERS)
    for w in which:
        PROBLEMS.clear()
        data, n = BUILDERS[w]()
        path = f'{OUT}/{w}.json'
        tmp = path + '.tmp'
        with open(tmp, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        json.load(open(tmp, encoding='utf-8'))
        os.replace(tmp, path)
        print(f'{w}: {n} items -> {path} ({os.path.getsize(path)//1024} KB); problems: {len(PROBLEMS)}')
        for p in PROBLEMS[:60]:
            print('  ', p)

if __name__ == '__main__':
    main()
