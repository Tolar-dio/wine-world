"""Terrain stats (elevation band, slope-weighted aspect, octant shares, slope) for the digitised Barolo and
Barbaresco MGA polygons (work/depth/mga/{barolo,barbaresco}_mga.gpkg, EPSG:32632), from Copernicus DEM GLO-30
read by HTTP range requests (same source and conventions as scripts/topo_run.py: aspect 0 = N clockwise,
cells under 2% slope excluded from aspect). Output: work/depth_fine2/mga_terrain.json keyed by fine-unit id
(it-barolo-<slug> / it-barbaresco-<slug>, the id scheme of scripts/depth_mga_fine.py).
Usage: python3 -I scripts/depth_fine2_mga_terrain.py"""
import os, sys, json, math
os.environ.update(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR', CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',
                  GDAL_HTTP_MERGE_CONSECUTIVE_RANGES='YES', GDAL_HTTP_MAX_RETRY='5', GDAL_HTTP_RETRY_DELAY='3')
sys.path.insert(0, '/home/claude/winesite/scripts')
import numpy as np
import rasterio
from rasterio.features import geometry_mask
from rasterio.windows import from_bounds
from rasterio.merge import merge
import geopandas as gpd
from shapely.geometry import mapping
from europe_common import slug

W = '/home/claude/winesite'
S3 = 'https://copernicus-dem-30m.s3.amazonaws.com'
OCT = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
DIRS16 = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']


def dem():
    srcs = []
    for e in ('007', '008'):
        t = f'Copernicus_DSM_COG_10_N44_00_E{e}_00_DEM'
        srcs.append(rasterio.open(f'/vsicurl/{S3}/{t}/{t}.tif'))
    arr, tr = merge(srcs, bounds=(7.80, 44.52, 8.22, 44.76))
    return arr[0].astype('float64'), tr


def main():
    arr, tr = dem()
    lat0 = 44.64
    dx = abs(tr.a) * 111320 * math.cos(math.radians(lat0)); dy = abs(tr.e) * 110574
    gy, gx = np.gradient(arr, dy, dx)
    slope = np.hypot(gx, gy)
    out = {}
    for key in ('barolo', 'barbaresco'):
        g = gpd.read_file(f'{W}/work/depth/mga/{key}_mga.gpkg').to_crs(4326)
        for r in g.itertuples():
            name = r.name.replace('’', "'")
            fid = f'it-{key}-{slug(name)}'
            m = ~geometry_mask([mapping(r.geometry)], out_shape=arr.shape, transform=tr, all_touched=False)
            if m.sum() < 3:
                m = ~geometry_mask([mapping(r.geometry)], out_shape=arr.shape, transform=tr, all_touched=True)
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
            out[fid] = dict(name=name, doc=key, e=int(round(float(np.mean(z)))), e5=int(round(float(np.percentile(z, 5)))),
                            e95=int(round(float(np.percentile(z, 95)))), s=round(float(np.mean(s)) * 100, 1),
                            a=asp, a16=(DIRS16[int((asp + 11.25) // 22.5) % 16] if asp is not None else None),
                            ar=rose, top=[OCT[i] for i in np.argsort(rose)[::-1][:2]], n=int(m.sum()),
                            ha=round(r.geometry.area * 0 + gpd.GeoSeries([r.geometry], crs=4326).to_crs(32632).area.iloc[0] / 1e4, 1))
    json.dump(out, open(f'{W}/work/depth_fine2/mga_terrain.json', 'w'), ensure_ascii=False, indent=0)
    print(len(out))


if __name__ == '__main__':
    main()
