# Barolo MGA cadastre job: climate for the changed MGA polygons only (climate_enrich.py v2, lapse-rate downscaling,
# 30 m topo target from site/data/topo/it.json), run on a scratch FeatureCollection holding just those features; the
# computed clim is then put on the same features of it_fine.geojson (all other lines byte-identical), and their
# rows in site/data/topo/_attrs.json are rewritten (clim columns from the new clim, terrain and area from the scratch
# topo merge of bmc_topo.py).
# Usage: python3 -I scripts/bmc_clim.py <scratch dir> new_barolo.json new_barbaresco.json
import json, os, subprocess, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from bmc_write import read_lines, write_lines

R = '/home/claude/winesite'
W = R + '/work/barolo-mga'
GEO = R + '/site/data/geo/it_fine.geojson'


def main():
    scratch = sys.argv[1]
    ids = []
    for fn in sys.argv[2:]:
        ids += [f['properties']['id'] for f in json.load(open(os.path.join(W, fn)))['features']]
    ids = set(ids)
    items = read_lines(GEO)
    sub = [f for _, f, _ in items if f['properties']['id'] in ids]
    assert len(sub) == len(ids)
    tmp = os.path.join(scratch, 'clim_in.geojson')
    with open(tmp, 'w', encoding='utf-8') as fh:
        fh.write('{"type":"FeatureCollection","features":[' + ',\n'.join(
            json.dumps(f, separators=(',', ':'), ensure_ascii=False) for f in sub) + ']}')
    subprocess.run([sys.executable, '-I', R + '/scripts/climate_enrich.py', tmp], check=True)
    clim = {f['properties']['id']: f['properties'].get('clim') for f in json.load(open(tmp))['features']}
    nset = 0
    for k, (pre, f, suf) in enumerate(items):
        i = f['properties']['id']
        if i in ids and clim.get(i):
            f['properties'].pop('clim', None)
            f['properties']['clim'] = clim[i]
            nset += 1
    write_lines(GEO, items)
    # _attrs.json rows
    ap = R + '/site/data/topo/_attrs.json'
    A = json.load(open(ap, encoding='utf-8'))
    S = json.load(open(os.path.join(scratch, 'topo_out', '_attrs.json')))
    cols = A['_cols']
    n = 0
    for i in ids:
        row = list(S[i])
        c = clim.get(i) or {}
        for col, key in (('gst', 'gst'), ('gdd', 'gdd'), ('hi', 'hi'), ('prec', 'prec'), ('gsp', 'gsp'), ('dtr', 'dtr'), ('mjt', 'mjt')):
            row[cols.index(col)] = c.get(key)
        assert i in A, i
        A[i] = row
        n += 1
    with open(ap + '.tmp', 'w', encoding='utf-8') as fh:
        json.dump(A, fh, separators=(',', ':'), ensure_ascii=False)
    os.replace(ap + '.tmp', ap)
    print(f'clim set on {nset} features; _attrs rows rewritten {n}')
    json.dump(clim, open(os.path.join(W, 'clim_new.json'), 'w'), ensure_ascii=False, indent=0)


if __name__ == '__main__':
    main()
