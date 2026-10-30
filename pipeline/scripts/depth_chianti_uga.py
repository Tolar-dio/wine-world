# Chianti Classico UGAs (Unità Geografiche Aggiuntive, disciplinare DOCG Chianti Classico, art. 7 c.4 and
# Allegato 3, DM 22.06.2023) -> appended to site/data/geo/it_fine.geojson (src "rtvini")
#  - Production zone: Regione Toscana "Zone di produzione vini" (geoscopio, zo_vin_nom_zon_2026_05, CC BY 4.0),
#    the real Chianti Classico DOCG boundary (not the commune union).
#  - Comuni: Regione Toscana "Ambiti amministrativi" (am_com_multipart, CC BY), EPSG:3003.
#  - Rivers, roads and places for the Allegato 3 lines inside Greve and Castelnuovo Berardenga: OpenStreetMap via
#    Nominatim (ODbL): Torrente Greve (rel 2573982), Arbia (rel 2573899), Fosso delle Spugne, Borro della Rimbecca,
#    SP 118 Panzano-Testalepre, hamlets.
#  Castellina, Gaiole, Radda = comune (official). San Casciano, San Donato in Poggio = DOCG zone x comuni (official).
#  Castelnuovo Berardenga / Vagliagli = DOCG zone in that comune split along the Arbia (approx).
#  Greve / Montefioralle / Panzano / Lamole = Greve comune split along the Greve, Fosso delle Spugne, Borro della
#  Rimbecca, SP 118 and a polyline through the Allegato 3 localities for Lamole's northern edge (approx).
# Usage: python3 -I scripts/depth_chianti_uga.py [--plot]
import sys, glob, hashlib
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
import geopandas as gpd
from shapely.geometry import shape, LineString, Point, MultiLineString
from shapely.ops import linemerge, polygonize, unary_union, nearest_points

SRC = 'rtvini'
NOM = RAW + '/osm_nominatim_depth'
T_4326_3003 = Transformer.from_crs(4326, 3003, always_xy=True)
T_3003_4326 = Transformer.from_crs(3003, 4326, always_xy=True)


def nom(q, pick=None):
    fn = f'{NOM}/{hashlib.md5(q.encode()).hexdigest()[:12]}.json'
    res = json.load(open(fn))['res']
    for r in res:
        if pick is None or pick(r):
            return reproj(shape(r['geojson']), T_4326_3003), r
    raise KeyError(q)


def pt(q):
    g, r = nom(q, lambda r: r['geojson']['type'] == 'Point' or r['class'] == 'place')
    return g.centroid if g.geom_type != 'Point' else g


def extend(line, d=3000):
    """extend both ends of a LineString by d metres along the end segments."""
    c = list(line.coords)
    def ext(a, b):
        dx, dy = b[0] - a[0], b[1] - a[1]
        n = (dx * dx + dy * dy) ** 0.5 or 1
        return (b[0] + dx / n * d, b[1] + dy / n * d)
    return LineString([ext(c[1], c[0])] + c + [ext(c[-2], c[-1])])


def split_by(poly, lines):
    """faces of poly cut by lines (lines are noded against the boundary)."""
    net = unary_union([poly.boundary] + [l.intersection(poly.buffer(1)) for l in lines])
    faces = [f for f in polygonize(net) if poly.buffer(0.5).contains(f.representative_point())]
    return faces


def main():
    plot = '--plot' in sys.argv
    zv = gpd.read_file(RAW + '/rt_zone_vini/x/zo_vin_nom_zon_2026_05.shp')
    cc = shapely.make_valid(shapely.union_all(list(zv[zv.NOM_ZON == 'CHIANTI CLASSICO'].geometry)))
    com = gpd.read_file(RAW + '/rt_ambiti/y/shapefile/am_com_multipart.shp').set_crs(3003, allow_override=True)
    C = {r.NOME: shapely.make_valid(r.geometry) for r in com.itertuples()}
    print('CC zone km2', round(cc.area / 1e6, 1))
    units = {}
    for name, cm in [('Castellina', 'CASTELLINA IN CHIANTI'), ('Gaiole', 'GAIOLE IN CHIANTI'), ('Radda', 'RADDA IN CHIANTI')]:
        units[name] = (C[cm].intersection(cc), 'official', [cm.title().replace(' In ', ' in ')],
                       f'Allegato 3: the UGA coincides with the administrative boundary of the comune of {cm.title().replace(" In ", " in ")}.')
    units['San Casciano'] = (C['SAN CASCIANO IN VAL DI PESA'].intersection(cc), 'official', ['San Casciano in Val di Pesa'],
                             'Allegato 3: the DOCG production-zone limits within the comune of San Casciano in Val di Pesa.')
    units['San Donato in Poggio'] = (shapely.union_all([C['BARBERINO TAVARNELLE'], C['POGGIBONSI']]).intersection(cc), 'official',
                                     ['Barberino Tavarnelle', 'Poggibonsi'],
                                     'Allegato 3: the DOCG production-zone limits within the comuni of Barberino and Tavarnelle (now Barberino Tavarnelle) and Poggibonsi.')
    # ---- Castelnuovo Berardenga / Vagliagli: split along the Arbia
    cb = C['CASTELNUOVO BERARDENGA'].intersection(cc)
    arbia, _ = nom('Arbia', lambda r: r['osm_type'] == 'relation' and r['class'] == 'waterway')
    arbia = linemerge(arbia) if arbia.geom_type == 'MultiLineString' else arbia
    parts = list(getattr(arbia, 'geoms', [arbia]))
    arbia_l = max(parts, key=lambda l: l.intersection(cb).length)
    faces = split_by(cb, [extend(arbia_l, 200)])
    vag = pt('Vagliagli')
    west = [f for f in faces if f.centroid.x < arbia_l.interpolate(arbia_l.project(f.centroid)).x]
    east = [f for f in faces if f not in west]
    print('  Castelnuovo faces', len(faces), 'west', round(sum(f.area for f in west) / 1e6, 1), 'east', round(sum(f.area for f in east) / 1e6, 1),
          'Vagliagli in west:', any(f.contains(vag) for f in west))
    units['Vagliagli'] = (shapely.union_all(west), 'approx', ['Castelnuovo Berardenga'],
                          'Allegato 3: from the Pianella bridge of SP 62 over the Arbia, the comune boundary on the western side to the Borro di Querciola, then the Arbia. Drawn as the DOCG zone in Castelnuovo Berardenga west of the Arbia (OpenStreetMap river line); the Borro di Querciola segment is not modelled.')
    units['Castelnuovo Berardenga'] = (shapely.union_all(east), 'approx', ['Castelnuovo Berardenga'],
                                       'Allegato 3: from the Pianella bridge of SP 62 over the Arbia, the comune boundary to the north-east, then the Arbia. Drawn as the DOCG zone in Castelnuovo Berardenga east of the Arbia (OpenStreetMap river line).')
    # ---- Greve split
    gv = C['GREVE IN CHIANTI'].intersection(cc)
    greve_r, _ = nom('Greve river Tuscany', lambda r: r['osm_type'] == 'relation')
    greve_r = linemerge(greve_r) if greve_r.geom_type == 'MultiLineString' else greve_r
    gparts = list(getattr(greve_r, 'geoms', [greve_r]))
    greve_l = max(gparts, key=lambda l: l.intersection(gv).length)
    spugne, _ = nom('Fosso delle Spugne, Greve in Chianti', lambda r: 'Greve in Chianti' in r['display_name'])
    rimb, _ = nom('Borro della Rimbecca')
    sp118, _ = nom('Strada Provinciale 118, Greve in Chianti', lambda r: 'Panzano - Testalepre' in r['display_name'])
    sp118 = linemerge(sp118) if sp118.geom_type == 'MultiLineString' else sp118
    pernano = pt('Punta Pernano')
    castn = pt('Castellinuzza, Greve in Chianti')
    smich, _ = nom('San Michele, Greve in Chianti')
    smich = smich.centroid
    seeds = {'Montefioralle': pt('Montefioralle'), 'Panzano': pt('Panzano in Chianti'), 'Lamole': pt('Lamole'),
             'Greve': pt('Greve in Chianti')}

    def ew_line(coords):
        """order a roughly east-west polyline from west to east"""
        c = list(coords)
        return c if c[0][0] <= c[-1][0] else c[::-1]

    # Spugne: from the west comune boundary east to the Greve river
    sc = ew_line(spugne.coords)
    sp_line = LineString([(sc[0][0] - 1500, sc[0][1])] + sc + [nearest_points(greve_l, Point(sc[-1]))[0].coords[0]])
    # south line of Montefioralle: Greve river <- Borro della Rimbecca <- Punta Pernano <- SP 118 west to the boundary
    rc = ew_line(rimb.coords)
    s118 = ew_line(sp118.coords)
    k = min(range(len(s118)), key=lambda i: Point(s118[i]).distance(pernano))
    south = LineString([(s118[0][0] - 1500, s118[0][1])] + s118[:k + 1] + [pernano.coords[0]] + rc +
                       [nearest_points(greve_l, Point(rc[-1]))[0].coords[0]])
    # Lamole's northern edge: Greve river -> Castellinuzza -> Fattoria di San Michele -> east boundary
    lam_line = LineString([nearest_points(greve_l, castn)[0].coords[0], castn.coords[0], smich.coords[0],
                           (smich.x + 3000, smich.y)])
    river = extend(greve_l, 3000)

    def side(line, p):
        """+1 / -1 depending on which side of the line p lies (cross product with the nearest segment)"""
        d = line.project(p)
        a = line.interpolate(max(d - 5, 0)); b = line.interpolate(min(d + 5, line.length))
        return 1 if (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x) > 0 else -1

    def y_at(line, x, p):
        v = LineString([(x, -1e7), (x, 1e8)]).intersection(line)
        if v.is_empty:
            return line.interpolate(line.project(p)).y
        ys = [q.y for q in getattr(v, 'geoms', [v]) if hasattr(q, 'y')]
        return min(ys, key=lambda y: abs(y - p.y)) if ys else line.interpolate(line.project(p)).y

    west_sign = side(river, seeds['Montefioralle'])
    faces = split_by(gv, [river, sp_line, south, lam_line])
    assign = {}
    for f in faces:
        c = f.representative_point()
        if side(river, c) == west_sign:
            if c.y > y_at(sp_line, c.x, c):
                assign[id(f)] = 'Greve'
            elif c.y > y_at(south, c.x, c):
                assign[id(f)] = 'Montefioralle'
            else:
                assign[id(f)] = 'Panzano'
        else:
            assign[id(f)] = 'Lamole' if c.y < y_at(lam_line, c.x, c) else 'Greve'
    for k2 in ['Greve', 'Montefioralle', 'Panzano', 'Lamole']:
        g = shapely.union_all([f for f in faces if assign[id(f)] == k2])
        print(f'  {k2}: {g.area/1e6:.1f} km2, holds its village: {g.buffer(150).contains(seeds[k2])}')
    notes = {
        'Greve': 'Allegato 3: from the confluence of the Fosso delle Spugne with the Torrente Greve, along the Greve and a series of tracks and borri (Lamole, Castellinuzza, Prenzano, Poggio Corvo, Fattoria di San Michele, Pian dell\'Ospedale), then the comune boundary. Drawn as the rest of the Greve comune after the three hamlet UGAs.',
        'Montefioralle': 'Allegato 3: from Casa La Paurosa on SP 118 along the comune boundary, the Fosso delle Fontanelle and Fosso delle Spugne to the Greve, then the Borro della Rimbecca, Punta Pernano and SP 118. Drawn with OpenStreetMap lines for the Spugne, the Greve, the Rimbecca and SP 118.',
        'Panzano': 'Allegato 3: from Casa La Paurosa along the comune boundary to Il Sodo, the Bracciano road, the Torrente Greve, the Borro della Rimbecca, Punta Pernano and SP 118. Drawn as the part of the comune west of the Greve and south of the Rimbecca / SP 118 line.',
        'Lamole': 'Allegato 3: from Il Sodo on the Strada comunale di Bracciano, the Greve north to the Borro della Luicella near Molino delle due Colte, then tracks and borri closing on the comune boundary. Drawn as the part of the comune east of the Greve and south of a line through Castellinuzza, San Michele and Pian dell\'Ospedale (the Luicella and Prenzano are not in OpenStreetMap).',
    }
    for k in ['Greve', 'Montefioralle', 'Panzano', 'Lamole']:
        units[k] = (shapely.union_all([f for f in faces if assign[id(f)] == k]), 'approx', ['Greve in Chianti'], notes[k])
    # ---- features
    taken = all_ids(SRC)
    feats = []
    tot = 0
    for k, (g, bq, comuni, note) in units.items():
        g = clean_projected(shapely.make_valid(g), min_hole_km2=0.05, min_part_km2=0.05)
        a = g.area / 1e6
        tot += a
        g4 = polys_only(shapely.make_valid(reproj(g, T_3003_4326)))
        fid = unique_id(f'it-chianti-classico-{slug(k)}', taken)
        feats.append({'id': fid, 'name': k, 'alt': [f'Chianti Classico {k}', f'UGA {k}'], 'country': 'it', 'cat': 'DOCG',
                      'subcat': 'UGA', 'src': SRC, 'bq': bq, 'area': round(a, 1), 'parent': 'it-chianti-classico',
                      'styles': ['red'], 'varieties': ['Sangiovese'],
                      'reg': {'doc': 'Chianti Classico', 'comuni': comuni, 'use': 'Gran Selezione (disciplinare art. 7 c.4)',
                              'rule': 'DM 22.06.2023 (G.U. 152, 01.07.2023), disciplinare art. 7 c.4, Allegato 3', 'note': note},
                      '_g': g4})
    print('  UGA total km2', round(tot, 1), 'vs zone', round(cc.area / 1e6, 1))
    if plot:
        import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(9, 12))
        for f in feats:
            gs = getattr(f['_g'], 'geoms', [f['_g']])
            for p in gs:
                if p is not None:
                    ax.fill(*p.exterior.xy, alpha=0.5)
            c = f['_g'].representative_point(); ax.text(c.x, c.y, f['name'], fontsize=8)
        for l in [greve_l, arbia_l, sp_line, south, lam_line]:
            for ll in getattr(l, 'geoms', [l]):
                ll4 = reproj(ll, T_3003_4326); ax.plot(*ll4.xy, 'k-', lw=0.6)
        ax.set_aspect(1.4)
        fig.savefig(DWORK + '/chianti_uga.png', dpi=110)
    out = finish_feats(feats, 'ccuga', 15)
    append_fine('it', out, replace_src=SRC)


if __name__ == '__main__':
    main()
