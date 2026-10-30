# OCR of MGA labels on the consortium's official MGA map images (tesseract 5, sparse text), matched to the MGA
# names of the disciplinare (Barolo art. 8 list / Barbaresco list). Output: work/depth/mga/{map}_labels.json
# [{name, x, y (full-res px, label centre), score, text}]
# Usage: python3 -I scripts/depth_mga_ocr.py barolo|barbaresco
import sys, json, re, os, subprocess, difflib, tempfile
import numpy as np
import cv2
from unidecode import unidecode

MGA = '/home/claude/winesite/work/depth/mga'
FRAME = {'barolo': (1000, 900, 7000, 9100), 'barbaresco': (900, 1000, 6100, 8900)}


def names_for(key):
    return json.load(open(f'{MGA}/{key}_names.json'))


def norm(s):
    s = unidecode(s).upper().replace("'", '').replace('’', '')
    s = re.sub(r'\bSAN\b|\bSANTA\b|\bSANT\b', 'S', s)
    s = re.sub(r'[^A-Z ]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def ocr_tile(img, ox, oy, scale, tag):
    fn = f'{MGA}/_tile_{tag}.png'
    cv2.imwrite(fn, img)
    r = subprocess.run(['tesseract', fn, 'stdout', '--psm', '11', 'tsv'], capture_output=True, text=True)
    out = []
    for ln in r.stdout.splitlines()[1:]:
        f = ln.split('\t')
        if len(f) < 12 or not f[11].strip():
            continue
        conf = float(f[10])
        t = f[11].strip()
        if conf < 35 or not re.search(r'[A-Za-z]{2,}', t):
            continue
        x, y, w, h = [int(v) / scale for v in f[6:10]]
        out.append({'t': t, 'x': ox + x, 'y': oy + y, 'w': w, 'h': h, 'c': conf})
    os.remove(fn)
    return out


def main():
    key = sys.argv[1]
    im = cv2.imread(f'{MGA}/{key}-000.jpg')
    H, W = im.shape[:2]
    a = im.astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    words = []
    T, OV = 1600, 250
    x0, y0, x1, y1 = FRAME[key]
    for thr in (110, 150):
        ink = ((mx < thr) & ((mx - mn) < 50)).astype(np.uint8)
        # drop solid blobs (buildings): components whose fill ratio is high and size big
        n, cc, st, _ = cv2.connectedComponentsWithStats(ink, connectivity=8)
        solid = (st[:, cv2.CC_STAT_AREA] > 350) & (st[:, cv2.CC_STAT_AREA] > 0.5 * st[:, cv2.CC_STAT_WIDTH] * st[:, cv2.CC_STAT_HEIGHT])
        solid[0] = False
        ink[solid[cc]] = 0
        binimg = np.where(ink > 0, 0, 255).astype(np.uint8)
        for ty in range(y0, y1, T - OV):
            for tx in range(x0, x1, T - OV):
                tile = binimg[ty:ty + T, tx:tx + T]
                if tile.min() == 255:
                    continue
                tile = cv2.resize(tile, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)
                words += ocr_tile(tile, tx, ty, 1.5, f'{key}_{thr}')
        print('threshold', thr, 'words so far', len(words), flush=True)
    json.dump(words, open(f'{MGA}/{key}_ocr_words.json', 'w'))
    match(key, words)


def phrases(words):
    """group words into label phrases: same line, then stacked lines"""
    ws = sorted(words, key=lambda w: (w['y'], w['x']))
    lines = []
    for w in ws:
        for ln in lines:
            last = ln[-1]
            if abs((last['y'] + last['h'] / 2) - (w['y'] + w['h'] / 2)) < 0.5 * max(last['h'], w['h']) and \
               0 <= w['x'] - (last['x'] + last['w']) < 1.6 * max(last['h'], w['h']):
                ln.append(w)
                break
        else:
            lines.append([w])
    L = []
    for ln in lines:
        x = min(w['x'] for w in ln); y = min(w['y'] for w in ln)
        x2 = max(w['x'] + w['w'] for w in ln); y2 = max(w['y'] + w['h'] for w in ln)
        L.append({'t': ' '.join(w['t'] for w in ln), 'x': x, 'y': y, 'x2': x2, 'y2': y2, 'h': y2 - y})
    out = list(L)
    for i, a in enumerate(L):
        for b in L:
            if b is a:
                continue
            if 0 <= b['y'] - a['y2'] < 1.2 * a['h'] and min(a['x2'], b['x2']) - max(a['x'], b['x']) > 0.2 * min(a['x2'] - a['x'], b['x2'] - b['x']):
                out.append({'t': a['t'] + ' ' + b['t'], 'x': min(a['x'], b['x']), 'y': a['y'], 'x2': max(a['x2'], b['x2']),
                            'y2': b['y2'], 'h': b['y2'] - a['y']})
    return out


def match(key, words):
    names = names_for(key)
    N = {}
    for n, alts in names.items():
        N[(n, n)] = norm(n).replace(' ', '')
        for a in alts:
            N[(n, a)] = norm(a).replace(' ', '')
    ph = phrases(words)
    best = []
    for p in ph:
        s = norm(p['t']).replace(' ', '')
        if len(s) < 3:
            continue
        cand = None
        for (n, form), ns in N.items():
            r = difflib.SequenceMatcher(None, s, ns).ratio()
            if cand is None or r > cand[0]:
                cand = (r, n)
        if cand and cand[0] >= 0.8:
            best.append({'name': cand[1], 'score': round(cand[0], 3), 'text': p['t'],
                         'x': (p['x'] + p['x2']) / 2, 'y': (p['y'] + p['y2']) / 2,
                         'bbox': [p['x'], p['y'], p['x2'], p['y2']]})
    # de-duplicate: same name within 120 px -> keep highest score (prefer longer phrase on ties)
    best.sort(key=lambda b: (-b['score'], -(b['bbox'][2] - b['bbox'][0])))
    keep = []
    for b in best:
        if any(k['name'] == b['name'] and abs(k['x'] - b['x']) < 160 and abs(k['y'] - b['y']) < 80 for k in keep):
            continue
        # a shorter name matched inside a longer label (e.g. "Cannubi" inside "Cannubi Muscatel") is dropped
        if any(abs(k['x'] - b['x']) < 120 and abs(k['y'] - b['y']) < 60 and k['name'] != b['name'] and
               norm(b['name']) in norm(k['name']) for k in keep):
            continue
        keep.append(b)
    found = {k['name'] for k in keep}
    print(f'{key}: {len(keep)} label matches, {len(found)} of {len(names)} names; missing:', sorted(set(names) - found))
    json.dump(keep, open(f'{MGA}/{key}_labels.json', 'w'), ensure_ascii=False, indent=0)


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[2] == 'match':
        match(sys.argv[1], json.load(open(f'{MGA}/{sys.argv[1]}_ocr_words.json')))
    else:
        main()
