"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/src/lib/ui/badge";
import { cn } from "@/src/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
}

interface ProductCardProps {
  product: Product;
  index: number;
  /** "inventory" — badge + whileInView
   *  "catalog"   — price chip + animate (default)
   *  "list"      — horizontal row layout */
  variant?: "inventory" | "catalog" | "list";
}

const ProductCard = ({
  product,
  index,
  variant = "catalog",
}: ProductCardProps) => {
  const isInventory = variant === "inventory";
  const isList = variant === "list";

  const motionProps = isInventory
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
        transition: { delay: index * 0.1 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: (index % 6) * 0.05 },
      };

  /* ── List (horizontal) layout ── */
  if (isList) {
    return (
      <motion.div {...motionProps}>
        <Link href={`/product/${product.id}`} className="block">
          <div className="group flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-500 p-4 cursor-pointer">
            {/* Thumbnail */}
            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={product.tagVariant}
                    className="text-[9px] font-black uppercase tracking-wider backdrop-blur-sm shadow-md"
                  >
                    {product.tag}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 mb-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-black text-primary">
                  {product.price}
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors duration-300 flex items-center gap-1">
                  Дэлгэрэнгүй харах
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  /* ── Grid (card) layout ── */
  return (
    <motion.div {...motionProps} className="h-full">
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8 transition-all duration-500 cursor-pointer">
          {/* ── Image ── */}
          <div className="relative overflow-hidden bg-slate-50 aspect-[4/3] flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Tag badge — top left */}
            {product.tag && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant={product.tagVariant}
                  className="text-[10px] font-black uppercase tracking-wider backdrop-blur-sm shadow-md"
                >
                  {product.tag}
                </Badge>
              </div>
            )}

            {/* Price chip — bottom right */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/60">
              <span className="font-black text-primary text-sm">
                {product.price}
              </span>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-4">
            <h3
              className={cn(
                "font-bold leading-snug mb-1.5 line-clamp-2 text-slate-900 group-hover:text-primary transition-colors duration-300",
                isInventory ? "text-base" : "text-sm"
              )}
            >
              {product.title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* ── Footer row ── */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors duration-300">
                {isInventory ? "Цуврал судлах" : "Дэлгэрэнгүй харах"}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
