import { Hono } from 'hono'
import { resolve } from 'node:path'

const router = new Hono()

// Find git executable path
function gitPath(): string {
  // Bun.which searches PATH
  const found = Bun.which('git')
  if (found) return found
  // Fallback: common Windows git locations
  const candidates = [
    'C:\\Program Files\\Git\\bin\\git.exe',
    'C:\\Program Files (x86)\\Git\\bin\\git.exe',
    '/usr/bin/git',
    '/usr/local/bin/git',
  ]
  for (const c of candidates) {
    if (Bun.file(c).size !== undefined) return c
  }
  return 'git' // last resort
}

router.post('/push', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const message = body.message || '更新博客内容'

  try {
    const projectRoot = resolve(import.meta.dirname, '..', '..')
    const git = gitPath()

    const run = async (args: string[]) => {
      const proc = Bun.spawn([git, ...args], {
        cwd: projectRoot,
        stdout: 'pipe',
        stderr: 'pipe',
      })
      const out = await new Response(proc.stdout).text()
      const err = await new Response(proc.stderr).text()
      await proc.exited
      return { out, err, code: proc.exitCode }
    }

    // Stage changes
    let result = await run(['add', '-A'])
    if (result.code !== 0) {
      return c.json({ ok: false, error: 'git add 失败:\n' + (result.err || result.out) }, 500)
    }

    // Check if there are staged changes
    const diffResult = await run(['diff', '--cached', '--quiet'])
    if (diffResult.code === 0) {
      return c.json({ ok: false, error: '没有待提交的更改' }, 400)
    }

    // Commit
    result = await run(['commit', '-m', message])
    if (result.code !== 0) {
      return c.json({ ok: false, error: 'git commit 失败:\n' + (result.err || result.out) }, 500)
    }

    // Push
    result = await run(['push', 'origin', 'main'])
    if (result.code !== 0) {
      return c.json({ ok: false, error: 'git push 失败:\n' + (result.err || result.out) }, 500)
    }

    const hashResult = await run(['rev-parse', '--short', 'HEAD'])
    const commitHash = hashResult.out.trim()

    return c.json({ ok: true, message: `已推送到 origin/main (${commitHash})` })
  } catch (e: unknown) {
    const err = e as Error
    return c.json({ ok: false, error: err.message || '推送失败' }, 500)
  }
})

export default router
