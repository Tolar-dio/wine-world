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
// HISTORY-PASS-START
(function(){
const IRP=`In the late nineteenth century, when phylloxera devastated France, Irpinia sold wine north, and the Avellino to Rocchetta Sant'Antonio railway, opened in 1895, became known as the wine railway; Italy's southern school of oenology opened at Avellino in 1879. The Mastroberardino family kept Irpinia's native grapes alive through the post-war decades, when most growers abandoned them.`;
const CAST=`Castel del Monte, the octagonal castle built in the 1240s by Emperor Frederick II on a hill of the Murge, is a UNESCO site.`;
const SAL=`In 1943 Leone de Castris of Salice Salentino bottled Five Roses, often cited as Italy's first bottled rosé, named in English at the request of Charles Poletti, the American general who governed the region after the Allied landings.`;
const OTR=`The Salento, the heel of Italy, was Greek, Byzantine and Norman; at Otranto in 1480 an Ottoman army took the city and killed some eight hundred inhabitants who refused to convert, later canonised as the Martyrs of Otranto.`;
const VULT=`Monte Vulture is an extinct volcano, and the poet Horace was born at its foot at Venosa in 65 BC. In the fifteenth century Albanian refugees settled villages such as Barile and dug cellars into the tuff, the 'Sheshë', where wine is still kept.`;
const NUR=`The nuraghi, stone towers built by Sardinia's Bronze Age people, number in the thousands across the island.`;
const LEOP=`The Leopard, Giuseppe Tomasi di Lampedusa's novel, modelled Donnafugata on his family's palace at Santa Margherita di Belice, destroyed in the Belice earthquake of January 1968.`;
const HX={
// Campania
"it-taurasi":[`<p>${IRP} Antonio Mastroberardino's Taurasi from the 1968 vintage showed Aglianico's ageing power, and after the 1980 Irpinia earthquake the family rebuilt its cellars. Taurasi became the first DOCG of southern Italy in 1993, and producers such as Feudi di San Gregorio, founded in 1986, and many small growers have followed.</p>`,[]],
"it-fiano-di-avellino":[`<p>${IRP} Fiano is often linked to the Latin 'vitis apiana', the vine whose grapes attract bees, praised by Pliny. By the 1970s it had nearly disappeared, and Mastroberardino's plantings at Lapio and elsewhere saved it. The DOC dates from 1978 and the DOCG from 2003.</p>`,[]],
"it-greco-di-tufo":[`<p>${IRP} Tufo takes its name from the tuff rock, and its hills hold sulphur mines worked from the nineteenth century; the Di Marzo family, wine growers since the seventeenth century, also ran the mines. Greco became a DOC in 1970 and a DOCG in 2003.</p>`,[]],
"it-aglianico-del-taburno":[`<p>Monte Taburno, whose profile seen from Naples is called the 'Sleeping Woman', overlooks the Sannio. Its Aglianico became a DOC in 1986 and a DOCG in 2011.</p>`,[]],
"it-falanghina-del-sannio":[`<p>The Sannio was the land of the Samnites, who trapped a Roman army at the Caudine Forks in 321 BC and made it pass under a yoke of spears. Falanghina, whose name may come from the stakes (falanghe) that supported the vines, nearly vanished before its revival from the 1970s; the Falanghina del Sannio DOC dates from 2011.</p>`,[]],
"it-sannio":[`<p>The Sannio DOC, created in 1997 in the province of Benevento, brought together the wines of the old Samnite heartland.</p>`,[]],
"it-irpinia":[`<p>${IRP} The Irpinia DOC, from 2005, covers the province of Avellino.</p>`,[]],
"it-vesuvio":[`<p>The eruption of Vesuvius in AD 79 buried Pompeii, a great wine town whose amphorae travelled the Mediterranean. The name Lacryma Christi comes from a legend that Christ wept on seeing the beauty of the Bay of Naples, stolen from heaven by Lucifer, and vines grew where his tears fell. In 1996 Mastroberardino and the Pompeii archaeological authorities replanted vineyards inside the ancient city. The DOC dates from 1983.</p>`,[]],
"it-campi-flegrei":[`<p>The Campi Flegrei, the 'burning fields' west of Naples, are a volcanic caldera where Greek settlers founded Cuma in the eighth century BC. The sandy volcanic soils kept phylloxera away, and Piedirosso and Falanghina still grow on their own roots. The DOC dates from 1994.</p>`,[]],
"it-ischia":[`<p>Greeks from Euboea founded Pithekoussai on Ischia around 770 BC, the first Greek colony in the western Mediterranean. In 1954 archaeologists found there 'Nestor's cup', a drinking cup inscribed with one of the earliest known Greek verses, promising desire to whoever drinks from it. Ischia became one of Italy's first DOCs on 3 March 1966.</p>`,[]],
"it-capri":[`<p>Capri, where Emperor Tiberius ruled from his villa in the last years of his life, has a tiny DOC created in 1977.</p>`,[]],
"it-costa-d-amalfi":[`<p>The Amalfi Coast, home of a medieval maritime republic and a UNESCO site, grows vines on terraces above the sea at Furore, Ravello and Tramonti, where pre-phylloxera vines of Tintore survive. Marisa Cuomo's wines from Furore made the area known. The DOC dates from 1995.</p>`,[]],
"it-penisola-sorrentina":[`<p>The Sorrento peninsula is home to Gragnano, the town of dried pasta, whose lightly sparkling red is the traditional partner of Neapolitan pizza. The DOC dates from 1994.</p>`,[]],
"it-falerno-del-massico":[`<p>Falernian was the most prized wine of ancient Rome, praised by Pliny, Horace and Martial, and the Opimian vintage of 121 BC was still drunk a century later. The Ager Falernus lay on the slopes of Monte Massico. In the 1960s the lawyer Francesco Paolo Avallone, founder of Villa Matilde, set out to revive it, searching for ancient vines with the help of researchers. The DOC dates from 1989.</p>`,[]],
"it-galluccio":[`<p>Galluccio lies on the slopes of the extinct volcano of Roccamonfina. The DOC dates from 1997.</p>`,[]],
"it-casavecchia-di-pontelatone":[`<p>Local tradition says Casavecchia was saved from a single old vine found in the ruins of an old house (casa vecchia) at Pontelatone in the nineteenth century. The DOC dates from 2011.</p>`,[]],
"it-aversa":[`<p>Aversa was the first Norman county in Italy, granted in 1030. Its Asprinio is trained up poplars as high as 15 metres in the 'alberata aversana', a method of Etruscan origin, and pickers climb tall ladders to harvest. The DOC dates from 1993.</p>`,[]],
"it-cilento":[`<p>The Cilento holds the Greek temples of Paestum and the ruins of Velia, home of the philosopher Parmenides. The American scientist Ancel Keys lived at Pioppi and drew on the local diet in defining the Mediterranean diet. The DOC dates from 1989.</p>`,[]],
"it-castel-san-lorenzo":[`<p>Castel San Lorenzo, in the hills of the Cilento, became a DOC in 1991.</p>`,[]],
// Sicily
"it-etna":[`<p>Greeks founded Naxos below Etna in 734 BC, and the volcano's slopes are scattered with old stone presses (palmenti) where grapes were trodden. In the nineteenth century Etna shipped huge volumes of wine north and to France, but by the 1980s most of its terraces were abandoned. Etna became Sicily's first DOC in 1968. From the 1990s the Benanti family, and in the early 2000s newcomers such as Andrea Franchetti, Marc de Grazia and Frank Cornelissen, revived old Nerello Mascalese vines, and in 2011 the DOC recognised 133 named contrade, the lava flows of different ages that make each site distinct.</p>`,[]],
"it-cerasuolo-di-vittoria":[`<p>Vittoria was founded in 1607 by Vittoria Colonna Henríquez, countess of Modica, who granted land to settlers on condition that they plant vines. Its blend of Nero d'Avola and Frappato was championed by COS, founded by three friends in 1980, and later by Arianna Occhipinti. It became a DOC in 1973 and in 2005 Sicily's only DOCG.</p>`,[]],
"it-vittoria":[`<p>Vittoria, founded in 1607 by Vittoria Colonna Henríquez, gained its own DOC for Frappato and Nero d'Avola in 2005.</p>`,[]],
"it-sicilia":[`<p>For most of the twentieth century Sicily shipped bulk wine to blend in the north and in France. From the 1980s Diego Planeta, president of the Settesoli cooperative, and the regional institute led a turn to quality, with both international grapes and Nero d'Avola. The IGT of 1995 became the Sicilia DOC in 2011.</p>`,[]],
"it-marsala":[`<p>In 1773 the Liverpool merchant John Woodhouse shipped fortified Marsala to England, and the Royal Navy under Nelson bought it for the fleet. Benjamin Ingham, the Whitaker family and, from 1833, Vincenzo Florio built great cellars on the coast. In May 1860 Garibaldi's Thousand landed at Marsala to begin the conquest of the Kingdom of the Two Sicilies. In the twentieth century cheap cooking Marsala ruined the name; Law 851 of 1984 tightened its rules, and Marco De Bartoli revived traditional unfortified wines of the Vergine style.</p>`,[]],
"it-pantelleria":[`<p>Pantelleria, closer to Tunisia than to Sicily, was ruled by Arabs, whose word 'zabib', raisin, may have given Zibibbo, the local Muscat, its name. The island's vines are trained low in hollows against the wind, the 'alberello pantesco', which in 2014 became the first agricultural practice recognised by UNESCO as intangible heritage. Marco De Bartoli's Bukkuram and Donnafugata's Ben Ryé made its passito known. The DOC dates from 1971.</p>`,[]],
"it-malvasia-delle-lipari":[`<p>The Aeolian Islands were famous for Malvasia from the time of the Greeks, but phylloxera and emigration nearly ended it. In the 1960s and 1970s Carlo Hauner, a designer from Milan who settled on Salina, revived it. The DOC dates from 1973.</p>`,[]],
"it-faro":[`<p>Faro takes its name from the lighthouse at Messina. By the 1980s only a handful of hectares were left, and the architect Salvatore Geraci, founder of Palari, revived it in the 1990s, encouraged by the critic Luigi Veronelli. The DOC dates from 1976.</p>`,[]],
"it-mamertino":[`<p>According to Pliny, Julius Caesar served Mamertine wine at the banquet for his third consulship. The name comes from the Mamertines, mercenaries who seized Messina in the third century BC. The DOC dates from 2004.</p>`,[]],
"it-noto":[`<p>Noto, rebuilt in Baroque style after the earthquake of 1693, is a UNESCO site. Its sweet Moscato and its Nero d'Avola became a DOC in 1974.</p>`,[]],
"it-siracusa":[`<p>Syracuse, the greatest Greek city of Sicily, gave its name to a sweet Moscato that local tradition traces to ancient wine. By the late twentieth century it had nearly disappeared before the Pupillo family revived it. The DOC dates from 1973.</p>`,[]],
"it-eloro":[`<p>Eloro takes its name from the Greek town of Heloros near Pachino, the homeland of Nero d'Avola. The DOC dates from 1994.</p>`,[]],
"it-alcamo":[`<p>Alcamo, the town of the thirteenth-century poet Cielo d'Alcamo, is known for white wine from Catarratto. The DOC dates from 1972.</p>`,[]],
"it-menfi":[`<p>The Settesoli cooperative, founded at Menfi in 1965, grew into one of Europe's largest; the Planeta family, whose head Diego led it, built their first winery nearby in the 1990s. The DOC dates from 1995.</p>`,[]],
"it-monreale":[`<p>Monreale, above Palermo, is famous for the cathedral built by the Norman king William II from 1174, covered in gold mosaics. The DOC dates from 2000.</p>`,[]],
"it-contessa-entellina":[`<p>Contessa Entellina was settled by Albanian refugees (Arbëreshë) in the fifteenth century, who still keep their Byzantine rite. Donnafugata, founded by the Rallo family in 1983, has its vineyards here. The DOC dates from 1993.</p>`,[]],
"it-contea-di-sclafani":[`<p>The Contea di Sclafani holds Regaleali, the estate of the Tasca d'Almerita family since 1830, whose wines helped show Sicily's potential for quality. The DOC dates from 1996.</p>`,[]],
"it-delia-nivolelli":[`<p>The Delia Nivolelli DOC, from 1998, takes its name from the Delia river and the Nivolelli plateau near Mazara del Vallo.</p>`,[]],
"it-erice":[`<p>Erice, a medieval town on a mountain above Trapani, was the site of an ancient sanctuary of Venus. The DOC dates from 2004.</p>`,[]],
"it-salaparuta":[`<p>Salaparuta was destroyed by the Belice earthquake of 1968 and rebuilt on a new site. Its name is shared with the Duca di Salaparuta wine house, founded in 1824. The DOC dates from 2006.</p>`,[]],
"it-sambuca-di-sicilia":[`<p>Sambuca di Sicilia, whose Arab quarter dates from the ninth century, became a DOC in 1995.</p>`,[]],
"it-santa-margherita-di-belice":[`<p>${LEOP} The DOC dates from 1996.</p>`,[]],
"it-sciacca":[`<p>Sciacca, known since Roman times for its thermal springs and later for its coral, became a DOC in 1998.</p>`,[]],
"it-riesi":[`<p>Riesi, in the sulphur-mining interior of Sicily, became a DOC in 2001.</p>`,[]],
// Sardinia
"it-vermentino-di-gallura":[`<p>Gallura, the granite north-east of Sardinia, grows Vermentino on poor sandy soils. It became Sardinia's only DOCG in 1996, and cooperatives such as Cantina Gallura and estates such as Capichera built its reputation.</p>`,[]],
"it-cannonau-di-sardegna":[`<p>Cannonau is Grenache, long assumed to have come from Spain during Aragonese rule (1323 to 1720), though Sardinian researchers argue for a local origin, citing grape seeds found at a Bronze Age nuraghe. The Ogliastra and Barbagia, where centenarians are unusually common, have made it for generations. The DOC dates from 1972, with the subzones Oliena (Nepente), Jerzu and Capo Ferrato.</p>`,[]],
"it-vermentino-di-sardegna":[`<p>Vermentino came to Sardinia, most sources say, from Liguria or Corsica in the nineteenth century. The island-wide DOC dates from 1988.</p>`,[]],
"it-carignano-del-sulcis":[`<p>The Sulcis, in the south-west, kept old Carignano bush vines on sand, many on their own roots. In the 1980s the Santadi cooperative, advised by Giacomo Tachis, made Terre Brune, which brought the area renown. The DOC dates from 1977.</p>`,[]],
"it-vernaccia-di-oristano":[`<p>Vernaccia di Oristano ages under a veil of yeast (flor), like sherry, in barrels not filled to the top. The Contini family, producers since 1898, are its leading name. It became Sardinia's first DOC in 1971.</p>`,[]],
"it-malvasia-di-bosa":[`<p>Bosa, a medieval town on the Temo river below the Malaspina castle, makes Malvasia aged under flor, a style kept alive by a handful of growers. The DOC dates from 1972.</p>`,[]],
"it-monica-di-sardegna":[`<p>Monica is often said to have been brought to Sardinia by monks, though its origin is unknown. The DOC dates from 1972.</p>`,[]],
"it-moscato-di-sardegna":[`<p>The island-wide Moscato DOC dates from 1979.</p>`,[]],
"it-moscato-di-sorso":[`<p>Sorso and Sennori, near Sassari, are known for sweet Moscato. The DOC dates from 1972.</p>`,[]],
"it-cagliari":[`<p>Cagliari, founded by the Phoenicians, gained a DOC in 2011 that brought together the province's traditional sweet and dry wines.</p>`,[]],
"it-giro-di-cagliari":[`<p>Giro, a red grape probably brought by the Spanish, makes sweet and fortified wines around Cagliari. The DOC dates from 1972.</p>`,[]],
"it-nasco-di-cagliari":[`<p>Nasco, an old white grape of the Campidano, may take its name from the Latin 'muscus', for its musky scent. The DOC dates from 1972.</p>`,[]],
"it-nuragus-di-cagliari":[`<p>${NUR} Nuragus, named after them, was long Sardinia's most planted white grape. The DOC dates from 1974.</p>`,[]],
"it-sardegna-semidano":[`<p>Semidano, a rare white grape of the Campidano, nearly disappeared before its DOC of 1995.</p>`,[]],
"it-mandrolisai":[`<p>The Mandrolisai, in the mountainous centre of the island, makes a red blend of Bovale, Cannonau and Monica. The DOC dates from 1981.</p>`,[]],
"it-campidano-di-terralba":[`<p>Terralba, on the plain of the Campidano near Oristano, is known for Bovale. The DOC dates from 1975.</p>`,[]],
"it-arborea":[`<p>Arborea was founded in 1928 on drained marshland under the name Mussolinia and renamed in 1944. Its name recalls the medieval Judicate of Arborea, whose ruler Eleonora issued a famous law code in 1392. The DOC dates from 1987.</p>`,[]],
"it-alghero":[`<p>Alghero was settled by Catalans after 1354, and its people still speak a form of Catalan. In 1899 Erminio Sella and Edgardo Mosca founded Sella &amp; Mosca, which grew into one of Europe's largest single estates. The DOC dates from 1995.</p>`,[]],
// Puglia
"it-primitivo-di-manduria":[`<p>Primitivo takes its name from 'primo', early, for its early ripening; a priest of Gioia del Colle, Francesco Filippo Indellicati, is credited with selecting it in the late eighteenth century, and tradition says the Countess Sabini of Altamura brought it to Manduria in 1881. In 2001 DNA research by Carole Meredith and Croatian scientists showed that Primitivo and California's Zinfandel are the same variety, originally Croatia's Crljenak Kaštelanski (Tribidrag). The DOC dates from 1974.</p>`,[]],
"it-primitivo-di-manduria-dolce-naturale":[`<p>The sweet Primitivo of Manduria, made from late-harvested grapes, became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte":[`<p>${CAST} The surrounding hills grow Nero di Troia, Bombino and Aglianico, and the Rivera estate's Il Falcone helped make the name known. The DOC dates from 1971.</p>`,[]],
"it-castel-del-monte-rosso-riserva":[`<p>${CAST} The Rosso Riserva became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte-nero-di-troia-riserva":[`<p>${CAST} Nero di Troia may take its name from the town of Troia or from the legend of the Greek hero Diomedes. The Riserva became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte-bombino-nero":[`<p>${CAST} Bombino Nero, which ripens unevenly and is well suited to rosé, gained its own DOCG for rosé in 2011.</p>`,[]],
"it-salice-salentino":[`<p>${SAL} Salice Salentino became a DOC in 1976 and its Negroamaro reds were among the first southern Italian wines widely sold abroad.</p>`,[]],
"it-brindisi":[`<p>Brindisi, the end of the Via Appia and Rome's port for the East, became a DOC in 1979.</p>`,[]],
"it-squinzano":[`<p>${OTR} Squinzano, north of Lecce, became a DOC in 1976.</p>`,[]],
"it-copertino":[`<p>${OTR} Copertino, with its Aragonese castle and its cooperative, became a DOC in 1976.</p>`,[]],
"it-leverano":[`<p>${OTR} Leverano became a DOC in 1979.</p>`,[]],
"it-nardo":[`<p>${OTR} Nardò, with its Baroque centre, became a DOC in 1987.</p>`,[]],
"it-alezio":[`<p>${OTR} Alezio is known for Negroamaro rosé. The DOC dates from 1983.</p>`,[]],
"it-matino":[`<p>${OTR} Matino became one of the first DOCs of the Salento in 1971.</p>`,[]],
"it-galatina":[`<p>${OTR} Galatina was a centre of tarantism, the ritual dance said to cure the bite of the tarantula, and its chapel of Saint Paul drew the 'tarantate' each June. The DOC dates from 1997.</p>`,[]],
"it-negroamaro-di-terra-d-otranto":[`<p>${OTR} Negroamaro, 'black and bitter', became the subject of its own DOC in 2011.</p>`,[]],
"it-terra-d-otranto":[`<p>${OTR} The Terra d'Otranto DOC dates from 2011.</p>`,[]],
"it-lizzano":[`<p>Lizzano, near Taranto, became a DOC in 1988.</p>`,[]],
"it-colline-joniche-tarantine":[`<p>Taranto was founded around 706 BC by settlers from Sparta, the only Spartan colony. The hills along the Ionian coast became a DOC in 2008.</p>`,[]],
"it-gioia-del-colle":[`<p>Gioia del Colle, with a castle of Frederick II, is where the priest Francesco Filippo Indellicati is credited with selecting Primitivo in the late eighteenth century. The DOC dates from 1987.</p>`,[]],
"it-gravina":[`<p>Gravina in Puglia, built over a ravine with cave churches, became a DOC in 1983.</p>`,[]],
"it-locorotondo":[`<p>Locorotondo, a round village above the Valle d'Itria, the land of the conical trulli, makes white wine from Verdeca and Bianco d'Alessano; its cooperative, founded in 1932, is one of the oldest in Puglia. The DOC dates from 1969.</p>`,[]],
"it-martina":[`<p>Martina Franca, a Baroque town of the Valle d'Itria, became a DOC for white wine in 1969.</p>`,[]],
"it-ostuni":[`<p>Ostuni, the 'white city', is known for the rare Ottavianello. The DOC dates from 1972.</p>`,[]],
"it-moscato-di-trani":[`<p>Trani, a port with a Romanesque cathedral on the sea, has made sweet Moscato since the Middle Ages. The DOC dates from 1974.</p>`,[]],
"it-aleatico-di-puglia":[`<p>Aleatico, a red Muscat-scented grape, has a region-wide DOC for sweet wine, created in 1973.</p>`,[]],
"it-barletta":[`<p>Barletta is famous for the Challenge of Barletta (Disfida) of 1503, when thirteen Italian knights defeated thirteen French knights in a duel over honour. The DOC began as Rosso Barletta in 1977.</p>`,[]],
"it-rosso-di-cerignola":[`<p>At Cerignola in 1503 a Spanish army defeated the French, often called the first battle won by firearms. The DOC dates from 1974.</p>`,[]],
"it-orta-nova":[`<p>Orta Nova, on the Tavoliere plain, became a DOC in 1984.</p>`,[]],
"it-cacc-e-mmitte-di-lucera":[`<p>Cacc'e mmitte means 'drink and pour' in dialect, a name for a wine drunk quickly. Lucera was settled by Frederick II with Muslims from Sicily in the 1220s. The DOC dates from 1975.</p>`,[]],
"it-san-severo":[`<p>San Severo, on the Tavoliere plain, became one of Puglia's first DOCs in 1968.</p>`,[]],
"it-tavoliere-delle-puglie":[`<p>The Tavoliere, the great plain of northern Puglia, was the winter pasture of shepherds from the Abruzzo mountains, who followed drove roads (tratturi) for centuries. Its DOC for Nero di Troia dates from 2011.</p>`,[]],
// Basilicata
"it-aglianico-del-vulture":[`<p>${VULT} The Paternoster family began bottling in 1925, and d'Angelo and others made the wine known after the war. The DOC dates from 1971.</p>`,[]],
"it-aglianico-del-vulture-superiore":[`<p>${VULT} The Superiore, with longer ageing, became a DOCG in 2010.</p>`,[]],
"it-matera":[`<p>Matera's Sassi, cave dwellings inhabited for millennia, were evacuated in the 1950s as a national disgrace and later restored; they became a UNESCO site in 1993, and Matera was European Capital of Culture in 2019. The DOC dates from 2005.</p>`,[]],
"it-grottino-di-roccanova":[`<p>Roccanova takes the 'grottino' in its name from the caves dug into the hillside where wine was kept. The DOC dates from 2009.</p>`,[]],
"it-terre-dell-alta-val-d-agri":[`<p>The upper Val d'Agri holds the ruins of the Roman town of Grumentum and, since the 1990s, Europe's largest onshore oil field. The DOC dates from 2003.</p>`,[]],
// Calabria
"it-ciro":[`<p>Cirò claims descent from Krimisa, a wine of the Greek colonies said to have been given to victors at the Olympic Games. The Librandi family, bottling from the 1950s, made Cirò the best-known wine of Calabria, and in the 2010s a group of young growers revived traditional, unoaked Gaglioppo. The DOC dates from 1969.</p>`,[]],
"it-greco-di-bianco":[`<p>Greco di Bianco, a sweet wine from dried grapes, comes from the coast near the ruins of Locri, one of the great Greek cities of Magna Graecia. The DOC dates from 1980.</p>`,[]],
"it-terre-di-cosenza":[`<p>Cosenza, where the Visigothic king Alaric was buried in the bed of the Busento river in 410, gained a provincial DOC in 2011.</p>`,[]],
"it-melissa":[`<p>Melissa, near Cirò, became a DOC in 1979.</p>`,[]],
"it-s-anna-di-isola-capo-rizzuto":[`<p>Isola di Capo Rizzuto, with the Aragonese castle of Le Castella on the sea, became a DOC in 1979.</p>`,[]],
"it-lamezia":[`<p>Lamezia Terme, a city formed in 1968 by merging three towns, became a DOC in 1978.</p>`,[]],
"it-bivongi":[`<p>Bivongi, below the Byzantine monastery of San Giovanni Theristis, became a DOC in 1996.</p>`,[]],
"it-savuto":[`<p>The Savuto valley south of Cosenza became a DOC in 1975.</p>`,[]],
"it-scavigna":[`<p>Scavigna, near Nocera Terinese on the Tyrrhenian coast, became a DOC in 1994.</p>`,[]],
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
})();
// HISTORY-PASS-END
