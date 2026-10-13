'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import CountUp from '@/components/motion/CountUp'

// Illustration of the client portal, mirroring the real Dasza System reports.
// Once visible, a row lights up every few seconds as if a pallet was just scanned.
const ROWS = [
  { item: 'ALU-01042', desc: 'Aluminum wheel hub casting', qty: 3584, plt: 14, loc: 'C08-3' },
  { item: 'ALU-01079', desc: 'Steel brake drum', qty: 1764, plt: 9, loc: 'A05-1' },
  { item: 'CMP-02210', desc: 'Hermetic compressor motor', qty: 6512, plt: 37, loc: 'D09-5' },
  { item: 'CMP-02247', desc: 'Run capacitor 45µF', qty: 1407, plt: 7, loc: 'B09-5' },
]

export default function SystemPreview() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [rows, setRows] = useState(ROWS)
  const [scanned, setScanned] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || reduce) return
    let i = 0
    const id = window.setInterval(() => {
      const idx = i % ROWS.length
      i += 1
      setScanned(idx)
      setRows((prev) => prev.map((r, k) => (k === idx ? { ...r, qty: r.qty + 24 * (1 + (i % 3)), plt: r.plt + 1 } : r)))
      window.setTimeout(() => setScanned(null), 1600)
    }, 3200)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  return (
    <div ref={ref} aria-hidden className="rounded-lg overflow-hidden border border-white/10 bg-white text-dasza-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between bg-dasza-charcoal text-white px-4 py-2.5 text-sm">
        <span className="font-semibold">DASZA System</span>
        <span className="flex items-center gap-2 text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live inventory
        </span>
      </div>
      <div className="grid grid-cols-3 border-b border-dasza-line text-center">
        {[
          ['Pallets on hand', '412'],
          ['Receipts (30 days)', '18'],
          ['Accuracy', '99.6%'],
        ].map(([k, v]) => (
          <div key={k} className="py-3 border-r last:border-r-0 border-dasza-line">
            <div className="font-display text-xl font-semibold tabular-nums"><CountUp value={v} /></div>
            <div className="text-[11px] text-dasza-navy">{k}</div>
          </div>
        ))}
      </div>
      <table className="w-full text-[12px]">
        <thead className="bg-dasza-paper text-dasza-navy">
          <tr>
            <th className="text-left font-medium px-3 py-2">Item</th>
            <th className="text-left font-medium px-3 py-2 hidden sm:table-cell">Description</th>
            <th className="text-right font-medium px-3 py-2">Qty</th>
            <th className="text-right font-medium px-3 py-2">Pallets</th>
            <th className="text-left font-medium px-3 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr
              key={r.item}
              className={`border-t border-dasza-line transition-colors duration-700 ${scanned === i ? 'bg-dasza-cyan/15' : ''}`}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            >
              <td className="px-3 py-2 font-medium">{r.item}</td>
              <td className="px-3 py-2 hidden sm:table-cell text-dasza-navy">{r.desc}</td>
              <td className="px-3 py-2 text-right tabular-nums">{r.qty.toLocaleString('en-US')}</td>
              <td className="px-3 py-2 text-right tabular-nums">{r.plt}</td>
              <td className="px-3 py-2">
                {r.loc}
                {scanned === i && <span className="ml-2 text-[10px] font-semibold text-dasza-cyan600">Scanned</span>}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
