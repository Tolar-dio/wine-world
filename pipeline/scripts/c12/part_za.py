"""Build the South Africa part file: work/c12/parts/za.json."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c12")
from c12_common import save, site, geo_index
import za_country, za_apps

geo = geo_index("za")
apps = []
for a in za_apps.A:
    rec = {"country": "za", "name": a["name"], "match": [a["name"]] + a["match"], "cat": "WO", "subcat": a["sub"],
           "region": a["region"], "subregion": a["parent"],
           "styles": a["styles"], "dominant_style": a["dom"], "grapes": a["grapes"], "summary": a["summary"]}
    if a["name"] == "Constantia" or a["name"] == "Stellenbosch":
        rec["created"] = "1973 (Wine of Origin scheme)"
    if a["terroir"]:
        rec["terroir"] = a["terroir"]
    if a["producers"]:
        rec["producers"] = a["producers"]
    if a["nerd"]:
        rec["nerd_note"] = a["nerd"]
    if a["contains"]:
        rec["contains"] = a["contains"]
    if a["name"] not in geo:
        if a["pt"]:
            rec["lat"], rec["lon"] = a["pt"]
        else:
            print("NO POLYGON AND NO POINT", a["name"])
    apps.append(rec)
names = [r["name"] for r in apps]
print("dupes", set(n for n in names if names.count(n) > 1))
alts = set()
for n, p in geo.items():
    if p["name"] != n:
        alts.add(n)
print("geo without content:", [n for n in geo if n not in names and n not in alts])

S = []


def s(*a, **k):
    S.append(site("za", *a, **k))


s("Company's Garden", "historic", -33.9272, 18.4173, "The VOC's vegetable garden, laid out in 1652 to supply passing ships, where Jan van Riebeeck planted the colony's first vines from 1655. On 2 February 1659 he wrote in his diary that wine had been pressed from Cape grapes for the first time. The garden is now a public park in central Cape Town.", appellation="Cape Town")
s("Castle of Good Hope", "historic", -33.9259, 18.4267, "The VOC's pentagonal stone fort, built between 1666 and 1679, the oldest surviving colonial building in South Africa. Wine for the garrison and the Company's ships was stored and traded from here.", appellation="Cape Town")
s("Groot Constantia", "historic", -34.0304, 18.4176, "Simon van der Stel was granted Constantia in 1685 and planted the Cape's first great vineyard here. After his death in 1712 the estate was split; Hendrik Cloete bought this part in 1778, built the cellar (1791) with a pediment by Anton Anreith, and made the Constantia wine Napoleon drank on St Helena. The government bought it in 1885; it now makes Grand Constance and red and white table wines.", appellation="Constantia", cls="Cradle of Cape wine (1685)", producers=["Groot Constantia"])
s("Klein Constantia", "estate", -34.0387, 18.4131, "Part of Van der Stel's original estate. Duggie Jooste bought the run-down farm in 1980, replanted Muscat de Frontignan and released the revived Vin de Constance in 1986, recreating the legendary unfortified sweet wine of the eighteenth century. It also makes fine Sauvignon Blanc from slopes high on the Constantiaberg.", appellation="Constantia", cls="Vin de Constance", producers=["Klein Constantia"])
s("Buitenverwachting", "estate", -34.0426, 18.4241, "Another portion of Van der Stel's Constantia, its name means 'beyond expectation'. Revived from 1981 by the Mueller family, it makes Sauvignon Blanc, Christine (a Bordeaux blend) and, since 2007, its own Constantia sweet wine, 1769.", appellation="Constantia", producers=["Buitenverwachting"])
s("Steenberg", "estate", -34.0714, 18.4256, "The oldest farm in the Constantia valley, granted in 1682 to Catharina Ras, a widow who arrived at the Cape in 1662 and outlived several husbands. Today it is a hotel, golf estate and winery known for Sauvignon Blanc and Cap Classique.", appellation="Constantia", producers=["Steenberg"], q="approx")
s("Cape Point Vineyards", "estate", -34.0938, 18.3874, "Vineyards at Noordhoek on the Cape Peninsula's Atlantic side, some only about 1.2 km from the sea. Planted in the 1990s by Sybrand van der Spuy, they make taut, saline Sauvignon Blanc and Sémillon (Isliedh).", appellation="Cape Town", producers=["Cape Point Vineyards"])
s("Diemersdal", "estate", -33.8012, 18.64, "A Durbanville estate farmed by the Louw family for six generations since 1885, dry-farmed on red granite and shale soils. Thys Louw made it a leader in Sauvignon Blanc, including a Sauvignon from 1992 plantings.", appellation="Durbanville", producers=["Diemersdal"])
s("Kanonkop", "estate", -33.8553, 18.8598, "On the lower slopes of the Simonsberg, Kanonkop takes its name from a hill where a cannon was fired to tell farmers a VOC ship had arrived. Paul Sauer, a cabinet minister, and Jan 'Boland' Coetzee and Beyers Truter built its reputation; its Pinotage, from bush vines planted in 1953, and Paul Sauer Bordeaux blend are South African classics. It makes red wine only.", appellation="Simonsberg-Stellenbosch", producers=["Kanonkop"])
s("Rustenberg", "estate", -33.8957, 18.8925, "A farm on the Simonsberg slopes first planted in the 1680s; the Barlow family has owned it since 1941. Its gabled Cape Dutch homestead and old cellars sit below the mountain, and under Simon Barlow it became a leading producer of Cabernet and Chardonnay (Five Soldiers).", appellation="Simonsberg-Stellenbosch", producers=["Rustenberg"])
s("Thelema", "estate", -33.9084, 18.9227, "Gyles and Barbara Webb bought this fruit farm on the Helshoogte Pass in 1983 and made Thelema one of the first post-isolation stars with Cabernet and Merlot from steep, red granite slopes.", appellation="Simonsberg-Stellenbosch", producers=["Thelema"])
s("Tokara", "estate", -33.9176, 18.9202, "A modern estate at the top of the Helshoogte Pass founded by banker GT Ferreira in the 1990s, with vineyards on the Simonsberg and in Elgin; known for its Director's Reserve blends and olive oil.", appellation="Stellenbosch", producers=["Tokara"])
s("Warwick", "estate", -33.83, 18.87, "Stan and Norma Ratcliffe bought Warwick on the northern Simonsberg in 1964; Norma became one of South Africa's first female winemakers and made the Trilogy Bordeaux blend. The Ratcliffe family sold the estate in 2017.", appellation="Simonsberg-Stellenbosch", producers=["Warwick"], q="approx")
s("Delheim", "estate", -33.8694, 18.8859, "Hans Otto Hoheisen built this estate on the Simonsberg in the 1940s, and Michael 'Spatz' Sperling, who arrived from Germany in 1951, turned it into one of Stellenbosch's best-loved family estates and helped found the Stellenbosch Wine Route in 1971.", appellation="Simonsberg-Stellenbosch", producers=["Delheim"])
s("Meerlust", "estate", -34.017, 18.757, "The Myburgh family has owned Meerlust, south of Stellenbosch near False Bay, since 1756; the farm was granted in 1693. Nico Myburgh and winemaker Giorgio Dalla Cia created Rubicon, a Bordeaux blend first made in 1980, which became one of South Africa's defining reds.", appellation="Stellenbosch", cls="Rubicon (from 1980)", producers=["Meerlust"])
s("Vergelegen", "estate", -34.076, 18.8913, "Governor Willem Adriaan van der Stel, Simon's son, built Vergelegen in 1700 on the slopes of the Hottentots Holland mountains; his abuse of office led to his recall in 1707. Anglo American bought the estate in 1987, and its hilltop winery (opened 1992) makes Vergelegen V and GVB, among the Cape's finest Bordeaux blends. Camphor trees planted around 1700 still stand.", appellation="Stellenbosch", producers=["Vergelegen"])
s("Rust en Vrede", "estate", -33.9989, 18.8567, "A small red-wine estate on the Helderberg foothills, owned by the Engelbrecht family since 1977 (rugby player Jannie Engelbrecht). Its 1694 farm buildings and Estate blend of Cabernet, Shiraz and Merlot are Stellenbosch classics.", appellation="Stellenbosch", producers=["Rust en Vrede"])
s("Spier", "estate", -33.9742, 18.7819, "One of the oldest farms in Stellenbosch, first granted in 1692, with a 1767 wine cellar among South Africa's oldest. Today it is a large winery, hotel and arts centre with a focus on sustainability and community development.", appellation="Stellenbosch", producers=["Spier"])
s("Lanzerac", "estate", -33.9375, 18.8939, "A gabled Cape Dutch estate at the mouth of the Jonkershoek Valley, dating from 1692. Its name became famous in 1961, when Stellenbosch Farmers' Winery released a Pinotage made from Bellevue grapes under the Lanzerac label, the first wine ever to name Pinotage on its label.", appellation="Jonkershoek Valley", producers=["Lanzerac"])
s("Kleine Zalze", "estate", -33.9698, 18.838, "A Stellenbosch estate farmed since 1695 and revived by the Basson family from 1996. Its Family Reserve Chenin Blanc and Sauvignon Blanc are regular award winners, and its cellar door sits on the De Zalze golf estate.", appellation="Stellenbosch", producers=["Kleine Zalze"])
s("Ken Forrester", "estate", -34.025, 18.84, "Ken Forrester, a restaurateur from Johannesburg, bought the 1689 farm Scholtzenhof on the Helderberg in 1993 and became 'Mr Chenin', championing old-vine Chenin Blanc. His FMC (with the Meinert family) showed that barrel-fermented, botrytis-touched Chenin could rank with the world's great whites.", appellation="Stellenbosch", producers=["Ken Forrester"], q="approx")
s("Welgevallen Experimental Farm", "historic", -33.9477, 18.862, "Stellenbosch University's experimental farm, where Professor Abraham Perold crossed Pinot Noir with Cinsaut (then called Hermitage) in 1925 to create Pinotage. The seedlings were nearly lost when Perold left for the KWV in 1927; a colleague, Charlie Niehaus, rescued them from the overgrown garden.", appellation="Stellenbosch", cls="Birthplace of Pinotage (1925)", q="approx")
s("Simonsig", "estate", -33.8699, 18.8314, "The Malan family's estate north of Stellenbosch, where Frans Malan made Kaapse Vonkel from the 1971 vintage, South Africa's first bottle-fermented sparkling wine, beginning the Méthode Cap Classique category.", appellation="Stellenbosch", cls="First Cap Classique (1971)", producers=["Simonsig"], q="approx")
s("Boschendal", "estate", -33.8853, 18.9681, "Granted in 1685 to the Huguenot Jean le Long and owned for a century by the de Villiers family, Boschendal is one of the Cape's most visited estates. Its 1812 manor house is a showpiece of Cape Dutch architecture, and its farm now combines wine with orchards, livestock and food.", appellation="Franschhoek", producers=["Boschendal"])
s("Huguenot Monument", "historic", -33.9153, 19.1235, "A monument at the head of Franschhoek, completed in 1948, commemorating the French Protestant refugees who settled here from 1688. The adjacent museum records the families, many of whose descendants still farm Cape vineyards.", appellation="Franschhoek")
s("Boekenhoutskloof", "estate", -33.9425, 19.1077, "A Franschhoek farm founded in 1776 whose name refers to the native Cape beech (boekenhout). Marc Kent built it into one of South Africa's leading producers from the 1990s, with Syrah, Cabernet, Sémillon from vines planted in 1902 and 1942, and the value brands The Chocolate Block and Porcupine Ridge. It also owns Porseleinberg in the Swartland.", appellation="Franschhoek", producers=["Boekenhoutskloof"])
s("KWV Cathedral Cellar", "cellar", -33.7602, 18.9672, "The KWV, founded in 1918, built its headquarters in Paarl; the Cathedral Cellar (1930) has a vaulted roof and carved vats depicting the history of Cape wine. Its 'emporium' complex also houses some of the largest wine vats in the world.", appellation="Paarl", producers=["KWV"], q="approx")
s("Nederburg", "estate", -33.7207, 19.003, "Founded in 1791 near Paarl, Nederburg was modernised by German winemaker Günter Brözel from 1956 and hosted the Nederburg Auction, South Africa's main fine-wine auction, from 1975.", appellation="Paarl", producers=["Nederburg"])
s("Fairview", "estate", -33.7718, 18.9242, "Charles Back's family estate on the slopes of Paarl Mountain, famous for its goats (and Goats do Roam wine), cheese and Rhône varieties. Back also founded Spice Route in the Swartland in 1998, an early bet on the district.", appellation="Paarl", producers=["Fairview", "Spice Route"])
s("Sadie Family Wines", "estate", -33.535, 18.79, "Eben Sadie's farm and cellar on the Paardeberg, where he makes Columella (Syrah-led, first vintage 2000), Palladius (a white blend from 2002) and the Old Vineyard Series of single-site wines from old vines across the Cape. Sadie became the face of the Swartland's revival.", appellation="Paardeberg/Perdeberg", producers=["Sadie Family"], q="approx")
s("A.A. Badenhorst, Kalmoesfontein", "estate", -33.555, 18.8, "Adi Badenhorst and his cousin Hein bought the run-down Kalmoesfontein farm on the Paardeberg in 2008, restoring a 1930s cellar and old bush vines of Chenin, Cinsault and Grenache. The Secateurs range and the Family white and red blends made them stars of the Swartland Revolution.", appellation="Paardeberg/Perdeberg", producers=["A.A. Badenhorst"], q="approx")
s("Mullineux, Roundstone", "vineyard", -33.385, 18.885, "Chris and Andrea Mullineux arrived in the Swartland in 2007 and farm the Roundstone vineyard near Riebeek-Kasteel on schist and iron-rich soils. Their Syrah and old-vine Chenin, and single-terroir bottlings showing granite, schist and iron, are benchmarks; Andrea was named Wine Enthusiast's winemaker of the year in 2016.", appellation="Riebeekberg", producers=["Mullineux"], q="approx")
s("Porseleinberg", "vineyard", -33.4611, 18.9023, "A farm on the blue-grey schist of the 'porcelain mountain' bought by Boekenhoutskloof in 2009, where Callie Louw farms Syrah organically and ferments it in concrete eggs and foudres. Its Porseleinberg Syrah (first vintage 2010) is one of South Africa's most sought-after reds; the label is printed on a hand-operated press on the farm.", appellation="Porseleinberg", producers=["Porseleinberg"], q="approx")
s("Riebeek-Kasteel", "village", -33.385, 18.8955, "A Swartland village below the Kasteelberg where the Swartland Revolution festival was held from 2010 to 2015, bringing wine writers and sommeliers from around the world to taste old-vine Chenin, Cinsault and Syrah.", appellation="Riebeekberg")
s("Hamilton Russell Vineyards", "estate", -34.3897, 19.242, "Tim Hamilton Russell, an advertising executive, bought land in the Hemel-en-Aarde Valley in 1975 to make Burgundy-style wine, at a time when Pinot Noir and Chardonnay imports were restricted. His son Anthony and wife Olive built the estate's reputation; its Pinot Noir and Chardonnay, from stony, clay-rich shale, are South African benchmarks.", appellation="Hemel-en-Aarde Valley", producers=["Hamilton Russell"])
s("Bouchard Finlayson", "estate", -34.3816, 19.2417, "Peter Finlayson, who made Hamilton Russell's first wines, founded this estate in 1989 with Burgundian Paul Bouchard. Its Galpin Peak Pinot Noir and Hannibal blend are well known, and its Kaaimansgat Chardonnay comes from high vineyards near Villiersdorp.", appellation="Hemel-en-Aarde Valley", producers=["Bouchard Finlayson"])
s("Newton Johnson", "estate", -34.3692, 19.2594, "The Newton Johnson family's estate in the Upper Hemel-en-Aarde Valley, founded in 1996, makes some of South Africa's most admired Pinot Noir (Family Vineyards) from granite and shale slopes.", appellation="Upper Hemel-en-Aarde Valley", producers=["Newton Johnson"])
s("Creation", "estate", -34.3313, 19.3266, "Swiss winemaker Jean-Claude Martin and his wife Carolyn planted Creation on the Hemel-en-Aarde Ridge in 2002 on virgin land, and it has become one of the area's leading Pinot Noir and Chardonnay producers.", appellation="Hemel-en-Aarde Ridge", producers=["Creation"])
s("Alheit Vineyards, Hemelrand", "estate", -34.33, 19.31, "Chris and Suzaan Alheit make their wines on the Hemelrand farm at the top of the Hemel-en-Aarde, but source old vines across the Cape. Their Cartology blend of old-vine Chenin and Sémillon (from 2011) and single-vineyard Chenins such as Magnetic North, from the high Skurfberg in Citrusdal Mountain, are among the most acclaimed whites in South Africa.", appellation="Hemel-en-Aarde Ridge", producers=["Alheit"], q="approx")
s("Magnetic North (Skurfberg)", "vineyard", -32.35, 18.83, "A dry-farmed bush-vine Chenin Blanc vineyard on the sandstone of the Skurfberg, high above Clanwilliam in the Citrusdal Mountain district. Chris Alheit's Magnetic North and Eben Sadie's Skurfberg both come from this cold, windy, sandy plateau.", appellation="Citrusdal Mountain", producers=["Alheit", "Sadie Family"], q="approx")
s("Paul Cluver", "estate", -34.17, 19.08, "Dr Paul Cluver, a neurosurgeon, planted vines on his family's apple farm in Elgin in 1987 and made Elgin's first wines; the estate is known for Chardonnay, Pinot Noir and botrytised Riesling, and for its amphitheatre concerts.", appellation="Elgin", producers=["Paul Cluver"], q="approx")
s("Elim Moravian Mission", "village", -34.5922, 19.7594, "A mission village founded by Moravian missionaries in 1824 near Cape Agulhas. Its thatched cottages and church are a national monument, and the windswept Elim ward around it gives some of the Cape's coolest Sauvignon Blanc.", appellation="Cape Agulhas")
s("Boplaas", "estate", -33.5356, 21.6839, "The Nel family has farmed at Calitzdorp since 1880. Carel Nel built Boplaas's fame for Cape Vintage and Cape Tawny made from Touriga Nacional and Tinta Barocca, and the family also distills potstill brandy and whisky.", appellation="Calitzdorp", producers=["Boplaas"])
s("De Krans", "estate", -33.5405, 21.684, "Another Nel family farm in Calitzdorp, known for Cape Vintage Reserve, Cape Tawny and dry Portuguese-variety table wines. Calitzdorp hosts an annual 'Port and Wine Festival'.", appellation="Calitzdorp", producers=["De Krans"])
s("Graham Beck, Madeba", "estate", -33.83, 19.95, "Mining magnate Graham Beck bought the Madeba farm near Robertson in 1983; under Pieter Ferreira ('Bubbles') it became South Africa's leading Cap Classique house, whose sparkling wine was served at Nelson Mandela's inauguration in 1994.", appellation="Robertson", producers=["Graham Beck"], q="approx")
s("Cederberg Private Cellar", "estate", -32.5022, 19.2567, "The Nieuwoudt family's farm at Dwarsrivier in the Cederberg mountains, with vineyards at about 1,000 m among some of the highest in South Africa. Planted from the 1970s, they make crisp Sauvignon Blanc, Chenin and Shiraz.", appellation="Cederberg", producers=["Cederberg"])
s("Groote Post", "estate", -33.4833, 18.41, "A historic dairy farm in the Darling hills that Peter Pentz and his son Nick turned to vines in the 1990s, a few kilometres from the Atlantic. Cool Atlantic air gives its Sauvignon Blanc a reputation for freshness.", appellation="Darling", producers=["Groote Post"])
s("Saronsberg", "estate", -33.2002, 19.0585, "A modern Tulbagh estate at the foot of the Saronsberg, rebuilt after the 1969 earthquake area was replanted; known for Shiraz and Rhône blends.", appellation="Tulbagh", producers=["Saronsberg"], q="approx")

for x in S:
    if x["id"] == "site-za-saronsberg":
        x["text"] = "A Tulbagh estate at the foot of the Saronsberg on the valley's northern edge, bought by Nick van Huyssteen in 2002 and replanted with Rhône varieties. Its Shiraz and Full Circle blend show the valley's warm days and cold-trap nights."

data = {"countries": [za_country.COUNTRY], "regions": za_country.REGIONS, "appellations": apps, "sites": S}
save("za", data)
