import { gsap } from 'gsap'

// Krátke a pokojné animácie (GSAP). Keď má zariadenie zapnuté obmedzenie pohybu, nič sa nehýbe.
export const calm = () => {
  try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return true }
}

// Správna odpoveď: obrázok poskočí a rozletia sa hviezdičky
export function pop(el: Element) {
  if (calm()) return
  gsap.fromTo(el, { scale: 1, y: 0 }, { scale: 1.14, y: -8, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: 'auto', clearProps: 'transform' })
  burst(el)
}

// Nesprávna odpoveď: jemné „nie“ hlavou
export function shake(el: Element) {
  if (calm()) return
  gsap.fromTo(el, { x: 0 }, { keyframes: { x: [0, -9, 8, -5, 3, 0] }, duration: 0.42, ease: 'power1.out', overwrite: 'auto', clearProps: 'transform' })
}

// Poskočenie (sprievodcovia pri radosti)
export function hop(el: Element, h = 16) {
  if (calm()) return
  gsap.fromTo(el, { y: 0 }, { y: -h, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: 'auto', clearProps: 'transform' })
}

// Obrázok sa „nadýchne“ (maľované čítanie)
export function breathe(el: Element) {
  if (calm()) return
  gsap.fromTo(el, { scale: 1 }, { scale: 1.35, duration: 0.25, ease: 'back.out(3)', yoyo: true, repeat: 1, overwrite: 'auto', clearProps: 'transform' })
}

// Hviezdičky, ktoré sa rozletia zo stredu prvku
export function burst(el: Element, n = 9, src = '/emoji/2b50.webp') {
  if (calm()) return
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2
  for (let k = 0; k < n; k++) {
    const s = document.createElement('img')
    s.src = src; s.alt = ''; s.className = 'fx-star'
    s.style.left = `${cx}px`; s.style.top = `${cy}px`
    document.body.appendChild(s)
    const a = (k / n) * Math.PI * 2 + Math.random() * 0.5, d = 60 + Math.random() * 50
    gsap.fromTo(s, { x: 0, y: 0, scale: 0.3, opacity: 1, rotation: 0 }, {
      x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 0.6 + Math.random() * 0.5, opacity: 0, rotation: gsap.utils.random(-120, 120),
      duration: 0.7, ease: 'power2.out', onComplete: () => s.remove(),
    })
  }
}

// Koniec hry: hviezdy sa vkotúľajú jedna po druhej a odmena sa otvorí
export function reward(stars: Element[], prize: Element | null) {
  if (calm()) return
  gsap.from(stars, { scale: 0, rotation: -180, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.28, delay: 0.15, clearProps: 'transform' })
  if (prize) gsap.from(prize, { scale: 0.2, rotation: -20, opacity: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)', delay: 0.15 + stars.length * 0.28, clearProps: 'all' })
}

// Omaľovánka: farba sa rozleje kruhom z miesta ťuknutia
export function spill(ctx: CanvasRenderingContext2D, layer: HTMLCanvasElement, x: number, y: number) {
  const W = layer.width, H = layer.height
  if (calm()) { ctx.drawImage(layer, 0, 0); return }
  const max = Math.hypot(Math.max(x, W - x), Math.max(y, H - y))
  const o = { r: 0 }
  gsap.to(o, {
    r: max, duration: 0.5, ease: 'power2.out',
    onUpdate: () => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, o.r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(layer, 0, 0); ctx.restore() },
  })
}
