import { Resend } from 'resend'

type QuoteDoc = {
  company?: string
  [key: string]: unknown
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function str(v: unknown): string | undefined {
  if (v === undefined || v === null) return undefined
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  return undefined
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
  // Build a professional HTML + text body from either parsed payload or inserted row
  const root = doc as Record<string, unknown>
  const contact = isRecord(root['contact']) ? (root['contact'] as Record<string, unknown>) : root
  const product = isRecord(root['product']) ? (root['product'] as Record<string, unknown>) : root
  const trade = isRecord(root['trade']) ? (root['trade'] as Record<string, unknown>) : root
  const service = isRecord(root['service']) ? (root['service'] as Record<string, unknown>) : undefined
  const options = isRecord(root['options']) ? (root['options'] as Record<string, unknown>) : undefined
  const comments = str(root['comments'])

  const row = (k: string, v?: string) => (
    v
      ? `<tr>
          <td width='180' style='width:180px;padding:6px 12px;color:#3E526C;font-weight:600;vertical-align:top;white-space:nowrap'>${k}</td>
          <td style='padding:6px 12px;color:#3E526C;white-space:normal;word-break:break-word;overflow-wrap:break-word;'>${v}</td>
        </tr>`
      : ''
  )
  const section = (title: string, body: string) => (body ? `<table width='100%' cellspacing='0' cellpadding='0' style='table-layout:fixed;margin-top:16px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden'><tr><td colspan='2' style='background:#F8FAFC;padding:10px 12px;color:#3E526C;font-weight:700'>${title}</td></tr>${body}</table>` : '')

  const contactHtml = [
    row('Name', str(contact['name'])),
    row('Email', str(contact['email'])),
    row('Phone', str(contact['phone'])),
    row('Company', str(contact['company'])),
    row('Title', str(contact['title'])),
    row('Postal Code', str(contact['postalCode'])),
    row('Address', str(contact['address'])),
  ].join('')
  const productHtml = [
    row('Type', str(product['type'])),
    row('Quantity', str(product['quantity'])),
    row('Dimensions / Volume', str(product['volume'])),
    row('Weight', str(product['weight'])),
  ].join('')
  const tradeHtml = [
    row('HS Code', str(trade['hsCode'])),
    row('Origin', str(trade['origin'])),
    row('Incoterm', str(trade['incoterm'])),
  ].join('')
  const serviceHtml = service
    ? [
        row('Frequency', str(service['frequency'])),
        row('Destinations', str(service['destinations'])),
        row('Timing', str(service['timing'])),
        str(service['storageRequired']) === 'true' ? row('Storage Required', 'Yes') : '',
      ].join('')
    : ''
  const optionsListItems = options
    ? Object.entries(options)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => `<li style='margin:0 0 4px 0'>${k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</li>`)
        .join('')
    : ''
  const optionsHtml = optionsListItems
    ? row('Options', `<ul style='margin:0;padding-left:18px'>${optionsListItems}</ul>`) 
    : ''

  // Interests can come from Contact form (typed safely)
  const rawInterests = (root as Record<string, unknown>)['interests']
  const interests: string[] = Array.isArray(rawInterests)
    ? (rawInterests as unknown[]).map((v) => String(v))
    : []

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <title>New form submission</title>
  </head>
  <body style='margin:0;padding:16px;background:#F5F7FB;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif'>
    <div style='max-width:640px;margin:0 auto'>
      <div style='background:#ffffff;border:1px solid #E5E7EB;border-radius:12px;padding:16px'>
        <h2 style='margin:0 0 12px 0;color:#0F172A;font-size:18px'>New form submission</h2>
        ${section('Contact', contactHtml)}
        ${section('Product', productHtml)}
        ${section('Trade / Customs', tradeHtml)}
        ${section('Service Requirements', serviceHtml)}
        ${section('Options', optionsHtml)}
        ${interests.length ? `<table width='100%' cellspacing='0' cellpadding='0' style='table-layout:fixed;margin-top:16px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden'><tr><td colspan='2' style='background:#F8FAFC;padding:10px 12px;color:#3E526C;font-weight:700'>Interests</td></tr><tr><td width='180' style='width:180px;padding:6px 12px;color:#3E526C;font-weight:600;vertical-align:top;white-space:nowrap'>Interest</td><td style='padding:6px 12px;color:#3E526C;word-break:break-word;overflow-wrap:break-word;'><ul style='margin:0;padding-left:18px'>${interests.map(i=>`<li style='margin:0 0 4px 0'>${String(i)}</li>`).join('')}</ul></td></tr></table>` : ''}
        ${comments ? `<div style='margin-top:16px;padding:12px;border:1px solid #E5E7EB;border-radius:12px'><div style='font-weight:700;margin-bottom:6px;color:#3E526C'>Comments</div><div style='color:#3E526C;word-break:break-word;overflow-wrap:anywhere;'>${comments.replace(/\n/g,'<br/>')}</div></div>` : ''}
      </div>
    </div>
  </body>
  </html>`

  const text = [
    'New form submission',
    '',
    `Name: ${str(contact['name']) ?? ''}`,
    `Email: ${str(contact['email']) ?? ''}`,
    `Phone: ${str(contact['phone']) ?? ''}`,
    `Company: ${str(contact['company']) ?? ''}`,
    `Title: ${str(contact['title']) ?? ''}`,
    `Postal Code / Address: ${str(contact['address']) ?? ''}`,
    '',
    `Product: ${str(product['type']) ?? ''}`,
    `Quantity: ${str(product['quantity']) ?? ''}`,
    `Dimensions: ${str(product['volume']) ?? ''}`,
    `Weight: ${str(product['weight']) ?? ''}`,
    '',
    `HS Code: ${str(trade['hsCode']) ?? ''}`,
    `Origin: ${str(trade['origin']) ?? ''}`,
    `Incoterm: ${str(trade['incoterm']) ?? ''}`,
    '',
    comments ? `Comments: ${comments}` : '',
  ].filter(Boolean).join('\n')

  await resend.emails.send({
    from: `Dasza 3PL <${fromAddress}>`,
    to: ['jmsanchez@dasza.com'],
    subject: `New form submission — ${subjectCompany}`,
    text,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  })
}


