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
