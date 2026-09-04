import MerchantProducts from "../../../components/MerchantProducts";
import { requireMerchantPage } from "../../../lib/merchant";
export default async function MerchantProductsPage() { await requireMerchantPage(); return <><p className="text-xs font-bold uppercase tracking-widest text-mango">Catalog</p><h1 className="mt-2 text-4xl font-extrabold text-forest">Manage products</h1><p className="mt-3 text-slate-600">Add, edit, price, stock, or remove store products.</p><div className="mt-8"><MerchantProducts /></div></>; }
