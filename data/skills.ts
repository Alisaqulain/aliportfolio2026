export type SkillCategory = {
  id: string
  label: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'JavaScript ES6+', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Supabase'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    items: ['React Native', 'Expo', 'iOS', 'Android'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    id: 'realtime',
    label: 'Real-Time',
    items: ['Socket.io', 'WebRTC'],
  },
  {
    id: 'ai',
    label: 'AI',
    items: ['OpenAI API', 'AI Chat', 'Recommendation Systems'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    items: ['Vercel', 'Render', 'Linux VPS', 'Nginx', 'PM2', 'Docker', 'CI/CD'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code'],
  },
]

export const achievements = [
  { value: '15+', label: 'Production Applications' },
  { value: 'India + Dubai', label: 'Client Delivery' },
  { value: 'End-to-End', label: 'Product Ownership' },
  { value: 'Web + Mobile + AI', label: 'Engineering' },
] as const

export const capabilities = [
  {
    title: 'Full-Stack Products',
    description: 'From frontend interfaces to backend APIs and databases.',
  },
  {
    title: 'AI-Powered Applications',
    description: 'LLM integrations, AI chat, recommendations and intelligent workflows.',
  },
  {
    title: 'Real-Time Systems',
    description: 'Video calling, messaging, WebRTC and Socket.io applications.',
  },
  {
    title: 'Mobile Applications',
    description: 'Cross-platform React Native and Expo applications.',
  },
  {
    title: 'Business Platforms',
    description: 'EdTech, FinTech, Real Estate, SaaS and automation systems.',
  },
  {
    title: 'Deployment & Infrastructure',
    description: 'Vercel, Render, Linux VPS, Nginx, PM2, Docker and CI/CD.',
  },
] as const

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  location: 'Muzaffarnagar',
  period: '2023 – 2026',
  status: 'Expected',
} as const
