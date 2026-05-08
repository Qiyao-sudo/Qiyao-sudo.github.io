import configData from '@/data/site-config.json'

export interface SiteSocial {
  name: string
  url: string
  icon: string
}

export interface SiteAuthor {
  name: string
  tagline: string
  shortBio: string
  articleFooterBio: string
  avatarText: string
  bioParagraphs: string[]
}

export interface SiteConfig {
  blogName: string
  blogSubtitle: string
  blogDescription: string
  blogFoundedYear: number
  author: SiteAuthor
  socials: SiteSocial[]
  skills: string[]
}

export const siteConfig: SiteConfig = configData as SiteConfig
