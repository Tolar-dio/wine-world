// Full encyclopedia entries: Lake County AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function lk(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const LKW=["Lake County Winegrape Commission","https://lakecountywinegrape.org/"];
APXF["us-clear-lake"] = lk({
  lede: "The umbrella AVA around California's largest natural freshwater lake, with high-elevation vineyards on volcanic soils and some of the cleanest air in the state.",
  rec: "May 1984", cfr: "9.99", td: "T.D. ATF-174, 49 FR 19468, 8 May 1984", am: "T.D. TTB-182 (2022)",
  facts: [["Contains", "Big Valley District, Kelsey Bench, Red Hills, High Valley, Upper Lake Valley"]],
  place: "The lake moderates temperatures; most vineyards sit above 400 m, so nights are cool and UV intense. Mount Konocti, a dormant volcano, dominates the south shore.",
  glass: "Sauvignon Blanc with ripe citrus; firm, deeply coloured Cabernet.", exam: "Clear Lake; Mount Konocti; elevation.",
  producers: ["Steele", "Shannon Ridge", "Brassfield", "Six Sigma"], sources: [LKW]
});
APXF["us-red-hills-lake-county"] = lk({
  lede: "Volcanic hills on the flanks of Mount Konocti, with obsidian-strewn red soils and intense light that give Cabernet thick skins and firm tannin.",
  rec: "July 2004", cfr: "9.169", td: "T.D. TTB-15, 69 FR 41754, 12 July 2004", am: "TTB-118 (2013) and TTB-190 (2024, expansion)",
  facts: [["Elevation", "About 430 to 900 m"], ["Soils", "Red volcanic soils with obsidian"]],
  place: "On the south-west shore of Clear Lake between Lower Lake and Kelseyville.",
  glass: "Dense, structured Cabernet Sauvignon.", exam: "Obsidian; Mount Konocti; Beckstoffer Amber Knolls.",
  producers: ["Obsidian Ridge", "Beckstoffer (Amber Knolls)", "Brassfield", "Shannon Ridge"], sources: [LKW]
});
APXF["us-big-valley-district-lake-county"] = lk({ lede: "A flat basin on Clear Lake's south-west shore around Kelseyville, cooler and frostier than the slopes.", rec: "October 2013", cfr: "9.232", td: "T.D. TTB-118, 78 FR 60688, 2 October 2013", facts: [["Vines", "About 730 ha at approval"]], place: "High water tables and cold-air pooling.", glass: "Sauvignon Blanc.", exam: "Kelseyville basin.", producers: [], sources: [LKW] });
APXF["us-kelsey-bench-lake-county"] = lk({ lede: "A gently sloping bench between Big Valley and the Red Hills with better air drainage.", rec: "October 2013", cfr: "9.233", td: "T.D. TTB-118, 78 FR 60689, 2 October 2013", facts: [["Elevation", "About 410 to 610 m"]], place: "Deep, well-drained alluvial soils.", glass: "Cabernet, Sauvignon Blanc.", exam: "Bench above Big Valley.", producers: [], sources: [LKW] });
APXF["us-high-valley"] = lk({ lede: "A narrow, east-west valley above Clear Lake near Clearlake Oaks, where cold air drains from the ridges.", rec: "July 2005", cfr: "9.189", td: "T.D. TTB-30, 70 FR 38001, 1 July 2005", am: "T.D. TTB-188 (2023)", facts: [["Elevation", "About 500 to 920 m"]], place: "Volcanic and alluvial soils; long season.", glass: "Sauvignon Blanc, Cabernet, Rhône varieties.", exam: "Brassfield.", producers: ["Brassfield"], sources: [LKW] });
APXF["us-upper-lake-valley"] = lk({ lede: "A valley at the north end of Clear Lake whose petition stressed its shallow, stream-fed water table.", rec: "June 2022", cfr: "9.286", td: "T.D. TTB-182, 87 FR 33645, 3 June 2022", facts: [["Area", "About 7,000 ha (17,360 acres)"]], place: "Streams from the Mendocino National Forest feed groundwater.", glass: "Sauvignon Blanc and reds.", exam: "Hydrogeology.", producers: [], sources: [LKW] });
APXF["us-long-valley-lake-county"] = lk({ lede: "A small, high valley north-east of Clear Lake with cold winters.", rec: "July 2023", cfr: "9.289", td: "T.D. TTB-188, 88 FR 42881, 5 July 2023", facts: [["Area", "About 3,100 ha (7,605 acres)"]], place: "Elevation and cold winters; a handful of vineyards.", glass: "Small production.", exam: "2023.", producers: [], sources: [LKW] });
APXF["us-benmore-valley"] = lk({ lede: "A small, high valley in the Mayacamas on Lake County's western edge.", rec: "October 1991", cfr: "9.138", td: "T.D. ATF-315, 56 FR 52191, 18 October 1991", facts: [["Elevation", "About 730 m"]], place: "Once planted to Chardonnay for big brands; few vines now.", glass: "Little made.", exam: "High Mayacamas valley.", producers: [], sources: [LKW] });
APXF["us-guenoc-valley"] = lk({
  lede: "An early single-proprietor AVA on the old Guenoc Ranch, bought in 1888 by the actress Lillie Langtry.",
  rec: "November 1981", cfr: "9.26", td: "T.D. ATF-95, 46 FR 56786, 19 November 1981",
  facts: [["County", "Lake"]], place: "Southern Lake County, warmer than the lake basin.",
  history: "Langtry hired a Bordeaux winemaker in hopes of making claret.", glass: "Cabernet and Petite Sirah.", exam: "Lillie Langtry; single-proprietor AVA.",
  producers: ["Langtry Farms"], sources: [LKW]
});
})();
