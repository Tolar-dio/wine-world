# T05: Locate the 26 missing Etna contrade

**Context:** Etna DOC has 133 official contrade (disciplinare, art. on "menzioni geografiche aggiuntive"). The atlas mapped 107 approximately; 26 have no location (mostly in Randazzo). Find which: compare the official list with `docs/data/geo/_index.json` entries under parent `it-etna`.

**Do:**
1. Get the official list of contrade from the current Etna DOC disciplinare (MASAF / Consorzio Tutela Vini Etna DOC).
2. For each missing contrada, find its location: the Consorzio's contrade map (if published), IGM/CTR toponyms in the Sicilian regional cartography (SITR Sicilia, open data), cadastral sheet names, or OpenStreetMap `place=locality` / `name=*`.
3. Output a point per contrada (or a polygon if the source draws one): `staging/T05/etna_contrade.geojson` with `id` (`it-etna-<slug>`; reuse if it exists), `name`, `comune`, `parent:"it-etna"`, `subcat:"Contrada"`, `bq:"approx"`, `src`, `confidence` (`high` = named on an official map, `medium` = toponym on CTR/IGM, `low` = inferred).
4. Also list any of the 107 existing contrade whose point is more than 1 km from the toponym you find (possible misplacements).

**Report:** found/unfound counts with reasons.
