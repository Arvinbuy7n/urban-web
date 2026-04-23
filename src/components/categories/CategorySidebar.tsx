"use client";

import { SlidersHorizontal, Search, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Product, Category } from "@/src/lib/supabase";
import { formatPrice } from "@/src/lib/supabase";

type CategorySidebarProps = {
  products: Product[];
  categories: Category[];
  active: string;
  setActive: (name: string) => void;
  search: string;
  setSearch: (value: string) => void;
  maxPrice: number;
  effectivePriceMax: number;
  setPriceMax: (value: number) => void;
  expandedParents: Set<string>;
  handleParentClick: (parentName: string) => void;
};

export const CategorySidebar = ({
  products,
  categories,
  active,
  setActive,
  search,
  setSearch,
  maxPrice,
  effectivePriceMax,
  setPriceMax,
  expandedParents,
  handleParentClick,
}: CategorySidebarProps) => {
  const topLevelCategories = categories.filter((c) => !c.parent);

  return (
    <aside className="hidden md:flex flex-col w-72 shrink-0 gap-5">
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Ангилал
          </p>
        </div>
        <div className="p-2 space-y-0.5">
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
                "text-[10px] font-black rounded-full px-2 py-0.5 min-w-5 text-center",
                active === "Бүх бүтээгдэхүүн"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-400"
              )}
            >
              {products.length}
            </span>
          </button>

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
                              "text-[10px] font-black rounded-full px-2 py-0.5 min-w-5 text-center",
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
  );
};
