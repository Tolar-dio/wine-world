# Ageing module ("When to drink"): notes

Files: `frontend/src/modules/40_ageing.js`, `frontend/src/modules/40_ageing.css`. Nothing else in `frontend/src/` was touched; hook requests are in `frontend/API_REQUESTS.md` (section "From the ageing module").

The question it answers: holding a 2011 Oddero Barbaresco Gallina, how long does it age and when should it be drunk?

## What it adds

1. **Profile section "When to drink"** on appellations, fine units, sites and regions (`VM.panel.addSection`, slot `mid`, order 25, so it sits directly under the vintage strip and above climate drift).
   - Lead line: the typical window of the chosen tier, counted from the vintage, and where it comes from (own profile, the appellation of a cru, a containing appellation, or a default by country, style and category), then the profile's "why".
   - Tier picker (segmented up to four tiers, a select beyond; labels shortened on the appellation's own page, so "Barbaresco MGA cru" reads "MGA cru", full label in the tooltip). The default follows the place: `_fine_override`, then `_fine_tier` (Gallina, as fine unit or site, opens on the MGA cru tier), otherwise `default_tier`. The choice is remembered per place (`VM.store`).
   - Colour toggle when the place has a chart per colour (Burgundy red and white, Loire Chenin and red); tiers are filtered to that colour where their key or label names one (Corton: red grand cru or white).
   - The chart: the last 30 vintages, newest first. Each row is one vintage's life on a shared calendar axis: a hairline until ready, a light bar while approachable, a solid bar at the peak, a lighter "mature" stretch, then a taper to the limit. The vertical line is today (2026). Colour = status now (young, approachable, at its peak, mature or drink up, past), always with the word in the legend, the detail and the row's accessible name. Reported windows are solid; estimated ones are drawn in outline. Gold dots give the report's quality (1 to 5); a small garnet bottle marks vintages you hold in the cellar.
   - Tap (or Enter) a vintage: its story opens under the row, so it stays next to the finger on a phone: window sentence, "Now (2026): …", provenance badge, the report's character, note and source, every adjustment with its effect in years, the season's weather from `data/vintage` (warmth anomaly, harvest rain, heat days, frost nights), researched events of that year, and buttons for the previous and next vintage and "Check a bottle of 2011". Arrow keys move between vintages; Escape closes. Desktop hover shows a one-line read-out.
   - Places whose wines are all sold ready (sherry, for instance) get no chart: the tiers are listed with their windows counted from bottling or disgorgement.
   - A region with no profile of its own uses its chart's reference profile (`_meta.entries[key].profile`), or offers the covered appellations that have profiles in a "Wine" select.
2. **"Check a bottle"** (`#ageing`, nav entry "Ageing" after "Cellar"; deep links `#ageing-<id>` and `#ageing-<id>-<vintage>`): pick an appellation, fine unit, site or estate with `VM.search.pick`, type the vintage, choose tier, colour and (where the profile has `producer_style`) traditional / either / modern. The result: "2011 Barbaresco Gallina, Barbaresco MGA cru: approachable from …, peak …, keeps to ~…", a gauge with ready, peak and limit years and a "Now · 2026" marker, the status sentence, provenance, and the reasoning (why, this vintage, adjustments, producer style, weather, notes). "Add to my cellar" (Pages build with the journal) saves `status: 'cellar'` with `drink_from` and `drink_to` filled, the site, appellation, style, producer and, for a non-default tier, the tier label as `classification`. Tiers counted from bottling are explained instead of computed. The hash is kept in step so the result can be shared.
3. **Cellar journal** (only where `VM.journal.available`):
   - Every cellar bottle row (Cellar tab, "Your bottles from here" on profiles) gets a line "Drink now · 2018–2038 · at its peak · estimated" and a small gauge. The user's own `drink_from` / `drink_to` always wins ("your window"); the atlas estimate is computed only when both are empty, and is never written back by itself.
   - Cellar tab: filter chips "All / Drink now / Drink soon / Hold / Past peak / No window" with counts (empty buckets disabled; the choice is remembered), and rows sorted past peak first, then closing soon, then ready, then waiting (by closing year), unknown last.
   - Bottle card: a "When to drink" block after the ledger with the gauge (your window drawn as an outline over the estimate), the status, provenance, "Check in detail", and "Use this window" when the bottle has no window yet (an explicit tap; it fills empty fields only).
   - Add / edit form: "Suggest window" under the drink-window fields. It reads the appellation, site, vintage, style and classification in the form; empty fields are filled; when the user has typed a window it only offers "Replace yours (2020–2030)".
4. **Compare**: "Typical ageing" by tier for each compared place, on one scale of years after the vintage, coloured with Compare's own series colours, inserted before "Climate twins".

The artifact build has no journal: the chart and the check tool work, the cellar parts and "Add to my cellar" are absent.

## Data, as implemented

Both sidecars are optional; with neither, nothing shows and the check tool says the data is being prepared. Every field is read defensively.

`data/ageing/profiles.json`
- `"<appellation id>": {tiers: {<key>: {label, ready, peak: [a, b], limit, basis?}}, default_tier, why, producer_style, src}`. Tiers may also be an array, a single window, or `peak` an object. `basis: 'bottling' | 'disgorgement'` marks wines sold ready: they are kept out of the vintage chart and described from bottling instead.
- `_defaults`: `"<country>|<style>|<category>"` with an optional `"|<unit type>"`; `*` is a wildcard. Best match wins by weight: style 8, country 4, category 2, unit type 1 (so the research's order `c|s|cat`, `c|s|*`, `*|s|cat`, `*|s|*`, `*|*|*` holds). An unknown style looks up `mixed`. The research's "Default: red, DOC" label is shown as "DOC reds of Italy".
- `_fine_tier`: `"<profile id>|<unit type>"` first, then `"<country>|<unit type>"` → candidate tier keys; the first that exists in the profile wins, an empty list means the profile's default (and stops the search: `de-mosel|Einzellage: []` keeps Spätlese rather than the country's GG). Used for fine units (their `subcat`) and for sites (kind `mga` → MGA, `grand_cru` → Grand Cru, and so on).
- `_fine_override`: fine unit id → tier (Alto Adige subzones); a tier the profile lacks falls back to its default.
- `producer_style`: a string (default shifts: traditional ready +2, peak +1/+2, limit +3; modern −2, −1/−1, −2, scaled to the window), or an object with `text`, `traditional`, `modern` (a number or four numbers, or `{shift, text}`).

`data/ageing/vintages.json`
- `"<key>": {"<year>": {q, character, status, window: [from, to], note, src}}`; keys may carry a colour (`region-fr-burgundy:red`). Windows given as small numbers are read as offsets from the vintage.
- `_covers` (key → appellation ids) and `_by_app` (appellation → keys) are both read. With two colours, the subject's style picks one and the section offers the other.
- `_meta.entries[key]`: `ref_tier`, `profile`, `label`, `ref_label`, `style`. The window is for `profiles[profile].tiers[ref_tier]`.

Lookup for a place (`subject(id)`), as in `profiles.json _meta.fine_units` and `_meta.lookup`:
- a main appellation uses `profiles[id]`, else `_defaults`. It never walks its index `parent`, which is spatial (Barbaresco DOCG sits inside Dolcetto d'Alba DOC).
- a fine unit uses the id before `-premier-cru-` / `-grand-cru-` when that is an appellation (`fr-givry-premier-cru-crausot` → `fr-givry`, though its index parent is Bourgogne), else the first profiled id up its parent chain (`it-barbaresco-gallina` → `it-barbaresco`); that id is also its appellation for names and charts.
- a site uses its fine unit (`site-it-gallina` → `it-barbaresco-gallina`) or its appellation.
- a region uses its own profile if any, else its chart's reference profile (`_meta.entries[key].profile`), else offers the covered appellations.
- vintage charts: keys on the place (`<id>` or `<id>:<colour>`), then `_by_app` / `_covers` of the place and its appellation; a fine unit walks the same candidates to the first covered id.

## The window of one vintage

- **From a report**: the chart's `[from, to]` is for its reference tier. Another tier shifts it additively (`from += tier.ready − ref.ready`, `to += tier.limit − ref.limit`, `from ≥ vintage`), as `_meta.window_basis` says, and the shift is listed. The plateau is placed by the research's status rule: approachable for the first 15% of the window, peak to 50%, mature to 80%, drink up in the last 20%. The report's own `status` is shown when the tier is the reference and nothing was shifted.
- **Estimated** (no report for that year, or no chart): the tier's typical `ready / peak / limit` from the vintage, shifted by at most three years per point, and every shift is listed with its effect:
  - season warmth against 1991–2020 (TerraClimate, `data/vintage`): +1.8 °C or more, very hot, −2/−2/−2/−3 (ready / peak start / peak end / limit); +1.0 °C or more, warm, −1/−1/−1/−2; −1.0 °C or less, cool, +1/+1/0/0 (firmer, slower to open);
  - a soaked harvest (rain at least 1.75 times the usual and 60 mm more): 0/0/−1/−1;
  - the report's quality without a window: q 5 → 0/0/+1/+2, q ≤ 2 → −1/−1/−2/−3;
  - all shifts scale with the window (limit / 20, between 0.25 and 1), so a rosé moves by months, not years.
- Status now (2026): young before ready; approachable before the peak; at its peak to the peak's end; mature until the last fifth of the window; drink up; past after the limit. "Now (2026): at its peak, drink over the next ~N years" counts to the peak's end for a profile window and to the end of the mature plateau for a report window.
- The cellar's drink window is approachable → limit, like a critic's window. Buckets: Hold before it opens, Past peak after it closes, Drink soon when it closes this year or next, otherwise Drink now.

Provenance is always on screen: "from vintage reports" or "estimated from typical ageing (adjusted for the vintage)", the sources linked under the chart and in the check tool, and a closing line that it is a guide for well-kept bottles (storage, the cork and bottle size move it).

## Hooks and shims

Uses `VM.panel.addSection`, `VM.panel.register`, `VM.nav.add`, `VM.search.pick`, `VM.data.{json, chain, vintage, events, content, loadSites, loadRegions, loadIndex, loadGlobals}`, `VM.journal.{bottle, bottles, bottlesFor, saveBottle}` and `VM.store`. The journal and Compare have no render hooks, so a MutationObserver on `#sheet-body` decorates what they render (elements are marked `data-ag`, so each is done once). Requests for proper hooks are in `API_REQUESTS.md`; the section order 25 and an About-view credit are there too.

Exposed for other modules and tests: `VM.ageing.window(id, vintage, {tier, classification, style, producerStyle})` → `{ready, p0, p1, du, limit, status, prov, text, now, provenance, drink: {from, to}, bucket, tier, tierLabel, …}`, `VM.ageing.subject(id)`, `VM.ageing.bottle(record)`.

## Design

Atlas tokens only. The status colours are module tokens (`--ag-young`, `--ag-open`, `--ag-peak`, `--ag-late`, `--ag-past`) defined for light, `prefers-color-scheme: dark` and `[data-theme="dark"]`; they follow a wine's life (blue, teal, garnet, tawny, grey) and were checked with the dataviz palette validator for colour-vision separation on both panel colours (worst adjacent pair ΔE 10.3 light, 8.4 dark). Labels in IM Fell small caps, prose in Literata, every figure in Plex Mono. Flat sheet, hairlines, no shadows. Rows are full-width buttons (22 px high; the story opens in place, with 40 px previous / next buttons); controls have accessible names; focus uses the highlight colour.

## Testing

- `python3 -I work/ageing_prep.py [--real | --fixtures]` builds into `work/ageing_build` (`index.html` artifact, `gh.html` Pages, plus `*_nodata.html` with `data/ageing` removed from the manifest). Default mode: the real files win and fixtures (`work/ageing_fixtures/data/ageing/`) fill what is missing, written to the build folder and its manifest only, never to `site/`.
- `python3 -I frontend/serve.py 8781 --root /home/claude/winesite/work/ageing_build`
- `python3 work/ageing_test.py [prof profphone check cellar form compare bordeaux artifact nodata]`; screenshots in `work/ageing_shots/`. Expected windows are read from `VM.ageing.window()` so the tests follow the data.

## Verified (final data, 2026-10-30)

Barbaresco → Gallina → 2011: the Barbaresco chart gives 2016–2030 for the classic bottling; the MGA cru tier shifts it to 2018–2038 (ready +2, limit +8), so the window reads "approachable from 2018, peak 2021–2028, keeps to ~2038" and, in October 2026, "at its peak, drink over the next ~8 years", from vintage reports. Same answer on the Barbaresco page (cru tier chosen), on the Gallina MGA polygon and the Gallina site (cru by default), in "Check a bottle", in the journal's Suggest window and on the bottle card. Also checked: Givry premier cru → `fr-givry` / `red_premier_cru`; Alto Adige Terlano → override `white_top`; a Mosel Einzellage → Spätlese; Pauillac 2010 from the Médoc chart (2025–2065); Burgundy region red / white toggle; the artifact build (chart and check tool, no cellar); the page without data (section hidden, check tool says so). Phone 390 × 844 and desktop 1440 × 900, both themes, no console errors, no horizontal scroll.

## Limits and follow-ups

- Weather adjustments are deliberately small and generic; a cool, wet year that a report rates highly (1996 in Piedmont) would be misjudged without the report, which is why reports always win.
- Non-vintage bottles get no window in the cellar (the bottling date is unknown); the check tool explains tiers counted from bottling.
- The site lookup in the journal form matches by name until the form exposes ids (request 2).
