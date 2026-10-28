# Shared helpers for the Spain content parts. Each part script builds a dict and calls save().
import json, re, os, unicodedata
PARTS = '/home/claude/winesite/work/es/parts'
BANNED = ['delve', 'robust', 'seamless', 'game-changer', 'unlock', 'leverage', 'comprehensive', 'cutting-edge',
          'transformative', 'innovative', "it's worth noting", 'nestled', 'boasts', 'tapestry', 'testament']

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def site(name, kind, appellation, lat, lon, text, cls='', producers=None, q='precise', sid=None):
    return {'id': sid or 'site-es-' + slug(name), 'country': 'es', 'name': name, 'kind': kind, 'class': cls,
            'appellation': appellation, 'lat': round(lat, 4), 'lon': round(lon, 4), 'coord_quality': q,
            'text': text, 'producers': producers or []}

def app(name, match, cat, region, created, area_ha, styles, dominant, grapes, summary, terroir, producers,
        nerd, contains=None, subregion=None):
    m = list(dict.fromkeys([name] + match))
    return {'country': 'es', 'name': name, 'match': m, 'cat': cat, 'region': region, 'subregion': subregion,
            'created': created, 'area_ha': area_ha, 'styles': styles, 'dominant_style': dominant, 'grapes': grapes,
            'summary': summary, 'terroir': terroir, 'producers': producers, 'nerd_note': nerd, 'contains': contains or []}

def check_text(obj, where=''):
    probs = []
    def walk(o, path):
        if isinstance(o, str):
            if '—' in o or '–' in o:
                probs.append(f'dash at {path}')
            low = o.lower()
            for b in BANNED:
                if re.search(r'\b' + re.escape(b) + r'\b', low):
                    probs.append(f'banned "{b}" at {path}')
        elif isinstance(o, dict):
            for k, v in o.items(): walk(v, f'{path}.{k}')
        elif isinstance(o, list):
            for i, v in enumerate(o): walk(v, f'{path}[{i}]')
    walk(obj, where)
    return probs

def save(name, data):
    for k in ['countries', 'regions', 'appellations', 'sites']:
        data.setdefault(k, [])
    probs = check_text(data, name)
    ids = [s['id'] for s in data['sites']]
    dup = {i for i in ids if ids.count(i) > 1}
    if dup: probs.append(f'duplicate site ids {dup}')
    for s in data['sites']:
        if not re.fullmatch(r'site-es-[a-z0-9-]+', s['id']): probs.append('bad id ' + s['id'])
        n = len(s['text'].split())
        if n < 25 or n > 160: probs.append(f"site text words {n} for {s['id']}")
    os.makedirs(PARTS, exist_ok=True)
    p = os.path.join(PARTS, name + '.json')
    json.dump(data, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.load(open(p, encoding='utf-8'))
    print(f"{name}: countries={len(data['countries'])} regions={len(data['regions'])} apps={len(data['appellations'])} sites={len(data['sites'])}")
    for x in probs: print('  PROBLEM:', x)
