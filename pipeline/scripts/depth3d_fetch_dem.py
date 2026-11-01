#!/usr/bin/env python3
"""Fetch elevation GeoTIFFs covering a bbox as tiles, for the depth-pack terrain pipeline.

Sources (keyless):
  --service ign      RGE ALTI (IGN) via wms-r WMS GetMap, format=image/tiff. Returns float32 metres with no
                     georeferencing, so we assign the transform from the requested bbox (nodata -99999).
  --service tinitaly TINITALY 10 m DTM via WCS GetCoverage, format=GeoTIFF. Returns georeferenced float32 metres
                     (nodata -9999).

Writes clean float32 GeoTIFFs (EPSG:4326) that depth3d_terrain.py reads with --dem.

Usage:
  python3 -I depth3d_fetch_dem.py --service ign --bbox=-1.0606,44.8996,-0.5889,45.4395 \
      --res=10 --out-dir raw/depth3d/fr-medoc
"""
import argparse
import io
import math
import os
import sys

import numpy as np
import rasterio
import requests
from rasterio.transform import from_bounds

SERVICES = {
    'ign': {
        'kind': 'wms', 'url': 'https://data.geopf.fr/wms-r/wms',
        'layer': 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES', 'nodata': -99999.0, 'ver': '1.3.0',
    },
    'tinitaly': {
        'kind': 'wcs', 'url': 'http://tinitaly.pi.ingv.it/TINItaly_1_1/wcs',
        'coverage': 'tinitaly_dem', 'nodata': -9999.0, 'ver': '1.0.0',
    },
}


def url_for(svc, w, s, e, n, tw, th):
    if svc['kind'] == 'wms':
        # WMS 1.3.0 axis order: miny,minx,maxy,maxx
        return (f"{svc['url']}?service=WMS&version={svc['ver']}&request=GetMap&layers={svc['layer']}"
                f"&format=image/tiff&crs=EPSG:4326&bbox={s},{w},{n},{e}&width={tw}&height={th}&styles=")
    # WCS 1.0.0 axis order: minx,miny,maxx,maxy
    return (f"{svc['url']}?service=WCS&version={svc['ver']}&request=GetCoverage&coverage={svc['coverage']}"
            f"&format=GeoTIFF&crs=EPSG:4326&bbox={w},{s},{e},{n}&width={tw}&height={th}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--service', choices=['ign', 'tinitaly'], required=True)
    ap.add_argument('--bbox', required=True, help='w,s,e,n')
    ap.add_argument('--res', type=float, required=True, help='target metres/pixel')
    ap.add_argument('--out-dir', required=True)
    ap.add_argument('--tile', type=int, default=2000)
    args = ap.parse_args()

    w, s, e, n = [float(v) for v in args.bbox.split(',')]
    svc = SERVICES[args.service]
    os.makedirs(args.out_dir, exist_ok=True)

    lat0 = (n + s) / 2
    mpd_lon = 111320 * math.cos(math.radians(lat0))
    mpd_lat = 110574
    full_w = max(1, int(math.ceil((e - w) * mpd_lon / args.res)))
    full_h = max(1, int(math.ceil((n - s) * mpd_lat / args.res)))
    nx = max(1, int(math.ceil(full_w / args.tile)))
    ny = max(1, int(math.ceil(full_h / args.tile)))
    sys.stderr.write(f'[{args.service}] bbox {args.bbox} res {args.res}m -> {full_w}x{full_h}px, {nx}x{ny} tiles\n')

    files = []
    for ty in range(ny):
        for tx in range(nx):
            w0 = w + (e - w) * tx / nx; e0 = w + (e - w) * (tx + 1) / nx
            s0 = s + (n - s) * ty / ny; n0 = s + (n - s) * (ty + 1) / ny
            tw = max(1, int(math.ceil((e0 - w0) * mpd_lon / args.res)))
            th = max(1, int(math.ceil((n0 - s0) * mpd_lat / args.res)))
            u = url_for(svc, w0, s0, e0, n0, tw, th)
            for attempt in range(3):
                try:
                    r = requests.get(u, timeout=240)
                    if r.status_code == 200:
                        break
                    sys.stderr.write(f'  tile {ty},{tx}: HTTP {r.status_code} (attempt {attempt + 1})\n')
                    r = None
                except Exception as ex:
                    sys.stderr.write(f'  tile {ty},{tx}: {ex} (attempt {attempt + 1})\n')
                    r = None
            if r is None:
                continue
            try:
                with rasterio.open(io.BytesIO(r.content)) as ds:
                    arr = ds.read(1).astype('float32')
                    # nodata, plus server-side bilinear-resampled nodata that leaks into the ocean
                    arr = np.where(arr < -50.0, np.nan, arr)
                    if ds.crs is None or ds.transform.is_identity:
                        crs = 'EPSG:4326'
                        transform = from_bounds(w0, s0, e0, n0, arr.shape[1], arr.shape[0])
                    else:
                        crs = ds.crs
                        transform = ds.transform
            except Exception as ex:
                sys.stderr.write(f'  tile {ty},{tx}: read failed {ex}\n')
                continue
            outp = os.path.join(args.out_dir, f'tile_{ty}_{tx}.tif')
            with rasterio.open(outp, 'w', driver='GTiff', height=arr.shape[0], width=arr.shape[1],
                               count=1, dtype='float32', crs=crs, transform=transform, nodata=np.nan,
                               compress='deflate', predictor=3) as dst:
                dst.write(arr, 1)
            files.append(outp)
    sys.stderr.write(f'[{args.service}] wrote {len(files)} tiles to {args.out_dir}\n')
    print('\n'.join(files))


if __name__ == '__main__':
    main()
