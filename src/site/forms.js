import { useState } from 'react'

// HubSpot form settings. Until a form's ID is filled in, submitting it only shows the success
// message in the browser (and logs a warning); nothing is sent anywhere.
// Keys match the design's data-hubspot-form names; 'newsletter' is The Long View sign-up.
export const HUBSPOT = {
  portalId: '',
  forms: {
    newsletter: '',
    'meeting-booking': '',
    'event-registration': '',
    'learn-subscribe': '',
  },
  // HubSpot property that receives each form's dropdown answer (e.g. investor type).
  // Must match a property on that HubSpot form; anything else goes to 'message'.
  selectFields: {
    'meeting-booking': 'investor_type',
    'event-registration': 'how_did_you_hear',
  },
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = (v) => EMAIL.test(String(v || '').trim())

// Posts { name: value } fields to HubSpot's Forms API. Field names must match the form's
// HubSpot properties (email, firstname, lastname, …).
export async function submitForm(key, fields) {
  const formId = HUBSPOT.forms[key]
  if (!HUBSPOT.portalId || !formId) {
    console.warn(`[forms] "${key}" isn't connected to HubSpot yet; nothing was sent.`)
    await new Promise((r) => setTimeout(r, 400))
    return
  }
  const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT.portalId}/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: Object.entries(fields).map(([name, value]) => ({ name, value })),
      context: { pageUri: window.location.href, pageName: document.title },
    }),
  })
  if (!res.ok) throw new Error(`HubSpot returned ${res.status}`)
}

// Form status for the UI: 'idle' | 'sending' | 'sent' | 'error'. `send` skips the request when
// the hidden honeypot field was filled in (a bot), but still shows success.
export function useFormSubmit(key) {
  const [status, setStatus] = useState('idle')
  const send = async (fields, honeypot) => {
    setStatus('sending')
    try {
      if (!honeypot) await submitForm(key, fields)
      setStatus('sent')
      return true
    } catch (err) {
      console.error(`[forms] "${key}" failed`, err)
      setStatus('error')
      return false
    }
  }
  return { status, send, reset: () => setStatus('idle') }
}

// The Long View email sign-up (footer and newsletter page). Validates the email inline and
// returns the message to show in an aria-live region under the form.
export function useNewsletter() {
  const { status, send } = useFormSubmit('newsletter')
  const [invalid, setInvalid] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.email
    if (!isEmail(input.value)) {
      setInvalid(true)
      input.focus()
      return
    }
    setInvalid(false)
    if (await send({ email: input.value.trim() }, form.elements.company_website?.value)) form.reset()
  }
  const message = invalid
    ? 'Enter a valid email address.'
    : { sending: 'Subscribing…', sent: 'Thanks — you’re subscribed.', error: 'Something went wrong. Please try again, or email info@heartwoodinvestments.ca.' }[status] || ''
  return { onSubmit, invalid, sending: status === 'sending', message, isError: invalid || status === 'error' }
}

// Visually hidden field bots tend to fill in. Spread onto an <input>.
export const HONEYPOT = {
  name: 'company_website',
  type: 'text',
  tabIndex: -1,
  autoComplete: 'off',
  'aria-hidden': true,
  style: { position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 },
}
