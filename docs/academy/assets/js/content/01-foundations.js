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
[2,"The Master of Wine research paper runs to about:","10,000 words",["1,000 words","3,000 words","50,000 words"],"The Diploma's D6 research assignment is 3,000 words."],
[2,"The Cicerone program certifies expertise in:","Beer",["Sake","Spirits","Coffee"],"Its top level is Master Cicerone."],
[2,"Which body runs the Best Sommelier of the World competition?","ASI",["WSET","IMW","SWE"],"The Association de la Sommellerie Internationale."],
[2,"A wine buyer for a supermarket chain is best served by which track?","Analyst",["Floor","Cicerone","Kikisake-shi"],"Quality judgment and written reasoning are the daily work."],
[2,"WSET's stated study time for Level 3 is about:","84 hours",["8 hours","28 hours","500 hours"],"Level 2 is 28 hours and the Diploma at least 500."],
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
<p>As grapes ripen, sugar rises (more potential alcohol), acid falls (especially malic acid), color and tannins mature, and green pyrazine flavors (bell pepper) fade. Pick early and you get freshness and low alcohol with a risk of green flavors; pick late and you get ripe fruit, softness and high alcohol with a risk of flab and jamminess. That single decision explains most of the difference between Sancerre and a warm-climate Sauvignon Blanc.</p>
<h3>The parts of a vine</h3>
<p>Know the words growers use, because pruning, training and frost questions all depend on them.</p>
<ul><li><b>Roots and trunk:</b> permanent wood. The roots store the reserves that power the first weeks of spring growth.</li>
<li><b>Arms or cordons:</b> permanent horizontal wood, if the vine has them.</li>
<li><b>Canes:</b> last year's shoots, now brown and woody. Fruit comes only from buds on one-year-old wood, which is the whole reason vines are pruned every winter.</li>
<li><b>Buds:</b> each is really three. If frost kills the primary bud, a secondary bud grows but carries far less fruit, so a frosted vineyard still gives a small crop.</li>
<li><b>Shoots:</b> this year's green growth, carrying leaves, tendrils and the flower clusters that become bunches.</li></ul>
<h3>Inside the grape</h3>
<table class="t"><tr><th>Part</th><th>What it holds</th></tr>
<tr><td>Skin</td><td>Color (anthocyanins), most flavor and aroma compounds, and fine tannin. The waxy <b>bloom</b> on the outside carries wild yeast.</td></tr>
<tr><td>Pulp</td><td>Water, sugar (glucose and fructose) and acids (tartaric and malic). The juice of almost all black grapes is clear.</td></tr>
<tr><td>Seeds</td><td>Bitter tannin and oil. Winemakers avoid crushing them.</td></tr>
<tr><td>Stem</td><td>Tannin and, if green, a sappy bitterness; ripe brown stems add spice and freshness.</td></tr></table>
<h3>What a vine needs</h3>
<p>Sunlight, warmth, water, nutrients and carbon dioxide. Shoots only grow once the average temperature passes about 50°F (10°C). A dry-farmed vine needs roughly 500 to 750 mm of rain a year. Too much water and nitrogen make leaves instead of fruit, which is why the best vineyards are rarely the most fertile land.</p>
<h3>Early and late: the timing every grape carries</h3>
<table class="t"><tr><th>Trait</th><th>Grapes</th><th>Consequence</th></tr>
<tr><td>Early budding</td><td>Chardonnay, Pinot Noir, Merlot, Nebbiolo</td><td>Exposed to spring frost: Chablis, Champagne, Burgundy</td></tr>
<tr><td>Late budding</td><td>Cabernet Sauvignon, Riesling, Mourvèdre</td><td>Safer in frost-prone sites</td></tr>
<tr><td>Early ripening</td><td>Pinot Noir, Chardonnay, Merlot, Tempranillo ("temprano" means early)</td><td>Suit cool climates and short seasons</td></tr>
<tr><td>Late ripening</td><td>Cabernet Sauvignon, Nebbiolo, Mourvèdre, Grenache, Carignan</td><td>Need warmth or a long, dry autumn</td></tr></table>
<p>Nebbiolo is the hard case: it buds early and ripens very late, so it needs the longest season of any classic grape. That is why it sits on the best south-facing slopes of Barolo.</p>
<h3>The life of a vine</h3>
<p>New vines are planted as grafted cuttings. The first worthwhile crop comes in about the <b>third year</b>, full production around year five to seven. Yield falls after about 25 to 30 years, when many commercial vineyards are replanted. Vines left longer give less fruit with more concentration. "Old vines" has no legal meaning in most countries; the Barossa and South Africa's Old Vine Project both set the bar at 35 years.</p>
<h3>The grower's calendar</h3>
<ul><li><b>Winter:</b> pruning, the most skilled job of the year.</li>
<li><b>Spring:</b> frost watch, removing unwanted buds and shoots, the first sprays.</li>
<li><b>Early summer:</b> tucking shoots into wires, leaf removal around the bunches.</li>
<li><b>Midsummer:</b> trimming, and sometimes a <b>green harvest</b>: cutting off unripe bunches so the rest ripen fully.</li>
<li><b>Autumn:</b> sampling for sugar, acid and flavor, then harvest. After picking, leaves keep working for a few weeks to refill the vine's reserves before they fall.</li></ul>`,
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
summary:"Why latitude, altitude, water and soil show up in the glass.",
body:`
<p>Climate is the long-term average; weather is this year. Climate decides which grapes can ripen in a place. Weather decides the vintage.</p>
<h3>Climate types</h3>
<ul><li><b>Cool</b> (growing season average under about 62°F / 16.5°C): tart fruit, high acid, lighter body, lower alcohol. Champagne, Mosel, Chablis, Marlborough.</li>
<li><b>Moderate</b> (about 62-65°F / 16.5-18.5°C): ripe fruit with fresh acid. Bordeaux, Northern Rhône, Willamette.</li>
<li><b>Warm/hot</b> (warm from about 65°F / 18.5°C, hot above about 70°F / 21°C): baked or jammy fruit, softer acid, more alcohol and body. Barossa, Southern Rhône, Paso Robles, Douro.</li></ul>
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
<p>When a guest asks why a Chablis tastes so different from a Napa Chardonnay, the honest answer is mostly climate, then winemaking. Same grape; one grows near the cool northern limit, the other in Mediterranean sunshine.</p>
<h3>Three scales of climate</h3>
<ul><li><b>Macroclimate:</b> the region (Burgundy).</li>
<li><b>Mesoclimate:</b> one site (the mid-slope of Vosne-Romanée, sheltered and facing east).</li>
<li><b>Microclimate:</b> the air inside a single vine's canopy, which the grower changes by pulling leaves.</li></ul>
<p>People say "microclimate" when they mean mesoclimate. Examiners notice.</p>
<h3>How climate is measured</h3>
<table class="t"><tr><th>Measure</th><th>What it is</th></tr>
<tr><td>Growing season temperature</td><td>The average from April to October (October to April in the south). The cool, moderate and warm bands above use it.</td></tr>
<tr><td>Growing degree days (Winkler index)</td><td>Add up, for each day of the season, the degrees by which the average exceeds 50°F. California's five Winkler regions run from I (coolest: 2,500 or fewer) to V (hottest: over 4,000).</td></tr>
<tr><td>Continentality</td><td>The gap between the hottest and coldest months. Large in Burgundy and Mendoza, small in Bordeaux and Margaret River.</td></tr>
<tr><td>Sunshine hours and rainfall</td><td>How much, and above all <b>when</b>.</td></tr></table>
<h3>Rain: timing beats totals</h3>
<p>Winter rain fills the soil and helps. Rain at flowering causes poor fruit set. Rain in summer brings mildew. Rain at harvest swells berries, dilutes flavor and starts rot. Bordeaux and Rioja both get moderate rain; Bordeaux's falls partly at harvest, which is why its vintages vary more.</p>
<p>A <b>rain shadow</b> forms where mountains strip moisture from the prevailing wind. The Vosges make Alsace one of the driest parts of France. The Cascades keep eastern Washington to desert levels of rain. The Andes do the same for Mendoza, and Chile's Coastal Range shelters its Central Valley.</p>
<h3>Light</h3>
<p>Far from the equator, summer days are long: Washington, Germany and Central Otago get more daylight hours in the growing season than California or the Barossa, which helps ripening in cool places. At altitude, sunlight is more intense and richer in ultraviolet, so grapes grow thicker skins with more color and tannin: the signature of high Mendoza Malbec.</p>
<h3>Cold air and the mid-slope</h3>
<p>Cold air is heavy. On still spring nights it drains downhill and pools on valley floors, which become <b>frost pockets</b>. Hilltops are exposed and windy. The band between, the mid-slope, stays warmest at night and drains best. It is no accident that the Grands Crus of the Côte d'Or sit there.</p>
<h3>Winds with names</h3>
<p>The <b>Mistral</b> blows cold and dry down the Rhône and keeps vines free of disease. The <b>Cape Doctor</b> does the same from the southeast in South Africa. The hot <b>Zonda</b> comes off the Andes into Argentina. Jerez has the damp westerly <b>Poniente</b> and the hot easterly <b>Levante</b>. Afternoon sea breezes cool Margaret River, Casablanca and Carneros.</p>
<h3>Year-to-year swings</h3>
<p>El Niño and La Niña shift rainfall across the Pacific: El Niño years tend to bring drought to Australia and heavy winter rain to California and parts of South America. Add spring frost, hail and heat waves, and you have the reason vintage matters more in marginal climates than in reliable ones.</p>`,
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
[2,"The Winkler index sorts regions by:","Heat summed over the growing season",["Total annual rainfall","Hours of sunshine","Altitude above sea level"],"Growing degree days above 50°F, from Region I (coolest) to V (hottest)."],
[2,"Which mountains put Alsace in a rain shadow?","The Vosges",["The Alps","The Pyrenees","The Jura"],"They block Atlantic rain, making Colmar one of the driest places in France."],
[2,"Why are valley floors prone to spring frost?","Cold air drains downhill and pools",["They get less sunlight","Their soils are wetter","Wind is stronger there"],"The mid-slope stays warmer at night, which is where the best sites sit."],
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
