// Nahraté vety (napr. zo Suno) namiesto hlasu prehliadača.
// Kľúč je presný text vety, hodnota súbor v public/hlas. Veta sa prehrá zo súboru len vtedy,
// keď je jej súbor v zozname NAHRATE; inak ju prečíta hlas prehliadača.
export const VETY: Record<string, { file: string; who: 'chlapec' | 'dievca' }> = {
  'Ahoj! Sme Čarozvedko a Čarozvedka. Poď sa s nami hrať!': { file: '01-ahoj.mp3', who: 'chlapec' },
  'Ja som Čarozvedko, lesný škriatok. Bývam v dutom dube a mám čarovný prútik. Najradšej skúmam, ako veci fungujú, a pomôžem ti, keď niečo nevieš.': { file: '02-carozvedko.mp3', who: 'chlapec' },
  'Ja som Čarozvedka, lesná víla. Mám krídla jemné ako rosa a poznám každý kvietok v lese. Rada čítam rozprávky a teším sa z každej veci, ktorú sa naučíš.': { file: '03-carozvedka.mp3', who: 'dievca' },
  'Výborne!': { file: '04-vyborne.mp3', who: 'chlapec' },
  'Šikovné!': { file: '05-sikovne.mp3', who: 'chlapec' },
  'Dobrý pokus!': { file: '06-dobry-pokus.mp3', who: 'chlapec' },
  'Skús ešte raz': { file: '07-skus-este-raz.mp3', who: 'chlapec' },
  'Skús iné miesto': { file: '08-skus-ine-miesto.mp3', who: 'chlapec' },
  'Skús ešte raz, pomaly.': { file: '09-skus-pomaly.mp3', who: 'chlapec' },
  'Výborne! Docvičili sme. Teraz sa poriadne nadýchni a vydýchni.': { file: '10-docvicili.mp3', who: 'chlapec' },
}

// Súbory, ktoré už sú nahrané v public/hlas
export const NAHRATE = new Set<string>([])
