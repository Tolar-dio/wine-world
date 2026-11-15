// Full encyclopedia entries: Paso Robles AVA and its eleven districts. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function pr(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const PRCJ="California law requires conjunctive labeling: a wine labelled with one of the eleven districts must also carry the words Paso Robles.";
const PRW=["Paso Robles Wine Country Alliance: AVAs","https://pasowine.com/"];
const PRTD="T.D. TTB-125, 79 FR 60960, 9 October 2014";
function pd(o){return pr(Object.assign({lab:PRCJ,rec:"October 2014",td:PRTD,sources:[PRW],rules:"All eleven districts were created in a single 2014 rulemaking that split the big Paso Robles AVA by climate, soil and elevation."},o));}

APXF["us-paso-robles"] = pr({
  lede: "A big AVA covering most of northern San Luis Obispo County: hot days, very cold nights and limestone-rich western hills that produce powerful Rhône blends, Cabernet and Zinfandel.",
  rec: "October 1983", cfr: "9.84", td: "T.D. ATF-148, 48 FR 45241, 4 October 1983", am: "T.D. ATF-377 (1996) and TTB-72 (2009)",
  facts: [["Area", "About 247,000 ha (610,000 acres), more than 16,000 ha planted"], ["Districts", "Adelaida, Creston, El Pomar, Paso Robles Estrella, Paso Robles Geneseo, Paso Robles Highlands, Paso Robles Willow Creek, San Juan Creek, San Miguel, Santa Margarita Ranch, Templeton Gap"]],
  place: "The Santa Lucia Range separates it from the ocean except at the Templeton Gap, where marine air enters. The west is hilly, wetter and calcareous; the east is flatter, hotter and drier, on alluvial and sandy soils. Day-night swings of 20°C or more are common.",
  history: "Zinfandel arrived with Italian and Swiss families in the early twentieth century. The Perrins of Beaucastel founded Tablas Creek in 1989 and imported Rhône cuttings, seeding the 'Rhône Ranger' movement.",
  glass: "Ripe, high-alcohol GSM blends, Syrah, Cabernet and Zinfandel; west-side wines combine power with acidity.",
  exam: "Eleven districts (2014); conjunctive labeling; Tablas Creek; Templeton Gap; limestone west side.",
  producers: ["Tablas Creek", "Saxum", "L'Aventure", "Justin", "J. Lohr", "Daou", "Turley (Pesenti)", "Linne Calodo"],
  sources: [PRW]
});

APXF["us-adelaida-district"] = pd({
  lede: "The north-western hills of Paso Robles in the Santa Lucia foothills, on calcareous shale and limestone, home of Tablas Creek.",
  cfr: "9.238", facts: [["Elevation", "About 275 to 670 m"], ["Soils", "Calcareous shale and limestone"]],
  place: "More rain than the east and cool nights at elevation.",
  glass: "Fresh, structured Rhône blends and Cabernet.",
  exam: "Tablas Creek; limestone; highest rainfall.",
  producers: ["Tablas Creek", "Justin", "Halter Ranch", "Daou", "Adelaida Vineyards"]
});

APXF["us-creston-district"] = pd({
  lede: "South-eastern foothills of the La Panza Range around the hamlet of Creston.",
  cfr: "9.239", facts: [["Elevation", "About 300 to 600 m"]],
  place: "Mixed alluvial and granitic soils, low rainfall, warm and dry.",
  glass: "Cabernet, Zinfandel and Syrah.", exam: "La Panza foothills.", producers: []
});

APXF["us-el-pomar-district"] = pd({
  lede: "High, old alluvial terraces south-east of Templeton, still touched by marine air from the Templeton Gap.",
  cfr: "9.240", facts: [["Soils", "Old alluvial terraces with calcareous patches"]],
  place: "Moderate temperatures for Paso Robles.",
  glass: "Zinfandel, Cabernet and Merlot.", exam: "Templeton Gap influence; old terraces.", producers: []
});

APXF["us-paso-robles-estrella-district"] = pd({
  lede: "Rolling plains north-east of Paso Robles along the Estrella River, where Gary Eberle planted some of California's first Syrah.",
  cfr: "9.241", facts: [["Soils", "Alluvial terraces"]],
  place: "Warm and dry plains.",
  glass: "Syrah, Cabernet and Zinfandel.", exam: "Estrella River; Eberle.",
  producers: ["Eberle", "J. Lohr", "Vina Robles"]
});

APXF["us-paso-robles-geneseo-district"] = pd({
  lede: "Low hills east of Paso Robles city on old terraces with some calcareous soils.",
  cfr: "9.242", facts: [["Soils", "Alluvial terraces, some calcareous"]],
  place: "Moderate warmth and slightly more rain than further east.",
  glass: "Bordeaux and Rhône varieties.", exam: "East of town.", producers: ["Cass", "Tobin James"]
});

APXF["us-paso-robles-highlands-district"] = pd({
  lede: "The high, remote south-east, with the biggest day-night temperature swings in Paso Robles.",
  cfr: "9.243", facts: [["Elevation", "About 365 to 610 m"], ["Soils", "Sandy alluvium"]],
  place: "Low rainfall; large vineyards.",
  glass: "Cabernet, Zinfandel, Rhône varieties.", exam: "Largest diurnal swing.", producers: []
});

APXF["us-paso-robles-willow-creek-district"] = pd({
  lede: "Rolling calcareous hills west of Paso Robles town, cooled by Templeton Gap air, with some of the region's most famous estates.",
  cfr: "9.244", facts: [["Soils", "Calcareous"]],
  place: "Marine air and limestone combine to keep acidity in very ripe wines.",
  glass: "Dense, ripe Rhône and Cabernet blends with freshness.", exam: "Saxum James Berry; L'Aventure.",
  producers: ["Saxum", "L'Aventure", "Linne Calodo", "Booker"]
});

APXF["us-san-juan-creek"] = pd({
  lede: "The eastern, hottest and driest district, in the upper Cholame and San Juan Creek valleys.",
  cfr: "9.245", facts: [["Climate", "Hot, very low rainfall"]],
  place: "Big, irrigated vineyards.", glass: "Ripe reds for blending.", exam: "Hottest district.", producers: []
});

APXF["us-san-miguel-district"] = pd({
  lede: "The northern district around the mission of San Miguel Arcángel, founded in 1797.",
  cfr: "9.246", facts: [["Soils", "Alluvium along the Salinas and Estrella rivers"]],
  place: "Warm, with large vineyards.", glass: "Cabernet and Merlot.", exam: "Mission San Miguel.", producers: []
});

APXF["us-santa-margarita-ranch"] = pd({
  lede: "The southernmost district, a single historic ranch near Santa Margarita that was once mission land of San Luis Obispo.",
  cfr: "9.247", facts: [["Climate", "Cooler and wetter than most of Paso Robles"]],
  place: "Large vineyards on one ranch.", glass: "Cabernet and Chardonnay.", exam: "Single ranch; mission lands.", producers: []
});

APXF["us-templeton-gap-district"] = pd({
  lede: "The south-western corner, where gaps in the Santa Lucia Range let ocean air and fog in: the coolest district, with old Italian-planted Zinfandel.",
  cfr: "9.248", facts: [["Soils", "Calcareous"]],
  place: "Afternoon marine air sharply lowers temperatures.",
  glass: "Zinfandel and Rhône blends with lift.", exam: "Coolest district; Pesenti Zinfandel.",
  producers: ["Turley (Pesenti Vineyard)", "Castoro", "Peachy Canyon"]
});
})();
