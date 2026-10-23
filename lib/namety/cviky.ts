// Zdravotné cviky v troch úrovniach (3–4, 4–5, 5–6 rokov) a póza škriatka, ktorý cvik predvádza
export type CvikId = 'drep' | 'skok' | 'natiahni' | 'predklon' | 'klak' | 'sed' | 'lietadlo' | 'strom' | 'stvornozky' | 'beh' | 'chodza' | 'tlieskaj' | 'dych' | 'ramena'
  | 'macka' | 'klbko' | 'uklon' | 'hlava' | 'lopatky' | 'chodidla' | 'bicykel' | 'bocian' | 'otocka' | 'relax'
  | 'zabka' | 'motyl' | 'veslar' | 'snehuliak' | 'prsty' | 'vrchnak'

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
  // Doplnené podľa metodiky zdravotných cvikov pre MŠ (chrbtica, brucho, krk, lopatky, chodidlá); bez mostov, visov a hlbokých záklonov
  macka: { p: 'stvornozky', t: ['Na štyroch urob mačací chrbát: vyhrb sa a potom sa prehni.', 'Na štyroch sa pomaly vyhrb s výdychom a prehni s nádychom, 4-krát.', 'Na štyroch vystri jednu ruku dopredu a opačnú nohu dozadu, vydrž do 3. Potom vymeň strany.'] },
  klbko: { t: ['Ľahni si na chrbát a objím si kolená ako klbko.', 'Na chrbte si pritiahni kolená k brušku a pohojdaj sa zo strany na stranu.', 'Na chrbte si pritiahni kolená a hojdaj sa dopredu a dozadu ako kolíska, 5-krát.'] },
  uklon: { p: 'natiahni', t: ['Daj ruky hore a ukloň sa ako strom vo vetre.', 'V stoji rozkročnom s rukami hore sa ukloň vľavo a vpravo, 4-krát.', 'V stoji rozkročnom vystri jednu ruku nad hlavu a pomaly sa ukloň na druhú stranu, vydrž do 3. Potom naopak.'] },
  hlava: { t: ['Pomaly otoč hlavu vľavo a vpravo.', 'Pomaly prikývni a potom sa pozri cez rameno vľavo a vpravo.', 'Vystri chrbát, ramená daj dolu a ukloň hlavu k ramenu, vydrž do 3. Potom k druhému.'] },
  lopatky: { t: ['Daj ruky na ramená a krúž lakťami.', 'Lakte daj do strán a stiahni lopatky k sebe, 5-krát.', 'Vzpaž, pokrč lakte a stiahni ich dolu k bokom ako krídla, 6-krát.'] },
  // Podľa zdravotných cvičení pani učiteľky Jarky (bicykel, bocian, osievanie múky, handrová bábika)
  bicykel: { t: ['Ľahni si na chrbát a bicykluj nohami vo vzduchu.', 'Na chrbte bicykluj dopredu aj dozadu, kým napočítame do 10.', 'Na chrbte bicykluj najprv pomaly a potom rýchlo, ruky nechaj ležať vedľa tela.'] },
  bocian: { p: 'chodza', t: ['Kráčaj ako bocian a dvíhaj kolená vysoko.', 'Kráčaj ako bocian a pri každom kroku zaklapni rukami ako zobákom.', 'Postav sa na jednu nohu ako bocian, ruky daj do strán a vydrž do 5. Potom na druhej nohe.'] },
  otocka: { t: ['Ruky daj pred seba a pomaly ich presúvaj vľavo a vpravo, ako keď osievaš múku.', 'V stoji rozkročnom s rukami vbok otáčaj trup vľavo a vpravo, nohy ostanú na mieste.', 'V tureckom sede s rukami na ramenách pomaly otáčaj trup vľavo a vpravo, 5-krát.'] },
  relax: { t: ['Ľahni si na chrbát ako handrová bábika a zavri oči.', 'Ľahni si, uvoľni ruky aj nohy a počúvaj, ako dýchaš.', 'Ľahni si, napni celé telo, kým napočítam do 3, a potom ho uvoľni ako handrová bábika.'] },
  // Ďalšie cviky so zvieratkami a predmetmi (podľa kníh o držaní tela a metodiky Zdravie a pohyb), opísané vlastnými slovami
  zabka: { p: 'drep', t: ['Urob žabku: čupni si, kolená daj od seba a dlane spoj medzi kolenami.', 'V žabke lakťami jemne tlač kolená od seba a kvákni: kvak!', 'Zo žabky poskoč kúsok dopredu a znova si čupni, 4-krát.'] },
  motyl: { p: 'sed', t: ['Sadni si, chodidlá daj k sebe a mávaj kolenami ako motýlik krídlami.', 'Chodidlá k sebe, chyť sa za ne a mávaj kolenami, kým napočítam do 8.', 'Chodidlá k sebe, chrbát rovno, pomaly sa predkloň nad chodidlá a vydrž do 3.'] },
  veslar: { p: 'sed', t: ['Sadni si a veslovaj rukami ako v loďke.', 'V sede s vystretými nohami veslovaj: ruky dopredu a k sebe, 6-krát.', 'Veslujte vo dvojici: držte sa za ruky a striedavo sa jemne ťahajte dopredu a dozadu.'] },
  snehuliak: { t: ['Postav sa ako zamrznutý snehuliak a potom sa pomaly roztop na zem.', 'Napni celé telo ako ľad, a keď zasvieti slnko, pomaly sa roztop a ľahni si.', 'Napni telo, kým napočítam do 5, potom sa roztápaj po kúskoch: hlava, ruky, trup, nohy.'] },
  prsty: { t: ['Roztiahni prsty ako vejár a potom ich zovri do päste.', 'Prsty roztiahni, zovri a krúž zápästiami, 5-krát.', 'Dotkni sa palcom každého prsta po rade, tam a späť.'] },
  vrchnak: { p: 'sed', t: ['V tureckom sede prenes vrchnák nad hlavou z jednej ruky do druhej.', 'V sede chyť vrchnák prstami na nohe a polož ho vedľa seba.', 'Prejdi kúsok s vrchnákom na hlave tak, aby nespadol.'] },
  chodidla: { p: 'sed', t: ['V sede pohýbaj prstami na nohách, roztiahni ich a stiahni.', 'V sede chyť prstami na nohách šatku a zdvihni ju.', 'V sede prenes šatku chodidlami z jednej strany na druhú, 3-krát. Potom choď kúsok po špičkách a kúsok po pätách.'] },
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
