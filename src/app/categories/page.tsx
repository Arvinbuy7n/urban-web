import { CategoriesClient } from "@/src/components/categories";
import { getCategories, getProducts } from "@/src/lib/queries";
import type { Product, Category } from "@/src/lib/strapi";

export default async function CategoriesPage() {
  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    // Strapi may be unavailable; render empty state
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Бүх бүтээгдэхүүн
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Аюулгүй байдлын тоног төхөөрөмжийн бүрэн цуглуулга
          </p>
        </div>
      </div>

      <CategoriesClient products={products} categories={categories} />
    </div>
  );
}
