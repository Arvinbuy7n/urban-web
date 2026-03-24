import { getProducts as fetchProducts, type Product } from "@/src/lib/strapi";

export const getProducts = async (): Promise<Product[]> => {
  const products = await fetchProducts();

  return products;
};
