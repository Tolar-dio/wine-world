# Cached Overpass API queries (OpenStreetMap, ODbL) for the Italy depth boundary work.
# Endpoint: the maps.mail.ru Overpass mirror (overpass-api.de resets connections through the session proxy).
# Usage as module: from depth_it_overpass import overpass; js = overpass(query_ql)   (returns parsed JSON)
#    or CLI:       python3 -I scripts/depth_it_overpass.py OUTFILE "QL query"
import hashlib, json, os, subprocess, sys, time, urllib.parse

OUT = '/home/claude/winesite/raw/osm_overpass_it'
UA = 'VitisMundiResearch/1.0 (+https://tolar-dio.github.io/wine-world/)'
ENDPOINTS = ['https://maps.mail.ru/osm/tools/overpass/api/interpreter',
             'https://overpass-api.de/api/interpreter']


def overpass(q, timeout=300, tries=6, cache=True):
    os.makedirs(OUT, exist_ok=True)
    fn = os.path.join(OUT, hashlib.md5(q.encode()).hexdigest()[:16] + '.json')
    if cache and os.path.exists(fn) and os.path.getsize(fn) > 50:
        with open(fn) as f:
            return json.load(f)
    data = urllib.parse.urlencode({'data': q})
    last = ''
    for i in range(tries):
        ep = ENDPOINTS[0] if i < tries - 1 else ENDPOINTS[-1]
        r = subprocess.run(['curl', '-sS', '-m', str(timeout), '-A', UA, '--data-binary', data, '-o', fn + '.part',
                            '-w', '%{http_code}', ep], capture_output=True, text=True)
        code = r.stdout.strip()
        if r.returncode == 0 and code == '200' and os.path.getsize(fn + '.part') > 20:
            try:
                with open(fn + '.part') as f:
                    js = json.load(f)
                os.replace(fn + '.part', fn)
                return js
            except Exception as e:
                last = 'bad json ' + str(e)
        else:
            last = f'{code} {r.stderr.strip()[:200]}'
        time.sleep(5 + 5 * i)
    raise RuntimeError('overpass failed: ' + last)


if __name__ == '__main__':
    js = overpass(sys.argv[2])
    with open(sys.argv[1], 'w') as f:
        json.dump(js, f)
    print(len(js.get('elements', [])), 'elements')
