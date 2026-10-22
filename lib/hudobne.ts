// Hudobno-pohybové hry podľa zoznamu pani učiteľky Jarky.
// Hry 1–20 sú so spevom a patria k témam, hry 21–30 sú všeobecné a dopĺňajú témy, ktoré vlastnú hru nemajú.
import type { Theme } from './themes'

export type HudHra = { n: string; pravidla: string; spev: string; melodia: string; piesen?: boolean; temy: string[] }

const H = (n: string, temy: string, pravidla: string, spev: string, melodia: string, piesen = true): HudHra =>
  ({ n, pravidla, spev, melodia, piesen, temy: temy ? temy.split(' ') : [] })

export const HUDOBNE: HudHra[] = [
  H('Kolo, kolo mlynské', 'kto-prisiel starki profesie dielna',
    'Deti sa držia za ruky a kráčajú v kruhu. Na „bác“ sa zastavia a urobia drep. V druhej časti napodobňujú pílenie a opravu kolesa. Na záver sa opäť pohybujú v kruhu.',
    '„Kolo, kolo mlynské, za štyri rýnske, kolo sa nám polámalo a do vody popadalo, urobilo bác!“',
    'Melódia a celý text: Kolo, kolo mlynské – text a noty (pesnicky.orava.sk).'),
  H('Zlatá brána', 'kto-prisiel domcek rozpravky fasiangy deti-sveta',
    'Dve deti vytvoria spojenými zdvihnutými rukami bránu. Ostatné popod ňu prechádzajú v zástupe. Na posledné slovo sa brána jemne zatvorí okolo prechádzajúceho dieťaťa. V jednoduchej obmene pre MŠ chytené dieťa vystrieda jedného tvorcu brány.',
    'Začína sa „Zlatá brána otvorená…“',
    'Melódia: Zlatá brána – noty a zvuková ukážka (cloud-c.edupage.org).'),
  H('Oli, oli, Janko', 'cistotka telo moj-den bacil',
    'Deti kráčajú v kruhu. Dieťa uprostred predvádza činnosti podľa piesne: kľakne si, umýva sa, utiera, podoprie si boky. Na konci vyberie nasledovníka.',
    '„Oli, oli, Janko, kľakni na kolienko, umývaj sa, utieraj sa…“',
    'Melódia: Oli, oli, Janko – nahrávka Spievankova (pekarikova.szm.com).'),
  H('Zajačik v jamôčke', 'jar velka-noc jesen-zvierata zvierata-zima',
    'Jeden zajačik čupí uprostred kruhu, ostatné deti okolo neho kráčajú a spievajú. Pri záverečnej výzve zajačik vstane, poskočí a vyberie ďalšieho zajačika.',
    '„Zajačik v jamôčke sedí sám, sedí sám. Úbožiatko, čo je ti, že nemôžeš skákati? Rýchle skoč a vyskoč!“',
    'Melódia: noty sú v platenej publikácii Farebné notové záznamy (archiv.mpc-edu.sk). Voľnú spoľahlivú nahrávku sme neoverili.'),
  H('Zajačik do lesa', 'les moj-den oblecenie cistotka jesen-zvierata',
    'Deti predstavujú zajačikov. Podľa jednotlivých slôh napodobňujú umývanie, česanie, obliekanie, dupanie, tlieskanie či skákanie. Všetci sa zapájajú súčasne.',
    '„Zajačik, do lesa, ušiačik, do lesa. Hopi, cupi, do lesa…“ V ďalších slohách sa mení pomenovaná činnosť.',
    'Melódia a slohy: Zajačik do lesa – text a noty (pesnicky.orava.sk).'),
  H('Čížiček, čížiček – Na mak', 'semienko starki vtaky zelenina dielna plody',
    'Učiteľka alebo jedno dieťa ukazuje, ako sa mak seje, ako rastie, kvitne či ako sa zbiera. Ostatní pohyb opakujú. Staršie deti môžu navrhovať vlastné gestá.',
    '„Čížiček, čížiček, vtáčik maličký, povedz nám, čížiček, ako sejú mak?“',
    'Melódia: Čížiček, čížiček – Spievankovo (archiv.mpc-edu.sk).'),
  H('My sme sestry veselé', 'kto-prisiel rodina srdiecko deti-sveta',
    'Deti spievajú v kruhu. Vybrané dieťa predvedie jednoduchý pohyb, napríklad tlieskanie, podupávanie či mávanie. Ostatní ho napodobnia. Potom vyberie ďalšieho predvádzajúceho.',
    '„My sme sestry veselé, veselé, veselé, my sa rady bavíme, bavíme.“',
    'Melódia a celý text: My sme sestry veselé – text a noty (FlipHTML5).'),
  H('Mám ručníček, mám', 'srdiecko rodina fasiangy lucime',
    'Jedno dieťa chodí s ručníčkom vnútri kruhu. Na konci piesne si vyberie partnera, podá mu ručníček a spolu sa krátko zatočia. Vybrané dieťa pokračuje.',
    '„Mám ručníček, mám, komuže ho dám? Nikomu inému, len tomu milému, čo ho rada mám.“',
    'Melódia: Mám ručníček, mám – prehrávanie nôt (Pesničky pre všetkých).'),
  H('Kozička je v záhrade – Na kozu a záhradníka', 'domace zelenina dielna semienko',
    'Kruh detí tvorí záhradu. Kozička je vnútri, záhradník vonku. Po piesni sa záhradník pýta, čo koza robí a či kapustu sadila alebo polievala. Koza činnosti predvádza. Po záverečnej výzve vybehne do vopred určeného priestoru a záhradník ju chytá. Potom sa dvojica vymení.',
    '„Kozička je v záhrade, na zelenej priesade. Ej, koza, koza, daj pozor, gazda stojí za rohom.“',
    'Melódia: overený zvukový ani notový odkaz sme nenašli. Text a celý priebeh hry z MŠ: skolka.edupage.org.'),
  H('Chytili sme kohútika', 'domace starki velka-noc',
    'Kohútik je uprostred kruhu. Deti spievajú a kráčajú okolo neho. Kohútik skúša nájsť otvor medzi rukami detí. Obmena pre MŠ: po poslednom slove dve určené deti zdvihnú ruky a kohútik vyjde „bránkou“, zakikiríka a vyberie nasledovníka.',
    '„Chytili sme kohútika, dali sme ho do košíka. Dajte pozor, milé deti, nech nám kohút neuletí.“',
    'Melódia: hra je v hudobnom titule Detské hry, piesne a tance 3 (cloud-c.edupage.org). Samostatnú voľnú nahrávku sme neoverili.'),
  H('O reťaz, o reťaz', 'kto-prisiel obec deti-sveta lucime',
    'Začnú dve alebo tri deti v malom kruhu. Spevom postupne pozývajú ďalšie deti po mene. Pozvané dieťa sa pripojí a kruh rastie. V MŠ môže hra skončiť spoločným kruhom všetkých detí.',
    '„O reťaz, o reťaz, pletieme my reťaz… Málo nás, málo nás, poď, Anička, medzi nás.“',
    'Melódia: O reťaz, o reťaz – text a noty (sosbb.sk).'),
  H('Vijeme vence, vijeme', 'luka jar bylinky rodina farby-sveta',
    'Niekoľko detí tvorí kruh – venček. Ostatné predstavujú kvety. Kvetinárka postupne pomenuje a pozve jednotlivé kvety do kruhu. S každým opakovaním piesne venček narastá.',
    'Začína sa „Vijeme vence, vijeme, v poli dosť kvetov nájdeme…“',
    'Melódia: voľný spoľahlivý odkaz sme neoverili. Podrobný priebeh hry Na venček: alinka.sk.'),
  H('Medveďku, daj labku', 'jesen-zvierata zvierata-zima les hracky rozpravky',
    'Deti stoja vo dvojiciach. Podajú si ruky, pomaly sa hojdajú do strán a potom kráčajú vedľa seba v rytme. Pri opakovaní si môžu vymeniť partnera.',
    '„Medveďku, daj labku, pôjdeme na svadbu…“',
    'Melódia: Medveďku, daj labku – noty pre klavír (pesnicky.orava.sk).'),
  H('Hlava, ramená, kolená, palce', 'telo zdravy bacil vnimam',
    'Deti stoja s rozostupmi a dotýkajú sa pomenovaných častí tela. Začnite pomaly. Staršie deti môžu postupne vynechávať slová a ukazovať ich iba pohybom.',
    'Pomenúvajú sa hlava, ramená, kolená, palce, oči, uši, ústa a nos.',
    'Melódia: Hlava, ramená, kolená, palce – noty (pesnicky.orava.sk).'),
  H('My sme malí muzikanti', 'muzikanti fasiangy',
    'Deti napodobňujú hru na nástrojoch spomenutých v piesni. Jedno dieťa môže byť dirigentom a ukazovať spoločný začiatok aj koniec.',
    '„My sme malí muzikanti, my vieme aj pekne hrať…“',
    'Melódia: My sme malí muzikanti – Hanička a Murko (YouTube).'),
  H('Išla sova na tanec', 'vtaky les fasiangy rozpravky',
    'Deti vo dvojiciach predstavujú sovu a vrabca. Najprv kráčajú samostatne, potom sa stretnú, uklonia sa a zatancujú jednoduchými krokmi. Pri opakovaní si vymenia úlohy.',
    '„Išla sova na tanec vyfintená veľmi…“',
    'Melódia a text: Išla sova na tanec – text a noty (pesnicky.orava.sk).'),
  H('Šijeme vrecia, šijeme', 'profesie obchod starki oblecenie',
    'Deti sedia alebo stoja a napodobňujú šitie veľkou pomyselnou ihlou. V časti o predávaní vstanú a kráčajú na „trh“. Pri opakovaní sa vracajú k šitiu.',
    '„Šijeme vrecia, šijeme. Kdeže ich predávať pôjdeme?“',
    'Melódia a celý text: Šijeme vrecia, šijeme – text a noty (pesnicky.orava.sk).'),
  H('Češem si hlavičku', 'cistotka oblecenie moj-den telo',
    'Deti podľa piesne napodobňujú česanie, umývanie, obúvanie a obliekanie. Pri opakovanom refréne sa hojdajú alebo urobia jednoduchý tanečný krok na mieste.',
    'Začína sa „Češem si hlavičku…“',
    'Melódia a ďalšie slohy: Spevník Klaudie Košalovej, tlačená strana 17, v PDF strana 23 (unipo.sk).'),
  H('Pásla ovečky', 'domace jar luka vlast',
    'Deti predstavujú ovečky a pohybujú sa po „lúke“. Pri dupaní podupávajú, pri cupitaní robia drobné kroky. Na záverečnú výzvu sa zídu okolo pastierky.',
    '„Pásla ovečky v zelenom hájičku, pásla ovečky v čiernom lese…“',
    'Melódia a text: Pásla ovečky – text a noty (pesnicky.orava.sk).'),
  H('Prší, prší', 'vetricek kvapka jar',
    'Deti rytmicky klopkajú prstami do dlaní ako dážď. Potom kráčajú po priestore s pomyselným dáždnikom. Keď učiteľka prestane hrať alebo spievať, zastavia sa pod „strieškou“ vytvorenou rukami.',
    '„Prší, prší, len sa leje…“',
    'Melódia: Spevník Klaudie Košalovej, tlačená strana 11, v PDF strana 17 (unipo.sk).'),
  // Všeobecné hry bez jednej záväznej piesne
  H('Hudobné sochy', 'badam dejiny',
    'Deti tancujú. Keď hudba stíchne, zostanú nehybne v polohe. S ďalšou hudbou opäť ožijú. Nikto nevypadáva.',
    'Veselá inštrumentálna hudba s jasným pulzom; spev sa nevyžaduje.', '', false),
  H('Hudobné domčeky', 'domcek domov',
    'Na zemi sú obruče alebo podložky. Počas hudby deti kráčajú medzi nimi. Po zastavení hudby každé vojde do domčeka. Domčekov je dosť pre všetkých.',
    'Krátka pochodová melódia na klavíri alebo známa pieseň spievaná učiteľkou.', '', false),
  H('Rýchlo a pomaly', 'zimne-sporty letne-sporty cas',
    'Deti prispôsobujú chôdzu tempu. Pomalé údery znamenajú pomalé kroky, rýchlejšie údery svižnejšie kroky.',
    'Bubienok alebo jednoduchá opakovaná klavírna melódia. Mení sa tempo.', '', false),
  H('Obri a škriatkovia', 'rozpravky',
    'Pri hlbokých tónoch deti kráčajú ako obri. Pri vysokých tónoch sa pohybujú drobnými krokmi ako škriatkovia.',
    'Striedanie nízkych a vysokých tónov na klavíri či metalofóne.', '', false),
  H('Hudobné zrkadlo', 'srdiecko ai',
    'Vo dvojici jedno dieťa pomaly ukazuje pohyby rúk a tela, druhé ich napodobňuje ako odraz. Po krátkom úseku si vymenia úlohy.',
    'Pokojná inštrumentálna hudba bez prudkých zmien.', '', false),
  H('Rytmická ozvena', 'muzikanti',
    'Učiteľka vytlieska krátky rytmus. Deti ho zopakujú. Potom ho predvedú dupaním alebo plieskaním do stehien.',
    'Stačia 2–4 údery; pevná melódia ani text nie sú potrebné.', '', false),
  H('Hudobný vláčik', 'doprava bezpecne',
    'Deti idú v zástupe za rušňovodičom. Tempo krokov prispôsobujú sprievodu. Pri tichu vlak zastaví v stanici. Rušňovodiči sa striedajú.',
    'Pravidelný rytmus bubienka; možno pridať rytmické „ši-ši-ši“.', '', false),
  H('Tanec so šatkami', 'vetricek sneh more farby-sveta',
    'Deti kreslia šatkou oblúky, kruhy a vlny podľa hudby. Pri zmene hudobnej časti zmenia pohyb.',
    'Striedanie plynulej pokojnej a živej hudby; spev netreba.', '', false),
  H('Hudobný semafor', 'bezpecne doprava',
    'Deti reagujú na dohodnuté zvuky: bubienok – kráčajú, hrkálka – pochodujú na mieste, zvonček – zastavia.',
    'Tri dobre rozlíšiteľné nástroje. Neskôr môžu signály predvádzať deti.', '', false),
  H('Keď ja čarujem', 'rozpravky exoticke domace pri-vode',
    'Učiteľka hudbou „premení“ deti na zvieratká. Deti sa pohybujú ako medvede, žabky či bociany. Na dohodnutý signál sa vrátia k obyčajnej chôdzi.',
    'Ku každému zvieraťu iný hudobný motív alebo vhodná pieseň.', 'Hra je opísaná aj v metodike pre MŠ (nivam.sk).', false),
]

const VSEOBECNE = HUDOBNE.filter((h) => !h.piesen)

/** Hry k téme: najprv tie, ktoré k nej patria, a ak ich je málo, doplní všeobecné. */
export function hudobneHry(theme: Theme, min = 4): HudHra[] {
  const out = HUDOBNE.filter((h) => h.temy.includes(theme.id))
  let k = [...theme.id].reduce((a, c) => a + c.charCodeAt(0), 0)
  while (out.length < min) {
    const h = VSEOBECNE[k++ % VSEOBECNE.length]
    if (!out.includes(h)) out.push(h)
  }
  return out
}

export const NACVIK = 'Pri nácviku najprv deťom pieseň zaspievajte, potom vysvetlite a predveďte pohyb, nakoniec spojte oboje. Pre 5–6-ročné deti pridajte striedanie vedúcich, vlastné pohybové nápady a reakciu na zmenu tempa. Metodika odporúča používať málo krokových variácií a meniť ich na zreteľných miestach piesne (nivam.sk).'
