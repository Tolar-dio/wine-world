# T04: Roero and Dogliani MGA polygons from the cadastral parcels of the disciplinari annexes (Roero Allegato 2B,
# Dogliani Allegato 1B) matched to the Agenzia delle Entrate INSPIRE parcels; comune MGAs (part A) from ISTAT 2026.
# Usage: python3 -I scripts/itb_t04_build.py [--dry]
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_write as Wr
import shapely
from shapely.geometry import shape
from europe_common import label_point, slug

W = C.WORKB
idx = {e['id']: e for e in json.load(open(C.GEO + '/_index.json'))}
NAME_FIX = {  # annex table spelling -> Allegato list spelling (id)
    'roero': {'Bricco di Piobesi': 'Bricco di Piovesi', 'Pecetto': 'Precetto', 'San Siverio': 'San Silverio',
              'Madonna delle': 'Madonna delle Grazie', "S.S.Trinita'": 'S.S. Trinita', "Casa'": 'Casa',
              "Lamonta'": 'Lamonta', "Trinita'": 'Trinita', 'Santa': 'Santa Margherita', 'Serra Zoanni': 'Serra Zanni'},
    'dogliani': {},
}
COMUNI_A = {
    'roero': ["Baldissero d'Alba", 'Canale', 'Castagnito', "Corneliano d'Alba", 'Govone', 'Guarene', 'Magliano Alfieri',
              'Montà', 'Montaldo Roero', 'Monteu Roero', "Monticello d'Alba", "Piobesi d'Alba", 'Pocapaglia', 'Priocca',
              "Santa Vittoria d'Alba", 'Santo Stefano Roero', 'Sommariva Perno', "Vezza d'Alba"],
    'dogliani': ['Bastia Mondovì', 'Belvedere Langhe', 'Briaglia', 'Carrù', 'Castellino Tanaro', 'Cigliè', 'Clavesana',
                 'Dogliani', 'Farigliano', 'Igliano', 'Marsaglia', 'Monchiero', 'Mondovì', 'Murazzano', 'Niella Tanaro',
                 'Piozzo', 'Rocca Cigliè', 'Roddino', 'San Michele Mondovì', 'Somano', 'Vicoforte'],
}
RULE = {'roero': 'Roero DOCG disciplinare, art. 7 and Allegato 2 (A: comuni; B: frazioni and località delimited by the cadastral parcels of Allegato 2B)',
        'dogliani': 'Dogliani DOCG disciplinare, art. 7 and Allegato 1 (A: comuni; B: frazioni and località delimited by the cadastral parcels of Allegato 1B)'}


_IT = {f['properties']['id']: f for f in json.load(open(C.GEO + '/it.geojson'))['features']
       if f['properties']['id'] in ('it-roero', 'it-dogliani')}
PARENT = {k: C.to3035(shapely.make_valid(shape(f['geometry']))) for k, f in _IT.items()}


def resolve(k, name, comune, ids):
    if k == 'roero' and name == 'San Michele' and comune == 'Santo Stefano Roero':
        return 'it-roero-san-michele-monteu-roero'   # its parcels touch the Monteu Roero part (0 m), 3 km from Canale's
    n = NAME_FIX[k].get(name, name)
    base = f'it-{k}-{slug(n)}'
    if base in ids:
        return base
    alt = f'{base}-{slug(comune)}'
    if alt in ids:
        return alt
    return None


def main():
    feats, report = [], {}
    for k in ('dogliani', 'roero'):
        par = f'it-{k}'
        ids = {i for i in idx if i.startswith(par + '-') and idx[i].get('subcat') == 'MGA'}
        try:
            G = json.load(open(f'{W}/mga_{k}_geom.json'))
        except FileNotFoundError:
            print('no geometry file for', k); continue
        groups, unmatched = {}, []
        for r in G['rows']:
            uid = resolve(k, r['mga'], r['comune'], ids)
            if not uid:
                unmatched.append((r['mga'], r['comune'], r['foglio'])); continue
            groups.setdefault(uid, []).append(r)
        loc_ids = set()
        raw = {}
        for uid, rs in groups.items():
            gs = [shape(r['geom']) for r in rs if r['geom']]
            if gs:
                raw[uid] = C.to3035(shapely.make_valid(shapely.union_all(gs)))
        rtree = shapely.STRtree(list(raw.values())); rkeys = list(raw)
        for uid, rs in sorted(groups.items()):
            n = sum(r['n'] for r in rs); f = sum(r['found'] for r in rs)
            if uid not in raw:
                unmatched.append((uid, 'no parcels found', '')); continue
            g3 = raw[uid].buffer(8, join_style=2).buffer(-8, join_style=2)
            others = [raw[rkeys[j]] for j in rtree.query(g3) if rkeys[j] != uid]
            if others:
                g3 = g3.difference(shapely.union_all(others).difference(raw[uid]))
            g4, area = Wr.finish(g3, 8, min_hole=2000, min_part=300)
            share = f / n if n else 0
            com = sorted({r['comune'].replace('’', "'") for r in rs})
            e = idx[uid]
            p = {'id': uid, 'name': e['name'], 'ctx': e.get('ctx'), 'alt': e.get('alt', []), 'country': 'it', 'cat': 'DOCG',
                 'subcat': 'MGA', 'src': 'aecad', 'bq': 'official' if share >= 0.9 else 'approx', 'area': round(area, 2),
                 'parent': par, 'lp': label_point(g4), 'bbox': [round(x, 4) for x in g4.bounds],
                 'reg': {'docg': idx[par]['name'], 'rule': RULE[k], 'comuni': com,
                         'fogli': sorted({f"{r['comune'].replace('’', chr(39))} {r['foglio']}" for r in rs}),
                         'parcels_listed': n, 'parcels_matched': f,
                         'geom_note': 'Union of the listed parcels in the current cadastral map (Agenzia delle Entrate INSPIRE WFS), gaps under roads and ditches closed by 8 m; parcels renumbered since the annex was written are missing.'},
                 'style': e.get('style', 'red'), 'prof': e.get('prof', 0), 'lvl': idx[par]['lvl'] + 1}
            feats.append((p, g4)); loc_ids.add(uid)
            report[uid] = (round(area, 3), f, n)
        # comune MGAs
        for cn in COMUNI_A[k]:
            uid = f'{par}-{slug(cn)}'
            if uid not in idx or not str(idx[uid].get('subcat', '')).startswith('MGA'):
                print('  no id for comune MGA', uid); continue
            g4, area = Wr.finish(C.comune(cn).intersection(PARENT[par].buffer(1)), 20)
            e = idx[uid]
            p = {'id': uid, 'name': e['name'], 'ctx': e.get('ctx'), 'alt': e.get('alt', []), 'country': 'it', 'cat': 'DOCG',
                 'subcat': e['subcat'], 'src': 'istatcom', 'bq': 'commune', 'area': round(area, 1), 'parent': par,
                 'lp': label_point(g4), 'bbox': [round(x, 4) for x in g4.bounds],
                 'reg': {'docg': idx[par]['name'], 'rule': RULE[k], 'comuni': [cn],
                         'geom_note': 'Comune (ISTAT 2026 boundary) inside the atlas DOCG polygon; the MGA covers the DOCG vineyards of the comune.'},
                 'style': e.get('style', 'red'), 'prof': e.get('prof', 0), 'lvl': idx[par]['lvl'] + 1}
            feats.append((p, g4))
        missing = sorted(ids - loc_ids - {f'{par}-{slug(c)}' for c in COMUNI_A[k]})
        print(k, 'localita drawn', len(loc_ids), 'unmatched rows', unmatched, 'ids without polygon', missing)
        report[k + '_missing'] = missing; report[k + '_unmatched'] = unmatched
        # overlaps among località MGAs
        loc = [(p['id'], C.to3035(g)) for p, g in feats if p['id'] in loc_ids]
        tree = shapely.STRtree([g for _, g in loc])
        ov = []
        for i, (a, ga) in enumerate(loc):
            for j in tree.query(ga):
                if j <= i:
                    continue
                b, gb = loc[j]
                x = ga.intersection(gb).area
                sm = min(ga.area, gb.area)
                if sm and x / sm > 0.02:
                    ov.append((a, b, round(100 * x / sm, 1)))
        print(k, 'overlaps > 2%:', ov)
        report[k + '_overlaps'] = ov
    json.dump(report, open(W + '/t04_report.json', 'w'), ensure_ascii=False, indent=0)
    Wr.apply(feats)


if __name__ == '__main__':
    main()
