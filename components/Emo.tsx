import { Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import KEYS from '@/lib/emoji-keys.json'

// Emoji v textoch nahrádzame jednotnými obrázkami Fluent Emoji 3D (public/emoji, licencia MIT),
// aby vyzerali rovnako profesionálne na každom tablete a počítači.
const AVAILABLE = new Set<string>(KEYS)
const seg = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('sk', { granularity: 'grapheme' }) : null
const keyOf = (g: string) => [...g].map((c) => c.codePointAt(0)!.toString(16)).filter((h) => h !== 'fe0f').join('-')

function splitText(text: string): ReactNode {
  if (!seg) return text
  const out: ReactNode[] = []
  let buf = ''
  for (const { segment } of seg.segment(text)) {
    const k = keyOf(segment)
    if (AVAILABLE.has(k)) {
      if (buf) { out.push(buf); buf = '' }
      out.push(<img key={out.length} className="emo" src={`/emoji/${k}.webp`} alt={segment} draggable={false} />)
    } else buf += segment
  }
  if (!out.length) return text
  if (buf) out.push(buf)
  return out
}

export function emo(node: ReactNode): ReactNode {
  if (typeof node === 'string') return splitText(node)
  if (Array.isArray(node)) return node.map((c, k) => <Fragment key={k}>{emo(c)}</Fragment>)
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>
    if (el.props.children === undefined || typeof el.type !== 'string' && el.type !== Fragment) return el
    return cloneElement(el, undefined, emo(el.props.children))
  }
  return node
}

export const Emo = ({ children }: { children: ReactNode }) => <>{emo(children)}</>
