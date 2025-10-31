// components/site-header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <div className="container mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Keith Winfield<span className="text-brand">.</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  active ? 'font-semibold underline' : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
