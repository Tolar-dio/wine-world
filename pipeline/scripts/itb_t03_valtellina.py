# T03: Valtellina Superiore sottozone (disciplinare art. 3, sottozone a-e). Waypoint tracing on OSM roads, streams
# and places; "piede della falda" and footpath stretches are straight segments (bq approx).
# Usage: python3 -I scripts/itb_t03_valtellina.py [zone ...]
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_zone as Zn
import itb_common as C
import shapely

D = Zn.init(['valt_w', 'valt_e'])
from itb_zone import S, J, PL, F, W, L, LL, loop, shared


def nearp(regex, pt, kind='highway'):
    return C.nearest_points(S(regex, kind), pt)[0]


def z_maroggia():
    st = nearp('.', LL(9.7215, 46.1795))         # Valle Serada at the Regoledo - Monastero road
    mo = PL('^Monastero$'); ma = PL('^Maroggia$'); ere = PL('^Ere$'); pe = PL('^Pedemonte$'); cf = PL('^Camp Fop$')
    va = nearp('Valeriana', LL(9.7215, 46.1725))
    return loop([(st, ('r', 'Monastero')), (mo, ('l',)), (ma, ('l',)), (ere, ('l',)), (pe, ('l',)), (cf, ('l',)),
                 (va, ('l',))])


def z_sassella():
    sa = PL('*^Santuario della Sassella$')
    a = nearp('SS38|Stelvio', sa)
    cas = PL('^Castellina$')
    vb = J('Valeriana', 'Bernina', LL(9.875, 46.168))
    sb = PL('^San Bartolomeo$', LL(9.866, 46.174))
    an = PL("^Sant'Anna$", LL(9.852, 46.173))
    so = C.comune('Sondrio'); ca = C.comune('Castione Andevenno')
    tass = C.nearest_points(shared(so, ca), LL(9.845, 46.177))[0]
    mar = PL('*^Martinelli$')
    mor = PL('^Moroni$', LL(9.813, 46.172))
    gr = PL('^Grigioni$')
    vg = nearp('Valeriana', gr)
    return loop([(a, ('r', 'SS38|Stelvio')), (cas, ('r', 'Valeriana')), (vb, ('r', 'Bernina')), (sb, ('r', 'Triangia')),
                 (an, ('l',)), (tass, ('l',)), (mar, ('r', 'Moroni')), (mor, ('l',)), (gr, ('l',)), (vg, ('l',)), (sa, ('l',))])


def z_grumello():
    so = C.comune('Sondrio'); mo = C.comune('Montagna in Valtellina')
    lu = J('Lusardi', 'Brennero', LL(9.88, 46.172))
    vi = onway('Visciastro')
    b38 = C.junction(S('SS38|Stelvio'), shared(so, mo), LL(9.90, 46.170))
    tr = PL('^Trippi$'); cf = PL('^Cà Farina$')
    dv = C.nearest_points(S('Davaglione', 'waterway'), LL(9.912, 46.174))[0]
    db = C.junction(S('Davaglione', 'waterway'), S('SP21|Madonnina|Panoramica'), LL(9.91, 46.18))
    md = PL('^Madonnina$', LL(9.894, 46.18)); po = PL('^Ponchiera$')
    ra = onway('Rasella'); ar = onway('Arquino', LL(9.88, 46.18))
    return loop([(lu, ('r', 'Brennero|Visciastro')), (vi, ('r', 'Visciastro|SS38|Stelvio')), (b38, ('l',)), (tr, ('l',)),
                 (cf, ('l',)), (dv, ('w', 'Davaglione')), (db, ('r', 'SP21|Madonnina')), (md, ('l',)), (po, ('r', 'Rasella')),
                 (ra, ('r', 'Arquino')), (ar, ('r', None))])


def z_inferno():
    d0 = C.junction(S('Davaglione', 'waterway'), S('Valeriana'), LL(9.912, 46.168))
    cv = PL('*^Calvario$'); me = onway('Menatti'); st = PL('*Agriturismo San Tommaso')
    tre = PL('^Tresivio$'); pog = PL('^Poggiridenti$')
    d1 = C.junction(S('Davaglione', 'waterway'), S('SP21|Tresivio|Panoramica'), LL(9.915, 46.177))
    pal = nearp('Valeriana', LL(9.938, 46.170))
    return loop([(d0, ('r', 'Valeriana|Conforti|Pignotti')), (pal, ('l',)), (cv, ('l',)), (me, ('r', 'Menatti')),
                 (st, ('r', None)), (tre, ('r', 'SP21|Tresivio')), (pog, ('r', 'SP21|Tresivio')), (d1, ('w', 'Davaglione'))])


def z_valgella():
    r0 = C.junction(S('Rogna', 'waterway'), S('Valeriana'), LL(10.0, 46.165))
    sg = nearp('SS38|Stelvio', PL('*^San Giacomo di Teglio$'))
    tr = J('SS38|Stelvio', 'SS39', PL('^Tresenda$'))
    som = PL('^Somasassa$'); sgv = PL('^San Gervasio$'); cv = PL('^Castelvetro$')
    sp = nearp('SP21|per Teglio', LL(10.040, 46.172))
    sp2 = nearp('SP21|per Teglio', LL(10.015, 46.176))
    r1 = C.junction(S('Rogna', 'waterway'), S('SP21|per Teglio'), sp2)
    sb = PL('*^San Bartolomeo$', LL(10.005, 46.1715))
    cn = PL('^Castionetto$')
    luc = LL(9.995, 46.168)
    return loop([(r0, ('r', 'Valeriana|Nigola')), (sg, ('r', 'SS38|Stelvio')), (tr, ('l',)), (som, ('l',)), (sgv, ('l',)),
                 (cv, ('r', 'SP21|per Teglio')), (sp, ('r', 'SP21|per Teglio')), (sp2, ('l',)), (r1, ('w', 'Rogna')),
                 (sb, ('l',)), (luc, ('l',))])


def onway(regex, near=None):
    g = S(regex)
    if near is None:
        return g.interpolate(0.5, normalized=True) if g.geom_type == 'LineString' else g.centroid
    return C.nearest_points(g, near)[0]


ZONES = {k[2:]: v for k, v in dict(globals()).items() if k.startswith('z_')}

if __name__ == '__main__':
    import traceback
    out = {}
    try:
        out = json.load(open(C.WORKB + '/t03_valtellina.json'))
    except Exception:
        pass
    for k in sys.argv[1:] or list(ZONES):
        try:
            g = C.clean(ZONES[k](), min_part=5000, min_hole=5000)
        except Exception as ex:
            print('FAIL', k, repr(ex)[:300], traceback.format_exc().splitlines()[-3][:200], flush=True)
            continue
        out[k] = shapely.geometry.mapping(C.to4326(g))
        print(k, round(g.area / 1e6, 2), 'km2', g.geom_type, flush=True)
    json.dump(out, open(C.WORKB + '/t03_valtellina.json', 'w'))
