# Italy fine units: climate, terrain, positions (5 Nov 2026)

Scope: the 277 units of `work/italy-bounds-log.md` (251 new polygons in `it_fine.geojson`: 26 T03 sottozone incl. Verdicchio Classico, 225 T04 Roero/Dogliani MGAs; plus 26 T05 Etna points in `_extra_points.geojson`). `scripts/integrate.py` was not run. Heavy jobs ran under `nice -n 15`, 2 workers.

## Backups (work/enrich_backup/)
- `it_fine.2026-11-05.geojson`, `topo_it.2026-11-05.json`, `topo_attrs.2026-11-05.json`, `depth_italy_subzones.2026-11-05.json`, `topo_prep.2026-11-05.pkl`, `topo_merge_summary.2026-11-05.json`
- `it_fine.climrun_all_features.2026-11-05.geojson`: the raw output of the full climate_enrich run (all 835 features recomputed; see "stale clim" below). Not installed.

## 1. Terrain (done first, because climate uses the 30 m mean elevation of units <= 25 km2)
- `topo_run.py --incremental 4 --workers 2` through a wrapper (scratchpad `bin/topo_itfine.py`) that points `topo_run.GEO` at a folder holding only `it_fine.geojson` and `_sites.geojson`, so no other country's geometry was computed. 252 geometries on 12 tiles, 0.5 min, 0 errors. Parts: `work/topo/parts_inc4/`, log `work/topo/run_inc4.log`.
  The 252nd geometry is `site-de-wiltinger-braune-kupp` (its point moved in the Oct 30 18:26 sites rewrite, after the last merge). Its part is kept, but `_sites.json` was not changed (other country); the next normal `topo_merge.py` will pick it up.
- `topo_merge.py` run with `TOPO_OUT` set to a scratch folder; only the 251 new ids were copied into `site/data/topo/it.json` (1,000 -> 1,251 entries, compact as before). The 584 pre-existing it_fine entries from the scratch merge were identical to the live file. `work/topo/prep.pkl` and `merge_summary.json` restored afterwards to the Oct 30 full versions.
- 251/251 have stats, none with fewer than 10 cells; aspect null for 32 (mostly commune MGAs and large Romagna zones with no dominant aspect).
- Samples: Sassella 508 m (279 to 790), 41.2% slope, 172 deg (S/SE); Inferno 406 m, 30.1%, 186 deg; Roero Sru 236 m, 24%, 309 deg; Dogliani San Luigi 388 m, 23.9%, 184 deg; Cialla 221 m, 27.4%; Verdicchio Classico 287 m (102 to 601), 20.1%.

## 2. Climate
- `climate_enrich.py site/data/geo/it_fine.geojson` (v2 lapse-rate method, `dz` present). It recomputes every feature of the file, and it also rewrote the layout slightly (warning "formatting not reproducible": the file has the first feature on the header line and `]}` with no newline). So the result was not installed as written: the original file was re-emitted line by line, and only the 251 features without clim got their computed `clim` added. Layout, property order and the other 584 features are byte-identical to the backup (checked: 584/584 equal; non-clim properties and geometry of the 251 unchanged).
- **Stale clim on 214 pre-existing features (left as is).** The method reproduces 370 of the 584 existing values exactly. The other 214 (107 Etna contrade, 44 Conegliano Rive, 34 Soave UGAs, 12 Vino Nobile Pievi, Gambellara, Valle d'Aosta, ...) are the Oct 30 pass-3 units whose clim was written by the 11:33 integration before their 30 m topo existed (topo pass 3 merged at 11:39), so they used the 1 km DEM target. With topo now present the values move slightly (GST at most 0.3 C, GDD/HI at most 49, elev_min/elev_max up to 395 m because they now come from 30 m e5/e95). integrate.py keys its clim cache on the topo target, so the next integration will recompute these on its own; the new values are in the climrun backup above if wanted sooner.
- New clim, by parent (GST median, range; elev median):
  - it-roero (149): 19.3 C (18.7 to 19.7), 259 m. Parent it-roero 19.2.
  - it-dogliani (76): 18.75 C (17.7 to 19.5), 450 m. Parent 18.7.
  - it-romagna (16): 19.15 C (18.0 to 19.9), 211 m. Modigliana 18.2, Bertinoro 19.6.
  - it-valtellina-superiore (5): 16.8 C (16.5 to 17.1), 434 m; dz 400 to 615 m (cells far above the terraces). Sassella 16.5, Inferno 17.1, Maroggia 16.8.
  - it-friuli-colli-orientali (4): 17.5 to 19.2; Cialla 18.5, Rosazzo 19.2.
  - Verdicchio Classico: 18.8 C, 285 m (parent 18.9).
  Roero/Dogliani sit about 1 C above the 17 to 18 C one might expect, but match the atlas's own parents and the 172 Barolo MGAs (median 19.4); that is the TerraClimate 1991-2020 level for the Langhe, not an error of this pass.
- **Etna points: not set.** Point features never carry clim in this atlas (0 of 421 in `_extra_points.geojson`), climate_enrich.py skips `_` files, and integrate.py only sets clim on polygon features. For information the values were computed with the same Enricher (point rule: 1.5 km disc of viable 1 km cells) and saved to `work/italy-bounds/etna_points_clim_preview.json`: GST falls with altitude, from 20.4 C (Pisanello 449 m, Monaci 491 m) through 18.7 (San Lorenzo 760 m) to 17.6 (Scimonetta 990 m).

## 3. _attrs.json
- 251 rows added (12,152 rows), placed in it_fine file order inside the existing it_fine block; columns `[country, gst, gdd, hi, prec, gsp, dtr, mjt, elev_mean, slope_mean, aspect_mean, area_km2, fine=1]`, clim from the geo file, terrain from it.json, area as topo_merge computes it (scratch merge row checked equal). All other rows unchanged. Minified as before.
- e.g. `it-roero-sru`: ["it",19.4,2015,2369,584,362,9.2,24.3,236,24.0,309,0.231,1].

## 4. Vintage series: skipped
Fine units have no vintage record and inherit their parent's (`work/vintage-log.md` lines 14, 359). All 251 polygons and 26 points are `fine: 1`.

## 5. Etna positions made persistent
`data/content/depth_italy_subzones.json`: lat, lon, `coord_quality: "approx"` added to the 26 Etna contrada profiles (matched by name with parent it-etna, so `it-soave-volpare` was not touched), as the 262 other point profiles in that file carry them. Values from `work/italy-bounds/t05_etna_points.json`, checked equal to the current `_extra_points.geojson` coordinates. integrate.py uses profile lat/lon for point-only profiles. Indent-1 layout kept.

## Files changed
- site/data/geo/it_fine.geojson (+clim on 251)
- site/data/topo/it.json (+251)
- site/data/topo/_attrs.json (+251 rows)
- data/content/depth_italy_subzones.json (26 profiles)
All four parse as JSON. No other country, front end, guide or deploy file touched.
