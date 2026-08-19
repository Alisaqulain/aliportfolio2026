import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SEO, SITE } from '@/lib/constants'
import { getPersonJsonLd } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: `%s | ${SITE.name}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'technology',
  openGraph: {
    title: SEO.ogTitle,
    description: SEO.description,
    url: SITE.url,
    siteName: `${SITE.name} Portfolio`,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SEO.ogTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.ogTitle,
    description: SEO.description,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [{ url: '/images/logo.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
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
  verification: {
    // Add after Google Search Console setup:
    // google: 'your-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getPersonJsonLd()

  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
