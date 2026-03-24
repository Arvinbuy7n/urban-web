"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/src/lib/ui/badge";
import { cn } from "@/src/lib/utils";

type ProductImageGalleryProps = {
  images: string[];
  title: string;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
};

export const ProductImageGallery = ({
  images,
  title,
  tag,
  tagVariant,
}: ProductImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
      >
        {images[activeImage] && (
          <img
            src={images[activeImage]}
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {tag && (
          <div className="absolute top-4 left-4">
            <Badge variant={tagVariant} className="shadow-md">
              {tag}
            </Badge>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={cn(
              "aspect-square rounded-xl overflow-hidden border-2 transition-all",
              activeImage === i
                ? "border-primary shadow-md shadow-primary/20"
                : "border-transparent hover:border-slate-300"
            )}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
