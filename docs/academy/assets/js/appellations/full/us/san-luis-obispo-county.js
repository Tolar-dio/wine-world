// Full encyclopedia entries: San Luis Obispo County coastal AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function sl(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
APXF["us-san-luis-obispo-coast"] = sl({
  lede: "A long coastal AVA west of the Santa Lucia Range, from the Monterey line to the Santa Maria River, cooled directly by the Pacific.",
  rec: "March 2022", cfr: "9.282", td: "T.D. TTB-177, 87 FR 13163, 9 March 2022",
  facts: [["Area", "About 165,000 ha (408,500 acres)"], ["Contains", "Edna Valley, Arroyo Grande Valley"]],
  place: "The petition showed that marine air, not the inland heat of Paso Robles, governs the whole coastal strip: fog, wind and a long, cool season. Soils range from marine sediments to volcanic plugs around San Luis Obispo.",
  glass: "Cool-climate Pinot Noir, Chardonnay, Syrah and Albariño.",
  exam: "2022; coastal side of the Santa Lucia Range.",
  producers: ["Stolo", "Talley", "Tolosa", "Center of Effort"]
});
APXF["us-edna-valley"] = sl({
  lede: "A cool east-west valley south of San Luis Obispo, open to the Pacific through Morro Bay, with one of California's longest growing seasons.",
  rec: "May 1982", cfr: "9.35", td: "T.D. ATF-101, 47 FR 20299, 12 May 1982", am: "T.D. ATF-249 (1987)",
  facts: [["Soils", "Marine sediments, clay and volcanic outcrops"]],
  place: "Fog and wind flow straight in, so budbreak is early and harvest late. Old volcanic plugs (the Morros) line the area.",
  history: "John Alban planted Rhône varieties here in the late 1980s, among the first in California.",
  glass: "Crisp, citrus Chardonnay; Pinot Noir; Rhône varieties.",
  exam: "Morro Bay opening; long season; Alban.",
  producers: ["Edna Valley Vineyard", "Chamisal", "Tolosa", "Alban"]
});
APXF["us-arroyo-grande-valley"] = sl({
  lede: "A valley south-east of Edna Valley grading from cool and foggy near the coast to warm at its inland head, where old Zinfandel survives.",
  rec: "January 1990", cfr: "9.129", td: "T.D. ATF-291, 55 FR 287, 4 January 1990",
  facts: [["Climate", "Cool coastal end, warm upper end"]],
  place: "The lower valley gets fog and wind; the upper valley at Saucelito Canyon is sheltered and warm.",
  glass: "Pinot Noir and Chardonnay from Talley's Rincon and Rosemary's; old-vine Zinfandel upstream.",
  exam: "Talley; Saucelito Canyon Zinfandel.",
  producers: ["Talley", "Saucelito Canyon", "Laetitia"]
});
APXF["us-york-mountain"] = sl({
  lede: "A tiny, cool AVA in the Santa Lucia Range between Paso Robles and the coast, site of one of the county's oldest wineries.",
  rec: "August 1983", cfr: "9.80", td: "T.D. ATF-143, 48 FR 38463, 24 August 1983", am: "T.D. ATF-249 (1987)",
  facts: [["Elevation", "About 450 m"]],
  place: "Marine air makes it much cooler and wetter than Paso Robles just east.",
  history: "Andrew York founded a winery here in 1882.",
  glass: "Pinot Noir and cooler-climate reds.", exam: "York 1882; cool.", producers: []
});

// HISTORY-PASS-START
const HX={
"us-san-luis-obispo-coast":[`<p>Mission San Luis Obispo de Tolosa planted Mission grapes by the early 1800s. The SLO Coast AVA Association filed its petition in July 2017 for a long coastal strip from the Monterey line to Santa Barbara County, within a few miles of the sea, and TTB approved it in 2022, with "SLO Coast" allowed as a short form. The argument was the ocean itself: these vineyards are cooler and foggier than inland Paso Robles, and the new name gave Edna Valley, Arroyo Grande and the coastal vineyards near Cambria a shared identity apart from Paso.</p>`,[["TTB: Petition to establish San Luis Obispo Coast and SLO Coast (2017)","https://www.ttb.gov/system/files/images/pdfs/petition-establish-san-luis-obispo-coast-slo-coast-ava.pdf"]]],
"us-edna-valley":[`<p>Unlike most of the county, Edna Valley had little nineteenth-century vineyard history; its revival began in the 1970s when the Niven family planted Paragon Vineyard. Paragon filed the petition in September 1980, joined by Edna Valley Vineyard, Chamisal, Lawrence Winery and MacGregor, and ATF approved it in 1982. Their case was the valley's orientation: open to Morro Bay, it draws in cool marine air and has one of the longest growing seasons in California. John Alban planted Rhône varieties here in the late 1980s, among the first in California.</p>`,[["TTB: Edna Valley petition (1980)","https://www.ttb.gov/system/files?file=images/pdfs/Edna_Valley_petition.pdf"]]],
"us-arroyo-grande-valley":[`<p>Henry Ditmas, a sheep farmer who settled here in the 1870s, planted Zinfandel in the 1880s on what is now Saucelito Canyon. Don Talley of Talley Vineyards and William Greenough of Saucelito Canyon, who revived Ditmas's old vines in the 1970s, filed the petition in 1987, and ATF approved it in 1990. The valley runs from cool, foggy lower reaches near the coast, where Talley grows Pinot Noir and Chardonnay, to warmer upper canyons, where those old Zinfandel vines still grow.</p>`,[["TTB: Arroyo Grande Valley petition","https://www.ttb.gov/system/files?file=images/pdfs/Arroyo_Grande_Valley_petition.pdf"]]],
"us-york-mountain":[`<p>Andrew York founded a winery here in 1882, and the York family ran it for nearly a century. Max Goldman, who bought York Mountain Winery in 1970, filed the petition in July 1982, and ATF approved it in 1983: an AVA built around one historic winery, on the cool, wet eastern flank of the Santa Lucia range, with far more rain than Paso Robles just to the east.</p>`,[["TTB: York Mountain petition (1982)","https://www.ttb.gov/media/69475/download?inline"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
