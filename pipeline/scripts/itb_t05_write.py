# Write the T05 Etna contrade points (work/italy-bounds/t05_etna_points.json) into _extra_points / _index / content.
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_write as Wr
from europe_common import slug

pts = json.load(open('/home/claude/winesite/work/italy-bounds/t05_etna_points.json'))
fp = json.load(open(Wr.CONTENT))['fine_profiles']
idx = {e['id']: e for e in json.load(open(Wr.GEO + '/_index.json'))}
lvl = idx['it-etna']['lvl'] + 1
new = []
for r in pts:
    if r['lon'] is None:
        print('skip', r['name']); continue
    uid = 'it-etna-' + slug(r['name'])
    if uid not in fp:
        raise SystemExit('no profile id ' + uid)
    name = fp[uid]['name']
    props = {'id': uid, 'name': name, 'country': 'it', 'cat': 'DOC', 'style': 'red', 'cq': 'approx', 'ctx': r['comune'],
             'fine': 1, 'src': 'sitrtopo', 'conf': r['confidence']}
    ie = {'id': uid, 'name': name, 'alt': [f'Contrada {name}'], 'country': 'it', 'cat': 'DOC', 'subcat': 'Contrada', 'area': 0,
          'parent': 'it-etna', 'lp': [r['lon'], r['lat']], 'bbox': [r['lon'], r['lat'], r['lon'], r['lat']], 'bq': 'approx',
          'style': 'red', 'prof': 1, 'lvl': lvl, 'pt': 1, 'cq': 'approx', 'ctx': r['comune'], 'fine': 1}
    new.append((props, r['lon'], r['lat'], ie))
    print(uid, r['lon'], r['lat'], r['confidence'], 'update' if uid in idx else 'new')
Wr.apply([], new_points=new)
