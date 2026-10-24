import type { Metadata } from 'next'
import { Baloo_2, Lobster, Nunito } from 'next/font/google'
import './globals.css'
import { PlynulyPosun } from '@/components/Posun'
import { Offline } from '@/components/Offline'

const display = Baloo_2({ subsets: ['latin', 'latin-ext'], weight: ['600', '800'], variable: '--font-display' })
const body = Nunito({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '800'], variable: '--font-body' })
const fairy = Lobster({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-fairy' })

export const metadata: Metadata = {
  title: 'Objavko',
  description: 'Hravé učenie pre materské školy: interaktívne hry podľa ŠVP a prehľad pokroku detí pre učiteľky.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${display.variable} ${body.variable} ${fairy.variable}`}>
      <body><Offline /><PlynulyPosun />{children}<div id="print-sheet" aria-hidden="true" /></body>
    </html>
  )
}
