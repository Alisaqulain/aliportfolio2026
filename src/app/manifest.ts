import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Portfolio`,
    short_name: SITE.name,
    description: 'Official portfolio of Ali Saqulain, Forward Deployed Engineer and Full-Stack Systems Developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070708',
    theme_color: '#070708',
    lang: 'en-IN',
    icons: [
      {
        src: '/images/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
  }
}
