import { Hono } from 'hono'
import { loadSettings, saveSettings, type SiteConfig } from '../lib/fs-settings'

const settingsRouter = new Hono()

settingsRouter.get('/', (c) => {
  return c.json(loadSettings())
})

settingsRouter.put('/', async (c) => {
  const body = await c.req.json<SiteConfig>()
  saveSettings(body)
  return c.json({ ok: true })
})

export default settingsRouter
