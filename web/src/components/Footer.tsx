import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { BRAND, NAV_LINKS, SOCIALS } from '../data/site'
import { BRAND_ICONS } from './icons/BrandIcons'
import logo from '../assets/logo.jpeg'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold-400/10 bg-obsidian-900 pt-20">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="VELQORASPACES" className="h-12 w-12 rounded-full object-cover ring-1 ring-gold-400/40" />
              <div>
                <p className="font-display text-xl tracking-[0.15em] text-ivory">VELQORA<span className="text-gold-300">SPACES</span></p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400/60">Interiors Designing Studio</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/50">
              We craft interiors that feel inevitable — considered spatial planning, honest materials
              and a level of finish that rewards a closer look.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = BRAND_ICONS[s.icon]
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/20 text-ivory/60 transition hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400/70">Studio</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/60">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400/70">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/60">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400/70" />
                <a href={`tel:+${BRAND.phoneRaw}`} className="transition hover:text-gold-300">
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400/70" />
                <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-300">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400/70" />
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
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400/70">Visit the Studio</p>
            <p className="mt-2 text-sm text-ivory/60">{BRAND.address}</p>
          </div>
          <a
            href={BRAND.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-full border border-gold-400/25 px-5 py-2.5 text-xs uppercase tracking-widest text-gold-300 transition hover:border-gold-400/60"
          >
            Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/35 sm:flex-row">
          <p>© {new Date().getFullYear()} VELQORASPACES. All rights reserved.</p>
          <p>Designed &amp; crafted with intent.</p>
        </div>
      </div>
    </footer>
  )
}
