import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo-full.webp'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1600)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black px-8"
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.1 } }}
        >
          <div className="relative flex items-center justify-center">
            <motion.span
              className="absolute h-56 w-56 rounded-full bg-gold-400/15 blur-3xl sm:h-72 sm:w-72"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.6], scale: [0.6, 1.15, 1] }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              src={logo}
              alt="VELQORA SPACES — Architecture Interiors Studio"
              className="relative w-64 max-w-[78vw] sm:w-80 lg:w-96"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
