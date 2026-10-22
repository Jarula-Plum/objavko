'use client'

import { useEffect, useMemo, useState } from 'react'
import { melodia, solmi, stopMelodia, zahraj } from '@/lib/melodia'
import { K } from '@/lib/piesne/types'
import { emo } from './Emo'

const q = (s: string) => encodeURIComponent(s)

/** Jedna pieseň: nová pesnička má text a navrhnutú melódiu, ľudová odkaz na text a nahrávku. */
export function Piesen({ n, o, t }: { n: string; o: string; t?: string }) {
  const verse = useMemo(() => (t ? melodia(n, t) : []), [n, t])
  const [line, setLine] = useState(-1)
  const [copied, setCopied] = useState(false)
  useEffect(() => () => stopMelodia(), [])

  if (!t) {
    const hladaj = `${n} ${o === K ? '' : 'pieseň pre deti'}`.trim()
    return (
      <li><b>{n}</b><span className="rule">{o}</span>
        <div className="song-links">
          <a className="ghost" href={`https://www.youtube.com/results?search_query=${q(hladaj)}`} target="_blank" rel="noreferrer">{emo('🎵')} Vypočuť melódiu</a>
          <a className="ghost" href={`https://www.google.com/search?q=${q(`${n} text piesne`)}`} target="_blank" rel="noreferrer">{emo('📖')} Nájsť text</a>
        </div>
      </li>
    )
  }

  const play = () => {
    if (line >= 0) { stopMelodia(); setLine(-1); return }
    setLine(0)
    zahraj(verse, setLine)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${n}\n\n${t}\n\nŠtýl: veselá detská pesnička, slovenčina, jednoduchá melódia, pomalé tempo, detský spev, klavír a xylofón`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* schránka nie je dostupná */ }
  }

  return (
    <li><b>{n}</b><span className="rule">{o}</span>
      <div className="song-verses">{verse.map((v, i) => (
        <div key={i} className={i === line ? 'on' : ''}>
          <span className="song-line">{v.text}</span>
          <span className="song-notes">{solmi(v)}</span>
        </div>
      ))}</div>
      <div className="song-links">
        <button type="button" className="ghost" onClick={play}>{emo(line >= 0 ? '⏹️' : '🎹')} {line >= 0 ? 'Zastaviť' : 'Zahrať melódiu'}</button>
        <button type="button" className="ghost" onClick={copy}>{emo('📋')} {copied ? 'Skopírované' : 'Kopírovať pre Suno'}</button>
      </div>
    </li>
  )
}
