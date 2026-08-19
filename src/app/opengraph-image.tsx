import { ImageResponse } from 'next/og'
import { SITE, SEO } from '@/lib/constants'

export const runtime = 'edge'
export const alt = SEO.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#070708',
          color: '#f4f4f5',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            AS
          </div>
          <div style={{ fontSize: 18, letterSpacing: '0.18em' }}>ALI SAQULAIN</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Ali Saqulain
          </div>
          <div style={{ fontSize: 22, color: '#a1a1aa', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            Forward Deployed Engineer
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2, color: '#e4e4e7' }}>
            Full-Stack Systems Developer · Web · Mobile · AI
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717a', fontSize: 20 }}>
          <span>{SITE.location}</span>
          <span>{SITE.email}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
