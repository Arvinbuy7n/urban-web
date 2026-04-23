"use client";

import { useState } from "react";
import { Grid3X3, LayoutList, PackageSearch } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ProductList } from "@/src/components/product/ProductList";
import type { Product, Category } from "@/src/lib/supabase";
import { CategorySidebar } from "./CategorySidebar";
import { filterProducts } from "@/src/utils";

type CategoriesClientProps = {
  products: Product[];
  categories: Category[];
};

export const CategoriesClient = ({
  products,
  categories,
}: CategoriesClientProps) => {
  const [active, setActive] = useState("Бүх бүтээгдэхүүн");
  const [grid, setGrid] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((p) => Number(p.price) || 0))
      : 0;

  const effectivePriceMax = priceMax ?? maxPrice;
  const topLevelCategories = categories.filter((c) => !c.parent);

  const filtered = filterProducts(products, {
    active,
    search,
    maxPrice,
    priceMax,
    effectivePriceMax,
    topLevelCategories,
  });

  const handleParentClick = (parentName: string) => {
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (active !== parentName) {
        next.add(parentName);
      } else {
        next.has(parentName) ? next.delete(parentName) : next.add(parentName);
      }
      return next;
    });
    setActive(parentName);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
      <CategorySidebar
        products={products}
        categories={categories}
        active={active}
        setActive={setActive}
        search={search}
        setSearch={setSearch}
        maxPrice={maxPrice}
        effectivePriceMax={effectivePriceMax}
        setPriceMax={setPriceMax}
        expandedParents={expandedParents}
        handleParentClick={handleParentClick}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-black text-slate-900">{active}</span>
            <span className="text-[11px] font-bold text-slate-400 bg-white border border-slate-200 rounded-full px-2.5 py-0.5">
              {filtered.length} бүтээгдэхүүн
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setGrid("grid")}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                grid === "grid"
                  ? "bg-slate-900 text-white"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGrid("list")}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                grid === "list"
                  ? "bg-slate-900 text-white"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <PackageSearch className="w-7 h-7 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-500 mb-1">
                Бүтээгдэхүүн олдсонгүй
              </p>
              <p className="text-xs text-slate-400">
                Өөр ангилал эсвэл хайлт туршина уу
              </p>
            </div>
            <button
              onClick={() => {
                setActive("Бүх бүтээгдэхүүн");
                setSearch("");
                setPriceMax(maxPrice);
              }}
              className="text-xs font-bold text-primary hover:underline"
            >
              Шүүлтүүр арилгах
            </button>
          </div>
        ) : (
          <ProductList products={filtered} view={grid} />
        )}
      </div>
    </div>
  );
};
