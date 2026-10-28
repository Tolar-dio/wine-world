"""Curated lists for the Vitis Mundi basemap (imported by base_osm_fetch.py and base_layers.py).

OSM_RIVERS: wine-critical rivers that Natural Earth lacks or only covers in part. Fetched from
OSM via Nominatim. bbox = [west, south, east, north] used to bound the search and to pick the
right feature. sr = scalerank assigned (lower = bigger). replace_ne: NE feature names (name or
name_alt) inside the bbox that this OSM river replaces (partial/mislabelled NE pieces).

NE_WINE_RIVERS: curated rivers that NE already has; (name as in NE `name`, bbox, display name).
"""

OSM_RIVERS = [
    {"name": "Gironde", "q": ["La Gironde"], "bbox": [-1.3, 44.95, -0.5, 45.7], "sr": 5, "types": ["river", "bay"]},
    {"name": "Ciron", "q": ["Le Ciron", "Ciron"], "bbox": [-0.6, 44.05, 0.1, 44.65], "sr": 10},
    {"name": "Isle", "q": ["L'Isle", "Isle"], "bbox": [-0.3, 44.85, 1.3, 45.65], "sr": 9, "replace_ne": ["Isle"]},
    {"name": "Layon", "q": ["Le Layon"], "bbox": [-0.8, 47.0, -0.25, 47.4], "sr": 10},
    {"name": "Saône", "q": ["La Saône", "Saône"], "bbox": [4.5, 45.7, 6.5, 48.1], "sr": 6, "replace_ne": ["Saône"]},
    {"name": "Ruwer", "q": ["Ruwer"], "bbox": [6.65, 49.6, 6.95, 49.8], "sr": 10},
    {"name": "Ahr", "q": ["Ahr"], "bbox": [6.6, 50.3, 7.3, 50.6], "sr": 10},
    {"name": "Nahe", "q": ["Nahe"], "bbox": [7.0, 49.55, 7.95, 50.0], "sr": 9, "replace_ne": ["Nahe"]},
    {"name": "Kamp", "q": ["Kamp"], "bbox": [15.0, 48.3, 15.9, 48.75], "sr": 10},
    {"name": "Krems", "q": ["Große Krems"], "bbox": [15.2, 48.36, 15.8, 48.6], "sr": 10},  # OSM: Große Krems runs to the Danube
    {"name": "Pinhão", "q": ["Rio Pinhão"], "bbox": [-7.7, 41.15, -7.45, 41.5], "sr": 10},
    {"name": "Tua", "q": ["Rio Tua"], "bbox": [-7.5, 41.2, -7.0, 41.9], "sr": 9},
    {"name": "Corgo", "q": ["Rio Corgo"], "bbox": [-7.85, 41.1, -7.6, 41.45], "sr": 10},
    {"name": "Oja", "q": ["Río Oja", "Oja"], "bbox": [-3.2, 42.2, -2.8, 42.65], "sr": 10},
    {"name": "Guadalete", "q": ["Río Guadalete", "Guadalete"], "bbox": [-6.3, 36.5, -5.1, 37.0], "sr": 9},
    {"name": "Isonzo", "q": ["Soča", "Isonzo"], "bbox": [13.3, 45.7, 13.9, 46.45], "sr": 8},
    {"name": "Bodrog", "q": ["Bodrog"], "bbox": [21.3, 48.0, 21.9, 48.5], "sr": 9, "replace_ne": ["Bodrog"]},
    {"name": "Napa River", "q": ["Napa River"], "bbox": [-122.6, 38.05, -122.2, 38.7], "sr": 10},
    {"name": "Hunter River", "q": ["Hunter River"], "bbox": [150.6, -32.95, 151.85, -32.0], "sr": 8},
    {"name": "Maipo", "q": ["Río Maipo"], "bbox": [-71.7, -34.0, -69.8, -33.4], "sr": 7},
    {"name": "Aconcagua", "q": ["Río Aconcagua"], "bbox": [-71.6, -33.0, -70.0, -32.6], "sr": 7},
    {"name": "Maule", "q": ["Río Maule"], "bbox": [-72.5, -36.1, -70.3, -35.2], "sr": 7},
    {"name": "Itata", "q": ["Río Itata"], "bbox": [-72.9, -37.2, -71.7, -36.2], "sr": 8},
    {"name": "Mendoza River", "q": ["Río Mendoza"], "bbox": [-69.95, -33.2, -67.9, -32.2], "sr": 7},
    {"name": "Tunuyán", "q": ["Río Tunuyán"], "bbox": [-69.7, -34.0, -67.3, -32.8], "sr": 8},
    {"name": "Breede River", "q": ["Breede River", "Breërivier"], "bbox": [19.0, -34.5, 21.0, -33.3], "sr": 8},
    {"name": "Berg River", "q": ["Berg River", "Bergrivier"], "bbox": [18.1, -33.95, 19.2, -32.75], "sr": 8},
    {"name": "Margaret River", "q": ["Margaret River"], "bbox": [114.95, -34.05, 115.4, -33.8], "sr": 10},
    {"name": "North Para River", "q": ["North Para River"], "bbox": [138.6, -34.8, 139.1, -34.4], "sr": 10},
]

# Curated rivers already present in NE: (NE name, bbox the wine-relevant piece must touch, display name)
NE_WINE_RIVERS = [
    ("Garonne", [-1, 42, 2, 45.2], "Garonne"),
    ("Dordogne", [-1, 44.5, 3, 46], "Dordogne"),
    ("Loire", [-2.5, 44.5, 4.5, 48], "Loire"),
    ("Cher", [0, 45.5, 3, 47.5], "Cher"),
    ("Vienne", [0, 45.5, 2, 47.3], "Vienne"),
    ("Rhône", [4, 43, 8.5, 46.7], "Rhône"),
    ("Durance", [4.5, 43.5, 7, 45], "Durance"),
    ("Marne", [2, 47.5, 6, 49.5], "Marne"),
    ("Aube", [3.5, 47.5, 5.5, 48.7], "Aube"),
    ("Mosel", [5.5, 47.5, 7.8, 50.5], "Mosel"),
    ("Sarre", [6.4, 48.4, 7.3, 49.8], "Saar"),
    ("Rhine", [4.5, 46.5, 10, 52], "Rhine"),
    ("Rhin", [4.5, 46.5, 10, 52], "Rhine"),
    ("Rhein", [4.5, 46.5, 10, 52], "Rhine"),
    ("Main", [7.5, 49.5, 12, 50.5], "Main"),
    ("Neckar", [8, 48, 10, 50], "Neckar"),
    ("Donau", [8, 43, 30, 50], "Danube"),
    ("Danube", [8, 43, 30, 50], "Danube"),
    ("Duero", [-9, 40.5, -2, 42.5], "Douro/Duero"),
    ("Ebro", [-5, 40, 1.5, 43.5], "Ebro"),
    ("Tajo", [-9, 39, -1, 41], "Tajo"),
    ("Tejo", [-9.5, 38.5, -6.5, 40], "Tejo"),
    ("Guadalquivir", [-6.5, 36.5, -2.5, 38.5], "Guadalquivir"),
    ("Minho", [-9, 41.8, -7, 43.5], "Minho"),
    ("Mio", [-9, 41.8, -7, 43.5], "Miño"),
    ("Sil", [-8, 42.2, -6, 43.2], "Sil"),
    ("Tanaro", [7.5, 44, 9, 45.2], "Tanaro"),
    ("Po", [6.5, 44.4, 13, 45.5], "Po"),
    ("Adige", [10, 45, 12.6, 47.2], "Adige"),
    ("Arno", [10, 43, 12, 44], "Arno"),
    ("Tisza", [19.5, 45, 25, 48.6], "Tisza"),
    ("Tisa", [19.5, 45, 25, 48.6], "Tisza"),
    ("Alazani", [45, 40.8, 47, 42.5], "Alazani"),
    ("Dniester", [22, 45.8, 31, 50], "Dniester"),
    ("Columbia", [-124.5, 45, -115, 52.5], "Columbia"),
    ("Snake", [-120, 42, -110, 47], "Snake"),
    ("Yakima", [-121.5, 46, -119, 47.5], "Yakima"),
    ("Willamette", [-123.5, 43, -122, 46], "Willamette"),
    ("Russian", [-123.5, 38.3, -122.7, 39.5], "Russian River"),
    ("Sacramento", [-122.6, 38, -121.3, 41.5], "Sacramento"),
    ("San Joaquin", [-121.6, 36.5, -118.5, 38.2], "San Joaquin"),
    ("Salinas", [-122, 35.2, -120.2, 36.8], "Salinas"),
    ("Hudson", [-74.5, 40.5, -73.5, 44.2], "Hudson"),
    ("Niagara", [-79.2, 42.8, -78.8, 43.4], "Niagara"),
    ("Murray", [138.5, -37.5, 148.5, -33.5], "Murray"),
    ("Olifants", [18, -33.3, 19.5, -31.4], "Olifants"),
    ("Wairau", [172.5, -42.3, 174.2, -41.3], "Wairau"),
    ("Clutha", [168.5, -46.5, 170, -44.5], "Clutha"),
    ("Clutha / Mata-Au", [168.5, -46.5, 170, -44.5], "Clutha"),
    ("Kawarau", [168.5, -45.2, 169.3, -44.9], "Kawarau"),
]

# NE features dropped as mislabelled (name, bbox they sit in)
NE_DROP = [("Mendoza", [-70.3, -32.5, -69.3, -31.2])]  # NE puts "Mendoza" on a San Juan Andes river

# Wine towns: (display name, iso2 country, optional Nominatim query, rank)
# rank: 6 = important wine town, 7 = wine town, 8 = village (label only when zoomed in).
WINE_TOWNS = [
    # France
    ("Bordeaux", "fr", None, 4), ("Beaune", "fr", None, 6), ("Reims", "fr", None, 6), ("Épernay", "fr", None, 6),
    ("Avignon", "fr", None, 6), ("Saint-Émilion", "fr", None, 7), ("Pomerol", "fr", None, 8),
    ("Libourne", "fr", None, 7), ("Pauillac", "fr", None, 7), ("Margaux", "fr", "Margaux, Gironde", 7),
    ("Saint-Julien-Beychevelle", "fr", None, 8), ("Saint-Estèphe", "fr", "Saint-Estèphe, Gironde", 8),
    ("Sauternes", "fr", None, 8), ("Barsac", "fr", "Barsac, Gironde", 8), ("Bergerac", "fr", None, 7),
    ("Cahors", "fr", None, 7), ("Chablis", "fr", None, 7), ("Nuits-Saint-Georges", "fr", None, 7),
    ("Gevrey-Chambertin", "fr", None, 8), ("Vosne-Romanée", "fr", None, 8), ("Meursault", "fr", None, 8),
    ("Puligny-Montrachet", "fr", None, 8), ("Mâcon", "fr", None, 7), ("Villefranche-sur-Saône", "fr", None, 7),
    ("Beaujeu", "fr", None, 8), ("Colmar", "fr", None, 6), ("Riquewihr", "fr", None, 8),
    ("Aÿ", "fr", "Aÿ-Champagne", 7), ("Hautvillers", "fr", None, 8), ("Avize", "fr", None, 8),
    ("Les Riceys", "fr", None, 8), ("Saumur", "fr", None, 7), ("Chinon", "fr", None, 7),
    ("Vouvray", "fr", None, 8), ("Sancerre", "fr", None, 7), ("Pouilly-sur-Loire", "fr", None, 8),
    ("Angers", "fr", None, 6), ("Cognac", "fr", None, 7), ("Tain-l'Hermitage", "fr", None, 7),
    ("Ampuis", "fr", None, 8), ("Châteauneuf-du-Pape", "fr", None, 7), ("Gigondas", "fr", "Gigondas, Vaucluse", 8),
    ("Bandol", "fr", None, 7), ("Arbois", "fr", None, 7), ("Limoux", "fr", None, 7),
    ("Banyuls-sur-Mer", "fr", None, 8), ("Gaillac", "fr", None, 7), ("Madiran", "fr", None, 8),
    ("Jurançon", "fr", None, 8), ("Patrimonio", "fr", None, 8),
    # Italy
    ("Alba", "it", "Alba, Cuneo", 6), ("Barolo", "it", "Barolo, Cuneo", 8), ("Barbaresco", "it", None, 8),
    ("La Morra", "it", None, 8), ("Canelli", "it", None, 8), ("Nizza Monferrato", "it", None, 8),
    ("Gattinara", "it", None, 8), ("Montalcino", "it", None, 7), ("Montepulciano", "it", "Montepulciano, Siena", 7),
    ("Greve in Chianti", "it", None, 7), ("Castellina in Chianti", "it", None, 8), ("Radda in Chianti", "it", None, 8),
    ("Gaiole in Chianti", "it", None, 8), ("Bolgheri", "it", None, 8), ("Conegliano", "it", None, 7),
    ("Valdobbiadene", "it", None, 7), ("Soave", "it", "Soave, Verona", 8), ("Negrar", "it", "Negrar di Valpolicella", 8),
    ("Bardolino", "it", None, 8), ("Erbusco", "it", None, 8), ("Termeno", "it", "Termeno sulla Strada del Vino", 8),
    ("Cormons", "it", None, 8), ("Cividale del Friuli", "it", None, 8), ("Montefalco", "it", None, 8),
    ("Orvieto", "it", None, 7), ("Taurasi", "it", None, 8), ("Cirò", "it", "Cirò, Crotone", 8),
    ("Castiglione di Sicilia", "it", None, 8), ("Manduria", "it", None, 8), ("Frascati", "it", None, 8),
    ("Sondrio", "it", None, 7), ("Marsala", "it", None, 7), ("Asti", "it", None, 7),
    # Spain
    ("Logroño", "es", None, 6), ("Haro", "es", "Haro, La Rioja", 7), ("Laguardia", "es", None, 8),
    ("Cenicero", "es", None, 8), ("Jerez de la Frontera", "es", None, 6), ("Sanlúcar de Barrameda", "es", None, 7),
    ("El Puerto de Santa María", "es", None, 7), ("Montilla", "es", "Montilla, Córdoba", 7),
    ("Aranda de Duero", "es", None, 7), ("Peñafiel", "es", "Peñafiel, Valladolid", 8), ("Toro", "es", "Toro, Zamora", 7),
    ("Rueda", "es", "Rueda, Valladolid", 8), ("Cambados", "es", None, 7), ("Ribadavia", "es", None, 8),
    ("Monforte de Lemos", "es", None, 8), ("Villafranca del Bierzo", "es", None, 8), ("Cariñena", "es", None, 8),
    ("Valdepeñas", "es", "Valdepeñas, Ciudad Real", 7), ("Gratallops", "es", None, 8), ("Falset", "es", None, 8),
    ("Sant Sadurní d'Anoia", "es", None, 8), ("Vilafranca del Penedès", "es", None, 7), ("Jumilla", "es", None, 7),
    ("Requena", "es", "Requena, Valencia", 7),
    # Portugal
    ("Porto", "pt", None, 4), ("Vila Nova de Gaia", "pt", None, 6), ("Pinhão", "pt", "Pinhão, Alijó", 8),
    ("Peso da Régua", "pt", None, 7), ("Lamego", "pt", None, 7), ("São João da Pesqueira", "pt", None, 8),
    ("Viseu", "pt", None, 6), ("Anadia", "pt", "Anadia, Aveiro", 8), ("Reguengos de Monsaraz", "pt", None, 8),
    ("Estremoz", "pt", None, 7), ("Borba", "pt", "Borba, Évora", 8), ("Palmela", "pt", None, 8),
    ("Colares", "pt", "Colares, Sintra", 8), ("Monção", "pt", None, 8), ("Madalena", "pt", "Madalena, Pico", 8),
    # Germany
    ("Trier", "de", None, 6), ("Bernkastel-Kues", "de", None, 7), ("Piesport", "de", None, 8),
    ("Traben-Trarbach", "de", None, 8), ("Cochem", "de", None, 8), ("Saarburg", "de", None, 8),
    ("Rüdesheim am Rhein", "de", None, 7), ("Geisenheim", "de", None, 8), ("Eltville am Rhein", "de", None, 8),
    ("Hochheim am Main", "de", None, 8), ("Bingen am Rhein", "de", None, 7), ("Bacharach", "de", None, 8),
    ("Bad Kreuznach", "de", "Stadt Bad Kreuznach", 7), ("Nierstein", "de", None, 8), ("Bad Dürkheim", "de", None, 7),
    ("Deidesheim", "de", None, 8), ("Neustadt an der Weinstraße", "de", None, 7), ("Bad Neuenahr-Ahrweiler", "de", None, 8),
    ("Würzburg", "de", "Würzburg Stadt", 6), ("Volkach", "de", None, 8), ("Iphofen", "de", None, 8), ("Meißen", "de", None, 7),
    ("Freyburg", "de", "Freyburg (Unstrut)", 8), ("Heilbronn", "de", None, 6), ("Ihringen", "de", None, 8),
    # Austria / Switzerland
    ("Krems an der Donau", "at", None, 7), ("Dürnstein", "at", "Dürnstein, Krems-Land", 8), ("Spitz", "at", "Spitz, Krems-Land", 8),
    ("Langenlois", "at", None, 8), ("Rust", "at", "Rust, Burgenland", 8), ("Gols", "at", None, 8),
    ("Neusiedl am See", "at", None, 8), ("Eisenstadt", "at", None, 7), ("Poysdorf", "at", None, 8),
    ("Gamlitz", "at", None, 8),
    ("Sion", "ch", None, 6), ("Sierre", "ch", None, 7), ("Cully", "ch", None, 8), ("Neuchâtel", "ch", None, 6),
    # Hungary, Slovakia, Balkans, Black Sea, Caucasus, Levant
    ("Tokaj", "hu", None, 7), ("Tarcal", "hu", None, 8), ("Mád", "hu", None, 8), ("Tállya", "hu", None, 8),
    ("Sárospatak", "hu", None, 8), ("Eger", "hu", None, 6), ("Villány", "hu", None, 8), ("Szekszárd", "hu", None, 7),
    ("Badacsonytomaj", "hu", None, 8), ("Sopron", "hu", None, 7),
    ("Naousa", "gr", "Naousa, Imathia", 7), ("Nemea", "gr", None, 8), ("Fira", "gr", "Fira, Santorini", 8),
    ("Amyntaio", "gr", None, 8),
    ("Telavi", "ge", None, 7), ("Sighnaghi", "ge", None, 8), ("Kvareli", "ge", None, 8), ("Tsinandali", "ge", None, 8),
    ("Cricova", "md", None, 8), ("Purcari", "md", None, 8),
    ("Cotnari", "ro", None, 8), ("Urlați", "ro", None, 8), ("Murfatlar", "ro", None, 8), ("Recaș", "ro", None, 8),
    ("Melnik", "bg", None, 8), ("Ilok", "hr", None, 8), ("Kutjevo", "hr", None, 8), ("Potomje", "hr", None, 8),
    ("Dobrovo", "si", None, 8), ("Vipava", "si", None, 8), ("Ptuj", "si", None, 7),
    ("Sremski Karlovci", "rs", None, 8), ("Vršac", "rs", None, 7),
    ("Areni", "am", None, 8), ("Zahlé", "lb", None, 7),
    # United States
    ("Napa", "us", "Napa, California", 6), ("Yountville", "us", None, 8), ("St. Helena", "us", "St. Helena, California", 7),
    ("Calistoga", "us", None, 8), ("Sonoma", "us", "Sonoma, California", 7), ("Healdsburg", "us", None, 7),
    ("Sebastopol", "us", "Sebastopol, California", 8), ("Geyserville", "us", None, 8), ("Ukiah", "us", None, 7),
    ("Boonville", "us", "Boonville, California", 8), ("Lodi", "us", "Lodi, California", 7),
    ("Livermore", "us", "Livermore, California", 7), ("Plymouth", "us", "Plymouth, Amador County, California", 8),
    ("Soledad", "us", "Soledad, California", 8), ("Paso Robles", "us", None, 7), ("San Luis Obispo", "us", None, 7),
    ("Los Olivos", "us", "Los Olivos, California", 8), ("Lompoc", "us", None, 8), ("Temecula", "us", None, 7),
    ("McMinnville", "us", "McMinnville, Oregon", 7), ("Dundee", "us", "Dundee, Oregon", 8),
    ("Jacksonville", "us", "Jacksonville, Oregon", 8), ("Walla Walla", "us", None, 7), ("Prosser", "us", "Prosser, Washington", 8),
    ("Woodinville", "us", None, 8), ("Hammondsport", "us", None, 8), ("Penn Yan", "us", None, 8),
    ("Cutchogue", "us", None, 8), ("Charlottesville", "us", None, 7), ("Fredericksburg", "us", "Fredericksburg, Texas", 8),
    ("Traverse City", "us", None, 7), ("Palisade", "us", "Palisade, Colorado", 8),
    # Canada, Mexico
    ("Oliver", "ca", "Oliver, British Columbia", 8), ("Osoyoos", "ca", None, 8), ("Kelowna", "ca", None, 6),
    ("Penticton", "ca", None, 7), ("Niagara-on-the-Lake", "ca", None, 7), ("St. Catharines", "ca", None, 6),
    ("Beamsville", "ca", None, 8), ("Wolfville", "ca", None, 8), ("Picton", "ca", "Picton, Ontario", 8),
    ("Ensenada", "mx", None, 6), ("Parras de la Fuente", "mx", None, 8),
    # Argentina, Chile, Uruguay, Brazil
    ("Mendoza", "ar", "Ciudad de Mendoza", 3), ("Luján de Cuyo", "ar", "Ciudad de Luján de Cuyo", 7), ("Maipú", "ar", "Ciudad de Maipú, Mendoza", 7),
    ("Tupungato", "ar", None, 8), ("Tunuyán", "ar", None, 7), ("San Carlos", "ar", "San Carlos, Mendoza", 8),
    ("San Rafael", "ar", "San Rafael, Mendoza", 6), ("Cafayate", "ar", None, 7), ("San Juan", "ar", "San Juan, San Juan, Argentina", 4),
    ("Chilecito", "ar", None, 7), ("General Roca", "ar", "General Roca, Río Negro", 7),
    ("Santa Cruz", "cl", "Santa Cruz, Colchagua", 7), ("Casablanca", "cl", "Casablanca, Valparaíso", 7),
    ("Pirque", "cl", None, 8), ("Buin", "cl", None, 8), ("San Felipe", "cl", "San Felipe, Valparaíso", 7),
    ("Los Andes", "cl", "Los Andes, Valparaíso", 7), ("Vicuña", "cl", None, 8), ("Cauquenes", "cl", None, 8),
    ("Curicó", "cl", None, 6), ("Talca", "cl", None, 6),
    ("Canelones", "uy", "Ciudad de Canelones", 7), ("Carmelo", "uy", None, 8), ("Garzón", "uy", "Garzón, Maldonado", 8),
    ("Bento Gonçalves", "br", None, 7), ("Garibaldi", "br", "Garibaldi, Rio Grande do Sul", 8),
    # South Africa
    ("Stellenbosch", "za", None, 6), ("Franschhoek", "za", None, 7), ("Paarl", "za", None, 6),
    ("Constantia", "za", "Constantia, Cape Town", 8), ("Robertson", "za", "Robertson, Western Cape", 7),
    ("Wellington", "za", "Wellington, Western Cape", 7), ("Tulbagh", "za", None, 8), ("Hermanus", "za", None, 7),
    ("Malmesbury", "za", None, 7), ("Riebeek-Kasteel", "za", None, 8), ("Durbanville", "za", None, 8),
    # Australia, New Zealand
    ("Nuriootpa", "au", None, 7), ("Tanunda", "au", None, 7), ("Angaston", "au", None, 8),
    ("Clare", "au", "Clare, South Australia", 7), ("McLaren Vale", "au", None, 7), ("Hahndorf", "au", None, 8),
    ("Penola", "au", None, 8), ("Langhorne Creek", "au", None, 8), ("Margaret River", "au", "Margaret River, Western Australia", 7),
    ("Pokolbin", "au", None, 8), ("Cessnock", "au", None, 7), ("Rutherglen", "au", None, 8),
    ("Healesville", "au", None, 8), ("Heathcote", "au", "Heathcote, Victoria", 8), ("Beechworth", "au", None, 8),
    ("Mount Barker", "au", "Mount Barker, Western Australia", 8), ("Griffith", "au", "Griffith, New South Wales", 7),
    ("Renwick", "nz", None, 8), ("Martinborough", "nz", None, 8), ("Cromwell", "nz", None, 7),
    ("Alexandra", "nz", "Alexandra, Otago", 8), ("Waipara", "nz", None, 8), ("Havelock North", "nz", None, 8),
    # Asia
    ("Penglai", "cn", "Penglai, Yantai", 7), ("Yinchuan", "cn", None, 4), ("Kōshū", "jp", "Koshu, Yamanashi", 7),
]

# Known town-centre coordinates (lon, lat) that override geocoding where Nominatim returns a
# county / municipality centroid or nothing. Checked against OSM place nodes / Wikipedia.
TOWN_COORDS = {
    ("Napa", "us"): (-122.2869, 38.2975), ("Sonoma", "us"): (-122.4580, 38.2919),
    ("San Luis Obispo", "us"): (-120.6596, 35.2828), ("Walla Walla", "us"): (-118.3430, 46.0646),
    ("Mendoza", "ar"): (-68.8458, -32.8895), ("Luján de Cuyo", "ar"): (-68.8786, -33.0360),
    ("Maipú", "ar"): (-68.7856, -32.9836), ("Canelones", "uy"): (-56.2843, -34.5228),
    ("Madalena", "pt"): (-28.5300, 38.5361), ("Garzón", "uy"): (-54.5560, -34.6040),
    ("Rust", "at"): (16.6717, 47.8008), ("Asti", "it"): (8.2068, 44.8999),
    ("Sondrio", "it"): (9.8711, 46.1699), ("Bad Kreuznach", "de"): (7.8667, 49.8472),
    ("Würzburg", "de"): (9.9294, 49.7913), ("Nemea", "gr"): (22.6611, 37.8213),
    ("Telavi", "ge"): (45.4747, 41.9198), ("Sighnaghi", "ge"): (45.9220, 41.6197),
    ("Kvareli", "ge"): (45.8156, 41.9547), ("Tsinandali", "ge"): (45.5694, 41.8936),
    ("Areni", "am"): (45.1833, 39.7217), ("Zahlé", "lb"): (35.9019, 33.8463),
    ("Penglai", "cn"): (120.7584, 37.8114), ("Yinchuan", "cn"): (106.2309, 38.4872),
    ("Kōshū", "jp"): (138.7288, 35.7043),
}

# Lakes added from OSM via Nominatim (missing from NE 10m): name, query, bbox [w,s,e,n], scalerank
OSM_LAKES = [
    {"name": "Skaha Lake", "q": "Skaha Lake", "bbox": [-119.7, 49.3, -119.5, 49.5], "sr": 9},
    {"name": "Osoyoos Lake", "q": "Osoyoos Lake", "bbox": [-119.55, 48.9, -119.35, 49.1], "sr": 9},
]
# NE lake label fixes: (wrong NE name, point inside the polygon, correct name)
NE_LAKE_FIX = [("Lago di Como", (8.62, 45.95), "Lago Maggiore")]
