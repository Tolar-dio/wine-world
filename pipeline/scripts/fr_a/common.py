import json, os, re
C = json.load(open('/home/claude/winesite/work/fr_a/coords.json'))
APPROX_FORCE = {'h-charles-heidsieck','cb-du-taillan','l-chidaine','p-pibarnon','p-vignelaure','h-pol-roger','h-krug-clos-du-mesnil','lr-negly','l-belliviere','gc-ambonnay'}
PARTS = '/home/claude/winesite/work/fr_a/parts'
def S(sid, key, name, kind, cls, app, text, producers=None, lat=None, lon=None, q=None):
    if lat is None:
        v = C.get(key)
        if not v: raise SystemExit('no coord for ' + key)
        lat, lon, q0 = v
        q = q or ('approx' if key in APPROX_FORCE else q0)
    d = {"id": "site-fr-" + sid, "country": "fr", "name": name, "kind": kind, "class": cls, "appellation": app,
         "lat": round(lat, 4), "lon": round(lon, 4), "coord_quality": q or 'approx', "text": text}
    if producers: d["producers"] = producers
    return d
def A(name, match, region, subregion, created, area_ha, styles, dominant, grapes, summary, terroir, producers, nerd_note, contains=None, cat="AOC"):
    d = {"country": "fr", "name": name, "match": match, "cat": cat, "region": region, "subregion": subregion,
         "created": created, "area_ha": area_ha, "styles": styles, "dominant_style": dominant, "grapes": grapes,
         "summary": summary, "terroir": terroir, "producers": producers, "nerd_note": nerd_note}
    if contains: d["contains"] = contains
    return d
def R(name, alt, parent, lat, lon, zoom, tagline, summary, history, terroir, grapes, styles, classification, appellations, sources):
    return {"country": "fr", "name": name, "alt": alt, "parent_region": parent, "lat": lat, "lon": lon, "zoom": zoom,
            "tagline": tagline, "summary": summary, "history": history, "terroir": terroir, "grapes": grapes,
            "styles": styles, "classification": classification, "appellations": appellations, "sources": sources}
BANNED = ['delve','robust','seamless','game-changer','unlock','leverage','comprehensive','cutting-edge','transformative','innovative',"it's worth noting",'nestled','boasts','tapestry','testament']
def check(obj):
    s = json.dumps(obj, ensure_ascii=False)
    probs = []
    if '—' in s: probs.append('em dash')
    if '–' in s: probs.append('en dash')
    low = s.lower()
    for b in BANNED:
        if re.search(r'\b' + re.escape(b) + r'\b', low): probs.append(b)
    return probs
def dump(part, regions=(), apps=(), sites=()):
    obj = {"countries": [], "regions": list(regions), "appellations": list(apps), "sites": list(sites)}
    p = check(obj)
    if p: print('WARNING', part, p)
    ids = [x['id'] for x in obj['sites']]
    assert len(ids) == len(set(ids)), 'dup site ids in ' + part
    for x in obj['sites']:
        assert re.fullmatch(r'site-fr-[a-z0-9-]+', x['id']), x['id']
        w = len(x['text'].split())
        if w < 25 or w > 160: print('site words', x['id'], w)
    fn = os.path.join(PARTS, part + '.json')
    json.dump(obj, open(fn, 'w'), ensure_ascii=False, indent=1)
    print(part, 'regions', len(obj['regions']), 'apps', len(obj['appellations']), 'sites', len(obj['sites']))
