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
