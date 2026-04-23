import { adminListCategories } from "@/src/lib/supabase/admin/client";
import { CategoriesClient } from "@/src/app/admin/_components/CategoriesClient";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await adminListCategories().catch(() => []);
  return <CategoriesClient categories={categories} />;
}
