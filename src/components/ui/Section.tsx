import Reveal from './Reveal'

type Props = {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  center?: boolean
  id?: string
}

export default function Section({ id, title, subtitle, children, className, center = true }: Props) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-12 ${className ?? ''}`}>
      {(title || subtitle) && (
        <div className={`mb-6 ${center ? 'text-center' : ''}`}>
          {title && <Reveal><h2 className="text-3xl md:text-4xl font-semibold text-dasza-navy">{title}</h2></Reveal>}
          {subtitle && <Reveal delay={0.05}><p className="text-dasza-navy/80 mt-2 max-w-3xl mx-auto">{subtitle}</p></Reveal>}
        </div>
      )}
      {children}
    </section>
  )
}


