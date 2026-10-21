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

type Option = { content: ReactNode; correct: boolean; label: string; word?: boolean; spot?: string }
type Round = {
  prompt: ReactNode; stage?: ReactNode; speech: string; options: Option[]
  // hide: odpovede sa ukážu až po tomto čase (ms); play: zvuk kola; cross: rozloženie hore/dole/vľavo/vpravo/v strede
  hide?: number; play?: () => void; cross?: boolean
}

// Jednoduché zvuky cez Web Audio: údery bubna a tóny
let audio: AudioContext | null = null
function tone(freq: number, at: number, len: number, kind: OscillatorType = 'sine') {
  try {
    audio ??= new AudioContext()
    const t = audio.currentTime + at
    const o = audio.createOscillator(), g = audio.createGain()
    o.type = kind; o.frequency.setValueAtTime(freq, t)
    if (kind === 'triangle') o.frequency.exponentialRampToValueAtTime(freq / 2, t + len)
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + len)
    o.connect(g).connect(audio.destination); o.start(t); o.stop(t + len + 0.05)
  } catch {}
}
const drum = (n: number, wait: number) => { for (let k = 0; k < n; k++) tone(140, wait + k * 0.6, 0.35, 'triangle') }

function Shell({ game, onBack, speech, dots, onRepeat, children }: {
  game: Game; onBack: () => void; speech: string; dots?: { i: number; log: boolean[] }; onRepeat?: () => void; children: ReactNode
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
        <button className="speak" onClick={() => (onRepeat ? onRepeat() : say(speech))}>🔊 Zopakuj</button>
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

  const [shown, setShown] = useState(true)
  useEffect(() => {
    if (!r) return
    say(r.speech)
    r.play?.()
    setShown(!r.hide)
    if (!r.hide) return
    const t = setTimeout(() => setShown(true), r.hide)
    return () => clearTimeout(t)
  }, [r])

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
    <Shell game={game} onBack={onBack} speech={r.speech} dots={{ i, log }} onRepeat={() => { say(r.speech); r.play?.() }}>
      <div className="prompt">{r.prompt}</div>
      {r.stage && <div className="stage">{r.stage}</div>}
      <div className={`opts ${r.cross ? 'cross' : ''}`} style={{ visibility: shown ? 'visible' : 'hidden' }}>
        {r.options.map((o, idx) => (
          <button
            key={`${i}-${idx}-${wrong?.idx === idx ? wrong.n : 0}`}
            className={`opt ${o.word ? 'word' : ''} ${right === idx ? 'right' : ''} ${wrong?.idx === idx ? 'wrong' : ''}`}
            aria-label={o.label}
            style={o.spot ? { gridArea: o.spot } : undefined}
            onClick={() => choose(idx)}
          >
            {o.content}
          </button>
        ))}
      </div>
    </Shell>
  )
}

function Memory({ game, theme, level, onDone, onBack }: { game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void }) {
  const pairs = [3, 4, 6][level - 1]
  const [deck] = useState(() => {
    const pics = pick(theme.items.map((t) => t.e), pairs)
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
      if (d.length === deck.length) setTimeout(() => onDone(m <= pairs * 1.5 ? 3 : m <= pairs * 2.2 ? 2 : 1), 700)
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
// Človek a príroda: živé bytosti; jedlo, časti tela a rozprávkové bytosti sa v hre Živé či neživé nepýtame
const LIVE = new Set(('DIEŤA MAČKA PES KRČEK RYBKA BABKA DEDKO KOHÚT JEŽ JEŽKO VEVERIČKA MEDVEĎ LÍŠKA KAČKA LABUŤ LASTOVIČKA ' +
  'LEKÁRKA POLICAJT TUČNIAK KAPOR ZAJAC SRNKA SOVA SÝKORKA LYŽIAR KLAUN TANEČNICA HASIČ KUCHÁRKA FARMÁR UČITEĽKA STAVBÁR ' +
  'KOZMONAUT ŽABA RYBA BOBOR VYDRA KORYTNAČKA RAK KRAVA PRASA OVCA KOZA KÔŇ TULIPÁN KLÍČOK VČELA MOTÝĽ LIENKA KVET VTÁČIK ' +
  'KURIATKO ZAJAČIK BARANČEK STROM SMREK JELEŇ DIVIAK SLNEČNICA KAKTUS MAMA OTEC BÁBÄTKO SESTRA BRAT MRAVEC HÚSENICA KOBYLKA ' +
  'SLIMÁK BYLINKA ĎATELINA LEV SLON ŽIRAFA ZEBRA OPICA KROKODÍL HROCH').split(' '))
const UNSURE = new Set(('JABLKO HRUŠKA HROZNO MRKVA ZEMIAK KUKURICA TEKVICA GAŠTAN CHLIEB MLIEKO KOLÁČ CITRÓN MED BROKOLICA ' +
  'CUKRÍK HRANOLKY HAMBURGER LÍZANKA MANDARÍNKA ČOKOLÁDA KOLÁČIK ŠIŠKA VAJÍČKO JAHODA UHORKA BAKLAŽÁN ČAJ CESNAK TORTA MELÓN ' +
  'ZMRZLINA KYTICA HRIB LIST KOSŤ BACIL DRAK VÍLA ČARODEJNÍK PRINCEZNÁ JEDNOROŽEC ANJEL ČERT MIKULÁŠ MAMUT DINOSAURUS OKO UCHO ' +
  'NOS ÚSTA RUKA NOHA ZUB MOZOG JAZYK RODINA SNEHULIAK ROBOT VODA KVAPKA').split(' '))
const BEHAVIOUR = [
  { e: '🤝', t: 'Podelím sa s kamarátom o hračky.', ok: true }, { e: '🧹', t: 'Pomôžem upratať hračky.', ok: true },
  { e: '👋', t: 'Ráno pozdravím: Dobré ráno!', ok: true }, { e: '🙏', t: 'Poviem prosím a ďakujem.', ok: true },
  { e: '🧼', t: 'Pred jedlom si umyjem ruky.', ok: true }, { e: '🤗', t: 'Utíšim smutného kamaráta.', ok: true },
  { e: '🚦', t: 'Cez cestu idem len na zelenú.', ok: true }, { e: '👂', t: 'Počúvam, keď niekto rozpráva.', ok: true },
  { e: '👊', t: 'Udriem kamaráta.', ok: false }, { e: '🍬', t: 'Vezmem kamarátovi cukrík bez opýtania.', ok: false },
  { e: '😡', t: 'Kričím a búcham dverami.', ok: false }, { e: '⚽', t: 'Vybehnem za loptou na cestu.', ok: false },
  { e: '🧸', t: 'Vytrhnem kamarátovi hračku z ruky.', ok: false }, { e: '🌷', t: 'Trhám kvety v parku.', ok: false },
  { e: '📚', t: 'Hodím knihu na zem.', ok: false }, { e: '🗣️', t: 'Skáčem druhým do reči.', ok: false },
]
const FOOD = [
  { e: '🍎', w: 'jablko', ok: true }, { e: '🥕', w: 'mrkva', ok: true }, { e: '🥦', w: 'brokolica', ok: true }, { e: '🍌', w: 'banán', ok: true },
  { e: '🥛', w: 'mlieko', ok: true }, { e: '🍇', w: 'hrozno', ok: true }, { e: '💧', w: 'voda', ok: true }, { e: '🥒', w: 'uhorka', ok: true },
  { e: '🍐', w: 'hruška', ok: true }, { e: '🥗', w: 'šalát', ok: true }, { e: '🐟', w: 'ryba', ok: true }, { e: '🥚', w: 'vajíčko', ok: true },
  { e: '🍭', w: 'lízanka', ok: false }, { e: '🍬', w: 'cukrík', ok: false }, { e: '🍟', w: 'hranolky', ok: false }, { e: '🍔', w: 'hamburger', ok: false },
  { e: '🍩', w: 'šiška', ok: false }, { e: '🥤', w: 'sladká limonáda', ok: false }, { e: '🍫', w: 'čokoláda', ok: false }, { e: '🌭', w: 'párok v rožku', ok: false },
]
const yesNo = (correctYes: boolean, yes: string, no: string): Option[] => [
  { content: `👍 ${yes}`, correct: correctYes, label: yes, word: true },
  { content: `👎 ${no}`, correct: !correctYes, label: no, word: true },
]
// Päť kôl s oboma správnymi odpoveďami: 3 jedného druhu a 2 druhého, náhodne
const mixed = <T,>(good: T[], bad: T[]) => {
  const g = Math.random() < 0.5 ? 3 : 2
  return shuffle([...pick(good, g), ...pick(bad, 5 - g)])
}

function Vanish({ pics, gone, after }: { pics: string[]; gone: number; after: number }) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHidden(true), after); return () => clearTimeout(t) }, [after])
  return <>{pics.map((e, k) => <span key={k} className={hidden && k === gone ? 'gone' : ''}>{hidden && k === gone ? '❔' : e}</span>)}</>
}

const ORDINALS = ['prvý', 'druhý', 'tretí', 'štvrtý']
const SPOTS = [
  { a: 'h', n: 'hore' }, { a: 'd', n: 'dole' }, { a: 'l', n: 'vľavo' }, { a: 'p', n: 'vpravo' }, { a: 's', n: 'v strede' },
]
const SEASONS = [
  { n: 'jar', i: '🌷', things: [{ e: '🌷', w: 'tulipán' }, { e: '🐣', w: 'kuriatko' }, { e: '🌱', w: 'klíček' }, { e: '🥚', w: 'veľkonočné vajíčko' }] },
  { n: 'leto', i: '☀️', things: [{ e: '🏖️', w: 'pláž' }, { e: '🍉', w: 'melón' }, { e: '🩱', w: 'plavky' }, { e: '🍦', w: 'zmrzlina' }] },
  { n: 'jeseň', i: '🍂', things: [{ e: '🍂', w: 'padajúce lístie' }, { e: '🎃', w: 'tekvica' }, { e: '🌰', w: 'gaštan' }, { e: '🪁', w: 'šarkan' }] },
  { n: 'zima', i: '❄️', things: [{ e: '⛄', w: 'snehuliak' }, { e: '🛷', w: 'sánky' }, { e: '🎄', w: 'vianočný stromček' }, { e: '🧤', w: 'rukavice' }] },
]
const DAY = [
  { e: '⏰', t: 'Zvoní budík a vstávame.', when: 0 }, { e: '🥣', t: 'Raňajkujeme.', when: 0 }, { e: '🎒', t: 'Ideme do škôlky.', when: 0 },
  { e: '🍲', t: 'Obedujeme polievku.', when: 1 }, { e: '😴', t: 'Po obede odpočívame.', when: 1 },
  { e: '🛁', t: 'Kúpeme sa vo vani.', when: 2 }, { e: '📖', t: 'Čítame rozprávku na dobrú noc.', when: 2 }, { e: '🌙', t: 'Ideme spať.', when: 2 },
]
const DAYTIME = [{ e: '🌅', n: 'ráno' }, { e: '🍽️', n: 'na obed' }, { e: '🌙', n: 'večer' }]
const JOBS = [
  { e: '👩‍⚕️', w: 'lekárka', t: '🩺', tw: 'fonendoskop' }, { e: '👨‍🚒', w: 'hasič', t: '🧯', tw: 'hasiaci prístroj' },
  { e: '👩‍🍳', w: 'kuchárka', t: '🍳', tw: 'panvica' }, { e: '👨‍🌾', w: 'farmár', t: '🚜', tw: 'traktor' },
  { e: '👩‍🏫', w: 'učiteľka', t: '📚', tw: 'knihy' }, { e: '👷', w: 'stavbár', t: '🧱', tw: 'tehly' },
  { e: '👮', w: 'policajt', t: '🚓', tw: 'policajné auto' }, { e: '💇', w: 'kaderníčka', t: '✂️', tw: 'nožnice' },
  { e: '🧑‍🎨', w: 'maliar', t: '🎨', tw: 'farby' }, { e: '🧑‍🔧', w: 'automechanik', t: '🔧', tw: 'kľúč' },
  { e: '👨‍✈️', w: 'pilot', t: '✈️', tw: 'lietadlo' }, { e: '🧑‍🚒', w: 'šofér', t: '🚌', tw: 'autobus' },
]
const WEATHER = [
  { e: '❄️', t: 'Vonku sneží a mrzne.', wear: [{ e: '🧤', w: 'rukavice' }, { e: '🧣', w: 'šál' }] },
  { e: '🌧️', t: 'Vonku prší.', wear: [{ e: '☂️', w: 'dáždnik' }, { e: '🥾', w: 'čižmy' }] },
  { e: '🏖️', t: 'Je horúco a ideme k vode.', wear: [{ e: '🩱', w: 'plavky' }, { e: '🕶️', w: 'slnečné okuliare' }, { e: '🧢', w: 'šiltovka' }] },
]
const HYGIENE = [
  { e: '🚽', t: 'Po použití toalety si umyjem ruky. Čo potrebujem?', ok: { e: '🧼', w: 'mydlo' } },
  { e: '🦷', t: 'Ráno a večer si čistím zuby. Čo potrebujem?', ok: { e: '🪥', w: 'zubná kefka' } },
  { e: '🤧', t: 'Mám nádchu a musím sa vysmrkať. Čo potrebujem?', ok: { e: '🧻', w: 'vreckovka' } },
  { e: '🛁', t: 'Vo vani si umývam vlasy. Čo potrebujem?', ok: { e: '🧴', w: 'šampón' } },
  { e: '💅', t: 'Mám dlhé nechty. Čo potrebujem?', ok: { e: '✂️', w: 'nožničky' } },
]
const HYGIENE_OTHER = [{ e: '⚽', w: 'lopta' }, { e: '🍭', w: 'lízanka' }, { e: '🧸', w: 'macko' }, { e: '🖍️', w: 'pastelka' }, { e: '🎈', w: 'balón' }]

const MOVES = ['vyskoč', 'tlieskni', 'urob drep', 'dupni nohou', 'zamávaj rukami ako vtáčik', 'skoč ako žabka', 'otoč sa dokola', 'natiahni sa k slniečku']

// Úroveň podľa veku: 1 = 3–4 roky, 2 = 4–5 rokov, 3 = 5–6 rokov
export type Level = 1 | 2 | 3
export const LEVELS: { n: Level; name: string; pic: string }[] = [
  { n: 1, name: '3–4 roky', pic: '🐣' }, { n: 2, name: '4–5 rokov', pic: '🐥' }, { n: 3, name: '5–6 rokov', pic: '🐓' },
]
const rand = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1))
const nums = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)

// Hry, ktoré si náročnosť nastavujú samy; ostatným sa podľa úrovne uberie počet možností
const OWN_LEVELS: Game['id'][] = ['pocty', 'slabiky', 'viac', 'velkost', 'poradie', 'poloha', 'pohyb', 'rytmus']

function makeRounds(id: Game['id'], theme: Theme, lv: Level): Round[] {
  const rounds = baseRounds(id, theme, lv)
  if (OWN_LEVELS.includes(id)) return rounds
  const max = id === 'nepatri' ? lv + 2 : lv + 1
  return rounds.map((r) => {
    let wrong = r.options.filter((o) => !o.correct).length - (max - 1)
    return { ...r, options: r.options.filter((o) => o.correct || wrong-- <= 0) }
  })
}

function baseRounds(id: Game['id'], theme: Theme, lv: Level): Round[] {
  const range = Array.from({ length: 5 }, (_, i) => i)
  if (id === 'pocty') {
    return range.map(() => {
      const top = [3, 5, 8][lv - 1]
      const n = rand(1, top)
      const item = theme.items[Math.floor(Math.random() * theme.items.length)]
      const choice = shuffle([n, ...pick(nums(1, top).filter((x) => x !== n), lv)])
      return {
        prompt: <>Koľko ich je? <b>Spočítaj</b></>, stage: Array(n).fill(item.e).join(''), speech: 'Spočítaj, koľko ich je.',
        options: choice.map((x) => ({ content: x, correct: x === n, label: NUM_WORDS[x] })),
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
        options: shuffle([t, ...pick(items.filter((x) => x !== t), 3)]).map((x) => ({
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
    const top = lv + 1
    const own = theme.items.filter((x) => syllables(x) <= top)
    const order = shuffle(own.length >= 3 ? own : THEMES.flatMap((t) => t.items).filter((x) => syllables(x) <= top))
    return range.map((i) => {
      const x = order[i % order.length]
      const n = syllables(x)
      return {
        prompt: <>Vytlieskaj slovo <b>{x.w.toLowerCase()}</b>. Koľko slabík má?</>, stage: x.e,
        speech: `Vytlieskaj slovo ${x.w.toLowerCase()}. Koľko slabík má?`,
        options: nums(1, top).map((k) => ({ content: k, correct: k === n, label: NUM_WORDS[k] })),
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
        options: shuffle([t.m, ...pick(MATERIALS.filter((m) => m !== t.m), 3)]).map((m) => ({
          content: m.toLowerCase(), correct: m === t.m, label: m.toLowerCase(), word: true,
        })),
      }
    })
  }
  if (id === 'pohyb') {
    const moves = shuffle(MOVES)
    return range.map((i) => {
      const n = [rand(1, 3), rand(2, 5), rand(3, 6)][lv - 1]
      const item = theme.items[Math.floor(Math.random() * theme.items.length)]
      const m = moves[i]
      return {
        prompt: <><b>{m[0].toUpperCase() + m.slice(1)}</b> toľkokrát, koľko vidíš obrázkov</>, stage: Array(n).fill(item.e).join(''),
        speech: `Spočítaj obrázky a ${m} toľkokrát.`,
        options: [{ content: 'Hotovo ✓', correct: true, label: 'hotovo', word: true }],
      }
    })
  }
  if (id === 'viac') {
    const items = shuffle(theme.items)
    const same = lv === 1 ? -1 : Math.floor(Math.random() * 5)
    const top = [4, 6, 8][lv - 1]
    return range.map((i) => {
      const x = items[i]
      const a = rand(1, top)
      let b = rand(1, top)
      if (i === same) b = a
      else while (b === a) b = rand(1, top)
      const less = i % 2 === 1
      const ans = a === b ? 'eq' : (a > b) !== less ? 'a' : 'b'
      const q = less ? 'menej' : 'viac'
      return {
        prompt: <>Kde je <b>{q}</b>?{lv > 1 && ' Ak je to rovnako, ťukni na ='}</>, speech: lv > 1 ? `Kde je ${q}? Ak je ich rovnako, ťukni na rovná sa.` : `Kde je ${q}?`,
        options: [
          { content: <span className="grp">{Array(a).fill(x.e).join('')}</span>, correct: ans === 'a', label: `skupina ${NUM_WORDS[a]}`, word: true },
          ...(lv > 1 ? [{ content: '=', correct: ans === 'eq', label: 'rovnako' }] : []),
          { content: <span className="grp">{Array(b).fill(x.e).join('')}</span>, correct: ans === 'b', label: `skupina ${NUM_WORDS[b]}`, word: true },
        ],
      }
    })
  }
  if (id === 'velkost') {
    const items = shuffle(theme.items)
    return range.map((i) => {
      const x = items[i]
      const big = i % 2 === 0
      const all = [[28, 90], [30, 54, 84], [30, 46, 64, 84]][lv - 1]
      const sizes = shuffle(all)
      const target = big ? all[all.length - 1] : all[0]
      return {
        prompt: <>Ťukni na <b>{big ? 'najväčší' : 'najmenší'}</b> obrázok</>, speech: `Ťukni na ${big ? 'najväčší' : 'najmenší'} obrázok.`,
        options: sizes.map((px) => ({ content: <span style={{ fontSize: px }}>{x.e}</span>, correct: px === target, label: px === all[all.length - 1] ? 'veľký' : px === all[0] ? 'malý' : 'stredný' })),
      }
    })
  }
  if (id === 'postupnost') {
    const patterns = [[[0, 1]], [[0, 1], [0, 0, 1], [0, 1, 1]], [[0, 0, 1], [0, 1, 1], [0, 1, 2], [0, 1, 2, 1]]][lv - 1]
    return range.map((i) => {
      const pat = patterns[i % patterns.length]
      const pics = pick(theme.items, 3)
      const len = pat.length * 2 + 1
      const row = Array.from({ length: len }, (_, k) => pics[pat[k % pat.length]])
      const next = pics[pat[len % pat.length]]
      return {
        prompt: <>Čo bude <b>ďalej</b>?</>, stage: <span className="seq">{row.map((x) => x.e).join(' ')} ❓</span>, speech: 'Pozri sa na rad obrázkov. Čo bude ďalej?',
        options: shuffle(pics).map((x) => ({ content: x.e, correct: x === next, label: x.w.toLowerCase() })),
      }
    })
  }
  if (id === 'zive') {
    const all = THEMES.flatMap((t) => t.items).filter((x) => !UNSURE.has(x.w))
    const own = theme.items.filter((x) => !UNSURE.has(x.w))
    const live = own.filter((x) => LIVE.has(x.w)).length >= 3 ? own.filter((x) => LIVE.has(x.w)) : all.filter((x) => LIVE.has(x.w))
    const dead = own.filter((x) => !LIVE.has(x.w)).length >= 3 ? own.filter((x) => !LIVE.has(x.w)) : all.filter((x) => !LIVE.has(x.w))
    return mixed(live, dead).map((x) => ({
      prompt: <>Je <b>{x.w.toLowerCase()}</b> živé, alebo neživé?</>, stage: x.e, speech: `Je ${x.w.toLowerCase()} živé, alebo neživé?`,
      options: yesNo(LIVE.has(x.w), 'živé', 'neživé'),
    }))
  }
  if (id === 'spravanie') {
    return mixed(BEHAVIOUR.filter((b) => b.ok), BEHAVIOUR.filter((b) => !b.ok)).map((b) => ({
      prompt: <>{b.t} <b>Je to správne?</b></>, stage: b.e, speech: `${b.t} Je to správne?`,
      options: yesNo(b.ok, 'správne', 'nesprávne'),
    }))
  }
  if (id === 'zdrave') {
    return mixed(FOOD.filter((f) => f.ok), FOOD.filter((f) => !f.ok)).map((f) => ({
      prompt: <>Je <b>{f.w}</b> zdravé jedlo?</>, stage: f.e, speech: `Je ${f.w} zdravé jedlo?`,
      options: yesNo(f.ok, 'zdravé', 'nezdravé'),
    }))
  }
  if (id === 'zacina') {
    const all = THEMES.flatMap((t) => t.items)
    return shuffle(theme.items).slice(0, 5).map((t) => {
      const l = firstLetter(t.w)
      const others: typeof all = []
      for (const x of shuffle([...theme.items, ...shuffle(all)])) {
        if (others.length === 3) break
        if (firstLetter(x.w) !== l && x.w[0] !== t.w[0] && x.e !== t.e && !others.some((o) => o.e === x.e || firstLetter(o.w) === firstLetter(x.w))) others.push(x)
      }
      return {
        prompt: <>Ktoré slovo začína na <b>{l}</b>?</>, speech: `Ktoré slovo začína na písmeno ${l}?`,
        options: shuffle([t, ...others]).map((x) => ({ content: x.e, correct: x === t, label: x.w.toLowerCase() })),
      }
    })
  }
  if (id === 'dlhe') {
    const all = THEMES.flatMap((t) => t.items)
    return range.map(() => {
      const a = pick(theme.items, 1)[0]
      const pool = theme.items.filter((x) => syllables(x) !== syllables(a))
      const b = pick(pool.length ? pool : all.filter((x) => syllables(x) !== syllables(a)), 1)[0]
      const long = syllables(a) > syllables(b) ? a : b
      return {
        prompt: <>Ktoré slovo je <b>dlhšie</b>? Vytlieskaj ich.</>, speech: `Ktoré slovo je dlhšie? ${a.w.toLowerCase()}, alebo ${b.w.toLowerCase()}? Vytlieskaj ich.`,
        options: shuffle([a, b]).map((x) => ({ content: <span style={{ fontSize: 48 }}>{x.e}<small className="cap">{x.w.toLowerCase()}</small></span>, correct: x === long, label: x.w.toLowerCase(), word: true })),
      }
    })
  }
  if (id === 'kukucka') {
    const order = shuffle(theme.items)
    return range.map((i) => {
      const t = order[i]
      const [x, y] = pick([[-30, -30], [30, -30], [-30, 30], [30, 30], [0, -35], [0, 35]], 1)[0]
      return {
        prompt: <>Kto sa skrýva za <b>okienkom</b>? Povedz to nahlas!</>,
        stage: <span className="peek" aria-hidden="true"><span style={{ transform: `scale(${[1.6, 2.4, 3.2][lv - 1]}) translate(${x / (4 - lv)}%, ${y / (4 - lv)}%)` }}>{t.e}</span></span>,
        speech: 'Kto sa skrýva za okienkom? Povedz to nahlas!',
        options: shuffle([t, ...pick(order.filter((o) => o !== t), 3)]).map((o) => ({ content: o.e, correct: o === t, label: o.w.toLowerCase() })),
      }
    })
  }
  if (id === 'poradie') {
    return range.map(() => {
      const row = pick(theme.items, lv === 3 ? 4 : 3)
      const words = [['prvý', 'posledný'], ['prvý', 'druhý', 'tretí', 'posledný'], [...ORDINALS, 'posledný']][lv - 1]
      const word = pick(words, 1)[0]
      const idx = word === 'posledný' ? row.length - 1 : ORDINALS.indexOf(word)
      return {
        prompt: <>Ťukni na <b>{word}</b> obrázok zľava</>, speech: `Ťukni na ${word} obrázok zľava.`,
        options: row.map((x, j) => ({ content: x.e, correct: j === idx, label: x.w.toLowerCase() })),
      }
    })
  }
  if (id === 'poloha') {
    const spots = SPOTS.filter((sp) => [['h', 'd'], ['h', 'd', 's'], ['h', 'd', 'l', 'p', 's']][lv - 1].includes(sp.a))
    return range.map(() => {
      const items = pick(theme.items, 5)
      const target = pick(spots, 1)[0]
      return {
        prompt: <>Ťukni na obrázok, ktorý je <b>{target.n}</b></>, speech: `Ťukni na obrázok, ktorý je ${target.n}.`, cross: true,
        options: spots.map((sp, j) => ({ content: items[j].e, correct: sp === target, label: items[j].w.toLowerCase(), spot: sp.a })),
      }
    })
  }
  if (id === 'zmizlo') {
    return range.map((i) => {
      const pics = pick(theme.items, lv + 2)
      const gone = Math.floor(Math.random() * pics.length)
      const wait = [5000, 4000, 3000][lv - 1]
      return {
        prompt: <>Zapamätaj si obrázky. Čo <b>zmizlo</b>?</>, hide: wait,
        stage: <Vanish key={`${i}-${pics[gone].e}`} pics={pics.map((x) => x.e)} gone={gone} after={wait} />,
        speech: 'Dobre sa pozri a zapamätaj si obrázky. Potom povedz, čo zmizlo.',
        options: shuffle([pics[gone], ...pick(pics.filter((x) => x !== pics[gone]), 1), ...pick(theme.items.filter((x) => !pics.includes(x)), 2)]).map((x) => ({
          content: x.e, correct: x === pics[gone], label: x.w.toLowerCase(),
        })),
      }
    })
  }
  if (id === 'obdobia') {
    return range.map(() => {
      const se = pick(SEASONS, 1)[0]
      const th = pick(se.things, 1)[0]
      return {
        prompt: <>Kedy to býva? <b>{th.w}</b></>, stage: th.e, speech: `${th.w}. V ktorom ročnom období to býva?`,
        options: SEASONS.map((x) => ({ content: `${x.i} ${x.n}`, correct: x === se, label: x.n, word: true })),
      }
    })
  }
  if (id === 'rezim') {
    return shuffle(DAY).slice(0, 5).map((d) => ({
      prompt: <>{d.t} <b>Kedy to robíme?</b></>, stage: d.e, speech: `${d.t} Kedy to robíme?`,
      options: DAYTIME.map((x, j) => ({ content: `${x.e} ${x.n}`, correct: j === d.when, label: x.n, word: true })),
    }))
  }
  if (id === 'profesie') {
    return shuffle(JOBS).slice(0, 5).map((j) => ({
      prompt: <>Čo potrebuje pri práci <b>{j.w}</b>?</>, stage: j.e, speech: `Čo potrebuje pri práci ${j.w}?`,
      options: shuffle([j, ...pick(JOBS.filter((x) => x !== j), 3)]).map((x) => ({ content: x.t, correct: x === j, label: x.tw })),
    }))
  }
  if (id === 'rytmus') {
    return range.map(() => {
      const [lo, hi] = [[1, 3], [2, 4], [2, 5]][lv - 1]
      const n = rand(lo, hi)
      return {
        prompt: <>Počúvaj bubon. <b>Koľkokrát</b> zabubnoval?</>, stage: '🥁', speech: 'Počúvaj bubon. Koľkokrát zabubnoval?',
        play: () => drum(n, 2.6),
        options: nums(lo, hi).map((k) => ({ content: k, correct: k === n, label: NUM_WORDS[k] })),
      }
    })
  }
  if (id === 'tony') {
    const high = shuffle([true, true, false, false, Math.random() < 0.5])
    return high.map((h) => ({
      prompt: <>Počúvaj tón. Je <b>vysoký</b> ako vtáčik, alebo <b>hlboký</b> ako medveď?</>, stage: '🎵',
      speech: 'Počúvaj tón. Je vysoký ako vtáčik, alebo hlboký ako medveď?',
      play: () => { tone(h ? 1046 : 131, 4, 1.2); tone(h ? 1046 : 131, 5.4, 1.2) },
      options: [
        { content: '🐦 vysoký', correct: h, label: 'vysoký', word: true },
        { content: '🐻 hlboký', correct: !h, label: 'hlboký', word: true },
      ],
    }))
  }
  if (id === 'oblecenie') {
    return range.map(() => {
      const w = pick(WEATHER, 1)[0]
      const ok = pick(w.wear, 1)[0]
      const bad = pick(WEATHER.filter((x) => x !== w).flatMap((x) => x.wear), 3)
      return {
        prompt: <>{w.t} <b>Čo si vezmem?</b></>, stage: w.e, speech: `${w.t} Čo si vezmem?`,
        options: shuffle([ok, ...bad]).map((x) => ({ content: x.e, correct: x === ok, label: x.w })),
      }
    })
  }
  if (id === 'hygiena') {
    return shuffle(HYGIENE).map((h) => ({
      prompt: <>{h.t}</>, stage: h.e, speech: h.t,
      options: shuffle([h.ok, ...pick(HYGIENE_OTHER, 3)]).map((x) => ({ content: x.e, correct: x === h.ok, label: x.w })),
    }))
  }
  // pismena
  const order = shuffle(theme.items)
  return range.map((i) => {
    const { w, e } = order[i]
    const first = firstLetter(w)
    const letters = shuffle([first, ...pick(LETTERS.filter((x) => x !== first && x !== w[0]), 3)])
    return {
      prompt: <>Na aké písmeno začína slovo <b>{w.toLowerCase()}</b>?</>, stage: e, speech: `Na aké písmeno začína slovo ${w.toLowerCase()}?`,
      options: letters.map((l) => ({ content: l, correct: l === first, label: l })),
    }
  })
}

export function GameView({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const [rounds] = useState(() => (game.id === 'pexeso' ? [] : makeRounds(game.id, theme, level)))
  if (game.id === 'pexeso') return <Memory game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  return <Quiz game={game} rounds={rounds} onDone={onDone} onBack={onBack} />
}
