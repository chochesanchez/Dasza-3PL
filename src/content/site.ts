// Structural data for the public site: numbers, images, slugs and client logos.
// All visible text (names, descriptions, labels) lives in src/i18n/dictionaries/{en,es}.ts.
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

// Headline numbers, in the same order as `facts` in the dictionaries.
// "17+ years" is the long-standing website claim (not in the documents) — confirm before changing.
export const FACT_VALUES: { value: string; count: boolean }[] = [
  { value: '240,000', count: true },
  { value: '3', count: true },
  { value: '6078', count: false }, // license number: never animate
  { value: '17+', count: true },
]

export const CERTIFICATIONS = ['IMMEX AAA', 'OEA', 'C-TPAT']

// Photos for the five process steps (text in dictionaries `process`).
export const PROCESS_IMAGES = [
  '/images/site/port-ship.jpg',
  '/images/site/port-aerial.jpg',
  '/images/site/rail.jpg',
  '/images/site/dasza-pick-pack.jpg',
  '/images/site/plant-engineering.jpg',
]

export type ServiceGroup = 'import' | 'warehousing' | 'transport' | 'value'
export type ServiceSlug =
  | 'immex'
  | 'customs'
  | 'warehousing'
  | 'vmi'
  | 'storage'
  | 'logistics'
  | 'door-to-door'
  | 'last-mile'
  | 'sorting'
  | 'fulfillment'
  | 'retail'

export const SERVICES: { slug: ServiceSlug; group: ServiceGroup; image: string }[] = [
  { slug: 'immex', group: 'import', image: '/images/site/dasza-queretaro-plant.jpg' },
  { slug: 'customs', group: 'import', image: '/images/site/port-aerial.jpg' },
  { slug: 'warehousing', group: 'warehousing', image: '/images/site/warehouse-aisle.jpg' },
  { slug: 'vmi', group: 'warehousing', image: '/images/site/warehouse-racks.jpg' },
  { slug: 'storage', group: 'warehousing', image: '/images/site/warehouse-forklift.jpg' },
  { slug: 'logistics', group: 'transport', image: '/images/site/truck-mountains.jpg' },
  { slug: 'door-to-door', group: 'transport', image: '/images/site/rail.jpg' },
  { slug: 'last-mile', group: 'transport', image: '/images/site/air-cargo.jpg' },
  { slug: 'sorting', group: 'value', image: '/images/site/dasza-rework.jpg' },
  { slug: 'fulfillment', group: 'value', image: '/images/site/dasza-pick-pack.jpg' },
  { slug: 'retail', group: 'value', image: '/images/site/warehouse-racks.jpg' },
]

export const SERVICE_GROUPS: ServiceGroup[] = ['import', 'warehousing', 'transport', 'value']

// Square footage per site, in the same order as `sites.items` in the dictionaries.
export const SITE_AREAS = [120000, 50000, 70000]

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
