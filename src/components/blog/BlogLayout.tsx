'use client'

import { useEffect } from 'react'
import { useBlogStore } from '@/store/blog-store'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import InkAnimation from './InkAnimation'
import ClickInkSplash, { spawnSplash } from './ClickInkSplash'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('./HomePage'), { ssr: false })
const ArticlePage = dynamic(() => import('./ArticlePage'), { ssr: false })
const CategoriesPage = dynamic(() => import('./CategoriesPage'), { ssr: false })
const TagsPage = dynamic(() => import('./TagsPage'), { ssr: false })
const ArchivePage = dynamic(() => import('./ArchivePage'), { ssr: false })
const AboutPage = dynamic(() => import('./AboutPage'), { ssr: false })
const NotFoundPage = dynamic(() => import('./NotFoundPage'), { ssr: false })

export default function BlogLayout() {
  const { currentPage, isInkAnimationDone, initRouter } = useBlogStore()

  // Initialize routing from URL path on mount
  useEffect(() => {
    const cleanup = initRouter()
    return cleanup
  }, [initRouter])

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'article': return <ArticlePage />
      case 'categories': return <CategoriesPage />
      case 'tags': return <TagsPage />
      case 'archive': return <ArchivePage />
      case 'about': return <AboutPage />
      case 'notfound': return <NotFoundPage />
      default: return <HomePage />
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col scroll-smooth-slow custom-scrollbar relative"
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('a, button, input, [role="button"], nav')) return
        const splashFn = (window as unknown as Record<string, Function>).__inkSplash as ((s: ReturnType<typeof spawnSplash>) => void) | undefined
        splashFn?.(spawnSplash(e.clientX, e.clientY))
      }}
    >
      {/* Ink entrance animation */}
      <InkAnimation />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1" style={{
        opacity: isInkAnimationDone ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Back to top */}
      <BackToTop />

      {/* Click ink splash layer */}
      <ClickInkSplash />
    </div>
  )
}
