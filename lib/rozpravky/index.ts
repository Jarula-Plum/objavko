import { LUDOVE } from './ludove'
import { NOVE } from './nove'
import type { Rozpravka } from './types'

export type { Rozpravka } from './types'

const VSETKY: Record<string, Rozpravka> = { ...LUDOVE, ...NOVE }

// Päť rozprávok ku každej téme týždňa; ľudové a klasické rozprávky sa opakujú vo viacerých témach
const K_TEME: Record<string, string[]> = {
  'kto-prisiel': ['prvy-den', 'rukavicka', 'ceruzka', 'hracky-noc', 'mysky'],
  domcek: ['prasiatka', 'kozliatka', 'rukavicka', 'mysky', 'kozaodrata'],
  'moj-den': ['hodiny', 'zubky', 'prvy-den', 'hrncek', 'mesiacky'],
  obec: ['list', 'semafor', 'mysky', 'muzikanti', 'nakup'],
  bezpecne: ['semafor', 'ciapocka', 'kozliatka', 'pernik', 'pastier'],
  vetricek: ['vietor-slnko', 'vetricek-sarkan', 'dub-trstina', 'kvapka', 'mesiacky'],
  starki: ['repa', 'ciapocka', 'dielna', 'bylinky', 'hrncek'],
  plody: ['jablko', 'repa', 'mravec', 'mesiacky', 'pampusik'],
  'jesen-zvierata': ['mravec', 'kozaodrata', 'separko', 'lastovicka', 'rukavicka'],
  separko: ['separko', 'flasa', 'kvapka', 'mravec', 'semienko'],
  telo: ['zmysly', 'zubky', 'dlhy', 'bacil', 'kohutik'],
  bacil: ['bacil', 'bylinky', 'kohutik', 'zubky', 'obliekanie'],
  vnimam: ['zmysly', 'dlhy', 'hrasok', 'slavik', 'smadna-vrana'],
  predmety: ['hrncek', 'hracky-noc', 'ceruzka', 'popoluska', 'zlata-hus'],
  zdravy: ['zubky', 'kohutik', 'polievka', 'nakup', 'bacil'],
  mikulas: ['mikulas', 'mrazik', 'stedry', 'zvieratka-vianoce', 'mesiacky'],
  sneh: ['mrazik', 'rukavicka', 'mesiacky', 'obliekanie', 'snehuliak-korcule'],
  vianoce: ['stedry', 'zvieratka-vianoce', 'mikulas', 'mrazik', 'mesiacky'],
  cas: ['hodiny', 'mesiacky', 'zajac-kor', 'mravec', 'popoluska'],
  'zvierata-zima': ['rukavicka', 'kmidlo', 'lastovicka', 'mravec', 'kozaodrata'],
  'zimne-sporty': ['snehuliak-korcule', 'obliekanie', 'zajac-kor', 'mrazik', 'mesiacky'],
  badam: ['smadna-vrana', 'robotik', 'dino', 'kvapka', 'vesmir-mesiac'],
  'farby-tvary': ['farby', 'kruh', 'ceruzka', 'hracky-noc', 'kacatko'],
  slovensko: ['slovensko-putovanie', 'sol', 'mesiacky', 'hrasko', 'repa'],
  fasiangy: ['maska', 'popoluska', 'muzikanti', 'zlata-hus', 'pampusik'],
  profesie: ['kto-dolezity', 'prasiatka', 'dielna', 'tri-grose', 'list'],
  muzikanti: ['muzikanti', 'slavik', 'maska', 'zlata-hus', 'mravec'],
  'pri-vode': ['kacatko', 'zlata-rybka', 'kohutik', 'kvapka', 'zajac-kor'],
  rozpravky: ['pernik', 'ciapocka', 'popoluska', 'hrasok', 'dlhy'],
  domace: ['kozliatka', 'muzikanti', 'kohutik', 'zlata-hus', 'pastier'],
  jar: ['semienko', 'morena', 'kacatko', 'palculienka', 'mesiacky'],
  'velka-noc': ['kraslica', 'morena', 'semienko', 'palculienka', 'kacatko'],
  les: ['pernik', 'ciapocka', 'liska-vrana', 'separko', 'medved-kamarati'],
  kvapka: ['kvapka', 'smadna-vrana', 'kohutik', 'zlata-rybka', 'flasa'],
  vesmir: ['vesmir-mesiac', 'mesiacky', 'vietor-slnko', 'robotik', 'dino'],
  semienko: ['semienko', 'repa', 'palculienka', 'hrasko', 'mravec'],
  dejiny: ['dino', 'dlhy', 'sol', 'hrasok', 'tri-grose'],
  'farby-sveta': ['farby', 'kacatko', 'palculienka', 'maska', 'ceruzka'],
  rodina: ['mama', 'repa', 'tri-grose', 'kozliatka', 'hrasko'],
  luka: ['palculienka', 'mravec', 'semienko', 'lev-mys', 'zajac-kor'],
  exoticke: ['slon-chobot', 'lev-mys', 'zajac-kor', 'chobotnica', 'slavik'],
  bylinky: ['bylinky', 'bacil', 'kohutik', 'polievka', 'ciapocka'],
  'deti-sveta': ['lopta-svet', 'medved-kamarati', 'lev-mys', 'chobotnica', 'zlata-rybka'],
  vlast: ['slovensko-putovanie', 'sol', 'hrasko', 'mesiacky', 'repa'],
  'letne-sporty': ['zajac-kor', 'lopta-svet', 'mravec', 'leto-musla', 'kacatko'],
  lucime: ['skola', 'prvy-den', 'ceruzka', 'leto-musla', 'hodiny'],
  leto: ['leto-musla', 'vietor-slnko', 'mravec', 'zlata-rybka', 'flasa'],
  obchod: ['nakup', 'tri-grose', 'zlata-rybka', 'mysky', 'polievka'],
  ai: ['robotik', 'slavik', 'vesmir-mesiac', 'dino', 'hracky-noc'],
  srdiecko: ['kacatko', 'lev-mys', 'mama', 'prvy-den', 'medved-kamarati'],
  doprava: ['semafor', 'vesmir-mesiac', 'lopta-svet', 'list', 'muzikanti'],
  oblecenie: ['obliekanie', 'vietor-slnko', 'popoluska', 'rukavicka', 'ciapocka'],
  cistotka: ['bacil', 'zubky', 'prasiatko-ciste', 'popoluska', 'kohutik'],
  jedlo: ['hrncek', 'polievka', 'pampusik', 'sol', 'pernik'],
  domov: ['prasiatka', 'mysky', 'hracky-noc', 'hrasok', 'kozliatka'],
  potreby: ['ceruzka', 'farby', 'kruh', 'prvy-den', 'skola'],
  more: ['chobotnica', 'zlata-rybka', 'leto-musla', 'flasa', 'kvapka'],
  dielna: ['dielna', 'prasiatka', 'kto-dolezity', 'hrasko', 'semienko'],
  ovocie: ['jablko', 'mesiacky', 'nakup', 'zubky', 'mravec'],
  zelenina: ['repa', 'polievka', 'hrasok', 'hrasko', 'semienko'],
  vtaky: ['lastovicka', 'kmidlo', 'slavik', 'liska-vrana', 'smadna-vrana'],
  hracky: ['hracky-noc', 'robotik', 'ceruzka', 'lopta-svet', 'prvy-den'],
}

export const rozpravky = (temaId: string): Rozpravka[] =>
  (K_TEME[temaId] ?? ['repa', 'ciapocka', 'prasiatka', 'mesiacky', 'kacatko']).map((id) => VSETKY[id]).filter(Boolean)

// Kontrola pre vývoj: id, ktoré v zozname rozprávok chýba
export const CHYBAJUCE = Object.values(K_TEME).flat().filter((id) => !VSETKY[id])
