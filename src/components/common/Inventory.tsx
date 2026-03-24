"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import { Product } from "@/src/lib/strapi";
import { useEffect, useState } from "react";

interface InventoryProps {
  products: Product[];
}

export const Inventory = ({ products: initialProducts }: InventoryProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    if (initialProducts.length > 0) return;
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (data?.length) setProducts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialProducts]);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">
              Бүтээгдэхүүн
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Онцлох бараа нөөц
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Орчин үеийн ажилчдад зориулан бүтээгдсэн чухал хамгаалалт.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/70 transition-colors shrink-0"
          >
            Бүгдийг харах <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} cols="lg:grid-cols-4" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                variant="inventory"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
