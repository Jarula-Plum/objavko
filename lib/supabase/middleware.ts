import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_KEY, SUPABASE_URL } from './config'

const PROTECTED = ['/ucitel', '/hraj']

const setupError = (detail: string) =>
  new NextResponse(
    `Objavko sa nevie pripojiť k databáze Supabase.\n\n${detail}\n\n` +
      'Skontroluj vo Verceli (Settings → Environment Variables) premenné NEXT_PUBLIC_SUPABASE_URL ' +
      '(adresa https://….supabase.co) a NEXT_PUBLIC_SUPABASE_ANON_KEY (publishable alebo anon kľúč) a daj Redeploy.',
    { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } },
  )

export async function updateSession(request: NextRequest) {
  const url = SUPABASE_URL
  const key = SUPABASE_KEY

  let response = NextResponse.next({ request })
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    })

    const { data } = await supabase.auth.getUser()
    const path = request.nextUrl.pathname
    if (!data.user && PROTECTED.some((p) => path.startsWith(p))) {
      const login = request.nextUrl.clone()
      login.pathname = '/prihlasenie'
      return NextResponse.redirect(login)
    }
    return response
  } catch (e) {
    console.error('Supabase middleware error', e)
    return setupError(`Chyba: ${e instanceof Error ? e.message : String(e)}`)
  }
}
