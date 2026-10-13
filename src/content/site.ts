// Single source of truth for the public site's facts, services, locations and client logos.
// Figures come from DASZA's own documents (IMMEX deck 2024, Retail proposal 2025) unless noted.
// Review any change here with management before publishing.

export const COMPANY = {
  name: 'Dasza 3PL',
  phone: '+52 81 1916 1086',
  phoneHref: 'tel:+528119161086',
  email: 'jmsanchez@dasza.com',
  whatsapp: 'https://wa.me/5218119161086',
  office: 'GDS Business Park, Av. Miguel Alemán 762, El Milagro, 66634 Apodaca, N.L.',
  mapsUrl: 'https://www.google.com/maps/place/GDS+Business+Park/@25.7595496,-100.1962086,967m',
  customsLicense: '6078',
  dltUrl: 'https://dltlogistics.com.mx',
}

// Headline facts. "17+ years" is the long-standing website claim (not in the documents) — confirm before changing.
export const FACTS: { value: string; unit: string; label: string; static?: boolean }[] = [
  { value: '240,000', unit: 'sq ft', label: 'of warehouse space in Apodaca and Querétaro' },
  { value: '3', unit: 'warehouses', label: 'plus a customs office in Manzanillo' },
  { value: '6078', unit: '', label: 'our own customs broker license', static: true },
  { value: '17+', unit: 'years', label: 'running supply chains for manufacturers' },
]

export const CERTIFICATIONS = ['IMMEX AAA', 'OEA', 'C-TPAT']

// The import flow, as DASZA runs it (IMMEX deck, pp. 16–18). This is a real sequence.
export const PROCESS = [
  {
    title: 'Your supplier ships to DASZA',
    text: 'The bill of lading is consigned to DASZA as importer under our IMMEX program — no VAT or duties paid on arrival.',
    image: '/images/site/port-ship.jpg',
    place: 'Origin',
  },
  {
    title: 'We clear customs at the port',
    text: 'Our broker (license 6078) handles pre-inspection, pedimento and IMMEX paperwork in Manzanillo, Altamira, Lázaro Cárdenas or Laredo.',
    image: '/images/site/port-aerial.jpg',
    place: 'Port of entry',
  },
  {
    title: 'Freight to Monterrey or Querétaro',
    text: 'Rail or truck from the port to our warehouses, coordinated by the same team that cleared the cargo.',
    image: '/images/site/rail.jpg',
    place: 'In transit',
  },
  {
    title: 'Bonded storage with full control',
    text: 'Every pallet is received against your packing list, labeled, located and visible to you in Dasza System.',
    image: '/images/site/dasza-pick-pack.jpg',
    place: 'Dasza warehouse',
  },
  {
    title: 'Delivered to your line',
    text: 'We release material to your plant on schedule and transfer it to your IMMEX with a monthly virtual pedimento.',
    image: '/images/site/plant-engineering.jpg',
    place: 'Your plant',
  },
]

export type Service = {
  slug: string
  name: string
  group: 'Import & compliance' | 'Warehousing' | 'Transportation' | 'Value-added'
  summary: string
  image: string
  deliverables: { title: string; text: string }[]
  capabilities: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'immex',
    name: 'IMMEX importer & shelter',
    group: 'Import & compliance',
    summary: 'Import under DASZA’s IMMEX AAA program and defer VAT and duties until material reaches your plant.',
    image: '/images/site/dasza-queretaro-plant.jpg',
    deliverables: [
      { title: 'DASZA as importer of record', text: 'Your supplier ships to us; we import as consignee under our IMMEX program.' },
      { title: 'Virtual transfers', text: 'Monthly V1 pedimentos transfer material to your IMMEX or fiscal program.' },
      { title: 'Shelter in Querétaro', text: 'Industrial space for operations that need to run under our program.' },
    ],
    capabilities: [
      'IMMEX AAA and OEA aligned processes.',
      'Monthly reporting to the Mexican authorities on your behalf.',
      'Bonded inventory control integrated with SAP, Dynamics, Millennium Aduanas and Microsip.',
      'Implementation project: compliance, safety stock planning and KPIs.',
    ],
  },
  {
    slug: 'customs',
    name: 'Customs brokerage',
    group: 'Import & compliance',
    summary: 'Our own customs broker (license 6078) at Mexico’s main ports and borders.',
    image: '/images/site/port-aerial.jpg',
    deliverables: [
      { title: 'Brokerage + IMMEX', text: 'Import and export handling, IMMEX operations and virtual transfers.' },
      { title: 'Digital compliance', text: 'VUCEM, pedimentos and Carta Porte validation.' },
      { title: 'Audit readiness', text: 'Accurate, traceable documentation for every operation.' },
    ],
    capabilities: [
      'Pre-inspection (previo) and classification support.',
      'Operations in Manzanillo, Altamira, Lázaro Cárdenas and Laredo.',
      'Parts catalog with tariff codes (fracción arancelaria) kept with your inventory.',
    ],
  },
  {
    slug: 'warehousing',
    name: 'Warehousing',
    group: 'Warehousing',
    summary: 'Bonded and general warehousing in Apodaca and Querétaro, built around manufacturing inventory.',
    image: '/images/site/warehouse-aisle.jpg',
    deliverables: [
      { title: 'Labeled, scanned, traceable', text: 'Every pallet is labeled and tracked from the dock to its location.' },
      { title: 'Inventory you can see', text: 'Stock, receipts and shipments visible to you in Dasza System.' },
      { title: 'Compliance & safety', text: 'IMMEX/OEA aligned processes and chain of custody.' },
    ],
    capabilities: [
      'Bonded and general storage with dedicated zones by customer and product class.',
      'Racked (1 × 1 × 1.30 m positions) and floor storage for heavy or oversize loads.',
      'Cross-dock for inbound containers and domestic milk-runs.',
      'Quality inspection, rework, packing and kitting.',
    ],
  },
  {
    slug: 'vmi',
    name: 'Vendor managed inventory',
    group: 'Warehousing',
    summary: 'We hold your suppliers’ stock near your plant and release it as production needs it.',
    image: '/images/site/warehouse-racks.jpg',
    deliverables: [
      { title: 'Milk-runs + line-side', text: 'Scheduled vendor pickups, plant milk-runs and line-side delivery.' },
      { title: 'Planning + safety stock', text: 'Cycle counts, ASN, reorder points and safety stock.' },
      { title: 'Supplier orchestration', text: 'Coordination with your suppliers and compliance reporting.' },
    ],
    capabilities: [
      'Vendor hubs and consolidation for international suppliers.',
      'Ownership models: consignment, VMI or transfer at dock.',
      'Forecast sharing and exception reporting.',
      'ASN and labeling compliance for receiving accuracy.',
    ],
  },
  {
    slug: 'storage',
    name: 'Storage',
    group: 'Warehousing',
    summary: 'Short and long-term pallet storage with serialized labeling and RF scanning.',
    image: '/images/site/warehouse-forklift.jpg',
    deliverables: [
      { title: 'Per-pallet pricing', text: 'Clear monthly storage per skid, plus in/out handling.' },
      { title: 'Intermodal intake', text: 'Material received from Manzanillo, Altamira and Veracruz.' },
      { title: 'Ready for VMI', text: 'Cross-dock to your plant or move into vendor-managed inventory.' },
    ],
    capabilities: [
      'Storage for raw material, components and finished goods.',
      'Obsolete and scrap material handled on request.',
      'Periodic inventory reports and reconciliation with your systems.',
    ],
  },
  {
    slug: 'logistics',
    name: 'Freight & logistics',
    group: 'Transportation',
    summary: 'Port-to-plant freight by rail and truck, coordinated with customs and storage.',
    image: '/images/site/truck-mountains.jpg',
    deliverables: [
      { title: 'Intermodal gateways', text: 'Manzanillo, Altamira and Veracruz with cross-dock and drayage.' },
      { title: 'Distribution & milk-runs', text: 'From our CEDIS to plants or stores with proof of delivery.' },
      { title: 'Carrier performance', text: 'On-time tracking and proactive exception handling.' },
    ],
    capabilities: [
      'Port drayage and customs coordination.',
      'FTL/LTL network with on-time tracking.',
      'Consolidation and deconsolidation at regional hubs.',
      'Special handling when required.',
    ],
  },
  {
    slug: 'door-to-door',
    name: 'Transportation for manufacturing',
    group: 'Transportation',
    summary: 'Door-to-door flow from your vendors to your production line, including customs.',
    image: '/images/site/rail.jpg',
    deliverables: [
      { title: 'Plant-to-plant flow', text: 'Vendor pickups, consolidation and line-side delivery.' },
      { title: 'Customs & compliance', text: 'IMMEX/OEA alignment and cross-border management.' },
      { title: 'On-time and damage-free', text: 'Delivery performance reported for every lane.' },
    ],
    capabilities: [
      'Inbound and outbound, customs and last mile to the plant.',
      'Milk-runs, dock appointments and reverse logistics.',
      'Packaging, labeling and documentation as required.',
    ],
  },
  {
    slug: 'last-mile',
    name: 'Distribution & last mile',
    group: 'Transportation',
    summary: 'Scheduled B2B deliveries to plants and stores, run with our sister company DLT Logistics.',
    image: '/images/site/air-cargo.jpg',
    deliverables: [
      { title: 'On-time delivery', text: 'Executed in the service windows you schedule.' },
      { title: 'Proof of delivery', text: 'Photo or e-signature on every completed delivery.' },
      { title: 'Scheduled pickups', text: 'Milk-runs, vendor pickups and dock appointments.' },
    ],
    capabilities: [
      'Palletized, parcel and B2B store or plant deliveries.',
      'Returns and reverse logistics.',
      'On-time reporting with root-cause analysis.',
    ],
  },
  {
    slug: 'sorting',
    name: 'Quality control & rework',
    group: 'Value-added',
    summary: 'Inspection, containment and rework so material reaches your line ready to use.',
    image: '/images/site/dasza-rework.jpg',
    deliverables: [
      { title: 'Inspection & rework', text: 'Containment, inspection, rework and disposition.' },
      { title: 'Kitting & repack', text: 'Light assembly, re-labeling and compliance packaging.' },
      { title: 'On-site teams', text: 'Dedicated crews with agreed service levels and frequent reporting.' },
    ],
    capabilities: [
      'Physical inspection on receipt: material, dimensions, color and origin labeling.',
      'Labeling, wrapping, repackaging and re-palletizing.',
    ],
  },
  {
    slug: 'fulfillment',
    name: 'Fulfillment',
    group: 'Value-added',
    summary: 'Pick, pack and ship for spare parts and e-commerce, with returns handled.',
    image: '/images/site/dasza-pick-pack.jpg',
    deliverables: [
      { title: 'Pick & pack', text: 'Orders picked by box or unit and packed to your spec.' },
      { title: 'Multi-carrier', text: 'Shipped with the carrier that fits each order.' },
      { title: 'Returns', text: 'Received, inspected and restocked or dispositioned.' },
    ],
    capabilities: ['Serialized inventory and QA checks.', 'Carrier integrations and agreed service levels.'],
  },
  {
    slug: 'retail',
    name: 'Retail distribution',
    group: 'Value-added',
    summary: 'Store and DC deliveries with retailer labeling and ASN compliance.',
    image: '/images/site/warehouse-racks.jpg',
    deliverables: [
      { title: 'Retail compliance', text: 'Labeling and packaging to each retailer’s requirements.' },
      { title: 'ASN / EDI', text: 'Advance ship notices to carriers and receivers.' },
      { title: 'Reverse logistics', text: 'Returns collected and processed.' },
    ],
    capabilities: ['Store and distribution center appointments.', 'Labeling, wrapping and re-palletizing per retailer.'],
  },
]

export const SERVICE_GROUPS: Service['group'][] = ['Import & compliance', 'Warehousing', 'Transportation', 'Value-added']

export const SITES = [
  {
    name: 'CEDIS Apodaca',
    area: 120000,
    location: 'Parque Industrial Almacentro, Apodaca, N.L.',
    text: 'Our main bonded and general warehouse, minutes from Monterrey’s manufacturing corridor.',
  },
  {
    name: 'Apodaca Kalos',
    area: 50000,
    location: 'Apodaca, N.L.',
    text: 'Additional capacity for storage and value-added work.',
  },
  {
    name: 'CEDIS Querétaro',
    area: 70000,
    location: 'Parque Industrial Finsa, Querétaro',
    text: 'Warehousing and shelter operations for the Bajío region.',
  },
]

export const GATEWAYS = [
  { name: 'Manzanillo', text: 'Customs office at Torre Puerto, broker 6078.' },
  { name: 'Altamira, Lázaro Cárdenas, Laredo', text: 'Operated with long-standing partners.' },
]

// Client logos — same list and order as the original site.
export const CLIENT_LOGOS: { name: string; src: string }[] = [
  { name: 'Carrier', src: 'Carrier Corporation Logo.png' },
  { name: 'Magna', src: 'Magna Logo.png' },
  { name: 'US Motors', src: 'US Motors Logo.webp' },
  { name: 'RXN', src: 'RXN logo.png' },
  { name: 'Regal Beloit', src: 'Regal Beloit Logo.png' },
  { name: 'Fluidmaster', src: 'fluidmaster logo.png' },
  { name: 'Tuopu', src: 'Tuopu Group Logo.jpeg' },
  { name: 'Superior Industries', src: 'superior industries logo.png' },
  { name: 'Dubal', src: 'Dubai Logo Dark.png' },
  { name: 'Dometic', src: 'Dometic Logo.webp' },
  { name: 'ERD Metal', src: 'erd-metal-canada logo.png' },
  { name: 'NSK', src: 'NSK Japan Logo.webp' },
  { name: 'MotoRad', src: 'MotoRad Logo.webp' },
  { name: 'Metalsa', src: 'Metalsa Logo.avif' },
  { name: 'Pilgrim’s', src: 'Pilgrims Logo.png' },
  { name: 'Munters', src: 'Munters Logo.webp' },
  { name: 'Ternium', src: 'Ternium Logo.png' },
  { name: 'Magnesitas Navarras', src: 'Magnesitas Logo.png' },
  { name: 'Mitsuba', src: 'Mitsuba Corporation Logo.png' },
  { name: 'Elematec', src: 'elematec logo.gif' },
  { name: 'Daimler Truck', src: 'Daimler Trucks Logo.png' },
  { name: 'ConMet', src: 'Conmet Logo.png' },
  { name: 'Toyota', src: 'Toyota Logo.png' },
  { name: 'Whirlpool', src: 'Whirlpool Logo copy.png' },
  { name: 'Soriana', src: 'Soriana Logo copy.webp' },
  { name: 'Walmart', src: 'Walmart Logo 2008 copy.png' },
  { name: 'BBVA', src: 'bbvalogo copy.png' },
  { name: 'Celestica', src: 'Celestica Logo copy.png' },
  { name: 'Office Depot', src: 'Office Depot Logo copy.webp' },
  { name: 'Embraco', src: 'Embraco Logo copy.png' },
  { name: 'Sanmina', src: 'sanminalogo copy.png' },
  { name: 'Rockwell Automation', src: 'Rockwell Automation Logo copy.jpg' },
]

export const logoSrc = (file: string) => encodeURI(`/images/Trusted By logos/${file}`)
