'use client'

import { useCallback, useEffect, useRef } from 'react'

const COLORS = [
  'var(--morandi-cyan)',
  'var(--morandi-sand)',
  'var(--morandi-mauve)',
  'var(--morandi-sage)',
  'var(--morandi-stone)',
  'var(--morandi-mist)',
]

const MAX_SPLASHES = 30

let nextId = 0

interface SplashDatum {
  id: number
  x: number
  y: number
  color: string
  size: number
  delay: number
  duration: number
}

export function spawnSplash(clientX: number, clientY: number): SplashDatum[] {
  const count = 2 + Math.floor(Math.random() * 3) // 2-4 blobs
  const splashes: SplashDatum[] = []
  for (let i = 0; i < count; i++) {
    splashes.push({
      id: nextId++,
      x: clientX + (Math.random() - 0.5) * 40,
      y: clientY + (Math.random() - 0.5) * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 40 + Math.random() * 80,
      delay: Math.random() * 0.12,
      duration: 1.1 + Math.random() * 0.7,
    })
  }
  return splashes
}

export default function ClickInkSplash() {
  const containerRef = useRef<HTMLDivElement>(null)
  const splashesRef = useRef<SplashDatum[]>([])

  const addSplashes = useCallback((newSplashes: SplashDatum[]) => {
    const container = containerRef.current
    if (!container) return

    splashesRef.current.push(...newSplashes)

    // Trim old ones if over limit
    while (splashesRef.current.length > MAX_SPLASHES) {
      const old = splashesRef.current.shift()!
      const el = container.querySelector(`[data-splash-id="${old.id}"]`)
      el?.remove()
    }

    for (const s of newSplashes) {
      const div = document.createElement('div')
      div.setAttribute('data-splash-id', String(s.id))
      div.className = 'click-ink-blob'
      div.style.cssText = `
        left: ${s.x}px;
        top: ${s.y}px;
        width: ${s.size}px;
        height: ${s.size}px;
        margin-left: -${s.size / 2}px;
        margin-top: -${s.size / 2}px;
        background: radial-gradient(circle at center, ${s.color} 0%, transparent 70%);
        --splash-duration: ${s.duration}s;
        --splash-delay: ${s.delay}s;
      `
      container.appendChild(div)

      // Remove after animation completes
      const totalMs = (s.delay + s.duration) * 1000 + 100
      setTimeout(() => {
        div.remove()
        splashesRef.current = splashesRef.current.filter(x => x.id !== s.id)
      }, totalMs)
    }
  }, [])

  // Expose globally so BlogLayout can call it
  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).__inkSplash = addSplashes
    return () => {
      delete (window as unknown as Record<string, unknown>).__inkSplash
    }
  }, [addSplashes])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden"
      aria-hidden="true"
    />
  )
}
