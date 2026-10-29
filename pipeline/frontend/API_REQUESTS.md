# API requests

Requests from module engineers to the lead. Each module ships a shim in the meantime, so nothing breaks if a request is declined.

## From the sommelier tools (30_somm*.js)

**Status (2026-10-28): all six were implemented by the lead (see API.md). 30_somm.js now calls `VM.map.captureTap`, `VM.map.labels`, `VM.data.ensureGeo`, `data:geo` and site-aware `VM.highlight`. Its own code is only a fallback for older builds.**

One small follow-up, not blocking: `VM.map.labels(false)` hides the label layers that exist at the time of the call. Layers added later stay visible until the next call (for example towns arriving with the second data wave during a quiz). The study module calls `wave2()` before a quiz starts, so this rarely happens.

1. **Exclusive map taps: `VM.map.captureTap(fn) -> release()`.** While a capture is active, a tap or click on the map calls `fn({lngLat, point, features})` and does not open a profile or show the hover tooltip. Study "Find it on the map" needs this.
   Shim: a capture-phase `click` listener on `#map` that stops propagation, ignoring drags of more than 6 px. The tooltip is hidden through `#app[data-sm-quiz]` in 30_somm.css.
2. **Temporarily hide place names: `VM.map.labels(false | true)`.** This should hide appellation, fine-unit, region, town and site labels, and restore exactly the previous visibility afterwards. Quizzes must not print the answer on the map.
   Shim: saves each layer's `visibility` (and the `text-field` of `site-icon`), sets them to `none` or empty, and restores them.
3. **Load a country's polygons without highlighting: `VM.data.ensureGeo(iso2, {fine}) -> Promise<bool>`.** Study frames a deck's area and must wait for its shapes. `VM.data.geometry(id)` downloads the country file a second time, outside the map's queue.
   Shim: calls the core `ensureCountryGeo` when it exists.
4. **Pulse marker: `VM.map.pulse(lon, lat)` and `VM.map.clearPulse()`.** This would reuse the core `.pulse` marker for reveals.
   Shim: the module creates its own `maplibregl.Marker` with the same `.pulse` markup.
5. **`data:geo` event (`iso2` payload) when a country's polygons have been added.** Filters fall back to `clim` from loaded features when `topo/_attrs.json` is absent, so they need to re-count when more countries arrive.
   Shim: `APP.on('geo')`, guarded.
6. **Highlight of site ids.** `VM.highlight` currently assumes appellation ids. Site ids could get a ring marker, or be filtered out silently.
   Shim: the module passes only appellation ids and draws its own ring for sites.

## From the cellar journal (20_journal.js)

None of these block anything; the journal ships a shim for each.

1. **Layer toggles from modules in the Layers view: `VM.layers.add({id, label, note?, get(), set(on)})`.** The journal has two map layers, "My bottles" and "Places" (visited and want to visit), that belong in the Layers menu next to Sites and Rivers.
   Shim: the two toggles sit at the foot of the journal panel ("On the map").
2. **A non-exclusive tap and hover hook for a module's own layers: `VM.map.onLayerTap(layerIds, fn, {hover: fn → {name, meta}})`.** This would run before the profile hit test when one of those layers is under the finger, and supply the shared tooltip text. `captureTap` is exclusive, so it does not fit pins that stay on the map.
   Shim: a capture-phase `click` on `#map` that stops propagation when a `jr-*` layer is hit, and does nothing while `#app[data-capture]` is set. A later `mousemove` frame callback overwrites `#tip` while the pointer is on a pin.
3. **`data:sites` (and `data:regions`) events, or `VM.data.loadSites()`.** Sites and region outlines arrive with the second data wave, and bottle pins at a cru need site coordinates before the user has zoomed in.
   Shim: the journal reads `data/geo/_sites.geojson` through `VM.data.json` (same cache as the core, so the file is downloaded once) and keeps its own id lookup.

## From the integrator (scripts/integrate.py), V2 depth phase

Data shapes for fine-unit profiles, ready now and live after the next integration run. Nothing changes for main appellations.

1. **Fine-unit profiles live in their own file**, so `data/content/{iso2}.json` stays lean: `data/content/{iso2}_fine.json` = `{"country": "fr", "fine_profiles": {"<fine unit id>": {name, cat, subcat, region, ..., summary, terroir, producers, nerd_note, "map": "poly"|"point"|null, "fine": 1, "lp"?: [lon,lat] (points only)}}}`. The profile objects have the same fields as `profiles` entries.
   - `data/content/{iso2}.json` gains `"fine_content": "fr_fine.json" | null` and `"fine_profile_count": N`.
   - `data/geo/_countries.json[iso2]` gains `"fine_content"` (same value) and `"fine_profiles"` (count). `"fine"` (the geo file) lists every `{iso2}_fine.geojson`, including new ones such as `es_fine.geojson`. A country can have `"file": null` and still have `"fine"`.
   - Lookup: `content.profiles[id] || (await fineContent(iso2)).fine_profiles[id]`, loaded lazily when a fine unit is opened or at fine zoom. Fetch it only when `fine_content` is non-null.
   - Profiles that v1 name-matched to a fine unit (6 in `it`, Alto Adige UGAs) move from `profiles` to `fine_profiles`.
   - The integrator also has `--inline-fine-profiles`, which writes the same map into `{iso2}.json` under `"fine_profiles"` and sets `fine_content: null`. Say so if one fetch suits you better.
2. **Which fine units have text:** `_index.json` and the fine geojson features carry `prof: 1`. Fine features with a profile take `style` from it; others inherit the parent's style.
3. **Fine profiles without a polygon yet** (explicit id not delivered as geometry) are points in `_extra_points.geojson` with `fine: 1` (and in `_index.json` with `fine: 1, pt: 1`). Show them only at fine zoom, like the fine polygons.
4. **Sites:** `app` can now be a fine unit id; `app_main` then holds the main appellation id (unchanged from the last run). Depth sites may give `app` explicitly; it is kept.
5. **Unchanged from the previous run, for reference:** polygon `pref` = profile id to open for a polygon without its own profile; site `app_label` for non-appellation labels ("Texas (no AVA)"); `region_hint` on sites; history `abroad: 1`.
