"""Argentina: INV Indicaciones Geográficas (IG) and Denominaciones de Origen Controladas (DOC).

Register: INV "Indicaciones geográficas y denominaciones de origen reconocidas y protegidas de la
República Argentina" (PDF, updated Sept 2025) -> raw/inv_arg/ig_doc_list.pdf.
Polygons:
  * provinces / departments: geoBoundaries ARG ADM2 (IGN + OCHA, CC BY 3.0 IGO), provinces =
    union of their departments (department->province via max overlap with ARG ADM1);
  * Mendoza districts: IDE Mendoza "Distritos" FeatureServer (Dirección General de Catastro 2024,
    public service, licence not stated) -> raw/ide_mza/mza_distritos.geojson.
IGs defined below a district (Paraje Altamira, Pampa El Cepillo, San Pablo, El Paraíso, Alto Agrelo,
Cordón del Cepillo, Canota, Calingasta parajes, etc.) are skipped (content adds points).
Run: python3 -I scripts/world_ar.py
"""
import json
import sys
import unicodedata

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape  # noqa: E402
from shapely.ops import unary_union  # noqa: E402


def norm(s):
    s = unicodedata.normalize("NFKD", s)
    return " ".join("".join(c for c in s if not unicodedata.combining(c)).lower().replace(".", " ").split())


ADM1_FIX = {"La Roja": "La Rioja"}
DEPT_PROV_OVERRIDE = {("tafi del valle",): "Tucumán", ("victoria",): "Entre Ríos"}

# (name, cat, kind, spec, alt, resolution) kind: P = provinces list, D = (province, [departments]),
# M = Mendoza districts [(dept, district)]
F = []


def add(name, cat, kind, spec, res, alt=None, bq="admin", note=None):
    F.append(dict(name=name, cat=cat, kind=kind, spec=spec, res=res, alt=alt, bq=bq, note=note))


C32 = "INV Res. C.32/2002"
add("Cuyo", "IG", "P", ["Mendoza", "San Juan", "San Luis"], "INV Res. C.37/2002")
add("Patagonia", "IG", "P", ["La Pampa", "Neuquén", "Río Negro", "Chubut", "Santa Cruz", "Tierra del Fuego"],
    "INV Res. C.37/2002", alt=["Patagonia Argentina"], bq="approx",
    note="interprovincial region; province list as usually cited")
for p, nm in [("Mendoza", "Mendoza"), ("San Juan", "San Juan"), ("La Rioja", "La Rioja Argentina"),
              ("Catamarca", "Catamarca"), ("Salta", "Salta"), ("Neuquén", "Neuquén"), ("Río Negro", "Río Negro"),
              ("Córdoba", "Córdoba Argentina"), ("Tucumán", "Tucumán"), ("Jujuy", "Jujuy")]:
    add(nm, "IG", "P", [p], C32)
add("San Luis", "IG", "P", ["San Luis"], "RESOL-2019-10-APN-INV#MPYT")
# DOCs first so they get the plain ids
add("Luján de Cuyo", "DOC", "D", ("Mendoza", ["Luján de Cuyo"]), "INV Res. C.15/2005",
    note="department used as proxy for the DOC area")
add("San Rafael", "DOC", "D", ("Mendoza", ["San Rafael"]), "INV Res. C.31/2007",
    note="department used as proxy for the DOC area")
add("Valle de Uco", "IG", "D", ("Mendoza", ["Tupungato", "Tunuyán", "San Carlos"]), "INV Res. C.37/2002",
    alt=["Uco Valley"])
for d in ["General Alvear", "Godoy Cruz", "Guaymallén", "Junín", "La Paz", "Las Heras", "Luján de Cuyo", "Maipú",
          "Rivadavia", "San Carlos", "San Martín", "San Rafael", "Santa Rosa", "Tunuyán"]:
    add(d, "IG", "D", ("Mendoza", [d]), C32)
add("Lavalle", "IG", "D", ("Mendoza", ["Lavalle"]), C32, alt=["Desierto de Lavalle"])
add("Tupungato", "IG", "D", ("Mendoza", ["Tupungato"]), C32, alt=["Valle de Tupungato", "Tupungato Valley"])
# Mendoza district-level IGs
for nm, dd, res in [("Agrelo", [("LUJAN", "AGRELO")], "INV Res. C.21/2005"),
                    ("Las Compuertas", [("LUJAN", "LAS COMPUERTAS")], "INV Res. C.30/2007"),
                    ("Vistalba", [("LUJAN", "VISTALBA")], "RESOL-2022-12-APN-INV#MAGYP"),
                    ("Barrancas", [("MAIPU", "BARRANCAS")], "INV Res. C.22/2005"),
                    ("Lunlunta", [("MAIPU", "LUNLUNTA")], "INV Res. C.04/2005"),
                    ("Russel", [("MAIPU", "RUSSELL")], "INV Res. C.05/2005"),
                    ("Distrito Medrano", [("RIVADAVIA", "MEDRANO"), ("JUNIN", "MEDRANO")], "INV Res. C.29/2014"),
                    ("Reducción", [("RIVADAVIA", "REDUCCION")], "RESOL-2020-34-APN-INV#MAGYP"),
                    ("Los Chacayes", [("TUNUYAN", "LOS CHACAYE")], "RESOL-2017-249-APN-INV#MA"),
                    ("Vista Flores", [("TUNUYAN", "VISTA FLORES")], "INV Res. C.11/2012"),
                    ("La Consulta", [("SAN CARLOS", "LA CONSULTA")], "INV Res. C.19/2014"),
                    ("El Peral", [("TUPUNGATO", "EL PERAL")], "RESOL-2022-1-APN-INV#MEC")]:
    add(nm, "IG", "M", dd, res, note="district (Catastro Mendoza) used as proxy")
# San Juan departments
for d in ["25 de Mayo", "9 de Julio", "Albardón", "Angaco", "Caucete", "Chimbas", "Iglesia", "Jáchal", "Pocito",
          "Rawson", "Rivadavia", "San Martín", "Santa Lucía", "Sarmiento", "Ullum", "Valle Fértil", "Zonda"]:
    add(d, "IG", "D", ("San Juan", [d]), C32)
add("Calingasta", "IG", "D", ("San Juan", ["Calingasta"]), C32, alt=["Valle de Calingasta"])
# La Rioja
for nm, d in [("Arauco", "Arauco"), ("Castro Barros", "Castro Barros"), ("Chilecito", "Chilecito"),
              ("Famatina", "Famatina"), ("Felipe Varela", "Coronel Felipe Varela"),
              ("General Lamadrid", "General Lamadrid"), ("San Blas de los Sauces", "San Blas de los Sauces"),
              ("Sanagasta", "Sanagasta"), ("Vinchina", "Vinchina")]:
    add(nm, "IG", "D", ("La Rioja", [d]), C32)
# Catamarca
for nm, d in [("Belén", "Belén"), ("Pomán", "Poman"), ("Santa María", "Santa María"), ("Tinogasta", "Tinogasta")]:
    add(nm, "IG", "D", ("Catamarca", [d]), C32)
# Salta
add("Cafayate", "IG", "D", ("Salta", ["Cafayate"]), "INV Res. C.32/2002, C.15/2004", alt=["Valle de Cafayate"],
    note="only 'Valle de Cafayate' may be used on labels (Disp. INV 08/2005)")
for d in ["Cachi", "Molinos", "San Carlos"]:
    add(d, "IG", "D", ("Salta", [d]), C32)
add("Valles Calchaquíes", "IG", "D2",
    [("Salta", ["Cafayate", "San Carlos", "Molinos", "Cachi", "La Poma"]), ("Tucumán", ["Tafí del Valle"]),
     ("Catamarca", ["Santa María"])], "INV Res. C.37/2002, C.16/2010", alt=["Valle Calchaquí", "Calchaquí Valleys"],
    bq="approx", note="departments spanning the Calchaquí valleys; the IG is defined by localities")
add("Tafí", "IG", "D", ("Tucumán", ["Tafí del Valle"]), C32, note="department Tafí del Valle")
add("Quebrada de Humahuaca", "IG", "D", ("Jujuy", ["Humahuaca", "Tilcara", "Tumbaya"]), "INV Res. C.39/2015",
    bq="approx", note="departments of the Quebrada")
# Patagonia
add("Añelo", "IG", "D", ("Neuquén", ["Anelo"]), C32)
add("Confluencia", "IG", "D", ("Neuquén", ["Confluencia"]), C32)
for nm, d in [("Avellaneda", "Avellaneda"), ("General Conesa", "Conesa"), ("General Roca", "General Roca"),
              ("Pichimahuida", "Pichi Mahuída")]:
    add(nm, "IG", "D", ("Río Negro", [d]), C32)
add("Sarmiento", "IG", "D", ("Chubut", ["Sarmiento"]), "RESOL-2023-9-APN-INV#MEC")
# Córdoba, Buenos Aires, Entre Ríos
for d in ["Colón", "Cruz del Eje", "San Javier"]:
    add(d, "IG", "D", ("Córdoba", [d]), C32)
add("Balcarce", "IG", "D", ("Buenos Aires", ["Balcarce"]), "RESOL-2022-11-APN-INV#MAGYP")
add("Tandil", "IG", "D", ("Buenos Aires", ["Tandil"]), "RESOL-2024-24-APN-INV#MEC")
add("Victoria, Entre Ríos", "IG", "D", ("Entre Ríos", ["Victoria"]), "RESOL-2021-5-APN-INV#MAGYP")

RANK_BY_KIND = {"P": 0, "D2": 1, "D": 2, "M": 3}
MZA_DEPT_IG = {"LUJAN": "Luján de Cuyo", "MAIPU": "Maipú", "RIVADAVIA": "Rivadavia", "TUNUYAN": "Tunuyán",
               "SAN CARLOS": "San Carlos", "TUPUNGATO": "Tupungato", "JUNIN": "Junín"}


def main():
    log = []
    adm1 = [(ADM1_FIX.get(f["properties"]["shapeName"], f["properties"]["shapeName"]), fix(shape(f["geometry"])))
            for f in json.load(open(f"{RAW}/gb_arg/arg_adm1.geojson", encoding="utf-8"))["features"]]
    depts = {}  # (province, normname) -> geom
    by_prov = {}
    for f in json.load(open(f"{RAW}/gb_arg/arg_adm2.geojson", encoding="utf-8"))["features"]:
        nm = f["properties"]["shapeName"].strip()
        g = fix(shape(f["geometry"]))
        prov = max(adm1, key=lambda pg: g.intersection(pg[1]).area)[0]
        c = g.centroid
        if norm(nm) == "tafi del valle":
            prov = "Tucumán"
        if norm(nm) == "victoria" and -61 < c.x < -59.5 and -33.3 < c.y < -32.3:
            prov = "Entre Ríos"
        if prov.startswith("Ciudad"):
            continue
        key = (prov, norm(nm))
        depts[key] = unary_union([depts[key], g]) if key in depts else g
        by_prov.setdefault(prov, []).append(key)
    provs = {p: fix(unary_union([depts[k] for k in ks]).buffer(0)) for p, ks in by_prov.items()}
    mza = {}
    for f in json.load(open(f"{RAW}/ide_mza/mza_distritos.geojson", encoding="utf-8"))["features"]:
        p = f["properties"]
        key = (p["departamen"].strip(), " ".join(p["distrito"].split()))
        g = fix(shape(f["geometry"]))
        mza[key] = unary_union([mza[key], g]) if key in mza else g
    # Mendoza departments: dissolve the cadastre districts (consistent with district-level IGs;
    # geoBoundaries ADM2 lines in Mendoza are offset by several km in places).
    MZA_DEPT = {"CAPITAL": "Capital", "GODOY CRUZ": "Godoy Cruz", "GRAL. ALVEAR": "General Alvear",
                "GUAYMALLEN": "Guaymallén", "JUNIN": "Junín", "LA PAZ": "La Paz", "LAS HERAS": "Las Heras",
                "LAVALLE": "Lavalle", "LUJAN": "Luján de Cuyo", "MAIPU": "Maipú", "MALARGUE": "Malargüe",
                "RIVADAVIA": "Rivadavia", "SAN CARLOS": "San Carlos", "SAN MARTIN": "San Martín",
                "SAN RAFAEL": "San Rafael", "SANTA ROSA": "Santa Rosa", "TUNUYAN": "Tunuyán", "TUPUNGATO": "Tupungato"}
    mza_dept = {}
    for (dep, dis), g in mza.items():
        mza_dept.setdefault(norm(MZA_DEPT[dep]), []).append(g)
    for k2, gs in mza_dept.items():
        depts[("Mendoza", k2)] = fix(unary_union(gs).buffer(0))
    log.append("Mendoza department IGs/DOCs built from IDE Mendoza cadastre districts (dissolved)")
    mk = IdMaker("ar")
    items = []
    for d in F:
        k = d["kind"]
        if k == "P":
            geom = unary_union([provs[p] for p in d["spec"]])
            src = "gb"
        elif k in ("D", "D2"):
            specs = d["spec"] if k == "D2" else [d["spec"]]
            parts = []
            for prov, names in specs:
                for n in names:
                    assert (prov, norm(n)) in depts, (prov, n)
                    parts.append(depts[(prov, norm(n))])
            geom = unary_union(parts)
            src = "idemza" if all(pr == "Mendoza" for pr, _ in specs) else "gb"
        else:
            parts = []
            for dep, dis in d["spec"]:
                assert (dep, dis) in mza, (dep, dis)
                parts.append(mza[(dep, dis)])
            geom = unary_union(parts)
            src = "idemza"
        reg = {"res": d["res"]}
        if d["note"]:
            reg["note"] = d["note"]
        it = {"id": mk(d["name"]), "name": d["name"], "alt": d["alt"], "cat": d["cat"], "src": src,
              "bq": d["bq"], "reg": reg, "geom": fix(geom.buffer(0))}
        if k == "M" and len(d["spec"]) == 1:
            it["_hint"] = ("IG", MZA_DEPT_IG[d["spec"][0][0]], "Mendoza")
        items.append(it)
    # hint: district IGs nest in their department IG (catastro vs IGN lines differ slightly)
    ig_id = {}
    for d, i in zip(F, items):
        prov = d["spec"][0] if d["kind"] == "D" else None
        ig_id[(i["cat"], i["name"], prov)] = i["id"]
    for it in items:
        h = it.pop("_hint", None)
        if h:
            it["parent_hints"] = [ig_id[(h[0], h[1], h[2])]]
    log.append(f"features: {len(items)} (IG {sum(i['cat']=='IG' for i in items)}, DOC {sum(i['cat']=='DOC' for i in items)})")
    interval = size_interval(base_m=80, ref_km2=1000, power=0.6, min_m=20, max_m=4000)
    path, nbytes, n = finalize("ar", items, interval, max_bytes=1_800_000, log=log, hint_thresh=0.6)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    log += [f"  {it['id']} parent={it['parent']}" for it in items]
    open(f"{WORK}/ar_log.txt", "w").write("\n".join(log))
    print("\n".join(log[:8]))


if __name__ == "__main__":
    main()
