#!/usr/bin/env python3
"""Depth-pack registry emitter (Vitis Mundi). Writes docs/data/depth/index.json (+ credits.json) describing the
high-resolution packs the front end (60_depth.js) loads. Entries reference only files that exist on disk, so a
region without a terrain pyramid yet simply ships without terrain (vectors + imagery still work).

Run: python3 -I depth3d_registry.py --docs <docs-dir>
"""
import argparse
import json
import os
from pathlib import Path

# ---- single source of truth for the six flagship regions ----
REGIONS = {
    "us-napa-valley": {
        "name": "Napa Valley",
        "bbox": [-122.56, 38.20, -122.24, 38.64],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": "ni-us",
        "credits": {"name": "USGS 3DEP 1/3 arc-second DEM; NAIP imagery; OpenStreetMap",
                    "url": "https://www.usgs.gov/3d-elevation-program",
                    "license": "public domain (USGS/NAIP) / ODbL (OpenStreetMap)"},
    },
    "us-sonoma-valley": {
        "name": "Sonoma Valley",
        "bbox": [-122.6747, 38.1161, -122.3497, 38.4713],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": "ni-us",
        "credits": {"name": "USGS 3DEP 1/3 arc-second DEM; NAIP imagery; OpenStreetMap",
                    "url": "https://www.usgs.gov/3d-elevation-program",
                    "license": "public domain (USGS/NAIP) / ODbL (OpenStreetMap)"},
    },
    "fr-medoc": {
        "name": "Médoc",
        "bbox": [-1.0606, 44.8996, -0.5889, 45.4395],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": "ni-fr",
        "credits": {"name": "IGN RGE ALTI DEM; IGN ortho; OpenStreetMap",
                    "url": "https://geoservices.ign.fr",
                    "license": "Licence Ouverte 2.0 (IGN) / ODbL (OpenStreetMap)"},
    },
    "region-fr-southern-rhone": {
        "name": "Southern Rhône",
        "bbox": [4.65, 43.98, 5.10, 44.35],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": "ni-fr",
        "credits": {"name": "IGN RGE ALTI DEM; IGN ortho; OpenStreetMap",
                    "url": "https://geoservices.ign.fr",
                    "license": "Licence Ouverte 2.0 (IGN) / ODbL (OpenStreetMap)"},
    },
    "it-chianti-classico": {
        "name": "Chianti Classico",
        "bbox": [11.122, 43.3361, 11.5517, 43.7085],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": "ni-it-to",
        "credits": {"name": "INGV TINITALY 10 m DTM; Regione Toscana AGEA ortho; OpenStreetMap",
                    "url": "https://tinitaly.pi.ingv.it",
                    "license": "CC BY (TINITALY) / CC BY 4.0 (Regione Toscana) / ODbL (OpenStreetMap)"},
    },
    "it-barolo": {
        "name": "Barolo",
        "bbox": [7.7493, 44.5569, 8.081, 44.6945],
        "zMin": 9, "zMax": 13, "exaggeration": 1.4,
        "imagery": None,
        "credits": {"name": "INGV TINITALY 10 m DTM; OpenStreetMap",
                    "url": "https://tinitaly.pi.ingv.it",
                    "license": "CC BY (TINITALY) / ODbL (OpenStreetMap)"},
    },
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--docs', required=True)
    args = ap.parse_args()
    depth = Path(args.docs) / 'data' / 'depth'
    depth.mkdir(parents=True, exist_ok=True)

    index = {}
    for rid, cfg in REGIONS.items():
        entry = {
            'name': cfg['name'], 'bbox': cfg['bbox'],
            'zMin': cfg['zMin'], 'zMax': cfg['zMax'],
            'exaggeration': cfg['exaggeration'], 'imagery': cfg['imagery'],
            'credits': cfg['credits'],
            'terrain': None, 'vectors': [],
        }
        # terrain: a single terrain.pmtiles, or chunked terrain_<i>.pmtiles described by chunks.json
        chunks_manifest = depth / rid / 'chunks.json'
        terrain_single = depth / rid / 'terrain.pmtiles'
        if chunks_manifest.exists():
            try:
                cj = json.loads((chunks_manifest).read_text(encoding='utf-8'))
                entry['terrain'] = [{'file': f'data/depth/{rid}/{c["file"]}', 'bbox': c['bbox']} for c in cj['chunks']]
            except Exception:
                entry['terrain'] = None
        elif terrain_single.exists():
            entry['terrain'] = f'data/depth/{rid}/terrain.pmtiles'
        for kind in ('vineyards', 'buildings'):
            f = depth / rid / f'{kind}.geojson'
            if f.exists():
                entry['vectors'].append({'src': f'data/depth/{rid}/{kind}.geojson', 'kind': kind[:-1]})
        index[rid] = entry

    (depth / 'index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    credits = {rid: cfg['credits'] for rid, cfg in REGIONS.items()}
    (depth / 'credits.json').write_text(json.dumps(credits, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'wrote index.json ({len(index)} regions) and credits.json')
    for rid, e in index.items():
        t = e['terrain']
        terrain_desc = 'chunks:' + str(len(t)) if isinstance(t, list) else ('yes' if t else 'no')
        print(f'  {rid}: terrain={terrain_desc} vectors={len(e["vectors"])}')


if __name__ == '__main__':
    main()
