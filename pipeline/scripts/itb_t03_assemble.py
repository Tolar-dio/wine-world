# Assemble T03 polygons (Romagna, Valtellina, FCO, Verdicchio Classico) into it_fine via itb_write.apply.
# Usage: python3 -I scripts/itb_t03_assemble.py [--dry]
import json, sys
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_write as Wr
from europe_common import label_point
import shapely
from shapely.geometry import shape

W = C.WORKB
rom = json.load(open(W + '/t03_romagna.json'))
val = json.load(open(W + '/t03_valtellina.json'))
fco = json.load(open(W + '/t03_fco.json'))
ver = json.load(open(W + '/t03_verdicchio.json'))
idx = {e['id']: e for e in json.load(open(C.GEO + '/_index.json'))}

ROM_RULE = 'Romagna DOC disciplinare (DM 22.09.2011, last amended DM 26.05.2022), art. 1.2 and Allegato "Disciplinare sottozona {n}", art. 3.1'
ROM_GRAPES = 'Sangiovese at least 95% (Romagna Sangiovese with the sottozona name); Romagna Bianco/Trebbiano rules for any white the annex allows'
COMMUNE_ONLY = {'modigliana'}
ROM_NOTE = {
    'bertinoro': 'Road loop: SS 9 Via Emilia from Via Armando Diaz (Forlimpopoli), Via Settecrociari, Via S. Vittore, Via Montebellino, Via Formignano, Teodorano - Montecavallo, Meldola - Teodorano, Via Meldola per Fratta, Via Monte Fratta, Via Tro\' Meldola.',
    'brisighella': 'Parts of Brisighella, Faenza and Casola Valsenio, along comune and province borders, the Brisighellese road, the Canaletta, Monte Gebolo, the Marzeno stream, Valpiana, S. Eufemia, Purocielo, Sintria, Pagnano, the Senio and Prugno. Many named farm tracks are not in OSM and are straight segments.',
    'castrocaro': 'Whole comuni of Rocca San Casciano, Dovadola and Castrocaro Terme e Terra del Sole, plus the part of Forlì inside Via Borsano (SP 57), Via Tomba, Via del Tesoro, Via Braga, Via del Partigiano (SP 56), Via del Gualdo, Via Ossi, Via Scaletta, Via Campagna di Roma, Via Framonta and Via Ciola.',
    'cesena': 'Road loop: SS 9 from the Bertinoro border, Via Ca\' Vecchia, Calisese, Via Casale, Via Fageto, Via Rudigliano, Ardiano, SP 75, SP 138, Borello, SP 48, Luzzena, Formignano, Via Montebellino, San Carlo, Via S. Vittore, SP 51 to Diegaro, SS 9.',
    'longiano': 'Whole Montiano and Borghi; Longiano, Savignano sul Rubicone and the eastern hills above SS 9 between the Ca\' Vecchia - Calisese - Ardiano - Garampa - Montecodruzzo - Ansa - SP 11 (Montegelli, Rontagnano, Barbotto, Savignano di Rigo) line and the Forlì-Cesena / Rimini province border.',
    'meldola': 'Between the Predappio and Mercato Saraceno sottozone, south of Bertinoro, down to SP 4, Santa Sofia, Via Spinello, SP 96, SP 127, Civorio and SP 95 (built as the space left between the neighbouring sottozone).',
    'modigliana': 'Whole comune of Modigliana.',
    'marzeno': 'Road loop in Faenza and Brisighella: SP 16 at Via Bertella (Rivalta), Via Cornacchia, Via Tuliero, Via Sarna, Via Pian di Vicchio, Monte Gebolo crest, Via Bicocca, Provinciale Faentina, Via Ceparano, Via Albonello, Via Gabellotta, Via Pietramora, Via Sandrona, Via Samoggia, Via Canovetta, Via Uccellina.',
    'oriolo': 'SS 9 from Via S. Lucia (Faenza) to Via del Braldo (Villanova), Via del Braldo to the Castrocaro boundary, the Ravenna / Forlì-Cesena border, Via Urbiano, Via Samoggia, Via S. Lucia.',
    'predappio': 'Whole comune of Predappio plus parts of Forlì, Meldola, Civitella di Romagna and Galeata: Via Tomba, Via del Tesoro, Castel Latino, Via del Partigiano, SP 3, Via Monda, SP 4 Bidentina, San Colombano, Gualdo, S. Paolo in Aquilano, SP 68 Voltre, Bonalda, Nespoli, Civitella, Galeata, Pianetto, then the Galeata / Santa Sofia / Premilcuore / Rocca San Casciano borders.',
    'mercato_saraceno': 'Whole Mercato Saraceno and Sarsina, plus parts of Cesena, Roncofreddo and Sogliano al Rubicone between SP 48 (Borello, Luzzena, Montecavallo, Casalbono), SP 78 and the Longiano and Cesena sottozona lines.',
    'serra': 'Castel Bolognese SS 9 x SS 306 Casolana, Via Kennedy, Via Ghinotta, Via Biancanigo, Via Boccaccio, the Senio, the Riolo Terme / Brisighella border, Via Tomba, Via Pediano, Via Chiesa di Pediano, Via Bergullo, Via dei Colli, SS 9.',
    'imola': 'Whole Fontanelice, Borgo Tossignano and Casalfiumanese; Dozza, Castel San Pietro Terme, Ozzano dell\'Emilia and Imola south of SS 9 Via Emilia, without the Serra sottozona (east limit Via dei Colli, Bergullo, Chiesa di Pediano, Pediano, Tombe).',
    'coriano': 'Whole comune of Coriano plus the part of Rimini inside Via Santa Aquilina, Amola, Montevecchio, Maceri, Montescudo, Tirso and Coriano.',
    'san_clemente': 'Comuni of San Clemente, Montescudo-Monte Colombo, Misano Adriatico, San Giovanni in Marignano, Montefiore Conca, Gemmano, Morciano di Romagna, Saludecio, Mondaino and Montegridolfo, without the land seaward of SS 16.',
    'verucchio': 'Comuni of Verucchio, Santarcangelo di Romagna, Poggio Torriana, Casteldelci, Maiolo, Novafeltria, Pennabilli, San Leo, Sant\'Agata Feltria and Talamello, plus Rimini inland of SS 16 without the Coriano part.',
}
ROM_NAMES = {'mercato_saraceno': 'Mercato Saraceno', 'san_clemente': 'San Clemente'}
ROM_WHOLE = {'castrocaro', 'imola', 'coriano', 'san_clemente', 'verucchio', 'longiano', 'predappio', 'mercato_saraceno'}

VAL_NOTE = {
    'maroggia': 'Valle Serada at the Regoledo - Monastero road, Monastero road to 550 m, strada dei Casini to Piasci, Maroggia - Ere road through Maroggia, the crest of the cone to Pedemonte, the contrade Ere, Valdorta, Pedemonte, Gatti, Camp Fop, the Valeriana.',
    'sassella': 'SS 38 below the Madonna di Sassella church, Castellina, the Valeriana to Via Bernina (Sondrio), the Valmalenco road to S. Bartolomeo, Sondrio - Triangia road below S. Anna, strade del Quadro, Campetto and Sassa, the Sondrio / Castione boundary to Tass, Crap Coron, Crap Bedoi, Martinelli, the Moroni road, the Soverna, the Valle del Solco, the foot of the slope.',
    'grumello': 'Via Lusardi, Via Brennero, Via Visciastro and SS 38 to the Sondrio / Montagna boundary, the foot of the slope by Ca\' Trippi and Ca\' Farina to the Davaglione, the Sondrio - Montagna road, Riva, Giambon, Madonnina, the Dossi Salati mule track, Ponchiera, Rasella and the Sondrio - Arquino road.',
    'inferno': 'The Valeriana from the Davaglione by Ca\' Muzzat, Conforti and Pignotti to Palù, the foot of the slope to Calvario, Ca\' Menatti (Sedume), S. Tommaso, the station - Tresivio road, the Tresivio - Sondrio road by Poggiridenti to the Davaglione bridge, the Davaglione down to the Valeriana.',
    'valgella': 'The Rogna stream at the Valeriana (Chiuro), the Valeriana by Nigola, SS 38 to Tresenda, the Quigna mule track to S. Gottardo (Somasassa), Bissa, Gianoli, S. Gervasio, Castelvetro, the Teglio - Tresenda road, Posseggia, La Sella, Brioni, Selva del Pozzo, the Chiuro - Teglio road to the Rogna, La Crotta, Doss Bel, S. Bartolomeo, Valle dei Luc and the foot of the slope.',
}


def unit(key, uid, g4326, *, name=None, cat, subcat, parent, bq, src, alt=None, reg=None, tol=20, opening=10, styles=None,
         varieties=None):
    e = idx.get(uid, {})
    g3035 = C.to3035(shapely.make_valid(g4326))
    g4, area = Wr.finish(g3035, tol, opening=opening)
    lp = label_point(g4)
    b = g4.bounds
    par = idx[parent]
    r = dict(reg or {})
    r['comuni'] = Wr.comuni_of(C.to3035(g4))
    p = {'id': uid, 'name': name or e.get('name'), 'ctx': e.get('ctx'), 'alt': alt if alt is not None else e.get('alt', []),
         'country': 'it', 'cat': cat, 'subcat': subcat, 'src': src, 'bq': bq, 'area': round(area, 1), 'parent': parent,
         'lp': lp, 'bbox': [round(x, 4) for x in b], 'varieties': varieties, 'styles': styles, 'reg': r,
         'style': e.get('style', 'red'), 'prof': e.get('prof', 0), 'lvl': par.get('lvl', 0) + 1}
    pb = par['bbox']
    inside = b[0] >= pb[0] - 1e-3 and b[1] >= pb[1] - 1e-3 and b[2] <= pb[2] + 1e-3 and b[3] <= pb[3] + 1e-3
    print(f'{uid:52s} {area:8.2f} km2 valid={g4.is_valid} in_parent_bbox={inside} {g4.geom_type}')
    return p, g4, inside


def main():
    feats, notes = [], []
    for k, gj in rom.items():
        n = ROM_NAMES.get(k, k.replace('_', ' ').title())
        uid = 'it-romagna-' + k.replace('_', '-')
        bq = 'commune' if k in COMMUNE_ONLY else 'approx'
        reg = {'doc': 'Romagna', 'rule': ROM_RULE.format(n=n.upper()), 'extent': ROM_NOTE[k]}
        p, g, ins = unit(k, uid, shape(gj), cat='DOC', subcat='Sottozona', parent='it-romagna', bq=bq,
                         src='commune' if bq == 'commune' else 'osmtrace', styles=['red'], varieties=['Sangiovese'], reg=reg)
        p['src'] = 'istatcom' if bq == 'commune' else 'osmtrace'
        if k == 'mercato_saraceno':
            p['alt'] = sorted(set((p.get('alt') or []) + ['San Vicinio']))
        feats.append((p, g)); notes.append((uid, ins))
    for k, gj in val.items():
        uid = 'it-valtellina-superiore-' + k
        reg = {'docg': 'Valtellina Superiore', 'rule': 'Valtellina Superiore DOCG disciplinare, art. 3 (sottozone geografiche storiche a to e)',
               'extent': VAL_NOTE[k], 'grapes': 'Nebbiolo (Chiavennasca) at least 90%'}
        p, g, ins = unit(k, uid, shape(gj), cat='DOCG', subcat='Sottozona', parent='it-valtellina-superiore', bq='approx',
                         src='osmtrace', styles=['red'], varieties=['Nebbiolo'], reg=reg, tol=10, opening=5)
        feats.append((p, g)); notes.append((uid, ins))
    fco_units = {
        'cialla': ('it-friuli-colli-orientali-cialla', 'approx', 'osmtrace',
                   'Part of Prepotto: north the Cividale - Castelmonte road (Mezzomonte, Casali Suoc), quotas 490, 496 and 612 on the S. Pietro di Chiazzacco - Castelmonte road, east to quota 294 above Casali Magnana, about the 200 m contour to the comune boundary between the Casali Barbianis - Cialla and Barbianis - Cladrecis roads, then the Prepotto boundary. Quota points placed by hand.',
                   None, ['white', 'red', 'sweet'], ['Ribolla Gialla', 'Verduzzo Friulano', 'Picolit', 'Refosco dal Peduncolo Rosso', 'Schioppettino']),
        'rosazzo': ('it-friuli-colli-orientali-rosazzo', 'approx', 'osmtrace',
                    'One area for both Ribolla Gialla di Rosazzo and Pignolo di Rosazzo (identical art. 3 texts): Strada del Sole at the Rio Case (Manzano), Rio Case, Rio Sosso, Torrente Sosso, strada dell\'Abbazia, the 93.1 m contour, Oleis - Poggiobello road, Torrente Riul, Torrente Corona, the Premariacco / Manzano and Corno di Rosazzo / Manzano borders, Casali Sandrinelli, Casa del Bosco, Villa Naglis, via dell\'Abbazia, podere Trento, Il Rivolo, Case Masarotte, strada dei Ronchi, the power line, Rio San Giovanni. Small streams and farm roads are straight segments.',
                    ['Ribolla Gialla di Rosazzo', 'Pignolo di Rosazzo', 'Rosazzo'], ['white', 'red'], ['Ribolla Gialla', 'Pignolo']),
        'prepotto': ('it-friuli-colli-orientali-prepotto', 'commune', 'istatcom',
                     'Comune of Prepotto inside the Friuli Colli Orientali zone, without the Cialla sottozona (and, by the text, without too damp or shaded land, which cannot be mapped).',
                     None, ['red'], ['Schioppettino']),
        'faedis': ('it-friuli-colli-orientali-refosco-di-faedis', 'commune', 'istatcom',
                   'Comuni of Faedis, Nimis, Attimis, Torreano, Povoletto and Tarcento inside the Friuli Colli Orientali zone (without too damp or shaded land, which cannot be mapped).',
                   None, ['red'], ['Refosco Nostrano']),
    }
    for k, (uid, bq, src, ext, alt, sty, var) in fco_units.items():
        reg = {'doc': 'Friuli Colli Orientali', 'rule': 'Friuli Colli Orientali DOC disciplinare (as amended to DM 07.03.2014), art. 1.2 and sottozona Allegato, art. 3', 'extent': ext}
        name = 'Ribolla Gialla di Rosazzo / Pignolo di Rosazzo' if k == 'rosazzo' else None
        p, g, ins = unit(k, uid, shape(fco[k]), cat='DOC', subcat='Sottozona', parent='it-friuli-colli-orientali', bq=bq,
                         src=src, alt=alt, styles=sty, varieties=var, reg=reg, tol=10 if bq == 'approx' else 20,
                         opening=10 if bq == 'approx' else 0)
        if k == 'rosazzo':
            p['name'] = idx[uid]['name']   # keep the existing name "Rosazzo" used by the profile
        feats.append((p, g)); notes.append((uid, ins))
    reg = {'doc': 'Verdicchio dei Castelli di Jesi', 'rule': 'Verdicchio dei Castelli di Jesi DOC disciplinare (as amended to DM 07.11.2014), art. 3: "Classico" is the zone without the land on the left of the Misa and without the comuni of Ostra and Senigallia',
           'extent': 'The atlas DOC polygon (EU commune union) cut along the OSM Misa, right bank kept, minus Ostra and Senigallia. The outer edge is the commune union, so it is larger than the line of art. 3 in Cingoli, Apiro and Arcevia.'}
    p, g, ins = unit('classico', 'it-verdicchio-dei-castelli-di-jesi-classico', shape(ver['classico']), cat='DOC',
                     subcat='Zona classica', parent='it-verdicchio-dei-castelli-di-jesi', bq='approx', src='osmtrace',
                     alt=['Verdicchio dei Castelli di Jesi Classico', 'Castelli di Jesi Classico'], styles=['white'],
                     varieties=['Verdicchio'], reg=reg, opening=0)
    p['ctx'] = 'Castelli di Jesi'
    feats.append((p, g)); notes.append((p['id'], ins))
    json.dump([[p['id'], p['area'], ins] for p, _ in feats], open(W + '/t03_written.json', 'w'))
    Wr.apply(feats)


if __name__ == '__main__':
    main()
