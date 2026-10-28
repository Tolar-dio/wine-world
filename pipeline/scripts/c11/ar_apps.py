"""Argentina: appellation profiles for every IG and DOC on the INV register (2023 list + 2023-2025 additions).

Profiles whose polygon exists in site/data/geo/ar.geojson carry an explicit `id` where names are ambiguous.
Profiles without a polygon carry lat/lon (approx locality / district centroids) so they map as points.
"""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import app  # noqa: E402

C = "ar"
APPS = []
A = APPS.append


def ig(name, region, created, summary, **kw):
    kw.setdefault("cat", "IG")
    cat = kw.pop("cat")
    return app(C, name, cat, summary, region=region, created=created, **kw)


# ======================================================================== umbrella / provincial IGs
A(ig("Cuyo", "Cuyo", "2002 (INV Res. C.37/2002)", "Cuyo is the interprovincial IG covering Mendoza, San Juan and San Luis, the historic western heartland that makes the vast majority of Argentine wine. The name comes from the Huarpe word for 'sandy land' or 'desert country', and the region is exactly that: an irrigated oasis economy at the foot of the Andes. As an IG it is rarely seen on serious labels, which prefer a province or a district.",
     match=["Cuyo"], styles=["red", "white", "rose"], dominant_style="red", grapes="Malbec, Bonarda, Cabernet Sauvignon, Cereza, Criolla Grande, Torrontés, Pedro Giménez"))
A(ig("Mendoza", "Mendoza", "2002 (INV Res. C.32/2002)", "Mendoza is the province that is Argentine wine to most of the world: about 142,800 ha of vines in 2024 (INV), more than 70% of the national vineyard and of the 2026 grape harvest. The vineyards are irrigated oases strung along the Mendoza, Tunuyán, Diamante and Atuel rivers, fed by Andean snowmelt through a canal network that began with Huarpe and Inca irrigation and was expanded by the Spanish from the 1560s. Rain is scarce (around 200 mm), sunshine abundant, and altitude does the cooling: vineyards run from about 500 m in the east to over 1,500 m in the Uco Valley.\n\nThe province has five broad zones. The Primera Zona of Luján de Cuyo and Maipú, just south of the city, is the historic fine-wine heart. The Uco Valley, 80 to 120 km south-west at 900 to 1,600 m, is the modern star. The East (San Martín, Junín, Rivadavia, Santa Rosa, La Paz) is the volume engine. San Rafael and General Alvear in the south form their own oasis, and Lavalle in the north grows mostly for bulk wine and grape juice. As an IG, 'Mendoza' on a label means the grapes come from anywhere in the province, the usual choice for blends and good-value Malbec.",
     match=["Mendoza", "Mendoza Argentina"], styles=["red", "white", "rose", "sparkling"], dominant_style="red", area_ha=142785,
     grapes="Malbec (39,856 ha in 2024), Bonarda, Cabernet Sauvignon, Cereza, Criolla Grande, Syrah, Chardonnay, Torrontés, Pedro Giménez",
     terroir="Alluvial fans of Andean rivers: stony, calcareous gravels near the mountains, deep sandy and silty soils on the eastern plain; continental desert climate with hail ('la piedra') and the hot, dry Zonda wind as the main hazards.",
     producers=["Catena Zapata", "Zuccardi", "Trapiche", "Norton", "Achával-Ferrer", "Terrazas de los Andes", "Salentein", "El Enemigo"],
     nerd_note="Mendoza's first vines were planted shortly after the city's founding by Pedro del Castillo on 2 March 1561."))
A(ig("San Juan", "San Juan", "2002 (INV Res. C.32/2002)", "San Juan is Argentina's second wine province, about 39,700 ha of vines in 2024 (INV) and roughly a quarter of the national harvest. It is hotter, drier and lower than Mendoza: the Tulum valley around the provincial capital is a desert oasis growing grapes for wine, raisins, juice and table fruit. Its fine-wine story lives at the edges, in the high Andean valleys of Calingasta and Pedernal and the cooler Zonda valley, and in Syrah, which has had a strong San Juan identity since the 1990s.",
     match=["San Juan", "San Juan Argentina"], styles=["red", "white", "rose", "sweet"], area_ha=39684,
     grapes="Syrah, Malbec, Bonarda, Cereza, Criolla Grande, Pedro Giménez, Moscatel de Alejandría, Torrontés",
     producers=["Graffigna", "Pyros", "Finca Las Moras", "Viñas de Segisa"],
     nerd_note="Domingo Faustino Sarmiento, who later brought Pouget and Malbec to Mendoza's Quinta Normal, was born in San Juan in 1811."))
A(ig("San Luis", "San Luis", "2019 (RESOL-2019-10-APN-INV#MPYT)", "San Luis is the third Cuyo province and a minor wine producer, with about 100 ha of vines (INV 2024). Its IG, recognised in 2019, covers the whole province; small projects around the capital and in the Sierras de San Luis grow Malbec and other reds at moderate altitude.",
     match=["San Luis"], styles=["red"], area_ha=103))
A(ig("La Rioja Argentina", "La Rioja", "2002 (INV Res. C.32/2002)", "La Rioja's provincial IG carries 'Argentina' in its name to avoid any confusion with Spain's Rioja. The province has about 7,000 ha of vines (INV 2024), concentrated in the Famatina valley around Chilecito, and is the homeland of Torrontés Riojano, the most aromatic and widely planted of Argentina's three Torrontés grapes. Large cooperatives such as La Riojana dominate production.",
     match=["La Rioja Argentina", "La Rioja"], styles=["white", "red"], area_ha=7010, grapes="Torrontés Riojano, Malbec, Bonarda, Syrah, Cabernet Sauvignon",
     producers=["La Riojana", "Valle de la Puerta", "Chañarmuyo"],
     nerd_note="Torrontés Riojano is a natural cross of Muscat of Alexandria and Listán Prieto (Criolla Chica), born in the New World."))
A(ig("Catamarca", "Catamarca", "2002 (INV Res. C.32/2002)", "Catamarca's provincial IG covers about 2,700 ha of vines (INV 2024) in high Andean valleys: Fiambalá and Tinogasta in the west, Belén and Santa María in the north (where the Calchaquí valleys begin), and Pomán. Old Criolla and Torrontés vines, home-made *vino patero* and new altitude Malbec and Syrah share the landscape.",
     match=["Catamarca"], styles=["red", "white"], area_ha=2694, grapes="Torrontés Riojano, Malbec, Syrah, Criolla, Cabernet Sauvignon"))
A(ig("Salta", "Salta", "2002 (INV Res. C.32/2002)", "Salta is Argentina's altitude province: about 3,700 ha of vines (INV 2024), almost all in the Calchaquí valleys between 1,700 and 3,100 m. Malbec covers 46% of the provincial vineyard, but Salta's signature is Torrontés from Cafayate, floral and fresh, and Malbec and Tannat of deep colour and thick skins built by intense sunlight. The provincial IG appears on blends from across the valleys.",
     match=["Salta"], styles=["red", "white"], area_ha=3700, grapes="Malbec, Torrontés Riojano, Cabernet Sauvignon, Tannat, Cabernet Franc, Criolla Chica",
     producers=["Colomé", "El Esteco", "Etchart", "Piattelli", "Tacuil", "Domingo Hermanos"]))
A(ig("Jujuy", "Jujuy", "2002 (INV Res. C.32/2002)", "Jujuy, Argentina's northernmost wine province, has only about 70 ha of vines (INV 2024) but some of the most spectacular: terraces in the Quebrada de Humahuaca, a UNESCO World Heritage valley, at 2,300 to over 3,000 m. Since 2025 a second IG, Valles Templados, covers the lower, temperate valleys around San Salvador and Perico.",
     match=["Jujuy"], styles=["red", "white"], area_ha=73, grapes="Malbec, Cabernet Franc, Syrah, Merlot, Criolla"))
A(ig("Tucumán", "Tucumán", "2002 (INV Res. C.32/2002)", "Tucumán's provincial IG covers a small wine area of about 145 ha (INV 2024), almost all in the Tafí del Valle department on the Calchaquí side of the mountains, at Colalao del Valle and Amaicha del Valle, where Malbec and Torrontés grow at about 1,700 to 2,000 m.",
     match=["Tucumán", "Tucuman"], styles=["red", "white"], area_ha=145))
A(ig("Córdoba Argentina", "Córdoba", "2002 (INV Res. C.32/2002)", "Córdoba's provincial IG (with 'Argentina' added to separate it from Spain's Córdoba) covers about 240 ha of vines (INV 2024). The province's wine history is Jesuit and Italian: the Jesuit estancias of the 17th and 18th centuries made wine, and Friulian immigrants at Colonia Caroya still make Frambua from American hybrid grapes.",
     match=["Córdoba Argentina", "Cordoba Argentina", "Córdoba"], styles=["red", "white"], area_ha=244))
A(ig("Neuquén", "Patagonia", "2002 (INV Res. C.32/2002)", "Neuquén's provincial IG covers about 1,500 ha (INV 2024), most of it created from scratch since the late 1990s on the desert plateau of San Patricio del Chañar, north of the city of Neuquén, where large irrigation projects turned steppe into vineyard for Bodega del Fin del Mundo, Familia Schroeder and NQN. Strong winds, cool nights and long sun make dense, fresh Malbec, Pinot Noir and Merlot.",
     match=["Neuquén", "Neuquen"], styles=["red", "white"], area_ha=1499, producers=["Bodega del Fin del Mundo", "Familia Schroeder", "NQN"]))
A(ig("Río Negro", "Patagonia", "2002 (INV Res. C.32/2002)", "Río Negro's provincial IG covers about 1,300 ha (INV 2024), most along the irrigated Alto Valle of the Río Negro, an apple-and-pear valley where Humberto Canale planted vines in 1909. It is the source of some of Argentina's oldest Malbec, Merlot and Semillon and of Pinot Noir that convinced Italian and Danish investors (Chacra, Noemía) to settle here.",
     match=["Río Negro", "Rio Negro"], styles=["red", "white"], area_ha=1287, producers=["Humberto Canale", "Bodega Noemía", "Bodega Chacra", "Bodega Miras"]))
A(ig("Patagonia", "Patagonia", "2002 (INV Res. C.37/2002; synonym Patagonia Argentina 2009)", "The Patagonia IG is an interprovincial umbrella for Neuquén, Río Negro, La Pampa, Chubut and the rest of southern Argentina. It is one of the most used IGs on export labels (13% of IG wine sold in 2022, per INV), because it carries an image of cold, wind and purity. The vineyards cluster in irrigated river valleys of the Negro, Neuquén and Colorado, plus a scatter of new sites as far south as Chubut's Sarmiento at 45°S.",
     match=["Patagonia", "Patagonia Argentina"], styles=["red", "white", "sparkling"], grapes="Malbec, Pinot Noir, Merlot, Cabernet Franc, Semillon, Sauvignon Blanc, Chardonnay"))

# ======================================================================== MENDOZA: Luján de Cuyo
A(ig("Luján de Cuyo", "Mendoza", "DOC 1989/1993 (sources differ); registered by INV Res. C.15/2005", "Luján de Cuyo is Argentina's first denomination of origin and the historic home of fine Malbec. The department lies just south of Mendoza city on the first terrace of the Mendoza river at 850 to 1,100 m, and from the late 19th century its districts (Vistalba, Las Compuertas, Chacras de Coria, Mayor Drummond, Perdriel, Agrelo, Ugarteche) were planted by Italian, Spanish and French families. Many vineyards are 60 to over 100 years old and own-rooted.\n\nThe DOC was pushed through by local producers in the late 1980s and early 1990s to defend Malbec's reputation; INV registered it under the 1999 national law in 2005. It is the only Argentine DOC in regular use: INV reported 382,866 litres exported and 511,537 litres sold domestically under the DOC in 2022. Its terroir divides north to south. The northern districts near the river (Vistalba, Las Compuertas, Chacras, Drummond) have stony alluvial soils and give perfumed, elegant Malbec. The southern districts of Perdriel, Agrelo and Ugarteche have deeper clay-loam and give broader, darker wines. Agrelo, Las Compuertas, Vistalba and Alto Agrelo also have their own IGs.\n\nLuján Malbec is the classic Argentine style: plum, violet and mocha, ripe and velvety, built for ageing in the best old-vine cuvées.",
     cat="DOC", id="ar-lujan-de-cuyo", match=["Luján de Cuyo", "Lujan de Cuyo", "DOC Luján de Cuyo"], styles=["red"], dominant_style="red", area_ha=15210,
     grapes="Malbec (8,920 ha of the department's 15,210 ha in 2024), Cabernet Sauvignon, Chardonnay, Petit Verdot",
     terroir="Alluvial terraces of the Mendoza river, stony near the river in the north, deeper clay-loam over gravel to the south; 850 to 1,100 m; about 200 mm of rain, wide day-night swings.",
     producers=["Catena Zapata", "Achával-Ferrer", "Cheval des Andes", "Terrazas de los Andes", "Norton", "Bodega Weinert", "Lagarde", "Alta Vista", "Bodega Chandon", "Pulenta Estate"],
     nerd_note="Luján de Cuyo holds about 22% of all Malbec in Mendoza, more than any other department (INV 2025 Malbec report)."))
A(ig("Luján de Cuyo (IG)", "Mendoza", "2002 (INV Res. C.32/2002)", "Alongside the DOC, the department of Luján de Cuyo is also registered as a plain IG with identical limits. The IG lets producers name the department without meeting the DOC's extra rules, and most Luján wines on export shelves use it this way.",
     id="ar-lujan-de-cuyo-2", match=["Luján de Cuyo IG"], styles=["red"], dominant_style="red"))
A(ig("Agrelo", "Mendoza", "2005 (INV Res. C.21/2005)", "Agrelo, a district in southern Luján de Cuyo at 950 to 1,100 m, is one of the most planted fine-wine zones in Argentina and the home of Catena Zapata's pyramid winery and its La Pirámide vineyard (planted 1983). Deeper clay-loam soils with stones below give dense, dark, plush Malbec and good Cabernet Sauvignon; frost and hail are risks on the open plain. Agrelo was the eighth most used IG for exports in 2022 (INV).",
     match=["Agrelo"], styles=["red", "white"], dominant_style="red", grapes="Malbec, Cabernet Sauvignon, Cabernet Franc, Chardonnay",
     producers=["Catena Zapata", "Bodega Chandon", "Pulenta Estate", "Dominio del Plata"],
     nerd_note="The pyramid at Catena Zapata, designed by Pablo Sánchez Elía and built in the late 1990s, was inspired by Mayan temples."))
A(ig("Alto Agrelo", "Mendoza", "2025 (INV Res. 27/2025)", "Alto Agrelo became Argentina's newest Luján de Cuyo IG in July 2025, at the request of Grupo Avinea, whose 232-ha organic estate there is the source of Argento's estate Malbecs. It covers the higher, western part of Agrelo towards the Andean foothills, where stonier soils and cooler nights give fresher Malbec than the classic Agrelo plain. It joins Luján de Cuyo, Agrelo, Las Compuertas and Vistalba as the fifth IG within the department.",
     match=["Alto Agrelo"], styles=["red"], dominant_style="red", producers=["Argento (Grupo Avinea)"],
     lat=-33.187, lon=-68.988, coord_quality="approx"))
A(ig("Las Compuertas", "Mendoza", "2007 (INV Res. C.30/2007)", "Las Compuertas, at about 1,050 m on the north side of Luján de Cuyo by the Mendoza river, holds some of Argentina's oldest Malbec vineyards, many planted in the early 20th century and still own-rooted. Poor, stony alluvial soils and the cooling effect of the river's canyon give fragrant, fine-grained Malbec. Cheval des Andes and many old-vine cuvées source here.",
     match=["Las Compuertas"], styles=["red"], dominant_style="red", producers=["Cheval des Andes", "Terrazas de los Andes", "Durigutti"],
     nerd_note="'Las Compuertas' means 'the floodgates', after the colonial sluices that diverted the Mendoza river into irrigation canals."))
A(ig("Vistalba", "Mendoza", "2022 (RESOL-2022-12-APN-INV#MAGYP)", "Vistalba, a small district at about 1,000 m beside Las Compuertas on the north bank of the Mendoza river, was recognised as an IG in 2022. Old Malbec on stony soils gives refined, perfumed wines; Carlos Pulenta's Vistalba estate and Fabre Montmayou are based here.",
     match=["Vistalba"], styles=["red"], dominant_style="red", producers=["Vistalba (Carlos Pulenta)", "Fabre Montmayou", "Nieto Senetiner"]))

# ======================================================================== MENDOZA: Maipú & north
A(ig("Maipú", "Mendoza", "2002 (INV Res. C.32/2002)", "Maipú, east of Luján de Cuyo along the Mendoza river at 750 to 1,000 m, is the other half of Mendoza's historic Primera Zona. It is where the 19th-century wine industry concentrated after the 1885 railway arrived: Trapiche, López, Giol's La Colina de Oro and the national wine museum are here. Its riverside districts (Lunlunta, Cruz de Piedra, Barrancas, Russell) have old vineyards on stony alluvium and give classic, ripe Malbec, Cabernet and old-vine Bonarda.",
     match=["Maipú", "Maipu"], styles=["red", "white"], dominant_style="red", area_ha=10666,
     producers=["Trapiche", "Bodegas López", "Familia Zuccardi", "Rutini (Coquimbito)", "El Enemigo (Chachingo)"]))
A(ig("Lunlunta", "Mendoza", "2005 (INV Res. C.04/2005)", "Lunlunta is a riverside district of Maipú, on high terraces above the Mendoza river at about 900 m. Old Malbec here, including Catena's Angélica vineyard planted in the 1920s, grows on stony alluvium and gives deep but fresh wines.",
     match=["Lunlunta"], styles=["red"], dominant_style="red", producers=["Catena Zapata (Angélica)"]))
A(ig("Barrancas", "Mendoza", "2005 (INV Res. C.22/2005)", "Barrancas, in eastern Maipú on the banks of the Mendoza river, is a warm district of old vineyards known for ripe Malbec, Syrah and Bonarda. It was among the first Maipú districts registered as an IG, and among the most exported of small IGs in 2022.",
     match=["Barrancas"], styles=["red"], dominant_style="red"))
A(ig("Russel", "Mendoza", "2005 (INV Res. C.05/2005)", "Russell (registered as 'Russel') is a district of Maipú with deep soils and long-established vineyards for Malbec and Cabernet Sauvignon.",
     match=["Russel", "Russell"], styles=["red"]))
A(ig("El Paraíso", "Mendoza", "2007 (INV Res. C.28/2007)", "El Paraíso is a small IG in Maipú's Fray Luis Beltrán area, along the Mendoza river, recognised in 2007 for its traditional red-wine vineyards.",
     match=["El Paraíso", "El Paraiso"], styles=["red"], lat=-33.0518, lon=-68.6804, coord_quality="approx"))
A(ig("Godoy Cruz", "Mendoza", "2002 (INV Res. C.32/2002)", "Godoy Cruz, now part of Greater Mendoza, was a 19th-century wine town. It keeps historic wineries such as Escorihuela Gascón (founded 1884) and Bodega Arizu, though the IG's vineyards have almost all given way to the city.",
     match=["Godoy Cruz"], styles=["red"], producers=["Escorihuela Gascón"]))
A(ig("Guaymallén", "Mendoza", "2002 (INV Res. C.32/2002)", "Guaymallén, on the eastern side of Mendoza city, is a historic wine department now largely urban; under 500 ha of vines remain (INV 2024), mostly Malbec and Criolla.",
     match=["Guaymallén", "Guaymallen"], styles=["red"]))
A(ig("Las Heras", "Mendoza", "2002 (INV Res. C.32/2002)", "Las Heras stretches from Mendoza city north-west into the high Andes along the road to Chile. Its vineyards (about 1,300 ha in 2024) lie near the city; the separate Canota IG covers a higher piedmont site.",
     match=["Las Heras"], styles=["red"]))
A(ig("Canota", "Mendoza", "2020 (RESOL-2020-19-APN-INV#MAGYP)", "Canota (Valle de Canota) is a small piedmont IG in Las Heras, north-west of Mendoza city on the old road to Villavicencio, recognised in 2020. Vineyards here at over 1,000 m sit on alluvial fans of the pre-cordillera, a cooler, stonier frontier for Malbec.",
     match=["Canota", "Valle de Canota", "Canota - Valle de Canota"], styles=["red"], lat=-32.62, lon=-68.92, coord_quality="approx",
     nerd_note="The site sits near the Canota monument, which marks where San Martín's Army of the Andes split its columns in 1817."))
A(ig("Lavalle", "Mendoza", "2002 (INV Res. C.32/2002; synonym Desierto de Lavalle 2009)", "Lavalle, north of Mendoza city, is the province's driest and lowest wine department (around 600 m), with about 12,300 ha of vines (INV 2024) for bulk wine, juice and grape concentrate. The synonym 'Desierto de Lavalle' was added in 2009 for wines from its sandy, desert vineyards.",
     match=["Lavalle", "Desierto de Lavalle", "Lavalle - Desierto de Lavalle"], styles=["white", "red"], area_ha=12290))

# ======================================================================== MENDOZA: East
A(ig("San Martín", "Mendoza", "2002 (INV Res. C.32/2002)", "San Martín is the largest vineyard department in Argentina, about 25,800 ha in 2024 (INV), the heart of the Eastern Mendoza oasis along the Mendoza and Tunuyán rivers at 650 to 750 m. Hot, flat and fertile, it produces much of Argentina's everyday wine, grape juice and concentrate, with Criolla Grande, Cereza, Bonarda and Pedro Giménez.",
     id="ar-san-martin", match=["San Martín", "San Martin"], styles=["red", "white", "rose"], area_ha=25847))
A(ig("Junín", "Mendoza", "2002 (INV Res. C.32/2002)", "Junín, in Eastern Mendoza, has about 10,800 ha of vines (INV 2024) and a reputation for generous Bonarda and Malbec from warm, sandy soils.",
     match=["Junín", "Junin"], styles=["red"], area_ha=10849))
A(ig("Rivadavia", "Mendoza", "2002 (INV Res. C.32/2002)", "Rivadavia, in Eastern Mendoza along the Tunuyán river, has about 13,900 ha of vines (INV 2024). Nicola Catena planted his first Malbec here at La Libertad in 1902, and old-vine Bonarda from the East has become a cult value wine.",
     id="ar-rivadavia", match=["Rivadavia"], styles=["red"], area_ha=13929, producers=["Catena (Viejito de Rivadavia)"]))
A(ig("Distrito Medrano", "Mendoza", "2014 (INV Res. C.29/2014)", "Medrano, straddling Rivadavia and Junín in Eastern Mendoza, was recognised as an IG in 2014. Its stony soils near the Tunuyán river give more structured Malbec and Bonarda than the typical eastern plain.",
     match=["Distrito Medrano", "Medrano"], styles=["red"]))
A(ig("Reducción", "Mendoza", "2020 (RESOL-2020-34-APN-INV#MAGYP)", "La Reducción is a district of Rivadavia in Eastern Mendoza, recognised as an IG in 2020. Its name recalls a colonial *reducción*, a settlement where indigenous Huarpe people were gathered; it grows traditional reds.",
     match=["Reducción", "Reduccion"], styles=["red"]))
A(ig("Santa Rosa", "Mendoza", "2002 (INV Res. C.32/2002)", "Santa Rosa, at the south-eastern edge of the Eastern oasis along the Tunuyán river, has about 7,900 ha of vines (INV 2024), mostly for everyday wine.",
     match=["Santa Rosa"], styles=["red", "white"], area_ha=7919))
A(ig("La Paz", "Mendoza", "2002 (INV Res. C.32/2002)", "La Paz is Mendoza's easternmost wine department, hot and dry on the border with San Luis, with only about 135 ha of vines (INV 2024).",
     match=["La Paz"], styles=["red"]))

# ======================================================================== MENDOZA: Uco
A(ig("Valle de Uco", "Mendoza", "2002 (INV Res. C.37/2002)", "The Uco Valley is where Argentine wine went uphill and found its future. It is a long depression at 900 to 1,600 m between the Andes and a low pre-cordillera, 80 to 120 km south-west of Mendoza city, covering the departments of Tupungato, Tunuyán and San Carlos and watered by the Tunuyán river and Andean streams. Historically it grew fruit, potatoes and some Criolla; the turn came in the 1990s, when Nicolás Catena planted the Adrianna vineyard at about 1,450 m in Gualtallary (1992) and a wave of French, Dutch and Argentine investors followed: Clos de los Siete, Salentein, Andeluna, O. Fournier, and later Zuccardi's winery at Paraje Altamira.\n\nThe valley's soils are alluvial fans pushed out from the Andes: stony and often calcareous near the mountains, with sand and silt further east. Each fan and each terrace behaves differently, so Uco has spawned more district IGs than anywhere else in Argentina (Los Chacayes, Paraje Altamira, San Pablo, Pampa El Cepillo, Vista Flores, La Consulta, El Peral, Cordón del Cepillo, with Gualtallary pending), and producers increasingly label single 'parajes'. The climate is cool for Argentina, with frost and hail as real threats.\n\nUco Malbec is fresher and more floral than Luján's, with violet, red fruit, firm chalky tannins and high natural acidity; Cabernet Franc, Chardonnay and Pinot Noir excel too. Valle de Uco is by far Argentina's most used IG: 41% of all IG wine sold in 2022 and 45% of IG exports (INV).",
     match=["Valle de Uco", "Uco Valley", "Valle de Uco Valley"], styles=["red", "white", "sparkling"], dominant_style="red", area_ha=29609,
     grapes="Malbec (16,584 ha across its three departments in 2024), Cabernet Franc, Cabernet Sauvignon, Chardonnay, Pinot Noir, Sauvignon Blanc, Semillon",
     terroir="Alluvial fans from the Andes with river stones, sand and calcium carbonate crusts; 900 to 1,600 m; cool continental climate, about 300 mm of summer rain, frequent hail and spring frost.",
     producers=["Catena Zapata", "Zuccardi", "Salentein", "Clos de los Siete", "Andeluna", "O. Fournier", "Bodega Piedra Negra", "Lurton", "SuperUco", "Altos Las Hormigas", "El Enemigo", "Rutini"],
     nerd_note="The three Uco departments together hold 41.6% of all Malbec in Mendoza (INV 2025)."))
A(ig("Tupungato", "Mendoza", "2002 (INV Res. C.32/2002; synonym Valle de Tupungato 2006)", "Tupungato is the northernmost Uco department, named after the 6,570-m Tupungato volcano that looms over it. About 10,600 ha of vines (INV 2024) climb from 900 m to over 1,500 m in Gualtallary. Chandon, in Argentina since 1959, was an early investor here for sparkling base wine; Catena's Adrianna vineyard (1992) showed that the high north-west could make world-class Malbec and Chardonnay.",
     match=["Tupungato", "Valle de Tupungato", "Tupungato - Valle de Tupungato"], styles=["red", "white", "sparkling"], area_ha=10587,
     producers=["Catena Zapata (Adrianna)", "Bodegas Chandon", "Andeluna", "Zuccardi (Gualtallary)", "El Enemigo"]))
A(ig("Gualtallary", "Mendoza", "Provisional ('mención precaria'), INV; definitive status unconfirmed", "Gualtallary, a district of Tupungato rising from about 1,200 to 1,600 m, is the closest thing Argentina has to a grand cru. Nicolás Catena's Adrianna vineyard, planted in 1992 at about 1,450 m when everyone said the site was too cold, gave the world-famous Adrianna Malbecs and White Bones and White Stones Chardonnays. Soils are shallow alluvial gravels and sand over limestone (calcium carbonate) crusts, sometimes with fossil-bearing caliche; the light is intense and the nights cold.\n\nGualtallary wines are electric: violet-scented, chalk-textured Malbec, taut Chardonnay, and Cabernet Franc with herbal lift. Zuccardi, El Enemigo, SuperUco and Huentala all farm here. Its IG application ran into disputes over the boundary; INV's 2023 statistics list it as a 'mención precaria' (a provisional authorisation to label) and I found no confirmation of definitive registration as of October 2026.",
     cat="IG", match=["Gualtallary"], styles=["red", "white"], dominant_style="red",
     grapes="Malbec, Chardonnay, Cabernet Franc, Pinot Noir",
     producers=["Catena Zapata (Adrianna)", "Zuccardi", "El Enemigo", "SuperUco", "Huentala"],
     lat=-33.39, lon=-69.26, coord_quality="approx",
     nerd_note="In 2022 wines labelled Gualtallary exported 438,207 litres at an average US$7.1 per litre, ninth among Argentine IGs (INV)."))
A(ig("El Peral", "Mendoza", "2022 (RESOL-2022-1-APN-INV#MEC)", "El Peral is a district of Tupungato at about 1,100 to 1,300 m, recognised as an IG at the request of Bodegas Chandon. Chandon grows sparkling-base Chardonnay and Pinot Noir here; cool nights and stony soils also give fresh Malbec.",
     match=["El Peral"], styles=["sparkling", "white", "red"], producers=["Bodegas Chandon"]))
A(ig("Tunuyán", "Mendoza", "2002 (INV Res. C.32/2002)", "Tunuyán is the central Uco department, about 10,200 ha of vines (INV 2024), from the Tunuyán river plain to the Andean foothills. It contains the IGs of Los Chacayes, Vista Flores and San Pablo, and the area of Los Árboles, where Bodegas Salentein built its cross-shaped winery at the end of the 1990s.",
     match=["Tunuyán", "Tunuyan"], styles=["red", "white"], area_ha=10197, producers=["Salentein", "Clos de los Siete", "Piedra Negra"]))
A(ig("Los Chacayes", "Mendoza", "2017 (RESOL-2017-249-APN-INV#MA)", "Los Chacayes is an alluvial fan at 1,100 to 1,600 m in western Tunuyán, recognised as an IG in 2017. Its soils are among the stoniest in Uco, with big river boulders and little fine material, and the vines struggle: Malbec here is dark, tannic and mountain-fresh. François Lurton's Bodega Piedra Negra and Corazón del Sol are among the estates here.",
     match=["Los Chacayes"], styles=["red"], dominant_style="red",
     producers=["Bodega Piedra Negra (Lurton)", "Corazón del Sol"]))
A(ig("Vista Flores", "Mendoza", "2012 (INV Res. C.11/2012)", "Vista Flores is the Tunuyán district around which Michel Rolland and partners created Clos de los Siete from 1998: a block of about 850 ha divided among several wineries (Monteviejo, Cuvelier, DiamAndes, Rolland), each making its own wine and contributing to the shared Clos de los Siete blend. At about 1,000 to 1,200 m, sandy-loam and stony soils give plush, polished Malbec.",
     match=["Vista Flores"], styles=["red"], dominant_style="red", producers=["Clos de los Siete", "Monteviejo", "DiamAndes", "Cuvelier Los Andes"]))
A(ig("San Pablo", "Mendoza", "2019 (RESOL-2019-10-APN-INV#MAGYP)", "San Pablo, recognised in 2019, is Uco's highest IG, a cold alluvial terrace in Tunuyán at roughly 1,300 to 1,700 m, where frost and snow are real risks. Its limits were drawn by geology and climate rather than politics. Wines are taut and aromatic: Chardonnay, Sauvignon Blanc, Pinot Noir and Malbec with very high acidity. Salentein and Zuccardi are among the growers.",
     match=["San Pablo"], styles=["white", "red"], producers=["Salentein", "Zuccardi"],
     lat=-33.4576, lon=-69.3023, coord_quality="approx"))
A(ig("San Carlos", "Mendoza", "2002 (INV Res. C.32/2002)", "San Carlos is the southern Uco department, about 8,800 ha of vines (INV 2024), two-thirds of them Malbec. It holds Paraje Altamira, Pampa El Cepillo, Cordón del Cepillo and La Consulta, and a long tradition of growers' cooperatives and old Malbec around La Consulta and Eugenio Bustos.",
     id="ar-san-carlos", match=["San Carlos"], styles=["red", "white"], area_ha=8825))
A(ig("Paraje Altamira", "Mendoza", "2013 (INV Res. C.44/2013), later enlarged", "Paraje Altamira is the alluvial fan of the Tunuyán river in San Carlos, at about 1,000 to 1,150 m, and Argentina's most studied terroir. Its recognition in 2013 followed five years of work including some 200 soil pits; the first zone of 4,790 ha (1,400 ha of vineyard) was later enlarged to about 9,290 ha with 2,800 ha of vines. The legal name carries 'Paraje' because 'Altamira' was a registered trademark.\n\nThe soils are a jumble of rounded river stones coated in white calcium carbonate, over sand and silt, which drain fast and push Malbec to small berries and fine, chalky tannin. Zuccardi built its Valle de Uco winery here in 2016 out of the same stones, and its Piedra Infinita Malbec comes from the fan. Catena's Nicasia vineyard and Achával-Ferrer's Finca Altamira are among the other landmarks. Paraje Altamira wines command among the highest average export prices of any Argentine IG.",
     match=["Paraje Altamira", "Altamira"], styles=["red"], dominant_style="red", grapes="Malbec, Cabernet Franc, Semillon, Chardonnay",
     producers=["Zuccardi (Piedra Infinita)", "Catena Zapata (Nicasia)", "Achával-Ferrer (Finca Altamira)"],
     lat=-33.765, lon=-69.165, coord_quality="approx",
     nerd_note="In 2022 Paraje Altamira wines exported at US$20.4 per litre on average, four times the national IG average (INV)."))
A(ig("Pampa el Cepillo", "Mendoza", "2019 (RESOL-2019-1-APN-INV#MAGYP)", "Pampa El Cepillo, recognised in 2019, is the plain south of Paraje Altamira in San Carlos, around 1,000 to 1,100 m. It is cold, frost-prone and windswept, with stony, calcareous alluvium; Malbec and Cabernet Franc ripen slowly into firm, fresh wines. Its limits were drawn on geological and climatic criteria.",
     match=["Pampa el Cepillo", "Pampa El Cepillo"], styles=["red"],
     lat=-33.85, lon=-69.17, coord_quality="approx"))
A(ig("Cordón el Cepillo", "Mendoza", "2022 (RESOL-2022-7-APN-INV#MEC)", "Cordón del Cepillo, recognised in 2022, is a higher piedmont zone in San Carlos along the Cepillo range, west of Pampa El Cepillo. It is one of the newest Uco frontiers, with very stony soils and cool conditions.",
     match=["Cordón el Cepillo", "Cordón del Cepillo", "Cordon del Cepillo"], styles=["red"],
     lat=-33.86, lon=-69.30, coord_quality="approx"))
A(ig("La Consulta", "Mendoza", "2014 (INV Res. C.19/2014)", "La Consulta, a district of San Carlos at about 950 to 1,100 m, is old Malbec country: dozens of growers farm vineyards planted in the mid-20th century on deep alluvial soils. It was recognised in 2014 at the request of Leoncio Arizu, and many of the region's best old-vine Malbecs are sourced here.",
     match=["La Consulta"], styles=["red"], dominant_style="red", producers=["Leoncio Arizu (Luigi Bosca)", "O. Fournier", "Finca La Celia"]))

# ======================================================================== MENDOZA: South
A(ig("San Rafael", "Mendoza", "DOC: INV Res. C.31/2007", "San Rafael is Mendoza's southern oasis, an irrigated plain at 450 to 800 m on the Diamante and Atuel rivers, about 230 km south of the city, with about 11,500 ha of vines (INV 2024). French, Italian and Spanish immigrants built it into a fruit-and-wine district from the late 19th century; the Bianchi, Suter and Goyenechea houses are long-standing names. It became Argentina's second DOC in 2007, though the denomination is little used.\n\nSan Rafael is cooler than eastern Mendoza thanks to its southern latitude, and its wines are fresh, fruity and fairly priced: Malbec, Cabernet Sauvignon, Bonarda, Chenin Blanc and sparkling wines. The Cañón del Atuel and the 'Valle Grande' reservoir make it a tourism hub as well.",
     cat="DOC", id="ar-san-rafael", match=["San Rafael", "DOC San Rafael"], styles=["red", "white", "sparkling"], area_ha=11478,
     producers=["Valentín Bianchi", "Bodega Goyenechea", "Suter", "Algodon Wine Estates"]))
A(ig("San Rafael (IG)", "Mendoza", "2002 (INV Res. C.32/2002)", "The department of San Rafael is also registered as a plain IG with the same limits as the DOC; producers usually label this simpler designation.",
     id="ar-san-rafael-2", match=["San Rafael IG"], styles=["red", "white"]))
A(ig("General Alvear", "Mendoza", "2002 (INV Res. C.32/2002)", "General Alvear, east of San Rafael on the Atuel river, is Mendoza's southernmost wine department, with about 3,100 ha (INV 2024) of mostly traditional varieties and everyday wine.",
     match=["General Alvear"], styles=["red", "white"], area_ha=3095))

# ======================================================================== SAN JUAN
SJ = "San Juan"
A(ig("Valle del Tulum", SJ, "2002 (INV Res. C.32/2002)", "The Tulum valley is the central irrigated oasis of San Juan around the provincial capital, at 600 to 700 m along the San Juan river. Hot and sunny with under 100 mm of rain, it grows most of the province's grapes: Cereza, Criolla, Pedro Giménez and Moscatel for wine, juice and raisins, alongside Syrah, Malbec and Bonarda for fine wine. Departments such as Pocito, Rawson, Caucete, 25 de Mayo, Sarmiento and San Martín lie within it.",
     match=["Valle del Tulum", "Tulum", "Tulum Valley"], styles=["red", "white"], lat=-31.55, lon=-68.53, coord_quality="approx"))
for nm, txt, ha, extra in [
    ("25 de Mayo", "Veinticinco de Mayo is one of San Juan's largest vineyard departments, south-east of the capital in the Tulum valley, about 7,700 ha of vines in 2024 (INV), much of it for bulk wine and juice.", 7679, {}),
    ("9 de Julio", "Nueve de Julio is a Tulum-valley department east of San Juan city with about 2,800 ha of vines (INV 2024), mostly traditional varieties.", 2830, {}),
    ("Albardón", "Albardón, just north of San Juan city along the river, has about 1,400 ha of vines (INV 2024), many for table grapes and raisins.", 1446, {"match": ["Albardón", "Albardon"]}),
    ("Angaco", "Angaco, north-east of San Juan city, has about 2,100 ha of vines (INV 2024) in the Tulum oasis.", 2089, {}),
    ("Caucete", "Caucete, east of the San Juan river, is one of the province's big vineyard departments (about 6,700 ha in 2024, INV) and second only to Sarmiento for Malbec in San Juan.", 6697, {}),
    ("Chimbas", "Chimbas, on the northern edge of San Juan city, is a small, largely urban wine department with about 700 ha of vines (INV 2024).", 700, {}),
    ("Iglesia", "Iglesia is a high Andean department in north-western San Juan, around 1,600 to 1,900 m, with only a few hectares of vines (INV 2024) in an oasis landscape of poplars and adobe villages.", 5, {}),
    ("Jáchal", "Jáchal, in northern San Juan, is a historic agricultural oasis at about 1,150 m known for onions and wine; vineyards are now small.", None, {"match": ["Jáchal", "Jachal"]}),
    ("Pocito", "Pocito, south of San Juan city in the Tulum valley, has about 2,900 ha of vines (INV 2024) and several of the province's established wineries.", 2852, {}),
    ("Rawson", "Rawson, a Tulum-valley department on the southern edge of San Juan city, has about 1,250 ha of vines (INV 2024).", 1249, {}),
    ("Santa Lucía", "Santa Lucía, east of San Juan city, has about 900 ha of vines (INV 2024), mostly traditional.", 880, {"match": ["Santa Lucía", "Santa Lucia"]}),
    ("Sarmiento", "Sarmiento, in southern San Juan, is the province's leading Malbec department (932 ha of Malbec of about 7,000 ha of vines, INV 2024) and contains the high Pedernal valley.", 7045, {"id": "ar-sarmiento"}),
    ("Ullum", "Ullum, west of San Juan city around the Ullum reservoir, has about 1,200 ha of vines (INV 2024) on stony soils in the pre-cordillera.", 1191, {}),
    ("Valle Fértil", "Valle Fértil, in the eastern San Juan hills, is a green valley with almost no vineyard today; its IG dates from the 2002 national list.", None, {"match": ["Valle Fértil", "Valle Fertil"]}),
    ("Zonda", "Zonda is the department west of San Juan city, in a valley between pre-cordillera ranges that gave its name to the Zonda wind. About 1,000 ha of vines (INV 2024) with a reputation for fresher Syrah and Malbec.", 1021, {}),
]:
    kw = dict(extra)
    kw.setdefault("match", [nm])
    if ha:
        kw["area_ha"] = ha
    A(ig(nm, SJ, "2002 (INV Res. C.32/2002)", txt, styles=["red", "white"], **kw))
A(ig("Rivadavia (San Juan)", SJ, "2002 (INV Res. C.32/2002)", "Rivadavia in San Juan (not to be confused with Mendoza's Rivadavia) is a mostly urban department west of the provincial capital with under 200 ha of vines (INV 2024).",
     id="ar-rivadavia-2", match=["Rivadavia San Juan"], styles=["red", "white"]))
A(ig("San Martín (San Juan)", SJ, "2002 (INV Res. C.32/2002)", "San Martín in San Juan, east of the capital in the Tulum valley, has about 3,600 ha of vines (INV 2024). Not to be confused with Mendoza's much larger San Martín.",
     id="ar-san-martin-2", match=["San Martín San Juan"], styles=["red", "white"], area_ha=3558))
A(ig("Valle de Zonda", SJ, "2015 (INV Res. C.04/2015)", "Valle de Zonda, recognised in 2015, is a narrower IG for the vineyards of the Zonda valley itself, a pre-cordillera basin west of San Juan city where cooler nights and stony soils give fresher reds than the Tulum oasis.",
     match=["Valle de Zonda"], styles=["red"], lat=-31.5754, lon=-68.9278, coord_quality="approx"))
A(ig("Valle del Pedernal", SJ, "2007 (INV Res. C.21/2007)", "Pedernal is San Juan's high-altitude showcase: a narrow valley at about 1,250 to 1,500 m in Sarmiento department, between pre-cordillera ranges, where calcareous, stony soils and cold nights produce Malbec, Cabernet Sauvignon, Syrah and Chardonnay with real freshness. Pyros and Viñas de Segisa are among its producers.",
     match=["Valle del Pedernal", "Pedernal"], styles=["red", "white"], producers=["Pyros", "Finca Las Moras"],
     lat=-32.0676, lon=-68.8066, coord_quality="approx"))
A(ig("Pozo de los Algarrobos", SJ, "2015 (INV Res. C.33/2015)", "Pozo de los Algarrobos is a small IG in Caucete department, east of the San Juan river, recognised in 2015 for the vineyards of this desert locality.",
     match=["Pozo de los Algarrobos"], styles=["red", "white"], lat=-31.70, lon=-68.25, coord_quality="approx"))
A(ig("Calingasta", SJ, "2002 (INV Res. C.32/2002; synonym Valle de Calingasta 2013)", "Calingasta is San Juan's spectacular Andean valley, a north-south trough at 1,350 to 1,700 m between the main cordillera and the pre-cordillera, reached by a mountain road from San Juan. Only about 250 ha of vines (INV 2024), two-thirds of them Malbec, grow around Calingasta, Tamberías and Barreal on stony soils with huge day-night swings, giving deep-coloured, fresh reds. Since 2024 the valley has three more sub-IGs, Tamberías, Hilario and Sorocayense.",
     match=["Calingasta", "Valle de Calingasta", "Calingasta - Valle de Calingasta"], styles=["red", "white"], area_ha=253,
     producers=["Cara Sur"]))
A(ig("Barreal", SJ, "2013 (INV Res. C.42/2013)", "Barreal, at about 1,650 m at the southern end of the Calingasta valley under the Mercedario peak, is one of the highest IGs in Cuyo. Cara Sur makes light, mountain Criolla and Bonarda here from old vines trained on parral.",
     match=["Barreal"], styles=["red"], producers=["Cara Sur"], lat=-31.6447, lon=-69.4722, coord_quality="approx"))
A(ig("Tamberías", SJ, "2024 (INV Res. 35-37/2023, published February 2024)", "Tamberías is a village at about 1,500 m in the Calingasta valley, recognised as an IG at the request of the Calingasta municipality, together with Hilario and Sorocayense. Its name refers to Inca *tambos* (waystations) on the trail along the valley.",
     match=["Tamberías", "Tamberias"], styles=["red"], lat=-31.4581, lon=-69.4217, coord_quality="approx"))
A(ig("Hilario", SJ, "2024 (INV Res. 35-37/2023, published February 2024)", "Hilario is a small locality in the Calingasta valley, recognised as an IG together with Tamberías and Sorocayense in early 2024 to protect the names of the valley's distinct high-altitude terroirs.",
     match=["Hilario"], styles=["red"], lat=-31.48, lon=-69.43, coord_quality="approx"))
A(ig("Sorocayense", SJ, "2024 (INV Res. 35-37/2023, published February 2024)", "Sorocayense (Paraje Sorocayense) is a locality in the Calingasta valley, recognised as an IG together with Tamberías and Hilario in 2024.",
     match=["Sorocayense", "Paraje Sorocayense"], styles=["red"], lat=-31.55, lon=-69.45, coord_quality="approx"))

# ======================================================================== LA RIOJA
LR = "La Rioja"
A(ig("Valles del Famatina", LR, "2004 (INV Res. C.29/2004)", "The Famatina valleys, between the Famatina range (6,100 m) and the Velasco hills in La Rioja, are the province's wine heartland, with Chilecito at the centre at about 1,000 to 1,400 m. This is the home of Torrontés Riojano, grown for generations on high pergolas and made into aromatic, floral whites, and of the giant La Riojana cooperative. Valles del Famatina was Argentina's third most used IG in 2022 and second for exports by volume (INV), mostly as good-value Torrontés and Malbec.",
     match=["Valles del Famatina", "Famatina Valleys", "Valle de Famatina"], styles=["white", "red"], dominant_style="white",
     grapes="Torrontés Riojano, Malbec, Bonarda, Syrah, Cabernet Sauvignon", producers=["La Riojana", "Valle de la Puerta"],
     lat=-29.05, lon=-67.50, coord_quality="approx"))
for nm, txt, extra in [
    ("Chilecito", "Chilecito is La Rioja's wine capital and the core of the Famatina valleys, with about 580 ha of Malbec and much more Torrontés Riojano; La Riojana cooperative is based here, and the town still has the cableway built in 1904 to carry ore from the Famatina mines.", {}),
    ("Famatina", "Famatina department, north of Chilecito under the snow-capped Famatina range, grows Torrontés and Malbec at 1,400 to 1,700 m; it contains the Valle de Chañarmuyo IG.", {}),
    ("Arauco", "Arauco, around Aimogasta in northern La Rioja, is olive country first; its IG covers small vineyards of traditional varieties.", {}),
    ("Castro Barros", "Castro Barros, in the valleys north of La Rioja city, has about 70 ha of Malbec among small traditional vineyards (INV 2024).", {}),
    ("Felipe Varela", "Coronel Felipe Varela department, around Villa Unión in western La Rioja, grows grapes in an arid basin near the Talampaya canyon.", {}),
    ("General Lamadrid", "General Lamadrid is a remote high department in western La Rioja with a few hectares of vines.", {}),
    ("San Blas de los Sauces", "San Blas de los Sauces, in northern La Rioja, is a string of small oasis villages with traditional vineyards.", {}),
    ("Sanagasta", "Sanagasta, a hill valley north of La Rioja city, has a small wine tradition and a few hectares of Malbec.", {}),
    ("Vinchina", "Vinchina, in the far west of La Rioja near the Andes, is a high, arid department with tiny vineyards for local wine.", {}),
]:
    kw = dict(extra); kw.setdefault("match", [nm])
    A(ig(nm, LR, "2002 (INV Res. C.32/2002)", txt, styles=["white", "red"], **kw))
A(ig("Valle de Chañarmuyo", LR, "2014 (INV Res. C.28/2014)", "Chañarmuyo is a high valley at about 1,700 m in Famatina department where Bodega Chañarmuyo planted a modern estate in the 2000s. Recognised in 2014, it gives altitude Malbec, Cabernet and Torrontés of more freshness than the lower Famatina floor.",
     match=["Valle de Chañarmuyo", "Chañarmuyo"], styles=["red", "white"], producers=["Bodega Chañarmuyo"], lat=-28.6032, lon=-67.5833, coord_quality="approx"))

# ======================================================================== CATAMARCA
CA = "Catamarca"
for nm, txt, extra in [
    ("Tinogasta", "Tinogasta, around Fiambalá and Tinogasta towns in western Catamarca at 1,200 to 1,700 m, is the province's main wine area, with old Torrontés and Criolla vines, adobe wineries and home-made *vino patero*, plus modern altitude Syrah and Malbec.", {}),
    ("Belén", "Belén, in central-western Catamarca, grows grapes in small Andean oases such as Hualfín and Londres at 1,200 to 1,800 m.", {"match": ["Belén", "Belen"]}),
    ("Pomán", "Pomán, at the foot of the Ambato range in Catamarca, has a few traditional vineyards around Saujil and Mutquín.", {"match": ["Pomán", "Poman"]}),
    ("Santa María", "Santa María, in the north of Catamarca at about 1,900 m, is the southern end of the Calchaquí valleys system, with about 220 ha of Malbec and old Torrontés vines (INV 2024).", {}),
]:
    kw = dict(extra); kw.setdefault("match", [nm])
    A(ig(nm, CA, "2002 (INV Res. C.32/2002)", txt, styles=["red", "white"], **kw))

# ======================================================================== SALTA / CALCHAQUIES
SA = "Salta"
A(ig("Valles Calchaquíes", SA, "2002 (INV Res. C.37/2002; synonym Valle Calchaquí 2010)", "The Calchaquí valleys form one of the highest wine regions on Earth: a 270-km chain of arid valleys along the Calchaquí river and its tributaries, crossing Salta, Tucumán and Catamarca from Cachi and Payogasta in the north to Cafayate and Santa María in the south. Vineyards sit between about 1,700 m at Cafayate and over 3,000 m around Payogasta, under the Andes' eastern ranges. The Jesuits and Spanish settlers brought Criolla vines in the colonial era; the Isasmendi and Dávalos families planted French Malbec and Cabernet at Colomé in the 1850s.\n\nAltitude defines the wine. Strong ultraviolet light thickens grape skins, giving Malbec, Tannat and Cabernet Sauvignon deep colour and firm tannin; nights are cold, so acidity stays high. Torrontés Riojano reaches its most perfumed and best-balanced style at Cafayate. Soils are sandy and stony alluvium with low organic matter, and rainfall is under 200 mm. The IG was the fourth most used Argentine IG in 2022 (INV).",
     match=["Valles Calchaquíes", "Valles Calchaquies", "Valle Calchaquí", "Calchaquí Valleys", "Valles Calchaquíes - Valle Calchaquí"], styles=["red", "white"], dominant_style="red",
     grapes="Malbec, Torrontés Riojano, Cabernet Sauvignon, Tannat, Cabernet Franc, Criolla Chica",
     terroir="Sandy and gravelly alluvium on valley terraces, granite and schist slopes; 1,700 to 3,100 m; high UV, cold nights, under 200 mm of rain.",
     producers=["Colomé", "El Esteco", "Etchart", "Piattelli", "Tacuil", "Yacochuya", "El Porvenir", "Domingo Hermanos"]))
A(ig("Valle de Cafayate", SA, "2002 (INV Res. C.32/2002; only 'Valle de Cafayate' allowed since 2005)", "Cafayate is the wine town of the Calchaquí valleys, at about 1,700 to 2,000 m, with roughly 2,765 ha of vines (INV 2024), three-quarters of Salta's total. Its sandy, wind-scoured terraces under the red sandstone of the Quebrada de las Conchas give Argentina's best Torrontés, aromatic yet dry, and dense, sun-built Malbec, Cabernet and Tannat. Wineries such as El Esteco, Etchart, El Porvenir and Michel Rolland's Yacochuya line the town. Because 'Cafayate' is a registered trademark, INV ruled in 2005 that only the form 'Valle de Cafayate' may be used on labels.",
     match=["Valle de Cafayate", "Cafayate", "Cafayate - Valle de Cafayate"], styles=["white", "red"], area_ha=2765,
     producers=["El Esteco", "Etchart", "El Porvenir", "Yacochuya", "Piattelli", "Domingo Hermanos", "Amalaya"]))
A(ig("Molinos", SA, "2002 (INV Res. C.32/2002)", "Molinos is a colonial village in the middle Calchaquí valley at about 2,000 m. Its department includes Colomé, founded in 1831 and one of Argentina's oldest working wineries, whose vineyards climb from 2,300 to 3,111 m, and the small high estate of Tacuil. Malbec covers 69% of its 133 ha (INV 2024).",
     match=["Molinos"], styles=["red", "white"], producers=["Colomé", "Tacuil"]))
A(ig("Cachi", SA, "2002 (INV Res. C.32/2002)", "Cachi, in the upper Calchaquí valley at about 2,300 to 3,000 m under the Nevado de Cachi, has about 117 ha of vines (INV 2024), 73% Malbec. Vineyards at Cachi Adentro and Payogasta are among the highest in the world.",
     match=["Cachi"], styles=["red"]))
A(ig("San Carlos (Salta)", SA, "2002 (INV Res. C.32/2002)", "San Carlos department in Salta, between Cafayate and Molinos along the Calchaquí river, includes Angastaco and Animaná, with about 670 ha of vines (INV 2024). It contains the Valle de Pucará IG.",
     id="ar-san-carlos-2", match=["San Carlos Salta"], styles=["red", "white"]))
A(ig("Valle de Pucará", SA, "2025 (INV Res. 8/2025)", "Valle de Pucará, recognised in March 2025 at the request of Finca de los Viñedos Imposibles, is a high side valley west of Angastaco in San Carlos department, at well over 2,000 m. Its name (from the Quechua for 'fortress') recalls pre-Hispanic hilltop sites; local growers make Malbec and Criolla of extreme concentration.",
     match=["Valle de Pucará", "Valle de Pucara", "Pucará"], styles=["red"], lat=-25.7798, lon=-66.2693, coord_quality="approx"))

# ======================================================================== JUJUY / TUCUMAN
A(ig("Quebrada de Humahuaca", "Jujuy", "2015 (INV Res. C.39/2015)", "The Quebrada de Humahuaca, a UNESCO World Heritage valley of coloured mountains in Jujuy, has a tiny modern wine scene on terraces between about 2,300 and 3,300 m around Maimará, Tilcara, Huacalera and Uquía. Fernando Dupont, Bodega Kindgard and others make Malbec, Cabernet Franc, Syrah and Merlot of intense colour and freshness. It is one of the highest IGs in the world.",
     match=["Quebrada de Humahuaca", "Humahuaca"], styles=["red"], producers=["Fernando Dupont", "Bodega Kindgard", "Huichaira"]))
A(ig("Valles Templados", "Jujuy", "2025 (INV Res. 28/2025)", "Valles Templados ('temperate valleys'), recognised in August 2025 at the request of Jujuy's provincial government, covers the lower, greener valleys of Jujuy around San Salvador, El Carmen and Perico, where a subtropical-montane climate allows a small but growing wine production.",
     match=["Valles Templados"], styles=["red", "white"], lat=-24.38, lon=-65.15, coord_quality="approx"))
A(ig("Tafí", "Tucumán", "2002 (INV Res. C.32/2002)", "Tafí (Tafí del Valle department) is Tucumán's wine IG, taking in Colalao del Valle and Amaicha del Valle on the Calchaquí side of the Aconquija range at about 1,700 to 2,000 m, where Malbec and Torrontés grow. Amaicha's indigenous community runs its own community winery, Los Amaichas.",
     match=["Tafí", "Tafi", "Tafí del Valle"], styles=["red", "white"], producers=["Bodega Comunitaria Los Amaichas"]))

# ======================================================================== PATAGONIA
PA = "Patagonia"
A(ig("Alto valle de Río Negro", PA, "2002 (INV Res. C.37/2002)", "The Alto Valle is the irrigated upper valley of the Río Negro from the Neuquén-Limay confluence east past General Roca, an apple-and-pear oasis at about 250 to 300 m. Humberto Canale planted vines here in 1909, and old Malbec, Merlot, Pinot Noir and Semillon from mid-20th-century plantings now attract fine-wine producers. Cool nights, constant wind and long summer days give fresh, perfumed wines.",
     match=["Alto valle de Río Negro", "Alto Valle de Río Negro", "Alto Valle del Río Negro"], styles=["red", "white"],
     producers=["Humberto Canale", "Bodega Noemía", "Bodega Chacra", "Bodega Miras"], lat=-39.04, lon=-67.55, coord_quality="approx"))
for nm, txt, extra in [
    ("General Roca", "General Roca department is the core of Río Negro wine, along the Alto Valle with about 215 ha of Malbec (INV 2024); it includes Mainqué, home of Noemía and Chacra.", {}),
    ("Avellaneda", "Avellaneda department, in the middle Río Negro valley around Choele Choel, grows pears, apples and a little wine; about 58 ha of Malbec (INV 2024).", {}),
    ("General Conesa", "General Conesa, on the lower Río Negro, is a small irrigated area with a few vineyards.", {}),
    ("Pichimahuida", "Pichi Mahuida, on the Río Colorado at the north-eastern edge of Río Negro province, has a few small vineyards.", {"match": ["Pichimahuida", "Pichi Mahuida"]}),
    ("Añelo", "Añelo department in Neuquén contains San Patricio del Chañar, where from the late 1990s irrigation turned desert plateau into vineyards for Bodega del Fin del Mundo, Familia Schroeder and NQN; it holds 89% of Neuquén's Malbec (INV 2024).", {"match": ["Añelo", "Anelo"], "producers": ["Bodega del Fin del Mundo", "Familia Schroeder", "NQN"]}),
    ("Confluencia", "Confluencia, the department around Neuquén city where the Neuquén and Limay rivers meet, has small vineyards near Plottier and Centenario.", {}),
]:
    kw = dict(extra); kw.setdefault("match", [nm])
    A(ig(nm, PA, "2002 (INV Res. C.32/2002)", txt, styles=["red", "white"], **kw))
A(ig("Sarmiento (Chubut)", PA, "2023 (RESOL-2023-9-APN-INV#MEC)", "Sarmiento, in central Chubut near lakes Musters and Colhué Huapi at about 45.5°S, is one of the southernmost wine IGs in the world, recognised in 2023. Small vineyards of cool-climate varieties grow in a cold, windy steppe oasis.",
     id="ar-sarmiento-2", match=["Sarmiento Chubut"], styles=["white", "red"], lat=-45.5868, lon=-69.0688, coord_quality="approx"))
A(ig("Trevelin", PA, "2020 (RESOL-2020-28-APN-INV#MAGYP)", "Trevelin, a town founded by Welsh settlers in the Andean foothills of Chubut at about 43°S, became an IG in 2020. Vineyards near the Futaleufú river, among the southernmost in the Americas, grow Pinot Noir, Chardonnay, Sauvignon Blanc and Riesling for crisp, low-alcohol wines.",
     match=["Trevelin"], styles=["white", "red", "sparkling"], producers=["Casa Yagüe", "Viñas del Nant y Fall"], lat=-43.0792, lon=-71.4641, coord_quality="approx"))
A(ig("El Hoyo", PA, "2023 (INV Res. 25/2023)", "El Hoyo, a pre-Andean valley in the far north of Chubut near El Bolsón at only about 300 m, became an IG in September 2023 at the request of Patagonian Wines, the estate founded by Bernardo Weinert. Its roughly 28 ha grow Merlot, Pinot Noir, Chardonnay, Riesling and Gewürztraminer at latitude 42°S.",
     match=["El Hoyo"], styles=["white", "red"], producers=["Patagonian Wines (Bernardo Weinert)"], lat=-42.0641, lon=-71.5193, coord_quality="approx"))

# ======================================================================== CORDOBA / BUENOS AIRES / ENTRE RIOS
A(ig("Colón", "Córdoba", "2002 (INV Res. C.32/2002)", "Colón department, north of Córdoba city, contains Colonia Caroya and Jesús María, the historic core of Córdoba wine.",
     match=["Colón", "Colon"], styles=["red", "white"]))
A(ig("Colonia Caroya", "Córdoba", "2004 (INV Res. C.36/2004)", "Colonia Caroya was settled in 1878 by immigrants from Friuli, who planted vines on land of the former Jesuit estancia of Caroya. They still make Frambua, a sweetish red from the American hybrid Isabella, alongside vinifera wines, and celebrate a harvest festival each year.",
     match=["Colonia Caroya", "Caroya"], styles=["red", "white"], lat=-31.0221, lon=-64.0617, coord_quality="approx",
     nerd_note="The nearby Estancia Jesuítica de Caroya, part of a UNESCO World Heritage site, made wine for the Jesuit college of Córdoba from the 17th century."))
A(ig("Cruz del Eje", "Córdoba", "2002 (INV Res. C.32/2002)", "Cruz del Eje, in north-western Córdoba, is a warm valley with a small grape-growing tradition.", match=["Cruz del Eje"], styles=["red", "white"]))
A(ig("San Javier", "Córdoba", "2002 (INV Res. C.32/2002)", "San Javier department, in the Traslasierra valley west of the Córdoba hills around Villa Dolores, has small vineyards at the foot of the Comechingones range.", match=["San Javier"], styles=["red", "white"]))
BA = "Buenos Aires"
A(ig("Chapadmalal", BA, "2014 (INV Res. C.20/2014)", "Chapadmalal, on the Atlantic coast south of Mar del Plata, is Argentina's maritime wine experiment: Trapiche planted vineyards here around 2010 a few kilometres from the sea, and the IG followed in 2014. Cool, humid, windy conditions on loess soils give Sauvignon Blanc, Albariño, Chardonnay and Pinot Noir with real salinity, sold as Costa & Pampa.",
     match=["Chapadmalal"], styles=["white", "red", "sparkling"], producers=["Trapiche (Costa & Pampa)"], lat=-38.1944, lon=-57.6802, coord_quality="approx"))
A(ig("Balcarce", BA, "2022 (RESOL-2022-11-APN-INV#MAGYP)", "Balcarce, in the Tandilia hills of south-eastern Buenos Aires province, was recognised in 2022 at the request of the area's one significant winery. It is cool, humid Pampas country suited to Pinot Noir, Chardonnay and sparkling base.",
     match=["Balcarce"], styles=["white", "red", "sparkling"]))
A(ig("Tandil", BA, "2024 (INV Res. 24/2024)", "Tandil, in the granite hills of the Tandilia system, became an IG in July 2024, the third in the Buenos Aires hills. Better known for salami and cheese, it now has a few vineyards on rocky slopes.",
     match=["Tandil"], styles=["white", "red"]))
A(ig("Villa Ventana", BA, "2011 (INV Res. C.46/2011)", "Villa Ventana, in the Sierra de la Ventana hills of south-western Buenos Aires province, was recognised in 2011. A handful of small wineries grow cool-climate varieties on stony slopes.",
     match=["Villa Ventana"], styles=["white", "red"], lat=-38.0786, lon=-61.9281, coord_quality="approx"))
A(ig("Victoria, Entre Ríos", "Entre Ríos", "2021 (RESOL-2021-5-APN-INV#MAGYP)", "Victoria, on the Paraná river delta in Entre Ríos, revives a wine tradition that flourished in the province in the late 19th and early 20th centuries before 1930s national regulation favoured Cuyo and many vineyards were uprooted. Recognised in 2021, it grows small volumes of red wine in a humid, temperate climate.",
     match=["Victoria, Entre Ríos", "Victoria Entre Rios", "Victoria"], styles=["red"]))
