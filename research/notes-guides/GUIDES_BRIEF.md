# Vitis Mundi: Paths (guided tours) brief

## What this is for
The atlas is a globe with 12,000 shapes on it. A true wine nerd is happy to wander. Someone curious but new is overwhelmed. **Paths** are guided tours that take that person by the hand and turn them into a wine nerd: an order to go in, a reason each stop matters, and something to drink at each stop. A guide plays out *on the map*: the reader scrolls a chapter in the side sheet (bottom sheet on phones) and, step by step, the map flies to the place being described, lights up the shapes, tilts into 3D terrain to show a slope, or switches to satellite to show vine rows.

The live site is https://vitismundi.app. Read SPEC.md, RESEARCH_BRIEF.md (voice) and this file. The site's own research lives in `site/data/content/{iso2}.json` (country, regions, appellation profiles, sites) and `site/data/content/{iso2}_fine.json` (premier crus, MGAs, Einzellagen, etc.); grapes, timeline, glossary and soils in `site/data/content/global/`. Read the profiles for every place you write about, stay consistent with them, and if you find one wrong, note it in your log rather than repeating the error.

## Voice
- Written for a smart newcomer who wants to become a nerd. Start accessible, end deep: by the last chapter of a region guide the reader should be comfortable with crus, soils, producers and vintages.
- Story first. Every fact earns its place by telling the reader why it matters in the glass, on the label or in history. The owner's words: "full details and facts but also storytelling and exposition, reminding why the facts and numbers matter."
- Define every technical term the first time, in plain words, inside the sentence. Link it to the glossary when an entry exists (see links below).
- Specific over general: name the slope, the village, the year, the person, the price. No filler, no "in today's world", no "it's worth noting", no listicle tone.
- **No em dashes anywhere** (use commas, colons, parentheses or full stops). En dashes only in number ranges ($25–40, 1855–1870).
- American spelling is fine; keep place names in their local form with diacritics (Vosne-Romanée, Châteauneuf-du-Pape, Brauneberger Juffer).

## Facts
- Every number, date, name and claim must be right. Check against primary or authoritative sources (INAO, consortia, interprofessions, TTB, IPONZ, eAmbrosia, OIV, producer sites, Jancis Robinson, Wine-Searcher, academic papers). Don't trust memory for figures. List the sources in the guide's `sources`.
- Prices: rough **US retail, 2026**, as a range, checked against current retailer listings or Wine-Searcher averages. Name 1–3 widely available producers as examples per tasting pick ("try"), choosing names a US reader can actually find, at the stated price.
- Never invent ids. Every id must exist (see tools below).

## File format
One file per guide: `site/data/guides/{guide id}.json`, UTF-8, pretty-printed.

```json
{
  "id": "burgundy",
  "kind": "region",                       // "start" | "region" | "grape" | "history"
  "title": "Burgundy",
  "subtitle": "The Côte d'Or and beyond",  // short, optional
  "tagline": "One sentence that makes a newcomer want to start.",
  "minutes": 25,                           // honest reading time of the introduction part
  "deeper_minutes": 20,                    // reading time of the "Going deeper" part (0 if none)
  "cover": "fr-vosne-romanee",             // an atlas id whose photos make a good cover
  "countries": ["fr"],
  "intro": "Two or three sentences shown above chapter 1.",
  "chapters": [
    {
      "id": "slope",                       // short slug, unique in the guide
      "part": "intro",                     // "intro" | "deeper"
      "title": "Why the slope matters",
      "steps": [
        {
          "text": "Paragraphs separated by a blank line (\n\n). *Italic* allowed. Links: [Romanée-Conti](fr-romanee-conti), [phylloxera](term-phylloxera).",
          "map": {
            "fly": "fr-vosne-romanee",       // an atlas id, or {"lon": 4.95, "lat": 47.165, "zoom": 13.2}
            "highlight": ["fr-romanee-conti", "fr-la-tache"],
            "label": "Vosne's grands crus",   // the pill shown at the top of the map while highlighted
            "pitch": 60, "bearing": 285,      // optional camera tilt (0–70) and the direction the viewer faces (degrees, 0 = north)
            "terrain": true,                  // optional: 3D terrain (needs zoom ≥ 9)
            "base": "satellite"               // optional: "standard" | "satellite" | "topo"
          }
        }
      ],
      "taste": [
        {
          "wine": "Bourgogne Rouge from a good grower",
          "why": "What to notice in the glass and why this bottle teaches the chapter's point.",
          "price": "$25–40",
          "try": ["Domaine A", "Domaine B"],
          "place": "fr-bourgogne"            // optional atlas id for "Log a bottle"
        }
      ],
      "deeper": ["fr-vosne-romanee", "fr-la-tache", "term-premier-cru"],
      "check": [
        { "q": "Question?", "options": ["A", "B", "C", "D"], "answer": 2, "why": "One or two sentences explaining the right answer." }
      ]
    }
  ],
  "next": ["southern-rhone", "pinot-noir"],    // guide ids to suggest at the end
  "sources": [ { "title": "…", "url": "https://…" } ]
}
```

### Shape and length
- **Region guides**: 5–7 chapters in `intro` (about 20 minutes, 2,000–3,000 words) and 3–5 in `deeper` (about 15–20 minutes, 1,500–2,500 words). Total 3,500–5,500 words.
- **Grape and history paths**: 6–9 chapters, all `intro` or with a short `deeper`, 3,000–4,500 words.
- **Start here**: 5–6 chapters, about 15 minutes, 2,000–2,600 words, no `deeper`.
- Each chapter: 2–5 steps; each step 60–170 words (it must fit on a phone's half sheet without much scrolling); each step moves the map, and consecutive steps should build (wide, then closer, then the detail).
- Every chapter ends with `taste` (1–3 picks; at least one under $30 per guide chapter where possible; grape/history paths can taste across places), `deeper` (3–8 ids), and `check` (exactly 3 questions, 3–4 options, plausible distractors, one clearly right answer). In the deeper part, `taste` may be the splurge bottles.
- A tasting flight that runs through the guide is ideal: e.g. Burgundy's chapters build from a Bourgogne Rouge to a village wine to a premier cru from the same village, so the reader tastes the hierarchy.

### Map choreography
- The first step of a guide starts wide (country or region scale), then each chapter narrows in.
- `fly` with an id frames that place; with `{lon, lat, zoom}` it centres there. Use explicit coordinates for 3D and satellite shots so the framing is right.
- Fine units (premier crus, MGAs, Einzellagen, Rieden, lieux-dits) appear at zoom ≥ 9; Burgundy climats read well at 12.5–13.5.
- 3D: `terrain: true`, zoom 11.5–14, `pitch` 50–65. `bearing` is the direction the viewer looks: to look *at* a slope that faces east, set bearing ~270 (looking west); a south-facing Mosel slope: bearing ~0 (looking north) from the river. Centre on the slope itself.
- Satellite (`base: "satellite"`) shows vine rows at zoom 14–16 in most of Europe, the US and New Zealand. A step without `base` returns to the standard map; a step without `terrain` returns to flat (the player handles this).
- Keep highlights focused: 1–40 ids per step (more than 60 fine units at once is slow on phones). Site ids (`site-…`) get a gold ring.
- The player runs on phones: the map shows in the top half while the sheet covers the bottom half, so frame the subject slightly north of centre when using coordinates.

### Links and ids
- Ids: appellations and fine units (`fr-vosne-romanee`), countries (`fr`), regions (`region-fr-…`), sites (`site-…`), grapes (`grape-pinot-noir`), timeline events (`event-…`), glossary terms (`term-…`), soils (`soil-…`).
- Find them: `python3 -I scripts/guides_find.py "vosne" [--type appellation] [--country fr]`; full record (with label point and bbox): `--id fr-vosne-romanee`.
- Validate before you finish: `python3 -I scripts/guides_validate.py site/data/guides/burgundy.json`. It checks the schema, every id (in `fly`, `highlight`, `deeper`, `taste.place`, `cover` and inline links), coordinates, word counts and dashes. Fix every error; warnings need a reason.

## Rules
- Write only your own guide files and your own log `work/guides-{your guides}-log.md` (sources checked, prices and where you found them, any errors you found in the atlas profiles, any place you wanted that has no id).
- Do not edit the front end, other data files or other agents' guides.
- Untrusted downloads in their own folder under `raw/`, read with `python3 -I`.
- Requests from the shell to most websites are blocked; use the web search and fetch tools.
- Never put anyone's email or personal data in files or request headers.
