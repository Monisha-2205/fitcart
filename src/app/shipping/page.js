import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ShippingPage() {
  return (
    <>
      <Navbar />

      <main className="container-fc py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Delivery information
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest md:text-5xl">
            Shipping
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Everything you need to know about getting your FitCart
            order delivered to you.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                🚚
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                Delivery Charges
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Standard delivery is ₹49 for orders below ₹999.
                Orders of ₹999 or more qualify for free delivery.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                📦
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                Order Processing
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Orders are processed after they are placed. Delivery
                timing may vary depending on your location and
                product availability.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                📍
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                Delivery Address
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Please make sure your delivery address, city, state,
                and pincode are entered correctly during checkout.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                Need help?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                If you have a question about your delivery, please
                contact our support team with your order number.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-forest-dark"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}