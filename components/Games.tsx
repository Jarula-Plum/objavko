'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { stars, type Game } from '@/lib/games'
import { THEMES, firstLetter, syllables, type Theme } from '@/lib/themes'

export function say(text: string) {
  try {
    if (!('speechSynthesis' in window)) return
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'sk-SK'
    u.rate = 0.9
    const voice = speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith('sk'))
    if (voice) u.voice = voice
    speechSynthesis.speak(u)
  } catch {}
}

const shuffle = <T,>(a: T[]) => {
  const b = a.slice()
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}
const pick = <T,>(a: T[], n: number) => shuffle(a).slice(0, n)

type Option = { content: ReactNode; correct: boolean; label: string; word?: boolean }
type Round = { prompt: ReactNode; stage?: ReactNode; speech: string; options: Option[] }

function Shell({ game, onBack, speech, dots, children }: {
  game: Game; onBack: () => void; speech: string; dots?: { i: number; log: boolean[] }; children: ReactNode
}) {
  return (
    <section className="game" style={{ ['--c' as string]: game.color }}>
      <div className="ghead">
        <button className="back" onClick={() => { try { speechSynthesis.cancel() } catch {} ; onBack() }}>← Späť</button>
        {dots && (
          <div className="dots" aria-label={`Kolo ${Math.min(dots.i + 1, 5)} z 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} className={`${dots.log[i] === true ? 'ok' : dots.log[i] === false ? 'no' : ''} ${i === dots.i ? 'now' : ''}`} />
            ))}
          </div>
        )}
        <button className="speak" onClick={() => say(speech)}>🔊 Zopakuj</button>
      </div>
      {children}
    </section>
  )
}

export function Finished({ game, starsN, kidName, onAgain, onBack }: {
  game: Game; starsN: number; kidName: string; onAgain: () => void; onBack: () => void
}) {
  const praise = starsN === 3 ? 'Výborne!' : starsN === 2 ? 'Šikovné!' : 'Dobrý pokus!'
  useEffect(() => { say(praise) }, [praise])
  return (
    <Shell game={game} onBack={onBack} speech={praise}>
      <div className="done-box">
        <div className="big-stars">{stars(starsN)}</div>
        <h2 style={{ fontSize: 36 }}>{praise} {kidName}</h2>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="cta" onClick={onAgain}>Hrať znova</button>
          <button className="ghost" onClick={onBack}>Iné hry</button>
        </div>
      </div>
    </Shell>
  )
}

function Quiz({ game, rounds, onDone, onBack }: { game: Game; rounds: Round[]; onDone: (s: number) => void; onBack: () => void }) {
  const [i, setI] = useState(0)
  const [log, setLog] = useState<boolean[]>([])
  const [missed, setMissed] = useState(false)
  const [right, setRight] = useState<number | null>(null)
  const [wrong, setWrong] = useState<{ idx: number; n: number } | null>(null)
  const r = rounds[i]

  useEffect(() => { if (r) say(r.speech) }, [r])

  const choose = (idx: number) => {
    if (right !== null) return
    if (r.options[idx].correct) {
      setRight(idx)
      const next = [...log, !missed]
      setLog(next)
      setTimeout(() => {
        if (i + 1 >= rounds.length) {
          const ok = next.filter(Boolean).length
          onDone(ok === 5 ? 3 : ok >= 3 ? 2 : 1)
        } else {
          setI(i + 1); setMissed(false); setRight(null); setWrong(null)
        }
      }, 750)
    } else {
      setMissed(true)
      setWrong({ idx, n: (wrong?.n ?? 0) + 1 })
      say('Skús ešte raz')
    }
  }

  return (
    <Shell game={game} onBack={onBack} speech={r.speech} dots={{ i, log }}>
      <div className="prompt">{r.prompt}</div>
      {r.stage && <div className="stage">{r.stage}</div>}
      <div className="opts">
        {r.options.map((o, idx) => (
          <button
            key={`${i}-${idx}-${wrong?.idx === idx ? wrong.n : 0}`}
            className={`opt ${o.word ? 'word' : ''} ${right === idx ? 'right' : ''} ${wrong?.idx === idx ? 'wrong' : ''}`}
            aria-label={o.label}
            onClick={() => choose(idx)}
          >
            {o.content}
          </button>
        ))}
      </div>
    </Shell>
  )
}

function Memory({ game, theme, onDone, onBack }: { game: Game; theme: Theme; onDone: (s: number) => void; onBack: () => void }) {
  const [deck] = useState(() => {
    const pics = pick(theme.items.map((t) => t.e), 6)
    return shuffle([...pics, ...pics])
  })
  const [open, setOpen] = useState<number[]>([])
  const [done, setDone] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const speech = 'Nájdi dva rovnaké obrázky.'
  useEffect(() => { say(speech) }, [])

  const flip = (idx: number) => {
    if (open.length === 2 || open.includes(idx) || done.includes(idx)) return
    const o = [...open, idx]
    setOpen(o)
    if (o.length < 2) return
    const m = moves + 1
    setMoves(m)
    if (deck[o[0]] === deck[o[1]]) {
      const d = [...done, ...o]
      setDone(d); setOpen([])
      if (d.length === deck.length) setTimeout(() => onDone(m <= 9 ? 3 : m <= 13 ? 2 : 1), 700)
    } else {
      setTimeout(() => setOpen([]), 900)
    }
  }

  return (
    <Shell game={game} onBack={onBack} speech={speech}>
      <div className="prompt">Nájdi dva <b>rovnaké</b> obrázky</div>
      <div className="memo">
        {deck.map((e, idx) => {
          const shown = open.includes(idx) || done.includes(idx)
          return (
            <button key={idx} className={`card ${open.includes(idx) ? 'open' : ''} ${done.includes(idx) ? 'done' : ''}`}
              aria-label={shown ? theme.items.find((t) => t.e === e)?.w.toLowerCase() ?? e : 'Kartička'} onClick={() => flip(idx)}>
              <span>{e}</span>
            </button>
          )
        })}
      </div>
      <p className="note" style={{ textAlign: 'center' }}>Ťahy: {moves}</p>
    </Shell>
  )
}

const NUM_WORDS = ['', 'jedna', 'dva', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem']
const COLORS = [
  { n: 'červenú', v: '#E53935' }, { n: 'modrú', v: '#1E63D6' }, { n: 'zelenú', v: '#2E9D4F' },
  { n: 'žltú', v: '#FFD21F' }, { n: 'oranžovú', v: '#FF8A1F' }, { n: 'fialovú', v: '#8E44C9' },
]
const LETTERS = 'ABCČDEFGHIJKLĽMNOPRSŠTUVZŽ'.split('')
const FACES = [
  { e: '😀', n: 'veselú' }, { e: '😢', n: 'smutnú' }, { e: '😠', n: 'nahnevanú' },
  { e: '😮', n: 'prekvapenú' }, { e: '😨', n: 'vystrašenú' }, { e: '😴', n: 'ospalú' },
]
const MATERIALS = ['DREVO', 'KOV', 'SKLO', 'PAPIER', 'PLAST', 'LÁTKA']
const THINGS = [
  { e: '🪑', w: 'stolička', m: 'DREVO' }, { e: '🪵', w: 'poleno', m: 'DREVO' }, { e: '✏️', w: 'ceruzka', m: 'DREVO' }, { e: '🪜', w: 'rebrík', m: 'DREVO' },
  { e: '🥄', w: 'lyžica', m: 'KOV' }, { e: '🔑', w: 'kľúč', m: 'KOV' }, { e: '🔨', w: 'kladivo', m: 'KOV' }, { e: '🪙', w: 'minca', m: 'KOV' },
  { e: '🍾', w: 'fľaša', m: 'SKLO' }, { e: '🪟', w: 'okno', m: 'SKLO' }, { e: '👓', w: 'okuliare', m: 'SKLO' }, { e: '🥛', w: 'pohár', m: 'SKLO' },
  { e: '📰', w: 'noviny', m: 'PAPIER' }, { e: '📖', w: 'kniha', m: 'PAPIER' }, { e: '✉️', w: 'obálka', m: 'PAPIER' }, { e: '📦', w: 'krabica', m: 'PAPIER' },
  { e: '🥤', w: 'pohárik', m: 'PLAST' }, { e: '🪣', w: 'vedierko', m: 'PLAST' }, { e: '🧸', w: 'hračka', m: 'PLAST' }, { e: '🪥', w: 'kefka na zuby', m: 'PLAST' },
  { e: '🧦', w: 'ponožka', m: 'LÁTKA' }, { e: '👕', w: 'tričko', m: 'LÁTKA' }, { e: '🧣', w: 'šál', m: 'LÁTKA' }, { e: '🧤', w: 'rukavice', m: 'LÁTKA' },
]
const MOVES = ['vyskoč', 'tlieskni', 'urob drep', 'dupni nohou', 'zamávaj rukami ako vtáčik', 'skoč ako žabka', 'otoč sa dokola', 'natiahni sa k slniečku']

function makeRounds(id: Game['id'], theme: Theme): Round[] {
  const range = Array.from({ length: 5 }, (_, i) => i)
  if (id === 'pocty') {
    return range.map(() => {
      const n = 1 + Math.floor(Math.random() * 8)
      const item = theme.items[Math.floor(Math.random() * theme.items.length)]
      const nums = shuffle([n, ...pick([1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x !== n), 2)])
      return {
        prompt: <>Koľko ich je? <b>Spočítaj</b></>, stage: Array(n).fill(item.e).join(''), speech: 'Spočítaj, koľko ich je.',
        options: nums.map((x) => ({ content: x, correct: x === n, label: NUM_WORDS[x] })),
      }
    })
  }
  if (id === 'farby') {
    const order = shuffle(COLORS)
    return range.map((i) => {
      const t = order[i]
      return {
        prompt: <>Ťukni na <b>{t.n}</b> farbu</>, speech: `Ťukni na ${t.n} farbu.`,
        options: shuffle([t, ...pick(COLORS.filter((c) => c !== t), 3)]).map((c) => ({
          content: <span className="swatch" style={{ background: c.v }} />, correct: c === t, label: c.n,
        })),
      }
    })
  }
  if (id === 'tiene') {
    const items = shuffle(theme.items)
    return range.map((i) => {
      const t = items[i]
      return {
        prompt: <>Ktorý <b>tieň</b> patrí k obrázku?</>, stage: t.e, speech: `Ktorý tieň patrí k obrázku ${t.w.toLowerCase()}?`,
        options: shuffle([t, ...pick(items.filter((x) => x !== t), 2)]).map((x) => ({
          content: <span className="shadow">{x.e}</span>, correct: x === t, label: 'tieň',
        })),
      }
    })
  }
  if (id === 'nepatri') {
    const ownEmoji = new Set(theme.items.map((t) => t.e))
    const others = THEMES.filter((t) => t.id !== theme.id).flatMap((t) => t.items).filter((x) => !ownEmoji.has(x.e))
    return range.map(() => {
      const odd = others[Math.floor(Math.random() * others.length)]
      return {
        prompt: <>Čo sem <b>nepatrí</b>? Téma: {theme.name.toLowerCase()}</>, speech: `Ktorý obrázok sem nepatrí? Téma je ${theme.name.toLowerCase()}.`,
        options: shuffle([...pick(theme.items, 3).map((x) => ({ x, correct: false })), { x: odd, correct: true }]).map(({ x, correct }) => ({
          content: x.e, correct, label: x.w.toLowerCase(),
        })),
      }
    })
  }
  if (id === 'slabiky') {
    const order = shuffle(theme.items.filter((x) => syllables(x) <= 4))
    return range.map((i) => {
      const x = order[i % order.length]
      const n = syllables(x)
      return {
        prompt: <>Vytlieskaj slovo <b>{x.w.toLowerCase()}</b>. Koľko slabík má?</>, stage: x.e,
        speech: `Vytlieskaj slovo ${x.w.toLowerCase()}. Koľko slabík má?`,
        options: [1, 2, 3, 4].map((k) => ({ content: k, correct: k === n, label: NUM_WORDS[k] })),
      }
    })
  }
  if (id === 'najdi') {
    const order = shuffle(theme.items)
    return range.map((i) => {
      const t = order[i]
      return {
        prompt: <>Ťukni na obrázok: <b>{t.w.toLowerCase()}</b></>, speech: `Ťukni na obrázok ${t.w.toLowerCase()}.`,
        options: shuffle([t, ...pick(order.filter((x) => x !== t), 3)]).map((x) => ({ content: x.e, correct: x === t, label: x.w.toLowerCase() })),
      }
    })
  }
  if (id === 'emocie') {
    const order = shuffle(FACES)
    return range.map((i) => {
      const f = order[i]
      return {
        prompt: <>Ťukni na <b>{f.n}</b> tváričku</>, speech: `Ťukni na ${f.n} tváričku.`,
        options: shuffle([f, ...pick(FACES.filter((x) => x !== f), 3)]).map((x) => ({ content: x.e, correct: x === f, label: x.n })),
      }
    })
  }
  if (id === 'materialy') {
    const order = shuffle(THINGS)
    return range.map((i) => {
      const t = order[i]
      return {
        prompt: <>Z čoho je <b>{t.w}</b>?</>, stage: t.e, speech: `Z čoho je ${t.w}?`,
        options: shuffle([t.m, ...pick(MATERIALS.filter((m) => m !== t.m), 2)]).map((m) => ({
          content: m.toLowerCase(), correct: m === t.m, label: m.toLowerCase(), word: true,
        })),
      }
    })
  }
  if (id === 'pohyb') {
    const moves = shuffle(MOVES)
    return range.map((i) => {
      const n = 2 + Math.floor(Math.random() * 4)
      const item = theme.items[Math.floor(Math.random() * theme.items.length)]
      const m = moves[i]
      return {
        prompt: <><b>{m[0].toUpperCase() + m.slice(1)}</b> toľkokrát, koľko vidíš obrázkov</>, stage: Array(n).fill(item.e).join(''),
        speech: `Spočítaj obrázky a ${m} toľkokrát.`,
        options: [{ content: 'Hotovo ✓', correct: true, label: 'hotovo', word: true }],
      }
    })
  }
  // pismena
  const order = shuffle(theme.items)
  return range.map((i) => {
    const { w, e } = order[i]
    const first = firstLetter(w)
    const letters = shuffle([first, ...pick(LETTERS.filter((x) => x !== first && x !== w[0]), 2)])
    return {
      prompt: <>Na aké písmeno začína slovo <b>{w.toLowerCase()}</b>?</>, stage: e, speech: `Na aké písmeno začína slovo ${w.toLowerCase()}?`,
      options: letters.map((l) => ({ content: l, correct: l === first, label: l })),
    }
  })
}

export function GameView({ game, theme, onDone, onBack }: { game: Game; theme: Theme; onDone: (s: number) => void; onBack: () => void }) {
  const [rounds] = useState(() => (game.id === 'pexeso' ? [] : makeRounds(game.id, theme)))
  if (game.id === 'pexeso') return <Memory game={game} theme={theme} onDone={onDone} onBack={onBack} />
  return <Quiz game={game} rounds={rounds} onDone={onDone} onBack={onBack} />
}
