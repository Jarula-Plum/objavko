import type { Namet } from './cviky'

// Doplnky k námetom (október 2026) z materiálov pani učiteľky Jarky (hry a pohyb, zdravotné cviky, ranné činnosti).
// Pravidlá sú prepísané vlastnými slovami a upravené pre MŠ tak, aby nikto natrvalo nevypadával.
export const DOPLNKY: Record<string, Partial<Namet>> = {
  'kto-prisiel': {
    p: [
      ['Hľadaj si kamaráta', 'Deti sa prechádzajú vo dvojiciach. Na jedno tlesknutie sa pustia a voľne behajú po triede. Na dve tlesknutia sa čo najrýchlejšie nájdu pôvodné dvojice, chytia sa za ruky a zdvihnú ich nad hlavu.'],
      ['Ranné stretnutia', 'Deti chodia po triede a plnia pokyny: „Je ráno, ponáhľame sa“ (rýchla chôdza), „Stretli sme kamaráta“ (zastanú a usmejú sa), „Podáme si ruky“, „Zamávame si zďaleka“. Na konci si každý nájde kamaráta, ktorého ešte nepozdravil.'],
    ],
    r: ['Vytlieskaj svoje meno: každé dieťa vytlieska svoje meno po slabikách a ostatní ho zopakujú ako ozvena.'],
  },
  'moj-den': {
    z: [['Zívni si a prebuď sa, hlávka vľavo, vpravo hojdá sa.', 'hlava']],
    r: ['Budenie spachtošov: deti ležia na koberci ako spachtošovia, pri riekanke Spachtoško sa naťahujú, zívajú a pomaly vstávajú.'],
  },
  obec: {
    h: [['Na rozhlas', 'Jedno dieťa potichu odíde za dvere. Učiteľka hlási ako obecný rozhlas: „Haló, haló, hľadáme dievčatko, ktoré má modré tričko a dva vrkôčiky.“ Deti hádajú, kto chýba. Keď sa dieťa vráti, porovnáme, či opis sedel.']],
    r: ['Hra na rozhlas: učiteľka opíše oblečenie jedného dieťaťa a ostatní hádajú, o koho ide.'],
  },
  vetricek: {
    z: [['Fúka vietor, fúka zas, ukloníme sa ako klas.', 'uklon']],
    r: ['Pierko vo vzduchu: deti fúkajú do pierka a skúšajú ho čo najdlhšie udržať vo vzduchu (dychové cvičenie).'],
  },
  starki: {
    p: [['Babkine krôčiky', 'Babka stojí na jednej strane triedy otočená ku stene. Deti sa k nej z druhej strany prikrádajú. Keď sa babka otočí, všetci zmeravejú. Koho babka uvidí hýbať sa, vráti sa o kúsok späť. Kto sa babky prvý dotkne, je novou babkou.']],
  },
  plody: {
    r: ['Mozaika z trhaného papiera: obrys jablka alebo tekvice deti vyplnia natrhanými kúskami farebného papiera.'],
  },
  'jesen-zvierata': {
    z: [['Ježko sa zvinie do klbôčka, spinká v lístí do jarného slniečka.', 'klbko']],
    p: [['Korytnačky s domčekom', 'Deti lezú po štyroch a na chrbte majú malý vankúšik alebo vrecúško ako pancier. Prelezú triedu tak, aby im domček nespadol. Starší skúšajú lezenie pomedzi stoličky.']],
  },
  telo: {
    z: [['Krk mám rovný, hlavu hore, pozriem vľavo, pozriem vpravo.', 'hlava']],
    p: [['Spadol som do studne', 'Jedno dieťa sedí v strede kruhu (v studni) a volá: „Spadol som do studne!“ Ostatní sa pýtajú: „Kto ťa vytiahne?“ Dieťa zadá úlohu, napríklad „ten, kto najvyššie vyskočí“ alebo „kto sa dotkne nosa a pätičky“. Všetci úlohu urobia a dieťa si vyberie kamaráta, ktorý ho v studni vystrieda.']],
    r: ['Zrkadlo: dvojice sa pozorne prezrú, otočia sa chrbtom, jedno dieťa zmení na sebe jednu vec (vyhrnie rukáv, dá dolu sponku) a druhé hádá, čo sa zmenilo.'],
  },
  vnimam: {
    r: ['Hmatové vrecko: deti rukou v látkovom vrecku hľadajú predmet a opisujú ho bez pozerania (je studený, hladký, okrúhly…).'],
  },
  zdravy: {
    z: [['Na chrbátik ľahnem si, objímem si kolienka, pohojdám sa ako kolíska.', 'klbko']],
  },
  sneh: {
    z: [['Snehuliak sa ukláňa, vietor ho zľava, sprava hojdá.', 'uklon']],
    p: [['Mráz a vločky', 'Jedno dieťa je mráz, ostatné sú vločky a voľne poletujú po triede. Koho sa mráz dotkne, zamrzne na mieste. Rozmraziť ho môže kamarát, ktorý ho pohladí po pleci alebo mu prelezie pomedzi rozkročené nohy. Po chvíli vyberieme nový mráz.']],
    r: ['Strihanie vločiek: kruh z papiera preložíme na trojuholník, deti vystrihnú po okrajoch zúbky a rozložia vločku.'],
  },
  fasiangy: {
    p: [['Šašo velí', 'Šašo (učiteľka alebo dieťa s klobúkom) ukazuje pohyby. Deti ich opakujú iba vtedy, keď šašo povie „Šašo velí: ruky hore!“. Keď povie len „ruky hore“, deti ostanú stáť. Kto sa pomýli, nevypadáva, ale urobí šašovi smiešnu grimasu a hrá ďalej.']],
  },
  muzikanti: {
    r: ['Fľašková hudba: do sklenených fliaš nalejeme rôzne množstvo vody a deti paličkou skúšajú, ktorá fľaša znie vysoko a ktorá hlboko.'],
  },
  'pri-vode': {
    z: [['Bosé nôžky pri potoku, prstíkmi chytia kamienok.', 'chodidla']],
    p: [
      ['Na vodníka', 'Vodník sedí v strede kruhu so zaviazanými očami, za opaskom má zelené stužky. Deti sa k nemu po jednom potichu prikrádajú a skúšajú mu vziať stužku. Keď vodník začuje šuchot, ukáže tým smerom. Ak ukáže presne na prikrádajúce sa dieťa, vymenia sa.'],
      ['Žabky a krtkovia', 'Deti stoja v zástupe s rozkročenými nohami ako tunel. Posledné dieťa (krtko) prelezie tunelom dopredu a postaví sa na začiatok, potom ďalšie. Starší striedajú: raz žabka (preskočí obruč), raz krtko (preleze tunelom).'],
    ],
  },
  rozpravky: {
    z: [['Kocúr v čižmách na plote, vyhrbí sa, keď pes príde.', 'macka']],
    p: [
      ['Kráľ je doma', 'Keď učiteľka povie „Kráľ je doma!“, deti chodia po špičkách a šepkajú, aby kráľa nezobudili. Keď povie „Kráľ nie je doma!“, môžu skákať, tancovať a dupať. Kto sa pomýli, sadne si na chvíľu na trón a signály dáva on.'],
      ['Zakliaty kúzelník', 'Kúzelník naháňa deti. Koho sa dotkne, premení ho na zvieratko a dieťa sa tak pohybuje (skáče ako zajac, plazí sa ako had). Odčarovať ho môže kamarát, ktorý ho chytí za ruku a povie čarovné slovo. Po chvíli sa kúzelník vymení.'],
    ],
    r: ['Čarovná palička: deti si v kruhu podávajú paličku a každé ukáže, čím by mohla byť (dáždnik, mikrofón, lyžica, prútik).'],
  },
  domace: {
    z: [['Mačička sa naťahuje, chrbátik si vyhrbuje.', 'macka']],
    p: [['Kto takto volá?', 'Každé dieťa si potichu vylosuje zvieratko (mačka, pes, krava, kohút). So zatvorenými očami chodí pomaly po koberci a ozýva sa jeho hlasom. Úlohou je nájsť všetky rovnaké zvieratká a spolu si sadnúť. Učiteľka dáva pozor, aby nikto nenarazil.']],
    h: [['Kto ťa budí?', 'Jedno dieťa je za dverami. Medzitým vyberieme kamaráta, ktorý napodobní zvuk (kikirikí, haf, crrr budíka). Dieťa sa vráti, vypočuje si zvuk a hádá, kto a čo to bolo. Precvičujeme hlásky r, k, c.']],
  },
  jar: {
    p: [['Slniečko spí', 'Jedno dieťa (slniečko) čupí v strede kruhu a spí. Deti chodia okolo a šepkajú riekanku Slniečko spí, potom hlasnejšie volajú: „Zobuď sa, slniečko!“ Slniečko vstane, roztiahne ruky ako lúče a vyberie si z kruhu jeden lúč, ktorý sa k nemu pridá. Hráme, kým nie sú všetci lúčmi.']],
    r: ['Fúkame sneh z lúky: na zelenej látke ležia vatové guľky a deti ich odfúknu, aby sa lúka zazelenala (dychové cvičenie).'],
  },
  les: {
    z: [['Stromy vietor kolíše, ukloň sa aj ty, potíše.', 'uklon']],
    p: [['Dlhý had', 'Jedno dieťa je hlava hada a chytá ostatných. Koho chytí, chytí ho za ruku a naháňajú spolu. Chytať môžu len deti na krajoch hada. Hra končí, keď je v hade celá trieda. Hráme chôdzou alebo poklusom, aby sa had netrhal.']],
  },
  kvapka: {
    p: [['Kvapky sa spájajú', 'Deti sú dažďové kvapky a voľne „kvapkajú“ po triede pri hudbe. Keď hudba stíchne, učiteľka povie číslo (2 až 5) a toľko kvapiek sa chytí za ruky do mláčky. Kto ostane navyše, pomôže v ďalšom kole počítať. Mladším deťom ukážeme číslo aj na prstoch.']],
    r: ['Kvapky na papieri: deti kvapnú vodovú farbu na papier a slamkou ju rozfúkajú do lúčov alebo potôčikov.'],
  },
  vesmir: {
    z: [['Kozmonaut si krídla stiahne, lakte k bokom, štart už príde.', 'lopatky']],
  },
  dejiny: {
    z: [['Dinosaurus dlhým krkom hľadá lístok vľavo, vpravo.', 'hlava']],
  },
  badam: {
    p: [['Koľko nôh?', 'Deti sú v skupinkách po troch. Učiteľka povie napríklad „Štyri nohy a jedna ruka!“ a skupinka vymyslí, ako sa postaviť, aby sa zeme dotýkalo práve toľko nôh a rúk (niekto stojí na jednej nohe, niekto si kľakne). Mladším hovoríme iba počet nôh.']],
  },
  'farby-sveta': {
    p: [['Niečo vidím a je to…', 'Dieťa si potajomky vyberie vec v triede a povie: „Niečo vidím a je to modré!“ Ostatní sa rozbehnú a dotknú sa vecí, ktoré by to mohli byť. Kto uhádne, vyberá ďalšiu vec.']],
    r: ['Odtláčanie pokrčeným papierom: guľkou z novín namočenou vo farbe deti odtláčajú vzory na baliaci papier.'],
  },
  'deti-sveta': {
    r: ['Panáčikovia z harmoniky: poskladaný pás papiera deti nastrihajú a rozložia rad panáčikov, ktorí sa držia za ruky; každého vyfarbia inak.'],
  },
  srdiecko: {
    p: [['Spoločná obruč', 'Dvojica stojí v jednej obruči a drží ju v páse. Spolu prejdú triedou, obídu stoličku a vrátia sa bez toho, aby obruč spadla. Musia sa dohodnúť, kto ide dopredu. Staršie deti skúšajú aj trojice.']],
    h: [['Loptička pre kamaráta', 'Deti sedia v kruhu a gúľajú si loptu. Kto ju posiela, pozrie kamarátovi do očí, osloví ho menom a povie mu niečo pekné, napríklad „Miška, páči sa mi, ako kreslíš.“']],
    r: ['Ranný kruh: čo mi urobilo radosť? Deti rad radom povedia jednu peknú vec zo včerajška.'],
  },
  oblecenie: {
    p: [['Klobúková naháňačka', 'Naháňač má na hlave klobúk alebo čiapku. Koho chytí, posadí mu klobúk na hlavu a naháňačom sa stáva on. Klobúk sa nehádže, len jemne posadí.']],
  },
  'letne-sporty': {
    p: [
      ['Naháňačka vo dvojiciach', 'Deti sa držia vo dvojiciach za ruky. Jedna dvojica naháňa. Ostatné dvojice sa zachránia tak, že si spolu sadnú do tureckého sedu. Ktorú dvojicu chytia, tá naháňa.'],
      ['Komu sa ujde lopta', 'V strede kruhu leží o jednu loptu menej, ako je detí. Deti chodia okolo, na signál dobehnú po loptu a vrátia sa na svoje miesto. Kto loptu nemá, nevypadáva, ale v ďalšom kole dáva signál on.'],
    ],
  },
  more: {
    z: [['Plutvy k sebe, plutvy preč, rybka pláva, šplechy-šplech.', 'lopatky']],
    p: [['Strážcovia pokladu', 'Trieda je rozdelená čiarou na dva ostrovy, na každom leží poklad (kocky, mušle, šatky). Piráti skúšajú preniesť kúsok pokladu zo súperovho ostrova k sebe. Na cudzom ostrove ich môžu chytiť dotykom; chytený pirát sa vráti domov s prázdnymi rukami. Hráme na čas a potom poklady spočítame.']],
  },
  vtaky: {
    z: [['Vtáčik krídla pritiahne, nad hniezdočkom zas poletí.', 'lopatky']],
    p: [
      ['Vrabce a mačka', 'Vrabce sedia v hniezde (vyznačený kút). Mačka v strede sa pýta: „Vrabčeky, kam letíte?“ – „Na strechu!“ – „A čo tam budete robiť?“ – „Zobať zrnká!“ Na mačkino „Teraz!“ preletia vrabce do druhého hniezda a mačka ich chytá. Chytený vrabec v ďalšom kole pomáha mačke.'],
      ['Letí, letí, všetko letí', 'Deti stoja v kruhu. Učiteľka hovorí „Letí, letí… vrabec!“ a deti zamávajú rukami ako krídlami. Keď povie niečo, čo nelieta („Letí, letí… krava!“), deti ostanú stáť. Kto sa pomýli, nevypadáva, iba sa spolu zasmejeme. Staršie deti môžu hru viesť samy.'],
    ],
    h: [['Kukučka, zakukaj', 'Deti sedia so sklonenými hlavami. Učiteľka potichu ukáže na kukučku. Dieťa v strede povie: „Kukučka, zakukaj!“ a kukučka zakuká zmeneným hlasom. Dieťa hádá, kto to bol.']],
  },
  luka: {
    p: [['Stonožka cez hory', 'Deti stoja v zástupe, každé drží predchádzajúce za boky. Stonožka spolu prekoná hory: prekročí lavičku, prelezie žinenku, obíde kužele. Prvé dieťa vedie a hlási „hore“, „dolu“, „zatáčka“. Potom sa vedúci vystriedajú.']],
  },
  ai: {
    h: [['Signál po drôte', 'Deti sedia v rade a držia sa za ruky. Prvé dieťa jemne stisne ruku susedovi a ten posiela stisk ďalej ako elektrinu po drôte. Posledné dieťa zazvoní zvončekom. Skúsime, ako rýchlo signál dorazí, a pošleme ho aj naspäť.']],
  },
  domov: {
    p: [['Vandrovník hľadá domček', 'Na zemi sú obruče, v každej stojí dieťa. Vandrovník domček nemá a chodí pomedzi ne. Všetci hovoria: „Vandrujem ja svetom, hľadám si svoj dom, kto ma pustí k sebe, budem bývať v ňom.“ Na zapískanie si všetci vymenia domčeky a vandrovník skúsi jeden nájsť. Kto ostane vonku, je novým vandrovníkom.']],
  },
  hracky: {
    z: [['Macko spinká na chrbte, kolená drží pri brušku.', 'klbko']],
  },
  cistotka: {
    z: [['Prstíky si umyjem, aj tie na nôžkach, verte mi.', 'chodidla']],
  },
  leto: {
    z: [['Bosé nohy v tráve, prstíky sa hrajú hravé.', 'chodidla']],
  },
  exoticke: {
    z: [['Ťavka kráča po piesku, hrb hore a hrb dolu.', 'macka']],
  },
}
