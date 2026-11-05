# Write T03 / T04 / T05 results into the site data (it_fine.geojson, _extra_points.geojson, _index.json,
# content/it_fine.json). Backups of all four are in work/fine_backup/*.2026-11-05.*
# Usage: python3 -I scripts/itb_write.py t03|t04|t05 [--dry]
import json, os, re, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, Point
from europe_common import label_point, slug

GEO = C.GEO
CONTENT = C.ROOT + '/site/data/content/it_fine.json'
DRY = '--dry' in sys.argv


def load():
    return (json.load(open(GEO + '/it_fine.geojson')), json.load(open(GEO + '/_extra_points.geojson')),
            json.load(open(GEO + '/_index.json')), json.load(open(CONTENT)))


def r5(g):
    def r(cs):
        out = []
        for x, y in cs:
            p = [round(x, 5), round(y, 5)]
            if not out or out[-1] != p:
                out.append(p)
        return out
    if g.geom_type == 'Polygon':
        return {'type': 'Polygon', 'coordinates': [r(g.exterior.coords)] + [r(i.coords) for i in g.interiors]}
    return {'type': 'MultiPolygon', 'coordinates': [[r(p.exterior.coords)] + [r(i.coords) for i in p.interiors] for p in g.geoms]}


def finish(g3035, tol, opening=0, close=0, min_hole=5000, min_part=5000):
    g = shapely.make_valid(g3035)
    if close:
        g = g.buffer(close, join_style=2).buffer(-close, join_style=2)
    if opening:
        o = g.buffer(-opening, join_style=2).buffer(opening, join_style=2)
        if not o.is_empty and o.area > 0.8 * g.area:
            g = o
    g = C.clean(g, min_part=min_part, min_hole=min_hole)
    g = g.simplify(tol, preserve_topology=True)
    g = C.clean(g, min_part=min_part, min_hole=min_hole)
    g4 = C.to4326(g)
    g4 = shapely.make_valid(shapely.set_precision(g4, 1e-5))
    ps = [p for p in getattr(g4, 'geoms', [g4]) if p.geom_type == 'Polygon']
    if not ps:
        for x in getattr(g4, 'geoms', []):
            ps += [p for p in getattr(x, 'geoms', [x]) if p.geom_type == 'Polygon']
    g4 = MultiPolygon(ps) if len(ps) > 1 else ps[0]
    return g4, round(g.area / 1e6, 2)


def comuni_of(g3035, min_km2=0.05):
    com = C.comuni()
    sub = com[com.intersects(g3035)]
    out = []
    for _, r in sub.iterrows():
        a = r.geometry.intersection(g3035).area
        if a / 1e6 >= min_km2:
            out.append((r.COMUNE, a / r.geometry.area))
    out.sort(key=lambda x: -x[1])
    return [n + ('' if f > 0.97 else ' (part)') for n, f in out]


def apply(new_feats, new_points=(), drop_points=()):
    """new_feats: list of (props, geom4326) polygons to add to it_fine (replacing same id if present);
    new_points: list of (props, lon, lat, index_entry) for _extra_points; drop_points: ids to remove from _extra_points."""
    fine, ex, idx, cont = load()
    byid = {e['id']: e for e in idx}
    fine_ids = [f['properties']['id'] for f in fine['features']]
    add_ids = {p['id'] for p, _ in new_feats}
    # ids unique across all geo files
    allids = set()
    for fn in os.listdir(GEO):
        if fn.endswith('.geojson') and not fn.startswith('_') and fn != 'it_fine.geojson':
            for f in json.load(open(GEO + '/' + fn))['features']:
                allids.add(f['properties']['id'])
    clash = add_ids & allids
    if clash:
        raise SystemExit('id clash with other geo files: ' + str(sorted(clash)))
    keep = [f for f in fine['features'] if f['properties']['id'] not in add_ids]
    replaced = len(fine['features']) - len(keep)
    order = ['id', 'name', 'ctx', 'alt', 'country', 'cat', 'subcat', 'src', 'bq', 'area', 'parent', 'lp', 'bbox',
             'varieties', 'styles', 'reg', 'style', 'prof', 'lvl']
    feats_out = []
    for p, g in new_feats:
        props = {k: p[k] for k in order if k in p and p[k] is not None or k == 'parent'}
        feats_out.append({'type': 'Feature', 'properties': props, 'geometry': r5(g)})
        e = byid.get(p['id'], {})
        ne = {'id': p['id'], 'name': p['name'], 'alt': p.get('alt', []), 'country': 'it', 'cat': p['cat'],
              'subcat': p['subcat'], 'area': p['area'], 'parent': p['parent'], 'lp': p['lp'], 'bbox': p['bbox'],
              'bq': p['bq'], 'style': p['style'], 'prof': p['prof'], 'lvl': p['lvl'], 'ctx': p.get('ctx'), 'fine': 1}
        if p['id'] in byid:
            byid[p['id']].clear(); byid[p['id']].update(ne)
        else:
            idx.append(ne); byid[p['id']] = ne
        pr = cont['fine_profiles'].get(p['id'])
        if pr is not None:
            pr['map'] = 'poly'; pr['lp'] = p['lp']; pr['fine'] = 1; pr['parent'] = p['parent']
            for k in ('lat', 'lon', 'coord_quality'):
                pr.pop(k, None)
    fine['features'] = keep + feats_out
    # points
    drop = set(drop_points) | add_ids
    exf = [f for f in ex['features'] if f['properties']['id'] not in drop]
    removed_pts = len(ex['features']) - len(exf)
    pt_ids = set()
    for props, lon, lat, ie in new_points:
        pt_ids.add(props['id'])
        exf = [f for f in exf if f['properties']['id'] != props['id']]
        exf.append({'type': 'Feature', 'properties': props, 'geometry': {'type': 'Point', 'coordinates': [lon, lat]}})
        if props['id'] in byid:
            byid[props['id']].clear(); byid[props['id']].update(ie)
        else:
            idx.append(ie); byid[props['id']] = ie
        pr = cont['fine_profiles'].get(props['id'])
        if pr is not None:
            pr.update({'lat': lat, 'lon': lon, 'coord_quality': 'approx', 'map': 'point', 'lp': [lon, lat], 'fine': 1})
    ex['features'] = exf
    # integrity
    ids = [e['id'] for e in idx]
    assert len(ids) == len(set(ids)), 'duplicate ids in _index'
    fids = [f['properties']['id'] for f in fine['features']]
    assert len(fids) == len(set(fids))
    assert not (set(fids) & {f['properties']['id'] for f in ex['features']}), 'id both polygon and point'
    print(f'it_fine: {len(keep)} kept ({replaced} replaced) + {len(feats_out)} written = {len(fine["features"])}; '
          f'extra points: -{removed_pts} +{len(new_points)}; index {len(idx)}')
    if DRY:
        return
    # write in the existing layouts: it_fine one feature per line, others minified
    with open(GEO + '/it_fine.geojson.tmp', 'w', encoding='utf-8') as f:
        f.write('{"type":"FeatureCollection","features":[' + ',\n'.join(
            json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in fine['features']) + ']}')
    sz = os.path.getsize(GEO + '/it_fine.geojson.tmp')
    assert sz < 8_000_000, sz
    os.replace(GEO + '/it_fine.geojson.tmp', GEO + '/it_fine.geojson')
    for path, obj in ((GEO + '/_extra_points.geojson', ex), (GEO + '/_index.json', idx), (CONTENT, cont)):
        raw = open(path).read(200)
        compact = '\n' not in raw.strip()[:150] and ', ' not in raw[:150]
        with open(path + '.tmp', 'w', encoding='utf-8') as f:
            if compact:
                json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))
            else:
                json.dump(obj, f, ensure_ascii=False)
        os.replace(path + '.tmp', path)
    print('written; it_fine', round(sz / 1e6, 2), 'MB')
