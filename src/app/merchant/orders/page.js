import MerchantOrders from "../../../components/MerchantOrders";
import { requireMerchantPage } from "../../../lib/merchant";
export default async function MerchantOrdersPage() { await requireMerchantPage(); return <><p className="text-xs font-bold uppercase tracking-widest text-mango">Fulfilment</p><h1 className="mt-2 text-4xl font-extrabold text-forest">Customer orders</h1><p className="mt-3 text-slate-600">Review order details and update each fulfilment status.</p><div className="mt-8"><MerchantOrders /></div></>; }
