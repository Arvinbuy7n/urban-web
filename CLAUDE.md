# Urban Uniform — Frontend

## Project Overview

Next.js frontend for urbanuniform.mn — safety equipment e-commerce site.
Backed by **Supabase** (Postgres + Storage + RLS).

## Stack

- **Frontend:** Next.js 15 (App Router, TypeScript, React 19)
- **Backend:** Supabase (Postgres + Storage + RLS)
- **Hosting:** Vercel (frontend), Supabase Cloud (backend)
- **Styling:** Tailwind CSS v4
- **UI primitives:** Radix UI, framer-motion, lucide-react

## Environment Variables (set in Vercel dashboard)

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon public key (safe for browser)
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, for admin writes
- `REVALIDATE_SECRET` — protects `/api/revalidate`

See `.env.example`.

## Key Files

- `src/lib/supabase.ts` — Supabase client + typed queries (`getProducts`,
  `getProductByDocumentId`, `getCategories`, `createContactSubmission`,
  plus `formatPrice`, `getImageUrl`, `getImageUrls` helpers)
- `src/lib/queries/` — re-exports of the supabase helpers, used by pages
- `src/lib/constants/` — static content (about, contact, product, general)
- `src/lib/ui/` — shared UI primitives (button, card, tabs, sheet, accordion, badge, table)
- `src/app/page.tsx` — home (Hero, Inventory, WhyElite, ClientsSlider, CallToAction)
- `src/app/categories/page.tsx` — product listing with category filter
- `src/app/product/[id]/page.tsx` — product detail (`[id]` accepts slug or numeric id)
- `src/app/about/`, `src/app/contact/` — static pages
- `src/app/api/` — route handlers (`products`, `categories`, `revalidate`)
- `src/components/` — feature folders: `home/`, `layout/`, `about/`, `categories/`, `contact/`, `product/`
- `supabase/migrations/0001_init.sql` — schema (run in Supabase SQL editor)

## Important Patterns

### Fetch — always wrap in try/catch

All server components that fetch data handle errors gracefully. Supabase
queries carry a 10s timeout (`withTimeout` in `src/lib/supabase.ts`).

```ts
let products: Product[] = [];
try {
  products = await getProducts();
} catch {
  // render empty state, do not crash
}
```

### Image domains

Configured in `next.config.ts` → `remotePatterns`:

- `*.supabase.co` (Supabase Storage)
- `lh3.googleusercontent.com`, `picsum.photos`, `localhost:1337`

### Product URL resolution

`src/app/product/[id]/page.tsx` calls `getProductByDocumentId(id)` which
treats the param as a slug first, falling back to numeric id if the string
is purely digits. New URLs should use slug (`/product/helmet-black`).

### Draft / publish

A product is visible to the public when `published_at is not null`
(enforced by RLS policy `"public read published products"`). Draft
products have `published_at = null` and are hidden.

## Supabase schema (summary)

| Table                 | Purpose                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| `categories`          | Category tree (self-referencing via `parent_id`)                         |
| `products`            | Product catalog; `published_at` gates visibility                         |
| `product_images`      | One row per image, ordered by `position`, URL points at Supabase Storage |
| `contact_submissions` | Public-insert-only via RLS; admin reads                                  |

Storage bucket: `product-images` (public).

## Known Issues / History

- **Cold start crash (fixed):** pre-migration Strapi cold starts timed out
  server components. Fixed with try/catch + 10s query timeout; pattern
  carried over to the Supabase backend.
- **Strapi → Supabase migration (done):** previous Strapi Cloud backend
  has been replaced. All reads, writes (contact submissions), and media
  now live in Supabase.
