import { NextResponse } from "next/server";
import { requireMerchant } from "../../../../../lib/merchant";

const productFields = ["name", "description", "price", "original_price", "category", "image", "stock", "is_active"];

export async function PATCH(request, { params }) {
  const { supabase, error } = await requireMerchant();
  if (error) return error;
  const body = await request.json();
  const product = Object.fromEntries(productFields.filter((key) => key in body).map((key) => [key, body[key]]));
  const { id } = await params;
  const { data, error: updateError } = await supabase.from("products").update(product).eq("id", id).select().single();
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 400 });
  return NextResponse.json({ product: data });
}

export async function DELETE(_request, { params }) {
  const { supabase, error } = await requireMerchant();
  if (error) return error;
  const { id } = await params;
  const { error: deleteError } = await supabase.from("products").delete().eq("id", id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 400 });
  return new NextResponse(null, { status: 204 });
}
