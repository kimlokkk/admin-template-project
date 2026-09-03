import { redirect } from "next/navigation";

import { AdminShell } from "@/components/layout/admin-shell";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : "User";

  return <AdminShell userEmail={email}>{children}</AdminShell>;
}
