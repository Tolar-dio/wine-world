import sys
sys.path.insert(0, '/home/claude/winesite/scripts/it_north')
from common import S, save

B = "Barolo"; BB = "Barbaresco"
sites = []
def mga(slug, name, commune, app, lat, lon, q, text, prods=()):
    sites.append(S(slug, name, "mga", f"MGA ({app} DOCG), {commune}", app, lat, lon, q, text, prods))

# ---------------- BAROLO: commune of Barolo ----------------
mga("cannubi", "Cannubi", "Barolo", B, 44.6188, 7.9478, "approx",
 "The most famous name in Barolo and the first to appear on a label: a bottle marked 'Cannubi 1752' is said to survive. The long, low hill runs north-east out of Barolo village, its crest a geological seam where the Tortonian blue marls of La Morra meet the sandier Serravallian layers, which is why Cannubi wines combine perfume and power. The historic core (about 15 ha) faces south-east at 250 to 320 m; the MGA name was disputed in court for years before the core and its four 'Cannubi ...' neighbours were allowed to share it.",
 ["Brezza", "Luciano Sandrone", "Paolo Scavino", "E. Pira (Chiara Boschis)", "Marchesi di Barolo", "Damilano", "Giacomo Fenocchio", "Burlotto"])
mga("cannubi-boschis", "Cannubi Boschis", "Barolo", B, 44.6213, 7.9512, "approx",
 "The north-eastern, east-facing end of the Cannubi hill above the road to Alba. Luciano Sandrone made it famous with his first Barolo, the 1978 Cannubi Boschis, made in a garage while he still worked as cellar master at Marchesi di Barolo; it became one of the defining modernist wines. Since 2013 Sandrone labels it 'Aleste', a play on his grandchildren's names, because the old name was folded into the MGA rules.",
 ["Luciano Sandrone", "E. Pira (Chiara Boschis)", "Francesco Rinaldi"])
mga("cannubi-san-lorenzo", "Cannubi San Lorenzo", "Barolo", B, 44.6162, 7.9462, "approx",
 "The southern slope of the Cannubi hill closest to Barolo village. San Lorenzo is also the name of the patron saint chapel area, and with Cannubi, Rué and Rocche it was one of the four vineyards Bartolo Mascarello's father blended into his single Barolo. Giuseppe Rinaldi bottled 'Cannubi San Lorenzo-Ravera' until the MGA rules banned two names on one label, and renamed it Tre Tine.",
 ["Giuseppe Rinaldi", "Ceretto", "Bartolo Mascarello"])
mga("cannubi-valletta", "Cannubi Valletta", "Barolo", B, 44.6199, 7.9463, "approx",
 "The western flank of the Cannubi hill, facing south-west into the little valley (*valletta*) that separates Cannubi from Sarmassa. Slightly cooler and more sheltered than the core, it gives fragrant, fine-tannined wines.",
 ["Ceretto", "Giacomo Fenocchio"])
mga("cannubi-muscatel", "Cannubi Muscatel", "Barolo", B, 44.6154, 7.9437, "approx",
 "The south-western tip of the Cannubi hill above the hamlet of Muscatel, named for the Moscato once grown here. It is the smallest and least known of the Cannubi family, on sandier soils near the village.",
 ["Cascina Bruciata"])
mga("sarmassa", "Sarmassa", "Barolo", B, 44.6214, 7.9438, "approx",
 "A spur between Brunate and Cannubi on the Barolo side of the La Morra border. Its compact, chalky marls make darker, firmer wines than Cannubi; Marchesi di Barolo and Roberto Voerzio bottle it, and Giacomo Brezza's Sarmassa is a classic of the traditional school.",
 ["Brezza", "Marchesi di Barolo", "Roberto Voerzio", "Scarzello"])
mga("le-coste-barolo", "Le Coste", "Barolo", B, 44.6080, 7.9405, "approx",
 "Steep, south-facing slopes just south-west of Barolo village on the road toward Vergne. Giuseppe Rinaldi's 'Brunate-Le Coste' blend was split when the MGA rules forbade double names; Le Coste now goes into his Tre Tine and Bussia. Sandy, well-drained soils give a fine, aromatic Barolo.",
 ["Giuseppe Rinaldi", "Giacomo Grimaldi", "Ferdinando Principiano"])
mga("castellero", "Castellero", "Barolo", B, 44.6122, 7.9520, "approx",
 "A small, south-west-facing slope east of Barolo village toward the Castiglione Falletto border. Giacomo Brezza and the Barale family make classic, medium-weight Castellero from old vines.",
 ["Brezza", "Fratelli Barale", "Cascina Adelaide"])
mga("terlo", "Terlo", "Barolo", B, 44.6040, 7.9463, "approx",
 "South-east of Barolo village toward Monforte and Novello, bordering Ravera. Higher and cooler than Cannubi, it gives tight, mineral wines that have gained favour in warm vintages.",
 ["Poderi Luigi Einaudi", "Marchesi di Barolo"])
mga("paiagallo", "Paiagallo", "Barolo", B, 44.6064, 7.9415, "approx",
 "A steep south-facing slope just below Barolo village on the south. Its name means 'rooster's straw' in dialect. Giovanni Canonica, one of the most admired small traditionalists of the 2010s, bottles a celebrated Paiagallo from a hectare of old vines.",
 ["Giovanni Canonica", "Mirafiore"])
mga("coste-di-rose", "Coste di Rose", "Barolo", B, 44.6052, 7.9488, "approx",
 "A high ridge between Barolo and Monforte with sandy, almost white soils. Coste di Rose wines are pale, perfumed and graceful, a showcase for the sandy end of Barolo's spectrum.",
 ["Marchesi di Barolo", "Fratelli Barale"])
mga("bricco-delle-viole", "Bricco delle Viole", "Barolo", B, 44.6151, 7.9285, "approx",
 "The highest point of the Barolo commune, around 450 to 480 m near the chapel of San Pietro delle Viole above the hamlet of Vergne. G.D. Vajra's Bricco delle Viole is the benchmark: ethereal, violet-scented Barolo that has gained in stature as warmer summers favour high sites.",
 ["G.D. Vajra", "Mario Marengo", "Sylla Sebaste"])
mga("liste", "Liste", "Barolo", B, 44.6124, 7.9348, "approx",
 "A south-facing amphitheatre west of Barolo village below Vergne. Borgogno, the old Barolo house founded in 1761 and revived by the Farinetti family, has made Liste its flagship single vineyard.",
 ["Borgogno", "Giacomo Borgogno & Figli"])
mga("fossati", "Fossati", "Barolo and La Morra", B, 44.6196, 7.9325, "approx",
 "Straddling the Barolo and La Morra border north-west of Barolo village, Fossati faces south-east and gives perfumed, mid-weight Barolo. Enzo Boglietti and Dosio bottle it.",
 ["Enzo Boglietti", "Dosio", "Borgogno"])
mga("rue", "Rué", "Barolo", B, 44.6131, 7.9472, "approx",
 "A small site between Barolo village and Cannubi, one of the four parcels in Bartolo Mascarello's classic blend. Today Rué is bottled on its own by a few growers.",
 ["Bartolo Mascarello", "Giacomo Fenocchio"])

# ---------------- La Morra ----------------
mga("brunate", "Brunate", "La Morra and Barolo", B, 44.6268, 7.9458, "approx",
 "One of the two or three greatest crus of the western Barolo zone, about 25 ha on a steep south to south-east-facing slope below the little Brunate chapel, straddling the La Morra and Barolo border. Calcareous Sant'Agata marls give wines of depth and structure unusual for La Morra. Giuseppe Rinaldi's Brunate, Roberto Voerzio's and Marcarini's are references; Ceretto and Vietti bottle it too.",
 ["Giuseppe Rinaldi", "Roberto Voerzio", "Marcarini", "Ceretto", "Vietti", "Oddero", "Elio Altare", "Francesco Rinaldi"])
mga("cerequio", "Cerequio", "La Morra and Barolo", B, 44.6231, 7.9405, "approx",
 "A natural amphitheatre just west of Brunate, around the restored hamlet of Palais Cerequio. Cerequio's warm, sheltered bowl gives rich, ripe Barolo; Roberto Voerzio's tiny-yield Cerequio was a symbol of the 1990s modernist peak; Michele Chiarlo owns the largest share, and Gaja's Conteisa comes from Cerequio vines bought in 1995.",
 ["Michele Chiarlo", "Roberto Voerzio", "Batasiolo", "Giuseppe Contratto"])
mga("rocche-dell-annunziata", "Rocche dell'Annunziata", "La Morra", B, 44.6343, 7.9495, "approx",
 "About 30 ha of steep, crumbling slopes (*rocche*) dropping from the hamlet of Torriglione toward the Annunziata valley. Two sectors, one facing south-east and one south to south-west, on blue marl veined with sand. The wines are the most perfumed and seductive of La Morra, all rose, red cherry and spice. Renato Ratti's Rocche, Paolo Scavino's Rocche dell'Annunziata Riserva and Trediberri are classics.",
 ["Renato Ratti", "Paolo Scavino", "Roberto Voerzio", "Rocche Costamagna", "Aurelio Settimo", "Mauro Veglio", "Trediberri", "Fratelli Revello"])
mga("arborina", "Arborina", "La Morra", B, 44.6396, 7.9512, "approx",
 "A gentle, south-east-facing slope north of the Annunziata. Elio Altare's Arborina, from vines near his house, was one of the founding wines of the modernist movement after he cut up his father's old casks with a chainsaw in the early 1980s.",
 ["Elio Altare", "Mauro Veglio", "Gianfranco Bovio"])
mga("gattera", "Gattera", "La Morra", B, 44.6413, 7.9534, "approx",
 "North-east of the Annunziata, where Mauro Veglio and Bovio farm. Gattera wines are generous and early to open.",
 ["Mauro Veglio", "Gianfranco Bovio", "Cordero di Montezemolo"])
mga("conca", "Conca", "La Morra", B, 44.6353, 7.9546, "approx",
 "A tiny, south-facing amphitheatre (*conca* means bowl) just below Ratti's Abbazia dell'Annunziata. Renato Ratti's Conca was one of the first single-vineyard Barolos of the 1970s.",
 ["Renato Ratti", "Mauro Molino"])
mga("serradenari", "Serradenari", "La Morra", B, 44.6299, 7.9245, "approx",
 "The highest MGA in La Morra, around 500 to 530 m on the ridge south-west of the village. Once thought too cool for Barolo, it now makes taut, fragrant wines prized in hot years.",
 ["Giulia Negri", "Damilano"])
mga("case-nere", "Case Nere", "La Morra", B, 44.6236, 7.9321, "approx",
 "On the La Morra side of the Barolo border near Fossati, south-facing. Enzo Boglietti's Case Nere is the best known.",
 ["Enzo Boglietti"])
mga("bricco-san-biagio", "Bricco San Biagio", "La Morra", B, 44.6457, 7.9558, "approx",
 "A hilltop site east of Santa Maria named after its chapel, giving supple, fragrant wines.",
 ["Roberto Voerzio", "Ciabot Berton"])
mga("bricco-manzoni", "Bricco Manzoni", "La Morra", B, 44.6385, 7.9625, "approx",
 "Not to be confused with Rocche dei Manzoni in Monforte: a small rise near the hamlet of Manzoni at the eastern edge of La Morra, toward the Castiglione Falletto border.",
 ["Rocche Costamagna"])

# ---------------- Castiglione Falletto ----------------
mga("monprivato", "Monprivato", "Castiglione Falletto", B, 44.6242, 7.9714, "approx",
 "About 7 ha on the south-west-facing slope below Castiglione Falletto, almost entirely owned by Giuseppe Mascarello e Figlio. The family bought its first Monprivato vines in 1904 and gradually acquired almost the whole slope; Mauro Mascarello first bottled it alone in 1970. Clay-marl over limestone gives Barolo of exquisite balance and longevity; Ca' d'Morissio, a Riserva from a Michet clone selection, is made only in the greatest years.",
 ["Giuseppe Mascarello e Figlio"])
mga("villero", "Villero", "Castiglione Falletto", B, 44.6232, 7.9822, "approx",
 "A large south-west-facing amphitheatre south of Castiglione village with deep marl, considered by many the finest site in the commune. Vietti's Villero Riserva (only in top vintages), Brovia, Giacomo Fenocchio and Boroli bottle it; the wines are powerful yet perfumed, combining the two sides of Barolo's geology.",
 ["Vietti", "Brovia", "Giacomo Fenocchio", "Oddero", "Boroli", "Giuseppe Mascarello e Figlio"])
mga("rocche-di-castiglione", "Rocche di Castiglione", "Castiglione Falletto and Monforte d'Alba", B, 44.6158, 7.9792, "approx",
 "A narrow escarpment running south from Castiglione Falletto toward Perno, facing south-east above the valley toward Serralunga. The steep, crumbling sandstone and marl give the most elegant, aromatic wines of the commune. Brovia, Vietti, Oddero and Giuseppe Mascarello's former Rocche parcels are famous; Bruno Giacosa's 1978 Rocche is a legend.",
 ["Brovia", "Vietti", "Oddero", "Paolo Scavino", "Fratelli Monchiero"])
mga("bricco-boschis", "Bricco Boschis", "Castiglione Falletto", B, 44.6282, 7.9772, "approx",
 "The hill north-east of Castiglione Falletto that is essentially the Cavallotto family estate, which they have farmed since 1928 and bottled since 1948. Vigna San Giuseppe, the steep heart, gives their famous Riserva. Cavallotto were early converts to grassed vineyards and natural methods.",
 ["Cavallotto"])
mga("fiasco", "Fiasco", "Castiglione Falletto", B, 44.6293, 7.9688, "approx",
 "A west-facing slope near Paolo Scavino's winery; Scavino's 'Bric del Fiasc' from here made Enrico Scavino's reputation as a modernist in the 1980s.",
 ["Paolo Scavino", "Azelia"])
mga("mariondino", "Mariondino", "Castiglione Falletto", B, 44.6196, 7.9701, "approx",
 "South-west of the village toward Bussia, giving fine, mid-weight wines. Parusso and Armando Parusso farm here.",
 ["Parusso", "Ettore Fontana"])
mga("scarrone", "Scarrone", "Castiglione Falletto", B, 44.6252, 7.9778, "approx",
 "Directly below Vietti's cellar in the village, famous for Vietti's old-vine Barbera d'Alba Vigna Scarrone and Vigna Vecchia Scarrone as much as for Nebbiolo.",
 ["Vietti", "Fratelli Monchiero"])
mga("pira", "Pira", "Castiglione Falletto", B, 44.6320, 7.9700, "approx",
 "North-west of the village; Roagna's Pira estate, bought in 1989, is a monument of traditional winemaking with very long macerations.",
 ["Roagna"])
mga("bricco-rocche", "Bricco Rocche", "Castiglione Falletto", B, 44.6216, 7.9802, "approx",
 "The top of the Castiglione hill above the Rocche, a Ceretto monopole crowned by their glass tasting cube. Ceretto's Bricco Rocche was one of the first prestige single-vineyard Barolos of the 1980s.",
 ["Ceretto"])
mga("montanello", "Montanello", "Castiglione Falletto", B, 44.6219, 7.9740, "approx",
 "A south-west-facing slope on the road from Castiglione to Monforte, named after the Tenuta Montanello whose 18th-century cellar still stands.",
 ["Tenuta Montanello", "Monchiero"])

# ---------------- Monforte d'Alba ----------------
mga("bussia", "Bussia", "Monforte d'Alba and Barolo", B, 44.6040, 7.9590, "approx",
 "With almost 300 ha, the largest MGA in Barolo and the clearest case of how an MGA is a place name, not a quality rank. It sweeps from the Barolo border through a series of amphitheatres toward Castiglione Falletto. The historic heart, Bussia Soprana with Aldo Conterno's Colonnello, Cicala and Romirasco parcels, faces south-west; outer sectors like Munie are less prized. Prunotto's Bussia (1961) was one of the first single-vineyard Barolos ever labelled.",
 ["Aldo Conterno", "Prunotto", "Poderi Colla", "Giacomo Fenocchio", "Oddero", "Silvano Bolmida", "Barale", "Ceretto"])
mga("ginestra", "Ginestra", "Monforte d'Alba", B, 44.5935, 7.9800, "approx",
 "A broad, south to south-east-facing amphitheatre east of Monforte village at 300 to 450 m, on compact Serravallian sandstone and marl. Ginestra wines are deep, dark and long-lived. Its sub-sites are famous in their own right: Domenico Clerico's Ciabot Mentin and Pajana, Elio Grasso's Casa Maté, Conterno Fantino's Sorì Ginestra and Vigna del Gris, Paolo Conterno's Ginestra.",
 ["Elio Grasso", "Conterno Fantino", "Domenico Clerico", "Paolo Conterno", "Prunotto", "Giovanni Manzone"])
mga("mosconi", "Mosconi", "Monforte d'Alba", B, 44.5873, 7.9850, "approx",
 "South of Ginestra near Case Mosconi, rising to about 450 m. Long split among small growers, it became sought-after when Pio Cesare and Conterno Fantino bought in, and is known for broad, structured wines.",
 ["Pio Cesare", "Conterno Fantino", "Domenico Clerico", "Bruna Grimaldi"])
mga("castelletto", "Castelletto", "Monforte d'Alba", B, 44.6000, 7.9725, "approx",
 "Near the hamlet of Castelletto by Perno, facing east to south-east toward Serralunga. Fortemasso and Giuseppe Mascarello hold vines here.",
 ["Fortemasso", "Mauro Veglio"])
mga("gramolere", "Gramolere", "Monforte d'Alba", B, 44.6040, 7.9697, "approx",
 "A west-facing slope around Cascina Gramolere between Bussia and Castelletto; Giovanni Manzone's Gramolere is the benchmark.",
 ["Giovanni Manzone", "Fratelli Alessandria"])
mga("santo-stefano-di-perno", "Santo Stefano di Perno", "Monforte d'Alba", B, 44.6088, 7.9760, "approx",
 "Slopes around the hamlet of Perno facing east toward Serralunga. Giuseppe Mascarello's Santo Stefano di Perno is the reference, a firmer, more austere counterpart to his Monprivato.",
 ["Giuseppe Mascarello e Figlio", "Rocche dei Manzoni"])
mga("le-coste-di-monforte", "Le Coste di Monforte", "Monforte d'Alba", B, 44.5823, 7.9857, "approx",
 "South-east of Monforte village on high, sandy slopes. Often finer and more floral than the rest of Monforte.",
 ["Diego Conterno", "Giovanni Manzone"])
mga("bricco-san-pietro", "Bricco San Pietro", "Monforte d'Alba", B, 44.5870, 7.9585, "approx",
 "A large, high MGA west of Monforte by Bussia San Pietro, rising above 500 m. Increasingly valued for freshness in hot vintages.",
 ["Rocche dei Manzoni", "Bussia Soprana"])

# ---------------- Serralunga d'Alba ----------------
mga("francia", "Francia", "Serralunga d'Alba", B, 44.5945, 8.0022, "approx",
 "Giacomo Conterno's 14-ha monopole, bought by Giovanni Conterno in 1974 from the estate of Cascina Francia. The source of Monfortino (since the 1978 vintage) and of Barolo Cascina Francia, now labelled simply 'Francia'. West-facing at about 350 to 430 m on poor Serravallian marl, it gives some of the most structured and long-lived Barolo of all.",
 ["Giacomo Conterno"])
mga("arione", "Arione", "Serralunga d'Alba", B, 44.5918, 8.0012, "approx",
 "The southernmost great vineyard of Serralunga, next to Francia. Roberto Conterno bought most of it from the Gigi Rosso family in 2015, releasing Barolo Arione from 2015; the purchase was the headline land deal of that decade.",
 ["Giacomo Conterno", "Gigi Rosso"])
mga("falletto", "Falletto", "Serralunga d'Alba", B, 44.5975, 8.0088, "approx",
 "Bruno Giacosa's estate vineyard, bought in 1982, south of Serralunga village. The upper sector gives Le Rocche del Falletto, whose Riserva (red label) is among the most coveted Barolos made. Falletto's calcareous marl gives austere, slow-maturing wines that Giacosa crafted in large oak.",
 ["Bruno Giacosa"])
mga("vignarionda", "Vignarionda", "Serralunga d'Alba", B, 44.6018, 8.0085, "approx",
 "About 10 ha of south to south-west-facing amphitheatre at around 330 m south of Serralunga village, on calcareous marl. Long regarded as Serralunga's greatest cru; Massolino's Vigna Rionda Riserva, Oddero, Luigi Pira, Giacomo Anselma and Arnaldo Rivera bottle it. The wines are dense, mineral and very long-lived.",
 ["Massolino", "Oddero", "Luigi Pira", "Giacomo Anselma", "Arnaldo Rivera", "Ettore Germano"])
mga("lazzarito", "Lazzarito", "Serralunga d'Alba", B, 44.6062, 8.0058, "approx",
 "An elevated, sheltered site south-east of the village with marked limestone. Its name may come from a lazaretto (plague hospital). Fontanafredda is the main owner (Vigna La Delizia); Vietti, Ettore Germano and Guido Porro (whose lower parcel is Lazzairasco) also bottle it. The wines are perfumed yet firm.",
 ["Fontanafredda", "Vietti", "Ettore Germano", "Guido Porro", "Gianni Gagliardo"])
mga("ornato", "Ornato", "Serralunga d'Alba", B, 44.6004, 8.0006, "approx",
 "Around the hamlet of Ornato south of the village, south-west facing. Pio Cesare's Ornato, first released in 1985, made it famous.",
 ["Pio Cesare", "Palladino"])
mga("cerretta", "Cerretta", "Serralunga d'Alba", B, 44.6257, 7.9995, "approx",
 "A long ridge in the north of Serralunga around the hamlet of Cerretta, at 300 to 400 m. Ettore Germano, Giovanni Rosso and Elio Altare (who bought in 2007) make powerful, tannic Cerretta.",
 ["Ettore Germano", "Giovanni Rosso", "Elio Altare", "Schiavenza"])
mga("parafada", "Parafada", "Serralunga d'Alba", B, 44.6185, 7.9931, "approx",
 "A west-facing slope north of the village around Cascina Parafada, giving rich, ripe Serralunga. Massolino's Parafada is the reference.",
 ["Massolino", "Palladino", "Vietti"])
mga("badarina", "Badarina", "Serralunga d'Alba", B, 44.5972, 8.0072, "approx",
 "A high, south-east-facing site in the south-east of the commune toward Roddino. Bruna Grimaldi's Badarina is the best-known bottling.",
 ["Bruna Grimaldi"])
mga("briccolina", "Briccolina", "Serralunga d'Alba", B, 44.5925, 8.0010, "approx",
 "A small, steep slope near Francia in the south of Serralunga, known through Batasiolo's single-vineyard bottling.",
 ["Batasiolo", "Rivetto"])
mga("gabutti", "Gabutti", "Serralunga d'Alba", B, 44.6120, 8.0045, "approx",
 "Just east of the village, a site associated with the Cappellano family's Pie Franco and Pie Rupestris bottlings (from ungrafted and grafted vines) and with Gabutti-Boasso.",
 ["Cappellano", "Gabutti-Boasso", "Sordo"])
mga("prapo", "Prapò", "Serralunga d'Alba", B, 44.6230, 8.0028, "approx",
 "A steep, south-east-facing amphitheatre in the north-east of Serralunga. Ceretto, Ettore Germano and Schiavenza bottle it.",
 ["Ceretto", "Ettore Germano", "Schiavenza", "Mauro Sebaste"])
mga("marenca", "Marenca", "Serralunga d'Alba", B, 44.6145, 7.9963, "approx",
 "Just north-west of the village, adjoining Margheria; Luigi Pira's Marenca is the classic.",
 ["Luigi Pira"])
mga("margheria", "Margheria", "Serralunga d'Alba", B, 44.6126, 7.9970, "approx",
 "West-facing, just below Serralunga's castle, sandier and gentler than most of the commune. Massolino and Luigi Pira bottle it.",
 ["Massolino", "Luigi Pira", "Azelia"])
mga("baudana", "Baudana", "Serralunga d'Alba", B, 44.6283, 7.9927, "approx",
 "In the north of Serralunga around the hamlet of Baudana, with mixed exposures. Luigi Baudana's small estate, now owned by G.D. Vajra, made it famous.",
 ["Luigi Baudana (G.D. Vajra)", "Zunino"])
mga("boscareto", "Boscareto", "Serralunga d'Alba", B, 44.6002, 8.0080, "approx",
 "South-east of the village on high ground; Batasiolo and Ferdinando Principiano bottle it.",
 ["Batasiolo", "Ferdinando Principiano"])
mga("fontanafredda-mga", "Fontanafredda", "Serralunga d'Alba", B, 44.6378, 7.9862, "approx",
 "The MGA surrounding the former royal estate at the northern tip of Serralunga, mostly owned by Fontanafredda itself.",
 ["Fontanafredda"])
mga("sorano", "Sorano", "Serralunga d'Alba and Diano d'Alba", B, 44.6325, 7.9935, "approx",
 "A small MGA by the hamlet of Sorano that crosses into Diano d'Alba, one of the few Barolo crus shared with Diano.",
 ["Ascheri", "Alario"])

# ---------------- Verduno, Novello, Grinzane, Roddi, Cherasco ----------------
mga("monvigliero", "Monvigliero", "Verduno", B, 44.6622, 7.9372, "approx",
 "The grand cru of Verduno: a south-facing slope east of the village, on the Tanaro side of the zone, with sandy Tortonian marl. Its wines are perfumed, spicy and transparent, with famous whole-cluster interpretations by G.B. Burlotto. Paolo Scavino, Castello di Verduno, Bel Colle and Fratelli Alessandria also make it, and its price and prestige have soared since the 2000s.",
 ["G.B. Burlotto", "Castello di Verduno", "Fratelli Alessandria", "Paolo Scavino", "Bel Colle", "Diego Morra"])
mga("massara", "Massara", "Verduno", B, 44.6590, 7.9302, "approx",
 "South-west of Verduno toward La Morra; Castello di Verduno's Massara is the main bottling.",
 ["Castello di Verduno"])
mga("breri", "Breri", "Verduno", B, 44.6716, 7.9450, "approx",
 "A slope by the hamlet of Breri east of Verduno, close to Roddi.",
 ["Fratelli Alessandria"])
mga("ravera", "Ravera", "Novello and Barolo", B, 44.5992, 7.9395, "approx",
 "A high ridge east of Novello at 380 to 450 m, bordering Barolo's Terlo. Elvio Cogno's estate sits on it, and Vietti's Ravera (first vintage 2008) quickly became one of their top wines. Cool, calcareous and windswept, Ravera gives tense, aromatic Barolo.",
 ["Elvio Cogno", "Vietti", "Giuseppe Rinaldi", "G.D. Vajra", "Flavio Roddolo"])
mga("panerole", "Panerole", "Novello", B, 44.5905, 7.9460, "approx",
 "Below the hamlet of Panerole east of Novello, a high, fresh site.",
 ["Le Strette"])
mga("castello-grinzane", "Castello", "Grinzane Cavour", B, 44.6525, 7.9958, "approx",
 "The vineyard below the castle of Grinzane Cavour, where Cavour managed the family estate and, with the help of Paolo Francesco Staglieno, made some of the first dry, cellar-aged Barolo in the 1830s and 1840s.",
 ["Castello di Grinzane", "Canonica"])
mga("garretti", "Garretti", "Grinzane Cavour", B, 44.6545, 7.9890, "approx",
 "On the western edge of Grinzane toward Gallo d'Alba; one of the lower, warmer MGAs of the zone.",
 [])
mga("bricco-ambrogio", "Bricco Ambrogio", "Roddi", B, 44.6745, 7.9720, "approx",
 "The only MGA in Roddi, a south-facing hill above the Tanaro near the castle. Paolo Scavino's Bricco Ambrogio showed what Roddi could do.",
 ["Paolo Scavino", "Brezza"])
mga("mantoetto", "Mantoetto", "Cherasco", B, 44.6460, 7.8935, "approx",
 "The only MGA in Cherasco, the westernmost and smallest outpost of Barolo, near the confluence of the Tanaro and Stura.",
 ["Mauro Veglio"])

# ---------------- BARBARESCO MGAs ----------------
def bm(slug, name, commune, lat, lon, q, text, prods=()):
    mga(slug, name, commune, BB, lat, lon, q, text, prods)

bm("asili", "Asili", "Barbaresco", 44.7160, 8.0812, "approx",
 "About 14 ha of south-west-facing slope at 200 to 270 m south of Barbaresco village, on silty loam, clay and sand over marl. Asili is the most perfumed of the great Barbaresco crus, all violets and silk. Bruno Giacosa's red-label Asili Riserva, Ceretto's Bricco Asili, Produttori del Barbaresco's Riserva and Ca' del Baio are classics.",
 ["Bruno Giacosa", "Ceretto", "Produttori del Barbaresco", "Ca' del Baio", "Cascina Luisin", "Michele Chiarlo", "Roagna"])
bm("rabaja", "Rabajà", "Barbaresco", 44.7122, 8.0852, "approx",
 "About 20 ha facing south and south-west south of Asili and Martinenga, on limestone with sand and clay. Rabajà gives a fuller, more muscular Barbaresco than Asili, with black cherry and spice. Bruno Rocca's winery sits in it, and Produttori, Giuseppe Cortese, Castello di Verduno and Cascina Luisin bottle it.",
 ["Bruno Rocca", "Produttori del Barbaresco", "Giuseppe Cortese", "Castello di Verduno", "Cascina Luisin", "Bera"])
bm("martinenga", "Martinenga", "Barbaresco", 44.7137, 8.0818, "approx",
 "A 12-ha amphitheatre between Asili and Rabajà, a monopole of the Marchesi di Grésy since the 18th century. Its two best parcels, Camp Gros and Gaiun, are bottled as Riservas.",
 ["Marchesi di Grésy"])
bm("montestefano", "Montestefano", "Barbaresco", 44.7245, 8.0905, "approx",
 "A steep, south-facing slope east of the village with high calcium content, giving the most structured and tannic wines of Barbaresco. Prunotto released the first labelled Montestefano in 1961; Produttori del Barbaresco and Serafino Rivella are references.",
 ["Produttori del Barbaresco", "Serafino Rivella", "Prunotto", "La Cà Növa", "Luigi Giordano"])
bm("montefico", "Montefico", "Barbaresco", 44.7272, 8.0885, "approx",
 "North-east of the village, adjoining Montestefano, on white calcareous marl. Tight and mineral; Roagna's Montefico Vecchie Viti and the Produttori Riserva are benchmarks.",
 ["Roagna", "Produttori del Barbaresco", "La Cà Növa"])
bm("ovello", "Ovello", "Barbaresco", 44.7290, 8.0750, "approx",
 "North-west of the village above the Tanaro, cooler and later-ripening. Produttori del Barbaresco and Cantina del Pino make classic Ovello.",
 ["Produttori del Barbaresco", "Cantina del Pino", "Cascina Morassino", "Rocca Albino"])
bm("pora", "Pora", "Barbaresco", 44.7177, 8.0765, "approx",
 "West of Asili, south-west facing, a lighter, fragrant style. Produttori bottles a Pora Riserva and Ca' del Baio a Pora.",
 ["Produttori del Barbaresco", "Ca' del Baio", "Musso"])
bm("rio-sordo", "Rio Sordo", "Barbaresco", 44.7123, 8.0759, "approx",
 "West of Rabajà on the slope down to the 'silent stream' (*rio sordo*) toward Treiso, with sandier soils. Produttori, Cascina Bruciata and Brovia bottle it.",
 ["Produttori del Barbaresco", "Cascina Bruciata", "Brovia", "Musso"])
bm("paje", "Pajè", "Barbaresco", 44.7212, 8.0790, "approx",
 "Just south-west of the village. Roagna's Pajè is one of the great old-school Barbarescos, and Produttori makes a Pajè Riserva.",
 ["Roagna", "Produttori del Barbaresco", "Secondo Pasquero Elia"])
bm("moccagatta", "Moccagatta", "Barbaresco", 44.7184, 8.0846, "approx",
 "North of Asili around the hamlet and winery of the same name. Produttori del Barbaresco's Moccagatta Riserva and the Minuto family's Moccagatta estate.",
 ["Produttori del Barbaresco", "Moccagatta"])
bm("secondine", "Secondine", "Barbaresco", 44.7196, 8.0815, "approx",
 "Between the village and Asili, the source of Gaja's Sorì San Lorenzo, a south-facing parcel the Gajas bought in 1964 that took its name from the patron saint of Alba's cathedral, which once owned it.",
 ["Gaja", "Ada Nada"])
bm("roncaglie", "Roncaglie", "Barbaresco", 44.7258, 8.0748, "approx",
 "West of the village toward the Tanaro, home of Gaja's Sorì Tildin, named after Angelo Gaja's grandmother Clotilde Rey.",
 ["Gaja", "Poderi Colla"])
bm("faset", "Faset", "Barbaresco", 44.7303, 8.0798, "approx",
 "North of the village, sloping toward the Tanaro; Bottega and Castello di Verduno farm here.",
 ["Castello di Verduno", "Bottega Vinai"])
bm("tre-stelle", "Tre Stelle", "Barbaresco", 44.7071, 8.0866, "approx",
 "Around the hamlet of Tre Stelle in the south of the commune; Sottimano's and Rizzi's parcels nearby.",
 ["Sottimano", "Albino Rocca"])
bm("gallina", "Gallina", "Neive", 44.7292, 8.1022, "approx",
 "A south-facing hill west of Neive village that gives rich, ripe wines; La Spinetta's Gallina, Ugo Lequio and Oddero's Gallina are the best known.",
 ["La Spinetta", "Ugo Lequio", "Oddero", "Piero Busso"])
bm("albesani", "Albesani", "Neive", 44.7340, 8.1015, "approx",
 "A large MGA north-west of Neive, south-facing. It contains the vineyard of Santo Stefano, made famous by Bruno Giacosa and owned by Castello di Neive, as well as Cantina del Pino and Piero Busso holdings.",
 ["Castello di Neive", "Bruno Giacosa", "Piero Busso", "Cantina del Pino"])
bm("starderi", "Starderi", "Neive", 44.7432, 8.1140, "approx",
 "North of Neive around the hamlet of Starderi, the source of La Spinetta's Starderi.",
 ["La Spinetta"])
bm("serraboella", "Serraboella", "Neive", 44.7169, 8.1300, "approx",
 "East of Neive near Bricco di Neive; Cigliuti and Paitin (whose Sorì Paitin is here) are the reference estates.",
 ["Cigliuti", "Paitin", "Sottimano"])
bm("cotta", "Cottà", "Neive", 44.7135, 8.0934, "approx",
 "On the Neive side of the border with Barbaresco, near the hamlet of Cottà, south-west facing. Sottimano's Cottà is the classic.",
 ["Sottimano", "Ugo Lequio"])
bm("curra", "Currà", "Neive", 44.7215, 8.0990, "approx",
 "A small, steep, south-west-facing site in Neive near the Barbaresco border, next to Gallina, on sandy marl. Sottimano and Bruno Rocca bottle Currà as an intense, spicy single-vineyard Barbaresco.",
 ["Sottimano", "Bruno Rocca"])
bm("basarin", "Basarin", "Neive", 44.7095, 8.1090, "approx",
 "South of Neive on high ground; Adriano Marco e Vittorio and Moccagatta bottle it.",
 ["Adriano Marco e Vittorio", "Moccagatta"])
bm("bricco-di-neive", "Bricco di Neive", "Neive", 44.7116, 8.1341, "approx",
 "The high hill east of Neive at around 400 m, one of the coolest spots in the zone.",
 ["Cigliuti", "Paitin"])
bm("pajore", "Pajorè", "Treiso", 44.6965, 8.0800, "approx",
 "Treiso's most historic cru, on the border with Barbaresco, famed in the 19th century. Sottimano and Rizzi have restored its reputation; Gaja's Sorì Tildin and the Giacosa family once bought grapes here.",
 ["Sottimano", "Rizzi"])
bm("marcarini-treiso", "Marcarini", "Treiso", 44.6999, 8.0847, "approx",
 "Around the hamlet of Marcarini near Ferrere, home of Ca' del Baio and of Ada Nada's vines.",
 ["Ca' del Baio", "Ada Nada"])
bm("nervo", "Nervo", "Treiso", 44.6930, 8.0700, "approx",
 "A high west-facing slope in Treiso toward San Rocco Seno d'Elvio, known for fresh, sinewy wines.",
 ["Rizzi"])
bm("rizzi-mga", "Rizzi", "Treiso", 44.6895, 8.0711, "approx",
 "The MGA around the Dellapiana family's Rizzi estate, a source of lean, perfumed Treiso Barbaresco.",
 ["Rizzi"])
bm("pertinace-mga", "Pertinace", "Treiso", 44.7025, 8.0645, "approx",
 "Named after the hamlet of Pertinace, birthplace (by tradition) of the Roman emperor Publius Helvius Pertinax (reigned AD 193). Home of the Cantina Vignaioli Elvio Pertinace cooperative.",
 ["Cantina Vignaioli Elvio Pertinace"])
bm("meruzzano", "Meruzzano", "Treiso", 44.6706, 8.0899, "approx",
 "The southernmost part of the Barbaresco zone around the hamlet of Meruzzano, high and cool at up to 450 m.",
 ["Rizzi", "Cascina Saria"])

# ---------------- PRODUCERS / ESTATES (Langhe) ----------------
def est(slug, name, app, lat, lon, q, text, prods=(), kind="estate", cls="Producer"):
    sites.append(S(slug, name, kind, cls, app, lat, lon, q, text, prods or [name]))

est("giacomo-conterno", "Giacomo Conterno", B, 44.5813, 7.9642, "approx",
 "The most revered name in Barolo, based in Monforte d'Alba. Giacomo Conterno started bottling in the 1920s; his son Giovanni bought the Cascina Francia vineyard in Serralunga in 1974, and grandson Roberto (since 2004) added Cerretta (2008), Arione (2015) and Nervi in Gattinara (2018). Monfortino Riserva, aged up to seven years in large casks, is Italy's most sought-after red.")
est("bartolo-mascarello", "Bartolo Mascarello", B, 44.6106, 7.9405, "precise",
 "The small cellar on Via Roma in Barolo village where Bartolo Mascarello (1926 to 2005), the 'last of the Mohicans', blended Cannubi, San Lorenzo, Rué and Rocche dell'Annunziata into a single Barolo and drew hand-painted labels reading 'No Barrique, No Berlusconi'. His daughter Maria Teresa keeps the style unchanged.")
est("giuseppe-rinaldi", "Giuseppe Rinaldi", B, 44.6083, 7.9419, "precise",
 "The family cellar at the edge of Barolo village, a citadel of tradition run by Beppe 'Citrico' Rinaldi until his death in 2018 and now by his daughters Marta and Carlotta. Brunate, Tre Tine (Cannubi San Lorenzo, Ravera, Le Coste), Bussia and Rocche dell'Annunziata are fermented in old wooden vats and aged in large casks.")
est("giuseppe-mascarello", "Giuseppe Mascarello e Figlio", B, 44.5745, 7.9240, "approx",
 "Based in Monchiero, just outside the Barolo zone, with cellars dating to the 18th century, once used to store ice. Mauro Mascarello and his son Giuseppe make Monprivato, Ca' d'Morissio, Villero and Santo Stefano di Perno in large casks; among the purest expressions of Castiglione Falletto.")
est("bruno-giacosa", "Bruno Giacosa", BB, 44.7258, 8.1150, "approx",
 "The Neive cellar of Bruno Giacosa (1929 to 2018), who made legendary Barbaresco and Barolo first from bought grapes (Santo Stefano, Asili, Rabajà, Rocche di Castiglione) and later from his own Falletto and Asili. His red labels (Riservas) are among the greatest Nebbiolos of the 20th century. His daughter Bruna runs it today.")
est("vietti", "Vietti", B, 44.6241, 7.9789, "precise",
 "Founded in Castiglione Falletto in the 19th century; Alfredo Currado (1932 to 2010) married into the family and made it famous, bottling single-vineyard Barolos from the 1960s and rescuing Arneis. Since 2016 it has been owned by the Krause family of Iowa; Luca Currado left in 2023. The cellar burrows under the village.")
est("cavallotto", "Cavallotto (Tenuta Bricco Boschis)", B, 44.6287, 7.9772, "precise",
 "The Cavallotto family's estate on Bricco Boschis in Castiglione Falletto, farmed since 1928 and bottled since 1948. Classic, long-macerated Barolo from Bricco Boschis Vigna San Giuseppe and Vignolo, and a pioneering green-cover, low-chemical approach from the 1970s.")
est("burlotto", "G.B. Burlotto", B, 44.6662, 7.9312, "approx",
 "Verduno's historic house, founded by Giovan Battista Burlotto, who supplied the House of Savoy and won medals in the 1880s. Fabio Alessandria's whole-cluster, foot-trodden Monvigliero turned it into one of the most sought-after Barolos of the 2010s; it also makes the benchmark Verduno Pelaverga.")
est("roberto-voerzio", "Roberto Voerzio", B, 44.6340, 7.9330, "approx",
 "La Morra estate founded in 1986 by Roberto Voerzio, known for extreme green-harvesting (sometimes under 500 grams of grapes per vine) and modern but site-driven wines from Brunate, Cerequio, Rocche dell'Annunziata-Torriglione and Sarmassa.")
est("elio-altare", "Elio Altare", B, 44.6399, 7.9490, "precise",
 "The Annunziata estate where Elio Altare, after visiting Burgundy in the 1970s, took a chainsaw to his father's old casks and launched Barolo's modernist movement. His daughter Silvia now runs it; Arborina and Cerretta are the crus.")
est("renato-ratti", "Renato Ratti (Abbazia dell'Annunziata)", B, 44.6359, 7.9549, "precise",
 "Renato Ratti (1934 to 1988) drew the first map of Barolo's historic crus in the 1970s, launched Rocche and Conca single-vineyard wines and founded the wine museum in the former Benedictine Abbey of the Annunziata. The family's modern cellar is nearby.",
 kind="estate")
est("gaja", "Gaja", BB, 44.7261, 8.0807, "precise",
 "The Barbaresco house founded in 1859 and transformed by Angelo Gaja from the 1960s with single-vineyard Barbaresco (Sorì San Lorenzo 1967, Sorì Tildin 1970, Costa Russi 1978), barriques, Chardonnay and Cabernet in the Langhe, and global marketing. The family later bought Barolo vineyards (Sperss in Serralunga, Conteisa in La Morra), plus estates in Tuscany and on Etna.")
est("produttori-del-barbaresco", "Produttori del Barbaresco", BB, 44.7246, 8.0813, "approx",
 "The cooperative founded in 1958 by Don Fiorino Marengo, heir to Domizio Cavazza's 1894 Cantina Sociale. Its members farm roughly 100 ha; in great years it bottles nine single-MGA Riservas (Asili, Montefico, Montestefano, Muncagota, Ovello, Pajè, Pora, Rabajà, Rio Sordo), one of the best-value collections of great Nebbiolo anywhere.")
est("castello-falletti-wimu", "Castello Falletti and WiMu wine museum", B, 44.6113, 7.9439, "precise",
 "The castle of the Falletti marquises in Barolo village, where Juliette Colbert, Marchesa di Barolo, presided over the estate in the 19th century. Today it houses the WiMu wine museum and the Enoteca Regionale del Barolo in its cellars.",
 prods=["Enoteca Regionale del Barolo"], kind="museum", cls="Historic castle and museum")
est("marchesi-di-barolo", "Marchesi di Barolo", B, 44.6150, 7.9473, "precise",
 "The historic cellars across from the Falletti castle that trace their lineage to Juliette Colbert's estate. After her death in 1864 the Opera Pia Barolo charity inherited it; in 1929 the Abbona family bought the cellars and continue to make Cannubi and Sarmassa.")
est("fontanafredda", "Fontanafredda", B, 44.6383, 7.9871, "precise",
 "The royal hunting estate given by King Vittorio Emanuele II to his mistress Rosa Vercellana, 'la Bela Rosin', in 1858; their son Emanuele Alberto began making wine here in 1878. Its striped villa and village of cellars now belong to Oscar Farinetti (of Eataly), who also revived Borgogno and Mirafiore.",
 kind="historic", cls="Historic royal estate")
est("castello-grinzane-cavour", "Castello di Grinzane Cavour", B, 44.6532, 7.9949, "precise",
 "The castle where the young Camillo Benso, Count of Cavour, future architect of Italian unification, was mayor from 1832 and ran the family estate, hiring Paolo Francesco Staglieno to make dry Barolo. Now home to the Enoteca Regionale Piemontese Cavour and the annual white truffle auction. Part of the UNESCO site.",
 prods=["Enoteca Regionale Piemontese Cavour"], kind="historic", cls="Historic castle, UNESCO core zone")
est("castello-di-verduno", "Castello di Verduno", B, 44.6673, 7.9332, "precise",
 "Savoy castle bought by King Carlo Alberto in 1838, where royal winemakers worked with Nebbiolo; today a hotel and winery run by the Burlotto-Bianco family, making Monvigliero, Massara and Barbaresco Rabajà.")
est("massolino", "Massolino", B, 44.6098, 8.0003, "approx",
 "Family estate in the centre of Serralunga, founded 1896; makers of Vigna Rionda Riserva, Parafada, Margheria and Parussi.")
est("pio-cesare", "Pio Cesare", B, 44.7016, 8.0386, "precise",
 "Founded in 1881 inside Alba's old town, with cellars built on Roman walls. One of the few houses that still blend Barolo from several communes, alongside single-vineyard Ornato and Barbaresco Il Bricco.")
est("ceretto", "Ceretto", B, 44.6722, 7.9966, "precise",
 "Bruno and Marcello Ceretto turned their father's merchant house into a pioneer of single-vineyard Barolo and Barbaresco (Bricco Rocche, Brunate, Prapò, Bricco Asili) from the 1970s. Their hilltop headquarters at Monsordo Bernardina outside Alba features the 'Acino' glass bubble.")
est("elvio-cogno", "Elvio Cogno", B, 44.5948, 7.9381, "precise",
 "The Novello estate on the Ravera hill founded by Elvio Cogno, former winemaker at Marcarini. Now run by Nadia Cogno and Valter Fissore, it revived the Nascetta grape and makes the Ravera Riserva Vigna Elena from the Rosé clone of Nebbiolo.")
est("conterno-fantino", "Conterno Fantino", B, 44.5853, 7.9720, "precise",
 "Monforte estate (1982) on the Ginestra hill, known for Sorì Ginestra and Vigna del Gris.")
est("elio-grasso", "Elio Grasso", B, 44.5958, 7.9827, "precise",
 "Family estate in the Ginestra amphitheatre, makers of Ginestra Casa Maté and Gavarini Chiniera, and Runcot Riserva.")
est("paolo-scavino", "Paolo Scavino", B, 44.6308, 7.9653, "precise",
 "Castiglione Falletto house (1921) that Enrico Scavino turned into a modernist star in the 1980s; now run by his daughters with holdings in 20 MGAs including Bric del Fiasc, Rocche dell'Annunziata, Monvigliero and Cannubi.")
est("luciano-sandrone", "Luciano Sandrone", B, 44.6210, 7.9548, "precise",
 "Luciano Sandrone's 1978 debut made in a garage while he was cellar master at Marchesi di Barolo. Famous for Aleste (Cannubi Boschis) and Le Vigne, a blend of four communes.")
est("borgogno", "Borgogno", B, 44.6105, 7.9428, "precise",
 "Founded 1761 in Barolo village and famous for its huge library of old vintages; bought by Oscar Farinetti in 2008 and returned to concrete and large-cask tradition, with Cannubi and Liste at the top.")
est("terre-del-barolo", "Produttori di Terre del Barolo", B, 44.6450, 7.9754, "precise",
 "The Barolo zone's big cooperative, founded in 1958 by Arnaldo Rivera, mayor of Castiglione Falletto; its premium line carries his name.")
est("museo-ratti-annunziata", "Abbazia dell'Annunziata (Ratti wine museum)", B, 44.6367, 7.9539, "precise",
 "The 15th-century Benedictine abbey at the Annunziata where Renato Ratti opened the Museo Ratti dei Vini d'Alba in the 1970s, telling the story of Barolo's winemaking.",
 prods=["Renato Ratti"], kind="museum", cls="Historic abbey and wine museum")
est("la-morra-belvedere", "Belvedere di La Morra", B, 44.6376, 7.9347, "precise",
 "The terrace at the top of La Morra, at about 513 m, with the most famous panorama of the Barolo hills, the Alps beyond and, on clear days, Monviso.",
 prods=[], kind="landscape", cls="Viewpoint, UNESCO buffer zone")
est("castello-serralunga", "Castello di Serralunga d'Alba", B, 44.6108, 8.0002, "precise",
 "A 14th-century donjon castle of the Falletti family that dominates the village and gives Serralunga its silhouette.",
 prods=[], kind="historic", cls="Historic castle")
est("aldo-conterno", "Aldo Conterno", B, 44.6005, 7.9640, "approx",
 "Founded in 1969 when Aldo Conterno split from his brother Giovanni of Giacomo Conterno. The Bussia Soprana estate makes Colonnello, Cicala, Romirasco and the Granbussia Riserva blend.")
est("g-d-vajra", "G.D. Vajra", B, 44.6152, 7.9268, "approx",
 "Aldo Vaira's estate at Vergne, high on the Barolo commune, makers of Bricco delle Viole and Ravera Barolos and revivers of Freisa and Riesling in the Langhe.")
est("oddero", "Oddero", B, 44.6500, 7.9470, "approx",
 "Santa Maria di La Morra estate whose family has farmed since the 18th century; one of the first to bottle Barolo (1878). Holdings in Vignarionda, Villero, Rocche di Castiglione, Brunate and Bussia.")
est("roagna", "Roagna", BB, 44.7210, 8.0745, "approx",
 "Barbaresco house run by Luca Roagna, champion of ultra-long macerations and old-vine selections (Pajè, Montefico, Asili, Faset) plus the Pira estate in Castiglione Falletto.")
est("marchesi-di-gresy", "Marchesi di Grésy (Martinenga)", BB, 44.7135, 8.0815, "precise",
 "The Cisa Asinari family estate, owners of the Martinenga monopole since the 18th century; bottling since 1973.")
est("castello-di-neive", "Castello di Neive", BB, 44.7257, 8.1142, "precise",
 "The 18th-century castle of Neive, whose cellars hold Santo Stefano Barbaresco from the Albesani MGA, the vineyard Bruno Giacosa made famous from bought grapes in the 1960s and 1970s. Count Guido Stupino also revived Arneis plantings here in the 1960s.")
est("torre-di-barbaresco", "Torre di Barbaresco", BB, 44.7275, 8.0804, "precise",
 "The 11th-century watchtower above the Tanaro, 36 metres tall, symbol of Barbaresco village and its viewing platform over the vineyards.",
 prods=[], kind="historic", cls="Historic tower")
est("enoteca-regionale-barbaresco", "Enoteca Regionale del Barbaresco", BB, 44.7252, 8.0808, "precise",
 "Barbaresco's regional wine shop and tasting room inside the deconsecrated church of San Donato in the village.",
 prods=[], kind="museum", cls="Regional enoteca")
est("scuola-enologica-alba", "Scuola Enologica di Alba (Istituto Umberto I)", B, 44.6892, 8.0333, "precise",
 "The Royal Oenological School founded in Alba in 1881 with Domizio Cavazza as director; it trained generations of Piedmontese winemakers, including many of today's Barolo producers.",
 prods=[], kind="historic", cls="Historic wine school (1881)")
est("pollenzo-unisg", "Agenzia di Pollenzo (University of Gastronomic Sciences)", B, 44.6866, 7.8952, "precise",
 "The neo-Gothic Savoy royal estate at Pollenzo, restored by Slow Food founder Carlo Petrini's movement; home since 2004 of the University of Gastronomic Sciences and the Banca del Vino, a wine library of Italian bottles.",
 prods=[], kind="historic", cls="UNESCO-listed Savoy residence")
est("ca-del-baio", "Ca' del Baio", BB, 44.7026, 8.0888, "precise",
 "Treiso family estate of the Grasso family, makers of Asili, Pora and Vallegrande Barbaresco.")
est("cigliuti", "Fratelli Cigliuti", BB, 44.7163, 8.1299, "precise",
 "Small family estate on the Serraboella hill in Neive, bottling its own Barbaresco since 1964; Renato Cigliuti's daughters now make classic Serraboella and Vie Erte from the family's south-facing slopes.")
est("albino-rocca", "Albino Rocca", BB, 44.7218, 8.0864, "precise",
 "Barbaresco family estate founded by Albino Rocca and now run by his granddaughters, with Ovello Vigna Loreto, Ronchi and Cottà among its single-MGA Barbarescos, made in large casks in a fresh, fine-boned style.")
est("moccagatta-winery", "Moccagatta", BB, 44.7180, 8.0846, "precise",
 "The Minuto family's estate in the Moccagatta MGA, making Bric Balin and Basarin.")

# ---------------- Rest of Piedmont ----------------
est("canelli-cattedrali", "Underground cathedrals of Canelli", "Canelli", 44.7200, 8.2870, "approx",
 "Kilometres of brick-vaulted tunnels dug into the Canelli hill by Gancia, Bosca, Contratto and Coppo in the 19th century to age sparkling wine. Carlo Gancia made Italy's first metodo classico here in 1865. A core zone of the UNESCO site since 2014.",
 prods=["Gancia", "Bosca", "Contratto", "Coppo"], kind="cellar", cls="UNESCO core zone, historic cellars")
est("contratto", "Contratto", "Canelli", 44.7210, 8.2849, "precise",
 "Founded in 1867, one of the oldest sparkling-wine houses in Italy; its cellars are part of the Canelli 'cathedrals'.", kind="house")
est("gancia", "Gancia", "Asti", 44.7187, 8.2882, "approx",
 "Founded by Carlo Gancia, who learned the Champagne method in Reims and made Italy's first sparkling wine in Canelli in 1865, later inventing the sweet Moscato spumante that became Asti.", kind="house")
est("bosca", "Bosca", "Asti", 44.7135, 8.2868, "approx",
 "Canelli sparkling-wine house founded in 1831 whose cellars are part of the UNESCO 'underground cathedrals'.", kind="house")
est("braida", "Braida", "Barbera d'Asti", 44.8590, 8.3460, "approx",
 "The Rocchetta Tanaro estate where Giacomo Bologna released Bricco dell'Uccellone in 1982, the barrique-aged Barbera that changed the grape's fortunes. His children Raffaella and Giuseppe run it.")
est("vigneti-massa", "Vigneti Massa", "Colli Tortonesi", 44.8870, 8.9800, "approx",
 "Walter Massa's estate in Monleale, where from 1987 he saved Timorasso from extinction and released the first modern varietal Timorasso. His Costa del Vento and Sterpi crus are benchmarks.")
est("la-scolca", "La Scolca", "Gavi", 44.7089, 8.7816, "precise",
 "Gavi estate whose Gavi dei Gavi (black label, first made in the 1960s) created the market for prestige Gavi; owned by the Soldati family since 1919.")
est("carema-pergolas", "Carema terraces and pilun", "Carema", 45.5822, 7.8085, "approx",
 "The terraced vineyards of Carema with their stone-and-lime pillars (*pilun*) holding wooden pergolas, between the village and the Dora Baltea. The Cantina dei Produttori Nebbiolo di Carema, founded in 1960, is at the foot.",
 prods=["Produttori Nebbiolo di Carema", "Ferrando"], kind="landscape", cls="Terraced vineyard landscape")
est("travaglini", "Travaglini", "Gattinara", 45.6181, 8.3573, "precise",
 "Gattinara's largest estate, founded in 1920 by Clemente Travaglini; its distinctive curved bottle, designed in 1958 to catch sediment, is an icon of Alto Piemonte.")
est("antoniolo", "Antoniolo", "Gattinara", 45.6200, 8.3700, "approx",
 "Founded 1948; Rosanna Antoniolo and her children make the reference single-vineyard Gattinaras San Francesco, Osso San Grato and Castelle.")
est("le-piane", "Le Piane", "Boca", 45.6791, 8.4080, "precise",
 "Christoph Künzli's estate, which from 1998 rescued Boca with the help of the veteran grower Antonio Cerri, whose old maggiorina-trained vines it took over.")
est("proprieta-sperino", "Proprietà Sperino", "Lessona", 45.5870, 8.1990, "approx",
 "Paolo De Marchi (Isole e Olena) and his son Luca revived the family's Lessona estate from 1999, restoring a 16th-century cellar.")
est("einaudi", "Poderi Luigi Einaudi", "Dogliani", 44.5216, 7.9471, "precise",
 "Founded in 1897 by Luigi Einaudi, economist and later President of Italy, who bought the San Giacomo farm in Dogliani; benchmark Dogliani and Barolo from Cannubi, Terlo and Bussia.")
est("montalbera", "Montalbera", "Ruchè di Castagnole Monferrato", 44.9844, 8.3077, "precise",
 "The largest producer of Ruchè, based at the Cascina Montalbera outside Castagnole Monferrato, with Grignolino and Barbera alongside.")
est("orsolani", "Orsolani", "Erbaluce di Caluso", 45.3370, 7.8011, "precise",
 "San Giorgio Canavese estate founded in 1894, the reference for Erbaluce di Caluso and Caluso Passito Sulé.")
est("cella-monte-infernot", "Ecomuseo della Pietra da Cantoni, Cella Monte", "Grignolino del Monferrato Casalese", 45.0749, 8.3912, "approx",
 "Cella Monte's eco-museum explains the *infernot*, small cellars carved by hand into the soft Pietra da Cantoni sandstone beneath Monferrato houses to store wine; a core zone of the UNESCO site.",
 prods=[], kind="museum", cls="UNESCO core zone, infernot")

if __name__ == '__main__':
    save('p2_piedmont_sites', [], [], sites)
