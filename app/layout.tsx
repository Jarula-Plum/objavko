import type { Metadata } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import './globals.css'

const display = Baloo_2({ subsets: ['latin', 'latin-ext'], weight: ['600', '800'], variable: '--font-display' })
const body = Nunito({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '800'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Objavko',
  description: 'Hravé učenie pre materské školy: interaktívne hry podľa ŠVP a prehľad pokroku detí pre učiteľky.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${display.variable} ${body.variable}`}>
      <body>{children}<div id="print-sheet" aria-hidden="true" /></body>
    </html>
  )
}
