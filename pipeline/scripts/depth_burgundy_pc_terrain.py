"""Per-climat terrain stats (elevation band, mean aspect, slope) from Copernicus DEM GLO-30 for the
Burgundy premier cru / Corton climat polygons in site/data/geo/fr_fine.geojson. Output: work/depth_burgundy_pc/_terrain.json"""
import json, math
import numpy as np
import rasterio
from rasterio.features import geometry_mask
from rasterio.windows import from_bounds
from shapely.geometry import shape
W = '/home/claude/winesite'
d = json.load(open(f'{W}/site/data/geo/fr_fine.geojson'))
tiles = {}
def tile_for(lon, lat):
    t = f'Copernicus_DSM_COG_10_N{int(math.floor(lat)):02d}_00_E{int(math.floor(lon)):03d}_00_DEM'
    if t not in tiles:
        tiles[t] = rasterio.open(f'{W}/raw/copdem30_burgundy/{t}.tif')
    return tiles[t]
DIRS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
out = {}
main = json.load(open(f'{W}/site/data/geo/fr.geojson'))['features']
gcs = [f for f in main if f['properties'].get('subcat') == 'Grand Cru' and not f['properties']['name'].startswith('Alsace')]
for f in d['features'] + gcs:
    p = f['properties']
    if p.get('subcat') not in ('Premier Cru', 'Grand Cru'): continue
    g = shape(f['geometry'])
    minx, miny, maxx, maxy = g.bounds
    ds = tile_for((minx+maxx)/2, (miny+maxy)/2)
    pad = 0.0006
    win = from_bounds(minx-pad, miny-pad, maxx+pad, maxy+pad, ds.transform).round_offsets().round_lengths()
    arr = ds.read(1, window=win).astype('float64')
    tr = ds.window_transform(win)
    mask = ~geometry_mask([f['geometry']], out_shape=arr.shape, transform=tr, all_touched=True)
    if mask.sum() == 0: continue
    lat0 = (miny+maxy)/2
    dx = abs(tr.a) * 111320 * math.cos(math.radians(lat0)); dy = abs(tr.e) * 110574
    gy, gx = np.gradient(arr, dy, dx)  # gy: change per row (southward), gx: change per col (eastward)
    # downslope direction: -grad. east component = -gx, north component = +gy (rows increase southward)
    e = -gx[mask]; n = gy[mask]
    slope = np.hypot(gx[mask], gy[mask])
    ae, an = e.sum(), n.sum()
    asp = (math.degrees(math.atan2(ae, an)) + 360) % 360
    z = arr[mask]
    out[p['id']] = dict(zmin=int(round(np.percentile(z, 3))), zmax=int(round(np.percentile(z, 97))), zmed=int(round(np.median(z))),
                        aspect=round(asp), aspect_txt=DIRS[int((asp + 11.25) // 22.5) % 16], slope_pct=round(float(np.median(slope))*100, 1),
                        n=int(mask.sum()))
json.dump(out, open(f'{W}/work/depth_burgundy_pc/_terrain.json', 'w'), indent=0)
print(len(out))
