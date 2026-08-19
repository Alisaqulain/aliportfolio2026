export const SITE = {
  name: 'Ali Saqulain',
  title: 'Forward Deployed Engineer',
  subtitle: 'Full-Stack Systems Developer',
  location: 'Delhi-NCR, India',
  phone: '+91 9457818861',
  email: 'zaidiali087@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aliportfolio2026.vercel.app',
  availabilityStatus: 'Building production systems',
  availableForFreelance: false,
} as const

export const SOCIAL = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/PLACEHOLDER_GITHUB',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/PLACEHOLDER_LINKEDIN',
} as const

export const SEO = {
  /** Primary title — name first for personal brand searches */
  title: 'Ali Saqulain | Forward Deployed Engineer & Full-Stack Developer',
  description:
    'Ali Saqulain — Forward Deployed Engineer and Full-Stack Systems Developer in Delhi-NCR, India. Portfolio showcasing production web, mobile, AI, and client projects. Hire Ali Saqulain for full-stack engineering.',
  keywords: [
    'Ali Saqulain',
    'Ali Saqulain developer',
    'Ali Saqulain portfolio',
    'Ali Saqulain full stack developer',
    'Forward Deployed Engineer',
    'Full-Stack Developer India',
    'Next.js developer',
    'React developer Delhi',
    'web developer portfolio',
  ],
  ogTitle: 'Ali Saqulain — Forward Deployed Engineer | Full-Stack Systems Developer',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const

export const PROJECT_LINKS = {
  aliGpt: process.env.NEXT_PUBLIC_ALI_GPT_URL ?? '',
  apnaVideoCall: process.env.NEXT_PUBLIC_APNA_VIDEO_CALL_URL ?? '',
  aliIrctic: process.env.NEXT_PUBLIC_ALI_IRCTIC_URL ?? '',
  zerodhaClone: process.env.NEXT_PUBLIC_ZERODHA_CLONE_URL ?? '',
  chatApp: process.env.NEXT_PUBLIC_CHATAPP_URL ?? '',
  airbnbClone: process.env.NEXT_PUBLIC_AIRBNB_CLONE_URL ?? '',
} as const

export const GITHUB_LINKS = {
  aliGpt: process.env.NEXT_PUBLIC_ALI_GPT_GITHUB ?? '',
  apnaVideoCall: process.env.NEXT_PUBLIC_APNA_VIDEO_CALL_GITHUB ?? '',
  aliIrctic: process.env.NEXT_PUBLIC_ALI_IRCTIC_GITHUB ?? '',
  zerodhaClone: process.env.NEXT_PUBLIC_ZERODHA_CLONE_GITHUB ?? '',
  chatApp: process.env.NEXT_PUBLIC_CHATAPP_GITHUB ?? '',
  airbnbClone: process.env.NEXT_PUBLIC_AIRBNB_CLONE_GITHUB ?? '',
} as const

export const PAGE_LINKS = [
  { label: 'About', href: '/about', description: 'Engineering philosophy and how I approach product delivery.' },
  { label: 'Experience', href: '/experience', description: 'Production roles, client work, and engineering ownership.' },
  { label: 'Projects', href: '/projects', description: 'Featured builds and selected client systems.' },
  { label: 'Skills', href: '/skills', description: 'Full-stack, mobile, AI, cloud, and real-time technologies.' },
  { label: 'Resume', href: '/resume', description: 'Print-ready professional resume.' },
  { label: 'Contact', href: '/contact', description: 'Start a conversation about your next system.' },
] as const
