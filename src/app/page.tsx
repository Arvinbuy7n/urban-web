import { getProducts, type Product } from "@/src/lib/strapi";
import {
  Hero,
  Inventory,
  WhyElite,
  ClientsSlider,
  CallToAction,
} from "../components";

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    // Strapi may be cold-starting; page renders without products
  }

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
