import type { Metadata } from "next";
import { Noto_Serif_SC, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

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
  title: "墨迹 — 文字与代码的安静角落",
  description: "一个关于文字、代码与留白的个人博客。莫兰迪配色，文艺质感，安静治愈。",
  keywords: ["博客", "文艺", "莫兰迪", "技术", "随笔"],
  authors: [{ name: "清河" }],
  icons: {
    icon: "/logo.svg",
  },
};

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
        {children}
      </body>
    </html>
  );
}
