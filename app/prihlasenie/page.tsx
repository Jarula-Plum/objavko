import Link from 'next/link'
import Logo from '@/components/Logo'
import { signIn, signUp } from './actions'

type Props = { searchParams: Promise<{ rezim?: string; chyba?: string; info?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { rezim, chyba, info } = await searchParams
  const register = rezim === 'registracia'
  return (
    <div className="wrap">
      <header className="top"><Logo /></header>
      <section className="panel" style={{ maxWidth: 420, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28 }}>{register ? 'Registrácia pre učiteľky' : 'Prihlásenie'}</h2>
        {info === 'over-email' && <p className="note">Poslali sme ti e-mail. Klikni na odkaz v ňom a potom sa prihlás.</p>}
        {chyba && <p className="error" role="alert">{chyba}</p>}
        <form action={register ? signUp : signIn} className="panel" style={{ padding: 0 }}>
          <div className="field">
            <label htmlFor="email" className="label">E-mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="inp" />
          </div>
          <div className="field">
            <label htmlFor="password" className="label">Heslo</label>
            <input id="password" name="password" type="password" required minLength={8}
              autoComplete={register ? 'new-password' : 'current-password'} className="inp" />
          </div>
          <button className="cta">{register ? 'Vytvoriť účet' : 'Prihlásiť sa'}</button>
        </form>
        <p className="note">
          {register
            ? <>Už máš účet? <Link href="/prihlasenie">Prihlás sa</Link></>
            : <>Nový účet? <Link href="/prihlasenie?rezim=registracia">Zaregistruj sa</Link></>}
        </p>
      </section>
    </div>
  )
}
