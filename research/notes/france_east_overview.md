# France (country entry) and the wine regions of eastern France

Deliverable: `/home/claude/winesite/data/content/fr_b.json` (1 country, 16 regions, 259 appellations, 379 sites; valid JSON, zero validator warnings). Build scripts and part files are in `/home/claude/winesite/work/fr_b/` (`frb_part_*.py` writes `parts/*.json`, and `frb_merge.py` merges and validates them). Coordinates for every grand cru, premier cru, Alsace grand cru and named sub-denomination come from representative points of the official INAO parcel boundaries (file of 19 Oct 2026), computed by `frb_inao_points.py` and saved in `work/fr_b/inao_pts.json`. Lieux-dits that INAO does not delimit (Hermitage, Côte Rôtie, Chablis premier cru groupings, Morgon, Fleurie, Moulin-à-Vent, Châteauneuf) come from Etalab cadastre lieux-dits (`work/fr_b/cadastre/`). Estates and historic sites were geocoded with Nominatim (`geo*.json`). A point-in-polygon check (`frb_check_points.py`) found all 376 checkable sites inside or within 250 m of their INAO appellation polygon. The only exceptions are off-vineyard landmarks, such as town-centre houses, abbeys, mountains and the Palais des Papes, which is expected.

## France country entry: history, law, current statistics, climate

### Takeaway
France had the world's second-largest vineyard (740 kha) and second-largest production (36.1 mhl) in 2025, and the 2026 harvest is estimated at only about 35 mhl. Its AOC system, created in 1935 out of the phylloxera, fraud and 1907 crises, remains the template for European wine law.

### Cited Findings
- France vineyard area: 740 kha in 2025, down 4.4% (about 34 kha) on 2024, the third straight year of decline. It is second after Spain (919 kha) and ahead of China (733) and Italy (726). [OIV, State of the World Wine Sector in 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- France production in 2025: 36.1 mhl, second after Italy (44.4 mhl). This is -0.1% on 2024 and -15.5% against the five-year average, and 16% of world output. The OIV blames the August heatwave and drought, plus grubbing-up campaigns. [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- France consumption in 2025 was 22.0 mhl (second after the USA). Exports were 12.5 mhl (third by volume, first by value at 11.2 bn EUR). [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- World totals for 2025: 7.0 mha of vineyard, about 227 mhl produced and about 208 mhl consumed. [OIV press release](https://www.oiv.int/sites/default/files/2026-05/OIV_EN_Press_release_State-of_the_World-Wine_Sector.pdf)
- The Agreste estimate for the 2026 French harvest (as of 1 Oct 2026, reported 7 Oct) is about 35 mhl. That is revised up from 33.9 mhl, about 2% below 2025 and 14% below the 2021 to 2025 average, because of heatwaves, drought and grubbing up. [L'Info Durable / AFP](https://www.linfodurable.fr/la-vendange-2026-revue-legerement-la-hausse-toujours-historiquement-basse-59262)
- The French PDO names and registration data in the EU dataset were used for `match` fields. [Candiago et al. 2022, figshare](https://doi.org/10.6084/m9.figshare.c.5877659)
- The INAO parcel delimitation file (version of 19 Oct 2026, 11,764 polygons) covers all delimited AOC areas, grand crus, premier crus and DGCs. [data.gouv.fr](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)

### Inferences
- The country `stats` use the OIV 2025 figures (vineyard_ha 740000, production_mhl 36.1, year 2025, rank 2), with the 2026 Agreste estimate given in the note.
- History entries for Massalia, Vix, Lattara, Roman Gaul, Cluny, Cîteaux and Clos de Vougeot, Eleanor, Avignon, Philip the Bold in 1395, the Dutch, 1855, phylloxera at Pujaut in 1863, 1905 and 1907, Le Roy and Capus in 1923 to 1935, 2009 to 2015 and the 2019 heat record were written from expert knowledge. They are standard facts in reference works (see Gaps for what was not re-fetched).

### Gaps
- The search budget was exhausted mid-task, so these well-established historical facts were not re-verified against a fetched source this session: the founding dates of Massalia (c. 600 BC), Cluny (910) and Cîteaux (1098); the Clos de Vougeot wall (1336); the Vix krater (c. 510 BC, 1.64 m); Lattara pressing floor (c. 425 BC, 2013 study); the Pujaut 1863 phylloxera sighting and Planchon 1868; the fraud law of 1 August 1905; the 1907 Montpellier rally and the 17th Regiment mutiny; the decree-law of 30 July 1935; INAO's name in 1947; the Vérargues 46.0°C record of 28 June 2019. A report writer should treat these as reference-book facts, not freshly sourced ones.
- No official 2025 figure for the number of French wine AOCs was fetched. "About 360" is from the EU PDO dataset (361 French wine PDOs).

## Burgundy (Chablis to Mâconnais), grand crus, premier crus, Climats, Hospices

### Takeaway
All 33 grand crus are included as appellations and sites, using INAO polygons (the 7 Chablis climats are sites under one Chablis Grand Cru AOC). So are 97 premier cru sites across Burgundy, every village AOC, the regional AOCs and the 2020 and 2024 Mâconnais premier crus. Burgundy's split has moved strongly to white (61% white, 28% red, 11% crémant in 2022).

### Cited Findings
- The INAO parcel file delimits each Côte d'Or grand cru, for example Romanée-Conti at 1.81 ha, La Romanée 0.84 ha, La Tâche 6.05 ha, Montrachet 7.99 ha, Clos de Vougeot 51.12 ha and Corton 160.55 ha. Chambertin is drawn at 28.23 ha because it encloses Clos de Bèze; Charmes and Mazoyères are drawn together at 30.94 ha. [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Chablis Grand Cru is a single AOC of 106.65 ha with seven named climats in the parcel file. It lists only 10 named Chablis premier cru denominations (Fourchaume, Mont de Milieu, Vosgros, Vaucoupin, Côte de Jouan, Les Beauregards, Les Fourneaux, Vaugiraut, Vaupulent, Chaume de Talvat). [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- The INAO parcel file holds 637 named premier cru denominations across Burgundy. Chassagne has 55, Montagny 49, Beaune 42, Nuits 41, Givry 37, Mercurey 32 and Pouilly-Fuissé 22. [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Pouilly-Fuissé premier cru totals 193.48 ha across 22 climats. Pouilly-Loché has one premier cru (Les Mûres, about 7 ha) and Pouilly-Vinzelles three (Les Quarts 12.45 ha, Les Pétaux 2.76 ha, Les Longeays 7.50 ha). These were signed on 18 Nov 2024, first vintage 2024. [iDealwine](https://www.idealwine.net/les-appellations-pouilly-loche-et-pouilly-vinzelles-decrochent-leurs-premiers-crus/)
- BIVB: 84 Bourgogne appellations. [bourgogne-wines.com](https://www.bourgogne-wines.com/)
- BIVB colour split went from 50% red and 50% white in 1983 to an estimated 28% red, 61% white and 11% crémant in 2022. [BIVB presentation via Cerfrance](https://saone-et-loire.cerfrance.fr/upload/files/document/642aa8baad2082.54608020_bivb_les_evolutions_de_la_bourgogne_face_aux_marches.pdf)
- Hospices de Beaune: founded 1443 by Nicolas Rolin and Guigone de Salins, auction since 1859, Christie's 2005 to 2020 and Sotheby's since 2021, about 60 ha domain. [Wikipedia](https://en.wikipedia.org/wiki/Hospices_de_Beaune); [fr.wikipedia](https://fr.wikipedia.org/wiki/Hospices_de_Beaune)
- 165th sale, 16 Nov 2025: 552 barrels, about $21.5M, with the Pièce des Présidents (Pommard 1er cru Les Rugiens) at about $460,000, by Sotheby's. [Wine Spectator](https://video.winespectator.com/articles/2025-hospices-de-beaune-wine-charity-auction-burgundy). The euro total of €18.8M comes from a headline. [The Drinks Business](https://www.thedrinksbusiness.com/2025/11/hospices-de-beaune-sale-celebrates-record-participation-as-it-achieves-e18-8m/)
- In 2024 the sale took €13.944M, with the Pièce des Présidents at €360,000 plus €100,000 in donations. The 2022 record was €29M, and the 2021 Pièce was €800,000 (Corton Renardes). [L'Info Durable](https://www.linfodurable.fr/vins-cedric-klapisch-martin-solveig-et-alice-taglioni-stars-des-encheres-de-beaune-53300); [L'Info Durable 2021](https://www.linfodurable.fr/vin-nouveau-record-pour-les-encheres-des-hospices-de-beaune-29685)
- Nuits-Saint-Georges premier cru Les Saints-Georges is still a premier cru in INAO's product sheet. Growers have applied for grand cru status. [INAO](https://www.inao.gouv.fr/node/33676/printable/pdf); [Decanter](https://www.decanter.com/wine-news/burgundy-s-les-saint-georges-applies-for-promotion-to-grand-cru-18243/)
- Vézelay appears as a separate AOC in the INAO file (258.73 ha). [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Cadastre lieux-dits confirm the cores of Chambertin (47.2119, 4.9646), Aux Charmes (47.2115, 4.9679) and Mazoyères ou Charmes (47.2070, 4.9684), plus the Montrachet family points. [cadastre.data.gouv.fr](https://cadastre.data.gouv.fr/)

### Inferences
- Grand cru `site` points use INAO representative points. For the merged polygons (Chambertin and Clos de Bèze, Charmes and Mazoyères, Corton-Charlemagne and Charlemagne), the cadastre lieu-dit points were used instead.
- Producer facts were written from expert knowledge, for example DRC ownership, Leroy 1988, Rousseau, Roumier, Mugnier, de Vogüé, Lafon and the Paulée, Ramonet and Raveneau. Claims I could not support were softened or removed, such as exact replanting years, the Ponsot lease and the Clos des Lambrays ownership details.

### Gaps
- The BIVB key-figures page (hectares, hectolitres, bottle counts) was blocked: a permission request was not answered. So "about 30,000 ha", "about 40% Pinot Noir" and "about half Chardonnay" in the Burgundy region text come from expertise, not a fetched 2025 figure.
- The Marsannay premier cru application is not in INAO's October 2026 file, so it is stated as pending. Its status at the INAO committee was not checked.
- The Clos de Vougeot owner count ("about 80") and Échezeaux ownership numbers were not re-verified.

## Beaujolais

### Takeaway
All 10 crus are included as appellations and sites (INAO points, with landmarks for Moulin-à-Vent, Fleurie, Morgon and Côte de Brouilly), plus Beaujolais, Beaujolais-Villages and Coteaux du Lyonnais. Production is about 400,000 to 500,000 hl, white is only about 4%, and Fleurie's premier cru application is pending.

### Cited Findings
- Beaujolais produces about 400,000 to 500,000 hl a year, of which white is 20,000 to 25,000 hl (about 4%). The Inter Beaujolais goal is to triple white to about 80,000 hl within 5 to 10 years (Feb 2025). [Réussir](https://www.reussir.fr/vigne/le-beaujolais-veut-tripler-sa-production-de-vin-blanc)
- On 28 March 2023 more than 85% of Fleurie growers voted for a premier cru application covering seven lieux-dits (Les Moriers, Poncié, Les Garants, La Madone, La Roilette, Grille Midi, La Chapelle des Bois), about 27% of the AOC. INAO approval could take years. [Decanter](https://www.decanter.com/wine-news/beaujolais-fleurie-premier-cru-plan-backed-by-winemakers-502633/)
- INAO areas by cru: Morgon 1,341.97 ha (1 commune), Brouilly 1,569 ha, Fleurie 996 ha, Moulin-à-Vent 707 ha, Régnié 748 ha, Juliénas 677 ha, Chiroubles 478 ha, Côte de Brouilly 406 ha, Saint-Amour 368 ha, Chénas 323 ha. The INAO file also lists 38 Beaujolais village DGCs. [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Cadastre lieux-dits used: Côtes du Py (46.152, 4.6786), Corcelette, Grand Cras, Les Thorins, Champ de Cour, La Madone, Poncié, La Roilette, Côte de Brouilly. [cadastre.data.gouv.fr](https://cadastre.data.gouv.fr/)

### Gaps
- No current (2024 to 2026) Beaujolais planted-area figure was found. The statement that the vineyard has "shrunk by roughly a third since the early 2000s" comes from expertise.
- The following were not re-fetched: the Gang of Four and Jules Chauvet details, Nouveau's third-Thursday rule (1985) and the Notre-Dame-aux-Raisins chapel date (1857).

## Rhône Valley

### Takeaway
All 18 crus are included (Laudun promoted in 2024), along with Côtes du Rhône, CdR Villages and its 21 named villages (20 INAO-drawn plus Visan), Brézème, every satellite AOC and the four Diois AOCs. Areas are Inter Rhône 2025 figures. The Rhône vineyard has shrunk fast, with the Côtes du Rhône down about 4,400 ha since 2020.

### Cited Findings
- Inter Rhône 2025 counts 60,223 ha of AOC vineyard (excluding Châteauneuf) and a 2025 harvest of 2,012,313 hl (red 1,474,204, rosé 282,390, white 255,719). Areas in 2025: CdR 26,777 ha; CdR Villages 8,019 ha (2,734 without a name, 5,285 with one). Northern crus: Côte-Rôtie 342, Condrieu 216, Château-Grillet 4, Saint-Joseph 1,504, Crozes 2,139, Hermitage 137, Cornas 162, Saint-Péray 128. Southern crus: Gigondas 1,184, Vacqueyras 1,421, Beaumes-de-Venise 738, Muscat BdV 227, Rasteau 861 (VDN 18), Cairanne 886, Vinsobres 559, Lirac 848, Tavel 781, Laudun 512 (became a cru in 2024). Others: Ventoux 4,987, Luberon 2,781, Costières 2,145, Grignan 971, Duché d'Uzès 285, Vivarais 120, Clairette de Die 1,355, Crémant de Die 64, Coteaux de Die 3, Châtillon 40, Clairette de Bellegarde 10. [Inter Rhône key figures 2025](https://www.vins-rhone.com/sites/vignoble/files/documentation/2026-05/INTER-RHONE-CHIFFRES-CLES-2025-EN.pdf)
- Châteauneuf-du-Pape 2025 vintage: 3,122 ha declared, 88,271 hl (7,460 white, 80,811 red), 28.27 hl/ha, 300 declarants, about 3,150 ha across 5 communes, average about 90,000 hl (12M bottles). [Châteauneuf-du-Pape, 2025 vintage](https://en.chateauneuf.com/appellation-chateauneuf-du-pape/vintages/2025-2/)
- Laudun was promoted to cru by the INAO national committee on 11 Sept 2024, with first vintage 2024. It had 591 ha in production in 2023, makes red and white (white was 30% of 2023 production) and no longer rosé, across Laudun, Saint-Victor-la-Coste and Tresques. It had been a CdR Villages with its own name since 1967. [Decanter](https://www.decanter.com/wine/laudun-becomes-the-18th-cru-of-the-rhone-valley-539015/)
- The CdR Villages cahier des charges (INAO national opposition procedure for the 18 June 2026 committee) lists 21 DGCs. Chusclan, Roaix, Rochegude, Rousset-les-Vignes, Sablet, Saint-Gervais, Saint-Maurice, Saint-Pantaléon-les-Vignes, Séguret, Valréas and Visan may be white, red or rosé. Gadagne, Massif d'Uchaux, Nyons, Plan de Dieu, Puyméras, Saint-Andéol, Sainte-Cécile, Signargues, Suze-la-Rousse and Vaison-la-Romaine may be white or red only. Laudun is no longer listed. Proposed changes include the white main-variety minimum moving from 60% to 80%. [INAO PNO 2026](https://extranet.inao.gouv.fr/fichier/PNO2026CDCAOPCotesduRhoneVillages.pdf). Note that the fetched summary also listed Chusclan under "rouges ou rosés only", an internal inconsistency in the extracted text.
- Nyons is the 22nd locality (counting Laudun and Cairanne historically), recognised in 2020. [Wine Wit and Wisdom](https://winewitandwisdomswe.com/?p=18666); [Wikipedia](https://en.wikipedia.org/wiki/C%C3%B4tes-du-Rh%C3%B4ne_Villages_AOC)
- The INAO parcel file draws 20 CdR Villages DGCs. Visan is not drawn separately, so it was added with village coordinates (approx). [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Gigondas: own AOC since 1971; white permitted from Sept 2022; red rules are max 80% Grenache and at least 15% Syrah and/or Mourvèdre. [Wikipedia](https://en.wikipedia.org/wiki/Gigondas_AOC)
- Duché d'Uzès: AOC July 2013 (campaign began 1989); 285 ha and 9,089 hl in 2025 at 32 hl/ha. Red is at least 40% Syrah and 20% Grenache; white is at least 40% Viognier and 20% Grenache Blanc. [Vins Rhône](https://vins-rhone.com/en/duche-duzes-aoc-wines)
- Brézème: 30 ha of terraced limestone marl at Livron, the only name allowed before "Côtes du Rhône", mostly pure Syrah. [Wein.plus](https://glossary.wein.plus/brezeme-cotes-du-rhone)
- Cadastre lieux-dits used: Tain (Bessar 45.0762/4.8336, Le Méal, L'Hermite, Les Greffieux, Roucoule, Péléat), Ampuis (Côte Brune, La Landonne, La Viallière), Condrieu (Vernon, Chéry), Cornas (Reynard, Chaillot), Châteauneuf (La Crau, Mont-Redon, Cabrières), Château Grillet (45.4502, 4.751). [cadastre.data.gouv.fr](https://cadastre.data.gouv.fr/)

### Inferences
- The Côte Blonde, La Mouline and La Turque points are approximate, because they are not separate cadastre lieux-dits. La Mouline sits in Côte Blonde and La Turque in the Côte Brune sector. They are marked `approx`.
- Chante-Alouette is treated as a wine name linked to the eastern hill, since it is not a cadastre lieu-dit in Tain. Its point is approx.

### Gaps
- Exact recognition dates for several CdR Villages named villages could not be confirmed: sources conflict (for example Saint-Andéol 2017 per Wikipedia), so most dates were dropped from the text.
- Côte Rôtie's 20% Viognier, Hermitage's 15% white allowance, the Château-Grillet ownership history (Artémis 2011) and the Guigal La La first vintages (1966, 1978, 1985) were not re-fetched.

## Alsace

### Takeaway
All 51 Alsace grand cru AOCs are included as appellations and sites (INAO points), plus AOC Alsace, its 13 DGCs and Crémant d'Alsace. As of October 2026 there is still no recognised Alsace premier cru. Pinot Noir has been allowed in Hengst, Kirchberg de Barr and Vorbourg since 2022.

### Cited Findings
- The INAO file (19 Oct 2026) contains 51 grand cru AOCs, 13 Alsace DGCs and no premier cru denominations. Areas run from Kanzlerberg 3.34 ha to Schlossberg 78.78 ha, Kaefferkopf 73.71 and Vorbourg 72.34. [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- The June 2025 AOC Alsace cahier des charges revision (committee of 11 and 12 June 2025) covers lieux-dits and DGCs (lieu-dit white yield 68 hl/ha, DGC whites 72 hl/ha) and does not mention premier cru. It also lists trial varieties for adaptation. [INAO PNO 2025](https://extranet.inao.gouv.fr/fichier/pno-cdc-Alsace-cn250612.pdf)
- 2010 and 2011 press releases warn that "premier cru" may not be used with AOC Alsace (decree 2011-1373 of 25 Oct 2011). [Préfecture Bas-Rhin 2011](https://www.bas-rhin.gouv.fr/index.php/contenu/telechargement/11093/73761/file/CP_Utilisation_non_autorisee_de_la_mention_premier_cru_associee_a_lAppellation_dOrigine_Controlee_Alsace_ou_Vin_dAlsace.pdf); [2010](https://www.bas-rhin.gouv.fr/index.php/contenu/telechargement/11021/73473/file/CP_inao_1er_cru_Alsace.pdf)
- The premier cru project was a proposal with Olivier Humbrecht heading the hierarchy committee, a proposed yield of 57 hl/ha and geological unity required (2016). [Decanter China](https://www.decanterchina.com/en/knowledge/trivia/alsace-s-1ers-crus-classification). The AVA proposal had been worked on for 12 years, and Humbrecht predicted five more years (2023). [The Drinks Business](https://www.thedrinksbusiness.com/2023/10/an-igp-would-be-a-deadly-threat-for-alsace-says-vigneron/)
- CIVA reported a planted surface of 15,529 ha in 2022. [The Drinks Business](https://www.thedrinksbusiness.com/2023/10/an-igp-would-be-a-deadly-threat-for-alsace-says-vigneron/)
- Pinot Noir has been permitted since 2022 in Hengst, Kirchberg de Barr and Vorbourg. [fr.wikipedia, Alsace grand cru](https://fr.wikipedia.org/wiki/Alsace_grand_cru)
- Regulatory milestones: ordinance of 2 Nov 1945; AOC mention mandatory from 3 Oct 1962; law 72-628 of 5 July 1972 (bottling in the region, flûte); Crémant d'Alsace decree of 24 Aug 1976; VT and SGN from 1 March 1984; grand crus of 1975, 1983, 1992 and 2007; separate AOCs in 2011. [fr.wikipedia, Vignoble d'Alsace](https://fr.wikipedia.org/wiki/Vignoble_d%27Alsace); [en.wikipedia](https://en.wikipedia.org/wiki/Alsace_Grand_Cru_AOC)
- Zotzenberg has allowed Sylvaner since 2006; Altenberg de Bergheim and Kaefferkopf allow blends; Kaefferkopf became a grand cru in January 2007. [Wikipedia](https://en.wikipedia.org/wiki/Alsace_Grand_Cru_AOC)
- Colmar receives about 600 mm of rain a year. [Wikipedia, Alsace wine](https://en.wikipedia.org/wiki/Alsace_wine)

### Inferences
- The `created` field for grand crus other than Schlossberg (1975) and Kaefferkopf (2007) is given as "1983 to 1992 (own AOC 2011)". Per-cru batch years were not verified individually.

### Gaps
- No 2024 or 2025 CIVA production or area figure was found. The vinsalsace.com page lacked figures.
- The sweetness-indication rule (mandatory from the 2021 vintage) and individual grand cru anecdotes (Rangen history, Clos Sainte Hune at 1.67 ha, Weinbach 1612/1898, Eugène Meyer biodynamics in 1969) come from expertise and were not re-fetched.

## Jura, Savoie, Bugey, Lorraine

### Takeaway
All Jura AOCs are included (Marc du Jura is listed as a spirit AOC), as are Vin de Savoie with its 16 crus, Roussette de Savoie with 4 crus, Seyssel, Bugey (3 crus) and Roussette du Bugey (2 crus), Côtes de Toul and Moselle. Crémant de Savoie is a mention within Vin de Savoie (since 2015), not a separate AOC.

### Cited Findings
- The Jura vineyard is about 1,850 ha with seven AOCs: Arbois, Côtes du Jura, L'Étoile and Château-Chalon, plus Macvin, Crémant and Marc du Jura. Vin jaune comes from Savagnin. [Jura Tourisme](https://www.jura-tourism.com/vivre-le-jura/deguster/vins-du-jura/vins-jura-appellations/)
- Vin de Savoie was recognised in 1957 and confirmed in 1973. It spans 53 communes in Savoie and Haute-Savoie, 2 in Ain and 1 in Isère, with 16 cru names. The "Crémant" mention has been possible since 2015. [INAO product sheet](https://www.inao.gouv.fr/node/6795/printable/pdf)
- The INAO file lists 16 Vin de Savoie DGCs: Abymes, Apremont, Arbin, Ayze, Chautagne, Chignin, Chignin-Bergeron, Cruet, Crépy, Jongieux, Marignan, Marin, Montmélian, Ripaille, Saint-Jean-de-la-Porte and Saint-Jeoire-Prieuré. It also lists 4 Roussette de Savoie DGCs (Frangy, Marestel, Monterminod, Monthoux), Bugey DGCs (Cerdon 859 ha, Manicle 24 ha, Montagnieu 124 ha) and Roussette du Bugey DGCs (Montagnieu, Virieu-le-Grand). [INAO parcel file](https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/)
- Bugey and Roussette du Bugey were approved as AOCs on 28 May 2009. They were VDQS from 1958, cover about 500 ha across 67 communes, and their crus have specific grape rules. [Wikipedia, Bugey wine](https://en.wikipedia.org/wiki/Bugey_wine)
- Côtes de Toul: AOC on 31 March 1998 (VDQS 1951), 110 ha across 8 communes. Its vin gris needs at least two varieties, none above 85%, with at least 10% Pinot Noir. [Wikipedia](https://en.wikipedia.org/wiki/C%C3%B4tes_de_Toul)
- Moselle: VDQS 1995 to 2010 (then AOC), about 1,500 hl a year, about 200 ha together with Toul, mostly Auxerrois and Müller-Thurgau. [Wikipedia](https://en.wikipedia.org/wiki/Moselle_wine)

### Gaps
- The following were not re-fetched: Arbois AOC date (15 May 1936), Château-Chalon's declassified vintages, the Percée du Vin Jaune start (1997), the Mont Granier collapse date (24 to 25 Nov 1248), Marc du Jura AOC (2015), Macvin (1991) and Crémant du Jura (1995). Some downstream text states "Crémant du Jura created in 1995", while the EU dataset gives a 1996 registration date.
- Jura grape shares ("Chardonnay about half, Savagnin about a fifth") come from expertise.

## Research log and coverage summary
- Countries: 1 (France, tier major; 669-word overview, 15 history entries with coordinates, 18 grapes, all 15 French regions listed).
- Regions (16): Burgundy, Chablis and the Grand Auxerrois, Côte de Nuits, Côte de Beaune, Côte Chalonnaise, Mâconnais, Beaujolais, Rhône Valley, Northern Rhône, Southern Rhône, Diois, Alsace, Jura, Savoie, Bugey, Lorraine.
- Appellations (259): Burgundy 88, Alsace 66, Rhône 54, Savoie 23, Beaujolais 13, Jura 7, Bugey 6, Lorraine 2.
- Sites (379): 96 grand cru (32 Côte d'Or plus 6 Corton climats, 7 Chablis climats and 51 Alsace), 97 premier cru, 34 crus, 47 estates, 30 villages, 17 lieux-dits and the rest historic, landscape and museum.
- Name overlap with fr_a.json: only "Clairette de Bellegarde", which both agents cover. No site ID or region overlaps.
- Blocked or failed sources: the bourgogne-wines.com key figures page and fr.wikipedia pages for Burgundy, Beaujolais, Jura and Savoie (a permission prompt went unanswered); vins-rhone.com/en/appellations, reussir.fr (the 2026 regional harvest breakdown) and lejournaldesentreprises.com (robots). The shared WebSearch budget (200 per turn) was exhausted once, partway through.
