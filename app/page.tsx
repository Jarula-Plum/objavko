import Link from 'next/link'
import Logo from '@/components/Logo'
import { GAMES } from '@/lib/games'
import { Icon, Ui } from '@/components/Emo'
import { GuideHello } from '@/components/Guide'

export default function Home() {
  return (
    <div className="wrap">
      <header className="top">
        <Logo />
        <Link href="/prihlasenie" className="ghost">Prihlásiť sa</Link>
      </header>
      <section className="hero">
        <h2>Hry, ktoré deti bavia a učiteľkám šetria čas</h2>
        <p>Každá hra je naviazaná na Štátny vzdelávací program pre MŠ. Pokyny číta hlas, takže deti nemusia vedieť čítať. Vy vidíte pokrok každého dieťaťa.</p>
        <div className="row">
          <Link href="/prihlasenie?rezim=registracia" className="cta"><Ui n="hraj" /> Vyskúšať zadarmo</Link>
        </div>
      </section>
      <GuideHello text="Ahoj! Sme škriatok a víla. Poď sa s nami hrať!" />
      <div className="grid">
        {GAMES.map((g) => (
          <div key={g.id} className="tile" style={{ ['--c' as string]: g.color }}>
            <span className="pic"><Icon pic={g.pic} img={g.img} /></span>
            <h3>{g.name}</h3>
            <p>{g.desc}</p>
            <span className="stars">{g.area}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
