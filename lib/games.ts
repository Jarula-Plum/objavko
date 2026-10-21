export type GameId =
  | 'pismena' | 'slabiky' | 'pocty' | 'viac' | 'velkost' | 'postupnost' | 'nepatri' | 'tiene'
  | 'najdi' | 'zive' | 'pexeso' | 'emocie' | 'spravanie' | 'materialy' | 'farby' | 'pohyb' | 'zdrave'
  | 'zacina' | 'dlhe' | 'kukucka' | 'poradie' | 'poloha' | 'zmizlo' | 'obdobia' | 'rezim' | 'profesie'
  | 'rytmus' | 'tony' | 'oblecenie' | 'hygiena' | 'rymy' | 'okienka' | 'posledna' | 'hlasky'
  | 'krokovanie' | 'schody' | 'autobus' | 'stavby' | 'parkety' | 'veza' | 'odtiene' | 'postup' | 'zvuky'
  | 'nakup' | 'robotik' | 'clovek' | 'situacie' | 'empatia'

export type Game = {
  id: GameId
  name: string
  pic: string
  color: string
  desc: string
  area: Area
  // Podoblasť a výkonový štandard ŠVP pre predprimárne vzdelávanie (2016), doslovne
  std: string
}

// Vzdelávacie oblasti Štátneho vzdelávacieho programu pre predprimárne vzdelávanie.
export const AREAS = [
  'Jazyk a komunikácia',
  'Matematika a práca s informáciami',
  'Človek a príroda',
  'Človek a spoločnosť',
  'Človek a svet práce',
  'Umenie a kultúra',
  'Zdravie a pohyb',
] as const
export type Area = (typeof AREAS)[number]

// Každá hra patrí do jednej oblasti a v každej téme týždňa sa skladá z obrázkov danej témy.
export const GAMES: Game[] = [
  // Jazyk: postup podľa Eľkonina od rýmov cez slabiky k prvej, poslednej a všetkým hláskam
  { id: 'rymy', name: 'Čo sa rýmuje?', pic: '🎶', color: 'var(--berry)', desc: 'Nájdi slovo, ktoré znie podobne.', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Rozhodne, či sa dve slová rýmujú.' },
  { id: 'slabiky', name: 'Vytlieskaj slabiky', pic: '👏', color: 'var(--sky)', desc: 'Koľko slabík má slovo?', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Rozčlení zvolené slová na slabiky.' },
  { id: 'okienka', name: 'Slabikové okienka', pic: '🟥', color: 'var(--accent)', desc: 'Za každú slabiku posuň žetón (Eľkonin).', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Rozčlení zvolené slová na slabiky.' },
  { id: 'dlhe', name: 'Dlhé a krátke slovo', pic: '📏', color: 'var(--grape)', desc: 'Ktoré slovo je dlhšie?', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Rozčlení zvolené slová na slabiky.' },
  { id: 'pismena', name: 'Prvé písmenko', pic: '🔤', color: 'var(--leaf)', desc: 'Na aké písmeno začína slovo?', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Vyčlení začiatočnú hlásku slova.' },
  { id: 'zacina', name: 'Čo začína na…?', pic: '🅰️', color: 'var(--accent)', desc: 'Nájdi obrázok, ktorý začína na hlásku.', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Vyčlení začiatočnú hlásku slova.' },
  { id: 'posledna', name: 'Posledná hláska', pic: '🔚', color: 'var(--sky)', desc: 'Na akú hlásku končí slovo?', area: 'Jazyk a komunikácia', std: 'Nad rámec ŠVP, Eľkoninov postup: vyčlenenie poslednej hlásky slova (nadväzuje na „Vyčlení začiatočnú hlásku slova.“).' },
  { id: 'hlasky', name: 'Hláskové okienka', pic: '🔴', color: 'var(--grape)', desc: 'Za každú hlásku posuň žetón (Eľkonin).', area: 'Jazyk a komunikácia', std: 'Nad rámec ŠVP, Eľkoninov postup: hlásková analýza slova pomocou okienok a žetónov.' },
  { id: 'kukucka', name: 'Kukučka', pic: '👀', color: 'var(--sun)', desc: 'Kto sa skrýva za okienkom?', area: 'Jazyk a komunikácia', std: 'Slovná zásoba: Vlastnými slovami vysvetlí význam slov, ktoré pozná.' },
  { id: 'pocty', name: 'Koľko ich je?', pic: '🔢', color: 'var(--accent)', desc: 'Spočítaj obrázky a ťukni na číslo.', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: V obore do 10 určí počítaním po jednej počet predmetov v skupine.' },
  { id: 'viac', name: 'Kde je viac?', pic: '⚖️', color: 'var(--sun)', desc: 'Porovnaj dve skupiny obrázkov.', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: Pre dve skupiny určí, kde je viac, kde je menej alebo rovnako veľa predmetov podľa zisteného počtu v skupinách (do 10 prvkov v skupine).' },
  { id: 'velkost', name: 'Veľký a malý', pic: '🐘', color: 'var(--grape)', desc: 'Nájdi najväčší alebo najmenší obrázok.', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Odhadom aj meraním porovná dva predmety podľa veľkosti určeného rozmeru.' },
  { id: 'poradie', name: 'Prvý, druhý, tretí', pic: '🥇', color: 'var(--sky)', desc: 'Ťukni na obrázok podľa poradia.', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: V usporiadanom rade určí objekt na základe slov prvý, druhý, tretí, štvrtý, posledný.' },
  { id: 'poloha', name: 'Hore, dole, vľavo, vpravo', pic: '🧭', color: 'var(--berry)', desc: 'Kde je obrázok?', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Určí (označí) objekt na základe popisu polohy pomocou slov hore, dole, vpravo, vľavo, v strede.' },
  { id: 'postupnost', name: 'Čo bude ďalej?', pic: '🔁', color: 'var(--leaf)', desc: 'Pokračuj v rade obrázkov.', area: 'Matematika a práca s informáciami', std: 'Logika: Pokračuje vo vytvorenej postupnosti predmetov alebo nakreslenej postupnosti obrázkov.' },
  { id: 'nepatri', name: 'Čo sem nepatrí?', pic: '🤔', color: 'var(--sun)', desc: 'Nájdi obrázok, ktorý nepatrí k téme.', area: 'Matematika a práca s informáciami', std: 'Logika: Roztriedi objekty v skupine na základe určenej vlastnosti.' },
  { id: 'tiene', name: 'Čí je to tieň?', pic: '🌑', color: 'var(--grape)', desc: 'Priraď obrázok k tieňu.', area: 'Matematika a práca s informáciami', std: 'Logika: Vytvorí dvojicu objektov na základe danej logickej súvislosti.' },
  // Hejného metóda: prostredia krokovanie, schody, autobus, stavby z kociek, parkety
  { id: 'krokovanie', name: 'Krokovanie', pic: '👣', color: 'var(--leaf)', desc: 'Kroky dopredu a dozadu. Kam sa dostaneš?', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: V obore od 1 do 10 pokračuje od náhodného čísla v numerickej postupnosti (Hejného prostredie Krokovanie).' },
  { id: 'schody', name: 'Schody', pic: '🪜', color: 'var(--sun)', desc: 'Ktorý schod chýba?', area: 'Matematika a práca s informáciami', std: 'Logika: Objaví a jednoducho opíše pravidlo postupnosti (Hejného prostredie Schody).' },
  { id: 'autobus', name: 'Autobus', pic: '🚌', color: 'var(--accent)', desc: 'Kto nastúpil a kto vystúpil?', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: Pomocou určovania počtu rieši kontextové úlohy s jednou operáciou, kde sa pridáva, odoberá (Hejného prostredie Autobus).' },
  { id: 'stavby', name: 'Stavby z kociek', pic: '🧱', color: 'var(--grape)', desc: 'Z koľkých kociek je stavba?', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Postaví stavbu z primeraného množstva (do 10) stavebnicových dielcov podľa predlohy (Hejného prostredie Stavby).' },
  { id: 'parkety', name: 'Parkety', pic: '🟨', color: 'var(--berry)', desc: 'Ktorý dielik doplní vzor?', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Poskladá z primeraného množstva útvarov obrázok podľa predlohy (Hejného prostredie Parkety).' },
  { id: 'veza', name: 'Postav vežu', pic: '🗼', color: 'var(--berry)', desc: 'Od najväčšej kocky po najmenšiu (Montessori).', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Usporiada podľa veľkosti určeného rozmeru 3 až 4 predmety (Montessori ružová veža).' },
  { id: 'robotik', name: 'Robotík', pic: '🤖', color: 'var(--sky)', desc: 'Šípkami doveď robota k batérii.', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Na základe pokynov daných pomocou symbolov ↓, ←, →, ↑ sa dokáže pohybovať v štvorcovej sieti.' },
  { id: 'najdi', name: 'Nájdi obrázok', pic: '🔍', color: 'var(--leaf)', desc: 'Počúvaj a ťukni na správny obrázok.', area: 'Človek a príroda', std: 'Vnímanie prírody: Rozpráva o prírodných reáliách známeho okolia (pomenúva ich).' },
  { id: 'zive', name: 'Živé či neživé?', pic: '🌱', color: 'var(--sky)', desc: 'Žije to, alebo nežije?', area: 'Človek a príroda', std: 'Vnímanie prírody: Odlišuje živé od neživých súčastí prírody.' },
  { id: 'pexeso', name: 'Pexeso', pic: '🃏', color: 'var(--accent)', desc: 'Nájdi dvojice obrázkov.', area: 'Človek a príroda', std: 'Vnímanie prírody: Rozpráva o prírodných reáliách známeho okolia (pamäť a pozornosť).' },
  { id: 'zmizlo', name: 'Čo zmizlo?', pic: '🎩', color: 'var(--grape)', desc: 'Zapamätaj si obrázky a nájdi, čo zmizlo.', area: 'Človek a príroda', std: 'Vnímanie prírody: Rozpráva o prírodných reáliách známeho okolia (pozornosť a pamäť).' },
  { id: 'obdobia', name: 'Ročné obdobia', pic: '🍂', color: 'var(--sun)', desc: 'Jar, leto, jeseň alebo zima?', area: 'Človek a príroda', std: 'Vnímanie prírody: Vymenuje ročné obdobia. Uvedomuje si zmeny v prírode počas roka.' },
  { id: 'emocie', name: 'Ako sa cíti?', pic: '😊', color: 'var(--berry)', desc: 'Nájdi tváričku, ktorá sa tak cíti.', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Opíše aktuálne emócie.' },
  { id: 'spravanie', name: 'Správne či nesprávne?', pic: '🤝', color: 'var(--leaf)', desc: 'Je to pekné správanie?', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Rozlišuje vhodné a nevhodné správanie.' },
  { id: 'situacie', name: 'Ako sa asi cíti?', pic: '💛', color: 'var(--sun)', desc: 'Čo sa stalo a ako sa cíti?', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Vyjadruje pocity zo zážitku, vypočutej rozprávky alebo príbehu – pozitívne i negatívne.' },
  { id: 'empatia', name: 'Čo urobím?', pic: '🤗', color: 'var(--berry)', desc: 'Ako pomôcť kamarátovi aj sebe.', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Reaguje spoločensky prijateľným spôsobom na aktuálne prejavy emócií – pozitívne i negatívne.' },
  { id: 'nakup', name: 'Nakupujeme', pic: '🛒', color: 'var(--leaf)', desc: 'Zaplať mincami presne (finančná gramotnosť).', area: 'Človek a spoločnosť', std: 'Nad rámec ŠVP: finančná gramotnosť – peniaze a nakupovanie; využíva Čísla a vzťahy (určovanie počtu).' },
  { id: 'clovek', name: 'Človek alebo robot?', pic: '👧', color: 'var(--grape)', desc: 'Čo vie človek a čo robot (umelá inteligencia).', area: 'Človek a spoločnosť', std: 'Nad rámec ŠVP: digitálna gramotnosť – rozdiel medzi človekom a strojom s umelou inteligenciou.' },
  { id: 'rezim', name: 'Môj deň', pic: '⏰', color: 'var(--sky)', desc: 'Ráno, na obed, alebo večer?', area: 'Človek a spoločnosť', std: 'Orientácia v čase: Opíše režim dňa.' },
  { id: 'materialy', name: 'Z čoho je to?', pic: '🪵', color: 'var(--accent)', desc: 'Drevo, kov, sklo, papier, plast či látka?', area: 'Človek a svet práce', std: 'Materiály a ich vlastnosti: Opisuje predmety a ich rôzne vlastnosti.' },
  { id: 'postup', name: 'Krok za krokom', pic: '🧼', color: 'var(--leaf)', desc: 'Zoraď, čo sa robí najskôr (Montessori praktický život).', area: 'Človek a svet práce', std: 'Užívateľské zručnosti: Používa predmety dennej potreby v domácnosti a aj elementárne pracovné nástroje (Montessori praktický život).' },
  { id: 'profesie', name: 'Kto s čím pracuje?', pic: '🧑‍🔧', color: 'var(--sky)', desc: 'Priraď povolaniu pomôcku.', area: 'Človek a svet práce', std: 'Remeslá a profesie: Pozná základnú pracovnú náplň vybraných profesií (napr. lekár, šofér, učiteľ, policajt).' },
  { id: 'farby', name: 'Farbičky', pic: '🎨', color: 'var(--berry)', desc: 'Ťukni na správnu farbu.', area: 'Umenie a kultúra', std: 'Výtvarné činnosti s farbou: Pomenuje základné a zmiešané farby.' },
  { id: 'rytmus', name: 'Bubeník', pic: '🥁', color: 'var(--accent)', desc: 'Koľkokrát zabubnoval?', area: 'Umenie a kultúra', std: 'Rytmické činnosti: Realizuje rytmický sprievod k riekankám a piesňam.' },
  { id: 'tony', name: 'Vysoko a hlboko', pic: '🎵', color: 'var(--sky)', desc: 'Je tón vysoký, alebo hlboký?', area: 'Umenie a kultúra', std: 'Percepčné činnosti: Aktívne počúva hudobné skladby pre deti, piesne a spev učiteľky.' },
  { id: 'odtiene', name: 'Od svetlej po tmavú', pic: '🎨', color: 'var(--sky)', desc: 'Zoraď odtiene farby (Montessori).', area: 'Umenie a kultúra', std: 'Výtvarné činnosti s farbou: Ovláda základy miešania farieb – svetlé a tmavé odtiene (Montessori farebné tabuľky).' },
  { id: 'zvuky', name: 'Zvukové pexeso', pic: '🔊', color: 'var(--grape)', desc: 'Nájdi dva rovnaké zvuky (Montessori).', area: 'Umenie a kultúra', std: 'Percepčné činnosti: Aktívne počúva (Montessori zvukové valčeky – rozlišovanie výšky tónu).' },
  { id: 'pohyb', name: 'Hýbme sa!', pic: '🤸', color: 'var(--grape)', desc: 'Spočítaj obrázky a toľkokrát sa pohni.', area: 'Zdravie a pohyb', std: 'Pohyb a telesná zdatnosť: Dodržiava pravidlá v pohybových hrách.' },
  { id: 'zdrave', name: 'Zdravé či nezdravé?', pic: '🥦', color: 'var(--leaf)', desc: 'Je to jedlo zdravé?', area: 'Zdravie a pohyb', std: 'Zdravie a zdravý životný štýl: Uvádza príklady zdravej a nezdravej výživy.' },
  { id: 'oblecenie', name: 'Čo si oblečiem?', pic: '🧥', color: 'var(--sky)', desc: 'Čo si vezmeš podľa počasia?', area: 'Zdravie a pohyb', std: 'Hygiena a sebaobslužné činnosti: Ovláda základné sebaobslužné činnosti.' },
  { id: 'hygiena', name: 'Čistotka', pic: '🧼', color: 'var(--berry)', desc: 'Čo potrebuješ na umývanie?', area: 'Zdravie a pohyb', std: 'Hygiena a sebaobslužné činnosti: Má osvojené základné hygienické návyky.' },
]

export const AVATARS = ['🦊', '🐸', '🦄', '🐯', '🐼', '🐨', '🐰', '🐻', '🐱', '🐶', '🦁', '🐵', '🐧', '🐢', '🐝', '🐞', '🦉', '🐙']

export const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

// Najlepší výsledok každého dieťaťa v každej hre
export function bestStars(results: { child_id: string; game_id: string; stars: number }[]) {
  const best: Record<string, Record<string, number>> = {}
  for (const r of results) {
    const row = (best[r.child_id] ??= {})
    row[r.game_id] = Math.max(row[r.game_id] ?? 0, r.stars)
  }
  return best
}
