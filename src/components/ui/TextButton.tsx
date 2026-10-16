import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

// Every secondary action on the site: a plain text link with an arrow, no box.
// tone: 'light' on white/grey backgrounds, 'dark' on navy/video. size 'lg' for the footer call to action.
export default function TextButton({
  href,
  children,
  tone = 'light',
  size = 'md',
  external = false,
  newTab = false,
}: {
  href: string
  children: React.ReactNode
  tone?: 'light' | 'dark'
  size?: 'md' | 'lg'
  external?: boolean
  newTab?: boolean
}) {
  const cls = `group inline-flex items-center font-semibold underline-offset-4 decoration-2 hover:underline transition-colors ${
    size === 'lg' ? 'gap-3 text-2xl md:text-3xl' : 'gap-1.5 text-[15px]'
  } ${tone === 'dark' ? 'text-dasza-cyan hover:text-white decoration-dasza-cyan' : 'text-dasza-ink decoration-dasza-cyan hover:text-dasza-cyan600'}`
  const content = (
    <>
      {children}
      <ArrowRightIcon className={`${size === 'lg' ? 'h-7 w-7' : 'h-4 w-4'} shrink-0 transition-transform group-hover:translate-x-0.5`} aria-hidden />
    </>
  )
  if (external || newTab || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return <Link href={href} className={cls}>{content}</Link>
}
