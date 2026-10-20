# GRITSCRIPT PERFORMANCE 2.0

A premium, responsive Next.js App Router website using TypeScript, React, Tailwind CSS 4, and Lucide icons. This repository is a reviewable demonstration: no checkout, payment processing, inquiry delivery, database writes, or deployment automation is enabled.

## Local development

Requires Node.js 20.9+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Validation:

```sh
npm run lint
npm run test
npm run build
npm run typecheck
```

Browser checks: run `npx playwright install chromium` followed by `npm run test:e2e` after building. To use an existing Chromium installation, set `CHROMIUM_PATH=/path/to/chromium`. The browser suite covers catalog filters, inquiry calculations and preview, no POST submission, image loading, and mobile layout.

Production locally: `npm run build && npm start`. No environment variables are needed. The site uses bundled SVG illustrations and system typography, without remote image/font dependencies or analytics.

## Features

- Complete branded homepage, responsive navigation, product catalog, standards, and footer.
- Search by description, name, specifications, or SKU; five category filters and an empty state.
- Four generic laboratory placeholder products, illustrated images, specifications, sample availability, and eligibility controls.
- Local inquiry builder with quantities (0–99), sample customer details, shipping/pickup preference, destination country/postal code for shipping, consent, and integer-cent summary calculations.
- Browser validation for required fields and email. Preview never sends or persists personal information. Reload clears the form. Use fictitious data.
- Unavailable supplies cannot be added; taxes and delivery costs are explicitly uncalculated. Prices are illustrative USD values, not binding quotes.
- Accessible field labels, focus indicators, status announcements, reduced-motion handling, and mobile navigation.
- `/admin` is an informational placeholder, with no management functions or data access.

## Code map

`src/app/` contains routes, global styles, and metadata. `src/components/storefront.tsx` owns the interactive demo. `src/lib/catalog.ts` contains tenant-scoped product types, fixtures, eligibility, and totals. `public/products/` contains original, self-contained SVG artwork. `docs/architecture.md` describes the backend roadmap and controls required before activation.

## Hosting and release boundary

This project needs a Next.js-compatible Node host with the current configuration; it is not configured for GitHub Pages static hosting. No host, existing live website, domain, DNS, deployment workflow, or production integration has been changed. Review and approve a separate staging/deployment plan before connecting hosting. Do not enable real orders or regulated products without legal and provider compliance verification.
