'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { SERVICES, SERVICE_GROUPS } from '@/content/site'

export default function ServiceIndex() {
  const [hovered, setHovered] = useState(SERVICES[0].slug)
  const current = SERVICES.find((s) => s.slug === hovered) ?? SERVICES[0]

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">
        {SERVICE_GROUPS.map((group) => (
          <div key={group}>
            <h3 className="text-sm text-dasza-navy/70 pb-3 border-b border-dasza-line">{group}</h3>
            <ul>
              {SERVICES.filter((s) => s.group === group).map((s) => (
                <li key={s.slug} className="border-b border-dasza-line">
                  <Link
                    href={`/services/${s.slug}`}
                    onMouseEnter={() => setHovered(s.slug)}
                    onFocus={() => setHovered(s.slug)}
                    className="group flex items-start justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-dasza-ink group-hover:text-dasza-cyan600 transition-colors">{s.name}</span>
                      <span className="block mt-1 text-sm text-dasza-navy leading-relaxed">{s.summary}</span>
                    </span>
                    <ArrowUpRightIcon className="h-5 w-5 mt-1 shrink-0 text-dasza-gray group-hover:text-dasza-cyan600 transition-colors" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="hidden lg:block lg:col-span-4">
        <div className="sticky top-28">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-dasza-paper">
            {SERVICES.map((s) => (
              <Image
                key={s.slug}
                src={s.image}
                alt=""
                fill
                sizes="30vw"
                className={`object-cover transition-opacity duration-500 ${s.slug === current.slug ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-dasza-navy">{current.name}</p>
        </div>
      </div>
    </div>
  )
}
