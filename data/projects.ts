import { GITHUB_LINKS, PROJECT_LINKS } from '@/lib/constants'

export type Project = {
  number: string
  slug: string
  title: string
  category: string
  description: string
  technologies: string[]
  github?: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'ali-gpt',
    title: 'Ali GPT',
    category: 'AI Chat Application',
    description:
      "Built a full-stack AI chatbot with multi-turn conversational context using OpenAI's GPT API. Engineered a secure backend with rate limiting, environment configuration, and production deployment on Render.",
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'OpenAI API'],
    github: GITHUB_LINKS.aliGpt || undefined,
    liveUrl: PROJECT_LINKS.aliGpt || undefined,
    featured: true,
  },
  {
    number: '02',
    slug: 'apna-video-call',
    title: 'Apna Video Call',
    category: 'Real-Time Communication Platform',
    description:
      'Implemented peer-to-peer video calling using WebRTC with Socket.io-based signaling architecture. Delivered a responsive cross-device interface with room-based call management.',
    technologies: ['React', 'Node.js', 'WebRTC', 'Socket.io'],
    github: GITHUB_LINKS.apnaVideoCall || undefined,
    liveUrl: PROJECT_LINKS.apnaVideoCall || undefined,
    featured: true,
  },
  {
    number: '03',
    slug: 'ali-irctic',
    title: 'Ali Irctic',
    category: 'AI Railway Booking Platform',
    description:
      'Developed an AI-powered smart recommendation engine and booking workflow using Next.js and MongoDB. Integrated Three.js for interactive 3D UI experiences.',
    technologies: ['Next.js', 'Three.js', 'MongoDB', 'AI Integration'],
    github: GITHUB_LINKS.aliIrctic || undefined,
    liveUrl: PROJECT_LINKS.aliIrctic || undefined,
  },
  {
    number: '04',
    slug: 'zerodha-clone',
    title: 'Zerodha Clone',
    category: 'Trading Dashboard',
    description:
      'Built a trading dashboard inspired by modern stock trading platforms with responsive dashboards, market workflows, and a MERN backend.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: GITHUB_LINKS.zerodhaClone || undefined,
    liveUrl: PROJECT_LINKS.zerodhaClone || undefined,
  },
  {
    number: '05',
    slug: 'chatapp',
    title: 'ChatApp',
    category: 'Mobile Messaging Application',
    description:
      'Built a real-time WhatsApp-style mobile messaging application with Firebase authentication, Firestore persistence, and cross-platform testing.',
    technologies: ['React Native', 'Firebase', 'Expo'],
    github: GITHUB_LINKS.chatApp || undefined,
  },
  {
    number: '06',
    slug: 'airbnb-clone',
    title: 'Airbnb Clone',
    category: 'Full-Stack Rental Marketplace',
    description:
      'Developed a property listing marketplace with search, filtering, and booking flows.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github: GITHUB_LINKS.airbnbClone || undefined,
    liveUrl: PROJECT_LINKS.airbnbClone || undefined,
  },
]

export type ClientProject = {
  name: string
  category: string
  technologies: string[]
  website: string
  description: string
}

export const clientProjects: ClientProject[] = [
  {
    name: 'AutoExcelPro',
    category: 'Business Automation Platform',
    technologies: ['Next.js'],
    website: 'https://autoexcelpro.com',
    description:
      'Built workflow automation and Excel analytics dashboards enabling non-technical users to manage business data.',
  },
  {
    name: 'Dunex Dubai',
    category: 'Real Estate Booking Platform',
    technologies: ['Next.js', 'MongoDB', 'React Native'],
    website: 'https://dunexdubai.com',
    description:
      'Developed a dynamic property listing platform with search, filtering, and cross-platform booking for the Dubai market.',
  },
  {
    name: 'MPCPCT',
    category: 'Coaching & Education Platform',
    technologies: ['Next.js', 'React Native', 'MongoDB'],
    website: 'https://mpcpct.com',
    description:
      'Built student enrollment, course management, and cross-platform web + mobile experiences for a coaching institute.',
  },
  {
    name: 'Digital Career Center',
    category: 'EdTech SaaS',
    technologies: ['Next.js', 'MongoDB'],
    website: 'https://digitalcareercenter.com',
    description:
      'Integrated payment gateway, video streaming, referral system, and user authentication for a full-featured EdTech platform.',
  },
  {
    name: 'Vega Wealth Dubai',
    category: 'Financial Services Website',
    technologies: ['Next.js'],
    website: 'https://thevegawealth.com',
    description:
      'Delivered a high-performance, SEO-optimized enterprise website for a Dubai-based wealth management firm.',
  },
]
