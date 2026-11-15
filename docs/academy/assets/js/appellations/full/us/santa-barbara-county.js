// Full encyclopedia entries: Santa Barbara County AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function sb(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const SBV=["Santa Barbara Vintners: AVAs","https://sbcountywines.com/"];
APXF["us-santa-maria-valley"] = sb({
  lede: "A wide, funnel-shaped valley opening west to the Pacific, among California's first AVAs, where fog and wind give a very long, cool season for Pinot Noir and Chardonnay.",
  rec: "August 1981", cfr: "9.28", td: "T.D. ATF-89, 46 FR 39812, 5 August 1981", am: "T.D. TTB-88 (2010)",
  facts: [["Counties", "Santa Barbara and San Luis Obispo"]],
  place: "One of the few California valleys running east-west, so ocean air flows straight up it. Harvests can run into November. Benches like Bien Nacido sit on sandy and clay loams.",
  history: "Jim Clendenen (Au Bon Climat) and Bob Lindquist (Qupé) made wine at Bien Nacido from the early 1980s.",
  glass: "Spicy, bright Pinot Noir; textured Chardonnay; cool Syrah.",
  exam: "East-west valley; Bien Nacido; Au Bon Climat.",
  producers: ["Au Bon Climat", "Bien Nacido Estate", "Cambria", "Foxen", "Byron", "Qupé"], sources: [SBV]
});
APXF["us-santa-ynez-valley"] = sb({
  lede: "The valley of the Santa Ynez River from Lompoc east toward Lake Cachuma, with a steep west-to-east warming gradient and four sub-AVAs.",
  rec: "April 1983", cfr: "9.54", td: "T.D. ATF-132, 48 FR 16252, 15 April 1983",
  facts: [["Sub-AVAs", "Sta. Rita Hills, Ballard Canyon, Los Olivos District, Happy Canyon of Santa Barbara"]],
  place: "Cold and foggy near Lompoc, warm near Happy Canyon; temperatures climb by several degrees for every few kilometres inland.",
  glass: "Pinot Noir and Chardonnay in the west, Syrah in the middle, Bordeaux varieties in the east.",
  exam: "East-west gradient; four sub-AVAs.",
  producers: ["Firestone", "Gainey", "Buttonwood"], sources: [SBV]
});
APXF["us-sta-rita-hills"] = sb({
  lede: "The cold western end of the Santa Ynez Valley, abbreviated 'Sta.' after a dispute with Chile's Viña Santa Rita: one of California's great Pinot Noir and Chardonnay areas.",
  rec: "May 2001", cfr: "9.162", td: "T.D. ATF-454, 66 FR 29479, 31 May 2001", am: "T.D. TTB-37 (2005, renaming) and TTB-141 (2016, expansion)",
  facts: [["Soils", "Sand, clay and diatomaceous earth"]],
  place: "The Santa Rosa Road and Highway 246 corridors run between hills straight toward the Pacific, so wind and fog are constant. It is among the coolest places in California.",
  history: "Richard Sanford and Michael Benedict planted Sanford & Benedict in 1971. The AVA was approved as Santa Rita Hills and renamed Sta. Rita Hills in 2005 after objections from Viña Santa Rita.",
  glass: "Taut, savoury Pinot Noir with high acidity; mineral, saline Chardonnay; Syrah.",
  exam: "Sta. abbreviation; Viña Santa Rita dispute; Sanford & Benedict 1971; diatomaceous earth.",
  producers: ["Sanford", "Sea Smoke", "Domaine de la Côte", "Sandhi", "Brewer-Clifton", "Melville", "Babcock"], sources: [SBV]
});
APXF["us-ballard-canyon"] = sb({
  lede: "A small north-south canyon between Buellton and Los Olivos whose growers chose to focus on Syrah.",
  rec: "October 2013", cfr: "9.230", td: "T.D. TTB-116, 78 FR 60695, 2 October 2013",
  facts: [["Area", "About 3,200 ha (7,800 acres)"], ["Soils", "Calcareous and sandy"]],
  place: "The canyon's orientation shelters it from the coldest winds while catching marine air; mid-way on the valley's warming gradient.",
  glass: "Dark, peppery, savoury Syrah; Grenache and other Rhône grapes.",
  exam: "Syrah focus; Stolpman.",
  producers: ["Stolpman", "Larner", "Jonata", "Saarloos"], sources: [SBV]
});
APXF["us-los-olivos-district"] = sb({
  lede: "An alluvial plain around Los Olivos between Ballard Canyon and Happy Canyon, with moderate temperatures for Sauvignon Blanc and Bordeaux and Rhône reds.",
  rec: "January 2016", cfr: "9.253", td: "T.D. TTB-132, 81 FR 3329, 21 January 2016",
  facts: [["Area", "About 9,200 ha (22,800 acres)"]],
  place: "Well-drained alluvial soils on a gently sloping plain.",
  glass: "Sauvignon Blanc; Cabernet, Merlot, Syrah.", exam: "Between Ballard and Happy Canyon.",
  producers: ["Beckmen", "Andrew Murray", "Brander"], sources: [SBV]
});
APXF["us-happy-canyon-of-santa-barbara"] = sb({
  lede: "The eastern and warmest corner of the Santa Ynez Valley, where Bordeaux varieties ripen on serpentine and rocky soils.",
  rec: "October 2009", cfr: "9.217", td: "T.D. TTB-82, 74 FR 51776, 8 October 2009",
  facts: [["Area", "About 9,700 ha (23,900 acres)"], ["Soils", "Serpentine and rocky"]],
  place: "Farthest from the ocean; hot days and cool nights.",
  history: "The name is said to come from Prohibition-era bootlegging in the canyon.",
  glass: "Cabernet Sauvignon, Cabernet Franc and Sauvignon Blanc.",
  exam: "Warmest Santa Ynez sub-AVA; Bordeaux varieties.",
  producers: ["Star Lane", "Grassini", "Happy Canyon Vineyard", "Vogelzang"], sources: [SBV]
});
APXF["us-alisos-canyon"] = sb({
  lede: "A small AVA in the hills between the Santa Maria and Santa Ynez valleys near Los Alamos, cool and foggy, focused on Syrah and Rhône grapes.",
  rec: "August 2020", cfr: "9.270", td: "T.D. TTB-161, 85 FR 52273, 25 August 2020",
  facts: [["Area", "About 2,300 ha (5,800 acres)"], ["Soils", "Sandy and calcareous"]],
  place: "Marine climate with fog; a transition between the two big valleys.",
  glass: "Cool-climate Syrah and Rhône blends.", exam: "Los Alamos; Rhône focus.", producers: [], sources: [SBV]
});
})();
