export const metadata = { title: 'Resume — Keejay' }
export default function ResumePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Resume</h1>
      <p className="mt-2 text-zinc-600">Download the PDF or view highlights below.</p>
      <a className="mt-4 inline-block rounded-xl border px-4 py-2" href="/resume.pdf">Download PDF</a>
      <div className="mt-6 space-y-3">
        <h2 className="font-semibold">Experience</h2>
        <ul className="list-disc ml-5">
          <li>Gov Agency — PHP Dev / Content Manager (Drupal/WP, accessibility, performance)</li>
          <li>R.E. Michel — Web & Social Media (frontend revamp, Airtemp app, Mailchimp, GA4)</li>
        </ul>
      </div>
    </div>
  )
}
