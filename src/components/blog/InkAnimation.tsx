'use client'

import { useEffect, useRef, useState } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { siteConfig } from '@/lib/site-config'

declare global {
  interface Window {
    __inkAnimationStatus?: 'running' | 'done'
  }
}

const PROGRESS_DURATION = 2200
const TITLE_DELAY = 2400
const FADEOUT_DELAY = 3400
const DONE_DELAY = 4200

export default function InkAnimation() {
  const { isInkAnimationDone, setInkAnimationDone } = useBlogStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'blobs' | 'title' | 'fadeout' | 'done'>('blobs')
  const [progress, setProgress] = useState(0)
  const [shouldPlay, setShouldPlay] = useState(false)

  // Coordinate with inline animation (layout.tsx) or play fallback
  useEffect(() => {
    if (isInkAnimationDone) return

    const status = window.__inkAnimationStatus
    const overlay = document.getElementById('__ink-overlay')

    if (status === 'done') {
      setInkAnimationDone()
      return
    }

    if (status === 'running' && overlay) {
      const check = setInterval(() => {
        if (!document.getElementById('__ink-overlay')) {
          clearInterval(check)
          setInkAnimationDone()
        }
      }, 200)

      const safety = setTimeout(() => {
        clearInterval(check)
        setInkAnimationDone()
      }, DONE_DELAY + 3000)

      return () => { clearInterval(check); clearTimeout(safety) }
    }

    // No inline animation — play React fallback
    setShouldPlay(true)
  }, [isInkAnimationDone, setInkAnimationDone])

  // Fallback: progress bar animation
  useEffect(() => {
    if (!shouldPlay || isInkAnimationDone) return

    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const pct = Math.min(((now - start) / PROGRESS_DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shouldPlay, isInkAnimationDone])

  // Fallback: phase transitions
  useEffect(() => {
    if (!shouldPlay || isInkAnimationDone) return

    const t1 = setTimeout(() => setPhase('title'), TITLE_DELAY)
    const t2 = setTimeout(() => setPhase('fadeout'), FADEOUT_DELAY)
    const t3 = setTimeout(() => {
      setPhase('done')
      setInkAnimationDone()
    }, DONE_DELAY)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [shouldPlay, isInkAnimationDone, setInkAnimationDone])

  if (isInkAnimationDone || phase === 'done' || !shouldPlay) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--background)',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 1s ease-out' : 'none',
        pointerEvents: phase === 'done' ? 'none' : 'auto',
      }}
    >
      {/* Ink blobs - 3D layered depth */}
      <div className="absolute inset-0" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        {/* Back layer */}
        <div
          className="ink-blob absolute rounded-full"
          style={{
            width: '340px', height: '340px', top: '18%', left: '12%',
            background: 'radial-gradient(ellipse, rgba(123,158,147,0.35) 0%, rgba(123,158,147,0.08) 55%, transparent 80%)',
            animation: 'ink-blob-1 2.8s ease-out forwards',
            transform: 'translateZ(-30px)', filter: 'blur(6px)',
          }}
        />
        <div
          className="ink-blob absolute rounded-full"
          style={{
            width: '280px', height: '280px', top: '38%', right: '15%',
            background: 'radial-gradient(ellipse, rgba(196,183,166,0.3) 0%, rgba(196,183,166,0.06) 55%, transparent 80%)',
            animation: 'ink-blob-2 2.6s ease-out forwards', animationDelay: '0.2s',
            transform: 'translateZ(-20px)', filter: 'blur(5px)',
          }}
        />
        {/* Middle layer */}
        <div
          className="ink-blob absolute rounded-full"
          style={{
            width: '240px', height: '240px', top: '28%', left: '38%',
            background: 'radial-gradient(ellipse, rgba(143,181,169,0.4) 0%, rgba(143,181,169,0.08) 50%, transparent 75%)',
            animation: 'ink-blob-3 2.4s ease-out forwards', animationDelay: '0.4s',
            transform: 'translateZ(0px)', filter: 'blur(4px)',
          }}
        />
        <div
          className="ink-blob absolute rounded-full"
          style={{
            width: '200px', height: '200px', bottom: '22%', left: '22%',
            background: 'radial-gradient(ellipse, rgba(184,169,160,0.32) 0%, rgba(184,169,160,0.06) 50%, transparent 75%)',
            animation: 'ink-blob-4 2.5s ease-out forwards', animationDelay: '0.5s',
            transform: 'translateZ(10px)', filter: 'blur(4px)',
          }}
        />
        {/* Front layer */}
        <div
          className="ink-blob absolute rounded-full"
          style={{
            width: '180px', height: '180px', top: '50%', left: '50%', marginLeft: '-90px', marginTop: '-90px',
            background: 'radial-gradient(ellipse, rgba(156,175,150,0.35) 0%, rgba(156,175,150,0.06) 45%, transparent 70%)',
            animation: 'ink-blob-5 2.2s ease-out forwards', animationDelay: '0.3s',
            transform: 'translateZ(20px)', filter: 'blur(3px)',
          }}
        />
      </div>

      {/* Color wash accents */}
      <div
        className="absolute rounded-full"
        style={{
          width: '140px', height: '90px', top: '32%', left: '52%',
          background: 'radial-gradient(ellipse, rgba(156,175,150,0.18) 0%, transparent 70%)',
          animation: 'ink-blob-1 3s ease-out forwards', animationDelay: '0.6s', filter: 'blur(8px)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '120px', height: '80px', bottom: '28%', right: '28%',
          background: 'radial-gradient(ellipse, rgba(184,169,160,0.15) 0%, transparent 70%)',
          animation: 'ink-blob-2 3.2s ease-out forwards', animationDelay: '0.8s', filter: 'blur(6px)',
        }}
      />

      {/* Ink progress bar — watercolor bleeding */}
      <div
        className="ink-progress-container"
        style={{
          opacity: phase === 'blobs' ? 1 : phase === 'title' ? 0.5 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
      >
        <div className="ink-progress-track">
          <div className="ink-progress-fill" style={{ width: `${progress}%` }}>
            <div className="ink-progress-tip" />
            <div className="ink-progress-bleed" />
          </div>
        </div>
      </div>

      {/* Website title — appears after progress completes */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: phase === 'title' || phase === 'fadeout' ? 1 : 0,
          transform: phase === 'title' ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        <h1
          className="font-serif-literary text-4xl md:text-5xl tracking-[0.3em] mb-3"
          style={{ color: 'var(--morandi-ink)' }}
        >
          {siteConfig.blogName}
        </h1>
        <p
          className="font-serif-literary text-sm md:text-base tracking-[0.4em]"
          style={{ color: 'var(--morandi-faded)' }}
        >
          {siteConfig.blogSubtitle}
        </p>
      </div>
    </div>
  )
}
