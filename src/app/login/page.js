import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() { return <><Navbar /><main className="container-fc flex min-h-[65vh] items-center justify-center py-12"><section className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-mango">Welcome back</p><h1 className="mt-2 text-3xl font-extrabold text-forest">Sign in to FitCart</h1><p className="mt-3 text-sm text-slate-600">Access your orders and check out securely.</p><div className="mt-7"><AuthForm /></div></section></main><Footer /></>; }
