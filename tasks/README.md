# Tasks for helper agents (DeepSeek harness)

Read this file first, then one task file. Do one task per branch and pull request.

## House rules (every task)
1. **Never edit `docs/`.** `docs/` is the live site at https://vitismundi.app. Only Claude rebuilds and deploys it.
2. **Output goes to `staging/<task id>/`** (data) or to a branch with code changes under `pipeline/`. Open a pull request named `<task id>: <summary>`; never push to `main`.
3. **No file over 25 MB in git.** Large binaries (terrain, imagery) go to external hosting (see T01).
4. **Text files: UTF-8 without BOM, Unix line endings (LF).** Set `git config core.autocrlf input` before you start.
5. **Ids:** never invent new ids for places that already exist. Look them up in `docs/data/geo/_index.json` (fields: id, name, country, cat, subcat, parent, lp=[lon,lat], bbox). New ids follow `{iso2}-{slug}` or `<parent id>-<slug>`, lower case ASCII, hyphens.
6. **Sources and licences:** every downloaded dataset must have a licence that allows public reuse with attribution. Record the URL, licence and access date in `staging/<task id>/SOURCES.md`. If the licence is unclear, stop and write that down instead of using it.
7. **Facts:** do not write wine prose or descriptions. These tasks are data, geometry, code and verification only.
8. **Finish with `staging/<task id>/REPORT.md`:** what you did, counts, validator output, anything uncertain, anything skipped. Keep it factual.
9. Read `pipeline/SPEC.md` and `pipeline/DATA_CONTRACT.md` for the data formats.

## Order (most valuable first)
| Task | What | Needs Tolar? |
|---|---|---|
| T01 | Move depth packs out of git to Cloudflare R2 | Yes: create a free Cloudflare account and R2 bucket |
| T02 | Price check of every guide tasting pick | No |
| T03 | Polygons for Romagna, Valtellina, Friuli Colli Orientali, Verdicchio Classico subzones | No |
| T04 | Roero and Dogliani MGA polygons | No |
| T05 | Locate the 26 missing Etna contrade | No |
| T06 | Photo audit (wrong-place and irrelevant photos) | No |
| T07 | Depth packs for steep slope regions (after T01) | No |
| T08 | Depth pack bug: packs activate only after the map moves | No |
