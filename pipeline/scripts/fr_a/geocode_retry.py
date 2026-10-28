import json, time, sys, urllib.request, urllib.parse
OUT = sys.argv[1]
UA = {"User-Agent": "VitisMundiResearch/1.0 (wine atlas; low volume)"}
RETRY = {
 "leoville-las-cases": ["Château Léoville-Las Cases", "Leoville Las Cases Saint-Julien"],
 "leoville-poyferre": ["Château Léoville-Poyferré", "Leoville Poyferre"],
 "leoville-barton": ["Château Léoville-Barton", "Leoville Barton"],
 "camensac": ["Château Camensac", "Camensac Saint-Laurent-Médoc"],
 "clos-haut-peyraguey": ["Clos Haut-Peyraguey", "Haut-Peyraguey Bommes"],
 "doisy-daene": ["Château Doisy Daëne", "Doisy-Daene Barsac"],
 "doisy-dubroca": ["Doisy Dubroca", "Château Doisy Dubroca Barsac"],
 "doisy-vedrines": ["Château Doisy Védrines", "Doisy-Vedrines Barsac"],
 "romer": ["Romer Fargues", "Château Romer"],
 "romer-du-hayot": ["Romer du Hayot", "Château Romer-du-Hayot"],
 "couhins-lurton": ["Couhins-Lurton", "Château Couhins Lurton"],
 "belair-monange": ["Château Belair-Monange", "Bélair Monange", "Château Belair Saint-Emilion"],
 "pavie-macquin": ["Château Pavie-Macquin", "Pavie Macquin"],
 "trottevieille": ["Château Trottevieille", "Trottevieille Saint-Emilion"],
 "la-mondotte": ["Mondotte Saint-Laurent-des-Combes", "La Mondotte Saint-Emilion"],
 "tertre-roteboeuf": ["Tertre Roteboeuf", "Château Tertre Roteboeuf"],
 "trotanoy": ["Château Trotanoy Pomerol", "Trotanoy"],
 "la-fleur-petrus": ["La Fleur Petrus", "Château La Fleur Pétrus Pomerol"],
 "cb-reysson": ["Château Reysson Vertheuil", "Reysson"],
 "cb-le-crock": ["Château Le Crock Saint-Estèphe", "Le Crock"],
 "cb-lafitte-carcasset": ["Lafitte Carcasset", "Château Lafitte-Carcasset"],
 "bdx-castillon-battle": ["Bataille de Castillon monument Lamothe-Montravel", "Monument Talbot Lamothe-Montravel", "Castillon-la-Bataille"],
 "bdx-chateau-roc-de-cambes": ["Roc de Cambes", "Château Roc de Cambes Bourg"],
 "h-pol-roger": ["Pol Roger Épernay", "Pol Roger"],
 "h-perrier-jouet": ["Perrier-Jouët Épernay", "Perrier Jouët"],
 "h-mercier": ["Mercier Épernay", "Caves Mercier"],
 "h-veuve-clicquot": ["Veuve Clicquot Reims", "Veuve Clicquot"],
 "h-ruinart": ["Ruinart Reims", "Ruinart"],
 "h-taittinger": ["Taittinger Reims", "Taittinger"],
 "h-pommery": ["Pommery Reims", "Domaine Pommery"],
 "h-roederer": ["Louis Roederer Reims", "Roederer"],
 "h-charles-heidsieck": ["Charles Heidsieck Reims", "Charles Heidsieck"],
 "h-mumm": ["G.H. Mumm Reims", "Mumm"],
 "h-lanson": ["Lanson Reims", "Lanson"],
 "h-henriot": ["Henriot Reims", "Henriot"],
 "h-bollinger": ["Bollinger Aÿ", "Bollinger"],
 "h-deutz": ["Deutz Aÿ", "Deutz"],
 "h-billecart": ["Billecart-Salmon Mareuil-sur-Aÿ", "Billecart Salmon"],
 "h-selosse": ["Selosse Avize", "Les Avisés Avize"],
 "h-laurent-perrier": ["Laurent-Perrier Tours-sur-Marne", "Laurent Perrier"],
 "h-egly-ouriet": ["Egly-Ouriet Ambonnay", "Egly Ouriet"],
 "h-pierre-peters": ["Pierre Peters Le Mesnil-sur-Oger"],
 "h-larmandier": ["Larmandier-Bernier Vertus", "Larmandier Bernier"],
 "h-drappier": ["Drappier Urville", "Champagne Drappier"],
 "h-salon": ["Salon Le Mesnil-sur-Oger", "Champagne Salon Delamotte", "Delamotte Le Mesnil-sur-Oger"],
 "l-coulee-de-serrant": ["Coulée de Serrant", "Nicolas Joly Savennières", "Château de la Roche aux Moines"],
 "l-quarts-de-chaume": ["Chaume Rochefort-sur-Loire", "Quarts-de-Chaume"],
 "l-huet": ["Huet Vouvray", "Le Haut-Lieu Vouvray"],
 "l-foreau": ["Clos Naudin Vouvray", "Foreau Vouvray"],
 "l-chidaine": ["Chidaine Montlouis", "François Chidaine"],
 "l-monts-damnes": ["Monts Damnés Chavignol", "Chavignol"],
 "l-belliviere": ["Bellivière Lhomme", "Domaine de Belliviere"],
 "sw-tour-des-gendres": ["Tour des Gendres", "Château Tour des Gendres Ribagnac"],
 "sw-triguedina": ["Triguedina", "Clos Triguedina Puy-l'Évêque"],
 "sw-montus": ["Montus Maumusson", "Château Montus"],
 "sw-fronton": ["Bellevue la Forêt", "Château Bellevue La Forêt"],
 "sw-buzet": ["Les Vignerons de Buzet", "Cave de Buzet Buzet-sur-Baïse"],
 "lr-grange-des-peres": ["Grange des Pères", "Grange des Peres Aniane"],
 "lr-aupilhac": ["Aupilhac Montpeyroux", "Domaine d'Aupilhac"],
 "lr-negly": ["La Négly Fleury", "Château de la Negly"],
 "lr-hospitalet": ["Château l'Hospitalet Gérard Bertrand", "L'Hospitalet Narbonne"],
 "r-templiers": ["Cellier des Templiers Banyuls", "Terres des Templiers"],
 "r-cazes": ["Maison Cazes Rivesaltes", "Cazes Rivesaltes"],
 "r-clos-des-fees": ["Clos des Fées Vingrau", "Clos des Fees"],
 "p-pibarnon": ["Pibarnon", "Château de Pibarnon La Cadière"],
 "p-pradeaux": ["Château Pradeaux Saint-Cyr", "Pradeaux"],
 "p-clos-sainte-magdeleine": ["Clos Sainte Magdeleine Cassis", "Sainte-Magdeleine Cassis"],
 "p-vignelaure": ["Vignelaure Rians", "Château Vignelaure"],
 "c-arena": ["Antoine Arena Patrimonio", "Domaine Arena"],
 "c-gentile": ["Domaine Gentile Saint-Florent", "Gentile Patrimonio"],
 "c-nicrosi": ["Clos Nicrosi Rogliano", "Nicrosi"],
 "c-abbatucci": ["Abbatucci Casalabriva", "Domaine Comte Abbatucci"],
 "suau": ["Château Suau Barsac"],
 "le-pin": ["Le Pin Pomerol", "Château Le Pin Catusseau"],
}
res = json.load(open(OUT))
def nom(qs):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": qs, "format": "jsonv2", "limit": 3, "countrycodes": "fr"})
    try: return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40))
    except Exception: return []
for slug, qs in RETRY.items():
    found = []
    for q in qs:
        h = nom(q); time.sleep(1.1)
        if h:
            found = [{"lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("name"), "type": x.get("type"), "cls": x.get("category"), "disp": x.get("display_name","")[:160], "query": q} for x in h]
            break
    res[slug]["retry"] = found
    print(slug, "|", found[0]["disp"][:110] if found else "NONE", flush=True)
    json.dump(res, open(OUT, "w"), ensure_ascii=False, indent=0)
print("DONE")
