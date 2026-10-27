import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Briefcase,
  Building2,
  Cloud,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Layers,
  Mail,
  MessageCircle,
  Puzzle,
  Sparkles,
  TrainFront,
  TrendingUp,
  User,
  Video,
  Workflow,
} from 'lucide-react'

export type ProjectVisual = {
  icon: LucideIcon
  accent: string
  gradient: string
  initials: string
}

export const PROJECT_VISUALS: Record<string, ProjectVisual> = {
  'batchx-amu': {
    icon: GraduationCap,
    accent: '#14B8A6',
    gradient: 'from-teal-500/20 via-teal-500/5 to-transparent',
    initials: 'BX',
  },
  'flowforge-ai': {
    icon: Workflow,
    accent: '#A855F7',
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    initials: 'FF',
  },
  devforge: {
    icon: Puzzle,
    accent: '#0EA5E9',
    gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
    initials: 'DF',
  },
  'ali-gpt': {
    icon: Bot,
    accent: '#10A37F',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    initials: 'AG',
  },
  'apna-video-call': {
    icon: Video,
    accent: '#3B82F6',
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    initials: 'VC',
  },
  'ali-irctic': {
    icon: TrainFront,
    accent: '#F59E0B',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    initials: 'AI',
  },
  'zerodha-clone': {
    icon: TrendingUp,
    accent: '#22C55E',
    gradient: 'from-green-500/20 via-green-500/5 to-transparent',
    initials: 'ZC',
  },
  chatapp: {
    icon: MessageCircle,
    accent: '#8B5CF6',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    initials: 'CA',
  },
  'airbnb-clone': {
    icon: Home,
    accent: '#EF4444',
    gradient: 'from-red-500/20 via-red-500/5 to-transparent',
    initials: 'AB',
  },
}

export const CLIENT_ACCENTS: Record<string, string> = {
  LaptopSecure: '#3B82F6',
  'Marina Muse International': '#D4AF37',
  'The Vega Wealth': '#C9A227',
  'Chacha Mobile CRM': '#F97316',
  'Krishi Kutumb': '#22C55E',
  'Dunex Dubai': '#0EA5E9',
  'AS Job Placement & Finance': '#6366F1',
  'Fixigo Repair': '#EF4444',
  'Royal Metro EV': '#10B981',
  'Crossline Cricket Stadium': '#84CC16',
  MPCPCT: '#8B5CF6',
  'Digital Career Center': '#F59E0B',
  'Auto Excel Pro': '#16A34A',
  'Info Gates': '#06B6D4',
}

export function getClientAccent(name: string) {
  return CLIENT_ACCENTS[name] ?? '#a78bfa'
}

export const PAGE_ICONS: Record<string, LucideIcon> = {
  About: User,
  Experience: Briefcase,
  Projects: FolderKanban,
  DevSphere: Building2,
  Skills: Layers,
  Resume: FileText,
  Contact: Mail,
}

export const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  'Full-Stack Products': Layers,
  'AI-Powered Applications': Sparkles,
  'Real-Time & Distributed': Video,
  'Mobile Applications': MessageCircle,
  'Business Platforms': Briefcase,
  'Deployment & Infrastructure': Cloud,
}

export function getProjectVisual(slug: string, title: string): ProjectVisual {
  if (PROJECT_VISUALS[slug]) return PROJECT_VISUALS[slug]
  return {
    icon: Sparkles,
    accent: '#a1a1aa',
    gradient: 'from-zinc-500/20 to-transparent',
    initials: title.slice(0, 2).toUpperCase(),
  }
}

export function getDomainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export function getFaviconUrl(url: string, size = 128) {
  const domain = getDomainFromUrl(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
}

/** Live screenshot of a public site (WordPress mShots — free, cached, no key) */
export function getScreenshotUrl(url: string, width = 1200) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${Math.round(width * 0.625)}`
}
