# Geocode candidate site names for it_b content via OSM Nominatim (1 req / 1.2 s, generic UA).
import json, sys, time, urllib.parse, urllib.request
qs = [l.strip() for l in open(sys.argv[1], encoding='utf-8') if l.strip() and not l.startswith('#')]
out_path = sys.argv[2]
try:
    res = json.load(open(out_path, encoding='utf-8'))
except Exception:
    res = {}
for q in qs:
    if q in res: continue
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode({'q': q, 'format': 'json', 'limit': 3, 'countrycodes': 'it'})
    req = urllib.request.Request(url, headers={'User-Agent': 'VitisMundiAtlas/1.0 (wine atlas research script)'})
    try:
        data = json.load(urllib.request.urlopen(req, timeout=30))
        res[q] = [{'name': d['display_name'][:140], 'lat': float(d['lat']), 'lon': float(d['lon']), 'type': d.get('type'), 'class': d.get('class')} for d in data]
    except Exception as e:
        res[q] = {'error': str(e)}
    json.dump(res, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    time.sleep(1.2)
print('done', len(res))
