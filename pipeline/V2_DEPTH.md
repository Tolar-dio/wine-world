# Vitis Mundi v2: depth phase

The owner wants more detail everywhere ("genuinely as much detail as you can get about sub-appellations, designations, estates and areas"). This phase deepens boundaries and content. Read SPEC.md (geo + content schemas), DATA_CONTRACT.md, RESEARCH_BRIEF.md (voice), V2_PLAN.md first.

## Rules for everyone
- v1 country files `site/data/geo/{iso2}.geojson` stay as they are. New finer boundaries go in the per-country fine files `site/data/geo/{iso2}_fine.geojson` (same feature schema as SPEC; `subcat` names the unit type, e.g. "MGA", "UGA", "Pieve", "Zona", "Municipio", "Lieu-dit", "Cru village", "Vi de vila", "Einzellage", "Ried"; `parent` = id of the containing main appellation; `bq` honest; `src` key documented). Append to an existing fine file rather than replacing it; keep each fine file ≤ 8 MB (simplify more, or 3 decimals for big sets). Before writing, copy the current file to `work/fine_backup/` once.
- Ids: `{iso2}-{slug}` unique across all geo files; for name clashes include the parent (e.g. `fr-chambolle-musigny-les-charmes`). Check against `site/data/geo/_index.json` and existing fine files.
- New content goes in NEW files `data/content/{name}.json` in the SPEC content shape. Profiles for fine units must carry an explicit `"id"` equal to the fine unit's id (plus `country`, `name`, `cat`, `subcat`) so the integrator joins them without name matching. Sites as usual.
- Do not edit `scripts/integrate.py`, the front end, or other agents' files. The coordinator re-runs integration, terrain and climate enrichment at the end.
- Untrusted downloads: own folder under `raw/`, read with `python3 -I`, scripts in `scripts/depth_*.py`. Log sources and licences in `work/depth-{topic}-log.md`. Text: no em dashes; story-driven, specific.
