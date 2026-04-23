import type { Product, Category } from "@/src/lib/supabase";

type FilterOptions = {
  active: string;
  search: string;
  maxPrice: number;
  priceMax: number | null;
  effectivePriceMax: number;
  topLevelCategories: Category[];
};

export const getActiveCategoryNames = (
  activeName: string,
  topLevelCategories: Category[]
): string[] => {
  if (activeName === "Бүх бүтээгдэхүүн") return [];
  const parent = topLevelCategories.find((c) => c.name === activeName);
  const childNames = (parent?.children ?? []).map((c) => c.name);
  return [activeName, ...childNames];
};

const matchesCategory = (
  productCategoryName: string | undefined,
  activeNames: string[]
) =>
  activeNames.length === 0 || activeNames.includes(productCategoryName ?? "");

const matchesSearch = (title: string, search: string) =>
  search === "" || title.toLowerCase().includes(search.toLowerCase());

const matchesPrice = (
  price: number,
  maxPrice: number,
  priceMax: number | null,
  effectivePriceMax: number
) => maxPrice === 0 || priceMax === null || price <= effectivePriceMax;

export const filterProducts = (
  products: Product[],
  options: FilterOptions
): Product[] => {
  const {
    active,
    search,
    maxPrice,
    priceMax,
    effectivePriceMax,
    topLevelCategories,
  } = options;

  const activeNames = getActiveCategoryNames(active, topLevelCategories);

  return products.filter(
    (p) =>
      matchesCategory(p.category?.name, activeNames) &&
      matchesSearch(p.title, search) &&
      matchesPrice(Number(p.price) || 0, maxPrice, priceMax, effectivePriceMax)
  );
};
