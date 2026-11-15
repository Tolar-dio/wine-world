// Full encyclopedia entries: Mendocino County AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function me(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
APXF["us-mendocino"] = me({
  lede: "The main AVA for Mendocino County's inland valleys, from Anderson Valley to Redwood Valley, and a pioneer of organic viticulture.",
  rec: "June 1984", cfr: "9.93", td: "T.D. ATF-178, 49 FR 24714, 15 June 1984", am: "T.D. ATF-397 (1998) and TTB-124 (2014)",
  facts: [["Contains", "Anderson Valley, Cole Ranch, McDowell Valley, Potter Valley, Redwood Valley, Yorkville Highlands and others"]],
  place: "The upper Russian River and Navarro watersheds: cool, foggy toward the coast, hot in Ukiah and Redwood valleys. A large share of the county's vineyards is certified organic.",
  history: "Italian families planted Zinfandel and Carignan in the early twentieth century; Parducci (1932) and Fetzer (1968) built the modern industry, Fetzer's Bonterra leading organic production.",
  glass: "Old-vine Zinfandel, Carignan and Petite Sirah; Chardonnay; cool Pinot Noir from Anderson Valley.",
  exam: "Organic leader; Parducci; Bonterra.",
  producers: ["Parducci", "Fetzer", "Bonterra", "McNab Ridge"]
});
APXF["us-anderson-valley"] = me({
  lede: "A narrow valley along the Navarro River that opens to the Pacific, one of California's coolest: Pinot Noir, Alsace varieties and Roederer Estate's sparkling wine.",
  rec: "August 1983", cfr: "9.86", td: "T.D. ATF-139, 48 FR 37370, 18 August 1983",
  facts: [["Length", "About 25 km"]],
  place: "Fog and cold air pour in every evening; the warmer upper valley near Boonville gives way to the cold 'Deep End' near Navarro. Soils are mostly sandstone- and shale-derived.",
  history: "Louis Roederer founded Roederer Estate in 1982; the valley hosts an annual Alsace varieties festival.",
  glass: "Bright, red-fruited Pinot Noir; dry Gewürztraminer and Riesling; fine traditional-method sparkling.",
  exam: "Navarro River; Roederer Estate; Deep End; Alsatian varieties.",
  producers: ["Roederer Estate", "Navarro Vineyards", "Husch", "Goldeneye", "Handley", "Drew", "Lazy Creek"]
});
APXF["us-mendocino-ridge"] = me({
  lede: "The only non-contiguous AVA in the US: every ridgetop above 1,200 feet in a coastal strip of south-western Mendocino, islands above the fog.",
  rec: "October 1997", cfr: "9.158", td: "T.D. ATF-392, 62 FR 55516, 27 October 1997",
  facts: [["Elevation", "Above 1,200 feet (366 m)"]],
  place: "Ridgetops sit in sunshine above the marine layer, avoiding coastal cold while keeping cool nights; old Zinfandel on ridges like Zeni.",
  glass: "Bright, spicy Zinfandel; Pinot Noir; Syrah.", exam: "Non-contiguous; 1,200-foot line; 'islands in the sky'.",
  producers: ["Edmeades (Zeni Vineyard)", "Greenwood Ridge", "Drew", "Mariah"]
});
APXF["us-cole-ranch"] = me({
  lede: "Once the smallest AVA in the US: a single ranch in a narrow valley between Ukiah and Boonville.",
  rec: "April 1983", cfr: "9.42", td: "T.D. ATF-130, 48 FR 16248, 15 April 1983", am: "T.D. TTB-196 (2024)",
  facts: [["Area", "About 60 to 75 ha"], ["Boundary", "Partly defined by the 1,480-foot contour"]],
  place: "A high, narrow valley owned by the Cole family.", glass: "Riesling, Cabernet, Pinot Noir.", exam: "Former smallest AVA.", producers: []
});
APXF["us-comptche"] = me({
  lede: "A small, foggy AVA inland from Mendocino town, so coastal in climate that TTB excluded it from the North Coast AVA.",
  rec: "April 2024", cfr: "9.292", td: "T.D. TTB-192, 89 FR 24380, 8 April 2024",
  facts: [["Area", "About 575 ha (1,422 acres)"]],
  place: "Cold, foggy coastal hills; TTB found it unlike the warmer North Coast interior.",
  rules: "The CFR states explicitly that Comptche is not part of the North Coast AVA.",
  glass: "Cool-climate Pinot Noir and Chardonnay.", exam: "Excluded from North Coast.", producers: []
});
APXF["us-covelo"] = me({
  lede: "A remote high valley in north-eastern Mendocino County ringed by mountains and the Round Valley Reservation.",
  rec: "February 2006", cfr: "9.187", td: "T.D. TTB-42, 71 FR 8205, 16 February 2006",
  facts: [["Elevation", "About 425 m"], ["Area", "About 15,400 ha (38,000 acres)"]],
  place: "Cold winters and warm summers; few vines.", glass: "Small production.", exam: "Round Valley.", producers: []
});
APXF["us-dos-rios"] = me({
  lede: "A tiny, remote AVA where the Middle Fork meets the main Eel River: 'two rivers'.",
  rec: "October 2005", cfr: "9.175", td: "T.D. TTB-34, 70 FR 59995, 14 October 2005",
  facts: [["Area", "About 6,300 ha (15,500 acres)"]],
  place: "Rugged northern Mendocino with only a few acres of vines.", glass: "Very small production.", exam: "Eel River confluence.", producers: []
});
APXF["us-eagle-peak-mendocino-county"] = me({
  lede: "A mountainous AVA north-west of Redwood Valley with marine-influenced breezes.",
  rec: "October 2014", cfr: "9.237", td: "T.D. TTB-124, 79 FR 60973, 9 October 2014",
  facts: [["Area", "About 10,600 ha (26,260 acres)"]],
  place: "Slopes with strong breezes and cooler temperatures than Redwood Valley.", glass: "Pinot Noir and cool reds.", exam: "Full name includes Mendocino County.", producers: []
});
APXF["us-mcdowell-valley"] = me({
  lede: "A tiny bench valley east of Hopland with some of California's oldest Syrah and Grenache.",
  rec: "December 1981", cfr: "9.36", td: "T.D. ATF-97, 46 FR 59243, 4 December 1981", am: "T.D. ATF-249 (1987) and TTB-196 (2024)",
  facts: [["Elevation", "About 300 m"]],
  place: "Bench soils above the Russian River.", history: "Some Syrah vines date from 1919.",
  glass: "Old-vine Syrah and Grenache.", exam: "Early single-estate AVA; 1919 Syrah.", producers: ["McDowell Valley Vineyards"]
});
APXF["us-potter-valley"] = me({
  lede: "A high, cool valley north-east of Ukiah, fed by Eel River water diverted into the Russian River.",
  rec: "October 1983", cfr: "9.82", td: "T.D. ATF-151, 48 FR 46521, 13 October 1983",
  facts: [["Climate", "Cold nights, long season"]],
  place: "Ringed by mountains; frost-prone floor.", glass: "Riesling, Sauvignon Blanc, Pinot Noir, sparkling base.", exam: "Eel River diversion.", producers: []
});
APXF["us-redwood-valley"] = me({
  lede: "A warm valley north of Ukiah at the head of the Russian River, with red, iron-rich soils and old Italian-planted Zinfandel and Carignan.",
  rec: "December 1996", cfr: "9.153", td: "T.D. ATF-386, 61 FR 67466, 23 December 1996", am: "T.D. TTB-124 (2014)",
  facts: [["Soils", "Red, iron-rich"]],
  place: "Warm days with cooler nights than Ukiah.", glass: "Zinfandel, Carignan, Petite Sirah.", exam: "Fetzer origins; Frey organic.",
  producers: ["Frey", "Barra", "Golden Vineyards"]
});
APXF["us-yorkville-highlands"] = me({
  lede: "Rocky hills along Highway 128 between Cloverdale and Anderson Valley, between warm and cool climates.",
  rec: "April 1998", cfr: "9.159", td: "T.D. ATF-397, 63 FR 16904, 7 April 1998",
  facts: [["Elevation", "About 300 to 760 m"]],
  place: "Gravelly, low-fertility soils.", glass: "Sauvignon Blanc, Bordeaux reds, Pinot Noir.", exam: "Highway 128 corridor.",
  producers: ["Yorkville Cellars", "Maple Creek"]
});
})();
