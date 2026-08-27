import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.jpeg'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian-900"
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.1 } }}
        >
          <div className="relative flex items-center justify-center">
            <motion.span
              className="absolute h-28 w-28 rounded-full bg-gold-400/20 blur-2xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0.5], scale: [0.6, 1.15, 1] }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.img
              src={logo}
              alt="VELQORASPACES"
              className="relative h-20 w-20 rounded-full object-cover shadow-gold"
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-5 text-[10px] uppercase tracking-[0.5em] text-gold-400/60"
          >
            Velqoraspaces
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
