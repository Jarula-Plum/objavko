// Zdravotné cviky v troch úrovniach (3–4, 4–5, 5–6 rokov) a póza škriatka, ktorý cvik predvádza
export type CvikId = 'drep' | 'skok' | 'natiahni' | 'predklon' | 'klak' | 'sed' | 'lietadlo' | 'strom' | 'stvornozky' | 'beh' | 'chodza' | 'tlieskaj' | 'dych' | 'ramena'

export const CVIKY: Record<CvikId, { p?: string; t: [string, string, string] }> = {
  drep: { p: 'drep', t: ['Urob 3 drepy.', 'Urob 5 drepov, ruky vystri dopredu.', 'Urob 8 drepov a v poslednom vydrž, kým napočítaš do 3.'] },
  skok: { p: 'skok', t: ['Poskoč 3-krát snožmo.', 'Poskoč 5-krát snožmo dopredu a dozadu.', 'Poskoč 5-krát na jednej nohe, potom 5-krát na druhej.'] },
  natiahni: { p: 'natiahni', t: ['Natiahni sa vysoko na špičky.', 'Natiahni sa na špičky a vydrž, kým napočítaš do 5.', 'Na špičkách prejdi 6 krokov s rukami vysoko nad hlavou.'] },
  predklon: { p: 'predklon', t: ['Predkloň sa a dotkni sa kolien.', 'Predkloň sa a dotkni sa prstov na nohách.', 'V stoji rozkročnom sa predkloň, dlane polož na zem a vydrž do 5.'] },
  klak: { p: 'klak', t: ['Kľakni si a zasa sa postav.', 'Kľakni si, sadni si na päty a postav sa bez pomoci rúk.', 'Z kľaku sa postav bez pomoci rúk, 3-krát po sebe.'] },
  sed: { p: 'sed', t: ['Sadni si do tureckého sedu a pohojdaj sa.', 'V tureckom sede vystri chrbát a pomaly otáčaj hlavou vľavo a vpravo.', 'Zo sedu sa postav bez pomoci rúk, 3-krát po sebe.'] },
  lietadlo: { p: 'lietadlo', t: ['Rozpaž ruky ako krídla a mávaj nimi.', 'Rozpaž ruky a postav sa na jednu nohu, vydrž do 3.', 'Urob lietadlo: predkloň sa, jednu nohu vystri dozadu a vydrž do 5. Potom druhú.'] },
  strom: { p: 'strom', t: ['Postav sa rovno ako strom a ruky daj hore.', 'Postav sa na jednu nohu, druhú opri o koleno a vydrž do 3.', 'Stoj na jednej nohe so zavretými očami a vydrž do 5. Potom na druhej.'] },
  stvornozky: { p: 'stvornozky', t: ['Lez po štyroch ako zvieratko.', 'Choď po štyroch dopredu aj dozadu.', 'Choď ako medveď po rukách a nohách s vystretými kolenami, 8 krokov.'] },
  beh: { p: 'beh', t: ['Bež na mieste.', 'Bež na mieste a dvíhaj kolená vysoko.', 'Bež na mieste čo najrýchlejšie, kolená vysoko, kým napočítame do 10.'] },
  chodza: { p: 'chodza', t: ['Kráčaj po kruhu.', 'Kráčaj chvíľu po špičkách a chvíľu po pätách.', 'Kráčaj po čiare, päta pri špičke, ako po lane.'] },
  tlieskaj: { p: 'tlieskaj', t: ['Zatlieskaj 3-krát.', 'Zatlieskaj nad hlavou a potom za chrbtom.', 'Zdvihni koleno a zatlieskaj pod ním. Striedaj nohy, 6-krát.'] },
  dych: { t: ['Nadýchni sa nosom a pomaly vydýchni ústami.', 'Nadýchni sa a fúkaj dlho, ako keď sfukuješ púpavu.', 'Nadýchni sa, kým napočítam do 3, a vydychuj, kým napočítam do 5. Trikrát.'] },
  ramena: { t: ['Krúž ramenami dopredu.', 'Krúž ramenami dopredu aj dozadu.', 'Rozpaž a krúž rukami malé kruhy dopredu, potom veľké kruhy dozadu.'] },
}

export type Namet = {
  // Zdravotné cvičenie: riekanka po dvojveršiach, ku každému cvik
  z: [string, CvikId][]
  // Pohybové hry: názov a pravidlá
  p: [string, string][]
  // Herné cvičenia a didaktické hry
  h: [string, string][]
  // Námety na ranné aktivity
  r: string[]
}
