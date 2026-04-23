// Server-only admin client and admin-scope queries.
// Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS — NEVER import this from a
// Client Component, and never expose the service role key to the browser.

import "server-only";
import { createClient as createAdminSupabaseClient } from "@supabase/supabase-js";
import type { Category, Product, ProductImage } from "../types";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) {
    throw new Error(
      "Admin Supabase client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createAdminSupabaseClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ─── Admin-specific shapes ────────────────────────────────────────────────
// Extends Product with publish-state and timestamp fields that are only
// relevant in the admin surface.

export interface AdminProduct extends Product {
  categoryId: number | null;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface AdminCategory extends Category {
  parentId: number | null;
  productCount: number;
}

export interface Submission {
  id: number;
  phone_number: string;
  mail: string;
  note: string;
  createdAt: string;
  read: boolean;
}

interface AdminProductRow {
  id: number;
  title: string;
  description: string;
  price: number | string;
  tag: string | null;
  tag_variant: Product["tagVariant"];
  slug: string;
  category_id: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
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

const ADMIN_PRODUCT_SELECT =
  "id, title, description, price, tag, tag_variant, slug, category_id, " +
  "published_at, created_at, updated_at, " +
  "category:categories(id, name, slug), " +
  "product_images(id, url, alt, width, height, position)";

function mapAdminProduct(row: AdminProductRow): AdminProduct {
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
    category: row.category
      ? {
          id: row.category.id,
          name: row.category.name,
          slug: row.category.slug,
          parent: null,
          children: [],
        }
      : null,
    categoryId: row.category_id,
    published: row.published_at !== null,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  };
}

export async function adminListProducts(): Promise<AdminProduct[]> {
  const s = createAdminClient();
  const { data, error } = await s
    .from("products")
    .select(ADMIN_PRODUCT_SELECT)
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`adminListProducts: ${error.message}`);
  return ((data ?? []) as unknown as AdminProductRow[]).map(mapAdminProduct);
}

export async function adminGetProduct(id: number): Promise<AdminProduct | null> {
  const s = createAdminClient();
  const { data, error } = await s
    .from("products")
    .select(ADMIN_PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`adminGetProduct: ${error.message}`);
  return data ? mapAdminProduct(data as unknown as AdminProductRow) : null;
}

export async function adminListCategories(): Promise<AdminCategory[]> {
  const s = createAdminClient();
  const [catsRes, prodsRes] = await Promise.all([
    s
      .from("categories")
      .select("id, name, slug, parent_id")
      .order("name", { ascending: true }),
    s.from("products").select("category_id"),
  ]);
  if (catsRes.error) throw new Error(`adminListCategories: ${catsRes.error.message}`);
  if (prodsRes.error) throw new Error(`adminListCategories: ${prodsRes.error.message}`);

  const counts = new Map<number, number>();
  for (const row of prodsRes.data ?? []) {
    const cid = (row as { category_id: number | null }).category_id;
    if (cid != null) counts.set(cid, (counts.get(cid) ?? 0) + 1);
  }
  return (catsRes.data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    parent: null,
    children: [],
    parentId: r.parent_id,
    productCount: counts.get(r.id) ?? 0,
  }));
}

// Submissions: the `contact_submissions` table has no "read" column, so we
// persist read state locally via a `read_at` column if present, otherwise we
// treat everything as unread. Reads still work without the column.
export async function adminListSubmissions(): Promise<Submission[]> {
  const s = createAdminClient();
  const { data, error } = await s
    .from("contact_submissions")
    .select("id, phone_number, mail, note, created_at, read_at")
    .order("created_at", { ascending: false });
  if (error && !/column .*read_at/.test(error.message)) {
    throw new Error(`adminListSubmissions: ${error.message}`);
  }
  if (error) {
    const fallback = await s
      .from("contact_submissions")
      .select("id, phone_number, mail, note, created_at")
      .order("created_at", { ascending: false });
    if (fallback.error) throw new Error(`adminListSubmissions: ${fallback.error.message}`);
    return (fallback.data ?? []).map((r) => ({
      id: r.id,
      phone_number: r.phone_number,
      mail: r.mail,
      note: r.note,
      createdAt: r.created_at,
      read: false,
    }));
  }
  return (data ?? []).map((r) => ({
    id: r.id,
    phone_number: r.phone_number,
    mail: r.mail,
    note: r.note,
    createdAt: r.created_at,
    read: r.read_at !== null,
  }));
}
