'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { GAMES, stars, type Game } from '@/lib/games'
import { Finished, GameView } from './Games'

type Kid = { id: string; name: string; avatar: string }

export default function Play({ classId, className, kids, initialBest }: {
  classId: string; className: string; kids: Kid[]; initialBest: Record<string, Record<string, number>>
}) {
  const [kidId, setKidId] = useState(kids[0]?.id)
  const [game, setGame] = useState<Game | null>(null)
  const [round, setRound] = useState(0)
  const [result, setResult] = useState<number | null>(null)
  const [best, setBest] = useState(initialBest)
  const [saveError, setSaveError] = useState(false)
  const kid = kids.find((k) => k.id === kidId)

  if (!kid) {
    return (
      <section className="panel" style={{ alignItems: 'flex-start' }}>
        <h2 style={{ fontSize: 26 }}>Trieda {className} je zatiaľ prázdna</h2>
        <Link href={`/ucitel/trieda/${classId}`} className="cta">Pridať deti</Link>
      </section>
    )
  }

  const done = async (s: number) => {
    setResult(s)
    setBest((b) => ({ ...b, [kid.id]: { ...b[kid.id], [game!.id]: Math.max(b[kid.id]?.[game!.id] ?? 0, s) } }))
    const { error } = await createClient().from('results').insert({ child_id: kid.id, game_id: game!.id, stars: s })
    setSaveError(Boolean(error))
  }
  const back = () => { setGame(null); setResult(null) }

  if (game && result !== null) {
    return (
      <>
        <Finished game={game} starsN={result} kidName={kid.name} onBack={back}
          onAgain={() => { setResult(null); setRound((r) => r + 1) }} />
        {saveError && <p className="error" role="alert">Výsledok sa nepodarilo uložiť. Skontroluj internet.</p>}
      </>
    )
  }
  if (game) return <GameView key={round} game={game} onDone={done} onBack={back} />

  return (
    <>
      <div className="label">Trieda {className} · kto sa hrá?</div>
      <div className="kids">
        {kids.map((k) => (
          <button key={k.id} className="kid" aria-pressed={k.id === kidId} onClick={() => setKidId(k.id)}>
            <span className="av">{k.avatar}</span>{k.name}
          </button>
        ))}
      </div>
      <div className="label" style={{ marginBottom: 8 }}>Hry pre {kid.name}</div>
      <div className="grid">
        {GAMES.map((g) => {
          const v = best[kid.id]?.[g.id] ?? 0
          return (
            <button key={g.id} className="tile" style={{ ['--c' as string]: g.color }} onClick={() => { setGame(g); setRound((r) => r + 1) }}>
              <span className="pic">{g.pic}</span>
              <h3>{g.name}</h3>
              <p>{g.desc}</p>
              <span className="stars">{v ? stars(v) : 'Ešte nehrané'}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
