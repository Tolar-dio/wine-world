# Barolo MGA cadastre job: compare old (consortium map, backup) and new (cadastre) MGA polygons.
# Usage: python3 -I scripts/bmc_compare.py new_barolo.json [new_barbaresco.json]  -> work/barolo-mga/compare.json/.csv
import csv, json, os, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import shapely
from shapely.geometry import shape

W = '/home/claude/winesite/work/barolo-mga'
OLD = '/home/claude/winesite/work/fine_backup/geo_it_fine.2026-11-05.pre-barolo-mga.geojson'


def main():
    old = {f['properties']['id']: f for f in json.load(open(OLD))['features']}
    rows = []
    for fn in sys.argv[1:]:
        D = json.load(open(os.path.join(W, fn)))
        rep = D['report']
        for f in D['features']:
            fid = f['properties']['id']
            go = C.to3035(shapely.make_valid(shape(old[fid]['geometry'])))
            gn = C.to3035(shapely.make_valid(shape(f['geometry'])))
            inter = go.intersection(gn).area
            iou = inter / go.union(gn).area
            r = {'id': fid, 'name': old[fid]['properties']['name'], 'ctx': old[fid]['properties'].get('ctx'),
                 'bq': f['properties']['bq'], 'old_ha': round(go.area / 1e4, 1), 'new_ha': round(gn.area / 1e4, 1),
                 'area_change_pct': round(100 * (gn.area - go.area) / go.area, 1),
                 'centroid_shift_m': round(go.centroid.distance(gn.centroid)),
                 'iou': round(iou, 3), 'old_in_new': round(inter / go.area, 3), 'new_in_old': round(inter / gn.area, 3)}
            r.update({k: v for k, v in rep.get(fid, {}).items() if k in ('share', 'found', 'listed', 'tagged', 'parcels')})
            rows.append(r)
    rows.sort(key=lambda r: r['iou'])
    json.dump(rows, open(f'{W}/compare.json', 'w'), ensure_ascii=False, indent=0)
    with open(f'{W}/compare.csv', 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=sorted({k for r in rows for k in r}, key=lambda k: list(rows[0]).index(k) if k in rows[0] else 99))
        w.writeheader(); w.writerows(rows)
    import statistics as S
    for par in ('it-barolo', 'it-barbaresco'):
        rr = [r for r in rows if r['id'].startswith(par + '-')]
        if not rr:
            continue
        print(par, len(rr), 'median IoU', S.median(r['iou'] for r in rr), 'median centroid shift', S.median(r['centroid_shift_m'] for r in rr),
              'median area change %', S.median(r['area_change_pct'] for r in rr), 'IoU<0.6:', sum(r['iou'] < 0.6 for r in rr),
              'total old ha', round(sum(r['old_ha'] for r in rr)), 'new ha', round(sum(r['new_ha'] for r in rr)))
    for r in rows:
        if r['iou'] < 0.6:
            print(r)


if __name__ == '__main__':
    main()
