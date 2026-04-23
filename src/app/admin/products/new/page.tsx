import { adminListCategories } from "@/src/lib/supabase/admin/client";
import { ProductForm } from "@/src/app/admin/_components/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await adminListCategories().catch(() => []);
  return <ProductForm product={null} categories={categories} />;
}
