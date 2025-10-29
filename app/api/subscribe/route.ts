import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs' // allow Node crypto for MD5 subscriber hash

type Body = {
  email?: string
  name?: string
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
}

const API_KEY = process.env.MAILCHIMP_API_KEY!
const DC = process.env.MAILCHIMP_DC!
const LIST_ID = process.env.MAILCHIMP_LIST_ID!
const STATUS = process.env.MAILCHIMP_STATUS || 'pending' // 'pending' or 'subscribed'

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code })
}

export async function POST(req: NextRequest) {
  if (!API_KEY || !DC || !LIST_ID) return bad('Server not configured', 500)

  const body = (await req.json()) as Body
  const email = (body.email || '').trim().toLowerCase()
  const name = (body.name || '').trim()

  if (!email || !email.includes('@')) return bad('Invalid email')

  // Prepare payload
  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`
  const auth = 'Basic ' + Buffer.from(`anystring:${API_KEY}`).toString('base64')

  const payload = {
    email_address: email,
    status: STATUS,
    merge_fields: { FNAME: name || '' },
    // Store UTM as interests/merge fields or notes—using tags is simplest for demo:
    tags: [
      body.utm?.source && `utm_source:${body.utm.source}`,
      body.utm?.medium && `utm_medium:${body.utm.medium}`,
      body.utm?.campaign && `utm_campaign:${body.utm.campaign}`,
      body.utm?.term && `utm_term:${body.utm.term}`,
      body.utm?.content && `utm_content:${body.utm.content}`,
    ].filter(Boolean) as string[],
  }

  // Try create (POST); if exists, update (PUT)
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: auth },
    body: JSON.stringify(payload),
  })

  if (res.status === 200 || res.status === 201) {
    const data = await res.json()
    return NextResponse.json({ ok: true, id: data.id, status: data.status })
  }

  // If member exists, Mailchimp returns 400 with title 'Member Exists'
  const json = await res.json().catch(() => ({}))
  const title = json?.title || ''
  if (res.status === 400 && /exists/i.test(title)) {
    // update existing member (PUT)
    const hash = crypto.createHash('md5').update(email).digest('hex')
    const updateUrl = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${hash}`
    const updatePayload = {
      status_if_new: STATUS,
      merge_fields: { FNAME: name || '' },
      tags: payload.tags,
    }
    const upd = await fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify(updatePayload),
    })
    if (upd.ok) {
      const data = await upd.json()
      return NextResponse.json({ ok: true, id: data.id, status: data.status })
    }
    const err = await upd.json().catch(() => ({}))
    return bad(err?.detail || 'Failed to update member', upd.status)
  }

  return bad(json?.detail || 'Failed to subscribe', res.status)
}
