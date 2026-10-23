import { CELOROCNE } from './celorocne'
import { DOPLNKY } from './doplnky'
import { JESEN } from './jesen'
import { LETO } from './leto'
import { SLOVENSKO } from './slovensko'
import type { Piesne } from './types'
import { ZIMA } from './zima'

export type { Piesne } from './types'

const ZAKLAD: Record<string, Piesne> = { ...JESEN, ...ZIMA, ...LETO, ...CELOROCNE, ...SLOVENSKO }

// Piesne a riekanky ku každej téme týždňa; doplnky sa pridajú na koniec a rovnaký názov sa neopakuje
export const PIESNE: Record<string, Piesne> = Object.fromEntries(Object.entries(ZAKLAD).map(([id, p]) => {
  const d = DOPLNKY[id]
  if (!d) return [id, p]
  const s = [...p.s, ...(d.s ?? []).filter(([n]) => !p.s.some(([m]) => m === n))]
  const r = [...p.r, ...(d.r ?? []).filter(([n]) => !p.r.some(([m]) => m === n))]
  return [id, { s, r }]
}))
