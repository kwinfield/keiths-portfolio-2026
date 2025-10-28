'use client'

import { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'

import LocationForm from '@/components/locations/location-form'
import LocationTable from '@/components/locations/location-table'

import { loadLocations, saveLocations } from '@/lib/location-store'
import type { Location } from '@/lib/location-types'

import {
  exportGoogleCSV,
  exportAppleCSV,
  parseCsvWithHeader,
  googleRowToLocation,
  appleRowToLocation,
  downloadImportTemplate,
} from '@/lib/csv'

import { dedupeLocations, wouldDuplicate } from '@/lib/location-dedupe'

export default function LocationsAdmin() {
  const [list, setList] = useState<Location[]>([])
  const [filter, setFilter] = useState('')

  // Load/persist
  useEffect(() => {
    setList(loadLocations())
  }, [])
  useEffect(() => {
    saveLocations(list)
  }, [list])

  // CRUD
  function add(loc: Location) {
    if (wouldDuplicate(list, loc)) {
      alert('This looks like a duplicate (same name + address + postal). Not added.')
      return
    }
    setList(prev => [loc, ...prev])
  }

  function change(updated: Location) {
    setList(prev => prev.map(l => (l.id === updated.id ? updated : l)))
  }

  function remove(id: string) {
    setList(prev => prev.filter(l => l.id !== id))
  }

  function clearAll() {
    if (confirm('Clear ALL locations?')) setList([])
  }

  // Filtered view
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim()
    if (!q) return list
    return list.filter(l =>
      [l.name, l.city, l.state, l.postalCode, l.address1].some(v =>
        String(v ?? '').toLowerCase().includes(q),
      ),
    )
  }, [list, filter])

  const disabled = filtered.length === 0

  // --- CSV Import helpers ---
  function mapRow(headers: string[], row: string[]): Location {
    // Try Google mapping
    const g = googleRowToLocation(headers, row)
    if (g) return g

    // Try Apple mapping
    const a = appleRowToLocation(headers, row)
    if (a) return a

    // Fallback: guess common columns (best-effort)
    const [name, address1, address2, city, state, postalCode, phone, website] = row
    return {
      id: nanoid(),
      name: name || 'Unnamed',
      address1: address1 || '',
      address2: address2 || '',
      city: city || '',
      state: (state || '').toUpperCase(),
      postalCode: postalCode || '',
      phone: phone || '',
      website: website || '',
      latitude: null,
      longitude: null,
    }
  }

  async function handleImportFile(file: File) {
    const text = await file.text()
    const { headers, rows } = parseCsvWithHeader(text)
    if (!headers.length || !rows.length) {
      alert('No rows detected in the CSV.')
      return
    }

    const incoming = rows.map(r => mapRow(headers, r))

    // Validate minimal required fields (name, address1, city, state, postalCode, phone)
    const valid = incoming.filter(
      i => i.name && i.address1 && i.city && i.state && i.postalCode && i.phone,
    )

    // Merge + dedupe (keep existing first if duplicates)
    const merged = dedupeLocations([...valid, ...list])
    const added = merged.length - list.length

    setList(merged)
    alert(`Imported ${valid.length} rows (${added} new after dedupe).`)
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Locations Admin (Demo)</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Add/edit locations and export/import CSVs for Google Business Profiles and Apple
          Business Connect.
        </p>
      </header>

      {/* Add form */}
      <section className="rounded-2xl border p-5">
        <h2 className="mb-3 font-semibold">Add a Location</h2>
        <LocationForm onAdd={add} />
      </section>

      {/* Tools: filter / import / export */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="sr-only">
            Filter
          </label>
          <input
            id="filter"
            placeholder="Filter by name/city/state/zip"
            className="w-72 rounded-xl border px-3 py-2 text-sm dark:bg-zinc-900"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-2xl border px-3 py-2" onClick={clearAll}>
            Clear All
          </button>

          {/* Import */}
          <label className="cursor-pointer rounded-2xl border px-3 py-2">
            Import CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0]
                if (f) void handleImportFile(f)
                // allow selecting the same file again
                e.currentTarget.value = ''
              }}
            />
          </label>
          <button className="rounded-2xl border px-3 py-2" onClick={downloadImportTemplate}>
            Template CSV
          </button>

          {/* Export */}
          <button
            className="rounded-2xl bg-brand px-3 py-2 text-white disabled:opacity-50"
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

      {/* Table */}
      <LocationTable items={filtered} onChange={change} onDelete={remove} />
    </div>
  )
}
