import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import postsRouter from './routes/posts'
import settingsRouter from './routes/settings'
import uploadRouter from './routes/upload'
import gitRouter from './routes/git'

const app = new Hono()

// API routes
app.route('/api/posts', postsRouter)
app.route('/api/settings', settingsRouter)
app.route('/api/upload', uploadRouter)
app.route('/api/git', gitRouter)

// Admin SPA
app.get('/', (c) => c.html(adminHTML))
app.get('/admin', (c) => c.html(adminHTML))

// Serve uploaded files from the blog's public dir
app.use('/uploads/*', serveStatic({ root: '../public' }))
app.use('/covers/*', serveStatic({ root: '../public' }))

// Serve EasyMDE static files from node_modules
app.get('/easymde/*', async (c) => {
  const path = c.req.path.replace('/easymde/', '')
  const file = Bun.file(`./node_modules/easymde/dist/${path}`)
  if (await file.exists()) {
    return new Response(file, {
      headers: { 'Content-Type': path.endsWith('.css') ? 'text/css' : 'application/javascript' }
    })
  }
  return c.notFound()
})

console.log('Blog Admin running at http://localhost:3001')

export default { port: 3001, fetch: app.fetch }

const adminHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>博客管理后台</title>
<link rel="stylesheet" href="/easymde/easymde.min.css">
<style>
  :root {
    --bg: #F4F1EC;
    --card: #FFFFFF;
    --border: #E8E4DD;
    --text: #3D3D3A;
    --muted: #8A8780;
    --cyan: #7B9E93;
    --cyan-light: #A3BDB5;
    --red: #C4726B;
    --radius: 8px;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1C1F20;
      --card: #282B2D;
      --border: #3A3D3F;
      --text: #D5D2CB;
      --muted: #8A8780;
      --cyan: #8FB5A9;
      --cyan-light: #B0CCBF;
      --red: #D4857E;
    }
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Georgia', 'Noto Serif SC', serif; background: var(--bg); color: var(--text); display: flex; min-height: 100vh; }
  nav { width: 220px; background: var(--card); border-right: 1px solid var(--border); padding: 24px 0; flex-shrink: 0; display: flex; flex-direction: column; }
  nav h2 { padding: 0 20px 24px; font-size: 18px; color: var(--cyan); letter-spacing: 0.05em; }
  nav a { display: block; padding: 10px 20px; font-size: 14px; color: var(--muted); text-decoration: none; transition: all 0.2s; cursor: pointer; }
  nav a:hover, nav a.active { color: var(--cyan); background: rgba(123,158,147,0.08); }
  main { flex: 1; padding: 32px; overflow-y: auto; max-height: 100vh; }
  .page { display: none; }
  .page.active { display: block; }
  h1 { font-size: 22px; margin-bottom: 24px; font-weight: 400; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); font-size: 13px; }
  th { color: var(--muted); font-weight: 400; font-size: 12px; }
  tr:hover td { background: rgba(123,158,147,0.04); }
  .btn { display: inline-block; padding: 8px 16px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px; cursor: pointer; font-family: inherit; background: var(--card); color: var(--text); transition: all 0.2s; text-decoration: none; }
  .btn:hover { border-color: var(--cyan); color: var(--cyan); }
  .btn-primary { background: var(--cyan); color: #fff; border-color: var(--cyan); }
  .btn-primary:hover { background: var(--cyan-light); color: #fff; }
  .btn-danger { color: var(--red); border-color: var(--red); }
  .btn-danger:hover { background: var(--red); color: #fff; }
  .btn-sm { padding: 4px 10px; font-size: 12px; }
  .mr-2 { margin-right: 8px; }
  .form-group { margin-bottom: 16px; }
  .form-group label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
  .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; font-family: inherit; background: var(--card); color: var(--text); }
  .form-group textarea { min-height: 120px; resize: vertical; }
  textarea#content { min-height: 400px; font-family: monospace; font-size: 13px; line-height: 1.6; }
  .tag-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  .tag-item { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border); font-size: 12px; background: var(--bg); }
  .tag-item button { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 14px; padding: 0; line-height: 1; }
  .tag-item button:hover { color: var(--red); }
  .tag-input { display: flex; gap: 8px; }
  .tag-input input { flex: 1; }
  .cover-preview { max-width: 200px; max-height: 120px; border-radius: 4px; margin-top: 8px; border: 1px solid var(--border); }
  .toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 100; display: none; }
  .toast.show { display: block; animation: fadeIn 0.3s ease; }
  .toast.success { border-color: var(--cyan); }
  .toast.error { border-color: var(--red); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .stat { font-size: 32px; color: var(--cyan); font-weight: 500; }
  .social-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
  .social-row input { flex: 1; }
  .skill-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  /* EasyMDE overrides — blend with Morandi theme */
  .editor-toolbar { border-color: var(--border) !important; border-radius: 6px 6px 0 0 !important; background: var(--bg) !important; }
  .editor-toolbar button { color: var(--muted) !important; }
  .editor-toolbar button:hover, .editor-toolbar button.active { background: rgba(123,158,147,0.1) !important; border-color: var(--cyan) !important; color: var(--cyan) !important; }
  .CodeMirror { border-color: var(--border) !important; border-radius: 0 0 6px 6px !important; background: var(--card) !important; color: var(--text) !important; font-family: 'SF Mono', 'Fira Code', monospace !important; font-size: 13px !important; line-height: 1.7 !important; min-height: 400px !important; }
  .CodeMirror-cursor { border-left-color: var(--text) !important; }
  .CodeMirror-selected { background: rgba(123,158,147,0.2) !important; }
  .CodeMirror-gutters { background: var(--bg) !important; border-color: var(--border) !important; }
  .editor-preview { background: var(--card) !important; }
  .editor-preview a { color: var(--cyan) !important; }
  .editor-statusbar { color: var(--muted) !important; border-color: var(--border) !important; }
  .editor-statusbar .lines:before { content: '行数: '; }
  .editor-statusbar .words:before { content: '字数: '; }
  .cm-s-easymde .cm-header-1 { font-size: 1.5rem; }
  .cm-s-easymde .cm-header-2 { font-size: 1.3rem; }
  .cm-s-easymde .cm-header-3 { font-size: 1.1rem; }
</style>
</head>
<body>
<nav>
  <h2>墨迹 · 管理</h2>
  <a data-page="dashboard" class="active" onclick="showPage('dashboard')">仪表盘</a>
  <a data-page="posts" onclick="showPage('posts')">文章列表</a>
  <a data-page="editor" onclick="newPost()">新建文章</a>
  <a data-page="settings" onclick="showPage('settings')">站点设置</a>
  <div style="margin-top:auto;padding:16px 20px">
    <button class="btn btn-primary" style="width:100%" onclick="showPublish()">发布到服务器</button>
  </div>
</nav>
<main id="main"></main>
<div class="toast" id="toast"></div>

<script src="/easymde/easymde.min.js"></script>
<script>
// Page routing
let currentPage = 'dashboard'
let currentPostId = null

async function showPage(page) {
  // Destroy EasyMDE when leaving editor
  if (window._easyMDE && currentPage === 'editor') { window._easyMDE.toTextArea(); window._easyMDE = null }

  currentPage = page
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.dataset.page === page))
  const main = document.getElementById('main')
  switch (page) {
    case 'dashboard': await renderDashboard(main); break
    case 'posts': await renderPostList(main); break
    case 'settings': await renderSettings(main); break
  }
}

function toast(msg, type) {
  type = type || 'success'
  const el = document.getElementById('toast')
  el.textContent = msg
  el.className = 'toast show ' + type
  setTimeout(() => el.classList.remove('show'), 2500)
}

// Publish to GitHub
function showPublish() {
  const main = document.getElementById('main')
  main.innerHTML = '<h1>发布到服务器</h1>' +
    '<div class="card">' +
      '<p style="font-size:14px;color:var(--muted);margin-bottom:16px">将本地修改通过 Git 推送到 GitHub，触发自动部署。</p>' +
      '<div class="form-group"><label>提交信息</label><input id="commitMsg" value="更新博客内容"></div>' +
      '<button class="btn btn-primary" onclick="doPublish()">推送到 GitHub</button>' +
      ' <button class="btn" onclick="showPage(\\'dashboard\\')">取消</button>' +
      '<div id="publishLog" style="margin-top:16px;padding:12px;background:var(--bg);border-radius:6px;font-family:monospace;font-size:12px;white-space:pre-wrap;display:none"></div>' +
    '</div>'
}

async function doPublish() {
  const btn = document.querySelector('#main .btn-primary')
  const log = document.getElementById('publishLog')
  btn.disabled = true
  btn.textContent = '推送中...'
  log.style.display = 'block'
  log.textContent = '正在 git push...'

  try {
    const msg = document.getElementById('commitMsg').value.trim() || '更新博客内容'
    const res = await fetch('/api/git/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    }).then(r => r.json())

    if (res.ok) {
      log.textContent = '✓ ' + res.message + '\n\nGitHub Actions 将自动部署到 GitHub Pages。'
      toast('推送成功！等待自动部署')
    } else {
      log.textContent = '✗ ' + (res.error || '推送失败')
      toast(res.error || '推送失败', 'error')
    }
  } catch (e) {
    log.textContent = '✗ 网络错误: ' + e.message
    toast('推送失败', 'error')
  } finally {
    btn.disabled = false
    btn.textContent = '推送到 GitHub'
  }
}

// Dashboard
async function renderDashboard(main) {
  const posts = await fetch('/api/posts').then(r => r.json())
  main.innerHTML = '<h1>仪表盘</h1>' +
    '<div class="card"><div class="stat">' + posts.length + '</div><div style="color:var(--muted);font-size:13px;margin-top:4px">文章总数</div></div>' +
    '<div class="card"><h3 style="font-weight:400;margin-bottom:12px;font-size:14px">最近文章</h3>' +
    posts.slice(0, 5).map(p => '<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:13px">' +
      '<span style="color:var(--muted)">' + p.date + '</span> · ' + e(p.title) +
      ' <span style="color:var(--muted);font-size:12px">[' + e(p.category) + ']</span></div>').join('') +
    '</div>'
}

// Post list
async function renderPostList(main) {
  const posts = await fetch('/api/posts').then(r => r.json())
  main.innerHTML = '<h1>文章列表</h1>' +
    '<div class="card"><table><thead><tr><th>标题</th><th>分类</th><th>日期</th><th>标签</th><th>操作</th></tr></thead><tbody>' +
    posts.map(p => '<tr>' +
      '<td>' + e(p.title) + '</td>' +
      '<td>' + e(p.category) + '</td>' +
      '<td style="color:var(--muted)">' + p.date + '</td>' +
      '<td style="color:var(--muted);font-size:12px">' + p.tags.slice(0,3).map(e).join(', ') + '</td>' +
      '<td>' +
        '<button class="btn btn-sm mr-2" onclick="editPost(\\'' + p.id + '\\')">编辑</button>' +
        '<button class="btn btn-sm btn-danger" onclick="deletePost(\\'' + p.id + '\\')">删除</button>' +
      '</td></tr>').join('') +
    '</tbody></table></div>'
}

// Post editor
function newPost() {
  currentPostId = null
  showEditor(null)
}

async function editPost(id) {
  currentPostId = id
  const post = await fetch('/api/posts/' + id).then(r => r.json())
  showEditor(post)
}

function showEditor(post) {
  // Destroy previous EasyMDE instance
  if (window._easyMDE) { window._easyMDE.toTextArea(); window._easyMDE = null }

  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.dataset.page === 'editor'))
  const main = document.getElementById('main')
  const p = post || { title:'', excerpt:'', content:'', coverImage:'', date: new Date().toISOString().slice(0,10), category:'随笔', categoryNote:'', tags:[], author:'清河' }

  main.innerHTML = '<h1>' + (post ? '编辑文章' : '新建文章') + '</h1>' +
    '<div class="card">' +
      formG('标题', '<input id="title" value="' + ea(p.title) + '">') +
      formG('摘要', '<textarea id="excerpt" style="min-height:60px">' + ea(p.excerpt) + '</textarea>') +
      formG('正文', '<div id="editorWrapper"><textarea id="content">' + ea(p.content) + '</textarea></div>') +
      formG('封面图', '<div><input type="text" id="coverImage" value="' + ea(p.coverImage) + '" placeholder="/covers/example.svg"><br><input type="file" accept="image/*" onchange="uploadCover(this)" style="margin-top:6px"><br><img id="coverPreview" class="cover-preview" src="' + ea(p.coverImage) + '" onerror="this.style.display=\\'none\\'" style="display:' + (p.coverImage ? 'block' : 'none') + '"></div>') +
      formG('日期', '<input type="date" id="date" value="' + ea(p.date) + '">') +
      formG('分类', '<select id="category"><option value="随笔"' + (p.category==='随笔'?' selected':'') + '>随笔</option><option value="技术"' + (p.category==='技术'?' selected':'') + '>技术</option><option value="读书"' + (p.category==='读书'?' selected':'') + '>读书</option><option value="生活"' + (p.category==='生活'?' selected':'') + '>生活</option></select>') +
      formG('分类说明', '<input id="categoryNote" value="' + ea(p.categoryNote||'') + '">') +
      formG('作者', '<input id="author" value="' + ea(p.author) + '">') +
      formG('标签', '<div class="tag-input"><input id="tagInput" placeholder="输入标签后回车" onkeydown="addTag(event)"><button class="btn btn-sm" onclick="addTagFromBtn()">添加</button></div><div class="tag-list" id="tagList"></div>') +
      '<div style="margin-top:20px"><button class="btn btn-primary" onclick="savePost()">保存</button>' +
      ' <button class="btn" onclick="showPage(\\'posts\\')">取消</button></div>' +
    '</div>'

  // Render existing tags
  window._editorTags = [...p.tags]
  renderTags()

  // Initialize EasyMDE
  setTimeout(() => {
    window._easyMDE = new EasyMDE({
      element: document.getElementById('content'),
      spellChecker: false,
      placeholder: 'Markdown 正文...',
      status: ['lines', 'words'],
      toolbar: [
        'bold', 'italic', 'heading', '|',
        'quote', 'unordered-list', 'ordered-list', 'table', '|',
        'link',
        {
          name: 'image',
          action: uploadImageToEditor,
          className: 'fa fa-picture-o',
          title: '上传图片',
        },
        'code', 'horizontal-rule', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide',
      ],
      hideIcons: ['guide'],
      renderingConfig: { codeSyntaxHighlighting: true },
    })
  }, 50)
}

// Image upload handler for EasyMDE
function uploadImageToEditor(editor) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async function() {
    const file = this.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    toast('图片上传中...')
    const res = await fetch('/api/upload', { method: 'POST', body: formData }).then(r => r.json())
    if (res.url) {
      const cm = editor.codemirror
      const pos = cm.getCursor()
      cm.replaceRange('![' + (file.name || 'image') + '](' + res.url + ')', pos)
      toast('图片已插入')
    } else {
      toast(res.error || '上传失败', 'error')
    }
  }
  input.click()
}

function formG(label, content) {
  return '<div class="form-group"><label>' + label + '</label>' + content + '</div>'
}

function renderTags() {
  const el = document.getElementById('tagList')
  if (!el) return
  el.innerHTML = window._editorTags.map(t =>
    '<span class="tag-item">' + e(t) + ' <button onclick="removeTag(\\'' + e(t) + '\\')">&times;</button></span>'
  ).join('')
}

function addTag(e) {
  if (e && e.key !== 'Enter') return
  if (e) e.preventDefault()
  const input = document.getElementById('tagInput')
  const tag = (input?.value || '').trim()
  if (tag && !window._editorTags.includes(tag)) {
    window._editorTags.push(tag)
    renderTags()
  }
  if (input) input.value = ''
}

function addTagFromBtn() { addTag(null) }

function removeTag(tag) {
  window._editorTags = window._editorTags.filter(t => t !== tag)
  renderTags()
}

async function uploadCover(input) {
  const file = input.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', 'cover')
  const res = await fetch('/api/upload', { method: 'POST', body: formData }).then(r => r.json())
  if (res.url) {
    document.getElementById('coverImage').value = res.url
    const preview = document.getElementById('coverPreview')
    preview.src = res.url
    preview.style.display = 'block'
    toast('封面上传成功')
  } else {
    toast(res.error || '上传失败', 'error')
  }
}

async function savePost() {
  const data = {
    title: document.getElementById('title').value.trim(),
    excerpt: document.getElementById('excerpt').value.trim(),
    content: window._easyMDE ? window._easyMDE.value().trim() : '',
    coverImage: document.getElementById('coverImage').value.trim(),
    date: document.getElementById('date').value,
    category: document.getElementById('category').value,
    categoryNote: document.getElementById('categoryNote').value.trim(),
    author: document.getElementById('author').value.trim(),
    tags: window._editorTags,
  }
  if (!data.title) { toast('标题不能为空', 'error'); return }

  const method = currentPostId ? 'PUT' : 'POST'
  const url = currentPostId ? '/api/posts/' + currentPostId : '/api/posts'
  const res = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }).then(r => r.json())
  if (res.error) { toast(res.error, 'error'); return }
  toast(currentPostId ? '文章已更新' : '文章已创建')
  showPage('posts')
}

async function deletePost(id) {
  if (!confirm('确定删除这篇文章？')) return
  const res = await fetch('/api/posts/' + id, { method: 'DELETE' }).then(r => r.json())
  if (res.ok) { toast('文章已删除'); showPage('posts') }
  else toast(res.error || '删除失败', 'error')
}

// Settings
async function renderSettings(main) {
  const s = await fetch('/api/settings').then(r => r.json())

  main.innerHTML = '<h1>站点设置</h1>' +
    '<div class="card">' +
      '<h3 style="font-weight:400;margin-bottom:16px;color:var(--cyan)">博客信息</h3>' +
      formG('博客名称', '<input id="sBlogName" value="' + ea(s.blogName) + '">') +
      formG('副标题', '<input id="sBlogSubtitle" value="' + ea(s.blogSubtitle) + '">') +
      formG('描述', '<textarea id="sBlogDescription" style="min-height:60px">' + ea(s.blogDescription) + '</textarea>') +
      formG('创始年份', '<input type="number" id="sBlogFoundedYear" value="' + s.blogFoundedYear + '">') +
    '</div>' +
    '<div class="card">' +
      '<h3 style="font-weight:400;margin-bottom:16px;color:var(--cyan)">作者信息</h3>' +
      formG('姓名', '<input id="sAuthorName" value="' + ea(s.author.name) + '">') +
      formG('签名', '<input id="sAuthorTagline" value="' + ea(s.author.tagline) + '">') +
      formG('简介（侧边栏）', '<textarea id="sAuthorShortBio" style="min-height:40px">' + ea(s.author.shortBio) + '</textarea>') +
      formG('简介（文章底部）', '<textarea id="sAuthorArticleFooterBio" style="min-height:40px">' + ea(s.author.articleFooterBio) + '</textarea>') +
      formG('头像文字', '<input id="sAuthorAvatarText" value="' + ea(s.author.avatarText) + '" maxlength="2">') +
      formG('个人简介（关于页）', '<textarea id="sAuthorBioParagraphs" style="min-height:100px">' + ea(s.author.bioParagraphs.join('\\n')) + '</textarea><div style="font-size:11px;color:var(--muted);margin-top:4px">每行一段</div>') +
    '</div>' +
    '<div class="card">' +
      '<h3 style="font-weight:400;margin-bottom:16px;color:var(--cyan)">社交链接</h3>' +
      '<div id="socialList">' + s.socials.map((sc, i) => '<div class="social-row">' +
        '<input value="' + ea(sc.name) + '" data-social-idx="' + i + '" data-social-field="name" style="flex:1">' +
        '<input value="' + ea(sc.url) + '" data-social-idx="' + i + '" data-social-field="url" style="flex:2">' +
        '<input value="' + ea(sc.icon) + '" data-social-idx="' + i + '" data-social-field="icon" style="width:80px">' +
        '<button class="btn btn-sm btn-danger" onclick="removeSocial(' + i + ')">×</button>' +
      '</div>').join('') + '</div>' +
      '<button class="btn btn-sm" onclick="addSocial()" style="margin-top:8px">+ 添加链接</button>' +
    '</div>' +
    '<div class="card">' +
      '<h3 style="font-weight:400;margin-bottom:16px;color:var(--cyan)">技能标签</h3>' +
      '<div class="tag-input"><input id="skillInput" placeholder="输入技能" onkeydown="addSkillEnter(event)"><button class="btn btn-sm" onclick="addSkill()">添加</button></div>' +
      '<div class="skill-list" id="skillList"></div>' +
    '</div>' +
    '<button class="btn btn-primary" onclick="saveSettings()">保存设置</button>'

  window._editorSkills = [...s.skills]
  window._editorSocials = JSON.parse(JSON.stringify(s.socials))
  window._editorBioPars = [...s.author.bioParagraphs]
  renderSkills()
}

function renderSkills() {
  const el = document.getElementById('skillList')
  if (!el) return
  el.innerHTML = window._editorSkills.map(t =>
    '<span class="tag-item">' + e(t) + ' <button onclick="removeSkill(\\'' + e(t) + '\\')">&times;</button></span>'
  ).join('')
}

function addSkillEnter(e) { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }
function addSkill() {
  const input = document.getElementById('skillInput')
  const s = (input?.value || '').trim()
  if (s && !window._editorSkills.includes(s)) { window._editorSkills.push(s); renderSkills() }
  if (input) input.value = ''
}
function removeSkill(s) { window._editorSkills = window._editorSkills.filter(t => t !== s); renderSkills() }

function addSocial() {
  window._editorSocials.push({ name: '', url: '', icon: 'link' })
  // Re-render settings page
  showPage('settings')
}
function removeSocial(idx) {
  window._editorSocials.splice(idx, 1)
  showPage('settings')
}

async function saveSettings() {
  const bioRaw = document.getElementById('sAuthorBioParagraphs').value
  const socialRows = document.querySelectorAll('.social-row')
  const socials = []
  socialRows.forEach(row => {
    const inputs = row.querySelectorAll('input')
    if (inputs.length >= 3) {
      socials.push({ name: inputs[0].value.trim(), url: inputs[1].value.trim(), icon: inputs[2].value.trim() })
    }
  })

  const data = {
    blogName: document.getElementById('sBlogName').value.trim(),
    blogSubtitle: document.getElementById('sBlogSubtitle').value.trim(),
    blogDescription: document.getElementById('sBlogDescription').value.trim(),
    blogFoundedYear: parseInt(document.getElementById('sBlogFoundedYear').value) || 2024,
    author: {
      name: document.getElementById('sAuthorName').value.trim(),
      tagline: document.getElementById('sAuthorTagline').value.trim(),
      shortBio: document.getElementById('sAuthorShortBio').value.trim(),
      articleFooterBio: document.getElementById('sAuthorArticleFooterBio').value.trim(),
      avatarText: document.getElementById('sAuthorAvatarText').value.trim() || '清',
      bioParagraphs: bioRaw.split('\\n').filter((l) => l.trim()),
    },
    socials: socials.length > 0 ? socials : window._editorSocials,
    skills: window._editorSkills,
  }

  const res = await fetch('/api/settings', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }).then(r => r.json())
  if (res.ok) toast('设置已保存')
  else toast(res.error || '保存失败', 'error')
}

// Helpers
function e(s) { const el = document.createElement('span'); el.textContent = s || ''; return el.innerHTML }
function ea(s) { return s ? s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : '' }

// Init
showPage('dashboard')
</script>
</body>
</html>`
