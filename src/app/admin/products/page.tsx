import {
  adminListCategories,
  adminListProducts,
} from "@/src/lib/supabase/admin/client";
import { ProductsTable } from "@/src/app/admin/_components/ProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    adminListProducts().catch(() => []),
    adminListCategories().catch(() => []),
  ]);
  return <ProductsTable products={products} categories={categories} />;
}
