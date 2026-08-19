import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const routes = ['', '/about', '/experience', '/projects', '/skills', '/resume', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
