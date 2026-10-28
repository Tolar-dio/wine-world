# Site data contract (what index.html consumes)

Produced by `scripts/integrate.py` (integration step) from the geodata agents' country files (`site/data/geo/{iso2}.geojson`, `{iso2}_fine.geojson`), the basemap (`site/data/base/`), climate enrichment (`clim` property) and the research JSON in `data/content/`. The front end only reads files under `site/`, by relative URL. All JSON UTF-8, no pretty-printing for big files.

## Geometry
- `data/geo/{iso2}.geojson` — appellation polygons for one country. Features sorted by `area` descending (big first, so small nested ones draw on top). Properties: everything in SPEC.md, plus:
  - `style`: dominant style for colouring: one of red, white, rose, sparkling, sweet, fortified, orange, mixed (default "mixed" when unknown).
  - `prof`: 1 if a written profile exists in `data/content/{iso2}.json`, else 0.
  - `lvl`: nesting depth (0 = no parent).
  - `clim`: climate object (may be absent): elev, elev_min, elev_max, gst, gdd, winkler, hi, gst_class, prec, gsp, mjt, dtr.
- `data/geo/{iso2}_fine.geojson` — optional finer units (Einzellagen, MGAs, Rieden...), same schema, loaded only at high zoom.
- `data/geo/_countries.json` — `{ "fr": {"name":"France","bbox":[w,s,e,n],"count":N,"file":"fr.geojson","bytes":N,"fine":"fr_fine.geojson"|null,"tier":"major|notable|emerging|minor"|null,"has_content":true}, ... }` Includes every country that has polygons OR a content entry (countries with content but no polygons have `file: null`).
- `data/geo/_index.json` — `[{"id","name","alt":[],"country","cat","subcat","area","parent","lp":[lon,lat],"bbox":[...],"bq","style","prof"}...]` every appellation (incl. fine units with `"fine":1`), for search and lookup without loading geometry.
- `data/geo/_overview.geojson` — Points at `lp` for every non-fine appellation: `{id, name, country, area, style, cat}`; for the low-zoom globe.
- `data/geo/_regions.geojson` — dissolved outlines of named wine regions (union of their member appellations; or a buffered hull of their sites when no polygons): `{id:"region-{iso2}-{slug}", name, country, lp, bbox}`. Used at mid zoom (≈4–8) for region labels/outlines.
- `data/geo/_sites.geojson` — Points for every site: `{id, name, kind, country, class, app:"<appellation id or null>", cq:"precise|approx"}`.
- `data/geo/_extra_points.geojson` — Points for profiled appellations that have no polygon (e.g. South African wards, Georgian PDOs): `{id, name, country, cat, style}`; id uses the appellation id scheme.

## Text
- `data/content/{iso2}.json`:
```json
{
  "country": {SPEC country object, plus "id": "fr"},
  "regions": [{SPEC region object, plus "id": "region-fr-burgundy", "app_ids": ["fr-chablis", ...]}],
  "profiles": {"fr-gevrey-chambertin": {SPEC appellation object fields: name, cat, region, subregion, created, area_ha, styles, dominant_style, grapes, summary, terroir, producers, nerd_note, contains}},
  "sites": [{SPEC site object with id, plus "app": "<appellation id or null>"}]
}
```
- `data/content/global/grapes.json`, `timeline.json`, `glossary.json`, `soils.json`, `systems.json` — schemas as written by the global research agent (see that agent's brief in research notes; grapes have id, name, color, synonyms, origin{lat,lon,place,country}, parents, offspring, countries, regions, profile, trivia).
- `data/geo/_varieties.json` — `{ "<grape id>": ["<appellation id>", ...] }` mapping each grape in grapes.json to appellations whose permitted `varieties` or written `grapes` mention it (synonym-aware).
- `data/geo/_climrefs.json` — a dozen famous reference appellations with their clim values for comparison bars: `[{"id","name","gst","gdd","hi"}]`.
- `data/meta.json` — `{"built": "ISO date", "counts": {...}, "sources": [{"key","title","licence","url"}]}` for the About/credits view.
