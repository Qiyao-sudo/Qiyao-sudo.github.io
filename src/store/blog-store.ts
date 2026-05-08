import { create } from 'zustand'

export type PageType = 'home' | 'article' | 'categories' | 'tags' | 'archive' | 'about' | 'notfound'

interface BlogState {
  currentPage: PageType
  currentArticleId: string | null
  searchQuery: string
  isSearchOpen: boolean
  isInkAnimationDone: boolean
  sidebarOpen: boolean
  
  navigate: (page: PageType, articleId?: string) => void
  setSearchQuery: (query: string) => void
  toggleSearch: () => void
  closeSearch: () => void
  setInkAnimationDone: () => void
  toggleSidebar: () => void
  closeSidebar: () => void
  initFromHash: () => void
}

// Hash <-> State mapping utilities
function pageToHash(page: PageType, articleId?: string | null): string {
  switch (page) {
    case 'home': return '#/'
    case 'article': return articleId ? `#/article/${articleId}` : '#/'
    case 'categories': return '#/categories'
    case 'tags': return '#/tags'
    case 'archive': return '#/archive'
    case 'about': return '#/about'
    case 'notfound': return '#/404'
    default: return '#/'
  }
}

function hashToPage(hash: string): { page: PageType; articleId: string | null } {
  const path = hash.replace(/^#\/?/, '') // Remove leading #/ or #
  
  if (!path || path === '') {
    return { page: 'home', articleId: null }
  }
  
  if (path === 'categories') {
    return { page: 'categories', articleId: null }
  }
  if (path === 'tags') {
    return { page: 'tags', articleId: null }
  }
  if (path === 'archive') {
    return { page: 'archive', articleId: null }
  }
  if (path === 'about') {
    return { page: 'about', articleId: null }
  }
  if (path === '404') {
    return { page: 'notfound', articleId: null }
  }
  if (path.startsWith('article/')) {
    const articleId = path.replace('article/', '')
    return { page: 'article', articleId: articleId || null }
  }
  
  return { page: 'home', articleId: null }
}

export const useBlogStore = create<BlogState>((set, get) => ({
  currentPage: 'home',
  currentArticleId: null,
  searchQuery: '',
  isSearchOpen: false,
  isInkAnimationDone: false,
  sidebarOpen: false,
  
  navigate: (page, articleId) => {
    set({ 
      currentPage: page, 
      currentArticleId: articleId || null,
      isSearchOpen: false,
      searchQuery: '',
    })
    // Update URL hash
    const hash = pageToHash(page, articleId)
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  setInkAnimationDone: () => set({ isInkAnimationDone: true }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  
  // Initialize state from current URL hash
  initFromHash: () => {
    const { page, articleId } = hashToPage(window.location.hash)
    set({
      currentPage: page,
      currentArticleId: articleId,
    })
    
    // Listen for hash changes (browser back/forward)
    const handleHashChange = () => {
      const { page: newPage, articleId: newArticleId } = hashToPage(window.location.hash)
      const state = get()
      if (state.currentPage !== newPage || state.currentArticleId !== newArticleId) {
        set({
          currentPage: newPage,
          currentArticleId: newArticleId,
          isSearchOpen: false,
          searchQuery: '',
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  },
}))
