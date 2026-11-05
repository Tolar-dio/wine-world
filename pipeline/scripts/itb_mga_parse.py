# Parse the cadastral annexes of the Roero (Allegato 2B) and Dogliani (Allegato 1B) disciplinari into JSON:
# [{"mga","comune","foglio","particelle":[...]}]. Usage: python3 -I scripts/itb_mga_parse.py
import json, re, sys
import pdfplumber

SRC = {'roero': ('/home/claude/winesite/raw/it_disciplinari/Roero.pdf', 'ALLEGATO 2B'),
       'dogliani': ('/home/claude/winesite/raw/it_disciplinari/Dogliani.pdf', 'ALLEGATO 1B')}
OUT = '/home/claude/winesite/work/italy-bounds/mga_{}.json'


def parse(path, marker):
    pdf = pdfplumber.open(path)
    rows, started = [], False
    last = None
    for pg in pdf.pages:
        t = pg.extract_text() or ''
        if marker in t:
            started = True
        if not started:
            continue
        for tb in pg.extract_tables():
            for r in tb:
                r = [(c or '').strip() for c in r]
                if len(r) < 4 or r[0].lower().startswith(('menzione', 'unit')):
                    continue
                name, com, fg, parts = r[0], r[1], r[2], ' '.join(r[3:])
                name = ' '.join(name.split()); com = ' '.join(com.split())
                if not name and last:
                    name = last['mga']
                    com = com or last['comune']
                nums = re.findall(r'\d+', parts)
                fgm = re.match(r'^\s*(\d+)\s*([A-Z]?)\s*$', fg)
                if not name or not fgm:
                    if nums and last:   # continuation of previous cell on a new page
                        last['particelle'] += nums
                    continue
                row = {'mga': name, 'comune': com, 'foglio': int(fgm.group(1)), 'allegato': fgm.group(2),
                       'particelle': nums}
                rows.append(row)
                last = row
    return rows


def parse_bands(path, marker):
    """Row bands between the horizontal rules of the particelle column (pdfplumber rects); words split into
    the four columns by the x positions of the vertical rules."""
    pdf = pdfplumber.open(path)
    rows, started, last = [], False, None
    for pg in pdf.pages:
        t = pg.extract_text() or ''
        if marker in t:
            started = True
        if not started:
            continue
        rs = pg.rects
        vx = sorted({round(r['x0']) for r in rs if r['width'] < 2 and r['height'] > 5})
        if len(vx) < 5:
            continue
        x1, x2, x3, x4 = vx[1], vx[2], vx[3], vx[4] if len(vx) > 4 else 10000
        hs = sorted({round(r['top'], 1) for r in rs if r['height'] < 2 and r['width'] > 0.5 * (x4 - x3) and r['x0'] >= x3 - 3})
        vtop = min(r['top'] for r in rs if r['width'] < 2 and r['height'] > 5)
        vbot = max(r['bottom'] for r in rs if r['width'] < 2 and r['height'] > 5)
        bounds = sorted(set([round(vtop, 1)] + hs + [round(vbot, 1)]))
        words = pg.extract_words()
        for a, b in zip(bounds, bounds[1:]):
            if b - a < 3:
                continue
            ws = [w for w in words if w['top'] >= a - 1 and w['bottom'] <= b + 1]
            col = lambda lo, hi: ' '.join(w['text'] for w in sorted(ws, key=lambda w: (round(w['top']), w['x0'])) if lo <= w['x0'] < hi)
            name, com, fg, parts = col(0, x1), col(x1, x2), col(x2, x3), col(x3, 10000)
            if name.lower().startswith(('menzione', 'unit')):
                continue
            nums = re.findall(r'\d+', parts)
            fgm = re.match(r'^\s*(\d+)\s*([A-Z]?)\s*$', fg)
            if not name and not fgm:
                if nums and last:
                    last['particelle'] += nums
                continue
            if not name and last:
                name, com = last['mga'], com or last['comune']
            if not fgm:
                continue
            row = {'mga': ' '.join(name.split()), 'comune': ' '.join(com.split()), 'foglio': int(fgm.group(1)),
                   'allegato': fgm.group(2), 'particelle': nums}
            rows.append(row)
            last = row
    return rows


if __name__ == '__main__':
    for k, (p, m) in SRC.items():
        rows = parse_bands(p, m)
        json.dump(rows, open(OUT.format(k), 'w'), ensure_ascii=False, indent=0)
        names = sorted({r['mga'] for r in rows})
        print(k, len(rows), 'rows', len(names), 'mga', sum(len(r['particelle']) for r in rows), 'parcels')
        print(sorted({r['comune'] for r in rows}))
