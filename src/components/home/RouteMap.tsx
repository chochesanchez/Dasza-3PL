'use client'
import { MAP_W, MAP_H, MEXICO_PATH, USA_PATH, PLACES } from './mexicoMap'
import { useI18n } from '@/i18n/I18nProvider'

type Pt = { x: number; y: number }

// Quadratic curve between two points, bowed perpendicular to the segment.
function curve(a: Pt, b: Pt, bend = 0.18) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  return `M${a.x},${a.y} Q${mx - dy * bend},${my + dx * bend} ${b.x},${b.y}`
}

const P = PLACES
// Ocean lanes start at the map edge: Asia across the Pacific, Europe across the Gulf/Atlantic.
const asia = { x: 128, y: 590 }
const europe = { x: 955, y: 318 }
const north = { x: 600, y: 40 }

const ROUTES: { d: string; sea?: boolean; delay: number }[] = [
  { d: curve(asia, P.manzanillo, -0.12), sea: true, delay: 0.2 },
  { d: curve(asia, P.lazaro, -0.06), sea: true, delay: 0.3 },
  { d: curve(europe, P.altamira, 0.08), sea: true, delay: 0.35 },
  { d: curve(europe, P.veracruz, -0.1), sea: true, delay: 0.45 },
  { d: curve(north, P.laredo, 0.1), delay: 0.5 },
  { d: curve(P.manzanillo, P.queretaro, 0.12), delay: 0.9 },
  { d: curve(P.lazaro, P.queretaro, -0.12), delay: 1.0 },
  { d: curve(P.veracruz, P.queretaro, 0.15), delay: 1.1 },
  { d: curve(P.altamira, P.apodaca, -0.12), delay: 1.2 },
  { d: curve(P.laredo, P.apodaca, 0.2), delay: 1.3 },
  { d: curve(P.queretaro, P.apodaca, 0.1), delay: 1.6 },
]

const LABEL: Record<string, { text: string; dx: number; dy: number; anchor?: 'start' | 'end' | 'middle' }> = {
  manzanillo: { text: 'Manzanillo', dx: -14, dy: 4, anchor: 'end' },
  lazaro: { text: 'Lázaro Cárdenas', dx: -14, dy: 16, anchor: 'end' },
  altamira: { text: 'Altamira', dx: 14, dy: 4 },
  veracruz: { text: 'Veracruz', dx: 14, dy: 4 },
  laredo: { text: 'Nuevo Laredo', dx: 14, dy: -6 },
  apodaca: { text: 'Apodaca, N.L.', dx: -16, dy: -12, anchor: 'end' },
  queretaro: { text: 'Querétaro', dx: -16, dy: 4, anchor: 'end' },
}

export default function RouteMap() {
  const { t } = useI18n()
  const nodes = Object.entries(P) as [keyof typeof P, (typeof P)[keyof typeof P]][]
  return (
    <figure className="relative">
      <svg
        viewBox={`120 20 ${MAP_W - 160} ${MAP_H - 30}`}
        className="w-full h-auto"
        role="img"
        aria-labelledby="route-map-title"
      >
        <title id="route-map-title">{t.map.title}</title>
        <path d={USA_PATH} fill="#243140" opacity="0.55" />
        <path d={MEXICO_PATH} fill="#2A3A4B" stroke="#4A5F75" strokeWidth="1.2" strokeLinejoin="round" />
        <text x="470" y="78" fill="#7D8EA0" fontSize="14" letterSpacing="2" className="map-label">{t.map.usa}</text>
        <text x="300" y="604" fill="#5F7184" fontSize="13" className="map-label map-label-minor">{t.map.pacific}</text>
        <text x="735" y="252" fill="#5F7184" fontSize="13" className="map-label map-label-minor">{t.map.gulf}</text>
        <text x={asia.x + 4} y={asia.y - 14} fill="#C9D3DC" fontSize="15" fontWeight="700" letterSpacing="1" className="map-label">{t.map.asia}</text>
        <text x={europe.x - 4} y={europe.y - 14} textAnchor="end" fill="#C9D3DC" fontSize="15" fontWeight="700" letterSpacing="1" className="map-label">{t.map.europe}</text>

        {ROUTES.map((r, i) => (
          <g key={i}>
            <path
              d={r.d}
              pathLength={1}
              fill="none"
              stroke={r.sea ? '#7D8EA0' : '#00B4EF'}
              strokeWidth={r.sea ? 1.5 : 2.4}
              strokeLinecap="round"
              className="route-line"
              style={{ ['--len' as string]: 1, ['--delay' as string]: `${r.delay}s` }}
            />
            <circle r={r.sea ? 3 : 4} fill={r.sea ? '#C9D3DC' : '#FFFFFF'} className="route-dot" opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${3.2 + (i % 3) * 0.6}s`} begin={`${r.delay + 1.6}s`} repeatCount="indefinite" />
              <animateMotion dur={`${3.2 + (i % 3) * 0.6}s`} begin={`${r.delay + 1.6}s`} repeatCount="indefinite" path={r.d} />
            </circle>
          </g>
        ))}

        {nodes.map(([key, n]) => {
          const label = LABEL[key]
          const isDasza = n.kind === 'dasza'
          return (
            <g key={key}>
              {isDasza && <circle cx={n.x} cy={n.y} r="10" fill="#00B4EF" className="node-pulse" style={{ ['--delay' as string]: key === 'queretaro' ? '1.2s' : '0s' }} />}
              <circle cx={n.x} cy={n.y} r={isDasza ? 7 : 4.5} fill={isDasza ? '#00B4EF' : '#E6ECF1'} stroke={isDasza ? '#FFFFFF' : 'none'} strokeWidth="2" />
              <text
                x={n.x + label.dx}
                y={n.y + label.dy}
                textAnchor={label.anchor ?? 'start'}
                fill={isDasza ? '#FFFFFF' : '#B7C3CE'}
                fontSize={isDasza ? 17 : 14}
                fontWeight={isDasza ? 700 : 400}
                className={isDasza ? 'map-label-strong' : 'map-label'}
              >
                {label.text}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-dasza-cyan ring-2 ring-white" /> {t.map.legendWarehouse}</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#E6ECF1]" /> {t.map.legendPort}</span>
        <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-dasza-cyan" /> {t.map.legendFreight}</span>
        <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-[#7D8EA0]" /> {t.map.legendOcean}</span>
      </figcaption>
    </figure>
  )
}
