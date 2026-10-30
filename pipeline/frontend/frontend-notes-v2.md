# Vitis Mundi v2: front-end notes (lead)

Builds: `python3 -I frontend/build.py` writes `site/index.html` (Claude artifact, `VM_CONFIG.mode = 'artifact'`) and
`dist-gh/index.html` (GitHub Pages, `mode = 'gh'`) plus the PWA files in `dist-gh/` (manifest, `sw.js`, icons).
`--out DIR` makes a private pair (`DIR/index.html` artifact, `DIR/gh.html` Pages). `frontend/deploy_gh.py` copies
the Pages site into `/home/claude/wine-world/docs` (no git). **For front-end-only deploys, use
`deploy_gh.py --skip-data`** (alias `--only-frontend`). It copies only `index.html`, `sw.js`, the manifest, icons,
`.nojekyll` and `fonts/`, leaves `docs/data/` untouched and removes nothing. It also warns about any data file the
new page lists that `docs/` lacks. Full data deploys only after `integrate.py` has run: other agents append raw
features to `site/data/geo/*_fine.geojson`, and those lack `clim` and `prof` until integration. `frontend/make_mapdata.py` precomputes
`site/data/map/{cover,journeys}.json` (rerun after geo or river changes).

Sources: `frontend/src/` core.js, map.js, ui.js (v1, with small hooks), vm.js (the `window.VM` API, see `API.md`),
v2_map.js (base maps, imagery, terrain, sunlight, journeys), v2_profile.js (sidecar sections, About credits),
v2_pwa.js, v2.css, head_gh.html (Pages-only head: manifest, icons, theme colour), boot.js (runs last), and
`modules/*.js|css` (00_config.js by the lead; journal and sommelier tools by the module engineers).

## What is new

### Artifact and Pages modes
Everything that needs the network (tiles, terrain, contour worker, photos, service worker, Supabase) runs only
when `VM.mode === 'gh'`. The artifact build keeps v1 behaviour and adds only the sections built from local
sidecars (terrain, vintages, drift, rules) and their credits.

### Base maps (Pages)
The layers button (top of the map controls) opens a popover: Standard, Satellite, Topographic, then 3D terrain
with an exaggeration slider, relief shading, contour lines, and shortcuts to the sunlight explorer and the river
journeys. The same controls sit at the top of Layers. The choice is remembered (except 3D).

- **Standard:** our vector style, plus relief shading from z5 (on by default, toggle).
- **Satellite:** EOX Sentinel-2 cloudless 2025 everywhere (to z14, overzoomed beyond). From z12.5 national
  aerial photographs replace it inside their country or state:
  - IGN France BD ORTHO (to z19)
  - swisstopo SWISSIMAGE, which also covers Liechtenstein
  - basemap.at orthofoto
  - IGN España PNOA
  - DGT Portugal Ortos 2021 (mainland, WMS)
  - USGS imagery (to z16)
  - DOP of Rhineland-Palatinate, Hesse, Baden-Württemberg (20 cm) and Bavaria (40 cm), all WMS
  - Luxembourg ortho
  - NSW Spatial Services imagery

  National tiles go through a `vmimg://` protocol. It requests a tile only where it touches the coverage polygon
  (`data/map/cover.json`, simplified from our country borders and Natural Earth states), and clips edge tiles to
  the border on a canvas, so no white or blank tiles from neighbouring countries show. National imagery starts at
  z12.5 because IGN and others serve their own satellite mosaics below z13, which would patchwork with Sentinel-2.
  Over imagery, appellation fills drop to about 30% strength and outlines strengthen. Labels switch to light ink
  with a dark halo in both themes.
- **Topographic:** OpenTopoMap worldwide. National topo maps from z8:
  - Plan IGN v2
  - swisstopo national map
  - basemap.at
  - IGN MTN raster
  - USGS Topo

  Labels use dark ink on a light halo. The paper map is dimmed slightly in the dark theme.
- **Terrain:** AWS Terrain Tiles (terrarium), with separate DEM sources for hillshade and 3D. 3D switches the
  projection to Mercator, because MapLibre's globe does not support terrain, and restores the globe when 3D goes
  off. It turns itself off below z3.6 and refuses below z5 with a toast. With 3D on: max pitch 80, tilt and turn
  buttons, two-finger rotate and pitch on touch, right-drag pitch on desktop. Profile flights keep the current
  pitch and bearing.
- **Contours:** maplibre-contour 0.1.1 (jsDelivr, pinned, BSD-3) generates vector contours in a worker from the
  same terrain tiles. Intervals run from 200/1000 m at z9 to 10/50 m at z14. Major lines are labelled in metres.
- **Attribution:** a small credit line in the map, shown whenever external tiles show. It names exactly the
  services in view: EOX, OpenTopoMap, each national service whose coverage polygon intersects the view, and the
  terrain tiles. The ⓘ button opens About. On phones it is one line (tap to expand) that sits above the cartouche,
  sheet or dock.

### Sunlight explorer (Pages; `#sunlight`, `#sunlight-<preset>`)
A dock with date and solar-time sliders. The hillshade switches to the `basic` method, anchored to the map, with
the illumination direction and altitude of the real sun over the map centre. The solar position uses the NOAA
declination series and solar time (noon = sun highest). The daylight band shows on the time slider. A night tint
appears below the horizon and a warm tint below 9°. "Play the day" runs the time slider (under reduced motion it
becomes "One hour later" instead). Four presets fly in 3D: Côte-Rôtie on an October morning, the Wehlener
Sonnenuhr on a June evening, Hermitage on a January afternoon, Pinhão at harvest noon. Opening the explorer
switches to the standard base, so the light and shade read clearly; closing it restores the previous base.

### River journeys (Pages; `#journeys`, `#journey-<id>`)
Nine journeys (corridors: 2 km for appellations, 1.6 km for fine units, 1 km for sites; chips are closest first):
- Mosel: Trier to Koblenz
- Douro: Barca d'Alva to Porto
- Rhône: Vienne to Avignon
- Loire: Sancerre to Nantes
- the Rhine through the Rheingau
- the Danube through the Wachau
- Garonne and Gironde: Langon to Saint-Estèphe
- Dordogne: Castillon to Bourg
- the Napa Valley floor

`make_mapdata.py` routes each journey along `rivers.geojson`: a graph over the line pieces, the shortest path
between the end towns, Chaikin smoothing, then 250 m steps. Gaps in Natural Earth (the Garonne below Bordeaux,
the Dordogne mouth) are bridged by joining line ends up to 13 to 18 km apart.

Caption sources, recorded with the distance along the route:
- appellation polygons within 1.2 km of the route
- fine units within 0.5 km
- sites within 1 km
- towns within 2.5 km

Playback:
- The player flies a 3D camera along the route with a smoothed bearing, at about two minutes per journey.
- Speed is 1×, 2× or 4×. Scrub to any point; pause with a tap on the map.
- Captions name the place (site, then town, then smallest appellation), the umbrella appellation, and chips for
  the units on the banks; those also light up on the map. Each chip opens its profile.
- Under reduced motion the play button becomes "Next stop" and jumps between stops.
- The journey switches to satellite and 3D, and restores both afterwards.

### Profile sections (`VM.panel.addSection`)
- **Photos** (hero slot, Pages only): the hero image sits in a box whose aspect ratio is fixed before it loads
  (clamped to 4:3 to 2.2:1, `object-fit: cover`). A gallery of up to four, lazy-loaded. Each photo shows its
  caption, author, licence link and Commons page. Only `upload.wikimedia.org` thumbnails are accepted. A broken
  image removes itself. Hidden until `data/photos/` exists.
- **Terrain** (appellations, fine units, sites): elevation p5 to p95 and mean, slope (mean, steepest quarter,
  degrees), flat share, an 8-petal aspect rose (radius ∝ √share, mean-aspect arrow) and a one-line reading:
  - The aspect wording depends on the hemisphere: midday sun, morning sun, evening sun, or away from the sun.
  - The cooling from foot to top uses 0.65 °C per 100 m.
  - Very steep ground gets a hand-work note.
  - Large or sampled zones (`sub`, more than 1,500 km², or a span over 900 m) get a "whole legal area, not just
    the vineyards" wording instead.
  - The flags `w` (water: no slope or aspect), `g90`, `r:500` and `n` under 10 (indicative) are stated in the
    source line.
- **Vintages** (appellations, sites, regions; fine units and sites inherit up the chain, which is said):
  - Rows: GST anomaly bars against 1991–2020 (warm and cool), then harvest rain, spring frost nights and days
    over 35 °C (heat days make 2003 stand out).
  - Event glyphs by kind: frost, hail, heat, drought, rain, flood, fire, smoke, great, cool, mildew, other.
  - Tap or drag on the strip, or use the arrow keys, to choose a year (ARIA slider). The detail shows mean, anomaly
    and rank, GDD, harvest rain against usual, frost nights and heat days, then the year's notes with their source
    links. Notes from elsewhere carry a "regional: Barolo" or "wider zone: Mosel" tag.
  - Chips list the researched years. The SH caveat is shown south of the equator.
- **Event rule:** an appellation shows its own events, its ancestors' and its content regions'. It also shows
  those of each region's flagship (the member appellation with the most events, or the runner-up when the place
  is itself the flagship). So Barbaresco shows Barolo's, Brunello shows Chianti Classico's, Douro and Porto show
  each other's, Pauillac shows Médoc's and Bordeaux's, Gevrey's crus show Côte d'Or's, and Einzellagen show the
  Mosel's. This lives in `VM.data.events(id)`, so modules get the same list.
- **Climate drift:** 1961–90, 1991–2020 and 2011–25 marks on a warmth scale, warming, GDD and season-rain change,
  the time-travel twin ("in 2011–25, Chambertin grew its grapes in the climate that Margaux had in 1961–1990") and
  the reverse twin. When `_drift.json` lacks an id, the card is computed from the normals in the vintage file.
- **Rules:** `regs/{iso2}.json` fields as a definition list with linked sources and the check date. It inherits
  from containing appellations, with a note. National rules sit in a collapsible below, or as their own section on
  the country profile.

### PWA (Pages)
- `manifest.webmanifest`: standalone, dark ocean theme, icons 192/512, maskable 512, Apple touch 180,
  favicon 32. The icons are drawn by `pwa_assets.py`: a night globe with a gold rim and garnet wine belts.
- `sw.js` (versioned by a hash of the page):
  - page: network-first, falling back to the cached page
  - `data/` and `fonts/`: cache on use with background refresh, capped at 400
  - map tiles, terrain and Commons photos: cache-first, capped at 2,500
  - CDN libraries and Google Fonts: cache-first
  - Supabase and everything else: untouched
- Registered only in the Pages build, on https or localhost. About shows an install box: a button when
  `beforeinstallprompt` fired, iOS instructions otherwise. A toast appears when the connection drops.

### Fixes from the live QA (work/qa_live/report.md)
- National imagery: the tile protocol no longer assumes an AbortController (`abort?.signal`). MapLibre sometimes
  passes none, which threw 38 uncaught errors during journeys.
- Bottles: `mhl × 100 / 0.75` million bottles. Italy now shows about 5,920 m; it was 10 times too low.
- Late data: a profile drawn before the country list, the index, the sites or `meta.json` had arrived re-renders
  once in place when they land, keeping its scroll and snap. This fixes the cold `#site-fr-chambertin` ("not on the
  map") and the cold "IT" for Italy. Sites wait up to 4 s for the index and site list.
- Same-named units: search rows and colliding map labels name the place. The order of preference is `ctx` from the
  index (when integration adds it), then the village in an alias ("Augenthal Kellerberg"), then the parent. Map
  labels get a second, smaller line only where a name repeats within a country.
- Desktop views bar: wraps into hairline-ruled rows, so Cellar, Filter, Compare and Study are always visible.
  Phones keep the sideways scroll with a fade.
- Unknown links (`#zz`, `#it-barolo-cannubi`): a "Nothing at this link" panel with a search button pre-filled
  from the link.
- After a journey or 3D ends, the camera levels (pitch and bearing 0) even if the easing was interrupted.
- Source lines show `meta.json` titles instead of raw keys, and no bare `#id`.
- Ledgers never break words. Four-figure ledgers sit two by two. Converted acres and square miles keep three
  significant figures.
- Phone tap targets are at least 24 px: breadcrumbs, credits and licence links, glossary See, notes, the
  attribution line and "Show key".
- New river-journey icon (three waves; the old one drew as a slash).
- Photos are not requested twice: a re-render moves the existing photo nodes back in.
- Soils are searchable. Fuzzy search keeps typo guesses only when nothing matches properly, and a misspelt word
  start must begin with the same letter ("brunello" no longer finds "La Jeunellotte").
- Desktop: the open side sheet pads the map, so the globe centres in the space left of it.
- Memory: country sources out of view for 60 s are unloaded beyond 12 loaded (6 on phones), and fine-unit sources
  out of view for 20 s beyond 3 (2 on phones). The open profile's country and the selection are kept; profile data
  stays. Raster tile caches are capped at 120 tiles per source (48 on phones).
- The journey route layer is renamed `rj-route` to stay out of the journal's `jr-*` namespace.
- `ctx` (from integration) appears in the meta of appellation, point and site results, and "name ctx" is
  searchable ("goldberg langenlois"). It also gives colliding map labels their second line, and appears in the
  sheet bar.
- The sheet bar names the place: "Cannubi · Barolo", "Ried Kellerberg · Dürnstein", "Quinta do Vesuvio ·
  Porto", "Burgundy · France". Before, it showed only the country or the kind.
- Leaving 3D: when the easing hasn't finished after 1.1 s, a timer stops the camera and levels it. On a slow
  device (the Rhône journey under SwiftShader) `moveend` never came, and the camera stayed at 63°.
- Custom views (`#journal…`, `#photo-review`) route at once at boot. They no longer wait for the country list.
- `deploy_gh.py --skip-data --include data/map` ships the front end's own map data (journey texts, coverage)
  without touching integration's files.
- Drinking window (`40_ageing`): its section keeps order 25 in `mid`, and 21–29 are reserved for it (API.md). Its
  sources are credited in About. The journal render hooks, cellar filter API and Compare hook it asked for belong
  to the journal and somm modules.
- Testing under load: with the machine at load 12 (other agents), cold deep links took 23–80 s under SwiftShader,
  48 s of it map initialisation. The panel follows within seconds of the data arriving.
- Left for other owners: ASCII-transliterated rules text (regs data), wiki signatures in photo credits and bad
  photos (photos data), stale country statistics (content), the climate outliers in `it-alto-adige-vetzaner` and
  `cn-shangri-la-deqin` (climate/topo data).
- Not done: the optional detailed vector basemap. It is worth doing, but it adds memory on phones, which the QA
  flagged as the main risk.

### Gestures
A two-finger twist rotates the map in every mode (globe and flat). Two-finger tilt is on only with 3D terrain, so
a twist cannot tip the map by accident. On desktop, right-drag or ctrl-drag rotates, and adds tilt only in 3D. The
compass resets to north (keeping the tilt in 3D) and turns gold, with a spoken bearing, while the map is turned.
Gestures on the bottom sheet never reach the map. Tested with CDP two-point touch on a 390 px phone: twist on the
globe and at z12.5, compass reset, no tilt from a two-finger drag outside 3D, tilt inside it, and a twist on the
sheet.

### Back keeps your place
Every route remembers the panel's scroll position and phone snap point. Going back, by the panel's back button or
the browser's, restores both after the re-render and keeps trying while async sections (terrain, vintages, photos)
grow the page, for up to 4 s or until the reader touches the panel. `history.scrollRestoration = 'manual'`.
Forward navigation starts at the top. Tested: Napa Valley to Oakville and back, and Gevrey-Chambertin to Aux
Combottes and back, on desktop and phone, with the button and with browser back. A route opened before
`_countries.json` arrives waits for it for up to 2.5 s, so profiles never show bare iso codes.

### Fine-unit profiles
Opening a fine unit (Burgundy climat, Einzellage, Ried, MGA...), a fine-only point, or a site inside a fine unit
lazy-loads `data/content/{iso2}_fine.json` (named by `fine_content` in the content file or in `_countries.json`)
and merges its `fine_profiles` into the country's profiles. Inline `fine_profiles` (integrate.py
`--inline-fine-profiles`) also work. Fine-only extra points (`fine: 1`) have their own layers, shown from fine zoom.
Fine units were already in search, and those with `prof: 1` rank higher.

### API additions for the module engineers (all in `API.md`)
- `VM.map.captureTap`, `VM.map.labels`, `VM.map.pulse` and `clearPulse`
- `VM.data.ensureGeo`, `VM.data.loadSites` and `loadRegions`, `VM.data.fineContent`
- `VM.layers.add` (module toggles in Layers) and `VM.map.onLayerTap` (non-exclusive taps and hovers on module
  layers)
- the sticky `data:sites` and `data:regions` events
- `VM.map.labels(false)` stays in force for label layers added later
- the `data:geo` event
- site ids in `VM.highlight`
- `VM.data.events` with the sibling rule
- `basemap` and `terrain` events

## Sources and terms (checked 2026-10-28; CORS checked from a browser origin for each)
| Service | Endpoint | Terms | Credit shown |
|---|---|---|---|
| EOX Sentinel-2 cloudless 2025 | tiles.maps.eox.at WMTS `s2cloudless-2025_3857` | CC BY-NC-SA 4.0 (2016/2017 layers CC BY 4.0); attribution must be visible in the map | "Sentinel-2 cloudless 2025 by EOX" + licence in tooltip and About |
| OpenTopoMap | {a,b,c}.tile.opentopomap.org | CC-BY-SA; free use if the server is not overloaded (no bulk downloads) | "Kartendaten © OpenStreetMap-Mitwirkende, SRTM; Kartendarstellung © OpenTopoMap (CC-BY-SA)" (in English) |
| AWS Terrain Tiles | s3.amazonaws.com/elevation-tiles-prod/terrarium | open data; credit Mapzen and the sources (3DEP, SRTM, EU-DEM, ...) | "Terrain Tiles (Mapzen, AWS Open Data)" |
| IGN France Géoplateforme | data.geopf.fr WMTS (ORTHOIMAGERY.ORTHOPHOTOS, PLANIGNV2) | public keyless endpoint, Licence Ouverte 2.0; WMTS has no usage limit | "IGN France" |
| swisstopo | wmts.geo.admin.ch (swissimage, pixelkarte-farbe) | free OGD, fair use (about 20,000 users/day is fair) | "© swisstopo" |
| basemap.at | mapsneu.wien.gv.at (bmaporthofoto30cm, geolandbasemap) | CC BY 4.0, no key | "basemap.at" |
| IGN España | www.ign.es/wmts/pnoa-ma, mapa-raster (MTN) | CC BY 4.0 scne.es | "PNOA and MTN © Instituto Geográfico Nacional" |
| DGT Portugal | cartografia.dgterritorio.gov.pt/ortos2021 WMS (PNG only) | no fees or access constraints declared | "Ortofotos 2021 © Direção-Geral do Território" |
| USGS The National Map | basemap.nationalmap.gov USGSImageryOnly, USGSTopo (to z16) | public domain | "USGS The National Map" |
| Rhineland-Palatinate DOP20 | geo4.service24.rlp.de WMS | dl-de/by-2-0, free | "© GeoBasis-DE / LVermGeoRP (2026)" |
| Hesse DOP20 | gds-srv.hessen.de ogc-free-images WMS | free under § 18 HVGG | "© GeoBasis-DE / HVBG (2026)" |
| Baden-Württemberg DOP20 | owsproxy.lgl-bw.de WMS | dl-de/by-2-0 | "LGL-BW (2026)" |
| Bavaria DOP40 | geoservices.bayern.de/od/wms/dop/v1/dop40 | CC BY 4.0 | "Bayerische Vermessungsverwaltung" |
| Luxembourg ortho | wmts.geoportail.lu opendata | no fees or constraints | "Administration du cadastre et de la topographie" |
| NSW Spatial Services | maps.six.nsw.gov.au NSW_Imagery | CC BY 4.0 | "© Spatial Services NSW" |
| maplibre-contour 0.1.1 | cdn.jsdelivr.net | BSD-3-Clause | About |
| Copernicus DEM GLO-30/90 (topo sidecar) | | Copernicus DEM licence; required notice reproduced in About | About |
| TerraClimate yearly, GHCN-Daily (vintage sidecar) | | CC0; public domain | About + section source line |

Checked but not used:
- Piemonte regional ortho: no CORS response through the proxy.
- Italy national (PCN) ortho: needs WMS with an Italian CRS and has no CORS.
- basemap.de (German topo raster): works, but OpenTopoMap covers Germany well.
- MapTiler (optional): set `VM_CONFIG.maptilerKey` in `modules/00_config.js` and satellite switches from
  Sentinel-2 to MapTiler `satellite-v2` (512 px tiles, to z20), and terrain, hillshade and 3D switch to
  `terrain-rgb-v2` (mapbox encoding). The national aerial services stay on top from z12.5, the credit line shows
  "© MapTiler © OpenStreetMap contributors", and keyed tiles are not cached by the service worker. Contours keep
  using the AWS tiles.

## Verified (Playwright + SwiftShader through the agent proxy; screenshots in `work/fe_v2_shots/`)
Harness: `frontend/test_v2.py <scenario>` (serve `site/` on :8791 and the Pages build on :8792 first).
- In tests, Commons thumbnails are served from a local placeholder, because Wikimedia's robot policy refuses
  headless browsers.
- There is no `response` listener: Playwright would keep every Response object alive, and tile-heavy pages run to
  gigabytes. Chrome logs 4xx and 5xx to the console anyway, and the console is captured.
- 3D views run at 1100×720 in their own process, because SwiftShader under the machine's shared memory limit
  crashes at 1440×900 with terrain.

Screenshots:
- **Satellite over Burgundy:** IGN BD ORTHO at z15, vine rows visible, light fills, credit "Sentinel-2 cloudless
  2025 by EOX · IGN France": `sat-burgundy-z15.png`. Also `sat-burgundy-z11.png`, `sat-rhone-z8.png`, and on a
  phone `final-phone-dark-sat-burgundy.png`.
- **3D terrain:** the Mosel at Wehlen (light theme, the Einzellagen draped on relief, credits for EOX, IGN, RLP
  and the terrain tiles): `3d-mosel-wehlen.png`. The Douro gorge at Pinhão (dark): `3d-douro-pinhao.png`.
- **Topographic:**
  - The Wachau on basemap.at at z13, with the Rieden in dark ink: `topo-wachau-z13.png`.
  - Barolo on OpenTopoMap: `topo-barolo-contours.png`.
- **Sunlight explorer:** Côte-Rôtie on 5 October at 08:30 solar time. The south-east-facing Côte Brune and Côte
  Blonde are lit and the rest is in shade, in 3D: `dbg-sun.png`. The earlier bug is fixed: the shading sat under
  the appellation fills.
- **River journeys:** `journey-mosel-km44.png`, `journey-douro-pinhao.png`. Corridors were widened to 1.6 km for
  fine units and 2 km for main appellations, because the smoothed Natural Earth line cuts across meanders (the
  Bernkasteler Doctor is 2.6 km from it). At km 44 the chips now name Lieser, Zeltingen and the Wehlener
  Sonnenuhr.
- **Profile sections** (artifact build):
  - terrain card with rose and reading: `prof-wehlen-terrain.png`
  - vintage strip inherited from the Mosel, with regional notes: `prof-wehlen-vintage.png`
  - Barbaresco showing Barolo's events: `prof-barbaresco-vintage.png`
  - Hermitage drift and twins: `prof-hermitage-drift.png`
  - Napa's whole-legal-area wording: `prof-napa-terrain.png`
  - Wachau rules: `prof-wachau-rules.png`
- **PWA:** the service worker takes control on reload, and the caches fill on use (page, data, libraries,
  tiles). Then, offline: reload and open the Douro, and the profile renders with every section (terrain, vintages,
  drift, rules, journal, compare). `pwa-offline-douro.png`.
- **Phone docks (360):** base-map popover, Wachau journey dock, Wehlen sunlight dock: `phone-bm-popover.png`,
  `phone-journey-wachau.png`, `phone-sun-wehlen.png`. The popover and journey dock overflowed at 360 (content-box
  sizing; a grid column stretched by the chip row); both are fixed.
- **Phone 360 light:** Quinta do Vesuvio with terrain, vintages via Porto and drift: `phone-prof-vesuvio-*.png`.
  About credits: `phone-about-credits.png`. No horizontal scroll (360/360/360).
- **Integrated passes with all modules (journal, compare, filter, study, tasting).** Each one visits the globe, an
  appellation, a site, a country, Layers, Cellar, Compare, Filter, Study, journeys, About, a grape and a region:
  - phone 390×844 dark and light, desktop 1440×900 light and 1280×800 dark, artifact phone
  - screenshots `final-<tag>-*.png`
  - result on 2026-10-29: **no console errors or warnings in any pass**, and no horizontal scroll. Deployed to
    `wine-world/docs` twice (checkpoint, then this state).

## Limits and follow-ups
- Memory, carried over from v1: country polygon sources are never unloaded. A country profile at country scale
  (Italy) loads about 24 neighbouring countries' polygons. That is fine on desktops; on older phones this, plus 3D
  terrain, is the first place to look if tabs reload. Unloading far sources is the next step.
- Photos of grapes, timeline events and soils come from `_global.json`, which is keyed without the route prefix.
  The lookup strips `grape-`, `event-`, `soil-` and `term-`; before this fix the 108 event and 76 soil photos never
  showed. Events show them in their profile; the Lexicon shows one lazy photo per soil (31 of 33 have one), read
  through `VM.data.photos`, so the photo-review module's hide-flagged filter applies there too.
- About has a section slot: `VM.panel.addSection('about', fn)` and the `about:render` event (About does not fire
  `profile:open`, and `'*'` sections skip it).
- Photos: hero and gallery load lazily from the stored Commons URLs, and the gallery uses `thumb_small` when it is
  there. A photo that fails removes itself, and the section hides when an id has no photos. Wikimedia refuses
  headless browsers, so tests use a local placeholder.
- National imagery appears from z12.5 only (z13 tiles), so between z10 and z12.5 the Sentinel-2 mosaic shows
  everywhere. This is a deliberate choice: below z13 several services serve their own satellite mosaics.
- Coverage polygons are simplified to about 800 m (3 km for the US), so tiles right at a border may show a strip of
  Sentinel-2.
- Journeys use Natural Earth river lines (about 4 to 5 km between vertices), so the camera floats over the valley
  rather than tracing every meander. Some legs are bridged straight (Bordeaux to Bec d'Ambès).
- The sunlight explorer uses solar time, not clock time (it shows no time zone). The hillshade shows light and
  shadow on the slope itself, not cast shadows from opposite ridges (MapLibre has no shadow casting).
- 3D terrain needs WebGL2 and a reasonably recent phone. Under SwiftShader, 1440×900 pages with terrain can crash
  the renderer; the tests run 3D at 1280×800.
- The MapTiler path is wired up but untested (no key here). Check MapTiler's terms for public, keyed use
  before adding one: the key is visible in the page.
- The service worker caps data at 400 entries and tiles at 2,500 by count, not size; the biggest data files are
  4 to 5 MB.
