import Link from 'next/link'

type Crumb = { href: string; label: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-dasza-navy/70" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && <span className="text-dasza-gray/60">/</span>}
            {idx === items.length - 1 ? (
              <span className="text-dasza-navy">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-dasza-cyan">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}


