'use client'

import { useState } from 'react'
import { emo } from './Emo'
import { suhrn, textHodnotenia, type Vysledok } from '@/lib/pokrok'
import { isGirl } from '@/lib/games'

// Prehľad pokroku triedy: pre každé dieťa oblasti ŠVP (čo zvláda, čo precvičiť), pokrok a text do hodnotenia
type Kid = { id: string; name: string; avatar: string }

const pruh = (p: number) => Math.round((p / 3) * 100)
const farba = (p: number) => (p >= 2.5 ? 'var(--good)' : p >= 1.8 ? 'var(--sun)' : 'var(--bad)')
const hier = (n: number) => `${n} ${n === 1 ? 'hra' : n >= 2 && n <= 4 ? 'hry' : 'hier'}`
const datum = (d: string | null) => (d ? new Date(d).toLocaleDateString('sk-SK', { day: 'numeric', month: 'numeric' }) : '–')

export function Pokrok({ kids, results }: { kids: Kid[]; results: Vysledok[] }) {
  const [skopirovane, setSkopirovane] = useState<string | null>(null)
  const trieda = suhrn(results)
  const kopiruj = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); setSkopirovane(id); setTimeout(() => setSkopirovane(null), 2000) } catch {}
  }
  return (
    <div className="pokrok">
      <h3>Celá trieda</h3>
      <ul className="oblasti">
        {trieda.oblasti.map((o) => (
          <li key={o.area}>
            <span className="ob-nazov">{o.area}</span>
            <span className="ob-pruh"><i style={{ width: `${pruh(o.priemer)}%`, background: farba(o.priemer) }} /></span>
            <span className="ob-cislo">{o.zahrane ? `${o.zahrane}/${o.hier} hier` : 'zatiaľ nič'}</span>
          </li>
        ))}
      </ul>

      <h3>Deti</h3>
      {kids.map((k) => {
        const s = suhrn(results.filter((r) => r.child_id === k.id))
        const text = textHodnotenia(k.name, s, isGirl(k.avatar))
        return (
          <details key={k.id} className="dieta-pokrok">
            <summary>
              <span className="av">{emo(k.avatar)}</span>
              <strong>{k.name}</strong>
              <span className="note">{s.pokusy ? `${hier(s.pokusy)} · naposledy ${datum(s.naposledy)}` : 'zatiaľ nehralo'}</span>
              {s.silne.length > 0 && <span className="stitok dobre">darí sa: {s.silne.length}</span>}
              {s.podpora.length > 0 && <span className="stitok podpora">precvičiť: {s.podpora.length}</span>}
            </summary>
            <ul className="oblasti">
              {s.oblasti.map((o) => (
                <li key={o.area}>
                  <span className="ob-nazov">{o.area}</span>
                  <span className="ob-pruh"><i style={{ width: `${pruh(o.priemer)}%`, background: farba(o.priemer) }} /></span>
                  <span className="ob-cislo">
                    {o.zahrane ? `${o.zahrane}/${o.hier} hier` : '–'}
                    {o.pokusy >= 4 && o.posledny - o.prvy >= 0.5 && ' · ide hore'}
                  </span>
                </li>
              ))}
            </ul>
            <div className="hodnotenie">
              <span className="label">Text do hodnotenia (upravte podľa seba)</span>
              <p>{text}</p>
              <button type="button" className="ghost" onClick={() => kopiruj(k.id, text)}>{emo('📋')} {skopirovane === k.id ? 'Skopírované' : 'Kopírovať'}</button>
            </div>
          </details>
        )
      })}
      <p className="note">Pruh ukazuje priemer najlepších výsledkov v hrách oblasti: zelená = zvláda samo, žltá = precvičiť, červená = treba podporu. „Ide hore“ znamená, že posledné pokusy sú lepšie ako prvé.</p>
      <button type="button" className="ghost" onClick={() => window.print()}>{emo('🖨️')} Vytlačiť prehľad</button>
    </div>
  )
}
