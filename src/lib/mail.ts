import { Resend } from 'resend'

type QuoteDoc = {
  company?: string
  [key: string]: unknown
}

export async function sendQuoteEmail(doc: QuoteDoc) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const resend = new Resend(apiKey)
  // Safely resolve company for subject line
  let subjectCompany = doc.company
  const contactUnknown = (doc as Record<string, unknown>)['contact']
  if (!subjectCompany && typeof contactUnknown === 'object' && contactUnknown !== null) {
    const maybeCompany = (contactUnknown as Record<string, unknown>)['company']
    if (typeof maybeCompany === 'string') subjectCompany = maybeCompany
  }
  if (!subjectCompany) subjectCompany = 'New submission'
  const fromAddress = process.env.RESEND_FROM || 'forms@dasza.com'
  let replyTo: string | undefined
  if (typeof contactUnknown === 'object' && contactUnknown !== null) {
    const maybeEmail = (contactUnknown as Record<string, unknown>)['email']
    if (typeof maybeEmail === 'string') replyTo = maybeEmail
  }
  await resend.emails.send({
    from: `Dasza 3PL <${fromAddress}>`,
    to: ['jmsanchez@dasza.com'],
    subject: `New form submission — ${subjectCompany}`,
    text: JSON.stringify(doc, null, 2),
    ...(replyTo ? { reply_to: replyTo } : {}),
  })
}


