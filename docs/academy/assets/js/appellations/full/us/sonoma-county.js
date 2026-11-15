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

// HISTORY-PASS-START
const SCW=["Sonoma County Winegrowers: 1983, a busy year for appellations","https://sonomawinegrape.org/1983-a-busy-year-for-appellations"];
const HX={
"us-sonoma-valley":[`<p>Franciscan friars planted the first vines at Mission San Francisco Solano in 1823, and General Mariano Vallejo expanded them after founding the town of Sonoma in 1835. In the late 1850s Agoston Haraszthy founded Buena Vista (1857) and Jacob Gundlach planted the Rhinefarm (1858), among the first large plantings of European vines in the state. Hanzell, founded in 1953, pioneered French oak for California Chardonnay and Pinot Noir.</p><p>The Sonoma Valley Vintners Association filed its petition in June 1979, and ATF approved it in December 1981, making Sonoma Valley the county's first AVA and the ninth in the country. The valley's line later became the western edge that Sonoma growers insisted on when Carneros was drawn across both counties.</p>`,[["TTB: Sonoma Valley petition (1979)","https://www.ttb.gov/media/69107/download?inline"]]],
"us-bennett-valley":[`<p>The valley and Bennett Mountain are named for James N. Bennett, a Missouri settler who arrived by wagon train in 1849. Isaac DeTurk, whom Santa Rosa historian Gaye LeBaron called the pioneer vineyardist of the Santa Rosa Valley, planted 30 acres of Mission and Zinfandel at the foot of Bennett Mountain in 1862 and sold up in 1885 to build a far larger vineyard near Kenwood.</p><p>Matanzas Creek, founded by Sandra MacIver and David Steiner in the 1970s, was the valley's first winery of the twentieth century and made its name with Merlot. The AVA, approved in October 2003, rests on the valley's position: a bowl ringed by Sonoma Mountain, Bennett Peak and Taylor Mountain, with marine air pouring in through the Crane Canyon gap, cooler than Sonoma Valley over the ridge.</p>`,[["Federal Register, 30 Oct 2003: Bennett Valley final rule","https://www.federalregister.gov/documents/2003/10/30/03-27316/bennett-valley-viticultural-area-2002r-009t"]]],
"us-moon-mountain-district-sonoma-county":[`<p>Monte Rosso was planted in the 1880s by Emmanuel Goldstein and later bought by Louis M. Martini; its old Zinfandel and Cabernet vines, named for the red volcanic soil, are among California's most prized. The AVA petition was written by geographer Patrick Shabram on behalf of Christian Borcher for the area's vintners and growers. Their case was geology: iron-rich volcanic soils on the western slopes of the Mayacamas, 400 to 2,200 feet up, unlike the sedimentary soils of the valley below. TTB approved it in October 2013 under the long name Moon Mountain District Sonoma County.</p>`,[["Wikipedia: Moon Mountain District Sonoma County","https://en.wikipedia.org/wiki/Moon_Mountain_District_Sonoma_County_AVA"]]],
"us-sonoma-mountain":[`<p>Vallejo's name Sonoma, taken from a Native name for the valley, spread from the valley to the range on its west and to its highest peak. Jack London farmed on its slopes and wrote in John Barleycorn (1913) about the mountain's vineyards. The AVA petition came from grower David Steiner on behalf of himself and other viticulturists, and ATF approved it in January 1985. The argument was elevation: vineyards above the valley's fog and frost. Patrick Campbell's Laurel Glen, founded in 1981, then gave the name its reputation with savoury, long-lived Cabernet.</p>`,[["Wikipedia: Sonoma Mountain AVA","https://en.wikipedia.org/wiki/Sonoma_Mountain_AVA"]]],
"us-northern-sonoma":[`<p>This is Gallo's AVA. E. & J. Gallo petitioned for an area that would cover its Sonoma vineyards, and revised the boundary on 28 September 1982 after further talks with Ernest Gallo. The petition explained why the name could not simply be "Sonoma": that word already belonged to the Sonoma Valley AVA, and the growth of Santa Rosa had split the county's old wine country in two. It also recalled that Sonoma led California in wine in the 1860s and had 256 wineries by 1910. ATF approved the AVA in 1985. It works as an umbrella, letting a producer blend Russian River, Dry Creek, Alexander Valley and Knights Valley fruit under one name narrower than the county.</p>`,[["TTB: Northern Sonoma petition","https://www.ttb.gov/system/files/images/pdfs/Northern_Sonoma_petition.pdf"]]],
"us-alexander-valley":[`<p>Cyrus Alexander came in 1840 to manage Henry Fitch's 48,800-acre Rancho Sotoyome, took 8,800 acres of it as payment, and called the valley "the brightest and the best spot in the world." The first commercial winery, Lone Pine, was opened in 1889 by Shadrach Osborn, and Horace Chase built the Red Winery.</p><p>The AVA was approved in 1984, and its edges have been redrawn twice. In 1988 ATF moved about 1,076 acres from the north-central leg of Chalk Hill into Alexander Valley, so that vineyards would carry the name that matched their climate. In 2008 geographer Patrick Shabram won a 1,300-acre extension near Cloverdale for Anthony Martorana, whose Parker vineyard dated to 1890.</p>`,[["Alexander Valley Winegrowers: History","https://alexandervalley.org/history"],["TTB: Realignment of the Alexander Valley and Chalk Hill boundary (T.D. ATF-272)","https://www.ttb.gov/media/68681/download?inline"]]],
"us-chalk-hill":[`<p>Seven wineries and growers filed the petition in July 1981: Donna Maria Vineyards, Blasi Vineyard, Oak Hill Vineyard, Balverne, Landmark, DeLoach and Korbel. They asked for "Sonoma Chalk Hill"; ATF approved plain Chalk Hill in October 1983, one of six Sonoma AVAs rushed through that year as labeling rules began to require approved names. The "chalk" is a misnomer: the pale soil is volcanic ash, not limestone. In 1988 ATF shifted about 1,076 acres on the northern edge into Alexander Valley, whose warmer climate those vineyards shared.</p>`,[["TTB: Petition to establish Sonoma Chalk Hill (1981)","https://www.ttb.gov/media/68685/download?inline"],SCW]],
"us-dry-creek-valley":[`<p>The Dry Creek Valley Association filed the petition for a valley 16 miles long and about 2 miles wide: 80,000 acres in all, 20,500 of them valley floor and benches, with some 5,000 planted, mostly to Zinfandel. Its case, approved in August 1983, was that the valley is wetter and warmer, with a longer season, than the main Russian River Valley, and that its benchland Zinfandel, much of it on vines planted by Italian families before Prohibition, had a name of its own.</p>`,[SCW]],
"us-knights-valley":[`<p>Thomas B. Knight, a native of Maine and a veteran of the 1846 Bear Flag Revolt, bought much of the Rancho Mallacomes from José de los Santos Berreyesa, and the valley took his name. He grew about 17 acres of wine grapes, thought planted in 1874, and shipped them to Napa wineries, a pattern that has never really changed: Beringer is still the largest owner. The Knights Valley Wine-Growers Committee filed a petition signed by 16 people in February 1982, and ATF approved it in October 1983. It is one of the warmest Sonoma valleys, open to Calistoga rather than to the sea.</p>`,[["TTB: Knights Valley petition (1982)","https://www.ttb.gov/media/68824/download?inline"]]],
"us-rockpile":[`<p>Svente Parker Hallengren, a Swedish immigrant related to the Mauritson grape-growing family of Dry Creek, planted the first grapes on Rockpile in 1884. Cap Ornbaun's land partnership bought Rockpile Ranch around 1911. In the early 1960s the Army Corps of Engineers took all but 700 ridgetop acres of the 4,000-acre ranch for Lake Sonoma. Jack Florence Jr. and Ulises Valdez Sr. replanted in 1994 with cuttings from century-old Zinfandel.</p><p>Jack Florence Sr. filed the petition in May 2000, drawing the boundary by elevation: 800 feet on the east and north, around 1,800 feet on the south and west. Above the fog line, the vineyards sit in sun while Dry Creek below is still grey. TTB approved it in 2002.</p>`,[["TTB: Petition for the AVA designated Rockpile (2000)","https://www.ttb.gov/media/71260/download?inline"],["Rockpile Grape Growers Association: History","https://rockpilegrapegrowers.org/history.html"]]],
"us-russian-river-valley":[`<p>The petition, from a group calling itself The Appellation Committee, asked for about 150 square miles. Its name evidence went back to an 1880 county history listing four "great valleys" (Sonoma, Petaluma, Santa Rosa and Russian River), and Russian River Valley had been on labels since 1970. Fog was the deciding factor: the boundary follows how far the marine fog reaches up the river. Korbel had the line moved to take in its Guerneville vineyard. ATF approved about 96,000 acres in October 1983.</p><p>Joseph Swan, Williams Selyem and Rochioli made its Pinot Noir reputation in the 1970s and 1980s, and the boundary kept moving. In 2005 the Russian River Valley Winegrowers added 30,200 acres to the south. In 2011 Gallo won another expansion of about 14,000 acres, taking in its 350-acre Two Rock vineyard near Cotati. That one split the growers: the winegrowers' board voted unanimously against it in 2006, split 5-5 in 2008 and then stayed neutral. Merry Edwards opposed it, and Rod Berglund of Joseph Swan answered the claim that the new land was cool: "Yeah, so's Ukiah." The fight showed the weakness of a fog-based boundary: cool and foggy describes much of coastal California.</p>`,[["Press Democrat, 2008: Gallo urges feds to expand viticulture area south","https://www.pressdemocrat.com/2008/09/13/gallo-urges-feds-to-expand-viticulture-area-south-but-some-growers-fear-loss-of-ava-integrity"],["Wine Spectator, 2008: Sonoma winemakers clash over proposed appellation expansion","https://www.winespectator.com/articles/sonoma-winemakers-clash-over-proposed-appellation-expansion-4405"]]],
"us-green-valley-of-russian-river-valley":[`<p>County atlases record grapes in Green Valley from the earliest American settlement. Audrey Sterling, a partner in Iron Horse Ranch and Vineyard, filed the petition in July 1981 on behalf of local growers, and ATF approved it in 1983 as "Sonoma County Green Valley," a name built to avoid clashing with Solano County Green Valley, approved the year before. Iron Horse made it the address for California sparkling wine served at the White House. In 2006 the local association asked to tie the name to its better-known parent, and since April 2007 the AVA has been Green Valley of Russian River Valley.</p>`,[["TTB: Petition to establish Green Valley (1981)","https://www.ttb.gov/media/68787/download?inline"]]],
"us-fountaingrove-district":[`<p>Thomas Lake Harris brought his Brotherhood of the New Life from Brocton, New York, to Santa Rosa in 1875 and built a 1,500-acre utopian estate. Its winery, opened in 1882, held about 70,000 gallons and ranked among the ten largest in California; Kanaye Nagasawa, a Japanese samurai's son who came with the group, ran it and became known as California's grape king.</p><p>Douglas Grigg of Walnut Hill Vineyards petitioned in June 2014 for the Fountaingrove Appellation Committee: about 38,000 acres with some 500 acres of vines in 35 vineyards. TTB added "District" so existing Fountaingrove brands were unaffected. The irony, pointed out by Rene Byck of Paradise Ridge, is that the historic Fountaingrove site itself lies outside the AVA, because TTB would not let the new area overlap the Russian River Valley. Approved in February 2015.</p>`,[["NorthBay Biz, 2015: Unique territory","https://www.northbaybiz.com/2015/04/03/unique-territory"]]],
"us-sonoma-coast":[`<p>Brice Cutrer Jones of Sonoma-Cutrer drove this AVA. He had about 1,000 acres of vineyards scattered across the cool south and west of the county and needed them inside one AVA to label his wines estate bottled. The result, approved in June 1987, covered some 517,000 acres, from Carneros to the Mendocino line and far inland, larger than all of Burgundy including Chablis. That made the name nearly meaningless as a guide to the true coast, and the next 35 years of AVA politics in Sonoma, from Fort Ross-Seaview to the Petaluma Gap and West Sonoma Coast, were attempts to take the word "coast" back.</p>`,[["Jancis Robinson, 2022: Sonoma gets its coast back","https://www.jancisrobinson.com/articles/sonoma-gets-its-coast-back"]]],
"us-west-sonoma-coast":[`<p>It began as an Occidental AVA petition in 2010 led by Carroll Kemp of Alma Fria. That failed when TTB, around 2011, stopped allowing new AVAs to overlap existing ones without containing them, and Occidental overlapped the Russian River Valley. Growers regrouped as the West Sonoma Coast Vintners. In a single meeting with the Petaluma Gap group they agreed a shared border along Salmon Creek, and they drew the eastern edge where redwood and fir forest gives way to oak savanna. Freestone and Occidental, inside the Russian River Valley, stayed out. Kemp: "If we didn't take control of our own destiny, it was going to be written about, named and defined by others." TTB approved it in 2022.</p>`,[["Jancis Robinson, 2022: Sonoma gets its coast back","https://www.jancisrobinson.com/articles/sonoma-gets-its-coast-back"]]],
"us-fort-ross-seaview":[`<p>David Hirsch planted here in 1980; Flowers and Marcassin followed. A first proposal led by Hirsch in 2003 was defeated, with opposition from Brice Jones of Emeritus and from Hartford Family. The growers tried again, drawing the boundary above the fog at roughly 920 feet, where ridgetop vineyards get sun while the coast below is socked in, and TTB approved it in December 2011. It was the first real carve-out of the true coast from the vast Sonoma Coast AVA.</p>`,[["Prince of Pinot: Sonoma Coast","https://www.princeofpinot.com/article/705"]]],
"us-petaluma-gap":[`<p>The Petaluma Gap Winegrowers Alliance hired geographer Patrick Shabram to write the petition around one idea: wind. The gap in the coast range funnels afternoon marine wind from Bodega Bay to San Pablo Bay, and growers argued it gives smaller berries, thicker skins and longer hang time. To make the AVA fit, TTB enlarged the North Coast AVA by about 28,000 acres to cover all of it, and allowed a partial overlap with Sonoma Coast because that name does not reach into Marin County. Approved in December 2017.</p>`,[["Regulations.gov: Petaluma Gap petition","https://www.regulations.gov/document/TTB-2016-0009-0002"]]],
"us-pine-mountain-cloverdale-peak":[`<p>Sara Schorske of Compliance Service of America petitioned on behalf of local growers for a 4,570-acre mountain area straddling the Mendocino and Sonoma line north of Cloverdale, first under the name Pine Mountain-Mayacmas. The final name, approved in October 2011, swapped the mountain range for the local landmark, Cloverdale Peak. The area is defined by elevation, with vineyards high above the Alexander Valley floor.</p>`,[["Regulations.gov: Pine Mountain-Mayacmas petition","https://www.regulations.gov/document/TTB-2010-0003-0095"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
