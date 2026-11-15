// Full encyclopedia entries: Central Coast, Monterey, San Benito and Santa Cruz Mountains AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function cc(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const CCMW=["Monterey County Vintners and Growers: AVAs","https://www.montereywines.org/"];

APXF["us-central-coast"] = cc({
  lede: "An umbrella AVA of about 2.75 million hectares covering California's coastal counties from Contra Costa and Alameda south to Santa Barbara, used mainly for multi-county blends.",
  rec: "October 1985", cfr: "9.75", td: "T.D. ATF-216, 50 FR 43130, 24 October 1985", am: "T.D. ATF-407 (1999), TTB-48 (2006) and TTB-191 (2024)",
  facts: [["Counties", "Monterey, Santa Cruz, Santa Clara, Alameda, San Benito, San Luis Obispo, Santa Barbara, San Francisco, San Mateo, Contra Costa"]],
  place: "The coast ranges between San Francisco Bay and Santa Barbara, where cold Pacific air pushes through gaps and valleys. It contains Santa Cruz Mountains, Monterey, Paso Robles, the Santa Barbara AVAs and many more.",
  glass: "Mostly value Chardonnay, Pinot Noir and Cabernet blended across counties.",
  exam: "Umbrella from Contra Costa to Santa Barbara.",
  producers: []
});

APXF["us-santa-cruz-mountains"] = cc({
  lede: "One of the first AVAs defined by mountains rather than valleys, its boundary following elevation lines on both sides of the range between the Pacific and San Francisco Bay: home of Ridge Monte Bello and Mount Eden.",
  rec: "December 1981", cfr: "9.31", td: "T.D. ATF-98, 46 FR 59240, 4 December 1981",
  facts: [["Counties", "San Mateo, Santa Clara, Santa Cruz"], ["Boundary", "Roughly above 400 feet (120 m) on the ocean side and 800 feet (240 m) on the bay side"], ["Sub-AVA", "Ben Lomond Mountain"]],
  place: "A rugged, forested range split by the San Andreas fault. The ocean side is cool and foggy, suited to Pinot Noir and Chardonnay; the bay side is warmer and suits Cabernet. Soils vary from shale and sandstone to limestone at Monte Bello.",
  history: "Paul Masson and Martin Ray made the range's name; Ridge's 1971 Monte Bello placed fifth in Paris in 1976 and won the 30th-anniversary rematch in 2006.",
  glass: "Taut, mineral Cabernet that ages for decades; elegant Pinot Noir and Chardonnay.",
  exam: "Elevation-defined boundary; Ridge Monte Bello; Mount Eden; San Andreas fault.",
  producers: ["Ridge Vineyards", "Mount Eden", "Rhys", "Thomas Fogarty", "David Bruce", "Hallcrest"]
});

APXF["us-ben-lomond-mountain"] = cc({
  lede: "A ridge north-west of Santa Cruz, above the fog line, inside the Santa Cruz Mountains AVA.",
  rec: "December 1987", cfr: "9.118", td: "T.D. ATF-264, 52 FR 46591, 9 December 1987",
  facts: [["Elevation", "About 120 to 800 m"], ["County", "Santa Cruz"]],
  place: "Sandy soils from granite and limestone; cool marine influence but sun above the fog.",
  glass: "Cool Pinot Noir and Chardonnay; some Cabernet.",
  exam: "Sub-AVA of Santa Cruz Mountains.",
  producers: []
});

APXF["us-monterey"] = cc({
  lede: "The Salinas Valley and its side valleys, where cold wind from Monterey Bay blows up the valley every afternoon, making the north one of California's coolest wine areas.",
  rec: "June 1984", cfr: "9.98", td: "T.D. ATF-177, 49 FR 24718, 15 June 1984", am: "T.D. ATF-249 (1987) and TTB-196 (2024)",
  facts: [["Sub-AVAs", "Arroyo Seco, Carmel Valley, Chalone (partly), Hames Valley, San Antonio Valley, San Bernabe, San Lucas, Santa Lucia Highlands"]],
  place: "The Salinas Valley funnels marine air like a wind tunnel, so the north near Gonzales is cold and the south near King City much warmer. Rainfall is low and irrigation essential; the floor is flat and fertile.",
  glass: "Chardonnay, Pinot Noir and Riesling in the north; Cabernet and Rhône varieties in the south.",
  exam: "Salinas Valley wind tunnel; cool north, warm south.",
  producers: [], sources: [CCMW]
});

APXF["us-santa-lucia-highlands"] = cc({
  lede: "Terraced benches on the eastern flank of the Santa Lucia Range facing across the Salinas Valley, battered by afternoon wind: one of California's top Pinot Noir and Chardonnay areas.",
  rec: "May 1992", cfr: "9.139", td: "T.D. ATF-321, 57 FR 20764, 15 May 1992", am: "T.D. TTB-49 (2006) and TTB-172 (2021)",
  facts: [["Elevation", "About 30 to 370 m"], ["Aspect", "South-east to east"]],
  place: "Morning fog and fierce afternoon winds give a very long season; south-east-facing slopes catch morning sun. Granitic, sandy loam soils drain well.",
  history: "The Pisoni family planted the high Pisoni Vineyard in 1982; Garys' Vineyard and Rosella's became famous single-vineyard names.",
  glass: "Ripe, dark-cherry Pinot Noir with spice and firm acidity; rich Chardonnay; Syrah.",
  exam: "Wind; Pisoni, Garys', Rosella's; benches facing the Salinas Valley.",
  producers: ["Pisoni", "Lucia", "Roar", "Talbott", "Morgan"], sources: [CCMW]
});

APXF["us-arroyo-seco"] = cc({
  lede: "Where the Arroyo Seco river leaves the Santa Lucia Range near Greenfield, on rounded river cobbles called 'Greenfield potatoes'.",
  rec: "April 1983", cfr: "9.59", td: "T.D. ATF-131, 48 FR 16246, 15 April 1983", am: "2006, 2018 and 2021",
  facts: [["Soils", "Cobbly alluvial fans"]],
  place: "The cool eastern part on the valley floor is windy; the western canyon is warmer and sheltered.",
  glass: "Riesling, Chardonnay and Pinot Noir in the cool section; red varieties in the canyon.",
  exam: "Greenfield potatoes; Riesling.",
  producers: ["J. Lohr (Arroyo Vista)", "Ventana", "Scheid"], sources: [CCMW]
});

APXF["us-carmel-valley"] = cc({
  lede: "A narrow valley running inland from Carmel-by-the-Sea, warm enough at its upper end for Cabernet and Merlot.",
  rec: "December 1982", cfr: "9.58", td: "T.D. ATF-119, 47 FR 55916, 14 December 1982", am: "T.D. TTB-91 (2011)",
  facts: [["Elevation", "About 200 to 600 m"]],
  place: "The Santa Lucia Range shelters the upper valley from fog, unlike most of Monterey.",
  glass: "Cabernet Sauvignon and Merlot with structure.",
  exam: "Warm upper valley; Heller Estate (ex-Durney).",
  producers: ["Heller Estate", "Boekenoogen", "Joullian"], sources: [CCMW]
});

APXF["us-chalone"] = cc({
  lede: "A remote bench at about 500 m under the volcanic spires of the Pinnacles, with rare limestone soils that drew Burgundy-minded pioneers.",
  rec: "June 1982", cfr: "9.24", td: "T.D. ATF-107, 47 FR 25519, 14 June 1982",
  facts: [["Area", "8,640 acres (about 3,500 ha)"], ["Counties", "Monterey and a little of San Benito"], ["Soils", "Limestone and granite"]],
  place: "High, dry and hot by day, cold at night, with almost no water: vines were first planted around 1919.",
  history: "Dick Graff's Chalone Vineyard, from 1965, made Burgundian Chardonnay and Pinot Noir famous; Chalone placed in the 1976 Paris white flight.",
  glass: "Mineral, long-lived Chardonnay, Pinot Blanc, Chenin Blanc and Pinot Noir.",
  exam: "Limestone; Pinnacles; Chalone Vineyard; Paris 1976.",
  producers: ["Chalone Vineyard"]
});

APXF["us-gabilan-mountains"] = cc({
  lede: "A large mountain AVA along the Gabilan Range between the Salinas Valley and San Benito County, defined by elevation, cool climate and granite and limestone soils.",
  rec: "August 2022", cfr: "9.288", td: "T.D. TTB-184, 87 FR 49989, 15 August 2022",
  facts: [["Counties", "Monterey and San Benito"], ["Area", "About 40,000 ha (98,000 acres)"], ["Contains", "Chalone, Mt. Harlan"]],
  place: "Mountain slopes above the valleys on both sides of the range, cooler than the floors, on granite and limestone.",
  glass: "Chardonnay, Pinot Noir and Rhône varieties.",
  exam: "Encloses Chalone and Mt. Harlan.",
  producers: []
});

APXF["us-hames-valley"] = cc({
  lede: "The southernmost Monterey AVA, a warm inland valley near the San Luis Obispo line.",
  rec: "March 1994", cfr: "9.147", td: "T.D. ATF-356, 59 FR 14100, 25 March 1994",
  facts: [["Climate", "Warm days, wide day-night swing"]],
  place: "Beyond most of the bay's wind; shallow, rocky soils.",
  glass: "Bordeaux and Rhône varieties, mostly sold to other wineries.",
  exam: "Southern Monterey; warm.",
  producers: []
});

APXF["us-san-antonio-valley"] = cc({
  lede: "A remote valley west of the Salinas Valley near Mission San Antonio de Padua, founded in 1771.",
  rec: "June 2006", cfr: "9.194", td: "T.D. TTB-46, 71 FR 33242, 8 June 2006",
  facts: [["Climate", "Warm days, cold nights"]],
  place: "Inland valley near Fort Hunter Liggett, separated from the Salinas Valley by hills.",
  glass: "Rhône and Bordeaux varieties, Zinfandel.",
  exam: "Mission San Antonio de Padua.",
  producers: ["Pierce Ranch"]
});

APXF["us-san-bernabe"] = cc({
  lede: "An AVA built around one enormous vineyard south of King City, once described as the largest contiguous vineyard in the world.",
  rec: "June 2004", cfr: "9.171", td: "T.D. TTB-14, 69 FR 38836, 29 June 2004",
  facts: [["Owner", "Delicato Family Wines"], ["Soils", "Sandy, wind-deposited"]],
  place: "Salinas Valley floor and benches with varied mesoclimates.",
  glass: "Many varieties for value brands.",
  exam: "Single giant vineyard; Delicato.",
  producers: ["Delicato"]
});

APXF["us-san-lucas"] = cc({
  lede: "A warm stretch of the southern Salinas Valley around San Lucas, beyond most of the bay's afternoon wind.",
  rec: "January 1987", cfr: "9.56", td: "T.D. ATF-248, 52 FR 2945, 29 January 1987", am: "T.D. TTB-14 (2004)",
  facts: [["Soils", "Alluvial benches"]],
  place: "Large vineyards on benches, warmer than the northern valley.",
  glass: "Cabernet Sauvignon, Merlot and Chardonnay.",
  exam: "Southern Salinas Valley; warm.",
  producers: []
});

APXF["us-san-benito"] = cc({
  lede: "Umbrella AVA for the valleys of San Benito County east of the Gabilan Range, where Almaden once farmed thousands of acres.",
  rec: "October 1987", cfr: "9.110", td: "T.D. ATF-258, 52 FR 37137, 5 October 1987", am: "T.D. TTB-196 (2024)",
  facts: [["Contains", "Cienega Valley, Lime Kiln Valley, Paicines"]],
  place: "Valleys along the San Andreas fault with granite and limestone.",
  glass: "Zinfandel, Mourvèdre, Pinot Noir and Chardonnay.",
  exam: "Almaden; San Andreas fault.",
  producers: []
});

APXF["us-cienega-valley"] = cc({
  lede: "A historic valley on the San Andreas fault in San Benito County, planted in the 1850s, with old own-rooted Zinfandel and Négrette.",
  rec: "August 1982", cfr: "9.38", td: "T.D. ATF-109, 47 FR 36126, 19 August 1982",
  facts: [["Soils", "Limestone and granite"]],
  place: "The fault runs through the valley; the old Almaden winery straddled it and its walls shifted with creep.",
  history: "William Palmtag and later Almaden made wine here.",
  glass: "Rustic old-vine Zinfandel; Pinot Noir from Eden Rift.",
  exam: "San Andreas fault; Palmtag; Almaden.",
  producers: ["DeRose", "Eden Rift"]
});

APXF["us-lime-kiln-valley"] = cc({
  lede: "A tiny valley inside Cienega Valley named for kilns that burned local limestone.",
  rec: "June 1982", cfr: "9.27", td: "T.D. ATF-106, 47 FR 24296, 4 June 1982", am: "T.D. ATF-249 (1987)",
  facts: [["Soils", "Limestone-rich"]],
  place: "Small valley in the Gabilan foothills.",
  glass: "Old-vine Zinfandel and Mourvèdre.",
  exam: "Lime kilns; inside Cienega Valley.",
  producers: []
});

APXF["us-mt-harlan"] = cc({
  lede: "A one-producer mountain AVA high in the Gabilan Range, created for Josh Jensen's Calera on limestone he searched California to find.",
  rec: "November 1990", cfr: "9.131", td: "T.D. ATF-304, 55 FR 47747, 15 November 1990",
  facts: [["Elevation", "About 670 to 790 m"], ["Soils", "Limestone"]],
  place: "Cool, high and dry; vines on limestone near an old lime kiln.",
  history: "Jensen, who worked in Burgundy, planted Pinot Noir in 1975 in vineyards named Jensen, Reed, Selleck and Mills, later adding Viognier and Chardonnay.",
  glass: "Long-lived, mineral Pinot Noir; Viognier and Chardonnay.",
  exam: "Calera; limestone; Josh Jensen.",
  producers: ["Calera"]
});

APXF["us-paicines"] = cc({
  lede: "A small AVA south of Hollister, petitioned by Almaden for its large plantings.",
  rec: "August 1982", cfr: "9.39", td: "T.D. ATF-108, 47 FR 35481, 16 August 1982",
  facts: [["County", "San Benito"]],
  place: "Valley with cool breezes; mostly grape-growing for other wineries.",
  glass: "Varied; little bottled under the name.",
  exam: "Almaden.",
  producers: []
});

// HISTORY-PASS-START
const HX={
"us-central-coast":[`<p>Taylor California Cellars, a big winery in Gonzales, Monterey County, petitioned for Central Coast so it could blend fruit from several counties under one regional name; at the time, TTB rules allowed only two or three county names joined with the word "counties." The petition showed the name already in use in wine books and magazines. ATF approved it in October 1985, stretching from the San Francisco Bay to Santa Barbara, and amended it in 1999 and 2006. It was a commercial convenience as much as a place: an umbrella that let large producers sell a coastal origin without naming a county, and that later held more than 40 smaller AVAs.</p>`,[["Wikipedia: Central Coast AVA (from T.D. ATF-216)","https://en.wikipedia.org/wiki/Central_Coast_AVA"]]],
"us-santa-cruz-mountains":[`<p>The Santa Cruz Mountains Vintners filed the petition, and ATF heard testimony in Santa Clara on 19 January 1981. The name was on record for the range by 1838, and when the first government surveyor laid out section lines in 1867 he noted vineyards. Paul Masson and Martin Ray made the mountains famous for wine; Ridge's 1971 Monte Bello placed fifth in Paris in 1976 and won the 30th-anniversary rematch in 2006.</p><p>The AVA, approved in December 1981, was one of the first defined by topography rather than politics: it follows the mountains by elevation (roughly 400 feet on the coastal side, 800 feet on the bay side), crossing three counties. It was a statement by small mountain growers that their wines had nothing in common with the valleys below.</p>`,[["Federal Register, 4 Dec 1981: Santa Cruz Mountains final rule (T.D. ATF-98)","https://www.govinfo.gov/content/pkg/FR-1981-12-04/pdf/FR-1981-12-04.pdf"]]],
"us-ben-lomond-mountain":[`<p>John Burns, a Scot, pioneered the mountain in the 1860s and named it after Ben Lomond in Scotland. He made wine with modest commercial success into the 1880s and other families followed. The AVA, approved in 1987, recognized the coastal ridge on the ocean side of the Santa Cruz Mountains, high enough to sit above much of the fog but close enough to the sea to stay cool. It remains the only sub-AVA inside the Santa Cruz Mountains, although local growers informally divide the range into half a dozen districts.</p>`,[["Wikipedia: Ben Lomond Mountain AVA","https://en.wikipedia.org/wiki/Ben_Lomond_Mountain_AVA"]]],
"us-monterey":[`<p>Monterey's vineyards are mostly a 1960s and 1970s creation: UC Davis research identified the Salinas Valley as cool enough for quality grapes, and big wineries from the north (Mirassou, Wente, Paul Masson) planted on a scale that made Monterey one of the largest plantings in the state. When the Monterey petition was filed in 1982 there were already about 36,000 acres of vines and 14 wineries. ATF was handling rival petitions at the same time for "King City" and "San Lucas" in the south of the valley. The AVA approved in 1984 covered about 640,000 acres, the county's agricultural heartland, with smaller AVAs such as Arroyo Seco, Chalone and Carmel Valley carved out around it.</p>`,[["Wikipedia: Monterey AVA","https://en.wikipedia.org/wiki/Monterey_AVA"]]],
"us-santa-lucia-highlands":[`<p>The petition drew the area as the terraces on the eastern face of the Santa Lucia range above the Salinas River, from Limekiln Creek in the north to the Arroyo Seco in the south-east: about 22,000 acres with 1,850 planted and 400 more planned, around 9% of Monterey's vines. Its case was wind and elevation: the afternoon gale off Monterey Bay cools the benches, which sit above the frost-prone valley floor. Approved in 1991, it was then little known. The Pisoni family planted the high Pisoni Vineyard in 1982, and Gary Pisoni and Gary Franscioni's Garys' Vineyard and Rosella's became famous single-vineyard names, making the Highlands a Pinot Noir address in the 2000s.</p>`,[["TTB: Santa Lucia Highlands petition","https://www.ttb.gov/system/files/images/pdfs/Santa_Lucia_Highlands_petition.pdf"]]],
"us-arroyo-seco":[`<p>The Arroyo Seco Winegrowers and Vintners filed the petition in November 1981, and ATF approved it in 1983. Their case was the river: the Arroyo Seco, "dry creek," spills out of the Santa Lucia Mountains onto a fan of rounded stones, and the gorge near Greenfield is warmer and more sheltered than the windswept open valley. Large companies such as J. Lohr and Wente planted here in the 1970s. The boundary was amended in 2006, 2019 and 2021, as neighbors argued over where the river's influence ends.</p>`,[["TTB: Arroyo Seco petition (1981)","https://www.ttb.gov/media/68630/download?inline"]]],
"us-carmel-valley":[`<p>Vineyards were first planted here in the 1870s, but the modern story starts in 1968, when William Durney planted Durney Vineyard on the high slopes of Cachagua. David Armanasco, Durney's general manager, filed the petition, and ATF approved it in December 1982. The argument was elevation and shelter: vineyards high in the Carmel River drainage, warmer and drier than the foggy coast just a few miles west, able to ripen Cabernet in a county known for cool-climate grapes.</p>`,[["Wikipedia: Carmel Valley AVA","https://en.wikipedia.org/wiki/Carmel_Valley_AVA"]]],
"us-chalone":[`<p>A Frenchman named Charles Tamm planted vines on this limestone bench in the Gabilan Mountains around 1919, and Dick Graff's Chalone Vineyard, from 1965, made Burgundian Chardonnay and Pinot Noir famous; Chalone placed in the 1976 Paris white flight.</p><p>Graff, through Gavilan Vineyards, asked for an AVA called "The Pinnacles," after the volcanic spires next door. After a May 1980 hearing, ATF ruled that name inappropriate: The Pinnacles meant the national monument, not a vineyard area. It reopened comments for alternatives, and Graff proposed Chalone, after Chalone Peak. Approved in June 1982, it held one winery and about 120 acres of vines; half the area was plantable, but water was too scarce to farm it.</p>`,[["Federal Register, 14 Jun 1982: Chalone final rule (T.D. ATF-107)","https://www.govinfo.gov/content/pkg/FR-1982-06-14/pdf/FR-1982-06-14.pdf"]]],
"us-gabilan-mountains":[`<p>Parker Allen of Coastview Vineyards filed the petition for the high ground of the Gabilan range straddling Monterey and San Benito counties, approved in August 2022. It takes in mountain vineyards such as Calera's, planted by Josh Jensen around an early twentieth-century limestone quarry, and Chalone. The case was elevation and limestone, the same reasons pioneers came here: cool, thin air and calcareous soils that Burgundy-trained growers had been seeking since the 1910s.</p>`,[["Wikipedia: Gabilan Mountains AVA","https://en.wikipedia.org/wiki/Gabilan_Mountains_AVA"]]],
"us-hames-valley":[`<p>Barry Jackson of Harmony Wine Company filed the petition in April 1993 for a small valley near Bradley at the southern end of Monterey County, approved in 1994. His case was that Hames Valley, though at the bottom of the Salinas Valley, is cut off from the marine wind by hills and runs much warmer, with big day-night swings, making it suited to Bordeaux and Rhône varieties rather than the cool-climate grapes of northern Monterey.</p>`,[["TTB: Hames Valley petition (1993)","https://www.ttb.gov/media/68794/download?inline"]]],
"us-san-antonio-valley":[`<p>The name goes back to 1771, when Father Junípero Serra entered this oak-covered valley and founded Mission San Antonio de Padua, where Franciscans planted vines. Paul and Paula Getzelman and Steve Cobb of Lockwood filed the petition, approved in 2006. The valley lies inside the Santa Lucia range, west of the main Salinas Valley and sheltered from its wind, with warm days that favor Cabernet, Cabernet Franc and Syrah.</p>`,[["Wikipedia: San Antonio Valley AVA","https://en.wikipedia.org/wiki/San_Antonio_Valley_AVA"]]],
"us-san-bernabe":[`<p>This AVA is essentially one vineyard. The Rancho San Bernabé was a Mexican land grant; Prudential-Southdown bought the land in the 1970s to develop vineyards, and in 1988 the Indelicato family (Delicato Family Wines) bought it. With about 7,600 acres of vines on 24,800 acres, it is among the largest contiguous vineyards in the world. Approved in 2004, its creation required moving 1,281 acres from neighboring San Lucas so that one large vineyard would not be split between two AVAs.</p>`,[["Wikipedia: San Bernabe AVA","https://en.wikipedia.org/wiki/San_Bernabe_AVA"]]],
"us-san-lucas":[`<p>Almadén Vineyards of San Jose petitioned for this southern Salinas Valley area, supported by temperature data from its vineyards near King City and San Lucas for 1974 to 1984. ATF, which had also received a rival petition for "King City," concluded the microclimate was distinct and approved San Lucas in January 1987. In 2004 it gave up 1,281 acres to the new San Bernabe AVA so a large vineyard would not straddle the line.</p>`,[["Wikipedia: San Lucas AVA","https://en.wikipedia.org/wiki/San_Lucas_AVA"]]],
"us-san-benito":[`<p>Almadén Vineyards, then the county's dominant grower, filed this petition too, approved in October 1987. Its history evidence was a 1965 talk by John P. Ohrwall to the San Benito County Historical Society, which credited Théophile Vaché with planting the county's first vineyard in the early 1850s. The AVA wraps around the smaller Cienega Valley, Lime Kiln Valley and Paicines, all three also Almadén-era creations.</p>`,[["Federal Register, 5 Oct 1987: San Benito final rule (T.D. ATF-258)","https://www.govinfo.gov/content/pkg/FR-1987-10-05/pdf/FR-1987-10-05.pdf"]]],
"us-cienega-valley":[`<p>Théophile Vaché planted the first vines near here in the 1850s; William Palmtag took over in the 1880s and later Almaden made wine here. The winery and vineyards passed to the Taylor Company in 1943 and to Almadén in the 1950s, which made Cienega the heart of its San Benito operation, sitting directly on the San Andreas Fault, so that the winery building famously moves with it. ATF approved the AVA in 1982.</p>`,[["Wikipedia: Cienega Valley AVA","https://en.wikipedia.org/wiki/Cienega_Valley_AVA"]]],
"us-lime-kiln-valley":[`<p>Susan Enz of Enz Vineyards filed the petition. Her vineyards were planted in 1923 and had sold wine under a Lime Kiln label since the early 1970s, and on 6 September 1977 the county supervisors had formally named the valley Lime Kiln Valley, after the old limestone kilns. ATF approved it in June 1982, making it one of the first twenty AVAs in the country, built around a single family's vineyard and its limestone soil.</p>`,[["Wikipedia: Lime Kiln Valley AVA","https://en.wikipedia.org/wiki/Lime_Kiln_Valley_AVA"]]],
"us-mt-harlan":[`<p>The mountain is named for Ulysses Grant Harlan, a rancher who settled here between 1860 and 1880; an 1884 Interior Department map shows two Harlan homesites. Josh Jensen, told by his Burgundian mentors that Pinot Noir and Chardonnay need limestone, searched California for it from 1971 and found an old lime kiln on this mountain. He planted Pinot Noir in 1975 in vineyards named Jensen, Reed, Selleck and Mills, later adding Viognier and Chardonnay. His petition, approved in November 1990, defined an AVA around his Calera vineyards at about 2,200 feet, higher than any other vineyard in San Benito County.</p>`,[["Federal Register, 15 Nov 1990: Mt. Harlan final rule (T.D. ATF-304)","https://www.govinfo.gov/content/pkg/FR-1990-11-15/pdf/FR-1990-11-15.pdf"]]],
"us-paicines":[`<p>Almadén Vineyards petitioned for Paicines, in central San Benito County, where it farmed large vineyards from the 1950s, and ATF approved it in August 1982. The AVA, named for the small town and an old rancho, was defined by its warm inland valley climate, distinct from the cooler Cienega Valley to the north-west. Like several San Benito AVAs, it outlived the company that created it.</p>`,[["Wikipedia: Paicines AVA","https://en.wikipedia.org/wiki/Paicines_AVA"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
