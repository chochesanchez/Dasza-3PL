'use client'
import { useEffect, useRef } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  status?: 'success' | 'info' | 'error'
  closeLabel?: string
}

export default function Modal({ open, onClose, title, children, status = 'info', closeLabel = 'Close' }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  // Callers pass inline handlers; keep the latest one without re-running the effect on every render.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    // Return focus to whatever opened the dialog (e.g. the submit button) when it closes.
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onCloseRef.current()
      if (e.key !== 'Tab' || !dialogRef.current) return
      // Keep Tab / Shift+Tab inside the dialog.
      const items = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
      const first = items[0]
      const last = items[items.length - 1]
      if (!first) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [open])

  if (!open) return null
  const Icon = status === 'success' ? CheckCircleIcon : status === 'error' ? ExclamationTriangleIcon : InformationCircleIcon
  const iconColor = status === 'error' ? 'text-red-600' : 'text-dasza-cyan600'
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="absolute inset-0 bg-dasza-ink/60" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md rounded-lg bg-white p-7 shadow-2xl">
        <Icon className={`h-9 w-9 ${iconColor}`} aria-hidden />
        {title && <h2 id="modal-title" className="mt-4 font-display text-2xl font-semibold text-dasza-ink">{title}</h2>}
        <div className="mt-2 text-dasza-navy leading-relaxed">{children}</div>
        <button ref={closeRef} onClick={onClose} className="mt-6 inline-flex items-center h-11 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600">
          {closeLabel}
        </button>
      </div>
    </div>
  )
}
