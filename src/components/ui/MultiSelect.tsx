'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

// Dropdown with checkboxes ("select all that apply"). Looks like the other inputs; closes on outside click or Escape.
export default function MultiSelect({
  label,
  options,
  selected,
  onToggle,
  placeholder,
  countLabel,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
  placeholder: string
  /** Shown when more than two options are picked, e.g. "{n} selected" */
  countLabel: (n: number) => string
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement | null>(null)
  const button = useRef<HTMLButtonElement | null>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const summary = selected.length === 0 ? placeholder : selected.length <= 2 ? selected.join(', ') : countLabel(selected.length)

  return (
    <div ref={root} className="relative text-sm font-medium text-dasza-ink">
      <span id={`${listId}-label`}>{label}</span>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${listId}-label ${listId}-value`}
        onClick={() => setOpen((v) => !v)}
        className={`mt-1.5 flex w-full h-12 items-center justify-between gap-3 px-3.5 rounded-md border bg-white text-left font-normal focus:outline-none focus:ring-2 focus:ring-dasza-cyan ${
          open ? 'border-dasza-cyan' : 'border-dasza-line'
        }`}
      >
        <span id={`${listId}-value`} className={`truncate ${selected.length ? 'text-dasza-ink' : 'text-dasza-gray'}`}>{summary}</span>
        <ChevronDownIcon className={`h-5 w-5 shrink-0 text-dasza-gray transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <fieldset id={listId} className="absolute z-20 mt-1.5 w-full rounded-md border border-dasza-line bg-white py-1.5 shadow-lg">
          <legend className="sr-only">{label}</legend>
          {options.map((opt) => {
            const on = selected.includes(opt)
            return (
              <label key={opt} className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 font-normal hover:bg-dasza-paper">
                <input type="checkbox" checked={on} onChange={() => onToggle(opt)} className="peer sr-only" />
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-dasza-cyan ${
                    on ? 'border-dasza-ink bg-dasza-ink text-white' : 'border-dasza-line'
                  }`}
                  aria-hidden
                >
                  {on && <CheckIcon className="h-4 w-4" />}
                </span>
                {opt}
              </label>
            )
          })}
        </fieldset>
      )}
    </div>
  )
}
