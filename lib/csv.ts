// lib/csv.ts
import { nanoid } from 'nanoid'
import { locationSchema, type Location } from './location-types'
import type { LeadRow } from './utm'

/** Escape a CSV field (RFC 4180-ish) */
function csvEscape(value: string | number | null | undefined): string {
  const s = (value ?? '').toString()
  // Wrap in quotes if it contains comma, quote, or newline; escape quotes
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Build a CSV string from headers + rows; includes BOM for Excel compatibility */
function toCSV(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const head = headers.map(csvEscape).join(',')
  const body = rows.map(r => r.map(csvEscape).join(',')).join('\n')
  return '\ufeff' + head + '\n' + (body ? body + '\n' : '')
}

/** Trigger a CSV download in the browser */
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

/** Very light US phone normalizer → +1########## when possible */
function normalizePhoneUS(raw?: string) {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return raw
}

/* =========================
 *  EXPORTERS
 * =======================*/

/** Google Business Profiles CSV export (pragmatic column set for demo) */
export function exportGoogleCSV(list: Location[]) {
  const headers = [
    'Store code',            // internal unique code (optional but useful)
    'Business name',
    'Address line 1',
    'Address line 2',
    'Sub-locality',          // left blank in demo
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
  downloadCsv('google-business-profiles.csv', csv)
}

/** Apple Business Connect CSV export (pragmatic column set for demo) */
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
  downloadCsv('apple-business-connect.csv', csv)
}

/* =========================
 *  PARSERS
 * =======================*/

/** Minimal CSV parser that supports quotes, escaped quotes, and newlines */
export function parseCSV(raw: string): string[][] {
  const rows: string[][] = []
  let i = 0, field = '', row: string[] = [], inQuotes = false

  const endField = () => { row.push(field); field = '' }
  const endRow = () => { rows.push(row); row = [] }

  while (i < raw.length) {
    const c = raw[i]
    if (inQuotes) {
      if (c === '"') {
        if (raw[i + 1] === '"') { field += '"'; i += 2; continue } // escaped quote
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
  // finalize last field/row
  endField(); endRow()

  // Trim BOM on first cell if present
  if (rows[0]?.[0] && rows[0][0].charCodeAt(0) === 0xFEFF) {
    rows[0][0] = rows[0][0].slice(1)
  }
  return rows
}

export type ParsedCsv = { headers: string[], rows: string[][] }

/** Parse CSV and split into headers + rows (skips empty rows) */
export function parseCsvWithHeader(raw: string): ParsedCsv {
  const all = parseCSV(raw)
  const filtered = all.filter(r => r.length && r.some(v => (v ?? '') !== ''))
  const [headers = [], ...rows] = filtered
  return { headers, rows }
}

/* =========================
 *  MAPPERS (CSV → Location)
 * =======================*/

const toNumOrNull = (s?: string) => {
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

/** Helper: read a header by (case-insensitive) name */
function getByHeader(headers: string[], row: string[], name: string) {
  const idx = headers.findIndex(h => h.trim().toLowerCase() === name.toLowerCase())
  return idx >= 0 ? (row[idx] ?? '') : ''
}

/** Map a Google Business Profiles CSV row to a Location (best-effort) */
export function googleRowToLocation(headers: string[], row: string[]): Location | null {
  const l: Partial<Location> = {
    id: getByHeader(headers, row, 'Store code') || nanoid(),
    name: getByHeader(headers, row, 'Business name'),
    address1: getByHeader(headers, row, 'Address line 1'),
    address2: getByHeader(headers, row, 'Address line 2') || '',
    city: getByHeader(headers, row, 'Locality'),
    state: getByHeader(headers, row, 'Administrative area'),
    postalCode: getByHeader(headers, row, 'Postal code'),
    phone: getByHeader(headers, row, 'Primary phone'),
    website: getByHeader(headers, row, 'Website') || '',
    latitude: toNumOrNull(undefined),
    longitude: toNumOrNull(undefined),
  }
  const parsed = locationSchema.safeParse(l)
  return parsed.success ? parsed.data : null
}

/** Map an Apple Business Connect CSV row to a Location (best-effort) */
export function appleRowToLocation(headers: string[], row: string[]): Location | null {
  const l: Partial<Location> = {
    id: getByHeader(headers, row, 'External ID') || nanoid(),
    name: getByHeader(headers, row, 'Location Name'),
    address1: getByHeader(headers, row, 'Address Line 1'),
    address2: getByHeader(headers, row, 'Address Line 2') || '',
    city: getByHeader(headers, row, 'Locality'),
    state: getByHeader(headers, row, 'Administrative Area'),
    postalCode: getByHeader(headers, row, 'Postal Code'),
    phone: getByHeader(headers, row, 'Phone Number'),
    website: getByHeader(headers, row, 'Website URL') || '',
    latitude: toNumOrNull(undefined),
    longitude: toNumOrNull(undefined),
  }
  const parsed = locationSchema.safeParse(l)
  return parsed.success ? parsed.data : null
}

/* =========================
 *  TEMPLATES
 * =======================*/

/** A simple “Google-like” import template to help users format CSVs */
export function downloadImportTemplate() {
  const headers = [
    'Business name',
    'Address line 1',
    'Address line 2',
    'Locality',
    'Administrative area',
    'Postal code',
    'Primary phone',
    'Website',
    'Store code'
  ]
  const rows = [
    ['Example Store', '123 Main St', '', 'Baltimore', 'MD', '21201', '410-555-1212', 'https://example.com', 'EX-001']
  ]
  const csv = toCSV(headers, rows)
  downloadCsv('import-template-google-like.csv', csv)
}

export function exportLeadsCSV(rows: LeadRow[]) {
  const headers = ['createdAt','email','name','utm_source','utm_medium','utm_campaign','utm_term','utm_content']
  const body = rows.map(r => [
    r.createdAt, r.email, r.name ?? '',
    r.utm.source ?? '', r.utm.medium ?? '', r.utm.campaign ?? '', r.utm.term ?? '', r.utm.content ?? ''
  ])
  const head = headers.join(',')
  const b = body.map(r => r.map(v => {
    const s = (v ?? '').toString()
    return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s
  }).join(',')).join('\n')
  const csv = '\ufeff' + head + '\n' + b + '\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'leads.csv'
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}