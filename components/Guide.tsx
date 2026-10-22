'use client'

import { useEffect, useState } from 'react'

// Sprievodcovia: Čarozvedko (chlapec) a Čarozvedka (dievča)
export type Mood = 'idle' | 'think' | 'joy' | 'try' | 'wow'

const POSE: Record<Mood, [string, string]> = {
  idle: ['hmm', 'usmev'],
  think: ['hmm', 'hmm'],
  joy: ['smiech', 'smiech'],
  try: ['kuzlo', 'usmev'],
  wow: ['jaj', 'jaj'],
}

// Hry volajú cheer() (alebo say(), ktoré ju volá samo) a sprievodcovia zareagujú
export function cheer(mood: Mood, text = '') {
  try { window.dispatchEvent(new CustomEvent('objavko-guide', { detail: { mood, text } })) } catch {}
}

export function moodOf(text: string): Mood {
  if (/^(výborne|šikovn|super|bravo)/i.test(text)) return 'joy'
  if (/^(skús|dobrý pokus|nevadí)/i.test(text)) return 'try'
  return 'think'
}

const pic = (who: 'chlapec' | 'dievca', pose: string) => `/sprievodca/${who}-${pose}.webp`

// Hlas: Čarozvedko hovorí mužským slovenským hlasom vo vyššej polohe, Čarozvedka ženským
export function speak(text: string, who: 'chlapec' | 'dievca' = 'chlapec') {
  try {
    if (!('speechSynthesis' in window)) return
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'sk-SK'
    const sk = speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('sk'))
    const male = sk.find((v) => /filip|luk[aá]s|male|muž/i.test(v.name))
    const female = sk.find((v) => /laura|zuzana|female|žena/i.test(v.name))
    const voice = who === 'chlapec' ? male ?? sk[0] : female ?? sk.find((v) => v !== male) ?? sk[0]
    if (voice) u.voice = voice
    u.rate = 0.95
    u.pitch = who === 'chlapec' ? (male ? 1.45 : 1.25) : 1.3
    speechSynthesis.speak(u)
  } catch {}
}

// Krátke predstavenie, keď dieťa ťukne na postavičku
const ABOUT = {
  chlapec: 'Ja som Čarozvedko, lesný škriatok. Bývam v dutom dube a mám čarovný prútik. Najradšej skúmam, ako veci fungujú, a pomôžem ti, keď niečo nevieš.',
  dievca: 'Ja som Čarozvedka, lesná víla. Mám krídla jemné ako rosa a poznám každý kvietok v lese. Rada čítam rozprávky a teším sa z každej veci, ktorú sa naučíš.',
}

// V hre: dvaja sprievodcovia pod úlohou, chvália a povzbudzujú
export function GuideBar() {
  const [{ mood, text }, setState] = useState<{ mood: Mood; text: string }>({ mood: 'idle', text: '' })
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    let shown = 0
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ mood: Mood; text: string }>).detail
      clearTimeout(t)
      // Radosť a povzbudenie necháme chvíľu viditeľné, aj keď už hra číta ďalšiu úlohu
      const wait = d.mood === 'think' ? shown + 1600 - Date.now() : 0
      if (wait > 0) { t = setTimeout(() => setState(d), wait); return }
      setState(d)
      if (d.mood === 'think') return
      shown = Date.now()
      t = setTimeout(() => setState({ mood: 'idle', text: '' }), 3000)
    }
    window.addEventListener('objavko-guide', on)
    return () => { window.removeEventListener('objavko-guide', on); clearTimeout(t) }
  }, [])
  const [boy, girl] = POSE[mood]
  const bubble = mood === 'think' || mood === 'idle' ? '' : text
  return (
    <div className={`guide-bar m-${mood}`} aria-hidden="true">
      <img key={`b${boy}`} src={pic('chlapec', boy)} alt="" className="g-boy" />
      <div className={`g-bubble ${bubble ? 'on' : ''}`}>{bubble || '…'}</div>
      <img key={`g${girl}`} src={pic('dievca', girl)} alt="" className="g-girl" />
    </div>
  )
}

// Privítanie na úvode: Čarozvedko máva a pozdraví nahlas; ťuknutím na postavičku sa predstaví
export function GuideHello({ text }: { text: string }) {
  const [line, setLine] = useState(text)
  useEffect(() => {
    setLine(text)
    const t = setTimeout(() => speak(text, 'chlapec'), 500)
    return () => { clearTimeout(t); try { speechSynthesis.cancel() } catch {} }
  }, [text])
  const tell = (who: 'chlapec' | 'dievca') => { setLine(ABOUT[who]); speak(ABOUT[who], who) }
  return (
    <div className="guide-hello">
      <button type="button" className="g-who" onClick={() => tell('chlapec')} aria-label="Kto je Čarozvedko?">
        <img src={pic('chlapec', 'ahoj')} alt="Čarozvedko máva na pozdrav" className="g-boy" />
      </button>
      <div className="g-say">
        <button type="button" className="g-bubble on" onClick={() => speak(line, line === ABOUT.dievca ? 'dievca' : 'chlapec')}>{line}</button>
        <span className="g-hint">Ťukni na nás a povieme ti, kto sme.</span>
      </div>
      <button type="button" className="g-who" onClick={() => tell('dievca')} aria-label="Kto je Čarozvedka?">
        <img src={pic('dievca', 'stoji')} alt="Čarozvedka sa usmieva" className="g-girl" />
      </button>
    </div>
  )
}
