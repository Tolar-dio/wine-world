import json, math, sys
d = json.load(open('/home/claude/winesite/site/data/geo/fr_fine.geojson'))
R = 6371008.8
def ring_area(ring):
    # spherical excess approx via projected equal-area (lon*cos(lat0))
    if len(ring) < 3: return 0.0
    lat0 = sum(p[1] for p in ring)/len(ring)
    k = math.cos(math.radians(lat0))
    pts = [(math.radians(x)*R*k, math.radians(y)*R) for x, y in ring[:2] and ring]
    a = 0.0
    for i in range(len(pts)-1):
        a += pts[i][0]*pts[i+1][1] - pts[i+1][0]*pts[i][1]
    return abs(a)/2
def geom_area(g):
    t = g['type']; c = g['coordinates']
    polys = [c] if t == 'Polygon' else c
    tot = 0
    for poly in polys:
        tot += ring_area(poly[0]) - sum(ring_area(h) for h in poly[1:])
    return tot/10000
out = []
for f in d['features']:
    p = f['properties']
    if p.get('subcat') not in ('Premier Cru', 'Grand Cru'): continue
    ha = geom_area(f['geometry'])
    nm = p['name']
    short = nm.split(' premier cru ')[-1] if ' premier cru ' in nm else nm
    out.append(dict(id=p['id'], name=nm, short=short, app=p['reg'].get('dgc_of'), parent=p['parent'], ha=round(ha,2), styles=p.get('styles'), lp=p.get('lp'), subcat=p['subcat']))
json.dump(out, open('/home/claude/winesite/work/depth_burgundy_pc/_units.json','w'), ensure_ascii=False, indent=0)
for o in sorted(out, key=lambda o:(o['app'], o['short'])):
    print(f"{o['app']}|{o['short']}|{o['id']}|{o['parent'].replace('fr-','')}|{o['ha']}|{','.join(o['styles'])}|{o['lp']}")
