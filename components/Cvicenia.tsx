'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type Game } from '@/lib/games'
import { type Item, type Theme } from '@/lib/themes'
import { Ui, emo, keyOf, picUrl } from './Emo'
import { GuideBar, cheer, speak } from './Guide'
import type { Level } from './Games'
import { CVIKY, NAMETY, type CvikId } from '@/lib/namety'
import { OMALOVANKY } from '@/lib/omalovanky'
import { spill } from '@/lib/fx'

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
    // vyplnené miesto nakreslíme najprv do samostatnej vrstvy a tá sa potom rozleje z miesta ťuknutia
    const img = ctx.createImageData(W, W)
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
    const layer = document.createElement('canvas')
    layer.width = W; layer.height = W
    layer.getContext('2d')!.putImageData(img, 0, 0)
    spill(ctx, layer, x, y)
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

// Tlač omaľovánky na celú stranu A4 (na výšku): obrysy kreslíme priamo z predlôh vo vysokom rozlíšení
const printColoring = async (pics: string[], level: Level, title: string) => {
  const PW = 1600, PH = 2200 // pomer strany A4 bez okrajov a nadpisu
  const c = document.createElement('canvas'); c.width = PW; c.height = PH
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, PW, PH)
  const ims = await Promise.all(pics.map((e) => load(lineUrl(e))))
  const n = ims.length
  const slots = n === 1 ? [[0, (PH - PW) / 2, PW]]
    : n === 2 ? [[(PW - 1080) / 2, 0, 1080], [(PW - 1080) / 2, 1100, 1080]]
    : [[0, 300, 790], [810, 300, 790], [0, 1110, 790], [810, 1110, 790]]
  const thick = [3, 2, 1][level - 1]
  ctx.globalCompositeOperation = 'multiply'
  ims.forEach((im, k) => {
    if (!im || !slots[k]) return
    const [x, y, sz] = slots[k]
    for (let dx = -thick; dx <= thick; dx++) for (let dy = -thick; dy <= thick; dy++) ctx.drawImage(im, x + dx, y + dy, sz, sz)
  })
  printSheet(c, title)
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
        <button className="ghost" onClick={() => printColoring(items.map((x) => x.e), level, `Omaľovánka: ${names.join(', ')}`)}>{emo('🖨️')} Vytlačiť</button>
        <button className="cta" onClick={() => onDone(3)}>{emo('✅')} Hotovo</button>
      </div>
    </Frame>
  )
}

// ---------- Pracovné listy ----------
// List sa poskladá z obrázkov témy. Dieťa spája a krúžkuje štetcom na tablete, alebo si list vytlačí.
type ListId = 'spoj' | 'tien' | 'pocet' | 'viac' | 'pridaj' | 'velky' | 'rad' | 'iny' | 'cesta' | 'tangram'
const LISTY: { id: ListId; n: string; say: string }[] = [
  { id: 'spoj', n: 'Spoj rovnaké', say: 'Spoj čiarou rovnaké obrázky.' },
  { id: 'tien', n: 'Nájdi tieň', say: 'Spoj každý obrázok s jeho tieňom.' },
  { id: 'pocet', n: 'Spočítaj', say: 'Spočítaj obrázky v rámčeku a zakrúžkuj správne číslo.' },
  { id: 'viac', n: 'Kde je viac?', say: 'V každom riadku zakrúžkuj rámček, v ktorom je viac obrázkov.' },
  { id: 'pridaj', n: 'Koľko ich bude?', say: 'K obrázkom prišli ďalšie. Spočítaj oba rámčeky a zakrúžkuj, koľko ich je spolu.' },
  { id: 'velky', n: 'Najväčší', say: 'V každom riadku zakrúžkuj najväčší obrázok.' },
  { id: 'rad', n: 'Čo bude ďalej?', say: 'Pozri sa na rad obrázkov. Vpravo zakrúžkuj obrázok, ktorý patrí na otáznik.' },
  { id: 'iny', n: 'Čo je iné?', say: 'V každom riadku zakrúžkuj obrázok, ktorý je iný.' },
  { id: 'cesta', n: 'Kam vedie cestička?', say: 'Choď prstom po cestičke od každého obrázka a obťahuj ju farbou. Kam ťa doviedla?' },
  { id: 'tangram', n: 'Tangram', say: 'Tangram si vytlač, vystrihni sedem dielikov a poskladaj z nich domček, mačku alebo svoj obrázok.' },
]
type ListOp =
  | { k: 'pic'; e: string; x: number; y: number; s: number; tien?: boolean }
  | { k: 'text'; t: string; x: number; y: number; s: number }
  | { k: 'box'; x: number; y: number; w: number; h: number }
  | { k: 'dot'; x: number; y: number }
  | { k: 'line'; x1: number; y1: number; x2: number; y2: number; strong?: boolean }
  | { k: 'curve'; pts: number[] }

const pick = <T,>(a: T[], n: number) => shuffle(a).slice(0, n)
const rint = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1))

// c rovnakých obrázkov v mriežke vo vnútri obdĺžnika (najviac 4 v riadku). Veľkosť je obmedzená,
// aby jeden obrázok nevyzeral ako „viac“ len preto, že je veľký.
function grid(ops: ListOp[], e: string, c: number, x0: number, y0: number, w: number, h: number) {
  const cols = Math.min(c, 4), lines = Math.ceil(c / cols)
  const s = Math.min(w / cols, h / lines, 130) * 0.82
  for (let i = 0; i < c; i++) {
    ops.push({ k: 'pic', e, x: x0 + (i % cols) * (w / cols) + (w / cols - s) / 2, y: y0 + Math.floor(i / cols) * (h / lines) + (h / lines - s) / 2, s })
  }
}
// Tri čísla na zakrúžkovanie: správne a dve iné, zoradené
function numbers(ops: ListOp[], ok: number, max: number, x0: number, y: number) {
  const nums = new Set([ok])
  while (nums.size < 3) nums.add(rint(1, Math.max(max, 4)))
  ;[...nums].sort((a, b) => a - b).forEach((v, i) => ops.push({ k: 'text', t: String(v), x: x0 + i * 90, y, s: 76 }))
}

// Rozloženie listu na plátne 1000 × 1000; každý riadok má rovnakú výšku
function planList(id: ListId, pool: string[], level: Level): ListOp[] {
  const ops: ListOp[] = []
  if (id === 'spoj' || id === 'tien') {
    const n = Math.min([3, 4, 5][level - 1], pool.length)
    const left = pick(pool, n), right = shuffle(left)
    const h = 1000 / n, s = Math.min(h * 0.78, 190)
    left.forEach((e, k) => {
      const y = k * h + (h - s) / 2
      ops.push({ k: 'pic', e, x: 60, y, s }, { k: 'dot', x: 60 + s + 35, y: y + s / 2 })
    })
    right.forEach((e, k) => {
      const y = k * h + (h - s) / 2
      ops.push({ k: 'pic', e, x: 940 - s, y, s, tien: id === 'tien' }, { k: 'dot', x: 940 - s - 35, y: y + s / 2 })
    })
  }
  if (id === 'pocet') {
    const rows = [2, 3, 3][level - 1], max = [3, 5, 8][level - 1]
    const h = 1000 / rows
    pick(pool, rows).forEach((e, k) => {
      const c = rint(1, max), y0 = k * h + 15, bh = h - 30
      ops.push({ k: 'box', x: 20, y: y0, w: 640, h: bh })
      grid(ops, e, c, 40, y0, 600, bh)
      numbers(ops, c, max, 745, y0 + bh / 2)
    })
  }
  if (id === 'viac') {
    const rows = [2, 3, 4][level - 1], max = [6, 8, 10][level - 1]
    const h = 1000 / rows
    for (let k = 0; k < rows; k++) {
      const [a, b] = pick(pool, 2), y0 = k * h + 12, bh = h - 24
      // najmenší majú výrazný rozdiel, najstarší aj rozdiel o jeden
      let ca = rint(1, max), cb = rint(1, max)
      while (Math.abs(ca - cb) < [3, 2, 1][level - 1]) { ca = rint(1, max); cb = rint(1, max) }
      ops.push({ k: 'box', x: 20, y: y0, w: 460, h: bh }, { k: 'box', x: 520, y: y0, w: 460, h: bh })
      grid(ops, a, ca, 30, y0 + 5, 440, bh - 10)
      grid(ops, level === 1 ? a : b, cb, 530, y0 + 5, 440, bh - 10)
    }
  }
  if (id === 'pridaj') {
    const rows = [2, 3, 3][level - 1], top = [3, 4, 6][level - 1], plus = [1, 2, 3][level - 1]
    const h = 1000 / rows
    pick(pool, rows).forEach((e, k) => {
      const a = rint(1, top), b = rint(1, plus), y0 = k * h + 15, bh = h - 30
      ops.push({ k: 'box', x: 10, y: y0, w: 330, h: bh }, { k: 'box', x: 400, y: y0, w: 190, h: bh })
      grid(ops, e, a, 20, y0, 310, bh)
      grid(ops, e, b, 410, y0, 170, bh)
      ops.push({ k: 'text', t: '+', x: 370, y: y0 + bh / 2, s: 70 }, { k: 'text', t: '=', x: 625, y: y0 + bh / 2, s: 70 })
      numbers(ops, a + b, top + plus, 720, y0 + bh / 2)
    })
  }
  if (id === 'velky') {
    const rows = [2, 3, 4][level - 1], per = level === 1 ? 3 : 4
    const h = 1000 / rows
    pick(pool, rows).forEach((e, k) => {
      const big = Math.min(h * 0.85, 230)
      shuffle([1, 0.72, 0.52, 0.36].slice(0, per)).forEach((f, i) => {
        const s = big * f, slot = 1000 / per
        ops.push({ k: 'pic', e, x: i * slot + (slot - s) / 2, y: k * h + (h - s) / 2, s })
      })
      if (k) ops.push({ k: 'line', x1: 20, y1: k * h, x2: 980, y2: k * h })
    })
  }
  if (id === 'rad') {
    const rows = [2, 3, 3][level - 1]
    const h = 1000 / rows, s = Math.min(h * 0.55, 92)
    const shapes = level === 1 ? ['AB'] : level === 2 ? ['AB', 'ABC'] : ['ABC', 'AAB', 'ABB']
    for (let k = 0; k < rows; k++) {
      const shape = shapes[k % shapes.length]
      const used = pick(pool, 3)
      const seq = Array.from({ length: 6 }, (_, i) => used['ABC'.indexOf(shape[i % shape.length])])
      const y = k * h + (h - s) / 2
      seq.forEach((e, i) => {
        const x = 20 + i * 108
        if (i < 5) ops.push({ k: 'pic', e, x, y, s })
        else { ops.push({ k: 'box', x, y, w: s, h: s }); ops.push({ k: 'text', t: '?', x: x + s / 2, y: y + s / 2, s: 64 }) }
      })
      ops.push({ k: 'line', x1: 680, y1: k * h + 20, x2: 680, y2: (k + 1) * h - 20 })
      const opts = shuffle([...new Set([seq[5], ...used])].slice(0, level === 1 ? 2 : 3))
      opts.forEach((e, i) => ops.push({ k: 'pic', e, x: 710 + i * 98, y, s: Math.min(s, 86) }))
      if (k) ops.push({ k: 'line', x1: 20, y1: k * h, x2: 980, y2: k * h })
    }
  }
  if (id === 'cesta') {
    // Zamotané cestičky od obrázkov vľavo k rovnakým obrázkom vpravo (podľa hry Stratené povolania)
    const n = Math.min([3, 4, 4][level - 1], pool.length)
    const left = pick(pool, n)
    // každý obrázok vedie do iného riadku, aby cestičky neboli rovné
    let right = shuffle(left)
    for (let t = 0; t < 30 && right.some((e, k) => e === left[k]); t++) right = shuffle(left)
    const h = 1000 / n, s = Math.min(h * 0.62, 150)
    const swing = [180, 260, 340][level - 1]
    left.forEach((e, k) => {
      const y1 = k * h + h / 2, y2 = right.indexOf(e) * h + h / 2
      ops.push({ k: 'pic', e, x: 30, y: y1 - s / 2, s }, { k: 'pic', e, x: 970 - s, y: y2 - s / 2, s })
      ops.push({ k: 'curve', pts: [30 + s + 10, y1, 380, y1 + rint(-swing, swing), 620, y2 + rint(-swing, swing), 960 - s, y2] })
    })
  }
  if (id === 'tangram') {
    // Šablóna tangramu (7 dielikov) na vystrihnutie, ako v podkladoch pani učiteľky
    const X = 150, Y = 30, S = 700, P = (x: number, y: number) => [X + x * S, Y + y * S]
    const seg = (a: number[], b: number[]) => ops.push({ k: 'line', x1: a[0], y1: a[1], x2: b[0], y2: b[1], strong: true })
    seg(P(0, 0), P(1, 0)); seg(P(1, 0), P(1, 1)); seg(P(1, 1), P(0, 1)); seg(P(0, 1), P(0, 0))
    seg(P(0, 1), P(1, 0)); seg(P(0, 0), P(0.75, 0.75)); seg(P(0.75, 0.25), P(0.75, 0.75)); seg(P(0.25, 0.75), P(0.5, 1)); seg(P(0.5, 1), P(1, 0.5))
    ops.push({ k: 'text', t: 'Vystrihni 7 dielikov a poskladaj', x: 500, y: 830, s: 40 }, { k: 'text', t: 'domček, mačku alebo svoj obrázok.', x: 500, y: 890, s: 40 })
  }
  if (id === 'iny') {
    const rows = [2, 3, 4][level - 1], per = level === 1 ? 4 : 5
    const h = 1000 / rows, slot = 1000 / per, s = Math.min(h * 0.75, slot * 0.8)
    for (let k = 0; k < rows; k++) {
      const [a, b] = pick(pool, 2), odd = rint(0, per - 1)
      for (let i = 0; i < per; i++) ops.push({ k: 'pic', e: i === odd ? b : a, x: i * slot + (slot - s) / 2, y: k * h + (h - s) / 2, s })
      if (k) ops.push({ k: 'line', x1: 20, y1: k * h, x2: 980, y2: k * h })
    }
  }
  return ops
}

async function drawList(ctx: CanvasRenderingContext2D, ops: ListOp[]) {
  const urls = [...new Set(ops.flatMap((o) => (o.k === 'pic' ? [picUrl(o.e) ?? ''] : [])))].filter(Boolean)
  const ims = new Map(await Promise.all(urls.map(async (u) => [u, await load(u)] as const)))
  ctx.strokeStyle = '#9e9e9e'; ctx.fillStyle = '#333'; ctx.lineWidth = 4
  for (const o of ops) {
    if (o.k === 'pic') {
      const im = ims.get(picUrl(o.e) ?? '')
      if (!im) continue
      if (!o.tien) { ctx.drawImage(im, o.x, o.y, o.s, o.s); continue }
      // tieň: obrázok vyplnený tmavou farbou
      const c = document.createElement('canvas'); c.width = c.height = Math.ceil(o.s)
      const t = c.getContext('2d')!
      t.drawImage(im, 0, 0, o.s, o.s); t.globalCompositeOperation = 'source-in'; t.fillStyle = '#3a3a3a'; t.fillRect(0, 0, o.s, o.s)
      ctx.drawImage(c, o.x, o.y)
    } else if (o.k === 'text') {
      ctx.font = `bold ${o.s}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.t, o.x, o.y)
    } else if (o.k === 'box') {
      ctx.strokeRect(o.x, o.y, o.w, o.h)
    } else if (o.k === 'dot') {
      ctx.beginPath(); ctx.arc(o.x, o.y, 13, 0, Math.PI * 2); ctx.fill()
    } else if (o.k === 'curve') {
      const [x0, y0, ax, ay, bx, by, x1, y1] = o.pts
      ctx.save(); ctx.lineWidth = 7; ctx.setLineDash([18, 12]); ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(ax, ay, bx, by, x1, y1); ctx.stroke(); ctx.restore()
    } else {
      ctx.save(); if (o.strong) { ctx.strokeStyle = '#222'; ctx.lineWidth = 5 }
      ctx.beginPath(); ctx.moveTo(o.x1, o.y1); ctx.lineTo(o.x2, o.y2); ctx.stroke(); ctx.restore()
    }
  }
}

export function Worksheets({ game, theme, level, onDone, onBack }: {
  game: Game; theme: Theme; level: Level; onDone: (s: number) => void; onBack: () => void
}) {
  const pool = [...new Set(theme.items.map((x) => x.e))].filter((e) => picUrl(e))
  const [kind, setKind] = useState<ListId>('spoj')
  const [page, setPage] = useState(0)
  const [color, setColor] = useState(PALETTE[5])
  const linesRef = useRef<HTMLCanvasElement | null>(null)
  const list = LISTY.find((x) => x.id === kind)!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ops = useMemo(() => planList(kind, pool, level), [kind, page, level, theme.id])
  const draw = useCallback<Layer>((ctx) => drawList(ctx, ops), [ops])
  useEffect(() => { say(list.say) }, [list.say, page])

  if (pool.length < 3) return <Frame game={game} speech="" onBack={onBack}><p className="note">V tejto téme je na pracovné listy málo obrázkov.</p></Frame>
  return (
    <Frame game={game} speech={list.say} onBack={onBack}>
      <div className="tool-modes" role="radiogroup" aria-label="Pracovný list">
        {LISTY.map((x) => (
          <button key={x.id} className={x.id === kind ? 'on' : ''} aria-pressed={x.id === kind} onClick={() => { setKind(x.id); setPage((p) => p + 1) }}>{x.n}</button>
        ))}
      </div>
      <div className="prompt"><b>{list.say}</b></div>
      <Tools tool="brush" setTool={() => {}} color={color} setColor={setColor} allowFill={false} />
      <Sheet draw={draw} tool="brush" color={color} size={[14, 11, 8][level - 1]} sheetKey={`l${kind}-${page}-${level}-${theme.id}`} onReady={(c) => { linesRef.current = c }} />
      <div className="row sheet-actions">
        <button className="ghost" onClick={() => setPage((p) => p + 1)}><Ui n="dalej" /> Iný list</button>
        <button className="ghost" onClick={() => printSheet(linesRef.current, `${list.n} (${theme.name})   Meno: ....................`)}>{emo('🖨️')} Vytlačiť</button>
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
