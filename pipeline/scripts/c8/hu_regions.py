import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c8")
from common import region, S

TK_SRC = [
    S("Tokaj PDO product specification v10 (harvests from 1 Aug 2025)", "https://boraszat.kormany.hu/download/b/85/53000/TOKAJ%20term%C3%A9kle%C3%ADr%C3%A1s%20%2810%20v%C3%A1ltozat%29%20kn.pdf"),
    S("Tokaj PDO product specification v10a (harvest 2024)", "https://boraszat.kormany.hu/akadalymentes/download/1/40/53000/TOKAJ%20term%C3%A9kle%C3%ADr%C3%A1s%20%2810a%20v%C3%A1ltozat%29%20korr.pdf"),
    S("Wikipedia: Tokaj wine region", "https://en.wikipedia.org/wiki/Tokaj_wine_region"),
    S("Wikipedia: Tokaji", "https://en.wikipedia.org/wiki/Tokaji"),
    S("Molnár, The History of the first closed wine region (IVES Terroir 2014)", "https://ives-openscience.eu/wp-content/uploads/2020/07/Moln-r_The-History-of-the-first.pdf"),
    S("Hello Hungary: Historical secrets about the Tokaji Aszú", "https://hellohungary.hu/en/did-you-know/historical-secrets-about-the-tokaji-aszu"),
    S("Hello Hungary: Five vintners who have changed Tokaj", "https://hellohungary.hu/en/toplists/five-vintner-who-have-changed-tokaj"),
    S("BKWine: New rules in Tokaj", "https://bkwine.com/?p=331917"),
    S("SommTV: What are puttonyos?", "https://mag.sommtv.com/2023/01/what-are-puttonyos/"),
    S("UNESCO: Tokaj Wine Region Historic Cultural Landscape (1063)", "https://whc.unesco.org/en/list/1063/"),
]

TOKAJ = region(
    "hu", "Tokaj", 48.20, 21.40, 10.0,
    "Twenty-seven villages, a cone of volcanic hills and two rivers that breathe fog: the place that turned noble rot into a royal drink.",
    """Tokaj (in Hungarian usage also Tokaj-Hegyalja, 'Tokaj foothills') is a crescent of about 400 extinct volcanic hills at the southern tip of the Zemplén Mountains in north-eastern Hungary. It runs some 80 km from Abaújszántó in the west to Sátoraljaújhely on the Slovak border, with the town of Tokaj at its southern point where the Bodrog meets the Tisza. The protected area covers 27 settlements; within them only land ranked Class I or II in the vineyard cadastre may grow Tokaji. Roughly 5,500 ha are planted, out of more than 11,000 ha classified as vineyard land, and a small Slovak corner (seven villages, about 900 ha) shares the history and, since a 2004 agreement, a version of the name.

Everything here starts with *Botrytis cinerea*. In a good autumn the river fogs of the Bodrog and Tisza hang over the lower slopes in the morning, and dry, warm afternoons follow. The rot pierces Furmint and Hárslevelű skins, the berries shrivel into raisins called *aszú* and concentrate sugar and acid together. Pickers go through the rows several times and collect these berries one by one. Steeped in fermenting must or young wine and then aged for years in small casks in cellars cut into rock, they become Tokaji Aszú: amber, honeyed, apricot and orange peel, marmalade and tea, but always held up by Furmint's electric acidity, so the wine tastes alive rather than cloying.

Since the 1990s Tokaj has learned a second language: dry. Single-vineyard dry Furmint from sites such as Szent Tamás, Úrágya, Betsek, Mézes Mály or Lapis now shows the same volcanic intensity in a form you can drink with dinner, and the region's 400-plus named dűlők are being mapped and bottled one by one. The sweet styles remain the crown jewels: Eszencia, the barely fermented free-run syrup of aszú berries; Aszú itself; Szamorodni, the 'as it comes' wine made from whole bunches with whatever rot they carry, dry and nutty under a film of yeast or sweet; and the old by-products Fordítás and Máslás.

For a visitor the region reads like a ring road of villages, each with its hill. Tokaj and Tarcal sit on Tokaj hill (Kopasz-hegy, 514 m) with its loess-covered southern face. Mád and its neighbours Rátka, Tállya and Mezőzombor hold the densest cluster of historic first growths. Bodrogkeresztúr, Bodrogkisfalud, Szegi and Olaszliszka line the Bodrog. Erdőbénye in the forested north was a coopering town, Tolcsva is home to Oremus and the old state winery, and Sárospatak and Sátoraljaújhely in the north-east hold the Rákóczi castle, the Megyer and Pajzos vineyards and the Oremus hill itself.""",
    """Vines were documented around Tokaj by the 12th century, and after the Tatar invasion of 1241 Béla IV brought in 'Latin' settlers (Walloons and Italians) whose memory lingers in Olaszliszka and Bodrogolaszi. In the 16th century Ottoman pressure on the southern wine regions, especially Szerémség (Syrmia), pushed vinedressers north; tradition holds that Szerémség growers who settled in Hegyalja around 1524 brought botrytised-wine know-how with them. The earliest firm written reference to aszú wine is the 1571 inheritance letter of Máté Garai, found by István Zelenák in 2002; Szikszai Fabricius's dictionary of 1576 records the term too. Máslás, a by-product of aszú making, is already mentioned in 1561, which suggests aszú was older still.

The famous story credits Máté Szepsi Laczkó (c. 1576 to 1632/33), a Reformed pastor at Erdőbénye and chaplain to Zsuzsanna Lorántffy, wife of Prince György I Rákóczi, with the first aszú: made in 1631 (some say 1630) from grapes of the Oremus vineyard at Sátoraljaújhely and served at Easter. The legend is attractive and almost certainly untrue in its claim of invention; his own chronicle never mentions aszú, and the town book in which it was supposedly recorded has never been found. What is true is that the Rákóczi princes, who owned castles at Sárospatak and Szerencs and great vineyard estates in the hills, turned Tokaji into an instrument of statecraft. In 1641 the towns of Hegyalja adopted a 48-point code regulating vineyard work and winemaking, and in 1655 the tithe on aszú grapes was abolished, encouraging growers to pick botrytised berries separately.

The golden age followed. Ferenc II Rákóczi, leader of the 1703 to 1711 war of independence, sent Tokaji to Louis XIV, and the line 'Vinum Regum, Rex Vinorum' entered legend. Peter the Great and his successors kept a Russian purchasing commission in Tokaj from 1733 to 1798; Polish merchants carried the wine north and gave Szamorodni its name. Vineyards were ranked into first, second and third classes from the 1720s (János Matolai's survey published by Mátyás Bél) and the work was completed by the censuses of 1765 and 1772; Antal Szirmay refined the ranking in 1798. On 1 October 1737 King Charles VI decreed which settlements could sell wine as Tokaji and required permission to plant, creating a closed production district more than a century before any similar law elsewhere. The finest Eszencia was reserved for the Habsburg cellars; as late as 1900 Franz Joseph sent Queen Victoria 972 bottles of Aszú for her birthday, and Hungary's national anthem (1823) thanks God for the 'nectar dripping from the vine-shoots of Tokaj'.

Then decline. Phylloxera arrived in 1885. The 1920 Treaty of Trianon put the north-eastern corner into Czechoslovakia. After 1945 the land was collectivised and a state combine (the Tokajhegyaljai Állami Gazdasági Borkombinát, later Tokaj Kereskedőház) bought grapes from thousands of smallholders and controlled bottling and export. Volume and oxidative, sometimes fortified styles replaced site and care. In 1990 the gate reopened. Hugh Johnson, the Danish winemaker Peter Vinding-Diers and around 60 Hungarian growers founded Royal Tokaji at Mád; AXA bought Disznókő in 1992; the Álvarez family of Vega Sicilia founded Oremus at Tolcsva in 1993; French groups took over Hétszőlő, Pajzos and Megyer. István Szepsy's low-yield aszú (released from 1991) and his 2000-vintage dry wines, made in part with Zoltán Demeter at Királyudvar, showed what the hills could do. UNESCO inscribed the Tokaj Wine Region Historic Cultural Landscape in 2002, Hungary won sole use of 'Tokaj' in the EU on accession (the Italian Tocai and Alsace Tokay names were retired by 2007), and in 2013 the region rewrote its rules to put minimum quality above tradition.""",
    """Tokaj sits at about 48°N, at the edge where the Zemplén volcanic range drops onto the Great Plain. Miocene eruptions some 12 to 15 million years ago left rhyolite, andesite and dacite, interleaved with layered tuffs, and their weathering gives the heavy, iron-red clay called *nyirok* and the white, porous *kaolin* and pumice-rich soils of Mád and Erdőbénye. Some sites carry zeolite, a volcanic mineral that holds water and nutrients; quartz-rich hydrothermal rock (the *kovás*, or flint-like, quartzite) caps hills like Úrágya and Szent Tamás. About 5% of the region, mostly on the southern face of Tokaj hill around Tarcal and Tokaj, is covered with loess, which warms faster in spring and gives rounder, earlier-ripening wines with a soft, fine texture. Hungarian growers talk of 'nyirok wines' (tense, smoky, long-lived) versus 'loess wines' (perfumed and supple).

The climate is continental: cold winters with frost risk, hot summers and, crucially, a long, dry and warm autumn. The Bodrog and Tisza, with their oxbows and marshes, create the humid mornings that start botrytis, while the hills shield the slopes from northern winds. Vineyards lie mostly on south, south-east and south-west slopes between about 120 and 300 m. Below ground the region is honeycombed with cellars cut into tuff, some from the 13th to 16th centuries, held at about 10 to 12 °C and high humidity. Their walls are coated with a black, felt-like mould (*Cladosporium cellare* in the specification, now usually classified as *Zasmidium cellare*) that feeds on alcohol and volatile compounds in the air and helps keep humidity at 85 to 95 percent: the slow, cool, moist ageing that defines classic Tokaji.""",
    """Six varieties are permitted for Tokaji. Furmint dominates (roughly two-thirds of plantings): late-budding, late-ripening, thick-skinned at first but prone to botrytis, with searing acidity and a smoky, quince and pear core. Hárslevelű ('linden leaf') adds perfume, honey and spice and is the main partner in Aszú. Sárgamuskotály (Muscat Blanc à Petits Grains) gives grapey lift and occasional single-varietal sweet wines. Kövérszőlő, a near-lost old variety identical to Romania's Grasă de Cotnari, botrytises readily and is being replanted by a few growers. Zéta (Furmint x Bouvier, bred at Tarcal and once called Oremus) ripens early and rots reliably, so it was planted for aszú after the 1950s; Kabar (Hárslevelű x Bouvier, also from Tarcal) is the rarest.""",
    """*Eszencia*: the free-run juice that oozes from aszú berries under their own weight, often 450 to 700 g/l of sugar and occasionally above 900. It ferments for years to 1.2 to 8% alcohol, is sold in tiny bottles and is traditionally taken by the spoonful. Rules: at least 450 g/l sugar; no more than 6 l from 100 kg of aszú berries.

*Aszú*: aszú berries are macerated for one to several days in fermenting must or young wine of the same vintage, pressed and fermented slowly, then aged at least 18 months in wood and released no earlier than 1 January of the third year after harvest. Since the 2013 reform the minimum residual sugar is 120 g/l (the old 5 puttonyos level). The 'puttonyos' figure, historically the number of 20 to 25 kg hods (*puttony*) of aszú paste added to a 136-litre Gönc cask, is now optional; '6 puttonyos' requires at least 150 g/l. The old 3 and 4 puttonyos wines and Aszú-Eszencia (a 7 puttonyos equivalent) are gone as categories.

*Szamorodni* ('as it was born', from Polish): whole bunches with their natural share of botrytis are crushed and fermented together. *Száraz* (dry) Szamorodni must spend at least 24 months in cask, traditionally under a film of yeast in ullaged barrels, which gives a nutty, saline, sherry-like wine. *Édes* (sweet) Szamorodni needs at least 60 g/l under the current specification (45 g/l in the 2013 rules) and six months in wood.

*Fordítás* ('turned over'): must or wine poured over the pressed aszú paste and fermented again. *Máslás* (from 'copy'): wine aged on aszú lees. Both are now rare, rich, and at least 60 g/l.

*Késői szüretelésű* (late harvest): a modern style, mostly unoaked, at least 45 g/l, made from overripe and partly botrytised grapes; the entry point to sweet Tokaj. Dry and off-dry whites (Furmint, Hárslevelű, blends) now make up a large share of production, increasingly as single-vineyard (dűlő) wines, and traditional-method sparkling *pezsgő* must spend at least 15 months in bottle (24 for vintage wines).""",
    """The 18th-century class system (first, second, third class vineyards, with a few 'great first growths' such as Mézes Mály and Szarvas above them) survives as tradition, not law. Today's legal framework is the Tokaj PDO specification managed by the Tokaj Wine Region Council of Growers (Tokaji Borvidék Hegyközségi Tanács). Only vineyard land rated Class I or II in the cadastre can produce Tokaji. Single-vineyard names may appear only if the dűlő is listed in the annex (for Mád alone, 27 dűlők from Bacskai to Vilmány), and such wines must be 100% from that site and vintage, 100% of the named variety if one is stated, and cropped at no more than 6 t/ha. A village name may appear under rules set by the local growers' council. Yields are capped at 10 t/ha for the sweet specialities and late harvest, 14 t/ha for dry wines, and aszú berries picked separately count five times their weight toward the limit. Royal Tokaji's labels still cite the historic classification ('Great First Growth' Mézes Mály, 'First Growth' Szent Tamás, Betsek, Nyulászó, Birsalmás), and groups such as the Mád Circle (Mádi Kör) of growers run their own village-wine rules.""",
    ["Tokaj"],
    TK_SRC,
    alt=["Tokaj-Hegyalja", "Tokaji borvidék", "Tokaj Wine Region"],
)

def S2(t, u): return S(t, u)

GEN_SRC = [
    S("Candiago et al. 2022, geospatial inventory of EU wine PDOs (municipality lists)", "https://doi.org/10.6084/m9.figshare.c.5877659"),
    S("Wikipedia: Hungarian wine", "https://en.wikipedia.org/wiki/Hungarian_wine"),
    S("OIV, State of the World Wine Sector in 2025", "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"),
]

BALATON = region(
    "hu", "Balaton", 46.88, 17.65, 8.2,
    "Basalt buttes, red sandstone and the largest lake in Central Europe: Hungary's white-wine heartland.",
    """The Balaton region wraps around Lake Balaton, 77 km long and shallow, which warms quickly in summer, reflects light onto the north-shore slopes and slows autumn frost. Six wine districts belong to it: Badacsony, Balaton-felvidék (the Balaton Uplands), Balatonfüred-Csopak and Nagy-Somló on or behind the north shore, Balatonboglár on the south shore and Zala to the west. On top of them sit the umbrella PDO Balaton, the single-community PDOs Tihany and Csopak, the Káli basin PDO, Somló's own PDO and, since 2025, Füred. The north shore is the drama: a row of extinct volcanoes, the 'witness hills' (*tanúhegyek*) of Badacsony, Szent György-hegy, Gulács and Csobánc, flat-topped basalt buttes rising from the plain, plus red Permian sandstone around Csopak and limestone in the Káli basin. The wines are whites first: Olaszrizling everywhere, Szürkebarát (Pinot Gris), Furmint, Hárslevelű, Juhfark on Somló, and the rare Kéknyelű on Badacsony.""",
    """The Romans planted around Balaton, and the Benedictine abbey of Tihany, founded in 1055, owned vineyards from its first charter (a document famous for containing the oldest surviving written Hungarian words). The north-shore hills became the summer seat of the Hungarian gentry in the 18th and 19th centuries; their stone press houses (*présház*) still dot the slopes. Poets followed: Sándor Kisfaludy kept a press house on Badacsony from 1798. Phylloxera devastated the region in the 1880s, and socialist-era state farms flattened its reputation. The revival since 2000 has been driven by small growers who bottle single hills and single varieties.""",
    """Annual temperatures are mild for Hungary and the lake effect extends the season. Basalt and basaltic tuff weather to dark, stony soils that give saline, smoky whites; Permian red sandstone and slate at Csopak give crisp, mineral Olaszrizling; loess and sand on the south shore make lighter, fruitier wines.""",
    """Olaszrizling (Welschriesling) is the regional grape; Szürkebarát (Pinot Gris), Furmint, Hárslevelű, Kéknyelű, Juhfark, Rajnai rizling and Sauvignon Blanc follow. Reds (Kékfrankos, Pinot Noir, Merlot, Cabernet) matter mainly at Balatonboglár.""",
    """Mostly dry whites, from fresh lakeside Olaszrizling to structured, oak-aged volcanic whites; traditional-method sparkling at Somló and Balatonboglár; rosé and light reds on the south shore.""",
    """Each district is a PDO. Csopak (2020) and Füred (2025) are narrower village PDOs with stricter rules; Csopak's growers built a 'Csopak Codex' focused on Olaszrizling and named sites. The Balaton PDO is a regional umbrella over all of them.""",
    ["Badacsony", "Balaton-felvidék", "Balatonfüred-Csopak", "Csopak", "Füred", "Tihany", "Káli", "Balatonboglár", "Zala", "Nagy-Somló", "Somlói", "Balaton"],
    GEN_SRC,
    alt=["Balatoni borrégió"],
)

UPPER = region(
    "hu", "Upper Hungary", 47.85, 20.30, 8.3,
    "Volcanic foothills of the Mátra and Bükk, home of Bull's Blood and the cellar-lined valleys of Eger.",
    """Upper Hungary (Felső-Magyarország, also called the Eger wine region) is the band of foothills along the southern edge of the North Hungarian Mountains: the Mátra around Gyöngyös, the Bükk around Eger and Miskolc. It holds three districts: Eger, famous for Egri Bikavér and Egri Csillag; Mátra, Hungary's second-largest hill district, mostly white; and Bükk, small and cool. Debrő, at the eastern foot of the Mátra, has its own PDO for Hárslevelű. The rocks are volcanic: rhyolite tuff, so soft that whole streets of cellars are carved into it, andesite in the Mátra and some limestone. The climate is cooler than the south, so Eger's reds are fresher and more fragrant than Villány's or Szekszárd's.""",
    """Eger's bishops owned great vineyards from the Middle Ages. István Dobó's defence of Eger castle against the Ottomans in 1552 gave the region its founding legend, although Eger fell in 1596 and stayed Ottoman until 1687. After the reconquest, Serbian and German settlers rebuilt the vineyards, and Kadarka became the base of the red blend later sold as Bikavér. Phylloxera and then state farming flattened quality, and Egri Bikavér became a cheap export label; since the 1990s producers such as Tibor Gál, Thummerer, St. Andrea, Bolyki, Kovács Nimród and Demeter have rebuilt it.""",
    """Rhyolite and andesite tuffs, clay and some limestone on south-facing slopes from about 150 to 400 m. The mountains protect from the north; harvests are later and acidity higher than in the south.""",
    """Kékfrankos, Kadarka, Pinot Noir, Merlot, Cabernet Franc, Syrah and Blauburger for reds; Olaszrizling, Leányka, Királyleányka, Hárslevelű, Furmint, Chardonnay, Muscat Ottonel and Tramini for whites.""",
    """Egri Bikavér (red blend) and Egri Csillag (white blend) in a three-step pyramid; varietal Pinot Noir and Kékfrankos; aromatic dry whites in the Mátra; Debrő Hárslevelű.""",
    """Eger runs a quality pyramid of Classicus, Superior and Grand Superior for its two blends, with tighter yield limits, longer ageing and mapped vineyards at each step. Mátra, Bükk and Debrői Hárslevelű are separate PDOs.""",
    ["Eger", "Mátra", "Bükk", "Debrői Hárslevelű"],
    GEN_SRC,
    alt=["Felső-Magyarország", "Egri borrégió"],
)

NPANN = region(
    "hu", "Northern Pannonia", 47.55, 17.90, 7.6,
    "From the shores of Lake Fertő to the cellars under Budapest: cool, windy, limestone country.",
    """Northern Pannonia (Felső-Pannon, the north-western Transdanubian region) collects five districts strung between the Austrian border and Budapest: Sopron on Lake Fertő (Neusiedlersee), Pannonhalma below the Benedictine archabbey, Mór in the Vértes hills, Neszmély on the Danube bend and Etyek-Buda on the limestone plateau west of the capital. Newer, smaller PDOs include Kőszeg (2025) near the Austrian border and Etyeki pezsgő (2025) for Etyek's sparkling wine. It is the coolest part of Hungary, so whites are crisp and aromatic and the red speciality is Kékfrankos.""",
    """This is the most Germanic corner of Hungarian wine: Sopron's *poncichter* growers, Mór's Swabian resettlers after the Ottoman wars, the Budafok cellars where József Törley set up his champagne house in 1882. Pannonhalma's monks have tended vines since the abbey's foundation in 996, and Kőszeg has recorded the growth of the vine shoots on St George's Day every year since 1740.""",
    """Limestone, loess and brown forest soils, with schist and gneiss in the Sopron hills. Constant north-westerly winds keep the vines dry and cool.""",
    """Kékfrankos (Sopron), Ezerjó (Mór), Chardonnay, Olaszrizling, Zöld veltelini (Grüner Veltliner), Sauvignon Blanc, Irsai Olivér, Pinot Noir and Zweigelt.""",
    """Crisp dry whites, Kékfrankos reds, and Hungary's most important traditional-method sparkling wines from Etyek-Buda.""",
    """Five district PDOs plus Kőszeg and Etyeki pezsgő.""",
    ["Sopron", "Pannonhalma", "Mór", "Neszmély", "Etyek-Buda", "Etyeki pezsgő", "Kőszeg"],
    GEN_SRC,
    alt=["Felső-Pannon", "Észak-Dunántúl"],
)

PANNON = region(
    "hu", "Pannon", 46.10, 18.50, 8.0,
    "Hungary's warm south: Villány's Cabernet Franc, Szekszárd's loess and Kadarka, Pécs's Cirfandli.",
    """The Pannon region is the south of Transdanubia, between the Danube and the Drava, at the same latitude as Bordeaux's northern tip but with a warmer, sub-Mediterranean touch. Four districts: Villány, Hungary's red-wine star on the southern flank of the Villány hills; Szekszárd, on deep loess hills above the Danube floodplain; Tolna, a large district of lighter wines; and Pécs, on the southern slopes of the Mecsek. The umbrella PDO Pannon covers them all.""",
    """Roman Sopianae (Pécs) had vineyards. After the 1687 reconquest from the Ottomans, German settlers ('Swabians') rebuilt Villány and much of Tolna, while Serbs brought Kadarka to Szekszárd. Zsigmond Teleki's rootstock nursery at Villány (from 1881) helped save Hungary from phylloxera. After 1990 Villány's family wineries, many of German origin (Bock, Gere, Tiffán, Polgár), led Hungary's first quality revolution and set up the first Hungarian origin-control scheme.""",
    """Limestone and loess in Villány, deep loess with red clay (*vörösagyag*) in Szekszárd, and varied sediments and some granite in the Mecsek. Long hot summers and mild autumns ripen Bordeaux varieties reliably.""",
    """Cabernet Franc, Cabernet Sauvignon, Merlot, Portugieser (Kékoportó), Kékfrankos and Kadarka; Cirfandli (Zierfandler) in Pécs; Olaszrizling and Chardonnay for whites.""",
    """Full-bodied Bordeaux-style reds and Franc in Villány; silkier, spicier Bikavér and Kadarka in Szekszárd; whites and some sparkling in Pécs and Tolna.""",
    """Villány's pyramid (Classicus, Prémium and the Villányi Franc category, plus single-vineyard wines) and Szekszárd's Bikavér rules lead; Pécs and Tolna are looser. All are PDOs under the Pannon umbrella.""",
    ["Villány", "Szekszárd", "Tolna", "Pécs", "Pannon"],
    GEN_SRC,
    alt=["Pannon borrégió", "Dél-Dunántúl"],
)

DUNA = region(
    "hu", "Danube", 46.75, 19.60, 7.6,
    "The sandy Great Plain between the Danube and the Tisza: where Hungary's vines outran phylloxera.",
    """The Danube region (Duna borrégió) covers the Great Plain (Alföld) between the Danube and the Tisza: three districts, Kunság (the country's largest), Csongrád and Hajós-Baja, joined under the umbrella PDO Duna. Smaller PDOs pick out special corners: Izsáki Arany Sárfehér for the high-acid Sárfehér on the Izsák sands, Monor near Budapest (2018) and Soltvadkerti (2020). Roughly a third or more of Hungary's vineyards are here, mostly on flat sand, producing everyday wine, base wine for sparkling and some good-value whites.""",
    """Phylloxera cannot survive in loose, shifting sand. When it destroyed the hill vineyards in the 1880s the state promoted planting on the Plain: a demonstration vineyard on land donated by Kecskemét (Miklóstelep, 1883) showed the way, and the sands both fed the market and stabilised the drifting dunes. Swabian villages such as Hajós built entire streets of cellars. Under Communism the Plain became the engine of bulk wine for the Soviet bloc.""",
    """Pure sand and sandy loess, a hot, dry continental summer and harsh winters; frost in hollows is the main risk. Wines are generally light, fruity and early drinking.""",
    """Kadarka (historically), Kékfrankos, Ezerjó, Olaszrizling, Cserszegi fűszeres, Irsai Olivér, Kövidinka, Sárfehér, Bianca and other resistant varieties.""",
    """Fresh whites, rosé, light reds and sparkling base wine.""",
    """District PDOs plus Duna (umbrella), Izsáki Arany Sárfehér, Monor and Soltvadkerti.""",
    ["Kunság", "Csongrád", "Hajós-Baja", "Duna", "Izsáki Arany Sárfehér", "Monor", "Soltvadkerti"],
    GEN_SRC,
    alt=["Duna borrégió", "Alföld", "Great Plain"],
)

REGIONS = [TOKAJ, BALATON, UPPER, NPANN, PANNON, DUNA]
