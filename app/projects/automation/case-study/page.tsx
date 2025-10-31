import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Mailchimp + UTM Dashboard — Case Study',
  description: 'Landing form with UTM capture, GA4 events, Mailchimp subscribe, and CSV/chart demo.',
}

export default function AutomationCaseStudy() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Mailchimp + UTM Dashboard</h1>
      <ul className="not-prose mt-2 mb-6 grid gap-2 text-sm">
        <li>• Campaigns instrumented: <strong>40+</strong></li>
        <li>• UTM tagging time: <strong>30 min</strong> → <strong>~5 min</strong> per campaign</li>
        <li>• Attribution accuracy: <strong>+60%</strong> (GA4)</li>
      </ul>

      <p>
        <strong>Role:</strong> Developer • <strong>Stack:</strong> Next.js, TypeScript, Tailwind, GA4, Mailchimp API, Recharts
      </p>

      <h2>Context</h2>
      <p>
        Many campaigns need a simple, robust way to capture UTM parameters, track conversions, and sync subscribers
        to Mailchimp. This demo shows a compact, production-style flow I use to move quickly while keeping data clean.
      </p>

      <h2>What I shipped</h2>
      <ul>
        <li>Landing form that <strong>captures UTM</strong> from the URL</li>
        <li><strong>GA4 events</strong> (lead_submit, lead_success) with route tracking</li>
        <li><strong>Mailchimp integration</strong> via Next.js API route (double opt-in configurable)</li>
        <li>Local <strong>leads table</strong> for demo, with CSV export</li>
        <li>Mini <strong>dashboard chart</strong> (leads by campaign)</li>
      </ul>

      <h2>Live demo</h2>
      <p>
        Try it with UTMs: {' '}
        <Link href="/projects/automation?utm_source=linkedin&utm_medium=cpc&utm_campaign=portfolio" className="underline">
          Automation Demo
        </Link>
      </p>

      <h2>Impact</h2>
      <ul>
        <li><strong>Operator speed:</strong> CSV export + quick charting cuts analysis friction</li>
        <li><strong>Attribution:</strong> UTM capture standardizes source/medium/campaign across channels</li>
        <li><strong>Deliverability:</strong> Double opt-in via status=<code>pending</code> when desired</li>
      </ul>

      <h2>Code highlights</h2>
      <ul>
        <li><code>app/api/subscribe/route.ts</code>: secure server-side Mailchimp calls</li>
        <li><code>lib/utm.ts</code>: UTM parsing + local lead storage</li>
        <li><code>lib/csv.ts</code>: CSV export for analysis</li>
        <li><code>components/charts/leads-by-campaign.tsx</code>: dynamic Recharts for client-only render</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>Persist to Supabase (RLS) + admin auth with audit history</li>
        <li>Dashboard: time series by day, source/medium split, and conversion funnel</li>
        <li>Webhook to Slack on new high-intent leads</li>
      </ul>
    </article>
  )
}
