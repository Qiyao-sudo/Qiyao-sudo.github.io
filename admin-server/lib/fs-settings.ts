import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SETTINGS_PATH = resolve(import.meta.dir, '../../src/data/site-config.json')

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

export function loadSettings(): SiteConfig {
  return JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8')) as SiteConfig
}

export function saveSettings(config: SiteConfig): void {
  writeFileSync(SETTINGS_PATH, JSON.stringify(config, null, 2), 'utf-8')
}
