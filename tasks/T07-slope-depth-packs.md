# T07: Depth packs for steep slope regions (after T01)

**Why:** high-resolution terrain matters most on steep slopes. Build packs (see `pipeline/DEPTH3D.md`) for:
| Pack id | Area | DEM to look for (open, ≤10 m) |
|---|---|---|
| `de-mosel` (Mittelmosel: Bernkastel–Traben-Trarbach, Piesport, Brauneberg; plus Saar Wiltingen–Ayl) | bbox per atlas | Rheinland-Pfalz DGM1 / DGM via GeoBasis-RP open data (dl-de/zero or by-2.0) |
| `fr-bourgogne-cote-d-or` (Côte de Nuits + Côte de Beaune) | | IGN RGE ALTI (already scripted) |
| `pt-douro` (Cima Corgo: Pinhão, Régua–Tua) | | DGT Portugal MDT, or Copernicus EEA-10 if licence allows |
| `ch-lavaux` | | swisstopo swissALTI3D (open, attribution) |
| `at-wachau` | | Austria DGM 10 m (data.gv.at, CC BY 4.0) |
Use the atlas ids: confirm each in `docs/data/geo/_index.json` and use that id's bbox (clip to the slope area if the bbox is huge).

**Do:** fetch DEM, build terrarium PMTiles z9–14 (z15 for Mosel if the DEM is ≤2 m), chunk to <95 MB per file, OSM vineyards/buildings vectors, upload to R2 with `depth3d_upload.py`, add registry entries via `depth3d_registry.py` in a branch (registry only; no binaries in git). Imagery: reuse existing national ortho keys (`ni-fr`, `ni-ch`, `ni-at`, `ni-de-rp`, `ni-pt`) where they exist.
**Validate:** run `pipeline/frontend/test_depth.py` for each pack; attach a screenshot at pitch 60 over the steepest slope, plus heap/memory numbers if available.
**Report:** sizes per pack, licence per DEM, screenshots.
