#!/usr/bin/env python3
"""Build the target list for the photo sidecar: countries, regions, profiled appellations,
sites, grapes, soils, timeline events. Output: work/photos/targets.json"""
import json, glob, os
D = '/home/claude/winesite/site/data'
OUT = '/home/claude/winesite/work/photos/targets.json'
T = []
idx = json.load(open(f'{D}/geo/_index.json'))
byid = {e['id']: e for e in idx}
regs = {f['properties']['id']: f for f in json.load(open(f'{D}/geo/_regions.geojson'))['features']}
sites = {f['properties']['id']: f for f in json.load(open(f'{D}/geo/_sites.geojson'))['features']}
countries = json.load(open(f'{D}/geo/_countries.json'))
# eAmbrosia / extra props from country geo files
reg_props = {}
for f in glob.glob(f'{D}/geo/*.geojson'):
    if os.path.basename(f).startswith('_'):
        continue
    for ft in json.load(open(f))['features']:
        p = ft['properties']
        reg_props[p['id']] = {'ea': (p.get('reg') or {}).get('eambrosia'), 'alt': p.get('alt') or []}
for f in sorted(glob.glob(f'{D}/content/*.json')):
    iso = os.path.basename(f)[:-5]
    d = json.load(open(f))
    c = d['country']
    wp = [s['url'] for s in (c.get('sources') or []) if isinstance(s, dict) and 'wikipedia.org/wiki/' in s.get('url', '')]
    cb = countries.get(iso, {}).get('bbox')
    T.append({'type': 'country', 'id': iso, 'country': iso, 'name': c['name'], 'bbox': cb, 'wp': wp})
    for r in d.get('regions', []):
        g = regs.get(r['id'])
        wp = [s['url'] for s in (r.get('sources') or []) if isinstance(s, dict) and 'wikipedia.org/wiki/' in s.get('url', '')]
        T.append({'type': 'region', 'id': r['id'], 'country': iso, 'name': r['name'], 'alt': r.get('alt') or [],
                  'lat': r.get('lat'), 'lon': r.get('lon'), 'bbox': g['properties']['bbox'] if g else None,
                  'apps': r.get('app_ids') or [], 'parent': r.get('parent_region'), 'wp': wp})
    for pid, p in d.get('profiles', {}).items():
        e = byid.get(pid)
        if not e:
            continue
        rp = reg_props.get(pid, {})
        T.append({'type': 'appellation', 'id': pid, 'country': iso, 'name': e['name'], 'alt': e.get('alt') or [],
                  'cat': e.get('cat'), 'lon': e['lp'][0], 'lat': e['lp'][1], 'bbox': e.get('bbox'), 'area': e.get('area'),
                  'bq': e.get('bq'), 'parent': e.get('parent'), 'ea': rp.get('ea'), 'region_id': p.get('region_id'),
                  'subregion_id': p.get('subregion_id'), 'region': p.get('region')})
    for s in d.get('sites', []):
        g = sites.get(s['id'])
        if not g:
            continue
        T.append({'type': 'site', 'id': s['id'], 'country': iso, 'name': s['name'], 'kind': s.get('kind'),
                  'lon': g['geometry']['coordinates'][0], 'lat': g['geometry']['coordinates'][1],
                  'cq': g['properties'].get('cq'), 'app': s.get('app') or g['properties'].get('app'),
                  'appellation': s.get('appellation'), 'class': s.get('class')})
G = f'{D}/content/global'
for g in json.load(open(f'{G}/grapes.json'))['grapes']:
    T.append({'type': 'grape', 'id': g['id'], 'country': '_global', 'name': g['name'], 'syn': g.get('synonyms') or [],
              'color': g.get('color'), 'vivc': (g.get('vivc') or {}).get('id'), 'vivc_name': (g.get('vivc') or {}).get('prime_name')})
for s in json.load(open(f'{G}/soils.json'))['soils']:
    T.append({'type': 'soil', 'id': s['id'], 'country': '_global', 'name': s['name'], 'examples': s.get('examples') or []})
for e in json.load(open(f'{G}/timeline.json'))['events']:
    wp = [s['url'] for s in (e.get('sources') or []) if isinstance(s, dict) and 'wikipedia.org/wiki/' in s.get('url', '')]
    T.append({'type': 'event', 'id': e['id'], 'country': '_global', 'name': e['title'], 'place': e.get('place'),
              'pcountry': e.get('country'), 'lat': e.get('lat'), 'lon': e.get('lon'), 'year': e.get('year'), 'wp': wp})
os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(T, open(OUT, 'w'), ensure_ascii=False)
import collections
print(collections.Counter(t['type'] for t in T))
