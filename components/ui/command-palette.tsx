'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Building2, Copy, CornerDownLeft, FileText, Github, Globe, Linkedin, Mail, Search, type LucideIcon } from 'lucide-react'
import { DEVSPHERE, NAV_LINKS, SITE, SOCIAL } from '@/lib/constants'
import { projects, clientProjects } from '@/data/projects'
import { PAGE_ICONS, getProjectVisual } from '@/lib/visuals'
import { getProjectHref } from '@/lib/links'
import { cn } from '@/lib/utils'

export const OPEN_PALETTE_EVENT = 'open-command-palette'

type Item = {
  id: string
  group: 'Pages' | 'Projects' | 'Client work' | 'Actions'
  label: string
  hint?: string
  icon: LucideIcon
  accent?: string
  run: () => unknown
}

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href)
    const ext = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer')

    return [
      { id: 'home', group: 'Pages', label: 'Home', icon: Globe, run: go('/') },
      ...NAV_LINKS.map((l) => ({
        id: `page-${l.href}`,
        group: 'Pages' as const,
        label: l.label,
        icon: PAGE_ICONS[l.label] ?? FileText,
        run: go(l.href),
      })),
      ...projects.map((p) => {
        const v = getProjectVisual(p.slug, p.title)
        const href = getProjectHref(p)
        return {
          id: `project-${p.slug}`,
          group: 'Projects' as const,
          label: p.title,
          hint: p.category,
          icon: v.icon,
          accent: v.accent,
          run: href.startsWith('http') ? ext(href) : go(href),
        }
      }),
      ...clientProjects.map((c) => ({
        id: `client-${c.name}`,
        group: 'Client work' as const,
        label: c.name,
        hint: c.category,
        icon: Globe,
        run: ext(c.website),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: SITE.email,
        icon: Copy,
        run: () => void navigator.clipboard?.writeText(SITE.email),
      },
      { id: 'email', group: 'Actions', label: 'Send an email', hint: SITE.email, icon: Mail, run: () => (window.location.href = `mailto:${SITE.email}`) },
      { id: 'github', group: 'Actions', label: 'Open GitHub', hint: 'github.com/Alisaqulain', icon: Github, run: ext(SOCIAL.github) },
      { id: 'linkedin', group: 'Actions', label: 'Open LinkedIn', hint: 'in/alisaqulain', icon: Linkedin, run: ext(SOCIAL.linkedin) },
      { id: 'devsphere', group: 'Actions', label: `Visit ${DEVSPHERE.name}`, hint: 'devspheresolutions.com', icon: Building2, run: ext(DEVSPHERE.url) },
    ]
  }, [router])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const select = (item?: Item) => {
    if (!item) return
    close()
    item.run()
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(filtered[active])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  if (!open) return null

  let lastGroup = ''

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="animate-fade-in absolute inset-0 bg-black/70" onClick={close} />
      <div className="animate-fade-in relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(139,92,246,0.15)]">
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <Search size={17} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search pages, projects, clients…"
            className="h-14 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted/70 focus:outline-none"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
          />
          <kbd className="hidden shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">ESC</kbd>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">No results for “{query}”</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup
            lastGroup = item.group
            const Icon = item.icon
            return (
              <li key={item.id} role="presentation">
                {header && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">{item.group}</p>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => select(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    i === active ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]',
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <Icon size={15} style={item.accent ? { color: item.accent } : undefined} className={item.accent ? '' : 'text-violet-200'} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">{item.label}</span>
                    {item.hint && <span className="block truncate text-xs text-muted">{item.hint}</span>}
                  </span>
                  {i === active ? (
                    <CornerDownLeft size={14} className="shrink-0 text-muted" />
                  ) : (
                    item.group !== 'Pages' && item.group !== 'Actions' && <ArrowUpRight size={14} className="shrink-0 text-muted/50" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10px] text-muted">
          <span>↑↓ navigate · ↵ open</span>
          <span>{filtered.length} results</span>
        </div>
      </div>
    </div>
  )
}
