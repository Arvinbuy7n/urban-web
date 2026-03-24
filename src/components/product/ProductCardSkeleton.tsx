export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, cols = "lg:grid-cols-4" }: { count?: number; cols?: string }) {
  return (
    <div className={`grid md:grid-cols-2 ${cols} gap-5`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategorySidebarSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="h-3 bg-slate-200 rounded w-16" />
        </div>
        <div className="p-2 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
