# QA for the depth-phase fine files: valid polygons, unique ASCII ids across all geo files, parents that resolve,
# label points inside, sizes, no em dashes, required keys.
# Usage: python3 -I scripts/depth_qa.py
import sys, os, json, re, collections
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *

FILES = ['fr_fine', 'it_fine', 'es_fine', 'de_fine', 'at_fine']


def main():
    allids = collections.Counter()
    feats = {}
    for fn in os.listdir(GEO):
        if fn.endswith('.geojson') and not fn.startswith('_'):
            for f in json.load(open(GEO + '/' + fn))['features']:
                allids[f['properties']['id']] += 1
                feats[f['properties']['id']] = (fn, f)
    problems = []
    dup = [k for k, v in allids.items() if v > 1]
    if dup:
        problems.append(f'duplicate ids: {dup[:20]}')
    for name in FILES:
        path = f'{GEO}/{name}.geojson'
        if not os.path.exists(path):
            continue
        size = os.path.getsize(path)
        txt = open(path, encoding='utf-8').read()
        if '—' in txt:
            problems.append(f'{name}: em dash present')
        fc = json.loads(txt)
        c = collections.Counter()
        for f in fc['features']:
            p = f['properties']
            c[(p.get('src'), p.get('subcat'))] += 1
            if not re.fullmatch(r'[a-z0-9-]+', p['id']):
                problems.append(f'bad id {p["id"]}')
            for k in ('id', 'name', 'country', 'cat', 'src', 'bq', 'area', 'lp', 'bbox'):
                if p.get(k) in (None, ''):
                    problems.append(f'{p["id"]}: missing {k}')
            if p.get('parent') and p['parent'] not in allids:
                problems.append(f'{p["id"]}: parent {p["parent"]} unknown')
            g = shape(f['geometry'])
            if g.is_empty or not g.is_valid:
                problems.append(f'{p["id"]}: invalid geometry ({shapely.validation.explain_validity(g)[:60]})')
            if g.geom_type not in ('Polygon', 'MultiPolygon'):
                problems.append(f'{p["id"]}: {g.geom_type}')
            if p.get('lp') and not g.buffer(1e-4).contains(shapely.Point(p['lp'])):
                problems.append(f'{p["id"]}: lp outside')
        print(f'{name}: {len(fc["features"])} features, {size/1e6:.2f} MB')
        for k, v in sorted(c.items(), key=lambda kv: str(kv[0])):
            print(f'    {k}: {v}')
    print('problems:', len(problems))
    for p in problems[:60]:
        print('  ', p)


if __name__ == '__main__':
    main()
