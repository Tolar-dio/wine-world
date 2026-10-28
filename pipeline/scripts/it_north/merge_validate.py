"""Merge northern Italy part files into data/content/it_a.json and validate.
Run with: python3 -I merge_validate.py
"""
import json, glob, re, csv, sys
from collections import Counter

W = '/home/claude/winesite'
parts = sorted(glob.glob(f'{W}/work/it_north/p*.json'))
out = dict(countries=[], regions=[], appellations=[], sites=[])
for p in parts:
    d = json.load(open(p))
    for k in out:
        out[k] += d.get(k, [])

problems = []
# --- dedupe appellations by name (keep the longer summary) ---
seen = {}
for a in out['appellations']:
    k = a['name']
    if k in seen:
        problems.append(f'duplicate appellation {k} (kept longer)')
        if len(a['summary']) > len(seen[k]['summary']):
            seen[k] = a
    else:
        seen[k] = a
out['appellations'] = list(seen.values())

# --- clean empty fields ---
for a in out['appellations']:
    if not a.get('terroir'):
        a['terroir'] = ''
    if a.get('area_ha') is None:
        a.pop('area_ha', None)
    if not a.get('nerd_note'):
        a.pop('nerd_note', None)

# --- site ids unique ---
ids = Counter(s['id'] for s in out['sites'])
for i, c in ids.items():
    if c > 1:
        problems.append(f'duplicate site id {i}')
for s in out['sites']:
    if not re.fullmatch(r'site-it-[a-z0-9-]+', s['id']):
        # ascii-fy
        import unicodedata
        new = unicodedata.normalize('NFKD', s['id']).encode('ascii', 'ignore').decode()
        new = re.sub(r'[^a-z0-9-]', '-', new.lower())
        new = re.sub(r'-+', '-', new).strip('-')
        problems.append(f'fixed site id {s["id"]} -> {new}')
        s['id'] = new

# --- text checks ---
BANNED = ['delve', 'robust', 'seamless', 'game-changer', 'unlock', 'leverage', 'comprehensive', 'cutting-edge',
          'transformative', 'innovative', "it's worth noting", 'nestled', 'boasts', 'tapestry', 'testament']
def walk(o, path=''):
    if isinstance(o, str):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from walk(v, path + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk(v, f'{path}[{i}]')
for path, txt in walk(out):
    if ('—' in txt or ' – ' in txt) and '.match' not in path:
        problems.append(f'dash at {path}: {txt[:60]}')
    low = txt.lower()
    for b in BANNED:
        if re.search(r'\b' + re.escape(b) + r'\b', low):
            problems.append(f'banned word "{b}" at {path}')

# --- word counts for sites ---
for s in out['sites']:
    n = len(s['text'].split())
    if n < 12 or n > 170:
        problems.append(f'site text length {n} words: {s["name"]}')

# --- region bboxes (rough) ---
BOX = {
 "Piedmont": (6.6, 44.05, 9.25, 46.5), "Valle d'Aosta": (6.75, 45.45, 7.95, 45.99), "Liguria": (7.45, 43.75, 10.1, 44.7),
 "Lombardy": (8.45, 44.65, 11.5, 46.65), "Trentino-Alto Adige": (10.35, 45.65, 12.5, 47.1), "Veneto": (10.6, 44.75, 13.15, 46.7),
 "Friuli Venezia Giulia": (12.3, 45.55, 13.95, 46.7), "Emilia-Romagna": (9.15, 43.7, 12.8, 45.15)}
app_region = {a['name']: a['region'] for a in out['appellations']}
for s in out['sites']:
    r = app_region.get(s['appellation'])
    if not r:
        problems.append(f'site {s["name"]} appellation "{s["appellation"]}" not among appellations')
        continue
    w, so, e, n = BOX[r]
    if not (w <= s['lon'] <= e and so <= s['lat'] <= n):
        problems.append(f'site {s["name"]} at {s["lat"]},{s["lon"]} outside {r} box')

# --- coverage against EU register: every northern PDO should be matched ---
reg = json.load(open('/tmp/claude-0/-home-claude/90b40977-645f-5938-93b5-ef5c99e44196/scratchpad/it/it_pdo_regions.json')) if len(sys.argv) < 2 else json.load(open(sys.argv[1]))
NORTH = {'Piemonte', 'Veneto', 'Lombardia', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Liguria', 'Trentino-Alto Adige', "Valle d'Aosta"}
allmatch = set()
for a in out['appellations']:
    for m in a['match']:
        allmatch.add(m)
missing = []
for x in reg:
    sh = x['shares']
    if sh and list(sh)[0] in NORTH:
        if x['name'] not in allmatch:
            missing.append(x['name'])
for m in missing:
    problems.append(f'EU PDO not matched exactly: {m}')

json.dump(out, open(f'{W}/data/content/it_a.json', 'w'), ensure_ascii=False, indent=1)
print('regions', len(out['regions']), 'appellations', len(out['appellations']), 'sites', len(out['sites']))
print('cats', Counter(a['cat'] for a in out['appellations']))
print('site kinds', Counter(s['kind'] for s in out['sites']))
print('PROBLEMS', len(problems))
for p in problems:
    print(' -', p)
