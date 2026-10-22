// Piesne a riekanky k téme.
// s: piesne [názov, pôvod, vlastný text]; vlastný text majú len nové pesničky napísané pre Objavko
// r: riekanky [názov, text]; riekanky sú pôvodné, napísané pre Objavko
export type Piesne = { s: [string, string, string?][]; r: [string, string][] }

export const L = 'slovenská ľudová'
export const LH = 'ľudová hra so spevom'
export const D = 'detská pieseň'
export const K = 'nová pesnička pre Objavko, dá sa spievať aj rytmicky hovoriť'
export const KOL = 'koleda'
