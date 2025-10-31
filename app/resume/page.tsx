// app/resume/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'Resume — Keith Winfield',
  description: 'Downloadable resume and quick highlights.',
}

export default function ResumePage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Resume</h1>

      <p className="not-prose">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-2xl bg-brand px-4 py-2 text-white"
        >
          Download PDF
        </a>
        <span className="ml-3 text-sm text-zinc-500">(<Link href="/resume.pdf">open in browser</Link>)</span>
      </p>

      <h2>Highlights</h2>
      <ul>
        <li>Raised Lighthouse (mobile) to <strong>95+</strong>; improved LCP from <strong>~3.4s → ~1.9s</strong>.</li>
        <li>Closed major WCAG 2.2 AA issues across high-traffic gov pages (−<strong>~85%</strong> violations).</li>
        <li>Managed <strong>300+</strong> Google/Apple Maps listings; updates cut from <strong>2 days → ~2 hours</strong>.</li>
        <li>Built Mailchimp + UTM + GA4 pipeline; campaign setup time reduced by <strong>~80%</strong>.</li>
        <li>Stacks: Drupal, WordPress, PHP, React/Next.js, ASP.NET; Jira, ServiceNow, GitLab/GitHub, GA4, Mailchimp.</li>
      </ul>

      <h2>Links</h2>
      <ul>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </article>
  )
}
