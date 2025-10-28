// app/page.tsx
import Button from '@/components/ui/button'
export default function HomePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Senior Web Developer — Drupal / WordPress / JS</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        8+ years delivering accessible, performant websites for government and enterprise.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/projects"><Button>View Projects</Button></a>
        <a href="/contact"><Button variant="outline">Contact</Button></a>
      </div>
    </section>
  )
}
