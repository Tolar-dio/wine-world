# slug | Nominatim query | commune (for validation) | department name
RAW = """
# ---- 1855 Medoc + Haut-Brion
lafite-rothschild|Château Lafite Rothschild|Pauillac|Gironde
latour|Château Latour|Pauillac|Gironde
margaux|Château Margaux|Margaux-Cantenac|Gironde
haut-brion|Château Haut-Brion|Pessac|Gironde
mouton-rothschild|Château Mouton Rothschild|Pauillac|Gironde
rauzan-segla|Château Rauzan-Ségla|Margaux-Cantenac|Gironde
rauzan-gassies|Château Rauzan-Gassies|Margaux-Cantenac|Gironde
leoville-las-cases|Château Léoville Las Cases|Saint-Julien-Beychevelle|Gironde
leoville-poyferre|Château Léoville Poyferré|Saint-Julien-Beychevelle|Gironde
leoville-barton|Château Léoville Barton|Saint-Julien-Beychevelle|Gironde
durfort-vivens|Château Durfort-Vivens|Margaux-Cantenac|Gironde
gruaud-larose|Château Gruaud Larose|Saint-Julien-Beychevelle|Gironde
lascombes|Château Lascombes|Margaux-Cantenac|Gironde
brane-cantenac|Château Brane-Cantenac|Margaux-Cantenac|Gironde
pichon-baron|Château Pichon Baron|Pauillac|Gironde
pichon-comtesse|Château Pichon Longueville Comtesse de Lalande|Pauillac|Gironde
ducru-beaucaillou|Château Ducru-Beaucaillou|Saint-Julien-Beychevelle|Gironde
cos-d-estournel|Château Cos d'Estournel|Saint-Estèphe|Gironde
montrose|Château Montrose|Saint-Estèphe|Gironde
kirwan|Château Kirwan|Margaux-Cantenac|Gironde
d-issan|Château d'Issan|Margaux-Cantenac|Gironde
lagrange|Château Lagrange|Saint-Julien-Beychevelle|Gironde
langoa-barton|Château Langoa Barton|Saint-Julien-Beychevelle|Gironde
giscours|Château Giscours|Labarde|Gironde
malescot-st-exupery|Château Malescot Saint-Exupéry|Margaux-Cantenac|Gironde
boyd-cantenac|Château Boyd-Cantenac|Margaux-Cantenac|Gironde
cantenac-brown|Château Cantenac Brown|Margaux-Cantenac|Gironde
palmer|Château Palmer|Margaux-Cantenac|Gironde
la-lagune|Château La Lagune|Ludon-Médoc|Gironde
desmirail|Château Desmirail|Margaux-Cantenac|Gironde
calon-segur|Château Calon-Ségur|Saint-Estèphe|Gironde
ferriere|Château Ferrière|Margaux-Cantenac|Gironde
marquis-d-alesme|Château Marquis d'Alesme|Margaux-Cantenac|Gironde
saint-pierre|Château Saint-Pierre|Saint-Julien-Beychevelle|Gironde
talbot|Château Talbot|Saint-Julien-Beychevelle|Gironde
branaire-ducru|Château Branaire-Ducru|Saint-Julien-Beychevelle|Gironde
duhart-milon|Château Duhart-Milon|Pauillac|Gironde
pouget|Château Pouget|Margaux-Cantenac|Gironde
la-tour-carnet|Château La Tour Carnet|Saint-Laurent-Médoc|Gironde
lafon-rochet|Château Lafon-Rochet|Saint-Estèphe|Gironde
beychevelle|Château Beychevelle|Saint-Julien-Beychevelle|Gironde
prieure-lichine|Château Prieuré-Lichine|Margaux-Cantenac|Gironde
marquis-de-terme|Château Marquis de Terme|Margaux-Cantenac|Gironde
pontet-canet|Château Pontet-Canet|Pauillac|Gironde
batailley|Château Batailley|Pauillac|Gironde
haut-batailley|Château Haut-Batailley|Pauillac|Gironde
grand-puy-lacoste|Château Grand-Puy-Lacoste|Pauillac|Gironde
grand-puy-ducasse|Château Grand-Puy Ducasse|Pauillac|Gironde
lynch-bages|Château Lynch-Bages|Pauillac|Gironde
lynch-moussas|Château Lynch-Moussas|Pauillac|Gironde
dauzac|Château Dauzac|Labarde|Gironde
d-armailhac|Château d'Armailhac|Pauillac|Gironde
du-tertre|Château du Tertre|Arsac|Gironde
haut-bages-liberal|Château Haut-Bages Libéral|Pauillac|Gironde
pedesclaux|Château Pédesclaux|Pauillac|Gironde
belgrave|Château Belgrave|Saint-Laurent-Médoc|Gironde
camensac|Château de Camensac|Saint-Laurent-Médoc|Gironde
cos-labory|Château Cos Labory|Saint-Estèphe|Gironde
clerc-milon|Château Clerc Milon|Pauillac|Gironde
croizet-bages|Château Croizet-Bages|Pauillac|Gironde
cantemerle|Château Cantemerle|Macau|Gironde
# ---- Sauternes Barsac 1855
yquem|Château d'Yquem|Sauternes|Gironde
la-tour-blanche|Château La Tour Blanche|Bommes|Gironde
lafaurie-peyraguey|Château Lafaurie-Peyraguey|Bommes|Gironde
clos-haut-peyraguey|Château Clos Haut-Peyraguey|Bommes|Gironde
rayne-vigneau|Château de Rayne Vigneau|Bommes|Gironde
suduiraut|Château Suduiraut|Preignac|Gironde
coutet|Château Coutet|Barsac|Gironde
climens|Château Climens|Barsac|Gironde
guiraud|Château Guiraud|Sauternes|Gironde
rieussec|Château Rieussec|Fargues|Gironde
rabaud-promis|Château Rabaud-Promis|Bommes|Gironde
sigalas-rabaud|Château Sigalas Rabaud|Bommes|Gironde
de-myrat|Château de Myrat|Barsac|Gironde
doisy-daene|Château Doisy-Daëne|Barsac|Gironde
doisy-dubroca|Château Doisy-Dubroca|Barsac|Gironde
doisy-vedrines|Château Doisy-Védrines|Barsac|Gironde
d-arche|Château d'Arche|Sauternes|Gironde
filhot|Château Filhot|Sauternes|Gironde
broustet|Château Broustet|Barsac|Gironde
nairac|Château Nairac|Barsac|Gironde
caillou|Château Caillou|Barsac|Gironde
suau|Château Suau|Barsac|Gironde
de-malle|Château de Malle|Preignac|Gironde
romer|Château Romer|Fargues|Gironde
romer-du-hayot|Château Romer du Hayot|Fargues|Gironde
lamothe|Château Lamothe|Sauternes|Gironde
lamothe-guignard|Château Lamothe Guignard|Sauternes|Gironde
# ---- Graves 1959
la-mission-haut-brion|Château La Mission Haut-Brion|Talence|Gironde
pape-clement|Château Pape Clément|Pessac|Gironde
smith-haut-lafitte|Château Smith Haut Lafitte|Martillac|Gironde
domaine-de-chevalier|Domaine de Chevalier|Léognan|Gironde
haut-bailly|Château Haut-Bailly|Léognan|Gironde
carbonnieux|Château Carbonnieux|Léognan|Gironde
malartic-lagraviere|Château Malartic-Lagravière|Léognan|Gironde
de-fieuzal|Château de Fieuzal|Léognan|Gironde
olivier|Château Olivier|Léognan|Gironde
bouscaut|Château Bouscaut|Cadaujac|Gironde
latour-martillac|Château Latour-Martillac|Martillac|Gironde
couhins|Château Couhins|Villenave-d'Ornon|Gironde
couhins-lurton|Château Couhins-Lurton|Villenave-d'Ornon|Gironde
# ---- Saint-Emilion
pavie|Château Pavie|Saint-Émilion|Gironde
figeac|Château Figeac|Saint-Émilion|Gironde
ausone|Château Ausone|Saint-Émilion|Gironde
cheval-blanc|Château Cheval Blanc|Saint-Émilion|Gironde
angelus|Château Angélus|Saint-Émilion|Gironde
beau-sejour-becot|Château Beau-Séjour Bécot|Saint-Émilion|Gironde
beausejour|Château Beauséjour|Saint-Émilion|Gironde
belair-monange|Château Bélair-Monange|Saint-Émilion|Gironde
canon|Château Canon|Saint-Émilion|Gironde
canon-la-gaffeliere|Château Canon-la-Gaffelière|Saint-Émilion|Gironde
larcis-ducasse|Château Larcis Ducasse|Saint-Laurent-des-Combes|Gironde
pavie-macquin|Château Pavie Macquin|Saint-Émilion|Gironde
troplong-mondot|Château Troplong Mondot|Saint-Émilion|Gironde
trottevieille|Château Trotte Vieille|Saint-Émilion|Gironde
valandraud|Château Valandraud|Saint-Étienne-de-Lisse|Gironde
clos-fourtet|Clos Fourtet|Saint-Émilion|Gironde
la-mondotte|La Mondotte|Saint-Laurent-des-Combes|Gironde
la-gaffeliere|Château La Gaffelière|Saint-Émilion|Gironde
tertre-roteboeuf|Château Tertre Rôteboeuf|Saint-Laurent-des-Combes|Gironde
saint-emilion-monolithe|Église monolithe de Saint-Émilion|Saint-Émilion|Gironde
# ---- Pomerol & Fronsac
petrus|Petrus|Pomerol|Gironde
le-pin|Château Le Pin|Pomerol|Gironde
lafleur|Château Lafleur|Pomerol|Gironde
vieux-chateau-certan|Vieux Château Certan|Pomerol|Gironde
l-eglise-clinet|Château L'Église-Clinet|Pomerol|Gironde
la-conseillante|Château La Conseillante|Pomerol|Gironde
l-evangile|Château L'Évangile|Pomerol|Gironde
trotanoy|Château Trotanoy|Pomerol|Gironde
la-fleur-petrus|Château La Fleur-Pétrus|Pomerol|Gironde
clinet|Château Clinet|Pomerol|Gironde
fronsac-tertre|Château de la Dauphine|Fronsac|Gironde
# ---- Crus Bourgeois Exceptionnels 2025
cb-la-cardonne|Château La Cardonne|Blaignan-Prignac|Gironde
cb-castera|Château Castéra|Saint-Germain-d'Esteuil|Gironde
cb-laujac|Château Laujac|Bégadan|Gironde
cb-paloumey|Château Paloumey|Ludon-Médoc|Gironde
cb-reysson|Château Reysson|Vertheuil|Gironde
cb-malescasse|Château Malescasse|Lamarque|Gironde
cb-de-malleret|Château de Malleret|Le Pian-Médoc|Gironde
cb-du-taillan|Château du Taillan|Le Taillan-Médoc|Gironde
cb-reverdi|Château Reverdi|Listrac-Médoc|Gironde
cb-d-arsac|Château d'Arsac|Arsac|Gironde
cb-mongravey|Château Mongravey|Arsac|Gironde
cb-paveil-de-luze|Château Paveil de Luze|Soussans|Gironde
cb-le-crock|Château Le Crock|Saint-Estèphe|Gironde
cb-lafitte-carcasset|Château Lafitte Carcasset|Saint-Estèphe|Gironde
# ---- other Bordeaux
bdx-chartrons|Musée du Vin et du Négoce|Bordeaux|Gironde
bdx-cite-du-vin|La Cité du Vin|Bordeaux|Gironde
bdx-chateau-de-cadillac|Château de Cadillac|Cadillac|Gironde
bdx-castillon-battle|Monument Talbot Castillon|Castillon-la-Bataille|Gironde
bdx-citadelle-blaye|Citadelle de Blaye|Blaye|Gironde
bdx-sociando-mallet|Château Sociando-Mallet|Saint-Seurin-de-Cadourne|Gironde
bdx-poujeaux|Château Poujeaux|Moulis-en-Médoc|Gironde
bdx-chasse-spleen|Château Chasse-Spleen|Moulis-en-Médoc|Gironde
bdx-sauve-majeure|Abbaye de la Sauve-Majeure|La Sauve|Gironde
bdx-de-fargues|Château de Fargues|Fargues|Gironde
bdx-tour-de-mons|Château Tour de Mons|Soussans|Gironde
bdx-loupiac-gaudiet|Château Loupiac-Gaudiet|Loupiac|Gironde
bdx-chateau-roc-de-cambes|Château Roc de Cambes|Bourg|Gironde
# ---- Champagne grand cru villages
gc-ambonnay|Ambonnay|Ambonnay|Marne
gc-avize|Avize|Avize|Marne
gc-ay|Aÿ-Champagne|Aÿ-Champagne|Marne
gc-beaumont-sur-vesle|Beaumont-sur-Vesle|Beaumont-sur-Vesle|Marne
gc-bouzy|Bouzy|Bouzy|Marne
gc-chouilly|Chouilly|Chouilly|Marne
gc-cramant|Cramant|Cramant|Marne
gc-louvois|Louvois|Louvois|Marne
gc-mailly|Mailly-Champagne|Mailly-Champagne|Marne
gc-le-mesnil|Le Mesnil-sur-Oger|Le Mesnil-sur-Oger|Marne
gc-oger|Oger|Oger|Marne
gc-oiry|Oiry|Oiry|Marne
gc-puisieulx|Puisieulx|Puisieulx|Marne
gc-sillery|Sillery|Sillery|Marne
gc-tours-sur-marne|Tours-sur-Marne|Tours-sur-Marne|Marne
gc-verzenay|Verzenay|Verzenay|Marne
gc-verzy|Verzy|Verzy|Marne
pc-hautvillers|Hautvillers|Hautvillers|Marne
pc-mareuil|Mareuil-sur-Aÿ|Aÿ-Champagne|Marne
pc-cumieres|Cumières|Cumières|Marne
pc-dizy|Dizy|Dizy|Marne
pc-vertus|Vertus|Blancs-Coteaux|Marne
pc-chigny|Chigny-les-Roses|Chigny-les-Roses|Marne
pc-rilly|Rilly-la-Montagne|Rilly-la-Montagne|Marne
pc-avenay|Avenay-Val-d'Or|Avenay-Val-d'Or|Marne
pc-trepail|Trépail|Trépail|Marne
pc-cuis|Cuis|Cuis|Marne
pc-villers-marmery|Villers-Marmery|Villers-Marmery|Marne
pc-bisseuil|Bisseuil|Aÿ-Champagne|Marne
# ---- Champagne villages other
ch-les-riceys|Les Riceys|Les Riceys|Aube
ch-urville|Urville|Urville|Aube
ch-celles-sur-ource|Celles-sur-Ource|Celles-sur-Ource|Aube
ch-sezanne|Sézanne|Sézanne|Marne
ch-damery|Damery|Damery|Marne
ch-gueux|Gueux|Gueux|Marne
ch-buxieres|Buxières-sur-Arce|Buxières-sur-Arce|Aube
ch-montgueux|Montgueux|Montgueux|Aube
# ---- Champagne houses
h-moet|Moët & Chandon, Avenue de Champagne|Épernay|Marne
h-pol-roger|Champagne Pol Roger, Rue Winston Churchill|Épernay|Marne
h-perrier-jouet|Maison Perrier-Jouët, Avenue de Champagne|Épernay|Marne
h-mercier|Champagne Mercier, Avenue de Champagne|Épernay|Marne
h-de-castellane|Champagne de Castellane|Épernay|Marne
h-gosset|Champagne Gosset|Épernay|Marne
h-veuve-clicquot|Veuve Clicquot Ponsardin, Place des Droits de l'Homme|Reims|Marne
h-ruinart|Champagne Ruinart, Rue des Crayères|Reims|Marne
h-taittinger|Champagne Taittinger, Place Saint-Nicaise|Reims|Marne
h-pommery|Champagne Pommery, Place du Général Gouraud|Reims|Marne
h-krug|Champagne Krug, Rue Coquebert|Reims|Marne
h-roederer|Champagne Louis Roederer, Boulevard Lundy|Reims|Marne
h-charles-heidsieck|Champagne Charles Heidsieck|Reims|Marne
h-mumm|Champagne Mumm, Rue du Champ de Mars|Reims|Marne
h-lanson|Champagne Lanson, Boulevard Lundy|Reims|Marne
h-henriot|Champagne Henriot|Reims|Marne
h-bollinger|Champagne Bollinger, Boulevard du Maréchal de Lattre de Tassigny|Aÿ-Champagne|Marne
h-deutz|Champagne Deutz|Aÿ-Champagne|Marne
h-billecart|Champagne Billecart-Salmon|Aÿ-Champagne|Marne
h-philipponnat|Champagne Philipponnat|Aÿ-Champagne|Marne
h-salon|Champagne Salon|Le Mesnil-sur-Oger|Marne
h-krug-clos-du-mesnil|Clos du Mesnil|Le Mesnil-sur-Oger|Marne
h-selosse|Jacques Selosse|Avize|Marne
h-laurent-perrier|Champagne Laurent-Perrier|Tours-sur-Marne|Marne
h-jacquesson|Champagne Jacquesson|Dizy|Marne
h-egly-ouriet|Champagne Egly-Ouriet|Ambonnay|Marne
h-pierre-peters|Champagne Pierre Péters|Le Mesnil-sur-Oger|Marne
h-larmandier|Champagne Larmandier-Bernier|Blancs-Coteaux|Marne
h-drappier|Champagne Drappier|Urville|Aube
h-dom-perignon-abbey|Abbaye Saint-Pierre d'Hautvillers|Hautvillers|Marne
h-reims-cathedral|Cathédrale Notre-Dame de Reims|Reims|Marne
h-phare-verzenay|Phare de Verzenay|Verzenay|Marne
h-faux-verzy|Faux de Verzy|Verzy|Marne
h-ay-riots|Mairie d'Aÿ|Aÿ-Champagne|Marne
h-avenue-champagne|Avenue de Champagne|Épernay|Marne
h-colline-st-nicaise|Butte Saint-Nicaise|Reims|Marne
# ---- Loire
l-coulee-de-serrant|Clos de la Coulée de Serrant|Savennières|Maine-et-Loire
l-roche-aux-moines|La Roche aux Moines|Savennières|Maine-et-Loire
l-baumard|Domaine des Baumard|Rochefort-sur-Loire|Maine-et-Loire
l-quarts-de-chaume|Quarts de Chaume|Rochefort-sur-Loire|Maine-et-Loire
l-fesles|Château de Fesles|Thouarcé|Maine-et-Loire
l-clos-rougeard|Clos Rougeard|Saumur|Maine-et-Loire
l-breze|Château de Brézé|Bellevigne-les-Châteaux|Maine-et-Loire
l-bouvet-ladubay|Bouvet-Ladubay|Saumur|Maine-et-Loire
l-fontevraud|Abbaye de Fontevraud|Fontevraud-l'Abbaye|Maine-et-Loire
l-huet|Domaine Huet|Vouvray|Indre-et-Loire
l-foreau|Domaine du Clos Naudin|Vouvray|Indre-et-Loire
l-chidaine|Domaine François Chidaine|Montlouis-sur-Loire|Indre-et-Loire
l-marmoutier|Abbaye de Marmoutier|Tours|Indre-et-Loire
l-joguet|Domaine Charles Joguet|Sazilly|Indre-et-Loire
l-baudry|Domaine Bernard Baudry|Cravant-les-Coteaux|Indre-et-Loire
l-chateau-chinon|Forteresse royale de Chinon|Chinon|Indre-et-Loire
l-abbaye-bourgueil|Abbaye de Bourgueil|Bourgueil|Indre-et-Loire
l-dagueneau|Domaine Didier Dagueneau|Saint-Andelain|Nièvre
l-nozet|Château du Nozet|Pouilly-sur-Loire|Nièvre
l-tracy|Château de Tracy|Tracy-sur-Loire|Nièvre
l-chavignol|Chavignol|Sancerre|Cher
l-monts-damnes|Les Monts Damnés|Sancerre|Cher
l-bue|Bué|Bué|Cher
l-vatan|Domaine Edmond Vatan|Sancerre|Cher
l-belliviere|Domaine de Bellivière|Lhomme|Sarthe
l-chambord|Château de Chambord|Chambord|Loir-et-Cher
l-tue-boeuf|Clos du Tue-Boeuf|Les Montils|Loir-et-Cher
l-ecu|Domaine de l'Écu|Le Landreau|Loire-Atlantique
l-pepiere|Domaine de la Pépière|Maisdon-sur-Sèvre|Loire-Atlantique
l-clisson|Clisson|Clisson|Loire-Atlantique
l-gorges|Gorges|Gorges|Loire-Atlantique
l-le-pallet|Le Pallet|Le Pallet|Loire-Atlantique
l-goulaine|Château de Goulaine|Haute-Goulaine|Loire-Atlantique
l-chateau-thebaud|Château-Thébaud|Château-Thébaud|Loire-Atlantique
l-monnieres|Monnières|Monnières|Loire-Atlantique
l-mouzillon|Mouzillon|Mouzillon|Loire-Atlantique
l-vallet|Vallet|Vallet|Loire-Atlantique
l-la-haie-fouassiere|La Haie-Fouassière|La Haie-Fouassière|Loire-Atlantique
l-champtoceaux|Champtoceaux|Orée-d'Anjou|Maine-et-Loire
l-saumur-puy|Le Puy-Notre-Dame|Le Puy-Notre-Dame|Maine-et-Loire
l-saint-pourcain|Saint-Pourçain-sur-Sioule|Saint-Pourçain-sur-Sioule|Allier
# ---- Southwest
sw-monbazillac|Château de Monbazillac|Monbazillac|Dordogne
sw-tirecul|Château Tirecul la Gravière|Monbazillac|Dordogne
sw-tour-des-gendres|Château Tour des Gendres|Ribagnac|Dordogne
sw-tiregand|Château de Tiregand|Creysse|Dordogne
sw-pont-valentre|Pont Valentré|Cahors|Lot
sw-lagrezette|Château Lagrézette|Caillac|Lot
sw-cedre|Château du Cèdre|Vire-sur-Lot|Lot
sw-triguedina|Clos Triguedina|Puy-l'Évêque|Lot
sw-montus|Château Montus|Maumusson-Laguian|Gers
sw-bouscasse|Château Bouscassé|Maumusson-Laguian|Gers
sw-sarragachies|Sarragachies|Sarragachies|Gers
sw-plaimont|Plaimont|Saint-Mont|Gers
sw-chateau-de-pau|Château de Pau|Pau|Pyrénées-Atlantiques
sw-cauhape|Domaine Cauhapé|Monein|Pyrénées-Atlantiques
sw-uroulat|Clos Uroulat|Monein|Pyrénées-Atlantiques
sw-arretxea|Domaine Arretxea|Irouléguy|Pyrénées-Atlantiques
sw-ilarria|Domaine Ilarria|Irouléguy|Pyrénées-Atlantiques
sw-gaillac-abbey|Abbaye Saint-Michel|Gaillac|Tarn
sw-plageoles|Domaine Plageoles|Cahuzac-sur-Vère|Tarn
sw-fronton|Château Bellevue la Forêt|Fronton|Haute-Garonne
sw-marcillac|Domaine du Cros|Goutrens|Aveyron
sw-buzet|Vignerons de Buzet|Buzet-sur-Baïse|Lot-et-Garonne
sw-duras|Château de Duras|Duras|Lot-et-Garonne
sw-saussignac|Saussignac|Saussignac|Dordogne
sw-montravel|Montaigne|Saint-Michel-de-Montaigne|Dordogne
# ---- Languedoc
lr-mas-daumas-gassac|Mas de Daumas Gassac|Aniane|Hérault
lr-grange-des-peres|Domaine de la Grange des Pères|Aniane|Hérault
lr-mas-jullien|Mas Jullien|Jonquières|Hérault
lr-aupilhac|Domaine d'Aupilhac|Montpeyroux|Hérault
lr-hortus|Domaine de l'Hortus|Valflaunès|Hérault
lr-pic-saint-loup|Pic Saint-Loup|Cazevieille|Hérault
lr-negly|Château de la Négly|Fleury|Aude
lr-hospitalet|Château l'Hospitalet|Narbonne|Aude
lr-fontfroide|Abbaye de Fontfroide|Narbonne|Aude
lr-saint-hilaire|Abbaye de Saint-Hilaire|Saint-Hilaire|Aude
lr-valmagne|Abbaye de Valmagne|Villeveyrac|Hérault
lr-clos-centeilles|Clos Centeilles|Siran|Hérault
lr-pennautier|Château de Pennautier|Pennautier|Aude
lr-argeliers|Argeliers|Argeliers|Aude
lr-narbonne-1907|Hôtel de ville de Narbonne|Narbonne|Aude
lr-montpellier-comedie|Place de la Comédie|Montpellier|Hérault
lr-beziers-allees|Allées Paul Riquet|Béziers|Hérault
lr-montpellier-medicine|Faculté de médecine de Montpellier|Montpellier|Hérault
lr-pinet|Pinet|Pinet|Hérault
lr-roquebrun|Roquebrun|Roquebrun|Hérault
lr-berlou|Berlou|Berlou|Hérault
lr-boutenac|Boutenac|Boutenac|Aude
lr-la-liviniere|La Livinière|La Livinière|Hérault
lr-frontignan|Frontignan|Frontignan|Hérault
lr-faugeres|Faugères|Faugères|Hérault
lr-fitou|Fitou|Fitou|Aude
# ---- Roussillon
r-gauby|Domaine Gauby|Calce|Pyrénées-Orientales
r-mas-amiel|Mas Amiel|Maury|Pyrénées-Orientales
r-templiers|Cellier des Templiers|Banyuls-sur-Mer|Pyrénées-Orientales
r-rectorie|Domaine de la Rectorie|Banyuls-sur-Mer|Pyrénées-Orientales
r-mas-blanc|Domaine du Mas Blanc|Banyuls-sur-Mer|Pyrénées-Orientales
r-collioure|Château royal de Collioure|Collioure|Pyrénées-Orientales
r-cazes|Domaine Cazes|Rivesaltes|Pyrénées-Orientales
r-jau|Château de Jau|Cases-de-Pène|Pyrénées-Orientales
r-clos-des-fees|Domaine du Clos des Fées|Vingrau|Pyrénées-Orientales
r-tautavel|Tautavel|Tautavel|Pyrénées-Orientales
r-caramany|Caramany|Caramany|Pyrénées-Orientales
r-latour-de-france|Latour-de-France|Latour-de-France|Pyrénées-Orientales
r-lesquerde|Lesquerde|Lesquerde|Pyrénées-Orientales
# ---- Provence
p-tempier|Domaine Tempier|Le Castellet|Var
p-pibarnon|Château de Pibarnon|La Cadière-d'Azur|Var
p-pradeaux|Château Pradeaux|Saint-Cyr-sur-Mer|Var
p-simone|Château Simone|Meyreuil|Bouches-du-Rhône
p-trevallon|Domaine de Trévallon|Saint-Étienne-du-Grès|Bouches-du-Rhône
p-miraval|Château Miraval|Correns|Var
p-esclans|Château d'Esclans|La Motte|Var
p-clos-mireille|Clos Mireille|La Londe-les-Maures|Var
p-sainte-roseline|Château Sainte-Roseline|Les Arcs|Var
p-minuty|Château Minuty|Gassin|Var
p-bellet|Château de Bellet|Nice|Alpes-Maritimes
p-cremat|Château de Crémat|Nice|Alpes-Maritimes
p-clos-sainte-magdeleine|Clos Sainte-Magdeleine|Cassis|Bouches-du-Rhône
p-la-coste|Château La Coste|Le Puy-Sainte-Réparade|Bouches-du-Rhône
p-vignelaure|Château Vignelaure|Rians|Var
p-thoronet|Abbaye du Thoronet|Le Thoronet|Var
p-romanin|Château Romanin|Saint-Rémy-de-Provence|Bouches-du-Rhône
p-sainte-victoire|Montagne Sainte-Victoire|Saint-Antonin-sur-Bayon|Bouches-du-Rhône
# ---- Corsica
c-arena|Domaine Antoine Arena|Patrimonio|Haute-Corse
c-leccia|Domaine Leccia|Poggio-d'Oletta|Haute-Corse
c-gentile|Domaine Gentile|Saint-Florent|Haute-Corse
c-nicrosi|Clos Nicrosi|Rogliano|Haute-Corse
c-abbatucci|Domaine Comte Abbatucci|Casalabriva|Corse-du-Sud
c-capitoro|Clos Capitoro|Bastelicaccia|Corse-du-Sud
c-canarelli|Clos Canarelli|Figari|Corse-du-Sud
c-torraccia|Domaine de Torraccia|Porto-Vecchio|Corse-du-Sud
c-calvi|Calvi|Calvi|Haute-Corse
c-sartene|Sartène|Sartène|Corse-du-Sud
"""
def rows():
    for line in RAW.strip().splitlines():
        line=line.strip()
        if not line or line.startswith('#'): continue
        p=line.split('|')
        yield dict(slug=p[0], q=p[1], commune=p[2], dept=p[3])
if __name__=='__main__':
    r=list(rows()); print(len(r)); 
    import collections; c=collections.Counter(x['slug'] for x in r); print([k for k,v in c.items() if v>1])
