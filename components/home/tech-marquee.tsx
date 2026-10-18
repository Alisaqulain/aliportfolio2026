import { skillCategories } from '@/data/skills'
import { TechIcon } from '@/components/ui/tech-icon'

const ITEMS = skillCategories.flatMap((cat) => cat.items.slice(0, 4))

export function TechMarquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <section className="hover-pause relative border-y border-white/[0.06] bg-white/[0.015] py-5" aria-label="Technologies">
      <div data-inview className="mask-fade-x overflow-hidden">
        <ul className="loop animate-marquee flex w-max gap-3">
          {doubled.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              aria-hidden={i >= ITEMS.length}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 font-mono text-xs text-muted"
            >
              <TechIcon name={tech} size={15} />
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
