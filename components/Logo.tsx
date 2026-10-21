import Link from 'next/link'

export default function Logo({ sub }: { sub?: string }) {
  return (
    <Link href="/" className="brand">
      <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
        <path d="M27 27l10 10" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="18" cy="18" r="14" fill="var(--sun)" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="13" cy="13" r="4" fill="var(--surface)" />
      </svg>
      <div>
        <h1>Objavko</h1>
        {sub && <span className="label">{sub}</span>}
      </div>
    </Link>
  )
}
