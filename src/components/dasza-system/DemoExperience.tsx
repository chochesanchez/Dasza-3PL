'use client'
import { useEffect, useState } from 'react'
import Onboarding, { type Visitor } from './Onboarding'
import DemoPortal from './DemoPortal'

const STORAGE_KEY = 'dasza-demo-visitor'

export default function DemoExperience() {
  const [visitor, setVisitor] = useState<Visitor | null>(null)

  // Keep the visitor in the demo if they refresh the page (per-tab only).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) setVisitor(JSON.parse(saved))
    } catch {}
  }, [])

  function start(v: Visitor) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch {}
    setVisitor(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {}
    setVisitor(null)
  }

  return visitor ? <DemoPortal visitor={visitor} onRestart={restart} /> : <Onboarding onComplete={start} />
}
