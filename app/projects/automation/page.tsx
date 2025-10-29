'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { nanoid } from 'nanoid'
import { readUTMFromUrl, type UTM, loadLeads, saveLeads, type LeadRow } from '@/lib/utm'
import { exportLeadsCSV } from '@/lib/csv'
import * as gtag from '@/lib/gtag'

function AutomationInner() {
  const searchParams = useSearchParams()
  const [utm, setUtm] = useState<UTM>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setUtm(readUTMFromUrl('?' + searchParams.toString()))
    setLeads(loadLeads())
  }, [searchParams])

  async function submit(e: React.FormEvent) {
  e.preventDefault()
  if (!email.includes('@')) { setStatus('error'); return }
  setStatus('saving')
  gtag.event({ action: 'lead_submit', category: 'leads', label: utm.campaign })

  // Save locally for demo table (unchanged)
  const row: LeadRow = {
    id: nanoid(),
    email: email.trim(),
    name: name.trim() || undefined,
    createdAt: new Date().toISOString(),
    utm
  }
  const next = [row, ...leads]
  setLeads(next)
  saveLeads(next)

  // NEW: call Mailchimp API route (best-effort; do not block UX on failure)
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, utm })
    })
    const data = await res.json()
    if (!data?.ok) {
      console.warn('Mailchimp error:', data)
    }
  } catch (err) {
    console.warn('Mailchimp network error', err)
  }

  setStatus('saved')
  gtag.event({ action: 'lead_success', category: 'leads', label: utm.campaign })
  setEmail(''); setName('')
}

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim()
    if (!q) return leads
    return leads.filter(l =>
      [l.email, l.name, l.utm.source, l.utm.medium, l.utm.campaign].some(v => (v||'').toLowerCase().includes(q))
    )
  }, [filter, leads])

  return (
    <div className="space-y-8">
      {/* ... keep your existing JSX exactly as before ... */}
      {/* (form, filter, table, export button) */}
    </div>
  )
}



export default function AutomationDemo() {
  return (
    <Suspense fallback={<div className="py-8 text-sm text-zinc-500">Loading…</div>}>
      <AutomationInner />
    </Suspense>
  )
}
