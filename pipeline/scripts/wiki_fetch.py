#!/usr/bin/env python3
"""Fetch Wikipedia article HTML (not the rate-limited API), extract coordinates and plain
text, cache to work/global/wiki/. Polite: 1.2 s between requests.
Usage: python3 -I scripts/wiki_fetch.py TITLES_FILE OUT_JSON
TITLES_FILE: one 'key|Article_Title' per line (lang prefix allowed: 'fr:Titre').
"""
import json, re, html, sys, time, os, urllib.request, urllib.parse

CACHE = '/home/claude/winesite/work/global/wiki'
os.makedirs(CACHE, exist_ok=True)
UA = 'VitisMundiAtlasResearch/1.0 (non-commercial; tolar research bot)'

def fetch(title):
    lang = 'en'
    if re.match(r'^[a-z]{2}:', title):
        lang, title = title[:2], title[3:]
    fn = os.path.join(CACHE, re.sub(r'[^A-Za-z0-9_.-]', '_', lang + '_' + title)[:150] + '.html')
    if os.path.exists(fn) and os.path.getsize(fn) > 2000:
        return open(fn, encoding='utf-8', errors='ignore').read()
    url = f'https://{lang}.wikipedia.org/wiki/' + urllib.parse.quote(title.replace(' ', '_'), safe='()_,\'')
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                t = r.read().decode('utf-8', errors='ignore')
            open(fn, 'w', encoding='utf-8').write(t)
            time.sleep(1.2)
            return t
        except Exception as e:
            err = str(e)
            time.sleep(4 + 4 * attempt)
    return ''

def coords(t):
    m = re.search(r'<span class="geo-dec"[^>]*>([\-0-9.]+)°([NS])\s+([\-0-9.]+)°([EW])', t)
    if m:
        lat = float(m.group(1)) * (1 if m.group(2) == 'N' else -1)
        lon = float(m.group(3)) * (1 if m.group(4) == 'E' else -1)
        return round(lat, 4), round(lon, 4)
    m = re.search(r'<span class="geo"[^>]*>([\-0-9.]+); ([\-0-9.]+)</span>', t)
    if m:
        return round(float(m.group(1)), 4), round(float(m.group(2)), 4)
    m = re.search(r'"wgCoordinates":\{"lat":([\-0-9.]+),"lon":([\-0-9.]+)\}', t)
    if m:
        return round(float(m.group(1)), 4), round(float(m.group(2)), 4)
    return None

def text(t):
    body = t[t.find('mw-parser-output'):]
    body = re.sub(r'<(script|style|table|sup)[^>]*>.*?</\1>', ' ', body, flags=re.S)
    paras = re.findall(r'<p[^>]*>(.*?)</p>', body, re.S)
    out = [html.unescape(' '.join(re.sub(r'<[^>]+>', ' ', p).split())) for p in paras]
    return '\n'.join(p for p in out if len(p) > 40)

def main():
    titles = [l.strip().split('|', 1) for l in open(sys.argv[1]) if '|' in l]
    out_path = sys.argv[2]
    res = json.load(open(out_path)) if os.path.exists(out_path) else {}
    for key, title in titles:
        if key in res and res[key].get('ok'):
            continue
        t = fetch(title)
        c = coords(t) if t else None
        res[key] = {'title': title, 'ok': bool(t), 'coord': c, 'text': text(t)[:6000] if t else ''}
        print(key, title, c, len(res[key]['text']), flush=True)
        json.dump(res, open(out_path, 'w'), ensure_ascii=False, indent=1)
    print('DONE', len(res))

if __name__ == '__main__':
    main()
