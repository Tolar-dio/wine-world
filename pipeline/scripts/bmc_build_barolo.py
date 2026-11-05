# Barolo MGA cadastre job: build the 170 Barolo MGA polygons from the parcels of the 2010 annex (parsed by
# bmc_parse_barolo.py, matched by bmc_fetch.py) the same way scripts/itb_t04_build.py built Roero / Dogliani:
# union of the listed parcels, closed by 8 m over road and ditch gaps without spilling onto a neighbour, holes
# under 0.2 ha removed, simplified at 8 m, 5 decimals. Parcels listed as "parte" (partly inside) are kept only
# where no other MGA lists them as whole parcels. bq official if >= 90% of the listed parcels were found.
# Usage: python3 -I scripts/bmc_build_barolo.py   -> work/barolo-mga/new_barolo.json (features + report)
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_write as Wr
import shapely
from shapely.geometry import shape, mapping
from europe_common import label_point, slug

W = '/home/claude/winesite/work/barolo-mga'
NAME_FIX = {"Altenasso o Garblet Sue' o Garbelletto Superiore": 'Altenasso',
            'Mariondino o Monriondino o Rocche Moriondino': 'Mariondino'}
RULE = ('Barolo DOCG disciplinare, art. 1.2 and art. 8, "Allegato delle Menzioni geografiche aggiuntive" '
        '(Comune / Foglio / Particelle), as published in GU serie generale n. 31 of 8 Feb 2010, pp. 54-93')


def main():
    idx = {e['id']: e for e in json.load(open(C.GEO + '/_index.json'))}
    ids = {i for i, e in idx.items() if e.get('parent') == 'it-barolo' and e.get('subcat') == 'MGA'}
    G = json.load(open(f'{W}/mga_barolo_geom.json'))
    groups, unmatched = {}, []
    for r in G['rows']:
        uid = 'it-barolo-' + slug(NAME_FIX.get(r['mga'], r['mga']))
        if uid not in ids:
            unmatched.append((r['mga'], r['comune'], r['foglio'])); continue
        groups.setdefault(uid, []).append(r)
    full, part = {}, {}
    for uid, rs in groups.items():
        gf = [shape(r['geom']) for r in rs if r['geom']]
        gp = [shape(r['geom_parte']) for r in rs if r.get('geom_parte')]
        full[uid] = C.to3035(shapely.make_valid(shapely.union_all(gf))) if gf else shapely.Polygon()
        part[uid] = C.to3035(shapely.make_valid(shapely.union_all(gp))) if gp else shapely.Polygon()
    keys = sorted(groups)
    allg = {u: full[u].union(part[u]) for u in keys}
    tree = shapely.STRtree([allg[u] for u in keys])
    feats, report = [], {}
    for uid in keys:
        near = [keys[j] for j in tree.query(allg[uid].buffer(20)) if keys[j] != uid]
        ofull = shapely.union_all([full[u] for u in near]) if near else shapely.Polygon()
        oall = shapely.union_all([allg[u] for u in near]) if near else shapely.Polygon()
        own = full[uid].union(part[uid].difference(ofull.buffer(0.5)))
        if own.is_empty:
            unmatched.append((uid, 'no parcels found', '')); continue
        g3 = own.buffer(8, join_style=2).buffer(-8, join_style=2)
        g3 = g3.difference(oall.difference(own))
        g4, area = Wr.finish(g3, 8, min_hole=2000, min_part=300)
        rs = groups[uid]
        n = sum(r['n'] for r in rs); f = sum(r['found'] for r in rs); npart = sum(r.get('n_parte', 0) for r in rs)
        share = f / n if n else 0
        com = sorted({r['comune'] for r in rs})
        p = {'id': uid, 'src': 'aecad', 'bq': 'official' if share >= 0.9 else 'approx', 'area': round(area, 2),
             'parent': 'it-barolo', 'lp': label_point(g4), 'bbox': [round(x, 4) for x in g4.bounds],
             'reg': {'docg': 'Barolo', 'rule': RULE, 'comuni': com,
                     'fogli': sorted({f"{r['comune']} {r['foglio']}{r.get('allegato') or ''}" for r in rs}),
                     'parcels_listed': n, 'parcels_matched': f, 'parcels_partial': npart,
                     'geom_note': ('Union of the listed parcels in the current cadastral map (Agenzia delle Entrate INSPIRE WFS), '
                                   'gaps under roads and ditches closed by 8 m; parcels listed as only partly inside ("parte") '
                                   'are drawn whole unless a neighbouring MGA lists them whole; parcels renumbered since 2010 are missing.')}}
        feats.append({'type': 'Feature', 'properties': p, 'geometry': Wr.r5(g4)})
        report[uid] = {'area_km2': round(area, 4), 'found': f, 'listed': n, 'share': round(share, 3), 'parte': npart,
                       'missing': [f"{r['comune']} {r['foglio']}: {' '.join(r['lost'][:30])}" for r in rs if r['lost']]}
    missing = sorted(ids - {f['properties']['id'] for f in feats})
    # overlaps between MGAs (from shared "parte" parcels or parcels listed twice)
    ov = []
    gs = [(f['properties']['id'], C.to3035(shape(f['geometry']))) for f in feats]
    t2 = shapely.STRtree([g for _, g in gs])
    for i, (a, ga) in enumerate(gs):
        for j in t2.query(ga):
            if j <= i:
                continue
            b, gb = gs[j]
            x = ga.intersection(gb).area
            sm = min(ga.area, gb.area)
            if sm and x / sm > 0.02:
                ov.append((a, b, round(100 * x / sm, 1), round(x / 1e4, 2)))
    tot_n = sum(v['listed'] for v in report.values()); tot_f = sum(v['found'] for v in report.values())
    summary = {'drawn': len(feats), 'official': sum(1 for f in feats if f['properties']['bq'] == 'official'),
               'approx': sum(1 for f in feats if f['properties']['bq'] == 'approx'), 'parcels_listed': tot_n,
               'parcels_matched': tot_f, 'ids_without_polygon': missing, 'unmatched_rows': unmatched,
               'missing_fogli': G['missing_fogli'], 'failed_tiles': len(G['failed_tiles']), 'overlaps_gt2pct': ov}
    json.dump({'features': feats, 'report': report, 'summary': summary}, open(f'{W}/new_barolo.json', 'w'), ensure_ascii=False)
    print(json.dumps(summary, ensure_ascii=False, indent=0)[:4000])


if __name__ == '__main__':
    main()
