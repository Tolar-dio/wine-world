// ===== CURRICULUM PART 1: Orientation, Tasting Method, Vineyard =====
// Question format: [difficulty 1-3, question, correct answer, [distractors], explanation]
const UNITS = [
  {id:"O",  name:"Orientation", blurb:"What somm school is, where it came from, and how this one works."},
  {id:"F1", name:"The Tasting Method", blurb:"Sight, nose, palate, conclusion. The skill every exam is built on."},
  {id:"F2", name:"The Vineyard", blurb:"Vine biology, climate, site and farming. Why a grape tastes like where it grew."},
  {id:"F3", name:"The Winery", blurb:"Every decision between picking and bottling, and what each one does to the glass."},
  {id:"F4", name:"The Grapes", blurb:"The varieties you must know cold, with their structure and markers."},
  {id:"R1", name:"France", blurb:"The reference point for most of the wine world's styles and laws."},
  {id:"R2", name:"Italy", blurb:"Hundreds of native grapes, a DOCG ladder, and the toughest map on the exam."},
  {id:"R3", name:"Iberia", blurb:"Spain, Sherry, Portugal, Port and Madeira."},
  {id:"R4", name:"Central Europe & the Eastern Med", blurb:"Germany, Austria, Hungary and Greece."},
  {id:"R5", name:"The New World", blurb:"USA, Canada, South America, South Africa, Australia, New Zealand."},
  {id:"S1", name:"The Floor", blurb:"Service standards, storage, pairing and the business of the wine list."},
  {id:"S2", name:"Beyond Wine", blurb:"Spirits, beer, sake, cider and cocktails. CMS examines all of it."},
  {id:"A1", name:"The Written Paper", blurb:"How WSET marks tasting notes and short answers, and how to write for marks."},
  {id:"C1", name:"Capstone", blurb:"Advanced, Master Sommelier, Diploma and Master of Wine level thinking."}
];
const L = [];

L.push({id:"o1", unit:"O", title:"Welcome to Vitis Mundi Academy", mins:12,
summary:"Why sommelier credentials exist, how the two big schools differ, and how this program copies them.",
body:`
<p>No government licenses sommeliers. There is no bar exam, no state board, no legal title. A "certified sommelier" is certified by a private organization that the industry has agreed to respect. So what you are buying when you pay for somm school is two things: a structured body of knowledge, and a credential that tells an employer you survived a known test. This academy gives you the first one completely and rehearses you for the second, so if you ever decide to pay for a single exam, you walk in already prepared.</p>
<h3>A short history: three exams born in London</h3>
<p>The modern credential system grew out of the post-war British wine trade, which bought, shipped and bottled most of the world's fine wine.</p>
<ul>
<li><b>1953, the Master of Wine.</b> The Vintners' Company and the Wine and Spirit Association held the first MW exam to raise standards among merchants and importers. The Institute of Masters of Wine followed in 1955. Sarah Morphew Stephen became the first woman MW in 1970. The MW was built for buyers, so it rewards analysis, writing and commercial judgment.</li>
<li><b>1969, WSET.</b> The Wine & Spirit Education Trust was founded to train the wider UK drinks trade: shop staff, importers, distributors. It is now a global course provider with qualifications from Level 1 to the Level 4 Diploma, and it teaches through a written, analytical lens.</li>
<li><b>1969 and 1977, the Master Sommelier.</b> The first MS exam was held in the UK in 1969. The Court of Master Sommeliers formed in 1977 to examine people who work the dining room. The Americas chapter followed the first US exam in 1986, and the Certified level was added in 2006 to bridge Introductory and Advanced.</li>
</ul>
<p>Notice the split in DNA. The MW and WSET were made for merchants, so they ask you to <i>explain</i>. The Court was made for the restaurant floor, so it asks you to <i>perform</i>: name the wine fast, open the bottle cleanly, sell the guest something they will love.</p>
<h3>The scandals, and why the exams are more transparent now</h3>
<p>In 2018 a Master Sommelier and exam proctor leaked details of the tasting wines. The Americas board invalidated the tasting results for all 54 candidates and suspended the titles of 23 of the 24 who had passed. In October 2020 a <i>New York Times</i> investigation reported that 21 women described harassment, manipulation or assault by male Master Sommeliers. Several MSs lost their titles and the board was replaced. Since then CMS Americas has added external board members, an outside executive director, a Candidate Bill of Rights, an ethics line, digitized exams and published detailed standards. That last point matters to you: the grids and service standards this academy uses are drawn from those published documents.</p>
<h3>How this academy is organized</h3>
<p>Everything sits on one shared spine: vineyard, winery, grapes, regions, law, service, business, other drinks. On top of that spine you choose a <b>track</b>:</p>
<ul>
<li><b>Floor track (modeled on the Court of Master Sommeliers):</b> Introductory, Certified, Advanced, Master. Deductive blind tasting against the clock, tableside service, salesmanship and wine-list math.</li>
<li><b>Analyst track (modeled on WSET):</b> Level 2, Level 3, Diploma, then a Master of Wine capstone. The Systematic Approach to Tasting, quality assessment, and written answers that explain why.</li>
</ul>
<p>Each credential has required lessons and a final exam built to the real format: same question counts, same time limits, same pass marks. Pass the mock and the academy awards the seal. You can switch tracks any time; passed lessons carry over, but each track has its own exams and its own skills to prove.</p>
<h3>The one thing software cannot do</h3>
<p>You cannot learn to taste from a screen. Every real program assumes you are tasting real wine several times a week, ideally blind, ideally with a group. The Tasting Lab here gives you the grids, scores your calls against the textbook profile, and keeps a log of what you miss. The wine has to come from you. A 4 to 6 person group splitting bottles is how almost every successful candidate does it.</p>`,
floor:`<p>The Court is an <b>exam body</b>, not a school. Its Introductory course is short; after that you are expected to study on your own and show up to be tested. Pass marks: 60% at Introductory, Certified and Advanced, 75% for the Master Sommelier Diploma. Only 4 of 30 candidates passed the full MS exam in 2026.</p>`,
analyst:`<p>WSET is a <b>course provider</b>. You enroll with an approved program provider, attend classes, then sit a written exam. Pass marks are 55% from Level 2 up, with merit and distinction bands. Level 3 pass rates at one large US provider run around 74% first time; the Diploma takes about 500 study hours.</p>`,
terms:[["Master of Wine (MW)","Apex credential from the Institute of Masters of Wine, first examined 1953. Theory, three 12-wine blind papers, and a research paper."],["WSET","Wine & Spirit Education Trust, founded 1969. Course provider, Levels 1-4."],["Court of Master Sommeliers (CMS)","Examining body for sommeliers, founded 1977. Introductory, Certified, Advanced, Master."],["Master Sommelier (MS)","Top CMS title: theory, 6-wine verbal blind tasting in 25 minutes, and a service practical, each at 75%."]],
quiz:[
[1,"Which credential was examined first?","Master of Wine (1953)",["WSET Diploma","Master Sommelier","Certified Specialist of Wine"],"The first MW exam was held in 1953. WSET and the first MS exam both date to 1969; the Court itself to 1977."],
[1,"What is the pass mark for each section of the Master Sommelier Diploma?","75%",["60%","55%","70%"],"Lower CMS levels pass at 60%; the MS demands 75% in theory, tasting and service."],
[1,"The Court of Master Sommeliers was created mainly to examine:","People who sell and serve wine in restaurants",["People who import and distribute wine","People who grow grapes and make wine","People who write about and score wine"],"The Court's DNA is the dining room, which is why every level from Certified up includes service."],
[2,"In the 2018 CMS cheating scandal, what did the board do?","Invalidated the tasting results and suspended the new titles",["Revoked every Master Sommelier title awarded that decade","Moved the tasting exam to Europe for five years","Dropped blind tasting from the Master exam altogether"],"All 54 candidates' tasting results were voided and 23 of 24 new titles suspended; affected candidates could resit."],
[1,"Which is true of the title 'sommelier' in the US?","It is not regulated by any government license",["It requires a state license","Only CMS graduates may legally use it","It requires WSET Level 3"],"The title is unregulated. Credentials are private and their value comes from industry respect."]
]});

L.push({id:"o2", unit:"O", title:"Choosing Your Track", mins:8,
summary:"CMS versus WSET in philosophy, careers and exam style, plus the smaller schools.",
body:`
<p>The most common mistake new students make is treating CMS and WSET as rival brands of the same thing. They test different skills for different jobs.</p>
<table class="t"><tr><th></th><th>Floor (CMS)</th><th>Analyst (WSET)</th></tr>
<tr><td>Identity</td><td>Exam body for sommeliers</td><td>Course provider for the whole trade</td></tr>
<tr><td>Core skill</td><td>Fast spoken deduction, service, selling</td><td>Accurate description, explaining why, written argument</td></tr>
<tr><td>Blind tasting goal</td><td>Name grape, country, region, vintage</td><td>Describe precisely, judge quality and readiness; identity matters mostly at Diploma</td></tr>
<tr><td>Best for</td><td>Restaurant sommeliers, beverage directors</td><td>Retail, distribution, import, marketing, education, writing</td></tr></table>
<p>Many professionals do both: WSET Level 2 or 3 for structure, then CMS Certified for floor credibility, then Advanced or the Diploma depending on career. The WSET Diploma is the usual springboard to the MW. If you are unsure, start on the Analyst track: it builds the "why" that makes Floor-style deduction possible. If you want to work a dining room, start Floor.</p>
<h3>The other schools</h3>
<ul>
<li><b>Society of Wine Educators (CSW):</b> 100 multiple-choice questions in an hour, 75% to pass, all drawn from one annual study guide. Pure book knowledge, great value. Its CWE adds tasting, faults, an essay and a presentation.</li>
<li><b>Wine Scholar Guild:</b> deep single-country programs (French, Italian, Spanish, German Wine Scholar). 100 questions, one hour, 75%. Masters-level programs on Bourgogne, Champagne and Bordeaux. The Electives exams in this academy copy this format.</li>
<li><b>International Sommelier Guild:</b> classroom model, closer to a trade school, ending in a diploma and dissertation.</li>
<li><b>Master of Wine:</b> needs 3+ years of professional experience, at least 3 years of study, three 12-wine blind papers, five theory papers and a 10,000-word research paper.</li>
</ul>
<h3>Where the money goes, and where it doesn't have to</h3>
<p>WSET Level 3 runs about $1,135 to $1,780 at one large US provider and the Diploma about $7,800 with registration. CMS Introductory online is $649 plus an optional wine kit; each MS exam section is reported near $1,000. The podcast host Elizabeth Schneider, herself a CMS Certified Sommelier and CSW, has called the top titles closer to "a small, private club" than a professional certification. The sensible plan: study everything here for free, then pay for one exam only if a job asks for the paper.</p>`,
floor:`<p>Floor track seals: <b>Introductory</b> (70 MCQ, 45 min, 60%), <b>Certified</b> (theory 45 Q in 38 min, 4 wines in 45 min, service practical; 60% each), <b>Advanced</b> (6 wines in 25 min aloud, theory, service and business; 60% each), <b>Master</b> (all at 75%).</p>`,
analyst:`<p>Analyst track seals: <b>Level 2</b> (50 MCQ, 60 min, 55%), <b>Level 3</b> (50 MCQ + four 25-mark short answers + 2 wines blind by SAT; 55% in each part), <b>Diploma</b> (D1-D6, essays and 12-wine papers, 55%), <b>MW capstone</b>.</p>`,
terms:[["CSW","Certified Specialist of Wine (Society of Wine Educators). 100 MCQ in 60 min, 75% to pass."],["Wine Scholar Guild","Single-country deep-dive programs; 100 MCQ, 75% to pass, Honors at 85+."]],
quiz:[
[1,"Which program's blind tasting puts the most weight on naming the grape, place and vintage?","CMS",["WSET Level 3","CSW","WSET Level 2"],"WSET Level 3 grades the description and quality call; CMS grades your identification."],
[1,"The CSW exam is:","100 multiple-choice questions in one hour, 75% to pass",["A 6-wine verbal blind tasting in 25 minutes","Four 25-mark written answers in two hours","50 multiple-choice questions plus a service practical"],"Everything on the CSW comes from the annual study guide."],
[2,"Which credential is the usual stepping stone to the Master of Wine?","WSET Level 4 Diploma",["CMS Introductory","CSW","French Wine Scholar"],"The Diploma's analytical, written style is closest to the MW."],
[1,"WSET Level 2 includes a blind tasting exam.","False: it is a 50-question multiple-choice paper only",["True: two wines assessed in 30 minutes by SAT","True: one wine written up as a full tasting note","False: it is four written short answers only"],"Tasting is taught at Level 2 but not examined until Level 3."]
]});

// ---------- F1 TASTING ----------
L.push({id:"f1", unit:"F1", title:"How a Sommelier Tastes", mins:15,
summary:"The four-stage method behind both grids, and why every observation is evidence.",
body:`
<p>Blind tasting looks like a party trick. It is closer to detective work. A wine is a record of decisions: a grape, a climate, a winemaker's choices, time in bottle. Each of those leaves physical evidence you can see, smell and feel. The grid is a checklist that forces you to collect all the evidence before you name a suspect.</p>
<h3>Stage 1: Sight</h3>
<p>Tilt the glass over white paper. <b>Clarity</b> (clear, hazy, cloudy) can flag a fault or an unfiltered wine. <b>Intensity of color</b> hints at grape skin thickness and age: Nebbiolo and Pinot Noir are pale; Syrah and Malbec are opaque. <b>Hue</b> tells age: whites darken from straw to gold to amber; reds go from purple to ruby to garnet to brick. A <b>rim variation</b> (the color thinning and browning at the edge) suggests age. <b>Tears</b> or legs suggest alcohol and sugar, but loosely. <b>Gas</b> bubbles in a still wine suggest early bottling or a cool-climate, reductive white.</p>
<h3>Stage 2: Nose</h3>
<p>First check for <b>faults</b>. Then <b>intensity</b> (delicate to powerful) and <b>age</b> (youthful, developing, vinous). Then name aromas in families, always in the same order so you never skip one: fruit (which family, and its condition), non-fruit (flowers, herbs, spice, pyrazine), earth, mineral, oak. The <b>condition</b> of the fruit is the strongest climate clue you have: tart fruit means cool, ripe fruit moderate, baked or jammy fruit warm.</p>
<h3>Stage 3: Palate</h3>
<p>Confirm the nose, then measure <b>structure</b>: sweetness, acidity, alcohol, tannin, body. Structure is harder to fake than aroma, so exam veterans trust it most. A wine can smell like ripe cherries, but if its acid is high and its tannin grips like strong black tea, think Nebbiolo or Sangiovese, not Grenache. Finish with <b>balance</b>, <b>length</b> and <b>complexity</b>.</p>
<h3>Stage 4: Conclusion</h3>
<p>The <b>initial conclusion</b> narrows the field: climate, possible grapes, possible countries and an age range. The <b>final conclusion</b> commits: grape, country, region, quality level, vintage. The reasoning runs in one direction:</p>
<ul>
<li>Fruit condition and structure point to <b>climate</b>.</li>
<li>Earth and mineral against fruit point to <b>style and likely countries</b>: savory and earth-led, or fruit-led. Tasters long called this "Old World versus New World"; the Court dropped those words from its grid in 2024 because warm vintages and modern winemaking blurred the line, so name countries instead.</li>
<li>Structure markers and signature aromas point to the <b>grape</b>.</li>
<li>Oak type and winemaking signatures point to the <b>region and style</b>.</li>
</ul>
<h3>Practical habits</h3>
<ul><li>Taste at the same time of day, with no fragrance, gum or coffee.</li><li>Pour about 1.5 oz (45 ml) in an ISO or universal glass.</li><li>Say your notes aloud, in grid order, every time. The Advanced and Master tasting exams are spoken.</li><li>Spit. A Certified exam is four wines; a practice session can be twelve.</li></ul>`,
floor:`<p>CMS rewards <b>speed and order</b>. At Certified you write a checkbox grid for 4 wines in 45 minutes, about 11 minutes each. At Advanced and Master you speak 6 wines in 25 minutes, about 4 minutes each. Every grid line is worth a point and nothing is deducted for a wrong answer, so never leave a line blank. If something is absent (no oak, no earth), you must say "no".</p>`,
analyst:`<p>WSET rewards <b>precision and justification</b>. The SAT uses calibrated scales (light, medium(-), medium, medium(+), pronounced) and asks you to judge quality with <b>BLIC</b>: Balance, Length, Intensity, Complexity. At Level 3 you do not have to name the wine at all.</p>`,
terms:[["Rim variation","Color difference between the core and edge of a red; a broad, bricking rim suggests age."],["Fruit condition","Tart, ripe, baked, jammy, dried. The best single clue to climate."],["Initial conclusion","Possible grapes, climate, possible countries and an age range, before committing."],["Vinous","CMS term for a nose that has lost primary fruit and shows age-derived character."]],
quiz:[
[1,"Which observation is the strongest clue to climate?","The condition of the fruit",["The width and color of the rim","The speed and thickness of the tears","The presence of a few bubbles of gas"],"Tart, ripe, baked or jammy fruit tracks how much heat the grapes saw; confirm it with alcohol and acidity."],
[1,"As a red wine ages, its hue generally moves:","From purple to ruby to garnet to brick",["From garnet to ruby to purple to black","From brick to garnet to ruby to purple","From ruby to purple and then to brown"],"Pigments polymerize and drop out; the wine browns, starting at the rim."],
[2,"On a CMS grid, how are wrong answers penalized?","They are not: each correct line earns a point",["Each wrong line costs one point","A wrong line cancels a correct one","Two wrong lines fail the whole wine"],"Always tick something on every line, including an explicit 'no' for absent elements."],
[2,"A red smells of ripe cherry but has high acid and very grippy tannin. Which is the better initial grape call?","Nebbiolo or Sangiovese",["Grenache or Zinfandel","Merlot or Malbec","Gamay or Dolcetto"],"Structure outranks aroma. High acid with high tannin points to the Italian pair."],
[1,"What does BLIC stand for in WSET quality assessment?","Balance, Length, Intensity, Complexity",["Body, Length, Intensity, Color","Balance, Liveliness, Intensity, Clarity","Body, Lees, Intensity, Complexity"],"Each factor is evidence for the quality call."]
]});

L.push({id:"f2", unit:"F1", title:"Structure: Calibrating Your Palate", mins:14,
summary:"Sweetness, acid, tannin, alcohol and body, with kitchen experiments to calibrate each.",
body:`
<p>Aromas vary between bottles and between noses. Structure does not, which is why it is the backbone of deduction. Calibrate it once with household experiments and you will trust it in an exam room.</p>
<h3>Sweetness</h3>
<p>Residual sugar (RS) is the grape sugar left unfermented. Most people sense it on the tip of the tongue from about 4 to 10 g/L, but acid masks it: a German Kabinett with 40 g/L can taste only off-dry. Fruity aroma also tricks people into calling dry wines sweet. CMS scale: bone dry, dry, dry with slight RS, off-dry, medium-sweet, sweet, lusciously sweet. WSET Level 3: dry, off-dry, medium-dry, medium-sweet, sweet, luscious.</p>
<p><i>Experiment:</i> dissolve 1, 2 and 4 teaspoons of sugar in separate glasses of water, then repeat with a squeeze of lemon. Notice how acid hides sugar.</p>
<h3>Acidity</h3>
<p>Acid makes your mouth water, especially at the sides of the tongue, and makes wine feel fresh. Cool climates and grapes like Riesling, Chenin Blanc, Sauvignon Blanc, Nebbiolo and Sangiovese retain high acid. Warm climates and grapes like Viognier, Gewürztraminer and Grenache run low. Count how long you salivate after spitting: a few seconds is low, a long stream is high.</p>
<h3>Tannin</h3>
<p>Tannins are polyphenols from skins, seeds, stems and oak. They bind to proteins in saliva and leave a drying, gripping feel on the gums. Judge both <b>volume</b> (low to high) and <b>texture</b> (silky, soft, gritty, coarse, stalky). Cabernet Sauvignon, Nebbiolo, Tannat and young Syrah are high; Gamay, Pinot Noir and Grenache are lower.</p>
<p><i>Experiment:</i> steep black tea for 1, 3 and 10 minutes and taste each. Ten minutes is Barolo.</p>
<h3>Alcohol</h3>
<p>Alcohol reads as warmth in the throat and chest, plus weight and a faint sweetness. Under about 11% ABV is low (Mosel Kabinett, Moscato d'Asti); 11 to 13.5% medium; over 13.5% high (Zinfandel, Châteauneuf-du-Pape, Amarone). Warm climates ripen more sugar and so more alcohol.</p>
<h3>Body</h3>
<p>Body is the overall weight on the palate: alcohol, sugar, extract and glycerol together. Think skim milk, whole milk, cream.</p>
<h3>How structure becomes a clue</h3>
<ul>
<li>High acid + low alcohol + RS in a white: German Riesling or Vouvray.</li>
<li>Low acid + high alcohol + oily texture + bitter finish: Gewürztraminer or Viognier.</li>
<li>Pale red + high acid + high tannin: Nebbiolo.</li>
<li>Pale red + high alcohol + low acid + soft tannin: Grenache.</li>
<li>Deep red + high tannin + medium-plus acid + green note: Cabernet Sauvignon or Cabernet Franc.</li>
</ul>`,
floor:`<p>On the 2024 CMS Advanced/Master format, acid, alcohol and body use five-step scales. Whites get a line for <b>phenolic bitterness</b> (yes/no). Reds get tannin volume <i>and</i> texture. A <b>texture</b> line (lean, crisp, creamy, waxy, oily) helps separate Chablis from Meursault and Pinot Grigio from Gewürztraminer.</p>`,
analyst:`<p>WSET Level 3 scales: acidity and tannin run low, medium(-), medium, medium(+), high. Alcohol is low/medium/high (under 11%, 11-13.9%, 14%+ for still wine). Body is light to full on five steps. Fortified wines have their own alcohol scale.</p>`,
terms:[["Residual sugar (RS)","Unfermented grape sugar remaining in the finished wine, measured in g/L."],["Phenolic bitterness","A bitter, grippy finish in whites from skin contact or certain grapes (Gewürztraminer, Pinot Grigio, Torrontés)."],["Body","The perceived weight of a wine, from alcohol, sugar, glycerol and extract."]],
quiz:[
[1,"Which structural element is felt as drying and gripping on the gums?","Tannin",["Acidity","Alcohol","Residual sugar"],"Tannins bind with saliva proteins, removing lubrication."],
[1,"What makes a sweet wine taste less sweet than its sugar level suggests?","High acidity",["High tannin","Low alcohol","New oak"],"Acid balances sugar; this is why Mosel Riesling can carry 40+ g/L and taste off-dry."],
[2,"A white wine with low acid, high alcohol, oily texture and a bitter finish most likely is:","Gewürztraminer",["Riesling","Sauvignon Blanc","Albariño"],"This is the classic Gewürztraminer (or Viognier) structure."],
[2,"On the WSET Level 3 SAT, what alcohol level is classed as 'high' for still wine?","14% abv and above",["12% abv and above","13% abv and above","15% abv and above"],"Low is under 11%, medium 11-13.9%, high 14%+."],
[1,"Steeping black tea for 10 minutes is a classic way to calibrate:","High tannin",["High acid","High alcohol","Sweetness"],"Over-steeped tea is rich in tannins, similar to young Nebbiolo or Cabernet."]
]});

L.push({id:"f3", unit:"F1", title:"Faults and Flaws", mins:12,
summary:"Cork taint, oxidation, reduction, VA, Brett, heat damage: how to spot them and what to say to a guest.",
body:`
<p>Knowing faults is a service skill as much as a tasting skill. A guest sends back a bottle; you need to know in five seconds whether the wine is flawed or simply not to their taste, and how to handle both gracefully.</p>
<h3>The main faults</h3>
<table class="t"><tr><th>Fault</th><th>Smells like</th><th>Cause</th></tr>
<tr><td>Cork taint (TCA)</td><td>Wet cardboard, damp basement, muted fruit</td><td>2,4,6-trichloroanisole, usually from cork. Detectable at parts per trillion.</td></tr>
<tr><td>Oxidation</td><td>Bruised apple, nutty, flat; browning color</td><td>Too much oxygen. Deliberate in Sherry and Tawny Port, a fault elsewhere.</td></tr>
<tr><td>Reduction</td><td>Rotten egg, struck match, cabbage, rubber</td><td>Sulfur compounds from too little oxygen. Mild struck-match reduction is a deliberate style in some white Burgundy.</td></tr>
<tr><td>Volatile acidity (VA)</td><td>Vinegar, nail-polish remover</td><td>Acetic acid bacteria and ethyl acetate. A little adds lift (Amarone, some Lebanon reds).</td></tr>
<tr><td>Brettanomyces</td><td>Barnyard, band-aid, sweaty saddle, smoked meat</td><td>Spoilage yeast in barrels. Debated: some love it in old Rhône.</td></tr>
<tr><td>Heat damage / out of condition</td><td>Cooked, stewed fruit, flat; pushed cork, seepage</td><td>Storage above about 80°F (27°C).</td></tr>
<tr><td>Excess SO₂</td><td>Burnt match, prickly nose</td><td>Heavy sulfiting; often blows off with air.</td></tr></table>
<h3>Not faults</h3>
<p>Tartrate crystals ("wine diamonds") are harmless potassium bitartrate. Sediment in an old red is normal and calls for decanting. Petrol in aged Riesling is a varietal character (TDN), prized by many.</p>
<h3>Handling a returned bottle</h3>
<p>Smell it yourself, discreetly, away from the table. If it is faulty, apologize, replace it, and do not argue. If it is sound but the guest dislikes it, most restaurants still replace it and pour the bottle by the glass. Either way, the guest should never feel foolish.</p>`,
floor:`<p>The CMS Advanced/Master grid lists minor faults on the nose: barnyard, nail-polish remover, caramel, nuts, dried fruit, struck match, balsamic. Note them only if present. They can be clues: struck match points to reductive Chardonnay; barnyard to old-school Rhône or Bordeaux.</p>`,
analyst:`<p>WSET Level 3 asks for the nose's condition as <b>clean or unclean</b>, and Learning Outcome 5 lists cork taint, oxidation, reduction, VA, Brett, out-of-condition and high SO₂. The CWE (SWE) has a separate faults exam where you must identify at least six.</p>`,
terms:[["TCA","2,4,6-trichloroanisole; the compound behind cork taint (wet cardboard)."],["Brettanomyces","Spoilage yeast giving barnyard, band-aid or smoky aromas."],["Volatile acidity","Acetic acid and ethyl acetate; vinegar or nail-polish remover."],["Tartrates","Harmless potassium bitartrate crystals."]],
quiz:[
[1,"A wine smells of wet cardboard and has muted fruit. The most likely fault is:","Cork taint (TCA)",["Brettanomyces","Volatile acidity","Reduction"],"TCA flattens fruit and smells of damp cardboard or basement."],
[1,"Barnyard and band-aid aromas point to:","Brettanomyces",["Oxidation","TCA","Heat damage"],"Brett is a spoilage yeast typically living in old barrels."],
[2,"Which aroma suggests reduction?","Struck match or rotten egg",["Nail-polish remover","Bruised apple","Wet cardboard"],"Reductive sulfur compounds form under low oxygen."],
[1,"Crystals at the bottom of a white wine bottle are usually:","Harmless tartrates",["A sign of oxidation","Mold","Cork taint"],"Potassium bitartrate drops out in the cold; it is not a fault."],
[2,"A guest returns a sound bottle because they don't like it. Best standard practice?","Replace it graciously, without argument",["Explain politely why the wine is correct","Decline, since the bottle is not faulty","Replace it but add a corkage charge"],"Hospitality first: replace it without debate. Many restaurants then pour the returned bottle by the glass."]
]});

// ---------- F2 VINEYARD ----------
L.push({id:"f4", unit:"F2", title:"The Vine and Its Year", mins:13,
summary:"Vitis vinifera, rootstocks, clones, and the annual growth cycle.",
body:`
<p>Nearly every wine you will be examined on comes from one species, <b>Vitis vinifera</b>, native to the Caucasus and Near East. Its thousands of varieties (Chardonnay, Nebbiolo, Assyrtiko) are like dog breeds: one species, wildly different traits. Other species matter too. American species such as <i>V. riparia</i>, <i>V. rupestris</i> and <i>V. berlandieri</i> resist phylloxera and are used as <b>rootstocks</b>. <i>V. labrusca</i> gives "foxy" grapes like Concord.</p>
<h3>Varieties, clones, crossings, hybrids</h3>
<ul><li><b>Clone:</b> a selection of one variety propagated by cuttings for a trait (smaller berries, earlier ripening). Pinot Noir has dozens: Dijon 115, 667, 777, Pommard.</li>
<li><b>Crossing:</b> two vinifera parents. Pinotage = Pinot Noir × Cinsault. Müller-Thurgau = Riesling × Madeleine Royale.</li>
<li><b>Hybrid:</b> vinifera × another species. Vidal Blanc (Canadian icewine), Seyval Blanc. Banned from most European quality wines.</li>
<li><b>Mutation:</b> Pinot Gris and Pinot Blanc are color mutations of Pinot Noir.</li></ul>
<h3>The growth cycle (Northern Hemisphere months)</h3>
<table class="t"><tr><th>Stage</th><th>When</th><th>Why it matters</th></tr>
<tr><td>Dormancy</td><td>Nov-Mar</td><td>Pruning happens now; winter freeze can kill vines below about -4°F (-20°C).</td></tr>
<tr><td>Budburst</td><td>Mar-Apr</td><td>Spring frost danger. Early-budding grapes (Chardonnay) are most at risk.</td></tr>
<tr><td>Flowering & fruit set</td><td>May-Jun</td><td>Cold or rain causes coulure (poor set) and millerandage (uneven berries). Yield is decided here.</td></tr>
<tr><td>Véraison</td><td>Jul-Aug</td><td>Berries soften and change color; sugar rises, acid falls.</td></tr>
<tr><td>Ripening & harvest</td><td>Aug-Oct</td><td>Picking decision balances sugar, acid, phenolic ripeness and weather risk.</td></tr></table>
<p>In the Southern Hemisphere add six months: harvest falls in February to April.</p>
<h3>What ripening does</h3>
<p>As grapes ripen, sugar rises (more potential alcohol), acid falls (especially malic acid), color and tannins mature, and green pyrazine flavors (bell pepper) fade. Pick early and you get freshness and low alcohol with a risk of green flavors; pick late and you get ripe fruit, softness and high alcohol with a risk of flab and jamminess. That single decision explains most of the difference between Sancerre and a warm-climate Sauvignon Blanc.</p>`,
floor:`<p>Guests ask about clones and rootstocks more than you'd think, especially in Oregon and California Pinot. Know Dijon clones and that "old vines" (vieilles vignes) has no legal definition in most countries.</p>`,
analyst:`<p>WSET Level 3 LO1 expects the growth cycle, the requirements of the vine (heat, sunlight, water, nutrients, CO₂), and how each stage's hazards affect yield and quality. A classic 25-mark question: "Explain how weather at flowering affects yield."</p>`,
terms:[["Vitis vinifera","The European wine grape species behind nearly all quality wine."],["Rootstock","Phylloxera-resistant American vine roots onto which vinifera is grafted."],["Crossing","Offspring of two vinifera varieties (e.g., Pinotage)."],["Hybrid","Vinifera crossed with another Vitis species (e.g., Vidal)."],["Véraison","Onset of ripening: berries soften and change color."],["Coulure","Poor fruit set after flowering, reducing yield."]],
quiz:[
[1,"Pinotage is a crossing of Pinot Noir and:","Cinsault",["Syrah","Gamay","Merlot"],"Created in South Africa in 1925 by Abraham Perold."],
[1,"Véraison is when:","Grapes soften and change color",["Buds swell and the first shoots appear","Flowers open and the berries set","Leaves fall and the vine goes dormant"],"Sugar accumulation accelerates from véraison."],
[2,"Why are American Vitis species used as rootstocks?","They resist phylloxera",["They ripen earlier","They yield more fruit","They add color"],"Phylloxera evolved alongside American vines, which tolerate root feeding."],
[2,"Poor fruit set caused by cold, wet weather at flowering is called:","Coulure",["Véraison","Millerandage only","Botrytis"],"Coulure reduces yield; millerandage is uneven berry size."],
[1,"A hybrid grape is:","A cross between vinifera and another Vitis species",["A clone of one variety selected for yield","A natural color mutation of Pinot Noir","A cross of two Vitis vinifera varieties"],"Vidal Blanc is a hybrid, used for Canadian icewine."],
[2,"As grapes ripen, which typically happens?","Sugar rises and acid falls",["Sugar and acid both rise","Pyrazines increase","Tannins become greener"],"Malic acid in particular is respired as the berry ripens."]
]});

L.push({id:"f5", unit:"F2", title:"Climate, Weather and Site", mins:14,
summary:"Why latitude, altitude, water and soil show up in the glass.",
body:`
<p>Climate is the long-term average; weather is this year. Climate decides which grapes can ripen in a place. Weather decides the vintage.</p>
<h3>Climate types</h3>
<ul><li><b>Cool</b> (growing season average under about 61°F / 16.5°C): tart fruit, high acid, lighter body, lower alcohol. Champagne, Mosel, Chablis, Marlborough.</li>
<li><b>Moderate</b> (about 61-65°F): ripe fruit with fresh acid. Bordeaux, Northern Rhône, Willamette.</li>
<li><b>Warm/hot</b> (above about 64°F): baked or jammy fruit, softer acid, more alcohol and body. Barossa, Southern Rhône, Paso Robles, Douro.</li></ul>
<p>Then by pattern: <b>maritime</b> (moderated by the ocean, small temperature swings, rain spread through the year: Bordeaux), <b>continental</b> (hot summers, cold winters, big swings, frost risk: Burgundy, Mendoza), <b>Mediterranean</b> (warm dry summers, mild wet winters: Southern Rhône, Tuscany, much of California).</p>
<h3>What modifies climate</h3>
<ul><li><b>Latitude:</b> most vineyards sit between 30° and 50° in both hemispheres.</li>
<li><b>Altitude:</b> temperature drops about 0.6°C per 100 m. That is how Salta (vineyards above 3,000 m) or Etna make fresh wine at hot latitudes.</li>
<li><b>Bodies of water:</b> moderate temperature, reflect light. Seneca Lake (Finger Lakes), the Gironde.</li>
<li><b>Ocean currents and fog:</b> the cold Humboldt and Benguela currents cool coastal Chile and South Africa; Pacific fog cools Sonoma Coast and Carneros.</li>
<li><b>Diurnal range:</b> the gap between day and night temperatures. Cold nights preserve acid and aroma. Mendoza, Paso Robles, Ribera del Duero.</li>
<li><b>Aspect and slope:</b> south-facing slopes in the north (north-facing in the south) catch more sun. Mosel's best sites are steep, south-facing slate.</li>
<li><b>Wind:</b> the mistral (Rhône), Zonda (Argentina), and Petaluma Wind Gap cool and dry vines.</li></ul>
<h3>Soil</h3>
<p>Soil matters mostly through <b>water and heat</b>, less through direct flavor. Gravel drains and stores heat (Médoc, Graves). Clay holds water and stays cool (Pomerol, which suits early-ripening Merlot). Limestone and chalk drain well yet hold water reserves (Champagne, Côte d'Or, Chablis's Kimmeridgian marl). Slate absorbs heat (Mosel). Low-fertility soils limit vigor so vines put energy into fruit, not leaves.</p>
<h3>Why it matters at the table</h3>
<p>When a guest asks why a Chablis tastes so different from a Napa Chardonnay, the honest answer is mostly climate, then winemaking. Same grape; one grows near the cool northern limit, the other in Mediterranean sunshine.</p>`,
floor:`<p>On the CMS grid, climate is part of your initial conclusion: cool, moderate or warm. The older Europe grid adds cool-moderate and moderate-warm. Read it from fruit condition and alcohol.</p>`,
analyst:`<p>WSET short answers often hinge on climate: "Explain how the climate of Mendoza affects the style of its Malbec" wants altitude, diurnal range, sunshine and dryness, each linked to a result in the glass (deep color, ripe black fruit, fresh acid).</p>`,
terms:[["Continental climate","Hot summers, cold winters, wide annual temperature range."],["Maritime climate","Ocean-moderated; mild, small temperature range, rain spread through the year."],["Diurnal range","Difference between day and night temperatures; cool nights preserve acid and aroma."],["Kimmeridgian","Ancient marl and limestone with fossil oyster shells; Chablis and Sancerre."]],
quiz:[
[1,"Which climate pattern has hot summers, cold winters and high frost risk?","Continental",["Maritime","Mediterranean","Tropical"],"Burgundy and Mendoza are continental."],
[2,"How does altitude affect temperature?","It drops about 0.6°C per 100 m",["It rises about 0.6°C per 100 m","It stays the same at any height","It drops about 5°C per 100 m"],"High-altitude vineyards like Salta stay fresh despite low latitude."],
[1,"Which cold ocean current cools coastal Chile?","Humboldt",["Benguela","Gulf Stream","Kuroshio"],"The Benguela cools South Africa's west coast."],
[2,"Why does Merlot suit Pomerol's clay soils?","Clay stays cool and holds water",["Clay warms fast and ripens late grapes","Clay adds tannin directly to the fruit","Clay keeps phylloxera out of the roots"],"Cabernet Sauvignon needs the warmer, free-draining gravels of the Médoc."],
[2,"Large diurnal range mainly helps wines retain:","Acidity and aroma",["Tannin and color","Residual sugar","Alcohol and body"],"Cool nights slow the loss of acid and volatile aromatics."],
[1,"Most of the world's vineyards lie between which latitudes?","30° and 50°",["10° and 20°","50° and 60°","0° and 15°"],"Both hemispheres."]
]});

L.push({id:"f6", unit:"F2", title:"Vineyard Management, Hazards and Farming", mins:14,
summary:"Training, pruning, canopy, yields, pests and diseases, and organic versus biodynamic.",
body:`
<h3>Training and pruning</h3>
<p><b>Training</b> is the vine's permanent shape. <b>Head training</b> (bush vines, gobelet) keeps vines low and free-standing, common in hot, dry places like the Southern Rhône, old-vine Barossa and Zinfandel in Lodi. <b>Cordon training</b> extends permanent arms along a wire. <b>Pruning</b> each winter sets the number of buds: <b>spur pruning</b> leaves short two-bud spurs on cordons; <b>cane pruning</b> (Guyot) lays down a new one-year cane each year. Burgundy uses Guyot; much of the New World uses spur-pruned cordons.</p>
<h3>Canopy management</h3>
<p><b>VSP</b> (vertical shoot positioning) trains shoots upward between wires, giving even sunlight on the fruit zone, good airflow (less disease) and easy mechanization. In hot sun, growers want more leaf shade to avoid sunburn; in cool regions, they pull leaves to expose fruit. That is why VSP is a WSET Level 3 favorite question.</p>
<h3>Yield</h3>
<p>Lower yields are often linked to concentration, but the relationship is not simple. Old vines naturally yield less. European appellations cap yields in hectoliters per hectare (hl/ha): Grand Cru Burgundy is around 35-37 hl/ha; generic table wine can exceed 100.</p>
<h3>Hazards</h3>
<ul><li><b>Spring frost:</b> kills new buds. Defenses: wind machines, sprinklers (ice insulates the bud), heaters, candles.</li>
<li><b>Hail:</b> shreds leaves and fruit; Mendoza growers use nets.</li>
<li><b>Drought and water stress:</b> mild stress improves concentration; severe stress halts ripening. Irrigation is banned in some EU appellations and normal in most of the New World.</li></ul>
<h3>Pests and diseases</h3>
<ul><li><b>Phylloxera:</b> an aphid from North America that eats vinifera roots. It destroyed most of Europe's vineyards from the 1860s. The fix is grafting onto American rootstock. Ungrafted vineyards survive in sandy soils (Colares), Chile (geographic isolation), parts of Australia (quarantine) and Washington.</li>
<li><b>Powdery mildew (oidium)</b> and <b>downy mildew (peronospora):</b> fungal, both from America; treated with sulfur and copper (Bordeaux mixture).</li>
<li><b>Botrytis cinerea:</b> grey rot in wet weather is a disaster; the same fungus in misty mornings and dry afternoons becomes <b>noble rot</b>, concentrating sugar for Sauternes, Tokaji and TBA.</li>
<li><b>Viruses:</b> leafroll and fanleaf reduce yield and ripening. No cure; replant with clean stock.</li></ul>
<h3>Farming philosophies</h3>
<ul><li><b>Sustainable:</b> broad, often certified (SIP, LODI RULES, Sustainable Winegrowing NZ) balancing environment and economics.</li>
<li><b>Organic:</b> no synthetic pesticides, herbicides or fertilizers; copper and sulfur allowed. Certified in the EU and by USDA (note: "made with organic grapes" vs "organic wine," which in the US also bans added sulfites).</li>
<li><b>Biodynamic:</b> Rudolf Steiner's 1924 lectures; organic plus preparations (cow-horn manure, 500/501) and a lunar calendar. Certified by Demeter and Biodyvin. Many top estates use it: Domaine Leroy, Zind-Humbrecht, Nicolas Joly.</li></ul>`,
floor:`<p>Guests ask "is this organic?" constantly. Know the US distinction between "organic wine" (no added sulfites) and "made with organic grapes," and that many biodynamic estates never put certification on the label.</p>`,
analyst:`<p>Sample WSET Level 3 short answer (4 marks): "Why do growers use VSP?" Model points: even sun exposure on fruit, airflow reduces fungal disease, easier mechanization of pruning and harvest, consistent ripening.</p>`,
terms:[["VSP","Vertical shoot positioning; shoots trained upward between wires."],["Guyot","Cane-pruning system laying down one or two canes each year."],["Phylloxera","Root-feeding aphid; controlled by grafting onto American rootstocks."],["Noble rot","Botrytis cinerea in favorable conditions, concentrating sugars."],["Biodynamic","Organic farming plus Steiner preparations and a cosmic calendar."]],
quiz:[
[1,"What is the main defense against phylloxera?","Grafting onto American rootstock",["Spraying copper and sulfur","Netting the vines in summer","Biodynamic preparations"],"No chemical cure exists; resistant roots are the answer."],
[2,"Which country is famous for largely ungrafted vineyards thanks to geographic isolation?","Chile",["France","Italy","Spain"],"Andes, desert, Pacific and Antarctic ice protect it."],
[2,"Why might a grower sprinkle water on vines during a spring frost?","Freezing water releases heat and the ice insulates the buds",["Running water washes the frost off the buds","Wet air raises humidity and stops ice forming","Cold water delays budburst until the frost passes"],"Latent heat of fusion protects the bud at 0°C."],
[1,"Noble rot is caused by:","Botrytis cinerea",["Powdery mildew","Phylloxera","Brettanomyces"],"Misty mornings and dry afternoons allow benign infection."],
[2,"Cane pruning (Guyot) differs from spur pruning because:","It lays down a new one-year cane each winter",["It leaves short spurs on a permanent arm","It is used only on free-standing bush vines","It is carried out in summer, not in winter"],"Burgundy is classic Guyot territory."],
[1,"Biodynamic farming is based on lectures by:","Rudolf Steiner",["Louis Pasteur","Émile Peynaud","Jules Guyot"],"Steiner lectured on agriculture in 1924."],
[3,"In the US, a wine labeled 'organic wine' (rather than 'made with organic grapes') must also:","Have no added sulfites",["Be biodynamic","Be aged in new oak","Be unfiltered"],"USDA organic wine prohibits added sulfites."]
]});
