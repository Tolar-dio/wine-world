# Cellar journal: notes

Module files: `frontend/src/modules/20_journal.js` and `20_journal.css`. The public API (`VM.auth`, `VM.journal`) is documented at the top of the JS file and in `frontend/API.md` under "Modules". Requests to the lead are in `frontend/API_REQUESTS.md` ("From the cellar journal").

## What it does

The journal is enabled only in the Pages build (`VM_CONFIG.mode === 'gh'`). In the artifact build, the Cellar view shows a short note with a link to the full site, profile sections stay off, and `VM.journal.available` is `false`.

- **Entry point.** A "Cellar" button in the top bar opens `#journal` in the panel. Tabs are Tasted, Cellar, Wishlist, Passport and Notes; the current tab is kept in the hash without adding history.
- **Empty journal.** A neutral "Your first bottle" note explains the three ways in: Add a bottle, the "Bottle" action on any profile, and choosing the appellation from the atlas. Nothing personal ships in the code.
- **Bottles.** Each bottle has these fields:
  - wine, producer, and a vintage or NV
  - the appellation, picked with `VM.search.pick`. Picking it fills the country, the most specific content region and the style, and offers the permitted grapes as suggestion chips (from the feature's `varieties` order when loaded, otherwise `_varieties.json`).
  - an optional cru or estate (site), which fills the appellation when it has none
  - grapes (chips), status, date tasted, where, with whom and occasion
  - price and currency, bottle size and quantity, and a drink window
  - classification, a rating on a 50 to 100 slider with descriptors (Profound, Superb, Outstanding, Very good, and so on), and "would buy again"
  - notes
  - a structured tasting section modelled on the WSET Systematic Approach, stored in `sat` (shape in API.md). It covers appearance, nose and palate, with aroma chip pickers by tier and group plus your own words. There is a "same as the nose" button, a mousse row for sparkling wines, and colour options filtered by style.
- **Bottle card.** It shows the label photo, crumbs (country › region › appellation › site) and a ledger of rating, vintage, quantity, price and drink window. Below that come the facts, the notes, grapes and a structured-tasting summary in prose. The actions are Edit, On the map, "Opened one" (moves one bottle from the cellar to a tasted record and opens it for notes) and "Bought it" (wishlist to cellar). Delete is a two-tap inline confirm.
- **Label photos.** You can take or choose a photo: two file inputs, one with `capture="environment"`. It is resized on the device to at most 1,600 px (JPEG, quality 0.84, EXIF orientation applied).
  - Signed in, it goes to `labels/<uid>/<uuid>.jpg` and is shown through signed URLs (one hour, batched).
  - Signed out, or offline, it is stored in IndexedDB as `local/<uuid>.jpg` and uploaded later.
  - Replacing or deleting a photo removes the old file unless another record still uses it.
- **Map.** "My bottles" is a clustered GeoJSON layer of pins coloured by style, placed at the site, the appellation label point, the region or the country. "Places" shows visited (filled) and want to visit (ring) for appellations, sites, regions and countries.
  - Taps and hover use the lead's `VM.map.onLayerTap`, which runs before the profile hit test and drives the shared tooltip. Tapping a pin opens the bottle card.
  - Tapping a cluster zooms in, or, when all its bottles share one place, opens that place's profile, where "Your bottles from here" lists them.
  - Hovering on desktop shows the shared tooltip.
  - Pins yield to `VM.map.captureTap`, so study quizzes are not disturbed.
  - "My bottles" and "My places" toggles are in the Layers view under Show (`VM.layers.add`). On a build without that hook they fall back to the foot of the journal panel.
  - Pins are put back if the style is replaced.
- **Profile sections.** Every country, region, appellation, site and grape profile gets a single quiet line under the title: Visited, To visit, To taste, Favourite (grapes get only To taste and Favourite), "+ Note" and "+ Bottle". The line scrolls sideways with a fade on phones.
  - A note opens as an inline field that saves itself 0.7 s after typing stops, on blur and on page hide.
  - "Your bottles from here" appears after the ledger only when there are bottles. Appellations include the zones inside them; regions use the content region's `app_ids`; grapes say "of this grape".
- **Passport.** It opens with a ledger: countries, regions, appellations and grapes tasted, bottles tasted and bottles in the cellar. Then it shows:
  - a small world map from `countries_low.geojson`: tasted, in the journal, wine country
  - per-country bars and chips of the regions, appellations and grapes tasted
  - a tasting timeline: monthly bars, or yearly after three years, with hover values
  - favourite styles: bars in the wine colours with average ratings
  - the classic lists, each with progress and a member list. Filled dots mean tasted; rings mean in the cellar or on the wishlist.
  - **Next to explore:** appellations you have not met, made of climate twins and neighbours of your favourites (details below).
- **Export and import.**
  - Export JSON includes bottles, notes and lists.
  - Export CSV covers bottles with a BOM for Excel, and guards against formula injection.
  - Import JSON merges: the same id updates only if newer, a duplicate by producer, wine, vintage, status and date is skipped, notes are appended and lists are united.

## Classic lists: how they resolve

All lists are built from the atlas data at run time; no member list is hard-coded except the crus whose ids are fixed. Member counts as of this build:

| List | Source | Members |
|---|---|---|
| Bordeaux 1855, red wines | sites whose `class` mentions 1855, outside Sauternes and Barsac (includes Haut-Brion; Mouton as a first growth) | 61 |
| Bordeaux 1855, Sauternes and Barsac | the same, in `fr-sauternes` or `fr-barsac` | 27 |
| Burgundy grand crus | index entries `subcat: 'Grand Cru'` in France, excluding the Alsace grand crus, the Chablis climats and the Corton sub-climats | 33 |
| Champagne grand cru villages | sites of class "échelle des crus 100%" | 17 |
| Communes of Barolo | parsed from the MGA site classes ("MGA (Barolo DOCG), La Morra") | 11 |
| Rhône crus | fixed ids, kept only if they are in the index | 17 |
| Beaujolais crus | fixed ids | 10 |
| Alsace grand crus | `fr-alsace-grand-cru-*` | 51 |
| Tokaj villages | sites of class "Tokaj PDO settlement" | 27 |
| Port houses | sites of kind `house` in `pt-porto` | 15 |

A bottle ticks a member through one of three routes:
- **By id:** the appellation, or an appellation inside it, or the chosen site.
- **By MGA (Barolo communes only):** the chosen site is an MGA in that commune.
- **By name:** the member's name appears in the producer and wine text, for example "Château Climens" ticks Climens. Name matching is limited three ways:
  - It applies only if the bottle's appellation is compatible with the list.
  - Single-word château names must appear with "Château" (so "Margaux" in a wine name does not tick Château Margaux).
  - Villages and communes that share the list's appellation name (Barolo, Tokaj) need the site.

Free-text notes are never used for matching.

## Next to explore

Seeds are your favourite appellations, then bottles rated 90 or more, tasted bottles and the rest (up to six seeds). Each seed contributes two suggestions:
- **Climate twins** come from `data/topo/_attrs.json`, as standardised distance over GST, GDD, Huglin, annual and season rain and diurnal range. They exclude the seed's own country and zones over 3,000 km² (or four times the seed's size).
- **Neighbours** are within 70 km, preferring written profiles.

Anything already in the journal, and the seed's parents and children, is left out. Without `_attrs.json` you get neighbours only.

## Storage and sync

- **Signed out.** Records live in localStorage under `vm:journal:v1:local`, with the same shapes as the tables (all reads and writes are try/catch wrapped; blocked storage triggers one toast asking to export). Photos are in IndexedDB `vm-journal`.
- **Signed in.** Supabase is the source of truth.
  - On sign-in the module shows the per-user cached copy (`vm:journal:v1:u:<uid>`), then fetches the three tables in pages of 1,000 and merges, keeping local edits that are still queued.
  - Writes go straight to Supabase. If the network fails they wait in an outbox (`…:ob:<uid>`) that is replayed in order on reconnect, when the tab becomes visible, and before the next write.
  - Server-side permanent errors show a toast and are dropped.
  - There is no realtime channel: another device's changes arrive on the next refresh (sign-in, reconnect, or the tab returning after 5 minutes).
  - Conflicts are last write wins per record.
- **Moving a local journal into the account.** On sign-in, if this browser holds a signed-out journal, a card offers "Add to my account". Bottles are deduplicated by id and by producer, wine, vintage, status and date; notes are merged, lists united, and local photos uploaded. "Not now" keeps the local copy for later.
- **Sign out.** It drops the cached account copy on this device and returns to the browser's own journal.

## Auth

The page loads supabase-js 2.117.3 (UMD, pinned, published 2026-10-07) from cdn.jsdelivr.net with an SRI hash, and only on demand: when you open the sign-in form, when `?code=` is in the URL, or when a stored session exists. It is configured from `VM_CONFIG` (`supabaseUrl`, `supabaseAnonKey` filled in `00_config.js`) with `flowType: 'pkce'`, `detectSessionInUrl: false` and persistent sessions.

- **Sign-in.** `signInWithOtp` with `emailRedirectTo` set to the Pages URL.
- **Callback.** On load, a `?code=` is exchanged with `exchangeCodeForSession`. The `code`, `error` and `error_description` parameters are then removed with `history.replaceState`, keeping the `#hash`, and the page opens `#journal`.
- **Errors.** Messages are readable: link opened in another browser, expired link, rate limit, offline.
- **Fallback code.** "Type the code from the email" (`verifyOtp`) works when the link opens in a different browser from the one that asked for it, provided the email template shows the code (see below).
- **Event timing.** The `auth` event (sticky) is emitted on DOMContentLoaded, after every module has registered. Emitting it during module load made `30_somm_study.js`, which subscribes at its line 108 before `let EL` at line 188, throw "Cannot access 'EL' before initialization". That warning is gone.

## What the owner must do in Supabase

1. **Authentication → URL Configuration.** Set Site URL to `https://tolar-dio.github.io/wine-world/` and add the same URL to Redirect URLs (optionally `https://tolar-dio.github.io/wine-world/**`). Without this the magic link lands on the default Site URL and the sign-in cannot complete.
2. **Optional: Authentication → Email Templates → Magic Link.** Add a line such as `Or enter this code: {{ .Token }}`, so the "type the code" fallback works when the link opens in another browser or app (common on phones, where mail apps use their own browser).
3. **Optional, recommended before inviting other people: a custom SMTP server** (Authentication → SMTP). The built-in sender is rate-limited to a few emails an hour.

Nothing else is needed: the schema, RLS and the `labels` bucket are already live, and the publishable key in `00_config.js` is safe to ship.

## Verified

The checks ran with Playwright and Chromium (SwiftShader) against `python3 -I frontend/build.py --out work/journal_build`, served with `serve.py --root`, with jsDelivr and Supabase reached through the proxy. The harness is `work/journal_test.py`; screenshots are in `work/journal_shots/`.

- **Console.** No errors or warnings from the module in any scenario. The only messages are the lead's service worker being blocked by the test context, and the deliberate 401 and 400 from the RLS probes.
- **Local mode, end to end:**
  - adding a bottle through the form: appellation and site pickers (Barsac fills region Sauternais, style sweet, and suggests Muscadelle, Sauvignon Blanc and Sémillon), rating by keyboard, structured tasting, a label photo (2400×3200 test JPEG resized to 1200×1600 and stored in IndexedDB)
  - save, bottle card, reload: the record and the photo persist, and the edit form reloads all values
  - bottle card, "Opened one" (2 in the cellar become 1 in the cellar and 1 tasted). Delete is built but was not exercised by the harness.
- **Map.** Pins at the site and appellation, a tap on a pin opens the card, globe-level pins, the Places layer after marking visited.
- **Profile sections.** The note saves itself, lists toggle and persist, "Your bottles from here" shows on Sauternes and is hidden on Barolo, and the grape profile shows "Your bottles of this grape".
- **Passport.** All ten lists resolve with the counts above; twins and neighbours appear (for example Codru gives Bohotin and Panciu, Sauternes gives Sainte-Croix-du-Mont and Cérons).
- **Data.** Export JSON and CSV download (test data seeded through `VM.journal.saveBottle`); import after wiping restores 3 bottles, 1 note and 1 list entry; a second import deduplicates.
- **Cloud, with the publishable key only (no test users created):**
  - supabase-js loads from jsDelivr with SRI
  - `bottles`, `place_notes`, `place_lists`, `study_cards` and `saved_filters` all return 0 rows
  - an anonymous insert is refused (42501, RLS), a storage upload to `labels` is refused by RLS, and the bucket lists 0 objects
  - `?code=<bogus>#journal`: the URL is cleaned to `#journal` with no query, there is no session, and a readable message is shown
- **Layouts.** Phone 390×844 and desktop 1440×900, light and dark, no horizontal scroll (after a box-sizing fix for the shared `.vm-input`). Artifact build: the note view, no sections.
- **Not verified.** The signed-in path against the live project: I can't receive the magic-link email, and I did not create test users. The cloud code paths (fetch, upsert, outbox, signed URLs, upload of local data) were checked for API correctness against supabase-js 2.117.3 and the schema, not run.

## Known limits

- Exports carry photo paths, not the photos.
- Sites arrive with the map's second data wave: pins at a cru sit at the appellation point until `data:sites`, then move. Forms and profiles that need sites call `VM.data.loadSites()`.
- Region membership for "Your bottles from here" on region profiles uses the content regions' `app_ids`, loaded per country on demand.
- Name matching for the classic lists is deliberately conservative: picking the site always works, and free text can miss unusual spellings.
- The tasting timeline uses the tasted date; undated tastings are counted in the ledger but not on the chart.

## Reload on a bottle card (live QA fix, 30 Oct)

**The reported problems.** After a reload on `#journal-bottle-…`, the crumbs showed a raw id ("Italy › Langhe › it-barolo"), the Cannubi site was missing, and the card stayed blank for about 10 s. There were three causes:
- **Names.** They came only from atlas data that loads in waves (index, sites, regions, grapes), and the card did not re-render when it arrived.
- **The cru.** A site the data had not delivered yet was dropped from the crumbs.
- **The wait.** Signed in, the bottles were in memory only after supabase-js had loaded from the CDN and confirmed the session. On top of that, the core opens a deep link only once the globe's country list is in (or after 8 s).

**The fixes:**
- **Names cache.** Every name the card resolves is remembered in `vm:journal:v1:names` (capped at 3,000). Until the atlas data arrives, the card uses, in order: the remembered name, the record's own `appellation_name`, then a tidied id (`site-it-cannubi` becomes Cannubi, `it` becomes Italy through `Intl.DisplayNames`). A raw id never shows, and the cru always stays in the crumbs.
- **Re-render on arrival.** Views re-render on `data:index`, `data:sites`, `data:regions`, `data:globals` and `data:countries`, but only if a name was missing. A card with missing names also asks for each source once (index, `_sites.geojson` through the shared cache, the country's content regions, grapes), so an id that is genuinely absent cannot loop.
- **Journal ready at load.** The journal is in memory as the module loads:
  - Signed out, it is the browser's copy.
  - Signed in, it is the account copy cached for the user of the stored supabase-js session (`sb-<ref>-auth-token`, read without the library), marked provisional until supabase-js confirms the session. If the session turns out invalid, the journal falls back to the browser's copy, and queued writes stay in that user's outbox.
  - The photo-review module primes its marks the same way (`VM.auth.storedUser()`).
- **No blank card.** A card that cannot be found yet shows "Opening the bottle…" rather than nothing or "Not found".
- **Early routing.** `#journal…` and `#photo-review` links are opened by the modules themselves on DOMContentLoaded. They still pay the core's 2.5 s wait for the country list; removing that wait is request 1 of "round 2" in `API_REQUESTS.md`.

**Tested** with `work/journal_test.py reloadcard reloadcloud`: Barolo with Cannubi, the atlas index, sites, regions, countries and grapes delayed 8 s, reloaded cold and then with the names cache warm. Both runs ended with no console problems. Results:
- **Signed out:** crumbs "Italy › Langhe › Barolo › Cannubi" on the first card render, no raw id, Cannubi present in every render.
- **Signed in:** a fake supabase-js session in localStorage, with the project's REST and auth endpoints stubbed by Playwright, so no live user exists. The same crumbs appeared from the cached account copy, before the stubbed fetch returned. The session was then confirmed (`VM.auth.user` is the stub user, mode `cloud`).
