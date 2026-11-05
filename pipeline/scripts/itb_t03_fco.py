# T03: Friuli Colli Orientali sottozone (disciplinare Allegati, art. 3) and Verdicchio dei Castelli di Jesi Classico.
# Usage: python3 -I scripts/itb_t03_fco.py
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_zone as Zn
import itb_common as C
import shapely
from shapely.geometry import shape

D = Zn.init(['fco_s', 'fco_n'])
from itb_zone import S, J, PL, F, W, L, LL, loop, shared


def parent(pid):
    fc = json.load(open(C.GEO + '/it.geojson'))
    for f in fc['features']:
        if f['properties']['id'] == pid:
            return C.to3035(shapely.make_valid(shape(f['geometry'])))
    raise KeyError(pid)


def onway(regex, near=None):
    g = S(regex)
    if near is None:
        return g.interpolate(0.5, normalized=True) if g.geom_type == 'LineString' else g.centroid
    return C.nearest_points(g, near)[0]


def z_cialla():
    pr = C.comune('Prepotto'); cv = C.comune('Cividale del Friuli')
    c0 = C.junction(S('Castelmonte|Mezzomonte|SP31'), shared(pr, cv), LL(13.47, 46.085))
    mez = onway('Mezzomonte', LL(13.485, 46.088))
    q612 = LL(13.497, 46.083)        # quota 612 on the S. Pietro di Chiazzacco - Castelmonte road
    chi = PL('San Pietro di Chiazzacco')
    q294 = LL(13.489, 46.0715)       # quota 294 above Casali Magnana and the Case sotto S. Pietro
    bar = C.nearest_points(shared(pr, cv), PL('^Barbianis$'))[0]
    return loop([(c0, ('r', 'Castelmonte|Mezzomonte|SP31')), (mez, ('l',)), (q612, ('l',)), (chi, ('l',)), (q294, ('l',)),
                 (bar, ('b', pr, cv))])


def z_rosazzo():
    ma = C.comune('Manzano'); pm = C.comune('Premariacco'); co = C.comune('Corno di Rosazzo'); sg = C.comune('San Giovanni al Natisone')
    sw = LL(13.3905, 46.0080)        # Strada del Sole at Rio Case (Manzano)
    ole = onway('Via Oleis', LL(13.395, 46.017))
    pgb = onway('Poggiobello', LL(13.398, 46.024))
    b1 = C.nearest_points(shared(ma, pm), LL(13.405, 46.032))[0]
    b2 = C.junction(shared(ma, pm), shared(ma, co), b1)
    nag = C.nearest_points(shared(ma, co), LL(13.4195, 46.0110))[0]
    abz = onway('^Via Abbazia$', LL(13.414, 46.006))
    mas = onway('Masarotte', LL(13.41, 46.0))
    rsg = C.nearest_points(S('San Giovanni', 'waterway'), LL(13.400, 45.999))[0]
    return loop([(sw, ('l',)), (ole, ('l',)), (pgb, ('l',)), (b1, ('b', ma, pm)), (b2, ('b', ma, co)), (nag, ('l',)),
                 (abz, ('l',)), (mas, ('l',)), (rsg, ('l',))])


def main():
    out = {}
    par = parent('it-friuli-colli-orientali')
    ci = C.clean(z_cialla(), 5000, 5000)
    ro = C.clean(z_rosazzo(), 5000, 5000)
    out['cialla'] = ci
    out['rosazzo'] = ro
    out['prepotto'] = C.clean(C.comune('Prepotto').intersection(par).difference(ci.buffer(1)))
    out['faedis'] = C.clean(C.comuni_union(['Faedis', 'Nimis', 'Attimis', 'Torreano', 'Povoletto', 'Tarcento']).intersection(par))
    for k, g in out.items():
        print(k, round(g.area / 1e6, 2), 'km2', g.geom_type)
    json.dump({k: shapely.geometry.mapping(C.to4326(g)) for k, g in out.items()}, open(C.WORKB + '/t03_fco.json', 'w'))


if __name__ == '__main__':
    main()
