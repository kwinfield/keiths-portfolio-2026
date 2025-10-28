'use client'
import { useEffect, useMemo, useState } from 'react'
import LocationForm from '@/components/locations/location-form'
import LocationTable from '@/components/locations/location-table'
import { loadLocations, saveLocations } from '@/lib/location-store'
import type { Location } from '@/lib/location-types'
import { exportGoogleCSV, exportAppleCSV } from '@/lib/csv' // ← add

export default function LocationsAdmin() {
  const [list, setList] = useState<Location[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => { setList(loadLocations()) }, [])
  useEffect(() => { saveLocations(list) }, [list])

  function add(loc: Location) { setList(prev => [loc, ...prev]) }
  function change(updated: Location) { setList(prev => prev.map(l => l.id===updated.id ? updated : l)) }
  function remove(id: string) { setList(prev => prev.filter(l => l.id !== id)) }
  function clearAll() { if (confirm('Clear ALL locations?')) setList([]) }

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim()
    if (!q) return list
    return list.filter(l =>
      [l.name, l.city, l.state, l.postalCode, l.address1].some(v => String(v||'').toLowerCase().includes(q))
    )
  }, [list, filter])

  const disabled = filtered.length === 0

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Locations Admin (Demo)</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Add/edit locations and export to Google/Apple CSV.</p>
      </header>

      <section className="rounded-2xl border p-5">
        <h2 className="font-semibold mb-3">Add a Location</h2>
        <LocationForm onAdd={add} />
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <input
            placeholder="Filter by name/city/state/zip"
            className="rounded-xl border px-3 py-2 text-sm w-72 dark:bg-zinc-900"
            value={filter}
            onChange={e=>setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="rounded-2xl border px-3 py-2" onClick={clearAll}>Clear All</button>
          <button
            className="rounded-2xl bg-brand text-white px-3 py-2 disabled:opacity-50"
            onClick={() => exportGoogleCSV(filtered)}
            disabled={disabled}
            title={disabled ? 'Add at least one location' : 'Export Google CSV'}
          >
            Export Google CSV
          </button>
          <button
            className="rounded-2xl border px-3 py-2 disabled:opacity-50"
            onClick={() => exportAppleCSV(filtered)}
            disabled={disabled}
            title={disabled ? 'Add at least one location' : 'Export Apple CSV'}
          >
            Export Apple CSV
          </button>
        </div>
      </section>

      <LocationTable items={filtered} onChange={change} onDelete={remove} />
    </div>
  )
}
