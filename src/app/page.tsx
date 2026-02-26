import { getProducts, getStrapiImageUrl } from "@/src/lib/strapi";
import { Hero, Inventory, WhyElite, CTA } from "../components";

export default async function Home() {
  const strapiProducts = await getProducts();

  const products = strapiProducts.map((p) => ({
    id: p.documentId,
    title: p.title,
    description: p.description,
    image: getStrapiImageUrl(p.image),
    price: p.price,
    tag: p.tag ?? undefined,
    tagVariant: p.tagVariant,
  }));

  return (
    <>
      <Hero />
      <Inventory products={products} />
      <WhyElite />
      <CTA />
    </>
  );
}
