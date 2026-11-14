// Full encyclopedia entries: Piedmont. Written from each disciplinare di produzione (AIS copies of the
// official texts, checked against later amendments where noted).
const PMD = "https://aisitalia.it/Disciplinari/Piemonte/";
function pmSrc(d) {
  return ["Disciplinare di produzione (AIS copy of the official text)", PMD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"];
}
function pm(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [pmSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const PM_DOGL_NOTE = ["Piedmont notice of a labelling amendment to eight DOCGs, 2025 (shows the Dogliani unit list)", "https://www.regione.piemonte.it/governo/bollettino/abbonati/2025/38/attach/aa_aa_regione%20piemonte%20-%20comunicato_2025-09-11_96753.pdf"];
function pmDogl(name, whole) {
  return pm({
    lede: `${name} is one of the 21 communes of the Dogliani DOCG, not an appellation of its own. Its name can be added to the label as a unità geografica aggiuntiva, written 'del comune di ${name}'.`,
    cat: "Commune within the Dogliani DOCG (red, Dolcetto)", rec: "Part of the Dogliani zone since the DOC of 1974",
    facts: [["Parent appellation", "Dogliani DOCG"], ["Share of the commune in the zone", whole ? "The whole commune" : "Part of the commune, inside the boundary line drawn in Article 3"], ["Grape", "Dolcetto"]],
    place: `${name} lies in the Dogliani zone, the Dolcetto country of the southern Langhe between the Tanaro and the Rea and Belbo valleys, where the hills climb towards the Alta Langa and vineyards may go up to 800 m.`,
    rules: "Every rule of Dogliani applies: Dolcetto only; 8 t/ha for Dogliani and 7 t/ha for Superiore; Superiore aged 12 months from 15 October and released from 1 November of the year after the harvest. The current specification lists the communes in Part A of its annex of additional geographic units; a commune name must be preceded by 'del comune di'. A 'vigna' name may only be used together with an additional geographic unit, and only by producers who both make and bottle the wine.",
    glass: "Dogliani Dolcetto: deep purple, black cherry and almond, with firm, slightly bitter tannin; the Superiore is fuller and needs a year or two.",
    exam: `Treat ${name} as a label term inside Dogliani, the way 'del comune di Barolo' works inside Barolo. It is not a DOC or DOCG.`,
    sources: [pmSrc("DOCG/Dogliani"), PM_DOGL_NOTE]
  });
}
const PM_ROERO_REG = ["Commission Implementing Regulation (EU) 2022/2044 amending the Roero specification (additional geographic units)", "https://eur-lex.europa.eu/eli/reg_impl/2022/2044/oj"];
function pmRoero(name, whole) {
  return pm({
    lede: `${name} is one of the 18 commune names that may follow 'Roero' on a label as a unità geografica aggiuntiva. It is part of the Roero DOCG, not a separate appellation.`,
    cat: "Commune within the Roero DOCG (Nebbiolo red, Arneis white)", rec: "Commune unit added to the Roero specification by Regulation (EU) 2022/2044",
    facts: [["Parent appellation", "Roero DOCG"], ["Share of the commune in the zone", whole ? "The whole commune" : "Part of the commune, inside the boundary in Article 3"], ["Grapes", "Nebbiolo at least 95% (red); Arneis at least 95% (white)"]],
    place: `${name} lies in the Roero, on the left bank of the Tanaro opposite the Langhe, where the hills are young marine sands and clays cut by the eroded cliffs called rocche.`,
    rules: "All Roero rules apply. Red Roero: 8 t/ha, at least 20 months of ageing including 6 in wood, released from 1 July of the second year after the harvest (Riserva 32 months, 6 in wood). White Roero (Arneis): 10 t/ha; with an additional geographic unit it must age 4 months from 1 November and is released from 1 March of the following year. Besides the 18 commune names, the specification lists 133 smaller localities as additional units.",
    glass: "Roero red is lighter and more aromatic than Barolo, with red fruit, roses and fine tannin from the sandier soils; Roero Arneis is pear, white flowers and almond with gentle acidity.",
    exam: `${name} is a Roero additional geographic unit (UGA), introduced in 2022. Castellinaldo, although partly in the Roero zone, is not on the list of commune units.`,
    sources: [pmSrc("DOCG/Roero"), PM_ROERO_REG]
  });
}

// ---------- DOCG ----------
APXF["it-barolo"] = pm({
  lede: "Nebbiolo from eleven communes south-west of Alba, aged at least 38 months: Italy's most studied red, mapped into 181 official vineyard and commune names.",
  cat: "DOCG, red", rec: "DOC 1966; DOCG 1980 (first DOCG vintages with Brunello and Vino Nobile)", d: "DOCG/Barolo",
  amended: "Text as amended by DM 17 April 2015",
  facts: [["Communes", "All of Barolo, Castiglione Falletto and Serralunga d'Alba; parts of Monforte d'Alba, Novello, La Morra, Verduno, Grinzane Cavour, Diano d'Alba, Cherasco and Roddi"], ["Grape", "Nebbiolo 100%"], ["Yield", "8 t/ha; 7.2 t/ha with an MGA plus 'vigna'"], ["Minimum natural alcohol", "12.5%; 13% with MGA plus vigna. Total alcohol at release at least 13%"], ["Grape to wine", "70% (56 hl/ha); 68% (54.4 hl/ha) after ageing"], ["Ageing", "38 months including 18 in wood, counted from 1 November of the harvest year; Riserva 62 months including 18 in wood"], ["Release", "1 January of the fourth year after the harvest; Riserva the sixth"], ["MGA", "181: 170 named sites plus 11 'del comune di' commune names"], ["Vineyards", "Hill sites only, at least 170 m"]],
  place: "The zone is a horseshoe of hills drained by the Talloria stream, between the Tanaro to the north and the Alta Langa to the south. Two marine formations shape it: on the western side (La Morra, Barolo, Verduno) the younger Tortonian blue-grey marls of the Sant'Agata Fossili formation give perfumed, earlier-drinking wines; on the eastern side (Serralunga, Monforte, Castiglione Falletto) the older Serravallian Lequio formation and Diano sandstones give firmer, more tannic wines. Castiglione Falletto sits on the seam.",
  rules: "Nebbiolo only, from hillside vineyards with traditional training (Guyot on espalier is the norm). Vinification and the compulsory ageing must take place in the zone, with exceptions by Ministry authorisation for wineries in the partly included communes and for houses that already did so historically. The label may carry one MGA (menzione geografica aggiuntiva) from the official list; 'vigna' plus a name is allowed only inside an MGA, from vines at least seven years old, with lower yields. Blending in up to 15% of younger or older Barolo is allowed. In 2024 the consortium's growers backed a rule that Barolo and Barbaresco be bottled only inside the production area; the change still needed regional, ministerial and EU approval and is not in the text used here.",
  history: "Dry Barolo as we know it emerged in the mid-19th century, helped by the Falletti family, Camillo Cavour at Grinzane and the French oenologist Louis Oudart. The zone was first drawn in 1933. The MGA map was adopted in 2010, ending years of label disputes over names such as Cannubi.",
  glass: "Pale garnet that turns orange with age; rose, tar, cherry, liquorice and dried herbs; high acidity and high, drying tannin. Great years need 10 years or more.",
  exam: "Know the five core communes (La Morra, Barolo, Castiglione Falletto, Monforte, Serralunga), the Tortonian versus Serravallian split, 38/18 months and 62 months for Riserva, and that the 11 communes are themselves MGAs.",
  producers: ["Giacomo Conterno", "Bartolo Mascarello", "Giuseppe Rinaldi", "Giuseppe Mascarello e Figlio", "Cavallotto", "G.D. Vajra", "Vietti", "Elio Altare", "Paolo Scavino"]
});
APXF["it-barbaresco"] = pm({
  lede: "Nebbiolo from Barbaresco, Neive and Treiso, north-east of Alba: lower, warmer hills than Barolo, a shorter minimum ageing of 26 months and 66 official MGAs.",
  cat: "DOCG, red", rec: "DOC 1966; DOCG 1980", d: "DOCG/Barbaresco",
  amended: "Text as amended by DM 17 April 2015",
  facts: [["Communes", "All of Barbaresco, Neive and Treiso, and the part of San Rocco Seno d'Elvio once in Barbaresco and now in Alba"], ["Grape", "Nebbiolo 100%"], ["Yield", "8 t/ha; 7.2 t/ha with MGA plus vigna"], ["Minimum natural alcohol", "12%; 12.5% with MGA plus vigna. Total at release 12.5%"], ["Grape to wine", "70% (56 hl/ha); 68% (54.4 hl/ha) after ageing"], ["Ageing", "26 months including 9 in wood from 1 November; Riserva 50 months including 9 in wood"], ["Release", "1 January of the third year after the harvest; Riserva the fifth"], ["MGA", "66"], ["Vineyards", "Hills only, up to 550 m, no north faces; new plantings at least 3,500 vines/ha"]],
  place: "Barbaresco's hills rise from the Tanaro, which keeps them a little warmer and drier than Barolo and lets Nebbiolo ripen a few days earlier. Soils are mostly Tortonian marls (the grey-blue Sant'Agata marls) with sandier bands, especially in Neive and the higher Treiso sites.",
  rules: "Nebbiolo only; vinification and ageing in the zone, with Ministry exceptions for the commune of Alba and for historic wineries elsewhere in the provinces of Cuneo, Asti and Alessandria. One MGA per label; 'vigna' only within an MGA. In 2024 the consortium's growers approved bottling inside the area and sale in formats of 6 to 18 litres; those changes still needed regional, ministerial and EU approval and are not in the text used here.",
  history: "Domizio Cavazza, head of the Alba wine school, founded the first Barbaresco cooperative in 1894 and gave the wine its own name. The Produttori del Barbaresco (1958) and Angelo Gaja's single-vineyard bottlings from the 1960s built its reputation.",
  glass: "Similar perfume to Barolo, roses, red cherry, liquorice, but usually a little less tannic grip and earlier charm.",
  exam: "26/9 months (Riserva 50), three communes plus part of Alba, 66 MGAs. Common trap: Barbaresco's wood minimum is 9 months, Barolo's 18.",
  producers: ["Gaja", "Produttori del Barbaresco", "Bruno Giacosa", "Roagna", "Bruno Rocca", "Sottimano", "Albino Rocca"]
});
APXF["it-alta-langa"] = pm({
  lede: "Piedmont's traditional-method sparkling wine from Pinot Noir and Chardonnay grown at 250 m or higher in the hills south of Alba and Asti, aged at least 30 months on the lees.",
  cat: "DOCG, sparkling (white and rosé)", rec: "DOC 2002; DOCG 2011", d: "DOCG/Alta Langa",
  amended: "Text as amended by DM 13 October 2014",
  facts: [["Provinces", "Hill parcels in communes of Cuneo, Asti and Alessandria"], ["Grapes", "Pinot Noir and/or Chardonnay 90 to 100%; up to 10% other non-aromatic Piedmont varieties"], ["Method", "Second fermentation in bottle only (metodo classico)"], ["Yield", "11 t/ha; minimum natural alcohol 9.5%"], ["Time on lees", "At least 30 months; Riserva at least 36"], ["Vineyards", "Hills of marked aptitude, at least 250 m"], ["Total alcohol at release", "At least 11.5%"]],
  place: "The upper Langhe and neighbouring Monferrato and Roero hills, where altitude and cool nights keep acidity in Pinot Noir and Chardonnay. Growing and the base wine can be spread over a wide band of communes; making and ageing must happen in Piedmont.",
  rules: "Only bottle-fermented sparkling wine, white or rosé, each also as Riserva. The adjectives extra, fine, naturale, scelto, selezionato and vecchio are banned on labels.",
  history: "Piedmont's sparkling houses (Gancia made Italy's first metodo classico in 1865) relied for a century on Pinot Noir from Oltrepò Pavese. In the 1990s a group of houses planted experimental vineyards in the Alta Langa, leading to the DOC in 2002.",
  glass: "Fine bubbles, citrus, bread crust and red-apple fruit; the rosé adds red berries from Pinot Noir.",
  exam: "Know the 30 and 36 month lees minima, the 250 m altitude floor and that Alta Langa may only be traditional method.",
  producers: ["Enrico Serafino", "Ettore Germano", "Fontanafredda", "Coppo", "Gancia"]
});
APXF["it-asti"] = pm({
  lede: "The Moscato Bianco DOCG of south-east Piedmont, covering fully sparkling Asti and the gently frothy, low-alcohol Moscato d'Asti, made by stopping fermentation to keep the grape's sugar and scent.",
  cat: "DOCG, white sparkling and semi-sparkling, sweet", rec: "DOC 1967; DOCG 1993", d: "DOCG/Asti",
  amended: "Text as amended by DM 26 August 2024",
  facts: [["Provinces", "Communes of Asti, Cuneo and Alessandria"], ["Types", "Asti or Asti Spumante (tank or metodo classico); Moscato d'Asti; Moscato d'Asti vendemmia tardiva"], ["Subzones", "Santa Vittoria d'Alba and Strevi (Canelli left to become its own DOCG in 2023)"], ["Grape", "Moscato Bianco at least 97%; up to 3% other aromatic white varieties"], ["Yield", "10 t/ha (the Region may raise it by up to 20%, to a ceiling of 12 t/ha); vendemmia tardiva 6 t/ha"], ["Grape to wine", "75%; vendemmia tardiva 50%"], ["Alcohol", "Moscato d'Asti: total 11%, of which 4.5 to 6.5% fermented. Asti: total 11.5%, at least 6% fermented. Asti metodo classico: total 12%, at least 6% fermented. Vendemmia tardiva: total 14%, at least 11% fermented"], ["Making", "Tank (Martinotti) Asti: at least one month including bottle; metodo classico at least nine months on the lees"]],
  place: "Steep calcareous marl hills around Canelli, Santo Stefano Belbo and the Belbo, Bormida and Tinella valleys. Many Moscato slopes are too steep for machines; the hand-worked hills are part of the UNESCO 'Vineyard Landscape of Piedmont' site.",
  rules: "The must is chilled and stored, then fermented in pressure tanks in batches through the year; fermentation stops when the alcohol reaches the target, leaving most of the sugar. Moscato d'Asti is bottled with light pressure and a normal cork; Asti is fully sparkling. 'Vigna' with a site name is allowed for every type. Superiore, riserva, extra, fine, selezionato and gran are banned.",
  history: "Carlo Gancia brought Champagne methods to Canelli in the 1850s and turned Moscato into Moscato Champagne, later Asti Spumante. The 1993 DOCG united Asti and Moscato d'Asti under one name.",
  glass: "Grape, peach, orange blossom and sage; Moscato d'Asti at about 5% alcohol is softly frothy and sweet; Asti is fuller in bubble and alcohol.",
  exam: "Moscato d'Asti 4.5 to 6.5% actual alcohol, frizzante; Asti at least 6% actual, spumante. Both from the same DOCG, the same grape and the same zone. Canelli is now a separate DOCG.",
  producers: ["Paolo Saracco", "Vietti (Cascinetta)", "La Spinetta", "Ca' d'Gal", "G.D. Vajra"]
});
APXF["it-barbera-d-asti"] = pm({
  lede: "The largest Barbera DOCG, across the Asti and Alessandria hills, from fresh, unoaked wines to Superiore aged 14 months, with two subzones for longer-aged Superiore.",
  cat: "DOCG, red", rec: "DOC 1970; DOCG 2008 (from the 2008 vintage)", d: "DOCG/Barbera d'Asti",
  amended: "Text including the latest EU implementing regulation in the AIS copy",
  facts: [["Grapes", "Barbera at least 90%; up to 10% other non-aromatic red Piedmont varieties"], ["Yield", "9 t/ha; 8 t/ha with 'vigna'"], ["Minimum natural alcohol", "12%; Superiore and vigna 12.5%"], ["Grape to wine", "70% (6,300 l/ha)"], ["Ageing", "Barbera d'Asti 4 months from 1 November (vessel free); Superiore 14 months including 6 in wood"], ["Subzones", "Tinella and Colli Astiani or Astiano: Superiore only, 24 months from 1 October including at least 6 in wood"], ["Vineyards", "Hills up to 650 m"]],
  place: "The Monferrato hills of the province of Asti and part of Alessandria: calcareous marls and sands, with Barbera often on the warmest slopes. Nizza, the best-known area, left in 2014 to become its own DOCG.",
  rules: "Vinification and ageing in the zone. Vintage compulsory. Topping up with up to 10% of the same wine from other vessels is allowed during the compulsory ageing.",
  history: "Barbera has been the everyday red of the Asti hills since at least the 18th century. Giacomo Bologna of Braida showed in the 1980s that barrique-aged Barbera (Bricco dell'Uccellone, 1982) could compete with any red, and the DOCG followed in 2008.",
  glass: "Deep ruby, sour cherry and plum, high acidity and low tannin; Superiore adds oak spice and weight.",
  exam: "Barbera at least 90%. Subzones Tinella and Colli Astiani; Nizza is now separate. Superiore 14 months with 6 in wood.",
  producers: ["Braida", "Michele Chiarlo", "Vietti (La Crena)", "Tenuta Olim Bauda", "Scarpa", "Coppo"]
});
APXF["it-barbera-del-monferrato-superiore"] = pm({
  lede: "The aged, higher-ripeness Barbera of the Monferrato, separated from the Barbera del Monferrato DOC in 2008: 14 months of ageing including 6 in oak.",
  cat: "DOCG, red", rec: "DOCG 2008 (the Superiore of the 1970 DOC)", d: "DOCG/Barbera del Monferrato Superiore",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grapes", "Barbera at least 85%; Freisa, Grignolino and Dolcetto up to 15%"], ["Yield", "9 t/ha; minimum natural alcohol 12.5%"], ["Grape to wine", "70% (6,300 l/ha)"], ["Ageing", "14 months from 1 November including at least 6 in oak barrels of any size"], ["Total alcohol at release", "13%"], ["Vineyards", "Hills up to 650 m"]],
  place: "The hills of the Monferrato in the provinces of Alessandria and Asti, from the Alto Monferrato around Acqui and Ovada to the Casalese north of the Tanaro.",
  rules: "Same zone and blend as the Barbera del Monferrato DOC, but riper fruit and compulsory oak ageing. 'Vigna' allowed with 13% natural alcohol.",
  glass: "Dark cherry and plum with oak spice, firm acidity.",
  exam: "Do not confuse it with Barbera d'Asti DOCG: different zone, 85% rather than 90% Barbera, oak compulsory.",
  producers: []
});
APXF["it-brachetto-d-acqui"] = pm({
  lede: "Sweet, aromatic red from Brachetto around Acqui Terme: a low-alcohol, frothy wine of roses and strawberries, plus spumante and passito versions.",
  cat: "DOCG, red, sweet (still or frizzante, spumante, passito)", rec: "DOC 1969; DOCG 1996", d: "DOCG/Brachetto d'Acqui o Acqui",
  amended: "Text as amended by DM 7 August 2019",
  facts: [["Also labelled", "Acqui"], ["Grape", "Brachetto at least 97%"], ["Communes", "Acqui Terme and neighbouring communes in Alessandria, plus Asti communes such as Vesime, Bubbio, Mombaruzzo and the part of Nizza Monferrato right of the Belbo"], ["Yield", "8 t/ha (the Region may raise it by up to 20%, to 9.6 t/ha)"], ["Grape to wine", "70%; passito 45%"], ["Alcohol", "Brachetto d'Acqui: total 11.5%, at least 5% fermented. Spumante: total 12%, at least 6% fermented. Passito: total 16%, at least 11% fermented"], ["Passito release", "Not before 1 October of the year after the harvest"]],
  place: "The hills of the Bormida valleys around the spa town of Acqui Terme, on calcareous marls.",
  rules: "As with Moscato, fermentation is stopped to keep sugar and aroma. The spumante's second fermentation lasts at least one month including time in bottle.",
  glass: "Light ruby, rose petals, strawberry and raspberry, sweet and fizzy, about 5 to 6.5% alcohol.",
  exam: "The sweet red counterpart of Moscato d'Asti. Do not confuse Brachetto d'Acqui with the dry 'Piemonte Brachetto'.",
  producers: ["Braida"]
});
APXF["it-canelli"] = pm({
  lede: "Moscato d'Asti from the steep hills around Canelli and Santo Stefano Belbo, promoted from a subzone of Asti to its own DOCG in 2023, with a Riserva aged 30 months.",
  cat: "DOCG, white, sweet, semi-sparkling", rec: "DOCG approved by EU implementing regulation in 2023 (formerly the Canelli subzone of Asti)", d: "DOCG/Canelli",
  facts: [["Also labelled", "Canelli Moscato"], ["Grape", "Moscato Bianco 100%"], ["Communes", "Asti province: all of Calamandrana, Calosso, Canelli, Cassinasco, Coazzolo; parts of Bubbio, Castagnole Lanze, Costigliole d'Asti, Loazzolo, Moasca, San Marzano Oliveto. Cuneo province: all of Castiglione Tinella and Santo Stefano Belbo; parts of Cossano Belbo, Neive, Neviglie, Mango"], ["Yield", "9.5 t/ha (11% natural); 8.5 t/ha with vigna (11.5%)"], ["Grape to wine", "75% (71.25 hl/ha; 63.75 with vigna)"], ["Alcohol", "Total at least 12%, of which 4.5 to 6.5% fermented"], ["Riserva", "Not before 30 months from 1 October of the harvest, at least 20 of them in bottle"], ["Vineyards", "At least 165 m"]],
  place: "The heart of the Moscato hills, on steep white calcareous marls between the Belbo and Tinella valleys, with Canelli's underground cellars (the 'cattedrali sotterranee', part of the UNESCO site) below the town.",
  rules: "Vinification, ageing and bottling inside the zone. The label must show 'Canelli' followed by DOCG or 'denominazione d'origine protetta'.",
  glass: "Fuller and more concentrated than most Moscato d'Asti; peach, sage, orange blossom; the Riserva develops honeyed, waxy notes.",
  exam: "Piedmont's newest DOCG (2023). Moscato Bianco 100%, frizzante, Riserva 30 months with 20 in bottle.",
  producers: []
});
APXF["it-dogliani"] = pm({
  lede: "Dolcetto at its most serious: the southern Langhe around Dogliani, the first Dolcetto to become a DOCG, with a Superiore aged a year.",
  cat: "DOCG, red", rec: "Dolcetto di Dogliani DOC 1974; Dogliani DOCG 2005 (for the Superiore); the DOC and DOCG merged into one DOCG in 2011", d: "DOCG/Dogliani",
  amended: "AIS text as amended by DM 26 October 2018; the current text adds commune units (see the 2025 notice)",
  facts: [["Communes", "21: all of Bastia Mondovì, Belvedere Langhe, Briaglia, Castellino Tanaro, Cigliè, Clavesana, Dogliani, Farigliano, Igliano, Marsaglia, Monchiero, Niella Tanaro, Piozzo, Rocca Cigliè; parts of Carrù, Mondovì, Murazzano, Roddino, San Michele Mondovì, Somano, Vicoforte"], ["Grape", "Dolcetto 100%"], ["Yield", "Dogliani 8 t/ha (11.5% natural); Superiore 7 t/ha (13%); with vigna 7.2 and 6.3 t/ha (13%)"], ["Grape to wine", "70% (5,600 l/ha); Superiore 68% (4,760 l/ha)"], ["Superiore", "12 months from 15 October; released from 1 November of the year after the harvest"], ["Total alcohol", "12%; Superiore 13%"], ["Vineyards", "Up to 800 m"]],
  place: "The hills south of Barolo, from Monchiero and Farigliano up to Murazzano, rising towards the Alta Langa. Soils are Langhe marls and sandstones; Dolcetto, which ripens early, is planted on sites where Nebbiolo would struggle.",
  rules: "The current specification lists the communes as additional geographic units, written 'del comune di' plus the name; a 'vigna' name requires an additional unit and is reserved to producers who make and bottle their own wine.",
  history: "Dogliani has called itself the home of Dolcetto since at least the 16th century. Luigi Einaudi, President of the Republic, owned the San Giacomo estate here.",
  glass: "Purple, black cherry, blackberry, violets and a bitter-almond finish; more structure than Dolcetto d'Alba.",
  exam: "Dolcetto 100%. Superiore 12 months, 13%. Dogliani, Diano d'Alba and Ovada are the three Dolcetto DOCGs.",
  producers: ["San Fereolo", "Pecchenino", "Quinto Chionetti", "Anna Maria Abbona", "Poderi Luigi Einaudi"]
});
APXF["it-dolcetto-di-diano-d-alba"] = pm({
  lede: "Dolcetto from the single commune of Diano d'Alba, between Barolo and Alba, with 75 named 'sorì' (sun-facing slopes) as official MGAs.",
  cat: "DOCG, red", rec: "DOC 1974; DOCG 2010", d: "DOCG/Dolcetto di Diano d'Alba o Diano d'Alba",
  amended: "Text as amended by DM 17 April 2015",
  facts: [["Also labelled", "Diano d'Alba"], ["Commune", "Diano d'Alba only"], ["Grape", "Dolcetto 100%"], ["Yield", "8 t/ha; 7.2 t/ha with MGA plus vigna"], ["Minimum natural alcohol", "11.5%; Superiore 12%"], ["Grape to wine", "70% (56 hl/ha)"], ["Release", "1 January after the harvest; Superiore aged 10 months from 1 November and released from 1 September of the following year"], ["MGA", "75 sorì, each named 'Sorì' plus a place"], ["Vineyards", "Up to 550 m"]],
  place: "Diano's hill sits on the eastern edge of the Barolo zone; part of the commune is in Barolo. Its south-facing slopes, the sorì, were mapped long before Barolo had MGAs.",
  rules: "Vinification and ageing in the province of Cuneo. The sorì names can be used as MGAs.",
  glass: "Bright, fruity Dolcetto with cherry, plum and almond, mid-weight.",
  exam: "One commune, Dolcetto only, the sorì system. Diano d'Alba also lies partly in Barolo.",
  producers: []
});
APXF["it-dolcetto-di-ovada-superiore"] = pm({
  lede: "The aged Dolcetto of the Ovada hills on the Ligurian border: lower yields than the Dolcetto di Ovada DOC and at least 12 months of ageing.",
  cat: "DOCG, red", rec: "DOCG 2008", d: "DOCG/Dolcetto di Ovada Superiore",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Names", "Dolcetto di Ovada Superiore or Ovada"], ["Communes", "22 in Alessandria: Ovada, Belforte Monferrato, Bosio, Capriata d'Orba, Carpeneto, Casaleggio Boiro, Cassinelle, Castelletto d'Orba, Cremolino, Lerma, Molare, Montaldeo, Montaldo Bormida, Mornese, Morsasco, Parodi Ligure, Prasco, Rocca Grimalda, San Cristoforo, Silvano d'Orba, Tagliolo Monferrato, Trisobbio"], ["Grape", "Dolcetto 100%"], ["Yield", "7 t/ha (12% natural); 6 t/ha with vigna (12.5%)"], ["Grape to wine", "70% (4,900 l/ha; 4,200 with vigna)"], ["Ageing", "12 months from 1 November; with vigna 20 months"], ["Total alcohol", "12.5%; 13% with vigna"], ["Vineyards", "Up to 600 m"]],
  place: "The Alto Monferrato around Ovada, close to the Apennine passes to Genoa: red clays and marls, with sea air reaching the higher valleys of the Orba and Stura.",
  rules: "Riserva and vigna versions exist; vinification and ageing in the zone or in authorised wineries in nearby provinces.",
  glass: "Dark, firm Dolcetto that can age, with black cherry, spice and bitter-almond tannin.",
  exam: "Officially named Dolcetto di Ovada Superiore or simply Ovada. The plain Dolcetto di Ovada remains a DOC.",
  producers: []
});
APXF["it-erbaluce-di-caluso"] = pm({
  lede: "Erbaluce from the moraine hills of the Canavese north of Turin: a high-acid dry white, a traditional-method sparkler and a long-aged Caluso Passito.",
  cat: "DOCG, white (still, sparkling, passito)", rec: "DOC 1967; DOCG 2010", d: "DOCG/Erbaluce di Caluso o Caluso",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Also labelled", "Caluso"], ["Communes", "32 in the province of Turin plus Moncrivello (Vercelli) and Roppolo, Viverone, Zimone (Biella)"], ["Grape", "Erbaluce 100%"], ["Yield", "11 t/ha; minimum natural alcohol 10% (spumante 9.5%)"], ["Spumante", "15 months on the lees"], ["Passito", "Grapes dried to at least 29% sugar; 36 months from 1 November, released from 1 November of the third year after the harvest; Riserva 48 months. Total alcohol at least 17%, residual sugar at least 70 g/L"], ["Vineyards", "At least 200 m"]],
  place: "The Ivrea morainic amphitheatre, a ring of glacial hills left by the Dora Baltea glacier, with sandy, stony, acidic soils and Lake Viverone moderating the climate. Pergola training is traditional.",
  rules: "Vinification, and the ageing of the passito, in the zone; sparkling wine can be made anywhere in Piedmont.",
  glass: "Dry Erbaluce: pale, lemon, green apple, chamomile, very high acidity. Passito: amber, dried apricot, honey and nuts, with acidity that keeps it from cloying.",
  exam: "Erbaluce is a white grape despite the 'alba luce' legend. Passito 36 months (Riserva 48).",
  producers: ["Orsolani", "Cieck", "Ferrando", "La Masera"]
});
APXF["it-gattinara"] = pm({
  lede: "Nebbiolo (Spanna) from the single commune of Gattinara in the Alto Piemonte, on acid volcanic soils, aged at least 35 months: the most important red of northern Piedmont.",
  cat: "DOCG, red", rec: "DOC 1967; DOCG 1990", d: "DOCG/Gattinara",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Commune", "Gattinara only (province of Vercelli)"], ["Grapes", "Nebbiolo (Spanna) 90 to 100%; Vespolina up to 4% and/or Uva Rara, together no more than 10%"], ["Yield", "8 t/ha; natural alcohol 12% (Riserva 12.5%)"], ["Grape to wine", "70%; 65% (5,200 l/ha) after ageing"], ["Ageing", "35 months including 24 in wood from 1 November; Riserva 47 months including 36 in wood"], ["Release", "1 October of the third year after the harvest; Riserva the fourth"], ["Total alcohol", "12.5%; Riserva 13%"], ["Vineyards", "At least 250 m"]],
  place: "Steep hills above the Sesia river at the foot of Monte Rosa. The soils are acidic, weathered porphyry and other rocks from the Permian Sesia supervolcano, rich in iron and minerals, which give firm acidity and tannin.",
  rules: "Vinification and compulsory ageing in Gattinara, with an exception for neighbouring wineries that already aged Gattinara before 1963.",
  history: "In the 19th century Alto Piemonte had some 40,000 ha of vines and its wines were better known than Barolo. Phylloxera, hail and the pull of industry around Biella cut it to a few hundred hectares by the 1990s.",
  glass: "Garnet, rose, iron, red cherry and dried herbs; high acidity, firm but fine tannin.",
  exam: "Spanna is the local name for Nebbiolo. Gattinara 35/24 months; Riserva 47/36. Know its northern neighbours: Ghemme (DOCG), Boca, Bramaterra, Lessona, Fara, Sizzano (DOCs).",
  producers: ["Antoniolo", "Travaglini", "Nervi-Conterno", "Monsecco"]
});
APXF["it-gavi"] = pm({
  lede: "Cortese from eleven communes around Gavi in south-east Piedmont, near Liguria: Piedmont's best-known white, still, frizzante, sparkling and Riserva.",
  cat: "DOCG, white (still, frizzante, sparkling)", rec: "DOC 1974; DOCG 1998", d: "DOCG/Gavi o Cortese di Gavi",
  amended: "Text as amended by DM 6 August 2021",
  facts: [["Also labelled", "Cortese di Gavi"], ["Communes", "Bosio, Capriata d'Orba, Carrosio, Francavilla Bisio, Gavi, Novi Ligure, Parodi Ligure, Pasturana, San Cristoforo, Serravalle Scrivia, Tassarolo (province of Alessandria)"], ["Grape", "Cortese 100%"], ["Yield", "9.5 t/ha; 8.5 with vigna; Riserva and Riserva Spumante metodo classico 6.5 t/ha"], ["Minimum natural alcohol", "9.5% (still and frizzante), 9% (spumante), 10.5% (vigna), 11% (Riserva)"], ["Riserva", "One year from 15 October including 6 months in bottle; released from 1 November of the year after the harvest"], ["Riserva Spumante metodo classico", "Two years from 15 October including 18 months on the lees"], ["Spumante", "At least 6 months on the lees (tank) or 9 months (bottle)"]],
  place: "Hills of the upper Lemme and Scrivia valleys, open to sea air from the Ligurian coast 50 km away. Red clay soils in the south, white marls and sandy marls in the north, especially around Gavi and Tassarolo.",
  rules: "Commune and hamlet names listed in the annex can be added to the label (Gavi del comune di Gavi is the best known). Enrichment is permitted.",
  history: "Genoese merchant families planted Cortese here; much of the wine went to Genoa. La Scolca's 'Gavi dei Gavi' in the 1960s built its fame.",
  glass: "Pale lemon, green apple, citrus and almond, high acidity, light body; a stony, saline edge in the best.",
  exam: "Cortese 100%, 11 communes, Alessandria province. Riserva one year, Riserva Spumante two years.",
  producers: ["La Scolca", "Broglia", "Villa Sparina", "Nicola Bergaglio", "La Raia"]
});
APXF["it-ghemme"] = pm({
  lede: "Nebbiolo-led red from the east bank of the Sesia facing Gattinara, on glacial gravels, aged at least 34 months.",
  cat: "DOCG, red", rec: "DOC 1969; DOCG 1997", d: "DOCG/Ghemme",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Communes", "Parts of Ghemme and Romagnano Sesia (province of Novara)"], ["Grapes", "Nebbiolo (Spanna) at least 85%; Vespolina and Uva Rara (Bonarda Novarese) up to 15%"], ["Yield", "8 t/ha; natural alcohol 11.5% (Riserva 12%)"], ["Grape to wine", "70% (5,600 l/ha)"], ["Ageing", "34 months including 18 in wood from 1 November; Riserva 46 months including 24 in wood"], ["Release", "1 September of the third year after the harvest; Riserva the fourth"], ["Total alcohol", "12%; Riserva 12.5%"], ["Vineyards", "At least 220 m"]],
  place: "A terrace of glacial moraine above the Sesia, with stony, acidic soils of gravel and clay, softer than Gattinara's volcanic rock.",
  rules: "Vinification, ageing and bottling within listed communes of the Novara hills.",
  glass: "Garnet, rose, red fruit, iron and spice; a little rounder than Gattinara.",
  exam: "Ghemme is in the province of Novara, Gattinara in Vercelli; the Sesia separates them.",
  producers: ["Antichi Vigneti di Cantalupo", "Ioppa", "Rovellotti", "Torraccia del Piantavigna"]
});
APXF["it-nizza"] = pm({
  lede: "The top tier of Barbera: 100% Barbera from 18 communes around Nizza Monferrato, aged 18 months, formerly a subzone of Barbera d'Asti.",
  cat: "DOCG, red", rec: "Subzone of Barbera d'Asti 2000; DOCG from the 2014 vintage; registered as a separate DOP by Regulation (EU) 2019/953", d: "DOCG/Nizza ",
  amended: "Text as amended by DM 15 March 2021",
  facts: [["Communes", "Agliano Terme, Belveglio, Bruno, Calamandrana, Castel Boglione, Castelnuovo Belbo, Castelnuovo Calcea, Castel Rocchero, Cortiglione, Incisa Scapaccino, Moasca, Mombaruzzo, Mombercelli, Nizza Monferrato, Rocchetta Palafea, San Marzano Oliveto, Vaglio Serra, Vinchio"], ["Grape", "Barbera 100%"], ["Yield", "7 t/ha (13% natural); 6.3 t/ha with vigna (13.5%)"], ["Grape to wine", "70% (4,900 l/ha)"], ["Ageing", "18 months including 6 in wood, from 1 January after the harvest; Riserva 30 months including 12 in wood"], ["Total alcohol", "13%; Riserva 13.5%"]],
  place: "The Belbo valley hills of the southern Asti Monferrato, on clay-sandy marls and layered sandstones. Valley floors are excluded.",
  rules: "Only hillside vineyards with good exposure. Vintage, and 'vigna' names, permitted under lower yields.",
  glass: "Dense, dark Barbera, black cherry, plum and spice, with high acidity carried by riper fruit and oak.",
  exam: "Barbera 100% (Barbera d'Asti needs 90%). 18/6 months, Riserva 30/12. Since 2014 it is not a Barbera d'Asti subzone.",
  producers: ["Michele Chiarlo (La Court)", "Tenuta Olim Bauda", "Bersano", "Coppo", "Braida"]
});
APXF["it-roero"] = pm({
  lede: "Nebbiolo reds and Arneis whites from the sandy hills on the left bank of the Tanaro, opposite Barolo and Barbaresco, with 18 commune names and 133 local site names as additional units.",
  cat: "DOCG, red and white (also sparkling Arneis)", rec: "DOC 1985; DOCG 2004", d: "DOCG/Roero",
  amended: "Text as amended by Regulation (EU) 2022/2044",
  facts: [["Communes", "19 in Cuneo: all of Canale, Corneliano d'Alba, Piobesi d'Alba, Vezza d'Alba; parts of Baldissero d'Alba, Castagnito, Castellinaldo, Govone, Guarene, Magliano Alfieri, Montà, Montaldo Roero, Monteu Roero, Monticello d'Alba, Pocapaglia, Priocca, Santa Vittoria d'Alba, Santo Stefano Roero, Sommariva Perno"], ["Grapes", "Red: Nebbiolo at least 95%. White (Roero or Roero Arneis): Arneis at least 95%"], ["Yield", "Red 8 t/ha (12% natural); white 10 t/ha (10.5%). With vigna: red 7.2, white 9 t/ha"], ["Grape to wine", "70% (red 56 hl/ha, white 70 hl/ha)"], ["Ageing", "Red 20 months including 6 in wood from 1 November; Riserva 32 months including 6 in wood. White Riserva 16 months; white with an additional unit 4 months"], ["Release", "Red 1 July of the second year after the harvest (Riserva the third); white with additional unit 1 March of the following year; white Riserva 1 March of the second year"], ["Additional units", "18 communes plus 133 localities (frazioni and località)"]],
  place: "The Roero formed when the Tanaro was captured and diverted east, cutting deep gullies, the rocche, into soft marine sands and clays. Sandier soils than the Langhe give lighter, aromatic Nebbiolo and suit Arneis.",
  rules: "Vinification and ageing in communes wholly or partly in the zone. Sparkling Arneis is a quality sparkling wine of any sweetness from brut nature to dolce. Vintage compulsory.",
  history: "Arneis, once used to soften Nebbiolo and nearly extinct in the 1960s, was revived by Alfredo Currado of Vietti and Bruno Giacosa in the 1970s.",
  glass: "Roero red: red cherry, raspberry, roses, fine tannin. Roero Arneis: pear, white peach, chamomile and almond, moderate acidity.",
  exam: "One DOCG for both colours. Nebbiolo 95% and Arneis 95%. Red 20/6 months; Riserva 32/6.",
  producers: ["Malvirà", "Matteo Correggia", "Cascina Val del Prete", "Monchiero Carbone", "Cascina Chicco", "Bruno Giacosa"]
});
APXF["it-ruche-di-castagnole-monferrato"] = pm({
  lede: "An aromatic red from the rare Ruchè grape, grown in seven communes of the Asti Monferrato: rose, violet and spice in a light-tannin red.",
  cat: "DOCG, red", rec: "DOC 1987; DOCG 2010", d: "DOCG/Ruche di Castagnole Monferrato",
  amended: "Text as amended by DM 31 March 2020",
  facts: [["Communes", "Castagnole Monferrato, Grana, Montemagno, Portacomaro, Refrancore, Scurzolengo, Viarigi (province of Asti)"], ["Grapes", "Ruchè at least 90%; Barbera and Brachetto up to 10%"], ["Yield", "9 t/ha; 11.5% natural"], ["Riserva", "24 months including at least 12 in wood, from 1 November"], ["Total alcohol", "12.5%"], ["Vineyards", "At least 120 m"]],
  place: "Low calcareous and sandy hills north-east of Asti.",
  rules: "Vigna names permitted. Riserva introduced with the later amendments.",
  history: "Don Giacomo Cauda, parish priest of Castagnole Monferrato, saved Ruchè from neglect in the 1960s and 1970s by bottling it from the church's vineyard.",
  glass: "Ruby, intensely floral (rose, violet), with pepper, cherry and soft tannin.",
  exam: "One of the few aromatic red grapes; seven communes.",
  producers: ["Luca Ferraris", "Montalbera", "Cantine Sant'Agata", "Bersano"]
});
APXF["it-terre-alfieri"] = pm({
  lede: "Arneis and Nebbiolo from the hills between the Roero and Asti around San Damiano and Cisterna, promoted from DOC to DOCG in 2020.",
  cat: "DOCG, white and red", rec: "DOC 2009; DOCG 2020 (DM 9 October 2020)", d: "DOCG/Terre Alfieri",
  facts: [["Communes", "All of Antignano, Celle Enomondo, Cisterna d'Asti, Revigliasco, San Damiano d'Asti, San Martino Alfieri, Tigliole (Asti); parts of Castellinaldo, Govone, Magliano Alfieri, Priocca (Cuneo)"], ["Types", "Arneis, Arneis Superiore, Nebbiolo, Nebbiolo Superiore, Nebbiolo Riserva"], ["Grapes", "Arneis 85 to 100%; Nebbiolo 85 to 100%"], ["Yield", "Arneis 10 t/ha (11.5% natural); Nebbiolo 8.5 t/ha (12%)"], ["Ageing", "Arneis Superiore 6 months from 1 November; Nebbiolo Superiore 12 months including 6 in wood; Nebbiolo Riserva 24 months including 12 in wood"]],
  place: "Sandy hills continuing the Roero eastward into the province of Asti, named after the Alfieri family, lords of San Martino Alfieri.",
  rules: "Grape to wine 70%. Vigna names permitted with lower yields.",
  glass: "Arneis: pear and almond. Nebbiolo: light, perfumed, Roero-like.",
  exam: "A small, recent DOCG; often forgotten in DOCG counts.",
  producers: []
});

// ---------- DOC ----------
APXF["it-alba"] = pm({
  lede: "A Nebbiolo and Barbera blend from the Alba hills, created to give a home to a traditional local blend that Barolo and Barbaresco rules exclude.",
  cat: "DOC, red", rec: "DOC 2010 (DM 2 August 2010)", d: "DOC/Alba",
  facts: [["Grapes", "Nebbiolo 70 to 85%; Barbera 15 to 30%; up to 5% other non-aromatic red varieties"], ["Communes", "Langhe and Roero communes around Alba, including Barolo, Canale, Diano d'Alba, Dogliani and La Morra"], ["Yield", "8 t/ha; 12% natural; 7.2 t/ha with vigna (12.5%)"], ["Ageing", "17 months including 9 in oak; Riserva 23 months including 12 in oak, both from 1 November"], ["Total alcohol", "12.5%"]],
  place: "The Langhe and Roero hills around Alba.",
  rules: "Ageing may happen anywhere in the province of Cuneo. Up to 15% younger or older Alba may be blended in.",
  glass: "Nebbiolo perfume with Barbera's fruit and acidity, softer tannin than Barolo.",
  exam: "One of the few Piedmont DOCs that requires a blend, Nebbiolo plus Barbera.",
  producers: []
});
APXF["it-albugnano"] = pm({
  lede: "Nebbiolo from four communes on the high hills north of Asti, near Turin: the Nebbiolo of the Basso Monferrato.",
  cat: "DOC, red and rosé", rec: "DOC 1997", d: "DOC/Albugnano",
  facts: [["Communes", "Albugnano, Pino d'Asti, Castelnuovo Don Bosco, Passerano Marmorito"], ["Grapes", "Nebbiolo at least 85%; Freisa, Barbera, Bonarda up to 15%"], ["Minimum natural alcohol", "10.5%; Superiore 11.5%"], ["Superiore", "Yield no more than 8.5 t/ha; aged one year from 1 January after the harvest, at least 6 months in oak"]],
  place: "Albugnano is one of the highest points of the Asti province (about 550 m), on sandy-marly soils with cool nights.",
  rules: "Red, rosato and Superiore versions.",
  glass: "Light, perfumed Nebbiolo with red fruit and fresh acidity.",
  exam: "A Nebbiolo DOC outside the Langhe; the Abbey of Vezzolano is nearby.",
  producers: []
});
APXF["it-barbera-d-alba"] = pm({
  lede: "Barbera from the Langhe and Roero around Alba, often from top Barolo and Barbaresco estates, with up to 15% Nebbiolo allowed and a Castellinaldo subzone.",
  cat: "DOC, red", rec: "DOC 1970", d: "DOC/Barbera d'Alba",
  amended: "Text as amended by DM 6 August 2021",
  facts: [["Grapes", "Barbera 85 to 100%; Nebbiolo up to 15%"], ["Yield", "10 t/ha; natural alcohol 11% (Superiore 11.5%); with vigna 11.5 and 12%"], ["Grape to wine", "70% (7,000 l/ha)"], ["Superiore", "12 months including 4 in wood from 1 November"], ["Total alcohol", "12%; Superiore 12.5%"], ["Subzone", "Castellinaldo: all of Castellinaldo d'Alba and parts of Vezza d'Alba, Canale, Priocca, Magliano Alfieri, Castagnito, Guarene; Barbera at least 85%, Nebbiolo up to 15%"]],
  place: "The Barbera d'Alba zone covers some 40 communes of the Langhe and Roero, including the Barolo and Barbaresco villages. Growers usually reserve the best sites for Nebbiolo and plant Barbera on the cooler or lower slopes.",
  rules: "Vigna names permitted with lower yields. A temporary regional decree for the 2026 harvest set lower yields for Barbera d'Alba (and Langhe Nebbiolo) without changing the specification.",
  glass: "Darker and fuller than most Barbera d'Asti, with cherry, plum and high acidity.",
  exam: "Barbera d'Alba is a DOC; Barbera d'Asti is a DOCG. Nebbiolo up to 15% allowed in Alba.",
  producers: ["Giacomo Conterno (Cascina Francia)", "Vietti (Scarrone)", "Giuseppe Rinaldi", "G.D. Vajra", "Bartolo Mascarello"]
});
APXF["it-barbera-del-monferrato"] = pm({
  lede: "The everyday Barbera of the Monferrato hills, still or frizzante, with up to 15% Freisa, Grignolino or Dolcetto.",
  cat: "DOC, red (still or frizzante)", rec: "DOC 1970", d: "DOC/Barbera del Monferrato",
  facts: [["Grapes", "Barbera at least 85%; Freisa, Grignolino and Dolcetto up to 15%"], ["Yield", "10 t/ha; 11% natural; 12% with vigna"], ["Grape to wine", "70% (7,000 l/ha)"], ["Total alcohol", "11.5%"]],
  place: "The hills of the provinces of Alessandria and Asti, from the Casalese to the Alto Monferrato.",
  rules: "No compulsory ageing; the aged version is the separate Barbera del Monferrato Superiore DOCG.",
  glass: "Bright, tart cherry fruit; the frizzante version is a lightly fizzy local tradition.",
  exam: "The DOC base under the Superiore DOCG.",
  producers: []
});
APXF["it-boca"] = pm({
  lede: "A tiny Alto Piemonte red of Nebbiolo with Vespolina and Uva Rara, from volcanic porphyry soils, aged at least 34 months.",
  cat: "DOC, red", rec: "DOC 1969", d: "DOC/Boca",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Communes", "All of Boca; parts of Maggiora, Cavallirio, Prato Sesia and Grignasco (province of Novara)"], ["Grapes", "Nebbiolo (Spanna) 70 to 90%; Vespolina and Uva Rara (Bonarda Novarese) 10 to 30%"], ["Yield", "8 t/ha (11.5% natural; Riserva 12%); 7.2 t/ha with vigna"], ["Grape to wine", "70% (5,600 l/ha)"], ["Ageing", "34 months including 18 in wood from 1 November; Riserva 46 months including 24 in wood"], ["Release", "1 September of the third year after the harvest"], ["Total alcohol", "12%"]],
  place: "Steep slopes around Boca on acidic porphyry from the ancient Sesia supervolcano, among chestnut woods at the foot of Monte Fenera.",
  rules: "Vinification, ageing and bottling within listed Novara communes. Pergola-like maggiorina training survives here.",
  history: "Boca almost disappeared after the Second World War; the Swiss importer Christoph Künzli's Le Piane revived it from the late 1990s.",
  glass: "Red cherry, iron and spice, high acidity, a peppery note from Vespolina.",
  exam: "Boca requires 10 to 30% Vespolina and/or Uva Rara with Nebbiolo.",
  producers: ["Le Piane", "Castello Conti", "Davide Carlone"]
});
APXF["it-bramaterra"] = pm({
  lede: "An Alto Piemonte blend of Nebbiolo with Croatina, Vespolina and Uva Rara from seven communes on volcanic soils in the provinces of Biella and Vercelli.",
  cat: "DOC, red", rec: "DOC 1979", d: "DOC/Bramaterra",
  facts: [["Communes", "Hill parcels north of state road 142 in Masserano, Brusnengo, Curino, Roasio, Villa del Bosco, Sostegno and Lozzolo"], ["Grapes", "Nebbiolo (Spanna) 50 to 80%; Croatina up to 30%; Uva Rara and Vespolina together up to 20%"], ["Yield", "7.5 t/ha (11.5% natural); Riserva 6.7 t/ha (12%)"], ["Ageing", "22 months including 18 in wood from 1 November"], ["Release", "1 September of the second year after the harvest; Riserva the third"], ["Total alcohol", "12%"]],
  place: "Porphyry and volcanic sands between Lessona and Gattinara.",
  rules: "Blending in up to 15% of younger or older Bramaterra allowed.",
  glass: "Darker fruit and softer acidity than Gattinara thanks to Croatina; iron, cherry and herbs.",
  exam: "Croatina is allowed here, unlike Gattinara or Lessona.",
  producers: []
});
APXF["it-calosso"] = pm({
  lede: "A micro-DOC for the rare Gamba Rossa grape around Calosso, south of Asti, including a red made from dried grapes called Passarà.",
  cat: "DOC, red (also from dried grapes)", rec: "DOC 2011", d: "DOC/Calosso",
  facts: [["Communes", "Calosso, Castagnole delle Lanze, Costigliole d'Asti"], ["Grapes", "Gamba Rossa (Imperatrice dalla gamba rossa) 90 to 100%"], ["Types", "Calosso (also Riserva); Calosso Passarà"], ["Yield", "9 t/ha (11% natural); 7.5 t/ha for the stricter types"], ["Ageing", "Calosso 20 months from 1 November; with vigna or Riserva 30 months from 1 December"], ["Passarà", "Grapes dried without heated dehumidifiers and not vinified before 15 December"]],
  place: "The Moscato and Barbera hills on the border of Asti and the Langhe.",
  rules: "Grape to wine 70%.",
  glass: "Light, spicy red with pepper and red berries.",
  exam: "Gamba Rossa, a variety rescued by local growers.",
  producers: []
});
APXF["it-canavese"] = pm({
  lede: "The broad DOC of the Canavese north of Turin, for reds and rosés from local varieties, Erbaluce whites, and varietal Nebbiolo and Barbera.",
  cat: "DOC, red, rosé, white, sparkling", rec: "DOC 1996", d: "DOC/Canavese",
  facts: [["Types", "Rosso, rosso novello, rosato, rosato spumante, bianco, bianco spumante, Barbera, Nebbiolo"], ["Grapes", "Rosso and rosato: Nebbiolo, Barbera, Uva Rara, Bonarda, Freisa, Neretto together at least 60%. Bianco: Erbaluce 100%"], ["Yield", "Red and rosé 11 t/ha; white 12 t/ha; Nebbiolo 10 t/ha"]],
  place: "Communes of the province of Turin around Ivrea, Caluso and Carema, with some in Biella and Vercelli: morainic and alpine foothills.",
  rules: "Grape to wine 70%.",
  glass: "Light, fresh reds; crisp Erbaluce whites.",
  exam: "The umbrella over Carema and Erbaluce di Caluso.",
  producers: []
});
APXF["it-carema"] = pm({
  lede: "Mountain Nebbiolo from stone terraces at the border with the Aosta Valley, trained on pergolas held up by stone pillars, aged at least 24 months.",
  cat: "DOC, red", rec: "DOC 1967", d: "DOC/Carema",
  facts: [["Commune", "Carema only (province of Turin)"], ["Grapes", "Nebbiolo 85 to 100%; up to 15% other non-aromatic red varieties"], ["Yield", "8 t/ha; 11.5% natural"], ["Grape to wine", "70% (5,600 l/ha)"], ["Ageing", "24 months including 12 in wood from 1 November; Riserva 36 months including 12 in wood"], ["Release", "1 November of the second year after the harvest; Riserva the third"], ["Total alcohol", "12%"]],
  place: "Terraces cut into the glacial slopes of the Dora Baltea valley at 300 to 600 m. The pergolas (topie) rest on stone and lime columns (pilun) that store heat.",
  rules: "Vinification and ageing in the commune.",
  glass: "Pale, delicate Nebbiolo: rose, red currant, herbs, firm acidity.",
  exam: "Carema sits on the Aosta Valley border; the Valle d'Aosta DOC has its own Nebbiolo-based subzones (Donnas, Arnad-Montjovet).",
  producers: ["Produttori di Carema", "Ferrando", "Muraje"]
});
APXF["it-cisterna-d-asti"] = pm({
  lede: "A Croatina red from the sandy hills between the Roero and Asti around Cisterna d'Asti.",
  cat: "DOC, red", rec: "DOC 2002", d: "DOC/Cisterna d'Asti",
  facts: [["Communes", "Antignano, Cantarana, Cisterna d'Asti, Ferrere, San Damiano d'Asti, San Martino Alfieri (Asti), plus some in Cuneo"], ["Grapes", "Croatina 80 to 100%"], ["Yield", "9 t/ha; natural alcohol 10.5% (Superiore 11%); 8 t/ha with vigna"], ["Superiore", "10 months from 1 November"], ["Total alcohol", "11.5%; Superiore 12%"]],
  place: "Sandy marine hills continuing the Roero eastward.",
  rules: "Grape to wine 70%.",
  glass: "Dark, soft, fruity red with low acidity.",
  exam: "Croatina is better known as Bonarda in Oltrepò Pavese.",
  producers: []
});
APXF["it-colli-tortonesi"] = pm({
  lede: "The hills around Tortona in the far east of Piedmont, best known as the home of Timorasso, with subzones Monleale and Terre di Libarna.",
  cat: "DOC, red, white, rosé", rec: "DOC 1973", d: "DOC/Colli Tortonesi",
  facts: [["Main types", "Timorasso (also Riserva), Barbera (also Superiore and Riserva), Croatina, Dolcetto, Freisa, Cortese, Favorita, Moscato, Bianco, Rosso, Chiaretto"], ["Timorasso", "Grape to wine 65% (5,200 l/ha); at least 10 months from 1 November"], ["Barbera Superiore", "13 months including 6 in wood"], ["Subzones", "Monleale (Barbera) and Terre di Libarna (Timorasso at least 95%; also bianco, spumante, rosso)"]],
  place: "Marly hills between the Curone, Grue and Borbera valleys near the borders with Lombardy, Emilia and Liguria.",
  rules: "Many wines share the DOC; quality interest centres on Timorasso, which producers market under the name Derthona (the Roman name of Tortona).",
  history: "Walter Massa revived Timorasso from near extinction in the late 1980s.",
  glass: "Timorasso: full, mineral white with citrus, honey and a petrol note with age; ages like Riesling.",
  exam: "Timorasso and Derthona are linked to Colli Tortonesi.",
  producers: ["Vigneti Massa", "Claudio Mariotto", "La Colombera", "Luigi Boveri"]
});
APXF["it-collina-torinese"] = pm({
  lede: "A small DOC for the hills east of Turin, with a Barbera-Freisa red, varietal Barbera and Bonarda, Malvasia and Pelaverga (Cari).",
  cat: "DOC, red", rec: "DOC 1999", d: "DOC/Collina Torinese",
  facts: [["Types", "Rosso, rosso novello, Barbera, Bonarda, Malvasia, Pelaverga or Cari"], ["Grapes", "Rosso: Barbera at least 60%, Freisa at least 25%. Varietals at least 85%. Malvasia: Malvasia di Schierano and/or Malvasia Nera Lunga"]],
  place: "The Turin hills around Chieri and the Po.",
  rules: "Grape to wine at most 70%. The Malvasia and Cari can be sweet.",
  glass: "Light, fruity reds; aromatic sweet Malvasia.",
  exam: "Cari is the local name for a Pelaverga here.",
  producers: []
});
APXF["it-colline-novaresi"] = pm({
  lede: "The umbrella DOC of the Novara hills of Alto Piemonte, used for Nebbiolo, Vespolina, Uva Rara and blends outside the small classic DOCs.",
  cat: "DOC, red, rosé, white", rec: "DOC 1994", d: "DOC/Colline Novaresi",
  facts: [["Types", "Rosso, rosato, novello, bianco, Nebbiolo (Spanna), Uva Rara (Bonarda Novarese), Vespolina, Barbera, Croatina"], ["Grapes", "Rosso and rosato: Nebbiolo at least 50%. Varietals at least 85%"], ["Yield", "9.5 to 10 t/ha"]],
  place: "Communes of the Novara hills, including Boca, Fara, Ghemme and Sizzano.",
  rules: "Grape to wine 70%.",
  glass: "Light to mid-weight, fresh reds; peppery Vespolina.",
  exam: "The fallback DOC for Ghemme, Boca, Fara and Sizzano growers.",
  producers: []
});
APXF["it-colline-saluzzesi"] = pm({
  lede: "A DOC around Saluzzo in western Piedmont, for local grapes Pelaverga, Chatus and the sweet sparkling Quagliano.",
  cat: "DOC, red, rosé, sparkling", rec: "DOC 1996", d: "DOC/Colline Saluzzesi",
  facts: [["Types", "Rosso, Barbera, Chatus, Pelaverga, Pelaverga rosato, Quagliano, Quagliano spumante"], ["Grapes", "Rosso: Barbera, Chatus, Nebbiolo, Pelaverga at least 60%. Varietal wines from the named grape only"], ["Chatus", "12 months from 15 October; released from 1 November of the following year"], ["Quagliano", "Sweet, at least 5.5% fermented alcohol; the spumante at least 7%"]],
  place: "The foothills of Monte Viso around Saluzzo; all of Pagno and Piasco and parts of other communes.",
  rules: "Pelaverga here is Pelaverga Grosso, a different variety from Verduno's Pelaverga Piccolo.",
  glass: "Light, peppery reds; sweet, fragrant Quagliano.",
  exam: "Pelaverga di Saluzzo is not the Verduno grape.",
  producers: []
});
APXF["it-cortese-dell-alto-monferrato"] = pm({
  lede: "Cortese from the Alto Monferrato in Asti and Alessandria: a simpler, broader neighbour of Gavi.",
  cat: "DOC, white", rec: "DOC 1979", d: "DOC/Cortese dell'Alto Monferrato",
  facts: [["Grapes", "Cortese at least 85%"], ["Yield", "10 t/ha; 9.5% natural"], ["Grape to wine", "70%"], ["Total alcohol", "10%"]],
  place: "The hills south of Asti and around Acqui and Ovada.",
  rules: "Frizzante and spumante versions are also made.",
  glass: "Light, crisp, lemony white.",
  exam: "Cortese outside Gavi.",
  producers: []
});
APXF["it-coste-della-sesia"] = pm({
  lede: "The umbrella DOC of the Biella and Vercelli hills west of the Sesia, used for Nebbiolo (Spanna), Croatina, Vespolina and blends.",
  cat: "DOC, red, rosé, white", rec: "DOC 1996", d: "DOC/Coste della Sesia",
  facts: [["Communes", "Including Gattinara, Roasio, Lozzolo, Serravalle Sesia (Vercelli); Lessona, Masserano, Brusnengo and others (Biella)"], ["Types", "Rosso, rosato, bianco, Nebbiolo or Spanna, Croatina, Vespolina"], ["Grapes", "Rosso and rosato: Nebbiolo at least 50%. Varietals at least 85%"]],
  place: "Porphyry and marine sands between Gattinara and Lessona.",
  rules: "Grape to wine 70%.",
  glass: "Light, mineral Nebbiolo with fresh acidity.",
  exam: "The fallback for Gattinara, Lessona and Bramaterra growers.",
  producers: []
});
APXF["it-dolcetto-d-acqui"] = pm({
  lede: "Dolcetto from the hills around Acqui Terme, in the Alto Monferrato.",
  cat: "DOC, red", rec: "DOC 1972", d: "DOC/Dolcetto d'Acqui",
  facts: [["Grape", "Dolcetto 100%"], ["Yield", "8 t/ha; 11% natural (Superiore 12%)"], ["Total alcohol", "11.5%; Superiore 12.5%"]],
  place: "Communes of the Bormida valleys around Acqui Terme.",
  rules: "Grape to wine 70%.",
  glass: "Soft, fruity Dolcetto.",
  exam: "One of seven Piedmont Dolcetto appellations.",
  producers: []
});
APXF["it-dolcetto-d-alba"] = pm({
  lede: "The everyday red of the Langhe: Dolcetto from the Alba area, drunk young while the Nebbiolo ages.",
  cat: "DOC, red", rec: "DOC 1974", d: "DOC/Dolcetto d'Alba",
  amended: "Text as amended by DM 17 April 2015",
  facts: [["Grape", "Dolcetto 100%"], ["Yield", "9 t/ha; 11% natural (Superiore 12%)"], ["Grape to wine", "70% (6,300 l/ha)"], ["Superiore", "12 months from 1 November, released from 1 November of the following year"], ["Total alcohol", "11.5%; Superiore 12.5%"]],
  place: "Communes of the Langhe around Alba, including the Barolo and Barbaresco villages.",
  rules: "Vigna names permitted with lower yields.",
  glass: "Purple, juicy black cherry, low acidity, bitter-almond finish.",
  exam: "Dolcetto means 'little sweet one' but the wine is dry.",
  producers: ["Giuseppe Mascarello e Figlio", "G.D. Vajra", "Bartolo Mascarello"]
});
APXF["it-dolcetto-d-asti"] = pm({
  lede: "Dolcetto from the southern hills of the province of Asti.",
  cat: "DOC, red", rec: "DOC 1974", d: "DOC/Dolcetto d'Asti",
  facts: [["Grape", "Dolcetto 100%"], ["Yield", "8 t/ha; 11% natural (Superiore 12%)"], ["Superiore", "At least one year from 1 January after the harvest"], ["Total alcohol", "11.5%; Superiore 12.5%"]],
  place: "Communes of the Langa Astigiana and Belbo valley.",
  rules: "Grape to wine 70%.",
  glass: "Soft, fruity Dolcetto.",
  exam: "Rarely seen outside the region.",
  producers: []
});
APXF["it-dolcetto-di-ovada"] = pm({
  lede: "Dolcetto from 22 communes around Ovada; the aged, lower-yield version is the Ovada DOCG.",
  cat: "DOC, red", rec: "DOC 1972", d: "DOC/Dolcetto di Ovada",
  facts: [["Grape", "Dolcetto 100% (up to 3% other non-aromatic varieties tolerated in the vineyard)"], ["Yield", "8 t/ha; 11% natural"], ["Grape to wine", "70% (56 hl/ha)"], ["Total alcohol", "11.5%"]],
  place: "The Alto Monferrato near the Ligurian border.",
  rules: "No compulsory ageing.",
  glass: "Sturdy, dark Dolcetto.",
  exam: "DOC Dolcetto di Ovada versus DOCG Dolcetto di Ovada Superiore (Ovada).",
  producers: []
});
APXF["it-fara"] = pm({
  lede: "A Nebbiolo-Vespolina blend from Fara Novarese and Briona in the Novara hills, aged 22 months.",
  cat: "DOC, red", rec: "DOC 1969", d: "DOC/Fara",
  facts: [["Communes", "Fara Novarese and Briona"], ["Grapes", "Nebbiolo (Spanna) 50 to 70%; Vespolina and Uva Rara 30 to 50%; up to 10% other red"], ["Yield", "10 t/ha (11.5% natural); Riserva 9 t/ha (12%)"], ["Ageing", "22 months including 12 in wood from 1 November; Riserva 34 months including 20 in wood"], ["Release", "1 September of the second year after the harvest; Riserva the third"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: "Glacial terraces east of the Sesia, south of Ghemme.",
  rules: "Vigna names permitted.",
  glass: "Bright cherry, spice and pepper from Vespolina.",
  exam: "Fara and Sizzano have the same blend rules (Nebbiolo 50 to 70%).",
  producers: []
});
APXF["it-freisa-d-asti"] = pm({
  lede: "Freisa, Nebbiolo's tannic, raspberry-scented relative, from the hills of the province of Asti: dry, Superiore, frizzante or spumante.",
  cat: "DOC, red (still, frizzante, sparkling)", rec: "DOC 1972", d: "DOC/Freisa d'Asti",
  amended: "Text as amended by DM 3 November 2021",
  facts: [["Grapes", "Freisa at least 90%"], ["Zone", "Hills of the whole province of Asti except Cellarengo and Villanova d'Asti"], ["Yield", "8 t/ha"], ["Superiore", "Aged until 1 November of the year after the harvest, at least 6 months in wood"]],
  place: "The Asti hills.",
  rules: "Grape to wine 70%.",
  glass: "Raspberry, rose, firm tannin and acidity; frizzante versions often off-dry.",
  exam: "DNA shows Freisa is a close relative (likely offspring) of Nebbiolo.",
  producers: []
});
APXF["it-freisa-di-chieri"] = pm({
  lede: "Freisa from the hills around Chieri, east of Turin, made dry, Superiore, sweet, frizzante or sparkling.",
  cat: "DOC, red", rec: "DOC 1973", d: "DOC/Freisa di Chieri",
  facts: [["Grapes", "Freisa 90 to 100%"], ["Communes", "Chieri, Pecetto Torinese, Pino Torinese, Pavarolo, Baldissero Torinese, Montaldo Torinese, Mombello Torinese, Andezeno, Arignano, Moriondo Torinese, Marentino, Riva presso Chieri and others"], ["Superiore", "12 months from 1 November, released from 1 November of the following year"]],
  place: "The Turin hills, where Freisa was traditionally made sweet and fizzy.",
  rules: "Five types; the dolce must keep sugar from stopped fermentation.",
  glass: "Raspberry and rose; the sweet frizzante is a local classic.",
  exam: "Freisa di Chieri is the historic home of sweet Freisa.",
  producers: ["Balbiano"]
});
APXF["it-gabiano"] = pm({
  lede: "One of Italy's smallest DOCs: Barbera with a little Freisa or Grignolino from Gabiano and Moncestino in the Casalese.",
  cat: "DOC, red", rec: "DOC 1983", d: "DOC/Gabiano",
  facts: [["Communes", "Gabiano and Moncestino (Alessandria)"], ["Grapes", "Barbera 90 to 95%; Freisa and Grignolino 5 to 10%"], ["Yield", "8 t/ha; 11.5% natural"], ["Riserva", "12% natural; at least two years from 1 January after the harvest"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: "Hills above the Po in the north of the Monferrato Casalese.",
  rules: "Vinification and ageing in the two communes.",
  glass: "Firm Barbera with herbal hints.",
  exam: "Tiny; the Castello di Gabiano estate dominates production.",
  producers: ["Castello di Gabiano"]
});
APXF["it-grignolino-d-asti"] = pm({
  lede: "Pale, peppery Grignolino from the hills north of Asti.",
  cat: "DOC, red", rec: "DOC 1973", d: "DOC/Grignolino d'Asti",
  facts: [["Grapes", "Grignolino at least 90%; Freisa up to 10%"], ["Yield", "8 t/ha; 10.5% natural"], ["Grape to wine", "65%"], ["Total alcohol", "11%"]],
  place: "Communes of the Asti Monferrato north and east of Asti.",
  rules: "The lower grape to wine ratio (65%) reflects Grignolino's many pips.",
  glass: "Pale ruby, red berries, white pepper, high acidity and surprisingly firm tannin.",
  exam: "Grignolino means 'many pips' in dialect (grignole).",
  producers: []
});
APXF["it-grignolino-del-monferrato-casalese"] = pm({
  lede: "Grignolino from the Monferrato Casalese north of the Tanaro, now with a long-aged Riserva and a traditional-method rosé.",
  cat: "DOC, red, rosé sparkling", rec: "DOC 1974", d: "DOC/Grignolino del Monferrato Casalese",
  amended: "Text as amended by DM 25 October 2021 and an EU implementing regulation",
  facts: [["Grapes", "Grignolino at least 95%; Freisa and Barbera up to 5%"], ["Types", "Grignolino, Riserva, Spumante Rosato"], ["Riserva", "30 months including 18 in wood, from 1 November"], ["Spumante Rosato", "Bottle fermented, at least 18 months on the lees"], ["Grape to wine", "70%; 65% for Riserva"]],
  place: "The calcareous marl hills between Casale Monferrato and the Asti border, part of the UNESCO landscape site (the 'infernot' cellars).",
  rules: "The 2021 revision raised Grignolino to 95% and added the new types.",
  glass: "Pale, spicy, high-acid red; the Riserva adds tertiary depth.",
  exam: "The Riserva requires 30 months, a long time for such a pale wine.",
  producers: []
});
APXF["it-langhe"] = pm({
  lede: "The DOC that covers the whole Langhe hills, used for varietal wines, blends and wines declassified from Barolo or Barbaresco, plus a Nascetta subzone in Novello.",
  cat: "DOC, red, white, rosé, passito", rec: "DOC 1994", d: "DOC/Langhe",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Types", "Rosso, bianco, rosato, Nebbiolo, Barbera, Dolcetto, Freisa, Cabernet Sauvignon, Merlot, Pinot Nero, Arneis, Chardonnay, Favorita, Nascetta, Riesling, Rossese Bianco, Sauvignon, passito"], ["Grapes", "Varietal wines at least 85% of the named grape"], ["Yield", "Mostly 10 t/ha; Arneis, Barbera and bianco 11 t/ha"], ["Subzone", "Nascetta del comune di Novello (Nas-cëtta di Novello): Nascetta 100%, still and passito"]],
  place: "Communes of the province of Cuneo on both sides of the Tanaro, including the Barolo and Barbaresco zones.",
  rules: "Langhe Nebbiolo can come from Barolo or Barbaresco vineyards and is the usual home for younger vines or declassified wine. A temporary 2026 regional decree cut Langhe Nebbiolo yields for that harvest only.",
  glass: "From fresh Langhe Nebbiolo and Arneis to serious Chardonnay and red blends.",
  exam: "Langhe Nebbiolo needs 85% Nebbiolo; Nebbiolo d'Alba needs 100%.",
  producers: ["Elvio Cogno (Nascetta)", "Gaja", "G.D. Vajra"]
});
APXF["it-lessona"] = pm({
  lede: "Nebbiolo from yellow marine sands in a single commune of the province of Biella, aged 22 months: Alto Piemonte's most elegant red.",
  cat: "DOC, red", rec: "DOC 1976", d: "DOC/Lessona",
  facts: [["Commune", "Lessona only"], ["Grapes", "Nebbiolo (Spanna) 85 to 100%; Vespolina and Uva Rara up to 15%"], ["Yield", "8 t/ha (11.5% natural); Riserva 7.2 t/ha (12%)"], ["Ageing", "22 months including 12 in wood from 1 November; Riserva 46 months including 30 in wood"], ["Release", "1 September of the second year after the harvest; Riserva the fourth"], ["Total alcohol", "12%"]],
  place: "Pliocene marine sands, acidic and yellow, unusual in Alto Piemonte, where most soils are volcanic or glacial.",
  rules: "Vigna names permitted.",
  glass: "Pale, fragrant Nebbiolo with red fruit, rose and a saline finish.",
  exam: "Lessona's sands contrast with the porphyry of Gattinara and Boca.",
  producers: ["Proprietà Sperino", "Tenute Sella", "La Prevostura"]
});
APXF["it-loazzolo"] = pm({
  lede: "A sweet Moscato from late-harvested and dried grapes grown in the single commune of Loazzolo, aged at least two years.",
  cat: "DOC, white, sweet", rec: "DOC 1992", d: "DOC/Loazzolo",
  facts: [["Commune", "Loazzolo (Asti)"], ["Grape", "Moscato Bianco"], ["Yield", "5 t/ha; 13% natural"], ["Grape to wine", "55%"], ["Vineyards", "At least 4,000 vines/ha; no valley floors"], ["Harvest", "From 20 September, in successive pickings"], ["Ageing", "At least two years from 1 January after the harvest"], ["At release", "Total alcohol at least 15.5%, of which 11% fermented; residual sugar at least 50 g/L"]],
  place: "Steep, high hills at the edge of the Langa Astigiana.",
  rules: "One of the smallest DOCs in Italy.",
  glass: "Gold, apricot, honey and candied citrus with fresh acidity.",
  exam: "Loazzolo is a vendemmia tardiva / passito Moscato, not a sparkling one.",
  producers: ["Forteto della Luja"]
});
APXF["it-malvasia-di-casorzo-d-asti"] = pm({
  lede: "A sweet, aromatic red or rosé, often fizzy, from the Malvasia di Casorzo grape in the north of the Asti Monferrato.",
  cat: "DOC, red, rosé, sweet (still, sparkling, passito)", rec: "DOC 1968", d: "DOC/Malvasia di Casorzo d'Asti o Malvasia di Casorzo o Casorzo",
  facts: [["Also labelled", "Malvasia di Casorzo or Casorzo"], ["Grapes", "Malvasia di Casorzo at least 90%; Freisa, Grignolino, Barbera and other aromatic varieties up to 10%"], ["Communes", "Casorzo, Grana, Grazzano Badoglio (Asti); Vignale, Altavilla, Ottiglio, Olivola and others (Alessandria)"], ["Passito", "Total alcohol at least 15%, of which 10% fermented; residual sugar at least 50 g/L"]],
  place: "The hills between Asti and Casale Monferrato.",
  rules: "Grape to wine 70%.",
  glass: "Rose, strawberry and spice; sweet and low in alcohol.",
  exam: "A sweet aromatic red like Brachetto, but from a Malvasia.",
  producers: []
});
APXF["it-malvasia-di-castelnuovo-don-bosco"] = pm({
  lede: "Sweet, slightly sparkling red from Malvasia di Schierano around Castelnuovo Don Bosco.",
  cat: "DOC, red or rosé, sweet (also spumante)", rec: "DOC 1973", d: "DOC/Malvasia di Castelnuovo Don Bosco",
  facts: [["Communes", "Albugnano, Castelnuovo Don Bosco, Passerano Marmorito, Pino d'Asti, Berzano di San Pietro, Moncucco Torinese"], ["Grapes", "Malvasia di Schierano and/or Malvasia Nera Lunga 85 to 100%; Freisa up to 15%"], ["Alcohol", "Still: total 10.5%, of which 5.5 to 7% fermented. Spumante: total 11%, of which 6 to 7% fermented"]],
  place: "The hills of the Basso Monferrato near Turin.",
  rules: "Grape to wine 70% (7,700 l/ha).",
  glass: "Rose, strawberry and musk; sweet and frothy.",
  exam: "Castelnuovo Don Bosco is the birthplace of Saint John Bosco.",
  producers: []
});
APXF["it-monferrato"] = pm({
  lede: "The umbrella DOC of the Monferrato hills of Asti and Alessandria, for blends, Chiaretto, Casalese Cortese and varietal Dolcetto, Freisa and Nebbiolo.",
  cat: "DOC, red, white, rosé", rec: "DOC 1994", d: "DOC/Monferrato",
  amended: "Text as amended by DM 7 June 2019",
  facts: [["Types", "Bianco, Casalese Cortese, Chiaretto or Ciaret, rosso (also novello), Dolcetto, Freisa, Nebbiolo (also Superiore)"], ["Monferrato Nebbiolo", "12 months from 1 November; Superiore 18 months including 6 in wood"], ["Grape to wine", "70%"]],
  place: "The hills of the provinces of Asti and Alessandria.",
  rules: "Rosso and bianco from any suitable non-aromatic Piedmont varieties.",
  glass: "Varied: from light Chiaretto to oaked Barbera blends.",
  exam: "The 'Monferrato' umbrella sits beneath Barbera d'Asti, Barbera del Monferrato and the other local DOCs.",
  producers: []
});
APXF["it-nebbiolo-d-alba"] = pm({
  lede: "Varietal Nebbiolo from the Roero and parts of the Langhe outside the Barolo and Barbaresco zones, still or sparkling.",
  cat: "DOC, red, rosé sparkling", rec: "DOC 1970", d: "DOC/Nebbiolo d'Alba",
  facts: [["Grape", "Nebbiolo 100%"], ["Communes", "All of Canale, Castellinaldo, Corneliano d'Alba, Monticello d'Alba, Piobesi d'Alba, Priocca, Santa Vittoria d'Alba, Vezza d'Alba, Sinio, Govone and parts of others including Alba"], ["Yield", "9 t/ha (11.5% natural; Superiore 12%); spumante 11 t/ha"], ["Ageing", "12 months from 1 November, released from 1 November of the following year. Superiore 18 months including 6 in wood, released 1 May of the second year. Spumante and spumante rosé 6 months, released 1 May of the following year"], ["Total alcohol", "12%; Superiore 12.5%; spumante 11.5%"]],
  place: "Mostly the Roero side of the Tanaro, on sands and marls.",
  rules: "Ageing can take place in the provinces of Cuneo, Asti and Turin.",
  glass: "Perfumed, red-fruited Nebbiolo with softer tannin than Barolo.",
  exam: "100% Nebbiolo, unlike Langhe Nebbiolo (85%).",
  producers: ["Luciano Sandrone (Valmaggiore)", "Bruno Giacosa"]
});
APXF["it-piemonte"] = pm({
  lede: "The regional DOC covering the hills of Alessandria, Asti and Cuneo: a catch-all for blends, varietals from Barbera to Chardonnay and Moscato, and regional sparkling wine.",
  cat: "DOC, red, white, rosé, sparkling, passito", rec: "DOC 1994", d: "DOC/Piemonte",
  facts: [["Main types", "Bianco, rosso, rosato; Albarossa, Barbera, Bonarda, Brachetto, Bussanello, Cabernet, Chardonnay, Cortese, Croatina, Dolcetto, Freisa, Grignolino, Merlot, Moscato, Pinot Grigio, Pinot Nero, Riesling, Sauvignon, Syrah, Viognier; spumante types"], ["Grapes", "Bianco: Cortese, Chardonnay, Favorita, Erbaluce at least 60%. Rosso: Barbera, Nebbiolo, Dolcetto, Freisa, Croatina at least 60%"], ["Grape to wine", "70 to 75%; passito 50%"], ["Ageing", "Albarossa 12 months from 1 November; Freisa 4 months"]],
  place: "Hill vineyards of the three southern provinces.",
  rules: "Nebbiolo cannot be labelled as a Piemonte varietal; it appears only in blends. Piemonte Moscato and Brachetto are dry or sweet still wines.",
  glass: "Everything from simple Barbera to fruity Moscato.",
  exam: "Albarossa (Chatus, long misidentified as Nebbiolo di Dronero, crossed with Barbera) and Bussanello (Riesling Italico x Furmint) are modern crossings found here.",
  producers: []
});
APXF["it-pinerolese"] = pm({
  lede: "A DOC for the Alpine valleys around Pinerolo, south-west of Turin, with rare local grapes such as Doux d'Henry and the Ramìe of Pomaretto.",
  cat: "DOC, red, rosé", rec: "DOC 1996", d: "DOC/Pinerolese",
  amended: "Text as amended by DM 19 April 2024",
  facts: [["Types", "Rosso, rosato, Barbera (also Superiore), Bonarda, Freisa, Dolcetto, Doux d'Henry, Ramie, Nebbiolo"], ["Grapes", "Rosso: Barbera, Bonarda, Nebbiolo, Chatus at least 50%. Varietals at least 85%"], ["Pinerolese Nebbiolo", "12 months from 1 November"]],
  place: "The Chisone, Pellice and Germanasca valleys; Ramìe grows on terraces at Pomaretto.",
  rules: "Ramìe and Nebbiolo have their own smaller zones within the DOC.",
  glass: "Light, alpine reds.",
  exam: "Ramìe is a traditional field blend of local mountain grapes from the Pomaretto terraces.",
  producers: []
});
APXF["it-rubino-di-cantavenna"] = pm({
  lede: "A near-dormant DOC for a Barbera blend from Cantavenna and neighbouring villages in the Monferrato Casalese.",
  cat: "DOC, red", rec: "DOC 1970", d: "DOC/Rubino di Cantavenna",
  facts: [["Communes", "Gabiano (including Cantavenna), Moncestino, Villamiroglio, and the former commune of Castel San Pietro Monferrato"], ["Grapes", "Barbera 75 to 90%; Grignolino and Freisa up to 25%"], ["Yield", "10 t/ha; 11% natural"], ["Release", "After 31 December of the harvest year"], ["Total alcohol", "11.5%"]],
  place: "Hills above the Po north of Casale Monferrato.",
  rules: "Grape to wine 70%.",
  glass: "Light, rustic Barbera blend.",
  exam: "Production is very small.",
  producers: []
});
APXF["it-sizzano"] = pm({
  lede: "A Nebbiolo-Vespolina blend from the single commune of Sizzano in the Novara hills.",
  cat: "DOC, red", rec: "DOC 1969", d: "DOC/Sizzano",
  facts: [["Commune", "Sizzano"], ["Grapes", "Nebbiolo (Spanna) 50 to 70%; Vespolina and Uva Rara 30 to 50%; up to 10% other red"], ["Yield", "9 t/ha (11.5% natural); Riserva 8.1 t/ha (12%)"], ["Ageing", "22 months including 16 in wood; Riserva 34 months including 24 in wood"], ["Release", "1 September of the second year; Riserva the third"], ["Total alcohol", "12%"]],
  place: "Glacial terraces between Ghemme and Fara.",
  rules: "Vigna names permitted.",
  glass: "Cherry, pepper and herbs.",
  exam: "Same blend range as Fara.",
  producers: []
});
APXF["it-strevi"] = pm({
  lede: "A passito Moscato from the single commune of Strevi near Acqui, one of Italy's richest dessert wines at 20% total alcohol.",
  cat: "DOC, white, sweet (passito)", rec: "DOC 2005", d: "DOC/Strevi",
  facts: [["Commune", "Strevi (Alessandria)"], ["Grape", "Moscato Bianco 100%"], ["Yield", "6 t/ha; 12% natural (12.5% with vigna)"], ["Grape to wine", "50%"], ["Ageing", "Two years from 1 October of the harvest year"], ["At release", "Total alcohol at least 20%, of which 12.5% fermented (13% with vigna)"]],
  place: "The Bormida valley around Strevi; Strevi is also a subzone of the Asti DOCG.",
  rules: "Only the passito type.",
  glass: "Amber, apricot, honey, candied orange and fig.",
  exam: "Strevi is both a DOC (passito) and a subzone of Asti.",
  producers: []
});
APXF["it-valli-ossolane"] = pm({
  lede: "Piedmont's northernmost DOC, in the Ossola valleys near the Swiss border, for mountain Nebbiolo (locally Prünent), blends and a Chardonnay white.",
  cat: "DOC, red, white", rec: "DOC 2009", d: "DOC/Valli Ossolane",
  facts: [["Types", "Rosso, Nebbiolo, Nebbiolo Superiore, Bianco"], ["Grapes", "Rosso: Nebbiolo, Croatina, Merlot at least 60%. Bianco: Chardonnay at least 60%"], ["Yield", "8 t/ha; Nebbiolo Superiore 7 t/ha"], ["Nebbiolo Superiore", "13 months including 6 in wood, from 1 November"]],
  place: "Steep terraces in the Toce valley around Domodossola, province of Verbano-Cusio-Ossola.",
  rules: "Grape to wine 70%.",
  glass: "Pale, high-acid mountain Nebbiolo.",
  exam: "Prünent is the Ossola name for Nebbiolo.",
  producers: ["Cantine Garrone"]
});
APXF["it-valsusa"] = pm({
  lede: "Alpine reds and a white from the Susa valley west of Turin, from local grapes Avanà, Becuet and Baratuciat.",
  cat: "DOC, red, white", rec: "DOC 1997", d: "DOC/Valsusa",
  amended: "Text as amended by DM 7 August 2019",
  facts: [["Types", "Rosso, Avanà, Becuet, Baratuciat"], ["Grapes", "Rosso: Avanà, Barbera, Becuet, Dolcetto, Neretta Cuneese at least 60%. Varietals at least 85%"], ["Total alcohol", "11%"]],
  place: "Terraced vineyards in the valley that leads to the Fréjus and Montgenèvre passes.",
  rules: "Grape to wine 70%.",
  glass: "Light, fresh reds; Baratuciat is a crisp white.",
  exam: "Baratuciat is a white grape rescued from near extinction by local growers.",
  producers: []
});
APXF["it-verduno-pelaverga"] = pm({
  lede: "A pale, peppery red from Pelaverga Piccolo grown in Verduno at the northern edge of Barolo.",
  cat: "DOC, red", rec: "DOC 1995", d: "DOC/Verduno Pelaverga o Verduno",
  amended: "Text as amended by DM 17 April 2015",
  facts: [["Also labelled", "Verduno"], ["Zone", "All of Verduno; parts of La Morra and Roddi"], ["Grapes", "Pelaverga Piccolo at least 85%"], ["Yield", "9 t/ha; 10.5% natural"], ["Grape to wine", "70% (63 hl/ha)"], ["Release", "From 1 March after the harvest"], ["Total alcohol", "11%"]],
  place: "Verduno's terraces above the Tanaro, on Tortonian marls shared with Barolo.",
  rules: "Vigna names permitted.",
  glass: "Pale ruby, strawberry, white pepper and spice, light tannin.",
  exam: "Pelaverga Piccolo (Verduno) is not Pelaverga Grosso (Saluzzo).",
  producers: ["Castello di Verduno", "G.B. Burlotto", "Fratelli Alessandria"]
});

// ---------- Communes of Dogliani and Roero (label units, not separate appellations) ----------
APXF["it-dogliani-bastia-mondovi"] = pmDogl("Bastia Mondovì", true);
APXF["it-dogliani-belvedere-langhe"] = pmDogl("Belvedere Langhe", true);
APXF["it-dogliani-briaglia"] = pmDogl("Briaglia", true);
APXF["it-dogliani-carru"] = pmDogl("Carrù", false);
APXF["it-dogliani-castellino-tanaro"] = pmDogl("Castellino Tanaro", true);
APXF["it-dogliani-ciglie"] = pmDogl("Cigliè", true);
APXF["it-dogliani-clavesana"] = pmDogl("Clavesana", true);
APXF["it-dogliani-dogliani"] = pmDogl("Dogliani", true);
APXF["it-dogliani-farigliano"] = pmDogl("Farigliano", true);
APXF["it-dogliani-igliano"] = pmDogl("Igliano", true);
APXF["it-dogliani-marsaglia"] = pmDogl("Marsaglia", true);
APXF["it-dogliani-monchiero"] = pmDogl("Monchiero", true);
APXF["it-dogliani-mondovi"] = pmDogl("Mondovì", false);
APXF["it-dogliani-murazzano"] = pmDogl("Murazzano", false);
APXF["it-dogliani-niella-tanaro"] = pmDogl("Niella Tanaro", true);
APXF["it-dogliani-piozzo"] = pmDogl("Piozzo", true);
APXF["it-dogliani-rocca-ciglie"] = pmDogl("Rocca Cigliè", true);
APXF["it-dogliani-roddino"] = pmDogl("Roddino", false);
APXF["it-dogliani-san-michele-mondovi"] = pmDogl("San Michele Mondovì", false);
APXF["it-dogliani-somano"] = pmDogl("Somano", false);
APXF["it-dogliani-vicoforte"] = pmDogl("Vicoforte", false);
APXF["it-roero-baldissero-d-alba"] = pmRoero("Baldissero d'Alba", false);
APXF["it-roero-canale"] = pmRoero("Canale", true);
APXF["it-roero-castagnito"] = pmRoero("Castagnito", false);
APXF["it-roero-corneliano-d-alba"] = pmRoero("Corneliano d'Alba", true);
APXF["it-roero-govone"] = pmRoero("Govone", false);
APXF["it-roero-guarene"] = pmRoero("Guarene", false);
APXF["it-roero-magliano-alfieri"] = pmRoero("Magliano Alfieri", false);
APXF["it-roero-monta"] = pmRoero("Montà", false);
APXF["it-roero-montaldo-roero"] = pmRoero("Montaldo Roero", false);
APXF["it-roero-monteu-roero"] = pmRoero("Monteu Roero", false);
APXF["it-roero-monticello-d-alba"] = pmRoero("Monticello d'Alba", false);
APXF["it-roero-piobesi-d-alba"] = pmRoero("Piobesi d'Alba", true);
APXF["it-roero-pocapaglia"] = pmRoero("Pocapaglia", false);
APXF["it-roero-priocca"] = pmRoero("Priocca", false);
APXF["it-roero-santa-vittoria-d-alba"] = pmRoero("Santa Vittoria d'Alba", false);
APXF["it-roero-santo-stefano-roero"] = pmRoero("Santo Stefano Roero", false);
APXF["it-roero-sommariva-perno"] = pmRoero("Sommariva Perno", false);
APXF["it-roero-vezza-d-alba"] = pmRoero("Vezza d'Alba", true);
