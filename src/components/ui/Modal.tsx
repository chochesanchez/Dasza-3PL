'use client'
import { useEffect } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  status?: 'success' | 'info' | 'error'
}

export default function Modal({ open, onClose, title, children, status = 'info' }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [open])

  if (!open) return null
  const Icon = status === 'success' ? CheckCircleIcon : status === 'error' ? ExclamationTriangleIcon : InformationCircleIcon
  const iconColor = status === 'success' ? 'text-dasza-cyan' : status === 'error' ? 'text-red-500' : 'text-dasza-cyan'
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[88%] max-w-[360px] sm:max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="p-6 sm:p-7 text-center">
          <div className="mx-auto mb-3 grid place-items-center">
            <Icon className={`h-10 w-10 ${iconColor}`} aria-hidden />
          </div>
          {title && <div className="text-lg sm:text-xl font-semibold text-dasza-navy mb-1">{title}</div>}
          <div className="text-dasza-navy/90 text-sm leading-relaxed">{children}</div>
          <div className="mt-6">
            <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-full bg-dasza-cyan text-white font-medium hover:bg-dasza-cyan600">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}


