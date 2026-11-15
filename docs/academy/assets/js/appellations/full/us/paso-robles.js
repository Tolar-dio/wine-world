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

// HISTORY-PASS-START
const PDS=`<p>All eleven Paso districts came out of one effort. In 2007 the Paso Robles AVA Committee, 59 vintners and growers farming more than 10,000 acres, working with the Paso Robles Wine Country Alliance, filed what was then the largest AVA proposal TTB had ever received. Their argument: a 614,000-acre AVA running from the cool, limestone west to the hot, dry east told a buyer almost nothing. Justin Smith of Saxum put it plainly: "Paso was just too huge and diverse." A rival Paso Robles Westside petition was rejected in 2009, TTB's proposal appeared only in 2013, nearly seven years after filing, and the final rule came on 9 October 2014. A California law signed in 2007 requires every district label to say Paso Robles too, so the brand built since 1983 travels with each new name.</p>`;
const PDSRC=[["Federal Register, 9 Oct 2014: Establishment of the eleven Paso Robles districts","https://www.federalregister.gov/documents/2014/10/09/2014-24169/establishment-of-the-adelaida-district-creston-district-el-pomar-district-paso-robles-estrella"],["Wine Spectator, 2014: Will breaking up be good for Paso Robles?","https://www.winespectator.com/articles/will-breaking-up-be-good-for-paso-robles-50667"]];
const HX={
"us-paso-robles":[`<p>Mission San Miguel had a vineyard by the early 1800s. Adolph Siot planted near Templeton in 1856, Andrew York founded a winery west of town in 1882, and the pianist Ignace Paderewski planted Zinfandel on his ranch in 1914. Zinfandel arrived with Italian and Swiss families in the early twentieth century.</p><p>The AVA petition, a letter dated 26 July 1982 on Martin Brothers Winery letterhead, called itself a "joint and collaborative effort" of 14 wineries and growers farming more than 3,800 acres, with near-unanimous support. ATF approved it in 1983, when there were only five bonded wineries and under 5,000 acres of vines. The growers drew it huge on purpose, so that no one was left out; it was expanded again in 1996 and 2009. The Perrins of Beaucastel founded Tablas Creek in 1989 and imported Rhône cuttings, seeding the Rhône Ranger movement, and by 2014 Paso had more than 200 wineries and 32,000 acres of vines, which is why the giant AVA eventually had to be divided.</p>`,[["Paso Robles Wine History Project: Paso Robles AVA","https://winehistoryproject.org/paso-robles-ava"]]],
"us-adelaida-district":[`<p>The area was first known as Las Tablas, after the Arroyo de las Tablas that drains it; the name Adelaida came from a post office opened in 1877. In the 1980s it drew Paso's pioneers of limestone hillsides: Justin planted 72 acres in 1982, Carmody McKnight in 1985, and Tablas Creek, founded by the Perrins of Beaucastel with importer Robert Haas, in 1989, choosing the site for its calcareous soil.</p>`+PDS,PDSRC],
"us-creston-district":[`<p>In 1884 a settler named Cressey laid out a nine-block town and called it Huer Huero after the Spanish land grant. The residents ignored the official name and called it Creston in his honor. A Creston school district existed by 1885, and a 1917 county history describes farmers "in the Creston district." Vineyards date to at least the late 1800s on the old Huerhuero grant.</p>`+PDS,PDSRC],
"us-el-pomar-district":[`<p>"El Pomar" means the orchard. In 1886 Gerd Klintworth planted a vineyard at what is now Red Head Ranch, and by the 1920s the Paso Robles Press was praising the area's grapes. Large modern plantings followed: J. Lohr's 200 acres at Creston and Neal Springs roads and Gallo's 650-acre Sunnybrook Vineyard in the late 1990s. During the district process one grower argued his land belonged in Templeton Gap instead; TTB refused because he offered no soil or climate data.</p>`+PDS,PDSRC],
"us-paso-robles-estrella-district":[`<p>The town of Estrella was founded in 1886, and an 1887 county map labels the "Estrella Valley." The name carries a piece of American wine history: the Estrella clone of Syrah, one of the earliest and most widely planted in California, comes from Estrella River Winery, which planted Syrah in 1975 from cuttings traced to the Rhône. The name nearly caused a trademark fight: Bronco Wine, which owns the Estrella River and Estrella brands, persuaded TTB not to treat the single word "Estrella" as protected, only "Paso Robles Estrella."</p>`+PDS,PDSRC],
"us-paso-robles-geneseo-district":[`<p>The district, named for the Geneseo area and its road east of Paso Robles, sits on uplifted hills and river terraces along the Huerhuero-La Panza fault between 740 and 1,300 feet. TTB protected both "Paso Robles Geneseo District" and the shorter "Paso Robles Geneseo."</p>`+PDS,PDSRC],
"us-paso-robles-highlands-district":[`<p>The highest and most continental of the eastern districts, on an old erosional surface below the La Panza Range at 1,160 to 2,086 feet, with day-night swings of 50 degrees or more and about 12 inches of rain.</p>`+PDS,PDSRC],
"us-paso-robles-willow-creek-district":[`<p>Named for Willow Creek, west of Paso Robles, this is the coolest and wettest of the districts, with 24 to 30 inches of rain on calcareous Monterey Formation slopes at 960 to 1,900 feet.</p>`+PDS,PDSRC],
"us-san-juan-creek":[`<p>In 1971 Darryl John moved to Shandon and planted the San Juan Vineyard for Louie Lucas of Lucas & Lewellen, one of the early large plantings in the far east of the county. The district follows San Juan Creek through flat, dry alluvial land, the hottest and most continental corner of Paso.</p>`+PDS,PDSRC],
"us-san-miguel-district":[`<p>Mission San Miguel Arcángel planted the first vines in what is now the Paso Robles AVA and had a 19-acre vineyard by the early 1800s. In the 1980s David Caparone researched clones and microclimates and planted one of California's first Nebbiolo vineyards here.</p>`+PDS,PDSRC],
"us-santa-margarita-ranch":[`<p>Franciscan missionaries first grew wine grapes here around 1780 at the Asistencia of Mission San Luis Obispo. A head-pruned vineyard followed in the 1800s, then a century of wheat, barley and cattle. Robert Mondavi leased more than 1,000 acres for vineyards in the 2000s. Unusually, the AVA is essentially one historic ranch. The petition acknowledged the name was also used by a Temecula winery and resembled the Italian brand Santa Margherita.</p>`+PDS,PDSRC],
"us-templeton-gap-district":[`<p>Adolph Siot, a Frenchman, planted a vineyard along what is now Vineyard Drive in 1856 and opened a winery in 1890. The Rotta family bought it in 1908, and the Pesenti winery followed. Rotta later closed and was revived by a family descendant, and Pesenti became Turley Wine Cellars. The petition drew the boundary to include these founding wineries, Mastantuono and Wild Horse, all shaped by the marine air that pours through the Templeton Gap in the Santa Lucia range.</p>`+PDS,PDSRC]
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
// HISTORY-PASS-END
})();
