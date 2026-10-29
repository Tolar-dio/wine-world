# Vitis Mundi v2: front-end API (`window.VM`)

Modules live in `frontend/src/modules/` as `NN_name.js` and `NN_name.css`. `build.py` appends them in filename order after the core scripts and styles. Each module `.js` runs in its own `<script>` tag (an exception in one module cannot break another or the boot), and runs **before** `boot()`, so register views, nav entries, sections and listeners at top level. The map and data arrive later: use `VM.on('map:ready')`, `VM.ready` or the `data:*` events.

```
00_config.js      VM_CONFIG (lead engineer)
10_journal.*      journal / Supabase (fills VM.auth)
20_study.*        study mode
30_compare.*      compare, climate twins
40_filters.*      multi-criteria filters
```

Wrap module code in an IIFE (`(() => { ... })();`) so top-level names do not collide with the core (`map`, `S`, `D`, `APP`, `H`, `$` and many short helpers are globals in the core).

## Builds and testing

```
python3 -I frontend/build.py                 # site/index.html (artifact) + dist-gh/index.html (Pages) + PWA files
python3 -I frontend/build.py --out DIR       # DIR/index.html (artifact mode) and DIR/gh.html (Pages mode)
python3 -I frontend/serve.py 8770 --root DIR # serves DIR first, then site/ (data, fonts)
python3 -I frontend/serve.py 8771 --gh       # serves dist-gh/ first, then site/
```

`VM_CONFIG.mode` is `'artifact'` in `site/index.html` (no network beyond our own files, cdn.jsdelivr.net/cdnjs/unpkg scripts and Google Fonts) and `'gh'` in the Pages build (external APIs, tiles, Supabase allowed). Check `VM.mode === 'gh'` (or `VM.online`, which also checks `navigator.onLine`) before anything that needs the network, and hide that UI otherwise.

In Playwright, pass the proxy with `"bypass": "127.0.0.1,localhost"` or the page itself will not load. `frontend/test_v2.py` is a working harness.

## Config

```js
window.VM_CONFIG = { mode: 'gh' | 'artifact', supabaseUrl: '', supabaseAnonKey: '', siteUrl: 'https://tolar-dio.github.io/wine-world/', maptilerKey: '' }
VM.config   // same object
VM.mode     // 'gh' | 'artifact'
VM.online   // mode === 'gh' && navigator.onLine
```

## Map and camera

| Member | Notes |
|---|---|
| `VM.map` | the `maplibregl.Map` (null before boot, or when WebGL is missing). Add your own sources and layers with ids prefixed by your module name. Insert them under our labels with `beforeId: 'anchor-labels'` (or `'anchor-points'` for markers under labels, `'anchor-top'` for the very top). |
| `VM.ready` | Promise that resolves with the map once its style has loaded. |
| `VM.flyTo(target, opts?)` | `target` is an entity id (`'fr-sauternes'`, `'it'`, `'site-…'`, `'region-…'`, `'grape-…'`), or `{lon, lat, zoom?}`, or `{bbox:[w,s,e,n]}`. `opts`: `{maxZoom, minZoom, instant, speed}`. Respects reduced motion and pads for the open panel. |
| `VM.frame(ids, opts?)` | frames a set of ids (densest 86% when there are more than 12). |
| `VM.highlight(ids, opts?)` | lights the given appellation ids on the map (polygons, overview points, points-only appellations), loading their countries' polygons if needed. `opts`: `{dimOthers = true, label, labelHTML, fit, onClear, owner}`. `label` shows the pill at the top ("Label · 12 · Clear"). Replaces any grape highlight. |
| `VM.clearHighlight()` | |
| `VM.map.captureTap(fn) → release()` | while active, a tap or click on the map calls `fn({lngLat, point, features})` instead of opening a profile, and the hover tooltip is off (`#app[data-capture]` is set). |
| `VM.map.labels(false / true)` | hides every place-name layer (appellations, fine units, regions, towns, rivers, countries, site labels) and restores exactly the previous visibility. |
| `VM.map.pulse(lon, lat)`, `VM.map.clearPulse()` | the core pulsing marker. |

`VM.highlight` accepts site ids too: they get a gold ring on the map (the pill count includes them).

Example:
```js
VM.highlight(['fr-sauternes', 'fr-barsac'], { label: 'Botrytis sweet wines', fit: true, onClear: () => myState.reset() });
```

## Data

All getters are synchronous views of what has loaded; functions return promises.

| Member | Returns |
|---|---|
| `VM.data.index` | array of every appellation (incl. fine units, `fine: 1`) from `_index.json`: `{id, name, alt, country, cat, subcat, area (km²), parent, lp:[lon,lat], bbox, bq, style, prof}`. Empty until `data:index`. |
| `VM.data.indexById` | `Map` id → index entry |
| `VM.data.countries` | `{iso2: {name, bbox, count, file, fine, tier, has_content}}` |
| `VM.data.sites`, `siteById` | sites: `{id, name, kind, country, class, app, cq, lon, lat}` |
| `VM.data.regions`, `regionById` | `{id, name, country, lp, bbox}` |
| `VM.data.extra` | points-only appellations |
| `VM.data.varieties` | `{grapeId: [appellation ids]}` (after `data:globals`) |
| `VM.data.climrefs`, `VM.data.meta` | |
| `VM.data.loadIndex()` / `loadGlobals()` | force-load the index / grapes + glossary + varieties + meta |
| `VM.data.grapes()` | Promise → grapes `[{id, name, color, synonyms, origin, parents, offspring, profile, …}]` |
| `VM.data.grapeById(id)` / `grapeFor(name)` | sync lookup (accepts `grape-` prefix; `grapeFor` is synonym-aware) |
| `VM.data.timeline()`, `glossary()`, `soils()`, `systems()` | Promises |
| `VM.data.content(iso2)` | Promise → `data/content/{iso2}.json` (country, regions, profiles, sites) |
| `VM.data.json(path)` | Promise → any file under `site/` by relative path, or `null` when the build manifest says it does not exist (no 404 in the console). Cached. |
| `VM.data.has(path)` | is the file in the build manifest |
| `VM.data.entity(id)` | `{type, id, name, country, lp, bbox, …}` for any id; for appellations also `area, cat, subcat, style, parent, fine, pt, clim, bq, prof, data` (the merged index + feature properties; `clim` exists once the country's polygons have loaded) |
| `VM.data.typeOf(id)` / `isoOf(id)` | `'appellation' | 'country' | 'region' | 'site' | 'grape' | 'event' | 'term' | 'soil'`; the iso2 of any id |
| `VM.data.feature(id)` | full feature properties when the country is loaded |
| `VM.data.geometry(id)` | Promise → the GeoJSON feature (fetches the country file; cached) |
| `VM.data.ensureGeo(iso2, {fine})` | Promise<bool> → the country's polygons (and fine units) are on the map, through the map's own queue. |
| `VM.data.ancestry(id)`, `children(id)` | geometric parents (outermost first) and children |
| `VM.data.countryName(iso2)` | |
| `VM.data.chain(id)` | Promise → `[id, …parents, …content regions]` used for fallbacks |

Sidecars (each resolves to `null`/`[]` when the file is missing):

| Member | Returns |
|---|---|
| `VM.data.topo(id)` | `{e, e5, e95, s, s75, a, ar, fl, n}` from `data/topo/{iso2}.json` or `_sites.json` |
| `VM.data.attrs()` | `{cols, rows, get(id) → {id, country, gst, gdd, …}}` from `_attrs.json` |
| `VM.data.vintage(id)` | `{id, data, inherited}`: first id in the chain with a series in `data/vintage/{iso2}.json` |
| `VM.data.events(id)` | vintage events for the id and its parents, sorted by year |
| `VM.data.drift(id)` | `{id, data, inherited}` from `_drift.json` |
| `VM.data.regs(id)` | `{id, data, inherited, national}` from `data/regs/{iso2}.json` |
| `VM.data.photos(id)` | array of photo records |
| `VM.data.study(name)` | `data/study/{name}.json` (`'decks'`, `'tasting'`) |

## Navigation and the panel

| Member | Notes |
|---|---|
| `VM.open(type, id)` | open a profile: `'country'|'region'|'appellation'|'site'|'grape'|'event'|'soil'|'term'`. `VM.open('grape', 'nebbiolo')` and `VM.open('fr-sauternes')` both work. Sets the hash. |
| `VM.go(hash)` | navigate to any hash (`'study'`, `'compare-fr-sauternes'`). |
| `VM.back()` | the panel's back button |
| `VM.panel.register(viewId, {title, crumb?, render(el, ctx), snap?, onClose?})` | registers a view reachable at `#viewId` and at `#viewId-anything` (`ctx.arg` is the part after the first hyphen, `ctx.hash` the whole hash). `render` may be async; `el` is the empty sheet body. `snap` is the phone snap point (`'peek'|'half'|'full'`, default `'full'`). View ids: lower-case letters and digits, 3+ characters, hyphen-separated words, and not of the form `xx-…` (that is an appellation id). Reserved: `settings, sidebar, customize, upgrade, downloads, comment-*`, and v1 views (`grapes, timeline, lexicon, layers, about`). |
| `VM.panel.show(viewId, opts?)` | navigates to the view (registers it first if `opts.render` is given) |
| `VM.panel.refresh()` | re-render the current route without adding history |
| `VM.panel.close()`, `snap(name)`, `setCrumb(text)` | |
| `VM.panel.el` / `current` / `isOpen` | the sheet body; the current entity `{type, id, …}` or `{type: 'view', id, arg}` |
| `VM.panel.addSection(types, fn(el, entity), {id, slot, order})` | adds a section to profiles. `types`: one type, an array, or `'*'`. `slot`: `'hero'` (under the title), `'top'` (after the ledger and coordinates, before the prose), `'mid'` (after the climate block on appellations, before the varieties), `'end'` (default, just before the source line). Lower `order` first; the lead's own sections use 10–40, modules should use 50+. `fn` may be async; return `false` or leave `el` empty to hide it. `entity` is `VM.data.entity(id)` plus `type`. Returns an unregister function. |
| `VM.nav.add({id, label, icon?, onClick?, order?, title?})` | adds a button to the top views bar (it scrolls sideways on phones). Without `onClick`, it navigates to `#id`, so register a view with the same id. `icon`: inline SVG string (16 px, `stroke="currentColor"`). |

Example module:
```js
(() => {
  VM.panel.register('journal', {
    title: 'Cellar journal', snap: 'full',
    async render(el, { arg }) {
      el.innerHTML = `<div class="head"><p class="eyebrow">Your cellar</p><h2 class="title">Journal</h2></div><div class="vm-empty">No bottles yet.</div>`;
    }
  });
  VM.nav.add({ id: 'journal', label: 'Journal', order: 10 });
  VM.panel.addSection(['appellation', 'site', 'region'], async (el, e) => {
    const notes = await myNotes(e.id);
    if (!notes.length) return false;
    el.innerHTML = VM.h.sec('Your notes') + notes.map(n => `<p>${VM.util.esc(n.text)}</p>`).join('');
  }, { id: 'journal-notes', slot: 'end', order: 60 });
})();
```

## Search

| Member | Notes |
|---|---|
| `VM.search.pick({types?, label?, placeholder?, onPick?})` | turns the top search box into a picker (with a "Cancel" bar). Resolves with `{id, name, type, meta}` or `null` when cancelled; `onPick` is called too. `types`: `['appellation', 'site', 'region', 'country', 'grape', 'term']`. On phones the sheet drops to peek while picking. |
| `VM.search.query(q, {types?, limit?})` | synchronous ranked results `[{id, name, type, meta}]`, same scoring as the search box (diacritic-insensitive, typo-tolerant). |
| `VM.search.cancel()` | |

## Events

`VM.on(name, fn)` returns an unsubscribe function; `VM.off(name, fn)`; `VM.emit(name, payload)` (modules can use their own namespaced events, e.g. `journal:changed`). Sticky events replay the last payload to late subscribers.

| Event | Payload | Sticky |
|---|---|---|
| `map:ready` | the map | yes |
| `data:countries` | `VM.data.countries` | yes |
| `data:index` | `VM.data.index` | yes |
| `data:globals` | grapes array | yes |
| `data:geo` | iso2, each time a country's polygons (or fine units) were added to the map | no |
| `profile:open` | `{type, id, entity, el}` after a profile renders and sections were started | no |
| `view` | `{id, arg}` after a custom view renders | no |
| `panel:close` | the entity or view that was open | no |
| `theme` | `{dark, tokens}` after the theme changed and the map was repainted | no |
| `auth` | `user` object or `null` (emitted by the journal module) | yes |
| `basemap` | `'standard'|'satellite'|'topo'` | yes |
| `terrain` | `{on, exaggeration}` | yes |

## Auth slot

`VM.auth` is a placeholder: `{user: null, ready: false, available: false, signIn(), signOut()}`. The journal module owns it: `Object.assign(VM.auth, {user, ready: true, available: true, client, signIn, signOut})`, then `VM.emit('auth', user)` on every change. Other modules read `VM.auth.user` and listen to `auth`.

## Helpers

| Member | Notes |
|---|---|
| `VM.toast(msg)` | short status message |
| `VM.fmt` | `num(n, d)`, `area(km²) → {v, s}` (ha or km², with acres/sq mi), `ha(ha)`, `m(m)`, `ft(m)`, `lat(lat, d)`, `lon(lon, d)`, `coords(lon, lat, d)`, `temp(c, d)`, `signed(v, d, unit)` (uses a true minus), `pct(share, d)` |
| `VM.tokens()` | current theme colours `{ocean, land, text, muted, panel, accent, highlight, 'w-red', …, dark: bool}` (hex). Use for canvas/SVG/map paint; in HTML/CSS use the CSS variables. |
| `VM.util` | `esc` (HTML-escape; always escape user text), `inl` (escape + `*italic*`), `prose` (paragraphs), `fold` (diacritic-insensitive lower-case), `slug`, `arr`, `num`, `clamp`, `sleep`, `$`, `$$` |
| `VM.h` | the profile renderers: `sec(title)`, `ledger([{k, v, s}])`, `link(id, label)`, `prose(text, lead)`, `src(list)`, `appRow(indexEntry)`, `siteRow(site)`, `latline(lon, lat)`, `pending(what)` |
| `VM.store.get(k, d)` / `set(k, v)` | small per-viewer localStorage values (namespaced `vm:m:`), try/catch wrapped. Never for data that must persist reliably. |
| `VM.isPhone()`, `VM.reducedMotion()` | |

## CSS conventions

Use the design tokens, never literal colours, so both themes work. The dark values are defined in `prefers-color-scheme: dark` (unless `data-theme="light"`) and in `[data-theme="dark"]`; if a module needs a new token, define it in all three places (see `styles.css` and `v2.css`).

Tokens: `--space --ocean --land --border --rule --rule-strong --text --muted --faint --panel --panel-glass --panel-2 --accent --accent-ink --highlight --shadow`, wine colours `--w-red --w-white --w-rose --w-sparkling --w-sweet --w-fortified --w-orange --w-mixed`, climate ramp `--c0…--c5` (13 → 24 °C), elevation ramp `--e0…--e4`, plus v2 `--ok --warn --bad --cool --warm --overlay --img-bg`.

Type: `--f-display` (IM Fell English: titles, italic place names), `--f-sc` (small caps: eyebrows, labels, buttons), `--f-body` (Literata, 16–16.5 px reading size), `--f-mono` (IBM Plex Mono: every number, with `font-variant-numeric: tabular-nums`). Scale: `--fs-xs 12, --fs-sm 13.5, --fs-base 16.5, --fs-md 19, --fs-lg 24, --fs-xl 32, --fs-xxl 40` (33 on phones).

Ready-made classes (reuse them; they already work in both themes and at 360 px):

| Class | Use |
|---|---|
| `.head > .eyebrow + h2.title (+ .tagline / .alt)` | view and profile headers |
| `.sec` (via `VM.h.sec`) | section heading with a hairline |
| `.ledger.nN` (via `VM.h.ledger`) | 1–6 key figures |
| `.note`, `.src`, `.pending`, `.marg` | muted notes, source lines, "being prepared", margin note |
| `.chips > li > a.chip / span.chip.static` | tags, grapes |
| `.list > li > a.row > .row-name (+ small) + .row-meta` | lists of places |
| `.btn`, `.btn.solid`, `.btn.ghost`, `.btn.small`, `.btn-row` | buttons (small caps, flat, 2 px radius) |
| `.seg` with radio `label > input` | segmented choice; `.seg-inline` for auto columns |
| `.tog` | switch row (label + checkbox) |
| `.filter` | full-width text filter |
| `.vm-card`, `.vm-card.alt` | an object with a border (a bottle, a flashcard). Use sparingly: panels are flat sheets with hairlines. |
| `.vm-field > span + .vm-input / .vm-select / .vm-textarea`, `.vm-range` | forms (16 px inputs so iOS does not zoom) |
| `.vm-tabs > button[aria-selected]` | tabs inside a view |
| `.vm-row`, `.vm-grow`, `.vm-kv`, `.vm-empty`, `.vm-badge(.ok/.warn)`, `.vm-num`, `.vm-stars` | small layout helpers |

Rules from the brief: phone-first (test at 360 px wide: no horizontal scroll, nothing overlapping), touch targets ≥ 40 px, visible focus (`:focus-visible` uses `--highlight`), every control has an accessible name, `prefers-reduced-motion` respected, no `alert/confirm/prompt`, external links `target="_blank" rel="noopener noreferrer"`, no em dashes in copy, flat surfaces (no drop shadows on cards, no gradients, no emoji). Prefix module classes with the module name (`.jr-…`, `.st-…`) to avoid collisions. Keep CSS selectors scoped (e.g. `#sheet-body[data-view="journal"] …`; the sheet body gets `data-view="<viewId>"` while a custom view is shown).

## Modules

### Cellar journal: `VM.auth` and `VM.journal` (modules/20_journal.js, 20_journal.css)

Pages build only. In the artifact build `VM.journal.available` is `false`, reads return empty lists, writes reject, `VM.auth.available` is `false`, and `#journal` shows a note pointing to the full site. Listen to `auth` and `journal:changed` instead of polling.

**`VM.auth`** (fills the Auth slot above)

| Member | Notes |
|---|---|
| `user` | the signed-in Supabase user `{id, email, …}` or `null`. A property, as in the Auth slot. `currentUser()` returns the same. |
| `ready`, `whenReady` | `true` once the session state is known; `whenReady` is a Promise of the user or `null` |
| `available` | `true` when sign-in can work here (Pages build with the Supabase project configured) |
| `onChange(fn)` | `fn(user | null)` now (once known) and on every change; returns an unsubscribe function. Same as `VM.on('auth', fn)`. |
| `signIn(email)` | sends an email magic link (PKCE). Promise `{ok, error?}` with a readable `error` |
| `verifyCode(email, code)` | signs in with the six-digit code from the same email, for when the link opens in another browser |
| `signOut()` | Promise |
| `client` / `getClient()` | the supabase-js v2 client (`null` until loaded) / Promise that loads it. Use it for your own tables (`study_cards`, `study_sessions`, `saved_filters`): RLS fills and checks `user_id`. Only write when `VM.auth.user` is set. |

The `auth` event is emitted after every module has registered (on DOMContentLoaded), so a top-level `VM.on('auth', …)` replays the state safely.

**`VM.journal`**

| Member | Notes |
|---|---|
| `available`, `mode()` | `mode()` is `'local'` (signed out: this browser), `'cloud'` (signed in: Supabase is the source of truth, cached on the device) or `'off'` (artifact build) |
| `ready` | Promise, resolves when the first data is in memory |
| `bottles(filter?)` | copies of the bottle records, newest first. `filter`: `{status, country, appellation_id, site_id, region_id, style}` (exact match) or a function |
| `bottle(id)`, `notes()`, `lists(listName?)` | |
| `noteFor(type, id)`, `inList(list, type, id)` | the place note or `null`; list membership |
| `bottlesFor(id, type?)` | bottles from an appellation (including zones inside it), a site, a content region, a country, or of a grape (`'grape-furmint'`) |
| `tasted()` | `{countries, regions, appellations, sites, grapes}`: Sets of ids from bottles with status `tasted` |
| `saveBottle(fields)` | insert, or update when `fields.id` is given. Promise of the saved record |
| `deleteBottle(id)`, `saveNote(type, id, body)` (an empty body deletes), `toggleList(list, type, id, on?)` → Promise<boolean> | |
| `onChange(fn)` | `fn({what, mode})` after any change (`what`: `bottles`, `notes`, `lists`, `auth`, `sync`); returns unsubscribe. Also emitted as `VM.emit('journal:changed', …)` |
| `open(tab?)`, `add(fromId?)` | navigate to `#journal`, `#journal-tasted|cellar|wishlist|passport|notes`, or the new-bottle form `#journal-new` / `#journal-new-from-<entity id>` (pre-filled from that place or grape) |
| `exportJSON()` | the export object (what "Export JSON" downloads) |
| `LISTS`, `STYLES`, `SAT_OPTS` | vocabularies: lists `visited, want_to_visit, want_to_taste, favourite`; styles; the structured-tasting option keys |

Records have the same shape locally and in Supabase (`public.bottles`, `place_notes`, `place_lists` without `user_id`). `target_type` is `country | region | appellation | site | grape`; `target_id` is the bare atlas id (`'fr-sauternes'`, `'site-…'`, `'region-…'`, `'fr'`, and the grape id without `grape-`). Bottle `grapes` are grape ids without the prefix. `sat` (WSET-style structured tasting): `{v: 1, appearance: {clarity, intensity, colour}, nose: {condition, intensity, development, primary: [], secondary: [], tertiary: []}, palate: {sweetness, acidity, tannin, alcohol, body, mousse, flavour_intensity, finish, primary: [], secondary: [], tertiary: []}, conclusions: {quality, readiness}}` with the keys of `SAT_OPTS` as values (e.g. `'medium_plus'`); empty fields are left out.

Hash routes: `#journal…` as above, `#journal-bottle-<uuid>` (bottle card), `#journal-edit-<uuid>`, `#journal-from-<entity id>` (all bottles from a place).

Map: sources `jr-bottles` (clustered) and `jr-places`, layers `jr-place`, `jr-pin-ring`, `jr-pin`, `jr-cluster`, `jr-cluster-n` under `anchor-top`. Taps on them open the bottle card or place, except while another module holds `VM.map.captureTap`.

Profile sections: `journal-place` (slot `hero`, order 58: list toggles, a note field that saves itself, "+ Bottle") and `journal-bottles` (slot `top`, order 58, hidden when empty).
