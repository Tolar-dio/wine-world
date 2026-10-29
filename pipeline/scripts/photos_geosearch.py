#!/usr/bin/env python3
"""Commons geosearch around each entity's label point (WDQS MWAPI bridge, list=geosearch generator with
coordinates + visible categories). Results are appended per entity to work/photos/geosearch.jsonl, so a
restart resumes where it stopped.
Usage: python3 scripts/photos_geosearch.py ids.txt      (one entity id per line, processed in order)
"""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import mwapi_rows, STATS

W = '/home/claude/winesite/work/photos'
OUT = f'{W}/geosearch.jsonl'


def geosearch(lat, lon, radius_m, limit):
    q = f'''SELECT ?title ?lat ?lon ?w ?h ?mime (GROUP_CONCAT(?cat;separator="|") AS ?cats) WHERE {{ SERVICE wikibase:mwapi {{
    bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
    mwapi:generator "geosearch"; mwapi:ggscoord "{lat:.5f}|{lon:.5f}"; mwapi:ggsradius "{int(radius_m)}"; mwapi:ggsnamespace "6"; mwapi:ggslimit "{limit}";
    mwapi:prop "coordinates|categories|imageinfo"; mwapi:colimit "max"; mwapi:clshow "!hidden"; mwapi:cllimit "max"; mwapi:iiprop "size|mime".
    ?title wikibase:apiOutput mwapi:title. ?lat wikibase:apiOutput "coordinates/co/@lat". ?lon wikibase:apiOutput "coordinates/co/@lon".
    ?w wikibase:apiOutput "imageinfo/ii/@width". ?h wikibase:apiOutput "imageinfo/ii/@height". ?mime wikibase:apiOutput "imageinfo/ii/@mime".
    ?cat wikibase:apiOutput "categories/cl/@title". }} }} GROUP BY ?title ?lat ?lon ?w ?h ?mime'''
    rows = mwapi_rows(q, expect_nonempty=True, tries=3)
    out = []
    for r in rows:
        out.append({'t': r['title'], 'lat': float(r['lat']) if r.get('lat') else None, 'lon': float(r['lon']) if r.get('lon') else None,
                    'w': int(r.get('w') or 0), 'h': int(r.get('h') or 0), 'mime': r.get('mime', ''),
                    'cats': [c[9:] for c in (r.get('cats') or '').split('|') if c]})
    return out


def main():
    T = {t['id']: t for t in json.load(open(f'{W}/targets.json'))}
    ids = [l.strip() for l in open(sys.argv[1]) if l.strip()]
    done = set()
    if os.path.exists(OUT):
        for line in open(OUT):
            try:
                done.add(json.loads(line)['id'])
            except Exception:
                pass
    todo = [i for i in ids if i not in done and i in T and T[i].get('lat') is not None]
    print('geosearch todo', len(todo), 'done before', len(done), flush=True)
    t0 = time.time()
    for n, i in enumerate(todo):
        t = T[i]
        if t['type'] == 'site':
            rad, lim = (600, 60) if t.get('cq') == 'precise' else (2000, 120)
        elif t['type'] == 'region':
            rad, lim = 10000, 150
        else:
            rad, lim = 10000, 150
            if t.get('area') and t['area'] < 30:
                rad = 5000
        try:
            res = geosearch(t['lat'], t['lon'], rad, lim)
        except Exception as e:
            print('error', i, str(e)[:200], flush=True)
            time.sleep(30)
            continue
        with open(OUT, 'a', encoding='utf-8') as f:
            f.write(json.dumps({'id': i, 'r': rad, 'files': res}, ensure_ascii=False) + '\n')
        if (n + 1) % 50 == 0:
            el = time.time() - t0
            print(f'{n + 1}/{len(todo)} in {el:.0f}s; {STATS}', flush=True)
    print('done', STATS)


if __name__ == '__main__':
    main()
