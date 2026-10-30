# Photo review: notes

Module: `frontend/src/modules/25_photos_review.js` and `25_photos_review.css`. API: `VM.photoFlags`, documented at the top of the JS file and in `frontend/API.md` under "Modules".

Why it exists: `upload.wikimedia.org` answers 429 to our sandbox, so nobody here can look at the 4,689 photos in `site/data/photos/`. The owner's browser can, so the site lets him (or anyone signed in) mark them, and the photo editors read the marks from Supabase.

## What it does

The module runs in the Pages build only. In the artifact build there are no photos, and `#photo-review` shows a short note linking to the full site.

### Inline, on every profile photo

- **The control.** At the end of the photo's credit row ("© author, licence, Wikimedia Commons") there is a small-caps "Wrong photo?" in the faintest ink. It darkens on hover; on touch screens it is slightly stronger.
- **What it flags.** It applies to the photo shown in the hero. To flag a gallery photo, tap its thumbnail first: the lead's gallery swaps it into the hero, and the control follows it.
- **One tap** marks the photo `wrong` for that place, hides it for this viewer at once (the profile re-renders without it), and shows a line under the photos: "Photo hidden for you and marked wrong place. Rather not relevant or poor quality? Undo". Signed out, the line adds "Saved in this browser; sign in from the Cellar journal to send it".
- **Where the control appears.** It is added to the lead's `photos` section, so it appears on appellation, site, region, country and grape profiles. It will also appear on events once their photos render (see "For the lead").

### Hidden everywhere

`VM.data.photos(id)` is wrapped, so a photo marked wrong, irrelevant or poor for a place disappears from that place's profile, from Compare, and from any later caller. The filter works by place and file, not by file alone: 621 Commons files are used by more than one place, and a photo wrong for Pessac-Léognan may be right for Graves.

### The review screen (`#photo-review`)

- **The way in** is a short "Help check photos" block with a "Review the photos" button at the end of About. There is no top-bar entry.
- **Order, most visible first:**
  1. countries
  2. regions
  3. appellations with written profiles (`prof = 1`)
  4. sites
  5. other appellations
  6. grapes, soils, events

  Within each group, the photo shown first on the profile (the hero) comes before the gallery photos. The group is then ordered by country importance (major wine nations first), country, place name and position. The queue is computed in the browser from the photo sidecar files (77 files listed in the build manifest, read four at a time), so nothing extra ships. It takes about 3.5 s.
- **The grid** holds 12 to 20 tiles a page, fitted to the width (5 columns on a desktop, where the sheet widens to about 1,060 px; 2 on a phone). Each tile shows:
  - the `thumb_small` (330 px) image, with "Shown first" on hero photos
  - the place name, type and country
  - our id, linking to the profile
  - the Commons title, linking to the Commons page in a new tab
- **Marking.** Tapping a tile cycles Good, Wrong place, Not relevant, Poor quality and back to unmarked. The mark shows as a labelled tag and a coloured border, never colour alone. Flagged photos are dimmed and get an "Add a note" link ("this is the town square, not the vineyards").
- **Keyboard (desktop):**
  - `G` good, `W` wrong, `I` (or `R`) not relevant, `P` poor, `0` (or `X`, Backspace) clear. Each acts on the focused tile, then focus moves to the next tile.
  - Arrows move in the grid; Space or Enter cycles.
  - `M` adds a note.
  - `N` or `]` next page, `B` or `[` previous page.
  - Shift+`G` marks the rest of the page good and turns the page; the same action is a button under the grid ("Mark the rest good, next page"), which is the fast path, since most photos will be fine.
  - Keys act only while focus is in the panel, so map keyboard panning is untouched.
- **Progress:** "1,204 of 4,689 photos checked · 37 marked wrong, not relevant or poor", with a thin bar.
- **Resume:** the first photo of the current page is remembered (`vm:m:pr-cursor`), so the review reopens where it was left, including after a reload. "Only unreviewed" and the group choice are remembered too.
- **Filters:** a "Show" menu by group (Countries, Regions, Appellations with profiles, Sites, Other appellations, Grapes, Soils, Timeline events, with counts) and an "Only unreviewed" switch. While that switch is on, tiles you mark stay on the page until you turn it.
- **Images load at most two at a time**, following the Wikimedia robot policy note in `work/photos-log.md`.
  - A tile shows its Commons title and a status ("Waiting", "Loading", "Image did not load") until its image arrives.
  - After six failures in a row, loading pauses and a line says "Wikimedia is refusing images from this connection right now. Try again". Changing page resets this.
  - Image attributes match the lead's profile images (`crossorigin="anonymous"`, `referrerpolicy="no-referrer"`), so the browser cache is shared.
- **Download your marks** saves a JSON file. This is useful for handing marks over without signing in.

## Storage and sync (the journal's pattern)

- **Signed out.** Marks are kept in localStorage (`vm:photoflags:v1:local`).
- **Signed in.** Marks are rows in `public.photo_flags`: `user_id` (sent explicitly and checked by RLS), `target_id`, `file`, `verdict`, `note`, `created_at`.
  - Writes are batched: an upsert on `(user_id, target_id, file)` 0.7 s after the last change, so cycling a tile quickly writes once. Clears are deletes.
  - Failed writes wait in an outbox, persisted per user, and are replayed on reconnect and when the tab is hidden.
  - On sign-in, the module shows the per-user cached copy, fetches all of the user's rows in pages of 1,000, keeps local changes still waiting to be sent, and then moves any marks made while signed out into the account (with a toast).
  - Sign-out returns to the browser's own marks.
- **`target_id`** is the photo sidecar key: atlas ids as they are; grapes, events and soils without their prefix (as in `_global.json`). The record is in `data/photos/{iso2}.json` for atlas ids and `_global.json` for the rest.

### Reading the marks (for the photo editors)

```sql
select f.target_id, f.file, f.verdict, f.note, f.created_at, u.email
from public.photo_flags f join auth.users u on u.id = f.user_id
where f.verdict <> 'good'
order by f.created_at desc;
```

Good marks are stored too, so progress follows the reviewer between devices and the editors can see what has been checked.

## Verified

The checks ran with Playwright and Chromium against `python3 -I frontend/build.py --out work/photos_review_build`, served with `serve.py --root`. The harness is `work/photos_review_test.py`; screenshots are in `work/photos_review_shots/`.

Images from `upload.wikimedia.org` were answered with generated JPEGs for the flows that need visible photos. The `review429` scenarios use the real network.

- **Inline flagging** (desktop dark, phone light):
  - The control is present, and survives the lead's caption swap when a gallery thumbnail is chosen.
  - Flagging the second Beaune photo: `verdict = wrong`, `VM.data.photos('fr-beaune')` goes from 4 to 3, the gallery shows 3, and the notice appears.
  - "poor quality" changes the verdict; Undo restores 4.
  - A flag survives a reload (signed out). Another place keeps all its photos.
- **Review** (desktop light, phone dark):
  - The About link opens the grid in 1 to 4 s with 18 tiles (desktop) or 16 (phone), countries first.
  - Tapping twice gives "wrong"; keys G W I P 0 mark tiles 2 to 6 in turn; a note is saved.
  - Shift+G marks the rest good and goes to page 2 (18 checked, 4 flagged).
  - "Only unreviewed" shows only unmarked tiles; the Grapes filter works.
  - Resume after a reload lands on the same page (page 3).
  - A photo flagged in the grid is gone from its profile.
  - The image stub saw at most 2 requests at once.
  - No horizontal overflow at 390 px; the sheet is 1,062 px wide on desktop.
- **Real network:**
  - Some Wikimedia thumbnails do load from here (it is intermittent); the rest show the title placeholder, and loading paused after six failures with the "Try again" line.
  - The only console errors are the browser's own "Failed to load resource: 429" lines for those images (18 in the run), which no page code can suppress.
- **Artifact build:** `mode()` is `'off'`, `#photo-review` shows the note, and there are no controls.
- **Console:** no errors or warnings from the module in any scenario.
- **RLS with the publishable key only:**
  - select returns `[]`
  - insert and upsert are refused with `42501` (HTTP 401)
  - an anonymous delete matches nothing
  - a check through SQL confirms 0 rows were written
- **Not run:** the signed-in path. I can't receive the magic-link email, and no test users were created. The calls (upsert with `onConflict: 'user_id,target_id,file'`, delete by `target_id` and `file`, paged select) match the live table, its unique constraint and its four owner-only policies, which I read from the project.

## For the lead

- **Event and soil photos never render.** `SIDE.photos` strips only `grape-` before looking up `_global.json`, so `event-…` and `soil-…` ids miss (108 and 76 photos). The fix is in `API_REQUESTS.md`.
- **About has no module hook.** The "Help check photos" block is appended by a MutationObserver while the hash is `#about` (request 1 in `API_REQUESTS.md`).
