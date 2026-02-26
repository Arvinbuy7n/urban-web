"use client";

import { useState } from "react";
import { SlidersHorizontal, Grid3X3, LayoutList, Search, PackageSearch } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ProductList } from "@/src/components/common/ProductList";
import type { Product, Category } from "@/src/lib/strapi";

interface ProductForCard {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
}

interface Props {
  products: Product[];
  categories: Category[];
}

function toCardProduct(p: Product, strapiUrl: string): ProductForCard {
  const imageUrl = p.image
    ? p.image.url.startsWith("http")
      ? p.image.url
      : `${strapiUrl}${p.image.url}`
    : "https://picsum.photos/seed/placeholder/800/800";

  return {
    id: p.documentId,
    title: p.title,
    description: p.description,
    image: imageUrl,
    price: p.price,
    tag: p.tag ?? undefined,
    tagVariant: p.tagVariant,
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export default function CategoriesClient({ products, categories }: Props) {
  const [active, setActive] = useState("Бүх бүтээгдэхүүн");
  const [grid, setGrid] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCategory =
      active === "Бүх бүтээгдэхүүн" || p.category?.name === active;
    const matchSearch =
      search === "" || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const cardProducts = filtered.map((p) => toCardProduct(p, STRAPI_URL));

  const sidebarCategories = [
    { label: "Бүх бүтээгдэхүүн", count: products.length },
    ...categories.map((cat) => ({
      label: cat.name,
      count: products.filter((p) => p.category?.name === cat.name).length,
    })),
  ];

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
            {sidebarCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  active === cat.label
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-black rounded-full px-2 py-0.5 min-w-[20px] text-center",
                    active === cat.label
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            ))}
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
          <input type="range" className="w-full accent-primary mb-4" />
          <div className="flex justify-between">
            <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
              ₮0
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
              ₮1,500,000+
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
              {cardProducts.length} бүтээгдэхүүн
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
        {cardProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <PackageSearch className="w-7 h-7 text-slate-300" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-500 mb-1">Бүтээгдэхүүн олдсонгүй</p>
              <p className="text-xs text-slate-400">Өөр ангилал эсвэл хайлт туршина уу</p>
            </div>
            <button
              onClick={() => { setActive("Бүх бүтээгдэхүүн"); setSearch(""); }}
              className="text-xs font-bold text-primary hover:underline"
            >
              Шүүлтүүр арилгах
            </button>
          </div>
        ) : (
          <ProductList products={cardProducts} view={grid} />
        )}
      </div>
    </div>
  );
}
