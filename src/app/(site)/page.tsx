import { getProducts } from "@/src/lib/supabase/web/queries";
import type { Product } from "@/src/lib/supabase";
import {
  Hero,
  Inventory,
  WhyElite,
  ClientsSlider,
  CallToAction,
} from "@/src/components/home";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch {
    // Supabase unreachable — render without products rather than crash
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
