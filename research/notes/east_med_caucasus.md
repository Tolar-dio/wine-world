# Wine atlas: eastern Mediterranean, Caucasus, Black Sea, North Africa and Central Asia (content file c9)

Deliverable: `/home/claude/winesite/data/content/c9_east_med_caucasus_africa_asia.json` (valid JSON; 27 countries, 49 regions, 110 appellation profiles, 190 sites). Per-country part files: `/home/claude/winesite/work/c9/parts/{iso2}.json`. Build scripts: `/home/claude/winesite/scripts/c9/` (`gr.py`, `ge.py`, `md.py`, `cy_mt.py`, `levant_tr.py`, `nafrica.py`, `caucasus_bs.py`, `casia_ir.py`, then `merge_c9.py`, which adds point lat/lon to appellations without polygons, adds polygon-name variants to `match`, expands short summaries, validates and writes the final file). Coordinate lookup logs: `/home/claude/winesite/work/c9/coords/*.out` (OpenStreetMap Nominatim) and `en1.out` (Wikipedia API).

Coverage by depth: Greece, Georgia and Moldova "major"; Cyprus, Türkiye, Lebanon, Israel and Armenia "notable"; Egypt, Tunisia, Algeria, Morocco, Azerbaijan, Ukraine, Russia and Uzbekistan "emerging"; Malta, Palestine, Syria, Jordan, Libya, Kazakhstan, Tajikistan, Kyrgyzstan, Turkmenistan, Iran and Iraq "minor".

Method limits: the shared WebSearch budget ran out twice and the fetch tool hit a usage cap once, and the Wikipedia/Wikidata APIs rate-limited this IP. Several official sites (cricova.md, milestii-mici.md, wineofmoldova.com) could not be fetched because permission prompts timed out. Coordinates were therefore checked mainly through OpenStreetMap Nominatim. Facts I could not verify are hedged in the text or listed under Gaps.

## Archaeology and origins of wine

### Takeaway
The site chain runs from Neolithic Georgia (about 6000 to 5800 BC) through Iran (about 5400 to 5000 BC) to the Areni-1 winery in Armenia (about 4100 to 4000 BC). After that come Egyptian royal wine (tomb U-j about 3150 BC; Tutankhamun's labelled jars), Canaanite Tel Kabri (about 1700 BC), Urartian Teishebaini, and the Aegean and Punic worlds. All of these are mapped as `historic` sites with coordinates checked against OSM or Wikipedia.

### Cited Findings
- Gadachrili Gora and Shulaveris Gora (Kvemo Kartli, about 50 km south of Tbilisi): jars dated to about 6000 to 5800 BC held tartaric, malic, succinic and citric acid. No resin was found. One Gadachrili jar had grape pollen and starch, and the evidence predates Hajji Firuz by up to a thousand years. Lead author McGovern, published in PNAS 2017 as "Early Neolithic wine of Georgia in the South Caucasus" (source: [Jancis Robinson](https://jancisrobinson.com/articles/breakthrough-discovery-in-georgia))
- Gadachrili Gora lies near Imiri, Marneuli municipality, and its occupation levels are radiocarbon dated to 5920 to 5720 cal BC. It was named a top-10 discovery of 2017 by Archaeology magazine, and the GRAPE project (University of Toronto, Georgian National Museum, NWA) continues there (source: [Wikipedia, Gadachrili Gora](https://en.wikipedia.org/wiki/Gadachrili_Gora). The coordinates 41.3904, 44.821 come from an OSM archaeological_site node.)
- Hajji Firuz Tepe (West Azerbaijan, Iran) had six 9-litre jars sunk in a kitchen floor, dated 5400 to 5000 BC, containing tartaric acid and terebinth resin. It was excavated by the Penn Museum 1958 to 1968 and published by McGovern et al. in Nature 1996 (source: [Wikipedia, Hajji Firuz Tepe](https://en.wikipedia.org/wiki/Hajji_Firuz_Tepe))
- Godin Tepe had jars of about 3100 to 2900 BC with residue on their sides, showing they were stored lying down (source: [Wikipedia, Hajji Firuz Tepe](https://en.wikipedia.org/wiki/Hajji_Firuz_Tepe))
- Areni-1 (Vayots Dzor, Armenia) was discovered in 2007 and excavated through 2010, and the winery was announced in January 2011. It held a clay treading basin about 1 m long, a vat 60 cm deep (about 65 litres), karases and domesticated grape remains. Malvidin was detected and radiocarbon dates fall at 4100 to 4000 BC. Leaders were Boris Gasparyan, Ron Pinhasi and Gregory Areshian. The paper is Barnard et al. 2011, Journal of Archaeological Science 38(5):977 to 984. The world's oldest leather shoe (about 3600 to 3500 BC) came from the same cave (source: [Wikipedia, Areni-1 winery](https://en.wikipedia.org/wiki/Areni-1_winery))
- Teishebaini (Karmir Blur) is at 40.1539, 44.4511. It was founded by Rusa II in the mid-7th century BC and abandoned around 585 BC. Excavations ran 1939 to 1971, and its jars were half-buried with capacity marks (source: [Wikipedia, Teišebaini](https://en.wikipedia.org/wiki/Tei%C5%A1ebaini). The Armenian wine article claims "480 karases" and absurd capacities, so I did not use those numbers , [Wikipedia, Armenian wine](https://en.wikipedia.org/wiki/Armenian_wine))
- Tomb U-j at Abydos (associated with Scorpion I) held dozens of imported jars with wine residue, herbs and tree resins, plus grape seeds and skins and labels that are among the earliest Egyptian writing. Radiocarbon ranges run about 3380 to 3230 BC, and the jars are dated about 3150 BC (source: [Wikipedia, Scorpion I](https://en.wikipedia.org/wiki/Scorpion_I))
- Five amphorae in Tutankhamun's tomb held white wine (source: [Wikipedia, Egyptian wine](https://en.wikipedia.org/wiki/Egyptian_wine))
- Tel Kabri's wine cellar was found in 2013 and announced on 22 November 2013. It held about 40 large jars totalling about 2,000 litres and dates to about 1700 BC. It is the oldest and largest palatial wine cellar known in the Near East (source: [Wikipedia, Tel Kabri](https://en.wikipedia.org/wiki/Tel_Kabri))
- The Cyprus wine museum stands at Erimi, where Chalcolithic flasks (3500 to 3000 BC) analysed in 2005 showed wine residues. Pyrgos(-Mavroraki) has a Bronze Age winery next to a perfumery (source: [Wikipedia, Cypriot wine](https://en.wikipedia.org/wiki/Cypriot_wine))
- Mago wrote a 28-book Punic agricultural manual. The Roman Senate had it translated into Latin after 146 BC, and surviving fragments cover planting and pruning vines and making passum (source: [Wikipedia, Mago](https://en.wikipedia.org/wiki/Mago_(agricultural_writer)))
- Tell el-Burak near Sidon has a 7th-century BC Phoenician wine press, and Byblos wine was exported to Old Kingdom Egypt (source: [Wikipedia, Lebanese wine](https://en.wikipedia.org/wiki/Lebanese_wine))

### Inferences
- The "8,000-year" Georgian claim rests on chemistry from two sites. Hajji Firuz is the earliest resinated wine, and Areni-1 is the earliest winery as an installation. The atlas frames them in that order.
- I wrote Dikili Tash (Greece, about 4300 BC pressed grapes), Vathypetro's Minoan press and the Linear B wine records from expertise. Their coordinates were checked in OSM, but the facts were not re-fetched.

### Gaps
- Shulaveris Gora has no OSM or Wikipedia coordinates, so it was placed at Shulaveri village (approx).
- The exact jar count in tomb U-j (the often-quoted figure is about 700) was not confirmed in fetched sources, so the text says "dozens".
- The Tell el-Burak coordinates are approximate, since no OSM node was found.
- I did not fetch the Thasos wine-law inscriptions or Chian amphora specifics. The text relies on standard knowledge.

## Greece

### Takeaway
There are 33 PDOs, all present in the EU geospatial dataset and in `site/data/geo/gr.geojson` (all 33 polygons match a profile). The vineyard covers 93 kha. Production was 1.4 mhl in 2023 and 2024 and recovered to 1.6 mhl in 2025.

### Cited Findings
- PDO list with registration dates (mostly 1981-06-11; Slopes of Meliton and Anchialos 1982; Paros 1982-02-20; Mesenikola 1996; the four Malvasia PDOs and Chandakas-Candia 2011), varieties and maximum yields (source: [Candiago et al. 2022 EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659) (local copy `raw/eupdo/PDO_EU_id.csv`))
- Greece had 93 kha of vineyard in 2024 and 2025. Production was 1.4 mhl in 2023 and 2024 and 1.6 mhl in 2025 (+16.8%), against a historical range of 2 to 4 mhl. It ranks 20th by production (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Nemea was established in 1971. It is the only Greek PDO spread across two prefectures, covering 17 villages, and it is the largest red PDO zone. It is 100% Agiorgitiko, with vineyards from about 200 to 850 m and three unofficial altitude subzones (source: [Wines of Greece](https://winesofgreece.org/?p=1086))
- The Nemea subzones are not codified, the label may not name them, and the PDO covers about 3,000 ha and about 40 wineries (source: [WineWithSeth](https://www.winewithseth.com/winewiki/nemea-pdo/). This answers the brief's question: the 2023+ subzones have not been adopted.)
- Santorini has about 1,200 ha. It is phylloxera-free with kouloura training. Vinsanto requires at least 51% Assyrtiko, 12 to 14 days of sun-drying and at least 24 months in oak; Nykteri requires at least 75% Assyrtiko; the EU recognised the Vinsanto name in 2002 (source: [Wikipedia, Santorini (wine)](https://en.wikipedia.org/wiki/Santorini_(wine)))
- Plagies Ampelou is a PGI (the slopes of Mount Ampelos, Samos), not a PDO (source: [Greek Ministry PGI technical file](https://www.minagric.gr/images/stories/docs/agrotis/POP-PGE/TEXNIKOI%20FAKELOI%20OINON%20POP-PGE%20ENGLISH/PGI%2080/eniaio_plagies_ampelouPGE_101114.pdf))
- Estate coordinates (Sigalas, Hatzidakis, Argyros, Santo, Kir-Yianni, Gerovassiliou, Alpha, Tselepos, Achaia Clauss, Koutsi/Gaia, Boutari Stenimachos) come from OSM winery nodes , see `work/c9/coords/gr.out`

### Inferences
- The polygon names in `gr.geojson` use transliterations such as "Mavrodafni Patron" and "Rodos". The merge step adds these to `match` so text joins to the polygons.

### Gaps
- I could not reach eAmbrosia for post-2022 amendments (for example, any 2024 to 2026 Santorini or Nemea rule changes).
- The Gaia Santorini winery (Exo Gonia), Domaine Porto Carras, Omala (Robola cooperative), Economou and Lyrarakis are placed at village or approximate positions.

## Cyprus and Malta

### Takeaway
Cyprus has 7 PDOs and Malta has 2, all with polygons. Commandaria was inscribed by UNESCO in December 2025.

### Cited Findings
- The Cypriot PDOs were registered 2006-02-17 per the dataset: Commandaria, Krasochoria Lemesou (plus the -Afames and -Laona subzones), Pitsilia, Vouni Panagias-Ambelitis and Laona Akama. Commandaria allows only Mavro and Xynisteri (source: [EU PDO inventory](https://doi.org/10.6084/m9.figshare.c.5877659))
- The Commandaria law of 2 March 1990 names 14 villages (listed in the atlas). The rules require goblet training, no irrigation, sun-drying to 390 to 450 g/L and at least two years in oak. Production was about 200,000 bottles in 2025, and Commandaria is linked to the Battle of the Wines poem (Henri d'Andeli, 1224) (source: [Wikipedia, Commandaria](https://en.wikipedia.org/wiki/Commandaria))
- The UNESCO inscription was announced on 10 December 2025 at the New Delhi committee and is Cyprus's 7th element (source: [Cyprus Mail](https://cyprus-mail.com/2025/12/11/commandaria-secures-unesco-heritage-status). Wikipedia also gives the conflicting date "December 2024", which is wrong.)
- Malta: Delicata (1907), Marsovin (1919), DOK Malta and DOK Gozo, and IĠT Maltese Islands (source: [Wikipedia, Maltese wine](https://en.wikipedia.org/wiki/Maltese_wine))

### Gaps
- No current Cypriot or Maltese vineyard statistics were fetched. The stats notes give approximate ranges.
- The brief asked "1225? Battle of Wines". The sources date the poem to about 1224.

## Türkiye and the Levant (Lebanon, Israel, Palestine, Syria, Jordan)

### Takeaway
Türkiye has the world's 6th-largest vineyard (395 kha) but makes little wine and has no appellations. The Levant countries have no appellation systems either, so they are covered by regions and sites. Disputed areas (the Golan, the West Bank) are described factually.

### Cited Findings
- Türkiye had 395 kha in 2025, the sixth-largest vineyard area, mainly table grapes and raisins (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Turkish history: Atatürk's Tekirdağ winery (1925), Doluca (1926), Kavaklıdere (1929), Tekel's privatisation (2004) and about 140 licensed wineries in the mid-2020s, along with the regional and grape details (source: [Wikipedia, Turkish wine](https://en.wikipedia.org/wiki/Turkish_wine); [Wikipedia, Tekel](https://en.wikipedia.org/wiki/Tekel))
- Lebanon: Ksara (Jesuits, 1857; Roman caves found 1898; about 3 million bottles), Musar (Gaston Hochar, 1930, Ghazir; Serge Hochar winemaker 1959 to 2014; the 1979 Bristol discovery; only 1976 missed), about 15 million bottles in 2024 despite the war, and Obaideh and Merwah (source: [Wikipedia, Lebanese wine](https://en.wikipedia.org/wiki/Lebanese_wine); [Château Ksara](https://en.wikipedia.org/wiki/Ch%C3%A2teau_Ksara); [Chateau Musar](https://en.wikipedia.org/wiki/Chateau_Musar))
- Israel: Rothschild and Carmel at Rishon LeZion and Zichron Ya'akov, the five regions, kosher rules, about 300 wineries, the ancient grapes (Marawi/Hamdani, Dabouki) and the Golan labelling disputes (source: [Wikipedia, Israeli wine](https://en.wikipedia.org/wiki/Israeli_wine))
- Site coordinates for Musar, Ksara, Kefraya (approximate), Massaya (Taanayel), the Temple of Bacchus, Carmel Zichron and Rishon, the Golan Heights Winery, Tel Kabri, Shivta, Cremisan, Taybeh, Ugarit, Mari and Little Petra come from OSM (`work/c9/coords/rest2.out`, `lv.txt`)

### Inferences
- In the site's own base layer, Cremisan and Taybeh fall in `ps` and the Golan in `il`, matching how the atlas assigns them. The Golan text says the territory is Syrian, occupied since 1967, with the 1981 annexation not recognised by the UN.

### Gaps
- The Domaine de Bargylus (Syria) and Jordan River Wines and Zumot coordinates are unverified. Bargylus is placed approximately in the Jebel Ansariyeh; the Jordan wineries are not mapped.
- Türkiye's 2013 alcohol law details (Law 6487) and current tax levels come from my own knowledge and were not re-fetched.
- I did not verify a Lebanese national wine institute law, so I removed it from the text.

## North Africa (Egypt, Tunisia, Algeria, Morocco, Libya)

### Takeaway
Tunisia has 7 Lisbon-registered AOCs, Algeria 7 ONCV quality zones (AOG), and Morocco about 14 AOGs plus one AOC (Coteaux de l'Atlas 1er Cru, 2001). None of these have polygons, so they are placed as points. Algeria's colonial peak was about 400,000 ha in 1938 and about 16 mhl around 1960.

### Cited Findings
- Tunisia's AOCs: Muscat de Kélibia and Muscat de Thibar (18 September 1958); Mornag (19 May 1973); Coteaux de Tébourba and Sidi Salem (23 July 1973); Grand Cru Mornag and Coteaux d'Utique (source: [Wikipedia, GIs in Tunisia](https://en.wikipedia.org/wiki/Geographical_indications_in_Tunisia))
- Algeria's seven AOG zones are Aïn Bessem-Bouira, Coteaux de Mascara, Coteaux de Tlemcen, Coteaux du Zaccar, Dahra, Médéa and Monts du Tessalah. The vineyard was 400,000 ha in 1938 and 74,000 ha in 2012, and production was about 16 mhl around 1960 and 492,000 hl in 2012 (source: [Wein-Plus](https://glossary.wein-plus.eu/algeria))
- Algeria had 68 kha in 2025 (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Algeria with Morocco and Tunisia made up nearly two thirds of the international wine trade by the 1950s. Production went from 25,000 hl (1854) to 10 mhl (1915), and the Soviet contract of 1969 took 500 ML a year (source: [Wikipedia, Algerian wine](https://en.wikipedia.org/wiki/Algerian_wine))
- Morocco's 14 AOGs by region, Coteaux de l'Atlas 1er Cru (2001), production peaking above 3 mhl in the 1950s and about 400,000 hl in 2013, state control from 1973, and Château Roslane as the first "château" (2009) (source: [Wikipedia, Moroccan wine](https://en.wikipedia.org/wiki/Moroccan_wine))
- Brahim Zniber's group held about 85% of Moroccan production and 8,300 ha by 2016; he died on 29 September 2016 (source: [Wikipedia, Brahim Zniber](https://en.wikipedia.org/wiki/Brahim_Zniber))
- Egypt: Gianaclis (1882), nationalisation (1963), privatisation (1997), Heineken (2002), Kouroum of the Nile's Bannati (source: [Wikipedia, Egyptian wine](https://en.wikipedia.org/wiki/Egyptian_wine). Egypt had 86 kha in 2025 , [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))

### Inferences
- Moroccan and Algerian AOG points sit on the main town of each zone and are all marked `approx`.

### Gaps
- Sidi Salem (Tunisia), Beni Sadden and Sahel (Morocco) have no verified location, so they remain content-only with no lat/lon.
- I found no 2020s statistics for Tunisia, Morocco or Libya. Libya's alcohol ban (1969) is from my own knowledge.
- Celliers de Meknès and the Kouroum of the Nile winery coordinates were not found in OSM, so they are not mapped as separate sites. Roslane stands in for Celliers de Meknès.

## Georgia

### Takeaway
Georgia has 33 registered appellations (PDOs) as of late 2025, not about 29 to 30. Recent additions include Obcha (30th), Lechkhumi, Racha (2025) and Sazanos Otskhanuri (33rd). The vineyard covered 59,900 ha at the end of 2024, the 2025 harvest of about 336,000 t processed was a 30-year record, and production was 2.6 mhl.

### Cited Findings
- The full list of 33 in order: Kindzmarauli, Manavi, Kakheti, Napareuli, Teliani, Mukuzani, Tsinandali, Akhasheni, Gurjaani, Khvanchkara, Ateni, Sviri, Vazisubani, Kardenakhi, Tibaani, Tvishi, Kvareli, Kotekhi, Khashmi Saperavi, Bolnisi, Salhino Ojaleshi, Akhmeta, Tsarapi, Akhoebi, Maghraani Kisi, Okureshi Usakhelouri, Zegaani, Asuretuli Shala, Okami, Obcha, Lechkhumi, Racha, Sazano's Otskhanuri (source: [CBW (Sazano's Otskhanuri article)](https://cbw.ge/wine/sazanos-otskhanuri-added-to-the-list-of-georgian-wines-registered-with-protected-designation-of-origin))
- The original 18 come from Presidential Decree N 88 of 28 February 2002 (source: [WIPO Lex](https://www.wipo.int/wipolex/en/text/533874))
- The Racha appellation was granted in 2025 (source: [Georgian Ministry of Agriculture, 2 October 2025](https://mepa.gov.ge/En/News/Details/24146))
- Registration years for 29 of them (2005 to 2022) and their styles (source: [Georgia.to, citing the NWA 2023 catalogue](https://georgia.to/wine-appellations/))
- Obcha rules (amber Tsolikouri, red Otskhanuri Sapere; it was the 30th PDO) (source: [CBW](https://cbw.ge/wine/obcha-added-to-georgias-list-of-protected-designation-of-origin-wines))
- Zegaani (organic qvevri Saperavi) and Okureshis Usakhelouri (Tsageri) (source: [CBW](https://cbw.ge/wine/zegaani-and-okureshis-usakhelouri-added-to-list-of-wines-of-protected-designation-of-origin))
- Wikipedia's list says "44 registered with Sakpatenti" but only tabulates 28 (source: [Wikipedia](https://en.wikipedia.org/wiki/List_of_Georgian_wine_appellations). This conflicts with CBW's 33. I used 33, the NWA-derived list. The 44 may include spirits or mineral waters.)
- The 2025 harvest was about 336,000 t (Kakheti about 327,000 t, 500+ companies, about 22,000 growers) (source: [CBW](https://www.cbw.ge/wine/within-rtveli-2025-a-record-high-336000-tons-of-grapes-were-processed))
- The vineyard was 59,900 ha at the end of 2024, up 81% on the 2014 census (source: [FreshPlaza (Geostat)](https://www.freshplaza.com/asia/article/9852442/georgia-s-vineyard-area-up-81-over-ten-years/))
- Exports from January to November 2025 were 82.3 ML of wine worth USD 245 M to 70 countries (source: [1TV](https://1tv.ge/lang/en/news/national-wine-agency-in-january-november-2025-georgia-received-over-usd-half-a-billion-from-export-of-wine-alcoholic-beverages/))
- Production was 2.6 mhl in 2025, ranking 16th (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Tsinandali: Alexander Chavchavadze (1786 to 1846); the oenotheque holds 16,500+ bottles from 1814; Shamil's raid of 2 July 1854 and the hostage exchange of 22 March 1855; the cellar passed to the Romanovs in 1888; coordinates 41.8947, 45.5756 (source: [Wikipedia, Tsinandali](https://en.wikipedia.org/wiki/Tsinandali))
- The Alaverdi cellar dates to the 11th century, holds 40+ qvevri and was restored in 2006 with Badagoni (source: [Badagoni](https://badagoni.com/alaverdi-wine-cellar/). I could not confirm "1011" specifically, so the text says early 11th century.)
- The Khareba tunnel is 7.7 km long, was built in the 1950s as a military facility and keeps 12 to 14°C (source: [Georgia.to](https://georgia.to/places-to-go/kakheti/khareba-winery-tunnel/))
- UNESCO inscribed qvevri winemaking in 2013, and it entered the national list in 2011 (source: [Wikipedia, Kvevri](https://en.wikipedia.org/wiki/Qvevri))
- The 2006 Russian embargo; 64% of exports went to Russia as of 2016 (source: [Wikipedia, Georgian wine](https://en.wikipedia.org/wiki/Georgian_wine))

### Inferences
- All 33 PDOs have no polygons, so each carries lat/lon. Village-named PDOs sit on the village; regional ones (Kakheti, Racha, Lechkhumi) sit on a representative town.

### Gaps
- The grape and style rules for Racha and Lechkhumi were not found. The text says so explicitly.
- Registration years for Obcha (about 2024 to 2025), Lechkhumi and Salkhino Ojaleshi are uncertain.
- The Teliani and Akhoebi village coordinates are approximate (not found in OSM). Okro's Wines is placed in Sighnaghi approximately.

## Armenia and Azerbaijan

### Takeaway
Neither country has an appellation system. Armenia's story rests on Areni-1, Urartu and the brandy legacy plus the post-2010 revival. Azerbaijan's rests on Helenendorf's Swabian colonists and Madrasa.

### Cited Findings
- The Yerevan brandy factory opened in 1887 (source: [Wikipedia, Armenian wine](https://en.wikipedia.org/wiki/Armenian_wine))
- The Areni wine festival has run since 2009 (source: [Wikipedia, Areni-1 winery](https://en.wikipedia.org/wiki/Areni-1_winery))
- Azerbaijan: Württemberg colonists arrived about 1817 to 1818, the Göygöl wine plant dates from 1860 (Vinagro), Madrasa comes from Shamakhi, the 2012 to 2020 state programme, about 2.1 Mt of grapes by 1982 (source: [Wikipedia, Azerbaijani wine](https://en.wikipedia.org/wiki/Azerbaijani_wine))
- Coordinates for Areni-1, Noravank, Zorah (Rind), Voskevaz, ArmAs, the Yerevan Brandy Company, Erebuni, Göygöl and Chabiant come from OSM

### Gaps
- No reliable current vineyard or production figures for Armenia or Azerbaijan were found, and the stats notes say so.
- The Shustov 1899 purchase and the Pernod Ricard 1998 acquisition are from my own knowledge and were not confirmed on the fetched page.
- Nagorno-Karabakh's 2023 change of control is described from general knowledge.

## Moldova

### Takeaway
OIV puts Moldova's 2025 vineyard at 110 kha, but the vine register counts only about 47,700 ha of commercial wine grapes (2024), with roughly 2,000 ha lost a year. 2025 brought 259,000 t processed and production of 1.8 mhl (+53%). The country has three wine PGIs plus Divin, and Ciumai and Romănești are EU-protected appellations of origin.

### Cited Findings
- Moldova had 110 kha in 2025 and produced 1.8 mhl (+53.1%, highest since 2018), ranking 19th (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- The register shows 47.7 kha of commercial wine grapes. From 2014 to 2024, 20,527 ha were grubbed and 3,878 ha planted. Almost half the area is over 30 years old. Native varieties cover 1,775 ha (source: [Logos Press, April 2025](https://logos-pres.md/en/news/moldova-loses-almost-2-thousand-hectares-of-vineyards-per-year))
- 2025: 259,000 t of grapes (+45%) and exports of 117 ML worth USD 212 M (source: [Logos Press](https://logos-pres.md/en/news/moldovan-winemaking-progressive-development))
- 2024 exports were 144 ML, USD 234 M+, to 73 countries; there are 250+ wineries; the OIV Congress was held in Chișinău on 16 to 20 June 2025; the ONVV and Wine of Moldova brand date from 2013 (source: [Adnkronos/PRNewswire](https://www.adnkronos.com/immediapress/eng/moldova-to-host-the-46th-world-congress-of-vine-and-wine-in-the-country-with-the-highest-vineyard-density-per-capita_4b125YbUEqT3yypHgLZDql) (promotional))
- January to July 2026 exports were USD 116.2 M (−5%) to 65 countries, with Romania the top bottled market (source: [Forbes Romania](https://www.forbes.ro/republica-moldova-isi-extinde-exporturile-de-vin-romania-este-principala-destinatie-pentru-produsele-imbuteliate-518047))
- Codru, Ștefan Vodă, Valul lui Traian and Divin were protected in the EU on 18 October 2016; Ciumai and Romănești were protected earlier (source: [AGEPI](https://agepi.gov.md/en/node/9982))
- PGI hectares: Codru 61,200, Valul lui Traian 43,200, Ștefan Vodă 10,000. Divin requires double distillation and at least 3 years in oak (source: [Decanter, sponsored](https://www.decanter.com/sponsored/wine-in-moldova-now-509474/))
- History: about 220,000 ha by 1960; 30% destroyed 1985 to 1987; the 2006 and 2013 embargoes; Mileștii Mici in the Guinness record (2005); Cricova has 120 km of tunnels (source: [Wikipedia, Moldovan wine](https://en.wikipedia.org/wiki/Moldovan_wine))
- Cricova: the tunnels became a wine city in the 1950s, run 100 m deep, hold about 1.3 M bottles (including Göring's cellar) and the oldest bottle dates from 1902; Gagarin visited in 1966 (legend) and Putin held his 50th birthday there (source: [Wikipedia, Cricova](https://en.wikipedia.org/wiki/Cricova_(winery)))
- Mileștii Mici: founded 1969, 200 km of galleries with 55 km in use, Guinness record August 2005, nearly 2 M bottles (source: [Wikipedia](https://en.wikipedia.org/wiki/Mile%C8%99tii_Mici_(winery)))
- Purcari: 1827 decree of Nicholas I, Paris gold in 1878, Queen Victoria, 260 ha (source: [Wikipedia](https://en.wikipedia.org/wiki/Purcari_(winery)))
- Castel Mimi: 1893 to 1901, about 300,000 L capacity, restored 2011 to 2016, EPC summit on 1 June 2023 (source: [Wikipedia](https://en.wikipedia.org/wiki/Mimi_Castle))

### Inferences
- "Highest vineyard density in the world" is a Wine of Moldova and OIV-promotional framing, so the atlas words it per capita and per area with both figures.
- National Wine Day on the first weekend of October since 2002 comes from my own knowledge. I could not fetch it (search budget exhausted, and wineofmoldova.com was blocked).

### Gaps
- The Carpe Diem and Fautor locations were unverified, so they are not mapped.
- The Moldovan PDO list beyond Ciumai and Romănești (for example, any newer national PDOs) was not verified.
- The Cricova coordinate comes from the OSM "Combinatul de Vinuri Cricova" landuse polygon, so it is approximate.

## Ukraine, Russia and Crimea

### Takeaway
Crimea is presented as internationally recognised Ukrainian territory under Russian occupation since 2014; its sites are filed under `ua`. Note that the site's base layer (`site/data/base/countries.geojson`) assigns Crimea to `ru`, so integration may flag those five points as "far" from Ukraine. Russia produced 5.7 mhl in 2025 (OIV) under its 2020 wine law.

### Cited Findings
- Ukraine: the Swiss colony at Shabo (1822), Magarach (1828), Golitsyn and Novy Svet, about 800 km² destroyed in 1986, about 17,000 ha and 60% of wineries lost with Crimea (source: [Wikipedia, Ukrainian wine](https://en.wikipedia.org/wiki/Ukrainian_wine))
- War damage: Prince Trubetskoi lost about 32,000 bottles to looting and buildings were destroyed; Artwinery relocated from Bakhmut; Shabo has 1,200 ha; 585 ha were damaged at Olvia and Tairovo (source: [Decanter, March 2023](https://www.decanter.com/wine-news/ukraine-winemakers-look-to-eu-and-exports-498896/); [Espreso](https://global.espreso.tv/russian-forces-destroy-kherson-winery-which-survived-two-world-wars))
- Massandra was founded by Golitsyn in 1894 and holds about 1 M bottles (source: [Wikipedia, Massandra](https://en.wikipedia.org/wiki/Massandra))
- Abrau-Durso was founded on 25 November 1870 as an imperial winery. Golitsyn arrived in 1891, and the cellars held 13,000+ bottles of sparkling by 1897 (source: [Wikipedia, Abrau-Dyurso](https://en.wikipedia.org/wiki/Abrau-Dyurso))
- The Russian law came into force on 26 June 2020. It covers "Wine of Russia", ZGU and ZNMP, with 15 ZGU and 23 ZNMP by 2020 (source: [SWN](https://swn.ru/en/articles/how-russian-wine-laws-are-changing))
- Approved GI names include Kuban, Kuban. Taman Peninsula, Don Valley, Stavropol, Dagestan, Terek Valley, Lower Volga and Crimea (source: [Kuban-Vino](https://en.kuban-vino.ru/about/events/news/916/))
- Russia had 110 kha in 2025 and produced 5.7 mhl, ranking 11th (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Tariffs on "unfriendly" countries' wine were 20% in 2023 and 25% in 2024 (source: [sector report PDF](https://wcfhbzbmxztdzwjaujoq.supabase.co/storage/v1/object/public/insights/sector-spotlight/2026-02-23-russia-wine/russia-wine-en.pdf) (secondary source))

### Gaps
- No complete current ZNMP list was found (the Russian search failed and the budget ran out), so Russian appellations are not individually profiled.
- The 2023 occupation-era "nationalisation" and auction of Massandra is from my own knowledge and was not re-fetched.
- The Beykush and Kolonist coordinates were not found and they are not mapped.

## Central Asia, Iran, Iraq

### Takeaway
Central Asia, Iran and Iraq are covered as minor or emerging countries, focused on archaeological sites (Hajji Firuz, Godin Tepe, Old Nisa, Panjakent, Nimrud and Nineveh) and on Samarkand's Khovrenko winery. Iran's vineyard (128 kha) and Uzbekistan's (125 kha) are large but almost entirely table and raisin grapes.

### Cited Findings
- Uzbekistan had 125 kha in 2025, ranking 14th by area; Iran had 128 kha, ranking 13th (source: [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- Khovrenko: D. M. Filatov founded it, M. A. Khovrenko managed it, it is at 58 Makhmud Kashgari St, and its wine Gulyakandoz won medals (source: [Eurasia Travel](https://eurasia.travel/uzbekistan/samarkand/winemaking-museum/). The 1868 date appears only as "over 150 years", so the text says "according to its own history".)
- Iran had up to 300 wineries before 1979 and has none now (source: [Wikipedia, Persian wine](https://en.wikipedia.org/wiki/Persian_wine))
- Arba Wine's location (Almaty) comes from OSM (source: `work/c9/coords/rest2.out`)

### Gaps
- The Kazakh wine article fetch failed (usage cap), so Kazakhstan is brief, with no statistics.
- The Khovrenko coordinate is the Samarkand city centroid (approx). I could not find the building in OSM.
- The Old Nisa ostraca figure (2,000+) and the Nimrud wine lists are from my own knowledge.
- The Syrah-not-from-Shiraz DNA finding (Bowers and Meredith) is from my own knowledge.

## Integration notes for the build step
- Appellation profiles without polygons carry `lat`, `lon` and `coord_quality` (65 profiles: Georgia 33, Moldova 6, Tunisia 6, Algeria 7, Morocco 13). `integrate.py` picks these up as "profile lat/lon" extra points.
- Three profiles have no coordinates: Sidi Salem, Beni Sadden and Sahel.
- Categories used: Greece, Cyprus, Malta and Georgia "PDO"; Moldova "IGP"/"PDO"; Tunisia "AOC"; Algeria "AOG"; Morocco "AOG"/"AOC".
- Cyprus `match` keeps the register name with an en dash ("Βουνί Παναγιάς – Αμπελίτης"). The dash appears only in `match`, never in display text.
