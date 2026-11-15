// Full encyclopedia entries: Emilia-Romagna. Written from each disciplinare di produzione (AIS copies).
function erSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function er(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [erSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-romagna-albana"] = er({
  lede: "Albana from the Romagna hills, Italy's first white DOCG (1987), made dry, off-dry, sweet and, at its best, as a passito.",
  cat: "DOCG, white (secco, amabile, dolce, passito)", rec: "DOC 1967; DOCG 1987 (first white DOCG)", d: "Romagna/DOCG/Romagna Albana",
  amended: "Text as amended by DM 20 March 2018 and a 2019 ordinary amendment",
  facts: [["Grape", "Albana at least 95%"], ["Types", "Secco, amabile, dolce, passito, passito riserva"], ["Yield", "10 t/ha; 11.5% natural"], ["Passito", "Grapes dried until as late as 30 March after the harvest, to at least 284 g/l sugar; grape to wine 50%; released from 1 September of the year after (Riserva from 1 December); total alcohol 17%, Riserva 24%"], ["Riserva and botrytis", "Passito riserva may come from grapes shrivelled on the vine with noble rot"]],
  place: "Hills of the provinces of Forlì-Cesena, Ravenna and Bologna between Imola and Cesena, on clay, sandstone and the chalky 'spungone' near Bertinoro.",
  rules: "The DOCG was renamed 'Romagna Albana' (formerly Albana di Romagna) in 2011.",
  history: "Its 1987 DOCG, Italy's first for a white wine, was controversial because the wine was then little known.",
  glass: "Dry: golden, apricot, almond, a slight tannic grip. Passito: honey, dried apricot, saffron, with botrytis in some.",
  exam: "First white DOCG (1987). Albana is a tannic white grape.",
  producers: ["Fattoria Zerbina", "Tre Monti", "Celli", "Leone Conti"]
});
APXF["it-colli-bolognesi-classico-pignoletto"] = er({
  lede: "The hill version of Pignoletto (Grechetto Gentile) from the Colli Bolognesi, still, frizzante or sparkling.",
  cat: "DOCG, white (still, frizzante, spumante)", rec: "Type of Colli Bolognesi DOC 1997; DOCG 2010 (DM 8 November 2010)", d: "Emilia/DOCG/Colli Bolognesi Pignoletto",
  amended: "Text as amended by Regulation (EU) 2023/445",
  facts: [["Grapes", "Grechetto Gentile (locally Alionzina or Pignoletto) at least 85%"], ["Types", "Frizzante, spumante, Superiore, Classico Superiore"], ["Classico", "Still Superiore from the oldest zone; grape to wine 65%; total alcohol 13%"], ["Superiore", "Released from 4 October of the year after the harvest"]],
  place: "Clay and sandstone hills south-west of Bologna along the Reno, Samoggia and Lavino valleys.",
  rules: "Bottling within the zone, with established exceptions.",
  glass: "Fresh, lightly bitter-almond white; often lightly sparkling.",
  exam: "Pignoletto is genetically Grechetto di Todi (Grechetto Gentile).",
  producers: []
});
APXF["it-pignoletto"] = er({
  lede: "The plain and hill Pignoletto DOC created in 2014; since the 2024 harvest it is called Emilia-Romagna DOC, reserved for Pignoletto wines.",
  cat: "DOC, white (still, frizzante, spumante, passito, late harvest)", rec: "DOC 2014 (Pignoletto); renamed Emilia-Romagna DOC by EU implementing regulation, from the 2024 harvest", d: "Emilia/DOC/Emilia-Romagna",
  sources: [["Italian Wine Central: Emilia-Romagna DOC (formerly Pignoletto DOC)", "https://italianwinecentral.com/denomination/emilia-romagna-doc/"]],
  facts: [["Grapes", "Pignoletto at least 85%; Pinot Nero and Pinot Grigio vinified white may be among the other 15%"], ["Zone", "Communes of the provinces of Bologna and Modena (and the Imola area)"], ["Natural alcohol", "9%"], ["Grape to wine", "70%"], ["Passito", "Grapes to 15% potential alcohol; total 15%, at least 12% actual"], ["Late harvest", "9 t/ha; 14% potential; total 14%, 12% actual"]],
  place: "The Reno and Panaro plains and foothills between Bologna and Modena.",
  rules: "Most is sold as frizzante or tank-method spumante.",
  history: "Producers pushed for the region's name to protect Pignoletto as a place rather than a grape.",
  glass: "Light, citrus and green apple, gently sparkling.",
  exam: "The DOC once called Pignoletto is now Emilia-Romagna DOC; Colli Bolognesi Pignoletto is the hill DOCG.",
  producers: []
});
APXF["it-lambrusco-di-sorbara"] = er({
  lede: "The palest, most fragrant Lambrusco, from the Sorbara variety on the sandy plain north of Modena between the Secchia and Panaro.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco di Sorbara",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco di Sorbara at least 60%; Lambrusco Salamino up to 40%; other Lambruschi up to 15%"], ["Yield", "18 t/ha; 9.5% natural"], ["Total alcohol", "Spumante 11%; frizzante 10.5%"]],
  place: "Alluvial sandy soils near Sorbara and Bomporto.",
  rules: "Sorbara has a female-functional flower and needs Salamino as pollinator, hence the blend. Second fermentation in tank or bottle (including the ancestral 'rifermentato in bottiglia').",
  glass: "Pale ruby-pink, violet and strawberry, sharp acidity, dry and frothy.",
  exam: "Sorbara is the lightest Lambrusco; Grasparossa the darkest.",
  producers: ["Cleto Chiarli", "Paltrinieri", "Cantina della Volta", "Francesco Bellei"]
});
APXF["it-lambrusco-grasparossa-di-castelvetro"] = er({
  lede: "The darkest, most tannic Lambrusco, from Grasparossa on the foothills south of Modena around Castelvetro.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco Grasparossa di Castelvetro",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco Grasparossa at least 85%; other Lambruschi and Malbo Gentile up to 15%"], ["Yield", "18 t/ha; 9.5% natural"], ["Total alcohol", "Spumante 11%; frizzante 10.5%"]],
  place: "Clay foothills of the Apennines south of Modena.",
  rules: "Dry to sweet styles.",
  glass: "Deep purple, black cherry, firm tannin, often off-dry.",
  exam: "Grasparossa = red-stemmed, dark, tannic Lambrusco.",
  producers: ["Vittorio Graziano", "Cleto Chiarli", "Fattoria Moretto"]
});
APXF["it-lambrusco-salamino-di-santa-croce"] = er({
  lede: "Mid-weight Lambrusco from the Salamino variety around Santa Croce near Carpi, north of Modena.",
  cat: "DOC, red and rosé (frizzante, spumante)", rec: "DOC 1970", d: "Emilia/DOC/Lambrusco Salamino di Santa Croce",
  amended: "Text as amended by DM 8 October 2018",
  facts: [["Grapes", "Lambrusco Salamino at least 85%; other Lambruschi, Ancellotta, Fortana up to 15%"], ["Yield", "19 t/ha; 9.5% natural"]],
  place: "The plain around Carpi.",
  rules: "The name comes from the salami-shaped bunch.",
  glass: "Ruby, red berries, moderate tannin.",
  exam: "Between Sorbara and Grasparossa in colour and body.",
  producers: ["Cavicchioli"]
});
APXF["it-modena"] = er({
  lede: "A province-wide DOC for Lambrusco and other sparkling wines of Modena.",
  cat: "DOC, red, rosé, white (frizzante, spumante)", rec: "DOC 2009 (DM 27 July 2009)", d: "Emilia/DOC/Modena o di Modena",
  facts: [["Also labelled", "di Modena"], ["Types", "Lambrusco, Rosso, Rosato, Bianco, also novello"], ["Yield", "23 t/ha; 9.5% natural"]],
  place: "The whole province of Modena.", rules: "High-yield regional DOC.", glass: "Simple, frothy wines.", exam: "Catch-all Modena DOC.", producers: []
});
APXF["it-reggiano"] = er({
  lede: "The Lambrusco DOC of the province of Reggio Emilia, using many Lambrusco varieties, including the dark Ancellotta.",
  cat: "DOC, red, white (frizzante, spumante)", rec: "DOC 1971 (DPR 22 July 1971, as Lambrusco Reggiano); renamed Reggiano in 1996", d: "Emilia/DOC/Reggiano",
  facts: [["Types", "Lambrusco, Lambrusco Salamino, Rosso, Bianco spumante, novello"], ["Yield", "18 t/ha; 9.5% natural"]],
  place: "The plain and foothills of Reggio Emilia.", rules: "Dry to sweet styles; some partly fermented musts allowed.", glass: "Fruity, purple Lambrusco.", exam: "Reggio's Lambrusco DOC.", producers: ["Medici Ermete", "Lini 910"]
});
APXF["it-colli-di-scandiano-e-di-canossa"] = er({
  lede: "Hills of Reggio Emilia for Spergola whites, Lambruschi including Montericco, Malbo Gentile and Marzemino.",
  cat: "DOC, white, red, sparkling, passito", rec: "DOC 1976 (DPR 25 November 1976, as Bianco di Scandiano)", d: "Emilia/DOC/Colli di Scandiano e di Canossa",
  facts: [["Types", "Sauvignon, Malvasia, Pinot, Chardonnay, Spergola (also spumante, passito), Lambrusco Grasparossa, Lambrusco Montericco, Marzemino, Malbo Gentile, Cabernet Sauvignon, bianco, rosso"], ["Yields", "15 to 16 t/ha; passito 10 t/ha"]],
  place: "Apennine foothills around Scandiano and the Matilda of Canossa castles.", rules: "Passito grape to wine 50%.", glass: "Crisp Spergola; frothy reds.", exam: "Spergola is a local white once confused with Sauvignon.", producers: []
});
APXF["it-colli-di-parma"] = er({
  lede: "Hills of Parma, for frizzante Malvasia and a Barbera-Croatina red.",
  cat: "DOC, white, red, sparkling", rec: "DOC 1982", d: "Emilia/DOC/Colli di Parma",
  facts: [["Types", "Rosso, Malvasia, Sauvignon, Chardonnay, Pinots, Spumante, Merlot, Cabernets, Barbera, Bonarda, Lambrusco"], ["Malvasia", "11 t/ha; grape to wine 65%"]],
  place: "Foothills of the Taro and Baganza valleys.", rules: "Many frizzante types.", glass: "Aromatic Malvasia di Candia frizzante.", exam: "Malvasia di Candia Aromatica dominates.", producers: []
});
APXF["it-colli-piacentini"] = er({
  lede: "Hills of Piacenza on the Lombardy border, for Malvasia, Barbera-Croatina reds and Vin Santo di Vigoleno.",
  cat: "DOC, white, red, sparkling, sweet", rec: "First decree 1967 (DPR 9 July 1967, for the earlier Piacenza DOCs); Colli Piacentini DOC in its current form from 1984", d: "Emilia/DOC/Colli Piacentini",
  facts: [["Types", "Monterosso Val d'Arda, Trebbianino Val Trebbia, Valnure, Barbera, Bonarda, Malvasia (also passito), Pinot Grigio, Pinot Nero, Sauvignon, Cabernet Sauvignon, Chardonnay, Novello, Vin Santo, Vin Santo di Vigoleno"], ["Vin Santo di Vigoleno", "Grapes dried to 30% sugar; total alcohol 18%"]],
  place: "Valleys of the Tidone, Trebbia, Nure and Arda.", rules: "Gutturnio and Ortrugo became separate DOCs.", glass: "Frizzante whites; Barbera-Croatina reds.", exam: "Vin Santo di Vigoleno is one of Italy's rarest sweet wines.", producers: ["La Stoppa"]
});
APXF["it-gutturnio"] = er({
  lede: "The Barbera-Croatina red of the Piacenza hills, frizzante or still and aged.",
  cat: "DOC, red", rec: "Type of Colli Piacentini 1967; own DOC 2010", d: "Emilia/DOC/Gutturnio",
  amended: "Text as amended by DM 26 October 2017 and a ministerial provision of 12 July 2019",
  facts: [["Grapes", "Barbera 55 to 70%; Croatina (Bonarda) 30 to 45%"], ["Types", "Frizzante, Superiore, Classico Superiore, Riserva, Classico Riserva"], ["Total alcohol", "12%; Superiore 12.5%; Riserva 13%"]],
  place: "The Piacenza hills including Ziano Piacentino; Classico for the historic core.", rules: "Grape to wine 70%.", history: "Named after a Roman silver drinking vessel (gutturnium) found nearby.", glass: "Juicy, cherry-fruited, sometimes frothy.", exam: "Gutturnio = Barbera + Croatina.", producers: ["La Stoppa", "Luretta"]
});
APXF["it-ortrugo-dei-colli-piacentini"] = er({
  lede: "Ortrugo, a native white of Piacenza, still, frizzante or sparkling.",
  cat: "DOC, white", rec: "DOC 2010", d: "Emilia/DOC/Ortrugo dei Colli Piacentini o Ortrugo-Colli Piacentini",
  facts: [["Grape", "Ortrugo at least 90%"], ["Total alcohol", "11%"]],
  place: "The Piacenza hills.", rules: "Grape to wine 70%.", glass: "Light, bitter-almond, often frizzante.", exam: "Ortrugo is native to Piacenza.", producers: []
});
APXF["it-colli-bolognesi"] = er({
  lede: "Hills south-west of Bologna, for Barbera, Bordeaux varieties and whites, with a Bologna subzone.",
  cat: "DOC, red, white", rec: "DOC 1975", d: "Emilia/DOC/Colli Bolognesi",
  facts: [["Types", "Barbera (also riserva), Merlot, Cabernet Sauvignon, Chardonnay, Sauvignon, Riesling Italico, Pinot Bianco"], ["Yields", "10 to 12 t/ha"], ["Subzone", "Bologna"]],
  place: "Clay and sandstone hills along the Reno, Samoggia and Lavino.", rules: "Pignoletto became a DOCG of its own.", glass: "Fresh Barbera; Cabernet with herbal notes.", exam: "Pignoletto is the hill DOCG.", producers: []
});
APXF["it-reno"] = er({
  lede: "A plain DOC north of Bologna, now chiefly for Montuni, a local white.",
  cat: "DOC, white", rec: "DOC 1987 (DPR 22 June 1987)", d: "Emilia/DOC/Reno",
  facts: [["Types", "Montuni (Montù at least 85%), Bianco (Albana and Trebbiano), frizzante, spumante"], ["Yield", "18 t/ha; 10% natural"]],
  place: "The Reno plain.", rules: "Grape to wine 70%.", glass: "Neutral, light whites.", exam: "Montù = Montuni.", producers: []
});
APXF["it-bosco-eliceo"] = er({
  lede: "Coastal sandy vineyards near Ferrara and Ravenna, home of Fortana, a red often called 'uva d'oro'.",
  cat: "DOC, red, white", rec: "DOC 1989", d: "Emilia/DOC/Bosco Eliceo",
  amended: "Text as amended by DM 23 October 2018",
  facts: [["Types", "Fortana (also frizzante), Merlot, Sauvignon, Bianco"], ["Yield", "15 t/ha"]],
  place: "Sand dunes and pine woods of the Po delta coast, where ungrafted vines survive in sand.", rules: "Grape to wine 70%.", glass: "Fortana: tart, light red, often off-dry and fizzy.", exam: "Sandy soils kept phylloxera out.", producers: []
});
APXF["it-romagna"] = er({
  lede: "The DOC of Romagna, centred on Sangiovese (Romagna Sangiovese), with 16 subzones, plus Trebbiano, Pagadebit, Cagnina and sparkling Albana.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 2011 (uniting the earlier Romagna DOCs)", d: "Romagna/DOC/Romagna",
  amended: "Text as amended by DM 26 May 2022",
  facts: [["Types", "Sangiovese (also novello, riserva, superiore, passito), Trebbiano, Pagadebit (Bombino Bianco), Cagnina (Refosco/Terrano, sweet), Albana spumante dolce, Bianco, Rosato, Rosso"], ["Subzones", "Bertinoro, Brisighella, Castrocaro, Cesena, Longiano, Meldola, Modigliana, Marzeno, Oriolo, Predappio, Mercato Saraceno, Serra, Imola, Coriano, San Clemente, Verucchio"], ["Romagna Sangiovese", "Sangiovese at least 85%"], ["Yields", "Sangiovese 12 t/ha; Superiore 10.5 t/ha; Bianco and Rosato 18"], ["Release", "Sangiovese 1 December of the harvest year; Superiore 1 April after; Riserva after 24 months from 1 December; Cagnina from 10 October"]],
  place: "Apennine foothills from Imola to Rimini: clay and the yellow sands and 'spungone' (fossil limestone) around Bertinoro; Modigliana's sandstone at altitude.",
  rules: "Subzone names carry stricter rules; Riserva 24 months.",
  glass: "Sangiovese: cherry, violet, softer than Tuscan; Modigliana fresher and more mineral.",
  exam: "Romagna Sangiovese plus 16 subzones; Pagadebit = Bombino Bianco; Cagnina = sweet Terrano.",
  producers: ["Fattoria Zerbina", "Villa Papiano", "Il Pratello", "Tre Monti", "Noelia Ricci", "Torre San Martino"]
});
APXF["it-colli-di-rimini"] = er({
  lede: "The Rimini hills DOC, for Sangiovese, Cabernet, Biancame and the sweet or dry Rebola (Pignoletto).",
  cat: "DOC, red, white, passito", rec: "DOC 1996", d: "Romagna/DOC/Rimini",
  amended: "Text as amended by DM 6 August 2020 and an EU implementing regulation",
  facts: [["Also labelled", "Rimini"], ["Types", "Rosso, Bianco, Cabernet Sauvignon, Biancame, Sangiovese (superiore, riserva), Rebola secco, Rebola passito"], ["Riserva", "24 months from 1 December"]],
  place: "Hills inland from Rimini.", rules: "Rebola passito total alcohol 17%.", glass: "Rebola: aromatic, sometimes sweet white.", exam: "Rebola is the Rimini name for Grechetto Gentile.", producers: []
});
APXF["it-colli-d-imola"] = er({
  lede: "A small DOC in the Imola hills for blends and varietals.",
  cat: "DOC, red, white", rec: "DOC 1997", d: "Romagna/DOC/Colli d'Imola",
  facts: [["Types", "Rosso (also novello, riserva), Bianco (also frizzante, superiore), Sangiovese, Cabernet Sauvignon, Barbera, Trebbiano, Chardonnay, Pignoletto"]],
  place: "Foothills between Bologna and Romagna.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC; Imola is also a Romagna subzone.", producers: []
});
APXF["it-colli-di-faenza"] = er({
  lede: "Hills around Faenza for Sangiovese, blends and Pinot Bianco.",
  cat: "DOC, red, white", rec: "DOC 1997", d: "Romagna/DOC/Colli di Faenza",
  facts: [["Types", "Bianco (Chardonnay 40 to 60%), Rosso, Pinot Bianco, Sangiovese, Trebbiano"], ["Yields", "8.5 to 11.5 t/ha"]],
  place: "Foothills of the Lamone valley.", rules: "Grape to wine 70%.", glass: "Medium-bodied reds.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-romagna-centrale"] = er({
  lede: "A DOC for the central Romagna hills around Cesena and Forlì, for Sangiovese, Cabernet and Chardonnay-based blends.",
  cat: "DOC, red, white", rec: "DOC 2001 (DM 29 September 2001)", d: "Romagna/DOC/Colli Romagna Centrale",
  facts: [["Types", "Bianco (Chardonnay 50 to 60%), Rosso, Chardonnay, Cabernet Sauvignon, Sangiovese, Trebbiano; riserva"]],
  place: "Hills of the Savio and Bidente valleys.", rules: "Released from 30 April of the year after the harvest; sold only in glass or ceramic containers.", glass: "Structured reds.", exam: "Minor DOC.", producers: []
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
