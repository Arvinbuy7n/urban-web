import { getProducts } from "@/src/lib/strapi";
import { Hero, Inventory, WhyElite, ClientsSlider, CallToAction } from "../components";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <Inventory products={products} />
      <WhyElite />
      <ClientsSlider />
      <CallToAction />
    </>
  );
}
