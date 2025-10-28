export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
        © {new Date().getFullYear()} Keejay • Built with Next.js • <a className="underline" href="/resume">Resume</a>
      </div>
    </footer>
  )
}
