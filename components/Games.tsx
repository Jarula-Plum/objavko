'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { type Game } from '@/lib/games'
import { THEMES, firstLetter, rhymeKey, sounds, syllables, type Item, type Theme } from '@/lib/themes'
import { Stars, Ui, emo, picUrl } from './Emo'
import { GuideBar, cheer, moodOf, speak } from './Guide'
import { Coloring, Dictation, Exercise, Tracing } from './Cvicenia'

export function say(text: string) {
  cheer(moodOf(text), text)
  speak(text, 'chlapec')
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
  hide?: number; play?: () => void; cross?: boolean; row?: string
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
        <button className="back" onClick={() => { try { speechSynthesis.cancel() } catch {} ; onBack() }}><Ui n="spat" /> Späť</button>
        {dots && (
          <div className="dots" aria-label={`Kolo ${Math.min(dots.i + 1, 5)} z 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} className={`${dots.log[i] === true ? 'ok' : dots.log[i] === false ? 'no' : ''} ${i === dots.i ? 'now' : ''}`} />
            ))}
          </div>
        )}
        <button className="speak" onClick={() => (onRepeat ? onRepeat() : say(speech))}><Ui n="zvuk" /> Zopakuj</button>
      </div>
      {children}
      <GuideBar />
    </section>
  )
}

export function Finished({ game, starsN, kidName, onAgain, onBack }: {
  game: Game; starsN: number; kidName: string; onAgain: () => void; onBack: () => void
}) {
  const praise = starsN === 3 ? 'Výborne!' : starsN === 2 ? 'Šikovné!' : 'Dobrý pokus!'
  useEffect(() => { say(praise); if (starsN === 3) cheer('wow', `${praise} ${kidName}!`) }, [praise, starsN, kidName])
  return (
    <Shell game={game} onBack={onBack} speech={praise}>
      <div className="done-box">
        <div className="big-stars"><Stars n={starsN} /></div>
        <img className="reward" src={['/obrazky/lucerna.webp', '/obrazky/kristal.webp', '/obrazky/truhlica.webp'][Math.max(0, starsN - 1)]} alt="" />
        <h2 style={{ fontSize: 36 }}>{praise} {kidName}</h2>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="cta" onClick={onAgain}><Ui n="znova" /> Hrať znova</button>
          <button className="ghost" onClick={onBack}><Ui n="mapa" /> Iné hry</button>
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
      <div className="prompt">{emo(r.prompt)}</div>
      {r.stage && <div className="stage">{emo(r.stage)}</div>}
      <div className={`opts ${r.cross ? 'cross' : ''} ${r.row ?? ''}`} style={{ visibility: shown ? 'visible' : 'hidden' }}>
        {r.options.map((o, idx) => (
          <button
            key={`${i}-${idx}-${wrong?.idx === idx ? wrong.n : 0}`}
            className={`opt ${o.word ? 'word' : ''} ${right === idx ? 'right' : ''} ${wrong?.idx === idx ? 'wrong' : ''}`}
            aria-label={o.label}
            style={o.spot ? { gridArea: o.spot } : undefined}
            onClick={() => choose(idx)}
          >
            {emo(o.content)}
          </button>
        ))}
      </div>
    </Shell>
  )
}

// Pexeso s obrázkami, alebo so zvukmi (podľa Montessori zvukových valčekov): rovnaké tóny tvoria dvojicu
const PITCHES = [[196, 440, 880], [196, 330, 523, 880], [196, 262, 330, 440, 587, 880]]
function Memory({ game, theme, level, sound, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; sound?: boolean; onDone: (s: number) => void; onBack: () => void
}) {
  const pairs = [3, 4, 6][level - 1]
  const [deck] = useState(() => {
    const pics = sound ? PITCHES[level - 1].map(String) : pick(theme.items.map((t) => t.e), pairs)
    return shuffle([...pics, ...pics])
  })
  const [open, setOpen] = useState<number[]>([])
  const [done, setDone] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const speech = sound ? 'Ťukni na kartičku a počúvaj. Nájdi dva rovnaké zvuky.' : 'Nájdi dva rovnaké obrázky.'
  useEffect(() => { say(speech) }, [])

  const flip = (idx: number) => {
    if (open.length === 2 || open.includes(idx) || done.includes(idx)) return
    const o = [...open, idx]
    setOpen(o)
    if (sound) tone(Number(deck[idx]), 0, 0.7)
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
      <div className="prompt">Nájdi dva <b>rovnaké</b> {sound ? 'zvuky' : 'obrázky'}</div>
      <div className="memo">
        {deck.map((e, idx) => {
          const shown = open.includes(idx) || done.includes(idx)
          return (
            <button key={idx} className={`card ${open.includes(idx) ? 'open' : ''} ${done.includes(idx) ? 'done' : ''}`}
              aria-label={sound ? (done.includes(idx) ? 'nájdená dvojica' : 'zvuková kartička') : shown ? theme.items.find((t) => t.e === e)?.w.toLowerCase() ?? e : 'Kartička'}
              onClick={() => flip(idx)}>
              <span>{emo(sound ? (done.includes(idx) ? '🎵' : '🔊') : e)}</span>
            </button>
          )
        })}
      </div>
      <p className="note" style={{ textAlign: 'center' }}>Ťahy: {moves}</p>
    </Shell>
  )
}

// Jarkine drevené číslice 0–10 (public/obrazky/cislo-N.webp), väčšie čísla ostávajú textom
const num = (n: number) => (n >= 0 && n <= 10 ? <img className="emo num" src={`/obrazky/cislo-${n}.webp`} alt={String(n)} draggable={false} /> : n)
const NUM_WORDS = ['', 'jedna', 'dva', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem']
const COLORS = [
  { n: 'červenú', v: '#E53935' }, { n: 'modrú', v: '#1E63D6' }, { n: 'zelenú', v: '#2E9D4F' },
  { n: 'žltú', v: '#FFD21F' }, { n: 'oranžovú', v: '#FF8A1F' }, { n: 'fialovú', v: '#8E44C9' },
]
const LETTERS = 'ABCČDEFGHIJKLĽMNOPRSŠTUVZŽ'.split('')
const FACES = [
  { e: '😀', n: 'veselú' }, { e: '😢', n: 'smutnú' }, { e: '😠', n: 'nahnevanú' },
  { e: '😮', n: 'prekvapenú' }, { e: '😨', n: 'ustarostenú' }, { e: '😴', n: 'ospalú' },
  { e: '\uE170', n: 'spokojnú' }, { e: '\uE171', n: 'hrdú' }, { e: '\uE172', n: 'znudenú' }, { e: '\uE173', n: 'hanblivú' },
]
const MATERIALS = ['DREVO', 'KOV', 'SKLO', 'PAPIER', 'PLAST', 'LÁTKA']
const THINGS = [
  { e: '🪑', w: 'stolička', m: 'DREVO' }, { e: '🪵', w: 'poleno', m: 'DREVO' }, { e: '✏️', w: 'ceruzka', m: 'DREVO' }, { e: '🪜', w: 'rebrík', m: 'DREVO' },
  { e: '🥄', w: 'lyžica', m: 'KOV' }, { e: '🔑', w: 'kľúč', m: 'KOV' }, { e: '🔨', w: 'kladivo', m: 'KOV' }, { e: '🪙', w: 'minca', m: 'KOV' },
  { e: '🍾', w: 'fľaša', m: 'SKLO' }, { e: '🪟', w: 'okno', m: 'SKLO' }, { e: '👓', w: 'okuliare', m: 'SKLO' }, { e: '🥛', w: 'pohár', m: 'SKLO' },
  { e: '📰', w: 'noviny', m: 'PAPIER' }, { e: '📖', w: 'kniha', m: 'PAPIER' }, { e: '✉️', w: 'obálka', m: 'PAPIER' }, { e: '📦', w: 'krabica', m: 'PAPIER' },
  { e: '\uE115', w: 'pohárik', m: 'PLAST' }, { e: '🪣', w: 'vedierko', m: 'PLAST' }, { e: '🧸', w: 'hračka', m: 'PLAST' }, { e: '🪥', w: 'kefka na zuby', m: 'PLAST' },
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
  'NOS ÚSTA RUKA NOHA ZUB ZUBY HLAVA DLAŇ LAKEŤ CHODIDLO ZEM MOZOG JAZYK RODINA SNEHULIAK ROBOT VODA KVAPKA').split(' '))
const BEHAVIOUR = [
  { e: '\uE203', t: 'Podelím sa s kamarátom o pastelky.', ok: true }, { e: '\uE20A', t: 'Pomôžem upratať hračky.', ok: true },
  { e: '\uE200', t: 'Ráno pozdravím: Dobré ráno!', ok: true }, { e: '🙏', t: 'Poviem prosím a ďakujem.', ok: true },
  { e: '🧼', t: 'Pred jedlom si umyjem ruky.', ok: true }, { e: '\uE206', t: 'Utíšim smutného kamaráta.', ok: true },
  { e: '\uE205', t: 'Keď kamarát spadne, pomôžem mu vstať.', ok: true }, { e: '\uE201', t: 'Požičiam kamarátovi knižku.', ok: true },
  { e: '\uE204', t: 'S kamarátom staviame spolu z kociek.', ok: true }, { e: '\uE207', t: 'Pomôžem kamarátovi odniesť ťažkú krabicu.', ok: true },
  { e: '\uE209', t: 'Hodím kamarátovi loptu, aby sa hral s nami.', ok: true }, { e: '\uE20B', t: 'Ukážem pani učiteľke, čo som nakreslila.', ok: true },
  { e: '🚦', t: 'Cez cestu idem len na zelenú.', ok: true }, { e: '👂', t: 'Počúvam, keď niekto rozpráva.', ok: true },
  { e: '👊', t: 'Udriem kamaráta.', ok: false }, { e: '🍬', t: 'Vezmem kamarátovi cukrík bez opýtania.', ok: false },
  { e: '😡', t: 'Kričím a búcham dverami.', ok: false }, { e: '⚽', t: 'Vybehnem za loptou na cestu.', ok: false },
  { e: '🧸', t: 'Vytrhnem kamarátovi hračku z ruky.', ok: false }, { e: '🌷', t: 'Trhám kvety v parku.', ok: false },
  { e: '📚', t: 'Hodím knihu na zem.', ok: false }, { e: '🗣️', t: 'Skáčem druhým do reči.', ok: false },
]
const FOOD = [
  { e: '🍎', w: 'jablko', ok: true }, { e: '🥕', w: 'mrkva', ok: true }, { e: '🥦', w: 'brokolica', ok: true }, { e: '🍌', w: 'banán', ok: true },
  { e: '🥛', w: 'mlieko', ok: true }, { e: '🍇', w: 'hrozno', ok: true }, { e: '\uE12B', w: 'voda', ok: true }, { e: '🥒', w: 'uhorka', ok: true },
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
  return <>{pics.map((e, k) => <span key={k} className={hidden && k === gone ? 'gone' : ''}>{emo(hidden && k === gone ? '❔' : e)}</span>)}</>
}

const ORDINALS = ['prvý', 'druhý', 'tretí', 'štvrtý']
const SPOTS = [
  { a: 'h', n: 'hore' }, { a: 'd', n: 'dole' }, { a: 'l', n: 'vľavo' }, { a: 'p', n: 'vpravo' }, { a: 's', n: 'v strede' },
]
const PLACES = [
  { e: '\uE1F0', w: 'nad krabicou' }, { e: '\uE1F1', w: 'pod stolíkom' }, { e: '\uE1F2', w: 'v krabici' }, { e: '\uE1F3', w: 'pred krabicou' },
  { e: '\uE1F4', w: 'za krabicou' }, { e: '\uE1F5', w: 'vľavo od krabice' }, { e: '\uE1F6', w: 'vpravo od krabice' }, { e: '\uE1F7', w: 'medzi krabicami' },
]
const SEASONS = [
  { n: 'jar', i: '\uE210', things: [{ e: '🌷', w: 'tulipán' }, { e: '🐣', w: 'kuriatko' }, { e: '🌱', w: 'klíček' }, { e: '\uE214', w: 'veľkonočný košík' }] },
  { n: 'leto', i: '\uE211', things: [{ e: '🏖️', w: 'pláž' }, { e: '🍉', w: 'melón' }, { e: '🩱', w: 'plavky' }, { e: '🍦', w: 'zmrzlina' }] },
  { n: 'jeseň', i: '\uE212', things: [{ e: '🍂', w: 'padajúce lístie' }, { e: '🎃', w: 'tekvica' }, { e: '🌰', w: 'gaštan' }, { e: '🪁', w: 'šarkan' }] },
  { n: 'zima', i: '\uE213', things: [{ e: '⛄', w: 'snehuliak' }, { e: '🛷', w: 'sánky' }, { e: '🎄', w: 'vianočný stromček' }, { e: '🧤', w: 'rukavice' }] },
]
const DAY = [
  { e: '\uE1D2', t: 'Ráno vstávame z postieľky.', when: 0 }, { e: '\uE1D3', t: 'Raňajkujeme.', when: 0 }, { e: '\uE1D4', t: 'Ideme do škôlky.', when: 0 },
  { e: '\uE1D8', t: 'Ráno sa obliekame.', when: 0 }, { e: '\uE1D5', t: 'Obedujeme.', when: 1 }, { e: '😴', t: 'Po obede odpočívame.', when: 1 },
  { e: '🛁', t: 'Kúpeme sa vo vani.', when: 2 }, { e: '\uE1D6', t: 'Čítame rozprávku na dobrú noc.', when: 2 }, { e: '\uE1D7', t: 'Ideme spať.', when: 2 },
]
const OPPOSITES: { e: string; w: string }[][] = [
  [{ e: '\uE1A0', w: 'veľké jablko' }, { e: '\uE1A1', w: 'malé jablko' }],
  [{ e: '\uE1A2', w: 'dlhú ceruzku' }, { e: '\uE1A3', w: 'krátku ceruzku' }],
  [{ e: '\uE1A4', w: 'vysokú vežu' }, { e: '\uE1A5', w: 'nízku vežu' }],
  [{ e: '\uE1A6', w: 'širokú stuhu' }, { e: '\uE1A7', w: 'úzku stuhu' }],
  [{ e: '\uE1A8', w: 'plný pohár' }, { e: '\uE1A9', w: 'prázdny pohár' }],
  [{ e: '\uE1AA', w: 'otvorenú knihu' }, { e: '\uE1AB', w: 'zatvorenú knihu' }],
  [{ e: '\uE1AC', w: 'čistú čižmu' }, { e: '\uE1AD', w: 'špinavú čižmu' }],
  [{ e: '\uE1AE', w: 'mokrý uterák' }, { e: '\uE1AF', w: 'suchý uterák' }],
  [{ e: '\uE1B0', w: 'tvrdý kameň' }, { e: '\uE1B1', w: 'mäkký vankúš' }],
  [{ e: '\uE1B2', w: 'horúci čaj' }, { e: '\uE1B3', w: 'studený nápoj' }],
  [{ e: '\uE1D0', w: 'veselého škriatka' }, { e: '\uE1D1', w: 'smutného škriatka' }],
  [{ e: '\uE1B4', w: 'deň' }, { e: '\uE1B5', w: 'noc' }],
]
const DAYTIME = [{ e: '🌅', n: 'ráno' }, { e: '🍽️', n: 'na obed' }, { e: '🌙', n: 'večer' }]
const JOBS = [
  { e: '👩‍⚕️', w: 'lekárka', t: '🩺', tw: 'fonendoskop' }, { e: '👨‍🚒', w: 'hasič', t: '🧯', tw: 'hasiaci prístroj' },
  { e: '👩‍🍳', w: 'kuchárka', t: '🍳', tw: 'panvica' }, { e: '👨‍🌾', w: 'farmár', t: '🚜', tw: 'traktor' },
  { e: '👩‍🏫', w: 'učiteľka', t: '📚', tw: 'knihy' }, { e: '👷', w: 'stavbár', t: '🧱', tw: 'tehly' },
  { e: '👮', w: 'policajt', t: '🚓', tw: 'policajné auto' }, { e: '💇', w: 'kaderníčka', t: '✂️', tw: 'nožnice' },
  { e: '🧑‍🎨', w: 'maliar', t: '🎨', tw: 'farby' }, { e: '🧑‍🔧', w: 'automechanik', t: '🔧', tw: 'kľúč' },
  { e: '👨‍✈️', w: 'pilot', t: '✈️', tw: 'lietadlo' }, { e: '🧑‍🚒', w: 'hasič', t: '🚒', tw: 'hasičské auto' }, { e: '🧑‍🍳', w: 'kuchár', t: '🍲', tw: 'polievka' },
  { e: '\uE12A', w: 'poštár', t: '✉️', tw: 'list' },
]
const WEATHER = [
  { e: '🌨️', t: 'Vonku sneží a mrzne.', wear: [{ e: '🧤', w: 'rukavice' }, { e: '🧣', w: 'šál' }] },
  { e: '🌧️', t: 'Vonku prší.', wear: [{ e: '☂️', w: 'dáždnik' }, { e: '🥾', w: 'čižmy' }] },
  { e: '🏖️', t: 'Je horúco a ideme k vode.', wear: [{ e: '🩱', w: 'plavky' }, { e: '🕶️', w: 'slnečné okuliare' }, { e: '🧢', w: 'šiltovka' }] },
]
const HYGIENE = [
  { e: '🚽', t: 'Po použití toalety si umyjem ruky. Čo potrebujem?', ok: { e: '🧼', w: 'mydlo' } },
  { e: '🦷', t: 'Ráno a večer si čistím zuby. Čo potrebujem?', ok: { e: '🪥', w: 'zubná kefka' } },
  { e: '🤧', t: 'Mám nádchu a musím sa vysmrkať. Čo potrebujem?', ok: { e: '\uE113', w: 'vreckovka' } },
  { e: '🛁', t: 'Vo vani si umývam vlasy. Čo potrebujem?', ok: { e: '🧴', w: 'šampón' } },
  { e: '💅', t: 'Mám dlhé nechty. Čo potrebujem?', ok: { e: '✂️', w: 'nožničky' } },
]
const HYGIENE_OTHER = [{ e: '⚽', w: 'lopta' }, { e: '🍭', w: 'lízanka' }, { e: '🧸', w: 'macko' }, { e: '🖍️', w: 'pastelka' }, { e: '🎈', w: 'balón' }]

const ARROWS = [{ a: '⬆️', dx: 0, dy: -1 }, { a: '⬇️', dx: 0, dy: 1 }, { a: '⬅️', dx: -1, dy: 0 }, { a: '➡️', dx: 1, dy: 0 }]
const HUMAN = [
  { t: 'Kto má city a môže byť smutný?', a: 0 }, { t: 'Kto potrebuje jesť a spať?', a: 0 },
  { t: 'Kto potrebuje nabiť batériu?', a: 1 }, { t: 'Kto urobí len to, na čo ho niekto naprogramoval?', a: 1 },
  { t: 'Kto sa môže pomýliť?', a: 2 }, { t: 'Kto sa môže učiť nové veci?', a: 2 },
  { t: 'Kto vie objať smutného kamaráta?', a: 0 }, { t: 'Kto vie veľmi rýchlo spočítať veľa čísel?', a: 1 },
  { t: 'Kto môže pomáhať ľuďom?', a: 2 }, { t: 'Kto má kamarátov a rodinu?', a: 0 },
]
const WHO = [{ e: '👧', n: 'človek' }, { e: '🤖', n: 'robot' }, { e: '👧🤖', n: 'obaja' }]
const FEELINGS = [
  { t: 'Dostal darček na narodeniny.', f: 0 }, { t: 'Rozbila sa mu obľúbená hračka.', f: 1 },
  { t: 'Niekto mu zobral lopatku a nevrátil ju.', f: 2 }, { t: 'V noci začalo hrmieť.', f: 4 },
  { t: 'Z krabice zrazu vyskočil zajačik.', f: 3 }, { t: 'Celý deň behal vonku a je večer.', f: 5 },
  { t: 'Kamarát ho pozval na oslavu.', f: 0 }, { t: 'Mamička musela odísť na dlhú cestu.', f: 1 },
  { t: 'Niekto mu kopol do stavby z kociek.', f: 2 }, { t: 'Stratil sa mamke v obchode.', f: 4 },
]
const KIND = [
  { e: '🤕', t: 'Kamarát spadol a plače.', ok: '🤗 Pomôžem mu a utíšim ho.', bad: ['😂 Vysmejem sa mu.', '🚶 Odídem preč.', '🙈 Nevšímam si ho.'] },
  { e: '😔', t: 'Kamarátka je smutná, nemá sa s kým hrať.', ok: '🤝 Zavolám ju hrať sa.', bad: ['🙈 Nevšímam si ju.', '😝 Vyplazím na ňu jazyk.', '🏃 Utečem od nej.'] },
  { e: '😡', t: 'Som veľmi nahnevaný.', ok: '🌬️ Zhlboka sa nadýchnem a poviem, čo ma hnevá.', bad: ['👊 Udriem niekoho.', '🧸 Hodím hračku.', '😱 Kričím na všetkých.'] },
  { e: '🌙', t: 'Bojím sa tmy.', ok: '🗣️ Poviem to mamke alebo pani učiteľke.', bad: ['😡 Kričím na všetkých.', '🤐 Nikomu nič nepoviem.', '👊 Búcham do dverí.'] },
  { e: '🖼️', t: 'Kamarát mi dal svoju kresbu.', ok: '🙏 Poďakujem a poteším sa.', bad: ['🗑️ Hodím ju do koša.', '🙄 Poviem, že je škaredá.', '🚶 Odídem bez slova.'] },
  { e: '🧸', t: 'Niekto mi zobral hračku.', ok: '🗣️ Pokojne poviem: Vráť mi ju, prosím.', bad: ['👊 Udriem ho.', '🦷 Pohryziem ho.', '😱 Kričím a hádžem veci.'] },
  { e: '🎲', t: 'Kamarát vyhral hru a ja som prehral.', ok: '🤝 Zablahoželám mu.', bad: ['😤 Rozhádžem hru.', '😠 Poviem, že podvádzal.', '🚪 Urazím sa a odídem.'] },
]
const SHOP = [{ e: '🍎', w: 'jablko' }, { e: '🥛', w: 'mlieko' }, { e: '🍞', w: 'chlieb' }, { e: '🧸', w: 'macko' }, { e: '🍌', w: 'banán' }, { e: '🎈', w: 'balón' }, { e: '🖍️', w: 'pastelky' }, { e: '⚽', w: 'lopta' }]
const coins = (list: number[]) => <span className="coins">{list.map((c, k) => <span key={k} className={`coin c${c}`}>{c}€</span>)}</span>
const stack = (h: number, k?: number) => <span key={k} className="stack">{Array.from({ length: h }, (_, j) => <i key={j} />)}</span>

// Pohyby so škriatkom, ktorý ich predvádza (public/skriatok/p-*.webp)
const MOVES: { t: string; p?: string }[] = [
  { t: 'vyskoč', p: 'skok' }, { t: 'tlieskni', p: 'tlieskaj' }, { t: 'urob drep', p: 'drep' }, { t: 'natiahni sa k slniečku', p: 'natiahni' },
  { t: 'urob predklon', p: 'predklon' }, { t: 'kľakni si a postav sa', p: 'klak' }, { t: 'sadni si do tureckého sedu a postav sa', p: 'sed' },
  { t: 'urob krok', p: 'chodza' }, { t: 'zabehni si na mieste', p: 'beh' }, { t: 'roztiahni ruky ako lietadlo a pripaž', p: 'lietadlo' },
  { t: 'dupni nohou' }, { t: 'otoč sa dokola' },
]

// Úroveň podľa veku: 1 = 3–4 roky, 2 = 4–5 rokov, 3 = 5–6 rokov
export type Level = 1 | 2 | 3
export const LEVELS: { n: Level; name: string; pic: string }[] = [
  { n: 1, name: '3–4 roky', pic: '🐣' }, { n: 2, name: '4–5 rokov', pic: '🐥' }, { n: 3, name: '5–6 rokov', pic: '🐓' },
]
const rand = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1))
const nums = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)

// Hry, ktoré si náročnosť nastavujú samy; ostatným sa podľa úrovne uberie počet možností
const OWN_LEVELS: Game['id'][] = ['protiklady', 'predlozky', 'krokovanie', 'robotik', 'rymy', 'pocty', 'slabiky', 'viac', 'velkost', 'poradie', 'poloha', 'pohyb', 'rytmus']

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
        options: choice.map((x) => ({ content: num(x), correct: x === n, label: NUM_WORDS[x] })),
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
      const { t: m, p } = moves[i]
      return {
        prompt: <>{p && <img className="pose" src={`/skriatok/p-${p}.webp`} alt="" />}<b>{m[0].toUpperCase() + m.slice(1)}</b> toľkokrát, koľko vidíš obrázkov</>, stage: Array(n).fill(item.e).join(''),
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
  if (id === 'protiklady') {
    // Dvojice protikladov z Jarkiných obrázkov: [obrázok, čo povie hlas]
    const pairs = shuffle(OPPOSITES).slice(0, 5)
    return pairs.map((pr) => {
      const k = Math.random() < 0.5 ? 0 : 1
      const others = shuffle(OPPOSITES.filter((q) => q !== pr)).slice(0, lv - 1).map((q) => q[Math.floor(Math.random() * 2)])
      const opts = shuffle([...pr.map((x, j) => ({ ...x, ok: j === k })), ...others.map((x) => ({ ...x, ok: false }))])
      return {
        prompt: <>Ťukni na <b>{pr[k].w}</b></>, speech: `Ťukni na ${pr[k].w}.`,
        options: opts.map((x) => ({ content: x.e, correct: x.ok, label: x.w })),
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
  if (id === 'predlozky') {
    // Jarkina krabica a lopta: kde je lopta? Mladší len nad, pod, v; starší aj pred, za, vľavo, vpravo, medzi
    const pool = PLACES.slice(0, [3, 5, 8][lv - 1])
    return shuffle([...pool, ...pool]).slice(0, 5).map((t) => ({
      prompt: <>Ťukni, kde je lopta <b>{t.w}</b></>, speech: `Ťukni na obrázok, kde je lopta ${t.w}.`,
      options: shuffle([t, ...pick(pool.filter((x) => x !== t), lv === 1 ? 1 : 2)]).map((x) => ({ content: x.e, correct: x === t, label: `lopta ${x.w}` })), row: 'big',
    }))
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
    return range.map((k) => {
      const se = pick(SEASONS, 1)[0]
      const th = pick(se.things, 1)[0]
      // Dve kolá ukážu Jarkin strom v danom ročnom období, ostatné vec, ktorá k nemu patrí
      if (k === 0 || k === 3) return {
        prompt: <>Aké <b>ročné obdobie</b> je na strome?</>, stage: se.i, speech: 'Pozri sa na strom. Aké ročné obdobie je na obrázku?',
        options: SEASONS.map((x) => ({ content: x.n, correct: x === se, label: x.n, word: true })),
      }
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
  if (id === 'krokovanie') {
    return range.map(() => {
      const who = pick(theme.items, 1)[0]
      const moves = lv === 1 ? [rand(1, 3)] : lv === 2 ? [rand(2, 3), -rand(1, 2)] : [rand(1, 3), -rand(1, 3), rand(1, 2)]
      let lo = 0, hi = 0, pos = 0
      for (const m of moves) { pos += m; lo = Math.min(lo, pos); hi = Math.max(hi, pos) }
      const start = rand(-lo, 6 - hi)
      const end = start + moves.reduce((a, b) => a + b, 0)
      const say_ = moves.map((m) => `${Math.abs(m)} ${Math.abs(m) === 1 ? 'krok' : 'kroky'} ${m > 0 ? 'dopredu' : 'dozadu'}`).join(', potom ')
      return {
        prompt: <>{who.w[0] + who.w.slice(1).toLowerCase()} urobí {say_}. <b>Kam sa dostane?</b></>,
        stage: <span className="seq">{moves.map((m) => (m > 0 ? '➡️' : '⬅️').repeat(Math.abs(m))).join(' ')}</span>,
        speech: `${who.w.toLowerCase()} urobí ${say_}. Kam sa dostane?`, row: 'path',
        options: Array.from({ length: 7 }, (_, k) => ({ content: k === start ? who.e : '', correct: k === end, label: `políčko ${k + 1}` })),
      }
    })
  }
  if (id === 'schody') {
    return range.map(() => {
      const n = lv + 2
      const gap = rand(1, n)
      const wrong = pick(nums(1, n + 1).filter((h) => h !== gap), 3)
      return {
        prompt: <>Ktorý <b>schod</b> chýba?</>,
        stage: <span className="stairs">{nums(1, n).map((h) => (h === gap ? <span key={h} className="stack gap">❓</span> : stack(h, h)))}</span>,
        speech: 'Pozri sa na schody. Ktorý schod chýba?',
        options: shuffle([gap, ...wrong]).map((h) => ({ content: stack(h), correct: h === gap, label: `${NUM_WORDS[h] ?? h} kocky`, word: true })),
      }
    })
  }
  if (id === 'autobus') {
    return range.map(() => {
      const who = pick(theme.items, 1)[0]
      let n = lv === 1 ? rand(1, 3) : rand(2, 5)
      const steps: number[] = lv === 1 ? [rand(1, 2)] : lv === 2 ? [-rand(1, Math.min(2, n)), rand(1, 3)] : []
      if (lv === 3) for (let k = 0; k < 2; k++) { const off = -rand(0, Math.min(2, n)); const on = rand(1, 3); steps.push(off, on); n += off + on }
      const start = lv === 3 ? n - steps.reduce((a, b) => a + b, 0) : n
      const total = start + steps.reduce((a, b) => a + b, 0)
      const lines = steps.filter((x) => x !== 0)
      const choice = shuffle([total, ...pick(nums(Math.max(0, total - 3), total + 3).filter((x) => x !== total), 3)])
      const verb = (x: number) => (x > 0 ? 'nastúpi' : 'vystúpi') + (Math.abs(x) > 1 && Math.abs(x) < 5 ? 'a' : '')
      const tell = lines.map((x) => `${Math.abs(x)} ${verb(x)}`).join(', potom ')
      return {
        prompt: <>V autobuse {start === 1 ? 'je' : 'sú'} {start}. {tell[0].toUpperCase() + tell.slice(1)}. <b>Koľko ich je teraz v autobuse?</b></>,
        stage: <span className="bus"><span>🚌 {who.e.repeat(start) || '–'}</span>{lines.map((x, k) => <span key={k}>{x > 0 ? '⬆️' : '⬇️'} {verb(x)} {who.e.repeat(Math.abs(x))}</span>)}</span>,
        speech: `V autobuse ${start === 1 ? 'je' : 'sú'} ${start}. Na zastávke ${tell}. Koľko ich je teraz v autobuse?`,
        options: choice.map((x) => ({ content: num(x), correct: x === total, label: String(x) })),
      }
    })
  }
  if (id === 'stavby') {
    return range.map(() => {
      const cols = Array.from({ length: lv + 1 }, () => rand(1, lv === 1 ? 2 : 3))
      const total = cols.reduce((a, b) => a + b, 0)
      return {
        prompt: <>Z koľkých <b>kociek</b> je stavba?</>, stage: <span className="stairs">{cols.map((h, k) => stack(h, k))}</span>,
        speech: 'Spočítaj kocky. Z koľkých kociek je stavba?',
        options: shuffle([total, ...pick(nums(Math.max(1, total - 3), total + 3).filter((x) => x !== total), 3)]).map((x) => ({ content: x, correct: x === total, label: String(x) })),
      }
    })
  }
  if (id === 'parkety') {
    const palette = ['#E53935', '#1E63D6', '#FFD21F', '#2E9D4F', '#8E44C9']
    return range.map(() => {
      const cs = pick(palette, lv === 3 ? 3 : 2)
      const rule = lv === 1 ? (r: number, c: number) => (r + c) % 2 : lv === 2 ? pick([(r: number, c: number) => (r + c) % 2, (r: number) => r % 2, (_: number, c: number) => c % 2], 1)[0] : (r: number, c: number) => (r + c) % 3
      const gap = rand(0, 8)
      const want = cs[rule(Math.floor(gap / 3), gap % 3)]
      const cells = Array.from({ length: 9 }, (_, k) => k === gap ? null : cs[rule(Math.floor(k / 3), k % 3)])
      return {
        prompt: <>Ktorý dielik <b>doplní</b> parketu?</>,
        stage: <span className="parquet">{cells.map((c, k) => <i key={k} style={{ background: c ?? 'transparent' }}>{c ? '' : '❓'}</i>)}</span>,
        speech: 'Pozri sa na parketu. Ktorý dielik do nej patrí?',
        options: shuffle([want, ...pick(palette.filter((c) => c !== want), 3)]).map((c) => ({ content: <span className="swatch" style={{ background: c }} />, correct: c === want, label: 'dielik' })),
      }
    })
  }
  if (id === 'nakup') {
    return range.map(() => {
      const it = pick(SHOP, 1)[0]
      const price = lv === 1 ? rand(1, 3) : lv === 2 ? rand(2, 5) : rand(3, 6)
      const pile = (v: number) => (lv === 3 ? [...Array(Math.floor(v / 2)).fill(2), ...(v % 2 ? [1] : [])] : Array(v).fill(1))
      const wrong = pick(nums(1, price + 3).filter((x) => x !== price), 3)
      return {
        prompt: <>{it.w[0].toUpperCase() + it.w.slice(1)} stojí <b>{lv === 1 ? coins(Array(price).fill(1)) : `${price} €`}</b>. Ktorými mincami zaplatíš presne?</>,
        stage: it.e, speech: `${it.w} stojí ${price} ${price === 1 ? 'euro' : price < 5 ? 'eurá' : 'eur'}. Ktorými mincami zaplatíš presne?`,
        options: shuffle([price, ...wrong]).map((v) => ({ content: coins(pile(v)), correct: v === price, label: `${v} eur`, word: true })),
      }
    })
  }
  if (id === 'robotik') {
    const size = lv === 3 ? 4 : 3
    return range.map(() => {
      const steps = lv
      const walk = (x: number, y: number, seq: typeof ARROWS) => seq.reduce(([a, b], m) => [a + m.dx, b + m.dy], [x, y])
      const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < size && y < size
      let sx = 0, sy = 0, path: typeof ARROWS = []
      for (;;) {
        sx = rand(0, size - 1); sy = rand(0, size - 1); path = Array.from({ length: steps }, () => pick(ARROWS, 1)[0])
        let ok = true, x = sx, y = sy
        for (const m of path) { x += m.dx; y += m.dy; if (!inside(x, y) || (x === sx && y === sy)) ok = false }
        if (ok) break
      }
      const [tx, ty] = walk(sx, sy, path)
      const wrongs: (typeof ARROWS)[] = []
      for (let tries = 0; wrongs.length < 3 && tries < 200; tries++) {
        const w = Array.from({ length: steps }, () => pick(ARROWS, 1)[0])
        const [wx, wy] = walk(sx, sy, w)
        if ((wx !== tx || wy !== ty) && !wrongs.some((o) => o.map((m) => m.a).join() === w.map((m) => m.a).join())) wrongs.push(w)
      }
      return {
        prompt: <>Ktorými šípkami dôjde <b>robot</b> k batérii?</>,
        stage: <span className="grid" style={{ gridTemplateColumns: `repeat(${size}, 44px)` }}>{Array.from({ length: size * size }, (_, k) => {
          const x = k % size, y = Math.floor(k / size)
          return <i key={k}>{x === sx && y === sy ? '🤖' : x === tx && y === ty ? '🔋' : ''}</i>
        })}</span>,
        speech: 'Ktorými šípkami dôjde robot k batérii?',
        options: shuffle([path, ...wrongs]).map((seq) => ({ content: seq.map((m) => m.a).join(''), correct: seq === path, label: seq.map((m) => ({ '⬆️': 'hore', '⬇️': 'dole', '⬅️': 'vľavo', '➡️': 'vpravo' }[m.a])).join(', '), word: true })),
      }
    })
  }
  if (id === 'clovek') {
    return shuffle(HUMAN).slice(0, 5).map((h) => ({
      prompt: <>{h.t}</>, stage: '👧 🤖', speech: `${h.t} Človek, robot, alebo obaja?`,
      options: WHO.map((w, k) => ({ content: `${w.e} ${w.n}`, correct: k === h.a, label: w.n, word: true })),
    }))
  }
  if (id === 'situacie') {
    return shuffle(FEELINGS).slice(0, 5).map((x) => ({
      prompt: <>{x.t} <b>Ako sa asi cíti?</b></>, speech: `${x.t} Ako sa asi cíti?`,
      options: shuffle([FACES[x.f], ...pick(FACES.filter((_, k) => k !== x.f), 3)]).map((f) => ({ content: f.e, correct: f === FACES[x.f], label: f.n })),
    }))
  }
  if (id === 'empatia') {
    return shuffle(KIND).slice(0, 5).map((x) => ({
      prompt: <>{x.t} <b>Čo urobím?</b></>, stage: x.e, speech: `${x.t} Čo urobím? ${[x.ok, ...x.bad].map((o) => o.slice(o.indexOf(' ') + 1)).join(' ')}`.slice(0, 400),
      options: shuffle([x.ok, ...x.bad]).map((o) => ({ content: o, correct: o === x.ok, label: o.slice(o.indexOf(' ') + 1), word: true })),
    }))
  }
  if (id === 'rymy') {
    const all = THEMES.flatMap((t) => t.items)
    const partners = (x: Item) => all.filter((y) => y.w !== x.w && y.e !== x.e && rhymeKey(y) && rhymeKey(y) === rhymeKey(x))
    const own = theme.items.filter((x) => partners(x).length)
    const pool = shuffle(own.length >= 3 ? own : all.filter((x) => partners(x).length))
    return range.map((i) => {
      const x = pool[i % pool.length]
      const ok = pick(partners(x), 1)[0]
      const others = shuffle([...theme.items, ...shuffle(all)]).filter((y, k, a) =>
        rhymeKey(y) !== rhymeKey(x) && y.e !== x.e && y.e !== ok.e && a.findIndex((z) => z.e === y.e) === k)
      const opts = shuffle([ok, ...others.slice(0, lv)])
      const names = opts.map((o) => o.w.toLowerCase())
      return {
        prompt: <>Čo sa rýmuje so slovom <b>{x.w.toLowerCase()}</b>?</>, stage: x.e,
        speech: `Čo sa rýmuje so slovom ${x.w.toLowerCase()}? ${names.slice(0, -1).join(', ')}, alebo ${names[names.length - 1]}?`,
        options: opts.map((o) => ({ content: <span style={{ fontSize: 48 }}>{o.e}<small className="cap">{o.w.toLowerCase()}</small></span>, correct: o === ok, label: o.w.toLowerCase(), word: true })),
      }
    })
  }
  if (id === 'posledna') {
    const usable = (x: Item) => { const s = sounds(x); return s && s[s.length - 1].length === 1 || s?.[s.length - 1] === 'CH' }
    const own = theme.items.filter(usable)
    const end = (x: Item) => sounds(x)!.slice(-1)[0]
    // rôzne koncové hlásky, nech nie je stále A: najprv po jednom slove na každú hlásku
    const mix = shuffle([...shuffle(own), ...shuffle(THEMES.flatMap((t) => t.items).filter(usable))])
    const pool = [...mix.filter((x, k) => mix.findIndex((y) => end(y) === end(x)) === k), ...mix]
    return range.map((i) => {
      const x = pool[i]
      const s = sounds(x)!
      const last = s[s.length - 1]
      const letters = shuffle([last, ...pick(LETTERS.filter((l) => l !== last && l !== firstLetter(x.w)), 3)])
      return {
        prompt: <>Na akú hlásku <b>končí</b> slovo {x.w.toLowerCase()}?</>, stage: x.e, speech: `Na akú hlásku končí slovo ${x.w.toLowerCase()}?`,
        options: letters.map((l) => ({ content: l, correct: l === last, label: l })),
      }
    })
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

// Zoradenie: dieťa ťuká na veci v správnom poradí (Montessori ružová veža, farebné tabuľky, postupy).
type OrderItem = { content: ReactNode; label: string }
type OrderRound = { prompt: ReactNode; speech: string; items: OrderItem[]; tower?: boolean }
const STEPS = [
  [{ e: '\uE1D2', w: 'Vstanem z postieľky.' }, { e: '\uE1D8', w: 'Oblečiem sa.' }, { e: '\uE1D3', w: 'Naraňajkujem sa.' }, { e: '\uE1D4', w: 'Idem do škôlky.' }],
  [{ e: '\uE1DB', w: 'Upracem hračky.' }, { e: '\uE1DA', w: 'Vyčistím si zuby.' }, { e: '\uE1D6', w: 'Pozrieme si knižku.' }, { e: '\uE1D7', w: 'Zaspím.' }],
  [{ e: '💧', w: 'Pustím vodu.' }, { e: '🧼', w: 'Namydlím si ruky.' }, { e: '💦', w: 'Opláchnem ruky.' }, { e: '\uE110', w: 'Utriem si ruky.' }],
  [{ e: '🕳️', w: 'Vykopem jamku.' }, { e: '🌰', w: 'Vložím semienko.' }, { e: '💧', w: 'Polejem ho.' }, { e: '🌱', w: 'Vyrastie klíček.' }],
  [{ e: '🥚', w: 'Vajíčko.' }, { e: '🐣', w: 'Kuriatko sa liahne.' }, { e: '🐥', w: 'Kuriatko rastie.' }, { e: '🐔', w: 'Sliepka.' }],
  [{ e: '🍞', w: 'Vezmem chlieb.' }, { e: '🧈', w: 'Natriem maslo.' }, { e: '🧀', w: 'Dám naň syr.' }, { e: '😋', w: 'Zjem ho.' }],
  [{ e: '🪥', w: 'Vezmem kefku.' }, { e: '🦷', w: 'Čistím si zuby.' }, { e: '💦', w: 'Vypláchnem ústa.' }, { e: '😁', w: 'Zuby sa lesknú.' }],
  [{ e: '🧦', w: 'Oblečiem si ponožky.' }, { e: '👟', w: 'Obujem si topánky.' }, { e: '🎀', w: 'Zaviažem šnúrky.' }, { e: '🏃', w: 'Idem von.' }],
  [{ e: '⚪', w: 'Gúľam veľkú guľu.' }, { e: '⚪', w: 'Položím na ňu menšiu guľu.' }, { e: '🥕', w: 'Dám mu mrkvový nos.' }, { e: '⛄', w: 'Snehuliak je hotový.' }],
]
const HUES = [0, 210, 130, 280, 30]

function orderRounds(id: Game['id'], lv: Level, theme: Theme): OrderRound[] {
  const n = lv + 2
  if (id === 'veza') {
    // Veža z obrázkov témy: rovnaký obrázok v rôznych veľkostiach, od najväčšieho po najmenší
    return shuffle(theme.items).slice(0, 5).map((x) => {
      const sizes = Array.from({ length: n }, (_, k) => 76 - k * Math.round(52 / (n - 1)))
      return {
        prompt: <>Postav <b>vežu</b>: ťukaj od najväčšieho obrázka po najmenší</>, speech: `Postav vežu z obrázkov ${x.w.toLowerCase()}. Ťukaj od najväčšieho po najmenší.`, tower: true,
        items: sizes.map((px) => ({ content: <span style={{ fontSize: px, lineHeight: 1 }}>{x.e}</span>, label: `${x.w.toLowerCase()} ${px}` })),
      }
    })
  }
  if (id === 'odtiene') {
    return shuffle(HUES).map((h) => ({
      prompt: <>Ťukaj od najsvetlejšej <b>farby</b> po najtmavšiu</>, speech: 'Ťukaj od najsvetlejšej farby po najtmavšiu.',
      items: Array.from({ length: n }, (_, k) => ({ content: <span className="swatch" style={{ background: `hsl(${h} 75% ${88 - k * Math.round(58 / (n - 1))}%)` }} />, label: `odtieň ${k + 1}` })),
    }))
  }
  return shuffle(STEPS).slice(0, 5).map((seq) => {
    const part = lv === 1 ? seq.slice(0, 3) : seq
    return {
      prompt: <>Čo sa robí <b>najskôr</b>? Ťukaj po poradí</>, speech: `Ťukaj po poradí, čo sa robí najskôr a čo potom. ${part.map((x) => x.w).join(' ')}`,
      items: part.map((x) => ({ content: <span style={{ fontSize: 40 }}>{x.e}<small className="cap">{x.w}</small></span>, label: x.w })),
    }
  })
}

function Order({ game, theme, level, onDone, onBack }: { game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void }) {
  const [rounds] = useState(() => orderRounds(game.id, level, theme).map((r) => ({ ...r, view: shuffle(r.items.map((_, k) => k)) })))
  const [i, setI] = useState(0)
  const [got, setGot] = useState(0)
  const [log, setLog] = useState<boolean[]>([])
  const [missed, setMissed] = useState(false)
  const [wrong, setWrong] = useState<{ k: number; n: number } | null>(null)
  const r = rounds[i]
  useEffect(() => { say(r.speech) }, [r])

  const tap = (k: number) => {
    if (k < got) return
    if (k !== got) { setMissed(true); setWrong({ k, n: (wrong?.n ?? 0) + 1 }); say('Skús ešte raz'); return }
    const g = got + 1
    setGot(g)
    if (g < r.items.length) return
    const l = [...log, !missed]
    setLog(l)
    say('Výborne!')
    setTimeout(() => {
      if (i + 1 >= rounds.length) { const ok = l.filter(Boolean).length; onDone(ok === 5 ? 3 : ok >= 3 ? 2 : 1) }
      else { setI(i + 1); setGot(0); setMissed(false); setWrong(null) }
    }, 1000)
  }

  return (
    <Shell game={game} onBack={onBack} speech={r.speech} dots={{ i, log }}>
      <div className="prompt">{emo(r.prompt)}</div>
      <div className={`stage tray ${r.tower ? 'tower' : ''}`}>{r.items.slice(0, got).map((x, k) => <span key={k}>{emo(x.content)}</span>)}</div>
      <div className="opts">
        {r.view.filter((k) => k >= got).map((k) => (
          <button key={`${i}-${k}-${wrong?.k === k ? wrong.n : 0}`} className={`opt ${game.id === 'postup' ? 'word' : ''} ${wrong?.k === k ? 'wrong' : ''}`}
            aria-label={r.items[k].label} onClick={() => tap(k)}>{emo(r.items[k].content)}</button>
        ))}
      </div>
    </Shell>
  )
}

// Skladačka: obrázok z témy rozdelený na časti; dieťa ťukne na dielik a potom na miesto, kam patrí.
// Farebné pozadie pomáha, keď je časť obrázka prázdna.
const BACKDROP = 'radial-gradient(circle at 50% 40%, #fff7d6 0 30%, transparent 31%), linear-gradient(160deg, #bfe3ff 0%, #d9f2c4 55%, #ffd9c2 100%)'
function Puzzle({ game, theme, level, onDone, onBack }: { game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void }) {
  const [cols, rows] = [[2, 1], [2, 2], [3, 2]][level - 1]
  const count = cols * rows
  const size = Math.min(240, 360 / cols * (cols === 3 ? 1.6 : 1.2))
  const [rounds] = useState(() => shuffle(theme.items.filter((x) => picUrl(x.e))).slice(0, 5).map((x) => ({ x, order: shuffle(nums(0, count - 1)) })))
  const [i, setI] = useState(0)
  const [placed, setPlaced] = useState<number[]>([])
  const [held, setHeld] = useState<number | null>(null)
  const [log, setLog] = useState<boolean[]>([])
  const [missed, setMissed] = useState(false)
  const [shake, setShake] = useState<{ k: number; n: number } | null>(null)
  const r = rounds[i]
  const url = picUrl(r.x.e)!
  const speech = `Poskladaj obrázok ${r.x.w.toLowerCase()}. Ťukni na dielik a potom na miesto, kam patrí.`
  useEffect(() => { say(speech) }, [speech])

  const piece = (k: number, px: number) => (
    <span className="piece" style={{
      width: px / cols, height: px / rows, backgroundImage: `url(${url}), ${BACKDROP}`, backgroundSize: `${px}px ${px}px`,
      backgroundPosition: `${-(k % cols) * px / cols}px ${-Math.floor(k / cols) * px / rows}px`,
    }} />
  )
  const drop = (slot: number) => {
    if (held === null || placed.includes(slot)) return
    if (held !== slot) { setMissed(true); setShake({ k: held, n: (shake?.n ?? 0) + 1 }); say('Skús iné miesto'); return }
    const p = [...placed, slot]
    setPlaced(p); setHeld(null)
    if (p.length < count) return
    const l = [...log, !missed]
    setLog(l)
    say(`Výborne! ${r.x.w.toLowerCase()}`)
    setTimeout(() => {
      if (i + 1 >= rounds.length) { const ok = l.filter(Boolean).length; onDone(ok === 5 ? 3 : ok >= 3 ? 2 : 1) }
      else { setI(i + 1); setPlaced([]); setHeld(null); setMissed(false); setShake(null) }
    }, 1200)
  }

  return (
    <Shell game={game} onBack={onBack} speech={speech} dots={{ i, log }}>
      <div className="prompt">Poskladaj <b>{r.x.w.toLowerCase()}</b></div>
      <div className="board" style={{ width: size, height: size, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {level < 3 && <span className="hint" style={{ backgroundImage: `url(${url}), ${BACKDROP}` }} />}
        {nums(0, count - 1).map((k) => (
          <button key={k} className="slot" aria-label={`miesto ${k + 1}`} onClick={() => drop(k)}>{placed.includes(k) ? piece(k, size) : null}</button>
        ))}
      </div>
      <div className="opts pieces">
        {r.order.filter((k) => !placed.includes(k)).map((k) => (
          <button key={`${i}-${k}-${shake?.k === k ? shake.n : 0}`} className={`opt ${held === k ? 'held' : ''} ${shake?.k === k ? 'wrong' : ''}`}
            aria-label={`dielik ${k + 1}`} aria-pressed={held === k} onClick={() => setHeld(k)}>{piece(k, size * 0.7)}</button>
        ))}
      </div>
    </Shell>
  )
}

// Eľkoninove okienka: dieťa pri vyslovovaní posúva žetón do okienka za každú slabiku alebo hlásku.
// Na úrovni 3–4 a 4–5 rokov vidí presný počet okienok (opora), na úrovni 5–6 rokov ho určí samo.
function Boxes({ game, theme, level, by, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; by: 'slabiky' | 'hlasky'; onDone: (s: number) => void; onBack: () => void
}) {
  const [rounds] = useState(() => {
    const top = by === 'slabiky' ? [2, 3, 4][level - 1] : [3, 4, 6][level - 1]
    const count = (x: Item) => (by === 'slabiky' ? syllables(x) : sounds(x)?.length ?? 99)
    const ok = (x: Item) => count(x) <= top && count(x) >= (by === 'slabiky' ? 1 : 2)
    const own = theme.items.filter(ok)
    return shuffle(own.length >= 5 ? own : [...shuffle(own), ...shuffle(THEMES.flatMap((t) => t.items).filter((x) => ok(x) && !own.includes(x)))]).slice(0, 5)
      .map((x) => ({ x, n: count(x) }))
  })
  const [i, setI] = useState(0)
  const [filled, setFilled] = useState(0)
  const [log, setLog] = useState<boolean[]>([])
  const [missed, setMissed] = useState(false)
  const [shake, setShake] = useState(0)
  const r = rounds[i]
  const unit = by === 'slabiky' ? 'slabiku' : 'hlásku'
  const speech = `Povedz pomaly slovo ${r.x.w.toLowerCase()}. Za každú ${unit} ťukni na žetón.`
  const slots = level === 3 ? (by === 'slabiky' ? 5 : 7) : r.n
  useEffect(() => { say(speech) }, [speech])

  const next = (good: boolean) => {
    const l = [...log, good]
    setLog(l)
    say(`Výborne! ${r.x.w.toLowerCase()}`)
    setTimeout(() => {
      if (i + 1 >= rounds.length) { const k = l.filter(Boolean).length; onDone(k === 5 ? 3 : k >= 3 ? 2 : 1) }
      else { setI(i + 1); setFilled(0); setMissed(false) }
    }, 1300)
  }
  const check = () => {
    if (filled === r.n) next(!missed)
    else { setMissed(true); setShake((k) => k + 1); setFilled(0); say('Skús ešte raz, pomaly.') }
  }

  return (
    <Shell game={game} onBack={onBack} speech={speech} dots={{ i, log }}>
      <div className="prompt">Povedz pomaly <b>{r.x.w.toLowerCase()}</b> a za každú {unit} posuň žetón</div>
      <div className="stage">{emo(r.x.e)}</div>
      <div key={shake} className={`boxes ${shake ? 'wrong' : ''}`} aria-label={`Okienka: ${filled} z ${slots}`}>
        {Array.from({ length: slots }, (_, k) => <span key={k} className="box">{k < filled ? emo('🔴') : ''}</span>)}
      </div>
      <div className="opts">
        <button className="opt" aria-label="žetón" disabled={filled >= slots} onClick={() => {
          const f = filled + 1
          setFilled(f)
          if (level < 3 && f === r.n) next(true)
        }}>{emo('🔴')}</button>
        {level === 3 && <button className="opt word" onClick={check} disabled={!filled}>Hotovo ✓</button>}
        <button className="opt word" onClick={() => setFilled(0)} aria-label="znova">↺</button>
      </div>
    </Shell>
  )
}

export function GameView({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const [rounds] = useState(() => (['omalovanky', 'grafomotorika', 'diktaty', 'zdravotne', 'pexeso', 'skladacka', 'zvuky', 'veza', 'odtiene', 'postup', 'okienka', 'hlasky'].includes(game.id) ? [] : makeRounds(game.id, theme, level)))
  if (game.id === 'omalovanky') return <Coloring game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'grafomotorika') return <Tracing game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'zdravotne') return <Exercise game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'diktaty') return <Dictation game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'pexeso') return <Memory game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'skladacka') return <Puzzle game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'zvuky') return <Memory game={game} theme={theme} level={level} sound onDone={onDone} onBack={onBack} />
  if (['veza', 'odtiene', 'postup'].includes(game.id)) return <Order game={game} theme={theme} level={level} onDone={onDone} onBack={onBack} />
  if (game.id === 'okienka' || game.id === 'hlasky') {
    return <Boxes game={game} theme={theme} level={level} by={game.id === 'okienka' ? 'slabiky' : 'hlasky'} onDone={onDone} onBack={onBack} />
  }
  return <Quiz game={game} rounds={rounds} onDone={onDone} onBack={onBack} />
}
