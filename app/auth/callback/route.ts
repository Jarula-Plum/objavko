import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Potvrdenie e-mailu po registrácii
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}/ucitel`)
  }
  return NextResponse.redirect(`${origin}/prihlasenie?chyba=${encodeURIComponent('Odkaz už neplatí, prihlás sa znova.')}`)
}
