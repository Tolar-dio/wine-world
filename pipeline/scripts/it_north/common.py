import json, os
OUT='/home/claude/winesite/work/it_north'
os.makedirs(OUT, exist_ok=True)
def A(name, cat, region, sub, created, ha, styles, grapes, summary, terroir, producers, nerd, official=None, match=(), contains=None, dom=None):
    m=[]
    if official:
        m.append(official); m += [p.strip() for p in official.split(' / ')]
    m.append(name); m += list(match)
    mm=[]
    for x in m:
        if x not in mm: mm.append(x)
    d=dict(country='it', name=name, match=mm, cat=cat, region=region, subregion=sub, created=created, area_ha=ha,
           styles=styles, dominant_style=dom or styles[0], grapes=grapes, summary=summary, terroir=terroir,
           producers=list(producers), nerd_note=nerd)
    if contains: d['contains']=contains
    return d
def S(slug, name, kind, cls, app, lat, lon, q, text, producers=()):
    d=dict(id='site-it-'+slug, country='it', name=name, kind=kind, appellation=app, lat=round(lat,4), lon=round(lon,4), coord_quality=q, text=text, producers=list(producers))
    d['class']=cls
    return d
def R(name, alt, parent, lat, lon, zoom, tagline, summary, history, terroir, grapes, styles, classification, apps, sources):
    return dict(country='it', name=name, alt=alt, parent_region=parent, lat=lat, lon=lon, zoom=zoom, tagline=tagline, summary=summary,
                history=history, terroir=terroir, grapes=grapes, styles=styles, classification=classification, appellations=apps,
                sources=[dict(title=t, url=u) for t,u in sources])
def save(part, regions=(), apps=(), sites=()):
    json.dump(dict(countries=[], regions=list(regions), appellations=list(apps), sites=list(sites)), open(f'{OUT}/{part}.json','w'), ensure_ascii=False, indent=1)
    print(part, len(regions), len(apps), len(sites))
