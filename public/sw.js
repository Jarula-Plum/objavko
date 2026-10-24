// Objavko bez internetu: obrázky, zvuky a časti aplikácie si tablet ukladá, keď ich raz použije.
// Stránky sa načítajú z internetu, a keď nie je, ukáže sa posledná uložená verzia.
const VERZIA = 'objavko-1'
const OBSAH = `${VERZIA}-obsah`
const STRANKY = `${VERZIA}-stranky`

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (!k.startsWith(VERZIA)) await caches.delete(k)
    await self.clients.claim()
  })())
})

// Veci, ktoré sa nemenia: uložíme pri prvom použití a potom berieme z tabletu
const stale = (url) =>
  url.origin === self.location.origin && (
    url.pathname.startsWith('/_next/static/') ||
    /^\/(obrazky|emoji|ikony|omalovanky|skriatok|sprievodca|hlas|ui)\//.test(url.pathname) ||
    url.pathname.startsWith('/api/hlas') ||
    /\.(webp|png|jpg|svg|mp3|mp4|webm|woff2)$/.test(url.pathname))

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (stale(url)) {
    e.respondWith((async () => {
      const c = await caches.open(OBSAH)
      const hit = await c.match(req)
      if (hit) return hit
      const res = await fetch(req)
      if (res.ok && res.status === 200) c.put(req, res.clone())
      return res
    })())
    return
  }
  // Stránky aplikácie: najprv internet, bez neho uložená verzia
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(STRANKY)
      try {
        const res = await fetch(req)
        if (res.ok) c.put(req, res.clone())
        return res
      } catch {
        return (await c.match(req)) || (await c.match('/')) || Response.error()
      }
    })())
  }
})
