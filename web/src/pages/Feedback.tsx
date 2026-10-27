import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MapPin, Star, User, ArrowRight, ImagePlus, X } from 'lucide-react'
import Seo from '../components/Seo'
import { submitTestimonial } from '../lib/firebase'
import { MAX_PHOTOS, compressPhoto, uploadPhotos } from '../lib/photos'
import { trackEvent } from '../lib/analytics'

type PickedPhoto = { id: string; file: File; preview: string }
import logo from '../assets/logo.jpeg'

const PROJECT_OPTIONS = [
  'Full home interiors',
  'Modular kitchen',
  'Wardrobes',
  'Living & TV unit',
  'Pooja unit',
  'Villa',
  'Office / showroom / cafe',
  'Other',
]

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
const MIN_QUOTE = 20
const MAX_QUOTE = 600

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Feedback() {
  // Personal links can prefill the client's name: /feedback?name=Ravi%20Kumar
  const [params] = useSearchParams()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState(params.get('name') ?? '')
  const [city, setCity] = useState(params.get('area') ?? '')
  const [project, setProject] = useState('')
  const [quote, setQuote] = useState('')
  const [consent, setConsent] = useState(true)
  const [website, setWebsite] = useState('') // honeypot
  const [photos, setPhotos] = useState<PickedPhoto[]>([])
  const [uploaded, setUploaded] = useState<number | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const photosRef = useRef(photos)
  photosRef.current = photos

  useEffect(() => {
    trackEvent('feedback_page_view')
    return () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.preview))
  }, [])

  function addPhotos(e: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith('image/'))
    e.target.value = '' // allow re-picking the same file
    const room = MAX_PHOTOS - photos.length
    if (picked.length > room) setError(`You can add up to ${MAX_PHOTOS} photos.`)
    else setError('')
    setPhotos((prev) => [
      ...prev,
      ...picked.slice(0, room).map((file) => ({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file) })),
    ])
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const gone = prev.find((p) => p.id === id)
      if (gone) URL.revokeObjectURL(gone.preview)
      return prev.filter((p) => p.id !== id)
    })
  }

  function validate() {
    if (!rating) return 'Please choose a star rating.'
    if (name.trim().length < 2) return 'Please enter your name.'
    if (city.trim().length < 2) return 'Please enter your area or city.'
    if (quote.trim().length < MIN_QUOTE) return `Please write at least ${MIN_QUOTE} characters about your experience.`
    if (!consent) return 'Please allow us to publish your review on our website.'
    return ''
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const problem = validate()
    if (problem) return setError(problem)
    setError('')

    if (website) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      let photoKeys: string[] = []
      if (photos.length > 0) {
        setUploaded(0)
        const blobs = await Promise.all(photos.map((p) => compressPhoto(p.file)))
        photoKeys = await uploadPhotos(blobs, setUploaded)
      }
      await submitTestimonial({
        name: name.trim(),
        city: city.trim(),
        project,
        rating,
        quote: quote.trim(),
        photos: photoKeys,
      })
      setStatus('success')
      trackEvent('feedback_submit', { rating, project, photos: photoKeys.length })
    } catch (err) {
      console.error('Feedback submit failed', err)
      setStatus('error')
      setError(err instanceof Error && err.message.includes('photo') ? err.message : '')
      trackEvent('feedback_error', { message: err instanceof Error ? err.message : 'unknown' })
    } finally {
      setUploaded(null)
    }
  }

  const shown = hover || rating
  const firstName = name.trim().split(' ')[0]

  return (
    <div className="relative min-h-screen overflow-clip bg-obsidian-900 pb-24 pt-32">
      <Seo title="Share your feedback" description="Tell us about your VELQORASPACES experience." path="/feedback" noindex />
      <div className="pointer-events-none absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-8">
        <div className="text-center">
          <img src={logo} alt="VELQORASPACES" className="mx-auto h-14 w-14 rounded-full object-cover ring-1 ring-gold-400/40" />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-400/70">Client Feedback</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
            How did we <span className="text-gold-foil italic">do?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-ivory/55">
            {firstName ? `Thank you, ${firstName}, for trusting us with your space. ` : 'Thank you for trusting us with your space. '}
            Your words will appear on our website for future clients.
          </p>
        </div>

        <div className="card-glass mt-10 rounded-2xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient shadow-gold"
                >
                  <Check className="h-8 w-8 text-obsidian-900" strokeWidth={3} />
                </motion.span>
                <h2 className="mt-5 font-display text-3xl text-ivory">Thank you{firstName ? `, ${firstName}` : ''}!</h2>
                <p className="mt-2 max-w-sm text-sm text-ivory/60">
                  Your review is now live on our website. It means a lot to our whole studio.
                </p>
                <Link
                  to="/testimonials"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-2.5 text-sm text-gold-300 transition hover:bg-gold-400/10"
                >
                  See it on the website
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{ opacity: 0 }}>
                {/* Rating */}
                <p className="text-center text-xs uppercase tracking-widest text-ivory/50">Your rating</p>
                <div className="mt-3 flex justify-center gap-1.5" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      aria-pressed={rating === n}
                      onClick={() => {
                        setRating(n)
                        setError('')
                      }}
                      onMouseEnter={() => setHover(n)}
                      className="p-1 transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-9 w-9 transition-colors sm:h-10 sm:w-10 ${
                          n <= shown ? 'fill-gold-400 text-gold-400' : 'text-ivory/20'
                        }`}
                        strokeWidth={1.4}
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-1 h-5 text-center text-sm text-gold-300">{RATING_LABELS[shown]}</p>

                {/* Name + area */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-obsidian-300/60 pl-4 transition focus-within:border-gold-400/60">
                    <User className="h-4 w-4 shrink-0 text-ivory/40" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, 60))}
                      placeholder="Your name"
                      autoComplete="name"
                      aria-label="Your name"
                      className="w-full bg-transparent py-3 pr-4 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-obsidian-300/60 pl-4 transition focus-within:border-gold-400/60">
                    <MapPin className="h-4 w-4 shrink-0 text-ivory/40" />
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value.slice(0, 60))}
                      placeholder="Area / city (e.g. Narsingi)"
                      aria-label="Area or city"
                      className="w-full bg-transparent py-3 pr-4 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                    />
                  </label>
                </div>

                {/* Project */}
                <p className="mt-6 text-xs uppercase tracking-widest text-ivory/50">
                  What did we design? <span className="normal-case tracking-normal text-ivory/35">· optional</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {PROJECT_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={project === p}
                      onClick={() => setProject(project === p ? '' : p)}
                      className={`rounded-full border px-3.5 py-2 text-xs transition-all sm:text-[13px] ${
                        project === p
                          ? 'border-gold-400 bg-gold-400/15 text-gold-100'
                          : 'border-white/10 text-ivory/70 hover:border-gold-400/40 hover:text-ivory'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Review */}
                <p className="mt-6 text-xs uppercase tracking-widest text-ivory/50">Your experience</p>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value.slice(0, MAX_QUOTE))}
                  rows={5}
                  placeholder="What did you love about working with us? How does your space feel now?"
                  aria-label="Your experience"
                  className="mt-2.5 w-full resize-none rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm leading-relaxed text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60"
                />
                <p className={`mt-1 text-right text-[11px] ${quote.trim().length < MIN_QUOTE ? 'text-ivory/35' : 'text-gold-400/70'}`}>
                  {quote.length}/{MAX_QUOTE}
                </p>

                {/* Photos */}
                <p className="mt-4 text-xs uppercase tracking-widest text-ivory/50">
                  Photos of your space{' '}
                  <span className="normal-case tracking-normal text-ivory/35">
                    · optional, up to {MAX_PHOTOS}
                  </span>
                </p>
                <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {photos.map((p) => (
                    <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10">
                      <img src={p.preview} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(p.id)}
                        disabled={status === 'submitting'}
                        aria-label="Remove photo"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-obsidian-900/80 text-ivory/80 transition hover:text-gold-300"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => fileInput.current?.click()}
                      disabled={status === 'submitting'}
                      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gold-400/30 text-ivory/50 transition hover:border-gold-400/70 hover:text-gold-300"
                    >
                      <ImagePlus className="h-5 w-5" strokeWidth={1.5} />
                      <span className="text-[11px]">{photos.length === 0 ? 'Add photos' : 'Add more'}</span>
                    </button>
                  )}
                </div>
                <input ref={fileInput} type="file" accept="image/*" multiple onChange={addPhotos} className="hidden" />

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-ivory/60">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-gold-400"
                  />
                  I'm happy for VELQORASPACES to show my name, area and review on its website.
                </label>

                <div aria-live="polite">
                  {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
                  {status === 'error' && (
                    <p className="mt-4 text-xs text-red-400">Something went wrong sending your review. Please try again.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-6 flex h-[50px] w-full items-center justify-center rounded-lg bg-gold-gradient text-sm font-semibold tracking-wide text-obsidian-900 transition hover:shadow-gold disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2.5">
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-obsidian-900/40 border-t-obsidian-900"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                      />
                      {uploaded !== null && `Uploading photos ${uploaded}/${photos.length}…`}
                    </span>
                  ) : (
                    'Submit my review'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
