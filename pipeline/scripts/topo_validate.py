#!/usr/bin/env python3
"""Validation table for work/topo-log.md (reads the merged per-tile parts via topo_merge --check)."""
import sys, json
sys.path.insert(0, '/home/claude/winesite/scripts')
sys.argv.append('--check')
import topo_merge
by_id = topo_merge.main()
OCT = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
CASES = [
    ('Chambertin', ['fr-chambertin', 'fr-chambertin-clos-de-beze', 'site-fr-chambertin'], 'gently E-facing, about 260 to 300 m'),
    ('Bernkasteler Doctor', ['de-bernkastel-doctor', 'site-de-bernkasteler-doctor'], 'steep (often >50%), S to SW'),
    ('Wehlener Sonnenuhr', ['de-wehlen-sonnenuhr', 'site-de-wehlener-sonnenuhr'], 'steep (often >50%), S to SW'),
    ('Cote-Rotie', ['fr-cote-rotie', 'site-fr-la-landonne'], 'steep, SE-facing'),
    ('Hermitage', ['fr-hermitage', 'site-fr-chapelle-saint-christophe-hermitage'], 'S-facing hill'),
    ('Napa Valley floor', ['us-oak-knoll-district-of-napa-valley', 'us-oakville', 'us-rutherford', 'site-us-robert-mondavi-winery', 'site-us-inglenook', 'site-us-opus-one', 'us-napa-valley'], 'valley floor flat'),
    ('Douro, Cima Corgo', ['pt-douro', 'site-pt-pinhao', 'site-pt-quinta-do-noval', 'site-pt-quinta-do-bomfim', 'site-pt-quinta-da-roeda', 'site-pt-quinta-das-carvalhas', 'site-pt-casal-de-loivos-viewpoint'], 'steep'),
]


def octs(ar):
    top = sorted(range(8), key=lambda i: -ar[i])[:2]
    return ' '.join(f'{OCT[i]} {ar[i]:.2f}' for i in top if ar[i] > 0)


rows = ['| case | id | e (e5 to e95) m | slope mean / p75 % | aspect | top octants | flat | n | expected |', '|---|---|---|---|---|---|---|---|---|']
for name, ids, exp in CASES:
    for fid in ids:
        if fid not in by_id:
            rows.append(f'| {name} | {fid} | not found | | | | | | {exp} |'); continue
        f, st, mode = by_id[fid]
        if not st:
            rows.append(f'| {name} | {fid} | no data | | | | | | {exp} |'); continue
        a = st['a'] if st['a'] is not None else 'null'
        rows.append(f"| {name} | {fid} | {st['e']} ({st['e5']} to {st['e95']}) | {st['s']} / {st['s75']} | {a} | {octs(st['ar'])} | {st['fl']} | {st['n']} | {exp} |")
print('\n'.join(rows))
