import postsData from './posts.json'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  category: string
  categoryNote: string
  tags: string[]
  author: string
  toc: { id: string; title: string; level: number }[]
}

const categoryNotes: Record<string, string> = {
  '随笔': '文字是时间的回声',
  '技术': '代码与诗的交汇',
  '读书': '与纸页的缓慢对话',
  '生活': '日常里的细碎光亮',
}

export const posts: BlogPost[] = postsData as BlogPost[]

export const categories = (() => {
  const countMap: Record<string, number> = {}
  posts.forEach(p => {
    countMap[p.category] = (countMap[p.category] || 0) + 1
  })
  return Object.entries(countMap)
    .map(([name, count]) => ({ name, note: categoryNotes[name] || '', count }))
})()

export const tags = (() => {
  const countMap: Record<string, number> = {}
  posts.forEach(p => {
    p.tags.forEach(t => {
      countMap[t] = (countMap[t] || 0) + 1
    })
  })
  return Object.entries(countMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})()

export function getPostById(id: string): BlogPost | undefined {
  return posts.find(p => p.id === id)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(p => p.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
  return posts.filter(p => p.tags.includes(tag))
}

export function getArchivedPosts(): Record<string, Record<string, BlogPost[]>> {
  const archive: Record<string, Record<string, BlogPost[]>> = {}
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString()
    const month = (new Date(post.date).getMonth() + 1).toString().padStart(2, '0')
    if (!archive[year]) archive[year] = {}
    if (!archive[year][month]) archive[year][month] = []
    archive[year][month].push(post)
  })
  return archive
}

export function searchPosts(query: string): BlogPost[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  )
}
