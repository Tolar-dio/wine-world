#!/usr/bin/env python3
"""List files in each grape variety's Commons category (from Wikidata P373), with size and mime.
Output: work/photos/grape_pool.json {grape_id: [{t,w,h,mime}]}"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import mwapi_rows, sq
W = '/home/claude/winesite/work/photos'
M = json.load(open(f'{W}/wd_match.json'))
T = [t for t in json.load(open(f'{W}/targets.json')) if t['type'] == 'grape']
out = json.load(open(f'{W}/grape_pool.json')) if os.path.exists(f'{W}/grape_pool.json') else {}
for t in T:
    if t['id'] in out:
        continue
    cats = [r['cat'] for r in M.get(t['id'], []) if r.get('cat')][:1]
    files = []
    for c in cats:
        q = f'''SELECT ?title ?w ?h ?mime WHERE {{ SERVICE wikibase:mwapi {{ bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
        mwapi:generator "categorymembers"; mwapi:gcmtitle "Category:{sq(c)}"; mwapi:gcmtype "file"; mwapi:gcmlimit "200";
        mwapi:prop "imageinfo"; mwapi:iiprop "size|mime".
        ?title wikibase:apiOutput mwapi:title. ?w wikibase:apiOutput "imageinfo/ii/@width". ?h wikibase:apiOutput "imageinfo/ii/@height". ?mime wikibase:apiOutput "imageinfo/ii/@mime". }} }}'''
        for r in mwapi_rows(q, expect_nonempty=True, tries=2):
            files.append({'t': r['title'], 'w': int(r.get('w') or 0), 'h': int(r.get('h') or 0), 'mime': r.get('mime', ''), 'cat': c})
    out[t['id']] = files
    json.dump(out, open(f'{W}/grape_pool.json', 'w'), ensure_ascii=False)
print(len(out), sum(len(v) for v in out.values()))
