"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckSquare2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Settings,
  UsersRound,
  UserRoundSearch,
  X,
} from "lucide-react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appConfig } from "@/lib/config/app";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navigation: Array<{ label: string; items: NavigationItem[] }> = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Leads", href: "/leads", icon: UserRoundSearch },
      { label: "Customers", href: "/customers", icon: UsersRound },
      { label: "Tasks", href: "/tasks", icon: CheckSquare2 },
      { label: "Calendar", href: "/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Team chat", href: "/chat", icon: MessageSquareText },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Reports", href: "/reports", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

function Navigation({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {navigation.map((section) => (
        <div key={section.label}>
          {!collapsed && (
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {section.label}
            </p>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "flex h-16 items-center gap-3 border-b border-slate-800 px-5",
          collapsed && "justify-center px-2",
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Building2 className="size-5" aria-hidden="true" />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {appConfig.name}
            </p>
            <p className="truncate text-xs text-slate-500">
              {appConfig.companyName}
            </p>
          </div>
        )}
      </div>
      <Navigation collapsed={collapsed} onNavigate={onNavigate} />
      <div className="border-t border-slate-800 p-4">
        {!collapsed ? (
          <p className="text-xs text-slate-500">Version {appConfig.version}</p>
        ) : (
          <p className="text-center text-[10px] text-slate-600">v{appConfig.version}</p>
        )}
      </div>
    </>
  );
}

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCollapsed(
        window.localStorage.getItem("admin-sidebar-collapsed") === "true",
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currentPage = useMemo(
    () =>
      navigation
        .flatMap((section) => section.items)
        .find(
          (item) =>
            pathname === item.href || pathname.startsWith(`${item.href}/`),
        )?.label ?? "Workspace",
    [pathname],
  );

  const toggleSidebar = () => {
    const nextValue = !collapsed;
    setCollapsed(nextValue);
    window.localStorage.setItem(
      "admin-sidebar-collapsed",
      String(nextValue),
    );
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/auth/login");
    router.refresh();
  };

  const initials = userEmail.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-svh bg-slate-50 dark:bg-slate-950">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col bg-slate-950 transition-[width] duration-200 lg:flex",
          collapsed ? "w-20" : "w-72",
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <button
          type="button"
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 flex size-7 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <aside className="relative flex h-full w-72 flex-col bg-slate-950 shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div
        className={cn(
          "min-h-svh transition-[padding] duration-200",
          collapsed ? "lg:pl-20" : "lg:pl-72",
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Workspace</p>
              <p className="truncate text-sm font-semibold">{currentPage}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications will be connected in a later phase"
            >
              <Bell className="size-[18px]" />
            </Button>
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 px-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {initials}
                  </span>
                  <span className="hidden max-w-40 truncate text-sm sm:block">
                    {userEmail}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <span className="block text-xs font-normal text-muted-foreground">
                    Signed in as
                  </span>
                  <span className="block truncate">{userEmail}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <CircleUserRound /> Profile &amp; settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
