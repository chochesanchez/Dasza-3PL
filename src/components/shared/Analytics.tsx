export default function Analytics() {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return null
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
          gtag('config', '${id}');
        `,
        }}
      />
    </>
  )
}


