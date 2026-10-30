# Vitis Mundi v2: plan and contracts

v1 is a single-page MapLibre globe published as a Claude artifact (sandboxed: no external network). v2's main home is **GitHub Pages** (`https://vitismundi.app/`, served from `docs/` of repo Tolar-dio/wine-world), where external tiles, APIs, photos and a Supabase backend are allowed. Read SPEC.md, DATA_CONTRACT.md and FRONTEND_BRIEF.md for v1. Everything in v1 stays; v2 adds:

1. Base maps: Standard (our vector style) / Satellite / Topographic, plus 3D terrain, hillshade, contour lines, high-resolution national aerial photos where free, a sunlight explorer and river fly-throughs.
2. Sommelier tools: (a) slope/aspect/elevation for every appellation, fine unit and site; (b) compare up to 3 places side by side, with "climate twins"; (c) multi-criteria filters; (d) study mode (map quizzes, regulation flashcards, deductive tasting trainer, spaced repetition); (e) vintage view from weather records, with climate drift since 1961–1990.
3. Cellar journal (Supabase): bottles with WSET-style structured tasting notes, label photos, ratings, cellar and wishlist; notes on any place; visited/want-to-visit lists; "passport" progress; pins on the map.
4. Photos: freely licensed Wikimedia Commons images with credits on profiles.
5. Installable PWA with offline cache of visited data.

## Ground rules
- IDs are the v1 ids (appellations `fr-sauternes`, fine units in `{iso2}_fine.geojson`, sites `site-…`, regions `region-…`, countries iso2, grapes from grapes.json). Read `site/data/geo/_index.json`, `_sites.geojson`, `_regions.geojson` to resolve ids. Never invent ids.
- New data goes into **new sidecar files** under `site/data/{topo,vintage,photos,regs,study}/`. Do not modify v1 geo/content files or scripts/integrate.py (another step owns them).
- External services used at runtime must allow this use (licence/terms) and be credited in the About view. Prefer free, keyless sources. Document every source + licence in your log under `work/`.
- Text: no em dashes; story-driven, specific, as in RESEARCH_BRIEF.md.

## Sidecar data contracts
- `site/data/topo/{iso2}.json`: `{ "<feature id>": {"e": mean_m, "e5": p5_m, "e95": p95_m, "s": mean_slope_pct, "s75": p75_slope_pct, "a": circular_mean_aspect_deg_or_null, "ar": [N,NE,E,SE,S,SW,W,NW shares summing ~1, of cells with slope ≥ 2%], "fl": share_flat_lt2pct, "n": cell_count} }` for every main polygon and fine unit of that country; sites in `site/data/topo/_sites.json` keyed by site id (stats in a 150 m radius). Source: Copernicus DEM GLO-30 (© DLR/Airbus, provided under COPERNICUS by the European Union and ESA; free licence).
- `site/data/topo/_attrs.json`: compact attributes for filtering/comparing without loading geometry: `{ "<id>": [country, gst, gdd, hi, prec, gsp, dtr, mjt, elev_mean, slope_mean, aspect_mean, area_km2, fine(0/1)] }` plus a `"_cols"` key naming the columns. Built from the geo files' `clim` + topo.
- `site/data/vintage/{iso2}.json`: `{ "<appellation or region id>": {"y0": first_year, "gst": [...], "gdd": [...], "hi": [...], "gsp": [...], "hr": [...harvest-window rain], "fr": [...spring frost proxy], "hd": [...heat proxy], "n6190": {gst, gdd, gsp}, "n9120": {gst, gdd, gsp}} }` arrays aligned by year; harvest-year convention (Southern Hemisphere season Oct–Apr labelled by the April year). `site/data/vintage/_events.json`: researched notable vintage events per region id: `[{"id": region_or_app_id, "year": 2021, "kind": "frost|hail|heat|drought|rain|fire|smoke|flood|great", "text": "..." , "src": "..."}]`.
- `site/data/photos/{iso2}.json` and `site/data/photos/_global.json` (grapes, soils, timeline events): `{ "<id>": [{"file": "File:….jpg", "thumb": "https://upload.wikimedia.org/…/640px-….jpg", "w": 640, "h": 427, "author": "...", "license": "CC BY-SA 4.0", "license_url": "...", "page": "https://commons.wikimedia.org/wiki/File:…", "caption": "..."}] }` (1–4 per id).
- `site/data/regs/{iso2}.json`: `{ "<appellation id>": {"varieties": "...", "min_alcohol": "...", "max_yield": "...", "ageing": "...", "release": "...", "styles": "...", "labelling": "...", "sweetness": "...", "other": "...", "src": [{"title","url"}], "verified": "2026-10"} }` (strings, concise; only fields that apply).
- `site/data/study/decks.json`: `{ "decks": [{"id","title","group","description","mode": ["find","name","flash"], "cards": [{"id","target": "<entity id>", "q": "...", "a": "...", "hint": "..."}]}] }`; `site/data/study/tasting.json`: per grape id structural profile for the deductive trainer: `{ "<grape id>": {"styles": {"<style>": {"colour": [...], "acid": [lo,hi], "tannin": [lo,hi], "body": [lo,hi], "alcohol": [lo,hi], "sweetness": [lo,hi], "aromas": [...], "oak": "...", "classic_regions": [{"id": "<app id>", "markers": "..."}]}}}}` on 1–5 scales (low, med-, med, med+, high).

## Front-end architecture (v2)
Sources in `frontend/src/` (body.html, core.js, map.js, ui.js, styles.css) are concatenated by `frontend/build.py`. v2 adds `frontend/src/modules/*.js` and `*.css`, included automatically by build.py in filename order after ui.js. The lead front-end engineer exposes a stable API on `window.VM` early, which modules use:

```
VM.map                      // maplibregl.Map
VM.data                     // { index, indexById, countries, sites, regions, varieties, climrefs, grapes(), timeline(), ... } lazy getters
VM.open(type, id)           // open a profile: 'country'|'region'|'appellation'|'site'|'grape'|'event'|'soil'|'term'
VM.flyTo(id | {lon,lat,zoom})
VM.highlight(ids, {dimOthers})  VM.clearHighlight()
VM.panel.show(viewId, {title, render(el)})   // open the sheet with a custom view (journal, study, compare, filters)
VM.panel.addSection(type, fn(el, entity))    // modules add sections to profiles (e.g. "Your notes", "Your bottles", photos, vintage)
VM.nav.add({id, label, icon, onClick})       // add an entry to the top segmented control / menu
VM.search.pick({types, onPick})               // reuse search UI to pick an entity
VM.on(event, fn)            // 'profile:open', 'map:ready', 'theme', 'auth' ...
VM.toast(msg)
VM.fmt                      // number/area/coordinate formatters
VM.tokens()                 // current theme colours
```

## Supabase
Schema: `supabase/migrations/20261028000001_journal.sql` (bottles, place_notes, place_lists, study_cards, study_sessions, saved_filters; RLS owner-only; private storage bucket `labels` with per-user folders). Front end: supabase-js v2 UMD from cdn.jsdelivr.net (pinned). Config in `frontend/src/modules/00_config.js`: `VM_CONFIG = {supabaseUrl, supabaseAnonKey, siteUrl}` (placeholders until the project exists). Auth: email magic link (redirect to the Pages URL). Signed-out users get a local-only journal (localStorage) that migrates to the cloud on sign-in.

## Supabase project (live)
- Project: `vitis-mundi` (ref `mhnlohxzunwsmlutzrmz`, region us-west-1), schema from the migration above applied as migration `journal` (no security advisor warnings).
- URL: `https://mhnlohxzunwsmlutzrmz.supabase.co`
- Publishable key (safe in client code; RLS protects data): `sb_publishable_TbL2H1jE_WMtdicZutYWpw_dl2veQt6`
- Auth: email magic link with PKCE (`flowType: 'pkce'`, redirect `https://vitismundi.app/`); the site uses `#hash` routing, so the auth callback must come back as `?code=` and be exchanged then stripped from the URL. The owner must add the Pages URL to Authentication → URL Configuration (Site URL + Redirect URLs) in the dashboard.
