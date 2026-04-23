import { notFound } from "next/navigation";
import {
  adminGetProduct,
  adminListCategories,
} from "@/src/lib/supabase/admin/client";
import { ProductForm } from "@/src/app/admin/_components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();
  const [product, categories] = await Promise.all([
    adminGetProduct(numericId),
    adminListCategories().catch(() => []),
  ]);
  if (!product) notFound();
  return <ProductForm product={product} categories={categories} />;
}
