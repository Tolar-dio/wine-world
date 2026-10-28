"""Brazil: wine Indicações Geográficas (INPI) with boundaries from Embrapa Uva e Vinho (CNPUV),
published on Embrapa GeoInfo (GeoNode, https://geoinfo.dados.embrapa.br, WFS outputFormat=json).

Official limit layers used directly: DO Vale dos Vinhedos, DO Altos de Pinto Bandeira, IP Pinto Bandeira,
IP Altos Montes, IP Vale do São Francisco. Where the limit layer is not exposed by WFS, the limit is the
dissolve of the IG's own thematic layer clipped to the IG (Embrapa "geologia" layers), verified to be
identical to the official limit on IP Altos Montes (symmetric difference 0.00 km2):
IP Monte Belo, IP Farroupilha, IP Campanha Gaúcha. Licence on GeoInfo items: not specified.
Not found as open data (skipped): IP Vinhos de Altitude de Santa Catarina, IP Vales da Uva Goethe.
Run: python3 -I scripts/world_br.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, area_km2, RAW, WORK  # noqa: E402
from shapely.geometry import shape, Polygon, MultiPolygon  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

D = f"{RAW}/br_ig"
IGS = [
    # name, cat, file, reg
    ("Vale dos Vinhedos", "DO", "do_vale_dos_vinhedos_limite4326", {"granted": "2012",
     "note": "IP since 2002; DO for fine wines and sparkling wines", "state": "RS"}),
    ("Altos de Pinto Bandeira", "DO", "doapb_limite_4326", {"granted": "2022", "note": "DO for traditional-method sparkling wine", "state": "RS"}),
    ("Pinto Bandeira", "IP", "ip_pinto_bandeira_limite", {"granted": "2010", "state": "RS"}),
    ("Altos Montes", "IP", "ip_altos_montes_limite", {"granted": "2012", "state": "RS"}),
    ("Monte Belo", "IP", "geo_ipmb_geologia4326", {"granted": "2013", "state": "RS"}),
    ("Farroupilha", "IP", "geo_ipfa_geologiamuni", {"granted": "2015", "note": "Moscatel wines", "state": "RS"}),
    ("Campanha Gaúcha", "IP", "geo_ipca_geologiacprm", {"granted": "2020", "state": "RS"}),
    ("Vale do São Francisco", "IP", "ipvsf_limite4326", {"granted": "2022", "state": "PE, BA",
     "note": "tropical wines, two harvests a year"}),
]


def clean(g, hole_km2=5.0, part_frac=0.001):
    """Fill slivers left by dissolving thematic polygons; drop specks."""
    polys = g.geoms if isinstance(g, MultiPolygon) else [g]
    out = []
    for p in polys:
        holes = [h for h in p.interiors if area_km2(Polygon(h)) > hole_km2]
        out.append(Polygon(p.exterior, holes))
    tot = sum(p.area for p in out)
    out = [p for p in out if p.area >= part_frac * tot]
    return out[0] if len(out) == 1 else MultiPolygon(out)


def main():
    log = []
    mk = IdMaker("br")
    items = []
    for name, cat, fn, reg in IGS:
        fs = json.load(open(f"{D}/{fn}.geojson", encoding="utf-8"))["features"]
        g = fix(unary_union([fix(shape(f["geometry"])) for f in fs]).buffer(0))
        if fn.startswith("geo_"):
            g = fix(clean(g))
            reg = dict(reg, built="dissolve of Embrapa layer clipped to the IG")
        items.append({"id": mk(name), "name": name, "cat": cat, "src": "embrapa", "bq": "official",
                      "reg": reg, "geom": g})
    interval = size_interval(base_m=25, ref_km2=1000, power=0.6, min_m=5, max_m=1500)
    path, nbytes, n = finalize("br", items, interval, max_bytes=600_000, log=log)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    log += [f"  {it['id']} {it['cat']} parent={it['parent']} area={it['area']}" for it in items]
    open(f"{WORK}/br_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
