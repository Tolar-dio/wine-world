"""Commune shares of each digitised MGA polygon (OSM commune outlines cached by scripts/depth_nominatim.py),
same logic as scripts/depth_mga_fine.py. Output merged into work/depth_fine2/mga_terrain.json as 'communes'.
Usage: python3 -I scripts/depth_fine2_mga_communes.py"""
import sys, json, hashlib
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd
T = Transformer.from_crs(4326, 32632, always_xy=True)
C = {'barolo': ['Barolo', 'La Morra', 'Castiglione Falletto', "Serralunga d'Alba", "Monforte d'Alba", 'Novello',
                'Verduno', 'Grinzane Cavour', "Diano d'Alba", 'Roddi', 'Cherasco'],
     'barbaresco': ['Barbaresco', 'Neive', 'Treiso', 'Alba']}
out = json.load(open(ROOT + '/work/depth_fine2/mga_terrain.json'))
for key, comms in C.items():
    cp = {}
    for c in comms:
        fn = f'{RAW}/osm_nominatim_depth/{hashlib.md5((c + ", Cuneo").encode()).hexdigest()[:12]}.json'
        for r in json.load(open(fn))['res']:
            if r['class'] == 'boundary':
                cp[c] = reproj(shape(r['geojson']), T); break
    g = gpd.read_file(f'{ROOT}/work/depth/mga/{key}_mga.gpkg')
    for r in g.itertuples():
        fid = f'it-{key}-{slug(r.name.replace(chr(8217), chr(39)))}'
        geom = shapely.make_valid(r.geometry)
        sh = sorted(((geom.intersection(cg).area / geom.area, c) for c, cg in cp.items()), reverse=True)
        out[fid]['communes'] = [[c, round(s, 2)] for s, c in sh if s > 0.03]
json.dump(out, open(ROOT + '/work/depth_fine2/mga_terrain.json', 'w'), ensure_ascii=False, indent=0)
print('ok')
