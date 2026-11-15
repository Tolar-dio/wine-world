// Full encyclopedia entries: Sierra Foothills AVAs. Legal facts from 27 CFR Part 9 (eCFR, current to 1 November 2026); checked 14 November 2026.
(function(){
function sf(o){const est=o.td?`Established by ${o.td}${o.am?`; amended by ${o.am}`:""}.`:"";const facts=[["Category","American Viticultural Area (AVA)"],["Established",o.rec]].concat(o.cfr?[["Federal definition","27 CFR §"+o.cfr]]:[]).concat(o.facts||[]);const lab=(o.lab||"")+" A label naming this AVA requires at least 85% of the grapes from inside the boundary and the wine fully finished in the state; a variety name needs at least 75% of that grape"+(o.or?" (Oregon law raises these to 95% and, for most varieties, 90%)":"")+". TTB sets no rules on grape varieties, yields, ripeness or winemaking: an AVA defines a place, not a style.";const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${est} ${o.rules?o.rules+" ":""}${lab}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=[["27 CFR Part 9, §"+o.cfr+" (eCFR)","https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-9/subpart-C/section-"+o.cfr]].concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
APXF["us-sierra-foothills"] = sf({
  lede: "A long umbrella AVA following the Sierra Nevada foothills through eight Gold Rush counties, where Zinfandel planted by miners and their heirs still grows.",
  rec: "November 1987", cfr: "9.120", td: "T.D. ATF-261, 52 FR 44105, 18 November 1987", am: "T.D. TTB-196 (2024)",
  facts: [["Counties", "Yuba, Nevada, Placer, El Dorado, Amador, Calaveras, Tuolumne, Mariposa"], ["Area", "About 1 million ha (2.6 million acres)"]],
  place: "Foothills from about 150 to over 1,000 m on decomposed granite, volcanic and schist soils. Hot days, cool nights flowing down from the Sierra, and very dry summers.",
  history: "Vineyards were planted to supply the 1849 Gold Rush camps; many survived Prohibition as home-wine sources, leaving old Zinfandel blocks.",
  glass: "Ripe, dense Zinfandel, Barbera, Syrah and Rhône varieties.",
  exam: "Gold Rush; eight counties; old Zinfandel.", producers: []
});
APXF["us-california-shenandoah-valley"] = sf({
  lede: "The core of Amador County wine around Plymouth, with some of the oldest Zinfandel in California.",
  rec: "December 1982", cfr: "9.37", td: "T.D. ATF-121, 47 FR 57696, 28 December 1982", am: "T.D. ATF-249 (1987)",
  facts: [["Counties", "Amador and El Dorado"], ["Elevation", "About 300 to 600 m"], ["Soils", "Decomposed granite and volcanic"]],
  place: "Rolling hills with hot days and cool nights.",
  history: "The Original Grandpère Vineyard is often cited as the oldest Zinfandel planting in the US, dating to the 1860s. 'California' was added to the name to distinguish it from Virginia's Shenandoah Valley AVA.",
  glass: "Dense, spicy, high-alcohol Zinfandel; Barbera, Syrah.", exam: "Name prefixed 'California'; Grandpère Zinfandel.",
  producers: ["Sobon Estate", "Terre Rouge", "Turley (Amador)", "Andis", "Vino Noceto", "Easton"]
});
APXF["us-el-dorado"] = sf({
  lede: "High vineyards near Coloma, where gold was found in 1848, among the highest in California.",
  rec: "October 1983", cfr: "9.61", td: "T.D. ATF-152, 48 FR 46520, 13 October 1983", am: "T.D. ATF-254 (1987)",
  facts: [["Elevation", "About 365 to 1,070 m"], ["Sub-AVA", "Fair Play"]],
  place: "Volcanic and granitic soils; cool nights at altitude.", glass: "Fresh Zinfandel, Syrah, Barbera, Rhône whites.", exam: "Coloma gold; high elevation.",
  producers: ["Lava Cap", "Boeger", "Madroña", "Holly's Hill"]
});
APXF["us-fair-play"] = sf({ lede: "A high sub-AVA around Fair Play in southern El Dorado County, on decomposed granite.", rec: "February 2001", cfr: "9.168", td: "T.D. ATF-440, 66 FR 11539, 26 February 2001", am: "T.D. TTB-126 (2015)", facts: [["Elevation", "About 600 to 900 m"]], place: "Small family wineries in pine-forest clearings.", glass: "Syrah, Zinfandel, Rhône and Iberian varieties.", exam: "Inside El Dorado.", producers: ["Skinner", "Cedarville", "Miraflores", "Fitzpatrick"] });
APXF["us-fiddletown"] = sf({ lede: "A small Amador AVA above the Shenandoah Valley with old Zinfandel such as Eschen.", rec: "October 1983", cfr: "9.81", td: "T.D. ATF-147, 48 FR 45239, 4 October 1983", am: "T.D. ATF-249 (1987)", facts: [["Elevation", "About 450 to 760 m"]], place: "Cooler than the Shenandoah Valley floor.", glass: "Old-vine Zinfandel.", exam: "Eschen Vineyard.", producers: ["Easton (Eschen Vineyard)"] });
APXF["us-north-yuba"] = sf({ lede: "A small, high foothill AVA in Yuba County created around Renaissance Vineyard.", rec: "July 1985", cfr: "9.106", td: "T.D. ATF-211, 50 FR 30820, 30 July 1985", facts: [["County", "Yuba"]], place: "Terraced hillside vineyards.", glass: "Long-aged Cabernet and Sauvignon Blanc.", exam: "Renaissance.", producers: ["Renaissance Vineyard"] });
})();
