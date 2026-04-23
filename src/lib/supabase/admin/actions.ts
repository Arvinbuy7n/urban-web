"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/src/lib/supabase/admin/client";
import { slugify } from "@/src/app/admin/_lib/Format";

// ─── Product actions ───────────────────────────────────────────────────────

export interface ProductFormData {
  id?: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  tag: string | null;
  tagVariant: "default" | "primary" | "secondary" | "destructive" | "outline";
  categoryId: number | null;
  published: boolean;
}

export async function saveProduct(
  form: ProductFormData,
  uploads: Array<{ name: string; type: string; data: string }> // data is base64
) {
  const s = createAdminClient();

  const cleanSlug = slugify(form.slug) || slugify(form.title);
  const payload = {
    title: form.title.trim(),
    slug: cleanSlug,
    description: form.description,
    price: form.price,
    tag: form.tag ? form.tag.trim() || null : null,
    tag_variant: form.tagVariant,
    category_id: form.categoryId,
    published_at: form.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  let productId = form.id;
  if (productId) {
    const { error } = await s
      .from("products")
      .update(payload)
      .eq("id", productId);
    if (error) throw new Error(`saveProduct update: ${error.message}`);
  } else {
    const { data, error } = await s
      .from("products")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(`saveProduct insert: ${error.message}`);
    productId = data.id;
  }

  if (uploads.length > 0 && productId != null) {
    const { data: existing } = await s
      .from("product_images")
      .select("position")
      .eq("product_id", productId)
      .order("position", { ascending: false })
      .limit(1);
    let position = (existing?.[0]?.position ?? -1) + 1;

    for (const upload of uploads) {
      const cleaned = upload.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `${cleanSlug}/${position}-${cleaned}`;
      const buffer = Buffer.from(upload.data, "base64");
      const storage = await s.storage
        .from("product-images")
        .upload(key, buffer, {
          contentType: upload.type,
          upsert: true,
        });
      if (storage.error)
        throw new Error(`saveProduct upload: ${storage.error.message}`);
      const {
        data: { publicUrl },
      } = s.storage.from("product-images").getPublicUrl(key);
      const { error: imgErr } = await s.from("product_images").insert({
        product_id: productId,
        url: publicUrl,
        path: key,
        alt: form.title,
        position,
      });
      if (imgErr) throw new Error(`saveProduct image row: ${imgErr.message}`);
      position += 1;
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/categories");
  revalidatePath(`/product/${cleanSlug}`);
  return { id: productId! };
}

export async function deleteProduct(id: number) {
  const s = createAdminClient();
  const { data: imgs } = await s
    .from("product_images")
    .select("path")
    .eq("product_id", id);
  const paths = (imgs ?? []).map((i) => i.path).filter((p): p is string => !!p);
  if (paths.length > 0) {
    await s.storage.from("product-images").remove(paths);
  }
  const { error } = await s.from("products").delete().eq("id", id);
  if (error) throw new Error(`deleteProduct: ${error.message}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/categories");
}

export async function deleteProducts(ids: number[]) {
  for (const id of ids) await deleteProduct(id);
}

export async function setProductsPublished(ids: number[], published: boolean) {
  const s = createAdminClient();
  const payload = {
    published_at: published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await s.from("products").update(payload).in("id", ids);
  if (error) throw new Error(`setProductsPublished: ${error.message}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/categories");
}

export async function duplicateProduct(id: number) {
  const s = createAdminClient();
  const { data: orig, error } = await s
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !orig) throw new Error(`duplicateProduct: ${error?.message}`);
  const {
    id: _ignore,
    created_at,
    updated_at,
    ...rest
  } = orig as Record<string, unknown> & {
    id: number;
    created_at: string;
    updated_at: string;
  };
  void _ignore;
  void created_at;
  void updated_at;
  const copy = {
    ...rest,
    title: `${orig.title} (copy)`,
    slug: `${orig.slug}-copy-${Date.now().toString(36)}`,
    published_at: null,
  };
  const { error: insErr } = await s.from("products").insert(copy);
  if (insErr) throw new Error(`duplicateProduct insert: ${insErr.message}`);
  revalidatePath("/admin/products");
}

export async function removeProductImage(imageId: number) {
  const s = createAdminClient();
  const { data: row } = await s
    .from("product_images")
    .select("path, product_id")
    .eq("id", imageId)
    .maybeSingle();
  if (row?.path) {
    await s.storage.from("product-images").remove([row.path]);
  }
  const { error } = await s.from("product_images").delete().eq("id", imageId);
  if (error) throw new Error(`removeProductImage: ${error.message}`);
  revalidatePath("/admin/products");
}

// ─── Category actions ──────────────────────────────────────────────────────

export interface CategoryFormData {
  id?: number;
  name: string;
  slug: string;
  parentId: number | null;
}

export async function saveCategory(form: CategoryFormData) {
  const s = createAdminClient();
  const payload = {
    name: form.name.trim(),
    slug: slugify(form.slug) || slugify(form.name),
    parent_id: form.parentId,
  };
  if (form.id) {
    const { error } = await s
      .from("categories")
      .update(payload)
      .eq("id", form.id);
    if (error) throw new Error(`saveCategory update: ${error.message}`);
  } else {
    const { error } = await s.from("categories").insert(payload);
    if (error) throw new Error(`saveCategory insert: ${error.message}`);
  }
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}

export async function deleteCategory(id: number) {
  const s = createAdminClient();
  // Collect descendants to delete cascade-style. Postgres will also null
  // out category_id on products due to ON DELETE SET NULL.
  const { data: all, error: listErr } = await s
    .from("categories")
    .select("id, parent_id");
  if (listErr) throw new Error(`deleteCategory: ${listErr.message}`);
  const descendants = new Set<number>([id]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const row of all ?? []) {
      if (
        row.parent_id != null &&
        descendants.has(row.parent_id) &&
        !descendants.has(row.id)
      ) {
        descendants.add(row.id);
        changed = true;
      }
    }
  }
  const { error } = await s
    .from("categories")
    .delete()
    .in("id", Array.from(descendants));
  if (error) throw new Error(`deleteCategory: ${error.message}`);
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
}

// ─── Submissions ────────────────────────────────────────────────────────────

export async function setSubmissionRead(id: number, read: boolean) {
  const s = createAdminClient();
  const { error } = await s
    .from("contact_submissions")
    .update({ read_at: read ? new Date().toISOString() : null })
    .eq("id", id);
  if (error && !/column .*read_at/.test(error.message)) {
    throw new Error(`setSubmissionRead: ${error.message}`);
  }
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export async function deleteSubmission(id: number) {
  const s = createAdminClient();
  const { error } = await s.from("contact_submissions").delete().eq("id", id);
  if (error) throw new Error(`deleteSubmission: ${error.message}`);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
