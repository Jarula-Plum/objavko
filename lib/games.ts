export type GameId =
  | 'pismena' | 'slabiky' | 'pocty' | 'nepatri' | 'tiene' | 'najdi' | 'pexeso'
  | 'emocie' | 'materialy' | 'farby' | 'pohyb'

export type Game = {
  id: GameId
  name: string
  pic: string
  color: string
  desc: string
  area: Area
  goal: string
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
  { id: 'pismena', name: 'Prvé písmenko', pic: '🔤', color: 'var(--leaf)', desc: 'Na aké písmeno začína slovo?', area: 'Jazyk a komunikácia', goal: 'Rozpozná prvú hlásku slova, predčitateľská gramotnosť.' },
  { id: 'slabiky', name: 'Vytlieskaj slabiky', pic: '👏', color: 'var(--sky)', desc: 'Koľko slabík má slovo?', area: 'Jazyk a komunikácia', goal: 'Rozkladá slovo na slabiky, fonologické uvedomovanie.' },
  { id: 'pocty', name: 'Koľko ich je?', pic: '🔢', color: 'var(--accent)', desc: 'Spočítaj obrázky a ťukni na číslo.', area: 'Matematika a práca s informáciami', goal: 'Určí počet predmetov do 8, priradí číslicu.' },
  { id: 'nepatri', name: 'Čo sem nepatrí?', pic: '🤔', color: 'var(--sun)', desc: 'Nájdi obrázok, ktorý nepatrí k téme.', area: 'Matematika a práca s informáciami', goal: 'Triedi predmety podľa spoločného znaku.' },
  { id: 'tiene', name: 'Čí je to tieň?', pic: '🌑', color: 'var(--grape)', desc: 'Priraď obrázok k tieňu.', area: 'Matematika a práca s informáciami', goal: 'Zrakové vnímanie, porovnávanie tvarov.' },
  { id: 'najdi', name: 'Nájdi obrázok', pic: '🔍', color: 'var(--leaf)', desc: 'Počúvaj a ťukni na správny obrázok.', area: 'Človek a príroda', goal: 'Pomenuje a rozlíši predmety a živé bytosti z témy.' },
  { id: 'pexeso', name: 'Pexeso', pic: '🃏', color: 'var(--sky)', desc: 'Nájdi dvojice obrázkov.', area: 'Človek a príroda', goal: 'Pomenuje obrázky z témy, trénuje pozornosť a pamäť.' },
  { id: 'emocie', name: 'Ako sa cíti?', pic: '😊', color: 'var(--berry)', desc: 'Nájdi tváričku, ktorá sa tak cíti.', area: 'Človek a spoločnosť', goal: 'Rozlišuje emócie podľa výrazu tváre.' },
  { id: 'materialy', name: 'Z čoho je to?', pic: '🪵', color: 'var(--accent)', desc: 'Drevo, kov, sklo, papier, plast či látka?', area: 'Človek a svet práce', goal: 'Rozlišuje materiály a ich vlastnosti.' },
  { id: 'farby', name: 'Farbičky', pic: '🎨', color: 'var(--berry)', desc: 'Ťukni na správnu farbu.', area: 'Umenie a kultúra', goal: 'Rozlišuje a pomenuje základné farby.' },
  { id: 'pohyb', name: 'Hýbme sa!', pic: '🤸', color: 'var(--grape)', desc: 'Spočítaj obrázky a toľkokrát sa pohni.', area: 'Zdravie a pohyb', goal: 'Napodobňuje pohyby, koordinácia a pohybová aktivita.' },
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
