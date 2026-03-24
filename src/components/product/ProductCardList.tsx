"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/src/lib/ui/badge";
import { Product, getStrapiImageUrl, formatPrice } from "@/src/lib/strapi";

interface ProductCardListProps {
  product: Product;
  index: number;
}

const ProductCardList = ({ product, index }: ProductCardListProps) => {
  const imageUrl = getStrapiImageUrl(product.images?.[0]) ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.05 }}
    >
      <Link href={`/product/${product.documentId}`} className="block">
        <div className="group flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-500 p-4 cursor-pointer">
          {/* Thumbnail */}
          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            )}
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
              <span className="text-sm font-black text-primary">{formatPrice(product.price)}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCardList;
