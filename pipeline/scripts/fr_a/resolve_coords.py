import json, sys, unicodedata
G = json.load(open('/home/claude/winesite/work/fr_a/geocode.json'))
def n(s): return unicodedata.normalize('NFKD', s or '').encode('ascii','ignore').decode().lower()
BAD_RETRY = {'cb-le-crock','h-mercier','h-ruinart','h-roederer','h-henriot','l-huet','sw-triguedina','sw-fronton','lr-grange-des-peres','p-pradeaux','cb-reysson','h-taittinger'}
BAD_FIRST = {'suau','le-pin','h-salon','h-taittinger'}
out = {}
def base(slug):
    v = G[slug]; dept = n(v['row']['dept'])
    if slug not in BAD_FIRST and v['hits']:
        h = v['hits'][0]
        if dept.split('-')[0] in n(h['disp']) or 'corse' in n(h['disp']):
            return (h['lat'], h['lon'], 'precise')
    r = v.get('retry') or []
    if slug not in BAD_RETRY and r:
        return (r[0]['lat'], r[0]['lon'], 'approx' if r[0].get('cls') in ('highway',) or 'Rue' in (r[0]['disp'][:25]) or 'Route' in r[0]['disp'][:25] else 'precise')
    c = v.get('commune') or []
    if c: return (c[0]['lat'], c[0]['lon'], 'approx')
    return None
for s in G: out[s] = base(s)
def off(ref, dlat, dlon): a = out[ref]; return (a[0]+dlat, a[1]+dlon, 'approx')
MAN = {
 'leoville-las-cases': (45.1655, -0.7418, 'approx'), 'leoville-poyferre': (45.1641, -0.7430, 'approx'),
 'h-roederer': (49.2603, 4.0398, 'approx'), 'h-taittinger': (49.2449, 4.0478, 'approx'),
 'l-huet': (47.4170, 0.7930, 'approx'), 'l-foreau': (47.4152, 0.7952, 'approx'),
}
out.update(MAN)
out['leoville-barton'] = off('langoa-barton', 0.0012, -0.0020)
for k,(a,b) in {'doisy-daene':(-0.004,0.004),'doisy-dubroca':(-0.002,0.006),'doisy-vedrines':(-0.006,0.007)}.items(): out[k] = off('climens', a, b)
out['romer'] = off('de-malle', -0.004, 0.008); out['romer-du-hayot'] = off('de-malle', -0.005, 0.010)
out['couhins-lurton'] = off('couhins', 0.0010, 0.0015)
out['belair-monange'] = off('ausone', 0.0008, -0.0025)
out['tertre-roteboeuf'] = off('larcis-ducasse', 0.0015, 0.0040)
out['trotanoy'] = off('petrus', -0.0005, -0.0095); out['la-fleur-petrus'] = off('petrus', 0.0012, 0.0012)
out['cb-le-crock'] = off('cos-d-estournel', -0.0040, 0.0060); out['cb-lafitte-carcasset'] = off('calon-segur', 0.0120, -0.0040)
out['h-mercier'] = off('h-moet', -0.0005, 0.0115); out['h-ruinart'] = off('h-veuve-clicquot', 0.0010, 0.0030)
out['h-henriot'] = off('h-krug', 0.0010, 0.0030)
out['le-pin'] = off('vieux-chateau-certan', -0.0012, -0.0030)
out['h-salon'] = off('gc-le-mesnil', 0.0015, -0.0010); out['h-pierre-peters'] = off('gc-le-mesnil', -0.0010, 0.0012)
out['h-egly-ouriet'] = off('gc-ambonnay', 0.0005, 0.0008); out['h-larmandier'] = off('pc-vertus', 0.0006, -0.0006)
res = {k: ([round(v[0],4), round(v[1],4), v[2]] if v else None) for k,v in out.items()}
json.dump(res, open('/home/claude/winesite/work/fr_a/coords.json','w'), indent=0)
import collections
print(collections.Counter((v[2] if v else 'NONE') for v in res.values()))
print('missing:', [k for k,v in res.items() if not v])
# sanity bbox: France metro
print('outside FR:', [k for k,v in res.items() if v and not (41.3<v[0]<51.2 and -5.2<v[1]<9.6)])
