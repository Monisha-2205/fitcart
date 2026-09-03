"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");

  const { clearCart } = useCart();

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("fitcart-order");

      if (!savedOrder) return;

      const parsedOrder = JSON.parse(savedOrder);

      setOrder(parsedOrder);

      let savedOrderNumber = localStorage.getItem(
        "fitcart-order-number"
      );

      if (!savedOrderNumber) {
        savedOrderNumber = `FC${Date.now()
          .toString()
          .slice(-8)}`;

        localStorage.setItem(
          "fitcart-order-number",
          savedOrderNumber
        );
      }

      setOrderNumber(savedOrderNumber);

      clearCart();
    } catch (error) {
      console.error("Could not load order:", error);
    }
  }, [clearCart]);

  if (!order) {
    return (
      <>
        <Navbar />

        <main className="container-fc flex min-h-[65vh] items-center justify-center py-16">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">📦</div>

            <h1 className="mt-6 text-2xl font-bold text-forest">
              No order found
            </h1>

            <p className="mt-3 text-slate-500">
              We couldn't find a recent order.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-forest px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Start Shopping →
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const items = order.items || [];

  const subtotal =
    order.subtotal ??
    order.cartTotal ??
    order.total ??
    items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  const shipping =
    order.shipping !== undefined
      ? order.shipping
      : subtotal >= 999
      ? 0
      : 49;

  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <main className="container-fc py-12 md:py-16">
        <div className="mx-auto max-w-3xl">

          {/* Confirmation */}
          <div className="rounded-3xl border border-line bg-white px-6 py-10 text-center shadow-sm md:px-10 md:py-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage text-3xl font-bold text-forest">
              ✓
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-mango">
              Order Confirmed
            </p>

            <h1 className="mt-2 text-4xl font-bold text-forest md:text-5xl">
              Thank You!
            </h1>

            <p className="mt-4 text-slate-600">
              Your order has been successfully placed.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              We'll prepare your order and deliver it to your address.
            </p>

            <div className="mt-8 rounded-2xl bg-cream p-5 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Order Number
              </p>

              <p className="mt-1 text-xl font-bold text-forest">
                #{orderNumber}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">

            <h2 className="text-xl font-bold text-forest">
              Order Details
            </h2>

            <div className="mt-6 space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-line pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-forest">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-forest">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="mt-6 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Delivery
                </span>

                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-forest">
                      FREE
                    </span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-forest">
                    ₹{total}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Delivery Information */}
          {(order.name ||
            order.address ||
            order.city) && (
            <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-forest">
                Delivery Information
              </h2>

              <div className="mt-5 space-y-2 text-sm">

                {order.name && (
                  <p className="font-semibold text-ink">
                    {order.name}
                  </p>
                )}

                {order.phone && (
                  <p className="text-slate-600">
                    {order.phone}
                  </p>
                )}

                {order.email && (
                  <p className="text-slate-600">
                    {order.email}
                  </p>
                )}

                {order.address && (
                  <p className="pt-2 text-slate-600">
                    {order.address}
                    {order.city
                      ? `, ${order.city}`
                      : ""}
                    {order.state
                      ? `, ${order.state}`
                      : ""}
                    {order.pincode
                      ? ` - ${order.pincode}`
                      : ""}
                  </p>
                )}

              </div>
            </div>
          )}

          {/* Payment */}
          <div className="mt-6 rounded-2xl bg-sage px-5 py-4">

            <p className="text-sm font-semibold text-forest">
              💵 Cash on Delivery
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Please keep the required amount ready when your order arrives.
            </p>

          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">

            <Link
              href="/shop"
              className="inline-block rounded-full bg-forest px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Continue Shopping →
            </Link>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}