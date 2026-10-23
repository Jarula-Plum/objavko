'use client'

import { useEffect, type RefObject } from 'react'
import { hop, pop, shake } from '@/lib/fx'

// Animácie v hre: sleduje tlačidlá s odpoveďami (triedy right a wrong) a sprievodcov, takže fungujú vo všetkých hrách naraz
export function useFx(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current; if (!el) return
    const obs = new MutationObserver((list) => {
      for (const m of list) {
        const t = m.target as HTMLElement
        if (!(t instanceof HTMLElement) || !t.classList.contains('opt')) continue
        const before = m.oldValue ?? ''
        if (t.classList.contains('right') && !/\bright\b/.test(before)) pop(t)
        if (t.classList.contains('wrong') && !/\bwrong\b/.test(before)) shake(t)
      }
    })
    obs.observe(el, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true })
    // Nesprávna odpoveď na rovnaké tlačidlo znova: tlačidlo sa vymení (nový key), preto sledujeme aj pridané prvky
    const added = new MutationObserver((list) => {
      for (const m of list) m.addedNodes.forEach((n) => { if (n instanceof HTMLElement && n.classList.contains('opt') && n.classList.contains('wrong')) shake(n) })
    })
    added.observe(el, { subtree: true, childList: true })
    const guide = (e: Event) => {
      const mood = (e as CustomEvent<{ mood: string }>).detail?.mood
      if (mood !== 'joy' && mood !== 'wow') return
      // počkáme, kým React vymení obrázky sprievodcov za radostné
      requestAnimationFrame(() => el.querySelectorAll('.guide-bar .g-boy, .guide-bar .g-girl').forEach((g, k) => setTimeout(() => hop(g, 18), k * 120)))
    }
    window.addEventListener('objavko-guide', guide)
    return () => { obs.disconnect(); added.disconnect(); window.removeEventListener('objavko-guide', guide) }
  }, [root])
}
