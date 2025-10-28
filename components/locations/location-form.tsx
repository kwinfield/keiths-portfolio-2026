'use client'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { locationSchema, type Location } from '@/lib/location-types'

const formSchema = locationSchema.omit({ id: true, latitude: true, longitude: true }).extend({
  address2: z.string().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
})

export default function LocationForm({ onAdd }: { onAdd: (loc: Location) => void }) {
  const [form, setForm] = useState({
    name: '', address1: '', address2: '', city: '', state: '', postalCode: '',
    phone: '', website: ''
  })
  const [errors, setErrors] = useState<string[]>([])

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm(s => ({ ...s, [k]: v }))
  }

  function submit(e: React.FormEvent) {
  e.preventDefault()
  setErrors([])
  const parse = formSchema.safeParse(form)
  if (!parse.success) {
    const flat = parse.error.flatten()
    const msgs = [...flat.formErrors, ...Object.values(flat.fieldErrors).flat()]
    setErrors(msgs.length ? msgs : ['Invalid input'])
    return
  }
  onAdd({ id: nanoid(), ...parse.data, latitude: null, longitude: null })
  setForm({ name: '', address1: '', address2: '', city: '', state: '', postalCode: '', phone: '', website: '' })
}

  const input = 'w-full rounded-xl border px-3 py-2 text-sm dark:bg-zinc-900'
  const label = 'text-sm font-medium'

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <div><label className={label}>Name</label><input className={input} value={form.name} onChange={e=>update('name', e.target.value)} /></div>
      <div><label className={label}>Phone</label><input className={input} value={form.phone} onChange={e=>update('phone', e.target.value)} /></div>
      <div className="sm:col-span-2"><label className={label}>Address 1</label><input className={input} value={form.address1} onChange={e=>update('address1', e.target.value)} /></div>
      <div className="sm:col-span-2"><label className={label}>Address 2</label><input className={input} value={form.address2} onChange={e=>update('address2', e.target.value)} /></div>
      <div><label className={label}>City</label><input className={input} value={form.city} onChange={e=>update('city', e.target.value)} /></div>
      <div><label className={label}>State (2-letter)</label><input maxLength={2} className={input} value={form.state} onChange={e=>update('state', e.target.value.toUpperCase())} /></div>
      <div><label className={label}>Postal Code</label><input className={input} value={form.postalCode} onChange={e=>update('postalCode', e.target.value)} /></div>
      <div><label className={label}>Website</label><input className={input} value={form.website} onChange={e=>update('website', e.target.value)} /></div>
      {errors.length > 0 && (
        <ul className="sm:col-span-2 text-sm text-red-600 list-disc ml-5">
          {errors.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      )}
      <div className="sm:col-span-2">
        <button className="rounded-2xl bg-brand text-white px-4 py-2">Add Location</button>
      </div>
    </form>
  )
}
