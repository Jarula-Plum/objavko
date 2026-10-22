import type { Game } from '@/lib/games'
import { METODIKA } from '@/lib/metodika'

// Metodické usmernenie pre učiteľku: oblasť a štandard ŠVP, cieľ, čo hra rozvíja, postup a diferenciácia
export function Metodika({ game, open }: { game: Game; open?: boolean }) {
  const m = METODIKA[game.id]
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
      </dl>
    </details>
  )
}
