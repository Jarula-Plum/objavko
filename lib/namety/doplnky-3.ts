import type { Namet } from './cviky'

// Tretie doplnky (október 2026) z podrobného prechodu materiálov: Rozcvička, Zdravie a pohyb (MPC),
// zásobník dramatických hier (MPC), české pohybové hry, ekohry, dopravný projekt a prípravy pani učiteľky Jarky.
// Pravidlá sú opísané vlastnými slovami; autorské riekanky a texty sme nepreberali.
export const DOPLNKY_3: Record<string, Partial<Namet>> = {
  'kto-prisiel': {
    h: [['Mená do rytmu', 'Deti sedia v kruhu a dlaňami pravidelne búchajú do kolien. Do rytmu postupne každé povie dvakrát svoje meno (Jurko, Jurko, Emka, Emka). Starší hovoria meno suseda vľavo a potom svoje.']],
  },
  telo: {
    z: [['Prstíky sú ako vejár, raz ich otvorím, raz zavriem.', 'prsty']],
    p: [
      ['Schovajte predo mnou', 'Učiteľka povie, čo majú deti predo mnou „schovať“: čelo, bruško, kolená, uši, lakte. Deti časť tela rýchlo zakryjú rukami, alebo si na ňu ľahnú. Každé dieťa môže úlohu vyriešiť po svojom.'],
      ['Tichý had', 'Medzi stoličkami je nízko natiahnuté lano a na ňom visia zvončeky. Deti sa ako hady plazia popod lano tak, aby nezazvonili. Lano postupne znižujeme.'],
    ],
  },
  jedlo: {
    z: [['Fúkam čaj, je horúci, nech jazýček nepáli.', 'dych']],
    p: [['Na buchtičky', 'Deti kráčajú v kruhu. Každé jedlo má svoj pohyb: buchtičky – poskok, džús – chôdza po špičkách, polievka – otočka na mieste. Učiteľka povie jedlo a deti urobia jeho pohyb. Starším povie aj dve jedlá naraz.']],
  },
  cas: {
    p: [['Kačacie a žabacie kroky', 'Deti sedia v rade. Vyvolávač zavolá: „Janko, vstávaj!“ Janko sa spýta: „Koľko je hodín?“ – „Tri kačacie!“ Janko urobí tri kačacie kroky (na dĺžku chodidla) dopredu. Ďalšie kroky: žabacie (poskoky), medvedie (veľké), myšacie (v podrepe), rakove (dozadu). Kto prvý dôjde k vyvolávačovi, vymení sa s ním.']],
  },
  oblecenie: {
    p: [['Moje papučky', 'Papučky všetkých detí ležia na kope na druhom konci triedy. Na signál dieťa dobehne, nájde svoje papučky, obuje sa a vráti sa. Potom beží ďalšie. Mladší hľadajú papučky bez behu, len chôdzou.']],
  },
  kvapka: {
    p: [
      ['Stratená voda', 'Zvieratkám sa stratila voda a idú ju hľadať cez les plný prekážok: prejdú po lavičke, preskočia kocky, prelezú tunelom, obídu kužele a podlezú tyč. Na konci čaká studnička a v nej vajíčka s prekvapením (papierová kvapka, semienko, kvietok).'],
      ['Obláčiky', 'Deti čupia ako kvapky v mláke. Slnko hreje a kvapky ako para pomaly stúpajú hore, spájajú sa do obláčikov, potom do veľkého mraku. Mrak oťažie a kvapky padajú na zem: každé dieťa povie, kam spadlo (na strechu, na list, do potoka). Kvapky sa znova spoja do mláky.'],
    ],
  },
  badam: {
    p: [['Malí zememerači', 'Deti sú v družstvách. Prvé dieťa „meria zem“: od štartu do cieľa kladie tyč za tyčou, potom beží späť a podá tyč ďalšiemu. Na záver sa spýtame, koľko tyčí bolo treba.']],
  },
  'farby-tvary': {
    p: [['Farebný bazén', 'V detskom bazéne sú farebné loptičky. Jedno dieťa vyhadzuje loptičky farby, ktorú povie učiteľka, a ostatní ich hádžu späť do bazéna. Potom sa vymenia.']],
  },
  exoticke: {
    p: [['Záchrana zvieratiek', 'Polovica detí sú zvieratká zo ZOO so zaviazanými očami. Druhá polovica sú záchranári: opatrne ich prevedú za ruku po úzkom moste (lano na zemi) na druhý breh. Potom sa vymenia. Na záver sa porozprávame, aké to bolo, keď sme nevideli.']],
  },
  doprava: {
    p: [
      ['Na dopravu', 'Deti majú pripnutý obrázok auta, vlaku, lietadla alebo lode a voľne sa prechádzajú. Keď učiteľka ukáže obrázok vlaku, deti s vlakom sa zoradia do zástupu a „idú“ ako vlak, ostatné stoja. Potom ďalší dopravný prostriedok.'],
      ['Chodec a neposlušné auto', 'Na zemi je lanom vyznačená cesta s priechodom pre chodcov. Časť detí sú autá, časť chodci. Chodci prechádzajú len po priechode, keď sa autá zastavia; pred prechodom sa pozrú vľavo, vpravo a ešte raz vľavo. Potom sa úlohy vymenia.'],
      ['Šofér a auto', 'Vo dvojici je jedno dieťa auto so zatvorenými očami a rukami vpredu ako nárazník. Šofér stojí za ním a vedie ho dotykmi: ruka na pravom ramene – doprava, na ľavom – doľava, obe ruky – rovno, pustí – stoj. Potom sa vymenia.'],
      ['Rýchlosti', 'Deti chodia po kruhu. Učiteľka hovorí čísla: 1 – stoj, 2 – pochod, 3 – pomalá chôdza, 4 – rýchla chôdza, 5 – beh. Najmladší majú len tri rýchlosti.'],
    ],
    r: ['Chodecký semafor: ukážeme, že semafor pre chodcov má len dve farby (červený stojaci panáčik a zelený kráčajúci), semafor pre autá tri.'],
  },
  jar: {
    z: [['Žabka čupí pri jazere, kolienka má od seba.', 'zabka']],
    p: [['Slniečko navštevuje zvieratká', 'Deti sú v štyroch skupinách: včielky, hady, ježkovia a vrabce. Slniečko (učiteľka) obchádza skupiny podľa ročných období: na jar lietajú včielky z kvetu na kvet, v lete sa hady plazia po lavičke, na jeseň ježkovia lezú pod stolom po jabĺčka, v zime vrabce poskakujú okolo závejov. Vždy sa hýbe len jedna skupina.']],
  },
  luka: {
    z: [['Motýlik máva krídlami, sadá na kvet medzi nami.', 'motyl']],
    p: [
      ['Na mravenisko', 'Mravce voľne behajú po mravenisku. Keď zaznie triangel, prišla mravčia kráľovná a všetci zastanú a stíchnu. Ďalší úder znamená, že odišla, a mravce sa rozbehnú. Obmena: hadia kráľovná (plazenie), žabia (skákanie).'],
      ['Farebné motýle', 'Na zemi sú papierové kvety rôznych farieb, motýle majú rovnako farebnú stužku a sedia na svojom kvete. Na „Motýle, lietajte!“ ľahko behajú po lúke. Keď vyjde motýliar, rýchlo si sadnú späť na kvet svojej farby.'],
      ['Nestúpni na kvietok', 'Po lúke (koberci) sú rozložené papierové kvety. Deti chodia pomedzi ne tak, aby na žiadny nestúpili. Učiteľka postupne pridáva ďalšie kvety, chodník je stále užší.'],
    ],
  },
  more: {
    z: [['Veslujeme po mori, loďka ide k obzoru.', 'veslar']],
  },
  'pri-vode': {
    p: [['Po kameňoch cez potok', 'Na zemi sú papiere ako kamene v potoku. Deti prejdú na druhý breh len po kameňoch. Starší si nesú dva papiere a kladú si ich pred seba sami, aby nestúpili do vody.']],
  },
  sneh: {
    z: [['Snehuliak stojí zamrznutý, slnko svieti, už sa topí.', 'snehuliak']],
  },
  vetricek: {
    z: [['Fúkam do lístka, nech odletí od stromu.', 'dych']],
  },
  vianoce: {
    z: [['Sviečka horí, pomaly sa topí, ľahnem si a oddychujem.', 'snehuliak']],
  },
  separko: {
    z: [['Vrchnáčik z fľaše prenesiem ponad hlavu z ruky do ruky.', 'vrchnak']],
    p: [['Vrchnáková hra', 'Každé dieťa má vrchnák z PET fľaše: vyhadzuje ho a chytá, prenáša z ruky do ruky, hádže do škatule, kladie si ho na chrbát ruky alebo na hlavu a prejde s ním kúsok tak, aby nespadol.']],
    h: [['Čistíme jazierko', 'Pri „jazierku“ (bazén alebo modrá látka) je rozhádzaný čistý odpad. Deti ho pozbierajú a potom roztriedia do farebných škatúľ: modrá papier, žltá plasty, zelená sklo, červená kovy. Z vrchnákov nakoniec spolu nalepia obrázok.']],
  },
  'letne-sporty': {
    p: [
      ['Lietajúce tanieriky', 'Deti hádžu papierové tanieriky alebo kartónové kruhy do obruče na zemi. Po každom hode sa obruč posunie o krok ďalej.'],
      ['Preskoč sám seba', 'Dieťa si ľahne na zem a kamarát mu kriedou alebo stuhou označí hlavu a päty. Potom sa dieťa postaví a skúsi znožmo preskočiť „samého seba“, teda celú dĺžku svojho tela.'],
    ],
  },
  leto: {
    p: [
      ['Kvety za slniečkom', 'Jedno dieťa je slniečko a pomaly chodí po triede. Ostatné sú kvety, stoja na mieste a otáčajú sa vždy tvárou k slniečku. Keď slniečko zapadne (čupne si), kvety sa zatvoria.'],
      ['Zmrzlina sa topí', 'Deti stoja ako tuhá zmrzlina vytiahnutá z mrazničky. Slnko hreje a zmrzlina sa pomaly roztápa, až z nej ostane mláčka na zemi. Uvoľnenie celého tela.'],
    ],
  },
  vesmir: {
    p: [['Zemeguľa', 'Na zemi sú farebné látky: hnedá je piesok, modrá voda, zelená tráva, tmavozelená les. Učiteľka hovorí, kadiaľ ideme: po horúcom piesku, cez studenú vodu, po ihličí, po mäkkej tráve s rosou. Deti chôdzu a výraz tváre prispôsobujú.']],
  },
  domace: {
    p: [['Húsky, húsky, poďte domov', 'Husky sú na jednej strane, gazdiná na druhej, vlk v strede. Gazdiná volá: „Húsky, húsky, poďte domov!“ – „Bojíme sa!“ – „Koho?“ – „Vlka!“ – „Vlk je ďaleko, poďte domov!“ Husky prebehnú ku gazdinej a vlk ich chytá. Chytená huska v ďalšom kole pomáha vlkovi.']],
  },
  hracky: {
    h: [['V hračkárstve', 'Deti sú hračky v obchode. Každé si vymyslí, akou hračkou je. Keď príde kupujúci, hračky sa mu predstavia pohybom a zvukom a on hádá, čo sú zač.']],
  },
  rozpravky: {
    h: [['Klapka, kamera!', 'Skupinka si vyberie kúsok známej rozprávky a postaví ho ako nehybný obraz. Na „Klapka, kamera!“ obraz ožije a krátko sa hrá. Ostatní hádajú, o ktorú rozprávku ide.']],
  },
  profesie: {
    h: [['Kto chýba?', 'Jedno dieťa odíde za dvere. Ostatní zahrajú scénku, v ktorej chýba dôležitá postava, napríklad autobus bez šoféra, obchod bez predavačky, kapela bez dirigenta. Dieťa sa vráti a hádá, čo hrajú a kto chýba.']],
    r: [
      'Povolania rodičov: pozvite rodiča, aby deťom ukázal svoju prácu v škôlke alebo na pracovisku; počas roka môže prísť viac rodičov.',
      'Ľudové remeslá: prezrite si obrázky a výrobky hrnčiara, rezbára, košikára, kováča, drotára, tkáča a medovnikára a skúste si jedno remeslo (plstenie, pletenie, zdobenie medovníka).',
    ],
  },
  srdiecko: {
    p: [['Ulička priateľstva', 'Deti stoja v dvoch radoch oproti sebe a vytvoria uličku. Jedno dieťa ňou pomaly prejde a ostatní mu bez slov ukážu, že ho majú radi: úsmev, zamávanie, pohladenie po pleci. Vystriedajú sa všetci, ktorí chcú.']],
    h: [
      ['Mám niečo pre teba', 'Deti sedia v kruhu. Učiteľka sa otočí k susedovi: „Ja som Zuzka a tebe, Katka, posielam zamávanie.“ Katka pošle ďalej niečo iné: úsmev, žmurknutie, objatie, veselú grimasu.'],
      ['Neobľúbené zvieratko', 'Dieťa v strede povie zvieratko, ktoré nemá rado, napríklad pavúka. Ostatné deti mu postupne povedia o ňom niečo pekné alebo užitočné (pavúk chytá muchy, vie upliesť sieť). Hrá sa pokojne, môže byť pri baterke ako pri táboráku.'],
    ],
  },
  les: {
    h: [['Pavučinka', 'Deti stoja v kruhu. Prvé povie: „Som dub, býva na mne veverička“ a hodí klbko veveričke. Tá pokračuje: „Mám rada oriešky, lieska, chyť!“ Tak vznikne pavučina vzťahov v lese. Nakoniec sa spýtame, čo sa stane, keď drevorubač zotne dub, a jemne potiahneme za jeho vlákno.']],
  },
  semienko: {
    h: [
      ['Pokus so štyrmi kvetináčmi', 'Do štyroch kvetináčov zasadíme fazuľu: na svetle so zalievaním, na svetle bez vody, v tme so zalievaním, v tme bez vody. Deti každý deň pozorujú a kreslia, čo sa deje. Nakoniec povedia, čo rastlinka potrebuje.'],
      ['Čo vyrastie zo semienka?', 'Na stole sú semienka (jablko, paprika, fazuľa, mak, tekvica) a obrázky plodov. Deti priraďujú semienko k plodu, z ktorého pochádza, a skúmajú ich tvar a veľkosť lupou.'],
    ],
  },
  vnimam: {
    p: [['Bosý chodník', 'Deti spolu pripravia chodník z rôznych materiálov: kamienky, piesok, šišky, mach, látka, piliny (bez ostrých predmetov). Prejdú ho naboso, starší aj so zaviazanými očami, a hovoria, čo cítia pod nohami.']],
  },
  cistotka: {
    r: ['Hlasová rozcvička pri umývaní: tečúca voda „sss“, studená voda „bŕŕ“, teplá voda „aúú“ hore a dolu, fén na sušenie rúk – fúkanie.'],
  },
  'zvierata-zima': {
    r: ['Kŕmidlo: do kŕmidla dávame slnečnicu, zob, orechy a lojové gule, nikdy nie chlieb, ten vtáčikom škodí.'],
  },
  rodina: {
    r: ['Reťazová rozprávka o rodine: každé dieťa pridá jednu vetu o tom, čo robíme doma spolu.'],
  },
}
