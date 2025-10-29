'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LeadRow } from '@/lib/utm'

// Dynamically import Recharts so SSR doesn't try to render it
const ResponsiveContainer = dynamic(
  async () => (await import('recharts')).ResponsiveContainer,
  { ssr: false }
)
const BarChart = dynamic(async () => (await import('recharts')).BarChart, { ssr: false })
const XAxis = dynamic(async () => (await import('recharts')).XAxis, { ssr: false })
const YAxis = dynamic(async () => (await import('recharts')).YAxis, { ssr: false })
const Tooltip = dynamic(async () => (await import('recharts')).Tooltip, { ssr: false })
const Bar = dynamic(async () => (await import('recharts')).Bar, { ssr: false })

export default function LeadsByCampaign({ rows }: { rows: LeadRow[] }) {
  // Aggregate by utm_campaign (fallback to '(none)')
  const data = useMemo(() => {
    const map = new Map<string, number>()
    for (const r of rows) {
      const key = (r.utm.campaign || '(none)').toString()
      map.set(key, (map.get(key) || 0) + 1)
    }
    // top 10 campaigns by count
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [rows])

  // Avoid flash-of-empty while hydrating
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  if (data.length === 0) {
    return <div className="text-sm text-zinc-500 px-3 py-4">No leads yet to chart.</div>
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} height={50} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
