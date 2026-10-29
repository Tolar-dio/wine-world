#!/usr/bin/env python3
"""Crawl 'Quality images of vineyards by country' and 'Featured pictures of vineyards' trees to flag
assessed vineyard photos. Output: work/photos/qi.json {file: [category,...]}"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import mwapi_rows, sq
OUT = '/home/claude/winesite/work/photos/qi.json'

def members(cat):
    q = f'''SELECT ?title WHERE {{ SERVICE wikibase:mwapi {{ bd:serviceParam wikibase:endpoint "commons.wikimedia.org"; wikibase:api "Generator"; wikibase:limit "once";
    mwapi:generator "categorymembers"; mwapi:gcmtitle "{sq(cat)}"; mwapi:gcmtype "subcat|file"; mwapi:gcmlimit "500".
    ?title wikibase:apiOutput mwapi:title. }} }}'''
    return [r['title'] for r in mwapi_rows(q, expect_nonempty=True, tries=3)]

roots = ['Category:Quality images of vineyards by country', 'Category:Quality images of vineyards',
         'Category:Featured pictures of vineyards', 'Category:Valued images of vineyards']
seen, files, queue = set(), {}, [(r, 0) for r in roots]
while queue:
    c, d = queue.pop(0)
    if c in seen:
        continue
    seen.add(c)
    for t in members(c):
        if t.startswith('Category:'):
            if d < 3:
                queue.append((t, d + 1))
        elif t.startswith('File:'):
            files.setdefault(t, []).append(c)
    print(len(seen), c, len(files), flush=True)
json.dump(files, open(OUT, 'w'), ensure_ascii=False)
print('done', len(seen), len(files))
