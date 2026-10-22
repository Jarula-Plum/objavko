'use client'

import { useState } from 'react'
import { emo } from './Emo'

// Tlačidlo, ktoré skopíruje navrhnutý zápis do triednej knihy
export function KopirujZapis({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button type="button" className="ghost" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) } catch { /* schránka nie je dostupná */ }
    }}>{emo('📋')} {ok ? 'Skopírované' : 'Kopírovať zápis'}</button>
  )
}
