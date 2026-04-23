// Barrel — types + pure helpers. Safe to import from any component.
//
// For reads,                  import from "@/src/lib/supabase/web/queries".
// For client-side mutations,  import from "@/src/lib/supabase/web/actions".

export type { Product, Category, ProductImage } from "./types";
export { formatPrice, getImageUrl, getImageUrls } from "./types";
