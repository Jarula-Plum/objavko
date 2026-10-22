import { D, K, L, LH, type Piesne } from './types'

export const CELOROCNE: Record<string, Piesne> = {
  obchod: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Spievanky, spievanky', L],
      ['Tam okolo Levoči', L],
      ['Ideme nakupovať', K, 'Ideme do obchodu,\nkošík v ruke mám.\nChlieb a mlieko, jablká,\nzaplatím aj sám.'],
      ['Peniažky', K, 'Peniažky sa zarábajú\nprácou, každý deň.\nŠetrím si ich v kasičke,\nkúpim si, čo chcem.'],
    ],
    r: [
      ['Nákup', 'Do obchodu ideme,\nzoznam v ruke nesieme.\nChlieb, maslo, mlieko,\nnič nezabudneme, hľa.'],
      ['Kasička', 'Do kasičky mincu dám,\nšetrím, šetrím, sám.\nKeď jej bude dosť,\nkúpim si, čo chcem, hosť.'],
      ['Predavačka', 'Predavačka sa usmeje,\nkoľko to stojí, povie mi.\nZaplatím a poďakujem,\ndovidenia, ideme.'],
      ['Mince', 'Jedno euro, dve eurá,\nmince cinkajú v peňaženke.\nSpočítam ich, raz, dva, tri,\nna zmrzlinu stačí mi.'],
      ['Potrebujem, či chcem?', 'Potrebujem chlieb a mlieko,\nchcem aj cukrík, autíčko.\nNajprv kúpim, čo treba,\nna to ostatné počkám, hľa.'],
    ],
  },
  ai: {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Robot', K, 'Robot robí: píp-píp,\nkráča: krok a krok.\nPočúva, čo poviem,\npomáha nám rád.'],
      ['Človek a robot', K, 'Robot nevie plakať,\nnevie sa smiať.\nJa mám srdiečko,\nviem mať niekoho rád.'],
      ['Tablet', K, 'Tablet chvíľku, potom\nbežím von sa hrať.\nKamarát je lepší\nnež obrazovka.'],
    ],
    r: [
      ['Robotík', 'Robotík je z plechu,\nkráča: krok a krok.\nPočúva, čo mu povieš,\nale srdce nemá, vieš.'],
      ['Ja a robot', 'Robot počíta rýchlo,\nale nevie sa smiať.\nJa sa smejem, objímam,\nmám kamarátov rád.'],
      ['Pomocník', 'Umelá inteligencia\nodpovedá na otázky.\nAle čo je pravda, čo nie,\nopýtam sa mamky radšej.'],
      ['Obrazovka', 'Chvíľku tablet, chvíľku hra,\npotom von, kde je tráva.\nOči treba šetriť tiež,\nto už dobre vieš.'],
      ['Kto má srdce?', 'Robot nemá srdce, city,\nnevie byť smutný ani veselý.\nTo vieš len ty a ja,\nmy sme ľudia, hľa!'],
    ],
  },
  srdiecko: {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Keď som veselý', K, 'Keď som veselý,\ntlieskam: tlesk-tlesk-tlesk.\nKeď som nahnevaný,\ndupnem: dup-dup-dup.'],
      ['Srdiečko', K, 'Srdiečko mi búcha,\nkeď mám niekoho rád.\nObjímem ťa pevne,\nsi môj kamarát.'],
    ],
    r: [
      ['Pocity', 'Raz som veselý, raz smutný,\nraz sa hnevám, raz sa bojím.\nVšetky pocity sú v poriadku,\npoviem ich nahlas, keď ich mám.'],
      ['Keď sa hnevám', 'Keď sa hnevám, nadýchnem sa,\npomaly vydýchnem, raz a dva.\nPoviem, čo ma trápi,\nhneď mi je o kúsok lepšie.'],
      ['Smutný kamarát', 'Kamarát je smutný, plače,\npodám mu ruku, pohladím ho.\nSpýtam sa ho, čo sa stalo,\nspolu to zvládneme hravo.'],
      ['Prepáč', 'Keď niekomu ublížim,\npoviem prepáč, nehanbím sa.\nPodáme si ruky zas,\nkamaráti sme ako včas.'],
      ['Objatie', 'Objatie hreje ako slnko,\nzaženie smútok aj strach.\nKeď je niekto smutný,\nobjímem ho, a je to tak.'],
    ],
  },
  doprava: {
    s: [
      ['Kolesá autobusu', `${D} (slovenský text známej anglickej piesne)`],
      ['Na trenčianskom moste', L],
      ['Zlatá brána', LH],
      ['Vláčik', K, 'Vláčik ide: šu-šu,\nvagóny má tri.\nKto chce ísť s nami,\nnech si sadne, hľa.'],
      ['Lietadlo', K, 'Lietadlo letí\nvysoko nad nami.\nMávame mu: ahoj,\nšťastnú cestu, hej!'],
    ],
    r: [
      ['Vláčik', 'Šu-šu-šu, vláčik ide,\npíska: tú-tú-tú!\nVagóniky za ním idú,\nvezie deti na výlet.'],
      ['Autobus', 'Autobus je veľký, dlhý,\nvezie veľa ľudí naraz.\nNa zastávke zastaví,\nnastúpime, sadneme si.'],
      ['Lietadlo', 'Lietadlo letí nad mestom,\nkrídla má veľké, biele.\nLetí ďaleko, za more,\nkam ty chceš, tam letí s tebou.'],
      ['Loď', 'Loď sa plaví po mori,\nkapitán ju riadi.\nVlny sa hojdajú,\nloď ide ďalej, ďalej.'],
      ['Sanitka', 'Sanitka ide: tatú-tatú,\nuhni sa jej z cesty, prosím.\nVezie chorého do nemocnice,\nlekár mu pomôže hneď.'],
    ],
  },
  oblecenie: {
    s: [
      ['Češem si hlavičku', L],
      ['Bude zima, bude mráz', L],
      ['Hlavička, ramená, kolienka, palce', `${D} s pohybom`],
      ['Obliekam sa sám', K, 'Najprv tričko, nohavice,\npotom ponožky.\nBundu, čiapku, topánky,\nobliekam sa sám.'],
      ['Gombíky', K, 'Gombík malý, guľatý,\ndo dierky ho dám.\nZapnem si ho pekne,\nviem to už aj sám.'],
    ],
    r: [
      ['Obliekanie', 'Tričko, nohavice, ponožky,\nsveter a potom bunda.\nČiapka, šál a rukavice,\nidem von a nie je zima.'],
      ['Topánky', 'Ľavá, pravá, topánky,\nobujem si ich sám.\nŠnúrky zaviažem na mašľu,\nhotovo, už to mám.'],
      ['Leto a zima', 'V lete tričko a šortky,\nv zime čiapka, bunda, šál.\nPodľa počasia sa oblečiem,\nnech mi nie je zima ani teplo.'],
      ['Dáždnik', 'Prší, prší, pršiplášť si dám,\ngumáky a dáždnik mám.\nNezmoknem, nebojím sa,\ndo mláky si skočiť smiem.'],
      ['Skriňa', 'V skrini mám veci poskladané,\ntričká sem a nohavice tam.\nKeď si ich odložím sám,\nráno ich hneď nájdem.'],
    ],
  },
  cistotka: {
    s: [
      ['Češem si hlavičku', L],
      ['Pec nám spadla', L],
      ['Umývam si rúčky', K, 'Umývam si rúčky,\nmydlo pení sa.\nOplachujem vodou,\nčisté ruky mám.'],
      ['Zúbky', K, 'Kefkou zúbky čistím,\nhore, dole, hľa.\nRáno, večer, každý deň,\nbiele zúbky mám.'],
      ['Kúpanie', K, 'Vo vani sa kúpem,\nšplech a šplech.\nKačička pláva so mnou,\nčistý som ako sneh.'],
    ],
    r: [
      ['Mydlo', 'Mydielko sa pení, pení,\nrúčky budú čisté hneď.\nOpláchnem ich vodou,\nutriem do uteráka, hľa.'],
      ['Zúbky', 'Ráno, večer zúbky čistím,\nkefkou krúžim dookola.\nKto si zúbky nečistí,\ntoho zúbok zabolí.'],
      ['Vreckovka', 'Keď mi tečie z nosa,\nvreckovku si vezmem.\nVysmrkám sa, zahodím ju,\nruky si umyjem.'],
      ['Hrebeň', 'Hrebeň češe moje vlásky,\nhore, dole, pomaličky.\nUčesaná, pekná som,\nusmejem sa do zrkadla.'],
      ['Kedy umývam ruky', 'Pred jedlom a po záchode,\npo hre vonku, po zvieratkách.\nVtedy si ruky umývam,\nbacila sa nebojím.'],
    ],
  },
  jedlo: {
    s: [
      ['Pec nám spadla', L],
      ['Bola babka', L],
      ['Gúľalo sa, gúľalo', L],
      ['Dobrú chuť', K, 'Polievočka vonia,\nlyžičku si vezmem.\nDobrú chuť, deti,\nnajedzte sa všetci.'],
      ['Mliečko', K, 'Kravička dá mliečko,\nz neho syr a maslo.\nJogurt, tvaroh, smotana,\nzdravé je to, hľa.'],
    ],
    r: [
      ['Dobrú chuť', 'Polievočka teplučká,\nchlebík a lyžička.\nDobrú chuť vám, deti,\nnajedzte sa všetci.'],
      ['Mliečko', 'Kravička nám dáva mlieko,\nz mlieka syr a maslo je.\nJogurt, tvaroh, smotana,\nkosti budú silné, hľa.'],
      ['Chlebík', 'Z obilia je múka,\nz múky pekár chlieb upečie.\nChlebík máme každý deň,\nnikdy ho nevyhadzujem.'],
      ['Voda', 'Keď mám smäd, pijem vodu,\nnajzdravší je nápoj, hľa.\nNie sladkú limonádu,\nvodičku si dám.'],
      ['Pri stole', 'Pri stole sedím rovno,\nlyžicu držím správne.\nNehovorím s plnými ústami,\npoďakujem za jedlo.'],
    ],
  },
  domov: {
    s: [
      ['Pec nám spadla', L],
      ['Červený kacheľ, biela pec', L],
      ['Spinkaj, moja malá', 'uspávanka'],
      ['Môj domov', K, 'Môj domov, môj dom,\nmamka, ocko v ňom.\nIzba, kuchyňa,\nje mi v ňom dobre.'],
      ['Upratujem', K, 'Utieram prach, hľa,\nzametám aj ja.\nPomáham mamičke,\nčistý dom máme.'],
    ],
    r: [
      ['Môj domov', 'Môj domov je môj hrad,\nmám ho veľmi rád.\nMamka, ocko, ja,\nsme tu spolu, hľa.'],
      ['Izby', 'V kuchyni varíme, v obývačke sedíme,\nv spálni spíme, v kúpeľni sa umývame.\nKaždá izba má svoj účel,\nnáš domov je veľký celok.'],
      ['Adresa', 'Viem, kde bývam, viem to sám:\nulicu aj číslo znám.\nKeby som sa stratil, poviem,\nkde môj domček stojí, viem.'],
      ['Pomocník', 'Doma pomáham rád,\nprestriem stôl a utriem prach.\nKvety polejem, hračky odložím,\nmamke radosť urobím.'],
      ['Večer doma', 'Večer doma svieti lampa,\nmamka číta rozprávku.\nOcko príde, dá mi pusu,\nzaspávam v teplej posteli.'],
    ],
  },
  potreby: {
    s: [
      ['Spievanky, spievanky', L],
      ['Kolo, kolo mlynské', LH],
      ['Pastelky', K, 'Pastelky farebné,\nmaľujem slniečko.\nModré nebo, trávu,\nkvietky na lúke.'],
      ['Nožničky', K, 'Nožničky: strih-strih,\nstriham papierik.\nPozor, aby som\nnestrihol sa, nie!'],
      ['Lepidlo', K, 'Lepidlo lepí,\npapier na papier.\nPritlačím ho prstom,\ndrží, pozri sa.'],
    ],
    r: [
      ['Pastelky', 'Pastelky mám farebné,\nčervenú, žltú, zelenú.\nNakreslím si slniečko,\ndomček, stromček, mamičku.'],
      ['Nožničky', 'Nožničky strihajú: strih-strih,\nstrihám po čiare rovno.\nOpatrne, pomaly,\nnožničky nie sú hračka.'],
      ['Lepidlo', 'Lepidielko lepí, lepí,\npapier k papieru prilepí.\nPritlačím a podržím,\nobrázok je hotový.'],
      ['Ceruzka', 'Ceruzku držím troma prstami,\nako zobáčik vtáčika.\nKreslím čiaru, kreslím vlnku,\nruka už vie, čo má robiť.'],
      ['Upraceme', 'Po kreslení upraceme,\npastelky do krabičky.\nNožničky na miesto dáme,\nstôl je čistý, hotovo.'],
    ],
  },
  more: {
    s: [
      ['Kačička divoká', L],
      ['Okolo Súče vodička tečie', L],
      ['Leto, leto, slniečko', K, 'Leto, leto, slniečko,\nkúpeme sa v potôčku.\nPiesok, lopta, zmrzlina,\nveselá je družina.'],
      ['Rybička', K, 'Rybička pláva,\nšupinky sa lesknú.\nV mori je jej dobre,\npláva s kamarátmi.'],
      ['Delfín', K, 'Delfín skáče z vody,\nusmieva sa, hľa.\nPláva s nami v mori,\nveselý je, hľa.'],
    ],
    r: [
      ['More', 'More je veľké, modré, slané,\nvlny šumia: šuch-šuch-šuch.\nPod hladinou ryby plávajú,\nna pláži hrajú sa deti.'],
      ['Chobotnica', 'Chobotnica osem rúk má,\nmáva nimi sem a tam.\nKeď sa bojí, atrament pustí,\nschová sa a niet jej viac.'],
      ['Krab', 'Krab ide bokom, bokom,\nklepetami cvak-cvak-cvak.\nSchová sa pod kameň,\nkeď ho niekto vyruší.'],
      ['Veľryba', 'Veľryba je obrovská,\nväčšia ako autobus.\nVodu fúka hore do neba,\nako fontána, hľa!'],
      ['Mušličky', 'Mušličky na pláži zbieram,\nbiele, ružové, aj s pruhmi.\nPriložím jednu k uchu,\npočujem v nej šumieť more.'],
    ],
  },
  dielna: {
    s: [
      ['Kujem, kujem podkovičku', L],
      ['V pitvore oral', L],
      ['Žalo dievča, žalo trávu', L],
      ['Kladivko', K, 'Kladivko: ťuk-ťuk,\nklinček do dreva.\nStolík robím sám,\nocko pomáha.'],
      ['Záhradka', K, 'Rýľom kopem zem,\nsemienko zasadím.\nPolejem ho krhlou,\nvyrastie mi kvet.'],
    ],
    r: [
      ['Kladivko', 'Kladivko ťuká: ťuk-ťuk-ťuk,\nklinček ide do dreva.\nPílka píli: vŕz-vŕz-vŕz,\nhotová je polica.'],
      ['Náradie', 'Skrutkovač, kliešte, metrový pás,\nkladivo a pílka.\nNáradie má svoje miesto,\npo práci ho uložím.'],
      ['Záhradník', 'Záhradník má rýľ a hrable,\nkrhlu a fúrik veľký.\nStará sa o kvety, stromy,\nzáhrada je krásna, hľa.'],
      ['Fúrik', 'Fúrik vozí zem a lístie,\njedno koleso má len.\nTlačím ho pred sebou,\ndrží ho pevne moja ruka.'],
      ['Bezpečne', 'Keď pracujem s náradím,\ndávam pozor, nebežím.\nOchranné okuliare mám,\nopatrne pracujem sám.'],
    ],
  },
  ovocie: {
    s: [
      ['Gúľalo sa, gúľalo', L],
      ['Pôjdeme my do lesíka', L],
      ['Kujem, kujem podkovičku', L],
      ['Jabĺčko', K, 'Jabĺčko je červené,\nhruška žltá je.\nSlivka modrá, sladká,\nzjem ich všetky, hľa.'],
      ['Banán', K, 'Banán je žltý,\nzahnutý ako mesiac.\nOšúpem ho, zjem,\nmám veľkú silu, hľa.'],
    ],
    r: [
      ['Jabĺčko', 'Jabĺčko na strome visí,\nčervené a sladké.\nOdtrhnem ho, umyjem,\nchrum-chrum, celé zjem.'],
      ['Banán', 'Banán prišiel z ďaleka,\ncez more loďou k nám.\nŽltý, sladký, mäkučký,\nopičky ho majú rady.'],
      ['Jahôdka', 'Jahôdka sa červená\npod zeleným lístkom.\nKto ju nájde prvý, zje ju,\nsladká je ako cukrík.'],
      ['Pomaranč', 'Pomaranč je guľatý,\noranžový, šťavnatý.\nOšúpem ho, rozdelím,\nkamarátovi dám kúsok.'],
      ['Ovocný šalát', 'Jablko, hruška, banán, kiwi,\npokrájame na kúsky.\nZmiešame to do misky,\novocný šalát je hotový.'],
    ],
  },
  zelenina: {
    s: [
      ['Bola babka', L],
      ['V pitvore oral', L],
      ['Gúľalo sa, gúľalo', L],
      ['Mrkvička', K, 'Mrkvička rastie\nv zemi pod listom.\nVytiahnem ju, umyjem,\nzajko ju chce tiež.'],
      ['Polievka', K, 'Mrkva, zemiak, hrášok,\ncibuľka a soľ.\nPolievočka vonia,\nmamka varí, hľa.'],
    ],
    r: [
      ['Mrkva', 'Mrkva rastie v zemi,\nvonku je len vňať.\nPotiahnem ju, vytiahnem,\nzajko ju má rád.'],
      ['Repa', 'Ťahá dedko repu, ťahá,\nbabka dedka, vnučka babku.\nPsík, mačka, myška pomôžu,\nvytiahnu ju spolu, hop!'],
      ['Cibuľa', 'Cibuľa má sedem šiat,\nkto ju vyzlečie, ten plače.\nAle v polievke je dobrá,\nbez nej by nebolo chuti.'],
      ['Uhorka', 'Uhorka je zelená,\ndlhá ako had.\nDo šalátu ju pokrájam,\nchrumká, mám ju rád.'],
      ['Zemiak', 'Zemiak rastie pod zemou,\nhnedý je a guľatý.\nVarený, pečený, hranolky,\nkaždý ho má rád.'],
    ],
  },
  vtaky: {
    s: [
      ['Čižiček, čižiček', L],
      ['Kukulienka, kde si bola', L],
      ['Išla sova na tanec', L],
      ['Kohútik jarabý', L],
      ['Zaleť sokol, biely vták', L],
    ],
    r: [
      ['Lastovička', 'Lastovička na jeseň\nodletí do teplých krajín.\nNa jar sa nám vráti zase,\nhniezdo si postaví pod strechou.'],
      ['Sýkorka', 'Sýkorka ostane v zime,\nhľadá zrnká, slaninku.\nDo kŕmidla jej nasypem,\nnech nemá hlad, chudinka.'],
      ['Bocian', 'Bocian stojí na jednej nohe,\nklapká zobákom: klap-klap.\nNa komíne hniezdo má,\nna jeseň letí do Afriky.'],
      ['Ďateľ', 'Ďateľ ťuká do kôry,\nťuk-ťuk-ťuk, kto je doma?\nHľadá chrobáčiky, larvy,\nje to lekár stromov, hľa.'],
      ['Vrabec', 'Vrabec čiriká na plote,\nčim-čim, čim-čim, čim.\nV zime ostane s nami,\nnebojí sa zimy, mrazu.'],
    ],
  },
  hracky: {
    s: [
      ['Kolo, kolo mlynské', LH],
      ['Zlatá brána', LH],
      ['Pec nám spadla', L],
      ['Moje hračky', K, 'Macko, lopta, kocky,\nbábika aj vláčik.\nVšetky moje hračky,\nmám ich všetky rád.'],
      ['Požičaj mi', K, 'Požičaj mi autíčko,\nja ti dám loptu.\nHráme sa spolu,\nje nám veselo.'],
    ],
    r: [
      ['Macko', 'Macko môj, ty chlpatý,\nspinkáš so mnou každú noc.\nKeď sa bojím, objímem ťa,\nsi môj najmilší, môj.'],
      ['Lopta', 'Lopta skáče: hop-hop-hop,\nkotúľa sa: dup-dup-dup.\nKopnem ju a chytím,\nhráme sa celý deň, hľa.'],
      ['Kocky', 'Kocka na kocku, vyššie, vyššie,\nveža rastie do neba.\nEšte jednu, opatrne,\nbum! A spadla, smejeme sa.'],
      ['Požičiavame', 'Ja ti dám autíčko,\nty mi dáš bábiku.\nKeď sa delíme o hračky,\nhrá sa nám oveľa lepšie.'],
      ['Upratovanie', 'Hračky, hračky, poďte spať,\ndo krabice, na poličku.\nZajtra sa zas pohráme,\nteraz je čas upratať.'],
    ],
  },
}
