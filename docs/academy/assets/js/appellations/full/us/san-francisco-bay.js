// Full encyclopedia entries: San Francisco Bay AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function sf(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
APXF["us-san-francisco-bay"] = sf({
  lede: "An umbrella AVA around San Francisco Bay, covering Livermore, Santa Clara, Contra Costa and the bay's other wine districts.",
  rec: "January 1999", cfr: "9.157", td: "T.D. ATF-407, 64 FR 3024, 20 January 1999", am: "2006, 2008 and 2024 (adding all of Contra Costa AVA)",
  facts: [["Counties", "Mainly San Francisco, San Mateo, Santa Clara, Alameda, Contra Costa"]],
  place: "Bay-influenced valleys and hills; cool air pulled in from the Golden Gate and the bay.",
  glass: "Varies widely.", exam: "Umbrella; part of Central Coast.", producers: []
});
APXF["us-livermore-valley"] = sf({
  lede: "One of California's oldest wine districts, an east-west valley where bay air cools the afternoons over gravel that reminded early growers of Graves.",
  rec: "September 1982", cfr: "9.46", td: "T.D. ATF-112, 47 FR 38520, 1 September 1982", am: "T.D. TTB-47 (2006)",
  facts: [["Counties", "Alameda and Contra Costa"], ["Soils", "Gravelly"]],
  place: "Marine air flows in each afternoon; gravelly soils drain well.",
  history: "Charles Wetmore brought Sauvignon Blanc and Sémillon cuttings from Château d'Yquem in the 1880s; Wente's Chardonnay clone, from Livermore, became the source of most California Chardonnay. Wente and Concannon are among the oldest family wineries in the US.",
  glass: "Sauvignon Blanc and Sémillon; Cabernet; Petite Sirah (Concannon pioneered it as a varietal).",
  exam: "Wente clone; Wetmore and Yquem cuttings; Concannon Petite Sirah.",
  producers: ["Wente", "Concannon", "Darcie Kent", "Murrieta's Well", "Retzlaff"]
});
APXF["us-contra-costa"] = sf({
  lede: "Eastern Contra Costa County around Oakley and Brentwood, whose deep sands shelter ungrafted, century-old Zinfandel, Mourvèdre and Carignan.",
  rec: "March 2024", cfr: "9.291", td: "T.D. TTB-191, 89 FR 18801, 15 March 2024",
  facts: [["Area", "About 67,600 ha (167,100 acres)"], ["Soils", "Deep sands (phylloxera-resistant)"]],
  place: "Hot inland days cooled by Delta breezes; sandy soils kept phylloxera away, so old own-rooted vines survive.",
  history: "Fred Cline's family farmed here before founding Cline Cellars; Bedrock and Turley source old vines such as Evangelho.",
  glass: "Spicy old-vine Zinfandel, Mourvèdre (Mataro) and Carignan.",
  exam: "Ungrafted vines in sand; Evangelho; 2024.",
  producers: ["Cline (origins)", "Bedrock (Evangelho)"]
});
APXF["us-lamorinda"] = sf({
  lede: "A small, hilly AVA in western Contra Costa named for Lafayette, Moraga and Orinda.",
  rec: "February 2016", cfr: "9.254", td: "T.D. TTB-133, 81 FR 9108, 24 February 2016",
  facts: [["Vineyards", "Many tiny plots on the Berkeley Hills"]],
  place: "Slopes east of the Berkeley Hills with bay-moderated climate.",
  glass: "Cabernet, Merlot, Pinot Noir and Chardonnay.", exam: "Lafayette, Moraga, Orinda.", producers: []
});
APXF["us-santa-clara-valley"] = sf({
  lede: "The historic valley south of San Francisco Bay, now Silicon Valley, where urban growth erased most of a nineteenth-century wine industry.",
  rec: "March 1989", cfr: "9.126", td: "T.D. ATF-286, 54 FR 12606, 28 March 1989",
  facts: [["Sub-AVA", "San Ysidro District"]],
  place: "Valley floor and foothills south toward Gilroy, where most remaining vineyards are.",
  history: "Charles Lefranc founded Almaden in 1852; Paul Masson worked here; J. Lohr began in San Jose.",
  glass: "Chardonnay, Pinot Noir, Cabernet from the southern valley.", exam: "Almaden 1852; Silicon Valley.",
  producers: ["Guglielmo", "Sarah's Vineyard"]
});
APXF["us-san-ysidro-district"] = sf({
  lede: "A small district on the east side of the Santa Clara Valley near Gilroy, cooled through the Pajaro Gap.",
  rec: "November 1990", cfr: "9.130", td: "T.D. ATF-305, 55 FR 47749, 15 November 1990",
  facts: [["County", "Santa Clara"]],
  place: "Marine air through the Pajaro Gap.", glass: "Chardonnay and Pinot Noir for other wineries.", exam: "Pajaro Gap.", producers: []
});
APXF["us-pacheco-pass"] = sf({
  lede: "A small AVA at the pass through the Diablo Range between Santa Clara and San Benito counties.",
  rec: "March 1984", cfr: "9.88", td: "T.D. ATF-167, 49 FR 9169, 12 March 1984",
  facts: [["Counties", "Santa Clara and San Benito"]],
  place: "Strong marine winds on the historic route to the San Joaquin Valley.", glass: "Little bottled under the name.", exam: "Diablo Range pass.", producers: []
});
})();
