import {
  ArrowRight,
  Home as HomeIcon,
  ChefHat,
  Hammer,
  Tv,
  Building2,
  Store,
  UtensilsCrossed,
  KeyRound,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { usePopup } from '../context/PopupContext'
import { SERVICES } from '../data/site'

const SERVICE_ICONS = {
  residential: HomeIcon,
  kitchen: ChefHat,
  carpentry: Hammer,
  theater: Tv,
  commercial: Building2,
  showroom: Store,
  cafe: UtensilsCrossed,
  turnkey: KeyRound,
}

export default function Services() {
  const { openPopup } = usePopup()
  return (
    <div className="bg-obsidian-900 pt-32">
      <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Services</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            Every space, <span className="text-gold-foil italic">considered.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/55">
            From a single custom wardrobe to a full turnkey home or commercial space, our
            services are built around one promise — design and execution under one accountable roof.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6 pb-28 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS]
            return (
              <Reveal key={service.title} delay={i * 0.06}>
                <div className="group card-glass relative flex h-full items-start gap-6 overflow-hidden rounded-2xl p-8">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/0 blur-2xl transition-all duration-500 group-hover:bg-gold-400/15" />
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/5 text-gold-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ivory">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/50">{service.desc}</p>
                    <button
                      onClick={openPopup}
                      className="mt-5 flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:gap-3 transition-all"
                    >
                      Enquire <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">Not sure where to start?</h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/55">
            A free consultation is the fastest way to find out. No pressure, just clarity.
          </p>
          <button
            onClick={openPopup}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>
    </div>
  )
}
