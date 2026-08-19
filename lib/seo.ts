import type { Metadata } from 'next'
import { SEO, SITE } from '@/lib/constants'

type PageMetaOptions = {
  title: string
  description: string
  path: string
}

export function createPageMetadata({ title, description, path }: PageMetaOptions): Metadata {
  const url = `${SITE.url}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${SITE.name} — ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: ['/opengraph-image'],
    },
  }
}

export function getPersonJsonLd() {
  const socialLinks = [process.env.NEXT_PUBLIC_GITHUB_URL, process.env.NEXT_PUBLIC_LINKEDIN_URL].filter(
    (u): u is string => typeof u === 'string' && u.length > 0 && !u.includes('PLACEHOLDER'),
  )

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.name,
        givenName: 'Ali',
        familyName: 'Saqulain',
        alternateName: ['Ali Saqulain Developer', 'Ali Saqulain Portfolio'],
        url: SITE.url,
        image: `${SITE.url}/images/avatar.svg`,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        jobTitle: SITE.title,
        description: SEO.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Delhi-NCR',
          addressRegion: 'Delhi',
          addressCountry: 'IN',
        },
        sameAs: [...new Set([...socialLinks, SITE.url])],
        knowsAbout: [
          'Next.js',
          'React',
          'Node.js',
          'TypeScript',
          'Full-Stack Development',
          'Forward Deployed Engineering',
          'AI Integration',
          'Mobile Development',
          'Cloud Deployment',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: `${SITE.name} — Portfolio`,
        alternateName: 'Ali Saqulain Portfolio',
        url: SITE.url,
        description: SEO.description,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE.url}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profile`,
        url: SITE.url,
        name: `${SITE.name} — Official Portfolio`,
        description: SEO.description,
        isPartOf: { '@id': `${SITE.url}/#website` },
        mainEntity: { '@id': `${SITE.url}/#person` },
      },
    ],
  }
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}
