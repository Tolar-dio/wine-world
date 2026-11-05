# Barolo MGA cadastre job: terrain line inputs (elevation band, aspect, octant shares, area) for the rebuilt MGA
# polygons, same method as scripts/depth_fine2_mga_terrain.py (Copernicus DEM GLO-30 by HTTP range requests).
# Usage: python3 -I scripts/bmc_terrain.py new_barolo.json new_barbaresco.json -> work/barolo-mga/mga_terrain_new.json
import json, math, os, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import numpy as np
from rasterio.features import geometry_mask
from shapely.geometry import shape, mapping
import itb_common as C
from depth_fine2_mga_terrain import dem as _dem, OCT, DIRS16
import rasterio
from rasterio.merge import merge

W = '/home/claude/winesite/work/barolo-mga'
S3 = 'https://copernicus-dem-30m.s3.amazonaws.com'


def dem():
    srcs = []
    for e in ('007', '008'):
        t = f'Copernicus_DSM_COG_10_N44_00_E{e}_00_DEM'
        srcs.append(rasterio.open(f'/vsicurl/{S3}/{t}/{t}.tif'))
    arr, tr = merge(srcs, bounds=(7.70, 44.50, 8.22, 44.78))
    return arr[0].astype('float64'), tr


def main():
    arr, tr = dem()
    lat0 = 44.64
    dx = abs(tr.a) * 111320 * math.cos(math.radians(lat0)); dy = abs(tr.e) * 110574
    gy, gx = np.gradient(arr, dy, dx)
    slope = np.hypot(gx, gy)
    out = {}
    for fn in sys.argv[1:]:
        for f in json.load(open(os.path.join(W, fn)))['features']:
            g = shape(f['geometry'])
            m = ~geometry_mask([mapping(g)], out_shape=arr.shape, transform=tr, all_touched=False)
            if m.sum() < 3:
                m = ~geometry_mask([mapping(g)], out_shape=arr.shape, transform=tr, all_touched=True)
            z = arr[m]; s = slope[m]
            nf = s >= 0.02
            e = -gx[m][nf]; n = gy[m][nf]
            asp = None; rose = [0] * 8
            if nf.sum() >= 5:
                ae, an = e.sum(), n.sum()
                res = math.hypot(ae, an) / max(1e-9, s[nf].sum())
                if res >= 0.1:
                    asp = round((math.degrees(math.atan2(ae, an)) + 360) % 360)
                angs = (np.degrees(np.arctan2(e, n)) + 360) % 360
                bins = ((angs + 22.5) // 45).astype(int) % 8
                cnt = np.bincount(bins, minlength=8)
                rose = [round(float(c) / cnt.sum(), 2) for c in cnt]
            out[f['properties']['id']] = dict(
                e=int(round(float(np.mean(z)))), e5=int(round(float(np.percentile(z, 5)))),
                e95=int(round(float(np.percentile(z, 95)))), s=round(float(np.mean(s)) * 100, 1), a=asp,
                a16=(DIRS16[int((asp + 11.25) // 22.5) % 16] if asp is not None else None), ar=rose,
                top=[OCT[i] for i in np.argsort(rose)[::-1][:2]], n=int(m.sum()),
                ha=round(C.to3035(g).area / 1e4, 1))
    json.dump(out, open(f'{W}/mga_terrain_new.json', 'w'), ensure_ascii=False, indent=0)
    print(len(out))


if __name__ == '__main__':
    main()
