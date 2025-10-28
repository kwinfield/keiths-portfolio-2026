import Image from 'next/image'

export const metadata = {
  title: 'Maps Sync — Google & Apple CSV Admin (Case Study)',
  description:
    'Demo admin for managing 300+ locations with import/export to Google Business Profiles and Apple Business Connect.',
}

export default function MapsSyncCaseStudy() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Maps Sync — Google &amp; Apple CSV Admin</h1>
      <p>
        <strong>Role:</strong> Lead Developer · <strong>Stack:</strong> Next.js, TypeScript, Tailwind, Zod ·
        <strong> Focus:</strong> Data quality, import/export reliability, operator speed
      </p>

      <h2>Context</h2>
      <p>
        At R.E. Michel I owned ongoing updates for 300+ locations in Google Maps and Apple Maps. This demo shows a
        simplified toolchain I’d build to reduce manual work, prevent data drift, and safely import/export listings in bulk.
      </p>

      <h2>What I shipped</h2>
      <ul>
        <li>Admin UI to <strong>add/edit/delete</strong> locations with client-side validation</li>
        <li><strong>CSV Import</strong> (Google Business Profiles / Apple Business Connect / template)</li>
        <li><strong>CSV Export</strong> to both platforms with correct headers &amp; quoting</li>
        <li>Duplicate detection (name + address + postal) and local persistence for demo</li>
      </ul>

      <h2>Impact</h2>
      <ul>
        <li><strong>Operator time:</strong> Bulk edits &amp; import/export → <em>~5–8× faster</em> than manual portals</li>
        <li><strong>Data quality:</strong> Zod validation + dedupe → fewer bad rows in uploads</li>
        <li><strong>Repeatability:</strong> Consistent column formats for both platforms</li>
      </ul>

      <h2>Screenshots</h2>
      <p className="text-sm">
        Replace these with your real screenshots (drop into <code>/public/case-studies/maps-sync/</code>).
      </p>
      <Image
        alt="Locations admin UI"
        src="/case-studies/maps-sync/locations-admin.png"
        width={1400}
        height={900}
      />
      <Image
        alt="CSV export success"
        src="/case-studies/maps-sync/export-success.png"
        width={1400}
        height={900}
      />

      <h2>How it works</h2>
      <ol>
        <li>Operators add/edit locations or <strong>import</strong> a CSV (Google/Apple/template)</li>
        <li>Incoming rows are parsed, validated, and deduped</li>
        <li>Operators review &amp; fix fields inline</li>
        <li>Export buttons generate <strong>Google</strong> or <strong>Apple</strong> CSVs for upload</li>
      </ol>

      <h2>Code highlights</h2>
      <ul>
        <li><code>lib/csv.ts</code> — CSV escape/parse, Google/Apple mappers, BOM support for Excel</li>
        <li><code>lib/location-types.ts</code> — Zod schema with clear user messages</li>
        <li><code>lib/location-dedupe.ts</code> — duplicate detection keys</li>
        <li><code>app/projects/locations/page.tsx</code> — UI, import/export actions</li>
      </ul>

      <h2>Try it</h2>
      <p>
        Open the live demo: <a href="/projects/locations">Locations Admin</a> · Use <em>Import CSV</em> with the template, then export to Google/Apple.
      </p>

      <h2>Notes &amp; next steps</h2>
      <ul>
        <li>Optional: add geocoding + address validation and error queues</li>
        <li>Optional: persist to Supabase and add audit history &amp; user roles</li>
        <li>Optional: API integration to push updates directly</li>
      </ul>
    </article>
  )
}
