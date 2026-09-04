import { NextResponse } from "next/server";
import { requireMerchant } from "../../../../lib/merchant";

const productFields = ["name", "description", "price", "original_price", "category", "image", "stock", "is_active"];
function pickProduct(body) {
  return Object.fromEntries(productFields.filter((key) => key in body).map((key) => [key, body[key]]));
}

export async function GET() {
  const { supabase, error } = await requireMerchant();
  if (error) return error;
  const { data, error: queryError } = await supabase.from("products").select("*").order("id");
  if (queryError) return NextResponse.json({ error: queryError.message }, { status: 400 });
  return NextResponse.json({ products: data });
}

export async function POST(request) {
  const { supabase, error } = await requireMerchant();
  if (error) return error;
  const body = await request.json();
  const product = pickProduct(body);
  if (!product.name || !product.category || !product.image || product.price === undefined || product.stock === undefined) {
    return NextResponse.json({ error: "Name, category, image, price, and stock are required." }, { status: 400 });
  }
  const { data, error: insertError } = await supabase.from("products").insert(product).select().single();
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 });
  return NextResponse.json({ product: data }, { status: 201 });
}
