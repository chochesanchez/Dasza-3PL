import Reveal from './Reveal'

type Props = {
  title: string
  description: string
  icon?: React.ReactNode
}

export default function FeatureCard({ title, description, icon }: Props) {
  return (
    <Reveal>
      <div className="rounded-xl border border-dasza-gray/40 p-6 shadow-sm hover:shadow-md transition h-full flex flex-col items-center text-center">
        {icon && (
          <div className="mb-3 text-dasza-cyan">
            {icon}
          </div>
        )}
        <div className="text-dasza-navy font-semibold text-lg md:text-xl">{title}</div>
        <p className="text-dasza-navy/80 mt-2 text-sm md:text-base flex-1">{description}</p>
      </div>
    </Reveal>
  )
}


