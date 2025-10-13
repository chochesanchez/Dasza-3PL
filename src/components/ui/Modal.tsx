'use client'
import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="h-1 w-full bg-dasza-cyan" />
        <div className="p-6">
          {title && <div className="text-xl font-semibold text-dasza-navy mb-2">{title}</div>}
          <div className="text-dasza-navy/90 text-sm leading-relaxed">{children}</div>
          <div className="mt-6 text-right">
            <button onClick={onClose} className="px-5 py-2 rounded-full bg-dasza-cyan text-white font-medium hover:bg-dasza-cyan600">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


