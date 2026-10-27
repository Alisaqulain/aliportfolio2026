function readPublicEnv(name: string, fallback: string) {
  const value = process.env[name]?.trim()
  if (!value || /PLACEHOLDER/i.test(value)) return fallback
  return value
}

export const SITE = {
  name: 'Ali Saqulain',
  title: 'Forward Deployed Engineer',
  subtitle: 'Full-Stack Systems Developer',
  location: 'Delhi-NCR, India',
  phone: '+91 9457818861',
  email: 'zaidiali087@gmail.com',
  url: readPublicEnv('NEXT_PUBLIC_SITE_URL', 'https://aliportfolio2026.vercel.app'),
  availabilityStatus: 'Open to roles & freelance projects',
  availableForFreelance: true,
} as const

export const SOCIAL = {
  github: readPublicEnv('NEXT_PUBLIC_GITHUB_URL', 'https://github.com/Alisaqulain'),
  linkedin: readPublicEnv('NEXT_PUBLIC_LINKEDIN_URL', 'https://www.linkedin.com/in/alisaqulain'),
} as const

/** The agency Ali founded — freelance client work ships under this brand */
export const DEVSPHERE = {
  name: 'DevSphere Solutions',
  role: 'Founder',
  url: 'https://www.devspheresolutions.com',
  workUrl: 'https://www.devspheresolutions.com/work',
  email: 'devsspheresolutions@gmail.com',
  phones: ['+91 94578 18861', '+91 93894 41961'],
  location: 'Uttar Pradesh, India',
  markets: ['India', 'Dubai', 'Oman', 'Global'],
  tagline:
    'Premium full-stack agency building websites, SaaS platforms, mobile apps and admin dashboards for India, Dubai, Oman & global clients.',
  services: [
    'Website Development',
    'Full-Stack Web Apps',
    'SaaS Development',
    'E-commerce Development',
    'Mobile App Development',
    'Admin Dashboards',
  ],
} as const

export const SEO = {
  /** Primary title — name first for personal brand searches */
  title: 'Ali Saqulain | Forward Deployed Engineer & Full-Stack Developer',
  description:
    'Ali Saqulain — Forward Deployed Engineer, Full-Stack Systems Developer and Founder of DevSphere Solutions. Production web, mobile and AI products for clients across India and Dubai.',
  keywords: [
    'Ali Saqulain',
    'Ali Saqulain developer',
    'Ali Saqulain portfolio',
    'Ali Saqulain full stack developer',
    'DevSphere Solutions',
    'DevSphere Solutions founder',
    'Forward Deployed Engineer',
    'Full-Stack Developer India',
    'Next.js developer',
    'React developer Delhi',
    'Freelance web developer India',
    'web developer portfolio',
  ],
  ogTitle: 'Ali Saqulain — Forward Deployed Engineer | Founder, DevSphere Solutions',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'DevSphere', href: '/devsphere' },
  { label: 'Skills', href: '/skills' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const

export const PROJECT_LINKS = {
  batchx: readPublicEnv('NEXT_PUBLIC_BATCHX_URL', 'https://www.amubatchx.app'),
  flowForge: readPublicEnv('NEXT_PUBLIC_FLOWFORGE_URL', 'https://flow-forge-ai-zeta.vercel.app'),
  aliGpt: readPublicEnv('NEXT_PUBLIC_ALI_GPT_URL', 'https://alisaqulaingpt.onrender.com'),
  apnaVideoCall: readPublicEnv('NEXT_PUBLIC_APNA_VIDEO_CALL_URL', 'https://apna-video-call-frontend-hygu.onrender.com'),
  aliIrctic: readPublicEnv('NEXT_PUBLIC_ALI_IRCTIC_URL', 'https://aliminorbca.vercel.app'),
  zerodhaClone: readPublicEnv('NEXT_PUBLIC_ZERODHA_CLONE_URL', 'https://zerodha-6.onrender.com'),
  chatApp: readPublicEnv('NEXT_PUBLIC_CHATAPP_URL', ''),
  airbnbClone: readPublicEnv('NEXT_PUBLIC_AIRBNB_CLONE_URL', 'https://airbn-website.vercel.app'),
} as const

export const GITHUB_LINKS = {
  batchx: readPublicEnv('NEXT_PUBLIC_BATCHX_GITHUB', 'https://github.com/Alisaqulain/batchxamu'),
  devForge: readPublicEnv('NEXT_PUBLIC_DEVFORGE_GITHUB', 'https://github.com/Alisaqulain/devforge'),
  flowForge: readPublicEnv('NEXT_PUBLIC_FLOWFORGE_GITHUB', 'https://github.com/Alisaqulain/FlowForge-AI'),
  aliGpt: readPublicEnv('NEXT_PUBLIC_ALI_GPT_GITHUB', 'https://github.com/Alisaqulain/aligpt'),
  apnaVideoCall: readPublicEnv('NEXT_PUBLIC_APNA_VIDEO_CALL_GITHUB', 'https://github.com/Alisaqulain/Apna-Video-Call'),
  aliIrctic: readPublicEnv('NEXT_PUBLIC_ALI_IRCTIC_GITHUB', 'https://github.com/Alisaqulain/aliminorbca'),
  zerodhaClone: readPublicEnv('NEXT_PUBLIC_ZERODHA_CLONE_GITHUB', 'https://github.com/Alisaqulain/Zerodha-'),
  chatApp: readPublicEnv('NEXT_PUBLIC_CHATAPP_GITHUB', 'https://github.com/Alisaqulain/chatApp'),
  airbnbClone: readPublicEnv('NEXT_PUBLIC_AIRBNB_CLONE_GITHUB', 'https://github.com/Alisaqulain/Airbn-website'),
} as const

export const PAGE_LINKS = [
  { label: 'About', href: '/about', description: 'Engineering philosophy and how I approach product delivery.' },
  { label: 'Experience', href: '/experience', description: 'Production roles, client work, and engineering ownership.' },
  { label: 'Projects', href: '/projects', description: 'Featured builds and selected client systems.' },
  { label: 'DevSphere', href: '/devsphere', description: 'The agency I founded — 13+ client products across India & UAE.' },
  { label: 'Skills', href: '/skills', description: 'Full-stack, mobile, AI, cloud, and real-time technologies.' },
  { label: 'Resume', href: '/resume', description: 'Print-ready professional resume.' },
  { label: 'Contact', href: '/contact', description: 'Start a conversation about your next system.' },
] as const
