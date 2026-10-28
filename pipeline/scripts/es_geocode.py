# Geocode candidate Spanish wine sites with Nominatim (1 req/s), caching results.
import json, sys, time, urllib.parse, urllib.request, os
OUT = '/home/claude/winesite/work/es/geocode.json'
cache = json.load(open(OUT)) if os.path.exists(OUT) else {}
queries = [l.rstrip('\n').split('|',1) for l in open(sys.argv[1], encoding='utf-8') if '|' in l]
UA = {'User-Agent': 'VitisMundiAtlas/1.0 (wine atlas research)'}
for key, q in queries:
    if key in cache and cache[key].get('results'):
        continue
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode({'q': q, 'format': 'jsonv2', 'limit': 3, 'countrycodes': 'es'})
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
            res = json.load(r)
        cache[key] = {'q': q, 'results': [{'name': x.get('name'), 'display': x.get('display_name'), 'lat': round(float(x['lat']), 4), 'lon': round(float(x['lon']), 4), 'type': x.get('type'), 'cat': x.get('category')} for x in res]}
    except Exception as e:
        cache[key] = {'q': q, 'error': str(e), 'results': []}
    json.dump(cache, open(OUT, 'w'), ensure_ascii=False, indent=1)
    time.sleep(1.2)
print('done', len(cache))
