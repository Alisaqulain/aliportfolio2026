import { DEVSPHERE, SITE, SOCIAL } from '@/lib/constants'
import { education, keyAchievements, skillCategories } from '@/data/skills'
import { experience } from '@/data/experience'
import { projects, clientProjects } from '@/data/projects'

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
    portfolio: SITE.url,
    company: DEVSPHERE,
  },
  summary:
    'Results-driven Forward Deployed Engineer and Full-Stack Systems Developer — and Founder of DevSphere Solutions — building and shipping production-grade web, mobile and AI-powered applications for clients across India and Dubai. Specialised in Next.js, React, Node.js, TypeScript, MongoDB and AI integrations, with end-to-end ownership spanning requirements gathering, system architecture, development, deployment and client delivery. Strong focus on scalable backend architecture, API integrations, background job processing and cloud deployment.',
  experience,
  projects: projects.map((p) => ({
    title: p.title,
    category: p.category,
    technologies: p.technologies,
    description: p.description,
    github: p.github,
    liveUrl: p.liveUrl,
  })),
  clientProjects: clientProjects.map((p) => ({
    name: p.name,
    category: p.category,
    website: p.website,
    technologies: p.technologies,
    devsphere: p.devsphere,
  })),
  skills: skillCategories,
  education,
  highlights: keyAchievements,
} as const
