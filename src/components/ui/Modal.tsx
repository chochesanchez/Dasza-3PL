'use client'
import { useEffect, useRef } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  status?: 'success' | 'info' | 'error'
}

export default function Modal({ open, onClose, title, children, status = 'info' }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null
  const Icon = status === 'success' ? CheckCircleIcon : status === 'error' ? ExclamationTriangleIcon : InformationCircleIcon
  const iconColor = status === 'error' ? 'text-red-600' : 'text-dasza-cyan600'
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="absolute inset-0 bg-dasza-ink/60" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md rounded-lg bg-white p-7 shadow-2xl">
        <Icon className={`h-9 w-9 ${iconColor}`} aria-hidden />
        {title && <h2 id="modal-title" className="mt-4 font-display text-2xl font-semibold text-dasza-ink">{title}</h2>}
        <div className="mt-2 text-dasza-navy leading-relaxed">{children}</div>
        <button ref={closeRef} onClick={onClose} className="mt-6 inline-flex items-center h-11 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600">
          Close
        </button>
      </div>
    </div>
  )
}
