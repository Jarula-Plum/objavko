import { describe, expect, it } from 'vitest'
import { AREAS, GAMES, podoblast } from '@/lib/games'

// Každá hra má na úvode podoblasť a žiadna oblasť nemá podoblasť s „Nad rámec“ v názve
describe('podoblasti ŠVP', () => {
  it('každá hra má krátku podoblasť', () => {
    for (const g of GAMES) {
      const p = podoblast(g)
      expect(p, g.id).toBeTruthy()
      expect(p.length, g.id).toBeLessThan(40)
      expect(p, g.id).not.toMatch(/Nad rámec/)
    }
  })
  it('každá oblasť má aspoň jednu hru', () => {
    for (const a of AREAS) expect(GAMES.some((g) => g.area === a), a).toBe(true)
  })
})
