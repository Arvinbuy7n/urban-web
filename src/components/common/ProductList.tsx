"use client";

import { cn } from "@/src/lib/utils";
import { Product } from "@/src/lib/strapi";
import ProductCard from "./ProductCard";
import ProductCardList from "./ProductCardList";

interface ProductListProps {
  products: Product[];
  view: "grid" | "list";
}

export const ProductList = ({ products, view }: ProductListProps) => {
  return (
    <div
      className={cn(
        "grid gap-4",
        view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
      )}
    >
      {products.map((product, idx) =>
        view === "list" ? (
          <ProductCardList key={product.documentId} product={product} index={idx} />
        ) : (
          <ProductCard key={product.documentId} product={product} index={idx} />
        )
      )}
    </div>
  );
};
