import Link from "next/link";
import { Building2, CheckCircle2 } from "lucide-react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { appConfig } from "@/lib/config/app";

const benefits = [
  "Manage customers and leads in one place",
  "Keep follow-ups and team tasks organised",
  "Adapt the platform to different businesses",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.35),_transparent_42%)]" />
        <Link href="/" className="relative flex items-center gap-3 font-semibold">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600">
            <Building2 className="size-5" aria-hidden="true" />
          </span>
          <span>{appConfig.name}</span>
        </Link>

        <div className="relative max-w-xl space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-blue-300">
              Business management, simplified
            </p>
            <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
              One workspace for your team&apos;s daily operations.
            </h1>
            <p className="max-w-lg text-base leading-7 text-slate-300">
              A flexible administration platform that grows with your business.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-blue-400" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          {appConfig.companyName} · Version {appConfig.version}
        </p>
      </section>

      <section className="relative flex min-h-svh items-center justify-center p-6 sm:p-10">
        <div className="absolute right-5 top-5">
          <ThemeSwitcher />
        </div>
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-3 font-semibold lg:hidden"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <span>{appConfig.name}</span>
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
