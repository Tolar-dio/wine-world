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
})();
