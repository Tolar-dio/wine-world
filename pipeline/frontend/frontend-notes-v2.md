# Vitis Mundi v2: front-end notes (lead)

Builds: `python3 -I frontend/build.py` writes `site/index.html` (Claude artifact, `VM_CONFIG.mode = 'artifact'`) and
`dist-gh/index.html` (GitHub Pages, `mode = 'gh'`) plus the PWA files in `dist-gh/` (manifest, `sw.js`, icons).
`--out DIR` makes a private pair (`DIR/index.html` artifact, `DIR/gh.html` Pages). `frontend/deploy_gh.py` copies
the Pages site into `/home/claude/wine-world/docs` (no git). `frontend/make_mapdata.py` precomputes
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
Nine journeys:
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

### API additions for the module engineers (all in `API.md`)
- `VM.map.captureTap`, `VM.map.labels`, `VM.map.pulse` and `clearPulse`
- `VM.data.ensureGeo`
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
(filled in below by the test runs)

## Limits and follow-ups
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
