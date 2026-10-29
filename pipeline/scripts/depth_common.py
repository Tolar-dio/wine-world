# Shared helpers for the depth-phase boundary scripts (Vitis Mundi).
# Run scripts with: python3 -I scripts/depth_xxx.py  (they read untrusted data from raw/)
import json, os, shutil, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *   # slug, reproj, polys_only, label_point, geom_json, area_km2_4326, simplify_with_mapshaper...

DWORK = ROOT + '/work/depth'
BACKUP = ROOT + '/work/fine_backup'
os.makedirs(DWORK, exist_ok=True)
os.makedirs(BACKUP, exist_ok=True)

INTEGRATION_KEYS = ('style', 'prof', 'lvl', 'clim')


def all_ids():
    """Every id already used in the index and in every geo file (main and fine)."""
    ids = set()
    try:
        ids |= {x['id'] for x in json.load(open(GEO + '/_index.json'))}
    except Exception:
        pass
    for fn in os.listdir(GEO):
        if fn.endswith('.geojson') and not fn.startswith('_'):
            with open(GEO + '/' + fn) as f:
                for ft in json.load(f)['features']:
                    ids.add(ft['properties']['id'])
    return ids


def backup_once(iso2):
    src = f'{GEO}/{iso2}_fine.geojson'
    dst = f'{BACKUP}/{iso2}_fine.geojson'
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.copy2(src, dst)
        print('  backup ->', dst)


def feature_json(ft, ndp=4):
    props = {}
    for key in PROP_ORDER:
        v = ft.get(key)
        if v is None and key != 'parent':
            continue
        if isinstance(v, (list, dict)) and not v and key not in ('lp', 'bbox'):
            continue
        props[key] = v
    g = ft['_g']
    def r(cs):
        return [[round(x, ndp), round(y, ndp)] for x, y in cs]
    if g.geom_type == 'Polygon':
        geom = {'type': 'Polygon', 'coordinates': [r(g.exterior.coords)] + [r(i.coords) for i in g.interiors]}
    else:
        geom = {'type': 'MultiPolygon', 'coordinates': [[r(p.exterior.coords)] + [r(i.coords) for i in p.interiors]
                                                        for p in g.geoms]}
    return {'type': 'Feature', 'properties': props, 'geometry': geom}


def append_fine(iso2, new_feats, replace_src=None, ndp=4, cap=8_000_000):
    """Append features to site/data/geo/{iso2}_fine.geojson (creating it if needed).
    Existing features are kept untouched (including integration keys), except those whose
    properties.src == replace_src (lets a script be re-run idempotently)."""
    backup_once(iso2)
    path = f'{GEO}/{iso2}_fine.geojson'
    old = []
    if os.path.exists(path):
        old = json.load(open(path))['features']
    if replace_src:
        rs = set([replace_src] if isinstance(replace_src, str) else replace_src)
        old = [f for f in old if f['properties'].get('src') not in rs]
    taken = {f['properties']['id'] for f in old}
    for ft in new_feats:
        if ft['id'] in taken:
            raise ValueError('duplicate id ' + ft['id'])
        taken.add(ft['id'])
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write('{"type":"FeatureCollection","features":[\n')
        allf = [json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in old] + \
               [json.dumps(feature_json(x, ndp), ensure_ascii=False, separators=(',', ':')) for x in new_feats]
        f.write(',\n'.join(allf))
        f.write('\n]}\n')
    size = os.path.getsize(tmp)
    if size > cap:
        os.remove(tmp)
        raise ValueError(f'{path} would be {size/1e6:.2f} MB > cap')
    os.replace(tmp, path)
    print(f'  {path}: {len(old)} kept + {len(new_feats)} new = {len(old)+len(new_feats)} features, {size/1e6:.2f} MB')
    return size


def finish_feats(feats, tag, interval, tier_fn=None, ndp=4):
    """Simplify (mapshaper, metres), then set lp/bbox. feats need id, area, _g (4326)."""
    ids = [f['id'] for f in feats]
    simp = simplify_with_mapshaper([f['_g'] for f in feats], ids, tag, interval,
                                   areas=[f['area'] for f in feats], tiered=tier_fn is not None, tier_fn=tier_fn)
    out = []
    for f in feats:
        g = simp.get(f['id'])
        if g is None or g.is_empty:
            g = polys_only(shapely.set_precision(shapely.make_valid(f['_g']), 10 ** -ndp))
        if g is None or g.is_empty:
            print('  WARN drop empty', f['id'])
            continue
        if ndp != 4:
            g = polys_only(shapely.make_valid(shapely.set_precision(g, 10 ** -ndp)))
        nf = dict(f)
        nf['_g'] = g
        b = g.bounds
        nf['bbox'] = [round(b[0], 4), round(b[1], 4), round(b[2], 4), round(b[3], 4)]
        nf['lp'] = label_point(g)
        out.append(nf)
    return out
