import {
  ProductGridSkeleton,
  CategorySidebarSkeleton,
} from "@/src/components/product/ProductCardSkeleton";

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="h-7 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-72 bg-slate-200 rounded animate-pulse mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <aside className="hidden md:flex flex-col w-72 shrink-0 gap-5">
          <div className="h-11 bg-slate-200 rounded-xl animate-pulse" />
          <CategorySidebarSkeleton />
        </aside>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-200">
            <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-slate-200 rounded-xl animate-pulse" />
          </div>
          <ProductGridSkeleton count={6} cols="xl:grid-cols-3" />
        </div>
      </div>
    </div>
  );
}
