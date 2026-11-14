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
