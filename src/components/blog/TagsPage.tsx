'use client'

import { useBlogStore } from '@/store/blog-store'
import { tags, getPostsByTag } from '@/data/posts'

export default function TagsPage() {
  const { navigate } = useBlogStore()

  // Max count for sizing
  const maxCount = Math.max(...tags.map(t => t.count))
  const minCount = Math.min(...tags.map(t => t.count))

  return (
    <div className="max-w-4xl mx-auto px-8 pt-28 pb-16" style={{ animation: 'page-enter 0.6s ease-out' }}>
      <h1 className="font-serif-literary text-2xl md:text-3xl mb-2" style={{ color: 'var(--foreground)' }}>
        标签
      </h1>
      <p className="font-serif-literary text-sm mb-12" style={{ color: 'var(--morandi-faded)' }}>
        记忆的碎片
      </p>

      {/* Tag cloud - irregular, scattered layout */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 py-8 justify-center">
        {tags.map((tag, idx) => {
          // Size variation based on count
          const sizeRatio = (tag.count - minCount) / (maxCount - minCount || 1)
          const fontSize = 0.75 + sizeRatio * 0.6 // 0.75rem to 1.35rem
          // Irregular vertical offset for scattered look
          const offsetY = [0, -4, 2, -2, 6, -6, 3, -3, 5, -1, 4, -5, 1, -4, 7][idx % 15]
          // Single-color depth differentiation (darker = more frequent)
          const opacity = 0.4 + sizeRatio * 0.5

          return (
            <button
              key={tag.name}
              onClick={() => {
                const tagPosts = getPostsByTag(tag.name)
                if (tagPosts.length > 0) {
                  navigate('article', tagPosts[0].id)
                }
              }}
              className="font-serif-literary transition-all duration-500 hover-3d-tilt inline-block"
              style={{
                fontSize: `${fontSize}rem`,
                color: 'var(--morandi-cyan)',
                opacity,
                transform: `translateY(${offsetY}px)`,
              }}
            >
              {tag.name}
            </button>
          )
        })}
      </div>

      {/* Tag detail list */}
      <div className="mt-12 space-y-6">
        {tags.map(tag => {
          const tagPosts = getPostsByTag(tag.name)
          if (tagPosts.length === 0) return null

          return (
            <div key={tag.name} style={{ borderBottom: '1px solid var(--morandi-divider)' }} className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif-literary text-sm" style={{ color: 'var(--morandi-cyan)' }}>
                  {tag.name}
                </span>
                <span className="text-xs font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
                  {tag.count} 篇
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pl-3">
                {tagPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => navigate('article', post.id)}
                    className="text-xs font-serif-literary transition-colors duration-500 hover:text-[var(--morandi-cyan)]"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {post.title}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
