import { D, K, L, LH, type Piesne } from './types'

export const LETO: Record<string, Piesne> = {
  les: {
    s: [
      ['Pôjdeme my do lesíka', L],
      ['Do hory, do lesa, valasi', L],
      ['Zahučali hory', L],
      ['Kukulienka, kde si bola', L],
      ['Hore háj, dolu háj', L],
    ],
    r: [
      ['Les', 'Ide, ide, kto to ide?\nLesom ide medvedík.\nNesie med a maliny,\npre svoje mláďatá.'],
      ['Hríbik', 'Hríbik stojí pod jedličkou,\nčiapku má hnedú, veľkú.\nKto ho nájde, zoberie,\nmamka z neho uvarí.'],
      ['Ticho v lese', 'V lese buď ticho, nekrič,\nzvieratká sa boja.\nPočúvaj, čo spieva drozd,\nako ďateľ ťuká, hľa.'],
      ['Strom', 'Strom má korene pod zemou,\nkmeň a konáre hore.\nLístky šumia: šu-šu-šu,\nv lese je mi dobre tu.'],
      ['Mravenisko', 'Mravce nosia ihličie,\nstavajú si domček.\nVšetci spolu pracujú,\nnikto sa tam nenudí.'],
    ],
  },
  kvapka: {
    s: [
      ['Prší, prší', L],
      ['Okolo Súče vodička tečie', L],
      ['Ej, padá, padá rosička', L],
      ['Kvapôčka', K, 'Kvapka, kvapka malá,\nskáče do mláky.\nŠplech a šplech a šplech,\nvoda je všade.'],
      ['Potôčik', K, 'Potôčik nám tečie,\nšumí cez kamene.\nRybky v ňom plávajú,\nvoda žblnkoce.'],
    ],
    r: [
      ['Kvapka', 'Kvapka padla z oblaku,\ndopadla mi na nos.\nKvap, kvap, kvapká dážď,\nvezmi dáždnik, ak ho máš.'],
      ['Kolobeh vody', 'Slnko vodu zohreje,\npara letí k oblakom.\nZ oblaku zas dážď padá,\nvoda ide dokola.'],
      ['Šetríme vodu', 'Kohútik vždy zatvorím,\nvodu zbytočne nepustím.\nVoda je vzácna pre všetkých,\npre ľudí aj pre zvieratká.'],
      ['Mláka', 'Mláka, mláka, veľká mláka,\nskočím do nej, čľap, čľap, čľap!\nČižmičky mám gumené,\nnohy mám suché, hľa!'],
      ['Dúha', 'Po daždi sa slnko smeje,\nna nebi je dúha.\nSedem farieb, pozri sa,\nkrásna je ako stuha.'],
    ],
  },
  vesmir: {
    s: [
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Kolo, kolo mlynské', LH],
      ['Raketa', K, 'Raketa už letí,\nhore do hviezd.\nTri, dva, jedna, štart,\nletíme k Mesiacu.'],
      ['Hviezdičky', K, 'Hviezdičky na nebi,\nsvietia nám v noci.\nMesiačik sa usmieva,\nspinkajte, deti.'],
      ['Planéty', K, 'Slnko je v strede,\nZem sa točí okolo.\nMesiac obieha Zem,\nkaždý deň a noc.'],
    ],
    r: [
      ['Raketa', 'Tri, dva, jedna, štart!\nRaketa letí do neba.\nKozmonaut mává z okienka,\nZem je dole maličká.'],
      ['Mesiac', 'Mesiac raz je guľatý,\nraz je ako rožok.\nSvieti v noci na oblohe,\nstráži sny všetkých detí.'],
      ['Naša Zem', 'Naša Zem je guľatá,\nmodrá, zelená a krásna.\nToči sa okolo Slnka,\nnaša Zem, náš domov.'],
      ['Slnko', 'Slnko je veľká hviezda,\nhreje nás a svieti nám.\nBez slnka by bola tma,\nzima, smútok, nič by nerástlo.'],
      ['Hviezdy', 'Jedna hviezda, dve hviezdy,\ntri hviezdy na nebi.\nKoľko ich je, kto to vie?\nNespočítaš ich ani ty.'],
    ],
  },
  semienko: {
    s: [
      ['Prší, prší', L],
      ['V pitvore oral', L],
      ['Ej, padá, padá rosička', L],
      ['Semienko', K, 'Semienko do zeme,\npolejem ho vodou.\nSlniečko ho zohreje,\nvyrastie kvietok.'],
      ['Kvietok rastie', K, 'Najprv malý klíčok,\npotom lístok, dva.\nRastie, rastie vyššie,\nkvietok kvitne, hľa.'],
    ],
    r: [
      ['Semienko', 'Semienko som do zeme dal,\npolieval a čakal.\nVykukol z neho zelený klíček,\nrástol, rástol každý deň.'],
      ['Čo potrebuje rastlinka', 'Rastlinka chce vodu, slnko,\nzem a trochu tepla.\nKeď to všetko dostane,\nrastie veľká, zelená.'],
      ['Fazuľka', 'Fazuľka sa vinie hore,\npo paličke, po plote.\nRastie, rastie do neba,\nako v tej rozprávke, hľa.'],
      ['Polievam', 'Krhličkou kvietky polievam,\npomaly, aby nespadli.\nKvietky sa mi zasmejú,\nvoňavý kvet mi dajú.'],
      ['Záhradka', 'V záhradke mám mrkvičku,\nhrášok aj cibuľku.\nPlejem, kopem, polievam,\nzeleninku zbieram sám.'],
    ],
  },
  dejiny: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Na trenčianskom moste', L],
      ['Dinosaurus', K, 'Dinosaurus veľký,\nkráča: dup-dup-dup.\nKedysi tu žil,\ndávno, preveľmi.'],
      ['Hrad', K, 'Na kopci stojí hrad,\nveže, múry, brána.\nRytier stráži hrad,\nkráľ v ňom býva rád.'],
    ],
    r: [
      ['Dinosaurus', 'Dinosaurus dávno žil,\nveľký ako dom bol.\nDnes len kosti zostali,\nv múzeu si ich pozrieme.'],
      ['Mamut', 'Mamut mal kožuch chlpatý,\nkly mal dlhé, zahnuté.\nŽil, keď bola veľká zima,\ndnes ho nikde nenájdeš.'],
      ['Pračlovek', 'Pračlovek v jaskyni býval,\noheň kresal z kameňa.\nMaľoval na steny zvieratá,\nto bola jeho kniha.'],
      ['Rytier', 'Rytier má meč a štít,\nbrnenie a koňa.\nChráni hrad aj ľudí,\nje statočný a dobrý.'],
      ['Kedysi a dnes', 'Kedysi sme svietili sviečkou,\ndnes svieti žiarovka.\nKedysi sa chodilo pešo,\ndnes nás vezie auto, vlak.'],
    ],
  },
  'farby-sveta': {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Dúha', K, 'Červená, žltá,\nzelená, modrá.\nDúha nad lúkou,\npozri, aká je.'],
      ['Farebný svet', K, 'Nebo je modré,\ntráva zelená.\nSlnko žlté svieti,\nsvet je farebný.'],
    ],
    r: [
      ['Dúha', 'Dúha, dúha, farebná,\nkde sa vzala, povedz nám?\nPo daždi sa slnko smeje,\ndúha z neba sa nám vznáša.'],
      ['Červená', 'Červená je jahoda,\nčervený je mak.\nČervené je jabĺčko\naj ten malý rak.'],
      ['Zelená', 'Zelená je tráva,\nzelený je strom.\nZelená je žabka,\nčo skáče pod plotom.'],
      ['Modrá', 'Modré je nebo,\nmodré je more.\nModrá je čučoriedka,\nčo rastie v hore.'],
      ['Žltá', 'Žlté je slniečko,\nžltý je kuriatko.\nŽltá je aj púpava,\nžltý citrónik.'],
    ],
  },
  rodina: {
    s: [
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Bola babka', L],
      ['Spievanky, spievanky', L],
      ['Mamička moja', K, 'Mamička moja,\nmám ťa rada, hľa.\nKvietok ti nesiem,\ndávam pusu ti.'],
      ['Moja rodina', K, 'Mamka, ocko, ja,\nsestra, braček náš.\nVšetci spolu sme,\nmáme sa radi.'],
    ],
    r: [
      ['Mamičke', 'Mamička, mamička moja,\nkvietok ti nesiem z poľa.\nZa všetko ti ďakujem,\nveľmi rada ťa mám, viem.'],
      ['Moja rodina', 'Mamka, ocko, sestra, brat,\nbabka, dedko, všetci sme tu.\nKeď sme spolu, je nám dobre,\nrodina je poklad môj.'],
      ['Ocko', 'Ocko ma vyhodí vysoko,\nchytí ma a smejeme sa.\nOcko je silný ako medveď,\nale nežný ako zajko.'],
      ['Pomáham', 'Mamke pomôžem utierať,\nockovi zas zametať.\nKeď pomáham, som veľký,\nveľmi rada pomáham.'],
      ['Objatie', 'Objímem ťa, mamička,\nako malá veverička.\nObjímem ťa, ocko môj,\nnajlepší si, si len môj.'],
    ],
  },
  luka: {
    s: [
      ['Žalo dievča, žalo trávu', L],
      ['Pásla ovečky v zelenom hájičku', L],
      ['Čižiček, čižiček', L],
      ['Lienka', K, 'Lienka, lienka malá,\nbodky čierne máš.\nLetíš ku slniečku,\nzaleť aj k nám.'],
      ['Včielka', K, 'Bzučí, bzučí včielka,\nletí na kvietok.\nNazbiera si peľ,\nbude z neho med.'],
    ],
    r: [
      ['Lienka', 'Lienka, lienka, kam letíš?\nNa kvietok, či na lístok?\nKoľko bodiek na chrbte máš?\nSpočítam ich, keď tu sedíš.'],
      ['Motýlik', 'Motýlik letí z kvetu na kvet,\nkrídla má farebné.\nSadne si na margarétku,\nodpočíva chvíľku, hľa.'],
      ['Lúka', 'Na lúke kvitnú kvietky,\nmak, rumanček, zvonček.\nVčielky bzučia, motýle lietajú,\nlúka je ako farebný koberček.'],
      ['Kobylka', 'Kobylka skáče v tráve,\nhop sem a hop tam.\nKto ju chytí, ten je rýchly,\nja to skúsim sám.'],
      ['Mravček', 'Mravček malý, usilovný,\nnesie steblo trávy.\nJe malý, ale silný,\nnesie viac ako on sám váži.'],
    ],
  },
  exoticke: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['V ZOO', K, 'Lev reve: vrr-vrr,\nopica skáče.\nSlon má chobot,\nžirafa krk.'],
      ['Slon', K, 'Slon je veľký, šedý,\nchobot dlhý má.\nVodu si nim leje,\nsprchuje sa, hľa.'],
      ['Opička', K, 'Opička sa hojdá\nna lianách hore.\nBanán zje a smeje sa,\nveselá je.'],
    ],
    r: [
      ['Lev', 'Lev je kráľom zvierat,\nhrivu má ako slnko.\nKeď zareve: vrrr, vrrr,\nvšetky zvieratká počúvajú.'],
      ['Žirafa', 'Žirafa má dlhý krk,\nlístky žerie z vysoka.\nKeby som bol taký vysoký,\nvidel by som do diaľky.'],
      ['Zebra', 'Zebra má pásiky,\nčierne a biele.\nAko prechod na ceste,\nlen na koníkovi, hľa.'],
      ['Krokodíl', 'Krokodíl leží pri rieke,\nzuby má veľké, ostré.\nTvári sa, že spí,\nale pozor, nespí!'],
      ['Ťava', 'Ťava kráča púšťou,\nhrb má na chrbte.\nVodu dlho nepije,\nnesie ľudí v teple.'],
    ],
  },
  bylinky: {
    s: [
      ['Žalo dievča, žalo trávu', L],
      ['Ej, padá, padá rosička', L],
      ['Pásla ovečky v zelenom hájičku', L],
      ['Rumanček', K, 'Rumanček voňavý,\nbiely, žltý kvet.\nČaj z neho uvarím,\nbruško nebolí.'],
      ['Babkine bylinky', K, 'Babka bylinky zbiera,\nmätu, lipu, šalviu.\nSuší ich na povale,\nvonia celý dom.'],
    ],
    r: [
      ['Mäta', 'Mäta vonia sviežo, zeleno,\nčaj z nej je dobrý v lete.\nKeď ju pošúcham v dlani,\nvonia celá izba, hľa.'],
      ['Lipa', 'Lipa kvitne v júni,\nvčielky okolo nej bzučia.\nKvietky zbierame do čaju,\nv zime nám pomôžu.'],
      ['Rumanček', 'Rumanček má biele lupienky\na žltý stredík ako slnko.\nČaj z neho pijem, keď ma bolí\nbruško alebo hrdielko.'],
      ['Bylinková záhradka', 'V babkinej záhradke rastie\npetržlen, pažítka, bazalka.\nVonia to tam ako v lekárni,\nbabka všetky bylinky pozná.'],
      ['Čaj', 'Čajík, čajík z byliniek,\nteplý, sladký s medíkom.\nKeď ho pijem, je mi lepšie,\nbabka vie, čo pomôže.'],
    ],
  },
  'deti-sveta': {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Spievanky, spievanky', L],
      ['Leto, leto, slniečko', K, 'Leto, leto, slniečko,\nkúpeme sa v potôčku.\nPiesok, lopta, zmrzlina,\nveselá je družina.'],
      ['Deti sveta', K, 'Deti celého sveta,\ndržme sa za ruky.\nKaždé je iné,\nale kamaráti sme.'],
    ],
    r: [
      ['Deti sveta', 'Jedno dieťa má pleť bielu,\ndruhé hnedú, tretie žltú.\nKaždé hovorí inak,\nale všetci sa hráme radi.'],
      ['Ahoj vo svete', 'Ahoj, hello, hola,\nbonjour, ciao, privet.\nAhoj povieme po svete,\nkamarát je všade.'],
      ['MDD', 'Prvého júna je náš deň,\nsviatok všetkých detí.\nHráme sa, smejeme sa,\nsvet je pre nás krásny.'],
      ['Za ruky', 'Chytíme sa za ruky,\nveľký kruh spravíme.\nCelý svet je naša trieda,\nspolu sa hráme.'],
      ['Kamarát z ďaleka', 'Mám kamaráta z ďaleka,\nhovorí inou rečou.\nAle smiech je rovnaký,\nrozumieme si aj bez slov.'],
    ],
  },
  vlast: {
    s: [
      ['Tam okolo Levoči', L],
      ['Na trenčianskom moste', L],
      ['Zahučali hory', L],
      ['Limbora, limbora', L],
      ['Zaleť sokol, biely vták', L],
    ],
    r: [
      ['Slovensko', 'Slovensko je naša vlasť,\nhory, rieky, lúky.\nTatry vysoko k nebu,\nDunaj tečie do diaľky.'],
      ['Vlajka', 'Naša vlajka má tri farby:\nbiela, modrá, červená.\nA na nej je náš znak,\ndvojkríž na troch vŕškoch, tak.'],
      ['Tatry', 'Tatry vysoké, kamenné,\nkamzík skáče po skalách.\nNa vrchole sneh aj v lete,\nkrajšie hory nie sú na svete.'],
      ['Hrady', 'Na Slovensku hradov veľa,\nna kopcoch sa týčia.\nKedysi tam rytieri žili,\ndnes sa na ne pozeráme.'],
      ['Moja reč', 'Hovorím po slovensky,\nmamka, ocko tiež.\nSlovenčina je naša reč,\nkrásna, mäkká, spevavá.'],
    ],
  },
  'letne-sporty': {
    s: [
      ['Leto, leto, slniečko', K, 'Leto, leto, slniečko,\nkúpeme sa v potôčku.\nPiesok, lopta, zmrzlina,\nveselá je družina.'],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Hlavička, ramená, kolienka, palce', `${D} s pohybom`],
      ['Bicykel', K, 'Na bicykli idem,\nšliapem, šliapem, hľa.\nZvonček robí cin-cin,\nprilbu mám aj ja.'],
      ['Futbal', K, 'Lopta letí, gól,\nhráme futbal, hej!\nBránkar chytá loptu,\nhráme spolu, juchej!'],
    ],
    r: [
      ['Lopta', 'Lopta skáče, lopta letí,\nchytia ju všetky deti.\nKopnem, hodím, chytím,\nloptu mám rád, vieš, prečo.'],
      ['Plávanie', 'Plávam, plávam ako rybka,\nrukami robím kolečká.\nNohami kopem, šplechot je,\nplávanie ma baví veľmi.'],
      ['Beh', 'Na štart, pozor, teraz!\nBežíme do cieľa.\nKto je prvý, kto je druhý,\nvšetci sme víťazi, hľa.'],
      ['Bicykel', 'Bicykel má dve kolesá,\nriadidlá a zvonček.\nŠliapem, šliapem do pedálov,\nidem rýchlo ako vietor.'],
      ['Skákanie cez švihadlo', 'Švihadlo sa točí, hop,\npreskočím ho, hop a hop.\nRaz, dva, tri, štyri, päť,\nskáčem, kým neprestanem.'],
    ],
  },
  lucime: {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Leto, leto, slniečko', K, 'Leto, leto, slniečko,\nkúpeme sa v potôčku.\nPiesok, lopta, zmrzlina,\nveselá je družina.'],
      ['Dovidenia, škôlka', K, 'Dovidenia, škôlka,\nidem do školy.\nNa vás, kamaráti,\nnikdy nezabudnem.'],
    ],
    r: [
      ['Lúčime sa', 'Škôlka moja, zbohom, zbohom,\nidem do školy už sám.\nNa pani učiteľky, kamarátov\nspomínať vždy budem rád.'],
      ['Školák', 'Aktovku mám novú,\nperačník a zošity.\nBudem čítať, písať, rátať,\nbudem veľký školák, vieš.'],
      ['Ďakujeme', 'Ďakujeme, pani učiteľky,\nza hry, piesne, rozprávky.\nNaučili ste nás veľa,\nnikdy na vás nezabudneme.'],
      ['Kamaráti', 'Kamaráti zo škôlky,\nostaneme kamaráti.\nAj keď pôjdeme do školy,\nspolu sa zas zahráme.'],
      ['Spomienky', 'Spomeniem si na škôlku,\nna pieskovisko, na šmykľavku.\nNa obedy, na spánok,\nna všetko, čo bolo krásne.'],
    ],
  },
  leto: {
    s: [
      ['Leto, leto, slniečko', K, 'Leto, leto, slniečko,\nkúpeme sa v potôčku.\nPiesok, lopta, zmrzlina,\nveselá je družina.'],
      ['Prší, prší', L],
      ['Tancuj, tancuj, vykrúcaj', L],
      ['Leto', K, 'Leto, leto, hurá,\nslniečko svieti.\nKúpeme sa v jazere,\nveselo je nám.'],
      ['Zmrzlina', K, 'Zmrzlinka je studená,\njahodová, hľa.\nLíže, líže Janko,\nlíže aj Anka.'],
    ],
    r: [
      ['Leto', 'Leto, leto, slniečko,\nhreje ako pečka.\nKúpeme sa v jazere,\nčľapká voda, je nám dobre.'],
      ['Prázdniny', 'Prázdniny sú tu, hurá,\nideme k moru, do hôr.\nCelé leto oddychujeme,\nveľa zážitkov zažijeme.'],
      ['Klobúčik', 'Na hlavu si klobúk dám,\nnech ma slnko nepáli.\nKrém si dám aj na nos,\nnech sa nespálim, to vieš.'],
      ['Pri vode', 'Pri vode sa hráme,\nhrady z piesku staviame.\nMušličky zbierame,\nveselo sa máme.'],
      ['Jahody', 'Jahôdky sú červené,\nsladké, šťavnaté.\nZbieram ich do hrnčeka,\npolovicu zjem hneď.'],
    ],
  },
}
