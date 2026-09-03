import { SignUpForm } from "@/components/sign-up-form";
import { appConfig } from "@/lib/config/app";
import { redirect } from "next/navigation";

export default function Page() {
  if (!appConfig.signUpEnabled) {
    redirect("/auth/login");
  }

  return <SignUpForm />;
}
