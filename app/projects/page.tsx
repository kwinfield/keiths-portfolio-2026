// app/projects/page.tsx
import { Card, CardBody, CardMeta, CardTitle } from '@/components/ui/card'
import Tag from '@/components/ui/tag'

export default function ProjectsPage() {
  const items = [
    { title: 'CMS Performance & Accessibility', summary: 'Drupal/WP, CWV + A11y improvements', tags: ['Drupal','WordPress','A11y'] },
    { title: 'Maps Sync (300+ Locations)', summary: 'Google/Apple Maps bulk sync tool', tags: ['GA4','Locations'] },
    { title: 'Mailchimp + UTM Dashboard', summary: 'Automation and analytics pipeline', tags: ['Mailchimp','Supabase','Next.js'] },
    { title: 'Headless Catalog Viewer', summary: 'Next.js product browsing UX', tags: ['Next.js','Search','UI'] },
  ]
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map((p) => (
          <Card key={p.title}>
            <CardBody>
              <CardTitle>{p.title}</CardTitle>
              <CardMeta>{p.summary}</CardMeta>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
              <a className="mt-4 inline-block underline" href="#">Case study</a>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
