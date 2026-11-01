#!/usr/bin/env python3
"""Napa Valley "all-out" 3D scene data (Vitis Mundi).

Builds, for a square scene centred on the valley, everything the standalone three.js scene
(docs/3d/napa.html) renders:
  height.png     terrarium-RGB heightfield (scene mercator grid)
  ortho.jpg      NAIP mosaic (cropped to the scene square)
  vines.bin      Float32 [x, z, y, scale, variant] per vine, placed inside real OSM vineyard parcels
  trees.bin      Float32 [x, z, y, scale, variant] per tree, scattered inside OSM woods/forest
  buildings.json [{ ring:[[x,z]...], height, levels }]  footprints in scene metres
  meta.json      scene bounds, grid size, object counts

Everything is in scene coordinates: x = mercator_x - centre_x, z = mercator_y - centre_y (metres), so the
front end maps them 1:1 onto the terrain plane (which is span x span metres).

Usage:
  python3 -I depth3d_napa3d_full.py --dem a.tif --dem b.tif --center=-122.42,38.45 --span-km=16 \
      --res=8 --ortho-z=16 --out-dir docs/3d/napa \
      --vineyards docs/data/depth/us-napa-valley/vineyards.geojson
"""
import argparse
import io
import json
import math
import os
import random
import sys

import numpy as np
from PIL import Image
import requests
import shapely
from shapely.geometry import shape, box, Point
from shapely.ops import transform as st_transform
from rasterio.features import rasterize
from rasterio.transform import from_bounds

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from depth3d_terrain import (EARTH, HALF, lonlat_to_merc, merc_to_lonlat, bbox_to_merc,  # noqa: E402
                             load_dem, reproject_to_grid, terrarium_encode, tile_size_m)
from depth3d_vectors import overpass, bbox_str  # noqa: E402

NAIP = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}'


def scene_transform(clon, clat):
    cx, cy = lonlat_to_merc(clon, clat)
    def f(lon, lat):
        mx, my = lonlat_to_merc(lon, lat)
        return (mx - cx, my - cy)
    return f, cx, cy


def to_scene(geom, f):
    return st_transform(lambda x, y, z=None: f(x, y), geom)


def bilinear(grid, xmin, ymax, res, xs, zs):
    """grid[row, col] north-up; sample at scene (x, z)."""
    cols = (xs - xmin) / res - 0.5
    rows = (ymax - zs) / res - 0.5
    H, W = grid.shape
    c0 = np.clip(np.floor(cols).astype('int64'), 0, W - 1)
    r0 = np.clip(np.floor(rows).astype('int64'), 0, H - 1)
    c1 = np.clip(c0 + 1, 0, W - 1)
    r1 = np.clip(r0 + 1, 0, H - 1)
    fc = cols - c0
    fr = rows - r0
    a = grid[r0, c0]; b = grid[r0, c1]; c = grid[r1, c0]; d = grid[r1, c1]
    return a * (1 - fc) * (1 - fr) + b * fc * (1 - fr) + c * (1 - fc) * fr + d * fc * fr


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dem', action='append', required=True)
    ap.add_argument('--center', required=True, help='lon,lat')
    ap.add_argument('--span-km', type=float, default=16.0)
    ap.add_argument('--res', type=float, default=8.0)
    ap.add_argument('--ortho-z', type=int, default=16)
    ap.add_argument('--out-dir', required=True)
    ap.add_argument('--vineyards', required=True, help='path to vineyards.geojson')
    ap.add_argument('--vine-spacing', type=float, default=3.2)
    ap.add_argument('--row-spacing', type=float, default=3.2)
    ap.add_argument('--tree-spacing', type=float, default=11.0)
    ap.add_argument('--max-vines', type=int, default=4000000)
    ap.add_argument('--max-trees', type=int, default=700000)
    args = ap.parse_args()

    clon, clat = (float(v) for v in args.center.split(','))
    f, cx, cy = scene_transform(clon, clat)
    span = args.span_km * 1000.0
    half = span / 2.0
    os.makedirs(args.out_dir, exist_ok=True)
    random.seed(7)

    # ---- 1. elevation grid (scene mercator) ----
    scene = [cx - half, cy - half, cx + half, cy + half]
    pad = args.res * 64
    bbox_merc_padded = [scene[0] - pad, scene[1] - pad, scene[2] + pad, scene[3] + pad]
    bbox_lonlat_padded = [
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[0],
        merc_to_lonlat(bbox_merc_padded[0], bbox_merc_padded[1])[1],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[0],
        merc_to_lonlat(bbox_merc_padded[2], bbox_merc_padded[3])[1],
    ]
    sys.stderr.write('building elevation grid...\n')
    mosaic, src_tr, src_crs, _ = load_dem(args.dem, bbox_lonlat_padded)
    elev, xmin, ymax, res = reproject_to_grid(mosaic, src_tr, src_crs, bbox_merc_padded, args.res)
    x0 = int((scene[0] - xmin) / res); x1 = int((scene[2] - xmin) / res)
    y0 = int((ymax - scene[3]) / res); y1 = int((ymax - scene[1]) / res)
    elev = elev[y0:y1, x0:x1]
    elev = np.nan_to_num(elev, nan=0.0)
    gw = elev.shape[1]; gh = elev.shape[0]
    lo, hi = float(elev.min()), float(elev.max())
    Image.fromarray(terrarium_encode(elev), mode='RGB').save(os.path.join(args.out_dir, 'height.png'))
    sys.stderr.write(f'heightmap {gw}x{gh} elev {lo:.1f}..{hi:.1f} m\n')

    # ---- 2. NAIP ortho ----
    z = args.ortho_z
    T = tile_size_m(z)
    n = 2 ** z
    tx0 = int(math.floor((scene[0] + HALF) / T)); tx1 = int(math.floor((scene[2] + HALF) / T))
    ty0 = int(math.floor((HALF - scene[3]) / T)); ty1 = int(math.floor((HALF - scene[1]) / T))
    tw = tx1 - tx0 + 1; th = ty1 - ty0 + 1
    ortho = np.zeros((th * 256, tw * 256, 3), dtype='uint8')
    s = requests.Session()
    total = tw * th; done = 0
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
    wpx = (scene[0] + HALF) / T * 256 - tx0 * 256
    epx = (scene[2] + HALF) / T * 256 - tx0 * 256
    npx = (HALF - scene[3]) / T * 256 - ty0 * 256
    spx = (HALF - scene[1]) / T * 256 - ty0 * 256
    ortho = ortho[max(0, int(round(npx))):int(round(spx)), max(0, int(round(wpx))):int(round(epx))]
    im = Image.fromarray(ortho, mode='RGB')
    maxdim = 4096
    if max(im.size) > maxdim:
        im.thumbnail((maxdim, maxdim), Image.LANCZOS)
    im.save(os.path.join(args.out_dir, 'ortho.jpg'), quality=85, optimize=True)

    # ---- 3. vineyards -> vines ----
    sys.stderr.write('generating vines...\n')
    fc = json.load(open(args.vineyards, encoding='utf-8'))
    polys = []
    for feat in fc['features']:
        g = shape(feat['geometry'])
        if g.is_empty:
            continue
        gs = to_scene(g, f).intersection(box(-half, -half, half, half))
        if gs.is_empty:
            continue
        if gs.geom_type == 'Polygon':
            polys.append(gs)
        elif gs.geom_type == 'MultiPolygon':
            polys.extend(gs.geoms)
    nx = max(1, int(round(span / args.vine_spacing)))
    ny = max(1, int(round(span / args.row_spacing)))
    vstep_x = span / nx; vstep_z = span / ny
    mask = rasterize([(p, 1) for p in polys], out_shape=(ny, nx),
                     transform=from_bounds(-half, -half, half, half, nx, ny), fill=0, dtype='uint8')
    ys, xs = np.nonzero(mask)
    if len(xs) > args.max_vines:
        idx = np.random.choice(len(xs), args.max_vines, replace=False)
        xs, ys = xs[idx], ys[idx]
    vx = (-half + (xs + np.random.uniform(0.3, 0.7, len(xs))) * vstep_x).astype('float32')
    vz = (-half + (ys + np.random.uniform(0.3, 0.7, len(ys))) * vstep_z).astype('float32')
    vy = bilinear(elev, -half, half, args.res, vx, vz).astype('float32')
    n_v = len(vx)
    vscale = np.random.uniform(0.85, 1.25, n_v).astype('float32')
    vvariant = np.random.randint(0, 2, n_v).astype('float32')
    vbuf = np.empty(n_v * 5, dtype='float32')
    vbuf[0::5] = vx; vbuf[1::5] = vz; vbuf[2::5] = vy; vbuf[3::5] = vscale; vbuf[4::5] = vvariant
    vbuf.tofile(os.path.join(args.out_dir, 'vines.bin'))
    sys.stderr.write(f'vines: {n_v}\n')

    # ---- 4. woods -> trees ----
    sys.stderr.write('fetching woods/forest...\n')
    bb = bbox_str([merc_to_lonlat(scene[0], scene[1])[0], merc_to_lonlat(scene[0], scene[1])[1],
                   merc_to_lonlat(scene[2], scene[3])[0], merc_to_lonlat(scene[2], scene[3])[1]])
    q = f"""
[out:json][timeout:300];
(
  way["natural"="wood"]({bb});
  way["landuse"="forest"]({bb});
  relation["natural"="wood"]({bb});
  relation["landuse"="forest"]({bb});
);
out geom;
"""
    data = overpass(q, 'woods')
    wood_polys = []
    if data:
        for e in data.get('elements', []):
            if e['type'] == 'way' and 'geometry' in e and (e.get('tags') or {}).get('natural') == 'wood':
                c = [[p['lon'], p['lat']] for p in e['geometry']]
                if len(c) >= 4:
                    try:
                        g = to_scene(shape({'type': 'Polygon', 'coordinates': [c]}), f).intersection(box(-half, -half, half, half))
                        if not g.is_empty:
                            wood_polys.append(g)
                    except Exception:
                        pass
            elif e['type'] == 'way' and 'geometry' in e and (e.get('tags') or {}).get('landuse') == 'forest':
                c = [[p['lon'], p['lat']] for p in e['geometry']]
                if len(c) >= 4:
                    try:
                        g = to_scene(shape({'type': 'Polygon', 'coordinates': [c]}), f).intersection(box(-half, -half, half, half))
                        if not g.is_empty:
                            wood_polys.append(g)
                    except Exception:
                        pass
    sys.stderr.write(f'woods polygons: {len(wood_polys)}\n')
    tmask = rasterize([(p, 1) for p in wood_polys], out_shape=(ny, nx),
                      transform=from_bounds(-half, -half, half, half, nx, ny), fill=0, dtype='uint8') if wood_polys else np.zeros((ny, nx), dtype='uint8')
    # trees are sparser than vines: subsample the wood mask
    step = max(1, int(round(args.tree_spacing / args.vine_spacing)))
    tmask2 = tmask[::step, ::step]
    tys, txs = np.nonzero(tmask2)
    if len(txs) > args.max_trees:
        idx = np.random.choice(len(txs), args.max_trees, replace=False)
        txs, tys = txs[idx], tys[idx]
    tx = (-half + (txs + np.random.uniform(0.2, 0.8, len(txs))) * vstep_x * step).astype('float32')
    tz = (-half + (tys + np.random.uniform(0.2, 0.8, len(tys))) * vstep_z * step).astype('float32')
    ty = bilinear(elev, -half, half, args.res, tx, tz).astype('float32')
    n_t = len(tx)
    tscale = np.random.uniform(0.8, 1.5, n_t).astype('float32')
    tvariant = np.random.randint(0, 3, n_t).astype('float32')
    tbuf = np.empty(n_t * 5, dtype='float32')
    tbuf[0::5] = tx; tbuf[1::5] = tz; tbuf[2::5] = ty; tbuf[3::5] = tscale; tbuf[4::5] = tvariant
    tbuf.tofile(os.path.join(args.out_dir, 'trees.bin'))
    sys.stderr.write(f'trees: {n_t}\n')

    # ---- 5. buildings ----
    sys.stderr.write('fetching buildings...\n')
    towns = [(-122.4703, 38.5052, 3.0), (-122.4230, 38.4580, 1.5), (-122.4050, 38.4370, 1.5),
             (-122.3611, 38.4016, 1.5), (-122.2869, 38.2975, 2.0)]
    buildings = []
    seen = set()
    for lon, lat, rkm in towns:
        q = f"""
[out:json][timeout:180];
way["building"](around:{rkm * 1000},{lat},{lon});
out geom;
"""
        d = overpass(q, f'buildings {lat},{lon}')
        if not d:
            continue
        for e in d.get('elements', []):
            if e['type'] != 'way' or not (e.get('tags') or {}).get('building') or 'geometry' not in e:
                continue
            c = [[p['lon'], p['lat']] for p in e['geometry']]
            if len(c) < 4:
                continue
            key = (round(c[0][0], 5), round(c[0][1], 5))
            if key in seen:
                continue
            seen.add(key)
            try:
                g = to_scene(shape({'type': 'Polygon', 'coordinates': [c]}), f)
            except Exception:
                continue
            if g.is_empty:
                continue
            t = e['tags']
            height = 6.0
            if 'height' in t:
                try:
                    height = float(t['height'])
                except ValueError:
                    pass
            elif 'building:levels' in t:
                try:
                    height = max(4.0, float(t['building:levels']) * 3.0)
                except ValueError:
                    pass
            ring = [[round(float(x), 1), round(float(y), 1)] for x, y in g.exterior.coords]
            if len(ring) >= 4:
                buildings.append({'ring': ring, 'height': round(height, 1)})
    with open(os.path.join(args.out_dir, 'buildings.json'), 'w', encoding='utf-8') as fp:
        json.dump({'buildings': buildings}, fp, separators=(',', ':'))
    sys.stderr.write(f'buildings: {len(buildings)}\n')

    # ---- meta ----
    meta = {
        'center': [clon, clat], 'spanKm': args.span_km, 'spanM': span,
        'west': merc_to_lonlat(scene[0], scene[1])[0], 'south': merc_to_lonlat(scene[0], scene[1])[1],
        'east': merc_to_lonlat(scene[2], scene[3])[0], 'north': merc_to_lonlat(scene[2], scene[3])[1],
        'gridW': gw, 'gridH': gh, 'elevMin': lo, 'elevMax': hi,
        'counts': {'vines': n_v, 'trees': n_t, 'buildings': len(buildings)},
    }
    with open(os.path.join(args.out_dir, 'meta.json'), 'w', encoding='utf-8') as fp:
        json.dump(meta, fp, indent=1)
    sys.stderr.write(f'wrote meta.json ({json.dumps(meta["counts"])})\n')


if __name__ == '__main__':
    main()
