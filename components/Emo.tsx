import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import KEYS from '@/lib/emoji-keys.json'

// Emoji v textoch nahrádzame jednotnými obrázkami Fluent Emoji 3D (public/emoji, licencia MIT),
// aby vyzerali rovnako profesionálne na každom tablete a počítači.
// Jarkine obrázky (Higgsfield) majú prednosť pred emoji. Kľúč je emoji, alebo súkromný znak
// pre veci, ktoré nemajú vlastné emoji (slivka, breza, šiška...). Pozor na význam: 🦌 ostáva
// jeleň s parohami, srnka má vlastný znak; ❄️ ostáva vločka, sneženie je 🌨️.
export const OWN_PIC = {
  slivka: '\uE101', breza: '\uE102', siska: '\uE103', zalud: '\uE104', paprad: '\uE105',
  muchotravka: '\uE106', zvoncek: '\uE107', srnka: '\uE108',
  osol: '\uE109', hus: '\uE10A', sukna: '\uE10B', sveter: '\uE10C', plastenka: '\uE10D', ciapka: '\uE10E',
  pasta: '\uE10F', uterak: '\uE110', hreben: '\uE111', kefa: '\uE112', vreckovka: '\uE113', umyvadlo: '\uE114',
  pohar: '\uE115', babika: '\uE116', 'drevene-auto': '\uE117', vlacik: '\uE118', kocky: '\uE119', obruc: '\uE11A',
  zvrk: '\uE11B', lopatka: '\uE11C', bager: '\uE11D', vrtulnik: '\uE11E', vlak: '\uE11F', lod: '\uE120',
} as const
const OWN: Record<string, string> = {
  '🍎': 'jablko', '🍐': 'hruska', '🍓': 'jahoda', '🫐': 'cucoriedka', '🍋': 'citron', '🥕': 'mrkva', '🫑': 'paprika',
  '🍅': 'rajcina', '🥒': 'uhorka', '🎃': 'tekvica', '🧅': 'cibula',
  '🌳': 'dub', '🌲': 'smrek', '🍂': 'javor', '🌰': 'gastan', '🍄': 'hrib',
  '☀️': 'slnko', '⛅': 'polojasno', '🌤️': 'polojasno', '☁️': 'oblaky', '🌧️': 'dazd', '🌦️': 'prehanka', '⛈️': 'burka',
  '🌨️': 'snezenie', '💨': 'vietor', '🌫️': 'hmla', '🌈': 'duha', '🌙': 'mesiac', '🌡️': 'teplomer',
  '🐄': 'krava', '🐎': 'kon', '🐑': 'ovca', '🐐': 'koza', '🐖': 'prasa', '🐔': 'sliepka', '🐓': 'kohut', '🦆': 'kacica',
  '🐕': 'pes', '🐈': 'macka', '🚗': 'auto', '🚌': 'autobus', '🚑': 'sanitka', '✈️': 'lietadlo', '⛵': 'plachetnica', '🚲': 'bicykel',
  '🚒': 'hasici', '🚓': 'policia',
  '👕': 'tricko', '👖': 'nohavice', '🩳': 'kratasy', '👗': 'saty', '🧥': 'bunda', '🧣': 'sal', '🧤': 'rukavice', '🥾': 'cizmy',
  '🪥': 'kefka', '🧼': 'mydlo', '🧻': 'papier', '🚿': 'sprcha',
  '⚽': 'lopta', '🧸': 'macko', '🧩': 'puzzle', '🪁': 'sarkan', '🪣': 'vedierko',
  '🦔': 'jez', '🐿️': 'vevericka', '🦊': 'liska', '🐇': 'zajac', '🦉': 'sova', '🐻': 'medved', '🦡': 'jazvec', '🐺': 'vlk', '🐗': 'diviak',
  ...Object.fromEntries(Object.entries(OWN_PIC).map(([n, c]) => [c, n])),
}
const keyOf = (g: string) => [...g].map((c) => c.codePointAt(0)!.toString(16)).filter((h) => h !== 'fe0f').join('-')
const OWN_KEYS = Object.fromEntries(Object.entries(OWN).map(([e, n]) => [keyOf(e), `/obrazky/${n}.webp`]))
const AVAILABLE = new Set<string>([...KEYS, ...Object.keys(OWN_KEYS)])
const src = (k: string) => OWN_KEYS[k] ?? `/emoji/${k}.webp`
const seg = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('sk', { granularity: 'grapheme' }) : null

// Adresa obrázka pre jeden emoji, ak ho máme
export const picUrl = (e: string) => (AVAILABLE.has(keyOf(e)) ? src(keyOf(e)) : null)

function splitText(text: string): ReactNode {
  if (!seg) return text
  const out: ReactNode[] = []
  let buf = ''
  for (const { segment } of seg.segment(text)) {
    const k = keyOf(segment)
    if (AVAILABLE.has(k)) {
      if (buf) { out.push(buf); buf = '' }
      out.push(<img key={out.length} className="emo" src={src(k)} alt={segment} draggable={false} />)
    } else buf += segment
  }
  if (!out.length) return text
  if (buf) out.push(buf)
  return out
}

export function emo(node: ReactNode): ReactNode {
  if (typeof node === 'string') return splitText(node)
  if (Array.isArray(node)) return node.map((c, k) => <Fragment key={k}>{emo(c)}</Fragment>)
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>
    if (el.props.children === undefined || typeof el.type !== 'string' && el.type !== Fragment) return el
    return cloneElement(el, undefined, emo(el.props.children))
  }
  return node
}

export const Emo = ({ children }: { children: ReactNode }) => <>{emo(children)}</>

// Hviezdičky ako obrázky: získané plné, chýbajúce priesvitné
export const Stars = ({ n }: { n: number }) => (
  <span className="stars-img" role="img" aria-label={`${n} z 3 hviezdičiek`}>
    {[0, 1, 2].map((k) => <img key={k} className={`emo ${k < n ? '' : 'off'}`} src={picUrl('⭐') ?? ''} alt="" draggable={false} />)}
  </span>
)

// Ikonka na tlačidle (Jarkine drevené ikonky v public/ui)
export const Ui = ({ n }: { n: 'spat' | 'dalej' | 'zvuk' | 'znova' | 'mapa' | 'hraj' | 'domov' | 'zosit' | 'profil' | 'pomoc' | 'medaila' | 'nastavenia' }) =>
  <img className="ui" src={`/ui/${n}.webp`} alt="" draggable={false} />

// Ikonka hry alebo témy: vlastný obrázok, ak ho máme, inak 3D emoji
export const Icon = ({ pic, img }: { pic: string; img?: string }) =>
  img ? <img className="ico" src={img} alt="" draggable={false} /> : <>{emo(pic)}</>
