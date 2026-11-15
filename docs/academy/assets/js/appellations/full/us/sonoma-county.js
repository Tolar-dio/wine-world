// Full encyclopedia entries: Sonoma County AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function so(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const SOCJ="California law requires conjunctive labeling for AVAs wholly inside Sonoma County: the label must also say Sonoma County.";
const SOV=["Sonoma County Vintners: AVAs","https://sonomawine.com/sonoma-county-avas/"];
function ss(o){return so(Object.assign({lab:SOCJ,sources:[SOV]},o));}

APXF["us-sonoma-valley"] = ss({
  lede: "The 'Valley of the Moon' between the Mayacamas and Sonoma Mountain, where California's wine story began with the mission vineyards, General Vallejo and Agoston Haraszthy's Buena Vista.",
  rec: "December 1981", cfr: "9.29", td: "T.D. ATF-96, 46 FR 59238, 4 December 1981", am: "T.D. ATF-201 (1985) and T.D. ATF-249 (1987)",
  facts: [["Sub-AVAs", "Sonoma Mountain, Bennett Valley, Moon Mountain District, part of Los Carneros"], ["Climate", "Cool in the south near the bay, warmer north toward Kenwood"]],
  place: "A 27 km valley running north from San Pablo Bay toward Santa Rosa. Fog and wind from the bay cool the south, while the north end is warm; the Mayacamas to the east and Sonoma Mountain to the west shelter it from coastal fog. Soils mix volcanic material on the slopes with alluvium on the floor.",
  history: "Mission San Francisco Solano (1823) planted the first vines; Haraszthy founded Buena Vista in 1857 and Gundlach Bundschu's Rhinefarm dates to 1858. Hanzell, founded in 1953, pioneered French oak for California Chardonnay and Pinot Noir.",
  glass: "Wide range: Zinfandel from old vines, Cabernet from the slopes, Chardonnay and Pinot Noir near Carneros; Bedrock's heritage field blends.",
  exam: "Valley of the Moon; Buena Vista 1857; Hanzell; Sonoma Mountain and Moon Mountain sub-AVAs.",
  producers: ["Hanzell", "Gundlach Bundschu", "Buena Vista", "Kamen", "Arrowood", "Kunde", "Bedrock"]
});

APXF["us-bennett-valley"] = ss({
  lede: "A small, cool AVA in the hills south-east of Santa Rosa, ventilated by marine air through the Crane Canyon gap.",
  rec: "October 2003", cfr: "9.142", td: "T.D. TTB-6, 68 FR 61748, 30 October 2003",
  facts: [["Location", "North-west of Sonoma Mountain's peak, south-east of Santa Rosa"]],
  place: "A bowl ringed by Sonoma Mountain, Bennett Peak and Taylor Mountain. Marine air and fog from the Petaluma side flow in through the Crane Canyon gap, so it is cooler than the Sonoma Valley floor.",
  glass: "Merlot, Syrah and Sauvignon Blanc with freshness; some Pinot Noir and Chardonnay.",
  exam: "Crane Canyon gap; Matanzas Creek.",
  producers: ["Matanzas Creek"]
});

APXF["us-moon-mountain-district-sonoma-county"] = ss({
  lede: "Steep, west-facing slopes of the Mayacamas above the Sonoma Valley, with red volcanic soils and the historic Monte Rosso vineyard.",
  rec: "October 2013", cfr: "9.231", td: "T.D. TTB-117, 78 FR 60692, 2 October 2013",
  facts: [["Area", "About 7,100 ha (17,600 acres)"], ["Soils", "Volcanic rock and red, iron-rich soils"]],
  place: "Mountain sites above the fog with afternoon sun and thin volcanic soils. The full name includes 'Sonoma County', which TTB required to avoid confusion.",
  history: "Monte Rosso was planted in the 1880s by Emmanuel Goldstein and later bought by Louis M. Martini; its old Zinfandel and Cabernet vines are among California's most prized.",
  glass: "Dense, structured Cabernet and spicy old-vine Zinfandel.",
  exam: "Monte Rosso; full name ends in Sonoma County.",
  producers: ["Louis M. Martini (Monte Rosso)", "Kamen", "Repris", "Bedrock (Monte Rosso)"]
});

APXF["us-sonoma-mountain"] = ss({
  lede: "Mountain vineyards above Glen Ellen on the western side of the Sonoma Valley, including Jack London's Beauty Ranch.",
  rec: "January 1985", cfr: "9.102", td: "T.D. ATF-196, 50 FR 2979, 23 January 1985", am: "T.D. ATF-249 (1987)",
  facts: [["Soils", "Thin volcanic soils"]],
  place: "East-facing slopes above the fog get sun and a long season; thin soils keep yields low.",
  history: "Patrick Campbell's Laurel Glen, from 1981, made the name with savoury, long-lived Cabernet.",
  glass: "Fine-grained, savoury Cabernet; Pinot Noir and Chardonnay higher up.",
  exam: "Laurel Glen; Jack London Ranch.",
  producers: ["Laurel Glen", "Benziger", "Repris"]
});

APXF["us-northern-sonoma"] = ss({
  lede: "An umbrella AVA over most of northern Sonoma County, petitioned by Gallo and used for wines blended across the Russian River, Dry Creek, Alexander and Knights valleys.",
  rec: "May 1985", cfr: "9.70", td: "T.D. ATF-204, 50 FR 20562, 17 May 1985", am: "T.D. ATF-233 (1986), ATF-300 (1990), TTB-97 (2011)",
  facts: [["Contains", "Alexander Valley, Chalk Hill, Dry Creek Valley, Knights Valley, Rockpile, Russian River Valley, Green Valley and others"]],
  place: "From the coastal hills to the Mayacamas across the northern half of the county; climates range from foggy Russian River to warm Alexander Valley.",
  glass: "Varies by blend; Cabernet, Chardonnay, Pinot Noir and Zinfandel.",
  exam: "Umbrella AVA; Gallo petition.",
  producers: ["Gallo Family Vineyards"]
});

APXF["us-alexander-valley"] = ss({
  lede: "The upper Russian River from Healdsburg to Cloverdale, warm and less foggy than the lower river: Sonoma's Cabernet heartland.",
  rec: "October 1984", cfr: "9.53", td: "T.D. ATF-187, 49 FR 42724, 24 October 1984", am: "several times between 1986 and 2008",
  facts: [["Soils", "Deep alluvial loams; gravel benches; volcanic hillsides to the east"], ["Named for", "Cyrus Alexander, settler of the 1840s"]],
  place: "The valley floor is wide and fertile; the best Cabernet often comes from benches and the eastern hills toward the Mayacamas, which get afternoon sun.",
  glass: "Plush, round Cabernet with soft tannin and cocoa; ripe Chardonnay and Zinfandel.",
  exam: "Cabernet heartland of Sonoma; Jordan; Silver Oak's second home.",
  producers: ["Jordan", "Silver Oak (Alexander Valley)", "Stonestreet", "Simi", "Robert Young", "Hawkes"]
});

APXF["us-chalk-hill"] = ss({
  lede: "A warm, hilly corner of the Russian River Valley east of Windsor, named for pale soils that are volcanic ash, not chalk.",
  rec: "October 1983", cfr: "9.52", td: "T.D. ATF-155, 48 FR 48812, 21 October 1983", am: "T.D. ATF-272 (1988)",
  facts: [["Soils", "Pale volcanic ash mixed with river sediment"]],
  place: "Above much of the fog, warmer than the rest of the Russian River Valley.",
  glass: "Rich Chardonnay and Sauvignon Blanc; Merlot and Cabernet.",
  exam: "Volcanic ash, not chalk; inside Russian River Valley.",
  producers: ["Chalk Hill Estate", "Rodney Strong"]
});

APXF["us-dry-creek-valley"] = ss({
  lede: "A narrow valley north-west of Healdsburg whose gravelly red benches hold old, dry-farmed Zinfandel planted by Italian families.",
  rec: "August 1983", cfr: "9.64", td: "T.D. ATF-137, 48 FR 35397, 4 August 1983", am: "T.D. ATF-468 (2001)",
  facts: [["Soils", "Iron-rich gravelly benches; alluvial floor"], ["Length", "About 25 km, dammed at its head by Lake Sonoma"]],
  place: "Warm days; fog reaches the southern end near Healdsburg. Benches drain well; the floor is more fertile.",
  glass: "Archetypal Zinfandel: brambly fruit, pepper and spice; Sauvignon Blanc; Rhône varieties.",
  exam: "Zinfandel; Italian field blends; Ridge Lytton Springs.",
  producers: ["Ridge (Lytton Springs)", "Quivira", "Preston", "Dry Creek Vineyard", "Pedroncelli", "Unti", "A. Rafanelli", "Nalle"]
});

APXF["us-knights-valley"] = ss({
  lede: "A small, elevated valley between Alexander Valley and Calistoga, on volcanic soils from Mount St. Helena.",
  rec: "October 1983", cfr: "9.76", td: "T.D. ATF-158, 48 FR 48816, 21 October 1983",
  facts: [["Soils", "Volcanic soils from Mount St. Helena"]],
  place: "Warmer than most of Sonoma, higher and drier, sharing Calistoga's volcanic geology.",
  glass: "Structured Cabernet; Sauvignon Blanc and Chardonnay.",
  exam: "Peter Michael; Beringer Knights Valley.",
  producers: ["Peter Michael", "Beringer (Knights Valley)"]
});

APXF["us-rockpile"] = ss({
  lede: "Remote ridges above Lake Sonoma, limited to land above 800 feet, with spicy, concentrated Zinfandel.",
  rec: "February 2002", cfr: "9.173", td: "T.D. ATF-473, 67 FR 9193, 28 February 2002",
  facts: [["Elevation", "Above about 240 m (800 feet)"]],
  place: "Thin, rocky soils, wind and sun above the fog.",
  glass: "Concentrated, firm Zinfandel and Petite Sirah.",
  exam: "800-foot floor; Lake Sonoma; Mauritson.",
  producers: ["Mauritson", "Carol Shelton"]
});

APXF["us-russian-river-valley"] = ss({
  lede: "California's best-known cool-climate Pinot Noir region, where fog up the river and through the Petaluma Gap gives cold mornings and nights over sandy Goldridge soils.",
  rec: "October 1983", cfr: "9.66", td: "T.D. ATF-159, 48 FR 48813, 21 October 1983", am: "expanded in 2003, 2005, 2011 and 2024",
  facts: [["Soils", "Goldridge sandy loam, river terraces, some clay"], ["Sub-AVAs", "Green Valley of Russian River Valley, Chalk Hill"]],
  place: "From Healdsburg south to Sebastopol around the lower river. Morning fog burns off to warm afternoons, then returns in the evening, giving large daily temperature swings.",
  history: "Joseph Swan, Williams Selyem and Rochioli made its Pinot Noir reputation from the 1970s and 1980s.",
  glass: "Ripe, red- and black-cherry Pinot Noir with cola and spice; rich, citrus-edged Chardonnay; old-vine Zinfandel in warmer spots.",
  exam: "Fog; Goldridge; Williams Selyem, Rochioli; Westside Road.",
  producers: ["Williams Selyem", "Rochioli", "Kistler", "Dehlinger", "Gary Farrell", "Merry Edwards", "Joseph Swan", "DuMOL"]
});

APXF["us-green-valley-of-russian-river-valley"] = ss({
  lede: "The foggy south-western corner of the Russian River Valley around Forestville and Graton, almost entirely Goldridge sandy loam, classic ground for sparkling wine and taut Pinot Noir and Chardonnay.",
  rec: "November 1983", cfr: "9.57", td: "T.D. ATF-161, 48 FR 52579, 21 November 1983", am: "T.D. TTB-60 (2007), adding 'of Russian River Valley' to the name",
  facts: [["Soils", "Goldridge sandy loam"]],
  place: "One of the coolest parts of the Russian River Valley, near the Bodega gap.",
  glass: "High-acid Chardonnay and Pinot Noir; sparkling wine.",
  exam: "Iron Horse; name changed in 2007.",
  producers: ["Iron Horse", "Marimar Estate", "Dutton-Goldfield", "Hartford Family"]
});

APXF["us-fountaingrove-district"] = ss({
  lede: "Mayacamas foothills north-east of Santa Rosa named after the utopian Fountaingrove colony, whose winery was run by the Japanese samurai Kanaye Nagasawa.",
  rec: "February 2015", cfr: "9.250", td: "T.D. TTB-128, 80 FR 8531, 18 February 2015",
  facts: [["Area", "About 15,400 ha (38,000 acres), with a few hundred hectares of vines"]],
  place: "Hillsides above Santa Rosa, warm with afternoon breezes; many vineyards burned in the 2017 Tubbs Fire.",
  history: "Thomas Lake Harris founded the Brotherhood of the New Life at Fountaingrove in 1875; Kanaye Nagasawa ran its winery and became known as California's grape king.",
  glass: "Cabernet, Merlot, Syrah and Zinfandel.",
  exam: "Kanaye Nagasawa; Fountaingrove colony.",
  producers: ["Paradise Ridge"]
});

APXF["us-sonoma-coast"] = ss({
  lede: "A vast AVA from the Mendocino line to San Pablo Bay, drawn so broadly that it mixes cold coastal ridges with warm inland land; its true coast is now West Sonoma Coast.",
  rec: "June 1987", cfr: "9.116", td: "T.D. ATF-253, 52 FR 22304, 11 June 1987",
  facts: [["Area", "More than 200,000 ha (500,000 acres)"], ["Sub-AVAs", "Fort Ross-Seaview, West Sonoma Coast, Petaluma Gap (partly), Green Valley"]],
  place: "The western and southern parts of the county, defined by marine influence; it includes much of the Russian River Valley.",
  history: "Its boundaries are usually traced to Sonoma-Cutrer's need for one AVA covering its scattered vineyards for estate bottling.",
  glass: "Cool-climate Pinot Noir, Chardonnay and Syrah of varying intensity.",
  exam: "Huge, heterogeneous; Sonoma-Cutrer; West Sonoma Coast carved out 2022.",
  producers: ["Sonoma-Cutrer", "Flowers", "Littorai", "Peay", "Failla", "Hirsch"]
});

APXF["us-west-sonoma-coast"] = ss({
  lede: "The 'true' Sonoma Coast: the ridges nearest the Pacific from the Gualala River south toward Freestone and Occidental, approved in 2022 after decades of grower pressure.",
  rec: "May 2022", cfr: "9.283", td: "T.D. TTB-179, 87 FR 31180, 23 May 2022",
  facts: [["Area", "About 57,000 ha (141,800 acres)"], ["Soils", "Franciscan marine sediments and sandstone"]],
  place: "Ridgetops above the fog get sun, while hollows stay foggy and cold. Strong ocean influence keeps temperatures low and the season long.",
  glass: "Taut, perfumed Pinot Noir, saline Chardonnay, peppery Syrah.",
  exam: "2022; Pacific ridges; Annapolis, Fort Ross, Freestone, Occidental.",
  producers: ["Flowers", "Hirsch", "Peay", "Littorai", "Wayfarer", "Marcassin", "Ceritas"]
});

APXF["us-fort-ross-seaview"] = ss({
  lede: "Ridgetop vineyards above the fog near the ruins of the Russian colony at Fort Ross, on the San Andreas fault: tiny yields of intense Pinot Noir and Chardonnay.",
  rec: "December 2011", cfr: "9.221", td: "T.D. TTB-98, 76 FR 77695, 14 December 2011",
  facts: [["Area", "About 11,100 ha (27,500 acres)"], ["Elevation", "Mostly above about 280 m (920 feet)"]],
  place: "Steep Franciscan sandstone and shale ridges; vines sit above the marine layer in sunshine while valleys below are fogged in, and cold air drains away at night.",
  history: "David Hirsch planted here in 1980; Flowers and Marcassin followed.",
  glass: "Concentrated, high-acid Pinot Noir and Chardonnay with savoury, saline notes.",
  exam: "Above the fog; Hirsch; San Andreas fault; Fort Ross.",
  producers: ["Hirsch", "Flowers", "Marcassin", "Fort Ross Vineyard", "Wild Hog"]
});

APXF["us-petaluma-gap"] = so({
  lede: "One of the few AVAs defined by wind: a break in the coastal hills between Bodega Bay and San Pablo Bay that funnels cold ocean air inland every afternoon.",
  rec: "December 2017", cfr: "9.261", td: "T.D. TTB-149, 82 FR 57662, 7 December 2017",
  facts: [["Counties", "Sonoma and Marin"], ["Area", "About 82,000 ha (202,500 acres)"]],
  place: "Afternoon winds slow ripening, thicken skins and keep acidity high; fog is frequent. Soils are mixed marine sediments and volcanic material.",
  rules: "Because it crosses into Marin County, Sonoma's conjunctive labeling rule does not apply.",
  glass: "Dark-fruited, acid-driven Pinot Noir, Syrah and Chardonnay.",
  exam: "Wind-defined AVA; Sonoma and Marin.",
  producers: ["Keller Estate", "Kastania"],
  sources: [SOV]
});

APXF["us-pine-mountain-cloverdale-peak"] = so({
  lede: "A small mountain AVA around Pine Mountain above Cloverdale, straddling Sonoma and Mendocino, with vines above the Alexander Valley heat.",
  rec: "October 2011", cfr: "9.220", td: "T.D. TTB-96, 76 FR 66637, 27 October 2011",
  facts: [["Counties", "Sonoma and Mendocino"], ["Elevation", "About 490 to 900 m"]],
  place: "Thin, rocky volcanic and sedimentary soils on the western flank of the Mayacamas, above fog and heat.",
  rules: "Because it extends into Mendocino County, the Sonoma conjunctive labeling rule does not apply.",
  glass: "Firm, fresh mountain Cabernet Sauvignon and Cabernet Franc.",
  exam: "Straddles Sonoma and Mendocino; above Alexander Valley.",
  producers: [],
  sources: [SOV]
});
})();
