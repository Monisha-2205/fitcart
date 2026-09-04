import { NextResponse } from "next/server";

import { createClient } from "../../../lib/supabase/server";

const requiredFields = [
  "name",
  "phone",
  "email",
  "address",
  "city",
  "state",
  "pincode",
];

export async function POST(request) {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured yet." },
      { status: 503 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Please log in before placing your order." },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid checkout request." },
      { status: 400 }
    );
  }

  const details = body?.details || {};

  // Validate required delivery information.
  if (
    requiredFields.some(
      (field) => !String(details[field] || "").trim()
    )
  ) {
    return NextResponse.json(
      { error: "Please complete all delivery details." },
      { status: 400 }
    );
  }

  // Validate phone and PIN code.
  if (
    !/^\d{10}$/.test(String(details.phone).trim()) ||
    !/^\d{6}$/.test(String(details.pincode).trim())
  ) {
    return NextResponse.json(
      {
        error:
          "Enter a valid 10-digit phone number and 6-digit PIN code.",
      },
      { status: 400 }
    );
  }

  // Validate cart.
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "Your cart is empty." },
      { status: 400 }
    );
  }

  const items = body.items.map((item) => ({
    productId: Number(item.id),
    quantity: Number(item.quantity),
  }));

  if (
    items.some(
      (item) =>
        !Number.isInteger(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
    )
  ) {
    return NextResponse.json(
      { error: "Your cart contains an invalid item." },
      { status: 400 }
    );
  }

  // Idempotency key prevents a repeated checkout request
  // from creating a duplicate order.
  const idempotencyKey =
    typeof body.idempotencyKey === "string"
      ? body.idempotencyKey.trim()
      : "";

  if (idempotencyKey && idempotencyKey.length > 200) {
    return NextResponse.json(
      { error: "Invalid checkout request." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.rpc("place_order", {
    p_customer_name: String(details.name).trim(),
    p_phone: String(details.phone).trim(),
    p_email: String(details.email).trim(),
    p_address: String(details.address).trim(),
    p_city: String(details.city).trim(),
    p_state: String(details.state).trim(),
    p_pincode: String(details.pincode).trim(),
    p_items: items,
    p_idempotency_key: idempotencyKey || null,
  });

  if (error) {
    return NextResponse.json(
      {
        error:
          error.message || "Could not place your order.",
      },
      { status: 400 }
    );
  }

  const order = data?.[0];

  if (!order) {
    return NextResponse.json(
      { error: "Could not confirm your order." },
      { status: 500 }
    );
  }

  return NextResponse.json({ order });
}