// Full encyclopedia entries: Sardinia. Written from each disciplinare di produzione (AIS copies).
function sarSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Sardegna/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function sar(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [sarSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-vermentino-di-gallura"] = sar({
  lede: "Sardinia's only DOCG: Vermentino from the granite of Gallura in the island's north-east, fuller and more saline than Vermentino elsewhere.",
  cat: "DOCG, white (still, frizzante, spumante, passito, late harvest)", rec: "DOCG 1996 (DM 11 September 1996), previously a DOC", d: "DOCG/Vermentino di Gallura",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Vermentino at least 95%"], ["Zone", "Communes of Gallura, including Arzachena, Aggius, Aglientu, Badesi, Berchidda, Calangianus, Luras, Monti, Olbia, Palau, Tempio Pausania"], ["Types", "Vermentino di Gallura, Superiore, Frizzante, Spumante, Passito, Vendemmia tardiva"], ["Superiore", "9 t/ha; 12% natural; total 13%"], ["Passito", "15% natural after drying; grape to wine 50%; released from 1 May"], ["Late harvest", "Released from 15 January after the harvest"]],
  place: "Decomposed granite (sabbione) hills of the north-east, swept by the mistral, between Monte Limbara and the Costa Smeralda.",
  rules: "The Superiore is the quality benchmark.",
  glass: "Straw-gold, white peach, Mediterranean scrub, almond, a saline, slightly bitter finish, more body than most Vermentino.",
  exam: "Sardinia's only DOCG (1996), on granite.",
  producers: ["Capichera", "Cantina Gallura", "Vigne Surrau", "Siddura", "Cantina del Vermentino Monti", "Piero Mancini"]
});
APXF["it-cannonau-di-sardegna"] = sar({
  lede: "Sardinia's signature red, from Cannonau (Grenache), island-wide, with a Classico zone in Nuoro and Ogliastra and three subzones.",
  cat: "DOC, red, rosé, passito, fortified", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Cannonau di Sardegna",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Cannonau at least 85% (Classico at least 90%)"], ["Subzones", "Oliena or Nepente di Oliena, Capo Ferrato, Jerzu"], ["Classico", "Provinces of Nuoro and Ogliastra; 9 t/ha; 2 years from 1 November, 12 months in wood"], ["Yields", "11 t/ha; 12.5% natural (Riserva 13%)"], ["Riserva", "At least 2 years from 1 November, including wood ageing"], ["Release", "Rosso from 1 April after harvest; Rosato from 1 January"], ["Passito and Liquoroso", "Passito total 15%, 50 g/l sugar; Liquoroso secco 18% actual, dolce 16%"]],
  place: "The whole island, but its heart is the mountainous east: Mamoiada, Oliena, Orgosolo, Jerzu, on granite and schist at high altitude.",
  rules: "Producers have debated territorial names such as Barbagia and Ogliastra; none was in force at the date checked.",
  history: "The Ogliastra and Barbagia, where centenarians are unusually common, have made Cannonau part of the 'Blue Zone' story.",
  glass: "Red berries, dried herbs, myrtle, pepper; traditional styles warm and high in alcohol, newer ones fresher.",
  exam: "Cannonau = Grenache (Garnacha); Nepente di Oliena subzone.",
  producers: ["Giuseppe Sedilesu", "Argiolas", "Sella & Mosca", "Antichi Poderi di Jerzu", "Giovanni Montisci", "Puddu", "Gabbas"]
});
APXF["it-vermentino-di-sardegna"] = sar({
  lede: "Island-wide Vermentino, from fresh everyday wine to fine bottlings from the south and north-west.",
  cat: "DOC, white (still, frizzante, spumante)", rec: "DOC 1988 (DPR 23 February 1988)", d: "DOC/Vermentino di Sardegna",
  facts: [["Grape", "Vermentino at least 85%"], ["Yield", "16 t/ha; 10% natural"], ["Total alcohol", "10.5% actual minimum"]],
  place: "All of Sardinia.", rules: "Much higher yields than Vermentino di Gallura.", glass: "Citrus, herbs, saline.", exam: "DOC vs Gallura DOCG.", producers: ["Argiolas", "Sella & Mosca", "Santadi"]
});
APXF["it-carignano-del-sulcis"] = sar({
  lede: "Carignano from old, often ungrafted alberello vines on the sands of the Sulcis in south-western Sardinia.",
  cat: "DOC, red, rosé, passito", rec: "DOC 1977 (DPR 1 June 1977)", d: "DOC/Carignano del Sulcis",
  facts: [["Grape", "Carignano at least 85%"], ["Types", "Rosso, Riserva, Superiore, Rosato, Novello, Passito"], ["Yield", "11 t/ha"], ["Superiore", "From alberello vines; lower yields"], ["Passito", "Grapes to 27% sugar, pressed 10 October to 31 March; total 16%, 14% actual"]],
  place: "The Sulcis and the islands of Sant'Antioco and San Pietro: sandy soils where phylloxera could not survive.", rules: "Ageing counts from 1 January after the harvest.",
  glass: "Dark, plum, black olive, myrtle, soft tannin.", exam: "Carignano = Carignan (Cariñena).", producers: ["Santadi (Terre Brune)", "Sardus Pater", "Mesa", "6Mura"]
});
APXF["it-vernaccia-di-oristano"] = sar({
  lede: "A dry, sherry-like white from Vernaccia di Oristano, aged in part-filled casks under a film of flor, from the Tirso valley.",
  cat: "DOC, fortified-style and oxidative white", rec: "DOC 1971 (DPR 11 August 1971), Sardinia's first", d: "DOC/Vernaccia di Oristano",
  facts: [["Grape", "Vernaccia di Oristano 100%"], ["Types", "Vernaccia di Oristano, Superiore, Riserva, Liquoroso"], ["Ageing", "At least 2 years in chestnut or oak casks from March after the harvest; Superiore at least 3 years; Riserva at least 4"], ["Natural alcohol", "14%; Superiore 15%"], ["Total alcohol", "15% actual; Superiore 15.5%; Riserva 16.5%"]],
  place: "The flat lower Tirso valley around Oristano, on alluvial soils.", rules: "Casks are not topped up, so a flor yeast veil forms.", glass: "Amber, almond, walnut, salt, dry and long.", exam: "Sardinia's 'sherry'; flor ageing.", producers: ["Contini", "Silvio Carta", "Columbu"]
});
APXF["it-malvasia-di-bosa"] = sar({
  lede: "Malvasia di Sardegna from Bosa on the west coast, made dry or sweet, often aged oxidatively under flor.",
  cat: "DOC, white (dry, sweet, spumante, passito)", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Malvasia di Bosa",
  facts: [["Grape", "Malvasia di Sardegna at least 95%"], ["Yield", "6 t/ha (spumante 8); 15% natural"], ["Riserva", "2 years from 1 November"], ["Passito", "Grape to wine 50%; total 16%, 14% actual"]],
  place: "Hills of Bosa, Suni and neighbours near the Temo river.", rules: "One of Italy's lowest permitted yields.", glass: "Almond, apricot, salt, nutty.", exam: "Minor DOC.", producers: ["Columbu", "Zarelli"]
});
APXF["it-monica-di-sardegna"] = sar({
  lede: "Light, soft reds from the Monica grape across Sardinia.",
  cat: "DOC, red (still, superiore, frizzante)", rec: "DOC 1972 (DPR 1 September 1972)", d: "DOC/Monica di Sardegna",
  facts: [["Grape", "Monica at least 85%"], ["Yield", "15 t/ha; 10.5% natural (Superiore 12%)"], ["Release", "From 31 March after harvest"]],
  place: "Mostly the south.", rules: "Grape to wine 70%.", glass: "Soft, red-fruited, easy.", exam: "Monica: widely grown Sardinian red.", producers: ["Argiolas", "Santadi"]
});
APXF["it-moscato-di-sardegna"] = sar({
  lede: "Moscato Bianco from across the island, still, passito, late harvest or sparkling, with Tempio Pausania and Gallura subzones.",
  cat: "DOC, sweet white, sparkling", rec: "DOC 1979 (DPR 13 December 1979)", d: "DOC/Moscato di Sardegna",
  facts: [["Grape", "Moscato Bianco; white grapes up to 10%"], ["Yield", "11 t/ha"], ["Natural alcohol", "Bianco 14%; Passito 16%; overripe 15%; spumante 9%"], ["Release", "Spumante from 15 October; Bianco from 1 March; Passito from 1 July"]],
  place: "All of Sardinia.", rules: "Passito grape to wine 50%.", glass: "Grapey, orange blossom.", exam: "Minor DOC.", producers: []
});
APXF["it-moscato-di-sorso"] = sar({
  lede: "Sweet Moscato from Sorso and Sennori near Sassari.",
  cat: "DOC, sweet white", rec: "DOC 1972 (DPR 31 March 1972)", d: "DOC/Moscato di Sorso-Sennori o Moscato di Sorso o Moscato di Sennori",
  facts: [["Also labelled", "Moscato di Sorso, Moscato di Sennori"], ["Types", "Bianco, Liquoroso, Passito, Spumante"], ["Yield", "9 t/ha; 14% natural"]],
  place: "Limestone hills above the Gulf of Asinara.", rules: "Passito grape to wine 50%.", glass: "Rich Moscato.", exam: "Minor DOC.", producers: []
});
APXF["it-cagliari"] = sar({
  lede: "A 2011 DOC for the province of Cagliari, uniting Malvasia, Monica, Moscato and Vermentino from the south.",
  cat: "DOC, white, red, sweet", rec: "DOC 2011 (DM 4 November 2011)", d: "DOC/Cagliari",
  facts: [["Types", "Malvasia (also spumante, riserva), Monica (also riserva), Moscato, Vermentino (also superiore)"], ["Malvasia", "Malvasia di Sardegna at least 85%"], ["Riserva", "Ageing from 1 November"]],
  place: "The Campidano and southern hills.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: ["Argiolas"]
});
APXF["it-giro-di-cagliari"] = sar({ lede: "Sweet or dry red from the rare Girò grape around Cagliari.", cat: "DOC, red (still, liquoroso)", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Giro di Cagliari", facts: [["Grape", "Girò (up to 5% other vines allowed for pollination)"], ["Yield", "12 t/ha; 13% natural"], ["Grape to wine", "60%"], ["Release", "From 1 July after harvest"]], place: "Southern Sardinia.", rules: "Grape to wine 70%.", glass: "Cherry, sweet spice.", exam: "Girò: rare red.", producers: [] });
APXF["it-nasco-di-cagliari"] = sar({ lede: "Sweet or dry white from the ancient Nasco grape around Cagliari.", cat: "DOC, white (still, liquoroso)", rec: "DOC 1972 (DPR 21 June 1972)", d: "DOC/Nasco di Cagliari", facts: [["Grape", "Nasco"], ["Yield", "10 t/ha; 13% natural"], ["Grape to wine", "65%"]], place: "Southern Sardinia.", rules: "Grape to wine 70%.", glass: "Musky, honeyed.", exam: "Nasco: ancient Sardinian white.", producers: ["Argiolas"] });
APXF["it-nuragus-di-cagliari"] = sar({ lede: "Light whites from Nuragus, an ancient Sardinian grape.", cat: "DOC, white (still, frizzante)", rec: "DOC 1974 (DPR 28 November 1974)", d: "DOC/Nuragus di Cagliari", facts: [["Grape", "Nuragus at least 85%"], ["Yield", "16 t/ha; 10% natural"]], place: "The Campidano plain.", rules: "Grape to wine 70%.", glass: "Neutral, fresh, lemony.", exam: "Nuragus: named after the nuraghe towers.", producers: ["Argiolas"] });
APXF["it-sardegna-semidano"] = sar({ lede: "Semidano, a rare Sardinian white, with a subzone at Mogoro.", cat: "DOC, white (still, superiore, passito, spumante)", rec: "DOC 1995 (DPR 28 August 1995)", d: "DOC/Sardegna Semidano", facts: [["Grape", "Semidano at least 85%"], ["Subzone", "Mogoro"], ["Yield", "13 t/ha"], ["Passito", "Grape to wine 50%; total 15%, 35 g/l sugar"]], place: "Central-western Sardinia.", rules: "Grape to wine 70%.", glass: "Aromatic, textured white.", exam: "Minor DOC.", producers: ["Cantina di Mogoro"] });
APXF["it-mandrolisai"] = sar({ lede: "A mountain red blend of Bovale Sardo, Cannonau and Monica from central Sardinia.", cat: "DOC, red, rosé", rec: "DOC 1981 (DPR 6 June 1981)", d: "DOC/Mandrolisai", facts: [["Grapes", "Bovale Sardo at least 35%; Cannonau 20 to 35%; Monica 20 to 35%"], ["Yield", "12 t/ha"], ["Superiore", "11.5% natural; 2 years, 1 in wood; total 12.5%"]], place: "Granite uplands around Sorgono and Atzara.", rules: "Grape to wine 70%.", glass: "Spicy, medium-bodied.", exam: "Bovale-led blend.", producers: [] });
APXF["it-campidano-di-terralba"] = sar({ lede: "Bovale reds from the sandy plain around Terralba near Oristano.", cat: "DOC, red", rec: "DOC 1975 (DPR 15 November 1975)", d: "DOC/Campidano di Terralba o Terralba", facts: [["Also labelled", "Terralba"], ["Grapes", "Bovale at least 85%"], ["Types", "Bovale, Bovale Riserva, Bovale Superiore"], ["Yield", "11 t/ha; 11% natural (Superiore and Riserva 12%)"], ["Riserva", "2 years from 1 November"]], place: "Sandy coastal plain.", rules: "Grape to wine 70%.", glass: "Dark, rustic reds.", exam: "Bovale.", producers: [] });
APXF["it-arborea"] = sar({ lede: "Sangiovese and Trebbiano from the reclaimed plain of Arborea.", cat: "DOC, red, rosé, white", rec: "DOC 1987 (DPR 11 May 1987)", d: "DOC/Arborea", facts: [["Types", "Sangiovese (also rosato), Trebbiano (also frizzante)"], ["Yield", "18 t/ha"]], place: "Land reclaimed in the 1920s and 1930s near Oristano.", rules: "Grape to wine 70%.", glass: "Light wines.", exam: "Minor DOC.", producers: [] });
APXF["it-alghero"] = sar({ lede: "Catalan-founded Alghero in the north-west, for Torbato, Cagnulari, blends and international varietals.", cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1995 (DM 19 August 1995)", d: "DOC/Alghero", facts: [["Varietals", "Torbato (also spumante), Cagnulari, Vermentino frizzante, Sauvignon, Chardonnay, Cabernet, Merlot, Sangiovese"], ["Yields", "13 to 16 t/ha"], ["Rosso Riserva", "At least 24 months from 1 November"], ["Liquoroso", "At least 3 years"]], place: "Limestone and sandy hills around Alghero.", rules: "Passito grape to wine 50%.", glass: "Torbato: crisp, saline white.", exam: "Torbato survives almost only here.", producers: ["Sella & Mosca", "Santa Maria La Palma"] });
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
