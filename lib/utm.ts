export type UTM = {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
}

export function readUTMFromUrl(search: string): UTM {
  const p = new URLSearchParams(search)
  return {
    source: p.get('utm_source') ?? undefined,
    medium: p.get('utm_medium') ?? undefined,
    campaign: p.get('utm_campaign') ?? undefined,
    term: p.get('utm_term') ?? undefined,
    content: p.get('utm_content') ?? undefined,
  }
}

const KEY = 'automation.leads.v1'

export type LeadRow = {
  id: string
  email: string
  name?: string
  createdAt: string
  utm: UTM
}

export function loadLeads(): LeadRow[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function saveLeads(rows: LeadRow[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(rows))
}
