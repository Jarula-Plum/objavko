import { D, KOL, L, LH, type Piesne } from './types'

// Doplnky k piesňam a riekankám (október 2026): ľudové piesne a hry so spevom, ktoré v zozname chýbali,
// a nové riekanky s pohybom. Riekanky sú pôvodné, napísané pre Objavko; z materiálov pani učiteľky sme vzali len námet.
export const DOPLNKY: Record<string, Partial<Piesne>> = {
  'kto-prisiel': {
    s: [['My sme sestry veselé', LH], ['O reťaz, o reťaz', LH]],
  },
  'moj-den': {
    s: [['Oli, oli, Janko', LH]],
    r: [['Spachtoško', 'Spí, spí spachtoško,\nšteklí ho slniečko.\nRuky hore, nohy von,\nhop z postieľky, bim-bam-bom!']],
  },
  obec: {
    s: [['O reťaz, o reťaz', LH]],
  },
  vetricek: {
    r: [['Pierko', 'Fúk, fúk, pierko malé,\nletí hore, letí ďalej.\nKto ho fúkne najdlhšie,\npierko k nebu doletí.']],
  },
  starki: {
    s: [['Andulka šafárova', L]],
  },
  plody: {
    s: [['Červené jabĺčko', L], ['Hrali by sme na konôpky', LH]],
  },
  'jesen-zvierata': {
    s: [['Zajačik v jamôčke', LH], ['Zajačik, do lesa', LH]],
    r: [['Korytnačka', 'Korytnačka pomaly\nnesie domček na chrbte.\nKeď ju niečo vyľaká,\nhlávku schová do domčeka.']],
  },
  telo: {
    s: [['Hlava, ramená, kolená, palce', D], ['Oli, oli, Janko', LH]],
    r: [['Prstíky', 'Palček silák drevo nosí,\nukazováčik cestu kreslí,\nprostredníček je najväčší,\nprstenníček nosí perly,\nmalíček sa smeje: hí!\nZamávajme, prstíky!']],
  },
  bacil: {
    s: [['Oli, oli, Janko', LH]],
  },
  zdravy: {
    s: [['Hlava, ramená, kolená, palce', D]],
  },
  sneh: {
    r: [['Mrázik', 'Mrázik štípe, mrázik hryzie,\ndupnem nohou, hneď odíde.\nTlesk a tlesk a dupi-dup,\nzohrejeme sa hneď všetci tu.']],
  },
  vianoce: {
    s: [['Tichá noc', `${KOL} (Franz Xaver Gruber, 1818)`], ['Narodil sa Kristus Pán', KOL]],
  },
  'zvierata-zima': {
    s: [['Medveďku, daj labku', L]],
  },
  fasiangy: {
    s: [['Štyri kozy, piaty cap', L], ['Mám ručníček, mám', L]],
    r: [['Šašo', 'Šašo skáče, šašo tlieska,\nna nose mu guľka bliká.\nKto sa smeje najkrajšie,\nnech si s ním teraz zatancuje.']],
  },
  profesie: {
    s: [['Šijeme vrecia, šijeme', LH]],
  },
  muzikanti: {
    s: [['My sme malí muzikanti', D]],
    r: [['Fľašková kapela', 'Cink do fľaše, cink do druhej,\njedna píska, druhá hučí.\nKoľko vody, taký tón,\nhráme spolu cink a bom.']],
  },
  'pri-vode': {
    s: [['Hore Váhom, dolu Váhom', L]],
  },
  rozpravky: {
    s: [['Medveďku, daj labku', L]],
    r: [['Kocúr na plote', 'Kocúr sedí na plote,\nfúzy si česká v pokoji.\nPozrie vľavo, pozrie vpravo,\nmyšky, schovajte sa hravo!']],
  },
  domace: {
    s: [['Chytili sme kohútika', LH], ['Štyri kozy, piaty cap', L], ['Travička zelená', L]],
  },
  jar: {
    s: [['Travička zelená', L], ['Anička, dušička', L], ['Zajačik v jamôčke', LH]],
    r: [['Slniečko spí', 'Slniečko spí, slniečko spí,\nza horou si hlavu skrýva.\nZobuď sa, slniečko, vstaň,\nposvieť nám na zelenú stráň.']],
  },
  'velka-noc': {
    s: [['Zajačik v jamôčke', LH]],
  },
  les: {
    s: [['Ja do lesa nepôjdem', L], ['Zajačik, do lesa', LH]],
  },
  kvapka: {
    s: [['Kopala studienku', L]],
    r: [['Kvapky sa stretli', 'Kvapka sem a kvapka tam,\nkvapka hľadá kamarátov.\nTri a štyri spolu, hľa,\nveľká mláčka už je tu.']],
  },
  semienko: {
    s: [['Hrali by sme na konôpky', LH]],
  },
  'farby-sveta': {
    s: [['Vijeme vence, vijeme', LH]],
  },
  rodina: {
    s: [['My sme sestry veselé', LH]],
  },
  luka: {
    s: [['Travička zelená', L], ['Vijeme vence, vijeme', LH], ['Sedí mucha na stene', L]],
  },
  exoticke: {
    r: [['Ťavka', 'Ide ťavka po piesku,\nnesie vodu v hrbe svojom.\nHrb hore, hrb dolu,\nkráča púšťou pomaly.']],
  },
  bylinky: {
    s: [['Vijeme vence, vijeme', LH]],
  },
  'deti-sveta': {
    s: [['O reťaz, o reťaz', LH], ['Hrali by sme na konôpky', LH]],
  },
  vlast: {
    s: [['Hore Váhom, dolu Váhom', L], ['Na Kráľovej holi', L]],
  },
  leto: {
    s: [['Sadaj, slnko, sadaj', L]],
  },
  lucime: {
    s: [['Mám ručníček, mám', L]],
  },
  cas: {
    s: [['Sadaj, slnko, sadaj', L]],
  },
  obchod: {
    s: [['Šijeme vrecia, šijeme', LH]],
  },
  srdiecko: {
    s: [['Mám ručníček, mám', L]],
  },
  cistotka: {
    s: [['Oli, oli, Janko', LH]],
  },
  oblecenie: {
    s: [['Zajačik, do lesa', LH]],
  },
  more: {
    r: [['Loďka', 'Loďka sa hojdá, hojdá sa,\nraz je hore, raz je dolu.\nVeslujeme, raz a dva,\ndoplávame k brehu spolu.']],
  },
  domov: {
    r: [['Myška tancuje', 'Tancuje myška na stole,\ntočí sa dookola.\nRaz, dva, tri, zívla si,\nna chvostíku zaspala si.']],
  },
  ovocie: {
    s: [['Červené jabĺčko', L]],
  },
  zelenina: {
    s: [['Kozička je v záhrade', LH]],
  },
  dielna: {
    s: [['Kozička je v záhrade', LH]],
  },
  hracky: {
    s: [['Medveďku, daj labku', L]],
  },
}

// Ľudové riekanky a vyčítanky (overené v zbierke MPC Klenotnica ľudovej slovesnosti, 2013) a ľudové piesne.
// Ľudová slovesnosť je voľná; texty sú v bežne známej podobe.
const LUDOVE: Record<string, Partial<Piesne>> = {
  domace: { r: [['Ťap, ťap, ťapušky (ľudová)', 'Ťap, ťap, ťapušky,\nišli mačky na hrušky,\npodriapali kožušky,\npovešali na vráta,\npríde kocúr, popláta.']] },
  'pri-vode': { r: [['Skáče žaba po blate (ľudová)', 'Skáče žaba po blate,\nkúpime jej na gate.\nNa aké, na také,\nna zelené strakaté.'], ['Stojí vŕba pri potoku (ľudová vyčítanka)', 'Stojí vŕba pri potoku,\nna nej visí zvon,\nna koho to slovo padne,\nten musí ísť von.']] },
  profesie: { r: [['Osievame múčku (ľudová)', 'Osievame múčku\nv slamenom klobúčku,\nkeď ju naosievame,\nmlynárovi dáme.'], ['Jeden kováč koňa kuje (ľudová vyčítanka)', 'Jeden kováč koňa kuje,\nkoľko klincov potrebuje?\nJeden, dva, tri,\nuž chytáš ty.']] },
  starki: { r: [['Osievame múčku (ľudová)', 'Osievame múčku\nv slamenom klobúčku,\nkeď ju naosievame,\nmlynárovi dáme.']] },
  dielna: { r: [['Jeden kováč koňa kuje (ľudová vyčítanka)', 'Jeden kováč koňa kuje,\nkoľko klincov potrebuje?\nJeden, dva, tri,\nuž chytáš ty.']] },
  telo: { r: [['Varila myšička kašičku (ľudová, prstová)', 'Varila myšička kašičku\nv zelenom hrnčeku.\nTomuto dala, tomuto dala,\ntomuto dala, tomuto dala,\na tomuto nedala,\nfrr, uletela!']] },
  jedlo: { r: [['Varila myšička kašičku (ľudová, prstová)', 'Varila myšička kašičku\nv zelenom hrnčeku.\nTomuto dala, tomuto dala,\ntomuto dala, tomuto dala,\na tomuto nedala,\nfrr, uletela!']] },
  les: { s: [['Lístoček dubový', L]], r: [['Pôjdeme my do hájika (ľudová vyčítanka)', 'Pôjdeme my do hájika,\nchytíme tam zajačika.\nHeš, zajačik, heš,\na ty za ním bež!']] },
  'kto-prisiel': { r: [['Aka fuka (ľudová vyčítanka)', 'Aka fuka funda luka,\nfunda kava kevenduka,\nak fuk funda luk,\nfunda kava kevenduk.'], ['Stojí vŕba pri potoku (ľudová vyčítanka)', 'Stojí vŕba pri potoku,\nna nej visí zvon,\nna koho to slovo padne,\nten musí ísť von.']] },
  fasiangy: { r: [['Aka fuka (ľudová vyčítanka)', 'Aka fuka funda luka,\nfunda kava kevenduka,\nak fuk funda luk,\nfunda kava kevenduk.']] },
  luka: { s: [['Komáre sa ženili', L]] },
  plody: { s: [['Lístoček dubový', L]] },
}
for (const [id, d] of Object.entries(LUDOVE)) {
  const t = (DOPLNKY[id] ??= {})
  t.s = [...(t.s ?? []), ...(d.s ?? [])]
  t.r = [...(t.r ?? []), ...(d.r ?? [])]
}
