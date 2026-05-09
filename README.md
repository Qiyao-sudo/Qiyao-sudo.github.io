## 🎨 墨迹 — 个人博客网站

### 项目概览

一个莫兰迪雾灰青配色的文艺风个人博客，支持明亮/暗黑双模式，融合了克制的3D景深效果和水墨入场动画。

### 文件结构

```
src/
├── app/
│   ├── globals.css          # 莫兰迪配色系统 + 动画关键帧 + 排版样式
│   ├── layout.tsx           # 根布局（Noto Serif SC + Playfair Display + Lora 字体）
│   └── page.tsx             # 入口页面（ThemeProvider + BlogLayout）
├── store/
│   └── blog-store.ts        # Zustand 状态管理（路由、搜索、动画状态）
├── data/
│   ├── posts.json            # 文章数据（JSON 格式，管理工具读写入口）
│   ├── posts.ts              # 文章导入 + 搜索/归档工具函数
│   └── site-config.json      # 站点配置（博客名、作者、社交链接、技能）
├── lib/
│   └── site-config.ts        # 站点配置类型定义 + 静态导入
├── components/
│   └── blog/
│       ├── BlogLayout.tsx    # 主布局容器
│       ├── Navbar.tsx        # 半透明磨砂悬浮导航栏
│       ├── Footer.tsx        # 极简页脚
│       ├── BackToTop.tsx     # 线条式回到顶部按钮
│       ├── ThemeToggle.tsx   # 明暗模式切换
│       ├── InkAnimation.tsx  # 3D水墨入场动画
│       ├── ClickInkSplash.tsx # 点击墨渍晕染特效
│       ├── HomePage.tsx      # 首页（Hero + 错落卡片 + 侧边栏）
│       ├── ArticleCard.tsx   # 3D悬浮卡片组件
│       ├── Sidebar.tsx       # 内嵌式侧边栏
│       ├── ArticlePage.tsx   # 文章详情页（TOC + 代码块 + 上下篇）
│       ├── CategoriesPage.tsx # 折叠式分类页
│       ├── TagsPage.tsx      # 疏密错落标签云
│       ├── ArchivePage.tsx   # 竖向时间轴归档
│       ├── AboutPage.tsx     # 关于页（呼吸头像 + 线条技能标签）
│       └── NotFoundPage.tsx  # 404页（粒子浮动背景）
public/
├── covers/                   # 封面图（默认 default.svg）
└── uploads/                  # 文章正文图片
admin-server/                 # 独立博客管理后台（Bun + Hono）
└── ...
```

### 🎨 主题配色

| 变量 | 亮色模式 | 暗色模式 | 用途 |
|------|---------|---------|------|
| `--morandi-cyan` | `#7B9E93` | `#8FB5A9` | 主色·雾灰青 |
| `--morandi-paper` | `#F4F1EC` | `#1C1F20` | 纸质背景 |
| `--morandi-ink` | `#3D3D3A` | `#D5D2CB` | 墨色文字 |
| `--morandi-faded` | `#8A8780` | `#8A8780` | 淡化文字 |
| `--morandi-divider` | `#DDD9D2` | `#3A3D3F` | 分割线 |
| `--morandi-sand` | `#C4B7A6` | `#A89888` | 暖沙辅助色 |
| `--morandi-mauve` | `#B8A9A0` | `#9A8E86` | 灰紫辅助色 |

### ✨ 3D/2D效果一览

- **水墨入场动画**：5层3D景深分层墨色晕染，前后墨层有空间立体感
- **Hero视差**：鼠标移动产生极弱2D平移（8px/5px最大偏移）
- **卡片3D倾斜**：鼠标跟随式perspective旋转（最大2°）+ 4px抬升 + 阴影分层
- **导航栏缩放**：滚动时微弱2D缩放形变（0.003最大偏移）
- **回到顶部3D浮升**：hover时translateZ(4px) + translateY(-3px)
- **标签3D外翻**：hover时rotateY(-3°) + rotateX(1°) + translateZ(4px)
- **侧边栏2D浮动**：6-8s呼吸式上下浮动动画
- **分类展开2D拉伸**：maxHeight过渡 + perspective translateZ(5px)
- **时间轴微弱波动**：鼠标位置影响scaleY
- **关于页头像浮动**：4s呼吸式缓慢上下浮动
- **技能标签2D描边形变**：hover时scale(1.05) + 边框变色
- **社交图标3D翻转**：hover时rotateY(-8°) + 透明度渐变
- **404粒子浮动**：12个极弱3D粒子，6-10s不规则浮动
- **文章目录3D层级**：当前活跃项translateZ(3px)凸出
- **代码块2D放大**：hover时scale(1.008)

### 📝 内容管理

#### 方式一：使用管理后台（推荐）

```bash
cd admin-server
bun install
bun run dev
```

浏览器打开 **http://localhost:3001**，提供可视化管理界面：

- **仪表盘** — 文章统计概览
- **文章列表** — 表格浏览、编辑、删除
- **新建/编辑文章** — Markdown 正文编辑、封面上传、标签管理
- **站点设置** — 博客名、作者信息、社交链接、技能标签

管理后台直接读写 `src/data/posts.json` 和 `src/data/site-config.json`，修改即时生效。

#### 方式二：手动编辑文件

**添加新文章** — 编辑 `src/data/posts.json`，在数组开头添加：

```json
{
  "id": "my-new-post",
  "title": "文章标题",
  "excerpt": "摘要文字",
  "content": "## 标题\n\n正文内容...",
  "coverImage": "/covers/my-cover.svg",
  "date": "2024-12-20",
  "category": "随笔",
  "categoryNote": "文字是时间的回声",
  "tags": ["散文"],
  "author": "清河",
  "toc": [
    { "id": "标题", "title": "标题", "level": 2 }
  ]
}
```

**修改博客名称和个人信息** — 编辑 `src/data/site-config.json`：

```json
{
  "blogName": "墨迹",
  "blogSubtitle": "在文字中寻找安静的力量",
  "author": {
    "name": "清河",
    "tagline": "文字 · 代码 · 留白",
    "bioParagraphs": ["个人简介段落..."]
  },
  "socials": [
    { "name": "GitHub", "url": "https://github.com/xxx", "icon": "github" }
  ],
  "skills": ["TypeScript", "React", "..."]
}
```

所有博客组件会自动读取此配置，无需逐个修改组件文件。

#### 其他自定义

**修改主题配色** — 编辑 `src/app/globals.css`，修改 `:root` 和 `.dark` 中的CSS变量。

**替换封面图** — 将新图片放入 `public/covers/` 目录，在文章数据的 `coverImage` 字段引用 `/covers/xxx.png`。

**文章正文图片** — 在 Markdown 内容中使用 `![描述](/uploads/xxx.png)`，或通过管理后台上传。

### 🚀 GitHub Pages 部署教程

#### 方法一：静态导出部署（推荐）

1. **修改 `next.config.ts`**：

```typescript
const nextConfig: NextConfig = {
  output: 'export',  // 改为静态导出
  images: {
    unoptimized: true,  // 静态导出需要关闭图片优化
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};
```

2. **构建项目**：

```bash
bun run build
```

3. **部署到 GitHub Pages**：

```bash
# 创建 .github/workflows/deploy.yml
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

4. **在 GitHub 仓库设置中**：
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"

#### 方法二：使用 `gh-pages` 分支

```bash
# 安装 gh-pages
bun add -d gh-pages

# 构建
bun run build

# 部署
npx gh-pages -d out
```

### ⚠️ 重要提示

- 静态导出后，所有页面路由变为客户端路由（Hash路由），无需服务端
- 封面图和文章图片放在 `public/` 目录下即可
- 暗黑模式偏好会自动保存在 localStorage
- 移动端已关闭重度3D效果，保证流畅性

---
