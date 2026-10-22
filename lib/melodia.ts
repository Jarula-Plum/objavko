// Navrhnutá melódia pre nové pesničky Objavka.
// Z textu spočíta slabiky a zloží jednoduchú pentatonickú detskú melódiu:
// 1. a 3. verš majú rovnaký motív, 2. verš končí na re (otázka), posledný na do (odpoveď).
// Melódia je pre každú pesničku vždy rovnaká (odvodená z názvu).

export type Nota = { p: number; d: number } // p = poltóny od do (C4), d = dĺžka v dobách
export type Vers = { text: string; noty: Nota[] }

const MENO: Record<number, string> = { [-3]: 'la↓', [-5]: 'sol↓', 0: 'do', 2: 're', 4: 'mi', 5: 'fa', 7: 'sol', 9: 'la', 12: 'do↑' }
const STUPNE = [-5, -3, 0, 2, 4, 7, 9, 12] // pentatonika so spodným sol a la

const SAMO = 'aáäeéiíoóôuúyýAÁÄEÉIÍOÓÔUÚYÝ'
export function slabiky(slovo: string): number {
  const w = slovo.toLowerCase().replace(/[^a-záäčďéíĺľňóôŕšťúýž]/g, '')
  if (!w || /^[kszv]$/.test(w)) return 0 // predložky k, s, z, v nemajú slabiku
  const v = w.replace(/i[aeu]|ô/g, 'a') // dvojhlásky = jedna slabika
  let n = 0
  for (let i = 0; i < v.length; i++) if (SAMO.includes(v[i]) && !(i > 0 && SAMO.includes(v[i - 1]))) n++
  // slabikotvorné r, l (vlk, prst, krk)
  n += (v.match(/(^|[^aáäeéiíoóuúyý])[rlŕĺ](?=[^aáäeéiíoóuúyý]|$)/g) || []).length
  return Math.max(1, n)
}

function rnd(seed: string) {
  let h = 2166136261
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296
}

function motiv(n: number, start: number, end: number, r: () => number): number[] {
  if (n === 1) return [end]
  const out = [start]
  let i = STUPNE.indexOf(start)
  for (let k = 1; k < n - 1; k++) {
    // k cieľu sa blížime postupne, inak krok hore/dole alebo opakovanie
    const left = n - 1 - k
    const goal = STUPNE.indexOf(end)
    let step = r() < 0.25 ? 0 : r() < 0.5 ? 1 : -1
    if (r() < 0.12) step *= 2
    if (Math.abs(i + step - goal) > left + 1) step = Math.sign(goal - i)
    i = Math.min(STUPNE.length - 2, Math.max(1, i + step))
    out.push(STUPNE[i])
  }
  out.push(end)
  return out
}

export function melodia(nazov: string, text: string): Vers[] {
  const r = rnd(nazov)
  const riadky = text.split('\n').filter((x) => x.trim())
  const zac = [7, 4, 0][Math.floor(r() * 3)]
  const konce = [r() < 0.5 ? 7 : 4, 2, r() < 0.5 ? 7 : 4, 0]
  const cache: Record<string, number[]> = {}
  return riadky.map((line, idx) => {
    const n = line.split(/\s+/).reduce((a, w) => a + slabiky(w), 0)
    const pos = idx === riadky.length - 1 ? 3 : idx % 4 === 3 ? 1 : idx % 4
    const key = `${pos % 2 === 0 ? 'a' : 'b' + pos}-${n}`
    const end = konce[pos]
    let p = pos === 2 && cache[`a-${n}`] ? cache[`a-${n}`] : cache[key]
    if (!p) p = cache[key] = motiv(n, pos === 1 ? 9 : pos === 3 ? 4 : zac, end, r)
    if (pos === 3 && p[p.length - 1] !== 0) p = [...p.slice(0, -1), 0]
    return { text: line, noty: p.map((q, k) => ({ p: q, d: k === p.length - 1 ? 2 : 1 })) }
  })
}

export const solmi = (v: Vers) => v.noty.map((n) => MENO[n.p] ?? '?').join(' ')

let ctx: AudioContext | null = null
export function stopMelodia() {
  if (ctx) { ctx.close(); ctx = null }
}

/** Prehrá melódiu; onLine(i) hlási, ktorý verš práve znie (-1 = koniec). */
export function zahraj(verse: Vers[], onLine?: (i: number) => void, tempo = 104) {
  stopMelodia()
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const c = (ctx = new AC())
  const beat = 60 / tempo
  let t = c.currentTime + 0.15
  verse.forEach((v, i) => {
    window.setTimeout(() => ctx === c && onLine?.(i), (t - c.currentTime) * 1000)
    for (const n of v.noty) {
      const f = 261.63 * Math.pow(2, n.p / 12)
      const o = c.createOscillator()
      const g = c.createGain()
      o.type = 'triangle'
      o.frequency.value = f
      const len = n.d * beat
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.35, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.08, t + len * 0.9)
      g.gain.linearRampToValueAtTime(0, t + len * 0.98)
      o.connect(g).connect(c.destination)
      o.start(t)
      o.stop(t + len)
      t += len
    }
    t += beat * 0.5
  })
  const end = t
  window.setTimeout(() => { if (ctx === c) { onLine?.(-1); stopMelodia() } }, (end - c.currentTime) * 1000 + 200)
}
