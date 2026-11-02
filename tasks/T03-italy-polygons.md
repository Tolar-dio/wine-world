# T03: Polygons for Italian zones that are only points

**Targets:** Romagna DOC sottozone (Bertinoro, Brisighella, Castrocaro, Cesena, Longiano, Meldola, Modigliana, Marzeno, Oriolo, Predappio, San Vicinio, Serra, Imola); Valtellina Superiore sottozone (Maroggia, Sassella, Grumello, Inferno, Valgella); Friuli Colli Orientali sottozone (Cialla, Rosazzo, Schiopettino di Prepotto, Pignolo di Rosazzo, Refosco di Faedis, Ramandolo is its own DOCG); Castelli di Jesi Verdicchio Classico / Verdicchio dei Castelli di Jesi Classico area.

**Find ids:** in `docs/data/geo/_index.json` filter `country == "it"` and match names; most exist as points (`lp`) under `it_fine` or in `_extra_points.geojson`. Use the existing id. If none exists, propose `<parent id>-<slug>` and list it in the report.

**Do:**
1. For each, read the official disciplinare di produzione (Ministero/MASAF or eAmbrosia, or the consortium) and extract the delimitation: list of comuni and, if given, frazioni, roads or rivers.
2. Build the geometry: where the zone is whole comuni, union the ISTAT administrative boundaries (ISTAT "Confini delle unità amministrative", CC BY 3.0 IT; use the most recent year). Where the text describes a line (roads, rivers, contour), trace it from OpenStreetMap (ODbL) and mark `bq: "approx"`; whole-commune unions get `bq: "commune"`.
3. Simplify to ~20 m tolerance, coordinates rounded to 5 decimals, WGS84.
4. Output one `staging/T03/it_fine_add.geojson` FeatureCollection with properties: `id, name, country:"it", cat:"DOC"|"DOCG", subcat:"Sottozona"|"Area classica", parent:<legal parent id>, bq, src:"<short key>"`.
5. `staging/T03/delimitations.md`: for each zone, the exact delimitation text (Italian) with article number and source URL.

**Validate:** every polygon valid (shapely `is_valid`), inside its parent appellation's bbox from `_index.json`, area plausible (report km²).
