// lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

const hasWindow = typeof window !== 'undefined'
const hasGtag = () => hasWindow && typeof window.gtag === 'function'

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !hasGtag()) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category?: string
  label?: string
  value?: number
}) => {
  if (!GA_MEASUREMENT_ID || !hasGtag()) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
