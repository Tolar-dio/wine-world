# Merge it_b part files into data/content/it_b.json and run validation checks.
import json, os, re, sys, unicodedata
sys.path.insert(0, '/home/claude/winesite/work/it_b')
from common import check_text, EU, _norm
BASE = '/home/claude/winesite/work/it_b/parts'
out = {'countries': [], 'regions': [], 'appellations': [], 'sites': []}
for part in ['country', 'tuscany', 'central', 'south', 'islands']:
    d = json.load(open(os.path.join(BASE, part + '.json'), encoding='utf-8'))
    for k in out: out[k] += d.get(k, [])
# fill region appellation lists
for r in out['regions']:
    r['appellations'] = [a['name'] for a in out['appellations'] if a['region'] == r['name']]
# enrich from Italian Wine Central facts (declared area, production)
FACTS = json.load(open('/home/claude/winesite/work/it_b/iwc_facts.json', encoding='utf-8'))
FK = {}
for k in FACTS:
    for p in re.split(r'/|–', k): FK[_norm(p)] = k
def num(x):
    try: return float(x.replace(',', ''))
    except Exception: return None
for a in out['appellations']:
    k = FK.get(_norm(a['name']))
    if not k: continue
    v = FACTS[k]
    ha = num((v.get('ha') or '').replace(' ha', '')) if v.get('ha') else None
    if ha is not None and 'area_ha' not in a and ha >= 1:
        a['area_ha'] = int(round(ha))
    if len(a['summary'].split()) < 30 and ha is not None:
        m = re.match(r'([\d,\.]+) hl', v.get('prod') or '')
        hl = num(m.group(1)) if m else None
        yr = v.get('ha_year') or '2021'
        if ha < 1:
            sent = f"Barely {ha:g} ha were declared in {yr}, so the name is close to dormant."
        else:
            sent = f"About {int(round(ha)):,} ha were declared in {yr}"
            if hl:
                b = hl * 133.3
                bt = f"{int(round(b, -3)):,}" if b >= 10000 else f"{int(round(b, -2)):,}"
                sent += f", giving roughly {bt} bottles a year."
            else:
                sent += "."
        a['summary'] = a['summary'].rstrip() + ' ' + sent
# checks
problems = []
names = [a['name'] for a in out['appellations']]
dups = {n for n in names if names.count(n) > 1}
if dups: problems.append(('duplicate appellation names', dups))
ids = [s['id'] for s in out['sites']]
d2 = {i for i in ids if ids.count(i) > 1}
if d2: problems.append(('duplicate site ids', d2))
for s in out['sites']:
    if not re.fullmatch(r'site-it-[a-z0-9-]+', s['id']): problems.append(('bad id', s['id']))
    if not (35.4 <= s['lat'] <= 47.2 and 6.5 <= s['lon'] <= 18.6): problems.append(('coord out of Italy', s['name']))
    w = len(s['text'].split())
    if w < 20 or w > 170: problems.append(('site text length', s['name'], w))
    if s['appellation'] not in names and not s['appellation'].endswith('IGT'): problems.append(('site appellation not in list', s['name'], s['appellation']))
# EU coverage
matched = set()
for a in out['appellations']:
    for m in a['match']:
        if m in EU: matched.add(m)
mine = [l.strip() for l in open('/home/claude/winesite/work/it_b/my_pdos.txt', encoding='utf-8') if l.strip() and l.strip() not in ('Casauria', 'Cirò Classico')]
missing = [n for n in mine if n not in matched]
if missing: problems.append(('EU PDOs not covered', missing))
bad = check_text(out)
if bad: problems.append(('style', bad[:20]))
# word counts
short = [(a['name'], len(a['summary'].split())) for a in out['appellations'] if len(a['summary'].split()) < 30]
dst = '/home/claude/winesite/data/content/it_b.json'
json.dump(out, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.load(open(dst, encoding='utf-8'))
print({k: len(v) for k, v in out.items()}, os.path.getsize(dst), 'bytes')
print('short summaries:', short)
for p in problems: print('PROBLEM', p)
