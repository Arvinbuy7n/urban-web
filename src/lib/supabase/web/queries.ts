// Server-side read helpers. Import from Server Components and Route Handlers.
// Uses the cookies-free public client so storefront pages can be statically
// rendered and cached on the CDN. Writes/auth go through ./server.

import { createPublicClient } from "./public-client";
import {
  PRODUCT_SELECT,
  mapProduct,
  withTimeout,
  type Category,
  type CategoryRow,
  type Product,
  type ProductRow,
} from "../types";

export async function getProducts(): Promise<Product[]> {
  const supabase = createPublicClient();
  const { data, error } = await withTimeout(
    supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .not("published_at", "is", null)
      .order("created_at", { ascending: false })
  );
  if (error) throw new Error(`Supabase getProducts: ${error.message}`);
  return ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
}

// Looks up a product by slug; falls back to numeric id for back-compat
// with older /product/<id> URLs.
export async function getProductByDocumentId(
  idOrSlug: string
): Promise<Product | null> {
  const supabase = createPublicClient();
  const column = /^\d+$/.test(idOrSlug) ? "id" : "slug";
  const value: string | number = column === "id" ? Number(idOrSlug) : idOrSlug;

  const { data, error } = await withTimeout(
    supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq(column, value)
      .not("published_at", "is", null)
      .maybeSingle()
  );
  if (error)
    throw new Error(`Supabase getProductByDocumentId: ${error.message}`);
  return data ? mapProduct(data as unknown as ProductRow) : null;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createPublicClient();
  const { data, error } = await withTimeout(
    supabase
      .from("categories")
      .select("id, name, slug, parent_id")
      .order("name", { ascending: true })
  );
  if (error) throw new Error(`Supabase getCategories: ${error.message}`);

  const rows = (data ?? []) as CategoryRow[];
  const byId = new Map<number, Category>();
  rows.forEach((r) =>
    byId.set(r.id, {
      id: r.id,
      name: r.name,
      slug: r.slug,
      parent: null,
      children: [],
    })
  );
  rows.forEach((r) => {
    if (r.parent_id == null) return;
    const self = byId.get(r.id);
    const parent = byId.get(r.parent_id);
    if (!self || !parent) return;
    self.parent = { id: parent.id, name: parent.name, slug: parent.slug };
    parent.children!.push(self);
  });
  return Array.from(byId.values());
}
