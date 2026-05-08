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

// Category notes mapping
const categoryNotes: Record<string, string> = {
  '随笔': '文字是时间的回声',
  '技术': '代码与诗的交汇',
  '读书': '与纸页的缓慢对话',
  '生活': '日常里的细碎光亮',
}

export const posts: BlogPost[] = [
  {
    id: 'ink-mountain',
    title: '墨山笔记',
    excerpt: '山间雾气从笔尖漫开，纸上便有了远意。那一抹淡墨，是黄昏的影子，也是清晨未醒的梦。',
    content: `## 破晓

山间的雾气从笔尖漫开，纸上便有了远意。那一抹淡墨，是黄昏的影子，也是清晨未醒的梦。

水墨不是技术，而是一种呼吸的节奏。浓淡之间，是人对自然的谦逊。落笔的那一刻，山便在你心中活了。

> 水墨不在笔端，在心间。每一笔都是与沉默的对话。

## 晌午

阳光透过纸窗，洒下斑驳的光影。墨色在纸上缓缓洇开，像时间在说话。

我在画中行走，走过松林、石径、小桥。每一步都留下深浅不一的印记，像人生走过的路，有些模糊，有些清晰。

画山水，不是画山水本身，而是画那份心境。山不语，水不言，但它们一直在那里，等你安静下来。

## 黄昏

最后一笔落定，远山在暮色中隐去。

\`\`\`javascript
// 用代码写一首诗
const ink = {
  water: '清泉石上流',
  mountain: '远山含暮色',
  brush: '一笔落天地',
  silence: '万籁此皆寂'
}
\`\`\`

水墨教会我一件事：留白不是空无，而是充满可能。正如沉默不是缺席，而是最深的存在。

写到这里，窗外的月亮升起来了。月光如墨，铺满了整张宣纸。`,
    coverImage: '/covers/ink-mountain.svg',
    date: '2024-12-15',
    category: '随笔',
    categoryNote: '文字是时间的回声',
    tags: ['散文', '诗歌'],
    author: '清河',
    toc: [
      { id: '破晓', title: '破晓', level: 2 },
      { id: '晌午', title: '晌午', level: 2 },
      { id: '黄昏', title: '黄昏', level: 2 },
    ],
  },
  {
    id: 'slow-code',
    title: '慢代码：写给疲惫的开发者',
    excerpt: '在这个追求速度的时代，也许我们需要学会写慢代码。不是低效，而是从容。',
    content: `## 速度的迷思

在这个追求速度的时代，也许我们需要学会写慢代码。不是低效，而是从容。

每天，我们被 Sprint 推着走，被 deadline 追着跑。代码越写越快，却越来越看不懂三个月前的自己。

> 快不是目的，好才是。

慢代码，是一种态度。

## 从容的力量

好的代码像好文章，需要反复斟酌。变量名是词汇，函数是段落，架构是篇章。

\`\`\`typescript
// 慢代码：每一行都有呼吸的空间
interface QuietMoment {
  silence: Duration
  thought: Reflection
  clarity: Insight
}

function pause(moment: QuietMoment): Promise<Understanding> {
  return new Promise((resolve) => {
    // 不急，让思绪沉淀
    setTimeout(() => {
      resolve(moment.clarity)
    }, moment.silence)
  })
}
\`\`\`

## 重新定义效率

效率不是写更多的代码，而是写更少的代码做更多的事。每一行代码都是负债——你需要维护它、测试它、理解它。

少即是多，慢即是快。

写代码时，试着问自己：
- 这行代码真的必要吗？
- 三个月后我还看得懂吗？
- 有没有更简洁的表达？

## 写在最后

回到键盘前，深呼吸，然后慢慢地开始。

代码是一种写作，而好的写作从来不是赶出来的。`,
    coverImage: '/covers/slow-code.svg',
    date: '2024-11-28',
    category: '技术',
    categoryNote: '代码与诗的交汇',
    tags: ['JavaScript', 'TypeScript', '前端'],
    author: '清河',
    toc: [
      { id: '速度的迷思', title: '速度的迷思', level: 2 },
      { id: '从容的力量', title: '从容的力量', level: 2 },
      { id: '重新定义效率', title: '重新定义效率', level: 2 },
      { id: '写在最后', title: '写在最后', level: 2 },
    ],
  },
  {
    id: 'reading-alone',
    title: '独读：一个人与书的静默时光',
    excerpt: '读书从来不是社交活动。它是一个人、一盏灯、一段与作者跨越时空的私密对话。',
    content: `## 独处的书桌

读书从来不是社交活动。它是一个人、一盏灯、一段与作者跨越时空的私密对话。

我的书桌上永远堆着三本书：一本在读，一本等待，一本是翻过无数遍的旧友。

> 一本好书，是一次独处中的相遇。

## 慢读的艺术

社交媒体让我们习惯了快速浏览，但好书需要慢读。慢到你能闻到纸页的气息，能感受到字里行间的温度。

不要追赶阅读的进度，让文字自己找到你。

## 读书笔记

我习惯在书页空白处写下当时的感受。那些笔迹，是时间留在文字上的印记。

翻开几年前的笔记，我看到的不仅是书的内容，还有那个时刻的自己。书未变，人已不同，但那些文字依然温暖。

## 关于书店

我偏爱那些灯光昏暗的旧书店。书架之间狭窄的过道，空气中纸张与灰尘混合的气息，还有角落里那个安静的阅读者。

书店是城市里最后的避难所。

![旧书店的午后](https://picsum.photos/seed/bookstore/800/400)

在那些安静的午后，时间似乎放慢了脚步。书页翻动的声音，成了唯一的时间刻度。`,
    coverImage: '/covers/reading.svg',
    date: '2024-11-10',
    category: '读书',
    categoryNote: '与纸页的缓慢对话',
    tags: ['阅读', '散文'],
    author: '清河',
    toc: [
      { id: '独处的书桌', title: '独处的书桌', level: 2 },
      { id: '慢读的艺术', title: '慢读的艺术', level: 2 },
      { id: '读书笔记', title: '读书笔记', level: 2 },
      { id: '关于书店', title: '关于书店', level: 2 },
    ],
  },
  {
    id: 'css-poetry',
    title: 'CSS 是一种写诗的方式',
    excerpt: '每一个属性都是一行诗，每一个选择器都是一次凝视。CSS 不只是样式，更是一种审美表达。',
    content: `## 代码与诗意

每一个属性都是一行诗，每一个选择器都是一次凝视。CSS 不只是样式，更是一种审美表达。

\`\`\`css
/* 一首关于留白的诗 */
.spaces-between {
  margin: auto;
  padding: silence;
  gap: breath;
  /* 最重要的东西，往往在空白处 */
  content: "";
}
\`\`\`

## 渐变与人生

渐变是 CSS 中最像生活的属性。没有清晰的边界，一切都是过渡。

\`\`\`css
.life {
  background: linear-gradient(
    to future,
    #past 0%,
    #present 50%,
    #unknown 100%
  );
}
\`\`\`

我们在渐变中前行，每一步都是两种状态之间的过渡。

## 动画与时间

CSS 动画教会我们：变化不需要瞬间完成。

\`\`\`css
.patience {
  transition: all 3s ease-in-out;
  /* 好的事情，值得等待 */
}
\`\`\`

## 选择器的凝视

选择器是一种注视的方式。当你写 \`article > p\`，你在说："我只关心文章里最直接的段落。"

这种精确，是一种温柔。

## 写在最后

下次写 CSS 的时候，试着把它当作一首诗来写。注意缩进、对齐、空行。让代码本身就是一种美。`,
    coverImage: '/covers/css-poetry.svg',
    date: '2024-10-22',
    category: '技术',
    categoryNote: '代码与诗的交汇',
    tags: ['CSS', '前端', '设计'],
    author: '清河',
    toc: [
      { id: '代码与诗意', title: '代码与诗意', level: 2 },
      { id: '渐变与人生', title: '渐变与人生', level: 2 },
      { id: '动画与时间', title: '动画与时间', level: 2 },
      { id: '选择器的凝视', title: '选择器的凝视', level: 2 },
      { id: '写在最后', title: '写在最后', level: 2 },
    ],
  },
  {
    id: 'rain-alley',
    title: '雨巷纪事',
    excerpt: '江南的雨总是不急不缓地落着，像一封没有署名的长信，写给每一个经过的人。',
    content: `## 雨落

江南的雨总是不急不缓地落着，像一封没有署名的长信，写给每一个经过的人。

青石板路被雨水浸润后，泛着温润的光泽。那光泽里映着灰瓦白墙，映着撑伞而过的行人，也映着时间缓缓流淌的痕迹。

## 巷深

巷子很深，深到能听见自己脚步的回声。两侧的墙壁长着青苔，那是最安静的居民——它们不说一句话，却把光阴都记录了下来。

> 在雨巷中行走，不需要目的地。每一步都是抵达。

## 停驻

偶尔会在某个檐下停驻。雨水从瓦当滴落，一滴，又一滴，像是有人在远处敲着木鱼。

那一刻，世界安静得只剩下雨声。而这种安静，比任何言语都更加辽阔。

## 晴后

雨停之后，巷子里弥漫着泥土与青草的气息。阳光穿过云层的缝隙，在石板路上投下碎金般的光斑。

生活就是这样，雨后总会有光。`,
    coverImage: '/covers/rain-alley.svg',
    date: '2024-10-05',
    category: '随笔',
    categoryNote: '文字是时间的回声',
    tags: ['散文', '生活'],
    author: '清河',
    toc: [
      { id: '雨落', title: '雨落', level: 2 },
      { id: '巷深', title: '巷深', level: 2 },
      { id: '停驻', title: '停驻', level: 2 },
      { id: '晴后', title: '晴后', level: 2 },
    ],
  },
  {
    id: 'zen-react',
    title: 'React 的禅意：组件即呼吸',
    excerpt: '每个组件都是一次呼吸，mount 是吸气，unmount 是呼气。状态是呼吸之间的停顿。',
    content: `## 呼吸的节奏

每个组件都是一次呼吸，mount 是吸气，unmount 是呼气。状态是呼吸之间的停顿。

\`\`\`jsx
function Breath() {
  const [isAlive, setIsAlive] = useState(true)
  
  useEffect(() => {
    // 吸气——进入世界
    return () => {
      // 呼气——安静离开
    }
  }, [])
  
  return isAlive ? <Gently /> : null
}
\`\`\`

## 简约的哲学

好的组件像禅院，没有多余之物。每个 prop 都有存在的理由，每个 state 都有退场的时机。

> 简约不是缺少，而是恰到好处。

## 组合的智慧

组件之美在于组合。就像枯山水，几块石头、一片白沙，却可以表达整片山海。

\`\`\`jsx
function Garden() {
  return (
    <Sand>
      <Stone position="center" />
      <Stone position="far" />
      <Rake pattern="waves" />
    </Sand>
  )
}
\`\`\`

## 无为而治

最好的状态管理是无为。当数据自然流动，组件各自安好，便是最优雅的架构。

不刻意控制，而是顺应数据的本性。`,
    coverImage: '/covers/zen-react.svg',
    date: '2024-09-18',
    category: '技术',
    categoryNote: '代码与诗的交汇',
    tags: ['React', 'JavaScript', '前端'],
    author: '清河',
    toc: [
      { id: '呼吸的节奏', title: '呼吸的节奏', level: 2 },
      { id: '简约的哲学', title: '简约的哲学', level: 2 },
      { id: '组合的智慧', title: '组合的智慧', level: 2 },
      { id: '无为而治', title: '无为而治', level: 2 },
    ],
  },
  {
    id: 'morandi-morning',
    title: '莫兰迪的早晨',
    excerpt: '那些灰调的瓶罐里，住着沉默的诗。莫兰迪一生只画几只瓶罐，却画出了整个世界的安宁。',
    content: `## 静物与寂静

那些灰调的瓶罐里，住着沉默的诗。莫兰迪一生只画几只瓶罐，却画出了整个世界的安宁。

> 在最简单的物象中，找到最深的宁静。

## 灰色的光谱

莫兰迪的灰不是单调的灰。那是晨雾的灰，是旧墙的灰，是雨后石板的灰。每一抹灰色都有自己的名字和温度。

他的调色盘上没有艳丽的色彩，却有整个世界的呼吸。

## 反复与深入

他反复画同样的瓶罐，但每一幅都不同。就像每一天的日出都不同，每一刻的安静都不同。

这种重复不是执着，而是深入。每一次凝视，都让那些瓶罐多了一层光影，多了一分安详。

## 留白的智慧

莫兰迪的画中，背景几乎总是空白的。但那空白不是空无，而是容纳一切的安宁。

瓶罐在空白中呼吸，就像我们在寂静中找到自己。

## 写给清晨

如果你在清晨醒来，窗外的天色微灰，请不要急于开灯。让那片灰色的天光慢慢填满房间，让眼睛适应柔和的光线。

那便是莫兰迪的早晨。`,
    coverImage: '/covers/morandi.svg',
    date: '2024-09-02',
    category: '读书',
    categoryNote: '与纸页的缓慢对话',
    tags: ['阅读', '哲学', '设计'],
    author: '清河',
    toc: [
      { id: '静物与寂静', title: '静物与寂静', level: 2 },
      { id: '灰色的光谱', title: '灰色的光谱', level: 2 },
      { id: '反复与深入', title: '反复与深入', level: 2 },
      { id: '留白的智慧', title: '留白的智慧', level: 2 },
      { id: '写给清晨', title: '写给清晨', level: 2 },
    ],
  },
  {
    id: 'autumn-walk',
    title: '秋日散步指南',
    excerpt: '最好的散步没有目的。脚下的落叶沙沙作响，像是大地在跟你说话。',
    content: `## 无目的之行

最好的散步没有目的。脚下的落叶沙沙作响，像是大地在跟你说话。

秋天的散步尤其如此。不需要地图，不需要计时，只需要一双舒适的鞋和一颗愿意慢下来的心。

> 走路是最慢的旅行，也是最深的抵达。

## 树的语言

每一棵树都在秋天写下遗书——那些缤纷的落叶，是它们对这一年的温柔告别。

银杏的金黄，枫叶的赭红，梧桐的枯褐。每一种颜色都是一种情绪，每一片落叶都是一封信。

## 光影漫步

秋日的光线最为温柔。斜阳穿过枝叶，在地上投下斑驳的光影。

走在这样的光里，人也变得柔软了。那些平日里的坚硬与焦虑，在秋光中慢慢融化。

## 回家的路

散步的终点永远是家。推开门的那一刻，有一种小小的满足。

外面的世界很大，但此刻，一杯热茶就足够了。`,
    coverImage: '/covers/autumn.svg',
    date: '2024-08-15',
    category: '生活',
    categoryNote: '日常里的细碎光亮',
    tags: ['散文', '生活'],
    author: '清河',
    toc: [
      { id: '无目的之行', title: '无目的之行', level: 2 },
      { id: '树的语言', title: '树的语言', level: 2 },
      { id: '光影漫步', title: '光影漫步', level: 2 },
      { id: '回家的路', title: '回家的路', level: 2 },
    ],
  },
]

// Derive categories dynamically from posts
export const categories = (() => {
  const countMap: Record<string, number> = {}
  posts.forEach(p => {
    countMap[p.category] = (countMap[p.category] || 0) + 1
  })
  return Object.entries(countMap)
    .map(([name, count]) => ({ name, note: categoryNotes[name] || '', count }))
})()

// Derive tags dynamically from posts
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
