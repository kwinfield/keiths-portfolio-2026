'use client'
import { locationSchema, type Location } from './location-types'

const KEY = 'mapsync.locations.v1'

export function loadLocations(): Location[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(l => locationSchema.safeParse(l).success) : []
  } catch { return [] }
}

export function saveLocations(list: Location[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(list))
}
