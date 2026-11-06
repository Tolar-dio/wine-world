// ===== Exam bank: original practice questions in each program's style (from curriculum research, Nov 2026) =====
const BANK = [
[
"r4",
1,
"White Sancerre AOC is made from which grape?",
"Sauvignon Blanc",
[
"Chenin Blanc",
"Chardonnay",
"Melon Blanc"
],
"Central Loire appellations Sancerre and Pouilly-Fumé are Sauvignon Blanc."
],
[
"r11b",
1,
"On a German label, \"Spätlese\" indicates:",
"grapes picked riper/later than Kabinett",
[
"wine fermented fully dry",
"grapes affected by noble rot",
"wine aged in oak for 12 months"
],
"Prädikat levels rise by must weight: Kabinett < Spätlese < Auslese < BA < TBA; Spätlese can be dry or sweet."
],
[
"f9",
1,
"Prosecco is principally made from:",
"Glera",
[
"Chardonnay",
"Macabeo",
"Muscat Blanc à Petits Grains"
],
"Glera is the required majority variety of Prosecco DOC/DOCG."
],
[
"f9",
1,
"The second fermentation for most Prosecco takes place in:",
"a sealed pressurised tank",
[
"the bottle it is sold in",
"open oak vats",
"concrete eggs under flor"
],
"Tank method preserves fresh primary fruit (pear, apple, blossom)."
],
[
"f5",
1,
"Compared with a hot-climate example, a cool-climate wine of the same grape usually shows:",
"higher acidity and lighter body",
[
"higher alcohol and riper fruit",
"lower acidity and deeper colour",
"more tannin and jammy fruit"
],
"Less heat = less sugar accumulation and slower acid loss."
],
[
"s4",
1,
"A sweet dessert served with a dry wine will make the wine taste:",
"more acidic and bitter, less fruity",
[
"sweeter and fuller",
"softer and less tannic",
"more alcoholic and warming"
],
"Sweetness in food increases perceived bitterness/acidity; wine should be at least as sweet as the food."
],
[
"s4",
1,
"Salty food tends to make a wine taste:",
"less acidic and less bitter",
[
"more tannic",
"thinner and more acidic",
"sweeter and more alcoholic"
],
"Salt softens perceived acidity/bitterness and increases perceived body."
],
[
"r8b",
1,
"Which Rioja label term indicates the longest minimum ageing?",
"Gran Reserva",
[
"Crianza",
"Reserva",
"Joven"
],
"Ageing minima increase Joven < Crianza < Reserva < Gran Reserva. (Note: Rioja replaced \"Joven\" with \"Genérico\" in 2017; update the distractor if the school teaches current Rioja terms.)"
],
[
"f9",
1,
"The recommended serving temperature for sparkling wine is:",
"well chilled, about 6-10°C",
[
"room temperature, 15-18°C",
"lightly chilled, 13°C",
"below 0°C"
],
"Chilling keeps the mousse fine and the wine refreshing."
],
[
"f3",
1,
"A wine smelling of damp cardboard and musty cellar most likely suffers from:",
"cork taint (TCA)",
[
"oxidation",
"volatile acidity",
"reduction"
],
"TCA gives musty, damp-cardboard aromas and mutes fruit."
],
[
"r1b",
1,
"The dominant black grape of the Médoc (Left Bank) is:",
"Cabernet Sauvignon",
[
"Merlot",
"Malbec",
"Syrah"
],
"Warm gravel soils on the Left Bank ripen late-ripening Cabernet Sauvignon."
],
[
"r15b",
1,
"The Barossa Valley is best known for full-bodied reds from:",
"Shiraz",
[
"Pinot Noir",
"Gamay",
"Nebbiolo"
],
"Warm Barossa produces ripe, full Shiraz, often from old vines."
],
[
"o2",
1,
"Carmenère is most closely associated with:",
"Chile",
[
"Argentina",
"New Zealand",
"Spain"
],
"Long mistaken for Merlot in Chile; now Chile's signature variety."
],
[
"r10b",
1,
"Vintage Port is typically:",
"aged briefly in wood, then in bottle, and throws a sediment",
[
"aged 20+ years in cask before release",
"always filtered and ready on release",
"a blend of many vintages"
],
"Bottled young (about 2 years in wood) and needs decanting when mature."
],
[
"f10",
1,
"The fungus responsible for Sauternes' sweetness and honeyed character is:",
"Botrytis cinerea (noble rot)",
[
"powdery mildew",
"flor yeast",
"Brettanomyces"
],
"Botrytis concentrates sugar and acid and adds honey/marmalade notes."
],
[
"r2",
1,
"Which grape is the classic variety of Chablis?",
"Chardonnay",
[
"Sauvignon Blanc",
"Aligoté",
"Pinot Blanc"
],
"Chablis AOC is 100% Chardonnay, typically high acid, often unoaked."
],
[
"r5c",
2,
"Which Northern Rhône red appellation permits Viognier to be co-fermented with Syrah?",
"Côte-Rôtie",
[
"Cornas",
"Hermitage",
"Crozes-Hermitage"
],
"Côte-Rôtie allows up to 20% Viognier; Cornas is 100% Syrah; Hermitage/Crozes allow Marsanne/Roussanne, not Viognier."
],
[
"r4",
2,
"Chinon AOC reds are made principally from:",
"Cabernet Franc",
[
"Gamay",
"Pinot Noir",
"Grolleau"
],
"Chinon, Bourgueil and Saumur-Champigny are Cabernet Franc."
],
[
"r4",
2,
"Savennières is best known for:",
"dry, long-lived Chenin Blanc",
[
"sweet botrytised Chenin",
"Sauvignon Blanc sur lie",
"rosé from Grolleau"
],
"Savennières (Anjou) makes intense, high-acid, mostly dry Chenin."
],
[
"r4",
2,
"\"Sur lie\" on Muscadet indicates the wine:",
"stayed on its fine lees over winter before bottling, adding texture and sometimes slight spritz",
[
"was aged in new oak",
"was made from late-harvest grapes",
"underwent carbonic maceration"
],
"Lees contact adds body and bready notes to neutral Melon."
],
[
"v2",
2,
"Malolactic conversion:",
"converts malic acid to lactic acid, lowering acidity and possibly adding buttery notes",
[
"converts sugar to alcohol",
"converts lactic to malic acid",
"removes tartrate crystals"
],
"Lactic acid bacteria; diacetyl gives butter."
],
[
"v2",
2,
"Wines made by carbonic maceration typically show:",
"low tannin, vivid colour, kirsch/banana/bubblegum aromas",
[
"high tannin and dark colour",
"oxidative nutty notes",
"high volatile acidity"
],
"Intracellular fermentation of whole uncrushed berries under CO2 extracts little tannin."
],
[
"o2",
2,
"Under the L3 Wine-Lexicon, \"brioche\" and \"biscuit\" are classed as:",
"secondary - yeast (lees/autolysis)",
[
"primary - other",
"tertiary - deliberate oxidation",
"secondary - oak"
],
"Per WSET SAT Issue 2 lexicon clusters."
],
[
"o2",
2,
"\"Petrol/kerosene\" in a mature Riesling is classed as:",
"tertiary - bottle age (white)",
[
"primary - pungent spice",
"secondary - malolactic conversion",
"tertiary - deliberate oxidation"
],
"Per WSET SAT Issue 2 lexicon."
],
[
"o2",
2,
"Which four factors does WSET use to justify a quality assessment?",
"balance, length, intensity, complexity",
[
"colour, acidity, alcohol, tannin",
"aroma, sweetness, body, finish",
"clarity, condition, development, readiness"
],
"The \"BLIC\" framework underpins L3 quality conclusions."
],
[
"r7b",
2,
"Brunello di Montalcino must be made from:",
"100% Sangiovese",
[
"Sangiovese with up to 20% Merlot",
"Montepulciano",
"Nebbiolo"
],
"Brunello is the local Sangiovese biotype, 100%."
],
[
"r7b",
2,
"Amarone della Valpolicella's high alcohol and dried-fruit character come mainly from:",
"drying harvested grapes before fermentation (appassimento)",
[
"fortification with grape spirit",
"botrytis on the vine",
"chaptalisation"
],
"Corvina-based grapes are dried for months, concentrating sugar."
],
[
"r7b",
2,
"Valpolicella Ripasso gains extra body by:",
"refermenting Valpolicella on the pomace of Amarone or Recioto",
[
"adding concentrated must",
"ageing under flor",
"blending with Primitivo"
],
"\"Re-passed\" over dried-grape skins."
],
[
"r7b",
2,
"Nebbiolo-based Barolo typically shows:",
"pale garnet colour with high acidity and high tannin",
[
"deep purple colour, low tannin",
"low acidity and soft tannin",
"pale lemon colour"
],
"Nebbiolo is low in stable pigment but rich in tannin and acid."
],
[
"r8b",
2,
"Which grape and appellation pairing is correct?",
"Verdejo - Rueda",
[
"Albariño - Toro",
"Monastrell - Rías Baixas",
"Mencía - Jumilla"
],
"Rías Baixas = Albariño; Bierzo = Mencía; Jumilla = Monastrell; Toro = Tinta de Toro."
],
[
"r10b",
2,
"Bairrada's signature high-tannin, high-acid red grape is:",
"Baga",
[
"Touriga Nacional",
"Alicante Bouschet",
"Trincadeira"
],
"Baga dominates Bairrada reds."
],
[
"r16b",
2,
"Casablanca Valley suits Sauvignon Blanc and Chardonnay because:",
"cold Humboldt Current breezes and morning fog cool the valley",
[
"it lies at very high altitude in the Andes",
"it has a hot continental climate",
"heavy summer rain lowers temperatures"
],
"Pacific influence makes it a cool coastal valley."
],
[
"r16b",
2,
"The Chilean term \"Entre Cordilleras\" refers to:",
"the zone between the Andes and the Coastal Range",
[
"vineyards on the coast",
"vineyards above 1,500 m",
"a vineyard in two DOs"
],
"Chile's east-west designations are Costa, Entre Cordilleras, Andes."
],
[
"r16b",
2,
"Cafayate (Salta) is notable for:",
"very high-altitude vineyards and aromatic Torrontés",
[
"maritime fog and Pinot Noir",
"flat irrigated high-yield Bonarda",
"Patagonian cool climate"
],
"Some of the world's highest vineyards; altitude preserves acidity."
],
[
"r15b",
2,
"Coonawarra is famed for Cabernet Sauvignon grown on:",
"terra rossa over limestone",
[
"volcanic basalt",
"alluvial sand",
"slate"
],
"Red clay-loam over free-draining limestone in a cool climate."
],
[
"r15b",
2,
"Unoaked Hunter Valley Semillon in youth typically shows:",
"low alcohol, high acidity, citrus; developing toast and honey with bottle age",
[
"high alcohol and tropical fruit",
"oxidative nutty character",
"low acidity and butter"
],
"Early picking in a humid subtropical climate; ages tertiary notes without oak."
],
[
"r15c",
2,
"Central Otago Pinot Noir benefits from:",
"a continental climate with high diurnal range",
[
"a maritime climate with high rainfall",
"a hot Mediterranean climate",
"tropical humidity"
],
"World's southernmost major region; warm days, cold nights."
],
[
"r11b",
2,
"VDP.Grosses Gewächs (GG) indicates:",
"a dry wine from a VDP top-classified single site",
[
"a sweet Auslese-level wine",
"any wine from the Mosel",
"a wine made from botrytised grapes"
],
"GG = dry (trocken) wine from a Grosse Lage."
],
[
"r12",
2,
"Traditional Tokaji Aszú is made by:",
"macerating botrytised aszú berries in base wine or fermenting must",
[
"freezing grapes on the vine",
"fortifying with brandy",
"drying grapes on straw mats"
],
"Aszú berries are steeped then fermented and aged; under the 2026 amendment the base must be the same vintage."
],
[
"r3",
2,
"The Côte des Blancs is planted predominantly with:",
"Chardonnay",
[
"Pinot Noir",
"Meunier",
"Pinot Blanc"
],
"East-facing chalk slopes south of Épernay; Blanc de Blancs heartland."
],
[
"f9",
2,
"In the Asti method, fermentation is stopped by:",
"chilling and filtering the wine at about 7-9.5% abv",
[
"adding grape spirit",
"adding sulfur and sugar",
"disgorging the yeast"
],
"Single fermentation in a pressure tank; leaves sweetness and grapey Muscat aromas."
],
[
"fo1",
2,
"A fino destined for biological ageing is fortified to about:",
"15% abv",
[
"17% abv",
"19% abv",
"12% abv"
],
"Flor survives at about 15%; oloroso is fortified to about 17% to prevent flor (per the L3 spec)."
],
[
"r10b",
2,
"Late Bottled Vintage (LBV) Port is:",
"from a single year, aged 4-6 years in wood before bottling",
[
"a blend of years averaging 10 years",
"aged under flor",
"bottled after 2 years and needs decades"
],
"LBV gives a single-vintage style ready earlier than Vintage Port."
],
[
"f3",
2,
"Brettanomyces most often gives:",
"barnyard, leather, smoked-meat/plaster aromas",
[
"vinegar/nail varnish",
"cooked cabbage/struck match",
"musty damp cardboard"
],
"4-ethylphenol and 4-ethylguaiacol."
],
[
"v1",
2,
"Which is a frost protection method listed by WSET?",
"wind machines",
[
"hail nets",
"drip irrigation",
"leaf removal"
],
"Wind machines mix warmer air from inversion layers; heaters and sprinklers are also listed."
],
[
"v1",
2,
"Phylloxera is controlled mainly by:",
"grafting vinifera onto American-species rootstocks",
[
"copper sprays",
"canopy thinning",
"ploughing between rows"
],
"No chemical cure; resistant rootstocks are the standard solution."
],
[
"s4",
2,
"High-acid food with a wine tends to make the wine taste:",
"less acidic and fruitier",
[
"more acidic and thinner",
"more tannic",
"more bitter"
],
"Acid in food reduces perceived wine acidity."
],
[
"r12c",
2,
"DAC on an Austrian label indicates:",
"a regionally typical, origin-protected wine of defined style",
[
"a late-harvest Prädikat wine",
"a wine made from Grüner Veltliner only",
"a cooperative-made wine"
],
"Districtus Austriae Controllatus."
],
[
"r17b",
2,
"Which South African region is known for cool-climate Pinot Noir and Chardonnay?",
"Walker Bay (Hemel-en-Aarde)",
[
"Swartland",
"Paarl",
"Robertson"
],
"Cape South Coast ocean influence cools Hemel-en-Aarde."
],
[
"r2b",
2,
"Which factor most increases the price of Grand Cru Burgundy versus Bourgogne Rouge?",
"very limited supply from small top sites with high demand and low yields",
[
"use of machine harvesting",
"larger bottle sizes",
"mandatory carbonic maceration"
],
"Market forces and yield/site costs drive price."
],
[
"v1",
2,
"Grapevine leafroll virus is spread in the vineyard mainly by:",
"mealybugs",
[
"glassy-winged sharpshooters",
"nematodes only",
"powdery mildew spores"
],
"Mealybugs and soft scales vector GLRaV; sharpshooters vector Xylella (Pierce's disease)."
],
[
"v1",
2,
"Flavescence dorée is caused by:",
"a phytoplasma spread by the leafhopper Scaphoideus titanus",
[
"a fungus controlled by copper",
"a virus spread by nematodes",
"Botrytis cinerea"
],
"Notifiable in the EU; requires vine removal and insecticide programmes."
],
[
"v1",
2,
"Copper-based sprays are a key organic control for:",
"downy mildew (Plasmopara viticola)",
[
"powdery mildew (Erysiphe necator)",
"phylloxera",
"Pierce's disease"
],
"Sulfur is the classic powdery mildew control."
],
[
"r10b",
2,
"At lower wine pH, the proportion of molecular (antimicrobial) SO2:",
"increases",
[
"decreases",
"stays constant",
"becomes zero"
],
"Molecular SO2 is pH-dependent; low-pH wines need less free SO2."
],
[
"o2",
2,
"Which is NOT a tartrate stabilisation method?",
"bentonite fining",
[
"cold stabilisation",
"carboxymethylcellulose (CMC)",
"electrodialysis"
],
"Bentonite removes proteins (heat stability), not tartrates."
],
[
"o2",
2,
"Which technique removes alcohol from finished wine?",
"spinning cone column",
[
"micro-oxygenation",
"cryoextraction",
"saignée"
],
"Spinning cone and reverse osmosis are dealcoholisation tools; D1 now covers no/low-alcohol wine."
],
[
"r10b",
2,
"Under DDP (Delivered Duty Paid), who bears import duties?",
"the seller",
[
"the buyer",
"split equally",
"the carrier"
],
"DDP places maximum obligation on the seller; EXW places it on the buyer."
],
[
"o2",
2,
"The US \"three-tier system\" separates:",
"producer/importer, wholesaler/distributor, retailer/on-premise",
[
"grower, winery, bottler",
"federal, state, county taxes",
"red, white, sparkling categories"
],
"Post-Prohibition structure; DTC and control states are exceptions."
],
[
"r10b",
2,
"An importer fixes today's exchange rate for a payment due in six months using:",
"a forward contract",
[
"a spot purchase on payment date",
"a price increase",
"a currency option that expires today"
],
"The D2 spec lists fixing the exchange rate among methods to limit currency risk."
],
[
"r8",
2,
"Rioja's category for single-vineyard wines introduced in 2017 is:",
"Viñedo Singular",
[
"Vino de Pago",
"Gran Selección",
"Paraje Calificado"
],
"Rioja added Viñedo Singular, Vino de Municipio (renamed Vino de Pueblo in 2024) and Vino de Zona; Paraje Calificado is Cava."
],
[
"r12c",
2,
"In the Wachau (Vinea Wachau), the richest dry style category is:",
"Smaragd",
[
"Steinfeder",
"Federspiel",
"Ausbruch"
],
"Steinfeder ≤11.5%, Federspiel 11.5-12.5%, Smaragd ≥12.5% abv."
],
[
"r1b",
2,
"Which grape was authorised in 2021 for Bordeaux/Bordeaux Supérieur as a climate-adaptation variety?",
"Touriga Nacional",
[
"Tempranillo",
"Nebbiolo",
"Zinfandel"
],
"Also Arinarnoa, Castets, Marselan (red), Alvarinho, Liliorila (white), capped at 10% of the blend."
],
[
"o2",
2,
"A distinctive viticultural practice in Ningxia is:",
"burying vines in winter to survive extreme cold",
[
"growing vines on pergolas for humidity",
"double cropping per year",
"dry farming on volcanic ash"
],
"Continental winters require earthing up; partial burial spread to about 40% of vineyards in 2025-26."
],
[
"r3",
2,
"Minimum time from tirage before NV Champagne can be released is:",
"15 months (at least 12 on lees)",
[
"9 months",
"24 months",
"36 months"
],
"Vintage Champagne requires 3 years."
],
[
"o2",
2,
"Franciacorta Satèn must be:",
"a white-grape-only Brut at lower pressure (under 5 atm)",
[
"a rosé with at least 25% Pinot Nero",
"a Dosage Zéro from Pinot Nero",
"tank-method sweet wine"
],
"Chardonnay (≥50%) and Pinot Bianco only; creamy mousse; 24 months on lees."
],
[
"o2",
2,
"The Cava category with the longest minimum lees ageing is:",
"Cava de Paraje Calificado (36 months)",
[
"Cava Reserva (18 months)",
"Cava Gran Reserva (30 months)",
"Cava de Guarda (9 months)"
],
"Paraje Calificado 36; Gran Reserva 30; Reserva 18; Guarda 9."
],
[
"r10b",
2,
"Which Madeira variety produces the driest style?",
"Sercial",
[
"Verdelho",
"Boal (Bual)",
"Malvasia (Malmsey)"
],
"Sweetness rises Sercial < Verdelho < Boal < Malmsey."
],
[
"o2",
2,
"The top tier of Rutherglen Muscat classification is:",
"Rare",
[
"Grand",
"Classic",
"Reserve"
],
"Rutherglen < Classic < Grand < Rare."
],
[
"fo1",
2,
"VORS on a sherry label certifies an average age of at least:",
"30 years",
[
"12 years",
"15 years",
"20 years"
],
"VOS = 20 years; VORS = 30 years (Consejo-certified)."
],
[
"r10b",
2,
"The \"beneficio\" in the Douro determines:",
"how much must each vineyard may fortify into Port",
[
"the grade of aguardente",
"the minimum ageing for Tawny",
"the bottle format"
],
"Annual authorisation based on vineyard grading (A-F) and market needs."
],
[
"r2b",
1,
"Red Burgundy is made from:",
"Pinot Noir",
[
"Gamay",
"Merlot",
"Syrah"
],
"Côte d'Or reds are Pinot Noir."
],
[
"r11b",
1,
"The Mosel's most important grape is:",
"Riesling",
[
"Müller-Thurgau",
"Silvaner",
"Pinot Noir"
],
"Steep slate slopes; Riesling dominates quality wine."
],
[
"r7b",
1,
"Chianti Classico DOCG is located in:",
"Tuscany",
[
"Piedmont",
"Veneto",
"Sicily"
],
"Between Florence and Siena."
],
[
"b2",
1,
"To be labelled Daiginjo, sake rice must be polished to at most:",
"50% of its original size remaining",
[
"70% remaining",
"80% remaining",
"95% remaining"
],
"Ginjo ≤60%, Daiginjo ≤50% seimaibuai (NTA standard)."
],
[
"b2",
1,
"Lager beers are fermented with:",
"bottom-fermenting yeast at cool temperatures",
[
"top-fermenting yeast at warm temperatures",
"wild bacteria only",
"no yeast"
],
"Saccharomyces pastorianus, cool fermentation, then lagering."
],
[
"b1",
1,
"Cognac is made mostly from:",
"Ugni Blanc",
[
"Chardonnay",
"Muscat",
"Palomino"
],
"High-acid, low-alcohol base wine suited to distillation."
],
[
"b1",
1,
"Tequila must be made from:",
"blue agave (Agave tequilana Weber azul)",
[
"sugarcane",
"any agave species",
"corn"
],
"Required by NOM-006; mezcal can use other agaves."
],
[
"b1",
1,
"Islay single malts are often noted for:",
"peat smoke",
[
"sweet corn character",
"juniper",
"agave"
],
"Peat-fired malt kilning."
],
[
"s4",
1,
"A classic pairing for Sauternes is:",
"foie gras",
[
"raw oysters",
"grilled steak",
"spicy curry"
],
"Sweet, high-acid wine balances rich fat (also Roquefort)."
],
[
"f9",
1,
"\"Brut\" on a sparkling wine label indicates:",
"dry",
[
"very sweet",
"rosé",
"aged 10 years"
],
"Brut = under 12 g/L sugar."
],
[
"s1",
1,
"After presenting the bottle and opening it, the sommelier first pours a taste for:",
"the host",
[
"the oldest guest",
"the guest of honour",
"the sommelier"
],
"The host approves the wine before guests are served (then clockwise, host last)."
],
[
"o2",
1,
"Vermouth is best described as:",
"a fortified, aromatized wine",
[
"a grape brandy",
"a beer style",
"a sparkling wine"
],
"Wine + spirit + botanicals (wormwood traditionally)."
],
[
"r10b",
1,
"Which Port style is aged longest in cask, developing nutty colour?",
"Tawny with an indication of age",
[
"Ruby",
"Vintage",
"Pink Port"
],
"Oxidative cask ageing turns the colour tawny."
],
[
"r5c",
1,
"Châteauneuf-du-Pape is located in:",
"the southern Rhône",
[
"the northern Rhône",
"Provence",
"Beaujolais"
],
"Near Avignon; Grenache-led blends."
],
[
"h2",
1,
"A label reads \"Rías Baixas\". The wine is most likely:",
"a dry white from Albariño",
[
"a red from Tempranillo",
"a sweet fortified wine",
"a sparkling rosé"
],
"Galician coastal DO for Albariño."
],
[
"r3",
2,
"Which ingredients make up the liqueur de tirage?",
"wine, sugar and yeast (plus nutrients/riddling aids)",
[
"wine and sugar only (that is the dosage)",
"grape spirit and yeast",
"yeast and CO2"
],
"Tirage triggers the second fermentation; liqueur d'expédition is the dosage."
],
[
"r7b",
2,
"Montalbano, Colline Pisane and Colli Aretini are subzones of:",
"Chianti DOCG",
[
"Chianti Classico DOCG",
"Vino Nobile di Montepulciano DOCG",
"Morellino di Scansano DOCG"
],
"Chianti has seven subzones including Rùfina and Colli Senesi; Chianti Classico is separate."
],
[
"o2",
2,
"Match: Bandol -> ?",
"Mourvèdre",
[
"Grenache",
"Syrah",
"Carignan"
],
"Bandol reds require a Mourvèdre majority (min 50%) and 18 months in wood."
],
[
"o2",
2,
"Match: Gigondas -> ?",
"Grenache",
[
"Mourvèdre",
"Cinsault",
"Syrah"
],
"Gigondas reds are Grenache-dominant."
],
[
"s5",
2,
"A bottle costs you $24. Your target bottle cost is 25%. What is the list price?",
"$96",
[
"$30",
"$72",
"$120"
],
"Price = cost ÷ cost% = 24 ÷ 0.25."
],
[
"s5",
2,
"A bottle costs $20, yields 5 glasses, and your pour-cost target is 25%. What is the glass price?",
"$16",
[
"$4",
"$20",
"$10"
],
"Cost per glass $4 ÷ 0.25 = $16."
],
[
"s5",
2,
"Beginning inventory $40,000, purchases $15,000, ending inventory $38,000, wine sales $68,000. Wine cost %?",
"25%",
[
"22%",
"56%",
"81%"
],
"COGS = 40,000 + 15,000 - 38,000 = 17,000; 17,000 ÷ 68,000 = 25%."
],
[
"o2",
2,
"How many 5 oz (148 mL) pours does a 750 mL bottle yield?",
"about 5",
[
"about 4",
"about 6",
"about 7"
],
"750 mL = 25.4 oz; 25.4 ÷ 5 = 5.07."
],
[
"r3",
2,
"A Champagne Jeroboam holds:",
"3 litres",
[
"1.5 litres",
"4.5 litres",
"6 litres"
],
"Magnum 1.5 L; Jeroboam 3 L; Rehoboam 4.5 L; Methuselah 6 L (a Bordeaux Jeroboam is 5 L)."
],
[
"o2",
2,
"Which list entry contains an error?",
"Château Margaux, Saint-Julien",
[
"Château Lafite Rothschild, Pauillac",
"Château Montrose, Saint-Estèphe",
"Château Léoville-Las Cases, Saint-Julien"
],
"Château Margaux is in Margaux AOC."
],
[
"o2",
2,
"Which entry is miscategorised?",
"Domaine de la Romanée-Conti La Tâche, listed under Gevrey-Chambertin",
[
"Domaine Leflaive Bâtard-Montrachet under Puligny-Montrachet",
"Domaine Ponsot Clos de la Roche under Morey-Saint-Denis",
"Comte Georges de Vogüé Musigny under Chambolle-Musigny"
],
"La Tâche is a Vosne-Romanée grand cru monopole."
],
[
"r2",
2,
"The northernmost Beaujolais cru is:",
"Saint-Amour",
[
"Brouilly",
"Morgon",
"Côte de Brouilly"
],
"Saint-Amour borders the Mâconnais; Brouilly is southernmost."
],
[
"r2b",
2,
"Travelling south through the Côte de Nuits, which village lies between Gevrey-Chambertin and Chambolle-Musigny?",
"Morey-Saint-Denis",
[
"Vosne-Romanée",
"Fixin",
"Nuits-Saint-Georges"
],
"Order: Marsannay, Fixin, Gevrey, Morey, Chambolle, Vougeot, Vosne, Nuits."
],
[
"r1b",
2,
"Which château was elevated to First Growth in 1973?",
"Mouton Rothschild",
[
"Haut-Brion",
"Pichon Baron",
"Cos d'Estournel"
],
"The only change to the 1855 red classification's top tier."
],
[
"o2",
2,
"Château Rayas is a benchmark producer of:",
"Châteauneuf-du-Pape",
[
"Hermitage",
"Bandol",
"Pomerol"
],
"Famed for Grenache-based Châteauneuf from sandy soils."
],
[
"o2",
2,
"Vega Sicilia Único comes from:",
"Ribera del Duero",
[
"Rioja",
"Toro",
"Priorat"
],
"Historic estate in Valbuena de Duero."
],
[
"o2",
2,
"Egon Müller's Scharzhofberger is from:",
"the Saar (Mosel)",
[
"Rheingau",
"Pfalz",
"Nahe"
],
"Wiltingen, Saar valley."
],
[
"o2",
2,
"A classic Negroni is:",
"equal parts gin, Campari, sweet vermouth",
[
"gin, dry vermouth, orange bitters",
"whiskey, sweet vermouth, Angostura",
"Campari, prosecco, soda"
],
"Distractors are a Martini variant, a Manhattan and a Sbagliato/Spritz style."
],
[
"b2",
2,
"Lambic is distinguished by:",
"spontaneous fermentation with wild yeasts and bacteria in the Senne valley/Pajottenland",
[
"bottom-fermenting lager yeast",
"heavy peat-smoked malt",
"brewing by Trappist monks only"
],
"Coolship exposure; gueuze and kriek derive from lambic."
],
[
"r14",
2,
"Which is NOT a Willamette Valley sub-AVA?",
"Red Mountain",
[
"Dundee Hills",
"Eola-Amity Hills",
"Ribbon Ridge"
],
"Red Mountain is in Washington's Yakima Valley."
],
[
"o2",
2,
"\"Fino style, bone dry, pale, saline, almond\" describes which wine?",
"Manzanilla from Sanlúcar de Barrameda",
[
"Oloroso",
"Pedro Ximénez",
"Cream Sherry"
],
"Manzanilla is fino-style sherry aged under flor in Sanlúcar."
],
[
"h2",
2,
"A label reads \"Erzeugerabfüllung, Trocken, Grosses Gewächs, Rheingau\". Expect:",
"a dry estate-bottled Riesling from a top site",
[
"a sweet botrytised wine",
"a sparkling Sekt",
"a red Spätburgunder blend from multiple regions"
],
"Erzeugerabfüllung = producer-bottled; GG = dry top site."
],
[
"r3",
2,
"For Champagne service, the bottle should be opened:",
"at about a 45° angle, cork held, bottle turned, releasing gas with a quiet sigh",
[
"upright with a loud pop",
"pointing at the host",
"with a corkscrew through the cage"
],
"CMS-A 2025 standards: thumb on cork, cage left on, turn the bottle, \"a soft hiss\"."
],
[
"r3",
3,
"Order these Champagne dosage terms from driest to sweetest: Extra Dry, Brut Nature, Demi-Sec, Brut.",
"Brut Nature, Brut, Extra Dry, Demi-Sec",
[
"Brut, Brut Nature, Extra Dry, Demi-Sec",
"Brut Nature, Extra Dry, Brut, Demi-Sec",
"Extra Dry, Brut Nature, Brut, Demi-Sec"
],
"Brut Nature 0-3, Brut <12, Extra Dry 12-17, Demi-Sec 32-50 g/L."
],
[
"r4c",
3,
"How many Alsace Grand Cru vineyards are there?",
"51",
[
"32",
"47",
"62"
],
"51 since Kaefferkopf was added in 2007."
],
[
"r2b",
3,
"Which grand cru lies entirely within Chassagne-Montrachet?",
"Criots-Bâtard-Montrachet",
[
"Bienvenues-Bâtard-Montrachet",
"Chevalier-Montrachet",
"Montrachet"
],
"Bienvenues and Chevalier are wholly in Puligny; Montrachet and Bâtard straddle both villages."
],
[
"r2b",
3,
"Bonnes-Mares is shared between:",
"Chambolle-Musigny and Morey-Saint-Denis",
[
"Gevrey-Chambertin and Morey-Saint-Denis",
"Vosne-Romanée and Flagey-Échezeaux",
"Aloxe-Corton and Ladoix"
],
"Most of the vineyard is in Chambolle."
],
[
"r4",
3,
"Which Loire appellation became the region's first Grand Cru (2011)?",
"Quarts de Chaume",
[
"Bonnezeaux",
"Savennières Roche-aux-Moines",
"Coteaux du Layon Chaume"
],
"Sweet Chenin from Anjou; Chaume is a Coteaux du Layon Premier Cru."
],
[
"r7b",
3,
"Carema DOC, near the Valle d'Aosta border, is based on:",
"Nebbiolo",
[
"Barbera",
"Petit Rouge",
"Freisa"
],
"Pergola-trained Nebbiolo (Picotener) in northern Piedmont."
],
[
"r7b",
3,
"Valtellina Sforzato (Sfursat) is made from:",
"dried Chiavennasca (Nebbiolo) grapes in Lombardy",
[
"dried Corvina in Veneto",
"botrytised Garganega",
"dried Sagrantino in Umbria"
],
"Appassimento-style DOCG."
],
[
"r8b",
3,
"Dominio de Valdepusa was Spain's first Vino de Pago, located in:",
"Castilla-La Mancha",
[
"Rioja",
"Navarra",
"Valencia"
],
"Marqués de Griñón estate near Toledo; MAPA lists it as the first (2003)."
],
[
"r10b",
3,
"Colares is notable for:",
"ungrafted Ramisco vines in coastal sand",
[
"high-altitude Touriga Nacional",
"botrytised Arinto",
"fortified Moscatel"
],
"Sand protected vines from phylloxera; near Sintra."
],
[
"r12",
3,
"Rapsani's red blend combines Xinomavro with:",
"Krassato and Stavroto",
[
"Agiorgitiko and Mandilaria",
"Limnio and Mavrodaphne",
"Assyrtiko and Athiri"
],
"Mount Olympus foothills, Thessaly; Krassato and Xinomavro each at least one-third."
],
[
"r4",
3,
"Vin jaune is traditionally sold in a clavelin of:",
"62 cl",
[
"50 cl",
"70 cl",
"75 cl"
],
"Represents what remains of 1 L after long ageing under voile."
],
[
"o2",
3,
"Roussette de Savoie is made from:",
"Altesse",
[
"Jacquère",
"Mondeuse",
"Chasselas"
],
"Altesse is also called Roussette."
],
[
"b1",
3,
"Calvados Pays d'Auge must be:",
"double-distilled in pot stills",
[
"column-distilled only",
"made only from pears",
"aged in new American oak"
],
"AOC Calvados allows column; Pays d'Auge requires double pot distillation."
],
[
"r13b",
3,
"Sta. Rita Hills AVA is a sub-region of:",
"Santa Ynez Valley",
[
"Santa Maria Valley",
"Paso Robles",
"Edna Valley"
],
"Santa Barbara County; cool transverse valley."
],
[
"r15b",
3,
"Under the Barossa Old Vine Charter, a \"Centenarian\" vine is at least:",
"100 years old",
[
"35 years old",
"70 years old",
"125 years old"
],
"Old Vine 35+, Survivor 70+, Centenarian 100+, Ancestor 125+."
],
[
"r16b",
3,
"Paraje Altamira lies within:",
"the Uco Valley (San Carlos), Mendoza",
[
"Luján de Cuyo",
"Cafayate",
"Patagonia's Río Negro"
],
"Alluvial calcareous soils; an IG in San Carlos."
],
[
"r16b",
3,
"Old-vine País and Cinsault are emblematic of:",
"Itata Valley",
[
"Casablanca Valley",
"Elqui Valley",
"Leyda Valley"
],
"Southern Region dry-farmed bush vines."
],
[
"o2",
3,
"The black pepper aroma in Syrah and Grüner Veltliner is attributed to:",
"rotundone",
[
"TDN",
"linalool",
"IBMP"
],
"Sesquiterpene; higher in cooler sites and vintages."
],
[
"o2",
3,
"TDN (1,1,6-trimethyl-1,2-dihydronaphthalene) is responsible for:",
"petrol/kerosene notes in Riesling",
[
"green pepper in Cabernet",
"smoky taint",
"cork taint"
],
"Increases with sun exposure and age."
],
[
"g1",
3,
"Grapefruit/passion fruit thiols like 3MH in Sauvignon Blanc are largely:",
"released by yeast from non-volatile precursors in the must",
[
"extracted from oak",
"produced by malolactic bacteria",
"present free in grape skins"
],
"Yeast strain and juice handling influence thiol release."
],
[
"v1",
3,
"Methoxypyrazines (IBMP) in grapes decline with:",
"sunlight exposure and ripening",
[
"shading and high vigour",
"irrigation",
"cool, cloudy weather"
],
"Leaf removal around clusters reduces green-pepper character."
],
[
"f3",
3,
"Smoke taint is chiefly associated with:",
"volatile phenols such as guaiacol and 4-methylguaiacol and their glycosides",
[
"TCA",
"ethyl acetate",
"acetaldehyde"
],
"Glycosides can hydrolyse later, so taint can emerge in bottle or in the mouth."
],
[
"f3",
3,
"Mousiness is caused by:",
"tetrahydropyridines formed by Lactobacillus or Brettanomyces, often in high-pH, low-SO2 wines",
[
"TCA from corks",
"excess copper",
"hydrogen sulfide from yeast stress"
],
"Relevant to low/no-sulfur winemaking (the 2026 MW Paper 2 theme)."
],
[
"o2",
3,
"Pinking in white wines is best prevented or treated with:",
"PVPP fining",
[
"bentonite",
"gum arabic",
"copper sulfate"
],
"Occurs in reductively made whites; PVPP removes phenolic precursors."
],
[
"o2",
3,
"Which is a key HACCP principle?",
"identify critical control points and set critical limits with monitoring",
[
"maximise production speed",
"eliminate all testing",
"outsource quality control"
],
"HACCP's seven principles cover hazard analysis, CCPs, limits, monitoring, corrective action, verification and records (2026 MW Paper 3)."
],
[
"o2",
3,
"A key oxygen-control measure at bottling is:",
"sparging/inert-gas flushing and monitoring dissolved and headspace oxygen",
[
"increasing filling temperature",
"leaving extra ullage",
"using untreated air in lines"
],
"Total package oxygen drives shelf life (2026 MW Paper 3)."
],
[
"f3",
3,
"Geosmin (earthy, beetroot) in wine usually originates from:",
"fungal growth (Penicillium/Botrytis complexes) on grapes",
[
"oak toasting",
"stuck fermentation",
"screwcap liners"
],
"Not removed by standard fining."
],
[
"r5",
2,
"Which is NOT a geographic designation of Côtes de Provence?",
"Cassis",
[
"Sainte-Victoire",
"La Londe",
"Fréjus"
],
"Cassis is its own AOC; the designations are (Cru) Sainte-Victoire, Fréjus, La Londe, Pierrefeu and Notre-Dame des Anges."
],
[
"r4",
2,
"Sweet Jurançon is made mainly from:",
"Petit Manseng, concentrated by passerillage on the vine",
[
"botrytised Sémillon",
"Tannat",
"Ugni Blanc"
],
"Late-harvest raisined Petit Manseng with high acidity."
],
[
"r5",
2,
"The main grape of Blanquette de Limoux is:",
"Mauzac",
[
"Chardonnay",
"Chenin Blanc",
"Picpoul"
],
"Minimum 90% Mauzac; Crémant de Limoux is Chardonnay/Chenin-led."
],
[
"r6b",
2,
"Ruchè di Castagnole Monferrato DOCG is in:",
"Piedmont",
[
"Lombardy",
"Liguria",
"Emilia-Romagna"
],
"Aromatic red Ruchè grape near Asti."
],
[
"o2",
2,
"Which is a red DOCG of Lazio?",
"Cesanese del Piglio",
[
"Frascati Superiore",
"Montefalco Sagrantino",
"Conero"
],
"Frascati Superiore is white; Sagrantino is Umbria; Cònero is Marche."
],
[
"o2",
2,
"Txakoli whites are made principally from:",
"Hondarrabi Zuri",
[
"Albariño",
"Godello",
"Verdejo"
],
"Hondarrabi Beltza is the red counterpart; Getariako is about 95% Hondarrabi Zuri."
],
[
"o2",
2,
"Montilla-Moriles is distinctive because its Pedro Ximénez often:",
"reaches about 15% naturally, so finos may be unfortified",
[
"must be fortified to 20%",
"is always botrytised",
"is aged only in stainless steel"
],
"The hot inland climate gives high sugar."
],
[
"r17",
2,
"Canadian VQA Icewine grapes must be harvested naturally frozen at:",
"-8°C or colder",
[
"-2°C",
"-5°C",
"-12°C"
],
"Also each pressing ≥32° Brix and average ≥35° Brix; Vidal and Riesling are the main varieties."
],
[
"r13b",
2,
"Lodi AVA is especially known for:",
"old-vine Zinfandel",
[
"cool-climate Pinot Noir",
"ice wine",
"Cabernet Franc"
],
"Warm, Delta-influenced region with many old, own-rooted Zinfandel plantings."
]
];
BANK.forEach(([les, d, q, a, dist, x]) => { const l = L.find(z => z.id === les); if (l) l.bank = (l.bank || []).concat([[d, q, a, dist, x]]); });
