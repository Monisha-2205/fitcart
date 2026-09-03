import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="container-fc py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Get in touch
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest md:text-5xl">
            Contact Us
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Have a question about an order, product, delivery, or
            anything else? We’re here to help.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                📧
              </div>

              <h2 className="mt-5 text-lg font-bold text-forest">
                Email Us
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Send us your questions and we’ll get back to you.
              </p>

              <p className="mt-4 font-semibold text-mango">
                support@fitcart.in
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                🕐
              </div>

              <h2 className="mt-5 text-lg font-bold text-forest">
                Support Hours
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Monday to Saturday
              </p>

              <p className="mt-1 font-semibold text-forest">
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-forest">
              Need help with an order?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Please include your order number and the details of
              your question when contacting us. This helps us assist
              you faster.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-forest-dark"
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