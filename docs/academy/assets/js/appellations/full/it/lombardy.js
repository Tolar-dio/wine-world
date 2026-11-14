// Full encyclopedia entries: Lombardy. Written from each disciplinare di produzione (AIS copies).
const LOD = "https://aisitalia.it/Disciplinari/";
function loSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", LOD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function lom(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [loSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const LO_OP = "the Oltrepò Pavese hills south of the Po in the province of Pavia (Broni, Canneto Pavese, Casteggio, Montalto, Santa Maria della Versa and others)";
APXF["it-franciacorta"] = lom({
  lede: "Italy's leading traditional-method sparkling wine, from the moraine hills south of Lake Iseo near Brescia: a DOCG for bottle-fermented wine only.",
  cat: "DOCG, traditional-method sparkling (white, Satèn, rosé)", rec: "DOC 1967 (still and sparkling); DOCG 1995 (sparkling only)", d: "Lombardia/DOCG/Franciacorta",
  amended: "Text as amended by DM 7 May 2024",
  facts: [["Grapes", "Chardonnay and/or Pinot Nero; Pinot Bianco up to 50%; Erbamat up to 10%"], ["Rosé", "Pinot Nero at least 35%"], ["Satèn", "White grapes only (Chardonnay with up to 50% Pinot Bianco), Brut only, under 5 bar pressure"], ["Yield", "10 t/ha; 9.5% natural (Erbamat 9%)"], ["Grape to wine", "65%, including the liqueur de tirage"], ["Minimum time on lees", "Franciacorta 18 months; Rosé and Satèn 24; Millesimato 30; Riserva 60"], ["Millesimato", "At least 85% of the stated vintage"]],
  place: "Glacial moraine amphitheatre between Lake Iseo and Brescia: gravelly, well-drained soils, the lake tempering the climate.",
  rules: "Only bottle-fermented, disgorged sparkling wine. The still wines of the area are Curtefranca DOC. The label need not say 'metodo classico' or 'spumante'; the name alone signifies the method.",
  history: "Guido Berlucchi and oenologist Franco Ziliani released the first Franciacorta sparkling wine (Pinot di Franciacorta) in 1961. Ca' del Bosco and Bellavista built its luxury image from the 1970s.",
  glass: "Fine mousse, citrus, white peach, brioche; Satèn creamier.",
  exam: "Franciacorta 18 months, Satèn and Rosé 24, Millesimato 30, Riserva 60. Erbamat is a native late-ripening, high-acid grape allowed up to 10%.",
  producers: ["Ca' del Bosco", "Bellavista", "Berlucchi", "Cavalleri", "Uberti", "Barone Pizzini", "Arcari + Danesi"]
});
APXF["it-curtefranca"] = lom({
  lede: "The still red and white wines of the Franciacorta area, formerly Terre di Franciacorta.",
  cat: "DOC, white, red", rec: "DOC 1995 (as Terre di Franciacorta); renamed Curtefranca 2008", d: "Lombardia/DOC/Curtefranca",
  amended: "Text as amended by DM 14 March 2024",
  facts: [["Bianco", "Chardonnay at least 50%; Pinot Bianco and/or Pinot Nero up to 50%"], ["Rosso", "Cabernet Franc and/or Carmenère at least 20%; Merlot at least 25%; Cabernet Sauvignon 10 to 35%; others up to 15%"], ["Grape to wine", "68%"], ["Release", "Bianco 1 February after the harvest; Rosso 1 July"]],
  place: "The Franciacorta hills near Lake Iseo.",
  rules: "Vigna versions released later.",
  glass: "Clean Chardonnay; herbal Bordeaux blend.",
  exam: "Curtefranca is the still-wine partner of Franciacorta.",
  producers: []
});
APXF["it-valtellina-superiore"] = lom({
  lede: "Alpine Nebbiolo (Chiavennasca) from terraced south-facing slopes above the Adda in the Valtellina, with five historic subzones.",
  cat: "DOCG, red", rec: "DOC 1968; DOCG 1998", d: "Lombardia/DOCG/Valtellina superiore",
  facts: [["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Subzones", "Maroggia, Sassella, Grumello, Inferno, Valgella"], ["Yield", "56 hl/ha of wine (about 8 t/ha); 11% natural"], ["Ageing", "24 months, part in wood, from 1 December after the harvest; Riserva 3 years"], ["Total alcohol", "12%"]],
  place: "Some 2,500 km of dry-stone terraces on the Rhaetian Alps' south-facing slope, between 300 and 700 m, near Sondrio and Tirano; granite and schist soils.",
  rules: "The specification allows wine bottled in Switzerland to use the traditional name Stagafassli.",
  history: "The Valtellina belonged to the Swiss Grisons from 1512 to 1797, and its wines went north over the passes.",
  glass: "Pale garnet, red berries, rose, herbs, fine tannin and alpine acidity.",
  exam: "Chiavennasca = Nebbiolo. Subzones: Maroggia, Sassella, Grumello, Inferno, Valgella.",
  producers: ["Ar.Pe.Pe.", "Nino Negri", "Rainoldi", "Sandro Fay", "Mamete Prevostini", "Dirupi"]
});
APXF["it-sforzato-di-valtellina"] = lom({
  lede: "Dry red from Valtellina Nebbiolo dried after harvest until at least December: the Alpine cousin of Amarone, Italy's first dry passito DOCG.",
  cat: "DOCG, red (dry, from dried grapes)", rec: "DOC 1968 (as a Valtellina type); DOCG 2003", d: "Lombardia/DOCG/Sforzato di Valtellina o Sfursat di Valtellina",
  facts: [["Also labelled", "Sfursat di Valtellina"], ["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Drying", "Grapes 11% natural at harvest, dried in ventilated lofts to at least 14%; vinified not before 1 December"], ["Yield in wine", "No more than 40 hl/ha"], ["Ageing", "20 months including 12 in wood, from 1 April after the harvest"], ["Total alcohol", "14%"]],
  place: "The Valtellina terraces.",
  rules: "Drying rooms kept between 5 and 35°C with low humidity.",
  glass: "Dried cherry, fig, spice, with Nebbiolo's tannin and acidity.",
  exam: "Sforzato = 'forced'; dried-grape Nebbiolo.",
  producers: ["Nino Negri (5 Stelle)", "Rainoldi", "Mamete Prevostini"]
});
APXF["it-valtellina-rosso"] = lom({
  lede: "The base Nebbiolo of the Valtellina, from the same terraces as the Superiore at higher yields.",
  cat: "DOC, red", rec: "DOC 1968 (as Valtellina); renamed 2011", d: "Lombardia/DOC/Valtellina rosso o rosso di Valtellina",
  facts: [["Also labelled", "Rosso di Valtellina"], ["Grapes", "Nebbiolo (Chiavennasca) at least 90%"], ["Yield", "10 t/ha; 10% natural"], ["Release", "After at least 6 months from 1 December"], ["Total alcohol", "11%"]],
  place: "Slopes of the Adda valley in the province of Sondrio.",
  rules: "May be aged in wood.",
  glass: "Light, crunchy Nebbiolo.",
  exam: "The entry level under Valtellina Superiore.",
  producers: []
});
APXF["it-scanzo"] = lom({
  lede: "A tiny DOCG for sweet red passito from the rare Moscato di Scanzo grape, grown in one commune near Bergamo.",
  cat: "DOCG, sweet red (passito)", rec: "DOC 2002; DOCG 2009", d: "Lombardia/DOCG/Scanzo o Moscato di Scanzo",
  facts: [["Also labelled", "Scanzo"], ["Grape", "Moscato di Scanzo 100%"], ["Zone", "Part of the commune of Scanzorosciate (Bergamo)"], ["Yield", "7 t/ha; 12% natural"], ["Grape to wine", "30%"], ["Ageing", "At least two years; released from 1 November of the second year after the harvest"], ["At release", "Total alcohol at least 17%, 14% actual"]],
  place: "Steep slopes of 'sass de luna' marl near Bergamo.",
  rules: "Made from dried grapes.",
  glass: "Rose, cherry jam, spice, sweet.",
  exam: "One of Italy's smallest DOCGs.",
  producers: []
});
APXF["it-oltrepo-pavese-metodo-classico"] = lom({
  lede: "Traditional-method sparkling wine from Pinot Nero in the Oltrepò Pavese, Italy's largest Pinot Nero area.",
  cat: "DOCG, traditional-method sparkling", rec: "DOC 1970 (within Oltrepò Pavese); DOCG 2007", d: "Lombardia/DOCG/Oltrepo Pavese metodo classico",
  facts: [["Types", "Metodo classico, rosé, Pinot Nero, Pinot Nero rosé"], ["Grapes", "Pinot Nero at least 70% (85% for 'Pinot Nero'); Chardonnay, Pinot Grigio, Pinot Bianco for the rest"], ["Yield", "10 t/ha; 9.5% natural"], ["Grape to wine", "60%; rosé 65%"], ["Lees", "At least 15 months; millesimato 24 months"]],
  place: LO_OP + ".",
  rules: "Cruasé is a collective brand for the Pinot Nero rosé.",
  history: "The Oltrepò supplied Pinot Nero to Piedmont's sparkling houses from the 19th century.",
  glass: "Red-fruited, structured sparkling wine.",
  exam: "Cruasé = Oltrepò Pinot Nero rosé metodo classico.",
  producers: ["Monsupello", "Ca' di Frara", "Travaglino", "Conte Vistarino"]
});
APXF["it-oltrepo-pavese"] = lom({
  lede: "The umbrella DOC of the Oltrepò Pavese, for still, frizzante and sparkling wines from Barbera, Croatina, Pinot Nero, Riesling and more.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 1970", d: "Lombardia/DOC/Oltrepo Pavese",
  facts: [["Types", "Rosso, Rosato, Bianco, Barbera, Riesling, Cortese, Moscato (also passito and liquoroso), Malvasia, Pinot Nero vinified white or rosé, Chardonnay, Sauvignon and more"], ["Grape to wine", "70%; Moscato passito 45%"]],
  place: LO_OP + ".",
  rules: "Several former types became separate DOCs in 2010: Bonarda, Buttafuoco, Sangue di Giuda, Pinot Nero, Pinot Grigio, Casteggio.",
  glass: "From frothy reds to crisp Riesling.",
  exam: "Bonarda of the Oltrepò is Croatina, not Bonarda Piemontese.",
  producers: []
});
APXF["it-bonarda-dell-oltrepo-pavese"] = lom({
  lede: "Croatina-based red, usually frizzante, from the Oltrepò Pavese: the region's best-known everyday red.",
  cat: "DOC, red (still or frizzante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Bonarda dell'Oltrepo Pavese",
  facts: [["Grapes", "Croatina 85 to 100%; Barbera, Vespolina (Ughetta), Uva Rara up to 15%"], ["Grape to wine", "70%"], ["Total alcohol", "12% still; frizzante 11% (9% actual)"]],
  place: LO_OP + ".",
  rules: "Frizzante may be dry or off-dry.",
  glass: "Purple, frothy, black cherry and violet.",
  exam: "Here 'Bonarda' means Croatina.",
  producers: []
});
APXF["it-buttafuoco-dell-oltrepo-pavese"] = lom({
  lede: "A full red blend of Barbera and Croatina from seven communes south of the Via Emilia around Broni and Stradella.",
  cat: "DOC, red (still or frizzante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Buttafuoco dell'Oltrepo Pavese o Buttafuoco",
  facts: [["Also labelled", "Buttafuoco"], ["Grapes", "Barbera 25 to 65%; Croatina 25 to 65%; Uva Rara and Vespolina up to 45%"], ["Communes", "Stradella, Broni, Canneto Pavese, Montescano, Castana, Cigognola, Pietra de' Giorgi"], ["Release", "From 30 April after the harvest"], ["Total alcohol", "12%"]],
  place: "The hills between the Versa and Scuropasso streams.",
  rules: "Grape to wine 70%.",
  glass: "Dark, full, spicy red.",
  exam: "'Buttafuoco' means 'throws fire'.",
  producers: []
});
APXF["it-sangue-di-giuda"] = lom({
  lede: "A sweet, frothy red from Barbera and Croatina in the eastern Oltrepò, named 'Judas' blood'.",
  cat: "DOC, sweet red (still, frizzante, spumante)", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Sangue di Giuda dell'Oltrepo Pavese",
  facts: [["Also labelled", "Sangue di Giuda"], ["Grapes", "Barbera 25 to 65%; Croatina 25 to 65%; Uva Rara, Vespolina, Pinot Nero up to 45%"], ["Alcohol", "Total 12%, of which 5.5% (still) or 7% (frizzante) fermented"]],
  place: "The same hills as Buttafuoco around Broni and Canneto Pavese.",
  rules: "Fermentation stopped to keep sweetness.",
  glass: "Sweet, red-berried, gently fizzy.",
  exam: "A sweet red, unlike Buttafuoco.",
  producers: []
});
APXF["it-pinot-nero-dell-oltrepo-pavese"] = lom({
  lede: "Still red Pinot Nero from the Oltrepò Pavese.",
  cat: "DOC, red", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Pinot nero dell'Oltrepo Pavese",
  facts: [["Grapes", "Pinot Nero at least 95%"], ["Riserva", "24 months from 1 November"], ["Total alcohol", "12%; Riserva 12.5%"]],
  place: LO_OP + ".",
  rules: "Grape to wine 70%.",
  glass: "Red cherry, earth, light tannin.",
  exam: "Most Oltrepò Pinot Nero goes into sparkling wine.",
  producers: []
});
APXF["it-oltrepo-pavese-pinot-grigio"] = lom({
  lede: "Pinot Grigio from the Oltrepò Pavese hills, still or frizzante.",
  cat: "DOC, white", rec: "Type of Oltrepò Pavese DOC; own DOC 2010", d: "Lombardia/DOC/Oltrepo Pavese Pinot grigio",
  facts: [["Grapes", "Pinot Grigio at least 85%"], ["Total alcohol", "11%"]],
  place: LO_OP + ".", rules: "Grape to wine 70%.", glass: "Light, pear-scented white.", exam: "Minor DOC.", producers: []
});
APXF["it-casteggio"] = lom({
  lede: "A Barbera-based red from the hills of Casteggio in the Oltrepò Pavese.",
  cat: "DOC, red", rec: "DOC 2010", d: "Lombardia/DOC/Casteggio",
  facts: [["Grapes", "Barbera at least 65%; Croatina, Uva Rara, Vespolina, Pinot Nero up to 35%"], ["Yield", "8.5 t/ha; 12.5% natural"], ["Riserva", "3 years from 1 November"], ["Total alcohol", "12.5%"]],
  place: "Casteggio and neighbouring communes.", rules: "Compulsory ageing before release; Riserva 3 years.", glass: "Firm Barbera.", exam: "Minor DOC.", producers: []
});
APXF["it-lugana"] = lom({
  lede: "Turbiana (Trebbiano di Soave) whites from the clay plain at the south end of Lake Garda, straddling Lombardy and Veneto.",
  cat: "DOC, white (also superiore, riserva, late harvest, sparkling)", rec: "DOC 1967", d: "Veneto/DOC/Lugana",
  amended: "Text as amended by DM 22 December 2014",
  facts: [["Provinces", "Brescia (Sirmione, Desenzano, Pozzolengo, Lonato) and Verona (Peschiera)"], ["Grapes", "Turbiana at least 90%"], ["Yield", "12.5 t/ha; Superiore 11 t/ha"], ["Superiore", "12 months from 1 October"], ["Riserva", "24 months including 6 in bottle"]],
  place: "Compact white and grey glacial clays south of the lake, cooled by lake breezes.",
  rules: "Released from 15 January after the harvest.",
  glass: "Citrus, almond, saline; ages well.",
  exam: "Turbiana = Trebbiano di Soave, genetically identical to Verdicchio.",
  producers: ["Ca' dei Frati", "Zenato", "Ottella", "Le Morette"]
});
APXF["it-san-martino-della-battaglia"] = lom({
  lede: "A Friulano-based white and a sweet liquoroso from the battlefield hills south of Lake Garda.",
  cat: "DOC, white and fortified", rec: "DOC 1970", d: "Veneto/DOC/San Martino della Battaglia",
  facts: [["Grapes", "Friulano (Tocai) at least 80%"], ["Communes", "Sirmione, Desenzano, Lonato, Pozzolengo (Brescia); Peschiera (Verona)"], ["Yield", "11.5 t/ha; liquoroso 8 t/ha"]],
  place: "The same zone as Lugana, scene of the 1859 battle of San Martino.", rules: "Grape to wine 70%.", glass: "Almondy white.", exam: "Friulano in Lombardy.", producers: []
});
APXF["it-riviera-del-garda-bresciano"] = lom({
  lede: "The western shore of Lake Garda, for Groppello reds and the Chiaretto rosé, with Valtènesi as a subzone.",
  cat: "DOC, red, rosé, white, sparkling rosé", rec: "DOC 1977 (as Garda Bresciano); renamed Riviera del Garda Classico 2017", d: "Lombardia/DOC/Riviera del Garda Classico",
  facts: [["Types", "Bianco (Riesling at least 50%), Rosso (also superiore), Groppello, Chiaretto, spumante rosé"], ["Subzone", "Valtènesi"]],
  place: "Moraine hills of the Brescian shore of Garda from Desenzano to Salò.", rules: "Grape to wine 70%.", glass: "Light, savoury Groppello reds; delicate Chiaretto.", exam: "Groppello is the local red grape.", producers: []
});
APXF["it-valtenesi"] = lom({
  lede: "Groppello-based red and Chiaretto rosé from the Valtènesi hills on Garda's western shore.",
  cat: "DOC, red and rosé", rec: "DOC 2011", d: "Lombardia/DOC/Valtenesi",
  facts: [["Grapes", "Groppello (Gentile and/or Mocasina) at least 50%"], ["Yield", "11 t/ha; 11.5% natural"], ["Grape to wine", "68%"], ["Release", "Rosso from 1 September; Chiaretto from 14 February after the harvest"]],
  place: "Moraine hills between Desenzano and Salò.", rules: "Chiaretto by short skin contact.", glass: "Pale, saline, red-berried Chiaretto.", exam: "Valtènesi Chiaretto is one of Italy's benchmark rosés.", producers: ["Costaripa", "Pratello"]
});
APXF["it-garda-colli-mantovani"] = lom({
  lede: "Wines from the moraine hills of Mantua province south of Lake Garda.",
  cat: "DOC, white, red, rosé", rec: "DOC 1976", d: "Lombardia/DOC/Garda Colli Mantovani",
  amended: "Text as amended by DM 22 November 2022",
  facts: [["Bianco", "Garganega up to 40%; Trebbiano and/or Chardonnay up to 60%"], ["Types", "Bianco (also passito, late harvest, riserva), Rosso (also superiore, riserva), Chiaretto"], ["Riserva", "2 years including 6 months in wood"]],
  place: "Hills around Monzambano and Volta Mantovana.", rules: "Passito from grapes dried to 13%.", glass: "Simple wines.", exam: "Minor DOC.", producers: []
});
APXF["it-lambrusco-mantovano"] = lom({
  lede: "Lombardy's Lambrusco, from the Mantua plain on both sides of the Po.",
  cat: "DOC, red and rosé (frizzante)", rec: "DOC 1987", d: "Lombardia/DOC/Lambrusco Mantovano",
  facts: [["Grapes", "Lambrusco Viadanese (Grappello Ruberti), Lambrusco Maestri, Marani, Salamino at least 85%"], ["Subzones", "Viadanese-Sabbionetano, Oltre Po Mantovano"], ["Yield", "17 t/ha; subzones 14 t/ha"]],
  place: "Alluvial Po plain near Viadana and Sabbioneta.", rules: "Grape to wine 70%.", glass: "Frothy, fruity red.", exam: "Lambrusco outside Emilia.", producers: []
});
APXF["it-botticino"] = lom({
  lede: "A red blend of Barbera, Marzemino, Schiava and Sangiovese from the hills just east of Brescia.",
  cat: "DOC, red", rec: "DOC 1968", d: "Lombardia/DOC/Botticino",
  facts: [["Grapes", "Barbera at least 30%; Marzemino (Berzemino) at least 20%; Schiava Gentile at least 10%; Sangiovese at least 10%"], ["Communes", "Brescia, Botticino, Rezzato"], ["Riserva", "2 years from 1 November"]],
  place: "Limestone hills known for Botticino marble.", rules: "Released from 1 June after the harvest.", glass: "Mid-weight, spicy red.", exam: "Minor Brescia DOC.", producers: []
});
APXF["it-cellatica"] = lom({
  lede: "A red blend from the hills north-west of Brescia, including the local crossing Incrocio Terzi.",
  cat: "DOC, red", rec: "DOC 1968", d: "Lombardia/DOC/Cellatica",
  facts: [["Grapes", "Marzemino at least 30%; Barbera at least 30%; Schiava Gentile at least 10%; Incrocio Terzi n.1 (Barbera x Cabernet Franc) at least 10%"], ["Communes", "Rodengo Saiano, Gussago, Cellatica, Collebeato, Brescia"], ["Yield", "11.5 t/ha; Superiore 10 t/ha"]],
  place: "Hills next to Franciacorta.", rules: "Superiore released after 30 September of the year after the harvest.", glass: "Light, fruity red.", exam: "Incrocio Terzi is a Brescian crossing.", producers: []
});
APXF["it-capriano-del-colle"] = lom({
  lede: "Reds from Marzemino, Merlot and Sangiovese and Trebbiano whites from a small hill south of Brescia.",
  cat: "DOC, red, white", rec: "DOC 1980", d: "Lombardia/DOC/Capriano del Colle",
  facts: [["Rosso", "Marzemino at least 40%; Merlot at least 20%; Sangiovese at least 10%"], ["Types", "Bianco, Trebbiano, Rosso, Marzemino, Novello, Riserva"]],
  place: "Monte Netto, an isolated hill in the Brescian plain.", rules: "Grape to wine 70%.", glass: "Light reds and whites.", exam: "Minor DOC.", producers: []
});
APXF["it-san-colombano-al-lambro"] = lom({
  lede: "The only DOC of the province of Milan, on an isolated hill near Lodi.",
  cat: "DOC, red, white", rec: "DOC 1984", d: "Lombardia/DOC/San Colombano al Lambro o San Colombano",
  facts: [["Also labelled", "San Colombano"], ["Rosso", "Croatina 30 to 50%; Barbera 25 to 50%; Uva Rara up to 15%"], ["Riserva", "24 months"]],
  place: "The San Colombano hill rising from the Po plain, spanning the provinces of Milan, Lodi and Pavia.", rules: "Frizzante versions allowed.", glass: "Fruity Croatina-Barbera red.", exam: "Milan's wine.", producers: []
});
APXF["it-terre-del-colleoni"] = lom({
  lede: "A Bergamo-province DOC named after the condottiero Bartolomeo Colleoni, for many varietals including Franconia and Incrocio Terzi.",
  cat: "DOC, white, red, sparkling, sweet", rec: "DOC 2011", d: "Lombardia/DOC/Terre del Colleoni o Colleoni",
  facts: [["Also labelled", "Colleoni"], ["Types", "Pinot Bianco, Pinot Grigio, Chardonnay, Manzoni, Moscato Giallo (also passito), Schiava, Merlot, Marzemino, Cabernet, Franconia, Incrocio Terzi, Novello, Spumante"], ["Yields", "12 to 13 t/ha"], ["Spumante", "At least 15 months on the lees"]],
  place: "The Bergamo hills.", rules: "Moscato Giallo passito: grape to wine 40%.", glass: "Simple varietals.", exam: "Minor DOC.", producers: []
});
APXF["it-valcalepio"] = lom({
  lede: "Bordeaux-blend reds and Pinot whites from the hills between Bergamo and Lake Iseo.",
  cat: "DOC, red, white, sweet", rec: "DOC 1976", d: "Lombardia/DOC/Valcalepio",
  facts: [["Rosso", "Cabernet Sauvignon 25 to 60%; Merlot 40 to 75%; aged 1 year including 3 months in wood; Riserva 3 years including 1 in oak"], ["Bianco", "Pinot Bianco and/or Chardonnay 55 to 80%; Pinot Grigio 20 to 45%"], ["Moscato passito", "Moscato di Scanzo and/or Moscato; 6.5 t/ha; total 17%"]],
  place: "Hills of the Bergamo province.", rules: "Grape to wine 70%; passito 40%.", glass: "Herbal Merlot-Cabernet.", exam: "Valcalepio Moscato passito overlaps Scanzo's grape.", producers: []
});
