# Spain: wine regions, appellations and sites (Vitis Mundi content research)

Deliverable: `/home/claude/winesite/data/content/es.json` (valid JSON; 1 country, 23 regions, 106 appellations, 173 sites). Built from part files in `/home/claude/winesite/work/es/parts/` by scripts in `/home/claude/winesite/scripts/es/` (`p01_country.py` to `p09_islands.py`, `merge_es.py`, `check_sites_geo.py`, shared helpers in `common.py`). Geocoding scripts: `/home/claude/winesite/scripts/es_geocode.py` and `es_geocode_box.py`; cached results in `/home/claude/winesite/work/es/geocode.json` and `geocode_box.json`.

## Country: history, law, ageing terms, current statistics

### Takeaway
Spain has the world's largest vineyard (919 kha, OIV 2025) but ranks third in production (28.7 mhl). It has 106 wine DOPs (2 DOCa, 70 DO, 27 VP, 7 VC in MAPA's July 2026 list) plus 43 IGPs. Its fine-wine story is recent and has moved from judging wine by time in oak toward place-based hierarchies since 2017.

### Cited Findings
- 2025: Spain vineyard 919 kha (13.1% of world, largest; France 740, China 733); wine production 28.7 mhl (3rd after Italy 44.4 and France 36.1); exports 19.6 mhl / 3.0 bn EUR; consumption 9.4 mhl (6th) (source: [OIV State of the World Wine Sector in 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Spain's wine-grape vineyard was 889,470 ha in 2025 (first time below 900,000; -2.4% on 2024; about -46% since 1980). Castilla-La Mancha 422,391 ha (47.5%), Castilla y León about 81,000 ha, Extremadura 76,500 ha. Source is the ministry's wine market observatory (OIVE) (source: [Wein.plus](https://magazine.wein.plus/news/spain-s-vineyard-area-at-a-historic-low-for-the-first-time-less-than-900-000-hectares))
- MAPA register updated 2 July 2026: 149 wine names (106 DOP, 43 IGP); traditional terms 2 DOCa (Rioja, Priorat), 70 DO, 27 VP, 7 VC. Urbezo is filed under "DO" in the list (source: [MAPA 02_vinos.pdf](https://www.mapa.gob.es/es/dam/jcr%3Af9643333-ef75-4a2f-8864-afd1ade63fd1/02_vinos.pdf))
- 2023/24 campaign: 630,641 DOP hectares (excl. Cava and Catalunya), 4,362 wineries, 9.78 million hl marketed, about 4,522 M EUR. Value shares: Rioja 27.19%, Cava 16.17%, Rueda 9.30%, Ribera del Duero 8.95%, Rías Baixas 5.52%. Largest by area: La Mancha 146,911 ha; Rioja 66,499; Ribera del Guadiana 40,976; Cava 37,502; Catalunya 35,467; Utiel-Requena 32,036 (source: [MAPA Informe DOPs 2023/2024](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))
- Monte Testaccio is built of about 53 million Dressel 20 olive-oil amphorae from Baetica (c. AD 140 to 250), not wine amphorae (source: [Wikipedia, Monte Testaccio](https://en.wikipedia.org/wiki/Monte_Testaccio))
- Drake's 1587 raid on Cádiz seized about 2,900 barrels of sherry; Jerez was "Sherish" under the Moors (source: [Wikipedia, Sherry](https://en.wikipedia.org/wiki/Sherry))
- Rioja's Consejo: 1925 and 1926 are both cited (created 1925, constituted 1926); Royal Decree 1902; DOCa 1991 (source: [Wikipedia, Rioja (wine)](https://en.wikipedia.org/wiki/Rioja_(wine)))
- Priorat DOQ granted 2000; regulations Order ARP/188/2006, BOE 2 July 2009 (source: [Wine with Seth, Priorat](https://www.winewithseth.com/winewiki/priorat-doq/))
- The 2003 wine law is the framework for Vinos de Pago; 26 pagos in May 2025 (half in Castilla-La Mancha) (source: [FENAVIN 2025 note](https://www.fenavin.com/ARCHIVO/documentos/noticias/2920/1746613071-vinos-de-pago.docx); Tharsys (October 2025) brought the total to 28 (source: [Wine, Wit and Wisdom](https://winewitandwisdomswe.com/2025/10/08/welcome-to-the-world-vino-de-pago-tharsys/))
- Corpinnat had 21 producers by February 2026, with stricter entry rules and international varieties banned from 2035 (source: [Spanish Wine Lover](https://spanishwinelover.com/corpinnat-grows-to-21-producers-as-stricter-controls-loom); 19 wineries, about 3 million bottles and 34.13 M EUR in 2025 (source: [Ara](https://en.ara.cat/economy/expansion-in-wineries-and-good-harvest-boost-corpinnat-s-sales-in-2025_1_5672758.amp.html))
- DO Penedès required 100% certified organic grapes and wines from the 2025 harvest; just over 13,000 ha registered, about 5,000 used for Penedès wine; Clàssic Penedès produces about 1 million bottles (source: [Spanish Wine Lover](https://spanishwinelover.com/penedes-the-challenges-ahead-for-spain-s-first-100-organic-appellation); [Foods & Wines from Spain](https://www.foodswinesfromspain.com/en/wine/news/2025/2025-historic-harvest-in-do-penedes--the-world-s-first-100--ecol0))

### Inferences
- The national ageing minimums in the JSON (crianza 24 months with 6 in oak; reserva 36 with 12; gran reserva 60 with 18; whites/rosés 18/24/48 with 6) and the Rioja/Ribera stricter oak minimums come from my own expertise. The search budget ran out before I could cite them.
- The 1932 Estatuto del Vino, the 1970 Estatuto de la Viña, the Franco-era cooperative push, Codorníu 1872, Riscal 1858, Murrieta 1852, Vega Sicilia 1864 and phylloxera at Málaga in 1878 are standard history, written from expertise. Vega Sicilia 1864 and Murrieta 1852 are cited above.

### Gaps
- Two pages were blocked because their permission prompt timed out: `https://es.wikipedia.org/wiki/Alejandro_Fernández_(bodeguero)` and `https://es.wikipedia.org/wiki/Anexo:Denominaciones_de_origen_vitivinícolas_de_España`. As a result, Alejandro Fernández's current status and the DO creation years were not checked. Where unsure, `created` is null or a decade.
- The WebSearch budget (200 calls shared across agents) ran out partway through. After that, verification relied only on fetching URLs already seen.

## Rioja in depth

### Takeaway
The DOCa had 66,500 ha, 12,704 growers and 719 wineries in 2026. It has three zones (Rioja Alta, Rioja Alavesa, Rioja Oriental) and, since 2017, village (*vino de pueblo*) and single-vineyard labels: 167 *viñedos singulares* by September 2026. The breakaway "Viñedos de Álava" DO was annulled by the Basque high court in November 2024.

### Cited Findings
- Sept 2026: 3 new viñedos singulares, total 167 since 2019 (91 La Rioja, 73 Álava, 3 Navarra), 270 ha, 101 wineries; DOCa 66,500 ha, 12,704 growers, 719 wineries (source: [MAPA press note 24-09-2026](https://www.mapa.gob.es/dam/mapa/contenido/prensa/notas-de-prensa/documentos/documentos-2026/26-09-24-vi-edos-singulares-2026.pdf))
- July 2024: 14 new viñedos singulares (8 La Rioja, 6 Álava), total then 162 (source: [MAPA](https://www.mapa.gob.es/es/prensa/ultimas-noticias/detalle_noticias/el-ministerio-de-agricultura--pesca-y-alimentaci-n-reconoce-14-nuevos-vi-edos-singulares-en-la-denominaci-n-de-origen-calificada-rioja-/a14322b5-f6df-41f7-a25b-7844586d178e))
- 2017 reform: viñedo singular requires vines over 35 years, yields at least 20% below the DO, hand harvest, two "excellent" tastings; quality sparkling wine at least 15 months on lees, up to 36 for the top tier (source: [Agronews 2017](https://www.agronewscastillayleon.com/la-doc-rioja-amparara-vinedos-singulares-y-espumosos))
- Single document (31 Oct 2025): zones Rioja Alta (incl. El Ternero enclave in Burgos), Rioja Oriental (incl. Navarra municipalities), Rioja Alavesa; viñedo singular yields 5,000 kg/ha red, 6,922 kg/ha white; general max 6,500 red, 9,000 white; Espumoso de Calidad at least 15 months; Gran Añada hand-harvested; 16 varieties listed incl. Albillo Mayor (source: [DOP Rioja documento único](https://mapa.gob.es/gl/alimentacion/temas/calidad-diferenciada/documento_unico_doca_rioja_tcm37-655340.pdf))
- 2019 labelling terms: old vines 35 yrs, centenarian 100, pre-phylloxera before 1900, altitude 550 m, estate vineyard, estate-bottled, "madurado en bodega"; crianza for white and rosé cut to 18 months (source: [Directo al Paladar](https://www.directoalpaladar.com/enologia/rioja-estrena-siete-calificaciones-sus-vinos-todo-que-debes-saber-nuevo-etiquetado))
- EU approved the viñedos singulares GI (March 2026 article); "vino de municipio" renamed "vino de pueblo" in 2022 with 144 municipalities (source: [Select Us Wines](https://www.selectuswines.com/en/eu-gives-stamp-of-approval-to-riojas-vinedos-singulares/4561))
- Whites are about 10% of the vineyard after doubling in 20 years; 36+ million bottles of white sold in 2024; centenary 2024/25 (source: [Vinetur](https://www.vinetur.com/2025052287898/rioja-celebrates-100-years-as-a-wine-region-with-rising-global-acclaim-for-its-white-wines.html))
- TSJPV annulled the Basque government's 2021 approval of "Arabako Mahastiak / Viñedos de Álava" (published 8 Nov 2024), finding no distinct identity from Rioja Alavesa and a risk of confusion (source: [El Derecho](https://elderecho.com/anulada-resolucion-favorable-a-la-solicitud-de-la-dop-vinedos-de-alava); background (ABRA, about 40 wineries, dispute since 2016) (source: [Xataka](https://www.xataka.com/magnet/vino-rioja-ha-logrado-esquivar-su-cisma-ayuda-justicia-vasca-pregunta-le-ha-puesto-punto-final))
- Rioja pliego amendment approved 7 Oct 2026, published BOE 19 Oct 2026 (ageing-facility minimums, control methods) (source: [BOE-A-2026-21760](https://www.boe.es/boe/dias/2026/10/19/pdfs/BOE-A-2026-21760.pdf))
- Haro station-quarter coordinates (López de Heredia, CVNE, La Rioja Alta, Muga, Roda, Bilbaínas, Gómez Cruzado) and Riscal, Murrieta, Ysios, Artadi, Remelluri, Vivanco, San Millán come from OpenStreetMap via Nominatim (cache in `work/es/geocode.json`)

### Inferences
- A June 2025 nuevecuatrouno headline says the Tribunal Supremo gave "el portazo definitivo" to Viñedos de Álava, but the page could not be fetched. The JSON therefore cites only the November 2024 TSJPV annulment.
- Remírez de Ganuza, Contino, Finca Allende and El Pisón are not in OSM. Their coordinates are village or nearby-winery approximations, marked `approx`.

### Gaps
- Names of individual viñedos singulares could not be listed (the BOE annex was not fetched), so none are mapped as sites.
- I could not confirm the "Eiffel" attribution for CVNE's 1909 hall, so it is worded as "attributed to the Eiffel engineering firm". Artadi's exact current labelling is also unconfirmed.

## Duero valley and Castilla y León

### Takeaway
I covered Ribera del Duero (27,323 ha), Toro, Rueda, Cigales, Arlanza, Arribes, Tierra del Vino de Zamora and León, plus the VCs Valles de Benavente, Valtiendas, Sierra de Salamanca and Cebreros, and the pagos Abadía Retuerta (2022), Dehesa Peñalba (2022) and Urueña (2021). Golden Mile sites are mapped from OSM.

### Cited Findings
- Hectares and wineries per DO, 2023/24 (e.g. Ribera 27,323 ha / 249 wineries; Rueda 20,735 / 79; Toro 5,437 / 63) (source: [MAPA Informe DOPs](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))
- Ribera del Duero whites: at least 75% Albillo Mayor; draft rules in BOE 27 July 2019; about 500 ha of Albillo Mayor (source: [Ribera del Duero dossier](https://riberadelduero.es/sites/default/files/2020-09/dossier_de_prensa_la_ribera_blanca.pdf))
- Vega Sicilia founded 1864 by Eloy Lecanda; Álvarez family since 1982; Alión 1991; Pintia 1997; 1968 Único released in 1991 after 23 years (source: [Wikipedia, Vega Sicilia](https://en.wikipedia.org/wiki/Vega_Sicilia))
- Abadía Retuerta: EU-certified 31 May 2022 as Spain's 23rd pago; 700 ha estate, 180 ha vines, Sardón de Duero, monastery founded 1146, modern owners from 1988 (source: [Decanter](https://www.decanter.com/wine-news/abadia-retuerta-spains-newest-vino-de-pago-482850); varieties (source: [Wine, Wit and Wisdom](https://winewitandwisdomswe.com/?p=21513))
- Dehesa Peñalba approved 28 Feb 2022, reds only (source: [Wine, Wit and Wisdom](https://winewitandwisdomswe.com/2022/03/02/welcome-to-the-world-vino-de-pago-dehesa-penalba/); municipality Villabáñez from the EU PDO dataset (raw/eupdo))
- Urueña registered 4 Nov 2021, single producer Heredad de Urueña (source: [Wine, Wit and Wisdom](https://winewitandwisdomswe.com/?p=20564))

### Inferences
- Sandoz/Novartis ownership of Abadía Retuerta comes from expertise. Decanter did not name the owner.

### Gaps
- Mauro, Numanthia, Pintia, Teso La Monja and Belondrade are not in OSM, so they are at village coordinates (`approx`).
- Alejandro Fernández's current status (he left Grupo Pesquera after a family dispute) was not verified because the page was blocked. The JSON avoids saying anything about it.

## Northwest: Galicia, Bierzo, Asturias, Txakoli

### Takeaway
Rías Baixas has 4,640 ha and five subzones. Ribeira Sacra (1,310 ha) has five subzones and heroic terraces. Bierzo (2,276 ha) adopted a village, paraje and classified-vineyard system in 2019, with the first wines in June 2020. The three Txakoli DOs and VC Cangas are also covered.

### Cited Findings
- Bierzo classification approved by the Consejo in July 2017; tiers vino de villa / paraje / viña clasificada / gran viña clasificada with yields 20/25/30/35% below the regional limit; 100% traceability (source: [Spanish Wine Lover](https://spanishwinelover.com/bierzo-approves-a-burgundy-inspired-classification); ratified 2019, first village and paraje wines June 2020, 2,300.19 ha / 981 growers / 74 wineries end-2025, Mencía 70.5% of grapes, Godello 16.7% (source: [Wine with Seth](https://www.winewithseth.com/winewiki/bierzo-do/); 10 municipalities added in 2019 for a total of 32 (source: [Diario de León](https://www.diariodeleon.es/bierzo/191029/958066/do-bierzo-primera-zona-espana-clasificar-vino-unidades-geograficas-menores.html))
- Galician and Basque DO hectares and wineries (source: [MAPA Informe DOPs](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))

### Inferences
- The subzone lists, the history of the Godello and Albariño revivals, and the producer names come from expertise.

### Gaps
- Several Galician wineries (Fefiñanes, Do Ferreiro, Terras Gauda, Viña Meín) are not in OSM, so they use village or neighbourhood coordinates (`approx`).
- The EU dataset's Valdeorras polygon is wrong (see the last section). As a result, check_sites_geo flags the Valdeorras sites even though their coordinates are correct.

## Northeast: Navarra, Aragón, Catalonia, Priorat, Cava, Penedès

### Takeaway
Priorat's *Els noms de la terra* pyramid has 12 vi de vila zones and 459 paratges. Its Gran Vinya Classificada list in January 2024 was L'Ermita, Mas de la Rosa and Tossal d'en Bou. Cava's top tier, Paraje Calificado, had 15 wines from 8 producers in March 2026. Navarra has 4 pagos and Aragón 2 (Aylés, Urbezo).

### Cited Findings
- Priorat: vi de vila since the 2007 vintage, paratge and classified vineyards since 2017; requirements table (Gran Vinya Classificada 80% of vines at least 35 yrs, 3,000 kg/ha red, at least 90% Garnatxa/Samsó); Vinyes Velles for vines 75+ years or pre-1945 (source: [Spanish Wine Lover](https://spanishwinelover.com/a-guide-to-priorat-s-new-vineyard-classification); [DOQ Priorat leaflet](https://www.doqpriorat.org/wp-content/uploads/2019/05/190503-Fulletó-Els-Noms-de-la-terra-ENG_compressed.pdf))
- Priorat: 12 zones listed; 17,629 ha zone; llicorella about 90% of subsoil; Scala Dei 1194; Gang of Five; GVC list Jan 2024 (source: [Wine with Seth](https://www.winewithseth.com/winewiki/priorat-doq/))
- The 15 Cavas de Paraje Calificado with producers, parajes and ageing (Alta Alella Vallcirera x2; Carles Andreu Celdoni; Codorníu La Fideuera, La Pleta, El Tros Nou; Ferrer Wines Can Sala x2; Juvé & Camps La Capella; Pere Ventura Can Bas; Sumarroca Cols, Peretes, Rosendo; Vins El Cep Can Prats x2); five new ones presented 18 March 2026 (source: [cava.wine](https://www.cava.wine/en/news-articles/guarda-superior-paraje-calificado-cava-is-the-most-precise-expression-of-its-origin/); requirements (single estate, vines over 10 yrs, 8,000 kg/ha, hand harvest, estate vinification, vintage, 36 months, organic from 2025 harvest) (source: [Vertdevin](https://vertdevin.com/en/cava-five-new-paraje-calificado-wines-reach-the-pinnacle-of-quality/))
- Urbezo: EU registration 25 Oct 2024, Cariñena, Sierra de Algairén foothills at about 490 m, just over 230 ha, the 104th Spanish DOP and 26th pago (source: [MAPA](https://www.mapa.gob.es/es/prensa/ultimas-noticias/detalle_noticias/la-uni-n-europea-registra-la-nueva-denominaci-n-de-origen-protegida-de-vino-de-pago--urbezo--/fea9b19d-2912-44ad-800a-532512ce6e33))
- Navarra pagos' municipalities and grapes (Arínzano: Aberin; Otazu: Cizur/Etxauri; Prado de Irache: Ayegui): EU PDO dataset (Candiago et al. 2022, raw/eupdo)

### Inferences
- I wrote from expertise the Cava 2020 zonification (Comtats de Barcelona and subzones, Valle del Ebro, Viñedos de Almendralejo, Levante) and the Guarda (9 months) and Guarda Superior (Reserva 18, Gran Reserva 30, Paraje 36) tiers. The cava.wine page did not list them.
- Bolandin details (location and producer) are unverified. Its JSON entry gives only the hectares from MAPA and generic text.

### Gaps
- Clàssic Penedès's creation year and exact rules could not be fetched (the Gourmet Hunters page failed), so the JSON hedges with "early 2010s" and "at least 15 months".
- The year Corpinnat members left Cava (2019) and the founding year (2018) come from expertise.

## Centre and Levante; the Vinos de Pago list

### Takeaway
I covered Castilla-La Mancha (9 DOs including Campo de Calatrava, registered February 2024, and 14 pagos), Vinos de Madrid (with Gredos Garnacha), Valencia, Utiel-Requena and Alicante (Fondillón, and 5 Valencian pagos including Tharsys, October 2025), Murcia's Monastrell DOs, and Ribera del Guadiana. The full list of 28 pagos is in the JSON.

### Cited Findings
- Pagos by community: Aragón (Aylés, Urbezo); Castilla y León (Abadía Retuerta, Dehesa Peñalba, Urueña); Castilla-La Mancha (Calzadilla, Campo de La Guardia, Casa del Blanco, Dehesa del Carrizal, Dominio de Valdepusa, El Vicario, Finca Élez, Guijoso, La Jaraba, Los Cerrillos, Pago Florentino, Río Negro, Rosalejo, Vallegarcía); Navarra (Bolandin, Pago de Arínzano, Pago de Otazu, Prado de Irache); Valencia (Chozas Carrascal, El Terrerazo, Los Balagueses, Tharsys, Vera de Estenas) (source: [MAPA list July 2026](https://www.mapa.gob.es/es/dam/jcr%3Af9643333-ef75-4a2f-8864-afd1ade63fd1/02_vinos.pdf))
- Río Negro: EU 20 March 2025; Cogolludo, San Andrés, Membrillera (Guadalajara); about 470 ha; Tinto Fragoso; 100% Gewürztraminer white; 105th Spanish DOP (source: [MAPA](https://www.mapa.gob.es/es/prensa/ultimas-noticias/detalle_noticias/la-union-europea-registra-la-nueva-denominacion-de-origen-protegida-de-vino-de-pago-rio-negro/b133dff2-de57-4c25-a6fa-a20677a2f2f2))
- Campo de Calatrava: EU 21 Feb 2024; 16 municipalities in Ciudad Real; volcanic; varieties and styles; 102nd Spanish DOP (source: [MAPA](https://www.mapa.gob.es/es/prensa/ultimas-noticias/detalle_noticias/la-union-europea-registra-la-nueva-denominacion-de-origen-protegida-de-vinos--campo-de-calatrava-/13ae5563-dace-4430-b68b-f8d5fa79b2da))
- Rosalejo registered March 2024 with no activity in 2023/24 (1,338.70 ha listed) (source: [MAPA Informe DOPs](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))
- Union de Vinos de Pago members include Martúe, Pago del Vicario, Vegalfaro, Vera de Estenas, La Jaraba and Casa del Blanco (source: [uniondevinosdepago.es](https://www.uniondevinosdepago.es/))
- Municipalities, EU registration dates and authorised grapes for each pago: EU PDO dataset (raw/eupdo/PDO_EU_id.csv)

### Inferences
- Owners of some Castilla-La Mancha pagos (Sánchez Muliterno at Guijoso, Manuel Manzaneque at Finca Élez, Arzuaga at Pago Florentino, Montalvo Wilmot at Los Cerrillos) come from expertise or press snippets. Los Cerrillos is confirmed by the FENAVIN note.

### Gaps
- Rosalejo's varieties, producer and location are unknown. Bolandin's location is unconfirmed.
- Tharsys's hectares are not stated in any source consulted.

## Andalusia (Sherry and the rest)

### Takeaway
Sherry got the deepest treatment: albariza, levante and poniente, flor, solera and criaderas, every style, VOS and VORS, en rama, and the 2021 reform. The reform allowed ageing anywhere in the zone (in force October 2022), 85% pago labelling with about 120 delimited pagos, historic grape varieties, Fino Viejo and Manzanilla Pasada (7+ years), and unfortified wines (15% natural, 2 years' ageing). 10 pagos and 22 bodegas or historic sites are mapped.

### Cited Findings
- 2022: 7,027.02 ha registered, 1,469 growers, 84 ageing bodegas. The expanded ageing zone took effect October 2022 (Orden 4 Oct 2022); unfortified wines were pending EU approval. Production zone: Chiclana, Chipiona, El Puerto, Jerez, Lebrija, Puerto Real, Rota, San José del Valle, Sanlúcar, Trebujena (source: [Consejo Memoria 2022](https://www.sherry.wine/documents/350/Memoria_2022_D7LOF8G.pdf))
- 2021 reform contents (unfortified at 15% and 2 years; ageing in Trebujena, Lebrija, Chipiona, Rota, Chiclana and Puerto Real; about 120 pagos with an 85% rule; seven historic varieties; Manzanilla Pasada and Fino Viejo over 7 years) (source: [Wine & Spirits](https://www.wineandspiritsmagazine.com/?p=37709))
- Single document: generosos (fino, amontillado, oloroso, palo cortado, under 4 g/L), dulces naturales (at least 160 g/L), generosos de licor; minimum 15% acquired alcohol; 2-year average age; butts of no more than 1,000 L; 70 L per 100 kg; 11,428 kg/ha; pagos recognised as smaller geographic units (source: [Junta de Andalucía DU](https://www.juntadeandalucia.es/sites/default/files/inline-files/2023/11/DU_modif_JXS_UE_1.pdf))
- Manzanilla amendment request: unfortified "vino" category; Palomino only; 15% minimum; at least 2 years under flor in Sanlúcar (source: [Junta de Andalucía](https://cdn.juntadeandalucia.es/sites/default/files/inline-files/2024/11/Solicitud_modif_UE_MSB_3.pdf))
- August 2026 update: minimum strength of Fino and Pale Cream lowered from 15% to 14%; a "Jerez Superior" category for top vineyards is planned (source: [SherryNotes](https://sherrynotes.com/?p=10546))
- VOS over 20 years, VORS over 30; en rama definition; style alcohol ranges (source: [Wikipedia, Sherry](https://en.wikipedia.org/wiki/Sherry))
- Jerez 2023/24: 3,438 ha (MAPA figure), 87 wineries, 179,816 hl; Manzanilla 25 wineries, 59,443 hl (source: [MAPA Informe DOPs](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))

### Inferences
- MAPA's 3,438 ha for Jerez and Manzanilla conflicts with the Consejo's 7,027 ha (2022). The MAPA figure may count only the Jerez Superior albariza zone or classified area. The JSON uses the Consejo's figure (7,027).
- The 12- and 15-year age statements, the levante and poniente winds, and bodega founding dates (González Byass 1835, Barbadillo 1821, Delgado Zuleta 1744, Hidalgo 1792, Osborne 1772, Sandeman 1790, Williams & Humbert 1877, Harveys 1796) come from expertise.

### Gaps
- Coordinates for the pagos (Macharnudo, Carrascal, Balbaína, Añina, Los Tercios, Miraflores, Maína, Martín Miguel, Pastrana, Callejuela) are OSM hamlet or ridge points, not delimited polygons, so they are all `approx`.
- Valdespino, Emilio Hidalgo, Equipo Navazos and Cota 45 could not be geocoded. Valdespino is mentioned in appellation text but not mapped as a site.
- The EU status of the unfortified Manzanilla category is unconfirmed.

## Islands: Canaries and Balearics

### Takeaway
All 11 Canary designations are covered, plus Binissalem and Pla i Llevant. Lanzarote's La Geria hoyos, Orotava's cordón trenzado, Abona's high vineyards and Canary sack history are included.

### Cited Findings
- 2023/24 hectares and wineries for every Canary and Balearic DO (e.g. Lanzarote 1,894.67 ha / 41; Tacoronte-Acentejo 694.88 / 31; Islas Canarias 502.86 / 50) (source: [MAPA Informe DOPs](https://www.mapa.gob.es/es/dam/jcr:2a49b727-24c9-4d11-aec6-3a6f44dc3b9e/Informe%20DOPs%202023_2024.pdf))
- Islas Canarias is listed as VC (traditional term) in MAPA's July 2026 list (source: [MAPA list](https://www.mapa.gob.es/es/dam/jcr%3Af9643333-ef75-4a2f-8864-afd1ade63fd1/02_vinos.pdf))

### Inferences
- The island history (sack trade, Garachico 1706, Timanfaya 1730 to 1736, freedom from phylloxera), the vine-training systems and the producer names come from expertise. The Wikipedia "Canary Islands wine" URLs returned not-found.
- DO creation years other than Tacoronte (1992) and Islas Canarias (2011) are given as "1990s" or "2000s".

### Gaps
- No primary source was fetched for Canary DO creation dates or for Shakespeare's "canary" references.

## Coverage, validation and notes for the integration and geo agents

### Takeaway
es.json matches every Spanish name in the EU PDO dataset (99) and every name in MAPA's July 2026 list (106). It passes json.tool, the banned-word and dash checks, ID format checks, and cross-references between regions, appellations and sites.

### Cited Findings
- EU PDO dataset (Candiago et al. 2022, `raw/eupdo`) lists 99 Spanish PDOs. Seven current DOPs are missing from it: Abadía Retuerta, Bolandin, Campo de Calatrava, Urbezo, Río Negro, Rosalejo and Tharsys. These need another boundary source or `approx` points (source: [MAPA list](https://www.mapa.gob.es/es/dam/jcr%3Af9643333-ef75-4a2f-8864-afd1ade63fd1/02_vinos.pdf))

### Inferences
- **Data error for the geo agent:** in `PDO_EU_id.csv`, Valdeorras (PDO-ES-A1132) lists 104 municipalities, 100 of them Alicante's. Its polygon sits in Alicante (centroid 38.33, -1.01, identical to Alicante's). The real Valdeorras is in eastern Ourense (O Barco, A Rúa, O Bolo, Larouco, Vilamartín de Valdeorras, Petín, Rubiá, Carballeda de Valdeorras and neighbours, about 42.4 N, -7.0 W). Its polygon must be rebuilt from Ourense municipalities.
- Several EU polygons are identical commune unions: Jerez = Manzanilla, Málaga = Sierras de Málaga, Dehesa del Carrizal = Vallegarcía (Retuerta del Bullaque), Guijoso = Finca Élez (El Bonillo), Los Balagueses = Chozas Carrascal (Requena), and El Terrerazo = Vera de Estenas (Utiel). The pago polygons are whole-municipality proxies, far larger than the real estates.
- Site QA: all 173 sites were checked against the EU polygon of their appellation. Only three fall outside: the two Valdeorras sites (because of the error above) and San Millán (0.8 km outside the Rioja commune union). 44 sites are marked `approx`.

### Gaps
- Not mapped as sites: individual Rioja viñedos singulares, Priorat paratges other than the three Gran Vinya Classificada, and Bierzo parajes. No public coordinate list was available within budget.
