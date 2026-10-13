// Demo data for the Dasza System walkthrough.
// Everything here is fictional and generated in the browser from the visitor's answers;
// it mirrors the structure of the real reports (Inventario, Entradas, Salidas, Etiquetas,
// Almacenaje, Inventario Cíclico, Facturación) without using any real customer data.

export type MaterialId =
  | 'metal'
  | 'polymer'
  | 'ceramic'
  | 'assemblies'
  | 'raw'
  | 'electronics'
  | 'finished'
  | 'chemicals'
  | 'packaging'
  | 'mro'

export const MATERIALS: { id: MaterialId; label: string; hint: string }[] = [
  { id: 'metal', label: 'Metal parts', hint: 'Castings, stampings, forgings' },
  { id: 'polymer', label: 'Polymers & plastics', hint: 'Resin, molded parts' },
  { id: 'ceramic', label: 'Ceramics & refractories', hint: 'Bricks, insulators' },
  { id: 'assemblies', label: 'Assemblies & components', hint: 'Sub-assemblies, kits' },
  { id: 'raw', label: 'Raw material (bulk)', hint: 'Coils, bags, super sacks' },
  { id: 'electronics', label: 'Electronic components', hint: 'Boards, motors, capacitors' },
  { id: 'finished', label: 'Finished goods', hint: 'Ready for distribution' },
  { id: 'chemicals', label: 'Chemicals / hazmat', hint: 'Requires SDS review' },
  { id: 'packaging', label: 'Packaging & supplies', hint: 'Boxes, film, pallets' },
  { id: 'mro', label: 'Spare parts / MRO', hint: 'Maintenance inventory' },
]

const CATALOG: Record<MaterialId, { desc: { en: string; es: string }; uom: string; hs: string }[]> = {
  metal: [
    { desc: { en: 'Aluminum wheel hub casting', es: 'Maza de rueda de aluminio fundido' }, uom: 'PZA', hs: '8708.70.99' },
    { desc: { en: 'Steel brake drum', es: 'Tambor de freno de acero' }, uom: 'PZA', hs: '8708.30.99' },
    { desc: { en: 'Stamped bracket LH', es: 'Soporte estampado izquierdo' }, uom: 'PZA', hs: '7326.90.99' },
  ],
  polymer: [
    { desc: { en: 'PP resin pellets 25kg', es: 'Resina PP en pellet 25 kg' }, uom: 'KG', hs: '3902.10.01' },
    { desc: { en: 'Molded ABS housing', es: 'Carcasa moldeada de ABS' }, uom: 'PZA', hs: '3926.90.99' },
  ],
  ceramic: [
    { desc: { en: 'Magnesia-carbon brick', es: 'Ladrillo de magnesia-carbono' }, uom: 'PZA', hs: '6902.10.01' },
    { desc: { en: 'Refractory mortar 25kg', es: 'Mortero refractario 25 kg' }, uom: 'KG', hs: '3816.00.01' },
  ],
  assemblies: [
    { desc: { en: 'Air suspension module', es: 'Módulo de suspensión neumática' }, uom: 'PZA', hs: '8708.80.99' },
    { desc: { en: 'Valve sub-assembly kit', es: 'Kit de subensamble de válvula' }, uom: 'KIT', hs: '8481.80.99' },
  ],
  raw: [
    { desc: { en: 'Cold-rolled steel coil', es: 'Rollo de acero laminado en frío' }, uom: 'TON', hs: '7209.16.01' },
    { desc: { en: 'Aluminum ingot', es: 'Lingote de aluminio' }, uom: 'KG', hs: '7601.20.99' },
  ],
  electronics: [
    { desc: { en: 'Hermetic compressor motor', es: 'Motor de compresor hermético' }, uom: 'PZA', hs: '8414.30.99' },
    { desc: { en: 'Run capacitor 45µF', es: 'Capacitor de marcha 45µF' }, uom: 'PZA', hs: '8532.25.01' },
  ],
  finished: [
    { desc: { en: 'Fill valve retail pack', es: 'Válvula de llenado empaque retail' }, uom: 'CJA', hs: '8481.80.99' },
    { desc: { en: 'Condensing unit 2HP', es: 'Unidad condensadora 2 HP' }, uom: 'PZA', hs: '8418.69.99' },
  ],
  chemicals: [
    { desc: { en: 'Industrial adhesive 20L', es: 'Adhesivo industrial 20 L' }, uom: 'LT', hs: '3506.91.99' },
  ],
  packaging: [
    { desc: { en: 'Corrugated box 60x40x40', es: 'Caja corrugada 60x40x40' }, uom: 'PZA', hs: '4819.10.01' },
    { desc: { en: 'Stretch film 18in', es: 'Película estirable 18 in' }, uom: 'ROL', hs: '3920.10.99' },
  ],
  mro: [
    { desc: { en: 'Bearing 6205-2RS', es: 'Rodamiento 6205-2RS' }, uom: 'PZA', hs: '8482.10.99' },
    { desc: { en: 'V-belt B-52', es: 'Banda en V B-52' }, uom: 'PZA', hs: '4010.32.01' },
  ],
}

// Deterministic PRNG so the same visitor sees the same numbers while navigating.
function seeded(seedText: string) {
  let h = 2166136261
  for (let i = 0; i < seedText.length; i++) {
    h ^= seedText.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type InventoryRow = {
  item: string
  description: string
  uom: string
  hsCode: string
  quantity: number
  pallets: number
  location: string
  warehouse: string
}

export type MovementRow = {
  date: string
  folio: string
  reference: string
  item: string
  quantity: number
  uom: string
  pallets: number
}

export type LabelStatus = 'stock' | 'shipped' | 'printed'

export type LabelRow = {
  labelId: string
  item: string
  lot: string
  quantity: number
  location: string
  receivedOn: string
  status: LabelStatus
}

export type AgingBucket = { bucket: number; pallets: number }

export type CycleCount = {
  name: string
  date: string
  scanned: number
  expected: number
  variances: number
}

export type BillingKey = 'storage' | 'palletIn' | 'palletOut' | 'labeling' | 'wrapping'
export type BillingLine = { key: BillingKey; qty: number; rate: number }

export type DemoData = {
  company: string
  inventory: InventoryRow[]
  receipts: MovementRow[]
  shipments: MovementRow[]
  labels: LabelRow[]
  aging: AgingBucket[]
  cycleCounts: CycleCount[]
  billing: BillingLine[]
  kpis: { pallets: number; skus: number; receiptsMonth: number; shipmentsMonth: number; accuracy: number; dockToStockHrs: number }
}

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function buildDemoData(company: string, materials: MaterialId[], lang: 'en' | 'es' = 'en'): DemoData {
  const rand = seeded(`${company}|${materials.join(',')}`)
  const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]
  const chosen: MaterialId[] = materials.length ? materials : ['assemblies', 'finished']
  const prefix = (company.replace(/[^A-Za-z]/g, '').slice(0, 3) || 'CLI').toUpperCase()
  const warehouses = ['CEDIS Apodaca', 'CEDIS Apodaca', 'CEDIS Querétaro']

  const items = chosen.flatMap((m) => CATALOG[m]).slice(0, 10)
  const inventory: InventoryRow[] = items.map((it, i) => {
    const pallets = int(4, 60)
    return {
      item: `${prefix}-${String(1000 + i * 37).padStart(5, '0')}`,
      description: it.desc[lang],
      uom: it.uom,
      hsCode: it.hs,
      quantity: pallets * int(24, 480),
      pallets,
      location: `${pick(['A', 'B', 'C', 'D'])}${String(int(1, 24)).padStart(2, '0')}-${int(1, 5)}`,
      warehouse: pick(warehouses),
    }
  })

  const today = new Date()
  const daysAgo = (n: number) => new Date(today.getTime() - n * 86400000)

  const movement = (kind: 'IN' | 'OUT', n: number): MovementRow[] =>
    Array.from({ length: n }, (_, i) => {
      const inv = pick(inventory)
      const pallets = int(1, 12)
      return {
        date: fmtDate(daysAgo(i * int(1, 3) + 1)),
        folio: `${kind === 'IN' ? 'REC' : 'EMB'}-${int(24000, 26999)}`,
        reference: kind === 'IN' ? `INV ${int(100000, 999999)}` : `SO ${int(50000, 59999)}`,
        item: inv.item,
        quantity: pallets * int(24, 300),
        uom: inv.uom,
        pallets,
      }
    })

  const receipts = movement('IN', 8)
  const shipments = movement('OUT', 8)

  const labels: LabelRow[] = Array.from({ length: 10 }, (_, i) => {
    const inv = pick(inventory)
    const status = pick<LabelStatus>(['stock', 'stock', 'stock', 'shipped', 'printed'])
    return {
      labelId: `DZ${int(1000000, 1999999)}`,
      item: inv.item,
      lot: `L${int(2400, 2699)}-${String.fromCharCode(65 + (i % 6))}`,
      quantity: int(24, 480),
      location: status === 'shipped' ? '—' : inv.location,
      receivedOn: fmtDate(daysAgo(int(2, 220))),
      status,
    }
  })

  const totalPallets = inventory.reduce((s, r) => s + r.pallets, 0)
  const shares = [0.38, 0.27, 0.18, 0.11, 0.06]
  const aging: AgingBucket[] = shares.map((share, i) => ({ bucket: i, pallets: Math.round(totalPallets * share) }))

  const cycleCounts: CycleCount[] = [0, 1, 2].map((i) => {
    const expected = int(80, 260)
    const variances = int(0, 3)
    return {
      name: `CC-${fmtDate(daysAgo(i * 30 + 3)).slice(0, 7)}-${pick(['RACK A', 'RACK B', 'FLOOR', 'MEZZ'])}`,
      date: fmtDate(daysAgo(i * 30 + 3)),
      scanned: expected - variances,
      expected,
      variances,
    }
  })

  const palletsIn = receipts.reduce((s, r) => s + r.pallets, 0)
  const palletsOut = shipments.reduce((s, r) => s + r.pallets, 0)
  // Rates follow the published per-unit tariff structure; amounts are illustrative only.
  const billing: BillingLine[] = [
    { key: 'storage', qty: totalPallets, rate: 12 },
    { key: 'palletIn', qty: palletsIn, rate: 3 },
    { key: 'palletOut', qty: palletsOut, rate: 3 },
    { key: 'labeling', qty: int(200, 900), rate: 0.25 },
    { key: 'wrapping', qty: palletsOut, rate: 0.25 },
  ]

  const accuracyCounts = cycleCounts.reduce(
    (acc, c) => ({ s: acc.s + c.scanned, e: acc.e + c.expected }),
    { s: 0, e: 0 },
  )

  return {
    company,
    inventory,
    receipts,
    shipments,
    labels,
    aging,
    cycleCounts,
    billing,
    kpis: {
      pallets: totalPallets,
      skus: inventory.length,
      receiptsMonth: receipts.length,
      shipmentsMonth: shipments.length,
      accuracy: Math.round((accuracyCounts.s / accuracyCounts.e) * 1000) / 10,
      dockToStockHrs: Math.round((1 + rand()) * 10) / 10,
    },
  }
}
