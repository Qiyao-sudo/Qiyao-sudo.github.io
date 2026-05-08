'use client'

import { ThemeProvider } from 'next-themes'
import BlogLayout from '@/components/blog/BlogLayout'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BlogLayout />
    </ThemeProvider>
  )
}
