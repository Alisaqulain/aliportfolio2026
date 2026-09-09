/** Returns true for http(s), mailto, and tel URLs that are safe to render */
export function isValidHref(url?: string | null): url is string {
  if (!url?.trim()) return false
  if (/PLACEHOLDER/i.test(url)) return false
  if (/^(https?:\/\/|mailto:|tel:)/.test(url)) {
    try {
      if (url.startsWith('mailto:') || url.startsWith('tel:')) return true
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  return url.startsWith('/')
}

export function toTelHref(phone: string) {
  return `tel:${phone.replace(/[\s()-]/g, '')}`
}

export function getProjectHref(project: { liveUrl?: string; github?: string }) {
  if (isValidHref(project.liveUrl)) return project.liveUrl
  if (isValidHref(project.github)) return project.github
  return '/projects'
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}
