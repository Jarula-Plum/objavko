import Link from 'next/link'
import Logo from '@/components/Logo'
import { GAMES } from '@/lib/games'
import { THEMES } from '@/lib/themes'
import { HADANKY } from '@/lib/hadanky'
import { MALOVANE } from '@/lib/malovane'
import { EXTRA_OMAL, OMALOVANKY } from '@/lib/omalovanky'
import { POCET_ROZPRAVOK } from '@/lib/rozpravky'
import { Ui } from '@/components/Emo'
import { GuideHello } from '@/components/Guide'

// Úvodná stránka pre pani učiteľky a riaditeľky: čo Objavko je, čo v ňom nájdu a ako si ho vyskúšať
const CISLA = [
  { n: THEMES.length, t: 'tém na celý školský rok', img: '/obrazky/strom-jesen.webp' },
  { n: GAMES.length, t: 'hier podľa ŠVP pre MŠ', img: '/ikony/kukucka.webp' },
  { n: POCET_ROZPRAVOK, t: 'rozprávok k témam', img: '/obrazky/kniha.webp' },
  { n: HADANKY.length, t: 'hádaniek', img: '/ikony/hadanky.webp' },
  { n: Object.keys(MALOVANE).length, t: 'maľovaných čítaní', img: '/skriatok/d-citanie.webp' },
  { n: OMALOVANKY.size + EXTRA_OMAL.length, t: 'omaľovánok na tablet aj tlač', img: '/ikony/omalovanky.webp' },
]

const KROKY = [
  { t: 'Vyberiete tému týždňa', p: 'Aplikácia sama ponúkne tému podľa kalendára: jeseň, Mikuláš, zvieratká, Slovensko… Môžete si vybrať aj inú.', img: '/obrazky/kalendar.webp' },
  { t: 'Deti sa hrajú', p: 'Čarozvedko a Čarozvedka čítajú pokyny nahlas, deti nemusia vedieť čítať. Tri úrovne pre 3 až 6 rokov.', img: '/sprievodca/chlapec-ahoj.webp' },
  { t: 'Vy vidíte pokrok', p: 'Pri každom dieťati súhrn podľa oblastí ŠVP: čo zvláda, čo precvičiť. Hotový text do hodnotenia na jedno ťuknutie.', img: '/ikony/pocty.webp' },
]

const PRE_UCITELKU = [
  ['Metodika ku každej hre', 'Cieľ, čo hra rozvíja, postup a diferenciácia podľa veku.'],
  ['Zápis do triednej knihy', 'Pripravená veta k hre, stačí skopírovať.'],
  ['Námety k téme', 'Ranné aktivity, pohybové a hudobno-pohybové hry, zdravotné cviky s riekankou, piesne.'],
  ['Na tlač', 'Pracovné listy a omaľovánky na celú stranu A4.'],
  ['Aj bez internetu', 'Pridajte si Objavko na plochu tabletu. Čo sa raz načíta, funguje aj pri slabej Wi-Fi.'],
  ['Vlastné hlasy', 'Čarozvedko a Čarozvedka hovoria po slovensky, aj mená detí.'],
]

const OTAZKY = [
  ['Pre aký vek je Objavko?', 'Pre deti od 3 do 6 rokov. Každá hra má tri úrovne a pani učiteľka nastaví úroveň pre každé dieťa zvlášť.'],
  ['Potrebujú deti účet alebo e-mail?', 'Nie. Pani učiteľka si vytvorí triedu a pridá deti len krstným menom alebo prezývkou.'],
  ['Na čom to funguje?', 'Na tablete, počítači aj interaktívnej tabuli, v bežnom prehliadači. Netreba nič inštalovať.'],
  ['Sú v aplikácii reklamy?', 'Nie. Objavko nemá reklamy ani nákupy v hre a nezbiera o deťoch nič okrem výsledkov hier.'],
  ['Kto Objavko robí?', 'Pani učiteľka z materskej školy, ktorá ho používa vo vlastnej triede. Obsah vychádza zo ŠVP pre predprimárne vzdelávanie.'],
]

export default function Home() {
  return (
    <div className="wrap lp">
      <header className="top">
        <Logo />
        <div className="row">
          <Link href="/ukazka" className="ghost">Vyskúšať hry</Link>
          <Link href="/prihlasenie" className="ghost">Prihlásiť sa</Link>
        </div>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-text">
          <span className="lp-stitok">Pre materské školy · podľa ŠVP</span>
          <h2>Celý školský rok v jednej aplikácii</h2>
          <p>Hry, rozprávky, hádanky a námety ku každej téme týždňa. Deti sa hrajú s Čarozvedkom a Čarozvedkou, vy máte metodiku, zápis do triednej knihy a prehľad pokroku každého dieťaťa.</p>
          <div className="row">
            <Link href="/prihlasenie?rezim=registracia" className="cta"><Ui n="hraj" /> Vyskúšať zadarmo</Link>
            <Link href="/ukazka" className="ghost">Zahrať si ukážku bez prihlásenia</Link>
          </div>
        </div>
        <div className="lp-hero-obr" aria-hidden="true">
          <img src="/sprievodca/chlapec-ahoj.webp" alt="" className="lp-g1" />
          <img src="/sprievodca/dievca-usmev.webp" alt="" className="lp-g2" />
        </div>
      </section>

      <section className="lp-cisla" aria-label="Čo v Objavku nájdete">
        {CISLA.map((c) => (
          <div key={c.t} className="lp-cislo">
            <img src={c.img} alt="" />
            <strong>{c.n}</strong>
            <span>{c.t}</span>
          </div>
        ))}
      </section>

      <section className="lp-sekcia">
        <h2>Ako to funguje</h2>
        <ol className="lp-kroky">
          {KROKY.map((k, i) => (
            <li key={k.t}>
              <img src={k.img} alt="" />
              <span className="lp-krok-cislo">{i + 1}</span>
              <h3>{k.t}</h3>
              <p>{k.p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="lp-sekcia">
        <h2>Čo sa deti naučia</h2>
        <p className="lp-uvod">Hry sú rozdelené podľa vzdelávacích oblastí ŠVP. Ku každej je uvedený výkonový štandard.</p>
        <div className="lp-oblasti">
          {[
            ['Jazyk a komunikácia', 'Rýmy, slabiky, prvá a posledná hláska, hádanky, maľované čítanie.', '/ikony/rymy.webp'],
            ['Matematika', 'Počítanie, porovnávanie, tvary, poloha, krokovanie a robotík.', '/ikony/pocty.webp'],
            ['Človek a príroda', 'Zvieratá, ročné obdobia, živé a neživé, triedenie odpadu.', '/ikony/obdobia.webp'],
            ['Človek a spoločnosť', 'Emócie, správanie, rodina, povolania, nakupovanie.', '/ikony/emocie.webp'],
            ['Umenie a kultúra', 'Farby, rytmus, tóny, piesne a riekanky.', '/ikony/rytmus.webp'],
            ['Zdravie a pohyb', 'Zdravé jedlo, hygiena, oblečenie, zdravotné cviky.', '/ikony/zdravotne.webp'],
          ].map(([t, p, img]) => (
            <div key={t} className="lp-oblast"><img src={img} alt="" /><div><h3>{t}</h3><p>{p}</p></div></div>
          ))}
        </div>
      </section>

      <section className="lp-sekcia">
        <h2>Pre pani učiteľku</h2>
        <ul className="lp-zoznam">
          {PRE_UCITELKU.map(([t, p]) => <li key={t}><strong>{t}</strong><span>{p}</span></li>)}
        </ul>
      </section>

      <GuideHello text="Ahoj! Sme Čarozvedko a Čarozvedka. Poď sa s nami hrať!" />

      <section className="lp-sekcia">
        <h2>Časté otázky</h2>
        <div className="lp-otazky">
          {OTAZKY.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>

      <section className="lp-zaver">
        <h2>Skúste Objavko so svojou triedou</h2>
        <p>Registrácia je zadarmo. Triedu založíte za minútu a deti môžu hneď hrať.</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link href="/prihlasenie?rezim=registracia" className="cta"><Ui n="hraj" /> Vyskúšať zadarmo</Link>
          <Link href="/ukazka" className="ghost">Najprv ukážka</Link>
        </div>
      </section>
    </div>
  )
}
