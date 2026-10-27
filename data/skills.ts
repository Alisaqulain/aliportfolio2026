export type SkillCategory = {
  id: string
  label: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'React Flow'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'OAuth', 'Webhooks', 'Supabase'],
  },
  {
    id: 'ai',
    label: 'AI',
    items: ['OpenAI API', 'Google Gemini', 'Anthropic Claude', 'AI Agents', 'LLM Integration', 'AI Chat', 'Recommendation Systems'],
  },
  {
    id: 'realtime',
    label: 'Distributed & Real-Time',
    items: ['Redis', 'BullMQ', 'Socket.io', 'WebRTC', 'Background Jobs', 'Queue Processing'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    items: ['React Native', 'Expo', 'Capacitor', 'iOS', 'Android'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MongoDB', 'Mongoose', 'MySQL', 'Firebase'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    items: ['Vercel', 'Render', 'Linux VPS', 'Nginx', 'PM2', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code'],
  },
]

export const achievements = [
  { value: '15+', label: 'Production apps shipped' },
  { value: '13+', label: 'DevSphere client builds' },
  { value: 'India + UAE', label: 'Client delivery' },
  { value: '50+', label: 'Students mentored' },
] as const

export const keyAchievements = [
  'Shipped 15+ production applications serving real users across India and Dubai',
  'Founded DevSphere Solutions and delivered 13+ client products end to end',
  'Delivered complete client solutions covering discovery, architecture, development and cloud deployment',
  'Built AI-powered, real-time communication, EdTech, FinTech and Real Estate platforms',
  'Reduced deployment cycles with CI/CD pipelines on Vercel, Render and Linux VPS',
] as const

export const capabilities = [
  {
    title: 'Full-Stack Products',
    description: 'Next.js, React and Node.js platforms — from interface to API to database, owned end to end.',
  },
  {
    title: 'AI-Powered Applications',
    description: 'LLM integrations with OpenAI, Gemini and Claude — chat, agents, recommendations and dev tools.',
  },
  {
    title: 'Real-Time & Distributed',
    description: 'WebRTC, Socket.io, Redis and BullMQ queues for live and background workloads.',
  },
  {
    title: 'Mobile Applications',
    description: 'Cross-platform React Native, Expo and Capacitor apps for iOS and Android.',
  },
  {
    title: 'Business Platforms',
    description: 'E-commerce, CRM, EdTech, FinTech, AgriTech and Real Estate systems for real clients.',
  },
  {
    title: 'Deployment & Infrastructure',
    description: 'Vercel, Render, Linux VPS, Nginx, PM2, Docker and GitHub Actions CI/CD.',
  },
] as const

export type EducationItem = {
  degree: string
  short: string
  institution: string
  location: string
  period: string
  status: 'Pursuing' | 'Completed'
}

export const education: EducationItem[] = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institution: 'Aligarh Muslim University (AMU)',
    location: 'Aligarh',
    period: '2026 – Present',
    status: 'Pursuing',
  },
  {
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    institution: 'Maa Shakumbhari University (MSU)',
    location: 'Muzaffarnagar',
    period: '2023 – 2026',
    status: 'Completed',
  },
]
