import Image from 'next/image'
import Link from 'next/link'

type Crumb = { href: string; label: string }

export default function PageIntro({
  title,
  lead,
  image,
  crumbs,
  crumbLabel = 'Breadcrumb',
  imageAlt = '',
  children,
}: {
  title: string
  lead?: string
  image?: string
  crumbs?: Crumb[]
  crumbLabel?: string
  imageAlt?: string
  children?: React.ReactNode
}) {
  // Phones: title, then photo, then lead text. Desktop: title and lead on the left, photo on the right.
  const col = image ? 'lg:col-span-6' : 'max-w-3xl'
  return (
    <section className="bg-dasza-ink text-white">
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 grid gap-y-8 ${image ? 'lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6' : ''}`}>
        <div className={`${col} ${image ? 'lg:self-end' : ''}`}>
          {crumbs && (
            <nav aria-label={crumbLabel} className="mb-6 text-sm text-white/60">
              <ol className="flex flex-wrap gap-2">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    <Link href={c.href} className="hover:text-white">{c.label}</Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]">{title}</h1>
        </div>
        {image && (
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:self-center relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        {(lead || children) && (
          <div className={`${col} ${image ? 'lg:self-start' : ''} -mt-2 lg:mt-0`}>
            {lead && <p className="text-lg text-white/75 leading-relaxed max-w-xl">{lead}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
