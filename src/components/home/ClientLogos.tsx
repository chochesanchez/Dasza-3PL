import Image from 'next/image'
import { CLIENT_LOGOS, logoSrc } from '@/content/site'

export default function ClientLogos({ limit }: { limit?: number }) {
  const logos = limit ? CLIENT_LOGOS.slice(0, limit) : CLIENT_LOGOS
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-dasza-line">
      {logos.map((l) => (
        <li key={l.name} className="relative h-24 md:h-28 border-r border-b border-dasza-line grid place-items-center px-6 group">
          <span className="relative block h-11 md:h-12 w-full max-w-[150px]">
            <Image
              src={logoSrc(l.src)}
              alt={l.name}
              fill
              sizes="150px"
              className="object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition"
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
