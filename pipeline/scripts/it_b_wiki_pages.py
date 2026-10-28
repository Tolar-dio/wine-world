# Fetch specific Wikipedia pages (wikitext) for history facts. Args: lang outjson title1 title2 ...
import json, sys, time, urllib.parse, urllib.request
UA = {'User-Agent': 'VitisMundiAtlas/1.0 (wine atlas research script; low volume)'}
lang, out = sys.argv[1], sys.argv[2]
try: res = json.load(open(out, encoding='utf-8'))
except Exception: res = {}
for t in sys.argv[3:]:
    url = f'https://{lang}.wikipedia.org/w/api.php?' + urllib.parse.urlencode({'action':'query','titles':t,'redirects':1,'prop':'extracts|coordinates','explaintext':1,'format':'json'})
    try:
        d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))
        for pid,p in d['query']['pages'].items():
            res[t] = {'title': p.get('title'), 'text': p.get('extract','')[:60000], 'coords': p.get('coordinates')}
    except Exception as e:
        res[t] = {'error': str(e)}
    json.dump(res, open(out,'w',encoding='utf-8'), ensure_ascii=False)
    time.sleep(1.5)
print('ok', len(res))
