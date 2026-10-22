// Témy týždňov zo Školského vzdelávacieho programu MŠ a jeho triednej pracovnej verzie, po mesiacoch.
// Každá téma má 8 obrázkov so slovom, z ktorých sa skladajú hry vo všetkých vzdelávacích oblastiach.
// Slová sú veľkými písmenami v 1. páde. `s` je počet slabík tam, kde ho výpočet neurčí správne.

export type Item = { e: string; w: string; s?: number }
// week = poradie témy v mesiaci podľa triednej pracovnej verzie ŠkVP; témy bez week sú navyše z celého ŠkVP.
export type Theme = { id: string; name: string; pic: string; img?: string; month: number; week?: number; items: Item[] }
export type Month = { n: number; name: string; title: string }

// Znaky \uE101 až \uE120 sú Jarkine obrázky bez vlastného emoji (slivka, breza, srnka, sukňa, hrebeň...), pozri OWN_PIC v Emo.tsx
const i = (e: string, w: string, s?: number): Item => (s ? { e, w, s } : { e, w })

export const MONTHS: Month[] = [
  { n: 9, name: 'September', title: 'Vítame vás v MŠ' },
  { n: 10, name: 'Október', title: 'Farebná jeseň' },
  { n: 11, name: 'November', title: 'V zdravom tele zdravý duch' },
  { n: 12, name: 'December', title: 'Zima, zima tu je' },
  { n: 1, name: 'Január', title: 'Ľadové kráľovstvo' },
  { n: 2, name: 'Február', title: 'Svet okolo nás' },
  { n: 3, name: 'Marec', title: 'Slniečko sa zobudilo' },
  { n: 4, name: 'Apríl', title: 'Cesta za dobrodružstvom' },
  { n: 5, name: 'Máj', title: 'Farebný svet' },
  { n: 6, name: 'Jún', title: 'Leto volá' },
  { n: 0, name: 'Ďalšie témy', title: 'kedykoľvek počas roka' },
]

export const THEMES: Theme[] = [
  // September
  { id: 'kto-prisiel', name: 'Kto to prišiel do škôlky', pic: '🧒', month: 9, week: 1, items: [
    i('🧒', 'DIEŤA'), i('🧸', 'MACKO'), i('⚽', 'LOPTA'), i('🖍️', 'PASTELKA'), i('🧩', 'SKLADAČKA'), i('🎒', 'RUKSAK'), i('📚', 'KNIHA'), i('🥁', 'BUBON'),
  ] },
  { id: 'domcek', name: 'Domček, domček, kto v tebe býva', pic: '🏠', month: 9, week: 2, items: [
    i('🏠', 'DOM'), i('🚪', 'DVERE'), i('🛋️', 'KRESLO'), i('🛏️', 'POSTEĽ'), i('🐕', 'PES'), i('🐈', 'MAČKA'), i('🐹', 'KRČEK'), i('🐠', 'RYBKA'),
  ] },
  { id: 'moj-den', name: 'Môj deň', pic: '⏰', month: 9, week: 3, items: [
    i('⏰', 'BUDÍK'), i('🪥', 'KEFKA'), i('🍞', 'CHLIEB'), i('🥛', 'MLIEKO'), i('🛁', 'VAŇA'), i('🛏️', 'POSTEĽ'), i('🌙', 'MESIAC'), i('☀️', 'SLNKO'),
  ] },
  { id: 'obec', name: 'Hviezdičky spoznávajú svoju obec', pic: '🏘️', month: 9, week: 4, items: [
    i('🏘️', 'OBEC'), i('🏪', 'OBCHOD'), i('🏫', 'ŠKOLA'), i('⛪', 'KOSTOL'), i('🗿', 'SOCHA'), i('📮', 'SCHRÁNKA'), i('🚏', 'ZASTÁVKA'), i('🌳', 'PARK'),
  ] },
  { id: 'bezpecne', name: 'Bezpečne do MŠ', pic: '🚦', month: 9, items: [
    i('🚦', 'SEMAFOR'), i('🚗', 'AUTO', 2), i('🚌', 'AUTOBUS', 3), i('🚲', 'BICYKEL'), i('👮', 'POLICAJT'), i('🦺', 'VESTA'), i('🚑', 'SANITKA'), i('⛑️', 'PRILBA'),
  ] },
  // Október
  { id: 'vetricek', name: 'Fúkaj, fúkaj vetríčku', pic: '🍂', month: 10, week: 1, items: [
    i('🍂', 'LIST'), i('🪁', 'ŠARKAN'), i('💨', 'VIETOR'), i('☂️', 'DÁŽDNIK'), i('🌧️', 'DAŽĎ'), i('☁️', 'OBLAK'), i('🌈', 'DÚHA'), i('🧥', 'BUNDA'), i('🌫️', 'HMLA'), i('⛈️', 'BÚRKA'),
  ] },
  { id: 'starki', name: 'Na návšteve u starkých', pic: '👵', month: 10, week: 2, items: [
    i('👵', 'BABKA'), i('👴', 'DEDKO'), i('🏡', 'CHALUPA'), i('🐓', 'KOHÚT'), i('🐈', 'MAČKA'), i('🍎', 'JABLKO', 2), i('🧶', 'KLBKO'), i('🥧', 'KOLÁČ'),
  ] },
  { id: 'plody', name: 'Plody jesene', pic: '🎃', month: 10, week: 3, items: [
    i('🎃', 'TEKVICA'), i('🌰', 'GAŠTAN'), i('🍎', 'JABLKO', 2), i('🍐', 'HRUŠKA'), i('🍇', 'HROZNO'), i('\uE101', 'SLIVKA'), i('\uE104', 'ŽALUĎ'), i('🥕', 'MRKVA'), i('🥔', 'ZEMIAK'), i('🌽', 'KUKURICA'),
  ] },
  { id: 'jesen-zvierata', name: 'Zvieratká na jeseň', pic: '🦆', month: 10, week: 4, items: [
    i('🦔', 'JEŽ'), i('🐿️', 'VEVERIČKA'), i('🐻', 'MEDVEĎ'), i('🦊', 'LÍŠKA'), i('🦆', 'KAČKA'), i('🦢', 'LABUŤ'), i('🐦', 'LASTOVIČKA'), i('🍄', 'HRIB'),
  ] },
  { id: 'separko', name: 'Ježko Separko', pic: '🦔', month: 10, items: [
    i('🦔', 'JEŽKO'), i('🍾', 'FĽAŠA'), i('📰', 'NOVINY'), i('🥫', 'KONZERVA'), i('🗑️', 'KÔŠ'), i('\uE115', 'POHÁR'), i('📦', 'KRABICA'), i('🔋', 'BATÉRIA', 4),
  ] },
  // November
  { id: 'telo', name: 'Moje telo', pic: '🧍', month: 11, week: 1, items: [
    i('👁️', 'OKO'), i('👂', 'UCHO'), i('👃', 'NOS'), i('👄', 'ÚSTA'), i('✋', 'RUKA'), i('🦵', 'NOHA'), i('🦷', 'ZUB'), i('🧠', 'MOZOG'),
  ] },
  { id: 'bacil', name: 'Premôžem bacila', pic: '🦠', month: 11, week: 2, items: [
    i('🦠', 'BACIL'), i('🧼', 'MYDLO'), i('🌡️', 'TEPLOMER'), i('💊', 'TABLETKA'), i('👩‍⚕️', 'LEKÁRKA'), i('🍋', 'CITRÓN'), i('🍯', 'MED'), i('🧣', 'ŠÁL'),
  ] },
  { id: 'vnimam', name: 'Vnímame svet', pic: '👂', month: 11, week: 3, items: [
    i('👁️', 'OKO'), i('👂', 'UCHO'), i('👃', 'NOS'), i('👅', 'JAZYK'), i('✋', 'RUKA'), i('🔔', 'ZVONČEK'), i('🍋', 'CITRÓN'), i('🌸', 'KVET'),
  ] },
  { id: 'predmety', name: 'Predmety okolo nás', pic: '✂️', month: 11, week: 4, items: [
    i('🥄', 'LYŽICA'), i('🍴', 'VIDLIČKA'), i('🔪', 'NOŽ'), i('✂️', 'NOŽNICE'), i('📚', 'KNIHA'), i('🧼', 'MYDLO'), i('🪑', 'STOLIČKA'), i('🧸', 'MACKO'),
  ] },
  { id: 'zdravy', name: 'Zdravý a nezdravý životný štýl', pic: '🥦', month: 11, items: [
    i('🥦', 'BROKOLICA'), i('🍎', 'JABLKO', 2), i('🥕', 'MRKVA'), i('🥛', 'MLIEKO'), i('🍬', 'CUKRÍK'), i('🍟', 'HRANOLKY'), i('🍔', 'HAMBURGER'), i('🍭', 'LÍZANKA'), i('🍅', 'RAJČINA'), i('🫑', 'PAPRIKA'), i('🫐', 'ČUČORIEDKA'),
  ] },
  // December
  { id: 'mikulas', name: 'Vitaj, vitaj Mikuláš', pic: '🎅', month: 12, week: 1, items: [
    i('🎅', 'MIKULÁŠ'), i('😈', 'ČERT'), i('👼', 'ANJEL'), i('👢', 'ČIŽMA'), i('🎁', 'DARČEK'), i('🍬', 'CUKRÍK'), i('🍊', 'MANDARÍNKA'), i('🍫', 'ČOKOLÁDA'),
  ] },
  { id: 'sneh', name: 'V krajine snehu a ľadu', pic: '❄️', month: 12, week: 2, items: [
    i('⛄', 'SNEHULIAK'), i('❄️', 'VLOČKA'), i('🧊', 'ĽAD'), i('🛷', 'SÁNKY'), i('🧤', 'RUKAVICE'), i('🧣', 'ŠÁL'), i('🐧', 'TUČNIAK'), i('⛸️', 'KORČULE'),
  ] },
  { id: 'vianoce', name: 'Čas vianočný, od Lucie do Vianoc', pic: '🎄', month: 12, week: 3, items: [
    i('🎄', 'STROMČEK'), i('🎁', 'DARČEK'), i('🔔', 'ZVONČEK'), i('⭐', 'HVIEZDA'), i('🕯️', 'SVIEČKA'), i('🍪', 'KOLÁČIK'), i('👼', 'ANJEL'), i('🐟', 'KAPOR'),
  ] },
  // Január
  { id: 'cas', name: 'Kráľovstvo času', pic: '🕰️', month: 1, week: 1, items: [
    i('🕰️', 'HODINY'), i('⏰', 'BUDÍK'), i('📅', 'KALENDÁR'), i('⏱️', 'STOPKY'), i('⌚', 'HODINKY'), i('⏳', 'PRESÝPAČKY'), i('☀️', 'SLNKO'), i('🌙', 'MESIAC'),
  ] },
  { id: 'zvierata-zima', name: 'Zvieratká v zime', pic: '🦊', month: 1, week: 2, items: [
    i('🦊', 'LÍŠKA'), i('🐇', 'ZAJAC'), i('\uE108', 'SRNKA'), i('🐿️', 'VEVERIČKA'), i('🐻', 'MEDVEĎ'), i('🦔', 'JEŽ'), i('🐦', 'SÝKORKA'), i('🦉', 'SOVA'),
  ] },
  { id: 'zimne-sporty', name: 'Zimné športy', pic: '⛷️', month: 1, week: 3, items: [
    i('⛷️', 'LYŽIAR'), i('🏒', 'HOKEJ'), i('⛸️', 'KORČULE'), i('🛷', 'SÁNKY'), i('🎿', 'LYŽE'), i('🥅', 'BRÁNKA'), i('🥇', 'MEDAILA'), i('🧤', 'RUKAVICE'),
  ] },
  { id: 'badam', name: 'Tvorím, bádam, objavujem', pic: '🔬', month: 1, week: 4, items: [
    i('🔬', 'MIKROSKOP'), i('🧲', 'MAGNET'), i('💡', 'ŽIAROVKA'), i('🔍', 'LUPA'), i('📷', 'FOTOAPARÁT'), i('🤖', 'ROBOT'), i('💻', 'POČÍTAČ'), i('⚖️', 'VÁHA'),
  ] },
  { id: 'farby-tvary', name: 'Farby a tvary', pic: '🔷', month: 1, items: [
    i('🔴', 'KRUH'), i('🟥', 'ŠTVOREC'), i('🔺', 'TROJUHOLNÍK'), i('⭐', 'HVIEZDA'), i('❤️', 'SRDCE'), i('🔷', 'KOSOŠTVOREC'), i('🌈', 'DÚHA'), i('🖍️', 'PASTELKA'),
  ] },
  // Február
  { id: 'fasiangy', name: 'Fašiangy, Turíce', pic: '🎭', month: 2, week: 1, items: [
    i('🎭', 'MASKA'), i('🤡', 'KLAUN'), i('🍩', 'ŠIŠKA'), i('🎈', 'BALÓN'), i('👑', 'KORUNA'), i('💃', 'TANEČNICA'), i('🎉', 'KONFETY'), i('🥁', 'BUBON'),
  ] },
  { id: 'profesie', name: 'Pracovné profesie a remeslá', pic: '👷', month: 2, week: 2, items: [
    i('👩‍⚕️', 'LEKÁRKA'), i('👨‍🚒', 'HASIČ'), i('👮', 'POLICAJT'), i('🧑‍🍳', 'KUCHÁR'), i('👩‍🌾', 'FARMÁRKA'), i('👩‍🏫', 'UČITEĽKA'), i('👷', 'STAVBÁR'), i('🧑‍🚀', 'KOZMONAUT', 3),
    i('🧑‍🎨', 'MALIAR'), i('💇', 'KADERNÍČKA'), i('\uE12A', 'POŠTÁR'), i('\uE128', 'ZÁHRADNÍK'), i('\uE129', 'STOLÁR'),
  ] },
  { id: 'muzikanti', name: 'My sme malí muzikanti', pic: '🎵', month: 2, week: 3, items: [
    i('🥁', 'BUBON'), i('🎸', 'GITARA'), i('🎻', 'HUSLE'), i('🎹', 'KLAVÍR'), i('🎺', 'TRÚBKA'), i('🎷', 'SAXOFÓN'), i('🎤', 'MIKROFÓN'), i('🎵', 'NOTA'),
    i('\uE123', 'TAMBURÍNA'), i('\uE124', 'TRIANGEL'), i('\uE125', 'XYLOFÓN'), i('\uE126', 'FLAUTA'), i('🪗', 'AKORDEÓN'), i('\uE127', 'ČINELY'),
  ] },
  { id: 'pri-vode', name: 'Zvieratká pri vode', pic: '🐸', month: 2, week: 4, items: [
    i('🐸', 'ŽABA'), i('🦆', 'KAČKA'), i('🐟', 'RYBA'), i('🦢', 'LABUŤ'), i('🦫', 'BOBOR'), i('🦦', 'VYDRA'), i('🐢', 'KORYTNAČKA'), i('🦞', 'RAK'),
  ] },
  // Marec
  { id: 'rozpravky', name: 'Rozprávková krajina', pic: '📖', month: 3, week: 1, items: [
    i('📚', 'KNIHA'), i('👑', 'KORUNA'), i('🐉', 'DRAK'), i('🏰', 'HRAD'), i('🧚', 'VÍLA'), i('🧙', 'ČARODEJNÍK'), i('👸', 'PRINCEZNÁ'), i('🦄', 'JEDNOROŽEC'),
  ] },
  { id: 'domace', name: 'Domáce zvieratká', pic: '🐄', month: 3, week: 2, items: [
    i('🐄', 'KRAVA'), i('🐖', 'PRASA'), i('🐑', 'OVCA'), i('🐐', 'KOZA'), i('🐓', 'KOHÚT'), i('🐎', 'KÔŇ'), i('🐈', 'MAČKA'), i('🐕', 'PES'), i('🐔', 'SLIEPKA'), i('\uE109', 'OSOL'), i('\uE10A', 'HUS'),
  ] },
  { id: 'jar', name: 'Jarné prebúdzanie', pic: '🌷', month: 3, week: 3, items: [
    i('🌷', 'TULIPÁN'), i('🌱', 'KLÍČOK'), i('🐝', 'VČELA'), i('🦋', 'MOTÝĽ'), i('🐞', 'LIENKA'), i('🌼', 'KVET'), i('🐦', 'VTÁČIK'), i('🐣', 'KURIATKO'),
  ] },
  { id: 'velka-noc', name: 'Veľká noc', pic: '🥚', month: 3, week: 4, items: [
    i('🥚', 'VAJÍČKO'), i('🐰', 'ZAJAČIK'), i('🐣', 'KURIATKO'), i('🧺', 'KOŠÍK'), i('🌷', 'TULIPÁN'), i('🐑', 'BARANČEK'), i('💧', 'VODA'), i('🎀', 'STUŽKA'),
  ] },
  // Apríl
  { id: 'les', name: 'Tajomstvo lesa', pic: '🌳', month: 4, week: 1, items: [
    i('🌳', 'STROM'), i('🌲', 'SMREK'), i('🍄', 'HRIB'), i('🦊', 'LÍŠKA'), i('🦌', 'JELEŇ'), i('🦉', 'SOVA'), i('🐗', 'DIVIAK'), i('🐿️', 'VEVERIČKA'),
    i('\uE102', 'BREZA'), i('\uE103', 'ŠIŠKA'), i('\uE104', 'ŽALUĎ'), i('\uE105', 'PAPRAĎ'), i('\uE106', 'MUCHOTRÁVKA'), i('🦡', 'JAZVEC'), i('🐺', 'VLK'),
  ] },
  { id: 'kvapka', name: 'Kvapka vody', pic: '💧', month: 4, week: 2, items: [
    i('💧', 'KVAPKA'), i('🌧️', 'DAŽĎ'), i('☁️', 'OBLAK'), i('🌈', 'DÚHA'), i('🌊', 'MORE'), i('🧊', 'ĽAD'), i('☂️', 'DÁŽDNIK'), i('⛲', 'FONTÁNA'),
  ] },
  { id: 'vesmir', name: 'Naša Zem je guľatá, vesmír', pic: '🚀', month: 4, week: 3, items: [
    i('🌍', 'ZEM'), i('🌙', 'MESIAC'), i('☀️', 'SLNKO'), i('⭐', 'HVIEZDA'), i('🚀', 'RAKETA'), i('🪐', 'PLANÉTA'), i('🧑‍🚀', 'KOZMONAUT', 3), i('☄️', 'KOMÉTA'),
  ] },
  { id: 'semienko', name: 'Od semienka k rastlinke', pic: '🌱', month: 4, week: 4, items: [
    i('🌱', 'KLÍČOK'), i('🪴', 'KVETINÁČ'), i('🌻', 'SLNEČNICA'), i('🌳', 'STROM'), i('🌼', 'KVET'), i('🍃', 'LIST'), i('🌧️', 'DAŽĎ'), i('🌵', 'KAKTUS'),
  ] },
  { id: 'dejiny', name: 'Dejiny sveta', pic: '🦕', month: 4, items: [
    i('🦕', 'DINOSAURUS'), i('🦣', 'MAMUT'), i('🦴', 'KOSŤ'), i('🏰', 'HRAD'), i('🛡️', 'ŠTÍT'), i('👑', 'KORUNA'), i('🏛️', 'CHRÁM'), i('🌋', 'SOPKA'),
  ] },
  // Máj
  { id: 'farby-sveta', name: 'Všetky farby sveta', pic: '🎨', month: 5, week: 1, items: [
    i('🌈', 'DÚHA'), i('🎨', 'PALETA'), i('🖌️', 'ŠTETEC'), i('🖍️', 'PASTELKA'), i('🍓', 'JAHODA'), i('🍋', 'CITRÓN'), i('🥒', 'UHORKA'), i('🍆', 'BAKLAŽÁN'),
  ] },
  { id: 'rodina', name: 'Dnes má sviatok moja mama', pic: '👨‍👩‍👧', month: 5, week: 2, items: [
    i('👩', 'MAMA'), i('👨', 'OTEC'), i('👶', 'BÁBÄTKO'), i('👵', 'BABKA'), i('👴', 'DEDKO'), i('👧', 'SESTRA'), i('👦', 'BRAT'), i('💐', 'KYTICA'),
  ] },
  { id: 'luka', name: 'Tajomstvo rozkvitnutej lúky', pic: '🐞', month: 5, week: 3, items: [
    i('🐝', 'VČELA'), i('🐞', 'LIENKA'), i('🦋', 'MOTÝĽ'), i('🐜', 'MRAVEC'), i('🐛', 'HÚSENICA'), i('🦗', 'KOBYLKA'), i('🐌', 'SLIMÁK'), i('🌼', 'KVET'), i('\uE107', 'ZVONČEK'),
    i('\uE121', 'ČMELIAK'), i('\uE122', 'VÁŽKA'), i('🕷️', 'PAVÚK'), i('🪱', 'DÁŽĎOVKA'),
  ] },
  { id: 'exoticke', name: 'Zvieratká z ďaleka', pic: '🦁', month: 5, week: 4, items: [
    i('🦁', 'LEV'), i('🐘', 'SLON'), i('🦒', 'ŽIRAFA'), i('🦓', 'ZEBRA'), i('🐒', 'OPICA'), i('🐊', 'KROKODÍL'), i('🐧', 'TUČNIAK'), i('🦛', 'HROCH'),
  ] },
  { id: 'bylinky', name: 'Bylinky od babičky', pic: '🌿', month: 5, items: [
    i('🌿', 'BYLINKA'), i('🍵', 'ČAJ'), i('🍯', 'MED'), i('🍋', 'CITRÓN'), i('🍀', 'ĎATELINA'), i('👵', 'BABKA'), i('🧺', 'KOŠÍK'), i('🧄', 'CESNAK'),
  ] },
  // Jún
  { id: 'deti-sveta', name: 'MDD, všetky deti sveta', pic: '🌍', month: 6, week: 1, items: [
    i('🌍', 'ZEMEGUĽA'), i('🧒', 'DIEŤA'), i('✈️', 'LIETADLO'), i('⚽', 'LOPTA'), i('🎈', 'BALÓN'), i('❤️', 'SRDCE'), i('🎂', 'TORTA'), i('🧳', 'KUFOR'),
  ] },
  { id: 'vlast', name: 'Moja vlasť', pic: '🏔️', month: 6, week: 2, items: [
    i('🏔️', 'TATRY'), i('🏰', 'HRAD'), i('🏞️', 'RIEKA'), i('⛪', 'KOSTOL'), i('🎻', 'HUSLE'), i('💃', 'TANEČNICA'), i('🐻', 'MEDVEĎ'), i('🌲', 'SMREK'),
  ] },
  { id: 'letne-sporty', name: 'Letné športy', pic: '🏊', month: 6, week: 3, items: [
    i('⚽', 'LOPTA'), i('🚲', 'BICYKEL'), i('🏊', 'PLÁVANIE'), i('🎾', 'TENIS'), i('🏀', 'BASKETBAL'), i('🛴', 'KOLOBEŽKA'), i('🥇', 'MEDAILA'), i('🏐', 'VOLEJBAL'),
  ] },
  { id: 'lucime', name: 'Lúčime sa so škôlkou', pic: '🎒', month: 6, week: 4, items: [
    i('🎒', 'TAŠKA'), i('🏫', 'ŠKOLA'), i('📚', 'KNIHA'), i('✏️', 'CERUZKA'), i('🎈', 'BALÓN'), i('🎁', 'DARČEK'), i('🏖️', 'PLÁŽ'), i('🍦', 'ZMRZLINA'),
  ] },
  { id: 'leto', name: 'Hurá, leto volá', pic: '☀️', month: 6, items: [
    i('☀️', 'SLNKO'), i('🍉', 'MELÓN'), i('🍦', 'ZMRZLINA'), i('🩱', 'PLAVKY'), i('🐚', 'MUŠĽA'), i('🕶️', 'OKULIARE'), i('⛵', 'LOĎ'), i('⛺', 'STAN'),
  ] },
  // Ďalšie témy, kedykoľvek počas roka
  { id: 'obchod', img: '/ikony/tema-obchod.webp', name: 'Môj obchod (finančná gramotnosť)', pic: '🛒', month: 0, items: [
    i('🪙', 'MINCA'), i('💶', 'BANKOVKA'), i('👛', 'PEŇAŽENKA'), i('🛒', 'VOZÍK'), i('🏪', 'OBCHOD'), i('🐷', 'POKLADNIČKA'), i('🏷️', 'CENOVKA'), i('🧺', 'KOŠÍK'),
  ] },
  { id: 'ai', img: '/ikony/tema-ai.webp', name: 'Ja a umelá inteligencia', pic: '🤖', month: 0, items: [
    i('🤖', 'ROBOT'), i('💻', 'POČÍTAČ'), i('📱', 'MOBIL'), i('🎧', 'SLÚCHADLÁ'), i('⌨️', 'KLÁVESNICA'), i('🖱️', 'MYŠ'), i('📺', 'TELEVÍZOR'), i('🧠', 'MOZOG'),
  ] },
  { id: 'srdiecko', img: '/ikony/tema-srdiecko.webp', name: 'Čo cíti moje srdiečko a čo to tvoje?', pic: '💛', month: 0, items: [
    i('💛', 'SRDIEČKO'), i('😀', 'RADOSŤ'), i('😢', 'SMÚTOK'), i('😠', 'HNEV'), i('😨', 'STRACH'), i('😮', 'PREKVAPENIE'), i('🤗', 'OBJATIE'), i('😴', 'ÚNAVA'),
  ] },
  { id: 'doprava', img: '/obrazky/vlak.webp', name: 'Doprava okolo nás', pic: '🚆', month: 0, items: [
    i('🚗', 'AUTO', 2), i('🚌', 'AUTOBUS', 3), i('\uE11F', 'VLAK'), i('✈️', 'LIETADLO'), i('\uE11E', 'VRTUĽNÍK'), i('\uE120', 'LOĎ'),
    i('⛵', 'PLACHETNICA'), i('🚲', 'BICYKEL'), i('🚑', 'SANITKA'), i('\uE11D', 'BAGER'),
  ] },
  { id: 'oblecenie', img: '/obrazky/sveter.webp', name: 'Moje oblečenie', pic: '👕', month: 0, items: [
    i('👕', 'TRIČKO'), i('👖', 'NOHAVICE'), i('🩳', 'KRAŤASY'), i('\uE10B', 'SUKŇA'), i('👗', 'ŠATY'), i('\uE10C', 'SVETER'),
    i('🧥', 'BUNDA'), i('\uE10D', 'PLÁŠTENKA'), i('\uE10E', 'ČIAPKA'), i('🧣', 'ŠÁL'), i('🧤', 'RUKAVICE'), i('🥾', 'ČIŽMY'),
  ] },
  { id: 'cistotka', img: '/obrazky/kefka.webp', name: 'Čistotka: umývam sa sám', pic: '🧼', month: 0, items: [
    i('🪥', 'KEFKA'), i('\uE10F', 'PASTA'), i('🧼', 'MYDLO'), i('\uE110', 'UTERÁK'), i('\uE111', 'HREBEŇ'), i('\uE112', 'KEFA'),
    i('\uE113', 'VRECKOVKA'), i('🚿', 'SPRCHA'), i('\uE114', 'UMÝVADLO'), i('\uE115', 'POHÁR'),
  ] },
  { id: 'jedlo', img: '/obrazky/chlieb.webp', name: 'Čo jeme a pijeme', pic: '🍞', month: 0, items: [
    i('🍞', 'CHLIEB'), i('🥛', 'MLIEKO'), i('\uE12B', 'VODA'), i('🧀', 'SYR'), i('\uE12C', 'VAJÍČKO'), i('\uE12D', 'JOGURT'),
    i('🍚', 'RYŽA'), i('🍝', 'CESTOVINY'), i('🍲', 'POLIEVKA'), i('\uE130', 'RYBA'), i('🍗', 'STEHIENKO'),
  ] },
  { id: 'domov', img: '/obrazky/postel.webp', name: 'Môj domov', pic: '🛏️', month: 0, items: [
    i('🪑', 'STOLIČKA'), i('\uE132', 'STÔL'), i('🛏️', 'POSTEĽ'), i('\uE133', 'SKRIŇA'), i('\uE134', 'LAMPA'), i('🕰️', 'HODINY'),
    i('🪞', 'ZRKADLO'), i('🔑', 'KĽÚČ'), i('☂️', 'DÁŽDNIK'), i('\uE136', 'HRNČEK'), i('🥄', 'LYŽICA'), i('\uE137', 'TANIER'),
  ] },
  { id: 'potreby', img: '/obrazky/ruksak.webp', name: 'Kreslím, strihám, lepím', pic: '✂️', month: 0, items: [
    i('📖', 'KNIHA'), i('✏️', 'CERUZKA'), i('🖍️', 'PASTELKY'), i('🖌️', 'ŠTETEC'), i('✂️', 'NOŽNICE'), i('\uE138', 'LEPIDLO'),
    i('\uE139', 'PLASTELÍNA'), i('\uE13A', 'PAPIER'), i('\uE13B', 'PRAVÍTKO'), i('\uE13C', 'GUMA'), i('\uE13D', 'STRÚHADLO'), i('🎒', 'RUKSAK'),
  ] },
  { id: 'hracky', img: '/obrazky/macko.webp', name: 'Moje hračky', pic: '🧸', month: 0, items: [
    i('⚽', 'LOPTA'), i('🧸', 'MACKO'), i('\uE116', 'BÁBIKA'), i('\uE117', 'AUTÍČKO'), i('\uE118', 'VLÁČIK'), i('\uE119', 'KOCKY'),
    i('🧩', 'SKLADAČKA'), i('🪁', 'ŠARKAN'), i('\uE11A', 'OBRUČ'), i('\uE11B', 'ZVRK'), i('🪣', 'VEDIERKO'), i('\uE11C', 'LOPATKA'),
  ] },
]

export const themeOf = (id: string | undefined) => THEMES.find((t) => t.id === id)

// Téma, ktorá podľa plánu práve beží: týždeň v mesiaci podľa dňa, cez prázdniny posledná téma júna.
export function currentTheme(d = new Date()) {
  const m = d.getMonth() + 1
  const list = THEMES.filter((t) => t.month === (m === 7 || m === 8 ? 6 : m) && t.week)
  const week = m === 7 || m === 8 ? list.length - 1 : Math.floor((d.getDate() - 1) / 7)
  return list[Math.min(week, list.length - 1)]
}

// Prvá hláska slova; CH je v slovenčine samostatné písmeno.
export const firstLetter = (w: string) => (w.startsWith('CH') ? 'CH' : w[0])

// Počet slabík: samohlásky a slabikotvorné r, l; dvojhlásky ia, ie, iu sú jedna slabika.
export function syllables(item: Item) {
  if (item.s) return item.s
  const w = item.w.toLowerCase()
  const V = 'aáäeéiíoóôuúyý'
  let n = 0
  for (let k = 0; k < w.length; k++) {
    const c = w[k], p = w[k - 1] ?? '', nx = w[k + 1] ?? ''
    if (V.includes(c)) { if (p === 'i' && 'aeu'.includes(c)) continue; n++ }
    else if ('rlŕĺ'.includes(c) && k > 0 && !V.includes(p) && !V.includes(nx)) n++
  }
  return Math.max(1, n)
}

// Hlásky slova pre Eľkoninove okienka: CH, DZ, DŽ a dvojhlásky ia, ie, iu sú jedna hláska.
// Slová s cudzím ia (BATÉRIA) majú prepísaný počet slabík a do hláskových hier ich nedávame.
export function sounds(item: Item): string[] | null {
  if (item.s) return null
  const w = item.w
  const out: string[] = []
  for (let k = 0; k < w.length; k++) {
    const two = w.slice(k, k + 2)
    if (['CH', 'DZ', 'DŽ'].includes(two) || (w[k] === 'I' && 'AEU'.includes(w[k + 1] ?? '') && k > 0)) { out.push(two); k++ }
    else out.push(w[k])
  }
  return out
}

// Rýmová koncovka: od poslednej samohlásky, pri slove na samohlásku od predposlednej; dĺžne sa nerozlišujú.
// Slová na samohlásku s jedinou samohláskou (MRKVA, SLNKO) koncovku nemajú.
export function rhymeKey(item: Item) {
  const w = item.w.toLowerCase().normalize('NFD').replace(/[\u0301\u0302\u0308]/g, '').normalize('NFC').replace(/ia/g, 'a').replace(/ie/g, 'e').replace(/iu/g, 'u')
  const V = 'aeiouy'
  const idx = [...w].map((c, k) => (V.includes(c) ? k : -1)).filter((k) => k >= 0)
  const open = V.includes(w[w.length - 1])
  if (!idx.length || (open && idx.length < 2)) return ''
  const fromVowel = open ? idx[idx.length - 2] : idx[idx.length - 1]
  return w.slice(fromVowel)
}
