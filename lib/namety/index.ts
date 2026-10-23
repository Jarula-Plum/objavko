import { CELOROCNE } from './celorocne'
import { DOPLNKY } from './doplnky'
import { DOPLNKY_2 } from './doplnky-2'
import { DOPLNKY_3 } from './doplnky-3'
import { JESEN } from './jesen'
import { LETO } from './leto'
import { SLOVENSKO } from './slovensko'
import { ZIMA } from './zima'
import type { Namet } from './cviky'

export { CVIKY, type CvikId, type Namet } from './cviky'

const ZAKLAD: Record<string, Namet> = { ...JESEN, ...ZIMA, ...LETO, ...CELOROCNE, ...SLOVENSKO }

// Pridá doplnky na koniec každého zoznamu; hry s rovnakým názvom sa neopakujú
function pridaj(n: Namet, d?: Partial<Namet>): Namet {
  if (!d) return n
  const p = [...n.p, ...(d.p ?? []).filter(([a]) => !n.p.some(([b]) => b === a))]
  const h = [...n.h, ...(d.h ?? []).filter(([a]) => !n.h.some(([b]) => b === a))]
  return { z: [...n.z, ...(d.z ?? [])], p, h, r: [...n.r, ...(d.r ?? [])] }
}

// Námety ku každej téme týždňa: zdravotné cvičenie s riekankou, pohybové hry, herné cvičenia a ranné aktivity
export const NAMETY: Record<string, Namet> = Object.fromEntries(Object.entries(ZAKLAD)
  .map(([id, n]) => [id, pridaj(pridaj(pridaj(n, DOPLNKY[id]), DOPLNKY_2[id]), DOPLNKY_3[id])]))
