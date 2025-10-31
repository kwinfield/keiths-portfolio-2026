// app/contact/page.tsx
export const metadata = {
  title: 'Contact — Keejay',
  description: 'Get in touch for roles and collaborations.',
}

export default function ContactPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Contact</h1>
      <p>If you’re hiring for web development (Drupal/WordPress, React/Next.js, accessibility, performance), I’d love to talk.</p>

      <h2>Email</h2>
      <p>
        <a href="mailto:keejay@example.com" className="underline">keejay@example.com</a>
      </p>

      <h2>Links</h2>
      <h2>Quick message</h2>
      <form
        action="https://formspree.io/f/yourFormId"
        method="POST"
        className="not-prose grid gap-3 max-w-md"
      >
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="rounded-xl border px-3 py-2 dark:bg-zinc-900"
        />
        <textarea
          name="message"
          placeholder="How can I help?"
          rows={5}
          required
          className="rounded-xl border px-3 py-2 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-2xl bg-brand px-4 py-2 text-white"
        >
          Send
        </button>
      </form>
      <ul>
        <li><a href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href="https://github.com/your-handle" target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a href="/resume">Resume</a></li>
        <li><a href="/projects">Projects</a></li>
      </ul>
    </article>
  )
}
