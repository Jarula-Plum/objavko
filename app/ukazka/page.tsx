import Link from 'next/link'
import Logo from '@/components/Logo'
import { Ukazka } from '@/components/Ukazka'

export const metadata = { title: 'Ukážka hier – Objavko' }

// Ukážkové hry bez prihlásenia, aby si pani učiteľka mohla Objavko vyskúšať pred registráciou
export default function UkazkaPage() {
  return (
    <div className="wrap">
      <header className="top">
        <Logo sub="Ukážka hier" />
        <Link href="/prihlasenie" className="ghost">Prihlásiť sa</Link>
      </header>
      <Ukazka />
    </div>
  )
}
