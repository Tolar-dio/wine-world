"""New Zealand wine GIs (IPONZ register, Geographical Indications (Wine and Spirits) Registration
Act 2006). No open GIS boundaries were found (register export raw/nz_gi/gi_register.xlsx has no
geometry; boundaries live in case documents behind the IPONZ case system). Proxies from Stats NZ
regional council / territorial authority boundaries (geoBoundaries NZL ADM1 2017, ADM2 2021, CC BY 4.0).

Built (proxy quality in bq): regional / district GIs that follow council areas.
Skipped (small sub-district GIs, content adds points): Matakana, Kumeu, Gladstone, Martinborough,
Waipara Valley, Waitaki Valley North Otago, Bannockburn.
Run: python3 -I scripts/world_nz.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape, MultiPolygon  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

GIS = [
    # name, alt, level, units, bq, gi_no, note
    ("Northland", ["Te Tai Tokerau"], 1, ["Northland Region"], "admin", 1022, "Northland region"),
    ("Auckland", None, 1, ["Auckland Region"], "admin", 1018, "Auckland region"),
    ("Waiheke Island", None, 2, ["Waiheke Local Board Area"], "admin", 1015,
     "main island of the Waiheke local board area"),
    ("Gisborne", None, 1, ["Gisborne Region"], "admin", 1008, "Gisborne region"),
    ("Hawke's Bay", ["Hawkes Bay"], 1, ["Hawke's Bay Region"], "approx", 1005, "Hawke's Bay region as proxy"),
    ("Central Hawke's Bay", ["Central Hawkes Bay"], 2, ["Central Hawke's Bay District"], "admin", 1020,
     "Central Hawke's Bay district"),
    ("Wairarapa", None, 2, ["Masterton District", "Carterton District", "South Wairarapa District"], "approx", 1012,
     "Masterton, Carterton and South Wairarapa districts"),
    ("Nelson", None, 1, ["Nelson Region", "Tasman Region"], "approx", 1006, "Nelson and Tasman regions"),
    ("Marlborough", None, 1, ["Marlborough Region"], "admin", 1004, "Marlborough region"),
    ("Canterbury", None, 1, ["Canterbury Region"], "approx", 1017, "Canterbury region as proxy"),
    ("North Canterbury", None, 2, ["Hurunui District", "Waimakariri District"], "approx", 1016,
     "Hurunui and Waimakariri districts as proxy"),
    ("Central Otago", None, 2, ["Central Otago District", "Queenstown-Lakes District"], "approx", 1007,
     "Central Otago and Queenstown-Lakes districts as proxy"),
]


REG_DATE = {1022: "2018-02-26", 1018: "2018-10-29", 1015: "2018-02-26", 1008: "2018-02-26", 1005: "2018-02-26",
            1020: "2019-01-28", 1012: "2018-02-26", 1006: "2018-06-26", 1004: "2018-02-26", 1017: "2018-02-26",
            1016: "2020-06-29", 1007: "2018-10-29"}


def main():
    log = []
    units = {}
    for lvl in (1, 2):
        for f in json.load(open(f"{RAW}/gb_nzl/nzl_adm{lvl}.geojson", encoding="utf-8"))["features"]:
            units[(lvl, f["properties"]["shapeName"])] = fix(shape(f["geometry"]))
    mk = IdMaker("nz")
    items = []
    for name, alt, lvl, us, bq, gino, note in GIS:
        g = fix(unary_union([units[(lvl, u)] for u in us]).buffer(0))
        if name == "Waiheke Island" and isinstance(g, MultiPolygon):
            g = max(g.geoms, key=lambda p: p.area)
        # drop specks (offshore rocks) below 0.05 km2 to save bytes
        if isinstance(g, MultiPolygon):
            parts = [p for p in g.geoms if p.area > 5e-6]
            g = parts[0] if len(parts) == 1 else MultiPolygon(parts)
        items.append({"id": mk(name), "name": name, "alt": alt, "cat": "GI", "src": "gb", "bq": bq,
                      "reg": {"gi_no": gino, "registered": REG_DATE[gino], "proxy": note},
                      "geom": g})
    log.append(f"features: {len(items)}")
    interval = size_interval(base_m=80, ref_km2=1000, power=0.5, min_m=30, max_m=1500)
    path, nbytes, n = finalize("nz", items, interval, max_bytes=1_200_000, log=log)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    log += [f"  {it['id']} parent={it['parent']} area={it['area']}" for it in items]
    open(f"{WORK}/nz_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
