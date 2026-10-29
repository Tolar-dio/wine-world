# Notable vintage events (weather and growing-season history) for the vintage view

Deliverable: `/home/claude/winesite/site/data/vintage/_events.json` (647 events, 62 region/appellation ids, years 1851 to 2025, 116 distinct source URLs, 20 to 44 words per note, no em dashes, every id checked against `_index.json` / `_regions.geojson`). Built by `work/vintage_events/build_events.py` from part files `work/vintage_events/parts/p01..p10_*.py`; raw source extracts in `work/vintage_events/raw/01..12_*.md`; per-source event counts in `work/vintage_events/sources.tsv`. Research date 2026-10-28.

## Which ids should each region resolve to?

### Takeaway
Every requested region resolved to an existing id; appellation ids were preferred where a single AOC/DOC carries the climate data, region ids where no single appellation fits (northern Rhône, Loire overall, Mâconnais, Sonoma County).

### Cited Findings
- Bordeaux overall `fr-bordeaux`; Left Bank `fr-medoc`; Right Bank `fr-saint-emilion`, `fr-pomerol`; Sauternes `fr-sauternes`. Burgundy `fr-bourgogne-cote-d-or` (Côte d'Or AOC polygon), Chablis `fr-chablis`, Mâconnais `region-fr-maconnais`; Champagne `fr-champagne`; northern Rhône `region-fr-northern-rhone` plus `fr-cote-rotie`, `fr-hermitage`; southern Rhône `fr-chateauneuf-du-pape`; Loire `region-fr-loire-valley` plus `fr-sancerre`, `fr-vouvray`, `fr-anjou`, `fr-muscadet`, `fr-savennieres`, `fr-quincy`; Alsace `fr-alsace`; Beaujolais `fr-beaujolais`. Resolved from the site's own geo index. [_index.json](file:///home/claude/winesite/site/data/geo/_index.json)
- Italy: `it-barolo`, `it-barbaresco`, `it-chianti-classico`, `it-brunello-di-montalcino`, `it-amarone-della-valpolicella`, `it-etna`. Spain: `es-rioja`, `es-ribera-del-duero`, `es-priorat`, `es-jerez-xeres-sherry`. Portugal: Port declarations on `pt-porto`, Douro weather on `pt-douro`, `pt-madeira`. Germany `de-mosel`, `de-rheingau`, `de-pfalz`; Austria `at-wachau`; Hungary `hu-tokaj`; Greece `gr-santorini`; Georgia `ge-kakheti`. [_index.json](file:///home/claude/winesite/site/data/geo/_index.json)
- USA: `us-napa-valley`, `region-us-sonoma-county`, `us-willamette-valley`, `us-columbia-valley` (Washington), `us-finger-lakes`. Australia: `au-barossa-valley`, `au-mclaren-vale`, `au-coonawarra`, `au-margaret-river`, `au-yarra-valley`, `au-hunter-valley`, `au-adelaide-hills`. NZ `nz-marlborough`, `nz-central-otago`; South Africa `za-stellenbosch`, `za-swartland`; Argentina `ar-mendoza`; Chile `cl-valle-del-maipo`, `cl-valle-de-colchagua`, `cl-valle-del-maule`. [_regions.geojson](file:///home/claude/winesite/site/data/geo/_regions.geojson)

### Inferences
- Several sources describe a whole zone (Tuscany, Piedmont, South Australia, New Zealand). Those notes sit on the flagship id (`it-chianti-classico`, `it-barolo`, `au-barossa-valley`, `nz-marlborough`). The front end should probably show events from sibling or parent ids too, e.g. Chianti Classico events on the Brunello profile, Barolo events on Barbaresco, Port events on Douro.
- `kind` values `cool`, `mildew` and `other` come from this task's brief but are not in the V2_PLAN contract list (frost|hail|heat|drought|rain|fire|smoke|flood|great). The front end needs icons or colours for them.

### Gaps
- Sonoma, northern Rhône, Loire and Mâconnais have no single AOC/AVA polygon matching the source's scope, so they use region ids; check that the vintage climate arrays exist for these region ids.

## France: what did the weather do, vintage by vintage?

### Takeaway
Bordeaux, Côte d'Or, Champagne, Châteauneuf, Sauternes and Alsace are covered for almost every year 2000 to 2025. The recurring stories are frost (1991, 2003, 2016, 2017, 2021, 2024), the 2023 mildew year, the very wet 2024, and the hot, early, tiny 2025.

### Cited Findings
- Bordeaux 2025: hot and dry May to August; 2025, 2022 and 2003 had the most days above 35°C this century; dry whites picked from 25 August; 33.6 hl/ha and 290.6 million litres, smallest since 1991; St-Julien yields 37% below the 2005 to 2024 average, Margaux 29%, Pauillac 27%, St-Estèphe 17%, Pomerol 31%, St-Emilion 10%. 2022 was 411 Ml at 38 hl/ha; 2024 was 332 Ml at 35 hl/ha. [Liv-ex / Gavin Quinney](https://www.liv-ex.com/bordeaux-2025-weather-and-crop-report/)
- Bordeaux 2023: about 90% of vineyards were affected by downy mildew to some degree; Merlot was hardest hit (Smith Haut Lafitte expected about -40% Merlot). [Decanter](https://www.decanter.com/wine-news/bordeaux-hopes-rise-for-2023-harvest-but-mildew-leaves-mark-510047/)
- Bordeaux 2000 to 2024 year lines (2017 April frost about -40%, 2013 smallest crop since 1991, 2020 about 54 days of summer drought, etc.). [Wine with Seth, Bordeaux](https://www.winewithseth.com/winewiki/vintages/bordeaux/print/)
- Bordeaux 1945: severe frost on 2 May, drought, harvest from 13 September; 1961: frost at the end of May, very hot August, harvest from 22 September, some top estates at about 11 hl/ha. [Wine Cellar Insider 1945](https://thewinecellarinsider.com/wine-topics/bordeaux-wine-buying-guide-tasting-notes-ratings/bordeaux-wine-detailed-vintage-summary-1945-today/1945-bordeaux-wine-vintage-report-buying-tips); [1961](https://www.thewinecellarinsider.com/wine-topics/bordeaux-wine-buying-guide-tasting-notes-ratings/bordeaux-wine-detailed-vintage-summary-1945-today/1961-bordeaux-wine-vintage-report-buying-tips/)
- 1947, 1949, 1959, 1982, 1985, 1989 (earliest harvest since 1893), 1990 and 1991 (worst frost since 1945). [Wine with Seth, Bordeaux](https://www.winewithseth.com/winewiki/vintages/bordeaux/)
- Sauternes: botrytis by year (2000 rain blocked botrytis, 2001 extensive botrytis, 2003 little, 2008 and 2017 April frost, 2018 hail and mildew, 2022 botrytis delayed until late-September rain, 2025 ample botrytis and low yields). [Jancis Robinson, sweet Bordeaux](https://www.jancisrobinson.com/learn/vintages/bordeaux-sweet)
- Burgundy 2023: largest harvest in its history, 1.9 Mhl (BIVB); 2024 losses up to 80% for reds in the north; 2021 hard frost at budbreak; 2016 frost, hail and mildew; 2010 yields up to a third lower. [Jancis Robinson, red Burgundy](https://www.jancisrobinson.com/learn/vintages/burgundy-red)
- Burgundy 2025: Côte d'Or picking from 19 August, a ten-day August heatwave, Jadot organic reds about 30 hl/ha; Mâconnais hail on 1 June with some vineyards down 80% or more; Chablis from about 28 August, 35 to 50 hl/ha. [Vinetur](https://www.vinetur.com/en/2025102992754/burgundy-faces-third-small-harvest-in-five-years-as-some-vineyards-report-80-percent-drop-in-2025-yields.html)
- Burgundy legendary years: 1945 early-May frost and harvest from late August; 1959 record yields; 1978 cold, wet spring to the end of June; 1985 harvest from 24 September; 1990 small, concentrated berries. [VinePair](https://vinepair.com/articles/most-legendary-burgundy-vintages/)
- April 2021 frost: down to -6°C, -7°C in Chablis; Chablis estates lost up to 95%; Burgundy about 50% (per The Guardian); Côte-Rôtie estates lost entire crops; national agricultural disaster declared. [Drinks Business](https://www.thedrinksbusiness.com/2021/04/french-vineyards-hit-by-worst-frost-in-decades/)
- Champagne 2024: frost on 22 to 25 April (about 9% damage, mostly Côte des Bar); May hail on about 500 ha of the Marne valley (about 70% loss); downy mildew on bunches in 95% of monitored plots by the end of July. Champagne 2025: hail on 3 May destroyed 245 ha; 30 to 35°C in mid-June; first picks on 19 August. [DRAAF Grand Est 2024](https://draaf.grand-est.agriculture.gouv.fr/IMG/pdf/bsvbilan_viti_cha_2024.pdf); [2025](https://draaf.grand-est.agriculture.gouv.fr/IMG/pdf/bsvbilan_viti_cha_2025.pdf)
- Champagne 2020: harvest from 17 August; yield capped at 8,000 kg/ha (2019: 10,200; 2018: 10,800). [Wein.plus](https://magazine.wein.plus/news/champagne-erntet-nur-8-000-kg-trauben-pro-hektar-heftiger-streit-um-kleinere-erntemenge-wegen-corona-beendet)
- France 2024: about 37 Mhl, down 23%, lowest since the 1950s; forecast regional losses: Beaujolais/Burgundy -35%, Champagne -33%, Loire -30% (Muscadet -50%), Bordeaux -14%, Alsace -13%. [Vinetur](https://www.vinetur.com/en/2025060488346/french-wine-production-falls-to-lowest-level-since-1950s.html); [iDealwine](https://www.idealwine.net/vendanges-2024-en-france-vers-un-net-recul-de-la-production)
- France 2025: 36 Mhl, 16% below the five-year average; Beaujolais -32%, lowest yield in at least 35 years; Alsace -9%; Burgundy +45%. [L'Info Durable](https://www.linfodurable.fr/les-vendanges-2025-revues-en-baisse-minees-par-la-canicule-53138)
- Alsace 2025 harvest opened on 19 August, three days earlier than the previous record (2018). [Pleinchamp](https://www.pleinchamp.com/actualite/en-alsace-top-depart-des-vendanges-le-19-aout-une-precocite-historique); Alsace 2023: no botrytis at all at Hugel. [Wine Industry Advisor](https://wineindustryadvisor.com/2023/10/20/famille-hugel-in-alsace-since-1639-vintage-2023-our-first-hand-impressions/); 2000 to 2022 lines. [Jancis Robinson, Alsace](https://jancisrobinson.com/learn/vintages/alsace)
- Loire: 2021 frost losses of 70 to 90% common in Nantes and Anjou; 2017 Muscadet -35 to 40% and Savennières hit catastrophically; 2016 Muscadet smallest crop since 1949; 2018 hottest summer since 2003 and driest since 1945; 2024 Sancerre hail, Hurricane Kirk in October. [Wine Scholar Guild](https://www.winescholarguild.com/loire-valley-vintage-chart); 2000 to 2015 lines. [Jancis Robinson, Loire](https://www.jancisrobinson.com/learn/vintages/loire-valley)
- Beaujolais: 2016 hail on 13 April, 27 May and 24 June (about 1,500 and 2,250 ha hit); 2017 hail on 10 and 31 July (Morgon, Moulin-à-Vent up to 80% lost); 2019 about 400,000 hl, half of 2018; 2022 picking from 17 August; 2012 smallest crop in 40 years (509,000 hl). [Wine Scholar Guild](https://www.winescholarguild.com/beaujolais-vintage-chart)
- Rhône: Châteauneuf 2002 floods, 2007 among the driest years with two weeks of mistral, 2018 most humid since 1973 with mildew. [Wine Cellar Insider](https://www.thewinecellarinsider.com/rhone-wines-cote-rotie-hermitage-chateauneuf-du-pape/chateauneuf-du-pape-wine-producer-profiles/chateauneuf-du-pape-southern-rhone-vintage-chart-1978-today/); 2010 to 2025 lines. [Wine with Seth, southern Rhône](https://www.winewithseth.com/winewiki/vintages/southern-rhone/); [northern Rhône](https://www.winewithseth.com/winewiki/vintages/northern-rhone/)

### Inferences
- The 2024 and 2025 French crops are both near 36 to 37 Mhl, the two smallest since the 1950s, but for opposite reasons (wet and mildew vs heat and drought). That makes a useful contrast in the climate charts.
- Notes on the Sauternes id describe botrytis conditions. Notes on fr-bordeaux describe the red and dry-white season.

### Gaps
- Bordeaux 2024 "smallest since 1991": the Quinney text is ambiguous between 2024 and 2025. The note uses only the 2025 claim.
- The Champagne lines before 2012 on Wine with Seth are marked "not yet verified" by that site. Used for 1921, 1947, 1976, 1985, 1996 and 2000 to 2009; worth checking against Comité Champagne reports when time allows.
- Northern Rhône has no events for 2000 to 2009, and the Loire subregions are sparse before 2016.

## Italy: Piedmont, Tuscany, Veneto, Etna

### Takeaway
Barolo is covered for every year 2000 to 2025 from a Piedmont producer's dated harvest notes. Chianti Classico draws mainly on Tuscany-wide charts and one Consorzio report. Amarone and Etna cover the main events only.

### Cited Findings
- Piedmont, 2001 to 2025: 2002 yields down 40 to 50% with no crus produced (Chiarlo); 2003 earliest harvest in two centuries (Moscato from 16 August), yields about -40%; 2012 February freeze near -20°C, yields -10 to 25%; 2013 latest harvest in 20 years (Barolo 22 October); 2014 August hail in Barolo, yields dramatically reduced; 2017 four nights of April frost; 2021 early-April frost on about 30% of production, mainly Monferrato; 2022 30 to 32°C in May, about 120 mm of rain in June and July; 2024 more than 900 mm of rain; 2025 two heatwaves of 37 to 38°C. [Michele Chiarlo harvest notes](https://www.michelechiarlo.it/en/harvest-notes/)
- Barolo 2002 September hail and Barbaresco largely spared; 2023 hail at La Morra; 1986 spring hail. [K&L Piedmont guide](https://onthetrail.klwines.com/piedmont-vintage-guide)
- 2014: July hail in parts of Barolo (mostly Dolcetto), Barbaresco spared; Biondi-Santi made no Brunello; Tuscan yields about -20%; Bertani skipped Amarone. [Wine Spectator](https://www.winespectator.com/articles/2014-vintage-report-italy-wine-harvest-50932); [Barbiz](https://www.barbizmag.com/news/bertani-will-not-produce-amarone-classico/)
- Chianti Classico 2017: about 206,000 hl, -27%, lowest production in 40 years, after late frost, drought and heat. [Consorzio Chianti Classico](https://chianticlassico.com/en/wine/harvest/year-2017)
- Tuscany: 2021 frosts on 7, 8 and 15 April; 2023 downy mildew and hail; 2022 extreme drought rescued by late-August rain; 2003 earliest harvest since 1945. [Jancis Robinson, Tuscany](https://www.jancisrobinson.com/learn/vintages/tuscany); [Wine with Seth, Tuscany](https://www.winewithseth.com/winewiki/vintages/tuscany/print/)
- Brunello consorzio star ratings (context only, not used as text): 2002 two stars, 2014 three, 2015, 2016, 2019 and 2020 five. [Consorzio Brunello](https://www.consorziobrunellodimontalcino.it/en/piastrelle/)
- Valpolicella 2014: record rainfall of about 59 in for the year, 33.5 in during the growing season; most selezione and riserva bottlings skipped. 2021 hail cost some estates up to 25%; 2024 heavy June mildew and mid-August hail in the Classico zone. [Wine Scholar Guild, Veneto](https://www.winescholarguild.com/veneto-vintage-chart)
- Etna 2023: worst downy mildew in a decade or more on the north slopes; Ciclopi lost 70 to 90%, I Custodi up to 95% (Guyot) vs about 40% (albarello); the east side was largely spared. [Drinks Business](https://www.thedrinksbusiness.com/2023/09/etna-harvest-declared-a-tragedy-as-disease-decimates-volumes/). The 2023 crop fell 42.5%, and 2024 rebounded about 60% to about 80,000 quintals. [Gambero Rosso](https://www.gamberorosso.it/vino/etna-vendemmia-2024/)
- Etna 2013 harvest from 25 October to 10 November; 2019 May frost cost 20 to 25%; 2021 picked earlier than ever. [Wine Scholar Guild, Sicily](https://www.winescholarguild.com/italian-wine-vintage-charts/sicily-vintage-chart)

### Inferences
- The Brunello id has only two events. The Tuscany-wide events on `it-chianti-classico` apply to Montalcino as well, so the front end should show them there too.

### Gaps
- No Consorzio Chianti Classico or Brunello harvest reports for 2023 to 2025 were retrieved; Barolo 2024 and 2025 detail relies on one producer.

## Spain and Portugal, including Port declarations and Madeira

### Takeaway
Rioja is covered with Consejo ratings, and Ribera del Duero with the Consejo's own kilo series. Port has declaration history from 1963 to 2024, including the 2024 general declaration, the first since 2017. Douro 2025 was an extreme heat year.

### Cited Findings
- Ribera del Duero harvest in thousand kg: 2016 133,112; 2017 55,227 (-58.5%); 2018 125,439; 2019 96,534; 2020 123,192; 2021 109,906; 2022 105,031; 2023 117,619; 2024 95,497 (-18.8%); 2025 129,555 (+35.7%, no frost or hail, extreme drought, harvest 28 August to 28 October). [Consejo Regulador Ribera 2025 report](https://www.riberadelduero.es/sites/default/files/2025-12/INFORME%20VENDIMIA%202025_0.pdf)
- Ribera 2017 frost on the night of 27 to 28 April: more than seven hours below 0°C, down to about -6°C; about 250 mm of rain in the cycle vs 450 expected; harvest 8 September to 20 October. [Consejo Regulador 2017](https://riberadelduero.es/sites/default/files/noticias/ribera_del_duero_cierra_la_vendimia_2017.pdf)
- Rioja Consejo ratings: Excelente 2001, 2005, 2010, 2011, 2019; 2022 hottest year on record; 2017 earliest harvest on record. [Wine with Seth, Rioja](https://www.winewithseth.com/winewiki/vintages/rioja/print/). 2025 one of the shortest crops in Rioja's history (mildew, hail, poor set); 2024 260 million kg. [Vinetur](https://www.vinetur.com/2025082090466/la-vendimia-de-rioja-afronta-una-de-las-cosechas-mas-cortas-de-su-historia.html)
- Priorat: 2019 late-June heatwave scorched grapes and damaged Cariñena; 2020 mildew major losses; 2023 drought, very low yields. [Wine Scholar Guild, Priorat](https://www.winescholarguild.com/spanish-wine-vintage-charts/priorat-vintage-chart)
- Jerez: 2022 44.4 M kg; 2023 49.9 M kg (rain 425 to 480 l/m² vs 600 normal; June hail at Trebujena and Lebrija); 2024 62.5 M kg (+25.4%). [Diario Bahía de Cádiz 2023](https://www.diariobahiadecadiz.com/jerez/finaliza-la-vendimia-2023-en-el-marco-de-jerez-marcada-por-la-sequia-con-cerca-de-50-toneladas-de-uva-procesada); [2024](https://www.diariobahiadecadiz.com/jerez/lvendimia-en-el-marco-de-jerez-se-cierra-con-62-toneladas-de-uva-un-25-mas)
- Port declarations and weather, 1960 to 2017: 1963 nearly all shippers; 1966 45°C twice at Pinhão; 1977 widely (except Cockburn, Martinez, Noval); 1985 universal; 1991 Symington vs 1992 Taylor/Fonseca split; 1994 major; 1997 all except Croft, Delaforce; 2000 widely; 2003 widely, 45°C days; 2007 second most widely to date; 2009 split (Fladgate yes, Symington no); 2011 universal; 2016 and 2017 back to back, 2017 the most widely declared to date. [Decanter Port guide](https://www.decanter.com/learn/vintage-guides/vintage-port/port-vintage-guide-380297/); [For the Love of Port](https://www.fortheloveofport.com/two-half-centuries-of-port-wine-part-2-1970-2020/)
- Port/Douro 1999 to 2022 weather lines: 2012 yields down up to 40%; 2017 picking from 23 August; 2020 hottest July on record and many houses declared; 2022 yields more than 10% below 2021. [Jancis Robinson, Port and Douro](https://www.jancisrobinson.com/learn/vintages/port-and-the-douro)
- 2022 Port: no general declaration; Pinhão about 70% less rain from November 2021 to August 2022; 47°C, Portugal's record. [World of Fine Wine](https://worldoffinewine.com/news-features/2022-vintage-port)
- 2024 Port: general declaration, the first since 2017; the seven-year gap was the longest since 1934 to 1945; Symington declared nine wines; harvest from 4 September. [World of Fine Wine](https://worldoffinewine.com/uncategorized/2024-vintage-port). Fladgate (Taylor's, Fonseca, Croft) declared on 23 April 2026. [Wine Industry Advisor](https://wineindustryadvisor.com/2026/04/23/fladgate-family-wines-declares-2024-vintage-ports/)
- Douro 2025: three-month drought, 35% rain deficit; early-August heatwave above 40°C for ten consecutive days (longer than 2003); yields about 30% below average, up to 50% for some whites. [Symington](https://www.symington.com/post/2025-harvest-report-to-the-brink-and-back)
- Madeira: oidium arrived in 1851 and phylloxera was identified in 1872. [Madeira Wine Guide](https://madeirawineguide.com/maderia-wine-history/). 20 February 2010 floods killed 42, flooded cellars and likely lost old wine; the 1803 floods destroyed most of that year's crop. [Rare Wine Co](https://wholesale.rarewineco.com/articles/madeira-struck-by-devastating-floods/). August 2016 Funchal fires; vineyards reported safe at the time. [Decanter](https://www.decanter.com/wine-news/madeira-and-portugal-fire-but-vineyards-safe-324791/)

### Inferences
- Port declarations follow the weather only partly; market and stock decisions matter too (e.g. Fladgate vs Symington splits in 1991/92 and 2009). Notes therefore state the declaration as fact, without reading it as a quality score.

### Gaps
- Conflict: Fladgate's announcement page meta says the previous general declaration was 2016, while its body and World of Fine Wine say 2017. The note follows 2017.
- Conflict: oidium on Madeira is dated 1851 by the source used, while it is often cited elsewhere as 1852. The event is filed under 1851.
- No sourced weather was found for Port 1927, 1931, 1934, 1945 or 1948 (1945 has only a declaration-context note). No Madeira vintage-weather history (Frasqueira years) was found.

## Germany, Austria, Hungary, Greece, Georgia

### Takeaway
The Mosel is covered from 1921 and has every year from 2000; the Wachau has almost every year from a growers' association record; Tokaj Aszú years have a botrytis story; Santorini and Kakheti have only a few events.

### Cited Findings
- Mosel 1921: an exceedingly hot summer and botrytis; Thanisch Doctor made the first TBA in the Mosel. [Decanter](https://www.decanter.com/learn/wine-legend-bernkasteler-doctor-riesling-trockenbeerenauslese-1921-369851)
- Germany 1990 to 2025 lines: 2010 yields devastated, excellent botrytis; 2012 Mosel lost up to 25%; 2021 Ahr floods; 2023 warmest year on record; 2024 spring frost in and north of the Rheingau; 2025 heavy mid-September rain, Rheinhessen -23%, Mosel above average. [Jancis Robinson, Germany](https://www.jancisrobinson.com/learn/vintages/germany)
- Mosel 1959, 1971 (best since 1959), 1976, 1990 and the 2011, 2013 and 2017 lines. [Wine with Seth, Mosel](https://www.winewithseth.com/winewiki/vintages/mosel/)
- Germany 2024: Mosel about 510,000 hl, -30%, smallest for 50 years, large May hailstorms; Rheingau 222,000 hl; Pfalz 2.2 Mhl, -4%, largely spared frost. [Wines of Germany / DWI](https://www.winesofgermany.com/news-media/news/news/1350/wine-harvest-2024-in-germany). National total 7.9 Mhl; Saale-Unstrut and Sachsen -70 to -73%. [Tageskarte](https://www.tageskarte.io/industrie/detail/spaetfroeste-und-wechselhaftes-wetter-winzer-ernten-deutlich-weniger-trauben.html)
- Rheingau 2024: frost at a Lorch site for the first time in 100 years; Schloss Vollrads sprayed 13 times against downy mildew. [Hessenschau](https://www.hessenschau.de/wirtschaft/wein-aus-hessen-so-haben-die-winzer-im-rheingau-den-2024er-jahrgang-gerettet-v1,weinlese-rheingau-100.html)
- Pfalz 2018: Müller-Thurgau from about 20 August; July above 36°C; crop about 10% above average. [DLR Herbstbericht Pfalz 2018](https://www.weinbau.rlp.de/Internet/global/Themen.nsf/0/99a67d40d8157b0fc125851f003c9a8c/$FILE/Herbstbericht_Pfalz_2018.002.pdf/Herbstbericht_Pfalz_2018.pdf)
- Wachau 1983 to 2025, e.g. 2002 flood (about 220 l/m² from 6 to 12 August, dry-stone walls collapsed); 2013 once-in-a-century Danube flood; 2016 frost up to 90% in the Spitzer Graben; 2018 hail on 21 June; 2020 walnut-sized hail on 22 August; 2023 hail on 26 August; 2024 April frost and rain from 12 September. [Vinea Wachau](https://www.vinea-wachau.at/en/the-wine-region/vintages). 2002: the Kamp at its highest since 1896; only 0.2% of Austria's vineyards lost. [Decanter](https://www.decanter.com/wine-news/austrian-harvest-survives-worst-flooding-for-decades-106160/)
- Tokaj Aszú: 2002, 2013 and 2017 great botrytis years; 2010, 2014 and 2020 rain and grey rot; 2015 most producers made no Aszú; 2022 too hot, some made szamorodni. [Decanter Tokaji guide](https://www.decanter.com/premium/tokaji-aszu-decanter-vintage-guide-511792/); [bor.hu](https://bor.hu/en/?p=7015)
- Santorini 2025: 350 to 400 t expected, worst in living memory, vs a decade average of 2,500 to 3,000 t and up to 5,000 t in 2003; three consecutive drought years. [Vinetur](https://www.vinetur.com/en/amp/2025082890663/santorini-faces-historic-collapse-in-grape-harvest-as-vineyards-shrink-and-prices-soar.html). Sigalas puts 2025 at about 450 t, about 15% of 2000; rainfall below 200 mm. [Decanter](https://www.decanter.com/wine-news/historic-santorini-vineyards-struggle-against-climate-change-and-tourism-570872/)
- Kakheti: hail in the week of 30 August 2021, about 4,600 ha. [Georgia Today](https://georgiatoday.ge/tag/heavy-hail); 2023 hail on more than 3,500 ha. [Agenda.ge](https://agenda.ge/en/news/2023/3257); 2025 record rtveli of about 336,000 t, Kakheti about 327,000 t. [CBW](https://cbw.ge/wine/within-rtveli-2025-a-record-high-336000-tons-of-grapes-were-processed); 2024 about 300,000 t, "record". [Agenda.ge](https://agenda.ge/en/news/2024/40961)

### Inferences
- The two Santorini sources differ on 2025 volume (350 to 400 t vs about 450 t); the note uses the forecast figure, attributed to its source.

### Gaps
- Rheingau and Pfalz have only two events each; Austria beyond the Wachau is not covered; Tokaj pre-2000 great years (e.g. 1999, 1993) lack weather sourcing; Santorini lacks 2022 to 2024 detail.

## North America

### Takeaway
Napa (1997 to 2025, with every year from 2000) and Washington (1996 to 2025) are covered from their trade bodies' own reports. Willamette is covered almost every year. Sonoma has the fire years; the Finger Lakes have freeze and frost years.

### Cited Findings
- Napa 1990 to 2025 (Napa Valley Vintners): 2008 deepest frost in decades; 2011 June shatter, some sites down more than 30%, sparkling start on 29 August; 2015 harvest from 22 July; 2017 nearly 90% of tonnage in by 8 October when the fires began; 2020 LNU Complex (17 August) and Glass Fire (27 September), smaller red harvest; 2021 whites from 30 July; 2022 five days of triple-digit heat in September; 2023 picking to mid-November; 2025 eight days above 95°F. [Napa Valley Vintners](https://napavintners.com/napa_valley/vintage_charts.asp)
- Washington 1990 to 2025 (Washington Wine Commission): 2015 3,157 GDD vs 2,628 long-term, Red Mountain more than 3,900; 2020 smoke paused harvest about ten days; 2021 record late-June heat; 2022 April blizzard; 2023 crop -34%; 2024 extreme January cold, 150,000 t; 1996 harsh winter, 34,000 t. [Washington Wine](https://www.washingtonwine.org/resource/vintages-30-year-overview/)
- Willamette 2000 to 2025: 2013 late-September rain split the harvest; 2020 smoke taint; 2021 heat dome; 2022 warmest October on record. [Jancis Robinson, Willamette](https://www.jancisrobinson.com/ja/learn/vintages/willamette-valley-vintage-chart-2000-2025); 2011 latest and coldest on record; 2015 hottest year on record. [Wine with Seth, Willamette](https://www.winewithseth.com/winewiki/vintages/willamette-valley/print/)
- Sonoma 2017: Labor Day heat of 105°F on three days; fires from the night of 8 October. [Wine with Seth 2017 Sonoma](https://www.winewithseth.com/winewiki/2017-sonoma-vintage/); 2019 Kincade fire on 23 October, about 92% already picked. [North Bay Business Journal](https://www.northbaybusinessjournal.com/article/article/many-north-coast-wine-grapes-had-been-picked-before-kincade-fire/); 2020 Walbridge and Glass fires, labs backlogged three to four weeks. [Press Democrat](https://www.pressdemocrat.com/article/lifestyle/longtime-sonoma-county-vintners-reflect-on-this-years-harrowing-harvest/)
- Finger Lakes 2014 polar vortex: -7 to -18°F, some vineyards with 100% bud damage, USDA disaster in 19 counties. [Punch](https://punchdrink.com/news/brutal-winter-leaves-finger-lakes-wine-region-a-disaster-area/); 2023 frost on 18 May, 30 to 50% crop damage (Cornell; scope unclear). [WAER](https://www.waer.org/news/2023-05-30/nys-fall-grape-harvest-uncertain-after-damaging-frost-and-freeze); 2011 two hurricanes; 2012 and 2016 earliest harvests. [Heart & Hands](https://heartandhandswine.com/vintage-report/)

### Gaps
- No Sonoma County Winegrowers year-by-year record was found; 2020 county-wide losses are not quantified.
- The Cornell 30 to 50% figure for 2023 may refer to New York State rather than the Finger Lakes only.

## Southern Hemisphere

### Takeaway
The major Australian events (2007 frost and drought, 2009 Black Saturday, 2011 wet, 2020 fires and smoke, 2023 La Niña) are well sourced, and the Barossa has nearly every year. New Zealand, South Africa, Argentina and Chile have the major events plus national figures. Harvest-year convention: the southern vintage year is the picking year.

### Cited Findings
- Australia 2020: Hunter had only 15 mm of rain from October to December, smoke destroyed its reds and only token rosé was made; Clonakilla made no NSW wine. [Halliday NSW 2020](https://winecompanion.com.au/resources/vintage-chart/2020/new-south-wales); Barossa yields -60 to 70%, McLaren Vale Shiraz and Cabernet at all-time lows, Adelaide Hills bushfires. [Halliday SA 2020](https://winecompanion.com.au/resources/vintage-chart/2020/south-australia); Yarra smoke tests negative. [Halliday VIC 2020](https://winecompanion.com.au/resources/vintage-chart/2020/victoria)
- Barossa 2023: more than 150 mm in November vs about 35 mm average, picking into May. [Halliday SA 2023](https://winecompanion.com.au/resources/vintage-chart/2023/south-australia); 2025 possibly the driest on record, two late-September frosts, McLaren Vale earliest ever. [Halliday SA 2025](https://winecompanion.com.au/resources/vintage-chart/2025/south-australia); 1990 to 2024 lines. [Jancis Robinson, South Australia](https://www.jancisrobinson.com/learn/vintages/south-australia)
- 2007: national yield per acre lowest since 1976; Coonawarra lost about three-quarters of its crop to October frosts (up to 30 frost events). [Wine Spectator](https://video.winespectator.com/articles/harvest-2007-australia-has-rough-year-3570)
- Yarra 2009: late-January heatwave to 45°C cut yields about 30%; Black Saturday (7 February) burned about 154 ha of vineyards; smoke on 13 February tainted Shiraz. [Decanter](https://www.decanter.com/features/australia-bush-fires-246648/); 2023 wettest August and October on record. [Halliday VIC 2023](https://winecompanion.com.au/resources/vintage-chart/2023/victoria)
- Hunter: 2008 rain (117 mm from 18 to 26 January). [Winetitles](https://winetitles.com.au/vintage-reports/2008-vintage-report-for-hunter-valley-new-south-wales/); 2012 reds left unharvested. [Winetitles](https://winetitles.com.au/vintage-reports/2012-vintage-report-for-hunter-valley-new-south-wales/); Pokolbin's wettest year on record in 2022 (1,365 mm). [Halliday NSW 2023](https://winecompanion.com.au/resources/vintage-chart/2023/new-south-wales)
- Margaret River: 2024 driest and warmest growing season on record. [Halliday WA 2024](https://winecompanion.com.au/resources/vintage-chart/2024/western-australia); 2011 harvest about four weeks early. [Winetitles](https://winetitles.com.au/vintage-reports/2011-vintage-report-for-margaret-river-western-australia/)
- NZ: 2021 about 370,000 t, -19%, Marlborough down more than 20%, Central Otago +21%. [NZ Winegrowers 2021](https://www.nzwine.com/media/19589/vintage-2021_smaller-harvest-of-superb-quality.pdf); 2024 Marlborough 312,812 t, -21%. [NZ Winegrowers 2024](https://www.nzwine.com/media/bapikee2/vintage-indicators2024_new.pdf); 2000 to 2025 national notes (2003 frost -35%, 2014 largest ever, 2020 Central Otago coolest on record). [Jancis Robinson, NZ](https://www.jancisrobinson.com/learn/vintages/new-zealand)
- South Africa: 2018 smallest crop since 2005, about -20%, Swartland about -50%. [Wine Spectator](https://www.winespectator.com/articles/south-africa-2018-wine-harvest-is-small); 2019 just over 1.2 Mt. [Decanter](https://www.decanter.com/wine-news/south-africa-2019-wine-harvest-413590/); 2024 Swartland 35 mm of rain from October to March vs 110 to 135 mm. [Jancis Robinson](https://www.jancisrobinson.com/de/articles/south-africa-harvest-2024-report)
- Argentina 2023: frosts on 31 October and 1 November 2022, yields -25 to 30%, harvest almost a month early. [Decanter](https://www.decanter.com/wine-news/argentina-harvest-report-2023-low-yields-but-with-unprecedented-balance-503003); Mendoza 2001 to 2025 lines. [Wine with Seth, Mendoza](https://www.winewithseth.com/winewiki/vintages/argentina-mendoza/)
- Chile: 2010 earthquake (27 February); 2014 frost losses up to 70%; 2016 El Niño rain, yields -25%; 2020 October frost worst in Colchagua; 2023 fires in Maule and Biobío. [Jancis Robinson, Chile](https://jancisrobinson.com/zh-hans/node/9447); January 2017 fires damaged more than 100 vineyards. [Wine Spectator](https://www.winespectator.com/articles/chile-rebuilds-devastated-wine-regions); 2024 Puente Alto rain of 438 mm. [Concha y Toro](https://conchaytoro.com/content/uploads/2024/08/Reporte-Vendimia-2024-Luxury-Brands-Concha-y-Toro-ENG-comprimido.pdf); 2025 Colchagua yields up to -30%. [VSPT](https://vsptwinegroup.com/wp/wp-content/uploads/2025/06/VSPT_Reporte-Vendimia_180625_BE-INGLES_compressed.pdf)

### Gaps
- McLaren Vale, Coonawarra, Margaret River, Yarra, Hunter, Stellenbosch, Swartland, Maipo and Colchagua have 1 to 4 events each, not full series.
- Marlborough Wine NZ vintage PDFs for 2021 and 2023 could not be fetched (permission request timed out): static1.squarespace.com links behind marlboroughwinenz.com/s/Vintage-2021-A4_1.pdf and Vintage-2023-A4-Oct-2023.pdf.
- The NZ 2023 Marlborough change versus 2022 has an unclear sign in the source PDF (national 501,000 t vs 532,000 t in 2022).

## How reliable is the dataset, and how was it built?

### Takeaway
Primary or trade-body sources underpin the strongest series (Napa Valley Vintners, Washington Wine Commission, Vinea Wachau, Consejo Ribera, DRAAF Champagne, Consorzio Chianti Classico, Symington). Several series rely on the Wine with Seth aggregator or on Jancis Robinson chart summaries, and are paraphrased.

### Cited Findings
- Wine with Seth marks its 1996 to 1999 lines (and Champagne before 2012) as "not yet verified". It is the cited source for 171 of the 647 events (Bordeaux, Burgundy, Champagne, Rhône, Mosel, Mendoza, Tuscany, Rioja, Willamette lines); Jancis Robinson vintage charts are cited for 173. [Wine with Seth vintages index](https://www.winewithseth.com/winewiki/vintages/)
- Per-source counts are in `work/vintage_events/sources.tsv`; the largest are Washington Wine Commission (27), Napa Valley Vintners (27), Vinea Wachau (26), JR sweet Bordeaux (25), Wine with Seth Champagne (24), Michele Chiarlo (24), Wine with Seth Mendoza (23) and JR Germany (23).

### Inferences
- Notes are paraphrased weather facts and consequences; no critic scores or quoted tasting text are used. Consejo ratings (Excelente, Muy Buena, Buena) are mentioned for Rioja because they are official classifications, not critics' scores.
- Events with `kind` "great" mark exceptional growing seasons by their weather (e.g. Port 1963, Sauternes 2001), not by score.

### Gaps
- Not covered: Barbaresco beyond 2002 and 2014, Brunello as its own series, Rheingau and Pfalz series, Priorat and Jerez before 2019, and Georgia before 2021.
- One page was first read by direct download before the policy block; it was then re-fetched through WebFetch, and that copy is the one used.
