import json, glob, os, re, csv, collections, sys
sys.path.insert(0, '/home/claude/winesite/scripts/fr_a')
from common import check
PARTS = sorted(glob.glob('/home/claude/winesite/work/fr_a/parts/*.json'))
out = {"countries": [], "regions": [], "appellations": [], "sites": []}
for p in PARTS:
    d = json.load(open(p))
    for k in ("regions", "appellations", "sites"):
        out[k].extend(d[k])
# uniqueness
ids = collections.Counter(s['id'] for s in out['sites'])
dup = [k for k, v in ids.items() if v > 1]
names = collections.Counter(a['name'] for a in out['appellations'])
dupa = [k for k, v in names.items() if v > 1]
rn = collections.Counter(r['name'] for r in out['regions'])
print('dup site ids', dup, '| dup app names', dupa, '| dup regions', [k for k, v in rn.items() if v > 1])
# region references
regnames = set(rn)
bad_reg = [a['name'] for a in out['appellations'] if a['region'] not in regnames]
bad_par = [r['name'] for r in out['regions'] if r['parent_region'] and r['parent_region'] not in regnames]
print('apps with unknown region', bad_reg, '| regions with unknown parent', bad_par)
# site appellation references
appnames = set(names)
bad_site_app = sorted({s['appellation'] for s in out['sites'] if s['appellation'] not in appnames})
print('site appellation refs not in apps:', bad_site_app)
# region appellation lists
miss = sorted({x for r in out['regions'] for x in r['appellations'] if x not in appnames})
print('region.appellations not in apps:', miss)
# coverage vs EU PDO
allmatch = {m for a in out['appellations'] for m in a['match']} | appnames
r = list(csv.DictReader(open('/home/claude/winesite/raw/eupdo/PDO_EU_id.csv', encoding='utf-8-sig')))
mine_kw = None
fr = [x['PDOnam'] for x in r if x['Country'] == 'FR']
print('EU FR PDOs matched:', sum(1 for n in fr if n in allmatch), 'of', len(fr))
json.dump(sorted(n for n in fr if n not in allmatch), open('/home/claude/winesite/work/fr_a/unmatched_eu.json', 'w'), ensure_ascii=False, indent=0)
# class counts
c = collections.Counter(s['class'] for s in out['sites'])
m1855 = sum(v for k, v in c.items() if re.search(r'Cru Classé (\(1855\)|\(added September 1855\)|\(1973)', k) and 'Sauternes' not in k)
sb = [s for s in out['sites'] if s['class'] in ('Premier Cru Supérieur (1855)', 'Premier Cru Classé (1855)', 'Deuxième Cru Classé (1855)') and s['appellation'] in ('Sauternes', 'Barsac')]
med = [s for s in out['sites'] if '1855' in s['class'] and s['appellation'] not in ('Sauternes', 'Barsac') or s['class'].startswith('Premier Cru Classé (1973')]
print('1855 Médoc+HB sites:', len(med), '| Sauternes-Barsac 1855:', len(sb))
print('Graves classified:', sum(1 for s in out['sites'] if 'Cru Classé de Graves' in s['class']), '| SE:', sum(1 for s in out['sites'] if 'Grand Cru Classé' in s['class'] and 'Premier Grand' in s['class'] or 'Withdrew' in s['class']), '| CB Exc:', c['Cru Bourgeois Exceptionnel (2025)'])
print('GC villages', sum(1 for s in out['sites'] if s['kind'] == 'grand_cru' and s['appellation'] == 'Champagne'))
probs = check(out)
print('style problems', probs)
# coordinate sanity: inside France bbox and quality field
bad = [s['id'] for s in out['sites'] if not (41.3 < s['lat'] < 51.2 and -5.2 < s['lon'] < 9.6) or s['coord_quality'] not in ('precise', 'approx')]
print('bad coords', bad)
print(collections.Counter(s['coord_quality'] for s in out['sites']))
fn = '/home/claude/winesite/data/content/fr_a.json'
json.dump(out, open(fn, 'w'), ensure_ascii=False, indent=1)
print('regions', len(out['regions']), 'apps', len(out['appellations']), 'sites', len(out['sites']), 'bytes', os.path.getsize(fn))
