import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../data/site'
import { usePopup } from '../context/PopupContext'
import logo from '../assets/logo.jpeg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openPopup } = usePopup()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-gold-400/15 bg-obsidian-900/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="VELQORASPACES logo" className="h-11 w-11 rounded-full object-cover ring-1 ring-gold-400/40" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-[0.15em] text-ivory">VELQORA<span className="text-gold-300">SPACES</span></span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-gold-400/60">Interiors Designing Studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-colors ${
                    isActive ? 'text-gold-300' : 'text-ivory/75 hover:text-gold-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+${BRAND.phoneRaw}`}
              className="hidden items-center gap-2 text-sm text-ivory/70 hover:text-gold-300 md:flex"
            >
              <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
            </a>
            <button
              onClick={openPopup}
              className="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-obsidian-900 transition hover:shadow-gold sm:inline-block"
            >
              Book Consultation
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-gold-400/25 p-2.5 text-ivory lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-obsidian-900/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4">
              <img src={logo} alt="VELQORASPACES" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-400/40" />
              <button onClick={() => setMobileOpen(false)} className="rounded-full border border-gold-400/25 p-2.5 text-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="mt-4 flex flex-1 flex-col items-center justify-center gap-5 px-5 py-6 sm:mt-10 sm:gap-7"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{ closed: { opacity: 0, y: 16 }, open: { opacity: 1, y: 0 } }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl text-ivory/85 hover:text-gold-300 sm:text-3xl"
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                variants={{ closed: { opacity: 0, y: 16 }, open: { opacity: 1, y: 0 } }}
                onClick={() => {
                  setMobileOpen(false)
                  openPopup()
                }}
                className="mt-2 rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian-900 sm:mt-4"
              >
                Book Consultation
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
