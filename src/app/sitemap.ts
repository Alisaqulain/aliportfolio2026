import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const routes: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/experience', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/devsphere', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/skills', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/resume', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
