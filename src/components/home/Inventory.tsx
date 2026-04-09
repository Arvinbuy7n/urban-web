import Link from "next/link";
import { ArrowRight, PackageX } from "lucide-react";
import ProductCard from "@/src/components/product/ProductCard";
import { Product } from "@/src/lib/strapi";

interface InventoryProps {
  products: Product[];
}

export const Inventory = ({ products }: InventoryProps) => {
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
        {products.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <PackageX className="w-10 h-10 text-slate-300" />
            <p className="text-sm text-slate-400">
              Одоогоор бүтээгдэхүүн байхгүй байна.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
