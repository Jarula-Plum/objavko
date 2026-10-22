'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { type Game } from '@/lib/games'
import { type Item, type Theme } from '@/lib/themes'
import { Ui, emo, keyOf, picUrl } from './Emo'
import { GuideBar, cheer, speak } from './Guide'
import type { Level } from './Games'
import { CVIKY, NAMETY, type CvikId } from '@/lib/namety'
import { OMALOVANKY } from '@/lib/omalovanky'

// Cvičenia: omaľovánky, grafomotorika a kresliace diktáty.
// Kreslí sa na plátno prstom alebo myšou; obrysy ležia navrchu (násobenie), farba pod nimi.
const W = 1000
const PALETTE = ['#E53935', '#FB8C00', '#FDD835', '#7CB342', '#2E7D32', '#1E88E5', '#8E24AA', '#EC407A', '#8D6E63', '#37474F']
const ERASER = '#FFFFFF'

const shuffle = <T,>(a: T[]) => {
  const b = a.slice()
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}
const load = (src: string) => new Promise<HTMLImageElement | null>((res) => {
  const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src
})
const lineUrl = (e: string) => `/omalovanky/${keyOf(e)}.webp`
const hasLines = (x: Item) => OMALOVANKY.has(keyOf(x.e))
const say = (t: string) => { cheer('think', t); speak(t) }

type Layer = (ctx: CanvasRenderingContext2D) => Promise<void> | void

// Plátno: spodná vrstva farby, horná vrstva obrysov alebo predlohy
function Sheet({ draw, tool, color, size, sheetKey, onReady }: {
  draw: Layer; tool: 'fill' | 'brush'; color: string; size: number; sheetKey: string; onReady?: (lines: HTMLCanvasElement) => void
}) {
  const paint = useRef<HTMLCanvasElement>(null)
  const lines = useRef<HTMLCanvasElement>(null)
  const mask = useRef<Uint8Array | null>(null)
  const last = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    let live = true
    const l = lines.current!.getContext('2d')!
    const p = paint.current!.getContext('2d')!
    p.fillStyle = '#fff'; p.fillRect(0, 0, W, W)
    l.fillStyle = '#fff'; l.fillRect(0, 0, W, W)
    Promise.resolve(draw(l)).then(() => {
      if (!live) return
      const d = l.getImageData(0, 0, W, W).data
      const m = new Uint8Array(W * W)
      for (let i = 0; i < W * W; i++) m[i] = d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2] < 3 * 150 ? 1 : 0
      mask.current = m
      onReady?.(lines.current!)
    })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetKey])

  const at = (e: React.PointerEvent) => {
    const r = lines.current!.getBoundingClientRect()
    return { x: Math.round(((e.clientX - r.left) / r.width) * W), y: Math.round(((e.clientY - r.top) / r.height) * W) }
  }
  const fill = (x: number, y: number) => {
    const m = mask.current; if (!m || m[y * W + x]) return
    const ctx = paint.current!.getContext('2d')!
    const img = ctx.getImageData(0, 0, W, W)
    const c = parseInt(color.slice(1), 16), R = c >> 16, G = (c >> 8) & 255, B = c & 255
    const seen = new Uint8Array(W * W)
    const stack = [y * W + x]
    while (stack.length) {
      const i = stack.pop()!
      if (seen[i] || m[i]) continue
      let a = i; const row = Math.floor(i / W) * W
      while (a > row && !m[a - 1] && !seen[a - 1]) a--
      let up = false, down = false
      for (let j = a; j < row + W && !m[j] && !seen[j]; j++) {
        seen[j] = 1; img.data[j * 4] = R; img.data[j * 4 + 1] = G; img.data[j * 4 + 2] = B; img.data[j * 4 + 3] = 255
        const u = j - W, dn = j + W
        if (u >= 0) { const ok = !m[u] && !seen[u]; if (ok && !up) stack.push(u); up = ok }
        if (dn < W * W) { const ok = !m[dn] && !seen[dn]; if (ok && !down) stack.push(dn); down = ok }
      }
    }
    // farbu natiahneme aj pod tenký okraj čiary, aby nezostal biely lem
    ctx.putImageData(img, 0, 0)
  }
  const line = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const ctx = paint.current!.getContext('2d')!
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  const down = (e: React.PointerEvent) => {
    e.preventDefault()
    const p = at(e)
    if (tool === 'fill') { fill(p.x, p.y); return }
    lines.current!.setPointerCapture(e.pointerId)
    last.current = p; line(p, p)
  }
  const move = (e: React.PointerEvent) => {
    if (tool !== 'brush' || !last.current) return
    const p = at(e); line(last.current, p); last.current = p
  }
  const up = () => { last.current = null }

  return (
    <div className="sheet" key={sheetKey}>
      <canvas ref={paint} width={W} height={W} className="sheet-paint" />
      <canvas ref={lines} width={W} height={W} className="sheet-lines" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
    </div>
  )
}

function Tools({ tool, setTool, color, setColor, allowFill }: {
  tool: 'fill' | 'brush'; setTool: (t: 'fill' | 'brush') => void; color: string; setColor: (c: string) => void; allowFill: boolean
}) {
  return (
    <div className="tools">
      {allowFill && (
        <div className="tool-modes" role="radiogroup" aria-label="Nástroj">
          <button className={tool === 'fill' ? 'on' : ''} aria-pressed={tool === 'fill'} onClick={() => setTool('fill')}>{emo('🪣')} Vyfarbi</button>
          <button className={tool === 'brush' ? 'on' : ''} aria-pressed={tool === 'brush'} onClick={() => setTool('brush')}>{emo('🖌️')} Štetec</button>
        </div>
      )}
      <div className="swatches" role="radiogroup" aria-label="Farba">
        {PALETTE.map((c) => (
          <button key={c} className={`sw ${color === c ? 'on' : ''}`} style={{ background: c }} aria-label="farba" aria-pressed={color === c} onClick={() => setColor(c)} />
        ))}
        <button className={`sw eraser ${color === ERASER ? 'on' : ''}`} aria-label="guma" aria-pressed={color === ERASER} onClick={() => setColor(ERASER)}>{emo('🧽')}</button>
      </div>
    </div>
  )
}

function Frame({ game, speech, onBack, children }: { game: Game; speech: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <section className="game cvicenie" style={{ ['--c' as string]: game.color }}>
      <div className="ghead">
        <button className="back" onClick={() => { try { speechSynthesis.cancel() } catch {} ; onBack() }}><Ui n="spat" /> Späť</button>
        <button className="speak" onClick={() => say(speech)}><Ui n="zvuk" /> Zopakuj</button>
      </div>
      {children}
      <GuideBar />
    </section>
  )
}

const printSheet = (c: HTMLCanvasElement | null, title: string) => {
  if (!c) return
  const box = document.getElementById('print-sheet')
  if (!box) return
  box.innerHTML = ''
  const h = document.createElement('h1'); h.textContent = title
  const im = document.createElement('img'); im.src = c.toDataURL('image/png')
  box.append(h, im)
  im.onload = () => window.print()
}

// ---------- Omaľovánky ----------
export function Coloring({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const n = [1, 2, 4][level - 1]
  const pool = theme.items.filter(hasLines)
  const [order] = useState(() => shuffle(pool))
  const [page, setPage] = useState(0)
  const items = Array.from({ length: n }, (_, k) => order[(page * n + k) % order.length]).filter((x, k, a) => a.indexOf(x) === k)
  const [tool, setTool] = useState<'fill' | 'brush'>('fill')
  const [color, setColor] = useState(PALETTE[0])
  const linesRef = useRef<HTMLCanvasElement | null>(null)
  const names = items.map((x) => x.w.toLowerCase())
  const speech = `Vyfarbi ${names.length > 1 ? 'obrázky' : 'obrázok'}: ${names.join(', ')}. Ťukni na farbu a potom do obrázka.`
  useEffect(() => { say(speech) }, [speech])

  const draw = useCallback<Layer>(async (ctx) => {
    const ims = await Promise.all(items.map((x) => load(lineUrl(x.e))))
    const slots = n === 1 ? [[100, 100, 800]] : n === 2 ? [[20, 255, 470], [510, 255, 470]] : [[20, 20, 470], [510, 20, 470], [20, 510, 470], [510, 510, 470]]
    const thick = [2, 1, 0][level - 1]
    ims.forEach((im, k) => {
      if (!im) return
      const [x, y, s] = slots[k]
      // hrubšie obrysy pre najmenších: obrázok nakreslíme niekoľkokrát s posunom
      ctx.globalCompositeOperation = 'multiply'
      for (let dx = -thick; dx <= thick; dx++) for (let dy = -thick; dy <= thick; dy++) ctx.drawImage(im, x + dx, y + dy, s, s)
      ctx.globalCompositeOperation = 'source-over'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, level])

  if (!pool.length) return <Frame game={game} speech="" onBack={onBack}><p className="note">V tejto téme zatiaľ nie sú omaľovánky.</p></Frame>
  return (
    <Frame game={game} speech={speech} onBack={onBack}>
      <div className="prompt">{emo(`Vyfarbi: `)}<b>{names.join(', ')}</b></div>
      <Tools tool={tool} setTool={setTool} color={color} setColor={setColor} allowFill />
      <Sheet draw={draw} tool={tool} color={color} size={[34, 24, 16][level - 1]} sheetKey={`c${page}-${level}`} onReady={(c) => { linesRef.current = c }} />
      <div className="row sheet-actions">
        <button className="ghost" onClick={() => setPage((p) => p + 1)}><Ui n="dalej" /> Iný obrázok</button>
        <button className="ghost" onClick={() => printSheet(linesRef.current, `Omaľovánka: ${names.join(', ')}`)}>{emo('🖨️')} Vytlačiť</button>
        <button className="cta" onClick={() => onDone(3)}>{emo('✅')} Hotovo</button>
      </div>
    </Frame>
  )
}

// ---------- Grafomotorika ----------
type Pt = [number, number]
// Vzory podľa veku: od rovných čiar cez vlnky a zúbky po slučky a girlandy
const PATTERNS: { n: string; say: string; lv: Level; f: (x: number, len: number) => number; loop?: boolean }[] = [
  { n: 'rovná čiara', say: 'Ťahaj rovnú čiaru.', lv: 1, f: () => 0 },
  { n: 'veľká vlna', say: 'Ťahaj veľkú vlnu, ako keď sa hojdá loďka.', lv: 1, f: (x, len) => Math.sin((x / len) * Math.PI * 2) * 45 },
  { n: 'kopec', say: 'Ťahaj čiaru cez kopec, hore a dole.', lv: 1, f: (x, len) => -Math.sin((x / len) * Math.PI) * 70 },
  { n: 'vlnky', say: 'Ťahaj vlnky, hore a dole.', lv: 2, f: (x) => Math.sin((x / 110) * Math.PI * 2) * 38 },
  { n: 'zúbky', say: 'Ťahaj zúbky, ostro hore a ostro dole.', lv: 2, f: (x) => { const t = (x / 90) % 1; return (t < 0.5 ? t * 4 - 1 : 3 - t * 4) * 38 } },
  { n: 'mostíky', say: 'Ťahaj mostíky, oblúčik za oblúčikom.', lv: 2, f: (x) => -Math.abs(Math.sin((x / 100) * Math.PI)) * 55 + 25 },
  { n: 'slučky', say: 'Ťahaj slučky, točíme sa ako pružinka.', lv: 3, f: () => 0, loop: true },
  { n: 'girlanda', say: 'Ťahaj girlandu, oblúčiky dolu.', lv: 3, f: (x) => Math.abs(Math.sin((x / 90) * Math.PI)) * 50 - 25 },
  { n: 'schodíky', say: 'Ťahaj schodíky, hore a rovno, hore a rovno.', lv: 3, f: (x, len) => { const s = Math.floor(x / 70); const t = (x % 70) / 70; return 60 - (s + (t < 0.35 ? t / 0.35 : 1)) * (120 / (len / 70)) } },
]
const pathOf = (p: (typeof PATTERNS)[number], x0: number, x1: number, y: number): Pt[] => {
  const len = x1 - x0, out: Pt[] = []
  if (p.loop) {
    const r = 34, step = 70
    for (let t = 0; t <= (len / step) * Math.PI * 2; t += 0.05) out.push([x0 + (t / (Math.PI * 2)) * step - r * Math.sin(t) * 0.9, y - r * (1 - Math.cos(t))])
    return out.filter(([x]) => x <= x1)
  }
  for (let x = 0; x <= len; x += 3) out.push([x0 + x, y + p.f(x, len)])
  return out
}

export function Tracing({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const pats = PATTERNS.filter((p) => p.lv === level)
  const [page, setPage] = useState(0)
  const pat = pats[page % pats.length]
  const [pics] = useState(() => shuffle(theme.items.filter((x) => picUrl(x.e))))
  const [color, setColor] = useState('#1E88E5')
  const linesRef = useRef<HTMLCanvasElement | null>(null)
  const speech = `${pat.say} Začni pri obrázku vľavo a dokresli čiaru až k obrázku vpravo. Nezdvíhaj ruku.`
  useEffect(() => { say(speech) }, [speech])

  const draw = useCallback<Layer>(async (ctx) => {
    const rows = [190, 500, 810]
    for (const [k, y] of rows.entries()) {
      const a = pics[(page * 6 + k * 2) % pics.length], b = pics[(page * 6 + k * 2 + 1) % pics.length]
      const [ia, ib] = await Promise.all([load(picUrl(a.e)!), load(picUrl(b.e)!)])
      if (ia) ctx.drawImage(ia, 10, y - 70, 140, 140)
      if (ib) ctx.drawImage(ib, 850, y - 70, 140, 140)
      const pts = pathOf(pat, 160, 840, y + (pat.loop ? 35 : 0))
      ctx.save(); ctx.strokeStyle = '#8C97AE'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.setLineDash([2, 16])
      ctx.beginPath(); pts.forEach(([x, yy], i) => (i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy))); ctx.stroke(); ctx.restore()
      ctx.fillStyle = '#2E9D4F'; ctx.beginPath(); ctx.arc(pts[0][0], pts[0][1], 11, 0, Math.PI * 2); ctx.fill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, level])

  return (
    <Frame game={game} speech={speech} onBack={onBack}>
      <div className="prompt">Obťahuj: <b>{pat.n}</b></div>
      <Tools tool="brush" setTool={() => {}} color={color} setColor={setColor} allowFill={false} />
      <Sheet draw={draw} tool="brush" color={color} size={[16, 13, 10][level - 1]} sheetKey={`g${page}-${level}`} onReady={(c) => { linesRef.current = c }} />
      <div className="row sheet-actions">
        <button className="ghost" onClick={() => setPage((p) => p + 1)}><Ui n="dalej" /> Ďalší list</button>
        <button className="ghost" onClick={() => printSheet(linesRef.current, `Grafomotorika: ${pat.n}`)}>{emo('🖨️')} Vytlačiť</button>
        <button className="cta" onClick={() => onDone(3)}>{emo('✅')} Hotovo</button>
      </div>
    </Frame>
  )
}

// ---------- Diktáty ----------
// Veci, ktoré dieťa vie jednoducho nakresliť: čo nakresliť (4. pád), vedľa čoho (2. pád), nad/pod čím (7. pád)
type Draw = { e: string; acc: string; gen: string; ins: string }
const DRAWS: Draw[] = [
  { e: '☀️', acc: 'slniečko', gen: 'slniečka', ins: 'slniečkom' }, { e: '☁️', acc: 'obláčik', gen: 'obláčika', ins: 'obláčikom' },
  { e: '', acc: 'vranu', gen: 'vrany', ins: 'vranou' }, { e: '🏠', acc: 'domček', gen: 'domčeka', ins: 'domčekom' },
  { e: '🌳', acc: 'strom', gen: 'stromu', ins: 'stromom' }, { e: '🌼', acc: 'kvietok', gen: 'kvietka', ins: 'kvietkom' },
  { e: '🍎', acc: 'jablko', gen: 'jablka', ins: 'jablkom' }, { e: '🍄', acc: 'hríb', gen: 'hríba', ins: 'hríbom' },
  { e: '⚽', acc: 'loptu', gen: 'lopty', ins: 'loptou' }, { e: '❤️', acc: 'srdiečko', gen: 'srdiečka', ins: 'srdiečkom' },
  { e: '⭐', acc: 'hviezdičku', gen: 'hviezdičky', ins: 'hviezdičkou' }, { e: '🌙', acc: 'mesiac', gen: 'mesiaca', ins: 'mesiacom' },
  { e: '🚗', acc: 'auto', gen: 'auta', ins: 'autom' }, { e: '🐟', acc: 'rybku', gen: 'rybky', ins: 'rybkou' },
  { e: '🐈', acc: 'mačku', gen: 'mačky', ins: 'mačkou' }, { e: '🍐', acc: 'hrušku', gen: 'hrušky', ins: 'hruškou' },
  { e: '☂️', acc: 'dáždnik', gen: 'dáždnika', ins: 'dáždnikom' }, { e: '⛵', acc: 'loďku', gen: 'loďky', ins: 'loďkou' },
  { e: '🎈', acc: 'balón', gen: 'balóna', ins: 'balónom' }, { e: '🐌', acc: 'slimáka', gen: 'slimáka', ins: 'slimákom' },
  { e: '⛄', acc: 'snehuliaka', gen: 'snehuliaka', ins: 'snehuliakom' }, { e: '🐞', acc: 'lienku', gen: 'lienky', ins: 'lienkou' },
  { e: '🦋', acc: 'motýľa', gen: 'motýľa', ins: 'motýľom' }, { e: '🥕', acc: 'mrkvu', gen: 'mrkvy', ins: 'mrkvou' },
  { e: '🦔', acc: 'ježka', gen: 'ježka', ins: 'ježkom' }, { e: '🌷', acc: 'tulipán', gen: 'tulipánu', ins: 'tulipánom' },
  { e: '🐝', acc: 'včielku', gen: 'včielky', ins: 'včielkou' }, { e: '🐸', acc: 'žabku', gen: 'žabky', ins: 'žabkou' },
  { e: '🍓', acc: 'jahodu', gen: 'jahody', ins: 'jahodou' }, { e: '🐦', acc: 'vtáčika', gen: 'vtáčika', ins: 'vtáčikom' },
]
const DIRS = [
  { d: [0, -1], lv: 1, t: (x: Draw, y: Draw) => `Nad ${x.ins} nakresli ${y.acc}.` },
  { d: [0, 1], lv: 1, t: (x: Draw, y: Draw) => `Pod ${x.ins} nakresli ${y.acc}.` },
  { d: [1, 0], lv: 2, t: (x: Draw, y: Draw) => `Vedľa ${x.gen}, vpravo, nakresli ${y.acc}.` },
  { d: [-1, 0], lv: 2, t: (x: Draw, y: Draw) => `Vľavo od ${x.gen} nakresli ${y.acc}.` },
  { d: [1, 0], lv: 3, t: (x: Draw, y: Draw) => `Vpravo od ${x.gen} nakresli ${y.acc}.` },
] as const

function makeDictation(theme: Theme, level: Level) {
  const own = new Set(theme.items.map((x) => x.e))
  const pool = [...shuffle(DRAWS.filter((d) => own.has(d.e))), ...shuffle(DRAWS.filter((d) => !own.has(d.e)))]
  const count = [3, 4, 6][level - 1]
  const dirs = DIRS.filter((d) => d.lv <= level)
  const placed: { d: Draw; x: number; y: number }[] = [{ d: pool[0], x: 1, y: 1 }]
  const steps = [`Do stredu papiera nakresli ${pool[0].acc}.`]
  for (let tries = 0; placed.length < count && tries < 200; tries++) {
    const from = placed[Math.floor(Math.random() * placed.length)]
    const dir = dirs[Math.floor(Math.random() * dirs.length)]
    const x = from.x + dir.d[0], y = from.y + dir.d[1]
    if (x < 0 || x > 2 || y < 0 || y > 2 || placed.some((p) => p.x === x && p.y === y)) continue
    const d = pool[placed.length]
    placed.push({ d, x, y }); steps.push(dir.t(from.d, d))
  }
  return { placed, steps }
}

export function Dictation({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const [n, setN] = useState(0)
  const [dict, setDict] = useState(() => makeDictation(theme, level))
  const [step, setStep] = useState(0)
  const [show, setShow] = useState(false)
  const [color, setColor] = useState('#37474F')
  const done = step >= dict.steps.length
  const line = done ? 'Hotovo! Pozri sa, či ti to vyšlo.' : dict.steps[step]
  useEffect(() => { say(step === 0 ? `Počúvaj a kresli. ${line}` : line) }, [line, step])

  const draw = useCallback<Layer>((ctx) => {
    ctx.save(); ctx.strokeStyle = '#D5DCE8'; ctx.lineWidth = 3; ctx.setLineDash([10, 12])
    for (const k of [1, 2]) { ctx.beginPath(); ctx.moveTo((k * W) / 3, 20); ctx.lineTo((k * W) / 3, W - 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(20, (k * W) / 3); ctx.lineTo(W - 20, (k * W) / 3); ctx.stroke() }
    ctx.restore()
  }, [])
  const again = () => { setDict(makeDictation(theme, level)); setStep(0); setShow(false); setN((x) => x + 1) }

  return (
    <Frame game={game} speech={line} onBack={onBack}>
      <div className="prompt">{done ? <>Hotovo! <b>Pozri sa, či ti to vyšlo.</b></> : <>Krok {step + 1} z {dict.steps.length}: <b>{line}</b></>}</div>
      {!show && <Tools tool="brush" setTool={() => {}} color={color} setColor={setColor} allowFill={false} />}
      <div className="dict-wrap">
        <Sheet draw={draw} tool="brush" color={color} size={[12, 10, 8][level - 1]} sheetKey={`d${n}`} />
        {show && (
          <div className="dict-answer" aria-label="Takto to malo vyzerať">
            {dict.placed.map((p, k) => <span key={k} style={{ gridColumn: p.x + 1, gridRow: p.y + 1 }}>{emo(p.d.e)}</span>)}
          </div>
        )}
      </div>
      <div className="row sheet-actions">
        {!done && <button className="cta" onClick={() => setStep((s) => s + 1)}><Ui n="dalej" /> Ďalej</button>}
        {done && !show && <button className="cta" onClick={() => setShow(true)}>{emo('👀')} Ukáž, ako to má byť</button>}
        {done && show && <button className="ghost" onClick={again}><Ui n="znova" /> Nový diktát</button>}
        {done && <button className="cta" onClick={() => onDone(3)}>{emo('✅')} Hotovo</button>}
      </div>
      <details className="dict-text">
        <summary>Text diktátu pre pani učiteľku</summary>
        <ol>{dict.steps.map((s, k) => <li key={k}>{s}</li>)}</ol>
      </details>
    </Frame>
  )
}

// ---------- Zdravotné cvičenie ----------
// Riekanka po dvojveršiach; ku každému cvik, ktorý škriatok predvedie. Úroveň mení náročnosť cviku.
export function Exercise({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const steps = NAMETY[theme.id]?.z ?? NAMETY['zdravy']?.z ?? []
  const [step, setStep] = useState(0)
  const done = step >= steps.length
  const [verse, id] = done ? ['', 'skok' as CvikId] : steps[step]
  const cvik = CVIKY[id]
  const task = cvik.t[level - 1]
  const line = done ? 'Výborne! Docvičili sme. Teraz sa poriadne nadýchni a vydýchni.' : `${verse} ${task}`
  useEffect(() => { say(step === 0 ? `Poďme cvičiť! ${line}` : line) }, [line, step])

  return (
    <Frame game={game} speech={line} onBack={onBack}>
      <div className="prompt">{done ? <b>Výborne! Docvičili sme.</b> : <>Cvik {step + 1} z {steps.length}</>}</div>
      <div className="cvik">
        <img src={done ? '/skriatok/vesely-skriatok.webp' : cvik.p ? `/skriatok/p-${cvik.p}.webp` : '/skriatok/vesely-skriatok.webp'} alt="" />
        {!done && (
          <div>
            <p className="verse">{verse}</p>
            <p className="task">{task}</p>
          </div>
        )}
      </div>
      <div className="row sheet-actions">
        {!done && <button className="cta" onClick={() => setStep((s) => s + 1)}><Ui n="dalej" /> Ďalej</button>}
        {done && <button className="ghost" onClick={() => setStep(0)}><Ui n="znova" /> Ešte raz</button>}
        {done && <button className="cta" onClick={() => onDone(3)}>{emo('✅')} Hotovo</button>}
      </div>
      <details className="dict-text">
        <summary>Celá riekanka pre pani učiteľku</summary>
        <ol>{steps.map(([v, c], k) => <li key={k}>{v} <i>({CVIKY[c].t[level - 1]})</i></li>)}</ol>
      </details>
    </Frame>
  )
}
