import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

export const instant = false;

export default async function HomePage() {
  if (!hasEnvVars) {
    redirect("/auth/login");
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  redirect(data?.claims ? "/dashboard" : "/auth/login");
}
