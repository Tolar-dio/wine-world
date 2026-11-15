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
})();
