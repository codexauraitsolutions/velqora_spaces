# VELQORASPACES

Marketing website for **VELQORASPACES — Interiors Designing Studio**. React + TypeScript + Vite, styled with Tailwind CSS, animated with Framer Motion, with a Three.js (React Three Fiber) hero scene.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production into dist/
npm run preview  # preview the production build locally
```

## Project structure

- `src/pages/` — route-level pages (Home, About, Services, Portfolio, Contact)
- `src/components/` — shared UI: Navbar, Footer, LeadPopup (consultation modal), SocialDock, Loader, Cursor
- `src/three/` — the React Three Fiber hero scene, lazy-loaded to keep the initial bundle light
- `src/data/site.ts` — all editable business content: contact details, address/map, services, portfolio items, stats, testimonials, social links, nav
- `src/assets/portfolio/` — optimized project photography used on the Portfolio page

## Editing content

Almost everything text/data-driven on the site lives in [`src/data/site.ts`](src/data/site.ts) — phone, email, address, Google Maps link, social handles, services, process steps, stats, testimonials, and the portfolio list. Update that file rather than hunting through components.

**Still placeholder and worth replacing before launch:** the testimonials (fictional names/quotes) and the social media handles (Instagram/Pinterest/Facebook/YouTube links) in `site.ts`.

## Admin panel

Not built yet — this is the public-facing site only. Forms (lead popup, contact page) currently simulate a submission locally; wiring them to a real backend/CRM is future work.

## Consultation leads (Firebase) & Google Analytics

1. Copy `.env.example` → `.env.local` and fill in the Firebase web-app config and the GA4 Measurement ID.
   Add the same `VITE_*` keys in Vercel → Settings → Environment Variables, then redeploy.
2. Firebase Console → Build → Firestore Database → Create database (production mode, region `asia-south1`).
3. Paste `firestore.rules` into Firestore → Rules and publish. Visitors can only create leads; read them in the
   Firebase Console under the `consultation_leads` collection.
4. GA4 events sent: `page_view` (every route), `consultation_open`, `form_start`, `consultation_step_complete`,
   `generate_lead` (mark this as a Key event in GA4), `consultation_error`, `consultation_abandon`,
   `consultation_whatsapp_click`.

## Client feedback → Testimonials

- Send clients `https://www.velqoraspaces.com/feedback` (add `?name=Ravi%20Kumar` to prefill their name).
- Reviews are saved to the Firestore `testimonials` collection and appear on the Home page immediately.
- To take a review down: Firebase Console → Firestore → `testimonials` → open it → set `hidden` to `true`.
- The Testimonials section stays hidden until the first review exists.
