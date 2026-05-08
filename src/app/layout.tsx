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
