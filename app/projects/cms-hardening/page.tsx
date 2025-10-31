import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'CMS Performance & Accessibility Hardening — Case Study' }

export default function CaseStudy() {
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1>CMS Performance & Accessibility Hardening</h1>
      <ul className="not-prose mt-2 mb-6 grid gap-2 text-sm">
        <li>• Locations managed: <strong>300+</strong></li>
        <li>• Update turnaround: <strong>2 days</strong> → <strong>~2 hours</strong></li>
        <li>• Sync accuracy: <strong>100%</strong> verified post-launch</li>
      </ul>
      <p className="not-prose">
        <Link
            href="/projects"
            className="inline-block rounded-2xl bg-brand px-4 py-2 text-white"
          >
            ← Back to Projects
        </Link>
      </p>
      <p><strong>Role:</strong> Lead Developer • <strong>Stack:</strong> Next.js, Tailwind, GA4 • <strong>Focus:</strong> Core Web Vitals & WCAG 2.2</p>

      <h2>Context</h2>
      <p>Modernize a portfolio page to demonstrate measurable improvements in Core Web Vitals and accessibility, similar to the work I do in Drupal/WordPress environments.</p>

      <h2>What I shipped</h2>
      <ul>
        <li>Image optimization with <code>next/image</code> and priority hints</li>
        <li>Font loading via Next.js fonts (<code>display: swap</code>)</li>
        <li>Client/server boundaries & dynamic import of non-critical UI</li>
        <li>GA4 integration with route-change tracking</li>
        <li>Skip link, semantic landmarks, focus-visible styles, contrast fixes</li>
      </ul>

      <h2>Impact</h2>
      <ul>
        <li><strong>Lighthouse Perf (Mobile):</strong> <em>before</em>  ❯  <em>after</em></li>
        <li><strong>LCP:</strong> <em>before</em> s ❯ <em>after</em> s</li>
        <li><strong>CLS:</strong> <em>before</em> ❯ <em>after</em></li>
        <li><strong>Requests / Page Weight:</strong> <em>before</em> ❯ <em>after</em></li>
      </ul>

      <h2>Evidence</h2>
      <p>Attach screenshots below (before/after Lighthouse/WebPageTest):</p>
      {/* Replace with real images you upload into /public/case-studies */}
      <Image alt="Before Lighthouse" src="/case-studies/lh-before.png" width={1200} height={800}/>
      <Image alt="After Lighthouse" src="/case-studies/lh-after.png" width={1200} height={800}/>

      <h2>Notes</h2>
      <ul>
        <li>Considerations for gov-grade a11y (WCAG 2.2 AA)</li>
        <li>Tradeoffs: code-splitting vs. UX continuity; third-party scripts</li>
      </ul>
    </article>
  )
}
