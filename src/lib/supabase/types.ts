// Shared types, row → DTO mappers, and pure helpers.
// Safe to import from any component (no Supabase client is instantiated here).

export interface ProductImage {
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
  documentId: string; // stable string id used in URLs — populated with slug
  title: string;
  description: string;
  price: number;
  tag: string | null;
  tagVariant: "default" | "primary" | "secondary" | "destructive" | "outline";
  slug: string;
  images: ProductImage[];
  category: Category | null;
}

// ─── Row shapes (as returned by Supabase) ────────────────────────────────

export interface ProductRow {
  id: number;
  title: string;
  description: string;
  price: number | string;
  tag: string | null;
  tag_variant: Product["tagVariant"];
  slug: string;
  category: { id: number; name: string; slug: string } | null;
  product_images: Array<{
    id: number;
    url: string;
    alt: string | null;
    width: number | null;
    height: number | null;
    position: number | null;
  }> | null;
}

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export const PRODUCT_SELECT =
  "id, title, description, price, tag, tag_variant, slug, " +
  "category:categories(id, name, slug), " +
  "product_images(id, url, alt, width, height, position)";

export function mapProduct(row: ProductRow): Product {
  const images: ProductImage[] = (row.product_images ?? [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((img) => ({
      id: img.id,
      url: img.url,
      alternativeText: img.alt ?? null,
      width: img.width ?? 0,
      height: img.height ?? 0,
    }));

  const category: Category | null = row.category
    ? {
        id: row.category.id,
        name: row.category.name,
        slug: row.category.slug,
        parent: null,
        children: [],
      }
    : null;

  return {
    id: row.id,
    documentId: row.slug,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    tag: row.tag ?? null,
    tagVariant: row.tag_variant ?? "default",
    slug: row.slug,
    images,
    category,
  };
}

// ─── Pure helpers ────────────────────────────────────────────────────────

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "—";
  return Number(price).toLocaleString("en-US") + "₮";
}

export function getImageUrl(
  image: ProductImage | null | undefined
): string | null {
  return image?.url ?? null;
}

export function getImageUrls(images: ProductImage[]): string[] {
  return (images ?? []).map((img) => img.url);
}

// Soft timeout so a slow Supabase response can't hang a server render.
export function withTimeout<T>(p: PromiseLike<T>, ms = 10000): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Supabase timeout after ${ms}ms`)), ms)
    ),
  ]);
}
