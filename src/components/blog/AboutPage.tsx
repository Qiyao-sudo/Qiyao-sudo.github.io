'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/site-config'

function SocialIcon({ icon, hovered }: { icon: string; hovered: boolean }) {
  const paths: Record<string, React.ReactNode> = {
    github: (
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    ),
    twitter: (
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    ),
    mail: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{
        color: 'var(--morandi-faded)',
        opacity: hovered ? 0.8 : 0.5,
        transform: hovered ? 'perspective(400px) rotateY(-8deg)' : 'perspective(400px) rotateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease',
      }}
    >
      {paths[icon]}
    </svg>
  )
}

export default function AboutPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <div className="max-w-2xl mx-auto px-8 pt-28 pb-16" style={{ animation: 'page-enter 0.6s ease-out' }}>
      {/* Avatar with breathing float */}
      <div className="flex justify-center mb-10">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center font-serif-literary text-2xl"
          style={{
            backgroundColor: 'var(--muted)',
            color: 'var(--morandi-cyan)',
            border: '1px solid var(--border)',
            animation: 'float-subtle 4s ease-in-out infinite',
          }}
        >
          {siteConfig.author.avatarText}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-8">
        <h1 className="font-serif-literary text-xl mb-2" style={{ color: 'var(--foreground)' }}>
          {siteConfig.author.name}
        </h1>
        <p className="font-serif-literary text-sm" style={{ color: 'var(--morandi-faded)' }}>
          {siteConfig.author.tagline}
        </p>
      </div>

      {/* Bio - left-aligned staggered paragraphs */}
      <div className="space-y-4 mb-12">
        {siteConfig.author.bioParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-serif-literary text-sm leading-relaxed"
            style={{ color: i === 0 ? 'var(--foreground)' : 'var(--muted-foreground)' }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Skills - minimal line-border tags */}
      <div className="mb-12">
        <h2 className="font-serif-literary text-sm mb-4" style={{ color: 'var(--morandi-cyan)' }}>
          兴趣与技能
        </h2>
        <div className="flex flex-wrap gap-3">
          {siteConfig.skills.map(skill => (
            <span
              key={skill}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="px-3 py-1 text-xs font-serif-literary rounded-sm transition-all duration-500 cursor-default"
              style={{
                color: hoveredSkill === skill ? 'var(--morandi-cyan)' : 'var(--morandi-faded)',
                border: `1px solid ${hoveredSkill === skill ? 'var(--morandi-cyan)' : 'var(--border)'}`,
                transform: hoveredSkill === skill ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social links - minimal line icons */}
      <div>
        <h2 className="font-serif-literary text-sm mb-4" style={{ color: 'var(--morandi-cyan)' }}>
          找到我
        </h2>
        <div className="flex gap-6">
          {siteConfig.socials.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="flex items-center gap-2 transition-opacity duration-500 hover:opacity-80"
              aria-label={social.name}
            >
              <SocialIcon icon={social.icon} hovered={hoveredSocial === social.name} />
              <span
                className="text-xs font-serif-literary transition-opacity duration-500"
                style={{ color: 'var(--morandi-faded)', opacity: hoveredSocial === social.name ? 0.8 : 0.5 }}
              >
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
