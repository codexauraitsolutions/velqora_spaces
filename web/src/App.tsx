import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { PopupProvider, usePopup } from './context/PopupContext'
import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LeadPopup from './components/LeadPopup'
import SocialDock from './components/SocialDock'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

function AutoPopupTrigger() {
  const { openPopup } = usePopup()
  useEffect(() => {
    const timer = window.setTimeout(() => openPopup(), 18000)
    return () => window.clearTimeout(timer)
  }, [openPopup])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <PopupProvider>
      <div className="grain min-h-screen bg-obsidian-900 text-ivory">
        <Loader />
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <SocialDock />
        <LeadPopup />
        <AutoPopupTrigger />
      </div>
    </PopupProvider>
  )
}
