import { getProducts } from "@/src/lib/supabase/web/queries";
import type { Product } from "@/src/lib/supabase";
import {
  Hero,
  Inventory,
  WhyElite,
  ClientsSlider,
  CallToAction,
} from "@/src/components/home";

// ISR: regenerate hourly as a fallback; admin actions revalidate on save.
export const revalidate = 3600;

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
