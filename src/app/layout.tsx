import type { Metadata } from "next";
import { Noto_Serif_SC, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import siteConfigData from "@/data/site-config.json";

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfigData.blogName} — 文字与代码的安静角落`,
  description: siteConfigData.blogDescription,
  keywords: ["博客", "文艺", "莫兰迪", "技术", "随笔"],
  authors: [{ name: siteConfigData.author.name }],
  icons: {
    icon: "/logo.png",
  },
};

const BLOG_NAME = siteConfigData.blogName;
const BLOG_SUBTITLE = siteConfigData.blogSubtitle;

// Inline CSS for the pre-React ink animation — mirrors globals.css keyframes / progress styles
const INLINE_CSS = `
#__ink-overlay{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;overflow:hidden;font-family:'Noto Serif SC','Georgia',serif}
#__ink-overlay .ink-blob{position:absolute;border-radius:50%;will-change:transform,opacity}
#__ink-overlay .ink-wash{position:absolute;border-radius:50%}
@keyframes ink-blob-1{0%{transform:translate(0,0) scale(0.2) rotate(0deg);opacity:0}20%{opacity:.7}60%{transform:translate(30px,-20px) scale(1.2) rotate(15deg);opacity:.3}100%{transform:translate(60px,-40px) scale(1.8) rotate(30deg);opacity:0}}
@keyframes ink-blob-2{0%{transform:translate(0,0) scale(0.3) rotate(0deg);opacity:0}25%{opacity:.5}70%{transform:translate(-25px,15px) scale(1.1) rotate(-10deg);opacity:.2}100%{transform:translate(-50px,30px) scale(1.6) rotate(-20deg);opacity:0}}
@keyframes ink-blob-3{0%{transform:translate(0,0) scale(0.15) rotate(0deg);opacity:0}15%{opacity:.6}50%{transform:translate(20px,25px) scale(0.9) rotate(8deg);opacity:.25}100%{transform:translate(40px,50px) scale(1.4) rotate(15deg);opacity:0}}
@keyframes ink-blob-4{0%{transform:translate(0,0) scale(0.25) rotate(0deg);opacity:0}30%{opacity:.45}65%{transform:translate(-15px,-30px) scale(1.0) rotate(-12deg);opacity:.15}100%{transform:translate(-30px,-60px) scale(1.5) rotate(-25deg);opacity:0}}
@keyframes ink-blob-5{0%{transform:translate(0,0) scale(0.1) rotate(0deg);opacity:0}35%{opacity:.55}75%{transform:translate(35px,10px) scale(0.8) rotate(5deg);opacity:.2}100%{transform:translate(70px,20px) scale(1.3) rotate(10deg);opacity:0}}
@keyframes ink-bleed-pulse{0%,100%{opacity:.55}50%{opacity:.9}}
#__ink-progress-container{position:absolute;bottom:20%;left:50%;transform:translateX(-50%);width:260px;display:flex;flex-direction:column;align-items:center}
#__ink-progress-track{width:100%;height:4px;border-radius:2px;position:relative;overflow:visible;opacity:.5}
#__ink-progress-fill{height:4px;border-radius:2px;position:relative;will-change:width;box-shadow:0 0 6px 2px rgba(123,158,147,.25),0 0 16px 5px rgba(123,158,147,.08)}
#__ink-progress-tip{position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(123,158,147,.65) 0%,rgba(123,158,147,.25) 30%,rgba(123,158,147,.04) 60%,transparent 75%);filter:blur(3px);animation:ink-bleed-pulse 1.5s ease-in-out infinite}
#__ink-progress-bleed{position:absolute;right:-34px;top:50%;transform:translateY(-50%);width:55px;height:14px;border-radius:50%;background:radial-gradient(ellipse at left center,rgba(123,158,147,.14) 0%,rgba(123,158,147,.04) 40%,transparent 80%);filter:blur(5px);animation:ink-bleed-pulse 2s ease-in-out infinite;animation-delay:.5s}
#__ink-title{position:relative;z-index:10;text-align:center;opacity:0;transform:translateY(10px);transition:opacity .8s ease-out,transform .8s ease-out}
#__ink-title.show{opacity:1;transform:translateY(0)}
#__ink-title h1{font-size:2.25rem;letter-spacing:.3em;margin:0 0 .75rem;font-weight:400}
#__ink-title p{font-size:.875rem;letter-spacing:.4em;margin:0}`;

// Inline script — runs synchronously before React hydrates
const INLINE_SCRIPT = `(function(){
try{
  window.__inkAnimationStatus='running';

  var t=localStorage.getItem('theme');
  var isDark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);
  var bg=isDark?'#1C1F20':'#F4F1EC';
  var fg=isDark?'#D5D2CB':'#3D3D3A';
  var fd=isDark?'#9A9896':'#8A8780';
  var trk=isDark?'#3A3D3F':'#DDD9D2';
  var cyan='#7B9E93';

  var o=document.createElement('div');o.id='__ink-overlay';o.style.backgroundColor=bg;

  // Container for CSS 3D perspective
  var p=document.createElement('div');p.style.cssText='position:absolute;inset:0;perspective:800px;transform-style:preserve-3d';

  // 5 ink blobs
  function blob(w,h,t,l,a,d,az,rz,blur){var b=document.createElement('div');b.className='ink-blob';b.style.cssText='width:'+w+'px;height:'+h+'px;top:'+t+';left:'+l+';background:radial-gradient(ellipse,rgba(123,158,147,.35) 0%,rgba(123,158,147,.08) 55%,transparent 80%);animation:ink-blob-'+a+' '+d+'s ease-out forwards;animation-delay:'+(az||0)+'s;transform:translateZ('+(rz||0)+'px);filter:blur('+(blur||6)+'px)';return b}
  p.appendChild(blob(340,340,'18%','12%',1,2.8,0,-30,6));
  p.appendChild(blob(280,280,'38%','auto',2,2.6,0.2,-20,5));
  p.children[1].style.right='15%';p.children[1].style.left='auto';p.children[1].style.background='radial-gradient(ellipse,rgba(196,183,166,.3) 0%,rgba(196,183,166,.06) 55%,transparent 80%)';
  p.appendChild(blob(240,240,'28%','38%',3,2.4,0.4,0,4));
  p.children[2].style.background='radial-gradient(ellipse,rgba(143,181,169,.4) 0%,rgba(143,181,169,.08) 50%,transparent 75%)';
  p.appendChild(blob(200,200,'auto','22%',4,2.5,0.5,10,4));
  p.children[3].style.bottom='22%';p.children[3].style.top='auto';p.children[3].style.background='radial-gradient(ellipse,rgba(184,169,160,.32) 0%,rgba(184,169,160,.06) 50%,transparent 75%)';
  p.appendChild(blob(180,180,'50%','50%',5,2.2,0.3,20,3));
  p.children[4].style.marginLeft='-90px';p.children[4].style.marginTop='-90px';p.children[4].style.background='radial-gradient(ellipse,rgba(156,175,150,.35) 0%,rgba(156,175,150,.06) 45%,transparent 70%)';

  // 2 color wash accents
  var w1=document.createElement('div');w1.className='ink-wash';w1.style.cssText='width:140px;height:90px;top:32%;left:52%;background:radial-gradient(ellipse,rgba(156,175,150,.18) 0%,transparent 70%);animation:ink-blob-1 3s ease-out forwards;animation-delay:.6s;filter:blur(8px)';p.appendChild(w1);
  var w2=document.createElement('div');w2.className='ink-wash';w2.style.cssText='width:120px;height:80px;bottom:28%;right:28%;background:radial-gradient(ellipse,rgba(184,169,160,.15) 0%,transparent 70%);animation:ink-blob-2 3.2s ease-out forwards;animation-delay:.8s;filter:blur(6px)';p.appendChild(w2);

  o.appendChild(p);

  // Progress bar
  var pc=document.createElement('div');pc.id='__ink-progress-container';
  var pt=document.createElement('div');pt.id='__ink-progress-track';pt.style.background=trk;
  var pf=document.createElement('div');pf.id='__ink-progress-fill';pf.style.width='0%';pf.style.background=cyan;
  var tip=document.createElement('div');tip.id='__ink-progress-tip';
  var bleed=document.createElement('div');bleed.id='__ink-progress-bleed';
  pf.appendChild(tip);pf.appendChild(bleed);pt.appendChild(pf);pc.appendChild(pt);o.appendChild(pc);

  // Title
  var td=document.createElement('div');td.id='__ink-title';
  td.innerHTML='<h1 style="color:'+fg+'">${BLOG_NAME}</h1><p style="color:'+fd+'">${BLOG_SUBTITLE}</p>';
  o.appendChild(td);

  document.body.appendChild(o);

  // Progress animation via rAF
  var start=performance.now();
  var DURATION=2200;
  function tick(now){var pct=Math.min(((now-start)/DURATION)*100,100);pf.style.width=pct+'%';if(pct<100)requestAnimationFrame(tick)}
  requestAnimationFrame(tick);

  // Phase transitions
  setTimeout(function(){td.className='show'},2400);
  setTimeout(function(){td.style.opacity='0';pc.style.opacity='0';td.style.transition='opacity .6s ease-out';pc.style.transition='opacity .6s ease-out'},3400);
  setTimeout(function(){o.style.transition='opacity .8s ease-out';o.style.opacity='0'},3600);
  setTimeout(function(){o.remove();window.__inkAnimationStatus='done'},4400);
}catch(e){window.__inkAnimationStatus='done'}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${notoSerifSC.variable} ${playfairDisplay.variable} ${lora.variable} antialiased bg-background text-foreground`}
        style={{
          fontFamily: "'Noto Serif SC', 'Playfair Display', 'Lora', Georgia, serif",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: INLINE_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
