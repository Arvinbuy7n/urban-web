"use client";

import { cn } from "@/src/lib/utils";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
}

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
      {products.map((product, idx) => (
        <ProductCard
          key={`${product.id}-${idx}`}
          product={product}
          index={idx}
          variant={view === "list" ? "list" : "catalog"}
        />
      ))}
    </div>
  );
};
