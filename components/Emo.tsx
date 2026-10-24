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
  pomaranc: '\uE180', marhula: '\uE181', cernica: '\uE182', malina: '\uE183', cvikla: '\uE184', karfiol: '\uE185', kapusta: '\uE186', salat: '\uE187', por: '\uE188', fazula: '\uE189', cuketa: '\uE18A', 'slnko-vesmir': '\uE18B', 'mesiac-vesmir': '\uE18C', hviezda: '\uE18D', asteroid: '\uE18E', druzica: '\uE18F', dalekohlad: '\uE190',
  'velke-jablko': '\uE1A0', 'male-jablko': '\uE1A1', 'dlha-ceruzka': '\uE1A2', 'kratka-ceruzka': '\uE1A3', 'vysoka-veza': '\uE1A4', 'nizka-veza': '\uE1A5', 'siroka-stuha': '\uE1A6', 'uzka-stuha': '\uE1A7', 'plny-pohar': '\uE1A8', 'prazdny-pohar': '\uE1A9', 'otvorena-kniha': '\uE1AA', 'zatvorena-kniha': '\uE1AB', 'cista-cizma': '\uE1AC', 'spinava-cizma': '\uE1AD', 'mokry-uterak': '\uE1AE', 'suchy-uterak': '\uE1AF', 'tvrdy-kamen': '\uE1B0', 'makky-vankus': '\uE1B1', 'horuci-hrncek': '\uE1B2', 'studeny-hrncek': '\uE1B3', den: '\uE1B4', noc: '\uE1B5', vrabec: '\uE1B6', sykorka: '\uE1B7', kos: '\uE1B8', cervienka: '\uE1B9', lastovicka: '\uE1BA', bocian: '\uE1BB', holub: '\uE1BC', straka: '\uE1BD', vrana: '\uE1BE', datel: '\uE1BF', truhlica: '\uE1C0', kristal: '\uE1C1', lucerna: '\uE1C2',
  hlava: '\uE1E0', chodidlo: '\uE1E1', lakat: '\uE1E2',
  kruh: '\uE1E3', stvorec: '\uE1E4', trojuholnik: '\uE1E5', obdlznik: '\uE1E6', oval: '\uE1E7', kosostvorec: '\uE1E8',
  patuholnik: '\uE1E9', sestuholnik: '\uE1EA', gula: '\uE1EB', 'kocka-teleso': '\uE1EC', valec: '\uE1ED', 'kuzel-teleso': '\uE1EE',
  'poloha-nad': '\uE1F0', 'poloha-pod': '\uE1F1', 'poloha-v': '\uE1F2', 'poloha-pred': '\uE1F3', 'poloha-za': '\uE1F4',
  'poloha-vlavo': '\uE1F5', 'poloha-vpravo': '\uE1F6', 'poloha-medzi': '\uE1F7',
  's-pozdrav': '\uE200', 's-kniha': '\uE201', 's-pastelka': '\uE202', 's-delenie': '\uE203', 's-stavanie': '\uE204', 's-pomoc': '\uE205',
  's-utecha': '\uE206', 's-nesieme': '\uE207', 's-rozhovor': '\uE208', 's-lopta': '\uE209', 's-upratovanie': '\uE20A', 's-ucitelka': '\uE20B',
  'strom-jar': '\uE210', 'strom-leto': '\uE211', 'strom-jesen': '\uE212', 'strom-zima': '\uE213', 'velkonocny-kosik': '\uE214',
  'macko-balon': '\uE215', 'den-zeme': '\uE216',
  // dávka 2 z Higgsfieldu: triedenie odpadu, rozprávka O repe, cesta chleba
  'bananova-supka': '\uE240', ohryzok: '\uE241', 'zavarovaci-pohar': '\uE242', repa: '\uE243', vnucka: '\uE244', myska: '\uE245', klas: '\uE246', cesto: '\uE247',
  // téma Slovensko, cesta chleba a Hrnček, var!
  vlajka: '\uE248', znak: '\uE249', fujara: '\uE24A', halusky: '\uE24B', kamzik: '\uE24C', salas: '\uE24D', mlyn: '\uE24E', muka: '\uE24F', 'hrncek-trocha': '\uE250', 'hrncek-plny': '\uE251',
  'dieta-01': '\uE220', 'dieta-02': '\uE221', 'dieta-03': '\uE222', 'dieta-04': '\uE223', 'dieta-05': '\uE224', 'dieta-06': '\uE225', 'dieta-07': '\uE226', 'dieta-08': '\uE227', 'dieta-09': '\uE228', 'dieta-10': '\uE229', 'dieta-11': '\uE22A', 'dieta-12': '\uE22B', 'dieta-13': '\uE22C', 'dieta-14': '\uE22D', 'dieta-15': '\uE22E', 'dieta-16': '\uE22F', 'dieta-17': '\uE230', 'dieta-18': '\uE231', 'dieta-19': '\uE232', 'dieta-20': '\uE233',
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
  '🍍': 'ananas', '🍌': 'banan', '🥝': 'kiwi', '🍒': 'ceresna', '🍉': 'melon', '🍑': 'broskyna', '🍇': 'hrozno', '🥥': 'kokos',
  '🥔': 'zemiak', '🥦': 'brokolica', '🧄': 'cesnak', '🍆': 'baklazan', '🫛': 'hrach',
  '🌍': 'zem', '🚀': 'raketa-vesmir', '🪐': 'planeta', '🧑‍🚀': 'kozmonaut', '☄️': 'kometa',
  '🦢': 'labut',
  '👁️': 'oko', '👂': 'ucho', '👃': 'nos', '👄': 'usta', '👅': 'jazyk', '🦷': 'zuby', '✋': 'dlan', '🦵': 'noha', '🧍': 'skriatok-telo',
  '❓': 'otaznik', '🎂': 'torta', '🎭': 'maska', '🎄': 'stromcek', '👢': 'mikulasska-cizma', '👨‍👩‍👧': 'rodina', '👵': 'babka', '👴': 'dedko',
  '🦔': 'jez', '🐿️': 'vevericka', '🦊': 'liska', '🐇': 'zajac', '🦉': 'sova', '🐻': 'medved', '🦡': 'jazvec', '🐺': 'vlk', '🐗': 'diviak',
  // zjednotenie grafiky (Higgsfield, október 2026): predmety z tém namiesto emoji
  '🧒': 'dieta', '🚪': 'dvere', '🛋️': 'kreslo', '🐠': 'rybka', '⏰': 'budik', '🛁': 'vana', '🏘️': 'obec', '⛪': 'kostol',
  '🗿': 'socha', '📮': 'schranka', '🚏': 'zastavka', '🚦': 'semafor', '🦺': 'vesta', '🏡': 'chalupa', '🧶': 'klbko', '🥧': 'kolac',
  '🌽': 'kukurica', '🍾': 'flasa', '📰': 'noviny', '🥫': 'konzerva', '📦': 'krabica', '🔋': 'bateria', '🧠': 'mozog', '🦠': 'bacil',
  '💊': 'tabletka', '🍯': 'med', '🌸': 'kvet', '🍴': 'vidlicka', '🔪': 'noz', '🍬': 'cukrik', '🍟': 'hranolky', '🍔': 'hamburger',
  '🍭': 'lizanka', '🎅': 'mikulas', '😈': 'cert', '👼': 'anjel', '🎁': 'darcek', '🍊': 'mandarinka', '🍫': 'cokolada', '⛄': 'snehuliak',
  '❄️': 'vlocka', '🧊': 'lad', '🐧': 'tucniak', '🕯️': 'sviecka', '🍪': 'kolacik', '📅': 'kalendar', '⏱️': 'stopky', '⌚': 'hodinky',
  '⏳': 'presypacky', '⛷️': 'lyziar', '🏒': 'hokej', '🥅': 'branka', '🥇': 'medaila', '🔬': 'mikroskop', '🧲': 'magnet', '💡': 'ziarovka',
  '🔍': 'lupa', '📷': 'fotoaparat', '🤖': 'robot', '💻': 'pocitac', '⚖️': 'vaha', '❤️': 'srdce', '🤡': 'klaun', '🎈': 'balon',
  '👑': 'koruna', '💃': 'tanecnica', '🎉': 'konfety', '👩‍🏫': 'ucitelka', '🎷': 'saxofon', '🎤': 'mikrofon', '🎵': 'nota', '🐸': 'zaba',
  '🦫': 'bobor', '🦦': 'vydra', '🐉': 'drak', '🏰': 'hrad', '🧚': 'vila', '🧙': 'carodejnik', '👸': 'princezna', '🦄': 'jednorozec',
  '🌷': 'tulipan', '🌱': 'klicok', '🌼': 'kvet', '🐦': 'vtacik', '🐣': 'kuriatko', '🥚': 'vajicko', '🐰': 'zajacik', '🎀': 'stuzka',
  '🦌': 'jelen', '💧': 'kvapka', '🌊': 'more', '⛲': 'fontana', '🌻': 'slnecnica', '🍃': 'list', '🌵': 'kaktus', '🦕': 'dinosaurus',
  '🦣': 'mamut', '🦴': 'kost', '🛡️': 'stit', '🏛️': 'chram', '🌋': 'sopka', '🎨': 'paleta', '👩': 'mama', '👨': 'otec',
  '👶': 'babatko', '👧': 'sestra', '👦': 'brat', '💐': 'kytica', '🦁': 'lev', '🐘': 'slon', '🦒': 'zirafa', '🦓': 'zebra',
  '🐒': 'opica', '🐊': 'krokodil', '🦛': 'hroch', '🌿': 'bylinka', '🍵': 'caj', '🍀': 'datelina', '🧺': 'kosik', '🧳': 'kufor',
  '🏔️': 'tatry', '🏞️': 'rieka', '🏊': 'plavanie', '🛴': 'kolobezka', '🏐': 'volejbal', '🏖️': 'plaz', '🍦': 'zmrzlina', '🩱': 'plavky',
  '🐚': 'musla', '🕶️': 'okuliare', '⛺': 'stan', '🪙': 'minca', '💶': 'bankovka', '👛': 'penazenka', '🛒': 'vozik', '🐷': 'pokladnicka',
  '🏷️': 'cenovka', '📱': 'mobil', '🎧': 'sluchadla', '⌨️': 'klavesnica', '🖱️': 'mys', '📺': 'televizor', '💛': 'srdiecko', '🤗': 'objatie',
  '🐹': 'skrecok',
  ...Object.fromEntries(Object.entries(OWN_PIC).map(([n, c]) => [c, n])),
}
// Pocity ukazuje Jarkin škriatok (public/skriatok/e-*.webp), rovnaký v celej aplikácii
export const FEEL_PIC = {
  spokojnost: '\uE170', hrdost: '\uE171', nuda: '\uE172', hanblivost: '\uE173', rozpaky: '\uE174', pochybnost: '\uE175',
} as const
// Škriatok v bežnom dni a protiklady veselý/smutný (public/skriatok)
export const ELF_PIC = {
  'vesely-skriatok': '\uE1D0', 'smutny-skriatok': '\uE1D1', 'd-ranne-vstavanie': '\uE1D2', 'd-ranajky': '\uE1D3', 'd-cesta-do-skolky': '\uE1D4', 'd-obed': '\uE1D5', 'd-citanie': '\uE1D6', 'd-spanok': '\uE1D7', 'd-obliekanie': '\uE1D8', 'd-umyvanie-ruk': '\uE1D9', 'd-cistenie-zubov': '\uE1DA', 'd-upratovanie': '\uE1DB', 'd-hra-s-kockami': '\uE1DC', 'd-kreslenie': '\uE1DD',
} as const
const FEEL: Record<string, string> = {
  '😀': 'radost', '😢': 'smutok', '😠': 'hnev', '😨': 'strach', '😮': 'prekvapenie', '😴': 'unava',
  ...Object.fromEntries(Object.entries(FEEL_PIC).map(([n, c]) => [c, n])),
}
export const keyOf = (g: string) => [...g].map((c) => c.codePointAt(0)!.toString(16)).filter((h) => h !== 'fe0f').join('-')
const OWN_KEYS = {
  ...Object.fromEntries(Object.entries(OWN).map(([e, n]) => [keyOf(e), `/obrazky/${n}.webp`])),
  ...Object.fromEntries(Object.entries(FEEL).map(([e, n]) => [keyOf(e), `/skriatok/e-${n}.webp`])),
  ...Object.fromEntries(Object.entries(ELF_PIC).map(([n, c]) => [keyOf(c), `/skriatok/${n}.webp`])),
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
