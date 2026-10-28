# Step 2b: generalise the dissolved INAO dénominations (work/europe/inao_denoms.gpkg, EPSG:3035)
# into map-scale polygons with raster morphology (fast on multi-million-vertex parcel unions):
# rasterise (all_touched) at a resolution scaled to the zone size, morphological closing via a
# Euclidean distance transform (merges neighbouring parcels, fills lanes and tracks), drop specks
# and small holes, vectorise, simplify. Output: work/europe/inao_gen/{id_denom}.wkb (EPSG:4326)
# then work/europe/inao_gen.gpkg. Resumable (skips ids already done).
# Usage: python3 -I scripts/europe_inao_generalize.py
import sys, os, math, time, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pyogrio, geopandas as gpd, pandas as pd
import rasterio.features
from rasterio.transform import from_origin
from scipy import ndimage
from multiprocessing import Pool

SRC = WORK + '/inao_denoms.gpkg'
OUTDIR = WORK + '/inao_gen'
OUT = WORK + '/inao_gen.gpkg'
os.makedirs(OUTDIR, exist_ok=True)


def params(area_km2):
    side = math.sqrt(max(area_km2, 1e-4)) * 1000.0
    close = max(10.0, min(600.0, 0.025 * side))     # closing radius (m); >250 m only for zones >100 km2
    res = max(2.0, min(120.0, close / 4.0))          # pixel size (m)
    return close, res


def gen_geom(g, area_km2):
    close, res = params(area_km2)
    minx, miny, maxx, maxy = g.bounds
    pad = close * 2 + res * 2
    minx, miny, maxx, maxy = minx - pad, miny - pad, maxx + pad, maxy + pad
    w = int(math.ceil((maxx - minx) / res))
    h = int(math.ceil((maxy - miny) / res))
    tr = from_origin(minx, maxy, res, res)
    parts = list(getattr(g, 'geoms', [g]))
    mask = rasterio.features.rasterize(((p, 1) for p in parts), out_shape=(h, w), transform=tr,
                                       all_touched=True, dtype='uint8').astype(bool)
    k = close / res
    dil = ndimage.distance_transform_edt(~mask) <= k
    clo = ndimage.distance_transform_edt(dil) > k
    clo |= mask
    # drop small holes and specks (in pixels)
    px_area = res * res
    hole_min = max(0.0005, min(1.0, area_km2 * 0.002)) * 1e6 / px_area
    part_min = max(0.0002, min(0.5, area_km2 * 0.0005)) * 1e6 / px_area
    lab, n = ndimage.label(~clo)
    if n:
        sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        small = [i + 1 for i, s in enumerate(sizes) if s < hole_min and (i + 1) not in border]
        if small:
            clo |= np.isin(lab, small)
    lab, n = ndimage.label(clo)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
        big = sizes.max()
        keep = [i + 1 for i, s in enumerate(sizes) if s >= part_min or s == big]
        clo = np.isin(lab, keep)
    polys = [shapely.geometry.shape(geo) for geo, v in
             rasterio.features.shapes(clo.astype('uint8'), mask=clo, transform=tr, connectivity=4) if v == 1]
    out = shapely.union_all(polys) if len(polys) > 1 else polys[0]
    out = shapely.simplify(out, res * 0.8)
    out = polys_only(shapely.make_valid(out))
    return out, close, res


def gen_one(args):
    fid, area_km2, idd = args
    dst = f'{OUTDIR}/{idd}.wkb'
    if os.path.exists(dst):
        return idd, 'skip', 0
    t = time.time()
    df = pyogrio.read_dataframe(SRC, fids=[fid])
    g = shapely.make_valid(df.geometry.iloc[0])
    out, close, res = gen_geom(g, area_km2)
    c4326 = reproj(out, T_3035_4326)
    with open(dst + '.tmp', 'wb') as f:
        f.write(shapely.to_wkb(c4326))
    os.replace(dst + '.tmp', dst)
    return idd, f'close={close:.0f} res={res:.1f} gen_km2={out.area/1e6:.3f} verts={shapely.get_num_coordinates(out)}', time.time() - t


if __name__ == '__main__':
    meta = pyogrio.read_dataframe(SRC, read_geometry=False, fid_as_index=True)
    jobs = [(fid, a, int(i)) for fid, a, i in zip(meta.index, meta.area_km2, meta.id_denom)]
    jobs.sort(key=lambda j: -meta.loc[j[0], 'nverts'])
    print(len(jobs), 'denoms', flush=True)
    t0 = time.time()
    with Pool(2, maxtasksperchild=50) as pool:
        for k, (idd, info, secs) in enumerate(pool.imap_unordered(gen_one, jobs, chunksize=1)):
            if k < 15 or k % 100 == 0:
                print(k, idd, info, f'{secs:.1f}s', f'total {time.time()-t0:.0f}s', flush=True)
    rows = []
    for _, r in meta.iterrows():
        p = f'{OUTDIR}/{int(r.id_denom)}.wkb'
        g = shapely.from_wkb(open(p, 'rb').read())
        rows.append({'id_denom': int(r.id_denom), 'denom': r.denom, 'id_app': int(r.id_app), 'app': r.app,
                     'type_denom': r.type_denom, 'categorie': r.categorie, 'parcel_km2': r.area_km2,
                     'insee': r.insee, 'geometry': g})
    out = gpd.GeoDataFrame(rows, crs=4326)
    if os.path.exists(OUT):
        os.remove(OUT)
    out.to_file(OUT, layer='gen', driver='GPKG')
    print('wrote', OUT, len(out), 'verts', int(shapely.get_num_coordinates(out.geometry.values).sum()),
          f'{time.time()-t0:.0f}s', flush=True)
