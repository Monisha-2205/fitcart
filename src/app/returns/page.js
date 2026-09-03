import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ReturnsPage() {
  return (
    <>
      <Navbar />

      <main className="container-fc py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Returns & support
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest md:text-5xl">
            Returns
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            We want you to have a smooth shopping experience. If
            there is an issue with your order, please contact us so
            we can help.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                📦
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                Damaged or Incorrect Items
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                If your order arrives damaged or you receive an
                incorrect product, please contact us as soon as
                possible with your order number and details of the
                issue.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                🔄
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                Return Requests
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Return eligibility may depend on the product and its
                condition. Please contact our support team before
                sending any product back.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-xl">
                💬
              </div>

              <h2 className="mt-5 text-xl font-bold text-forest">
                How to Contact Us
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                When contacting us about a return or order issue,
                please provide your order number and a clear
                description of the problem.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-forest-dark"
              >
                Contact Us →
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-sage bg-sage p-6 sm:p-8">
            <h2 className="text-lg font-bold text-forest">
              Important
            </h2>

            <p className="mt-2 text-sm leading-6 text-forest/80">
              This page describes our general return process.
              Product-specific return conditions can vary and should
              be confirmed with FitCart support.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}