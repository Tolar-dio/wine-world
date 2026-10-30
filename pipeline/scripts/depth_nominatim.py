# Nominatim lookups (OpenStreetMap, ODbL) for the depth boundary work. 1 request per second, cached.
# Usage: python3 -I scripts/depth_nominatim.py OUTDIR "query1" "query2" ...
import sys, os, json, time, subprocess, urllib.parse, hashlib
out = sys.argv[1]
os.makedirs(out, exist_ok=True)
for q in sys.argv[2:]:
    fn = os.path.join(out, hashlib.md5(q.encode()).hexdigest()[:12] + '.json')
    if os.path.exists(fn) and os.path.getsize(fn) > 2:
        continue
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode(
        {'q': q, 'format': 'json', 'limit': 5, 'polygon_geojson': 1, 'countrycodes': 'it,es,fr'})
    for i in range(6):
        r = subprocess.run(['curl', '-sS', '-m', '40', '-A', 'VitisMundiResearch/1.0 (+https://vitismundi.app/)', url],
                           capture_output=True, text=True)
        if r.returncode == 0 and r.stdout.strip().startswith('['):
            json.dump({'q': q, 'res': json.loads(r.stdout)}, open(fn, 'w'), ensure_ascii=False)
            break
        time.sleep(3 + 2 * i)
    print(q, '->', len(json.load(open(fn))['res']) if os.path.exists(fn) else 'FAIL', flush=True)
    time.sleep(1.2)
