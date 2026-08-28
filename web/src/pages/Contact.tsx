import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import { BRAND, CITIES } from '../data/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    window.setTimeout(() => setStatus('success'), 900)
  }

  return (
    <div className="bg-obsidian-900 pt-32">
      <Seo
        title="Contact"
        description="Get in touch with VELQORASPACES — Interiors Designing Studio at Mirzaguda, Janwada, Rangareddy, Telangana. Call +91 99899 95865 or book a free design consultation."
        path="/contact"
      />
      <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400/70">Contact</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            Let's talk <span className="text-gold-foil italic">interiors.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ivory/55">
            Reach out for a consultation, a quote, or just to see if we're the right fit.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-10 px-6 pb-28 sm:px-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="card-glass h-full overflow-hidden rounded-2xl">
            <div className="p-8">
              <h2 className="font-display text-2xl text-ivory">Studio details</h2>
              <ul className="mt-6 space-y-5 text-sm text-ivory/60">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a href={`tel:+${BRAND.phoneRaw}`} className="transition hover:text-gold-300">
                    {BRAND.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-300">
                    {BRAND.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <a
                    href={BRAND.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition hover:text-gold-300"
                  >
                    {BRAND.address}
                  </a>
                </li>
              </ul>
              <div className="mt-8 hairline" />
              <p className="mt-6 text-xs uppercase tracking-widest text-gold-400/60">Studio Hours</p>
              <p className="mt-2 text-sm text-ivory/60">Mon – Sat, 10:00 AM – 7:00 PM</p>
            </div>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative block h-56 w-full border-t border-gold-400/10"
            >
              <iframe
                title="VELQORASPACES studio location"
                src={BRAND.mapsEmbedUrl}
                className="h-full w-full grayscale invert-[0.92] contrast-[0.9] transition group-hover:grayscale-0 group-hover:invert-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="pointer-events-none absolute inset-0 flex items-end justify-end p-3">
                <span className="flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-obsidian-900/90 px-3 py-1.5 text-[10px] uppercase tracking-widest text-gold-300">
                  Get Directions
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="card-glass rounded-2xl p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[320px] flex-col items-center justify-center text-center"
              >
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient">
                  <Check className="h-8 w-8 text-obsidian-900" strokeWidth={3} />
                </span>
                <h3 className="font-display text-2xl text-ivory">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-ivory/60">
                  Thank you, {form.name.split(' ')[0] || 'there'}. Our team will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60 sm:col-span-1"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60 sm:col-span-1"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="Phone"
                  inputMode="numeric"
                  className="rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60 sm:col-span-1"
                />
                <select
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="appearance-none rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory outline-none transition focus:border-gold-400/60 sm:col-span-1"
                >
                  <option value="" className="bg-obsidian-200">City</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-obsidian-200">
                      {c}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your space..."
                  rows={4}
                  className="rounded-lg border border-white/10 bg-obsidian-300/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400/60 sm:col-span-2"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center rounded-lg bg-gold-gradient py-3.5 text-sm font-semibold uppercase tracking-widest text-obsidian-900 transition disabled:opacity-70 sm:col-span-2"
                >
                  {status === 'submitting' ? (
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-obsidian-900/40 border-t-obsidian-900"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
