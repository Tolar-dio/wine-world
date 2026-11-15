// Full encyclopedia entries: Liguria. Written from each disciplinare di produzione (AIS copies).
function ligSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Liguria/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function lig(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [ligSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-cinque-terre"] = lig({
  lede: "Whites from Bosco, Albarola and Vermentino on vertiginous terraces above the sea, and the rare sweet Sciacchetrà from dried grapes.",
  cat: "DOC, white and sweet white", rec: "DOC 1973 (DPR 29 May 1973)", d: "Cinque Terre e Cinque Terre Sciacchetra",
  amended: "Text as amended by DM 6 August 2021",
  facts: [["Grapes", "Bosco, Albarola and/or Vermentino at least 80%"], ["Subzones", "Costa de Sera, Costa de Campu, Costa da Posa"], ["Sciacchetrà", "Dried grapes; grape to wine at most 32%; released from 1 October of the year after the harvest; total alcohol 19% (Riserva 20%), at least 11.5% actual"]],
  place: "Terraces held by dry-stone walls over cliffs at Monterosso, Vernazza, Corniglia, Manarola and Riomaggiore (plus Tramonti in La Spezia), a UNESCO site; monorails carry the grapes.",
  rules: "Vinification in the zone.",
  glass: "Dry: saline, herbal, citrus. Sciacchetrà: amber, apricot, honey, sea-salt.",
  exam: "Sciacchetrà = passito of the Cinque Terre.",
  producers: ["Cantina Cinque Terre", "Possa", "Buranco", "Walter De Battè"]
});
APXF["it-colli-di-luni"] = lig({
  lede: "Vermentino and Sangiovese from the hills on the Liguria-Tuscany border at the mouth of the Magra.",
  cat: "DOC, white, red", rec: "DOC 1989", d: "Colli di Luni",
  facts: [["Regions", "Province of La Spezia (Liguria) and Massa-Carrara (Tuscany)"], ["Types", "Rosso (Sangiovese at least 50%), Bianco (Vermentino at least 35%, Trebbiano 25 to 40%), Vermentino (at least 90%; also superiore), Albarola"], ["Yield", "11 t/ha; Vermentino superiore 9 t/ha"], ["Riserva", "Reds aged two years from 1 November"]],
  place: "Hills of the Val di Magra near the Roman city of Luni.", rules: "Grape to wine 70%.", glass: "Vermentino: fuller, herbal, saline.", exam: "Crosses the Liguria-Tuscany border.", producers: ["Lunae Bosoni", "Ottaviano Lambruschi", "Cantine Bondonor"]
});
APXF["it-colline-di-levanto"] = lig({
  lede: "Vermentino, Albarola and Bosco whites and light reds from the coast just north of the Cinque Terre.",
  cat: "DOC, white, red", rec: "DOC 1995 (DM 11 August 1995)", d: "Colline di Levanto",
  facts: [["Bianco", "Vermentino at least 40%, Albarola at least 20%, Bosco at least 5%"], ["Wine yield", "63 hl/ha"]],
  place: "Terraces around Levanto.", rules: "Grape to wine 70%.", glass: "Saline whites.", exam: "Minor DOC.", producers: []
});
APXF["it-portofino"] = lig({
  lede: "Wines of the Gulf of Tigullio behind Portofino, including the local Bianchetta Genovese and Scimiscià.",
  cat: "DOC, white, red, rosé, sweet", rec: "DOC 1997", d: "Golfo del Tigullio-Portofino o  Portofino",
  facts: [["Also labelled", "Portofino"], ["Types", "Bianco, Rosso, Rosato, Bianchetta Genovese, Vermentino, Ciliegiolo, Moscato (also passito), Scimiscià (Cimixa)"], ["Subzone", "Costa dei Fieschi"], ["Yield", "9 t/ha"]],
  place: "Steep coastal hills of the Riviera di Levante east of Genoa.", rules: "Grape to wine 70%.", glass: "Fresh whites.", exam: "Scimiscià is a rare local white.", producers: []
});
APXF["it-val-polcevera"] = lig({
  lede: "A small DOC in the valley behind Genoa, with the Coronata subzone.",
  cat: "DOC, white, red, rosé, passito", rec: "DOC 1999", d: "Val Polcevera",
  facts: [["Types", "Bianco (also spumante, frizzante, passito), Rosso, Rosato, Bianchetta Genovese, Vermentino"], ["Subzone", "Coronata (whites)"], ["Yield", "9.5 t/ha"]],
  place: "The Polcevera valley on the edge of Genoa.", rules: "Passito grape to wine 50%.", glass: "Light whites.", exam: "Genoa's own DOC.", producers: []
});
APXF["it-riviera-ligure-di-ponente"] = lig({
  lede: "The western Ligurian Riviera, home of Pigato, Vermentino and Rossese, with five subzones.",
  cat: "DOC, white, red, sweet", rec: "DOC 1988", d: "Riviera Ligure di Ponente",
  facts: [["Types", "Granaccia (Alicante), Moscato, Pigato, Rossese, Vermentino; superiore and passito versions"], ["Subzones", "Riviera dei Fiori, Albenganese, Finalese, Quiliano, Taggia"], ["Yields", "Pigato and Vermentino 11 t/ha; superiore 9 t/ha"]],
  place: "Hills behind Imperia and Savona, the Albenga plain among them.", rules: "Passito grape to wine 50%.", glass: "Pigato: fuller, more structured than Vermentino, with a bitter finish.", exam: "Pigato is a biotype of Vermentino.", producers: ["Bruna", "Laura Aschero", "Lupi", "BioVio"]
});
APXF["it-rossese-di-dolceacqua"] = lig({
  lede: "Light, perfumed red from Rossese on steep slopes behind Ventimiglia, Liguria's first DOC.",
  cat: "DOC, red", rec: "DOC 1972 (DPR 28 January 1972)", d: "Rossese di Dolceacqua o Dolceacqua",
  facts: [["Also labelled", "Dolceacqua"], ["Grape", "Rossese at least 95%"], ["Communes", "Dolceacqua, Apricale, Baiardo, Camporosso, Castelvittorio, Isolabona, Perinaldo, Pigna, Rocchetta Nervina, San Biagio della Cima, Soldano and others"], ["Yield", "9 t/ha"], ["Superiore", "Released from 1 November of the year after the harvest"], ["Total alcohol", "12%; Superiore 13%"]],
  place: "Steep terraces on marl and sandstone near the French border.", rules: "Grape to wine 70%.", glass: "Pale, red cherry, rose, spice.", exam: "Rossese = Tibouren of Provence.", producers: ["Terre Bianche", "Maccario Dringenberg", "Tenuta Anfosso"]
});
APXF["it-pornassio"] = lig({
  lede: "Ormeasco (Dolcetto) from high mountain vineyards in the Arroscia valley, including the rosé Sciac-trà.",
  cat: "DOC, red, rosé, sweet", rec: "DOC 2003", d: "Pornassio o Ormeasco di Pornassio",
  facts: [["Also labelled", "Ormeasco di Pornassio"], ["Grape", "Ormeasco (Dolcetto) at least 95%"], ["Types", "Rosso, Sciac-trà (rosé), Superiore, Passito, Passito liquoroso"], ["Sciac-trà", "Released from 1 March after the harvest"]],
  place: "Mountain valleys of Imperia province near Piedmont.", rules: "Passito aged 12 months from 1 January.", glass: "Dark, fruity Dolcetto.", exam: "Ormeasco = Dolcetto.", producers: []
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
