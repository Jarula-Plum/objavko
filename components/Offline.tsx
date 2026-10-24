'use client'

import { useEffect } from 'react'

// Zaregistruje service worker (public/sw.js), aby Objavko fungovalo aj pri slabom alebo žiadnom internete
export function Offline() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  }, [])
  return null
}
