#!/usr/bin/env python3
"""Napa Valley 3D scene data (Vitis Mundi): exports a heightmap + NAIP ortho texture + meta for the standalone
three.js experience (docs/3d/napa.html). Reuses the terrain grid from depth3d_terrain.

Usage:
  python3 -I depth3d_napa3d.py --bbox=-122.56,38.20,-122.24,38.64 --dem a.tif --dem b.tif \
      --center=-122.42,38.45 --span-km=14 --res=10 --ortho-z=16 --out-dir docs/3d/napa
"""
import argparse
import io
import math
import os
import sys

import numpy as np
from PIL import Image
import requests

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from depth3d_terrain import (EARTH, HALF, lonlat_to_merc, merc_to_lonlat, bbox_to_merc, load_dem, reproject_to_grid, tile_size_m)  # noqa: E402

NAIP = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bbox', required=True, help='w,s,e,n (the pack bbox; the scene is a square inside it)')
    ap.add_argument('--dem', action='append', required=True)
    ap.add_argument('--center', required=True, help='lon,lat of the scene centre')
    ap.add_argument('--span-km', type=float, default=14.0)
    ap.add_argument('--res', type=float, default=10.0)
    ap.add_argument('--ortho-z', type=int, default=16)
    ap.add_argument('--out-dir', required=True)
    args = ap.parse_args()

    bbox = [float(v) for v in args.bbox.split(',')]
    clon, clat = (float(v) for v in args.center.split(','))
    span_m = args.span_km * 1000.0
    # the scene square in Web Mercator (x is lon-scaled, y is lat-scaled at centre)
    cx, cy = lonlat_to_merc(clon, clat)
    half = span_m / 2.0
    scene = [cx - half, cy - half, cx + half, cy + half]  # mercator

    bbox_merc = bbox_to_merc(bbox)
    pad = args.res * 64
    bbox_merc_padded = [bbox_merc[0] - pad, bbox_merc[1] - pad, bbox_merc[2] + pad, bbox_merc[3] + pad]
    bbox_lonlat_padded = [
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[0],
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[1],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[0],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[1],
    ]

    os.makedirs(args.out_dir, exist_ok=True)

    sys.stderr.write('building elevation grid...\n')
    mosaic, src_tr, src_crs, _ = load_dem(args.dem, bbox_lonlat_padded)
    elev, xmin, ymax, res = reproject_to_grid(mosaic, src_tr, src_crs, bbox_merc_padded, args.res)
    # clip to the scene square
    x0 = int((scene[0] - xmin) / res); x1 = int((scene[2] - xmin) / res)
    y0 = int((ymax - scene[3]) / res); y1 = int((ymax - scene[1]) / res)
    elev = elev[y0:y1, x0:x1]
    H, W = elev.shape
    elev = np.nan_to_num(elev, nan=0.0)
    lo, hi = float(elev.min()), float(elev.max())
    # terrarium-style RGB heightmap (8-bit PNG survives canvas getImageData losslessly)
    from depth3d_terrain import terrarium_encode
    Image.fromarray(terrarium_encode(elev), mode='RGB').save(os.path.join(args.out_dir, 'height.png'))
    sys.stderr.write(f'heightmap {W}x{H}, elev {lo:.1f}..{hi:.1f} m\n')

    # NAIP ortho over the scene square
    z = args.ortho_z
    T = tile_size_m(z)
    n = 2 ** z
    tx0 = int(math.floor((scene[0] + HALF) / T)); tx1 = int(math.floor((scene[2] + HALF) / T))
    ty0 = int(math.floor((HALF - scene[3]) / T)); ty1 = int(math.floor((HALF - scene[1]) / T))
    tw = tx1 - tx0 + 1; th = ty1 - ty0 + 1
    ortho = np.zeros((th * 256, tw * 256, 3), dtype='uint8')
    s = requests.Session()
    done = 0; total = tw * th
    sys.stderr.write(f'fetching NAIP z{z}: {total} tiles...\n')
    for ty in range(ty0, ty1 + 1):
        for tx in range(tx0, tx1 + 1):
            url = NAIP.format(z=z, y=ty, x=tx)
            try:
                r = s.get(url, timeout=30)
                if r.status_code == 200 and len(r.content) > 200:
                    img = np.asarray(Image.open(io.BytesIO(r.content)).convert('RGB'), dtype='uint8')
                    ortho[(ty - ty0) * 256:(ty - ty0 + 1) * 256, (tx - tx0) * 256:(tx - tx0 + 1) * 256] = img
            except Exception as e:
                sys.stderr.write(f'  NAIP {z}/{tx}/{ty}: {e}\n')
            done += 1
            if done % 100 == 0:
                sys.stderr.write(f'  NAIP {done}/{total}\n')
    # crop to the exact scene square, then cap the texture size for the web
    wpx = (scene[0] + HALF) / T * 256 - tx0 * 256
    epx = (scene[2] + HALF) / T * 256 - tx0 * 256
    npx = (HALF - scene[3]) / T * 256 - ty0 * 256
    spx = (HALF - scene[1]) / T * 256 - ty0 * 256
    ortho = ortho[max(0, int(round(npx))):int(round(spx)), max(0, int(round(wpx))):int(round(epx))]
    im = Image.fromarray(ortho, mode='RGB')
    maxdim = 4096
    if max(im.size) > maxdim:
        im.thumbnail((maxdim, maxdim), Image.LANCZOS)
    im.save(os.path.join(args.out_dir, 'ortho.jpg'), quality=84, optimize=True)

    # scene bounds in lon/lat (top-left / bottom-right)
    sw = merc_to_lonlat(scene[0], scene[1]); ne = merc_to_lonlat(scene[2], scene[3])
    meta = {
        'center': [clon, clat], 'spanKm': args.span_km,
        'west': sw[0], 'south': sw[1], 'east': ne[0], 'north': ne[1],
        'gridW': W, 'gridH': H, 'elevMin': lo, 'elevMax': hi,
    }
    with open(os.path.join(args.out_dir, 'meta.json'), 'w') as f:
        import json
        json.dump(meta, f, indent=1)
    sz = os.path.getsize(os.path.join(args.out_dir, 'ortho.jpg'))
    sys.stderr.write(f'wrote ortho.jpg ({sz/1e6:.1f} MB) and meta.json\n')


if __name__ == '__main__':
    main()
