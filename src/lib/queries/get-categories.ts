import {
  getCategories as fetchCategories,
  type Category,
} from "@/src/lib/strapi";

export const getCategories = async (): Promise<Category[]> => {
  const categories = await fetchCategories();

  return categories;
};
