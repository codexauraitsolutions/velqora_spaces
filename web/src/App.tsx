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
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'
import TestimonialsPage from './pages/TestimonialsPage'
import { initAnalytics, trackPageView } from './lib/analytics'

function RouteAnalytics() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    initAnalytics()
  }, [])
  useEffect(() => {
    // Wait for the page transition + <Seo> title update before reporting.
    const timer = window.setTimeout(() => trackPageView(pathname + search), 600)
    return () => window.clearTimeout(timer)
  }, [pathname, search])
  return null
}

function AutoPopupTrigger() {
  const { openPopup } = usePopup()
  useEffect(() => {
    // Never interrupt a client who is writing a review.
    const timer = window.setTimeout(() => {
      if (!window.location.pathname.startsWith('/feedback')) openPopup()
    }, 18000)
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
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
        <RouteAnalytics />
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
