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
import { buildDemoData, type DemoData, type LabelStatus } from './demoData'
import { useI18n } from '@/i18n/I18nProvider'
import { fmt, type Dict } from '@/i18n/dictionaries'
import type { Visitor } from './Onboarding'

type SectionId = 'dashboard' | 'inventory' | 'receipts' | 'shipments' | 'labels' | 'aging' | 'cycle' | 'billing' | 'mobile'

const NAV: { id: SectionId; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', icon: Squares2X2Icon },
  { id: 'inventory', icon: ArchiveBoxIcon },
  { id: 'receipts', icon: ArrowDownOnSquareIcon },
  { id: 'shipments', icon: ArrowUpOnSquareIcon },
  { id: 'labels', icon: QrCodeIcon },
  { id: 'aging', icon: ClockIcon },
  { id: 'cycle', icon: ClipboardDocumentCheckIcon },
  { id: 'billing', icon: BanknotesIcon },
  { id: 'mobile', icon: DevicePhoneMobileIcon },
]

const TOUR: SectionId[] = ['dashboard', 'inventory', 'receipts', 'shipments', 'labels', 'aging', 'cycle', 'billing', 'mobile']


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

function ExportButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 rounded-lg border border-dasza-gray/60 px-3 py-1.5 text-sm text-dasza-navy hover:border-dasza-navy">
      <ArrowDownTrayIcon className="h-4 w-4" aria-hidden /> {label}
    </button>
  )
}

function AgingBars({ data, labels }: { data: DemoData; labels: string[] }) {
  const max = Math.max(...data.aging.map((a) => a.pallets), 1)
  return (
    <ul className="space-y-2">
      {data.aging.map((a) => (
        <li key={a.bucket} className="grid grid-cols-[110px_1fr_48px] items-center gap-3 text-sm">
          <span className="text-dasza-navy/80">{labels[a.bucket]}</span>
          <span className="h-3 rounded-full bg-gray-100 overflow-hidden">
            <span className="block h-full rounded-full bg-dasza-navy" style={{ width: `${(a.pallets / max) * 100}%` }} />
          </span>
          <span className="text-right tabular-nums text-dasza-navy">{a.pallets}</span>
        </li>
      ))}
    </ul>
  )
}

const statusCls: Record<LabelStatus, string> = {
  stock: 'bg-emerald-50 text-emerald-800',
  shipped: 'bg-gray-100 text-gray-700',
  printed: 'bg-amber-50 text-amber-800',
}

function SectionView({ id, data, d, num, usd }: { id: SectionId; data: DemoData; d: Dict['demo']; num: (x: number) => string; usd: (x: number) => string }) {
  const n = num
  const [warehouse, setWarehouse] = useState('__all')
  const [query, setQuery] = useState('')

  if (id === 'dashboard') {
    return (
      <div className="space-y-6">
        <SectionTitle title={fmt(d.welcome, { company: data.company })} subtitle={d.sample} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label={d.kpiPallets} value={n(data.kpis.pallets)} sub={fmt(d.kpiSkus, { n: data.kpis.skus })} />
          <Kpi label={d.kpiReceipts} value={n(data.kpis.receiptsMonth)} sub={d.kpiReceiptsSub} />
          <Kpi label={d.kpiShipments} value={n(data.kpis.shipmentsMonth)} sub={d.kpiShipmentsSub} />
          <Kpi label={d.kpiAccuracy} value={`${data.kpis.accuracy}%`} sub={d.kpiAccuracySub} />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-dasza-gray/40 bg-white p-4">
            <div className="font-semibold text-dasza-navy mb-3">{d.agingTitle}</div>
            <AgingBars data={data} labels={d.agingBuckets} />
          </div>
          <div className="rounded-xl border border-dasza-gray/40 bg-white p-4">
            <div className="font-semibold text-dasza-navy mb-3">{d.latest}</div>
            <ul className="divide-y divide-gray-100 text-sm">
              {[...data.receipts.slice(0, 3).map((r) => ({ ...r, kind: 'IN' })), ...data.shipments.slice(0, 3).map((r) => ({ ...r, kind: 'OUT' }))]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((r) => (
                  <li key={r.folio + r.kind} className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${r.kind === 'IN' ? 'bg-emerald-50 text-emerald-800' : 'bg-sky-50 text-sky-800'}`}>{r.kind === 'IN' ? d.in : d.out}</span>
                      <span className="text-dasza-charcoal">{r.folio}</span>
                      <span className="text-dasza-navy/60 hidden sm:inline">{r.item}</span>
                    </span>
                    <span className="text-dasza-navy/70 tabular-nums">{r.pallets} {d.plt}, {r.date}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (id === 'inventory') {
    const warehouses = ['__all', ...Array.from(new Set(data.inventory.map((r) => r.warehouse)))]
    const rows = data.inventory.filter(
      (r) => (warehouse === '__all' || r.warehouse === warehouse) && `${r.item} ${r.description}`.toLowerCase().includes(query.toLowerCase()),
    )
    return (
      <div>
        <SectionTitle
          title={d.invTitle}
          subtitle={d.invSub}
          action={<ExportButton label={d.export} onClick={() => downloadCsv('dasza-demo-inventory.csv', rows)} />}
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <label className="text-sm text-dasza-navy">
            <span className="sr-only">{d.warehouse}</span>
            <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="rounded-lg border border-dasza-gray/60 px-3 py-1.5">
              {warehouses.map((w) => <option key={w} value={w}>{w === '__all' ? d.all : w}</option>)}
            </select>
          </label>
          <label className="text-sm flex-1 min-w-[180px]">
            <span className="sr-only">{d.search}</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={d.search} className="w-full rounded-lg border border-dasza-gray/60 px-3 py-1.5" />
          </label>
        </div>
        <Table
          headers={d.invCols}
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
          title={id === 'receipts' ? d.receiptsTitle : d.shipmentsTitle}
          subtitle={d.last30}
          action={<ExportButton label={d.export} onClick={() => downloadCsv(`dasza-demo-${id}.csv`, rows)} />}
        />
        <Table
          headers={[d.moveCols.date, d.moveCols.folio, id === 'receipts' ? d.moveCols.invoice : d.moveCols.order, d.moveCols.item, d.moveCols.qty, d.moveCols.uom, d.moveCols.pallets]}
          align={['l', 'l', 'l', 'l', 'r', 'l', 'r']}
          rows={rows.map((r) => [r.date, r.folio, r.reference, r.item, n(r.quantity), r.uom, r.pallets])}
        />
      </div>
    )
  }

  if (id === 'labels') {
    return (
      <div>
        <SectionTitle title={d.labelsTitle} subtitle={d.labelsSub} action={<ExportButton label={d.export} onClick={() => downloadCsv('dasza-demo-labels.csv', data.labels)} />} />
        <Table
          headers={d.labelCols}
          align={['l', 'l', 'l', 'r', 'l', 'l', 'l']}
          rows={data.labels.map((l) => [
            <span key="l" className="font-mono">{l.labelId}</span>,
            l.item,
            l.lot,
            n(l.quantity),
            l.location,
            l.receivedOn,
            <span key="s" className={`text-xs font-medium px-2 py-0.5 rounded ${statusCls[l.status]}`}>{d.status[l.status]}</span>,
          ])}
        />
      </div>
    )
  }

  if (id === 'aging') {
    return (
      <div className="space-y-6">
        <SectionTitle title={d.agingSection} subtitle={d.agingSub} />
        <div className="rounded-xl border border-dasza-gray/40 bg-white p-5 max-w-2xl">
          <AgingBars data={data} labels={d.agingBuckets} />
        </div>
      </div>
    )
  }

  if (id === 'cycle') {
    return (
      <div className="space-y-6">
        <SectionTitle title={d.cycleTitle} subtitle={d.cycleSub} />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
          <Kpi label={d.cycleAccuracy} value={`${data.kpis.accuracy}%`} />
          <Kpi label={d.cycleCounts} value={String(data.cycleCounts.length)} />
          <Kpi label={d.cycleVariances} value={String(data.cycleCounts.reduce((s, c) => s + c.variances, 0))} />
        </div>
        <Table
          headers={d.cycleCols}
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
        <SectionTitle title={d.billingTitle} subtitle={d.billingSub} />
        <Table
          headers={d.billingCols}
          align={['l', 'l', 'r', 'r', 'r']}
          rows={[
            ...data.billing.map((b) => [d.billingLines[b.key].concept, d.billingLines[b.key].unit, n(b.qty), usd(b.rate), usd(b.qty * b.rate)]),
            [<strong key="t">{d.subtotal}</strong>, '', '', '', <strong key="v">{usd(total)}</strong>],
          ]}
        />
        <p className="text-xs text-dasza-navy/60">{d.billingNote}</p>
      </div>
    )
  }

  // mobile
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
      <div className="mx-auto w-[240px] rounded-[2rem] border-8 border-dasza-charcoal bg-white shadow-lg overflow-hidden" aria-hidden>
        <div className="bg-dasza-navy text-white text-center text-sm py-3 font-semibold">Dasza Mobile</div>
        <div className="p-3 space-y-2">
          {d.appScreens.map((t) => (
            <div key={t} className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-dasza-navy">{t}</div>
          ))}
          <div className="mt-3 rounded-lg bg-gray-900 h-28 grid place-items-center">
            <QrCodeIcon className="h-12 w-12 text-white/80" />
          </div>
          <div className="text-center text-xs text-dasza-navy/60 pb-2">{d.appScan}</div>
        </div>
      </div>
      <div>
        <SectionTitle title={d.appTitle} subtitle={d.appSub} />
        <ul className="space-y-3 text-dasza-navy/90">
          {d.appItems.map((it) => (
            <li key={it.title}><strong>{it.title}</strong>: {it.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function DemoPortal({ visitor, onRestart }: { visitor: Visitor; onRestart: () => void }) {
  const { t, lang, href } = useI18n()
  const d = t.demo
  const locale = lang === 'es' ? 'es-MX' : 'en-US'
  const num = (x: number) => x.toLocaleString(locale)
  const usd = (x: number) => x.toLocaleString(locale, { style: 'currency', currency: 'USD' })
  const data = useMemo(() => buildDemoData(visitor.company || visitor.name || d.yourCompany, visitor.materials, lang), [visitor, lang, d.yourCompany])
  const [section, setSection] = useState<SectionId>('dashboard')
  const [tourStep, setTourStep] = useState<number | null>(0)

  const goTour = (i: number) => {
    setTourStep(i)
    setSection(TOUR[i])
  }
  const step = tourStep !== null ? d.tour[TOUR[tourStep]] : null
  const firstName = visitor.name.split(' ')[0]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-dasza-navy">{fmt(d.thanks, { name: firstName, company: data.company })}</p>
        <div className="flex gap-2">
          {tourStep === null && (
            <button onClick={() => goTour(0)} className="px-4 py-2 rounded-full border border-dasza-navy text-dasza-navy text-sm hover:bg-dasza-navy hover:text-white">
              {d.restartTour}
            </button>
          )}
          <button onClick={onRestart} className="px-4 py-2 rounded-full text-sm text-dasza-navy hover:bg-gray-100">{d.startOver}</button>
        </div>
      </div>

      {/* Portal frame */}
      <div className="rounded-lg border border-dasza-line shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] overflow-hidden bg-gray-50">
        <div className="flex items-center justify-between bg-dasza-charcoal text-white px-4 py-2.5">
          <div className="flex items-center gap-2 font-semibold whitespace-nowrap">
            DASZA System
            <span className="text-[10px] font-bold uppercase tracking-wider bg-dasza-cyan text-dasza-charcoal rounded px-1.5 py-0.5">Demo</span>
          </div>
          <div className="text-sm text-white/80 truncate max-w-[50%]">{data.company}<span className="hidden sm:inline"> · {visitor.email}</span></div>
        </div>

        <div className="md:grid md:grid-cols-[210px_1fr] min-h-[560px]">
          <nav aria-label={d.sections} className="bg-white border-b md:border-b-0 md:border-r border-gray-200">
            <ul className="flex md:flex-col overflow-x-auto md:overflow-visible p-2 gap-1">
              {NAV.map((item) => {
                const active = section === item.id
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSection(item.id)
                        const ti = TOUR.indexOf(item.id)
                        if (tourStep !== null && ti >= 0) setTourStep(ti)
                      }}
                      aria-current={active ? 'page' : undefined}
                      className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap ${
                        active ? 'bg-dasza-navy text-white' : 'text-dasza-navy hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {d.nav[item.id]}
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
                    <div className="text-xs font-semibold text-dasza-navy/60">
                      {fmt(d.tourOf, { n: tourStep! + 1, total: TOUR.length })}
                    </div>
                    <div className="text-lg font-semibold text-dasza-navy mt-0.5">{step.title}</div>
                  </div>
                  <button onClick={() => setTourStep(null)} aria-label={d.closeTour} className="p-1 rounded hover:bg-gray-100">
                    <XMarkIcon className="h-5 w-5 text-dasza-navy" />
                  </button>
                </div>
                <p className="text-dasza-navy/80 mt-1 text-sm">{step.body}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-1" aria-hidden>
                    {TOUR.map((id, i) => (
                      <span key={id} className={`h-1.5 w-5 rounded-full ${i <= tourStep! ? 'bg-dasza-navy' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button disabled={tourStep === 0} onClick={() => goTour(tourStep! - 1)} className="px-3 py-1.5 rounded-full text-sm text-dasza-navy hover:bg-gray-100 disabled:opacity-40">
                      {d.back}
                    </button>
                    {tourStep! < TOUR.length - 1 ? (
                      <button onClick={() => goTour(tourStep! + 1)} className="px-4 py-1.5 rounded-md text-sm bg-dasza-ink text-white hover:bg-dasza-charcoal">
                        {d.next}
                      </button>
                    ) : (
                      <button onClick={() => setTourStep(null)} className="px-4 py-1.5 rounded-md text-sm bg-dasza-ink text-white hover:bg-dasza-charcoal">
                        {d.finish}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <SectionView key={section} id={section} data={data} d={d} num={num} usd={usd} />
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="rounded-lg bg-dasza-ink text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xl font-semibold">{d.ctaTitle}</div>
          <p className="text-white/80 mt-1">{d.ctaText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={href('/quote')} className="inline-flex items-center h-11 px-5 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-white">{d.ctaQuote}</Link>
          <Link href={href('/contact')} className="inline-flex items-center h-11 px-5 rounded-md border border-white/40 text-white font-medium hover:border-white">{d.ctaTalk}</Link>
        </div>
      </div>
    </div>
  )
}
