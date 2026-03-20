# Urban Uniform — Frontend

## Project Overview
Next.js frontend for urbanuniform.mn — safety equipment e-commerce site.
Backend: Strapi Cloud at `https://grounded-butterfly-9fc6c0e7fd.strapiapp.com`

## Stack
- **Frontend:** Next.js (App Router, TypeScript)
- **Backend:** Strapi Cloud
- **Hosting:** Vercel (frontend), Strapi Cloud (backend)
- **Styling:** Tailwind CSS

## Environment Variables (set in Vercel dashboard)
- `NEXT_PUBLIC_STRAPI_URL` — Strapi Cloud URL
- `STRAPI_API_TOKEN` — Strapi API token (full access)

## Key Files
- `src/lib/strapi.ts` — all Strapi API calls, types, image helpers
- `src/app/page.tsx` — home page (Hero, Inventory, WhyElite, ClientsSlider, CTA)
- `src/app/categories/page.tsx` — product listing with category filter
- `src/app/product/[id]/page.tsx` — product detail page
- `src/components/` — shared UI components

## Important Patterns

### Strapi fetch — always wrap in try/catch
All server components that fetch from Strapi must handle errors gracefully.
Strapi fetch has a 10s timeout (`AbortSignal.timeout(10000)`).

```ts
let products: Product[] = [];
try {
  products = await getProducts();
} catch {
  // render empty state, do not crash
}
```

### Image domains
Production Strapi image hostname is configured in `next.config.ts`.
If Strapi URL changes, update `remotePatterns` in `next.config.ts`.

## Known Issues / History
- **Cold start crash (fixed):** Vercel serverless cold start caused Strapi fetch to timeout,
  crashing the entire page. Fixed by adding try/catch on all Strapi fetches + 10s timeout.
