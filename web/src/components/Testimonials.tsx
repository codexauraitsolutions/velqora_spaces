import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star, X } from 'lucide-react'
import Reveal from './Reveal'
import { fetchTestimonials, type Testimonial } from '../lib/firebase'
import { photoUrl } from '../lib/photos'

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

/**
 * Client reviews submitted through /feedback. On Home (default) it loads on
 * approach and stays hidden until a review exists; `page` renders /testimonials.
 */
export default function Testimonials({ page = false }: { page?: boolean }) {
  const { hash } = useLocation()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  // Start loading a little before the section scrolls into view.
  const nearView = useInView(sentinelRef, { once: true, margin: '0px 0px 800px 0px' })
  const wantsSection = hash === '#testimonials'
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [loaded, setLoaded] = useState(false)
  const [viewer, setViewer] = useState<Viewer>(null)

  useEffect(() => {
    if (!page && !nearView && !wantsSection) return
    let cancelled = false
    fetchTestimonials(page ? 60 : 12)
      .then((list) => !cancelled && setReviews(list))
      .catch((err) => console.error('Could not load testimonials', err))
      .finally(() => !cancelled && setLoaded(true))
    return () => {
      cancelled = true
    }
  }, [page, nearView, wantsSection])

  useEffect(() => {
    if (wantsSection && reviews.length > 0) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [wantsSection, reviews.length])

  if (reviews.length === 0 && !(page && loaded)) return <div ref={sentinelRef} aria-hidden className={page ? 'min-h-screen' : ''} />

  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0
  const visible = page ? reviews : reviews.slice(0, INITIAL_VISIBLE)
  const Heading = page ? 'h1' : 'h2'

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`relative overflow-clip bg-obsidian-900 ${page ? 'min-h-screen pb-28 pt-36 sm:pt-40' : 'py-28 sm:py-36'}`}
    >
      <div ref={sentinelRef} aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-400/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Client Voices</p>
          <Heading className="mt-4 font-display text-4xl text-ivory sm:text-5xl">Homes people fall in love with.</Heading>
          {reviews.length > 0 && (
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-2">
            <Stars value={Math.round(average)} />
            <span className="text-sm text-ivory/70">
              <span className="font-semibold text-ivory">{average.toFixed(1)}</span> from {reviews.length} client
              {reviews.length === 1 ? ' review' : ' reviews'}
            </span>
          </div>
          )}
          {page && reviews.length === 0 && (
            <p className="mt-6 text-ivory/55">Client reviews will appear here soon.</p>
          )}
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
                {t.photos.length > 0 && photoUrl(t.photos[0]) && (
                  <div className="mt-5 flex gap-2">
                    {t.photos.map((key, idx) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setViewer({ urls: t.photos.map(photoUrl), index: idx, name: t.name })}
                        aria-label={`View photo ${idx + 1} from ${t.name}`}
                        className="aspect-square w-14 overflow-hidden rounded-md border border-white/10 transition hover:border-gold-400/60"
                      >
                        <img
                          src={photoUrl(key)}
                          alt=""
                          loading="lazy"
                          // Never show a broken-image icon if a photo can't be loaded.
                          onError={(e) => ((e.currentTarget.parentElement as HTMLElement).style.display = 'none')}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
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

        {!page && reviews.length > INITIAL_VISIBLE && (
          <div className="mt-10 text-center">
            <Link
              to="/testimonials"
              className="inline-block rounded-full border border-gold-400/40 px-6 py-2.5 text-sm text-gold-300 transition hover:bg-gold-400/10"
            >
              Read all reviews
            </Link>
          </div>
        )}

        {page && (
          <Reveal className="mx-auto mt-20 max-w-md text-center">
            <p className="font-display text-2xl text-ivory">Worked with us?</p>
            <p className="mt-2 text-sm text-ivory/55">We'd love to hear how your space feels now.</p>
            <Link
              to="/feedback"
              className="mt-6 inline-block rounded-full bg-gold-gradient px-7 py-3 text-xs font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold"
            >
              Share your experience
            </Link>
          </Reveal>
        )}
      </div>

      <PhotoViewer viewer={viewer} onChange={setViewer} />
    </section>
  )
}

type Viewer = { urls: string[]; index: number; name: string } | null

function PhotoViewer({ viewer, onChange }: { viewer: Viewer; onChange: (v: Viewer) => void }) {
  useEffect(() => {
    if (!viewer) return
    const step = (d: number) =>
      onChange({ ...viewer, index: (viewer.index + d + viewer.urls.length) % viewer.urls.length })
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer, onChange])

  return (
    <AnimatePresence>
      {viewer && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Photos from ${viewer.name}`}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <motion.img
            key={viewer.urls[viewer.index]}
            src={viewer.urls[viewer.index]}
            alt={`Photo ${viewer.index + 1} from ${viewer.name}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => onChange(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-ivory/80 transition hover:text-gold-300"
          >
            <X className="h-5 w-5" />
          </button>
          {viewer.urls.length > 1 && (
            <>
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange({ ...viewer, index: (viewer.index + d + viewer.urls.length) % viewer.urls.length })
                  }}
                  aria-label={d < 0 ? 'Previous photo' : 'Next photo'}
                  className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-ivory/80 transition hover:text-gold-300 ${
                    d < 0 ? 'left-3' : 'right-3'
                  }`}
                >
                  {d < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
              ))}
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-widest text-ivory/60">
                {viewer.index + 1} / {viewer.urls.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
