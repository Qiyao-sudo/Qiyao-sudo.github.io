'use client'

import { useEffect, useRef } from 'react'
import { useBlogStore } from '@/store/blog-store'

// Subtle 3D floating particles
function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: 'var(--morandi-cyan)',
        opacity: 0.15,
        animation: `particle-float ${6 + delay * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        filter: 'blur(1px)',
      }}
    />
  )
}

export default function NotFoundPage() {
  const { navigate } = useBlogStore()
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate subtle particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.8,
    x: 10 + (i * 7) % 80,
    y: 15 + (i * 11) % 70,
    size: 2 + (i % 3) * 1.5,
  }))

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
      style={{ animation: 'page-enter 0.6s ease-out' }}
    >
      {/* Subtle 3D particle background */}
      <div className="absolute inset-0" style={{ perspective: '600px', transformStyle: 'preserve-3d' }}>
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="relative z-10 text-center px-8">
        <h1
          className="font-serif-literary text-6xl mb-4"
          style={{ color: 'var(--morandi-faded)', opacity: 0.4 }}
        >
          404
        </h1>
        <p className="font-serif-literary text-sm mb-8" style={{ color: 'var(--morandi-faded)' }}>
          这页纸，似乎被风吹走了
        </p>
        <button
          onClick={() => navigate('home')}
          className="font-serif-literary text-sm transition-colors duration-500 hover:text-[var(--morandi-cyan)]"
          style={{ color: 'var(--morandi-faded)' }}
        >
          回到首页
        </button>
      </div>
    </div>
  )
}
