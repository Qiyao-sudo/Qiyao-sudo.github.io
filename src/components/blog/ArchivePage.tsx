'use client'

import { useState } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { getArchivedPosts } from '@/data/posts'

export default function ArchivePage() {
  const { navigate } = useBlogStore()
  const archive = getArchivedPosts()
  const [expandedYear, setExpandedYear] = useState<string | null>(null)
  const [mouseX, setMouseX] = useState(0)

  const toggleYear = (year: string) => {
    setExpandedYear(prev => prev === year ? null : year)
  }

  // Timeline wave based on mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    setMouseX(x)
  }

  return (
    <div
      className="max-w-4xl mx-auto px-8 pt-28 pb-16"
      style={{ animation: 'page-enter 0.6s ease-out' }}
      onMouseMove={handleMouseMove}
    >
      <h1 className="font-serif-literary text-2xl md:text-3xl mb-2" style={{ color: 'var(--foreground)' }}>
        归档
      </h1>
      <p className="font-serif-literary text-sm mb-12" style={{ color: 'var(--morandi-faded)' }}>
        时间的刻度
      </p>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-[3px] top-0 bottom-0 w-[1px] transition-transform duration-300"
          style={{
            backgroundColor: 'var(--morandi-divider)',
            transform: `scaleY(${1 + mouseX * 0.02})`,
            transformOrigin: 'top',
          }}
        />

        {Object.entries(archive)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, months]) => {
            const isExpanded = expandedYear === year
            const totalPosts = Object.values(months).flat().length

            return (
              <div key={year} className="mb-8 relative">
                {/* Year node on timeline */}
                <div
                  className="absolute left-[-29px] top-1 w-[7px] h-[7px] rounded-full"
                  style={{
                    backgroundColor: isExpanded ? 'var(--morandi-cyan)' : 'var(--morandi-divider)',
                    transition: 'background-color 0.5s ease',
                  }}
                />

                {/* Year header */}
                <button
                  onClick={() => toggleYear(year)}
                  className="flex items-center gap-3 mb-3 group"
                >
                  <span
                    className="font-serif-literary text-lg transition-colors duration-500"
                    style={{ color: isExpanded ? 'var(--morandi-cyan)' : 'var(--foreground)' }}
                  >
                    {year}
                  </span>
                  <span className="text-xs font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
                    {totalPosts} 篇
                  </span>
                  <svg
                    width="10"
                    height="10"
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
                </button>

                {/* Expanded months and posts */}
                <div
                  className="overflow-hidden transition-all duration-700 ease-out"
                  style={{
                    maxHeight: isExpanded ? '1000px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  {Object.entries(months)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([month, monthPosts]) => (
                      <div key={month} className="mb-4 pl-4">
                        <p className="text-xs font-serif-literary mb-2" style={{ color: 'var(--morandi-faded)' }}>
                          {month}月
                        </p>
                        {monthPosts.map(post => (
                          <button
                            key={post.id}
                            onClick={() => navigate('article', post.id)}
                            className="block w-full text-left py-2 group transition-all duration-500"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="text-xs font-serif-literary flex-shrink-0"
                                style={{ color: 'var(--morandi-faded)', opacity: 0.5 }}
                              >
                                {post.date.slice(5)}
                              </span>
                              <span
                                className="font-serif-literary text-sm transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--morandi-cyan)]"
                                style={{ color: 'var(--foreground)' }}
                              >
                                {post.title}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
