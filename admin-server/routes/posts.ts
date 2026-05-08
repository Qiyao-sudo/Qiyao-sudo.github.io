import { Hono } from 'hono'
import { loadPosts, savePosts, generateToc, type BlogPost } from '../lib/fs-posts'

const postsRouter = new Hono()

// GET /api/posts — list all
postsRouter.get('/', (c) => {
  const posts = loadPosts()
  return c.json(posts)
})

// POST /api/posts — create new
postsRouter.post('/', async (c) => {
  const body = await c.req.json<Partial<BlogPost>>()
  const posts = loadPosts()

  const id = (body.title || 'new-post')
    .replace(/[^\w一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    + '-' + Date.now().toString(36)

  const newPost: BlogPost = {
    id,
    title: body.title || '',
    excerpt: body.excerpt || '',
    content: body.content || '',
    coverImage: body.coverImage || '/covers/default.svg',
    date: body.date || new Date().toISOString().slice(0, 10),
    category: body.category || '随笔',
    categoryNote: body.categoryNote || '',
    tags: body.tags || [],
    author: body.author || '清河',
    toc: generateToc(body.content || ''),
  }

  posts.unshift(newPost)
  savePosts(posts)
  return c.json(newPost, 201)
})

// GET /api/posts/:id — get one
postsRouter.get('/:id', (c) => {
  const posts = loadPosts()
  const post = posts.find(p => p.id === c.req.param('id'))
  if (!post) return c.json({ error: 'Not found' }, 404)
  return c.json(post)
})

// PUT /api/posts/:id — update
postsRouter.put('/:id', async (c) => {
  const body = await c.req.json<Partial<BlogPost>>()
  const posts = loadPosts()
  const index = posts.findIndex(p => p.id === c.req.param('id'))
  if (index === -1) return c.json({ error: 'Not found' }, 404)

  const updated = {
    ...posts[index],
    ...body,
    toc: body.content ? generateToc(body.content) : posts[index].toc,
  }
  posts[index] = updated
  savePosts(posts)
  return c.json(updated)
})

// DELETE /api/posts/:id — delete
postsRouter.delete('/:id', (c) => {
  const posts = loadPosts()
  const filtered = posts.filter(p => p.id !== c.req.param('id'))
  if (filtered.length === posts.length) return c.json({ error: 'Not found' }, 404)
  savePosts(filtered)
  return c.json({ ok: true })
})

export default postsRouter
