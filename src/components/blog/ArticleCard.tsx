'use client'

import { useRef, useState } from 'react'
import { useBlogStore } from '@/store/blog-store'
import type { BlogPost } from '@/data/posts'

export default function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const { navigate } = useBlogStore()
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 768) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -2
    const rotateY = ((x - centerX) / centerX) * 2

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) translateZ(6px)`
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)'
    }
  }

  return (
    <div className="card-stagger">
      <div
        ref={cardRef}
        onClick={() => navigate('article', post.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="cursor-pointer rounded-md overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: 'var(--card)',
          border: `1px solid ${hovered ? 'var(--morandi-cyan-light)' : 'var(--border)'}`,
          boxShadow: hovered
            ? '0 12px 40px -12px rgba(0,0,0,0.06), 0 4px 12px -4px rgba(123,158,147,0.08)'
            : '0 1px 3px rgba(0,0,0,0.02)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cover Image */}
        <div className="relative w-full h-44 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              filter: 'saturate(0.7) brightness(0.97)',
              opacity: 0,
              animation: 'ink-fade-in 0.8s ease forwards',
              animationDelay: `${index * 0.08}s`,
            }}
            draggable={false}
          />
          {/* Category badge */}
          <span
            className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-sm font-serif-literary"
            style={{
              backgroundColor: 'var(--muted)',
              color: 'var(--morandi-cyan)',
              border: '1px solid var(--border)',
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-serif-literary text-base mb-2 leading-relaxed transition-colors duration-500"
            style={{ color: hovered ? 'var(--morandi-cyan-dark)' : 'var(--foreground)' }}
          >
            {post.title}
          </h3>

          <p
            className="text-xs mb-3 font-serif-literary"
            style={{ color: 'var(--morandi-faded)' }}
          >
            {post.date}
          </p>

          <p
            className="text-sm leading-relaxed mb-3 font-serif-literary line-clamp-2"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-sm font-serif-literary"
                style={{
                  color: 'var(--morandi-faded)',
                  backgroundColor: 'var(--muted)',
                  border: '1px solid transparent',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
