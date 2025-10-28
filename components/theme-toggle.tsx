'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={16}/> : <Moon size={16}/>} {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
