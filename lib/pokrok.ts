import { AREAS, GAMES, type Area } from './games'

// Prehľad pokroku detí podľa vzdelávacích oblastí ŠVP: z výsledkov hier (hviezdičky 1 až 3) zostaví súhrn pre pani učiteľku
export type Vysledok = { child_id: string; game_id: string; stars: number; played_at?: string | null }
export type Oblast = { area: Area; hier: number; zahrane: number; priemer: number; prvy: number; posledny: number; pokusy: number }
export type Suhrn = { oblasti: Oblast[]; pokusy: number; naposledy: string | null; silne: Area[]; podpora: Area[] }

const OBLASTI = AREAS.filter((a) => a !== 'Cvičenia')
const oblast = Object.fromEntries(GAMES.map((g) => [g.id, g.area])) as Record<string, Area>

export function suhrn(vysledky: Vysledok[]): Suhrn {
  const zoradene = [...vysledky].sort((a, b) => String(a.played_at ?? '').localeCompare(String(b.played_at ?? '')))
  const oblasti = OBLASTI.map((area) => {
    const moje = zoradene.filter((v) => oblast[v.game_id] === area)
    // najlepší výsledok v každej hre oblasti
    const najlepsie = new Map<string, number>()
    for (const v of moje) najlepsie.set(v.game_id, Math.max(najlepsie.get(v.game_id) ?? 0, v.stars))
    const hodnoty = [...najlepsie.values()]
    const priemer = hodnoty.length ? hodnoty.reduce((a, b) => a + b, 0) / hodnoty.length : 0
    // pokrok: priemer prvých a posledných troch pokusov v oblasti
    const pr = (xs: Vysledok[]) => (xs.length ? xs.reduce((a, b) => a + b.stars, 0) / xs.length : 0)
    return {
      area, hier: GAMES.filter((g) => g.area === area).length, zahrane: najlepsie.size, priemer,
      prvy: pr(moje.slice(0, 3)), posledny: pr(moje.slice(-3)), pokusy: moje.length,
    }
  })
  const hrane = oblasti.filter((o) => o.zahrane > 0)
  return {
    oblasti,
    pokusy: vysledky.length,
    naposledy: zoradene.at(-1)?.played_at ?? null,
    silne: hrane.filter((o) => o.priemer >= 2.5).map((o) => o.area),
    podpora: hrane.filter((o) => o.priemer < 1.8).map((o) => o.area),
  }
}

const nazov = (a: Area) => a.charAt(0).toLowerCase() + a.slice(1)
const zoznam = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} a ${xs.at(-1)}`)
const vOblasti = (xs: string[]) => `v ${xs.length > 1 ? 'oblastiach' : 'oblasti'} ${zoznam(xs)}`

// Krátky text do hodnotenia dieťaťa (pani učiteľka ho upraví podľa seba); dievca podľa ikonky dieťaťa
export function textHodnotenia(meno: string, s: Suhrn, dievca = false): string {
  const a = dievca ? 'a' : ''
  if (!s.pokusy) return `${meno} zatiaľ v aplikácii Objavko nehral${a} žiadnu hru.`
  const vety: string[] = []
  const hrane = s.oblasti.filter((o) => o.zahrane)
  vety.push(`${meno} v aplikácii Objavko odohral${a} ${s.pokusy} ${s.pokusy === 1 ? 'hru' : s.pokusy < 5 ? 'hry' : 'hier'} v ${hrane.length} ${hrane.length === 1 ? 'oblasti' : 'oblastiach'} ŠVP.`)
  if (s.silne.length) vety.push(`Najviac sa ${dievca ? 'jej' : 'mu'} darí ${vOblasti(s.silne.map(nazov))}, kde úlohy väčšinou zvláda samostatne.`)
  const rast = hrane.filter((o) => o.pokusy >= 4 && o.posledny - o.prvy >= 0.5).map((o) => nazov(o.area))
  if (rast.length) vety.push(`Zlepšenie je vidieť ${vOblasti(rast)}.`)
  if (s.podpora.length) vety.push(`Viac podpory a precvičovania potrebuje ${vOblasti(s.podpora.map(nazov))}.`)
  const nehrane = s.oblasti.filter((o) => !o.zahrane).map((o) => nazov(o.area))
  if (nehrane.length) vety.push(`Hry z ${nehrane.length > 1 ? 'oblastí' : 'oblasti'} ${zoznam(nehrane)} zatiaľ neskúšal${a}.`)
  return vety.join(' ')
}
