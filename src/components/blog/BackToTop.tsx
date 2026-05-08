'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-40 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: hovered ? 'perspective(400px) translateY(-3px) translateZ(4px)' : 'perspective(400px) translateY(0) translateZ(0)',
        border: '1px solid var(--morandi-divider)',
        backgroundColor: hovered ? 'var(--muted)' : 'transparent',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1), background-color 0.4s ease, border-color 0.4s ease',
      }}
      aria-label="回到顶部"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ color: 'var(--morandi-faded)' }}
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  )
}
