# T03: Romagna DOC sottozone (disciplinare DM 22.09.2011 as amended to 2022, Allegati, art. 3 of each sottozona).
# Geometry: ISTAT 2026 comuni for whole-commune parts, OSM roads/streams (traced by itb_trace) for described lines.
# Usage: python3 -I scripts/itb_t03_romagna.py [zone ...]  -> work/italy-bounds/t03_romagna.geojson (3035 in props? no: 4326)
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_trace as T
from itb_areas import AREAS
import shapely
from shapely.geometry import LineString, Point

D = T.Data([k for k in AREAS if k.startswith('rom_')], AREAS)
EMILIA = r'^Via Emilia|^SS ?9$|^Viale Roma$'


def S(regex, kind='highway', **kw):
    return D.sel(regex, kind, **kw)


def J(ra, rb, near=None, ka='highway', kb='highway'):
    if isinstance(near, str):
        near = PL(near)
    return C.junction(S(ra, ka), S(rb, kb), near)


def PL(regex, near=None):
    if isinstance(near, str):
        near = D.place(near)
    return D.place(regex, near, kinds=('place',)) if not regex.startswith('*') else D.place(regex[1:], near)


def F(regex, a, b, kind='highway', fb=6.0):
    pref = S(regex, kind) if regex else shapely.geometry.LineString([(a.x, a.y), (b.x, b.y)])
    return T.follow(pref, a, b, D, fallback_w=fb if regex else 1.0)


def W(regex, a, b):
    return T.follow(S(regex, 'waterway'), a, b, D, fallback_w=10.0, kinds=('waterway',))


def L(a, b):
    return LineString([(a.x, a.y), (b.x, b.y)])


def BD(names, a, b, via=None):
    """Follow comune border(s)."""
    gs = [C.comune(n) for n in names]
    if len(gs) == 2:
        line = gs[0].boundary.intersection(gs[1].buffer(30))
        line = shapely.union_all([line])
        if line.length < 10:
            line = gs[0].boundary
    else:
        line = shapely.union_all([g.boundary for g in gs])
    if via is None:
        return C.path_along(line, a, b)
    return shapely.union_all([C.path_along(line, a, via), C.path_along(line, via, b)])


def below(poly, line_regex, keep_near, ext=3000, ends=None):
    """Cut poly with an (extended) OSM line and keep the side containing keep_near. ends=(a, b): make the line
    continuous from a to b (bridging gaps through the road network) and extend it 3 km past both ends."""
    ln = S(line_regex)
    if ends is not None:
        a, b = ends
        cl = T.follow(ln, a, b, D, fallback_w=4.0, pad=1500)
        cs = list(cl.coords)
        def ext_pt(p, q):
            import math
            dx, dy = p[0] - q[0], p[1] - q[1]; d = math.hypot(dx, dy) or 1
            return (p[0] + dx / d * ext, p[1] + dy / d * ext)
        far = [cs[min(len(cs) - 1, 20)], cs[max(0, len(cs) - 21)]]
        cs = [ext_pt(cs[0], far[0])] + cs + [ext_pt(cs[-1], far[1])]
        ln = LineString(cs)
    ln = shapely.ops.linemerge(ln) if ln.geom_type == 'MultiLineString' else ln
    # polygonize poly boundary + line
    faces = shapely.polygonize([shapely.union_all([poly.boundary, ln])]).geoms
    keep = [f for f in faces if f.representative_point().within(poly)]
    # flood from keep_near: faces connected without crossing the line
    lnb = ln.buffer(2)
    start = min(keep, key=lambda f: f.distance(keep_near))
    out = [start]
    rest = [f for f in keep if f is not start]
    changed = True
    while changed:
        changed = False
        u = shapely.union_all(out)
        for f in list(rest):
            sh = f.boundary.intersection(u.boundary)
            if sh.length > 5 and sh.difference(lnb).length > 5:
                out.append(f); rest.remove(f); changed = True
    return shapely.union_all(out)


Z = {}


def z_bertinoro():
    fp = PL('^Forlimpopoli$')
    p0 = J('Armando Diaz', EMILIA, fp)
    p1 = J('Settecrociari', EMILIA, fp)
    sv = PL('^San Vittore$', 'Cesena')
    mb = J('^Via San Vittore$', 'Montebellino', sv)
    fo = PL('^Formignano$')
    te = PL('^Teodorano$')
    me = PL('^Meldola$')
    mf = J('Meldola Fratta', 'Monte Fratta', me)
    mf2 = J('Monte Fratta', "Tro'? Meldola", me)
    tm = J("Tro'? Meldola", '^Via Meldola$', fp)
    legs = [F(EMILIA, p0, p1), F('Settecrociari', p1, sv), F('San Vittore', sv, mb), F('Montebellino|Formignano', mb, fo),
            F('Formignano|Teodorano', fo, te), F('Meldola - Teodorano|Teodorano', te, me), F('Meldola Fratta', me, mf),
            F('Monte Fratta', mf, mf2), F("Tro'? Meldola", mf2, tm), F('^Via Meldola$|Armando Diaz', tm, p0)]
    return T.chain(legs)


def z_modigliana():
    return C.comune('Modigliana')


_PROV = None


def prov(name):
    global _PROV
    if _PROV is None:
        import geopandas as gpd
        _PROV = gpd.read_file(C.RAWB + '/istat2026/ProvCM01012026/ProvCM01012026_WGS84.shp', encoding='utf-8').to_crs(3035)
    return shapely.make_valid(_PROV[_PROV.DEN_UTS == name].geometry.iloc[0])


def shared(ga, gb):
    line = ga.boundary.intersection(gb.buffer(40))
    return shapely.union_all([line])


def LL(lon, lat):
    return C.P(lon, lat)


def loop(spec):
    """spec: [(point, leg), ...]; leg joins point i to point i+1 (last joins back to first).
    leg: ('r', regex|None) road, ('w', regex) stream, ('b', geomA, geomB) shared border, ('l',) straight."""
    legs = []
    n = len(spec)
    for i, (p, leg) in enumerate(spec):
        q = spec[(i + 1) % n][0]
        k = leg[0]
        if k == 'r':
            legs.append(F(leg[1], p, q) if leg[1] else T.follow(L(p, q), p, q, D, fallback_w=1.0))
        elif k == 'w':
            legs.append(W(leg[1], p, q))
        elif k == 'b':
            legs.append(C.path_along(shared(leg[1], leg[2]), p, q))
        elif k == 'bb':      # boundary of one polygon
            legs.append(C.path_along(leg[1].boundary, p, q))
        else:
            legs.append(L(p, q))
    return T.chain(legs)


def JB(regex, ga, gb, near=None):
    return C.junction(S(regex), shared(ga, gb), near)


def cut_north(poly, regex, south_pt):
    return below(poly, regex, south_pt)


def z_castrocaro():
    cc = C.comune('Castrocaro Terme e Terra del Sole'); fo = C.comune('Forlì')
    a = J('^Via Borsano$', 'Via del Tesoro')
    b = J('^Via Tomba$', 'Via del Tesoro', a)
    c = J('^Via Braga$', 'Via del Partigiano', a)
    d = J('Via del Partigiano', '^Via Gualdo$', a)
    e = J('^Via Ossi$', 'Scaletta', a)
    f = J('Campagna di Roma', 'Framonta', a)
    g = J('Framonta', '^Via Ciola$', a)
    p1 = C.junction(S('^Via Borsano$|SP57'), shared(cc, fo), a)
    p2 = C.junction(S('^Via Ciola$'), shared(cc, fo), g)
    part = loop([(p1, ('r', 'Borsano|SP57')), (a, ('r', 'Tomba|Tesoro')), (b, ('r', 'Tesoro|Braga')),
                 (c, ('r', 'Partigiano')), (d, ('r', 'Gualdo|Ossi')), (e, ('r', 'Scaletta|Campagna di Roma')),
                 (f, ('r', 'Framonta')), (g, ('r', 'Ciola')), (p2, ('b', cc, fo))])
    return shapely.union_all([C.comuni_union(['Rocca San Casciano', 'Dovadola', 'Castrocaro Terme e Terra del Sole']),
                              part.intersection(fo.buffer(50))])


def z_cesena():
    be = C.comune('Bertinoro'); ce = C.comune('Cesena')
    e0 = JB(EMILIA, be, ce)
    e1 = J(EMILIA, 'Cavecchia')
    cal = PL('^Calisese$')
    c1 = J('^Via Calisese$', '^Via Casale$', cal)
    c2 = J('^Via Casale$', '^Via Fageto$', cal)
    c3 = J('^Via Fageto$', 'Rudigliano', cal)
    ard = PL('^Ardiano$')
    bor = PL('^Borello$', LL(12.17, 44.05))
    luz = PL('^Luzzena$')
    form = PL('^Formignano$')
    sc = PL('^San Carlo$', LL(12.18, 44.08))
    sv = PL('^San Vittore$', 'Cesena')
    dg = J('Settecrociari|SP51', EMILIA, PL('^Diegaro$'))
    return loop([(e0, ('r', EMILIA)), (e1, ('r', 'Cavecchia')), (cal, ('r', 'Calisese')), (c1, ('r', '^Via Casale$')),
                 (c2, ('r', 'Fageto')), (c3, ('r', 'Rudigliano|SP75')), (ard, ('r', 'SP75|SP138|Rudigliano')),
                 (bor, ('r', 'SP48|Luzzena|Borello')), (luz, ('r', 'SP48|Formignano|Luzzena')),
                 (form, ('r', 'Montebellino|San Carlo')), (sc, ('r', 'San Vittore|San Carlo')),
                 (sv, ('r', 'Settecrociari|SP51')), (dg, ('r', EMILIA))])


def longiano_line():
    """The Longiano/Mercato Saraceno line: Calisese ... Ardiano, Garampa, Montecodruzzo, Ansa, SP11 to Savignano di Rigo."""
    cal = PL('^Calisese$')
    return dict(cal=cal, c1=J('^Via Calisese$', '^Via Casale$', cal), c2=J('^Via Casale$', '^Via Fageto$', cal),
                c3=J('^Via Fageto$', 'Rudigliano', cal), ard=PL('^Ardiano$'), mcd=PL('^Montecodruzzo$'),
                qua=J("Ca' di Quaiotto", 'Via Ansa|Montegelli', PL('^Montegelli$')),
                mg=PL('^Montegelli$'), ro=PL('^Rontagnano$'), ba=PL('^Barbotto$'), sr=PL('^Savignano di Rigo$'))


def z_longiano():
    fc = prov('Forlì-Cesena'); rn = prov('Rimini')
    e1 = J(EMILIA, 'Cavecchia')
    pm = C.junction(S(EMILIA), shared(fc, rn), LL(12.42, 44.10))
    k = longiano_line()
    sr_b = C.nearest_points(shared(fc, rn), k['sr'])[0]
    return loop([(e1, ('r', EMILIA)), (pm, ('b', fc, rn)), (sr_b, ('l',)), (k['sr'], ('r', 'SP11|Barbotto|Rontagnano')),
                 (k['ba'], ('r', 'SP11|Rontagnano')), (k['ro'], ('r', 'SP11|Montegelli')), (k['mg'], ('r', 'SP11|Montegelli')),
                 (k['qua'], ('r', 'Ansa|Montecodruzzo')), (k['mcd'], ('r', 'Garampa')), (k['ard'], ('r', 'Rudigliano|SP75')),
                 (k['c3'], ('r', 'Fageto')), (k['c2'], ('r', '^Via Casale$')), (k['c1'], ('r', 'Calisese')),
                 (k['cal'], ('r', 'Cavecchia|Calisese'))])


def z_oriolo():
    cc = C.comune('Castrocaro Terme e Terra del Sole'); fa = C.comune('Faenza')
    ra = prov('Ravenna'); fc = prov('Forlì-Cesena')
    a = J('^Via Santa Lucia$', EMILIA, LL(11.92, 44.27))
    b = J('Braldo', EMILIA, LL(11.95, 44.25))
    c = C.junction(S('Braldo'), cc.boundary, b)
    d = C.junction(cc.boundary, shared(ra, fc), c)
    e = J('Urbiano', 'Samoggia', PL('^Urbiano$'))
    e0 = C.junction(S('Urbiano'), shared(ra, fc), e)
    f = J('Samoggia', '^Via Santa Lucia$', LL(11.90, 44.23))
    return loop([(a, ('r', EMILIA)), (b, ('r', 'Braldo')), (c, ('bb', cc)), (d, ('b', ra, fc)),
                 (e0, ('r', 'Urbiano')), (e, ('r', 'Samoggia')), (f, ('r', 'Santa Lucia'))])


def z_serra():
    cb = PL('^Castel Bolognese$')
    a = J('Casolana|SP306', EMILIA, cb)
    k = J('Casolana|SP306', 'Kennedy', cb)
    g = J('Ghinotta', 'Biancanigo', cb)
    bo = J('^Via Boccaccio$', 'Biancanigo', cb)
    s1 = C.junction(S('^Via Boccaccio$'), S('Senio', 'waterway'), bo)
    ri = C.comune('Riolo Terme'); br = C.comune('Brisighella')
    s2 = C.junction(S('Senio', 'waterway'), shared(ri, br), s1) if shared(ri, br).length > 10 else None
    to = J('^Via Tomba$', '^Via Pediano$', PL('^Pediano$'))
    t0 = C.nearest_points(shared(ri, br) if s2 is not None else ri.boundary, to)[0]
    co = J('dei Colli', EMILIA, LL(11.72, 44.35))
    spec = [(a, ('r', 'Casolana|SP306')), (k, ('r', 'Kennedy|Ghinotta')), (g, ('r', 'Biancanigo')), (bo, ('r', 'Boccaccio')),
            (s1, ('w', 'Senio'))]
    if s2 is not None:
        spec += [(s2, ('b', ri, br))]
    spec += [(t0, ('r', 'Tomba')), (to, ('r', 'Pediano|Bergullo|dei Colli')), (co, ('r', EMILIA))]
    return loop(spec)


def z_imola():
    whole = C.comuni_union(['Fontanelice', 'Borgo Tossignano', 'Casalfiumanese'])
    parts = C.comuni_union(['Dozza', 'Castel San Pietro Terme', 'Ozzano dell\'Emilia', 'Imola'])
    south = below(parts, EMILIA, LL(11.62, 44.30), ends=(LL(11.40, 44.46), LL(11.80, 44.31)))
    g = shapely.union_all([whole, south])
    se = Z.get('serra') or z_serra()
    g = g.difference(se.buffer(1))
    # Imola comune east of the Serra line (towards Riolo/Casola) is outside: keep only the part west of it
    im = C.comune('Imola')
    east = im.difference(se)
    return C.clean(g.difference(below(east, 'dei Colli|Bergullo|Pediano|Tomba', LL(11.80, 44.28)).buffer(1))) if False else C.clean(g)


def z_coriano():
    ri = C.comune('Rimini')
    pts = [J('Santa Aquilina', 'Amola', LL(12.53, 44.02)), J('Amola', 'Montevecchio', LL(12.53, 44.02)),
           J('Montevecchio', 'Maceri', LL(12.53, 44.02)), J('Maceri', 'Montescudo', LL(12.53, 44.02)),
           J('Montescudo', 'Tirso', LL(12.53, 44.02)), J('Tirso', '^Via Coriano$', LL(12.53, 44.02)),
           J('^Via Coriano$', 'Santa Aquilina', LL(12.53, 44.02))]
    regs = ['Amola', 'Montevecchio', 'Maceri', 'Montescudo', 'Tirso', 'Coriano', 'Santa Aquilina']
    part = loop([(p, ('r', regs[i])) for i, p in enumerate(pts)])
    return shapely.union_all([C.comune('Coriano'), part.intersection(ri)])


def below16(poly, inland):
    return below(poly, r'^SS ?16$', inland)


def z_san_clemente():
    g = C.comuni_union(['San Clemente', 'Montescudo-Monte Colombo', 'Misano Adriatico', 'San Giovanni in Marignano',
                        'Montefiore Conca', 'Gemmano', 'Morciano di Romagna', 'Saludecio', 'Mondaino', 'Montegridolfo'])
    return below16(g, LL(12.60, 43.92))


def z_verucchio():
    g = C.comuni_union(['Verucchio', 'Santarcangelo di Romagna', 'Poggio Torriana', 'Casteldelci', 'Maiolo', 'Novafeltria',
                        'Pennabilli', 'San Leo', "Sant'Agata Feltria", 'Talamello'])
    ri = below16(C.comune('Rimini'), LL(12.52, 44.02))
    co = Z.get('coriano') or z_coriano()
    ri = ri.difference(co.intersection(C.comune('Rimini')).buffer(1))
    return shapely.union_all([g, ri])


def onway(regex, near=None):
    g = S(regex)
    if near is None:
        return g.interpolate(0.5, normalized=True) if g.geom_type == 'LineString' else g.centroid
    return C.nearest_points(g, near)[0]


def z_marzeno():
    riv = J('Bertella', 'SP16|Via Marzeno')
    c0 = J('Bertella|SP16|Via Marzeno', '^Via Cornacchia$', riv)
    t0 = J('^Via Cornacchia$', '^Via Tuliero$', riv)
    sa = J('^Via Tuliero$', '^Via Sarna$', PL('^Sarna$'))
    fa = C.comune('Faenza'); br = C.comune('Brisighella')
    sb = C.junction(S('Sarna'), shared(fa, br), PL('^Sarna$'))
    pv = C.junction(S('Pian di Vicchio'), shared(fa, br), sb)
    ca = J('Pian di Vicchio', 'Via Carla', pv)
    gb = PL('*^Monte Gebolo$')
    bi = onway('^Via Bicocca$', gb)
    sf = J('^Via Bicocca$', 'Provinciale Faentina|SP20', bi)
    ce = J('Provinciale Faentina|SP20', '^Via Ceparano$', sf)
    al = J('^Via Ceparano$', '^Via Albonello$', PL('*^Albonello$'))
    gab = J('Gabellotta', 'Pietramora', PL('*^Gabellotta$', LL(11.855, 44.195)))
    pi = J('Pietramora', 'Sandrona', LL(11.87, 44.20))
    sm = J('Sandrona', 'Samoggia', LL(11.87, 44.21))
    cn = J('Samoggia', 'Canovetta', LL(11.88, 44.23))
    uc = J('Canovetta', 'Uccellina', LL(11.88, 44.24))
    return loop([(riv, ('r', 'SP16|Via Marzeno')), (c0, ('r', 'Cornacchia')), (t0, ('r', 'Tuliero')), (sa, ('r', 'Sarna')),
                 (sb, ('b', fa, br)), (pv, ('r', 'Pian di Vicchio')), (ca, ('l',)), (gb, ('l',)), (bi, ('r', 'Bicocca')),
                 (sf, ('r', 'Faentina|SP20')), (ce, ('r', 'Ceparano')), (al, ('r', 'Albonello|Gabellotta')),
                 (gab, ('r', 'Pietramora')), (pi, ('r', 'Sandrona')), (sm, ('r', 'Samoggia')), (cn, ('r', 'Canovetta')),
                 (uc, ('r', 'Uccellina|Bertella'))])


def z_brisighella():
    ri = C.comune('Riolo Terme'); cb = C.comune('Castel Bolognese'); fa = C.comune('Faenza'); br = C.comune('Brisighella')
    ra = prov('Ravenna'); fc = prov('Forlì-Cesena'); bo = prov('Bologna')
    rc = shapely.union_all([ri, cb])
    bud = PL('*Sella di Cà Budrio')
    teb = C.junction(S('^Via Tebano$'), shared(fa, cb), PL('*Cimitero di Tebano'))
    cas = PL('^Casale$', LL(11.80, 44.30))
    err = PL('^Errano$')
    sar = PL('*^Parrocchia Sarna$')
    sb = C.junction(S('Sarna|Canaletta'), shared(fa, br), sar)
    pv = C.junction(S('Pian di Vicchio'), shared(fa, br), sb)
    gb = PL('*^Monte Gebolo$')
    so = PL('*^Soglia Nuova$')
    m1 = C.nearest_points(S('Marzeno', 'waterway'), so)[0]
    m2 = C.junction(S('Marzeno', 'waterway'), shared(ra, fc), m1)
    lago = PL('*^Lago di Lago$')
    l1 = C.nearest_points(shared(ra, fc), lago)[0]
    vp = PL('*Chiesa di San Pietro in Valpiana')
    eu = PL("^Sant'Eufemia$")
    pu = PL('*^Purocielo di Sopra$')
    do = PL('*^Donegaglia$')
    sa = PL("*Chiesa di Sant'Andrea in Sintria")
    pa = PL('*^Pagnano$')
    se = C.nearest_points(S('Senio', 'waterway'), pa)[0]
    pr = PL('^Prugno$')
    cbo = C.nearest_points(shared(ra, bo), pr)[0]
    return loop([(bud, ('bb', rc)), (teb, ('r', 'Tebano')), (cas, ('r', 'Casale|SP302|Faentina')), (err, ('r', 'Errano|Canaletta|Sarna')),
                 (sb, ('b', fa, br)), (pv, ('r', 'Pian di Vicchio|Carla')), (gb, ('l',)), (so, ('l',)), (m1, ('w', 'Marzeno')),
                 (m2, ('b', ra, fc)), (l1, ('r', None)), (lago, ('r', None)), (vp, ('r', None)), (eu, ('r', 'Faentina|SP302')),
                 (pu, ('r', 'Purocielo')), (do, ('l',)), (sa, ('r', None)), (pa, ('l',)), (se, ('r', 'Casolana|SP306|Fontanelice')),
                 (pr, ('l',)), (cbo, ('b', ra, bo))])


def z_predappio():
    pdp = C.comune('Predappio'); cc = C.comune('Castrocaro Terme e Terra del Sole'); ga = C.comune('Galeata')
    ss = C.comune('Santa Sofia'); rsc = C.comune('Rocca San Casciano'); pm = C.comune('Premilcuore')
    a = C.junction(S('^Via Tomba$'), cc.boundary, J('^Via Tomba$', 'Via del Tesoro'))
    b = J('Partigiano', "Appennino|SP3", LL(11.98, 44.17))
    sms = PL('^San Martino in Strada$')
    c = J('Monda', 'SP4|Bidente', LL(12.03, 44.17))
    sc = PL('^San Colombano$'); gu = PL('^Gualdo$', LL(12.03, 44.07))
    ba = onway('san Paolo in aquilano')
    vo = PL('^Voltre$', LL(12.04, 44.03))
    bon = PL('*^Bonalda$')
    nes = PL('^Nespoli$')
    civ = PL('^Civitella di Romagna$'); gal = PL('^Galeata$'); pia = PL('^Pianetto$')
    s1 = C.junction(S('SP4'), shared(ga, ss), pia)
    via = C.nearest_points(shared(pdp, rsc), C.P(11.86, 44.07))[0]
    gp = shapely.union_all([ga, pdp])
    edge = shapely.union_all([C.path_along(gp.boundary, s1, via), C.path_along(gp.boundary, via, a)])
    legs = [F('Tomba|Tesoro|Castel Latino|Partigiano', a, b), F('SP3|Appennino', b, sms), F('Monda', sms, c),
            F('SP4|Bidente', c, sc), F('SP4|Colombano', sc, gu), F(None, gu, ba), F('Prati|Voltre|SP68', ba, vo),
            F('Bonalda|Monte Aglio', vo, bon), F('SP4', bon, nes), F('SP4', nes, civ), F('SP4', civ, gal), F('SP4', gal, pia),
            F('SP4', pia, s1), edge]
    part = T.chain(legs)
    return shapely.union_all([pdp, part])


def z_mercato_saraceno():
    k = longiano_line()
    luz = PL('^Luzzena$'); bor = PL('^Borello$', LL(12.17, 44.05))
    ms = C.comuni_union(['Mercato Saraceno', 'Sarsina'])
    ce = C.comune('Cesena'); sar = C.comune('Sarsina')
    sr_b = C.nearest_points(ms.boundary, k['sr'])[0]
    p78 = C.junction(S('SP78'), shared(ce, sar), LL(12.14, 43.98))
    cab = PL('*^Casalbono$')
    mcv = onway('^Via Montecavallo$', cab)
    x = loop([(luz, ('r', 'SP48|Luzzena|Borello')), (bor, ('r', 'SP138|SP75|Rudigliano')), (k['ard'], ('r', 'Garampa')),
              (k['mcd'], ('r', 'Ansa|Montecodruzzo')), (k['qua'], ('r', 'SP11|Montegelli')), (k['mg'], ('r', 'SP11|Montegelli')),
              (k['ro'], ('r', 'SP11|Rontagnano')), (k['ba'], ('r', 'SP11|Barbotto')), (k['sr'], ('l',)),
              (sr_b, ('bb', ms)), (p78, ('r', 'SP78|San Matteo|Lame')), (cab, ('r', 'Casalbono|Montecavallo')),
              (mcv, ('r', 'Montecavallo|SP48|Luzzena'))])
    return shapely.union_all([ms, x])


def z_meldola():
    pdp = Z.get('predappio') or C.clean(z_predappio())
    msz = Z.get('mercato_saraceno') or C.clean(z_mercato_saraceno())
    ber = Z.get('bertinoro') or C.clean(z_bertinoro())
    ss = C.comune('Santa Sofia')
    me = PL('^Meldola$')
    m0 = C.nearest_points(pdp.boundary, me)[0]
    s1 = C.junction(pdp.boundary, ss.boundary, C.P(11.92, 43.97))
    sso = PL('^Santa Sofia$'); sp = PL('^Spinello$'); cv = PL('^Civorio$')
    msc = C.comune('Mercato Saraceno')
    p95 = C.junction(S('SP95'), msc.boundary, cv)
    nb = shapely.union_all([msz, ber])
    legs = [C.path_along(pdp.boundary, m0, s1), F('SP4|Bidente', s1, sso), F('Spinello|SP96', sso, sp),
            F('SP127|SP96|Civorio', sp, cv), F('SP95', cv, p95), C.path_along(nb.boundary, p95, m0)]
    g = T.chain(legs)
    return C.clean(g.difference(shapely.union_all([pdp, msz, ber]).buffer(1)))


ZONES = {k[2:]: v for k, v in dict(globals()).items() if k.startswith('z_')}

if __name__ == '__main__':
    want = sys.argv[1:] or list(ZONES)
    out = {}
    try:
        out = json.load(open(C.WORKB + '/t03_romagna.json'))
    except Exception:
        pass
    import traceback
    for k in want:
        try:
            g = ZONES[k]()
        except Exception as ex:
            print('FAIL', k, repr(ex)[:300], traceback.format_exc().splitlines()[-3][:200], flush=True)
            continue
        g = C.clean(g)
        Z[k] = g
        out[k] = shapely.geometry.mapping(C.to4326(g))
        print(k, round(g.area / 1e6, 2), 'km2', g.geom_type, flush=True)
    json.dump(out, open(C.WORKB + '/t03_romagna.json', 'w'))
