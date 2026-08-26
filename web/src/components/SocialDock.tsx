import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { SOCIALS } from '../data/site'
import { BRAND_ICONS } from './icons/BrandIcons'

function MobileWhatsappButton() {
  const whatsapp = SOCIALS.find((s) => s.icon === 'whatsapp')
  if (!whatsapp) return null
  const Icon = BRAND_ICONS.whatsapp
  return (
    <motion.a
      href={whatsapp.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-obsidian-200/90 text-gold-300 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.6)] backdrop-blur lg:hidden"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/15" />
      <Icon className="relative h-6 w-6" />
    </motion.a>
  )
}

function MagneticNode({ social }: { social: (typeof SOCIALS)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const Icon = BRAND_ICONS[social.icon]

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: relX * 0.35, y: relY * 0.35 })
  }

  return (
    <motion.a
      ref={ref}
      href={social.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={social.name}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setOffset({ x: 0, y: 0 })
      }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.4 }}
      className="group relative flex items-center justify-end"
    >
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="mr-3 overflow-hidden whitespace-nowrap rounded-full border border-gold-400/30 bg-obsidian-200/90 px-3 py-1.5 text-[11px] uppercase tracking-widest text-gold-200 backdrop-blur"
      >
        {social.name}
      </motion.span>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/25 bg-obsidian-200/70 text-ivory/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] backdrop-blur transition-colors duration-300 group-hover:border-gold-400 group-hover:text-gold-300">
        <span className="absolute inset-0 rounded-full bg-gold-400/0 transition-colors duration-300 group-hover:bg-gold-400/10" />
        <Icon className="relative h-[18px] w-[18px]" />
      </span>
    </motion.a>
  )
}

export default function SocialDock() {
  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 right-4 z-40 hidden items-center lg:flex xl:right-6">
        <div className="pointer-events-auto flex flex-col items-end gap-5">
          <span className="mb-1 -rotate-90 whitespace-nowrap text-[10px] uppercase tracking-[0.35em] text-gold-400/50">
            Follow the Studio
          </span>
          <div className="relative flex flex-col items-end gap-4 pr-[21px]">
            <span className="absolute right-[21px] top-0 h-full w-px bg-gradient-to-b from-transparent via-gold-400/30 to-transparent" />
            {SOCIALS.map((social) => (
              <MagneticNode key={social.name} social={social} />
            ))}
          </div>
        </div>
      </div>
      <MobileWhatsappButton />
    </>
  )
}
