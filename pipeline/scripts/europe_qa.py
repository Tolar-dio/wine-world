# QA for all Europe geo files written by the Europe geodata scripts.
# Usage: python3 -I scripts/europe_qa.py
import sys, json, os, re, glob
sys.path.insert(0, '/home/claude/winesite/scripts')
from europe_common import GEO, PROP_ORDER
import shapely
from shapely.geometry import shape

EUROPE = ['at', 'be', 'bg', 'ch', 'cy', 'cz', 'de', 'dk', 'es', 'fr', 'gb', 'gr', 'hr', 'hu', 'it', 'lu', 'md', 'mt', 'nl',
          'pt', 'ro', 'si', 'sk']
FINE = ['fr_fine', 'it_fine', 'de_fine', 'at_fine']
ID_RE = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')
STYLES = {'red', 'white', 'rose', 'sparkling', 'sweet', 'fortified', 'orange'}
BQ = {'official', 'commune', 'admin', 'approx'}
EM = '—'


def main():
    ids = {}
    problems = []
    report = []
    all_names = {}
    for tag in EUROPE + FINE:
        p = f'{GEO}/{tag}.geojson'
        if not os.path.exists(p):
            problems.append(f'missing file {tag}')
            continue
        size = os.path.getsize(p)
        lim = 5_000_000 if tag in ('fr', 'it') or tag in FINE else 4_000_000
        if size > lim:
            problems.append(f'{tag}: {size} bytes > {lim}')
        raw = open(p, encoding='utf-8').read()
        if EM in raw:
            problems.append(f'{tag}: contains em dash')
        fc = json.loads(raw)
        n = 0
        for f in fc['features']:
            pr = f['properties']
            n += 1
            fid = pr.get('id')
            if not fid or not ID_RE.match(fid) or not fid.isascii():
                problems.append(f'{tag}: bad id {fid!r}')
            if fid in ids:
                problems.append(f'{tag}: duplicate id {fid} (also in {ids[fid]})')
            ids[fid] = tag
            for k in ('name', 'country', 'cat', 'src', 'bq', 'area', 'lp', 'bbox'):
                if pr.get(k) in (None, ''):
                    problems.append(f'{tag}:{fid}: missing {k}')
            if 'parent' not in pr:
                problems.append(f'{tag}:{fid}: no parent key')
            if pr.get('bq') not in BQ:
                problems.append(f'{tag}:{fid}: bad bq {pr.get("bq")}')
            if pr.get('styles') and not set(pr['styles']) <= STYLES:
                problems.append(f'{tag}:{fid}: bad styles {pr["styles"]}')
            g = f['geometry']
            if g['type'] not in ('Polygon', 'MultiPolygon'):
                problems.append(f'{tag}:{fid}: geometry {g["type"]}')
            gg = shape(g)
            if gg.is_empty:
                problems.append(f'{tag}:{fid}: empty geometry')
            if not gg.is_valid:
                problems.append(f'{tag}:{fid}: invalid geometry ({shapely.is_valid_reason(gg)[:60]})')
            # 4-decimal precision check (sample)
            c = g['coordinates'][0][0] if g['type'] == 'Polygon' else g['coordinates'][0][0][0]
            if any(len(repr(v).split('.')[-1]) > 4 for v in c):
                problems.append(f'{tag}:{fid}: coords >4 decimals')
            lp = pr.get('lp')
            if lp and not gg.buffer(0.0002).contains(shapely.Point(lp)):
                problems.append(f'{tag}:{fid}: lp outside polygon')
            all_names.setdefault(pr['name'], []).append(fid)
            for a in pr.get('alt') or []:
                all_names.setdefault(a, []).append(fid)
        for f in fc['features']:
            par = f['properties'].get('parent')
            if par and par not in ids and not any(par == x['properties']['id'] for x in fc['features']):
                pass
        report.append((tag, n, size))
    # parents must resolve
    for tag in EUROPE + FINE:
        p = f'{GEO}/{tag}.geojson'
        if not os.path.exists(p):
            continue
        for f in json.load(open(p))['features']:
            par = f['properties'].get('parent')
            if par and par not in ids:
                problems.append(f'{tag}:{f["properties"]["id"]}: parent {par} not found')
    must = ['Châteauneuf-du-Pape', 'Barolo', 'Pauillac', 'Rioja', 'Porto', 'Port', 'Mosel', 'Tokaj', 'Jerez-Xérès-Sherry',
            'Chambertin', 'Romanée-Conti', 'Montrachet', 'Alsace grand cru Rangen', 'Champagne', 'Valdeorras',
            'Wehlener Sonnenuhr', 'Ried Achleiten', 'Dézaley', 'Sussex', 'Codru']
    for m in must:
        if m not in all_names:
            problems.append(f'MISSING required name {m}')
    for tag, n, size in report:
        print(f'{tag:8s} {n:5d} features {size/1e6:6.2f} MB')
    print('total features', sum(r[1] for r in report), 'total MB', round(sum(r[2] for r in report) / 1e6, 2))
    print('problems:', len(problems))
    for p in problems[:80]:
        print('  ', p)
    json.dump({'files': {t: {'features': n, 'bytes': s} for t, n, s in report}, 'problems': problems},
              open('/home/claude/winesite/work/europe/qa.json', 'w'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    main()
