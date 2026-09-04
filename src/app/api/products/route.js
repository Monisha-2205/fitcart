import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import fallbackProducts from "../../../data/products";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ products: fallbackProducts, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, original_price, category, image, stock")
    .eq("is_active", true)
    .order("id");

 if (error) {
  return NextResponse.json(
    { error: "Unable to load products." },
    { status: 500 }
  );
}

  const products = data.map((product) => ({
    ...product,
    oldPrice: Number(product.original_price || product.price),
    price: Number(product.price),
  }));

  return NextResponse.json({ products, source: "supabase" });
}
