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

**Status (2026-10-29): all three implemented by the lead. 20_journal.js now uses `VM.layers.add`, `VM.map.onLayerTap` and `data:sites` / `VM.data.loadSites()`; its own code is only a fallback for builds without them.**

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

## From the photo review (25_photos_review.js)

1. **A hook to add a block to the About view** (for example `VM.panel.addSection('view:about', fn)`, or a `view` event for the built-in views). The "Help check photos" link is appended by a MutationObserver on `#sheet-body` while the hash is `#about`.
2. **Bug: event and soil photos never render.** `SIDE.photos('event-abydos-scorpion-i')` looks up `j['event-…']`, then strips only `grape-`; `_global.json` keys events and soils without their prefix (`'abydos-scorpion-i'`, `'albariza'`). 108 event photos and 76 soil photos are in the file. Suggested fix in `vm.js`: `j?.[id] || j?.[id.replace(/^(grape|event|soil|term)-/, '')]`. The review grid already lists them, and the inline control will appear on them once they render.

## From the ageing module (40_ageing.js, "When to drink")

None of these block anything: the module works today by watching `#sheet-body` with a MutationObserver and decorating what the journal and Compare render. Each hook would replace a piece of that.

1. **A journal render hook.** For example `VM.emit('journal:render', {kind: 'main' | 'card' | 'form' | 'from', tab, el, bottle})` after `showMain`, `showCard`, `showForm`, `showFrom` and each `rerender`, plus `{kind: 'row', el: li, bottle}` per bottle row (also in the profile section "Your bottles from here"). The ageing module adds a window gauge to each cellar row, a "When to drink" block after the ledger on the bottle card, a "Suggest window" button under the drink-window fields, and a filter bar to the Cellar tab.
   Shim: MutationObserver on `#sheet-body`; elements are marked `data-ag` so each is decorated once.
2. **The ids the form holds.** `[data-slot="site"] .jr-pp-name` carries only the site's name, so "Suggest window" finds the site by name (the edited bottle's `site_id` first, then a name match within the appellation). A `data-id` attribute on both picked-place names, or `VM.journal.formState()` → `{appellation_id, site_id, vintage, style, classification}`, would make it exact.
3. **Cellar tab sort and filter.** `VM.journal.addCellarView({id, label, classify(bottle) → bucket, order})` or similar, so the buckets (Drink now, Drink soon, Hold, Past peak) can live in the journal's own toolbar and survive its text filter.
   Shim: the module reorders the `li` rows in place and hides filtered ones with a class (`ag-off`), leaving the journal's `hidden` text filter alone.
4. **A Compare hook.** `VM.somm.compareSection(fn(places) → html | Promise, {before: 'twins'})` for a block in the Compare view.
   Shim: the module reads the picked ids from `.sm-picks .sm-pk-n a` and inserts "Typical ageing" before the "Climate twins" heading.
5. **Section order.** "When to drink" uses slot `mid`, order 25, to sit right after the vintage strip (20) and before climate drift (30), below the 50+ range the API reserves for modules. Please keep 21 to 29 free, or say which order to use.
6. **About view credit.** A line for the ageing data, e.g. "Ageing windows: typical ageing profiles and published vintage charts (Wine Spectator, Systembolaget and others), each linked from its window; estimates for unreported years shift the typical window by at most three years for the season's weather (TerraClimate)." Either in `aboutV2HTML`, or through the About hook the photo review asked for.

## From the integrator: `ctx` disambiguation and soils in search (2026-10-30)

Live after the next integration run.

1. **`ctx`** (string of 30 characters or fewer, may be absent) is a short place qualifier so same-named units can be told apart in search: 25 × "Ried Goldberg", 7 × "Sonnenberg" and so on (1,665 index entries share a name within their country).
   - **Where it appears:** every `_index.json` entry, `_extra_points.geojson` and `_sites.geojson` properties, `sites[]` in `data/content/{iso2}.json`, and the properties of every main and fine geo feature.
   - **What it holds:**
     - Einzellagen: the Gemarkung (village).
     - Rieden: the Katastralgemeinde (cadastral village), or the Gemeinde in Burgenland.
     - MGAs: the commune.
     - Burgundy premier crus and Corton climats: the village AOC, or the subregion when the name already contains the village.
     - Champagne cru villages: the subregion.
     - Lieux-dits: the appellation.
     - Rioja municipios: the zona.
     - Main appellations: the profile subregion, the parent name, the profile region or research region, or the state or admin-1 unit.
     - Sites: the appellation, with the main appellation used when the fine unit's name is too long.
   - **Collisions:** same-named units that would still collide get a second qualifier ("Langenlois, Kamptal"). Anything left ambiguous is listed in `work/integration-report.md`.
   - **Suggested use in `core.js` `rebuildSearch()`:**
     - Show it in `meta`: apps `[a.subcat || a.cat, a.ctx, countryName(a.country)].filter(Boolean).join(' · ')`, the same for `D.extra` (`e.ctx`), and sites `[KIND[s.kind] || 'Site', s.ctx, countryName(s.country)]`.
     - Make it searchable: `alt: arr(a.alt).concat(a.ctx ? [a.name + ' ' + a.ctx] : [])`, so that "goldberg langenlois" ranks the right Ried first.
   - Profile and tooltip titles can use it too, e.g. "Ried Goldberg (Langenlois)".
2. **Soils are not in search yet.** `rebuildSearch()` adds countries, apps, extra points, regions, sites, grapes and glossary terms, but not `D.soils`. Integration cannot fix this from the data side, because search is built in `core.js`. Suggested change:
   - In `rebuildSearch()`: `searchAdd('soil', D.soils.map(s => ({ id: 'soil-' + slug(s.id || s.name), name: s.name, meta: 'Soil' })));` (the id matches the Lexicon anchors `soil-${slug(s.id || s.name)}`; `#soil-…` is already routed in `ui.js`).
   - Add `soil: 3` to `TYPE_BOOST`.
   - Call `rebuildSearch()` after `setSoils(so)` in the second-wave `_more` promise (`ui.js` line 51). Soils arrive later than the first `rebuildSearch()`.
   - Optionally add `D.systems` the same way (`id: 'system-…'`).
   - `site/data/content/global/soils.json` already holds all 33 soils (copied by integrate.py).

## From the cellar journal, round 2 (live QA: blank or slow bottle card after a reload)

1. **Do not wait for the country list before custom views.** `route()` now awaits `COUNTRIES_READY` (up to 2.5 s) before every view, and the deep link itself is routed only on `countries` or after 8 s. `#journal…` and `#photo-review` need no map. Suggested: check `viewFor(h)` before the `COUNTRIES_READY` wait, and route custom-view hashes at boot without waiting for `countries`.
   Shim: 20_journal.js and 25_photos_review.js call `VM.go(hash)` for their own hashes on DOMContentLoaded when the sheet is still closed. That still pays the 2.5 s wait inside `route()`; the core's later route re-renders the same view (no flicker, no history entry).
