'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

const back = (mode: string, msg: string) =>
  redirect(`/prihlasenie?rezim=${mode}&chyba=${encodeURIComponent(msg)}`)

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  })
  if (error) {
    const notConfirmed = error.code === 'email_not_confirmed' || /not confirmed/i.test(error.message)
    back('prihlasenie', notConfirmed
      ? 'E-mail ešte nie je potvrdený. Klikni na odkaz v e-maile od Supabase (pozri aj spam).'
      : /invalid login credentials/i.test(error.message) ? 'Nesprávny e-mail alebo heslo.' : `Prihlásenie sa nepodarilo (${error.message}).`)
  }
  redirect('/ucitel')
}

export async function signUp(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  if (password.length < 8) back('registracia', 'Heslo musí mať aspoň 8 znakov.')
  const origin = (await headers()).get('origin') ?? ''
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: String(formData.get('email') ?? ''),
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  })
  if (error) {
    const exists = error.code === 'user_already_exists' || /already registered/i.test(error.message)
    back('registracia', exists
      ? 'Tento e-mail už má účet. Prihlás sa.'
      : `Registrácia sa nepodarila (${error.message}).`)
  }
  if (!data.session) redirect('/prihlasenie?rezim=prihlasenie&info=over-email')
  redirect('/ucitel')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
