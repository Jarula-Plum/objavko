import Link from 'next/link'
import { notFound } from 'next/navigation'
import Logo from '@/components/Logo'
import Play from '@/components/Play'
import { requireUser } from '@/lib/supabase/server'
import { bestStars } from '@/lib/games'
import { Ui } from '@/components/Emo'

type Props = { params: Promise<{ classId: string }> }

export default async function PlayPage({ params }: Props) {
  const { classId } = await params
  const { supabase } = await requireUser()
  const { data: cls } = await supabase.from('classes').select('id, name').eq('id', classId).maybeSingle()
  if (!cls) notFound()
  const { data: kids } = await supabase
    .from('children').select('id, name, avatar').eq('class_id', classId).order('created_at')
  const ids = (kids ?? []).map((k) => k.id)
  const { data: results } = ids.length
    ? await supabase.from('results').select('child_id, game_id, stars').in('child_id', ids)
    : { data: [] }

  return (
    <div className="wrap">
      <header className="top">
        <Logo sub="Pre deti" />
        <Link href="/ucitel" className="ghost"><Ui n="zosit" /> Pre učiteľku</Link>
      </header>
      <Play classId={cls.id} className={cls.name} kids={kids ?? []} initialBest={bestStars(results ?? [])} />
    </div>
  )
}
