# Vitis Mundi: shared project spec

A single-page web atlas for wine nerds: an interactive 3D globe (MapLibre GL JS v5, globe projection) where every wine-producing country is clickable, and zooming in reveals real appellation boundaries (AOC/AOP, DOCG/DOC, DO/DOCa, DOP, DAC, AVA, GI, WO...) across all countries at once, so Châteauneuf-du-Pape and Barolo are visible in the same view. Tapping anything opens a deep, narrative profile.

Root: `/home/claude/winesite/`

```
raw/                 downloads (untrusted data; one subfolder per source)
work/                intermediate processing
scripts/             processing scripts (keep them; integration reruns some)
data/content/        raw content JSON written by research agents
site/                the publishable site
  index.html
  data/geo/          processed boundary files (see "Geo output")
  data/content/      merged content (written by the integration step)
  data/base/         basemap layers
  fonts/             MapLibre glyph PBFs
research_notes/Wine atlas geography and history/   research logs + source lists (.md)
```

Hard constraints of the hosting sandbox (the site is published as a claude.ai Artifact):
- No external network at runtime except scripts from cdnjs.cloudflare.com, cdn.jsdelivr.net/npm, unpkg.com. No map tiles, no external fonts except Google Fonts CSS, no external fetches. Every dataset, glyph file and image must ship as a file under `site/` and be fetched by relative path.
- Each file ≤ 15 MB; whole site ideally ≤ 60 MB; ≤ 250 files total. Viewers are often on phones: keep files lean and lazy-load by country.
- Text everywhere: no em dashes (use commas, colons, parentheses or periods). No filler words like "delve", "robust", "seamless", "game-changer", "unlock".

## Country IDs
Lowercase ISO 3166-1 alpha-2 (`fr`, `it`, `us`, `gb`, `xk` for Kosovo). Appellation IDs: `{iso2}-{ascii-slug-of-name}` (e.g. `fr-chateauneuf-du-pape`, `it-barolo`, `us-oakville`), suffix `-2` on collision. Site IDs: `site-{iso2}-{slug}`. IDs are ASCII lowercase letters, digits, hyphens only (they become URL hashes).

## Geo output (written by the geodata agents)
One file per country: `site/data/geo/{iso2}.geojson` (FeatureCollection, WGS84, coordinates rounded to 4 decimals, simplified so each file is ≤ 4 MB, ideally ≤ 2 MB; France/Italy/US may go to 5 MB). Polygons/MultiPolygons only. Feature `properties`:

| key | type | meaning |
|---|---|---|
| id | string | appellation ID (see above) |
| name | string | official name as registered, with diacritics ("Châteauneuf-du-Pape") |
| alt | string[] | alternative names / translations (optional) |
| country | string | iso2 lowercase |
| cat | string | national category label: AOC, AOP, DOCG, DOC, DOCa, DOQ, VP (Vino de Pago), DO, DOP, DAC, PDO, AVA, GI, WO, IG, DOC-AR, VQA, etc. Use the label wine people use in that country (France: "AOC"; Italy: "DOCG"/"DOC"; Spain: "DOCa"/"DO"/"VP"; Portugal: "DOC"; Germany: "Anbaugebiet" for the 13 regions else "PDO"; Austria: "DAC" where it is one; US: "AVA"; Australia: "GI"; SA: "WO") |
| subcat | string | optional finer label: "Grand Cru", "Premier Cru" (if the polygon itself is one), "Zone", "Region", "Subregion", "District", "Ward", "Bereich", "Einzellage", "MGA", "UGA" |
| src | string | short source key (see Sources below) |
| bq | string | boundary quality: `official` (legally delimited parcel/line boundary), `commune` (union of the communes/municipalities the zone covers, fully or partly), `admin` (administrative unit used as a proxy), `approx` |
| area | number | km², 1 decimal |
| parent | string|null | id of the smallest appellation (same country) that contains ≥ 85% of this one; null if none |
| lp | [lon,lat] | label point inside the polygon (polylabel / representative point) |
| bbox | [w,s,e,n] | 4 decimals |
| varieties | string[] | permitted grape varieties when the source provides them (EU dataset does) |
| styles | string[] | subset of: red, white, rose, sparkling, sweet, fortified, orange (when known from source) |
| reg | object | other regulatory fields when the source has them (max yield, min alcohol, reg year, EU file number, petitioner, CFR section...), short keys, values short |

Also write `site/data/geo/_index.json`: array of every appellation with `{id,name,alt,country,cat,subcat,area,parent,lp,bbox,bq}` (no geometry), used for search and lazy loading, plus `site/data/geo/_countries.json`: `{iso2: {bbox:[w,s,e,n], count:N, file:"fr.geojson", bytes:N}}`.

`site/data/geo/_overview.geojson`: one Point per appellation at `lp` with `{id,name,country,area,cat}`, for the low-zoom globe view.

Write a processing log to `work/{agent}-geo-log.md` noting sources, licences/citations, feature counts per country, and any countries whose boundaries are approximate.

### Sources (src keys)
- `eupdo`: Candiago S, Tscholl S, Bassani L, Fraga H, Egarter Vigl L (2022) "A geospatial inventory of regulatory information for wine protected designations of origin in Europe", Scientific Data 9:394. Data on figshare (collection doi 10.6084/m9.figshare.c.5877659). Covers every EU wine PDO with commune-based boundaries and regulatory info (varieties, yields etc.).
- `inao`: INAO "Délimitation parcellaire des AOC viticoles" (data.gouv.fr, Licence Ouverte). Parcel-level official boundaries for French AOCs including each Burgundy and Alsace grand cru.
- `ucdavis`: UC Davis Library AVA Digitizing Project, github.com/UCDavisLibrary/ava (CC0), official TTB boundaries.
- `wineaus`: Wine Australia Geographical Indications boundaries (data.gov.au, CC BY).
- `ne`: Natural Earth (public domain).
- `gb`: geoBoundaries (wmgeolab, CC BY) admin units used as proxies.
- others: add a key and document it in the log.

## Content output (written by research agents)
Each research agent writes JSON to `data/content/{file}.json` (UTF-8, valid JSON, check with `python3 -m json.tool`). Several agents may write parts of the same country (e.g. `fr_a.json`, `fr_b.json`); the integration step merges them. Shape:

```json
{
  "countries": [
    {
      "iso2": "fr",
      "name": "France",
      "tier": "major | notable | emerging | minor",
      "tagline": "one evocative sentence",
      "stats": {"vineyard_ha": 0, "production_mhl": 0.0, "year": 2024, "world_rank_production": 0, "note": "source, e.g. OIV 2025 report"},
      "overview": "narrative, paragraphs separated by \\n\\n",
      "history": [{"when": "c. 600 BC", "title": "Phocaeans found Massalia", "text": "...", "lat": 43.3, "lon": 5.37}],
      "classification": "how the quality/labelling system works and why it matters",
      "climate_soils": "...",
      "grapes": [{"name": "Cabernet Sauvignon", "note": "role in this country"}],
      "regions": ["Bordeaux", "Burgundy"],
      "further_reading": ["Book or site title, author"],
      "sources": [{"title": "...", "url": "..."}]
    }
  ],
  "regions": [
    {
      "country": "fr", "name": "Burgundy", "alt": ["Bourgogne"], "parent_region": null,
      "lat": 47.05, "lon": 4.83, "zoom": 8.5,
      "tagline": "...",
      "summary": "narrative", "history": "narrative", "terroir": "climate, soils, topography and why they matter",
      "grapes": "...", "styles": "...", "classification": "region-specific hierarchy (e.g. 1855, grand cru/premier cru, Prädikat, MGA, beneficio)",
      "appellations": ["Chablis", "Gevrey-Chambertin", "..."],
      "sources": [{"title": "...", "url": "..."}]
    }
  ],
  "appellations": [
    {
      "country": "fr", "name": "Gevrey-Chambertin", "match": ["Gevrey-Chambertin", "Gevrey Chambertin"],
      "cat": "AOC", "region": "Burgundy", "subregion": "Côte de Nuits",
      "created": "1936", "area_ha": 400, "styles": ["red"], "dominant_style": "red",
      "grapes": "Pinot Noir",
      "summary": "narrative (what it is, why it matters, what it tastes like)",
      "terroir": "...",
      "producers": ["Domaine Armand Rousseau", "Domaine Denis Mortet"],
      "nerd_note": "one specific detail a sommelier would love",
      "contains": ["Chambertin", "Chambertin-Clos de Bèze"]
    }
  ],
  "sites": [
    {
      "id": "site-fr-chambertin", "country": "fr", "name": "Chambertin",
      "kind": "grand_cru | premier_cru | cru | vineyard | mga | lieu_dit | village | estate | chateau | quinta | house | cellar | historic | museum | landscape",
      "class": "Grand Cru (AOC 1937)", "appellation": "Gevrey-Chambertin",
      "lat": 47.2135, "lon": 4.9645, "coord_quality": "precise | approx",
      "text": "30 to 150 words, specific and vivid",
      "producers": ["Domaine Armand Rousseau"]
    }
  ]
}
```

Rules for content:
- `match` must hold the name exactly as in the official register (EU eAmbrosia / national register / TTB / Wine Australia), plus common variants. This is how text gets joined to map polygons.
- Write like an expert who loves telling the story: every fact should come with why it matters (what it does to the wine, the history, the people). Specific beats general. Plain, direct sentences. No em dashes.
- Depth by importance: famous appellations 150 to 350 words of summary plus terroir and producers; mid-tier 60 to 150 words; obscure ones at least 2 to 3 informative sentences. Countries tiered "major" get 500 to 900 words of overview and 6 to 15 history entries; "minor" countries 150 to 350 words and 2 to 5 history entries.
- Coordinates: decimal degrees, 4 decimals. Verify estates, crus, quintas and historic sites with a web lookup (Wikipedia / official site / mapping pages) where you are not sure; mark `coord_quality` honestly. A site must sit on the right hillside, not in the wrong village.
- Numbers (hectares, production, dates of recognition, classification years) should be checked against current sources (OIV, national bodies, consortia, TTB) where feasible. Current date is October 2026: reflect recent changes (e.g. Saint-Émilion classification 2022 and departures of Ausone/Cheval Blanc/Angélus, Rioja zonas/viñedos singulares 2017+, Bordeaux grubbing up, Chianti Classico UGAs 2021, new AVAs approved through 2026, German VDP/law reforms, Austria DAC additions).
- Keep each agent's research log and source list in `research_notes/Wine atlas geography and history/{topic}.md`.

## Front end (built later by the build step)
MapLibre GL JS 5.x from cdn.jsdelivr.net/npm (pinned exact version, ≥ 2 weeks old), globe projection; basemap from Natural Earth GeoJSON in `site/data/base/`; appellation polygons from `site/data/geo/`; glyph PBFs in `site/fonts/{fontstack}/{range}.pbf` (fontstack folder names ASCII without spaces).
