# Sommelier tools: filters, compare, climate twins, study, tasting trainer

These modules live in `frontend/src/modules/` and are built by `build.py` in filename order after the lead's `00_config.js` and the journal `20_journal.*`. Each file is an IIFE that registers its views, nav entries and profile sections at load time, through `window.VM` only. They do not edit any core or other-module file.

| File | What it does |
|---|---|
| `30_somm.js` | Shared layer, exposed as `VM.somm`: the attribute table, place summaries, climate twins, the grape index, persistence helpers, and map helpers (ring markers, mixed highlights, labels, tap capture). |
| `30_somm_filter.js` | Filter view (`#filter`, `#filter-<spec>`): criteria, live count, results, lessons and saved filters. |
| `30_somm_compare.js` | Compare view (`#compare`, `#compare-<id>--<id>--<id>`), plus two profile sections: the Compare button and Climate twins. |
| `30_somm_study.js` | Study view (`#study`, `#study-deck-<id>`, `#study-due`, `#study-order`): decks, rules decks, map quizzes, flashcards, SM-2, streaks, sessions and the timeline game. |
| `30_somm_tasting.js` | The deductive trainer (`#study-tasting`) and Blind practice (`#study-blind`), rendered inside the Study view. |
| `30_somm.css` | All styles for the above. Selectors use the `sm-`, `st-` and `tg-` prefixes, and every colour comes from a token in both themes. |

Nav entries are Filter (order 60), Compare (62) and Study (64). All hashes are plain `[a-z0-9-]`, and the filter hash is updated with `replaceState`, so Back still leaves the view.

## Data used
Every file is read through `VM.data.*`. A missing file degrades to a note rather than an error.

- **`topo/_attrs.json`** (9,101 rows): the main table for filters and twins, with `_cols` read by name.
  - Without it, `VM.somm.table()` falls back to the `clim` block of every polygon already drawn, rebuilt on `data:geo`.
  - In that fallback the filter view says how many countries have climate so far.
- **`topo/{iso}.json` and `topo/_sites.json`**: Compare's terrain bands and aspect roses, and site terrain (150 m around the site).
- **`geo/_varieties.json`**: reversed to give the grapes of each appellation. A unit with no list inherits from its nearest container, so Einzellagen take their Anbaugebiet's list.
- **`regs/{iso}.json`**: Compare's rules block (inherited from containers through `VM.data.regs`), plus one generated flashcard deck per country file (24 today).
  - Cards cover ageing, release, yield, alcohol, labelling, and varieties when the list has 8 entries or fewer.
- **`vintage/{iso}.json` and `vintage/_events.json`**:
  - Compare: anomaly lines and a year read-out (harvest rain against its 1991–2020 median, frost nights, days ≥ 35 °C, warmth rank, events).
  - Trainer: the chosen vintage in the leading grape's classic places.
- **`study/decks.json`** (39 decks, 1,665 cards) and **`study/tasting.json`** (250 grapes, 316 styles). The trainer matches variant styles on `base` and uses `label`, `intensity`, `clusters`, `markers` and `confused_with`.
- **`photos/{iso}.json`**: Compare's photo row, in the Pages build only (`VM.online`), with author and licence links. Elsewhere it shows a small latitude plate instead.

## Filters
- **Criteria:**
  - Grapes, any or all, picked with search.
  - Main style; country; Old or New World; category or rank (cat and subcat, e.g. AOC, Ried, Grand Cru); boundary quality; area (log scale).
  - Growing-season temperature, degree days, Winkler class, Huglin, warmest month, day–night swing, season and annual rain.
  - Elevation; slope; aspect as eight compass wedges, with a "sun-facing in both hemispheres" switch that mirrors N and S below the equator.
  - An include-fine-units toggle.
- **Sliders:** each range slider draws the atlas's own distribution behind it, so you can see where places actually sit.
- **Slope and aspect:**
  - They skip zones of 10,000 km² or more (the `sub` zones, whose terrain describes a whole region).
  - Setting either switches fine units on once, with a toast.
  - Zones with no dominant aspect never match an aspect filter.
- **Live count and results:**
  - The live count sits in a sticky bar.
  - Results sort by name, warmth, rain, elevation, slope, area or country, with a "show more" button.
  - The "split by world" mode is used by the Pinot lesson.
- **Map:**
  - `VM.highlight` lights the matches and dims the rest.
  - Matched fine units also get gold dots below zoom 10.6 (source and layer `somm-dots`), because their polygons only draw from about z 9.5.
- **Lessons:** eight built-in presets that teach something:
  - Steep south-facing Riesling sites
  - Cool-climate Syrah
  - High-altitude reds above 1,000 m
  - Volcanic soils (a curated list of 42 ids taken from the Lexicon's soil guide)
  - Botrytis country (warm days, misty autumns), labelled as an approximation
  - Old World vs New World Pinot at the same warmth
  - Desert vineyards
  - Winkler Region I
- **Saving and sharing:**
  - Saved filters go to Supabase `saved_filters` when signed in. Local ones are uploaded once on sign-in.
  - Otherwise they are kept on this device.
  - The share hash looks like `#filter-g-riesling--c-de--gst-14p5-17--asp-s-se-sw--sun--fine`, or `#filter-p-cool-syrah` for a lesson.

## Compare and climate twins
- **Places:** up to three appellations, sites, regions or countries.
  - Sites use their appellation's climate plus their own terrain.
  - Regions and countries use the median of their member appellations, and the page says so.
- **Picker and series colours:** places come from `VM.search.pick` or from the Compare button on every profile (hero slot). Series colours are garnet, gold and blue. They passed the dataviz palette validator (all pairs, both themes) and are always paired with names.
- **Sections:**
  - Photos.
  - A plain-language paragraph on how they differ, generated from warmth, degree days and Winkler class, season rain, day–night swing, elevation (≈0.6 °C per 100 m), slope, and hemisphere.
  - Climate on shared scales: dot rows with reference ticks (Winkler boundaries on the GDD row).
  - Terrain: p5–p95 elevation bands and aspect roses.
  - The place: category, area, styles, latitude, boundary.
  - Grapes: shared by all, in two of three, and only one.
  - Rules: field by field, with inheritance noted.
  - Vintages: thin yearly anomaly lines plus a 5-year mean against each place's 1991–2020 mean. Hovering shows a crosshair snapped to the year, with a readout of every place's anomaly and GST. Tapping the chart or the select picks a year for the read-out below, which is the keyboard and table view.
  - With two or three places, Climate twins: the three closest twins of each place. Tapping one compares it with its place.
- **Climate twins** (profile section on appellations, sites, regions and countries, and in Compare with one place):
  - The k nearest in z-scored climate space (GST, GDD, Huglin, warmest month, annual and season rain, diurnal range), with temperature down-weighted.
  - Excluded: the place's own country, its ancestors and descendants, and nested candidates. Twins are kept 20 km apart and at most two per country.
  - When every twin is from the same world, the closest match from the other world is named too (Gevrey-Chambertin → Port Phillip).
  - "Show on map" lights them all.

## Study
- **Decks** are grouped as in `decks.json`, followed by "Wine law: the rules" (one generated deck per regs file). Each row shows cards, due and seen counts, with a thin progress bar.
- **Session bar:** in Find and Name, it carries the current action ("Show me", then "Next") next to End, so it stays visible when the phone sheet is at peek.
- **Find it on the map:**
  - Loads the target's polygons (fine ones too) and hides every place name (`VM.map.labels(false)`).
  - Frames the deck's cluster of targets in that country, or the whole country when the cluster would give the answer away.
  - Captures taps with `VM.map.captureTap`.
  - A tap is right when it falls inside the polygon (rendered features first, then the real geometry). It also counts within about 18 px of the line, or within 26 px of a point target (clamped in km), so a tap when zoomed out still counts.
  - The reveal restores names, lights the answer, flies to it, and shows the card's answer with a link to the profile.
- **Name it:** lights the target (or rings a region) without names, and offers four choices from the same deck, picked among the nearest targets. Grape and soil cards use the answer text with the name blanked.
- **Flashcards:** Show answer, then Again, Hard, Good or Easy, each with the interval it would set.
- **Spaced repetition:** SM-2 (ease 1.3–3.0, a 10-minute relearn step, a 1-year cap).
  - Find and Name grade automatically: right = 4, right after a hint = 3, wrong = 1. Missed cards return once at the end of the session.
  - "Review N due" pulls due cards from every deck.
  - The streak counts consecutive study days.
  - Progress goes to Supabase `study_cards` (upsert on `user_id,card_id`) and `study_sessions` when signed in. Newer local reviews are merged up on sign-in; otherwise progress is kept on this device.
- **Put it in order:** five timeline events, each round spanning eras.
  - Drag with pointer events (touch or mouse), or use the up and down buttons for keyboard users.
  - Checking marks each position, reveals the dates and lists the right order. Three rounds make a session.
- **Session summaries:** score on first attempts, streak, due-tomorrow count, minutes, and per-card "back in N days".

## Deductive tasting trainer
- **The grid:** the kind of wine, colour family, intensity and hue, then acidity, tannin (hidden for white and rosé), alcohol, body, sweetness and aroma intensity, each on five buttons. Aromas come from search, from suggestions (the commonest aromas of the wines still in the running), or from browsing by WSET family.
- **Scoring:** each grape × style is scored as follows. The best style per grape becomes a share of plausibility through a softmax.
  - A hard filter on kind and colour family.
  - A squared range distance on each scale, weighted toward acid, tannin and sweetness.
  - Colour and hue fit.
  - Aroma overlap weighted by rarity (idf), with a little credit for the same family.
  - Calibrated on real inputs: a clear Nebbiolo note gives about 78%. Structure alone gives 34% with the look-alikes visible.
- **Reasoning:** for example, "high acid + high tannin + pale garnet → Nebbiolo; tar and rose confirm." It adds the strongest mismatch ("But …") and the `confused_with` tell for the runner-up ("Not Xinomavro? …"). Below that: markers, oak, the classic places with their markers, a "Light them on the map" button, and an optional vintage.
- **Blind practice:**
  - Draws a weighted random profile from the grapes taught in the grape-to-region deck and writes a tasting note from its ranges and aroma clusters.
  - You pick the grape from four (the answer, its classic look-alikes, and whatever the engine would confuse it with), then a classic place from four.
  - The reveal shows the tell, the markers and the classic places, which are lit on the map. On phones they are one tap away so the answer stays visible.
  - "Run it through the grid" loads the note into the trainer. Five wines make a session.

## Robustness
- **Render tokens.** Every view reuses the one `#sheet-body` element, so each module keeps a render token and drops its element when another view, a profile or a close takes the sheet. A slow async render can no longer overwrite the view that replaced it.
- **The filter's hash.** The filter rewrites the hash only while its own view is showing. It used to be able to rewrite a profile's hash after a debounced re-count.
- **Rules decks after a cold deep link.** Rules decks wait for `data:countries`. Before this, a deep link straight into Study could build the deck list before the country list existed and lose the rules decks for the session.
- **Clean map for quizzes.** Starting a map quiz clears any filter or grape highlight and the filter's dots.
- **Sticky events.** `VM.on` replays sticky events (`auth`, `data:*`, `map:ready`) to a late subscriber at once, during the subscribing script. So every module declares its view state before any `VM.on`. Study used to subscribe to `auth` above `let EL`, which would throw "Cannot access 'EL' before initialization" if the journal emitted `auth` earlier. Check: `node work/somm/check_sticky.js` loads every 30_* module against a stub that replays sticky events. It passes now, and fails on the old order.
- **Photo fallback.** A photo that fails to load (Commons sometimes answers 429) falls back to the latitude plate, without a credit line.

## Verified
Playwright with SwiftShader (`work/somm/test_somm.py`), on builds from `python3 -I frontend/build.py --out work/study_build` served by `serve.py 8795 --root work/study_build`. It ran at 390×844 (DPR 2), 360×740 and 1440×900, in both themes.

- **Console:** no console errors across all scenarios.
- **Width:** no horizontal scroll at 360 px in Filter, Compare, Study, the trainer or a deck page.
- **Filter:**
  - Lessons give: steep Riesling 939, high-altitude reds 64, volcanic 41, botrytis 166, Pinot split 192, desert 363, Winkler I 593, cool Syrah 222.
  - The hash deep-link restores the filter.
  - Sorting by slope works.
  - "Show on map" lights matches and dots.
  - Saving locally works.
- **Compare:** works with three places, including the 2003 vintage read-out and events.
- **Twins:** checked on an appellation, a site, a region and a country.
- **Study:**
  - Find: a right tap and a missed tap (17 to 28 km off); names come back and capture is released after End.
  - Name it, the rules flashcards, and the summary.
  - Order game: a drag moves an item two places.
  - Trainer: the Nebbiolo case with the vintage and the map.
  - Blind practice.
- **Signed in:** tested with a fake Supabase client that records calls.
  - `study_cards` is selected, then upserted per review.
  - `study_sessions` gets an insert.
  - `saved_filters` gets an insert and a reload, and the UI says "Saved to your account".
- **No WebGL:** the Compare picker through `VM.search.pick` works, the Study deck offers flashcards only, and the trainer works.
- **Pages build (`gh.html`):** Compare shows Wikimedia Commons thumbnails with author and licence links.
- **Hover and hash guard:** the vintage hover readout works, and the hash guard holds: after leaving the filter for a profile, a re-count leaves `#fr-hermitage` alone.

Screenshots are in `work/somm/shots/`. Key ones:
- `filter-criteria-desk-dark.png`, `filter2-criteria-desk-light.png` (the whole sheet), `filter-lesson-syrah-phone-light.png`, `recheck-filter-dots-phone-light.png`
- `compare-full-desk-dark.png`, `compare-vintage-phone-light.png`, `recheck-compare-place-phone-light.png`, `twins-gevrey-profile-desk-dark.png`, `twins-gevrey-map-desk-dark.png`
- `study-home-phone-dark.png`, `study-find-prompt-phone-dark.png`, `study-find-right-phone-dark.png`, `study-find-miss-desk-light.png`, `recheck-name2-phone.png`, `study-flash-phone-dark.png`, `study-summary-desk-light.png`, `order-checked-phone-light.png`
- `polish-vintage-hover-desk-dark.png`, `polish-compare-twins-desk-dark.png`, `gh-compare-photos-desk-light.png`
- `tasting-grid-phone-dark.png`, `tasting-results-desk-light.png`, `tasting-vintage-phone-dark.png`, `tasting-map-desk-light.png`, `blind-phone-light.png`

## Limits and open points
- **Grapes are permitted, not planted.**
  - Einzellagen and Rieden inherit their region's long variety list, so "Riesling allowed" is broad (the steep Riesling lesson finds 939 places).
  - Compare shows where a list was inherited.
- **Twins share climate, not soil or light.** Temperature weights are a judgement call (four of the seven columns measure warmth). Distances are in standard deviations of the whole atlas, non-fine units only.
- **The botrytis and volcanic lessons are approximations.** The climate grid cannot see river fog, and the volcanic list is curated, not derived.
- **Find accuracy depends on the boundary type.** Commune-based and approximate boundaries make "inside the line" generous. Points use a tolerance in pixels converted to km and clamped (sites 1.2–12 km, other points 4–20 km).
- **Find checks at low zoom download geometry.** At low zoom a fine-unit target is not rendered, so the check calls `VM.data.geometry` once per country file. For `at_fine` that is about 5.6 MB.
- **Cloud sync is untested against the live project.** It was tested only against a fake client, because a magic-link sign-in is not possible here. Both tables' RLS needs `user_id` = `auth.uid()`; the module sends `user_id` on upsert.
- **Streak and Blind sessions are local-first.** The streak merges this device's study days with the cloud session days. Blind practice records a session but no SRS cards (it has no stable card ids).
- **Photos in Compare are Pages-only.** They appear only in the Pages build (`VM.online`), first photo along the chain (place, then parents, then region). The artifact build shows the latitude plate.
- **Late label layers can show during a quiz.** `VM.map.labels(false)` hides the layers that exist at the time of the call. Study calls `wave2()` first, so late layers are rare (noted for the lead in `API_REQUESTS.md`).
- **The first profile opened downloads `topo/_attrs.json`.** The Climate twins section needs it: 0.8 MB (about 0.2 MB gzipped on Pages), fetched once and cached, without blocking the profile. If that is too heavy on phones, the section could load it on demand behind a "Find its climate twins" button.
- **SwiftShader can crash.** It crashes on very tall canvases or many fine layers at DPR 2, so the test harness pins the map's height for full-sheet captures. Real devices were not measured.
