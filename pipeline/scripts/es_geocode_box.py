# Bounded Nominatim retries: key|query|lat|lon (searches a ~12 km box around lat/lon), then Photon fallback.
import json, sys, time, urllib.parse, urllib.request, os
OUT = '/home/claude/winesite/work/es/geocode_box.json'
cache = json.load(open(OUT)) if os.path.exists(OUT) else {}
UA = {'User-Agent': 'VitisMundiAtlas/1.0 (wine atlas research)'}
def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.load(r)
for line in open(sys.argv[1], encoding='utf-8'):
    if '|' not in line: continue
    key, q, lat, lon = [x.strip() for x in line.split('|')]
    if key in cache and cache[key]['results']: continue
    lat, lon = float(lat), float(lon); d = 0.12
    res = []
    try:
        vb = f'{lon-d},{lat+d},{lon+d},{lat-d}'
        r = get('https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode({'q': q, 'format': 'jsonv2', 'limit': 3, 'viewbox': vb, 'bounded': 1}))
        res = [{'src': 'nom', 'name': x.get('name'), 'display': x.get('display_name')[:100], 'lat': round(float(x['lat']), 4), 'lon': round(float(x['lon']), 4), 'type': x.get('type')} for x in r]
        time.sleep(1.2)
        if not res:
            r = get('https://photon.komoot.io/api/?' + urllib.parse.urlencode({'q': q, 'lat': lat, 'lon': lon, 'limit': 3}))
            for f in r.get('features', []):
                c = f['geometry']['coordinates']; p = f['properties']
                if abs(c[1]-lat) < 0.25 and abs(c[0]-lon) < 0.25:
                    res.append({'src': 'photon', 'name': p.get('name'), 'display': f"{p.get('name')}, {p.get('city') or p.get('county')}", 'lat': round(c[1], 4), 'lon': round(c[0], 4), 'type': p.get('osm_value')})
            time.sleep(1.0)
    except Exception as e:
        res = []; print(key, 'ERR', e)
    cache[key] = {'q': q, 'results': res}
    json.dump(cache, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('done', len(cache))
