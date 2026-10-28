import type { Metadata } from 'next'
import { DEVSPHERE, SEO, SITE, SOCIAL } from '@/lib/constants'

type PageMetaOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  absolute?: boolean
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  absolute = false,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`
  const ogTitle = absolute ? title : `${title} | ${SITE.name}`

  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords: keywords.length ? [...SEO.keywords, ...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: ['/opengraph-image'],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}

export function getPersonJsonLd() {
  const socialLinks = [SOCIAL.github, SOCIAL.linkedin, DEVSPHERE.url]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.name,
        givenName: 'Ali',
        familyName: 'Saqulain',
        alternateName: ['Ali Saqulain Developer', 'Ali Saqulain Portfolio', 'Ali Saqulain Full Stack'],
        url: SITE.url,
        image: `${SITE.url}/images/avatar.svg`,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        jobTitle: SITE.title,
        worksFor: { '@id': `${SITE.url}/#devsphere` },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Aligarh Muslim University' },
          { '@type': 'CollegeOrUniversity', name: 'Maa Shakumbhari University' },
        ],
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
          'LLM Applications',
          'Redis',
          'BullMQ',
          'WebRTC',
          'Mobile Development',
          'Cloud Deployment',
          'SEO Optimization',
          'SaaS Development',
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#devsphere`,
        name: DEVSPHERE.name,
        url: DEVSPHERE.url,
        email: DEVSPHERE.email,
        description: DEVSPHERE.tagline,
        founder: { '@id': `${SITE.url}/#person` },
        areaServed: [...DEVSPHERE.markets],
        knowsAbout: [...DEVSPHERE.services],
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
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/projects`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profile`,
        url: SITE.url,
        name: `${SITE.name} — Official Portfolio`,
        description: SEO.description,
        isPartOf: { '@id': `${SITE.url}/#website` },
        mainEntity: { '@id': `${SITE.url}/#person` },
        about: { '@id': `${SITE.url}/#person` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#services`,
        name: `${SITE.name} — Full-Stack Engineering`,
        url: SITE.url,
        image: `${SITE.url}/opengraph-image`,
        description: SEO.description,
        provider: { '@id': `${SITE.url}/#person` },
        areaServed: ['India', 'Dubai', 'Oman', 'Global'],
        serviceType: [...DEVSPHERE.services],
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
      item: item.path === '/' ? SITE.url : `${SITE.url}${item.path}`,
    })),
  }
}

export function getProjectsItemListJsonLd(
  projects: { name: string; description: string; url?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ali Saqulain — Featured Projects & Client Work',
    description: 'Production systems, SaaS platforms and client products shipped by Ali Saqulain.',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        ...(project.url ? { url: project.url } : {}),
        author: { '@id': `${SITE.url}/#person` },
      },
    })),
  }
}
