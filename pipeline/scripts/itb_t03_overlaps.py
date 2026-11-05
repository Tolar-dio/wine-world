# Remove T03 overlaps where the texts put the shared edge on a line of the neighbour:
# Predappio and Oriolo stop at the Castrocaro boundary, Marzeno at Modigliana, Longiano at the Mercato Saraceno line,
# Valgella starts east of Inferno.
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_write as Wr
import shapely
from shapely.geometry import shape
from europe_common import label_point

CUT = [('it-romagna-predappio', 'it-romagna-castrocaro'), ('it-romagna-oriolo', 'it-romagna-castrocaro'),
       ('it-romagna-marzeno', 'it-romagna-modigliana'), ('it-romagna-longiano', 'it-romagna-mercato-saraceno'),
       ('it-valtellina-superiore-valgella', 'it-valtellina-superiore-inferno')]
fine = json.load(open(C.GEO + '/it_fine.geojson'))
F = {f['properties']['id']: f for f in fine['features']}
out = []
for a, b in CUT:
    ga = C.to3035(shape(F[a]['geometry'])); gb = C.to3035(shape(F[b]['geometry']))
    before = ga.area
    g4, area = Wr.finish(ga.difference(gb.buffer(0.5)), 5, min_part=20000)
    p = dict(F[a]['properties'])
    p['area'] = round(area, 2 if area < 10 else 1); p['lp'] = label_point(g4); p['bbox'] = [round(x, 4) for x in g4.bounds]
    p['reg'] = dict(p['reg']); p['reg']['comuni'] = Wr.comuni_of(C.to3035(g4))
    print(a, 'minus', b, round(before / 1e6, 2), '->', area)
    out.append((p, g4))
Wr.apply(out)
