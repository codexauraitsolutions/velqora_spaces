// Google Analytics 4 (gtag.js). The tag is injected at runtime so the
// measurement ID lives in env config, and SPA route changes are sent manually.

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: GtagFn
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

let initialised = false

export function initAnalytics() {
  if (initialised || !GA_ID || typeof window === 'undefined') return
  initialised = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js expects the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // page_view is sent from trackPageView so client-side navigations count too.
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path: string) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', name, params)
}
