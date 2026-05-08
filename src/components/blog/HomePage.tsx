'use client'

import { useRef, useEffect, useState } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { posts, searchPosts } from '@/data/posts'
import ArticleCard from './ArticleCard'
import Sidebar from './Sidebar'

export default function HomePage() {
  const { searchQuery, isSearchOpen } = useBlogStore()
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle 2D parallax on hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8
      const y = (e.clientY / window.innerHeight - 0.5) * 5
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const displayPosts = isSearchOpen && searchQuery
    ? searchPosts(searchQuery)
    : posts

  return (
    <div style={{ animation: 'page-enter 0.6s ease-out' }}>
      {/* Hero Banner */}
      <div
        ref={heroRef}
        className="relative pt-32 md:pt-40 pb-20 md:pb-28 text-center"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="max-w-4xl mx-auto px-8">
          {/* Minimalist gradient */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'linear-gradient(180deg, var(--muted) 0%, transparent 100%)',
              opacity: 0.3,
            }}
          />
          
          <h1
            className="font-serif-literary text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wider"
            style={{ color: 'var(--foreground)' }}
          >
            墨<span style={{ color: 'var(--morandi-cyan)' }}>迹</span>
          </h1>
          
          <p
            className="font-serif-literary text-sm md:text-lg tracking-widest"
            style={{ color: 'var(--morandi-faded)' }}
          >
            在文字中寻找安静的力量
          </p>
        </div>
      </div>

      {/* Search results indicator */}
      {isSearchOpen && searchQuery && (
        <div className="max-w-6xl mx-auto px-8 mb-6">
          <p className="font-serif-literary text-sm" style={{ color: 'var(--morandi-faded)' }}>
            搜索 &ldquo;{searchQuery}&rdquo; — 找到 {displayPosts.length} 篇文章
          </p>
        </div>
      )}

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Article Cards - Asymmetric staggered grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
              {displayPosts.map((post, index) => (
                <ArticleCard key={post.id} post={post} index={index} />
              ))}
            </div>
            
            {displayPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
                  暂无匹配文章
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Hidden on mobile, shown on lg */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
