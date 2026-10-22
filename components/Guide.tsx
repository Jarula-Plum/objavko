'use client'

import { useEffect, useState } from 'react'

// Sprievodcovia Objavka: lesný škriatok (chlapec) a víla (dievča)
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

// Privítanie na úvode: škriatok máva, víla sa usmieva
export function GuideHello({ text }: { text: string }) {
  return (
    <div className="guide-hello">
      <img src={pic('chlapec', 'ahoj')} alt="Škriatok máva na pozdrav" className="g-boy" />
      <div className="g-bubble on">{text}</div>
      <img src={pic('dievca', 'stoji')} alt="Víla sa usmieva" className="g-girl" />
    </div>
  )
}
