# Barolo and Barbaresco MGAs rebuilt on the cadastre (5 Nov 2026)

Agent: Barolo MGA cadastre job. Scripts `scripts/bmc_*.py` (all run with `python3 -I`), reusing `itb_common`, `itb_cadastre`, `itb_write` of the T04 job (`work/italy-bounds-log.md`). Downloads in `raw/barolo_mga_src/` (GU and disciplinare PDFs), `raw/italy-bounds/ae_cadastre/` (cadastre cache, shared with T04), `raw/agea_tiles/` (orthophoto tiles). Intermediates: `work/barolo-mga/`. No front end touched, nothing deployed or pushed, integrate.py not run.

## Source keys
- `aecad`: Agenzia delle Entrate cadastral parcels (INSPIRE WFS CadastralParcel/CadastralZoning, https://wfs.cartografia.agenziaentrate.gov.it/inspire/wfs/owfs01.php ; CC BY 4.0) matched to the parcels listed in the Barolo, Roero and Dogliani DOCG disciplinari annexes (Barolo annex as published in GU serie generale n. 31 of 8 Feb 2010). bq official (>= 90% of listed parcels found) or approx.
- `aecadtext`: Barbaresco MGAs: Agenzia delle Entrate cadastral parcels (CC BY 4.0, https://www.agenziaentrate.gov.it/portale/cartografia-catastale-wms ) assigned to each MGA from the boundary description of the disciplinare annex (DM 21.02.2007, GU serie generale n. 51 of 2 Mar 2007) and the consortium MGA map; bq approx.

## 1. What the official texts contain
- The consolidated disciplinari (MASAF texts as mirrored by AIS, langhevini.it, impetodivino, Regione Piemonte via WebFetch) only list the MGA names (Barolo art. 8, Barbaresco art. 7) and say the delimitations are "definite tramite l'allegato in calce"; the annex is not in those files. Regione Piemonte and langhevini.it reset the connection to direct downloads; the consortium site was refused by the proxy.
- **Barolo: parcel lists.** The annex was published with the proposta di modifica in GU serie generale n. 31 of 8 Feb 2010, pp. 54-93 (`raw/barolo_mga_src/gu_2010-02-08_p54.pdf`, from gazzettaufficiale.it): "Allegato delle Menzioni geografiche aggiuntive della docg Barolo", each MGA as Comune / Foglio / Particelle, "parte" after a number for parcels only partly inside. 289 rows, 21,505 parcel numbers, 129 "parte". The approving decree's own annex (DM 30 Sep 2010) could not be retrieved, so this proposal annex is the source; its MGA list equals today's art. 8 list except one extra name (below).
- **Barbaresco: words.** The annex of DM 21.02.2007 (GU n. 51 of 2 Mar 2007, `raw/barolo_mga_src/gu_2007-03-02_51.pdf`) describes each MGA by the fogli it lies in, roads, streams and comune borders, and, in Barbaresco comune, by boundary parcels tagged with the MGA on each side ("tra i mappali numeri 65, 134 e 155 del foglio n. 6 (Asili) ed i mappali numeri 180 e 182 del foglio n. 6 (Pora)"). No parcel lists. 65 descriptions; Ronchi has none (named only as a neighbour); "Niccolini" and "Cortini" appear only as neighbours and are not MGAs.

## 2. Barolo (170 MGAs, src aecad)
Method as T04: `bmc_parse_barolo.py` (text of the GU PDF, tokens Comune/Foglio/Particelle/parte), `bmc_fetch.py` (fogli and parcels from the AE WFS, matched by number; Monforte d'Alba has sezioni, refs `F358A0016..`, "Foglio 16A" = sezione A foglio 16), `bmc_build_barolo.py` (union of listed parcels, closed by 8 m without spilling onto a neighbour, holes < 0.2 ha dropped, simplified 8 m, 5 decimals; "parte" parcels drawn whole unless a neighbour lists them whole).
- Annex reading: the Rocchettevino list restarts after "Foglio 11 ... 604 612" (a "Foglio N" header is missing in the GU). The 151 later numbers were tried on every La Morra foglio: only foglio 14 puts them on the consortium map's Rocchettevino (135/151 found, 76% inside it; others 0 to 4%), so they are read as foglio 14 (`ROW_SPLIT` in the parser).
- Results: all 170 drawn; 18,700 of 21,505 listed parcels matched (87.0%); 75 official, 95 approx. Lowest: Case Nere 55%, Pira 60%, La Corte 62%, Gabutti and Parussi 65%. Sizes 1.0 to 328 ha (median 13). One WFS tile failed after retries (a few parcels may be missing there).
- Not drawn: **Bricco Vigna Mirasole** (Castiglione Falletto foglio 4, 9 parcels, 1.2 ha): in the 2010 proposal, not in today's art. 8 list. Its parcels touch the new Monprivato; the consortium map put 40% of them in Monprivato. Not added to any MGA (human decision).
- Village MGAs ("del comune di ..." x 11): the atlas has no ids for them (index has the 170 named MGAs only), so none were created.
- Overlaps > 2% between MGAs, all from parcels the annex lists under both: Cannubi / Cannubi Valletta 37% (2.3 ha), Damiano / Rivette 39%, Bergeisa / Zonchetta 17%, Boschetti / Coste di Rose 9%, Case Nere / Fossati 6%, Cerviano-Merli / Ravera 5%, and 9 more under 5% (`new_barolo.json` summary). Kept as listed.

## 3. Barbaresco (66 MGAs, src aecadtext, all bq approx)
`bmc_parse_barbaresco.py` (annex text in columns, fogli and tagged parcels), `bmc_fetch_barbaresco.py` (all 19,827 parcels of the 44 fogli of Barbaresco, Neive, Treiso and Alba 69/70), `bmc_build_barbaresco.py`:
1. a parcel the annex names with an MGA goes to that MGA (Niccolini/Cortini: to none); "/p" parcels not used; 16 parcels the annex gives to two MGAs (Asili/Pora/Faset, Martinenga/Asili, Roccalini/Roncagliette) left to step 2;
2. any other parcel goes to the MGA of its comune whose consortium-map polygon covers most of it, if >= 50%, but never to an MGA whose text says it "confina con" that parcel (278 such constraints, Treiso/Neive texts). In Barbaresco comune the map was first shifted 30 m W, 20 m S, the translation that best fits the 259 named parcels (inside their MGA on the map: 186 as is, 210 after the shift).
- The 2007 foglio lists are checked, not enforced: enforcing them dropped large parts the map shows (e.g. Bricco di Neive in Neive 18, Bordini in Neive 7, Serragrilli in Neive 6); share of each new MGA outside its listed fogli is in the report (max Secondine 23%).
- Results: 14,757 parcels assigned (259 by name, 14,508 by map); 66 polygons, 1.0 to 155 ha (median 28.5). Treat as approximate: edges follow parcel edges, roads and ditches, but which side of a field edge a parcel falls on still depends on the map where the text names no parcel (Neive, Treiso).

## 4. Old vs new (`work/barolo-mga/compare.csv`, `compare.json`, `shift_diag.json`)
- Barolo: median IoU 0.41, median centroid shift 109 m, median area change -1.9%, 4,774 to 4,568 ha in total. 146 of 170 below IoU 0.6. Main reason: the consortium-map digitisation is offset by about 100 m (median best translation 50 m W, 90 m S; by comune from 15 m W 50 m S in Verduno to 135 m W 120 m S in Novello); after the best translation the median IoU is 0.80 and 28 remain below 0.6 (table).
- Barbaresco: median IoU 0.84, centroid shift 24 m, area -2%, 2,992 to 2,940 ha. 6 below 0.6 (Rabajà-Bas 0.23, Cole 0.45, Pajè 0.54, Montestefano 0.56, Muncagota 0.59, Montefico 0.59): all small Barbaresco-village MGAs where the map is 30 to 60 m off; after a 40 to 60 m translation all are 0.76 to 0.86.

Barolo MGAs still below IoU 0.6 after the best translation of the old outline:

| MGA | IoU as is | IoU after best shift (dx, dy m) | old ha | new ha | parcels matched | reason |
|---|---|---|---|---|---|---|
| Ciocchini | 0.102 | 0.103 (-30, -60) | 1.1 | 10.2 | 84/110 | old outline caught only part of the MGA (small colour patch on the map); 24% of listed parcels renumbered, new outline has gaps |
| Zuncai | 0.061 | 0.104 (-150, -90) | 0.8 | 7.8 | 18/18 | old outline caught only part of the MGA (small colour patch on the map) |
| La Corte | 0.104 | 0.173 (50, -40) | 16.8 | 3.4 | 8/13 | old outline much larger (scattered fill fragments or neighbouring colour); 38% of listed parcels renumbered, new outline has gaps |
| Cannubi San Lorenzo | 0.003 | 0.179 (-100, -100) | 0.4 | 2.4 | 9/11 | old outline caught only part of the MGA (small colour patch on the map) |
| Pugnane | 0.053 | 0.186 (-90, -120) | 0.9 | 4.6 | 12/13 | old outline caught only part of the MGA (small colour patch on the map) |
| Carpegna | 0.008 | 0.193 (60, -130) | 0.9 | 4.8 | 12/15 | old outline caught only part of the MGA (small colour patch on the map) |
| San Lorenzo | 0.345 | 0.362 (-50, -20) | 0.7 | 1.9 | 19/19 | old outline caught only part of the MGA (small colour patch on the map) |
| Bricco San Giovanni | 0.014 | 0.396 (-120, -140) | 3.5 | 2.7 | 11/13 | small MGA: shape differs at parcel scale beyond the map offset |
| Cannubi Muscatel | 0.043 | 0.407 (-170, -200) | 3.5 | 3.6 | 16/21 | 24% of listed parcels renumbered, new outline has gaps |
| Mantoetto | 0.108 | 0.43 (-90, -70) | 1.4 | 3.0 | 5/7 | old outline caught only part of the MGA (small colour patch on the map); 29% of listed parcels renumbered, new outline has gaps |
| Bablino | 0.268 | 0.436 (80, 80) | 1.6 | 3.5 | 6/8 | old outline caught only part of the MGA (small colour patch on the map); 25% of listed parcels renumbered, new outline has gaps |
| Manocino | 0.36 | 0.44 (-50, -110) | 3.7 | 3.8 | 24/30 | small MGA: shape differs at parcel scale beyond the map offset |
| Monrobiolo di Bussia | 0.188 | 0.441 (-40, -190) | 4.4 | 10.1 | 52/58 | old outline caught only part of the MGA (small colour patch on the map) |
| Brea | 0.155 | 0.453 (-20, -100) | 11.4 | 5.8 | 20/24 | small MGA: shape differs at parcel scale beyond the map offset |
| Arborina | 0.172 | 0.458 (-50, -80) | 10.0 | 5.2 | 20/29 | 31% of listed parcels renumbered, new outline has gaps |
| Montanello | 0.223 | 0.494 (-30, -90) | 22.2 | 13.0 | 33/47 | 30% of listed parcels renumbered, new outline has gaps |
| Bricco Rocche | 0.007 | 0.503 (-60, -90) | 0.7 | 1.4 | 12/12 | small MGA: shape differs at parcel scale beyond the map offset |
| Borzone | 0.19 | 0.506 (50, -50) | 4.6 | 6.0 | 27/31 | small MGA: shape differs at parcel scale beyond the map offset |
| Rivette | 0.149 | 0.513 (10, -130) | 7.9 | 4.5 | 12/17 | 29% of listed parcels renumbered, new outline has gaps |
| Le Coste | 0.068 | 0.521 (-110, -120) | 5.5 | 3.2 | 20/28 | 29% of listed parcels renumbered, new outline has gaps |
| San Rocco | 0.341 | 0.536 (-10, -90) | 5.8 | 5.2 | 31/35 | small MGA: shape differs at parcel scale beyond the map offset |
| Parussi | 0.283 | 0.551 (-20, -80) | 12.3 | 8.4 | 26/40 | 35% of listed parcels renumbered, new outline has gaps |
| Vignolo | 0.212 | 0.555 (-40, -80) | 2.3 | 3.0 | 7/10 | 30% of listed parcels renumbered, new outline has gaps |
| Cerrati | 0.135 | 0.567 (0, -120) | 12.0 | 8.1 | 20/24 | small MGA: shape differs at parcel scale beyond the map offset |
| Prabon | 0.147 | 0.57 (-30, -90) | 3.6 | 5.8 | 24/26 | small MGA: shape differs at parcel scale beyond the map offset |
| Rocche di Castiglione | 0.334 | 0.575 (-60, -100) | 11.1 | 14.2 | 73/93 | 21% of listed parcels renumbered, new outline has gaps |
| Sorano | 0.333 | 0.586 (0, -80) | 11.6 | 12.6 | 60/68 | small MGA: shape differs at parcel scale beyond the map offset |
| Piantà | 0.351 | 0.599 (-20, -80) | 4.8 | 5.8 | 37/41 | small MGA: shape differs at parcel scale beyond the map offset |

## 5. Visual check (AGEA 2024 ortho, z17; red old, yellow new, cyan new neighbours; `scripts/bmc_render.py`)
Images: `work/barolo-mga/spot/` it-barolo-castagni, -ascheri, -cannubi, -brunate, -la-corte, -cannubi-san-lorenzo; it-barbaresco-gallina, -rabaja, -asili, -rabaja-bas (.png).
- Barolo: the new edges sit on the roads, tracks and field edges (Castagni and Ascheri on the La Morra roads and the stream lines, Cannubi between the two roads of the hill, Brunate below the Brunate road), where the old ones cut across rows about 100 m off. Interior holes and some notches where listed parcels were renumbered (Ascheri, Brunate). A few straight edges are cadastral sheet edges (Castagni north-east).
- Barbaresco: Gallina and Rabajà now follow the SP 3 and the Alba-Acqui road instead of crossing them; Asili follows the strada Stazione and the field edges. Some edges follow large cadastral parcels that no longer match the planted blocks (a triangle in Gallina), so these stay approx.
- La Corte: the old outline was scattered fragments of woods and village; the new one is the compact block of the 8 listed parcels found.

## 6. Data written
Backups (made before any write): `work/fine_backup/*.2026-11-05.pre-barolo-mga.*` (geo it_fine, _index, content it_fine, topo it.json and _attrs.json, meta.json, data/overrides.json, data/content/depth_piemonte_mga.json). The earlier `work/fine_backup/*.2026-11-05.*` files of the T04 job were left as they were.
- `site/data/geo/it_fine.geojson`: 236 feature lines replaced in place (geometry, src, bq, area, lp, bbox, reg; same property order; clim recomputed); the other 599 lines byte-identical. 3.52 MB.
- `site/data/geo/_index.json`: area, lp, bbox, bq of the 236 ids. All valid, lp inside, index equal to properties.
- Terrain: `topo_run.py --incremental 5` (GEO pointed at a scratch copy of it_fine + _sites), 236 geometries, 2 tiles, 0 errors; merge to scratch, the 236 entries replaced in `site/data/topo/it.json`; the scratch merge reproduced the 599 untouched entries exactly. `work/topo/prep.pkl` and `merge_summary.json` restored.
- Climate: `climate_enrich.py` (v2 lapse-rate, 30 m topo target) on a scratch file of the 236 features only; clim put back on those lines. GST medians unchanged (Barolo 19.4, Barbaresco 19.5 C), largest change 0.2 C. `site/data/topo/_attrs.json`: the 236 rows rewritten.
- Profiles: the one data sentence "On the official MGA map the digitised outline covers about N ha at roughly A to B m, facing ... (Approximate outline; ...)" rewritten for all 236 from the new outline and its Copernicus terrain (`bmc_terrain.py`, same method as depth_fine2_mga_terrain.py), in `site/data/content/it_fine.json` and in its source `data/content/depth_piemonte_mga.json` (so integration keeps it). Log `work/barolo-mga/profile_changes.json`. Hand-written summary figures (Bussia "almost 300 ha", Cannubi 15/34 ha, Brunate 25 to 28 ha and similar) are literature figures and were left.
- Persistence: integrate.py rebuilds its pristine copy from the site file when geometry changed in place, so no geometry override is needed; a `_note_barolo_barbaresco_mga` comment was added to `data/overrides.json` (one line; `--check-overrides`: 0 problems) warning not to re-run `scripts/depth_mga_fine.py`. `site/data/meta.json`: aecad title widened to Barolo, aecadtext added.
