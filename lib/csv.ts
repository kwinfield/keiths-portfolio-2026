// lib/csv.ts
import type { Location } from './location-types'

function csvEscape(value: string | number | null | undefined): string {
  const s = (value ?? '').toString()
  // Escape if contains comma, quote, or newline
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function toCSV(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const head = headers.map(csvEscape).join(',')
  const body = rows.map(r => r.map(csvEscape).join(',')).join('\n')
  // Include BOM for Excel compatibility
  return '\ufeff' + head + '\n' + body + '\n'
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Very light US phone “normalizer”: keep digits; prepend +1 if 10 digits
function normalizePhoneUS(raw?: string) {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return raw
}

/**
 * Google Business Profiles (common import columns)
 * Ref columns kept practical for your demo. You can extend later (categories, hours, etc.)
 */
export function exportGoogleCSV(list: Location[]) {
  const headers = [
    'Store code',            // optional internal code
    'Business name',
    'Address line 1',
    'Address line 2',
    'Sub-locality',          // empty
    'Locality',              // City
    'Administrative area',   // State
    'Postal code',
    'Country/Region',
    'Primary phone',
    'Website'
  ]

  const rows = list.map(l => ([
    l.id,
    l.name,
    l.address1,
    l.address2 ?? '',
    '',
    l.city,
    l.state,
    l.postalCode,
    'US',
    normalizePhoneUS(l.phone),
    l.website ?? ''
  ]))

  const csv = toCSV(headers, rows)
  downloadCsv(`google-business-profiles.csv`, csv)
}

/**
 * Apple Business Connect (pragmatic minimal set for demo)
 */
export function exportAppleCSV(list: Location[]) {
  const headers = [
    'Location Name',
    'Address Line 1',
    'Address Line 2',
    'Locality',            // City
    'Administrative Area', // State
    'Postal Code',
    'Country/Region',
    'Phone Number',
    'Website URL',
    'External ID'          // your unique code
  ]

  const rows = list.map(l => ([
    l.name,
    l.address1,
    l.address2 ?? '',
    l.city,
    l.state,
    l.postalCode,
    'US',
    normalizePhoneUS(l.phone),
    l.website ?? '',
    l.id
  ]))

  const csv = toCSV(headers, rows)
  downloadCsv(`apple-business-connect.csv`, csv)
}

// --- beneath exportAppleCSV(...) ---

export function parseCSV(raw: string): string[][] {
  const rows: string[][] = []
  let i = 0, field = '', row: string[] = [], inQuotes = false

  function endField() { row.push(field); field = '' }
  function endRow() { rows.push(row); row = [] }

  while (i < raw.length) {
    const c = raw[i]
    if (inQuotes) {
      if (c === '"') {
        if (raw[i+1] === '"') { field += '"'; i += 2; continue } // escaped quote
        inQuotes = false; i++; continue
      }
      field += c; i++; continue
    } else {
      if (c === '"') { inQuotes = true; i++; continue }
      if (c === ',') { endField(); i++; continue }
      if (c === '\r') { i++; continue }
      if (c === '\n') { endField(); endRow(); i++; continue }
      field += c; i++; continue
    }
  }
  // tail
  endField(); endRow()
  // trim BOM
  if (rows[0] && rows[0][0] && rows[0][0].charCodeAt(0) === 0xFEFF) {
    rows[0][0] = rows[0][0].slice(1)
  }
  return rows
}

export type ParsedCsv = { headers: string[], rows: string[][] }

export function parseCsvWithHeader(raw: string): ParsedCsv {
  const all = parseCSV(raw)
  const [head, ...body] = all.filter(r => r.length && r.some(v => v !== ''))
  return { headers: head ?? [], rows: body }
}

// --- MAPPERS: CSV -> Location ---
import { nanoid } from 'nanoid'
import { locationSchema, type Location } from './location-types'

const US = 'US'
const toNumOrNull = (s?: string) => {
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

/** Map a Google Business Profiles CSV row to a Location (best-effort). */
export function googleRowToLocation(headers: string[], row: string[]): Location | null {
  const get = (name: string) => {
    const idx = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase())
    return idx >= 0 ? row[idx] ?? '' : ''
  }
  const l: Partial<Location> = {
    id: get('Store code') || nanoid(),
    name: get('Business name'),
    address1: get('Address line 1'),
    address2: get('Address line 2') || '',
    city: get('Locality'),
    state: get('Administrative area'),
    postalCode: get('Postal code'),
    phone: get('Primary phone'),
    website: get('Website') || '',
    latitude: toNumOrNull(undefined),
    longitude: toNumOrNull(undefined),
  }
  const parsed = locationSchema.safeParse(l)
  return parsed.success ? parsed.data : null
}

/** Map an Apple Business Connect CSV row to a Location (best-effort). */
export function appleRowToLocation(headers: string[], row: string[]): Location | null {
  const get = (name: string) => {
    const idx = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase())
    return idx >= 0 ? row[idx] ?? '' : ''
  }
  const l: Partial<Location> = {
    id: get('External ID') || nanoid(),
    name: get('Location Name'),
    address1: get('Address Line 1'),
    address2: get('Address Line 2') || '',
    city: get('Locality'),
    state: get('Administrative Area'),
    postalCode: get('Postal Code'),
    phone: get('Phone Number'),
    website: get('Website URL') || '',
    latitude: toNumOrNull(undefined),
    longitude: toNumOrNull(undefined),
  }
  const parsed = locationSchema.safeParse(l)
  return parsed.success ? parsed.data : null
}

/** A minimal template row to help users format imports. */
export function downloadImportTemplate() {
  const headers = ['Business name','Address line 1','Address line 2','Locality','Administrative area','Postal code','Primary phone','Website','Store code']
  const csv = toCSV(headers, [
    ['Example Store','123 Main St','','Baltimore','MD','21201','410-555-1212','https://example.com','EX-001']
  ])
  downloadCsv('import-template-google-like.csv', csv)
}
