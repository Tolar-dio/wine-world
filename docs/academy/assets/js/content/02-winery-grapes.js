// ===== CURRICULUM PART 2: Winery and Grapes =====
L.push({id:"f7", unit:"F3", title:"Making White, Red and Rosé", mins:15,
summary:"The core sequence from harvest to bottle, and the decisions that shape style.",
body:`
<p>Fermentation is simple chemistry: yeast eats sugar and makes alcohol, CO₂ and heat. Everything else in winemaking is about controlling <i>what</i> comes out of the grape and <i>how much oxygen</i> touches it.</p>
<h3>Common steps</h3>
<ul><li><b>Harvest:</b> hand or machine; night picking keeps fruit cool.</li>
<li><b>Sorting, destemming, crushing.</b> Whole-cluster (stems kept) adds structure and spice, common in Burgundy and Northern Rhône.</li>
<li><b>SO₂:</b> antioxidant and antimicrobial. Added at crushing and before bottling.</li>
<li><b>Must adjustments:</b> chaptalization (adding sugar to raise alcohol, allowed in cool regions like Burgundy and Germany for non-Prädikat wines), acidification (common in warm regions), and deacidification.</li>
<li><b>Yeast:</b> ambient (wild) or cultured. Wild ferments are slower and riskier but often more complex.</li></ul>
<h3>White wine</h3>
<p>Press first, ferment the juice. Cool fermentation (about 54-63°F / 12-17°C) in stainless steel preserves fruity, floral aromas: Sauvignon Blanc, Riesling, Albariño. Warmer fermentation in barrel builds texture: white Burgundy. Optional skin contact before pressing adds aroma and phenolics; long skin contact creates <b>orange wine</b>.</p>
<h3>Red wine</h3>
<p>Color and tannin live in the skins, so reds ferment <i>with</i> skins. Fermentation runs warmer (about 77-90°F / 25-32°C) to extract. The cap of skins floats and must be managed: <b>pump-over</b> (remontage), <b>punch-down</b> (pigeage), <b>rack-and-return</b> (délestage). After fermentation, optional <b>extended maceration</b> softens tannins. Then pressing: the free-run wine drains off; press wine is darker and more tannic and may be blended back.</p>
<p><b>Carbonic maceration:</b> whole uncrushed bunches in a CO₂-filled tank ferment inside each berry. Result: low tannin, vivid color, banana, bubblegum and kirsch aromas. Classic in Beaujolais.</p>
<h3>Rosé</h3>
<ul><li><b>Direct press:</b> pale, delicate (Provence).</li>
<li><b>Short maceration:</b> a few hours to days of skin contact, then press. Deeper color (Tavel).</li>
<li><b>Saignée:</b> bleeding juice off a red ferment; concentrates the red and yields a deeper rosé.</li>
<li><b>Blending</b> red and white: banned for still rosé in the EU, but permitted for rosé Champagne.</li></ul>
<h3>Finishing</h3>
<p>Clarification by settling, racking, <b>fining</b> (egg white, bentonite, isinglass; why some wines aren't vegan), and <b>filtration</b>. <b>Cold stabilization</b> removes tartrates. <b>Sterile filtration</b> removes yeast and bacteria, guaranteeing microbiological stability for wines with residual sugar. Then bottling and closure: natural cork, technical cork, synthetic, screwcap (common in Australia and New Zealand, excellent for aromatic whites), or glass stopper.</p>`,
floor:`<p>CMS Certified includes theory on production methods for all major styles. Be ready to explain carbonic maceration to a guest in one sentence: "Whole berries ferment from the inside, so the wine is fruity and soft with almost no tannin."</p>`,
analyst:`<p>WSET Level 3 sample MCQ: "What guarantees microbiological stability?" Answer: sterile filtration. Know the purpose and side effects of each step, not just its name.</p>`,
terms:[["Chaptalization","Adding sugar to must to raise final alcohol."],["Pigeage","Punching down the cap of skins."],["Remontage","Pumping juice over the cap."],["Carbonic maceration","Whole-berry intracellular fermentation under CO₂."],["Saignée","Bleeding juice from a red ferment to make rosé."],["Fining","Adding an agent that binds and removes particles or harsh compounds."]],
quiz:[
[1,"Why do red wines ferment with their skins?","Color and tannin come from the skins",["To speed up fermentation","To lower alcohol","To add sweetness"],"Nearly all grape juice is clear regardless of skin color."],
[1,"Carbonic maceration is classic in:","Beaujolais",["Barolo","Bordeaux","Rioja"],"Gives banana and bubblegum notes with low tannin."],
[2,"What does chaptalization do?","Adds sugar to the must to raise alcohol",["Adds acid","Removes tartrates","Stops fermentation"],"Named for Jean-Antoine Chaptal."],
[1,"Which step guarantees microbiological stability?","Sterile filtration",["Fining with egg white","Racking","Cold soak"],"It removes yeast and bacteria."],
[2,"The saignée method of making rosé:","Bleeds juice off a red wine ferment",["Blends red and white wine","Presses grapes directly","Uses carbonic maceration"],"Concentrates the remaining red as a side effect."],
[2,"Blending red and white wine to make rosé is permitted in the EU for:","Rosé Champagne",["Provence rosé","Tavel","All rosé"],"Champagne is the famous exception."],
[2,"Cool fermentation in stainless steel mainly preserves:","Fruity and floral aromas",["Tannin","Oak flavor","Color"],"Volatile aromatics survive lower temperatures."]
]});

L.push({id:"f8", unit:"F3", title:"Oak, Malolactic and Lees", mins:13,
summary:"The three big winemaking signatures you'll smell in the exam glass.",
body:`
<h3>Oak</h3>
<p>Oak does three jobs: adds flavor (if new), allows slow oxygen exchange (softening tannins, stabilizing color), and adds tannin. Variables:</p>
<ul><li><b>Species:</b> French oak (<i>Quercus petraea, robur</i>) is tighter-grained, giving subtle spice, cedar, toast. American oak (<i>Q. alba</i>) is sawn rather than split and gives bold vanilla, coconut and dill. Eastern European (Hungarian, Slavonian) is often in between; Slavonian casks are traditional in Barolo and Brunello.</li>
<li><b>Size:</b> 225 L barrique (Bordeaux) or 228 L pièce (Burgundy); bigger casks (botti, foudres) impart less flavor.</li>
<li><b>Toast:</b> light, medium, heavy. More toast = more smoke, coffee, mocha.</li>
<li><b>Age:</b> new oak gives the most flavor; after 3-4 uses a barrel is neutral.</li>
<li><b>Alternatives:</b> chips and staves, cheap and fast, oak flavor without oxygen.</li></ul>
<p>Tasting clue: dill and coconut are the giveaway of American oak, which is why Rioja Reserva and many Zinfandels are recognizable blind.</p>
<h3>Malolactic conversion (MLC)</h3>
<p>Lactic acid bacteria convert sharp malic acid (green apple) into softer lactic acid (milk). Result: lower acidity, creamy texture, and buttery aromas from <b>diacetyl</b>. Nearly all reds go through MLC. For whites it is a style choice: yes for Meursault and buttery Californian Chardonnay; usually blocked for Riesling, Sauvignon Blanc and Albariño.</p>
<h3>Lees</h3>
<p>Lees are dead yeast cells. <b>Lees aging</b> (sur lie) adds bready, biscuity flavors and creamy texture. <b>Bâtonnage</b> (stirring) increases the effect. Muscadet Sèvre-et-Maine sur Lie is the textbook example in a cheap bottle; Champagne is the luxury version.</p>
<h3>The "butter, toast, vanilla" question</h3>
<p>Classic WSET 25-mark question: "Name two winemaking techniques that give butter, toast and vanilla." The answer is <b>MLC</b> (butter, from diacetyl) and <b>new oak maturation</b> (toast and vanilla from toasted barrels). Each would earn about 5 marks when explained: what happens, why it creates the aroma, and an example wine.</p>`,
floor:`<p>The CMS 2024 grid splits non-fruit into "from the grape" and "from winemaking." Winemaking descriptors: bread dough, yeast, butter, cream, yogurt, toast, marzipan, stems. Oak gets its own block: new oak yes/no, intensity, descriptors, and type (French, American, Eastern European).</p>`,
analyst:`<p>In the SAT these are <b>secondary aromas</b>: yeast (biscuit, bread, brioche), MLC (butter, cream, cheese), oak (vanilla, cloves, coconut, cedar, smoke, chocolate). Tertiary aromas come from aging: leather, earth, mushroom, honey, nuts.</p>`,
terms:[["Barrique","225-liter Bordeaux barrel."],["MLC","Malolactic conversion: malic acid to lactic acid, softening wine."],["Diacetyl","Buttery compound produced during MLC."],["Bâtonnage","Stirring the lees in barrel."],["Sur lie","Aged on the lees, as in Muscadet."]],
quiz:[
[1,"Dill and coconut aromas suggest:","American oak",["French oak","Stainless steel","Concrete"],"American Quercus alba is rich in whiskey lactones."],
[1,"Malolactic conversion turns malic acid into:","Lactic acid",["Tartaric acid","Citric acid","Acetic acid"],"Lactic acid is softer, giving a creamier wine."],
[2,"Which two techniques give butter, toast and vanilla in Chardonnay?","MLC and new oak maturation",["Carbonic maceration and lees aging","Cold fermentation and sterile filtration","Chaptalization and fining"],"MLC creates diacetyl; toasted new barrels give toast and vanilla."],
[2,"A barrel's flavor contribution becomes negligible after roughly:","3-4 uses",["One use","10 uses","20 years"],"Older barrels still allow oxygen exchange."],
[1,"Muscadet 'sur lie' is aged on:","Dead yeast cells",["Oak chips","Grape skins","Stems"],"Lees add texture and a light bready note."],
[3,"Traditional Barolo producers favor which vessel?","Large Slavonian oak botti",["New American barriques","Concrete eggs only","Amphora"],"Large casks give oxygen without overt oak flavor; modernists used barriques."]
]});

L.push({id:"f9", unit:"F3", title:"Sparkling Wine Methods", mins:14,
summary:"Traditional, transfer, ancestral, tank, Asti and carbonation, plus dosage terms.",
body:`
<p>Bubbles are trapped CO₂ from a second fermentation (or, for cheap wine, injected). How and where that second fermentation happens decides the style.</p>
<h3>Traditional method (méthode champenoise)</h3>
<ol><li>Make a high-acid, low-alcohol base wine, often blending villages and vintages (the <b>assemblage</b>).</li>
<li>Bottle it with <b>liqueur de tirage</b>: wine, sugar, yeast and nutrients. Seal with a crown cap.</li>
<li>The second fermentation in bottle creates about 5-6 atmospheres of pressure.</li>
<li><b>Lees aging</b> (autolysis) builds brioche, biscuit, toast. Non-vintage Champagne: minimum 15 months total, 12 on lees. Vintage: 3 years.</li>
<li><b>Riddling</b> (remuage) moves lees to the neck, by hand on pupitres or by gyropalette.</li>
<li><b>Disgorgement:</b> the neck is frozen and the plug of lees is shot out.</li>
<li><b>Dosage:</b> topping up with <b>liqueur d'expédition</b> (wine plus sugar) to set sweetness.</li></ol>
<p>Used for Champagne, Crémant, Cava, Franciacorta, Cap Classique, English sparkling and most premium New World sparklers.</p>
<h3>The other methods</h3>
<ul><li><b>Transfer:</b> second ferment in bottle, then emptied into a tank, filtered and rebottled. Saves riddling; allows lees character. Common for large or small formats.</li>
<li><b>Ancestral (méthode ancestrale / pét-nat):</b> one fermentation, bottled before it finishes. Often cloudy and gently sparkling. Blanquette de Limoux's ancestral style, modern pét-nat.</li>
<li><b>Tank (Charmat or Martinotti):</b> second fermentation in a pressurized tank, then filtered and bottled. Preserves fresh, fruity aromas. Prosecco.</li>
<li><b>Asti method:</b> a single fermentation in tank, stopped by chilling at about 7-9.5% abv, leaving sweetness and grapey Moscato aroma. Asti and Moscato d'Asti (frizzante).</li>
<li><b>Carbonation:</b> CO₂ injected. Large bubbles that fade fast; inexpensive wines.</li></ul>
<h3>Sweetness (dosage) terms, driest to sweetest</h3>
<table class="t"><tr><th>Term</th><th>g/L sugar</th></tr>
<tr><td>Brut Nature (Zero Dosage)</td><td>0-3</td></tr><tr><td>Extra Brut</td><td>0-6</td></tr><tr><td>Brut</td><td>0-12</td></tr><tr><td>Extra Dry / Extra Sec</td><td>12-17</td></tr><tr><td>Sec</td><td>17-32</td></tr><tr><td>Demi-Sec</td><td>32-50</td></tr><tr><td>Doux</td><td>50+</td></tr></table>
<p>The trap everyone falls for: <b>Extra Dry is sweeter than Brut</b>.</p>`,
floor:`<p>Certified-level question pair from the CMS guide: Introductory asks "Liqueur de tirage is used in the production of which beverage?" (Champagne). Certified asks "What ingredients are found in the liqueur de tirage?" (wine, sugar, yeast, nutrients/riddling aid). Same topic, one level deeper.</p>`,
analyst:`<p>WSET Level 3 LO3 covers all six methods. Sample MCQ: "Removing sediment from a bottle of Champagne is called?" Answer: disgorgement. Diploma D4 adds 3 sparkling wines blind and open-response questions on production.</p>`,
terms:[["Liqueur de tirage","Wine, sugar, yeast and nutrients added to trigger second fermentation in bottle."],["Autolysis","Breakdown of dead yeast giving brioche and toast."],["Remuage","Riddling: moving lees into the bottle neck."],["Dégorgement","Disgorgement: removing the frozen lees plug."],["Liqueur d'expédition","Wine and sugar added after disgorgement; sets the dosage."],["Charmat","Tank method used for Prosecco."]],
quiz:[
[1,"Liqueur de tirage is used in the production of:","Champagne",["Bordeaux","Vin Doux Naturel","Vermouth"],"Official CMS Introductory sample question."],
[2,"What ingredients are in liqueur de tirage?","Wine, sugar, yeast and nutrients",["Brandy and sugar","Only sugar","Wine and SO₂"],"Official CMS Certified-level version of the same topic."],
[1,"Which is sweeter?","Extra Dry",["Brut","Extra Brut","Brut Nature"],"Extra Dry is 12-17 g/L; Brut is up to 12 g/L."],
[1,"Prosecco is typically made by which method?","Tank (Charmat/Martinotti)",["Traditional","Transfer","Carbonation"],"Tank fermentation keeps Glera's fresh pear and floral aromas."],
[2,"Minimum total aging for non-vintage Champagne?","15 months, 12 on lees",["9 months","3 years","6 months"],"Vintage Champagne requires 3 years."],
[2,"Removing the sediment from a Champagne bottle is called:","Disgorgement",["Riddling","Dosage","Assemblage"],"WSET Level 3 official sample question."],
[2,"Moscato d'Asti's sweetness comes from:","Stopping a single fermentation by chilling",["Adding sugar after fermentation","Botrytis","Fortification"],"The Asti method leaves residual grape sugar."]
]});

L.push({id:"f10", unit:"F3", title:"Sweet and Fortified Wines", mins:15,
summary:"Concentrating sugar, stopping fermentation, and building strength.",
body:`
<h3>How sweet wines are made</h3>
<p>Two families: <b>stop fermentation early</b> (chill, filter, add SO₂, or fortify), or <b>concentrate the sugar</b> so yeast can't finish (or add back sweet juice, called <b>süssreserve</b> in Germany).</p>
<ul><li><b>Noble rot:</b> Sauternes and Barsac (Sémillon, Sauvignon Blanc, Muscadelle), Tokaji Aszú (Furmint), German BA and TBA. Honey, apricot, saffron, marmalade.</li>
<li><b>Late harvest:</b> grapes left to overripen and shrivel. Alsace Vendanges Tardives, German Spätlese and Auslese.</li>
<li><b>Freezing:</b> grapes picked frozen; water stays as ice in the press. Icewine (Canada, from Vidal, Riesling, Cabernet Franc) and Eiswein (Germany, Austria). Must be naturally frozen.</li>
<li><b>Drying (passito):</b> grapes dried on mats or racks. Amarone (fermented dry) and Recioto (sweet) in Valpolicella, Vin Santo in Tuscany, Passito di Pantelleria. Vin de paille in Jura.</li></ul>
<h3>Fortified wines</h3>
<p>Fortification means adding grape spirit. <i>When</i> you add it decides everything:</p>
<ul><li><b>During fermentation</b> keeps natural grape sugar: Port, Madeira (most), Vins Doux Naturels (Banyuls, Maury, Muscat de Beaumes-de-Venise, Rivesaltes).</li>
<li><b>After fermentation</b> gives a dry base, sweetened later if at all: Sherry.</li></ul>
<h3>Biological versus oxidative aging</h3>
<p>Sherry introduces the most important split in fortified wine. Under a layer of yeast called <b>flor</b>, wine is protected from oxygen and becomes pale, tangy and saline (Fino, Manzanilla). Fortify past about 17% and flor dies; the wine ages <b>oxidatively</b>, becoming brown, nutty, walnut and toffee (Oloroso). Amontillado and Palo Cortado sit between. This also explains Tawny versus Ruby Port: oxidative wood aging versus reductive, fruit-preserving aging. Full details are in the Iberia unit.</p>
<h3>Madeira's heat</h3>
<p>Madeira is deliberately heated: <b>estufagem</b> (tanks warmed to about 113-122°F / 45-50°C for at least 3 months) for commercial wines, or <b>canteiro</b> (casks resting in warm lofts for years) for the best. The result is nearly indestructible: an opened bottle lasts months.</p>`,
floor:`<p>Fortified service: Port and Madeira are stored upright; vintage Port needs decanting. Fortified and dessert wines are a common CMS pairing and upselling topic: blue cheese and Sauternes or Port, chocolate and Banyuls or Maury.</p>`,
analyst:`<p>WSET Level 3 LO4 covers Port, Sherry, Muscat de Beaumes-de-Venise and Rutherglen Muscat. Madeira, Marsala and other VDNs are Diploma (D5) material. Fortified wines use their own alcohol scale on the SAT.</p>`,
terms:[["Süssreserve","Unfermented grape juice added for sweetness (Germany)."],["Passito","Wine from dried grapes (Italy)."],["Flor","Yeast film protecting Sherry from oxygen during biological aging."],["Estufagem","Heating Madeira in tanks."],["Canteiro","Aging Madeira casks in warm lofts."],["Vin Doux Naturel","French fortified wine with spirit added during fermentation."]],
quiz:[
[1,"Port is fortified:","During fermentation, preserving natural sugar",["After fermentation","Before fermentation","Never"],"Spirit kills the yeast, stopping fermentation."],
[1,"Sherry is fortified:","After fermentation is complete",["During fermentation","Before pressing","Only for sweet styles"],"Base wine is dry; sweet styles are blended or from PX."],
[2,"What happens if Sherry is fortified above about 17%?","Flor dies and the wine ages oxidatively",["Flor thrives","It becomes Manzanilla","It turns into Port"],"That's the route to Oloroso."],
[1,"Icewine grapes must be:","Naturally frozen on the vine",["Frozen in a freezer","Botrytized","Dried on mats"],"Cryoextraction is not allowed for Icewine/Eiswein."],
[2,"Amarone is made from:","Dried grapes fermented to dryness",["Botrytized grapes","Frozen grapes","Fortified wine"],"Recioto is the sweet sibling."],
[2,"Which wine is deliberately heated during aging?","Madeira",["Port","Sherry","Banyuls"],"Estufagem or canteiro."],
[3,"Rutherglen Muscat comes from:","Victoria, Australia",["Southern France","Spain","South Africa"],"Classification ladder: Rutherglen, Classic, Grand, Rare."]
]});

// ---------- F4 GRAPES ----------
L.push({id:"g1", unit:"F4", title:"The White Grapes", mins:18,
summary:"Structure, aromas and classic regions of the white varieties you must know cold.",
body:`
<p>For each grape, learn three things: its <b>structure</b> (acid, alcohol, body, phenolics), its <b>signature aromas</b>, and its <b>benchmark regions</b>. The Tasting Lab uses exactly these profiles.</p>
<table class="t"><tr><th>Grape</th><th>Structure</th><th>Markers</th><th>Benchmarks</th></tr>
<tr><td>Chardonnay</td><td>Chameleon: acid medium to high, body light to full</td><td>Cool: green apple, citrus, chalk. Warm: tropical, butter, vanilla (MLC, oak)</td><td>Chablis, Côte de Beaune, Mâconnais, Champagne, Sonoma, Napa, Margaret River</td></tr>
<tr><td>Sauvignon Blanc</td><td>High acid, light-medium body, usually no oak</td><td>Grass, gooseberry, grapefruit, flint (Loire); passion fruit, jalapeño (NZ). Pyrazines.</td><td>Sancerre, Pouilly-Fumé, Marlborough, Bordeaux (with Sémillon)</td></tr>
<tr><td>Riesling</td><td>Very high acid, any sweetness, often low alcohol</td><td>Lime, green apple, peach, white flowers, slate; petrol (TDN) with age</td><td>Mosel, Rheingau, Alsace, Wachau, Clare and Eden Valleys, Finger Lakes</td></tr>
<tr><td>Chenin Blanc</td><td>Very high acid, dry to sweet, sparkling too</td><td>Quince, baked apple, honey, wool/lanolin, chamomile</td><td>Vouvray, Savennières, Montlouis, Coteaux du Layon, Stellenbosch, Swartland</td></tr>
<tr><td>Sémillon</td><td>Low-medium acid, waxy, medium-full</td><td>Lemon, lanolin, beeswax; toast with age (Hunter Valley)</td><td>Sauternes, Graves/Pessac, Hunter Valley</td></tr>
<tr><td>Gewürztraminer</td><td>Low acid, high alcohol, oily, phenolic bitter finish</td><td>Lychee, rose, ginger, Turkish delight</td><td>Alsace, Alto Adige</td></tr>
<tr><td>Viognier</td><td>Low acid, high alcohol, full</td><td>Apricot, peach, honeysuckle</td><td>Condrieu, Château-Grillet; co-fermented in Côte-Rôtie</td></tr>
<tr><td>Pinot Grigio / Gris</td><td>Italy: light, neutral, crisp. Alsace: richer, off-dry</td><td>Pear, almond, lemon; smoky spice in Alsace</td><td>Friuli, Alto Adige, Alsace, Oregon</td></tr>
<tr><td>Albariño</td><td>High acid, light, no oak</td><td>Saline, peach, grapefruit, citrus blossom</td><td>Rías Baixas; as Alvarinho in Vinho Verde</td></tr>
<tr><td>Grüner Veltliner</td><td>Medium-high acid, light to full</td><td>White pepper, green bean, lentil, citrus</td><td>Wachau, Kamptal, Kremstal, Weinviertel</td></tr>
<tr><td>Torrontés</td><td>Medium acid, dry, phenolic bitterness</td><td>Very floral like Muscat (rose, orange blossom) but dry</td><td>Salta (Cafayate)</td></tr>
<tr><td>Muscat</td><td>Varies, often sweet or sparkling</td><td>Grapey, orange blossom, rose. The only grape that smells of grapes.</td><td>Asti, Beaumes-de-Venise, Rutherglen, Alsace</td></tr>
<tr><td>Melon (de Bourgogne)</td><td>High acid, light, neutral</td><td>Green apple, saline, bready from lees</td><td>Muscadet</td></tr>
<tr><td>Assyrtiko</td><td>Very high acid, can be full</td><td>Lemon, flint, saline</td><td>Santorini</td></tr>
<tr><td>Furmint</td><td>High acid</td><td>Quince, smoke, pear; apricot and marmalade in Aszú</td><td>Tokaj</td></tr></table>
<h3>Confusion pairs to drill</h3>
<ul><li><b>Vouvray vs German Riesling:</b> both high acid with RS. Chenin has honey, quince and lanolin, fuller body; Riesling is lime, slate, lighter, lower alcohol.</li>
<li><b>Chablis vs Sancerre:</b> both cool, high acid, mineral. Sancerre has green aromatics (grass, gooseberry); Chablis has green apple, lemon and chalk with no herbaceousness.</li>
<li><b>Gewürztraminer vs Torrontés:</b> both floral and bitter. Gewürz is lower acid, oilier, with lychee and rose; Torrontés is lighter, fresher, more citrus blossom.</li>
<li><b>California vs Côte d'Or Chardonnay:</b> riper tropical fruit, more alcohol and overt new oak in California; more acid, mineral and restraint in Burgundy.</li></ul>`,
floor:`<p>These are the white grapes on the CMS Americas Certified examinable list: Albariño, Chardonnay (Chablis, Côte de Beaune, Mâconnais, California), Chenin Blanc (Vouvray), Gewurztraminer (Alsace), Pinot Grigio (Friuli/Alto Adige), Riesling (Mosel/Rheingau Kabinett or Spätlese), Sauvignon Blanc (Sancerre/Pouilly-Fumé, Marlborough), Torrontés (Salta/Mendoza).</p>`,
analyst:`<p>WSET wants the "why": Riesling's acid survives because it ripens slowly in cool sites; Viognier is low acid because it needs warmth to develop aroma and loses acid as it does. Always link structure to cause.</p>`,
terms:[["TDN","Compound giving petrol aroma in aged Riesling."],["Pyrazines","Green bell pepper and grassy compounds (Sauvignon Blanc, Cabernets)."],["Alvarinho","Portuguese name for Albariño."]],
quiz:[
[1,"Lychee and rose with low acid and an oily texture suggest:","Gewürztraminer",["Riesling","Albariño","Sauvignon Blanc"],"Classic Alsace Gewurztraminer markers."],
[1,"Petrol aroma in an aged white points to:","Riesling",["Chardonnay","Viognier","Pinot Grigio"],"TDN develops with age and sun exposure."],
[2,"Quince, honey and lanolin with high acid and slight sweetness suggests:","Vouvray (Chenin Blanc)",["Mosel Riesling","Sancerre","Chablis"],"The CMS-recommended confusion pair is Vouvray vs German Riesling."],
[1,"White pepper and green bean are signatures of:","Grüner Veltliner",["Chenin Blanc","Muscat","Sémillon"],"Austria's flagship white."],
[2,"Which grape is a dry, floral Argentine white with a bitter finish?","Torrontés",["Gewürztraminer","Viognier","Muscat"],"Highest-quality examples from Cafayate, Salta."],
[1,"Viognier's home appellation in the Northern Rhône is:","Condrieu",["Hermitage","Cornas","Sancerre"],"Château-Grillet is a tiny monopole enclave within it."],
[2,"Unaged Hunter Valley Sémillon is typically:","Low alcohol, high acid, lemony; toasty only with bottle age",["Oaked and buttery","Sweet and botrytized","Full and oily"],"It develops toast and honey without oak."],
[3,"Assyrtiko is native to:","Santorini",["Crete","Cyprus","Sicily"],"Ungrafted, basket-trained (kouloura) vines in volcanic soils."]
]});

L.push({id:"g2", unit:"F4", title:"The Red Grapes", mins:20,
summary:"Structure, markers and benchmarks for the red varieties on every exam.",
body:`
<table class="t"><tr><th>Grape</th><th>Structure</th><th>Markers</th><th>Benchmarks</th></tr>
<tr><td>Cabernet Sauvignon</td><td>Deep, high tannin, medium+ acid, full</td><td>Cassis, blackberry, cedar, graphite, mint, green pepper (cool)</td><td>Médoc, Graves, Napa, Coonawarra, Margaret River, Maipo, Bolgheri</td></tr>
<tr><td>Merlot</td><td>Medium-high tannin, softer, medium acid</td><td>Plum, black cherry, cocoa, fruitcake</td><td>Pomerol, Saint-Émilion, Napa, Washington</td></tr>
<tr><td>Cabernet Franc</td><td>Medium body, medium+ acid, medium tannin</td><td>Raspberry, red currant, green pepper, violet, graphite</td><td>Chinon, Bourgueil, Saumur-Champigny, Saint-Émilion (Cheval Blanc)</td></tr>
<tr><td>Pinot Noir</td><td>Pale, high acid, low-medium tannin</td><td>Red cherry, raspberry, forest floor, mushroom, rose</td><td>Côte d'Or, Champagne, Willamette, Sonoma Coast, Central Otago, Martinborough</td></tr>
<tr><td>Syrah / Shiraz</td><td>Deep, medium+ tannin, medium acid</td><td>France: black pepper, olive, smoked meat, violet. Australia: jammy black fruit, eucalyptus, chocolate</td><td>Côte-Rôtie, Hermitage, Cornas, Saint-Joseph, Barossa, McLaren Vale</td></tr>
<tr><td>Grenache / Garnacha</td><td>Pale-medium, high alcohol, low acid, soft</td><td>Kirsch, strawberry, garrigue, white pepper</td><td>Châteauneuf-du-Pape, Gigondas, Priorat, Barossa</td></tr>
<tr><td>Mourvèdre / Monastrell</td><td>Deep, high tannin</td><td>Blackberry, game, meat, leather</td><td>Bandol, Jumilla, GSM blends</td></tr>
<tr><td>Malbec</td><td>Opaque purple, medium+ tannin</td><td>Blueberry, plum, violet; purple rim</td><td>Mendoza (Luján de Cuyo, Uco Valley), Cahors</td></tr>
<tr><td>Carmenère</td><td>Medium+ body</td><td>Black fruit, green pepper, paprika</td><td>Chile</td></tr>
<tr><td>Tempranillo</td><td>Medium acid and tannin</td><td>Red cherry, leather, tobacco; dill and coconut from American oak</td><td>Rioja, Ribera del Duero, Toro; Tinta Roriz in Douro</td></tr>
<tr><td>Sangiovese</td><td>High acid, medium+ tannin, medium-pale</td><td>Sour cherry, tomato leaf, dried herbs, tea, earth</td><td>Chianti Classico, Brunello di Montalcino, Vino Nobile</td></tr>
<tr><td>Nebbiolo</td><td>Pale garnet, high acid, high tannin</td><td>Tar and roses, cherry, violet, licorice, dried herbs</td><td>Barolo, Barbaresco, Roero, Valtellina, Gattinara</td></tr>
<tr><td>Barbera</td><td>Deep, high acid, low tannin</td><td>Sour cherry, plum</td><td>Asti, Alba</td></tr>
<tr><td>Gamay</td><td>Pale-medium, low tannin, high acid</td><td>Banana, bubblegum, red berries (carbonic)</td><td>Beaujolais and its crus</td></tr>
<tr><td>Zinfandel / Primitivo</td><td>High alcohol, medium+ body</td><td>Jammy bramble, raisin, black pepper</td><td>Sonoma (Dry Creek), Lodi, Paso Robles; Puglia</td></tr>
<tr><td>Pinotage</td><td>Medium+ tannin</td><td>Black fruit, smoke, banana or acetone notes</td><td>Stellenbosch</td></tr></table>
<h3>Confusion pairs to drill</h3>
<ul><li><b>Pinot Noir vs Nebbiolo:</b> both pale. Nebbiolo's tannin and acid are far higher; tar and dried roses versus fresh red cherry and forest floor.</li>
<li><b>Sangiovese vs Nebbiolo:</b> Sangiovese is darker, less tannic, with tomato leaf and sour cherry.</li>
<li><b>Sangiovese vs Rioja:</b> Rioja shows dill/coconut American oak, leather, lower acid.</li>
<li><b>Grenache vs Rioja:</b> Grenache is higher alcohol, lighter color, kirsch and garrigue; Rioja shows oak and leather.</li>
<li><b>Shiraz vs Malbec vs Zinfandel:</b> Shiraz has eucalyptus and chocolate, Malbec violet and a purple rim, Zinfandel jammy bramble and high alcohol, sometimes a hint of raisin.</li>
<li><b>Burgundy vs US Pinot:</b> earth, acid and restraint versus riper dark cherry, cola and more alcohol.</li></ul>`,
floor:`<p>CMS Americas Certified red list: Cabernet Franc (Chinon/Bourgueil), Cabernet Sauvignon (Haut-Médoc/Graves; Napa/Sonoma/Paso), Gamay (Beaujolais), Grenache (Châteauneuf/Gigondas), Malbec (Mendoza), Merlot (Pomerol/St-Émilion; Napa/Sonoma), Nebbiolo (Barolo/Barbaresco), Pinot Noir (Côte d'Or; Carneros/Sonoma/Central Coast; Willamette), Sangiovese (Brunello/Chianti Classico), Syrah/Shiraz (Northern Rhône; South Australia/WA/Victoria), Tempranillo (Rioja Reserva/Gran Reserva), Zinfandel (Napa/Sonoma).</p>`,
analyst:`<p>WSET short answers love red grape "why" questions: why Nebbiolo is pale yet tannic (thin skins low in stable anthocyanins, but rich in tannin), why Pinot Noir struggles in hot climates (thin skins, early ripening, loses aroma and acid).</p>`,
terms:[["GSM","Grenache, Syrah, Mourvèdre blend."],["Tinta Roriz","Portuguese name for Tempranillo."],["Primitivo","Italian name for Zinfandel (both are Croatian Tribidrag)."]],
quiz:[
[1,"Pale garnet color with high tannin, high acid, tar and roses suggests:","Nebbiolo",["Pinot Noir","Grenache","Gamay"],"The classic Barolo profile."],
[1,"Black pepper, olive and smoked meat suggest:","Northern Rhône Syrah",["Australian Shiraz","Malbec","Merlot"],"Rotundone gives black pepper."],
[2,"Dill and coconut with leather in a medium-bodied red point to:","Rioja Reserva (Tempranillo)",["Chianti Classico","Barolo","Pomerol"],"American oak aging is traditional in Rioja."],
[1,"Banana and bubblegum in a light red point to:","Gamay from Beaujolais",["Pinot Noir","Nebbiolo","Barbera"],"Carbonic maceration esters."],
[2,"Which red is known for high acid but low tannin?","Barbera",["Nebbiolo","Cabernet Sauvignon","Mourvèdre"],"Barbera's low tannin is why it pairs widely."],
[2,"Zinfandel is genetically identical to:","Primitivo",["Petite Sirah","Grenache","Carignan"],"Both are Croatian Crljenak Kaštelanski / Tribidrag."],
[2,"Which grape gives a purple rim, blueberry and violet?","Malbec",["Nebbiolo","Grenache","Sangiovese"],"Mendoza Malbec's color is a giveaway."],
[3,"Carmenère was long mistaken in Chile for:","Merlot",["Cabernet Franc","Malbec","Syrah"],"Identified by DNA in 1994."]
]});

L.push({id:"g3", unit:"F4", title:"Important Regional Grapes", mins:12,
summary:"The supporting cast that shows up on Certified and Advanced theory papers.",
body:`
<p>These grapes matter less for blind tasting at Certified but appear constantly in theory questions, especially matching exercises (grape to appellation).</p>
<h3>Whites</h3>
<ul><li><b>Garganega:</b> Soave. Almond, lemon, pear.</li><li><b>Verdicchio:</b> Castelli di Jesi and Matelica (Marche). Bitter almond, citrus, high acid.</li><li><b>Fiano:</b> Fiano di Avellino DOCG. Waxy, hazelnut, honey.</li><li><b>Greco:</b> Greco di Tufo DOCG. Peach, almond.</li><li><b>Cortese:</b> Gavi. Lean, citrus.</li><li><b>Arneis:</b> Roero. Pear, almond.</li><li><b>Vermentino:</b> Sardinia (Vermentino di Gallura DOCG), Liguria; Rolle in Provence.</li><li><b>Glera:</b> Prosecco.</li><li><b>Trebbiano / Ugni Blanc:</b> neutral, high-yield; the base for Cognac and Armagnac.</li><li><b>Marsanne and Roussanne:</b> white Hermitage, Saint-Joseph, Saint-Péray.</li><li><b>Palomino:</b> Sherry. <b>Pedro Ximénez:</b> sweet Sherry, Montilla-Moriles.</li><li><b>Verdejo:</b> Rueda. <b>Macabeo (Viura), Xarel·lo, Parellada:</b> Cava.</li><li><b>Godello:</b> Valdeorras. <b>Loureiro:</b> Vinho Verde.</li><li><b>Pinot Blanc, Sylvaner, Muscat:</b> Alsace.</li><li><b>Silvaner:</b> Franken (in the Bocksbeutel flask).</li><li><b>Savagnin:</b> Jura, Vin Jaune.</li></ul>
<h3>Reds</h3>
<ul><li><b>Corvina, Rondinella, Molinara:</b> Valpolicella, Amarone, Bardolino.</li><li><b>Dolcetto:</b> Dogliani, Alba. Low acid, grippy, bitter almond.</li><li><b>Aglianico:</b> Taurasi (Campania), Aglianico del Vulture (Basilicata). High acid and tannin.</li><li><b>Nero d'Avola:</b> Sicily. <b>Nerello Mascalese:</b> Etna. <b>Frappato:</b> Cerasuolo di Vittoria.</li><li><b>Montepulciano:</b> Montepulciano d'Abruzzo (not to be confused with Vino Nobile di Montepulciano, which is Sangiovese).</li><li><b>Lagrein, Schiava:</b> Alto Adige. <b>Teroldego:</b> Trentino.</li><li><b>Mencía:</b> Bierzo, Ribeira Sacra. <b>Graciano, Mazuelo (Carignan):</b> Rioja blending.</li><li><b>Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca, Tinto Cão:</b> Port and Douro.</li><li><b>Baga:</b> Bairrada.</li><li><b>Xinomavro:</b> Naoussa ("acid-black", Nebbiolo-like). <b>Agiorgitiko:</b> Nemea.</li><li><b>Blaufränkisch, Zweigelt, St. Laurent:</b> Austria. Blaufränkisch is Kékfrankos in Hungary and Lemberger in Washington.</li><li><b>Tannat:</b> Madiran, Uruguay. <b>Petit Verdot:</b> Bordeaux blending.</li><li><b>Cinsault, Carignan:</b> Languedoc, Southern Rhône. <b>Pinot Meunier:</b> Champagne.</li><li><b>Trousseau, Poulsard:</b> Jura.</li></ul>`,
floor:`<p>CMS Certified matching item example: pair Valpolicella, Bandol, Tokaj and Gigondas with Corvina, Mourvèdre, Furmint and Grenache. Practice these as fast lookups.</p>`,
analyst:`<p>Many of these (Garganega, Fiano, Aglianico, Xinomavro, Agiorgitiko, Assyrtiko) are named in the WSET Level 3 specification. Xinomavro (Naoussa), Agiorgitiko (Nemea) and Assyrtiko (Santorini) are the three Greek wines on the Level 3 list.</p>`,
terms:[["Garganega","White grape of Soave."],["Aglianico","Tannic southern Italian red; Taurasi, Vulture."],["Mencía","Red of Bierzo and Ribeira Sacra."],["Xinomavro","Tannic, high-acid red of Naoussa, Greece."],["Blaufränkisch","Austrian red; Kékfrankos in Hungary, Lemberger in the US."]],
quiz:[
[1,"Match Valpolicella with its main grape:","Corvina",["Mourvèdre","Furmint","Grenache"],"From the official CMS matching example."],
[1,"Match Bandol with its main grape:","Mourvèdre",["Corvina","Furmint","Grenache"],"Bandol reds require at least 50% Mourvèdre."],
[2,"Montepulciano d'Abruzzo is made from:","The Montepulciano grape",["Sangiovese","Nebbiolo","Aglianico"],"Vino Nobile di Montepulciano (Tuscany) is Sangiovese, named for the town."],
[2,"Which white grape is the base of Soave?","Garganega",["Cortese","Arneis","Verdicchio"],"Gavi is Cortese; Roero Arneis is Arneis."],
[2,"Cava's three traditional grapes are:","Macabeo, Xarel·lo, Parellada",["Palomino, PX, Moscatel","Verdejo, Viura, Godello","Albariño, Loureiro, Treixadura"],"Chardonnay and others are also permitted now."],
[2,"Xinomavro is the grape of:","Naoussa",["Nemea","Santorini","Tokaj"],"Agiorgitiko is Nemea; Assyrtiko is Santorini."],
[3,"Taurasi DOCG is made from:","Aglianico",["Nero d'Avola","Primitivo","Negroamaro"],"Sometimes called the Barolo of the South."],
[3,"Lemberger in Washington State is the same grape as:","Blaufränkisch",["Zweigelt","St. Laurent","Dornfelder"],"Kékfrankos in Hungary."]
]});
