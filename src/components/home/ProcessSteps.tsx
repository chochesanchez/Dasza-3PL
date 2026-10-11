'use client'
import Image from 'next/image'
import { useState } from 'react'
import { PROCESS } from '@/content/site'

export default function ProcessSteps() {
  const [active, setActive] = useState(0)
  const step = PROCESS[active]

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <ol className="lg:col-span-5 border-t border-dasza-line">
        {PROCESS.map((s, i) => {
          const on = i === active
          return (
            <li key={s.title} className="border-b border-dasza-line">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={on ? 'step' : undefined}
                className="w-full text-left py-5 grid grid-cols-[2.5rem_1fr] gap-x-3 group"
              >
                <span className={`font-display text-lg tabular-nums transition-colors ${on ? 'text-dasza-cyan600' : 'text-dasza-gray'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className={`block font-display text-xl md:text-2xl font-semibold transition-colors ${on ? 'text-dasza-ink' : 'text-dasza-navy/70 group-hover:text-dasza-ink'}`}>
                    {s.title}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-dasza-navy leading-relaxed max-w-md">{s.text}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="lg:col-span-7 lg:sticky lg:top-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-dasza-paper">
          {PROCESS.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute left-0 bottom-0 m-4 px-3 py-1.5 rounded bg-dasza-ink/85 text-white text-sm">
            {step.place}
          </div>
        </div>
      </div>
    </div>
  )
}
