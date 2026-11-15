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
})();
