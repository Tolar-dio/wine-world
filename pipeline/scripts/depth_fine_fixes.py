# Fixes to existing fine files found by the depth profile pass (work/followups.md item 10).
#  a. de_fine: restore the Scharzhofberg (Weinbergsrolle Nr 460275, filed as "Einzellagenfrei in GL Scharzberg",
#     28.1 ha, Wiltingen) as id de-wiltingen-scharzhofberg, vectorised from the same LGB-RLP / LWK RLP 10 m renders.
#  b. de_fine: label adjective forms (-ingen > -inger, -hausen > -häuser, -weiler/-weyher/Ediger/Eller unchanged,
#     Mayschoß > Mayschosser, Traisen > Traiser, Rhodt unter Rietburg > Rhodter...); ids kept, old forms moved to alt.
#  c. at_fine: Burgenland Subried names ("Ried Riedname: X | Subriedname: Y") > "Ried X · Y"; Lower Austrian
#     Subrieden ("Ried Heiligenstein Heiligenstein-Steinwand", alt = parent's alt) > "Ried Heiligenstein · Steinwand".
#  d. it_fine: drop the four "Tramin-" UGA duplicates (identical outlines to Söll, Rungg, Plon, St. Jacob); the
#     long forms go to alt of the kept short-name features.
#  e. at_fine: Steiner Pfaffenberg parent -> at-kremstal (75% inside the Kremstal commune outline; 25% overlaps the
#     Wachau outline).
# Integration keys (style, prof, lvl, clim) of untouched features are preserved; files are rewritten in place.
# Usage: python3 -I scripts/depth_fine_fixes.py
import sys, glob, collections
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import rasterio.features
from rasterio.transform import from_origin
import pyogrio

T_25832_4326 = Transformer.from_crs(25832, 4326, always_xy=True)


def save(path, feats):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write('{"type":"FeatureCollection","features":[\n')
        f.write(',\n'.join(json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in feats))
        f.write('\n]}\n')
    os.replace(tmp, path)
    print('  wrote', path, len(feats), f'{os.path.getsize(path)/1e6:.2f} MB')


# ---------------- German adjectives ----------------
SPECIAL = {'St.Aldegund': 'St. Aldegunder', 'Bad Kreuznach': 'Kreuznacher', 'Bad Dürkheim': 'Dürkheimer',
           'Bad Münster a. Stein': 'Münsterer', 'Bad Neuenahr': 'Neuenahrer', 'Forst an der Weinstr.': 'Forster',
           'Ürzig': 'Ürziger', 'ürzig': 'Ürziger', 'Bingen': 'Binger', 'Linz a. Rhein': 'Linzer',
           'Mayschoß': 'Mayschosser', 'Traisen': 'Traiser', 'Ediger': 'Ediger', 'Eller': 'Eller',
           'St.Goarshausen': 'St. Goarshäuser', 'Klingen': 'Klingener', 'Ringen': 'Ringener'}


def adj_old(v):
    """The adjective rule used by europe_de_fine.py (to recognise the old forms)."""
    old_fix = {'St.Aldegund': 'St. Aldegunder', 'Bad Kreuznach': 'Kreuznacher', 'Bad Dürkheim': 'Dürkheimer',
               'Bad Münster a. Stein': 'Münsterer', 'Bad Neuenahr': 'Neuenahrer', 'Forst an der Weinstr.': 'Forster',
               'Ürzig': 'Ürziger', 'ürzig': 'Ürziger', 'Bingen': 'Binger', 'Linz a. Rhein': 'Linzer'}
    if v in old_fix:
        return old_fix[v]
    v = v[:1].upper() + v[1:]
    base = re.split(r' (?:a\.|am|an der|bei|i\.|im|ob der|in der) ', v)[0]
    return base + ('r' if base.endswith('e') else 'er')


def adj_new(v):
    if v in SPECIAL:
        return SPECIAL[v]
    v = v[:1].upper() + v[1:]
    base = re.split(r' (?:a\.|am|an der|bei|i\.|im|ob der|in der|unter) ', v)[0]
    if base.endswith('ingen'):
        return base[:-1] + 'r'
    if base.endswith('hausen'):
        return base[:-6] + 'häuser'
    if base.endswith('weiler') or base.endswith('weyher') or base.endswith('weyer'):
        return base
    return base + ('r' if base.endswith('e') else 'er')


def fix_de():
    path = GEO + '/de_fine.geojson'
    fc = json.load(open(path))
    attrs = json.load(open(RAW + '/de_rlp_lagen/lagen_attributes.json'))
    A = {f['properties']['Weinlage - Nr']: f['properties'] for f in attrs['features']}
    changed = 0
    for f in fc['features']:
        p = f['properties']
        if p.get('src') != 'lwkrlp':
            continue
        a = A.get(p['reg'].get('lage_nr'))
        if not a:
            continue
        lage = a['Weinlage - Name'].strip()
        gmk = [x.strip() for x in str(a.get('Gemarkung(en)', '')).split(',') if x.strip() and x.strip() != '-']
        olds = [adj_old(v) + ' ' + lage for v in gmk]
        news = [adj_new(v) + ' ' + lage for v in gmk]
        if olds == news:
            continue
        changed += 1
        alt = list(p.get('alt') or [])
        if len(gmk) == 1:
            if p['name'] == olds[0]:
                p['name'] = news[0]
            alt = [x for x in alt if x != news[0]]
            if olds[0] not in alt:
                alt.append(olds[0])
        else:
            alt = [news[olds.index(x)] if x in olds else x for x in alt]
            for o, n in zip(olds, news):
                if o != n and o not in alt:
                    alt.append(o)
        p['alt'] = [x for x in alt if not re.search(r'\d', x)]
    print('  de_fine adjective fixes:', changed)
    # ---- a. Scharzhofberg
    fc['features'] = [f for f in fc['features'] if f['properties']['id'] != 'de-wiltingen-scharzhofberg']
    nr = '460275'
    polys = []
    for t in sorted(glob.glob(RAW + '/de_rlp_lagen/tiles/wl_*.npz')):
        d = np.load(t)
        ids = [str(x) for x in d['ids']]
        if nr not in ids:
            continue
        k = ids.index(nr)
        lab = d['lab'].astype(np.int32)
        x0, y0, x1, y1 = d['bbox']
        res = (x1 - x0) / lab.shape[1]
        tr = from_origin(x0, y1, res, res)
        for geo, v in rasterio.features.shapes(lab, mask=lab == k, transform=tr, connectivity=4):
            polys.append(shapely.geometry.shape(geo))
    g = shapely.make_valid(shapely.simplify(shapely.union_all(polys), 0.5))
    g = clean_projected(g, min_hole_km2=0.0005, min_part_km2=0.0003)
    g = polys_only(shapely.make_valid(shapely.simplify(g, 6.0)))
    print(f'  Scharzhofberg: {len(polys)} raster pieces, {g.area/1e4:.1f} ha')
    g4 = polys_only(shapely.make_valid(reproj(g, T_25832_4326)))
    a = A[nr]
    ft = {'id': 'de-wiltingen-scharzhofberg', 'name': 'Scharzhofberg', 'alt': ['Scharzhofberger', 'Wiltinger Scharzhofberg'],
          'country': 'de', 'cat': 'Einzellage', 'subcat': 'Einzellage', 'src': 'lwkrlp', 'bq': 'official',
          'area': round(g.area / 1e6, 2), 'parent': 'de-mosel',
          'reg': {'lage_nr': nr, 'grosslage': a.get('Großlage'), 'bereich': a.get('Bereich'), 'gemeinden': 'Wiltingen',
                  'gemarkungen': 'Wiltingen', 'vine_ha': 28.1,
                  'note': 'Filed in the Weinbergsrolle as "Einzellagenfrei in GL Scharzberg" (Nr 460275): the Scharzhofberg is a legally recognised Ortsteil whose name is used on labels on its own, without the village name.'},
          '_g': g4}
    out = finish_feats([ft], 'scharzhof', 3)
    fc['features'].append(feature_json(out[0]))
    save(path, fc['features'])


# ---------------- Austria ----------------
def fix_at():
    path = GEO + '/at_fine.geojson'
    fc = json.load(open(path))
    noe = pyogrio.read_dataframe(RAW + '/at_noe_rieden/rieden.gpkg', read_geometry=False)
    subs = set()
    for r in noe.itertuples():
        if isinstance(r.WEINBAURIEDE2, str) and r.WEINBAURIEDE2 != 'keine Subriede':
            subs.add((r.WEINBAUFLUR, r.WEINBAURIEDE1, r.WEINBAURIEDE2))
    by_name = {(fl, f'Ried {ri} {su}'): (ri, su) for fl, ri, su in subs}
    nb = nn = 0
    for f in fc['features']:
        p = f['properties']
        if p.get('src') == 'bgld':
            m = re.match(r'Ried Riedname:\s*(.*?)\s*\|\s*Subriedname:\s*(.*)$', p['name'])
            if m:
                ri, su = m.group(1).strip(), m.group(2).strip()
                gem = p['reg'].get('gemeinde', '')
                old = p['name']
                p['name'] = f'Ried {ri} · {su}'
                p['alt'] = [x for x in [f'{gem} {ri} {su}'.strip(), f'Ried {ri} {su}', su] if x]
                p['reg']['ried'] = ri
                p['reg']['subried'] = su
                nb += 1
        elif p.get('src') == 'noe':
            key = (p['reg'].get('weinbauflur'), p['name'])
            if key in by_name:
                ri, su = by_name[key]
                short = su
                if su.lower().startswith(ri.lower()):
                    short = su[len(ri):].strip(' -') or su
                p['name'] = f'Ried {ri} · {short}'
                fl = p['reg'].get('weinbauflur')
                p['alt'] = [f'{fl} {ri} {short}', f'Ried {su}' if su != short else f'Ried {ri} {su}']
                p['reg']['ried'] = ri
                p['reg']['subried'] = su
                nn += 1
        if p['id'] == 'at-stein-pfaffenberg':
            p['parent'] = 'at-kremstal'
            p['reg']['note'] = ('Krems-Stein Ried; the polygon lies 75% inside the Kremstal DAC commune outline and '
                                '25% across the Wachau outline, which follow municipal lines rather than the legal DAC border.')
    print(f'  at_fine: {nb} Burgenland and {nn} Lower Austrian Subried names cleaned')
    save(path, fc['features'])


def fix_it():
    path = GEO + '/it_fine.geojson'
    fc = json.load(open(path))
    pairs = {'it-alto-adige-tramin-soll': 'it-alto-adige-soll', 'it-alto-adige-tramin-rungg': 'it-alto-adige-rungg',
             'it-alto-adige-tramin-plon': 'it-alto-adige-plon', 'it-alto-adige-tramin-st-jacob': 'it-alto-adige-st-jacob'}
    long_names = {f['properties']['id']: f['properties']['name'] for f in fc['features'] if f['properties']['id'] in pairs}
    keep = []
    for f in fc['features']:
        p = f['properties']
        if p['id'] in pairs:
            continue
        for lid, sid in pairs.items():
            if p['id'] == sid and lid in long_names:
                alt = list(p.get('alt') or [])
                if long_names[lid] not in alt:
                    alt.append(long_names[lid])
                p['alt'] = alt
                p['reg']['note'] = f'Also registered in the provincial UGA layer as "{long_names[lid]}" (identical outline).'
        keep.append(f)
    print(f'  it_fine: dropped {len(fc["features"]) - len(keep)} Tramin duplicates')
    save(path, keep)


def main():
    for iso in ('de', 'at', 'it'):
        backup_once(iso)
    fix_de()
    fix_at()
    fix_it()


if __name__ == '__main__':
    main()
