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
  cmel: '\uE121', vazka: '\uE122', tamburina: '\uE123', triangel: '\uE124', xylofon: '\uE125', flauta: '\uE126', cinely: '\uE127', zahradnik: '\uE128', stolar: '\uE129', postar: '\uE12A', voda: '\uE12B', vajce: '\uE12C', jogurt: '\uE12D', ryza: '\uE12E', cestoviny: '\uE12F', ryba: '\uE130', stehno: '\uE131', stol: '\uE132', skrina: '\uE133', lampa: '\uE134', zrkadlo: '\uE135', hrncek: '\uE136', tanier: '\uE137', lepidlo: '\uE138', plastelina: '\uE139', 'papier-list': '\uE13A', pravitko: '\uE13B', guma: '\uE13C', struhadlo: '\uE13D', farmarka: '\uE13E', kuchar: '\uE13F', marakasy: '\uE140',
  delfin: '\uE141', velryba: '\uE142', zralok: '\uE143', chobotnica: '\uE144', meduza: '\uE145', 'morsky-konik': '\uE146', hviezdica: '\uE147', krab: '\uE148', tulen: '\uE149', kapor: '\uE14A', pilka: '\uE14B', skrutkovac: '\uE14C', klieste: '\uE14D', 'francuzsky-kluc': '\uE14E', valcek: '\uE14F', lopata: '\uE150', hrable: '\uE151', motyka: '\uE152', tacky: '\uE153', krhla: '\uE154', skolka: '\uE155', nemocnica: '\uE156', lekaren: '\uE157', 'hasicska-stanica': '\uE158', 'policia-budova': '\uE159', posta: '\uE15A', kniznica: '\uE15B', pekaren: '\uE15C', stanica: '\uE15D', futbal: '\uE15E', svihadlo: '\uE15F', kuzel: '\uE160', kolky: '\uE161', 'plavecke-okuliare': '\uE162', 'plavacia-doska': '\uE163',
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
  '🐝': 'vcela', '🐞': 'lienka', '🦋': 'motyl', '🐜': 'mravec', '🐛': 'husenica', '🦗': 'kobylka', '🐌': 'slimak',
  '🪰': 'mucha', '🪱': 'dazdovka', '🕷️': 'pavuk',
  '🥁': 'bubon', '🎸': 'gitara', '🎻': 'husle', '🎹': 'klavir', '🎺': 'trubka', '🪗': 'akordeon',
  '👩‍⚕️': 'lekarka', '👮': 'policajt', '🧑‍🎨': 'maliar', '💇': 'kadernicka', '👷': 'stavbar', '🧑‍🚒': 'hasic', '👨‍🚒': 'hasic',
  '🧑‍🍳': 'kuchar', '👩‍🌾': 'farmarka',
  '🍞': 'chlieb', '🥛': 'mlieko', '🧀': 'syr', '🍲': 'polievka', '🍚': 'ryza', '🍝': 'cestoviny', '🍗': 'stehno',
  '🪑': 'stolicka', '🛏️': 'postel', '🔑': 'kluc', '☂️': 'dazdnik', '🥄': 'lyzica', '🕰️': 'hodiny', '🪞': 'zrkadlo',
  '📚': 'kniha', '📖': 'kniha', '✏️': 'ceruzka', '🖍️': 'pastelky', '🖌️': 'stetec', '✂️': 'noznice', '🎒': 'ruksak',
  '🐢': 'korytnacka', '🦞': 'rak', '🔨': 'kladivo', '🪴': 'kvetinac', '🏠': 'dom', '🏫': 'skola', '🏪': 'potraviny',
  '🏀': 'basketbal', '🎾': 'raketa', '🎿': 'lyze', '⛸️': 'korcule', '🛷': 'sanky', '⛑️': 'prilba',
  '🦔': 'jez', '🐿️': 'vevericka', '🦊': 'liska', '🐇': 'zajac', '🦉': 'sova', '🐻': 'medved', '🦡': 'jazvec', '🐺': 'vlk', '🐗': 'diviak',
  ...Object.fromEntries(Object.entries(OWN_PIC).map(([n, c]) => [c, n])),
}
// Pocity ukazuje Jarkin škriatok (public/skriatok/e-*.webp), rovnaký v celej aplikácii
export const FEEL_PIC = {
  spokojnost: '\uE170', hrdost: '\uE171', nuda: '\uE172', hanblivost: '\uE173', rozpaky: '\uE174', pochybnost: '\uE175',
} as const
const FEEL: Record<string, string> = {
  '😀': 'radost', '😢': 'smutok', '😠': 'hnev', '😨': 'strach', '😮': 'prekvapenie', '😴': 'unava',
  ...Object.fromEntries(Object.entries(FEEL_PIC).map(([n, c]) => [c, n])),
}
const keyOf = (g: string) => [...g].map((c) => c.codePointAt(0)!.toString(16)).filter((h) => h !== 'fe0f').join('-')
const OWN_KEYS = {
  ...Object.fromEntries(Object.entries(OWN).map(([e, n]) => [keyOf(e), `/obrazky/${n}.webp`])),
  ...Object.fromEntries(Object.entries(FEEL).map(([e, n]) => [keyOf(e), `/skriatok/e-${n}.webp`])),
}
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
