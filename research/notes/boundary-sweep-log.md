# Boundary sweep, integrate overrides and text fixes (followups 19 to 21)

Date: 2026-11-05. Backups of every file touched (pre-edit copies, same relative paths): `work/sweep_backup/`.
I did NOT run integrate.py, the climate/topo scripts or the vintage build. I did not touch `site/data/geo/it_fine.geojson`, the front end, `site/data/guides/*`, and I did not deploy or push.
Edited JSON keeps the format it had: site files minified, `data/content` files indent=1. I edited text by exact string replacement, so nothing else moved. Every file parses again after the edit, and every changed geometry is valid (shapely `is_valid`).

## 1. Hand fixes now survive re-integration (`data/overrides.json`)

### Mechanism (scripts/integrate.py, backup in work/sweep_backup/scripts/integrate.py)
`Ctx` now loads `data/overrides.json` (a missing file means no overrides). The sections are documented in the "hand-fix overrides" block near the top of integrate.py:

| section | applied where | effect |
|---|---|---|
| `parent` {id: parent or null} | `normalize_feature` (polygons and fine units, before the lvl chain) and the extra-point step (after point-in-polygon) | forced parent; lvl follows |
| `ctx` {app or site id: text} | end of `assign_ctx`, before site ctx is copied into content | forced ctx |
| `profile` {app id: {field: value}} | `build_country`, before region membership | e.g. `subregion`; this also feeds region app_ids and ctx |
| `alt_remove` {app id: [names]} | polygon alt in `normalize_feature`; profile match/alt before name keys are built | stops homonym joins |
| `region_exclude` {region id: [app ids]} | after region closure | removed from app_ids and from the outline |
| `outline_clip` {region id: {app id: [w,s,e,n]}} | region outline union | member clipped to a box in that outline only |
| `geometry` [{id, drop_parts_within, add_parts, reason}] | `normalize_feature`, before area/bbox/lp | drops parts lying wholly inside a box (padded 0.002 deg); unions `add_parts` (WGS84 polygons) unless they are already covered; fills holes under 0.2 km2; recomputes area and bbox, and lp if it falls outside. A re-run is a no-op (an added part is never re-dropped). |

The integration report gets a "Hand-fix overrides applied" section and a summary count line.

**Dry-run check**: `python3 -I scripts/integrate.py --check-overrides` runs before anything else and exits. It reads `_index.json`, `_sites.geojson`, `site/data/content/*.json`, the site geo files and `work/geo_src`. It writes nothing. It checks that every target id, parent target, region, subregion name and box is valid, and for each geometry spec it reports whether parts are still to drop or add in the site file and in the pristine copy. Last run: **26 overrides, 0 problems**, with every geometry spec reported "already fixed" in both copies.
**Fixture test**: `python3 -I work/fixtures/test_overrides.py` builds `work/fixtures/root_ov`, exercises every section in a full integrate run on that fixture (never on the real site), checks that a second run is byte-identical, and checks that `--check-overrides` passes on a clean config and fails on a bad id without writing. Result: OK. The existing `work/fixtures/test_v2.py` still passes.
I also checked each geometry spec against the pre-fix copies (`work/atlas_fixes_guides_backup/work/geo_src/it.geojson` and `work/sweep_backup/work/geo_src/*`): applying the spec to the pristine geometry gives exactly the current geometry.

### Entries (from followups 21 and atlas-fixes-guides-log.md)
- parent: nz-new-zealand, nz-north-island, nz-south-island -> null; nz-waitaki-valley-north-otago -> null; us-wild-horse-valley -> us-north-coast
- ctx: site-fr-chateau-margaux "Margaux"; nz-new-zealand / nz-north-island / nz-south-island as set on 31 Oct; fr-champagne-tours-sur-marne "Vallée de la Marne"
- profile: fr-champagne-tours-sur-marne subregion "Vallée de la Marne" (the source fix in depth_champagne_crus.json was already in place)
- alt_remove: fr-coteaux-du-layon-saint-aubin-de-luigne drops "Saint-Aubin" (the name is in both the INAO polygon alt and the depth_gap_profiles match list; the profile still joins by explicit id)
- region_exclude: that Layon DGC is removed from region-fr-burgundy and region-fr-cote-de-beaune
- outline_clip: region-fr-southern-rhone clips fr-cotes-du-rhone to [3.5, 43.0, 6.5, 44.6] (fr-cotes-du-vivarais tops out at 44.56 N, so it is not affected)
- geometry: the 31 Oct Calliano/Rivoli drops (it-barbera-d-asti, it-barbera-del-monferrato, it-barbera-del-monferrato-superiore, it-monferrato, it-valdadige, it-garda), plus the five sweep fixes below

## 2. Homonym-commune sweep (EU PDO layer)

**Method.** I took every `bq: "commune"` MultiPolygon in site/data/geo/{it,fr,es,pt,de,at,hu,gr,ro,bg,hr,si,cz,sk}.geojson and split it into parts (EPSG:3035). The main body is the largest part plus every part within 5 km of it, grown transitively. Every part outside the main body was listed: **417 detached parts, 160 of them more than 30 km away**. Each detached part was matched to the GISCO LAU 2021 units it consists of (raw/gisco_lau). I then flagged:
(A) a commune name that occurs more often inside the appellation than in the dataset's own commune list (raw/eupdo/PDO_EU_id.csv `Municip_nam`);
(B) a same-name or name-extension LAU (e.g. Rivoli -> Rivoli Veronese) within 15 km of the main body but outside it.
I also reviewed every detached part by hand against its LAU names and provinces (Italian ISTAT province codes, Greek regional-unit codes) for "outside the region" cases. The dataset's commune list records the names after its own join, so a suspect case was settled against the official texts named below.
The working scripts are in the session scratchpad (sweep/scan.py, homonyms3.py, build_specs.py, apply.py). They were not kept in the repo.

### Fixed (site/data/geo/{iso}.geojson and work/geo_src/{iso}.geojson; _index, _overview, _regions synced; each one is in overrides.json `geometry`)
| feature | stray part (bbox) | verdict and source | fix | area km2 |
|---|---|---|---|---|
| it-garda | Marano Vicentino (VI) [11.4026,45.6725,11.461,45.7201], 16 km out | The Garda DOC disciplinare art. 3 lists "Marano" and "Rivoli" among the **province of Verona** comuni, which means Marano di Valpolicella and Rivoli Veronese (aisitalia.it Garda.pdf). Both were missing (2% and 5% covered). | dropped the stray; added Marano di Valpolicella (LAU 023046) and Rivoli Veronese (023062), GISCO LAU simplified 40 m | 2358.1 -> 2382.5; bbox east 11.461 -> 11.3459 |
| hr-hrvatsko-primorje | Skradin [15.7632,43.8036,15.9898,43.9505], 57 km out, 184 km2 | NN 76/2019 Pravilnik: Skradin is a vinogorje of **Sjeverna Dalmacija**. Hrvatsko primorje has Opatija-Rijeka-Vinodol, Krk, Rab, Cres-Lošinj and Pag. | dropped | 3042.4 -> 2858.5; bbox south 43.80 -> 44.28 |
| gr-mavrodafni-kefallinias | Poros **on Lefkada** (LAU 36010307) [20.6833,38.6219,20.7248,38.6646], 37 km out | The dataset list says "K. Poroy" and the PDO is Kefalonia's. Poros on Kefalonia (35010209) was only 1% covered. | dropped the Lefkada part; added Kefalonia's Poros (LAU 35010209) | 209.6 -> 225.9 |
| cz-cechy | the part holding Konárovice plus Bělušice near Kolín (533190) [15.2486,50.0124,15.3353,50.0795] | Vyhláška 80/2018: the only vinařská obec named Bělušice is **Bělušice u Mostu** (Litoměřická), which is already in the polygon. Konárovice is a Mělnická vinařská obec. | part replaced by Konárovice alone (LAU 533394) | 1564.6 -> 1562.0 |
| de-mittelrhein | Langscheid near Mayen, Eifel (LAU 07137061) [7.0891,50.374,7.1208,50.3943], 26 km out | The Mittelrhein "Langscheid" is the Gemarkung of Oberwesel holding the Einzellage Langscheider Hundert (de_fine: gemarkungen Langscheid, gemeinden Oberwesel), already inside the polygon. | dropped | 949.5 -> 947.2 |

Region outlines in `_regions.geojson`: region-hr-istria-and-kvarner lost the Skradin piece (bbox south 43.80 -> 44.28). region-gr-ionian-islands lost the Lefkada Poros piece and gained Kefalonia's Poros. region-cz-cechy had its Kolín piece replaced. region-it-veneto and region-de-mittelrhein did not change (the strays were too small to survive outline simplification, and the added communes were already covered).
Not recomputed: `clim` of the five features (under 1% of area for the cz/de/hr drops; Garda gains about 1%); integrate.py's climate cache will recompute them on the next run because the geometry changed.

### Checked and left unchanged (genuine exclaves, or not a homonym)
- Islands: Sicilia (Pantelleria, Lampedusa, Aeolian, Egadi, Ustica), Malvasia delle Lipari, Aleatico di Puglia (Tremiti), Islas Canarias, Madeira/Madeirense, Pico, Croatian islands (Vis, Lastovo, Hvar, Mljet), Santorini, Sitia, Rhodes; Mavrodafni/Moschatos Kefallinias Ithaca parts (the old Kefalonia prefecture included Ithaca).
- Multi-region zones and known exclaves: Cava (Rioja, Álava, Navarra, Aragón, Requena, Almendralejo), Champagne (Aube/Côte des Bar, Vitry), Rheingau (Böddiger/Felsberg), Saale-Unstrut (Werder, Thale/Quedlinburg, Thuringian Saale), Sachsen (Jessen, Schlieben, Ostritz, Lusatia), Württemberg (Bodensee), Hessische Bergstraße (Umstadt, Dietzenbach), Piemonte DOC (VCO/Novara/Biella parts), Abruzzo DOCs (Valle Roveto), Trento (Storo: unique name, in Trentino), Valtellina (Ardenno), Molise DOCs, Etna (Randazzo), Cagliari DOCs (Sennariolo), Sopron (Kőszeg), Bükk (Barabás is listed in the Bükk OEM termékleírás itself, though it lies 110 km away in Szabolcs; boraszat.kormany.hu), Czech scattered vinařské obce, Slovak and Romanian districts, Portuguese freguesia homonyms inside large parts (Santiago Maior, Baraçal and others: all within their DOC regions).
- Homonyms that are both legitimately inside: Bligny (Marne and Aube, both Champagne communes); Dobrich city/rural (bg-chernomorski-rayon).

### Flagged but NOT changed (need a source I could not get within budget)
- gr-mavrodafni-patron part 2 and gr-moschato-patron part 0: "K. Agioy Nikolaoy" was joined to Agios Nikolaos in Kalavryta (LAU 37050302, 32 to 40 km out, upland). Agios Nikolaos Spaton (37030202) and Agios Nikolaos Kralis (37030402) border the main body. This is probably a homonym, but I could not check the Greek specification.
- hu-matra includes the whole Budapest LAU (526 km2) plus Pest-county communes, all named in the dataset list. These are probably a few listed Budapest districts standing in as the whole city; not a homonym.
- es-valencia: the dataset's 131-name list includes Alicante (Elda, Monóvar, Benissa, Teulada, Villena), Albacete (Almansa, Caudete) and Utiel-Requena communes. This looks like a list mix-up in the dataset (as with Valdeorras/Alicante), not a homonym. It needs the DO Valencia pliego before any change.
- cz-litomericka: two "Vrbice" LAUs, both in Litoměřice district; I did not determine which one holds the vinařská obec.

## 3. Text fixes (followups 19 and 20)
| file(s) | id / field | old -> new | source |
|---|---|---|---|
| site/data/vintage/_events.json; work/vintage_events/parts/p06_central_europe.py | de-mosel 2023 text | "The warmest year on record in Germany: ..." -> "Then Germany's warmest year on record (2024 has since beaten it): ..." | DWD via Clean Energy Wire, Dec 2024: 2024 the hottest year since 1881, beating 2023 (10.6 °C) |
| data/content/global/timeline.json; site/data/content/global/timeline.json; site/data/study/decks.json (timeline-058) | frost-2021 text | "temperatures fell as low as minus 6 degrees Celsius across France on three nights in early April." -> "temperatures fell to minus 6 degrees Celsius across much of France on three nights in early April, and to about minus 7 in Chablis." | The Drinks Business, Apr 2021: "as low as -6C in France", "In Chablis the mercury dipped to as low as -7C" (the source the Chablis event already cites) |
| data/content/c12_oceania_africa_asia.json; site/data/content/nz.json | nz-hawkes-bay area_ha | 4615 -> 4454 | NZ Winegrowers Vineyard Report 2026, Table 1.1: Hawke's Bay 2025 planted 4,615 ha, producing 4,454 ha (the old value was the planted figure). The 2025 Vineyard Register snapshot gives 4,605 producing / 4,671 planted on another basis; I followed the report. |
| same two, plus site/data/study/decks.json (nz-regions-003) | nz-hawkes-bay summary | "(about 4,600 ha)" -> "(about 4,450 ha of producing vines in 2025)" | as above |
| data/content/it_b.json; site/data/content/it.json | it-bolgheri summary | "in 1985 his nephew Lodovico Antinori founded Ornellaia," -> "in 1981 his nephew Lodovico Antinori planted Ornellaia (first vintage 1985)," | Wikipedia "Tenuta dell'Ornellaia": vineyards planted 1981, first vintage 1985 |
| data/content/global/grapes.json; site/data/content/global/grapes.json | nebbiolo profile | "Barolo's MGA map of 181 named vineyards (2010)" -> "Barolo's map of 181 MGAs (2010: 170 named vineyard areas plus 11 village names)" | wein.plus magazine: Barolo 170 MGAs plus eleven municipality designations, Barbaresco 66 |

The other MGA totals in the atlas already match (it.json and it_a.json: 181 = 170 + 11 and Barbaresco 66; it_fine and depth_piemonte_mga: "one of the 170 named vineyard areas ... plus 11 village names" and "one of the 66"; glossary "66 ... 181"). I left the minor date wording (Barbaresco 66 "in 2007" vs "65 in 2007 plus one in 2010") alone. I left the guides alone: new-zealand.json says about 4,500 ha for Hawke's Bay and wines-long-road.json says "around minus 6 °C across France"; both are consistent. I did not edit the old v1 output work/vintage/v1_out/_events.json. The rest of followup 19 (Côtes du Rhône Villages grape rule, Tasmania GDD) was out of scope.

Web lookups: WebSearch 7 of 15. WebFetch: thedrinksbusiness.com (2021 frost), cleanenergywire.org (DWD 2024), aisitalia.it Garda disciplinare, narodne-novine.nn.hr NN 76/2019, boraszat.kormany.hu Bükk OEM termékleírás, epravo.cz vyhláška 80/2018, nzwine.com Vineyard Register snapshot 2025 and Vineyard Report 2026, en.wikipedia.org Tenuta dell'Ornellaia, magazine.wein.plus (MGA counts).
