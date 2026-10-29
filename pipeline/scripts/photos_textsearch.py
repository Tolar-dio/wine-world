#!/usr/bin/env python3
"""Commons full-text search per entity (WDQS MWAPI bridge; generator=search in the File namespace,
bitmaps only) returning coordinates, visible categories, size and mime. Appends one line per query to
work/photos/textsearch.jsonl (resumable).
Usage: python3 scripts/photos_textsearch.py queries.tsv     (lines: entity_id<TAB>search string)
"""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import mwapi_rows, sq, STATS

OUT = os.environ.get('TS_OUT', '/home/claude/winesite/work/photos/textsearch.jsonl')


def search(s, limit=50):
    q = f'''SELECT ?title ?lat ?lon ?w ?h ?mime (GROUP_CONCAT(?cat;separator="|") AS ?cats) WHERE {{ SERVICE wikibase:mwapi {{
    bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
    mwapi:generator "search"; mwapi:gsrsearch "{sq(s)}"; mwapi:gsrnamespace "6"; mwapi:gsrlimit "{limit}";
    mwapi:prop "coordinates|categories|imageinfo"; mwapi:colimit "max"; mwapi:clshow "!hidden"; mwapi:cllimit "max"; mwapi:iiprop "size|mime".
    ?title wikibase:apiOutput mwapi:title. ?lat wikibase:apiOutput "coordinates/co/@lat". ?lon wikibase:apiOutput "coordinates/co/@lon".
    ?w wikibase:apiOutput "imageinfo/ii/@width". ?h wikibase:apiOutput "imageinfo/ii/@height". ?mime wikibase:apiOutput "imageinfo/ii/@mime".
    ?cat wikibase:apiOutput "categories/cl/@title". }} }} GROUP BY ?title ?lat ?lon ?w ?h ?mime'''
    rows = mwapi_rows(q, expect_nonempty=False, tries=1)
    if not rows:  # empty answers are sometimes throttling artefacts: one more try
        time.sleep(1.5)
        rows = mwapi_rows('#again\n' + q, expect_nonempty=False, tries=1)
    return [{'t': r['title'], 'lat': float(r['lat']) if r.get('lat') else None, 'lon': float(r['lon']) if r.get('lon') else None,
             'w': int(r.get('w') or 0), 'h': int(r.get('h') or 0), 'mime': r.get('mime', ''),
             'cats': [c[9:] for c in (r.get('cats') or '').split('|') if c]} for r in rows]


def main():
    lines = [l.rstrip('\n').split('\t') for l in open(sys.argv[1], encoding='utf-8') if '\t' in l]
    done = set()
    if os.path.exists(OUT):
        for l in open(OUT, encoding='utf-8'):
            try:
                d = json.loads(l)
                done.add((d['id'], d['q']))
            except Exception:
                pass
    todo = [(i, s) for i, s in lines if (i, s) not in done]
    print('textsearch todo', len(todo), flush=True)
    t0 = time.time()
    for n, (i, s) in enumerate(todo):
        try:
            res = search(s)
        except Exception as e:
            print('error', i, s, str(e)[:200], flush=True)
            time.sleep(20)
            continue
        with open(OUT, 'a', encoding='utf-8') as f:
            f.write(json.dumps({'id': i, 'q': s, 'files': res}, ensure_ascii=False) + '\n')
        if (n + 1) % 100 == 0:
            print(f'{n + 1}/{len(todo)} in {time.time() - t0:.0f}s; {STATS}', flush=True)
    print('done', STATS)


if __name__ == '__main__':
    main()
