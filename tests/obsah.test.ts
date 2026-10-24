import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { THEMES } from '@/lib/themes'
import { GAMES } from '@/lib/games'
import { METODIKA } from '@/lib/metodika'
import { ZAPIS } from '@/lib/zapisy'
import { NAMETY, CVIKY } from '@/lib/namety'
import { PIESNE } from '@/lib/piesne'
import { MALOVANE } from '@/lib/malovane'
import { rozpravky, CHYBAJUCE } from '@/lib/rozpravky'
import { HADANKY } from '@/lib/hadanky'
import { EXTRA_OMAL, OMALOVANKY } from '@/lib/omalovanky'
import { keyOf, picUrl } from '@/components/Emo'

// Kontrola obsahu: každá téma má všetko, čo aplikácia ukazuje, a všetky obrázky existujú
const PUBLIC = path.resolve(__dirname, '..', 'public')
const existuje = (url: string) => fs.existsSync(path.join(PUBLIC, url))

describe('témy týždňa', () => {
  for (const t of THEMES) {
    describe(t.name, () => {
      it('má námety, piesne a maľované čítanie', () => {
        expect(NAMETY[t.id], 'námety').toBeTruthy()
        expect(PIESNE[t.id], 'piesne').toBeTruthy()
        expect(MALOVANE[t.id], 'maľované čítanie').toBeTruthy()
      })
      it('má 5 rozprávok a aspoň 5 hádaniek', () => {
        expect(rozpravky(t.id).length).toBeGreaterThanOrEqual(5)
        const h = HADANKY.filter(([w]) => t.items.some((x) => x.w.toLowerCase() === w))
        expect(h.length).toBeGreaterThanOrEqual(5)
      })
      it('každý obrázok témy existuje', () => {
        for (const x of t.items) {
          const u = picUrl(x.e)
          expect(u, `obrázok pre ${x.w}`).toBeTruthy()
          expect(existuje(u!), `súbor ${u} pre ${x.w}`).toBe(true)
        }
      })
      it('zdravotné cviky odkazujú na existujúce cviky', () => {
        for (const [, c] of NAMETY[t.id].z) expect(CVIKY[c], `cvik ${c}`).toBeTruthy()
      })
      it('obrázky v maľovanom čítaní existujú', () => {
        for (const m of MALOVANE[t.id][1].matchAll(/\{([^|}]+)\|/g)) expect(picUrl(m[1]), `obrázok ${m[1]}`).toBeTruthy()
      })
    })
  }
})

describe('hry', () => {
  it('každá hra má metodiku a zápis do triednej knihy', () => {
    for (const g of GAMES) {
      expect(METODIKA[g.id], `metodika ${g.id}`).toBeTruthy()
      expect(ZAPIS[g.id], `zápis ${g.id}`).toBeTruthy()
    }
  })
  it('ikonky hier existujú', () => {
    for (const g of GAMES) if (g.img) expect(existuje(g.img), g.img).toBe(true)
  })
})

describe('rozprávky a omaľovánky', () => {
  it('všetky rozprávky v zozname existujú', () => expect(CHYBAJUCE).toEqual([]))
  it('každá omaľovánka k téme má súbor', () => {
    for (const k of OMALOVANKY) expect(existuje(`omalovanky/${k}.webp`), k).toBe(true)
  })
  it('omaľovánky s Čarozvedkom a ikonkami majú súbor', () => {
    for (const x of EXTRA_OMAL) expect(existuje(`omalovanky/extra/${x.meno}.webp`), x.meno).toBe(true)
  })
  it('kľúč obrázka sa počíta rovnako ako názov omaľovánky', () => {
    expect(keyOf('🍎')).toBe('1f34e')
  })
})
