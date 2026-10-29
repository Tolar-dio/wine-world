#!/usr/bin/env python3
"""Independent cross-check of topo_run.py: reproject the DEM window of a few
features to their local UTM zone (30 m, bilinear), compute slope/aspect with
numpy.gradient on the metric grid, and compare with the geographic-grid Horn
result.  Also computes validation-only stats for the Cima Corgo, which has no
polygon in the atlas (Douro DOC polygon clipped to the Corgo river to Cachao da
Valeira stretch, lon -7.78 to -7.37), and for the Cima Corgo quinta site discs.
Usage: python3 -I topo_check_utm.py
"""
import os, sys, json, math
sys.path.insert(0, '/home/claude/winesite/scripts')
import topo_run as tr
import numpy as np
import rasterio
from rasterio.warp import reproject, Resampling, transform_geom
from rasterio.features import geometry_mask
from rasterio.transform import from_origin
from shapely.geometry import shape, mapping, box
from pyproj import CRS

GEO = '/home/claude/winesite/site/data/geo'
FEATS = {}
for fn in ['fr.geojson', 'de_fine.geojson', 'us.geojson', 'pt.geojson']:
    for ft in json.load(open(f'{GEO}/{fn}'))['features']:
        FEATS[ft['properties']['id']] = shape(ft['geometry'])
CHECK = ['fr-chambertin', 'de-bernkastel-doctor', 'de-wehlen-sonnenuhr', 'fr-cote-rotie', 'fr-hermitage', 'us-oak-knoll-district-of-napa-valley']


def utm_stats(g):
    lon, lat = g.centroid.x, g.centroid.y
    zone = int((lon + 180) // 6) + 1
    crs = CRS.from_epsg((32600 if lat >= 0 else 32700) + zone)
    gu = shape(transform_geom('EPSG:4326', crs, mapping(g)))
    w, s, e, n = gu.bounds
    pad = 120
    tx = from_origin(math.floor(w / 30) * 30 - pad, math.ceil(n / 30) * 30 + pad, 30, 30)
    W_ = int((e - w + 2 * pad) / 30) + 2
    H_ = int((n - s + 2 * pad) / 30) + 2
    la0, lo0 = math.floor(lat), math.floor(lon)
    src_url, _ = tr.urls(tr.tname(la0, lo0), '30')
    dst = np.zeros((H_, W_), np.float32)
    with rasterio.open(src_url) as ds:
        gw, gs, ge, gn = g.buffer(0.01).bounds
        win = ds.window(gw, gs, ge, gn).round_offsets().round_lengths()
        Z = ds.read(1, window=win)
        reproject(Z, dst, src_transform=ds.window_transform(win), src_crs=ds.crs, dst_transform=tx, dst_crs=crs,
                  resampling=Resampling.bilinear)
    dzdn, dzdx = np.gradient(dst, 30.0)
    dzdn = -dzdn  # rows increase southwards
    S = np.hypot(dzdx, dzdn) * 100
    m = geometry_mask([mapping(gu)], out_shape=dst.shape, transform=tx, invert=True)
    gx = -dzdx[m]; gy = -dzdn[m]; s = S[m]
    nf = s >= 2
    a = math.degrees(math.atan2(gx[nf].sum(), gy[nf].sum())) % 360
    return dict(e=round(float(dst[m].mean())), s=round(float(s.mean()), 1), a=round(a), n=int(m.sum()), utm=zone)


def direct_stats(g):
    """Same estimator as topo_run (Horn on the geographic grid), run standalone."""
    import rasterio
    from rasterio.transform import Affine
    lon, lat = g.centroid.x, g.centroid.y
    url, wurl = tr.urls(tr.tname(math.floor(lat), math.floor(lon)), '30')
    with rasterio.open(url) as ds, rasterio.open(wurl) as wb:
        gw, gs, ge, gn = g.buffer(0.005).bounds
        win = ds.window(gw, gs, ge, gn).round_offsets().round_lengths()
        Z = ds.read(1, window=win).astype(np.float32)
        WB = wb.read(1, window=win) > 0
        T = ds.window_transform(win)
    S, X, Y = tr.horn(Z, T, 0)
    m = geometry_mask([mapping(g)], out_shape=Z.shape, transform=T, invert=True)
    A, wet = tr.stats_from(m, Z, S, X, Y, WB)
    return A


def main():
    rows = []
    for fid in CHECK:
        u = utm_stats(FEATS[fid])
        rows.append((fid, u))
        print(fid, 'UTM', u, flush=True)
    # Cima Corgo validation (no atlas polygon): Douro DOC clipped to the
    # Corgo mouth (lon -7.78) to Cachao da Valeira (lon -7.37) stretch.
    import topo_merge as tm
    cc = FEATS['pt-douro'].intersection(box(-7.78, 41.0, -7.37, 41.45))
    st = tm.finalize(direct_stats(cc))
    print('cima-corgo (validation clip)', st, flush=True)
    for fid in CHECK:
        print(fid, 'direct', tm.finalize(direct_stats(FEATS[fid])), flush=True)
    json.dump({'utm': rows, 'cima_corgo': st}, open('/home/claude/winesite/work/topo/check_utm.json', 'w'), indent=1)


if __name__ == '__main__':
    main()
