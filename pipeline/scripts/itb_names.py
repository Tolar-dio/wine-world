# List OSM way names/refs matching regexes in given areas: python3 -I scripts/itb_names.py areas regex1 regex2 ...
import sys, re, collections
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_trace as T
from itb_areas import AREAS
import itb_common as C
D = T.Data(sys.argv[1].split(','), AREAS)
for rx in sys.argv[2:]:
    r = re.compile(rx, re.I)
    c = collections.Counter()
    for t, g, k in D.ways:
        for key in ('name', 'ref'):
            if r.search(t.get(key, '')):
                c[(k, t.get('name'), t.get('ref'))] += 1
    pl = [(n, t.get('place') or t.get('amenity') or t.get('historic') or '', [round(v, 4) for v in C.T34.transform(p.x, p.y)]) for n, t, p in D.places if r.search(n)]
    print('##', rx, dict(c) if len(c) < 25 else f'{len(c)} matches: ' + str(list(c)[:25]))
    print('   places:', pl[:8])
