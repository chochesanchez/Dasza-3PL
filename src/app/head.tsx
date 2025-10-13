export default function Head() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dasza 3PL',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    logo: (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000') + '/images/Dasza%20Logistics%20Logo%20Complete.png',
    sameAs: [],
    contactPoint: [{ '@type': 'ContactPoint', telephone: '+52-81-3404-9505', contactType: 'sales' }],
  }
  return (
    <>
      <link rel="icon" href="/images/Dasza Logistics Logo 2.png" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  )
}


