import { NextResponse } from "next/server";

import { requireMerchant } from "../../../../../lib/merchant";

const statuses = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const allowedTransitions = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["packed", "cancelled"],
  packed: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export async function PATCH(request, { params }) {
  const { supabase, error } = await requireMerchant();

  if (error) return error;

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const { status } = body || {};

  if (!statuses.includes(status)) {
    return NextResponse.json(
      { error: "Invalid order status." },
      { status: 400 }
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Order ID is required." },
      { status: 400 }
    );
  }

  // Cancellation must go through the database function so that
  // product stock is restored safely and only once.
  if (status === "cancelled") {
    const { data, error: cancelError } = await supabase.rpc(
      "cancel_order",
      {
        p_order_id: id,
      }
    );

    if (cancelError) {
      return NextResponse.json(
        { error: cancelError.message || "Could not cancel the order." },
        { status: 400 }
      );
    }

    const cancelledOrder = data?.[0];

    if (!cancelledOrder) {
      return NextResponse.json(
        { error: "Could not cancel the order." },
        { status: 400 }
      );
    }

    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "Order was cancelled, but could not reload the order." },
        { status: 400 }
      );
    }

    return NextResponse.json({ order });
  }

  // Get the current order before changing its status.
  const { data: currentOrder, error: currentOrderError } = await supabase
    .from("orders")
    .select("id, status")
    .eq("id", id)
    .single();

  if (currentOrderError || !currentOrder) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }

  const currentStatus = currentOrder.status;

  // Prevent invalid status transitions.
  if (!allowedTransitions[currentStatus]?.includes(status)) {
    return NextResponse.json(
      {
        error: `Cannot change order status from ${currentStatus} to ${status}.`,
      },
      { status: 400 }
    );
  }

  const { data, error: updateError } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { error: "Could not update the order status." },
      { status: 400 }
    );
  }

  return NextResponse.json({ order: data });
}