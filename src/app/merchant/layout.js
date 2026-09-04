import Link from "next/link";

export default async function MerchantLayout({ children }) {
  return <><header className="border-b border-line bg-white"><div className="container-fc flex min-h-20 flex-wrap items-center justify-between gap-4 py-4"><Link href="/merchant" className="text-2xl font-extrabold text-forest">Fit<span className="text-mango">Cart</span> Merchant</Link><nav className="flex gap-4 text-sm font-bold text-forest"><Link href="/merchant">Dashboard</Link><Link href="/merchant/products">Products</Link><Link href="/merchant/orders">Orders</Link><Link href="/">Store</Link></nav></div></header><main className="container-fc py-10 md:py-12">{children}</main></>;
}
