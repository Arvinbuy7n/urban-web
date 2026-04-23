import { notFound } from "next/navigation";
import {
  getProductByDocumentId,
  getProducts,
} from "@/src/lib/supabase/web/queries";
import { getImageUrls } from "@/src/lib/supabase";
import { ProductDetail } from "@/src/components/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// Pre-render all product pages at build time. New/updated products are
// picked up via on-demand revalidation from the admin saveProduct action
// (revalidatePath("/product/<slug>")) and an hourly ISR fallback.
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ id: p.documentId }));
  } catch {
    return [];
  }
}

export const revalidate = 3600;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProductByDocumentId(id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const images = getImageUrls(product.images ?? []);

  return (
    <ProductDetail
      title={product.title}
      description={product.description}
      price={product.price}
      tag={product.tag ?? undefined}
      tagVariant={product.tagVariant}
      images={images}
      category={product.category?.name ?? "Бүтээгдэхүүн"}
    />
  );
}
