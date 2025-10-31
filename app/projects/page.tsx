// app/projects/page.tsx
import Link from 'next/link'

type ProjectItem = {
  title: string
  description: string
  link: string
  tags?: string[]
}

export default function ProjectsPage() {
  const items: ProjectItem[] = [
{
    title: "CMS Performance & Accessibility Hardening",
    description:
      "Improved Drupal/WordPress site performance to 95+ Lighthouse scores and achieved WCAG 2.2 AA compliance.",
    link: "/projects/cms-hardening",
  },
  {
    title: "Maps Sync (Google & Apple)",
    description:
      "Automated management of 300+ store locations across Google and Apple Maps, ensuring consistent and accurate listings.",
    link: "/projects/maps-sync",
  },
  {
    title: "Mailchimp + UTM Dashboard Automation",
    description:
      "Built a cross-channel automation pipeline connecting Mailchimp campaigns, UTM tracking, and GA4 reports.",
    link: "/projects/automation/case-study",
  },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.title} className="rounded-2xl border bg-white dark:bg-zinc-900 shadow-soft p-5">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
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
