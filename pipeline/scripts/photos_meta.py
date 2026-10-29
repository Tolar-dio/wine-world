#!/usr/bin/env python3
"""Fetch Commons file metadata (size, mime, 640px thumb, licence, author, description, categories,
assessments, GPS) for a list of File: titles. Results are appended to work/photos/meta.jsonl as they
arrive (safe across restarts). Two channels run in parallel:
  * WDQS MWAPI bridge (allimages generator, one title per binding, 50 bindings per query)
  * Commons Action API, 50 titles per request, maxlag=5, Retry-After honoured
Usage: python3 scripts/photos_meta.py titles.txt   (one File: title per line)
"""
import json, os, sys, threading, time, queue, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import sparql, commons_api, sq, STATS

W = '/home/claude/winesite/work/photos'
META = f'{W}/meta.jsonl'
FIELDS = 'LicenseShortName|LicenseUrl|Artist|Credit|ImageDescription|Categories|GPSLatitude|GPSLongitude|Assessments|DateTimeOriginal|ObjectName|AttributionRequired|Restrictions'
LOCK = threading.Lock()


def load_meta():
    out = {}
    if os.path.exists(META):
        for line in open(META, encoding='utf-8'):
            try:
                d = json.loads(line)
            except Exception:
                continue
            out[d['title']] = d
    return out


def append(recs):
    with LOCK:
        with open(META, 'a', encoding='utf-8') as f:
            for r in recs:
                f.write(json.dumps(r, ensure_ascii=False) + '\n')


def via_wdqs(titles):
    outs = ''.join(f'?{k} wikibase:apiOutput "imageinfo/ii/extmetadata/{k}/@value".\n' for k in FIELDS.split('|'))
    vals = ' '.join('"%s"' % sq(t[5:].replace(' ', '_')) for t in titles)
    q = f'''SELECT * WHERE {{ VALUES ?t {{ {vals} }}
  SERVICE wikibase:mwapi {{ bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
    mwapi:generator "allimages"; mwapi:gaifrom ?t; mwapi:gaito ?t; mwapi:gailimit "1";
    mwapi:prop "imageinfo"; mwapi:iiprop "size|url|mime|extmetadata"; mwapi:iiurlwidth "640"; mwapi:iiextmetadatafilter "{FIELDS}"; mwapi:iiextmetadatalanguage "en".
    ?title wikibase:apiOutput mwapi:title. ?w wikibase:apiOutput "imageinfo/ii/@width". ?h wikibase:apiOutput "imageinfo/ii/@height". ?mime wikibase:apiOutput "imageinfo/ii/@mime".
    ?thumb wikibase:apiOutput "imageinfo/ii/@thumburl". ?tw wikibase:apiOutput "imageinfo/ii/@thumbwidth". ?th wikibase:apiOutput "imageinfo/ii/@thumbheight".
    ?page wikibase:apiOutput "imageinfo/ii/@descriptionurl".
    {outs} }} }}'''
    rows = sparql('#meta %d\n' % time.time_ns() + q, cache=False, timeout=150, min_gap=0.2)
    got = {}
    for r in rows:
        if not r.get('w'):
            continue
        rec = {'title': r['title'], 'w': int(r['w']), 'h': int(r['h']), 'mime': r.get('mime', ''),
               'thumb': r.get('thumb', ''), 'tw': int(r.get('tw') or 0), 'th': int(r.get('th') or 0),
               'page': r.get('page', ''), 'src': 'wdqs'}
        for k in FIELDS.split('|'):
            if r.get(k):
                rec[k] = r[k]
        got[r['title']] = rec
    return got


def via_api(titles):
    d = commons_api({'action': 'query', 'titles': '|'.join(titles), 'prop': 'imageinfo',
                     'iiprop': 'size|url|mime|extmetadata', 'iiurlwidth': '640', 'iiextmetadatafilter': FIELDS,
                     'iiextmetadatalanguage': 'en', 'redirects': '1'}, cache=False)
    got, missing = {}, []
    q = d.get('query', {})
    redir = {r['from']: r['to'] for r in q.get('redirects', [])}
    norm_ = {n['from']: n['to'] for n in q.get('normalized', [])}
    for p in q.get('pages', []):
        if p.get('missing') or p.get('invalid') or not p.get('imageinfo'):
            missing.append(p.get('title'))
            continue
        ii = p['imageinfo'][0]
        rec = {'title': p['title'], 'w': ii.get('width', 0), 'h': ii.get('height', 0), 'mime': ii.get('mime', ''),
               'thumb': ii.get('thumburl', ''), 'tw': ii.get('thumbwidth', 0), 'th': ii.get('thumbheight', 0),
               'page': ii.get('descriptionurl', ''), 'src': 'api'}
        for k, v in (ii.get('extmetadata') or {}).items():
            rec[k] = v.get('value') if isinstance(v, dict) else v
        got[p['title']] = rec
    # map requested titles that were redirected
    back = {}
    for t in titles:
        tt = norm_.get(t, t)
        tt = redir.get(tt, tt)
        back[t] = tt
    return got, missing, back


def run(titles, wdqs_threads=1, api_threads=1, batch=50):
    have = load_meta()
    todo = [t for t in dict.fromkeys(titles) if t not in have]
    print(f'meta: {len(titles)} requested, {len(todo)} to fetch', flush=True)
    if not todo:
        return have
    Q = queue.Queue()
    for i in range(0, len(todo), batch):
        Q.put((todo[i:i + batch], 0))
    done = [0]
    t0 = time.time()

    def worker(kind):
        while True:
            try:
                chunk, tries = Q.get(timeout=30 if kind == 'api' else 5)
            except queue.Empty:
                return
            try:
                if kind == 'wdqs':
                    got = via_wdqs(chunk)
                    recs = list(got.values())
                    lost = [t for t in chunk if t not in got]
                    if lost:
                        if tries >= 2:
                            recs += [{'title': t, 'missing': True, 'src': 'wdqs-unresolved'} for t in lost]
                        else:
                            Q.put((lost, tries + 1))
                            if len(lost) == len(chunk):
                                time.sleep(4)
                else:
                    got, missing, back = via_api(chunk)
                    recs = list(got.values())
                    for t in chunk:
                        tt = back.get(t, t)
                        if tt != t and tt in got:
                            r = dict(got[tt]); r['title'] = t; r['redirect_to'] = tt
                            recs.append(r)
                    recs += [{'title': m, 'missing': True, 'src': 'api'} for m in missing]
                append(recs)
                n0 = done[0]
                done[0] += len(recs)
                if done[0] // 1000 != n0 // 1000:
                    el = time.time() - t0
                    print(f'  {done[0]}/{len(todo)} in {el:.0f}s ({done[0] / max(el, 1):.1f}/s) {STATS}', flush=True)
            except Exception as e:
                print('worker', kind, 'error', str(e)[:200], flush=True)
                Q.put((chunk, tries))
                time.sleep(20)

    th = [threading.Thread(target=worker, args=('wdqs',)) for _ in range(wdqs_threads)]
    th += [threading.Thread(target=worker, args=('api',)) for _ in range(api_threads)]
    for x in th:
        x.start()
    for x in th:
        x.join()
    return load_meta()


if __name__ == '__main__':
    titles = [l.strip() for l in open(sys.argv[1], encoding='utf-8') if l.strip().startswith('File:')]
    wt = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    at = int(sys.argv[3]) if len(sys.argv) > 3 else 1
    run(titles, wt, at)
