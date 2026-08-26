import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Quote, Sofa, ChefHat, BedDouble, BookOpen, Briefcase, KeyRound } from 'lucide-react'

const HeroScene = lazy(() => import('../three/HeroScene'))
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Marquee from '../components/Marquee'
import { usePopup } from '../context/PopupContext'
import { CITIES, PORTFOLIO, PROCESS_STEPS, SERVICES, STATS, TESTIMONIALS } from '../data/site'

const SERVICE_ICONS = {
  sofa: Sofa,
  kitchen: ChefHat,
  bed: BedDouble,
  study: BookOpen,
  office: Briefcase,
  turnkey: KeyRound,
}

export default function Home() {
  const { openPopup } = usePopup()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian-900">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="absolute inset-0 bg-radial-fade" />}>
            <HeroScene />
          </Suspense>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/10 to-obsidian-900/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian-900 via-transparent to-obsidian-900/60" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 pt-20 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mb-5 text-xs uppercase tracking-[0.5em] text-gold-400/70"
          >
            Interiors Designing Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-5xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl"
          >
            Spaces sculpted for <span className="text-gold-foil italic">how you live.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-ivory/60 sm:mt-6 sm:text-lg"
          >
            VELQORASPACES designs and builds bespoke interiors — from first sketch to final
            handover — blending precision engineering with quiet, timeless luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <button
              onClick={openPopup}
              className="group flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold sm:px-7 sm:py-3.5"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <Link
              to="/portfolio"
              className="flex items-center gap-2 rounded-full border border-gold-400/25 px-6 py-3 text-sm uppercase tracking-widest text-ivory/80 transition hover:border-gold-400/60 hover:text-gold-200 sm:px-7 sm:py-3.5"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 [@media(max-height:700px)]:hidden sm:bottom-8"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-ivory/40">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-400/70 to-transparent" />
        </motion.div>
      </section>

      <Marquee items={CITIES} />

      {/* ABOUT STRIP */}
      <section className="relative bg-obsidian-900 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">The Studio</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
                Design is not decoration.
                <br />
                It's <span className="text-gold-foil italic">architecture of feeling.</span>
              </h2>
              <p className="mt-6 max-w-md text-ivory/55">
                Every VELQORASPACES project begins with how a family actually moves through a
                day — light, sound, storage, gathering. The aesthetics follow. That's why our
                interiors age well, not just photograph well.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gold-300 hover:gap-3 transition-all"
              >
                Our Philosophy <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal delay={0.15} className="grid grid-cols-2 gap-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="card-glass rounded-2xl px-6 py-8 text-center">
                  <p className="font-display text-4xl text-gold-300 sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-ivory/50">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-obsidian-200/40 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">What We Design</p>
            <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">A room for every ritual.</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS]
              return (
                <Reveal key={service.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group card-glass relative h-full overflow-hidden rounded-2xl p-7"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/0 blur-2xl transition-all duration-500 group-hover:bg-gold-400/15" />
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/5 text-gold-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl text-ivory">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/50">{service.desc}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative bg-obsidian-900 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">How We Work</p>
            <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Five steps to move-in day.</h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent lg:block" />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.1}>
                  <div className="relative">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-obsidian-900 font-display text-lg text-gold-300">
                      {step.step}
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ivory">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/50">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="relative bg-obsidian-200/40 py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Selected Work</p>
              <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Interiors, realised.</h2>
            </div>
            <Link
              to="/portfolio"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-gold-300 hover:gap-3 transition-all"
            >
              View Full Portfolio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.slice(0, 6).map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <Link to="/portfolio" className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs uppercase tracking-widest text-gold-300">{item.category}</p>
                    <h3 className="mt-1 font-display text-2xl text-ivory">{item.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-obsidian-900 py-28 sm:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Client Voices</p>
            <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Homes people fall in love with.</h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="card-glass flex h-full flex-col rounded-2xl p-8">
                  <Quote className="h-7 w-7 text-gold-400/40" />
                  <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ivory/70">{t.quote}</p>
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <p className="font-display text-lg text-ivory">{t.name}</p>
                    <p className="text-xs uppercase tracking-widest text-gold-400/60">{t.city}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-obsidian-200/40 py-24">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">
            Let's design your <span className="text-gold-foil italic">next chapter.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ivory/55">
            Book a complimentary consultation with a VELQORASPACES design lead — no
            obligation, just clarity on what's possible.
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
