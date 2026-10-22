import { CELOROCNE } from './celorocne'
import { JESEN } from './jesen'
import { LETO } from './leto'
import type { Piesne } from './types'
import { ZIMA } from './zima'

export type { Piesne } from './types'

// Piesne a riekanky ku každej téme týždňa
export const PIESNE: Record<string, Piesne> = { ...JESEN, ...ZIMA, ...LETO, ...CELOROCNE }
