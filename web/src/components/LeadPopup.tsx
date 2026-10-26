import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  Check,
  ArrowLeft,
  ArrowRight,
  Star,
  ShieldCheck,
  PhoneCall,
  Mail,
  User,
  MapPin,
  Sunrise,
  Sun,
  Sunset,
  LockKeyhole,
  Building,
  Building2,
  Castle,
  House,
  Hotel,
  Store,
  type LucideIcon,
} from 'lucide-react'
import { usePopup } from '../context/PopupContext'
import { BRAND, CITIES } from '../data/site'
import { WhatsappGlyph } from './icons/BrandIcons'
import { submitConsultationLead } from '../lib/firebase'
import { trackEvent } from '../lib/analytics'
import logo from '../assets/logo.jpeg'
import stepOneImage from '../assets/portfolio/residence-marble-tv-wall.jpg'
import stepTwoImage from '../assets/portfolio/residence-modular-kitchen-white.jpg'
import stepThreeImage from '../assets/portfolio/rudrani-lounge.jpg'

const PROPERTY_OPTIONS: { label: string; icon: LucideIcon }[] = [
  { label: '1 BHK', icon: Building },
  { label: '2 BHK', icon: Building2 },
  { label: '3 BHK', icon: Hotel },
  { label: '4+ BHK / Duplex', icon: House },
  { label: 'Villa', icon: Castle },
  { label: 'Commercial', icon: Store },
]

const SCOPE_OPTIONS = [
  'Full home interiors',
  'Modular kitchen',
  'Wardrobes',
  'Living & TV unit',
  'Pooja unit',
  'False ceiling & lighting',
  'Home theater',
  'Office / showroom / cafe',
]

const BUDGET_OPTIONS = ['Under ₹5L', '₹5 – 10L', '₹10 – 20L', '₹20L +', 'Not sure yet']
const TIMELINE_OPTIONS = ['Right away', 'In 1 – 3 months', 'In 3 – 6 months', 'Just exploring']

const SLOT_OPTIONS: { label: string; hint: string; icon: LucideIcon }[] = [
  { label: 'Morning', hint: '10 AM – 1 PM', icon: Sunrise },
  { label: 'Afternoon', hint: '1 – 4 PM', icon: Sun },
  { label: 'Evening', hint: '4 – 7 PM', icon: Sunset },
]

const STEPS = [
  {
    title: 'Your space',
    kicker: 'Where are we designing?',
    image: stepOneImage,
    caption: 'Marble TV wall · Private residence',
  },
  {
    title: 'Your vision',
    kicker: 'What should we create?',
    image: stepTwoImage,
    caption: 'Modular kitchen · Private residence',
  },
  {
    title: 'Your details',
    kicker: 'Where should we reach you?',
    image: stepThreeImage,
    caption: 'Lounge · Rudrani',
  },
]

const NEXT_STEPS = [
  { title: 'Design lead call', desc: 'Within 24 hours, at your preferred slot' },
  { title: 'Site visit & measure', desc: 'Free, at a time that suits you' },
  { title: '3D concept presentation', desc: 'See your space before we build it' },
]

const INDIAN_MOBILE = /^[6-9]\d{9}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_FORM = {
  propertyType: '',
  city: '',
  scope: [] as string[],
  budget: '',
  timeline: '',
  name: '',
  phone: '',
  email: '',
  callbackSlot: 'Morning',
  whatsappOptIn: true,
  website: '', // honeypot — real visitors never see or fill this
}

export default function LeadPopup() {
  const { isOpen, closePopup } = usePopup()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isOpen) return
    trackEvent('consultation_open', { page_path: window.location.pathname })
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  function update<K extends keyof typeof INITIAL_FORM>(key: K, value: (typeof INITIAL_FORM)[K]) {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('form_start', { form_name: 'design_consultation' })
    }
    setError('')
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleScope(item: string) {
    update('scope', form.scope.includes(item) ? form.scope.filter((s) => s !== item) : [...form.scope, item])
  }

  function validate(s: number) {
    if (s === 0) {
      if (!form.propertyType) return 'Pick the type of property you are designing.'
      if (!form.city) return 'Select the city your property is in.'
    }
    if (s === 1) {
      if (form.scope.length === 0) return 'Choose at least one thing you would like designed.'
      if (!form.budget) return 'Select an approximate budget — it helps us plan your concept.'
      if (!form.timeline) return 'Let us know when you would like to start.'
    }
    if (s === 2) {
      if (form.name.trim().length < 2) return 'Please enter your name.'
      if (!INDIAN_MOBILE.test(form.phone)) return 'Enter a valid 10-digit Indian mobile number.'
      if (form.email && !EMAIL.test(form.email.trim())) return 'That email address does not look right.'
    }
    return ''
  }

  function goNext() {
    const problem = validate(step)
    if (problem) return setError(problem)
    trackEvent('consultation_step_complete', { step: step + 1, step_name: STEPS[step].title })
    setDirection(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    setError('')
    setDirection(-1)
    setStep((s) => s - 1)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (step < STEPS.length - 1) return goNext()
    const problem = validate(step)
    if (problem) return setError(problem)

    // Bots fill hidden fields; pretend success and drop the lead.
    if (form.website) {
      setReference('VS-000000')
      setStatus('success')
      return
    }

    setError('')
    setStatus('submitting')
    try {
      const { website: _honeypot, ...lead } = form
      const ref = await submitConsultationLead({
        ...lead,
        name: lead.name.trim(),
        email: lead.email.trim().toLowerCase(),
      })
      setReference(ref)
      setStatus('success')
      trackEvent('generate_lead', {
        currency: 'INR',
        value: 1,
        lead_source: 'consultation_popup',
        property_type: form.propertyType,
        budget: form.budget,
        city: form.city,
      })
    } catch (err) {
      console.error('Consultation submit failed', err)
      setStatus('error')
      trackEvent('consultation_error', { message: err instanceof Error ? err.message : 'unknown' })
    }
  }

  function handleClose() {
    if (status !== 'success' && startedRef.current) {
      trackEvent('consultation_abandon', { last_step: step + 1 })
    }
    closePopup()
    window.setTimeout(() => {
      setStep(0)
      setForm(INITIAL_FORM)
      setStatus('idle')
      setError('')
      setReference('')
      startedRef.current = false
    }, 300)
  }

  // Prefilled with the full brief so the studio gets every detail on WhatsApp,
  // even when the Firestore save failed.
  const details: [string, string][] = [
    ['Name', form.name.trim()],
    ['Mobile', form.phone && `+91 ${form.phone}`],
    ['Email', form.email.trim()],
    ['Property', [form.propertyType, form.city].filter(Boolean).join(', ')],
    ['Scope', form.scope.join(', ')],
    ['Budget', form.budget],
    ['Start', form.timeline],
    ['Best time to call', form.callbackSlot],
  ]
  const whatsappMessage = [
    `Hi VELQORASPACES, I'd like a free design consultation${reference ? ` (ref ${reference})` : ''}.`,
    '',
    ...details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
  ].join('\n')
  const whatsappHref = `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-title"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="relative flex min-h-full items-center justify-center">
            <motion.div
              className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-gold-400/25 bg-obsidian-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <BriefPanel step={status === 'success' ? 2 : step} form={form} />

              {/* Form panel */}
              <div className="relative flex min-h-[540px] flex-col p-6 sm:p-8">
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/20 text-ivory/70 transition hover:border-gold-400/60 hover:text-gold-300"
                >
                  <X className="h-4 w-4" />
                </button>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessView
                      key="success"
                      name={form.name}
                      phone={form.phone}
                      slot={form.callbackSlot}
                      reference={reference}
                      whatsappHref={whatsappHref}
                      onDone={handleClose}
                    />
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-1 flex-col"
                    >
                      {/* Header + progress */}
                      <div className="pr-10">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-400/80">
                          Step {step + 1} of {STEPS.length} · {STEPS[step].title}
                        </p>
                        <h2 id="consultation-title" className="mt-2 font-display text-[26px] leading-tight text-ivory sm:text-[30px]">
                          Get a <span className="text-gold-foil italic">free</span> design consultation
                        </h2>
                        <p className="mt-1 text-sm text-ivory/50">{STEPS[step].kicker}</p>
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-1.5" aria-hidden>
                        {STEPS.map((s, i) => (
                          <span key={s.title} className="h-1 overflow-hidden rounded-full bg-white/10">
                            <motion.span
                              className="block h-full bg-gold-gradient"
                              initial={false}
                              animate={{ width: i <= step ? '100%' : '0%' }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </span>
                        ))}
                      </div>

                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        aria-hidden
                      />

                      <div className="relative mt-6 flex-1">
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={step}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction * -28 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                          >
                            {step === 0 && (
                              <>
                                <FieldLabel>Property type</FieldLabel>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                  {PROPERTY_OPTIONS.map(({ label, icon: Icon }) => {
                                    const active = form.propertyType === label
                                    return (
                                      <button
                                        type="button"
                                        key={label}
                                        aria-pressed={active}
                                        onClick={() => update('propertyType', label)}
                                        className={`group relative flex flex-col items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                                          active
                                            ? 'border-gold-400 bg-gold-400/10 shadow-gold'
                                            : 'border-white/10 bg-obsidian-300/40 hover:border-gold-400/40'
                                        }`}
                                      >
                                        <Icon
                                          className={`h-5 w-5 transition ${active ? 'text-gold-300' : 'text-ivory/45 group-hover:text-gold-300/80'}`}
                                          strokeWidth={1.5}
                                        />
                                        <span className={`text-sm ${active ? 'text-gold-100' : 'text-ivory/75'}`}>{label}</span>
                                        {active && (
                                          <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient">
                                            <Check className="h-2.5 w-2.5 text-obsidian-900" strokeWidth={4} />
                                          </span>
                                        )}
                                      </button>
                                    )
                                  })}
                                </div>

                                <FieldLabel className="mt-5" htmlFor="lead-city">
                                  Property location
                                </FieldLabel>
                                <div className="relative">
                                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/40" />
                                  <select
                                    id="lead-city"
                                    value={form.city}
                                    onChange={(e) => update('city', e.target.value)}
                                    className="w-full appearance-none rounded-lg border border-white/10 bg-obsidian-300/60 py-3 pl-11 pr-4 text-sm text-ivory outline-none transition focus:border-gold-400/60"
                                  >
                                    <option value="" className="bg-obsidian-200">Select your city</option>
                                    {CITIES.map((c) => (
                                      <option key={c} value={c} className="bg-obsidian-200">
                                        {c}
                                      </option>
                                    ))}
                                    <option value="Other" className="bg-obsidian-200">Other</option>
                                  </select>
                                </div>
                              </>
                            )}

                            {step === 1 && (
                              <>
                                <FieldLabel>
                                  What should we design? <span className="normal-case tracking-normal text-ivory/35">· pick all that apply</span>
                                </FieldLabel>
                                <div className="flex flex-wrap gap-2">
                                  {SCOPE_OPTIONS.map((item) => (
                                    <Chip key={item} active={form.scope.includes(item)} onClick={() => toggleScope(item)}>
                                      {form.scope.includes(item) && <Check className="h-3 w-3" strokeWidth={3} />}
                                      {item}
                                    </Chip>
                                  ))}
                                </div>

                                <FieldLabel className="mt-5">Approximate budget</FieldLabel>
                                <div className="flex flex-wrap gap-2">
                                  {BUDGET_OPTIONS.map((b) => (
                                    <Chip key={b} active={form.budget === b} onClick={() => update('budget', b)}>
                                      {b}
                                    </Chip>
                                  ))}
                                </div>

                                <FieldLabel className="mt-5">When would you like to start?</FieldLabel>
                                <div className="flex flex-wrap gap-2">
                                  {TIMELINE_OPTIONS.map((t) => (
                                    <Chip key={t} active={form.timeline === t} onClick={() => update('timeline', t)}>
                                      {t}
                                    </Chip>
                                  ))}
                                </div>
                              </>
                            )}

                            {step === 2 && (
                              <>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                  <IconInput icon={User} className="sm:col-span-2">
                                    <input
                                      value={form.name}
                                      onChange={(e) => update('name', e.target.value)}
                                      placeholder="Full name"
                                      autoComplete="name"
                                      aria-label="Full name"
                                      className="w-full bg-transparent py-3 pr-4 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                                    />
                                  </IconInput>
                                  <div className="flex overflow-hidden rounded-lg border border-white/10 bg-obsidian-300/60 transition focus-within:border-gold-400/60">
                                    <span className="flex items-center gap-1.5 border-r border-white/10 px-3 text-sm text-ivory/60">
                                      <PhoneCall className="h-3.5 w-3.5" /> +91
                                    </span>
                                    <input
                                      value={form.phone}
                                      onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                      placeholder="Mobile number"
                                      inputMode="numeric"
                                      autoComplete="tel-national"
                                      aria-label="Mobile number"
                                      className="w-full bg-transparent px-3 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                                    />
                                  </div>
                                  <IconInput icon={Mail}>
                                    <input
                                      type="email"
                                      value={form.email}
                                      onChange={(e) => update('email', e.target.value)}
                                      placeholder="Email (optional)"
                                      autoComplete="email"
                                      aria-label="Email (optional)"
                                      className="w-full bg-transparent py-3 pr-4 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                                    />
                                  </IconInput>
                                </div>

                                <FieldLabel className="mt-5">Best time to call you</FieldLabel>
                                <div className="grid grid-cols-3 gap-2">
                                  {SLOT_OPTIONS.map(({ label, hint, icon: Icon }) => {
                                    const active = form.callbackSlot === label
                                    return (
                                      <button
                                        type="button"
                                        key={label}
                                        aria-pressed={active}
                                        onClick={() => update('callbackSlot', label)}
                                        className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-all ${
                                          active
                                            ? 'border-gold-400 bg-gold-400/10 text-gold-100'
                                            : 'border-white/10 bg-obsidian-300/40 text-ivory/70 hover:border-gold-400/40'
                                        }`}
                                      >
                                        <Icon className={`h-4 w-4 ${active ? 'text-gold-300' : 'text-ivory/45'}`} strokeWidth={1.6} />
                                        <span className="text-xs sm:text-sm">{label}</span>
                                        <span className="text-[10px] text-ivory/40">{hint}</span>
                                      </button>
                                    )
                                  })}
                                </div>

                                <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-obsidian-300/40 px-4 py-3">
                                  <span className="flex items-center gap-2.5 text-sm text-ivory/75">
                                    <WhatsappGlyph className="h-4 w-4 text-[#25D366]" />
                                    Share design ideas & updates on WhatsApp
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={form.whatsappOptIn}
                                    onChange={(e) => update('whatsappOptIn', e.target.checked)}
                                    className="peer sr-only"
                                  />
                                  <span className="relative h-5 w-9 shrink-0 rounded-full bg-white/15 transition peer-checked:bg-gold-400 peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400/60 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-ivory after:transition peer-checked:after:translate-x-4" />
                                </label>
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Feedback */}
                      <div aria-live="polite" className="min-h-[1.25rem]">
                        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
                        {status === 'error' && (
                          <p className="mt-4 text-xs text-red-400">
                            We couldn't send your request just now. Please try again, or{' '}
                            <a href={whatsappHref} target="_blank" rel="noreferrer noopener" className="underline hover:text-red-300">
                              message us on WhatsApp
                            </a>
                            .
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        {step > 0 && (
                          <button
                            type="button"
                            onClick={goBack}
                            aria-label="Previous step"
                            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-lg border border-white/10 text-ivory/70 transition hover:border-gold-400/50 hover:text-gold-300"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="group relative flex h-[50px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gold-gradient text-sm font-semibold tracking-wide text-obsidian-900 transition hover:shadow-gold disabled:opacity-70"
                        >
                          {status === 'submitting' ? (
                            <motion.span
                              className="h-4 w-4 rounded-full border-2 border-obsidian-900/40 border-t-obsidian-900"
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                            />
                          ) : step < STEPS.length - 1 ? (
                            <>
                              Continue
                              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </>
                          ) : (
                            'Book my free consultation'
                          )}
                        </button>
                      </div>
                      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-ivory/40">
                        <LockKeyhole className="h-3 w-3" />
                        Your details stay private. No spam — just one call from a design lead.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Left panel: a live "design brief" that fills in as the visitor answers. */
function BriefPanel({ step, form }: { step: number; form: typeof INITIAL_FORM }) {
  const rows = [
    { label: 'Space', value: [form.propertyType, form.city].filter(Boolean).join(' · ') },
    { label: 'Scope', value: form.scope.length > 2 ? `${form.scope.slice(0, 2).join(', ')} +${form.scope.length - 2}` : form.scope.join(', ') },
    { label: 'Budget', value: form.budget },
    { label: 'Start', value: form.timeline },
  ]

  return (
    <div className="relative hidden overflow-hidden bg-obsidian-900 md:block">
      <AnimatePresence mode="sync">
        <motion.img
          key={STEPS[step].image}
          src={STEPS[step].image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/85 via-obsidian-900/40 to-obsidian-900/95" />

      <div className="relative flex h-full flex-col justify-between p-7">
        <div className="flex items-center gap-2">
          <img src={logo} alt="VELQORASPACES" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-400/40" />
          <span className="font-display text-sm tracking-[0.25em] text-gold-300">VELQORASPACES</span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-ivory/80">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              ))}
            </span>
            4.9/5 · 200+ spaces delivered
          </div>

          {/* Live brief card */}
          <div className="mt-4 rounded-xl border border-gold-400/25 bg-obsidian-900/70 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400/80">Your design brief</p>
              <span className="text-[10px] text-ivory/40">{rows.filter((r) => r.value).length}/4</span>
            </div>
            <dl className="mt-3 space-y-2">
              {rows.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-3 text-xs">
                  <dt className="w-12 shrink-0 text-ivory/40">{label}</dt>
                  <dd className="min-w-0 flex-1 truncate">
                    <AnimatePresence mode="wait">
                      {value ? (
                        <motion.span
                          key={value}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-ivory/90"
                        >
                          {value}
                        </motion.span>
                      ) : (
                        <span className="block h-[1px] translate-y-[-3px] border-b border-dashed border-white/15" />
                      )}
                    </AnimatePresence>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-ivory/55">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-300" />
            10-year warranty · In-house manufacturing
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-ivory/35">{STEPS[step].caption}</p>
        </div>
      </div>
    </div>
  )
}

function SuccessView({
  name,
  phone,
  slot,
  reference,
  whatsappHref,
  onDone,
}: {
  name: string
  phone: string
  slot: string
  reference: string
  whatsappHref: string
  onDone: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col justify-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold"
      >
        <Check className="h-7 w-7 text-obsidian-900" strokeWidth={3} />
      </motion.span>
      <h3 className="mt-5 font-display text-3xl text-ivory">
        You're booked, <span className="text-gold-foil italic">{name.trim().split(' ')[0]}</span>.
      </h3>
      <p className="mt-2 text-sm text-ivory/60">
        A design lead will call you on +91 {phone} this {slot.toLowerCase()}, or the next working day.
      </p>
      {reference && (
        <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-3 py-1 text-xs text-gold-200">
          Booking ref <span className="font-semibold tracking-wider">{reference}</span>
        </p>
      )}

      <ol className="mt-7 space-y-4 border-l border-gold-400/25 pl-5">
        {NEXT_STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            className="relative"
          >
            <span className="absolute -left-[27px] top-0.5 flex h-3 w-3 items-center justify-center rounded-full border border-gold-400 bg-obsidian-200">
              {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />}
            </span>
            <p className="text-sm text-ivory">{s.title}</p>
            <p className="text-xs text-ivory/45">{s.desc}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackEvent('consultation_whatsapp_click', { reference })}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-semibold text-obsidian-900 transition hover:brightness-110"
        >
          <WhatsappGlyph className="h-4 w-4" />
          Chat on WhatsApp now
        </a>
        <button
          onClick={onDone}
          className="flex-1 rounded-lg border border-gold-400/40 py-3 text-sm text-gold-300 transition hover:bg-gold-400/10"
        >
          Done
        </button>
      </div>
    </motion.div>
  )
}

function FieldLabel({ children, className = '', htmlFor }: { children: ReactNode; className?: string; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className={`mb-2.5 block text-xs uppercase tracking-widest text-ivory/50 ${className}`}>
      {children}
    </label>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-all sm:text-[13px] ${
        active
          ? 'border-gold-400 bg-gold-400/15 text-gold-100'
          : 'border-white/10 text-ivory/70 hover:border-gold-400/40 hover:text-ivory'
      }`}
    >
      {children}
    </button>
  )
}

function IconInput({ icon: Icon, className = '', children }: { icon: LucideIcon; className?: string; children: ReactNode }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-white/10 bg-obsidian-300/60 pl-4 transition focus-within:border-gold-400/60 ${className}`}
    >
      <Icon className="h-4 w-4 shrink-0 text-ivory/40" />
      {children}
    </div>
  )
}
