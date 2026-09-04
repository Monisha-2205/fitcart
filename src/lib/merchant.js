import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function requireMerchant() {
  const supabase = await createClient();
  if (!supabase) return { error: NextResponse.json({ error: "Supabase is not configured." }, { status: 503 }) };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: "Authentication required." }, { status: 401 }) };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "merchant") return { error: NextResponse.json({ error: "Merchant access required." }, { status: 403 }) };
  return { supabase, user };
}

export async function requireMerchantPage() {
  const supabase = await createClient();
  if (!supabase) redirect("/merchant/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/merchant/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "merchant") redirect("/");
  return { supabase, user };
}
