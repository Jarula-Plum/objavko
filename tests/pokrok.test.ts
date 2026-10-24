import { describe, expect, it } from 'vitest'
import { suhrn, textHodnotenia } from '@/lib/pokrok'

// Prehľad pokroku: priemer najlepších výsledkov v oblasti, silné stránky, podpora a text do hodnotenia
describe('prehľad pokroku', () => {
  const v = [
    { child_id: 'a', game_id: 'pocty', stars: 1, played_at: '2026-10-01' },
    { child_id: 'a', game_id: 'pocty', stars: 3, played_at: '2026-10-05' },
    { child_id: 'a', game_id: 'viac', stars: 3, played_at: '2026-10-06' },
    { child_id: 'a', game_id: 'rymy', stars: 1, played_at: '2026-10-07' },
  ]
  it('počíta najlepší výsledok v každej hre oblasti', () => {
    const s = suhrn(v)
    const mat = s.oblasti.find((o) => o.area === 'Matematika a práca s informáciami')!
    expect(mat.zahrane).toBe(2)
    expect(mat.priemer).toBe(3)
    expect(s.silne).toContain('Matematika a práca s informáciami')
    expect(s.podpora).toContain('Jazyk a komunikácia')
    expect(s.naposledy).toBe('2026-10-07')
  })
  it('text do hodnotenia je v správnom rode', () => {
    expect(textHodnotenia('Anka', suhrn(v), true)).toContain('odohrala 4 hry')
    expect(textHodnotenia('Tomáš', suhrn(v), false)).toContain('odohral 4 hry')
    expect(textHodnotenia('Ema', suhrn([]), true)).toContain('nehrala')
  })
})
