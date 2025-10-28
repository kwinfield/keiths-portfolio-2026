'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './theme-toggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-zinc-900/80">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">Keejay.dev</Link>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav className={`md:flex gap-4 ${open ? 'block' : 'hidden'} md:block`}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-2 py-1 rounded-md hover:underline ${
                pathname === l.href ? 'font-semibold underline' : ''
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <nav className={`md:flex gap-4 ${open ? 'block' : 'hidden'} md:block`}> ... </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
