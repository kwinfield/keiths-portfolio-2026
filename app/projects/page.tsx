// app/projects/page.tsx
import Link from 'next/link'

type ProjectItem = {
  title: string
  summary: string
  link: string
  tags?: string[]
}

export default function ProjectsPage() {
  const items: ProjectItem[] = [
    { title: 'CMS Performance & Accessibility', summary: 'Drupal/WP, CWV + A11y improvements', link: '/projects/cms-hardening', tags: ['Drupal','WordPress','A11y'] },
    { title: 'Maps Sync (300+ Locations)', summary: 'Google/Apple Maps bulk sync admin + CSV import/export', link: '/projects/maps-sync', tags: ['Locations','Ops'] },
    { title: 'Mailchimp + UTM Dashboard', summary: 'UTM capture, GA4 events, Mailchimp subscribe, CSV + chart', link: '/projects/automation/case-study', tags: ['Mailchimp','GA4','UTM'] },
    { title: 'Headless Catalog Viewer', summary: 'Next.js product browsing UX', link: '#', tags: ['Next.js','Search','UI'] },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.title} className="rounded-2xl border bg-white dark:bg-zinc-900 shadow-soft p-5">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{p.summary}</p>
            {p.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map(t => <span key={t} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">{t}</span>)}
              </div>
            )}
            <Link className="mt-4 inline-block underline" href={p.link}>Case study</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
