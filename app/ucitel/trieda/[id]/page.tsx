import Link from 'next/link'
import { notFound } from 'next/navigation'
import Logo from '@/components/Logo'
import { requireUser } from '@/lib/supabase/server'
import { AREAS, AVATARS, GAMES, bestStars } from '@/lib/games'
import { addChild, deleteClass, removeChild, renameClass, updateChild } from '../../actions'
import { Icon, Stars, Ui, emo } from '@/components/Emo'

type Props = { params: Promise<{ id: string }> }

export default async function ClassPage({ params }: Props) {
  const { id } = await params
  const { supabase } = await requireUser()
  const { data: cls } = await supabase.from('classes').select('id, name').eq('id', id).maybeSingle()
  if (!cls) notFound()
  const { data: kids = [] } = await supabase
    .from('children').select('id, name, avatar').eq('class_id', id).order('created_at')
  const ids = (kids ?? []).map((k) => k.id)
  const { data: results } = ids.length
    ? await supabase.from('results').select('child_id, game_id, stars').in('child_id', ids)
    : { data: [] }
  const best = bestStars(results ?? [])

  return (
    <div className="wrap">
      <header className="top">
        <Logo sub="Pre učiteľku" />
        <div className="row">
          <Link href="/ucitel" className="ghost"><Ui n="spat" /> Moje triedy</Link>
          <Link href={`/hraj/${id}`} className="cta"><Ui n="hraj" /> Hrať s triedou</Link>
        </div>
      </header>
      <div className="cols">
        <section className="panel">
          <h2 style={{ fontSize: 26 }}>Trieda {cls.name} · prehľad pokroku</h2>
          {kids?.length ? (
            <div className="tbl">
              <table>
                <thead>
                  <tr><th>Dieťa</th>{GAMES.map((g) => <th key={g.id}>{g.name}</th>)}</tr>
                </thead>
                <tbody>
                  {kids.map((k) => (
                    <tr key={k.id}>
                      <td><strong><span className="tav">{emo(k.avatar)}</span> {k.name}</strong></td>
                      {GAMES.map((g) => {
                        const v = best[k.id]?.[g.id] ?? 0
                        return <td key={g.id}><span className={`s s${v}`}>{v ? <Stars n={v} /> : '–'}</span></td>
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="note">V triede zatiaľ nie sú deti. Pridaj ich vpravo.</p>
          )}
          <p className="note"><Stars n={3} /> zvláda samo, <Stars n={2} /> potrebuje trochu precvičiť, <Stars n={1} /> treba podporu. Zobrazuje sa najlepší výsledok dieťaťa.</p>
          <details className="stds">
            <summary>Hry a výkonové štandardy ŠVP</summary>
            {AREAS.map((area) => (
              <div key={area}>
                <h3>{area}</h3>
                <ul>
                  {GAMES.filter((g) => g.area === area).map((g) => (
                    <li key={g.id}><strong><Icon pic={g.pic} img={g.img} /> {g.name}</strong> <span>· {g.std}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </section>

        <aside className="panel">
          <form action={renameClass} className="field">
            <input type="hidden" name="id" value={id} />
            <label htmlFor="cls-name" className="label">Názov triedy</label>
            <div className="row" style={{ flexWrap: 'nowrap' }}>
              <input id="cls-name" name="name" defaultValue={cls.name} required maxLength={40} className="inp" />
              <button className="ghost" style={{ flex: 'none' }}>Uložiť</button>
            </div>
          </form>

          <ul className="roster">
            {kids?.map((k) => (
              <li key={k.id}>
                <details className="kid-edit">
                  <summary>
                    <span className="av">{emo(k.avatar)}</span>
                    <span className="nm">{k.name}</span>
                    <span className="ed">Upraviť</span>
                  </summary>
                  <form action={updateChild} className="field">
                    <input type="hidden" name="id" value={k.id} />
                    <input type="hidden" name="class_id" value={id} />
                    <div className="avpick" role="radiogroup" aria-label={`Ikonka pre ${k.name}`}>
                      {AVATARS.map((a, i) => (
                        <span key={a}>
                          <input type="radio" name="avatar" id={`av-${k.id}-${i}`} value={a} defaultChecked={a === k.avatar} />
                          <label htmlFor={`av-${k.id}-${i}`}>{emo(a)}</label>
                        </span>
                      ))}
                    </div>
                    <div className="row" style={{ flexWrap: 'nowrap' }}>
                      <input name="name" aria-label="Meno žiaka" defaultValue={k.name} required maxLength={24} autoComplete="off" className="inp" />
                      <button className="cta" style={{ flex: 'none' }}>Uložiť</button>
                    </div>
                  </form>
                  <form action={removeChild} className="field">
                    <input type="hidden" name="id" value={k.id} />
                    <input type="hidden" name="class_id" value={id} />
                    <p className="note">Odobratím z triedy sa zmažú aj výsledky dieťaťa.</p>
                    <button className="ghost" style={{ color: 'var(--bad)', alignSelf: 'flex-start' }} aria-label={`Odobrať ${k.name} z triedy`}>Odobrať z triedy</button>
                  </form>
                </details>
              </li>
            ))}
          </ul>

          <form action={addChild} className="field">
            <input type="hidden" name="class_id" value={id} />
            <span className="label">Pridať žiaka</span>
            <div className="avpick" role="radiogroup" aria-label="Ikonka dieťaťa">
              {AVATARS.map((a, i) => (
                <span key={a}>
                  <input type="radio" name="avatar" id={`av-${i}`} value={a} defaultChecked={i === (kids?.length ?? 0) % AVATARS.length} />
                  <label htmlFor={`av-${i}`}>{emo(a)}</label>
                </span>
              ))}
            </div>
            <div className="row" style={{ flexWrap: 'nowrap' }}>
              <input name="name" aria-label="Meno žiaka" placeholder="Meno alebo prezývka" required maxLength={24} autoComplete="off" className="inp" />
              <button className="cta" style={{ flex: 'none' }}>Pridať</button>
            </div>
            <p className="note">Stačí krstné meno alebo prezývka. Dieťa nepotrebuje e-mail ani heslo.</p>
          </form>

          <details>
            <summary className="note" style={{ cursor: 'pointer' }}>Odstrániť triedu</summary>
            <form action={deleteClass} className="field" style={{ marginTop: 8 }}>
              <input type="hidden" name="id" value={id} />
              <p className="note">Zmažú sa aj všetci žiaci a ich výsledky. Nedá sa to vrátiť.</p>
              <button className="ghost" style={{ color: 'var(--bad)', alignSelf: 'flex-start' }}>Áno, odstrániť triedu</button>
            </form>
          </details>
        </aside>
      </div>
    </div>
  )
}
