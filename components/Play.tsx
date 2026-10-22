'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AREAS, GAMES, type Game } from '@/lib/games'
import { MONTHS, THEMES, currentTheme, themeOf } from '@/lib/themes'
import { Finished, GameView, LEVELS, type Level } from './Games'
import { Icon, Stars, Ui, emo } from './Emo'
import { GuideHello } from './Guide'
import { Metodika } from './Metodika'
import { VoicePicker } from './VoicePicker'
import { CVIKY, NAMETY } from '@/lib/namety'

// Poradové číslo týždňa (pondelok až nedeľa) od roku 1970
const weekNo = () => Math.floor((Date.now() / 864e5 - 4 + new Date().getTimezoneOffset() / -1440) / 7)

const TIPS = [
  { id: 'riekanka', name: 'Zdravotné cvičenia', desc: 'Riekanka s cvikmi pre 3 vekové skupiny.', img: '/ikony/zdravotne.webp', color: 'var(--leaf)' },
  { id: 'ranne', name: 'Ranné aktivity', desc: 'Čo robiť ráno pri príchode detí.', img: '/skriatok/d-ranne-vstavanie.webp', color: 'var(--sun)' },
  { id: 'hry', name: 'Hry a herné činnosti', desc: 'Námety, čo sa hrať k téme.', img: '/skriatok/d-hra-s-kockami.webp', color: 'var(--grape)' },
  { id: 'pohyb', name: 'Pohybové hry', desc: 'Hry s vysvetlením pravidiel.', img: '/ikony/pohyb.webp', color: 'var(--sky)' },
] as const
type TipId = (typeof TIPS)[number]['id']

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
  const [tip, setTip] = useState<TipId | null>(null)
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
  if (tip && NAMETY[theme.id]) {
    const n = NAMETY[theme.id], t = TIPS.find((x) => x.id === tip)!
    return (
      <section className="namety-view" style={{ ['--c' as string]: t.color }}>
        <button className="back" onClick={() => setTip(null)}><Ui n="spat" /> Späť</button>
        <div className="namety-head"><Icon pic="" img={t.img} /><div><h2>{t.name}</h2><span>Téma: {theme.name}</span></div></div>
        {tip === 'ranne' && <ul className="namety-list">{n.r.map((x) => <li key={x}>{x}</li>)}</ul>}
        {tip === 'hry' && <ul className="namety-list">{n.h.map(([a, b]) => <li key={a}><b>{a}</b>{b}</li>)}</ul>}
        {tip === 'pohyb' && <ul className="namety-list">{n.p.map(([a, b]) => <li key={a}><b>{a}</b><span className="rule">Pravidlá:</span> {b}</li>)}</ul>}
        {tip === 'riekanka' && (
          <button className="cta" onClick={() => { setTip(null); setGame(GAMES.find((g) => g.id === 'zdravotne')!); setRound((r) => r + 1) }}>{emo('🤸')} Cvičiť so škriatkom</button>
        )}
        {tip === 'riekanka' && (
          <ol className="namety-list">
            {n.z.map(([v, c], k) => (
              <li key={k}><b>{v}</b>
                <ul className="vek">{CVIKY[c].t.map((x, i) => <li key={i}><span>{LEVELS[i].name}:</span> {x}</li>)}</ul>
              </li>
            ))}
          </ol>
        )}
      </section>
    )
  }
  if (game) return <><GameView key={round} game={game} theme={theme} level={level} onDone={done} onBack={back} /><Metodika game={game} /></>

  return (
    <>
      <GuideHello text={`Ahoj, ${kid.name}! Poď sa s nami hrať.`} />
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
      <VoicePicker />
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
        <span aria-hidden="true"><Icon pic={theme.pic} img={theme.img} /></span>
        <div>
          <strong>{theme.name}</strong>
          <span>{emo(theme.items.map((x) => x.e).join(' '))}</span>
        </div>
      </div>
      {NAMETY[theme.id] && (
        <section className="area">
          <h2>Námety k téme pre pani učiteľku</h2>
          <div className="grid">
            {TIPS.map((t) => (
              <button key={t.id} className="tile" style={{ ['--c' as string]: t.color }} onClick={() => { setTip(t.id); window.scrollTo(0, 0) }}>
                <span className="pic"><Icon pic="" img={t.img} /></span>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </button>
            ))}
          </div>
        </section>
      )}
      <div className="label">Hry pre {kid.name} · {LEVELS[level - 1].name}</div>
      {AREAS.map((area) => (
        <section key={area} className="area">
          <h2>{area}</h2>
          <div className="grid">
            {GAMES.filter((g) => g.area === area).map((g) => {
              const v = best[kid.id]?.[g.id] ?? 0
              return (
                <button key={g.id} className="tile" style={{ ['--c' as string]: g.color }} onClick={() => { setGame(g); setRound((r) => r + 1) }}>
                  <span className="pic"><Icon pic={g.pic} img={g.img} /></span>
                  <h3>{g.name}</h3>
                  <p>{g.desc}</p>
                  <span className="stars">{v ? <Stars n={v} /> : 'Ešte nehrané'}</span>
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
