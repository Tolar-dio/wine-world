# Front-end brief: Vitis Mundi

The end-all atlas for wine nerds who care about geography and history: an interactive 3D globe where every wine-producing country is clickable, and zooming in reveals real appellation boundaries across all countries at once (Châteauneuf-du-Pape and Barolo on screen together), each tappable for a deep profile. Audience: serious wine lovers, sommeliers, students (WSET/MS). The owner will mostly use it on a phone, so phone use must be first-class, but it should also be a joy on a laptop.

Read `/home/claude/winesite/SPEC.md` and `/home/claude/winesite/DATA_CONTRACT.md`. Build `site/index.html` (single HTML file; inline CSS and JS) that reads only the files in `site/` by relative URL.

## Hosting constraints (claude.ai Artifact; non-negotiable)
- The file is wrapped at publish time in `<!doctype html><html><head>(charset, viewport with viewport-fit=cover, small reset)</head><body>`. So write NO doctype/html/head/body tags. Start the file with `<title>Vitis Mundi</title>`, then `<meta name="claude:viewport-fit-sides" content="cover">`, then Google Fonts `<link>`s, `<style>`, markup, scripts.
- CSP: external scripts only from cdn.jsdelivr.net/npm/, cdnjs.cloudflare.com, unpkg.com (pin exact versions ≥ 2 weeks old). External stylesheets only from fonts.googleapis.com (fonts from fonts.gstatic.com). Everything else (including MapLibre's CSS) must be inlined. No other network: no tiles, no APIs. fetch() works only for files published next to the page. Web Workers from blob: are fine (MapLibre's are). For MapLibre sources and glyphs, build absolute URLs from the page location: `const BASE = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '')`; glyphs: `BASE + 'fonts/{fontstack}/{range}.pbf'` (string concat, not new URL(), which would encode the braces).
- No alert/confirm/prompt (they're inert); no window.print; links to other sites open in new tabs; no iframes.
- localStorage only for small per-viewer conveniences, wrapped in try/catch.
- Hash routing: only plain `#name` (ASCII letters, digits, hyphens). Use appellation/site/country/region ids as hashes (e.g. `#fr-chateauneuf-du-pape`, `#it`, `#site-fr-chambertin`, `#region-fr-burgundy`, `#grape-nebbiolo`, `#event-...`). Never use reserved names: settings, sidebar, customize, upgrade, downloads, comment-*. Handle load and `hashchange`.
- Theme: the host sets `data-theme="dark"|"light"` on the root element, or nothing (then `prefers-color-scheme` decides). Define every color as a token on bare `:root` (light values), redefine under `@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){...; color-scheme: dark} }` and again under `:root[data-theme="dark"]{...; color-scheme: dark}`. `body` gets an explicit token background. Map paint colors must come from the same tokens (read via getComputedStyle) and update when the theme changes (matchMedia listener + MutationObserver on documentElement's data-theme).
- Layout: the skeleton pads `:root` by safe-area insets top/bottom; keep that. Side gutters use `padding-left: max(16px, env(safe-area-inset-left, 0px))` / right likewise on the outer UI wrappers. Fixed overlays add the relevant `env(safe-area-inset-*)` to their offsets. Size the app with `height:100%` on html/body (not 100vh). No horizontal page scroll at 360–400px width.
- Respect `prefers-reduced-motion` (no auto-rotate, instant flyTo). Visible focus states. Every control has an accessible name.
- Total page must load fast on a phone: show the globe within a couple of seconds using `countries_low.geojson` and `_overview.geojson`; lazy-load each country's polygons (`data/geo/{iso2}.geojson`) only when the camera is at zoom ≥ ~4.5 and its bbox intersects the view (plus whatever the user opens); cap concurrent loads; show a small, honest loading indicator.

## Engine
MapLibre GL JS 5.x (latest stable 5.x release at least two weeks old; jsDelivr `maplibre-gl@<exact>/dist/maplibre-gl.js`; inline the matching `maplibre-gl.css` content into the page `<style>`). Globe projection (`projection: {type: 'globe'}` in the style or `map.setProjection`), atmosphere/sky subtle. No raster tiles: the style is built entirely from our GeoJSON. Use `promoteId: 'id'` and feature-state for hover/selected. Per-country GeoJSON sources with an identical set of layers per source (fill, outline, selected outline) added on load, placed in the right z-order (use `beforeId` anchors). One labels source of appellation label points. Symbol layers use our glyphs (`atlas-italic`, `atlas-regular`, `atlas-sc` in `site/fonts/`; check what actually exists there). Generate site/kind icons at runtime with canvas + `map.addImage` (no sprite files).

## Design direction
Name: **Vitis Mundi**. Concept: a cartographer's cellar book. The globe floats in a deep night ocean; the UI reads like an atlas plate with marginalia; profiles are typeset like a fine reference book. Colour comes from the subject itself: appellations are tinted by the colour of the wine in the glass.

Type (Google Fonts, with real fallbacks):
- Display: "IM Fell English" (titles, italic for place names) and "IM Fell English SC" (eyebrows, small-cap labels, country names), used with restraint.
- Body: "Literata" (optical sizes; comfortable 16–17px reading size on phones, ~65ch measure).
- Data: "IBM Plex Mono" for figures: hectares, coordinates, dates, GDD, elevation; `font-variant-numeric: tabular-nums`.
Set a real type scale and keep to it. `text-wrap: balance` on headings.

Palette tokens (adjust for contrast, keep the idea):
- Dark (likely the hero look): ocean `#0f1422` (blue-black with a violet bias), land `#1d2230`, wine-country land a touch lighter, borders `#39415a`, text `#ebe6dc`, muted `#9aa1b2`, panel `#151a28` with a hairline border, accent garnet `#c44a63`, highlight gold `#e0b04c` (selection outline).
- Light: ocean `#d9e2e8`, land `#f7f6f2`, borders `#aab3bf`, text `#1c2030`, muted `#5d6577`, panel `#fbfaf7`, accent garnet `#8e1f3b`, highlight `#b07a12`.
- Wine-style colours (semantic map colours, tuned per theme for contrast): red = garnet, white = straw, rose = salmon, sparkling = pale citrine, sweet = amber/gold, fortified = tawny brown, orange = amber-orange, mixed = muted lees violet-grey. Fills translucent (≈0.18–0.35 depending on nesting and zoom), outlines crisper.
Avoid the generic AI looks (cream paper + terracotta, near-black + one acid accent, purple gradients, emoji, everything centred, rounded cards with shadows everywhere). Cards/borders only where an element is an object; panels are flat sheets with hairlines.

## Experience
Globe at rest: slow auto-rotation until first interaction (not under reduced motion). Wine countries subtly lighter; appellation overview points glow faintly, coloured by style, sized by sqrt(area), so the world's wine belts read at a glance. Optional faint 30°–50° N/S "wine belt" bands and graticule (toggle; on by default at low zoom only).

Zoom: from z≈4.5 polygons fade in for every country in view (multi-country at once), region outlines/labels (`_regions.geojson`) at ≈4–8, appellation labels sorted by area with collision, rivers and lakes (wine rivers emphasised and labelled in italics, they matter to terroir), town labels for orientation, sites (`_sites.geojson`) as small icons by kind at z≥8 with labels at z≥10, fine units (`{iso2}_fine.geojson`) at z≥10. Nested appellations stack visibly (smaller ones on top).

Tap/click:
- low zoom: a country → country profile; "Explore the map" flies to its bbox.
- higher zoom: the smallest appellation under the finger; show a compact "stack" of everything under that point (e.g. Bourgogne › Côte de Nuits-Villages › Gevrey-Chambertin › Chambertin) so the user can hop between nesting levels.
- site icon → site profile; region label/outline → region profile.
- Hover on desktop: highlight + name tooltip.

Profile panel: desktop = right-side sheet (~420–460px) over the map; phone = bottom sheet with drag handle and three snap points (peek showing title + key facts, half, full), swipe down to dismiss, map stays interactive above it. Contents:
- Appellation: eyebrow (country · category · subcat), title, ancestry breadcrumb (clickable), ledger row (area, created year, boundary quality with an honest one-line explanation of `bq`: official line / commune-based / administrative proxy / approximate, style chips), climate block when `clim` exists (growing-season temperature on a 13–24 °C scale with a marker and a few reference ticks from `_climrefs.json`, Winkler region, Huglin, rainfall, elevation range; plain-language note on what it means for the wine; cite the climate dataset), narrative sections (summary, terroir, producers, nerd note), permitted varieties as chips (tap → grape view), sub-appellations list, sites within, data source line. If no written profile: still show the data (category, varieties, climate, parent, children, regulatory facts in `reg`) and say the written profile is pending rather than leaving it blank.
- Country: tagline, stats ledger, overview, history as a vertical timeline (each entry tappable to fly to its coordinates), classification system, climate and soils, grapes, regions list (tap → fly + region profile), count of mapped appellations, further reading, sources.
- Region and site profiles analogous.
Long text renders paragraphs from "\n\n" and *italic* only (escape everything else).

Other views (a compact segmented control or menu; panel-based on phones):
- **Search** (always available, top): instant fuzzy search over countries, regions, appellations (`_index.json`), sites, grapes, glossary terms; diacritic-insensitive ("chateauneuf" finds Châteauneuf-du-Pape); keyboard navigable; results show type + country.
- **Grapes**: searchable list; a grape card with colour, synonyms, birthplace pin on the globe, a small family tree (parents → grape → notable offspring, each tappable), profile and trivia; the map highlights every appellation that permits it (`_varieties.json`) and dims the rest; a "where it grows" list grouped by country.
- **Timeline**: 9,000 years of wine as a horizontal, scrollable strip grouped by era (on phones a vertical list in the sheet); tapping an event flies the globe to it with a pulsing marker and shows the story; a "Play" tour that steps through events (pausable). This is the one orchestrated, cinematic moment of the site: make it beautiful.
- **Soils** and **Glossary** and **Systems** (quality-system comparisons): readable reference lists; soil examples are tappable map locations.
- **Layers & colour**: toggles for appellations, sites, rivers, lakes, region outlines, wine belt, graticule, labels; "Colour by": wine style (default) | climate (growing-season temperature, cool blue → hot red ramp, from `clim.gst`) | elevation | country. A legend that matches the current mode.
- **About**: what the site is, data sources and licences from `meta.json`, the honest limits (boundary quality types, climate grid resolution and normals period).

Details that make nerds happy: show coordinates of the map centre in mono in a corner (e.g. 44.06°N 4.83°E), a scale bar, latitude readout in the profile ("45.0°N, same latitude as..."), units in metric with imperial in a muted secondary where natural (ha/acres, m/ft).

Quality bar: no console errors; 60fps-ish panning on a mid phone; nothing overlaps at 360px width; every text readable in both themes; it must still work if some data files are missing (show what exists).
