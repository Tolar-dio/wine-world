// Full encyclopedia entries: Lazio. Written from each disciplinare di produzione (AIS copies).
function laSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Lazio/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function la(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [laSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-frascati-superiore"] = la({
  lede: "The top tier of Frascati, Rome's historic white from Malvasia on the volcanic Alban Hills, raised to DOCG in 2011 with lower yields and a Riserva.",
  cat: "DOCG, white", rec: "DOCG 2011 (DM 20 September 2011)", d: "DOCG/Frascati Superiore",
  facts: [["Grapes", "Malvasia Bianca di Candia and/or Malvasia del Lazio (Puntinata) at least 70%; Bellone, Bombino Bianco, Greco Bianco, Trebbiano Toscano, Trebbiano Giallo up to 30%"], ["Zone", "Frascati, Grottaferrata, Monte Porzio Catone and parts of Rome and Montecompatri"], ["Yield", "11 t/ha; 11.5% natural; grape to wine 70%"], ["Riserva", "At least 12 months from 1 November, including 3 in bottle"], ["Total alcohol", "12%; Riserva 13%"], ["Bottles", "Glass, 375 to 750 ml; vintage compulsory"]],
  place: "The north-western slopes of the extinct Alban volcano south-east of Rome: light, potassium-rich volcanic soils at 100 to 400 m.",
  rules: "Separates the better wines from the high-volume Frascati DOC (14 t/ha).",
  history: "Frascati was the everyday wine of Rome's osterie for centuries; the DOCG aimed to rebuild its standing after decades of volume production.",
  glass: "Pale straw, white flowers, apricot, almond, with a saline, gently bitter finish; Puntinata adds texture.",
  exam: "Malvasia del Lazio = Malvasia Puntinata; Frascati Superiore and Cannellino are DOCGs, Frascati is DOC.",
  producers: ["Castel de Paolis", "Fontana Candida", "Poggio Le Volpi", "Villa Simone", "Casale Marchese", "Principe Pallavicini"]
});
APXF["it-cannellino-di-frascati"] = la({
  lede: "The sweet Frascati, traditionally from late-picked, sometimes botrytised grapes, a DOCG since 2011.",
  cat: "DOCG, sweet white", rec: "DOCG 2011 (DM 20 September 2011)", d: "DOCG/Cannellino di Frascati",
  facts: [["Grapes", "As Frascati Superiore: Malvasia (Candia and/or Puntinata) at least 70%"], ["Yield", "11 t/ha; 12% natural; grape to wine 65%"], ["Residual sugar", "At least 35 g/l"], ["Total alcohol", "12.5%"], ["Bottles", "Glass, 375 to 750 ml"]],
  place: "The Frascati zone.", rules: "No dried grapes are needed: the sweetness comes from overripe grapes on the vine.",
  history: "The name recalls the third, latest pass through the vineyard, when grapes were overripe and often touched by noble rot.",
  glass: "Golden, honey, apricot, candied citrus, balanced by Malvasia's acidity.",
  exam: "Cannellino = sweet Frascati, DOCG.", producers: ["Fontana Candida", "Villa Simone", "Principe Pallavicini"]
});
APXF["it-frascati"] = la({
  lede: "The volume level of Frascati: the classic carafe white of Rome, also made sparkling.",
  cat: "DOC, white (still, spumante)", rec: "DOC 1966 (DPR 3 March 1966), one of Italy's first", d: "DOC/Frascati",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grapes", "Malvasia Bianca di Candia and/or Malvasia del Lazio at least 70%; Bellone, Bombino, Greco, Trebbianos up to 30%"], ["Yield", "14 t/ha; 11% natural (spumante base 10%)"], ["Total alcohol", "11.5%"]],
  place: "The Alban Hills communes of Frascati, Grottaferrata, Monte Porzio Catone and parts of Rome and Montecompatri.", rules: "Superiore and Cannellino were split off as DOCGs in 2011.",
  glass: "Light, fresh, almond.", exam: "Among the first DOCs of 1966.", producers: ["Fontana Candida", "Casale Marchese"]
});
APXF["it-cesanese-del-piglio"] = la({
  lede: "Lazio's only red DOCG: Cesanese from the hills of Piglio in the Ciociaria, east of Rome.",
  cat: "DOCG, red", rec: "DOC 1973; DOCG 2008 (DM 1 August 2008)", d: "DOCG/Cesanese del Piglio o Piglio",
  facts: [["Also labelled", "Piglio"], ["Grapes", "Cesanese di Affile and/or Cesanese Comune at least 90%"], ["Zone", "All of Piglio and Serrone and parts of Acuto, Anagni and Paliano (Frosinone)"], ["Yields", "11 t/ha; Superiore 9 t/ha; grape to wine 65%"], ["Release", "From 1 February after the harvest; Superiore from 1 July"], ["Riserva", "Superiore aged at least 20 months, 6 in bottle, with 14% total alcohol"], ["Total alcohol", "12%; Superiore 13%"]],
  place: "Hills of volcanic and limestone-clay soils in the Sacco valley at 300 to 600 m.",
  rules: "Ageing and bottling for the Riserva are also allowed in nearby communes such as Affile, Olevano Romano and Genazzano.",
  glass: "Ruby, red cherry, pepper, rose, soft tannin.",
  exam: "Lazio's only red DOCG; Cesanese di Affile is the finer biotype.",
  producers: ["Casale della Ioria", "Coletti Conti", "Corte dei Papi", "Petrucca e Vela", "Marcella Giuliani"]
});
APXF["it-cesanese-di-affile"] = la({
  lede: "Cesanese di Affile from the mountain commune of Affile and its neighbours.",
  cat: "DOC, red (dry, sweet, riserva)", rec: "DOC 1973 (DPR 29 May 1973)", d: "DOC/Cesanese di Affile o Affile",
  facts: [["Also labelled", "Affile"], ["Grape", "Cesanese di Affile at least 90%"], ["Natural alcohol", "12%"], ["Grape to wine", "65%"], ["Riserva", "24 months from 1 November, 6 in wood; total 13%"], ["Dolce", "Total alcohol 9% actual minimum on release"]],
  place: "High hills of the Aniene valley, east of Rome.", rules: "Tiny production.", glass: "Fine, spicy, red-fruited.", exam: "Cesanese di Affile is a biotype, not the same as Cesanese Comune.", producers: []
});
APXF["it-cesanese-di-olevano-romano"] = la({
  lede: "Cesanese from Olevano Romano and Genazzano, dry, sweet or lightly sparkling.",
  cat: "DOC, red", rec: "DOC 1973 (DPR 29 May 1973)", d: "DOC/Cesanese di Olevano Romano o Olevano Romano",
  facts: [["Also labelled", "Olevano Romano"], ["Grapes", "Cesanese Comune and/or Cesanese di Affile at least 85%"], ["Types", "Secco, amabile, dolce, dolce frizzante, superiore, riserva"], ["Riserva", "At least 24 months"], ["Grape to wine", "65%"], ["Dolce", "At least 45 g/l sugar"]],
  place: "Volcanic and limestone slopes around Olevano Romano.", rules: "Superiore 12% natural.", glass: "Supple, cherry and spice.", exam: "One of three Cesanese denominations.", producers: ["Damiano Ciolli"]
});
APXF["it-est-est-est-di-montefiascone"] = la({
  lede: "The white of Montefiascone above Lake Bolsena, named for a medieval legend of a bishop's taster who chalked 'Est!' on inns with good wine.",
  cat: "DOC, white (still, spumante)", rec: "DOC 1966 (DPR 3 March 1966)", d: "DOC/Est! Est!! Est!!! di Montefiascone",
  amended: "Text as amended by DM 26 October 2018",
  facts: [["Grapes", "Trebbiano Toscano (Procanico) 50 to 65%; Trebbiano Giallo (Rossetto) 5 to 40%; Malvasia Bianca Lunga and/or Malvasia del Lazio 10 to 20%"], ["Zone", "Montefiascone, Bolsena, San Lorenzo Nuovo, Grotte di Castro, Gradoli, Capodimonte and Marta (Viterbo)"], ["Classico", "The oldest part of Montefiascone and Bolsena"], ["Total alcohol", "10.5% to 11.5% by type"]],
  place: "Volcanic slopes around the crater lake of Bolsena in northern Lazio.", rules: "Grape to wine 70%.",
  history: "The legend: the servant Martino, sent ahead of Bishop Johannes Fugger, found the wine so good at Montefiascone he wrote the word three times.",
  glass: "Light, citrus, almond.", exam: "The legend and the Procanico base.", producers: ["Falesco", "Cantina di Montefiascone"]
});
APXF["it-aleatico-di-gradoli"] = la({
  lede: "Sweet and fortified red from Aleatico on the volcanic shores of Lake Bolsena.",
  cat: "DOC, sweet red (still, passito, liquoroso)", rec: "DOC 1972 (DPR 21 June 1972)", d: "DOC/Aleatico di Gradoli",
  facts: [["Grape", "Aleatico at least 95%"], ["Zone", "Gradoli, Grotte di Castro, San Lorenzo Nuovo and part of Latera (Viterbo)"], ["Types", "Aleatico, Liquoroso, Liquoroso Riserva, Passito"], ["Liquoroso Riserva", "At least two years in wood from fortification"], ["Total alcohol", "Still 12%; Passito 16%; Liquoroso 17.5%, 15% actual"]],
  place: "North-west of Lake Bolsena.", rules: "Passito grape to wine 45%.", glass: "Rose, cherry, sweet spice.", exam: "Aleatico = aromatic red.", producers: []
});
APXF["it-roma"] = la({
  lede: "A DOC created in 2011 for the province of Rome, for Montepulciano-based reds, Malvasia Puntinata whites and the sparkling Romanella.",
  cat: "DOC, red, white, rosé, sparkling", rec: "DOC 2011 (DM 2 August 2011)", d: "DOC/Roma",
  amended: "Text as amended by an EU implementing regulation",
  facts: [["Rosso", "Montepulciano at least 50%; Cesanese, Sangiovese, Cabernets, Syrah complete it"], ["Bianco", "Malvasia Puntinata based"], ["Types", "Bianco and Rosso (also amabile), Rosso Riserva, Rosato, Romanella spumante, Malvasia Puntinata, Bellone"], ["Classico", "For the oldest zone (not for Romanella)"], ["Release", "Bianco and Romanella from 15 March; Rosso from 31 March after harvest"]],
  place: "The province of Rome from the coast to the hills.", rules: "Grape to wine 70%.", glass: "Fruity Montepulciano reds; textured Malvasia whites.", exam: "Young DOC (2011) for the capital.", producers: ["Poggio Le Volpi", "Federici"]
});
APXF["it-castelli-romani"] = la({
  lede: "A broad DOC covering the Alban Hills for simple whites, reds and rosés.",
  cat: "DOC, white, red, rosé", rec: "DOC 1996 (DM 4 November 1996)", d: "DOC/Castelli Romani",
  facts: [["Bianco", "Malvasia (Candia and Puntinata) and Trebbiano"], ["Styles", "Secco, amabile, frizzante; also red novello"], ["Natural alcohol", "10%"], ["Grape to wine", "73% white; 70% red"]],
  place: "The Castelli Romani hill towns south-east of Rome.", rules: "Grape to wine generally 70%.", glass: "Everyday wines.", exam: "Umbrella DOC over the Alban Hills.", producers: []
});
APXF["it-colli-albani"] = la({
  lede: "White wine from the slopes around Lake Albano and Castel Gandolfo.",
  cat: "DOC, white", rec: "DOC 1970 (DPR 6 August 1970)", d: "DOC/Colli Albani",
  facts: [["Grapes", "Malvasia Bianca di Candia up to 60%; Trebbianos and other whites"], ["Types", "Colli Albani, novello, spumante, superiore"], ["Yield", "16.5 t/ha"], ["Natural alcohol", "10%; Superiore 11%"]],
  place: "Volcanic slopes around Lake Albano.", rules: "Grape to wine 70%.", glass: "Light whites.", exam: "Minor Alban Hills DOC.", producers: []
});
APXF["it-colli-lanuvini"] = la({
  lede: "Whites and reds from the hills of Lanuvio and Genzano on the Alban Hills.",
  cat: "DOC, white, red", rec: "DOC 1971 (DPR 8 February 1971)", d: "DOC/Colli Lanuvini",
  facts: [["Types", "Bianco (also superiore, spumante); Rosso (also superiore, riserva)"], ["Riserva", "Rosso with 13% total alcohol after ageing"]],
  place: "Southern Alban Hills.", rules: "Grape to wine generally 70%.", glass: "Malvasia-based whites.", exam: "Minor DOC.", producers: []
});
APXF["it-marino"] = la({
  lede: "Malvasia-based whites from Marino on the Alban Hills, dry to sweet, with late-harvest and passito versions and a Classico zone.",
  cat: "DOC, white", rec: "DOC 1970 (DPR 6 August 1970)", d: "DOC/Marino",
  amended: "Text as amended by DM 6 December 2016",
  facts: [["Types", "Secco to dolce, superiore, frizzante, spumante, vendemmia tardiva, passito; varietals Malvasia del Lazio, Trebbiano Verde (Verdicchio), Greco, Bellone"], ["Classico", "For the oldest zone"], ["Vendemmia tardiva", "Grapes overripe on the vine to 13%, picked in early November; aged 8 months (6 in cask) from 1 March, released from 1 November; total 15%"], ["Passito", "Grape to wine 45%; total 15%, 12% actual"]],
  place: "Volcanic slopes around Marino and Lake Albano.", rules: "Grape to wine generally 70%.", glass: "Saline Malvasia whites.", exam: "Trebbiano Verde = Verdicchio.", producers: ["Paola Di Mauro (Colle Picchioni)", "Gotto d'Oro"]
});
APXF["it-montecompatri-colonna"] = la({
  lede: "Malvasia-Trebbiano whites from Montecompatri and Colonna on the Alban Hills.",
  cat: "DOC, white", rec: "DOC 1973 (DPR 29 May 1973)", d: "DOC/Montecompatri - Colonna o Montecompatri o Colonna",
  facts: [["Also labelled", "Montecompatri or Colonna"], ["Types", "Bianco, frizzante, superiore"], ["Yield", "15 t/ha"], ["Natural alcohol", "10.5%; Superiore 11.5%"]],
  place: "North-eastern Alban Hills.", rules: "Grape to wine generally 70%.", glass: "Light whites.", exam: "Minor DOC.", producers: []
});
APXF["it-zagarolo"] = la({
  lede: "Malvasia-Trebbiano white from the hills of Zagarolo, east of the Alban Hills.",
  cat: "DOC, white", rec: "DOC 1973 (DPR 29 May 1973)", d: "DOC/Zagarolo",
  facts: [["Grapes", "Malvasia (Candia and Puntinata) up to 70%; Trebbiano at least 30%"], ["Yield", "15 t/ha"], ["Natural alcohol", "11%; Superiore 12%"], ["Grape to wine", "72%"]],
  place: "East of the Alban Hills.", rules: "Grape to wine generally 70%.", glass: "Simple whites.", exam: "Minor DOC.", producers: []
});
APXF["it-velletri"] = la({
  lede: "Whites and Montepulciano-Sangiovese-Cesanese reds from Velletri on the southern Alban Hills.",
  cat: "DOC, white, red, sparkling", rec: "DOC 1972 (DPR 31 March 1972)", d: "DOC/Velletri",
  facts: [["Bianco", "Malvasia up to 70%; Trebbiano at least 30%"], ["Types", "Bianco, Rosso, Superiore, Riserva, Spumante"], ["Riserva", "2 years from 1 November"], ["Spumante", "At least 6 months on the lees"]],
  place: "Southern slopes of the Alban Hills toward the Pontine plain.", rules: "Grape to wine generally 70%.", glass: "Medium reds; light whites.", exam: "Minor DOC.", producers: []
});
APXF["it-genazzano"] = la({
  lede: "Malvasia whites and Ciliegiolo reds from Genazzano east of Rome.",
  cat: "DOC, white, red", rec: "DOC 1992 (DM 26 June 1992)", d: "DOC/Genazzano",
  facts: [["Bianco", "Malvasia di Candia at least 85%"], ["Rosso", "Ciliegiolo at least 85%"], ["Grape to wine", "Red 65%"]],
  place: "Hills of Genazzano and neighbours.", rules: "Grape to wine generally 70%.", glass: "Fresh Ciliegiolo.", exam: "Minor DOC.", producers: []
});
APXF["it-bianco-capena"] = la({
  lede: "Malvasia-Trebbiano white from the Tiber valley north of Rome.",
  cat: "DOC, white", rec: "DOC 1975 (DPR 19 May 1975)", d: "DOC/Bianco Capena",
  facts: [["Grapes", "Malvasia up to 55%; Trebbiano at least 25%; Bellone and Bombino may join"], ["Yield", "16 t/ha"], ["Natural alcohol", "10.5%; Superiore 11.5%"]],
  place: "Hills around Capena.", rules: "Grape to wine 70%.", glass: "Light whites.", exam: "Minor DOC.", producers: []
});
APXF["it-cerveteri"] = la({
  lede: "Whites and Montepulciano-Sangiovese reds from the Etruscan coast north-west of Rome.",
  cat: "DOC, white, red, rosé", rec: "DOC 1974 (DPR 30 October 1974)", d: "DOC/Cerveteri",
  facts: [["Types", "Bianco (also amabile, frizzante), Rosso (also amabile), Rosato (also frizzante), Trebbiano or Procanico"], ["Yields", "Whites 14 t/ha; reds 13"]],
  place: "Coastal hills around the Etruscan necropolis of Cerveteri.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-tarquinia"] = la({
  lede: "Whites and reds from the Etruscan coast of Tarquinia, overlapping Cerveteri.",
  cat: "DOC, white, red, rosé", rec: "DOC 1996 (DM 9 August 1996)", d: "DOC/Tarquinia",
  facts: [["Types", "Bianco (also amabile, frizzante), Rosso (also amabile, novello), Rosato"], ["Total alcohol", "10.5% to 11%"]],
  place: "Coastal Lazio from Tarquinia to Rome's northern edge.", rules: "Grape to wine 70%.", glass: "Light wines.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-etruschi-viterbesi"] = la({
  lede: "A province-wide DOC for Viterbo, with many local varietals such as Rossetto, Violone (Montepulciano), Greghetto and Moscatello.",
  cat: "DOC, white, red, rosé", rec: "DOC 1996 (DM 11 September 1996)", d: "DOC/Colli Etruschi Viterbese o Tuscia",
  facts: [["Also labelled", "Tuscia"], ["Varietals", "Procanico, Grechetto, Rossetto, Moscatello, Greghetto, Sangiovese, Violone, Canaiolo, Merlot"], ["Natural alcohol", "9.5% to 10%"]],
  place: "The volcanic Tuscia of northern Lazio.", rules: "Moscatello passito grape to wine 45%.", glass: "Light, local wines.", exam: "Violone = Montepulciano; Greghetto = Sangiovese.", producers: []
});
APXF["it-vignanello"] = la({
  lede: "Whites, Greco and reds from the Cimini hills around Vignanello.",
  cat: "DOC, white, red, sweet, sparkling", rec: "DOC 1992 (DM 14 November 1992)", d: "DOC/Vignanello",
  facts: [["Types", "Bianco (also superiore, vendemmia tardiva), Greco (also spumante, vendemmia tardiva), Rosso (also novello, riserva)"], ["Yields", "Bianco 14 t/ha; Greco 11; Rosso 13; late harvest 7"], ["Riserva", "Two years"]],
  place: "Volcanic hills south-east of Viterbo.", rules: "Late-harvest grape to wine 65%.", glass: "Fresh Greco.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-della-sabina"] = la({
  lede: "Whites and Sangiovese-Montepulciano reds from the Sabine hills north-east of Rome.",
  cat: "DOC, white, red", rec: "DOC 1996 (DM 10 September 1996)", d: "DOC/Colli della Sabina",
  facts: [["Bianco", "Malvasia del Lazio at least 50%; Trebbiano 5 to 35%"], ["Rosso", "Sangiovese-based"], ["Natural alcohol", "10.5% white; 11.5% red"]],
  place: "The Sabina hills, famous for olive oil.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-cori"] = la({
  lede: "Bellone whites and Nero Buono reds from Cori on the Lepini mountains.",
  cat: "DOC, white, red", rec: "DOC 1971 (DPR 11 August 1971)", d: "DOC/Cori",
  facts: [["Bianco", "Bellone at least 50%; Malvasia del Lazio at least 20%; Greco at least 15%"], ["Rosso", "Nero Buono at least 50%; Montepulciano at least 20%; Cesanese at least 15%"], ["Varietals", "Bellone and Nero Buono (also riserva) at 12 t/ha"], ["Total alcohol", "11% to 12%; Nero Buono riserva 13%"]],
  place: "Hills of the Monti Lepini above the Pontine plain.", rules: "Nero Buono grape to wine 65%.", glass: "Nero Buono: dark, plum, soft.", exam: "Nero Buono di Cori is a rare local red.", producers: ["Marco Carpineti", "Cincinnato"]
});
APXF["it-aprilia"] = la({
  lede: "Plain wines of the reclaimed Pontine marshes around Aprilia.",
  cat: "DOC, white, red, rosé", rec: "DOC 1966 (DPR 13 May 1966)", d: "DOC/Aprilia",
  facts: [["Types", "Bianco, Rosso, Rosato, Merlot di Aprilia"], ["Bianco", "Trebbiano Toscano at least 50%; Chardonnay 5 to 35%"]],
  place: "The reclaimed Pontine marshes, drained in the 1930s and settled by families from northern Italy.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-nettuno"] = la({
  lede: "Bellone (locally Cacchione) whites from sandy soils on the coast at Nettuno.",
  cat: "DOC, white, red, rosé", rec: "DOC 2003 (DM 8 May 2003)", d: "DOC/Nettuno",
  facts: [["Bianco", "Bellone (Cacchione) 30 to 70%; Trebbiano Toscano 30 to 50%"], ["Types", "Bianco and Bellone (also frizzante), Rosso, Rosato, Novello"]],
  place: "Coastal sands south of Anzio.", rules: "Grape to wine generally 70%.", glass: "Fresh, saline Bellone.", exam: "Cacchione = Bellone.", producers: []
});
APXF["it-circeo"] = la({
  lede: "Coastal wines from around Monte Circeo, the promontory of Circe's legend.",
  cat: "DOC, white, red, rosé", rec: "DOC 1996 (DM 14 June 1996)", d: "DOC/Circeo",
  facts: [["Types", "Bianco (also frizzante, spumante), Rosso (also novello, frizzante), Rosato, Trebbiano, Merlot, Sangiovese"], ["Yields", "Whites 13 t/ha; reds 12"], ["Riserva", "Reds at 12.5% after 2 years, 6 months in wood"]],
  place: "The coast and plain near Sabaudia and San Felice Circeo.", rules: "Grape to wine 70% white, 65% red.", glass: "Light wines.", exam: "Minor DOC.", producers: []
});
APXF["it-terracina"] = la({
  lede: "Moscato di Terracina, an aromatic local Moscato, dry, off-dry, sparkling or passito.",
  cat: "DOC, white (secco, amabile, passito, spumante)", rec: "DOC 2007 (DM 25 May 2007)", d: "DOC/Terracina o Moscato di Terracina",
  facts: [["Also labelled", "Moscato di Terracina"], ["Grape", "Moscato di Terracina at least 85%"], ["Yield", "11 t/ha; 11% natural"], ["Passito", "15.5% natural after drying; grape to wine 40%"]],
  place: "The coast around Terracina, south of the Pontine plain.", rules: "Grape to wine generally 70%.", glass: "Grapey, floral.", exam: "Moscato di Terracina is a distinct variety.", producers: ["Sant'Andrea"]
});
APXF["it-atina"] = la({
  lede: "Bordeaux-variety reds and a Sémillon white from the Comino valley in southern Lazio.",
  cat: "DOC, red, white", rec: "DOC 1999 (DM 26 April 1999)", d: "DOC/Atina",
  facts: [["Rosso", "Cabernet Sauvignon at least 50%; Syrah, Merlot and Cabernet Franc at least 10% each"], ["Types", "Rosso, Cabernet (also riserva), Semillon (at least 85%)"], ["Riserva", "2 years, 6 months in wood, from 1 November"]],
  place: "The Val di Comino in Frosinone province.", rules: "French varieties have a long local history here; Sémillon is unusual in Italy.", glass: "Structured Cabernet blends.", exam: "Unusual French-variety DOC in Lazio.", producers: []
});
// HISTORY-PASS-START
(function(){
const LAMB=`Pliny the Elder wrote of the 'vitis labrusca', the wild vine climbing at the edges of fields, which gave Lambrusco its name. Cleto Chiarli founded the first Lambrusco house in Modena in 1860, and in the 1970s and 1980s the cooperative Riunite made sweet Lambrusco one of the best-selling imported wines in the United States.`;
const VERD=`Jesi, the town where Emperor Frederick II was born in 1194 in a tent in the main square, is ringed by the fortified hill villages (castelli) that give the zone its name.`;
const CAST=`The Castelli Romani, the volcanic Alban Hills south-east of Rome, have supplied the city with wine since antiquity; popes and noble families built summer villas there, and Roman taverns served the wine young, from the barrel.`;
const MONT=`Montepulciano, the grape, has no link with the Tuscan town; it has been grown in Abruzzo since at least the eighteenth century, often on the high pergola abruzzese.`;
const HX={
// Emilia-Romagna
"it-romagna-albana":[`<p>Legend says Galla Placidia, the fifth-century empress, was offered Albana in a rough terracotta cup at Bertinoro and said it deserved to be drunk in gold, 'berti in oro', which gave the town its name. Bertinoro is also known for its column of hospitality, from which, in the Middle Ages, families competed to host travellers. In 1987 Albana became Italy's first DOCG for a white wine, a choice criticised because the wine was then little known, but its sweet passito versions have since shown its quality.</p>`,[]],
"it-colli-bolognesi-classico-pignoletto":[`<p>Pignoletto, a form of Grechetto, has long grown in the hills south-west of Bologna; some link it to the 'pino laeto' praised by Pliny. The Classico area became a DOCG in 2010.</p>`,[]],
"it-lambrusco-di-sorbara":[`<p>${LAMB} Sorbara, north of Modena, makes the palest, most fragrant Lambrusco; its vines flower poorly and are traditionally interplanted with Salamino to pollinate them. The DOC dates from 1970.</p>`,[]],
"it-lambrusco-grasparossa-di-castelvetro":[`<p>${LAMB} Grasparossa takes its name from its stalks, which turn red in autumn, and grows in the hills south of Modena around Castelvetro, giving the darkest, most tannic Lambrusco. The DOC dates from 1970.</p>`,[]],
"it-lambrusco-salamino-di-santa-croce":[`<p>${LAMB} Salamino takes its name from its bunch, shaped like a small salami, and Santa Croce from a hamlet of Carpi. The DOC dates from 1970.</p>`,[]],
"it-modena":[`<p>Modena, the city of balsamic vinegar, which is made from cooked grape must, gained a provincial DOC in 2009.</p>`,[]],
"it-reggiano":[`<p>The Riunite cooperative, founded in Reggio Emilia in 1950, built its Lambrusco into a mass export. The DOC began as Lambrusco Reggiano in 1971 and became Reggiano in 1996.</p>`,[]],
"it-colli-di-scandiano-e-di-canossa":[`<p>At Canossa in January 1077 Emperor Henry IV stood in the snow for three days to beg forgiveness from Pope Gregory VII, a guest of Countess Matilda, whose castle ruins still stand. The hills around it grow Spergola, a local white grape. The DOC began as Bianco di Scandiano in 1976.</p>`,[]],
"it-colli-di-parma":[`<p>The hills south of Parma, the land of Parma ham and Parmigiano, grow Malvasia di Candia for lightly sparkling whites. The DOC dates from 1982.</p>`,[]],
"it-colli-piacentini":[`<p>The Trebbia valley above Piacenza was the site of Hannibal's first great victory over Rome in 218 BC. Its hills, long tied to the duchy of Parma and Piacenza, became a DOC in stages from 1967.</p>`,[]],
"it-gutturnio":[`<p>Gutturnio is named after a Roman silver drinking vessel (gutturnium) found in the area in the nineteenth century. Its blend of Barbera and Croatina (here called Bonarda) became a type of the Colli Piacentini in 1967 and its own DOC in 2010.</p>`,[]],
"it-ortrugo-dei-colli-piacentini":[`<p>Ortrugo, whose name may mean 'other grape' in dialect, was long used only for blending, until Luigi Mossi and other producers bottled it alone from the 1970s. The DOC dates from 2010.</p>`,[]],
"it-colli-bolognesi":[`<p>The hills south of Bologna became a DOC in 1975; the Bologna wine fairs and the university made it a market for the region's wines.</p>`,[]],
"it-reno":[`<p>The Reno DOC, created in 1987, follows the plain of the Reno river around Bologna.</p>`,[]],
"it-bosco-eliceo":[`<p>The Bosco Eliceo, the holm-oak (elce) forests on the coastal sands near Comacchio, is home to Fortana, a red grape that local legend says Renée of France, duchess of Ferrara, brought from Burgundy in the sixteenth century. The vines grow on sand, where phylloxera cannot survive. The DOC dates from 1989.</p>`,[]],
"it-romagna":[`<p>Romagna, the land of the Byzantine exarchate of Ravenna and later of the Papal States, has made Sangiovese for centuries. The Romagna DOC of 2011 brought the region's earlier DOCs together and recognised named subzones such as Modigliana, Brisighella, Bertinoro and Predappio.</p>`,[]],
"it-colli-di-rimini":[`<p>The hills behind Rimini, the Malatesta lords' city, became a DOC in 1996.</p>`,[]],
"it-colli-d-imola":[`<p>The hills around Imola became a DOC in 1997.</p>`,[]],
"it-colli-di-faenza":[`<p>Faenza, whose pottery gave the word 'faience' to European languages, gained a DOC in 1997.</p>`,[]],
"it-colli-romagna-centrale":[`<p>The hills between Forlì and Cesena became a DOC in 2001.</p>`,[]],
// Liguria
"it-cinque-terre":[`<p>The five villages of the Cinque Terre built thousands of kilometres of dry-stone terraces above the sea over centuries; Boccaccio mentioned the Vernaccia of Corniglia in the Decameron. Grapes were once carried down by hand or by boat, and small monorail carts now climb the slopes. The landscape, with Porto Venere, became a UNESCO site in 1997. The DOC, from 1973, includes the sweet Sciacchetrà from dried grapes.</p>`,[]],
"it-colli-di-luni":[`<p>Luni, the Roman port of Luna, shipped Carrara marble across the empire; the hills behind its ruins, straddling Liguria and Tuscany, grow Vermentino. The DOC dates from 1989.</p>`,[]],
"it-colline-di-levanto":[`<p>Levanto, just north of the Cinque Terre, became a DOC in 1995.</p>`,[]],
"it-portofino":[`<p>The vineyards around Portofino and the Golfo del Tigullio became a DOC in 1997.</p>`,[]],
"it-val-polcevera":[`<p>The Val Polcevera behind Genoa grew the wine of the Genoese Republic; its Bianchetta Genovese and Coronata have their own mentions. The DOC dates from 1999.</p>`,[]],
"it-riviera-ligure-di-ponente":[`<p>The western Riviera, around Albenga, is home to Pigato, a white grape whose name comes from the freckles (pighe) on its skin, and to Vermentino. The DOC dates from 1988.</p>`,[]],
"it-rossese-di-dolceacqua":[`<p>Dolceacqua, below the castle of the Doria family, is famous for its humpbacked medieval bridge, which Claude Monet painted in 1884. Its Rossese became Liguria's first DOC in 1972.</p>`,[]],
"it-pornassio":[`<p>Ormeasco, the local Dolcetto of the upper Arroscia valley, is said to have been introduced around 1300 by the marquises of Clavesana, who ordered its planting. Pornassio became a DOC in 2003.</p>`,[]],
// Valle d'Aosta
"it-valle-d-aosta":[`<p>The Romans founded Augusta Praetoria (Aosta) in 25 BC to guard the Alpine passes, and the valley later belonged to the House of Savoy, which explains its French culture and grape names. Its vines climb terraces from Donnas, at the valley's mouth, to Morgex and La Salle, where Prié Blanc grows on its own roots at up to about 1,200 metres, among Europe's highest vineyards. Donnas was the first DOC in 1971, and the regional DOC of 1985 brought together named areas such as Enfer d'Arvier, Torrette and Chambave. The regional agricultural institute (Institut Agricole Régional) and growers such as Costantino Charrère revived local grapes like Petit Rouge, Fumin, Cornalin and Petite Arvine.</p>`,[]],
// Marche
"it-verdicchio-dei-castelli-di-jesi":[`<p>${VERD} In 1953 Fazi Battaglia launched Verdicchio in an amphora-shaped bottle chosen in a design competition, and it became one of Italy's best-known whites abroad, though the bottle later made it hard to take seriously. From the 1980s producers such as Bucci, Garofoli and Umani Ronchi showed that Verdicchio could age for decades. The DOC dates from 1968.</p>`,[]],
"it-verdicchio-dei-castelli-di-jesi-classico":[`<p>${VERD} The Classico area, the historic heart of the zone, has been part of the DOC since 1968.</p>`,[]],
"it-castelli-di-jesi-verdicchio-riserva":[`<p>${VERD} The Riserva, with longer ageing, became a DOCG in 2010.</p>`,[]],
"it-verdicchio-di-matelica":[`<p>Matelica lies in a high inland valley that runs north to south, the only one in the Marche not opening to the sea, which gives its Verdicchio a cooler, more austere character. The DOC dates from 1967.</p>`,[]],
"it-verdicchio-di-matelica-riserva":[`<p>Matelica's Riserva became a DOCG in 2010.</p>`,[]],
"it-conero":[`<p>Monte Conero, a limestone promontory south of Ancona, rises straight from the sea. Its Montepulciano reds became the Rosso Cònero DOC in 1967, and producers such as Garofoli, Umani Ronchi and Moroder built their reputation; the Riserva became a DOCG in 2004.</p>`,[]],
"it-rosso-conero":[`<p>Rosso Cònero, from Montepulciano on the slopes of Monte Conero, became a DOC in 1967.</p>`,[]],
"it-lacrima-di-morro":[`<p>Lacrima, 'tear', takes its name from its thin-skinned berries that split and weep juice. Local legend says Frederick Barbarossa drank it while besieging Ancona in 1167. The grape nearly disappeared before the DOC of 1985 revived it.</p>`,[]],
"it-offida":[`<p>Offida, a hill town known for its bobbin lace, is home to Pecorino, a white grape that had nearly vanished until Guido Cocci Grifoni found old vines in the mountains near Arquata del Tronto in the early 1980s and replanted it. Offida became a DOCG in 2011.</p>`,[]],
"it-terre-di-offida":[`<p>The Terre di Offida DOC, from 2001, covers sparkling and sweet Passerina.</p>`,[]],
"it-falerio":[`<p>Falerio takes its name from the Roman town of Falerio Picenus, whose ruins lie near Falerone. The DOC dates from 1975.</p>`,[]],
"it-rosso-piceno":[`<p>The Piceni, the people who lived in the Marche before Rome, give their name to this red of Montepulciano and Sangiovese, a DOC from 1968.</p>`,[]],
"it-vernaccia-di-serrapetrona":[`<p>Vernaccia Nera at Serrapetrona is made into a sparkling red through three fermentations, part of the grapes being dried. The tradition nearly died out before producers such as Alberto Quacquarini revived it, and it became a DOCG in 2004.</p>`,[]],
"it-serrapetrona":[`<p>The Serrapetrona DOC, from 2004, covers the still red of Vernaccia Nera.</p>`,[]],
"it-i-terreni-di-sanseverino":[`<p>San Severino Marche, a town of Roman origin in the Potenza valley, gained a DOC in 2004.</p>`,[]],
"it-san-ginesio":[`<p>San Ginesio, a walled hill town facing the Sibillini mountains, gained a DOC in 2007.</p>`,[]],
"it-colli-maceratesi":[`<p>The hills of Macerata grow Ribona (Maceratino), a local white grape. The DOC dates from 1975.</p>`,[]],
"it-esino":[`<p>The Esino DOC, from 1995, follows the valley of the Esino river around Jesi.</p>`,[]],
"it-bianchello-del-metauro":[`<p>On the Metauro river in 207 BC the Romans defeated and killed Hasdrubal, Hannibal's brother, as he brought reinforcements to Italy; local legend says his soldiers drank too much Bianchello before the battle. The DOC dates from 1969.</p>`,[]],
"it-colli-pesaresi":[`<p>The hills around Pesaro, the birthplace of Rossini, became a DOC in 1972.</p>`,[]],
"it-pergola":[`<p>Pergola, a town famous for the Gilded Bronzes of Cartoceto, Roman equestrian statues, makes red wine from Aleatico. The DOC dates from 2005.</p>`,[]],
// Umbria
"it-montefalco-sagrantino":[`<p>Sagrantino may take its name from the sacraments or the sacristy, because Franciscan friars made it as a sweet passito for feast days and Easter. Montefalco, the 'balcony of Umbria', with frescoes of Saint Francis by Benozzo Gozzoli, kept the tradition alive. Arnaldo Caprai bought land here in 1971, and his son Marco, with others such as Paolo Bea, made dry Sagrantino famous in the 1990s. The DOCG of 1992 came for one of Italy's most tannic wines.</p>`,[]],
"it-montefalco":[`<p>The Montefalco DOC of 1979 covers blends of Sangiovese with Sagrantino and the white Grechetto and Trebbiano Spoletino.</p>`,[]],
"it-spoleto":[`<p>Around Spoleto, old vines of Trebbiano Spoletino were trained up trees (vite maritata), and a few still survive; producers revived the grape in the 2000s, and the DOC dates from 2011.</p>`,[]],
"it-torgiano":[`<p>Torgiano was shaped by one man: Giorgio Lungarotti, who from the 1960s made Rubesco, a Sangiovese-based red, and led the campaign for the DOC of 1968. In 1974 the family opened a Wine Museum in Torgiano, one of the most important in Italy.</p>`,[]],
"it-torgiano-rosso-riserva":[`<p>Lungarotti's Rubesco Riserva Vigna Monticchio made Torgiano known, and the Riserva became a DOCG in 1990.</p>`,[]],
"it-orvieto":[`<p>Orvieto stands on a cliff of tuff, and its Etruscan and medieval cellars were carved deep into the rock, where the cool temperature allowed slow fermentation that left a lightly sweet (abboccato) wine. Popes who stayed in Orvieto prized it, and Pinturicchio is said to have demanded Orvieto wine as part of his pay for frescoes in the cathedral. Most Orvieto is now dry. The DOC dates from 1971, and noble rot wines are made around the Lago di Corbara.</p>`,[]],
"it-rosso-orvietano":[`<p>The Rosso Orvietano DOC was created in 1998 for the reds of a zone long known only for white wine.</p>`,[]],
"it-lago-di-corbara":[`<p>The Lago di Corbara, a reservoir formed by a dam on the Tiber in the 1960s, brought morning mists that favour noble rot. The DOC dates from 1998.</p>`,[]],
"it-todi":[`<p>Todi, a hill town above the Tiber, is known for Grechetto di Todi. The DOC dates from 2010.</p>`,[]],
"it-colli-martani":[`<p>The Monti Martani, between Todi and Spoleto, became a DOC in 1988.</p>`,[]],
"it-colli-del-trasimeno":[`<p>On the shore of Lake Trasimeno in 217 BC Hannibal ambushed and destroyed a Roman army. The hills around the lake became a DOC in 1972.</p>`,[]],
"it-colli-perugini":[`<p>The hills around Perugia became a DOC in 1981.</p>`,[]],
"it-colli-altotiberini":[`<p>The upper Tiber valley, around Città di Castello, became a DOC in 1980.</p>`,[]],
"it-assisi":[`<p>Assisi, the city of Saint Francis, became a DOC in 1997.</p>`,[]],
"it-amelia":[`<p>Amelia, one of Umbria's oldest towns, ringed by polygonal walls, became a DOC in 1989.</p>`,[]],
// Lazio
"it-frascati":[`<p>Frascati grew around the ruins of Tusculum, where Cicero had a villa, and the papal families built their summer villas here, among them Villa Aldobrandini. Its white wine filled Rome's taverns, and local 'fraschette', with a branch (frasca) over the door, sold it straight from the barrel. On 3 March 1966 it was among Italy's first DOCs; the DOCGs of 2011 aimed to rebuild its standing after decades of mass production.</p>`,[]],
"it-cesanese-del-piglio":[`<p>Cesanese, grown in the Ciociaria hills south-east of Rome, may take its name from the village of Cesano. Cesanese del Piglio became the first red DOCG of Lazio in 2008.</p>`,[]],
"it-cesanese-di-affile":[`<p>Affile, in the hills of the Aniene valley, gained a DOC for Cesanese in 1973.</p>`,[]],
"it-cesanese-di-olevano-romano":[`<p>Olevano Romano drew German Romantic painters in the nineteenth century, who painted its landscape. Its Cesanese became a DOC in 1973.</p>`,[]],
"it-aleatico-di-gradoli":[`<p>Gradoli, above Lake Bolsena, makes sweet Aleatico on volcanic soil. The DOC dates from 1972.</p>`,[]],
"it-roma":[`<p>Rome, which for two thousand years drank wine from its hills, gained its own DOC in 2011.</p>`,[]],
"it-castelli-romani":[`<p>${CAST} The Castelli Romani DOC dates from 1996.</p>`,[]],
"it-colli-albani":[`<p>${CAST} The Colli Albani, around Lake Albano and the papal summer palace at Castel Gandolfo, became a DOC in 1970.</p>`,[]],
"it-colli-lanuvini":[`<p>${CAST} Lanuvio, the Roman Lanuvium, birthplace of Emperor Antoninus Pius, became a DOC in 1971.</p>`,[]],
"it-marino":[`<p>${CAST} Since 1925 Marino has held a grape festival (Sagra dell'Uva) in October, when the town's fountains flow with wine. The DOC dates from 1970.</p>`,[]],
"it-montecompatri-colonna":[`<p>${CAST} Montecompatri and Colonna, the latter home of the Colonna family, became a DOC in 1973.</p>`,[]],
"it-zagarolo":[`<p>${CAST} Zagarolo, a feudal town of the Colonna and later the Rospigliosi, became a DOC in 1973.</p>`,[]],
"it-velletri":[`<p>${CAST} Velletri, the ancestral town of the Octavii family of Emperor Augustus, became a DOC in 1972.</p>`,[]],
"it-genazzano":[`<p>Genazzano, a town of the Colonna family east of Rome, became a DOC in 1992.</p>`,[]],
"it-bianco-capena":[`<p>Capena, north of Rome near the Tiber, became a DOC for white wine in 1975.</p>`,[]],
"it-cerveteri":[`<p>Cerveteri, the Etruscan city of Caere, has a necropolis of tumulus tombs that is a UNESCO site. The DOC dates from 1974.</p>`,[]],
"it-tarquinia":[`<p>Tarquinia's painted Etruscan tombs, some showing banquets with wine, are a UNESCO site. The DOC dates from 1996.</p>`,[]],
"it-colli-etruschi-viterbesi":[`<p>The hills around Viterbo, the city where popes lived and were elected in the thirteenth century, became a DOC in 1996.</p>`,[]],
"it-vignanello":[`<p>Vignanello, whose name recalls its vines, is known for the Renaissance garden of Castello Ruspoli. The DOC dates from 1992.</p>`,[]],
"it-colli-della-sabina":[`<p>The Sabine hills north-east of Rome, the land of the Sabines of Roman legend, became a DOC in 1996.</p>`,[]],
"it-cori":[`<p>Cori, a town of the Volsci with a Roman temple of Hercules, became a DOC in 1971; its producers revived the local Nero Buono and Bellone.</p>`,[]],
"it-aprilia":[`<p>Aprilia was founded in 1936 on the drained Pontine Marshes and settled by farmers from the Veneto and Friuli, who planted the vineyards; it was among Italy's earliest DOCs, in 1966.</p>`,[]],
"it-nettuno":[`<p>Nettuno, on the coast where the Allied landings at Anzio took place in January 1944, grows Bellone, here called Cacchione. The DOC dates from 2003.</p>`,[]],
"it-circeo":[`<p>Monte Circeo, the promontory where legend places the sorceress Circe of the Odyssey, gives its name to a DOC created in 1996.</p>`,[]],
"it-terracina":[`<p>Terracina, below the temple of Jupiter Anxur, is known for its sweet Moscato. The DOC dates from 2007.</p>`,[]],
"it-atina":[`<p>At Atina, in the Comino valley, Pasquale Visocchi planted French varieties in the nineteenth century, which is why its DOC of 1999 is based on Cabernet.</p>`,[]],
// Abruzzo
"it-montepulciano-d-abruzzo":[`<p>${MONT} Mostly sold in bulk until the late twentieth century, it gained a cult following through Edoardo Valentini and Emidio Pepe, who made long-lived wines by traditional methods. The DOC dates from 1968, and a revision in the 2020s added subzones that the consortium had requested.</p>`,[]],
"it-montepulciano-d-abruzzo-colline-teramane":[`<p>${MONT} The hills of Teramo became the first DOCG of Abruzzo in 2003.</p>`,[]],
"it-terre-tollesi":[`<p>Tollo, the Roman Tullum, is home to a large cooperative. Its DOC of 2008 became a DOCG in 2019.</p>`,[]],
"it-cerasuolo-d-abruzzo":[`<p>Cerasuolo, 'cherry-coloured', is the deep rosé of Montepulciano, made in Abruzzo for generations as the family wine. It became its own DOC in 2010.</p>`,[]],
"it-trebbiano-d-abruzzo":[`<p>Edoardo Valentini's Trebbiano d'Abruzzo, made at Loreto Aprutino from the 1950s, showed that a variety known for neutral wine could make one of Italy's great whites. The DOC dates from 1972.</p>`,[]],
"it-abruzzo":[`<p>The Abruzzo DOC, created in 2010, covers the whole region and native grapes such as Pecorino and Passerina.</p>`,[]],
"it-controguerra":[`<p>Controguerra, near the border with the Marche, became a DOC in 1996.</p>`,[]],
"it-ortona":[`<p>Ortona was the scene of a battle in December 1943 between Canadian and German troops, fought street by street. The DOC dates from 2011.</p>`,[]],
"it-villamagna":[`<p>Villamagna, in the hills of Chieti, became a DOC for Montepulciano in 2011.</p>`,[]],
// Molise
"it-biferno":[`<p>Molise became a separate region from Abruzzo in 1963. The Biferno DOC, named after the river that crosses the region, dates from 1983.</p>`,[]],
"it-pentro-di-isernia":[`<p>The Pentri were a Samnite tribe who fought Rome from the hills around Isernia. The DOC dates from 1983.</p>`,[]],
"it-molise":[`<p>Molise became a separate region from Abruzzo in 1963, and its regional DOC came in 1998.</p>`,[]],
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
})();
// HISTORY-PASS-END
