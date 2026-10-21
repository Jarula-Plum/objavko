export type GameId = 'pexeso' | 'pocty' | 'farby' | 'tiene' | 'pismena'

export type Game = {
  id: GameId
  name: string
  pic: string
  color: string
  desc: string
  area: string
  goal: string
}

// Každá hra je naviazaná na vzdelávaciu oblasť Štátneho vzdelávacieho programu pre MŠ.
export const GAMES: Game[] = [
  { id: 'pexeso', name: 'Pexeso', pic: '🐻', color: 'var(--sky)', desc: 'Nájdi dvojice zvieratiek.', area: 'Človek a príroda', goal: 'Pomenuje zvieratá, trénuje pozornosť a pamäť.' },
  { id: 'pocty', name: 'Koľko ich je?', pic: '🍎', color: 'var(--accent)', desc: 'Spočítaj veci a ťukni na číslo.', area: 'Matematika a práca s informáciami', goal: 'Určí počet predmetov do 8, priradí číslicu.' },
  { id: 'farby', name: 'Farbičky', pic: '🎨', color: 'var(--berry)', desc: 'Ťukni na správnu farbu.', area: 'Umenie a kultúra (výtvarná výchova)', goal: 'Rozlišuje a pomenuje základné farby.' },
  { id: 'tiene', name: 'Čí je to tieň?', pic: '🦒', color: 'var(--grape)', desc: 'Priraď obrázok k tieňu.', area: 'Matematika a práca s informáciami', goal: 'Zrakové vnímanie, porovnávanie tvarov.' },
  { id: 'pismena', name: 'Prvé písmenko', pic: '🔤', color: 'var(--leaf)', desc: 'Na aké písmeno začína slovo?', area: 'Jazyk a komunikácia', goal: 'Rozpozná prvú hlásku slova, predčitateľská gramotnosť.' },
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
