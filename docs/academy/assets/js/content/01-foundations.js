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
summary:"The four-stage method behind both grids, and the reason for each step: a nose that tires in seconds, a brain that smells what the eyes expect, and evidence that must be collected before a name is allowed.",
body:`
<p>Blind tasting looks like a party trick. It is closer to detective work. A wine is a record of decisions: a grape, a climate, a winemaker's choices, time in bottle. Each of those leaves physical evidence you can see, smell and feel. The tasting grid is a checklist that forces you to collect all the evidence before you name a suspect.</p>
<p>This chapter teaches the method, and it also explains why the method has the shape it does. The steps are not arbitrary. Each one exists to get around a known weakness in how people perceive: a nose that tires in seconds, a brain that smells what the eyes expect, a memory that will not hold a smell without a word attached. Knowing the weaknesses is what turns a routine into a skill.</p>

<h3>Why a method at all</h3>
<p>Research on wine experts has produced one surprising and useful result. Experts are not more sensitive than anyone else. Tested on their ability to detect faint smells, or small differences in tannin or alcohol, trained tasters score about the same as untrained drinkers. What they have is better memory for wine smells, a larger and more consistent vocabulary, and a framework for organizing what they notice.</p>
<p>That is good news, because sensitivity cannot be trained and the other three can. It also explains the form of tasting exams. They do not test whether you have a gifted nose. They test whether you can observe systematically, put words to what you observe, and reason from it.</p>
<p>A second finding is a warning. In a famous French experiment in 2001, fifty-four students of winemaking were given a white wine to describe, and used words like lemon, honey and straw. A week later they were given the same white wine dyed red with an odorless coloring. They described it with the vocabulary of red wine: cherry, blackcurrant, spice. Nothing about the smell had changed. Later studies found that experienced tasters are more prone to this than beginners, because they have learned stronger expectations.</p>
<p>The lesson is that perception is partly prediction. What you see, what the label says and what the wine cost all shape what you believe you smell. The disciplines of professional tasting, bottles covered, notes written before discussion, the same order every time, exist to protect the evidence from the taster.</p>

<h3>The four stages</h3>
<p>Both major tasting systems, the Court of Master Sommeliers' deductive grid and the WSET's Systematic Approach to Tasting, follow the same four stages: look, smell, taste, conclude.</p>

<h3>Stage 1: Sight</h3>
<p>Tilt the glass over white paper, in good light, and look through the wine at its center and at its edge.</p>
<ul><li><b>Clarity</b> (clear, hazy, cloudy) can flag a fault or an unfiltered wine.</li>
<li><b>Intensity</b> of color hints at the thickness of the grape's skin and at age. Nebbiolo and Pinot Noir are pale. Syrah and Malbec are opaque.</li>
<li><b>Hue</b> tells age. Whites darken from straw to gold to amber. <b>Reds go from purple to ruby to garnet to brick.</b></li>
<li><b>Rim variation</b>, the color thinning and browning at the edge, suggests age.</li>
<li><b>Tears</b>, or legs, suggest alcohol and sugar, but loosely.</li>
<li><b>Gas bubbles</b> in a still wine suggest early bottling or a cool-climate white handled without air.</li></ul>
<p>Each of these has a physical cause, and the cause tells you how far to trust it.</p>
<p><b>Why red wine changes color.</b> The pigments of red wine come from the grape skin, and a thicker skin gives a deeper color. In a young wine the pigments are free, and they are purple-red, the more so the more acidic the wine. Over the years they link up with tannins into larger pigments that are brick-red and orange, and the largest eventually fall out as sediment. So color moves in one direction, from purple toward brick, and fades as it goes. The rim shows the change first, because there the wine is thin and you see its true hue instead of its depth.</p>
<p><b>Why white wine darkens.</b> White wine has no red pigment. It deepens because compounds from the grape slowly react with oxygen and brown, as a cut apple does. Deep gold in a white can therefore mean age, time in oak barrels, grapes affected by the fungus that makes sweet wines, or simply very ripe fruit from a warm place.</p>
<p><b>What tears are.</b> Swirl a glass and a film of wine coats the inside. Alcohol evaporates from that thin film faster than water does. The film left behind, now more watery, has a stronger surface tension than the wine below, and it pulls more liquid up the glass until the weight gathers into drops that run back down. More alcohol gives more pronounced tears. Sugar makes the wine more viscous, so the drops form and fall more slowly. Tears say nothing about quality, and the common belief that they show glycerol is wrong.</p>
<table><tr><th>You see</th><th>It suggests</th></tr>
<tr><td>Green glints in a white</td><td>Youth; often a cool climate</td></tr>
<tr><td>Deep gold in a white</td><td>Age, oak, botrytis or a warm climate</td></tr>
<tr><td>Purple rim in a red</td><td>Youth. Very strong in Malbec and young Syrah</td></tr>
<tr><td>Orange or brick rim</td><td>Age; in a young wine, Nebbiolo or Sangiovese</td></tr>
<tr><td>Tears stained with color</td><td>Thick skins and high extract: Syrah, Malbec, Petite Sirah</td></tr>
<tr><td>Thick, slow tears</td><td>High alcohol or sugar</td></tr>
<tr><td>Tiny bubbles in a still white</td><td>Bottled young and cold with a little CO₂: Vinho Verde, young Riesling, Muscadet</td></tr>
<tr><td>Sediment</td><td>Bottle age or an unfiltered wine</td></tr></table>
<p>The orange rim on a young, pale red is worth singling out. <b>Nebbiolo</b> has little pigment and a great deal of tannin, so its color shifts toward orange within a few years, far sooner than other grapes. A wine that looks ten years old and tastes three is a strong hint.</p>
<p>Sight is the quickest stage and the one most likely to mislead, because of the effect described above. Record what you see, form no conclusion from it, and move on.</p>

<h3>How smell works, and how to use it</h3>
<p>Smell does most of the work in tasting, and it is worth understanding before the second stage.</p>
<p>At the top of the nasal cavity is a small patch of tissue carrying about four hundred different kinds of receptor. No receptor corresponds to a single smell. Each odor molecule triggers its own combination, and the brain reads the pattern. That is how a few hundred receptors distinguish an enormous range of smells, and it is also why smells are hard to name: there is no "cherry receptor" to consult, only a pattern you have met before and labeled.</p>
<p><b>You smell twice.</b> <b>Orthonasal</b> smell is through the nostrils, glass to nose. <b>Retronasal</b> smell happens when you swallow or breathe out with wine in your mouth and aroma travels up the back of the throat to the same receptors. Most of what people call "taste" is retronasal smell. The tongue itself reads only sweet, sour, salty, bitter and umami. Hold your nose while eating a jelly bean and you get sweetness and nothing else. Let go and the flavor arrives.</p>
<p>Three properties of the system dictate technique.</p>
<ul><li><b>It adapts fast.</b> Receptors stop responding to a constant smell within seconds, which is why you cease to notice the smell of a room you have been sitting in. <b>The nose tires within seconds</b>, so three short sniffs tell you more than one long one. Between sniffs, move the glass away.</li>
<li><b>It can be reset.</b> Smell something neutral and familiar, your own sleeve or a glass of water, and the receptors recover.</li>
<li><b>The first impression is the cleanest.</b> It is formed before adaptation and before you have begun to talk yourself into an answer. Write it down before you start to argue with it.</li></ul>
<p>Swirl to coat the glass, which spreads the wine over a large surface and releases aroma. In the mouth, draw a little air through the wine. It looks odd and it works: it drives aroma up the back of the nose.</p>
<p>Naming is the hard part, for everyone. A smell can be intensely familiar and still have no word attached. The only cure is deliberate practice: smell the things themselves, in the kitchen and the garden, say the word aloud, and do it again. A taster's vocabulary is built on memory of real lemons, real wet stone and real leather, not on wine.</p>

<h3>Stage 2: Nose</h3>
<p>First check for faults. Then judge intensity (delicate to powerful) and age (youthful, developing, or vinous, meaning the fruit has receded and the wine smells of maturity). Then name aromas in families, always in the same order so that you never skip one.</p>
<table><tr><th>Family</th><th>Words to reach for</th></tr>
<tr><td>Fruit (whites)</td><td>Citrus (lemon, lime, grapefruit); tree (apple, pear); stone (peach, apricot); tropical (pineapple, mango, passion fruit); melon</td></tr>
<tr><td>Fruit (reds)</td><td>Red (cherry, raspberry, cranberry, strawberry); black (blackberry, cassis, plum); blue (blueberry); dried (fig, raisin, prune)</td></tr>
<tr><td>Fruit condition</td><td>Tart, just ripe, ripe, jammy, baked, dried, stewed</td></tr>
<tr><td>Floral and herbal</td><td>Rose, violet, orange blossom; mint, thyme, sage, cut grass, tomato leaf, green pepper</td></tr>
<tr><td>Spice</td><td>Black or white pepper, licorice, clove, cinnamon</td></tr>
<tr><td>Earth</td><td>Forest floor, mushroom, wet leaves, potting soil, barnyard, truffle</td></tr>
<tr><td>Mineral</td><td>Wet stone, chalk, flint, slate, saline</td></tr>
<tr><td>Oak</td><td>Vanilla, toast, smoke, clove, coconut, dill, coffee</td></tr></table>
<p>For each family, ask first "is it there?" and only then "which one?" The order matters because of adaptation and attention. Whatever is strongest captures the nose, and the quieter families, earth and mineral above all, are missed unless you go looking for them one at a time.</p>
<p><b>The condition of the fruit is the strongest climate clue you have.</b> Tart fruit means cool. Ripe fruit means moderate. Baked or jammy fruit means warm. The reason is in how grapes ripen. As a grape hangs on the vine it gains sugar, loses acid, and its flavor compounds change, from green and citrus through fresh fruit to cooked and dried fruit. In a cool place the grape is picked before it gets far along that path. In a hot place it goes all the way. So the same grape variety gives lemon and green apple in a cool region and pineapple and baked apple in a hot one, and the fruit tells you the temperature more reliably than it tells you the grape.</p>
<p>The other families point elsewhere. Flowers, herbs and spice often identify the grape variety. Earth and mineral notes, in the classic view, lean toward the traditional regions of Europe. Oak tells you about the winemaker's choices and the wine's ambitions.</p>

<h3>Stage 3: Palate</h3>
<p>Confirm the nose, since the mouth warms the wine and releases aromas the glass did not. Then measure <b>structure</b>: sweetness, acidity, alcohol, tannin and body. The next chapter treats each in depth.</p>
<p>Structure is harder to fake than aroma, so experienced tasters trust it most. Aroma is a few millionths of the wine and can be shaped by the choice of yeast, by oak, by fashion. Structure is the bulk composition: how much acid, how much alcohol, how much tannin. Those are set by the grape and the climate and are hard to disguise. <b>A red can smell of ripe cherry, but if its acid is high and its tannin grips like strong black tea, think Nebbiolo or Sangiovese</b>, not Grenache.</p>
<p>Finish with three judgments of quality.</p>
<ul><li><b>Balance:</b> does any element stick out? Sweetness without acid cloys. Alcohol without fruit burns.</li>
<li><b>Length:</b> how long does the pleasant flavor last after you spit or swallow?</li>
<li><b>Complexity:</b> how many different things are there to notice, and does the wine change in the glass?</li></ul>

<h3>Stage 4: Conclusion</h3>
<p>The <b>initial conclusion</b> narrows the field: climate, possible grapes, possible countries and an age range. The <b>final conclusion</b> commits: grape, country, region, quality level, vintage. The reasoning runs in one direction, from the most reliable evidence to the least.</p>
<ol><li>Fruit condition and structure point to <b>climate</b>.</li>
<li>Earth and mineral against fruit point to <b>style and likely countries</b>: savory and earth-led, or fruit-led. Tasters long called this "Old World versus New World." The Court dropped those words from its grid in 2024 because warm vintages and modern winemaking had blurred the line, so name countries instead.</li>
<li>Structure markers and signature aromas point to the <b>grape</b>.</li>
<li>Oak type and winemaking signatures point to the <b>region and style</b>.</li></ol>
<p>The order guards against the commonest error in tasting, which is to recognize a wine in the first sniff and then spend the rest of the time finding reasons. Psychologists call this confirmation bias. Once a name is in your head, every observation seems to support it and contrary evidence goes unnoticed. The grid makes you collect everything before you are allowed to name anything.</p>
<p>It also explains how the exams are marked. On the Court's grid each correct observation earns a point, and wrong ones are not penalized, so a taster who describes the wine accurately and reasons soundly scores well even with the wrong grape at the end. The marks are for the evidence and the logic. The name is the last line.</p>

<h3>A wine, start to finish</h3>
<p>Here is the method applied to one glass, with the reasoning shown. Read it as a model of the order of thought, not of the vocabulary.</p>
<p><b>Sight.</b> Clear. Pale lemon with green glints. No rim variation. Thin, quick tears. A few tiny bubbles cling to the glass.</p>
<ul><li>Pale with green suggests youth. Quick tears suggest modest alcohol. The bubbles suggest a wine bottled young and cold. Nothing here is a conclusion yet.</li></ul>
<p><b>Nose.</b> Clean, with no faults. Moderate-plus intensity. Youthful.</p>
<ul><li>Fruit: lime, green apple, white peach. The fruit is tart to just ripe.</li>
<li>Non-fruit: white flowers, a faint smell like petrol or a struck stone.</li>
<li>Earth and mineral: wet slate.</li>
<li>Oak: none.</li></ul>
<p>Tart fruit says cool climate. No oak says the winemaker wanted the fruit alone. The petrol note is rare enough to be worth remembering.</p>
<p><b>Palate.</b> The lime and peach are confirmed. There is noticeable sweetness, though the wine does not taste sugary. Acidity is high: the mouth waters for a long time. Alcohol is low, with no warmth at all. Light body. No tannin. The finish is long.</p>
<ul><li>Sweetness with low alcohol means the fermentation was stopped early. High acid confirms the cool climate and explains why the sugar seems modest. Pinching the nose leaves the sweetness in place, so it is real sugar.</li></ul>
<p><b>Initial conclusion.</b> A cool climate. A young wine, one to three years. An aromatic white grape with high acid, made with no oak and some sugar left in. The candidates are Riesling and Chenin Blanc.</p>
<p><b>Final conclusion.</b> The petrol and slate, the low alcohol and the lightness point to Riesling over Chenin, which would be fuller, with a waxy texture and notes of quince or honey. High acid, low alcohol and residual sugar together point to Germany, and the lightness and slate to the Mosel. The wine is good, with a long finish, but light: Kabinett level. Riesling, Germany, Mosel, Kabinett, two years old.</p>
<p>Notice what carried the weight. Structure did the first sorting: sweet, low alcohol and high acid left only a handful of possibilities. Aroma then chose among them. And if the final call had been wrong, say an Australian Riesling, nearly every line of the description would still have been right.</p>

<h3>The two systems side by side</h3>
<table><tr><th></th><th>Court grid (Floor)</th><th>WSET SAT (Analyst)</th></tr>
<tr><td>Purpose</td><td>Deduce what the wine is</td><td>Describe the wine and judge its quality</td></tr>
<tr><td>Form</td><td>Written at Certified; spoken at Advanced and Master</td><td>Always written</td></tr>
<tr><td>Scales</td><td>Low to high, with plus and minus steps</td><td>Three steps at Level 2, five at Level 3</td></tr>
<tr><td>Ends with</td><td>Grape, country, region, quality level, vintage</td><td>Quality level with reasons, and readiness to drink</td></tr></table>
<p>The skills overlap almost entirely. A taster trained in one can learn the other's vocabulary in a week. The difference is in what each is for. A sommelier must identify and sell. A buyer or critic must assess and explain. Both begin with the same accurate description.</p>

<h3>Setting up a tasting</h3>
<p>Every instruction here controls a variable that would otherwise distort the result.</p>
<ul><li><b>White surface, daylight or neutral light.</b> Colored light changes apparent color, and color changes what you smell.</li>
<li><b>No fragrance, gum or coffee,</b> and taste at the same time of day. Late morning, before lunch, is when most people are sharpest.</li>
<li><b>The same glass and the same pour every time,</b> about 1.5 oz (45 ml) in a standard tasting glass. Depth of color means something only if the depth of wine is constant, and the shape of the glass changes how much aroma reaches the nose.</li>
<li><b>Order:</b> sparkling, then light whites, full whites, light reds, full reds, sweet, fortified. Dry before sweet and light before heavy. A sweet wine makes the next dry one taste sour, and a tannic one numbs the mouth for whatever follows.</li>
<li><b>Cover the bottles and number them.</b> Knowing even the price changes what you taste.</li>
<li><b>A spit cup, water, plain crackers.</b> Spit. A Certified exam is four wines, and a practice session can be twelve. Alcohol dulls judgment long before you feel it.</li>
<li><b>Say your notes aloud, in grid order, every time.</b> The Advanced and Master tasting exams are spoken, and saying the word is how a smell gets its label.</li>
<li><b>Write.</b> Notes you cannot reread teach you nothing.</li></ul>

<h3>Five habits that hold beginners back</h3>
<ol><li><b>Naming the grape first</b> and then finding evidence for it. This is the most damaging habit, for the reason given above.</li>
<li><b>Confusing ripe fruit with sweetness.</b> A wine can smell of ripe peaches and contain no sugar at all. Sweetness is judged on the tongue, not the nose.</li>
<li><b>Describing only fruit</b> and skipping earth, mineral and oak.</li>
<li><b>Sitting on "medium"</b> for every structural call. It feels safe and it carries no information. Decide which side of medium the wine is on.</li>
<li><b>Tasting without writing.</b></li></ol>

<h3>How to practice</h3>
<p>Skill comes from comparison. A single wine tasted alone gives you nothing to measure it against, and the memory fades. Two wines side by side that differ in one respect, a cool-climate and a warm-climate Chardonnay, an oaked and an unoaked one, a young and an old Rioja, teach that one difference permanently.</p>
<ul><li>Taste in pairs or flights built around a single question.</li>
<li>Taste the classics first. Exam wines are chosen to be typical, and a clear mental picture of twenty classic wines is worth more than a vague one of two hundred.</li>
<li>Taste with others and compare notes after writing, never before. Agreement on structure comes quickly. Agreement on aromas takes longer and matters less.</li>
<li>Go back to the same wine a week later. Recognition is the test of whether the memory took.</li></ul>
<p>The method is the same whether the wine is a simple one on a weeknight or an exam wine under a clock: look, smell, taste, and only then decide. Done often enough, it stops feeling like a procedure and becomes the way you notice.</p>
`,
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
summary:"What sweetness, acidity, tannin, alcohol and body are physically, how each is felt, kitchen experiments to calibrate them, and how the elements disguise one another.",
body:`
<p>Aromas vary between bottles and between noses. Structure does not, which is why it is the backbone of deduction. Structure means the things you feel and taste, as opposed to smell: sweetness, acidity, tannin, alcohol and body. These are the bulk of what is dissolved in a wine, they are set mainly by the grape and the climate, and two tasters who disagree about whether a wine smells of plum or cherry will usually agree that it is high in acid. Calibrate each element once with household experiments and you will trust it in an exam room.</p>
<p>This chapter explains what each sensation is, physically, because that is what makes the calibration stick. It also explains how the elements disguise one another, which is where most tasting errors come from.</p>

<h3>What the mouth can sense</h3>
<p>The mouth has three separate systems, and wine uses all of them.</p>
<ul><li><b>Taste.</b> Receptors on the tongue and palate detect five things: sweet, sour, salty, bitter and umami. The old diagram that assigns sweet to the tip of the tongue and bitter to the back is wrong. Every taste can be sensed wherever there are taste buds, though the edges of the tongue are more sensitive than the middle.</li>
<li><b>Touch.</b> The mouth feels weight, viscosity, temperature, the prickle of gas and the roughness of astringency. Tannin is felt, not tasted.</li>
<li><b>Irritation.</b> Nerves that register pain and heat respond to alcohol, as they do to chili. The warmth of a strong wine is this system at work.</li></ul>
<p>Flavor, in the everyday sense, is these three combined with smell from the back of the nose. Structure is the part that remains if you hold your nose.</p>

<h3>Sweetness</h3>
<p><b>Residual sugar</b> (RS) is the grape sugar left unfermented. Most people sense it from about 4 to 10 grams per liter. Below that a wine tastes dry even though it is rarely at zero.</p>
<p>Sweetness is the element most often misjudged, in both directions, because other things imitate and conceal it.</p>
<ul><li><b>Acid masks it.</b> Sourness and sweetness suppress each other in the brain. A German Kabinett with 40 g/L can taste only off-dry, because its acidity is so high. Champagne labeled Brut may hold 10 grams and taste dry.</li>
<li><b>Fruit imitates it.</b> Ripe, fruity aromas are learned from sweet foods, and the brain supplies the sweetness it expects. This is the commonest error in tasting: calling a dry wine sweet because it smells of ripe peaches. Vanilla from oak does the same.</li>
<li><b>Alcohol imitates it.</b> Alcohol itself tastes faintly sweet, and a high-alcohol dry wine can seem to have sugar.</li></ul>
<p>The test is simple. Pinch your nose and taste. Real sugar is still there on the tongue. The sweetness that came from fruit or oak disappears.</p>
<p><b>Scales.</b> The Court uses: bone dry, dry, dry with slight RS, off-dry, medium-sweet, sweet, lusciously sweet. WSET Level 3 uses: dry, off-dry, medium-dry, medium-sweet, sweet, luscious.</p>
<p><b>Experiment:</b> dissolve 1, 2 and 4 teaspoons of sugar in separate glasses of water and taste them in order. Then add a squeeze of lemon to each and taste again. Notice how acid hides sugar: the sweetest glass now tastes like the middle one did.</p>

<h3>Acidity</h3>
<p>Acid is what makes wine taste fresh, and it is the element that most reliably separates cool climates from warm ones.</p>
<p>You taste it as sourness, but the most dependable sign is what happens next. <b>Acid makes your mouth water</b>, most noticeably along the sides of the tongue and under it, where the salivary glands empty. Saliva is slightly alkaline, and the mouth releases it to neutralize acid. The more acid, the stronger and longer the flow. So the measure is not how sour the wine tastes, which sugar and alcohol can disguise, but how much you salivate afterward.</p>
<p><b>Experiment:</b> take a sip, spit or swallow, tip your head forward with your mouth slightly open, and count how long the saliva keeps coming. A few seconds is low. A long, steady stream is high.</p>
<p>Grapes lose acid as they ripen, and lose it faster in heat. So cool climates and grapes such as Riesling, Chenin Blanc, Sauvignon Blanc, Nebbiolo and Sangiovese retain high acid. Warm climates and grapes such as Viognier, Gewürztraminer and Grenache run low.</p>
<p>Low-acid wines feel soft, broad and sometimes flat. High-acid wines feel sharp, lean and long, since the salivation carries the flavor on. Acidity also sharpens the perception of tannin, a point that matters in the section on how the elements fool each other.</p>

<h3>Tannin</h3>
<p><b>Tannins</b> are compounds from grape skins, seeds and stems, and from oak barrels. They are what make red wine feel <b>drying and gripping on the gums</b>, a sensation called astringency.</p>
<p>The mechanism is unusual and worth knowing, because it explains several things about how tannin behaves at the table. Saliva is slippery because it contains proteins that coat and lubricate the mouth. Tannins bind to those proteins and pull them out of solution. The lubricating film is stripped away, and the surfaces of the mouth rub against each other. What you feel is friction. Astringency is therefore a sensation of touch, not a taste, and it has consequences.</p>
<ul><li><b>It builds.</b> Each sip removes more of the protective film, and saliva takes time to replace it. A tannic wine feels more astringent on the third sip than the first, and the tenth red wine in a tasting feels harsher than it would alone. Water and a pause restore the mouth.</li>
<li><b>It lingers.</b> Bitterness peaks early and fades. Astringency rises slowly and is strongest after you have spat or swallowed.</li>
<li><b>Protein and fat disarm it.</b> Tannin that has bound to the protein in meat or cheese is not free to bind to your saliva. This is the whole basis of pairing tannic red wine with steak.</li>
<li><b>It softens with age.</b> Over years, tannins join into larger molecules that bind less readily, and eventually fall out as sediment. This is why an old wine that was once harsh feels smooth.</li>
<li><b>People differ.</b> Those who produce less saliva feel tannin more strongly and for longer.</li></ul>
<p>Judge both <b>volume</b>, from low to high, and <b>texture</b>: silky, soft, fine-grained, gritty, coarse or stalky. Ripe tannins feel fine and even. Unripe ones feel hard and green, and often come with bitterness. Cabernet Sauvignon, Nebbiolo, Tannat and young Syrah are high. Gamay, Pinot Noir and Grenache are lower.</p>
<p><b>Experiment:</b> steep black tea for 1, 3 and 10 minutes and taste each, without milk. Tea is rich in tannin, and steeping extracts more. <b>Ten minutes is Barolo.</b> Then add milk to the strongest cup and taste again: the milk protein takes up the tannin, and the astringency vanishes.</p>

<h3>Alcohol</h3>
<p>Alcohol does several things at once, which is why it is harder to judge than it sounds.</p>
<ul><li><b>Warmth.</b> High alcohol is felt mainly as <b>warmth at the back of the throat</b> and in the chest after swallowing. Alcohol triggers the same nerve receptor that responds to heat and to chili pepper, so the burn is a real signal of heat, not a taste.</li>
<li><b>Weight.</b> Alcohol is more viscous than water and is the main source of body in a dry wine.</li>
<li><b>Sweetness and bitterness.</b> At low levels alcohol tastes faintly sweet. At high levels it adds bitterness and burn. People vary in which they notice, partly by inheritance.</li></ul>
<table><tr><th>Level</th><th>Still wine</th><th>Examples</th></tr>
<tr><td>Low</td><td>Under 11%</td><td>Mosel Kabinett, Moscato d'Asti</td></tr>
<tr><td>Medium</td><td>11 to 13.9%</td><td>Most table wine</td></tr>
<tr><td>High</td><td>14% and above</td><td>Zinfandel, Châteauneuf-du-Pape, Amarone</td></tr></table>
<p>Alcohol comes from sugar, and sugar from ripeness, so warm climates give stronger wines. Alcohol is one of the two best clues to climate, along with the condition of the fruit.</p>
<p><b>How to judge it:</b> swallow a small sip, or breathe out through the nose after spitting, and attend to the throat. No warmth is low. A gentle glow is medium. Heat that spreads and lingers is high. Do not judge by the nose, where alcohol only prickles, and do not judge by the tears on the glass.</p>

<h3>Body</h3>
<p><b>Body</b> is the overall weight of the wine on the palate. Think skim milk, whole milk, cream.</p>
<p>It is the sum of everything dissolved in the wine, and two things dominate. Alcohol is the main contributor in dry wine. Sugar is the main one in sweet wine, where it thickens the liquid noticeably. Dissolved solids from the grape, which winemakers call extract, add a little, as do tannin in reds and compounds from lees aging in whites.</p>
<p>One common belief should be dropped. Glycerol, a by-product of fermentation with a syrupy feel in pure form, is often credited with giving wine its body and its legs. In experiments, adding glycerol at the levels found in wine makes no detectable difference to how thick the wine feels. Alcohol and sugar do the work.</p>
<p>Body usually tracks alcohol, so a wine that is full-bodied at low alcohol, or light at high alcohol, is telling you something: sugar in the first case, very high acidity in the second.</p>

<h3>Bitterness, texture and the finish</h3>
<p>Three more things belong to structure, and each is a clue.</p>
<p><b>Phenolic bitterness</b> is a light bitter grip at the end of some white wines, like grapefruit pith or almond skin. It comes from compounds in grape skins, and it marks Gewürztraminer, Pinot Gris, Viognier, Torrontés, Grüner Veltliner and any white made with skin contact. It is not tannin and it is not a fault. Sensitivity to bitterness varies widely from person to person, for genetic reasons, so do not be surprised if a tasting partner finds it obvious and you do not, or the reverse.</p>
<p><b>Texture</b> is how the wine feels apart from weight: oily (Gewürztraminer, Viognier), waxy (Sémillon, Chenin), creamy (from aging on yeast sediment and from the bacterial conversion that softens acid), chalky or grippy (young Nebbiolo), prickly (a trace of carbon dioxide in young Riesling or Vinho Verde).</p>
<p><b>Finish</b>, or length, is how long the pleasant flavors last after you swallow or spit. Count the seconds: under about five is short, five to ten is medium, longer is long. <b>A long finish is the most reliable sign of quality</b>, because it cannot be faked by ripeness or oak. It depends on the concentration of flavor in the grapes, which comes from low yields, good sites and old vines, things that cost money and cannot be added in the cellar. Watch that what lingers is flavor. A finish of alcohol burn or bitterness is long in the wrong way.</p>

<h3>How the elements fool each other</h3>
<p>The elements of structure are not perceived independently. Each changes how the others register, and a taster who knows the interactions can correct for them.</p>
<table><tr><th>What you taste</th><th>What may really be happening</th></tr>
<tr><td>"It's sweet"</td><td>Often ripe fruit, vanilla from oak or high alcohol in a dry wine. Pinch your nose: real sugar is still there on the tongue; fruit is not.</td></tr>
<tr><td>"It's dry"</td><td>High acid can hide 10 to 40 g/L of sugar, as in Champagne Brut or Mosel Kabinett.</td></tr>
<tr><td>"It's very tannic"</td><td>High acid makes tannin feel harder; so does serving the wine cold.</td></tr>
<tr><td>"It's full-bodied"</td><td>Sugar and alcohol both add weight. A sweet wine at 8% can feel fuller than a dry one at 12%.</td></tr>
<tr><td>"It's soft"</td><td>Low acid, a little sugar or ripe tannin: check which before you conclude "warm climate".</td></tr></table>
<p>The rules behind the table are few.</p>
<ul><li><b>Sweetness and acidity cancel.</b> Each makes the other seem less. Winemakers use this constantly: a little sugar rounds a sharp wine, and high acid keeps a sweet wine from cloying.</li>
<li><b>Sweetness softens tannin and bitterness.</b> This is why many inexpensive reds carry a few grams of sugar.</li>
<li><b>Acidity hardens tannin.</b> A wine high in both, such as young Barolo, feels more severe than its tannin alone would explain.</li>
<li><b>Alcohol softens the feel of tannin and adds bitterness and sweetness.</b></li>
<li><b>Temperature shifts everything.</b> Cold emphasizes acid, tannin and bitterness and mutes sweetness and aroma. Warmth emphasizes alcohol and sweetness. This is why reds are not served cold, why sweet wines are, and why an exam wine should be judged at the temperature it arrives at and with that in mind.</li></ul>
<p><b>Balance</b> is the state in which these interactions leave nothing sticking out. It is not the same as everything being moderate. A Mosel Riesling with very high acid and substantial sugar is balanced. So is a Port with high alcohol, high sugar and high tannin. A wine is unbalanced when one element has nothing to answer it.</p>

<h3>Between medium and high</h3>
<p>Both tasting systems ask you to place each element on a scale, and beginners find the middle of the scale hard. Three habits help.</p>
<ul><li><b>Decide the half first.</b> Before choosing a step, ask only whether the wine is above or below the middle. For acid: did my mouth water more or less than it does for an ordinary glass of white wine? That question is easy, and it eliminates half the scale.</li>
<li><b>Use anchors.</b> A scale means something only relative to fixed points. The calibration set at the end of this chapter gives you the ends. A wine is then "nearer the Chablis" or "nearer the Gewurztraminer."</li>
<li><b>Commit.</b> "Medium" for everything is the same as saying nothing. Examiners mark each structural call within a tolerance, so a confident "medium-plus" that should have been "high" still scores, while a row of hedged mediums suggests the taster did not look.</li></ul>
<p>The steps themselves are finer than they need to be for deduction. What separates one grape from another is nearly always a difference of half the scale: high acid against low, pale against opaque, grippy against soft. Get the half right and the fine steps follow with practice.</p>

<h3>The numbers behind the words</h3>
<table><tr><th>Element</th><th>Useful benchmarks</th></tr>
<tr><td>Sweetness</td><td>The EU calls a still wine dry up to 4 g/L (up to 9 if the acid is high). Off-dry runs to about 12, medium to about 45, sweet above 45. Sauternes holds 120 to 150; Pedro Ximénez over 400.</td></tr>
<tr><td>Acidity</td><td>Total acidity of about 5 to 9 g/L; pH from about 2.9 (Champagne base, Mosel) to 3.9 (ripe warm-climate reds). Lower pH tastes sharper.</td></tr>
<tr><td>Alcohol (WSET, still)</td><td>Low under 11%; medium 11 to 13.9%; high 14% and above.</td></tr>
<tr><td>Alcohol (WSET, fortified)</td><td>Low 15 to 16.4% (Fino); medium 16.5 to 18.4%; high 18.5% and above (Port).</td></tr></table>
<p>The European rule on dryness is itself an admission of how sweetness and acid interact: a wine with up to 9 grams of sugar may be labeled dry provided its acidity is high enough to hide it.</p>

<h3>How structure becomes a clue</h3>
<p>Each element narrows the field, and combinations narrow it fast. The reasoning in each case comes from the grape and the climate.</p>
<ul><li><b>High acid + low alcohol + residual sugar in a white: German Riesling or Vouvray.</b> Low alcohol with sugar means the fermentation stopped early. High acid means a cool place. Few regions combine the two.</li>
<li><b>Low acid + high alcohol + oily texture + bitter finish: Gewürztraminer or Viognier.</b> These grapes lose acid quickly and need to be very ripe to develop their perfume. The bitterness comes from their skins.</li>
<li><b>Pale red + high acid + high tannin: Nebbiolo.</b> Pale color with heavy tannin is rare, since both come from the skin. Nebbiolo has thin pigment and thick tannin.</li>
<li><b>Pale red + high alcohol + low acid + soft tannin: Grenache.</b> A thin-skinned grape that needs heat and ripens to high sugar.</li>
<li><b>Deep red + high tannin + medium-plus acid + green note: Cabernet Sauvignon or Cabernet Franc.</b> Small, thick-skinned berries give color and tannin, and the family carries a green-pepper compound.</li></ul>
<p>Notice that the short list is produced by structure alone, before a single aroma is considered. This is the reason for calibrating: it lets structure do the first and most reliable sorting.</p>

<h3>Three wines read by structure alone</h3>
<p>To see how far structure goes without any aroma, take three red wines described only by what the mouth and eye report.</p>
<table><tr><th></th><th>Wine A</th><th>Wine B</th><th>Wine C</th></tr>
<tr><td>Color</td><td>Pale ruby, see-through</td><td>Deep purple, opaque</td><td>Pale garnet, orange rim</td></tr>
<tr><td>Sweetness</td><td>Dry</td><td>Dry, but seems rich</td><td>Dry</td></tr>
<tr><td>Acid</td><td>High</td><td>Medium-minus</td><td>High</td></tr>
<tr><td>Tannin</td><td>Low, silky</td><td>Medium-plus, ripe and smooth</td><td>High, firm and drying</td></tr>
<tr><td>Alcohol</td><td>Medium, 12.5 to 13%</td><td>High, 14.5 to 15%</td><td>High, about 14%</td></tr>
<tr><td>Body</td><td>Light</td><td>Full</td><td>Medium-plus</td></tr></table>
<ul><li><b>Wine A</b> is pale and low in tannin, so a thin-skinned grape. High acid and moderate alcohol mean a cool climate. The short list is Pinot Noir and Gamay, from somewhere like Burgundy, Beaujolais, Oregon or Germany.</li>
<li><b>Wine B</b> is opaque, so a thick-skinned grape. Low acid and high alcohol mean a warm climate and very ripe fruit. Smooth tannin fits ripeness. The short list is Malbec, Shiraz, Zinfandel or a warm-climate Cabernet, from Argentina, Australia or California.</li>
<li><b>Wine C</b> is the odd one: pale, yet heavily tannic, with an orange rim, high acid and high alcohol together. Pale color with heavy tannin is almost a signature. The answer is Nebbiolo, and so Barolo or Barbaresco.</li></ul>
<p>In each case the aromas, when you come to them, will choose within a short list that structure has already drawn up. A taster who smells cherry in all three and stops there has nothing to separate them. A taster who measured the structure first already knows they are three different kinds of wine.</p>

<h3>A six-bottle calibration set</h3>
<p>Buy these once and taste them side by side. Each pins down one end of a scale, so that "high" and "low" become things you have felt.</p>
<table><tr><th>Wine</th><th>What it calibrates</th></tr>
<tr><td>Mosel Riesling Kabinett</td><td>Low alcohol, high acid, real sugar</td></tr>
<tr><td>Muscadet or Chablis</td><td>High acid, bone dry, light body</td></tr>
<tr><td>Alsace Gewurztraminer</td><td>Low acid, high alcohol, oily texture, bitter finish</td></tr>
<tr><td>Beaujolais</td><td>Low tannin, high acid, light body</td></tr>
<tr><td>Barolo or Madiran</td><td>High tannin and high acid together</td></tr>
<tr><td>Zinfandel or Amarone</td><td>High alcohol, full body, soft acid</td></tr></table>
<p>Taste them in that order and do the experiments as you go: count the saliva after the Muscadet and after the Gewurztraminer, feel the throat after the Kabinett and after the Zinfandel, compare the gums after the Beaujolais and the Barolo. Then taste the Riesling with your nose pinched and find the sugar. An hour with these six bottles fixes the scales more firmly than months of tasting wines one at a time.</p>
`,
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
summary:"The cause behind each fault, from cork taint to smoke taint, which tells you whether air will help and whether the next bottle will be different, and how to handle a returned bottle.",
body:`
<p>Knowing faults is a service skill as much as a tasting skill. A guest sends back a bottle, and you need to know within a few seconds whether the wine is flawed or simply not to their taste, and how to handle both gracefully. That takes more than a list of smells. Each fault has a cause, and the cause tells you where it came from, whether the next bottle will have it too, and whether air will help. This chapter gives the cause for each. It assumes nothing from later chapters, so some mechanisms are stated briefly here and explained fully where they belong.</p>

<h3>A fault, a taint and a flaw</h3>
<p>Three words are used loosely and are worth separating.</p>
<ul><li>A <b>taint</b> comes from outside the wine: a moldy cork, smoke, a contaminated cellar.</li>
<li>A <b>fault</b> arises in the wine itself through something going wrong in the making or keeping: oxidation, bacterial spoilage.</li>
<li>A <b>flaw</b> is a lesser departure from what the wine should be, such as a touch too much oak or alcohol. It is a matter of judgment, not a defect.</li></ul>
<p>The distinction is practical. A taint from a cork affects one bottle, and the next from the same case will probably be fine. A fault from the winery usually affects every bottle of that wine, and opening another achieves nothing.</p>
<p>Most of these compounds are detectable in tiny amounts. Several are measured in nanograms per liter, parts per trillion. And people vary a great deal in sensitivity: for almost every fault below, some tasters are acutely sensitive and some cannot detect it at all. A guest who finds a wine corked when you do not may simply have a better nose for it.</p>

<h3>The main faults</h3>
<table><tr><th>Fault</th><th>Smells like</th><th>Cause</th></tr>
<tr><td>Cork taint (TCA)</td><td>Wet cardboard, damp basement, muted fruit</td><td>2,4,6-trichloroanisole, usually from cork. Detectable at parts per trillion.</td></tr>
<tr><td>Oxidation</td><td>Bruised apple, nutty, flat; browning color</td><td>Too much oxygen. Deliberate in Sherry and Tawny Port, a fault elsewhere.</td></tr>
<tr><td>Reduction</td><td>Rotten egg, struck match, cabbage, rubber</td><td>Sulfur compounds from too little oxygen. Mild struck-match reduction is a deliberate style in some white Burgundy.</td></tr>
<tr><td>Volatile acidity (VA)</td><td>Vinegar, nail-polish remover</td><td>Acetic acid bacteria and ethyl acetate. A little adds lift (Amarone, some Lebanon reds).</td></tr>
<tr><td>Brettanomyces</td><td>Barnyard, band-aid, sweaty saddle, smoked meat</td><td>Spoilage yeast in barrels. Debated: some love it in old Rhône.</td></tr>
<tr><td>Heat damage / out of condition</td><td>Cooked, stewed fruit, flat; pushed cork, seepage</td><td>Storage above about 80°F (27°C).</td></tr>
<tr><td>Excess SO₂</td><td>Burnt match, prickly nose</td><td>Heavy sulfiting; often blows off with air.</td></tr></table>

<h3>Cork taint</h3>
<p>Cork taint is the fault a sommelier meets most often and must recognize without hesitation. A wine that smells of <b>wet cardboard</b>, damp basement or moldy newspaper, <b>with muted fruit</b>, is corked.</p>
<p>The compound is TCA. It forms when molds that live in cork bark, or in wood, meet chlorine-containing chemicals, once common in pesticides, wood preservatives and the bleach used to clean corks. The molds convert these into TCA as a way of detoxifying them. It then sits in the cork and leaches into the wine.</p>
<ul><li><b>It is extraordinarily potent.</b> Most people detect it at one to three parts per trillion, and some at less.</li>
<li><b>It does two things.</b> At higher levels it smells musty. At lower levels, below the point where it can be smelled as itself, it suppresses the sense of smell, so the wine seems flat and stripped of fruit without smelling wrong. This is the commonest form and the hardest to call. The clue is a wine that should be expressive and is strangely mute.</li>
<li><b>It gets worse with air.</b> A faint case becomes obvious after ten minutes in the glass. If you are unsure, wait and smell again.</li>
<li><b>It is harmless</b> to drink, and it has nothing to do with bits of cork floating in the glass, which mean only that the cork crumbled.</li>
<li><b>The cork itself tells you little.</b> Smelling it is a poor test. Smell the wine.</li></ul>
<p>Surveys around 2000 found 5 to 8% of cork-sealed bottles affected. Cleaner processing and testing have brought that down to perhaps 1 to 3%. Screwcaps and treated technical corks avoid it.</p>
<p>Cork is not the only source. A related compound, TBA, forms from flame retardants and preservatives used on timber, and can contaminate a whole cellar: its barrels, hoses and stored bottles. Wineries have had to rebuild because of it. This is why a wine under screwcap can occasionally smell "corked," and why in that case every bottle will be the same.</p>

<h3>Oxidation</h3>
<p>An oxidized wine has had too much contact with air. A white turns deep gold and then brown. A red loses its purple and turns brick and then brown at the rim. The fresh fruit goes, and in its place come bruised apple, nuts, dried-out fruit and a flat, dull taste.</p>
<p>The bruised-apple smell is acetaldehyde, formed when oxygen converts a little of the wine's alcohol. The color change comes from the wine's phenolic compounds reacting to form brown pigments, the same chemistry that browns a cut apple. Sulfur dioxide and the wine's own tannins hold both back for a time.</p>
<p>The causes are a failed closure, a dried-out cork from a bottle stored upright or in dry air, age beyond the wine's span, or poor handling at the winery. A bottle open too long behind a bar is the everyday version.</p>
<p>Oxidation is a fault only when unintended. Oloroso Sherry, Tawny Port, Madeira, Vin Jaune and Rancio wines are deliberately oxidized, and their nutty character is the point. The test is whether the wine was meant to taste this way.</p>
<p><b>Premature oxidation</b> is the special case of a young white, usually white Burgundy, that is deep gold, flat and sherry-like years before it should be. It was notorious in wines from about 1995 to 2005 and affected bottles unpredictably, so that one in a case might be ruined and the rest fine. The suspected causes are gentler pressing, heavy lees stirring, lower sulfur dioxide and inconsistent corks.</p>

<h3>Reduction</h3>
<p>Reduction is the opposite problem: sulfur compounds that build up when a wine has too little oxygen. The term covers a family of smells of rising unpleasantness.</p>
<table><tr><th>Compound</th><th>Smell</th><th>Notes</th></tr>
<tr><td>Hydrogen sulfide</td><td>Rotten egg, drains</td><td>Made by yeast short of nitrogen. Volatile: often blows off with air</td></tr>
<tr><td>Mercaptans</td><td>Onion, garlic, rubber, cabbage</td><td>Formed from hydrogen sulfide left untreated. Harder to shift</td></tr>
<tr><td>Disulfides</td><td>Burnt rubber, cooked cabbage</td><td>Formed from mercaptans. Do not respond to air</td></tr>
<tr><td>Dimethyl sulfide</td><td>Canned corn, cooked vegetables; truffle and blackcurrant at low levels</td><td>Develops with bottle age; part of the bouquet of old wine in small amounts</td></tr></table>
<p>At a low level, reduction gives a smell of <b>struck match</b> or gunflint, which is prized in some white Burgundy and Chardonnay made in that style. At a higher level, as <b>rotten egg</b>, cabbage or rubber, it is a fault.</p>
<p>Reduction is common under screwcap, which admits very little oxygen, and in wines kept long on their lees. It is the one fault a sommelier can sometimes fix at the table. Pour the wine into a decanter and swirl. Simple hydrogen sulfide escapes within minutes. An old trick is to drop a clean copper coin into the glass: copper binds these compounds, and if the smell disappears the diagnosis is confirmed. If decanting does nothing, the heavier compounds are responsible and the wine will not recover.</p>

<h3>Volatile acidity</h3>
<p>All wine contains a little acetic acid, the acid of vinegar, made by yeast during fermentation. Volatile acidity becomes a fault when bacteria add to it. Acetic bacteria need two things, alcohol and air, so the cause is nearly always a wine left exposed: a barrel not topped up, a tank with a headspace, damaged grapes, or a slow, warm fermentation.</p>
<p>Two compounds are involved, and they smell different. <b>Acetic acid</b> smells of vinegar and gives a sour, sharp finish. <b>Ethyl acetate</b>, which forms alongside it, smells of nail-polish remover or glue, and is detectable at much lower levels. A wine can show one more than the other.</p>
<p>The law sets limits. In Europe they are about 1.1 grams per liter for white and rosé wines and 1.2 for red. In the United States they are 1.2 for white and 1.4 for red. Most wines hold 0.3 to 0.6. Sweet wines from rotten or frozen grapes are allowed more, because the yeast in them, working under stress, produce it unavoidably.</p>
<p>Below the level of a fault, volatile acidity lifts the smell of a wine and can make it seem fresher and more complex. <b>A trace in Amarone is part of the style, unless it dominates</b>, and the same is true of old Barolo, traditional Rioja, some Lebanese reds and many old vintages of great wines made before modern hygiene. It does not improve with air and does not fade.</p>

<h3>Brettanomyces</h3>
<p>"Brett" is a yeast that lives in wineries, above all in used barrels, and can grow in finished wine on almost nothing. It converts compounds from grape skins into others with strong smells: <b>barnyard and band-aid</b> from one, smoky and spicy clove from another, sweaty or cheesy from a third. Which dominates depends on the strain and the grape, so Brett can show as medicinal in one wine and as smoked meat or leather in another.</p>
<p>It favors red wines, low acidity, low sulfur dioxide and warm cellars. It often comes with a drying, metallic finish and a loss of fruit.</p>
<p>Brett is the most argued-over fault in wine. In small amounts some tasters find it adds a savory, leathery complexity, and it was long part of the character of many traditional reds of the Rhône, Bordeaux and Italy, where it was sometimes mistaken for the taste of the place. Others reject it at any level. The modern consensus is that a wine dominated by it, where every wine from that cellar smells the same and the fruit is gone, is faulty. It affects the whole batch, though bottles can vary, since the yeast may go on working in some and not others.</p>

<h3>Heat damage</h3>
<p>Wine is perishable, and heat is what perishes it. Chemical reactions run roughly twice as fast for every 18°F (10°C) rise, so a week in a hot truck ages a wine by months, and unevenly, without the slow development that makes aging worthwhile. Storage above about <b>80°F (27°C)</b> does lasting harm.</p>
<p>A heat-damaged wine tastes <b>cooked</b>: stewed, jammy fruit, a flat or caramelized note, no freshness. Wine expands as it warms, so the physical signs are often visible before the bottle is opened: a cork pushed up above the lip of the bottle, sticky seepage under the capsule, a low fill. The trade word for such wine is "maderized," after Madeira, which is heated on purpose. A wine can also be "out of condition" simply from age or poor storage, tired without being cooked.</p>
<p>Most heat damage happens in shipping and in shops, not at the winery. It is the reason serious importers ship in refrigerated containers, and the reason to be wary of bottles displayed in a sunny window or near a heater.</p>

<h3>Excess sulfur dioxide</h3>
<p>Sulfur dioxide is added to nearly all wine as a preservative. Too much free sulfur dioxide gives a sharp, <b>burnt-match</b> smell that prickles the nose and can make sensitive people sneeze. It is commonest in young white wines and sweet wines, which need the most, and in wines bottled recently. It is a different smell from the struck-match note of reduction, sharper and more irritating, though the two are easily confused. It usually blows off with air and fades with time in bottle.</p>

<h3>The faults that catch out good tasters</h3>
<table><tr><th>Fault</th><th>How it shows</th><th>What is going on</th></tr>
<tr><td>Light strike</td><td>Cabbage, wet wool, struck match in a pale wine from a clear bottle</td><td>Ultraviolet light reacts with riboflavin and sulfur amino acids. Minutes in bright sun can do it to rosé or Champagne.</td></tr>
<tr><td>Mousiness</td><td>Nothing on the nose; a stale, cracker or mouse-cage taste seconds after swallowing</td><td>Compounds from lactic bacteria or Brettanomyces in low-sulfite, high-pH wines. Not everyone can perceive it.</td></tr>
<tr><td>Smoke taint</td><td>Ash, campfire, burnt rubber, a drying finish</td><td>Volatile phenols absorbed by grapes during wildfires, bound to sugars and released later.</td></tr>
<tr><td>Premature oxidation</td><td>A young white that is deep gold, flat and sherry-like</td><td>Too little protection from oxygen; notorious in white Burgundy of about 1995 to 2005.</td></tr>
<tr><td>Refermentation</td><td>Fizz and haze in a wine meant to be still</td><td>Yeast or bacteria active in the bottle, often with leftover sugar.</td></tr>
<tr><td>Geosmin</td><td>Beetroot, damp earth</td><td>Mould on damaged grapes.</td></tr></table>
<p><b>Light strike.</b> Wine contains a little vitamin B2, which absorbs ultraviolet and blue light and then attacks sulfur-containing amino acids, releasing compounds that smell of <b>cabbage and wet wool</b>. Clear glass gives no protection, and pale wines have none of their own. In tests, sparkling wine in clear glass under shop lighting was spoiled in a few hours, and direct sun can do it within an hour. It is the commonest fault in rosé, and it happens after the wine has left the winery. Take stock from the box, not the display.</p>
<p><b>Mousiness</b> is the fault most associated with wines made without sulfur dioxide. Its compounds are not volatile at the acidity of wine, so there is nothing to smell. In the mouth, saliva neutralizes the acid and releases them, and a taste of stale crackers or a mouse cage appears on the finish <b>some seconds after swallowing</b>, building with each sip. A sizable minority of people cannot perceive it. It can appear and disappear as an opened bottle takes up air. Always taste, and wait a moment, before pouring such a wine for a table.</p>
<p><b>Smoke taint</b> has become a major problem as wildfires have grown more frequent, in Australia from 2003 and in California, Oregon and Washington in several years since 2008, most severely in 2020. Smoke carries compounds from burning wood that pass through the grape skin. Inside, the grape attaches each to a sugar, which makes it odorless. Juice from smoke-exposed grapes can therefore smell clean. The compounds are freed again during fermentation, during aging, and, most strangely, in the drinker's mouth, where enzymes in saliva split them. The result is a wine that may smell only faintly smoky and then leaves a lingering taste of <b>ash</b> or a cold ashtray. Red wines suffer most, because they are fermented with the skins. It cannot be washed off the grapes, it can worsen in bottle, and it is so potent that blending a tainted wine away is rarely possible. Many producers in bad years simply do not release a wine.</p>
<p><b>Refermentation.</b> A still wine that is fizzy and cloudy, perhaps with a pushed cork, has started fermenting again in the bottle. Yeast found leftover sugar, or bacteria found malic acid. It is most likely in unfiltered wines and in sweet wines bottled without enough protection. Do not confuse it with the faint prickle of dissolved carbon dioxide left deliberately in many young whites, such as Muscadet and Vinho Verde, to keep them fresh.</p>
<p><b>Geosmin</b> is the compound that gives beetroot and freshly turned soil their smell. In wine it comes from molds growing on rotten or damaged grapes, and it smells of <b>beetroot and damp earth</b>. It marks a wet harvest and poor sorting, and affects the whole batch.</p>

<h3>Not faults</h3>
<ul><li><b>Tartrate crystals</b>, sometimes called wine diamonds, are harmless potassium bitartrate, the same substance as cream of tartar. Clear or white in white wine and stained red in red, they form when a wine is chilled. They are a sign that the wine was not heavily processed.</li>
<li><b>Sediment</b> in an old red is normal. It is color and tannin that have joined into particles too large to stay dissolved, and it calls for decanting.</li>
<li><b>Petrol in aged Riesling</b> is a varietal character, prized by many.</li>
<li><b>Cloudiness</b> in a wine sold as unfiltered is intended.</li>
<li><b>A crumbled cork</b> or cork fragments in the glass are a nuisance and nothing more.</li>
<li><b>A wine that is simply closed.</b> Young, tannic or recently bottled wines can be mute for a time and open with air. A closed wine has little smell and nothing wrong with what smell there is. A lightly corked wine is also mute, but usually has a faint mustiness and a short, stripped finish.</li></ul>

<h3>Fault or style?</h3>
<p>Many faults are a matter of degree. A whiff of struck match in white Burgundy, a little volatile acidity in Amarone, a trace of Brett in old Rhône and the bruised-apple tang of Fino are all prized by some drinkers. The professional test is whether the character dominates the wine and hides the fruit. If it does, call it a fault. If a guest simply dislikes a sound wine, replace it anyway and say nothing about who was right.</p>
<p>Three questions sort most cases.</p>
<ol><li><b>Is it intended?</b> Oxidation in Sherry is. Oxidation in a two-year-old Sancerre is not.</li>
<li><b>Does it dominate?</b> If it is the first and last thing you notice, it is a fault whatever its origin.</li>
<li><b>Will another bottle be different?</b> Yes for cork taint, light strike, heat damage to a single bottle and random oxidation. No for Brett, volatile acidity, reduction, mousiness, smoke taint and geosmin, which were in the wine when it was bottled.</li></ol>
<p>The third question decides what to do next. If another bottle will be different, open one. If it will not, offer a different wine.</p>

<h3>Handling a returned bottle</h3>
<p>Smell it yourself, discreetly, away from the table. If it is faulty, apologize, replace it, and do not argue. If it is sound but the guest dislikes it, most restaurants still replace it and pour the bottle by the glass. Either way, the guest should never feel foolish.</p>

<h3>At the table, step by step</h3>
<ol><li>Thank the guest for telling you and take the glass and bottle from the table.</li>
<li>Smell and taste it away from the guests. Cork taint often grows worse with air, so trust a second sniff. For a suspected mousy wine, taste and wait.</li>
<li><b>Faulty:</b> apologize, bring a fresh bottle with a clean glass, and let the host taste again. If the fault is one that affects the whole batch, suggest a different wine instead. Keep the bad bottle, with its cork, for your supplier, who will normally credit it.</li>
<li><b>Sound:</b> offer a different wine, and pour the returned bottle by the glass.</li></ol>
<p>The best protection is to catch the fault first. Smell every cork-sealed bottle as you open it, before pouring the taste. A sommelier who finds a corked bottle and replaces it before the guest has noticed has done the job perfectly, and the guest's confidence in the rest of the list goes up.</p>
`,
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
summary:"The decisions a grower makes once and the ones made every week, the hazards that undo them, and the competing philosophies of how to farm.",
body:`
<p>A grower makes two kinds of decision. The first kind is made once and lasts a generation: where to plant, which variety and rootstock, how far apart, and what shape to give the vine. The second kind is made every season and often every week: how many buds to leave, which leaves to pull, when to spray and with what, whether to water, when to pick. This chapter takes both in turn, then the hazards that can undo them, and ends with the competing philosophies of how a vineyard ought to be farmed. The thread running through all of it is the idea from the earlier chapter on the vine: a balanced plant, with enough leaf in the sun to ripen the fruit it carries and no more.</p>

<h3>Density and layout</h3>
<p>Burgundy, Champagne and much of Bordeaux plant about <b>10,000 vines per hectare</b>, a meter apart in each direction. Much of the New World plants 2,000 to 3,000, in rows wide enough for a standard tractor. The difference is one of the most visible in the wine world and one of the most argued over.</p>
<p>The traditional case for high density is competition. Vines planted close together share a limited volume of soil, so each stays small, stops growing early and carries only a few bunches. A hectare of such vines can produce a normal crop while each plant ripens very little, and many growers believe that a low load per vine is what matters for quality. History also played a part. Before phylloxera, vineyards were propagated by burying a cane from one vine to root a new one beside it, which produced a dense, unordered crowd of plants. Replanting on grafted vines required rows, and the rows were set at the width of a horse.</p>
<p>The case against is cost and water. Ten thousand vines need ten thousand stakes and four times the hand labor, and they need special narrow tractors that straddle the row. In dry climates, a dense planting drinks the soil dry sooner. Where land is fertile, close planting does not restrain the vines at all, and the result is a wall of shaded leaves. Research in Bordeaux has shown that yields per hectare rise with density, and that reducing density can lower costs and improve drought resistance without harming the fruit, so long as each vine remains in balance. The honest summary is that density is a tool for matching the vine to the soil. Poor, shallow, well-watered soils in cool climates suit close planting. Deep, fertile or very dry soils do not.</p>
<p>Rows usually run north to south, so that both faces of the canopy receive sun during the day. On steep slopes they follow the contour or sit on terraces, and on the steepest sites of all, such as the Mosel and Côte-Rôtie, each vine is tied to its own stake because no tractor or wire could work there.</p>

<h3>Training: the permanent shape</h3>
<p>Training is the form given to the vine's permanent wood, and there are two families.</p>
<p><b>Head training</b> keeps the vine as a short trunk with a knob of old wood at the top, from which a few spurs rise each year. With no wires it is called a bush vine, or <i>gobelet</i>. The canes flop outward and shade the fruit, the plant sits low and out of the wind, and it needs no irrigation hardware. It suits hot, dry, windy places and low yields, and it is the form of most of the world's oldest vineyards: the southern Rhône, old-vine Barossa, Zinfandel in Lodi, Priorat and much of southern Italy. It cannot be mechanized.</p>
<p><b>Cordon training</b> extends one or two permanent arms horizontally along a wire, with spurs spaced along them. The fruit hangs at one height in a neat line, which suits machine pruning and machine harvesting. Most New World vineyards are trained this way.</p>
<p>Above the permanent wood, the season's shoots have to be put somewhere, and that is the job of the trellis. By far the most common arrangement is <b>VSP, vertical shoot positioning</b>. The shoots are trained straight up between pairs of wires into a thin, upright curtain of leaves, with the bunches in a band along the bottom. VSP gives even sunlight on the fruit zone and good airflow through it, which means less disease, and it makes spraying, leaf removal and harvesting easy to mechanize. It suits vines of low to moderate vigor. A very vigorous vine forced into VSP produces a canopy too dense for light to penetrate.</p>
<table><tr><th>System</th><th>What it looks like</th><th>Where and why</th></tr>
<tr><td><b>Pergola</b> (parral, tendone)</td><td>An overhead roof of leaves with fruit hanging below</td><td>Rías Baixas, Vinho Verde, Valpolicella, Alto Adige: lifts fruit away from damp ground, lets air move beneath, and shades it from sun</td></tr>
<tr><td><b>Basket</b> (kouloura)</td><td>Canes woven into a low wreath on the ground</td><td>Santorini: shelters grapes from fierce wind and sun and traps dew</td></tr>
<tr><td>Single stake</td><td>One vine tied to one post</td><td>The Mosel and Côte-Rôtie: slopes too steep for wires</td></tr>
<tr><td>Divided canopy (Geneva Double Curtain, Lyre, Scott Henry)</td><td>The canopy split into two curtains, side by side or one above the other</td><td>Fertile, vigorous sites in the New World: doubling the canopy's surface gives a big vine room to spread its leaves in the sun</td></tr></table>

<h3>Pruning: setting the crop</h3>
<p>Fruit grows only on shoots that come from buds on one-year-old wood, so each winter the grower chooses which of last year's canes to keep and how many buds to leave. There are two methods, and they map onto the two families of training.</p>
<ul><li><b>Spur pruning</b> cuts each of last year's canes back to a stub of two or three buds, the spur, on permanent wood. It is quick, can be partly done by machine, and goes with cordons and bush vines.</li>
<li><b>Cane pruning</b>, of which the best-known form is <b>Guyot</b>, removes almost everything and lays down one new one-year cane (single Guyot) or two (double Guyot) along the wire each winter, with a short spur left to supply next year's cane. It takes judgment and time, since the pruner must pick the right cane on every vine. It is traditional in Burgundy, Bordeaux and most cool European regions, partly because some varieties carry little fruit on the buds nearest the base of the cane.</li></ul>
<p>The number of buds left is the grower's first control over the size of the crop, and a good pruner adjusts it vine by vine. Viticulturists have a rough measure of whether they got it right: the weight of the crop divided by the weight of the canes pruned off the following winter. A ratio between about 5 and 10 suggests a vine in balance. Below that, the vine grew too much wood for its fruit. Above it, the vine was overloaded.</p>

<h3>Canopy management</h3>
<p>The canopy is the leaves and shoots taken together, and managing it is the most important seasonal work after pruning. The principles were set out in the 1980s and 1990s, above all by the Australian viticulturist Richard Smart, and they turned much New World grape growing around. The argument is simple. A leaf in full sun works. A leaf in the shade of two or three others contributes almost nothing and may cost the vine more than it makes. Fruit hidden inside a dense canopy stays cool, damp and dark, which means more rot, less color, lower sugar, and more of the green pyrazine flavors that light would otherwise destroy. Many of the faults once blamed on high yields were really the faults of shade.</p>
<p>The targets that follow are specific. Shoots should be spaced a hand's width apart along the wire, so that the curtain of leaves is only one to one and a half leaves thick, and a person standing on one side can see patches of daylight through it. Shoots of about a meter to a meter and a half carry enough leaves to ripen their bunches. The growing season's operations are all means to those ends.</p>
<ul><li><b>Shoot thinning</b> in spring removes surplus and badly placed shoots while they are a few inches long.</li>
<li><b>Shoot positioning</b> tucks the growing shoots between the trellis wires.</li>
<li><b>Leaf removal</b> strips leaves from around the bunches. Timing matters. Done soon after fruit set, it exposes the young berries to light while they can still adapt by thickening their skins. Done late, around véraison, it risks sunburn on fruit that has grown up in shade.</li>
<li><b>Trimming or hedging</b> cuts the tops and sides of the canopy to stop it shading itself. Done too late, it only provokes a flush of new side shoots that compete with the fruit.</li></ul>
<p>The logic reverses with climate. In a cool, cloudy region the grower opens the canopy to catch every hour of sun and dry the bunches after rain. In a hot one the danger is sunburn and overheated fruit, and the grower leaves more leaf over the bunches, especially on the side that faces the afternoon sun. A question on canopy management is always really a question about what the fruit needs more of in that place: light and air, or shade.</p>

<h3>Yield</h3>
<p>Yield is measured in two ways that do not translate neatly. Europe counts the wine: <b>hectoliters per hectare</b> (hl/ha). The New World counts the grapes: tons per acre, or tonnes per hectare. As a working conversion, one tonne of grapes gives about seven hectoliters of wine, so one ton per acre is roughly 15 to 17 hl/ha.</p>
<p>European appellations cap yields in law. Grand Cru red Burgundy is limited to around 35 to 37 hl/ha, Sauternes to 25, and many regional appellations to 50 or 60, while wine made outside the appellation system can exceed 100. The caps rest on the old belief that fewer grapes mean better wine, and there is truth in it. A vine carrying more fruit than its leaves can ripen gives thin, dilute wine, and the laws were written to prevent exactly that.</p>
<p>But the relationship is not a straight line, and four qualifications matter.</p>
<ul><li><b>The limit is balance, not a number.</b> A vigorous vine on deep soil can ripen a large crop well, and cutting its crop only makes it grow more leaves. A weak vine on thin soil is overloaded by a crop that looks small.</li>
<li><b>Yield per hectare is not yield per vine.</b> Forty hectoliters from 10,000 vines is a small load on each plant. The same forty from 2,500 vines is four times as much on each.</li>
<li><b>Variety matters.</b> Pinot Noir loses color and flavor quickly as yield rises. Others, including many white grapes, are far more tolerant.</li>
<li><b>Low yields can be a symptom.</b> Old vines, virus, drought and frost all cut the crop, and not all of them improve the wine.</li></ul>
<p>When a vine has set more than it can ripen, the grower can remove bunches in midsummer, a <b>green harvest</b>. It is expensive, and if done too early the vine simply swells the remaining berries to compensate.</p>

<h3>Water and the vineyard floor</h3>
<p>The earlier chapter described what the vine wants from water: plenty in spring and a mild, steady shortage from fruit set onward. Where summer rain is unreliable, growers supply it by <b>irrigation</b>, almost always through drip lines that deliver measured amounts to each vine. The skilled use of irrigation is to withhold it. In what is called regulated deficit irrigation, the grower deliberately keeps the vine slightly short of water between fruit set and véraison to stop shoot growth and keep berries small, then gives just enough to carry the leaves through ripening. Irrigation was long banned in European appellations, on the reasoning that it would be used to inflate yields. A run of hot, dry years has forced many to permit it under conditions. Most of the New World could not grow grapes without it.</p>
<p>The ground between and beneath the rows is managed too. A grower can keep it bare by ploughing or by herbicide, or sow a <b>cover crop</b> of grasses, cereals and legumes. Cover crops hold the soil on slopes, feed soil life and build organic matter, and give tractors a firm surface in wet weather. They also compete with the vine for water and nitrogen, which is useful where vigor needs curbing and harmful where water is short, so in dry regions they are mown or ploughed in before summer. Legumes add nitrogen, and grasses take it away, so the choice of seed is itself a way of steering the vine.</p>

<h3>Frost</h3>
<p>Spring frost is the hazard that defines cool-climate viticulture, and understanding it starts with the fact that there are two kinds.</p>
<p>A <b>radiation frost</b> happens on a clear, still night. The ground loses its heat to the open sky, the air at vine height falls below freezing, and a layer of warmer air sits a few meters above, an arrangement called an inversion. This is the common kind, and it is the kind growers can fight, because there is warm air nearby to work with. An <b>advective freeze</b> is a mass of freezing air arriving on the wind. There is no warm layer, and almost nothing works against it.</p>
<p>Once the buds have opened, the young shoots are damaged by as little as half an hour at about 31°F (-0.5°C). The defenses fall into those that avoid the cold and those that add heat.</p>
<ul><li><b>Site.</b> Cold air drains downhill, so slopes escape frosts that settle in hollows. Choosing the site is the only protection that costs nothing each year.</li>
<li><b>Late pruning.</b> Pruning late in winter, or roughly at first and finishing only after the frost season, delays budburst by a week or more.</li>
<li><b>Wind machines.</b> A large fan on a tower pulls the warmer air of the inversion down and mixes it with the cold air at the vines. It gains only one to three degrees Fahrenheit, protects about ten acres, and is useless without an inversion. Helicopters do the same job at far greater cost.</li>
<li><b>Heaters and candles.</b> Burners among the rows warm the air directly. Protecting a vineyard by heat alone takes forty or fifty burners to the acre. The large paraffin candles lit in Chablis and Burgundy on frost nights are the same idea, and the photographs of vineyards glowing before dawn record a very expensive night.</li>
<li><b>Sprinklers.</b> This is the method that seems backward, and it is the most effective. Water gives off heat as it freezes: about 80 calories for every gram. If the vines are sprayed continuously, the freezing water keeps releasing heat onto the buds, and the mixture of ice and water coating them stays at the freezing point, about 32°F, however cold the air becomes. That is just above the temperature that damages tissue. A well-run system protects vines when the air falls into the low 20s Fahrenheit. The ice is not a blanket. It protects only for as long as new water keeps freezing on its surface, and if the supply fails in the night the wet vines are chilled by evaporation and suffer worse damage than if nothing had been done. The method also needs a great deal of water. Chablis installed it widely from the 1960s, and it is why many frost-prone vineyards have a reservoir.</li></ul>
<p>Frost matters more as the climate warms, which surprises people. Mild winters bring budburst earlier, while the date of the last cold night has moved much less, so the tender shoots are exposed for longer. The frost of April 2021 followed a warm March and cost France nearly 30% of its national crop.</p>

<h3>Other hazards of weather</h3>
<p><b>Winter freeze</b> kills buds and trunks in continental climates and sets the outer limit of viticulture. <b>Hail</b> falls from summer storms in narrow tracks, shredding leaves, splitting fruit and wounding canes so badly that the following year's crop may be lost as well. Mendoza's growers hang nets along the rows. French appellations forbade them until 2018, when trials in Burgundy showed that nets did not change how the grapes ripened. <b>Heat</b> above about 95°F shuts the vine down and scorches exposed fruit. <b>Drought</b> in mild form concentrates the crop and in severe form stops ripening and strips the leaves.</p>
<p><b>Smoke</b> from wildfires has joined the list in California, Oregon and Australia. Burning wood releases a family of volatile compounds, of which guaiacol is the best known, and grapes absorb them through their skins at any time from flowering onward. Inside the berry they are bound to sugar molecules, and in that bound form they have no smell at all. Grapes from a smoke-affected vineyard can therefore taste clean. The compounds are released again during fermentation, slowly in barrel and bottle, and even in the drinker's mouth by enzymes in saliva, which is why the fault often appears as an ashy, burnt aftertaste that grows over time. Winemakers reduce the damage by picking by hand, keeping leaves out of the press, pressing gently and treating the wine with carbon, but there is no complete cure.</p>

<h3>Phylloxera</h3>
<p>Phylloxera is a tiny aphid-like insect from North America that feeds on the roots of the vine. European vines cannot seal the wounds, rot follows, and the vine dies within a few years. It destroyed most of Europe's vineyards from the 1860s, and the only reliable defense is still the one found then: <b>grafting onto American rootstock</b>.</p>
<p>A few places escaped, and their ungrafted vines are prized. <b>Chile</b> is the largest, protected by geographic isolation between the Andes, the Pacific and the Atacama desert. Parts of Australia, including South Australia, are kept free by strict quarantine. Phylloxera cannot move through loose sand, so vineyards on very sandy soils survive ungrafted, as at Colares on the Portuguese coast. Much of Washington State, with sandy soils and cold winters, is also planted on its own roots.</p>

<h3>The fungal diseases</h3>
<p>Fungi are the daily enemy, and the grower's spray program is built around them. The two mildews are both from North America, both attack all green parts of the vine, and are otherwise opposites.</p>
<table><tr><th></th><th>Powdery mildew (oidium)</th><th>Downy mildew (peronospora)</th></tr>
<tr><td>Likes</td><td>Warm, shaded, humid canopies; needs no rain</td><td>Warm weather with rain</td></tr>
<tr><td>Looks like</td><td>Grey, ash-like dust on leaves and berries</td><td>Yellow "oil spots" on leaves, white down beneath</td></tr>
<tr><td>Treated with</td><td>Sulfur</td><td>Copper (Bordeaux mixture)</td></tr></table>
<p><b>Powdery mildew</b> spends the winter inside dormant buds or as tiny resting bodies on the bark. It needs no liquid water to spread, only warmth, with an optimum between about 70 and 86°F (21 to 30°C), and shade, because sunlight and temperatures above about 90°F harm it. It is therefore the mildew of dry climates, including California, and of dense canopies everywhere. It scars the berries so that they split, and even a small proportion of infected fruit gives wine a musty taste.</p>
<p><b>Downy mildew</b> overwinters as spores in fallen leaves on the ground and is carried up onto the vine by splashing rain. It needs wet leaves and warmth to infect, and a rule of thumb taught to growers is that the first infection of the season can occur once the temperature has reached 10°C, at least 10 mm of rain has fallen, and the shoots are 10 cm long. After that each infection produces a new generation in anything from five days to three weeks, faster in warm weather, and every rainy spell sets off another. In a wet year it can strip the leaves from a vineyard and destroy the crop. It does not spread in dry heat, which is why Mediterranean climates largely escape it.</p>
<p>The treatments are a century and a half old. <b>Sulfur</b> controls powdery mildew, and <b>copper</b>, usually as Bordeaux mixture, controls downy mildew. Both work only on contact and wash off, so they must be reapplied after rain. Copper has a further problem: it is a heavy metal and accumulates in the soil. The European Union now limits every grower, organic or not, to 28 kilograms of copper per hectare over seven years, an average of four a year. In a wet season that may not be enough, and organic growers, who have no alternative to copper, can lose most of a crop. The mildew years of the past decade in Bordeaux, Burgundy and Champagne have made this the sharpest practical argument in organic viticulture.</p>
<p><b>Botrytis cinerea</b> is the fungus of ripe fruit. In most circumstances it is <b>grey rot</b>: in wet weather it spreads through tight bunches, especially where berries have been split by rain, hail, mildew or insects, and it ruins both the quantity and the taste of the crop. It also produces an enzyme, laccase, that oxidizes wine and resists sulfur dioxide.</p>
<p>On ripe, healthy white grapes in one particular pattern of weather, the same fungus becomes <b>noble rot</b>. The pattern is damp, misty mornings, which let the spores germinate, followed by warm, dry, breezy afternoons, which stop the fungus from running out of control. The fungus pierces the skin with microscopic holes without breaking it. Water evaporates through the holes, and over ten to twenty days the berry shrivels, losing up to 60% of its weight. Everything that remains is concentrated: sugar above all, but also acid and flavor. The fungus consumes some of the acid, and it adds substances of its own, including glycerol, which gives the wine its viscous texture, and the aroma compounds that tasters describe as honey, apricot and marmalade. Because the rot never strikes all the bunches at once, pickers pass through the vineyard several times selecting berries or parts of bunches, and yields are tiny: Sauternes is capped at 25 hl/ha and often makes far less. The conditions occur reliably in only a few places, each with a river or lake to supply the mist: Sauternes, Tokaj, the Rhine and Mosel, Alsace, and Austria's Neusiedlersee. If the afternoons stay wet, noble rot turns to grey rot and the vintage is lost.</p>

<h3>Diseases of the wood, and those with no cure</h3>
<p><b>Trunk diseases</b>, known by the names esca, eutypa dieback and botryosphaeria dieback, are caused by fungi that live in the wood. Their spores are released from old infected wood within hours of rain and enter through fresh pruning wounds, which stay vulnerable for two to three weeks. The fungus then spreads slowly down the arm toward the trunk, killing the wood as it goes. Nothing shows for three to eight years, after which shoots emerge stunted and yellow and whole arms die. Australian surveys have found vineyards where more than four-fifths of the vines show symptoms by fifteen or twenty years of age. There is no spray that cures an infected vine. The one effective chemical, sodium arsenite, was banned for its toxicity in France in 2001 and across Europe soon after, and the disease has spread faster since. Growers defend themselves by pruning late and in dry weather, painting large wounds, and cutting diseased trunks back to healthy wood so that a new trunk can be trained from a shoot at the base. Trunk disease is the main reason vineyards are replanted at twenty-five or thirty years, and a growing threat to the old vines that the trade values most.</p>
<p><b>Viruses</b> are spread by insects, by soil worms and, above all, by propagating from infected vines. Leafroll virus, carried by mealybugs, turns the leaves of black varieties red in autumn while the veins stay green, and delays ripening by weeks. Fanleaf virus, carried by <b>nematodes</b> in the soil, deforms the leaves and cuts the crop. Neither can be cured. The only remedy is to pull the vines and replant with certified clean material, on a rootstock that resists nematodes.</p>
<p><b>Pierce's disease</b> is caused by a bacterium, <i>Xylella fastidiosa</i>, that multiplies in the vine's water-conducting vessels and blocks them. The leaves scorch and the vine dies within a few years. It is spread by <b>sharpshooter insects</b>, which feed on sap, and it limits viticulture across the American South. In California it was a local problem near streams until a larger, stronger-flying species, the glassy-winged sharpshooter, arrived in the south of the state in the 1990s and devastated Temecula. There is no cure, and control depends on stopping the insect. Europe faces a comparable threat in <i>flavescence dorée</i>, a disease carried by a leafhopper, against which French law requires growers in affected zones to spray insecticide and uproot infected vines.</p>
<p>Among insects, <b>grape moths</b> lay eggs on the bunches, and their caterpillars pierce the berries and let rot in. The modern control is elegant: growers hang capsules that release the female's scent throughout the vineyard, so that males cannot find females, a technique called <b>sexual confusion</b>. Birds, deer, boar and wasps are kept off with nets and fences. In Australia and New Zealand, bird netting is routine.</p>
<p>The three American plagues, in order of arrival: powdery mildew reached Europe in the 1840s, phylloxera in the 1860s and downy mildew in the 1870s and 1880s, the last probably on the American rootstocks imported to cure the second.</p>

<h3>Farming philosophies</h3>
<p>How to respond to all of this is a matter of conviction as well as agronomy, and four approaches are worth distinguishing.</p>
<p><b>Conventional</b> farming uses synthetic fertilizers, herbicides and fungicides as needed. Modern synthetic fungicides are absorbed into the plant, so that rain does not wash them off, and they are more effective than copper and sulfur. Their costs are residues, harm to soil life, and the tendency of fungi to evolve resistance.</p>
<p><b>Sustainable</b> farming is a broad heading for programs that try to reduce inputs while keeping the option of using them: monitoring pests and spraying only when thresholds are crossed, conserving water and energy, and accounting for the economics and the workforce as well as the environment. Many are certified, among them SIP and LODI RULES in California and Sustainable Winegrowing New Zealand, which covers nearly the whole of that country's vineyard.</p>
<p><b>Organic</b> farming forbids synthetic pesticides, herbicides and fertilizers. Copper and sulfur are allowed, as are composts and natural predators. Conversion takes three years. The label rules differ on the two sides of the Atlantic in a way that examiners like. In the European Union, organic wine may contain added sulfites, at lower limits than conventional wine. In the United States, a bottle labeled <b>"organic wine"</b> must have <b>no added sulfites</b> at all, while one labeled "made with organic grapes" may contain up to 100 parts per million. Since very little wine is stable without sulfites, most American producers who farm organically use the second label, and European organic wines sold in America usually carry it too.</p>
<p><b>Biodynamic</b> farming begins with organic practice and adds a system derived from a series of lectures given by the Austrian philosopher <b>Rudolf Steiner</b> in 1924. The farm is treated as a single self-sustaining organism. It is fed with nine numbered preparations, of which the best known are 500, cow manure fermented over winter in a buried cow horn and sprayed on the soil in tiny, diluted quantities, and 501, ground quartz treated the same way and sprayed on the leaves. Others are made from yarrow, chamomile, nettle, oak bark, dandelion and valerian and added to compost. Work in vineyard and cellar is timed by a calendar of the moon and constellations that divides days into those favorable to roots, leaves, flowers and fruit. The certifying bodies are Demeter, which covers all agriculture, and Biodyvin, for wine estates only.</p>
<p>Biodynamics has no accepted scientific mechanism. Controlled trials comparing it with organic farming have mostly found no difference in the vines, the grapes or the wine, though one pooled analysis of many studies found somewhat richer soil life. Its influence is nevertheless out of all proportion to its area, because many of the most admired estates in the world practice it, among them Domaine Leroy, Zind-Humbrecht and Nicolas Joly, who did most to spread it. The explanation most often given by growers themselves is that the method demands constant, close attention to each vine, and attention is the scarcest input in farming.</p>

<h3>Harvest: hand or machine</h3>
<table><tr><th></th><th>Hand harvest</th><th>Machine harvest</th></tr>
<tr><td>Strengths</td><td>Selection in the vineyard; whole bunches arrive intact; works on any slope</td><td>Fast, cheap, can pick at night when fruit is cool, can beat incoming rain</td></tr>
<tr><td>Limits</td><td>Slow, costly, needs a large crew</td><td>Shakes berries off the stems, so no whole bunches; needs flat or gentle land and trellised vines</td></tr>
<tr><td>Required for</td><td>Champagne, Beaujolais (carbonic maceration), botrytized wines picked in several passes, steep terraces</td><td>Common for Marlborough Sauvignon Blanc and most large-volume wine</td></tr></table>
<p>A harvesting machine straddles the row and beats the canopy with flexible rods, so that the berries fall off their stems onto a conveyor. It follows that a machine <b>cannot deliver whole bunches</b>, which rules it out for any wine whose method depends on them: Champagne, which must be pressed as whole clusters to keep the juice of black grapes clear, and Beaujolais, whose fermentation takes place inside intact berries. For most other wines the old prejudice against machines has faded. A modern harvester can pick a hectare in an hour or two, work through the cool of the night, and bring in a crop ahead of a storm that a hand crew would lose, and the newest carry sorting equipment that removes leaves and unripe berries on board. The choice now depends on the style of wine, the slope and the cost of labor more than on any simple ranking of quality.</p>
`,
floor:`<p>Guests ask "is this organic?" constantly. Know the US distinction between "organic wine" (no added sulfites) and "made with organic grapes," and that many biodynamic estates never put certification on the label.</p>`,
analyst:`<p>Sample WSET Level 3 short answer (4 marks): "Why do growers use VSP?" Model points: even sun exposure on fruit, airflow reduces fungal disease, easier mechanization of pruning and harvest, consistent ripening.</p>`,
terms:[["VSP","Vertical shoot positioning; shoots trained upward between wires."],["Guyot","Cane-pruning system laying down one or two canes each year."],["Phylloxera","Root-feeding aphid; controlled by grafting onto American rootstocks."],["Noble rot","Botrytis cinerea in favorable conditions, concentrating sugars."],["Biodynamic","Organic farming plus Steiner preparations and a cosmic calendar."],["Pergola","Overhead training that lifts and shades the fruit."],["Kouloura","Santorini's basket-shaped vine, woven low against wind."],["Pierce's disease","Fatal bacterial disease spread by sharpshooter insects."],["Esca","A fungal trunk disease that slowly kills old vines."],["Cover crop","Plants sown between vine rows to hold soil and manage vigor."],["Sexual confusion","Pheromone capsules that stop grape moths from mating."]],
quiz:[
[1,"What is the main defense against phylloxera?","Grafting onto American rootstock",["Spraying copper and sulfur","Netting the vines in summer","Biodynamic preparations"],"No chemical cure exists; resistant roots are the answer."],
[2,"Which country is famous for largely ungrafted vineyards thanks to geographic isolation?","Chile",["France","Italy","Spain"],"Andes, desert, Pacific and Antarctic ice protect it."],
[2,"Why might a grower sprinkle water on vines during a spring frost?","Water gives off heat as it freezes, holding buds near 32°F",["Liquid water cannot fall below 40°F, so it warms the buds","The spray washes frost crystals off before they do harm","Wet soil reflects more sunlight onto the vines at dawn"],"The ice is not a blanket: protection lasts only while new water keeps freezing, so the sprinklers must run until the thaw."],
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
