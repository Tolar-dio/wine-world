#!/usr/bin/env python3
"""Follow-up for the Napa 3D scene: fix meta.json, then fetch OSM woods + buildings (patient retries) and
emit trees.bin + buildings.json, reusing the height.png / vines.bin already produced by depth3d_napa3d_full.py.

Scene convention (matches depth3d_napa3d_full.py and napa.html): x = merc_x - centre_x, z = merc_y - centre_y,
y = elevation (metres, real). height.png row 0 = north.
"""
import json
import math
import os
import random
import sys
import time

import numpy as np
from PIL import Image
import shapely
from shapely.geometry import shape, box
from shapely.ops import transform as st_transform
from rasterio.features import rasterize
from rasterio.transform import from_bounds

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from depth3d_terrain import lonlat_to_merc  # noqa: E402
from depth3d_vectors import overpass, bbox_str  # noqa: E402

MIRROR_PRIORITY = ['https://overpass.kumi.systems/api/interpreter',
                   'https://overpass-api.de/api/interpreter',
                   'https://overpass.osm.ch/api/interpreter',
                   'https://maps.mail.ru/osm/tools/overpass/api/interpreter']


def patient_overpass(query, label, attempts=8, sleep_s=45):
    import requests
    hdr = {'User-Agent': 'vitis-mundi-depth/1.0'}
    for a in range(attempts):
        for m in MIRROR_PRIORITY:
            try:
                r = requests.post(m, data={'data': query}, headers=hdr, timeout=120)
                if r.status_code == 200:
                    try:
                        return r.json()
                    except Exception:
                        sys.stderr.write(f'  {label} @ {m}: bad json\n')
                else:
                    sys.stderr.write(f'  {label} @ {m}: HTTP {r.status_code}\n')
            except Exception as e:
                sys.stderr.write(f'  {label} @ {m}: {type(e).__name__}\n')
        sys.stderr.write(f'  {label}: attempt {a+1}/{attempts} failed; sleeping {sleep_s}s\n')
        time.sleep(sleep_s)
    return None


def scene_transform(clon, clat):
    cx, cy = lonlat_to_merc(clon, clat)
    def f(lon, lat):
        mx, my = lonlat_to_merc(lon, lat)
        return (mx - cx, my - cy)
    return f


def decode_height(path):
    img = np.asarray(Image.open(path).convert('RGB')).astype('float32')
    return img[..., 0] * 256 + img[..., 1] + img[..., 2] / 256 - 32768


def bilinear(elev, half, res, xs, zs):
    gw = elev.shape[1]; gh = elev.shape[0]
    cols = (xs + half) / res - 0.5
    rows = (half - zs) / res - 0.5
    c0 = np.clip(np.floor(cols).astype('int64'), 0, gw - 1)
    r0 = np.clip(np.floor(rows).astype('int64'), 0, gh - 1)
    c1 = np.clip(c0 + 1, 0, gw - 1); r1 = np.clip(r0 + 1, 0, gh - 1)
    fc = cols - c0; fr = rows - r0
    a = elev[r0, c0]; b = elev[r0, c1]; c = elev[r1, c0]; d = elev[r1, c1]
    return a * (1 - fc) * (1 - fr) + b * fc * (1 - fr) + c * (1 - fc) * fr + d * fc * fr


def main():
    out = sys.argv[1]
    clon, clat = -122.42, 38.45
    span = 16000.0; res = 8.0; half = span / 2.0
    gw = gh = 2000
    f = scene_transform(clon, clat)
    random.seed(7)

    elev = decode_height(os.path.join(out, 'height.png'))
    lo, hi = float(elev.min()), float(elev.max())

    meta = {
        'center': [clon, clat], 'spanKm': 16.0, 'spanM': span,
        'west': -122.5115, 'south': 38.3780, 'east': -122.3285, 'north': 38.5220,
        'gridW': gw, 'gridH': gh, 'elevMin': lo, 'elevMax': hi,
    }
    json.dump(meta, open(os.path.join(out, 'meta.json'), 'w'), indent=1)
    sys.stderr.write(f'meta.json written (grid {gw}x{gh}, elev {lo:.1f}..{hi:.1f})\n')

    # ---- woods -> trees ----
    bb = bbox_str([meta['west'], meta['south'], meta['east'], meta['north']])
    q = f"""
[out:json][timeout:300];
(way["natural"="wood"]({bb}); way["landuse"="forest"]({bb}); relation["natural"="wood"]({bb}); relation["landuse"="forest"]({bb}););
out geom;
"""
    sys.stderr.write('fetching woods...\n')
    data = patient_overpass(q, 'woods')
    wood_polys = []
    if data:
        for e in data.get('elements', []):
            tags = e.get('tags') or {}
            if e['type'] == 'way' and 'geometry' in e and (tags.get('natural') == 'wood' or tags.get('landuse') == 'forest'):
                c = [[p['lon'], p['lat']] for p in e['geometry']]
                if len(c) >= 4:
                    try:
                        g = st_transform(lambda x, y, z=None: f(x, y), shape({'type': 'Polygon', 'coordinates': [c]})).intersection(box(-half, -half, half, half))
                        if not g.is_empty:
                            wood_polys.append(g)
                    except Exception:
                        pass
    sys.stderr.write(f'woods polygons: {len(wood_polys)}\n')

    spacing = 11.0
    nx = max(1, int(round(span / spacing)))
    step_x = span / nx
    tmask = rasterize([(p, 1) for p in wood_polys], out_shape=(nx, nx),
                      transform=from_bounds(-half, -half, half, half, nx, nx), fill=0, dtype='uint8') if wood_polys else np.zeros((nx, nx), dtype='uint8')
    tys, txs = np.nonzero(tmask)
    max_trees = 700000
    if len(txs) > max_trees:
        idx = np.random.choice(len(txs), max_trees, replace=False); txs, tys = txs[idx], tys[idx]
    tx = (-half + (txs + np.random.uniform(0.2, 0.8, len(txs))) * step_x).astype('float32')
    tz = (-half + (tys + np.random.uniform(0.2, 0.8, len(tys))) * step_x).astype('float32')
    ty = bilinear(elev, half, res, tx, tz).astype('float32')
    n_t = len(tx)
    tscale = np.random.uniform(0.8, 1.5, n_t).astype('float32')
    tvariant = np.random.randint(0, 3, n_t).astype('float32')
    tbuf = np.empty(n_t * 5, dtype='float32')
    tbuf[0::5] = tx; tbuf[1::5] = tz; tbuf[2::5] = ty; tbuf[3::5] = tscale; tbuf[4::5] = tvariant
    tbuf.tofile(os.path.join(out, 'trees.bin'))
    sys.stderr.write(f'trees: {n_t}\n')

    # ---- buildings ----
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
        d = patient_overpass(q, f'buildings {lat},{lon}', attempts=5, sleep_s=30)
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
                g = st_transform(lambda x, y, z=None: f(x, y), shape({'type': 'Polygon', 'coordinates': [c]}))
            except Exception:
                continue
            if g.is_empty:
                continue
            t = e['tags']
            height = 6.0
            if 'height' in t:
                try: height = float(t['height'])
                except ValueError: pass
            elif 'building:levels' in t:
                try: height = max(4.0, float(t['building:levels']) * 3.0)
                except ValueError: pass
            ring = [[round(float(x), 1), round(float(y), 1)] for x, y in g.exterior.coords]
            if len(ring) >= 4:
                buildings.append({'ring': ring, 'height': round(height, 1)})
    json.dump({'buildings': buildings}, open(os.path.join(out, 'buildings.json'), 'w'), separators=(',', ':'))
    sys.stderr.write(f'buildings: {len(buildings)}\n')

    meta['counts'] = {'vines': 4000000, 'trees': n_t, 'buildings': len(buildings)}
    json.dump(meta, open(os.path.join(out, 'meta.json'), 'w'), indent=1)
    sys.stderr.write('done\n')


if __name__ == '__main__':
    main()
