# North America: United States, Canada and Mexico (Vitis Mundi content agent c10)

Deliverable: `/home/claude/winesite/data/content/c10_north_america.json` (3 countries, 38 regions, 337 appellations, 132 sites; validated with `python3 -m json.tool` and `scripts/na/merge_na.py`, 0 problems). Build scripts: `/home/claude/winesite/scripts/na/` (`na_lib.py` helpers, `parts/p01..p13_*.py` per-region part builders, `parts/zz_enrich.py` second-pass paragraphs, `merge_na.py` merge + validation). Part JSON in `work/na/parts/`. Geocoding caches in `work/na/geocode_cache*.json`. Federal Register rule texts (138 TTB AVA rules 1994 to 2026) in `raw/fedreg_na/text/`.

## Question 1: Which AVAs exist as of October 2026, and how do they join to the map?

### Takeaway
There are 280 current AVAs in 34 states. The UC Davis boundary set (raw snapshot) has 276 polygons, and four AVAs established after the snapshot have no polygon: Tryon Foothills (NC, effective Oct 2025), Nashoba Valley (MA, Apr 2026), Nine Lakes of East Tennessee (TN, Apr 2026) and Columbia Hills (WA, Sept 2026). All 280 have content entries with the exact TTB name in `match`. The four new ones carry `lat`/`lon` and `point_only: true` so the front end can show them as points.

### Cited Findings
- 276 current AVA features in the UC Davis AVA repo snapshot (none with valid_end/removed) — [UC Davis Library AVA Digitizing Project](https://github.com/UCDavisLibrary/ava)
- Final rules establishing Tryon Foothills (2025-09-29, about 176 sq mi, Polk County NC), Nashoba Valley (2026-03-24, about 18,367 acres, Worcester County MA), Nine Lakes of East Tennessee (2026-03-24, about 4,064 sq mi) and Columbia Hills (2026-08-17, 29,387 acres, Klickitat County WA, within Columbia Valley) — [Federal Register API, TTB rules](https://www.federalregister.gov/documents/2026/08/17/2026-16701/establishment-of-the-columbia-hills-viticultural-area); [Nashoba Valley](https://www.federalregister.gov/documents/2026/03/24/2026-05730/establishment-of-the-nashoba-valley-viticultural-area); [Nine Lakes](https://www.federalregister.gov/documents/2026/03/24/2026-05731/establishment-of-the-nine-lakes-of-east-tennessee-viticultural-area); [Tryon Foothills](https://www.federalregister.gov/documents/2025/09/29/2025-18879/establishment-of-the-tryon-foothills-viticultural-area)
- "280 AVAs across 34 states, with over half (154) in California"; Ulupalakua (about 70 acres) is the smallest — [Wikipedia: American Viticultural Area](https://en.wikipedia.org/wiki/American_Viticultural_Area) (matches my count: 276 + 4)
- Washington Wine calls Columbia Hills "Washington's 22nd AVA" — [Washington State Wine Commission](https://www.washingtonwine.org/)
- Proposed (not established) as of Oct 2026: Rancho Guejito (2024) and Rancho Santa Fe (Aug 2026) in San Diego County; Conneaut Creek (OH, 2024); Champlain Valley of Vermont (Mar 2026); Kaw Valley (KS, Aug 2026); Mill Creek-Walla Walla Valley (WA, Aug 2026); Llano Uplift and Hickory Sands District (TX, Aug 2026); renaming of Mendocino Ridge to "Mendocino Coast Ridge" (proposed Jan 2024) — [Federal Register proposed rules](https://www.federalregister.gov/documents/2026/08/14/2026-16670/proposed-establishment-of-the-llano-uplift-and-hickory-sands-district-viticultural-areas); [Kaw Valley](https://www.federalregister.gov/documents/2026/08/14/2026-16668/proposed-establishment-of-the-kaw-valley-viticultural-area); [Mendocino Ridge renaming](https://www.federalregister.gov/documents/2024/01/05/2024-00057/proposed-renaming-of-the-mendocino-ridge-viticultural-area)
- Beverly, Washington (2024) was proposed as "Wanapum Village" and renamed after Wanapum tribal members objected — [Federal Register 2024-25076](https://www.federalregister.gov/documents/2024/10/29/2024-25076/establishment-of-the-beverly-washington-viticultural-area)
- Areas and vineyard counts for many newer AVAs come from the petition summaries in TTB final rules (e.g. Contra Costa 167,146 acres, 60 vineyards on 1,700 acres; Petaluma Gap 202,476 acres, 80 vineyards on 4,000 acres; Royal Slope 156,389 acres, 14,100 acres of vines) — [Federal Register, Contra Costa](https://www.federalregister.gov/documents/2024/03/15/2024-05476/establishment-of-the-contra-costa-viticultural-area-and-modification-of-the-san-francisco-bay-and); [govinfo full texts](https://www.govinfo.gov/)

### Inferences
- Name joins: UC Davis spells two names differently from TTB. I used TTB forms as `name` ("Beverly, Washington", "Virginia's Eastern Shore" with a straight apostrophe) and included the UC Davis forms ("Beverly Washington", "Virginia’s Eastern Shore") in `match`. UC Davis has a trailing space in "Crystal Springs of Napa Valley "; the geo script strips it.
- Creation years: I used the year of the first Treasury Decision in `cfr_revision_history`, not the UC Davis `created` field, which is sometimes the effective date or a later amendment (e.g. High Valley shows 2023 in `created` but was established in 2005; Coombsville shows 2002 but was established in 2011).
- Largest AVA by area is Ozark Mountain (about 33.4 million acres computed from the TTB polygon), then Upper Mississippi River Valley (about 19.1 million), Ohio River Valley (16.1 million), Columbia Valley (11.6 million). Wikipedia calls Upper Mississippi the largest; the polygon areas say Ozark Mountain. I wrote "by area the largest" for Ozark Mountain and "second-largest" for Upper Mississippi.

### Gaps
- No boundary polygons for the four 2025 to 2026 AVAs. They are content points only; the geodata agent should add them if TTB shapefiles become available.
- The Federal Register website returns an access wall for full text. Govinfo.gov (GPO) served the same documents.

## Question 2: USA country story and statistics

### Takeaway
The US is the world's 4th-largest producer (20.0 mhl in 2025) and largest consumer (31.9 mhl). Vineyard area is 415 kha, the 5th largest and in decline for 7 straight years because of uprooting in California. The California crush in 2025 was 2.76 million tons, down 6.2 percent.

### Cited Findings
- USA vineyard 415 kha in 2025 (-0.9%), 7th consecutive year of decline driven by California uprooting; production 20.0 mhl (-5.3%, -16.2% vs 5-yr average), 4th largest; consumption 31.9 mhl (-4.3%), world's largest market; exports 2.0 mhl (-17.9%), with exports to Canada down 66.9% — [OIV, State of the World Wine Sector in 2025 (May 2026)](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- California 2025 preliminary crush 2,759,202 tons (-6.2%), average price $978.60/ton; red wine grapes $1,280.63 — [CDFA Planting Seeds blog](https://plantingseedsblog.cdfa.ca.gov/wordpress/index.php/2026/03/13/preliminary-grape-crush-report-declines-in-crush-numbers-prices-tell-the-story-of-the-2025-crop)
- Augusta, Missouri was the first AVA (20 June 1980); AVA wines need 85% of grapes from the AVA, state and county 75%, California 100%, Washington 95% — [Wikipedia: American Viticultural Area](https://en.wikipedia.org/wiki/American_Viticultural_Area); Augusta's 45 FR 41633 citation is in the UC Davis data
- Mission grape = Listán Prieto; first California planting traditionally credited to Mission San Diego (1769), with San Juan Capistrano and San Gabriel as alternatives — [Wikipedia: Mission grape](https://en.wikipedia.org/wiki/Mission_grape)
- Haraszthy bought Buena Vista in 1856 and began stone cellars in 1857; in 1861 he returned with 100,000+ cuttings of 350+ varieties; the claim that he introduced Zinfandel is disputed (Sullivan calls it a myth) — [Wikipedia: Agoston Haraszthy](https://en.wikipedia.org/wiki/Agoston_Haraszthy)
- Hermann Jaeger (Neosho, MO) with George Husmann shipped about 17 boxcars of resistant rootstock to France; Chevalier of the Légion d'honneur in 1893 (not 1888); disappeared in 1895 — [Wikipedia: Hermann Jaeger](https://en.wikipedia.org/wiki/Hermann_Jaeger)
- T.V. Munson (Denison, TX), Chevalier du Mérite Agricole 1888, second American after Edison; Cognac is Denison's sister city; Munson Memorial Vineyard established 1974 at Grayson College — [Wikipedia: Thomas Volney Munson](https://en.wikipedia.org/wiki/Thomas_Volney_Munson)
- Judgment of Paris on 24 May 1976: Stag's Leap Wine Cellars 1973 Cabernet and Chateau Montelena 1973 Chardonnay won. In the 2006 rematch Ridge Monte Bello 1971 was 1st and Stag's Leap 1973 2nd — [Wikipedia: Judgment of Paris](https://en.wikipedia.org/wiki/Judgment_of_Paris_(wine))
- Stag's Leap Wine Cellars: Winiarski bought land in 1970 next to Nathan Fay's vineyard; FAY bought 1986; sold in 2007 to Ste. Michelle and Antinori; Antinori sole owner since May 2023 — [Wikipedia: Stag's Leap Wine Cellars](https://en.wikipedia.org/wiki/Stag%27s_Leap_Wine_Cellars)
- Chateau Montelena: Tubbs 1882; Barrett and Grgich 1972 — [Wikipedia: Chateau Montelena](https://en.wikipedia.org/wiki/Chateau_Montelena)
- Konstantin Frank: arrived 1951, at Geneva 1953, bought Keuka land 1958, first vintage 1962, died 1985 — [Wikipedia: Konstantin Frank](https://en.wikipedia.org/wiki/Konstantin_Frank)
- Brotherhood: founded by Jean Jacques (1816 per Wikipedia), first commercial vintage 1839, survived Prohibition on sacramental wine, "commonly acknowledged" as the oldest operating US winery — [Wikipedia: Brotherhood Winery](https://en.wikipedia.org/wiki/Brotherhood_Winery)
- Ohio led US wine production by 1860; Longworth planted Catawba in 1825; Golden Eagle on Middle Bass was "America's largest winery" in 1872 — [Wikipedia: Ohio wine](https://en.wikipedia.org/wiki/Ohio_wine); [Wikipedia: Catawba (grape)](https://en.wikipedia.org/wiki/Catawba_(grape))
- Scuppernong Mother Vine at Manteo, "400-year-old"; Verrazzano 1524; Amadas and Barlowe 1584 — [Wikipedia: Scuppernong](https://en.wikipedia.org/wiki/Scuppernong)
- Oregon: 1,116 wineries and 44,487 acres (2022), Pinot Noir 24,729 acres; HillCrest 1961; Eyrie founded 1966 (vines planted 1965 to 1966); Domaine Drouhin 1988 (bought 1987); 90% varietal rule — [Wikipedia: Oregon wine](https://en.wikipedia.org/wiki/Oregon_wine); [Wikipedia: Eyrie Vineyards](https://en.wikipedia.org/wiki/Eyrie_Vineyards)
- Washington: 17 hours of summer daylight at 46°N; sandy soils hostile to phylloxera, many own-rooted vines; about 8 inches of rain — [Wikipedia: Washington wine](https://en.wikipedia.org/wiki/Washington_wine)
- New York: Farm Winery Act of 1976 (19 wineries in 1976, 63 by 1985); Long Island's first vineyard 1973; Huguenots in Ulster County 1667; Croton Point 1827 — [Wikipedia: New York wine](https://en.wikipedia.org/wiki/New_York_wine)
- Texas: about 85% of grapes on the High Plains; Val Verde (1883) is the oldest continuously operating bonded winery in Texas; Mission vines planted in the 1650s near El Paso — [Wikipedia: Texas wine](https://en.wikipedia.org/wiki/Texas_wine)

### Inferences
- Where sources differ I used: 1962 for Frank's first vinifera vintage (land bought 1958), 1961 for HillCrest, 1965 to 1966 for Eyrie's first planting (winery founded 1966), and 1987 to 1988 for Domaine Drouhin Oregon (land bought 1987, winery 1988).
- Texas High Plains share: Wikipedia says 85%. I wrote "the large majority" in the AVA entry and "about 80 to 85 percent" in the Texas region text.

### Gaps
- Wine Institute, Napa Vintners, Oregon Wine Board and Washington Wine pages were blocked by Cloudflare or errors. Current state acreage and winery counts for California, Napa, Washington and New York come from Wikipedia, mostly from older years (2017 to 2022), and I phrased them approximately. The Napa "45,000 acres, about 4% of California's grapes" figure is from my own knowledge and is the widely cited Napa Valley Vintners number, but I could not fetch it this session.
- I found no reliable source for the exact date of the Senecú (New Mexico) planting beyond "around 1629". It is widely repeated but rests on Franciscan accounts.

## Question 3: Canada

### Takeaway
Canada's appellations are provincial. Ontario VQA has 3 primary appellations, 2 regional and 11 sub-appellations (including South Islands, 2015). BC has 9 GIs plus 12 sub-GIs. Quebec has 3 IGPs. Nova Scotia has Tidal Bay. Canada is the world's largest icewine producer. The Okanagan lost its 2024 crop to freezes and has replanted almost all of the damage.

### Cited Findings
- Ontario: 3 primary appellations; 10 Niagara sub-appellations plus 2 regional appellations; Niagara Peninsula has 13,600 acres, 105 wineries and about 1,590 GDD (2024 to 2025); frost-free days and GDD for each sub-appellation — [VQA Ontario / OWAA booklet](https://vqaontario.ca/wp-content/uploads/2026/08/OWAA-MAPS_BOOKLET-NP-2024-EN11.pdf)
- South Islands sub-appellation declared July 2015 (nine islands of the Township of Pelee); Vin Villa 1866 was Canada's first commercial winery — [VQA Ontario: South Islands](https://vqaontario.ca/ontario-appellations/lake-erie-north-shore/south-islands/)
- Inniskillin: licence 1975 (first since 1929); Brae Burn estate 1978; 1989 Vidal Icewine won the Grand Prix d'Honneur at Vinexpo 1991 — [Wikipedia: Inniskillin](https://en.wikipedia.org/wiki/Inniskillin)
- Icewine: grapes picked at -8°C or colder, minimum 35°Brix; Canada makes more icewine than all other countries combined; Ontario about 90%; EU allowed imports in 2001 — [Wikipedia: Ice wine](https://en.wikipedia.org/wiki/Ice_wine)
- BC: 9 GIs plus the British Columbia GI; Okanagan sub-GIs are East Kelowna Slopes, Golden Mile Bench, Golden Mile Slopes, Lake Country, Okanagan Falls, Naramata Bench, Skaha Bench, South Kelowna Slopes, Summerland Bench, Summerland Lakefront, Summerland Valleys; Cowichan Valley is the 12th sub-GI — [BC VQA](https://bcvqa.ca/?p=681); [BC Gov release, 28 June 2022](https://news.gov.bc.ca/releases/2022AF0045-001014)
- Golden Mile Bench 2015 was the first sub-GI; Naramata Bench and Skaha Bench in 2019 — [The Drinks Business](https://www.thedrinksbusiness.com/2019/05/up-and-coming-okanagan-valley-gains-two-new-sub-gis/)
- BC 2026 insured wine-grape area is 8,686 acres. Top varieties are Pinot Noir 1,217, Merlot 1,175, Chardonnay 1,084, Cabernet Franc 1,033, Pinot Gris 832 and Cabernet Sauvignon 668 acres. About 1,970 acres were removed in 2025 and 1,870 replanted in 2026. The Okanagan has 91% of the area and 95% of output; the 2024 freeze caused near-total crop loss — [BC Ministry of Agriculture, 2025 Grape Acreage and Production Report (July 2026)](https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/agriculture-and-seafood/animal-and-crops/crop-production/2025-grape-acreage-and-production-report.pdf)
- Quebec has three reserved designations: Vin du Québec, Vin de glace du Québec and Cidre de glace du Québec — [CARTV](https://cartv.gouv.qc.ca/appellations-reservees/)
- Nova Scotia: de Razilly's 1634 note on "Bordeaux vines"; Grand Pré Winery 1979; Tidal Bay created 2011, first vintage 2012, at least 51% from L'Acadie Blanc, Seyval, Vidal and Geisenheim 318, blind-tasting approval — [Wikipedia: Nova Scotia wine](https://en.wikipedia.org/wiki/Nova_Scotia_wine)
- Canada 2015: 548 wineries, 12,150 ha, 56.2 million L (62% Ontario, 33% BC) — [Wikipedia: Canadian wine](https://en.wikipedia.org/wiki/Canadian_wine)
- Canadian consumption was 2.8 mhl in 2025, and Canadian provinces pulled US wine in 2025 — [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)

### Inferences
- I gave the Canadian `stats` from 2015 national totals and noted 2024 to 2026 provincial updates in `stats.note`. OIV gives no national Canadian production figure.
- Canadian appellations have no polygons in the geodata. I gave every Canadian appellation a `lat`/`lon` representative point.

### Gaps
- I could not fetch Johann Schiller's biography (Wikipedia page not found). The 1811 Cooksville story is the standard account, and I phrased it as "is said to".
- I found no recognition dates for the Okanagan Falls, Golden Mile Slopes and Cowichan Valley sub-GIs, so their `created` fields are omitted.
- I could not verify the years the three Quebec IGPs were recognised, so their `created` fields are omitted in the JSON.
- Ice cider's invention around 1989 by Christian Barthomeuf, Domaine des Côtes d'Ardoise in 1980 and L'Orpailleur in 1982 are from my own knowledge, not fetched this session.

## Question 4: Mexico

### Takeaway
Mexico grew 83,178 t of wine grapes in 2025 (Baja California 30,934 t, Zacatecas 26,024 t, Aguascalientes 6,715 t). It has about 400 wineries, and Baja California makes about 70% of the wine (ICEX). IMPI granted the first wine IGP to Querétaro in 2025, and Baja California started its own IGP process in December 2025.

### Cited Findings
- Cortés's decree of 20 March 1524 required encomenderos to plant vines (1,000 per 100 Indigenous workers). Philip II banned new plantings in 1595. Santo Tomás winery was founded in 1888 and Molokans arrived in 1904. Angelo Cetto founded his Tijuana winery in 1928, and L.A. Cetto followed in Valle de Guadalupe in 1975. Monte Xanic dates from 1987. Hidalgo's vines in Dolores were ordered destroyed — [Wikipedia (es): Vino de México](https://es.wikipedia.org/wiki/Vino_de_M%C3%A9xico)
- Casa Madero founded 1597 by Lorenzo García as Hacienda San Lorenzo; 1699 ban by Charles II except for Church wine — [Wikipedia: Mexican wine](https://en.wikipedia.org/wiki/Mexican_wine)
- Valle de Guadalupe: mission founded 1834; Molokans 1905 to 1911 (about 104 families); Domecq began the modern industry in 1972; 6 wineries in 1999 and 150 in 2023; aquifer depletion — [Wikipedia: Valle de Guadalupe](https://en.wikipedia.org/wiki/Valle_de_Guadalupe)
- 39,956 ha of vineyard; 195,000 hl of wine; about 400 wineries; Baja California 70%; Mexican wine 34% of the domestic market; 1.3 L per capita — [ICEX 2024](https://www.icex.es/content/dam/icex/centros/mexico/documentos/2024/estudio-mercado-vino-mexico-2024-resumen.pdf)
- 2025 wine-grape output was 83,178 t from 12 states, with Baja California, Zacatecas and Aguascalientes making 76.5% — [La Crónica, Oct 2026](https://www.cronica.com.mx/nacional/2026/10/07/produccion-de-uva-para-vino-crece-385-entre-2023-y-2025/)
- Querétaro has Mexico's first wine IGP (IMPI), launched 11 April 2025, with 40+ wine projects — [La Razón](https://www.razon.com.mx/estados/2025/04/11/mauricio-kuri-encabeza-lanzamiento-de-primera-indicacion-geografica-protegida-para-vinos-queretanos/); [Federvini](https://www.federvini.it/en/news-en/mexico,-pgi)
- Baja California's Comité Provino started the IGP process with COLEF and IMPI in December 2025 — [El Imparcial](https://www.elimparcial.com/tij/ensenada/2025/12/17/vinos-bajacalifornianos-contaran-con-indicacion-geografica-protegida/)

### Inferences
- Sources conflict on the Molokans' arrival (1904 in es-Wikipedia, 1905 in en-Wikipedia) and on Baja's share (70% in ICEX, 80 to 90% elsewhere). I used 1905 and "about 70 percent (some sources say up to 80 or 90)".
- Mexico has no appellation polygons. Its "appellations" are informal valleys and states, plus the Querétaro IGP (cat "IG"), all with representative points.

### Gaps
- I could not fetch Consejo Mexicano Vitivinícola figures (blocked). The 39,956 ha vineyard figure includes table and brandy grapes.
- I could not confirm the date the Querétaro IGP was published in the Diario Oficial or which municipalities it covers.
- I could not verify the exact location of Casa Madero's winery buildings. The site point uses the San Lorenzo village centroid north of Parras and is marked approx.

## Question 5: Sites and coordinates

### Takeaway
There are 132 sites (97 US, 23 Canada, 12 Mexico): 72 precise and 60 approx. Every US site was tested point-in-polygon against its stated AVA using the UC Davis boundaries and lies inside it. Every Canadian and Mexican site, and every point-only appellation, was tested against Natural Earth admin-1 boundaries and lies in the correct province or state.

### Cited Findings
- Coordinates come from OpenStreetMap Nominatim lookups (by winery name, street address and bounded viewbox searches) cached in `work/na/geocode_cache*.json` — [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/)
- Stag's Leap Wine Cellars coordinates 38.3993, -122.3255 from Wikipedia — [Wikipedia](https://en.wikipedia.org/wiki/Stag%27s_Leap_Wine_Cellars)

### Inferences
- Vineyard-only sites (To Kalon, Martha's Vineyard, Ciel du Cheval, Champoux, Red Willow, Bien Nacido, Sanford & Benedict, Pisoni, Monte Rosso, Rochioli, Bechthold, Cayuse) are placed approximately on the known vineyard area and marked approx. Several were snapped inside their AVA polygon.
- Point placements chosen inside the official boundaries: Columbia Hills at 45.705, -120.80 (north bank, inside Columbia Valley); Nashoba Valley at 42.42, -71.60; Tryon Foothills at 35.24, -82.20; Nine Lakes of East Tennessee at 36.05, -83.95.

### Gaps
- Screaming Eagle, Dominus, Harlan, Diamond Creek, Kistler, Hirsch and Calera Mt. Harlan coordinates are approximate (marked approx). Nominatim had no matching features, and Wikipedia's API was rate-limited.
- The Senecú site point is a rough location on the Rio Grande south of Socorro. The pueblo site lies outside the Middle Rio Grande Valley AVA polygon, so it is labelled "New Mexico (no AVA)".

## Coverage summary
- Countries: us (major, 15 history entries, 575-word overview), ca (emerging, 11 history entries), mx (emerging, 11 history entries).
- Regions (38): California, Napa Valley, Sonoma County, Mendocino County, Lake County, Central Coast, Santa Barbara County, Paso Robles, Lodi, Sierra Foothills, Southern California, Central Valley, Oregon, Willamette Valley, Southern Oregon, Washington, Columbia Valley, Idaho, New York, New England, Virginia, Mid-Atlantic, Southeast, Midwest, Great Lakes, Texas, Southwest and Mountain West; Ontario, Niagara Peninsula, British Columbia, Okanagan Valley, Quebec, Nova Scotia; Baja California, Coahuila, Querétaro, Central Highlands, Northern Mexico. Some region names ("Southeast", "Midwest", "Columbia Valley", "Okanagan Valley", "Niagara Peninsula", "Paso Robles", "Lodi", "Napa Valley", "Querétaro") are also appellation names, so the integration step should key regions by (country, name, type).
- Appellations: all 280 US AVAs (exact TTB names), 41 Canadian (VQA, BC GIs and sub-GIs, Quebec IGPs, Tidal Bay) and 16 Mexican (valleys, states, the Querétaro IG). Famous AVAs have 114 to 208 words; minimum summaries run 25+ words.
- Notes for integration: `us` appellation entries for the four new AVAs carry `lat`, `lon` and `point_only: true` (fields not in SPEC). Canadian and Mexican appellations carry `lat`/`lon` because no polygons exist. Sites whose place has no AVA use appellation strings like "Texas (no AVA)".
