import { K, KOL, L, LH, type Piesne } from './types'

export const ZIMA: Record<string, Piesne> = {
  mikulas: {
    s: [
      ['Bude zima, bude mráz', L],
      ['Padá sniežik biely', K, 'Padá, padá sniežik biely,\nzakryl lúku, dvor aj celý.\nSánky, lopár, šmýkačka,\nzima je to hračka.'],
      ['Prišla zima', K, 'Prišla zima, mrzne von,\nzvonček zvoní: cin-cin-don.\nČiapku, šálik, rukavice,\nčervené máme líce.'],
      ['Mikuláš, Mikuláš', K, 'Mikuláš, Mikuláš,\nčo nám prinesieš?\nJabĺčko a orech,\nsladký cukríček.'],
      ['Čižmička', K, 'Čižmičku si vyčistím,\ndám ju na okno.\nRáno v nej je darček,\nod Mikuláša.'],
    ],
    r: [
      ['Mikuláš', 'Mikuláš, Mikuláš,\nbiele fúzy, palicu máš.\nČo v tom vreci nesieš nám?\nDarček pre deti, to znám.'],
      ['Čižmička', 'Čižmičku si vyčistím,\ndo okienka položím.\nRáno nájdem v čižmičke\njabĺčko a orechy.'],
      ['Básnička pre Mikuláša', 'Mikuláš, ja básničku viem,\npoviem ti ju celú hneď.\nBol som dobrý celý rok,\ndaj mi darček, malý krok.'],
      ['Anjelik a čertík', 'Anjelik má krídla biele,\nčertík rohy, chvost a smiech.\nMikuláš ich vedie k nám,\ndarček každý dostane.'],
      ['Sneží', 'Sneží, sneží, Mikuláš ide,\nsaničky mu po snehu idú.\nZvonček zvoní: cingi-lingi,\nkto je dobrý, ten má sladký.'],
    ],
  },
  sneh: {
    s: [
      ['Padá sniežik biely', K, 'Padá, padá sniežik biely,\nzakryl lúku, dvor aj celý.\nSánky, lopár, šmýkačka,\nzima je to hračka.'],
      ['Snehuliačik', K, 'Gúľam guľu zo snehu,\nmalú, väčšiu, ešte jednu.\nMrkvu na nos, hrniec hore,\nsnehuliak stojí na dvore.'],
      ['Bude zima, bude mráz', L],
      ['Prišla zima', K, 'Prišla zima, mrzne von,\nzvonček zvoní: cin-cin-don.\nČiapku, šálik, rukavice,\nčervené máme líce.'],
      ['Guľovačka', K, 'Biely sniežik padá,\nguľu urobím.\nHodím ju, hop-hop,\nkamarát sa smeje.'],
    ],
    r: [
      ['Snehuliak', 'Guľa malá, guľa veľká,\nmrkva nosom, hrniec čiapkou.\nUhlíky sú očká dve,\nsnehuliak sa smeje, hľa.'],
      ['Vločka', 'Vločka, vločka, biela hviezdička,\npadá z neba potichučky.\nSadne si mi na rukavicu,\nroztopí sa na vodičku.'],
      ['Ľad', 'Ľad je hladký, šmyká sa,\npozor, nech sa nepošmykneš.\nPomaly, pomaličky,\nkrok za krokom kráčame.'],
      ['Cencúľ', 'Na streche visí cencúľ,\nostrý, dlhý, priehľadný.\nKeď slniečko zasvieti,\nkvap-kvap-kvap, už tečie.'],
      ['Sánky', 'Sánky, sánky, z kopca dolu,\nkto chce ísť so mnou spolu?\nFrrr, už letíme,\nčervené líčka máme.'],
    ],
  },
  vianoce: {
    s: [
      ['Tichá noc', `${KOL} (F. X. Gruber)`],
      ['Búvaj, dieťa krásne', KOL],
      ['Nesiem vám noviny', KOL],
      ['Pásli ovce valasi', KOL],
      ['Povedzte nám, pastuškovia', KOL],
      ['Daj Boh šťastia tejto zemi', KOL],
    ],
    r: [
      ['Stromček', 'Stromček zelený, ozdobený,\nguľky svietia, hviezda hore.\nPod stromčekom darčeky,\npre mamku aj pre deti.'],
      ['Lucia', 'Lucia, Lucia, biela pani,\nvymetá kúty, zlé zaháňa.\nPerím husím pozametá,\nnech je čistý dom pred sviatkami.'],
      ['Pečieme', 'Pečieme medovníčky,\nhviezdičky a srdiečka.\nPoleva biela, sladká,\nvonia celá kuchyňa.'],
      ['Štedrý večer', 'Štedrý večer, svieti svieca,\nrodina je pri stole spolu.\nOplátky s medom, kapustnica,\nvšetci sa máme radi.'],
      ['Vinš', 'Vinšujem vám zdravie, šťastie,\nnech vám rodina vždy rastie.\nNech je u vás láska, smiech,\npekné sviatky pre všetkých.'],
    ],
  },
  cas: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Spievanky, spievanky', L],
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Tik-tak hodiny', K, 'Tik-tak, tik-tak, tak,\nhodiny nám tikajú.\nRáno, obed, večer,\nčas nám uteká.'],
      ['Dvanásť mesiacov', K, 'Január a február,\npotom jar a leto.\nJeseň, zima príde zas,\nrok sa točí dokola.'],
    ],
    r: [
      ['Hodiny', 'Tik-tak, tik-tak, hodiny,\nmalá ručička a veľká.\nKeď sú obe hore spolu,\nje obed alebo polnoc.'],
      ['Týždeň', 'Pondelok, utorok, streda,\nštvrtok, piatok, potom sobota.\nV nedeľu si oddýchnem,\nnový týždeň začnem zase.'],
      ['Ročné obdobia', 'Jar má kvety, leto slnko,\njeseň lístie, zima sneh.\nŠtyri časti roka máme,\npoznáme ich všetky hneď.'],
      ['Narodeniny', 'Raz za rok mám narodeniny,\nsviečok toľko, koľko mám rokov.\nFúknem, fúknem, zhasnú hneď,\nnech je krásny celý svet.'],
      ['Ráno a večer', 'Ráno slnko vychádza,\nvečer sa zas schováva.\nV noci svieti mesiac, hviezdy,\nkým sa nový deň nezobudí.'],
    ],
  },
  'zvierata-zima': {
    s: [
      ['Zjedzte ma vĺčky, zjedzte', L],
      ['Bude zima, bude mráz', L],
      ['Padá sniežik biely', K, 'Padá, padá sniežik biely,\nzakryl lúku, dvor aj celý.\nSánky, lopár, šmýkačka,\nzima je to hračka.'],
      ['Čižiček, čižiček', L],
      ['Kŕmidlo', K, 'Do kŕmidla dáme\nzrnká, slnečnicu.\nVtáčiky sa najedia,\nzaspievajú nám.'],
    ],
    r: [
      ['Kŕmidlo', 'Na strome visí kŕmidlo,\nzrnká v ňom a slaninka.\nSýkorka si pochutí,\nďakujem, nám zacvrliká.'],
      ['Srnka', 'Srnka hľadá v snehu trávu,\nhorár nesie seno k nej.\nV krmelci je pre ňu jedlo,\nnebude mať hlad, verte mi.'],
      ['Stopy v snehu', 'Stopy, stopy v bielom snehu,\nkto tu išiel? Zajko, líška.\nPo stopách ich nájdeme,\nale ticho, pomaličky.'],
      ['Zajko', 'Zajko v zime biely nie je,\nale v snehu skáče rád.\nHľadá mrkvu, kapustičku,\nnech má z čoho dobre jesť.'],
      ['Medveď spí', 'Ticho, ticho, medveď spí,\nnech ho nikto nebudí.\nCelú zimu chrápe sladko,\nna jar vstane, zíva, hľa.'],
    ],
  },
  'zimne-sporty': {
    s: [
      ['Padá sniežik biely', K, 'Padá, padá sniežik biely,\nzakryl lúku, dvor aj celý.\nSánky, lopár, šmýkačka,\nzima je to hračka.'],
      ['Snehuliačik', K, 'Gúľam guľu zo snehu,\nmalú, väčšiu, ešte jednu.\nMrkvu na nos, hrniec hore,\nsnehuliak stojí na dvore.'],
      ['Prišla zima', K, 'Prišla zima, mrzne von,\nzvonček zvoní: cin-cin-don.\nČiapku, šálik, rukavice,\nčervené máme líce.'],
      ['Sánkovačka', K, 'Sánky, sánky moje,\nletíme dolu.\nKopec je biely,\nveselo je nám.'],
      ['Korčule', K, 'Na korčuliach kĺžem,\npo ľade sa krútim.\nRuky mám do strán,\nako lastovička.'],
    ],
    r: [
      ['Lyžiar', 'Lyže mám a palice,\nidem dolu z kopčeka.\nKľukatím sa sem a tam,\nlyžovať už viem aj sám.'],
      ['Korčuliar', 'Na korčuliach po ľade,\nkĺžem sa ako vtáčik.\nKeď spadnem, vstanem zas,\nskúšam to ešte raz.'],
      ['Sánky', 'Hore kopcom sánky ťahám,\ndolu kopcom sa vozím.\nFrrr, už letím,\nsnehom sa nič nebojím.'],
      ['Hokej', 'Hokejka a puk,\nďalej strela, puk-puk!\nGól sme dali, hurá, hej,\nvyhrali sme dnes, juchej!'],
      ['Guľovačka', 'Guľu robím zo snehu,\nhodím ju na kamaráta.\nSmejeme sa, behá sa,\nguľovačka je krásna.'],
    ],
  },
  badam: {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Čo sa stane?', K, 'Čo sa stane, keď sa\nzmieša modrá, žltá?\nZelená je hneď,\nčarovné to je.'],
      ['Lupa', K, 'Lupou sa pozriem\nna malú mravčičku.\nVeľká je ako slon,\nčuduje sa.'],
      ['Magnet', K, 'Magnet, magnetík,\nťahá klinčeky.\nDrevo nechce, nie,\nkov má rád.'],
    ],
    r: [
      ['Bádateľ', 'Ja som malý bádateľ,\nlupu mám aj zošitík.\nPozorujem, skúšam sám,\nčo sa stane, zistím hneď.'],
      ['Pláva, či nepláva?', 'Do vody hodím korok, kameň,\nčo sa stane, kto to vie?\nKorok pláva, kameň klesne,\nskúšame to stále znova.'],
      ['Farby', 'Modrú, žltú zmiešam spolu,\nzelená je zrazu tu.\nČervenú a žltú tiež,\noranžová, to už vieš.'],
      ['Ľad sa topí', 'Kocku ľadu dám na slnko,\ntopí sa, je z nej voda.\nVodu dám do mrazničky,\nzas je z nej kocka ľadu.'],
      ['Semienko', 'Semienko dám do zeme,\npolievam ho každý deň.\nČakám, čakám trpezlivo,\nvyrastie z neho kvietok.'],
    ],
  },
  'farby-tvary': {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Gúľalo sa, gúľalo', L],
      ['Farbičky', K, 'Červená je jahoda,\nmodré je nebo.\nŽlté slniečko,\nzelená tráva.'],
      ['Kruh a štvorec', K, 'Kruh sa kotúľa,\nštvorec stojí.\nTrojuholník špicatý,\nvšetky poznám.'],
    ],
    r: [
      ['Kruh', 'Kruh je guľatý ako slnko,\nako koliesko, ako tanier.\nNemá rohy ani hrany,\nkotúľa sa dookola.'],
      ['Štvorec', 'Štvorec má štyri strany rovné,\nštyri rohy, všetky rovnaké.\nOkno, kocka, šatka,\nvšade štvorec nájdem hneď.'],
      ['Trojuholník', 'Trojuholník, tri strany,\ntri rohy má špicaté.\nAko strecha na domčeku,\nako kúsok pizze, hľa.'],
      ['Dúha', 'Červená, oranžová, žltá,\nzelená a modrá, fialová.\nDúha je na nebi krásna,\nfarieb plná, veselá.'],
      ['Moja farba', 'Ja mám rád farbu modrú,\nako nebo, ako more.\nA ty ktorú máš rád?\nPovedz mi ju, kamarát.'],
    ],
  },
  fasiangy: {
    s: [
      ['Fašiangy, Turíce, Veľká noc ide', L],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Zahrajte mi muzikanti', L],
      ['Na trenčianskom moste', L],
      ['Kolo, kolo mlynské', LH],
    ],
    r: [
      ['Maska', 'Maska, maska, kto si ty?\nKráľ, či šašo, či medveď?\nZložím masku, a hľa,\nto je predsa Anička!'],
      ['Šišky', 'Fašiangy sú, pečú sa šišky,\nmastné, sladké, s lekvárom.\nKoľko zjeme? Jednu, dve,\nviac sa nám už nezmestí.'],
      ['Sprievod', 'Ide sprievod masiek dedinou,\nharmonika vyhráva.\nMedveď tancuje, cigánka spieva,\nveselo je u nás, hej!'],
      ['Pochovávanie basy', 'Fašiangy sa končia, basa ide spať,\npôst nás čaká, už sa nebude tancovať.\nAle na jar, keď príde čas,\nzahráme si zase raz.'],
      ['Šašo', 'Šašo má čiapku s zvončekmi,\ncingi-lingi, cinká nám.\nRobí kotrmelce, smejeme sa,\nveselo je s ním vždy, znám.'],
    ],
  },
  profesie: {
    s: [
      ['Kujem, kujem podkovičku', L],
      ['V pitvore oral', L],
      ['Pásla ovečky v zelenom hájičku', L],
      ['Kolo, kolo mlynské', LH],
      ['Čím budem', K, 'Čím budem, keď budem\nveľký ako ty?\nHasičom, či lekárom,\nalebo pekárom?'],
    ],
    r: [
      ['Hasič', 'Hasič má prilbu a hadicu,\nhasí oheň, pomáha.\nKeď zatrúbi siréna,\nhasič už je na ceste.'],
      ['Lekár', 'Lekár má biely plášť,\nvypočuje, či kašleš.\nDá ti sirup, dá ti liek,\nzdravý budeš o pár dní.'],
      ['Pekár', 'Pekár pečie chlebík ráno,\nkým my ešte sladko spíme.\nRožky, chlieb a koláče,\nvonia z pekárne až k nám.'],
      ['Policajt', 'Policajt nás chráni, vieš,\npomôže, keď stratíš sa.\nNa križovatke stojí,\nposiela autá sem a tam.'],
      ['Kuchárka', 'Kuchárka v škôlke varí,\npolievočku, rizoto.\nMy sa najeme a vravíme:\nďakujeme, bolo dobré!'],
    ],
  },
  muzikanti: {
    s: [
      ['Zahrajte mi muzikanti', L],
      ['Spievanky, spievanky', L],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Limbora, limbora', L],
      ['Hore háj, dolu háj', L],
    ],
    r: [
      ['Bubon', 'Bubon robí bum-bum-bum,\nčinely zas cin-cin-cin.\nTriangel znie cink-cink-cink,\nhráme spolu, ty aj ja.'],
      ['Husle', 'Husle spievajú tenúčko,\nbasa hlboko: bum-bum.\nHarmonika fúka, ťahá,\nkapela je hotová.'],
      ['Flauta', 'Fúkam, fúkam do flauty,\ntóny letia ako vtáci.\nVysoko a nízko zas,\nhudba znie po celom dome.'],
      ['Kapela', 'Ja mám bubon, ty máš zvonček,\nAnka hrkálku, Jano drevá.\nKeď hráme spolu,\nkapela je z nás veselá.'],
      ['Tichučko a nahlas', 'Tichučko ako myška,\nnahlas ako medveď, hej!\nRaz potichu, raz nahlas,\nskúsime to ešte raz.'],
    ],
  },
  'pri-vode': {
    s: [
      ['Kačička divoká', L],
      ['Naša kačka', L],
      ['Žabka skáče', K, 'Skok a skok, kvak a kvak,\nžabka skáče do mláky tak.\nNa lekne si posedí,\nmušku chytí, poobedí.'],
      ['Okolo Súče vodička tečie', L],
      ['Žabka', K, 'Žabka v rybníku,\nkvaká: kvak-kvak-kvak.\nSkáče na lekno,\nchytá mušky, hľa.'],
    ],
    r: [
      ['Žabka', 'Žabka sedí na lekne,\nkvaká, kvaká, kvak-kvak-kvak.\nMušku chytí jazýčkom,\nhop do vody, ako tak!'],
      ['Kačička', 'Kačička pláva po rybníku,\nkačiatka za ňou v rade.\nGá-gá-gá, poďte sem,\nkúpať sa je zábavné.'],
      ['Rybka', 'Rybka pláva v potôčiku,\nšupiny sa ligocú.\nChvostíkom zamáva,\nskryje sa pod kameň, hľa.'],
      ['Labuť', 'Labuť biela po jazere\nkĺže tichučko a hrdo.\nDlhý krk a krídla biele,\nnajkrajšia je vtáčica.'],
      ['Bobor', 'Bobor má zuby veľké,\nhryzie strom, ťuk-ťuk-ťuk.\nStavia hrádzu na potoku,\ndomček si tam robí sám.'],
    ],
  },
  rozpravky: {
    s: [
      ['Pec nám spadla', L],
      ['Išiel Macek do Malacek', L],
      ['Bola babka', L],
      ['Zlatá brána', LH],
      ['Rozprávka', K, 'Bol raz jeden kráľ,\nmal tri dcéry.\nKto je múdry, dobrý,\nten vždy vyhrá.'],
    ],
    r: [
      ['Červená čiapočka', 'Červená čiapočka ide lesom,\nnesie babke košík s jedlom.\nPozor, vlk je za stromom,\nneodbočuj z cestičky!'],
      ['Tri prasiatka', 'Prvé prasa zo slamy,\ndruhé z dreva domček má.\nTretie z tehál postavilo,\nvlk ho nezvalí, to vie.'],
      ['Kohútik a sliepočka', 'Kohútik sa zadúšal,\nsliepočka pre vodu bežala.\nK studničke, k lúke, k švecovi,\nvšetci kohútovi pomohli.'],
      ['Drak', 'Drak má hlavy tri a chvost,\nchrlí oheň, ale nebojím sa.\nPrinc ho porazí mečom,\nzachráni princeznú, hurá!'],
      ['Koniec rozprávky', 'Zazvonil zvonec\na rozprávky je koniec.\nKto ju počúval, je múdry,\nkto spal, nech sa zobudí.'],
    ],
  },
  domace: {
    s: [
      ['Kohútik jarabý', L],
      ['Naša kačka', L],
      ['Pásla ovečky v zelenom hájičku', L],
      ['Kujem, kujem podkovičku', L],
      ['Na dvore', K, 'Na dvore kohút,\nkikirikí, hej!\nKravička: búú,\nmačička: mňau.'],
    ],
    r: [
      ['Kravička', 'Kravička má rožky dva,\nmliečko dáva, búú, búú.\nPasie sa na lúke celý deň,\nvečer ide do maštale.'],
      ['Mačička', 'Mačička sa umýva labkou,\npriade si: mrr, mrr, mrr.\nMyšky chytá v pivnici,\nmliečko pije z misky rada.'],
      ['Psík', 'Psík náš dom stráži,\nhaf-haf-haf, kto prišiel?\nKeď je to kamarát,\nvrtí chvostom rád.'],
      ['Sliepočka', 'Sliepočka kotkodákala,\nvajíčko nám zniesla.\nKuriatka za ňou pípajú,\nzrnká spolu zbierajú.'],
      ['Koník', 'Koník beží cvalom, cvalom,\nhriva veje vo vetre.\nKlap-klap, kopýtka,\nvezie nás až do mesta.'],
    ],
  },
  jar: {
    s: [
      ['Kukulienka, kde si bola', L],
      ['Čižiček, čižiček', L],
      ['Morena, Morena', 'ľudová (vynášanie Moreny)'],
      ['Ej, padá, padá rosička', L],
      ['Jar prichádza', K, 'Jar už prichádza,\nsneh sa topí, hľa.\nSnežienka kvitne,\nvtáčik spieva nám.'],
    ],
    r: [
      ['Snežienka', 'Snežienka spod snehu\nvykukla na svet.\nBiela ako vločka,\nprvý jarný kvet.'],
      ['Slniečko', 'Slniečko, slniečko, zohrej nás,\nzima už nech ide preč.\nNech sa všetko zazelená,\nnech je jar tu na každom mieste.'],
      ['Morena', 'Morenu nesieme k potoku,\nnech odnesie zimu so sebou.\nVitaj, jar, vitaj zas,\nvitaj medzi nami, jar!'],
      ['Vtáčiky sa vracajú', 'Vtáčiky sa vracajú,\nz teplých krajín k nám.\nŠtebocú a spievajú,\njar je tu, to znám.'],
      ['Púpava', 'Púpava je žltá ako slnko,\npotom biela, ako hlávka.\nFúknem, fúknem, letí preč,\nkaždé semienko svojou cestou.'],
    ],
  },
  'velka-noc': {
    s: [
      ['Fašiangy, Turíce, Veľká noc ide', L],
      ['Kukulienka, kde si bola', L],
      ['Šibi ryby, mastné ryby', 'ľudová veľkonočná vinšovačka'],
      ['Kraslica', K, 'Maľujem vajíčko,\nbodky, kvietky, hľa.\nKraslica je hotová,\ndám ju mamičke.'],
      ['Zajko veľkonočný', K, 'Zajko skáče, skáče,\nnesie vajíčka.\nSchová ich do trávy,\nnájdi ich, hľa.'],
    ],
    r: [
      ['Kraslica', 'Maľujem si kraslicu,\nbodky, čiarky, kvietoček.\nKaždá je iná, pestrá,\nnajkrajšia je moja, vieš?'],
      ['Šibačka', 'Šibi, ryby, mastné ryby,\nnech je zdravá, nech nie choré.\nPolievame, šibeme,\nvajíčko si zaslúžime.'],
      ['Zajačik', 'Zajačik skáče cez lúčku,\nvajíčka nesie v košíčku.\nSchová ich za kríčok,\nkto ich nájde? Ty, môj kvietok!'],
      ['Košík', 'V košíku sú vajíčka,\nkraslice a bahniatka.\nVeľká noc je, sviatky jari,\nvšetko sa nám vydarí.'],
      ['Kuriatko', 'Z vajíčka sa vyliahlo\nkuriatko žlté, malinké.\nPíp-píp-píp, kde je mama?\nSliepočka ho volá, hľa.'],
    ],
  },
}
