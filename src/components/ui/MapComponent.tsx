'use client'
import { useEffect, useRef } from 'react'

type Props = {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export default function MapComponent({ lat, lng, zoom = 12, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    if (!(window as unknown as { google?: typeof google }).google) return
    const map = new google.maps.Map(ref.current, {
      center: { lat, lng },
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })
    new google.maps.Marker({ position: { lat, lng }, map })
  }, [lat, lng, zoom])

  return <div ref={ref} className={className ?? 'h-72 w-full rounded-xl'} />
}


