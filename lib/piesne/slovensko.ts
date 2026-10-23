import { L, LH, type Piesne } from './types'

// Téma Slovensko: ľudové piesne z rôznych krajov a nové riekanky napísané pre Objavko
export const SLOVENSKO: Record<string, Piesne> = {
  slovensko: {
    s: [
      ['Po Dunaji, po Dunaji', L],
      ['Pod tým našim okienečkom', L],
      ['Kukulienka, kde si bola', LH],
      ['Pásla ovečky', L],
      ['Tancuj, tancuj, vykrúcaj', L],
    ],
    r: [
      ['Slovensko moje', 'Slovensko moje malé,\nhory máš vysoké.\nDunaj tečie, Váh sa vlní,\nmoje srdce radosťou plní.'],
      ['Na salaši', 'Na salaši valach býva,\novečky si poháňa.\nBryndza, žinčica a syr,\nbača hrá na fujaru: frrr.'],
      ['Tri farby', 'Biela ako oblak,\nmodrá ako nebo,\nčervená ako srdce,\nto je naša vlajka, hľa.'],
    ],
  },
}
