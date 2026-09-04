"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "../lib/supabase/client";

export default function AuthForm({ mode = "login", merchantOnly = false }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    if (!isSupabaseConfigured) { setMessage("Supabase is not configured yet. Add the environment variables from .env.example."); return; }
    if (password.length < 6) { setMessage("Password must be at least 6 characters."); return; }
    setLoading(true);
    const supabase = createClient();
    const requestedNext = new URLSearchParams(window.location.search).get("next");
    const safeNext = requestedNext && requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : merchantOnly
        ? "/merchant"
        : "/account";
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
    const result = isSignup
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: redirectTo } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (result.error) { setMessage(result.error.message); return; }
    if (isSignup && !result.data.session) { setMessage("Check your email to confirm your account, then sign in."); return; }

    if (merchantOnly) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", result.data.user.id).maybeSingle();
      if (profile?.role !== "merchant") { await supabase.auth.signOut(); setMessage("This account does not have merchant access."); return; }
    }
    router.replace(safeNext);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup && <div><label htmlFor="fullName" className="text-sm font-semibold text-forest">Full name</label><input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-sage" /></div>}
      <div><label htmlFor="email" className="text-sm font-semibold text-forest">Email address</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-sage" /></div>
      <div><label htmlFor="password" className="text-sm font-semibold text-forest">Password</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-forest focus:ring-2 focus:ring-sage" /></div>
      {message && <p className="rounded-xl bg-orange-100 px-4 py-3 text-sm text-forest" role="alert">{message}</p>}
      <button disabled={loading} className="w-full rounded-full bg-forest px-5 py-3 font-bold text-white transition hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait..." : isSignup ? "Create Account" : merchantOnly ? "Merchant Sign In" : "Sign In"}</button>
      {!merchantOnly && <p className="text-center text-sm text-slate-600">{isSignup ? "Already have an account?" : "New to FitCart?"} <Link href={isSignup ? "/login" : "/signup"} className="font-bold text-forest hover:underline">{isSignup ? "Sign in" : "Create an account"}</Link></p>}
    </form>
  );
}
