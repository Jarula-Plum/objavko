import { D, K, L, LH, type Piesne } from './types'

export const JESEN: Record<string, Piesne> = {
  'kto-prisiel': {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Ahoj, kamarátko', K, 'Ahoj, kamarátko,\npoď sa so mnou hrávať.\nV škôlke je nám dobre,\nspolu sa tu smejme.'],
    ],
    r: [
      ['Ráno do škôlky', 'Ráno vstanem, umyjem sa,\ndo škôlky sa vyberám zas.\nMamke dám pusu na líčko,\nusmejem sa maličko.'],
      ['Kamarát', 'Kamarát môj, podaj ruku,\npostavíme vežu z kociek.\nKeď sa spolu hráme dvaja,\nnikdy nie je nuda v kraji.'],
      ['Moja značka', 'Moja značka je jabĺčko,\nvisí nízko na háčiku.\nTvoja značka je slniečko,\nnájdeš ju hneď, dievčatko.'],
      ['Mamka príde', 'Neplač, neplač, maličký,\nmamka príde po teba.\nDovtedy sa pohráme,\nmacka spolu uspíme.'],
      ['Dobré ráno', 'Dobré ráno, dobrý deň,\nkto je smutný, usmej sa len.\nV škôlke máme veľa hier,\npoď sa hrať, už neváhaj, ver.'],
    ],
  },
  domcek: {
    s: [
      ['Pec nám spadla', L],
      ['Červený kacheľ, biela pec', L],
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Domček, domček malý', K, 'Domček, domček malý,\nkto v tebe býva, kto?\nMyška, žabka, zajko,\nmiesta je tu dosť.'],
    ],
    r: [
      ['Ťuk-ťuk', 'Ťuk-ťuk, kto je tam?\nMyška malá, pusť ma k vám!\nŤuk-ťuk, kto je zas?\nŽabka zelená, kvak-kvak, kvas!'],
      ['Domček na lúke', 'Na lúčke stojí domček malý,\nzvieratká sa doň schovali.\nKaždý, kto príde, miesto má,\nvšetkým sa tu dobre spá.'],
      ['Komínček', 'Z komína sa dymí hore,\nmamka varí, vonia v dvore.\nKto má hlad, nech beží k nám,\nkoláčik mu ja tiež dám.'],
      ['Okienko', 'Okienko, okienko,\nsvieti do teba slniečko.\nKto sa v tebe ukáže?\nMačička, čo sa uloží.'],
      ['Moja izba', 'V mojej izbe posteľ mám,\nhračky si upracem sám.\nKeď je všetko na mieste,\nlepšie sa hrá, verte mi.'],
    ],
  },
  'moj-den': {
    s: [
      ['Češem si hlavičku', L],
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Spievanky, spievanky', L],
      ['Kohútik jarabý', L],
      ['Ráno, ráno vstávam', K, 'Ráno, ráno vstávam,\numývam si líčka.\nČistím si aj zúbky,\nhurá do škôlky!'],
    ],
    r: [
      ['Kohút budí', 'Kohút volá: kikirikí,\nvstávajte už, malí, veľkí!\nOči otvor, usmej sa,\nnový deň sa začína.'],
      ['Zúbky', 'Kefka hore, kefka dole,\nzúbky čistím ráno, večer.\nKrúžim, krúžim, raz a dva,\nbiele zúbky mám aj ja.'],
      ['Obed', 'Polievočka, druhé jedlo,\nlyžička nám beží hladko.\nNajem sa a poďakujem,\nna tanieri nič nenechám.'],
      ['Hajaj', 'Hajaj, búvaj, maličký,\nzatvor svoje očičky.\nMesiačik ti svieti,\nspia už všetky deti.'],
      ['Časti dňa', 'Ráno vstanem, na obed jem,\nvečer spím a v noci snívam sen.\nRáno, obed, večer, noc,\nkaždý deň je plný hier.'],
    ],
  },
  obec: {
    s: [
      ['Na trenčianskom moste', L],
      ['Tam okolo Levoči', L],
      ['Okolo Súče vodička tečie', L],
      ['Kolo, kolo mlynské', LH],
      ['Moja dedinka', K, 'Moja dedinôčka,\nkostol, škola, park.\nPošta, obchod, úrad,\nmám ju veľmi rád.'],
    ],
    r: [
      ['Moja ulica', 'Na mojej ulici\nstoja domy v rade.\nKaždý domček číslo má,\nmoje číslo dobre znám.'],
      ['Starosta', 'Starosta má veľa práce,\nstará sa o obec, o nás.\nAby bolo čisto, pekne,\naby sa nám dobre žilo.'],
      ['Pošťák', 'Pošťák nesie list a balík,\nklop-klop, ktože tu býva?\nList je tu pre Aničku,\nod babky z Bystričky.'],
      ['Ihrisko', 'Na ihrisku šmykľavka,\nhojdačka a lavička.\nHráme sa tam od rána,\nkým nás mama nezavolá.'],
      ['Zvonček', 'Na kopčeku kostolík,\nzvoní zvonček: bim-bam-bim.\nPočujeme ho až k nám,\nzvoní sem a zvoní tam.'],
    ],
  },
  bezpecne: {
    s: [
      ['Kolesá autobusu', `${D} (slovenský text známej anglickej piesne)`],
      ['Zlatá brána', LH],
      ['Kolo, kolo mlynské', LH],
      ['Semafor', K, 'Červená, stoj, čakaj,\nzelená, už choď.\nVľavo, vpravo pozri,\npotom cez cestu choď.'],
      ['Autíčko', K, 'Autíčko sa rúti,\ntrúbi: tú-tú-tú.\nNa chodníku stojím,\ndržím mamu za ruku.'],
    ],
    r: [
      ['Semafor', 'Červená svieti, stojíme,\nzelená svieti, ideme.\nNa semafor sa pozeráme,\ncez cestu bezpečne prejdeme.'],
      ['Zebra', 'Zebra nie je zvieratko,\nje to prechod pre deti.\nPozri vľavo, pozri vpravo,\nprejdi pokojne a bez behu, bravo!'],
      ['Za ruku', 'Pri ceste ma drží mama,\nnepustím sa, idem s ňou.\nAutá jazdia rýchlo, rýchlo,\nja som opatrný, vieš, prečo.'],
      ['Prilba', 'Na bicykel prilbu dám,\nhlavičku si ochránim sám.\nAj keď spadnem, nič sa nestane,\nprilba hlavu ochráni mne.'],
      ['Reflexná vesta', 'Keď je vonku tma a hmla,\nreflexná vesta svieti, hľa.\nVodič vidí, že tu sme,\nbezpečne domov prídeme.'],
    ],
  },
  vetricek: {
    s: [
      ['Fúkaj, fúkaj, vetríček', K, 'Fúkaj, fúkaj, vetríček,\nroztoč šarkan, lístoček.\nLístky letia do kola,\njeseň volá: hop, hola!'],
      ['Prší, prší', L],
      ['Gúľalo sa, gúľalo', L],
      ['Pod horou, pod horou', L],
      ['Šarkan', K, 'Letí, letí šarkan,\nvetrík fúka zas.\nChvost má z mašličiek,\nmáva na nás.'],
    ],
    r: [
      ['Vetríček', 'Fúka, fúka vetríček,\nzhadzuje nám lístoček.\nLístok žltý, červený\npadá rovno na zem.'],
      ['Šarkan', 'Šarkan letí do neba,\nveselý je, pozri sa.\nŠnúrku drží Janko pevne,\nnech mu šarkan neuletí.'],
      ['Dáždik', 'Kvap, kvap, kvapká dážď,\nvezmi dáždnik, nezmokneš.\nČižmičky si obuj tiež,\ndo mláky si skočiť smieš.'],
      ['Pani Jeseň', 'Pani Jeseň štetec má,\nstromy farbí, hľa, hľa, hľa!\nŽltá, hnedá, červená,\nkrásna je tá jeseň, krásna.'],
      ['Vietor', 'Vietor fúka: fíí, fúú,\nhýbe stromom, konárom.\nKlobúk ujovi zobral,\nniesol ho až za plot sám.'],
    ],
  },
  starki: {
    s: [
      ['Bola babka', L],
      ['Pec nám spadla', L],
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Kohútik jarabý', L],
      ['Babka moja milá', K, 'Babka moja milá,\npečie koláčik.\nDedko so mnou hrá sa,\nmám ich rád, hľa.'],
    ],
    r: [
      ['Babička štrikuje', 'Babička mi štrikuje\nšálik, čiapku, rukavice.\nAby mi nebola zima,\nkeď sa sneh zas vonku sype.'],
      ['Dedko', 'Dedko má fúzy a okuliare,\nrozpráva mi o starých časoch.\nKeď bol malý ako ja,\nhrával sa vraj celý deň.'],
      ['Koláče', 'Babka pečie koláče,\nvonia to až na dvore.\nMakové aj orechové,\nkaždý je tu výborný.'],
      ['Pomáham', 'Dedkovi pomáham rád\nzbierať jablká do záhrad.\nBabke nesiem vajíčka,\npomaličky, opatrne.'],
      ['Ďakujem vám', 'Babka, dedko, mám vás rád,\npoďakujem tisíckrát.\nZa rozprávky, za koláč,\nza objatie, keď mám plač.'],
    ],
  },
  plody: {
    s: [
      ['Gúľalo sa, gúľalo', L],
      ['Kujem, kujem podkovičku', L],
      ['Pôjdeme my do lesíka', L],
      ['Jabĺčko', K, 'Jabĺčko sa smeje,\nvisí na strome.\nOdtrhnem ho, umyjem,\nchrumkne v mojej dlani.'],
      ['Tekvica', K, 'Tekvica je veľká,\noranžová je.\nVydlabeme lampáš,\nvečer svieti nám.'],
    ],
    r: [
      ['Jabĺčko', 'Visí jabĺčko na strome,\nčervené a guľaté.\nKto ho chce, nech sa natiahne,\nrukou hore k nemu siahne.'],
      ['Hruška', 'Hruška žltá, šťavnatá,\nsladká ako med je, hľa.\nKeď ju zjem, som zdravý zas,\nnebude ma bolieť nič.'],
      ['Oriešok', 'Orech, orech, tvrdý je,\nkto ho zlúska, ten ho zje.\nVeverička skúša tiež,\nkoľko ich už nazbierať vieš?'],
      ['Hrozno', 'Hrozno visí v strapci, hľa,\nmodré aj zelené, sladké.\nZberáme ho do košíka,\nbude z neho šťavička.'],
      ['Košík', 'Do košíka dávam sám\njablko, hrušku, slivku, hľa.\nOriešok a hrozienko,\nplný košík, hotovo!'],
    ],
  },
  'jesen-zvierata': {
    s: [
      ['Zjedzte ma vĺčky, zjedzte', L],
      ['Išla sova na tanec', L],
      ['Pôjdeme my do lesíka', L],
      ['Kukulienka, kde si bola', L],
      ['Ježko pichľavý', K, 'Ježko, ježko malý,\nkde sa skrývaš, kde?\nV lístí spíš si sladko,\nna jar prídeš zas.'],
    ],
    r: [
      ['Ježko', 'Ježko ide lesom, dup-dup,\nnesie jabĺčko na chrbte.\nIde domov do pelieška,\nspinká až do jari, chrápe.'],
      ['Veverička', 'Veverička ryšavá\nskáče, skáče, poskakuje.\nOriešky si do dutiny\nschová, aby v zime mala.'],
      ['Medveď', 'Medveď ide do brlohu,\nzíva, zíva, už je čas.\nCelú zimu prespí sladko,\nna jar sa zobudí zas.'],
      ['Lastovička', 'Lastovička letí preč,\nďaleko do teplých krajín.\nNa jar sa k nám vráti zas,\nzaštebotá pod strechou.'],
      ['Jazvec', 'Jazvec v nore sladko spí,\nnosík má pásikavý.\nV zime ho nikde nevidieť,\nna jar vykukne do sveta.'],
    ],
  },
  separko: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Spievanky, spievanky', L],
      ['Separko', K, 'Ježko Separko,\ntriedi odpadky.\nPapier, plasty, sklo,\nzvlášť do nádoby.'],
      ['Čistá zem', K, 'Čistá zem, čistý les,\nsmeti nehádžem.\nDo koša ich vložím,\nzem si ochránim.'],
      ['Smetiarske auto', K, 'Ide autíčko,\nzbiera smetičky.\nOdvezie ich preč,\nčistá ulička.'],
    ],
    r: [
      ['Separko radí', 'Ježko Separko nám radí:\nkaždá vec má svoj kôš rada.\nPapier sem a plasty tam,\ntriediť naučím sa sám.'],
      ['Fľaša', 'Plastová fľaša nepatrí\nna lúku ani do lesa.\nDo žltého koša ju dám,\nnová vec z nej bude, znám.'],
      ['Papier', 'Noviny a krabice\npatria do modrej nádoby.\nZ papiera sa vyrobí\nzošit nový pre deti.'],
      ['Sklo', 'Pohár, fľaša, zaváranina,\nsklo do zelenej nádoby.\nCinká, cinká, kotúľa sa,\nnové sklo z neho bude zas.'],
      ['Čistý les', 'V lese smeti nenechám,\ndomov ich vždy odnášam.\nZvieratká sa potešia,\nčistý les majú všetci.'],
    ],
  },
  telo: {
    s: [
      ['Hlavička, ramená, kolienka, palce', `${D} s pohybom (slovenský text známej anglickej piesne)`],
      ['Češem si hlavičku', L],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Kolo, kolo mlynské', LH],
      ['Ručičky tlieskajú', K, 'Ručičky tlieskajú,\nnožičky dupú.\nHlavička sa kýve,\nja sa smejem.'],
    ],
    r: [
      ['Päť prstov', 'Toto je palec, ten je hrubý,\nukazovák ukazuje.\nProstredník je najdlhší,\nprstenník a malíček najmenší.'],
      ['Tvár', 'Dve očká a jeden nos,\nústa, uši, vlasy, hľa.\nKto je to? To som ja,\nusmievam sa, pozri sa.'],
      ['Nohy', 'Nohy chodia, nohy bežia,\nnohy skáču, nohy stoja.\nVečer sú už unavené,\nnožky si teraz oddýchnu.'],
      ['Srdiečko', 'Polož ruku na hruď,\nčo počuješ? Buch-buch-buch!\nTo je moje srdiečko,\nbúcha rýchlo, maličko.'],
      ['Päť zmyslov', 'Očkami vidím, uškom počujem,\nnosíkom voniam, jazýčkom chutím.\nRúčkami ohmatám svet,\npäť zmyslov mám, viem to hneď.'],
    ],
  },
  bacil: {
    s: [
      ['Pec nám spadla', L],
      ['Spievanky, spievanky', L],
      ['Umývam si rúčky', K, 'Umývam si rúčky,\nmydlo pení sa.\nBacil uteká preč,\nčisté ruky mám.'],
      ['Hapčí', K, 'Hapčí, hapčí, kýcham,\nvreckovku si vezmem.\nZakryjem si ústa,\nbacil nepreskočí.'],
      ['Vitamíny', K, 'Jabĺčko a citrón,\nmrkva, hruška, med.\nKto ich papá, je zdravý,\nbacil ujde hneď.'],
    ],
    r: [
      ['Bacil', 'Bacil malý, neviditeľný,\nskáče z ruky na ruku.\nAle mydlo a voda\npremôžu ho, to je sila!'],
      ['Kýcham', 'Keď kýcham, zakryjem si\nústa lakťom, vreckovkou.\nBacil potom nepreskočí\nna kamaráta pri mne.'],
      ['Čaj', 'Čaj s medom a citrónom\npijem, keď ma bolí hrdlo.\nTeplučký a sladučký,\nzahreje ma celučký.'],
      ['Zdravie', 'Zdravý som, keď spím si dosť,\nkeď sa hýbem, jem ovocie.\nKeď si ruky umývam,\nbacila sa nebojím.'],
      ['V postieľke', 'Keď som chorý, ležím v posteli,\nmamka mi dá teplý čaj.\nOdpočívam, spinkám veľa,\nzajtra budem zdravý zas.'],
    ],
  },
  vnimam: {
    s: [
      ['Čižiček, čižiček', L],
      ['Spievanky, spievanky', L],
      ['Kukulienka, kde si bola', L],
      ['Prší, prší', L],
      ['Počúvaj, čo znie', K, 'Počúvaj, čo znie to,\nvtáčik spieva nám.\nVietor fúka, dážď kvapká,\nuško počuje.'],
    ],
    r: [
      ['Očká', 'Očká moje, dve malé,\nvidia stromy zelené.\nVidia mamku, vidia kvet,\nvidia celý krásny svet.'],
      ['Uško', 'Uško moje počúva,\nkto to tam za dverami spieva?\nTo je vtáčik, to je mama,\nto je pieseň zo škôlky.'],
      ['Nosík', 'Nosík vonia kvietoček,\nnosík vonia koláčik.\nAle keď je niečo zlé,\nnosík povie: fuj, nie, nie!'],
      ['Jazýček', 'Citrón kyslý, med je sladký,\nsoľ je slaná, horký čaj.\nJazýček to všetko vie,\nčo je dobré, čo je zlé.'],
      ['Rúčky', 'Rúčkami si ohmatám\nzajačika mäkkého.\nKamienok je tvrdý, studený,\nrúčky všetko poznajú.'],
    ],
  },
  predmety: {
    s: [
      ['Pec nám spadla', L],
      ['Červený kacheľ, biela pec', L],
      ['Kujem, kujem podkovičku', L],
      ['Kolo, kolo mlynské', LH],
      ['Upracem si hračky', K, 'Upracem si hračky,\nkocky do krabice.\nBábiku do postieľky,\nhotovo je, hľa.'],
    ],
    r: [
      ['Stolička', 'Stolička má štyri nohy,\nale chodiť nevie, chudera.\nStojí v kúte celý deň,\nkým si na ňu nesadnem.'],
      ['Hodiny', 'Tik-tak, tik-tak,\nhodiny idú takto, tak.\nUkazujú, koľko je,\nkedy obed, kedy spať.'],
      ['Lampa', 'Lampa svieti večer v izbe,\nkeď je vonku tma a noc.\nCvak a svieti, cvak a nie,\nvypínač to dobre vie.'],
      ['Hrnček', 'Hrnček, hrnček, hrnček môj,\nmlieka teplého mi nalej.\nNa raňajky vypijem\na hneď silný budem.'],
      ['Kľúčik', 'Kľúčik malý, zlatý,\notvára nám dvere.\nCvak, a dvere sú otvorené,\ncvak, a už sú zatvorené.'],
    ],
  },
  zdravy: {
    s: [
      ['Gúľalo sa, gúľalo', L],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Hlavička, ramená, kolienka, palce', `${D} s pohybom`],
      ['Cvičíme', K, 'Ruky hore, dole,\ndrep a výskok, hop!\nKto cvičí, je zdravý,\nsilný ako dub.'],
      ['Vodička', K, 'Vodička je zdravá,\nnie je sladká, nie.\nKeď mám smäd, napijem sa,\nzdravý budem zas.'],
    ],
    r: [
      ['Zdravý tanier', 'Na tanieri zelenina,\nmäso, ryža, trocha chleba.\nKto má pestrú stravu, vie,\nže je zdravý celý deň.'],
      ['Mrkva', 'Mrkva rastie v záhradke,\noranžová, sladká je.\nZajko si ju chrumká rád,\naj ja ju chcem papať, hľa.'],
      ['Spánok', 'Kto chce byť zdravý, spí,\nnie pri telke, ale v posteli.\nRáno vstane veselý,\nako vtáčik na konári.'],
      ['Pohyb', 'Behám, skáčem, bicyklujem,\nna ihrisku sa vybehám.\nPohyb, to je zdravie,\nto si každý zapamätá.'],
      ['Sladkosti', 'Cukrík raz a nie stokrát,\nzúbky treba chrániť, brat.\nRadšej jabĺčko si dám,\nzdravé zúbky mať chcem sám.'],
    ],
  },
}
