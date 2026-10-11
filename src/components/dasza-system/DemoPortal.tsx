'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { buildDemoData, type DemoData } from './demoData'
import type { Visitor } from './Onboarding'

type SectionId = 'dashboard' | 'inventory' | 'receipts' | 'shipments' | 'labels' | 'aging' | 'cycle' | 'billing' | 'mobile'

const NAV: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { id: 'inventory', label: 'Inventory', icon: ArchiveBoxIcon },
  { id: 'receipts', label: 'Receipts', icon: ArrowDownOnSquareIcon },
  { id: 'shipments', label: 'Shipments', icon: ArrowUpOnSquareIcon },
  { id: 'labels', label: 'Pallet labels', icon: QrCodeIcon },
  { id: 'aging', label: 'Storage aging', icon: ClockIcon },
  { id: 'cycle', label: 'Cycle counts', icon: ClipboardDocumentCheckIcon },
  { id: 'billing', label: 'Billing', icon: BanknotesIcon },
  { id: 'mobile', label: 'Warehouse app', icon: DevicePhoneMobileIcon },
]

const TOUR: { id: SectionId; title: string; body: string }[] = [
  { id: 'dashboard', title: 'Your operation at a glance', body: 'When you log in you see your pallets on hand, this month’s receipts and shipments, and inventory accuracy from the latest cycle counts.' },
  { id: 'inventory', title: 'Inventory by item and location', body: 'Every item with its quantity, unit of measure, pallets, tariff code (fracción arancelaria) and rack location. Filter by warehouse and export to Excel at any time.' },
  { id: 'receipts', title: 'Receipts (Entradas)', body: 'Each truck is checked against your packing list, labeled pallet by pallet and registered with a receipt folio. You are notified the same day.' },
  { id: 'shipments', title: 'Shipments (Salidas)', body: 'Only your authorized requesters can release material. Every shipment is tied to your sales order and folio for full traceability.' },
  { id: 'labels', title: 'Every pallet has a label', body: 'Pallets are tracked individually by label, lot and location — from receipt to shipment — so you always know exactly where your material is.' },
  { id: 'aging', title: 'Storage aging', body: 'See how long material has been stored, to plan consumption and spot obsolete or slow-moving inventory early.' },
  { id: 'cycle', title: 'Cycle counts', body: 'Our team counts racks continuously with handheld scanners. Results and any variances are visible here.' },
  { id: 'billing', title: 'Transparent billing', body: 'Monthly charges are calculated from the same movements you see in the system — storage, pallet in/out and value-added services.' },
  { id: 'mobile', title: 'On the warehouse floor', body: 'Our operators use the Dasza mobile app to scan labels, relocate pallets, count inventory and attach photo evidence to shipments.' },
]

const n = (x: number) => x.toLocaleString('en-US')
const usd = (x: number) => x.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

function downloadCsv(filename: string, rows: Record<string, string | number>[]) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h])).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function Table({ headers, rows, align }: { headers: string[]; rows: (string | number | React.ReactNode)[][]; align?: ('l' | 'r')[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-dasza-gray/40 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-dasza-navy">
          <tr>
            {headers.map((h, i) => (
              <th key={h} scope="col" className={`px-3 py-2.5 font-semibold whitespace-nowrap ${align?.[i] === 'r' ? 'text-right' : 'text-left'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-dasza-charcoal">
          {rows.map((r, ri) => (
            <tr key={ri} className="hover:bg-gray-50/60">
              {r.map((c, ci) => (
                <td key={ci} className={`px-3 py-2 whitespace-nowrap ${align?.[ci] === 'r' ? 'text-right tabular-nums' : ''}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-dasza-gray/40 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-dasza-navy/60">{label}</div>
      <div className="text-2xl font-bold text-dasza-navy mt-1 tabular-nums">{value}</div>
      {sub && <div className="text-xs text-dasza-navy/60 mt-1">{sub}</div>}
    </div>
  )
}

function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
      <div>
        <h3 className="text-xl font-semibold text-dasza-navy">{title}</h3>
        {subtitle && <p className="text-sm text-dasza-navy/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 rounded-lg border border-dasza-gray/60 px-3 py-1.5 text-sm text-dasza-navy hover:border-dasza-navy">
      <ArrowDownTrayIcon className="h-4 w-4" aria-hidden /> Export
    </button>
  )
}

function AgingBars({ data }: { data: DemoData }) {
  const max = Math.max(...data.aging.map((a) => a.pallets), 1)
  return (
    <ul className="space-y-2">
      {data.aging.map((a) => (
        <li key={a.label} className="grid grid-cols-[110px_1fr_48px] items-center gap-3 text-sm">
          <span className="text-dasza-navy/80">{a.label}</span>
          <span className="h-3 rounded-full bg-gray-100 overflow-hidden">
            <span className="block h-full rounded-full bg-dasza-navy" style={{ width: `${(a.pallets / max) * 100}%` }} />
          </span>
          <span className="text-right tabular-nums text-dasza-navy">{a.pallets}</span>
        </li>
      ))}
    </ul>
  )
}

const statusCls: Record<string, string> = {
  'In stock': 'bg-emerald-50 text-emerald-800',
  Shipped: 'bg-gray-100 text-gray-700',
  Printed: 'bg-amber-50 text-amber-800',
}

function SectionView({ id, data }: { id: SectionId; data: DemoData }) {
  const [warehouse, setWarehouse] = useState('All')
  const [query, setQuery] = useState('')

  if (id === 'dashboard') {
    return (
      <div className="space-y-6">
        <SectionTitle title={`Welcome, ${data.company}`} subtitle="Sample data for demonstration purposes" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label="Pallets on hand" value={n(data.kpis.pallets)} sub={`${data.kpis.skus} active SKUs`} />
          <Kpi label="Receipts (30 days)" value={n(data.kpis.receiptsMonth)} sub="trucks received" />
          <Kpi label="Shipments (30 days)" value={n(data.kpis.shipmentsMonth)} sub="orders released" />
          <Kpi label="Inventory accuracy" value={`${data.kpis.accuracy}%`} sub="last 3 cycle counts" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-dasza-gray/40 bg-white p-4">
            <div className="font-semibold text-dasza-navy mb-3">Storage aging (pallets)</div>
            <AgingBars data={data} />
          </div>
          <div className="rounded-xl border border-dasza-gray/40 bg-white p-4">
            <div className="font-semibold text-dasza-navy mb-3">Latest movements</div>
            <ul className="divide-y divide-gray-100 text-sm">
              {[...data.receipts.slice(0, 3).map((r) => ({ ...r, kind: 'IN' })), ...data.shipments.slice(0, 3).map((r) => ({ ...r, kind: 'OUT' }))]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((r) => (
                  <li key={r.folio + r.kind} className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${r.kind === 'IN' ? 'bg-emerald-50 text-emerald-800' : 'bg-sky-50 text-sky-800'}`}>{r.kind}</span>
                      <span className="text-dasza-charcoal">{r.folio}</span>
                      <span className="text-dasza-navy/60 hidden sm:inline">{r.item}</span>
                    </span>
                    <span className="text-dasza-navy/70 tabular-nums">{r.pallets} plt · {r.date}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'inventory') {
    const warehouses = ['All', ...Array.from(new Set(data.inventory.map((r) => r.warehouse)))]
    const rows = data.inventory.filter(
      (r) => (warehouse === 'All' || r.warehouse === warehouse) && `${r.item} ${r.description}`.toLowerCase().includes(query.toLowerCase()),
    )
    return (
      <div>
        <SectionTitle
          title="Inventory"
          subtitle="Stock by item and location"
          action={<ExportButton onClick={() => downloadCsv('dasza-demo-inventory.csv', rows)} />}
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <label className="text-sm text-dasza-navy">
            <span className="sr-only">Warehouse</span>
            <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="rounded-lg border border-dasza-gray/60 px-3 py-1.5">
              {warehouses.map((w) => <option key={w}>{w}</option>)}
            </select>
          </label>
          <label className="text-sm flex-1 min-w-[180px]">
            <span className="sr-only">Search item</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search item or description" className="w-full rounded-lg border border-dasza-gray/60 px-3 py-1.5" />
          </label>
        </div>
        <Table
          headers={['Item', 'Description', 'HS code', 'Qty', 'UOM', 'Pallets', 'Location', 'Warehouse']}
          align={['l', 'l', 'l', 'r', 'l', 'r', 'l', 'l']}
          rows={rows.map((r) => [r.item, r.description, r.hsCode, n(r.quantity), r.uom, r.pallets, r.location, r.warehouse])}
        />
      </div>
    )
  }

  if (id === 'receipts' || id === 'shipments') {
    const rows = id === 'receipts' ? data.receipts : data.shipments
    return (
      <div>
        <SectionTitle
          title={id === 'receipts' ? 'Receipts' : 'Shipments'}
          subtitle="Last 30 days"
          action={<ExportButton onClick={() => downloadCsv(`dasza-demo-${id}.csv`, rows)} />}
        />
        <Table
          headers={['Date', 'Folio', id === 'receipts' ? 'Invoice' : 'Sales order', 'Item', 'Qty', 'UOM', 'Pallets']}
          align={['l', 'l', 'l', 'l', 'r', 'l', 'r']}
          rows={rows.map((r) => [r.date, r.folio, r.reference, r.item, n(r.quantity), r.uom, r.pallets])}
        />
      </div>
    )
  }

  if (id === 'labels') {
    return (
      <div>
        <SectionTitle title="Pallet labels" subtitle="Individual pallet traceability" action={<ExportButton onClick={() => downloadCsv('dasza-demo-labels.csv', data.labels)} />} />
        <Table
          headers={['Label', 'Item', 'Lot', 'Qty', 'Location', 'Received', 'Status']}
          align={['l', 'l', 'l', 'r', 'l', 'l', 'l']}
          rows={data.labels.map((l) => [
            <span key="l" className="font-mono">{l.labelId}</span>,
            l.item,
            l.lot,
            n(l.quantity),
            l.location,
            l.receivedOn,
            <span key="s" className={`text-xs font-medium px-2 py-0.5 rounded ${statusCls[l.status]}`}>{l.status}</span>,
          ])}
        />
      </div>
    )
  }

  if (id === 'aging') {
    return (
      <div className="space-y-6">
        <SectionTitle title="Storage aging" subtitle="Pallets by days in storage" />
        <div className="rounded-xl border border-dasza-gray/40 bg-white p-5 max-w-2xl">
          <AgingBars data={data} />
        </div>
      </div>
    )
  }

  if (id === 'cycle') {
    return (
      <div className="space-y-6">
        <SectionTitle title="Cycle counts" subtitle="Scanned with handheld devices on the floor" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
          <Kpi label="Accuracy" value={`${data.kpis.accuracy}%`} />
          <Kpi label="Counts this quarter" value={String(data.cycleCounts.length)} />
          <Kpi label="Open variances" value={String(data.cycleCounts.reduce((s, c) => s + c.variances, 0))} />
        </div>
        <Table
          headers={['Count', 'Date', 'Expected', 'Scanned', 'Variances']}
          align={['l', 'l', 'r', 'r', 'r']}
          rows={data.cycleCounts.map((c) => [c.name, c.date, c.expected, c.scanned, c.variances])}
        />
      </div>
    )
  }

  if (id === 'billing') {
    const total = data.billing.reduce((s, b) => s + b.qty * b.rate, 0)
    return (
      <div className="space-y-4">
        <SectionTitle title="Billing preview" subtitle="Calculated from this month’s movements (illustrative rates)" />
        <Table
          headers={['Concept', 'Unit', 'Qty', 'Rate', 'Amount']}
          align={['l', 'l', 'r', 'r', 'r']}
          rows={[
            ...data.billing.map((b) => [b.concept, b.unit, n(b.qty), usd(b.rate), usd(b.qty * b.rate)]),
            [<strong key="t">Subtotal</strong>, '', '', '', <strong key="v">{usd(total)}</strong>],
          ]}
        />
        <p className="text-xs text-dasza-navy/60">Amounts in USD before VAT. Actual pricing depends on your contract.</p>
      </div>
    )
  }

  // mobile
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
      <div className="mx-auto w-[240px] rounded-[2rem] border-8 border-dasza-charcoal bg-white shadow-lg overflow-hidden" aria-hidden>
        <div className="bg-dasza-navy text-white text-center text-sm py-3 font-semibold">Dasza Mobile</div>
        <div className="p-3 space-y-2">
          {['Location change', 'Cycle count', 'Stock by location', 'Shipping request'].map((t) => (
            <div key={t} className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dasza-navy">{t}</div>
          ))}
          <div className="mt-3 rounded-lg bg-gray-900 h-28 grid place-items-center">
            <QrCodeIcon className="h-12 w-12 text-white/80" />
          </div>
          <div className="text-center text-xs text-dasza-navy/60 pb-2">Scan pallet label…</div>
        </div>
      </div>
      <div>
        <SectionTitle title="Warehouse app" subtitle="What happens behind every number you see" />
        <ul className="space-y-3 text-dasza-navy/90">
          <li><strong>Location change</strong> — operators scan a pallet label and its new rack; your inventory location updates instantly.</li>
          <li><strong>Cycle count</strong> — racks are counted by scanning, with optional photo evidence.</li>
          <li><strong>Stock by location</strong> — any pallet can be found by location, lot or part number.</li>
          <li><strong>Shipping request</strong> — each pallet in your order is scanned and photographed before it leaves.</li>
        </ul>
      </div>
    </div>
  )
}

export default function DemoPortal({ visitor, onRestart }: { visitor: Visitor; onRestart: () => void }) {
  const data = useMemo(() => buildDemoData(visitor.company || visitor.name, visitor.materials), [visitor])
  const [section, setSection] = useState<SectionId>('dashboard')
  const [tourStep, setTourStep] = useState<number | null>(0)

  const goTour = (i: number) => {
    setTourStep(i)
    setSection(TOUR[i].id)
  }
  const step = tourStep !== null ? TOUR[tourStep] : null
  const firstName = visitor.name.split(' ')[0]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-dasza-navy">
          Thanks, {firstName}. This is a <strong>demo with fictional data</strong> built for {data.company}.
        </p>
        <div className="flex gap-2">
          {tourStep === null && (
            <button onClick={() => goTour(0)} className="px-4 py-2 rounded-full border border-dasza-navy text-dasza-navy text-sm hover:bg-dasza-navy hover:text-white">
              Restart guided tour
            </button>
          )}
          <button onClick={onRestart} className="px-4 py-2 rounded-full text-sm text-dasza-navy hover:bg-gray-100">Start over</button>
        </div>
      </div>

      {/* Portal frame */}
      <div className="rounded-2xl border border-dasza-gray/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden bg-gray-50">
        <div className="flex items-center justify-between bg-dasza-charcoal text-white px-4 py-2.5">
          <div className="flex items-center gap-2 font-semibold whitespace-nowrap">
            DASZA System
            <span className="text-[10px] font-bold uppercase tracking-wider bg-dasza-cyan text-dasza-charcoal rounded px-1.5 py-0.5">Demo</span>
          </div>
          <div className="text-sm text-white/80 truncate max-w-[50%]">{data.company}<span className="hidden sm:inline"> · {visitor.email}</span></div>
        </div>

        <div className="md:grid md:grid-cols-[210px_1fr] min-h-[560px]">
          <nav aria-label="Demo sections" className="bg-white border-b md:border-b-0 md:border-r border-gray-200">
            <ul className="flex md:flex-col overflow-x-auto md:overflow-visible p-2 gap-1">
              {NAV.map((item) => {
                const active = section === item.id
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSection(item.id)
                        const ti = TOUR.findIndex((t) => t.id === item.id)
                        if (tourStep !== null && ti >= 0) setTourStep(ti)
                      }}
                      aria-current={active ? 'page' : undefined}
                      className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap ${
                        active ? 'bg-dasza-navy text-white' : 'text-dasza-navy hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="relative p-4 sm:p-6">
            {step && (
              <div role="status" className="mb-5 rounded-xl border-2 border-dasza-cyan bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-dasza-navy/60">
                      Guided tour · {tourStep! + 1} of {TOUR.length}
                    </div>
                    <div className="text-lg font-semibold text-dasza-navy mt-0.5">{step.title}</div>
                  </div>
                  <button onClick={() => setTourStep(null)} aria-label="Close guided tour" className="p-1 rounded hover:bg-gray-100">
                    <XMarkIcon className="h-5 w-5 text-dasza-navy" />
                  </button>
                </div>
                <p className="text-dasza-navy/80 mt-1 text-sm">{step.body}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-1" aria-hidden>
                    {TOUR.map((t, i) => (
                      <span key={t.id} className={`h-1.5 w-5 rounded-full ${i <= tourStep! ? 'bg-dasza-navy' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button disabled={tourStep === 0} onClick={() => goTour(tourStep! - 1)} className="px-3 py-1.5 rounded-full text-sm text-dasza-navy hover:bg-gray-100 disabled:opacity-40">
                      Back
                    </button>
                    {tourStep! < TOUR.length - 1 ? (
                      <button onClick={() => goTour(tourStep! + 1)} className="px-4 py-1.5 rounded-full text-sm bg-dasza-navy text-white hover:bg-dasza-charcoal">
                        Next
                      </button>
                    ) : (
                      <button onClick={() => setTourStep(null)} className="px-4 py-1.5 rounded-full text-sm bg-dasza-navy text-white hover:bg-dasza-charcoal">
                        Finish & explore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <SectionView key={section} id={section} data={data} />
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="rounded-2xl bg-dasza-navy text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xl font-semibold">Want to see it with your real operation?</div>
          <p className="text-white/80 mt-1">Our team will walk you through onboarding, reporting and IMMEX inventory control.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="px-5 py-2.5 rounded-full bg-white text-dasza-navy font-medium hover:bg-gray-100">Get a quote</Link>
          <Link href="/contact" className="px-5 py-2.5 rounded-full border border-white/70 text-white font-medium hover:bg-white/10">Talk to our team</Link>
        </div>
      </div>
    </div>
  )
}
