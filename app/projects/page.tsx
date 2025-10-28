export default function ProjectsPage() {
  const items = [
    { title: 'CMS Performance & Accessibility Hardening', summary: 'Drupal/WP, CWV + A11y improvements', link: '#' },
    { title: 'Maps Sync (300+ Locations)', summary: 'Google/Apple Maps bulk sync tool', link: '#' },
    { title: 'Mailchimp + UTM Dashboard', summary: 'Automation and analytics pipeline', link: '#' },
    { title: 'Headless Catalog Viewer', summary: 'Next.js product browsing UX', link: '#' },
  ]
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p.title} className="rounded-xl border p-4">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-zinc-600 mt-1">{p.summary}</p>
            <a className="inline-block mt-3 underline" href={p.link}>Case study</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
