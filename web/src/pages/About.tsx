import { ArrowRight, Gem, Handshake, Leaf, Ruler } from 'lucide-react'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import { usePopup } from '../context/PopupContext'
import { STATS } from '../data/site'

const VALUES = [
  { icon: Ruler, title: 'Precision First', desc: 'Every millimetre is drawn, reviewed and approved before a single panel is cut.' },
  { icon: Gem, title: 'Quiet Luxury', desc: 'Materials and detailing chosen to feel rich without ever shouting.' },
  { icon: Handshake, title: 'One Owner, One Call', desc: 'A single project lead accountable from concept to handover.' },
  { icon: Leaf, title: 'Considered Sourcing', desc: 'Responsibly sourced materials with a build made to last generations.' },
]

export default function About() {
  const { openPopup } = usePopup()
  return (
    <div className="bg-obsidian-900 pt-32">
      <section className="mx-auto max-w-5xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">About the Studio</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            We design spaces that <span className="text-gold-foil italic">hold your story.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-ivory/55">
            VELQORASPACES is an interiors designing studio built on one belief: a home should feel
            like it was always meant to be yours. We combine architectural rigour with an eye for
            texture, light and material honesty — delivered as a single, accountable service from
            first sketch to final key handover.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6 sm:px-8">
        <Reveal className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-glass rounded-2xl px-4 py-8 text-center">
              <p className="font-display text-3xl text-gold-300 sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-widest text-ivory/50">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6 sm:px-8">
        <Reveal className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">What We Stand For</p>
          <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Principles, not trends.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-glass h-full rounded-2xl p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/5 text-gold-300">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl text-ivory">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/50">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mt-28 overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">Ready to begin?</h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/55">
            Tell us about your space and we'll take it from there.
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
