"use client";

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
  } = useCart();

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
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-forest px-5 py-4 text-center font-semibold text-white transition hover:opacity-90"
            >
              Proceed to Checkout →
            </Link>

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