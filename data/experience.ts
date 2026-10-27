import { DEVSPHERE } from '@/lib/constants'

export type ExperienceItem = {
  company: string
  role: string
  /** Omitted when only the end/status is known */
  startDate?: string
  endDate: string
  location: string
  type: 'Founder' | 'Full-time' | 'Internship' | 'Teaching'
  website?: string
  description: string[]
}

export function formatPeriod(item: Pick<ExperienceItem, 'startDate' | 'endDate'>) {
  return item.startDate ? `${item.startDate} – ${item.endDate}` : item.endDate
}

export const experience: ExperienceItem[] = [
  {
    company: DEVSPHERE.name,
    role: 'Founder & Lead Engineer',
    endDate: 'Present',
    location: 'India · UAE · Remote',
    type: 'Founder',
    website: DEVSPHERE.url,
    description: [
      'Founded a full-stack agency delivering websites, SaaS platforms, mobile apps and admin dashboards for clients in India, Dubai, Oman and beyond',
      'Shipped 13+ client products end to end — LaptopSecure, Marina Muse International, The Vega Wealth, Krishi Kutumb, Chacha Mobile CRM and more',
      'Own discovery, pricing, architecture, development, deployment and post-launch support for every engagement',
      'Built e-commerce, CRM, AgriTech, EdTech, FinTech and booking platforms with WhatsApp integrations, local SEO and multilingual / offline-first support',
    ],
  },
  {
    company: 'Bizsun Creative',
    role: 'Full-Stack Developer',
    startDate: 'Dec 2025',
    endDate: 'Present',
    location: 'India',
    type: 'Full-time',
    description: [
      'Architected and deployed client-facing web applications using Next.js, React, Node.js, and MongoDB',
      'Owned the complete product lifecycle — from requirements gathering and system design through to production deployment',
      'Collaborated directly with clients and cross-functional teams to define scope, iterate on features, and ship on schedule',
      'Built scalable REST APIs and integrated third-party services to support growing user bases',
    ],
  },
  {
    company: 'Genex Corporate Services',
    role: 'Forward Deployed Engineer Intern',
    startDate: 'Mar 2025',
    endDate: 'Nov 2025',
    location: 'Remote',
    type: 'Internship',
    description: [
      'Independently designed and deployed the GenBore and Vorksinta company websites, taking both from spec to live production',
      'Engineered full-stack features for Internsta — an Internshala-style internship marketplace — including search, listings, and application workflows',
      'Developed and shipped deployment-ready backend APIs integrated with frontend SPAs',
      'Partnered with product and design teams to translate business requirements into technical deliverables',
    ],
  },
  {
    company: 'Yash Computer Education Center',
    role: 'Programming Instructor',
    startDate: 'Aug 2023',
    endDate: 'Nov 2025',
    location: 'Muzaffarnagar',
    type: 'Teaching',
    description: [
      'Taught HTML, CSS, JavaScript, C, and C++ to 50+ students; designed hands-on curriculum and coding labs',
      'Mentored students through debugging workflows and real-world software development best practices',
    ],
  },
]
