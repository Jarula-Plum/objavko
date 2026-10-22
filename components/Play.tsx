'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREAS, GAMES, stars, type Game } from '@/lib/games'
import { MONTHS, THEMES, currentTheme, themeOf } from '@/lib/themes'
import { Finished, GameView, LEVELS, type Level } from './Games'
import { emo } from './Emo'

// Poradové číslo týždňa (pondelok až nedeľa) od roku 1970
const weekNo = () => Math.floor((Date.now() / 864e5 - 4 + new Date().getTimezoneOffset() / -1440) / 7)

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
  const [themeId, setThemeId] = useState(() => currentTheme().id)
  const theme = themeOf(themeId) ?? currentTheme()

  // Remember the chosen theme per class on this device, only for the current week
  const themeKey = `objavko-tema-${classId}`
  useEffect(() => {
    try {
      const [t, wk] = (localStorage.getItem(themeKey) ?? '').split('|')
      if (themeOf(t) && Number(wk) === weekNo()) setThemeId(t)
    } catch {}
  }, [themeKey])
  const chooseTheme = (id: string) => {
    setThemeId(id)
    try { localStorage.setItem(themeKey, `${id}|${weekNo()}`) } catch {}
  }
  const kid = kids.find((k) => k.id === kidId)

  // Úroveň (vek) si pamätáme pre každé dieťa na tomto zariadení
  const [levels, setLevels] = useState<Record<string, Level>>({})
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('objavko-urovne') ?? '{}')
      if (saved && typeof saved === 'object') setLevels(saved)
    } catch {}
  }, [])
  const level: Level = (kid && [1, 2, 3].includes(levels[kid.id]) ? levels[kid.id] : 2) as Level
  const chooseLevel = (n: Level) => {
    if (!kid) return
    const next = { ...levels, [kid.id]: n }
    setLevels(next)
    try { localStorage.setItem('objavko-urovne', JSON.stringify(next)) } catch {}
  }

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
  if (game) return <GameView key={round} game={game} theme={theme} level={level} onDone={done} onBack={back} />

  return (
    <>
      <div className="label">Trieda {className} · kto sa hrá?</div>
      <div className="kids">
        {kids.map((k) => (
          <button key={k.id} className="kid" aria-pressed={k.id === kidId} onClick={() => setKidId(k.id)}>
            <span className="av">{emo(k.avatar)}</span>{k.name}
          </button>
        ))}
      </div>
      <div className="label">Úroveň pre {kid.name}</div>
      <div className="levels" role="radiogroup" aria-label={`Úroveň pre ${kid.name}`}>
        {LEVELS.map((l) => (
          <button key={l.n} role="radio" aria-checked={l.n === level} className="level" onClick={() => chooseLevel(l.n)}>
            <span aria-hidden="true">{emo(l.pic)}</span>{l.name}
          </button>
        ))}
      </div>
      <label className="label" htmlFor="tema">Téma týždňa</label>
      <select id="tema" className="theme-pick" value={theme.id} onChange={(e) => chooseTheme(e.target.value)}>
        {MONTHS.map((m) => (
          <optgroup key={m.n} label={`${m.name} · ${m.title}`}>
            {THEMES.filter((t) => t.month === m.n).map((t) => (
              <option key={t.id} value={t.id}>{t.week ? `${t.week}. týždeň: ` : t.month ? 'Navyše: ' : ''}{t.name}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className="theme-now">
        <span aria-hidden="true">{emo(theme.pic)}</span>
        <div>
          <strong>{theme.name}</strong>
          <span>{emo(theme.items.map((x) => x.e).join(' '))}</span>
        </div>
      </div>
      <div className="label">Hry pre {kid.name} · {LEVELS[level - 1].name}</div>
      {AREAS.map((area) => (
        <section key={area} className="area">
          <h2>{area}</h2>
          <div className="grid">
            {GAMES.filter((g) => g.area === area).map((g) => {
              const v = best[kid.id]?.[g.id] ?? 0
              return (
                <button key={g.id} className="tile" style={{ ['--c' as string]: g.color }} onClick={() => { setGame(g); setRound((r) => r + 1) }}>
                  <span className="pic">{emo(g.pic)}</span>
                  <h3>{g.name}</h3>
                  <p>{g.desc}</p>
                  <span className="stars">{v ? stars(v) : 'Ešte nehrané'}</span>
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
