# Photon geocoder with location bias; input lines: query|lat|lon
import json, sys, time, urllib.parse, urllib.request
out = sys.argv[2]
try: res = json.load(open(out, encoding='utf-8'))
except Exception: res = {}
for line in open(sys.argv[1], encoding='utf-8'):
    line = line.strip()
    if not line or line in res: continue
    q, lat, lon = line.split('|')
    url = 'https://photon.komoot.io/api/?' + urllib.parse.urlencode({'q': q, 'limit': 4, 'lat': lat, 'lon': lon})
    for attempt in range(3):
        try:
            d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'VitisMundiAtlas/1.0 (research script)'}), timeout=30))
            res[line] = [{'name': f['properties'].get('name'), 'v': f['properties'].get('osm_value'), 'city': f['properties'].get('city') or f['properties'].get('county'), 'lat': round(f['geometry']['coordinates'][1], 4), 'lon': round(f['geometry']['coordinates'][0], 4)} for f in d['features']]
            break
        except Exception as e:
            res[line] = {'error': str(e)}; time.sleep(3)
    json.dump(res, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    time.sleep(1.2)
print('done', len(res))
