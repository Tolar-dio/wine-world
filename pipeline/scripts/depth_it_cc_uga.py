# Chianti Classico UGAs in the comune of Greve in Chianti (Greve, Montefioralle, Panzano, Lamole): redrawn along the
# lines of the disciplinare Allegato 3 (DM 22.06.2023, G.U. 152 of 01.07.2023; text from the AIS copy, raw/it_disciplinari).
# Supersedes the Greve part of scripts/depth_chianti_uga.py (do not re-run that script: it would restore the coarser
# lines and, with replace_src='rtvini', drop the other rtvini fine units). The other 7 UGAs are left unchanged.
# Sources:
#  - Regione Toscana: Chianti Classico DOCG zone (rt107 zone di produzione vini, CC BY 4.0) and comuni (CC BY);
#    RETORE (Repertorio Toponomastico Regionale, WFS owsretore, CC BY) for the Allegato 3 toponyms (Le due Colte,
#    Castellinuzza, Prenzano, Le Lastre, Borro dell'Anderiglia, Poggio Corvo, Piano di Lettieri, Fattoria S. Michele,
#    Piano dell'Ospedale, Il Sodo, Casa Le Volpaie, Ponte Nuovo, Punta Pernano, Panzanello, Santa Teresa,
#    Casa Acquadiaccia, Casalone, Le Fate).
#  - OpenStreetMap via Overpass (ODbL): Fiume Greve, Fosso delle Spugne, Borro di Luicella, Borro delle Palacce,
#    Borro delle Ramacce, Borro della Rimbecca, SP 118 Panzano-Testalepre, Via Montefioralle (S.C. del Castello di
#    Montefioralle), Via di Lamole.
#  Stretches with no mapped line (tracks, the Anderiglia, the S. Michele and Pian dell'Ospedale vicinali, the Volpaie
#  fosso, the Acquadiaccia/Casalone farm roads) are straight segments between the named places: bq stays approx.
# Usage: python3 -I scripts/depth_it_cc_uga.py [--plot]
import sys, glob, html
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_it_common import *
from depth_it_overpass import overpass
import geopandas as gpd
from shapely.geometry import LineString, Point, shape
from shapely.ops import linemerge, polygonize, unary_union, nearest_points, substring

T43 = Transformer.from_crs(4326, 3003, always_xy=True)
T34 = Transformer.from_crs(3003, 4326, always_xy=True)
OSMQ = '''[out:json][timeout:240];
(
 way[waterway](43.50,11.24,43.67,11.43);
 way[highway](43.50,11.24,43.67,11.43);
 node[place](43.50,11.24,43.67,11.43);
 node[natural=peak](43.50,11.24,43.67,11.43);
 node[name](43.50,11.24,43.67,11.43);
);
out geom tags;'''


def P(lon, lat):
    return Point(T43.transform(lon, lat))


def retore():
    out = {}
    for fn in glob.glob(RAW + '/rt_retore/tiles/g_*.gml'):
        t = open(fn, encoding='utf-8').read()
        for r in re.findall(r'<gml:pos>([\d.]+) ([\d.]+)</gml:pos>.*?<ms:toponimo>([^<]*)</ms:toponimo>.*?<ms:comune>([^<]*)</ms:comune>', t, re.S):
            out.setdefault(html.unescape(r[2]).upper(), []).append((float(r[1]), float(r[0]), r[3]))
    return out


def osm_lines(js, pred):
    ls = []
    for e in js['elements']:
        if e['type'] == 'way' and pred(e.get('tags', {})):
            ls.append(LineString([T43.transform(p['lon'], p['lat']) for p in e['geometry']]))
    m = linemerge(ls)
    return m


def longest(g):
    return max(getattr(g, 'geoms', [g]), key=lambda l: l.length)


def orient_from(line, p):
    """line oriented so that it starts at the end nearer to p"""
    c = list(line.coords)
    return LineString(c if Point(c[0]).distance(p) <= Point(c[-1]).distance(p) else c[::-1])


def upto(line, p):
    """part of line from its start to the point nearest p"""
    return substring(line, 0, line.project(p))


def onto(line, p):
    return line.interpolate(line.project(p))


def extend_end(coords, d=60):
    (x0, y0), (x1, y1) = coords[-2], coords[-1]
    n = ((x1 - x0) ** 2 + (y1 - y0) ** 2) ** 0.5 or 1
    return coords + [(x1 + (x1 - x0) / n * d, y1 + (y1 - y0) / n * d)]


def main():
    plot = '--plot' in sys.argv
    zv = gpd.read_file(RAW + '/rt_zone_vini/x/zo_vin_nom_zon_2026_05.shp')
    cc = shapely.make_valid(shapely.union_all(list(zv[zv.NOM_ZON == 'CHIANTI CLASSICO'].geometry)))
    com = gpd.read_file(RAW + '/rt_ambiti/y/shapefile/am_com_multipart.shp')
    gv = shapely.make_valid(com[com.NOME == 'GREVE IN CHIANTI'].geometry.iloc[0]).intersection(cc)
    gv = clean_projected(gv, min_hole_km2=0.05, min_part_km2=0.05)
    js = overpass(OSMQ)
    R = retore()

    def rp(name, near=None):
        c = R[name.upper()]
        if near:
            c = sorted(c, key=lambda t: (t[0] - near[0]) ** 2 + (t[1] - near[1]) ** 2)
        return P(c[0][0], c[0][1])

    greve = longest(osm_lines(js, lambda t: t.get('name') == 'Fiume Greve'))
    spugne = longest(osm_lines(js, lambda t: t.get('name') == 'Fosso delle Spugne'))
    luic = longest(osm_lines(js, lambda t: t.get('name') == 'Borro di Luicella'))
    palac = longest(osm_lines(js, lambda t: t.get('name') == 'Borro delle Palacce'))
    rimb = longest(osm_lines(js, lambda t: t.get('name') == 'Borro della Rimbecca'))
    sp118 = longest(osm_lines(js, lambda t: t.get('ref') == 'SP118' and 'Panzano - Testalepre' in t.get('name', '')))
    vmont = osm_lines(js, lambda t: t.get('name') == 'Via Montefioralle' and t.get('highway') == 'tertiary')
    vmont = min(getattr(vmont, 'geoms', [vmont]), key=lambda l: l.distance(P(11.2799, 43.5787)))
    vlam = osm_lines(js, lambda t: t.get('name') == 'Via di Lamole')
    vlam = min(getattr(vlam, 'geoms', [vlam]), key=lambda l: l.distance(P(11.3465, 43.5580)))

    # --- L1 Spugne: west comune edge -> confluence with the Greve
    sc = list(spugne.coords)
    if sc[0][0] > sc[-1][0]:
        sc = sc[::-1]
    conf_sp = onto(greve, Point(sc[-1]))
    L1 = LineString([(sc[0][0] - 1500, sc[0][1])] + sc + [conf_sp.coords[0]])

    # --- L3 Lamole north line (Greve UGA / Lamole)
    lu = orient_from(luic, greve.interpolate(greve.project(P(11.3434, 43.5508))))   # from the confluence upstream
    lu_up = upto(lu, P(11.3494, 43.5559))                                          # to the path going west
    conf_lu = onto(greve, Point(lu_up.coords[0]))
    J = onto(vlam, P(11.3462, 43.5578))           # S.C. di Lamole x vicinale per Casole, SW of Castellinuzza
    corti420 = P(11.3452, 43.5602)                # Comunale delle Corti at 420 m, east of Prenzano
    lastre = rp('LE LASTRE')
    anderiglia_low = P(11.3500, 43.5652)          # Corti road meets the Borro dell'Anderiglia (RETORE label points)
    pa = orient_from(palac, P(11.3571, 43.5659))  # Palacce from its mouth (the Anderiglia) up to its source
    pal_src = Point(pa.coords[-1])
    farm = Point(pal_src.x + 50, pal_src.y)       # 50 m east to the farm road below Poggio Corvo
    ramacce_x = P(11.3782, 43.5552)              # crossing of the Borro delle Ramacce near Piano di Lettieri
    sm839 = P(11.3842, 43.5527)                  # vicinale Lamole - S. Michele at 839 m (W of the Fattoria)
    sw700 = P(11.3787, 43.5482)                  # about 700 m south-west along it
    ospedale = rp("PIANO DELL'OSPEDALE")
    se_end = Point(ospedale.x + 900, ospedale.y - 900)
    L3 = LineString([conf_lu.coords[0]] + list(lu_up.coords) + [J.coords[0], corti420.coords[0], lastre.coords[0],
                     anderiglia_low.coords[0]] + list(pa.coords) + [farm.coords[0], ramacce_x.coords[0],
                     sm839.coords[0], sw700.coords[0], ospedale.coords[0], se_end.coords[0]])

    # --- L5 Lamole / Panzano south line: Il Sodo -> 350 m west on the Bracciano road -> fosso NE to the Greve
    sodo = rp('IL SODO', near=(11.3566, 43.5306))
    volp = rp('CASA LE VOLPAIE')
    conf_vo = onto(greve, volp)
    L5 = LineString([(sodo.x + 400, sodo.y - 150), sodo.coords[0], (sodo.x - 350, sodo.y), conf_vo.coords[0]])

    # --- L4 Montefioralle south and west line: Ponte Nuovo -> Rimbecca -> Pernano crest -> SP118 (1.4 km)
    #     -> Acquadiaccia -> Casalone -> 500 m -> Le Fate -> Via Montefioralle -> SP118 at Casa La Paurosa
    pn = rp('PONTE NUOVO')
    conf_ri = onto(greve, pn)
    ri = orient_from(rimb, conf_ri)
    pernano_path = P(11.2993, 43.5633)            # crest path between Panzanello and Pernano
    pernano_nw = P(11.2944, 43.5632)              # north-west flank of Punta Pernano
    s_teresa = rp('SANTA TERESA')
    d0 = sp118.project(Point(s_teresa.x + 150, s_teresa.y - 200))   # SP118 just south of Santa Teresa
    # SP118 runs north-west from here: walk 1.4 km in the direction of decreasing northing
    dN = d0 - 1400 if sp118.interpolate(d0 - 100).y > sp118.interpolate(d0).y else d0 + 1400
    sp_seg = substring(sp118, d0, dN)
    acqua = rp('C. ACQUADIACCIA')
    nw120 = Point(acqua.x - 85, acqua.y + 85)
    e100 = Point(nw120.x + 100, nw120.y + 5)
    q500 = P(11.2806, 43.5770)
    fate = rp('LE FATE')
    vm_pt = onto(vmont, fate)
    vm = orient_from(vmont, vm_pt)
    # Via Montefioralle from the Le Fate access west to SP118 (Casa La Paurosa)
    west_end = min([Point(vmont.coords[0]), Point(vmont.coords[-1])], key=lambda q: q.x)
    a, b = sorted([vmont.project(vm_pt), vmont.project(west_end)])
    vm_seg = list(substring(vmont, a, b).coords)
    if Point(vm_seg[0]).distance(vm_pt) > Point(vm_seg[-1]).distance(vm_pt):
        vm_seg = vm_seg[::-1]
    L4 = LineString([conf_ri.coords[0]] + list(ri.coords) + [pernano_path.coords[0], pernano_nw.coords[0]] +
                    list(sp_seg.coords) + [acqua.coords[0], nw120.coords[0], e100.coords[0], q500.coords[0],
                                           fate.coords[0]] + extend_end(vm_seg, 80))

    # --- L2 the Greve between the Spugne confluence and the Volpaie confluence
    a, b = sorted([greve.project(conf_sp), greve.project(conf_vo)])
    L2 = substring(greve, a, b)

    lines = [L1, L2, L3, L4, L5]
    net = unary_union([gv.boundary] + [l.intersection(gv.buffer(80)) for l in lines])
    faces = [f for f in polygonize(net) if gv.buffer(1).contains(f.representative_point()) and f.area > 100]
    seeds = {'Greve': [P(11.3169, 43.5875), P(11.2981, 43.6586), P(11.37, 43.60)],
             'Montefioralle': [P(11.3032, 43.5807)],
             'Panzano': [P(11.3159, 43.5449), P(11.3131, 43.5341)],
             'Lamole': [P(11.3583, 43.5519), P(11.3556, 43.5496)]}
    assign = {}
    for i, f in enumerate(faces):
        hit = [k for k, ss in seeds.items() if any(f.contains(s) for s in ss)]
        if len(hit) > 1:
            raise SystemExit(f'face {i} holds seeds of {hit}: lines do not close')
        if hit:
            assign[i] = hit[0]
    # faces without a seed: give them to the neighbour sharing the longest edge that is NOT one of the UGA lines
    uga_lines = unary_union(lines).buffer(3)
    for _ in range(5):
        for i, f in enumerate(faces):
            if i in assign:
                continue
            best, bl = None, 0
            for j, g in enumerate(faces):
                if j == i or j not in assign:
                    continue
                sh = f.boundary.intersection(g.boundary)
                if sh.is_empty:
                    continue
                free = sh.difference(uga_lines).length
                if free > bl:
                    best, bl = j, free
            if best is not None:
                assign[i] = assign[best]
    left = [round(faces[i].area / 1e6, 2) for i in range(len(faces)) if i not in assign]
    if left:
        print('  WARN unassigned faces km2:', left)
    units = {}
    for k in seeds:
        g = shapely.union_all([faces[i] for i in assign if assign[i] == k])
        units[k] = clean_projected(shapely.make_valid(g), min_hole_km2=0.05, min_part_km2=0.05)
        print(f'  {k}: {units[k].area/1e6:.2f} km2')
    tot = sum(u.area for u in units.values())
    print(f'  total {tot/1e6:.2f} vs Greve zone {gv.area/1e6:.2f}')

    notes = {
        'Greve': ('Allegato 3: from the confluence of the Fosso delle Spugne with the Greve, up the river through Greve '
                  'to Molino delle due Colte, then the Lamole line (Borro della Luicella, Strada comunale delle Corti, '
                  'Le Lastre, Borri dell\'Anderiglia and delle Palacce, below Poggio Corvo, the Ramacce near Piano di '
                  'Lettieri, the Lamole - S. Michele and Pian dell\'Ospedale vicinali), then the comune boundary.'),
        'Montefioralle': ('Allegato 3: from Casa La Paurosa (SP 118 x S.C. del Castello di Montefioralle) along the comune '
                          'boundary (SP 118, Fosso delle Fontanelle, Fosso delle Spugne) to the Greve, up the Greve to '
                          'Ponte Nuovo, the whole Borro della Rimbecca, the crest path of Punta Pernano, SP 118 for 1.4 km, '
                          'the Acquadiaccia and Casalone farm roads, Le Fate and the Montefioralle road back to La Paurosa.'),
        'Panzano': ('Allegato 3: from Casa La Paurosa along the comune boundary west, south and east to Il Sodo on the '
                    'Strada comunale di Bracciano, 350 m west, the fosso into the Greve near Casa Le Volpaie, the Greve '
                    'north to Ponte Nuovo, then the Montefioralle line (Rimbecca, Punta Pernano, SP 118, Acquadiaccia, '
                    'Casalone, Le Fate) back to La Paurosa.'),
        'Lamole': ('Allegato 3: from Il Sodo, 350 m west on the Bracciano road, the fosso to the Greve near Casa Le '
                   'Volpaie, the Greve north to the Borro della Luicella at Molino delle due Colte, then the line through '
                   'Castellinuzza, Le Lastre, the Anderiglia and Palacce, Poggio Corvo, Piano di Lettieri and Pian '
                   'dell\'Ospedale, then the comune boundary back to Il Sodo.'),
    }
    method = ('Lines from OpenStreetMap (Greve, Spugne, Luicella, Palacce, Rimbecca, SP 118, Montefioralle road) and '
              'Regione Toscana RETORE toponyms; unmapped tracks and ditches drawn as straight segments between the '
              'named places (about 50 to 150 m uncertainty).')
    path = GEO + '/it_fine.geojson'
    fc = json.load(open(path))
    byid = {f['properties']['id']: f for f in fc['features']}
    feats = []
    for k, g in units.items():
        fid = f'it-chianti-classico-{slug(k)}'
        old = byid[fid]['properties']
        reg = dict(old.get('reg') or {})
        reg['note'] = notes[k]
        reg['method'] = method
        nf = {kk: v for kk, v in old.items() if kk in PROP_ORDER}
        nf.update({'area': round(g.area / 1e6, 1), 'bq': 'approx', 'src': 'rtvini', 'reg': reg,
                   '_g': polys_only(shapely.make_valid(reproj(g, T34)))})
        feats.append(nf)
    feats = finish_feats(feats, 'ccuga2', 12)
    new = {f['id']: f for f in feats}
    out = []
    for f in fc['features']:
        fid = f['properties']['id']
        if fid in new:
            nf = feature_json(new[fid])
            for kk, v in f['properties'].items():   # keep integration keys untouched
                if kk not in nf['properties'] and kk not in ('clim',):
                    nf['properties'][kk] = v
            out.append(nf)
        else:
            out.append(f)
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as fh:
        fh.write('{"type":"FeatureCollection","features":[\n' +
                 ',\n'.join(json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in out) + '\n]}\n')
    os.replace(tmp, path)
    print(f'  {path}: 4 UGAs replaced, {os.path.getsize(path)/1e6:.2f} MB')
    record_ids('cc_uga', [dict(f, _file='it_fine.geojson', _action='geometry redrawn (Allegato 3 lines)') for f in feats])
    if plot:
        import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(11, 12))
        for k, g in units.items():
            for p in getattr(g, 'geoms', [g]):
                ax.fill(*p.exterior.xy, alpha=0.4)
            c = g.representative_point(); ax.text(c.x, c.y, k, fontsize=9)
        for l in lines:
            ax.plot(*l.xy, 'k-', lw=0.7)
        for e in js['elements']:
            t = e.get('tags', {})
            if e['type'] == 'way' and 'waterway' in t:
                xy = [T43.transform(p['lon'], p['lat']) for p in e['geometry']]
                ax.plot([x for x, y in xy], [y for x, y in xy], 'b-', lw=0.3)
        old = shape(byid['it-chianti-classico-lamole']['geometry'])
        for p in getattr(old, 'geoms', [old]):
            xy = [T43.transform(x, y) for x, y in p.exterior.coords]
            ax.plot([x for x, y in xy], [y for x, y in xy], 'r--', lw=0.8)
        b = gv.bounds
        ax.set_xlim(b[0], b[2]); ax.set_ylim(b[1], b[3]); ax.set_aspect(1)
        fig.savefig(DWORK + '/it_cc_uga_greve.png', dpi=90, bbox_inches='tight')


if __name__ == '__main__':
    main()
