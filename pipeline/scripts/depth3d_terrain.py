#!/usr/bin/env python3
"""Depth3D terrain pack builder (Vitis Mundi).

Mosaics source DEM tiles, reprojects them to Web Mercator at a chosen resolution, feathers the pack edge
towards the 30 m Terrarium tiles the app falls back to (so the seam is invisible), then writes a single
terrarium-encoded PMTiles raster-dem pyramid for the region.

Usage:
  python3 -I depth3d_terrain.py --name us-napa-valley --bbox -122.62,38.10,-122.12,38.63 \
      --dem <tif-or-url> [--dem ...] --res 5 --zmin 9 --zmax 14 --out terrain.pmtiles

The tile id / directory format matches pmtiles.writer (Hilbert ids, gzip directories); the front end's
minimal reader (60_depth.js) decodes exactly that format.
"""
import argparse
import io
import json
import math
import os
import sys

import numpy as np
import rasterio
from rasterio.merge import merge
from rasterio.transform import Affine
from rasterio.warp import reproject, Resampling
from PIL import Image
import requests

from pmtiles.tile import zxy_to_tileid, Compression, TileType
from pmtiles.writer import Writer as PMTilesWriter

EARTH = 40075016.68557849
HALF = EARTH / 2.0
TERRARIUM = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'


# ---------------- Web Mercator helpers ----------------
def lonlat_to_merc(lon, lat):
    lat = max(-85.05112878, min(85.05112878, lat))
    return (lon / 180.0 * HALF, HALF / math.pi * math.log(math.tan(math.pi / 4 + lat * math.pi / 360)))


def merc_to_lonlat(x, y):
    return (x / HALF * 180.0, (2 * math.atan(math.exp(y * math.pi / HALF)) - math.pi / 2) * 180 / math.pi)


def bbox_to_merc(bbox_lonlat):
    x0, y1 = lonlat_to_merc(bbox_lonlat[0], bbox_lonlat[3])
    x1, y0 = lonlat_to_merc(bbox_lonlat[2], bbox_lonlat[1])
    return [x0, y0, x1, y1]


def tile_size_m(z):
    return EARTH / (2 ** z)


# ---------------- Terrarium encode / decode ----------------
def terrarium_decode(rgb):
    r = rgb[..., 0].astype('float32')
    g = rgb[..., 1].astype('float32')
    b = rgb[..., 2].astype('float32')
    return r * 256.0 + g + b / 256.0 - 32768.0


def terrarium_encode(h):
    v = h + 32768.0
    v = np.clip(v, 0.0, 65535.0)
    fl = np.floor(v)
    out = np.empty((*h.shape, 3), dtype='uint8')
    out[..., 0] = np.floor(v / 256.0).astype('uint8')
    out[..., 1] = (fl.astype('int64') % 256).astype('uint8')
    out[..., 2] = np.clip(np.round((v - fl) * 256.0), 0, 255).astype('uint8')
    return out


def bilinear_sample(grid, xmin, ymax, res, xs, ys):
    """grid[y, x] with pixel centre at (xmin + (x+0.5)*res, ymax - (y+0.5)*res); sample at mercator xs, ys."""
    cols = (xs - xmin) / res - 0.5
    rows = (ymax - ys) / res - 0.5
    H, W = grid.shape
    c0 = np.clip(np.floor(cols).astype('int64'), 0, W - 1)
    r0 = np.clip(np.floor(rows).astype('int64'), 0, H - 1)
    c1 = np.clip(c0 + 1, 0, W - 1)
    r1 = np.clip(r0 + 1, 0, H - 1)
    fc = cols - c0
    fr = rows - r0
    a = grid[r0, c0]; b = grid[r0, c1]; c = grid[r1, c0]; d = grid[r1, c1]
    return (a * (1 - fc) * (1 - fr) + b * fc * (1 - fr) + c * (1 - fc) * fr + d * fc * fr)


# ---------------- Terrarium reference (the fallback the app shows outside a pack) ----------------
def fetch_terrarium_ref(bbox_merc_padded, z=15):
    """Assemble the z-level Terrarium elevation grid covering bbox_merc_padded.
    Returns (arr, xmin, ymax, res) where res = tile world size / 256."""
    from concurrent.futures import ThreadPoolExecutor
    T = tile_size_m(z)
    n = 2 ** z
    x0 = max(0, int(math.floor((bbox_merc_padded[0] + HALF) / T)))
    x1 = min(n - 1, int(math.floor((bbox_merc_padded[2] + HALF) / T)))
    y0 = max(0, int(math.floor((HALF - bbox_merc_padded[3]) / T)))
    y1 = min(n - 1, int(math.floor((HALF - bbox_merc_padded[1]) / T)))
    W = (x1 - x0 + 1) * 256
    H = (y1 - y0 + 1) * 256
    arr = np.zeros((H, W), dtype='float32')
    tiles = [(tx, ty) for ty in range(y0, y1 + 1) for tx in range(x0, x1 + 1)]
    n_tiles = len(tiles)

    def fetch_one(txy):
        tx, ty = txy
        url = TERRARIUM.format(z=z, x=tx, y=ty)
        try:
            r = requests.get(url, timeout=30)
            if r.status_code == 200 and r.content[:4] == b'\x89PNG':
                img = np.asarray(Image.open(io.BytesIO(r.content)).convert('RGB'), dtype='uint8')
                h = terrarium_decode(img)
                h[h < -100.0] = 0.0   # Terrarium void tiles decode to -32768; treat them as sea level
                return tx, ty, h
        except Exception as e:
            sys.stderr.write(f'  terrarium tile {z}/{tx}/{ty}: {e}\n')
        return tx, ty, None

    done = 0
    with ThreadPoolExecutor(max_workers=10) as ex:
        for tx, ty, h in ex.map(fetch_one, tiles):
            if h is not None:
                arr[(ty - y0) * 256:(ty - y0 + 1) * 256, (tx - x0) * 256:(tx - x0 + 1) * 256] = h
            done += 1
            if done % 500 == 0:
                sys.stderr.write(f'  terrarium {done}/{n_tiles}\n')
    xmin = -HALF + x0 * T
    ymax = HALF - y0 * T
    return arr, xmin, ymax, T / 256.0


# ---------------- source DEM -> Web Mercator grid ----------------
def load_dem(dem_sources, bbox_lonlat_padded):
    datasets = [rasterio.open(src) for src in dem_sources]
    try:
        src_crs = datasets[0].crs
        nodata = datasets[0].nodata
        mosaic, transform = merge(datasets, bounds=bbox_lonlat_padded, resampling=Resampling.bilinear, nodata=np.nan)
    finally:
        for ds in datasets:
            ds.close()
    return mosaic[0].astype('float32'), transform, src_crs, nodata


def reproject_to_grid(mosaic, src_transform, src_crs, bbox_merc_padded, res):
    xmin, ymin, xmax, ymax = bbox_merc_padded
    W = max(1, int(round((xmax - xmin) / res)))
    H = max(1, int(round((ymax - ymin) / res)))
    dst = np.full((H, W), np.nan, dtype='float32')
    dst_transform = Affine(res, 0, xmin, 0, -res, ymax)
    reproject(
        source=mosaic, destination=dst, src_transform=src_transform, src_crs=src_crs,
        dst_transform=dst_transform, dst_crs='EPSG:3857', resampling=Resampling.bilinear,
        src_nodata=np.nan, dst_nodata=np.nan, num_threads=4,
    )
    dst = np.where(np.isnan(dst), 0.0, dst)
    dst = np.where(dst < -50.0, 0.0, dst)   # mask source nodata / server-interpolated void to sea level
    return dst, xmin, ymax, res


# ---------------- feathering ----------------
def inside_distance(x, y, bbox_merc):
    """Signed distance to the rectangle interior (positive inside)."""
    return np.minimum(np.minimum(x - bbox_merc[0], bbox_merc[2] - x),
                      np.minimum(y - bbox_merc[1], bbox_merc[3] - y))


def composite(highres, ref, xmin, ymax, res, bbox_merc, feather):
    H, W = highres.shape
    xs = xmin + (np.arange(W) + 0.5) * res
    ys = ymax - (np.arange(H) + 0.5) * res
    xx, yy = np.meshgrid(xs, ys)
    d = inside_distance(xx, yy, bbox_merc)
    w = np.clip(d / feather, 0.0, 1.0)
    return highres * w + ref * (1.0 - w)


# ---------------- main ----------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--name', required=True)
    ap.add_argument('--bbox', required=True, help='w,s,e,n')
    ap.add_argument('--dem', action='append', required=True)
    ap.add_argument('--res', type=float, required=True, help='Web Mercator metres per pixel of the working grid')
    ap.add_argument('--zmin', type=int, default=9)
    ap.add_argument('--zmax', type=int, default=14)
    ap.add_argument('--tilesize', type=int, default=512)
    ap.add_argument('--feather', type=float, default=1200.0)
    ap.add_argument('--out', required=True)
    ap.add_argument('--ref-z', type=int, default=15, help='Terrarium zoom used as the feather target')
    ap.add_argument('--chunks', type=int, default=1, help='split the output into N PMTiles files by latitude (for '
                    'the 100 MB/file limit); writes terrain_<i>.pmtiles and a chunks.json manifest')
    args = ap.parse_args()

    bbox = [float(v) for v in args.bbox.split(',')]
    bbox_merc = bbox_to_merc(bbox)

    pad = args.feather + tile_size_m(args.zmax)
    bbox_merc_padded = [bbox_merc[0] - pad, bbox_merc[1] - pad, bbox_merc[2] + pad, bbox_merc[3] + pad]
    bbox_lonlat_padded = [
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[0],
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[1],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[0],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[1],
    ]

    sys.stderr.write(f'[{args.name}] loading DEM...\n')
    mosaic, src_tr, src_crs, _ = load_dem(args.dem, bbox_lonlat_padded)
    highres, xmin, ymax, res = reproject_to_grid(mosaic, src_tr, src_crs, bbox_merc_padded, args.res)
    sys.stderr.write(f'[{args.name}] high-res grid {highres.shape[1]}x{highres.shape[0]} @ {res:.2f} m/px\n')

    sys.stderr.write(f'[{args.name}] fetching terrarium z{args.ref_z} reference...\n')
    ref_arr, rxmin, rymax, rres = fetch_terrarium_ref(bbox_merc_padded, z=args.ref_z)
    xs = xmin + (np.arange(highres.shape[1]) + 0.5) * res
    ys = ymax - (np.arange(highres.shape[0]) + 0.5) * res
    xx, yy = np.meshgrid(xs, ys)
    ref = bilinear_sample(ref_arr, rxmin, rymax, rres, xx, yy)
    ref = np.where(np.isnan(ref), highres, ref)
    ref = np.where(ref < -50.0, 0.0, ref)   # Terrarium void tiles decode to -32768

    elev = composite(highres, ref, xmin, ymax, res, bbox_merc, args.feather)
    sys.stderr.write(f'[{args.name}] composited (elev range {float(elev.min()):.1f}..{float(elev.max()):.1f} m)\n')

    # tile pyramid (optionally chunked into N files split by latitude, feathering stays seamless because the
    # full grid is feathered once and each tile is simply routed to one of N archives)
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    chunks = max(1, args.chunks)
    if chunks == 1:
        band_bboxes = [bbox]
    else:
        band_bboxes = []
        for i in range(chunks):
            lat_s = bbox[1] + (bbox[3] - bbox[1]) * i / chunks
            lat_n = bbox[1] + (bbox[3] - bbox[1]) * (i + 1) / chunks
            band_bboxes.append([bbox[0], lat_s, bbox[2], lat_n])
    band_ymin = [lonlat_to_merc(0.0, bb[1])[1] for bb in band_bboxes]
    band_ymax = [lonlat_to_merc(0.0, bb[3])[1] for bb in band_bboxes]

    writers, fhs, out_paths = [], [], []
    for i in range(chunks):
        out_i = args.out if chunks == 1 else args.out[:-len('.pmtiles')] + f'_{i}.pmtiles'
        out_paths.append(out_i)
        fh = open(out_i + '.part', 'wb')
        fhs.append(fh)
        writers.append(PMTilesWriter(fh))

    ts = args.tilesize
    n_tiles = 0
    counts = [0] * chunks
    for z in range(args.zmin, args.zmax + 1):
        T = tile_size_m(z)
        n = 2 ** z
        tx0 = max(0, int(math.floor((bbox_merc[0] + HALF) / T)))
        tx1 = min(n - 1, int(math.floor((bbox_merc[2] + HALF) / T)))
        ty0 = max(0, int(math.floor((HALF - bbox_merc[3]) / T)))
        ty1 = min(n - 1, int(math.floor((HALF - bbox_merc[1]) / T)))
        for ty in range(ty0, ty1 + 1):
            yc = HALF - (ty + 0.5) * T
            bi = 0
            for i in range(chunks):
                if band_ymin[i] <= yc < band_ymax[i]:
                    bi = i
                    break
            else:
                bi = chunks - 1 if yc >= band_ymax[-1] else 0
            for tx in range(tx0, tx1 + 1):
                txmin = -HALF + tx * T
                tymax = HALF - ty * T
                px = np.linspace(txmin + T / ts / 2, txmin + T - T / ts / 2, ts, dtype='float64')
                py = np.linspace(tymax - T / ts / 2, tymax - T + T / ts / 2, ts, dtype='float64')
                gx, gy = np.meshgrid(px, py)
                tile_elev = bilinear_sample(elev, xmin, ymax, res, gx, gy)
                png = Image.fromarray(terrarium_encode(tile_elev), mode='RGB')
                buf = io.BytesIO()
                png.save(buf, format='PNG', optimize=True)
                writers[bi].write_tile(zxy_to_tileid(z, tx, ty), buf.getvalue())
                n_tiles += 1
                counts[bi] += 1
        sys.stderr.write(f'[{args.name}] z{z}: {n_tiles} tiles so far\n')

    for i in range(chunks):
        bb = band_bboxes[i]
        header = {
            'version': 3,
            'root_offset': 0, 'root_length': 0, 'metadata_offset': 0, 'metadata_length': 0,
            'leaf_directory_offset': 0, 'leaf_directory_length': 0,
            'tile_data_offset': 0, 'tile_data_length': 0,
            'addressed_tiles_count': 0, 'tile_entries_count': 0, 'tile_contents_count': 0,
            'clustered': True, 'internal_compression': Compression.GZIP,
            'tile_compression': Compression.NONE, 'tile_type': TileType.PNG,
            'min_zoom': args.zmin, 'max_zoom': args.zmax,
            'min_lon_e7': int(bb[0] * 1e7), 'min_lat_e7': int(bb[1] * 1e7),
            'max_lon_e7': int(bb[2] * 1e7), 'max_lat_e7': int(bb[3] * 1e7),
            'center_zoom': args.zmin,
        }
        meta = {'name': args.name, 'type': 'raster-dem', 'encoding': 'terrarium'}
        writers[i].finalize(header, meta)
        fhs[i].close()
        os.replace(out_paths[i] + '.part', out_paths[i])
        sys.stderr.write(f'[{args.name}] wrote {out_paths[i]} ({counts[i]} tiles, {os.path.getsize(out_paths[i])/1e6:.1f} MB)\n')

    if chunks > 1:
        manifest = [{'file': os.path.basename(out_paths[i]), 'bbox': band_bboxes[i]} for i in range(chunks)]
        manifest_path = os.path.join(os.path.dirname(os.path.abspath(args.out)), 'chunks.json')
        json.dump({'chunks': manifest}, open(manifest_path, 'w'))
        sys.stderr.write(f'[{args.name}] wrote chunks.json ({chunks} chunks, {n_tiles} tiles total)\n')


if __name__ == '__main__':
    main()
