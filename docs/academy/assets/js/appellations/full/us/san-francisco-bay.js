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

// HISTORY-PASS-START
const HX={
"us-san-francisco-bay":[`<p>A consortium of nearly 75 growers and vintners led by Wente Bros. petitioned for an AVA around the whole bay, and ATF approved it in January 1999. It was deliberately unusual: the boundary includes the waters of the bay and the City of San Francisco itself, because the petitioners argued the bay is both the source of the area's weather and the focal point of its wine history, from the nineteenth-century wineries of the East Bay and Santa Clara Valley to the merchants of the city. At approval it held about 2,448 square miles, 5,800 acres of vines and more than 39 wineries. The same rule pushed the Central Coast boundary north by about 639 square miles so the new AVA would sit inside it. In practice it gave Livermore, Santa Clara and the East Bay a regional name more meaningful than Central Coast, at a time when suburbs were swallowing vineyards.</p>`,[["Federal Register: Establishment of the San Francisco Bay viticultural area (T.D. ATF-407)","https://www.federalregister.gov/documents/1999/01/20/99-1209/establishment-of-the-san-francisco-bay-viticultural-area-and-the-realignment-of-the-boundary-of-the"]]],
"us-livermore-valley":[`<p>Robert Livermore planted vines on his rancho in the 1840s. Charles Wetmore brought Sauvignon Blanc and Sémillon cuttings from Château d'Yquem in the 1880s, and his Cresta Blanca won a gold medal at the 1889 Paris Exposition; Carl Wente and James Concannon founded their wineries in 1883. Wente's Chardonnay clone, from Livermore, became the source of most California Chardonnay.</p><p>Fifteen Livermore vintners and growers filed the petition, and ATF approved it in September 1982, one of California's first AVAs. Their case was the valley's unusual orientation, an east-west basin open to marine air from the bay, and its gravelly soils. The rule notes the South Bay Aqueduct, completed in 1967, which allowed sprinkler irrigation. Since then the fight has been against houses rather than rival growers: Alameda County's South Livermore plan of the 1990s tied new development to vineyard planting to keep the valley in vines.</p>`,[["Federal Register, 1 Sep 1982: Livermore Valley final rule (T.D. ATF-112)","https://www.govinfo.gov/content/pkg/FR-1982-09-01/pdf/FR-1982-09-01.pdf"]]],
"us-contra-costa":[`<p>The sandy soils of eastern Contra Costa County, around Oakley and Antioch, hold some of California's oldest vines: Zinfandel, Mourvèdre and Carignan planted by Italian and Portuguese families from the late 1800s, ungrafted because phylloxera cannot thrive in sand. Fred Cline's family farmed here before founding Cline Cellars, and Bedrock, Turley and others make wine from old vineyards such as Evangelho, often surrounded now by subdivisions.</p><p>TTB approved the AVA in March 2024. Its petition argued that the county is cooled and moistened by air from the Pacific and the bay more than the inland valleys to the east. Because the new AVA only partly overlapped the existing San Francisco Bay and Central Coast AVAs, TTB enlarged both so they would contain all of it, a sign of how its no-partial-overlap policy shapes boundaries.</p>`,[["Federal Register, 15 Mar 2024: Establishment of the Contra Costa viticultural area","https://www.federalregister.gov/documents/2024/03/15/2024-05476/establishment-of-the-contra-costa-viticultural-area-and-modification-of-the-san-francisco-bay-and"]]],
"us-lamorinda":[`<p>The name is a 1970s contraction of the three towns it covers, Lafayette, Moraga and Orinda, suburbs east of the Berkeley hills. Geographer Patrick Shabram wrote the petition for the Lamorinda Wine Growers Association, and TTB approved it in February 2016. The petition was candid about its character: the vineyards are tiny, each under five acres, squeezed into hills and backyards in a largely suburban landscape. The petition defined it by hilly terrain, marine-influenced climate and soils different from the valleys on either side.</p>`,[["Federal Register: Establishment of the Lamorinda viticultural area","https://www.federalregister.gov/documents/2016/02/24/2016-03860/establishment-of-the-lamorinda-viticultural-area"]]],
"us-santa-clara-valley":[`<p>Charles Lefranc founded Almaden in 1852, Paul Masson worked here, and J. Lohr began in San Jose. In the 1880s the valley was one of California's leading wine districts; Leland Stanford's winery at Mission San José, founded in 1869, survives as the old Weibel winery. ATF approved the AVA in March 1989, covering the valley from the south end of San Francisco Bay to Gilroy, sheltered from the ocean by the Santa Cruz Mountains and from the hot interior by the Diablo Range. By then Silicon Valley had replaced most vineyards with offices, and the AVA serves mainly the surviving southern end around Morgan Hill and Gilroy.</p>`,[["Federal Register, 28 Mar 1989: Santa Clara Valley final rule (T.D. ATF-286)","https://www.govinfo.gov/content/pkg/FR-1989-03-28/pdf/FR-1989-03-28.pdf"]]],
"us-san-ysidro-district":[`<p>Barry Jackson of Harmony Wine Co. petitioned on behalf of the owners of the Mistral and San Ysidro vineyards, the only two commercial vineyards in the area, with about 520 acres of vines on 2,340 acres east of Gilroy. The name comes from the Rancho San Ysidro, granted in 1809 or 1810 by Governor Arrillaga to Ignacio Ortega. The petition first asked for plain "San Ysidro" and was amended to "San Ysidro District," and ATF approved it in November 1990.</p>`,[["Federal Register, 15 Nov 1990: San Ysidro District final rule (T.D. ATF-305)","https://www.govinfo.gov/content/pkg/FR-1990-11-15/pdf/FR-1990-11-15.pdf"]]],
"us-pacheco-pass":[`<p>The name comes from Don Francisco Pacheco, who received the Rancho Pacheco from the Mexican government in 1833; the 15-mile pass through the Diablo Range took its name from the grant. The petition came from the Zanger family of Pacheco Pass Vineyard, who had about 17 acres of grapes and the only bonded wine cellar, and planned more. ATF approved it in March 1984. It is one of several early AVAs built around a single property.</p>`,[["Federal Register, 12 Mar 1984: Pacheco Pass final rule (T.D. ATF-167)","https://www.govinfo.gov/content/pkg/FR-1984-03-12/pdf/FR-1984-03-12.pdf"]]]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
