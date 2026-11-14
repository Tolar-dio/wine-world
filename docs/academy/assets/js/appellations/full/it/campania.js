// Full encyclopedia entries: Campania. Written from each disciplinare di produzione (AIS copies).
function camSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Campania/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function cam(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [camSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const CAM_IRPINIA_2020 = ["Affaritaliani: 2020 changes to the three Irpinia DOCGs", "https://www.affaritaliani.it/food/in-gazzetta-ufficiale-le-modifiche-ai-tre-docg-irpini-703683.html"];
const CAM_SANNIO_PLAN = ["Gambero Rosso International: Falanghina del Sannio DOCG plans", "https://www.gamberorossointernational.com/?p=560293"];
APXF["it-taurasi"] = cam({
  lede: "Aglianico from the hills of Irpinia around Taurasi: the great red of southern Italy, tannic, high in acid and slow to age, often called the 'Barolo of the South'.",
  cat: "DOCG, red", rec: "DOC 1970; DOCG 1993 (DM 11 March 1993), the first in southern Italy", d: "DOCG/Taurasi",
  amended: "Text as amended by DM 13 October 2020",
  sources: [CAM_IRPINIA_2020],
  facts: [["Grapes", "Aglianico at least 85%; other non-aromatic reds up to 15%"], ["Zone", "17 communes of Avellino province: Taurasi, Bonito, Castelfranci, Castelvetere sul Calore, Fontanarosa, Lapio, Luogosano, Mirabella Eclano, Montefalcione, Montemarano, Montemileto, Paternopoli, Pietradefusi, Sant'Angelo all'Esca, San Mango sul Calore, Torre le Nocelle, Venticano"], ["Yield", "10 t/ha; 11.5% natural (Riserva 12%)"], ["Ageing", "At least 3 years including 1 in wood; Riserva 4 years including 18 months in wood; counted from 1 December"], ["Grape to wine", "70% at first racking, 65% after ageing"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: "Inland hills of the Calore valley at 300 to 700 m, with volcanic ash from Vesuvius over clay and limestone, cold winters and late harvests that can run into November.",
  rules: "Aglianico ripens so late that the harvest is among the last in Italy.",
  history: "For decades Mastroberardino was almost the only producer bottling Taurasi; its old vintages built the wine's reputation.",
  glass: "Dark garnet, sour cherry, plum, tar, smoke, tobacco, fierce tannin and acidity; needs ten years.",
  exam: "Southern Italy's first DOCG (1993); 3 years ageing, Riserva 4 with 18 months in wood.",
  producers: ["Mastroberardino", "Feudi di San Gregorio", "Salvatore Molettieri", "Antonio Caggiano", "Perillo", "Luigi Tecce", "Quintodecimo"]
});
APXF["it-fiano-di-avellino"] = cam({
  lede: "Fiano from the hills around Avellino: one of Italy's finest whites, smoky and nutty, that ages for decades.",
  cat: "DOCG, white", rec: "DOC 1978; DOCG 2003 (DM 18 July 2003)", d: "DOCG/Fiano di Avellino",
  amended: "Text as amended by DM 13 October 2020",
  sources: [CAM_IRPINIA_2020],
  facts: [["Grapes", "Fiano at least 85%; Greco, Coda di Volpe, Trebbiano Toscano up to 15%"], ["Zone", "26 communes of Avellino province, including Atripalda, Avellino, Lapio, Montefredane, Summonte, Forino, Cesinali"], ["Yield", "10 t/ha; 11% natural; grape to wine 70%"], ["Riserva", "Added 2020: at least 12 months from 1 November"], ["Label", "May use the Latin name Apianum"], ["Total alcohol", "11.5%; Riserva 12%"]],
  place: "Hills at 300 to 600 m around Avellino, on clay, sand and volcanic soils; Lapio and Montefredane are the most famous villages.",
  rules: "The rules describe the character of Lapio (structure, acidity, minerality) among others.",
  glass: "Pear, hazelnut, honey, smoke and flint; with age toasted nuts and beeswax.",
  exam: "Fiano di Avellino and Greco di Tufo both DOCG 2003; Riserva added 2020.",
  producers: ["Ciro Picariello", "Pietracupa", "Villa Diamante", "Mastroberardino", "Colli di Lapio (Clelia Romano)", "Guido Marsella", "Feudi di San Gregorio"]
});
APXF["it-greco-di-tufo"] = cam({
  lede: "Greco from eight communes around Tufo, on sulphur-rich soils north of Avellino: a firm, mineral white, now also made sparkling.",
  cat: "DOCG, white (still and spumante)", rec: "DOC 1970; DOCG 2003 (DM 18 July 2003)", d: "DOCG/Greco di Tufo",
  amended: "Text as amended by DM 13 October 2020",
  sources: [CAM_IRPINIA_2020],
  facts: [["Grapes", "Greco at least 85%; Coda di Volpe up to 15%"], ["Zone", "Tufo, Altavilla Irpina, Chianche, Montefusco, Prata di Principato Ultra, Petruro Irpino, Santa Paolina, Torrioni"], ["Yield", "10 t/ha; 11% natural"], ["Types", "Greco di Tufo, Riserva, Spumante, Spumante Riserva"], ["Riserva", "At least 12 months from 1 November"], ["Spumante", "Classic method; at least 36 months from tirage"], ["Total alcohol", "11.5%; Riserva 12%"]],
  place: "Hills along the Sabato river where sulphur mines once worked; tuff and clay with sulphur veins.",
  rules: "Vertical training required for new plantings.",
  glass: "Peach, pear, almond, a mineral, sometimes sulphurous edge, firm acidity and some phenolic grip.",
  exam: "Greco di Tufo: 8 communes; spumante classic method.",
  producers: ["Pietracupa", "Benito Ferrara", "Mastroberardino", "Feudi di San Gregorio", "Di Meo", "Vadiaperti"]
});
APXF["it-aglianico-del-taburno"] = cam({
  lede: "Aglianico from the slopes of Monte Taburno in the Sannio, west of Benevento.",
  cat: "DOCG, red and rosé", rec: "DOC 1986; DOCG 2011 (DM 30 September 2011)", d: "DOCG/Aglianico del Taburno",
  sources: [CAM_SANNIO_PLAN],
  facts: [["Grapes", "Aglianico at least 85%"], ["Types", "Rosso, Rosso Riserva, Rosato"], ["Zone", "Apollosa, Bonea, Campoli del Monte Taburno, Castelpoto, Foglianise, Montesarchio, Paupisi, Torrecuso, Ponte and parts of Benevento, Cautano, Vitulano, Tocco Caudio"], ["Ageing", "Rosso at least 2 years from 1 November; Riserva 3 years including 12 months in wood and 6 in bottle"], ["Release", "Rosato from 1 March after harvest"], ["Total alcohol", "12%; Riserva 13%"]],
  place: "Limestone and clay slopes of the Taburno massif.", rules: "A 2025 consortium plan proposed allowing resistant varieties; not in force at the date checked.",
  glass: "Dark cherry, spice, firm tannin, slightly softer than Taurasi.", exam: "Campania's third red DOCG area after Taurasi.", producers: ["Fontanavecchia", "Cantina del Taburno", "Fattoria La Rivolta"]
});
APXF["it-falanghina-del-sannio"] = cam({
  lede: "Falanghina from the Sannio hills around Benevento, Campania's most planted white, with four subzones.",
  cat: "DOC, white (still, sparkling, late harvest, passito)", rec: "DOC 2011 (DM 30 September 2011; earlier part of Sannio DOC from 1997)", d: "DOC/Falanghina del Sannio",
  sources: [CAM_SANNIO_PLAN],
  facts: [["Grapes", "Falanghina at least 85%"], ["Subzones", "Guardia Sanframondi or Guardiolo, Sant'Agata dei Goti, Solopaca, Taburno"], ["Yield", "12 t/ha (subzones up to 11 or 12)"], ["Natural alcohol", "10.5%; subzones 11%"], ["Spumante metodo classico", "At least 12 months on the lees from 15 November"], ["Passito", "16% natural after drying; grape to wine 40%; released from 1 June after harvest"]],
  place: "Hills of the Benevento province between the Calore and the Taburno.", rules: "Producers announced in 2025 a plan to seek DOCG status with Riserva and Superiore; not yet in force at the date checked.",
  glass: "Citrus, apple, white flowers, bright acidity.", exam: "Falanghina Beneventana is the Sannio biotype.", producers: ["La Guardiense", "Fontanavecchia", "Mustilli", "Ocone", "Aia dei Colombi"]
});
APXF["it-sannio"] = cam({
  lede: "The province-wide DOC of Benevento for blends and many varietals, with subzones Guardia Sanframondi, Sant'Agata dei Goti, Solopaca and Taburno.",
  cat: "DOC, white, red, rosé, sparkling, passito", rec: "DOC 1997 (DM 5 August 1997)", d: "DOC/Sannio",
  facts: [["Varietals", "Aglianico, Barbera, Coda di Volpe, Fiano, Greco, Moscato, Piedirosso, Sciascinoso and others, many also spumante and passito"], ["Yields", "Bianco 14 t/ha; Rosso 13; varietals 12"]],
  place: "The province of Benevento.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Umbrella DOC of the Sannio.", producers: ["Mustilli", "La Guardiense"]
});
APXF["it-irpinia"] = cam({
  lede: "The DOC of the province of Avellino, for blends, varietals (Coda di Volpe, Falanghina, Fiano, Greco, Aglianico, Piedirosso, Sciascinoso) and sweet styles.",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 2005 (DM 13 September 2005)", d: "DOC/Irpinia",
  facts: [["Subzone", "Campi Taurasini (Aglianico at least 85%)"], ["Sweet types", "Passito and liquoroso, grape to wine 40%"], ["Spumante", "At least 18 months after 1 October for some types"]],
  place: "All of Irpinia.", rules: "Campi Taurasini lets Aglianico from the Taurasi area be sold younger.", glass: "Varied.", exam: "Umbrella DOC of Avellino.", producers: []
});
APXF["it-vesuvio"] = cam({
  lede: "Wines from the slopes of Vesuvius, including Lacryma Christi, from Coda di Volpe (Caprettone) and Piedirosso.",
  cat: "DOC, white, red, rosé, sparkling, fortified", rec: "DOC 1983 (DPR 13 January 1983)", d: "DOC/Vesuvio",
  facts: [["Bianco and Lacryma Christi Bianco", "Coda di Volpe (locally Caprettone) at least 35%; Verdeca up to 45%"], ["Rosso and Lacryma Christi Rosso", "Piedirosso (locally Palombina) at least 50%; Sciascinoso (Olivella) up to 30%"], ["Lacryma Christi", "Needs 12% natural alcohol; also spumante and liquoroso"], ["Yield", "10 t/ha"]],
  place: "Volcanic sand and ash on the slopes of Vesuvius above Naples, many vines ungrafted.", rules: "Lacryma Christi is a higher tier within the DOC.",
  history: "The name, 'tears of Christ', comes from a legend that Christ wept over the Bay of Naples.",
  glass: "Smoky, mineral whites; light, peppery reds.", exam: "Lacryma Christi = tier of Vesuvio DOC; Caprettone.", producers: ["Mastroberardino", "Cantine Olivella", "Sorrentino", "Casa Setaro"]
});
APXF["it-campi-flegrei"] = cam({
  lede: "Falanghina and Piedirosso from the volcanic 'burning fields' west of Naples.",
  cat: "DOC, white, red, rosé, sparkling, passito", rec: "DOC 1994 (DM 3 October 1994)", d: "DOC/Campi Flegrei",
  facts: [["Types", "Bianco, Rosso, Falanghina (also passito, spumante), Piedirosso or Pér 'e Palummo (rosso, riserva, rosato, passito)"], ["Piedirosso Riserva", "11% natural, 2 years from 1 November, total 12%"], ["Passito", "Grape to wine 45%"]],
  place: "Craters, sand and pumice around Pozzuoli; vines often ungrafted.", rules: "Grape to wine 70%.", glass: "Saline Falanghina; light, floral Piedirosso.", exam: "Pér 'e palummo = Piedirosso.", producers: ["Agnanum", "La Sibilla", "Contrada Salandra", "Cantine Astroni"]
});
APXF["it-ischia"] = cam({
  lede: "Wines of the volcanic island of Ischia, from Forastera, Biancolella and Piedirosso.",
  cat: "DOC, white, red, sparkling, passito", rec: "DOC 1966 (DPR 3 March 1966), one of Italy's first", d: "DOC/Ischia",
  facts: [["Bianco", "Forastera 45 to 70%; Biancolella 30 to 55%"], ["Types", "Bianco (also superiore, spumante), Rosso, Forastera, Biancolella, Piedirosso or Per' e Palummo (also passito)"], ["Yields", "Whites 10 t/ha; reds 9"]],
  place: "Steep terraces of volcanic tuff on the island in the Bay of Naples.", rules: "Passito at 14.5% natural.", glass: "Saline, herbal Biancolella.", exam: "Among the first DOCs (1966).", producers: ["Casa d'Ambra", "Pietratorcia", "Cenatiempo"]
});
APXF["it-capri"] = cam({
  lede: "Tiny production of white and red from the island of Capri.",
  cat: "DOC, white, red", rec: "DOC 1977 (DPR 7 September 1977)", d: "DOC/Capri",
  facts: [["Bianco", "Falanghina and Greco at least 80% (Falanghina at least 50%); Biancolella up to 20%"], ["Yield", "12 t/ha"]],
  place: "Terraces on the limestone island.", rules: "Grape to wine 70%.", glass: "Fresh whites.", exam: "Minor DOC.", producers: []
});
APXF["it-costa-d-amalfi"] = cam({
  lede: "Wines of the Amalfi Coast cliffs, with subzones Furore, Ravello and Tramonti, from Falanghina, Biancolella, Piedirosso and rare local grapes.",
  cat: "DOC, white, red, rosé, sparkling, passito", rec: "DOC 1995 (DM 10 August 1995)", d: "DOC/Costa d'Amalfi",
  facts: [["Subzones", "Furore, Ravello, Tramonti"], ["Bianco", "Falanghina and/or Biancolella based"], ["Rosso", "Piedirosso at least 40%; Sciascinoso and/or Aglianico"], ["Passito", "16% natural after drying; grape to wine 50%; total 17%"]],
  place: "Terraces hanging above the sea from Positano to Vietri; Tramonti has very old ungrafted vines.", rules: "Riserva reds need ageing from 1 November.", glass: "Saline, herbal whites; light reds.", exam: "Fenile, Ginestra, Ripoli (whites) and Tintore (red) are local Amalfi grapes named in the rules.", producers: ["Marisa Cuomo", "Giuseppe Apicella", "Monte di Grazia", "Tenuta San Francesco"]
});
APXF["it-penisola-sorrentina"] = cam({
  lede: "Wines of the Sorrento peninsula, best known for the frothy red Gragnano.",
  cat: "DOC, white, red, red frizzante", rec: "DOC 1994 (DM 3 October 1994)", d: "DOC/Penisola Sorrentina",
  facts: [["Subzones", "Gragnano and Lettere (red frizzante), Sorrento (white and red)"], ["Yields", "11 to 12 t/ha; subzones 9 to 10"]],
  place: "The hills of the peninsula south of Naples.", rules: "Grape to wine 70%.", glass: "Gragnano: purple, fruity, lightly sparkling, often off-dry; the pizza wine of Naples.", exam: "Gragnano = frizzante red.", producers: ["Grotta del Sole", "Salvatore Martusciello"]
});
APXF["it-falerno-del-massico"] = cam({
  lede: "The modern heir to Roman Falernian, from Monte Massico in northern Campania: Aglianico-Piedirosso reds, Primitivo and Falanghina.",
  cat: "DOC, white, red", rec: "DOC 1989 (DPR 3 January 1989)", d: "DOC/Falerno del Massico",
  facts: [["Bianco", "Falanghina at least 85%"], ["Rosso", "Aglianico at least 60%; Piedirosso up to 40%"], ["Types", "Bianco, Rosso, Rosso Riserva, Primitivo, Primitivo Riserva or Vecchio"], ["Total alcohol", "12% to 13%"]],
  place: "Volcanic slopes of Monte Massico near Sessa Aurunca and Mondragone.", rules: "Ageing for some types counts from 1 January after the harvest.",
  history: "Falernian was the most prized wine of ancient Rome, praised by Pliny and Horace.",
  glass: "Dark, ripe reds.", exam: "Falernum: Rome's great wine.", producers: ["Villa Matilde", "Masseria Felicia"]
});
APXF["it-galluccio"] = cam({
  lede: "Falanghina and Aglianico from the volcanic Roccamonfina area in northern Campania.",
  cat: "DOC, white, red, rosé", rec: "DOC 1997 (DM 4 August 1997)", d: "DOC/Galluccio",
  facts: [["Bianco", "Falanghina at least 70%"], ["Riserva", "2 years including 1 in cask; 11.5% natural; total 12%"], ["Yields", "Bianco 12 t/ha; Rosso 11"], ["Release", "Rosso from 1 June after harvest"]],
  place: "Slopes of the extinct Roccamonfina volcano.", rules: "Grape to wine 70%.", glass: "Fresh whites, firm reds.", exam: "Minor DOC.", producers: []
});
APXF["it-casavecchia-di-pontelatone"] = cam({
  lede: "Reds from Casavecchia, a rare local grape of the Caserta hills.",
  cat: "DOC, red", rec: "DOC 2011 (DM 8 November 2011)", d: "DOC/Casavecchia di Pontelatone",
  facts: [["Grape", "Casavecchia at least 85%"], ["Ageing", "2 years including 1 in wood; Riserva 3 years including 18 months in wood; from 1 November"], ["Total alcohol", "12.5%; Riserva 13%"]],
  place: "Hills around Pontelatone (Caserta).", rules: "Grape to wine 70%.", glass: "Dark, tannic, spicy.", exam: "Casavecchia: legendary vine found in an old ruin.", producers: ["Vestini Campagnano", "Alois"]
});
APXF["it-aversa"] = cam({
  lede: "Asprinio, a high-acid white grape trained on tall trees (alberata) in the plain north of Naples.",
  cat: "DOC, white (still, spumante)", rec: "DOC 1993 (DM 31 July 1993)", d: "DOC/Aversa",
  facts: [["Grape", "Asprinio at least 85%"], ["Types", "Aversa Asprinio, Asprinio spumante"], ["Yield", "12 t/ha; 10.5% natural (spumante 9.5%)"]],
  place: "The flat land between Naples and Caserta, where vines climb poplars up to 15 m.", rules: "Grape to wine 70%.", glass: "Tart, light, often sparkling.", exam: "Alberata aversana: vines on trees.", producers: ["I Borboni"]
});
APXF["it-cilento"] = cam({
  lede: "Aglianico-based reds and Fiano whites from the Cilento hills south of Salerno.",
  cat: "DOC, white, red, rosé", rec: "DOC 1989 (DPR 3 May 1989)", d: "DOC/Cilento",
  facts: [["Rosso", "Aglianico 60 to 75%; Piedirosso and/or Primitivo 15 to 20%"], ["Types", "Rosso, Rosato, Bianco, Aglianico, Fiano"], ["Yield", "10 t/ha"], ["Aglianico ageing", "At least 1 year from 1 November; Riserva-like ageing of 3 years allowed"]],
  place: "The Cilento national park, hills from the sea to the mountains.", rules: "Grape to wine 70%.", glass: "Mineral Fiano; warm Aglianico.", exam: "Minor DOC.", producers: ["De Conciliis", "Luigi Maffini", "San Salvatore"]
});
APXF["it-castel-san-lorenzo"] = cam({
  lede: "Whites, reds and Moscato from the Calore valley in the province of Salerno.",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1991 (DPCM 6 November 1991)", d: "DOC/Castel San Lorenzo",
  facts: [["Types", "Bianco, Rosso, Rosato, Barbera, Moscato (also spumante, passito), Moscato Lambiccato, Aglianicone"], ["Bianco", "Trebbiano Toscano 50 to 60%; Malvasia 30 to 40%"], ["Yields", "Bianco 12 t/ha; others 10"]],
  place: "Inland hills of the Salerno province.", rules: "Moscato passito drying until 31 January; grape to wine 50%.", glass: "Aromatic Moscato.", exam: "Minor DOC.", producers: []
});
