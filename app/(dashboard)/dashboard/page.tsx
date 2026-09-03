import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckSquare2,
  Clock3,
  UserPlus,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard" };

const metrics = [
  { label: "Total leads", value: "0", helper: "No leads yet", icon: UserPlus },
  {
    label: "Total customers",
    value: "0",
    helper: "No customers yet",
    icon: UsersRound,
  },
  {
    label: "Follow-ups due",
    value: "0",
    helper: "Nothing due today",
    icon: Clock3,
  },
  {
    label: "Tasks due",
    value: "0",
    helper: "No pending tasks",
    icon: CheckSquare2,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Overview</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your business activity will appear here as modules are connected.
          </p>
        </div>
        <Button asChild>
          <Link href="/leads">
            <UserPlus /> Add lead
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="shadow-sm">
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {metric.helper}
                  </p>
                </div>
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Updates from leads, customers, tasks, and follow-ups.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-8 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
                <UserRoundCheck className="size-5 text-muted-foreground" />
              </span>
              <p className="mt-4 text-sm font-medium">No activity yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Activity will be recorded automatically when your team starts
                working with business records.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming follow-ups</CardTitle>
            <CardDescription>Your next scheduled actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-6 text-center">
              <Clock3 className="size-6 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">Nothing scheduled</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Follow-ups will appear here.
              </p>
            </div>
            <Button asChild variant="ghost" className="mt-4 w-full">
              <Link href="/calendar">
                Open calendar <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
