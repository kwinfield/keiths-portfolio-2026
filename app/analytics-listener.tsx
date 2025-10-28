'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '../lib/gtag' // adjust to '../../lib/gtag' if your lib/ is elsewhere

export default function AnalyticsListener() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    pageview(url)
  }, [pathname, searchParams])

  return null
}
