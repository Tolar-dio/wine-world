# Barolo MGA cadastre job: write the rebuilt Barolo / Barbaresco MGA polygons into the site data, in place.
# it_fine.geojson: only the lines of the changed features are replaced (same position, same property order;
# src, bq, area, lp, bbox, reg and the geometry replaced, clim dropped until the climate step); every other line
# stays byte-identical. _index.json: area, lp, bbox, bq of the same ids. content/it_fine.json: lp if present.
# Backups: work/fine_backup/*.2026-11-05.pre-barolo-mga.*
# Usage: python3 -I scripts/bmc_write.py [--dry] new_barolo.json [new_barbaresco.json ...]
import json, os, sys

R = '/home/claude/winesite'
GEO = R + '/site/data/geo'
W = R + '/work/barolo-mga'
CONTENT = R + '/site/data/content/it_fine.json'
HEAD = '{"type":"FeatureCollection","features":['
DUMP = dict(separators=(',', ':'), ensure_ascii=False)


def read_lines(path):
    L = open(path, encoding='utf-8').read().split('\n')
    out = []
    for i, l in enumerate(L):
        pre = HEAD if i == 0 else ''
        suf = ']}' if i == len(L) - 1 else ','
        assert l.startswith(pre) and l.endswith(suf), i
        out.append((pre, json.loads(l[len(pre):len(l) - len(suf)]), suf))
    return out


def write_lines(path, items):
    s = '\n'.join(pre + json.dumps(f, **DUMP) + suf for pre, f, suf in items)
    with open(path + '.tmp', 'w', encoding='utf-8') as fh:
        fh.write(s)
    assert os.path.getsize(path + '.tmp') < 8_000_000
    os.replace(path + '.tmp', path)


def main():
    dry = '--dry' in sys.argv
    new = {}
    for fn in [a for a in sys.argv[1:] if not a.startswith('--')]:
        for f in json.load(open(os.path.join(W, fn)))['features']:
            new[f['properties']['id']] = f
    items = read_lines(GEO + '/it_fine.geojson')
    seen = set()
    for k, (pre, f, suf) in enumerate(items):
        fid = f['properties']['id']
        if fid not in new:
            continue
        np_ = new[fid]['properties']
        p = f['properties']
        out = {}
        for key, val in p.items():
            if key == 'clim':
                continue
            out[key] = np_[key] if key in ('src', 'bq', 'area', 'lp', 'bbox', 'reg', 'parent') and key in np_ else val
        for key in ('src', 'bq', 'reg'):
            if key not in out:
                out[key] = np_[key]
        items[k] = (pre, {'type': 'Feature', 'properties': out, 'geometry': new[fid]['geometry']}, suf)
        seen.add(fid)
    missing = set(new) - seen
    assert not missing, missing
    idx = json.load(open(GEO + '/_index.json', encoding='utf-8'))
    n_idx = 0
    for e in idx:
        if e['id'] in new:
            np_ = new[e['id']]['properties']
            for key in ('area', 'lp', 'bbox', 'bq'):
                e[key] = np_[key]
            n_idx += 1
    cont = json.load(open(CONTENT, encoding='utf-8'))
    n_c = 0
    for fid, f in new.items():
        pr = cont['fine_profiles'].get(fid)
        if pr is not None and 'lp' in pr:
            pr['lp'] = f['properties']['lp']; n_c += 1
    print(f'features replaced {len(seen)}, index entries {n_idx}, profiles with lp {n_c}')
    if dry:
        return
    write_lines(GEO + '/it_fine.geojson', items)
    for path, obj in ((GEO + '/_index.json', idx), (CONTENT, cont)):
        with open(path + '.tmp', 'w', encoding='utf-8') as fh:
            json.dump(obj, fh, **DUMP)
        os.replace(path + '.tmp', path)
    print('written')


if __name__ == '__main__':
    main()
