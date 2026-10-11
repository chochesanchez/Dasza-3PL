import Image from 'next/image'
import Link from 'next/link'

type Crumb = { href: string; label: string }

export default function PageIntro({
  title,
  lead,
  image,
  crumbs,
  children,
}: {
  title: string
  lead?: string
  image?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="bg-dasza-ink text-white">
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 grid gap-10 items-center ${image ? 'lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-6' : 'max-w-3xl'}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
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
          {lead && <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
