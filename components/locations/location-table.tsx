'use client'
import { useState } from 'react'
import type { Location } from '@/lib/location-types'

export default function LocationTable({
  items, onChange, onDelete
}: {
  items: Location[]
  onChange: (updated: Location) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Location>>({})

  function startEdit(row: Location) {
    setEditing(row.id)
    setDraft(row)
  }
  function save() {
    if (!editing) return
    onChange(draft as Location)
    setEditing(null)
  }

  const cell = 'px-3 py-2 border-b text-sm'

  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="min-w-full">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {['Name','Address','City','State','Postal','Phone','Website',''].map(h=>(
              <th key={h} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(row => (
            <tr key={row.id} className="odd:bg-white even:bg-zinc-50 dark:odd:bg-zinc-950 dark:even:bg-zinc-900">
              <td className={cell}>
                {editing===row.id ? <input className="rounded border px-2 py-1 w-48" value={String(draft.name||'')} onChange={e=>setDraft(d=>({...d,name:e.target.value}))}/> : row.name}
              </td>
              <td className={cell}>
                {editing===row.id ? <input className="rounded border px-2 py-1 w-64" value={String(draft.address1||'')} onChange={e=>setDraft(d=>({...d,address1:e.target.value}))}/> : row.address1}
              </td>
              <td className={cell}>{editing===row.id ? <input className="rounded border px-2 py-1 w-28" value={String(draft.city||'')} onChange={e=>setDraft(d=>({...d,city:e.target.value}))}/> : row.city}</td>
              <td className={cell}>{editing===row.id ? <input className="rounded border px-2 py-1 w-14" maxLength={2} value={String(draft.state||'')} onChange={e=>setDraft(d=>({...d,state:e.target.value.toUpperCase()}))}/> : row.state}</td>
              <td className={cell}>{editing===row.id ? <input className="rounded border px-2 py-1 w-24" value={String(draft.postalCode||'')} onChange={e=>setDraft(d=>({...d,postalCode:e.target.value}))}/> : row.postalCode}</td>
              <td className={cell}>{editing===row.id ? <input className="rounded border px-2 py-1 w-32" value={String(draft.phone||'')} onChange={e=>setDraft(d=>({...d,phone:e.target.value}))}/> : row.phone}</td>
              <td className={cell}>{editing===row.id ? <input className="rounded border px-2 py-1 w-56" value={String(draft.website||'')} onChange={e=>setDraft(d=>({...d,website:e.target.value}))}/> : <a className="underline" href={row.website} target="_blank">{row.website}</a>}</td>
              <td className={cell}>
                {editing===row.id ? (
                  <div className="flex gap-2">
                    <button className="rounded-2xl bg-brand text-white px-3 py-1" onClick={save}>Save</button>
                    <button className="rounded-2xl border px-3 py-1" onClick={()=>setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button className="rounded-2xl border px-3 py-1" onClick={()=>startEdit(row)}>Edit</button>
                    <button className="rounded-2xl border px-3 py-1" onClick={()=>onDelete(row.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {items.length===0 && (
            <tr><td colSpan={8} className="px-3 py-6 text-center text-sm text-zinc-500">No locations yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
