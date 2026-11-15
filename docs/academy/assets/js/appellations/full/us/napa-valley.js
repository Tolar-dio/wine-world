// Full encyclopedia entries: Napa Valley AVA and its sub-AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function na(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const NACJ="California law (Business and Professions Code §25242) requires conjunctive labeling: a wine labelled with this AVA must also carry the words Napa Valley.";
const NAV=["Napa Valley Vintners: AVAs","https://napavintners.com/napa_valley/appellations.asp"];
function nsub(o){return na(Object.assign({lab:NACJ,sources:[NAV]},o));}

APXF["us-napa-valley"] = na({
  lede: "America's most famous wine address: a 48 km valley between two volcanic and sedimentary mountain ranges, cooled at the south by San Pablo Bay, where Cabernet Sauvignon reaches its most celebrated New World form.",
  rec: "January 1981 (T.D. ATF-79), California's first AVA and the second in the US", cfr: "9.23", td: "T.D. ATF-79, 46 FR 9063, 28 January 1981", am: "T.D. ATF-201, 50 FR 12533, 29 March 1985",
  facts: [["Boundary", "Napa County except the Lake Berryessa and Putah Creek drainage"], ["Vineyard area", "About 18,000 ha planted"], ["Sub-AVAs", "17, from Calistoga to Coombsville; Los Carneros and Wild Horse Valley cross the county line"], ["Main grapes", "Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot, Malbec, Chardonnay, Sauvignon Blanc, Pinot Noir, Zinfandel"]],
  place: "The CFR draws the boundary along the Napa County lines with Lake, Solano and Sonoma counties and around Lake Berryessa, so the AVA takes in the valley floor, the Mayacamas range to the west, the Vaca range to the east and the side valleys. Temperature rises steadily from the bay north to Calistoga, where the valley narrows under Mount St. Helena; fog and wind from San Pablo Bay cool the south. Soils are among the most varied in the world for so small an area: volcanic ash, tuff and lava from the Sonoma Volcanics, uplifted marine sandstone and shale, and gravelly alluvial fans spreading from the mountains onto the floor.",
  rules: "Napa has two layers of state law on top of federal rules: conjunctive labeling for sub-AVAs, and a rule (§25241) that a brand name containing a Napa place name may only go on wine that qualifies for that appellation. The 1968 Agricultural Preserve, the first in the US, restricts subdivision of farmland.",
  history: "George Yount planted the first vines in the 1830s; Charles Krug opened the first commercial winery in 1861. Phylloxera and Prohibition wiped out most of the industry. Beaulieu and Inglenook kept Cabernet alive, Robert Mondavi built the first big new winery after Prohibition in 1966, and the 1976 Judgment of Paris, won by Stag's Leap Wine Cellars and Chateau Montelena, made Napa world news.",
  glass: "Cabernet Sauvignon defines it: blackcurrant, plum, cocoa, cedar and ripe, polished tannin, often with new French oak, from fresh mountain wines to lush valley-floor ones. Chardonnay and Sauvignon Blanc range from rich to taut; Carneros adds Pinot Noir and sparkling wine.",
  exam: "First California AVA, 1981; Napa County less the Berryessa drainage; 17 sub-AVAs; conjunctive labeling; Agricultural Preserve 1968; Judgment of Paris 1976.",
  producers: ["Robert Mondavi Winery", "Stag's Leap Wine Cellars", "Chateau Montelena", "Inglenook", "Beaulieu Vineyard", "Heitz Cellar", "Opus One", "Harlan Estate", "Screaming Eagle", "Dominus Estate", "Spottswoode", "Corison"],
  sources: [NAV]
});

APXF["us-atlas-peak"] = nsub({
  lede: "A high volcanic plateau in the Vaca range north-east of Napa city, above the fog line, where cool afternoons give Cabernet freshness and a firm frame.",
  rec: "January 1992", cfr: "9.140", td: "T.D. ATF-320, 57 FR 2681, 23 January 1992",
  facts: [["Elevation", "About 230 to 800 m"], ["Soils", "Thin, red, rocky volcanic soils"]],
  place: "A plateau and slopes in the Vaca range, east of the Silverado Trail and Stags Leap. Elevation means warm but not hot days, cold nights and a later harvest; the shallow volcanic soils drain fast and limit vigour.",
  history: "Antinori, with partners, developed Atlas Peak Vineyards from the 1980s and planted Sangiovese there before the estate became Antica.",
  glass: "Dark-fruited, tightly wound Cabernet with bright acidity and firm tannin; mountain Chardonnay with tension.",
  exam: "Vaca range plateau; Antinori's Antica; Stagecoach Vineyard nearby.",
  producers: ["Antica Napa Valley (Antinori)", "Acumen", "Elan", "Stagecoach Vineyard (grower)"]
});

APXF["us-calistoga"] = nsub({
  lede: "The northern head of the valley under Mount St. Helena: Napa's hottest valley-floor AVA, cooled at night by air through the Knights Valley gap, home of Chateau Montelena.",
  rec: "December 2009", cfr: "9.209", td: "T.D. TTB-83, 74 FR 64612, 8 December 2009", am: "T.D. TTB-196 (2024), adjusting the boundary with Crystal Springs of Napa Valley",
  facts: [["Soils", "Volcanic soils from Mount St. Helena and the Sonoma Volcanics; alluvial fans"], ["Climate", "Hot days, wide day-night swing"]],
  place: "The valley narrows at Calistoga between the Mayacamas and the Vaca range, under the 1,323 m Mount St. Helena. Days are the warmest in the valley, but cool air spills through the gap from Knights Valley and the Russian River at night, keeping acidity. Volcanic soils, including obsidian and ash, dominate the slopes.",
  history: "The AVA took years to approve because the existing brand Calistoga Cellars used grapes from elsewhere; TTB's final rule let that brand keep the name only under conditions.",
  glass: "Ripe, powerful Cabernet Sauvignon with dark fruit and firm tannin; old-vine Zinfandel, Petite Sirah and the rare Charbono.",
  exam: "Northernmost Napa sub-AVA; Mount St. Helena; Chateau Montelena 1973 Chardonnay won Paris 1976.",
  producers: ["Chateau Montelena", "Eisele Vineyard", "Larkmead", "Tofanelli", "Storybook Mountain"]
});

APXF["us-chiles-valley"] = nsub({
  lede: "A small, high side valley in the Vaca range east of the main valley, where night cold pools and harvest comes late.",
  rec: "February 1999", cfr: "9.154", td: "T.D. ATF-408, 64 FR 7787, 17 February 1999",
  facts: [["Elevation", "About 250 to 370 m"], ["Location", "Entirely within Napa Valley AVA, east of Howell Mountain"]],
  place: "A narrow upland valley drained by Chiles Creek toward Lake Hennessey. Cold air drains in at night, so it is cooler than the main floor, with alluvial soils on the bottomland and rocky slopes around it.",
  history: "Named after Joseph Ballinger Chiles, an overland pioneer who received the Rancho Catacula land grant in the 1840s.",
  glass: "Firm, fresh Cabernet Sauvignon and Zinfandel with bright acidity.",
  exam: "Vaca range side valley; cold-air pooling; Chiles.",
  producers: ["Brown Estate", "Volker Eisele Family Estate", "Kuleto Estate", "RustRidge"]
});

APXF["us-coombsville"] = nsub({
  lede: "A horseshoe of hills east of Napa city, close to the bay, where volcanic tuff and fog make one of the coolest Cabernet sites in Napa.",
  rec: "December 2011", cfr: "9.223", td: "T.D. TTB-100, 76 FR 77684, 14 December 2011",
  facts: [["Soils", "Volcanic tuff and ash on slopes; alluvium below"], ["Climate", "Marine-cooled from San Pablo Bay"]],
  place: "Hills forming a rough semicircle on the western edge of the Vaca range, often described as an eroded volcanic caldera. Fog and afternoon breezes from the bay keep temperatures down, and harvest is later than up-valley.",
  glass: "Cabernet with red and black fruit, fresh acidity and moderate alcohol; also Syrah, Merlot, Chardonnay and Pinot Noir.",
  exam: "East of Napa city; cool; volcanic caldera rim.",
  producers: ["Farella", "Favia", "Palmaz", "Ancien", "Arietta"]
});

APXF["us-crystal-springs-of-napa-valley"] = nsub({
  lede: "Napa's newest AVA, an all-hillside band on the western face of the Vaca range between St. Helena and Calistoga, between the frost-prone floor and Howell Mountain above.",
  rec: "October 2024, effective November 2024", cfr: "9.296", td: "T.D. TTB-196, 89 FR 83434, 16 October 2024",
  facts: [["Area", "About 1,600 ha (4,000 acres)"], ["Elevation", "From the 400-foot contour (about 120 m) up toward Howell Mountain, roughly 430 m"], ["Slopes", "15 to 40%, mostly facing west and south-west"]],
  place: "TTB defined it by slope: the boundary starts where the foothills leave the valley floor, so the vines escape the floor's frost and fog, and stops below Howell Mountain's elevation cooling. West-facing volcanic slopes catch afternoon sun.",
  rules: "Creating it required adjusting the boundaries of neighbouring AVAs in the same rulemaking.",
  glass: "Ripe, structured hillside Cabernet Sauvignon, Merlot and Cabernet Franc.",
  exam: "Newest Napa sub-AVA (2024); defined by slope and elevation.",
  producers: []
});

APXF["us-diamond-mountain-district"] = nsub({
  lede: "Steep Mayacamas slopes south-west of Calistoga with light, volcanic ash soils, source of some of Napa's longest-lived Cabernet.",
  rec: "June 2001", cfr: "9.166", td: "T.D. ATF-456, 66 FR 29698, 1 June 2001",
  facts: [["Elevation", "About 120 to 670 m"], ["Soils", "Volcanic ash, tuff and weathered lava"]],
  place: "Named for the obsidian glinting in its soils, the district sits above much of the valley's heat on mostly north-east-facing slopes. Soils are light and fast-draining.",
  history: "Diamond Creek, founded by Al Brounstein in 1968, bottled its separate vineyard blocks (Volcanic Hill, Red Rock Terrace, Gravelly Meadow) and defined the district's reputation.",
  glass: "Dense, mineral, tannic Cabernet that needs years; Schramsberg's sparkling wines come from cellars here too.",
  exam: "Diamond Creek; volcanic soils; Mayacamas.",
  producers: ["Diamond Creek", "Schramsberg", "Von Strasser", "Reverie"]
});

APXF["us-howell-mountain"] = nsub({
  lede: "A high plateau in the Vaca range above St. Helena, bounded by the 1,400-foot contour roughly at the top of the summer fog, and the first sub-AVA approved wholly inside Napa Valley.",
  rec: "December 1983", cfr: "9.94", td: "T.D. ATF-163, 48 FR 57487, 30 December 1983", am: "T.D. ATF-249 (1987)",
  facts: [["Lower boundary", "1,400-foot (about 430 m) contour"], ["Soils", "Red volcanic soils and white tufa (volcanic ash)"]],
  place: "Above the fog, vines get more sunshine but cooler days than the floor, with cold nights. Thin, infertile volcanic soils keep berries small.",
  history: "Vineyards date from the 1880s; Randy Dunn's Cabernets from the 1980s revived its fame.",
  glass: "Massive, tannic, deeply coloured Cabernet and Zinfandel, with blackberry, graphite and long ageing potential.",
  exam: "1,400-foot contour; above the fog; Dunn; first sub-AVA inside Napa Valley.",
  producers: ["Dunn Vineyards", "La Jota", "Ladera", "O'Shaughnessy", "Outpost", "Cade", "Robert Craig"]
});

APXF["us-los-carneros"] = na({
  lede: "Low hills along San Pablo Bay straddling Napa and Sonoma, one of the first AVAs defined by climate rather than political lines, and the cool-climate base for Pinot Noir, Chardonnay and sparkling wine.",
  rec: "August 1983", cfr: "9.32", td: "T.D. ATF-142, 48 FR 37368, 18 August 1983", am: "T.D. ATF-249 (1987) and T.D. TTB-55 (2006)",
  facts: [["Counties", "Napa and Sonoma"], ["Name in the CFR", "Los Carneros, also Carneros"], ["Soils", "Shallow, dense clay loams over hardpan"]],
  place: "Rolling hills at the southern ends of both counties. Fog and a near-daily afternoon wind from the bay make it one of the coolest parts of the North Coast; shallow clay soils restrain vigour. The name means 'the rams', after the sheep that grazed here.",
  rules: "It is a sub-AVA of both Napa Valley and Sonoma Valley, and of the North Coast AVA. Because it crosses county lines, Napa's conjunctive labeling rule does not apply to it.",
  history: "Louis M. Martini and André Tchelistcheff pioneered cool-climate Pinot Noir and Chardonnay here; Champagne and Cava houses followed with Domaine Carneros, Gloria Ferrer and Artesa.",
  glass: "Bright, red-fruited Pinot Noir, crisp Chardonnay with citrus and stone fruit, and fine sparkling wine; also cool-climate Merlot and Syrah.",
  exam: "Straddles Napa and Sonoma; cool; Pinot Noir, Chardonnay, sparkling; 'the rams'.",
  producers: ["Domaine Carneros", "Saintsbury", "Gloria Ferrer", "Artesa", "Hyde de Villaine (HdV)", "Truchard", "Etude"],
  sources: [NAV]
});

APXF["us-mt-veeder"] = nsub({
  lede: "Steep, forested southern Mayacamas west of Napa city: uplifted seabed soils, tiny yields and taut, powerful mountain Cabernet.",
  rec: "February 1990", cfr: "9.123", td: "T.D. ATF-295, 55 FR 5844, 20 February 1990", am: "T.D. ATF-351 (1993)",
  facts: [["Elevation", "About 150 to 750 m"], ["Soils", "Shallow sedimentary sandstone and shale with volcanic intrusions"]],
  place: "Unlike Napa's volcanic north, much of Mt. Veeder is ancient marine sediment pushed up into mountains. Vineyards are isolated clearings in forest, with marine influence from the bay.",
  history: "Mayacamas Vineyards, on old stone-winery foundations from 1889, has made famously long-lived Cabernet and Chardonnay since the 1940s.",
  glass: "Firm, acid-driven Cabernet and Malbec with dusty tannin; mineral Chardonnay.",
  exam: "Uplifted marine soils; Mayacamas Vineyards; Hess Collection.",
  producers: ["Mayacamas Vineyards", "The Hess Collection", "Mount Veeder Winery", "Lokoya", "Mount Brave"]
});

APXF["us-oak-knoll-district-of-napa-valley"] = nsub({
  lede: "The southern valley floor between Napa city and Yountville, cool and foggy in the morning, with a long season that suits Chardonnay, Riesling and savoury Cabernet.",
  rec: "February 2004", cfr: "9.161", td: "T.D. TTB-9, 69 FR 8564, 25 February 2004",
  facts: [["Soils", "Alluvial fans from the Mayacamas and Dry Creek; gravelly and clay loams"]],
  place: "Marine air from the bay keeps it cool; deep alluvial soils come from Dry Creek and the western hills.",
  history: "Trefethen restored the 1886 Eshcol winery, one of Napa's surviving nineteenth-century wooden wineries, and championed the name.",
  glass: "Restrained Cabernet and Merlot, crisp Chardonnay and Riesling.",
  exam: "Southern valley floor; Trefethen; full name includes 'of Napa Valley'.",
  producers: ["Trefethen Family Vineyards", "Silver Trident"]
});

APXF["us-oakville"] = nsub({
  lede: "The most valuable stretch of the valley floor, from the To Kalon bench on the west to the Vaca foothills: Mondavi, Opus One, Harlan, Screaming Eagle and Martha's Vineyard.",
  rec: "July 1993", cfr: "9.134", td: "T.D. ATF-343, 58 FR 35884, 2 July 1993",
  facts: [["Soils", "Gravelly Mayacamas fans on the west; heavier volcanic-derived soils on the east"], ["Climate", "Moderately warm; fog burns off by late morning"]],
  place: "A band across the valley, defined with Rutherford in the same 1993 rulemakings. The western bench drains well and ripens evenly; the eastern side is warmer in the afternoon.",
  history: "H.W. Crabb planted To Kalon in the 1860s; Robert Mondavi built his winery on it in 1966, and Opus One (Mondavi and Rothschild) opened across Highway 29 in 1979.",
  glass: "Opulent yet structured Cabernet: cassis, cocoa, mint and polished tannin; Sauvignon Blanc as Fumé Blanc.",
  exam: "To Kalon; Mondavi 1966; Opus One; Martha's Vineyard (Heitz).",
  producers: ["Robert Mondavi Winery", "Opus One", "Harlan Estate", "Screaming Eagle", "Dalla Valle", "Far Niente", "Heitz Cellar (Martha's Vineyard)", "Groth", "PlumpJack"]
});

APXF["us-rutherford"] = nsub({
  lede: "Classic Napa Cabernet country, where the gravelly Rutherford Bench built the reputation of Beaulieu and Inglenook and the phrase 'Rutherford dust'.",
  rec: "July 1993", cfr: "9.133", td: "T.D. ATF-342, 58 FR 35876, 2 July 1993",
  facts: [["Soils", "Gravelly loam on the western bench; heavier soils toward the Silverado Trail"]],
  place: "Between Oakville and St. Helena, moderately warm with morning fog. The bench fans drain well; the east side is more volcanic.",
  history: "André Tchelistcheff, Beaulieu's winemaker from 1938, said it takes Rutherford dust to grow great Cabernet. Inglenook, founded by Gustave Niebaum in 1879, is now owned by Francis Ford Coppola.",
  glass: "Cabernet with dark fruit, dusty cocoa tannin and herbal notes; long-lived.",
  exam: "Rutherford dust; Tchelistcheff; Beaulieu Georges de Latour; Inglenook.",
  producers: ["Inglenook", "Beaulieu Vineyard", "Caymus", "Quintessa", "Staglin Family", "Frog's Leap"]
});

APXF["us-spring-mountain-district"] = nsub({
  lede: "Steep, terraced Mayacamas slopes directly west of St. Helena, with Cabernet of firm tannin and forest-floor complexity and some of Napa's best whites.",
  rec: "May 1993", cfr: "9.143", td: "T.D. ATF-341, 58 FR 28350, 13 May 1993",
  facts: [["Elevation", "About 120 m to almost 800 m"], ["Soils", "Volcanic and uplifted marine sediment"]],
  place: "Vineyards above the fog get warm afternoons and cool nights; varied volcanic and sedimentary soils on steep slopes.",
  history: "Stony Hill's unoaked Chardonnay, first vintage 1952, and Smith-Madrone's Riesling are historic benchmarks.",
  glass: "Structured, herbal, bright Cabernet; taut Chardonnay and Riesling.",
  exam: "West of St. Helena; Stony Hill; Pride Mountain straddles the Sonoma line.",
  producers: ["Stony Hill", "Smith-Madrone", "Pride Mountain", "Cain", "Spring Mountain Vineyard", "Keenan", "Ritchie Creek"]
});

APXF["us-st-helena"] = nsub({
  lede: "The historic centre of Napa around the town of St. Helena, where the valley is narrowest and the warmth of the north meets the last of the bay's influence.",
  rec: "September 1995", cfr: "9.149", td: "T.D. ATF-366, 60 FR 47061, 11 September 1995",
  facts: [["Soils", "Alluvial fans on the west; heavier clay and volcanic soils toward the Vaca side"]],
  place: "Warm days and modest fog; the valley floor narrows here between the two ranges.",
  history: "Charles Krug opened Napa's first commercial winery here in 1861; Beringer followed in 1876.",
  glass: "Ripe, rich Cabernet and Merlot; elegant styles from Spottswoode and Corison.",
  exam: "Charles Krug 1861; Beringer 1876; narrowest point of the valley.",
  producers: ["Spottswoode", "Corison", "Beringer", "Charles Krug", "Heitz Cellar", "Duckhorn", "Grace Family"]
});

APXF["us-stags-leap-district"] = nsub({
  lede: "A small district below the rocky palisades of the Vaca range on the Silverado Trail, where heat from bare rock and cooling bay wind produce the silky Cabernet that won the 1976 Judgment of Paris.",
  rec: "January 1989", cfr: "9.117", td: "T.D. ATF-281, 54 FR 4018, 27 January 1989", am: "T.D. TTB-196 (2024)",
  facts: [["Area", "About 1,100 ha"], ["Soils", "Volcanic rock and gravelly loam fans"]],
  place: "The bare cliffs radiate heat by day, while afternoon wind from the bay is funnelled through and cools the vines.",
  history: "Stag's Leap Wine Cellars' 1973 S.L.V. Cabernet won the red flight at Paris in 1976. The spelling of the AVA has no apostrophe, settling a trademark dispute between Stag's Leap Wine Cellars and Stags' Leap Winery.",
  glass: "'Iron fist in a velvet glove': ripe, silky Cabernet with a firm core.",
  exam: "Paris 1976; palisades; apostrophe dispute.",
  producers: ["Stag's Leap Wine Cellars", "Shafer", "Clos du Val", "Pine Ridge", "Chimney Rock", "Stags' Leap Winery", "Cliff Lede", "Quixote"]
});

APXF["us-wild-horse-valley"] = na({
  lede: "A small, cool upland valley on the ridge east of Napa city, mostly in Solano County, one of the coolest corners of the region.",
  rec: "November 1988", cfr: "9.124", td: "T.D. ATF-278, 53 FR 48247, 30 November 1988",
  facts: [["Counties", "Napa and Solano"], ["Elevation", "About 300 to 600 m"]],
  place: "Open to wind from the bay; volcanic soils. Plantings are tiny.",
  rules: "Part of the AVA lies outside Napa County, so the Napa conjunctive labeling rule does not apply.",
  glass: "Cool-climate Pinot Noir and Chardonnay.",
  exam: "Straddles Napa and Solano; cool upland.",
  producers: [],
  sources: [NAV]
});

APXF["us-yountville"] = nsub({
  lede: "Where the valley floor starts to feel the bay, around the town named after George Yount: clay-rich soils, volcanic knolls and firmer, savoury Cabernet.",
  rec: "March 1999", cfr: "9.160", td: "T.D. ATF-410, 64 FR 13513, 19 March 1999",
  facts: [["Soils", "Alluvial and clay soils with volcanic knolls"]],
  place: "Cooler and windier than Oakville to the north. The knolls rise from the floor as volcanic islands.",
  history: "George C. Yount planted Napa's first vines in the late 1830s. Christian Moueix of Pétrus founded Dominus on the historic Napanook vineyard.",
  glass: "Savoury, structured Cabernet and good Merlot.",
  exam: "George Yount; Dominus (Napanook); Domaine Chandon.",
  producers: ["Dominus Estate", "Domaine Chandon", "Kapcsándy"]
});

// HISTORY-PASS-START
const MEND=["Richard Mendelson, Appellation Napa Valley (GuildSomm summary)","https://www.guildsomm.com/public_content/features/articles/b/richard-mendelson/posts/appellation-napa-valley"];
const HX={
"us-napa-valley":[`<p>George Yount planted the first vines in the late 1830s and Charles Krug opened the first commercial winery in 1861. Phylloxera and Prohibition wiped out most of the industry; Beaulieu and Inglenook kept Cabernet alive, Robert Mondavi built the first big new winery after Prohibition in 1966, and the 1976 Judgment of Paris, won by Stag's Leap Wine Cellars and Chateau Montelena, made Napa world news.</p><p>Drawing the line was a fight. In 1978 the Napa Valley Vintners and the Napa Valley Grape Growers Association, led by Andy Beckstoffer, jointly petitioned for a Napa Valley bounded by the Napa River watershed, on a map they paid an engineering firm to draw, and ATF's March 1980 proposal followed it. Growers in the valleys just outside the watershed (Pope, Wooden, Gordon and Capell) and wineries that bought from them, Domaine Chandon among them, organized as the Eastern Valley Growers and hired a Washington attorney. Their argument: their grapes had gone into wine sold as Napa Valley since the early 1900s. Two days of hearings at the Napa Holiday Inn in April 1980 produced about 100 written comments, 37 witnesses and five rival boundaries, one of which would have confined the valley to land below 400 feet. Bill Jager of Freemark Abbey wrote that failure would bring "worldwide ridicule." ATF declined to taste wines from either side of the proposed lines, calling that too subjective, and settled on almost all of Napa County, leaving out only the land north-east of Putah Creek and Lake Berryessa. The final rule of 28 January 1981 made Napa the second AVA, eight months after Augusta, Missouri.</p><p>The lesson shaped everything that followed. A valley name drawn at county scale says little about any one site, so growers spent the next four decades carving the valley into sixteen nested AVAs, each with its own petition and its own argument about what makes a place distinct.</p>`,[["TTB: Napa Valley final rule (T.D. ATF-79, 1981)","https://www.ttb.gov/system/files?file=images/pdfs/Napa_Valley_final_rule.pdf"],["VinePair: How Napa Valley became the country's second, not first, AVA","https://vinepair.com/articles/how-napa-valley-became-the-countrys-second-not-first-ava"],MEND]],
"us-atlas-peak":[`<p>The petition came from lawyer Richard Mendelson on behalf of Atlas Peak Vineyards, then the only bonded winery inside the area: about 11,400 acres with roughly 565 planted. Nobody could say where the name came from, but it was in print by 1875, when the Napa County Recorder praised Atlas Peak, the "divide between Foss and Capelle Valleys," for its scenery, pure water and dry air as a camping resort. In 1880 a state legislative committee looked at it as a site for a hospital for consumptives because of its "freedom from fogs." That was the viticultural case too: a grower told ATF that when the valley floor lay under fog, "we are in clear sunshine."</p><p>James Reed Harris planted the first vineyard in 1870. It was abandoned under Prohibition, and vines returned when the Mead Ranch was replanted in 1940. In the 1980s Antinori and partners developed Atlas Peak Vineyards and planted Sangiovese, a bet on an Italian grape that never caught on; the estate became Antica. ATF approved the AVA in January 1992.</p>`,[["Federal Register, 23 Jan 1992: Atlas Peak final rule (T.D. ATF-320)","https://archives.federalregister.gov/issue_slice/1992/1/23/2679-2682.pdf"]]],
"us-calistoga":[`<p>Sam Brannan founded Calistoga as a hot-springs resort in the 1860s, and the name has been on wine labels since. The fight came when Bo Barrett of Chateau Montelena led the petition, filed around 2003. Two existing brands, Calistoga Cellars (about 8,500 cases a year, made largely from grapes grown elsewhere) and Calistoga Estate, stood to lose their names. TTB's 2007 tentative decision would have let them keep them; local vintners picketed the opening of the Calistoga Cellars tasting room, and in a 2008 hearing Congressman Mike Thompson pressed TTB's administrator over the delay. More than 1,300 comments arrived, over 1,100 of them form letters from a campaign called "Stand Up for the Little Guy."</p><p>The final rule of December 2009 ran to 48 pages, including an analysis of whether forcing a brand to change was an unconstitutional taking. It gave the brands three years to comply. Barrett's verdict: "Now we can put where we grow the grapes on the label. That's all we ever wanted." The case set the precedent that a geographic name belongs to the place, not to an earlier brand that uses it for grapes from somewhere else.</p>`,[["Federal Register, 8 Dec 2009: Calistoga final rule","https://www.govinfo.gov/content/pkg/FR-2009-12-08/pdf/E9-29217.pdf"],["Napa Valley Register: Feds award AVA to Calistoga (via Rep. Mike Thompson)","https://mikethompson.house.gov/newsroom/news-articles/feds-award-ava-to-calistoga"]]],
"us-chiles-valley":[`<p>The valley carries the name of Joseph Ballinger Chiles, an overland pioneer who received the Rancho Catacula grant in the 1840s. The petition came from Volker Eisele, a German-born grower who had farmed organically there since the 1970s and led a Chiles Valley District committee, with a history of the valley written by wine historian Charles Sullivan. The area was about 6,000 acres with some 1,000 planted and four wineries.</p><p>ATF approved the valley but struck the word "District" from the name: all six public comments supported it, but none offered evidence that anyone had ever called the place that. The 1999 rule is a clean example of TTB's rule that a name has to be proven in use, not chosen for marketing.</p>`,[["Federal Register, 17 Feb 1999: Chiles Valley final rule","https://www.govinfo.gov/content/pkg/FR-1999-02-17/html/99-3759.htm"]]],
"us-coombsville":[`<p>The district is named for Nathan Coombs, who laid out the town of Napa. Its growers first asked for "Tulocay," after the Mexican land grant. TTB withdrew that proposal in 2008: for more than 30 years the name had mostly meant Tulocay Winery, not the area, and many commenters said locals called the place Coombsville. Thomas Farella of Farella-Park and Bradford Kitson then filed a new petition under that name, backed by wineries already putting Coombsville on labels, among them Bighorn, Laird and Monticello Cellars.</p><p>The area was about 11,075 acres with some 1,360 acres of vines in 26 vineyards, and the boundary was trimmed by 125 acres to keep it inside Napa County. The final rule came in December 2011. The case shows TTB treating "locally known" literally: what neighbors call a place outweighs a historic name owned by one brand.</p>`,[["Federal Register, 14 Dec 2011: Coombsville final rule","https://www.govinfo.gov/content/pkg/FR-2011-12-14/html/2011-32018.htm"]]],
"us-crystal-springs-of-napa-valley":[`<p>Steven Burgess of Burgess Cellars petitioned on behalf of local growers for the benchland at the foot of Howell Mountain, north-east of St. Helena: about 30 vineyards with around 230 acres of vines between 400 and 1,400 feet. TTB proposed the AVA in March 2023 and approved it in October 2024, moving part of the Calistoga boundary in the same rule so the two would not overlap. It is the youngest Napa sub-AVA and fills the gap between the valley floor and the Howell Mountain line at 1,400 feet.</p>`,[["Federal Register, 16 Oct 2024: Crystal Springs of Napa Valley final rule","https://www.federalregister.gov/documents/2024/10/16/2024-23655"]]],
"us-diamond-mountain-district":[`<p>Jacob Schram, a barber turned vintner, planted the first vines on these slopes in 1862 or 1863, and a Diamond Mountain school operated by 1909. Diamond Creek, founded by Al Brounstein in 1968, bottled its separate blocks (Volcanic Hill, Red Rock Terrace, Gravelly Meadow) and made the mountain famous.</p><p>The petition came from Rudy von Strasser for a Diamond Mountain Appellation Committee of 15 growers holding 87% of the vineyard land: about 5,000 acres with 450 planted. The obstacle was a neighbor's brand. The Constant family's Diamond Mountain Vineyard, whose vines go back to about 1900, straddles the Sonoma County line, and they objected. TTB kept the AVA inside Napa County and added "District" to the name so it could not be confused with their winery. Approved in 2001.</p>`,[["Federal Register, 1 Jun 2001: Diamond Mountain District final rule","https://www.govinfo.gov/content/pkg/FR-2001-06-01/pdf/01-13821.pdf"]]],
"us-howell-mountain":[`<p>Howell Mountain had a reputation before it had a boundary: Brun & Chaix won a bronze medal at the 1889 Paris Exposition with wine from here. The AVA began at Mike Beatty's kitchen table, with the corners of a topographic map held down by wine bottles. Randy Dunn, Bob Brakesman of Summit Lake, Bob Lamborn and Bill Smith of La Jota, a former oil man who did most of the legwork and hired historian Charles Sullivan, drew the line at 1,400 feet. That is roughly the top of the summer fog inversion, so the vineyards above it get sun in the morning while the valley is still grey. It was the first sub-AVA in Napa, and it set the idea of an elevation contour as an AVA boundary. Dunn's Cabernets from the 1980s then gave the mountain its modern fame.</p>`,[["Press Democrat: The men behind Howell Mountain AVA","https://www.pressdemocrat.com/2013/11/03/the-men-behind-howell-mountain-ava"]]],
"us-los-carneros":[`<p>The name comes from the Rancho Rincon de los Carneros, "corner of the rams." William Winter bought about 1,000 acres of the Huichica rancho in the 1850s and built the first winery in the 1870s, and Louis M. Martini bought the Stanly Ranch in 1942. Martini and André Tchelistcheff pioneered cool-climate Pinot Noir and Chardonnay here.</p><p>The petition came from Beaulieu Vineyard, with assistant winemaker Anthony Bell. BV argued that budbreak and bloom ran 7 to 14 days behind the rest of Napa and that the area was "too cool to adequately ripen Cabernet." BV wanted a Napa-only AVA, but Sonoma growers, organized by Jim Carter of Sebastiani, pushed the western line out to the Sonoma Valley boundary. The result, effective in 1983, was the first AVA to cross a county line. At the time there were only two wineries, Acacia and Carneros Creek, and under 1,000 acres of vines. Champagne and Cava houses followed (Domaine Carneros, Gloria Ferrer, Artesa), and the growers formed the Carneros Quality Alliance in 1985. A 2006 amendment made "Carneros" and "Los Carneros" interchangeable on labels.</p>`,[["TTB: Los Carneros hearing transcript","https://www.ttb.gov/system/files/images/pdfs/hearing-transcript-for-los-carneros-viticultural-area.pdf"],["Sonoma County Winegrowers: 1983, a busy year for appellations","https://sonomawinegrape.org/1983-a-busy-year-for-appellations"]]],
"us-mt-veeder":[`<p>The mountain is named for the Rev. Peter V. Veeder, pastor of Napa's Presbyterian church from 1859 and a keen hiker; the name was in print by 1879, though much of the area was called the Napa Redwoods into the 1940s. Mayacamas Vineyards, built on the foundations of an 1889 stone winery, has made long-lived Cabernet and Chardonnay here since the 1940s.</p><p>Robert Craig, then of Napa Valley Estate Vineyards & Winery, filed the petition and asked for the name "Mt. Veeder-Napa Valley." ATF refused to fold "Napa Valley" into the name and approved plain Mt. Veeder in 1990: about 15,000 acres, five wineries and 850 acres of vines.</p>`,[["TTB: Mt. Veeder final rule","https://www.ttb.gov/system/files/2025-01/Mt_Veeder_final_rule.pdf"]]],
"us-oak-knoll-district-of-napa-valley":[`<p>Historian Charles Sullivan's report for the petition traced the name through the Oak Knoll Ranch, an Oak Knoll school district, a railroad station and the Oak Knoll Inn. The Trefethens bought the old Eshcol estate in 1968, a 600-acre ranch of walnuts, wheat, prunes and grapes, and restored its 1886 wooden winery. The Oak Knoll District Committee filed the petition, and Luna Vineyards asked to extend the boundary east.</p><p>Then an Oregon winery objected. Oak Knoll Winery in the Willamette Valley had used the name for decades, so TTB approved the AVA in 2004 under the longer name Oak Knoll District of Napa Valley. The area covers about 8,300 acres with around 3,500 plantable.</p>`,[["Federal Register, 25 Feb 2004: Oak Knoll District of Napa Valley final rule","https://www.govinfo.gov/content/pkg/FR-2004-02-25/html/04-4087.htm"]]],
"us-oakville":[`<p>H.W. Crabb planted To Kalon in the 1860s; Robert Mondavi built his winery on it in 1966, and Opus One opened across Highway 29 in 1979.</p><p>The AVA came out of the Rutherford Bench argument. In 1988 a committee of seven wineries and seven growers began meeting over breakfast at Tom and Martha May's home in Martha's Vineyard, with Richard Mendelson as counsel. On 8 March 1989 they filed for four AVAs at once: Oakville, Oakville Bench, Rutherford and Rutherford Bench. The bench petitions drew fire, both from geologists who doubted a single bench existed and from valley-floor growers afraid of becoming second-class, like the châteaux left out of the 1855 Bordeaux classification, and they were withdrawn. UC Davis geographer Deborah Elliott-Fisk's soil work helped draw the line that survived: Oakville's alluvial fans are rich in Sonoma Volcanics debris, while Rutherford's carry more serpentine and chert. After 1992 hearings, both AVAs were approved on 2 July 1993, divided along Skellenger Lane.</p>`,[["Federal Register, 2 Jul 1993: Oakville and Rutherford final rules","https://archives.federalregister.gov/issue_slice/1993/7/2/35877-35891.pdf"],["Vinous: The Rutherford and Oakville AVAs, early days","https://v1.vinous.com/articles/the-rutherford-and-oakville-avas-early-days-sep-2016"]]],
"us-rutherford":[`<p>André Tchelistcheff, Beaulieu's winemaker from 1938, said it takes Rutherford dust to grow great Cabernet. Inglenook, founded by Gustave Niebaum in 1879, is now owned by Francis Ford Coppola.</p><p>Hugh Johnson's World Atlas of Wine had mapped a "Rutherford Bench" west of Highway 29, and by the 1980s the term was a selling point with no agreed edges; some put it from Yountville to St. Helena. In 1988 a committee including Steve Girard, Agustin Huneeus, Justin Meyer, Joe Heitz, Walt Raymond, Chuck Wagner and Tom and Martha May met over breakfast and filed four petitions in March 1989: Rutherford, Rutherford Bench, Oakville and Oakville Bench. The bench petitions were withdrawn amid geological doubt and fears of a two-tier valley. The edges of Rutherford were set by alluvial fans: Zinfandel Lane marks where the Sulphur Canyon fan meets the Rutherford and Conn Creek fans, and Skellenger Lane splits Rutherford from Oakville. Approved 2 July 1993.</p>`,[["TTB: Rutherford final rule","https://www.ttb.gov/system/files/2025-01/Rutherford_final_rule.pdf"],["Vinous: The Rutherford and Oakville AVAs, early days","https://v1.vinous.com/articles/the-rutherford-and-oakville-avas-early-days-sep-2016"]]],
"us-spring-mountain-district":[`<p>Spring Mountain is not a peak but a district named for the springs on its slopes, which supplied St. Helena's drinking water from 1878 into the 1920s; a Spring Mountain school ran from the 1870s to the 1930s, and the name was in the St. Helena Star by December 1877. Stony Hill's Chardonnay, first made in 1952, and Smith-Madrone's Riesling are historic benchmarks.</p><p>The petition came from Michael Marston of Marston Vineyards and Fritz Maytag, owner of York Creek vineyard and of Anchor Brewing: about 8,600 acres with roughly 1,000 planted in more than 30 vineyards. Because Spring Mountain Vineyard already used the name as a brand, the petitioners amended their request on 2 December 1992 to Spring Mountain District, and ATF approved it under that name in 1993.</p>`,[["TTB: Spring Mountain District petition","https://www.ttb.gov/system/files/images/pdfs/Spring_Mountain_District_petition.pdf"]]],
"us-stags-leap-district":[`<p>Nathan Fay planted Cabernet here in 1961, against the advice of UC Davis, which thought the site too cold. Warren Winiarski, who had worked for Robert Mondavi, bought land next door in 1970, and his Stag's Leap Wine Cellars 1973 S.L.V. Cabernet won the red flight at Paris in 1976.</p><p>The name came with a decade of lawsuits. Winiarski's Stag's Leap Wine Cellars and Carl Doumani's Stags' Leap Winery fought over it until a 1982 appeals ruling held that it was a geographic name no one could own; the two settled by apostrophe placement and in 1985 even released a joint wine, Accord. The AVA petition was filed in August 1985 by a committee chaired by John Shafer, with Richard Steltzner and lawyer Richard Mendelson. It asked for "Stags Leap"; after Winiarski joined, a December 1985 amendment changed it to "Stags Leap District," citing Steltzner's back labels. A 1986 amendment added Silverado Vineyards, backed by a 60-page soil study. More than 150 letters arrived, some from as far as South Dakota, and the final rule in January 1989 pushed the north line out about 500 yards to take in two small wineries. It took four to five years, and the spelling, with no apostrophe at all, is the treaty.</p>`,[["Vinous: Appellation Napa Valley excerpt, Stags Leap District","https://v1.vinous.com/articles/book-excerpt-appellation-napa-valley-stags-leap-district-jul-2017"],["Los Angeles Times, 27 Jan 1989: Stags Leap District approved","https://www.latimes.com/archives/la-xpm-1989-01-27-fi-1556-story.html"],["TTB: Amendment to Stags Leap petition, 18 Dec 1985","https://www.ttb.gov/system/files/images/pdfs/amendment-to-stags-leap_ava-december-18-1985.pdf"]]],
"us-st-helena":[`<p>Charles Krug opened Napa's first commercial winery here in 1861 and Beringer followed in 1876; by the 1880s St. Helena was the commercial heart of the valley. Charles Carpy filed the AVA petition in March 1994, with history from Charles Sullivan and soils and geology from UC Davis geographer Deborah Elliott-Fisk, the same team behind Rutherford. It covered about 9,060 densely planted acres.</p><p>The hard question was the southern edge. Between St. Helena and the Rutherford line at Zinfandel Lane lay a strip that had been argued over during the Rutherford hearings. Andy Beckstoffer and two other commenters asked ATF to leave it out of both AVAs until better data existed, arguing that its rainfall, elevation and soils matched land to the north but its geology was disputed. ATF set the boundary and approved St. Helena in September 1995; the episode showed how a line drawn for one AVA becomes a fixed edge that every neighbor must then argue against.</p>`,[["Federal Register, 11 Sep 1995: St. Helena final rule (T.D. ATF-366)","https://www.govinfo.gov/content/pkg/FR-1995-09-11/html/95-22486.htm"]]],
"us-wild-horse-valley":[`<p>Books named the valley as early as 1866, and the first wine vineyard was Joseph Vorbe's, 50 acres by 1881. John Newmeyer of Napa and four others filed the petition, with a history by wine historian William Heintz. Their best evidence was climate: a 1965 thermograph study at James Birkmyer's ranch at the north end measured UC Davis Region I, under 2,500 degree days, cooler than almost anywhere else in Napa, the result of height and wind off the San Pablo Bay. The boundary was drawn mostly with straight lines between the peaks around the valley, straddling the Napa-Solano county line, and ATF approved it in November 1988.</p>`,[["Federal Register, 30 Nov 1988: Wild Horse Valley final rule (T.D. ATF-278)","https://www.govinfo.gov/content/pkg/FR-1988-11-30/pdf/FR-1988-11-30.pdf"]]],
"us-yountville":[`<p>George C. Yount first visited the valley in 1831, received the Rancho Caymus on 3 March 1836 and had a small vineyard by the 1840s, the first in Napa. In 1855 he had a town surveyed; it was renamed Yountville in his honor in 1887, two years after his death, and an 1880s wine advertisement already sold grapes as from Yountville.</p><p>Richard Mendelson filed the petition for local wineries and growers, with a history by Charles Sullivan: about 8,260 acres with 3,500 planted, between Oakville to the north and Oak Knoll, then petitioning separately, to the south. The case rested on cooler conditions and the hills that interrupt the valley floor here. ATF approved it in March 1999. Christian Moueix of Pétrus founded Dominus on the historic Napanook vineyard inside it.</p>`,[["Federal Register, 19 Mar 1999: Yountville final rule (T.D. ATF-410)","https://www.govinfo.gov/content/pkg/FR-1999-03-19/html/99-6735.htm"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
