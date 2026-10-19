import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PHONE_COUNTRIES } from '@/lib/phoneCountries'

// Country code picker next to the phone input. The native arrow is replaced by our own chevron,
// so it stays inside the box on every browser (Safari draws its arrow outside narrow selects).
export default function PhoneCountrySelect({
  label,
  otherLabel,
  ...props
}: { label: string; otherLabel: string } & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>) {
  return (
    <div className="relative shrink-0">
      <select
        {...props}
        aria-label={label}
        className="h-12 appearance-none rounded-md border border-dasza-line bg-white pl-3 pr-9 text-dasza-ink focus:outline-none focus:ring-2 focus:ring-dasza-cyan"
      >
        {PHONE_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>{c.code === 'OTHER' ? otherLabel : `${c.code} ${c.dial}`}</option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-dasza-gray" aria-hidden />
    </div>
  )
}
