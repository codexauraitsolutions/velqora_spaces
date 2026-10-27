import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Reveal from './Reveal'
import { fetchTestimonials, type Testimonial } from '../lib/firebase'

const INITIAL_VISIBLE = 6

function Stars({ value, className = 'h-4 w-4' }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${className} ${n <= value ? 'fill-gold-400 text-gold-400' : 'text-ivory/15'}`} />
      ))}
    </span>
  )
}

/** Client reviews submitted through /feedback. Hidden until at least one exists. */
export default function Testimonials() {
  const { hash } = useLocation()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  // Start loading a little before the section scrolls into view.
  const nearView = useInView(sentinelRef, { once: true, margin: '0px 0px 800px 0px' })
  const wantsSection = hash === '#testimonials'
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (!nearView && !wantsSection) return
    let cancelled = false
    fetchTestimonials()
      .then((list) => !cancelled && setReviews(list))
      .catch((err) => console.error('Could not load testimonials', err))
    return () => {
      cancelled = true
    }
  }, [nearView, wantsSection])

  useEffect(() => {
    if (wantsSection && reviews.length > 0) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [wantsSection, reviews.length])

  if (reviews.length === 0) return <div ref={sentinelRef} aria-hidden />

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_VISIBLE)

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-clip bg-obsidian-900 py-28 sm:py-36">
      <div ref={sentinelRef} aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-400/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Client Voices</p>
          <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Homes people fall in love with.</h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-2">
            <Stars value={Math.round(average)} />
            <span className="text-sm text-ivory/70">
              <span className="font-semibold text-ivory">{average.toFixed(1)}</span> from {reviews.length} client
              {reviews.length === 1 ? ' review' : ' reviews'}
            </span>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {visible.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.1} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <figure className="card-glass flex h-full flex-col rounded-2xl p-8">
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-gold-400/40" />
                  <Stars value={t.rating} className="h-3.5 w-3.5" />
                </div>
                <blockquote className="mt-5 flex-1 whitespace-pre-line text-[15px] leading-relaxed text-ivory/70">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/5 pt-4">
                  <p className="font-display text-lg text-ivory">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-gold-400/60">
                    {[t.city, t.project].filter(Boolean).join(' · ')}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {reviews.length > INITIAL_VISIBLE && !showAll && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-gold-400/40 px-6 py-2.5 text-sm text-gold-300 transition hover:bg-gold-400/10"
            >
              Read more reviews
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
