'use client'

import { useEffect, useState } from 'react'
import { saveVoiceCfg, speak, voiceCfg, type VoiceCfg, type VoiceSet } from './Guide'

const WHO = [
  { id: 'chlapec', name: 'Čarozvedko', test: 'Ahoj, ja som Čarozvedko. Poď sa so mnou hrať!', def: { pitch: 1.45, rate: 0.95 } },
  { id: 'dievca', name: 'Čarozvedka', test: 'Ahoj, ja som Čarozvedka. Poď sa so mnou hrať!', def: { pitch: 1.3, rate: 0.95 } },
] as const

// Nastavenie hlasu sprievodcov na tomto zariadení: výber z hlasov, ktoré má prehliadač
export function VoicePicker() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [cfg, setCfg] = useState<Partial<VoiceCfg>>({})
  const [all, setAll] = useState(false)
  useEffect(() => {
    setCfg(voiceCfg())
    const load = () => { try { setVoices(speechSynthesis.getVoices()) } catch {} }
    load()
    try { speechSynthesis.addEventListener('voiceschanged', load); return () => speechSynthesis.removeEventListener('voiceschanged', load) } catch {}
  }, [])
  const list = all ? voices : voices.filter((v) => v.lang?.toLowerCase().startsWith('sk'))
  const set = (who: 'chlapec' | 'dievca', patch: Partial<VoiceSet>, def: VoiceSet) => {
    const next = { ...cfg, [who]: { ...def, ...cfg[who], ...patch } }
    setCfg(next); saveVoiceCfg(next)
  }
  return (
    <details className="voice-pick">
      <summary>Nastavenie hlasu Čarozvedka a Čarozvedky</summary>
      {!voices.length && <p className="note">Tento prehliadač nemá žiadne hlasy na čítanie.</p>}
      {voices.length > 0 && !list.length && <p className="note">Slovenský hlas tu nie je. Zapni „Ukázať všetky hlasy“ alebo si v nastaveniach zariadenia doinštaluj slovenský hlas.</p>}
      {voices.filter((v) => v.lang?.toLowerCase().startsWith('sk')).length === 1 && <p className="note">Tento prehliadač má len jeden slovenský hlas, Čarozvedko a Čarozvedka sa líšia iba výškou. Na počítači s Windows ponúka krajšie slovenské hlasy (Viktória a Lukáš) prehliadač Microsoft Edge.</p>}
      {WHO.map((w) => {
        const c = { ...w.def, ...cfg[w.id] }
        return (
          <fieldset key={w.id}>
            <legend>{w.name}</legend>
            <label>Hlas
              <select value={c.voice ?? ''} onChange={(e) => set(w.id, { voice: e.target.value || undefined }, w.def)}>
                <option value="">Automaticky</option>
                {list.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
              </select>
            </label>
            <label>Výška hlasu
              <input type="range" min="0.5" max="2" step="0.05" value={c.pitch} onChange={(e) => set(w.id, { pitch: Number(e.target.value) }, w.def)} />
            </label>
            <label>Rýchlosť
              <input type="range" min="0.6" max="1.3" step="0.05" value={c.rate} onChange={(e) => set(w.id, { rate: Number(e.target.value) }, w.def)} />
            </label>
            <button type="button" className="ghost" onClick={() => speak(w.test, w.id)}>Vypočuť</button>
          </fieldset>
        )
      })}
      <label className="row"><input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> Ukázať všetky hlasy, aj iné jazyky</label>
      <button type="button" className="ghost" onClick={() => { setCfg({}); saveVoiceCfg({}) }}>Vrátiť pôvodné</button>
    </details>
  )
}
