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

// HISTORY-PASS-START
const HX={
"us-mendocino":[`<p>Italian families planted Zinfandel and Carignan in the early twentieth century, and Zinfandel is still a mainstay. Parducci (1932) and Fetzer (1968) built the modern industry, and Fetzer's Bonterra line made Mendocino an early center of organic grape growing. Large new plantings in the early 1970s multiplied wineries.</p><p>The AVA petition came from James Beckman, vice-president of Guild Wineries and Distilleries, on behalf of 113 local growers and vintners, and ATF approved it in June 1984: 283,300 acres covering the county's main valleys (Anderson, Potter, Redwood, Ukiah, McDowell and others) rather than the whole county, which stretches far into wild, unplantable hills. Its V shape follows where grapes grow. The southern edge was later moved to meet Yorkville Highlands, and the line was adjusted again for Eagle Peak.</p>`,[["Wikipedia: Mendocino AVA (from T.D. ATF-178)","https://en.wikipedia.org/wiki/Mendocino_AVA"]]],
"us-anderson-valley":[`<p>Small vineyards dotted Greenwood Ridge early in the twentieth century; DuPratt Vineyard, planted in 1916, survives. Husch received the valley's first winery bond in 1971, followed by Edmeades in 1972 and Navarro in 1976; Lazy Creek and Greenwood Ridge came in the early 1980s. The Anderson Valley Appellation Committee petitioned for the AVA, approved in August 1983.</p><p>Their case was the Navarro River: the valley runs north-west to the Pacific, and fog and cold air follow it inland, making the lower end, near Navarro and Philo, one of the coolest grape-growing places in California. Louis Roederer confirmed it in 1982 by founding Roederer Estate here after a long search for a Champagne-like site, followed by Scharffenberger. The valley now hosts an annual festival of Alsace varieties and a Pinot Noir festival.</p>`,[["Federal Register, 18 Aug 1983: Anderson Valley final rule (T.D. ATF-139)","https://www.govinfo.gov/content/pkg/FR-1983-08-18/pdf/FR-1983-08-18.pdf"]]],
"us-mendocino-ridge":[`<p>Mendocino Ridge, approved in 1997, was the first AVA in the country defined only by elevation and not by a continuous area. It takes in land above 1,200 feet on the coastal ridges of western Mendocino, so it appears on the map as scattered islands of high ground above the fog, the growers' "islands in the sky," with old Zinfandel vineyards such as DuPratt and Zeni. In January 2024 its board petitioned TTB to rename it Mendocino Coast Ridge to make the coastal identity clear.</p>`,[["Wikipedia: Mendocino Ridge AVA","https://en.wikipedia.org/wiki/Mendocino_Ridge_AVA"]]],
"us-cole-ranch":[`<p>The smallest AVA in the United States for years, Cole Ranch was petitioned by the ranch's own proprietor and approved in April 1983. It is a single small valley in the hills between Ukiah and Boonville, roughly 150 to 190 acres in all, essentially one vineyard planted in the early 1970s. Its grapes went to Fetzer, Navarro, Husch and others. In 1999 the Sterling family, ranchers and growers since the 1960s, bought it for their Esterlina winery. It is the purest case of TTB approving an AVA built around one property's distinct climate.</p>`,[["Federal Register, 15 Apr 1983: Cole Ranch final rule (T.D. ATF-130)","https://www.govinfo.gov/content/pkg/FR-1983-04-15/pdf/FR-1983-04-15.pdf"]]],
"us-comptche":[`<p>Comptche, pronounced "comp-chee," is a hamlet in the hills east of the town of Mendocino. Its petitioners made an unusual argument: the area is so cold, cooler than Anderson Valley, Mendocino Ridge and the Mendocino AVA, that it should be left out of the North Coast AVA altogether. TTB agreed, and in 2024 approved the AVA outside North Coast, a rare case of growers asking to be kept out of a larger region because its name did not describe them.</p>`,[["Wikipedia: Comptche AVA","https://en.wikipedia.org/wiki/Comptche_AVA"]]],
"us-covelo":[`<p>Ralph Carter of Sonoma petitioned for this remote valley in north-east Mendocino, approved in February 2006. Round Valley, as locals call it, is ranch country around the town of Covelo and the Round Valley reservation, cut off by mountains and much colder in winter than the main Mendocino valleys. Jake and William Claus farm the only certified organic vineyards there.</p>`,[["Wikipedia: Covelo AVA","https://en.wikipedia.org/wiki/Covelo_AVA"]]],
"us-dos-rios":[`<p>Ralph Carter petitioned for Dos Rios, "two rivers," where the Middle Fork of the Eel meets the main river. It is remote ranch and wilderness country, and its first commercial vineyard was planted only in 1993, when Vin de Tevis put in six acres of Cabernet Sauvignon, Cabernet Franc, Merlot and Zinfandel on rocky slopes. TTB approved the AVA in 2005, making it one of the few AVAs based essentially on a single small vineyard's pioneering.</p>`,[["Wikipedia: Dos Rios AVA","https://en.wikipedia.org/wiki/Dos_Rios_AVA"]]],
"us-eagle-peak-mendocino-county":[`<p>Ben and Jake Fetzer, third-generation Mendocino vintners and grandsons of founder Barney Fetzer, founded Masút on these mountain slopes west of Redwood Valley and drove the petition, filed by Ralph Carter on behalf of John Fetzer and five vineyards. Two companion petitions moved the Mendocino and Redwood Valley boundaries so the three would fit together. Named for the nearby Eagle Peak, the AVA, approved in 2014, is cooler than the inland valleys and was made for Pinot Noir.</p>`,[["Wikipedia: Eagle Peak Mendocino County AVA","https://en.wikipedia.org/wiki/Eagle_Peak_Mendocino_County_AVA"]]],
"us-mcdowell-valley":[`<p>Some Syrah vines here date from 1919, among the oldest in California. Karen Keehn of McDowell Valley Vineyards, the only winery, petitioned with ten other landowners, and ATF approved it in December 1981, one of the first ten AVAs in the country. The valley is a small, elevated bench east of Hopland, about 1,000 feet up, warmer by day and cooler by night than the Russian River valley floor below. The Keehns championed its old Syrah and Grenache long before the Rhône Rangers made them fashionable.</p>`,[["Federal Register, 4 Dec 1981: McDowell Valley final rule (T.D. ATF-97)","https://www.govinfo.gov/content/pkg/FR-1981-12-04/pdf/FR-1981-12-04.pdf"]]],
"us-potter-valley":[`<p>Grapes came late to this high valley at the head of the Russian River: Guinness McFadden planted the first vines in the 1970s, followed by Todd Family, Vecino and smaller growers. The petition was drafted after a meeting of most of the area's growers; nearly all the others were contacted and none opposed the boundary. ATF approved it in October 1983. At about 1,000 feet, with cold nights and frost, the valley suits white grapes and sparkling-wine base.</p>`,[["Wikipedia: Potter Valley AVA","https://en.wikipedia.org/wiki/Potter_Valley_AVA"]]],
"us-redwood-valley":[`<p>Named for the redwoods around it, the valley north of Ukiah saw some of the county's first vineyards in the mid-nineteenth century, planted by Italian and Greek immigrants, though growing stayed small until the 1950s. Fetzer began here in 1968. The petition was signed by 20 growers and winemakers, with four letters of support, and ATF approved it in December 1996. Its argument: higher terraces at the head of the Russian River system, cooler than the Ukiah Valley, with red, iron-rich soils. A 2014 adjustment made room for Eagle Peak to the west.</p>`,[["Wikipedia: Redwood Valley AVA","https://en.wikipedia.org/wiki/Redwood_Valley_AVA"]]],
"us-yorkville-highlands":[`<p>William Weir of Weir Vineyards petitioned for the Yorkville Highlands Appellation Committee, and Bernadette Byrne of the Mendocino Winegrowers Alliance filed a companion petition to move the Mendocino AVA's southern line to meet it. Approved in 1998, the AVA fills the high, rocky country along Highway 128 between Sonoma's Alexander Valley and Anderson Valley, at roughly 1,000 to 2,500 feet, with gravelly, low-fertility soils. It is a transition zone, warmer than Anderson Valley but cooler than Alexander Valley.</p>`,[["Wikipedia: Yorkville Highlands AVA","https://en.wikipedia.org/wiki/Yorkville_Highlands_AVA"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
