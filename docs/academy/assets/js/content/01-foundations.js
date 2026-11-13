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
<li><b>1969 and 1977, the Master Sommelier.</b> The first MS exam was held in the UK in 1969. The Court of Master Sommeliers formed in 1977 to examine people who work the dining room. The first exam outside the UK was held in Monterey, California, in 1987, the Americas chapter grew out of it, and the Certified level was added in 2006 to bridge Introductory and Advanced.</li>
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
[1,"Which is true of the title 'sommelier' in the US?","It is not regulated by any government license",["It requires a state license","Only CMS graduates may legally use it","It requires WSET Level 3"],"The title is unregulated. Credentials are private and their value comes from industry respect."],
[2,"The first Master Sommelier exam was held in the UK in:","1969",["1953","1977","1987"],"The Court itself formed in 1977; Monterey hosted the first exam outside the UK in 1987."],
[3,"Who became the first woman Master of Wine, in 1970?","Sarah Morphew Stephen",["Jancis Robinson","Serena Sutcliffe","Mary Ewing-Mulligan"],"Seventeen years after the first exam."],
[3,"How many of the 30 candidates passed the full Master Sommelier exam in 2026?","4",["9","14","21"],"Roughly one in eight."],
[2,"The Institute of Masters of Wine was founded in:","1955",["1933","1969","1977"],"Two years after the first exam."],
[3,"The first Master Sommelier exam outside the UK was held in 1987 in:","Monterey, California",["New York City, New York","Napa, California","Toronto, Ontario"],"The Americas chapter grew out of it."]
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
<p>WSET Level 3 runs about $1,135 to $1,780 at one large US provider and the Diploma about $7,800 with registration. CMS Introductory online is $649 plus an optional wine kit; each MS exam section is reported near $1,000. The podcast host Elizabeth Schneider, herself a CMS Certified Sommelier and CSW, has called the top titles closer to "a small, private club" than a professional certification. The sensible plan: study everything here for free, then pay for one exam only if a job asks for the paper.</p>
<h3>Which track for which job</h3>
<table class="t"><tr><th>If you want to</th><th>Start with</th><th>Why</th></tr>
<tr><td>Work a restaurant floor</td><td>Floor</td><td>Service, speed and selling are tested directly</td></tr>
<tr><td>Run a beverage program</td><td>Floor, then the business lessons</td><td>You will need list math and staff training as well</td></tr>
<tr><td>Buy for a shop, importer or supermarket</td><td>Analyst</td><td>Quality judgment and written reasoning are the job</td></tr>
<tr><td>Sell for a distributor</td><td>Analyst</td><td>Buyers respect it and it covers every category</td></tr>
<tr><td>Write or teach</td><td>Analyst</td><td>It trains explanation</td></tr>
<tr><td>Learn for pleasure</td><td>Either; Analyst is gentler on nerves</td><td>No timed spoken exams</td></tr></table>
<h3>How much time each level takes</h3>
<ul><li><b>WSET Level 2:</b> about 28 hours in total.</li>
<li><b>WSET Level 3:</b> about 84 hours, of which 30 are taught. Most people need more for the tasting.</li>
<li><b>WSET Diploma:</b> at least 500 hours, usually spread over two or three years.</li>
<li><b>CMS:</b> the Court publishes no hour counts. Candidates commonly spend a year or more between Certified and Advanced, and several years on the Master Sommelier Diploma.</li>
<li>The lessons here take about twenty hours to read once. Passing an exam takes many times that in recall and tasting practice.</li></ul>
<h3>Credentials beyond wine</h3>
<ul><li><b>Beer:</b> the Cicerone program, from Certified Beer Server to Master Cicerone.</li>
<li><b>Spirits:</b> WSET Spirits Levels 1 to 3, and the Certified Specialist of Spirits (CSS) from the Society of Wine Educators.</li>
<li><b>Sake:</b> WSET Sake Levels 1 and 3, and the Kikisake-shi qualification from Japan.</li>
<li><b>Service at world level:</b> the Association de la Sommellerie Internationale (ASI) offers its own diploma and runs the Best Sommelier of the World competition.</li></ul>
<h3>What no credential gives you</h3>
<ul><li><b>Hours on a real floor or shop counter.</b> Employers hire experience first and letters second.</li>
<li><b>A palate.</b> Only tasting builds it.</li>
<li><b>Hospitality.</b> Reading a table cannot be examined on paper.</li></ul>
<h3>Using both tracks here</h3>
<ul><li>Every lesson has a Floor lens and an Analyst lens. Read both, whichever track you are on.</li>
<li>You can switch tracks at any time. Lessons you have passed stay passed; only the exams differ.</li>
<li>A sound order if you have no deadline: Analyst Level 2 for the foundations, Floor Introductory and Certified for service and deduction, then whichever advanced path suits your work.</li></ul>
<h3>Signs you picked the wrong track</h3>
<ul><li>You dread the timed spoken tasting but enjoy writing notes: move to Analyst.</li>
<li>Written answers bore you and you want to be opening bottles: move to Floor.</li>
<li>You are studying for a title no employer near you asks for: stop and ask what they do want.</li></ul>`,
floor:`<p>Floor track seals: <b>Introductory</b> (70 MCQ, 45 min, 60%), <b>Certified</b> (theory 45 Q in 38 min, 4 wines in 45 min, service practical; 60% each), <b>Advanced</b> (6 wines in 25 min aloud, theory, service and business; 60% each), <b>Master</b> (all at 75%).</p>`,
analyst:`<p>Analyst track seals: <b>Level 2</b> (50 MCQ, 60 min, 55%), <b>Level 3</b> (50 MCQ + four 25-mark short answers + 2 wines blind by SAT; 55% in each part), <b>Diploma</b> (D1-D6, essays and 12-wine papers, 55%), <b>MW capstone</b>.</p>`,
terms:[["CSW","Certified Specialist of Wine (Society of Wine Educators). 100 MCQ in 60 min, 75% to pass."],["Wine Scholar Guild","Single-country deep-dive programs; 100 MCQ, 75% to pass, Honors at 85+."],["Cicerone","Beer certification program, from Certified Beer Server to Master Cicerone."],["ASI","Association de la Sommellerie Internationale; runs the Best Sommelier of the World competition."],["CSS","Certified Specialist of Spirits, from the Society of Wine Educators."],["Kikisake-shi","Japanese sake sommelier qualification."]],
quiz:[
[1,"Which program's blind tasting puts the most weight on naming the grape, place and vintage?","CMS",["WSET Level 3","CSW","WSET Level 2"],"WSET Level 3 grades the description and quality call; CMS grades your identification."],
[1,"The CSW exam is:","100 multiple-choice questions in one hour, 75% to pass",["A 6-wine verbal blind tasting in 25 minutes","Four 25-mark written answers in two hours","50 multiple-choice questions plus a service practical"],"Everything on the CSW comes from the annual study guide."],
[2,"Which credential is the usual stepping stone to the Master of Wine?","WSET Level 4 Diploma",["CMS Introductory","CSW","French Wine Scholar"],"The Diploma's analytical, written style is closest to the MW."],
[1,"WSET Level 2 includes a blind tasting exam.","False: it is a 50-question multiple-choice paper only",["True: two wines assessed in 30 minutes by SAT","True: one wine written up as a full tasting note","False: it is four written short answers only"],"Tasting is taught at Level 2 but not examined until Level 3."],
[1,"Which track suits someone who wants to work a restaurant floor?","Floor (CMS)",["Analyst (WSET)","Wine Scholar Guild","Master of Wine"],"The Court examines service, selling and spoken blind tasting."],
[2,"The Wine Scholar Guild is best known for:","Deep single-country programs",["A service practical","A 12-wine blind tasting","A spirits diploma"],"French, Italian, Spanish and German Wine Scholar: 100 questions, 75% to pass."],
[2,"The Master of Wine research paper runs to about:","10,000 words",["3,000 words","20,000 words","40,000 words"],"The Diploma's D6 research assignment is 3,000 words."],
[2,"The Cicerone program certifies expertise in:","Beer",["Sake","Spirits","Coffee"],"Its top level is Master Cicerone."],
[2,"Which body runs the Best Sommelier of the World competition?","ASI",["WSET","IMW","SWE"],"The Association de la Sommellerie Internationale."],
[2,"A wine buyer for a supermarket chain is best served by which track?","Analyst",["Floor","Cicerone","Kikisake-shi"],"Quality judgment and written reasoning are the daily work."],
[2,"WSET's stated study time for Level 3 is about:","84 hours",["28 hours","54 hours","150 hours"],"Level 2 is 28 hours and the Diploma at least 500."],
[2,"CSS is a credential in:","Spirits",["Sake","Service","Sparkling wine"],"The Certified Specialist of Spirits, from the Society of Wine Educators."],
[2,"What do employers generally weigh before any credential?","Real experience on a floor or in a shop",["The number of seals earned online","The price paid for the course","The age of the candidate"],"A title supports experience; it does not replace it."]
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
<ul><li>Taste at the same time of day, with no fragrance, gum or coffee.</li><li>Pour about 1.5 oz (45 ml) in an ISO or universal glass.</li><li>Say your notes aloud, in grid order, every time. The Advanced and Master tasting exams are spoken.</li><li>Spit. A Certified exam is four wines; a practice session can be twelve.</li></ul>
<h3>How smell works, and how to use it</h3>
<p>You smell twice. <b>Orthonasal</b> smell is through the nostrils, glass to nose. <b>Retronasal</b> smell happens when you swallow or breathe out with wine in your mouth and aroma travels up the back of the throat. Most of what people call "taste" is retronasal smell: the tongue itself reads only sweet, sour, salty, bitter and umami.</p>
<ul><li><b>Swirl</b> to coat the glass and release aroma, then take short sniffs. The nose tires of a smell within seconds, so three short sniffs tell you more than one long one.</li>
<li><b>Reset</b> a tired nose by smelling your own sleeve or a glass of water.</li>
<li><b>Draw a little air</b> through the wine in your mouth. It looks odd and it works: it drives aroma to the back of the nose.</li>
<li><b>Your first impression</b> is the most reliable one. Write it down before you start to argue with it.</li></ul>
<h3>What sight tells you</h3>
<table class="t"><tr><th>You see</th><th>It suggests</th></tr>
<tr><td>Green glints in a white</td><td>Youth; often a cool climate</td></tr>
<tr><td>Deep gold in a white</td><td>Age, oak, botrytis or a warm climate</td></tr>
<tr><td>Purple rim in a red</td><td>Youth. Very strong in Malbec and young Syrah</td></tr>
<tr><td>Orange or brick rim</td><td>Age; in a young wine, Nebbiolo or Sangiovese</td></tr>
<tr><td>Tears stained with color</td><td>Thick skins and high extract: Syrah, Malbec, Petite Sirah</td></tr>
<tr><td>Thick, slow tears</td><td>High alcohol or sugar</td></tr>
<tr><td>Tiny bubbles in a still white</td><td>Bottled young and cold with a little CO₂: Vinho Verde, young Riesling, Muscadet</td></tr>
<tr><td>Sediment</td><td>Bottle age or an unfiltered wine</td></tr></table>
<h3>A vocabulary by family</h3>
<p>Run the families in the same order every time. For each, ask first "is it there?" and only then "which one?"</p>
<table class="t"><tr><th>Family</th><th>Words to reach for</th></tr>
<tr><td>Fruit (whites)</td><td>Citrus (lemon, lime, grapefruit); tree (apple, pear); stone (peach, apricot); tropical (pineapple, mango, passion fruit); melon</td></tr>
<tr><td>Fruit (reds)</td><td>Red (cherry, raspberry, cranberry, strawberry); black (blackberry, cassis, plum); blue (blueberry); dried (fig, raisin, prune)</td></tr>
<tr><td>Fruit condition</td><td>Tart, just ripe, ripe, jammy, baked, dried, stewed</td></tr>
<tr><td>Floral and herbal</td><td>Rose, violet, orange blossom; mint, thyme, sage, cut grass, tomato leaf, green pepper</td></tr>
<tr><td>Spice</td><td>Black or white pepper, licorice, clove, cinnamon</td></tr>
<tr><td>Earth</td><td>Forest floor, mushroom, wet leaves, potting soil, barnyard, truffle</td></tr>
<tr><td>Mineral</td><td>Wet stone, chalk, flint, slate, saline</td></tr>
<tr><td>Oak</td><td>Vanilla, toast, smoke, clove, coconut, dill, coffee</td></tr></table>
<h3>The two systems side by side</h3>
<table class="t"><tr><th></th><th>Court grid (Floor)</th><th>WSET SAT (Analyst)</th></tr>
<tr><td>Purpose</td><td>Deduce what the wine is</td><td>Describe the wine and judge its quality</td></tr>
<tr><td>Form</td><td>Written at Certified; spoken at Advanced and Master</td><td>Always written</td></tr>
<tr><td>Scales</td><td>Low to high, with plus and minus steps</td><td>Three steps at Level 2, five at Level 3</td></tr>
<tr><td>Ends with</td><td>Grape, country, region, quality level, vintage</td><td>Quality level with reasons, and readiness to drink</td></tr></table>
<p>The skills overlap almost entirely. A taster trained in one can learn the other's vocabulary in a week.</p>
<h3>Setting up a tasting</h3>
<ul><li>White surface, daylight or neutral light, a spit cup, water, plain crackers.</li>
<li>Order: sparkling, then light whites, full whites, light reds, full reds, sweet, fortified. Dry before sweet; light before heavy.</li>
<li>Pour the same amount in the same glass shape every time, so that depth of color means something.</li>
<li>Cover the bottles and number them. Knowing even the price changes what you taste.</li></ul>
<h3>Five habits that hold beginners back</h3>
<ol><li>Naming the grape first and then finding evidence for it.</li>
<li>Confusing ripe fruit with sweetness.</li>
<li>Describing only fruit and skipping earth, mineral and oak.</li>
<li>Sitting on "medium" for every structural call.</li>
<li>Tasting without writing. Notes you cannot reread teach you nothing.</li></ol>`,
floor:`<p>CMS rewards <b>speed and order</b>. At Certified you write a checkbox grid for 4 wines in 45 minutes, about 11 minutes each. At Advanced and Master you speak 6 wines in 25 minutes, about 4 minutes each. Every grid line is worth a point and nothing is deducted for a wrong answer, so never leave a line blank. If something is absent (no oak, no earth), you must say "no".</p>`,
analyst:`<p>WSET rewards <b>precision and justification</b>. The SAT uses calibrated scales (light, medium(-), medium, medium(+), pronounced) and asks you to judge quality with <b>BLIC</b>: Balance, Length, Intensity, Complexity. At Level 3 you do not have to name the wine at all.</p>`,
terms:[["Rim variation","Color difference between the core and edge of a red; a broad, bricking rim suggests age."],["Fruit condition","Tart, ripe, baked, jammy, dried. The best single clue to climate."],["Initial conclusion","Possible grapes, climate, possible countries and an age range, before committing."],["Vinous","CMS term for a nose that has lost primary fruit and shows age-derived character."],["Retronasal","Smelling through the back of the throat while wine is in the mouth."],["Orthonasal","Smelling through the nostrils."],["Staining","Color left in the tears of a red wine; a sign of thick skins and extract."],["Aroma family","A group of related smells (fruit, floral, spice, earth, mineral, oak) checked in a fixed order."]],
quiz:[
[1,"Which observation is the strongest clue to climate?","The condition of the fruit",["The width and color of the rim","The speed and thickness of the tears","The presence of a few bubbles of gas"],"Tart, ripe, baked or jammy fruit tracks how much heat the grapes saw; confirm it with alcohol and acidity."],
[1,"As a red wine ages, its hue generally moves:","From purple to ruby to garnet to brick",["From garnet to ruby to purple to black","From brick to garnet to ruby to purple","From ruby to purple and then to brown"],"Pigments polymerize and drop out; the wine browns, starting at the rim."],
[2,"On a CMS grid, how are wrong answers penalized?","They are not: each correct line earns a point",["Each wrong line costs one point","A wrong line cancels a correct one","Two wrong lines fail the whole wine"],"Always tick something on every line, including an explicit 'no' for absent elements."],
[2,"A red smells of ripe cherry but has high acid and very grippy tannin. Which is the better initial grape call?","Nebbiolo or Sangiovese",["Grenache or Zinfandel","Merlot or Malbec","Gamay or Dolcetto"],"Structure outranks aroma. High acid with high tannin points to the Italian pair."],
[1,"What does BLIC stand for in WSET quality assessment?","Balance, Length, Intensity, Complexity",["Body, Length, Intensity, Color","Balance, Liveliness, Intensity, Clarity","Body, Lees, Intensity, Complexity"],"Each factor is evidence for the quality call."],
[2,"Aroma that reaches the nose from inside the mouth is called:","Retronasal",["Orthonasal","Volatile","Tertiary"],"Most of what we call taste is retronasal smell."],
[2,"Why take several short sniffs rather than one long one?","The nose tires within seconds",["Long sniffs warm the wine","Alcohol burns the nostrils","It keeps the glass still"],"Smell adapts quickly; reset with water or your own sleeve."],
[2,"Color-stained tears on the glass suggest:","Thick skins and high extract",["A wine that is faulty","High acidity and low alcohol","Great age in the bottle"],"Typical of Syrah, Malbec and Petite Sirah."],
[2,"In a mixed tasting, which order is correct?","Light whites, full reds, then sweet",["Sweet first, then dry whites","Full reds, then light whites","Fortified first to wake the palate"],"Dry before sweet and light before heavy."],
[2,"An orange rim on a young, pale red most suggests:","Nebbiolo",["Malbec","Syrah","Zinfandel"],"Nebbiolo and Sangiovese show orange early; Malbec and Syrah have purple rims."],
[2,"A beginner's most damaging habit is:","Naming the grape first",["Spitting every wine","Writing notes","Smelling before tasting"],"Collect all the evidence in order, then conclude. Otherwise you only find what you expect."]
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
<p>Alcohol reads as warmth in the throat and chest, plus weight and a faint sweetness. Under about 11% ABV is low (Mosel Kabinett, Moscato d'Asti); 11 to about 13.9% medium; 14% and above high (Zinfandel, Châteauneuf-du-Pape, Amarone). Warm climates ripen more sugar and so more alcohol.</p>
<h3>Body</h3>
<p>Body is the overall weight on the palate: alcohol, sugar, extract and glycerol together. Think skim milk, whole milk, cream.</p>
<h3>How structure becomes a clue</h3>
<ul>
<li>High acid + low alcohol + RS in a white: German Riesling or Vouvray.</li>
<li>Low acid + high alcohol + oily texture + bitter finish: Gewürztraminer or Viognier.</li>
<li>Pale red + high acid + high tannin: Nebbiolo.</li>
<li>Pale red + high alcohol + low acid + soft tannin: Grenache.</li>
<li>Deep red + high tannin + medium-plus acid + green note: Cabernet Sauvignon or Cabernet Franc.</li>
</ul>
<h3>Bitterness, texture and the finish</h3>
<p>Three more things belong to structure, and each is a clue.</p>
<ul><li><b>Phenolic bitterness</b> is a light bitter grip at the end of some white wines, like grapefruit pith or almond skin. It comes from skins, and it marks Gewürztraminer, Pinot Gris, Viognier, Torrontés, Grüner Veltliner and any white made with skin contact. It is not tannin and it is not a fault.</li>
<li><b>Texture</b> is how the wine feels apart from weight: oily (Gewürztraminer, Viognier), waxy (Sémillon, Chenin), creamy (lees and malolactic conversion), chalky or grippy (young Nebbiolo), prickly (a trace of CO₂ in young Riesling or Vinho Verde).</li>
<li><b>Finish</b>, or length, is how long the pleasant flavors last after you swallow or spit. Count the seconds: under about five is short, five to ten is medium, longer is long. Length is the single best indicator of quality, because it cannot be faked by ripeness or oak.</li></ul>
<h3>How the elements fool each other</h3>
<table class="t"><tr><th>What you taste</th><th>What may really be happening</th></tr>
<tr><td>"It's sweet"</td><td>Often ripe fruit, vanilla from oak or high alcohol in a dry wine. Pinch your nose: real sugar is still there on the tongue; fruit is not.</td></tr>
<tr><td>"It's dry"</td><td>High acid can hide 10 to 40 g/L of sugar, as in Champagne Brut or Mosel Kabinett.</td></tr>
<tr><td>"It's very tannic"</td><td>High acid makes tannin feel harder; so does serving the wine cold.</td></tr>
<tr><td>"It's full-bodied"</td><td>Sugar and alcohol both add weight. A sweet wine at 8% can feel fuller than a dry one at 12%.</td></tr>
<tr><td>"It's soft"</td><td>Low acid, a little sugar or ripe tannin: check which before you conclude "warm climate".</td></tr></table>
<h3>The numbers behind the words</h3>
<table class="t"><tr><th>Element</th><th>Useful benchmarks</th></tr>
<tr><td>Sweetness</td><td>The EU calls a still wine dry up to 4 g/L (up to 9 if the acid is high). Off-dry runs to about 12, medium to about 45, sweet above 45. Sauternes holds 120 to 150; Pedro Ximénez over 400.</td></tr>
<tr><td>Acidity</td><td>Total acidity of about 5 to 9 g/L; pH from about 2.9 (Champagne base, Mosel) to 3.9 (ripe warm-climate reds). Lower pH tastes sharper.</td></tr>
<tr><td>Alcohol (WSET, still)</td><td>Low under 11%; medium 11 to 13.9%; high 14% and above.</td></tr>
<tr><td>Alcohol (WSET, fortified)</td><td>Low 15 to 16.4% (Fino); medium 16.5 to 18.4%; high 18.5% and above (Port).</td></tr></table>
<h3>A six-bottle calibration set</h3>
<p>Buy these once and taste them side by side: they pin down both ends of every scale.</p>
<ul><li><b>Mosel Riesling Kabinett:</b> low alcohol, high acid, real sugar.</li>
<li><b>Muscadet or Chablis:</b> high acid, bone dry, light body.</li>
<li><b>Alsace Gewurztraminer:</b> low acid, high alcohol, oily, bitter finish.</li>
<li><b>Beaujolais:</b> low tannin, high acid, light body.</li>
<li><b>Barolo or Madiran:</b> high tannin and high acid together.</li>
<li><b>Zinfandel or Amarone:</b> high alcohol, full body, soft acid.</li></ul>`,
floor:`<p>On the 2024 CMS Advanced/Master format, acid, alcohol and body use five-step scales. Whites get a line for <b>phenolic bitterness</b> (yes/no). Reds get tannin volume <i>and</i> texture. A <b>texture</b> line (lean, crisp, creamy, waxy, oily) helps separate Chablis from Meursault and Pinot Grigio from Gewürztraminer.</p>`,
analyst:`<p>WSET Level 3 scales: acidity and tannin run low, medium(-), medium, medium(+), high. Alcohol is low/medium/high (under 11%, 11-13.9%, 14%+ for still wine). Body is light to full on five steps. Fortified wines have their own alcohol scale.</p>`,
terms:[["Residual sugar (RS)","Unfermented grape sugar remaining in the finished wine, measured in g/L."],["Phenolic bitterness","A bitter, grippy finish in whites from skin contact or certain grapes (Gewürztraminer, Pinot Grigio, Torrontés)."],["Body","The perceived weight of a wine, from alcohol, sugar, glycerol and extract."],["Finish","How long pleasant flavors last after swallowing; the best single sign of quality."],["Texture","How a wine feels apart from weight: oily, waxy, creamy, chalky, prickly."],["pH","Measure of acid strength; wine runs from about 2.9 to 3.9, and lower tastes sharper."]],
quiz:[
[1,"Which structural element is felt as drying and gripping on the gums?","Tannin",["Acidity","Alcohol","Residual sugar"],"Tannins bind with saliva proteins, removing lubrication."],
[1,"What makes a sweet wine taste less sweet than its sugar level suggests?","High acidity",["High tannin","Low alcohol","New oak"],"Acid balances sugar; this is why Mosel Riesling can carry 40+ g/L and taste off-dry."],
[2,"A white wine with low acid, high alcohol, oily texture and a bitter finish most likely is:","Gewürztraminer",["Riesling","Sauvignon Blanc","Albariño"],"This is the classic Gewürztraminer (or Viognier) structure."],
[2,"On the WSET Level 3 SAT, what alcohol level is classed as 'high' for still wine?","14% abv and above",["12% abv and above","13% abv and above","15% abv and above"],"Low is under 11%, medium 11-13.9%, high 14%+."],
[1,"Steeping black tea for 10 minutes is a classic way to calibrate:","High tannin",["High acid","High alcohol","Sweetness"],"Over-steeped tea is rich in tannins, similar to young Nebbiolo or Cabernet."],
[2,"Which sensation shows a wine's acidity?","Mouth-watering along the sides of the tongue",["Drying on the gums","Warmth at the back of the throat","Weight in the middle of the mouth"],"Drying is tannin, warmth is alcohol and weight is body."],
[2,"High alcohol is felt mainly as:","Warmth at the back of the throat",["Drying on the gums","Mouth-watering","A prickle on the tongue"],"Alcohol also adds weight and a hint of sweetness; above about 14% it can burn."],
[2,"A light bitter grip at the end of a Gewürztraminer or Pinot Gris is called:","Phenolic bitterness",["Tannin","Volatile acidity","Reduction"],"It comes from the skins of some white grapes and is a clue, not a fault."],
[2,"Which is the most reliable sign of quality on the palate?","A long finish",["Deep color","High alcohol","New oak flavor"],"Ripeness and oak can be bought. Length cannot."],
[3,"On the WSET scale, a fortified wine is 'high' in alcohol at:","18.5% and above",["15% and above","16.5% and above","22% and above"],"Fortified: low 15 to 16.4%, medium 16.5 to 18.4%, high 18.5% and above."],
[2,"A dry wine that seems sweet most often owes it to:","Ripe fruit, oak or alcohol",["Hidden residual sugar","High acidity","High tannin"],"Pinch your nose: fruit and vanilla vanish, real sugar stays on the tongue."]
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
<p>Smell it yourself, discreetly, away from the table. If it is faulty, apologize, replace it, and do not argue. If it is sound but the guest dislikes it, most restaurants still replace it and pour the bottle by the glass. Either way, the guest should never feel foolish.</p>
<h3>The faults that catch out good tasters</h3>
<table class="t"><tr><th>Fault</th><th>How it shows</th><th>What is going on</th></tr>
<tr><td>Light strike</td><td>Cabbage, wet wool, struck match in a pale wine from a clear bottle</td><td>Ultraviolet light reacts with riboflavin and sulfur amino acids. Minutes in bright sun can do it to rosé or Champagne.</td></tr>
<tr><td>Mousiness</td><td>Nothing on the nose; a stale, cracker or mouse-cage taste seconds after swallowing</td><td>Compounds from lactic bacteria or Brettanomyces in low-sulfite, high-pH wines. Not everyone can perceive it.</td></tr>
<tr><td>Smoke taint</td><td>Ash, campfire, burnt rubber, a drying finish</td><td>Volatile phenols absorbed by grapes during wildfires, bound to sugars and released later.</td></tr>
<tr><td>Premature oxidation</td><td>A young white that is deep gold, flat and sherry-like</td><td>Too little protection from oxygen; notorious in white Burgundy of about 1995 to 2005.</td></tr>
<tr><td>Refermentation</td><td>Fizz and haze in a wine meant to be still</td><td>Yeast or bacteria active in the bottle, often with leftover sugar.</td></tr>
<tr><td>Geosmin</td><td>Beetroot, damp earth</td><td>Mould on damaged grapes.</td></tr></table>
<h3>Fault or style?</h3>
<p>Many faults are a matter of degree. A whiff of struck match in white Burgundy, a little volatile acidity in Amarone, a trace of Brett in old Rhône and the bruised-apple tang of Fino are all prized by some drinkers. The professional test is whether the character <b>dominates the wine and hides the fruit</b>. If it does, call it a fault. If a guest simply dislikes a sound wine, replace it anyway and say nothing about who was right.</p>
<h3>At the table, step by step</h3>
<ol><li>Thank the guest for telling you and take the glass and bottle from the table.</li>
<li>Smell and taste it away from the guests. Cork taint often grows worse with air, so trust a second sniff.</li>
<li>Faulty: apologize, bring a fresh bottle with a clean glass, and let the host taste again. Keep the bad bottle for your supplier, who will normally credit it.</li>
<li>Sound: offer a different wine, and pour the returned bottle by the glass.</li></ol>`,
floor:`<p>The CMS Advanced/Master grid lists minor faults on the nose: barnyard, nail-polish remover, caramel, nuts, dried fruit, struck match, balsamic. Note them only if present. They can be clues: struck match points to reductive Chardonnay; barnyard to old-school Rhône or Bordeaux.</p>`,
analyst:`<p>WSET Level 3 asks for the nose's condition as <b>clean or unclean</b>, and Learning Outcome 5 lists cork taint, oxidation, reduction, VA, Brett, out-of-condition and high SO₂. The CWE (SWE) has a separate faults exam where you must identify at least six.</p>`,
terms:[["TCA","2,4,6-trichloroanisole; the compound behind cork taint (wet cardboard)."],["Brettanomyces","Spoilage yeast giving barnyard, band-aid or smoky aromas."],["Volatile acidity","Acetic acid and ethyl acetate; vinegar or nail-polish remover."],["Tartrates","Harmless potassium bitartrate crystals."]],
quiz:[
[1,"A wine smells of wet cardboard and has muted fruit. The most likely fault is:","Cork taint (TCA)",["Brettanomyces","Volatile acidity","Reduction"],"TCA flattens fruit and smells of damp cardboard or basement."],
[1,"Barnyard and band-aid aromas point to:","Brettanomyces",["Oxidation","TCA","Heat damage"],"Brett is a spoilage yeast typically living in old barrels."],
[2,"Which aroma suggests reduction?","Struck match or rotten egg",["Nail-polish remover","Bruised apple","Wet cardboard"],"Reductive sulfur compounds form under low oxygen."],
[1,"Crystals at the bottom of a white wine bottle are usually:","Harmless tartrates",["A sign of oxidation","Mold","Cork taint"],"Potassium bitartrate drops out in the cold; it is not a fault."],
[2,"A guest returns a sound bottle because they don't like it. Best standard practice?","Replace it graciously, without argument",["Explain politely why the wine is correct","Decline, since the bottle is not faulty","Replace it but add a corkage charge"],"Hospitality first: replace it without debate. Many restaurants then pour the returned bottle by the glass."],
[2,"A pale rosé in a clear bottle smells of cabbage and wet wool after an hour in the sun. The fault is:","Light strike",["Cork taint","Volatile acidity","Brettanomyces"],"Ultraviolet light forms sulfur compounds; clear glass gives no protection."],
[3,"Which fault is tasted on the finish but often cannot be smelled?","Mousiness",["Cork taint","Reduction","Volatile acidity"],"It appears seconds after swallowing, mostly in low-sulfite, high-pH wines."],
[2,"A sommelier keeps a corked bottle because:","The supplier will normally credit it",["It can be poured by the glass","Air will cure it overnight","The cork can be reused"],"Corked wine can't be served. Returned but sound bottles are the ones poured by the glass."],
[2,"A trace of volatile acidity in Amarone is best described as:","Part of the style, unless it dominates",["A fault at any level, always","A sure sign of cork taint","Proof of heat damage in transit"],"Many faults are a matter of degree; the test is whether they hide the fruit."]
]});

// ---------- F2 VINEYARD ----------
L.push({id:"f4", unit:"F2", title:"The Vine and Its Year", mins:13,
summary:"What the vine is, how it is copied and changed, how it builds a crop through the year, and why ripeness is several things that do not arrive together.",
body:`
<p>Wine is made once a year from a crop that cannot be rushed, stored or bought in. Everything a winemaker does afterward works with what the vine delivered on the day of picking, and what it delivered was decided by a plant following its own rules through twelve months of weather. This chapter is about those rules: what the vine is, how it is copied and changed, how it builds a crop, and why the same plant gives thin green wine in one place and jam in another. Most of what later chapters say about climate, regions and vintages is this chapter applied.</p>

<h3>One species, and the others that hold it up</h3>
<p>The genus <i>Vitis</i> contains some sixty to eighty species, scattered across the temperate Northern Hemisphere. Nearly every wine you will be examined on comes from one of them, <b><i>Vitis vinifera</i></b>, native to the Caucasus and the Near East. Its thousands of varieties, from Chardonnay to Nebbiolo to Assyrtiko, are like dog breeds: a single species selected over millennia into forms that barely resemble one another.</p>
<p>Vinifera earned its place for two reasons. Its berries accumulate more sugar than those of any other species, enough to make a stable wine without help, and its flavors are fine and varied. The American species were never selected for wine and it shows. <i>Vitis labrusca</i>, the species behind Concord, carries a pungent compound that tasters call "foxy", the smell of grape jelly and grape soda, which most people find pleasant in juice and coarse in wine.</p>
<p>What the American species have is resistance. They evolved alongside phylloxera, the root-feeding insect that destroyed Europe's vineyards in the nineteenth century, and alongside the mildews, and they survive all three. So the modern vine is a composite of two plants. The top, called the scion, is vinifera and decides the fruit. The bottom, the <b>rootstock</b>, is an American species or more often a cross between two of them, and decides how the plant deals with the soil. Three species supply nearly all rootstocks, and each brings the habits of its home.</p>
<ul><li><b><i>Vitis riparia</i></b>, the riverbank grape, grows in cool, damp, fertile ground. It roots shallowly, gives a small vine and ripens its fruit early. It suits fertile, moist soils where a grower wants to restrain growth.</li>
<li><b><i>Vitis rupestris</i></b>, the rock grape, grows in dry, stony creek beds. It roots deeply and vigorously and tolerates drought.</li>
<li><b><i>Vitis berlandieri</i></b> comes from the limestone hills of Texas. It is the only one of the three that tolerates chalk, but its cuttings root so poorly that it is almost always used as a parent in a cross.</li></ul>
<p>That last point solved the great problem of replanting after phylloxera. The first American rootstocks sickened in the chalk of Champagne and Cognac and the limestone of Burgundy. At high soil pH iron becomes chemically unavailable, the vine cannot make chlorophyll, and its leaves turn yellow, a condition called chlorosis. Crosses with berlandieri fixed it. Rootstocks carry code names from the nurseries that bred them, and a few are worth recognizing: 3309C and 101-14 (riparia crossed with rupestris, moderate vigor, for deep soils without much lime), SO4 and 5BB (berlandieri crossed with riparia, for lime and moisture), 110R, 140Ru and 1103P (berlandieri crossed with rupestris, for drought), and 41B, a cross with vinifera itself that tolerates the chalk of Champagne.</p>
<p>A grower choosing a rootstock is therefore choosing resistance to phylloxera and to soil worms called nematodes, tolerance of lime, drought, wet or salt, and above all vigor, meaning how big a plant the roots will build. The choice is made once and lasts for decades. California learned the cost of a bad one. Through the 1960s and 1970s most of Napa and Sonoma was planted on a rootstock called AXR1, which was productive and easy to grow and had one vinifera parent. European researchers had long warned that its resistance was incomplete. In the 1980s a strain of phylloxera began killing it, and the region was replanted over the following fifteen years at a cost usually put at a billion dollars or more. The replanting is one reason Napa's vineyards are as well matched to their sites as they now are, but it was not a lesson anyone chose.</p>

<h3>What a variety is</h3>
<p>A grape seed does not grow into the variety it came from. Vines are genetically mixed, and every seed is a new individual, as different from its parents as a child from its mother and father. Plant a thousand Cabernet Sauvignon seeds and you get a thousand new varieties, nearly all of them worse. So vines are not grown from seed. They are propagated by <b>cuttings</b>: a length of cane is cut in winter, rooted or grafted, and grows into a plant genetically identical to the one it was taken from.</p>
<p>This has a remarkable consequence. Every vine of a given variety is a piece of one original seedling, copied again and again. All the Pinot Noir in the world descends by cuttings from a single plant that grew, probably somewhere in eastern France, perhaps two thousand years ago. A <b>variety</b> is one individual, multiplied.</p>
<p>The copying is not perfect. Over centuries, mutations accumulate in the buds, and a cutting taken from a mutated shoot carries the change forward. Growers noticed vines that ripened earlier, bore smaller berries, or resisted rot, and propagated them. A line of vines descended from one such selected plant is a <b>clone</b>. Old varieties, having had the longest time to mutate, have the most clones: Pinot Noir has hundreds, of which a handful are widely planted. The numbered Dijon clones such as 115, 667 and 777, selected in Burgundy in the twentieth century for small berries and early, reliable ripening, are now planted wherever Pinot Noir is grown, alongside older selections named for where they were found, such as Pommard.</p>
<p>There are two ways to plant a vineyard from this diversity. Clonal selection plants one or a few certified clones, which gives uniform vines, predictable ripening and freedom from virus. <b>Massal selection</b> takes cuttings from many of the best vines in an old vineyard, preserving a mixed population. Its supporters argue that the mixture gives complexity and spreads risk, since the vines do not all flower or ripen on the same day. Many of the most admired estates in Burgundy, Champagne and the Rhône use it for that reason.</p>
<p>Some mutations are large enough to be treated as new varieties. <b>Pinot Gris</b> and <b>Pinot Blanc</b> are color mutations of Pinot Noir. In Pinot Gris the genes that switch on pigment have failed in part of the skin, leaving a pinkish-grey berry. In Pinot Blanc they have failed altogether. Pinot Meunier is a Pinot whose shoot tips are covered in white hairs, as if dusted with flour, which is what its name means. Genetically these are all one variety, which is why a Pinot Noir vine will occasionally throw a cane of grey or white bunches.</p>
<p>New varieties arise only from seed, that is, from sexual reproduction, and there are two kinds.</p>
<ul><li>A <b>crossing</b> has two vinifera parents. Some were bred deliberately: Pinotage is Pinot Noir crossed with Cinsault, made in South Africa in 1925, and Müller-Thurgau is Riesling crossed with Madeleine Royale, bred in the 1880s to ripen in cold German sites. Others were accidents in old mixed vineyards. DNA analysis, which began in the 1990s, showed that Cabernet Sauvignon is a chance seedling of Cabernet Franc and Sauvignon Blanc, that Syrah is the child of two obscure grapes of the northern Rhône, and that Chardonnay, Gamay, Aligoté and more than a dozen others are all offspring of Pinot and a humble white grape called Gouais Blanc.</li>
<li>A <b>hybrid</b> has parents of different species, usually vinifera and an American vine. Hybrids were bred after phylloxera to combine European fruit quality with American resistance. Vidal Blanc, the main grape of Canadian icewine, and Seyval Blanc are examples. Most European appellations ban hybrids, a rule that dates from a time when they were blamed for poor wine. A new generation bred for resistance to mildew, which needs far fewer sprays, is forcing a reconsideration, and several appellations have begun admitting them on trial.</li></ul>

<h3>The plant</h3>
<p>The vine is a woody climber, built to scramble up a tree toward the light and fruit in the canopy. Nothing about its natural habit suits farming. Left alone it produces enormous length of shoot and a scatter of small, late bunches. Viticulture is the craft of restraining that growth and directing it into ripe fruit, and the vocabulary of the vine's parts is the vocabulary of how that is done.</p>
<ul><li><b>Roots and trunk</b> are permanent wood. Besides anchoring the vine and taking up water and minerals, they store carbohydrate, mostly as starch, which powers the first weeks of growth each spring before there are leaves to feed it.</li>
<li><b>Arms or cordons</b> are permanent horizontal wood, if the training system has them.</li>
<li><b>Canes</b> are last year's shoots, now brown and woody. This is the crucial fact of vine management: <b>fruit comes only from shoots that grow from buds on one-year-old wood</b>. Older wood produces only leafy, barren shoots. Every winter the grower must therefore decide which of last year's canes to keep and how many buds to leave on them.</li>
<li><b>Buds</b> sit at each joint of a cane, and each is really three buds under one scale. The primary bud is the largest and carries the crop. If frost or injury kills it, a secondary bud grows in its place with far less fruit, and a tertiary bud usually has none. This is why a frosted vineyard still gives a small crop, and why that crop ripens late and unevenly.</li>
<li><b>Shoots</b> are this year's green growth, carrying leaves, tendrils and the flower clusters that become bunches. Clusters and tendrils are the same organ in two forms, which is why they sit in the same position opposite a leaf.</li></ul>
<p>The economy of the plant runs on sugar. Leaves make it by photosynthesis and the rest of the vine spends it. Physiologists call the leaves sources and everything else sinks: shoot tips, roots, the wood, and from midsummer the fruit. Photosynthesis works best with leaf temperatures of roughly 77 to 86°F (25 to 30°C), slows in cool weather, and falls away above about 95°F (35°C). When water runs short the leaf closes its pores to stop losing moisture, and since carbon dioxide enters through the same pores, sugar production stops too. A vine in a heat wave or a severe drought is therefore not ripening its fruit faster. It has shut down.</p>
<p>Two ideas follow, and both recur throughout this course. The first is <b>balance</b>. A vine has a certain area of leaf working in the sun and a certain weight of fruit to ripen, and the ratio between them decides the result. Too little leaf for the crop and the fruit never ripens fully. Too much leaf and the vine pours its sugar into shoots, shades its own fruit and gives wine that tastes green. Research suggests it takes on the order of one square meter of sunlit leaf to ripen a kilogram of grapes. The second is <b>vigor</b>, the vine's tendency to make shoots and leaves. Water, nitrogen, deep fertile soil and a strong rootstock all raise it. This is why the best vineyards are rarely on the most fertile land: on rich valley-floor soil the vine grows like a hedge, and on a poor stony slope it stops growing in midsummer and turns to its fruit.</p>

<h3>The year: dormancy and pruning</h3>
<p>The months below are for the Northern Hemisphere. In the Southern Hemisphere add six: budburst falls in September and harvest from February to April.</p>
<p>From leaf fall in November until March the vine is <b>dormant</b>. It carries no green tissue and has hardened itself against cold by moving water out of its cells and loading them with sugars. A fully dormant vinifera vine survives a good deal, but below about -4°F (-20°C), and at milder temperatures for tender varieties or after a warm spell, buds and then trunks are killed. That limit sets the edge of viticulture in continental climates. In the coldest wine regions, such as Ningxia in China, vines are taken off the wires and buried under soil every autumn, and in the Finger Lakes and Ontario growers mound earth over the graft.</p>
<p>Winter is when the vine is <b>pruned</b>, the most skilled and most expensive job of the year. An unpruned vine carries hundreds of buds, each capable of a fruiting shoot. If all grew, the vine would produce far more bunches than its leaves could ripen. Pruning removes around nine-tenths of the previous year's growth and leaves a chosen number of buds, typically somewhere between eight and forty depending on the vine's strength. That number is the first and most important control on the size of the crop, and getting it right, year after year for each vine, is what keeps a vineyard in balance.</p>
<p>There are two basic methods. In <b>spur pruning</b> each cane is cut back to a short stub of two or three buds on a permanent arm. In <b>cane pruning</b> one or two whole canes of eight to fifteen buds are kept and tied along a wire, and everything else is removed. Cane pruning takes more skill but is necessary for varieties whose buds near the base of the cane carry little fruit, and it is traditional in cool regions such as Burgundy and Bordeaux. Later chapters name the training systems built on each.</p>

<h3>Budburst and the frost weeks</h3>
<p>As the soil warms in March the roots become active, and sap rises and drips from the pruning cuts. Once the average daily temperature passes about <b>50°F (10°C)</b> the buds swell and open, and the first leaves appear. For several weeks the shoots grow entirely on the starch stored the previous autumn, since the new leaves consume more than they make until they are about half grown. A vine that went into winter with poor reserves, because it was overcropped or lost its leaves early to disease, starts the spring weak.</p>
<p>Green tissue has none of the cold hardiness of the dormant bud. A temperature of about 30°F (-1°C) for a few hours is enough to kill young shoots. <b>Spring frost</b> is therefore the great hazard of April and early May, and the risk falls hardest on varieties that bud early. Chardonnay, Pinot Noir and Merlot are among them, which is why frost is the recurring disaster of Chablis, Champagne and Burgundy. Growers can buy a little safety by pruning late, which delays budburst by a week or more, and they fight frost nights with fans, heaters, burning candles and sprinklers, all described in a later chapter. When frost does kill the primary shoots, the secondary buds push out, and the vineyard gives a third or less of its normal crop.</p>

<h3>Flowering and fruit set</h3>
<p>Shoots grow fast through May, several centimeters a day in warm weather. About eight weeks after budburst, usually in early to mid June, the vine <b>flowers</b>. The flowers are tiny, green and scented, and each sheds a little cap to expose its parts. Cultivated vines are hermaphrodite and largely pollinate themselves, needing neither bees nor much wind, but they do need warmth and dry weather: flowering goes best in settled conditions with temperatures in the high 60s and 70s Fahrenheit.</p>
<p>Even in a perfect year only a minority of flowers, commonly around a third, go on to form berries. That is normal, and the proportion that succeed is the <b>fruit set</b>. Two faults at this stage decide the size of the harvest more than anything that happens later.</p>
<ul><li><b>Coulure</b> is an excessive failure of set: the tiny berries shrivel and drop, leaving loose, sparse bunches. It happens when the vine is short of sugar at the critical moment, which is to say in cold, wet or overcast weather that slows photosynthesis, or when over-vigorous shoots take the supply. Grenache, Merlot and Malbec are notoriously prone.</li>
<li><b>Millerandage</b> occurs when flowers are poorly fertilized. The berries form without seeds and stay small, so a bunch carries normal berries alongside tiny ones, an effect growers call hen and chicks. The crop is smaller and may ripen unevenly, though in some varieties the small berries are valued for their concentration.</li></ul>
<p>Something less visible happens in the same weeks. Inside the buds forming on this year's shoots, the vine lays down the beginnings of the flower clusters that will emerge <i>next</i> spring, and how many it forms depends on warmth and light now. A cold, dull June therefore reduces two harvests: this year's through poor set and next year's through fewer clusters. It is one reason a small crop is often followed by another.</p>
<p>The size of the harvest can thus be written as a chain of multiplications: buds left at pruning, times shoots per bud, times bunches per shoot (decided last summer), times berries per bunch (decided at flowering), times the weight of each berry (decided by water in the weeks that follow). Growers intervene at each link, and weather at all but the first.</p>

<h3>The berry grows, then ripens</h3>
<p>A grape develops in two distinct phases with a pause between, and the two could hardly be more different.</p>
<p>In the first, lasting six or seven weeks after set, the berry is hard, green and sour. Its cells divide and enlarge. It accumulates <b>tartaric and malic acid</b> to its lifetime maximum, builds most of its <b>tannin</b> in skin and seeds, and in some varieties forms the pyrazines that smell of green bell pepper. Biologically this is a fruit protecting its unripe seeds by being unpleasant to eat.</p>
<p>Then growth pauses for a week or two, and the berry changes character. This turning point is <b>véraison</b>, in July or August. The berries soften, and those of black varieties change from green to red and then purple as <b>anthocyanin</b> pigments form in the skin, while white varieties turn translucent and golden. From now on the berry is ripening, and a different set of processes takes over.</p>
<ul><li><b>Sugar pours in.</b> The leaves export sucrose, and the berry splits it into glucose and fructose and stores them at a concentration that eventually reaches a fifth to a quarter of the juice by weight. The vine's whole supply is now directed at the fruit, and shoot growth should have stopped.</li>
<li><b>Acid falls.</b> The berry swells with water, diluting its acids, and it begins to burn <b>malic acid</b> for energy. Tartaric acid is not consumed. The warmer the nights, the faster malic acid is respired, which is the main reason hot climates give soft wines and cool climates sharp ones.</li>
<li><b>Color builds</b> in black grapes. Pigment formation needs light and moderate warmth and is suppressed by great heat, so very hot sites can give surprisingly pale wine.</li>
<li><b>Tannins change.</b> Their quantity does not rise much, but seeds turn from green to brown and hard, and skin tannins come to taste less bitter and rough.</li>
<li><b>Green flavors fade and ripe ones arrive.</b> Pyrazines break down, faster in bunches exposed to light. The compounds behind fruit and floral aromas, and the odorless precursors that fermentation will later release, accumulate, many of them only in the last weeks.</li></ul>
<p>From flowering to harvest takes around a hundred days in the classic regions, a rule of thumb old enough to be proverbial in France.</p>

<h3>Ripeness is several things, and they do not arrive together</h3>
<p>The decision of when to pick is the most consequential a grower makes, and it is hard because the processes just described run on different clocks.</p>
<ul><li><b>Sugar ripeness</b> is the easiest to measure, as the density of the juice, and it sets the potential alcohol: roughly 17 grams of sugar per liter make one percent of alcohol.</li>
<li><b>Acidity</b> is measured as total acid and as pH. It falls as sugar rises.</li>
<li><b>Phenolic ripeness</b> is the maturity of skins and seeds: full color, brown seeds, and tannin that tastes fine and not harsh. It cannot be read from an instrument and is judged by chewing skins and seeds in the vineyard.</li>
<li><b>Flavor ripeness</b> is the passage from green flavors through fresh fruit to ripe and finally cooked or dried fruit.</li></ul>
<p>Sugar accumulation is driven mostly by warmth and sunlight. Phenolic and flavor ripening depend more on time. In a hot climate, sugar races ahead: the grapes reach a potential 15% alcohol while the seeds are still green, and the grower must choose between picking at a sensible sugar level with hard tannins or waiting for the tannins and accepting high alcohol, low acid and jammy fruit. In a cool climate the opposite happens. Flavor and tannin may be ready at a sugar level that gives only 11%, and the tradition of adding sugar to the fermenting juice in northern Europe exists to cover that gap. The classic regions are classic largely because, for a particular grape, the two clocks reach the right hour at about the same time. A warming climate pulls them apart, and much of what growers are now doing, from shading the fruit to planting at altitude, is an attempt to slow the sugar while the flavors catch up.</p>
<p>That single decision explains most of the difference between a Sancerre and a warm-climate Sauvignon Blanc. Pick early and you get freshness, low alcohol and a risk of green flavors. Pick late and you get ripe fruit, softness and high alcohol, with a risk of flatness and jam.</p>

<h3>After the harvest</h3>
<p>The vine's year does not end when the grapes come off. For several weeks the leaves keep working, and with no fruit to feed, the sugar goes down into the trunk and roots to be stored as starch for next spring. The green shoots ripen into brown, woody canes. Then the leaves yellow and fall, and the vine hardens for winter. A vineyard that loses its leaves early, to disease, drought or an early frost, pays for it the following year.</p>

<h3>Early and late: the timing every grape carries</h3>
<p>Varieties differ in when they wake and how long they take, and matching those two traits to a climate is the first task in choosing what to plant.</p>
<table><tr><th>Trait</th><th>Grapes</th><th>Consequence</th></tr>
<tr><td>Early budding</td><td>Chardonnay, Pinot Noir, Merlot, Nebbiolo</td><td>Exposed to spring frost: Chablis, Champagne, Burgundy</td></tr>
<tr><td>Late budding</td><td>Cabernet Sauvignon, Riesling, Mourvèdre</td><td>Safer in frost-prone sites</td></tr>
<tr><td>Early ripening</td><td>Pinot Noir, Chardonnay, Merlot, Tempranillo ("temprano" means early)</td><td>Suit cool climates and short seasons</td></tr>
<tr><td>Late ripening</td><td>Cabernet Sauvignon, Nebbiolo, Mourvèdre, Grenache, Carignan</td><td>Need warmth or a long, dry autumn</td></tr></table>
<p>The pairings on a map follow from the table. Bordeaux's Left Bank can ripen late Cabernet Sauvignon only on its warmest, best-drained gravel, and plants earlier Merlot everywhere else as insurance. Burgundy, further north and inland, grows two early ripeners. Mourvèdre needs the heat of Bandol. <b>Nebbiolo</b> is the hard case: it buds early and ripens very late, so it needs the longest season of any classic grape and is exposed at both ends. That is why it sits on the best south-facing slopes of Barolo and almost nowhere else.</p>

<h3>What a vine needs</h3>
<p>Sunlight, warmth, water, nutrients and carbon dioxide. The first two belong to the next chapter. Of the others, water is the one growers think about most.</p>
<p>A dry-farmed vine needs roughly <b>500 to 750 mm</b> of rain a year, more in a hot climate, and it matters when the rain comes. The vine wants ample water in spring for shoot growth and set, and then progressively less. A mild shortage from fruit set to véraison is the most useful thing that can happen to a red-wine vineyard: the shoots stop growing, the berries stay small so that there is more skin to juice, and the plant's resources go to the fruit. A severe shortage closes the leaves' pores, stops photosynthesis and halts ripening altogether, and the leaves at the base of the shoot yellow and drop. Much of the reputation of the great red-wine sites rests on soils that deliver exactly a mild, steady deficit, and where irrigation is permitted growers try to imitate it by deliberately withholding water at the right moment.</p>
<p>Among nutrients, <b>nitrogen</b> drives growth. Too much gives a dense, shaded canopy, late ripening and rot. Too little gives a weak vine and juice so poor in nitrogen that the yeast later struggles to finish fermentation. <b>Potassium</b>, taken up freely from some soils, ends up in the juice, where it neutralizes acid and raises pH. Vines need little of anything, which is why vineyards have traditionally occupied land too poor for other crops.</p>

<h3>The life of a vine</h3>
<p>New vines are planted as grafted cuttings. They give their first worthwhile crop in about the <b>third year</b> and reach full production around years five to seven. Many appellations do not allow fruit from the first few years to be used. Yields begin to fall after about 25 to 30 years, as individual vines die of trunk diseases and viruses and the survivors carry less, and at that point most commercial vineyards are pulled out and replanted, because the economics of ordinary wine depend on tonnage.</p>
<p>Vines left longer give less fruit, often with more concentration, and <b>old vines</b> are prized. The explanations usually offered are that old vines have deep and extensive roots that buffer them against drought and heavy rain, large reserves of stored carbohydrate in their wood, and a naturally low, steady crop that needs little adjustment. There is also a simpler factor: a vineyard survives to eighty only if it was on a good site and made wine worth keeping, so old vineyards are a selected group. "Old vines" has no legal meaning in most countries. The Barossa's Old Vine Charter and South Africa's Old Vine Project both set the bar at 35 years.</p>

<h3>Inside the grape</h3>
<p>The winemaking chapters depend on knowing where in the berry each component lives, because cellar technique is largely a matter of deciding which parts to extract.</p>
<table><tr><th>Part</th><th>What it holds</th></tr>
<tr><td>Skin</td><td>Color (anthocyanins), most flavor and aroma compounds, and fine tannin. The waxy bloom on the outside carries wild yeast.</td></tr>
<tr><td>Pulp</td><td>Water, sugar (glucose and fructose) and acids (tartaric and malic). The juice of almost all black grapes is clear.</td></tr>
<tr><td>Seeds</td><td>Bitter tannin and oil. Winemakers avoid crushing them.</td></tr>
<tr><td>Stem</td><td>Tannin and, if green, a sappy bitterness; ripe brown stems add spice and freshness.</td></tr></table>

<h3>The grower's calendar</h3>
<ul><li><b>Winter:</b> pruning, which sets the number of buds and therefore the crop.</li>
<li><b>Spring:</b> frost watch, removing unwanted buds and shoots, the first sprays against mildew.</li>
<li><b>Early summer:</b> tucking shoots into wires, and removing leaves around the bunches to let in light and air.</li>
<li><b>Midsummer:</b> trimming shoot tips, and sometimes a <b>green harvest</b>: cutting off unripe bunches so that the rest ripen fully. It is the last chance to correct the balance between leaf and fruit.</li>
<li><b>Autumn:</b> sampling for sugar, acid and flavor, then harvest. After picking, the leaves keep working for a few weeks to refill the vine's reserves before they fall.</li></ul>

<h3>The cycle at a glance</h3>
<table><tr><th>Stage</th><th>When (north)</th><th>Why it matters</th></tr>
<tr><td>Dormancy</td><td>Nov-Mar</td><td>Pruning happens now; winter freeze can kill vines below about -4°F (-20°C).</td></tr>
<tr><td>Budburst</td><td>Mar-Apr</td><td>Begins once the average passes about 50°F (10°C). Spring frost danger; early-budding grapes (Chardonnay) are most at risk.</td></tr>
<tr><td>Flowering and fruit set</td><td>May-Jun</td><td>Cold or rain causes coulure (poor set) and millerandage (uneven berries). Yield is decided here, and next year's clusters are formed.</td></tr>
<tr><td>Véraison</td><td>Jul-Aug</td><td>Berries soften and change color; sugar rises, acid falls.</td></tr>
<tr><td>Ripening and harvest</td><td>Aug-Oct</td><td>The picking decision balances sugar, acid, phenolic ripeness and weather risk.</td></tr></table>
`,
floor:`<p>Guests ask about clones and rootstocks more than you'd think, especially in Oregon and California Pinot. Know Dijon clones and that "old vines" (vieilles vignes) has no legal definition in most countries.</p>`,
analyst:`<p>WSET Level 3 LO1 expects the growth cycle, the requirements of the vine (heat, sunlight, water, nutrients, CO₂), and how each stage's hazards affect yield and quality. A classic 25-mark question: "Explain how weather at flowering affects yield."</p>`,
terms:[["Vitis vinifera","The European wine grape species behind nearly all quality wine."],["Rootstock","Phylloxera-resistant American vine roots onto which vinifera is grafted."],["Crossing","Offspring of two vinifera varieties (e.g., Pinotage)."],["Hybrid","Vinifera crossed with another Vitis species (e.g., Vidal)."],["Véraison","Onset of ripening: berries soften and change color."],["Coulure","Poor fruit set after flowering, reducing yield."],["Cane","A shoot that has turned woody after one season; next year's fruit grows from its buds."],["Bloom","Waxy coating on grape skins that carries wild yeast."],["Green harvest","Removing unripe bunches in summer so the rest ripen fully."],["Anthocyanins","The color pigments in black grape skins."]],
quiz:[
[1,"Pinotage is a crossing of Pinot Noir and:","Cinsault",["Syrah","Gamay","Merlot"],"Created in South Africa in 1925 by Abraham Perold."],
[1,"Véraison is when:","Grapes soften and change color",["Buds swell and the first shoots appear","Flowers open and the berries set","Leaves fall and the vine goes dormant"],"Sugar accumulation accelerates from véraison."],
[2,"Why are American Vitis species used as rootstocks?","They resist phylloxera",["They ripen earlier","They yield more fruit","They add color"],"Phylloxera evolved alongside American vines, which tolerate root feeding."],
[2,"Poor fruit set caused by cold, wet weather at flowering is called:","Coulure",["Véraison","Millerandage only","Botrytis"],"Coulure reduces yield; millerandage is uneven berry size."],
[1,"A hybrid grape is:","A cross between vinifera and another Vitis species",["A clone of one variety selected for yield","A natural color mutation of Pinot Noir","A cross of two Vitis vinifera varieties"],"Vidal Blanc is a hybrid, used for Canadian icewine."],
[2,"As grapes ripen, which typically happens?","Sugar rises and acid falls",["Sugar and acid both rise","Pyrazines increase","Tannins become greener"],"Malic acid in particular is respired as the berry ripens."],
[2,"Vine shoots begin to grow when the average temperature passes about:","50°F (10°C)",["32°F (0°C)","41°F (5°C)","68°F (20°C)"],"Below that the vine stays dormant."],
[2,"Which classic grape buds early and ripens very late?","Nebbiolo",["Merlot","Tempranillo","Pinot Noir"],"It needs the longest season, hence the best south-facing slopes of Barolo."],
[2,"A new vineyard gives its first worthwhile crop in about:","Its third year",["Its first year","Its tenth year","Its fifteenth year"],"Full production comes at around year five to seven."],
[2,"A green harvest is:","Removing unripe bunches in summer",["Picking early for sparkling wine","Harvesting by machine at night","Picking grapes affected by rot"],"Fewer bunches ripen more fully. Also called vendange verte."],
[3,"Why does a frosted vineyard still give a small crop?","Secondary buds grow, with less fruit",["The roots produce new flowers","Frost damages only the leaves","Growers replant in the same season"],"Each bud holds a primary, secondary and tertiary bud."]
]});

L.push({id:"f5", unit:"F2", title:"Climate, Weather and Site", mins:14,
summary:"Where the vine's requirements are met and how: temperature, the sea, altitude, slope, mountains, wind, rain and light, and why each shows up in the glass.",
body:`
<p>The previous chapter described a plant with fixed requirements: warmth above a threshold, a long enough season, water at the right times, and a winter rest. This chapter is about where on earth those requirements are met, and how. Climate is the long-term average of a place and decides which grapes can ripen there. Weather is what happens this year and decides the vintage. Between them they explain more of what is in a glass than any decision made in a cellar, and almost every fact you will learn about a wine region is a statement about one of the mechanisms described here.</p>

<h3>The two belts</h3>
<p>Most of the world's vineyards lie between <b>30° and 50°</b> of latitude in each hemisphere. The limits are set by the vine's biology. Toward the poles the growing season becomes too short and too cool to ripen fruit, and winters become cold enough to kill the plant. Toward the equator there is no winter at all. Without a cold season the vine never goes fully dormant, flowers and fruits irregularly through the year, and is attacked without pause by fungal disease in the heat and humidity. A few regions do make wine in the tropics, in Brazil, India and Thailand, by forcing dormancy through pruning and withholding water, and by taking two crops a year, but they are working against the plant.</p>
<p>The belts are a first approximation only. The northern one reaches 50° and beyond in Europe and barely past 45° in eastern North America, and the reason is the first of the modifiers discussed below. What the vine responds to is not latitude but temperature, light and water, and a good student learns to ask of any region what delivers each of them.</p>

<h3>What temperature does to a grape</h3>
<p>Warmth drives the vine's chemistry in several directions at once, and the balance between them is what we taste as climate.</p>
<ul><li><b>Sugar</b> accumulates faster with warmth and sun, up to the point where heat shuts the leaf down. More sugar means more alcohol and more body.</li>
<li><b>Acid</b> is lost faster with warmth, because the berry burns malic acid for energy, and it burns more on warm nights. Cool climates keep their acid and warm climates lose it.</li>
<li><b>Flavor</b> moves along a line from green and herbaceous, through fresh fruit, to ripe and tropical fruit, and finally to cooked, jammy or dried fruit. Where on that line the grapes stand at harvest depends on how much heat the season supplied.</li>
<li><b>Tannin and color</b> need time and moderate warmth. Too little heat leaves them green and thin. Too much degrades pigment and can leave seeds unripe when the sugar is already excessive.</li></ul>
<p>From this comes the basic classification of climates by the average temperature of the growing season, April to October in the north and October to April in the south.</p>
<table><tr><th>Climate</th><th>Growing season average</th><th>In the glass</th><th>Examples</th></tr>
<tr><td><b>Cool</b></td><td>Under about 62°F / 16.5°C</td><td>Tart fruit, high acid, lighter body, lower alcohol</td><td>Champagne, Mosel, Chablis, Marlborough</td></tr>
<tr><td><b>Moderate</b></td><td>About 62-65°F / 16.5-18.5°C</td><td>Ripe fruit with fresh acid</td><td>Bordeaux, Northern Rhône, Willamette</td></tr>
<tr><td><b>Warm/hot</b></td><td>Warm from about 65°F / 18.5°C, hot above about 70°F / 21°C</td><td>Baked or jammy fruit, softer acid, more alcohol and body</td><td>Barossa, Southern Rhône, Paso Robles, Douro</td></tr></table>
<p>The bands are only a few degrees wide. A difference of two degrees in the seasonal average, which a person would hardly notice, separates Chablis from the Mâconnais and decides whether Chardonnay tastes of lemon and wet stone or of melon and peach. Grape varieties are matched to these bands by their ripening time. Early ripeners such as Pinot Noir, Chardonnay and Riesling reach maturity in cool climates and turn heavy and simple in hot ones. Late ripeners such as Grenache, Mourvèdre and Cabernet Sauvignon need the heat and never ripen in the cold. The classic pairing of grape and place is in every case a grape grown near the cool limit of where it will ripen, so that it reaches maturity slowly and late, in the mild days of autumn, with its acid and aroma intact.</p>

<h3>Three patterns</h3>
<p>The seasonal average hides how the heat arrives. Two places with the same average can have very different winters, summers and rainfall, and three broad patterns account for most wine regions.</p>
<p>A <b>maritime</b> climate is governed by a nearby ocean. Water takes a great deal of energy to heat and gives it back slowly, so the sea warms the land in winter and cools it in summer. Temperature swings are small, between seasons and between day and night, and frost and winter freeze are rare. The price is rain, which arrives from the sea throughout the year, including at flowering and at harvest. Bordeaux is the model, and its consequences are the model consequences: mild conditions that let late-ripening Cabernet Sauvignon hang into October, and large differences between vintages because the autumn weather is a gamble.</p>
<p>A <b>continental</b> climate lies far enough inland to escape the sea's influence. Land heats and cools quickly, so summers are hot, winters cold, and the swing between day and night is large. Summers are often dry, but the season is short and is bracketed by danger: frost in spring, sometimes frost again in autumn, hail from summer storms, and in the most extreme cases winters that kill vines. Burgundy, Champagne, the upper Loire, the Rhine and Mendoza are continental in varying degrees. Such climates suit early-ripening varieties and reward them with a combination of ripe flavor and high acid that maritime climates struggle to match.</p>
<p>A <b>Mediterranean</b> climate has warm, dry, sunny summers and mild, wet winters. It occurs on the western sides of continents at around 30° to 40° of latitude, where in summer a belt of settled high pressure moves in and blocks the rain: around the Mediterranean itself, in much of California, central Chile, the Cape and southwestern Australia. The dry summer means little disease and a reliable harvest, so vintages vary less. It also means water is short when the vine needs it, so that drought and irrigation are the central questions, and the wines tend to be full in body and ripe in tannin.</p>

<h3>How climate is measured</h3>
<table><tr><th>Measure</th><th>What it is</th></tr>
<tr><td>Growing season temperature</td><td>The average from April to October (October to April in the south). The cool, moderate and warm bands above use it.</td></tr>
<tr><td>Growing degree days (<b>Winkler index</b>)</td><td>Heat summed over the growing season. Add up, for each day, the degrees by which the average exceeds 50°F. California's five Winkler regions run from I (coolest: 2,500 or fewer) to V (hottest: over 4,000).</td></tr>
<tr><td><b>Continentality</b></td><td>The gap between the hottest and coldest months. Large in Burgundy and Mendoza, small in Bordeaux and Margaret River.</td></tr>
<tr><td>Sunshine hours and rainfall</td><td>How much, and above all when.</td></tr></table>
<p>The Winkler index was devised at the University of California at Davis in the 1940s to tell growers what to plant where. It starts from the fact that the vine does nothing below about 50°F, so only the warmth above that threshold counts. Each day contributes the number of degrees by which its average temperature exceeds 50, and the daily figures are added up from April through October. The cooler parts of the Sonoma coast and the Willamette Valley fall in Region I, much of Napa in Regions II and III, and the southern Central Valley in Region V. The index is crude. It treats a day that swings from 40°F to 100°F the same as a steady 70°F, takes no account of day length or sunshine, and says nothing about rain. Other indices correct for some of this, but none replaces looking at the pattern of a season.</p>

<h3>What bends the rules: the sea</h3>
<p>Within its broad climate, every region is shaped by local features, and these are what a student is really being asked about in most questions on geography.</p>
<p><b>Ocean currents</b> move heat around the planet, and two kinds matter. Warm currents carry tropical water toward the poles. The Gulf Stream and its extension across the North Atlantic bathe western Europe in mild, moist air, and that is why viticulture reaches so far north there. Bordeaux lies at the latitude of Minneapolis, and Champagne at about the latitude of Winnipeg. Without that current there would be no French wine as we know it.</p>
<p>Cold currents run toward the equator along the western edges of continents: the <b>Humboldt</b> current off Chile, the <b>Benguela</b> off South Africa and the California current off the American west coast. Along these coasts, wind pushes surface water offshore and very cold water wells up from the depths to replace it. Air passing over that water is chilled, and its moisture condenses into fog and low cloud. Inland, the summer sun heats the valleys, the hot air rises, and cool marine air is pulled in through any gap in the coastal hills to replace it. This daily engine is the single most important fact about the wine geography of California and Chile. It is why Carneros and the Sonoma Coast are cool enough for Pinot Noir while valleys a few miles inland ripen Zinfandel, why the Petaluma Gap is an appellation, why Santa Barbara's valleys, which unusually run east to west and open straight onto the ocean, are among the coolest in California despite lying furthest south, and why Chile's Casablanca and Leyda, on the coast, are white-wine country. In all of these places the distance from the sea matters more than the latitude.</p>
<p><b>Lakes and rivers</b> work on a smaller scale by the same physics. A large body of water is slow to warm in spring, which holds back budburst on its shores until the worst frosts have passed, and slow to cool in autumn, which extends the season and keeps early frosts away. The Finger Lakes, the shores of Lake Ontario and Lake Erie, and Austria's shallow Neusiedlersee all owe their vineyards to this. Seneca Lake is so deep that it rarely freezes, and the slopes above it are several degrees warmer on a winter night than land a few miles away. The Gironde estuary moderates the Médoc in the same way, and the best estates are said to "see the river". Water also supplies humidity, which is unwelcome in most places but essential in a few: the morning mists rising from rivers in Sauternes, Tokaj and around the Neusiedlersee are what bring the noble rot that makes their sweet wines.</p>

<h3>What bends the rules: height and slope</h3>
<p><b>Altitude.</b> Air is warmed mainly from the ground, and it thins and cools with height. Temperature falls by about <b>0.6°C for every 100 meters</b> climbed. A vineyard at 1,000 meters is thus about six degrees cooler than one at sea level nearby, which is the difference between a hot climate and a cool one. Altitude is how regions at hot latitudes make fresh wine: Salta in Argentina, with vineyards above 3,000 meters, the upper slopes of Etna, the high plateau of Ribera del Duero, and Mendoza's Uco Valley. It brings two further effects. Thin, dry mountain air holds little heat, so nights are cold and the swing between day and night is large. And sunlight at altitude passes through less atmosphere and carries more ultraviolet, to which grapes respond by growing thicker skins with more pigment and tannin. Deep color, firm tannin and bright acid together are the signature of high-altitude reds such as Mendoza Malbec.</p>
<p><b>Diurnal range</b> is the gap between daytime and night-time temperatures. Warm days ripen sugar and flavor. Cold nights slow the berry's respiration, so that less malic acid is burned, and they favor the formation of pigment and the retention of delicate aromas. A large range therefore lets grapes ripen fully while keeping their <b>acidity and aroma</b>. It is found at altitude, in dry continental interiors and in deserts: Mendoza, Paso Robles, Ribera del Duero, eastern Washington. Maritime regions have a small range, and so do places where water or cloud holds in the night's warmth.</p>
<p><b>Aspect and slope.</b> The energy a patch of ground receives depends on the angle at which sunlight strikes it. A slope tilted toward the sun intercepts more light per square meter than flat land, and the difference is greatest when the sun is low: at high latitudes, and in spring and autumn, which are exactly the times that matter to a vine struggling to ripen. So in the cool north the best sites face south, and in the Southern Hemisphere north. The Mosel's finest vineyards are steep south-facing walls of slate, where a vine can ripen Riesling at 50° north. East-facing slopes, like most of the Côte d'Or, take the morning sun, which dries the dew and warms the vines gently and early. West-facing slopes take the hot afternoon sun. In hot regions the logic is reversed, and growers seek slopes that face away from the sun to slow ripening.</p>
<p><b>Cold air and the mid-slope.</b> Slopes matter for a second reason. On still, clear nights the ground radiates its heat to the sky and chills the air touching it. Cold air is dense. It flows downhill like water and pools on valley floors, which become <b>frost pockets</b>. Hilltops escape the pooling but are exposed to wind and have thin soil. The band between, the mid-slope, stays warmest at night, drains well and catches the sun. It is no accident that the Grands Crus of the Côte d'Or occupy that band, with village wines on the flatter ground below and lesser sites near the wooded crest above. The same reasoning tells you why frost fans work: on a frosty night a layer of warmer air sits a few meters above the cold air at ground level, and a fan mixes it down.</p>

<h3>What bends the rules: mountains and wind</h3>
<p>Mountains make weather. When moist air meets a range it is forced upward, cools, and drops its moisture as rain on the windward side. Descending the far side, the now-dry air is compressed and warms. The land behind the range sits in a <b>rain shadow</b>: dry, sunny and often warm. The Vosges make Alsace one of the driest parts of France, though it lies well north of Burgundy. The Cascades reduce eastern Washington to desert levels of rain, so that its vineyards depend entirely on irrigation from the Columbia. The Andes do the same for Mendoza, and Chile's Coastal Range shelters its Central Valley from the Pacific. In every one of these places the vines are healthier, the sun more reliable and the harvest drier than the latitude would suggest.</p>
<p>The warm, dry wind that descends a mountain range has names of its own. In Argentina it is the <b>Zonda</b>, which comes off the Andes hot and violent in spring and can strip flowers and young shoots from the vines.</p>
<p>Other winds are valued. The <b>Mistral</b> blows cold and dry down the Rhône valley from the north. It dries the vines after rain, which keeps them free of fungal disease, and it concentrates the grapes by evaporation. It is also strong enough to break shoots, which is why vines in the southern Rhône are traditionally pruned as low, free-standing bushes and why the northern Rhône stakes each vine. The Cape Doctor does similar work from the southeast in South Africa. Jerez has two winds with opposite characters: the damp westerly Poniente off the Atlantic, which keeps the humidity that the flor yeast needs, and the hot, dry easterly Levante. Afternoon sea breezes cool Margaret River, Casablanca and Carneros. All wind carries a cost, because a vine in strong wind closes its pores to save water and stops making sugar, and exposed vineyards are often planted with rows of trees as shelter.</p>

<h3>Rain: timing beats totals</h3>
<p>How much rain falls in a year tells you little. When it falls tells you nearly everything.</p>
<table><tr><th>When</th><th>Effect</th></tr>
<tr><td>Winter</td><td>Refills the soil. Welcome.</td></tr>
<tr><td>At flowering</td><td>Poor fruit set and a small crop.</td></tr>
<tr><td>Summer</td><td>Fungal disease, above all the mildews, which need warmth and moisture together.</td></tr>
<tr><td>At harvest</td><td>The worst timing: berries swell and split, flavors are diluted and rot sets in.</td></tr></table>
<p>Bordeaux and Rioja both receive moderate rain. Bordeaux's falls partly at harvest, which is why its vintages vary more. Regions with dry summers, such as most of California and Chile, hardly need to think about harvest rain at all, and their vintage charts are correspondingly dull. Hail is a separate hazard, local and violent, that can strip a vineyard in minutes. It is a constant threat in Mendoza, where growers hang nets over the rows, and in Burgundy and Piedmont.</p>

<h3>Light</h3>
<p>Heat and light are different things, and a vine needs both. Far from the equator, summer days are long: at 50° north the sun is up for about sixteen hours in June. Washington, Germany and Central Otago therefore receive more hours of daylight in the growing season than California or the Barossa, and this helps ripening in places where the temperature alone would seem too low. Cloud matters as well. A grey region, such as much of northern Europe in a poor year, receives less light than a clear one at the same temperature, and slopes and reflective soils that add a little more can be decisive.</p>

<h3>Soil as part of the climate</h3>
<p>Soil is treated fully in a later chapter. Here it is enough to say that soil matters mostly through water and heat, and less through any direct flavor. A wet soil is a cold soil, because water takes so much energy to warm, so drainage and temperature go together.</p>
<ul><li><b>Gravel</b> drains fast and its stones store the day's heat and release it at night. It ripens late varieties in a marginal climate, which is why Cabernet Sauvignon dominates the gravel of the Médoc and Graves.</li>
<li><b>Clay</b> holds water and stays cool. In Pomerol, that suits early-ripening <b>Merlot</b>, which does not need the extra warmth and benefits from the steady moisture.</li>
<li><b>Limestone and chalk</b> drain freely at the surface yet hold a reserve of water deeper down that roots can reach in a dry summer. Champagne, the Côte d'Or and Chablis, with its <b>Kimmeridgian</b> marl, share this.</li>
<li><b>Slate</b> is dark and stony and absorbs heat, helping Riesling ripen on the Mosel.</li></ul>
<p>Soils of low fertility limit vigor, so vines put their energy into fruit and not leaves.</p>

<h3>Three scales of climate</h3>
<ul><li><b>Macroclimate</b> is the region: Burgundy.</li>
<li><b>Mesoclimate</b> is one site: the mid-slope of Vosne-Romanée, sheltered and facing east.</li>
<li><b>Microclimate</b> is the air inside a single vine's canopy, which the grower changes by pulling leaves.</li></ul>
<p>People say "microclimate" when they mean mesoclimate. Examiners notice. The distinction is useful because each scale is controlled by something different. Nobody can change a macroclimate. A mesoclimate is chosen once, when the vineyard is planted, and the whole apparatus of appellations, crus and classified vineyards is an attempt to record which mesoclimates are best. A microclimate is adjusted every season by how the vines are trained and trimmed.</p>

<h3>Year-to-year swings</h3>
<p>Climate is an average, and no year is average. The largest rhythm is the cycle of <b>El Niño and La Niña</b>, a periodic warming and cooling of the tropical Pacific that shifts rainfall around its rim. El Niño years tend to bring drought to Australia and heavy winter rain to California and parts of South America, and La Niña the reverse. Add spring frost, hail and heat waves, and you have the reason vintage matters more in some regions than others.</p>
<p>The principle is this. Where a grape is grown near the limit of where it will ripen, a small difference in the season decides between a great wine and a thin one, so vintages vary widely and the best years are extraordinary. Where the climate is warm and reliable, the grapes ripen every year and the wines are consistent. The most famous regions of Europe are nearly all of the first kind, which is why they have vintage charts and why their best wines come from sites that add a degree or two of warmth and a few days of season.</p>
<p>That margin is moving. Growing seasons in the classic European regions are now about one to two degrees warmer than in the mid-twentieth century, harvests come two or three weeks earlier, and sites once too cold are ripening well: southern England now grows the Champagne grapes on the same chalk. Growers in warm regions are using every modifier in this chapter in reverse, moving uphill, toward the coast and onto slopes that face away from the sun.</p>

<h3>Why it matters at the table</h3>
<p>When a guest asks why a Chablis tastes so different from a Napa Chardonnay, the honest answer is mostly climate, then winemaking. It is the same grape. One grows near the cool northern limit of where it will ripen, in a continental climate with a short season, and is picked with high acid and flavors of lemon and green apple. The other grows in Mediterranean sunshine, moderated by fog, and reaches full ripeness every year with flavors of peach and pineapple. Being able to give that answer in two sentences, for any pair of wines, is most of what this chapter is for.</p>
`,
floor:`<p>On the CMS grid, climate is part of your initial conclusion: cool, moderate or warm. The older Europe grid adds cool-moderate and moderate-warm. Read it from fruit condition and alcohol.</p>`,
analyst:`<p>WSET short answers often hinge on climate: "Explain how the climate of Mendoza affects the style of its Malbec" wants altitude, diurnal range, sunshine and dryness, each linked to a result in the glass (deep color, ripe black fruit, fresh acid).</p>`,
terms:[["Continental climate","Hot summers, cold winters, wide annual temperature range."],["Maritime climate","Ocean-moderated; mild, small temperature range, rain spread through the year."],["Diurnal range","Difference between day and night temperatures; cool nights preserve acid and aroma."],["Kimmeridgian","Ancient marl and limestone with fossil oyster shells; Chablis and Sancerre."],["Mesoclimate","The climate of a single vineyard site."],["Winkler index","Growing degree days above 50°F, used to rank regions I (coolest) to V (hottest)."],["Rain shadow","Dry zone on the sheltered side of a mountain range."],["Frost pocket","Low ground where cold air pools on still nights."],["Continentality","The difference between a region's hottest and coldest months."]],
quiz:[
[1,"Which climate pattern has hot summers, cold winters and high frost risk?","Continental",["Maritime","Mediterranean","Tropical"],"Burgundy and Mendoza are continental."],
[2,"How does altitude affect temperature?","It drops about 0.6°C per 100 m",["It rises about 0.6°C per 100 m","It stays the same at any height","It drops about 5°C per 100 m"],"High-altitude vineyards like Salta stay fresh despite low latitude."],
[1,"Which cold ocean current cools coastal Chile?","Humboldt",["Benguela","Gulf Stream","Kuroshio"],"The Benguela cools South Africa's west coast."],
[2,"Why does Merlot suit Pomerol's clay soils?","Clay stays cool and holds water",["Clay warms fast and ripens late grapes","Clay adds tannin directly to the fruit","Clay keeps phylloxera out of the roots"],"Cabernet Sauvignon needs the warmer, free-draining gravels of the Médoc."],
[2,"Large diurnal range mainly helps wines retain:","Acidity and aroma",["Tannin and color","Residual sugar","Alcohol and body"],"Cool nights slow the loss of acid and volatile aromatics."],
[1,"Most of the world's vineyards lie between which latitudes?","30° and 50°",["10° and 20°","50° and 60°","0° and 15°"],"Both hemispheres."],
[2,"The climate of one vineyard site is its:","Mesoclimate",["Macroclimate","Microclimate","Continentality"],"Macro is the region; micro is the air inside the vine's canopy."],
[2,"The Winkler index sorts regions by:","Heat summed over the growing season",["Rain summed over the growing season","Sunshine hours in the ripening month","Average altitude of the vineyards"],"Growing degree days above 50°F, from Region I (coolest) to V (hottest)."],
[2,"Which mountains put Alsace in a rain shadow?","The Vosges",["The Alps","The Pyrenees","The Jura"],"They block Atlantic rain, making Colmar one of the driest places in France."],
[2,"Why are valley floors prone to spring frost?","Cold air drains downhill and pools",["They get less sunlight in spring","Their soils hold far more water","Wind is much stronger down there"],"The mid-slope stays warmer at night, which is where the best sites sit."],
[2,"The hot, dry wind that blows off the Andes into Argentina is the:","Zonda",["Mistral","Levante","Poniente"],"The Mistral is the Rhône's; Levante and Poniente belong to Jerez."],
[3,"Rain does most harm to quality when it falls:","At harvest",["In winter","Just after harvest","In early spring before budburst"],"It dilutes the grapes and starts rot. Winter rain recharges the soil."]
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
<li><b>Biodynamic:</b> Rudolf Steiner's 1924 lectures; organic plus preparations (cow-horn manure, 500/501) and a lunar calendar. Certified by Demeter and Biodyvin. Many top estates use it: Domaine Leroy, Zind-Humbrecht, Nicolas Joly.</li></ul>
<h3>Density and layout</h3>
<p>Burgundy and Bordeaux plant about 10,000 vines per hectare, a meter apart, so that vines compete and stay small. Much of the New World plants 2,000 to 3,000, with wide rows for tractors. Rows usually run north to south so both sides of the canopy get sun; on steep slopes they follow the contour or sit on terraces.</p>
<h3>Training systems to recognize</h3>
<table class="t"><tr><th>System</th><th>What it looks like</th><th>Where and why</th></tr>
<tr><td>Pergola (parral, tendone)</td><td>An overhead roof of leaves with fruit hanging below</td><td>Rías Baixas, Vinho Verde, Valpolicella, Alto Adige: lifts fruit away from damp ground and shades it</td></tr>
<tr><td>Basket (kouloura)</td><td>Canes woven into a low wreath on the ground</td><td>Santorini: shelters grapes from wind and sun</td></tr>
<tr><td>Single stake</td><td>One vine tied to one post</td><td>The Mosel and Côte-Rôtie: slopes too steep for wires</td></tr>
<tr><td>Divided canopy (Geneva Double Curtain, Lyre, Scott Henry)</td><td>The canopy split in two to spread out the leaves</td><td>Fertile, vigorous sites in the New World</td></tr></table>
<h3>The three American plagues, in order</h3>
<p><b>Powdery mildew</b> reached Europe in the 1840s, <b>phylloxera</b> in the 1860s and <b>downy mildew</b> in the 1870s and 1880s, the last probably on the American rootstocks imported to cure the second. Tell the mildews apart:</p>
<table class="t"><tr><th></th><th>Powdery mildew (oidium)</th><th>Downy mildew (peronospora)</th></tr>
<tr><td>Likes</td><td>Warm, shaded, humid canopies; needs no rain</td><td>Warm weather with rain</td></tr>
<tr><td>Looks like</td><td>Grey, ash-like dust on leaves and berries</td><td>Yellow "oil spots" on leaves, white down beneath</td></tr>
<tr><td>Treated with</td><td>Sulfur</td><td>Copper (Bordeaux mixture)</td></tr></table>
<h3>More enemies</h3>
<ul><li><b>Pierce's disease:</b> a bacterium (<i>Xylella fastidiosa</i>) that blocks the vine's water vessels and kills it. Spread by sharpshooter insects in California and the American South. No cure.</li>
<li><b>Trunk diseases</b> (esca, eutypa): fungi that enter through pruning wounds and slowly kill the wood. A growing problem in every old vineyard.</li>
<li><b>Nematodes:</b> soil worms that feed on roots and spread fanleaf virus; managed with resistant rootstocks.</li>
<li><b>Grape moths:</b> their caterpillars pierce berries and let rot in. Growers hang pheromone capsules that stop males finding females ("sexual confusion").</li>
<li><b>Birds, deer, boar and wasps:</b> nets and fences. In Australia and New Zealand, bird netting is routine.</li></ul>
<h3>The vineyard floor</h3>
<p>Between the rows a grower can plough, spray herbicide or sow a <b>cover crop</b> of grasses and legumes. Cover crops hold the soil on slopes, add organic matter and compete with the vine to curb vigor; in dry regions they are mown or ploughed in before they take too much water.</p>
<h3>Hand or machine?</h3>
<table class="t"><tr><th></th><th>Hand harvest</th><th>Machine harvest</th></tr>
<tr><td>Strengths</td><td>Selection in the vineyard; whole bunches arrive intact; works on any slope</td><td>Fast, cheap, can pick at night when fruit is cool, can beat incoming rain</td></tr>
<tr><td>Limits</td><td>Slow, costly, needs a large crew</td><td>Shakes berries off the stems, so no whole bunches; needs flat or gentle land and trellised vines</td></tr>
<tr><td>Required for</td><td>Champagne, Beaujolais (carbonic maceration), botrytized wines picked in several passes, steep terraces</td><td>Common for Marlborough Sauvignon Blanc and most large-volume wine</td></tr></table>`,
floor:`<p>Guests ask "is this organic?" constantly. Know the US distinction between "organic wine" (no added sulfites) and "made with organic grapes," and that many biodynamic estates never put certification on the label.</p>`,
analyst:`<p>Sample WSET Level 3 short answer (4 marks): "Why do growers use VSP?" Model points: even sun exposure on fruit, airflow reduces fungal disease, easier mechanization of pruning and harvest, consistent ripening.</p>`,
terms:[["VSP","Vertical shoot positioning; shoots trained upward between wires."],["Guyot","Cane-pruning system laying down one or two canes each year."],["Phylloxera","Root-feeding aphid; controlled by grafting onto American rootstocks."],["Noble rot","Botrytis cinerea in favorable conditions, concentrating sugars."],["Biodynamic","Organic farming plus Steiner preparations and a cosmic calendar."],["Pergola","Overhead training that lifts and shades the fruit."],["Kouloura","Santorini's basket-shaped vine, woven low against wind."],["Pierce's disease","Fatal bacterial disease spread by sharpshooter insects."],["Esca","A fungal trunk disease that slowly kills old vines."],["Cover crop","Plants sown between vine rows to hold soil and manage vigor."],["Sexual confusion","Pheromone capsules that stop grape moths from mating."]],
quiz:[
[1,"What is the main defense against phylloxera?","Grafting onto American rootstock",["Spraying copper and sulfur","Netting the vines in summer","Biodynamic preparations"],"No chemical cure exists; resistant roots are the answer."],
[2,"Which country is famous for largely ungrafted vineyards thanks to geographic isolation?","Chile",["France","Italy","Spain"],"Andes, desert, Pacific and Antarctic ice protect it."],
[2,"Why might a grower sprinkle water on vines during a spring frost?","Freezing water releases heat and the ice insulates the buds",["Running water washes the frost off the buds","Wet air raises humidity and stops ice forming","Cold water delays budburst until the frost passes"],"Latent heat of fusion protects the bud at 0°C."],
[1,"Noble rot is caused by:","Botrytis cinerea",["Powdery mildew","Phylloxera","Brettanomyces"],"Misty mornings and dry afternoons allow benign infection."],
[2,"Cane pruning (Guyot) differs from spur pruning because:","It lays down a new one-year cane each winter",["It leaves short spurs on a permanent arm","It is used only on free-standing bush vines","It is carried out in summer, not in winter"],"Burgundy is classic Guyot territory."],
[1,"Biodynamic farming is based on lectures by:","Rudolf Steiner",["Louis Pasteur","Émile Peynaud","Jules Guyot"],"Steiner lectured on agriculture in 1924."],
[3,"In the US, a wine labeled 'organic wine' (rather than 'made with organic grapes') must also:","Have no added sulfites",["Be biodynamic","Be aged in new oak","Be unfiltered"],"USDA organic wine prohibits added sulfites."],
[2,"Which arrived in Europe first?","Powdery mildew",["Phylloxera","Downy mildew","Pierce's disease"],"Powdery mildew in the 1840s, phylloxera in the 1860s, downy mildew after that."],
[2,"Downy mildew is treated mainly with:","Copper",["Sulfur","Pheromones","Grafting"],"Bordeaux mixture is copper sulfate and lime. Sulfur is for powdery mildew."],
[2,"Pergola training helps in Rías Baixas because it:","Lifts fruit above damp ground",["Protects vines from frost","Increases sugar ripeness","Allows machine harvesting"],"Air moves under the canopy, which cuts rot in a wet climate."],
[3,"Pierce's disease is spread by:","Sharpshooter insects",["Soil nematodes","Rain splash","Pruning shears"],"A bacterium, Xylella fastidiosa, carried by sharpshooters. Nematodes spread fanleaf virus."],
[2,"Machine harvesting cannot deliver:","Whole bunches",["Fruit picked at night","Cool fruit","A fast harvest"],"The machine shakes berries off the stems, so Champagne and Beaujolais are picked by hand."],
[2,"A cover crop between vine rows mainly:","Holds soil and curbs vigor",["Raises sugar in the grapes","Protects against hail","Replaces the need for pruning"],"It also adds organic matter. In dry regions it must not take too much water."]
]});
