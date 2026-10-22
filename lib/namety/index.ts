import { CELOROCNE } from './celorocne'
import { JESEN } from './jesen'
import { LETO } from './leto'
import { ZIMA } from './zima'
import type { Namet } from './cviky'

export { CVIKY, type CvikId, type Namet } from './cviky'

// Námety ku každej téme týždňa: zdravotné cvičenie s riekankou, pohybové hry, herné cvičenia a ranné aktivity
export const NAMETY: Record<string, Namet> = { ...JESEN, ...ZIMA, ...LETO, ...CELOROCNE }
