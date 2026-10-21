export type GameId =
  | 'pismena' | 'slabiky' | 'pocty' | 'viac' | 'velkost' | 'postupnost' | 'nepatri' | 'tiene'
  | 'najdi' | 'zive' | 'pexeso' | 'emocie' | 'spravanie' | 'materialy' | 'farby' | 'pohyb' | 'zdrave'

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
  { id: 'pismena', name: 'Prvé písmenko', pic: '🔤', color: 'var(--leaf)', desc: 'Na aké písmeno začína slovo?', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Vyčlení začiatočnú hlásku slova.' },
  { id: 'slabiky', name: 'Vytlieskaj slabiky', pic: '👏', color: 'var(--sky)', desc: 'Koľko slabík má slovo?', area: 'Jazyk a komunikácia', std: 'Fonologické uvedomovanie: Rozčlení zvolené slová na slabiky.' },
  { id: 'pocty', name: 'Koľko ich je?', pic: '🔢', color: 'var(--accent)', desc: 'Spočítaj obrázky a ťukni na číslo.', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: V obore do 10 určí počítaním po jednej počet predmetov v skupine.' },
  { id: 'viac', name: 'Kde je viac?', pic: '⚖️', color: 'var(--sun)', desc: 'Porovnaj dve skupiny obrázkov.', area: 'Matematika a práca s informáciami', std: 'Čísla a vzťahy: Pre dve skupiny určí, kde je viac, kde je menej alebo rovnako veľa predmetov podľa zisteného počtu v skupinách (do 10 prvkov v skupine).' },
  { id: 'velkost', name: 'Veľký a malý', pic: '🐘', color: 'var(--grape)', desc: 'Nájdi najväčší alebo najmenší obrázok.', area: 'Matematika a práca s informáciami', std: 'Geometria a meranie: Odhadom aj meraním porovná dva predmety podľa veľkosti určeného rozmeru.' },
  { id: 'postupnost', name: 'Čo bude ďalej?', pic: '🔁', color: 'var(--leaf)', desc: 'Pokračuj v rade obrázkov.', area: 'Matematika a práca s informáciami', std: 'Logika: Pokračuje vo vytvorenej postupnosti predmetov alebo nakreslenej postupnosti obrázkov.' },
  { id: 'nepatri', name: 'Čo sem nepatrí?', pic: '🤔', color: 'var(--sun)', desc: 'Nájdi obrázok, ktorý nepatrí k téme.', area: 'Matematika a práca s informáciami', std: 'Logika: Roztriedi objekty v skupine na základe určenej vlastnosti.' },
  { id: 'tiene', name: 'Čí je to tieň?', pic: '🌑', color: 'var(--grape)', desc: 'Priraď obrázok k tieňu.', area: 'Matematika a práca s informáciami', std: 'Logika: Vytvorí dvojicu objektov na základe danej logickej súvislosti.' },
  { id: 'najdi', name: 'Nájdi obrázok', pic: '🔍', color: 'var(--leaf)', desc: 'Počúvaj a ťukni na správny obrázok.', area: 'Človek a príroda', std: 'Vnímanie prírody: Rozpráva o prírodných reáliách známeho okolia (pomenúva ich).' },
  { id: 'zive', name: 'Živé či neživé?', pic: '🌱', color: 'var(--sky)', desc: 'Žije to, alebo nežije?', area: 'Človek a príroda', std: 'Vnímanie prírody: Odlišuje živé od neživých súčastí prírody.' },
  { id: 'pexeso', name: 'Pexeso', pic: '🃏', color: 'var(--accent)', desc: 'Nájdi dvojice obrázkov.', area: 'Človek a príroda', std: 'Vnímanie prírody: Rozpráva o prírodných reáliách známeho okolia (pamäť a pozornosť).' },
  { id: 'emocie', name: 'Ako sa cíti?', pic: '😊', color: 'var(--berry)', desc: 'Nájdi tváričku, ktorá sa tak cíti.', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Opíše aktuálne emócie.' },
  { id: 'spravanie', name: 'Správne či nesprávne?', pic: '🤝', color: 'var(--leaf)', desc: 'Je to pekné správanie?', area: 'Človek a spoločnosť', std: 'Ľudské vlastnosti a emócie: Rozlišuje vhodné a nevhodné správanie.' },
  { id: 'materialy', name: 'Z čoho je to?', pic: '🪵', color: 'var(--accent)', desc: 'Drevo, kov, sklo, papier, plast či látka?', area: 'Človek a svet práce', std: 'Materiály a ich vlastnosti: Opisuje predmety a ich rôzne vlastnosti.' },
  { id: 'farby', name: 'Farbičky', pic: '🎨', color: 'var(--berry)', desc: 'Ťukni na správnu farbu.', area: 'Umenie a kultúra', std: 'Výtvarné činnosti s farbou: Pomenuje základné a zmiešané farby.' },
  { id: 'pohyb', name: 'Hýbme sa!', pic: '🤸', color: 'var(--grape)', desc: 'Spočítaj obrázky a toľkokrát sa pohni.', area: 'Zdravie a pohyb', std: 'Pohyb a telesná zdatnosť: Dodržiava pravidlá v pohybových hrách.' },
  { id: 'zdrave', name: 'Zdravé či nezdravé?', pic: '🥦', color: 'var(--leaf)', desc: 'Je to jedlo zdravé?', area: 'Zdravie a pohyb', std: 'Zdravie a zdravý životný štýl: Uvádza príklady zdravej a nezdravej výživy.' },
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
