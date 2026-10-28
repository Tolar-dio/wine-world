# Oceania, southern and eastern Africa, East/South/Southeast Asia (content file c12)

Deliverable: `/home/claude/winesite/data/content/c12_oceania_africa_asia.json` (merged; validated with `python3 -m json.tool` and `scripts/c12/merge_c12.py`: 0 errors, 0 warnings). Counts: 19 countries, 35 regions, 302 appellations (AU 114, ZA 150, NZ 22, CN 10, JP 5, IN 1), 227 sites. Part files: `work/c12/parts/{au,nz,za,cn,jp,misc}.json`. Build scripts: `scripts/c12/` (`part_*.py`, `au_*.py`, `za_*.py`, `enrich.py`, `merge_c12.py`, `geocode.py`). Every appellation `match` joins to a polygon in `site/data/geo/{au,nz,za,jp}.geojson`, except 27 point-only entries that carry lat/lon (the 7 NZ sub-GIs, 3 NZ enduring GIs, AU super zone/national/territory GIs, ZA Greater Cape and North West, all Chinese GIs and producing areas, and India's Nashik Valley Wine). Research constraint: the shared web-search budget ran out twice during the session, so later verification relied on direct fetches of primary pages and saved Wikipedia pages; claims I could not verify were softened or removed (see Gaps).

## Australia: GI system, history, regions and sites

### Takeaway
Australia has 28 zones, 65 regions and 14 subregions (plus state, super-zone and national GIs). Registration year, vine area, climate and crush data for every GI come from Wine Australia's own feature service. The story's spine is South Australia's phylloxera quarantine, which preserved pre-1900 own-rooted vines. The 2026 crush (1.27 Mt) was the smallest since 2000.

### Cited Findings
- Full GI hierarchy (zones, regions, subregions; Adelaide super zone; Great Western's legally enforceable conditions of use; Murray Darling and Swan Hill in both NSW and Vic) — [Wine Australia GI register](https://www.wineaustralia.com/labelling/register-of-protected-gis-and-other-terms/geographical-indications)
- Per-GI registration year, vine area (ha), altitude, growing degree days (Oct-Apr), growing-season rain, January mean temperature, crush 2020-2026 (e.g. Barossa Valley 1997, 11,156 ha, 1,968 GDD; Coonawarra 2003, 5,292 ha, 1,571 GDD; Tasmania 788 GDD; Riverland 2026 crush 389,392 t) — [Wine Australia Open Data feature service](https://services6.arcgis.com/s8j6JbJJCqmhNgh7/arcgis/rest/services/Wine_Geographical_Indications_Australia/FeatureServer)
- 2026 crush 1.27 Mt, smallest since 2000, down 306,334 t (19%) on 2025, 25% below 10-year average of 1.69 Mt; reds down 29%; average grape price $570/t — [Wine Australia National Vintage Report 2026](https://www.wineaustralia.com/news/media-releases/national-vintage-report-2026)
- Australia 159 kha vineyard, 11.3 mhl in 2025, largest Southern Hemisphere producer — [OIV State of the World Wine Sector in 2025 (May 2026)](https://www.oiv.int/what-we-do/global-report)
- Oldest vines: Langmeil Freedom 1843 Shiraz; Cirillo Grenache 1848; Hewitson Old Garden Mourvèdre 1853; Tahbilk Shiraz 1860 (Marsanne 1927); Tyrrell's Old Patch Shiraz 1867, HVD Chardonnay 1908; Penfolds Block 42 Kalimna Cabernet 1888; Yalumba Tri-Centenary Grenache 1889; Saltram Metala 1891. Barossa Old Vine Charter (Yalumba, 2007): Old 35+, Survivor 70+, Centenarian 100+, Ancestor 125+ — [Decanter, Australia's oldest vines](https://www.decanter.com/premium/australia-oldest-vines-and-10-wines-to-try-499130)
- Clare screwcap: announced 11 August 2000 by 14 wineries (Mount Horrocks, Mitchell, Taylors, Olssen, Stringy Brae, Clos Clare, Knappstein, Grosset, Leasingham, Wilson, Tim Gramp, Stephen John, Kirribilly, Eldredge); Saverglass bottles, Pechiney caps; cork taint at least 5% — [Clare Valley Wine & Grape Association](https://clarevalleywine.com.au/news/clare-valley-celebrates-20-years-of-screwcapped-riesling-huon-hooke-in-wine-spotlights)
- Seppeltsfield Centennial Collection: unbroken single-vintage Tawny since 1878 (149 vintages); current release the 1926 100 Year Old Para Vintage Tawny, in 100 ml bottles — [Seppeltsfield Centennial Collection](https://www.seppeltsfield.com.au/centennial-collection)
- Rutherglen Muscat classification: Rutherglen (avg 3-5 yrs), Classic (6-10), Grand (11-19), Rare (20+); Muscat à Petits Grains Rouge ('Rutherglen Brown Muscat'); harvested 17-18 Baumé, over 20 in good years; evaporation takes about half a barrel over 20 years — [Muscat of Rutherglen brochure](https://www.explorerutherglen.com.au/wp-content/uploads/sites/68/MOR-Brochure-A5-digital.pdf)
- Quality wine terms Cream, Crusted/Crusting, Ruby, Solera, Tawny, Vintage with definitions — [Wine Australia Quality Wine Terms PDF](https://www.wineaustralia.com/getmedia/6fa35690-95eb-4519-a6f8-aae0359aa822/AGWA-Quality-Wine-Terms-Quality-Wine-Terms.pdf)
- Grange: first experimental vintage 1951 by Max Schubert; ordered to stop in 1957, continued in secret to 1959; 'Hermitage' dropped with 1990 vintage — [Wikipedia, Penfolds Grange](https://en.wikipedia.org/wiki/Penfolds_Grange); Schubert visited Bordeaux in 1949-50 — [Wikipedia, Max Schubert](https://en.wikipedia.org/wiki/Max_Schubert)
- Busby toured Spain and France 1831, returned to Sydney October 1832, planted at Waitangi later — [Wikipedia, James Busby](https://en.wikipedia.org/wiki/James_Busby)
- China trade war: started 11 May 2020; wine restrictions lifted in 2024; final measures lifted 20 December 2024 — [Wikipedia, Australia-China trade war](https://en.wikipedia.org/wiki/Australia%E2%80%93China_trade_war)
- Wynns: founded 1891 by John Riddoch; bought by David and Samuel Wynn in 1951 (renamed from Chateau Comaum) — [Wikipedia, Wynns Coonawarra Estate](https://en.wikipedia.org/wiki/Wynns_Coonawarra_Estate); Riddoch bought Yallum 1861 and founded the Coonawarra fruit colony — [Wikipedia, John Riddoch](https://en.wikipedia.org/wiki/John_Riddoch)
- Chateau Tanunda built 1890 of Bethany bluestone; Seppelt-owned 1916-1998 — [Wikipedia, Chateau Tanunda](https://en.wikipedia.org/wiki/Chateau_Tanunda); Tahbilk founded 1860, oldest family-owned winery in Victoria — [Wikipedia, Tahbilk](https://en.wikipedia.org/wiki/Tahbilk); Clonakilla founded 1971, Shiraz Viognier from 1992 — [Wikipedia, Clonakilla](https://en.wikipedia.org/wiki/Clonakilla)

### Inferences
- The figure of 85 percent for GI/variety/vintage claims, the 1994 EU agreement, and the retirement of 'Tokay' (Topaque), 'sherry' (Apera) and 'port' are standard reference knowledge consistent with the register's EU-related pages, but I did not fetch a primary source for the exact years.
- Sites are geocoded with OSM Nominatim (estate or cellar-door nodes), or Wikipedia coordinates where available; where only a road or locality matched, `coord_quality` is `approx`.

### Gaps
- Barossa Grounds names and McLaren Vale district names are given as informal and widely used. The official pages (barossawine.com, mclarenvale.info) returned 403/404 and search budget was exhausted, so the exact current district list was not verified.
- Turkey Flat's 1847 planting date and Hill of Grace's 1860s planting date come from expertise and are not in the Decanter list.
- The China tariff rates (116.2-218.4%) and the March 2024 removal date come from expertise; Wikipedia confirms only that wine restrictions were lifted in 2024.

## New Zealand: GIs, history and sites

### Takeaway
IPONZ lists 3 enduring GIs and 19 registered wine GIs, the latest being Bannockburn (1 Feb 2022). The 2025 planted area was 44,184 ha: Marlborough holds 73%, Sauvignon Blanc is 82% of whites and Pinot Noir 75% of reds. The 2025 vintage of 3.7 mhl was the second largest on record.

### Cited Findings
- Registered GIs with numbers and dates: Marlborough 1004, Hawke's Bay 1005, Nelson 1006 (26 Jun 2018), Central Otago 1007 (29 Oct 2018), Gisborne 1008, Waipara Valley 1010 (3 Dec 2018), Martinborough 1011, Wairarapa 1012, Kumeu 1013 (29 Oct 2018), Gladstone 1014 (3 Jan 2019), Waiheke Island 1015, North Canterbury 1016 (29 Jun 2020), Canterbury 1017, Auckland 1018 (29 Oct 2018), Waitaki Valley North Otago 1019 (3 Dec 2018), Central Hawke's Bay 1020 (28 Jan 2019), Matakana 1021, Northland 1022, Bannockburn 1028 (1 Feb 2022); enduring New Zealand/North Island/South Island 27 Jul 2017; most others 26 Feb 2018 — [IPONZ GI register](https://www.iponz.govt.nz/get-ip/geographical-indications/register/)
- 2025 planted area by region (Marlborough 32,042 ha; Hawke's Bay 4,615; Central Otago 2,099; North Canterbury 1,539; Gisborne 1,325; Wairarapa 1,189; Nelson 970; Auckland 253; Northland 72; Waitaki 49); 2,019 vineyards; whites 37,425 ha (Sauvignon Blanc 82%, Chardonnay 8%, Pinot Gris 7%), reds 6,804 ha (Pinot Noir 75%, Merlot 12%, Syrah 6%) — [NZ Winegrowers Vineyard Report 2026](https://www.nzwine.com/media/5fzng52v/vineyard-report-2026-final.pdf)
- 3.7 mhl in 2025, +31.5% on frost-affected 2024, second-largest harvest — [OIV 2025 report](https://www.oiv.int/what-we-do/global-report)
- SWNZ members cover 98% of vineyard area — [NZ Winegrowers statistics page](https://www.nzwine.com/en/news-media/statistics-reports/)

### Inferences
- History points (Marsden 1819, Busby at Waitangi, Mission Estate 1851, Bragato 1895, Montana 1973, Cloudy Bay 1985, 1986 vine pull, 2001 screwcap initiative) come from expertise, consistent with the saved Wikipedia pages on NZ wine, Romeo Bragato, Samuel Marsden and Cloudy Bay.
- NZ polygons are admin proxies (geodata agent); the 7 small sub-GIs have no polygons and are given representative points.

### Gaps
- Exact Gimblett Gravels area (about 800 ha) and its trademark year (2001) come from expertise; the official site was not fetched.

## South Africa: Wine of Origin units, history and sites

### Takeaway
I used the official February 2026 list of Wine of Origin production areas, which has new layers (Greater Cape, Cape Coast, a Cape West Coast subregion), new districts (Cape Town, Still Bay, Lower Duivenhoks River, Central Orange River, Ceres Plateau, Nuveld-Karoo, Prince Albert) and many new wards. All 148 polygons in `za.geojson` are matched.

### Cited Findings
- Full hierarchy, February 2026 (e.g. Walker Bay wards: Bot River, Hemel-en-Aarde Ridge, Hemel-en-Aarde Valley, Sunday's Glen, Springfontein Rim, Stanford Foothills, Upper Hemel-en-Aarde Valley; Stellenbosch wards: Banghoek, Bottelary, Devon Valley, Jonkershoek Valley, Papegaaiberg, Polkadraai Hills, Simonsberg-Stellenbosch, Vlottenburg; Swartland wards incl. Paardeberg/Perdeberg, Paardeberg South, Piket-Bo-Berg, Porseleinberg, Riebeekberg, Riebeeksrivier, Malmesbury, St Helena Bay; Lanseria ward under no geographical unit) — [WOSA, Production areas Feb 2026 (PDF)](https://www.wosa.co.za/wosadocs/22026/Production_areas_-_Eng__Afr_-_Feb26.pdf)
- About 86,525 ha of wine grapes; 32 districts and about 102 wards; descriptions of Constantia (about 1,000 mm rain, Feb mean 20.6 C), Malgas (350 mm), Central Orange River (6,029 ha), Wellington (85% of cuttings), Tulbagh cold trap — [WOSA Winelands of South Africa](https://www.wosa.co.za/The-Industry/Winegrowing-Areas/Winelands-of-South-Africa/)
- 2025 structure: 2,176 primary grape producers, 507 cellars crushing grapes — [WOSA/SAWIS statistics](https://www.wosa.co.za/The-Industry/Statistics/SA-Wine-Industry-Statistics/)
- 109 kha total vineyard, 10.2 mhl in 2025 (+16.2%) — [OIV 2025 report](https://www.oiv.int/what-we-do/global-report)
- First wine 2 Feb 1659; KWV 1918; WO 1973 — [Wikipedia, South African wine](https://en.wikipedia.org/wiki/South_African_wine); Constantia granted 1685, split after 1712, Cloete bought 1778, cellar 1791, government bought 1885 — [Wikipedia, Groot Constantia](https://en.wikipedia.org/wiki/Groot_Constantia); Napoleon, Austen, Dickens, Baudelaire, Klein Constantia revival 1986 — [Wikipedia, Vin de Constance](https://en.wikipedia.org/wiki/Vin_de_Constance)
- Pinotage cross 1924/25 by Perold; first wine at Elsenburg 1941; Bellevue champion 1959; first labelled 1961 (Lanzerac) — [Wikipedia, Pinotage](https://en.wikipedia.org/wiki/Pinotage)
- Columella 2000 (17 barrels), Palladius 2002 — [Wikipedia, Eben Sadie](https://en.wikipedia.org/wiki/Eben_Sadie)
- Old Vine Project founded 2002 by Rosa Kruger; Certified Heritage Vineyard = 35+ years; OIV adopted the 35-year benchmark in 2024 — [Old Vine Project](https://www.oldvineproject.co.za/)
- Chenin Blanc just over 18% of vineyard (2019) — [BKWine](https://www.bkwine.com/news/south-africas-vineyard-surface-declining-but-revenues-are-rising/)

### Inferences
- The overview's account of the quota system, the 1992-1997 dismantling of the KWV's statutory role, the 'dop' system and the Swartland Revolution festival dates (2010-2015) comes from expertise, not a fetched primary source.

### Gaps
- No current (2025) Chenin Blanc share was fetched. The text uses "about 18 percent", from a 2019 source.
- The exact demarcation dates of the newest wards (Stanford Foothills, Springfontein Rim, Shaw's Mountain, Riebeeksrivier, Wellington wards) are unknown. SAWIS was unreachable (connection reset).

## China

### Takeaway
China has the world's third-largest vineyard (733 kha, mostly table grapes), but wine output fell to 2.2 mhl in 2025 (18th in the world). Four wine GIs are EU-protected: Helan Mountain East Foothill, Yantai, Shacheng and Huanren Icewine. Ningxia (about 40,400 ha, 131 wineries) hosted the OIV Congress in October 2026.

### Cited Findings
- 733 kha, 2.2 mhl, -17.8%, peak at 5th place in 2012, now 18th; OIV Congress 12-18 Oct 2026 in Ningxia (Yinchuan) — [OIV 2025 report](https://www.oiv.int/what-we-do/global-report)
- EU-protected Chinese wine GIs: 贺兰山东麓葡萄酒, 烟台葡萄酒, 沙城葡萄酒, 桓仁冰酒 — [EU-China GI list (PDF)](https://sistemaproprietaintellettuale.it/pdf/Lista%20Indicazioni%20geografiche%20Cina.pdf); [Grape Wall of China](https://www.grapewallofchina.com/2021/03/01/gi-jiu-eu-china-pact-on-geographical-indications-protects-wine/)
- Ningxia 606,000 mu (about 40,400 ha), 131 wineries (2026) — [Vino Joy News, March 2026](https://vino-joy.com/2026/03/24/ningxias-helan-mountain-east-foothills-showcase-at-prowein-as-exports-surge/)
- Classification introduced 2013 (10 Fifth Growths), five tiers from 2016, re-evaluated every two years — [Decanter China](https://www.decanterchina.com/en/news/ningxia-releases-latest-winery-classification-listing); nine Second Growths and an empty First Growth tier in 2021 — [Vino Joy News 2021](https://vino-joy.com/2021/10/06/ningxia-adds-six-more-second-growth-estates-but-top-tier-still-non-taken/)
- Jiahu c. 7000 BC; Zhang Qian and Dayuan; Gaochang conquered 641; Changyu 1892; Dynasty 1980 — [Wikipedia, Chinese wine](https://en.wikipedia.org/wiki/Chinese_wine); Great Wall 1983, Shacheng — [Wikipedia, Great Wall Wine](https://en.wikipedia.org/wiki/Great_Wall_Wine); Changyu Grand Cellar, Moser XV — [Wikipedia, Changyu](https://en.wikipedia.org/wiki/Changyu_Pioneer_Wine); Cabernet Gernischt = Carmenère — [Wikipedia](https://en.wikipedia.org/wiki/Cabernet_Gernischt); Ao Yun (first vintage 2013, released 2016; 320 plots) — [Wikipedia, Ao Yun](https://en.wikipedia.org/wiki/Ao_Yun); Ningxia history and the 2011 Decanter trophy — [Wikipedia, Ningxia wine](https://en.wikipedia.org/wiki/Ningxia_wine)
- Domaine Pushang exists, makes Marselan, and is labelled Helan Mountain East — [Decanter China DWWA listing](https://www.decanterchina.com/en/wine-reviews/2025-dwwa-award-winning-chinese-wines-gold/domaine-pushang-marselan-helan-mountain-east-ningxia-china-2022)

### Inferences
- Changli is described as a national GI (AQSIQ-era protection) from expertise. Xinjiang areas (Yanqi, Tianshan North, Turpan) and Hexi Corridor are entered as "Producing area", not GI. Decanter China (2015) reports that Turpan and Hoxud were proposed for GI status.
- All Chinese entries are points (no official boundary data available).

### Gaps
- The national GI registration years for Chinese wine areas were not verified, so the `created` field records only the 2021 EU protection.
- Several winery coordinates in Ningxia are approximate (Nominatim failed on Chinese winery names).

## Japan

### Takeaway
Five NTA wine GIs (Yamanashi 2013; Hokkaido 2018; Yamagata, Osaka, Nagano 2021), each a whole prefecture and matched to the jp.geojson polygons. Koshu is mostly vinifera with East Asian wild Vitis ancestry (PLOS ONE 2015).

### Cited Findings
- GI designation dates — [NTA geographical indications](https://www.nta.go.jp/english/taxes/liquor_administration/geographical/02.htm)
- Koshu as a vinifera × East Asian Vitis hybrid; Yamanashi has more than 80 wineries, about 40% of domestic production and 95% of Koshu — [Wikipedia, Koshu (grape)](https://en.wikipedia.org/wiki/Koshu_(grape)), citing Goto-Yamamoto et al., PLOS ONE 2015
- 718 legend; 1875 Kofu; 1877 Takano and Tsuchiya to Troyes; Kawakami Zenbei (1868-1944), Iwanohara, Muscat Bailey A and Black Queen; 2017 NTA data (Japan Wine about 4%) — [Wikipedia, Japanese wine](https://en.wikipedia.org/wiki/Japanese_wine)

### Gaps
- The 2018 labelling-rule details (85% rule, 'Japan Wine' definition), Domaine de Montille Hakodate (2017) and Domaine Takahiko (2010) come from expertise. The Vitis davidii attribution is from expertise, consistent with but not quoted from the PLOS paper.

## India, Thailand, Indonesia, Vietnam, Myanmar, South Korea, Taiwan, Cambodia

### Takeaway
India's vineyard is 197 kha (seventh in the world) but mostly table grapes. Its only wine GI is Nashik Valley Wine (2010-11). The other Asian countries are tropical "new latitude" producers, with two crops a year and dry-season harvests.

### Cited Findings
- India 197 kha, growing 4.6% a year since 2019, 7th in the world — [OIV 2025 report](https://www.oiv.int/what-we-do/global-report)
- Nashik valley wine GI (2010-11) — [Wikipedia, List of GIs in India](https://en.wikipedia.org/wiki/List_of_geographical_indications_in_India); Sula founded 1999 by Rajeev Samant — [Wikipedia, Sula Vineyards](https://en.wikipedia.org/wiki/Sula_Vineyards); Indian wine history, double cropping, regions — [Wikipedia, Indian wine](https://en.wikipedia.org/wiki/Indian_wine)
- Thailand: King Narai grapes; Hua Hin and Khao Yai; two crops a year — [Wikipedia, Thai wine](https://en.wikipedia.org/wiki/Thai_wine)
- Vietnam: French plantings near Ba Vì; Ninh Thuận/Phan Rang; up to three harvests — [Wikipedia, Vietnamese wine](https://en.wikipedia.org/wiki/Vietnamese_wine)
- Taiwan: monopoly; private winemaking from 2002; Black Queen and Golden Muscat introduced in the 1950s; first international gold in 2014 — [Wikipedia, Taiwanese wine](https://en.wikipedia.org/wiki/Taiwanese_wine)
- Site coordinates (GranMonte, PB Valley, Monsoon Valley, Hatten, Aythaya, Red Mountain, York, Sula, Akluj) via OSM Nominatim

### Gaps
- No primary sources were fetched for Indonesia (Hatten 1994), Myanmar (Aythaya 1999, Red Mountain), Korea (Majuang 1977, Yeongdong) or Cambodia (Phnom Banan). These come from expertise and are kept brief.

## Namibia, Zimbabwe, Ethiopia, Kenya, Tanzania, Madagascar

### Takeaway
Brief, specific entries. Ethiopia (Castel at Ziway, 2014 launch) and Tanzania (Dodoma, two harvests) are the best documented; Kenya, Zimbabwe and Madagascar rely mostly on expertise.

### Cited Findings
- Namibia: Klein Windhoek mission vines; Kristall Kellerei (1990, Omaruru); Neuras Shiraz; Thonningii (1997) — [Wikipedia, Namibian wine](https://en.wikipedia.org/wiki/Namibian_wine)
- Ethiopia: Awash 1956; Castel's 120-ha estate near Ziway, 2014; 650 mm rain; two harvests — [Wikipedia, Ethiopian wine](https://en.wikipedia.org/wiki/Ethiopian_wine)
- Tanzania: Hombolo 1938; Maggioni 1957; Dodoma Wine Company 1979; Distell/TDL 1999; CETAWICO 2002; Makutupora grape — [Wikipedia, Tanzanian wine](https://en.wikipedia.org/wiki/Tanzanian_wine)
- Coordinates for Kristall Kellerei, Neuras, Naivasha, Batu/Ziway, Hombolo, Lazan'i Betsileo via OSM Nominatim

### Gaps
- No verified sources were found for Kenya (Rift Valley Winery/Leleshwa), Zimbabwe (Mukuyu, Stapleford) or Madagascar (Clos Nomena, Domaine de Manamisoa); the Wikipedia pages returned 404. The text says only what is widely reported and marks coordinates approximate.
- The shared search budget was exhausted, so these could not be verified further.
