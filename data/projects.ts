import { GITHUB_LINKS, PROJECT_LINKS } from '@/lib/constants'

export type ProjectTag = 'ai' | 'realtime' | 'mobile' | 'fullstack'

export const PROJECT_TAGS: { id: ProjectTag | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'realtime', label: 'Real-Time' },
  { id: 'mobile', label: 'Mobile' },
]

export type Project = {
  number: string
  slug: string
  title: string
  category: string
  description: string
  highlights?: string[]
  technologies: string[]
  tags: ProjectTag[]
  github?: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'batchx-amu',
    title: 'BatchX AMU',
    category: 'Department Platform · AMU Computer Science',
    description:
      'Cross-platform academic management platform for the AMU Department of Computer Science, connecting students and teachers through one centralized mobile app.',
    highlights: [
      'Timetable, attendance, notices, assignments, exams, notes/PYQs, faculty info and real-time class updates',
      'Teacher workflows for attendance, class management and cancellation/rescheduling push notifications',
      'Dynamic department structure supporting MCA, M.Sc. and B.Sc. Computer Science programs',
    ],
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Capacitor', 'Firebase'],
    tags: ['fullstack', 'mobile', 'realtime'],
    github: GITHUB_LINKS.batchx,
    liveUrl: PROJECT_LINKS.batchx,
    featured: true,
  },
  {
    number: '02',
    slug: 'flowforge-ai',
    title: 'FlowForge AI',
    category: 'AI Workflow Automation Platform',
    description:
      'AI-powered automation platform that lets users visually connect apps, APIs, logic and AI models to automate repetitive business processes.',
    highlights: [
      'Visual workflow builder on React Flow with multi-step flows, conditional logic and dynamic variables',
      'Webhooks and scheduled executions processed through Redis + BullMQ background queues',
    ],
    technologies: ['Next.js', 'TypeScript', 'React Flow', 'Node.js', 'MongoDB', 'Redis', 'BullMQ'],
    tags: ['ai', 'fullstack'],
    github: GITHUB_LINKS.flowForge,
    liveUrl: PROJECT_LINKS.flowForge,
    featured: true,
  },
  {
    number: '03',
    slug: 'devforge',
    title: 'DevForge',
    category: 'AI-Powered VS Code Developer Toolkit',
    description:
      'A VS Code extension that brings AI-assisted development and project analysis directly into the developer workflow.',
    highlights: [
      'React component generation, API generation, code explanation and code fixing',
      'Project analyzer detecting config gaps, missing scripts, code-quality and React-specific issues',
      'Extensible provider architecture for OpenAI-compatible and custom endpoints with secure key storage',
    ],
    technologies: ['TypeScript', 'VS Code API', 'Node.js', 'OpenAI API', 'Vitest'],
    tags: ['ai'],
    github: GITHUB_LINKS.devForge,
    featured: true,
  },
  {
    number: '04',
    slug: 'ali-gpt',
    title: 'Ali GPT',
    category: 'AI Chat Application',
    description:
      "Full-stack AI chatbot with multi-turn conversational context using OpenAI's GPT API, with a secure backend featuring rate limiting and production deployment on Render.",
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'OpenAI API'],
    tags: ['ai', 'fullstack'],
    github: GITHUB_LINKS.aliGpt,
    liveUrl: PROJECT_LINKS.aliGpt,
    featured: true,
  },
  {
    number: '05',
    slug: 'apna-video-call',
    title: 'Apna Video Call',
    category: 'Real-Time Communication Platform',
    description:
      'Peer-to-peer video calling built on WebRTC with a Socket.io signaling architecture, room-based call management and a responsive cross-device interface.',
    technologies: ['React', 'Node.js', 'WebRTC', 'Socket.io'],
    tags: ['realtime', 'fullstack'],
    github: GITHUB_LINKS.apnaVideoCall,
    liveUrl: PROJECT_LINKS.apnaVideoCall,
  },
  {
    number: '06',
    slug: 'ali-irctic',
    title: 'Ali Irctic',
    category: 'AI Railway Booking Platform',
    description:
      'AI-powered smart recommendation engine and booking workflow on Next.js and MongoDB, with Three.js for interactive 3D UI that sets it apart from standard booking platforms.',
    technologies: ['Next.js', 'Three.js', 'MongoDB', 'AI Integration'],
    tags: ['ai', 'fullstack'],
    github: GITHUB_LINKS.aliIrctic,
    liveUrl: PROJECT_LINKS.aliIrctic,
  },
  {
    number: '07',
    slug: 'zerodha-clone',
    title: 'Zerodha Clone',
    category: 'Trading Dashboard',
    description:
      'Core Zerodha trading platform rebuilt with responsive dashboards, market workflows and a MERN stack backend.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    tags: ['fullstack'],
    github: GITHUB_LINKS.zerodhaClone,
    liveUrl: PROJECT_LINKS.zerodhaClone,
  },
  {
    number: '08',
    slug: 'chatapp',
    title: 'ChatApp',
    category: 'Mobile Messaging Application',
    description:
      'Real-time WhatsApp-style mobile app with Firebase auth, Firestore persistence and cross-platform testing.',
    technologies: ['React Native', 'Firebase', 'Expo'],
    tags: ['mobile', 'realtime'],
    github: GITHUB_LINKS.chatApp,
    liveUrl: PROJECT_LINKS.chatApp || undefined,
  },
  {
    number: '09',
    slug: 'airbnb-clone',
    title: 'Airbnb Clone',
    category: 'Full-Stack Rental Marketplace',
    description: 'Property listing marketplace with search, filtering and booking flows.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    tags: ['fullstack'],
    github: GITHUB_LINKS.airbnbClone,
    liveUrl: PROJECT_LINKS.airbnbClone,
  },
]

export type ClientStat = { value: string; label: string }

export type ClientProject = {
  name: string
  category: string
  industry: string
  location: string
  technologies: string[]
  website: string
  description: string
  stats?: ClientStat[]
  /** Shipped under DevSphere Solutions */
  devsphere?: boolean
}

export const clientProjects: ClientProject[] = [
  {
    name: 'LaptopSecure',
    category: 'E-commerce / Laptop Marketplace',
    industry: 'E-commerce',
    location: 'Uttar Pradesh, India',
    technologies: ['Next.js', 'E-commerce', 'WhatsApp Orders', 'Repair Booking'],
    website: 'https://www.laptopsecure.in',
    description:
      'Premium laptop marketplace to buy, sell, upgrade and repair — new, refurbished and gaming laptops, custom PC builds, trade-ins and certified repairs, with WhatsApp ordering, EMI options and pan-India delivery.',
    stats: [
      { value: '25,000+', label: 'Customers' },
      { value: '4.9/5', label: 'Avg rating' },
    ],
    devsphere: true,
  },
  {
    name: 'Marina Muse International',
    category: 'E-commerce / Export & Manufacturing',
    industry: 'E-commerce',
    location: 'India · Global',
    technologies: ['Next.js', 'E-commerce', 'B2B Wholesale', 'AI Search'],
    website: 'https://marinamuseinternational.com',
    description:
      'B2C retail store and B2B wholesale platform for premium nautical instruments and handcrafted brass décor — trade accounts, bulk quotes, custom manufacturing, worldwide shipping and AI-powered product search.',
    stats: [
      { value: 'B2C + B2B', label: 'Storefronts' },
      { value: 'Worldwide', label: 'Shipping' },
    ],
    devsphere: true,
  },
  {
    name: 'The Vega Wealth',
    category: 'Finance / Wealth Management',
    industry: 'FinTech',
    location: 'Dubai, UAE',
    technologies: ['Next.js', 'Tailwind CSS', 'SEO Optimization', 'Lead Generation'],
    website: 'https://www.thevegawealth.com',
    description:
      'Premium, SEO-optimised website for a Dubai wealth management firm — financial planning, investment, insurance, estate and mortgage advisory, designed to turn visitors into consultations.',
    devsphere: true,
  },
  {
    name: 'Chacha Mobile CRM',
    category: 'CRM / Business Management',
    industry: 'SaaS & CRM',
    location: 'Western UP, India',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    website: 'https://chachamobile.in',
    description:
      'Spare-parts storefront plus a Tally-like sales & purchase CRM with inventory control, billing and customer tracking — built after a successful website delivery.',
    stats: [
      { value: '5,000+', label: 'SKUs managed' },
      { value: '1,200+', label: 'Partner shops' },
    ],
    devsphere: true,
  },
  {
    name: 'Krishi Kutumb',
    category: 'AgriTech / FPO Management',
    industry: 'AgriTech',
    location: 'India',
    technologies: ['Next.js', 'Mobile App', 'Multilingual', 'Offline-First'],
    website: 'https://krishikutumb.com',
    description:
      'FPO management platform and mobile app for farmer producer companies — members, governance, finance, GST and compliance in one register, in 10 Indic languages with an offline mode.',
    stats: [
      { value: '10', label: 'Indic languages' },
      { value: 'Offline', label: 'Lite mode' },
    ],
    devsphere: true,
  },
  {
    name: 'Dunex Dubai',
    category: 'Real Estate Booking Platform',
    industry: 'Real Estate',
    location: 'Dubai, UAE',
    technologies: ['Next.js', 'MongoDB', 'React Native'],
    website: 'https://dunexdubai.com',
    description:
      'Dynamic property listing platform with search, filtering and cross-platform booking for the Dubai market.',
  },
  {
    name: 'AS Job Placement & Finance',
    category: 'Visa & Immigration Consultancy',
    industry: 'Services',
    location: 'Uttar Pradesh, India',
    technologies: ['Next.js', 'Lead Generation', 'Local SEO', 'WhatsApp Integration'],
    website: 'https://www.asjobplacement.com',
    description:
      'Visa, passport, work-permit and immigration consultancy platform with country-wise applications, consultation booking, air-ticket and hotel services, and local SEO.',
    stats: [
      { value: '5,000+', label: 'Applications' },
      { value: '98%', label: 'Success rate' },
    ],
    devsphere: true,
  },
  {
    name: 'Fixigo Repair',
    category: 'Doorstep Repair Services',
    industry: 'Services',
    location: 'Uttar Pradesh, India',
    technologies: ['Next.js', 'WhatsApp Booking', 'Repair Tracking', 'Local SEO'],
    website: 'https://www.fixigorepair.in',
    description:
      'Doorstep electronics and home-appliance repair platform for Shamli, Meerut & Saharanpur — WhatsApp booking, live repair-status tracking, device recycling and local SEO.',
    stats: [
      { value: '4.9/5', label: 'Customer rating' },
      { value: '10+', label: 'Technicians' },
    ],
    devsphere: true,
  },
  {
    name: 'Royal Metro EV',
    category: 'Electric Vehicles / Brand Website',
    industry: 'Automotive',
    location: 'Uttar Pradesh, India',
    technologies: ['Next.js', 'Tailwind CSS', 'SEO Optimization', 'Performance Tuning'],
    website: 'https://royalmetroev.com',
    description:
      'Modern, SEO-optimised brand website for an electric-vehicle maker — futuristic UI, ultra-fast performance and a conversion-focused enquiry flow.',
    stats: [
      { value: '60V', label: 'Battery' },
      { value: '150 KM', label: 'Range' },
    ],
    devsphere: true,
  },
  {
    name: 'Crossline Cricket Stadium',
    category: 'Sports Booking Platform',
    industry: 'Sports',
    location: 'Uttar Pradesh, India',
    technologies: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
    website: 'https://crosslinecricketstadium.in',
    description:
      'Cricket stadium website with ground booking, admin slot management, match updates, income/expense tracking and inventory management.',
    devsphere: true,
  },
  {
    name: 'MPCPCT',
    category: 'EdTech / Exam Platform',
    industry: 'EdTech',
    location: 'Madhya Pradesh, India',
    technologies: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
    website: 'https://mpcpct.com',
    description:
      'Online exam-preparation and typing-test platform for CPCT and CCC aspirants — learning, skill-test and exam modes, Hindi/English typing and an admin dashboard.',
    devsphere: true,
  },
  {
    name: 'Digital Career Center',
    category: 'EdTech / IT Training',
    industry: 'EdTech',
    location: 'India',
    technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Node.js'],
    website: 'https://www.digitalcareercenter.com',
    description:
      'IT training and career platform with online, offline and self-paced courses — payment gateway, video streaming, referral system, certificates and a companion app.',
    devsphere: true,
  },
  {
    name: 'Auto Excel Pro',
    category: 'Business Operations Platform',
    industry: 'SaaS & CRM',
    location: 'Global',
    technologies: ['React', 'Node.js', 'Dashboard', 'Automation'],
    website: 'https://autoexcelpro.com',
    description:
      'Operations platform with workflow automation and Excel analytics dashboards that lets non-technical teams manage business data and customers.',
    devsphere: true,
  },
  {
    name: 'Info Gates',
    category: 'Business Website',
    industry: 'Services',
    location: 'India',
    technologies: ['Next.js', 'Tailwind CSS', 'SEO Optimization', 'Performance Tuning'],
    website: 'https://www.info-gates.com',
    description: 'Fast, SEO-friendly business website with a clean, responsive design and a conversion-focused enquiry flow.',
    devsphere: true,
  },
]

export const CLIENT_INDUSTRIES = ['All', ...Array.from(new Set(clientProjects.map((c) => c.industry)))]
