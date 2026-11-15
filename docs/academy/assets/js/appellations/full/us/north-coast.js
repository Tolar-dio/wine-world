// Full encyclopedia entries: North Coast umbrella and Solano County AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function nc(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
APXF["us-north-coast"] = nc({
  lede: "A vast umbrella AVA covering the wine country north of San Francisco: most of Napa, Sonoma, Mendocino and Lake counties plus parts of Solano and Marin.",
  rec: "September 1983", cfr: "9.30", td: "T.D. ATF-145, 48 FR 42977, 21 September 1983", am: "2017, 2023 and 2024",
  facts: [["Counties", "Lake, Marin, Mendocino, Napa, Solano, Sonoma"], ["Area", "About 1.3 million ha (3.3 million acres)"]],
  place: "Coast ranges and valleys shaped by Pacific fog and inland heat. Comptche, though in Mendocino County, is explicitly excluded.",
  glass: "Used for blends across counties.", exam: "Umbrella; Comptche excluded.", producers: []
});
APXF["us-suisun-valley"] = nc({
  lede: "A valley just east of Napa across the Vaca range near Fairfield, cooled by winds off Suisun Bay.",
  rec: "November 1982", cfr: "9.45", td: "T.D. ATF-117, 47 FR 52997, 24 November 1982",
  facts: [["County", "Solano"]], place: "Afternoon winds through the Carquinez Strait cool the valley.",
  glass: "Petite Sirah, Cabernet, Syrah.", exam: "Solano County; Suisun Bay wind.", producers: ["Wooden Valley", "Ledgewood Creek", "Sunset Cellars"]
});
APXF["us-solano-county-green-valley"] = nc({
  lede: "A small valley in western Solano County next to Napa's Wild Horse Valley, cooled by bay air.",
  rec: "December 1982", cfr: "9.44", td: "T.D. ATF-122, 47 FR 37922, 1982",
  facts: [["County", "Solano"]], place: "Hills east of Coombsville.", glass: "Merlot, Cabernet, Chardonnay.", exam: "Not to be confused with Green Valley of Russian River Valley.", producers: []
});

// HISTORY-PASS-START
const HX={
"us-north-coast":[`<p>ATF approved North Coast in September 1983 as a multi-county umbrella covering Napa, Sonoma, Mendocino, Lake and parts of Solano and Marin, so producers could blend across counties under one coastal name at a time when labels could join only two or three county names. It has since been redrawn whenever a new AVA needed to fit inside it: TTB enlarged it by about 28,000 acres for the Petaluma Gap in 2017, and in 2024 left out Comptche at its own growers' request, because they said the North Coast name did not describe their colder climate.</p>`,[["Wikipedia: North Coast AVA","https://en.wikipedia.org/wiki/North_Coast_AVA"]]],
"us-suisun-valley":[`<p>Carsten and Henry Schultz, brothers from Hamburg, started a winery here in 1860 and sold it in 1880 to Louis Mangels, then running one of the largest wineries in California; by 1909 the census counted more than 2,000 acres of grapes. The Western Solano County Grape Growers Association petitioned in 1982, and ATF approved Suisun Valley in November 1982, among the first twenty AVAs. The valley, between Napa and the Delta, draws marine air off Suisun Bay. Growers formed a promotion association in 2003, and some sixteen wineries now operate.</p>`,[["Wikipedia: Suisun Valley AVA","https://en.wikipedia.org/wiki/Suisun_Valley_AVA"]]],
"us-solano-county-green-valley":[`<p>Approved in December 1982, this small valley north of Fairfield sits just east of the Napa County line and grows about 800 acres of Cabernet, Merlot and Syrah. Because a second Green Valley, in Sonoma, was petitioned at almost the same time, ATF required each name to carry its county; this one became Solano County Green Valley, and the Sonoma one, first called Sonoma County Green Valley, later became Green Valley of Russian River Valley.</p>`,[["Wikipedia: Solano County Green Valley AVA","https://en.wikipedia.org/wiki/Solano_County_Green_Valley_AVA"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
