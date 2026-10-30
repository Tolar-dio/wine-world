# Shared helpers for the Italy depth boundary scripts (Vitis Mundi, scripts/depth_it_*.py).
# Run scripts with: python3 -I scripts/depth_it_xxx.py   (they read untrusted data from raw/)
import json, os, sys, shutil
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *   # noqa: F401,F403  (europe_common too: slug, reproj, polys_only, label_point...)

IDS_LOG = ROOT + '/work/depth/it_ids_{tag}.json'   # per-script record of ids created / changed
UA = 'VitisMundiResearch/1.0 (+https://vitismundi.app/)'
T_4326_3035 = Transformer.from_crs(4326, 3035, always_xy=True)
T_3035_4326 = Transformer.from_crs(3035, 4326, always_xy=True)


def backup_main(iso2='it'):
    src = f'{GEO}/{iso2}.geojson'
    dst = f'{BACKUP}/{iso2}.geojson'
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.copy2(src, dst)
        print('  backup ->', dst)


def write_main(iso2, replace=None, add=None, drop_ids=(), cap=6_000_000, ndp=4):
    """Edit site/data/geo/{iso2}.geojson in place.
    replace: {id: (props_update_dict, shapely_geom_4326)}: keeps the feature's other properties (including
             integration keys), updates the given keys and the geometry.
    add:     list of new feature dicts (SPEC keys + '_g'); a feature with the same id is replaced.
    drop_ids: ids to remove."""
    backup_main(iso2)
    path = f'{GEO}/{iso2}.geojson'
    fc = json.load(open(path))
    replace = replace or {}
    add = add or []
    add_ids = {f['id'] for f in add}
    out = []
    seen = set()
    for f in fc['features']:
        p = f['properties']
        fid = p['id']
        if fid in drop_ids or fid in add_ids:
            continue
        if fid in replace:
            upd, g = replace[fid]
            np_ = dict(p)
            np_.update(upd)
            nf = feature_json(dict(np_, _g=g), ndp)
            # feature_json only keeps PROP_ORDER keys: put back the others (ctx, integration keys...)
            for k, v in np_.items():
                if k not in nf['properties']:
                    nf['properties'][k] = v
            f = nf
        seen.add(fid)
        out.append(json.dumps(f, ensure_ascii=False, separators=(',', ':')))
    for ft in add:
        if ft['id'] in seen:
            raise ValueError('duplicate id ' + ft['id'])
        seen.add(ft['id'])
        out.append(json.dumps(feature_json(ft, ndp), ensure_ascii=False, separators=(',', ':')))
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as fh:
        fh.write('{"type":"FeatureCollection","features":[\n' + ',\n'.join(out) + '\n]}\n')
    size = os.path.getsize(tmp)
    if size > cap:
        os.remove(tmp)
        raise ValueError(f'{path} would be {size/1e6:.2f} MB > cap')
    os.replace(tmp, path)
    print(f'  {path}: {len(out)} features ({len(replace)} replaced, {len(add)} added), {size/1e6:.2f} MB')
    return size


def record_ids(tag, feats, action='created'):
    """Keep a per-script list of ids touched, merged at the end into work/depth-italy-ids.json."""
    path = IDS_LOG.format(tag=tag)
    rows = [{'id': f['id'], 'name': f['name'], 'parent': f.get('parent'), 'subcat': f.get('subcat'),
             'cat': f.get('cat'), 'file': f.get('_file', 'it_fine.geojson'), 'action': f.get('_action', action)}
            for f in feats]
    json.dump(rows, open(path, 'w'), ensure_ascii=False, indent=0)
    print(f'  ids -> {path} ({len(rows)})')


def comuni_overlap(g3003, com_gdf, name_field='NOME', min_km2=0.3, whole=0.97):
    """[(Comune, 'whole'|'part')] for a geometry in the comuni CRS."""
    out = []
    for r in com_gdf.itertuples():
        cg = r.geometry
        if not cg.intersects(g3003):
            continue
        a = cg.intersection(g3003).area
        if a < min_km2 * 1e6:
            continue
        out.append((getattr(r, name_field), 'whole' if a / cg.area >= whole else 'part', a))
    out.sort(key=lambda x: -x[2])
    return [(n, w) for n, w, _ in out]


IT_SMALL = {'di', 'del', 'della', 'dei', 'delle', 'degli', 'd', 'in', 'e', 'al', 'sul', 'sull', 'a', 'da', 'val', 'san'}


def title_it(s):
    """'CASTELFRANCO PIANDISCO'' -> 'Castelfranco Piandiscò' style title case for Italian place names."""
    s = s.strip().lower()
    fixes = {"piandisco'": 'Piandiscò', "san torpe'": 'San Torpè'}
    for k, v in fixes.items():
        if s == k or s.endswith(' ' + k):
            s = s[:-len(k)] + v.lower()
    words = []
    for i, w in enumerate(s.split(' ')):
        if '\'' in w and not w.endswith('\''):
            a, b = w.split('\'', 1)
            w = (a if a in ('d', 'l', 'dell', 'sull', 'nell', 'all') and i else a.capitalize()) + '\'' + b.capitalize()
        elif w in IT_SMALL and i and w not in ('san', 'val'):
            pass
        else:
            w = w[:1].upper() + w[1:]
        words.append(w)
    out = ' '.join(words)
    return out.replace('Piandiscò', 'Piandiscò').replace("Piandisco'", 'Piandiscò')


def kml_placemarks(path_or_text):
    """Regex KML reader (no XML parser on untrusted input): [(attrs dict, shapely (Multi)Polygon in 4326)].
    Handles Polygon/MultiGeometry with outer and inner rings; ignores z."""
    import re as _re
    from shapely.geometry import Polygon as _P, MultiPolygon as _MP
    t = path_or_text if '<' in path_or_text[:200] else open(path_or_text, encoding='utf-8', errors='replace').read()
    out = []
    for pm in t.split('<Placemark')[1:]:
        pm = pm.split('</Placemark>')[0]
        attrs = {k: v.replace('\xa0', ' ').strip() for k, v in _re.findall(r'<SimpleData name="([^"]*)">([^<]*)</SimpleData>', pm)}
        nm = _re.search(r'<name>([^<]*)</name>', pm)
        if nm:
            attrs.setdefault('_name', nm.group(1).strip())
        polys = []
        for pg in _re.findall(r'<Polygon[^>]*>(.*?)</Polygon>', pm, _re.S):
            def ring(s):
                pts = []
                for tok in s.split():
                    c = tok.split(',')
                    if len(c) >= 2:
                        pts.append((float(c[0]), float(c[1])))
                return pts
            ob = _re.search(r'<outerBoundaryIs>.*?<coordinates>(.*?)</coordinates>', pg, _re.S)
            if not ob:
                continue
            holes = [ring(h) for h in _re.findall(r'<innerBoundaryIs>.*?<coordinates>(.*?)</coordinates>', pg, _re.S)]
            p = _P(ring(ob.group(1)), [h for h in holes if len(h) >= 4])
            polys.append(shapely.make_valid(p))
        if polys:
            g = polys_only(shapely.make_valid(shapely.union_all(polys)))
            out.append((attrs, g))
    return out
