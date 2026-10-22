'use client'

import { NAHRATE, VETY } from '@/lib/hlas'
import { useEffect, useRef, useState } from 'react'

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

// Oživení sprievodcovia: video bez zvuku na bielom pozadí, biela sa stratí cez mix-blend-mode (hovorí hlas aplikácie)
// Priehľadné video (WebM s alfa kanálom) vie Chrome, Edge a Firefox; Safari dostane MP4 na bielom pozadí
function useAlpha() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try {
      const safari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
      setOk(!safari && !!document.createElement('video').canPlayType('video/webm; codecs="vp9"'))
    } catch {}
  }, [])
  return ok
}

function GuideVideo({ who, alt, bust }: { who: 'chlapec' | 'dievca'; alt?: string; bust?: boolean }) {
  const f = `${who}-video${bust ? '-polpostava' : ''}`
  const alpha = useAlpha()
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ who: string; on: boolean }>).detail
      const v = ref.current; if (!v || d.who !== who) return
      if (d.on) v.play().catch(() => {})
      else { v.pause(); v.currentTime = 0 }
    }
    window.addEventListener('objavko-hovori', on)
    return () => window.removeEventListener('objavko-hovori', on)
  }, [who])
  return (
    <video ref={ref} key={alpha ? 'a' : 'b'} className={`${who === 'chlapec' ? 'g-boy' : 'g-girl'} g-video ${alpha ? 'g-alpha' : ''}`}
      src={`/sprievodca/${f}.${alpha ? 'webm' : 'mp4'}`} poster={`/sprievodca/${f}${alpha ? '-alfa' : ''}.webp`}
      muted loop playsInline preload="auto" aria-label={alt} role={alt ? 'img' : undefined} aria-hidden={alt ? undefined : true} />
  )
}

// Hlas: Čarozvedko hovorí mužským slovenským hlasom vo vyššej polohe, Čarozvedka ženským.
// Pani učiteľka si môže na zariadení vybrať iný hlas, výšku a rýchlosť (uložené v prehliadači).
export type VoiceSet = { voice?: string; pitch: number; rate: number }
export type VoiceCfg = Record<'chlapec' | 'dievca', VoiceSet>
const VOICE_KEY = 'objavko-hlas'
export function voiceCfg(): Partial<VoiceCfg> {
  try { return JSON.parse(localStorage.getItem(VOICE_KEY) ?? '{}') ?? {} } catch { return {} }
}
export function saveVoiceCfg(c: Partial<VoiceCfg>) {
  try { localStorage.setItem(VOICE_KEY, JSON.stringify(c)) } catch {}
}
export const skVoices = () => {
  try { return speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('sk')) } catch { return [] }
}

let playing: HTMLAudioElement | null = null
// Kto práve hovorí: Čarozvedko sa hýbe len počas reči
const talk = (who: 'chlapec' | 'dievca', on: boolean) => {
  try { window.dispatchEvent(new CustomEvent('objavko-hovori', { detail: { who, on } })) } catch {}
}
export function speak(text: string, who: 'chlapec' | 'dievca' = 'chlapec') {
  try {
    playing?.pause(); playing = null
    const rec = VETY[`${text.trim()}|${who}`] ?? VETY[text.trim()]
    if (rec && NAHRATE.has(rec.file)) {
      try { speechSynthesis.cancel() } catch {}
      const a = new Audio(`/hlas/${rec.file}`)
      playing = a
      a.onplay = () => talk(rec.who, true)
      a.onended = a.onpause = () => talk(rec.who, false)
      a.play().catch(() => talk(rec.who, false))
      return
    }
    if (!('speechSynthesis' in window)) return
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'sk-SK'
    const sk = skVoices()
    const male = sk.find((v) => /filip|luk[aá]s|male|muž/i.test(v.name))
    const female = sk.find((v) => /laura|zuzana|viktória|viktoria|female|žena/i.test(v.name))
    const own = voiceCfg()[who]
    const chosen = own?.voice ? speechSynthesis.getVoices().find((v) => v.voiceURI === own.voice) : undefined
    const voice = chosen ?? (who === 'chlapec' ? male ?? sk[0] : female ?? sk.find((v) => v !== male) ?? sk[0])
    if (voice) u.voice = voice
    u.rate = own?.rate ?? 0.95
    u.pitch = own?.pitch ?? (who === 'chlapec' ? (male ? 1.45 : 1.25) : 1.3)
    u.onstart = () => talk(who, true)
    u.onend = u.onerror = () => talk(who, false)
    talk(who === 'chlapec' ? 'dievca' : 'chlapec', false)
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
      {mood === 'idle' || mood === 'think' ? <GuideVideo who="chlapec" bust /> : <img key={`b${boy}`} src={pic('chlapec', boy)} alt="" className="g-boy" />}
      <div className={`g-bubble ${bubble ? 'on' : ''}`}>{bubble || '…'}</div>
      <img key={`g${girl}`} src={pic('dievca', girl)} alt="" className="g-girl" />
    </div>
  )
}

// Privítanie na úvode: Čarozvedko máva a pozdraví nahlas; ťuknutím na postavičku sa predstaví
// show: čo je napísané na ploche (napr. len meno dieťaťa); text sa vždy povie nahlas
export function GuideHello({ text, show, who = 'chlapec' }: { text: string; show?: string; who?: 'chlapec' | 'dievca' }) {
  const [line, setLine] = useState(text)
  useEffect(() => {
    setLine(text)
    const t = setTimeout(() => speak(text, who), 500)
    return () => { clearTimeout(t); try { speechSynthesis.cancel() } catch {} }
  }, [text, who])
  const tell = (who: 'chlapec' | 'dievca') => { setLine(ABOUT[who]); speak(ABOUT[who], who) }
  const alpha = useAlpha()
  return (
    <div className={`guide-hello ${alpha ? 'alpha' : ''}`}>
      <button type="button" className="g-who" onClick={() => tell('chlapec')} aria-label="Kto je Čarozvedko?">
        <GuideVideo who="chlapec" alt="Čarozvedko máva na pozdrav" />
      </button>
      <div className="g-say">
        <button type="button" className="g-bubble on" onClick={() => speak(line, line === ABOUT.dievca ? 'dievca' : line === ABOUT.chlapec ? 'chlapec' : who)}>{show ?? line}</button>
        <span className="g-hint">Ťukni na nás a povieme ti, kto sme.</span>
      </div>
      <button type="button" className="g-who" onClick={() => tell('dievca')} aria-label="Kto je Čarozvedka?">
        <GuideVideo who="dievca" alt="Čarozvedka sa usmieva" />
      </button>
    </div>
  )
}
