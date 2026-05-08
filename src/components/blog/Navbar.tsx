'use client'

import { useState, useEffect, useRef } from 'react'
import { useBlogStore } from '@/store/blog-store'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { key: 'home' as const, label: '首页' },
  { key: 'categories' as const, label: '分类' },
  { key: 'tags' as const, label: '标签' },
  { key: 'archive' as const, label: '归档' },
  { key: 'about' as const, label: '关于' },
]

export default function Navbar() {
  const { currentPage, navigate, isSearchOpen, toggleSearch, closeSearch, searchQuery, setSearchQuery } = useBlogStore()
  const [scrolled, setScrolled] = useState(false)
  const [navbarScale, setNavbarScale] = useState(1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      
      // Subtle 2D scale on scroll
      const delta = Math.abs(currentY - lastScrollY.current)
      const scaleDelta = Math.min(delta * 0.00005, 0.003)
      setNavbarScale(currentY > lastScrollY.current ? 1 - scaleDelta : 1 + scaleDelta)
      lastScrollY.current = currentY
      
      // Reset scale after scroll stops
      setTimeout(() => setNavbarScale(1), 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: `scale(${navbarScale})`,
        backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid var(--navbar-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
        {/* Logo / Site Name */}
        <button
          onClick={() => navigate('home')}
          className="font-serif-literary text-lg tracking-wider hover:opacity-70 transition-opacity duration-500"
          style={{ color: 'var(--morandi-ink)' }}
        >
          墨<span className="text-[var(--morandi-cyan)]">迹</span>
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className="font-serif-literary text-sm tracking-widest transition-all duration-500 relative py-1"
              style={{
                color: currentPage === item.key ? 'var(--morandi-cyan)' : 'var(--morandi-faded)',
              }}
            >
              {item.label}
              {currentPage === item.key && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px]"
                  style={{ backgroundColor: 'var(--morandi-cyan)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex items-center">
            <button
              onClick={toggleSearch}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--muted)] transition-colors duration-500"
              aria-label="搜索"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--morandi-faded)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            
            {/* Expandable search input */}
            <div
              className="absolute right-10 top-1/2 -translate-y-1/2 overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: isSearchOpen ? '220px' : '0px',
                opacity: isSearchOpen ? 1 : 0,
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文章..."
                className="w-full h-8 px-3 rounded-full text-sm font-serif-literary outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') closeSearch()
                }}
              />
            </div>
          </div>

          <ThemeToggle />

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <MobileMenu currentPage={currentPage} navigate={navigate} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ currentPage, navigate }: { currentPage: string; navigate: (page: any) => void }) {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex flex-col items-center justify-center gap-1"
        aria-label="菜单"
      >
        <span className="w-4 h-[1px] transition-all duration-300" style={{ backgroundColor: 'var(--morandi-faded)', transform: open ? 'rotate(45deg) translateY(3px)' : 'none' }} />
        <span className="w-4 h-[1px] transition-all duration-300" style={{ backgroundColor: 'var(--morandi-faded)', opacity: open ? 0 : 1 }} />
        <span className="w-4 h-[1px] transition-all duration-300" style={{ backgroundColor: 'var(--morandi-faded)', transform: open ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
      </button>
      
      {open && (
        <div
          className="fixed inset-0 top-14 z-40 flex flex-col items-center pt-12 gap-6"
          style={{ backgroundColor: 'var(--navbar-mobile-bg)', backdropFilter: 'blur(20px)' }}
          onClick={() => setOpen(false)}
        >
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { navigate(item.key); setOpen(false) }}
              className="font-serif-literary text-base tracking-widest transition-colors duration-500"
              style={{ color: currentPage === item.key ? 'var(--morandi-cyan)' : 'var(--morandi-faded)' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
