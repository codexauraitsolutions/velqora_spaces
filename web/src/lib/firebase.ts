// Firebase is loaded lazily so the SDK never weighs down the first paint —
// it is only fetched when a visitor actually submits a lead.

import type { Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const LEADS_COLLECTION = 'consultation_leads'

let dbPromise: Promise<Firestore> | null = null

function getDb() {
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    return Promise.reject(new Error('Firebase is not configured. Set the VITE_FIREBASE_* env vars.'))
  }
  if (!dbPromise) {
    dbPromise = Promise.all([import('firebase/app'), import('firebase/firestore')]).then(
      ([{ initializeApp, getApps }, { getFirestore }]) => {
        const app = getApps()[0] ?? initializeApp(firebaseConfig)
        return getFirestore(app)
      },
    )
    // Allow a retry on the next submit if the chunk failed to load.
    dbPromise.catch(() => (dbPromise = null))
  }
  return dbPromise
}

export type ConsultationLead = {
  propertyType: string
  scope: string[]
  budget: string
  timeline: string
  city: string
  name: string
  phone: string
  email: string
  callbackSlot: string
  whatsappOptIn: boolean
}

function attribution() {
  const params = new URLSearchParams(window.location.search)
  const pick = (k: string) => params.get(k) ?? ''
  return {
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
    utmTerm: pick('utm_term'),
    utmContent: pick('utm_content'),
    gclid: pick('gclid'),
    pagePath: window.location.pathname,
    referrer: document.referrer.slice(0, 500),
    userAgent: navigator.userAgent.slice(0, 500),
  }
}

/** Writes the lead to Firestore and returns a short human-friendly reference. */
export async function submitConsultationLead(lead: ConsultationLead) {
  const db = await getDb()
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
  const ref = await addDoc(collection(db, LEADS_COLLECTION), {
    ...lead,
    ...attribution(),
    source: 'website_consultation_popup',
    status: 'new',
    createdAt: serverTimestamp(),
  })
  return `VS-${ref.id.slice(0, 6).toUpperCase()}`
}
