'use client'

import { useBlogStore } from '@/store/blog-store'
import { posts, categories, tags as allTags } from '@/data/posts'
import { siteConfig } from '@/lib/site-config'

export default function Sidebar() {
  const { navigate } = useBlogStore()

  return (
    <aside className="space-y-8">
      {/* Profile */}
      <div
        className="p-5 rounded-md transition-all duration-500"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          animation: 'sidebar-float 6s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-serif-literary text-xl flex-shrink-0"
            style={{
              backgroundColor: 'var(--muted)',
              color: 'var(--morandi-cyan)',
              border: '1px solid var(--border)',
            }}
          >
            {siteConfig.author.avatarText}
          </div>
          <div>
            <h4 className="font-serif-literary text-sm" style={{ color: 'var(--foreground)' }}>{siteConfig.author.name}</h4>
            <p className="text-xs font-serif-literary mt-0.5" style={{ color: 'var(--morandi-faded)' }}>{siteConfig.author.tagline}</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed font-serif-literary" style={{ color: 'var(--muted-foreground)' }}>
          {siteConfig.author.shortBio}
        </p>
      </div>

      {/* Featured Posts */}
      <div
        className="p-5 rounded-md transition-all duration-500"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          animation: 'sidebar-float 7s ease-in-out infinite',
          animationDelay: '1s',
        }}
      >
        <h4 className="font-serif-literary text-sm mb-4" style={{ color: 'var(--morandi-cyan)' }}>
          精选文章
        </h4>
        <div className="space-y-3">
          {posts.slice(0, 4).map(post => (
            <button
              key={post.id}
              onClick={() => navigate('article', post.id)}
              className="block w-full text-left group"
            >
              <p className="text-xs font-serif-literary transition-colors duration-500 group-hover:text-[var(--morandi-cyan)] leading-relaxed" style={{ color: 'var(--foreground)' }}>
                {post.title}
              </p>
              <p className="text-[10px] font-serif-literary mt-1" style={{ color: 'var(--morandi-faded)' }}>
                {post.date} · {post.category}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        className="p-5 rounded-md transition-all duration-500"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          animation: 'sidebar-float 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      >
        <h4 className="font-serif-literary text-sm mb-4" style={{ color: 'var(--morandi-cyan)' }}>
          分类
        </h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => navigate('categories')}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-xs font-serif-literary transition-colors duration-500 group-hover:text-[var(--morandi-cyan)]" style={{ color: 'var(--foreground)' }}>
                {cat.name}
              </span>
              <span className="text-[10px] font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tag Cloud */}
      <div
        className="p-5 rounded-md transition-all duration-500"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          animation: 'sidebar-float 8s ease-in-out infinite',
          animationDelay: '3s',
        }}
      >
        <h4 className="font-serif-literary text-sm mb-4" style={{ color: 'var(--morandi-cyan)' }}>
          标签
        </h4>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 10).map((tag, i) => (
            <button
              key={tag.name}
              onClick={() => navigate('tags')}
              className="font-serif-literary transition-all duration-500 hover-3d-tilt"
              style={{
                fontSize: `${0.65 + tag.count * 0.03}rem`,
                color: i % 2 === 0 ? 'var(--morandi-faded)' : 'var(--morandi-cyan)',
                opacity: 0.6 + tag.count * 0.08,
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
