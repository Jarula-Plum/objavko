'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Plynulé posúvanie stránky kolieskom myši (Lenis). Zapne sa len na počítači s myšou;
// na tabletoch a mobiloch je posúvanie prstom plynulé samo a pri obmedzení pohybu sa nepoužije.
let lenis: Lenis | null = null

export function PlynulyPosun() {
  useEffect(() => {
    let mysa = false, pokoj = true
    try { mysa = matchMedia('(pointer: fine)').matches; pokoj = matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
    if (!mysa || pokoj) return
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.9 })
    let id = 0
    const tik = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(tik) }
    id = requestAnimationFrame(tik)
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null }
  }, [])
  return null
}

// Plynulo posunie stránku k prvku alebo na začiatok; bez Lenisu obyčajný posun
export function posunNa(ciel: Element | number, odsadenie = -16) {
  // obsah mohol práve narásť (rozbalená oblasť), Lenis si preto najprv prepočíta výšku stránky
  if (lenis) { lenis.resize(); lenis.scrollTo(ciel as HTMLElement | number, { offset: odsadenie, duration: 0.9 }); return }
  if (typeof ciel === 'number') window.scrollTo(0, ciel)
  else ciel.scrollIntoView({ block: 'start' })
}
