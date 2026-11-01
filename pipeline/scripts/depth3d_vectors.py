#!/usr/bin/env python3
"""Depth3D vector builder (Vitis Mundi): fetch OSM vineyards and buildings for a region bbox and write
clipped, simplified GeoJSON the front end loads as vector layers (60_depth.js).

Usage:
  python3 -I depth3d_vectors.py --name us-napa-valley --bbox=-122.65,38.15,-122.06,38.77 \
      --out-dir data/depth/us-napa-valley --towns=38.30,-122.29,6 [--towns=...]
"""
import argparse
import json
import os
import sys
import time

import requests
from shapely.geometry import shape
from shapely.geometry import box

MIRRORS = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.osm.ch/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass-api.de/api/interpreter',
]
HEADERS = {'User-Agent': 'vitis-mundi-depth/1.0 (wine atlas; OSM data for appellation detail)'}


def overpass(query, label):
    for mirror in MIRRORS:
        for attempt in range(2):
            try:
                r = requests.post(mirror, data={'data': query}, headers=HEADERS, timeout=90)
                if r.status_code == 200:
                    return r.json()
                sys.stderr.write(f'  overpass {label} @ {mirror}: HTTP {r.status_code}\n')
            except Exception as e:
                sys.stderr.write(f'  overpass {label} @ {mirror}: {e}\n')
            time.sleep(4)
    return None


def bbox_str(bbox):
    return f'{bbox[1]},{bbox[0]},{bbox[3]},{bbox[2]}'  # south,west,north,east


def ring_of(geometry):
    return [[p['lon'], p['lat']] for p in geometry if isinstance(p, dict) and 'lon' in p and 'lat' in p]


def simplify(fc, tolerance_m):
    tol = tolerance_m / 111320.0
    out = []
    for f in fc['features']:
        g = shape(f['geometry'])
        s = g.simplify(tol, preserve_topology=True)
        if not s.is_empty:
            f = dict(f)
            f['geometry'] = s.__geo_interface__
            out.append(f)
    return {'type': 'FeatureCollection', 'features': out}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--name', required=True)
    ap.add_argument('--bbox', required=True, help='w,s,e,n')
    ap.add_argument('--out-dir', required=True)
    ap.add_argument('--towns', nargs='*', default=[], help='lon,lat,radius_km for building queries')
    ap.add_argument('--max-buildings', type=int, default=30000)
    ap.add_argument('--buildings-only', action='store_true', help='skip vineyards (retry buildings)')
    args = ap.parse_args()

    bbox = [float(v) for v in args.bbox.split(',')]
    os.makedirs(args.out_dir, exist_ok=True)
    bbox_geom = box(bbox[0], bbox[1], bbox[2], bbox[3])
    bb = bbox_str(bbox)

    # ---------------- vineyards ----------------
    q = f"""
[out:json][timeout:180];
(
  way["landuse"="vineyard"]({bb});
  relation["landuse"="vineyard"]({bb});
);
out geom;
"""
    sys.stderr.write(f'[{args.name}] fetching vineyards...\n')
    data = overpass(q, 'vineyards')
    vf = []
    if data:
        for e in data.get('elements', []):
            tags = e.get('tags') or {}
            if e['type'] == 'way' and tags and 'geometry' in e:
                coords = ring_of(e['geometry'])
                if len(coords) < 4:
                    continue
                try:
                    g = shape({'type': 'Polygon', 'coordinates': [coords]}).intersection(bbox_geom)
                except Exception:
                    continue
            elif e['type'] == 'relation' and tags:
                polys = []
                for m in e.get('members', []):
                    if m.get('type') == 'way' and 'geometry' in m:
                        c = ring_of(m['geometry'])
                        if len(c) >= 4:
                            try:
                                polys.append(shape({'type': 'Polygon', 'coordinates': [c]}))
                            except Exception:
                                pass
                if not polys:
                    continue
                try:
                    from shapely.ops import unary_union
                    g = unary_union(polys).intersection(bbox_geom)
                except Exception:
                    continue
            else:
                continue
            if not g.is_empty:
                vf.append({'type': 'Feature', 'properties': {'vineyard': True}, 'geometry': g.__geo_interface__})
    vfc = simplify({'type': 'FeatureCollection', 'features': vf}, 6.0)
    vp = os.path.join(args.out_dir, 'vineyards.geojson')
    if vfc['features']:
        with open(vp, 'w', encoding='utf-8') as f:
            json.dump(vfc, f, separators=(',', ':'))
        sys.stderr.write(f'[{args.name}] wrote {vp} ({len(vfc["features"])} vineyards, {os.path.getsize(vp)/1e6:.2f} MB)\n')
    else:
        sys.stderr.write(f'[{args.name}] WARN 0 vineyards (query likely failed); keeping any existing file\n')

    # ---------------- buildings around towns ----------------
    if args.towns:
        bfs = []
        seen = set()
        for t in args.towns:
            lon, lat, rkm = (float(v) for v in t.split(','))
            q = f"""
[out:json][timeout:120];
way["building"](around:{rkm * 1000},{lat},{lon});
out geom;
"""
            sys.stderr.write(f'[{args.name}] fetching buildings around {lat},{lon}...\n')
            data = overpass(q, f'buildings {lat},{lon}')
            if not data:
                continue
            for e in data.get('elements', []):
                if e['type'] != 'way' or not (e.get('tags') or {}).get('building') or 'geometry' not in e:
                    continue
                coords = ring_of(e['geometry'])
                if len(coords) < 4:
                    continue
                try:
                    g = shape({'type': 'Polygon', 'coordinates': [coords]}).intersection(bbox_geom)
                except Exception:
                    continue
                if g.is_empty:
                    continue
                props = {}
                t = e['tags']
                if 'height' in t:
                    try:
                        props['height'] = float(t['height'])
                    except ValueError:
                        pass
                if 'building:levels' in t:
                    try:
                        props['levels'] = int(float(t['building:levels']))
                    except ValueError:
                        pass
                bfs.append({'type': 'Feature', 'properties': props, 'geometry': g.__geo_interface__})
                if len(bfs) >= args.max_buildings:
                    break
            if len(bfs) >= args.max_buildings:
                break
            time.sleep(1.5)
        bfc = simplify({'type': 'FeatureCollection', 'features': bfs}, 3.0)
        bp = os.path.join(args.out_dir, 'buildings.geojson')
        if bfc['features']:
            with open(bp, 'w', encoding='utf-8') as f:
                json.dump(bfc, f, separators=(',', ':'))
            sys.stderr.write(f'[{args.name}] wrote {bp} ({len(bfc["features"])} buildings, {os.path.getsize(bp)/1e6:.2f} MB)\n')
        else:
            sys.stderr.write(f'[{args.name}] WARN 0 buildings (queries likely failed); keeping any existing file\n')
    else:
        sys.stderr.write(f'[{args.name}] no --towns given; skipping buildings\n')


if __name__ == '__main__':
    main()
