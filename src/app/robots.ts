import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mca', '/mca-amu', '/api/', '/check'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/about', '/projects', '/devsphere', '/experience', '/skills', '/resume', '/contact'],
        disallow: ['/mca', '/mca-amu', '/api/', '/check'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
