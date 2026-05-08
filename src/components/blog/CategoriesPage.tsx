'use client'

import { useState } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { categories, getPostsByCategory } from '@/data/posts'

export default function CategoriesPage() {
  const { navigate } = useBlogStore()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (name: string) => {
    setExpandedCategory(prev => prev === name ? null : name)
  }

  return (
    <div className="max-w-4xl mx-auto px-8 pt-28 pb-16" style={{ animation: 'page-enter 0.6s ease-out' }}>
      <h1 className="font-serif-literary text-2xl md:text-3xl mb-2" style={{ color: 'var(--foreground)' }}>
        分类
      </h1>
      <p className="font-serif-literary text-sm mb-12" style={{ color: 'var(--morandi-faded)' }}>
        文字的归处
      </p>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const isExpanded = expandedCategory === cat.name
          const catPosts = getPostsByCategory(cat.name)

          return (
            <div
              key={cat.name}
              className="transition-all duration-500"
              style={{
                perspective: '800px',
                transformStyle: 'preserve-3d',
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.name)}
                className="w-full text-left group"
              >
                <div
                  className="flex items-center justify-between py-4 transition-all duration-500"
                  style={{
                    borderBottom: '1px solid var(--morandi-divider)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <h2
                      className="font-serif-literary text-base transition-colors duration-500"
                      style={{ color: isExpanded ? 'var(--morandi-cyan)' : 'var(--foreground)' }}
                    >
                      {cat.name}
                    </h2>
                    <span
                      className="text-xs font-serif-literary"
                      style={{ color: 'var(--morandi-faded)' }}
                    >
                      {cat.note}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
                      {cat.count} 篇
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="transition-transform duration-500"
                      style={{
                        color: 'var(--morandi-faded)',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded posts - 2D stretch transition */}
              <div
                className="overflow-hidden transition-all duration-700 ease-out"
                style={{
                  maxHeight: isExpanded ? '500px' : '0px',
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? 'perspective(800px) translateZ(5px)' : 'perspective(800px) translateZ(0)',
                }}
              >
                <div className="py-4 pl-4 space-y-3">
                  {catPosts.map((post, pIdx) => (
                    <button
                      key={post.id}
                      onClick={() => navigate('article', post.id)}
                      className="block w-full text-left group transition-all duration-500"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="flex items-center gap-3 py-2">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--morandi-cyan)', opacity: 0.5 }}
                        />
                        <span
                          className="font-serif-literary text-sm transition-colors duration-500 group-hover:text-[var(--morandi-cyan)]"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {post.title}
                        </span>
                        <span
                          className="text-xs font-serif-literary ml-auto flex-shrink-0"
                          style={{ color: 'var(--morandi-faded)' }}
                        >
                          {post.date}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
