import type { Location } from './location-types'

function keyOf(l: Pick<Location, 'name'|'address1'|'postalCode'>) {
  return [l.name, l.address1, l.postalCode].map(s => (s || '').toString().trim().toLowerCase()).join('|')
}

/** Return a new array with duplicates removed (keeping the first occurrence). */
export function dedupeLocations(list: Location[]) {
  const seen = new Set<string>()
  const out: Location[] = []
  for (const l of list) {
    const k = keyOf(l)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(l)
  }
  return out
}

/** Returns true if `candidate` would duplicate something in `list`. */
export function wouldDuplicate(list: Location[], candidate: Pick<Location,'name'|'address1'|'postalCode'>) {
  const k = keyOf(candidate)
  return list.some(l => keyOf(l) === k)
}
