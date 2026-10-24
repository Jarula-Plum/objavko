import type { MetadataRoute } from 'next'

// Objavko ako aplikácia na tablete: ikona na ploche, otvára sa na celú obrazovku
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Objavko – Čarové svetko',
    short_name: 'Objavko',
    description: 'Hravé učenie pre materské školy s Čarozvedkom a Čarozvedkou.',
    lang: 'sk',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#EAF6DF',
    theme_color: '#2E6B30',
    icons: [
      { src: '/ikona-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/ikona-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/ikona-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
