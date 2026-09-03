"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, cartTotal } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = cartTotal >= 999 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      router.push("/cart");
      return;
    }

    if (paymentMethod === "online") {
      alert("Online card payment will be available soon.");
      return;
    }

    const orderNumber = `FC${Math.floor(
      10000000 + Math.random() * 90000000
    )}`;

    const order = {
      orderNumber,
      customer: formData,
      items: cart,
      subtotal: cartTotal,
      shipping,
      total: grandTotal,
      paymentMethod: "Cash on Delivery",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "fitcart-order",
      JSON.stringify(order)
    );

    router.push("/order-success");
  };

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
              Add some products before proceeding to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-forest px-7 py-3 font-semibold text-white transition hover:bg-forest-dark"
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
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-mango">
            Secure Checkout
          </p>

          <h1 className="text-4xl font-extrabold text-forest md:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-slate-600">
            Enter your details and choose your payment method.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* Left Side */}
            <div className="space-y-6">

              {/* Contact Information */}
              <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-mango">
                    Step 1
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-forest">
                    Contact Information
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-forest"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-forest"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-forest"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                    />
                  </div>

                </div>
              </section>

              {/* Delivery Address */}
              <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-mango">
                    Step 2
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-forest">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-5">

                  <div>
                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-forest"
                    >
                      Full Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House / Flat number, street, area"
                      rows={4}
                      required
                      className="mt-2 w-full resize-none rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="city"
                        className="text-sm font-semibold text-forest"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Bengaluru"
                        required
                        className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="text-sm font-semibold text-forest"
                      >
                        State
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Karnataka"
                        required
                        className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                      />
                    </div>

                  </div>

                  <div className="sm:w-1/2">
                    <label
                      htmlFor="pincode"
                      className="text-sm font-semibold text-forest"
                    >
                      PIN Code
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      pattern="[0-9]{6}"
                      required
                      className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
                    />
                  </div>

                </div>
              </section>

              {/* Payment */}
              <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-mango">
                    Step 3
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-forest">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* COD */}
                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${
                      paymentMethod === "cod"
                        ? "border-forest bg-sage/40"
                        : "border-line hover:border-forest"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() =>
                        setPaymentMethod("cod")
                      }
                      className="mt-1 h-4 w-4 accent-[#1F4B3D]"
                    />

                    <div>
                      <p className="font-bold text-forest">
                        💵 Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Pay when your order is delivered.
                      </p>
                    </div>
                  </label>

                  {/* Online */}
                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition ${
                      paymentMethod === "online"
                        ? "border-forest bg-sage/40"
                        : "border-line hover:border-forest"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() =>
                        setPaymentMethod("online")
                      }
                      className="mt-1 h-4 w-4 accent-[#1F4B3D]"
                    />

                    <div>
                      <p className="font-bold text-forest">
                        💳 Card / Online Payment
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Secure online payment will be available soon.
                      </p>
                    </div>
                  </label>

                </div>
              </section>

            </div>

            {/* Right Side — Order Summary */}
            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-forest">
                  Your Order
                </h2>

                {/* Items */}
                <div className="mt-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-forest">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-forest">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-line pt-5 space-y-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ₹{cartTotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-semibold">
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
                      <span className="font-bold text-ink">
                        Total
                      </span>

                      <span className="text-2xl font-extrabold text-forest">
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-forest px-5 py-4 font-bold text-white transition hover:bg-forest-dark"
                >
                  {paymentMethod === "cod"
                    ? "Place Order →"
                    : "Continue to Payment →"}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  🔒 Your information is kept secure.
                  <br />
                  Cash on Delivery is currently available.
                </p>

              </div>

              {/* Delivery Note */}
              <div className="mt-4 rounded-2xl bg-sage p-5">
                <p className="text-sm font-bold text-forest">
                  🚚 Delivery Information
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Free delivery on orders above ₹999.
                  Standard delivery charge is ₹49.
                </p>
              </div>

            </aside>

          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}