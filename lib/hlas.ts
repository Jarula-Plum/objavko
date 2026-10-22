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
  // Koniec hry bez chyby: povie ju ten sprievodca, ktorý je na rade (kľúč s |kto)
  'Výborne! Jupíí, to sa ti podarilo!|chlapec': { file: '11-jupi-carozvedko.mp3', who: 'chlapec' },
  // Pokyny v hrách a vtipy
  'Spočítaj, koľko ich je.': { file: '13-pokyn.mp3', who: 'chlapec' },
  'Pozri sa na rad obrázkov. Čo bude ďalej?': { file: '14-pokyn.mp3', who: 'chlapec' },
  'Kto sa skrýva za okienkom? Povedz to nahlas!': { file: '15-pokyn.mp3', who: 'chlapec' },
  'Dobre sa pozri a zapamätaj si obrázky. Potom povedz, čo zmizlo.': { file: '16-pokyn.mp3', who: 'chlapec' },
  'Pozri sa na strom. Aké ročné obdobie je na obrázku?': { file: '17-pokyn.mp3', who: 'chlapec' },
  'Počúvaj bubon. Koľkokrát zabubnoval?': { file: '18-pokyn.mp3', who: 'chlapec' },
  'Počúvaj tón. Je vysoký ako vtáčik, alebo hlboký ako medveď?': { file: '19-pokyn.mp3', who: 'chlapec' },
  'Pozri sa na schody. Ktorý schod chýba?': { file: '20-pokyn.mp3', who: 'chlapec' },
  'Spočítaj kocky. Z koľkých kociek je stavba?': { file: '21-pokyn.mp3', who: 'chlapec' },
  'Pozri sa na parketu. Ktorý dielik do nej patrí?': { file: '22-pokyn.mp3', who: 'chlapec' },
  'Ktorými šípkami dôjde robot k batérii?': { file: '23-pokyn.mp3', who: 'chlapec' },
  'Ťukaj od najsvetlejšej farby po najtmavšiu.': { file: '24-pokyn.mp3', who: 'chlapec' },
  'Skús ešte raz. Šípka ukazuje dopredu.': { file: '25-pokyn.mp3', who: 'chlapec' },
  'Skús ešte raz. Šípka ukazuje dozadu.': { file: '26-pokyn.mp3', who: 'chlapec' },
  'Od radosti mi aj krídelká tlieskajú. Tlesk, tlesk!': { file: '27-vtip.mp3', who: 'chlapec' },
  'Psst, ježko mi pošepkal, že to vieš skvele. A ježko neklame, iba pichá!': { file: '28-vtip.mp3', who: 'dievca' },
  'Čo je zelené a skáče? Uhorka na trampolíne! Hi-hi!': { file: '29-vtip.mp3', who: 'chlapec' },
  'Slimák chcel ísť s nami, ale ešte stále je na štarte. Pomaličky, slimáčik!': { file: '30-vtip.mp3', who: 'dievca' },
  'Prečo ryby nehrajú futbal? Lebo by im lopta uplávala! Hi-hi.': { file: '31-vtip.mp3', who: 'chlapec' },
  'Moja čiapka sa tak potešila, že mi skočila na nos!': { file: '32-vtip.mp3', who: 'dievca' },
  'Mačka chcela tiež hrať, ale vedela povedať iba mňau. Mňau-mňau!': { file: '33-vtip.mp3', who: 'chlapec' },
  'Čo robí medveď v zime? Chrrr… Psst, nebuďme ho!': { file: '34-vtip.mp3', who: 'dievca' },
  'Ups, od radosti som si sadol na čarovnú paličku. Au! Hi-hi!': { file: '35-vtip.mp3', who: 'chlapec' },
  'Keby som bol kohút, teraz by som zakikiríkal: kikirikíí!': { file: '36-vtip.mp3', who: 'chlapec' },
  'Myslela som si, že najlepšie čarujem ja. Ale ty čaruješ ešte lepšie!': { file: '37-vtip.mp3', who: 'dievca' },
  'Od radosti sa mi rozviazala mašlička. Ešte šťastie, že vlasy mám prilepené čarom!': { file: '38-vtip.mp3', who: 'dievca' },
  'Výborne! Jupíí, to sa ti podarilo!|dievca': { file: '12-jupi-carozvedka.mp3', who: 'dievca' },
}

// Súbory, ktoré už sú nahrané v public/hlas
export const NAHRATE = new Set<string>(['01-ahoj.mp3', '02-carozvedko.mp3', '04-vyborne.mp3', '05-sikovne.mp3', '06-dobry-pokus.mp3', '07-skus-este-raz.mp3', '08-skus-ine-miesto.mp3', '09-skus-pomaly.mp3', '10-docvicili.mp3', '11-jupi-carozvedko.mp3', '03-carozvedka.mp3', '12-jupi-carozvedka.mp3'])
