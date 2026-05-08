'use client'

import { useState, useEffect, useRef } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { getPostById, posts } from '@/data/posts'
import { siteConfig } from '@/lib/site-config'
import ReactMarkdown from 'react-markdown'

function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    const code = codeRef.current?.textContent || ''
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div
      className="relative my-6 rounded-md overflow-hidden transition-transform duration-500"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        transform: hovered ? 'scale(1.008)' : 'scale(1)',
        transformOrigin: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {className && (
        <div
          className="px-4 py-1.5 text-xs font-serif-literary flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border)', color: 'var(--morandi-faded)' }}
        >
          <span>{className.replace('language-', '')}</span>
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-0.5 rounded transition-colors duration-300"
            style={{
              color: copied ? 'var(--morandi-cyan)' : 'var(--morandi-faded)',
              border: '1px solid var(--border)',
            }}
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      )}
      {!className && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded transition-all duration-300 opacity-0 hover:opacity-100"
          style={{
            color: 'var(--morandi-faded)',
            backgroundColor: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
        >
          {copied ? '已复制' : '复制'}
        </button>
      )}
      <pre
        ref={codeRef}
        className="p-4 overflow-x-auto text-sm leading-relaxed custom-scrollbar"
        style={{ color: 'var(--foreground)', tabSize: 2 }}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

function TableOfContents({ toc }: { toc: { id: string; title: string; level: number }[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map(t => document.getElementById(t.id)).filter(Boolean)
      let current = ''
      for (const heading of headings) {
        if (heading && heading.getBoundingClientRect().top <= 120) {
          current = heading.id
        }
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="w-44 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20 space-y-1 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar pr-2">
        <p className="text-xs font-serif-literary mb-3" style={{ color: 'var(--morandi-faded)' }}>
          目录
        </p>
        {toc.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="block w-full text-left text-xs font-serif-literary py-1.5 transition-all duration-500 relative"
            style={{
              color: activeId === item.id ? 'var(--morandi-cyan)' : 'var(--morandi-faded)',
              paddingLeft: item.level === 3 ? '1rem' : '0.375rem',
              transform: activeId === item.id ? 'perspective(400px) translateZ(3px)' : 'none',
            }}
          >
            {activeId === item.id && (
              <span
                className="absolute left-0 top-0 bottom-0 w-[1.5px]"
                style={{ backgroundColor: 'var(--morandi-cyan)' }}
              />
            )}
            {item.title}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default function ArticlePage() {
  const { currentArticleId, navigate } = useBlogStore()
  const post = getPostById(currentArticleId || '')

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-32 text-center">
        <p className="font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
          文章未找到
        </p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 font-serif-literary text-sm hover:text-[var(--morandi-cyan)] transition-colors duration-500"
          style={{ color: 'var(--morandi-faded)' }}
        >
          返回首页
        </button>
      </div>
    )
  }

  const currentIndex = posts.findIndex(p => p.id === post.id)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  return (
    <div style={{ animation: 'page-enter 0.6s ease-out' }}>
      {/* Article header */}
      <div className="pt-28 pb-10 max-w-4xl mx-auto px-8">
        <h1
          className="font-serif-literary text-2xl md:text-3xl lg:text-4xl mb-4 leading-relaxed"
          style={{ color: 'var(--foreground)' }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-serif-literary" style={{ color: 'var(--morandi-faded)' }}>
          <span>{post.date}</span>
          <span style={{ color: 'var(--morandi-divider)' }}>·</span>
          <span>{post.category}</span>
          <span style={{ color: 'var(--morandi-divider)' }}>·</span>
          <span>{post.tags.join(' / ')}</span>
        </div>
      </div>

      {/* Content with TOC */}
      <div className="max-w-6xl mx-auto px-8 flex gap-10 xl:gap-12">
        {/* TOC - left side, sticky */}
        <TableOfContents toc={post.toc} />

        {/* Article body */}
        <article
          className="flex-1 max-w-3xl article-content font-serif-literary"
          style={{
            color: 'var(--foreground)',
            transformStyle: 'preserve-3d',
            perspective: '1500px',
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => {
                const text = String(children)
                return <h1 id={text}>{children}</h1>
              },
              h2: ({ children }) => {
                const text = String(children)
                return <h2 id={text}>{children}</h2>
              },
              h3: ({ children }) => {
                const text = String(children)
                return <h3 id={text}>{children}</h3>
              },
              code: ({ className, children, ...props }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: 'var(--muted)',
                        color: 'var(--morandi-cyan-dark)',
                        border: '1px solid var(--border)',
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  )
                }
                return (
                  <CodeBlock className={className}>
                    {children}
                  </CodeBlock>
                )
              },
              pre: ({ children }) => <>{children}</>,
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="max-w-full h-auto rounded my-6"
                  style={{
                    opacity: 0,
                    animation: 'ink-fade-in 0.8s ease forwards',
                  }}
                  draggable={false}
                />
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 pl-6 my-6 italic" style={{ borderColor: 'var(--morandi-cyan)', color: 'var(--morandi-faded)' }}>
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b transition-colors duration-300"
                  style={{ color: 'var(--morandi-cyan)', borderColor: 'var(--morandi-cyan-light)' }}
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>

          {/* Divider */}
          <div className="my-12" style={{ borderTop: '1px solid var(--morandi-divider)' }} />

          {/* Author card */}
          <div
            className="flex items-start gap-4 p-5 rounded-md transition-all duration-500"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-serif-literary text-sm flex-shrink-0"
              style={{
                backgroundColor: 'var(--muted)',
                color: 'var(--morandi-cyan)',
                border: '1px solid var(--border)',
              }}
            >
              {siteConfig.author.avatarText}
            </div>
            <div>
              <p className="font-serif-literary text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                {post.author}
              </p>
              <p className="text-xs font-serif-literary leading-relaxed" style={{ color: 'var(--morandi-faded)' }}>
                {siteConfig.author.articleFooterBio}
              </p>
            </div>
          </div>

          {/* Navigation between articles */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
            {prevPost ? (
              <button
                onClick={() => navigate('article', prevPost.id)}
                className="group text-left transition-all duration-500"
                style={{ color: 'var(--morandi-faded)' }}
              >
                <span className="text-xs font-serif-literary block mb-1">← 上一篇</span>
                <span className="text-sm font-serif-literary group-hover:translate-x-[-4px] inline-block transition-transform duration-500" style={{ color: 'var(--foreground)' }}>
                  {prevPost.title}
                </span>
              </button>
            ) : <div />}
            {nextPost ? (
              <button
                onClick={() => navigate('article', nextPost.id)}
                className="group text-right transition-all duration-500"
                style={{ color: 'var(--morandi-faded)' }}
              >
                <span className="text-xs font-serif-literary block mb-1">下一篇 →</span>
                <span className="text-sm font-serif-literary group-hover:translate-x-[4px] inline-block transition-transform duration-500" style={{ color: 'var(--foreground)' }}>
                  {nextPost.title}
                </span>
              </button>
            ) : <div />}
          </div>
        </article>
      </div>
    </div>
  )
}
