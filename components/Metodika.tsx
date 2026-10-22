import type { Game } from '@/lib/games'
import { METODIKA } from '@/lib/metodika'
import { ZAPIS } from '@/lib/zapisy'
import { KopirujZapis } from './Zapis'

// Metodické usmernenie pre učiteľku: oblasť a štandard ŠVP, cieľ, čo hra rozvíja, postup a diferenciácia
export function zapis(game: Game, tema?: string) {
  const oblast = game.area !== 'Cvičenia' ? game.area
    : ({ omalovanky: 'Umenie a kultúra', grafomotorika: 'Jazyk a komunikácia', diktaty: 'Jazyk a komunikácia' } as Record<string, string>)[game.id] ?? 'Zdravie a pohyb'
  const co = ZAPIS[game.id].replace(/^Deti (.)/, (_, c: string) => c.toUpperCase())
  const std = game.std
    .replace(/\s*\((Hejn|Montessori|opis činnosti)[^)]*\)/g, '')
    .replace(/ŠVP/g, 'Štátneho vzdelávacieho programu')
    .replace(/napr\./g, 'napríklad')
  return [
    tema && `${tema}`,
    `Vzdelávacia aktivita (${oblast}): Deti hrali v aplikácii Objavko didaktickú hru „${game.name}“. ${co}`,
    `Výkonový štandard: ${std}`,
  ].filter(Boolean).join('\n')
}

export function Metodika({ game, open, tema }: { game: Game; open?: boolean; tema?: string }) {
  const m = METODIKA[game.id]
  const z = zapis(game, tema)
  return (
    <details className="metodika" open={open}>
      <summary>Metodické usmernenie pre pani učiteľku</summary>
      <dl>
        <dt>Vzdelávacia oblasť</dt><dd>{game.area === 'Cvičenia' ? 'Prierezovo (pozri štandard)' : game.area}</dd>
        <dt>Výkonový štandard ŠVP</dt><dd>{game.std}</dd>
        <dt>Cieľ činnosti</dt><dd>{m.ciel}</dd>
        <dt>Čo hra rozvíja</dt><dd><ul>{m.rozvija.map((r) => <li key={r}>{r}</li>)}</ul></dd>
        <dt>Metodický postup</dt><dd>{m.postup}</dd>
        <dt>Diferenciácia podľa veku</dt><dd>{m.dif}</dd>
        <dt>Možný zápis do triednej knihy</dt><dd><p className="zapis">{z}</p><KopirujZapis text={z} /></dd>
      </dl>
    </details>
  )
}
