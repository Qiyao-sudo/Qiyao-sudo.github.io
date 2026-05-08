import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const POSTS_PATH = resolve(import.meta.dir, '../../src/data/posts.json')

export interface TocItem { id: string; title: string; level: number }

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
  toc: TocItem[]
}

export function loadPosts(): BlogPost[] {
  return JSON.parse(readFileSync(POSTS_PATH, 'utf-8')) as BlogPost[]
}

export function savePosts(posts: BlogPost[]): void {
  writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2), 'utf-8')
}

export function generateToc(content: string): TocItem[] {
  const toc: TocItem[] = []
  for (const line of content.split('\n')) {
    const h2 = line.match(/^## (.+)/)
    const h3 = line.match(/^### (.+)/)
    if (h2) {
      const title = h2[1].trim()
      toc.push({ id: title, title, level: 2 })
    } else if (h3) {
      const title = h3[1].trim()
      toc.push({ id: title, title, level: 3 })
    }
  }
  return toc
}
