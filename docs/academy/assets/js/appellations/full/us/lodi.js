// Full encyclopedia entries: Lodi AVA and its seven sub-AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function lo(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const LOCJ="California law requires conjunctive labeling: a wine labelled with one of Lodi's seven sub-AVAs must also say Lodi.";
const LOW=["Lodi Winegrape Commission: AVAs","https://www.lodiwine.com/"];
const LOTD="T.D. TTB-50, 71 FR 40414, 17 July 2006";
function ls(o){return lo(Object.assign({lab:LOCJ,rec:"July 2006",td:LOTD,sources:[LOW],rules:"All seven sub-AVAs were created in one 2006 rulemaking."},o));}
APXF["us-lodi"] = lo({
  lede: "California's Zinfandel capital: a grower's appellation between Sacramento and Stockton with thousands of acres of old, often own-rooted vines, cooled by Delta breezes.",
  rec: "February 1986", cfr: "9.107", td: "T.D. ATF-223, 51 FR 5324, 13 February 1986", am: "T.D. ATF-482 (2002)",
  facts: [["Counties", "San Joaquin and Sacramento"], ["Area", "About 219,000 ha, about 40,000 ha of vines"], ["Sub-AVAs", "Alta Mesa, Borden Ranch, Clements Hills, Cosumnes River, Jahant, Mokelumne River, Sloughhouse"]],
  place: "Between the Sacramento-San Joaquin Delta and the Sierra foothills. Afternoon breezes from the Delta cool an otherwise hot inland climate. Soils run from deep sands near the Mokelumne to clay and cobbled terraces in the east.",
  history: "German and Italian families planted Zinfandel and Tokay from the 1850s. The Lodi Rules sustainability programme, launched in the 2000s, was one of California's first third-party certifications.",
  glass: "Ripe, juicy Zinfandel; old-vine Cinsault and Carignan; Iberian and Rhône varieties.",
  exam: "Zinfandel capital; Delta breeze; seven sub-AVAs; conjunctive labeling; Lodi Rules.",
  producers: ["Michael David", "Bokisch", "Klinker Brick", "m2", "St. Amant"], sources: [LOW]
});
APXF["us-mokelumne-river"] = ls({
  lede: "Lodi's largest and most important sub-AVA, on the deep sandy fan of the Mokelumne River, home of the oldest own-rooted Zinfandel and Cinsault.",
  cfr: "9.200", facts: [["Soils", "Deep sandy loam"]],
  place: "Phylloxera cannot thrive in the sand, so vines over a century old survive on their own roots.",
  glass: "Perfumed, bright old-vine Zinfandel; Bechthold Cinsault.", exam: "Sand; Bechthold Cinsault (1886); Kirschenmann.",
  producers: ["Turley (Kirschenmann)", "Bedrock", "St. Amant", "Michael David"]
});
APXF["us-alta-mesa"] = ls({ lede: "A high, flat terrace in north-eastern Lodi with shallow sandy loam over hardpan.", cfr: "9.195", facts: [["County", "Sacramento"]], place: "Farther from the Delta and warmer than western Lodi.", glass: "Zinfandel, Cabernet, Rhône varieties.", exam: "Hardpan terrace.", producers: [] });
APXF["us-borden-ranch"] = ls({ lede: "Hilly eastern Lodi on cobbled, gravelly old river terraces at the foot of the Sierra.", cfr: "9.196", facts: [["Counties", "Sacramento and San Joaquin"]], place: "Warmer, rolling terrain on the old Borden ranch.", glass: "Cabernet and Zinfandel.", exam: "Gravel terraces.", producers: [] });
APXF["us-clements-hills"] = ls({ lede: "Rolling hills in eastern Lodi on red, cobbly clay loam.", cfr: "9.197", facts: [["County", "San Joaquin"]], place: "Slightly warmer than the west; old river terraces.", glass: "Cabernet, Zinfandel, Iberian varieties.", exam: "Bokisch; Klinker Brick.", producers: ["Bokisch", "Klinker Brick"] });
APXF["us-cosumnes-river"] = ls({ lede: "The north-western sub-AVA on the Cosumnes River, close to the Delta and among the coolest.", cfr: "9.198", facts: [["County", "Sacramento"]], place: "Heavy clay and alluvial soils.", glass: "Pinot Grigio, Chardonnay, Zinfandel.", exam: "Coolest; near the Delta.", producers: [] });
APXF["us-jahant"] = ls({ lede: "A small sub-AVA between the Mokelumne and Cosumnes rivers with clay loam and cool afternoon winds.", cfr: "9.199", facts: [["Counties", "Sacramento and San Joaquin"]], place: "Close to the Delta.", glass: "Zinfandel, Cabernet, Petite Sirah.", exam: "Between two rivers.", producers: [] });
APXF["us-sloughhouse"] = ls({ lede: "The north-eastern and warmest sub-AVA, in Sacramento County foothills along the Cosumnes.", cfr: "9.201", facts: [["County", "Sacramento"]], place: "Red, cobbly soils in the foothills.", glass: "Zinfandel and Rhône varieties.", exam: "Warmest Lodi sub-AVA.", producers: [] });
})();
