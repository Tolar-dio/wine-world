# Carpathian Basin and Balkans wine atlas (c8): Hungary, Slovenia, Croatia, Serbia, Bosnia and Herzegovina, Montenegro, North Macedonia, Albania, Kosovo, Romania, Bulgaria

Deliverable: `/home/claude/winesite/data/content/c8_carpathian_balkans.json` (11 countries, 38 regions, 275 appellations, 205 sites; validated with `python3 -m json.tool`; no banned words or em dashes). Per-country part files are in `/home/claude/winesite/work/c8_parts/{iso}.json`, built by `/home/claude/winesite/scripts/c8/build_*.py` and merged by `/home/claude/winesite/scripts/c8_merge.py`.

Method notes: official PDO names for the five EU members came from the local copy of the Candiago et al. (2022) EU PDO dataset (`raw/eupdo/PDO_EU_id.csv`), and every EU-registered name for HU, SI, HR, RO and BG is in an appellation's `match` list. Names registered after 2022 were added from news reports of EU approvals. Site coordinates came from OpenStreetMap Nominatim lookups: 120 sites are marked precise and 85 approx. Every Tokaj dűlő is an OSM 'locality' node, so they are marked approx. The session's shared web-search budget ran out twice, so some facts were checked only through direct page fetches; the gaps below say where.

## Hungary: the 22 districts, six regions and Tokaj in depth

### Takeaway
Hungary has 58 kha of vineyard and made 3.0 mhl in 2025. Its 22 wine districts are each a PDO (OEM), and smaller village, variety and umbrella PDOs bring the EU-registered total to 33 as of 2022; Kőszeg, Etyeki pezsgő and Füred followed in 2025. Tokaj's current specification (v10, harvests from 1 August 2025) lists 27 settlements. That list includes Szegilong, which the brief's list missed. It does not list Ond separately, because Ond is now part of Szerencs.

### Cited Findings
- Hungary had 58 kha of vineyard in 2025 (down 3.4% on 2024) and produced 3.0 mhl (up 10%), ranking 14th by production: [OIV State of the World Wine Sector in 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf). Eurostat gives 56.83 kha of vines for 2025: [Eurostat apro_cpsh1](https://ec.europa.eu/eurostat/databrowser/view/apro_cpsh1/default/table).
- The EU-registered Hungarian PDOs (2022 dataset, 33 names) and their municipality lists are in the local dataset: Tokaj/Tokaji, Eger/Egri, Villány, Szekszárd, Somló, Nagy-Somló, Badacsony, Balaton-felvidék, Balatonfüred-Csopak, Csopak (2020), Tihany (2009, reds only), Káli (2009), Balatonboglár, Zala, Balaton, Mátra, Debrői Hárslevelű (2007), Bükk, Sopron, Pannonhalma, Mór, Neszmély, Etyek-Buda, Pécs, Tolna, Pannon, Kunság, Izsáki Arany Sárfehér, Soltvadkerti (2020), Monor (2018), Csongrád, Hajós-Baja and Duna: [Candiago et al. 2022 EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659).
- New PDOs: Kőszeg (July 2025): [Xpatloop](https://xpatloop.com/channels/2025/07/wine-from-one-of-the-oldest-viticultural-regions-in-hungary-gets-pdo-status.html); Etyeki pezsgő (5 Nov 2025; limestone bedrock, wind, citrus acidity): [Economx](https://www.economx.hu/gazdasag/2025/11/05/unios-oltalom-ala-kerult-az-etyeki-pezsgo-818857/); Füred (about 11 Nov 2025): [Xpatloop](https://xpatloop.com/channels/2025/11/hungarian-fured-wines-get-pdo-status.html).
- Tokaj specification v10: the 27 settlements are Abaújszántó, Bekecs, Bodrogkeresztúr, Bodrogkisfalud, Bodrogolaszi, Erdőbénye, Erdőhorváti, Golop, Hercegkút, Legyesbénye, Makkoshotyka, Mád, Mezőzombor, Monok, Olaszliszka, Rátka, Sárazsadány, Sárospatak, Sátoraljaújhely, Szegi, Szegilong, Szerencs, Tarcal, Tállya, Tokaj, Tolcsva and Vámosújfalu. Permitted grapes are Furmint, Hárslevelű, Kabar, Kövérszőlő, Sárgamuskotály and Zéta. Eszencia needs at least 450 g/l sugar and 1.2 to 8% alcohol. Aszú needs at least 120 g/l, at least 18 months in wood, and release no earlier than 1 January of the third year. Száraz Szamorodni: at least 24 months in cask. Édes Szamorodni, Fordítás and Máslás: at least 60 g/l. Late harvest: at least 45 g/l. Dűlő wines must be 100% from the site and vintage and are capped at 6 t/ha. Only Class I and II cadastre land qualifies. Sparkling wine needs at least 15 months on lees (24 for vintage): [Tokaj termékleírás v10](https://boraszat.kormany.hu/download/b/85/53000/TOKAJ%20term%C3%A9kle%C3%ADr%C3%A1s%20%2810%20v%C3%A1ltozat%29%20kn.pdf).
- The spec's labelling clause still reads "Aszú (3)(4)(5)(6) puttonyos" and limits "6 puttonyos" to wines with at least 150 g/l. The general Aszú minimum is 120 g/l: [Tokaj termékleírás v10a](https://boraszat.kormany.hu/akadalymentes/download/1/40/53000/TOKAJ%20term%C3%A9kle%C3%ADr%C3%A1s%20%2810a%20v%C3%A1ltozat%29%20korr.pdf). Secondary sources say the 2013 reform eliminated 3 and 4 puttonyos: [SommTV](https://mag.sommtv.com/2023/01/what-are-puttonyos/); [Hello Hungary](https://hellohungary.hu/en/did-you-know/historical-secrets-about-the-tokaji-aszu); [BKWine](https://bkwine.com/?p=331917).
- The spec names the cellar mould *Cladosporium cellare* (current taxonomy: *Zasmidium cellare*). It says about 5% of the region (around Tarcal and Tokaj) is loess, credits the 1737 decree as the world's first definition of protected origin, gives a 1707 five-class ranking with Hegyalja first class, notes a Russian purchasing commission from 1733 to 1798, and dates the Szepsi Laczkó Máté legend to 1631 at the Oremus vineyard for Lorántffy Zsuzsanna: [Tokaj termékleírás v10](https://boraszat.kormany.hu/download/b/85/53000/TOKAJ%20term%C3%A9kle%C3%ADr%C3%A1s%20%2810%20v%C3%A1ltozat%29%20kn.pdf).
- 1641: a 48-point code of Hegyalja rules. 1723: Mátyás Bél's survey, with János Matolai's three-class ranking. 1 October 1737: Charles VI's demarcation of 22 towns with planting by licence. 1798: Szirmay's revised classification: [Molnár, IVES 2014](https://ives-openscience.eu/wp-content/uploads/2020/07/Moln-r_The-History-of-the-first.pdf). Wikipedia gives "1737 or 1757" for the decree and dates the class work to 1730, 1765 and 1772: [Wikipedia: Tokaj wine region](https://en.wikipedia.org/wiki/Tokaj_wine_region).
- Aszú is first mentioned in Máté Garai's 1571 inheritance letter (found by István Zelenák in 2002). Máslás is mentioned in 1561. Szerém growers settled in about 1524. The aszú tithe was abolished in 1655. Szepsi's chronicle gives no aszú recipe: [Hello Hungary](https://hellohungary.hu/en/did-you-know/historical-secrets-about-the-tokaji-aszu); see also [Wines of Hungary: ten famous figures](https://winesofhungary.hu/magazine/ten-famous-figures-in-hungarian-wine-history).
- Rákóczi gave Tokaji to Louis XIV in 1703. Franz Joseph sent Queen Victoria 972 bottles in 1900. A 2008 Christie's sale fetched £1,955. Fabricius's dictionary dates to 1576: [Wikipedia: Tokaji](https://en.wikipedia.org/wiki/Tokaji).
- UNESCO inscribed Tokaj in 2002 (ref. 1063, core 13,255 ha, buffer 74,879 ha). About 5,500 ha are planted against 11,149 ha classified, and the Slovak side has about 908 ha: [Wikipedia: Tokaj wine region](https://en.wikipedia.org/wiki/Tokaj_wine_region).
- Royal Tokaji: Hugh Johnson, Peter Vinding-Diers and Szepsy led it, it bought grapes until 1993, and it now has 112 ha: [Decanter](https://www.decanter.com/premium/royal-tokaji-the-first-decade-378530/). It was founded in 1990 by about 60 growers plus Western investors, and the region has more than 400 crus: [Michelin Guide](https://guide.michelin.com/us/en/article/wine/tokaj-the-cellars-that-have-made-aszu-wines-world-famous).
- Disznókő: first recorded in 1413, bought by AXA in 1992, about 150 ha: [M. Touton](https://www.mtouton.com/producers/disznoko). Pajzos-Megyer: CFGVT (Laborde) in 1991; GAN won Megyer in 1992; merged around 2000; the 1993 and 1999 Esszencias scored 100 points: [Pajzos, our past](https://pajzos.com/en/about-us/our-past/). Hétszőlő: assembled by the Garai family in 1502, GMF in 1991, Reybier from 2009, 55 ha; the Rákóczi cellar's hall measures 28 x 10 x 5 m: [Tokaj Turizmus](https://www.tokaj-turizmus.hu/Tokaj-Hetszolo-Wine-Estate). Oremus: founded in 1993 by the Álvarez family: [Michelin Guide](https://guide.michelin.com/us/en/article/wine/tokaj-the-cellars-that-have-made-aszu-wines-world-famous); its vineyard was rated primae classis in 1772: [Tempos Vega Sicilia](https://temposvegasicilia.com/en/terroirniveau1/7/tokaj). Grand Tokaj is the state-owned successor of Tokaj Kereskedőház: [Tokaj Turizmus](https://www.tokaj-turizmus.hu/Grand-Tokaj-en). Szepsy farms 52 ha: [World's Best Vineyards](https://www.worldsbestvineyards.com/the-list/Szepsy-Winery.html).
- Mézes Mály is a Great First Growth of 19 ha, of which Royal Tokaji owns 11: [Wine With Seth](https://www.winewithseth.com/winewiki/single-vineyard-dulo-tokaj-top-producers-benchmark-expressions/). Szepsy and Demeter made the Úrágya Furmint 2000 at Királyudvar. Kikelet works the loess sites Lónyai, Váti and Kassai. Homonna works Határi (about 2005): [Hello Hungary](https://hellohungary.hu/en/toplists/five-vintner-who-have-changed-tokaj).
- Other Hungarian facts: Teleki's rootstock nursery at Villány dates from 1881; the Miklóstelep sand vineyard from 1883; Törley moved to Budafok in 1882: [Wines of Hungary](https://winesofhungary.hu/magazine/ten-famous-figures-in-hungarian-wine-history). Etyek-Buda's spec (limestone, 9.5 to 10.5 °C, about 2 million bottles of sparkling by the 1910s): [eAmbrosia attachment 10445](https://webgate.ec.europa.eu/eambrosia-api/api/v1/attachments/10445). A 1552 Eger legend, the 1730 classification and phylloxera from 1882: [Wikipedia: Hungarian wine](https://en.wikipedia.org/wiki/Hungarian_wine).

### Inferences
- Puttonyos labelling: the specification text permits 3 to 6 puttonyos on a label, but the 120 g/l minimum makes the old 3 and 4 levels (60 and 90 g/l) unachievable as Aszú. The JSON therefore says 3 and 4 puttonyos are "gone in practice" and treats puttonyos as an optional label word. This is a direct conflict with the brief's "minimum 5 since 2013" wording, which is roughly right in effect but not a literal rule.
- The "1700 Rákóczi classification" in the brief is not supported as a single document. Sources date the classing to 1707 (a five-group national ranking in the spec), 1720 to 1730 (Matolai and Bél) and 1765 to 1772 (censuses). The JSON presents it as a process from about 1700 to 1772.
- Mézes Mály and Szarvas are labelled "Great First Growth (historic)". That reflects Royal Tokaji's usage and the tradition, not current law.

### Gaps
- No official dűlő boundary polygons or centroids were found. Dűlő points are OSM locality nodes (approx). Coordinates for Szepsy, Királyudvar, Dobogó, Barta, Samuel Tinon and Pajzos-Megyer are street or village approximations.
- Exact registration dates and specifications for Kőszeg and Füred: the government PDFs were blocked by robots.txt, so their variety lists are generic in the JSON.
- The exact year of the Tokaj royal decree (1737 vs 1757) is disputed between sources. The JSON follows the specification and Molnár (1 October 1737).

## Slovenia

### Takeaway
Slovenia has 14 EU PDOs: nine districts across three regions, plus five PTP wines (Teran, Cviček, Metliška črnina, Belokranjec, Bizeljčan). Vineyard area is about 13.9 to 17 kha depending on the source. The Old Vine in Maribor (Žametovka, 400+ years, Guinness) and Ptujska klet (1239 Minorite cellar; Zlata trta 1917) are verified.

### Cited Findings
- The ministry cites about 17,000 ha cultivated and 14,600 ha registered, more than 27,000 holdings averaging 0.55 ha, 507,380 hl reported in 2022, district areas (Štajerska 5,400, Vipava 2,100, Istra 1,850, Brda 1,800, Dolenjska 1,350, Bizeljsko-Sremič 700, Kras 560, Prekmurje 440, Bela krajina 300 ha), and amended specifications for Cviček (22 Sept 2025) and Metliška črnina and Belokranjec (31 Mar 2026): [gov.si Vinogradništvo in vinarstvo](https://www.gov.si/teme/vinogradnistvo-in-vinarstvo/).
- The government adopted a new Wine Act bill on 27 Nov 2025: [gov.si](https://www.gov.si/novice/2025-11-27-vlada-na-danasnji-seji-sprejela-predlog-zakona-o-vinu/).
- Stara trta: over 400 years old, Žametovka, Guinness-listed, 35 to 55 kg of grapes a year, descendants at 130 Slovenian and 84 foreign sites: [gov.si](https://www.gov.si/novice/2020-12-02-najstarejsa-trta-na-svetu/).
- Ptujska klet: symbolic start in 1239 with the Minorite cellar; Zlata trta 1917 is the oldest Slovenian archive wine: [Ptujska klet](https://www.ptujska-klet.si/en/).
- Sparkling wine at Radgona since 1852; PTP list; Jeruzalem: [Wikipedia: Slovenian wine](https://en.wikipedia.org/wiki/Slovenian_wine).
- 2024 production of 512,800 hl (OIV): [Wine Plus](https://wineplus.gr/en/articles/Wine-Production-2024--Statistics/). Eurostat gives 13.91 kha for 2025: [Eurostat](https://ec.europa.eu/eurostat/databrowser/view/apro_cpsh1/default/table).
- PDO names and varieties (Teran is 100% Refošk at 90 hl/ha; Cviček and Metliška črnina variety lists): [EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659).

### Inferences
- The orange-wine narrative (Movia, Klinec, Batič, Kabaj) comes from general expertise. Producer facts kept to safe details.

### Gaps
- Details of the Teran dispute with Croatia (the 2017 derogation and the court case outcome) were not re-verified in this session.

## Croatia

### Takeaway
Croatia has 18 EU wine PDOs: three regions, twelve subregions and three site appellations (Dingač, Ponikve 2021, Muškat momjanski 2021). Dingač was protected in 1961 and its tunnel opened on 29 November 1975 (not 1973 or 1976). The 1947 Ilok Traminer at the 1953 coronation, the Kutjevo 1232 cellar and the 2001 Kaštel Novi Zinfandel identification are all supported.

### Cited Findings
- Dingač was the first protected Croatian wine region (1961), Postup followed in 1967, slopes reach 45 degrees: [Wikipedia: Dingač](https://en.wikipedia.org/wiki/Dinga%C4%8D); [Wikipedia: Croatian wine](https://en.wikipedia.org/wiki/Croatian_wine).
- The Dingač tunnel opened on 29 Nov 1975: 400 m, built by Konstruktor, financed by the cooperative, cutting a 20 km trip to 4 km. Dingač got 'famous wine' protection in Geneva in 1964. The PDO covers 758 ha, with about 78 ha planted: [Croatia Week](https://www.croatiaweek.com/how-a-400-metre-tunnel-transformed-croatias-most-famous-wine-region).
- A 1947 Ilok Traminac was served at the 1953 coronation, with an order of 11,000 bottles: [Total Croatia News](https://total-croatia-news.com/wine/croatian-wine-producers/which-croatian-wine-was-served-at-the-queen-s-coronation-in-1953/). The Old Cellar dates from 1450: [Iločki podrumi](https://www.ilocki-podrumi.hr/en/).
- Cistercians built the Kutjevo cellar in 1232. The winery has 430 ha of its own vines and the archive holds 65,000+ bottles, the oldest a 1947 Pinot Blanc: [Wine & More](https://wineandmore.com/stories/kutjevo-tradition-centuries/).
- Zinfandel: Meredith's 1993 DNA work; Kaštel Novi in 2001; Plavac Mali is the offspring of Zinfandel and Dobričić (Pejić and Maletić); Tribidrag is recorded in 1444; Cratosia appears in the Budva statute of 1426 to 1442; Montenegro is the likely origin: [Wikipedia: Zinfandel](https://en.wikipedia.org/wiki/Zinfandel); nine vines found: [Wine With Seth](https://www.winewithseth.com/winewiki/crljenak-kastelanski/).
- Ponikve became the 17th Croatian PDO in Feb 2021: [HR Turizam](https://en.hrturizam.hr/ponikve-postale-17-zasticena-oznaka-izvornosti-vina-na-razini-eu).
- Vineyard area of 19.1 kha in 2025: [Eurostat](https://ec.europa.eu/eurostat/databrowser/view/apro_cpsh1/default/table). 2024 production of 458,000 hl: [Wine Plus](https://wineplus.gr/en/articles/Wine-Production-2024--Statistics/).

### Inferences
- The Primošten "photo in the UN" and "Pošip Čara first protected white" claims are hedged in the JSON ("is said to", "often cited") because they could not be verified.

### Gaps
- Status of the prošek EU protection dispute in 2026: not verified.
- Grgić Vina coordinates use Trstenik village (approx).

## Serbia, Bosnia and Herzegovina, Montenegro, North Macedonia, Albania, Kosovo

### Takeaway
None of these countries has EU-registered wine GIs. Serbia (81) and Albania (36) have wine GIs protected in the UK under trade agreements, and those names were used as appellation entries. Montenegro has four legal wine regions (2017 decision). North Macedonia's first GI ("Vardar Valley") was in preparation in 2026. Bosnia and Herzegovina and Kosovo have no GI system, so they have no appellation entries.

### Cited Findings
- Serbia: 81 wine PGIs plus traditional terms KP, KPK and KPGK in the UK register (UK-Serbia agreement, protection dated 20 May 2021 for Oplenac): [GOV.UK register](https://www.gov.uk/protected-food-drink-names?country_of_origin%5B%5D=serbia); [Oplenac entry](https://gov.uk/protected-food-drink-names/oplienachki-slash-oplenac).
- Serbia: 20,406 ha in 2018, 331,000 hl, 353 wineries, three units, 22 regions and 77 sub-regions, 2015 zoning: [Agroberichten Buitenland](https://agroberichtenbuitenland.nl/actueel/nieuws/2020/10/07/wine-in-serbia). An alternative count of 22,150 ha with 6,700 ha registered for wine: [Economics of Agriculture](https://ea.bg.ac.rs/index.php/EA/article/download/1995/1546/5388).
- Negotin Pivnice were added to the UNESCO Tentative List on 15/04/2010: 196 cellars; Rogljevo had 40 cellars built from 1859 to 1890; Rajac has a cemetery of about 200 tombstones: [UNESCO](https://whc.unesco.org/en/tentativelists/5537).
- King's Winery at Oplenac: built in 1931, 45 x 15 m, two underground floors at 8 °C, 99 casks of 2,000 l, more than 50 ha planted, a 1909 barrel, first new harvest in 2006: [oplenac.rs](https://oplenac.rs/?p=991).
- Bermet: 16 to 18% alcohol, about 20 herbs, Titanic and Vienna claims: [Wikipedia: Bermet](https://en.wikipedia.org/wiki/Bermet); the Živanović cellar is 300 years old: [Go Eat Do](https://go-eat-do.com/2018/02/zivanovic-winery-serbia/).
- Vršac: about 10,000 ha in the 19th century; the 1968 New Cellar held 2,000 wagons: [privatisation profile](https://privatizacija.privreda.gov.rs/upload/document/vrsacki_vinogradi_vrsac_jsc.pdf). Župska berba since 1963: [Agronews](https://www.agronews.rs/dobrodosli-u-vinsku-prestonicu-srbije/).
- Montenegro: four regions and 15 subregions under Official Gazette 65/2017: [LEAP/FAOLEX](https://leap.unep.org/en/countries/me/national-legislation/decision-determining-region-wine-production). 2,825 ha and 70,000 hl in 2022: [Wein.plus](https://wineguide.wein.plus/wine-regions/montenegro). Šipčanik: a former military facility, 356 m long, more than 30 m deep, 17 to 19 °C, over 2 million litres, 18,000 bottles, in use since Nov 2007; the Ćemovsko polje cellar opened in 1981: [Plantaže](https://www.plantaze.com/en/wine-cellars/). Plantaže was founded in 1963 and has over 2,310 ha and 11 million vines: [Wikipedia: Plantaže](https://en.wikipedia.org/wiki/Plantaže). Crmnica won prizes in London in 1907: [Wikipedia: Montenegrin wine](https://en.wikipedia.org/wiki/Montenegrin_wine).
- North Macedonia: 24,776 ha and 854,000 hl in 2022; Vranec covers 9,500 ha: [Wein.plus](https://wineguide.wein.plus/wine-regions/north-macedonia). Three regions and 16 wine areas, Povardarie with 87% of vineyards, Wine Law amendments in April 2024, "Vardar Valley" GI planned, 85%+ exported: [GIZ](https://www.giz.de/en/regions/europe/north-macedonia/news/macedonian-wine-will-receive-geographical-indication-symbol). Tikveš was founded in 1885: [Journey Macedonia](https://journeymacedonia.com/wineries/tikves-tikvesh/).
- Albania: 36 UK-protected wine GIs: [GOV.UK register](https://www.gov.uk/protected-food-drink-names?country_of_origin%5B%5D=albania). 10,178 ha in 2015, phylloxera in 1933, export decline: [Wikipedia: Albanian wine](https://en.wikipedia.org/wiki/Albanian_wine).
- Kosovo: 3,405.54 ha in 2024 (Rahovec 2,465), 35 licensed wineries: [Kosovo MIET](https://mik.rks-gov.net/?p=1752). Stone Castle: founded 1952, privatised in 2006 for €5.5m, 10 to 13 million litres: [Wikipedia: Stone Castle](https://en.wikipedia.org/wiki/Stone_Castle_(Kosovan_winery)).
- Bosnia and Herzegovina: 2,657 ha (Federation) plus 600 ha (RS) in 2016, 177,400 hl, Žilavka and Blatina at 60 to 65%: [Jancis Robinson](https://jancisrobinson.com/articles/bosnia-herzegovina-crossroads). Tvrdoš has a 15th-century cellar: [Wikipedia: Tvrdoš](https://en.wikipedia.org/wiki/Tvrdo%C5%A1_Monastery). Žilavka was favoured by the Habsburg emperors, Vukoje owns land of Franz Joseph's vineyard, and the Wine Route dates from 2007 (relaunched 2023): [Decanter](https://www.decanter.com/wine/herzegovina-a-wine-lovers-guide-527465/).

### Inferences
- Serbian GIs other than about 20 key ones got short template summaries naming the place and noting the UK-agreement protection. They are factual but thin.
- Montenegro's appellations use cat "Region" (national legal regions, not GIs).
- "Former aircraft hangar" for Šipčanik is not confirmed. Plantaže says "former military facility" of an airfield. The JSON says "built as a military facility of the former airfield".

### Gaps
- Recent Serbian vineyard and production statistics (after 2018) were not found.
- No Bosnian wine law text was accessible (robots-blocked), so the status of Mostarska Žilavka/Blatina as legal GIs is unverified. They are described as traditional names.
- Kosovo production volume was not found.
- Coordinates for the Ćemovsko polje vineyard centroid are approx. Kantina Arbëri and Skënderbeu could not be geocoded and were omitted as sites.

## Romania

### Takeaway
Romania has 187 kha of vineyard (OIV, 4th in the EU) and made 3.3 mhl in 2025. It has 33 DOCs (all present in the EU dataset, Însurăței 2018 and Adamclisi 2020 being the newest) and 12 IGs. DOC-CMD, CT and CIB are ripeness tiers. The Burebista story rests on Strabo, and phylloxera first appeared at Chitorani in Dealu Mare.

### Cited Findings
- 187 kha, 3.3 mhl in 2025 (+3.7%), 17.6% below the 5-year average, consumption of 3.5 mhl: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf); [AGERPRES](https://agerpres.ro/economic-extern/2026/05/13/taxele-vamale-au-afectat-in-2025-comertul-cu-vin-romania-raporteaza-o-crestere-a-productiei-oiv--1555527). Eurostat gives 162.14 kha of wine vines in 2025: [Eurostat](https://ec.europa.eu/eurostat/databrowser/view/apro_cpsh1/default/table).
- 33 DOC/PDO and 12 IG/PGI areas; CMD at least 187 g/l, CT at least 220 g/l, CIB at least 240 g/l: [Wine With Seth](https://www.winewithseth.com/winewiki/romania-wine-classification/).
- Adamclisi PDO approved in July 2020: [Digi24](https://www.digi24.ro/stiri/externe/ue/comisia-europeana-aproba-o-noua-denumire-protejata-pentru-un-vin-din-romania-1345711). Names, communes and varieties of all DOCs (Adamclisi varieties and the 7 t/ha cap, Însurăței 2018): [EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659).
- Strabo on Burebista ordering vineyards burned; 80 to 90% exported under Communism: [RRI](https://rri.ro/en/features-and-reports/rri-encyclopaedia/the-recent-history-of-romanian-wine-id621920.html).
- Cotnari: Cătălina hill fortress, peaks under Peter II, Stephen the Great and Despot Vodă: [Cotnari](https://www.cotnari.ro/en/the-beginning/). Grasă: up to about 300 g/l, 520 g/l in 1958, identical to Kövérszőlő: [Wikipedia: Grasă de Cotnari](https://en.wikipedia.org/wiki/Gras%C4%83_de_Cotnari).
- Fetească Regală: a natural cross of Grasă and Fetească Albă, identified around 1920 at Daneș: [Wikipedia: Fetească regală](https://en.wikipedia.org/wiki/Feteasc%C4%83_regal%C4%83). Phylloxera at Chitorani: [Wikipedia: Romanian wine](https://en.wikipedia.org/wiki/Romanian_wine) (the page says 1872 in one place and the 1880s elsewhere; the JSON uses "1880s").

### Inferences
- Producer details (Recaș at about 1,000 ha, Jidvei at about 2,500 ha, Știrbey's restitution in 2001, Segarcea as a crown domain 1884 to 1948) come from expertise and were not re-verified this session.

### Gaps
- Current hectares by variety (for example Fetească Neagră) were not found because the search budget ran out.
- The full list of DOC sub-denominations was not verified.

## Bulgaria

### Takeaway
Bulgaria has 58 kha (OIV), 52 PDOs registered under Cyrillic names (matched exactly) and two PGIs. 2025 production was 66 million litres from 365 wineries (151 foreign-invested). The 1980s UK Cabernet boom reached 3.3 million cases by 1994. Melnik, the Kordopulov House (1754), the earth pyramids, Starosel and Perperikon are all verified.

### Cited Findings
- 58 kha in 2025: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf). 66 million litres in 2025, down 10 to 15%, 365 wineries: [BTA](https://www.bta.bg/en/news/1063599-bulgarian-wineries-made-66-mln-litres-of-wine-in-2025). 151 foreign-invested wineries, exports of about 16 million litres: [BTA](https://www.bta.bg/en/news/1065662-bulgarian-winemaking-sector-modernizing-agency-chief-says). 712,000 hl in 2024: [Wine Plus](https://wineplus.gr/en/articles/Wine-Production-2024--Statistics/).
- UK exports passed 2 million cases in 1990 and reached 3.3 million in 1994; 145,000 ha after the Second World War; 52 PDOs and two PGIs: [Wine Anorak](https://wineanorak.com/2025/03/28/exploring-bulgarian-wine-1-introduction/).
- The 52 PDOs and their municipalities (Bolyarovo 2009, the others 2007): [EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659).
- Kordopulov House: built 1754, about 300 t capacity, largest cask 12.5 t, coordinates 41.5231, 23.3983: [Wikipedia](https://en.wikipedia.org/wiki/Kordopulov_House). Earth pyramids: sandstone and conglomerate, up to 100 m, landmark since 1960, 17 km²: [Wikipedia](https://en.wikipedia.org/wiki/Melnik_Earth_Pyramids). Melnik: 385 inhabitants, wine since 1346: [Wikipedia: Melnik](https://en.wikipedia.org/wiki/Melnik,_Bulgaria).
- Starosel: temple dated to the late 5th or early 4th century BC, found in 2000: [Bulgarian Ministry of Tourism](https://tourism.government.bg/en/tourist-destinations/2800/5754). Perperikon: 470 m hill, possible temple of Dionysus, round altar, Ovcharov's excavations since 2000: [Wikipedia](https://en.wikipedia.org/wiki/Perperikon).
- Rubin dates from 1944 at Pleven; Melnik 55 from 1963 at Sandanski (Valdiguié as pollen parent, registered in 2006); Mavrud covers about 2% of the vineyard; Gamza is Kadarka; Dimyat is a Gouais offspring: [Wine With Seth](https://www.winewithseth.com/winewiki/bulgarias-indigenous-red-white-varieties-mavrud-melnik-55-rubin-gamza-shiroka-melnishka-loza-dimyat-muscat-ottonel-rkatsiteli/).
- Oriachovitza was founded in 1936 with vines at 170 to 260 m: [BTA](https://www.bta.bg/en/bg-wine/974128-oriachovitza-winery-experimenting-with-new-wine-styles-in-push-for-innovation). The five regions were set by decree in 1960: [Wikipedia: Bulgarian wine](https://en.wikipedia.org/wiki/Bulgarian_wine).

### Inferences
- PDO `name` values are transliterations (Melnik, Sakar, Yuzhno Chernomorie...), and the official Cyrillic names are in `match` for joining.
- The PepsiCo barter detail was removed as unverified. Khan Krum's Mavrud legend is labelled as legend.

### Gaps
- Bulgarian PDO areas in hectares and any changes to the PDO list after 2022 could not be checked.
