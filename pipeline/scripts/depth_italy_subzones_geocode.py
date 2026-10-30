#!/usr/bin/env python3
"""Geocode Italian subzone/contrada/MGA names with OSM Nominatim (1 req/s) for fallback points.
Input: JSON list of {key, q:[query strings], vb:[lon1,lat1,lon2,lat2]}. Output: JSON dict key->best hit."""
import json, sys, time, urllib.parse, urllib.request, os
UA = "VitisMundiResearch/1.0 (+https://vitismundi.app/)"
inp, outp = sys.argv[1], sys.argv[2]
items = json.load(open(inp))
res = json.load(open(outp)) if os.path.exists(outp) else {}
for it in items:
    if it['key'] in res: continue
    hit = None
    for q in it['q']:
        vb = it['vb']
        url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
            'q': q, 'format': 'jsonv2', 'limit': 3, 'countrycodes': 'it',
            'viewbox': ','.join(map(str, vb)), 'bounded': 1})
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            data = json.load(urllib.request.urlopen(req, timeout=30))
        except Exception as e:
            data = []
        time.sleep(1.2)
        if data:
            d = data[0]
            hit = {'q': q, 'lat': round(float(d['lat']), 4), 'lon': round(float(d['lon']), 4),
                   'name': d.get('name'), 'display': d.get('display_name', '')[:160],
                   'cls': d.get('category') or d.get('class'), 'type': d.get('type')}
            break
    res[it['key']] = hit
    json.dump(res, open(outp, 'w'), ensure_ascii=False, indent=0)
print('done', len(res), sum(1 for v in res.values() if v))
