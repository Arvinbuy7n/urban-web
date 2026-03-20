import { notFound } from "next/navigation";
import { getProductByDocumentId, getStrapiImages } from "@/src/lib/strapi";
import ProductDetail from "./ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
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
