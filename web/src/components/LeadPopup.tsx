import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, Sparkles, ShieldCheck, PhoneCall } from 'lucide-react'
import { usePopup } from '../context/PopupContext'
import { CITIES, PROPERTY_TYPES } from '../data/site'
import logo from '../assets/logo.jpeg'

const PERKS = [
  { icon: Sparkles, text: 'Bespoke 3D design concept' },
  { icon: ShieldCheck, text: '10-year craftsmanship warranty' },
]

export default function LeadPopup() {
  const { isOpen, closePopup } = usePopup()
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsappOptIn, setWhatsappOptIn] = useState(true)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!propertyType || !location || !name.trim() || phone.trim().length < 10) {
      setError('Please fill in every field to book your consultation.')
      return
    }
    setError('')
    setStatus('submitting')
    window.setTimeout(() => setStatus('success'), 900)
  }

  function handleClose() {
    closePopup()
    window.setTimeout(() => {
      setStatus('idle')
      setPropertyType(null)
      setLocation('')
      setName('')
      setPhone('')
      setError('')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="relative flex min-h-full items-center justify-center">
          <motion.div
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-gold-400/25 bg-obsidian-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] sm:grid-cols-5"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-radial-fade pointer-events-none" />

            {/* Left promo panel */}
            <div className="relative hidden flex-col justify-between bg-obsidian-900 p-7 sm:col-span-2 sm:flex">
              <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_30%_20%,#d4af37,transparent_55%)]" />
              <div className="relative flex items-center gap-2">
                <img src={logo} alt="VELQORASPACES" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-400/40" />
                <span className="font-display text-sm tracking-[0.25em] text-gold-300">VELQORASPACES</span>
              </div>

              <div className="relative mt-8">
                <p className="font-display text-3xl leading-tight text-ivory">
                  More room for <span className="text-gold-foil italic">joy</span>
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold-400/80">Limited studio slots · This month only</p>
              </div>

              <ul className="relative mt-8 space-y-3">
                {PERKS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-ivory/80">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/5">
                      <Icon className="h-4 w-4 text-gold-300" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 hairline" />
              <p className="relative mt-4 text-[11px] text-ivory/40">
                By booking, a design consultant calls you within 24 hours.
              </p>
            </div>

            {/* Right form panel */}
            <div className="relative col-span-1 max-h-[85vh] overflow-y-auto p-6 sm:col-span-3 sm:p-8">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/20 text-ivory/70 transition hover:border-gold-400/60 hover:text-gold-300"
              >
                <X className="h-4 w-4" />
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient"
                    >
                      <Check className="h-8 w-8 text-obsidian-900" strokeWidth={3} />
                    </motion.span>
                    <h3 className="font-display text-2xl text-ivory">Consultation booked</h3>
                    <p className="mt-2 max-w-xs text-sm text-ivory/60">
                      Thank you, {name.split(' ')[0]}. Our design consultant will call you on {phone} shortly.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 rounded-full border border-gold-400/40 px-6 py-2.5 text-sm text-gold-300 transition hover:bg-gold-400/10"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pt-8 sm:pt-0"
                  >
                    <h2 className="font-display text-2xl text-ivory sm:text-[28px]">
                      Get a <span className="text-gold-foil italic">free</span> design consultation
                    </h2>
                    <p className="mt-1 text-sm text-ivory/50">Tell us a little about your space.</p>

                    <div className="mt-6">
                      <label className="mb-2 block text-xs uppercase tracking-widest text-ivory/50">Property type</label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_TYPES.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setPropertyType(type)}
                            className={`rounded-lg border px-3.5 py-2 text-xs transition-all sm:text-sm ${
                              propertyType === type
                                ? 'border-gold-400 bg-gold-400/15 text-gold-200 shadow-gold'
                                : 'border-white/10 text-ivory/70 hover:border-gold-400/40'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-xs uppercase tracking-widest text-ivory/50">Property location</label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold-400/60"
                      >
                        <option value="" className="bg-obsidian-200">Select your city</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c} className="bg-obsidian-200">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60"
                      />
                    </div>

                    <div className="mt-4 flex overflow-hidden rounded-lg border border-white/10 bg-obsidian-300/60 focus-within:border-gold-400/60">
                      <span className="flex items-center gap-1 border-r border-white/10 px-3 text-sm text-ivory/60">
                        <PhoneCall className="h-3.5 w-3.5" /> +91
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Mobile number"
                        inputMode="numeric"
                        className="w-full bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none"
                      />
                    </div>

                    <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-ivory/60">
                      <input
                        type="checkbox"
                        checked={whatsappOptIn}
                        onChange={(e) => setWhatsappOptIn(e.target.checked)}
                        className="h-4 w-4 accent-gold-400"
                      />
                      Send me design updates via WhatsApp
                    </label>

                    {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gold-gradient py-3.5 text-sm font-semibold tracking-wide text-obsidian-900 transition disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <motion.span
                          className="h-4 w-4 rounded-full border-2 border-obsidian-900/40 border-t-obsidian-900"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        />
                      ) : (
                        'Book a Free Consultation'
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-ivory/40">
                      By submitting, you consent to our design studio contacting you.
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
