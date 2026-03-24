"use client";

import { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Search,
  PackageSearch,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ProductList } from "@/src/components/common/ProductList";
import {
  ProductGridSkeleton,
  CategorySidebarSkeleton,
} from "@/src/components/common/ProductCardSkeleton";
import type { Product, Category } from "@/src/lib/strapi";
import { formatPrice } from "@/src/lib/strapi";

interface Props {
  products: Product[];
  categories: Category[];
}

export default function CategoriesClient({
  products: initialProducts,
  categories: initialCategories,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    if (initialProducts.length > 0) return;
    setLoading(true);
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ])
      .then(([p, c]) => {
        if (p?.length) setProducts(p);
        if (c?.length) setCategories(c);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialProducts]);

  const [active, setActive] = useState("Бүх бүтээгдэхүүн");
  const [grid, setGrid] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );

  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((p) => Number(p.price) || 0))
      : 0;
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const effectivePriceMax = priceMax ?? maxPrice;

  // Only top-level categories (no parent)
  const topLevelCategories = categories.filter((c) => !c.parent);

  function getChildrenNames(cat: Category): string[] {
    return (cat.children ?? []).map((c) => c.name);
  }

  function getCategoryCount(cat: Category): number {
    const childNames = getChildrenNames(cat);
    return products.filter(
      (p) =>
        p.category?.name === cat.name ||
        childNames.includes(p.category?.name ?? "")
    ).length;
  }

  const filtered = products.filter((p) => {
    let matchCategory: boolean;
    if (active === "Бүх бүтээгдэхүүн") {
      matchCategory = true;
    } else {
      const parentCat = topLevelCategories.find((c) => c.name === active);
      if (parentCat && (parentCat.children?.length ?? 0) > 0) {
        // Selecting a parent includes products from all its children too
        const childNames = getChildrenNames(parentCat);
        matchCategory =
          p.category?.name === active ||
          childNames.includes(p.category?.name ?? "");
      } else {
        matchCategory = p.category?.name === active;
      }
    }
    const matchSearch =
      search === "" || p.title.toLowerCase().includes(search.toLowerCase());
    const matchPrice =
      maxPrice === 0 ||
      priceMax === null ||
      Number(p.price) <= effectivePriceMax;
    return matchCategory && matchSearch && matchPrice;
  });

  function handleParentClick(parentName: string) {
    setExpandedParents((prev) => {
      const next = new Set(prev);
      if (active !== parentName) {
        // Newly selected → always expand
        next.add(parentName);
      } else {
        // Already active → toggle expansion
        if (next.has(parentName)) next.delete(parentName);
        else next.add(parentName);
      }
      return next;
    });
    setActive(parentName);
  }

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-8 flex gap-8">
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
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 flex gap-8">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 gap-5">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 h-11 focus-within:border-primary/50 transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ангилал
            </p>
          </div>
          <div className="p-2 space-y-0.5">
            {/* All products */}
            <button
              onClick={() => setActive("Бүх бүтээгдэхүүн")}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                active === "Бүх бүтээгдэхүүн"
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span>Бүх бүтээгдэхүүн</span>
              <span
                className={cn(
                  "text-[10px] font-black rounded-full px-2 py-0.5 min-w-[20px] text-center",
                  active === "Бүх бүтээгдэхүүн"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {products.length}
              </span>
            </button>

            {/* Parent categories */}
            {topLevelCategories.map((parent) => {
              const hasChildren = (parent.children?.length ?? 0) > 0;
              const isExpanded = expandedParents.has(parent.name);
              const isParentActive = active === parent.name;

              return (
                <div key={parent.name}>
                  <button
                    onClick={() => handleParentClick(parent.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      isParentActive
                        ? "bg-primary text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span>{parent.name}</span>
                    {hasChildren && (
                      <ChevronRight
                        className={cn(
                          "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      />
                    )}
                  </button>

                  {/* Children */}
                  {hasChildren && isExpanded && (
                    <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-2">
                      {parent.children!.map((child) => {
                        const isChildActive = active === child.name;
                        const childCount = products.filter(
                          (p) => p.category?.name === child.name
                        ).length;

                        return (
                          <button
                            key={child.name}
                            onClick={() => setActive(child.name)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                              isChildActive
                                ? "bg-primary/10 text-primary font-bold"
                                : "text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700"
                            )}
                          >
                            <span>{child.name}</span>
                            <span
                              className={cn(
                                "text-[10px] font-black rounded-full px-2 py-0.5 min-w-[20px] text-center",
                                isChildActive
                                  ? "bg-primary/20 text-primary"
                                  : "bg-slate-100 text-slate-400"
                              )}
                            >
                              {childCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Price range */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Үнийн хязгаар
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={Math.ceil(maxPrice / 100)}
            value={effectivePriceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-primary mb-4"
          />
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
              0₮
            </span>
            <span className="text-xs font-bold text-primary bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5">
              {formatPrice(effectivePriceMax)}
            </span>
          </div>
        </div>

        {/* Help card */}
        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <span className="text-primary font-black text-base">?</span>
          </div>
          <h4 className="font-bold text-sm mb-1.5">Тусламж хэрэгтэй?</h4>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Мэргэжилтнүүд их хэмжээний захиалгад 24/7 туслах боломжтой.
          </p>
          <a
            href="tel:+97699999999"
            className="block text-center bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
          >
            Холбоо барих
          </a>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
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

        {/* Products or empty */}
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
}
