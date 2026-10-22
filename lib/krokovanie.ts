// Krokovanie: kam sa obrázok na konci cesty vtipne dostane (cieľové políčko je dovtedy biele).
// e = obrázok cieľa, t = čo povie sprievodca, napr. „Šarkan – hop, a uviazol na strome!“

type Ciel = { e: string; t: string }
const C = (e: string, t: string): Ciel => ({ e, t })

const PRESNE: Record<string, Ciel> = {
  ŠARKAN: C('🌳', 'hop, a visí na strome!'), BALÓN: C('☁️', 'letí až do oblakov!'), LIST: C('🍂', 'šuch, rovno na kôpku lístia!'),
  LIETADLO: C('☁️', 'vrrr, hore medzi oblaky!'), VRTUĽNÍK: C('☁️', 'vrrr, hore medzi oblaky!'), RAKETA: C('🌙', 'ššš, až na Mesiac!'),
  KOZMONAUT: C('🌙', 'skok, a je na Mesiaci!'), PLANÉTA: C('🧑‍🚀', 'kozmonaut ju má na dosah!'), KOMÉTA: C('🌙', 'letí okolo Mesiaca!'),
  MRKVA: C('🐰', 'chrum, zajko má obed!'), BANÁN: C('🐒', 'opička sa teší, mňam!'), MED: C('🍯', 'medveď už čaká s lyžicou!'),
  KOSŤ: C('🐕', 'psík vrtí chvostom, haf!'), SYR: C('🐈', 'mačka čuchá, mňau!'), KLBKO: C('🐈', 'mačka sa s ním hrá!'),
  ŽALUĎ: C('🐿️', 'veverička ho schová!'), GAŠTAN: C('🐿️', 'veverička ho schová!'), ŠIŠKA: C('🐿️', 'veverička ju schová!'), HRIB: C('🐿️', 'veverička ho suší!'),
  KĽÚČ: C('🚪', 'cvak, dvere sú otvorené!'), VLOČKA: C('👅', 'cap, rovno na jazyk!'), KVAPKA: C('☂️', 'ťap, na dáždnik!'), DAŽĎ: C('☂️', 'ťap-ťap, na dáždnik!'),
  MYDLO: C('🛁', 'šup do vane, bublinky!'), KEFKA: C('🦷', 'čistíme zúbky!'), PASTA: C('🦷', 'čistíme zúbky!'), UTERÁK: C('🛁', 'utrieme sa po kúpaní!'),
  HVIEZDA: C('🎄', 'hop, na vrch stromčeka!'), DARČEK: C('🎄', 'šup pod stromček!'), SVIEČKA: C('🎂', 'na tortu, sfúkni ju!'), KORUNA: C('👸', 'rovno na hlavu princeznej!'),
  PES: C('🦴', 'našiel kosť, haf!'), MAČKA: C('🐟', 'našla rybku, mňau!'), MEDVEĎ: C('🍯', 'našiel med, mňam!'), ZAJAC: C('🥕', 'našiel mrkvu, chrum!'), ZAJAČIK: C('🥕', 'našiel mrkvu, chrum!'),
  VEVERIČKA: C('🌰', 'našla oriešok!'), OPICA: C('🍌', 'našla banán!'), SLON: C('💦', 'špliech, sprcha z chobota!'), ŽIRAFA: C('🌳', 'mňam, lístky na vrchu stromu!'),
  LOPTA: C('🥅', 'gól!'), FUTBAL: C('🥅', 'gól!'), HOKEJ: C('🥅', 'gól!'), BASKETBAL: C('🗑️', 'kôš!'), BRÁNKA: C('⚽', 'gól!'),
  SNEHULIAK: C('🥕', 'dostal mrkvový nos!'), ČIAPKA: C('⛄', 'snehuliak má čiapku!'), ŠÁL: C('⛄', 'snehuliak má šál!'), RUKAVICE: C('⛄', 'snehuliakovi bude teplo!'),
  FĽAŠA: C('🗑️', 'do správneho koša!'), NOVINY: C('🗑️', 'do koša na papier!'), KONZERVA: C('🗑️', 'do koša na kovy!'), KRABICA: C('🗑️', 'do koša na papier!'), BATÉRIA: C('🗑️', 'do zberu batérií!'),
  KVET: C('💐', 'do kytice!'), TULIPÁN: C('💐', 'do kytice!'), SLNEČNICA: C('🐦', 'vtáčik zobká semienka!'), KLÍČOK: C('🌳', 'vyrástol z neho strom!'),
  NOS: C('🤧', 'hapčí!'), BACIL: C('🧼', 'mydlo ho zmylo!'), ZUBY: C('🪥', 'kefka ich vyčistí!'),
  BÁBÄTKO: C('🛏️', 'do postieľky, búvaj!'), LYŽIAR: C('🥇', 'do cieľa, má medailu!'), MEDAILA: C('🥇', 'víťaz!'),
}

const SKUP: [string, Ciel][] = [
  ['JABLKO HRUŠKA HROZNO SLIVKA KOLÁČ KOLÁČIK CHLIEB MLIEKO CITRÓN BROKOLICA CUKRÍK HRANOLKY HAMBURGER LÍZANKA RAJČINA PAPRIKA ČUČORIEDKA MANDARÍNKA ČOKOLÁDA JAHODA UHORKA BAKLAŽÁN TORTA ZMRZLINA MELÓN JOGURT RYŽA CESTOVINY POLIEVKA STEHIENKO POMARANČ KIWI ANANÁS BROSKYŇA MARHUĽA ČEREŠŇA MALINA ČERNICA KOKOS CVIKLA KARFIOL KAPUSTA ŠALÁT HRÁŠOK FAZUĽA CUKETA ZEMIAK KUKURICA TEKVICA ČAJ VAJÍČKO KAPOR RYBA', C('😋', 'rovno do pusy, mňam!')],
  ['KOHÚT SLIEPKA KURIATKO KAČKA LABUŤ HUS SÝKORKA SOVA LASTOVIČKA VTÁČIK VRABEC DROZD ČERVIENKA BOCIAN HOLUB STRAKA VRANA ĎATEĽ TUČNIAK', C('🌳', 'frr, hop na konár!')],
  ['RYBKA DELFÍN VEĽRYBA ŽRALOK CHOBOTNICA MEDÚZA HVIEZDICA KRAB TULEŇ ŽABA RAK KORYTNAČKA VYDRA BOBOR KROKODÍL HROCH LOĎ PLACHETNICA KAČIČKA PLÁVANIE PLAVKY MUŠĽA', C('🌊', 'žbluňk do vody!')],
  ['VČELA MOTÝĽ LIENKA ČMELIAK VÁŽKA', C('🌼', 'bzz, hop na kvietok!')],
  ['MRAVEC HÚSENICA KOBYLKA SLIMÁK PAVÚK DÁŽĎOVKA', C('🌱', 'šup pod lístok!')],
  ['KRČEK JEŽ JEŽKO LÍŠKA SRNKA JELEŇ DIVIAK JAZVEC VLK LEV ZEBRA KRAVA PRASA OVCA KOZA KÔŇ OSOL BARANČEK DINOSAURUS MAMUT DRAK JEDNOROŽEC', C('🛏️', 'rovno do postieľky, chrrr!')],
  ['AUTO AUTOBUS BICYKEL SANITKA VLAK BAGER KOLOBEŽKA AUTÍČKO VLÁČIK SÁNKY TAČKY KORČULE LYŽE', C('🥇', 'do cieľa, hurá!')],
  ['DIEŤA MACKO BÁBIKA ROBOT KLAUN TANEČNICA MIKULÁŠ ANJEL ČERT VÍLA PRINCEZNÁ ČARODEJNÍK BABKA DEDKO MAMA OTEC SESTRA BRAT POLICAJT HASIČ KUCHÁR FARMÁRKA UČITEĽKA STAVBÁR MALIAR KADERNÍČKA POŠTÁR ZÁHRADNÍK STOLÁR LEKÁRKA', C('🎂', 'rovno na oslavu, hurá!')],
  ['GITARA HUSLE KLAVÍR TRÚBKA SAXOFÓN MIKROFÓN NOTA TAMBURÍNA TRIANGEL XYLOFÓN FLAUTA AKORDEÓN ČINELY BUBON ZVONČEK', C('🐻', 'medveď zahrá, tralala!')],
]
const MAP: Record<string, Ciel> = { ...Object.fromEntries(SKUP.flatMap(([ws, c]) => ws.split(' ').map((w) => [w, c]))), ...PRESNE }

const INE = [C('🎩', 'čáry-máry, a je v klobúku kúzelníka!'), C('🎁', 'šup do darčeka!'), C('🧺', 'hop do košíka!')]

export function ciel(w: string): Ciel {
  return MAP[w] ?? INE[[...w].reduce((a, c) => a + c.charCodeAt(0), 0) % INE.length]
}
