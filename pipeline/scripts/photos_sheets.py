#!/usr/bin/env python3
"""Contact sheets for visual review of every final photo.

  python3 scripts/photos_sheets.py fetch     download each photo's 330 px standard thumbnail into
                                             work/photo_review/thumbs/ (1 request at a time, Retry-After
                                             honoured, resumable; robot policy: <= 2 concurrent)
  python3 scripts/photos_sheets.py build     write work/photo_review/sheets/sheet_NNNN.png (12 tiles,
                                             4 x 3, ~300 px each, labelled with our id, place name,
                                             country and the Commons title), sheet_NNNN.html (same
                                             tiles, images hotlinked from upload.wikimedia.org) and
                                             index.json mapping every tile to its record.
Every photo in site/data/photos/*.json appears on exactly one sheet.
"""
import json, os, sys, glob, hashlib, time, textwrap, html
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

ROOT = '/home/claude/winesite'
PH = f'{ROOT}/site/data/photos'
R = f'{ROOT}/work/photo_review'
TH = f'{R}/thumbs'
SH = f'{R}/sheets'
TILE_W, IMG_H, LAB_H, COLS, ROWS = 300, 225, 78, 4, 3


def records():
    T = {t['id']: t for t in json.load(open(f'{ROOT}/work/photos/targets.json'))}
    cn = {t['id']: t['name'] for t in T.values() if t['type'] == 'country'}
    out = []
    for f in sorted(glob.glob(f'{PH}/*.json')):
        dest = os.path.basename(f)[:-5]
        for k, v in sorted(json.load(open(f)).items()):
            t = T.get(k, {})
            ctry = cn.get(t.get('country'), '') if dest != '_global' else t.get('type', '')
            for i, e in enumerate(v):
                out.append({'id': k, 'type': t.get('type'), 'name': t.get('name', k), 'country': ctry, 'rank': i + 1,
                            'file': e['file'], 'caption': e['caption'], 'thumb_small': e['thumb_small'], 'page': e['page'],
                            'license': e['license'], 'author': e['author'], 'dest': dest})
    return out


def local(rec):
    return f"{TH}/{hashlib.md5(rec['file'].encode()).hexdigest()}.jpg"


def fetch(limit_minutes=None):
    from photos_common import S
    os.makedirs(TH, exist_ok=True)
    recs = records()
    todo = [r for r in recs if not os.path.exists(local(r))]
    print('thumbnails to fetch', len(todo), 'of', len(recs), flush=True)
    t0 = time.time()
    ok = fail = 0
    streak = 0
    for r in todo:
        if limit_minutes and time.time() - t0 > limit_minutes * 60:
            break
        try:
            resp = S.get(r['thumb_small'], timeout=60)
        except Exception:
            time.sleep(10)
            continue
        if resp.status_code == 200 and resp.headers.get('content-type', '').startswith('image'):
            open(local(r), 'wb').write(resp.content)
            ok += 1
            streak = 0
            time.sleep(0.6)
        else:
            fail += 1
            streak += 1
            ra = resp.headers.get('retry-after')
            wait = int(ra) if ra and ra.isdigit() else 10
            time.sleep(min(300, wait * (2 ** min(streak, 5))))
        if (ok + fail) % 100 == 0:
            print(f'  ok {ok} fail {fail} in {time.time() - t0:.0f}s', flush=True)
    print('done fetch: ok', ok, 'fail', fail, flush=True)


def build():
    from PIL import Image, ImageDraw, ImageFont
    os.makedirs(SH, exist_ok=True)
    for f in glob.glob(f'{SH}/sheet_*'):
        os.remove(f)
    recs = records()
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf', 11)
    fontb = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf', 11)
    per = COLS * ROWS
    index = []
    have = 0
    for si in range(0, len(recs), per):
        chunk = recs[si:si + per]
        n = si // per + 1
        sheet = Image.new('RGB', (COLS * TILE_W, ROWS * (IMG_H + LAB_H)), (250, 250, 248))
        d = ImageDraw.Draw(sheet)
        tiles_html = []
        for j, r in enumerate(chunk):
            x, y = (j % COLS) * TILE_W, (j // COLS) * (IMG_H + LAB_H)
            p = local(r)
            if os.path.exists(p):
                try:
                    im = Image.open(p).convert('RGB')
                    im.thumbnail((TILE_W - 8, IMG_H - 8))
                    sheet.paste(im, (x + (TILE_W - im.width) // 2, y + 4 + (IMG_H - 8 - im.height) // 2))
                    have += 1
                except Exception:
                    d.text((x + 10, y + 100), 'image unreadable', fill=(160, 0, 0), font=fontb)
            else:
                d.rectangle([x + 4, y + 4, x + TILE_W - 5, y + IMG_H - 5], outline=(200, 200, 200))
                d.text((x + 12, y + 95), 'thumbnail not downloaded\n(upload.wikimedia.org 429);\nsee the .html sheet', fill=(150, 60, 60), font=font)
            lines = [f"{r['id']}  #{r['rank']}", f"{r['name']} | {r['country']}"]
            lines += textwrap.wrap(r['file'][5:], 52)[:2]
            lines += textwrap.wrap('cap: ' + r['caption'], 52)[:1]
            for li, line in enumerate(lines[:5]):
                d.text((x + 6, y + IMG_H + 2 + li * 14), line, fill=(20, 20, 20), font=fontb if li == 0 else font)
            d.rectangle([x, y, x + TILE_W - 1, y + IMG_H + LAB_H - 1], outline=(215, 215, 210))
            index.append(dict(r, sheet=f'sheet_{n:04d}.png', tile=j + 1))
            tiles_html.append(f'''<figure><img src="{html.escape(r['thumb_small'])}" loading="lazy" alt="">
<figcaption><b>{html.escape(r['id'])} #{r['rank']}</b><br>{html.escape(r['name'])} | {html.escape(r['country'])}<br>
<a href="{html.escape(r['page'])}">{html.escape(r['file'][5:])}</a><br><i>{html.escape(r['caption'])}</i></figcaption></figure>''')
        sheet.save(f'{SH}/sheet_{n:04d}.png', optimize=True)
        open(f'{SH}/sheet_{n:04d}.html', 'w').write(f'''<!doctype html><meta charset="utf-8"><title>Photo review sheet {n}</title>
<style>body{{font:12px sans-serif;background:#fafaf8;margin:12px}}main{{display:grid;grid-template-columns:repeat(4,300px);gap:8px}}
figure{{margin:0;border:1px solid #ddd;background:#fff}}img{{width:300px;height:225px;object-fit:contain;background:#eee}}
figcaption{{padding:4px;word-break:break-word}}</style><h1>Sheet {n}</h1><main>{''.join(tiles_html)}</main>''')
    json.dump(index, open(f'{SH}/index.json', 'w'), ensure_ascii=False, indent=0)
    print('sheets', (len(recs) + per - 1) // per, 'tiles', len(recs), 'with image', have)


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'fetch':
        fetch(float(sys.argv[2]) if len(sys.argv) > 2 else None)
    else:
        build()
