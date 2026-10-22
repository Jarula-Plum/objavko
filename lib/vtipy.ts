// Krátke vtipy, ktoré sprievodcovia občas povedia po správnej odpovedi.
// who: kto ho môže povedať (vety v mužskom/ženskom rode), inak ktokoľvek.
type Vtip = { t: string; who?: 'chlapec' | 'dievca' }

export const VTIPY: Vtip[] = [
  { t: 'Od radosti mi aj krídelká tlieskajú. Tlesk, tlesk!' },
  { t: 'Psst, ježko mi pošepkal, že to vieš skvele. A ježko neklame, iba pichá!' },
  { t: 'Čo je zelené a skáče? Uhorka na trampolíne! Hi-hi!' },
  { t: 'Slimák chcel ísť s nami, ale ešte stále je na štarte. Pomaličky, slimáčik!' },
  { t: 'Prečo ryby nehrajú futbal? Lebo by im lopta uplávala! Hi-hi.' },
  { t: 'Moja čiapka sa tak potešila, že mi skočila na nos!' },
  { t: 'Mačka chcela tiež hrať, ale vedela povedať iba mňau. Mňau-mňau!' },
  { t: 'Čo robí medveď v zime? Chrrr… Psst, nebuďme ho!' },
  { t: 'Ups, od radosti som si sadol na čarovnú paličku. Au! Hi-hi!', who: 'chlapec' },
  { t: 'Keby som bol kohút, teraz by som zakikiríkal: kikirikíí!', who: 'chlapec' },
  { t: 'Myslela som si, že najlepšie čarujem ja. Ale ty čaruješ ešte lepšie!', who: 'dievca' },
  { t: 'Od radosti sa mi rozviazala mašlička. Ešte šťastie, že vlasy mám prilepené čarom!', who: 'dievca' },
]

let posledny = -1
/** Náhodný vtip pre sprievodcu, nikdy nie dvakrát po sebe ten istý. */
export function vtip(): { t: string; who: 'chlapec' | 'dievca' } {
  let k = Math.floor(Math.random() * VTIPY.length)
  if (k === posledny) k = (k + 1) % VTIPY.length
  posledny = k
  const v = VTIPY[k]
  return { t: v.t, who: v.who ?? (Math.random() < 0.5 ? 'chlapec' : 'dievca') }
}
