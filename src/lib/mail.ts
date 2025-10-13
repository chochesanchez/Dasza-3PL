import { Resend } from 'resend'

type QuoteDoc = {
  company?: string
  [key: string]: unknown
}

export async function sendQuoteEmail(doc: QuoteDoc) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const resend = new Resend(apiKey)
  const subjectCompany = (doc.company as string | undefined) || (doc['contact'] && (doc['contact'] as any).company) || 'New submission'
  const fromAddress = process.env.RESEND_FROM || 'forms@dasza.com'
  const replyTo = (doc['contact'] && (doc['contact'] as any).email) ? String((doc['contact'] as any).email) : undefined
  await resend.emails.send({
    from: `Dasza 3PL <${fromAddress}>`,
    to: ['jmsanchez@dasza.com'],
    subject: `New form submission — ${subjectCompany}`,
    text: JSON.stringify(doc, null, 2),
    reply_to: replyTo,
  } as any)
}


