"use client";

import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfoPanel } from "./ProductInfoPanel";

type ProductDetailProps = {
  title: string;
  description: string;
  price: number;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
  images: string[];
  category: string;
};

export const ProductDetail = ({
  title,
  description,
  price,
  tag,
  tagVariant,
  images,
  category,
}: ProductDetailProps) => (
  <div className="min-h-screen bg-slate-50/50">
    <ProductBreadcrumb category={category} title={title} />

    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
        <ProductImageGallery
          images={images}
          title={title}
          tag={tag}
          tagVariant={tagVariant}
        />

        <ProductInfoPanel
          title={title}
          description={description}
          price={price}
          category={category}
        />
      </div>
    </div>
  </div>
);
