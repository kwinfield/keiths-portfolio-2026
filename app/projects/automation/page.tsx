'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { nanoid } from 'nanoid'
import { readUTMFromUrl, type UTM, loadLeads, saveLeads, type LeadRow } from '@/lib/utm'
import { exportLeadsCSV } from '@/lib/csv'
import * as gtag from '@/lib/gtag'
import LeadsByCampaign from '@/components/charts/leads-by-campaign'


function AutomationInner() {
  const searchParams = useSearchParams()

  const [utm, setUtm] = useState<UTM>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // Read UTM from URL and load saved leads
    setUtm(readUTMFromUrl('?' + searchParams.toString()))
    setLeads(loadLeads())
  }, [searchParams])

  function safeEvent(...args: Parameters<typeof gtag.event>) {
    try { gtag.event(...args) } catch {}
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setStatus('error'); return }
    setStatus('saving')
    safeEvent({ action: 'lead_submit', category: 'leads', label: utm.campaign })

    // Save locally (for the demo table)
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

    // Call Mailchimp (non-blocking; logs only if fails)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, utm })
      })
      const data = await res.json().catch(() => ({}))
      if (!data?.ok) console.warn('Mailchimp error:', data)
    } catch (err) {
      console.warn('Mailchimp network error', err)
    }

    setStatus('saved')
    safeEvent({ action: 'lead_success', category: 'leads', label: utm.campaign })
    setEmail(''); setName('')
  }

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim()
    if (!q) return leads
    return leads.filter(l =>
      [l.email, l.name, l.utm.source, l.utm.medium, l.utm.campaign]
        .some(v => (v||'').toLowerCase().includes(q))
    )
  }, [filter, leads])

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Marketing Automation Demo — Mailchimp + UTM</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Captures UTM, fires GA4 events, stores demo leads locally, and lets you export a CSV.
        </p>
      </header>

      <section className="rounded-2xl border p-5">
        <h2 className="font-semibold mb-3">Join updates</h2>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm dark:bg-zinc-900"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Name (optional)</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm dark:bg-zinc-900"
              value={name}
              onChange={e=>setName(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-2 gap-3">
            <div className="text-xs text-zinc-500">
              <div><strong>utm_source</strong>: {utm.source || <em>none</em>}</div>
              <div><strong>utm_medium</strong>: {utm.medium || <em>none</em>}</div>
              <div><strong>utm_campaign</strong>: {utm.campaign || <em>none</em>}</div>
            </div>
            <div className="text-right">
              <button className="rounded-2xl bg-brand text-white px-4 py-2" disabled={status==='saving'}>
                {status==='saving' ? 'Submitting…' : 'Subscribe'}
              </button>
            </div>
          </div>

          {status==='saved' && <p className="sm:col-span-2 text-sm text-green-600">Saved! (Demo)</p>}
          {status==='error' && <p className="sm:col-span-2 text-sm text-red-600">Please enter a valid email.</p>}
        </form>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Filter leads (email/name/source/campaign)"
          className="rounded-xl border px-3 py-2 text-sm w-80 dark:bg-zinc-900"
          value={filter}
          onChange={e=>setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="rounded-2xl border px-3 py-2" onClick={()=>exportLeadsCSV(filtered)}>Export Leads CSV</button>
          <button className="rounded-2xl border px-3 py-2" onClick={()=>{
            if (confirm('Clear all demo leads?')) { saveLeads([]); setLeads([]) }
          }}>Clear All</button>
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              {['Created','Email','Name','utm_source','utm_medium','utm_campaign'].map(h=>(
                <th key={h} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="odd:bg-white even:bg-zinc-50 dark:odd:bg-zinc-950 dark:even:bg-zinc-900">
                <td className="px-3 py-2">{new Date(row.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2">{row.email}</td>
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2">{row.utm.source}</td>
                <td className="px-3 py-2">{row.utm.medium}</td>
                <td className="px-3 py-2">{row.utm.campaign}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="px-3 py-6 text-center text-zinc-500" colSpan={6}>No leads yet</td></tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="rounded-2xl border">
        <header className="flex items-center justify-between p-4">
          <h2 className="font-semibold">Leads by Campaign</h2>
          <p className="text-sm text-zinc-500">Last {leads.length} events (local demo data)</p>
        </header>
        <LeadsByCampaign rows={leads} />
      </section>

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
