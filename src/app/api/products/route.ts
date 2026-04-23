import { getProducts } from "@/src/lib/supabase/web/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}
