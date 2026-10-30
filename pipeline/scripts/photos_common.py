#!/usr/bin/env python3
"""Shared helpers for the Vitis Mundi photo sidecar (Wikimedia Commons / Wikidata).

Access paths (all read-only, cached on disk under work/photos_cache/):
  * Wikidata Query Service (query.wikidata.org/sparql): entity matching and, through its
    documented MWAPI bridge (wikibase:mwapi), Commons geosearch / categorymembers / search.
  * Commons Action API (commons.wikimedia.org/w/api.php): batched imageinfo (50 titles per
    request, maxlag=5). The gateway allows unauthenticated clients only a few requests per
    minute, so every 429 is honoured with its Retry-After.
Descriptive User-Agent with project URL; sequential requests only.
"""
import hashlib, json, os, re, time, html, unicodedata
import requests

ROOT = '/home/claude/winesite'
CACHE = f'{ROOT}/work/photos_cache'
UA = 'VitisMundiResearch/1.0 (+https://vitismundi.app/)'
S = requests.Session()
S.headers['User-Agent'] = UA
for d in ('sparql', 'api', 'misc'):
    os.makedirs(f'{CACHE}/{d}', exist_ok=True)

STATS = {'sparql': 0, 'sparql_cached': 0, 'api': 0, 'api_cached': 0, 'empty_retry': 0}


def _key(s):
    return hashlib.sha1(s.encode('utf-8')).hexdigest()


def sparql(query, cache=True, timeout=90, min_gap=0.6):
    """Run a SPARQL query; returns list of dict rows (values only)."""
    fn = f'{CACHE}/sparql/{_key(query)}.json'
    if cache and os.path.exists(fn):
        STATS['sparql_cached'] += 1
        return json.load(open(fn))
    for attempt in range(8):
        try:
            r = S.post('https://query.wikidata.org/sparql', data={'query': query},
                       headers={'Accept': 'application/sparql-results+json'}, timeout=timeout)
        except requests.RequestException as e:
            time.sleep(5 + 5 * attempt)
            continue
        STATS['sparql'] += 1
        if r.status_code == 200:
            try:
                rows = [{k: v['value'] for k, v in b.items()} for b in r.json()['results']['bindings']]
            except Exception:
                time.sleep(3 + 3 * attempt)
                continue
            if cache:
                json.dump(rows, open(fn, 'w'))
            time.sleep(min_gap)
            return rows
        if r.status_code in (429, 503, 502, 504, 500):
            ra = r.headers.get('retry-after')
            body = r.text[:400]
            if r.status_code == 500 and ('MalformedQuery' in body or 'must be bound' in body or 'IllegalArgument' in r.text[:3000]):
                raise RuntimeError('SPARQL error: ' + r.text[r.text.find('Exception'):][:600])
            time.sleep(int(ra) if ra and ra.isdigit() else 5 + 5 * attempt)
            continue
        raise RuntimeError(f'SPARQL HTTP {r.status_code}: ' + r.text[r.text.find('Exception'):][:600])
    raise RuntimeError('SPARQL failed after retries')


def mwapi_rows(query, expect_nonempty=True, tries=4):
    """MWAPI calls through WDQS sometimes come back empty when Commons throttles WDQS.
    Retry empty answers a few times (with a nonce so WDQS does not serve its cache)."""
    fn = f'{CACHE}/sparql/{_key(query)}.json'
    if os.path.exists(fn):
        STATS['sparql_cached'] += 1
        return json.load(open(fn))
    rows = []
    for t in range(tries):
        q = f'#nonce {time.time()}\n' + query
        rows = sparql(q, cache=False)
        if rows or not expect_nonempty:
            break
        STATS['empty_retry'] += 1
        time.sleep(2 + 2 * t)
    json.dump(rows, open(fn, 'w'))
    return rows


_last_api = [0.0]


def commons_api(params, cache=True):
    """Direct Commons Action API GET with caching, maxlag and Retry-After handling."""
    p = dict(params)
    p.setdefault('format', 'json')
    p.setdefault('formatversion', '2')
    p['maxlag'] = '5'
    key = json.dumps(sorted(p.items()), ensure_ascii=False)
    fn = f'{CACHE}/api/{_key(key)}.json'
    if cache and os.path.exists(fn):
        STATS['api_cached'] += 1
        return json.load(open(fn))
    for attempt in range(30):
        gap = time.time() - _last_api[0]
        if gap < 1.0:
            time.sleep(1.0 - gap)
        try:
            r = S.post('https://commons.wikimedia.org/w/api.php', data=p, timeout=90)
        except requests.RequestException:
            time.sleep(10)
            continue
        _last_api[0] = time.time()
        STATS['api'] += 1
        if r.status_code == 200:
            d = r.json()
            if 'error' in d and d['error'].get('code') == 'maxlag':
                time.sleep(int(r.headers.get('retry-after', 5)))
                continue
            if cache:
                json.dump(d, open(fn, 'w'))
            return d
        ra = r.headers.get('retry-after')
        time.sleep(int(ra) + 1 if ra and ra.isdigit() else 15)
    raise RuntimeError('Commons API failed after retries')


# ---------------------------------------------------------------- text helpers
def strip_html(s):
    if not s:
        return ''
    s = re.sub(r'<br\s*/?>', ' ', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return ' '.join(s.split())


def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower().replace('ß', 'ss').replace('ø', 'o').replace('æ', 'ae').replace('œ', 'oe').replace('ł', 'l').replace('đ', 'd')
    s = re.sub(r"[’'`´]", '', s)
    s = re.sub(r'[^a-z0-9Ͱ-ϿЀ-ӿ԰-֏Ⴀ-ჿ一-鿿぀-ヿ가-힯]+', ' ', s)
    return ' '.join(s.split())


def sq(s):
    """Escape a string for a SPARQL literal."""
    return s.replace('\\', '\\\\').replace('"', '\\"')


def file_page(title):
    return 'https://commons.wikimedia.org/wiki/' + requests.utils.quote(title.replace(' ', '_'), safe=":/(),'!*&=+$;@")


def haversine(lat1, lon1, lat2, lon2):
    import math
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = p2 - p1
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(min(1, math.sqrt(a)))
