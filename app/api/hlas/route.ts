// Hlas Čarozvedka a Čarozvedky pre vety, ktoré nie sú nahraté: Microsoft Azure Speech (neurónové hlasy Lukáš a Viktória).
// Kľúč je v premenných prostredia na Verceli (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION), do prehliadača sa nedostane.
// Odpoveď si zapamätá prehliadač aj sieť Vercelu, takže každú vetu Azure prečíta len raz.
export const runtime = 'nodejs'

const HLAS = {
  chlapec: { name: 'sk-SK-LukasNeural', pitch: '+12%', rate: '-4%' },
  dievca: { name: 'sk-SK-ViktoriaNeural', pitch: '+8%', rate: '-4%' },
} as const

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET(req: Request) {
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION ?? 'westeurope'
  if (!key) return new Response('Hlas nie je nastavený', { status: 503 })
  const q = new URL(req.url).searchParams
  const text = (q.get('t') ?? '').trim()
  const who = q.get('w') === 'dievca' ? 'dievca' : 'chlapec'
  if (!text || text.length > 1500) return new Response('Zlý text', { status: 400 })
  const v = HLAS[who]
  // ' … ' (medzera, tri bodky, medzera) je zamlčaný obrázok v maľovanom čítaní: dve sekundy ticho, kým ho deti pomenujú
  const body = xml(text).replace(/ … /g, ' <break time="2000ms"/> ')
  const ssml = `<speak version="1.0" xml:lang="sk-SK"><voice name="${v.name}"><prosody pitch="${v.pitch}" rate="${v.rate}">${body}</prosody></voice></speak>`
  const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'objavko',
    },
    body: ssml,
  })
  // stav od Azure (401 zlý kľúč alebo región, 429 vyčerpaný limit) pomôže pri hľadaní chyby
  if (!r.ok) return new Response(`Azure neodpovedá: ${r.status} (${region})`, { status: 502 })
  return new Response(await r.arrayBuffer(), {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
    },
  })
}
