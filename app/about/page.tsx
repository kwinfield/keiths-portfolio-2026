// app/about/page.tsx
export const metadata = {
  title: 'About — Keith',
  description: 'Web developer with 8 years shipping accessible, performant sites for gov & enterprise.',
}

export default function AboutPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>About</h1>

      <p><strong>Hi, I’m Keith Winfield.</strong> I’m a web developer with 8 years of experience shipping accessible, performant sites for government and enterprise. I bridge “classic” CMS (Drupal/WordPress/PHP) and modern JavaScript (React/Next.js) so teams can move fast without sacrificing quality.</p>

      <h2>What I do well</h2>
      <ul>
        <li><strong>Accessibility & Performance:</strong> WCAG 2.2 AA fixes, Core Web Vitals (LCP/CLS) improvements, measured before→after impact.</li>
        <li><strong>CMS + Frontend:</strong> Drupal/WordPress theme & template work, PHP, HTML/CSS/JS, and modern React/Next.js builds.</li>
        <li><strong>Marketing Ops:</strong> GA4 events, Mailchimp, UTM standards, dashboards, and location data (Google/Apple Maps) at scale.</li>
      </ul>

      <h2>Recent highlights</h2>
      <ul>
        <li>Raised Lighthouse (mobile) to 95+ and closed WCAG 2.2 AA issues across high-traffic gov sites.</li>
        <li>Built a Maps Sync workflow for 300+ locations (Google & Apple) with import/export and validation.</li>
        <li>Shipped a Mailchimp + UTM pipeline (GA4 events, CSV export, dashboard), cutting campaign setup time by ~80%.</li>
      </ul>

      <h2>Tooling & stack</h2>
      <p>PHP, JavaScript/TypeScript, React, Next.js, Node; Drupal & WordPress; ASP.NET exposure; GitHub/GitLab, Vercel; Jira, ServiceNow, SharePoint; Adobe Creative Suite; GA4, Mailchimp, Hootsuite.</p>

      <h2>How I work</h2>
      <ul>
        <li>Define the measurable target (e.g., “LCP from 3.1s → 1.9s” or “reduce a11y violations 80%”).</li>
        <li>Ship in small slices; pair closely with content and dev teams.</li>
        <li>Document the change and capture the before→after evidence.</li>
      </ul>

      <h2>What I’m looking for</h2>
      <p>Roles where I blend CMS and modern JS to deliver accessible, performant UI—Senior Web Developer, Frontend Engineer, or Web Technologist roles in gov/enterprise.</p>

      <h2>Links</h2>
      <ul>
        <li><a href="/projects">Projects</a> — case studies with metrics</li>
        <li><a href="/resume">Resume</a> — PDF download available</li>
        <li><a href="https://www.linkedin.com/in/keith-winfield-jr/" target="_blank">LinkedIn</a></li>
        <li><a href="https://github.com/kwinfield" target="_blank">GitHub</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </article>
  )
}
