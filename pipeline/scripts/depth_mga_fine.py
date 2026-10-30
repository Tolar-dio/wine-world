# Barolo and Barbaresco MGAs (menzioni geografiche aggiuntive) -> appended to site/data/geo/it_fine.geojson
# (src "consmap", bq "approx").
#  Reconstructed from the Consorzio di Tutela Barolo Barbaresco Alba Langhe e Dogliani's official MGA maps
#  ("Barolo / Barbaresco - La mappa ufficiale", 2019 edition, Alessandro Masnaghetti Editore, published as 300 dpi
#  images on langhevini.it), because the Regione Piemonte geoportal (the official vector source) is unreachable:
#   1. georeferenced to UTM 32N by matching the maps' red dotted commune boundaries to OpenStreetMap commune
#      boundaries (FFT similarity search + trimmed affine ICP; scripts/depth_mga_georef.py);
#   2. MGA labels read by OCR (tesseract) and matched to the disciplinare lists (Barolo art. 8, 170 MGAs + 11
#      communal mentions; Barbaresco art. 7, 66 MGAs), with the few the OCR missed placed by eye;
#   3. each MGA grown from its label over its fill colour (scripts/depth_mga_regions.py), thin features removed.
#  Names follow the disciplinare spelling; alternative names ("Cannubi Boschis o Cannubi"...) go to alt.
# Usage: python3 -I scripts/depth_mga_fine.py
import sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd, hashlib

SRC = 'consmap'
MGA = ROOT + '/work/depth/mga'
T_32632_4326 = Transformer.from_crs(32632, 4326, always_xy=True)
T_4326_32632 = Transformer.from_crs(4326, 32632, always_xy=True)
COMMUNES = {'barolo': ['Barolo', 'La Morra', 'Castiglione Falletto', "Serralunga d'Alba", "Monforte d'Alba", 'Novello',
                       'Verduno', 'Grinzane Cavour', "Diano d'Alba", 'Roddi', 'Cherasco'],
            'barbaresco': ['Barbaresco', 'Neive', 'Treiso', 'Alba']}
PARENT = {'barolo': 'it-barolo', 'barbaresco': 'it-barbaresco'}
DOC = {'barolo': 'Barolo', 'barbaresco': 'Barbaresco'}


def commune_polys(key):
    out = {}
    for c in COMMUNES[key]:
        fn = f'{RAW}/osm_nominatim_depth/{hashlib.md5((c + ", Cuneo").encode()).hexdigest()[:12]}.json'
        for r in json.load(open(fn))['res']:
            if r['class'] == 'boundary':
                out[c] = reproj(shape(r['geojson']), T_4326_32632)
                break
    return out


def main():
    taken = all_ids(SRC)
    feats = []
    for key in ('barolo', 'barbaresco'):
        p = f'{MGA}/{key}_mga.gpkg'
        if not os.path.exists(p):
            print('  no', p); continue
        g = gpd.read_file(p)
        names = json.load(open(f'{MGA}/{key}_names.json'))
        stats = json.load(open(f'{MGA}/{key}_affine.json'))['stats']
        cp = commune_polys(key)
        cu = shapely.make_valid(shapely.union_all(list(cp.values())))
        for r in g.itertuples():
            geom = clean_projected(shapely.make_valid(r.geometry), min_hole_km2=0.002, min_part_km2=0.001)
            if geom is None or geom.is_empty:
                continue
            geom = polys_only(shapely.make_valid(shapely.simplify(geom, 3.0)))
            # MGAs lie inside the DOCG communes by law; georeferencing error at the map edges (no internal commune
            # lines there) pushes a few eastern ones partly outside: clip them to the commune union
            out_share = 1 - geom.intersection(cu).area / geom.area
            clipped = None
            if 0.01 < out_share < 0.5:
                geom = polys_only(shapely.make_valid(geom.intersection(cu)))
                clipped = round(out_share, 2)
            share = sorted(((geom.intersection(cg).area / geom.area, c) for c, cg in cp.items()), reverse=True)
            comm = [c for s, c in share if s > 0.1]
            name = r.name.replace('’', "'")
            alt = [a for a in names.get(r.name, [])]
            alt = alt + [f'{DOC[key]} {name}']
            fid = unique_id(f'it-{key}-{slug(name)}', taken)
            reg = {'doc': DOC[key], 'communes': comm,
                   'labels_on_map': int(r.n_labels),
                   'note': (f'Approximate: digitised from the Consorzio\'s official MGA map image (2019), georeferenced to '
                            f'OpenStreetMap commune boundaries (median misfit {stats["median_m"]:.0f} m, 70th pct '
                            f'{stats["p70_m"]:.0f} m); edges follow the printed colour fills, not the cadastral parcels of the '
                            f'disciplinare annex.')}
            if r.manual:
                reg['label'] = 'located by eye (OCR missed it)'
            if clipped:
                reg['clipped'] = f'{int(clipped * 100)}% of the digitised outline fell outside the DOCG communes and was clipped'
            elif out_share >= 0.5:
                reg['position'] = 'uncertain: the digitised outline falls mostly outside the commune; true position is nearby'
            feats.append({'id': fid, 'name': name, 'alt': alt, 'country': 'it', 'cat': 'DOCG', 'subcat': 'MGA',
                          'src': SRC, 'bq': 'approx', 'area': round(geom.area / 1e6, 2), 'parent': PARENT[key],
                          'styles': ['red'], 'varieties': ['Nebbiolo'], 'reg': reg,
                          '_g': polys_only(shapely.make_valid(reproj(geom, T_32632_4326)))})
        print(key, 'MGA features', sum(1 for f in feats if f['reg']['doc'] == DOC[key]))
    out = finish_feats(feats, 'mga', 6)
    append_fine('it', out, replace_src=SRC)


if __name__ == '__main__':
    main()
