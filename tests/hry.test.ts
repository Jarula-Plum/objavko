import { describe, expect, it } from 'vitest'
import { THEMES } from '@/lib/themes'
import { GAMES } from '@/lib/games'
import { BEZ_KOL, kola, type Level } from '@/components/Games'

// Každá kvízová hra musí v každej téme a úrovni dať 5 kôl a v každom kole práve jednu správnu odpoveď.
// Hry sú náhodné, preto každú kombináciu skúsime niekoľkokrát.
const KVIZY = GAMES.filter((g) => !BEZ_KOL.includes(g.id))

describe('kolá kvízov', () => {
  for (const g of KVIZY) {
    it(g.name, async () => {
      for (const t of THEMES) {
        // krátka pauza po každej téme, aby sa dlhé hry (rýmy) neodpojili od nástroja na testy
        await new Promise((r) => setImmediate(r))
        for (const lv of [1, 2, 3] as Level[]) for (let opak = 0; opak < 3; opak++) {
        const r = kola(g.id, t, lv)
        const kde = `${g.id} / ${t.id} / úroveň ${lv}`
        expect(r.length, `počet kôl: ${kde}`).toBe(5)
        for (const k of r) {
          if (k.walk?.place) continue // krokovanie: dieťa kladie šípky samo
          const spravne = k.options.filter((o) => o.correct).length
          expect(spravne, `správne odpovede v kole „${k.speech}“: ${kde}`).toBe(1)
          // Hýbme sa: dieťa cvičí a potom ťukne na jediné tlačidlo Hotovo
          if (g.id !== 'pohyb') expect(k.options.length, `aspoň 2 možnosti: ${kde}`).toBeGreaterThanOrEqual(2)
        }
        }
      }
    })
  }
})
