'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GAMES, type Game } from '@/lib/games'
import { currentTheme } from '@/lib/themes'
import { Finished, GameView } from './Games'
import { Icon, Ui } from './Emo'
import { GuideHello } from './Guide'

// Ukážka bez prihlásenia: niekoľko hier k aktuálnej téme, výsledky sa nikam neukladajú
const UKAZKA = ['hadanky', 'pocty', 'rymy', 'krokovanie', 'triedenie', 'omalovanky']

export function Ukazka() {
  const theme = currentTheme()
  const [game, setGame] = useState<Game | null>(null)
  const [vysledok, setVysledok] = useState<number | null>(null)
  const [kolo, setKolo] = useState(0)
  const hry = UKAZKA.map((id) => GAMES.find((g) => g.id === id)!).filter(Boolean)
  const spat = () => { setGame(null); setVysledok(null) }

  if (game && vysledok !== null) return <Finished game={game} starsN={vysledok} kidName="" onBack={spat} onAgain={() => { setVysledok(null); setKolo((k) => k + 1) }} />
  if (game) return <GameView key={kolo} game={game} theme={theme} level={2} onDone={setVysledok} onBack={spat} />
  return (
    <>
      <GuideHello text="Ahoj! Sme Čarozvedko a Čarozvedka. Vyber si hru a poď sa s nami hrať!" />
      <div className="label">Ukážka k téme: {theme.name}</div>
      <div className="grid">
        {hry.map((g) => (
          <button key={g.id} className="tile" style={{ ['--c' as string]: g.color }} onClick={() => { setGame(g); setKolo((k) => k + 1) }}>
            <span className="pic"><Icon pic={g.pic} img={g.img} /></span>
            <h3>{g.name}</h3>
            <p>{g.desc}</p>
          </button>
        ))}
      </div>
      <p className="note">Toto je ukážka {hry.length} z {GAMES.length} hier. Po registrácii máte všetky hry, témy na celý rok, rozprávky, námety pre pani učiteľku a prehľad pokroku detí.</p>
      <Link href="/prihlasenie?rezim=registracia" className="cta" style={{ alignSelf: 'flex-start' }}><Ui n="hraj" /> Vyskúšať zadarmo</Link>
    </>
  )
}
