# Sanity check for the EU PDO dataset: compare each PDO polygon with the union of the municipalities
# named in its own Municip_nam list (matched by normalised name to GISCO LAU 2021, 1:1M).
# Flags PDOs whose polygon is far from / barely overlaps its named municipalities.
# Output: work/europe/eupdo_check.csv  Usage: python3 -I scripts/europe_eupdo_check.py
import sys, re
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import *
import pandas as pd, geopandas as gpd, pyogrio

LAU = RAW + '/gisco_lau/LAU_RG_01M_2021_3035.gpkg'


def norm(s):
    s = unidecode(str(s)).lower()
    s = re.sub(r'\(.*?\)', ' ', s)
    s = re.sub(r"[^a-z0-9]+", ' ', s).strip()
    return s


def variants(name):
    n = norm(name)
    out = {n}
    # "Castellón de la Plana/Castelló de la Plana" or bilingual names
    for p in re.split(r'[/,;]| - ', str(name)):
        if p.strip():
            out.add(norm(p))
    # Spanish/Italian articles moved: "Barco de Valdeorras, O" -> "o barco de valdeorras"
    m = re.match(r'(.*), *(el|la|los|las|o|a|os|as|l|il|lo|le|les)$', str(name).strip(), re.I)
    if m:
        out.add(norm(m.group(2) + ' ' + m.group(1)))
    return {v for v in out if v}


if __name__ == '__main__' and '--extra' not in sys.argv:
    d = pd.read_csv(RAW + '/eupdo/PDO_EU_id.csv', encoding='utf-8-sig', dtype=str)
    g = gpd.read_file(RAW + '/eupdo/EU_PDO.gpkg').merge(d[['PDOid', 'Country', 'PDOnam', 'Municip_nam']], on='PDOid')
    rows = []
    for cc in sorted(g.Country.unique()):
        lau = pyogrio.read_dataframe(LAU, where=f"CNTR_CODE = '{'EL' if cc == 'GR' else 'UK' if cc == 'GB' else cc}'")
        if len(lau) == 0:
            continue
        idx = {}
        for i, n in enumerate(lau.LAU_NAME):
            for v in variants(n):
                idx.setdefault(v, []).append(i)
        lau_geoms = lau.geometry.values
        for _, r in g[g.Country == cc].iterrows():
            names = [x for x in str(r.Municip_nam).split('/') if x.strip()]
            hit = set()
            matched = 0
            for n in names:
                ii = idx.get(norm(n))
                if ii:
                    matched += 1
                    hit.update(ii)
            pg = r.geometry
            if not hit:
                rows.append({'PDOid': r.PDOid, 'cc': cc, 'name': r.PDOnam, 'n_mun': len(names), 'matched': 0,
                             'overlap_pdo': None, 'overlap_mun': None, 'dist_km': None})
                continue
            mu = shapely.union_all(lau_geoms[list(hit)])
            inter = shapely.intersection(shapely.make_valid(pg), shapely.make_valid(mu)).area
            rows.append({'PDOid': r.PDOid, 'cc': cc, 'name': r.PDOnam, 'n_mun': len(names), 'matched': matched,
                         'overlap_pdo': round(inter / pg.area, 3) if pg.area else None,
                         'overlap_mun': round(inter / mu.area, 3) if mu.area else None,
                         'dist_km': round(pg.centroid.distance(mu.centroid) / 1000, 1)})
        print(cc, 'done', flush=True)
    out = pd.DataFrame(rows)
    out.to_csv(WORK + '/eupdo_check.csv', index=False)
    good = out[(out.matched >= out.n_mun * 0.5)]
    bad = good[(good.overlap_pdo < 0.5) | (good.dist_km > 25)]
    print('checked', len(out), 'with >=50% names matched', len(good), 'suspicious', len(bad))
    print(bad.sort_values('overlap_pdo').to_string(max_colwidth=40))


def extra_checks():
    """(a) PDO pairs with near-identical geometry but unrelated names; (b) PDO named after a LAU but far from it."""
    d = pd.read_csv(RAW + '/eupdo/PDO_EU_id.csv', encoding='utf-8-sig', dtype=str)
    g = gpd.read_file(RAW + '/eupdo/EU_PDO.gpkg').merge(d[['PDOid', 'Country', 'PDOnam', 'Municip_nam']], on='PDOid')
    g['a'] = g.area
    tree = shapely.STRtree(g.geometry.values)
    pairs = []
    for i, geom in enumerate(g.geometry.values):
        for j in tree.query(geom, predicate='intersects'):
            if j <= i or g.Country.iat[i] != g.Country.iat[j] or g.PDOnam.iat[i] == g.PDOnam.iat[j]:
                continue
            ai, aj = g.a.iat[i], g.a.iat[j]
            if abs(ai - aj) / max(ai, aj) < 0.01 and geom.intersection(g.geometry.iat[j]).area > 0.99 * max(ai, aj):
                pairs.append((g.Country.iat[i], g.PDOid.iat[i], g.PDOnam.iat[i][:30], g.PDOid.iat[j], g.PDOnam.iat[j][:30], round(ai / 1e6, 1)))
    pd.DataFrame(pairs, columns=['cc', 'id1', 'name1', 'id2', 'name2', 'km2']).to_csv(WORK + '/eupdo_identical_pairs.csv', index=False)
    print('identical-geometry pairs:', len(pairs))
    far = []
    for cc in sorted(g.Country.unique()):
        lau = pyogrio.read_dataframe(LAU, where=f"CNTR_CODE = '{'EL' if cc == 'GR' else 'UK' if cc == 'GB' else cc}'")
        if not len(lau):
            continue
        idx = {}
        for i, n in enumerate(lau.LAU_NAME):
            for v in variants(n):
                idx.setdefault(v, []).append(i)
        for _, r in g[g.Country == cc].iterrows():
            for nm in str(r.PDOnam).split(' / '):
                ii = idx.get(norm(nm))
                if not ii:
                    continue
                dist = min(r.geometry.distance(lau.geometry.iat[k]) for k in ii) / 1000
                if dist > 5:
                    far.append((cc, r.PDOid, r.PDOnam[:40], nm, round(dist, 1)))
                break
    print('PDOs named after a municipality but >5 km from it:', len(far))
    for x in far:
        print('  ', x)


if __name__ == '__main__' and '--extra' in sys.argv:
    extra_checks()
