'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download, Printer } from 'lucide-react'
import { resume } from '@/data/resume'
import { formatPeriod } from '@/data/experience'
import { toTelHref } from '@/lib/links'
import { Reveal } from '@/components/ui/reveal'
import { TechIcon } from '@/components/ui/tech-icon'
import { Section, SectionLabel } from '@/components/ui/section'

export function ResumeView() {
  const printResume = () => window.print()

  return (
    <Section container="wide" className="pt-32 sm:pt-40 lg:pt-40">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <SectionLabel>Resume</SectionLabel>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={printResume}
            className="btn btn-secondary"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
          <Link
            href="/contact"
            className="btn btn-primary"
          >
            <Download size={14} /> Contact Me
          </Link>
        </div>
      </div>

      <Reveal>
        <article className="resume-document card mx-auto max-w-4xl p-7 sm:p-12 print:border-0 print:p-0">
          <header className="border-b border-border pb-8">
            <div className="flex flex-wrap items-start gap-5">
              <Image
                src="/images/avatar.svg"
                alt={resume.header.name}
                width={72}
                height={72}
                className="rounded-xl border border-border/80"
              />
              <div>
                <h1 className="text-gradient-soft text-3xl font-semibold tracking-tight sm:text-5xl print:text-black">{resume.header.name}</h1>
                <p className="mt-2 text-lg text-muted">{resume.header.title}</p>
                <p className="text-sm text-muted">{resume.header.subtitle}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
              <span>{resume.header.location}</span>
              <a href={`mailto:${resume.header.email}`} className="hover:text-foreground">{resume.header.email}</a>
              <a href={toTelHref(resume.header.phone)} className="hover:text-foreground">{resume.header.phone}</a>
              <a href={resume.header.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
              <a href={resume.header.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
              <a href={resume.header.company.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">DevSphere Solutions</a>
            </div>
          </header>

          <section className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{resume.summary}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Highlights</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {resume.highlights.map((item) => (
                <li key={item} className="text-sm text-foreground/90 before:mr-2 before:text-muted before:content-['—']">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Experience</h2>
            <div className="mt-5 space-y-8">
              {resume.experience.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium">{job.role}</h3>
                    <p className="font-mono text-xs text-muted">{formatPeriod(job)}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.company} · {job.location}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground/85">
                    {job.description.map((line) => (
                      <li key={line} className="before:mr-2 before:text-muted before:content-['•']">{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Selected Projects</h2>
            <div className="mt-5 space-y-5">
              {resume.projects.slice(0, 6).map((project) => (
                <div key={project.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    <span className="flex gap-3 font-mono text-[11px] text-muted">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Live Demo</a>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{project.category}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{project.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-muted">{project.technologies.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Client Work · DevSphere Solutions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {resume.clientProjects.map((client) => (
                <div key={client.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <h3 className="text-sm font-medium">{client.name}</h3>
                  <p className="text-xs text-muted">{client.category}</p>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-mono text-[11px] text-muted transition-colors hover:text-foreground"
                  >
                    {client.website.replace('https://', '')}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Technical Skills</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {resume.skills.map((group) => (
                <div key={group.id}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-foreground">{group.label}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 text-sm text-muted">
                        <TechIcon name={item} size={12} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300 print:text-black">Education</h2>
            <div className="mt-3 space-y-4">
              {resume.education.map((item) => (
                <div key={item.short}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium">
                      {item.degree} ({item.short})
                    </p>
                    <p className="font-mono text-xs text-muted">{item.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {item.institution} · {item.location}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </Reveal>
    </Section>
  )
}
