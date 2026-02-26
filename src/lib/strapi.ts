const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

// ── Types ────────────────────────────────────────────────────────────────────

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: string;
  tag: string | null;
  tagVariant: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline';
  slug: string;
  image: StrapiImage | null;
  category: Category | null;
}

// ── Internal fetcher ─────────────────────────────────────────────────────────

async function strapiRequest<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const data = await strapiRequest<{ data: Product[] }>('/products', {
    'populate[image]': 'true',
    'populate[category]': 'true',
    'filters[publishedAt][$notNull]': 'true',
    'sort': 'createdAt:desc',
  });
  return data.data;
}

export async function getProductByDocumentId(documentId: string): Promise<Product | null> {
  const data = await strapiRequest<{ data: Product }>(`/products/${documentId}`, {
    'populate[image]': 'true',
    'populate[category]': 'true',
  });
  return data.data ?? null;
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const data = await strapiRequest<{ data: Category[] }>('/categories', {
    'sort': 'name:asc',
  });
  return data.data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getStrapiImageUrl(image: StrapiImage | null): string {
  if (!image) return 'https://picsum.photos/seed/placeholder/800/800';
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}
