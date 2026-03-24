import { ProductGridSkeleton } from "@/src/components/product/ProductCardSkeleton";

export default function HomeLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-[600px] bg-slate-200 animate-pulse" />

      {/* Inventory skeleton */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-12 space-y-3">
            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-7 w-64 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-80 bg-slate-200 rounded animate-pulse" />
          </div>

          <ProductGridSkeleton count={8} cols="lg:grid-cols-4" />
        </div>
      </section>
    </>
  );
}
