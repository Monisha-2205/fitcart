import { redirect } from "next/navigation";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  createClient,
  getCurrentUser,
} from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { user, profile } = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const supabase = await createClient();

  const { data: orders = [] } = await supabase
    .from("orders")
    .select(
      "id, order_number, total, payment_method, status, created_at, order_items(product_name, price, quantity)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  async function handleLogout() {
    "use server";

    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect("/");
  }

  return (
    <>
      <Navbar />

      <main className="container-fc py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
              Your account
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-forest md:text-5xl">
              Hello, {profile?.full_name || user.email}
            </h1>
          </div>

          {/* Logout */}
          <form action={handleLogout}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-forest px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-forest hover:text-white"
            >
              Log out
            </button>
          </form>
        </div>

        {/* Account information */}
        <section className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-forest">
            Account information
          </h2>

          <p className="mt-3 text-slate-600">
            {user.email}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Customer account
          </p>

          <div className="mt-5">
            <Link
              href="/shop"
              className="text-sm font-bold text-forest underline underline-offset-4"
            >
              Continue shopping →
            </Link>
          </div>
        </section>

        {/* Order history */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-forest">
            Order history
          </h2>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-line bg-white p-8 text-slate-600">
              You have not placed an order yet.
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-3xl border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-forest">
                        #{order.order_number}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-IN",
                          { dateStyle: "medium" }
                        )}{" "}
                        · {order.payment_method}
                      </p>
                    </div>

                    <span className="rounded-full bg-sage px-3 py-1 text-sm font-semibold capitalize text-forest">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-slate-600">
                    {order.order_items?.map((item, index) => (
                      <p key={`${order.id}-${item.product_name}-${index}`}>
                        {item.product_name} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  <p className="mt-4 font-bold text-forest">
                    Total: ₹{Number(order.total).toFixed(2)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}