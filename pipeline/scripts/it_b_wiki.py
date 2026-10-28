# Fetch Italian Wikipedia wikitext for wine denominations (history/decree dates), polite rate.
import json, sys, time, urllib.parse, urllib.request
UA = {'User-Agent': 'VitisMundiAtlas/1.0 (wine atlas research script; low volume)'}
names = [l.strip() for l in open(sys.argv[1], encoding='utf-8') if l.strip()]
out = sys.argv[2]
try: res = json.load(open(out, encoding='utf-8'))
except Exception: res = {}
def get(params):
    url = 'https://it.wikipedia.org/w/api.php?' + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))
        except Exception as e:
            time.sleep(5)
    return None
for n in names:
    if n in res: continue
    base = n.split(' / ')[0].replace('’', "'")
    found = None
    for t in [base + ' (vino)', base]:
        d = get({'action': 'query', 'titles': t, 'redirects': 1, 'prop': 'revisions|coordinates', 'rvprop': 'content', 'rvslots': 'main', 'format': 'json'})
        time.sleep(1.0)
        if not d: continue
        for pid, p in d.get('query', {}).get('pages', {}).items():
            if pid == '-1' or 'revisions' not in p: continue
            txt = p['revisions'][0]['slots']['main']['*']
            if 'DOC' in txt or 'denominazione' in txt.lower() or 'disciplinare' in txt.lower():
                found = {'title': p['title'], 'text': txt[:20000], 'coords': p.get('coordinates')}
                break
        if found: break
    res[n] = found
    json.dump(res, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
print('done', len(res), sum(1 for v in res.values() if v))
