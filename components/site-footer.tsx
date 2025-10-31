// components/site-footer.tsx
import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Keith Winfield. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/resume" className="hover:underline">Resume</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
