import { SITE, SOCIAL } from '@/lib/constants'
import { skillCategories } from '@/data/skills'
import { experience } from '@/data/experience'
import { projects, clientProjects } from '@/data/projects'
import { education } from '@/data/skills'

export const resume = {
  header: {
    name: SITE.name,
    title: SITE.title,
    subtitle: SITE.subtitle,
    location: SITE.location,
    email: SITE.email,
    phone: SITE.phone,
    github: SOCIAL.github,
    linkedin: SOCIAL.linkedin,
  },
  summary:
    'Forward Deployed Engineer and Full-Stack Systems Developer focused on turning business requirements into production-ready web, mobile, and AI-powered products. Experienced across the full product lifecycle — from system design and development to deployment and client delivery in India and Dubai.',
  experience,
  projects: projects.map((p) => ({
    title: p.title,
    category: p.category,
    technologies: p.technologies,
    description: p.description,
  })),
  clientProjects: clientProjects.map((p) => ({
    name: p.name,
    category: p.category,
    website: p.website,
    technologies: p.technologies,
  })),
  skills: skillCategories,
  education,
  highlights: [
    '15+ production applications delivered',
    'India + Dubai client delivery',
    'End-to-end product ownership',
    'Web + Mobile + AI engineering',
  ],
} as const
