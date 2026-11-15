// Full encyclopedia entries: Alentejo DO, its eight subregions and IG Alentejano. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function al(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const ALSRC=["Caderno de especificações DO Alentejo (IVV copy)","https://www.ivv.gov.pt/wp-content/uploads/2026/02/DO_Alentejo.pdf"];
const ALCVR=["Comissão Vitivinícola Regional Alentejana (Vinhos do Alentejo)","https://www.vinhosdoalentejo.pt/"];
const ALSUB="Subregion wines follow all DO Alentejo rules: red and rosé at least 12%, white 11.5%; yields 8,500 kg/ha (65 hl) red and 10,000 kg/ha (75 hl) white; low-trained, single-crop vineyards; alluvial, colluvial and black or red-brown non-calcareous clay soils excluded.";
function asub(o){return al(Object.assign({cat:"Subregion of DO Alentejo (DOP)",src:ALSRC,sources:[ALCVR],amended:"IVV copy published February 2026"},o));}

APXF["pt-alentejo"] = al({
  lede: "Southern Portugal's plains of cork oak, olive and wheat, where 3,000 hours of sun give ripe, generous reds from Aragonez, Trincadeira and Alicante Bouschet, whites from Antão Vaz and Roupeiro, and a surviving Roman tradition of fermenting in clay talhas.",
  cat: "DO (DOP): wine, quality sparkling and vinho licoroso", rec: "First Alentejo DOs regulated 1988; single DO with eight subregions under Decreto-Lei 53/2003",
  src: ALSRC, sources: [ALCVR], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "Red and rosé 12%; white 11.5%; sparkling 11%; licoroso 17.5%"], ["Natural alcohol", "Red 12%; white 11.5%; sparkling base 9.5%; licoroso 12%"], ["Yields", "Red 8,500 kg/ha or 65 hl/ha; white 10,000 kg/ha or 75 hl/ha"], ["Training", "Low, single-crop vineyards; cordon, guyot or gobelet"], ["Sparkling", "Traditional method"], ["Climate", "Mean 15.5 to 16°C; about 3,000 sunshine hours; 550 to 650 mm rain (Borba 750 to 850, Portalegre 900 to 1,000)"], ["Subregions", "Borba, Évora, Granja-Amareleja, Moura, Portalegre, Redondo, Reguengos, Vidigueira"], ["Labelling", "Labels approved before sale; brand compulsory; exports only bottled"]],
  place: "A vast, mostly flat region covering the districts of Portalegre, Évora and Beja. With no mountains to make the sea air condense, Atlantic influence is weak, and the climate is Mediterranean and continental: hot, dry springs and summers, rain in winter. The few relief features, the Serra de São Mamede in the north, the Serra d'Ossa in the centre and the Vidigueira fault scarp in the south, set the subregions apart. Soils vary sharply: granite at Portalegre, marble-derived crystalline limestone at Borba, quartz-diorite at Redondo and Reguengos, schist and clay-limestone farther south.",
  rules: "The caderno sets high alcohol minimums that match the climate and excludes fertile alluvial and heavy clay soils. Varieties and blending percentages are set in a separate regional regulation. Quality terms (Reserva, Garrafeira, Colheita Selecionada and others) need a higher tasting score. Bulk export of DO wine is banned to protect traceability. The CVRA also certifies Vinho de Talha, wine fermented and kept on its skins in clay amphorae.",
  history: "The caderno traces Alentejo winemaking to Phoenicians and Romans, citing the survival of talha and amphora fermentation, and records growth after the Reconquista from 1143 and a peak in the late seventeenth century with the English trade. Wheat campaigns in the twentieth century pushed vines aside. In 1988 the first Alentejo DOs were regulated and in 1989 the CVRA was founded. Cooperatives and new estates such as Esporão and Cartuxa made Alentejo Portugal's best-selling region at home from the 1990s.",
  glass: "Reds are ripe and round: plum, blackberry, spice and sometimes herbs, with soft tannins; Alicante Bouschet gives depth and colour, Trincadeira spice and acidity, Aragonez body. Whites from Antão Vaz, Roupeiro and Arinto are full, with tropical and citrus fruit; Portalegre and Vidigueira make the freshest. Talha wines are rustic, savoury and often amber in white versions.",
  exam: "Eight subregions; 12% minimum red; 3,000 sun hours; talha; CVRA 1989; Alicante Bouschet (Mouchão); Antão Vaz.",
  producers: ["Herdade do Mouchão", "Herdade do Esporão", "Fundação Eugénio de Almeida (Cartuxa, Pêra-Manca)", "Quinta do Mouro", "Tapada de Coelheiros", "Herdade do Rocim", "Herdade dos Grous", "Herdade do Peso (Sogrape)", "Susana Esteban", "José de Sousa (José Maria da Fonseca)", "Adega de Borba", "CARMIM"]
});

APXF["pt-borba"] = asub({
  lede: "Marble country between Estremoz and Vila Viçosa, where vines grow on soils derived from crystalline limestone and rainfall is higher than on the southern plains.",
  rec: "Subregion of DO Alentejo (first Alentejo DOs 1988)",
  facts: [["Area", "Between the Serra d'Ossa and the Estremoz and Vila Viçosa marble belt; parts of Estremoz, Borba, Vila Viçosa and Alandroal"], ["Soils", "Mainly derived from crystalline limestone (marble); patches of red schist"], ["Rainfall", "750 to 850 mm"]],
  place: "North-east of the Serra d'Ossa, in the anticline where Portugal quarries its famous marble. Soils derived from crystalline limestone hold water better than the southern schists, and rainfall is higher, so wines keep more freshness.",
  rules: ALSUB,
  glass: "Fresh, structured reds of Aragonez, Trincadeira and Alicante Bouschet; Roupeiro and Arinto whites with good acidity.",
  exam: "Marble-derived soils; Estremoz; Adega de Borba.",
  producers: ["Adega de Borba", "Quinta do Mouro", "Quinta do Carmo"]
});

APXF["pt-evora"] = asub({
  lede: "The rolling country around the walled city of Évora, home of Cartuxa and its legendary Pêra-Manca.",
  rec: "Subregion of DO Alentejo",
  facts: [["Area", "Around Évora, bounded by the Degebe and Xarrama rivers; plus Nossa Senhora da Vila in Montemor-o-Novo"], ["Soils", "Brown and red Mediterranean soils on non-calcareous material; lithosols"]],
  place: "A gently undulating plain around Évora with granite and schist-derived soils, hot summers and moderate rainfall.",
  rules: ALSUB,
  history: "Pêra-Manca, a name recorded for Évora wine since the Middle Ages, was revived by the Fundação Eugénio de Almeida, whose cellar is the old Jesuit Cartuxa.",
  glass: "Elegant, long-lived reds of Aragonez and Trincadeira; whites from Antão Vaz, Arinto and Roupeiro.",
  exam: "Cartuxa; Pêra-Manca; Évora.",
  producers: ["Fundação Eugénio de Almeida (Cartuxa, Pêra-Manca)", "Tapada de Coelheiros"]
});

APXF["pt-granja-amareleja"] = asub({
  lede: "Portugal's hottest wine country, on the Spanish border east of the Guadiana, where Moreto and Trincadeira survive on thin schist.",
  rec: "Subregion of DO Alentejo",
  facts: [["Area", "All of Mourão (Mourão, Granja, Luz); parishes of Amareleja and Póvoa de São Miguel in Moura"], ["Soils", "Brown and red Mediterranean soils; calcareous red soils; lithosols"]],
  place: "East of the Guadiana and the Alqueva reservoir. Amareleja regularly records some of the highest temperatures in Portugal. Poor, stony soils and drought keep yields very low; many old vines are bush-trained.",
  rules: ALSUB,
  glass: "Ripe, high-alcohol reds with dark fruit and earthy, roasted notes; Moreto gives soft, light-coloured wine.",
  exam: "Hottest subregion; Moreto; Mourão.",
  producers: []
});

APXF["pt-moura"] = asub({
  lede: "A small, hot subregion south of the Ardila around the town of Moura, on clay-limestone soils that keep water through the drought.",
  rec: "Subregion of DO Alentejo",
  facts: [["Area", "Between the Guadiana, the Ardila and the Toutalga stream; parishes around Moura"], ["Soils", "Brown and red calcareous soils; calcareous clays (barros)"]],
  place: "Hot and dry, but the calcareous clays hold water and temper the stress. Traditional varieties include Castelão, Moreto and Trincadeira.",
  rules: ALSUB,
  glass: "Soft, ripe reds; full whites from Antão Vaz and Roupeiro.",
  exam: "Clay-limestone soils; Moura.",
  producers: []
});

APXF["pt-portalegre"] = asub({
  lede: "The cool, high northern exception in the Alentejo: granite slopes of the Serra de São Mamede with old field blends, 900 to 1,000 mm of rain and vineyards up to 700 m.",
  rec: "Subregion of DO Alentejo (first Alentejo DOs 1988)",
  facts: [["Area", "Around Portalegre, north of the Elvas to Torre das Vargens railway"], ["Soils", "Mainly granite; patches of schist and quartzite"], ["Altitude cap", "Land above 700 m excluded"], ["Rainfall", "900 to 1,000 mm"]],
  place: "On the flanks of the Serra de São Mamede near the Spanish border. Altitude, chestnut and oak woods and much higher rainfall make it markedly fresher than the plains. Old mixed vineyards of Grand Noir, Trincadeira, Aragonez and white grapes survive.",
  rules: ALSUB + " Portalegre adds an altitude limit: land above 700 m is excluded.",
  glass: "Fresh, mineral, often lower-alcohol reds and whites; old field blends give complex, perfumed wines.",
  exam: "Serra de São Mamede; granite; wettest subregion; 700 m limit.",
  producers: ["Tapada do Chaves", "Quinta da Fonte Souto (Symington)", "Susana Esteban", "Rui Reguinga"]
});

APXF["pt-redondo"] = asub({
  lede: "Sheltered by the Serra d'Ossa to the north, Redondo grows mostly red grapes on quartz-diorite soils.",
  rec: "Subregion of DO Alentejo (first Alentejo DOs 1988)",
  facts: [["Area", "South of the Serra d'Ossa, between the Vale Figueira, Montoito and Pardiela streams"], ["Soils", "Derived from eruptive rock, especially quartz-diorite; patches of red schist"]],
  place: "The Serra d'Ossa shields the subregion from northern winds and gives a natural amphitheatre facing south. Hot, dry summers.",
  rules: ALSUB,
  glass: "Ripe, rounded reds of Aragonez, Trincadeira and Alicante Bouschet.",
  exam: "Serra d'Ossa; quartz-diorite; cooperative of Redondo.",
  producers: ["Adega Cooperativa de Redondo"]
});

APXF["pt-reguengos"] = asub({
  lede: "The largest-volume subregion, between the Degebe and the Guadiana, home to Esporão and the CARMIM cooperative.",
  rec: "Subregion of DO Alentejo (first Alentejo DOs 1988)",
  facts: [["Area", "From the Vigia reservoir to the Guadiana; west to the clay belt from Vendinha to Montoito"], ["Soils", "Derived from eruptive rock (quartz-diorite); some schist; a small area of rañas"]],
  place: "Hot and dry, with very hot summers, on granite-like eruptive soils and schist. The Alqueva reservoir now borders it to the east.",
  rules: ALSUB,
  history: "José de Sousa at Reguengos keeps one of the largest collections of talhas still in use.",
  glass: "Generous reds with ripe dark fruit; Esporão's range shows the subregion from everyday to reserva.",
  exam: "Esporão; CARMIM; José de Sousa talhas.",
  producers: ["Herdade do Esporão", "CARMIM", "José de Sousa (José Maria da Fonseca)"]
});

APXF["pt-vidigueira"] = asub({
  lede: "The southern subregion of Vidigueira, Cuba and Alvito, where a fault scarp lets cooler air in and white wine, above all Antão Vaz, and talha winemaking are the specialities.",
  rec: "Subregion of DO Alentejo",
  facts: [["Area", "The municipalities of Alvito, Cuba and Vidigueira"], ["Soils", "Varied, mainly eruptive or metamorphic"]],
  place: "The Vidigueira fault, an east-west escarpment, separates the subregion from the lower plains and channels air that keeps nights cooler than the latitude suggests. Antão Vaz is thought to originate here.",
  rules: ALSUB,
  glass: "Full, tropical, fresh Antão Vaz whites; traditional talha wines from Vila de Frades.",
  exam: "Antão Vaz; Vila de Frades talha; Cuba and Alvito.",
  producers: ["Herdade do Rocim", "Herdade do Peso (Sogrape)", "Adega Cooperativa de Vidigueira, Cuba e Alvito", "Quinta do Quetzal", "Honrado"]
});

APXF["pt-alentejano"] = al({
  lede: "The regional wine of the whole Alentejo, the most-used label in the region, with lower alcohol minimums, higher yields and freedom to use international varieties.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling, licoroso, late harvest", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Alentejano (IVV copy)", "https://www.ivv.gov.pt/wp-content/uploads/2026/02/IG_Alentejano.pdf"], sources: [ALCVR], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "11% for red, rosé, white and sparkling; licoroso 17.5%"], ["Yield", "15,000 kg/ha"], ["Area", "All municipalities of the Beja, Évora and Portalegre districts"], ["Sparkling", "Traditional method"]],
  place: "Covers far more land than the DO, including the coastal Alentejo and areas outside the subregions. The caderno lists soils district by district, from granite and schist in Portalegre to clays and calcareous barros in Beja.",
  rules: "Much freer than the DO, which is why most leading estates release flagship wines as Alentejano: they can blend Syrah, Cabernet, Touriga Nacional or Alicante Bouschet in any proportion and plant outside the subregions.",
  glass: "From simple fruity reds to some of the region's most expensive wines.",
  exam: "IGP name is Alentejano; 15,000 kg/ha; three districts.",
  producers: ["Herdade do Esporão", "Herdade dos Grous", "Herdade do Rocim"]
});
