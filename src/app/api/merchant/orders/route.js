import { NextResponse } from "next/server";
import { requireMerchant } from "../../../../lib/merchant";

export async function GET() {
  const { supabase, error } = await requireMerchant();
  if (error) return error;
  const { data, error: queryError } = await supabase
    .from("orders")
    .select("id, order_number, customer_name, email, total, payment_method, status, created_at, order_items(product_name, price, quantity)")
    .order("created_at", { ascending: false });
  if (queryError) return NextResponse.json({ error: queryError.message }, { status: 400 });
  return NextResponse.json({ orders: data });
}
