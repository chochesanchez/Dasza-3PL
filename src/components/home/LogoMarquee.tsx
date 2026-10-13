import Image from 'next/image'
import { CLIENT_LOGOS, logoSrc } from '@/content/site'

// Infinite left-to-right strip; the list is duplicated so the loop is seamless. Pauses on hover.
export default function LogoMarquee() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS]
  return (
    <div className="partners-marquee-viewport">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />
      <ul className="partners-marquee-track">
        {track.map((l, i) => (
          <li key={i} className="partner-card h-28 w-64 shrink-0" aria-hidden={i >= CLIENT_LOGOS.length}>
            <span className="relative block h-14 w-48">
              <Image src={logoSrc(l.src)} alt={i < CLIENT_LOGOS.length ? l.name : ''} fill sizes="192px" className="object-contain" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
