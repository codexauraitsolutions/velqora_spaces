import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { usePopup } from '../context/PopupContext'
import { PORTFOLIO } from '../data/site'

const CATEGORIES = ['All', ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))]

export default function Portfolio() {
  const { openPopup } = usePopup()
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="bg-obsidian-900 pt-32">
      <Seo
        title="Portfolio"
        description="See interiors designed and built by VELQORASPACES — including the Rudrani Silks showroom in Hyderabad, a full retail interior fit-out from concept to completion."
        path="/portfolio"
      />
      <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Portfolio</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            Interiors, <span className="text-gold-foil italic">realised.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/55">
            A glimpse into homes and spaces we've designed and built.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition ${
                filter === cat
                  ? 'border-gold-400 bg-gold-400/15 text-gold-200'
                  : 'border-white/10 text-ivory/60 hover:border-gold-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 pb-28 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-gold-300">{item.category} · {item.city}</p>
                  <h3 className="mt-1 font-display text-2xl text-ivory">{item.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">See your space here next.</h2>
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
