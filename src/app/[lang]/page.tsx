import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import ContactForm from '@/components/ui/ContactForm'
import TextButton from '@/components/ui/TextButton'
import RouteMap from '@/components/home/RouteMap'
import ProcessSteps from '@/components/home/ProcessSteps'
import ServiceIndex from '@/components/home/ServiceIndex'
import SystemPreview from '@/components/home/SystemPreview'
import LogoMarquee from '@/components/home/LogoMarquee'
import Sites from '@/components/home/Sites'
import VideoHero from '@/components/home/VideoHero'
import CountUp from '@/components/motion/CountUp'
import ParallaxImage from '@/components/motion/ParallaxImage'
import { FACT_VALUES, CERTIFICATIONS, COMPANY } from '@/content/site'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const PHOTOS = ['/images/site/dasza-pick-pack.jpg', '/images/site/dasza-rework.jpg', '/images/site/dasza-queretaro-plant.jpg']

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  const href = (p: string) => localePath(lang, p)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero: looping sea video pinned under the header */}
        <VideoHero
          desktop={{ mp4: '/videos/dasza-ship-1080.mp4', webm: '/videos/dasza-ship-1080.webm' }}
          mobile={{ mp4: '/videos/dasza-ship-720.mp4', webm: '/videos/dasza-ship-720.webm' }}
          poster="/videos/dasza-ship-poster.jpg"
          label={t.home.videoLabel}
        >
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] max-w-2xl">{t.home.heroTitle}</h1>
          <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed max-w-xl">{t.home.heroText}</p>
          {/* Phones only: from sm up the header already shows "Get a quote" */}
          <div className="sm:hidden mt-5"><TextButton href={href('/quote')} tone="dark">{t.common.getQuote}</TextButton></div>
        </VideoHero>

        {/* Content layer: slides up over the pinned video */}
        <div className="relative z-10 -mt-6 rounded-t-[28px] overflow-clip bg-white shadow-[0_-24px_48px_-12px_rgba(0,0,0,0.35)]">
        {/* Gateways map + facts */}
        <section className="bg-dasza-ink text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 md:pt-24 pb-12 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{t.home.mapTitle}</h2>
              <p className="mt-5 text-lg text-white/75 leading-relaxed">{t.home.mapText}</p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label={t.common.certifications}>
                {CERTIFICATIONS.map((c) => (
                  <li key={c} className="px-2.5 py-1 rounded border border-white/20 text-xs text-white/75">{c}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 lg:-mr-8">
              <RouteMap />
            </div>
          </div>
          <div className="border-t border-white/10">
            <dl className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {t.facts.map((f, i) => {
                const v = FACT_VALUES[i]
                return (
                  <div key={f.label} className="bg-dasza-ink px-5 sm:px-8 py-6 lg:py-8 flex flex-col">
                    <dt className="order-2 mt-1 text-sm text-white/60 leading-snug">{f.label}</dt>
                    <dd className="order-1 flex items-baseline gap-1.5">
                      <span className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold">{v.count ? <CountUp value={v.value} /> : v.value}</span>
                      {f.unit && <span className="text-sm sm:text-base text-white/70 whitespace-nowrap">{f.unit}</span>}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-16 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-8">
          <ProcessSteps />
        </section>

        {/* Services */}
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-xl">{t.home.servicesTitle}</h2>
              <TextButton href={href('/services')}>{t.common.allServices}</TextButton>
            </div>
            <ServiceIndex />
          </div>
        </section>

        {/* Dasza System */}
        <section className="bg-dasza-ink text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{t.home.systemTitle}</h2>
              <p className="mt-5 text-lg text-white/75 leading-relaxed">{t.home.systemText}</p>
              <div className="mt-8"><TextButton href={href('/dasza-system')} tone="dark">{t.home.systemCta}</TextButton></div>
            </div>
            <div className="lg:col-span-7">
              <SystemPreview />
            </div>
          </div>
        </section>

        {/* Sites */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 mb-12">
            <h2 className="lg:col-span-8 font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{t.home.sitesTitle}</h2>
            <p className="lg:col-span-8 text-lg text-dasza-navy leading-relaxed max-w-3xl">{t.home.sitesText}</p>
          </div>
          <Sites />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PHOTOS.map((src, i) => (
              <ParallaxImage key={src} src={src} alt={t.home.photos[i]} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] rounded-lg" />
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-wrap items-end justify-between gap-6 mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-[1.1] max-w-2xl">{t.home.clientsTitle}</h2>
            <span className="hidden sm:block"><TextButton href={href('/about#clients')}>{t.common.seeAllClients}</TextButton></span>
          </div>
          <LogoMarquee />
          {/* Phones: the link sits under the strip */}
          <div className="sm:hidden mt-6 px-5"><TextButton href={href('/about#clients')}>{t.common.seeAllClients}</TextButton></div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
            <div className="max-w-2xl mb-10">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{t.home.contactTitle}</h2>
              <p className="mt-5 text-lg text-dasza-navy leading-relaxed">
                {t.home.contactText}{' '}
                <a href={COMPANY.phoneHref} className="font-semibold text-dasza-ink whitespace-nowrap hover:text-dasza-cyan600">{COMPANY.phone}</a>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
