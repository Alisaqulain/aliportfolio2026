import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Briefcase,
  Cloud,
  FileText,
  FolderKanban,
  Home,
  Layers,
  Mail,
  MessageCircle,
  Sparkles,
  TrainFront,
  TrendingUp,
  User,
  Video,
} from 'lucide-react'

export type ProjectVisual = {
  icon: LucideIcon
  accent: string
  gradient: string
  initials: string
}

export const PROJECT_VISUALS: Record<string, ProjectVisual> = {
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

export const CLIENT_VISUALS: Record<string, { initials: string; accent: string; gradient: string }> = {
  AutoExcelPro: { initials: 'AE', accent: '#2563EB', gradient: 'from-blue-500/20 to-transparent' },
  'Dunex Dubai': { initials: 'DD', accent: '#0EA5E9', gradient: 'from-sky-500/20 to-transparent' },
  MPCPCT: { initials: 'MP', accent: '#8B5CF6', gradient: 'from-violet-500/20 to-transparent' },
  'Digital Career Center': { initials: 'DC', accent: '#F97316', gradient: 'from-orange-500/20 to-transparent' },
  'Vega Wealth Dubai': { initials: 'VW', accent: '#D4AF37', gradient: 'from-yellow-500/20 to-transparent' },
}

export const PAGE_ICONS: Record<string, LucideIcon> = {
  About: User,
  Experience: Briefcase,
  Projects: FolderKanban,
  Skills: Layers,
  Resume: FileText,
  Contact: Mail,
}

export const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  'Full-Stack Products': Layers,
  'AI-Powered Applications': Sparkles,
  'Real-Time Systems': Video,
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
