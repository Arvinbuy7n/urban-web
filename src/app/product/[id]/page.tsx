import { notFound } from "next/navigation";
import { getProductByDocumentId, getStrapiImageUrl } from "@/src/lib/strapi";
import ProductDetail from "./ProductDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductByDocumentId(id);

  if (!product) notFound();

  return (
    <ProductDetail
      title={product.title}
      description={product.description}
      price={product.price}
      tag={product.tag ?? undefined}
      tagVariant={product.tagVariant}
      image={getStrapiImageUrl(product.image)}
      category={product.category?.name ?? "Бүтээгдэхүүн"}
    />
  );
}
