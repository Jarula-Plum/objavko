'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AVATARS } from '@/lib/games'

const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? '').trim().slice(0, max)

export async function createClass(formData: FormData) {
  const name = text(formData, 'name', 40)
  if (!name) return
  const supabase = await createClient()
  const { data, error } = await supabase.from('classes').insert({ name }).select('id').single()
  if (error) throw new Error('Triedu sa nepodarilo založiť.')
  redirect(`/ucitel/trieda/${data.id}`)
}

export async function renameClass(formData: FormData) {
  const id = text(formData, 'id', 64)
  const name = text(formData, 'name', 40)
  if (!name) return
  const supabase = await createClient()
  await supabase.from('classes').update({ name }).eq('id', id)
  revalidatePath(`/ucitel/trieda/${id}`)
}

export async function deleteClass(formData: FormData) {
  const id = text(formData, 'id', 64)
  const supabase = await createClient()
  await supabase.from('classes').delete().eq('id', id)
  redirect('/ucitel')
}

export async function addChild(formData: FormData) {
  const classId = text(formData, 'class_id', 64)
  const name = text(formData, 'name', 24)
  const avatar = String(formData.get('avatar') ?? '')
  if (!name) return
  const supabase = await createClient()
  await supabase.from('children').insert({
    class_id: classId,
    name,
    avatar: AVATARS.includes(avatar) ? avatar : AVATARS[0],
  })
  revalidatePath(`/ucitel/trieda/${classId}`)
}

export async function removeChild(formData: FormData) {
  const classId = text(formData, 'class_id', 64)
  const supabase = await createClient()
  await supabase.from('children').delete().eq('id', text(formData, 'id', 64))
  revalidatePath(`/ucitel/trieda/${classId}`)
}
