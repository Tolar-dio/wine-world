"""Chile: Denominaciones de Origen under Decreto 464 (Ministerio de Agricultura, 14 Dec 1994,
"Establece zonificación vitícola y fija normas para su utilización", LeyChile idNorma 13601)
as amended (Decreto 22 of 2015, idNorma 1082125, among others).

Each Región / Subregión / Zona / Área is defined in the decree by administrative provinces and
comunas. Polygons = dissolve of geoBoundaries CHL ADM3 comunas (source BCN 2020, CC BY 3.0 IGO).
Comuna -> provincia assignment comes from geoBoundaries CHL ADM2 (representative point).

The comuna lists below were transcribed from the decree text as reproduced on es.wikipedia
("Anexo:Regiones vitícolas de Chile" and the per-valley articles, which cite LeyChile 13601 /
1082125), because bcn.cl / leychile.cl answered HTTP 401 to scripted requests.

Input : raw/gb_chl/chl_adm3.geojson, raw/gb_chl/chl_adm2.geojson
Output: site/data/geo/cl.geojson
Run   : python3 -I scripts/world_cl.py
"""
import json
import sys
import unicodedata

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape  # noqa: E402
from shapely.ops import unary_union  # noqa: E402
from shapely.strtree import STRtree  # noqa: E402

RM = ["Santiago", "Cordillera", "Maipo", "Talagante", "Melipilla", "Chacabuco"]
OHIGGINS = ["Cachapoal", "Colchagua", "Cardenal Caro"]

# (name, subcat, parent name, definition tokens, alt names, extra reg)
# tokens: "P:<provincia>" = whole province, "-<comuna>" = exclude, else comuna name.
H = []


def add(name, subcat, parent, tokens, alt=None, note=None):
    H.append((name, subcat, parent, tokens, alt or [], note))


# ---- Región de Atacama
add("Atacama", "Region", None, None, ["Región Vitícola de Atacama"])
add("Valle de Copiapó", "Subregion", "Atacama", ["P:Copiapó"], ["Copiapó Valley"])
add("Valle del Huasco", "Subregion", "Atacama", ["P:Huasco"], ["Huasco Valley"])
# ---- Región de Coquimbo
add("Coquimbo", "Region", None, None, ["Región Vitícola de Coquimbo"])
add("Valle del Elqui", "Subregion", "Coquimbo", ["P:Elqui"], ["Elqui Valley"])
for a in ["La Serena", "Vicuña", "Paiguano"]:
    add(a, "Area", "Valle del Elqui", ["Paihuano" if a == "Paiguano" else a])
add("Valle del Limarí", "Subregion", "Coquimbo", ["P:Limarí"], ["Limarí Valley"])
for a in ["Ovalle", "Punitaqui", "Monte Patria", "Río Hurtado"]:
    add(a, "Area", "Valle del Limarí", [a])
add("Valle del Choapa", "Subregion", "Coquimbo", ["P:Choapa"], ["Choapa Valley"])
for a in ["Salamanca", "Illapel"]:
    add(a, "Area", "Valle del Choapa", [a])
# ---- Región de Aconcagua
add("Aconcagua", "Region", None, None, ["Región Vitícola de Aconcagua"])
add("Valle del Aconcagua", "Subregion", "Aconcagua",
    ["P:San Felipe de Aconcagua", "P:Los Andes", "P:Quillota", "Zapallar"], ["Aconcagua Valley"])
for a in ["Zapallar", "Quillota", "Hijuelas", "Panquehue", "Catemu", "Llay-Llay", "San Felipe",
          "Santa María", "Calle Larga", "San Esteban"]:
    add(a, "Area", "Valle del Aconcagua", ["Llaillay" if a == "Llay-Llay" else a])
add("Valle del Marga-Marga", "Subregion", "Aconcagua", ["Quilpué"], ["Marga-Marga Valley"])
add("Valle de Casablanca", "Subregion", "Aconcagua", ["Casablanca"], ["Casablanca Valley"])
add("Valle de San Antonio", "Subregion", "Aconcagua", ["P:San Antonio"], ["San Antonio Valley"])
add("Valle de Leyda", "Zone", "Valle de San Antonio", ["San Antonio", "Santo Domingo"], ["Leyda Valley", "Leyda"])
add("Cartagena", "Area", "Valle de San Antonio", ["Cartagena"])
add("Algarrobo", "Area", "Valle de San Antonio", ["Algarrobo"])
add("San Juan", "Area", "Valle de Leyda", ["San Antonio"], note="área San Juan = comuna San Antonio")
add("Santo Domingo", "Area", "Valle de Leyda", ["Santo Domingo"])
# ---- Región del Valle Central
add("Valle Central", "Region", None, None, ["Central Valley", "Región Vitícola del Valle Central"])
add("Valle del Maipo", "Subregion", "Valle Central", [f"P:{p}" for p in RM], ["Maipo Valley", "Maipo"])
MAIPO_AREAS = [("Santiago", ["Peñalolén", "La Florida"]), ("Pirque", ["Pirque"]), ("Puente Alto", ["Puente Alto"]),
               ("Buin", ["Buin", "Paine", "San Bernardo"]), ("Isla de Maipo", ["Isla de Maipo"]),
               ("Talagante", ["Talagante", "Peñaflor", "El Monte", "Padre Hurtado"]),
               ("Melipilla", ["Melipilla", "San Pedro"]), ("Alhué", ["Alhué"]), ("María Pinto", ["María Pinto"]),
               ("Colina", ["Colina"]), ("Calera de Tango", ["Calera de Tango"]), ("Til Til", ["Tiltil"]),
               ("Lampa", ["Lampa"])]
for a, cs in MAIPO_AREAS:
    add(a, "Area", "Valle del Maipo", cs)
add("Valle del Rapel", "Subregion", "Valle Central", [f"P:{p}" for p in OHIGGINS], ["Rapel Valley"])
add("Valle del Cachapoal", "Zone", "Valle del Rapel", ["P:Cachapoal"], ["Cachapoal Valley"])
for a, cs in [("Rancagua", ["Rancagua", "Graneros", "Mostazal", "Codegua", "Olivar"]), ("Requínoa", ["Requínoa"]),
              ("Rengo", ["Rengo", "Malloa", "Quinta de Tilcoco"]),
              ("Peumo", ["Peumo", "Pichidegua", "Las Cabras", "San Vicente"]), ("Machalí", ["Machalí"]),
              ("Coltauco", ["Coltauco"])]:
    add(a, "Area", "Valle del Cachapoal", cs)
add("Valle de Colchagua", "Zone", "Valle del Rapel", ["P:Colchagua", "P:Cardenal Caro"], ["Colchagua Valley"])
for a, cs in [("San Fernando", ["San Fernando"]), ("Chimbarongo", ["Chimbarongo"]),
              ("Nancagua", ["Nancagua", "Placilla"]), ("Santa Cruz", ["Santa Cruz", "Chépica"]),
              ("Palmilla", ["Palmilla"]), ("Peralillo", ["Peralillo"]), ("Lolol", ["Lolol"]),
              ("Marchigüe", ["Marchigüe"]), ("Litueche", ["Litueche"]), ("La Estrella", ["La Estrella"]),
              ("Paredones", ["Paredones"]), ("Pumanque", ["Pumanque"])]:
    add(a, "Area", "Valle de Colchagua", cs)
add("Valle de Curicó", "Subregion", "Valle Central", ["P:Curicó", "Río Claro"], ["Curicó Valley"])
add("Valle del Teno", "Zone", "Valle de Curicó", ["Teno", "Romeral", "Rauco", "Hualañé", "Vichuquén"], ["Teno Valley"])
for a, cs in [("Rauco", ["Rauco", "Hualañé"]), ("Romeral", ["Romeral", "Teno"]), ("Vichuquén", ["Vichuquén"])]:
    add(a, "Area", "Valle del Teno", cs)
add("Valle del Lontué", "Zone", "Valle de Curicó", ["Curicó", "Molina", "Sagrada Familia", "Río Claro"], ["Lontué Valley"])
add("Molina", "Area", "Valle del Lontué", ["Molina", "Río Claro", "Curicó"])
add("Sagrada Familia", "Area", "Valle del Lontué", ["Sagrada Familia"])
add("Valle del Maule", "Subregion", "Valle Central", ["P:Talca", "-Río Claro", "P:Linares", "Cauquenes"], ["Maule Valley"])
add("Valle del Claro", "Zone", "Valle del Maule",
    ["Talca", "Maule", "Pelarco", "Pencahue", "San Clemente", "San Rafael", "Empedrado", "Curepto"], ["Claro Valley"])
for a, cs in [("Talca", ["Talca", "Maule", "Pelarco"]), ("Pencahue", ["Pencahue"]), ("San Clemente", ["San Clemente"]),
              ("San Rafael", ["San Rafael"]), ("Empedrado", ["Empedrado"]), ("Curepto", ["Curepto"])]:
    add(a, "Area", "Valle del Claro", cs)
add("Valle del Loncomilla", "Zone", "Valle del Maule",
    ["San Javier", "Villa Alegre", "Parral", "Linares", "Yerbas Buenas", "Colbún", "Longaví", "Retiro"],
    ["Loncomilla Valley"])
for a in ["San Javier", "Villa Alegre", "Parral", "Linares", "Colbún", "Longaví", "Retiro"]:
    add(a, "Area", "Valle del Loncomilla", [a])
add("Valle del Tutuvén", "Zone", "Valle del Maule", ["Cauquenes"], ["Tutuvén Valley"])
add("Cauquenes", "Area", "Valle del Tutuvén", ["Cauquenes"])
# ---- Región del Sur
add("Sur", "Region", None, None, ["Southern Region", "Región Vitícola del Sur"])
ITATA = [("Chillán", ["Chillán", "Bulnes", "San Carlos", "Chillán Viejo"]), ("Quillón", ["Quillón", "Ranquil", "Florida"]),
         ("Portezuelo", ["Portezuelo", "Ninhue", "Quirihue", "San Nicolás"]), ("Coelemu", ["Coelemu", "Treguaco"])]
add("Valle del Itata", "Subregion", "Sur", [c for _, cs in ITATA for c in cs], ["Itata Valley"])
for a, cs in ITATA:
    add(a, "Area", "Valle del Itata", cs)
BIO = [("Yumbel", ["Yumbel", "Laja"]), ("Mulchén", ["Mulchén", "Nacimiento", "Negrete"])]
add("Valle del Bío-Bío", "Subregion", "Sur", [c for _, cs in BIO for c in cs], ["Valle del Biobío", "Bío-Bío Valley"])
for a, cs in BIO:
    add(a, "Area", "Valle del Bío-Bío", cs)
add("Valle del Malleco", "Subregion", "Sur",
    ["Angol", "Collipulli", "Ercilla", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    ["Malleco Valley"])
add("Traiguén", "Area", "Valle del Malleco", ["Traiguén"])
# ---- Región Austral
add("Austral", "Region", None, None, ["Región Vitícola Austral"])
add("Valle del Cautín", "Subregion", "Austral", ["Perquenco", "Galvarino"], ["Cautín Valley"])
add("Valle de Osorno", "Subregion", "Austral", ["Osorno", "San Pablo", "Purranque", "La Unión", "Futrono"],
    ["Osorno Valley"])

RANK = {"Region": 0, "Subregion": 1, "Zone": 2, "Area": 3}


def norm(s):
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c)).lower().replace("provincia de ", "").strip()


def main():
    log = []
    adm3 = json.load(open(f"{RAW}/gb_chl/chl_adm3.geojson", encoding="utf-8"))["features"]
    adm2 = json.load(open(f"{RAW}/gb_chl/chl_adm2.geojson", encoding="utf-8"))["features"]
    prov_geoms = [fix(shape(f["geometry"])) for f in adm2]
    prov_names = [norm(f["properties"]["shapeName"]) for f in adm2]
    tree = STRtree(prov_geoms)
    comunas = {}
    prov_of = {}
    for f in adm3:
        nm = f["properties"]["shapeName"].strip()
        g = fix(shape(f["geometry"]))
        key = norm(nm)
        if key in comunas:  # duplicate name in source (Tocopilla twice); keep both merged
            comunas[key] = unary_union([comunas[key], g])
            continue
        comunas[key] = g
        pt = g.representative_point()
        hits = [i for i in tree.query(pt) if prov_geoms[i].contains(pt)]
        prov_of[key] = prov_names[hits[0]] if hits else None
    by_prov = {}
    for c, p in prov_of.items():
        by_prov.setdefault(p, []).append(c)
    mk = IdMaker("cl")
    defs = {}
    items = []
    name_to_id = {}
    for name, subcat, parent, tokens, alt, note in H:
        defs[name] = (subcat, parent, tokens)
    # resolve comuna sets (regions = union of their children)
    sets = {}
    for name, subcat, parent, tokens, alt, note in H:
        if tokens is None:
            continue
        s = set()
        for t in tokens:
            if t.startswith("P:"):
                members = by_prov.get(norm(t[2:]))
                assert members, f"province {t} not found"
                s |= set(members)
            elif t.startswith("-"):
                s.discard(norm(t[1:]))
            else:
                assert norm(t) in comunas, f"comuna {t} not found"
                s.add(norm(t))
        sets[name] = s
    for name, subcat, parent, tokens, alt, note in H:
        if subcat == "Region":
            s = set()
            for n2, sc2, p2, *_ in H:
                if p2 == name:
                    s |= sets[n2]
            sets[name] = s
    for name, subcat, parent, tokens, alt, note in H:
        s = sets[name]
        geom = fix(unary_union([comunas[c] for c in s]).buffer(0))
        disp = {c: c for c in s}
        cnames = sorted({f["properties"]["shapeName"].strip() for f in adm3 if norm(f["properties"]["shapeName"]) in s})
        reg = {"decree": "Decreto 464/1994 (amended)"}
        if subcat != "Region":
            reg["comunas"] = ", ".join(cnames) if len(cnames) <= 8 else f"{len(cnames)} comunas"
        if note:
            reg["note"] = note
        fid = mk(name)
        name_to_id[(name, subcat)] = fid
        items.append({"id": fid, "name": name, "alt": alt or None, "cat": "DO", "subcat": subcat, "src": "gb",
                      "bq": "admin", "reg": reg, "geom": geom, "rank": RANK[subcat], "_parent": parent})
        log.append(f"{subcat:9s} {name:25s} {len(s):3d} comunas")
    # parent hints from the decree hierarchy (names unique per level, look up any level)
    lookup = {}
    for (n, sc), fid in name_to_id.items():
        lookup.setdefault(n, []).append((RANK[sc], fid))
    for it in items:
        p = it.pop("_parent")
        if p:
            cands = sorted(lookup[p])  # pick the most general level with that name < own rank
            cands = [fid for r, fid in cands if r < it["rank"]]
            it["parent_hints"] = cands[-1:]
    interval = size_interval(base_m=60, ref_km2=1000, power=0.5, min_m=20, max_m=2500)
    path, nbytes, n = finalize("cl", items, interval, max_bytes=1_800_000, log=log, hint_thresh=0.6)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    for it in items:
        if it.get("parent_hints") and it["parent"] not in it["parent_hints"]:
            log.append(f"parent mismatch {it['id']}: {it['parent']} vs decree {it['parent_hints']}")
    open(f"{WORK}/cl_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
