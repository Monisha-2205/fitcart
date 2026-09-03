import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="container-fc py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Your privacy matters
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            This Privacy Policy explains how FitCart may collect,
            use, and protect information when you use our website.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                Information We Collect
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                When you place an order, we may collect information
                such as your name, phone number, email address, and
                delivery address so that we can process and deliver
                your order.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                How We Use Your Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Information provided during checkout may be used to
                process orders, arrange delivery, communicate with
                you about your order, and provide customer support.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                Payment Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                FitCart does not ask you to enter card details for
                Cash on Delivery orders. Online payment functionality
                will be introduced separately when available.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                Data Protection
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We take reasonable steps to protect information
                associated with your orders and use it only for
                legitimate business and customer-service purposes.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-forest">
                Questions About Privacy
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                If you have questions about how your information is
                handled, please contact the FitCart support team.
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
              This is a basic website privacy page for the current
              FitCart project. Before launching publicly, we should
              review and update it with your actual business details,
              data practices, and any legally required disclosures.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}