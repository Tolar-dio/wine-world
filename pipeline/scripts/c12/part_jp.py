"""Build the Japan part file: work/c12/parts/jp.json."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c12")
from c12_common import save, site, geo_index

NTA = {"title": "National Tax Agency of Japan, Geographical Indications (designations for wine: Yamanashi 2013, Hokkaido 2018, Yamagata, Osaka and Nagano 2021)", "url": "https://www.nta.go.jp/english/taxes/liquor_administration/geographical/02.htm"}
NTAMAP = {"title": "National Tax Agency, Japan wine map (PDF)", "url": "https://www.nta.go.jp/taxes/sake/sakagura/pdf/wine_map_jp_en.pdf"}
PLOS = {"title": "Goto-Yamamoto, Sawler and Myles, Genetic Analysis of East Asian Grape Cultivars Suggests Hybridization with Wild Vitis, PLOS ONE (2015)", "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0140841"}
WPJP = {"title": "Wikipedia, Japanese wine", "url": "https://en.wikipedia.org/wiki/Japanese_wine"}
WPKOSHU = {"title": "Wikipedia, Koshu (grape)", "url": "https://en.wikipedia.org/wiki/Koshu_(grape)"}

COUNTRY = {
    "iso2": "jp", "name": "Japan", "tier": "notable",
    "tagline": "A thousand years of the Koshu grape, a rainy climate tamed by pergolas, and a new generation of growers from Yamanashi to Hokkaido.",
    "stats": {"vineyard_ha": None, "production_mhl": None, "year": 2017,
              "note": "National Tax Agency data (2017): about 102,000 kl of wine produced in Japan, but only about a fifth from Japanese-grown grapes; 'Japan Wine' (domestic grapes, made in Japan) was about 15,000 kl, roughly 4 percent of consumption. Japan imported 2.3 mhl in 2025 (OIV). Vineyard area for wine grapes is not reported separately by the OIV."},
    "overview": (
        "Japan is a difficult place to grow wine grapes. Most of the country has a humid, monsoon summer with heavy rain in June and July (the tsuyu season) and typhoons in late summer and autumn, just as grapes ripen. Yet grapes have been grown in the Kofu basin of Yamanashi for more than a thousand years, and since the 1990s Japanese winemakers have turned an industry of sweet, blended table wine into one of the most interesting small wine cultures in the world.\n\n"
        "The emblem is Koshu, a pink-skinned grape grown in Yamanashi for centuries, traditionally said to have arrived along the Silk Road (legends link it to the monk Gyoki in 718 or to Amemiya Kageyu in 1186). DNA analysis published in 2015 showed it is mostly Vitis vinifera with some ancestry from wild East Asian Vitis species, including Vitis davidii, which may explain its thick skin and tolerance of humidity. Koshu makes delicate, low-alcohol white wine with citrus, white peach and a faint bitterness, increasingly made sur lie, in amphora or with skin contact, and it is a natural partner for Japanese food. Japan's other homegrown grape, Muscat Bailey A, was bred by Kawakami Zenbei at Iwanohara in Niigata (released in 1927) from the American Bailey and Muscat Hamburg, and gives light, candied-strawberry reds.\n\n"
        "Modern Japanese wine dates from the Meiji era. Two young men from Yamanashi, Takano Masanari and Tsuchiya Ryuken, were sent to Troyes in 1877 to learn French winemaking, and their company was the root of what became Mercian, now Château Mercian. Kawakami Zenbei founded Iwanohara Vineyard in 1890 and bred more than 10,000 crosses to find grapes suited to Japan. For most of the twentieth century the industry made sweet, fortified 'port wine' (Akadama, from 1907) and wines blended from imported concentrate.\n\n"
        "The change came with the 1990s and 2000s: Château Mercian's Kikyogahara Merlot and Grace Wine's Koshu won international attention, the Koshu of Japan export project began in 2009, and in 2018 new labelling rules came into force that reserved the term 'Japan Wine' (nihon wine) for wines made in Japan entirely from Japanese-grown grapes, and allowed a place name only if 85 percent of the grapes came from it. The National Tax Agency designated Yamanashi as Japan's first wine GI in 2013, followed by Hokkaido (2018) and Yamagata, Osaka and Nagano (2021).\n\n"
        "The most exciting growth is in the north. Hokkaido, cool and largely free of the rainy season and typhoons, has attracted dozens of small growers around Yoichi and Iwamizawa, led by Takahiko Soga of Domaine Takahiko, and in 2017 Burgundy's Domaine de Montille bought land near Hakodate to make Pinot Noir and Chardonnay. Nagano, with its high, dry valleys (Kikyogahara, Chikumagawa), is the other rising region."
    ),
    "history": [
        {"when": "718 or 1186", "title": "Koshu legends", "text": "Tradition credits the monk Gyoki with planting grapes at Daizenji temple in Katsunuma in 718, or a man called Amemiya Kageyu with finding a wild vine there in 1186. Either way, Koshu grapes have been grown in Yamanashi for centuries, eaten fresh rather than made into wine.", "lat": 35.6559, "lon": 138.7431},
        {"when": "1549 onward", "title": "Portuguese wine", "text": "Francis Xavier and other Jesuit missionaries brought Portuguese red wine (called chintashu, from 'tinto') as gifts for Kyushu's feudal lords.", "lat": 31.5966, "lon": 130.5571},
        {"when": "1877", "title": "Two men go to Troyes", "text": "Takano Masanari and Tsuchiya Ryuken, from Katsunuma, were sent by the newly founded Dai Nihon Yamanashi Budoshu company to Troyes in Champagne to study viticulture and winemaking. Their company's lineage leads to today's Château Mercian.", "lat": 35.6606, "lon": 138.7225},
        {"when": "1890", "title": "Iwanohara Vineyard", "text": "Kawakami Zenbei founded Iwanohara Vineyard in Joetsu, Niigata. Working with snow-cooled cellars, he bred thousands of grape crosses, releasing Muscat Bailey A and Black Queen in 1927.", "lat": 37.19, "lon": 138.33},
        {"when": "1907", "title": "Akadama Port Wine", "text": "Shinjiro Torii (founder of Suntory) launched Akadama Port Wine, a sweet fortified wine that became Japan's best-known 'wine' for decades.", "lat": 34.6937, "lon": 135.5023},
        {"when": "2013", "title": "Yamanashi GI", "text": "The National Tax Agency designated Yamanashi as Japan's first wine Geographical Indication on 16 July 2013, requiring Yamanashi-grown grapes of approved varieties and standards.", "lat": 35.6239, "lon": 138.7593},
        {"when": "2018", "title": "Japan Wine labelling rules and Hokkaido GI", "text": "New labelling standards reserved 'Japan Wine' for wine made in Japan from 100 percent Japanese grapes and set an 85 percent rule for place names; Hokkaido became Japan's second wine GI on 28 June 2018.", "lat": 43.4543, "lon": 142.6758},
        {"when": "2021", "title": "Yamagata, Osaka and Nagano GIs", "text": "On 30 June 2021 the National Tax Agency designated three more wine GIs: Yamagata, Osaka and Nagano.", "lat": 36.2396, "lon": 138.05}
    ],
    "classification": (
        "Japan's wine GIs are designated by the National Tax Agency (NTA), which regulates alcohol. Five wine GIs exist, each covering a whole prefecture: Yamanashi (2013), Hokkaido (2018), and Yamagata, Osaka and Nagano (2021). Each GI has production standards: grapes grown entirely in the prefecture, a list of approved varieties (including vinifera, Koshu, Muscat Bailey A and Yamabudo hybrids in some GIs), minimum sugar levels at harvest, limits on chaptalisation and acidification, and in some cases a tasting panel. Yamanashi's standards, for example, require approved varieties and set minimum natural sugar levels for Koshu and Muscat Bailey A.\n\n"
        "Separately, labelling rules in force since October 2018 define 'Japan Wine' (nihon wine) as wine made in Japan from 100 percent Japanese grapes, and allow a place, variety or vintage on the label only if at least 85 percent of the wine meets it. 'Domestically made wine' (kokunai seizo wine) can contain imported juice or concentrate and must say so. This distinction matters because the majority of wine bottled in Japan is still made from imported material."
    ),
    "climate_soils": (
        "Japan stretches from subtropical Okinawa to cool Hokkaido, but most vineyards share a problem: summer humidity and rain. The June to July rainy season and late-summer typhoons bring fungal disease and dilution. Growers respond with high pergolas (tanazukuri), which hold the canopy two metres above the ground for airflow and were originally designed for table grapes; with paper hats on individual bunches; with rain covers over rows; and by choosing thick-skinned varieties. Increasingly, vertical shoot positioning is used in drier sites.\n\n"
        "The best regions are naturally drier. The Kofu basin in Yamanashi is ringed by mountains, including Mount Fuji, that block some rain, and has hot summers and well-drained alluvial fans. Nagano's high valleys (500 to 900 m) have Japan's lowest rainfall and big day-night temperature swings. Hokkaido largely escapes both the rainy season and typhoons, with a cool climate suited to Pinot Noir, Kerner and Zweigelt, though winters are snowy and very cold. Soils are mostly volcanic or alluvial."
    ),
    "grapes": [
        {"name": "Koshu", "note": "The signature white, mostly vinifera with some wild East Asian Vitis ancestry; about 95 percent of plantings are in Yamanashi."},
        {"name": "Muscat Bailey A", "note": "Bred by Kawakami Zenbei in 1927; the most planted red wine grape, light and fruity."},
        {"name": "Merlot", "note": "Successful in Nagano (Kikyogahara) and Yamanashi."},
        {"name": "Chardonnay", "note": "Widely planted in Nagano, Yamanashi and Hokkaido."},
        {"name": "Pinot Noir, Kerner, Zweigelt, Müller-Thurgau", "note": "Hokkaido's cool-climate grapes; Pinot Noir is the rising star at Yoichi and Hakodate."},
        {"name": "Yamabudo (Vitis coignetiae) and hybrids", "note": "Native wild mountain grape and crosses (Yama Sauvignon) used in the north and in Iwate and Hokkaido."},
        {"name": "Delaware and Niagara", "note": "American table grapes still widely made into sweet and sparkling wine, especially in Yamagata and Osaka."}
    ],
    "regions": ["Yamanashi", "Nagano", "Hokkaido", "Yamagata", "Osaka", "Niigata"],
    "further_reading": ["Jamie Goode, Japan's wine revolution (articles)", "The Wines of Japan, Ryoko Sekiguchi and others", "Koshu of Japan (koshuofjapan.com)", "National Tax Agency, Japan wine map"],
    "sources": [NTA, NTAMAP, PLOS, WPJP, WPKOSHU,
                {"title": "OIV, State of the World Wine Sector in 2025 (May 2026)", "url": "https://www.oiv.int/what-we-do/global-report"},
                {"title": "Vino Joy News, Japan adds three geographically indicated wine regions (2022)", "url": "https://vino-joy.com/2022/01/08/japan-adds-three-geographically-indicated-wine-regions/"}]
}

REGIONS = [
    {"country": "jp", "name": "Yamanashi", "alt": ["山梨"], "parent_region": None, "lat": 35.66, "lon": 138.72, "zoom": 9.0,
     "tagline": "The Kofu basin under Mount Fuji, home of Koshu and of a third of Japan's wineries.",
     "summary": "Yamanashi has about 80 wineries, around a third of Japan's, and about 40 percent of domestic wine production; it grows about 95 percent of the country's Koshu. The heart is the eastern Kofu basin around Katsunuma, Enzan and Yamanashi city (now merged into Koshu city), where vineyards on alluvial fans climb the slopes among peach orchards.",
     "history": "Grapes were grown here from at least the medieval period, and the first commercial wineries were founded in the 1870s. Château Mercian, Grace Wine (Chuo Budoshu, 1923), Lumière, Marufuji and Haramo are among the historic houses.",
     "terroir": "A basin ringed by mountains with hot, humid summers but relatively low rainfall for Japan; well-drained alluvial gravels and volcanic soils.",
     "grapes": "Koshu, Muscat Bailey A, Merlot, Chardonnay, Cabernet Sauvignon.", "styles": "Delicate dry Koshu (including sur lie, sparkling and orange), light reds, Bordeaux blends.",
     "classification": "NTA GI Yamanashi (2013), covering the whole prefecture.", "appellations": ["Yamanashi"], "sources": [NTA]},
    {"country": "jp", "name": "Nagano", "alt": ["長野", "Shinshu"], "parent_region": None, "lat": 36.24, "lon": 138.05, "zoom": 8.0,
     "tagline": "Japan's high, dry wine valleys, where Merlot found a home on the Kikyogahara plateau.",
     "summary": "Nagano (historically Shinshu) has high valleys at 500 to 900 m with the lowest rainfall in Japan and large day-night temperature swings. Its Kikyogahara plateau at Shiojiri made Château Mercian's Merlot famous, and the Chikumagawa valley near Ueda and Tomi hosts dozens of new small wineries, encouraged by the prefecture's 'Shinshu Wine Valley' plan.",
     "history": "Concord and Niagara were grown at Kikyogahara from the late nineteenth century; Mercian switched growers to Merlot in 1976. Mercian's Mariko vineyard at Ueda (2003) and Villa d'Est (Tamamura Toyoo, 2003) helped launch the Chikumagawa boom.",
     "terroir": "Inland, high and continental; volcanic and alluvial soils; cold winters.", "grapes": "Merlot, Chardonnay, Cabernet Sauvignon, Sauvignon Blanc, Concord, Niagara.",
     "styles": "Structured reds and fresh whites.", "classification": "NTA GI Nagano (2021).", "appellations": ["Nagano"], "sources": [NTA]},
    {"country": "jp", "name": "Hokkaido", "alt": ["北海道"], "parent_region": None, "lat": 43.1, "lon": 141.3, "zoom": 6.8,
     "tagline": "Snowy, cool and largely free of typhoons: Japan's new frontier for Pinot Noir.",
     "summary": "Hokkaido, Japan's northern island, has the country's largest wine-grape area by some measures and its fastest-growing number of wineries, more than 60. Yoichi, near Otaru, is the centre of a Pinot Noir and natural-wine boom led by Takahiko Soga; Iwamizawa (Sorachi), Ikeda (Tokachi wine, a municipal winery since 1963) and Hakodate are the other centres.",
     "history": "Ikeda town founded Japan's first municipally run winery in 1963 to use wild yamabudo grapes. German varieties (Kerner, Müller-Thurgau, Zweigelt) were planted from the 1980s; Pinot Noir arrived in force from the 2000s; Domaine de Montille of Burgundy bought land near Hakodate in 2017.",
     "terroir": "Cool, with about 1,000 growing degree days in Yoichi; no rainy season to speak of and few typhoons; heavy snow protects vines in winter. Volcanic and alluvial soils.",
     "grapes": "Kerner, Pinot Noir, Zweigelt, Müller-Thurgau, Chardonnay, Yamabudo hybrids.", "styles": "Light, fresh whites; delicate Pinot Noir; sparkling.",
     "classification": "NTA GI Hokkaido (2018).", "appellations": ["Hokkaido"], "sources": [NTA]},
    {"country": "jp", "name": "Yamagata", "alt": ["山形"], "parent_region": None, "lat": 38.45, "lon": 140.1, "zoom": 8.0,
     "tagline": "Fruit country in Tohoku with a century-old wine tradition.",
     "summary": "Yamagata in northern Honshu is a fruit-growing prefecture (cherries, grapes) with about 15 wineries; Takahata Winery and the old Sakai Winery (1892) at Akayu are well known. Delaware and other American grapes are traditional, alongside Chardonnay and Merlot.",
     "history": "Grapes were planted in the Okitama basin in the nineteenth century; Sakai Winery dates from 1892.", "terroir": "Basins with snowy winters and warm summers.",
     "grapes": "Delaware, Chardonnay, Merlot, Muscat Bailey A, Cabernet Sauvignon.", "styles": "Fresh whites, sparkling Delaware, light reds.",
     "classification": "NTA GI Yamagata (2021).", "appellations": ["Yamagata"], "sources": [NTA]},
    {"country": "jp", "name": "Osaka", "alt": ["大阪"], "parent_region": None, "lat": 34.58, "lon": 135.63, "zoom": 9.0,
     "tagline": "Hillside Delaware vineyards on the edge of a megacity, once Japan's largest grape region.",
     "summary": "In the 1930s Osaka prefecture had more grape vineyards than anywhere else in Japan, on the slopes of the Ikoma and Kongo ranges around Kashiwara and Habikino. Katashimo Winery (founded 1914) is western Japan's oldest operating winery and still makes Delaware, Muscat Bailey A and other wines.",
     "history": "Grape growing spread in the Meiji and Taisho eras; urbanisation shrank it after the Second World War.", "terroir": "Warm, humid, hillside vineyards near the city.",
     "grapes": "Delaware, Muscat Bailey A, Koshu, Chardonnay.", "styles": "Light whites and reds, sparkling Delaware.",
     "classification": "NTA GI Osaka (2021).", "appellations": ["Osaka"], "sources": [NTA]},
    {"country": "jp", "name": "Niigata", "alt": ["新潟"], "parent_region": None, "lat": 37.19, "lon": 138.33, "zoom": 9.0,
     "tagline": "Snow country, where Kawakami Zenbei bred Japan's own red grapes.",
     "summary": "Niigata, on the Sea of Japan coast, is best known for sake, but its Iwanohara Vineyard (1890) at Joetsu was where Kawakami Zenbei bred Muscat Bailey A and Black Queen. Newer estates such as Cave d'Occi cluster near the coast at Kakudahama. Niigata has no wine GI.",
     "history": "Kawakami used snow from winter to cool his fermentations, storing it in a 'snow room' built in 1898.", "terroir": "Heavy winter snow, warm humid summers; sandy coastal soils at Kakudahama.",
     "grapes": "Muscat Bailey A, Black Queen, Albariño, Cabernet Sauvignon.", "styles": "Light reds and whites.", "classification": "No GI.", "appellations": [], "sources": [WPJP]}
]

geo = geo_index("jp")
APPS = []
for nm, kanji, created, reg_name, styles, dom, grapes, summary, terroir, producers, nerd in [
    ("Yamanashi", "山梨", "16 July 2013", "Yamanashi", ["white", "red", "sparkling", "orange"], "white", "Koshu, Muscat Bailey A, Merlot, Chardonnay, Cabernet Sauvignon",
     "Japan's first wine Geographical Indication, designated by the National Tax Agency in 2013, covers all of Yamanashi prefecture. Its rules require 100 percent Yamanashi grapes from listed varieties (led by Koshu and Muscat Bailey A, with European vinifera), minimum natural sugar levels and limits on chaptalisation, and wines must pass a tasting panel. In practice it is the GI for Koshu: the pale, low-alcohol white grown mostly in the eastern Kofu basin around Katsunuma.\n\nYamanashi has about 80 wineries, from Château Mercian (whose roots go back to 1877) and Grace Wine (Chuo Budoshu, founded 1923, where Ayana Misawa makes acclaimed Koshu and sparkling) to small new growers. Its Koshu ranges from crisp and citrusy to sur lie, barrel-aged, sparkling and skin-contact styles; its Muscat Bailey A gives light, fruity reds; and Merlot and Cabernet from the drier slopes are increasingly serious.",
     "The Kofu basin is ringed by mountains (Mount Fuji to the south) that block some rain; summers are hot and humid. Vineyards occupy alluvial fans and slopes at 300 to 700 m, often on traditional high pergolas (tanazukuri). Akeno and Hokuto in the north-west are higher and sunnier.",
     ["Château Mercian", "Grace Wine (Chuo Budoshu)", "Lumière", "Marufuji (Rubaiyat)", "Haramo", "Sadoya", "Katsunuma Jozo", "Kizan", "Domaine Mie Ikeno"],
     "Koshu DNA analysis (Goto-Yamamoto et al., 2015) found it is mostly vinifera with some ancestry from wild East Asian Vitis, including Vitis davidii, which may help it cope with humidity."),
    ("Hokkaido", "北海道", "28 June 2018", "Hokkaido", ["white", "red", "sparkling"], "white", "Kerner, Pinot Noir, Zweigelt, Müller-Thurgau, Chardonnay, Yamabudo",
     "Japan's second wine GI, designated in 2018, covering the whole of Hokkaido. The island's cool climate, with almost no rainy season and few typhoons, suits German and Burgundian varieties. Yoichi, west of Otaru, is the leading area: Takahiko Soga, who trained at Coco Farm in Tochigi, set up there in 2010, and Domaine Takahiko's Nana-Tsu-Mori Pinot Noir, made with whole bunches and little intervention, became the most sought-after Japanese red, inspiring dozens of new growers. In 2017 the Burgundy family estate Domaine de Montille bought land near Hakodate to make Pinot Noir and Chardonnay.",
     "Cool (around 1,000 to 1,300 growing degree days in the main areas), with heavy winter snow that insulates vines; volcanic and alluvial soils.",
     ["Domaine Takahiko", "Domaine de Montille Hakodate", "Hokkaido Wine (Otaru)", "Tokachi Wine (Ikeda)", "Takizawa", "10R Winery", "Yamazaki Winery", "Domaine Atsushi Suzuki"],
     "Ikeda town's Tokachi Wine, founded in 1963, was Japan's first municipally owned winery and still runs a 'wine castle' that ages wine in cellars."),
    ("Yamagata", "山形", "30 June 2021", "Yamagata", ["white", "red", "sparkling"], "white", "Delaware, Chardonnay, Merlot, Muscat Bailey A, Cabernet Sauvignon",
     "A wine GI designated in 2021 for Yamagata prefecture in northern Honshu, a fruit region whose about 15 wineries make wines from European and American varieties, notably sparkling and still Delaware. Takahata Winery and Sakai Winery (founded 1892, among the oldest in Japan) are leading producers.",
     "Inland basins with hot summers and snowy winters.", ["Takahata Winery", "Sakai Winery", "Tsukinoi Winery", "Asahimachi Wine"], ""),
    ("Osaka", "大阪", "30 June 2021", "Osaka", ["white", "red", "sparkling"], "white", "Delaware, Muscat Bailey A, Koshu, Chardonnay",
     "A wine GI designated in 2021 for Osaka prefecture, whose hillside vineyards around Kashiwara and Habikino were Japan's largest grape-growing area in the 1930s. Katashimo Winery, founded in 1914, is the oldest winery in western Japan and makes Delaware, Koshu and Muscat Bailey A.",
     "Warm, humid slopes of the Ikoma and Kongo ranges overlooking the city.", ["Katashimo Winery", "Kashiwara Winery", "Shimanouchi Fujimaru Winery"], ""),
    ("Nagano", "長野", "30 June 2021", "Nagano", ["red", "white", "sparkling"], "red", "Merlot, Chardonnay, Cabernet Sauvignon, Sauvignon Blanc, Concord, Niagara",
     "A wine GI designated in 2021 for Nagano prefecture, whose high, dry valleys make it one of Japan's best regions for European varieties. The Kikyogahara plateau at Shiojiri, where Château Mercian persuaded growers to switch from Concord to Merlot in 1976, produces Japan's best-known Merlot. The Chikumagawa valley near Ueda and Tomi (Villa d'Est, Mercian's Mariko vineyard), Azumino and the Kiso valley have dozens of newer wineries.",
     "Altitudes of 500 to 900 m, the lowest rainfall in Japan, cold winters and large day-night temperature swings; volcanic and gravelly soils.",
     ["Château Mercian (Kikyogahara, Mariko)", "Villa d'Est", "Izutsu", "Rue de Vin", "Obuse Winery", "Domaine Sogga", "Manns Wines (Komoro)"],
     "Obuse Winery's Domaine Sogga, run by Akihiko Soga (Takahiko's brother), was one of the first Japanese wineries to farm organically and make wine with wild yeast.")]:
    rec = {"country": "jp", "name": nm, "match": [nm, kanji, nm + " GI"], "cat": "GI", "subcat": "NTA wine GI (prefecture)", "region": reg_name, "subregion": None,
           "created": created, "styles": styles, "dominant_style": dom, "grapes": grapes, "summary": summary, "terroir": terroir, "producers": producers}
    if nerd:
        rec["nerd_note"] = nerd
    if nm not in geo:
        print("no polygon", nm)
    APPS.append(rec)

S = []


def s(*a, **k):
    S.append(site("jp", *a, **k))


s("Château Mercian Katsunuma Winery", "estate", 35.6606, 138.7225, "Château Mercian traces its roots to Dai Nihon Yamanashi Budoshu, founded in 1877, which sent Takano Masanari and Tsuchiya Ryuken to Champagne to learn winemaking. Its Katsunuma winery and museum, in a restored early twentieth-century wooden winery building, tell the story of Japanese wine; Mercian's Koshu and Kikyogahara Merlot helped start the modern quality era.", appellation="Yamanashi", producers=["Château Mercian"])
s("Grace Wine (Chuo Budoshu)", "estate", 35.664, 138.738, "Founded by the Misawa family in Katsunuma in 1923. Shigekazu Misawa and his daughter Ayana, trained in Bordeaux and Stellenbosch, raised Koshu's profile abroad; their Grace Koshu Kayagatake and Akeno Koshu sparkling are benchmarks, and their vineyard at Akeno is trained on vertical trellises rather than pergolas.", appellation="Yamanashi", producers=["Grace Wine"], q="approx")
s("Daizenji Temple", "historic", 35.6559, 138.7431, "A Buddhist temple in Katsunuma whose main hall dates from 1286. Legend says the monk Gyoki founded it in 718 after a vision of the Buddha holding grapes, and introduced grape growing; the temple's Yakushi Nyorai statue holds a bunch of grapes, and it makes a small amount of Koshu wine.", appellation="Yamanashi")
s("Katsunuma", "village", 35.6723, 138.7426, "The historic heart of Koshu country in eastern Yamanashi, where pergola vineyards and wineries line the slopes above the Kofu basin. Since 2005 part of Koshu city, it has more than 30 wineries and hosts an autumn harvest festival.", appellation="Yamanashi", q="approx")
s("Iwanohara Vineyard", "estate", 37.1902, 138.3252, "Founded in 1890 by Kawakami Zenbei, the 'father of Japanese wine grapes', in snowy Joetsu, Niigata. He made more than 10,000 crosses to find grapes for Japan's climate and in 1927 created Muscat Bailey A and Black Queen. His 1898 'snow room', which used winter snow to cool fermentations, still stands.", appellation=None, producers=["Iwanohara"], q="approx")
s("Kikyogahara", "landscape", 36.1116, 137.9377, "A high plateau at about 700 m in Shiojiri, Nagano, where Concord and Niagara grew for a century. In 1976 Château Mercian persuaded local growers to plant Merlot, and its Kikyogahara Merlot became one of Japan's first internationally acclaimed reds.", appellation="Nagano", producers=["Château Mercian"], q="approx")
s("Château Mercian Mariko Vineyard", "vineyard", 36.38, 138.33, "A vineyard planted by Mercian in 2003 on former mulberry land at Ueda in the Chikumagawa valley, now with its own winery (2019). It grows Merlot, Cabernet, Syrah, Chardonnay and Sauvignon Blanc and is a showcase of Nagano's potential.", appellation="Nagano", producers=["Château Mercian"], q="approx")
s("Domaine Takahiko", "estate", 43.1498, 140.8252, "Takahiko Soga started his estate at Yoichi, Hokkaido, in 2010 after working at Coco Farm in Tochigi and his family's Obuse Winery. His Nana-Tsu-Mori Pinot Noir, fermented with whole bunches and natural yeast, is the most sought-after Japanese red and made Yoichi a magnet for young growers.", appellation="Hokkaido", producers=["Domaine Takahiko"], q="approx")
s("Domaine de Montille Hakodate", "vineyard", 41.82, 140.65, "In 2017 the Burgundian family estate Domaine de Montille, led by Étienne de Montille, bought land near Hakodate in southern Hokkaido to grow Pinot Noir and Chardonnay, the first investment by a Burgundy domaine in Japan.", appellation="Hokkaido", producers=["Domaine de Montille"], q="approx")
s("Tokachi Wine Castle, Ikeda", "estate", 42.9288, 143.4485, "Ikeda town in Tokachi founded Japan's first municipal winery in 1963, first using the wild yamabudo grape, and later bred cold-hardy varieties such as Kiyomi from it. Its 'wine castle' on a hill above the town houses ageing cellars and a museum, and the town holds an autumn wine festival.", appellation="Hokkaido", q="approx")
s("Takahata Winery", "estate", 37.985, 140.1506, "A large winery in the Okitama basin of Yamagata, founded in 1990, known for Chardonnay and sparkling Delaware.", appellation="Yamagata", producers=["Takahata Winery"])
s("Katashimo Winery", "estate", 34.5834, 135.6326, "Founded in Kashiwara in 1914, Katashimo is the oldest operating winery in western Japan and a link to the era when Osaka was Japan's largest grape-growing region.", appellation="Osaka", producers=["Katashimo"])

for x in S:
    if x["id"] == "site-jp-takahata-winery":
        x["text"] = "A winery in the Okitama basin of Yamagata, opened in 1990 in the town of Takahata, known for barrel-fermented Chardonnay and sparkling Delaware. The basin's snowy winters and warm summers have supported fruit and grape growing for over a century."
    if x["id"] == "site-jp-katashimo-winery":
        x["text"] = "Founded in Kashiwara in 1914, Katashimo is the oldest operating winery in western Japan and a link to the 1930s, when Osaka was Japan's largest grape-growing region. It still farms hillside Delaware and Koshu and makes a Koshu from old vines on the Ikoma slopes."

save("jp", {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS, "sites": S})
