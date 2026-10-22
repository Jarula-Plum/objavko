// Hudobno-pohybové hry k téme: ľudové hry so spevom z piesní témy a hry s hudbou a rytmom,
// ktoré používajú slová a pesničky danej témy.
import { PIESNE } from './piesne'
import { K } from './piesne/types'
import { slabiky } from './melodia'
import type { Theme } from './themes'

const LUDOVE: Record<string, string> = {
  'Kolo, kolo mlynské': 'Deti sa chytia za ruky do kruhu a za spevu chodia dookola. Na posledné slovo (bác!) všetky spolu drepnú. Kto je posledný, môže pri ďalšom kole začať pieseň alebo vymyslieť, ako sa bude drepovať (ako zajko, ako žabka).',
  'Zlatá brána': 'Dve deti si zvolia tajné mená (napr. slniečko a mesiačik), chytia sa za ruky a zdvihnú ich ako bránu. Ostatné deti chodia za sebou v hadíku popod bránu a spievajú. Na koniec piesne brána spadne a chytí dieťa, ktoré si potichu vyberie stranu a postaví sa za ňu. Keď sú všetci rozdelení, obe skupiny sa šetrne preťahujú.',
  'Tancuj, tancuj, vykrúcaj': 'Deti sa rozdelia do dvojíc, chytia sa za ruky a za spevu sa krútia jedným smerom. Pri opakovaní sa otočia na druhú stranu. Staršie deti skúsia tlieskať do rytmu a meniť partnera na konci slohy.',
  'Pec nám spadla': 'Deti stoja v kruhu, chytia sa za ruky a pomaly chodia dookola. Na koniec piesne sa všetky zosunú do drepu ako spadnutá pec. Potom ju spolu „postavia“: pomaly sa dvíhajú až na špičky s rukami hore.',
  'Kujem, kujem podkovičku': 'Deti sedia vo dvojiciach alebo dieťa a pani učiteľka. Za riekania jedno dieťa jemne ťuká päsťou do chodidla druhého ako kováč. Potom sa vymenia. Staršie deti ťukajú presne do rytmu a na konci zrýchlia.',
}

const low = (w: string) => w.toLowerCase()

export function hudobneHry(theme: Theme): [string, string][] {
  const p = PIESNE[theme.id]
  const out: [string, string][] = []
  for (const [n] of p?.s ?? []) if (LUDOVE[n]) out.push([n, LUDOVE[n]])

  const w = theme.items.map((x) => low(x.w))
  const [a, b, c] = w
  const sl = (k: number) => theme.items[k].s ?? slabiky(w[k])
  const nova = p?.s.find(([, o, t]) => o === K && t)

  out.push(['Hudobné sochy', `Pustite veselú hudbu alebo zahrajte na bubienok. Deti voľne tancujú po triede. Keď hudba stíchne, pani učiteľka povie slovo z témy (${a}, ${b}, ${c}…) a deti zamrznú v soche, ktorá to slovo zobrazuje. Kto sa pohne, ukáže svoju sochu ostatným.`])
  out.push(['Vytlieskaj slovo', `Pani učiteľka povie slovo a deti ho spolu vytlieskajú po slabikách: ${[0, 1, 3].map((k) => `${w[k]} (${sl(k)}×)`).join(', ')}. Potom ho prejdú krokmi po triede a nakoniec vydupú. Staršie deti hádajú slovo len podľa tlieskania.`])
  if (nova) out.push([`Pesnička s pohybom: ${nova[0]}`, `Naučte deti pesničku ${nova[0]} (text a melódia sú v časti Piesne a riekanky, melódia sa dá prehrať). Ku každému veršu spolu vymyslite jeden pohyb, napríklad tlesknutie, otočku či drep, a spievajte s pohybmi. Pri opakovaní spievajte raz pomaly a potichu, raz rýchlo a nahlas.`])
  out.push(['Rýchlo – pomaly', `Pani učiteľka hrá na bubienok alebo tamburínu. Pri rýchlom rytme deti bežkajú po špičkách, pri pomalom idú ťažkými krokmi, pri tichom sa zakrádajú a pri údere „bum“ si sadnú. Staršie deti striedajú pohyb aj podľa výšky tónu (vysoko = na špičkách, nízko = v podrepe).`])
  out.push(['Ozvena', `Pani učiteľka zaspieva alebo zatlieska krátky motív so slovom z témy, napríklad „${a}, ${a}, kde si?“, a deti ho ako ozvena zopakujú rovnako hlasno, potom potichu. Dieťa, ktoré je na rade, vymyslí vlastný motív pre ostatných.`])
  out.push(['Hudobný vláčik', 'Deti sa postavia za sebou do vláčika, ruky na pleciach kamaráta. Kým znie hudba alebo pesnička, vláčik ide po triede a mení smer podľa rušňa vpredu. Keď hudba stíchne, vláčik zastaví na stanici, rušeň povie slovo z témy alebo zaspieva jeho slabiky a prejde na koniec vláčika.'])
  return out
}
