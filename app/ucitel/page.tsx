import Link from 'next/link'
import Logo from '@/components/Logo'
import { requireUser } from '@/lib/supabase/server'
import { signOut } from '@/app/prihlasenie/actions'
import { createClass } from './actions'
import { Ui } from '@/components/Emo'

export default async function TeacherHome() {
  const { supabase, user } = await requireUser()
  const { data: classes } = await supabase
    .from('classes')
    .select('id, name, children(count)')
    .order('created_at')

  return (
    <div className="wrap">
      <header className="top">
        <Logo sub="Pre učiteľku" />
        <form action={signOut} className="row">
          <span className="note">{user?.email}</span>
          <button className="ghost">Odhlásiť sa</button>
        </form>
      </header>
      <section className="panel">
        <h2 style={{ fontSize: 26 }}>Moje triedy</h2>
        {classes?.length ? (
          <div className="classes">
            {classes.map((c) => {
              const count = (c.children as unknown as { count: number }[])[0]?.count ?? 0
              return (
                <div key={c.id} className="panel" style={{ background: 'var(--soft)' }}>
                  <h3 style={{ fontSize: 22 }}>{c.name}</h3>
                  <p className="note">{count} {count === 1 ? 'dieťa' : count >= 2 && count <= 4 ? 'deti' : 'detí'}</p>
                  <div className="row">
                    <Link href={`/hraj/${c.id}`} className="cta"><Ui n="hraj" /> Hrať</Link>
                    <Link href={`/ucitel/trieda/${c.id}`} className="ghost"><Ui n="zosit" /> Žiaci a pokrok</Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="note">Zatiaľ nemáš žiadnu triedu. Založ prvú a pridaj do nej deti.</p>
        )}
        <form action={createClass} className="field" style={{ maxWidth: 420 }}>
          <label htmlFor="new-class" className="label">Nová trieda</label>
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <input id="new-class" name="name" required maxLength={40} placeholder="Napr. Lienky" className="inp" />
            <button className="cta" style={{ flex: 'none' }}>Založiť</button>
          </div>
        </form>
      </section>
    </div>
  )
}
