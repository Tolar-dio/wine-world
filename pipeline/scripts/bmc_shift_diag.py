# Barolo MGA cadastre job: diagnosis of old-vs-new differences. For each MGA, the translation (grid +-300 m, 10 m) of
# the old consortium-map polygon that maximises IoU with the new cadastral polygon; reported with the IoU after it.
# Usage: python3 -I scripts/bmc_shift_diag.py -> work/barolo-mga/shift_diag.json
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C, shapely
from shapely import affinity
from shapely.geometry import shape
import statistics as S
W = '/home/claude/winesite/work/barolo-mga'
old = {f['properties']['id']: C.to3035(shapely.make_valid(shape(f['geometry']))) for f in json.load(open('/home/claude/winesite/work/fine_backup/geo_it_fine.2026-11-05.pre-barolo-mga.geojson'))['features']}
out = {}
for fn in ('new_barolo.json', 'new_barbaresco.json'):
    for f in json.load(open(f'{W}/{fn}'))['features']:
        i = f['properties']['id']; gn = C.to3035(shape(f['geometry'])); go = old[i]
        def iou(dx, dy):
            g = affinity.translate(go, dx, dy); return g.intersection(gn).area / g.union(gn).area
        best = (iou(0, 0), 0, 0)
        for step, rng, cx, cy in ((30, 300, 0, 0), (10, 30, None, None)):
            if cx is None: cx, cy = best[1], best[2]
            for dx in range(cx - rng, cx + rng + 1, step):
                for dy in range(cy - rng, cy + rng + 1, step):
                    v = iou(dx, dy)
                    if v > best[0]: best = (v, dx, dy)
        c = go.centroid
        out[i] = {'iou0': round(iou(0, 0), 3), 'iou_best': round(best[0], 3), 'dx': best[1], 'dy': best[2], 'x': round(c.x), 'y': round(c.y)}
json.dump(out, open(f'{W}/shift_diag.json', 'w'), indent=0)
for par in ('it-barolo-', 'it-barbaresco-'):
    v = [x for k, x in out.items() if k.startswith(par)]
    print(par, 'median dx', S.median(x['dx'] for x in v), 'dy', S.median(x['dy'] for x in v), 'median IoU before/after shift',
          S.median(x['iou0'] for x in v), S.median(x['iou_best'] for x in v), 'IoU<0.6 after shift', sum(x['iou_best'] < 0.6 for x in v))
