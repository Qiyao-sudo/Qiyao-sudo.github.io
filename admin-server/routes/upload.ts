import { Hono } from 'hono'
import { resolve } from 'node:path'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

const uploadRouter = new Hono()

const PROJECT_ROOT = resolve(import.meta.dir, '../..')
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

uploadRouter.post('/', async (c) => {
  const formData = await c.req.formData()
  const file = formData.get('file') as File | null
  const type = (formData.get('type') as string) || 'body'

  if (!file) return c.json({ error: 'No file provided' }, 400)
  if (!ALLOWED_TYPES.includes(file.type)) return c.json({ error: 'File type not allowed' }, 400)
  if (file.size > MAX_SIZE) return c.json({ error: 'File too large (max 5MB)' }, 400)

  const ext = file.name.split('.').pop() || 'png'
  const filename = type === 'cover'
    ? `cover-${randomUUID().slice(0, 8)}.${ext}`
    : `${randomUUID().slice(0, 8)}.${ext}`

  const subdir = type === 'cover' ? 'covers' : 'uploads'
  const targetDir = resolve(PROJECT_ROOT, 'public', subdir)
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })

  const arrayBuffer = await file.arrayBuffer()
  writeFileSync(resolve(targetDir, filename), Buffer.from(arrayBuffer))

  const url = `/${subdir}/${filename}`
  return c.json({ url })
})

export default uploadRouter
