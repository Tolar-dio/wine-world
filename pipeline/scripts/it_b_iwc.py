# Fetch Italian Wine Central denomination synopsis text for each item (polite, cached).
import json, re, html, sys, time, urllib.request
items = json.load(open(sys.argv[1], encoding='utf-8')); out = sys.argv[2]
try: res = json.load(open(out, encoding='utf-8'))
except Exception: res = {}
for it in items:
    if it['name'] in res and res[it['name']]: continue
    url = 'https://italianwinecentral.com/denomination/' + it['slug'] + '/'
    try:
        h = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=40).read().decode('utf-8', 'replace')
        t = re.sub(r'<script.*?</script>|<style.*?</style>', '', h, flags=re.S)
        t = html.unescape(re.sub(r'<[^>]+>', ' ', t)); t = re.sub(r'\s+', ' ', t)
        i = t.find('Synopsis'); j = t.find('Italian Wine Central (IWC) is the leading')
        res[it['name']] = {'url': url, 'text': t[i:j] if i >= 0 else ''}
    except Exception as e:
        res[it['name']] = {'url': url, 'error': str(e)}
    json.dump(res, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    time.sleep(1.0)
print('done', len(res))
