"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { createClient, isSupabaseConfigured } from "../../lib/supabase/client";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => { setOrderId(new URLSearchParams(window.location.search).get("order")); }, []);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId || !isSupabaseConfigured) { setError("We could not find this order."); return; }
      const { data, error: queryError } = await createClient().from("orders").select("*, order_items(product_name, price, quantity)").eq("id", orderId).maybeSingle();
      if (queryError || !data) { setError("We could not find this order. It may belong to another account."); return; }
      setOrder(data);
    }
    if (orderId !== null) loadOrder();
  }, [orderId]);

  if (!order && !error) return <><Navbar /><main className="container-fc flex min-h-[65vh] items-center justify-center"><p className="text-forest">Loading your order…</p></main><Footer /></>;
  if (error) return <><Navbar /><main className="container-fc flex min-h-[65vh] items-center justify-center py-16"><div className="max-w-lg rounded-3xl border border-line bg-white p-10 text-center shadow-sm"><h1 className="text-2xl font-bold text-forest">No order found</h1><p className="mt-3 text-slate-600">{error}</p><Link href="/account" className="mt-7 inline-block rounded-full bg-forest px-6 py-3 font-bold text-white">View My Orders</Link></div></main><Footer /></>;

  return <><Navbar /><main className="container-fc py-12 md:py-16"><div className="mx-auto max-w-3xl"><section className="rounded-3xl border border-line bg-white px-6 py-10 text-center shadow-sm md:px-10"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage text-3xl font-bold text-forest">✓</div><p className="mt-6 text-xs font-semibold uppercase tracking-widest text-mango">Order confirmed</p><h1 className="mt-2 text-4xl font-bold text-forest md:text-5xl">Thank you!</h1><p className="mt-4 text-slate-600">Your order has been successfully placed.</p><div className="mt-8 rounded-2xl bg-cream p-5 text-left"><p className="text-xs font-medium uppercase tracking-wide text-slate-400">Order number</p><p className="mt-1 text-xl font-bold text-forest">#{order.order_number}</p></div></section><section className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8"><h2 className="text-xl font-bold text-forest">Order details</h2><div className="mt-5 space-y-4">{order.order_items.map((item) => <div key={`${order.id}-${item.product_name}`} className="flex justify-between border-b border-line pb-4"><div><p className="font-semibold text-forest">{item.product_name}</p><p className="mt-1 text-sm text-slate-500">₹{Number(item.price).toFixed(2)} × {item.quantity}</p></div><p className="font-bold text-forest">₹{(Number(item.price) * item.quantity).toFixed(2)}</p></div>)}</div><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>₹{Number(order.subtotal).toFixed(2)}</span></div><div className="flex justify-between"><span className="text-slate-500">Delivery</span><span>{Number(order.shipping) === 0 ? "FREE" : `₹${Number(order.shipping).toFixed(2)}`}</span></div><div className="flex justify-between border-t border-line pt-4 text-lg font-bold text-forest"><span>Total</span><span>₹{Number(order.total).toFixed(2)}</span></div></div></section><section className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-forest">Delivery information</h2><p className="mt-4 font-semibold text-ink">{order.customer_name}</p><p className="mt-1 text-sm text-slate-600">{order.phone} · {order.email}</p><p className="mt-2 text-sm text-slate-600">{order.address}, {order.city}, {order.state} - {order.pincode}</p></section><div className="mt-6 rounded-2xl bg-sage p-5 text-sm text-forest"><p className="font-bold">Cash on Delivery</p><p className="mt-1">Please keep the required amount ready when your order arrives.</p></div><div className="mt-8 text-center"><Link href="/shop" className="inline-block rounded-full bg-forest px-8 py-4 font-bold text-white">Continue Shopping →</Link></div></div></main><Footer /></>;
}
