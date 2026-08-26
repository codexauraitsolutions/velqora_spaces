import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
          <motion.svg
            width="90"
            height="90"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
              strokeDasharray="264"
              initial={{ strokeDashoffset: 264, opacity: 0.4 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.text
              x="50"
              y="60"
              textAnchor="middle"
              fontSize="34"
              fill="#d4af37"
              fontFamily="'Cormorant Garamond', serif"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              VS
            </motion.text>
          </motion.svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 text-[10px] uppercase tracking-[0.5em] text-gold-400/60"
          >
            Velqoraspaces
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
