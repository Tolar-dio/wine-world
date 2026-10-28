"""Japan wine GIs (National Tax Agency) and Uruguay wine departments, as admin-unit polygons.

Japan: the wine GIs Yamanashi (2013), Hokkaido (2018), Yamagata, Osaka and Nagano (2021) each cover a
whole prefecture, so the prefecture boundary is the GI boundary (geoBoundaries JPN ADM1, OSM, ODbL).
Uruguay: departments (geoBoundaries URY ADM1, OSM, ODbL). Uruguayan labels may name the department of
origin; the departments are used as proxies for the wine regions (bq "admin").
Run: python3 -I scripts/world_jp_uy.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape, MultiPolygon  # noqa: E402

JP = [("Yamanashi", "Yamanashi", "2013", "山梨"), ("Hokkaido", "Hokkaido", "2018", "北海道"),
      ("Yamagata", "Yamagata", "2021", "山形"), ("Osaka", "Osaka Prefecture", "2021", "大阪"),
      ("Nagano", "Nagano", "2021", "長野")]
UY = ["Canelones", "Montevideo", "San José", "Colonia", "Maldonado", "Rivera", "Salto", "Paysandú", "Artigas",
      "Florida", "Durazno", "Rocha", "Lavalleja", "Tacuarembó", "Río Negro", "Soriano", "Cerro Largo",
      "Treinta y Tres", "Flores"]


def drop_specks(g, min_frac):
    if isinstance(g, MultiPolygon):
        tot = g.area
        parts = [p for p in g.geoms if p.area >= min_frac * tot]
        return parts[0] if len(parts) == 1 else MultiPolygon(parts)
    return g


def load(path):
    return {f["properties"]["shapeName"]: fix(shape(f["geometry"]))
            for f in json.load(open(path, encoding="utf-8"))["features"]}


def main():
    log = []
    jp = load(f"{RAW}/gb_jpn/jpn_adm1.geojson")
    mk = IdMaker("jp")
    items = [{"id": mk(n), "name": n, "alt": [ja], "cat": "GI", "src": "gb", "bq": "admin",
              "reg": {"registered": yr, "authority": "National Tax Agency", "note": "GI area is the whole prefecture"},
              "geom": drop_specks(jp[key], 0.0005)} for n, key, yr, ja in JP]
    interval = size_interval(base_m=60, ref_km2=1000, power=0.5, min_m=30, max_m=800)
    p, b, n = finalize("jp", items, interval, max_bytes=500_000, log=log)
    log.append(f"wrote {p}: {n} features, {b/1e6:.2f} MB")
    uy = load(f"{RAW}/gb_ury/ury_adm1.geojson")
    mk = IdMaker("uy")
    items = [{"id": mk(n), "name": n, "cat": "Departamento", "subcat": "Department", "src": "gb", "bq": "admin",
              "reg": {"note": "department used as wine-region proxy"},
              "geom": drop_specks(uy[n], 0.0005)} for n in UY]
    interval = size_interval(base_m=60, ref_km2=1000, power=0.5, min_m=30, max_m=600)
    p, b, n = finalize("uy", items, interval, max_bytes=400_000, log=log)
    log.append(f"wrote {p}: {n} features, {b/1e6:.2f} MB")
    open(f"{WORK}/jp_uy_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
