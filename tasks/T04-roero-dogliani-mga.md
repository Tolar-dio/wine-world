# T04: Roero and Dogliani MGA polygons

**Context:** the atlas has Barolo and Barbaresco MGA outlines (traced from consortium maps, credited). Roero and Dogliani MGAs exist only as points: find them in `docs/data/geo/_index.json` (`country:"it"`, `subcat:"MGA"`, parent `it-roero` / `it-dogliani`).

**Sources to try, in order:**
1. Regione Piemonte Geoportale (`geoportale.igr.piemonte.it`) WFS/shape downloads for "Menzioni Geografiche Aggiuntive" (open licence CC BY 4.0 if stated).
2. The disciplinare annexes (MASAF) with cartography.
3. Consorzio Tutela Roero / Consorzio Barolo Barbaresco Alba Langhe e Dogliani map PDFs or images: trace them (georeference on OSM roads/villages with at least 6 control points per sheet, RMS error under 25 m, report it). Mark these `bq: "approx"`, `src: "consmap"` and record the credit line.

**Output:** `staging/T04/mga.geojson` with properties `id` (existing ids only), `name`, `country:"it"`, `cat:"DOCG"`, `subcat:"MGA"`, `parent`, `bq`, `src`. Coordinates 5 decimals, ~10 m simplification. Plus `staging/T04/georef.md` with control points and RMS per sheet if you traced.

**Validate:** valid polygons; every point id from `_index.json` either matched or listed as missing; no overlaps between MGAs of the same parent over 2% of the smaller one's area.
