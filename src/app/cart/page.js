"use client";
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    stockMessage,
  } = useCart();

  const [stockChecked, setStockChecked] = useState(false);
  const [stockErrors, setStockErrors] = useState([]);

  useEffect(() => {
    async function checkLiveStock() {
      if (cart.length === 0) {
        setStockChecked(true);
        return;
      }

      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          setStockChecked(true);
          return;
        }

        const result = await response.json();
        const liveProducts = result.products || [];

        const errors = [];

        cart.forEach((item) => {
          const liveProduct = liveProducts.find(
            (product) => Number(product.id) === Number(item.id)
          );

          if (!liveProduct) {
            errors.push(`${item.name} is no longer available.`);
            return;
          }

          const liveStock = Number(liveProduct.stock);

          if (liveStock <= 0) {
            errors.push(`${item.name} is currently out of stock.`);
          } else if (item.quantity > liveStock) {
            errors.push(
              `Only ${liveStock} ${item.name} available. Please reduce the quantity.`
            );
          }
        });

        setStockErrors(errors);
      } catch (error) {
        console.error("Could not check live stock:", error);
      }

      setStockChecked(true);
    }

    checkLiveStock();
  }, [cart]);

  const hasStockProblem = stockErrors.length > 0;

  const shipping = cartTotal >= 999 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const totalSavings = cart.reduce(
    (total, item) =>
      total +
      Math.max(0, (item.oldPrice || item.price) - item.price) *
        item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="container-fc flex min-h-[65vh] items-center justify-center py-16">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-6xl">🛒</div>

            <h1 className="mt-6 text-3xl font-bold text-forest">
              Your cart is empty
            </h1>

            <p className="mt-3 text-slate-500">
              Looks like you haven't added anything to your cart yet.
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

  return (
    <>
      <Navbar />

      <main className="container-fc py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mango">
            Your Cart
          </p>

          <h1 className="text-4xl font-bold text-forest md:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-slate-600">
            Review your items before checking out.
          </p>
        </div>

        {/* Stock Message */}
        {stockMessage && (
          <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4">
            <p className="text-sm font-semibold text-orange-700">
              ⚠️ {stockMessage}
            </p>
          </div>
        )}

        {/* Live Stock Problems */}
        {stockChecked && hasStockProblem && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-bold text-red-700">
              ⚠️ Stock availability changed
            </p>

            <div className="mt-2 space-y-1">
              {stockErrors.map((error, index) => (
                <p
                  key={index}
                  className="text-sm text-red-600"
                >
                  • {error}
                </p>
              ))}
            </div>

            <p className="mt-3 text-xs font-medium text-red-500">
              Please update your cart before proceeding to checkout.
            </p>
          </div>
        )}

        {/* Free Shipping Message */}
        <div className="mb-8 rounded-2xl bg-sage px-5 py-4">
          {shipping === 0 ? (
            <p className="font-semibold text-forest">
              🎉 You've unlocked free delivery!
            </p>
          ) : (
            <p className="text-sm font-medium text-forest">
              Add ₹{999 - cartTotal} more to unlock free delivery.
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    href={`/product/${item.id}`}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 rounded-xl object-cover sm:h-32 sm:w-32"
                    />
                  </Link>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500">
                          {item.category}
                        </p>

                        <Link
                          href={`/product/${item.id}`}
                          className="mt-1 block text-base font-bold text-forest hover:underline sm:text-lg"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-slate-400 transition hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-bold text-forest">
                        ₹{item.price}
                      </span>

                      {item.oldPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{item.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Quantity + Item Total */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg font-semibold text-forest hover:bg-sage"
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-line px-3 text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center text-lg font-semibold text-forest hover:bg-sage"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-right font-bold text-forest">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/shop"
              className="inline-block pt-2 text-sm font-semibold text-forest hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-forest">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">
                  ₹{cartTotal}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Delivery</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-forest">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    You save
                  </span>
                  <span className="font-semibold text-mango">
                    ₹{totalSavings}
                  </span>
                </div>
              )}

              <div className="border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-forest">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout */}
            {stockChecked && !hasStockProblem ? (
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-forest px-5 py-4 text-center font-semibold text-white transition hover:opacity-90"
              >
                Proceed to Checkout →
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 block w-full cursor-not-allowed rounded-full bg-slate-300 px-5 py-4 text-center font-semibold text-slate-500"
              >
                Update Stock to Continue
              </button>
            )}

            <p className="mt-4 text-center text-xs text-slate-400">
              Secure checkout • Cash on Delivery available
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}