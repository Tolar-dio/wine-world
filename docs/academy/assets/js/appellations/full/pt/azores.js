// Full encyclopedia entries: Azores (Pico, Biscoitos, Graciosa, IG Açores). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function az(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const AZU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const AZCVR=["Comissão Vitivinícola Regional dos Açores","https://www.cvracores.pt/"];
const AZAM="IVV copy published February 2026";
const AZGR="At least 85% Arinto dos Açores (Terrantez da Terceira), Verdelho and Terrantez do Pico";
const AZRULE="The three Azores DOs share a structure: at least 85% of the must from the three principal white grapes, Arinto dos Açores, Verdelho and Terrantez do Pico; vines trained on the ground, as gobelet or cordon; 70 hl/ha; licoroso aged at least 36 months before bottling.";

APXF["pt-pico"] = az({
  lede: "Black basalt lava fields at the foot of Portugal's highest mountain, divided into thousands of tiny walled currais that shelter Verdelho, Arinto dos Açores and Terrantez do Pico from salt wind: a UNESCO landscape since 2004.",
  cat: "DO (DOP): wine, sparkling, vinho licoroso and wine from overripe grapes", rec: "DO; vineyard landscape UNESCO World Heritage 2004",
  src: ["Caderno de especificações DO Pico (IVV copy)", AZU+"DO_Pico.pdf"], sources: [AZCVR], amended: AZAM,
  facts: [["Area", "Madalena; Santa Luzia and Baía de Canas (São Roque); Engrade and Manhenha (Lajes); all at or below 100 m"], ["Grapes", AZGR], ["Minimum alcohol", "Wine 11%; licoroso 16%; sparkling 11.5%; overripe-grape wine 12%"], ["Natural alcohol", "Wine 10%; sparkling base 9%; licoroso 12%; overripe 15%"], ["Ageing", "Licoroso and overripe-grape wine at least 36 months before bottling"], ["Yield", "70 hl/ha"], ["Soils", "Thin lithosols over recent basalt lava; lajido lava sheets"]],
  place: "Pico, in the central group of the Azores, is the youngest and most mountainous island, crowned by Mount Pico at 2,351 m, the highest point in Portugal and on the Mid-Atlantic Ridge. The mountain causes a rain shadow, so vineyards concentrate on the drier west flank. The coastal climate is temperate (Köppen Csb), with mild, dry summers below 22°C on average. Relative humidity is lower than on the other islands, and the lava sheets store heat so nights stay warm and dry. Soils are barely formed, stony and shallow; on the lajido, vines root into cracks in solid lava. Only land at or below 100 m qualifies.",
  rules: AZRULE + " Pico adds a category for wine from overripe grapes, made from sun-shrivelled fruit on the hottest lava sites, which needs 15% natural potential alcohol.",
  history: "Settlers brought vines in 1460. The caderno credits islanders with turning unproductive stone into a livelihood by building a vast network of dry-stone walls: the currais, small plots that store the cleared rocks and break the wind. Pico's fortified Verdelho was shipped widely in the eighteenth and nineteenth centuries before oidium and phylloxera ruined the vineyards. UNESCO recognized the landscape in 2004, and the replanting since has revived dry whites.",
  glass: "Dry whites are tense, saline and mineral, with citrus, stone fruit and a smoky, volcanic edge; Arinto dos Açores is sharp and lemony, Verdelho riper, Terrantez do Pico aromatic and rare. Licorosos range from dry to sweet, with dried fruit, honey, caramel and salinity after barrel age.",
  exam: "Currais; lajido; UNESCO 2004; Arinto dos Açores, Verdelho, Terrantez do Pico; 100 m limit; licoroso 36 months.",
  producers: ["Azores Wine Company", "Cooperativa Vitivinícola da Ilha do Pico (Picowines)", "Czar", "Curral Atlantis"]
});

APXF["pt-biscoitos"] = az({
  lede: "A single parish on the north coast of Terceira, named for its biscuit-hard black basalt, famous for traditional fortified Verdelho.",
  cat: "DO (DOP): wine, sparkling, vinho licoroso and wine from overripe grapes", rec: "DO",
  src: ["Caderno de especificações DO Biscoitos (IVV copy)", AZU+"DO_Biscoitos.pdf"], sources: [AZCVR], amended: AZAM,
  facts: [["Area", "Parish of Biscoitos (Praia da Vitória), at or below 100 m"], ["Grapes", AZGR], ["Minimum alcohol", "Wine 11%; licoroso 16%; sparkling 11.5%; overripe-grape wine 12%"], ["Ageing", "Licoroso and overripe-grape wine at least 36 months"], ["Yield", "70 hl/ha"], ["Soils", "Lithosols over basalt, andesite and trachyte lava"]],
  place: "Terceira's north shore. The caderno explains the name: the black basalt reminded settlers of the hard, twice-baked ship's biscuit carried on voyages of discovery. The climate is temperate maritime, 16 to 26°C in summer, with Gulf Stream warmth, about 79% humidity and rain all year. Vines grow in stone-walled plots (curraletas) on the lava.",
  rules: AZRULE,
  glass: "Fortified Verdelho, dry to medium-dry, with stone fruit, honey, caramel, spice and salty acidity; dry whites are tense and saline.",
  exam: "Terceira; biscuit-like basalt; fortified Verdelho; Museu do Vinho dos Biscoitos.",
  producers: ["Casa Agrícola Brum (Museu do Vinho dos Biscoitos)"]
});

APXF["pt-graciosa"] = az({
  lede: "The 'gracious' low island of the central Azores, with a DO for white, sparkling and fortified wine from vineyards below 150 m.",
  cat: "DO (DOP): wine, sparkling and vinho licoroso", rec: "DO",
  src: ["Caderno de especificações DO Graciosa (IVV copy, PDO-PT-A1446)", AZU+"DO_Graciosa.pdf"], sources: [AZCVR], amended: AZAM,
  facts: [["Area", "Santa Cruz da Graciosa (Santa Cruz, Guadalupe, Praia, Luz) at or below 150 m"], ["Grapes", AZGR], ["Minimum alcohol", "Wine 10.5%; licoroso 16%; sparkling 11.5%"], ["Ageing", "Licoroso at least 36 months"], ["Yield", "70 hl/ha"], ["Soils", "Thin andic brown soils and regosols on basalt and pyroclastic material"]],
  place: "Graciosa is the flattest and driest of the central islands, with less relief to catch rain. Soils are shallow volcanic material over basalt.",
  rules: AZRULE + " Graciosa has no overripe-grape category and a slightly lower minimum alcohol for still wine.",
  glass: "Light, fresh, saline whites; sparkling with marked acidity; fortified wines dry to medium-sweet.",
  exam: "Lowest-lying Azores island; 150 m limit; 10.5% minimum.",
  producers: []
});

APXF["pt-acores"] = az({
  lede: "The regional wine of all nine Azores islands, covering reds and rosés as well as whites, sparkling and licoroso.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling and licoroso", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Açores (IVV copy)", AZU+"IG_Acores.pdf"], sources: [AZCVR], amended: AZAM,
  facts: [["Minimum alcohol", "Wine 11%; licoroso 16%; sparkling 11%"], ["Natural alcohol", "10%; sparkling base 9%; licoroso 10%"], ["Soils", "Lithosols on basalt; thin andic brown soils"], ["Area", "The whole archipelago"]],
  place: "Covers vineyards across the islands, including São Miguel and Terceira beyond the DO parishes, and higher land than the DOs permit.",
  rules: "Wider grape list and altitude freedom. Used for red and rosé wines and for whites from outside the DO zones.",
  glass: "Saline, fresh whites and light, high-acid reds.",
  exam: "Açores IGP; the only Azores label for reds.",
  producers: ["Azores Wine Company", "Picowines"]
});
