const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

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
  parent?: Category | null;
  children?: Category[];
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  tag: string | null;
  tagVariant: "default" | "primary" | "secondary" | "destructive" | "outline";
  slug: string;
  images: StrapiImage[];
  category: Category | null;
}

// ── Internal fetcher ─────────────────────────────────────────────────────────

async function strapiRequest<T>(
  path: string,
  params?: Record<string, string>,
  tags?: string[]
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: { tags: tags ?? [] },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const data = await strapiRequest<{ data: Product[] }>(
    "/products",
    {
      "populate[0]": "images",
      "populate[1]": "category",
      sort: "createdAt:desc",
    },
    ["products"]
  );
  return data.data;
}

export async function getProductByDocumentId(
  documentId: string
): Promise<Product | null> {
  const data = await strapiRequest<{ data: Product }>(
    `/products/${documentId}`,
    {
      "populate[0]": "images",
      "populate[1]": "category",
    },
    ["products", `product-${documentId}`]
  );
  return data.data ?? null;
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const data = await strapiRequest<{ data: Category[] }>(
    "/categories",
    {
      sort: "name:asc",
      "populate[0]": "children",
      "populate[1]": "parent",
    },
    ["categories"]
  );
  return data.data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "—";
  return Number(price).toLocaleString("en-US") + "₮";
}

export function getStrapiImageUrl(
  image: StrapiImage | null | undefined
): string | null {
  if (!image) return null;
  return image.url.startsWith("http") ? image.url : `${STRAPI_URL}${image.url}`;
}

export function getStrapiImages(images: StrapiImage[]): string[] {
  if (!images || images.length === 0) return [];
  return images.map((img) =>
    img.url.startsWith("http") ? img.url : `${STRAPI_URL}${img.url}`
  );
}
