import { notFound } from "next/navigation";
import {
  getProducts,
  getProductByDocumentId,
  getStrapiImages,
} from "@/src/lib/strapi";
import { ProductDetail } from "@/src/components/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getProducts();

    return products.map((p) => ({ id: p.documentId }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProductByDocumentId(id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const images = getStrapiImages(product.images ?? []);

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
